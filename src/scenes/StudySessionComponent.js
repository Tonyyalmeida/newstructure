import React from 'react';
import { observer, inject } from 'mobx-react';
import { LoadingHocWithEmpty }  from "../services/LoadingHocWithEmpty";
import { withRouter} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

const StudySessionComponent1 = inject('appStore')(observer(
  class StudySessionComponent1 extends React.Component {
    constructor(props) {
      super(props);
      this.decrementIndex= this.decrementIndex.bind(this);
      this.incrementIndex = this.incrementIndex.bind(this);
      this.incrementSuccessCounter = this.incrementSuccessCounter.bind(this);
      this.toggleHidden = this.toggleHidden.bind(this);
      this.makeVisible = this.makeVisible.bind(this);
     this.state = {hidden: true, redirect: false, index: 0, successCounter: 0, failCounter: 0    }
    }
  toggleHidden () {
      this.setState((prevState, props) => ({
        hidden: !(prevState.hidden)
      }))   
  }
 makeVisible () {
    this.setState((prevState, props) => ({
      hidden: false
    }))   
}
  incrementIndex() {
  const currentIndex = this.state.index;
  const newIndex = currentIndex + 1;
  if (newIndex < this.props.appStore.studyWordIds.length)
  {
    this.setState({index: newIndex})
  }
};
componentWillUpdate (nextProps, nextState) {
  if (nextProps.appStore.renderDone)
  {  
  this.props.history.push("/home/userId/" + this.props.appStore.userId + "/lists/" + this.props.appStore.currentListInfo + '/edit', 
   {done: true, successCounter: this.state.successCounter, lengthCounter: this.props.appStore.studyWordIds.length});
  this.props.appStore.setRenderDone(false);
  }
  }
decrementIndex() {this.setState((prevState, props) => ({
   index: prevState.index > 0 ? prevState.index - 1 : prevState.index
})); }; // maybe needed for a back button
incrementSuccessCounter() {
  this.setState((prevState, props) => ({
    successCounter: prevState.successCounter + 1
})); 
}
incrementFailCounter() {
  this.setState((prevState, props) => ({
    successCounter: prevState.failCounter + 1
})); 
}
    render() {
      const currentIndex = this.state.index+1;
      const lastOne = this.state.index === this.props.appStore.studyWordIds.length - 1 ? true : false;
      return (
      <div style={{paddingRight: "10px" }}>
                <nav className="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li className="is-active"><a style={{fontWeight:"800"}} aria-current="page">{this.props.appStore.currentListId[0] ? this.props.appStore.currentListId[0].listName : "placeholder"}</a></li>
    <li><a aria-current="page">Study</a></li>
  </ul>
</nav>
       <p> {currentIndex} / {this.props.appStore.studyWordIds.length}</p>
        <div className="box">
  <div className="testingcss">
  <h2 className="subtitle">{this.props.appStore.studyWordIds.length ? this.props.appStore.studyWordIds[this.state.index].en : null}</h2>
  <h2  className="subtitle" style={{fontStyle:"oblique"}}>{this.props.appStore.studyWordIds.length ? this.props.appStore.studyWordIds[this.state.index].exampleUseEn : null}</h2>
  {this.state.hidden ? <a onClick={() => this.makeVisible()}className="button">
    <span className="icon">
    <i className="fas fa-angle-double-down"></i>
    </span>
  </a> : null}
  <HiddenWords
  lastOne={lastOne}
  vn={this.props.appStore.studyWordIds[this.state.index].vn} 
  exampleUseEn={this.props.appStore.studyWordIds[this.state.index].exampleUseEn}
  exampleUseVn={this.props.appStore.studyWordIds[this.state.index].exampleUseVn}
  incrementSuccessCounter={this.incrementSuccessCounter}
  incrementIndex={this.incrementIndex}
  index={this.state.index}
  hidden={this.state.hidden}
  toggleHidden={this.toggleHidden}
  />
</div>
</div>
</div>
      );
    }
  }));


  const HiddenWords = inject('appStore')(observer(
    class HiddenWords extends React.Component {
      render() {
      return(
        <ReactCSSTransitionGroup
        transitionName="toggle"
        transitionEnterTimeout={700}
        transitionLeaveTimeout={300}>
          {this.props.hidden ? null: <div className="toggle-base">
          <hr/>
  <h2  className="subtitle">{this.props.vn}</h2>
  <h2  className="subtitle" style={{fontStyle:"oblique"}}>{this.props.exampleUseVn}</h2>
                      <a className="button is-danger" onClick={() => {this.props.incrementIndex(); 
                        this.props.appStore.decrementStudyStatus(this.props.index);
                        if (this.props.lastOne) {this.props.appStore.updateLastWordByWordId(this.props.index);}
                      else {
                      this.props.appStore.updateWordByWordId(this.props.index)
                      }
                        this.props.toggleHidden();
                      }
                      } > <span className="icon is-small">
                            <i className="fas fa-thumbs-down"></i>
                            </span> <span>Didn't know</span></a>
   
   
                            <a className="button is-success" onClick={() => {this.props.incrementIndex();
                      this.props.appStore.incrementStudyStatus(this.props.index);
                      if (this.props.lastOne) {this.props.appStore.updateLastWordByWordId(this.props.index);}
                      else {
                      this.props.appStore.updateWordByWordId(this.props.index)
                      }
                      this.props.incrementSuccessCounter();
                      this.props.toggleHidden();
                            }}> <span className="icon is-small">
                                  <i className="fas fa-thumbs-up"></i>
                                  </span> <span>Got this!</span></a>
          </div>}
        </ReactCSSTransitionGroup>  
  
  )
  }}
  ))

  
const StudySessionComponent2 = withRouter(StudySessionComponent1);
const StudySessionComponent = LoadingHocWithEmpty("studyWordIds")(StudySessionComponent2);



export default StudySessionComponent