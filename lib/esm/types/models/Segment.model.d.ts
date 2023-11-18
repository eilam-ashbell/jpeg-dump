export default class SegmentModel {
    name: string;
    marker: string | null;
    globalOffset: number;
    length: number;
    rawData?: Uint8Array | null;
    nested?: SegmentModel[];
    data?: any;
}
export declare class SegmentTreeModel {
    name: string;
    globalOffset: number;
    nested?: Pick<SegmentTreeModel, "name" | "globalOffset">[];
}
