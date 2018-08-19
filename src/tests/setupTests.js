// for configuring the enzyme adapter
// when enzyme (airbnb.io/enzyme) runs render tests, it configures here
// but we still need a jest (jest configuration docs) file to tell this to run

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter()
});