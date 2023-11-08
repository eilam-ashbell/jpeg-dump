"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const frame_1 = __importDefault(require("./frame"));
const quantization_1 = __importDefault(require("./quantization"));
class Compression {
    constructor(fileStructure) {
        this.fileStructure = fileStructure;
        this.quantization = new quantization_1.default(fileStructure);
        this.frame = new frame_1.default(fileStructure);
    }
}
exports.default = Compression;
