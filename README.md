# JPEG-DUMP

`JPEG-DUMP` is a tool that will help you analyze and understand your JPEG images, and extract from them any possible data at the binary level.

## Features

- Extract JPEG file structure.
- Extract any existing metadata - JFIF, EXIF , XMP, ICC, IPTC, Adobe, Photoshop, etc.
- Get metadata tags description.
- Extract thumbnail images.
- Analyze thumbnail images.
- Extract compression data.

## Installation

`JPEG-DUMP` is written in Typescript.

``` console
npm install jpeg-dump
```

## Usage

To start using `JPEG-DUMP` you need to import the `Jpeg` class from the `jpeg-dump` package and instantiate it with the path to your JPEG image.

```typescript
import { Jpeg } from 'jpeg-dump';

const myImage = new Jpeg('./my_image_path.jpg');
```

After you have instantiated the `Jpeg` class you can use it to get information about your image.

On your new class, you can access three groups of data:

- file structure data - `myImage.structure`.
- metadata - `myImage.metadata`.
- compression data - `myImage.compression`.

Also, you can access the full binary dump of the image throw the `dump` method. This will return a `Uint8Array` with the full binary data of your image.

### File structure data

The `structure` property will return an object with the following properties:

- `dump` method - returns an array of segment objects ordered by their position in the JPEG file. each segment object has the following properties:
  - `segmentName` - a string representing the segment/marker conventional abbreviation name as it appears on JPEG documentations. A.K.A - `SOI` for 'Start Of Image' marker that represents the beginning of the JPEG file.
  - `marker` - a string representing the `hex` values of the marker itself. A.K.A - `FFD8` for 'Start Of Image' marker that represents the beginning of the JPEG file. There is one special case where `marker` property will be `null` and that is when the segment is representing a trailer data in the image. This kind of data is usually present at the end of the file and it does not have a uniq marker.
  - `globalOffset` - a number representing the offset (in bytes) of the segment from the start of the JPEG file, so this offset number is the number of bytes from the beginning of the file to the first byte of the segment marker.
  - `length` - a number representing the length (in bytes) of the segment. This length does not include the segment marker itself, so segments that are composed only from a marker will have a length of `0`.
  - `rawData` - a `Uint8Array` that is actually the bytes values of the segment. This data includes segment marker bytes.
  - `nested` - this property will be present only in segments that includes inside of them other segments. It will be an array of segment objects that are nested inside of the current segment.

- `markers` object - this object has some methods that can be used to extract markers data of the JPEG file. You can use this object to get different lists of markers in the JPEG file.
  - `listAll` - returns an array of all markers abbreviation name (string) in the JPEG file, including the nested markers, by their order in the file.
  - `listMain` - returns an array of all main markers abbreviation name (string) in the JPEG file, excluding the nested markers, by their order in the file.
  - `listMetadata` - returns an array of all markers abbreviation name (string) in the JPEG file, that associates as metadata segments, by their order in the file. Trailer data in this case will listed as an metadata segment.
  - `listThumbnail` - returns an array of all markers abbreviation name (string) of the thumbnail image in the file, by their order.
  - `tree` - returns an array of marker objects that contains the list of markers in the JPEG file, including the nested markers. Each marker object has the following properties:
    - `segmentName` - a string representing the segment/marker conventional abbreviation name
    - `globalOffset` - a number representing the offset (in bytes) of the segment from the start of the JPEG file.
    - `nested` - an array of marker objects that are nested inside of the current segment.

### Metadata

The `metadata` property will enable access to metadata segment parsers:

- `JFIF()` - if JFIF/JFXX segment (APP0) exist in the image, returns an object with all of the data includes in the segment.

  ```typescript
    const myImage = new Jpeg('./my_image_path.jpg');
    const JFIF = myImage.metadata.IFDs
    console.log(JFIF);
    // todo: add JFIF example
  ```

- `EXIF()` - if EXIF segment (APP1) exist in the image, returns an object with all EXIF tags in the image, sorted by their IFD. Each tag is an object with every piece of data about the tag.
- `IFDs` - a methods that returns an array of IFD names (strings) exist in the image.

  ```typescript
    const myImage = new Jpeg('./my_image_path.jpg');
    const IFDs = myImage.metadata.IFDs
    console.log(IFDs);
    // [ 'IFD', 'EXIFSubIFD', 'IFD1' ]
  ```

- `IFDTags()` - returns object with all tags of a specific IFD.
- `thumbnail` - enable access to every function or method of the `Jpeg` class that is related to thumbnail. One uniq function of the thumbnail object is `save()` function that enable saving the thumbnail to a separated file.

  ```typescript
    const myImage = new Jpeg('./my_image_path.jpg');
    myImage.metadata.thumbnail.save('path_to_new_image_file.jpg')

    // if succeed -> returns path to the new image file
  ```

### Compression

The `compression` property will return two object to access compression data:

- `quantization` - will enable access to all data about the quantization tables of the image. Currently, two properties are available:
  - `parse()` - return an array of quantization tables segment. each segment is an object with all data about the quantization table.
    example:

    ```typescript
    const myImage = new Jpeg('./my_image_path.jpg');
    const QTs = myImage.compression.quantization.parse()
    console.log(QTs);

    //  [
    //    {
    //      marker: 'ffdb',
    //      segmentName: 'DQT',
    //      globalOffset: 51931,
    //      length: 132,
    //      quantizationTables: [ [QTObject], [QTObject] ]
    //    }
    // ]
    ```

    `quantizationTables` property is an array of `QTObject`. This object describe data about specific QT.

    ```typescript
    //  {
    //    precision: 8,
    //    tableData: Uint16Array(64) [
    //    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3,
    //    3, 3, 3, 3, 3, 3, 3, 2, 2, 3, 2, 2,
    //    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    //    3, 3, 3, 4, 3, 3, 3, 4, 4, 5, 5, 4,
    //    4, 5, 6, 7, 6, 5, 7, 9, 9, 7, 11, 12,
    //    11, 14, 14, 19 ],
    //    localOffset: 5,
    //    globalOffset: 51936
    //  }
    ```

  - `count` - return the number of quantization tables in the image.

    ```typescript
    const myImage = new Jpeg('./my_image_path.jpg');
    const QTCount = myImage.compression.frame.type
    console.log(QTCount);

    // 2
    ```

- `frame` - will enable access to all data about the frame of the image. Currently, two properties are available:
  - `type` - return an object with main data about the frame type of the image.

  ```typescript
    const myImage = new Jpeg('./my_image_path.jpg');
    const frameType = myImage.compression.frame.type
    console.log(frameType);

    // { marker: 'ffc0', name: 'SOF0', details: 'Baseline DCT' }
  ```

  - `parse` - return an object with all data in the frame segment of the image.

  ```typescript
    const myImage = new Jpeg('./my_image_path.jpg');
    const parsedFrame = myImage.compression.frame.type
    console.log(parsedFrame);

    //  {
    //      marker: 'ffc0',
    //      globalOffset: 51912,
    //      length: 17,
    //      samplePrecision: 8,
    //      linesNumber: 1980,
    //      samplesPerLine: 2640,
    //      componentsNumber: 3,
    //      componentId: 1,
    //      segmentName: 'SOF0',
    //      details: 'Baseline DCT'
    //  }
  ```

## Todo

- [ ] Add support for EXIF tag groups:
  - [ ] GPS
  - [ ] IPTC
  - [ ] PHOTOSHOP
  - [ ] ICC
  - [ ] MakerNotes
  - [ ] UserComment
- [ ] Add support for all metadata segments parsers:
  - [ ] ICC
  - [ ] IPTC
  - [ ] XMP
- [ ] Add tests

