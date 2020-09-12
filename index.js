const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const { json } = require('express');
const { uploadFile } = require('./uploadS3.js')
const port = 3000

require('dotenv').config()

app.use(fileUpload());

app.post('/upload', (req, res) => {
    console.info("/upload Hit")
    if (!req.files || Object.keys(req.files).length === 0) {
        console.info("/upload failed no files were uploaded")
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let File = req.files.File;
    console.log(File)
    filePath = `./assets/${File.name}`

    // Use the mv() method to place the file somewhere on your server
    File.mv(filePath, (err) => {
        if (err) {
            console.error("Error: " + JSON.stringify(err))
            return res.status(500).send(err);
        }
        res.send(uploadFile(filePath, File.name));
    });
    });

app.get('/', (req, res) => {
    console.info("Web Server started")
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})