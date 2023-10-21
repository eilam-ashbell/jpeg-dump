export default class Markers {
    constructor(segmentData) {
        this.structureData = segmentData;
    }
    // get a list of all main markers by their order on image
    get listMain() {
        return Object.keys(this.structureData);
    }
    // get a list of all markers by their order on image
    get listAll() {
        const markersList = [];
        Object.keys(this.structureData).forEach((key, i) => {
            markersList.push(key);
            if (this.structureData[key].nested) {
                Object.keys(this.structureData[key].nested).forEach((key2, i) => {
                    markersList.push(key2);
                });
            }
        });
        return markersList;
    }
    // get a list of all markers of thumbnail image by their order on image
    get listThumbnail() {
        const markersList = [];
        Object.keys(this.structureData).forEach((key, i) => {
            if (this.structureData[key].nested) {
                Object.keys(this.structureData[key].nested).forEach((key2, i) => {
                    markersList.push(key2);
                });
            }
        });
        return markersList;
    }
    // get all markers in images with their offset an relation to other markers
    get tree() {
        const markers = {};
        Object.keys(this.structureData).forEach((key, i) => {
            // if there are nested segments, parse the and insert to object
            if (this.structureData[key].nested) {
                const nested = Object.keys(this.structureData[key].nested);
                const nestedMarkers = {};
                nested.forEach((nestedKey) => (nestedMarkers[nestedKey] = {
                    offset: this.structureData[key].nested[nestedKey].offset,
                }));
                markers[key] = {
                    offset: this.structureData[key].offset,
                    nested: nestedMarkers,
                };
            }
            else {
                // if no nested segment, parse and mark segment offset
                markers[key] = { offset: this.structureData[key].offset };
            }
        });
        return markers;
    }
    // get a list of all metadata markers by their order on image
    get listMetadata() {
        const regexApps = /\bAPP/g;
        return Object.keys(this.structureData).filter((marker) => marker.match(regexApps) || marker === "COM" || marker === "TRLR");
    }
}
