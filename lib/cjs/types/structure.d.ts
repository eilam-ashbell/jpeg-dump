import Markers from "./markers";
import SegmentModel from "./models/Segment.model";
export default class Structure {
    private imageData;
    private fileStructure;
    constructor(imageData: Uint8Array | SegmentModel[]);
    get dump(): SegmentModel[] | undefined;
    markers: Markers;
}
