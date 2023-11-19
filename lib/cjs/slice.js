"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_extractors_1 = require("./extractors/metadata-extractors");
const slice_model_1 = __importDefault(require("./models/slice.model"));
function slice(fileStructure) {
    const slices = [];
    fileStructure.map((segment) => {
        if (segment.name === "APP0") {
        }
        else if (segment.name === "APP1") {
            const nested = [];
            const EXIF = (0, metadata_extractors_1.TIFFParser)(segment);
            for (let IFD in EXIF.parsedTags) {
                for (let tag in EXIF.parsedTags[IFD]) {
                    nested.push(new slice_model_1.default([IFD, tag], EXIF.parsedTags[IFD][tag].globalOffset, 
                    // 12,
                    EXIF.parsedTags[IFD][tag].tagRawValue));
                }
            }
            slices.push(new slice_model_1.default(["APP1"], segment.globalOffset, 
            // segment.length,
            segment.rawData, nested));
        }
        else
            slices.push(new slice_model_1.default([segment.name], segment.globalOffset, 
            // segment.length,
            segment.rawData));
    });
    console.log(slices);
    return [];
}
exports.default = slice;
