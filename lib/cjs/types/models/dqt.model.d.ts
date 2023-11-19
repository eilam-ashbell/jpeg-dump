export default class DQTModel {
    "marker": string;
    "name": string;
    "globalOffset": number;
    "length": number;
    "quantizationTables": IDQT[];
    constructor(marker: string, name: string, globalOffset: number, length: number, quantizationTables: IDQT[]);
}
export type IDQT = {
    precision: number;
    tableData: Uint16Array;
    localOffset: number;
    globalOffset: number;
};
