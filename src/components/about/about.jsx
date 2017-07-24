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
              Compiling a grocery lists for a family can be tough. Group List aims to make it less of a headache. Group Lists allows users to
              share and edit one grocery lists with their family, roommate or friends. Users can create lists, add and remove items, choose quantities, and share lists with
              others for them to edit.
            </p>
          </article>
        </section>
      </div>
    );
};

export default cssModules(About, styles, { allowMultiple: true });
