import SegmentModel, { SegmentTreeModel } from "./models/Segment.model";

export default class Markers {
    private fileStructure: SegmentModel[];

    constructor(fileStructure: SegmentModel[]) {
        this.fileStructure = fileStructure;
    }

    // get a list of all main markers by their order on image
    get listMain(): string[] {
        return this.fileStructure.map((segment) => segment.name);
    }

    // get a list of all markers by their order on image
    get listAll(): string[] {
        const mainMarkers: string[] = this.fileStructure.map(
            (segment) => segment.name
        );
        const markersList: string[] = [];
        for (let i = 0; i < mainMarkers.length; i++) {
            markersList.push(mainMarkers[i]);
            if (this.fileStructure[i].nested) {
                this.fileStructure[i].nested?.map(
                    (segment) => markersList.push(segment.name)
                    // console.log(segment.name)
                );
            }
        }

        return markersList;
    }

    // get a list of all markers of thumbnail images by their order on image
    // each thumbnail represents as an array of markers
    get listThumbnail(): Array<string[]> {
        // create a global array for returning thumbnail markers
        const markersList: Array<string[]> = [];
        // isolate segments with nested markers
        const nestedMarkers = this.fileStructure.filter(
            (segment) => segment.nested
        );
        // for each segment with nested markers, extract the nested markers names
        for (let i = 0; i < nestedMarkers.length; i++) {
            if(nestedMarkers[i].nested){
                const thumbMarkers: string[] = nestedMarkers[i].nested!.map(
                    (segment) => (segment.name)
                    );
                    markersList.push(thumbMarkers);
                }
        }
        return markersList;
    }

    // get all markers in images with their offset an relation to other markers
    get tree(): SegmentTreeModel[] {
        const markers: SegmentTreeModel[] = [];
        this.fileStructure.map((segment, i) => {
            // if there are nested segments, parse the and insert to object
            if (segment.nested) {
                const nested = this.fileStructure[i].nested as SegmentModel[];
                const nestedMarkers: SegmentTreeModel[] = [];
                nested.map((nestedSegment, j) =>
                    nestedMarkers.push({
                        name: (
                            this.fileStructure[i].nested as SegmentModel[]
                        )[j].name,
                        globalOffset: (
                            this.fileStructure[i].nested as SegmentModel[]
                        )[j].globalOffset,
                    })
                );
                markers.push({
                    name: this.fileStructure[i].name,
                    globalOffset: this.fileStructure[i].globalOffset,
                    nested: nestedMarkers,
                });
            } else {
                // if no nested segment, parse and mark segment offset
                markers.push({
                    name: this.fileStructure[i].name,
                    globalOffset: this.fileStructure[i].globalOffset,
                });
            }
        });
        return markers;
    }

    // get a list of all metadata markers by their order on image
    get listMetadata(): string[] {
        const regexApps = /\bAPP/g;
        return this.fileStructure
            .map((segment) => segment.name)
            .filter(
                (marker) =>
                    marker.match(regexApps) ||
                    marker === "COM" ||
                    marker === "TRLR"
            );
    }
}
