// import extractDRI from "./extractors/DRI-extractor";
import Frame from "./frame";
import DRIModel from "./models/DRI.model";
import Quantization from "./quantization";
export default class Compression {
    constructor(fileStructure) {
        this.fileStructure = fileStructure;
        this.quantization = new Quantization(fileStructure);
        this.frame = new Frame(fileStructure);
        // find all DRI segments in the file
        const DRISegments = fileStructure.filter(s => s.name === 'DRI');
        // for each DRI segment -> init new DRI model
        this.DRI = DRISegments.map(s => new DRIModel(s.rawData, s.globalOffset, s.index));
    }
}
