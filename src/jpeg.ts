import fs from "fs";
import Structure from "./structure";
import Metadata from "./metadata";
import Compression from "./compression";
import { checkIfFileExists } from "./utils/utils";

export default class Jpeg {
    constructor(input: string | Uint8Array) {
        if (typeof input === "string") {
            // check if path to file is valid and the file exist
            if (!checkIfFileExists(input)) throw new Error("File not found");
            // If input is a string (path), load the image from the provided path
            this.loadImageFromPath(input);            
        } else if (typeof input === "object") {
            // If input is already Unit8Array, use it without any need to parse
            this.structure = new Structure(input);
            if (this.structure.dump) {
                this.metadata = new Metadata(this.structure.dump);
                this.compression = new Compression(this.structure.dump);
            } else {
                throw new Error("structure object is undefined");
            }
        } else {
            throw new Error("Invalid input type");
        }

        if (this.imageData != null) {
            
            this.structure = new Structure(this.imageData);
            if (this.structure.dump) {                
                this.metadata = new Metadata(this.structure.dump);
                this.compression = new Compression(this.structure.dump);
            } else {
                throw new Error("structure object is undefined");
            }
        }
    }

    private imageData: Uint8Array | null = null;

    private async loadImageFromPath(path: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (checkIfFileExists(path)) {
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
            } else {
                reject(new Error("Failed to load image from path"));
            }
        });
    }

    get dump(): Uint8Array {
        return this.imageData as Uint8Array;
    }
    // todo: add file data? file size and etc..
    public structure!: Structure;
    public metadata!: Metadata;
    public compression!: Compression;
}
