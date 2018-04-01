import React from 'react';
//import './css/main.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
// import axios from 'axios';
import { Provider } from 'mobx-react';
import appStore from './stores/appStore';
import {Header} from './components/Header';
import Footer from "./components/Footer";
import IntroSection from "./components/IntroSection";
import LogoutForm from "./scenes/LogoutForm";
import LoginForm from "./scenes/LoginForm";
import SignupForm from "./scenes/SignupForm";
import SecurityScanner from "./services/SecurityScanner";
import AllListsOverviewContainer from "./scenes/AllListsOverview";
import WordlistDetailsContainer from "./scenes/WordlistDetailsContainer";
import LoginNavBar from "./components/LoginNavBar";
import StudySessionComponentContainer  from "./scenes/StudySessionComponentContainer";
import WelcomeComponent from "./scenes/WelcomeComponent";
import 'bulma/css/bulma.css';
import './css/main.css';
import 'bulma-switch/dist/bulma-switch.min.css';
import 'bulma-tooltip/dist/bulma-tooltip.min.css';


const stores = { appStore };

const BasicExample = () => (
  <Provider {...stores}>
        <Router>
        <div>
        <LoginNavBar/>
       <Route exact path="/" component={Header}/>
       <Route exact path="/signup" component={SignupForm}/>
      <Route exact path="/login" component={LoginForm}/>
     <section style={{minHeight: 900}}>
  <div className="columns is-mobile">
  <Route path="/home/userId/:userId" component={AllListsOverviewContainer}/>
  <Route path="/home/userId/:total" component={SecurityScanner}/>
        <div style={{paddingTop: "35px", paddingLeft: "35px"}} className="column is-9">
      <Route exact path="/home/userId/:userId" component={WelcomeComponent}/>
      <Route exact path="/home/userId/:userId/lists/:listId/edit" component={WordlistDetailsContainer}/>
      <Route exact path="/home/userId/:userId/lists/:listId/study" component={StudySessionComponentContainer}/>
      <Route exact path="/logout" component={LogoutForm}/>
        </div>
        </div>
</section>
<Footer/>
</div>
   </Router>
  </Provider>
)


export default BasicExample;
