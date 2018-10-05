import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';


test('should correctly render the expenses summary with one expense', () => {
    const wrapper = shallow(
        < ExpensesSummary
            expenseCount={1}
            expensesTotal={235}
        />);
    expect(wrapper).toMatchSnapshot();
});


test('\'should correctly render the expenses summary with multiple expenses', () => {
    const wrapper = shallow(
        < ExpensesSummary
            expenseCount={23}
            expensesTotal={55555}
        />);
    expect(wrapper).toMatchSnapshot();
});