import Frame from "./frame";
import Quantization from "./quantization";
export default class Compression {
    constructor(fileStructure) {
        this.fileStructure = fileStructure;
        this.quantization = new Quantization(fileStructure);
        this.frame = new Frame(fileStructure);
    }
}
