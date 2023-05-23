/**
 * Copyright (c) 2022 - Indigen Solutions
 * Authors:
 * - David PISTORI <david.pistori@indigen.com>
 * - Alexandre DE FREITAS MARTINS <alexandre.defreitasmartin@indigen.com>
 * - Loys CAUCHETEUX <loys.caucheteux@indigen.com>
 * NOTICE: All information contained here is, and remains
 * the property of Indigen Solutions and its suppliers, if any.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Indigen Solutions.
 */

import { toArray } from "@directus/shared/utils";

export function isUrlAllowed(
    url: string,
    allowList: string | string[]
): boolean {
    const urlAllowList = toArray(allowList);
    if (urlAllowList.includes(url)) return true;
    const parsedWhitelist = urlAllowList.map(allowedURL => {
        try {
            const { hostname, pathname } = new URL(allowedURL);
            return hostname + pathname;
        } catch (e) {
            console.error(e);
            console.warn(`Invalid URL in allow list: ${allowedURL}`);
            return "";
        }
    });
    try {
        const { hostname, pathname } = new URL(url);
        return parsedWhitelist.includes(hostname + pathname);
    } catch {
        return false;
    }
}
