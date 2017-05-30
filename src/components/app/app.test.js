import React from 'react';
import {shallow} from 'enzyme';

import App from './app';

describe('<App />', () => {
    it('Renders the component without crashing', () => {
        shallow(<App />);
    });
});
