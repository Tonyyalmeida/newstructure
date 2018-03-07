import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

const isEmpty = (prop) => (
  prop === null ||
  prop === undefined ||
  prop[0] === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)
);

export const LoadingDoubleHoc = (loadingProp1, loadingProp2) => (WrappedComponent) => {
  return inject('appStore')(observer( class DoubleHoc extends Component {
          render() {
  return this.props.appStore.doneLoading ?  ((isEmpty(this.props.appStore[loadingProp1])  || isEmpty(this.props.appStore[loadingProp2])) ? <EmptyComponent/> : <WrappedComponent {...this.props}/>) : <div className="loader"></div>
    }
  }))
}

const EmptyComponent = props => <div><h2>Oops, looks like something went wrong.</h2><h3>Please try again later</h3></div>
