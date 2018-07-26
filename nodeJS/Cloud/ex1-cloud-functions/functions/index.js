const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
// spawn package allows us to run binaries that are installed in the cloud.
const spawn = require('child-process-promise').spawn;


const cors = require('cors')({ origin: true });
const Busboy = require('busboy');
const fs = require('fs');

const gcConfig = {
    projectId: "habib-functions",
    keyFilename: "pvk.json"
}

// Make gcs a global.
const gcs = require('@google-cloud/storage')(gcConfig);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//exports.onFileChange = functions.storage.object().onFileChange

exports.onFileChange = functions.storage.object().onFinalize(event => {
    //exports.onFileChange = functions.storage.object().finalize((event, callback) => {
    // Let's rename the file

    const object = event;
    const mybucket = object.bucket;
    const contentType = object.contentType;
    const filePath = object.name;
    console.log('File change detected, function execution started2222');
    console.log(mybucket);
    console.log(event);

    // this covers the case when we delete a file.
    if (object.resourceState === 'not_exists') {
        console.log('The file is already deleted! ' + filePath);
        return;

    }

    // If the file name does not start with resized then continue (to prevent an infinite loop and avoid retriggering it).
    if (path.basename(filePath).startsWith('resized-')) {
        //        if (path.basename(filePath).startsWith('renamed-')) {
        // we do not want to trigger the function to avoid infinite loop
        console.log('We already renamed this file! ' + filePath);
        return;
    }


    const destBucket = gcs.bucket(mybucket);
    console.log('file path: ' + filePath)
    const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));

    const metadata = { contentType: contentType };

    // Download the file into the temporary folder.
    // Once the file is downloaded the promise returns
    return destBucket.file(filePath).download({
        destination: tempFilePath
    }).then(() => {
        // Use spawn package to launch convert utility.
        //  -resize is an image magic command option and convert us an option
        return spawn('convert', [tempFilePath, '-resize', '500x500', tempFilePath]).then(() => {
            return destBucket.upload(tempFilePath, {
                destination: 'resized-500x500-' + path.basename(filePath),
                metadata: metadata
            })

        });
        // Alternatively, we can upload that file again when promise returns.
        // return destBucket.upload(tempFilePath, {
        //     destination: 'renamed-' + path.basename(filePath),
        //     metadata: metadata
        // })
    })

});

// Is executed whenever an http request is issued.
//https://us-central1-habib-functions.cloudfunctions.net/uploadFile
// This is upload file http endpoint where a file POSTed by a rest 
// API will be pushed into the databse.
exports.uploadFile = functions.https.onRequest((req, res) => {

    // See online docs for cors:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(500).json({
                message: 'This instance only allows POST requests!'
            });

        }
        // Busboy is used to parse the data
        const busboy = new Busboy({ headers: req.headers });
        let uploadData = null;

        // Listening to file events using busboy when it parses a file from the incoming
        // request.
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            // Once we geta  file, store it the FB. contrsuct the pah to the file
            const filepath = path.join(os.tmpdir(), filename);
            // The data constructed by busboy
            uploadData = { file: filepath, type: mimetype };
            file.pipe(fs.createWriteStream(filepath));
        });

        // Triggers once it is done uploading
        busboy.on('finish', () => {
            // get the default bucket where the file is going to be stored
            const bucket = gcs.bucket('habib-functions.appspot.com');
            bucket.upload(uploadData.file, {
                    uploadType: "media",
                    metadata: {
                        metadataL: {
                            contentType: uploadData.type
                        }
                    }
                })
                .then(() => {
                    res.status(200).json({
                        message: 'ItWorked!'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                })


        })
        busboy.end(req.rawBody);


        //        busboy.on('field);')
    });

});

exports.onDataAdded = functions.database.ref('/message/{id}').onCreate(event => {
    // transfeorm all to uppercase
    const data = event.data.val();
    const newData = {
        msg: event.params.id + '-' + data.msg.toUpperCase()
    };

    return event.data.ref.parent.child('copiedData').set(newData);
    //    return event.data.ref('{id}').child('copiedData').set(newData);

});