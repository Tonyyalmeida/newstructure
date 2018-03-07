import React from 'react';
import { observer, inject } from 'mobx-react';
import { LoadingDoubleHoc }  from "../services/LoadingDoubleHoc";
import { Link,  Redirect} from 'react-router-dom';
import axios from 'axios';
import WordDetailsRow from "../components/WordDetailsRow";

const WordlistDetailsComponent = inject('appStore')(observer(
  class WordlistDetailsComponent extends React.Component {
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
       <form onReset={()=> this.handleReset()} onSubmit={(e) => {this.handleSubmit(e)}}>
        <input type="checkbox" id="subscribeNews" name="subscribe" value="false" onChange={()=> this.props.appStore.currentListId[0].listStatus = !this.props.appStore.currentListId[0].listStatus} checked={this.props.appStore.currentListId[0].listStatus == 0 || this.props.appStore.currentListId[0].listStatus === undefined ? false : true}/>
      <label htmlFor="subscribeNews">Done Studying this List?</label>
         <div className="row uniform">
               <div className="3u 12u$(xsmall)">VN</div>
        <div className="3u 12u$(xsmall)">EN</div>
        <div className="4u 12u$(xsmall)">Example Use</div>
        <div className="2u 12u$(xsmall)">Status</div></div>
      {this.props.appStore.wordIds.map( (c, id) => (
        <WordDetailsRow vn={c.vn} en={c.en} exampleUse={c.exampleUse} status={c.status} wordId={c.wordId} arrayid={id} key={id}/>
      ))}
         <button type="submit" className="button submit">Save</button>
         <button type="reset" className="button">Cancel</button>
    <ul className="icons">
        <li><Link to={`/study/lists/` + this.props.appStore.currentListId.listId + "/" + this.props.appStore.currentListId.listName} 
        className="icon alt fa-play">
        <span className="label">Clear</span></Link></li> 
    </ul>
    </form>
      );
    }
    }
  }));


const WordlistDetails = LoadingDoubleHoc("wordIds", "currentListId" )(WordlistDetailsComponent);


export default WordlistDetails