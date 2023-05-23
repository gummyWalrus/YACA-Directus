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

import axios from "axios";
import { QuantalysResultBuilder } from "../builder/QuantalysResult.builder";
import { QuantalysRequestBuilder } from "../builder/QuantalysRequest.builder";

export class QuantalysService {
    private _token: string = "";

    private _requestBuilder = new QuantalysRequestBuilder();
    private _resultBuilder = new QuantalysResultBuilder();

    async getFundsPerformance(_req: any) {
        if (!this._token) await this._initToken();
        const request = this._requestBuilder.setRequest(_req).build();
        try {
            const result = await this.post(request);

            return this._resultBuilder.setApiResult(result).build();
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    public async post(body: any): Promise<any> {
        const result = await axios.post(process.env.QUANTALYS_API_URL!, body, {
            headers: {
                Authorization: `Bearer ${this._token}`,
                "Accept-Language": "fr-FR",
            },
        });

        if (result && result.data instanceof Object) {
            return result.data;
        } else if (result && result.data.includes("401 Unauthorized")) {
            await this._initToken();
            return this.post(body);
        }
        return [];
    }

    /* Implementation */

    private async _initToken() {
        const config = {
            grant_type: process.env.QUANTALYS_API_TOKEN_GRANT_TYPE!,
            client_id: process.env.QUANTALYS_API_TOKEN_CLIENT_ID!,
            client_secret: process.env.QUANTALYS_API_TOKEN_CLIENT_SECRET!,
            scope: process.env.QUANTALYS_API_TOKEN_SCOPE!,
        };
        const response = await axios.post(
            process.env.QUANTALYS_API_TOKEN_URL!,
            new URLSearchParams(config)
        );
        this._token = response.data.access_token;
    }
}

const quantalysService = new QuantalysService();
export default quantalysService;
