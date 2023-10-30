import { extractApp0, TIFFParser } from "./extractors/metadata-extractors";
import {
    ExifBaseTagModel,
    ExifExtendedTagModel,
} from "./models/EXIF-tag.model";
import SegmentModel from "./models/Segment.model";
import Thumbnail from "./thumbnail";
import { App0JFIFModel, App0JFXXModel } from "./models/app0.model";

export default class Metadata {
    private structureData: SegmentModel;

    constructor(structureData: SegmentModel) {
        this.structureData = structureData;
        if (structureData["APP1"]) {
            this.EXIF();
        }
    }

    private thumbnailData: Uint8Array | null = null;
    private exifTags: {
        [ifd: string]: {
            [key: string]: ExifExtendedTagModel | ExifBaseTagModel;
        };
    };
    public JFIF(): App0JFIFModel | App0JFXXModel {
        if (!this.structureData["APP0"]) {
            throw new Error("no JFIF metadata found");
        }
        return extractApp0(this.structureData["APP0"]?.rawData as Uint8Array);
    }
    public EXIF(): {
        [ifd: string]: {
            [key: string]: ExifExtendedTagModel | ExifBaseTagModel;
        };
    } {
        if (!this.structureData["APP1"]) {
            throw new Error("no EXIF metadata found");
        }
        const exifTags = TIFFParser(
            this.structureData["APP1"]?.rawData as Uint8Array
        );
        this.thumbnailData = exifTags.thumb;
        this.thumbnail = new Thumbnail(this.thumbnailData);

        this.exifTags = exifTags.parsedTags;
        return this.exifTags;
    }

    get IFDs() {
        if (!this.exifTags) {
            this.EXIF();
        }
        if (!this.exifTags) return null;
        return Object.keys(this.exifTags);
    }

    public IFDTags(IFD: string) {
        if (!this.exifTags) {
            this.EXIF();
        }
        if (!this.exifTags) return null;
        return this.exifTags[IFD];
    }
    // public parse(marker: Markers) {
    //     // check if marker exist in image file
    //     if (this.structureData[marker] == undefined) {
    //         throw new Error(`Marker does not exist in image`);
    //     }

    //     switch (marker) {
    //         case "APP0":
    //             return extractApp0(
    //                 this.structureData["APP0"]?.rawData as Uint8Array
    //             );
    //             break;
    //         case "APP1":
    //             // todo - handle shared ID tags & IFD parsing
    //             const exifTags = TIFFParser(
    //                 this.structureData["APP1"]?.rawData as Uint8Array
    //             );
    //             this.thumbnailData = exifTags.thumb;
    //             this.thumbnail = new Thumbnail(this.thumbnailData)
    //             return exifTags.parsedTags;
    //             break;
    //         case "APP2":
    //             return "not supported yet";
    //             break;
    //         case "APP3":
    //             return "not supported yet";
    //             break;
    //         case "APP4":
    //             return "not supported yet";
    //             break;
    //         case "APP5":
    //             return "not supported yet";
    //             break;
    //         case "APP6":
    //             return "not supported yet";
    //             break;
    //         case "APP7":
    //             return "not supported yet";
    //             break;
    //         case "APP8":
    //             return "not supported yet";
    //             break;
    //         case "APP9":
    //             return "not supported yet";
    //             break;
    //         case "APP10":
    //             return "not supported yet";
    //             break;
    //         case "APP11":
    //             return "not supported yet";
    //             break;
    //         case "APP12":
    //             return "not supported yet";
    //             break;
    //         case "APP13":
    //             return 'not supported yet';
    //             break;
    //         case "APP14":
    //             return "not supported yet";
    //             break;
    //         case "APP15":
    //             return "not supported yet";
    //             break;
    //         case "COM":
    //             return "not supported yet";
    //             break;
    //         case "TRLR":
    //             return "not supported yet";
    //             break;
    //         default:
    //             return "not a valid metadata marker";
    //             break;
    //     }
    //     return this.structureData[marker];
    // }

    public thumbnail: Thumbnail;
}
