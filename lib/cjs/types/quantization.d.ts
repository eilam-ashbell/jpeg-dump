import DQTModel from "./models/dqt.model";
import SegmentModel from "./models/Segment.model";
export default class Quantization {
    private fileStructure;
    constructor(fileStructure: SegmentModel[]);
    parse(): DQTModel[];
    get count(): number;
}
