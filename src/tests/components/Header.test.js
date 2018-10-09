// react-test-renderer
import React from 'react';
import { shallow } from 'enzyme'; // released by airbnb. is a full-featured renderer for testing
// import ReactShallowRenderer from 'react-test-renderer/shallow';

import { Header } from '../../components/Header';


test('should render Header correctly', () => {
    // shallow render the header
    const wrapper = shallow(<Header startLogout={() => { }} />);
    expect(wrapper).toMatchSnapshot();
    // will update snap (with u in test suite) then compares future renders to this
    // expect(wrapper.find('h1').text()).toBe(" The Title! ");
    // expect(wrapper.find('h1').length).toBe(1); // we have only 1 h1 tag
});

test('should call startLogout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('button').simulate('click');

    expect(startLogout).toHaveBeenCalled();
});

//todo update readme
// yarn add enzyme
// enzyme-adaptor-react-16
// raf (request animation frame)