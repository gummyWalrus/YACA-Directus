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

import {
    IHarvestMortalityEsperanceVieHypothese,
    IHarvestMortalityPersonne,
    IHarvestMortalityRequestApi,
    IHarvestMortalityTableMortalite,
} from "../types/IHarvestMortalityRequestApi";
import { getDayJs } from "../helpers/date.helper";

export class HarvestMortalityRequestBuilder {
    private _request: any | undefined;

    public setRequest(request: any): this {
        this._request = request;
        return this;
    }

    public build(): IHarvestMortalityRequestApi {
        return {
            id: "ID_CLIENT",
            libelle: "Client",
            personnes: this._getPersonnes(),
            esperanceVieHypotheses: this._getEsperanceVieHypothese(),
        };
    }

    private _getPersonnes(): IHarvestMortalityPersonne[] {
        return [
            {
                id: "ID_CLIENT",
                libelle: "Client",
                personnePhysique: {
                    dateNaissance: getDayJs(this._request["common_birthdate"]).format(
                        "YYYY-MM-DD"
                    ),
                    civilite:
                        this._request["common_genre"] === "male" ? "M" : "MME",
                },
            },
        ];
    }

    private _getEsperanceVieHypothese(): IHarvestMortalityEsperanceVieHypothese {
        return {
            dateCalcul: "",
            tableMortalite: this._getTableMortalite(),
            personneId: "ID_CLIENT",
        };
    }

    private _getTableMortalite(): IHarvestMortalityTableMortalite {
        switch (this._request["common_mortality"]) {
            case "1":
                return "TPRV";
            case "2":
                return "TPG93";
            case "3":
                return "TPG05";
            case "4":
                return "TPGH05";
            case "5":
                return "TPGF05";
            default:
                return "TPRV";
        }
    }
}
