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
          render() {
  return this.props.appStore.isRealUser && !this.props.appStore.breach ? null : <Redirect to={{
    pathname: '/login',
    state: { logout: true, error: true, errorText: "Unauthorized Access" }
  }}/>
    }
  }))

  export default SecurityScanner
