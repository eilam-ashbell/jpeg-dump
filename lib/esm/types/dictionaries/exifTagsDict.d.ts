import { ExifTagDictModel } from "../models/EXIF-tag.model";
declare const exifTagsDict: {
    [group: string]: {
        [key: string]: ExifTagDictModel;
    };
};
export default exifTagsDict;
