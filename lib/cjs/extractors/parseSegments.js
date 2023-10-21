"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSegments = void 0;
const utils_1 = require("../utils/utils");
const markersDict_1 = __importDefault(require("../dictionaries/markersDict"));
function parseSegments(hexValues) {
    var _a;
    try {
        // Read the marker map JSON file
        const markerMap = markersDict_1.default;
        const markers = {};
        let currentIndex = 0;
        while (currentIndex < hexValues.length - 1) {
            if (hexValues[currentIndex] === 0xff) {
                // Found a potential marker
                const markerStart = currentIndex;
                currentIndex++;
                // Check for the second byte of the marker
                if (hexValues[currentIndex] !== 0x00) {
                    // fetch marker
                    const markerKey = `0xff${hexValues[currentIndex].toString(16)}`;
                    // check if its a known one from the markers dictionary
                    const isKnownMarker = (0, utils_1.keyExists)(markerMap, markerKey);
                    // if not a known marker - skip it.
                    if (!isKnownMarker)
                        return;
                    // if marker have no length
                    if (Object.entries(markerMap)
                        .filter(([key, value]) => !value.length)
                        .map((k) => k[0])
                        .includes(markerKey)) {
                        let markerUniqKey = (0, utils_1.createUniqueObjKey)(markers, (_a = markerMap[markerKey]) === null || _a === void 0 ? void 0 : _a.name);
                        markers[markerUniqKey] = {
                            marker: markerKey,
                            offset: markerStart,
                            length: 0,
                            rawData: hexValues.slice(currentIndex - 1, currentIndex + 1),
                        };
                    }
                    else {
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
                        const nested = parseSegments(hexValues.slice(currentIndex + 1, startIndex + parseInt(offsetHex, 16) + 2));
                        // add marker to object
                        let markerUniqKey = (0, utils_1.createUniqueObjKey)(markers, markerMap[markerKey].name);
                        markers[markerUniqKey] = {
                            marker: markerKey,
                            offset: markerStart,
                            length: parseInt(offsetHex, 16),
                            // save as Unit8Array
                            rawData: hexValues.slice(currentIndex - 1, startIndex + parseInt(offsetHex, 16) + 2),
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
        if (lastMarker === "EOI" &&
            markers[lastMarker].offset + 2 !== hexValues.length) {
            const trailerData = hexValues.slice(markers[lastMarker].offset + 2);
            markers["TRLR"] = {
                marker: null,
                offset: markers[lastMarker].offset + 2,
                length: trailerData.length,
                rawData: trailerData,
            };
        }
        return Object.keys(markers).length === 0 ? undefined : markers;
    }
    catch (error) {
        throw new Error(`Error reading the image file: ${error}`);
    }
}
exports.parseSegments = parseSegments;
