# pubsub unwrap with cloud run

just run with NestJS on cloud run

## docker push to artifact regsitoryA

```sh
$ gcloud auth configure-docker asia-northeast1-docker.pkg.dev
$ docker build --rm -t asia-northeast1-docker.pkg.dev/$(gcloud config get-value project)/d/pubsub-unwrap:v1 --file docker/Dockerfile ./
```

## deploy

```sh
$ gcloud run deploy pubsub-unwrap \
  --execution-environment=gen2 \
  --image=asia-northeast1-docker.pkg.dev/$(gcloud config get-value project)/d/pubsub-unwrap:v1 \
  --allow-unauthenticated \
  --region=asia-northeast1 \
  --port=3000
```

try with `gcloud pubsub topics publish` !!
