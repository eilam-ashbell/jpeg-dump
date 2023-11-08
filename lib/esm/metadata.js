import { extractApp0, TIFFParser } from "./extractors/metadata-extractors";
import Thumbnail from "./thumbnail";
export default class Metadata {
    constructor(fileStructure) {
        this.thumbnailData = null;
        this.fileStructure = fileStructure;
        this.APP1 = this.fileStructure.filter((segment) => segment.segmentName === "APP1")[0];
        if (this.APP1) {
            this.EXIF();
        }
    }
    JFIF() {
        const APP0 = this.fileStructure.filter((segment) => segment.segmentName === "APP0")[0];
        if (!APP0) {
            throw new Error("no JFIF metadata found");
        }
        return extractApp0(APP0.rawData);
    }
    EXIF() {
        if (!this.APP1) {
            throw new Error("no EXIF metadata found");
        }
        const EXIFTags = TIFFParser(this.APP1);
        this.thumbnailData = EXIFTags.thumb;
        this.thumbnail = this.thumbnailData ? new Thumbnail(this.thumbnailData) : undefined;
        this.EXIFTags = EXIFTags.parsedTags;
        return this.EXIFTags;
    }
    get IFDs() {
        if (!this.EXIFTags) {
            this.EXIF();
        }
        if (!this.EXIFTags)
            return null;
        return Object.keys(this.EXIFTags);
    }
    IFDTags(IFD) {
        if (!this.EXIFTags) {
            this.EXIF();
        }
        if (!this.EXIFTags)
            return null;
        return this.EXIFTags[IFD];
    }
}
