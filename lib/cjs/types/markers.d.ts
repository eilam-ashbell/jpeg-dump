import SegmentModel from "./models/Segment.model";
export default class Markers {
    private structureData;
    constructor(segmentData: SegmentModel);
    get listMain(): string[];
    get listAll(): string[];
    get listThumbnail(): string[];
    get tree(): {
        [key: string]: {
            offset: number;
            nested?: {
                [key: string]: {
                    offset: number;
                };
            };
        };
    };
    get listMetadata(): string[];
}
