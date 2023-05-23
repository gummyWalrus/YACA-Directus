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


import {
    IHarvestCivilite,
    IHarvestProfession,
} from "../types/IHarvestRequestApi";

import {ICivilite, IProfession} from "../types/ISimulationRequest";

interface ValuesMapping {
    typeSexe: { [key in ICivilite]: IHarvestCivilite };
    typeProfession: { [key in IProfession]: IHarvestProfession };
}

export const harvestMapping: ValuesMapping = {
    typeSexe: {
        M: "M",
        MME: "MME",
    },
    typeProfession: {
        CADRE: "P_CADRE",
        OUVRIER: "P_NONCADRE",
    },
};
