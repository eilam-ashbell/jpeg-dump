import * as fs from "fs";

async function readImageAsHex(filePath: string): Promise<Uint8Array> {
    try {
        // Read the image file asynchronously
        const imageBuffer = await fs.promises.readFile(filePath);

        // Convert the image buffer to a Uint8Array
        const byteArray = new Uint8Array(imageBuffer);

        return byteArray;
    } catch (err) {
        throw new Error(`Error reading the image file: ${err}`);
    }
}

async function readJsonAsObj(filePath: string): Promise<Object> {
    try {
        // Read the JSON file
        const jsonContent = await fs.promises.readFile(filePath);
        // Convert JSON to object
        const jsonAsObj = JSON.parse(jsonContent.toString());
        return jsonAsObj;
    } catch (err) {
        throw new Error(`Error reading the JSON file: ${err}`);
    }
}

function createUniqueObjKey(object: Object, key: string) {
    let newKey = key;
    let counter = 1;

    // Check if the key already exists in the object
    while (object.hasOwnProperty(newKey)) {
        newKey = `${key}${counter}`; // Append a number to the key
        counter++;
    }
    return newKey;
}

function formatHexZeros(hexValue: string): string {
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
    } else {
        hexValue = hexValue.substring(leadingZerosCount - 1);
    }

    return hexValue;
}

function hexStringToUint8Array(hexString: string): Uint8Array {
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

function uint8ArrayToHexString(uint8Array: Uint8Array): string {
    const hexArray: string[] = [];
    for (let i = 0; i < uint8Array?.length; i++) {
        const hexValue: string = uint8Array[i].toString(16).padStart(2, "0");
        hexArray.push(hexValue);        
    }
    return hexArray.join("");
}

function splitArrayIntoChunks(arr: any[] | Uint8Array, chunkSize: number): any[] {
    const result: any[] = [];
    for (let i = 0; i < arr?.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}

// Little-Endian Byte Order (LSB first)
function uint8ArrayToNumberLE(uint8Array: Uint8Array): number {
    let result = 0;
    for (let i = 0; i < uint8Array?.length; i++) {
        result += uint8Array[i] << (8 * i);
    }
    return result;
}

// Big-Endian Byte Order (MSB first)
function uint8ArrayToNumberBE(uint8Array: Uint8Array): number {
    let result = 0;
    for (let i = uint8Array.length - 1; i >= 0; i--) {
        result += uint8Array[i] << (8 * (uint8Array.length - 1 - i));
    }
    return result;
}

function trimTrailingZeros(uint8Array: Uint8Array): Uint8Array {
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

function keyExists(obj: { [key: string]: any }, value: any): boolean {
    for (const key in obj) {                
      if (key === value) {
        return true;
      }
    }
    return false;
  }

export {
    readImageAsHex,
    readJsonAsObj,
    createUniqueObjKey,
    formatHexZeros,
    hexStringToUint8Array,
    uint8ArrayToHexString,
    splitArrayIntoChunks,
    uint8ArrayToNumberLE,
    uint8ArrayToNumberBE,
    trimTrailingZeros,
    keyExists
};
