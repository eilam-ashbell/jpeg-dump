import markersDict from "./dictionaries/markersDict";
import { extractApp0, extractExifTags, TIFFParser } from "./extractors/metadata-extractors";
import MarkersDictModel, { Markers } from "./models/markers-dict.model";
import SegmentModel from "./models/Segment.model";
import Thumbnail from "./thumbnail";

type markers = MarkersDictModel[keyof MarkersDictModel]["name"];

export default class Metadata {
    private structureData: SegmentModel;

    constructor(structureData: SegmentModel) {
        this.structureData = structureData;
        if (structureData['APP1']) {
            this.parse('APP1')
        }
    }

    private thumbnailData: Uint8Array | null = null;

    public parse(marker: Markers) {
        // check if marker exist in image file
        if (this.structureData[marker] == undefined) {
            throw new Error(`Marker does not exist in image`);
        }

        switch (marker) {
            case "APP0":
                return extractApp0(
                    this.structureData["APP0"]?.rawData as Uint8Array
                );
                break;
            case "APP1": 
                // todo - handle shared ID tags & IFD parsing
                const exifTags = TIFFParser(
                    this.structureData["APP1"]?.rawData as Uint8Array
                );
                this.thumbnailData = exifTags.thumb;
                this.thumbnail = new Thumbnail(this.thumbnailData)
                return exifTags.parsedTags;
                break;
            case "APP2":
                return "not supported yet";
                break;
            case "APP3":
                return "not supported yet";
                break;
            case "APP4":
                return "not supported yet";
                break;
            case "APP5":
                return "not supported yet";
                break;
            case "APP6":
                return "not supported yet";
                break;
            case "APP7":
                return "not supported yet";
                break;
            case "APP8":
                return "not supported yet";
                break;
            case "APP9":
                return "not supported yet";
                break;
            case "APP10":
                return "not supported yet";
                break;
            case "APP11":
                return "not supported yet";
                break;
            case "APP12":
                return "not supported yet";
                break;
            case "APP13":
                return 'not supported yet';
                break;
            case "APP14":
                return "not supported yet";
                break;
            case "APP15":
                return "not supported yet";
                break;
            case "COM":
                return "not supported yet";
                break;
            case "TRLR":
                return "not supported yet";
                break;
            default:
                return "not a valid metadata marker";
                break;
        }
        return this.structureData[marker];
    }

    public thumbnail;
}
