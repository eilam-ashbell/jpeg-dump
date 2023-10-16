import { extractDqtSegment } from "./extractors/dqt-extractor";
import DQTModel from "./models/dqt.model";
import { Markers } from "./models/markers-dict.model";
import SegmentModel from "./models/Segment.model";

export default class Quantization {
    private structure: SegmentModel;

    constructor(structure: SegmentModel) {
        this.structure = structure;
    }

    public parse(): { [DQTName: string]: DQTModel } {
        // find all DQT markers in image
        const DQTMarkers = Object.keys(this.structure).filter((key) =>
            key.startsWith("DQT")
        );
        const DQTsData: { [key: string]: DQTModel } = {};
        // for each DQT marker, extract its data and place in global object
        for (let marker in DQTMarkers) {
            const segment = this.structure[DQTMarkers[marker]];
            DQTsData[DQTMarkers[marker]] = extractDqtSegment(
                segment.rawData as Uint8Array
            );
        }

        return DQTsData;
    }
}
