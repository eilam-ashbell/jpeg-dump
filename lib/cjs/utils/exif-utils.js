"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToReadable = exports.unit8ArrayToExifTag = exports.ifdDataToTags = exports.splitUnit8ArrayToTags = exports.extractIFD = exports.extractFirstIFDOffset = exports.extractTiffIdentifier = exports.extractTiffOrderBytes = exports.extractApp1Identifier = exports.extractApp1Length = void 0;
const dataTypesDict_1 = __importDefault(require("../dictionaries/dataTypesDict"));
const EXIF_tag_model_1 = require("../models/EXIF-tag.model");
const exif_ifd_data_model_1 = __importDefault(require("../models/exif-ifd-data.model"));
const utils_1 = require("./utils");
function extractApp1Identifier(app1Segment) {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error("Invalid APP1 segment. segment should contain 0xFFE1 marker");
    }
    // Extract the data from the APP1 segment
    const identifier = String.fromCharCode(app1Segment[4], app1Segment[5], app1Segment[6], app1Segment[7], app1Segment[8], app1Segment[9]);
    return identifier;
}
exports.extractApp1Identifier = extractApp1Identifier;
function extractApp1Length(app1Segment) {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error("Invalid APP1 segment. segment should contain 0xFFE1 marker");
    }
    const segmentLength = (app1Segment[2] << 8) | app1Segment[3];
    return segmentLength;
}
exports.extractApp1Length = extractApp1Length;
function extractTiffOrderBytes(app1Segment) {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error("Invalid APP1 segment. segment should contain 0xFFE1 marker");
    }
    const tiffOrder = (app1Segment[10] << 8) | app1Segment[11];
    return tiffOrder.toString(16);
}
exports.extractTiffOrderBytes = extractTiffOrderBytes;
function extractTiffIdentifier(app1Segment, bytesOrder = "4949") {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error("Invalid APP1 segment. segment should contain 0xFFE1 marker");
    }
    // define bytes order reading
    const bytesOrderFlag = bytesOrder === ("4949" || "LE") ? -1 : 0;
    const tiffIdentifier = (app1Segment[12 - bytesOrderFlag] << 8) |
        app1Segment[13 + bytesOrderFlag];
    return tiffIdentifier.toString(16).padStart(4, "0");
}
exports.extractTiffIdentifier = extractTiffIdentifier;
function extractFirstIFDOffset(app1Segment, bytesOrder = "4949") {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error("Invalid APP1 segment. segment should contain 0xFFE1 marker");
    }
    // define bytes order reading
    const bytesOrderFlag = bytesOrder === ("4949" || "LE") ? -1 : 0;
    const firstIFDOffset = (app1Segment[14 - bytesOrderFlag * 3] << 24) |
        (app1Segment[15 - bytesOrderFlag] << 16) |
        (app1Segment[16 + bytesOrderFlag] << 8) |
        app1Segment[17 + bytesOrderFlag * 3];
    return firstIFDOffset;
}
exports.extractFirstIFDOffset = extractFirstIFDOffset;
function extractIFD(app1Segment, IFDOffset, bytesOrder = "4949") {
    // define bytes order reading
    const bytesOrderFlag = bytesOrder === ("4949" || "LE") ? -1 : 0;
    // extract tags count in IFD
    const tagsCount = (app1Segment[IFDOffset - bytesOrderFlag] << 8) |
        app1Segment[IFDOffset + 1 + bytesOrderFlag];
    // calculate where tags structure ends
    const endOfTagsOffset = IFDOffset + tagsCount * 12 + 2;
    const nextIFDOffset = (app1Segment[endOfTagsOffset - bytesOrderFlag * 3] << 24) |
        (app1Segment[endOfTagsOffset + 1 - bytesOrderFlag] << 16) |
        (app1Segment[endOfTagsOffset + 2 + bytesOrderFlag] << 8) |
        app1Segment[endOfTagsOffset + 3 + bytesOrderFlag * 3];
    // slice IFD data from segment
    const IFDRawData = app1Segment.slice(IFDOffset, nextIFDOffset !== 0 ? nextIFDOffset : app1Segment.length);
    return new exif_ifd_data_model_1.default(IFDRawData, tagsCount, endOfTagsOffset - IFDOffset, nextIFDOffset, IFDOffset); // normalizing endOfTagsOffset to start of IFD
}
exports.extractIFD = extractIFD;
function splitUnit8ArrayToTags(unit8Array) {
    if (unit8Array.length % 12 !== 0) {
        throw new Error("Unit8Array length is not a multiple of 12. its " +
            (unit8Array.length % 12));
    }
    const tags = [];
    for (let i = 0; i < unit8Array.length; i += 12) {
        const chunk = unit8Array.slice(i, i + 12);
        tags.push(chunk);
    }
    return tags;
}
exports.splitUnit8ArrayToTags = splitUnit8ArrayToTags;
function ifdDataToTags(ifdData) {
    const tagsMarkers = ifdData.ifdRawData.slice(2, ifdData.tagsEndOffset);
    const tags = splitUnit8ArrayToTags(tagsMarkers);
    const tagsModel = {};
    let tagCount = 0;
    for (const tag of tags) {
        const tagModel = unit8ArrayToExifTag(tag);
        tagModel.order = tagCount;
        tagModel.offset = 2 + ifdData.offset + tagCount * 12; // offset from start of segment | 2 to skip number of tags | ifdData.offset from TIFF | tagCount * 12 to keep tracking by order
        tagCount++;
        tagsModel[tagModel.tagId] = tagModel;
    }
    return tagsModel;
}
exports.ifdDataToTags = ifdDataToTags;
function unit8ArrayToExifTag(unit8Array) {
    if (unit8Array.length !== 12) {
        throw new Error(`Invalid unit8Array length. This array has ${unit8Array.length} bytes, and tag needs to be 12 bytes `);
    }
    const exifTag = new EXIF_tag_model_1.ExifBaseTagModel();
    (exifTag.tagId = ((unit8Array[1] << 8) | unit8Array[0])
        .toString(16)
        .padStart(4, "0")),
        (exifTag.dataType = ((unit8Array[3] << 8) | unit8Array[2])
            .toString(16)
            .padStart(4, "0")),
        (exifTag.valueCount =
            (unit8Array[7] << 24) |
                (unit8Array[6] << 16) |
                (unit8Array[5] << 8) |
                unit8Array[4]),
        (exifTag.tagValue = Array.from(unit8Array.slice(-4).reverse(), (byte) => byte.toString(16).padStart(2, "0")).join(""));
    exifTag.offset = 1;
    return exifTag;
}
exports.unit8ArrayToExifTag = unit8ArrayToExifTag;
function hexToReadable(tagId, dataTypeNumber, valueCount, hexValue) {
    const dataTypeInfo = dataTypesDict_1.default[dataTypeNumber];
    if (!dataTypeInfo) {
        return "Unsupported data type";
    }
    const data = hexValue;
    // const hexPairs: string[] = [];
    // for (let i = 0; i < hexValue.length; i += 2) {
    //     hexPairs.push(hexValue.substr(i, 2));
    // }
    // const hexValues = hexPairs.map((hexPair) => parseInt(hexPair, 16));
    // const hexValues = hexValue.map( (byte) => byte.toString(16).padStart(2, "0"));
    switch (dataTypeNumber) {
        case 1: // unsignedByte
            if (valueCount !== 1) {
                let parsedValue = "";
                for (let i = 0; i < valueCount; i++) {
                    parsedValue += data[i].toString();
                }
                return parsedValue;
            }
        case 6: // signedByte
            return Number(data[0]);
        case 7: // undefined
        case 2: // asciiStrings
            return String.fromCharCode(...(0, utils_1.trimTrailingZeros)(hexValue));
        case 3: // unsignedShort
        case 8: // signedShort
            return (0, utils_1.uint8ArrayToNumberLE)(hexValue);
        case 4: // unsignedLong
        case 9: // signedLong
            return (0, utils_1.uint8ArrayToNumberLE)(hexValue);
        case 5: // unsignedRational
        case 10: // signedRational
            const elements = (0, utils_1.splitArrayIntoChunks)(hexValue, 4);
            const numerator = (0, utils_1.uint8ArrayToNumberLE)(elements[0]);
            const denominator = (0, utils_1.uint8ArrayToNumberLE)(elements[1]);
            // const numerator =
            //     (hexValues[0] << 24) |
            //     (hexValues[1] << 16) |
            //     (hexValues[2] << 8) |
            //     hexValues[3];
            // const denominator =
            //     (hexValues[4] << 24) |
            //     (hexValues[5] << 16) |
            //     (hexValues[6] << 8) |
            //     hexValues[7];
            return (numerator / denominator).toString();
        // return `${numerator}/${denominator}`;
        case 11: // singleFloat
            const singleFloatBuffer = new ArrayBuffer(4);
            const singleFloatView = new DataView(singleFloatBuffer);
            hexValue.forEach((value, index) => singleFloatView.setUint8(index, value));
            return singleFloatView.getFloat32(0).toString();
        case 12: // doubleFloat
            const doubleFloatBuffer = new ArrayBuffer(8);
            const doubleFloatView = new DataView(doubleFloatBuffer);
            hexValue.forEach((value, index) => doubleFloatView.setUint8(index, value));
            return doubleFloatView.getFloat64(0).toString();
        default:
            return "Unknown data type";
    }
}
exports.hexToReadable = hexToReadable;
