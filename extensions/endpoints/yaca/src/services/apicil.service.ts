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

import axios, { AxiosRequestConfig } from "axios";
import { FieldMapper } from "../classes/FieldMapper";
import { apicilMapping, apicilTransmissionBulletinRequest } from "../data/apicil.mapping";
import { ApicilResultBuilder } from "../builder/ApicilResult.builder";
import { ApicilRequestBuilder } from "../builder/ApicilRequest.builder";
import { APICIL_TYPE_REGIME_MATRIMONIAL, APICIL_TYPE_SITUATION_FAMILLIALE } from "../types/IApicilRequestApi";
import { MailService } from "directus";
import dayjs from "dayjs";
import { IApicilContract, IApicilProject } from "../types/IApicilResponse";

// TODO : optmise get client on an abstract class
export class ApicilService {
    private _fieldMapper = new FieldMapper(apicilMapping);

    public async createProject(request: any): Promise<any> {
        const apicilRequest = new ApicilRequestBuilder()
            .setRequest(request.body)
            .build();
        let apicilResult = await this._post("/projet/asigner", apicilRequest);
        return new ApicilResultBuilder().setApiResult(apicilResult).build();
    }

    public async getProject(projectId: string): Promise<IApicilProject> {
        const project = await this._get(`/projet/${projectId}`, {});
        return project ? project : null;
    }

    public async getContract(contractId: string): Promise<IApicilContract> {
        const contract = await this._get(`/contrat/${contractId}`, {});
        const beneficiary = await this._get(
            `/contrat/${contractId}/clausebeneficiaire`,
            {}
        );
        const paymentInfos = await this._get(
            `/contrat/${contractId}/indicateurs`,
            {}
        );
        contract.infosPaiement = paymentInfos;
        contract.clauseBeneficiaire = beneficiary;
        return contract ? contract : null;
    }

    private async getProjectDocument(documentId: number) {
        const document = await this._get(
            `/projet/document/${documentId}`,
            {},
            { responseType: "arraybuffer" }
        );
        return document ? document : null;
    }

    public async getProjectDocuments(projectId: string) {
        const documents = await this._get(`/projet/${projectId}/documents`, {});
        return documents ? documents : null;
    }

    public async getProjectBulletinPDF(projectId: string) {
        const report = await this._get(
            `/projet/${projectId}/bulletin`,
            {},
            { responseType: "arraybuffer" }
        );
        return report ? report : null;
    }

    public async getContractReportPDF(contract: IApicilContract) {
        const dateValorisationFr = dayjs(
            contract.dateValorisationEncours
        ).format("DD/MM/YYYY");
        const report = await this._get(
            `${process.env.APICIL_API_URL}/contrat/${contract.contratId}/relevedesituation?dateValorisation=${dateValorisationFr}`,
            {},
            { responseType: "arraybuffer" }
        );
        return report ? report : null;
    }

    public async sendProject(projectId: string) {
        await this._post(
            `/projet/transmettre/${projectId}`,
            apicilTransmissionBulletinRequest
        );
    }

    public async sendThankYouEmail(req: any) {
        const mailService = new MailService({
            schema: req.schema,
        });
        await mailService.send({
            to: req.body.common_email,
            subject: "Yaca - Merci pour votre confiance",
            template: {
                name: "thank-you",
                data: {
                    firstname: req.body.apicil_common_firstname,
                    lastname: req.body.apicil_common_lastname,
                },
            },
        });
    }

    public getFamilySituations() {
        return APICIL_TYPE_SITUATION_FAMILLIALE;
    }

    public getMaritalRegimes() {
        return APICIL_TYPE_REGIME_MATRIMONIAL;
    }

    public get fieldMapper(): FieldMapper {
        return this._fieldMapper;
    }

    private async _get(
        path: string,
        data: any,
        extraConfig: AxiosRequestConfig = {}
    ): Promise<any> {
        const config: AxiosRequestConfig = {
            auth: {
                username: `${process.env.APICIL_API_USER!}`,
                password: `${process.env.APICIL_API_PASSWORD!}`,
            },
            params: data,
        };
        try {
            console.log(`${process.env.APICIL_API_URL!}${path}`, config);
            let result = await axios.get(
                `${process.env.APICIL_API_URL!}${path}`,
                { ...config, ...extraConfig }
            );
            return result.data;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }

    private async _post(path: string, data: any): Promise<any> {
        const config = {
            auth: {
                username: `${process.env.APICIL_API_USER!}`,
                password: `${process.env.APICIL_API_PASSWORD!}`,
            },
        };
        try {
            let result = await axios.post(
                `${process.env.APICIL_API_URL!}${path}`,
                data,
                config
            );
            return result.data;
        } catch (error: any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }
}

const apicilService = new ApicilService();
export default apicilService;
