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
     this.state = {redirect: false}
    }
  handleReset() {
  this.setState({redirect: true});
  }
  componentWillUnmount () {
  this.props.appStore.doneLoading = false;
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.appStore.updateListStatusByListId(this.props.appStore.currentListId[0]);
    var wordArray = [];
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28].forEach((a) => {wordArray.push(this.createWord(event, a))});
    axios.post('http://localhost:3101/words/words', wordArray).then(() => this.props.appStore.getWordsByListId(this.props.appStore.currentListId[0].listId))
  };
  createWord(event, index) {
  const createWordFactory = ({ vn, en, exampleUse, wordId, status }) => ({
    vn,
    en,
    exampleUse,
    wordId,
    status
  });
  const myWord = createWordFactory({
    vn: event.target[index].value, 
    en:  event.target[index+1].value, 
    exampleUse:  event.target[index+2].value, 
    wordId: event.target[index].getAttribute('wordid'), 
    status: event.target[index].getAttribute('status'),
  });
  return myWord;
  }
    render() {
      if (this.state.redirect) {
        return  <Redirect to={{
      pathname: '/home/' + "userId/" + this.props.appStore.userId,
    }}/>  
    }
      else {
      return (
        <div>
        <nav className="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li className="is-active"><a style={{fontWeight:"800"}}aria-current="page">{this.props.appStore.currentListId[0].listName}</a></li>
    <li><a aria-current="page">Edit</a></li>
  </ul>
</nav>
<div className="tile is-ancestor">
  <div className="tile is-vertical is-8">
    <div className="tile">
      <div className="tile is-parent is-vertical">
        <article className="tile is-child notification is-primary">
    <div className="button is-light">
    <span className="icon is-small">
      <i className="fas fa-edit"></i>
    </span>  
  </div>  <span>Edit List Name</span>
  <br/>  <br/>
  <div className="field">
  <input id="switchMedium" type="checkbox" name="switchMedium" className="switch is-medium"/>
  <label htmlFor="switchMedium">Status: Open</label>
</div>
        </article>
        </div></div></div></div>

     
       <form onReset={()=> this.handleReset()} onSubmit={(e) => {this.handleSubmit(e)}}>
       <div className="columns">
               <div className="column is-one-quarter">VN</div>
        <div className="column is-one-quarter">EN</div>
        <div className="column is-one-quarter">Example Use</div>
        <div className="column is-one-quarter">Status</div>
        </div>
      {this.props.appStore.wordIds.map( (c, id) => (
        <WordDetailsRow vn={c.vn} en={c.en} exampleUse={c.exampleUse} status={c.status} wordId={c.wordId} arrayid={id} key={id}/>
      ))}
         <button type="submit" className="button submit">Save</button>
         <button type="reset" className="button">Cancel</button>
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