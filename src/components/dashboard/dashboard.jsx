import React from 'react';
import cssModules from 'react-css-modules';

import styles from './dashboard.css';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
              Dashboard
            </div>
        );
    }
}

export default cssModules(Dashboard, styles);
