import markersDict from "../dictionaries/markersDict";
import SegmentModel from "../models/Segment.model";
import SOFTypeModel from "../models/SOF-type.model";
import SOFModel from "../models/SOF.model";

function extractSOF(SOFSegment: SegmentModel): SOFModel {
    const SOFRawData = SOFSegment.rawData as Uint8Array
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

function extractSOFType(fileStructure: SegmentModel[]): SOFTypeModel {    
    // extract SOF in image
    const SOF = fileStructure.filter((segment) => segment.name.startsWith("SOF"))[0]
    // get SOF raw data
    const SOFData = SOF.rawData as Uint8Array;
    return {
        marker: SOF.marker,
        name: SOF.name,
        details: markersDict[SOF.marker as string].details,
    };
}

export { extractSOF, extractSOFType };
