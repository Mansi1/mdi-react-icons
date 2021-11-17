import {ReactElement} from "react";

export interface Icon  {
    "id": string,
    "name": string,
    "codepoint": string,
    "aliases": Array<string>,
    "tags": Array<string>,
    "author": string,
    "version":string,
    "assetsUrl": string,
    "componentFileName": string
    "cmp": ReactElement
}
