import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class SignupForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: {
        email: '',
        password: '',
      },
      loading:false,
      errors:{}
    }
  };

  handleChange=(evt)=>{
    this.setState({
      data: {...this.state.data, [evt.target.name]: evt.target.value}
    })
  };

  onSubmit=(evt)=>{
    evt.preventDefault()
    const errors = this.validate(this.state.data);
    this.setState({ errors: errors });
    if (Object.keys(errors).length === 0){
      this.setState({ loading: true });
      this.props.submit(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
    }
  };

  validate=(data)=>{
    const errors = {};
    if(!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if(!data.password) errors.password = "Can't be blank";
    // if(data.password.length <= 5) errors.password = "Password must be more than 5 characters";
    return errors;
  };

  render() {
    const { data, loading, errors } = this.state;
    return (
      <div>
        { loading ?
          (<div>
            <div className="preload">
                <div className="preload-status">
                    <div className="preload-status-bar"></div>
                    <div className="preload-status-info">LOADING</div>
                </div>
            </div>
          </div>) : (
        <form onSubmit={this.onSubmit}>
          <label className='SU-labels' htmlFor="email">Email</label>
          <input
            className="SU-input"
            id="email"
            name="email"
            type="text"
            placeholder="tiger_woods@gmail.com"
            onChange={this.handleChange}
            value={data.email}
            >
          </input>
          <br></br>
          {errors.email && <InlineError text={errors.email} />}
          <label className='SU-labels' htmlFor="task">Password</label>
          <input
            className="SU-input"
            id="password"
            name="password"
            type="text"
            placeholder="very-secure-password"
            onChange={this.handleChange}
            value={data.password}
            >
          </input>
          {errors.password && <InlineError text={errors.password} />}
          <br></br>
          <button>Sign Up</button>
        </form> )
        }
      </div>
    );
  };
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
