import React from 'react';
import { observer, inject } from 'mobx-react';


const CreateWordlist =  inject('appStore')(observer(class CreateWordlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { adding: false}
    this.handleSave = this.handleSave.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ adding: !this.state.adding})
  }
  handleSave(e) {
  e.preventDefault(); 
  const newListName = e.target[0].value.toString();
  if (newListName.length === 0)
  {alert("Fields cannot be empty") }
  else {
  this.props.appStore.createList(newListName);
  this.setState({ adding: false });  
  }}
  renderNormal() { return (
  <a onClick={this.handleClick} className="button is-medium is-rounded is-success">
  <span className="icon is-medium">
    <i className="fas fa-plus"></i>
  </span>
</a>
) 

}
  renderEdit() {
    return (<div  className="box">
      <form onReset={()=> this.handleClick()} onSubmit={(e) => this.handleSave(e)}>
      <div className="row uniform">
      <input className="input" type="text" placeholder="New ListName"/>
<button type="submit" className="button is-primary">Save</button>
<button type="reset" className="button">Cancel</button>
</div>
</form></div>
)
  }
  render() {
    if (this.state.adding)
      return this.renderEdit();
    else { return this.renderNormal() }
  }
}
))

// const QuickSpy =  inject('appStore')(observer(class QuickSpy extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentWillUnmount () {
//   console.log("here");
//   this.props.appStore.setDoneCreatingList(false); 
//   }
// render() {
//   return <div className="helme"></div>
// }
// }))  //{this.props.appStore.doneCreatingLists ? null : <QuickSpy/> } 
export default CreateWordlist