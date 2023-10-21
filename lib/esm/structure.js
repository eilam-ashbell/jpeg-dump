import { parseSegments } from "./extractors/parseSegments";
import Markers from "./markers";
/**
 * Structure class will externalize information about the segments and markers of the image
 * constructor should get an image as an input
 *
 * @public dump - return all image data divided to its markers and segments
 * @public markers - enable to list image's markers data in multiple filters and structure
 */
export default class Structure {
    constructor(imageData) {
        this.imageData = null;
        if (imageData instanceof Uint8Array) {
            this.imageData = imageData;
            this.structureData = parseSegments(imageData);
            this.markers = new Markers(this.structureData);
        }
        else {
            this.structureData = imageData;
            this.markers = new Markers(this.structureData);
        }
    }
    // get file data separated to segments
    get dump() {
        return this.structureData;
    }
}
