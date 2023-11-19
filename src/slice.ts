import { TIFFParser } from "./extractors/metadata-extractors";
import { EXIFExtendedTagModel } from "./models/EXIF-tag.model";
import SegmentModel from "./models/Segment.model";
import SliceModel from "./models/slice.model";

export default function slice(fileStructure: SegmentModel[]): SliceModel[] {
    const slices: SliceModel[] = [];

    fileStructure.map((segment) => {
        if (segment.name === "APP0") {
        } else if (segment.name === "APP1") {
            const nested: SliceModel[] = [];
            const EXIF = TIFFParser(segment);
            for (let IFD in EXIF.parsedTags) {
                for (let tag in EXIF.parsedTags[IFD]) {
                    nested.push(
                        new SliceModel(
                            [IFD, tag],
                            EXIF.parsedTags[IFD][tag].globalOffset,
                            // 12,
                            EXIF.parsedTags[IFD][tag].tagRawValue
                        )
                    );
                }
            }
            slices.push(
                new SliceModel(
                    ["APP1"],
                    segment.globalOffset,
                    // segment.length,
                    segment.rawData,
                    nested
                )
            );
        } else
            slices.push(
                new SliceModel(
                    [segment.name],
                    segment.globalOffset,
                    // segment.length,
                    segment.rawData
                )
            );
    });

    console.log(slices);

    return [];
}
