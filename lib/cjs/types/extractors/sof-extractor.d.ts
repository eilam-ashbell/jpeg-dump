import SegmentModel from "../models/Segment.model";
import SOFTypeModel from "../models/SOF-type.model";
import SOFModel from "../models/SOF.model";
declare function extractSOF(SOFSegment: SegmentModel): SOFModel;
declare function extractSOFType(fileStructure: SegmentModel[]): SOFTypeModel;
export { extractSOF, extractSOFType };
