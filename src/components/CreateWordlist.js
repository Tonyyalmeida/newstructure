import React from 'react';
import { observer, inject } from 'mobx-react';
import { LoadingHoc }  from "../services/LoadingHoc";


const CreateWordlist =  inject('appStore')(observer(class CreateWordlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { adding: false}
    this.handleSave = this.handleSave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ adding: !this.state.adding, hocState: true })
  }
  handleSave(e) {
  e.preventDefault(); 
  const newListName = e.target[0].value.toString();
  if (newListName.length === 0)
  {alert("Fields cannot be empty") }
  else {
  this.props.appStore.createList(newListName);
  this.setState({ adding: false });
  this.props.appStore.getListsByUserId(this.props.appStore.userId);    
  }}
  renderNormal() { return (<div><button onClick={this.handleClick}>Create a new deck</button></div>) }
  renderEdit() {
    return (
      <form onReset={()=> this.handleClick()} onSubmit={(e) => this.handleSave(e)}>
      <div className="row uniform">
<div className="5u 12u$(xsmall)">
   <input type="text" name="demo-name" id="demo-name" placeholder="New Deck Name" />
</div>
<div className="12u 12u$(xsmall)">
<button type="submit" className="button submit">Save</button>
<button type="reset" className="button">Cancel</button>
</div>
</div>
</form>
)
  }
  render() {
    if (this.state.adding)
      return this.renderEdit();
    else { return this.renderNormal() }
  }
}
))


const CreateWordlistHOC= LoadingHoc("listIds")(CreateWordlist);

export default CreateWordlistHOC