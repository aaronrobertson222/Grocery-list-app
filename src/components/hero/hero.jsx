import React from 'react';
import cssModules from 'react-css-modules';

import styles from './hero.css';


const Hero = () => {
    return (
      <div styleName="hero-wrapper">
        <div styleName="hero">
          <h1 styleName="hero-header">Grocery lists made simpler.</h1>
          <img styleName="hero-img" src={require('images/Dashboard.png')} />
        </div>
      </div>
    );
};

export default cssModules(Hero, styles, { allowMultiple: true });
