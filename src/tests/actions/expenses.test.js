import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {startAddExpense, addExpense, editExpense, removeExpense} from "../../actions/expenses";
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});

    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});


test('should setup up edit expense action object', () => {
    const action = editExpense('123abc', {note: 'a note here'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'a note here'
        }
    })
});

//todo change tests to account for thunk middleware and firebase db use

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});


test('should add expense to database AND store', () => {
    const store = createMockStore({});

    store.dispatch(startAddExpense())
});

test('should add expense with defaults to database AND store', () => {

});

// test('should setup add expense action obj with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0,
//             id: expect.any(String)
//         }
//     })
// });