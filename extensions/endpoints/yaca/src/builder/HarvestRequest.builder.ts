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
    IHarvestCarriereOptions,
    IHarvestCarrierePeriode,
    IHarvestHypothesesCalcul,
    IHarvestPersonne,
    IHarvestProfession,
    IHarvestRequestApi,
    IHarvestRetraiteHypothese,
    IHarvestRetraiteParam,
    IHarvestRevenusPeriode,
} from "../types/IHarvestRequestApi";
import { getDayJs } from "../helpers/date.helper";

export class HarvestRequestBuilder {
    private _request: any | undefined;

    public setRequest(request: any): this {
        this._request = request;
        return this;
    }

    public build(): IHarvestRequestApi {
        return {
            libelle: "Retraite V0",
            personnes: this._getPersonnes(this._request),
            retraiteParam: this._getRetraiteParam(),
            retraiteHypotheses: this._getRetraiteHypotheses(this._request),
        };
    }

    private _getPersonnes(data: any): IHarvestPersonne[] {
        return [
            {
                id: "ID_CLIENT",
                libelle: "Client",
                personnePhysique: {
                    dateNaissance: getDayJs(data["common_birthdate"]).format(
                        "YYYY-MM-DD"
                    ),
                    civilite: data["common_genre"] === "male" ? "M" : "MME",
                },
                carriereOptions: this._getCarriereOptions(data),
                carrierePeriodes: {
                    carrierePeriodes: this._getCarrierePeriodes(data),
                },
            },
        ];
    }

    private _getCarriereOptions(data: any): IHarvestCarriereOptions {
        return {
            nombreEnfantsImpactRetraite: {
                nbEnfantsEleves: data["common_children"],
            },
        };
    }

    private _getCarrierePeriodes(data: any): IHarvestCarrierePeriode[] {
        return [
            {
                periodeId: "1",
                dateDebut: `${data["simulation_work_year"]}-01-01`,
                profession: {
                    csp: this._getCSP(data["simulation_work_profession"]),
                },
                periodiciteRevenus: "A",
                typeRevenus: "NET",
                profilRevenus: "LOGARITHMIQUE",
                revenusPeriode: this._getRevenusPeriode(data),
                tauxEvolution: this._getTauxEvolution(data),
            },
        ];
    }

    private _getRevenusPeriode(data: any): IHarvestRevenusPeriode[] {
        const revenus = [
            {
                annee: new Date().getFullYear(),
                profilRevenus: "NBPASS",
                devise: "EUR",
                type: "NET",
                montant: data["simulation_actual_salary"],
                periodicite: "A",
                saisi: true,
                percu: true,
            },
        ];

        if (
            data["simulation_last_income"] &&
            data["simulation_last_income_year"]
        ) {
            revenus.push({
                profilRevenus: "LOGARITHMIQUE",
                annee: data["simulation_last_income_year"],
                devise: "EUR",
                type: "NET",
                montant: data["simulation_last_income"],
                periodicite: "M",
                saisi: true,
                percu: true,
            });
        }

        return revenus;
    }

    private _getRetraiteHypotheses(data: any): IHarvestRetraiteHypothese {
        return {
            modeleDerive: "CONSERVATEUR",
            hypothesesCalcul: this._getHypotheseCalcul(data),
        };
    }

    private _getRetraiteParam(): IHarvestRetraiteParam {
        return {
            passAnneePass: new Date().getFullYear(),
            passTauxEvolutionPass: 1,
            carriereRevenuDebutActiviteMoyen: true,
        };
    }

    private _getHypotheseCalcul(data: any): IHarvestHypothesesCalcul[] {
        return [
            {
                calculId: "ID_CLIENT_AGE_0",
                personneId: "ID_CLIENT",
                ageRetraite: data["simulation_retirement_age"],
                optionDepart: "AGE",
            },
        ];
    }

    private _getTauxEvolution(data: any): number {
        if (data["simulation_income_state"] === 3) {
            return 3;
        }
        if (data["simulation_income_state"] === 2) {
            return 1.5;
        }
        return 0;
    }

    private _getCSP(profession: string): IHarvestProfession {
        const split = profession.split("|");
        if (split) {
            return split[0] as IHarvestProfession;
        }
        return profession as IHarvestProfession;
    }
}
