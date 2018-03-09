import React from 'react';
import { observer, inject } from 'mobx-react';
import { LoadingHoc }  from "../services/LoadingHoc";
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
      const currentRealIndex = this.state.index;
      if (this.props.appStore.studyWordIds === "false")
      return (<h2>This list is done</h2>) 
      else if (this.props.appStore.renderDone)
      {
        return (
        <DoneStudyComponentWithSpinner listId={this.props.listId} successCounter={this.state.successCounter}/>
        )
      }
      else if (true)
      return (
      <div>
        {currentIndex} / {this.props.appStore.studyWordIds.length}
      <pre>
        <code>
        <div className="spotlight">
  <div className="content testingcss">
  <h2 className="align-center">{this.props.appStore.studyWordIds.length ? this.props.appStore.studyWordIds[this.state.index].vn : null}</h2>
  {this.state.hidden ? <i onClick={() => this.makeVisible()} className="fa fa-angle-double-down fa-5x align-center"></i> : null}
  <HiddenWords
  lastOne={this.state.index == this.props.appStore.studyWordIds.length - 1 ? true : false}
  en={this.props.appStore.studyWordIds[this.state.index].en} 
  exampleUse={this.props.appStore.studyWordIds[this.state.index].exampleUse}
  incrementSuccessCounter={this.incrementSuccessCounter}
  incrementIndex={this.incrementIndex}
  index={this.state.index}
  hidden={this.state.hidden}
  toggleHidden={this.toggleHidden}
  />
  </div>
</div></code></pre></div>
      );
      else {
        return (<h2>Loading...</h2>)
      }
    }
  }));

  const DoneStudyComponent = inject('appStore')(observer(
    class DoneStudyComponent extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
  return(
        <div><h2>Done with this Deck</h2>
            <h3>Stats this session: You knew {this.props.successCounter} out of {this.props.appStore.studyWordIds.length}</h3>
              <h4>{this.props.appStore.finalStatus}</h4>
        {this.props.appStore.finalStatus == 100 ? <h2>Congrats, you just finished this list!</h2>: null}  
              </div>)
  }}))


  const HiddenWords = inject('appStore')(observer(
    class HiddenWords extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
      return(
        <ReactCSSTransitionGroup
        transitionName="toggle"
        transitionEnterTimeout={700}
        transitionLeaveTimeout={300}>
          {this.props.hidden ? null: <div className="toggle-base">
          <div>
  <h2 className="align-center">{this.props.en}</h2>
  <h3 className="align-center">{this.props.exampleUse}</h3>
      <ul className="actions fit">
      <div className="row uniform">
  <div className="6u align-center">
                      <li className="align-center"><a onClick={() => {this.props.incrementIndex(); 
                        this.props.appStore.decrementStudyStatus(this.props.index);
                        if (this.props.lastOne) {this.props.appStore.updateLastWordByWordId(this.props.index);}
                      else {
                      this.props.appStore.updateWordByWordId(this.props.index)
                      }
                        this.props.toggleHidden();
                      }
                      } 
                        className="button big special icon fa-thumbs-down">Didn't know</a></li>          </div>
                   <div className="6u align-center">
                        <li className="align-center"><a onClick={() => {this.props.incrementIndex();
                      this.props.appStore.incrementStudyStatus(this.props.index);
                      if (this.props.lastOne) {this.props.appStore.updateLastWordByWordId(this.props.index);}
                      else {
                      this.props.appStore.updateWordByWordId(this.props.index)
                      }
                      this.props.incrementSuccessCounter();
                      this.props.toggleHidden();
                      }} className="button big icon fa-thumbs-up">Got it!</a></li>
        </div>        
  </div>
      </ul></div>   
          </div>}
        </ReactCSSTransitionGroup>  
  
  )
  }}
  ))

// const isEmpty = (prop) => (
//       prop === null ||
//       prop === undefined ||
//       prop[0] === undefined ||
//       (prop.hasOwnProperty('length') && prop.length === 0) ||
//       (prop.constructor === Object && Object.keys(prop).length === 0)
//     );

  
const DoneStudyComponentWithSpinner = LoadingHoc("finalStatus")(DoneStudyComponent);
const StudySessionComponent = LoadingHoc("studyWordIds")(StudySessionComponent1);



export default StudySessionComponent