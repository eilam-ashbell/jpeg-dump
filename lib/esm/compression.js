import Frame from "./frame";
import Quantization from "./quantization";
export default class Compression {
    constructor(structure) {
        this.structure = structure;
        this.quantization = new Quantization(structure);
        this.frame = new Frame(structure);
    }
}
