export default class MarkersModel {
    [markerName: string]: {
        marker: string;
        offset: string;
        length: number;
        rawData?: Uint8Array | null;
        nestedSegments?: MarkersModel;
        data?: any;
    };
}
