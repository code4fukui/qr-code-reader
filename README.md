# qr-code-reader

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A simple, dependency-free web component (`<qr-code-reader>`) for scanning QR codes from a device camera or image file.

## Demo

- **[Live Demo](https://code4fukui.github.io/qr-code-reader/)**
- [Try it on ES-Jam](https://code4fukui.github.io/htmlprac/?url=https://code4fukui.github.io/qr-code-reader/)

## Features

- **Real-time Camera Scanning**: Uses the device camera to continuously scan for QR codes.
- **File Support**: Decode QR codes from image files (PNG & JPEG) via drag-and-drop.
- **Paste to Scan**: Decode QR codes from images pasted from the clipboard.
- **Simple API**: Use the `.oninput` event to get results and the `.stop()` method to control the camera.
- **Detailed Data**: Access the full decoded QR code object, including the string payload, version, and raw data chunks.
- **Adaptive UI**: Button text automatically displays in English or Japanese based on the browser's language setting.

## Usage

Add the script to your HTML, then use the `<qr-code-reader>` custom element.

```html
<script type="module" src="https://code4fukui.github.io/qr-code-reader/qr-code-reader.js"></script>

<!-- Input field to display the result -->
<input id="result" style="width: 95vw"><br>

<!-- The QR code reader component -->
<qr-code-reader id="reader"></qr-code-reader><br>

<!-- A button to manually stop the camera -->
<button id="stopBtn">Stop Camera</button>

<script type="module">
  const reader = document.getElementById("reader");
  const result = document.getElementById("result");
  const stopBtn = document.getElementById("stopBtn");

  // Fired when a QR code is successfully decoded
  reader.oninput = (code) => {
    // The decoded string data
    result.value = code.data;

    // The full result object is available
    console.log(code);

    // Optionally stop the camera after a successful scan
    // reader.stop();
  };

  // Manually stop the camera
  stopBtn.onclick = () => reader.stop();
</script>
```

## API Reference

### Properties

- **`.oninput = (code) => {}`**  
  A callback function that executes when a QR code is decoded. It receives a single `code` object with the following structure:
  - `code.data` (String): The decoded string payload.
  - `code.binaryData` (Uint8Array): The raw binary data.
  - `code.version` (Number): The QR code version.
  - `code.chunks` (Array): An array of data chunks.

### Methods

- **`.stop()`**  
  Stops the camera stream and resets the component to its initial state, showing the "read QR code" button.

- **`.decodeQR(imageData)`**  
  Manually triggers a decoding attempt on a given `ImageData` object. This is useful for processing images from other sources, such as a file input or a paste event.

## Dependencies

This component relies on the following libraries:
- [Camera.js](https://github.com/code4fukui/Camera/)
- [jsQR](https://github.com/code4fukui/jsQR-es/)

## Related Projects

- [qr-code](https://github.com/code4fukui/qr-code/): A web component for generating QR codes.