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
    console.log(image.compression.quantization.parse());
};
const imageMetadataEXIF = () => {
    console.log(image.metadata.EXIF());
};
const imageMetadataJFIF = () => {
    console.log(image.metadata.JFIF());
};
const imageMetadataThumbnailCompressionFrameParse = () => {
    console.log(image.metadata.thumbnail.compression.frame.parse);
};
const imageMetadataThumbnailCompressionFrameType = () => {
    console.log(image.metadata.thumbnail.compression.frame.type);
};
const imageMetadataThumbnailCompressionQTParse = () => {
    console.log(image.metadata.thumbnail.compression.quantization.parse());
};
const imageMetadataThumbnailMetadataEXIF = () => {
    console.log(image.metadata.thumbnail.metadata.EXIF());
};
const imageMetadataThumbnailMetadataJFIF = () => {
    console.log(image.metadata.thumbnail.metadata.JFIF());
};
const imageMetadataThumbnailSave = () => {
    console.log(image.metadata.thumbnail.save("./thumbnail.jpeg"));
};
const imageMetadataThumbnailStructureDump = () => {
    console.log(image.metadata.thumbnail.structure.dump);
};
const imageMetadataThumbnailStructureMarkersAll = () => {
    console.log(image.metadata.thumbnail.structure.markers.listAll);
};
const imageMetadataThumbnailStructureMarkersMain = () => {
    console.log(image.metadata.thumbnail.structure.markers.listMain);
};
const imageMetadataThumbnailStructureMarkersMetadata = () => {
    console.log(image.metadata.thumbnail.structure.markers.listMetadata);
};
const imageMetadataThumbnailStructureMarkersThumbnail = () => {
    console.log(image.metadata.thumbnail.structure.markers.listThumbnail);
};
const imageMetadataThumbnailStructureMarkersTree = () => {
    console.log(image.metadata.thumbnail.structure.markers.tree);
};
const imageStructureDump = () => {
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
// const imagePath = "./img/20230923_183639.jpg";
// const imagePath = "./img/D20_img_instagram_0118.jpg";
const imagePath = "./img/IMG_3391.JPG";
// const imagePath = "./img/SamsungDigimaxS800.jpg";
const start = new Date().getTime();
const image = new Jpeg(imagePath);
// imageDump()
// imageCompressionFrameParse()
// imageCompressionFrameType()
// imageCompressionQTParse()
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
imageMetadataTags('rawValue', '927c');
// imageMetadataIFDsList();
// imageMetadataIFDTags('IFD')
const end = new Date().getTime();
console.log(`process duration: ${end - start}ms`);
