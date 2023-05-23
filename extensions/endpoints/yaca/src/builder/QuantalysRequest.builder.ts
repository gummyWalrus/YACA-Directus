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
    IQuantalysFields,
    IQuantalysRequestApi,
} from "../types/IQuantalysRequestApi";

export class QuantalysRequestBuilder {
    private _request: any | undefined;

    public setRequest(request: any): this {
        this._request = request;
        return this;
    }

    public build(): IQuantalysRequestApi {
        return {
            Fields: this._buildFields(),
            ISINS: this._request.body.isins,
        };
    }

    private _buildFields(): IQuantalysFields[] {
        return [
            {
                Name: "Documents",
            },
            {
                Name: "ISIN",
            },
            {
                Name: "ShortName",
            },
            {
                Name: "Perf_And_Indicator",
                Children: [
                    {
                        Name: "Performance",
                        Children: [
                            {
                                Name: "Annualized",
                                Children: [
                                    {
                                        Name: "Daily",
                                        Children: [
                                            {
                                                Name: "Product",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        Name: "Rating",
                    },
                ],
            },
            {
                Name: "Detail",
                Children: [
                    {
                        Name: "Investment",
                        Children: [
                            {
                                Name: "Objective",
                            },
                            {
                                Name: "Strategy",
                            },
                        ],
                    },
                    {
                        Name: "ESG",
                    },
                    {
                        Name: "SRRI",
                    },
                ],
            },
        ];
    }
}
