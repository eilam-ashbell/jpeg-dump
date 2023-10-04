
export default class ExifIfdDataModel {
    'ifdRawData': Uint8Array;
    'tagsCount': number;
    'tagsEndOffset': number;
    'nextIFDOffset': number;

    constructor (ifdRawData: Uint8Array, tagsCount: number, tagsEndOffset: number, nextIFDOffset: number) {
        this.ifdRawData = ifdRawData;
        this.tagsCount = tagsCount;
        this.tagsEndOffset = tagsEndOffset;
        this.nextIFDOffset = nextIFDOffset;
    }
}