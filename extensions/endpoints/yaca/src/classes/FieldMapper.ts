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

export class FieldMapper {
    private _mapping: any | null = null;

    constructor(mapping: any) {
        this._mapping = mapping;
    }

    map(name: string, value: string): any {
        return this._mapping[name] && this._mapping[name][value]
            ? this._mapping[name][value]
            : value;
    }
}
