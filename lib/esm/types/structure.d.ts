import Markers from "./markers";
import SegmentModel from "./models/Segment.model";
import { MarkersNames } from "./models/markers-dict.model";
export default class Structure {
    private imageData;
    private fileStructure;
    constructor(imageData: Uint8Array | SegmentModel[]);
    get dump(): SegmentModel[];
    markers: Markers;
    filter(segmentName: MarkersNames | MarkersNames[]): SegmentModel[] | {
        [key: MarkersNames]: SegmentModel[];
    };
    isExist(segmentName: MarkersNames | MarkersNames[]): boolean | {
        [key: MarkersNames]: boolean;
    };
    count(segmentName: MarkersNames | MarkersNames[]): number | {
        [key: MarkersNames]: number;
    };
}
