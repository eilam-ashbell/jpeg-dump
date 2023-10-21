import SegmentModel from "../models/Segment.model";
import SOFTypeModel from "../models/sof-type.model";
import SofModel from "../models/sof.model";
declare function extractSof(sofSegment: Uint8Array): SofModel;
declare function extractSOFType(structure: SegmentModel): SOFTypeModel;
export { extractSof, extractSOFType };
