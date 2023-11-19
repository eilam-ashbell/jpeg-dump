"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DQTData = void 0;
const Segment_model_1 = __importDefault(require("./Segment.model"));
const markersDict_1 = __importDefault(require("../dictionaries/markersDict"));
class DQTModel extends Segment_model_1.default {
    constructor(rawData, globalOffset, index) {
        super(rawData, globalOffset, index);
        this.QTs = [];
        this.details = markersDict_1.default[this.marker].details;
        let currentOffset = 4; // start from offset 4 to passed marker & length bytes
        while (currentOffset < this.length + 2) {
            this.QTs.push(new DQTData(rawData.slice(currentOffset, currentOffset + 65), globalOffset + currentOffset, currentOffset));
            currentOffset += 65;
        }
    }
}
exports.default = DQTModel;
class DQTData {
    constructor(rawData, globalOffset, localOffset) {
        this.globalOffset = globalOffset;
        this.localOffset = localOffset;
        const qtInfoByte = rawData[0];
        this.precision = qtInfoByte >> 4 === 0 ? 8 : 16; // First 4 bits represent precision (0 for 8-bit, 1 for 16-bit)
        this.id = qtInfoByte & 0x0f; // Last 4 bits represent quantization table identifier
        this.tableData = new Uint16Array(64); // Each quantization table has 64 entries
        // let localOffset = localOffset;
        for (let i = 0; i < 64; i++) {
            if (this.precision === 8) {
                this.tableData[i] = rawData[i + 1];
            }
            else {
                this.tableData[i] = (rawData[i + 1] << 8) | rawData[i + 2];
            }
        }
    }
}
exports.DQTData = DQTData;
