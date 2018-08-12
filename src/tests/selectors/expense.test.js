import selectExpenses from '../../selectors/expenses';
import moment from 'moment';
import test_expenses from '../fixtures/expenses';


test('should filter visible expenses by test value', () => {
    const filters = {
      text: 'e',
      sortBy: 'date',
      startDate: undefined,
      endDate: undefined
    };

   const result = selectExpenses(test_expenses, filters);

   expect(result).toEqual([test_expenses[2], test_expenses[1]])
});


test('should filter by start date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };

    const result = selectExpenses(test_expenses, filters);

    expect(result).toEqual([test_expenses[2],test_expenses[0]])
});


test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    };

    const result = selectExpenses(test_expenses, filters);
    expect(result).toEqual([test_expenses[0],test_expenses[1]])
});


test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    const result = selectExpenses(test_expenses, filters);
    expect(result).toEqual([test_expenses[2],test_expenses[0],test_expenses[1]])

});

test('should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(test_expenses, filters);
    expect(result).toEqual([test_expenses[1],test_expenses[2],test_expenses[0]])

});