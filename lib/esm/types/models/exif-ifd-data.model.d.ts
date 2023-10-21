export default class ExifIfdDataModel {
    'ifdRawData': Uint8Array;
    'tagsCount': number;
    'tagsEndOffset': number;
    'nextIFDOffset': number;
    'offset': number;
    constructor(ifdRawData: Uint8Array, tagsCount: number, tagsEndOffset: number, nextIFDOffset: number, offset: number);
}
