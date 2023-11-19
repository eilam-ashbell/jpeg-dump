import SegmentModel from "../models/Segment.model";
import { checkIfKnownMarker } from "../utils/utils";
import markersDict from "../dictionaries/markersDict";

function splitToSegments(rawFileData: Uint8Array): SegmentModel[] {
    try {
        const fileStructure: SegmentModel[] = []; // results container
        let currentOffset = 0; // init offset pointer
        while (currentOffset < rawFileData.length - 1) {
            // run on every byte in the file
            if (rawFileData[currentOffset] === 0xff) {
                // Found a potential marker
                const markerStart = currentOffset; // remember starting offset
                currentOffset++;
                // Check for the second byte of the marker
                if (rawFileData[currentOffset] !== 0x00) {
                    // fetch marker hex as string
                    const markerKey = `ff${rawFileData[currentOffset]
                        .toString(16)
                        .padStart(2, "0")}`;
                    // check if its a known one from the markers dictionary
                    // if not a known marker - skip it.
                    if (!checkIfKnownMarker(markerKey)) continue;
                    // if marker have no length
                    if (
                        Object.values(markersDict)
                            .filter((value) => !value.length) // returns list of no-length segment
                            .map((k) => k.marker) // returns list of markers hex values
                            .includes(markerKey) // check if current marker in the list
                    ) {
                        // create new segment model
                        fileStructure.push(
                            new SegmentModel(
                                rawFileData.slice(
                                    markerStart,
                                    currentOffset + 1
                                ),
                                markerStart,
                                fileStructure.length
                            )
                        );
                    } else {
                        // extract segment length
                        const length =
                            (rawFileData[currentOffset + 1] << 8) |
                            rawFileData[currentOffset + 2];
                        // create new segment model
                        fileStructure.push(
                            new SegmentModel(
                                rawFileData.slice(
                                    markerStart,
                                    markerStart + length + 2
                                ),
                                markerStart,
                                fileStructure.length
                            )
                        );
                        currentOffset = markerStart + length;
                    }
                }
            }
            currentOffset++;
        }
        // search for trailer data
        const lastMarker = fileStructure[fileStructure.length - 1];
        if (
            // if there is more data after EOI
            lastMarker?.name === "EOI" &&
            lastMarker.globalOffset + 2 !== rawFileData.length
        ) {
            // separate trailer data from file data
            const trailerData = rawFileData.slice(lastMarker.globalOffset + 2);
            // create new segment model
            fileStructure.push(
                new SegmentModel(trailerData, lastMarker.globalOffset + 2, fileStructure.length)
            );
        }
        return fileStructure;
    } catch (error) {
        throw new Error(`Error reading the image file: ${error}`);
    }
}

export { splitToSegments };
