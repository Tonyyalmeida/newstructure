import React from 'react';
import { observer, inject } from 'mobx-react';


const IntroSection = inject('appStore')(observer(class IntroSection extends React.Component {
  // componentWillMount() {
  // if (this.props.appStore.isLoggedIn)
  // this.props.history.push("/home/userId/" + this.props.appStore.userId)
  // }
  render() {
    return (
null
)};  
  }
));

const Intro = props => <h2 className="title">Hello world!</h2>

export default IntroSection