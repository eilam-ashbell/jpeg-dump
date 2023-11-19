"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const markersDict_1 = __importDefault(require("../dictionaries/markersDict"));
const Segment_model_1 = __importDefault(require("../models/Segment.model"));
class DRIModel extends Segment_model_1.default {
    constructor(rawData, globalOffset, index) {
        // extract Main segment model data
        super(rawData, globalOffset, index);
        // add description on the segment
        this.details = markersDict_1.default[this.marker].details;
        // calculate restart interval
        this.rstInterval = (rawData[4] << 8) | rawData[5];
    }
}
exports.default = DRIModel;
