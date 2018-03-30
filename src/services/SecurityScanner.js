import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Redirect
} from 'react-router-dom';


const SecurityScanner= inject('appStore')(observer( class SecurityScanner extends Component {
  componentWillMount () {
   this.props.appStore.setUserId(this.props.match.params.userId);
  };
  componentWillUpdate(nextProps, nextState) {
  nextProps.appStore.setUserId(this.props.match.params.userId);
  };
          render() {
  return this.props.appStore.isRealUser ? null : <Redirect to={{
    pathname: '/login',
    state: { logout: true, error: true, errorText: "Unauthorized Access" }
  }}/>
    }
  }))

  export default SecurityScanner
