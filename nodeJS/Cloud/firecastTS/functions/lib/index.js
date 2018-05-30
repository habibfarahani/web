"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.getDallasWeather = functions.https.onRequest((request, response) => {
    const promise = admin.firestore().doc('cities-weather/boston-ma-us').get();
    const p2 = promise.then(snapshot => {
        const data = snapshot.data();
        response.send(data);
    });
    p2.catch(err => {
        // Handle the error
        console.log(err);
        response.status(500).send(err);
    });
});
//# sourceMappingURL=index.js.map