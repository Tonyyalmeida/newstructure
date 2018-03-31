import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

const isEmpty = (prop) => (
  prop === null ||
  prop === undefined ||
  prop[0] === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)
);

export const LoadingHocWithEmpty = (loadingProp1) => (WrappedComponent) => {
  return inject('appStore')(observer( class DoubleHoc extends Component {
          render() {
  return this.props.appStore.doneLoading ?  ((isEmpty(this.props.appStore[loadingProp1])  ) ? <EmptyComponent/> : <WrappedComponent {...this.props}/>) : <div className="loader"></div>
    }
  }))
}

const EmptyComponent = props => <div className="container is-fluid"><article className="message is-danger">
<div className="message-header">
  <p>Oops, looks like something went wrong.</p>
</div>
<div className="message-body"><p>
Maybe there are no Words in the List you want to study</p>
</div>
</article></div>
