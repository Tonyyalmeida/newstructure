import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

export const LoadingHocWithEmptyTwo = (loadingProp1) => (WrappedComponent) => {
  return inject('appStore')(observer( class DoubleHoc extends Component {
          render() {
  return this.props.appStore.doneLoading ?  <WrappedComponent {...this.props}/> : <div className="loader"></div>
    }
  }))
}
