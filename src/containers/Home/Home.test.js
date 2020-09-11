import { shallow } from 'enzyme';
import React from 'react';

import Home from './Home';

it('Render component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
});