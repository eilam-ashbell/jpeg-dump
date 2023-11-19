import SOFModel from "../models/SOF.model";
import SegmentModel from "../models/Segment.model";
import SOFTypeModel from "../models/sof-type.model";
declare function extractSOF(SOFSegment: SegmentModel): SOFModel;
declare function extractSOFType(fileStructure: SegmentModel[]): SOFTypeModel;
export { extractSOF, extractSOFType };
