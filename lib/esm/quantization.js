import { extractDqtSegment } from "./extractors/dqt-extractor";
export default class Quantization {
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
            DQTsData[DQTMarkers[marker]] = extractDqtSegment(segment.rawData);
        }
        return DQTsData;
    }
}
