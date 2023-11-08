"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EXIFIfdDataModel {
    constructor(ifdRawData, tagsCount, tagsEndOffset, nextIFDOffset, offset) {
        this.ifdRawData = ifdRawData;
        this.tagsCount = tagsCount;
        this.tagsEndOffset = tagsEndOffset;
        this.nextIFDOffset = nextIFDOffset;
        this.offset = offset;
    }
}
exports.default = EXIFIfdDataModel;
