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
        newKey = `${key}_${counter}`; // Append a number to the key
        counter++;
    }
    return newKey;
}

export { readImageAsHex, readJsonAsObj, createUniqueObjKey };
