#!/usr/bin/env bash

if ! kubectl exec -it -n aura vera-mongo-0 -c mongod-container -- mongodump --archive > ./dump; then
  echo "failed to execute mongodump"
  exit 1
fi

# compress dump before uploading to bucket
tar zcf dump.tgz dump
rm dump

backup_name="dump_$(date +"%Y-%m-%d_%H-%M").tgz"
if ! gsutil mv "./dump.tgz" "gs://vera-backup-bucket/$backup_name"; then
  echo "failed to upload backup to bucket"
  exit 1
fi
