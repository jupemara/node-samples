# Firestore native mode on App Engine

## libraries

- https://github.com/googleapis/nodejs-firestore a.k.a @google-cloud/firestore
- https://github.com/firebase/firebase-admin-node a.k.a firebase-admin

## architecture

- App Engine
- Firestore native mode
- User Managed Service Account: https://cloud.google.com/appengine/docs/standard/nodejs/user-managed-service-accounts
  - assign "Cloud Datastore Viewer" IAM role to the specified service account
