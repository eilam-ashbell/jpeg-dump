import ImageData from "./image-data";
import {extractApp1, extractIFD} from "./metadata-extractors";
import { extractMarkers } from "./markers-extractor";
import { readImageAsHex } from "./utils";

const imagePath = "./img/20230923_183639.jpg";
// const imagePath = "./img/D20_img_instagram_0118.jpg";

readImageAsHex(imagePath)
    .then((hexData) => {
        // extractMarkers(hexData).then((markers) => markers ? extractApp1(markers['APP1'].rawData as Uint8Array) : null
        // );
        extractMarkers(hexData).then((markers) => markers ? extractIFD(markers['APP1'].rawData as Uint8Array, 10) : null
        );
    })
    .catch((error) => {
        console.error(error);
    });