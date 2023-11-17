export default class SliceModel {
    constructor(
        name: string[],
        globalOffset: number,
        // length: number,
        rawData: Uint8Array,
        nested?: SliceModel[]
    ) {
        this.name = name;
        this.globalOffset = globalOffset;
        // this.length = length;
        this.rawData = rawData;
        nested ? (this.nested = nested) : null;
    }
    name: string[];
    globalOffset: number;
    // length: number;
    rawData: Uint8Array;
    nested?: SliceModel[];
}
