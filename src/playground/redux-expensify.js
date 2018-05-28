import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


// ACTIONS
// ADD_EXPENSE action generator
const addExpense = (
        {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = {}
    ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});
// REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text,
});

// SORT_BY_DATE
const sortByDate = () => ({
   type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
});

// SET_START_DATE
const setStartDate = (date = undefined) => ({
    type: 'SET_START_DATE',
    date
});

// SET_END_DATE
const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
});


// REDUCERS manage changes to state

// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            //code that adds expense to the array
            // do not change the original array, so no push
            // return state.concat(action.expense);
            return [
                ...state,
                action.expense
            ];

        case 'REMOVE_EXPENSE' :
            // const newArr = [];
            // state.forEach((item) => {
            //     if (item.id !== action.id){
            //         newArr.push(item);
            //     }
            // });
            // return newArr;

            return state.filter(({ id }) => id !== action.id );

        case 'EDIT_EXPENSE':
            // go through array for match
            // when found, correctly change it

            return state.map((ex) => {
                if (ex.id === action.id) {
                    //return edited object
                    return {
                        ...ex,
                        ...action.updates
                        // action updates is whatever was called in the dispatch
                        // will override
                    }

                } else {
                    return ex;
                }
            });


        default:
            return state;
    }
};

// Filters Reducer
const filtersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersDefaultState, action) => {
    switch(action.type) {

        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };

        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };

        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };

        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            };

        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            };

        default:
            return state;
    }
};


// GET visibile expenses
//combine the two stores to display only filtered data
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate }) => {

    return expenses.filter((expense) => {
        // if typeof not number, say true (so that it has no effect)
        // true items are not filtered
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {

            return a.createdAt < b.createdAt ? 1 : -1;

            //most recent first. so the -1 goes to the highest number

        } else if (sortBy === 'amount') {

            return a.amount < b.amount ? 1 : -1;

        }
    })
};



// STORE creation
// tracks the state (the thing returned when an action is processed by the reducer
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

// filtering happens here, by running it as a function over state
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);

});



const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 1000, createdAt: -1000}));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: -100}));
const expenseThree = store.dispatch(addExpense({ description: 'book', amount: 1500, createdAt: 1500}));


// store.dispatch(removeExpense({id: expenseOne.expense.id }));
// store.dispatch(removeExpense({id: expenseThree.expense.id }));
// store.dispatch(removeExpense());
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
//
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
//
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

store.dispatch(setStartDate(-9000));
// store.dispatch(setStartDate());
//
store.dispatch(setEndDate(11100));
// store.dispatch(setEndDate());

store.dispatch(setTextFilter());

store.dispatch(sortByAmount());

// now we can get the id by expenseOne.expense.id, and use it to delete the expense from the store




//amount is in cents
//createAt timestamp format:
const demoState = {
    expenses: [{
      id: 'random',
      description: 'default desc',
      note : 'this was the final payment',
      amount: 45000,
      createdAt: 0
    }],

    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// ES^ spread op with objects
// const user = {
//     name: 'KLowe',
//     age: 29
// };
// console.log({
//     ...user,
//     location: 'Tü'
// });
//
// console.log({
//     ...user,
//     age: 30
// });
//
// // must put the spread before changing, otherwise the spread will override the changes back to original
// console.log({
//     age: 30,
//     ...user,
// });

