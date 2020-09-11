import { shallow } from 'enzyme';
import React from 'react';

import Conversions from './Conversions';

it('Render component', () => {
    const wrapper = shallow(<Conversions />);
    expect(wrapper).toMatchSnapshot();
});