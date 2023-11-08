export default class Markers {
    constructor(fileStructure) {
        this.fileStructure = fileStructure;
    }
    // get a list of all main markers by their order on image
    get listMain() {
        return this.fileStructure.map((segment) => segment.segmentName);
    }
    // get a list of all markers by their order on image
    get listAll() {
        var _a;
        const mainMarkers = this.fileStructure.map((segment) => segment.segmentName);
        const markersList = [];
        for (let i = 0; i < mainMarkers.length; i++) {
            markersList.push(mainMarkers[i]);
            if (this.fileStructure[i].nested) {
                (_a = this.fileStructure[i].nested) === null || _a === void 0 ? void 0 : _a.map((segment) => markersList.push(segment.segmentName)
                // console.log(segment.segmentName)
                );
            }
        }
        return markersList;
    }
    // get a list of all markers of thumbnail images by their order on image
    // each thumbnail represents as an array of markers
    get listThumbnail() {
        // create a global array for returning thumbnail markers
        const markersList = [];
        // isolate segments with nested markers
        const nestedMarkers = this.fileStructure.filter((segment) => segment.nested);
        // for each segment with nested markers, extract the nested markers names
        for (let i = 0; i < nestedMarkers.length; i++) {
            if (nestedMarkers[i].nested) {
                const thumbMarkers = nestedMarkers[i].nested.map((segment) => (segment.segmentName));
                markersList.push(thumbMarkers);
            }
        }
        return markersList;
    }
    // get all markers in images with their offset an relation to other markers
    get tree() {
        const markers = [];
        this.fileStructure.map((segment, i) => {
            // if there are nested segments, parse the and insert to object
            if (segment.nested) {
                const nested = this.fileStructure[i].nested;
                const nestedMarkers = [];
                nested.map((nestedSegment, j) => nestedMarkers.push({
                    segmentName: this.fileStructure[i].nested[j].segmentName,
                    globalOffset: this.fileStructure[i].nested[j].globalOffset,
                }));
                markers.push({
                    segmentName: this.fileStructure[i].segmentName,
                    globalOffset: this.fileStructure[i].globalOffset,
                    nested: nestedMarkers,
                });
            }
            else {
                // if no nested segment, parse and mark segment offset
                markers.push({
                    segmentName: this.fileStructure[i].segmentName,
                    globalOffset: this.fileStructure[i].globalOffset,
                });
            }
        });
        return markers;
    }
    // get a list of all metadata markers by their order on image
    get listMetadata() {
        const regexApps = /\bAPP/g;
        return this.fileStructure
            .map((segment) => segment.segmentName)
            .filter((marker) => marker.match(regexApps) ||
            marker === "COM" ||
            marker === "TRLR");
    }
}
