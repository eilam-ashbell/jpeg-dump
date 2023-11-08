"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseSegments_1 = require("./extractors/parseSegments");
const markers_1 = __importDefault(require("./markers"));
class Structure {
    constructor(imageData) {
        this.imageData = null;
        if (imageData instanceof Uint8Array) {
            this.imageData = imageData;
            this.fileStructure = (0, parseSegments_1.parseSegments)(imageData);
            this.markers = new markers_1.default(this.fileStructure);
        }
        else {
            this.fileStructure = imageData;
            this.markers = new markers_1.default(this.fileStructure);
        }
    }
    // get file data separated to segments
    get dump() {
        return this.fileStructure;
    }
}
exports.default = Structure;
