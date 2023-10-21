"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const frame_1 = __importDefault(require("./frame"));
const quantization_1 = __importDefault(require("./quantization"));
class Compression {
    constructor(structure) {
        this.structure = structure;
        this.quantization = new quantization_1.default(structure);
        this.frame = new frame_1.default(structure);
    }
}
exports.default = Compression;
