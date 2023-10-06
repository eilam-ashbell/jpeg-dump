import dataTypesDict from "../dictionaries/dataTypesDict";
import dataTypes from "../dictionaries/dataTypesDict";
import exifTagsDict from "../dictionaries/exifTagsDict";
import { ExifBaseTagModel } from "../models/exif-tag.model";
import { IBytesOrder } from "../models/IBytesOrder";
import ExifIfdDataModel from "../models/exif-ifd-data.model";

function extractApp1Identifier(app1Segment: Uint8Array): string {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error(
            "Invalid APP1 segment. segment should contain 0xFFE1 marker"
        );
    }
    // Extract the data from the APP1 segment
    const identifier = String.fromCharCode(
        app1Segment[4],
        app1Segment[5],
        app1Segment[6],
        app1Segment[7],
        app1Segment[8],
        app1Segment[9]
    );
    return identifier;
}

function extractApp1Length(app1Segment: Uint8Array): number {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error(
            "Invalid APP1 segment. segment should contain 0xFFE1 marker"
        );
    }

    const segmentLength = (app1Segment[2] << 8) | app1Segment[3];
    return segmentLength;
}

function extractTiffOrderBytes(app1Segment: Uint8Array): string {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error(
            "Invalid APP1 segment. segment should contain 0xFFE1 marker"
        );
    }

    const tiffOrder = (app1Segment[10] << 8) | app1Segment[11];
    return tiffOrder.toString(16);
}

function extractTiffIdentifier(
    app1Segment: Uint8Array,
    bytesOrder: IBytesOrder = "4949"
): string {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error(
            "Invalid APP1 segment. segment should contain 0xFFE1 marker"
        );
    }
    // define bytes order reading
    const bytesOrderFlag = bytesOrder === ("4949" || "LE") ? -1 : 0;
    const tiffIdentifier =
        (app1Segment[12 - bytesOrderFlag] << 8) |
        app1Segment[13 + bytesOrderFlag];
    return tiffIdentifier.toString(16).padStart(4, "0");
}

function extractFirstIFDOffset(
    app1Segment: Uint8Array,
    bytesOrder: IBytesOrder = "4949"
): number {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error(
            "Invalid APP1 segment. segment should contain 0xFFE1 marker"
        );
    }

    // define bytes order reading
    const bytesOrderFlag = bytesOrder === ("4949" || "LE") ? -1 : 0;
    const firstIFDOffset =
        (app1Segment[14 - bytesOrderFlag * 3] << 24) |
        (app1Segment[15 - bytesOrderFlag] << 16) |
        (app1Segment[16 + bytesOrderFlag] << 8) |
        app1Segment[17 + bytesOrderFlag * 3];

    return firstIFDOffset;
}

function extractIFD(
    app1Segment: Uint8Array,
    IFDOffset: number,
    bytesOrder: IBytesOrder = "4949"
) {
    // define bytes order reading
    const bytesOrderFlag = bytesOrder === ("4949" || "LE") ? -1 : 0;

    // extract tags count in IFD
    const tagsCount =
        (app1Segment[IFDOffset - bytesOrderFlag] << 8) |
        app1Segment[IFDOffset + 1 + bytesOrderFlag];
    // console.log('tagsCount: ' + tagsCount);

    // calculate where tags structure ends
    const endOfTagsOffset = IFDOffset + tagsCount * 12 + 2;
    // console.log('endOfTagsOffset: ' + endOfTagsOffset);

    const nextIFDOffset =
        (app1Segment[endOfTagsOffset - bytesOrderFlag * 3] << 24) |
        (app1Segment[endOfTagsOffset + 1 - bytesOrderFlag] << 16) |
        (app1Segment[endOfTagsOffset + 2 + bytesOrderFlag] << 8) |
        app1Segment[endOfTagsOffset + 3 + bytesOrderFlag * 3];

    // console.log('nextIFDOffset: ' + nextIFDOffset);
    // console.log('app1Segment: ' + app1Segment.length);

    // slice IFD data from segment
    const IFDRawData = app1Segment.slice(
        IFDOffset,
        nextIFDOffset !== 0 ? nextIFDOffset : app1Segment.length
    );
    return new ExifIfdDataModel(
        IFDRawData,
        tagsCount,
        endOfTagsOffset - IFDOffset,
        nextIFDOffset
    ); // normalizing endOfTagsOffset to start of IFD
}

function splitUnit8ArrayToTags(unit8Array: Uint8Array): Uint8Array[] {
    if (unit8Array.length % 12 !== 0) {
        throw new Error(
            "Unit8Array length is not a multiple of 12. its " +
                (unit8Array.length % 12)
        );
    }

    const tags: Uint8Array[] = [];
    for (let i = 0; i < unit8Array.length; i += 12) {
        const chunk = unit8Array.slice(i, i + 12);
        tags.push(chunk);
    }
    return tags;
}

function ifdDataToTags(ifdData: ExifIfdDataModel): {
    [key: string]: ExifBaseTagModel;
} {
    const tagsMarkers = ifdData.ifdRawData.slice(2, ifdData.tagsEndOffset);
    const tags = splitUnit8ArrayToTags(tagsMarkers);
    const tagsModel = {};
    let tagCount = 1;
    for (const tag of tags) {
        const tagModel = unit8ArrayToExifTag(tag);        
        tagModel.order = tagCount;
        tagCount++;
        tagsModel[tagModel.tagId] = tagModel;
    }
    // console.log(tagsModel);

    return tagsModel;
}

function unit8ArrayToExifTag(unit8Array: Uint8Array): ExifBaseTagModel {
    if (unit8Array.length !== 12) {
        throw new Error(
            `Invalid unit8Array length. This array has ${unit8Array.length} bytes, and tag needs to be 12 bytes `
        );
    }    
    const exifTag = new ExifBaseTagModel();
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
        (exifTag.rawValue = Array.from(unit8Array.slice(-4).reverse(), (byte) =>
            byte.toString(16).padStart(2, "0")
        ).join(""));
    return exifTag;
}

function hexToReadable(dataTypeNumber: number, hexValue: string): string {
    const dataTypeInfo = dataTypesDict[dataTypeNumber];

    if (!dataTypeInfo) {
        return "Unsupported data type";
    }

    const hexPairs: string[] = [];
    for (let i = 0; i < hexValue.length; i += 2) {
        hexPairs.push(hexValue.substr(i, 2));
    }
    // const hexPairs = hexValue.match(/.{2}/g);

    // if (!hexPairs || hexPairs.length !== dataTypeInfo.length) {
    //     return "Invalid hex data length";
    // }

    const hexValues = hexPairs.map((hexPair) => parseInt(hexPair, 16));

    switch (dataTypeNumber) {
        case 1: // unsignedByte
        case 6: // signedByte
        case 7: // undefined
            return hexValues[0].toString();

        case 2: // asciiStrings
            return String.fromCharCode(...hexValues);

        case 3: // unsignedShort
        case 8: // signedShort
            return ((hexValues[0] << 8) | hexValues[1]).toString();

        case 4: // unsignedLong
        case 9: // signedLong
            return (
                (hexValues[0] << 24) |
                (hexValues[1] << 16) |
                (hexValues[2] << 8) |
                hexValues[3]
            ).toString();

        case 5: // unsignedRational
        case 10: // signedRational
            const numerator =
                (hexValues[0] << 24) |
                (hexValues[1] << 16) |
                (hexValues[2] << 8) |
                hexValues[3];
            const denominator =
                (hexValues[4] << 24) |
                (hexValues[5] << 16) |
                (hexValues[6] << 8) |
                hexValues[7];
            return `${numerator}/${denominator}`;

        case 11: // singleFloat
            const singleFloatBuffer = new ArrayBuffer(4);
            const singleFloatView = new DataView(singleFloatBuffer);
            hexValues.forEach((value, index) =>
                singleFloatView.setUint8(index, value)
            );
            return singleFloatView.getFloat32(0).toString();

        case 12: // doubleFloat
            const doubleFloatBuffer = new ArrayBuffer(8);
            const doubleFloatView = new DataView(doubleFloatBuffer);
            hexValues.forEach((value, index) =>
                doubleFloatView.setUint8(index, value)
            );
            return doubleFloatView.getFloat64(0).toString();

        default:
            return "Unknown data type";
    }
}

export {
    extractApp1Length,
    extractApp1Identifier,
    extractTiffOrderBytes,
    extractTiffIdentifier,
    extractFirstIFDOffset,
    extractIFD,
    splitUnit8ArrayToTags,
    ifdDataToTags,
    unit8ArrayToExifTag,
    hexToReadable,
};

// slice tags from IFD data
// const tagsRawData = IFDRawData.slice(2);

// const tagTest: EXIFTagModel[] = tags.map((tag) => unit8ArrayToExifTag(tag));
// console.log(tagTest);

// find the next IFD offset

// let tagsCounter = 0;
// const tagsObj: Record<
//     string,
//     { tagID: number; type: number; count: number; value: number }
// > = {};
// while (tagsCounter < tags) {
//     const tag: {tagID:number, type: number, count:number, value: number} = {
//         tagID: ((app1Segment[startOffset + (tagsCounter * 12)] << 8) | app1Segment[startOffset + (tagsCounter * 12) + 1]),
//         type: ((app1Segment[startOffset + (tagsCounter * 12) + 2] << 8) | app1Segment[startOffset + (tagsCounter * 12) + 3]),
//         count: app1Segment[startOffset + (tagsCounter * 12) + 4] +
//         app1Segment[startOffset + (tagsCounter * 12) + 5] +
//         app1Segment[startOffset + (tagsCounter * 12) + 6] +
//         app1Segment[startOffset + (tagsCounter * 12) + 7],
//         value: app1Segment[startOffset + (tagsCounter * 12) + 8] +
//         app1Segment[startOffset + (tagsCounter * 12) + 9] +
//         app1Segment[startOffset + (tagsCounter * 12) + 10] +
//         app1Segment[startOffset + (tagsCounter * 12) + 11],
//     }
// tagsObj[tag.tagID] = tag
// tagsCounter++;
// }
// console.log(tagsObj);
