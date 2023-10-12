import Jpeg from "./jpeg";
import SegmentModel from "./models/Segment.model";
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

    public structure;

    public metadata;

    public compression;

    // todo - enable saving thumbnail image as separate file
    public save(path: string) {
        // const segments = Object.keys(this.structure.dump);
        // console.log(segments);
        // const fileLength = segments.reduce(
        //     (length, chunk) =>
        //         length + this.structure.dump[chunk].rawData.length,
        //     0
        // );
        // console.log(fileLength);

        // let thumbData = new Uint8Array(fileLength);
        // let offset = 0;
        // segments.forEach((chunk) => {
        //     thumbData.set(this.structure.dump[chunk].rawData, offset);
        //     offset += this.structure.dump[chunk].rawData.length;
        // });
        // // console.log('start: ' + );
        // console.log(thumbData);

        // // console.log(new Jpeg('./thumb.jpeg').structure.dump);

        saveUint8ArrayAsFile(this.thumbnail as Uint8Array, "./thumb.jpg");
    }
}
