import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LoginForm.scss';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      data:{
        email:'',
        password:''
      },
      loading: false,
      errors: {}
    }
  }

  handleChange=(evt)=>{
    this.setState({
      data: {...this.state.data, [evt.target.name]: evt.target.value}
    })
  }

  onSubmit=(evt)=>{
    evt.preventDefault()
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0){
      this.props.submit(this.state.data)
    }
  }

  validate=(data)=>{
    const errors = {};
    if(!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if(!data.password) errors.password = "Can't be blank";
    if(data.password.length <= 6) errors.password = "Password must be more than 6 characters";
    return errors;
  }

  render(){
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="task">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="tiger_woods@gmail.com"
            onChange={this.handleChange}
            value={this.state.email}
            >
          </input>
          {this.state.errors.email && <InlineError text={this.state.errors.email} />}
          <label htmlFor="task">Password</label>
          <input
            id="password"
            name="password"
            type="text"
            placeholder="very-secure-password"
            onChange={this.handleChange}
            value={this.state.password}
            >
          </input>
          {this.state.errors.password && <InlineError text={this.state.errors.password} />}
          <button>Login</button>
        </form>
      </div>
    )
  }
};

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};


export default LoginForm;
