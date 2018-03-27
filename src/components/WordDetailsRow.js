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
    <div className="column is-3">
    <input placeholder="example in VN" className="input" type="text" name="demo-name" id="demo-name" defaultValue={this.props.exampleUseEn ? this.props.exampleUseEn : this.props.exampleUse } rows="1"></input>
  </div>
    <div className="column is-2">
     <input className="input" type="text" name="demo-name" id="demo-name" defaultValue={this.props.en} placeholder="EN" />
    </div>
  <div className="column is-3">
    <input placeholder="example in EN" className="input" type="text" name="demo-name" id="demo-name" defaultValue={this.props.exampleUseVn ? this.props.exampleUseVn : null} rows="1"></input>
  </div>
  <div className="column is-3">
  <a arrayid={this.props.arrayid}  onClick={(e) => this.props.appStore.decrementStatus(e.target.getAttribute("arrayid"))}className="button is-danger is-rounded">-</a>
<span><a className="button is-text">{this.props.status}</a></span>
<a arrayid={this.props.arrayid}  onClick={(e) => this.props.appStore.incrementStatus(e.target.getAttribute("arrayid"))}className="button is-success  is-rounded">+</a>

  {/* <ul className="icons">
    <li><a onClick={(e) => this.props.appStore.decrementStatus(e.target.getAttribute("arrayid"))} arrayid={this.props.arrayid} className="icon fa-minus-circle"></a></li>
    <li>{this.props.status}</li>
		<li><a onClick={(e) => this.props.appStore.incrementStatus(e.target.getAttribute("arrayid"))} arrayid={this.props.arrayid} className="icon fa-plus-circle"></a></li>
  </ul> */}
  </div>
  </div>
)}}))

export default WordDetailsRow