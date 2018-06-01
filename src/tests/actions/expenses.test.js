import { addExpense, editExpense, removeExpense } from "../../actions/expenses";


test('should setup remove expense action object', () => {
   const action = removeExpense({ id: '123abc'});

   expect(action).toEqual({
       type: 'REMOVE_EXPENSE',
       id: '123abc'
   })
});


test('should setup up edit expense action object', () => {
    const action = editExpense('123abc', { note: 'a note here'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'a note here'
        }
    })
});


test('should setup add expense action object with provided values', () => {
    const data = {
        description: 'Rent',
        amount: 45000,
        createdAt: 1000,
        note: 'this is a note'
    };
    const action = addExpense(data);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...data,
            id: expect.any(String)
        }
    })
});


test('should setup add expense action obj with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    })
});