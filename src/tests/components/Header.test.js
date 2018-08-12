// react-test-renderer
import React from 'react';
import { shallow } from 'enzyme';
// import ReactShallowRenderer from 'react-test-renderer/shallow';

import Header from '../../components/Header';


test('should render Header correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();

    // expect(wrapper.find('h1').text()).toBe(" The Title! ");
    // expect(wrapper.find('h1').length).toBe(1); // we have only 1 h1 tag


    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
    // console.log(renderer.getRenderOutput());
});