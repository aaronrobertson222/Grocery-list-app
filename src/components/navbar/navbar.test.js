import React from 'react';
import {shallow} from 'enzyme';

import Navbar from './navbar';

describe('<Navbar />', () => {
    it('Renders the component without crashing', () => {
        shallow(<Navbar />);
    });
});
