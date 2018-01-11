import { action, extendObservable } from 'mobx';

class studySessionStore {
      constructor() {
        extendObservable(this, {
isLoggedIn: false,
topicoToken: "",
currentIndex: 0,
userName: "",
setUserName: action(function(username) {
    this.userName = username;
}),
settopicoToken: action(function(topicoToken) {
    this.topicoToken = topicoToken;
}),
toggleIsLoggedInState: action(function () {
this.isLoggedIn = !this.isLoggedIn;
})
        })
}}

let myStore = new studySessionStore();
export default myStore;