import markersDict from "../dictionaries/markersDict";
import SegmentModel from "../models/Segment.model";
export default class DRIModel extends SegmentModel {
    constructor(rawData, globalOffset, index) {
        // extract Main segment model data
        super(rawData, globalOffset, index);
        // add description on the segment
        this.details = markersDict[this.marker].details;
        // calculate restart interval
        this.rstInterval = (rawData[4] << 8) | rawData[5];
    }
}
