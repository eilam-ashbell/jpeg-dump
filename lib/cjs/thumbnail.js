"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jpeg_1 = __importDefault(require("./jpeg"));
const thumbnail_utils_1 = require("./utils/thumbnail-utils");
class Thumbnail {
    constructor(thumbData) {
        var _a, _b, _c;
        // private structure: SegmentModel;
        this.jpeg = null;
        this.thumbnail = null;
        // this.structure = structure;
        if (thumbData)
            this.jpeg = new jpeg_1.default(thumbData);
        this.thumbnail = thumbData;
        this.structure = (_a = this.jpeg) === null || _a === void 0 ? void 0 : _a.structure;
        this.metadata = (_b = this.jpeg) === null || _b === void 0 ? void 0 : _b.metadata;
        this.compression = (_c = this.jpeg) === null || _c === void 0 ? void 0 : _c.compression;
    }
    save(path) {
        (0, thumbnail_utils_1.saveUint8ArrayAsFile)(this.thumbnail, path || './thumbnail.jpg');
    }
}
exports.default = Thumbnail;
