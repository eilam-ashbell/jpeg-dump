import markersDict from "../dictionaries/markersDict";
import SegmentModel from "./Segment.model";
import { MarkersNames } from "./markers-dict.model";

export default class SOFModel extends SegmentModel{
    public details: string;
    public samplePrecision: number;
    public linesNumber: number;
    public samplesPerLine: number;
    public componentsNumber: number;
    public componentId: number;

    constructor(rawData: Uint8Array, globalOffset: number, index:number) {
        super(rawData, globalOffset, index);
    this.samplePrecision = rawData[4];
    this.linesNumber = (rawData[5] << 8) | rawData[6];
    this.samplesPerLine = (rawData[7] << 8) | rawData[8];
    this.componentsNumber = rawData[9];
    this.componentId = rawData[10];
    this.details = markersDict[this.marker as MarkersNames].details;
    }
}