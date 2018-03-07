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

const stores = { appStore };

const BasicExample = () => (
  <Provider {...stores}>
        <Router>
        <Wrapper>
        <LoginNavbar/>
       <Route exact path="/" component={Header}/>
       <Route path="/edit/:root/:ignore" component={AppNavbar}/>
       <Route path="/study/:root/:ignore" component={AppNavbar}/>
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

// const ListComponentContainer = inject('appStore')(observer(
//   class ListComponentContainer extends React.Component {
//     constructor(props) {
//       super(props);
//     }
//     componentWillMount(){
//       this.props.appStore.doneLoading = false;
//       this.props.appStore.setCurrentListInfo(this.props.match.params.listName)
//       this.props.appStore.getWordsByListId(this.props.match.params.listId);
//       this.props.appStore.getListStatusByListId(this.props.match.params.listId);
//       }
//   render () {
//     return(
//       <ListComponentWithSpinner/>
//     ) 
//   }
//   }))


// const ListComponent = inject('appStore')(observer(
// class ListComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.createWord = this.createWord.bind(this);
//     this.handeSubmit = this.handleSubmit.bind(this);
//     this.handleReset = this.handleReset.bind(this);
//    this.state = {redirect: false}
//   }
//     componentWillMount(){
// // this.props.appStore.doneLoading = false;
// // this.props.appStore.setCurrentListInfo(this.props.match.params.listName)
// // this.props.appStore.getWordsByListId(this.props.match.params.listId);
// // this.props.appStore.getListStatusByListId(this.props.match.params.listId);
// //should actually be a promise.all
// }
// handleReset() {
// this.setState({redirect: true});
// }
// componentWillUnmount () {
// this.props.appStore.doneLoading = false;
// }
// handleSubmit(event) {
//   event.preventDefault();
//   this.props.appStore.updateListStatusByListId(this.props.appStore.currentListId[0]);
//   var wordArray = [];
//   [1, 4, 7, 10, 13, 16, 19, 22, 25, 28].forEach((a) => {wordArray.push(this.createWord(event, a))});
//   axios.post('http://localhost:3101/words/words', wordArray).then(() => this.props.appStore.getWordsByListId(this.props.appStore.currentListId[0].listId))
// };
// createWord(event, index) {
// const createWordFactory = ({ vn, en, exampleUse, wordId, status }) => ({
//   vn,
//   en,
//   exampleUse,
//   wordId,
//   status
// });
// const myWord = createWordFactory({
//   vn: event.target[index].value, 
//   en:  event.target[index+1].value, 
//   exampleUse:  event.target[index+2].value, 
//   wordId: event.target[index].getAttribute('wordid'), 
//   status: event.target[index].getAttribute('status'),
// });
// return myWord;
// }
//   render() {
//     if (this.state.redirect) {
//       return  <Redirect to={{
//     pathname: '/home/' + "userId/" + this.props.appStore.userId,
//   }}/>  
//   }
//     if (this.props.appStore.doneLoading)
//    { console.log(this.props.appStore.currentListId[0].listStatus);
//     return (
//      <form onReset={()=> this.handleReset()} onSubmit={(e) => {this.handleSubmit(e)}}>
//       <input type="checkbox" id="subscribeNews" name="subscribe" value="false" onChange={()=> this.props.appStore.currentListId[0].listStatus = !this.props.appStore.currentListId[0].listStatus} checked={this.props.appStore.currentListId[0].listStatus == 0 || this.props.appStore.currentListId[0].listStatus === undefined ? false : true}/>
//     <label htmlFor="subscribeNews">Done Studying this List?</label>
//        <div className="row uniform">
//              <div className="3u 12u$(xsmall)">VN</div>
//       <div className="3u 12u$(xsmall)">EN</div>
//       <div className="4u 12u$(xsmall)">Example Use</div>
//       <div className="2u 12u$(xsmall)">Status</div></div>
//     {this.props.appStore.wordIds.map( (c, id) => (
//       <Texting vn={c.vn} en={c.en} exampleUse={c.exampleUse} status={c.status} wordId={c.wordId} arrayid={id} key={id}/>
//     ))}
//        <button type="submit" className="button submit">Save</button>
//        <button type="reset" className="button">Cancel</button>
//   <ul className="icons">
//       <li><Link to={`/study/lists/` + this.props.appStore.currentListId.listId + "/" + this.props.appStore.currentListId.listName} 
//       className="icon alt fa-play">
//       <span className="label">Clear</span></Link></li> 
//   </ul>
//   </form>
//     );

//   } else {
//       return (<div className="loader">Loading...</div>)
//     }
//   }
// }));


const Wrapper = props => <div id="wrapper">{props.children}</div>


const LoginNavbar= inject('appStore')(observer(class LoginNavbar extends Component {
  constructor(props) {
    super(props);
    this.getCookie = this.getCookie.bind(this);
  }
   getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
componentWillMount() {
const token = this.getCookie("topicoToken");
const userName = this.getCookie('userName');
const userId = this.getCookie("userId");
if (token !== "") {
 //   this.props.appStore.setUserName;
    this.props.appStore.settopicoToken(token);
    this.props.appStore.setTrueLoggedInState();
    this.props.appStore.setUserName(userName);
    this.props.appStore.setUserId(userId);
}
}
  renderNormal() {
    return(
    <nav id="nav" className="NavBar">
    <ul>
    <li><Link to="/">Topico</Link></li>
    <li><Link to="/signup">Signup</Link></li>
    <li><Link to="/login">Login</Link></li>
    </ul>
    </nav>
  )};
  renderLogin() {
    return (
    <nav id="nav">
    <ul>
    <li><Link to={"/home/" + "userId/" + this.props.appStore.userId}>Topico</Link></li>
    <li><Link to="/logout">Logout</Link></li>
    </ul>
    </nav>
  )};
  render() {
  const loggedIn = this.props.appStore.isLoggedIn;
  if (loggedIn) return this.renderLogin();
  else return this.renderNormal();
};}));

const AppNavbar= inject('appStore')(observer(class AppNavbar extends Component {
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
           <ListNameWithRouter listId={this.props.match.params.ignore}/>
    </div>
   </div>
    </ul>
    <ScrollToTopOnMount/>
    </nav>
  )};
  render() {
  const root = this.props.match.params.root;
  console.log(this.props.history.location.pathname.split("/"));
  if (this.props.history.location.pathname.split("/")[1] === "edit")
  return this.renderLists();
  else return this.renderNormal();
};}));

const ListNameComponent= inject('appStore')(observer(class ListNameComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, value: "", redirect: false}
    this.handleSave = this.handleSave.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleClick() {
   this.setState({ editing: !this.state.editing});
}
handleCancel() {
 this.setState({ editing: false});
}
setLocation() {
var locationString = '/edit/' + "lists/" + this.props.listId + "/" + this.state.value
this.props.history.push(locationString);
this.props.appStore.setCurrentListInfo(this.state.value);
this.handleClick();
}
handleSave= (e) =>  {
e.preventDefault();
this.props.appStore.updateListByListId({listName: this.state.value, listId: this.props.listId});
window.location.reload;
}
renderNormal() { return (    <ul className="icons">
<li>{this.props.appStore.currentListInfo ? this.props.appStore.currentListInfo : "unnamed" }<a onClick={() => this.handleClick()} className="icon fa-edit"><span className="label">Clear</span></a></li>
</ul>) }
  renderEdit() {
            return (
              <form onReset={()=> this.handleCancel()} onSubmit={(e) => {this.handleSave(e); this.setLocation()}}>
        <span>
           <input onChange={this.handleChange} type="text" name="demo-name" id="demo-name" defaultValue={this.props.appStore.currentListInfo}/>
           </span>
           <span>
          <button type="submit" className="button special extrasmall">Save</button>
        <button type="reset" className="button special extrasmall">Cancel</button>
        </span>
      </form>
      )}
  render() {
  //   if (this.props.appStore.redirectReady) {
  //     return  (<Redirect to={{
  //   pathname: '/home/' + "lists/" + this.props.listId + "/" + this.state.value
  // }}/>)
  // }
            if (this.state.editing)
              return this.renderEdit();
            else { return this.renderNormal() }
          }
        }))
//ListComponent renders Name of List (based on appStore Props)
//Onclick (editing)-> Renders input window (with internal State, new Value)
// Save -> Use API call to set name
// Redirect to new listName (needs to, from then, everything else will be set too)
//cancel -> reset (probably use internal state)

var ListNameWithRouter = withRouter(ListNameComponent);



class ScrollToTopOnMount extends Component {
  componentDidMount(prevProps) {
    window.scrollTo(0, 0)
  }
  render() {
    return null
  }
}



// const IntroSection = props => <section id="intro" className="main">
// <div className="spotlight">
//   <div className="content">
//     <header className="major">
//       <h2>Motivation</h2>
//     </header>
//     <p>Studying Flashcards is already challinging enough - we don't need complex and bloated apps to do so. We believe that learning flashcards should be a simple and enjoyable experience </p>
//   </div>
//   <span className="icon major style1 fa-code"></span>
// </div>
// </section>

const StudySessionComponentContainer = inject('appStore')(observer(
  class StudySessionComponentContainer extends React.Component {
    constructor(props) {
      super(props);
    }
      componentWillMount(){
  this.props.appStore.doneLoading = false;
  this.props.appStore.setRenderDone(false);
  this.props.appStore.setCurrentListInfo(this.props.match.params.listName);
  console.log(this.props.match);
  this.props.appStore.getStudyWordsByListId(this.props.match.params.listId);
  }
  componentWillUnmount () {
  this.props.appStore.doneLoading = false;
  this.props.appStore.setRenderDone(false);
  }
render() {
  return (
  <StudySessionComponentWithSpinner listId={this.props.match.params.listId}/>)
}
}
))


const StudySessionComponent = inject('appStore')(observer(
  class StudySessionComponent extends React.Component {
    constructor(props) {
      super(props);
      this.decrementIndex= this.decrementIndex.bind(this);
      this.incrementIndex = this.incrementIndex.bind(this);
      this.incrementSuccessCounter = this.incrementSuccessCounter.bind(this);
      this.toggleHidden = this.toggleHidden.bind(this);
      this.makeVisible = this.makeVisible.bind(this);
     this.state = {hidden: true, redirect: false, index: 0, successCounter: 0, failCounter: 0    }
    }

  //     componentWillMount(){
  // this.props.appStore.doneLoading = false;
  // this.props.appStore.setCurrentListInfo(this.props.match.params.listName);
  // this.props.appStore.getStudyWordsByListId(this.props.match.params.listId);
  // }
  // componentWillUnmount () {
  // this.props.appStore.doneLoading = false;
  // }
  toggleHidden () {
      this.setState((prevState, props) => ({
        hidden: !(prevState.hidden)
      }))   
  }
 makeVisible () {
    this.setState((prevState, props) => ({
      hidden: false
    }))   
}
  incrementIndex() {
  const currentIndex = this.state.index;
  const newIndex = currentIndex + 1;
  if (newIndex < this.props.appStore.studyWordIds.length)
  {
    this.setState({index: newIndex})
  }
};
decrementIndex() {this.setState((prevState, props) => ({
   index: prevState.index > 0 ? prevState.index - 1 : prevState.index
})); }; // maybe needed for a back button
incrementSuccessCounter() {
  this.setState((prevState, props) => ({
    successCounter: prevState.successCounter + 1
})); 
}
incrementFailCounter() {
  this.setState((prevState, props) => ({
    successCounter: prevState.failCounter + 1
})); 
}
    render() {
      const currentIndex = this.state.index+1;
      const currentRealIndex = this.state.index;
      if (this.props.appStore.studyWordIds === "false")
      return (<h2>This list is done</h2>) 
      else if (this.props.appStore.renderDone)
      {
        return (
        <DoneStudyComponentWithSpinner listId={this.props.listId} successCounter={this.state.successCounter}/>
        )
      }
      else if (true)
      return (
      <div>
        {currentIndex} / {this.props.appStore.studyWordIds.length}
      <pre>
        <code>
        <div className="spotlight">
  <div className="content testingcss">
  <h2 className="align-center">{this.props.appStore.studyWordIds[this.state.index].length ? this.props.appStore.studyWordIds[this.state.index].vn: null}</h2>
  {this.state.hidden ? <i onClick={() => this.makeVisible()} className="fa fa-angle-double-down fa-5x align-center"></i> : null}
  <HiddenWords
  lastOne={this.state.index == this.props.appStore.studyWordIds.length - 1 ? true : false}
  en={this.props.appStore.studyWordIds[this.state.index].en} 
  exampleUse={this.props.appStore.studyWordIds[this.state.index].exampleUse}
  incrementSuccessCounter={this.incrementSuccessCounter}
  incrementIndex={this.incrementIndex}
  index={this.state.index}
  hidden={this.state.hidden}
  toggleHidden={this.toggleHidden}
  />
  </div>
</div></code></pre></div>
      );
      else {
        return (<h2>Loading...</h2>)
      }
    }
  }));


const DoneStudyComponent = inject('appStore')(observer(
  class DoneStudyComponent extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
return(
      <div><h2>Done with this Deck</h2>
          <h3>Stats this session: You knew {this.props.successCounter} out of {this.props.appStore.studyWordIds.length}</h3>
            <h4>{this.props.appStore.finalStatus}</h4>
      {this.props.appStore.finalStatus == 100 ? <h2>Congrats, you just finished this list!</h2>: null}  
            </div>)
}}))

//on end, call all listIds + wordStatus.
//if all wordStatus == 10, update listStatus to 1;


const HiddenWords = inject('appStore')(observer(
  class HiddenWords extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
    return(
      <ReactCSSTransitionGroup
      transitionName="toggle"
      transitionEnterTimeout={700}
      transitionLeaveTimeout={300}>
        {this.props.hidden ? null: <div className="toggle-base">
        <div>
<h2 className="align-center">{this.props.en}</h2>
<h3 className="align-center">{this.props.exampleUse}</h3>
    <ul className="actions fit">
    <div className="row uniform">
<div className="6u align-center">
                    <li className="align-center"><a onClick={() => {this.props.incrementIndex(); 
                      this.props.appStore.decrementStudyStatus(this.props.index);
                      if (this.props.lastOne) {this.props.appStore.updateLastWordByWordId(this.props.index);}
                    else {
                    this.props.appStore.updateWordByWordId(this.props.index)
                    }
                      this.props.toggleHidden();
                    }
                    } 
                      className="button big special icon fa-thumbs-down">Didn't know</a></li>          </div>
                 <div className="6u align-center">
                      <li className="align-center"><a onClick={() => {this.props.incrementIndex();
                    this.props.appStore.incrementStudyStatus(this.props.index);
                    if (this.props.lastOne) {this.props.appStore.updateLastWordByWordId(this.props.index);}
                    else {
                    this.props.appStore.updateWordByWordId(this.props.index)
                    }
                    this.props.incrementSuccessCounter();
                    this.props.toggleHidden();
                    }} className="button big icon fa-thumbs-up">Got it!</a></li>
      </div>        
</div>
    </ul></div>   
        </div>}
      </ReactCSSTransitionGroup>  

)
}}
))
  const isEmpty = (prop) => (
    prop === null ||
    prop === undefined ||
    prop[0] === undefined ||
    (prop.hasOwnProperty('length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
  
  const LoadingHoc = (loadingProp) => (WrappedComponent) => {
    return inject('appStore')(observer( class LoadingHoc extends Component {
            render() {
              console.log(isEmpty(this.props.appStore[loadingProp]));
        return isEmpty(this.props.appStore[loadingProp])  ? <div className="loader"></div> : <WrappedComponent {...this.props}/>;
      }
    }))
  }

  const DoubleHoc = (loadingProp1, loadingProp2) => (WrappedComponent) => {
    return inject('appStore')(observer( class DoubleHoc extends Component {
            render() {
    return this.props.appStore.doneLoading ?  ((isEmpty(this.props.appStore[loadingProp1])  || isEmpty(this.props.appStore[loadingProp2])) ? <EmptyComponent/> : <WrappedComponent {...this.props}/>) : <div className="loader"></div>
      }
    }))
  }

  const EmptyComponent = props => <div><h2>Oops, looks like something went wrong.</h2><h3>Please try again later</h3></div>

  //onst ListComponentWithSpinner = DoubleHoc("wordIds", "currentListId" )(ListComponent);
  const DoneStudyComponentWithSpinner = LoadingHoc("finalStatus")(DoneStudyComponent);
  const StudySessionComponentWithSpinner = LoadingHoc("studyWordIds")(StudySessionComponent);


export default BasicExample;
