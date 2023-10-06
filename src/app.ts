import { extractExifTags } from "./extractors/metadata-extractors";
import { extractMarkers } from "./extractors/markers-extractor";
import { readImageAsHex } from "./utils/utils";
import { extractSof } from "./extractors/sof-extractor";
import { extractDqtSegment } from "./extractors/dqt-extractor";

// const imagePath = "./img/20230923_183639.jpg";
const imagePath = "./img/D20_img_instagram_0118.jpg";

readImageAsHex(imagePath)
    .then((hexData) => {
        // extractMarkers(hexData).then((markers) => markers ? extractApp1(markers['APP1'].rawData as Uint8Array) : null
        // );
        extractMarkers(hexData).then((markers) => {
            // console.log(markers);
            if (markers) {
                if (markers["APP1"]) {
                    // console.log("in");

                    const exifTags = extractExifTags(
                        markers["APP1"]?.rawData as Uint8Array
                    );
                    // console.log(exifTags);
                }

                // Regular expression to match keys of SOF
                const regexPattern = /\bSOF\d+/g;

                // Use Object.keys() to get an array of keys, and then filter based on the regex
                const matchingKeys = Object.keys(markers).filter((key) =>
                    regexPattern.test(key)
                );
                for (let sof of matchingKeys) {
                    const sofData = extractSof(
                        markers[sof].rawData as Uint8Array
                    ).then((sof) => {
                        console.log(sof);
                    });
                }

                const dqt = extractDqtSegment(
                    markers["DQT"].rawData as Uint8Array
                );
                // console.log(dqt);
            }
        });
    })
    .catch((error) => {
        console.error(error);
    });
