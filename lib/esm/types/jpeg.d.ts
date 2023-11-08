import Structure from "./structure";
import Metadata from "./metadata";
import Compression from "./compression";
export default class Jpeg {
    constructor(input: string | Uint8Array);
    private imageData;
    private loadImageFromPath;
    get dump(): Uint8Array;
    structure: Structure;
    metadata: Metadata;
    compression: Compression;
}
