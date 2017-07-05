import React from 'react';
import cssModules from 'react-css-modules';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import { fetchLogin, hideModal } from 'actions/index.actions';
import styles from './login.css';


class Login extends React.Component {

    formSubmitHandler(values) {
        const username = values.username;
        const password = values.password;
        this.props.fetchLogin(username, password);
    }

    render() {
        return (
            <div styleName="modal-wrapper">
                <button styleName="close-modal-button" onClick={this.props.hideModal.bind(this)}>&times;</button>
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
                    <p styleName="demo-account-section"><strong>Demo account info:</strong> <br /> Username: DemoUser <br /> Password: Password</p>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    fetchLogin: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isVisible: state.modal.isVisible,
});

export default connect(mapStateToProps, { fetchLogin, hideModal })(reduxForm({
    form: 'UserLogin',
})(cssModules(Login, styles, { allowMultiple: true })));
