import Jpeg from "./jpeg";
const imageDump = () => {
    console.log(image.dump);
};
const imageCompressionFrameParse = () => {
    console.log(image.compression.frame.parse);
};
const imageCompressionFrameType = () => {
    console.log(image.compression.frame.type);
};
const imageCompressionQTParse = () => {
    console.log(image.compression.quantization.parse()[0].quantizationTables[0]);
};
const imageCompressionQTCount = () => {
    console.log(image.compression.quantization.count);
};
const imageMetadataEXIF = () => {
    console.log(image.metadata.EXIF());
};
const imageMetadataJFIF = () => {
    console.log(image.metadata.JFIF());
};
const imageMetadataThumbnailCompressionFrameParse = () => {
    var _a;
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.compression.frame.parse);
};
const imageMetadataThumbnailCompressionFrameType = () => {
    var _a;
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.compression.frame.type);
};
const imageMetadataThumbnailCompressionQTParse = () => {
    var _a;
    // image.metadata.thumbnail?.compression.quantization.parse()
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.compression.quantization.parse());
};
const imageMetadataThumbnailMetadataEXIF = () => {
    var _a;
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.metadata.EXIF());
};
const imageMetadataThumbnailMetadataJFIF = () => {
    var _a;
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.metadata.JFIF());
};
const imageMetadataThumbnailSave = () => {
    var _a;
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.save("./thumbnail.jpeg"));
};
const imageMetadataThumbnailStructureDump = () => {
    var _a;
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.structure.dump);
};
const imageMetadataThumbnailStructureMarkersAll = () => {
    var _a;
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.structure.markers.listAll);
};
const imageMetadataThumbnailStructureMarkersMain = () => {
    var _a;
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.structure.markers.listMain);
};
const imageMetadataThumbnailStructureMarkersMetadata = () => {
    var _a;
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.structure.markers.listMetadata);
};
const imageMetadataThumbnailStructureMarkersThumbnail = () => {
    var _a;
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.structure.markers.listThumbnail);
};
const imageMetadataThumbnailStructureMarkersTree = () => {
    var _a;
    console.log((_a = image.metadata.thumbnail) === null || _a === void 0 ? void 0 : _a.structure.markers.tree);
};
const imageStructureDump = () => {
    // image.structure.dump;
    console.log(image.structure.dump);
};
const imageStructureMarkersAll = () => {
    console.log(image.structure.markers.listAll);
};
const imageStructureMarkersMain = () => {
    console.log(image.structure.markers.listMain);
};
const imageStructureMarkersMetadata = () => {
    console.log(image.structure.markers.listMetadata);
};
const imageStructureMarkersThumbnail = () => {
    console.log(image.structure.markers.listThumbnail);
};
const imageStructureMarkersTree = () => {
    console.log(image.structure.markers.tree);
};
const imageMetadataTags = (value = "parsedValue", tagID) => {
    const markers = image.metadata.EXIF();
    if (!tagID) {
        Object.keys(markers).forEach((ifd) => {
            Object.keys(markers[ifd]).map((key2) => {
                console.log(markers[ifd][key2].tagName +
                    ": " +
                    markers[ifd][key2][value]);
            });
        });
    }
    else {
        Object.keys(markers).forEach((ifd) => {
            // console.log(ifd);
            const ifds = Object.keys(markers[ifd]);
            if (markers[ifd][tagID]) {
                console.log(markers[ifd][tagID].tagName +
                    ": " +
                    markers[ifd][tagID][value]);
            }
        });
    }
};
const imageMetadataIFDsList = () => {
    console.log(image.metadata.IFDs);
};
const imageMetadataIFDTags = (IFD) => {
    console.log(image.metadata.IFDTags(IFD));
};
const imagePath = "./img/reference_image.jpg";
// const imagePath = "./img/IMG_3391.jpg";
// const imagePath = "./img/SamsungDigimaxS800.jpg";
const start = new Date().getTime();
const image = new Jpeg(imagePath);
// imageDump()
// imageCompressionFrameParse()
// imageCompressionFrameType()
// imageCompressionQTParse()
// imageCompressionQTCount()
// imageMetadataEXIF()
// imageMetadataJFIF()
// imageMetadataThumbnailCompressionFrameParse()
// imageMetadataThumbnailCompressionFrameType()
// imageMetadataThumbnailCompressionQTParse()
// imageMetadataThumbnailMetadataEXIF()
// imageMetadataThumbnailMetadataJFIF()
// imageMetadataThumbnailSave()
// imageMetadataThumbnailStructureDump()
// imageMetadataThumbnailStructureMarkersAll()
// imageMetadataThumbnailStructureMarkersMain()
// imageMetadataThumbnailStructureMarkersMetadata()
// imageMetadataThumbnailStructureMarkersThumbnail()
// imageMetadataThumbnailStructureMarkersTree()
// imageStructureDump()
// imageStructureMarkersAll()
// imageStructureMarkersMain()
// imageStructureMarkersMetadata()
// imageStructureMarkersThumbnail()
// imageStructureMarkersTree()
// imageMetadataTags('parsedValue' , '927c')
// imageMetadataIFDsList();
// imageMetadataIFDTags('IFD')
const end = new Date().getTime();
console.log(`process duration: ${end - start}ms`);
