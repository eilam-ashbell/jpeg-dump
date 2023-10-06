import dataTypesDict from "../dictionaries/dataTypesDict";
import {
    extractApp1Identifier,
    extractApp1Length,
    extractFirstIFDOffset,
    extractIFD,
    extractTiffIdentifier,
    extractTiffOrderBytes,
    hexToReadable,
    ifdDataToTags,
    unit8ArrayToExifTag,
} from "../utils/exif-utils";
import {
    ExifBaseTagModel,
    ExifExtendedTagModel,
} from "../models/exif-tag.model";
import { App0JFIFModel, App0JFXXModel } from "../models/app0.model";
import App1EXIFModel from "../models/app1.model";
import ExifIfdDataModel from "../models/exif-ifd-data.model";
import { createUniqueObjKey, formatHexZeros } from "../utils/utils";

function extractApp0(app0Segment: Uint8Array): App0JFIFModel | App0JFXXModel {
    // Check if the APP0 marker is correct (0xFFE0)
    if (app0Segment[0] !== 0xff || app0Segment[1] !== 0xe0) {
        throw new Error("Invalid APP0 marker");
    }

    // Extract the data from the APP0 segment
    const identifier = String.fromCharCode(
        app0Segment[4],
        app0Segment[5],
        app0Segment[6],
        app0Segment[7],
        app0Segment[8]
    );

    if (identifier === "JFIF\x00") {
        const versionMajor = app0Segment[9];
        const versionMinor = app0Segment[10];
        const units = app0Segment[11];
        const xDensity = (app0Segment[12] << 8) | app0Segment[13];
        const yDensity = (app0Segment[14] << 8) | app0Segment[15];
        const thumbWidth = app0Segment[16];
        const thumbHeight = app0Segment[17];

        // Construct and return an object with the parsed data
        const JFIFData: App0JFIFModel = {
            identifier: identifier,
            version: `${versionMajor}.${versionMinor}`,
            units: units,
            XDensity: xDensity, // Cant be zero
            YDensity: yDensity, // Cant be zero
            thumbnailWidth: thumbWidth,
            thumbnailHeight: thumbHeight,
        };
        return JFIFData;
    } else {
        const thumbnailFormat = app0Segment[9];
        const thumbnailData = app0Segment.slice(10); // Extract the thumbnail image data

        const JFXXData: App0JFXXModel = {
            identifier: identifier,
            thumbnailFormat: thumbnailFormat,
            thumbnailData: thumbnailData,
        };
        return JFXXData;
    }
}

function extractExifTags(app1Segment: Uint8Array) {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error("Invalid APP1 marker");
    }
    const tiffHeaderOffset = 10; // constant fo EXIF segment

    // extract first IFD offset
    const firstIFDOffset = extractFirstIFDOffset(app1Segment);

    // set first IFD offset
    let newOffset = firstIFDOffset;
    // const segmentTags: { [key: string]: ExifBaseTagModel } = {};
    const segmentTags: { [ifd: string]: { [key: string]: ExifBaseTagModel } } =
        {};

    // if the offset isn't 0 (last IFD mark) -> extract the IFD tags
    while (newOffset !== 0) {
        const IFDData = extractIFD(app1Segment, newOffset + tiffHeaderOffset);
        newOffset = IFDData.nextIFDOffset;
        const ifdTags = ifdDataToTags(IFDData);
        const ifdKey = createUniqueObjKey(segmentTags, "ifd");
        // Object.assign(segmentTags, { key: ifdTags });
        segmentTags[ifdKey] = ifdTags;
    }

    const parsedTagsSegment: {
        [ifd: string]: { [key: string]: ExifExtendedTagModel };
    } = {};
    const ifdKeys = Object.keys(segmentTags);
    // loop each tag in every ifd entry
    for (let ifdKey of ifdKeys) {
        const tempIfd = {};
        // if it tag value is offset -> bring it from offset.
        for (let tag in segmentTags[ifdKey]) {
            const extendedTag = new ExifExtendedTagModel(
                segmentTags[ifdKey][tag]
            );
            if (extendedTag.isValueAtOffset) {
                // slice the offset value
                const startSliceData = parseInt(extendedTag.rawValue, 16) + 10;
                const endSliceData =
                    parseInt(extendedTag.rawValue, 16) +
                    10 +
                    extendedTag.valueCount * extendedTag.dataTypeInBytes;

                const tagRawData = app1Segment.slice(
                    startSliceData,
                    endSliceData
                );
                // convert it to hex string
                let hexString = "";
                for (let i = 0; i < tagRawData.length; i++) {
                    const hexByte = tagRawData[i].toString(16).padStart(2, "0");
                    hexString += hexByte;
                }
                // parse the new value
                extendedTag.parsedValue = hexToReadable(
                    Number(extendedTag.dataType),
                    hexString
                );
            }
            // if there is a dict to value translation -> use it.
            if (extendedTag.valuesDict) {
                // convert value to key
                const key =
                    Number(extendedTag.rawValue) ||
                    formatHexZeros(extendedTag.rawValue);
                // get value by key
                extendedTag.parsedValue = extendedTag.valuesDict[key];
            }

            // assign tag to temp object
            Object.assign(tempIfd, {
                [extendedTag.tagId]: extendedTag,
            });
        }
        // assign ifd to global object
        Object.assign(parsedTagsSegment, {
            [ifdKey]: tempIfd,
        });
    }
    return(parsedTagsSegment);
}

// function extractApp1(app1Segment: Uint8Array) {
//     // Check if the APP1 marker is correct (0xFFE1)
//     if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
//         throw new Error("Invalid APP1 marker");
//     }

//     const identifier = extractApp1Identifier(app1Segment);

//     // if (identifier == "Exif") {
//     const segmentLength = extractApp1Length(app1Segment);
//     const tiffHeaderOffset = 10;
//     const orderBytes = extractTiffOrderBytes(app1Segment);
//     const tiffIdentifier = extractTiffIdentifier(app1Segment);

//     // extract first IFD offset
//     const firstIFDOffset = extractFirstIFDOffset(app1Segment);

//     // set first IFD offset
//     let newOffset = firstIFDOffset;
//     const segmentTags: { [key: string]: ExifBaseTagModel } = {};

//     // if the offset isn't 0 (last IFD mark) -> extract the IFD tags
//     while (newOffset !== 0) {
//         const IFDData = extractIFD(app1Segment, newOffset + tiffHeaderOffset);
//         newOffset = IFDData.nextIFDOffset;
//         const ifdTags = ifdDataToTags(IFDData);
//         Object.assign(segmentTags, ifdTags);
//     }
//     console.log(segmentTags);
//     return segmentTags;
// }

export { extractApp0, extractExifTags };

// const IFD0 = extractIFD(app1Segment, firstIFDOffset + tiffHeaderOffset);
// console.log((IFD0));

// const IFD1 = extractIFD(app1Segment, (IFD0.nextIFDOffset + tiffHeaderOffset));
// console.log(IFD1);

// check if APP1 is EXIF segment
// if (identifier === "Exif\x00") {
//     const TIFFOrder = ((app1Segment[10] << 8) | app1Segment[11]).toString(
//         16
//     );
//     const TIFFIdentifier = (
//         (app1Segment[12] << 8) |
//         app1Segment[13]
//     ).toString(16);
//     const IFDOffset =
//         app1Segment[14] +
//         app1Segment[15] +
//         app1Segment[16] +
//         app1Segment[17];

//     const IFD =
//         (app1Segment[9 + IFDOffset] << 8) | app1Segment[10 + IFDOffset];
// console.log(IFD);

// const EXIFData: App1EXIFModel = {
//     identifier: identifier,
//     TIFF: {
//         order: TIFFOrder === "4949" ? "Little endian" : "Big endian",
//         identifier: TIFFIdentifier,
//         ifdOffset: IFDOffset,
//     },
// };

// console.log(EXIFData);
