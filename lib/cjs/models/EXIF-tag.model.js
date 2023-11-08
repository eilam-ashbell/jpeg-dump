"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXIFTagDictModel = exports.EXIFExtendedTagModel = exports.EXIFBaseTagModel = void 0;
const dataTypesDict_1 = __importDefault(require("../dictionaries/dataTypesDict"));
const exifTagsDict_1 = __importDefault(require("../dictionaries/exifTagsDict"));
const exif_utils_1 = require("../utils/exif-utils");
const utils_1 = require("../utils/utils");
class EXIFBaseTagModel {
}
exports.EXIFBaseTagModel = EXIFBaseTagModel;
class EXIFExtendedTagModel extends EXIFBaseTagModel {
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
        this.tagName = (_a = exifTagsDict_1.default[tagGroup][EXIFTag.tagId]) === null || _a === void 0 ? void 0 : _a.tagName;
        this.dataTypeInBytes = dataTypesDict_1.default[this.dataTypeAsInt].length || 0;
        this.dataTypeName = dataTypesDict_1.default[this.dataTypeAsInt].name;
        this.isValueAtOffset = this.dataTypeInBytes
            ? this.dataTypeInBytes * this.valueCount > 4
            : true;
        this.rawValue = (0, utils_1.hexStringToUint8Array)(this.tagValue).reverse();
        this.parsedValue = (0, exif_utils_1.hexToReadable)(this.tagId, this.dataTypeAsInt, this.valueCount, this.rawValue);
        this.valuesDict = (_b = exifTagsDict_1.default[tagGroup][EXIFTag.tagId]) === null || _b === void 0 ? void 0 : _b.values;
        this.tagDescription = ((_c = exifTagsDict_1.default[tagGroup][EXIFTag.tagId]) === null || _c === void 0 ? void 0 : _c.description) || '';
    }
}
exports.EXIFExtendedTagModel = EXIFExtendedTagModel;
class EXIFTagDictModel {
}
exports.EXIFTagDictModel = EXIFTagDictModel;
