export default class DQTModel {
    "marker": string;
    "length": number;
    "quantizationTables": DQT;

    constructor(marker: string, length: number, quantizationTables: DQT) {
        this.marker = marker;
        this.length = length;
        this.quantizationTables = quantizationTables;
    }
}

export class DQT {
    [qt: string]: { precision: number; tableData: Uint16Array };
}
