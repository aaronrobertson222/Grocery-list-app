import React from 'react';
import {shallow} from 'enzyme';

import Sidebar from './sidebar';

describe('<Sidebar />', () => {
    it('Renders the component without crashing', () => {
        shallow(<Sidebar />);
    });
});
