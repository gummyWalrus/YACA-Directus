/**
 * Copyright (c) 2022 - Indigen Solutions
 * Authors:
 * - David PISTORI <david.pistori@indigen.com>
 * - Alexandre DE FREITAS MARTINS <alexandre.defreitasmartins@indigen.com>
 * NOTICE: All information contained here is, and remains
 * the property of Indigen Solutions and its suppliers, if any.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Indigen Solutions.
 */

import { toArray } from "@directus/shared/utils";
import { isUrlAllowed } from "../helpers/url.helper";
import { MailService, UsersService, RolesService } from "@directus/api";
import { Url } from "@directus/api/utils/url";
import jwt from "jsonwebtoken";
import { InvalidPayloadException } from "@directus/api";
import { User } from "@directus/types";
import { getDayJs } from "../helpers/date.helper";

export class UserService extends UsersService {
    constructor(_req: any) {
        if (_req.accountability.user) {
            super({
                schema: _req.schema,
                accountability: _req.accountability,
            });
        } else {
            super({
                schema: _req.schema,
            });
        }
    }

    async getCurrentUser(): Promise<User | null> {
        if (this.accountability && this.accountability.user) {
            return (await this.readOne(this.accountability.user)) as User;
        }
        return null;
    }

    async acceptInvitation(token: string, password: string): Promise<void> {
        try {
            this.acceptInvite(token, password);
        } catch (e : any) {
            const regexp = /address (.+) hasn't/;
            console.log(e.message, regexp);
            throw new InvalidPayloadException("Invalid token");
        }
    }

    async inviteUser(
        email: string,
        role: string,
        url: string,
        subject: string
    ): Promise<void> {
        if (
            url &&
            isUrlAllowed(url, process.env.USER_INVITE_URL_ALLOW_LIST!) === false
        ) {
            throw new InvalidPayloadException(
                `Url "${url}" can't be used to invite users.`
            );
        }
        const emails = toArray(email);
        const mailService = new MailService({
            schema: this.schema,
            accountability: this.accountability,
        });
        for (const email of emails) {
            const payload = { email, scope: "invite" };
            const token = jwt.sign(payload, process.env.SECRET!, {
                expiresIn: "7d",
                issuer: "directus",
            });
            const subjectLine =
                subject !== null && subject !== void 0
                    ? subject
                    : "You've been invited";
            const inviteURL = url
                ? new Url(url)
                : new Url(process.env.PUBLIC_URL!).addPath(
                      "admin",
                      "accept-invite"
                  );
            inviteURL.setQuery("token", token);
            await this.createOne({ email, role, status: "invited" });
            await mailService.send({
                to: email,
                subject: subjectLine,
                template: {
                    name: "user-invitation",
                    data: {
                        url: inviteURL.toString(),
                        email,
                    },
                },
                attachments: [
                    {
                        filename: "Document d'Entrée en relation.pdf",
                        href:
                            process.env.FRONT_END_URL + "/app/pdf/cgu-cgv.pdf",
                    },
                ],
            });
        }
    }

    async sendCallMeEmailToAdmin(request: any) {
        const { email, phone, name, subscriptionId } = request;
        const mailService = new MailService({
            schema: this.schema,
            accountability: this.accountability,
        });
        const yacaEmails = process.env.YACA_TEAM_EMAILS!.split(",");
        for (const yacaEmail of yacaEmails) {
            await mailService.send({
                to: yacaEmail,
                subject: "Yaca - Demande de rappel",
                template: {
                    name: "call-me-yaca",
                    data: {
                        link: `${process.env.PUBLIC_URL}/admin/content/subscriptions/${subscriptionId}`,
                        name,
                        email,
                        phone,
                    },
                },
            });
        }
    }

    async sendCallMeEmailToClient(email: string, phone: string) {
        const mailService = new MailService({
            schema: this.schema,
            accountability: this.accountability,
        });
        await mailService.send({
            to: email,
            subject:
                "Yaca - Poursuivez votre souscription avec un accompagnement personnalisé",
            template: {
                name: "call-me",
                data: {
                    phone,
                },
            },
        });
    }

    async sendPasswordResetRequest(email: string, url: string): Promise<void> {
        return await this.requestPasswordReset(
            email,
            url,
            process.env.PASSWORD_RESET_SUBJECT!
        );
    }

    async sendInviteUser(_req : any) {
        const roleService = new RolesService({
            schema: _req.schema,
            accountability: _req.accountability,
        });
        const email = _req.body.email;
        const base64Subscription = _req.body.subscription;
        try {
        const role = await roleService.readByQuery({filter: {name: {_eq: "yaca"}}});
        if (!role || !role[0]) {
            throw new Error("Role yaca not found");
        }
        return await this.inviteUser(
            email,
            role[0].id,
            process.env.USER_INVITE_URL_ALLOW_LIST! +
                "?s=" +
                base64Subscription,
            process.env.USER_INVITE_SUBJECT!
        );
        } catch (error) {
            console.log(error);
        }
    }

    async validateEmail(email: string) {
        const result = await this.readByQuery({
            fields: ["email"],
            filter: {
                email: {
                    _eq: email,
                },
            },
        });
        return result.length === 0;
    }

    async updateUserFromSubscription(subscription: any) {
        const user = await this.getCurrentUser();
        if (!user) {
            return;
        }
        const birthdateUS = getDayJs(
            subscription.apicil_common_birthdate
        ).format("YYYY-MM-DD");
        let job = subscription.simulation_work_profession!.split("|");
        await this.updateOne(user.id, {
            phone: subscription.apicil_contact_phone,
            birthdate: new Date(birthdateUS).toISOString(),
            first_name: subscription.apicil_common_firstname,
            last_name: subscription.apicil_common_lastname,
            location: `${subscription.apicil_contact_address!.label} ${
                subscription.apicil_contact_address!.context
            }`,
            title: job[1] ? job[1] : "",
            supported_association: subscription.apicil_common_association,
        });
    }

    async sendLegalDocumentsEmail(user : User | null) {
        if (!user) {
            return;
        }
        const mailService = new MailService({
            schema: this.schema,
            accountability: this.accountability,
        });
        await mailService.send({
            to: user.email,
            subject: "Yaca - Documents légaux",
            template: {
                name: "legal-docs",
            },
            // TODO: add attachments when we have the documents
            // attachments: [
            //     {
            //         filename: "CGU-CGV.pdf",
            //         href: `${process.env.PUBLIC_URL}/app/pdf/cgu-cgv.pdf`,
            //     },
            // ],
        });
    }
}