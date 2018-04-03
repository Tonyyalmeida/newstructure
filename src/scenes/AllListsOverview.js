import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter} from 'react-router-dom';
import WordlistRow from "../components/WordlistRow";
import CreateWordlist from "../components/CreateWordlist";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

const AllListsOverviewContainer = inject('appStore')(observer(class AllListsOverviewContainer extends React.Component {
    componentWillMount() {
      this.props.appStore.getListsByUserId(this.props.match.params.userId);    
        }
  render() {
    return (
    <AllListsOverviewComponent />
    )
  }
  }
  ))
const AllListsOverviewComponentOriginal = inject('appStore')(observer(class AllListsOverviewComponentOriginal extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {hiddenClose: false, hiddenOpen: false}
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
  <div style={{paddingLeft: "35px", paddingTop: "30px", minHeight: "650px", borderRight: "solid 0.5px", backgroundColor: "#ddf3f2"}} 
  className="column is-3">
<aside className="menu">
<a style={this.state.hiddenOpen ? {fontWeight: 800} : {borderBottom: "solid 1px", fontStyle: "oblique"}} onClick={this.toggleHiddenOpen} className={"navbar-link"}>
Open Word Decks ({openLists ? this.props.appStore.numberOfOpenLists : 0})
</a>
<HiddenLists list={openLists} hidden={this.state.hiddenOpen}/>
         <CreateWordlist/>
            <a style={this.state.hiddenClose ? {fontWeight: 700} : {borderBottom: "solid 1px", fontStyle: "oblique"}} onClick={this.toggleHiddenClose} className="navbar-link">
            Closed Word Decks ({closedLists ? this.props.appStore.numberOfClosedLists : 0})
           </a>
           <HiddenLists list={closedLists} hidden={this.state.hiddenClose}/>
        </aside></div>
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
  const AllListsOverviewComponent = withRouter(AllListsOverviewComponentOriginal);

export default AllListsOverviewContainer
