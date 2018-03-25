import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';

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
  <section className="section is medium">
  <div className="container is large">
  <div className="columns">
  <div className="column is-half">
  <h1 className="title">Signup</h1>
  <form onSubmit={this.handleSubmit}>
    <div className="field">
    <div className="control has-icons-left has-icons-right">
      <input className="input" name="email" type="text" placeholder="Email"/>
      <span className="icon is-small is-left">
        <i className="fas fa-envelope"></i>
      </span></div>
  </div>
  <div className="field">
    <div className="control has-icons-left has-icons-right">
      <input className="input" name="username" type="text" placeholder="Username"/>
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
  <div className="field">
    <p className="control has-icons-left">
      <input className="input" name="password2" type="password" placeholder="Repeat Password"/>
      <span className="icon is-small is-left">
        <i className="fas fa-lock"></i>
      </span>
    </p>
  </div>
  <div className="field is-grouped">
  <div className="control">
    <button type="submit" className="button is-link">Submit</button>
  </div></div></form>
  {isError ? <ErrorField msg={this.state.errorText}/> : null  }
  </div>
  </div>
</div>
</section>
)}}};


const ErrorField = props =>
<div>
{props.msg.map((x) => <p className="help is-danger">{x}</p>)} 
</div>

export default SignupForm