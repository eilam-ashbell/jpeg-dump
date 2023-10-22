"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyExists = exports.trimTrailingZeros = exports.uint8ArrayToNumberBE = exports.uint8ArrayToNumberLE = exports.splitArrayIntoChunks = exports.uint8ArrayToHexString = exports.hexStringToUint8Array = exports.formatHexZeros = exports.createUniqueObjKey = exports.readJsonAsObj = exports.readImageAsHex = void 0;
const fs = __importStar(require("fs"));
function readImageAsHex(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Read the image file asynchronously
            const imageBuffer = yield fs.promises.readFile(filePath);
            // Convert the image buffer to a Uint8Array
            const byteArray = new Uint8Array(imageBuffer);
            return byteArray;
        }
        catch (err) {
            throw new Error(`Error reading the image file: ${err}`);
        }
    });
}
exports.readImageAsHex = readImageAsHex;
function readJsonAsObj(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Read the JSON file
            const jsonContent = yield fs.promises.readFile(filePath);
            // Convert JSON to object
            const jsonAsObj = JSON.parse(jsonContent.toString());
            return jsonAsObj;
        }
        catch (err) {
            throw new Error(`Error reading the JSON file: ${err}`);
        }
    });
}
exports.readJsonAsObj = readJsonAsObj;
function createUniqueObjKey(object, key) {
    let newKey = key;
    let counter = 1;
    // Check if the key already exists in the object
    while (object.hasOwnProperty(newKey)) {
        newKey = `${key}${counter}`; // Append a number to the key
        counter++;
    }
    return newKey;
}
exports.createUniqueObjKey = createUniqueObjKey;
function formatHexZeros(hexValue) {
    // Remove any leading "0x" if present
    hexValue = hexValue.replace(/^0x/, "");
    // Count the number of leading zeros
    let leadingZerosCount = 0;
    while (hexValue.charAt(leadingZerosCount) === "0") {
        leadingZerosCount++;
    }
    if (leadingZerosCount % 2 === 0) {
        // Remove the leading zeros, leaving at least one
        hexValue = hexValue.substring(leadingZerosCount);
    }
    else {
        hexValue = hexValue.substring(leadingZerosCount - 1);
    }
    return hexValue;
}
exports.formatHexZeros = formatHexZeros;
function hexStringToUint8Array(hexString) {
    // Remove any spaces and ensure the string has an even number of characters
    hexString = hexString.replace(/\s/g, "");
    if (hexString.length % 2 !== 0) {
        throw new Error("Hex string must have an even number of characters.");
    }
    // Create a Uint8Array to hold the parsed bytes
    const uint8Array = new Uint8Array(hexString.length / 2);
    // Parse the hexadecimal string
    for (let i = 0; i < hexString.length; i += 2) {
        const byte = parseInt(hexString.substr(i, 2), 16);
        uint8Array[i / 2] = byte;
    }
    return uint8Array;
}
exports.hexStringToUint8Array = hexStringToUint8Array;
function uint8ArrayToHexString(uint8Array) {
    const hexArray = [];
    for (let i = 0; i < (uint8Array === null || uint8Array === void 0 ? void 0 : uint8Array.length); i++) {
        const hexValue = uint8Array[i].toString(16).padStart(2, "0");
        hexArray.push(hexValue);
    }
    return hexArray.join("");
}
exports.uint8ArrayToHexString = uint8ArrayToHexString;
function splitArrayIntoChunks(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < (arr === null || arr === void 0 ? void 0 : arr.length); i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}
exports.splitArrayIntoChunks = splitArrayIntoChunks;
// Little-Endian Byte Order (LSB first)
function uint8ArrayToNumberLE(uint8Array) {
    let result = 0;
    for (let i = 0; i < (uint8Array === null || uint8Array === void 0 ? void 0 : uint8Array.length); i++) {
        result += uint8Array[i] << (8 * i);
    }
    return result;
}
exports.uint8ArrayToNumberLE = uint8ArrayToNumberLE;
// Big-Endian Byte Order (MSB first)
function uint8ArrayToNumberBE(uint8Array) {
    let result = 0;
    for (let i = uint8Array.length - 1; i >= 0; i--) {
        result += uint8Array[i] << (8 * (uint8Array.length - 1 - i));
    }
    return result;
}
exports.uint8ArrayToNumberBE = uint8ArrayToNumberBE;
function trimTrailingZeros(uint8Array) {
    let endIndex = uint8Array.length;
    // Find the index of the first non-zero byte from the end
    for (let i = uint8Array.length - 1; i >= 0; i--) {
        if (uint8Array[i] !== 0) {
            endIndex = i + 1;
            break;
        }
    }
    // Create a new Uint8Array with the trimmed data
    return uint8Array.slice(0, endIndex);
}
exports.trimTrailingZeros = trimTrailingZeros;
function keyExists(obj, value) {
    for (const key in obj) {
        if (key === value) {
            return true;
        }
    }
    return false;
}
exports.keyExists = keyExists;
