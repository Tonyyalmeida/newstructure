import React, { Component}from 'react';
import { observer, inject } from 'mobx-react';
import { Link} from 'react-router-dom';

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
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
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
    this.props.appStore.settopicoToken(token);
    this.props.appStore.setTrueLoggedInState();
    this.props.appStore.setUserName(userName);
    this.props.appStore.setUserId(userId);
    this.props.appStore.setUserIdFromCookie(userId);
}
}
renderLoginMobile() {
  return (<HeadingLoggedInAndMobile/>)
}
  renderNormal() {
    return(
<Heading123/>
  )};
  renderLogin() {
    return (
<HeadingLoggedIn userId={this.props.appStore.userId}/>
  )};
  render() {
  const loggedIn = this.props.appStore.isLoggedIn;
  const isMobile = this.props.appStore.isMobile
  if (loggedIn && isMobile ) return this.renderLoginMobile();
  else if (loggedIn) return this.renderLogin();
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
      <nav className="navbar is-light"
      style={{
        borderBottom: 'solid 1px #dddddd',
      }}    
      aria-label="main navigation"
          >
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
              src={require("../images/logo.png")}
              width="30px" alt="" />
            <span>studywithtopico.com</span>
          </Link>
          <button className="button navbar-burger" onClick={this.toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
            <div className="navbar-end">
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
      <nav className="navbar is-light"
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
              src={require("../images/logo.png")}
              width="30px" alt="" />
            <span>studywithtopico.com</span>
          </Link>
          <button className="button navbar-burger" onClick={this.toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
          <div className="navbar-start">
            <Link to={"/home/userId/" + this.props.userId} className="navbar-item">
              Home
            </Link>
          </div>
          <div className="navbar-end">
            <Link to={{pathname: "/login", state: { logout: true }}} className="navbar-item">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

const HeadingLoggedInAndMobile= inject('appStore')(observer(class HeadingLoggedInAndMobile extends React.Component {
  state = {
    isActive: false,
  }
  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }
  eachListComponent(x, id) {
    return (<NavwordlistRow x={x} id={id} key={id}/>)
  }
  render() {
    const openLists = this.props.appStore.listIds.filter((list) => list.listStatus == "undefined" || list.listStatus == 0 || list.listStatus == '0' );
    const closedLists = this.props.appStore.listIds.filter((list) => list.listStatus == "1");
    return (
      <nav className="navbar is-light"
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
              src={require("../images/logo.png")}
              width="30px" alt="" />
            <span>studywithtopico.com</span>
          </Link>
          <button className="button navbar-burger" onClick={this.toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
          <div className="navbar-start">
          Open Word Decks ({openLists ? this.props.appStore.numberOfOpenLists : 0})
          {openLists ? openLists.map(this.eachListComponent) : null}
        <hr className="navbar-divider"/>
        <br/>
        Closed Word Decks ({closedLists ? this.props.appStore.numberOfClosedLists : 0})
          {closedLists ? closedLists.map(this.eachListComponent) : null}
          <hr className="navbar-divider"/>
          </div>
          <div className="navbar-end">
          <hr className="navbar-divider"/>
          <hr className="navbar-divider"/>
            <Link to={{pathname: "/login", state: { logout: true }}} className="navbar-item">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}))

const NavwordlistRow = inject('appStore')(observer(class NavwordlistRow extends React.Component {
  render() {
   return (
   <Link className={"navbar-item"}to={"/home/userId/" + this.props.appStore.userId +  "/lists/" + this.props.x.listId + "/edit"}>
            {this.props.x.listName}</Link>
            )
        }}))
