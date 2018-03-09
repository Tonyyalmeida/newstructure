import React from 'react';
import { observer, inject } from 'mobx-react';

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
return (
 <h3>Come back soon!</h3>
)
}}));

export default LogoutForm