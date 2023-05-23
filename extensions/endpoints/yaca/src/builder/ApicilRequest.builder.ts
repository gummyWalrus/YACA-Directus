/**
 * Copyright (c) 2023 - Indigen Solutions
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
    APICIL_HORIZON_INVESTISSEMENT,
    IApicilAdresse,
    IApicilClient,
    IApicilConnaissanceClient,
    IApicilCoordonnees,
    IApicilDonneesBancaires,
    IApicilEtatCivil,
    IApicilFraisSurContrat,
    IApicilHorizonInvestissement,
    IApicilOrigineDesFonds,
    IApicilPatrimoine,
    IApicilRequestApi,
    IApicilRevenus,
    IApicilSituationProfessionnelle,
    IApicilSouscription,
    IApicilTypePatrimoine,
    IApicilTypeRevenu,
    IApicilVersementInitial,
    IApicilVersementProgramme,
} from "../types/IApicilRequestApi";

import { APICIL_VILLE, IApicilVille } from "../types/IApicilCityApi";

import { getDayJs } from "../helpers/date.helper";
import { IHarvestProfession } from "../types/IHarvestRequestApi";
import { apicilMapping } from "../data/apicil.mapping";

export class ApicilRequestBuilder {
    private _request: any | undefined;

    public setRequest(request: any): this {
        this._request = request;
        return this;
    }

    public build(): IApicilRequestApi {
        return {
            produit: { code: "IL" },
            souscription: this._getSouscription(),
            profilGestion: { code: "LIBA" },
            connaissanceClient: this._getConnaissanceClient(),
            typeSignature: "ELECTRONIQUE",
        };
    }

    private _getSouscription(): IApicilSouscription {
        let subscription: IApicilSouscription = {
            fraisSurContrat: this._getFraisSurContrat(),
            // donneesBancaires: this._getDonneesBancaires(), // TODO: V2
            dureeContrat: "Viagère",
            garantiePlancher:
                false /* this._request["apicil_garantee"] === "true" */, // TODO: V2
            objectifInvestissement: {
                code: "OBJ7",
            },
            versementInitial: this._getVersementInitial(),
            clauseBeneficiaire: {
                choixBeneficiaire:
                    this._request["apicil_beneficiary"],
            },
            horizonInvestissement: this._getHorizonInvestissement(),
        };
        if (this._request["invest_monthly"] === "true") {
            subscription["versementProgramme"] = this._getVersementProgramme();
        }
        return subscription;
    }

    private _getHorizonInvestissement() {
        switch (this._request["profil_horizon"]) {
            case "short":
                return {
                    code: "H1" as IApicilHorizonInvestissement,
                    libelle: APICIL_HORIZON_INVESTISSEMENT["H1"],
                };
            case "medium":
                return {
                    code: "H2" as IApicilHorizonInvestissement,
                    libelle: APICIL_HORIZON_INVESTISSEMENT["H2"],
                };
            case "long":
                return {
                    code: "H3" as IApicilHorizonInvestissement,
                    libelle: APICIL_HORIZON_INVESTISSEMENT["H3"],
                };
            default:
                return {
                    code: "H3" as IApicilHorizonInvestissement,
                    libelle: APICIL_HORIZON_INVESTISSEMENT["H3"],
                };
        }
    }

    private _getFraisSurContrat(): IApicilFraisSurContrat {
        return {
            tauxFraisSurArbitrage: 0.1, // TODO: Peux pas mettre 0 sinon erreur (les bornes des frais sur arbitrages ne sont pas respectées)
            tauxFraisSurEncoursUC: 0.8,
            tauxFraisGestionEncoursEuro: 0.8,
            tauxMaxFraisSurTousTypesVersements: 0,
        };
    }

    private _getDonneesBancaires(): IApicilDonneesBancaires {
        return {
            bic: this._request["apicil_rib"].bic,
            iban: this._request["apicil_rib"].iban,
            titulaire: `${this._request["apicil_common_firstname"]} ${this._request["apicil_common_lastname"]}`,
        };
    }

    private _getVersementInitial(): IApicilVersementInitial {
        return {
            montant: parseFloat(this._request["invest_initial_amount"]),
            modePaiement: "P",
            portefeuille: this._getPortefeuilleFromFunds(
                "invest_initial_funds_computed"
            ),
            origineDesFonds: this._getOrigineDesFonds(),
            tauxDerogatoire: 0,
        };
    }

    private _getPortefeuilleFromFunds(fundsName: string) {
        const funds = this._request[fundsName];
        const portefeuille = funds.map((fund: any) => {
            return {
                isinCode: fund["isin"],
                repartition: parseFloat((fund["repartition"] * 100).toFixed(2)),
            };
        });
        const fixedPortefeuille = this._checkPortefeuille(portefeuille);
        return fixedPortefeuille;
    }

    private _checkPortefeuille(portefeuille: any[]) {
        const sum = portefeuille.reduce((acc: number, fund: any) => {
            return acc + fund.repartition;
        }, 0);
        if (sum !== 100) {
            const diff = 100 - sum;
            const lastFund = portefeuille[portefeuille.length - 1];
            lastFund.repartition = parseFloat(
                (lastFund.repartition + diff).toFixed(2)
            );
        }
        return portefeuille;
    }

    private _getVersementProgramme(): IApicilVersementProgramme {
        return {
            montant: parseInt(this._request["invest_monthly_amount"]),
            periodicite: "Mensuelle",
            portefeuille: this._getPortefeuilleFromFunds(
                "invest_monthly_funds_computed"
            ),
            tauxDerogatoire: 0,
            vpRepartitionSpecifique: true,
        };
    }

    private _getOrigineDesFonds(): IApicilOrigineDesFonds {
        const originKey: string = this._request["apicil_invest_origin"];
        let origins: any = {};
        origins[originKey] = parseFloat(this._request["invest_initial_amount"]);
        const result: IApicilOrigineDesFonds = {
            ofRevenusPro: origins.professionnel
                ? parseFloat(origins.professionnel.toFixed(2))
                : 0,
            ofCessionActifs: origins.actifs
                ? parseFloat(origins.actifs.toFixed(2))
                : 0,
            ofBiensMobiliers: origins.mobiliers
                ? parseFloat(origins.mobiliers.toFixed(2))
                : 0,
            ofAutresPlacements: origins.placement
                ? parseFloat(origins.placement.toFixed(2))
                : 0,
            ofVenteImmobiliere: origins.immobilier
                ? parseFloat(origins.immobilier.toFixed(2))
                : 0,
            ofSuccessionDonation: origins.succession
                ? parseFloat(origins.succession.toFixed(2))
                : 0,
        };
        if (origins.autre) {
            result["ofAutre"] = origins.autre;
            result["ofAutreCommentaire"] =
                this._request["apicil_per_invest_origin_autre"];
        }
        return result;
    }

    /*
    private _getSouscriptionRetraite(): IApicilSouscriptionRetraite {
        return {
            souscriptionPerin: {
                deductionVi: false, // TODO ?
                deductionVp: false, // TODO ?
                ageDepartRetraite: this._request["simulation_retirement_age"],
            },
        };
    }
     */

    private _getConnaissanceClient(): IApicilConnaissanceClient {
        const patrimoineConjoint = this._getPatrimoines("conjoint");
        const revenusConjoint = this._getRevenus("conjoint");
        const patrimoineFoyer = this._getPatrimoines("foyer");
        const revenusFoyer = this._getRevenus("foyer");
        let connaissanceClient: IApicilConnaissanceClient = {
            client: this._getClient(),
            commentaire: "Commentaire",
            coordonnees: this._getCoordonnees(),
            conjoint: {},
            foyer: {}, 
        };
        if (patrimoineConjoint.length > 0) {
            connaissanceClient.conjoint.patrimoine = patrimoineConjoint;
        }
        if (revenusConjoint.length > 0) {
            connaissanceClient.conjoint.revenus = revenusConjoint;
        }
        if (patrimoineFoyer.length > 0) {
            connaissanceClient.foyer.patrimoine = patrimoineFoyer;
        }
        if (revenusFoyer.length > 0) {
            connaissanceClient.foyer.revenus = revenusFoyer;
        }
        return connaissanceClient;
    }

    private _getClient(): IApicilClient {
        const patrimoineClient = this._getPatrimoines("moi");
        const revenusClient = this._getRevenus("moi");
        let client: IApicilClient = {
            etatCivil: this._getEtatCivil(),
            informationsFiscales: {
                adressePrincipaleEtResidenceDifferents:
                    this._request["apicil_contact_is_fiscal_address"] ===
                    "false",
            },
            situationProfessionnelle: this._getSituationProfessionnelle(),
            residentFiscalOuCitoyenUs: false,
        };
        if (
            client.informationsFiscales.adressePrincipaleEtResidenceDifferents
        ) {
            client.informationsFiscales.adresseFiscale = this._getAdresse(
                "apicil_contact_fiscal_address"
            );
        }
        if (patrimoineClient.length > 0) {
            client.patrimoine = patrimoineClient;
        }
        if (revenusClient.length > 0) {
            client.revenus = revenusClient;
        }
        return client;
    }

    private _getCoordonnees(): IApicilCoordonnees {
        return {
            email: this._request["common_email"],
            adresse: this._getAdresse(),
            telephoneMobile: {
                indicatif: this._request["apicil_contact_phone"]
                    .substring(0, 3)
                    .replace("+", "00"),
                numeroTelephone:
                    this._request["apicil_contact_phone"].substring(7),
            },
        };
    }

    private _getAdresse(
        key: string = "apicil_contact_address"
    ): IApicilAdresse {
        const address = this._request[key];
        return {
            pays: { code: "FR" },
            ville: {
                libelle: address.city,
            },
            codePostal: address.postcode,
            adressePrincipale: address.name,
            adresseComplementaire: address.complementary ?? "",
        };
    }

    private _getRevenus(mode: "conjoint" | "foyer" | "moi" ): IApicilRevenus[] {
        let revenus: IApicilRevenus[] = [];
        if (mode === "moi") {
            this._getRevenu(revenus, "SALA", "simulation_actual_salary");
        }
        if (this._request["profile_location_property_rent"] && this._request["profile_estate_patrimony"]["IL"].owner.name === mode) {
            revenus.push({
                montant: parseFloat(parseFloat(this._request["profile_location_property_rent"]).toFixed(2)),
                typeRevenu: {
                    code: "FONC",
                },
            });
        }
        this._getRevenuWithOwner(revenus, mode, "EMPR", "profile_credits_monthly", "profile_credits_owner");
        return revenus;
    }

    private _getRevenu(
        revenus: IApicilRevenus[],
        code: IApicilTypeRevenu,
        name: string,
        detailName?: string
    ) {
        if (this._request[name]) {
            revenus.push({
                montant: parseFloat(parseFloat(this._request[name]).toFixed(2)),
                typeRevenu: {
                    code: code,
                },
                preciserRevenu: detailName ? this._request[detailName] : null,
            });
        }
    }

    private _getRevenuWithOwner(
        revenus: IApicilRevenus[],
        mode: "conjoint" | "moi" | "foyer",
        code: IApicilTypeRevenu,
        name: string,
        ownerName: string
    ) {
        if (this._request[name] && this._request[ownerName] === mode) {
            revenus.push({
                montant: parseFloat(parseFloat(this._request[name]).toFixed(2)),
                typeRevenu: {
                    code: code,
                },
            });
        }
    }
       

    private _getPatrimoines(mode: "conjoint" | "foyer" | "moi" ): IApicilPatrimoine[] {
        const patrimoine: IApicilPatrimoine[] = [];
        this._getPatrimoine(
            patrimoine,
            mode,
            "RP",
        );
        this._getPatrimoine(
            patrimoine,
            mode,
            "RS",
        );
        this._getPatrimoine(
            patrimoine,
            mode,
            "IL",
        );
        this._getPatrimoine(
            patrimoine,
            mode,
            "VM",
        );
        this._getPatrimoine(
            patrimoine,
            mode,
            "LI",
        );
        this._getPatrimoine(
            patrimoine,
            mode,
            "OA"
        );
        this._getPatrimoine(
            patrimoine,
            mode,
            "AP",
        );
        this._getPatrimoine(
            patrimoine,
            mode,
            "AU",
            "profile_financial_autre_detail"
        );
        if (this._request["profile_amount_credits"] && (this._request["profile_credits_owner"] === mode || (this._request["profile_credits_owner"] === undefined && mode === "moi"))) {
            patrimoine.push({
                typePatrimoine: {
                    code: "EM",
                },
                montant: parseFloat(parseFloat(this._request["profile_amount_credits"]).toFixed(2)),
            });
        }
        return patrimoine;
    }

    private _getPatrimoine(
        patrimoines: IApicilPatrimoine[],
        mode: "conjoint" | "moi" | "foyer",
        code: IApicilTypePatrimoine,
        detailName?: string
    ) {
        if (
            (this._request.profile_financial_patrimony[code] || this._request.profile_estate_patrimony[code]) &&
            (this._request["profile_financial_types"].includes(code) ||
                this._request["profile_estate_types"].includes(code))
        ) {
            let patrimonyObject;
            if (this._request.profile_financial_patrimony[code]) {
                patrimonyObject = this._request.profile_financial_patrimony[code];
            } else if (this._request.profile_estate_patrimony[code]) {
                patrimonyObject = this._request.profile_estate_patrimony[code];
            }
            if (patrimonyObject.owner.name === mode) {
            patrimoines.push({
                montant: parseFloat(parseFloat(patrimonyObject.amount).toFixed(2)),
                typePatrimoine: {
                    code,
                },
                preciserPatrimoine: detailName
                    ? this._request[detailName]
                    : null,
            });
        }
        }
    }

    private _getEtatCivil(): IApicilEtatCivil {
        let etatCivil: IApicilEtatCivil = {
            nom: this._request["apicil_common_lastname"],
            nomNaissance: this._request["apicil_common_birthname"]
                ? this._request["apicil_common_birthname"]
                : this._request["apicil_common_lastname"],
            pays: {
                code:
                    this._request["apicil_common_born_in_france"] === "true"
                        ? "FR"
                        : this._request["apicil_birth_country"],
            },
            prenom: this._request["apicil_common_firstname"],
            civilite: {
                code: this._request["common_genre"] === "male" ? "01" : "03",
            },
            nationalite: {
                code: this._request["apicil_common_nationality"],
            },
            dateNaissance:
                getDayJs(this._request["apicil_common_birthdate"]).get("year") +
                "-" +
                getDayJs(this._request["apicil_common_birthdate"]).get("month") +
                "-" +
                getDayJs(this._request["apicil_common_birthdate"]).get("date"),

            villeNaissance: {
                code:
                    this._request["apicil_common_born_in_france"] === "true"
                        ? this._request["apicil_birth_city"]
                        : "99999",
                libelle: this._getBirthCityName(),
            },
            situationFamiliale: {
                code: this._request["common_family_situation"],
            },
            nombreEnfants: this._request["common_children"],
            nombrePersonnesACharge: this._request["common_people_dependent"],
        };
        if (this._request["common_family_situation"] === "MA") {
            etatCivil["regimeMatrimonial"] = {
                code: this._request["common_family_regime"],
            };
        }
        return etatCivil;
    }

    private _getBirthCityName(): string {
        if (this._request["apicil_common_born_in_france"] === "true") {
            return (
                APICIL_VILLE[
                    this._request["apicil_birth_city"] as IApicilVille
                ] || "libelle"
            );
        } else {
            return this._request["apicil_birth_city_name"] || "libelle";
        }
    }

    private _getSituationProfessionnelle(): IApicilSituationProfessionnelle {
        let situationProfessionnelle: IApicilSituationProfessionnelle = {
            anneeDepartRetraite: this._request["simulation_last_income_year"],
            situationActuelle: {
                code: this._request["simulation_work_situation"],
            },
            categorieSocioProfessionnelle: {
                code: apicilMapping.typeCsp[this._getCSP()], // TODO: @LC Mappping
            },
        };
        if (this._request["simulation_work_situation"] === "AC") {
            return {
                ...situationProfessionnelle,
                secteurActivite: {
                    code: this._request["simulation_work_sector"],
                },
                situationActuelle: {
                    code: this._request["simulation_work_csp"],
                },
                professionActuelle: this._getProfession(),
                travailleurNonSalarie:
                    this._request["simulation_work_tns"] === "true"
                        ? true
                        : false,
            };
        }
        return situationProfessionnelle;
    }

    private _getCSP(): IHarvestProfession {
        const text = this._request["simulation_work_profession"];
        return text.split("|")[0];
    }

    private _getProfession() {
        const text = this._request["simulation_work_profession"];
        return text.split("|")[1];
    }
}
