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

export class ApiException {
    public message: string = "";
    public status: number = 500;

    constructor(message: string, status: number = 500) {
        this.message = message;
        this.status = status;
    }
}
