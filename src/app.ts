import Jpeg from "./jpeg";

const imagePath = "./img/20230923_183639.jpg";
// const imagePath = "./img/D20_img_instagram_0118.jpg";

const image = new Jpeg(imagePath);
// console.log(image.rawData);

// const markers = image.metadata.thumbnail.save('./test.jpeg')
// const markers = image.metadata.parse('APP1')
// const markers = image.metadata.parse("APP1") 
// let list = []
// Object.keys(markers).forEach(key => {
    // console.log(markers[key]['a402'])
//     Object.keys(markers[key]).map( key2 => {
        // console.log(markers[key][key2].tagName + ": " + markers[key][key2].parsedValue);
//     })
// })
// console.log(markers);