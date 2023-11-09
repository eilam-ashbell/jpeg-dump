import { EXIFBaseTagModel } from "../models/EXIF-tag.model";
import { IBytesOrder } from "../models/IBytesOrder";
import EXIFIfdDataModel from "../models/exif-ifd-data.model";
declare function extractApp1Identifier(app1Segment: Uint8Array): string;
declare function extractApp1Length(app1Segment: Uint8Array): number;
declare function extractTiffOrderBytes(app1Segment: Uint8Array): string;
declare function extractTiffIdentifier(app1Segment: Uint8Array, bytesOrder?: IBytesOrder): string;
declare function extractFirstIFDOffset(app1Segment: Uint8Array, bytesOrder?: IBytesOrder): number;
declare function extractIFD(app1Segment: Uint8Array, IFDOffset: number, // local offset
bytesOrder?: IBytesOrder): EXIFIfdDataModel;
declare function splitUnit8ArrayToTags(unit8Array: Uint8Array): Uint8Array[];
declare function ifdDataToTags(ifdData: EXIFIfdDataModel, globalOffset: number): {
    [key: string]: EXIFBaseTagModel;
};
declare function unit8ArrayToEXIFTag(unit8Array: Uint8Array): EXIFBaseTagModel;
declare function hexToReadable(tagId: string, dataTypeNumber: number, valueCount: number, hexValue: Uint8Array): string | number;
export { extractApp1Length, extractApp1Identifier, extractTiffOrderBytes, extractTiffIdentifier, extractFirstIFDOffset, extractIFD, splitUnit8ArrayToTags, ifdDataToTags, unit8ArrayToEXIFTag, hexToReadable, };
