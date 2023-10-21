declare function readImageAsHex(filePath: string): Promise<Uint8Array>;
declare function readJsonAsObj(filePath: string): Promise<Object>;
declare function createUniqueObjKey(object: Object, key: string): string;
declare function formatHexZeros(hexValue: string): string;
declare function hexStringToUint8Array(hexString: string): Uint8Array;
declare function uint8ArrayToHexString(uint8Array: Uint8Array): string;
declare function splitArrayIntoChunks(arr: any[] | Uint8Array, chunkSize: number): any[];
declare function uint8ArrayToNumberLE(uint8Array: Uint8Array): number;
declare function uint8ArrayToNumberBE(uint8Array: Uint8Array): number;
declare function trimTrailingZeros(uint8Array: Uint8Array): Uint8Array;
declare function keyExists(obj: {
    [key: string]: any;
}, value: any): boolean;
export { readImageAsHex, readJsonAsObj, createUniqueObjKey, formatHexZeros, hexStringToUint8Array, uint8ArrayToHexString, splitArrayIntoChunks, uint8ArrayToNumberLE, uint8ArrayToNumberBE, trimTrailingZeros, keyExists };
