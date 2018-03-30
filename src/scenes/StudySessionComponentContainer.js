import React from 'react';
import { observer, inject } from 'mobx-react';
//import WordDetailsRow from "../components/WordDetailsRow";
import StudySessionComponent from "../scenes/StudySessionComponent";

const StudySessionComponentContainer = inject('appStore')(observer(
  class StudySessionComponentContainer extends React.Component {
      componentWillMount(){
  this.props.appStore.doneLoading = false;
  this.props.appStore.setRenderDone(false);
//  this.props.appStore.setUserId(this.props.match.params.userId);
  this.props.appStore.setCurrentListInfo(this.props.match.params.listName);
  this.props.appStore.getNeededInfo(this.props.match.params.listId);
  this.props.appStore.getStudyWordsByListId(this.props.match.params.listId);
  this.props.appStore.setCurrentListInfo(this.props.match.params.listId);
  }
  componentWillUpdate(nextProps, nextState) {
  //  this.props.appStore.setUserId(nextProps.match.params.userId);  
  }
  componentWillUnmount () {
  this.props.appStore.doneLoading = false;
  this.props.appStore.setRenderDone(false);
  }
render() {
  return (
  <StudySessionComponent listId={this.props.match.params.listId}/>)
}
}
))

export default StudySessionComponentContainer