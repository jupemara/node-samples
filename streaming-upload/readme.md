# streaming upload to Google Cloud Storage

## how to use

```sh
$ BUCKET_NAME=your-bucket-name npm run start test.png
```

## tips

- `File.metadata`
  - File に対して `[k: string]: [v: string]` の形で任意のデータを仕込める
- `Bucket.file()` にはパスを仕込めるが、このとき、 `/` 始まりにすると GCS 的には `gs:///dir/file.png` みたいな形式で保存されてしまうので, `/` 始まりにはしないほうがいいですね
- write stream は pipe でつないだ read stream がエラーでオチても自動で閉じてくれないので error handle で、 `.end()` or `.destroy()` で落としておくこと(じゃないと stream leak 的なことが起こります)
  - ref: https://nodejs.org/api/stream.html#streamfinishedstream-options
    - `One important caveat is that if the Readable stream emits an error during processing, the Writable destination is not closed automatically. If an error occurs, it will be necessary to manually close each stream in order to prevent memory leaks.`
- `File.createStream` には `contentType` (mime-type) を渡せるが、拡張子で自動で判断してくれるので、ええ感じで使ってください(逆に外部のユーザからアップロードされるときは拡張子で騙せるので中身確認しましょう)
