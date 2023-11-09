export default class App1EXIFModel {
    'identifier': string;
    'TIFF': {
        order: 'Little endian' | 'Big endian';
        identifier: string;
        ifdOffset: number;
    };
}
