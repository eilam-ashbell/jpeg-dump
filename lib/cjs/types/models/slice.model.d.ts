export default class SliceModel {
    constructor(name: string[], globalOffset: number, rawData: Uint8Array, nested?: SliceModel[]);
    name: string[];
    globalOffset: number;
    rawData: Uint8Array;
    nested?: SliceModel[];
}
