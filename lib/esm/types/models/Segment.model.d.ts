export default class SegmentModel {
    [markerName: string]: {
        marker: string | null;
        offset: number;
        length: number;
        rawData?: Uint8Array | null;
        nested?: SegmentModel;
        data?: any;
    };
}
