export default class ExifIfdDataModel {
    constructor(ifdRawData, tagsCount, tagsEndOffset, nextIFDOffset, offset) {
        this.ifdRawData = ifdRawData;
        this.tagsCount = tagsCount;
        this.tagsEndOffset = tagsEndOffset;
        this.nextIFDOffset = nextIFDOffset;
        this.offset = offset;
    }
}
