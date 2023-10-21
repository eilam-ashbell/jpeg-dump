import { parseSegments } from "./extractors/parseSegments";
import SegmentModel from "./models/Segment.model";

export default class Markers {
    private structureData: SegmentModel;

    constructor(segmentData: SegmentModel) {
        this.structureData = segmentData;
    }

    // get a list of all main markers by their order on image
    get listMain(): string[] {
        return Object.keys(this.structureData);
    }

    // get a list of all markers by their order on image
    get listAll(): string[] {
        const markersList: string[] = [];
        Object.keys(this.structureData).forEach((key, i) => {
            markersList.push(key);
            if (this.structureData[key].nested) {
                Object.keys(
                    this.structureData[key].nested as SegmentModel
                ).forEach((key2, i) => {
                    markersList.push(key2);
                });
            }
        });
        return markersList;
    }

    // get a list of all markers of thumbnail image by their order on image
    get listThumbnail(): string[] {
        const markersList: string[] = [];
        Object.keys(this.structureData).forEach((key, i) => {
            if (this.structureData[key].nested) {
                Object.keys(
                    this.structureData[key].nested as SegmentModel
                ).forEach((key2, i) => {
                    markersList.push(key2);
                });
            }
        });
        return markersList;
    }

    // get all markers in images with their offset an relation to other markers
    get tree(): {
        [key: string]: {
            offset: number;
            nested?: { [key: string]: { offset: number } };
        };
    } {
        const markers: { [key: string]: any } = {};
        Object.keys(this.structureData).forEach((key, i) => {
            // if there are nested segments, parse the and insert to object
            if (this.structureData[key].nested) {
                const nested = Object.keys(
                    this.structureData[key].nested as SegmentModel
                );
                const nestedMarkers: { [key: string]: any } = {};
                nested.forEach(
                    (nestedKey) =>
                        (nestedMarkers[nestedKey] = {
                            offset: (
                                this.structureData[key].nested as SegmentModel
                            )[nestedKey].offset,
                        })
                );
                markers[key] = {
                    offset: this.structureData[key].offset,
                    nested: nestedMarkers,
                };
            } else {
                // if no nested segment, parse and mark segment offset
                markers[key] = { offset: this.structureData[key].offset };
            }
        });
        return markers;
    }

    // get a list of all metadata markers by their order on image
    get listMetadata(): string[] {
        const regexApps = /\bAPP/g;
        return Object.keys(this.structureData).filter(
            (marker) =>
                marker.match(regexApps) || marker === "COM" || marker === "TRLR"
        );
    }
}
