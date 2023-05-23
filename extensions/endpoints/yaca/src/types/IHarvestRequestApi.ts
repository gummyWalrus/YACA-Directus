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

export type IHarvestCivilite = keyof typeof HARVEST_CIVILITE;
export type IHarvestProfession = keyof typeof HARVEST_CATEGORY_PROFESSION;
export type IHarvestPeriodiciteRevenus =
    keyof typeof HARVEST_PERIODICITE_REVENUS;
export type IHarvestTypeRevenus = keyof typeof HARVEST_TYPE_REVENUS;
export type IHarvestProfilRevenu = keyof typeof HARVEST_PROFIL_REVENU;
export type IHarvestTypeDevise = keyof typeof HARVEST_TYPE_DEVISE;
export type IHarvestOptionDepart = keyof typeof HARVEST_OPTION_DEPART;

export interface IHarvestRequestApi {
    libelle: string;
    personnes: IHarvestPersonne[];
    retraiteParam: IHarvestRetraiteParam;
    retraiteHypotheses: IHarvestRetraiteHypothese;
}

export interface IHarvestPersonne {
    id: string;
    libelle: string;
    personnePhysique: IHarvestPersonnePhysique;
    carrierePeriodes: { carrierePeriodes: IHarvestCarrierePeriode[] };
    carriereOptions: IHarvestCarriereOptions;
}

export interface IHarvestPersonnePhysique {
    dateNaissance: string;
    civilite: IHarvestCivilite;
}

export interface IHarvestCarrierePeriode {
    periodeId: string;
    dateDebut: string;
    // dateFin: string;
    profession: { csp: IHarvestProfession };
    periodiciteRevenus: IHarvestPeriodiciteRevenus;
    typeRevenus: IHarvestTypeRevenus;
    profilRevenus: IHarvestProfilRevenu;
    tauxEvolution: number;
    revenusPeriode: IHarvestRevenusPeriode[];
}

export interface IHarvestRevenusPeriode {
    profilRevenus: string;
    annee: number;
    devise: string;
    type: string;
    montant: number;
    periodicite: string;
    saisi: boolean;
    percu: boolean;
}

export interface IHarvestCarriereOptions {
    nombreEnfantsImpactRetraite?: { nbEnfantsEleves: number };
}

export interface IHarvestRetraiteParam {
    passAnneePass: number;
    passTauxEvolutionPass: number;
    carriereRevenuDebutActiviteMoyen: boolean;
}

export interface IHarvestRetraiteHypothese {
    modeleDerive: string;
    hypothesesCalcul: IHarvestHypothesesCalcul[];
}

export interface IHarvestHypothesesCalcul {
    calculId: string;
    personneId: string;
    ageRetraite: number;
    optionDepart: IHarvestOptionDepart;
}

export const HARVEST_CIVILITE = {
    M: "M",
    MME: "MME",
};

export const HARVEST_CATEGORY_PROFESSION = {
    P_NONCADRE: "NONCADRE",
    P_ART36: "ART36",
    P_CADRE: "CADRE",
    P_CADRESUP: "P_CADRESUP",
    P_AGENTETAT: "AGENTETAT",
    P_CCPMA: "CCPMA",
    P_EXPCMPT_SALARIE: "EXPCMPT_SALARIE",
    P_AVOCAT_SALARIE: "AVOCAT_SALARIE",
    P_CCPMA_NON_CADRE: "CCPMA_NON_CADRE",
    P_CCPMA_CADRE: "CCPMA_CADRE",
    P_AGRICA_NON_CADRE: "AGRICA_NON_CADRE",
    P_AGRICA_CADRE: "AGRICA_CADRE",
    P_EXPATRIE_NONCADRE_CFE: "EXPATRIE_NONCADRE_CFE",
    P_EXPATRIE_CADRE_CFE: "EXPATRIE_CADRE_CFE",
    P_EXPATRIE_NONCADRE: "EXPATRIE_NONCADRE",
    P_EXPATRIE_CADRE: "EXPATRIE_CADRE",
    P_FONCT: "FONCT",
    P_FONCT_TERRITORIAL: "FONCT_TERRITORIAL",
    P_MILITAIRE: "MILITAIRE",
    P_MILITAIRE_OFFICIER: "MILITAIRE_OFFICIER",
    P_EXPLAGR: "EXPLAGR",
    P_CONJOINT_EXPLAGR: "CONJOINT_EXPLAGR",
    P_EXPLAGR_AUTRE: "EXPLAGR_AUTRE",
    P_EXPLAGR_CONJOINT_PARTICIPANT: "EXPLAGR_CONJOINT_PARTICIPANT",
    P_CLERC: "CLERC",
    P_MARIN_SALARIE: "MARIN_SALARIE",
    P_MARIN_ARTISAN: "MARIN_ARTISAN",
    P_AUTO_ENTREPRENEUR: "AUTO_ENTREPRENEUR",
    P_ARTISAN: "ARTISAN",
    P_CONJOINT_ARTISAN: "CONJOINT_ARTISAN",
    P_COMMERCANT: "COMMERCANT",
    P_CONJOINT_COMMERCANT: "CONJOINT_COMMERCANT",
    P_GERANT_COMMERCANT: "GERANT_COMMERCANT",
    P_CONJOINT_PROFLIB: "CONJOINT_PROFLIB",
    P_AGASSUR: "AGASSUR",
    P_ARCHI: "ARCHI",
    P_ARTISTE: "ARTISTE",
    P_AUXMED: "AUXMED",
    P_AVOCAT: "AVOCAT",
    P_CONJOINT_AVOCAT: "CONJOINT_AVOCAT",
    P_CHIRDEN: "CHIRDEN",
    P_EXPCMPT: "P_EXPCMPT",
    P_GEOMETRE: "GEOMETRE",
    P_MEDECIN: "MEDECIN",
    P_NOTAIRE: "NOTAIRE",
    P_OFFMIN: "OFFMIN",
    P_PHARMA: "PHARMA",
    P_SAGEF: "SAGEF",
    P_VETO: "VETO",
    P_INACT_MALADIE: "INACT_MALADIE",
    P_INACT_AVPF: "INACT_AVPF",
    P_CHOMAGE: "CHOMAGE",
    // P_N_ACTIF_EXPLAGR: "N_ACTIF_EXPLAGR",
    // P_SERVICE_MILITAIRE: "SERVICE_MILITAIRE",
    // P_INACTSS: "INACTSS",
    // P_INACT_ARTISAN: "INACT_ARTISAN",
    // P_INACT_COMMERCANT: "INACT_COMMERCANT",
    // P_INACT_MSA: "INACT_MSA",
    // P_INACT: "INACT",
};

export const HARVEST_UNWANTED_PROFESSIONS = [
    "P_INACT_EXPLAGR",
    "P_INACT_ARTISAN",
    "P_INACT_COMMERCANT",
    "P_INACT_MSA",
    "P_INACT",
    "P_INACTSS",
    "P_SERVICE_MILITAIRE",
    "P_N_ACTIF_EXPLAGR",
];

export const HARVEST_PERIODICITE_REVENUS = {
    U: "Unique",
    M: "Mensuel",
    T: "Trimestriel",
    S: "Semestriel",
    A: "Annuel",
};

export const HARVEST_TYPE_REVENUS = {
    BRUT: "BRUT",
    NET: "NET",
};

export const HARVEST_PROFIL_REVENU = {
    ACTUARIEL: "ACTUARIEL",
    LINEAIRE: "LINEAIRE",
    LOGARITHMIQUE: "LOGARITHMIQUE",
    STATISTIQUE: "STATISTIQUE",
    NBPASS: "NBPASS",
};

export const HARVEST_TYPE_DEVISE = {
    EUR: "EUR",
    FRF: "FRF",
};

export const HARVEST_OPTION_DEPART = {
    AGE: "AGE",
    DATE: "DATE",
    TAUXPLEIN: "TAUXPLEIN",
    PLUSTOT: "PLUSTOT",
};
