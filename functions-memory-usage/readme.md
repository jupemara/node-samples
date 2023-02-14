# cloud functions memory usage

結論: cloud functions は直接 profile 取れないので express や functions framework 使って function 自体を listen して、 profile しましょう

## prepare

```sh
$ npm install && brew install k6
```

## with functions-framework

```sh
$ npm run build-express && \
  BUCKET_NAME=YOUR_BUCKET \
  OBJECT_PATH=YOUR_PATH \
  npx --node-options=--inspect @google-cloud/functions-framework --target=x --port=3000
```

## load test

```
$ k6 run k6.js
```

## pfofiling

refs: https://marmelab.com/blog/2018/04/03/how-to-track-and-fix-memory-leak-with-nodejs.html

1. chrome://inspect/#devices を開く
2. Remote Target の下の inspect を開く
3. profiling 画面が出てくるので、 memory の snapshot とったり、 profiler 開いたりする
