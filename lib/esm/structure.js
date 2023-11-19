import { splitToSegments } from "./extractors/splitToSegments";
import Markers from "./markers";
export default class Structure {
    constructor(imageData) {
        this.imageData = null;
        if (imageData instanceof Uint8Array) {
            this.imageData = imageData;
            this.fileStructure = splitToSegments(imageData);
            this.markers = new Markers(this.fileStructure);
        }
        else {
            this.fileStructure = imageData;
            this.markers = new Markers(this.fileStructure);
        }
    }
    // get file data separated to segments
    get dump() {
        return this.fileStructure;
    }
}
