import React from 'react';
import {shallow} from 'enzyme';

import Hero from './Hero';

describe('<Hero />', () => {
    it('Renders the component without crashing', () => {
        shallow(<Hero />);
    });
});
