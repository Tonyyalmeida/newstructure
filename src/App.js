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
import AllListsOverview from "./scenes/AllListsOverview";
import WordlistDetailsContainer from "./scenes/WordlistDetailsContainer";
import LoginNavBar from "./components/LoginNavBar";
import AppNavBar from "./components/AppNavBar";
import StudySessionComponentContainer  from "./scenes/StudySessionComponentContainer";
import 'bulma/css/bulma.css';
import 'bulma-switch/dist/bulma-switch.min.css';


const stores = { appStore };

const BasicExample = () => (
  <Provider {...stores}>
        <Router>
        <div>
        <LoginNavBar/>
       <Route exact path="/" component={Header}/>
       <Route path="/edit/:root/:ignore" component={AppNavBar}/>
       <Route path="/study/:root/:ignore" component={AppNavBar}/>
     <section className="section">
     <div className="container">
  <div className="columns">
  <div className="column is-3">
  {/* //style={{borderRight: "1px solid rgb(221, 221, 221)"}}> */}
  <Route path="/home/userId/:userId" component={AllListsOverview}/>
        </div>
        <div className="column is-1" />
        <div className="column is-9">
        <div>
      <Route exact path="/" component={IntroSection}/>
      <Route exact path="/signup" component={SignupForm}/>
      <Route exact path="/login" component={LoginForm}/>
   {/* //   <Route exact path="/home/userId/:userId" component={AllListsOverview}/> */}
      <Route exact path="/home/userId/:userId/lists/:listId/edit" component={WordlistDetailsContainer}/>
      <Route exact path="/home/userId/:userId/lists/:listId/study" component={StudySessionComponentContainer}/>
      <Route exact path="/logout" component={LogoutForm}/>
    </div>
        </div>
        </div></div>
</section>
<Footer/>
</div>
   </Router>
  </Provider>
)

//const Wrapper = props => <div id="wrapper">{props.children}</div>


export default BasicExample;
