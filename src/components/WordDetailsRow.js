import React, { Component}from 'react';
import { observer, inject } from 'mobx-react';


const WordDetailsRow = inject('appStore')(observer(
  class WordDetailsRow extends Component {
  render() {
    return(
<div className="row uniform">
    <div className="3u 12u$(xsmall)">
       <input type="text" status={this.props.status} wordid={this.props.wordId}  name="demo-name" id="demo-name" defaultValue={this.props.vn} placeholder="VN" />
    </div>
    <div className="3u 12u$(xsmall)">
     <input type="text" name="demo-name" id="demo-name" defaultValue={this.props.en} placeholder="EN" />
    </div>
    <div className="4u 12u$(xsmall)">
    <input type="text" name="demo-name" id="demo-name" defaultValue={this.props.exampleUse} rows="1"></input>
  </div>
  <div className="2u 12u$(xsmall)">
  <ul className="icons">
    <li><a onClick={(e) => this.props.appStore.decrementStatus(e.target.getAttribute("arrayid"))} arrayid={this.props.arrayid} className="icon fa-minus-circle"></a></li>
    <li>{this.props.status}</li>
		<li><a onClick={(e) => this.props.appStore.incrementStatus(e.target.getAttribute("arrayid"))} arrayid={this.props.arrayid} className="icon fa-plus-circle"></a></li>
  </ul>
  </div>
  </div>
)}}))

export default WordDetailsRow