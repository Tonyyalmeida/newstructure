import React from 'react';
import { observer, inject } from 'mobx-react';
//import WordDetailsRow from "../components/WordDetailsRow";
import WordlistDetails from "../scenes/WordlistDetails";

const WordlistDetailsContainer = inject('appStore')(observer(
  class WordlistDetailsContainer extends React.Component {
    componentWillMount(){
      this.props.appStore.currenListId = [];
      this.props.appStore.doneLoading = false;
      this.props.appStore.setCurrentListInfo(this.props.match.params.listId);
      this.props.appStore.setDoneCreatingList(false);
      this.props.appStore.getNeededInfo(this.props.match.params.listId);
    };
      componentWillUpdate(nextProps, nextState) {
        this.props.appStore.currenListId = [];
        this.props.appStore.doneLoading = false;
        this.props.appStore.setDoneCreatingList(false);
        this.props.appStore.setCurrentListInfo(nextProps.match.params.listId);
        this.props.appStore.getNeededInfo(nextProps.match.params.listId);
        this.props.appStore.setUserId(this.props.match.params.userId);
    };
    componentWillUnmount() {
      this.props.appStore.setDoneCreatingList(false);
    }
  render () {
    return(
      <WordlistDetails wordId={this.props.match.params.listId}/>
    ) 
  }
  }))

export default WordlistDetailsContainer 