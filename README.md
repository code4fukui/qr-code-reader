# qr-code-reader

## demo

- [demo](https://code4fukui.github.io/qr-code-reader/)

## usage

```html
<script type="module" src="https://code4fukui.github.io/qr-code-reader/qr-code-reader.js"></script>
<input id=res style="width:95vw"><br>
<qr-code-reader id=qrr></qr-code-reader><br>
<button id=btn>stop</button>

<script type="module">
qrr.oninput = (s) => {
  res.value = s.data;
  //qrr.stop();
};
btn.onclick = () => qrr.stop();
</script>
```
open on [ES-Jam](https://code4fukui.github.io/htmlprac/?url=https://code4fukui.github.io/qr-code-reader/)

## dependencies

- [Camera.js](https://github.com/code4fukui/Camera/)
- [jsQR](https://github.com/code4fukui/jsQR-es/)

## related

- [qr-code](https://github.com/code4fukui/qr-code/)

