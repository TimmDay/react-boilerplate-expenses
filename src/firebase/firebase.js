const firebase = require("firebase/app");
// require("firebase/auth");
require("firebase/database");
// require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");

const config = {
    apiKey: "AIzaSyCX0ZPeQO5eSQqZR3i43Vcx1EiFOX82wTc",
    authDomain: "expensify-4a98e.firebaseapp.com",
    databaseURL: "https://expensify-4a98e.firebaseio.com",
    projectId: "expensify-4a98e",
    storageBucket: "expensify-4a98e.appspot.com",
    messagingSenderId: "760636718951"
};
firebase.initializeApp(config);

const db = firebase.database();

const data = {
    name: 'Trevor Buzz',
    age: 30,
    isBadass: true,
    location: {
        city: 'Berlin',
        country: 'DE'
    }
};


// db.ref().set(data)
//     .then(() => {
//     console.log('data written to db!')
// })
//     .catch((e) => {
//     console.log('error: writing data to db', e)
// });



// UPDATE requires an object - ONLY updates at ROOT level
// nested objects are funny. need nested quotes, kinda gross
// db.ref().update({
//     name: 'Tim',
//     age: 31,
//     degree: 'Computational Linguistik',
//     isBadass: null,
//     'location/city' : 'Tübingen'
// });



// FETCH - ONCE
// once fetche data once
// db.ref('location/city').once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log('Error: ', e)
//     });



// FETCH - ON
//watch the db for changes (subscription) and update whatever as it changes
// promise can only resolve once, so no promises here!
// const onValueChange = db.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// }, (e) => {
//     console.log('Error with data fetching: ', e);
// });

// test subscription
// setTimeout(() => {
//     db.ref('age').set(33);
// }, 3500);

// UNSUBSCRIBE - OFF
// db.ref().off(onValueChange);




// db.ref('isBadass')
//     .remove()
//     .then(() => {
//         console.log('removed');
//     })
//     .catch(() => {
//         console.log('issue');
//     });

//.set(null) --> is equivalent to remove



// db.ref('attributes').set({
//     height: 169,
//     weight: 73,
//     units_height: 'cm',
//     units_weight: 'kg'
// }).then(() => {
//     console.log('attributes set');
// }).catch((e) => {
//     console.log('issue: ', e);
// });



// connect to db here, then we can import this for other files to access db

// ref() gives us a reference to the root of the db
// set() called on a ref to change value. It will completely wipe previous value
// set returns a promise

// EXAMPLE SYNTAX for writing
// db.ref('age').set(31);
// db.ref('location/city').set('Boston');
// update also supports promises


// // one more example
// db.ref().set({
//     name: 'Tim',
//     job: 'frontend engineer',
//     company: 'amazon'
// });
//
// db.ref().update({
//     name: 'Tim Day'
// });
//
// const onValueChange = db.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is a ${val.job} with ${val.company}`);
// }, (e) => {
//     console.log('Error: ', e)
// });

