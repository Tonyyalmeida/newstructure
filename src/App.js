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

const stores = { appStore };

const BasicExample = () => (
  <Provider {...stores}>
        <Router>
        <Wrapper>
        <LoginNavbar/>
       <Header/>
       <Route path="/edit/:root/:ignore" component={AppNavbar}/>
       <Route path="/study/:root/:ignore" component={AppNavbar}/>
     <div id="main">
     <section id="content" className="main">
     <section>     
    <div>
      <Route exact path="/" component={RealApp}/>
      <Route exact path="/signup" component={SignupForm}/>
      <Route exact path="/login" component={LoginForm}/>
      <Route exact path="/home/userId/:userId" component={WelcomeComponent}/>
      <Route exact path="/edit/lists/:listId/:listName" component={ListComponent}/>
      <Route exact path="/study/lists/:listId/:listName" component={StudySessionComponentContainer}/>
      <Route exact path="/logout" component={LogoutForm}/>
    </div>
</section></section>
</div>
<footer id="footer">
<FooterFirstSection/>
<FooterSecondSection/>
<p className="copyright">&copy; 2018 - Made in Saigon</p>
</footer>
 </Wrapper>
   </Router>
  </Provider>
)

const LogoutForm = inject('appStore')(observer(class LogoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: false, errorText: "", redirect: false, successText: ''};
  }
  componentDidMount () {
  this.handleLogout();
  }
  handleLogout =  x => { this.props.appStore.setFalseLoggedInState();
document.cookie = "topicoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

};
render() {
// const isError = this.state.error;
// const redirect = this.state.redirect;
// const successText = this.state.successText;
// if (redirect) {
//   return  <Redirect to={{
//     pathname: '/welcome',
//     state: { from: successText }
//   }}/>
// }
return (
 <h3>Come back soon!</h3>
)

}}));

const WelcomeComponent = inject('appStore')(observer(class WelcomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {doneLoading : false}
    this.eachListComponent = this.eachListComponent.bind(this);
}
  componentWillMount() {
this.props.appStore.getListsByUserId(this.props.match.params.userId);    
  }
  eachListComponent(x, id) {
    return (<WelcomeListComponent x={x} id={id} key={id}/>)
  }
  render() {
    return(
<div>
  <h1>Your Study Decks:</h1>
 {this.props.appStore.listIds ? this.props.appStore.listIds.map(this.eachListComponent) : null}
<FirstHOC doneLoading={this.state.doneLoading}/>
</div>
    )
  }}))


  //smart component, like adddeckcomponent with conditional rendering (but its a list componetn? -> OK I guess)
  const WelcomeListComponent = inject('appStore')(observer(class WelcomeListComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { editing: false}
      this.handleSave = this.handleSave.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
    }
    handleClick() {
      if (this.props.appStore.allowEditListName)
    { 
     this.setState({ editing: !this.state.editing});
     this.props.appStore.setAllowEditListName();
  }  
  }
  handleCancel() {
   this.setState({ editing: false});
   this.props.appStore.setAllowEditListName();
}
    handleSave(e) {
    e.preventDefault(); 
    const newListName = e.target[0].value.toString();
    this.props.appStore.updateListByListId({listName: e.target[0].value.toString(), listId: e.target[0].getAttribute('listid')});
    this.props.appStore.setAllowEditListName();
    this.setState({ editing: !this.state.editing});
    // if (newListName.length === 0)
    // {alert("Fields cannot be empty") }
    // else {
    // this.props.appStore.createList(newListName);
    // this.setState({ editing: false });
    // this.props.appStore.getListsByUserId(this.props.appStore.userId);    
    }
    renderNormal() {
    return (<div className="row uniform"key={this.props.id}>
    <div className="5u 12u$(xsmall)">
    <Link to={`/edit/lists/` + this.props.x.listId + "/" + this.props.x.listName}> 
             {this.props.x["listName"]}</Link>
    </div>
    <div className="5u 12u$(xsmall)">
    <ul className="icons">
             <li><Link to={`/study/lists/` + this.props.x.listId + "/" + this.props.x.listName} className="icon alt fa-play"><span className="label">Clear</span></Link></li> 
             <li><Link to={`/edit/lists/` + this.props.x.listId + "/" + this.props.x.listName} className="icon alt fa-list"><span className="label">Clear</span></Link></li>
           </ul>
    </div>
             </div>)}
    renderEdit() {
              return (
                <form onReset={()=> this.handleCancel()} onSubmit={(e) => this.handleSave(e)}>
                <div className="row uniform">
          <div className="5u 12u$(xsmall)">
             <input type="text" listid={this.props.x.listId} name="demo-name" id="demo-name" defaultValue={this.props.x.listName} />
          </div>
          <div className="12u 12u$(xsmall)">
          <button type="submit" className="button submit">Save</button>
          <button type="reset" className="button">Cancel</button>
          </div>
          </div>
        </form>
        )}
    render() {
              if (this.state.editing)
                return this.renderEdit();
              else { return this.renderNormal() }
            }
          }))

//           <ul className="icons">
//           <li><a  onClick={(e) => this.handleClick()} className="icon alt fa-edit"><span className="label">Clear</span></a></li>
//         </ul>
//  </div>


  const AddDeckComponent =  inject('appStore')(observer(class AddDeckComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = { adding: false}
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick() {
        this.setState({ adding: !this.state.adding, hocState: true })
      }
      handleSave(e) {
      e.preventDefault(); 
      const newListName = e.target[0].value.toString();
      if (newListName.length === 0)
      {alert("Fields cannot be empty") }
      else {
      this.props.appStore.createList(newListName);
      this.setState({ adding: false });
      this.props.appStore.getListsByUserId(this.props.appStore.userId);    
      }}
      renderNormal() { return (<div><button onClick={this.handleClick}>Create a new deck</button></div>) }
      renderEdit() {
        return (
          <form onReset={()=> this.handleClick()} onSubmit={(e) => this.handleSave(e)}>
          <div className="row uniform">
    <div className="5u 12u$(xsmall)">
       <input type="text" name="demo-name" id="demo-name" placeholder="New Deck Name" />
    </div>
    <div className="12u 12u$(xsmall)">
    <button type="submit" className="button submit">Save</button>
    <button type="reset" className="button">Cancel</button>
    </div>
    </div>
  </form>
  )
      }
      render() {
        if (this.state.adding)
          return this.renderEdit();
        else { return this.renderNormal() }
      }
    }
))
  

const LoginForm = inject('appStore')(observer(class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: false, errorText: "", redirect: false, successText: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCookie = this.setCookie.bind(this);
  }
 setCookie(cname, cvalue) {
    var exdays = 3;
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
  handleSubmit(event) {
  event.preventDefault();    
  var formData = { username: event.target.username.value, password: event.target.password1.value};
  this.props.appStore.setUserName(event.target.username.value);
    axios.post('http://localhost:3101/login', formData)
  .then( (response) => {
    if (response.data.error)
    {
   this.setState({error: true, errorText: response.data.messages.map(x => x.msg)});
    }
    else {
    this.props.appStore.setUserId(response.data.userId);
    this.setState({redirect: true, successText: "Your token is " + response.data.token });
    // window.sessionStorage.setItem("token", response.data.token);
    // document.cookie = "token=" + response.data.token;
    var exdays = 3;
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "topicoToken" + "=" + response.data.token + ";" + expires + ";path=/";
    document.cookie =  "userName=" + this.props.appStore.userName  + ";" + expires + ";path=/";
    document.cookie =  "userId=" + this.props.appStore.userId  + ";" + expires + ";path=/";
    this.props.appStore.setTrueLoggedInState();
    }
  }).catch(
    error =>
    {
    if ( error.request.status === 401) {
    this.setState({error: true, errorText: "Username and password are not matching. Please try again"})
  }
  else if ( error.response.status === 400) {
    this.setState({error: true, errorText: "Please enter username and password"})
  }
  else {
    this.setState({error: true, errorText: "Something went wrong a lot"})
  }
});
  }
render() {
const isError = this.state.error;
const redirect = this.state.redirect;
const successText = this.state.successText;
const userId = this.props.appStore.userId;
if (redirect) {
  return  <Redirect to={{
    pathname: '/home/' + "userId/" + userId,
    state: { from: successText }
  }}/>
}
else {
return (
     <div id="main">
     <section id="content" className="main">
     <section>     
     <form onSubmit={this.handleSubmit}>
     Username<input type="text" name="username"/>
     Password<input type="password" name="password1"/>
     <br/>
     <div className="6u 12u$(medium)">
     <ul className="actions">
       <button type="submit" className="button submit">Login</button>
     </ul>
   </div></form>
   {isError ? <ErrorField1 msg={this.state.errorText}/> : null  }
</section></section>
</div>
)}}}));

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: false, errorText: "", redirect: false, successText: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
  event.preventDefault();    
  var formData = { email: event.target.email.value, username: event.target.username.value, password1: event.target.password1.value, password2: event.target.password2.value  };
    axios.post('http://localhost:3101/users', formData)
  .then( (response) => {
    if (response.data.error)
    {
   this.setState({error: true, errorText: response.data.messages.map(x => x.msg)});
    }
    else {
    this.setState({redirect: true, successText: response.data.messages});
    }
  });
  }
render() {
const isError = this.state.error;
const redirect = this.state.redirect;
const successText = this.state.successText;
if (redirect) {
  return  <Redirect to={{
    pathname: '/login',
    state: { from: successText }
  }}/>
}
else {
return (
     <div id="main">
     <section id="content" className="main">
     <section>     
     <form onSubmit={this.handleSubmit}>
     Email<input type="text" name="email"/>
     Username<input type="text" name="username"/>
     Password<input type="password" name="password1"/>
     Repeat Password<input type="password" name="password2"/>
     <br/>
     <div className="6u 12u$(medium)">
     <ul className="actions">
       <button type="submit" className="button submit">Submit</button>
     </ul>
   </div></form>
   {isError ? <ErrorField msg={this.state.errorText}/> : null  }
</section></section>
</div>
)}}};


const ErrorField = props =>
<blockquote><ul>
{props.msg.map(
x => <li>{x}</li>  
)}
</ul></blockquote>

const ErrorField1 = props =>
<blockquote><ul>{props.msg}
</ul></blockquote>

// class SignupForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: 'coconut'};

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit} action="http://localhost:3101/users" method="post">
//         <label>
//           Pick your favorite La Croix flavor:
//           <select value={this.state.value} onChange={this.handleChange}>
//             <option value="grapefruit">Grapefruit</option>
//             <option value="lime">Lime</option>
//             <option value="coconut">Coconut</option>
//             <option value="mango">Mango</option>
//           </select>
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }


class App extends Component {
  render() {
    return (
            <div id="main">
            <IntroSection/>
            </div>
    );
  }
}


// One my decks ( show dropdown, some info text)
// api to call all wl from user
// dropdown with all SL
// button to create a new list (name them?)

// SL screen (get and render all words)
// rows to render every word
// have "Add" (new row) and Save Button

//StudySession Screen

//some 


const RealApp = inject('appStore')(observer(class RealApp extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  if (this.props.appStore.isLoggedIn)
  this.props.history.push("/home/userId/" + this.props.appStore.userId)
  }
  render() {
    return (
     <div id="main">
            <IntroSection/>
            </div>
)};  
  }
));


const ListComponent = inject('appStore')(observer(
class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.createWord = this.createWord.bind(this);
    this.handeSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
   this.state = {redirect: false}
  }
    componentWillMount(){
this.props.appStore.doneLoading = false;
this.props.appStore.setCurrentListInfo(this.props.match.params.listName)
this.props.appStore.getWordsByListId(this.props.match.params.listId);
}
handleReset() {
this.setState({redirect: true});
}
componentWillUnmount () {
this.props.appStore.doneLoading = false;
}
handleSubmit(event) {
  event.preventDefault();
  var wordArray = [];
  [0, 3, 6, 9, 12, 15, 18, 21, 24, 27].forEach((a) => {wordArray.push(this.createWord(event, a))});
  axios.post('http://localhost:3101/words/words', wordArray).then(() => this.props.appStore.getWordsByListId(this.props.match.params.listId))
};
createWord(event, index) {
const createWordFactory = ({ vn, en, exampleUse, wordId, status }) => ({
  vn,
  en,
  exampleUse,
  wordId,
  status
});
const myWord = createWordFactory({
  vn: event.target[index].value, 
  en:  event.target[index+1].value, 
  exampleUse:  event.target[index+2].value, 
  wordId: event.target[index].getAttribute('wordid'), 
  status: event.target[index].getAttribute('status'),
});
return myWord;
}

  render() {
    if (this.state.redirect) {
      return  <Redirect to={{
    pathname: '/home/' + "userId/" + this.props.appStore.userId,
  }}/>  
  }
    if (this.props.appStore.doneLoading)
    return (
     <form onReset={()=> this.handleReset()} onSubmit={(e) => this.handleSubmit(e)}>
       <div className="row uniform">
             <div className="3u 12u$(xsmall)">VN</div>
      <div className="3u 12u$(xsmall)">EN</div>
      <div className="4u 12u$(xsmall)">Example Use</div>
      <div className="2u 12u$(xsmall)">Status</div></div>
    {this.props.appStore.wordIds.map( (c, id) => (
      <Texting vn={c.vn} en={c.en} exampleUse={c.exampleUse} status={c.status} wordId={c.wordId} arrayid={id} key={id}/>
    ))}
       <button type="submit" className="button submit">Save</button>
       <button type="reset" className="button">Cancel</button>
  <ul className="icons">
      <li><Link to={`/study/lists/` + this.props.match.params.listId + "/" + this.props.match.params.listName} 
      className="icon alt fa-play">
      <span className="label">Clear</span></Link></li> 
  </ul>
  </form>
    );
    else {
      return (<div className="loader">Loading...</div>)
    }
  }
}));

const Texting = inject('appStore')(observer(
  class Texting extends Component {
  render() {
    return(
<div className="row uniform">
    <div className="3u 12u$(xsmall)">
       <input type="text" status={this.props.status} wordid={this.props.wordId}  name="demo-name" id="demo-name" defaultValue={this.props.vn} placeholder="VN" />
    </div>
    <div className="3u 12u$(xsmall)">
     <input type="text" name="demo-name" id="demo-name" defaultValue={this.props.en} placeholder="EN" />
    </div>
    <div className="4u 12u$(xsmall)">
    <input type="text" name="demo-name" id="demo-name" defaultValue={this.props.exampleUse} rows="1"></input>
  </div>
  <div className="2u 12u$(xsmall)">
  <ul className="icons">
    <li><a onClick={(e) => this.props.appStore.decrementStatus(e.target.getAttribute("arrayid"))} arrayid={this.props.arrayid} className="icon fa-minus-circle"></a></li>
    <li>{this.props.status}</li>
		<li><a onClick={(e) => this.props.appStore.incrementStatus(e.target.getAttribute("arrayid"))} arrayid={this.props.arrayid} className="icon fa-plus-circle"></a></li>
  </ul>
  </div>
  </div>
)}}))


const Recipe = props => 
<div className="row uniform">
<div class="1u 12u$(small)">
												</div>
    <div className="3u 12u$(xsmall)">
       <input type="text" name="demo-name" id="demo-name" defaultValue={props.props.name} placeholder="Name" />
    </div>
    <div className="3u 12u$(xsmall)">
     <input type="text" name="demo-name" id="demo-name" defaultValue={props.props.name2} placeholder="Name" />
    </div>
    <div className="4u 12u$">
    <input type="text" name="demo-name" id="demo-name" placeholder="Description" rows="1"></input>
  </div>
  <ul class="icons">
													<li><a href="#" class="icon alt fa-remove"><span class="label">Clear</span></a></li>
                        </ul>
</div>
// check icon, clear a row

//Recipe will have a button

const Wrapper = props => <div id="wrapper">{props.children}</div>



const Header = props => <header id="header" className="alt">
<span className="logo"><img src="images/logo.svg" alt="" /></span>
<h1>Topico</h1>
<p>Just another simple Flashcard App</p>
</header>

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
  if (this.props.history.location.pathname.split("/")[0] === "edit")
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



const IntroSection = props => <section id="intro" className="main">
<div className="spotlight">
  <div className="content">
    <header className="major">
      <h2>Motivation</h2>
    </header>
    <p>Studying Flashcards is already challinging enough - we don't need complex and bloated apps to do so. We believe that learning flashcards should be a simple and enjoyable experience </p>
  </div>
  <span className="icon major style1 fa-code"></span>
</div>
</section>

const FirstSection = props => <section id="first" className="main special">
<header className="major">
  <h2>Feature Overview</h2>
</header>
<ul className="features">
  <li>
    <span className="icon major style1 fa-code"></span>
    <h3>Create Decks</h3>
    <p>Topico allows you to create up to 10 flashcard decks with 20 cards.</p>
  </li>
  <li>
    <span className="icon major style3 fa-copy"></span>
    <h3>Track for you progress</h3>
    <p>Track the progress you are making. Topico marks all cards as done when they are done</p>
  </li>
  <li>
    <span className="icon major style5 fa-diamond"></span>
    <h3>Study</h3>
    <p>Studying a deck is as easy as swipe</p>
  </li>
</ul>
<footer className="major">
</footer>
</section>

const SecondSection = props =><section id="second" className="main special">
<header className="major">
  <h2>Ipsum consequat</h2>
  <p>Donec imperdiet consequat consequat. Suspendisse feugiat congue<br />
  posuere. Nulla massa urna, fermentum eget quam aliquet.</p>
</header>
<ul className="statistics">
  <li className="style1">
    <span className="icon fa-code-fork"></span>
    <strong>5,120</strong> Etiam
  </li>
  <li className="style2">
    <span className="icon fa-folder-open-o"></span>
    <strong>8,192</strong> Magna
  </li>
  <li className="style3">
    <span className="icon fa-signal"></span>
    <strong>2,048</strong> Tempus
  </li>
  <li className="style4">
    <span className="icon fa-laptop"></span>
    <strong>4,096</strong> Aliquam
  </li>
  <li className="style5">
    <span className="icon fa-diamond"></span>
    <strong>1,024</strong> Nullam
  </li>
</ul>
<p className="content">Nam elementum nisl et mi a commodo porttitor. Morbi sit amet nisl eu arcu faucibus hendrerit vel a risus. Nam a orci mi, elementum ac arcu sit amet, fermentum pellentesque et purus. Integer maximus varius lorem, sed convallis diam accumsan sed. Etiam porttitor placerat sapien, sed eleifend a enim pulvinar faucibus semper quis ut arcu. Ut non nisl a mollis est efficitur vestibulum. Integer eget purus nec nulla mattis et accumsan ut magna libero. Morbi auctor iaculis porttitor. Sed ut magna ac risus et hendrerit scelerisque. Praesent eleifend lacus in lectus aliquam porta. Cras eu ornare dui curabitur lacinia.</p>
<footer className="major">
  <ul className="actions">
    <li><a href="generic.html" className="button">Learn More</a></li>
  </ul>
</footer>
</section>

const SpecialSection = props => <section id="cta" className="main special">
<header className="major">
  <h2>Create and Study everywhere</h2>
  <p>Topico is available on the web and on your mobile device.<br />
  Sign up now for a special promotion.</p>
</header>
<footer className="major">
  <ul className="actions">
    <li><a href="generic.html" className="button special">Signup</a></li>
    <li><a href="generic.html" className="button">Google PlayStore</a></li>
    <li><a href="generic.html" className="button">iTunes App Store</a></li>
  </ul>
</footer>
</section>

const FooterFirstSection = props =>              <section>
<h2>About Us</h2>
<p>Part of Nam A Bank <br/> built by <a href="https://twitter.com/namn0mn0m">@namn0mn0m</a></p> 

<ul className="actions">
  <li><a href="generic.html" className="button">Learn More</a></li>
</ul>
</section>

const FooterSecondSection = props =>               <section>
<h2>Contact</h2>
<dl className="alt">
  <dt>Address</dt>
  <dd>1234 Somewhere Road &bull; Nashville, TN 00000 &bull; USA</dd>
  <dt>Phone</dt>
  <dd>(000) 000-0000 x 0000</dd>
  <dt>Email</dt>
  <dd><a href="#">information@untitled.tld</a></dd>
</dl>
<ul className="icons">
  <li><a href="#" className="icon fa-twitter alt"><span className="label">Twitter</span></a></li>
  <li><a href="#" className="icon fa-facebook alt"><span className="label">Facebook</span></a></li>
  <li><a href="#" className="icon fa-instagram alt"><span className="label">Instagram</span></a></li>
</ul>
</section>


var imageName = require('./images/pic01.jpg')
const StudySessionComponentContainer = inject('appStore')(observer(
  class StudySessionComponentContainer extends React.Component {
    constructor(props) {
      super(props);
    }
      componentWillMount(){
  this.props.appStore.doneLoading = false;
  this.props.appStore.setRenderDone(false);
  this.props.appStore.setCurrentListInfo(this.props.match.params.listName);
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
      if (this.props.appStore.renderDone)
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
          <h3>Stats this session: You knew {this.props.successCounter} out of 10</h3>
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
    return inject('appStore')(observer( class LoadingHOC extends Component {
            render() {
              console.log(isEmpty(this.props.appStore[loadingProp]));
        return isEmpty(this.props.appStore[loadingProp])  ? <div className="loader"></div> : <WrappedComponent {...this.props}/>;
      }
    }))
  }

  // const First = inject('appStore')(observer(class First extends Component {
  //   render() {
  //     return (<h2>I am the First {this.props.doneLoading.toString()}</h2>)
  //   }
  // }))

  const FirstHOC = LoadingHoc("listIds")(AddDeckComponent);
  const DoneStudyComponentWithSpinner = LoadingHoc("finalStatus")(DoneStudyComponent);
  const StudySessionComponentWithSpinner = LoadingHoc("studyWordIds")(StudySessionComponent);


export default BasicExample;
