import markersDict from "../dictionaries/markersDict";
import SOFModel from "../models/sof.model";
function extractSOF(SOFSegment) {
    const SOFRawData = SOFSegment.rawData;
    // parse segment data
    const SOFData = new SOFModel();
    SOFData.marker = ((SOFRawData[0] << 8) | SOFRawData[1]).toString(16);
    SOFData.globalOffset = SOFSegment.globalOffset;
    SOFData.length = (SOFRawData[2] << 8) | SOFRawData[3];
    SOFData.samplePrecision = SOFRawData[4];
    SOFData.linesNumber = (SOFRawData[5] << 8) | SOFRawData[6];
    SOFData.samplesPerLine = (SOFRawData[7] << 8) | SOFRawData[8];
    SOFData.componentsNumber = SOFRawData[9];
    SOFData.componentId = SOFRawData[10];
    SOFData.name = markersDict[SOFData.marker].name;
    SOFData.details = markersDict[SOFData.marker].details;
    return SOFData;
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
