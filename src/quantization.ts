import DQTModel from "./models/dqt.model";
import SegmentModel from "./models/Segment.model";
export default class Quantization {
    private fileStructure: SegmentModel[];

    constructor(fileStructure: SegmentModel[]) {
        this.fileStructure = fileStructure;
    }

    public parse(): DQTModel[] {
        // find all DQT markers in image
        const DQTMarkers = this.fileStructure.filter((segment) =>
            segment.name.startsWith("DQT")
        );        
        let parsedDQTs: DQTModel[] = [];
        // for each DQT marker, extract its data and place in global object
        for (let segment of DQTMarkers) {
            // for each found DQT segment, create new DQT model
            parsedDQTs.push(
                new DQTModel(
                    segment.rawData as Uint8Array,
                    segment.globalOffset,
                    segment.index
                )
            );
        }
        return parsedDQTs;
    }

    // return the number of QT tables in the image
    get count(): number {
        return this.parse()
            .map((DQT) => DQT.QTs)
            .flat().length;
    }
}
