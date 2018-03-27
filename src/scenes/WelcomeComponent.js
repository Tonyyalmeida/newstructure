import React from 'react';
import { observer, inject } from 'mobx-react';
import { LoadingDoubleHoc }  from "../services/LoadingDoubleHoc";
import { Link,  Redirect, withRouter} from 'react-router-dom';
import axios from 'axios';
import WordDetailsRow from "../components/WordDetailsRow";
import CreateWordlist from "../components/CreateWordlist";

const WelcomeComponent = inject('appStore')(observer(
  class WelcomeComponent extends React.Component {
    constructor(props) {
      super(props);
     this.state = {redirect: false, editing: false}
    }
    render() {
      console.log(this.props.appStore.numberOfClosedLists);
      return (
        <div>
        <nav className="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li className="is-active"><a style={{fontWeight:"800"}}aria-current="page">Home</a></li>
  </ul>
</nav>
<div className="tile is-ancestor">

<div className="tile is-vertical is-9">
  <div className="tile is-parent">
        <article className="tile is-child notification is-primary">
          <p className="title">Welcome {this.props.appStore.userName}!</p>
          <p>Topico will help you to accomplishment your goals!</p>
        </article>
      </div>
    <div className="tile is-parent">
      <article className="tile is-child is-warning notification">
<div><br/>
<p className="subtitle" style={{fontStyle:"oblique"}}>"Success is no accident. It is hard work, perseverance, learning, studying and sacrifice.
Repetition is the mother of learning, the father of action, which makes it the architect of accomplishment."</p>
<br/>
</div>
      
      </article></div> 



</div>
        </div>



            </div>
      )
    }
    }));

// const WordlistDetailsComponent = withRouter(WordlistDetailsComponentOriginal);
// const WordlistDetails = LoadingDoubleHoc("wordIds", "currentListId" )(WordlistDetailsComponent);
{/* <p className="title">{this.props.appStore.numberOfClosedLists}</p>
<p className="title">{this.props.appStore.numberOfOpenLists}</p> */}

export default WelcomeComponent