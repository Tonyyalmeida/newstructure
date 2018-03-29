import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';


const WordlistRow = inject('appStore')(observer(class WordlistRow extends React.Component {
    render() {
     return (
     <Link to={"/home/userId/" + this.props.appStore.userId +  "/lists/" + this.props.x.listId + "/edit"}>
              {this.props.x.listName}</Link>
              )
          }}))

export default WordlistRow