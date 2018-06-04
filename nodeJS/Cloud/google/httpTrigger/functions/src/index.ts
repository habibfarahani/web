import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()

// First step is to create this promise when the URL is triggered (touched)
// This fetches the weather data for a given city.
export const getDallasWeather = functions.https.onRequest((request, response) => {
    admin.firestore().doc('cities-weather/dallas-tx-us').get()
    .then(snapshot => {
        const data = snapshot.data();
        response.send(data);
    })
    .catch(err => {
        // Handle the error
        console.log(err);
        response. status(501).send(err);

    })
});

// Second step write a firestore trigger to send a message (using cloud messaging) to send a notification to
// the app rather than it repeatedlly polling for an update.
export const onDallasWeatherUpdate = functions.firestore.document("cities-weather/dallas-tx-us").onUpdate(change => {
    const afterd = change.after.data();
    // Now that we have data, ceate an FSM message to send to the app. 
    const payload = {
        data: {
            temp: String(afterd.temp),
            conditions: afterd.conditions
        }
    }
    return admin.messaging().sendToTopic("weather_dallas-ma-us", payload)
    // .catch(error =>{
    //     console.log("FCM failed", error)
    // })
})

// Step 3: 
// 1. Create an HTTP trigger to read the area document
// 2. Gets the list of cities.
// 3. Reads the matching documents

export const getDallasAreaWeather = functions.https.onRequest((request, response) => {
    admin.firestore().doc("areas/greater-dallas").get()
    .then(areaSnapShot => {
        const cities = areaSnapShot.data().cities
        // In this case, each city returns a promise.
        // To avoid waiting for each promise. we can
        // Issue all queries and use a promise array to wait for all promises to
        // receive.
        const promises = [];
        for(const city in cities){
            const p = admin.firestore().doc(`cities-weather/${city}`).get()
            promises.push(p)
        }

        return Promise.all(promises)    // Now return the promise when all are met.
    })
    .then(citySnapShot => { // This result is called when promise alove (Promise.all) is returned

        const results = []
        citySnapShot.forEach(citySnap =>{
            const data = citySnap.data();
            data.city = citySnap.id;
            results.push(data);
        })
        response.send(results)
//        response data
    })
    .catch(error =>{
        console.log(error);
        response.status(error);
    })

    
})