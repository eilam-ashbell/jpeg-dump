"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const splitToSegments_1 = require("./extractors/splitToSegments");
const markers_1 = __importDefault(require("./markers"));
class Structure {
    constructor(imageData) {
        this.imageData = null;
        if (imageData instanceof Uint8Array) {
            this.imageData = imageData;
            this.fileStructure = (0, splitToSegments_1.splitToSegments)(imageData);
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
    // filter only required segments
    filter(segmentName) {
        if (typeof segmentName === "string") {
            const filteredList = this.dump.filter((s) => s.name === segmentName.toUpperCase());
            return filteredList;
        }
        else {
            const res = {};
            segmentName.forEach((name) => {
                const filteredList = this.dump.filter((s) => s.name === name.toUpperCase());
                res[name.toUpperCase()] = filteredList;
            });
            return res;
        }
    }
    // check if segment exist in file
    isExist(segmentName) {
        if (typeof segmentName === "string") {
            const filteredList = this.filter(segmentName);
            return filteredList.length > 0 ? true : false;
        }
        else {
            const res = {};
            segmentName.forEach((name) => {
                const filteredList = this.filter(name);
                res[name.toUpperCase()] = filteredList.length > 0 ? true : false;
            });
            return res;
        }
    }
    // count how many time a segment exist in file
    count(segmentName) {
        if (typeof segmentName === "string") {
            const filteredList = this.filter(segmentName);
            return filteredList.length;
        }
        else {
            const res = {};
            segmentName.forEach((name) => {
                const filteredList = this.filter(name);
                res[name.toUpperCase()] = filteredList.length;
            });
            return res;
        }
    }
}
exports.default = Structure;
