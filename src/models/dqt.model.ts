export default class DQTModel {
    "marker": string;
    "length": number;
    "quantizationTables": IDQT;

    constructor(marker: string, length: number, quantizationTables: IDQT) {
        this.marker = marker;
        this.length = length;
        this.quantizationTables = quantizationTables;
    }
}

export class IDQT {
    [qt: string]: { precision: number; tableData: Uint16Array };
}
