import dataTypesDict from "../dictionaries/dataTypesDict";
import exifTagsDict from "../dictionaries/exifTagsDict";
import { hexToReadable } from "../utils/exif-utils";
import { hexStringToUint8Array } from "../utils/utils";

export class ExifBaseTagModel {
    "tagId": string;
    "dataType": string;
    "valueCount": number;
    "tagValue": string;
    "order": number;
    "offset": number;
}

export class ExifExtendedTagModel extends ExifBaseTagModel {
    "tagName": string;
    // "ifd": string;
    "tagDescription": string;
    "dataTypeAsInt": number;
    "dataTypeInBytes": number;
    "dataTypeName": string;
    "isValueAtOffset": boolean;
    "rawValue": Uint8Array;
    "parsedValue": string | number;
    "valuesDict": { [key: string]: string } | null;

    constructor(exifTag: ExifBaseTagModel) {
        super();
        this.tagId = exifTag.tagId;
        // this.ifd = exifTagsDict[exifTag.tagId]?.ifd
        this.dataType = exifTag.dataType;
        this.dataTypeAsInt = parseInt(exifTag.dataType, 16);
        this.valueCount = exifTag.valueCount;
        this.tagValue = exifTag.tagValue;
        this.order = exifTag.order;
        this.offset = exifTag.offset;
        this.tagName = exifTagsDict[exifTag.tagId]?.tagName;
        // this.tagDescription = exifTagsDict[exifTag.tagId].tagDescription;
        this.dataTypeInBytes = dataTypesDict[this.dataTypeAsInt].length || null;
        this.dataTypeName = dataTypesDict[this.dataTypeAsInt].name;
        this.isValueAtOffset = this.dataTypeInBytes
            ? this.dataTypeInBytes * this.valueCount > 4
            : true;
        this.rawValue = hexStringToUint8Array(this.tagValue).reverse();
        // todo - data conversion not good
        this.parsedValue = hexToReadable(this.tagId, this.dataTypeAsInt, this.rawValue);
        this.valuesDict = exifTagsDict[exifTag.tagId]?.values;
    }
}

export class ExifTagDictModel {
    "tagId": string;
    "ifd": string;
    "tagName": string;
    "dataType": number | null;
    "values": {
        [key: string]: string;
    } | null;
}
