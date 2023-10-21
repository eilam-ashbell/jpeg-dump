import { ExifBaseTagModel } from "../models/exif-tag.model";
import { IBytesOrder } from "../models/IBytesOrder";
import ExifIfdDataModel from "../models/exif-ifd-data.model";
declare function extractApp1Identifier(app1Segment: Uint8Array): string;
declare function extractApp1Length(app1Segment: Uint8Array): number;
declare function extractTiffOrderBytes(app1Segment: Uint8Array): string;
declare function extractTiffIdentifier(app1Segment: Uint8Array, bytesOrder?: IBytesOrder): string;
declare function extractFirstIFDOffset(app1Segment: Uint8Array, bytesOrder?: IBytesOrder): number;
declare function extractIFD(app1Segment: Uint8Array, IFDOffset: number, bytesOrder?: IBytesOrder): ExifIfdDataModel;
declare function splitUnit8ArrayToTags(unit8Array: Uint8Array): Uint8Array[];
declare function ifdDataToTags(ifdData: ExifIfdDataModel): {
    [key: string]: ExifBaseTagModel;
};
declare function unit8ArrayToExifTag(unit8Array: Uint8Array): ExifBaseTagModel;
declare function hexToReadable(tagId: string, dataTypeNumber: number, valueCount: number, hexValue: Uint8Array): string | number;
export { extractApp1Length, extractApp1Identifier, extractTiffOrderBytes, extractTiffIdentifier, extractFirstIFDOffset, extractIFD, splitUnit8ArrayToTags, ifdDataToTags, unit8ArrayToExifTag, hexToReadable, };
