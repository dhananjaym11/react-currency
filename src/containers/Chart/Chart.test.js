import { shallow } from 'enzyme';
import React from 'react';

import Chart from './Chart';

it('Render component', () => {
    const wrapper = shallow(<Chart />);
    expect(wrapper).toMatchSnapshot();
});