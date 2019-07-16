import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  submit=(data)=>{
    console.log(data);
  }

  render(){
    return(
      <div>
        <LoginForm submit={this.submit}/>
      </div>
    )
  }
}







export default Login;
