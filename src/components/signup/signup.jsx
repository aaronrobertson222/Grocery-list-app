import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import { createUser, clearError } from 'actions/index.actions';

import styles from './signup.css';

class Signup extends React.Component {
    componentWillMount() {
        this.props.clearError();
    }
    componentWillUnmount() {
        this.props.clearError();
    }
    formSubmitHandler(values) {
        const username = values.username;
        const password = values.password;
        const firstName = values.firstName;
        const lastName = values.lastName;
        this.props.createUser(username, password, firstName, lastName);
    }

    render() {
        return(
          <div styleName="form-container">
              <h1 styleName="form-header">Get Started!</h1>
              <form styleName="form" onSubmit={this.props.handleSubmit(this.formSubmitHandler.bind(this))}>
                <div styleName="form-group">
                  <label htmlFor="username" styleName="form-input-label">Username</label>
                  <br />
                  <Field name="username" component="input" type="text" placeholder="username" styleName="form-input" required />
                </div>
                <div styleName="form-group">
                  <label htmlFor="password" styleName="form-input-label">Password</label>
                  <br />
                  <Field name="password" component="input" type="password" placeholder="password" styleName="form-input" required />
                </div>
                <div styleName="form-group">
                  <label htmlFor="firstName" styleName="form-input-label">First Name</label>
                  <br />
                  <Field name="firstName" component="input" type="text" placeholder="First Name" styleName="form-input" />
                </div>
                <div styleName="form-group">
                  <label htmlFor="firstName"styleName="form-input-label">Last Name</label>
                  <br />
                  <Field name="lastName" component="input" type="text" placeholder="Last Name" styleName="form-input"/>
                </div>
                <button type="submit" styleName="form-submit-button">Sign Up!</button>
                {this.props.signupError && <p styleName="form-error">{this.props.signupError}</p>}
              </form>
          </div>
        );
    }
}

Signup.propTypes = {
    createUser: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    signupError: PropTypes.string,
};

const mapStateToProps = state => ({
    signupError: state.user.error,
});


export default connect(mapStateToProps, { createUser, clearError })(reduxForm({
    form: 'NewUser'
})(cssModules(Signup, styles, { allowMultiple: true })));
