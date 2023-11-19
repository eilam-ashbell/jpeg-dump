"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDqtSegment = void 0;
const dqt_model_1 = __importDefault(require("../models/dqt.model"));
function extractDqtSegment(dqtSegment) {
    // console.log(dqtSegment.globalOffset);
    // extract segment raw data
    const DQTRawData = dqtSegment.rawData;
    // Check if the DQT marker is correct (0xFFDB)
    if (DQTRawData[0] !== 0xff || DQTRawData[1] !== 0xdb) {
        throw new Error("Invalid DQT marker");
    }
    // extract segment length
    const segmentLength = (DQTRawData[2] << 8) | DQTRawData[3];
    const segmentData = DQTRawData.subarray(4, segmentLength + 2);
    const quantizationTables = [];
    let offset = 0;
    while (offset < segmentData.length) {
        const qtInfoByte = segmentData[offset];
        const qtPrecision = qtInfoByte >> 4; // First 4 bits represent precision (0 for 8-bit, 1 for 16-bit)
        const qtId = qtInfoByte & 0x0f; // Last 4 bits represent quantization table identifier
        offset++;
        const qtData = new Uint16Array(64); // Each quantization table has 64 entries
        let localOffset = offset + 4;
        let globalOffset = dqtSegment.globalOffset + localOffset;
        for (let i = 0; i < 64; i++) {
            if (qtPrecision === 0) {
                qtData[i] = segmentData[offset];
            }
            else {
                qtData[i] =
                    (segmentData[offset] << 8) | segmentData[offset + 1];
            }
            offset += qtPrecision === 0 ? 1 : 2;
        }
        quantizationTables.push({
            precision: qtPrecision === 0 ? 8 : 16,
            tableData: qtData,
            localOffset: localOffset,
            globalOffset: globalOffset
        });
    }
    return new dqt_model_1.default("ffdb", dqtSegment.name, dqtSegment.globalOffset, segmentLength, quantizationTables);
}
exports.extractDqtSegment = extractDqtSegment;
