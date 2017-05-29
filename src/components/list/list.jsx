import React from 'react';
import cssModules from 'react-css-modules';


import styles from './list.css';

const List = () => {
    return (
      <div>
        <header styleName="list-header-container">
          <h1 styleName="list-header">
            List Title
          </h1>
        </header>
        <section styleName="list-container">
          <p>
            List Contents
          </p>
        </section>
      </div>
    );
};

export default cssModules(List, styles);
