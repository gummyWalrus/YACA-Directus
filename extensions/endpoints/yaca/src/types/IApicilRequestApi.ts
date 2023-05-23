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

import { IApicilVille } from "./IApicilCityApi";
import { APICIL_NATIONALITE, APICIL_PAYS } from "./IApicilCountryApi";

export type IApicilChoixBeneficiaire =
    keyof typeof APICIL_TYPE_CHOIX_BENEFICIAIRE;
export type IApicilRegimeMatrimonial =
    keyof typeof APICIL_TYPE_REGIME_MATRIMONIAL;
export type IApicilSituationFamiliale =
    keyof typeof APICIL_TYPE_SITUATION_FAMILLIALE;
export type IApicilCategorieProfessionnelle =
    keyof typeof APICIL_TYPE_CATEGORIE_PROFESSIONNELLE;
export type IApicilSituationSocioProfessionnelle =
    keyof typeof APICIL_TYPE_SITUATION_PROFESSIONELLE;

export type IApicilPays = keyof typeof APICIL_PAYS;
export type IApicilNationalite = keyof typeof APICIL_NATIONALITE;
export type IApicilCivilite = keyof typeof APICIL_CIVILITE;
export type IApicilProduit = keyof typeof APICIL_TYPE_PRODUIT;
export type IApicilTypeRevenu = keyof typeof APICIL_TYPE_REVENU;
export type IApicilPeriodicite = keyof typeof APICIL_TYPE_PERIODICITE;
export type IApicilTypePatrimoine = keyof typeof APICIL_TYPE_PATRIMOINE;
export type IApicilSecteurActivite = keyof typeof APICIL_SECTEUR_ACTIVITE;
export type IApicilHorizonInvestissement =
    keyof typeof APICIL_HORIZON_INVESTISSEMENT;

export interface IApicilRequestApi {
    produit: { code: IApicilProduit };
    souscription: IApicilSouscription;
    profilGestion: { code: string };
    connaissanceClient: IApicilConnaissanceClient;
    typeSignature: string;
}

export interface IApicilSouscription {
    fraisSurContrat: IApicilFraisSurContrat;
    donneesBancaires?: IApicilDonneesBancaires;
    garantiePlancher: boolean;
    dureeContrat: "Viagère" | "Déterminée";
    objectifInvestissement: {
        code: string;
    };
    horizonInvestissement: {
        code: IApicilHorizonInvestissement;
        libelle?: string;
    };
    versementInitial: IApicilVersementInitial;
    clauseBeneficiaire: {
        choixBeneficiaire: IApicilChoixBeneficiaire;
        clauseBeneficiaireLibre?: string;
    };
    versementProgramme?: IApicilVersementProgramme;
    souscriptionRetraite?: IApicilSouscriptionRetraite;
}

export interface IApicilFraisSurContrat {
    tauxFraisSurArbitrage: number;
    tauxFraisSurEncoursUC: number;
    tauxFraisGestionEncoursEuro: number;
    tauxMaxFraisSurTousTypesVersements: number;
}

export interface IApicilDonneesBancaires {
    bic: string;
    iban: string;
    titulaire: string;
}

export interface IApicilVersementInitial {
    montant: number;
    modePaiement: string;
    portefeuille: IApicilPortefeuille[];
    origineDesFonds: IApicilOrigineDesFonds;
    tauxDerogatoire: number;
    reponsesSupportStructure?: any[];
}

export interface IApicilPortefeuille {
    isinCode: string;
    repartition: number;
}

export interface IApicilOrigineDesFonds {
    ofRevenusPro?: number;
    ofCessionActifs?: number;
    ofBiensMobiliers?: number;
    ofAutresPlacements?: number;
    ofVenteImmobiliere?: number;
    ofSuccessionDonation?: number;
    ofAutre?: number;
    ofAutreCommentaire?: string;
}

export interface IApicilVersementProgramme {
    montant: number;
    periodicite: IApicilPeriodicite;
    portefeuille: any[];
    tauxDerogatoire: number;
    vpRepartitionSpecifique: boolean;
}

export interface IApicilSouscriptionRetraite {
    souscriptionPerin: {
        deductionVi: boolean;
        deductionVp: boolean;
        ageDepartRetraite: number;
    };
}

export interface IApicilConnaissanceClient {
    client: IApicilClient;
    commentaire: string | null;
    coordonnees: IApicilCoordonnees;
    foyer: {
        patrimoine?: IApicilPatrimoine[];
        revenus?: IApicilRevenus[];
    };
    conjoint: {
        patrimoine?: IApicilPatrimoine[];
        revenus?: IApicilRevenus[];
    };
}

export interface IApicilClient {
    revenus?: IApicilRevenus[];
    etatCivil: IApicilEtatCivil;
    patrimoine?: IApicilPatrimoine[];
    informationsFiscales: {
        adressePrincipaleEtResidenceDifferents: boolean;
        adresseFiscale?: IApicilAdresse;
    };
    situationProfessionnelle: IApicilSituationProfessionnelle;
    residentFiscalOuCitoyenUs: boolean;
}

export interface IApicilRevenus {
    montant: number;
    typeRevenu: { code: IApicilTypeRevenu };
    preciserRevenu?: string | null;
}

export interface IApicilEtatCivil {
    nom: string;
    nomNaissance: string;
    pays: {
        code: IApicilPays;
    };
    prenom: string;
    civilite: { code: IApicilCivilite };
    nationalite: {
        code: IApicilNationalite;
    };
    dateNaissance: string;
    villeNaissance: {
        code: IApicilVille;
        libelle: string;
    };
    regimeMatrimonial?: { code: IApicilRegimeMatrimonial | null };
    situationFamiliale: { code: IApicilSituationFamiliale };
    nombrePersonnesACharge: number;
    nombreEnfants: number;
}

export interface IApicilPatrimoine {
    montant: number;
    typePatrimoine: { code: IApicilTypePatrimoine };
    preciserPatrimoine?: string | null;
}

export interface IApicilSituationProfessionnelle {
    nomEntreprise?: string;
    secteurActivite?: { code: IApicilSecteurActivite }; // OK.
    situationActuelle?: { code: IApicilSituationSocioProfessionnelle }; // OK.
    professionActuelle?: string; // OK from simulation_work_profession
    anneeDepartRetraite: number; // OK
    travailleurNonSalarie?: boolean; // OOK
    categorieSocioProfessionnelle: {
        code: IApicilCategorieProfessionnelle;
    };
}

export interface IApicilCoordonnees {
    email: string;
    adresse: IApicilAdresse;
    telephoneMobile: {
        indicatif: string;
        numeroTelephone: string;
    };
}

export interface IApicilAdresse {
    pays: { code: IApicilPays };
    ville: { libelle: string };
    codePostal: string;
    adressePrincipale: string;
    adresseComplementaire: string | null;
}

export const APICIL_HORIZON_INVESTISSEMENT = {
    H1: "Entre 0 et 5 ans",
    H2: "Entre 5 et 10 ans",
    H3: "Au-delà de 10 ans",
};

export const APICIL_CIVILITE = {
    "01": "M",
    "03": "MME",
    "99": "",
};

export const APICIL_TYPE_REVENU = {
    FONC: {
        title: "Revenus fonciers",
        estDepense: false,
    },
    REVE: {
        title: "Revenus de valeurs mobilières",
        estDepense: false,
    },
    PENS: {
        title: "Pensions, retraites et rentes",
        estDepense: false,
    },
    AUTR: {
        title: "Autre",
        estDepense: false,
    },
    EMPR: {
        title: "Charge annuelle d'emprunt en cours",
        estDepense: true,
    },
    PESE: {
        title: "Pension(s) servie(s)",
        estDepense: true,
    },
    SALA: {
        title: "Salarié",
        estDepense: false,
    },
    RENT: {
        title: "Rente",
        estDepense: false,
    },
};

export const APICIL_SECTEUR_ACTIVITE = {
    N: "Activités de services administratifs et de soutien",
    T: "Activités des ménages en tant qu'employeurs, en tant que producteurs de biens et services pour usage propre",
    U: "Activités extra-territoriales",
    K: "Activités financières et d'assurance",
    L: "Activités immobilières",
    M: "Activités spécialisées, scientifiques et techniques",
    O: "Administration publique",
    A: "Agriculture, sylviculture et pêche",
    R: "Arts, spectacles et activités récréatives",
    S: "Autres activités de services",
    G: "Commerce, réparation d'automobiles et de motocycles",
    F: "Construction",
    P: "Enseignement",
    Y: "Etudiant(e)",
    I: "Hébergement et restauration",
    C: "Industrie manufacturière",
    B: "Industries extractives",
    J: "Information et communication",
    E: "Production et distribution d'eau, assainissement, gestion des déchets et dépollution",
    V: "Production et distribution d'électricité, de gaz, de vapeur et d'air conditionné",
    Z: "Sans activité professionnelle",
    Q: "Santé humaine et action sociale",
    H: "Transports et entreposage",
};

export const APICIL_TYPE_PATRIMOINE = {
    RP: "Résidence principale",
    RS: "Résidence secondaire",
    IL: "Investissement locatif",
    VM: "Valeurs mobilières",
    LI: "Liquidités, Livrets",
    OA: "Or, Collections, Objets d’art",
    AP: "Actifs professionnels",
    PE: "PERP",
    RM: "Retraite Madelin",
    EE: "PEE",
    CO: "PERCO",
    RE: "Retraites supplémentaires (art 83, ...)",
    AU: "Autre",
    EM: "Capital restant dû sur les emprunts en cours",
};

export const APICIL_TYPE_REGIME_MATRIMONIAL = {
    A: "Communauté réduite aux acquêts (régime légal)",
    C: "Communauté universelle",
    D: "Participations aux acquêts",
    B: "Séparation de biens",
    E: "Spécifique / Autre",
};

export const APICIL_TYPE_SITUATION_FAMILLIALE = {
    CE: "Célibataire",
    CC: "Concubin(e)",
    PA: "Pacsé(e)",
    MA: "Marié(e)",
    DI: "Divorcé(e)",
    VE: "Veuf(ve)",
    SE: "Séparé(e) de corps",
};

export const APICIL_TYPE_SITUATION_PROFESSIONELLE = {
    AC: "Actif(ve)",
    // CE: "Cumul emploi retraite",
    ET: "Etudiant(e)",
    CH: "Recherche d’emploi",
    // RE: "Retraité(e)",
    IN: "Sans profession",
};

export const APICIL_TYPE_CATEGORIE_PROFESSIONNELLE = {
    "1": "Agriculteur",
    "2": "Artisan",
    "3": "Commerçant et assimilé",
    "4": "Chef(fe) d'entreprise",
    "5": "Profession libérale et assimilé",
    "6": "Cadre de la fonction publique",
    "7": "Professeur, profession scientifique",
    "9": "Profession des médias",
    "10": "Cadre admin. et commercial d'entreprise",
    "11": "Ingénieur(e) et cadre technique d'entreprise",
    "12": "Professeur des écoles et assimilé",
    "13": "Profession intermédiaire de la santé",
    "14": "Profession intermédiaire administrative",
    "15": "Technicien",
    "16": "Contremaître, agent de maîtrise",
    "17": "Employé(e) civil de la fonction publique",
    "18": "Employé(e) administratif d'entreprise",
    "19": "Employé(e) de commerce",
    "20": "Personnel des services directs aux particuliers",
    "21": "Ouvrier(e) qualifié(e)",
    "22": "Ouvrier(e) non qualifié(e)",
    "23": "Ouvrier(e) agricole",
    "28": "Chômeur(se) n'ayant jamais travaillé",
    "29": "Sans activité professionnelle",
    "30": "Membre du clergé, religieux",
    "32": "Chauffeur",
    "33": "Etudiant(e)",
    "34": "Sportif(ve) professionnel(le)",
};

export const APICIL_TYPE_PRODUIT = {
    IC: "INTENCIAL Liberalys Capi",
    IA: "INTENCIAL Liberalys Capi PM",
    IL: "INTENCIAL Liberalys Retraite",
    P2: "INTENCIAL Liberalys Vie",
    PE: "PERsPective Génération Plus",
};

export const APICIL_TYPE_VERSEMENT = {
    P: "Prélèvement bancaire",
    C: "Chèque",
    V: "Virement",
    T: "Transfert",
};

export const APICIL_TYPE_CHOIX_BENEFICIAIRE = {
    conjoint: "Conjoint(e)",
    enfants: "Enfants",
    heritiers: "Héritiers",
    manuscrite: "Manuscrite",
    notaire: "Notaire",
};

export const APICIL_TYPE_PERIODICITE = {
    Mensuelle: "Mensuelle",
    Trimestrielle: "Trimestrielle",
    Semestrielle: "Semestrielle",
    Annuelle: "Annuelle",
};
