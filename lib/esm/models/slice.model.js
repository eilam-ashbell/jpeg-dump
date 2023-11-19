export default class SliceModel {
    constructor(name, globalOffset, 
    // length: number,
    rawData, nested) {
        this.name = name;
        this.globalOffset = globalOffset;
        // this.length = length;
        this.rawData = rawData;
        nested ? (this.nested = nested) : null;
    }
}
