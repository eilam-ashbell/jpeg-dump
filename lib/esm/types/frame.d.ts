import SOFModel from "./models/SOF.model";
import SegmentModel from "./models/Segment.model";
import SOFTypeModel from "./models/sof-type.model";
export default class Frame {
    private fileStructure;
    constructor(fileStructure: SegmentModel[]);
    get type(): SOFTypeModel;
    get parse(): SOFModel;
}
