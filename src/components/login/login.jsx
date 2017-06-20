import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import { fetchLogin } from 'actions/index.actions';
import styles from './login.css';


class Login extends React.Component {

    formSubmitHandler(values) {
        const username = values.username;
        const password = values.password;
        this.props.fetchLogin(username, password);
    }

    render() {
        return(
          <div styleName="login-form-wrapper">
            <form styleName="login-form" onSubmit={this.props.handleSubmit(this.formSubmitHandler.bind(this))}>
              <h1 styleName="form-header">Login</h1>
              <div styleName="form-group">
                <label htmlFor="username" styleName="form-input-label">Username</label>
                <br />
                <Field name="username" component="input" type="text" placeholder="password" styleName="form-input" required />
              </div>
              <div styleName="form-group">
                <label htmlFor="password" styleName="form-input-label">Password</label>
                <br />
                <Field name="password" component="input" type="password" placeholder="password" styleName="form-input" required />
              </div>
              <button type="submit" styleName="form-submit-button">Login</button>
            </form>
          </div>
        );
    }
}

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    fetchLogin: PropTypes.func.isRequired
};

export default connect(null, { fetchLogin })(reduxForm({
    form: 'UserLogin'
})(cssModules(Login, styles, { allowMultiple: true})));
