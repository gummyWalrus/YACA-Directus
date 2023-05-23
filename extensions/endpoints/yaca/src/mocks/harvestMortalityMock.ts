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

import { IHarvestMortalityRequestApi } from "../types/IHarvestMortalityRequestApi";

export const harvestMortalityMock: IHarvestMortalityRequestApi = {
    id: "string",
    libelle: "string",
    personnes: [
        {
            id: "string",
            libelle: "string",
            personnePhysique: {
                dateNaissance: "1977-11-10",
                civilite: "M",
            },
        },
    ],
    esperanceVieHypotheses: {
        dateCalcul: "2021-11-10",
        tableMortalite: "TPG05",
        personneId: "string",
    },
};
