import { splitToSegments } from "./extractors/splitToSegments";
import Markers from "./markers";
import SegmentModel from "./models/Segment.model";
import MarkersDictModel, { MarkersNames } from "./models/markers-dict.model";

export default class Structure {
    private imageData: Uint8Array | null = null;
    private fileStructure: SegmentModel[];

    constructor(imageData: Uint8Array | SegmentModel[]) {
        if (imageData instanceof Uint8Array) {
            this.imageData = imageData;
            this.fileStructure = splitToSegments(imageData as Uint8Array);
            this.markers = new Markers(this.fileStructure as SegmentModel[]);
        } else {
            this.fileStructure = imageData as SegmentModel[];
            this.markers = new Markers(this.fileStructure);
        }
    }

    // get file data separated to segments
    get dump(): SegmentModel[] {
        return this.fileStructure;
    }

    // class for export only markers
    public markers: Markers;

    // filter only required segments
    public filter(
        segmentName: MarkersNames | MarkersNames[]
    ): SegmentModel[] | { [key: MarkersNames]: SegmentModel[] } {
        if (typeof segmentName === "string") {
            const filteredList = this.dump.filter(
                (s) => s.name === segmentName.toUpperCase()
            );
            return filteredList;
        } else {
            const res: { [key: MarkersNames]: SegmentModel[] } = {};
            segmentName.forEach((name) => {
                const filteredList = this.dump.filter((s) => s.name === name.toUpperCase());
                res[name.toUpperCase()] = filteredList;
            });
            return res;
        }
    }

    // check if segment exist in file
    public isExist(
        segmentName: MarkersNames | MarkersNames[]
    ): boolean | { [key: MarkersNames]: boolean } {
        if (typeof segmentName === "string") {
            const filteredList = this.filter(segmentName) as SegmentModel[];
            return filteredList.length > 0 ? true : false;
        } else {
            const res: { [key: MarkersNames]: boolean } = {};
            segmentName.forEach((name) => {
                const filteredList = this.filter(name) as SegmentModel[];
                res[name.toUpperCase()] = filteredList.length > 0 ? true : false;
            });
            return res;
        }
    }

    // count how many time a segment exist in file
    public count(segmentName: MarkersNames | MarkersNames[]): number | { [key: MarkersNames]: number } {
        if (typeof segmentName === "string") {
            const filteredList = this.filter(segmentName) as SegmentModel[];
            return filteredList.length;
        } else {
            const res: { [key: MarkersNames]: number } = {};
            segmentName.forEach((name) => {
                const filteredList = this.filter(name) as SegmentModel[];
                res[name.toUpperCase()] = filteredList.length;
            });
            return res;
        }
    }
}
