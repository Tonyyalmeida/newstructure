import React, { Component}from 'react';
import { observer, inject } from 'mobx-react';
import {NavLink, Link,  Redirect, withRouter} from 'react-router-dom';
import ScrollToTopOnMount from "../services/ScrollToTopOnMount";
import WordlistDetailsContainer from "../scenes/WordlistDetailsContainer";

const AppNavBar= inject('appStore')(observer(class AppNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderList: true,
      editing: false,
    }
  }
  renderNormal() {
    return(
    <nav id="nav">
    <ul  className="appnav">
   <li><Link to={"/home/" + "userId/" + this.props.appStore.userId}>Overview</Link></li>
    </ul>
    <ScrollToTopOnMount/>
    </nav>
  )};
  renderLists() {
    return (
    <nav id="nav">
    <ul className="appnav">
    <div className="row uniform">
    <div className="3u 12u$(xsmall)">
   <li><NavLink to={"/home/" + "userId/" + this.props.appStore.userId}>Back to Overview</NavLink>
   </li></div>
   <div className="9u 12u$(xsmall)">
    </div>
   </div>
    </ul>
    <ScrollToTopOnMount/>
    </nav>
  )};
  render() {
  const root = this.props.match.params.root;
  if (this.props.history.location.pathname.split("/")[1] === "edit")
  return this.renderLists();
  else return this.renderNormal();
};}));

export default AppNavBar