import { extractApp0, TIFFParser } from "./extractors/metadata-extractors";
import {
    EXIFBaseTagModel,
    EXIFExtendedTagModel,
} from "./models/EXIF-tag.model";
import SegmentModel from "./models/Segment.model";
import Thumbnail from "./thumbnail";
import { APP0JFIFModel, APP0JFXXModel } from "./models/app0.model";

export default class Metadata {
    private fileStructure: SegmentModel[];
    private APP1: SegmentModel

    constructor(fileStructure: SegmentModel[]) {
        this.fileStructure = fileStructure;
        this.APP1 = this.fileStructure.filter(
            (segment) => segment.name === "APP1"
        )[0];
        if (this.APP1) {
            this.EXIF();
        }
    }

    private thumbnailData: Uint8Array | null = null;
    private EXIFTags!: {
        [ifd: string]: {
            [key: string]: EXIFExtendedTagModel | EXIFBaseTagModel;
        };
    };
    public JFIF(): APP0JFIFModel | APP0JFXXModel {
        const APP0 = this.fileStructure.filter(
            (segment) => segment.name === "APP0"
        )[0];
        if (!APP0) {
            throw new Error("no JFIF metadata found");
        }
        return extractApp0(APP0.rawData as Uint8Array);
    }
    public EXIF(): {
        [ifd: string]: {
            [key: string]: EXIFExtendedTagModel | EXIFBaseTagModel;
        };
    } {

        if (!this.APP1) {
            throw new Error("no EXIF metadata found");
        }
        const EXIFTags = TIFFParser(this.APP1);
        this.thumbnailData = EXIFTags.thumb;
        this.thumbnail = this.thumbnailData ? new Thumbnail(this.thumbnailData): undefined;

        this.EXIFTags = EXIFTags.parsedTags;
        return this.EXIFTags;
    }

    get IFDs() {
        if (!this.EXIFTags) {
            this.EXIF();
        }
        if (!this.EXIFTags) return null;
        return Object.keys(this.EXIFTags);
    }

    public IFDTags(IFD: string) {
        if (!this.EXIFTags) {
            this.EXIF();
        }
        if (!this.EXIFTags) return null;
        return this.EXIFTags[IFD];
    }

    public thumbnail: Thumbnail | undefined;
}
