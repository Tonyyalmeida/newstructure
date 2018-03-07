import React from 'react';
import { observer, inject } from 'mobx-react';
import WordlistRow from "../components/WordlistRow";
import WordlistRowClosed from "../components/WordlistRowClosed";
import CreateWordlistHOC from "../components/CreateWordlist";
//import { LoadingHoc }  from "../services/LoadingHoc";

const AllListsOverview = inject('appStore')(observer(class AllListsOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {doneLoading : false}
    this.eachListComponent = this.eachListComponent.bind(this);
    this.eachClosedListComponent = this.eachClosedListComponent.bind(this);
}
  componentWillMount() {
this.props.appStore.getListsByUserId(this.props.match.params.userId);    
  }
  eachListComponent(x, id) {
    return (<WordlistRow x={x} id={id} key={id}/>)
  }
  eachClosedListComponent(x, id) {
    return (<WordlistRowClosed x={x} id={id} key={id}/>)
  }
  render() {
  const openLists = this.props.appStore.listIds.filter((list) => list.listStatus !== 1);
  const closedLists = this.props.appStore.listIds.filter((list) => list.listStatus == 1);
    return(
<div>
  <h1>Your Study Decks:</h1>
 {openLists ? openLists.map(this.eachListComponent) : null}
 <hr/>
 {closedLists ? closedLists.map(this.eachClosedListComponent) : null}
 
<CreateWordlistHOC doneLoading={this.state.doneLoading}/>
</div>
    )
  }}))


export default AllListsOverview