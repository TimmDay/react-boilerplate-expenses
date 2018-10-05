import expensesReducer from '../../reducers/expenses';
import test_expenses from '../fixtures/expenses';


// default state gets set correctly
test('should set default state expense reducer', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' }) ;
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = { type: 'REMOVE_EXPENSE', id: test_expenses[1].id };
    const state = expensesReducer(test_expenses, action);
    expect(state).toEqual([test_expenses[0], test_expenses[2]])
});

test('should not remove expenses if id not given', () => {
    const action = { type: 'REMOVE_EXPENSE', id: -1 };
    const state = expensesReducer(test_expenses, action);
    expect(state).toEqual(test_expenses); //unchanged array
});

test('should add an expense', () => {
    const freshExpense = {
        id: '42',
        description: 'life universe',
        note: '',
        createdAt: 20000,
        amount: 29500
    };

    const action = {
        type: 'ADD_EXPENSE',
        expense: freshExpense
    };
    const state = expensesReducer(test_expenses, action);

    expect(state).toEqual([...test_expenses, freshExpense])
});

test('should edit an expense with valid id', () => {
    const amount =42;
    const action = {
        type: 'EDIT_EXPENSE',
        id: test_expenses[1].id,
        updates: {
            amount
        }
    };
    const state = expensesReducer(test_expenses, action);
    expect(state[1].amount).toBe(amount);
});

test('should NOT edit an expense with invalid id', () => {
    const amount =42;
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            amount
        }
    };
    const state = expensesReducer(test_expenses, action);
    expect(state).toEqual(test_expenses);
});

// should remove existing expenses
    //first add some
// should add provided expenses
test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [test_expenses[1]]
    };
    //passing in all expenses, but we expect just the single one back
    const state = expensesReducer(test_expenses, action);
    expect(state).toEqual([test_expenses[1]]);
});