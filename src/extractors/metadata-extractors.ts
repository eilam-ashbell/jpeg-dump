import {
    extractFirstIFDOffset,
    extractIFD,
    hexToReadable,
    ifdDataToTags,
} from "../utils/exif-utils";
import {
    EXIFBaseTagModel,
    EXIFExtendedTagModel,
    ITIFFParser,
} from "../models/EXIF-tag.model";
import { App0JFIFModel, App0JFXXModel } from "../models/app0.model";
import { createUniqueObjKey } from "../utils/utils";
import SegmentModel from "../models/Segment.model";

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

// function extractEXIFTags(app1Segment: Uint8Array) {
//     // Check if the APP1 marker is correct (0xFFE1)
//     if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
//         throw new Error("Invalid APP1 marker");
//     }
//     const tiffHeaderOffset = 10; // constant fo EXIF segment

//     // extract first IFD offset
//     const firstIFDOffset = extractFirstIFDOffset(app1Segment);

//     // set first IFD offset
//     let newOffset = firstIFDOffset;
//     // const segmentTags: { [key: string]: EXIFBaseTagModel } = {};
//     const segmentTags: { [ifd: string]: { [key: string]: EXIFBaseTagModel } } =
//         {};

//     // if the offset isn't 0 (last IFD mark) -> extract the IFD tags
//     while (newOffset !== 0) {
//         // console.log(newOffset);

//         const IFDData = extractIFD(app1Segment, newOffset + tiffHeaderOffset);
//         newOffset = IFDData.nextIFDOffset;
//         const ifdTags = ifdDataToTags(IFDData, app1Segment.g);
//         if (ifdTags["8769"]) {
//             // console.log(app1Segment.slice((firstIFDOffset + 2 + 226)));
//             // 28
//             const EXIFSubIfdRaw = app1Segment.slice(
//                 firstIFDOffset + 2 + 226,
//                 firstIFDOffset + 2 + 226 + 12 * 28 + 4
//             );
//             const rawTags = extractIFD(app1Segment, firstIFDOffset + 2 + 226);
//             // console.log(rawTags);

//             const tags = ifdDataToTags(rawTags);
//             // console.log(tags);
//         }
//         const ifdKey = createUniqueObjKey(segmentTags, "ifd");
//         // Object.assign(segmentTags, { key: ifdTags });
//         segmentTags[ifdKey] = ifdTags;

//         // console.log(IFDData.offset + IFDData.tagsEndOffset + 4);
//     }

//     const parsedTagsSegment: {
//         [ifd: string]: { [key: string]: EXIFExtendedTagModel };
//     } = {};
//     const ifdKeys = Object.keys(segmentTags);
//     // loop each tag in every ifd entry
//     for (let ifdKey of ifdKeys) {
//         const tempIfd = {};
//         // if it tag value is offset -> bring it from offset.
//         for (let tag in segmentTags[ifdKey]) {
//             const extendedTag = new EXIFExtendedTagModel(
//                 segmentTags[ifdKey][tag],
//                 "main"
//             );
//             if (extendedTag.isValueAtOffset) {
//                 // slice the offset value
//                 const startSliceData = parseInt(extendedTag.tagValue, 16) + 10;
//                 const endSliceData =
//                     parseInt(extendedTag.tagValue, 16) +
//                     10 +
//                     extendedTag.valueCount * extendedTag.dataTypeInBytes;

//                 const tagRawData = app1Segment.slice(
//                     startSliceData,
//                     endSliceData
//                 );
//                 // convert it to hex string
//                 let hexString = "";
//                 for (let i = 0; i < tagRawData.length; i++) {
//                     const hexByte = tagRawData[i].toString(16).padStart(2, "0");
//                     hexString += hexByte;
//                 }
//                 // parse the new value
//                 extendedTag.parsedValue = hexToReadable(
//                     extendedTag.tagId,
//                     extendedTag.dataTypeAsInt,
//                     extendedTag.valueCount,
//                     extendedTag.rawValue
//                 );
//             }
//             // if there is a dict to value translation -> use it.
//             if (extendedTag.valuesDict) {
//                 // convert value to key
//                 const key =
//                     Number(extendedTag.tagValue) ||
//                     formatHexZeros(extendedTag.tagValue);
//                 // get value by key
//                 extendedTag.parsedValue = extendedTag.valuesDict[key];
//             }

//             // assign tag to temp object
//             Object.assign(tempIfd, {
//                 [extendedTag.tagId]: extendedTag,
//             });
//         }
//         // assign ifd to global object
//         Object.assign(parsedTagsSegment, {
//             [ifdKey]: tempIfd,
//         });
//     }
//     return parsedTagsSegment;
// }

function tagExtender(
    tag: EXIFBaseTagModel,
    app1Segment: Uint8Array,
    tagGroup: string
): EXIFExtendedTagModel {
    // init extended model
    const extendedTag = new EXIFExtendedTagModel(tag, tagGroup);
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
            extendedTag.valueCount,
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

function TIFFParser(app1Segment: SegmentModel): ITIFFParser {
    const APP1RawData = app1Segment.rawData as Uint8Array
    // Check if the APP1 marker is correct (0xFFE1)
    if (APP1RawData[0] !== 0xff || APP1RawData[1] !== 0xe1) {
        throw new Error("Invalid APP1 marker");
    }
    const tiffHeaderOffset = 10; // constant for EXIF in APP1 segment
    // extract IFD offset
    let nextIFDOffset = extractFirstIFDOffset(APP1RawData);

    const parsedTags: {
        [ifd: string]: {
            [key: string]: EXIFExtendedTagModel | EXIFBaseTagModel;
        };
    } = {};
    const thumb: {'data': Uint8Array} = {'data': new Uint8Array(0)};

    while (nextIFDOffset) {
        // get IFD data
        const IFDData = extractIFD(
            APP1RawData,
            tiffHeaderOffset + nextIFDOffset
        ); // (tiffHeaderOffset + nextIFDOffset) offset from start of segment
        const tagsInIFD = ifdDataToTags(IFDData, app1Segment.globalOffset);

        // extend data of every tag in IFD
        for (const tag in tagsInIFD) {
            tagsInIFD[tag] = tagExtender(tagsInIFD[tag], APP1RawData, "main");
        }
        // create unit key to object in global object
        const ifdKey = createUniqueObjKey(parsedTags, "IFD");
        // insert to global object
        parsedTags[ifdKey] = tagsInIFD;

        // check for EXIFOffset tag (0x8769)
        if (tagsInIFD["8769"]) {
            const EXIFOffset = parseInt(tagsInIFD["8769"].tagValue, 16);

            const EXIFIFDData = extractIFD(
                APP1RawData,
                tiffHeaderOffset + EXIFOffset
            ); // (tiffHeaderOffset + EXIFOffset) offset to EXIFSubIFD

            const tagsInEXIF = ifdDataToTags(EXIFIFDData, app1Segment.globalOffset);
            // extend data of every tag in IFD
            for (const tag in tagsInEXIF) {
                tagsInEXIF[tag] = tagExtender(
                    tagsInEXIF[tag],
                    APP1RawData,
                    "main"
                );
            }
            parsedTags["EXIFSubIFD"] = tagsInEXIF;
        }
        // todo check for GPS tag (0x8825)
        if (tagsInIFD["8825"]) {
            const GPSOffset = parseInt(tagsInIFD["8825"].tagValue, 16);

            const EXIFIFDData = extractIFD(
                APP1RawData,
                tiffHeaderOffset + GPSOffset
            ); // (tiffHeaderOffset + EXIFOffset) offset to EXIFSubIFD

            const tagsInGPS = ifdDataToTags(EXIFIFDData, app1Segment.globalOffset);
            // extend data of every tag in IFD
            for (const tag in tagsInGPS) {
                tagsInGPS[tag] = tagExtender(
                    tagsInGPS[tag],
                    APP1RawData,
                    "GPS"
                );
            }
            parsedTags["GPSIFD"] = tagsInGPS;
        }
        // todo check for IPTC inner tags
        if (tagsInIFD["83bb"]) {
            if (tagsInIFD["83bb"]) {
                const IPTCOffset = parseInt(tagsInIFD["83bb"].tagValue, 16);
    
                const IPTCData = extractIFD(
                    APP1RawData,
                    tiffHeaderOffset + IPTCOffset
                ); // (tiffHeaderOffset + IPTCOffset) offset to IPTC
    
                const tagsInIPTC = ifdDataToTags(IPTCData, app1Segment.globalOffset);
                // extend data of every tag in IFD
                for (const tag in tagsInIPTC) {
                    tagsInIPTC[tag] = tagExtender(
                        tagsInIPTC[tag],
                        APP1RawData,
                        "main"
                    );
                }
                const key = createUniqueObjKey(parsedTags, "IPTC");
                parsedTags[key] = tagsInIPTC;
            }
        }
        if (tagsInIFD["8568"]) {
            if (tagsInIFD["8568"]) {
                //
                const IPTCOffset = parseInt(tagsInIFD["8568"].tagValue, 16);
    
                const IPTCData = extractIFD(
                    APP1RawData,
                    tiffHeaderOffset + IPTCOffset
                ); // (tiffHeaderOffset + IPTCOffset) offset to IPTC
    
                const tagsInIPTC = ifdDataToTags(IPTCData, app1Segment.globalOffset);
                // extend data of every tag in IFD
                for (const tag in tagsInIPTC) {
                    tagsInIPTC[tag] = tagExtender(
                        tagsInIPTC[tag],
                        APP1RawData,
                        "main"
                    );
                }
                const key = createUniqueObjKey(parsedTags, "IPTC");
                parsedTags[key] = tagsInIPTC;
            }
        }
        // todo check for PHOTOSHOP tag (0x8649)
        if (tagsInIFD["8649"]) {
            console.log("not supporting PHOTOSHOP yet");
        }
        // todo check for ICC tag (0x8773)
        if (tagsInIFD["8773"]) {
            console.log("not supporting ICC yet");
        }

        if (tagsInIFD["02bc"]) {
            // XMP Metadata (Adobe technote 9-14-02)
            const XMPOffset = parseInt(tagsInIFD["02bc"].tagValue, 16);

            const XMPData = extractIFD(
                APP1RawData,
                tiffHeaderOffset + XMPOffset
            ); // (tiffHeaderOffset + XMPOffset) offset to XMP

            const tagsInXMP = ifdDataToTags(XMPData, app1Segment.globalOffset);
            // extend data of every tag in IFD
            for (const tag in tagsInXMP) {
                tagsInXMP[tag] = tagExtender(
                    tagsInXMP[tag],
                    APP1RawData,
                    "main"
                );
            }
            const key = createUniqueObjKey(parsedTags, "XMP");
            parsedTags[key] = tagsInXMP;
        }
        // todo TAG_MAKERNOTE   = 0x927C
        if (tagsInIFD["927C"]) {
            console.log('MakerNotes');
            
        }
        // todo InteropOffset = 0xa005
        // todo TAG_USERCOMMENT = 0x928

        if (tagsInIFD["014a"]) {
            // in original Sony DSLR-A100 ARW images
            const subIFDOffset = parseInt(tagsInIFD["014a"].tagValue, 16);

            const subIFDData = extractIFD(
                APP1RawData,
                tiffHeaderOffset + subIFDOffset
            ); // (tiffHeaderOffset + subIFDOffset) offset to EXIFSubIFD

            const tagsInSubIFD = ifdDataToTags(subIFDData, app1Segment.globalOffset);
            // extend data of every tag in IFD
            for (const tag in tagsInSubIFD) {
                tagsInSubIFD[tag] = tagExtender(
                    tagsInSubIFD[tag],
                    APP1RawData,
                    "main"
                );
            }
            const key = createUniqueObjKey(parsedTags, "subIFD");
            parsedTags[key] = tagsInSubIFD;
        }
        if (tagsInIFD["0190"]) {
            // GlobalParametersIFD
            const subIFDOffset = parseInt(tagsInIFD["0190"].tagValue, 16);

            const subIFDData = extractIFD(
                APP1RawData,
                tiffHeaderOffset + subIFDOffset
            ); // (tiffHeaderOffset + subIFDOffset) offset to subIFDOffset

            const tagsInSubIFD = ifdDataToTags(subIFDData, app1Segment.globalOffset);
            // extend data of every tag in IFD
            for (const tag in tagsInSubIFD) {
                tagsInSubIFD[tag] = tagExtender(
                    tagsInSubIFD[tag],
                    APP1RawData,
                    "main"
                );
            }
            const key = createUniqueObjKey(parsedTags, "subIFD");
            parsedTags[key] = tagsInSubIFD;
        }
        if (tagsInIFD["4748"]) {
            // Information found in the Microsoft custom EXIF tag 0x4748, as written by Windows Live Photo Gallery.
            const microsoftStitchOffset = parseInt(tagsInIFD["4748"].tagValue, 16);

            const microsoftStitchData = extractIFD(
                APP1RawData,
                tiffHeaderOffset + microsoftStitchOffset
            ); // (tiffHeaderOffset + microsoftStitchOffset) offset to microsoftStitch

            const tagsInMicrosoftStitch = ifdDataToTags(microsoftStitchData, app1Segment.globalOffset);
            // extend data of every tag in IFD
            for (const tag in tagsInMicrosoftStitch) {
                tagsInMicrosoftStitch[tag] = tagExtender(
                    tagsInMicrosoftStitch[tag],
                    APP1RawData,
                    "main"
                );
            }
            const key = createUniqueObjKey(parsedTags, "microsoftStitch");
            parsedTags[key] = tagsInMicrosoftStitch;
        }
        if (tagsInIFD["8290"]) {
            // These tags are found in a separate IFD of JPEG, TIFF, DCR and KDC images from some older Kodak models such as the DC50, DC120, DCS760C, DCS Pro 14N, 14nx, SLR/n, Pro Back and Canon EOS D2000.
            const kodakIFDOffset = parseInt(tagsInIFD["8290"].tagValue, 16);

            const kodakIFDData = extractIFD(
                APP1RawData,
                tiffHeaderOffset + kodakIFDOffset
            ); // (tiffHeaderOffset + kodakIFDOffset) offset to KodakIFD

            const tagsInKodakIFD = ifdDataToTags(kodakIFDData, app1Segment.globalOffset);
            // extend data of every tag in IFD
            for (const tag in tagsInKodakIFD) {
                tagsInKodakIFD[tag] = tagExtender(
                    tagsInKodakIFD[tag],
                    APP1RawData,
                    "main"
                );
            }
            const key = createUniqueObjKey(parsedTags, "KodakIFD");
            parsedTags[key] = tagsInKodakIFD;
        }
        // todo handle thumbnail as ifd
        if (tagsInIFD["0201"] && tagsInIFD["0202"]) {
            const thumbOffset = parseInt(tagsInIFD["0201"].tagValue, 16);

            const thumbData = APP1RawData.slice(
                tiffHeaderOffset + thumbOffset,
                tiffHeaderOffset +
                    thumbOffset +
                    parseInt(tagsInIFD["0202"].tagValue, 16)
            );
            thumb["data"] = thumbData;
            // todo check for 0x014a tag (0x014a)
            if (tagsInIFD["014a"]) {
                console.log("not supporting 0x014a yet");
            }
        }
        nextIFDOffset = IFDData.nextIFDOffset;
    }
    return { parsedTags: parsedTags, thumb: thumb["data"] };
}

export { extractApp0, TIFFParser, tagExtender };
