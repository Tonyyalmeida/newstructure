import React from 'react';
import { observer, inject } from 'mobx-react';
//import WordDetailsRow from "../components/WordDetailsRow";
import WordlistDetails from "../scenes/WordlistDetails";

const WordlistDetailsContainer = inject('appStore')(observer(
  class WordlistDetailsContainer extends React.Component {
    constructor(props) {
      super(props);
    }
    componentWillMount(){
      this.props.appStore.doneLoading = false;
      this.props.appStore.setCurrentListInfo(this.props.match.params.listId);
      this.props.appStore.getNeededInfo(this.props.match.params.listId);
      }
  render () {
    return(
      <WordlistDetails/>
    ) 
  }
  }))

export default WordlistDetailsContainer 