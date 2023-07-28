# pubsub unwrap を試す

一旦 push のみ, pull は後日試してみる

## pre

```sh
# schema の作成
$ gcloud pubsub schemas create "SCHEMA_NAME" --type=protocol-buffer --definition-file=./schema.proto
# publish する用の topic 作成 with schema
$ gcloud pubsub topics create "TOPIC_NAME" --message-encoding=JSON --schema="↑で作ったSCHEMA_NAME"
```
