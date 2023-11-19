export default class SegmentModel {
    name: string;
    marker: string | null;
    globalOffset: number;
    length: number;
    rawData: Uint8Array;
    nested?: SegmentModel[];
    index: number;
    constructor(rawData: Uint8Array, globalOffset: number, index: number);
}
export declare class SegmentTreeModel {
    name: string;
    globalOffset: number;
    nested?: Pick<SegmentTreeModel, "name" | "globalOffset">[];
}
