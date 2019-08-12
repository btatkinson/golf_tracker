import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

class ForgotPassword extends Component {

  constructor(props){
    this.state = {
      success: false
    }
  };

  submit = data => this.props.resetPasswordRequest(data).then(() =>
    this.setState({ success: true }));

  render() {
    return (
      <div>{this.state.success ?
        (<Message>Email has been sent.</Message>)
        :
        (<ForgotPasswordForm submit={this.submit} />)
      }</div>
    );
  }

}

ForgotPassword.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired,

}

export default ForgotPassword;
