import dataTypesDict from "../dictionaries/dataTypesDict";
import EXIFTagsDict from "../dictionaries/exifTagsDict";
import { hexToReadable } from "../utils/exif-utils";
import { hexStringToUint8Array } from "../utils/utils";
export class EXIFBaseTagModel {
}
export class EXIFExtendedTagModel extends EXIFBaseTagModel {
    constructor(EXIFTag, tagGroup) {
        var _a, _b, _c;
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
        this.tagName = (_a = EXIFTagsDict[tagGroup][EXIFTag.tagId]) === null || _a === void 0 ? void 0 : _a.tagName;
        this.dataTypeInBytes = dataTypesDict[this.dataTypeAsInt].length || 0;
        this.dataTypeName = dataTypesDict[this.dataTypeAsInt].name;
        this.isValueAtOffset = this.dataTypeInBytes
            ? this.dataTypeInBytes * this.valueCount > 4
            : true;
        this.rawValue = hexStringToUint8Array(this.tagValue).reverse();
        this.parsedValue = hexToReadable(this.tagId, this.dataTypeAsInt, this.valueCount, this.rawValue);
        this.valuesDict = (_b = EXIFTagsDict[tagGroup][EXIFTag.tagId]) === null || _b === void 0 ? void 0 : _b.values;
        this.tagDescription = ((_c = EXIFTagsDict[tagGroup][EXIFTag.tagId]) === null || _c === void 0 ? void 0 : _c.description) || '';
        this.tagRawValue = EXIFTag.tagRawValue;
    }
}
export class EXIFTagDictModel {
}
