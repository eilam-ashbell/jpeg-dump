import {ExifBaseTagModel} from "./models/EXIF-tag.model";
import { IBytesOrder } from "./models/IBytesOrder";
import ExifIfdDataModel from "./models/exif-ifd-data.model";

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
    for (const tag of tags) {
        const tagModel = unit8ArrayToExifTag(tag);
        tagsModel[tagModel.tagId] = tagModel;
    }
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
        (exifTag.valueCount = (
            (unit8Array[7] << 24) |
            (unit8Array[6] << 16) |
            (unit8Array[5] << 8) |
            unit8Array[4]
        )
            .toString(16)
            .padStart(8, "0")),
        (exifTag.value = Array.from(unit8Array.slice(-4).reverse(), (byte) =>
            byte.toString(16).padStart(2, "0")
        ).join(""));
    return exifTag;
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
