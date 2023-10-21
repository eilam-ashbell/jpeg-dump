"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sof_extractor_1 = require("./extractors/sof-extractor");
class Frame {
    constructor(structure) {
        this.structure = structure;
    }
    get type() {
        return (0, sof_extractor_1.extractSOFType)(this.structure);
    }
    get parse() {
        const SOFRawSegment = this.structure[this.type.name]
            .rawData;
        return (0, sof_extractor_1.extractSof)(SOFRawSegment);
    }
}
exports.default = Frame;
