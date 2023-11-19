"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentTreeModel = void 0;
const markersDict_1 = __importDefault(require("../dictionaries/markersDict"));
const splitToSegments_1 = require("../extractors/splitToSegments");
class SegmentModel {
    // gets a unit8array data of s segment and creates a SegmentModel
    constructor(rawData, globalOffset, index) {
        // marker's hex values
        const markerSymbol = rawData[0].toString(16) + rawData[1].toString(16);
        if (markersDict_1.default[markerSymbol]) {
            // if valid marker -> extract data from it as known by jpeg file format docs
            this.name = markersDict_1.default[markerSymbol].name;
            this.marker = markerSymbol;
            const hasLength = markersDict_1.default[markerSymbol].length;
            this.length = hasLength ? (rawData[2] << 8) | rawData[3] : 0;
        }
        else {
            // if invalid marker -> declare as 'TRLR' data segment
            this.name = "TRLR";
            this.marker = null;
            this.length = rawData.length;
        }
        this.globalOffset = globalOffset;
        this.rawData = rawData;
        this.index = index;
        // search for nested segments inside current segment
        this.nested = (0, splitToSegments_1.splitToSegments)(rawData.slice(2));
    }
}
exports.default = SegmentModel;
class SegmentTreeModel {
}
exports.SegmentTreeModel = SegmentTreeModel;
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
