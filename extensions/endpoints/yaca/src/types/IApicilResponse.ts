/**
 *  * Copyright (c) 2022 - Indigen Solutions
 *  * Authors:
 *  * - David PISTORI <david.pistori@indigen.com>
 *  * - Alexandre DE FREITAS MARTINS <alexandre.defreitasmartins@indigen.com>
 *  * NOTICE: All information contained here is, and remains
 *  * the property of Indigen Solutions and its suppliers, if any.
 *  * Dissemination of this information or reproduction of this material
 *  * is strictly forbidden unless prior written permission is obtained
 *  * from Indigen Solutions.
 */

export const apicilStatuses = [
    {
        code: "A_SIGNER_CLIENT",
        name: "A signer par le client",
        libelle: "Demande de souscription",
        categorie: "EN_COURS",
    },
    {
        code: "PJ_A_COMPLETER",
        name: "pièces jointes à compléter",
        libelle: "Pièces jointes à compléter",
        libelle_fini: "Pièces jointes complétées",
        categorie: "EN_COURS",
    },
    {
        code: "TRAITEMENT_DOSSIER_EN_COURS",
        name: "Traitement du dossier chez l'assureur",
        libelle: "Traitement du dossier chez l'assureur",
        libelle_fini: "Dossier traité chez l'assureur",
        categorie: "A_VALIDER",
    },
    {
        code: "DENOUE",
        name: "Contrat ouvert",
        libelle: "Contrat ouvert",
        categorie: "TERMINE",
    },
];

export const FUND_TYPES = {
    EURO: "FONDS_EURO",
    SCPI: "SCPI",
    SCI: "SCI",
    PRODUIT_STRUCTURE: "PRODUIT_STRUCTURE",
    OPC: "OPC",
    AUTRE: "AUTRE",
    OPC_AUTRE: "OPC_AUTRE",
    UP: "UP",
    ETF: "ETF",
    UC: "UC",
};

export const APICIL_DOCUMENT_STATUS = {
    NON_TRANSMIS: "En attente de transmission",
    VALIDE_KO: "Validation échouée",
    VALIDE_AUTO: "Validé automatiquement",
    SIGNE: "Signé",
};

export type IApicilFundType = keyof typeof FUND_TYPES;
export type IApicilDocumentStatus = keyof typeof APICIL_DOCUMENT_STATUS;

export interface IApicilContract {
    souscripteur: {
        prenom: string;
        nom: string;
        civilite: string;
    };
    contratId: string;
    statut: string;
    dateValorisationEncours: string;
    montantEncours: number;
    performanceGlobale: number;
    clauseBeneficiaire: {
        libelle: string;
    };
    infosPaiement: {
        cumulRachatPartiel: string;
        cumulRachatTotal: string;
        cumulVersementComplementaire: string;
        cumulVersementComplementaireAn: string;
        dateVersement: string;
        versementInitial: string;        
    };
    dateCreation?: string;
    dateEffet?: string;
    dateEffetFiscal?: string;
    dateEncaissement?: string;
}

export interface IApicilProject {
    connaissanceClient: {
        client: {
            etatCivil: {
                prenom: string;
                nom: string;
                civilite: {
                    libelle: string;
                };
            };
        };
    };
    souscription: {
        projetId: string;
        clauseBeneficiaire: {
            choixBeneficiaire: string;
        };
        dateSouscriptionOuProposition: string;
        dateValidite?: string;
        dateValiditeCompletudeDossier?: string;
        dateSignatureSepa?: string;
        dateEffet?: string;
    };
    contratId: string;
    statut: string;
    clauseBeneficiaire: {
        libelle: string;
        code: string;
    };
}

export interface IApicilDocument {
    documentInstanceDtos: {
        documentId: number;
        nomDuDocument: string;
    }[];
    typeDuDocument: string;
    libelleTypeDuDocument: string;
    description: string;
    statut: IApicilDocumentStatus;
}

export default interface IApicilResponse {
    project: IApicilProject;
    contract: IApicilContract;
    documents: {
        documentDtos: IApicilDocument[];
    };
}
