import markersDict from "../dictionaries/markersDict";
import SegmentModel from "./Segment.model";
export default class SOFModel extends SegmentModel {
    constructor(rawData, globalOffset, index) {
        super(rawData, globalOffset, index);
        this.samplePrecision = rawData[4];
        this.linesNumber = (rawData[5] << 8) | rawData[6];
        this.samplesPerLine = (rawData[7] << 8) | rawData[8];
        this.componentsNumber = rawData[9];
        this.componentId = rawData[10];
        this.details = markersDict[this.marker].details;
    }
}
