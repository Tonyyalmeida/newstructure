import React from 'react';
import { observer, inject } from 'mobx-react';
import WordlistRow from "../components/WordlistRow";
import CreateWordlist from "../components/CreateWordlist";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
//import { LoadingHoc }  from "../services/LoadingHoc";

const AllListsOverview = inject('appStore')(observer(class AllListsOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {doneLoading : false, hiddenClose: false, hiddenOpen: false}
    this.eachListComponent = this.eachListComponent.bind(this);
    this.toggleHiddenClose = this.toggleHiddenClose.bind(this);
    this.toggleHiddenOpen = this.toggleHiddenOpen.bind(this);
    this.eachClosedListComponent = this.eachClosedListComponent.bind(this);
}
toggleHiddenClose () {
  this.setState((prevState, props) => ({
    hiddenClose: !(prevState.hiddenClose)
  }))   
}
toggleHiddenOpen () {
  this.setState((prevState, props) => ({
    hiddenOpen: !(prevState.hiddenOpen)
  }))   
}
  componentWillMount() {
//this.props.appStore.setUserId(this.props.match.params.userId);
this.props.appStore.getListsByUserId(this.props.match.params.userId);    
  }
  componentWillUpdate(nextProps, nextState) {
  //nextProps.appStore.setUserId(this.props.match.params.userId);
  if (nextProps.appStore.doneCreatingList)
  {  
  this.props.history.push('/home/userId/' + this.props.appStore.userId + "/lists/" + this.props.appStore.currentListInfo + '/edit');
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
  const openLists = this.props.appStore.listIds.filter((list) => list.listStatus === "undefined" || list.listStatus === 0 || list.listStatus === '0' );
  const closedLists = this.props.appStore.listIds.filter((list) => list.listStatus === "1");
return (
<aside className="menu">
<a style={{fontWeight: 600}} onClick={this.toggleHiddenOpen} className="navbar-link">
Open Word Decks ({openLists ? this.props.appStore.numberOfOpenLists : 0})
</a>
<HiddenLists list={openLists} hidden={this.state.hiddenOpen}/>
         <CreateWordlist/>
            <a style={{fontWeight: 600}} onClick={this.toggleHiddenClose} className="navbar-link">
            Closed Word Decks ({closedLists ? this.props.appStore.numberOfClosedLists : 0})
           </a>
           <HiddenLists list={closedLists} hidden={this.state.hiddenClose}/>
        </aside>
        )
  }}))


  const HiddenLists = inject('appStore')(observer(
    class HiddenLists extends React.Component {
      constructor(props) {
        super(props);
        this.eachClosedListComponent = this.eachClosedListComponent.bind(this);
      }
      eachClosedListComponent(x, id) {
        return (<WordlistRow x={x} id={id} key={id}/>)
      }
      render() {
      const lists = this.props.list
      return(
        <ReactCSSTransitionGroup
        transitionName="toggle2"
        transitionEnterTimeout={700}
        transitionLeaveTimeout={300}>
          {this.props.hidden ? null: <div className="toggle2-base">
          <ul className="menu-list">
          {lists ? lists.map(this.eachClosedListComponent) : null}
          </ul>
          </div>}
        </ReactCSSTransitionGroup>  
  
  )
  }}
  ))



export default AllListsOverview
