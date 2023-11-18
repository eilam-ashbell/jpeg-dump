// import extractDRI from "./extractors/DRI-extractor";
import Frame from "./frame";
import DRIModel from "./models/DRI.model";
import SegmentModel from "./models/Segment.model";
import Quantization from "./quantization";

export default class Compression {
    private fileStructure: SegmentModel[] | null;

    constructor(fileStructure: SegmentModel[]) {
        this.fileStructure = fileStructure
        this.quantization = new Quantization(fileStructure);
        this.frame = new Frame(fileStructure)
        // find all DRI segments in the file
        const DRISegments = fileStructure.filter(s => s.name === 'DRI')
        // for each DRI segment -> init new DRI model
        this.DRI = DRISegments.map(s => new DRIModel(s.rawData, s.globalOffset))
    }
    public quantization: Quantization;
    public frame: Frame;
    public DRI: DRIModel[]
}
