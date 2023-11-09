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
const utils_1 = require("./utils/utils");
class Jpeg {
    constructor(input) {
        this.imageData = null;
        if (typeof input === "string") {
            // check if path to file is valid and the file exist
            if (!(0, utils_1.checkIfFileExists)(input))
                throw new Error("File not found");
            // If input is a string (path), load the image from the provided path
            this.loadImageFromPath(input);
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
                if ((0, utils_1.checkIfFileExists)(path)) {
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
exports.default = Jpeg;
