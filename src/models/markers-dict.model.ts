import markersDict from "../dictionaries/markersDict";


export default class MarkersDictModel {
    [marker: string]: Marker;
}

export class Marker {  name: string; marker: string; length: boolean; details: string }

export type MarkersNames = typeof markersDict[keyof typeof markersDict]["name"];
