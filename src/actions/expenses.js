import uuid from "uuid"; // not needed when using firebase
import database from '../firebase/firebase';

// ADD_EXPENSE action generator


// gives us access to dispatch so we can use it inside inner func
// move defaults to async wrapper func
// firebase generates auto uuid
// returning that function only works because we set up redux thunk in the store

export const startAddExpense = (expenseData = {}) => {

    return (dispatch) => {
        // default values for object items for return object. destructured from expense data
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData; //defaults when arg has missing info

        const expense = {description, note, amount, createdAt};

        // db is the firebase connection. return allows us to chain the returned promise
        return database.ref('expenses').push(expense)
            .then((ref) => {
                dispatch(addExpense({ // cannot forget this, or redux store is out of date
                    id: ref.key,
                    ...expense
                }))
            });


        // dispatch(addExpense({ // the non-firebase way with uuid
        //     id: uuid(),
        //     ...expense
        // }));

    };
};

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});


// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});


// EDIT_EXPENSE
// updates is an object with updated fields for reducer
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});