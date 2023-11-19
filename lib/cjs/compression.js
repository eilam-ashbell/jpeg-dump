"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import extractDRI from "./extractors/DRI-extractor";
const frame_1 = __importDefault(require("./frame"));
const DRI_model_1 = __importDefault(require("./models/DRI.model"));
const quantization_1 = __importDefault(require("./quantization"));
class Compression {
    constructor(fileStructure) {
        this.fileStructure = fileStructure;
        this.quantization = new quantization_1.default(fileStructure);
        this.frame = new frame_1.default(fileStructure);
        // find all DRI segments in the file
        const DRISegments = fileStructure.filter(s => s.name === 'DRI');
        // for each DRI segment -> init new DRI model
        this.DRI = DRISegments.map(s => new DRI_model_1.default(s.rawData, s.globalOffset, s.index));
    }
}
exports.default = Compression;
