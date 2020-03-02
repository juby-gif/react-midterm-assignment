import React, { Component } from 'react';
import { REGISTER_PAGE_ID,LIST_PAGE_ID,TREE_ARR } from './constants';
import './App.css';

export default class LoginView extends Component{
  constructor(props){
    super(props);
    let treeArr = JSON.parse(localStorage.getItem("Tree_Arr"));
    if(treeArr === "" || treeArr === null || treeArr === undefined){
      localStorage.setItem("Tree_Arr",JSON.stringify(TREE_ARR));
    }
    this.state={
      error:"",
      username:"",
      password:"",
      loggedInUserObj:null,

    }
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
  }
  onUsernameChange(event){
    this.setState({
      error:"",
    })
    this.setState({
      username:event.target.value,
    })
  }
  onPasswordChange(event){
    this.setState({
      error:"",
    })
    this.setState({
      password:event.target.value,
    })
  }
  onLoginClick(event){
    event.preventDefault();
    const { username,password } = this.state;

    let user = JSON.parse(localStorage.getItem("UserData"));
    let userDatum = {};
    let isFound = false;
    if(user === null || user === "" || user === undefined ){
      this.setState({
        error:"User doesn't Exists"
      })
    }
    else{
    for (userDatum of user) {
      if(username === userDatum.username && password === userDatum.password){
        this.setState({
          loggedInUserObj : userDatum,
        })
        localStorage.setItem("Logged-in-User",JSON.stringify(userDatum));
        isFound = true;
        break;
      }
    }
    if(isFound === true){
      alert("Logged in Successfully!")
      this.props.onPageChange(LIST_PAGE_ID);
    }
    else{
      this.setState({
        error:"Username or Password is incorrect!"
      })
    }

  }
}
  onRegisterClick(event){
    event.preventDefault();
    this.props.onPageChange(REGISTER_PAGE_ID);
  }
  render(){
    const { username,password,error } = this.state;
    return(
      <div className="login">
          <h1>Login</h1>
          <div className="validation-error" style={{marginLeft:"26%"}}>
              {error}
          </div>
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
          <button onClick={(event)=>{this.onLoginClick(event)}}>Login</button>
          <br />
          <br />
          <span style={{marginLeft:"30%"}}>New User? <a href="#" onClick={this.onRegisterClick}>Click Here</a> to Register</span>
      </div>
    );
  }
}
