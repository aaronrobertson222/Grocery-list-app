import React from 'react';
import cssModules from 'react-css-modules';

import styles from './about.css';

const About = () => {
    return (
      <div styleName="about">
        <section>
          <article styleName="about-section">
            <h1 styleName="about-section-header">One list for everyone.</h1>
            <p styleName="about-section-content">
              Lorem ipsum dolor sit ame, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </article>
        </section>
      </div>
    );
};

export default cssModules(About, styles, { allowMultiple: true });
