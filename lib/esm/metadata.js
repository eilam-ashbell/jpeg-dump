import { extractApp0, TIFFParser } from "./extractors/metadata-extractors";
import Thumbnail from "./thumbnail";
export default class Metadata {
    constructor(structureData) {
        this.thumbnailData = null;
        this.structureData = structureData;
        if (structureData["APP1"]) {
            this.EXIF();
        }
    }
    JFIF() {
        var _a;
        if (!this.structureData["APP0"]) {
            throw new Error("no JFIF metadata found");
        }
        return extractApp0((_a = this.structureData["APP0"]) === null || _a === void 0 ? void 0 : _a.rawData);
    }
    EXIF() {
        var _a;
        if (!this.structureData["APP1"]) {
            throw new Error("no EXIF metadata found");
        }
        const exifTags = TIFFParser((_a = this.structureData["APP1"]) === null || _a === void 0 ? void 0 : _a.rawData);
        this.thumbnailData = exifTags.thumb;
        this.thumbnail = new Thumbnail(this.thumbnailData);
        this.exifTags = exifTags.parsedTags;
        return this.exifTags;
    }
    get IFDs() {
        if (!this.exifTags) {
            this.EXIF();
        }
        if (!this.exifTags)
            return null;
        return Object.keys(this.exifTags);
    }
    IFDTags(IFD) {
        if (!this.exifTags) {
            this.EXIF();
        }
        if (!this.exifTags)
            return null;
        return this.exifTags[IFD];
    }
}
