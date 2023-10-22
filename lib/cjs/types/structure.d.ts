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
    private imageData;
    private structureData;
    constructor(imageData: Uint8Array | SegmentModel | null);
    get dump(): SegmentModel;
    markers: Markers;
}
