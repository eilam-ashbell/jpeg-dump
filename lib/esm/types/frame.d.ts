import SegmentModel from "./models/Segment.model";
import SOFTypeModel from "./models/SOF-type.model";
import SOFModel from "./models/SOF.model";
export default class Frame {
    private fileStructure;
    constructor(fileStructure: SegmentModel[]);
    get type(): SOFTypeModel;
    get parse(): SOFModel;
}
