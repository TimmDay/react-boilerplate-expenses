import React from 'react';
import { shallow } from 'enzyme';
import { AddExpense } from "../../components/AddExpense";
import expenses from '../fixtures/expenses';


// build the test stuff before each test case. reuse spies and wrappers for eac test
let startAddExpense, history, wrapper;
beforeEach(() => {
    startAddExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpense startAddExpense={startAddExpense} history={history}/>);
});


// the comp needs two props
test('should render add expense correctly', () => {
    expect(wrapper).toMatchSnapshot();
});


test('should handle onSubmit', () => {
    // const onSubmit = jest.fn();
    // const history = { push: jest.fn() };
    // const wrapper = shallow(<AddExpense startAddExpense={onSubmit} history={history}/>);
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]); //call it with an expense data to submit
    expect(history.push).toHaveBeenLastCalledWith('/dashboard');
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);

});