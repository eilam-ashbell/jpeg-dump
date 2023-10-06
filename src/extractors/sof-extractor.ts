import markersDict from "../dictionaries/markersDict";
import MarkersDictModel from "../models/markers-dict.model";
import SofModel from "../models/sof.model";
import { readJsonAsObj } from "../utils/utils";

async function extractSof(sofSegment: Uint8Array): Promise<SofModel> {
    // Read the marker map JSON file
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

export { extractSof };
