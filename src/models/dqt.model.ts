import { type } from "os";
import SegmentModel from "./Segment.model";
import markersDict from "../dictionaries/markersDict";
import { MarkersNames } from "./markers-dict.model";

export default class DQTModel extends SegmentModel {
    public QTs: DQTData[] = [];
    public details: string;

    constructor(rawData: Uint8Array, globalOffset: number, index:number) {
        super(rawData, globalOffset, index);
        this.details = markersDict[this.marker as MarkersNames].details
        let currentOffset = 4; // start from offset 4 to passed marker & length bytes
        while (currentOffset < this.length + 2) {
            this.QTs.push(
                new DQTData(
                    rawData.slice(currentOffset, currentOffset + 65),
                    globalOffset + currentOffset,
                    currentOffset
                )
            );
            currentOffset += 65;
        }
    }
}

export class DQTData {
    public precision: number;
    public id: number;
    public tableData: Uint16Array;
    public localOffset: number;
    public globalOffset: number;

    constructor(
        rawData: Uint8Array,
        globalOffset: number,
        localOffset: number
    ) {
        this.globalOffset = globalOffset;
        this.localOffset = localOffset;
        const qtInfoByte = rawData[0];
        this.precision = qtInfoByte >> 4 === 0 ? 8 : 16; // First 4 bits represent precision (0 for 8-bit, 1 for 16-bit)
        this.id = qtInfoByte & 0x0f; // Last 4 bits represent quantization table identifier
        this.tableData = new Uint16Array(64); // Each quantization table has 64 entries
        // let localOffset = localOffset;
        for (let i = 0; i < 64; i++) {
            if (this.precision === 8) {
                this.tableData[i] = rawData[i + 1];
            } else {
                this.tableData[i] = (rawData[i + 1] << 8) | rawData[i + 2];
            }
        }
    }
}
