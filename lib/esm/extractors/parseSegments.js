import { checkIfKnownMarker } from "../utils/utils";
import markersDict from "../dictionaries/markersDict";
function parseSegments(rawFileData) {
    try {
        const fileStructure = [];
        let currentIndex = 0;
        while (currentIndex < rawFileData.length - 1) {
            if (rawFileData[currentIndex] === 0xff) {
                // Found a potential marker
                const markerStart = currentIndex;
                currentIndex++;
                // Check for the second byte of the marker
                if (rawFileData[currentIndex] !== 0x00) {
                    // fetch marker
                    const markerKey = `ff${rawFileData[currentIndex].toString(16)}`;
                    // check if its a known one from the markers dictionary
                    const isKnownMarker = checkIfKnownMarker(markerKey);
                    // if not a known marker - skip it.
                    if (!isKnownMarker)
                        continue;
                    // if marker have no length
                    if (Object.entries(markersDict)
                        .filter(([key, value]) => !value.length)
                        .map((k) => k[0])
                        .includes(markerKey)) {
                        fileStructure.push({
                            segmentName: markersDict[markerKey].name,
                            marker: markerKey,
                            globalOffset: markerStart,
                            length: 0,
                            rawData: rawFileData.slice(currentIndex - 1, currentIndex + 1),
                        });
                    }
                    else {
                        // extract segment length
                        const startIndex = currentIndex - 1;
                        const lengthByte1 = rawFileData[currentIndex + 1];
                        const lengthByte2 = rawFileData[currentIndex + 2];
                        const length = (lengthByte1 << 8) | lengthByte2;
                        const nested = parseSegments(rawFileData.slice(currentIndex + 1, startIndex + length + 2));
                        fileStructure.push({
                            segmentName: markersDict[markerKey].name,
                            marker: markerKey,
                            globalOffset: markerStart,
                            length: length,
                            // save as Unit8Array
                            rawData: rawFileData.slice(currentIndex - 1, startIndex + length + 2),
                            nested: nested,
                        });
                        currentIndex = startIndex + length;
                    }
                }
            }
            currentIndex++;
        }
        // search for trailer data
        const lastMarker = fileStructure[fileStructure.length - 1];
        if ((lastMarker === null || lastMarker === void 0 ? void 0 : lastMarker.segmentName) === "EOI" &&
            lastMarker.globalOffset + 2 !== rawFileData.length) {
            const trailerData = rawFileData.slice(lastMarker.globalOffset + 2);
            fileStructure.push({
                segmentName: "TRLR",
                marker: null,
                globalOffset: lastMarker.globalOffset + 2,
                length: trailerData.length,
                rawData: trailerData,
            });
        }
        return fileStructure.length === 0 ? undefined : fileStructure;
    }
    catch (error) {
        throw new Error(`Error reading the image file: ${error}`);
    }
}
export { parseSegments };
