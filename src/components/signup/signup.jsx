import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { createUser } from 'actions/index.actions';

import styles from './signup.css';

class Signup extends React.Component {
    submitHandler(values) {
        const username = values.name;
        const password = values.password;
        const firstName = values.firstName;
        const lastName = values.lastName;
    }

    render() {
        return(
          <div styleName="new-user-form">
              <h1>Sign Up</h1>
              <form>
                <div styleName="form-group">
                  <label htmlFor="username">Username</label>
                  <Field name="username" component="input" type="text" placeholder="username" required />
                </div>
                <div styleName="form-group">
                  <label htmlFor="password">Password</label>
                  <Field name="password" component="input" type="text" placeholder="password" required />
                </div>
                <div styleName="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field name="firstName" component="input" type="text" placeholder="First Name" />
                </div>
                <div styleName="form-group">
                  <label htmlFor="firstName">Last Name</label>
                  <Field name="lastName" component="input" type="text" placeholder="Last Name" />
                </div>
              </form>
          </div>
        );
    }
}

Signup.propTypes = {

};

const mapStateToProps = state => ({

})

export default connect(mapDispatchToProps, { createUser })(reduxForm({
    form: 'NewUser'
}))(cssModules(Signup, styles, { allowMultiple: true}));
