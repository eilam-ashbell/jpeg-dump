export declare class ExifBaseTagModel {
    "tagId": string;
    "dataType": string;
    "valueCount": number;
    "tagValue": string;
    "order": number;
    "offset": number;
}
export declare class ExifExtendedTagModel extends ExifBaseTagModel {
    "tagName": string;
    "tagDescription": string;
    "dataTypeAsInt": number;
    "dataTypeInBytes": number;
    "dataTypeName": string;
    "isValueAtOffset": boolean;
    "rawValue": Uint8Array;
    "parsedValue": string | number;
    "valuesDict": {
        [key: string]: string;
    } | null;
    constructor(exifTag: ExifBaseTagModel, tagGroup: string);
}
export declare class ExifTagDictModel {
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
    'parsedTags': {
        [ifd: string]: {
            [key: string]: ExifExtendedTagModel | ExifBaseTagModel;
        };
    };
    'thumb': Uint8Array;
}
