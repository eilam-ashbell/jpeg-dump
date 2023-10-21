import { extractSOFType, extractSof } from "./extractors/sof-extractor";
export default class Frame {
    constructor(structure) {
        this.structure = structure;
    }
    get type() {
        return extractSOFType(this.structure);
    }
    get parse() {
        const SOFRawSegment = this.structure[this.type.name]
            .rawData;
        return extractSof(SOFRawSegment);
    }
}
