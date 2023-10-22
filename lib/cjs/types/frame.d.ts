import SegmentModel from "./models/Segment.model";
import SOFTypeModel from "./models/sof-type.model";
import SofModel from "./models/sof.model";
export default class Frame {
    private structure;
    constructor(structure: SegmentModel);
    get type(): SOFTypeModel;
    get parse(): SofModel;
}
