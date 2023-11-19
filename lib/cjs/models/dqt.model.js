"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DQTModel {
    constructor(marker, name, globalOffset, length, quantizationTables) {
        this.marker = marker;
        this.name = name;
        this.globalOffset = globalOffset;
        this.length = length;
        this.quantizationTables = quantizationTables;
    }
}
exports.default = DQTModel;
