import { extractSOFType, extractSOF } from "./extractors/sof-extractor";
import SegmentModel from "./models/Segment.model";
import SOFTypeModel from "./models/SOF-type.model";
import SOFModel from "./models/SOF.model";

export default class Frame {
    private fileStructure: SegmentModel[];

    constructor(fileStructure: SegmentModel[]) {
        this.fileStructure = fileStructure;
    }

    get type(): SOFTypeModel {
        return extractSOFType(this.fileStructure);
    }

    get parse(): SOFModel {
        const SOFRawSegment = this.fileStructure.filter(
            (segment) => segment.segmentName === this.type.name
        )[0];
        return extractSOF(SOFRawSegment);
    }
}
