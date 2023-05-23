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

import { ItemsService } from "directus";
import { User } from "directus/dist/types";

export class SubscriptionService extends ItemsService {
    constructor(_req: any) {
        super("subscriptions", {
            schema: _req.schema,
            accountability: _req.accountability,
        });
    }

    public async getUserSubscription(user: User) {
        const result = await this.readByQuery({
            filter: {
                user_created: {
                    _eq: user.id,
                },
            },
        });
        if (result && result[0]) {
            return result[0];
        }
        return null;
    }
}
