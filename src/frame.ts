import { extractSOFType, extractSof } from "./extractors/sof-extractor";
import SegmentModel from "./models/Segment.model";
import SOFTypeModel from "./models/sof-type.model";
import SofModel from "./models/sof.model";

export default class Frame {
    private structure: SegmentModel;

    constructor(structure: SegmentModel) {
        this.structure = structure;
    }

    get type(): SOFTypeModel {
        return extractSOFType(this.structure);
    }

    get parse(): SofModel {
        const SOFRawSegment = this.structure[this.type.name]
            .rawData as Uint8Array;
        return extractSof(SOFRawSegment);
    }
}
