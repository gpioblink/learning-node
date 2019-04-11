ここの設定ファイルを反映するには

```
aws s3api put-bucket-lifecycle-configuration --bucket serverless-video-upload-myself --lifecycle-configuration file://upload-video-delete-cycle.json
```

のようにする。


反映を確認するには

```
aws s3api get-bucket-lifecycle-configuration --bucket serverless-video-upload-myself
```

を使えば良い。