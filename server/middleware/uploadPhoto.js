const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.AWSAccessKeyId,
    accessKeyId: process.env.AWSSecretKey
});

const s3 = new aws.s3()