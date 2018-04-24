import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import WordlistRow from "../components/WordlistRow";
import CreateWordlist from "../components/CreateWordlist";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

const AllListsOverviewContainer = inject('appStore')(observer(class AllListsOverviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }  
componentWillMount() {
  window.addEventListener('resize', this.handleWindowSizeChange);
  this.props.appStore.getListsByUserId(this.props.match.params.userId);    
        }
componentWillUnmount() {
  window.removeEventListener('resize', this.handleWindowSizeChange);
  }
handleWindowSizeChange = () => {
          this.setState({ width: window.innerWidth });
          if (this.state.width <= 768) {this.props.appStore.setIsMobile(true)}
          else {this.props.appStore.setIsMobile(false)} 
};
  render() {
    const { width } = this.state;
    const isMobile = width <= 768;
    if (isMobile)
    {
      return (null)
  }
  else {
  return (<AllListsOverviewComponent/>)
  }
  }}
  ))

  const NavwordlistRow = inject('appStore')(observer(class NavwordlistRow extends React.Component {
    render() {
     return (
     <Link className={"navbar-item"}to={"/home/userId/" + this.props.appStore.userId +  "/lists/" + this.props.x.listId + "/edit"}>
              {this.props.x.listName}</Link>
              )
          }}))


  const AllListsOverviewMobile = inject('appStore')(observer(class AllListsOverviewMobile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isActive: false,
      }
  }
  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }
  eachListComponent(x, id) {
    return (<NavwordlistRow x={x} id={id} key={id}/>)
  }
  render() {
      const openLists = this.props.appStore.listIds.filter((list) => list.listStatus == "undefined" || list.listStatus == 0 || list.listStatus == '0' );
  const closedLists = this.props.appStore.listIds.filter((list) => list.listStatus == "1");
    return(
      <div className="column is-12">
  <nav className="navbar is-light"
  aria-label="main navigation"
  style={{
    borderBottom: 'solid 1px #dddddd',
  }}>
<div className="navbar-brand">
  <button className="button navbar-burger" style={{marginLeft:0}}onClick={this.toggleNav}>
    <span></span>
    <span></span>
    <span></span>
  </button>
</div>
<div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
  <div className="navbar-start">
  Open Word Decks ({openLists ? this.props.appStore.numberOfOpenLists : 0})
  {openLists ? openLists.map(this.eachListComponent) : null}
<hr className="navbar-divider"/>
<br/>
Closed Word Decks ({closedLists ? this.props.appStore.numberOfClosedLists : 0})
  {closedLists ? closedLists.map(this.eachListComponent) : null}
  </div>
</div>
</nav></div>
  )}}))

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
  <div style={{paddingLeft: "35px", paddingTop: "30px", minHeight: "950px", borderRight: "solid 0.5px", backgroundColor: "#ddf3f2"}} 
  className="column is-3">
<aside className="menu">
<a style={this.state.hiddenOpen ? {fontWeight: 800} : {borderBottom: "solid 1px", fontStyle: "oblique"}} onClick={this.toggleHiddenOpen} className={this.state.hiddenOpen ? "navbar-link" : "menudropdown"}>
Open Word Decks ({openLists ? this.props.appStore.numberOfOpenLists : 0})
</a>
<HiddenLists list={openLists} hidden={this.state.hiddenOpen}/>
         <CreateWordlist/>
            <a style={this.state.hiddenClose ? {fontWeight: 700} : {borderBottom: "solid 1px", fontStyle: "oblique"}} onClick={this.toggleHiddenClose} className={this.state.hiddenClose ? "navbar-link" : "menudropdown"}>
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
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}>
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
