import React from 'react';
import { observer, inject } from 'mobx-react';
import { LoadingDoubleHoc }  from "../services/LoadingDoubleHoc";
import { Link,  Redirect, withRouter} from 'react-router-dom';
import axios from 'axios';
import WordDetailsRow from "../components/WordDetailsRow";

const WordlistDetailsComponentOriginal = inject('appStore')(observer(
  class WordlistDetailsComponentOriginal extends React.Component {
    constructor(props) {
      super(props);
      this.createWord = this.createWord.bind(this);
      this.handeSubmit = this.handleSubmit.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.toggleFromStudy = this.toggleFromStudy.bind(this);
     this.state = {redirect: false, editing: false, fromStudy: false, successCounter: 0, lengthCounter: 0}
    }
  handleReset() {
  this.setState({redirect: true});
  }
  handleResetEdit() {
    this.setState({editing: false});
    }  
  toggleNav = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }
  toggleFromStudy = () => {
    this.setState(prevState => ({
      fromStudy: !prevState.fromStudy
    }))
  }
  componentWillMount () {
  if (this.props.history.location.state) 
  this.setState({fromStudy: this.props.history.location.state.done, lengthCounter:this.props.history.location.state.lengthCounter,  successCounter: this.props.history.location.state.successCounter});
      }
    componentWillUpdate () {
      this.props.appStore.currenListId = [];
      this.props.appStore.setDoneCreatingList(false);
        }
  componentWillUnmount () {
  this.props.appStore.doneLoading = false;
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.appStore.updateListStatusByListId(this.props.appStore.currentListId[0]);
    var wordArray = [];
    [0, 4, 8, 12, 16, 20, 24, 28, 32, 36].forEach((a) => {wordArray.push(this.createWord(event, a))});
    axios.post('http://localhost:3101/words/words', wordArray, {headers: {"Authorization": this.topicoToken}}).then(() => this.props.appStore.getWordsByListId(this.props.appStore.currentListId[0].listId))
  };
  createWord(event, index) {
  const createWordFactory = ({ vn, en, exampleUseVn, exampleUseEn, wordId, status }) => ({
    vn,
    en,
    exampleUseVn,
    exampleUseEn,
    wordId,
    status
  });
  const myWord = createWordFactory({
    en: event.target[index].value,
    exampleUseEn:  event.target[index+1].value,    
    vn:  event.target[index+2].value, 
    exampleUseVn:  event.target[index+3].value,    
    wordId: event.target[index].getAttribute('wordid'), 
    status: event.target[index].getAttribute('status'),
  });
  return myWord;
  }
    render() {
      if (this.state.redirect) {
        return  <Redirect to={{
      pathname: '/home/userId/' + this.props.appStore.userId + "/lists/" + this.props.appStore.currentListId[0].listId + '/edit'
    }}/>  
    }
      else {
      return (
        <div>
        <nav className="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li className="is-active"><a style={{fontWeight:"800"}} aria-current="page">{this.props.appStore.currentListId[0] ? this.props.appStore.currentListId[0].listName : "placeholder"}</a></li>
    <li><a aria-current="page">Edit</a></li>
  </ul>
</nav>
{this.state.fromStudy ? <div className="columns">
<div className="column is-8">
<div className="notification is-info">
  <button onClick={this.toggleFromStudy} className="delete"></button>
  <p className="title">Finished!</p>
  <p>You knew {this.state.successCounter} out of {this.props.appStore.studyWordIds.length}</p>
  <p>If you feel you know this list by heart, you can close this list.</p>
</div></div></div> : null}
<div className="tile is-ancestor">
  <div className="tile is-vertical is-8">
    <div className="tile">
      <div className="tile is-parent is-vertical">
        <article className="tile is-child notification is-primary">
      {this.state.editing ? (  <form onReset={(e) => {e.preventDefault();this.handleResetEdit()}} onSubmit={(e) => {e.preventDefault(); this.props.appStore.currentListId[0].listName = e.target[0].value; this.props.appStore.updateListNameByListIdAndRefresh(this.props.appStore.currentListId[0].listId, e.target[0].value.toString(0));this.toggleNav ()}} >  <div className="field"><div className="control">
       <input className="input" type="text" name="demo-name1" id="demo-name1" defaultValue={this.props.appStore.currentListId[0].listName} placeholder="VN" />
    </div>  <div className="field is-grouped"> <p className="control">
  <button type="submit" className="button submit is-link">Save</button></p><p className="control">
  <button type="reset" className="button is-light">Cancel</button>
  </p></div>
    </div> </form>  ): <div onClick={this.toggleNav} className="button is-light">
    <span className="icon is-small">
      <i className="fas fa-edit"></i>
    </span>    <span>Edit List Name</span>
      </div>  }
  <br/><br/>
  <Link to={"/home/userId/" + this.props.appStore.userId +  "/lists/" + this.props.appStore.currentListId[0].listId + "/study"} className="button is-light">
    <span className="icon is-small">
      <i className="fas fa-play"></i>
    </span><span>Study this List</span>
  </Link> 
  <br/>  <br/>
  <div className="field"><span className="tooltip is-tooltip-bottom is-tooltip-multiline" data-tooltip="Status of this list. Should be set to close when you know all words in this list">
  <input id="switchColorWarning" onChange={()=> {this.props.appStore.currentListId[0].listStatus == "0" ?  this.props.appStore.currentListId[0].listStatus = "1" : this.props.appStore.currentListId[0].listStatus = "0";  this.props.appStore.updateListStatusByListIdAndRefresh(this.props.appStore.currentListId[0]); }} 
  checked={this.props.appStore.currentListId[0].listStatus == "0" || this.props.appStore.currentListId[0].listStatus === undefined ? false : true}
   type="checkbox" name="switchColorWarning" className="switch is-medium is-dark"/>
  <label htmlFor="switchColorWarning">Status: {this.props.appStore.currentListId[0].listStatus == "0" || this.props.appStore.currentListId[0].listStatus === undefined ? "Open":  "Closed" } </label>
</span>
</div>
        </article>
        </div></div></div></div><hr/>

    
       <form onReset={()=> this.handleReset()} onSubmit={(e) => {this.handleSubmit(e)}}>
       <div className="columns tableheaders">
               <div className="column is-2">EN</div>
               <div className="column is-3" >Example EN</div>
        <div className="column is-2">VN</div>
        <div className="column is-3">Example VN</div>
        <div className="column is-2 tooltip is-tooltip-left is-tooltip-multiline" data-tooltip="The Status shows how well you know a word already. When studying a list, the number get incremeneted if you have successfully checked off a word. Everytime you don't know a word, the number gets decremented.">Status</div>
        </div>
      {this.props.appStore.wordIds.map( (c, id) => (
        <WordDetailsRow vn={c.vn} en={c.en} exampleUseVn={c.exampleUseVn ? c.exampleUseVn : "" } exampleUseEn={c.exampleUseEn ? c.exampleUseEn : c.exampleUse } status={c.status} wordId={c.wordId} arrayid={id} key={id}/>
      ))}
      <div className="field is-grouped">
  <p className="control">
  <button type="submit" className="button submit is-link">Save</button>
  </p>
  <p className="control">
  <button type="reset" className="button is-light">Cancel</button>
  </p>
  </div>
    <ul className="icons">
        <li><Link 
        to={"/home/userId/" + this.props.appStore.userId + "/lists/" + this.props.appStore.currentListId[0].listId + "study"}
        className="icon alt fa-play">
        <span className="label"></span></Link></li> 
    </ul>
    </form>


    </div>
      );
    }
    }
  }));

const WordlistDetailsComponent = withRouter(WordlistDetailsComponentOriginal);
const WordlistDetails = LoadingDoubleHoc("wordIds", "currentListId" )(WordlistDetailsComponent);


export default WordlistDetails