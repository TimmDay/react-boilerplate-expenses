import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from "../../actions/expenses";
import expensesFixture from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

//before each test, sets fixture data as fake store.
// gets cleared and runs again, so each test starts from same place
beforeEach((done) => {
    const expensesData = {};
    expensesFixture.forEach( ({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref('expenses').set(expensesData)
        .then(() => done());
});



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
    const action = addExpense(expensesFixture[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expensesFixture[2]
    });
});


test('should add expense to database AND store', (done) => {
    const mockStore = createMockStore({});
    const expenseData = {
        description: 'headphones',
        amount: 3000,
        note: 'solid sound',
        createdAt: 2000
    };

    mockStore.dispatch(startAddExpense(expenseData))
        .then(() => {
            // check that action was dispatched to redux
            const actions = mockStore.getActions();
            // console.log(actions);
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });

            //check that firebase received and saved the data
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            // console.log(snapshot.val());
            expect(snapshot.val()).toEqual(expenseData);
            done();
        })
        .catch(() => {return 'error: test'});
});

test('should add expense with defaults to database AND store', () => {
    const mockStore = createMockStore({});
    const expenseExpectedDefaults = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };

    mockStore.dispatch(startAddExpense({}))
        .then(() => {
            // check that action was dispatched to redux
            const actions = mockStore.getActions();
            // console.log(actions);
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseExpectedDefaults
                }
            });

            //check that firebase received and saved the data
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        })
        .then((snapshot) => {
            // console.log(snapshot.val());
            expect(snapshot.val()).toEqual(expenseExpectedDefaults);
            done();
        })
        .catch(() => {return 'error: test'});
});


test('should setup set expense action object with data', () => {
    const action = setExpenses(expensesFixture);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses: expensesFixture
    })
});


test('should fetch the expenses from firebase', (done) => {
    const mockStore = createMockStore({});
    mockStore.dispatch(startSetExpenses())
        .then(() => {
            const actions = mockStore.getActions();
            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses: expensesFixture
            });
            done();
        });
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