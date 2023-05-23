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

export const harvestMock = {
    libelle: "Retraite V0",
    personnes: [
        {
            id: "ID_CLIENT",
            libelle: "Client",
            personnePhysique: {
                dateNaissance: "2003-04-14",
                civilite: "M",
            },
            carriereOptions: {
                ageDepartRetraiteEstime: 65,
                optionDepart: "AGE",
                nombreEnfantsImpactRetraite: {
                    nbEnfantsEleves: 0,
                },
            },
            carrierePeriodes: {
                carrierePeriodes: [
                    {
                        periodeId: "1",
                        dateDebut: "2022-07-01",
                        profession: {
                            csp: "P_CADRE",
                        },
                        periodiciteRevenus: "A",
                        typeRevenus: "NET",
                        profilRevenus: "LOGARITHMIQUE",
                        revenusPeriode: [
                            {
                                annee: 2022,
                                devise: "EUR",
                                type: "NET",
                                montant: 40000,
                                periodicite: "A",
                                saisi: false,
                                percu: true,
                            },
                        ],
                        tauxEvolution: 2,
                    },
                ],
            },
        },
    ],
    retraiteHypothese: {
        carriereRevenuDebutActiviteMoyen: true,
        hypothesesCalcul: [
            {
                calculId: "ID_CLIENT_TAUXPLEIN_0",
                personneId: "ID_CLIENT",
                ageRetraite: 65,
                optionDepart: "AGE",
            },
        ],
    },
};
