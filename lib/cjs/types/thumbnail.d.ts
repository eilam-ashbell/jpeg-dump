import Compression from "./compression";
import Metadata from "./metadata";
import Structure from "./structure";
export default class Thumbnail {
    private jpeg;
    private thumbnail;
    constructor(thumbData: Uint8Array);
    structure: Structure;
    metadata: Metadata;
    compression: Compression;
    save(path?: string): string;
}
