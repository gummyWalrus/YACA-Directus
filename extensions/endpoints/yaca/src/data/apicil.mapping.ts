import { IHarvestProfession } from "../types/IHarvestRequestApi";
import {
    IApicilCategorieProfessionnelle,
    IApicilTypePatrimoine,
} from "../types/IApicilRequestApi";

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

interface ValuesMapping {
    typeCsp: { [key in IHarvestProfession]: IApicilCategorieProfessionnelle };
    typePatrimoine: { [key: string]: IApicilTypePatrimoine };
}

export const apicilMapping: ValuesMapping = {
    typeCsp: {
        P_NONCADRE: "18",
        P_ART36: "18",
        P_CADRE: "10",
        P_CADRESUP: "11",
        P_CCPMA: "1",
        P_EXPCMPT_SALARIE: "10",
        P_AVOCAT_SALARIE: "10",
        P_CCPMA_NON_CADRE: "23",

        P_AGENTETAT: "17",
        P_CCPMA_CADRE: "16",
        P_AGRICA_NON_CADRE: "23",
        P_AGRICA_CADRE: "16",
        P_EXPATRIE_NONCADRE_CFE: "18",
        P_EXPATRIE_CADRE_CFE: "10",
        P_EXPATRIE_NONCADRE: "18",
        P_EXPATRIE_CADRE: "10",
        P_FONCT: "17",
        P_FONCT_TERRITORIAL: "17",
        P_MILITAIRE: "6", // TODO: @LC: check this one
        P_MILITAIRE_OFFICIER: "6",
        P_EXPLAGR: "1",
        P_CONJOINT_EXPLAGR: "1",
        P_EXPLAGR_AUTRE: "1",
        P_EXPLAGR_CONJOINT_PARTICIPANT: "1",
        P_CLERC: "5",
        P_MARIN_SALARIE: "22",
        P_MARIN_ARTISAN: "2",
        P_AUTO_ENTREPRENEUR: "3",
        P_ARTISAN: "2",
        P_CONJOINT_ARTISAN: "2",
        P_COMMERCANT: "3",
        P_CONJOINT_COMMERCANT: "3",
        P_GERANT_COMMERCANT: "4",
        P_CONJOINT_PROFLIB: "5",
        P_AGASSUR: "3",
        P_ARCHI: "5",
        P_ARTISTE: "9",
        P_AUXMED: "13",
        P_AVOCAT: "5",
        P_CONJOINT_AVOCAT: "5",
        P_CHIRDEN: "5",
        P_EXPCMPT: "5",
        P_GEOMETRE: "15",
        P_MEDECIN: "5",
        P_NOTAIRE: "5",
        P_OFFMIN: "6",
        P_PHARMA: "5",
        P_SAGEF: "13",
        P_VETO: "5",
        P_INACT_MALADIE: "29",
        P_INACT_AVPF: "29",
        P_CHOMAGE: "29",
    },
    typePatrimoine: {
        principal: "RP",
        secondary: "RS",
        location: "IL",
        liquidites: "LI",
        "assurance-vie": "VM",
        autre: "AU",
    },
};

export const apicilTransmissionBulletinRequest = {
    contenu:
        "Merci de nous avoir fait confiance ! Voici votre bulletin de souscription.",
    objet: "[YACA] Votre bulletin de souscription !",
    logo: {
        extensions:
            "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkNhbHF1ZV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTU1IDU0LjI4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNTUgNTQuMjg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojMjUzRjQxO30KCS5zdDF7ZmlsbDojRUU3NDU5O30KPC9zdHlsZT4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTM4LjAxLDQyLjM4djcuMDhoLTAuODh2LTcuMDhIMzguMDF6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zOS41MSw0NC4zM2gwLjg0djAuNzNjMC4zMi0wLjU2LDAuOTEtMC44NiwxLjYzLTAuODZjMS4wNiwwLDIuMDMsMC42OSwyLjAzLDIuMTZ2My4xaC0wLjg1VjQ2LjYKCWMwLTEuMDYtMC41Ny0xLjYxLTEuMzQtMS42MWMtMC44NSwwLTEuNDUsMC42Ny0xLjQ1LDEuNjF2Mi44NmgtMC44NUwzOS41MSw0NC4zM3oiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ5LjU3LDQ0LjMzbC0yLjI2LDUuMTJoLTAuNTdsLTIuMjYtNS4xMmgwLjk1bDEuNjEsMy45MmwxLjYtMy45MUw0OS41Nyw0NC4zM3oiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTU0Ljc3LDQ3LjI1aC00LjExYzAuMTIsMC44MSwwLjY2LDEuNTIsMS44NCwxLjUyYzAuNjUtMC4wMSwxLjI4LTAuMjIsMS44MS0wLjU4bDAuMzYsMC42NgoJYy0wLjY0LDAuNDctMS40MSwwLjcxLTIuMTksMC43MWMtMS45NCwwLTIuNzItMS4zNi0yLjcyLTIuNjljMC0xLjUyLDEuMDQtMi42NywyLjU4LTIuNjdjMS40MiwwLDIuNDYsMC45NywyLjQ2LDIuNgoJQzU0LjgsNDcuMDIsNTQuNzgsNDcuMTQsNTQuNzcsNDcuMjV6IE01MC42Niw0Ni40OWgzLjI0Yy0wLjA1LTAuOTQtMC43My0xLjUtMS41Ni0xLjVDNTEuNDUsNDQuOTgsNTAuOCw0NS42Miw1MC42Niw0Ni40OQoJTDUwLjY2LDQ2LjQ5eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTUuMjksNDguNDRsMC42NS0wLjQ1YzAuMzEsMC41OCwwLjgxLDAuODIsMS4yNSwwLjgyYzAuNTgsMCwwLjk0LTAuMzUsMC45NC0wLjc0YzAtMC4zMy0wLjIxLTAuNTQtMC40OS0wLjY5CgljLTAuMzItMC4xNy0wLjk0LTAuNC0xLjI2LTAuNThjLTAuMjMtMC4xMS0wLjQyLTAuMjktMC41Ni0wLjVjLTAuMTQtMC4yMi0wLjIxLTAuNDctMC4yMS0wLjcyYzAtMC43OSwwLjYyLTEuNDIsMS42My0xLjQyCgljMC42MiwwLDEuMjgsMC4yNywxLjYsMC44MmwtMC41OCwwLjUxYy0wLjExLTAuMTktMC4yNy0wLjM0LTAuNDYtMC40NGMtMC4xOS0wLjExLTAuNC0wLjE2LTAuNjItMC4xNmMtMC41MSwwLTAuNzYsMC4zMi0wLjc2LDAuNjUKCWMwLDAuMTMsMC4wNCwwLjI2LDAuMTIsMC4zOGMwLjA4LDAuMTEsMC4xOCwwLjIsMC4zMSwwLjI1YzAuMzUsMC4xNywwLjg2LDAuMzYsMS4yNiwwLjU3YzAuNTMsMC4yOCwwLjg3LDAuNjcsMC44NywxLjI5CgljMCwwLjg0LTAuNzQsMS41NC0xLjgxLDEuNTRjLTAuMzksMC4wMS0wLjc3LTAuMDktMS4xLTAuMjlDNTUuNzMsNDkuMDgsNTUuNDYsNDguNzksNTUuMjksNDguNDR6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02My4xNyw0OS4xNWMtMC4zOSwwLjI5LTAuODYsMC40NC0xLjM0LDAuNDNjLTEuMSwwLTEuNjItMC43My0xLjYyLTEuOTF2LTIuNjFoLTAuOTF2LTAuNzRoMC45MnYtMS44MWgwLjg0Cgl2MS44MWgxLjgzdjAuNzRoLTEuODN2Mi42OWMwLDAuNjMsMC4yMiwxLjAzLDAuODQsMS4wM2MwLjMzLTAuMDEsMC42NS0wLjEyLDAuOTMtMC4zMUw2My4xNyw0OS4xNXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzLjU4LDQyLjk1YzAtMC4wOCwwLjAyLTAuMTcsMC4wNS0wLjI0YzAuMDMtMC4wOCwwLjA4LTAuMTUsMC4xNC0wLjJjMC4wNi0wLjA2LDAuMTMtMC4xLDAuMjEtMC4xMwoJYzAuMDgtMC4wMywwLjE2LTAuMDQsMC4yNS0wLjA0YzAuMDgsMCwwLjE2LDAuMDEsMC4yNCwwLjA1YzAuMDgsMC4wMywwLjE0LDAuMDgsMC4yLDAuMTNjMC4wNiwwLjA2LDAuMSwwLjEzLDAuMTMsMC4yCglzMC4wNSwwLjE2LDAuMDUsMC4yNGMwLDAuMDgtMC4wMSwwLjE3LTAuMDQsMC4yNGMtMC4wMywwLjA4LTAuMDgsMC4xNS0wLjEzLDAuMjFjLTAuMDYsMC4wNi0wLjEzLDAuMTEtMC4yLDAuMTQKCWMtMC4wOCwwLjAzLTAuMTYsMC4wNS0wLjI0LDAuMDVjLTAuMDgsMC0wLjE3LTAuMDEtMC4yNS0wLjA0Yy0wLjA4LTAuMDMtMC4xNS0wLjA4LTAuMjEtMC4xNHMtMC4xMS0wLjEzLTAuMTQtMC4yMQoJQzYzLjU5LDQzLjEyLDYzLjU4LDQzLjA0LDYzLjU4LDQyLjk1eiBNNjMuNzgsNDkuNDZ2LTUuMTNoMC44NXY1LjEzSDYzLjc4eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjUuOTQsNDQuMzNoMC44djAuNzdjMC4zMS0wLjYxLDAuOC0wLjksMS40OS0wLjljMC4yLDAsMC40LDAuMDMsMC41OSwwLjA4bC0wLjA4LDAuODMKCWMtMC4xNy0wLjA2LTAuMzUtMC4wOC0wLjUzLTAuMDljLTAuNzgsMC0xLjQyLDAuNTItMS40MiwxLjY4djIuNzZoLTAuODVMNjUuOTQsNDQuMzN6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03Ni4zNSw0Mi4yMXY3LjI1SDc1LjV2LTAuNzJjLTAuMjIsMC4yNy0wLjQ5LDAuNDktMC44MSwwLjYzYy0wLjMxLDAuMTUtMC42NiwwLjIyLTEsMC4yMQoJYy0xLjUsMC0yLjU5LTEuMi0yLjU5LTIuNjljMC0xLjQ5LDEuMDktMi42OCwyLjU2LTIuNjhjMC4zNS0wLjAxLDAuNywwLjA3LDEuMDIsMC4yM2MwLjMyLDAuMTUsMC42LDAuMzgsMC44MSwwLjY2di0yLjg5SDc2LjM1egoJIE03NS41Nyw0Ni44OWMwLTEuMDMtMC43LTEuOS0xLjgtMS45Yy0xLjEsMC0xLjgsMC44Ny0xLjgsMS45YzAsMS4wMywwLjcsMS45MSwxLjgsMS45MUM3NC44Nyw0OC44LDc1LjU3LDQ3Ljk0LDc1LjU3LDQ2Ljg5eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODIuNTYsNDQuMzN2NS4xM2gtMC44MnYtMC43NGMtMC4yMiwwLjI3LTAuNSwwLjQ5LTAuODEsMC42NGMtMC4zMiwwLjE1LTAuNjYsMC4yMi0xLjAyLDAuMjIKCWMtMS40OCwwLTIuNTctMS4xOS0yLjU3LTIuNzJjMC0xLjUzLDEuMDktMi42NSwyLjU3LTIuNjVjMC4zNSwwLDAuNywwLjA3LDEuMDIsMC4yM2MwLjMyLDAuMTUsMC42LDAuMzgsMC44MSwwLjY2di0wLjc2SDgyLjU2egoJIE04MS44LDQ2Ljg5YzAtMS4wMy0wLjcxLTEuOS0xLjgxLTEuOWMtMS4xLDAtMS43OSwwLjg3LTEuNzksMS45MWMwLDEuMDMsMC42OSwxLjksMS43OSwxLjlDODEuMSw0OC44LDgxLjgsNDcuOTQsODEuOCw0Ni44OXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTgzLjg3LDQ0LjMzaDAuODN2MC43M2MwLjMyLTAuNTYsMC45MS0wLjg2LDEuNjMtMC44NmMxLjA2LDAsMi4wMywwLjY5LDIuMDMsMi4xNnYzLjFoLTAuODVWNDYuNgoJYzAtMS4wNi0wLjU3LTEuNjEtMS4zNC0xLjYxYy0wLjg1LDAtMS40NSwwLjY3LTEuNDUsMS42MXYyLjg2aC0wLjg1TDgzLjg3LDQ0LjMzeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODkuMTQsNDguNDRsMC42NS0wLjQ1YzAuMzEsMC41OCwwLjgxLDAuODIsMS4yNSwwLjgyYzAuNTgsMCwwLjk0LTAuMzUsMC45NC0wLjc0YzAtMC4zMy0wLjIxLTAuNTQtMC40OS0wLjY5CgljLTAuMzItMC4xNy0wLjk0LTAuNC0xLjI3LTAuNThjLTAuMjMtMC4xMS0wLjQyLTAuMjktMC41Ni0wLjVjLTAuMTQtMC4yMi0wLjIxLTAuNDctMC4yMS0wLjcyYzAtMC43OSwwLjYyLTEuNDIsMS42My0xLjQyCgljMC42MiwwLDEuMjgsMC4yNywxLjYsMC44MmwtMC41NywwLjUxYy0wLjExLTAuMTktMC4yNy0wLjM0LTAuNDYtMC40NGMtMC4xOS0wLjExLTAuNC0wLjE2LTAuNjItMC4xNmMtMC41MSwwLTAuNzYsMC4zMi0wLjc2LDAuNjUKCWMwLDAuMTMsMC4wNCwwLjI2LDAuMTIsMC4zOGMwLjA4LDAuMTEsMC4xOCwwLjIsMC4zMSwwLjI1YzAuMzQsMC4xNywwLjg2LDAuMzYsMS4yNSwwLjU3YzAuNTMsMC4yOCwwLjg3LDAuNjcsMC44NywxLjI5CgljMCwwLjg0LTAuNzQsMS41NC0xLjgxLDEuNTRjLTAuMzksMC4wMS0wLjc3LTAuMDktMS4xLTAuMjlDODkuNTgsNDkuMDgsODkuMzEsNDguNzksODkuMTQsNDguNDR6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMDAuMjksNDQuMzNsLTIuMjYsNS4xMmgtMC41N2wtMi4yNi01LjEyaDAuOTVsMS42MSwzLjkxbDEuNi0zLjkxSDEwMC4yOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwMC40Nyw0Ni44OWMwLTAuNzEsMC4yOC0xLjM5LDAuNzktMS45YzAuNS0wLjUsMS4xOS0wLjc5LDEuOS0wLjc5czEuMzksMC4yOCwxLjksMC43OQoJYzAuNSwwLjUsMC43OSwxLjE5LDAuNzksMS45YzAsMS40OS0xLjExLDIuNjktMi42OCwyLjY5QzEwMS41OCw0OS41OCwxMDAuNDcsNDguMzksMTAwLjQ3LDQ2Ljg5eiBNMTA0Ljk3LDQ2Ljg5CgljMC0xLjAzLTAuNzktMS45LTEuODItMS45Yy0xLjAzLDAtMS44MiwwLjg3LTEuODIsMS45YzAsMS4wMywwLjgsMS45MSwxLjgyLDEuOTFDMTA0LjE4LDQ4LjgsMTA0Ljk3LDQ3Ljk0LDEwNC45Nyw0Ni44OXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTExMC4wMyw0OS4xNWMtMC4zOSwwLjI5LTAuODYsMC40NC0xLjM0LDAuNDNjLTEuMSwwLTEuNjItMC43My0xLjYyLTEuOTF2LTIuNjFoLTAuOTF2LTAuNzRoMC45MnYtMS44MWgwLjg0Cgl2MS44MWgxLjgydjAuNzRoLTEuODN2Mi42OWMwLDAuNjMsMC4yMiwxLjAzLDAuODQsMS4wM2MwLjMzLTAuMDEsMC42NS0wLjEyLDAuOTMtMC4zMUwxMTAuMDMsNDkuMTV6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMTAuNjQsNDQuMzNoMC44MXYwLjc3YzAuMzEtMC42MSwwLjgtMC45LDEuNDgtMC45YzAuMiwwLDAuNCwwLjAzLDAuNiwwLjA4bC0wLjA4LDAuODMKCWMtMC4xNy0wLjA2LTAuMzUtMC4wOC0wLjUzLTAuMDljLTAuNzgsMC0xLjQyLDAuNTItMS40MiwxLjY4djIuNzZoLTAuODVMMTEwLjY0LDQ0LjMzeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTE4LjYyLDQ3LjI1aC00LjExYzAuMTIsMC44MSwwLjY2LDEuNTIsMS44NCwxLjUyYzAuNjUtMC4wMSwxLjI4LTAuMjIsMS44MS0wLjU4bDAuMzcsMC42NgoJYy0wLjY0LDAuNDctMS40MSwwLjcyLTIuMiwwLjcxYy0xLjkzLDAtMi43Mi0xLjM2LTIuNzItMi42OWMwLTEuNTIsMS4wMy0yLjY3LDIuNTgtMi42N2MxLjQyLDAsMi40NiwwLjk3LDIuNDYsMi42CglDMTE4LjY1LDQ2Ljk1LDExOC42NCw0Ny4xLDExOC42Miw0Ny4yNXogTTExNC41MSw0Ni40OWgzLjI0Yy0wLjA1LTAuOTQtMC43My0xLjUtMS41Ni0xLjVDMTE1LjI5LDQ0Ljk4LDExNC42NSw0NS42MiwxMTQuNTEsNDYuNDkKCUwxMTQuNTEsNDYuNDl6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMjYuNzQsNDQuMzN2NS4xM2gtMC44MnYtMC43NGMtMC4yMiwwLjI3LTAuNSwwLjQ5LTAuODEsMC42NGMtMC4zMiwwLjE1LTAuNjcsMC4yMi0xLjAxLDAuMjIKCWMtMS40OCwwLTIuNTctMS4xOS0yLjU3LTIuNzJjMC0xLjUzLDEuMDktMi42NSwyLjU3LTIuNjVjMC4zNSwwLDAuNywwLjA3LDEuMDIsMC4yM2MwLjMyLDAuMTUsMC42LDAuMzgsMC44MSwwLjY2di0wLjc2SDEyNi43NHoKCSBNMTI1Ljk4LDQ2Ljg5YzAtMS4wMy0wLjcxLTEuOS0xLjgxLTEuOWMtMS4xLDAtMS43OSwwLjg3LTEuNzksMS45MWMwLDEuMDMsMC42OSwxLjksMS43OSwxLjkKCUMxMjUuMjcsNDguOCwxMjUuOTgsNDcuOTQsMTI1Ljk4LDQ2Ljg5eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTMyLjU1LDQ0LjMzbC0yLjI2LDUuMTJoLTAuNTdsLTIuMjYtNS4xMmgwLjk1bDEuNjEsMy45MWwxLjYtMy45MUgxMzIuNTV6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMzcuNzUsNDcuMjVoLTQuMTFjMC4xMiwwLjgxLDAuNjYsMS41MiwxLjg0LDEuNTJjMC42NS0wLjAxLDEuMjgtMC4yMiwxLjgxLTAuNThsMC4zNiwwLjY2CgljLTAuNjQsMC40Ny0xLjQsMC43MS0yLjE5LDAuNzFjLTEuOTQsMC0yLjcyLTEuMzYtMi43Mi0yLjY5YzAtMS41MiwxLjAzLTIuNjcsMi41OC0yLjY3YzEuNDIsMCwyLjQ2LDAuOTcsMi40NiwyLjYKCUMxMzcuNzgsNDYuOTUsMTM3Ljc3LDQ3LjEsMTM3Ljc1LDQ3LjI1eiBNMTMzLjY0LDQ2LjQ5aDMuMjRjLTAuMDUtMC45NC0wLjczLTEuNS0xLjU3LTEuNUMxMzQuNDIsNDQuOTgsMTMzLjc4LDQ1LjYyLDEzMy42NCw0Ni40OQoJTDEzMy42NCw0Ni40OXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTEzOC43NCw0NC4zM2gwLjg0djAuNzNjMC4zMi0wLjU2LDAuOTEtMC44NiwxLjYzLTAuODZjMS4wNiwwLDIuMDMsMC42OSwyLjAzLDIuMTZ2My4xaC0wLjg1VjQ2LjYKCWMwLTEuMDYtMC41Ny0xLjYxLTEuMzQtMS42MWMtMC44NSwwLTEuNDUsMC42Ny0xLjQ1LDEuNjF2Mi44NmgtMC44NVY0NC4zM3oiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTE0NC4yOCw0Mi45NWMwLTAuMTIsMC4wNC0wLjI1LDAuMTEtMC4zNWMwLjA3LTAuMSwwLjE3LTAuMTksMC4yOC0wLjIzYzAuMTItMC4wNSwwLjI0LTAuMDYsMC4zNy0wLjA0CgljMC4xMiwwLjAyLDAuMjQsMC4wOCwwLjMyLDAuMTdjMC4wOSwwLjA5LDAuMTUsMC4yLDAuMTgsMC4zMmMwLjAyLDAuMTIsMC4wMSwwLjI1LTAuMDMsMC4zNmMtMC4wNSwwLjEyLTAuMTMsMC4yMi0wLjIzLDAuMjkKCWMtMC4xLDAuMDctMC4yMiwwLjExLTAuMzUsMC4xMWMtMC4wOCwwLTAuMTctMC4wMS0wLjI1LTAuMDRjLTAuMDgtMC4wMy0wLjE1LTAuMDgtMC4yMS0wLjE0Yy0wLjA2LTAuMDYtMC4xMS0wLjEzLTAuMTQtMC4yMQoJQzE0NC4zLDQzLjEyLDE0NC4yOCw0My4wNCwxNDQuMjgsNDIuOTV6IE0xNDQuNDksNDkuNDZ2LTUuMTNoMC44NXY1LjEzSDE0NC40OXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTE0Ni42NSw0NC4zM2gwLjh2MC43N2MwLjMxLTAuNjEsMC44LTAuOSwxLjQ5LTAuOWMwLjIsMCwwLjQsMC4wMywwLjYsMC4wOGwtMC4wOCwwLjgzCgljLTAuMTctMC4wNi0wLjM1LTAuMDgtMC41My0wLjA5Yy0wLjc4LDAtMS40MiwwLjUyLTEuNDIsMS42OHYyLjc2aC0wLjg1TDE0Ni42NSw0NC4zM3oiLz4KPHBhdGggY2xhc3M9InN0MSIgZD0iTTE5LjU0LDB2MTAuMDVoNC41NHY1LjRjNC43Mi0wLjIyLDguMzYtNC4yNSw4LjM3LTguOTdMMzIuNDUsMEwxOS41NCwweiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTI1LjEsOXYtMi44aDguMzd2MjkuMjdoLTguMzR2LTIuNzdjLTAuMTEsMC4wNS0wLjIyLDAuMTEtMC4zMiwwLjE3Yy01LjEsNC45NS0xNC4yNSw0LjMzLTE5LjEyLTEuNjEKCWMtMi43OC0zLjM5LTMuODMtNy4zMy0zLjU2LTExLjY1YzAuMjMtMy42NCwxLjQ3LTYuODksMy45Mi05LjY0YzQuNDctNS4wMiwxMi4yOS02LDE3LjU2LTIuMTdDMTI0LjEsOC4xMywxMjQuNTQsOC41MywxMjUuMSw5egoJIE0xMjUuMSwyMC44NGMwLjAyLTQuMTYtMy4wNS03LjI3LTcuMTktNy4yN2MtNC4wNSwwLTcuMTIsMy4wOS03LjE1LDcuMTljLTAuMDIsNC4xMywzLjAxLDcuMjUsNy4xLDcuMzEKCUMxMjEuOTYsMjguMTMsMTI1LjA5LDI1LDEyNS4xLDIwLjg0TDEyNS4xLDIwLjg0eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTkuMDksOS4wNFY2LjE5aDguMzZ2MjkuMjVoLTguMzRWMzIuNmMtMC4yOCwwLjI0LTAuNDUsMC4zNy0wLjYsMC41MWMtMi44NywyLjUyLTYuMjQsMy40NS05Ljk2LDIuOTQKCWMtNi4xNi0wLjg1LTEwLjA0LTQuNS0xMS43NS0xMC4zNGMtMS42LTUuNDYtMC44MS0xMC42NCwyLjc4LTE1LjE4YzMuNzgtNC44LDEwLjQtNi40MiwxNS45Mi0zLjk2YzEuMDUsMC40NywxLjk3LDEuMjQsMi45NSwxLjg5CglDNTguNjYsOC42NCw1OC44OCw4LjgzLDU5LjA5LDkuMDR6IE01OS4wOSwyMC44M2MwLjAxLTQuMTUtMy4wOC03LjI2LTcuMjEtNy4yNWMtNC4wNiwwLTcuMTEsMy4wOS03LjE0LDcuMgoJYy0wLjAzLDQuMTEsMy4wMyw3LjI2LDcuMTEsNy4zQzU1LjkzLDI4LjEyLDU5LjA4LDI0Ljk3LDU5LjA5LDIwLjgzTDU5LjA5LDIwLjgzeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTMuMzQsMjQuNDdsNy4yMyw0LjM5Yy0wLjY2LDEuMTctMS41MSwyLjIyLTIuNSwzLjEzYy0zLjEsMi44OC02LjgzLDQuMTgtMTEuMDIsNC4xOQoJYy00LjY5LDAtOC43OC0xLjU2LTEyLTUuMDdjLTcuMDMtNy42OC00LjYtMjEuOTgsNy42Ni0yNS4wOWM1LjYtMS40MiwxMC44MS0wLjM4LDE1LjIyLDMuNTRjMS4wMSwwLjksMS44MSwyLjAyLDIuNzgsMy4xMwoJbC03LjQxLDQuNDljLTEuNTMtMi40My0zLjctMy42Ni02LjU2LTMuNTljLTEuOTgsMC4wNS0zLjcsMC43Ni01LjA1LDIuMjRjLTIuNzIsMi45Ny0yLjQ1LDcuODYsMC41MSwxMC41MQoJQzg0LjkyLDI4Ljc1LDkwLjU1LDI5LjA0LDkzLjM0LDI0LjQ3eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzIuNjcsMjAuMzdjMCwwLDAtNS4zNy0wLjAxLTUuMzdjLTMuMzUsMy4xMi04LjM4LDIuNjItOC4zOCwyLjYyYzAsNi40My0wLjE4LDcuMjItMC4zMyw3LjkxCgljLTAuNiwyLjY2LTIuNDMsMy45MS01LjQyLDMuODljLTIuODktMC4wMi00LjY2LTEuMjgtNS4yNC0zLjkyYy0wLjI1LTEuMjItMC4zOC0yLjQ2LTAuMzgtMy43Yy0wLjA0LTQuOTktMC4wMS05Ljk3LTAuMDItMTQuOTYKCWMwLTAuNTIsMC4wMy0wLjA4LDAtMC41OUg0LjU1YzAsMi43Ni0wLjA0LDQuNDcsMC4wMSw3LjE1YzAuMDcsNC4xMy0wLjA5LDguMywwLjM2LDEyLjM5YzAuNzksNy4yNCw1Ljg3LDExLjYzLDEzLjE3LDExLjY2CgljMi4wMSwwLjAxLDQuMDItMC40Myw2LjA5LTAuNjdjLTAuMDItMC4wNCwwLjA1LDAuMDQsMC4wNiwwLjEzYzAuMDIsMC4xNSwwLjAyLDAuMywwLDAuNDVjLTAuMjEsMS44NC0xLjA3LDMuMjYtMi44NywzLjg0CgljLTIuMjcsMC43NC00LjY1LDAuOTctNi40OS0wLjg3Yy0wLjI1LTAuMjctMC40NS0wLjU5LTAuNTgtMC45M2gtMC4wNUw2Ljk5LDQzLjdjMS4wNywxLjU3LDIuNDcsMi44OSw0LjA5LDMuODgKCWM0LjY4LDIuODMsOS41OSwyLjk5LDE0LjQsMC40M2M0LjkxLTIuNjEsNy4xMS03LjAxLDcuMTYtMTIuNDNDMzIuNzMsMjUuOTUsMzIuNjcsMjMuMjUsMzIuNjcsMjAuMzd6Ii8+Cjwvc3ZnPgo=",
    },
};
