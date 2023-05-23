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

export type IHarvestMortalityTableMortalite =
    keyof typeof HARVEST_MORTALITY_TABLE_MORTALITE;
export type IHarvestMortalityCivilite = keyof typeof HARVEST_MORTALITY_CIVILITE;

export interface IHarvestMortalityRequestApi {
    id: string;
    libelle: string;
    personnes: IHarvestMortalityPersonne[];
    esperanceVieHypotheses: IHarvestMortalityEsperanceVieHypothese;
}

export interface IHarvestMortalityPersonne {
    id: string;
    libelle: string;
    personnePhysique: IHarvestMortalityPersonnePhysique;
}

export interface IHarvestMortalityPersonnePhysique {
    dateNaissance: string;
    civilite: IHarvestMortalityCivilite;
}

export interface IHarvestMortalityEsperanceVieHypothese {
    dateCalcul: string;
    tableMortalite: IHarvestMortalityTableMortalite;
    personneId: string;
}

export const HARVEST_MORTALITY_CIVILITE = {
    M: "Monsieur",
    MME: "Madame",
    MLLE: "Mademoiselle",
};

export const HARVEST_MORTALITY_TABLE_MORTALITE = {
    TPRV: "Table de mortalité de la population résidente de la Ville de Québec",
    TPG93: "Table de mortalité de la population générale de 1993",
    TPG05: "Table de mortalité de la population générale de 2005",
    TPGH05: "Table de mortalité de la population générale de 2005 (hommes)",
    TPGF05: "Table de mortalité de la population générale de 2005 (femmes)",
};
