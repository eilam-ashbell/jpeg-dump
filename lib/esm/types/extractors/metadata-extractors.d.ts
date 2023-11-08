import { EXIFBaseTagModel, EXIFExtendedTagModel, ITIFFParser } from "../models/EXIF-tag.model";
import { App0JFIFModel, App0JFXXModel } from "../models/app0.model";
import SegmentModel from "../models/Segment.model";
declare function extractApp0(app0Segment: Uint8Array): App0JFIFModel | App0JFXXModel;
declare function tagExtender(tag: EXIFBaseTagModel, app1Segment: Uint8Array, tagGroup: string): EXIFExtendedTagModel;
declare function TIFFParser(app1Segment: SegmentModel): ITIFFParser;
export { extractApp0, TIFFParser, tagExtender };
