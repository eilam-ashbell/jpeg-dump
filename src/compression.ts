import Frame from "./frame";
import SegmentModel from "./models/Segment.model";
import Quantization from "./quantization";

export default class Compression {
    private fileStructure: SegmentModel[] | null;

    constructor(fileStructure: SegmentModel[]) {
        this.fileStructure = fileStructure
        this.quantization = new Quantization(fileStructure);
        this.frame = new Frame(fileStructure)
    }
    public quantization: Quantization;
    public frame: Frame;
}
