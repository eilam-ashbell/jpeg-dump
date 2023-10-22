"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const markersDict = {
    "0xffc0": {
        length: true,
        name: "SOF0",
        details: "Baseline DCT",
    },
    "0xffc1": {
        length: true,
        name: "SOF1",
        details: "Extended sequential DCT",
    },
    "0xffc2": {
        length: true,
        name: "SOF2",
        details: "Progressive DCT",
    },
    "0xffc3": {
        length: true,
        name: "SOF3",
        details: "Lossless sequential",
    },
    "0xffc4": {
        length: true,
        name: "DHT",
        details: "Define Huffman table(s)",
    },
    "0xffc5": {
        length: true,
        name: "SOF5",
        details: "Differential sequential DCT",
    },
    "0xffc6": {
        length: true,
        name: "SOF6",
        details: "Differential progressive DCT",
    },
    "0xffc7": {
        length: true,
        name: "SOF7",
        details: "Differential lossless sequential",
    },
    "0xffc8": {
        length: true,
        name: "JPG",
        details: "Reserved for JPEG extensions",
    },
    "0xffc9": {
        length: true,
        name: "SOF9",
        details: "Extended sequential DCT",
    },
    "0xffca": {
        length: true,
        name: "SOF10",
        details: "Progressive DCT",
    },
    "0xffcb": {
        length: true,
        name: "SOF11",
        details: "Lossless sequential",
    },
    "0xffcc": {
        length: true,
        name: "DAC",
        details: "Define arithmetic coding conditioning(s)",
    },
    "0xffcd": {
        length: true,
        name: "SOF13",
        details: "Differential sequential DCT",
    },
    "0xffce": {
        length: true,
        name: "SOF14",
        details: "Differential progressive DCT",
    },
    "0xffcf": {
        length: true,
        name: "SOF15",
        details: "Differential lossless sequential",
    },
    "0xffd0": {
        length: false,
        name: "RST0",
        details: "Restart with modulo 8 count 0",
    },
    "0xffd1": {
        length: false,
        name: "RST1",
        details: "Restart with modulo 8 count 1",
    },
    "0xffd2": {
        length: false,
        name: "RST2",
        details: "Restart with modulo 8 count 2",
    },
    "0xffd3": {
        length: false,
        name: "RST3",
        details: "Restart with modulo 8 count 3",
    },
    "0xffd4": {
        length: false,
        name: "RST4",
        details: "Restart with modulo 8 count 4",
    },
    "0xffd5": {
        length: false,
        name: "RST5",
        details: "Restart with modulo 8 count 5",
    },
    "0xffd6": {
        length: false,
        name: "RST6",
        details: "Restart with modulo 8 count 6",
    },
    "0xffd7": {
        length: false,
        name: "RST7",
        details: "Restart with modulo 8 count 7",
    },
    "0xffd8": {
        length: false,
        name: "SOI",
        details: "Start of image",
    },
    "0xffd9": {
        length: false,
        name: "EOI",
        details: "End of image",
    },
    "0xffda": {
        length: false,
        name: "SOS",
        details: "Start of scan",
    },
    "0xffdb": {
        length: true,
        name: "DQT",
        details: "Define quantization table",
    },
    "0xffdc": {
        length: true,
        name: "DNL",
        details: "Define number of lines",
    },
    "0xffdd": {
        length: true,
        name: "DRI",
        details: "Define restart interval",
    },
    "0xffde": {
        length: true,
        name: "DHP",
        details: "Define hierarchical progression",
    },
    "0xffdf": {
        length: true,
        name: "EXP",
        details: "Expand reference component",
    },
    "0xffe0": {
        length: true,
        name: "APP0",
        details: "",
    },
    "0xffe1": {
        length: true,
        name: "APP1",
        details: "",
    },
    "0xffe2": {
        length: true,
        name: "APP2",
        details: "",
    },
    "0xffe3": {
        length: true,
        name: "APP3",
        details: "",
    },
    "0xffe4": {
        length: true,
        name: "APP4",
        details: "",
    },
    "0xffe5": {
        length: true,
        name: "APP5",
        details: "",
    },
    "0xffe6": {
        length: true,
        name: "APP6",
        details: "",
    },
    "0xffe7": {
        length: true,
        name: "APP7",
        details: "",
    },
    "0xffe8": {
        length: true,
        name: "APP8",
        details: "",
    },
    "0xffe9": {
        length: true,
        name: "APP9",
        details: "",
    },
    "0xffea": {
        length: true,
        name: "APP10",
        details: "",
    },
    "0xffeb": {
        length: true,
        name: "APP11",
        details: "",
    },
    "0xffec": {
        length: true,
        name: "APP12",
        details: "",
    },
    "0xffed": {
        length: true,
        name: "APP13",
        details: "",
    },
    "0xffee": {
        length: true,
        name: "APP14",
        details: "",
    },
    "0xffef": {
        length: true,
        name: "APP15",
        details: "",
    },
    "0xfff0": {
        length: true,
        name: "…",
        details: "",
    },
    "0xfff6": {
        length: true,
        name: "JPG6",
        details: "",
    },
    "0xfff7": {
        length: true,
        name: "JPG7",
        details: "",
    },
    "0xfff8": {
        length: true,
        name: "JPG8",
        details: "",
    },
    "0xfff9": {
        length: true,
        name: "JPG9",
        details: "",
    },
    "0xfffa": {
        length: true,
        name: "JPG10",
        details: "",
    },
    "0xfffb": {
        length: true,
        name: "JPG11",
        details: "",
    },
    "0xfffc": {
        length: true,
        name: "JPG12",
        details: "",
    },
    "0xfffd": {
        length: true,
        name: "JPG13",
        details: "",
    },
    "0xfffe": {
        length: true,
        name: "COM",
        details: "Comment",
    },
};
exports.default = markersDict;
