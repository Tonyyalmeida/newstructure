import React from 'react';
import {observer, inject } from 'mobx-react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';


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
   {isError ? <ErrorField msg={this.state.errorText}/> : null  }
</section></section>
</div>
)}}}));

const ErrorField = props =>
<blockquote><ul>{props.msg}
</ul></blockquote>


export default LoginForm