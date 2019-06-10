const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');         // Use object destructuring to pullout p-ropertries out of an object
                                                    // graphql object builds a schema based on a written (text) formatted schema and converts
                                                    // it into JS objects
const mongoose = require('mongoose');

const Event = require('./models/event');            // Export the model created for this application
const User = require('./models/user');            // Export the model created for this application

const Stauden = require('./models/student');            // Export the model created for this application

const bcrypt = require('bcryptjs');



// cReate an express app object
const app = express();
//const events = [];  No longer needed as we have mongodb now


app.use(bodyParser.json());

app.get('/', (req,res,next) => {
    res.send('Hello World!');
})


// Graphql list of strings is String!
// RootQuery schedma returns and acts asa GET.  It will resturn a list of strings as shown below:
// RootMutation schema acts as a POST (write).  It will have to have a method, function, to perform the operatrion.
// IN below this function takes a String and returns a String

// rootValue is a resolver and should have the same names as the keys in defined schema
// Exclamation means it cannot be null

// To test "events" in graphiql just do:
//query {
//    events
//}
//
 // EVent is a type that describes the event object by our application

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
    type Event {
        _id: String!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }
    
    type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
        email: String!
        password: String

    }

    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User 
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
        events: () =>{

            return Event.find().then(events => {
                
                return events.map(event => {
                    return {...event._doc, _id: event.id.toString()}  // Converting id property into a string (A more descriptive way is shown below)
                })

            }).catch(err => {
                
                throw err;
                
            });

            console.log(events);

            return events;  // Event resolve dthat will be trigged for events
        },
        createEvent: (args) => {
        // Create the new Event object that we want to store in the database.

        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,                     // convert to float(number)
            date: new Date(args.eventInput.date),
            creator: '5c64d4ae35eaad9dabd721a8'            // Id of the user associated with this event
        });

            // const event = {
            //     _id: Math.random().toString(),
            //     title: args.eventInput.title,
            //     description: args.eventInput.description,
            //     price: +args.eventInput.price,                     // convert to float(number)
            //     date: args.eventInput.date

            // };

            console.log(event);
            console.log(event.creator);
//            events.push(event);

            let createdEvent;

            return event
            .save()
            .then(result => {
                // Event is now created and saved.
                // Store it in the local var so it can be used later as event is tied to a user.
                createdEvent = {...result._doc, _id: event._doc._id.toString()};            // Store the credated event in a temp variable
                return User.findById('5c64d4ae35eaad9dabd721a8');           // event is stored, now I want to add the user for that event.  First find the user
            })
            .then(user => {                                 // Then block for when the user is found.
                if(!user){
                    throw new Error('User not found.');
                }
                user.createdEvents.push(event);                          // Method by mongoose to pass this to an event.

                return user.save();                                            // Update the existing user
            })
            .then(result =>{                                                // Then block associated with the saved / updated user (above)
                return createdEvent                                         // Since user is updated, then return the createdEvent.

            })
            .catch(err => {
                console.log(err);

                throw err;
            });

            return event;

        },
        createUser: args => {
            return User.findOne({email: args.userInput.email}).then(user => {
                if(user){
                    console.log(user);
                    throw new Error('User exists already.');
                }
                return bcrypt.hash(args.userInput.password, 12);
            }).then(hashedPasword => {
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPasword
                    });
                    return user.save()
                })
                .then(result => {
                    return {...result._doc, password: null, _id:  result.id};   // This will ensure we doi not return (even the hashed) passwordnodew    
                })
                .catch(err => { 
                    throw err
                });

        }
    },
    graphiql: true
}));


//const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00-oqfot.gcp.mongodb.net:27017,cluster0-shard-00-01-oqfot.gcp.mongodb.net:27017,cluster0-shard-00-02-oqfot.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-oqfot.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`;

mongoose.connect(url).then(() => {

    app.listen(3000);

}).catch(err => {

    console.log(process.env.MONGO_PASSWORD);
    console.log(process.env.MONGO_USER);
    console.log(err);

})




