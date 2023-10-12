import DQTModel, { IDQT } from "../models/dqt.model";

function extractDqtSegment(dqtSegment: Uint8Array): DQTModel {
    // Check if the DQT marker is correct (0xFFDB)
    if (dqtSegment[0] !== 0xff || dqtSegment[1] !== 0xdb) {
        throw new Error("Invalid DQT marker");
    }

    const dataLength = (dqtSegment[2] << 8) | dqtSegment[3];
    const segmentData = dqtSegment.subarray(4, dataLength + 2);

    const quantizationTables: IDQT = {};

    let offset = 0;

    while (offset < segmentData.length) {
        const qtInfoByte = segmentData[offset];
        const qtPrecision = qtInfoByte >> 4; // First 4 bits represent precision (0 for 8-bit, 1 for 16-bit)
        const qtId = qtInfoByte & 0x0f; // Last 4 bits represent quantization table identifier

        offset++;

        const qtData = new Uint16Array(64); // Each quantization table has 64 entries

        for (let i = 0; i < 64; i++) {
            if (qtPrecision === 0) {
                qtData[i] = segmentData[offset];
            } else {
                qtData[i] =
                    (segmentData[offset] << 8) | segmentData[offset + 1];
            }

            offset += qtPrecision === 0 ? 1 : 2;
        }

        quantizationTables[`QT${qtId}`] = {
            precision: qtPrecision === 0 ? 8 : 16,
            tableData: qtData,
        };
    }

    return new DQTModel("0xffdb", dataLength, quantizationTables);
}

export { extractDqtSegment };
