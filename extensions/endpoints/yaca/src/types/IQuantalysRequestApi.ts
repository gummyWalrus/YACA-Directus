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

//To put on DB

export const IQuantalysISINSInvests: string[] = [
    "FR0010298596",
    "LU0366534344",
    "LU0104884860",
    "LU0340559557",
    "FR0010214213",
    "LU1883318740",
    "NL0000289783",
    "LU0248172537",
    "LU0106259392",
    "LU0171296865",
    "LU1665237704",
    "LU0880062913",
    "LU0099574567",
    "FR0000295230",
    "LU0217139020",
    "LU1951225553",
    "LU2257982228",
    "LU0172157280",
    "FR0011694256",
    "LU1956003765",
    "LU0280435388",
    "LU0130732364",
    "LU1530899142",
    "BE0946564383",
];

export type IQuantalysFieldsNames = keyof typeof QUANTALYS_FIELD_NAMES;

export interface IQuantalysRequestApi {
    Categories?: string[];
    CategoriesExclure?: string[];
    Fields: IQuantalysFields[];
    ISINS?: string[];
    Managers?: string[];
    Noms?: string[];
    OrderByProperty?: string;
    OrderBySort?: "Ascending" | "Descending";
    Page?: Boolean;
    PageIndex?: number;
    PageLength?: number;
    PEA?: Boolean;
    PEA_PME?: Boolean;
    TypeProduits?: string[];
}

export interface IQuantalysFields {
    Name: IQuantalysFieldsNames;
    Children?: IQuantalysFields[];
}

export const QUANTALYS_FIELD_NAMES = {
    ISIN: "ISIN",
    ShortName: "ShortName",
    LongName: "LongName",
    Perf_And_Indicator: "Perf_And_Indicator",
    Performance: "Performance",
    Annualized: "Annualized",
    Year: "Year",
    Detail: "Detail",
    Investment: "Investment",
    Objective: "Objective",
    Strategy: "Strategy",
    ESG: "ESG",
    SRRI: "SRRI",
    Product: "Product",
    Daily: "Daily",
    Rating: "Rating",
    Documents: "Documents",
};
