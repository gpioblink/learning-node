//今はElemental Cloudのほうがいいかもねー

 'use strict';

 var AWS = require('aws-sdk');
 var s3 = new AWS.S3();

 exports.handler = function(event, content, callback){
     var message = JSON.parse(event.Records[0].Sns.Message);
     var sourceBucket = message.Records[0].s3.bucket.name;
     var sourceKey = decodeURIComponent(message.Records[0].s3.object.key.replace(/\+/g, " "));
     var params = {
         Bucket: sourceBucket,
         Key: sourceKey,
         ACL: 'public-read'
     };
     s3.putObjectAcl(params, function(err,data){
         if(err) {
             callback(err);
         }
     });
 };