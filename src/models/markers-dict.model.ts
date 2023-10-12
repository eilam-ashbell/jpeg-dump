export default class MarkersDictModel {
    [marker: string]: { length: boolean; name: string; details: string };
}

export type Markers = MarkersDictModel[keyof MarkersDictModel]['name'] 