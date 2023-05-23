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
import { ISimulationResult } from "../types/ISimulationResult";
export class HarvestResultBuilder {
    private _result: any | undefined;

    public setApiResult(result: any): this {
        this._result = result;
        return this;
    }

    public build(): ISimulationResult {
        return {
            name: "HarvestResults",
            result: this._result.resultats[0],
            simulation_retirement_age: this._result.resultats[0].departRetraite,
            simulation_retirement_income: this._result.resultats[0].retraite,
            simulation_last_income:
                this._result.resultats[0].dernierRevenuProfessionnel,
            simulation_retirement_drop:
                this._result.resultats[0].baisseRevenusRetraite,
        };
    }
}
