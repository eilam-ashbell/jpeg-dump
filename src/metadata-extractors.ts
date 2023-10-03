import { App0JFIFModel, App0JFXXModel } from "./models/app0.model";
import App1EXIFModel from "./models/app1.model";

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

function extractApp1(app1Segment: Uint8Array) {
    // Check if the APP1 marker is correct (0xFFE1)
    if (app1Segment[0] !== 0xff || app1Segment[1] !== 0xe1) {
        throw new Error("Invalid APP1 marker");
    }

    // Extract the data from the APP0 segment
    const identifier = String.fromCharCode(
        app1Segment[4],
        app1Segment[5],
        app1Segment[6],
        app1Segment[7],
        app1Segment[8]
    );
    if (identifier === "Exif\x00") {
        const TIFFOrder = ((app1Segment[10] << 8) | app1Segment[11]).toString(
            16
        );
        const TIFFIdentifier = (
            (app1Segment[12] << 8) |
            app1Segment[13]
        ).toString(16);
        const IFDOffset =
            app1Segment[14] +
            app1Segment[15] +
            app1Segment[16] +
            app1Segment[17];

        const IFD =
            (app1Segment[9 + IFDOffset] << 8) | app1Segment[10 + IFDOffset];
        // console.log(IFD);

        const EXIFData: App1EXIFModel = {
            identifier: identifier,
            TIFF: {
                order: TIFFOrder === "4949" ? "Little endian" : "Big endian",
                identifier: TIFFIdentifier,
                ifdOffset: IFDOffset,
            },
        };

        // console.log(EXIFData);
    }
}

function extractIFD(app1Segment: Uint8Array, startOffset: number) {
    startOffset = startOffset + 8;
    // extract tags count in IFD
    const tagsCount =
        (app1Segment[startOffset + 1] << 8) | app1Segment[startOffset];
    // calculate where tags structure ends
    const endOfTagsOffset = startOffset + tagsCount * 12 + 2;
    // slice IFD data from segment
    const IFDData = app1Segment.slice(startOffset, endOfTagsOffset);
    // slice tags from IFD data
    const tagsData = IFDData.slice(2);
    // split IFD to tags
    const tags: Uint8Array[] = [];
    for (let i = 0; i < tagsData.length; i += 12) {
        const chunk = tagsData.slice(i, i + 12);
        tags.push(chunk);
    }

    // todo - exif utils. export tag converter to separate function
    const tagTest = tags.map((tag) => ({
        tagId: ((tag[1] << 8) | tag[0]).toString(16).padStart(4, "0"),
        type: ((tag[3] << 8) | tag[2]).toString(16).padStart(4, "0"),
        count: ((tag[7] << 24) | (tag[6] << 16) | (tag[5] << 8) | tag[4])
            .toString(16)
            .padStart(8, "0"),
        value: Array.from(tag.slice(-4).reverse(), (byte) =>
            byte.toString(16).padStart(2, "0")
        ).join(""),
    }));
    console.log(tagTest);

    // find the next IFD offset
    const nextIFDBytes = app1Segment.slice(
        endOfTagsOffset,
        endOfTagsOffset + 4
    );
    // Interpret the 4 bytes as a little-endian integer
    let nextIFDOffset = 0;
    for (let i = 3; i >= 0; i--) {
        nextIFDOffset = (nextIFDOffset << 8) | nextIFDBytes[i];
    }

    console.log(nextIFDOffset);

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
}

export { extractApp0, extractApp1, extractIFD };
