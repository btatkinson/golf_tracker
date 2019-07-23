import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import '../../styles/Login.scss';

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
    this.setState({ errors: errors });
    if (Object.keys(errors).length === 0){
      this.setState({ loading: true });
      this.props.submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
    }
  }

  validate=(data)=>{
    const errors = {};
    if(!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if(!data.password) errors.password = "Can't be blank";
    // if(data.password.length <= 5) errors.password = "Password must be more than 5 characters";
    return errors;
  }

  render(){
    return (
      <div>
        { this.state.loading ?
          (<div>
            <div className="preload">
                <div className="preload-status">
                    <div className="preload-status-bar"></div>
                    <div className="preload-status-info">LOADING</div>
                </div>
            </div>
          </div>) : (
            <div className="LF-login-form">
              <h1 className="LF-title">Login</h1>
              {this.state.errors.global && <InlineError text={`Something went wrong. ${this.state.errors.global}`} />}
              <form onSubmit={this.onSubmit}>
                <label className='LF-labels' htmlFor="task">Email</label>
                <input
                  className="LF-input"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="tiger_woods@gmail.com"
                  onChange={this.handleChange}
                  value={this.state.email}
                  >
                </input>
                <br></br>
                {this.state.errors.email && <InlineError text={this.state.errors.email} />}
                <label className='LF-labels' htmlFor="task">Password</label>
                <input
                  className="LF-input"
                  id="password"
                  name="password"
                  type="text"
                  placeholder="very-secure-password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  >
                </input>
                {this.state.errors.password && <InlineError text={this.state.errors.password} />}
                <br></br>
                <button className="LF-login-button">Login</button>
              </form>
            </div>
          )
        }
      </div>
    )
  }
};

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};


export default LoginForm;
