import { extractDqtSegment } from "./extractors/dqt-extractor";
import DQTModel from "./models/dqt.model";
import { Markers } from "./models/markers-dict.model";
import SegmentModel from "./models/Segment.model";

export default class Quantization {
    private fileStructure: SegmentModel[];

    constructor(fileStructure: SegmentModel[]) {
        this.fileStructure = fileStructure;
    }

    public parse(): DQTModel[] {
        // find all DQT markers in image
        const DQTMarkers = this.fileStructure.filter((segment) =>
            segment.segmentName.startsWith("DQT")
        );
        let DQTsData: DQTModel[] = [];
        // for each DQT marker, extract its data and place in global object
        for (let segment of DQTMarkers) {            
            // const segment = this.fileStructure[DQTMarkers[marker]];
            DQTsData.push(extractDqtSegment(
                segment
            ));
        }        
        return DQTsData;
    }

    // return the number of QT tables in the image
    get count(): number {
        return this.parse().map(DQT => DQT.quantizationTables).flat().length
    }
}
