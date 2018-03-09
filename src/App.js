import React, { Component } from 'react';
import './css/main.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  NavLink,
  withRouter,
} from 'react-router-dom';
import axios from 'axios';
import { Provider, observer, inject } from 'mobx-react';
import appStore from './stores/appStore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import Header from './components/Header';
import Footer from "./components/Footer";
import IntroSection from "./components/IntroSection";
import LogoutForm from "./scenes/LogoutForm";
import LoginForm from "./scenes/LoginForm";
import SignupForm from "./scenes/SignupForm";
import AllListsOverview from "./scenes/AllListsOverview";
import WordlistDetailsContainer from "./scenes/WordlistDetailsContainer";
import LoginNavBar from "./components/LoginNavBar";
import AppNavBar from "./components/AppNavBar";
import ScrollToTopOnMount from "./services/ScrollToTopOnMount";
import StudySessionComponentContainer  from "./scenes/StudySessionComponentContainer" 


const stores = { appStore };

const BasicExample = () => (
  <Provider {...stores}>
        <Router>
        <Wrapper>
        <LoginNavBar/>
       <Route exact path="/" component={Header}/>
       <Route path="/edit/:root/:ignore" component={AppNavBar}/>
       <Route path="/study/:root/:ignore" component={AppNavBar}/>
     <div id="main">
     <section id="content" className="main">
     <section>     
    <div>
      <Route exact path="/" component={IntroSection}/>
      <Route exact path="/signup" component={SignupForm}/>
      <Route exact path="/login" component={LoginForm}/>
      <Route exact path="/home/userId/:userId" component={AllListsOverview}/>
      <Route exact path="/edit/lists/:listId/:listName" component={WordlistDetailsContainer}/>
      <Route exact path="/study/lists/:listId/:listName" component={StudySessionComponentContainer}/>
      <Route exact path="/logout" component={LogoutForm}/>
    </div>
</section></section>
</div>
<Footer/>
 </Wrapper>
   </Router>
  </Provider>
)

const Wrapper = props => <div id="wrapper">{props.children}</div>


export default BasicExample;
