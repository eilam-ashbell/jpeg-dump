export default class DQTModel {
    constructor(marker, name, globalOffset, length, quantizationTables) {
        this.marker = marker;
        this.name = name;
        this.globalOffset = globalOffset;
        this.length = length;
        this.quantizationTables = quantizationTables;
    }
}
