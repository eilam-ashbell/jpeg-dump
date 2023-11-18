import SegmentModel from "../models/Segment.model";
declare function splitToSegments(rawFileData: Uint8Array): SegmentModel[] | undefined;
export { splitToSegments };
