import React from 'react';
import {shallow} from 'enzyme';

import Dashboard from './dashboard';

describe('<Dashboard />', () => {
    it('Renders the component without crashing', () => {
        shallow(<Dashboard />);
    });
});
