"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sof_extractor_1 = require("./extractors/sof-extractor");
class Frame {
    constructor(fileStructure) {
        this.fileStructure = fileStructure;
    }
    get type() {
        return (0, sof_extractor_1.extractSOFType)(this.fileStructure);
    }
    get parse() {
        const SOFRawSegment = this.fileStructure.filter((segment) => segment.segmentName === this.type.name)[0];
        return (0, sof_extractor_1.extractSOF)(SOFRawSegment);
    }
}
exports.default = Frame;
