"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const markersDict = {
    "ffc0": {
        length: true,
        name: "SOF0",
        details: "Baseline DCT",
    },
    "ffc1": {
        length: true,
        name: "SOF1",
        details: "Extended sequential DCT",
    },
    "ffc2": {
        length: true,
        name: "SOF2",
        details: "Progressive DCT",
    },
    "ffc3": {
        length: true,
        name: "SOF3",
        details: "Lossless sequential",
    },
    "ffc4": {
        length: true,
        name: "DHT",
        details: "Define Huffman table(s)",
    },
    "ffc5": {
        length: true,
        name: "SOF5",
        details: "Differential sequential DCT",
    },
    "ffc6": {
        length: true,
        name: "SOF6",
        details: "Differential progressive DCT",
    },
    "ffc7": {
        length: true,
        name: "SOF7",
        details: "Differential lossless sequential",
    },
    "ffc8": {
        length: true,
        name: "JPG",
        details: "Reserved for JPEG extensions",
    },
    "ffc9": {
        length: true,
        name: "SOF9",
        details: "Extended sequential DCT",
    },
    "ffca": {
        length: true,
        name: "SOF10",
        details: "Progressive DCT",
    },
    "ffcb": {
        length: true,
        name: "SOF11",
        details: "Lossless sequential",
    },
    "ffcc": {
        length: true,
        name: "DAC",
        details: "Define arithmetic coding conditioning(s)",
    },
    "ffcd": {
        length: true,
        name: "SOF13",
        details: "Differential sequential DCT",
    },
    "ffce": {
        length: true,
        name: "SOF14",
        details: "Differential progressive DCT",
    },
    "ffcf": {
        length: true,
        name: "SOF15",
        details: "Differential lossless sequential",
    },
    "ffd0": {
        length: false,
        name: "RST0",
        details: "Restart with modulo 8 count 0",
    },
    "ffd1": {
        length: false,
        name: "RST1",
        details: "Restart with modulo 8 count 1",
    },
    "ffd2": {
        length: false,
        name: "RST2",
        details: "Restart with modulo 8 count 2",
    },
    "ffd3": {
        length: false,
        name: "RST3",
        details: "Restart with modulo 8 count 3",
    },
    "ffd4": {
        length: false,
        name: "RST4",
        details: "Restart with modulo 8 count 4",
    },
    "ffd5": {
        length: false,
        name: "RST5",
        details: "Restart with modulo 8 count 5",
    },
    "ffd6": {
        length: false,
        name: "RST6",
        details: "Restart with modulo 8 count 6",
    },
    "ffd7": {
        length: false,
        name: "RST7",
        details: "Restart with modulo 8 count 7",
    },
    "ffd8": {
        length: false,
        name: "SOI",
        details: "Start of image",
    },
    "ffd9": {
        length: false,
        name: "EOI",
        details: "End of image",
    },
    "ffda": {
        length: false,
        name: "SOS",
        details: "Start of scan",
    },
    "ffdb": {
        length: true,
        name: "DQT",
        details: "Define quantization table",
    },
    "ffdc": {
        length: true,
        name: "DNL",
        details: "Define number of lines",
    },
    "ffdd": {
        length: true,
        name: "DRI",
        details: "Define restart interval",
    },
    "ffde": {
        length: true,
        name: "DHP",
        details: "Define hierarchical progression",
    },
    "ffdf": {
        length: true,
        name: "EXP",
        details: "Expand reference component",
    },
    "ffe0": {
        length: true,
        name: "APP0",
        details: "",
    },
    "ffe1": {
        length: true,
        name: "APP1",
        details: "",
    },
    "ffe2": {
        length: true,
        name: "APP2",
        details: "",
    },
    "ffe3": {
        length: true,
        name: "APP3",
        details: "",
    },
    "ffe4": {
        length: true,
        name: "APP4",
        details: "",
    },
    "ffe5": {
        length: true,
        name: "APP5",
        details: "",
    },
    "ffe6": {
        length: true,
        name: "APP6",
        details: "",
    },
    "ffe7": {
        length: true,
        name: "APP7",
        details: "",
    },
    "ffe8": {
        length: true,
        name: "APP8",
        details: "",
    },
    "ffe9": {
        length: true,
        name: "APP9",
        details: "",
    },
    "ffea": {
        length: true,
        name: "APP10",
        details: "",
    },
    "ffeb": {
        length: true,
        name: "APP11",
        details: "",
    },
    "ffec": {
        length: true,
        name: "APP12",
        details: "",
    },
    "ffed": {
        length: true,
        name: "APP13",
        details: "",
    },
    "ffee": {
        length: true,
        name: "APP14",
        details: "",
    },
    "ffef": {
        length: true,
        name: "APP15",
        details: "",
    },
    "fff0": {
        length: true,
        name: "…",
        details: "",
    },
    "fff6": {
        length: true,
        name: "JPG6",
        details: "",
    },
    "fff7": {
        length: true,
        name: "JPG7",
        details: "",
    },
    "fff8": {
        length: true,
        name: "JPG8",
        details: "",
    },
    "fff9": {
        length: true,
        name: "JPG9",
        details: "",
    },
    "fffa": {
        length: true,
        name: "JPG10",
        details: "",
    },
    "fffb": {
        length: true,
        name: "JPG11",
        details: "",
    },
    "fffc": {
        length: true,
        name: "JPG12",
        details: "",
    },
    "fffd": {
        length: true,
        name: "JPG13",
        details: "",
    },
    "fffe": {
        length: true,
        name: "COM",
        details: "Comment",
    },
};
exports.default = markersDict;
