console.log('destructuring');

//
// const person = {
//     name: 'Tim',
//     age: 30,
//     location: {
//         city: 'Tübingen',
//         temp: 15
//     }
// };
//
// const {
//     name: firstName = 'Anonymous',
//     age
// } = person;
//
// // const name = person.name;
// // const age = person.age;
//
// console.log(`${firstName} is ${age}`);
//
//
// const {city, temp: temperature} = person.location;
//
// if (typeof temperature === 'number' &&  city){
//     console.log(`It's ${temperature} in ${city}`);
// }
// // end up using long object calls all over the place
//
// // destructuring - : rename a variable pulled off the object
// // = set a default vlaue if this value doesnt exist in obj



// const book = {
//     title: 'Shantarm',
//     author: 'Gregory David Roberts',
//     publisher: {
//         name: 'St Martins Griffen'
//     },
//     nest1: {
//         nest2 : {
//             nest3: {
//                 nest4: "inception!"
//             }
//         }
//     }
// };
//
// const {name: publisherName = 'self published'} = book.publisher;
// const { nest4 = 'empty'} = book.nest1.nest2.nest3;
// console.log(publisherName, nest4);

// array destructuring - allows us to pull items off an array. matches up by position rather than name

const address = ['10', 'Weasel Drive', 'Ohio', '14235' ];
// const address = [];
const [, city, state = 'New York'] = address;
console.log(`You are in ${state}`);

const item = ['coffee (hot)', '$2', '$2.50', '$2.75'];
const [thing,,medium] = item;
console.log(`a medium ${thing} costs ${medium}`);