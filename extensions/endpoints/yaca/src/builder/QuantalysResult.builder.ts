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
import {
    IQuantalysDocuments,
    IQuantalysResult,
} from "../types/IQuantalysResult";

export class QuantalysResultBuilder {
    private _result: any | undefined;

    public setApiResult(result: any): this {
        this._result = result;
        return this;
    }

    public build(): IQuantalysResult {
        const result: IQuantalysResult = {
            results: this._result,
            invests: [],
        };
        if (this._result.Products) {
            for (const product of this._result.Products) {
                result.invests.push({
                    isin: product.ISIN,
                    shortName: product.ShortName,
                    performance: this._getAnnualizedPerformances(product),
                    rating: product.Perf_And_Indicator.Rating,
                    objective: product.Detail.Investment.Objective,
                    strategy: product.Detail.Investment.Strategy,
                    riskIndicator: product.Detail.SRRI,
                    SFDRClassification: product.Detail.ESG.SFDR,
                    documents: this._getDocuments(product),
                });
            }
            return result;
        } else {
            throw new Error(
                "No product found : The requested ISINs might not be valid"
            );
        }
    }

    private _getDocuments(product: any): IQuantalysDocuments {
        let result: IQuantalysDocuments = {
            prospectus: "",
            DICI: "",
            report: "",
            commercial: "",
        };
        let tmp: any = {};

        tmp["DICI"] = product.Documents.find((doc: any) => {
            return doc["DocumentType_Code"] === "DICI";
        });
        result["DICI"] = tmp["DICI"] ? tmp["DICI"].URL : "#";

        tmp["prospectus"] = product.Documents.find((doc: any) => {
            return doc["DocumentType_Code"] === "Prospectus";
        });
        result["prospectus"] = tmp["prospectus"] ? tmp["prospectus"].URL : "#";

        tmp["report"] = product.Documents.find((doc: any) => {
            return doc["DocumentType_Code"] === "RapportAnnuel";
        });
        result["report"] = tmp["report"] ? tmp["report"].URL : "#";

        tmp["commercial"] = product.Documents.find((doc: any) => {
            return doc["DocumentType_Code"] === "DIS";
        });
        result["commercial"] = tmp["commercial"] ? tmp["commercial"].URL : "#";
        return result;
    }

    private _getAnnualizedPerformances(product: any): any {
        let result = {};
        for (const period of product.Perf_And_Indicator.Performance.Annualized
            .Daily.Product) {
            result = { ...result, [period.Period_Name]: period.Value };
        }
        return result;
    }
}
