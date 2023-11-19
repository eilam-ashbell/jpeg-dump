import markersDict from "../dictionaries/markersDict";
import SOFModel from "../models/SOF.model";
function extractSOF(SOFSegment) {
    const SOFRawData = SOFSegment.rawData;
    // parse segment data
    const SOF = new SOFModel(SOFSegment.rawData, SOFSegment.globalOffset, SOFSegment.index);
    return SOF;
}
function extractSOFType(fileStructure) {
    // extract SOF in image
    const SOF = fileStructure.filter((segment) => segment.name.startsWith("SOF"))[0];
    // get SOF raw data
    const SOFData = SOF.rawData;
    return {
        marker: SOF.marker,
        name: SOF.name,
        details: markersDict[SOF.marker].details,
    };
}
export { extractSOF, extractSOFType };
