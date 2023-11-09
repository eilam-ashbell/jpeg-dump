import SegmentModel from "./models/Segment.model";
import SOFTypeModel from "./models/sof-type.model";
import SOFModel from "./models/sof.model";
export default class Frame {
    private fileStructure;
    constructor(fileStructure: SegmentModel[]);
    get type(): SOFTypeModel;
    get parse(): SOFModel;
}
