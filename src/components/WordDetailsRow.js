import React, { Component}from 'react';
import { observer, inject } from 'mobx-react';


const WordDetailsRow = inject('appStore')(observer(
  class WordDetailsRow extends Component {
  render() {
    return(
<div className="columns">
    <div className="column is-2">
    <div className="field"><div className="control">
       <input className="input" type="text" status={this.props.status} wordid={this.props.wordId}  name="demo-name" id="demo-name" defaultValue={this.props.vn} placeholder="VN" />
    </div></div>
    
    </div>
    <div className="column is-2">
     <input className="input" type="text" name="demo-name" id="demo-name" defaultValue={this.props.en} placeholder="EN" />
    </div>
    <div className="column is-3">
    <input className="input" type="text" name="demo-name" id="demo-name" defaultValue={this.props.exampleUse} rows="1"></input>
  </div>
  <div className="column is-3">
    <input className="input" type="text" name="demo-name" id="demo-name" defaultValue={"hallo"} rows="1"></input>
  </div>
  <div className="column is-2">
  <span className="icon">
  <i className="fas fa-minus-circle"></i>
</span><span>{this.props.status}</span>
<span className="icon">
  <i className="fas fa-plus-circle"></i>
</span>

  {/* <ul className="icons">
    <li><a onClick={(e) => this.props.appStore.decrementStatus(e.target.getAttribute("arrayid"))} arrayid={this.props.arrayid} className="icon fa-minus-circle"></a></li>
    <li>{this.props.status}</li>
		<li><a onClick={(e) => this.props.appStore.incrementStatus(e.target.getAttribute("arrayid"))} arrayid={this.props.arrayid} className="icon fa-plus-circle"></a></li>
  </ul> */}
  </div>
  </div>
)}}))

export default WordDetailsRow