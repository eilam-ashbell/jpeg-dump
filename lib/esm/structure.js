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
    // filter only required segments
    filter(segmentName) {
        if (typeof segmentName === "string") {
            const filteredList = this.dump.filter((s) => s.name === segmentName.toUpperCase());
            return filteredList;
        }
        else {
            const res = {};
            segmentName.forEach((name) => {
                const filteredList = this.dump.filter((s) => s.name === name.toUpperCase());
                res[name.toUpperCase()] = filteredList;
            });
            return res;
        }
    }
    // check if segment exist in file
    isExist(segmentName) {
        if (typeof segmentName === "string") {
            const filteredList = this.filter(segmentName);
            return filteredList.length > 0 ? true : false;
        }
        else {
            const res = {};
            segmentName.forEach((name) => {
                const filteredList = this.filter(name);
                res[name.toUpperCase()] = filteredList.length > 0 ? true : false;
            });
            return res;
        }
    }
    // count how many time a segment exist in file
    count(segmentName) {
        if (typeof segmentName === "string") {
            const filteredList = this.filter(segmentName);
            return filteredList.length;
        }
        else {
            const res = {};
            segmentName.forEach((name) => {
                const filteredList = this.filter(name);
                res[name.toUpperCase()] = filteredList.length;
            });
            return res;
        }
    }
}
