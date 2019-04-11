// save

 'use strict';

 var AWS = require('aws-sdk');
 var exec = require('child_process').exec;
 var fs = require('fs');

 process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

 var s3 = new AWS.S3();

 function saveMetadataToS3(body, bucket, key, callback){
     console.log('Saving metadata to S3');

     s3.putObject({
         Bucket: bucket,
         Key: key,
         Body: body,
         ACL: 'public-read'
     },function(error, data){
         if(error){
             callback(error);
         }
     });
 }

 function extractMetadata(sourceBucket, sourceKey, localFilename, callback){
     console.log('Extracting metadata');
     
     var cmd = 'bin/ffprobe -v quiet -print_format json -show_format "/tmp/' + localFilename + '"';

     exec(cmd, function(error, stdout, stderr){
         if(error === null){
             var metadataKey = sourceKey.split('.')[0] + '.json';
             saveMetadataToS3(stdout, sourceBucket, metadataKey, callback);
         } else {
             console.log(stderr);
             callback(error);
         }
     });
 }

 function saveFileToFilesystem(sourceBucket, sourceKey, callback){
     console.log('Saving to filesystem');

     var localFilename = sourceKey.split('/').pop();
     var file = fs. createWriteStream('/tmp/' + localFilename);
     var stream = s3.getObject({Bucket: sourceBucket, Key: sourceKey}).createReadStream().pipe(file);

     stream.on('error', function(error){
         callback(error);
     });

     stream.on('close', function(){
         extractMetadata(sourceBucket, sourceKey, localFilename, callback);
     });
 }

 // Amazon S3からローカルファイルシステムにオブジェクトにコピーし(saveFileToFilesystem)、
 // ファイルからメタデータを抽出して(extractMetadata)、メタデータをAmazon S3の新しいファイルに保存する(saveMetadataToS3)
 exports.handler = function(event, context, callback) {
     var message = JSON.parse(event.Records[0].Sns.Message);

     var sourceBucket = message.Records[0].s3.bucket.name;
     var sourceKey = decodeURIComponent(message.Records[0].s3.object.key.replace(/\+/g, " "));

     saveFileToFilesystem(sourceBucket, sourceKey, callback);
 }