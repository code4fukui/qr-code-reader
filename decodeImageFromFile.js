import { readAsArrayBufferAsync } from "https://code4sabae.github.io/js/readAsArrayBufferAsync.js";
import { JPEG } from "https://taisukef.github.io/jpeg-js-es/JPEG.js";
import { PNG } from "https://taisukef.github.io/PNG/PNG.js";

export const decodeImageFromFile = async (file) => {
  if (file.file) file = file.file;
  try {
    const bin = await readAsArrayBufferAsync(file);
    if (file.name.toLowerCase().endsWith(".png")) {
      const img = PNG.decode(new Uint8Array(bin));
      return img;
    }
    //console.log(img);
    const img = JPEG.decode(bin);
    return img;
  } catch (e) {
    return null;
  }
};
