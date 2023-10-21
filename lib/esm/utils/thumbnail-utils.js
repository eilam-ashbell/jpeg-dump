import * as fs from "fs";
function saveUint8ArrayAsFile(uint8Array, filePath) {
    try {
        // Create a writable stream to the specified file
        const writeStream = fs.createWriteStream(filePath);
        // Write the Uint8Array data to the file
        writeStream.write(uint8Array);
        // Close the stream to finish writing
        writeStream.end();
        // console.log(`File "${filePath}" saved successfully.`);
    }
    catch (error) {
        console.error(`Error saving file "${filePath}":`, error);
    }
}
export { saveUint8ArrayAsFile };
