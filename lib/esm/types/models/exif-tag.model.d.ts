export declare class EXIFBaseTagModel {
    "tagId": string;
    "dataType": string;
    "valueCount": number;
    "tagValue": string;
    "order": number;
    "localOffset": number;
    "globalOffset": number;
    "tagRawValue": Uint8Array;
}
export declare class EXIFExtendedTagModel extends EXIFBaseTagModel {
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
    constructor(EXIFTag: EXIFBaseTagModel, tagGroup: string);
}
export declare class EXIFTagDictModel {
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
            [key: string]: EXIFExtendedTagModel | EXIFBaseTagModel;
        };
    };
    'thumb': Uint8Array;
}
