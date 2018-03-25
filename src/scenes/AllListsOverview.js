import React from 'react';
import { observer, inject } from 'mobx-react';
import WordlistRow from "../components/WordlistRow";
import WordlistRowClosed from "../components/WordlistRowClosed";
import CreateWordlist from "../components/CreateWordlist";
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
  componentWillUpdate(nextProps, nextState) {
  if (nextProps.appStore.doneCreatingList)
  {  
  this.props.history.push('/home/' + "userId/" + this.props.appStore.userId + "/lists/" + this.props.appStore.currentListInfo + '/edit');
  this.props.appStore.setDoneCreatingList(false);
  }
  }
  eachListComponent(x, id) {
    return (<WordlistRow x={x} id={id} key={id}/>)
  }
  eachClosedListComponent(x, id) {
    return (<WordlistRow x={x} id={id} key={id}/>)
  }
  render() {
  const openLists = this.props.appStore.listIds.filter((list) => list.listStatus == "undefined" || list.listStatus == 0 || list.listStatus == '0' );
  const closedLists = this.props.appStore.listIds.filter((list) => list.listStatus == "1");
return (
<aside className="menu">
          <p className="menu-label">
          <br/>
           Open Word Decks ({openLists ? openLists.length : 0})
          </p>
          <ul className="menu-list">
          {openLists ? openLists.map(this.eachListComponent) : null}
          </ul>
         <CreateWordlist/>
            <p className="menu-label">
            Closed Word Decks ({closedLists ? closedLists.length : 0})
           </p>
          <ul className="menu-list">
          {closedLists ? closedLists.map(this.eachClosedListComponent) : null}
          </ul>
        </aside>
        )


//   const openLists = this.props.appStore.listIds.filter((list) => list.listStatus !== 1);
//   const closedLists = this.props.appStore.listIds.filter((list) => list.listStatus == 1);
//     return(
// <div>
//   <h1>Your Study Decks:</h1>
//  {openLists ? openLists.map(this.eachListComponent) : null}
//  <hr/>
//  {closedLists ? closedLists.map(this.eachClosedListComponent) : null}
 
// <CreateWordlistHOC doneLoading={this.state.doneLoading}/>
// </div>
//    )
  }}))


export default AllListsOverview
