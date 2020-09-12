const fs = require('fs');
const AWS = require('aws-sdk');
require('dotenv').config()

// Enter copied or downloaded access ID and secret key here
const ID = process.env.ID;
const SECRET = process.env.SECRET;


// The name of the bucket that you have created
const BUCKET_NAME = 'hackademybucket1';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (filePath, fileName) => {

    respObj = {}
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            respOpj = {
                status: "ERROR",
                msg: "Upload to S3 Failed",
                errorStack: err
            }
            throw err;
        }
        respOpj = {
            status: "SUCCESS",
            msg: "Upload to S3 Succesful",
            link: data.location
        }
        console.log(respObj);
    });
    return respObj
};

// uploadFile('./images/filename.jpg')

module.exports.uploadFile = uploadFile;