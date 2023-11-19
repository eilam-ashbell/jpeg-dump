import DQTModel from "./models/DQT.model";
export default class Quantization {
    constructor(fileStructure) {
        this.fileStructure = fileStructure;
    }
    parse() {
        // find all DQT markers in image
        const DQTMarkers = this.fileStructure.filter((segment) => segment.name.startsWith("DQT"));
        let parsedDQTs = [];
        // for each DQT marker, extract its data and place in global object
        for (let segment of DQTMarkers) {
            // for each found DQT segment, create new DQT model
            parsedDQTs.push(new DQTModel(segment.rawData, segment.globalOffset, segment.index));
        }
        return parsedDQTs;
    }
    // return the number of QT tables in the image
    get count() {
        return this.parse()
            .map((DQT) => DQT.QTs)
            .flat().length;
    }
}
