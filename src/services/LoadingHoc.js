import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

const isEmpty = (prop) => (
  prop === null ||
  prop === undefined ||
  prop[0] === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)
);

export const LoadingHoc = loadingProp => WrappedComponent => {
  return inject('appStore')(observer( class LoadingHoc extends Component {
          render() {
      return isEmpty(this.props.appStore[loadingProp])  ? <div className="loader"></div> : <WrappedComponent {...this.props}/>;
    }
  }))
}