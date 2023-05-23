/**
 * Copyright (c) 2022 - Indigen Solutions
 * Authors:
 * - David PISTORI <david.pistori@indigen.com>
 * - Alexandre DE FREITAS MARTINS <alexandre.defreitasmartins@indigen.com>
 * - Loys CAUCHETEUX <loys.caucheteux@indigen.com>
 * NOTICE: All information contained here is, and remains
 * the property of Indigen Solutions and its suppliers, if any.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Indigen Solutions.
 */

import { UserService } from "./services/user.service";
import requestService from "./services/request.service";
import { ApiException } from "./exceptions/ApiException";
import { defineEndpoint } from "@directus/extensions-sdk";
import quantalysService from "./services/quantalys.service";
import apicilService from "./services/apicil.service";
import { SubscriptionService } from "./services/subscription.service";

export default (router : any) => {
    router.get("/professions", async (_req: any, res: any) => {
        try {
            const result = await requestService.getProfessions();
            return sendContent(res, {
                result: result,
            });
        } catch (e: any) {
            return sendError(res, e);
        }
    });

    router.post("/calculate-simulation", async (_req: any, res: any) => {
        try {
            const simulation = await requestService.calculateSimulation(
                _req.body
            );
            return sendContent(res, {
                result: simulation,
            });
        } catch (e: any) {
            return sendError(res, e);
        }
    });

    router.post("/calculate-mortality", async (_req: any, res: any) => {
        try {
            const mortality = await requestService.calculateMortalitySimulation(
                _req.body
            );
            return sendContent(res, {
                result: mortality,
            });
        } catch (e: any) {
            return sendError(res, e);
        }
    });

    router.post("/invite-user", async (_req: any, res: any) => {
        try {
            const userService = new UserService(_req);
            await userService.sendInviteUser(_req);
            return sendContent(res, {});
        } catch (e: any) {
            return sendError(res, e);
        }
    });

    router.get("/send-legal-documents", async (_req: any, res: any) => {
        try {
            const userService = new UserService(_req);
            await userService.sendLegalDocumentsEmail(await userService.getCurrentUser());
            return sendContent(res, {});
        } catch (e: any) {
            return sendError(res, e);
        }
    });

    router.post("/request-password-reset", async (_req: any, res: any) => {
        try {
            const userService = new UserService(_req);
            await userService.sendPasswordResetRequest(
                _req.body.email,
                _req.body.reset_url
            );
            return sendContent(res, {});
        } catch (e: any) {
            return sendError(res, e);
        }
    });

    router.post("/send-callme-email", async (_req: any, res: any) => {
        try {
            const userService = new UserService(_req);
            await userService.sendCallMeEmailToClient(
                _req.body.email,
                _req.body.phone
            );
            await userService.sendCallMeEmailToAdmin(_req.body);
            return sendContent(res, {});
        } catch (e: any) {
            return sendError(res, e);
        }
    });

    router.post("/validate-email", async (_req: any, res: any) => {
        try {
            const userService = new UserService(_req);
            const isValid = await userService.validateEmail(_req.body.email);
            return sendContent(res, {
                isValid: isValid,
            });
        } catch (e: any) {
            console.error(e);
            return sendError(res, e);
        }
    });

    router.post("/performance", async (_req: any, res: any) => {
        try {
            const fundPerformances = await quantalysService.getFundsPerformance(
                _req
            );
            return sendContent(res, fundPerformances);
        } catch (e: any) {
            return sendError(res, e);
        }
    });

    router.post("/create-apicil-project", async (_req: any, res: any) => {
        try {
            const userService = new UserService(_req);
            const user = await userService.getCurrentUser();
            if (!user) {
                return sendUnauthorized(res);
            }
            const project = await apicilService.createProject(_req);
            await apicilService.sendProject(project.projectID);
            await apicilService.sendThankYouEmail(_req);
            await userService.updateUserFromSubscription(_req.body);
            return sendContent(res, {
                result: project,
            });
        } catch (e: any) {
            return sendError(res, e);
        }
    });

    router.post("/accept-user-invitation", async (_req: any, res: any) => {
        try {
            const userService = new UserService(_req);
            await userService.acceptInvitation(_req.body.token, _req.body.password);
            return sendContent(res, {});
        } catch (e: any) {
            return sendError(res, e);
        }
    });
    


    // TO REMOVE.
    router.get("/apicil-project", async (req: any, res: any) => {
        try {
            const userService = new UserService(req);
            const subscriptionService = new SubscriptionService(req);

            const user = await userService.getCurrentUser();
            if (!user) {
                return sendUnauthorized(res);
            }
            const subscription = await subscriptionService.getUserSubscription(
                user
            );

            if (!subscription && !subscription!.apicil_project_id) {
                return sendUnauthorized(res);
            }

            const project = await apicilService.getProject(
                subscription!.apicil_project_id
            );
            return sendContent(res, {
                project,
            });
        } catch (e: any) {
            return sendError(res, e);
        }
    });

    router.get(
        "/apicil-project-contract-documents",
        async (req: any, res: any) => {
            try {
                const userService = new UserService(req);
                const subscriptionService = new SubscriptionService(req);

                const user = await userService.getCurrentUser();
                if (!user) {
                    return sendUnauthorized(res);
                }
                const subscription =
                    await subscriptionService.getUserSubscription(user);

                if (!subscription && !subscription!.apicil_project_id) {
                    return sendUnauthorized(res);
                }

                const project = await apicilService.getProject(
                    subscription!.apicil_project_id
                );

                const documents = await apicilService.getProjectDocuments(
                    subscription!.apicil_project_id
                );

                let contract = null;
                if (project.contratId) {
                    contract = await apicilService.getContract(
                        project.contratId
                    );
                }

                return sendContent(res, {
                    project,
                    contract,
                    documents,
                });
            } catch (e: any) {
                return sendError(res, e);
            }
        }
    );

    router.get("/apicil-project-bulletin", async (req: any, res: any) => {
        try {
            const userService = new UserService(req);
            const subscriptionService = new SubscriptionService(req);

            const user = await userService.getCurrentUser();
            if (!user) {
                return sendUnauthorized(res);
            }
            const subscription = await subscriptionService.getUserSubscription(
                user
            );

            if (!subscription && !subscription!.apicil_project_id) {
                return sendUnauthorized(res);
            }
            const projectBulletinPDF =
                await apicilService.getProjectBulletinPDF(
                    subscription!.apicil_project_id
                );
            if (!projectBulletinPDF) {
                return sendError(
                    res,
                    new ApiException("Project bulletin not found")
                );
            }

            return sendPDF(res, projectBulletinPDF);
        } catch (e: any) {
            return sendError(res, e);
        }
    });
}

function sendContent(res: any, data: any) {
    return res.status(200).json({
        content: data,
        status: 200,
    });
}

function sendPDF(res: any, data: any) {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=bulletin.pdf");
    return res.status(200).send(data);
}

function sendError(res: any, error: ApiException) {
    let errorObject;
    try {
        errorObject = JSON.parse(error.message);
        return res.status(500).json({
            content: { error: errorObject },
            status: 500,
        });
    } catch (e) {
        return res.status(500).json({
            content: { error: error.message },
            status: 500,
        });
    }
}

function sendUnauthorized(res: any) {
    return res.status(401).json({
        content: { error: "Unauthorized" },
        status: 401,
    });
}
