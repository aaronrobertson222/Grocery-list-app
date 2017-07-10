import React from 'react';
import {shallow} from 'enzyme';

import Signup from './signup';

describe('<Signup />', () => {
    it('Renders the component without crashing', () => {
        shallow(<Signup />);
    });
});
