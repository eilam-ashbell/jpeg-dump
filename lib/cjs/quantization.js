"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dqt_extractor_1 = require("./extractors/dqt-extractor");
class Quantization {
    constructor(structure) {
        this.structure = structure;
    }
    parse() {
        // find all DQT markers in image
        const DQTMarkers = Object.keys(this.structure).filter((key) => key.startsWith("DQT"));
        const DQTsData = {};
        // for each DQT marker, extract its data and place in global object
        for (let marker in DQTMarkers) {
            const segment = this.structure[DQTMarkers[marker]];
            DQTsData[DQTMarkers[marker]] = (0, dqt_extractor_1.extractDqtSegment)(segment.rawData);
        }
        return DQTsData;
    }
}
exports.default = Quantization;
