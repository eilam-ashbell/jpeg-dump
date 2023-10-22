export default class DQTModel {
    "marker": string;
    "length": number;
    "quantizationTables": IDQT;
    constructor(marker: string, length: number, quantizationTables: IDQT);
}
export declare class IDQT {
    [qt: string]: {
        precision: number;
        tableData: Uint16Array;
    };
}
