"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseSegments_1 = require("./extractors/parseSegments");
const markers_1 = __importDefault(require("./markers"));
/**
 * Structure class will externalize information about the segments and markers of the image
 * constructor should get an image as an input
 *
 * @public dump - return all image data divided to its markers and segments
 * @public markers - enable to list image's markers data in multiple filters and structure
 */
class Structure {
    constructor(imageData) {
        this.imageData = null;
        if (imageData instanceof Uint8Array) {
            this.imageData = imageData;
            this.structureData = (0, parseSegments_1.parseSegments)(imageData);
            this.markers = new markers_1.default(this.structureData);
        }
        else {
            this.structureData = imageData;
            this.markers = new markers_1.default(this.structureData);
        }
    }
    // get file data separated to segments
    get dump() {
        return this.structureData;
    }
}
exports.default = Structure;
