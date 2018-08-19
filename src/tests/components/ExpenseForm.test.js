import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';


test('should render ExpenseForm correctly', () => {
    const wrapper = shallow( < ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

// ExpenseForm uses a lib moment. because we have a mock of it in __mocks__, jest automatically uses that one instead for the tests

test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow( <ExpenseForm existingExpense={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});


test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    //first find the form element, then simulate submit
    // simulate the submission of event obj with preventDefault property
    // bc we didnt provide description, the error state triggers and local state will have a string under error
    expect(wrapper).toMatchSnapshot(); //makes sure that no error shows before a submit
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    // verify that things changed as expected
    expect(wrapper.state('error').length).toBeGreaterThan(0);

    //make sure error always renders correctly after bad info submit
    expect(wrapper).toMatchSnapshot();

    //airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html
});


test('should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = 'new description';
    // we want to match the first input (ind 0) which is onDescriptionChange
    wrapper.find('input').at(0).simulate('change', {
       target: {
           value: value
       }
    });
    expect(wrapper.state('description')).toBe(value);
});


test('should set note on textarea change', () => {
    const value = 'new note';
    const wrapper = shallow(<ExpenseForm />);
    // we want to match the first input (ind 0) which is onDescriptionChange
    wrapper.find('textarea').simulate('change', {
        target: {
            value: value
        }
    });
    expect(wrapper.state('note')).toBe(value);
});


test('should set amount if input valid', () => {
    const value = '22.15';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {
            value: value
        }
    });
    expect(wrapper.state('amount')).toBe(value);
});


test('should NOT set amount if input INvalid', () => {
    const value = '22.666';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {
            value: value
        }
    });
    expect(wrapper.state('amount')).toBe('');
});


test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm existingExpense={expenses[0]} onSubmit={onSubmitSpy}/>)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt,
    })
    // onSubmitSpy('Tim', "Melbourne");
    // expect(onSubmitSpy).toHaveBeenCalledWith('Timm', "Melbourne");

    // onSubmitSpy();
    // expect(onSubmitSpy).toHaveBeenCalled();

    //facebook.github.io/jest/docs/en/expect
});


test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm/>);

    //how to trigger the prop from SingleDatePicker
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set focus true when calenar is focused', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
});