/**
 * Copyright (c) 2022 - Indigen Solutions
 * Authors:
 * - David PISTORI <david.pistori@indigen.com>
 * - Alexandre DE FREITAS MARTINS <alexandre.defreitasmartins@indigen.com>
 * - Loys CAUCHETEUX <loys.caucheteux@indigen.com>
 * NOTICE: All information contained here is, and remains
 * the property of Indigen Solutions and its suppliers, if any.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Indigen Solutions.
 */

export interface IQuantalysResult {
    results: any;
    invests: IQuantalysInvests[];
}

export interface IQuantalysDocuments {
    prospectus: string;
    DICI: string;
    report: string;
    commercial: string;
}

export interface IQuantalysInvests {
    isin: string;
    shortName: string;
    performance: IQuantalysPerformance;
    objective: string;
    strategy: string;
    riskIndicator: object;
    SFDRClassification: number;
    rating: number;
    documents: IQuantalysDocuments;
}

export interface IQuantalysPerformance {
    "J-1"?: number;
    "1S"?: number;
    "1M"?: number;
    "3M"?: number;
    "6M"?: number;
    YTD?: number;
    "1A"?: number;
    "2A"?: number;
    "3A"?: number;
    "4A"?: number;
    "5A"?: number;
    "6A"?: number;
    "7A"?: number;
    "8A"?: number;
    "9A"?: number;
    "10A"?: number;
}
