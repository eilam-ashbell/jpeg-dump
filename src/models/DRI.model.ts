import markersDict from "../dictionaries/markersDict";
import SegmentModel from "../models/Segment.model";
import { MarkersNames } from "./markers-dict.model";

export default class DRIModel extends SegmentModel {
    public details: string; // explanation about this segment
    public rstInterval: number; // number of MCU between ech RST markers

    constructor(rawData: Uint8Array, globalOffset: number, index: number) {
        // extract Main segment model data
        super(rawData, globalOffset, index);
        // add description on the segment
        this.details = markersDict[this.marker as MarkersNames].details
        // calculate restart interval
        this.rstInterval = (rawData[4] << 8) | rawData[5];
    }
}
