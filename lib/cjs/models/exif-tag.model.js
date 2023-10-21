"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExifTagDictModel = exports.ExifExtendedTagModel = exports.ExifBaseTagModel = void 0;
const dataTypesDict_1 = __importDefault(require("../dictionaries/dataTypesDict"));
const exifTagsDict_1 = __importDefault(require("../dictionaries/exifTagsDict"));
const exif_utils_1 = require("../utils/exif-utils");
const utils_1 = require("../utils/utils");
class ExifBaseTagModel {
}
exports.ExifBaseTagModel = ExifBaseTagModel;
class ExifExtendedTagModel extends ExifBaseTagModel {
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
        this.tagName = (_a = exifTagsDict_1.default[tagGroup][exifTag.tagId]) === null || _a === void 0 ? void 0 : _a.tagName;
        this.dataTypeInBytes = dataTypesDict_1.default[this.dataTypeAsInt].length || 0;
        this.dataTypeName = dataTypesDict_1.default[this.dataTypeAsInt].name;
        this.isValueAtOffset = this.dataTypeInBytes
            ? this.dataTypeInBytes * this.valueCount > 4
            : true;
        this.rawValue = (0, utils_1.hexStringToUint8Array)(this.tagValue).reverse();
        this.parsedValue = (0, exif_utils_1.hexToReadable)(this.tagId, this.dataTypeAsInt, this.valueCount, this.rawValue);
        this.valuesDict = (_b = exifTagsDict_1.default[tagGroup][exifTag.tagId]) === null || _b === void 0 ? void 0 : _b.values;
        this.tagDescription = ((_c = exifTagsDict_1.default[tagGroup][exifTag.tagId]) === null || _c === void 0 ? void 0 : _c.description) || '';
    }
}
exports.ExifExtendedTagModel = ExifExtendedTagModel;
class ExifTagDictModel {
}
exports.ExifTagDictModel = ExifTagDictModel;
