// ACTION
import database from '../firebase/firebase';
import uuid from "uuid"; // not needed when using firebase


// gives us access to dispatch so we can use it inside inner func
// move defaults to async wrapper func
// firebase generates auto uuid
// returning that function only works because we set up redux thunk in the store

//
export const startAddExpense = (expenseData = {}) => {

    return (dispatch, getState) => {
        const uid = getState().auth.uid; //get the logged in users uid for use in db calls

        // default values for object items for return object. destructured from expense data
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData; //defaults when arg has missing info

        const expense = {description, note, amount, createdAt};

        // db is the firebase connection. return allows us to chain the returned promise
        return database.ref(`users/${uid}/expenses`).push(expense)
            .then((ref) => {
                dispatch(addExpense({ // cannot forget this, or redux store is out of date
                    id: ref.key,
                    ...expense
                }))
            });
    };
};
// dispatch(addExpense({ // the non-firebase way with uuid
//     id: uuid(),
//     ...expense
// }));

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});



export const startRemoveExpense = ({ id='' } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove()
            .then(() => {
                dispatch(removeExpense({id})); //update store
            })
    }
};
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});


// EDIT_EXPENSE updates is an object with updated fields for reducer
//update is like set, but doesnt overwrite the parts we dont touch
export const startEditExpense = (id='', updates={}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates)
            .then(() => {
                dispatch(editExpense(id,updates));
            })
    }
};
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});




// ACTIONS FOR FETCH FROM DB

//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// for persisting data saved from a previous session
export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        // console.log(database.ref('expenses').once('value')); //todo
        //fetch all expense data once, from firebase. return for the promise

        return database.ref(`users/${uid}/expenses`).once('value')
            .then((dataSnapshot) => {

                const dbExpenses = [];
                dataSnapshot.forEach((childSnapshot) => {
                    // console.log(childSnapshot.key); //todo
                    // console.log(childSnapshot.val()); //todo
                    dbExpenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                });

                dispatch(setExpenses(dbExpenses)); //dispatch set expenses
            });
    }
};