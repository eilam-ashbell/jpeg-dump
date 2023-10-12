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
import { saveUint8ArrayAsFile } from "../utils/thumbnail-utils";

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
        // console.log(newOffset);

        const IFDData = extractIFD(app1Segment, newOffset + tiffHeaderOffset);
        newOffset = IFDData.nextIFDOffset;
        const ifdTags = ifdDataToTags(IFDData);
        if (ifdTags["8769"]) {
            // console.log(app1Segment.slice((firstIFDOffset + 2 + 226)));
            // 28
            const exifSubIfdRaw = app1Segment.slice(
                firstIFDOffset + 2 + 226,
                firstIFDOffset + 2 + 226 + 12 * 28 + 4
            );
            const rawTags = extractIFD(app1Segment, firstIFDOffset + 2 + 226);
            // console.log(rawTags);

            const tags = ifdDataToTags(rawTags);
            console.log(tags);
        }
        const ifdKey = createUniqueObjKey(segmentTags, "ifd");
        // Object.assign(segmentTags, { key: ifdTags });
        segmentTags[ifdKey] = ifdTags;

        // console.log(IFDData.offset + IFDData.tagsEndOffset + 4);
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
                const startSliceData = parseInt(extendedTag.tagValue, 16) + 10;
                const endSliceData =
                    parseInt(extendedTag.tagValue, 16) +
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
                    extendedTag.tagId,
                    extendedTag.dataTypeAsInt,
                    extendedTag.rawValue
                );
            }
            // if there is a dict to value translation -> use it.
            if (extendedTag.valuesDict) {
                // convert value to key
                const key =
                    Number(extendedTag.tagValue) ||
                    formatHexZeros(extendedTag.tagValue);
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
    return parsedTagsSegment;
}

function tagExtender(
    tag: ExifBaseTagModel,
    app1Segment: Uint8Array
): ExifExtendedTagModel {
    // init extended model
    const extendedTag = new ExifExtendedTagModel(tag);
    // if value of tag is in offset -> get it from offset
    if (extendedTag.isValueAtOffset) {
        const tiffHeaderOffset = 10; // constant for EXIF in APP1 segment
        // slice the value in offset
        const startSliceData =
            parseInt(extendedTag.tagValue, 16) + tiffHeaderOffset;
        const endSliceData =
            parseInt(extendedTag.tagValue, 16) +
            tiffHeaderOffset +
            extendedTag.valueCount * extendedTag.dataTypeInBytes;

        const tagRawValue = app1Segment.slice(startSliceData, endSliceData);
        extendedTag.rawValue = tagRawValue;
        // convert it to hex string
        let hexString = "";
        for (let i = 0; i < tagRawValue.length; i++) {
            const hexByte = tagRawValue[i].toString(16).padStart(2, "0");
            hexString += hexByte;
        }
        // parse the new value
        extendedTag.parsedValue = hexToReadable(
            extendedTag.tagId,
            extendedTag.dataTypeAsInt,
            extendedTag.rawValue
        );
    }
    // if there is a dict to value translation -> use it.
    if (extendedTag.valuesDict) {
        // convert value to key
        const key = Number(extendedTag.tagValue);
        // get value by key
        extendedTag.parsedValue = extendedTag.valuesDict[key];
    }

    // console.log(extendedTag);
    return extendedTag;
}

interface ITIFFParser {
    parsedTags: {[ifd: string]: {
        [key: string]: ExifExtendedTagModel | ExifBaseTagModel;
    }}
    thumb: Uint8Array
}

function TIFFParser(app1Segment: Uint8Array): ITIFFParser {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error("Invalid APP1 marker");
    }
    const tiffHeaderOffset = 10; // constant for EXIF in APP1 segment
    // set IFD offset
    let nextIFDOffset = extractFirstIFDOffset(app1Segment);

    // const segmentTags: { [ifd: string]: { [key: string]: ExifBaseTagModel } } =
    // {};
    const parsedTags: {
        [ifd: string]: {
            [key: string]: ExifExtendedTagModel | ExifBaseTagModel;
        };
    } = {};
    const thumb = {};

    while (nextIFDOffset) {
        // get IFD data
        const IFDData = extractIFD(
            app1Segment,
            tiffHeaderOffset + nextIFDOffset
        ); // (tiffHeaderOffset + nextIFDOffset) offset from start of segment
        const tagsInIFD = ifdDataToTags(IFDData);

        // extend data of every tag in IFD
        for (const tag in tagsInIFD) {
            tagsInIFD[tag] = tagExtender(tagsInIFD[tag], app1Segment);
        }
        // create unit key to object in global object
        const ifdKey = createUniqueObjKey(parsedTags, "IFD");
        // insert to global object
        parsedTags[ifdKey] = tagsInIFD;

        // check for exifOffset tag (0x8769)
        if (tagsInIFD["8769"]) {
            const exifOffset = parseInt(tagsInIFD["8769"].tagValue, 16);

            const exifIFDData = extractIFD(
                app1Segment,
                tiffHeaderOffset + exifOffset
            ); // (tiffHeaderOffset + exifOffset) offset to exifSubIFD

            const tagsInExif = ifdDataToTags(exifIFDData);
            // extend data of every tag in IFD
            for (const tag in tagsInExif) {
                tagsInExif[tag] = tagExtender(tagsInExif[tag], app1Segment);
            }
            parsedTags["exifSubIFD"] = tagsInExif;
        }
        // todo check for GPS tag (0x8825)
        if (tagsInIFD["8825"]) {
            const GPSOffset = parseInt(tagsInIFD["8825"].tagValue, 16);

            const exifIFDData = extractIFD(
                app1Segment,
                tiffHeaderOffset + GPSOffset
            ); // (tiffHeaderOffset + exifOffset) offset to exifSubIFD

            const tagsInGPS = ifdDataToTags(exifIFDData);
            // extend data of every tag in IFD
            for (const tag in tagsInGPS) {
                tagsInGPS[tag] = tagExtender(tagsInGPS[tag], app1Segment);
            }
            parsedTags["GPSIFD"] = tagsInGPS;
        }
        // todo check for IPTC tag (0x83bb)
        if (tagsInIFD["83bb"]) {
            console.log("not supporting IPTC yet");
        }
        // todo check for PHOTOSHOP tag (0x8649)
        if (tagsInIFD["8649"]) {
            console.log("not supporting PHOTOSHOP yet");
        }
        // todo check for ICC tag (0x8773)
        if (tagsInIFD["8773"]) {
            console.log("not supporting ICC yet");
        }
        // todo TAG_XMP         = 0x02BC
        // todo TAG_MAKERNOTE   = 0x927C
        // todo TAG_USERCOMMENT = 0x928
        // todo handle thumbnail as ifd
        if (tagsInIFD["0201"] && tagsInIFD["0202"]) {
            const thumbOffset = parseInt(tagsInIFD["0201"].tagValue, 16);

            const thumbData = app1Segment.slice(
                tiffHeaderOffset + thumbOffset,
                tiffHeaderOffset +
                    thumbOffset +
                    parseInt(tagsInIFD["0202"].tagValue, 16)
            );
            thumb['data'] = thumbData;
            
            
            // saveUint8ArrayAsFile(thumbData, "./thumb.jpg");
        }
        nextIFDOffset = IFDData.nextIFDOffset;
    }
    return {parsedTags: parsedTags, thumb: thumb['data']};
}

export { extractApp0, extractExifTags, TIFFParser, tagExtender };
