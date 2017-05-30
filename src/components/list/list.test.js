import React from 'react';
import {shallow} from 'enzyme';

import List from './list';

describe('<List />', () => {
    it('Renders the component without crashing', () => {
        shallow(<List />);
    });
});
