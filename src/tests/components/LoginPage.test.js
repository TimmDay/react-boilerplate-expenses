import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

test('should render login page correctly', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
    const startLogin = jest.fn(); //create test spy (fake func)
    const wrapper = shallow(<LoginPage startLogin={startLogin} />); //make a fake rendered obj, with the spy func
    wrapper.find('button').simulate('click'); //simulate user activity
    expect(startLogin).toHaveBeenCalled(); //assert that the correct func was called on user activity
});
