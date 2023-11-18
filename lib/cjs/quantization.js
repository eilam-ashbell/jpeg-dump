"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dqt_extractor_1 = require("./extractors/dqt-extractor");
class Quantization {
    constructor(fileStructure) {
        this.fileStructure = fileStructure;
    }
    parse() {
        // find all DQT markers in image
        const DQTMarkers = this.fileStructure.filter((segment) => segment.name.startsWith("DQT"));
        let DQTsData = [];
        // for each DQT marker, extract its data and place in global object
        for (let segment of DQTMarkers) {
            // const segment = this.fileStructure[DQTMarkers[marker]];
            DQTsData.push((0, dqt_extractor_1.extractDqtSegment)(segment));
        }
        return DQTsData;
    }
    // return the number of QT tables in the image
    get count() {
        return this.parse().map(DQT => DQT.quantizationTables).flat().length;
    }
}
exports.default = Quantization;
