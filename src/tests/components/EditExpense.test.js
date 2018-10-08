import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpense } from '../../components/EditExpense';


let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
        <EditExpense
            editExpense={editExpense}
            startRemoveExpense={startRemoveExpense}
            history={history}
            expense={expenses[2]}
        />);
});


test('should render edit expense page', () => {
    expect(wrapper).toMatchSnapshot();
});


test('should handle edit expense function', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});


test('should handle startRemoveExpense expense function', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
});