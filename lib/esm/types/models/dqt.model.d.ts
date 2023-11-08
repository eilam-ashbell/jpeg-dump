export default class DQTModel {
    "marker": string;
    "segmentName": string;
    "globalOffset": number;
    "length": number;
    "quantizationTables": IDQT[];
    constructor(marker: string, segmentName: string, globalOffset: number, length: number, quantizationTables: IDQT[]);
}
export type IDQT = {
    precision: number;
    tableData: Uint16Array;
    localOffset: number;
    globalOffset: number;
};
