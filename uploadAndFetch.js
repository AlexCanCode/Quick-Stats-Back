const aws = require('aws-sdk');
const http = require('http');

const S3_BUCKET = process.env.S3_BUCKET;

aws.config.region = 'us-east-1';