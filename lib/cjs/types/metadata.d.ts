import { ExifBaseTagModel, ExifExtendedTagModel } from "./models/EXIF-tag.model";
import SegmentModel from "./models/Segment.model";
import Thumbnail from "./thumbnail";
import { App0JFIFModel, App0JFXXModel } from "./models/app0.model";
export default class Metadata {
    private structureData;
    constructor(structureData: SegmentModel);
    private thumbnailData;
    private exifTags;
    JFIF(): App0JFIFModel | App0JFXXModel;
    EXIF(): {
        [ifd: string]: {
            [key: string]: ExifExtendedTagModel | ExifBaseTagModel;
        };
    };
    get IFDs(): string[];
    IFDTags(IFD: string): {
        [key: string]: ExifBaseTagModel | ExifExtendedTagModel;
    };
    thumbnail: Thumbnail;
}
