import React, { Component } from 'react';
import { LIST_PAGE_ID } from './constants';
import './App.css';

export default class DetailView extends Component{
  constructor(props){
    super(props);
    let id = props.id;
    let treeArr = JSON.parse(localStorage.getItem("Tree_Arr"));
    let treeObj;
    for (treeObj of treeArr){
      if(treeObj.id === id){
        break;
      }
    }
    this.state = {
      treeArr : treeArr,
      id : id,
      name : treeObj.name,
      scientificName : treeObj.scientificName,
      treeImageUrl : treeObj.treeImageUrl,
      seedImageUrl : treeObj.seedImageUrl,
      shortDescription : treeObj.shortDescription,
    }
    this.onBackClick= this.onBackClick.bind(this);

}
onBackClick(event){
  event.preventDefault();
  this.props.onPageChange(LIST_PAGE_ID)
}

render(){
    const { treeArr,id,name,scientificName,treeImageUrl,seedImageUrl,shortDescription } = this.state;
    return(
      <div>

          <h1 style={{color:"beige",textShadow: "0 0 10px rgba(0,0,0,0.8)"}}>{name}</h1>
          <br /><br />
          <br />


          <center>
              <p><span style={{color:"blue"}}>Scientific name:</span> <b style={{color:"red"}}>{scientificName}</b></p>
              <br />
              <img src={treeImageUrl} alt={name} height="40%" width="40%" />
              <figcaption>{name}{"(Tree Image)"}</figcaption>
              <br />
              <br />
              <br />
              <img src={seedImageUrl} alt={name} height="40%" width="40%" />
              <figcaption>{name}{"(Seed Image)"}</figcaption>
              <br />
          </center>
          <p style={{margin:"2%"}}><b>Description:</b><p style={{marginLeft:"3%",marginRight:"3%"}} dangerouslySetInnerHTML={{__html: this.state.shortDescription}} /></p>


          <button style={{width:"5%",margin:"2%"}} onClick={(event)=>this.onBackClick(event)}>Back</button>

      </div>
    );
  }
}
