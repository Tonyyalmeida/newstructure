import React from 'react';
import { observer, inject } from 'mobx-react';
import CreateWordlist from "../components/CreateWordlist";


const isEmpty = (prop) => (
  prop === null ||
  prop === undefined ||
  prop[0] === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)
);

const WelcomeComponent = inject('appStore')(observer(
  class WelcomeComponent extends React.Component {
    constructor(props) {
      super(props);
     this.state = {redirect: false, editing: false}
    }
    componentDidMount() {
      if (this.props.appStore.doneLoading == false && !isEmpty(this.props.appStore.listIds) )
     { this.props.appStore.setDoneLoading(true)
    }
    }
    render() {
      if(this.props.appStore.doneLoading)
      {
        return (  <div>
          <nav className="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li className="is-active"><a style={{fontWeight:"800"}}aria-current="page">Home</a></li>
    </ul>
  </nav>
  <div className="tile is-ancestor">
  <div className="tile is-vertical is-9">
    <div className="tile is-parent">
          <article className="tile is-child notification is-primary">
            <p className="title">Welcome {this.props.appStore.userName}!</p>
            <p>Topico will help you to accomplishment your goals!</p>
          </article>
        </div>
      <div className="tile is-parent">
        <article className="tile is-child is-warning notification">
  <div><br/>
  <p className="subtitle" style={{fontStyle:"oblique"}}>"Success is no accident. It is hard work, perseverance, learning, studying and sacrifice.
  Repetition is the mother of learning, the father of action, which makes it the architect of accomplishment."</p>
  <br/>
  </div>
   <span style={{float: "right"}}><CreateWordlist/>     </span>
        </article></div> 
    </div>
          </div>  
              </div>)
      }
    else
    {  return (<div className="loader"></div>)}
    }
    }));

export default WelcomeComponent