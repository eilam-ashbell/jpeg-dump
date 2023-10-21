import { ExifTagDictModel } from "../models/exif-tag.model";
declare const exifTagsDict: {
    [group: string]: {
        [key: string]: ExifTagDictModel;
    };
};
export default exifTagsDict;
