import { action, extendObservable } from 'mobx';

class studySessionStore {
      constructor() {
        extendObservable(this, {
isLoggedIn: false,
token: "",
currentIndex: 0,
userName: "",
setUserName: action(function(username) {
    this.userName = username;
    }),
toggleIsLoggedInState: action(function () {
this.isLoggedIn = !this.isLoggedIn;
})
        })
}}

let myStore = new studySessionStore();
export default myStore;