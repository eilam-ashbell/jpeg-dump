import MarkersModel from "../models/markers.model";
import MarkersDictModel from "../models/markers-dict.model";
import { createUniqueObjKey, readJsonAsObj } from "../utils";

async function extractMarkers(
    hexValues: Uint8Array
): Promise<MarkersModel | undefined> {
    try {
        // Read the marker map JSON file
        const markerMap = (await readJsonAsObj(
            "./src/dictionaries/markers.json"
        )) as MarkersDictModel;
        const markers: MarkersModel = {};

        let currentIndex = 0;

        while (currentIndex < hexValues.length - 1) {
            if (hexValues[currentIndex] === 0xff) {
                // Found a potential marker
                const markerStart = currentIndex;
                currentIndex++;

                // Check for the second byte of the marker
                if (hexValues[currentIndex] !== 0x00) {
                    // Valid marker found
                    const markerKey = `0xff${hexValues[currentIndex].toString(
                        16
                    )}`;

                    // if marker have no length
                    if (
                        Object.entries(markerMap)
                            .filter(([key, value]) => !value.length)
                            .map((k) => k[0])
                            .includes(markerKey)
                    ) {
                        let markerUniqKey = createUniqueObjKey(
                            markers,
                            markerMap[markerKey].name
                        );
                        markers[markerUniqKey] = {
                            marker: markerKey,
                            offset: `0x${markerStart.toString(16)}`,
                            length: 0,
                            rawData: null,
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
                        const nestedSegments = await extractMarkers(
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
                        // console.log(markerUniqKey);
                        markers[markerUniqKey] = {
                            marker: markerKey,
                            offset: `0x${markerStart.toString(16)}`,
                            length: parseInt(offsetHex, 16),
                            // save as Unit8Array
                            rawData: hexValues.slice(
                                currentIndex - 1,
                                startIndex + parseInt(offsetHex, 16) + 2
                            ),
                            nestedSegments: nestedSegments,
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
        return Object.keys(markers).length === 0 ? undefined : markers;
    } catch (error) {
        throw new Error(`Error reading the image file: ${error}`);
    }
}

export { extractMarkers };
