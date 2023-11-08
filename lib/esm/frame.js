import { extractSOFType, extractSOF } from "./extractors/sof-extractor";
export default class Frame {
    constructor(fileStructure) {
        this.fileStructure = fileStructure;
    }
    get type() {
        return extractSOFType(this.fileStructure);
    }
    get parse() {
        const SOFRawSegment = this.fileStructure.filter((segment) => segment.segmentName === this.type.name)[0];
        return extractSOF(SOFRawSegment);
    }
}
