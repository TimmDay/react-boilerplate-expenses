import selectExpensesTotal from "../../selectors/expenses-total";
import expenses from '../fixtures/expenses';


test('should return zero if no expenses', () => {
    const response = selectExpensesTotal([]);
    expect(response).toBe(0);
});

test('should correctly add up a single expense', () => {
    const response = selectExpensesTotal([expenses[0]]);
    expect(response).toBe(195);
});


test('should correctly add up multiple expenses', () => {
    const response = selectExpensesTotal(expenses);
    expect(response).toBe(56083);
});