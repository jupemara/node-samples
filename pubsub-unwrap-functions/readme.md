# pubsub unwrap を試す

一旦 push のみ, pull は後日試してみる

## pre

```sh
# schema の作成
$ gcloud pubsub schemas create "SCHEMA_NAME" --type=protocol-buffer --definition-file=./schema.proto
# publish する用の topic 作成 with schema
$ gcloud pubsub topics create "TOPIC_NAME" --message-encoding=JSON --schema="SCHEMA_NAME"
```

## functions deploy

```sh
$ npm run deploy
```

## create subscription

```sh
$ gcloud pubsub subscriptions create "SUBSCRIPTION_NAME" \
    --topic "TOPIC_NAME" \
    --push-endpoint="ENDPOINT_URL" \
    --push-no-wrapper \
    --push-no-wrapper-write-metadata
```

## publish message

```sh
$ gcloud pubsub topics publish unwrap-test \
  --message='{"user_id": 1, "name": "hoge"}' \
  # can publish with multiple attributes
  --attribute "Content-Type=application/json,X-HOGE-API-KEY=secretsecret"
```

## 挙動 s

### case1 schema がないとき

```sh
$ gcloud pubsub topics publish unwrap-test \
  --message='{"user_id": 1, "name": "hoge"}'
```

↑ すると, 通常の push subscription 同様 `REQUEST.body.message.data` の中に base64 encoded されたデータが入ってくる

```sh
$ gcloud pubsub topics publish unwrap-test \
  --message='{"user_id": 1, "name": "hoge"}' \
  --attribute "Content-Type=application/json"
```

↑ すると, 通常の push subscription 同様 `REQUEST.body` の中に直接 `{user_id: 1, name: hoge}` が入ってくる

### case2 schema があるとき

schema があっても同様に publish する際の `Content-Type=application/json` をつけるかどうかで body の中身が変わる.
schema が存在しても ( schema の encode を JSON にしても) 勝手に `Content-Type=application/json` が付与されるわけではない. ただし request header には `googclient_schemaencoding: 'JSON',` ってのが入ってくる

## tips

例えば任意の API Key や Authorization header を渡したいときは `attribute` に追加すれば良い

```sh
$ gcloud pubsub topics publish unwrap-test \
  --message='{"user_id": 1, "name": "hoge"}' \
  --attribute "Content-Type=application/json,X-HOGE-API-KEY=secretsecret"
```

ただし http endpoint ではヘッダー名は小文字になり `'x-hoge-api-key': 'secretsecret',` っと入ってくる.
一方 `--attribute="Content-Type=application/json"` をつけずに `X-HOGE-API-KEY=secretsecret` だけを付与すると, request body 内に

```js
{
  attributes: {
    'X-HOGE-API-KEY': 'secretsecret',
    googclient_schemaencoding: 'JSON',
    googclient_schemarevisionid: '6a381d7e'
  }
}
```

って形で入ってくる.

### :warning:

```sh
$ gcloud pubsub topics publish unwrap-test \
  --message='{"user_id": 1, "name": "hoge"}' \
  --attribute "Content-Type=application/json" \
  --attribute "X-HOGE-API-KEY=secretsecret"
```

みたいに `--attribute` に渡す値を `,` 区切りにせずに publish すると変な挙動になり, 2023-07-29 時点だと

```js
body: {}
headers: {
  'x-goog-pubsub-message-id': 'xxxxxxxxxxxxxxxx',
  'x-hoge-api-key': 'secretsecret',
}
```

body が空になり, 追加の attribute だけが渡され, request header にも `Content-Type=application/json` が含まれない形になるので気をつけなさい

## appendix

Q: 簡易版 HTTP Client として利用できるのか??
A: Yes! Yes! Yes! Yes! Yes! Yes!

```sh
$ gcloud pubsub subscriptions create slack-incoming-webhook \
  --topic slack-incoming \
  --push-endpoint=https://hooks.slack.com/services/QQQQQQQQQ/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    --push-no-wrapper \
    --push-no-wrapper-write-metadata
```

みたいに http endpoint を incoming webhook として

```sh
$ gcloud pubsub topics publish slack-incoming \
  --message='{"text": "Yes! Yes! Yes!"}' \
  --attribute "Content-Type=application/json"
```

ってな感じで incoming webhook に `--message` に指定した内容が body に入り POST される.
同様に `Authorization` ヘッダーに `--attribute "Authorization=Bearer xxxxxxxx"` と渡せば HTTP の request header として挙動する.
