import markersDict from "../dictionaries/markersDict";
import SOFModel from "../models/SOF.model";
import SegmentModel from "../models/Segment.model";
import SOFTypeModel from "../models/sof-type.model";

function extractSOF(SOFSegment: SegmentModel): SOFModel {
    const SOFRawData = SOFSegment.rawData as Uint8Array
    // parse segment data
    const SOF = new SOFModel(SOFSegment.rawData, SOFSegment.globalOffset, SOFSegment.index )
    return SOF;
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
