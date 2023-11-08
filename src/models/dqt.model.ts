import { type } from "os";

export default class DQTModel {
    "marker": string;
    "segmentName": string;
    "globalOffset": number;
    "length": number;
    "quantizationTables": IDQT[];

    constructor(marker: string, segmentName:string, globalOffset: number, length: number, quantizationTables: IDQT[]) {
        this.marker = marker;
        this.segmentName = segmentName;
        this.globalOffset = globalOffset;
        this.length = length;
        this.quantizationTables = quantizationTables;
    }
}

export type IDQT = {
    precision: number;
    tableData: Uint16Array;
    localOffset: number;
    globalOffset: number;
}
