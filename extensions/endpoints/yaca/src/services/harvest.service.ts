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
import { HARVEST_UNWANTED_PROFESSIONS } from "../types/IHarvestRequestApi";

export class HarvestService {
    private _token: string = "";

    public async executeSimulation(apiRequest: any): Promise<any> {
        return await this.post("/retraite/pension", apiRequest);
    }

    public async executeMortalitySimulation(apiRequest: any): Promise<any> {
        return await this.post("/calculs-financiers/esperance-vie", apiRequest);
    }

    public async getProfessions(): Promise<any> {
        let result = await this.post("/retraite/profession-possible", {
            libelle: "Retraite Profession Possible V0",
            retraiteProfessionPossibleParam: {
                configuration: "ret-hvs-api",
            },
        });

        for (let professionCategory of result.retraiteProfessionPossible) {
            const professions = professionCategory.professionPossibleDetail;
            professionCategory.professionPossibleDetail = professions.filter(
                (profession: any) =>
                    !HARVEST_UNWANTED_PROFESSIONS.includes(
                        profession.profession.csp
                    )
            );
        }
        return result;
    }

    public async post(path: string, data: any): Promise<any> {
        if (!this._token) await this._initToken();
        try {
            const result = await axios.post(
                `${process.env.HARVEST_API_URL!}${path}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${this._token}`,
                    },
                }
            );
            return result.data;
        } catch (e: any) {
            if (e.response.status === 401) {
                await this._initToken();
                return this.post(path, data);
            }
        }
        return [];
    }

    /* Implementation */

    private async _initToken() {
        const axiosRequestToken = {
            url: process.env.HARVEST_API_TOKEN_URL!,
            config: {
                grant_type: process.env.HARVEST_API_TOKEN_GRANT_TYPE!,
                client_id: process.env.HARVEST_API_TOKEN_CLIENT_ID!,
                client_secret: process.env.HARVEST_API_TOKEN_CLIENT_SECRET!,
                username: process.env.HARVEST_API_TOKEN_USERNAME!,
                password: process.env.HARVEST_API_TOKEN_PASSWORD!,
            },
        };

        const response = await axios.post(
            axiosRequestToken.url,
            new URLSearchParams(axiosRequestToken.config)
        );

        this._token = response.data.access_token;
    }
}

const harvestService = new HarvestService();
export default harvestService;
