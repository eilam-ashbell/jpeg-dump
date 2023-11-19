"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_extractors_1 = require("./extractors/metadata-extractors");
const thumbnail_1 = __importDefault(require("./thumbnail"));
class Metadata {
    constructor(fileStructure) {
        this.thumbnailData = null;
        this.fileStructure = fileStructure;
        this.APP1 = this.fileStructure.filter((segment) => segment.name === "APP1")[0];
        if (this.APP1) {
            this.EXIF();
        }
    }
    JFIF() {
        const APP0 = this.fileStructure.filter((segment) => segment.name === "APP0")[0];
        if (!APP0) {
            throw new Error("no JFIF metadata found");
        }
        return (0, metadata_extractors_1.extractApp0)(APP0.rawData);
    }
    EXIF() {
        if (!this.APP1) {
            throw new Error("no EXIF metadata found");
        }
        const EXIFTags = (0, metadata_extractors_1.TIFFParser)(this.APP1);
        this.thumbnailData = EXIFTags.thumb;
        this.thumbnail = this.thumbnailData ? new thumbnail_1.default(this.thumbnailData) : undefined;
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
exports.default = Metadata;
