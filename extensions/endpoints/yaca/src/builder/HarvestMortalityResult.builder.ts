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

import { IMortalitySimulationResult } from "../types/ISimulationResult";

export class HarvestMortalityResultBuilder {
    private _result: any | undefined;

    public setApiResult(result: any): this {
        this._result = result;
        return this;
    }

    public build(): IMortalitySimulationResult {
        return {
            name: "HarvestMortalityResults",
            death_age: this._result.ageFinVie,
        };
    }
}
