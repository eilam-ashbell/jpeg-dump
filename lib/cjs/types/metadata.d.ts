import { EXIFBaseTagModel, EXIFExtendedTagModel } from "./models/EXIF-tag.model";
import SegmentModel from "./models/Segment.model";
import Thumbnail from "./thumbnail";
import { App0JFIFModel, App0JFXXModel } from "./models/app0.model";
export default class Metadata {
    private fileStructure;
    private APP1;
    constructor(fileStructure: SegmentModel[]);
    private thumbnailData;
    private EXIFTags;
    JFIF(): App0JFIFModel | App0JFXXModel;
    EXIF(): {
        [ifd: string]: {
            [key: string]: EXIFExtendedTagModel | EXIFBaseTagModel;
        };
    };
    get IFDs(): string[];
    IFDTags(IFD: string): {
        [key: string]: EXIFBaseTagModel | EXIFExtendedTagModel;
    };
    thumbnail: Thumbnail | undefined;
}
