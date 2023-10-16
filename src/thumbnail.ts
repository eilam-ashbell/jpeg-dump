import Compression from "./compression";
import Jpeg from "./jpeg";
import Metadata from "./metadata";
import SegmentModel from "./models/Segment.model";
import Structure from "./structure";
import { saveUint8ArrayAsFile } from "./utils/thumbnail-utils";

export default class Thumbnail {
    // private structure: SegmentModel;
    private jpeg: Jpeg | null = null;
    private thumbnail: Uint8Array | null = null;
    constructor(thumbData: Uint8Array) {
        // this.structure = structure;
        if (thumbData) this.jpeg = new Jpeg(thumbData);

        this.thumbnail = thumbData;
        this.structure = this.jpeg?.structure;

        this.metadata = this.jpeg?.metadata;

        this.compression = this.jpeg?.compression;
    }

    public structure: Structure;

    public metadata: Metadata;

    public compression: Compression;

    public save(path?: string): void {
        saveUint8ArrayAsFile(this.thumbnail as Uint8Array, path || './thumbnail.jpg');
    }
}
