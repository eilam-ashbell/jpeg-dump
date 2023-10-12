import Frame from "./frame";
import SegmentModel from "./models/Segment.model";
import Quantization from "./quantization";

export default class Compression {
    private structure: SegmentModel | null;

    constructor(structure: SegmentModel) {
        this.structure = structure
        this.quantization = new Quantization(structure);
        this.frame = new Frame(structure)
    }
    public quantization;
    public frame;
}
