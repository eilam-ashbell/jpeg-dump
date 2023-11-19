import SegmentModel from "./Segment.model";
export default class DQTModel extends SegmentModel {
    QTs: DQTData[];
    details: string;
    constructor(rawData: Uint8Array, globalOffset: number, index: number);
}
export declare class DQTData {
    precision: number;
    id: number;
    tableData: Uint16Array;
    localOffset: number;
    globalOffset: number;
    constructor(rawData: Uint8Array, globalOffset: number, localOffset: number);
}
