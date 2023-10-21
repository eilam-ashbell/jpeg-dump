import dataTypesDict from "../dictionaries/dataTypesDict";
import exifTagsDict from "../dictionaries/exifTagsDict";
import { hexToReadable } from "../utils/exif-utils";
import { hexStringToUint8Array } from "../utils/utils";
export class ExifBaseTagModel {
}
export class ExifExtendedTagModel extends ExifBaseTagModel {
    constructor(exifTag, tagGroup) {
        var _a, _b, _c;
        super();
        this.tagId = exifTag.tagId;
        // this.ifd = exifTagsDict[exifTag.tagId]?.ifd
        this.dataType = exifTag.dataType;
        this.dataTypeAsInt = parseInt(exifTag.dataType, 16);
        this.valueCount = exifTag.valueCount;
        this.tagValue = exifTag.tagValue;
        this.order = exifTag.order;
        this.offset = exifTag.offset;
        this.tagName = (_a = exifTagsDict[tagGroup][exifTag.tagId]) === null || _a === void 0 ? void 0 : _a.tagName;
        this.dataTypeInBytes = dataTypesDict[this.dataTypeAsInt].length || 0;
        this.dataTypeName = dataTypesDict[this.dataTypeAsInt].name;
        this.isValueAtOffset = this.dataTypeInBytes
            ? this.dataTypeInBytes * this.valueCount > 4
            : true;
        this.rawValue = hexStringToUint8Array(this.tagValue).reverse();
        this.parsedValue = hexToReadable(this.tagId, this.dataTypeAsInt, this.valueCount, this.rawValue);
        this.valuesDict = (_b = exifTagsDict[tagGroup][exifTag.tagId]) === null || _b === void 0 ? void 0 : _b.values;
        this.tagDescription = ((_c = exifTagsDict[tagGroup][exifTag.tagId]) === null || _c === void 0 ? void 0 : _c.description) || '';
    }
}
export class ExifTagDictModel {
}
