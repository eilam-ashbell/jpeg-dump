import { ExifBaseTagModel, ExifExtendedTagModel, ITIFFParser } from "../models/exif-tag.model";
import { App0JFIFModel, App0JFXXModel } from "../models/app0.model";
declare function extractApp0(app0Segment: Uint8Array): App0JFIFModel | App0JFXXModel;
declare function extractExifTags(app1Segment: Uint8Array): {
    [ifd: string]: {
        [key: string]: ExifExtendedTagModel;
    };
};
declare function tagExtender(tag: ExifBaseTagModel, app1Segment: Uint8Array, tagGroup: string): ExifExtendedTagModel;
declare function TIFFParser(app1Segment: Uint8Array): ITIFFParser;
export { extractApp0, extractExifTags, TIFFParser, tagExtender };
