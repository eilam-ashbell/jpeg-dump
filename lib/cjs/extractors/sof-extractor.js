"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSOFType = exports.extractSOF = void 0;
const markersDict_1 = __importDefault(require("../dictionaries/markersDict"));
const SOF_model_1 = __importDefault(require("../models/SOF.model"));
function extractSOF(SOFSegment) {
    const SOFRawData = SOFSegment.rawData;
    // parse segment data
    const SOF = new SOF_model_1.default(SOFSegment.rawData, SOFSegment.globalOffset, SOFSegment.index);
    return SOF;
}
exports.extractSOF = extractSOF;
function extractSOFType(fileStructure) {
    // extract SOF in image
    const SOF = fileStructure.filter((segment) => segment.name.startsWith("SOF"))[0];
    // get SOF raw data
    const SOFData = SOF.rawData;
    return {
        marker: SOF.marker,
        name: SOF.name,
        details: markersDict_1.default[SOF.marker].details,
    };
}
exports.extractSOFType = extractSOFType;
