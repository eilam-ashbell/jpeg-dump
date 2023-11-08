var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import Structure from "./structure";
import Metadata from "./metadata";
import Compression from "./compression";
import { checkIfFileExists } from "./utils/utils";
export default class Jpeg {
    constructor(input) {
        this.imageData = null;
        if (typeof input === "string") {
            // check if path to file is valid and the file exist
            if (!checkIfFileExists(input))
                throw new Error("File not found");
            // If input is a string (path), load the image from the provided path
            this.loadImageFromPath(input);
        }
        else if (typeof input === "object") {
            // If input is already Unit8Array, use it without any need to parse
            this.structure = new Structure(input);
            if (this.structure.dump) {
                this.metadata = new Metadata(this.structure.dump);
                this.compression = new Compression(this.structure.dump);
            }
            else {
                throw new Error("structure object is undefined");
            }
        }
        else {
            throw new Error("Invalid input type");
        }
        if (this.imageData != null) {
            this.structure = new Structure(this.imageData);
            if (this.structure.dump) {
                this.metadata = new Metadata(this.structure.dump);
                this.compression = new Compression(this.structure.dump);
            }
            else {
                throw new Error("structure object is undefined");
            }
        }
    }
    loadImageFromPath(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (checkIfFileExists(path)) {
                    // Load the image file from the provided path
                    const imageFileData = fs.readFileSync(path);
                    // Convert the image buffer to a Uint8Array
                    const byteArray = new Uint8Array(imageFileData);
                    if (byteArray instanceof Uint8Array) {
                        this.imageData = byteArray;
                        resolve();
                    }
                    else {
                        reject(new Error("Failed to load image from path"));
                    }
                }
                else {
                    reject(new Error("Failed to load image from path"));
                }
            });
        });
    }
    get dump() {
        return this.imageData;
    }
}
