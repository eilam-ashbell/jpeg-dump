export class ExifBaseTagModel {
    "tagId": string;
    "dataType": string;
    "valueCount": string;
    "value": string;
}

export class ExifExtendedTagModel extends ExifBaseTagModel {
    "tagName": string;
    "tagDescription": string;
    "dataTypeTranslation": string;
    "valueTranslation": string;
}
