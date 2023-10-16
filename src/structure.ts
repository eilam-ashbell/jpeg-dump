import { parseSegments } from "./extractors/parseSegments";
import Markers from "./markers";
import SegmentModel from "./models/Segment.model";

/**
 * Structure class will externalize information about the segments and markers of the image
 * constructor should get an image as an input
 *
 * @public dump - return all image data divided to its markers and segments
 * @public markers - enable to list image's markers data in multiple filters and structure
 */
export default class Structure {
    private imageData: Uint8Array | null = null;
    private structureData: SegmentModel | undefined;

    constructor(imageData: Uint8Array | SegmentModel | null) {
        if (imageData instanceof Uint8Array) {
            this.imageData = imageData;
            this.structureData = parseSegments(imageData as Uint8Array);
            this.markers = new Markers(this.structureData as SegmentModel);
        } else {
            this.structureData = imageData as SegmentModel;
            this.markers = new Markers(this.structureData);
        }
    }

    // get file data separated to segments
    get dump(): SegmentModel {
        return this.structureData;
    }

    // class for export only markers
    public markers: Markers;
}
