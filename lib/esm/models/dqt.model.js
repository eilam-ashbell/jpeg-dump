export default class DQTModel {
    constructor(marker, segmentName, globalOffset, length, quantizationTables) {
        this.marker = marker;
        this.segmentName = segmentName;
        this.globalOffset = globalOffset;
        this.length = length;
        this.quantizationTables = quantizationTables;
    }
}
