"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const markersDict_1 = __importDefault(require("../dictionaries/markersDict"));
const Segment_model_1 = __importDefault(require("./Segment.model"));
class SOFModel extends Segment_model_1.default {
    constructor(rawData, globalOffset, index) {
        super(rawData, globalOffset, index);
        this.samplePrecision = rawData[4];
        this.linesNumber = (rawData[5] << 8) | rawData[6];
        this.samplesPerLine = (rawData[7] << 8) | rawData[8];
        this.componentsNumber = rawData[9];
        this.componentId = rawData[10];
        this.details = markersDict_1.default[this.marker].details;
    }
}
exports.default = SOFModel;
