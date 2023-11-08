export default class SegmentModel {
    segmentName: string;
    marker: string | null;
    globalOffset: number;
    length: number;
    rawData?: Uint8Array | null;
    nested?: SegmentModel[];
    data?: any;
}

export class SegmentTreeModel {
    segmentName: string;
    globalOffset: number;
    nested?: Pick<SegmentTreeModel, "segmentName" | "globalOffset">[];
}
