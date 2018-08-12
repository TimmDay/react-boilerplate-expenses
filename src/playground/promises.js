const promise = new Promise((resolve, reject) => {
    // any sort of long running task, async js

    setTimeout(()=> {
        // resolve('here is resolved data');
        // resolve('ooops cant do it twice, this will be ignored. resolve an obj above if you need 2 things');
        reject('REJECTED!');
    }, 2000);
});

console.log('in sync or not ?');

// lets us register a callback if promise resolves, (or rejects - catch)
promise.then((data) => {
    console.log(data);
}).catch((error) => {
   console.log('error:', error);
});

// ALTERNATIVE SYNTAX
// promise.then((data) => {
//     console.log(data);
// } , (error) => {
//     console.log('error:', error);
// });


