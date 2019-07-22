import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import '../../styles/Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  submit = data => this.props.login(data).then(()=>this.props.history.push("/"));

  render(){
    return(
      <div>
        <div className="LF-page">
          <div className="LF-form-container">
            <LoginForm submit={this.submit}/>
          </div>
        </div>
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
