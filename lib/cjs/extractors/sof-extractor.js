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
    const SOFData = new SOF_model_1.default();
    SOFData.marker = ((SOFRawData[0] << 8) | SOFRawData[1]).toString(16);
    SOFData.globalOffset = SOFSegment.globalOffset;
    SOFData.length = (SOFRawData[2] << 8) | SOFRawData[3];
    SOFData.samplePrecision = SOFRawData[4];
    SOFData.linesNumber = (SOFRawData[5] << 8) | SOFRawData[6];
    SOFData.samplesPerLine = (SOFRawData[7] << 8) | SOFRawData[8];
    SOFData.componentsNumber = SOFRawData[9];
    SOFData.componentId = SOFRawData[10];
    SOFData.segmentName = markersDict_1.default[SOFData.marker].name;
    SOFData.details = markersDict_1.default[SOFData.marker].details;
    return SOFData;
}
exports.extractSOF = extractSOF;
function extractSOFType(fileStructure) {
    // extract SOF in image
    const SOF = fileStructure.filter((segment) => segment.segmentName.startsWith("SOF"))[0];
    // get SOF raw data
    const SOFData = SOF.rawData;
    return {
        marker: SOF.marker,
        name: SOF.segmentName,
        details: markersDict_1.default[SOF.marker].details,
    };
}
exports.extractSOFType = extractSOFType;
