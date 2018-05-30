import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()


export const getDallasWeather = functions.https.onRequest((request, response) => {
    admin.firestore().doc('cities-weather/boston-ma-us').get()
    .then(snapshot => {
        const data = snapshot.data();
        response.send(data);
    })
    .catch(err => {
        // Handle the error
        console.log(err);
        response. status(500).send(err);

    })
});
