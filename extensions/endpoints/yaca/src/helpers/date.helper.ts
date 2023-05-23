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

import dayjs, { Dayjs } from "dayjs";

function frenchFormatToUS(date: string) {
    const jj = date.slice(0, 2);
    const mm = date.slice(3, 5);
    const aaaa = date.slice(6, 10);
    return `${aaaa}-${mm}-${jj}`;
}

export function getDayJs(date: string): Dayjs {
    const newDate = frenchFormatToUS(date);
    return dayjs(newDate, "YYYY-MM-DD");
}
