import React from 'react';
import { observer, inject } from 'mobx-react';



const IntroSection = inject('appStore')(observer(class IntroSection extends React.Component {
  constructor(props) {
    super(props);
  }
  // componentWillMount() {
  // if (this.props.appStore.isLoggedIn)
  // this.props.history.push("/home/userId/" + this.props.appStore.userId)
  // }
  render() {
    return (
     <div id="main">
            <Intro/>
            </div>
)};  
  }
));

const Intro = props => <h2 className="title">Hello world!</h2>

export default IntroSection