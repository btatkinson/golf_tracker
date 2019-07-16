import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  submit = data => this.props.login(data).then(()=>this.props.history.push("/"));

  render(){
    return(
      <div>
        <LoginForm submit={this.submit}/>
      </div>
    )
  }
}


Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(Login);
