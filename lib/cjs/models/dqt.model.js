"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DQTModel {
    constructor(marker, segmentName, globalOffset, length, quantizationTables) {
        this.marker = marker;
        this.segmentName = segmentName;
        this.globalOffset = globalOffset;
        this.length = length;
        this.quantizationTables = quantizationTables;
    }
}
exports.default = DQTModel;
