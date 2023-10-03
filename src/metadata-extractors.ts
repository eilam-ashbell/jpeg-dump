

async function extractApp0(app0Segment: Uint8Array) {
// Check if the APP0 marker is correct (0xFFE0)
if (app0Segment[0] !== 0xFF || app0Segment[1] !== 0xE0) {
    throw new Error('Invalid APP0 marker');
  }

  // Extract the data from the APP0 segment
  const jfifId = String.fromCharCode(app0Segment[4], app0Segment[5], app0Segment[6], app0Segment[7], app0Segment[8]);
  const versionMajor = app0Segment[9];
  const versionMinor = app0Segment[10];
  const units = app0Segment[11];
  const xDensity = (app0Segment[12] << 8) | app0Segment[13];
  const yDensity = (app0Segment[14] << 8) | app0Segment[15];
  const thumbWidth = app0Segment[16];
  const thumbHeight = app0Segment[17];

  // Construct and return an object with the parsed data
  const app0Data: Record<string, any> = {
    JFIFIdentifier: jfifId,
    Version: `${versionMajor}.${versionMinor}`,
    Units: units,
    XDensity: xDensity,
    YDensity: yDensity,
    ThumbnailWidth: thumbWidth,
    ThumbnailHeight: thumbHeight,
  };
  console.log(app0Data);
  
//   return app0Data;
}



export default extractApp0