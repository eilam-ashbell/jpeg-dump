import SegmentModel from "../models/Segment.model";
import { createUniqueObjKey, keyExists } from "../utils/utils";
import markersDict from "../dictionaries/markersDict";

function parseSegments(hexValues: Uint8Array): SegmentModel | undefined {
    try {
        // Read the marker map JSON file
        const markerMap = markersDict;
        const markers: SegmentModel = {};

        let currentIndex = 0;

        while (currentIndex < hexValues.length - 1) {
            if (hexValues[currentIndex] === 0xff) {
                // Found a potential marker
                const markerStart = currentIndex;
                currentIndex++;

                // Check for the second byte of the marker
                if (hexValues[currentIndex] !== 0x00) {
                    // fetch marker
                    const markerKey = `0xff${hexValues[currentIndex].toString(
                        16
                    )}`;
                    // check if its a known one from the markers dictionary
                    const isKnownMarker = keyExists(markerMap, markerKey);   

                    // if not a known marker - skip it.
                    if (!isKnownMarker) return;

                    // if marker have no length
                    if (
                        Object.entries(markerMap)
                            .filter(([key, value]) => !value.length)
                            .map((k) => k[0])
                            .includes(markerKey)
                    ) {
                        let markerUniqKey = createUniqueObjKey(
                            markers,
                            markerMap[markerKey]?.name
                        );
                        markers[markerUniqKey] = {
                            marker: markerKey,
                            offset: markerStart,
                            length: 0,
                            rawData: hexValues.slice(
                                currentIndex - 1,
                                currentIndex + 1
                            ),
                        };
                    } else {
                        // extract segment length
                        const startIndex = currentIndex - 1;
                        const lengthByte1 = hexValues[currentIndex + 1]
                            .toString(16)
                            .padStart(2, "0");
                        const lengthByte2 = hexValues[currentIndex + 2]
                            .toString(16)
                            .padStart(2, "0");
                        const offsetHex = `${lengthByte1}${lengthByte2}`;

                        // extract nested segments
                        const nested = parseSegments(
                            hexValues.slice(
                                currentIndex + 1,
                                startIndex + parseInt(offsetHex, 16) + 2
                            )
                        );
                        // add marker to object
                        let markerUniqKey = createUniqueObjKey(
                            markers,
                            markerMap[markerKey].name
                        );
                        markers[markerUniqKey] = {
                            marker: markerKey,
                            offset: markerStart,
                            length: parseInt(offsetHex, 16),
                            // save as Unit8Array
                            rawData: hexValues.slice(
                                currentIndex - 1,
                                startIndex + parseInt(offsetHex, 16) + 2
                            ),
                            nested: nested,
                            // save as hex string
                            // rawData: Array.from(
                            //     hexValues.slice(
                            //         currentIndex - 1,
                            //         startIndex + parseInt(offsetHex, 16) + 2
                            //     )
                            // )
                            //     .map((byte) =>
                            //         byte.toString(16).padStart(2, "0")
                            //     )
                            //     .join(""),
                        };
                        currentIndex = startIndex + parseInt(offsetHex, 16);
                    }
                }
            }
            currentIndex++;
        }
        // search for trailer data
        const lastMarker = Object.keys(markers).pop();
        if (
            lastMarker === "EOI" &&
            markers[lastMarker].offset + 2 !== hexValues.length
        ) {
            const trailerData = hexValues.slice(markers[lastMarker].offset + 2);
            markers["TRLR"] = {
                marker: null,
                offset: markers[lastMarker].offset + 2,
                length: trailerData.length,
                rawData: trailerData,
            };
        }
        return Object.keys(markers).length === 0 ? undefined : markers;
    } catch (error) {
        throw new Error(`Error reading the image file: ${error}`);
    }
}

export { parseSegments };
