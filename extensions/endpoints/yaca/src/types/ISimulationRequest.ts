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

export type ICivilite = keyof typeof CIVILITE;
export type IProfession = keyof typeof PROFESSION;
export type ISituation = keyof typeof SITUATION;
export type IIncomeState = keyof typeof INCOME_STATUS;

export interface ISimulationRequest {
    code: string;
    name: string;
    identity: IIdentity;
    work: IWork;
    simulation: ISimulation;
}

export interface IIdentity {
    civility: ICivilite; // TYPE
    birthdate: string;
    situation: ISituation;
    childNumber: number;
}

export interface IWork {
    beginDate: string;
    profession: IProfession;
    income: number;
}

export interface ISimulation {
    incomeState: IIncomeState;
    retirementAge: number;
    incomeEstimation: number;
}

export const CIVILITE = {
    M: "M",
    MME: "MME",
};

export const SITUATION = {
    MARIE: "MARIE",
    CELIBATAIRE: "CELIBATAIRE",
};

export const PROFESSION = {
    CADRE: "CADRE",
    OUVRIER: "OUVRIER",
};

export const INCOME_STATUS = {
    INCREASE: "INCREASE",
    STABLE: "STABLE",
    DECREASE: "DECREASE",
};

export const ACTUAL_SITUATION = {
    ACTIF: "ACTIF",
    RETRAITE: "RETRAITE",
};
