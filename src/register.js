import React, { Component } from 'react';
import { LOGIN_PAGE_ID,REGISTER_PAGE_ID } from './constants';
import './App.css';

export default class LoginView extends Component{
  constructor(props){
    super(props);
    let user = JSON.parse(localStorage.getItem("UserData"));
    if(user === "" || user === null || user === undefined ){
      localStorage.setItem("UserData",JSON.stringify([]));
    }

    this.state={
      firstName:"",
      lastName:"",
      email:"",
      username:"",
      password:"",
      message : "",


    }
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
  }
  onFirstNameChange(event){
    this.setState({
      message:"",
    })
    this.setState({
      firstName:event.target.value,
    })
  }
  onLastNameChange(event){
    this.setState({
      message:"",
    })
    this.setState({
      lastName:event.target.value,
    })
  }
  onEmailChange(event){
    this.setState({
      message:"",
    })
    this.setState({
      email:event.target.value,
    })
  }
  onUsernameChange(event){
    this.setState({
      message:"",
    })
    this.setState({
      username:event.target.value,
    })
  }
  onPasswordChange(event){
    this.setState({
      message:"",
    })
    this.setState({
      password:event.target.value,
    })
  }
  onLoginPageClick(event){
    event.preventDefault();
    this.props.onPageChange(LOGIN_PAGE_ID);
  }
  onSubmitClick(event){
    event.preventDefault();
    const { username,password,firstName,lastName,email,message,user } = this.state;
    if(username ==="" || email ==="" || password ===""){
      let page = this.props.page
      this.setState({
        message : "Username, Email and Password is required!",
      })
      this.props.onPageChange(page);
    }
    else{
      let user = JSON.parse(localStorage.getItem("UserData"));
      const userDatum =
       { username: username,
         password : password,
         firstName: firstName,
         lastName : lastName,
         email : email
        }
      user.push(userDatum)
      localStorage.setItem("UserData",JSON.stringify(user));
      this.setState({
        message:"Successfully Registered",
      })
      alert("Successfully Registered");

      this.props.onPageChange(LOGIN_PAGE_ID);
    }

  }

  render(){
    const { username,password,firstName,lastName,email,message } = this.state;
    return(
      <div className="register">
              <h1>Register</h1>
              <br />
              {message === "Username, Email and Password is required!"?
              <span className="validation-error" style={{marginLeft:"36%"}}>{message}</span>
              :<span style={{color:'white',backgroundColor:"blue"}}>{message}</span>
              }

              <br />
              <br />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={ (event)=>{this.onFirstNameChange(event)}}
              />
              <br />
              <br />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={ (event)=>{this.onLastNameChange(event)}}
              />
              <br />
              <br />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={ (event)=>{this.onEmailChange(event)}}
              />
              <br />
              <br />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={ (event)=>{this.onUsernameChange(event)}}
              />
              <br />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={ (event)=>{this.onPasswordChange(event)}}
              />
              <br />
              <br />
              <button style={{marginLeft:"45%",padding:"0.3%",marginRight:"25%",marginTop:"3%",width:"10%"}} onClick={(event)=>{this.onSubmitClick(event)}}>Register</button>
              <br />
              <br />
              <button style={{marginLeft:"45%",padding:"0.3%",marginRight:"25%",marginTop:"3%"}} onClick={(event)=>{this.onLoginPageClick(event)}}>Already Registered?</button>
              <br />
              <br />

      </div>
    );
  }
}
