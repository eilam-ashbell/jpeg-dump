import Structure from "./structure";
import Metadata from "./metadata";
import Compression from "./compression";
/**
 * Jpeg class will externalize every pice of data in a JPEG file
 * constructor should get an image as an input
 * @param input - File | string (path) | Unit8Array
 *
 * @public dump - return image data as Unit8Array
 * @public structure - get data about markers and segments of the image
 * @public metadata - get metadata of the image
 * @public compression - get data about compression process of the image
 */
export default class Jpeg {
    constructor(input: File | string | Uint8Array);
    private imageData;
    private loadImageFromPath;
    private readImageData;
    get dump(): Uint8Array;
    structure: Structure;
    metadata: Metadata;
    compression: Compression;
}
