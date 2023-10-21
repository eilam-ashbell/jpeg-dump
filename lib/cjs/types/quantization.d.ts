import DQTModel from "./models/dqt.model";
import SegmentModel from "./models/Segment.model";
export default class Quantization {
    private structure;
    constructor(structure: SegmentModel);
    parse(): {
        [DQTName: string]: DQTModel;
    };
}
