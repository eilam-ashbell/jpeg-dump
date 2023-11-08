import Jpeg from "./jpeg";
import { saveUint8ArrayAsFile } from "./utils/thumbnail-utils";
export default class Thumbnail {
    constructor(thumbData) {
        var _a, _b, _c;
        // private structure: SegmentModel;
        this.jpeg = null;
        this.thumbnail = null;
        // this.structure = structure;
        if (thumbData.length > 0) {
            this.jpeg = new Jpeg(thumbData);
            this.thumbnail = thumbData;
            this.structure = (_a = this.jpeg) === null || _a === void 0 ? void 0 : _a.structure;
            this.metadata = (_b = this.jpeg) === null || _b === void 0 ? void 0 : _b.metadata;
            this.compression = (_c = this.jpeg) === null || _c === void 0 ? void 0 : _c.compression;
        }
    }
    save(path) {
        saveUint8ArrayAsFile(this.thumbnail, path || "./thumbnail.jpg");
        return path || "./thumbnail.jpg";
    }
}
