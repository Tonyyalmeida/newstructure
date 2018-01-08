import { observable, action, computed } from 'mobx';

class studySessionStore {
@observable isLoggedIn = true;
@observable token = ""
@observable currentIndex = 0;
@observable userName = "";
@action.bound setUserName(username) {
    this.userName = username;
    }
@action.bound toggleIsLoggedInState () {
this.islLoggedIn = !this.isLoggedIn;
}
@action.bound incrementIndex () {
if (this.listing.length - this.currentIndex !== 1)
{const newIndex = this.currentIndex + 1;
this.currentIndex = newIndex; 
}
else {
this.showSuccessScreen();
}
}
@computed get totalItems() {
return this.listing.length;
}
@action.bound showSuccessScreen () {
//called when incrementIndex length - currentIndex == 1
console.log("show success screen")    
}
@computed get remainingItems() {
return this.listing.filter((item)=> item.status !== 1).length;
}
@computed get doneItems() {
return this.listing.filter((item)=> item.status !== 0).length;
}
@action.bound handleDone(status) {
// if wrong, add it to the end, if right, just change it's status
this.listing[this.currentIndex].status = 1;
this.incrementIndex();
this.toggleAnimationState();
}
@action.bound handleAgain() {
this.listing.push(this.listing[this.currentIndex])
// if wrong, add it to the end, if right, just change it's status
this.incrementIndex();
this.toggleAnimationState();
}
}

export default studySessionStore;