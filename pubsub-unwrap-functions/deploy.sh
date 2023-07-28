#!/usr/bin/env bash -eu

gcloud config configurations activate default
gcloud functions deploy test001 \
  --gen2 \
  --entry-point=main \
  --runtime=nodejs18 \
  --trigger-http \
  --region=asia-northeast1 \
  --allow-unauthenticated
