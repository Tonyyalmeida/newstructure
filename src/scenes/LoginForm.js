import React from 'react';
import {observer, inject } from 'mobx-react';
import axios from 'axios';
import { Link} from 'react-router-dom';


const LoginForm = inject('appStore')(observer(class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: false, errorText: "", successText: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCookie = this.setCookie.bind(this);
    this.handleLogout =    this.handleLogout.bind(this);
  }
  componentWillMount() {
    this.props.appStore.setDoneLoading(true);
 if (this.props.location.state)
{
 if (this.props.location.state.logout)
 {
  this.handleLogout();
  if (this.props.location.state.error) {
    this.setState({errorText: this.props.location.state.errorText, error: true});
    this.props.appStore.setDoneLoading(true);
}
 }
 else {
this.setState({successText: this.props.location.state.from});
}
}
this.props.appStore.setDoneLoading(true);
  }
handleLogout() { 
  this.props.appStore.setFalseLoggedInState();
    document.cookie = "topicoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
this.setState({successText: "You just logged out"}, () =>   this.props.appStore.setDoneLoading(true));
    };
 setCookie(cname, cvalue) {
    var exdays = 3;
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
  handleSubmit(event) {
  event.preventDefault();
  this.props.appStore.setDoneLoading(false);    
  var formData = { email: event.target.username.value.toString().replace(/ /g, ""), password: event.target.password1.value.toString().replace(/ /g, "")};
  this.props.appStore.setUserName(event.target.username.value);
    axios.post('https://peaceful-tundra-85950.herokuapp.com/login', formData)
  .then( (response) => {
    if (response.data.error)
    {
      this.props.appStore.setDoneLoading(true);
   this.setState({error: true, errorText: response.data.messages.map(x => x.msg)});
    }
    else {
    this.props.appStore.setDoneLoading(true);
    this.props.appStore.setUserId(response.data.userId);
    this.props.appStore.setUserIdFromCookie(response.data.userId);
    // window.sessionStorage.setItem("token", response.data.token);
    // document.cookie = "token=" + response.data.token;
    var exdays = 3;
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "topicoToken=" + response.data.token + ";" + expires + ";path=/";
    this.props.appStore.settopicoToken(response.data.token); 
    document.cookie =  "userName=" + this.props.appStore.userName  + ";" + expires + ";path=/";
    document.cookie =  "userId=" + this.props.appStore.userId  + ";" + expires + ";path=/";
    this.props.appStore.setTrueLoggedInState();
    this.props.appStore.setDoneLoading(true);
    this.props.history.push("/home/userId/" + this.props.appStore.userId)
    //this.setState({redirect: true, successText: "You got logged in" });
    }
  }).catch(
    error =>
    {
    if (error.request) {
    if ( error.request.status === 401) {
    this.props.appStore.setDoneLoading(true);
    this.setState({error: true, errorText: "Username and password are not matching. Please try again"})
  }
  if ( error.request.status === 400) {
    this.props.appStore.setDoneLoading(true);
    this.setState({error: true, errorText: "Please enter username and password"})
  }
  else {
    this.props.appStore.setDoneLoading(true);
    this.setState({error: true, errorText: "Something went wrong"})
  }
}
  else {
    this.props.appStore.setDoneLoading(true);
    this.setState({error: true, errorText: "Something went wrong"})
  }
});
  }
render() {
const isError = this.state.error;
const successText = this.state.successText;
return (  
  <section className="section is-medium hero is-primary">
  <div className="is-large">
  <div className="columns is-centered">
  <div className="column is-4 has-text-centered">
  <div className="box has-text-centered">
  <h1 style={{color: "#584e4e"}} className="title">Login</h1>
  <form onSubmit={this.handleSubmit}>
    <div className="field">
    <div className="control has-icons-left has-icons-right">
      <input className="input" name="username" type="text" placeholder="Email"/>
      <span className="icon is-small is-left">
        <i className="fas fa-envelope"></i>
      </span></div>
  </div>
  <div className="field">
    <p className="control has-icons-left">
      <input className="input" name="password1" type="password" placeholder="Password"/>
      <span className="icon is-small is-left">
        <i className="fas fa-lock"></i>
      </span>
    </p>
  </div>
  <div className="field is-grouped">
  <div className="control">
    {this.props.appStore.doneLoading ? <button type="submit" className="button is-link">Submit</button> : <div className="loader"></div>}
  </div></div></form>
  {isError ? <ErrorField msg={this.state.errorText}/> : null  }
  {successText ? <SuccessField msg={successText}/> : null  }
  </div>
<p><Link to="/signup">Signup</Link></p>
  </div></div>
</div>
</section>
)
}}
));

const ErrorField = props =>
<p className="help is-danger"> {props.msg}
</p>
const SuccessField = props =>
<p className="help is-success"> {props.msg}
</p>
export default LoginForm