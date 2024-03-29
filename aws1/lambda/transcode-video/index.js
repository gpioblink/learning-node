//今はElemental Cloudのほうがいいかもねー

function saveMetadataToS3(body, bucket, key, callback){
    console.log('Saving metadata to S3');

    s3.putObject({
        Bucket: bucket,
        Key: key + "/" + key + ".original.json",
        Body: body,
        ACL: 'public-read'
    },function(error, data){
        if(error){
            callback(error);
        }
    });
}

function extractMetadata(outputBucket, outputKey, localFilename, callback){
    console.log('Extracting metadata');
    
    var cmd = 'bin/ffprobe -v quiet -print_format json -show_format "/tmp/' + localFilename + '"';

    exec(cmd, function(error, stdout, stderr){
        if(error === null){
            //var metadataKey = sourceKey.split('.')[0] + '.json';
            saveMetadataToS3(stdout, outputBucket, outputKey, callback);
        } else {
            console.log(stderr);
            callback(error);
        }
    });
}

function saveFileToFilesystem(sourceBucket, sourceKey, outputBucket, outputKey, callback){
    console.log('Saving to filesystem');

    var localFilename = sourceKey.split('/').pop();
    var file = fs. createWriteStream('/tmp/' + localFilename);
    var stream = s3.getObject({Bucket: sourceBucket, Key: sourceKey}).createReadStream().pipe(file);

    stream.on('error', function(error){
        callback(error);
    });

    stream.on('close', function(){
        extractMetadata(outputBucket, outputKey, localFilename, callback);
    });
}

function deleteObject(bucket, key, callback){
    console.log('Deleting not vaild file from S3');

    s3.deleteObject({
        Bucket: bucket,
        Key: key
    },function(error, data){
        if(error){
            callback(error);
        }
    });
}

function convertVideo(sourceKey, outputKey, callback){
    var params = {
        PipelineId: '1553851440639-wirur5',
        OutputKeyPrefix: outputKey + '/', //出力キープレフィックスはトランスコード済み動画バケットのファイルに論理的な階層構造を与える
        Input: {
            Key: sourceKey
        },
        Outputs: [
            {
               Key: outputKey + '-1080p' + '.mp4',
               PresetId: '1351620000001-000001'
            },
            {
               Key: outputKey + '-720p' + '.mp4',
               PresetId: '1351620000001-000010'
           },
           {
               Key: outputKey + '-web-720p' + '.mp4',
               PresetId: '1351620000001-100070'
           },
           {
               Key: outputKey + '-hls' + '.m3u8',
               PresetId: '1351620000001-200010'
           },
           {
            Key: outputKey + '-webm' + '.vp8',
            PresetId: '1351620000001-100240'
           }
        ]
    };
    elasticTranscoder.createJob(params, function(error,data){
        if(error){
            callback(error); //Amazon Elastic Transcoderは、ジョブの作成に失敗するとコールバック関数を通じてCloudWatchにエラーを書き込む
        }
    })
}

exports.handler = function(event, context, callback){}
 'use strict';

 var AWS = require('aws-sdk');
 var s3 = new AWS.S3();
 var fs = require('fs');
 var exec = require('child_process').exec;
 var crypto = require('crypto'); 
 var elasticTranscoder = new AWS.ElasticTranscoder({
     region: 'us-east-1'
 });

 exports.handler = function(event, content, callback){
     var sourceBucket = event.Records[0].s3.bucket.name;
     var outputBucket = "serverless-video-transcoded-myself";
     var key = event.Records[0].s3.object.key;
     var sourceKey = decodeURIComponent(key.replace(/\+/g," ")); //S3のキー名はURLエンコードされるのででコードが必要
     //var outputKey = sourceKey.match(/(.+)(\.[^.]+$)/)[1]; //拡張子を除去、途中にピリオドがあってもいいように修正 
     var outputKey = crypto.randomBytes(8).toString('hex'); //ランダムな文字列で出力するように変更 
     var extension = sourceKey.match(/(.+)(\.[^.]+$)/)[2].slice(1);
     console.log('key:', key, sourceKey, outputKey);

     if(extension === "avi" || extension === "mp4" || extension === "mov"){
         convertVideo(sourceKey, outputKey, callback);
     }else{
         deleteObject(sourceBucket, sourceKey, callback);
     }
     saveFileToFilesystem(sourceBucket, sourceKey, outputBucket, outputKey, callback);
 };