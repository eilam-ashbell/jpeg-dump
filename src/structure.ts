import { parseSegments } from "./extractors/parseSegments";
import Markers from "./markers";
import SegmentModel from "./models/Segment.model";

export default class Structure {
    private imageData: Uint8Array | null = null;
    private fileStructure: SegmentModel[] | undefined;

    constructor(imageData: Uint8Array | SegmentModel[]) {
        if (imageData instanceof Uint8Array) {            
            this.imageData = imageData;
            this.fileStructure = parseSegments(imageData as Uint8Array);            
            this.markers = new Markers(this.fileStructure as SegmentModel[]);
        } else {
            this.fileStructure = imageData as SegmentModel[];
            this.markers = new Markers(this.fileStructure);
        }
    }

    // get file data separated to segments
    get dump(): SegmentModel[] | undefined{
        return this.fileStructure;
    }

    // class for export only markers
    public markers: Markers;
}
