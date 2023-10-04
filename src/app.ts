import ImageData from "./image-data";
import { extractApp1 } from "./extractors/metadata-extractors";
import { extractMarkers } from "./extractors/markers-extractor";
import { readImageAsHex } from "./utils";
import { extractSof } from "./extractors/sof-extractor";
import { extractDqtSegment } from "./extractors/dqt-extractor";

const imagePath = "./img/20230923_183639.jpg";
// const imagePath = "./img/D20_img_instagram_0118.jpg";

readImageAsHex(imagePath)
    .then((hexData) => {
        // extractMarkers(hexData).then((markers) => markers ? extractApp1(markers['APP1'].rawData as Uint8Array) : null
        // );
        extractMarkers(hexData).then((markers) => {
            console.log(markers);
            if (markers) {
                const exifTags = extractApp1(
                    markers["APP1"].rawData as Uint8Array
                );
                // console.log(exifTags);
                const sofData = extractSof(
                    markers["SOF0"].rawData as Uint8Array
                ).then((sof) => {
                    // console.log(sof);
                });

                const dqt = extractDqtSegment(
                    markers["DQT"].rawData as Uint8Array
                );
                console.log(dqt);
            }
        });
    })
    .catch((error) => {
        console.error(error);
    });
