import React from 'react';
import { observer, inject } from 'mobx-react';



const IntroSection = inject('appStore')(observer(class IntroSection extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  if (this.props.appStore.isLoggedIn)
  this.props.history.push("/home/userId/" + this.props.appStore.userId)
  }
  render() {
    return (
     <div id="main">
            <Intro/>
            </div>
)};  
  }
));

const Intro = props => <section id="intro" className="main">
<div className="spotlight">
  <div className="content">
    <header className="major">
      <h2>Motivation</h2>
    </header>
    <p>Studying Flashcards is already challinging enough - we don't need complex and bloated apps to do so. We believe that learning flashcards should be a simple and enjoyable experience </p>
  </div>
  <span className="icon major style1 fa-code"></span>
</div>
</section>

export default IntroSection