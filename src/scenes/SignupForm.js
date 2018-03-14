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

export default SignupForm