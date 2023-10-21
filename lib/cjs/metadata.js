"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_extractors_1 = require("./extractors/metadata-extractors");
const thumbnail_1 = __importDefault(require("./thumbnail"));
class Metadata {
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
        return (0, metadata_extractors_1.extractApp0)((_a = this.structureData["APP0"]) === null || _a === void 0 ? void 0 : _a.rawData);
    }
    EXIF() {
        var _a;
        if (!this.structureData["APP1"]) {
            throw new Error("no EXIF metadata found");
        }
        const exifTags = (0, metadata_extractors_1.TIFFParser)((_a = this.structureData["APP1"]) === null || _a === void 0 ? void 0 : _a.rawData);
        this.thumbnailData = exifTags.thumb;
        this.thumbnail = new thumbnail_1.default(this.thumbnailData);
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
exports.default = Metadata;
