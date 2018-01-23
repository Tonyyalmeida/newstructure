import React, { Component } from 'react';
import './css/main.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  NavLink
} from 'react-router-dom';
import axios from 'axios';
import { Provider, observer, inject } from 'mobx-react';
import appStore from './stores/appStore';

const stores = { appStore };

const BasicExample = () => (
  <Provider {...stores}>
        <Router>
        <Wrapper>
        <LoginNavbar/>
       <Header/>
       <Route path="/home/:root/:ignore" component={AppNavbar}/>
     <div id="main">
     <section id="content" className="main">
     <section>     
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/about" component={RealApp}/>
      <Route exact path="/signup" component={SignupForm}/>
      <Route exact path="/login" component={LoginForm}/>
      <Route exact path="/home/userId/:userId" component={WelcomeComponent}/>
      <Route exact path="/home/lists/:listId/:listName" component={ListComponent}/>
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
}
  componentWillMount() {
this.props.appStore.getListsByUserId(this.props.match.params.userId);    
  }
  render() {
    return(
<div>
  <h1>Your Study Decks:</h1>
 {this.props.appStore.listIds.data ? this.props.appStore.listIds.data.map( (x, id) =><div key={id}> <Link to={`/home/lists/` + x.listId + "/" + x.listName} key={id}> Listname: {x["listName"]}  ListId: {x["listId"]}</Link></div>) : null}
<AddDeckComponent/>
</div>
    )
  }}))

  const AddDeckComponent =  inject('appStore')(observer(class AddDeckComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = { adding: false}
        this.handleSave = this.handleSave.bind(this);
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick() {
        this.setState({ adding: !this.state.adding })
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
      renderNormal() { return (<div><button onClick={this.handleClick}>Create WL</button></div>) }
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
    pathname: '/about',
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
    this.state = {error: false };
  }
// 
  componentDidMount () {

  }
  render() {
    return (
            <div id="main">
            



            </div>
    );
  }
}));

// class Welcome extends Component {
//   render() {
//     return (
//       <div id="main">
//       <section>
// 										<h2>Form</h2>
// 										<form method="post" action="#">
// 											<div className="row uniform">
// 												<div className="6u 12u$(xsmall)">
// 													<input type="text" name="demo-name" id="demo-name" value="" placeholder="Name" />
// 												</div>
//                         <div className="6u 12u$(xsmall)">
//                          <input type="text" name="demo-name" id="demo-name" value="" placeholder="Name" />
//                         </div>
//                       </div>
//             </form>
//             </section>
//             </div>
//     );
//   }
// }

// class Welcome extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { list: [] };
//     // this.handleAdd = this.handleAdd.bind(this);
//     // this.handleEdit = this.handleEdit.bind(this);
//     // this.eachRecipe = this.eachRecipe.bind(this);
//     // this.handleDelete = this.handleDelete.bind(this);
//   }
//   componentWillMount() {
//     this.setState({list: [{name: "Carbonara", name2: "Noodles"}, {name: "Pho", name2: "Rice Noodles"}, {name: "Buger", name2: "mustard"}]})
//     //this.setState({ list: JSON.parse(localList) });
//   }
//   // handleAdd(e) {
//   //   var newRecipe = e;
//   //   var newList = this.state.list.slice();
//   //   newList.push(newRecipe);
//   //   this.setState({ list: newList });
//   //   localStorage.setItem("RecipeList", JSON.stringify(newList));
//   // }
//   // handleDelete(e) {
//   //   var newList = this.state.list.slice();
//   //   newList.splice(e, 1);
//   //   this.setState({ list: newList });
//   //   localStorage.setItem("RecipeList", JSON.stringify(newList));
//   // }
//   // handleEdit(value, index) {
//   //   var newRecipe = value;
//   //   var newList = this.state.list.slice();
//   //   newList[index] = newRecipe;
//   //   this.setState({ list: newList });
//   //   localStorage.setItem("RecipeList", JSON.stringify(newList));
//   // }
//   eachRecipe(product, id) {
//     console.log(product.name);
//     return (<div><Recipe className="normalrecipe" props={product} /> </div>)
//   }
//   render() {
//     var list = this.state.list.map(this.eachRecipe);
//     return (<div>
//     <h2>Done</h2>
//       <form method="post" action="#">{list}</form>
//       <div className="12u$">
//       <ul class="actions">
//        <li><span class="button special disabled small">Save</span></li>
//        <li><span class="button disabled small">Clear List</span></li>
//       </ul>
//      </div>
//    </div>
//     )
//   }
// }

// class Checkbox extends Component {
//   state = {
//     isChecked: false,
//   }

//   toggleCheckboxChange = () => {
//     const { handleCheckboxChange, label } = this.props;

//     this.setState(({ isChecked }) => (
//       {
//         isChecked: !isChecked,
//       }
//     ));

//     handleCheckboxChange(label);
//   }
//   render() {
//     const { label } = this.props;
//     const { isChecked } = this.state;

//     return (
//       <div className="checkbox">
//         <label>
//           <input
//             type="checkbox"
//             value={label}
//             checked={isChecked}
//             onChange={this.toggleCheckboxChange}
//           />

//           {label}
//         </label>
//       </div>
//     );
//   }
// }

  
//   class CheckboxList extends Component {
//     componentWillMount = () => {
//       this.selectedCheckboxes = new Set();
//     }
  
//     toggleCheckbox = label => {
//       if (this.selectedCheckboxes.has(label)) {
//         this.selectedCheckboxes.delete(label);
//       } else {
//         this.selectedCheckboxes.add(label);
//       }
//     }
  
//     handleFormSubmit = formSubmitEvent => {
//       formSubmitEvent.preventDefault();
  
//       for (const checkbox of this.selectedCheckboxes) {
//         console.log(checkbox, 'is selected.');
//       }
//     }
  
//     createCheckbox = label => (
//       <Checkbox
//         label={label}
//         handleCheckboxChange={this.toggleCheckbox}
//         key={label}
//       />
//     )
  
//     createCheckboxes = () => (
//       ['One','Two','Three',].map(this.createCheckbox)
//     )
  
//     render() {
//       return (
//         <div className="container">
//           <div className="row">
//             <div className="col-sm-12">
  
//               <form onSubmit={this.handleFormSubmit}>
//                 {this.createCheckboxes()}
  
//                 <button className="btn btn-default" type="submit">Save</button>
//               </form>
  
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }

// const Welcome = inject('appStore')(class Welcome extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isGoing: true,
//       numberOfGuests: true
//     };}
//   render() {
//     return (
//               <NameListComponent/ id=>
//     )
       /*<form> 
      											<div className="row uniform">
       												<div className="12u 12u$(xsmall)">
       <input
            name="isGoing"
            type="checkbox"
            id="isGoing"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
            <label htmlFor="isGoing">Email me a copy</label>
            </div>
            <div className="12u 12u$(xsmall)">
            <input
            name="numberOfGuests"
            type="checkbox"
            id="numberOfGuests"
            checked={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
            <label htmlFor="numberOfGuests">Email me a copy</label>
            </div></div>
            <button onClick={this.consoleMe} ></button>
      </form>*/
//   }
// })


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
this.props.appStore.setCurrentListInfo(this.props.match.params.listName)
this.props.appStore.getWordsByListId(this.props.match.params.listId);
}
handleReset() {
 this.props.appStore.getWordsByListId(this.props.match.params.listId);
}
componentWillUnmount () {
this.props.appStore.doneLoading = false;
console.log('set');
}
handleSubmit(event) {
  event.preventDefault();
  var wordArray = [];
  [0, 3, 6].forEach((a) => {wordArray.push(this.createWord(event, a))
if (a === 6) {axios.post('http://localhost:3101/words/words', wordArray).then(this.setState({redirect: true}))}  
});
};
createWord(event, index) {
const createWordFactory = ({ en, vn, exampleUse, wordId, status }) => ({
  en,
  vn,
  exampleUse,
  wordId,
  status
});
const myWord = createWordFactory({
  en: event.target[index].value, 
  vn:  event.target[index+1].value, 
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
    {this.props.appStore.wordIds.data.map( (c, id) => (
      <Texting vn={c.vn} en={c.en} exampleUse={c.exampleUse} status={c.status} wordId={c.wordId} arrayid={id} key={id}/>
    ))}
       <button type="submit" className="button submit">Save</button>
       <button type="reset" className="button">Cancel</button>
  </form>
    );
    else {
      return (<h2>Loading...</h2>)
    }
  }
}));

const Texting = inject('appStore')(observer(
  class Texting extends Component {
  render() {
    return(
<div className="row uniform">
    <div className="3u 12u$(xsmall)">
       <input type="text" status={this.props.status} wordid={this.props.wordId}  name="demo-name" id="demo-name" defaultValue={this.props.vn} placeholder="Name" />
    </div>
    <div className="3u 12u$(xsmall)">
     <input type="text" name="demo-name" id="demo-name" defaultValue={this.props.en} placeholder="Name" />
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
    <li><Link to="/">Topico</Link></li>
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
      helpString: ""
    }
  }
  renderNormal() {
    return(
    <nav id="nav">
    <ul  className="appnav">
   <li><Link to={"/home/" + "userId/" + this.props.appStore.userId}>Back to Overview</Link></li>
    </ul>
    </nav>
  )};
  renderLists() {
    return (
    <nav id="nav">
    <ul className="appnav">
   <li><NavLink to={"/home/" + "userId/" + this.props.appStore.userId}>Back to Overview</NavLink></li>
   <li><h2>{this.props.appStore.currentListInfo ? this.props.appStore.currentListInfo : "unnamed" }</h2></li>
    </ul>
    </nav>
  )};
  render() {
  const root = this.props.match.params.root; 
  if (this.props.match.params.root === "lists")
  return this.renderLists();
  else return this.renderNormal();
};}));



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

export default BasicExample;
