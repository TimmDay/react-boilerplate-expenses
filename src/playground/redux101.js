import { createStore } from 'redux'; //import once to create the store


// const add = (data) => {
//     return data.a + data.b;
// };
// const add = ({ a , b }, c) => {
//     return a + b + c;
// };
// console.log(add({a: 1, b: 2}, 100));


// ACTIONS
// action generators - functions that return action objects
// very simple function that takes input in and returns new action object
// can set a default with = 1

//destructured object as arg -> get ket incrementBy for whatever obj arg is passed
// default of empty object if no arg passed
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy: decrementBy
});

const setCount = ({ count = store.getState().count} = {}) => ({
    type: 'SET',
    count: count
});

const resetCount = () => ({
    type: 'RESET'
});


// REDUCERS
// 1. reducers are pure functions - output is only determined by the input (state and action)
//      not even relying on variables outside of function scope
// 2. Never change state or action. just read off them, and return new state on new object

const countReducer = (state = { count : 0 }, action) => {
    // console.log('running');

    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
};


// a reducer! specifies how the state changes in response to an action
const store = createStore(countReducer);

//watch for changes to store, do something every time it changes
const unsubscribe = store.subscribe(()=> {
    console.log('STATE CHANGE');
    console.log(store.getState());
});

// the reutrn valure of store.subscribe is a func that we can use to unsubscribe later




// Actions - an object that gets sent to the store


store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 18}));
store.dispatch(setCount());
// unsubscribe();
store.dispatch(setCount({ count: 222 }));
store.dispatch(resetCount());


//advj of this over manually caling dispatch,
// is that typos are caught if we incorrectly call the function
// unsubscribe();



store.dispatch({
    type: 'DECREMENT',
    decrementBy: 10
});

store.dispatch({
    type: 'SET',
    count: 101
});

unsubscribe();


// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });