import dataTypesDict from "../dictionaries/dataTypesDict";
import EXIFTagsDict from "../dictionaries/exifTagsDict";
import { hexToReadable } from "../utils/exif-utils";
import { hexStringToUint8Array } from "../utils/utils";

export class EXIFBaseTagModel {
    "tagId": string;
    "dataType": string;
    "valueCount": number;
    "tagValue": string;
    "order": number;
    "localOffset": number;
    "globalOffset": number;
    "tagRawValue": Uint8Array
}

export class EXIFExtendedTagModel extends EXIFBaseTagModel {
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

    constructor(EXIFTag: EXIFBaseTagModel, tagGroup: string) {
        super();
        this.tagId = EXIFTag.tagId;
        // this.ifd = EXIFTagsDict[EXIFTag.tagId]?.ifd
        this.dataType = EXIFTag.dataType;
        this.dataTypeAsInt = parseInt(EXIFTag.dataType, 16);
        this.valueCount = EXIFTag.valueCount;
        this.tagValue = EXIFTag.tagValue;
        this.order = EXIFTag.order;
        this.localOffset = EXIFTag.localOffset;
        this.globalOffset = EXIFTag.globalOffset;
        this.tagName = EXIFTagsDict[tagGroup][EXIFTag.tagId]?.tagName;
        this.dataTypeInBytes = dataTypesDict[this.dataTypeAsInt].length || 0;
        this.dataTypeName = dataTypesDict[this.dataTypeAsInt].name;
        this.isValueAtOffset = this.dataTypeInBytes
            ? this.dataTypeInBytes * this.valueCount > 4
            : true;
        this.rawValue = hexStringToUint8Array(this.tagValue).reverse();
        this.parsedValue = hexToReadable(this.tagId, this.dataTypeAsInt,  this.valueCount, this.rawValue);
        this.valuesDict = EXIFTagsDict[tagGroup][EXIFTag.tagId]?.values;
        this.tagDescription = EXIFTagsDict[tagGroup][EXIFTag.tagId]?.description || '';
        this.tagRawValue = EXIFTag.tagRawValue;
    }
}

export class EXIFTagDictModel {
    "tagId": string;
    "ifd": string;
    "tagName": string;
    "dataType": number | null;
    "values": {
        [key: string]: string;
    } | null;
    "description"?: string;
}

export interface ITIFFParser {
    'parsedTags': {[ifd: string]: {
        [key: string]: EXIFExtendedTagModel | EXIFBaseTagModel;
    }}
    'thumb': Uint8Array
}
