import SegmentModel, { SegmentTreeModel } from "./models/Segment.model";
export default class Markers {
    private fileStructure;
    constructor(fileStructure: SegmentModel[]);
    get listMain(): string[];
    get listAll(): string[];
    get listThumbnail(): Array<string[]>;
    get tree(): SegmentTreeModel[];
    get listMetadata(): string[];
}
