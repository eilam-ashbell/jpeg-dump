const markersDict = {
    "ffc0": {
        length: true,
        name: "SOF0",
        details: "Baseline DCT",
        marker: 'ffc0'
    },
    "ffc1": {
        length: true,
        name: "SOF1",
        details: "Extended sequential DCT",
        marker: 'ffc1'
    },
    "ffc2": {
        length: true,
        name: "SOF2",
        details: "Progressive DCT",
        marker: 'ffc2'
    },
    "ffc3": {
        length: true,
        name: "SOF3",
        details: "Lossless sequential",
        marker: 'ffc3'
    },
    "ffc4": {
        length: true,
        name: "DHT",
        details: "Define Huffman table(s)",
        marker: 'ffc4'
    },
    "ffc5": {
        length: true,
        name: "SOF5",
        details: "Differential sequential DCT",
        marker: 'ffc5'
    },
    "ffc6": {
        length: true,
        name: "SOF6",
        details: "Differential progressive DCT",
        marker: 'ffc6'
    },
    "ffc7": {
        length: true,
        name: "SOF7",
        details: "Differential lossless sequential",
        marker: 'ffc7'
    },
    "ffc8": {
        length: true,
        name: "JPG",
        details: "Reserved for JPEG extensions",
        marker: 'ffc8'
    },
    "ffc9": {
        length: true,
        name: "SOF9",
        details: "Extended sequential DCT",
        marker: 'ffc9'
    },
    "ffca": {
        length: true,
        name: "SOF10",
        details: "Progressive DCT",
        marker: 'ffca'
    },
    "ffcb": {
        length: true,
        name: "SOF11",
        details: "Lossless sequential",
        marker: 'ffcb'
    },
    "ffcc": {
        length: true,
        name: "DAC",
        details: "Define arithmetic coding conditioning(s)",
        marker: 'ffcc'
    },
    "ffcd": {
        length: true,
        name: "SOF13",
        details: "Differential sequential DCT",
        marker: 'ffcd'
    },
    "ffce": {
        length: true,
        name: "SOF14",
        details: "Differential progressive DCT",
        marker: 'ffce'
    },
    "ffcf": {
        length: true,
        name: "SOF15",
        details: "Differential lossless sequential",
        marker: 'ffcf'
    },
    "ffd0": {
        length: false,
        name: "RST0",
        details: "Restart with modulo 8 count 0",
        marker: 'ffd0'
    },
    "ffd1": {
        length: false,
        name: "RST1",
        details: "Restart with modulo 8 count 1",
        marker: 'ffd1'
    },
    "ffd2": {
        length: false,
        name: "RST2",
        details: "Restart with modulo 8 count 2",
        marker: 'ffd2'
    },
    "ffd3": {
        length: false,
        name: "RST3",
        details: "Restart with modulo 8 count 3",
        marker: 'ffd3'
    },
    "ffd4": {
        length: false,
        name: "RST4",
        details: "Restart with modulo 8 count 4",
        marker: 'ffd4'
    },
    "ffd5": {
        length: false,
        name: "RST5",
        details: "Restart with modulo 8 count 5",
        marker: 'ffd5'
    },
    "ffd6": {
        length: false,
        name: "RST6",
        details: "Restart with modulo 8 count 6",
        marker: 'ffd6'
    },
    "ffd7": {
        length: false,
        name: "RST7",
        details: "Restart with modulo 8 count 7",
        marker: 'ffd7'
    },
    "ffd8": {
        length: false,
        name: "SOI",
        details: "Start of image",
        marker: 'ffd8'
    },
    "ffd9": {
        length: false,
        name: "EOI",
        details: "End of image",
        marker: 'ffd9'
    },
    "ffda": {
        length: false,
        name: "SOS",
        details: "Start of scan",
        marker: 'ffda'
    },
    "ffdb": {
        length: true,
        name: "DQT",
        details: "Define quantization table",
        marker: 'ffdb'
    },
    "ffdc": {
        length: true,
        name: "DNL",
        details: "Define number of lines",
        marker: 'ffdc'
    },
    "ffdd": {
        length: true,
        name: "DRI",
        details: "Define restart interval",
        marker: 'ffdd'
    },
    "ffde": {
        length: true,
        name: "DHP",
        details: "Define hierarchical progression",
        marker: 'ffde'
    },
    "ffdf": {
        length: true,
        name: "EXP",
        details: "Expand reference component",
        marker: 'ffdf'
    },
    "ffe0": {
        length: true,
        name: "APP0",
        details: "",
        marker: 'ffe0'
    },
    "ffe1": {
        length: true,
        name: "APP1",
        details: "",
        marker: 'ffe1'
    },
    "ffe2": {
        length: true,
        name: "APP2",
        details: "",
        marker: 'ffe2'
    },
    "ffe3": {
        length: true,
        name: "APP3",
        details: "",
        marker: 'ffe3'
    },
    "ffe4": {
        length: true,
        name: "APP4",
        details: "",
        marker: 'ffe4'
    },
    "ffe5": {
        length: true,
        name: "APP5",
        details: "",
        marker: 'ffe5'
    },
    "ffe6": {
        length: true,
        name: "APP6",
        details: "",
        marker: 'ffe6'
    },
    "ffe7": {
        length: true,
        name: "APP7",
        details: "",
        marker: 'ffe7'
    },
    "ffe8": {
        length: true,
        name: "APP8",
        details: "",
        marker: 'ffe8'
    },
    "ffe9": {
        length: true,
        name: "APP9",
        details: "",
        marker: 'ffe9'
    },
    "ffea": {
        length: true,
        name: "APP10",
        details: "",
        marker: 'ffea'
    },
    "ffeb": {
        length: true,
        name: "APP11",
        details: "",
        marker: 'ffeb'
    },
    "ffec": {
        length: true,
        name: "APP12",
        details: "",
        marker: 'ffec'
    },
    "ffed": {
        length: true,
        name: "APP13",
        details: "",
        marker: 'ffed'
    },
    "ffee": {
        length: true,
        name: "APP14",
        details: "",
        marker: 'ffee'
    },
    "ffef": {
        length: true,
        name: "APP15",
        details: "",
        marker: 'ffef'
    },
    "fff0": {
        length: true,
        name: "…",
        details: "",
        marker: 'fff0'
    },
    "fff6": {
        length: true,
        name: "JPG6",
        details: "",
        marker: 'fff6'
    },
    "fff7": {
        length: true,
        name: "JPG7",
        details: "",
        marker: 'fff7'
    },
    "fff8": {
        length: true,
        name: "JPG8",
        details: "",
        marker: 'fff8'
    },
    "fff9": {
        length: true,
        name: "JPG9",
        details: "",
        marker: "fff9"
    },
    "fffa": {
        length: true,
        name: "JPG10",
        details: "",
        marker: "fffa"
    },
    "fffb": {
        length: true,
        name: "JPG11",
        details: "",
        marker: "fffb"
    },
    "fffc": {
        length: true,
        name: "JPG12",
        details: "",
        marker: "fffc"
    },
    "fffd": {
        length: true,
        name: "JPG13",
        details: "",
        marker: "fffd"
    },
    "fffe": {
        length: true,
        name: "COM",
        details: "Comment",
        marker: "fffe"
    },
};
export default markersDict;
