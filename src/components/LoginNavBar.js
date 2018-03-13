import React, { Component}from 'react';
import { observer, inject } from 'mobx-react';
import { Link,  Redirect} from 'react-router-dom';

const LoginNavBar= inject('appStore')(observer(class LoginNavBar extends Component {
  constructor(props) {
    super(props);
    this.getCookie = this.getCookie.bind(this);
  }
   getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
componentWillMount() {
const token = this.getCookie("topicoToken");
const userName = this.getCookie('userName');
const userId = this.getCookie("userId");
if (token !== "") {
 //   this.props.appStore.setUserName;
    this.props.appStore.settopicoToken(token);
    this.props.appStore.setTrueLoggedInState();
    this.props.appStore.setUserName(userName);
    this.props.appStore.setUserId(userId);
}
}
  renderNormal() {
    return(
<Heading123/>
  )};
  renderLogin() {
    return (
<HeadingLoggedIn/>
  )};
  render() {
  const loggedIn = this.props.appStore.isLoggedIn;
  if (loggedIn) return this.renderLogin();
  else return this.renderNormal();
};}));


export default LoginNavBar

class Heading123 extends React.Component {

  state = {
    isActive: false,
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  render() {
    return (
      <nav className="navbar"
          aria-label="main navigation"
          style={{
            borderBottom: 'solid 1px #dddddd',
          }}>
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img
              style={{
                borderTopLeftRadius: '50%',
                borderTopRightRadius: '50%',
                borderBottomLeftRadius: '50%',
                borderBottomRightRadius: '50%',
                marginRight: 15
              }}
              src="https://bulma.io/images/bulma-logo.png"
              width="30px" alt="" />
            <span>topico.com</span>
          </Link>
          <button className="button navbar-burger" onClick={this.toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              {/* <span className="icon has-text-primary" style={{ marginRight: 5 }}>
                <i className="fas fa-code"></i>
              </span> */}
              Home
            </Link>
            <Link to="login" className="navbar-item">
              {/* <span className="icon" style={{ marginRight: 5 }}>
                <i className="fab fa-lg fa-medium"></i>
              </span> */}
              Login
            </Link>
            <Link to="signup" className="navbar-item">
              {/* <span className="icon" style={{ marginRight: 5 }}>
                <i className="fab fa-lg fa-medium"></i>
              </span> */}
              Signup
            </Link>
            {/* <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" >
                Login
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item">
                  SignUp
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  This Site
                </a>
                <a className="navbar-item" >
                  Angular The React Way
                </a>
              </div>
            </div> */}
          </div>
          <div className="navbar-end">
            <a className="navbar-item" href="https://github.com/aaronklaser">
              <span className="icon">
                <i className="fab fa-lg fa-github"></i>
              </span>
            </a>
            <a className="navbar-item" href="https://twitter.com/awklaser">
              <span className="icon has-text-info" style={{ color: '#0084FF' }}>
                <i className="fab fa-lg fa-twitter"></i>
              </span>
            </a>
            <a className="navbar-item" href="http://resume.aaronklaser.com">
              Resume
              <span className="icon" style={{ color: '#0077B5', marginLeft: 5 }}>
                <i className="fab fa-lg fa-linkedin"></i>
              </span>
            </a>
          </div>
        </div>
      </nav>
    )
  }
}

class HeadingLoggedIn extends React.Component {

  state = {
    isActive: false,
  }

  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  render() {
    return (
      <nav className="navbar"
          aria-label="main navigation"
          style={{
            borderBottom: 'solid 1px #dddddd',
          }}>
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img
              style={{
                borderTopLeftRadius: '50%',
                borderTopRightRadius: '50%',
                borderBottomLeftRadius: '50%',
                borderBottomRightRadius: '50%',
                marginRight: 15
              }}
              src="https://bulma.io/images/bulma-logo.png"
              width="30px" alt="" />
            <span>topico.com</span>
          </Link>
          <button className="button navbar-burger" onClick={this.toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              {/* <span className="icon has-text-primary" style={{ marginRight: 5 }}>
                <i className="fas fa-code"></i>
              </span> */}
              Home
            </Link>
            {/* <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" >
                Login
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item">
                  SignUp
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  This Site
                </a>
                <a className="navbar-item" >
                  Angular The React Way
                </a>
              </div>
            </div> */}
          </div>
          <div className="navbar-end">
            <Link to="/logout" className="navbar-item" href="https://github.com/aaronklaser">
              <span className="icon">
                <i className="fab fa-lg fa-github"></i>
              </span>
              Logout
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

