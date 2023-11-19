import SegmentModel from "./Segment.model";
export default class SOFModel extends SegmentModel {
    details: string;
    samplePrecision: number;
    linesNumber: number;
    samplesPerLine: number;
    componentsNumber: number;
    componentId: number;
    constructor(rawData: Uint8Array, globalOffset: number, index: number);
}
