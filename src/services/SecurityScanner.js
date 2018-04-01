import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Redirect
} from 'react-router-dom';


const SecurityScanner= inject('appStore')(observer( class SecurityScanner extends Component {
  componentWillMount () {
   this.props.appStore.setUserId(this.props.match.params.total);
  };
  componentWillUpdate(nextProps, nextState) {
  nextProps.appStore.setUserId(this.props.match.params.total);
  };
  componentDidUpdate() {
  this.props.appStore.setDoneCreatingList(false);
}
          render() {
if (!this.props.appStore.isRealUser && this.props.appStore.breach) 
{return <Redirect to={{
    pathname: '/login',
    state: { logout: true, error: true, errorText: "Unauthorized Access" }
  }}/>}
  if (this.props.appStore.doneCreatingList)
  {
      return <Redirect to={{
      pathname: "/home/userId/" + this.props.appStore.userId + "/lists/" + this.props.appStore.currentListInfo + '/edit',
    }}/>
  }
return (null);      
}
  }))

  export default SecurityScanner
