
import slugify from 'slugify';
import shortid from 'shortid';

const TREE_KEY = "treeKey";

class Tree {
  constructor(name,scientificName,treeImageURL,seedImageURL,description){
    const slug = slugify(name.toLowerCase()) + "-" + shortid.generate();
    this.slug = slug;
    this.name = name;
    this.scientificName = scientificName;
    this.treeImageURL = treeImageURL;
    this.seedImageURL = seedImageURL;
    this.description = description;
  }
}
export default class TreeDAO {
  constructor(){
    const treeJSON = localStorage.getItem(TREE_KEY);
    const treeArr = JSON.parse(treeJSON);
    if(treeArr === undefined || treeArr === null || treeArr === ""){
      localStorage.setItem(TREE_KEY,JSON.stringify([]));
    }
  }
  getList(){
    const treeJSON = localStorage.getItem(TREE_KEY);
    const treeArr = JSON.parse(treeJSON);
    return treeArr;
  }
  addObjectList(name,scientificName,treeImageURL,seedImageURL,description){
    const treeArr = this.getList();
    const treeObj = new Tree(name,scientificName,treeImageURL,seedImageURL,description);
    treeArr.push(treeObj);
    localStorage.setItem(TREE_KEY,JSON.stringify(treeArr));
  }
  getTreeObj(slug){
    const treeArr = this.getList();
    console.log(treeArr)
    let treeObj;
    for(treeObj of treeArr){
      if (treeObj.slug === slug){
        console.log(treeObj)
        return treeObj;
      }
    }
  }
  onUpdateTree(slug,name,scientificName,treeImageURL,seedImageURL,description){
    alert(name)
    const treeArr = this.getList();
    let treeObj;
    for(treeObj of treeArr){
      if (treeObj.slug === slug){
        console.log(treeObj)
        treeObj.name = name;
        treeObj.scientificName = scientificName;
        treeObj.treeImageURL = treeImageURL;
        treeObj.seedImageURL = seedImageURL;
        treeObj.description = description;
        break;
      }
    }

    localStorage.setItem(TREE_KEY,JSON.stringify(treeArr));
    alert("Successfully Updated");
  }
}
