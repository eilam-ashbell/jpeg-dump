import markersDict from "../dictionaries/markersDict";
import SofModel from "../models/sof.model";
function extractSof(sofSegment) {
    // Read the marker map
    const markerMap = markersDict;
    // parse segment data
    const sofData = new SofModel();
    sofData.marker = ((sofSegment[0] << 8) | sofSegment[1]).toString(16);
    sofData.length = (sofSegment[2] << 8) | sofSegment[3];
    sofData.samplePrecision = sofSegment[4];
    sofData.linesNumber = (sofSegment[5] << 8) | sofSegment[6];
    sofData.samplesPerLine = (sofSegment[7] << 8) | sofSegment[8];
    sofData.componentsNumber = sofSegment[9];
    sofData.componentId = sofSegment[10];
    // from marker.json
    sofData.name = markerMap[`0x${sofData.marker}`].name;
    sofData.details = markerMap[`0x${sofData.marker}`].details;
    return sofData;
}
function extractSOFType(structure) {
    // Read the marker map
    const markerMap = markersDict;
    // extract SOF in image
    const SOF = Object.keys(structure).filter((k) => k.startsWith("SOF"))[0];
    // get SOF raw data
    const SOFData = structure[SOF].rawData;
    // extract marker
    const SOFmarker = ((SOFData[0] << 8) | SOFData[1]).toString(16);
    return {
        marker: SOFmarker,
        name: markersDict[`0x${SOFmarker}`].name,
        details: markersDict[`0x${SOFmarker}`].details,
    };
}
export { extractSof, extractSOFType };
