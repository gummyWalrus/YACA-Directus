export const apicilMock = {
    produit: {
        code: "IL",
    },
    souscription: {
        fraisSurContrat: {
            tauxFraisSurArbitrage: 0.1,
            tauxFraisSurEncoursUC: 0.6,
            tauxFraisGestionEncoursEuro: 1,
            tauxMaxFraisSurTousTypesVersements: 0,
        },
        donneesBancaires: {
            bic: "CCOPFRPPXXX",
            iban: "FR7600000000000000000000097",
            titulaire: "Martin Dupont",
        },
        garantiePlancher: false,
        versementInitial: {
            montant: 500,
            modePaiement: "P",
            portefeuille: [
                {
                    isinCode: "LU2257980289",
                    repartition: 30,
                },
                {
                    isinCode: "LU1472740502",
                    repartition: 20,
                },
                {
                    isinCode: "LU1183791794",
                    repartition: 30,
                },
                {
                    isinCode: "LU0914733059",
                    repartition: 20,
                },
            ],
            origineDesFonds: {
                ofRevenusPro: null,
                ofCessionActifs: null,
                ofBiensMobiliers: null,
                ofAutresPlacements: "500",
                ofVenteImmobiliere: null,
                ofSuccessionDonation: null,
            },
            tauxDerogatoire: 0,
            reponsesSupportStructure: [],
        },
        clauseBeneficiaire: {
            choixBeneficiaire: "heritiers",
        },
        versementProgramme: {
            montant: "200",
            periodicite: "Mensuelle",
            portefeuille: [],
            tauxDerogatoire: "0",
            vpRepartitionSpecifique: false,
        },
        souscriptionRetraite: {
            souscriptionPerin: {
                deductionVi: false,
                deductionVp: false,
                ageDepartRetraite: 62,
            },
        },
    },
    profilGestion: {
        code: "LIBA",
    },
    connaissanceClient: {
        client: {
            revenus: [
                {
                    montant: 66000,
                    typeRevenu: {
                        code: "SALA",
                    },
                    preciserRevenu: null,
                },
                {
                    montant: 0,
                    typeRevenu: {
                        code: "FONC",
                    },
                    preciserRevenu: null,
                },
                {
                    montant: 0,
                    typeRevenu: {
                        code: "REVE",
                    },
                    preciserRevenu: null,
                },
                {
                    montant: 0,
                    typeRevenu: {
                        code: "PENS",
                    },
                    preciserRevenu: null,
                },
                {
                    montant: 0,
                    typeRevenu: {
                        code: "AUTR",
                    },
                    preciserRevenu: " ",
                },
            ],
            etatCivil: {
                nom: "Dupont",
                pays: {
                    code: "FR",
                },
                prenom: "Martin",
                civilite: {
                    code: "01",
                },
                nationalite: {
                    code: "FR",
                },
                nomNaissance: null,
                dateNaissance: "1980-01-01",
                villeNaissance: {
                    code: "67482",
                    libelle: "Strasbourg",
                },
                regimeMatrimonial: {
                    code: null,
                },
                situationFamiliale: {
                    code: "CE",
                },
                nombrePersonnesACharge: "0",
            },
            patrimoine: [
                {
                    montant: 0,
                    typePatrimoine: {
                        code: "IL",
                    },
                    preciserPatrimoine: null,
                },
                {
                    montant: 60000,
                    typePatrimoine: {
                        code: "LI",
                    },
                    preciserPatrimoine: null,
                },
                {
                    montant: 0,
                    typePatrimoine: {
                        code: "OA",
                    },
                    preciserPatrimoine: null,
                },
                {
                    montant: 0,
                    typePatrimoine: {
                        code: "RS",
                    },
                    preciserPatrimoine: null,
                },
                {
                    montant: 0,
                    typePatrimoine: {
                        code: "AP",
                    },
                    preciserPatrimoine: null,
                },
                {
                    montant: 0,
                    typePatrimoine: {
                        code: "VM",
                    },
                    preciserPatrimoine: null,
                },
                {
                    montant: 0,
                    typePatrimoine: {
                        code: "RP",
                    },
                    preciserPatrimoine: null,
                },
                {
                    montant: 0,
                    typePatrimoine: {
                        code: "AU",
                    },
                    preciserPatrimoine: " ",
                },
            ],
            informationsFiscales: {
                adressePrincipaleEtResidenceDifferents: false,
            },
            situationProfessionnelle: {
                nomEntreprise: "ITG",
                secteurActivite: {
                    code: "F",
                },
                situationActuelle: {
                    code: "AC",
                },
                professionActuelle: "Ingénieur d'étude",
                travailleurNonSalarie: false,
                categorieSocioProfessionnelle: {
                    code: "11",
                },
            },
            residentFiscalOuCitoyenUs: false,
        },
        commentaire: null,
        coordonnees: {
            email: "Martin.Dupont@gmail.com",
            adresse: {
                pays: {
                    code: "FR",
                },
                ville: {
                    libelle: "Paris",
                },
                codePostal: "75007",
                adressePrincipale: "11 quai branly ",
                adresseComplementaire: null,
            },
            telephoneMobile: {
                indicatif: "0033",
                numeroTelephone: "655665566",
            },
        },
    },
    typeSignature: "ELECTRONIQUE",
};
