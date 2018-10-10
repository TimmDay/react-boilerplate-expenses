import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'; //css for the date picker
import { firebase } from './firebase/firebase';


const store = configureStore();

// Provider comp requires a prop that references our store that we have set up
const jsx = (
    <Provider store={store}>
        < AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

// loading window when we are waiting for db return
ReactDOM.render(<p>loading...</p>, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
    if (user) { //if logged in according to firebase auth.. (inc implicitly logged in from earlier)
        store.dispatch(login(user.uid)); // tell store, this user already logged in
        store.dispatch(startSetExpenses()).then(() => { // fetch users expenses
            renderApp();
            if (history.location.pathname === '/') { //if on login page, redirect to dash
                history.push('/dashboard');
            }
        });

    } else { //not logged in
        store.dispatch(logout());
        renderApp();
        history.push('/'); //all logged out users to login page always
    }
});

// block user url nav to other pages, even if logged out
// router can run authentication check before rendering the specific component





// store.dispatch(startAddExpense({description: 'bananas', amount: 200}));
// store.dispatch(startAddExpense({description: 'bananas bill', amount: 250}));
// store.dispatch(startAddExpense({description: 'water bill', amount: 4000, createdAt: 2525}));
// store.dispatch(startAddExpense({description: 'rent', amount: 80000}));
// store.dispatch(startAddExpense({description: 'gas bill', amount: 1000, createdAt: 3000}));
// store.dispatch(setTextFilter('bill'));
// console.log(store.getState());



// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         console.log(user, ' logged out');
//     } else {
//         console.log(user, ' logged out');
//     }
// });


// import validator from 'validator';
//
// console.log(validator.isEmail('timmday.info@gmail.com'));
// console.log(validator.isEmail('ahhhhhhhhhhhh!!!!'));


// browser router - create the new router
// route - for nav to new page

// define individual routes with ROute. need some props
// path, the url when it is seen load the component
//   / is the path to the root
// the point of a router is to have multiple pages
// API for BrowserRouter expects child to have length of 1 - so need div

// original http request needs to happen before clientside routing
// tweak dev-server config. send back index.html for all routes
// get 404, server sees that, sees historyApiFallback: true, load bundle, read code, so gets the url and renders component

// switch makes the ruter go through the list, and STOP on a match (nice)

//link between pages, without full page refresh (server comm):
// must override default browser behaviour
// react-router gives us components for client-side rendering

// external link, still use anchor tag. But internally, use Link

//NavLink is for navigation. same as Link but with special extras


// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);