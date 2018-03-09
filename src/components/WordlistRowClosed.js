import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';


const WordlistRowClosed = inject('appStore')(observer(class WordlistRowClosed extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
    return (<div className="row uniform"key={this.props.id}>
    <div className="5u 12u$(xsmall)">
    <Link to={`/edit/lists/` + this.props.x.listId + "/" + this.props.x.listName}> 
             {this.props.x["listName"]}</Link>
    </div>
    <div className="5u 12u$(xsmall)">
    <ul className="icons">
             <li><Link to={`/edit/lists/` + this.props.x.listId + "/" + this.props.x.listName} className="icon alt fa-list"><span className="label">Clear</span></Link></li>
           </ul>
    </div>
             </div>)}
          }))

export default WordlistRowClosed