import Frame from "./frame";
import SegmentModel from "./models/Segment.model";
import Quantization from "./quantization";
export default class Compression {
    private structure;
    constructor(structure: SegmentModel);
    quantization: Quantization;
    frame: Frame;
}
