export default class APP1EXIFModel {
    'identifier': string;
    'TIFF': {
        order: 'Little endian' | 'Big endian',
        identifier: string,
        ifdOffset: number
    }
}