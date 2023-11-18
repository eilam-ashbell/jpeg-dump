import SegmentModel from "../models/Segment.model";

export default class DRIModel extends SegmentModel {
    public details: string; // explanation about this segment
    public rstInterval: number; // number of MCU between ech RST markers

    constructor(rawData: Uint8Array, globalOffset: number) {
        // extract Main segment model data
        super(rawData, globalOffset);
        // add description on the segment
        this.details = ''
        // calculate restart interval
        this.rstInterval = (rawData[4] << 8) | rawData[5];
    }
}
