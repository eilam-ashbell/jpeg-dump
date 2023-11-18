import markersDict from "../dictionaries/markersDict";
import { splitToSegments } from "../extractors/splitToSegments";
export default class SegmentModel {
    public name: string; // marker recognized name
    public marker: string | null; // marker's hex values
    public globalOffset: number; // first byte location from start of file
    public length: number; // length og segment (not including segment's marker)
    public rawData: Uint8Array; // segment data as unit8array
    public nested?: SegmentModel[]; // any nested segments inside of this one
    public index?: number

    // gets a unit8array data of s segment and creates a SegmentModel
    constructor(rawData: Uint8Array, globalOffset: number, index?: number) {
        // marker's hex values
        const markerSymbol = rawData[0].toString(16) + rawData[1].toString(16);
        if (markersDict[markerSymbol]) {
            // if valid marker -> extract data from it as known by jpeg file format docs
            this.name = markersDict[markerSymbol].name;
            this.marker = markerSymbol;
            const hasLength = markersDict[markerSymbol].length;
            this.length = hasLength ? (rawData[2] << 8) | rawData[3] : 0;
        } else {
            // if invalid marker -> declare as 'TRLR' data segment
            this.name = "TRLR";
            this.marker = null;
            this.length = rawData.length;
        }
        this.globalOffset = globalOffset;
        this.rawData = rawData;
        this.index = index;
        // search for nested segments inside current segment
        this.nested = splitToSegments(rawData.slice(2));
    }
}

export class SegmentTreeModel {
    name!: string;
    globalOffset!: number;
    nested?: Pick<SegmentTreeModel, "name" | "globalOffset">[];
}

// export default class SegmentModel {
//     public name: string;
//     public marker: string | null;
//     public globalOffset: number;
//     public length: number;
//     public rawData: Uint8Array;
//     public nested?: SegmentModel[];
//     // data?: any;

//     constructor(
//         name: string,
//         marker: string | null,
//         globalOffset: number,
//         length: number,
//         rawData: Uint8Array
//     ) {
//         this.name = name;
//         this.marker = marker;
//         this.globalOffset = globalOffset;
//         this.length = length;
//         this.rawData = rawData;
//     }
// }
