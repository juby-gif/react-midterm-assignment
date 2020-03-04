import React, { Component } from 'react';
import LoginView from './login';
import RegisterView from './register';
import ListView from './list';
import DetailView from './view';
import UpdateView from './edit';
import CreateView from './create';
import { LOGIN_PAGE_ID,REGISTER_PAGE_ID,LIST_PAGE_ID,EDIT_PAGE_ID,VIEW_PAGE_ID,CREATE_PAGE_ID } from './constants';
import './App.css';
export default class AppNavigation extends Component{
  constructor(props){
    super(props);
    let page = localStorage.getItem("TreePage");
    const slug = JSON.parse(localStorage.getItem("Tree_Obj_id"));
    if(page === "" || page === null || page === undefined){
      page = LOGIN_PAGE_ID
    }
    this.state={
      page: page,
      slug:slug,

    }
    this.onPageChange=this.onPageChange.bind(this);
  }
  onPageChange(page,slug){
    this.setState({
      page:page,
      slug:slug,
    })
    localStorage.setItem("TreePage",page);
    localStorage.setItem("Tree_Obj_id",JSON.stringify(slug))
  }
  render(){
    const { page,slug } = this.state;
    return(
      <div>
          {page === LOGIN_PAGE_ID &&
              <LoginView onPageChange={this.onPageChange} page={page} />
          }
          {page === REGISTER_PAGE_ID &&
              <RegisterView onPageChange={this.onPageChange} page={page} />
          }
          {page === LIST_PAGE_ID &&
              <ListView onPageChange={this.onPageChange} />
          }
          {page === EDIT_PAGE_ID &&
              <UpdateView onPageChange={this.onPageChange} slug={slug}/>
          }
          {page === VIEW_PAGE_ID &&
              <DetailView onPageChange={this.onPageChange} slug={slug}/>
          }
          {page === CREATE_PAGE_ID &&
              <CreateView onPageChange={this.onPageChange} slug={slug}/>
          }

      </div>
    );
  }
}
