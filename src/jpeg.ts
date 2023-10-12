import fs from "fs";
import { parseSegments } from "./extractors/parseSegments";
import segments from "./structure";
import Structure from "./structure";
import Metadata from "./metadata";
import SegmentModel from "./models/Segment.model";
import Compression from "./compression";
export default class Jpeg {
    constructor(input: File | string | Uint8Array) {
        if (typeof input === "string") {
            // If input is a string (path), load the image from the provided path
            this.loadImageFromPath(input);
        } else if (input instanceof File) {
            // If input is a File object, read the image data
            this.readImageData(input);
        } else if (typeof input === "object") {
            this.structure = new Structure(input);
            this.metadata = new Metadata(this.structure.dump);
            this.compression = new Compression(this.structure.dump);
        } else {
            throw new Error("Invalid input type");
        }

        if (this.imageData != null) {
            this.structure = new Structure(this.imageData);
            this.metadata = new Metadata(this.structure.dump);
            this.compression = new Compression(this.structure.dump);
        }
    }

    private imageData: Uint8Array | null = null;

    private async loadImageFromPath(path: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // Load the image file from the provided path
            const imageFileData = fs.readFileSync(path);
            // Convert the image buffer to a Uint8Array
            const byteArray = new Uint8Array(imageFileData);
            if (byteArray instanceof Uint8Array) {
                this.imageData = byteArray;
                resolve();
            } else {
                reject(new Error("Failed to load image from path"));
            }
        });
    }

    private async readImageData(image: File | string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                if (
                    event.target &&
                    event.target.result instanceof ArrayBuffer
                ) {
                    // Convert the ArrayBuffer to a Uint8Array
                    this.imageData = new Uint8Array(event.target.result);
                    resolve();
                } else {
                    reject(new Error("Failed to read image data"));
                }
            };

            reader.onerror = (event) => {
                reject(new Error("Error reading image data"));
            };

            reader.readAsArrayBuffer(image as File);
        });
    }

    get rawData(): Uint8Array {
        return this.imageData as Uint8Array;
    }

    public structure;
    public metadata;
    public compression;
}
