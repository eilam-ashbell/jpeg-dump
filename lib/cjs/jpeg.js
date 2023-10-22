"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const structure_1 = __importDefault(require("./structure"));
const metadata_1 = __importDefault(require("./metadata"));
const compression_1 = __importDefault(require("./compression"));
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
class Jpeg {
    constructor(input) {
        this.imageData = null;
        if (typeof input === "string") {
            // If input is a string (path), load the image from the provided path
            this.loadImageFromPath(input);
        }
        else if (input instanceof File) {
            // If input is a File object, read the image data
            this.readImageData(input);
        }
        else if (typeof input === "object") {
            // If input is already Unit8Array, use it without any need to parse
            this.structure = new structure_1.default(input);
            if (this.structure.dump) {
                this.metadata = new metadata_1.default(this.structure.dump);
                this.compression = new compression_1.default(this.structure.dump);
            }
            else {
                throw new Error("structure object is undefined");
            }
        }
        else {
            throw new Error("Invalid input type");
        }
        if (this.imageData != null) {
            this.structure = new structure_1.default(this.imageData);
            if (this.structure.dump) {
                this.metadata = new metadata_1.default(this.structure.dump);
                this.compression = new compression_1.default(this.structure.dump);
            }
            else {
                throw new Error("structure object is undefined");
            }
        }
    }
    loadImageFromPath(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Load the image file from the provided path
                const imageFileData = fs_1.default.readFileSync(path);
                // Convert the image buffer to a Uint8Array
                const byteArray = new Uint8Array(imageFileData);
                if (byteArray instanceof Uint8Array) {
                    this.imageData = byteArray;
                    resolve();
                }
                else {
                    reject(new Error("Failed to load image from path"));
                }
            });
        });
    }
    readImageData(image) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target &&
                        event.target.result instanceof ArrayBuffer) {
                        // Convert the ArrayBuffer to a Uint8Array
                        this.imageData = new Uint8Array(event.target.result);
                        resolve();
                    }
                    else {
                        reject(new Error("Failed to read image data"));
                    }
                };
                reader.onerror = (event) => {
                    reject(new Error("Error reading image data"));
                };
                reader.readAsArrayBuffer(image);
            });
        });
    }
    get dump() {
        return this.imageData;
    }
}
exports.default = Jpeg;
