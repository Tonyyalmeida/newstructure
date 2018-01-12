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
}),
setTrueLoggedInState: action(function () {
    this.isLoggedIn = true;;
    }),
setFalseLoggedInState: action(function () {
        this.isLoggedIn = false;;
        }),
        })
}}

let myStore = new studySessionStore();
export default myStore;