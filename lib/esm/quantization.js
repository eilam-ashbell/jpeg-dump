import { extractDqtSegment } from "./extractors/dqt-extractor";
export default class Quantization {
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
            DQTsData.push(extractDqtSegment(segment));
        }
        return DQTsData;
    }
    // return the number of QT tables in the image
    get count() {
        return this.parse().map(DQT => DQT.quantizationTables).flat().length;
    }
}
