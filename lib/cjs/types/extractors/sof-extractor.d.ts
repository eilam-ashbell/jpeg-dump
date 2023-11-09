import SegmentModel from "../models/Segment.model";
import SOFTypeModel from "../models/sof-type.model";
import SOFModel from "../models/sof.model";
declare function extractSOF(SOFSegment: SegmentModel): SOFModel;
declare function extractSOFType(fileStructure: SegmentModel[]): SOFTypeModel;
export { extractSOF, extractSOFType };
