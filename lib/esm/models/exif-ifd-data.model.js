export default class EXIFIfdDataModel {
    constructor(ifdRawData, tagsCount, tagsEndOffset, nextIFDOffset, offset) {
        this.ifdRawData = ifdRawData;
        this.tagsCount = tagsCount;
        this.tagsEndOffset = tagsEndOffset;
        this.nextIFDOffset = nextIFDOffset;
        this.offset = offset;
    }
}
