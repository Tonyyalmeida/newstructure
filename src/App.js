import React, { Component } from 'react';
import './css/main.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const BasicExample = () => (
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/about" component={RealApp}/>
      <Route exact path="/signup" component={SignupForm}/>
    </div>
  </Router>
)


class SignupForm extends Component {
render() {
return (
  <Wrapper>
     <div id="main">
     <section id="content" className="main">
     <section>
     Username<input type="text" name="username" placeholder="username"/>
     Password<input type="text" name="password1" placeholder="Password"/>
     Repeat Password<input type="text" name="password2" placeholder="Repeat password"/>
</section></section></div>
<footer id="footer">
<FooterFirstSection/>
<FooterSecondSection/>
<p className="copyright">&copy; 2018 - Made in Saigon</p>
</footer>
 </Wrapper>
)}};



class App extends Component {
  render() {
    return (
        <Wrapper>
        <Navbar/>
         <Header></Header>
            <div id="main">
            <IntroSection/>
            <FirstSection/>
            <SpecialSection/>
            </div>
            <footer id="footer">
              <FooterFirstSection/>
              <FooterSecondSection/>
              <p className="copyright">&copy; 2018 - Made in Saigon</p>
            </footer>
        </Wrapper>  
    );
  }
}

class RealApp extends Component {
  render() {
    return (
        <Wrapper>
         <Navbar/>
            <div id="main">
            <SpecialSection/>
            </div>
            <footer id="footer">
              <FooterFirstSection/>
              <FooterSecondSection/>
              <p className="copyright">&copy; 2018 - Made in Saigon</p>
            </footer>
        </Wrapper>  
    );
  }
}

const Wrapper = props => <div id="wrapper">{props.children}</div>

const Header = props => <header id="header" className="alt">
<span className="logo"><img src="images/logo.svg" alt="" /></span>
<h1>Topico</h1>
<p>Just another simple Flashcard App</p>
</header>

const Navbar = props => <nav id="nav">
<ul>
<li><Link to="/">Home</Link></li>
<li><Link to="/about">About</Link></li>
<li><Link to="/signup">Signup</Link></li>
</ul>
</nav>;

const IntroSection = props => <section id="intro" className="main">
<div className="spotlight">
  <div className="content">
    <header className="major">
      <h2>Motivation</h2>
    </header>
    <p>Studying Flashcards is already challinging enough - we don't need complex and bloated apps to do so. We believe that learning flashcards should be a simple and enjoyable experience </p>
  </div>
  <span class="icon major style1 fa-code"></span>
</div>
</section>

const FirstSection = props => <section id="first" className="main special">
<header className="major">
  <h2>Feature Overview</h2>
</header>
<ul className="features">
  <li>
    <span className="icon major style1 fa-code"></span>
    <h3>Create Decks</h3>
    <p>Topico allows you to create up to 10 flashcard decks with 20 cards.</p>
  </li>
  <li>
    <span className="icon major style3 fa-copy"></span>
    <h3>Track for you progress</h3>
    <p>Track the progress you are making. Topico marks all cards as done when they are done</p>
  </li>
  <li>
    <span className="icon major style5 fa-diamond"></span>
    <h3>Study</h3>
    <p>Studying a deck is as easy as swipe</p>
  </li>
</ul>
<footer className="major">
</footer>
</section>

const SecondSection = props =><section id="second" className="main special">
<header className="major">
  <h2>Ipsum consequat</h2>
  <p>Donec imperdiet consequat consequat. Suspendisse feugiat congue<br />
  posuere. Nulla massa urna, fermentum eget quam aliquet.</p>
</header>
<ul className="statistics">
  <li className="style1">
    <span className="icon fa-code-fork"></span>
    <strong>5,120</strong> Etiam
  </li>
  <li className="style2">
    <span className="icon fa-folder-open-o"></span>
    <strong>8,192</strong> Magna
  </li>
  <li className="style3">
    <span className="icon fa-signal"></span>
    <strong>2,048</strong> Tempus
  </li>
  <li className="style4">
    <span className="icon fa-laptop"></span>
    <strong>4,096</strong> Aliquam
  </li>
  <li className="style5">
    <span className="icon fa-diamond"></span>
    <strong>1,024</strong> Nullam
  </li>
</ul>
<p className="content">Nam elementum nisl et mi a commodo porttitor. Morbi sit amet nisl eu arcu faucibus hendrerit vel a risus. Nam a orci mi, elementum ac arcu sit amet, fermentum pellentesque et purus. Integer maximus varius lorem, sed convallis diam accumsan sed. Etiam porttitor placerat sapien, sed eleifend a enim pulvinar faucibus semper quis ut arcu. Ut non nisl a mollis est efficitur vestibulum. Integer eget purus nec nulla mattis et accumsan ut magna libero. Morbi auctor iaculis porttitor. Sed ut magna ac risus et hendrerit scelerisque. Praesent eleifend lacus in lectus aliquam porta. Cras eu ornare dui curabitur lacinia.</p>
<footer className="major">
  <ul className="actions">
    <li><a href="generic.html" className="button">Learn More</a></li>
  </ul>
</footer>
</section>

const SpecialSection = props => <section id="cta" className="main special">
<header className="major">
  <h2>Create and Study everywhere</h2>
  <p>Topico is available on the web and on your mobile device.<br />
  Sign up now for a special promotion.</p>
</header>
<footer className="major">
  <ul className="actions">
    <li><a href="generic.html" className="button special">Signup</a></li>
    <li><a href="generic.html" className="button">Google PlayStore</a></li>
    <li><a href="generic.html" className="button">iTunes App Store</a></li>
  </ul>
</footer>
</section>

const FooterFirstSection = props =>              <section>
<h2>About Us</h2>
<p>Part of Nam A Bank <br/> built by <a href="https://twitter.com/namn0mn0m">@namn0mn0m</a></p> 

<ul className="actions">
  <li><a href="generic.html" className="button">Learn More</a></li>
</ul>
</section>

const FooterSecondSection = props =>               <section>
<h2>Contact</h2>
<dl className="alt">
  <dt>Address</dt>
  <dd>1234 Somewhere Road &bull; Nashville, TN 00000 &bull; USA</dd>
  <dt>Phone</dt>
  <dd>(000) 000-0000 x 0000</dd>
  <dt>Email</dt>
  <dd><a href="#">information@untitled.tld</a></dd>
</dl>
<ul className="icons">
  <li><a href="#" className="icon fa-twitter alt"><span className="label">Twitter</span></a></li>
  <li><a href="#" className="icon fa-facebook alt"><span className="label">Facebook</span></a></li>
  <li><a href="#" className="icon fa-instagram alt"><span className="label">Instagram</span></a></li>
</ul>
</section>

export default BasicExample;
