export default class SegmentModel {
    segmentName: string;
    marker: string | null;
    globalOffset: number;
    length: number;
    rawData?: Uint8Array | null;
    nested?: SegmentModel[];
}
export declare class SegmentTreeModel {
    segmentName: string;
    globalOffset: number;
    nested?: Pick<SegmentTreeModel, "segmentName" | "globalOffset">[];
}
