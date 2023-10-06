import dataTypesDict from "../dictionaries/dataTypesDict";
import exifTagsDict from "../dictionaries/exifTagsDict";
import { hexToReadable } from "../utils/exif-utils";

export class ExifBaseTagModel {
    "tagId": string;
    "dataType": string;
    "valueCount": number;
    "rawValue": string;
    "order": number;
}

export class ExifExtendedTagModel extends ExifBaseTagModel {
    "tagName": string;
    // "ifd": string;
    "tagDescription": string;
    "dataTypeInBytes": number;
    "dataTypeName": string;
    "isValueAtOffset": boolean;
    "parsedValue": string;
    "valuesDict": { [key: string]: string } | null;

    constructor(exifTag: ExifBaseTagModel) {
        super();
        this.tagId = exifTag.tagId;
        // this.ifd = exifTagsDict[exifTag.tagId]?.ifd
        this.dataType = exifTag.dataType;
        this.valueCount = exifTag.valueCount;
        this.rawValue = exifTag.rawValue;
        this.order = exifTag.order;
        this.tagName = exifTagsDict[exifTag.tagId]?.tagName;
        // this.tagDescription = exifTagsDict[exifTag.tagId].tagDescription;
        this.dataTypeInBytes =
            dataTypesDict[Number(exifTag.dataType)].length || null;
        this.dataTypeName = dataTypesDict[Number(exifTag.dataType)].name;
        this.isValueAtOffset = this.dataTypeInBytes
            ? this.dataTypeInBytes * this.valueCount > 4
            : true;
        this.parsedValue = hexToReadable(
            Number(exifTag.dataType),
            this.rawValue
        );
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
