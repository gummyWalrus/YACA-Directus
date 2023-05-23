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

export interface ISimulationResult {
    name: string;
    result: any;
    simulation_retirement_age: any;
    simulation_retirement_income: any;
    simulation_last_income: any;
    simulation_retirement_drop: any;
}

export interface IMortalitySimulationResult {
    name: string;
    death_age: number;
}
