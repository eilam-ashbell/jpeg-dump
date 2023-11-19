import SegmentModel from "../models/Segment.model";
export default class DRIModel extends SegmentModel {
    details: string;
    rstInterval: number;
    constructor(rawData: Uint8Array, globalOffset: number, index: number);
}
