import { Camera } from "https://code4fukui.github.io/Camera/Camera.js";
import { jsQR } from "https://code4fukui.github.io/jsQR-es/jsQR.js";
import { setDropFilesListener } from "https://js.sabae.cc/setDropFilesListener.js";
import { decodeImageFromFile } from "./decodeImageFromFile.js";

class QRCodeReader extends HTMLElement {
  constructor() {
    super();
    const btn = document.createElement("button");
    btn.textContent = "QRコード読み込み";
    btn.style.margin = "2em";
    btn.style.padding = "3em";
    this.appendChild(btn);
    this.btn = btn;

    const canvas = document.createElement("canvas");
    canvas.style.maxWidth = "100%";
    this.appendChild(canvas);
    const g = canvas.getContext("2d");
    canvas.style.display = "none";
    this.canvas = canvas;

    btn.onclick = async () => {
      btn.style.display = "none";
      canvas.style.display = "inline-block";
      
      const video = document.createElement("video");

      const onFrame = async () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        g.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = g.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          this.oninput(code);
        }
      };
      this.camera = new Camera(video, {
        onFrame,
        width: 1280,
        height: 720,
        backcamera: true,
      });
      this.camera.start();
      this.canvas = canvas;
      canvas.onclick = () => {
        this.stop();
      };
    };
    setDropFilesListener(btn, async (files) => {
      const file = files[0];
      const imageData = await decodeImageFromFile(file);
      //canvas.width = img.width;
      //canvas.height = img.videoHeight;
      //g.drawImage(img, 0, 0, canvas.width, canvas.height);
      //g.putImageData(img.imageData, img,width, img.height);
      //const imageData = g.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        this.oninput(code);
      }
    });
  }
  oninput(bin) {
    console.log("oninput", bin);
  }
  stop() {
    if (this.camera) {
      this.camera.stop();
    }
    this.btn.style.display = "inline-block";
    this.canvas.style.display = "none";
  }
};

customElements.define("qr-code-reader", QRCodeReader);

export { QRCodeReader };
