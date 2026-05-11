# qr-code-reader

デバイスのカメラや画像ファイルからQRコードをスキャンするための、依存関係のないシンプルなWebコンポーネント（`<qr-code-reader>`）です。

## デモ

- **[ライブデモ](https://code4fukui.github.io/qr-code-reader/)**
- [ES-Jamで試す](https://code4fukui.github.io/htmlprac/?url=https://code4fukui.github.io/qr-code-reader/)

## 機能

- **リアルタイムカメラスキャン**: デバイスのカメラを使用してQRコードを連続的にスキャンします。
- **ファイルサポート**: ドラッグ＆ドロップで画像ファイル（PNGおよびJPEG）からQRコードをデコードします。
- **貼り付けスキャン**: クリップボードから貼り付けた画像からQRコードをデコードします。
- **シンプルなAPI**: `.oninput`イベントで結果を取得し、`.stop()`メソッドでカメラを制御できます。
- **詳細なデータ**: 文字列データ、バージョン、生のデータチャンクを含む、完全にデコードされたQRコードオブジェクトにアクセスできます。
- **アダプティブUI**: ブラウザの言語設定に基づいて、ボタンのテキストが自動的に英語または日本語で表示されます。

## 使い方

HTMLにスクリプトを追加し、`<qr-code-reader>`カスタム要素を使用します。

```html
<script type="module" src="https://code4fukui.github.io/qr-code-reader/qr-code-reader.js"></script>

<!-- 結果を表示する入力フィールド -->
<input id="result" style="width: 95vw"><br>

<!-- QRコードリーダーコンポーネント -->
<qr-code-reader id="reader"></qr-code-reader><br>

<!-- カメラを手動で停止するボタン -->
<button id="stopBtn">カメラ停止</button>

<script type="module">
  const reader = document.getElementById("reader");
  const result = document.getElementById("result");
  const stopBtn = document.getElementById("stopBtn");

  // QRコードが正常にデコードされたときに発火
  reader.oninput = (code) => {
    // デコードされた文字列データ
    result.value = code.data;

    // 完全な結果オブジェクトにアクセス可能
    console.log(code);

    // 必要に応じてスキャン後にカメラを停止
    // reader.stop();
  };

  // カメラを手動で停止
  stopBtn.onclick = () => reader.stop();
</script>
```

## APIリファレンス

### プロパティ

- **`.oninput = (code) => {}`**  
  QRコードがデコードされたときに実行されるコールバック関数です。以下の構造を持つ単一の`code`オブジェクトを受け取ります：
  - `code.data` (String): デコードされた文字列データ。
  - `code.binaryData` (Uint8Array): 生のバイナリデータ。
  - `code.version` (Number): QRコードのバージョン。
  - `code.chunks` (Array): データチャンクの配列。

### メソッド

- **`.stop()`**  
  カメラのストリームを停止し、コンポーネントを初期状態にリセットして「QRコード読み込み」ボタンを表示します。

- **`.decodeQR(imageData)`**  
  指定された`ImageData`オブジェクトに対して手動でデコードを実行します。これは、ファイル入力や貼り付けイベントなど、他のソースからの画像を処理する際に便利です。

## 依存関係

このコンポーネントは以下のライブラリに依存しています：
- [Camera.js](https://github.com/code4fukui/Camera/)
- [jsQR](https://github.com/code4fukui/jsQR-es/)

## 関連プロジェクト

- [qr-code](https://github.com/code4fukui/qr-code/): QRコードを生成するためのWebコンポーネント。
