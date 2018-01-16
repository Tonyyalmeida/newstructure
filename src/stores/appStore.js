import { action, extendObservable } from 'mobx';
import axios from 'axios';

class studySessionStore {
      constructor() {
        extendObservable(this, {
isLoggedIn: false,
topicoToken: "",
currentIndex: 0,
userName: "",
userId: "",
doneLoading: false,
listIds: [],
wordIds: [
    {id: "1", name1: "Nam", name2: "I'm from the store", status: 0},
    {id: "2", name1: "Paasdsaying", name2: "Zweites Wort", status: 0},
    {id: "3", name1: "Paasdqsaying", name2: "The Bilqelsads", status: 0},
    {id: "4", name1: "Paasdqwsaying", name2: "TDirrtesqwewqlsads", status: 0},
    {id: "6", name1: "PaHahasausang", name2: "The Billsads", status: 0},
    {id: "7", name1: "Paasdwesaying", name2: "The Billsweqads", status: 0},
    {id: "8", name1: "Psdsdsdsg", name2: "Lasuhussdfs",status: 0},
    {id: "9", name1: "JWEJDsn", name2: "The Billsqads",status: 0},     
    {id: "10", name1: "Paasdqsaying", name2: "The Bilewlsads", status: 0},   
    {id: "11", name1: "Paasdsasying", name2: "Looasjdw", status: 0}
    ],
setUserName: action(function(username) {
    this.userName = username;
}),
setListIds: action(function(listIds) {
    this.listIds = listIds;
}),
setUserId: action(function(userId) {
    this.userId = userId;
}),
updateListitem: action(function(wordArrayId, propName, propValue) {
this.wordIds.data[wordArrayId][propName] = propValue;
}),
incrementStatus: action(function(wordArrayId) {
if (this.wordIds.data[wordArrayId]["status"] < 10)
this.wordIds.data[wordArrayId]["status"]++;
}),
decrementStatus: action(function(wordArrayId) {
if (this.wordIds.data[wordArrayId]["status"] >= 0)
this.wordIds.data[wordArrayId]["status"]--;
}),
settopicoToken: action(function(topicoToken) {
    this.topicoToken = topicoToken;
}),
setWordIds: action(function(wordIds) {
    this.wordIds = wordIds;
}),
toggleIsLoggedInState: action(function () {
this.isLoggedIn = !this.isLoggedIn;
}),
setTrueLoggedInState: action(function () {
    this.isLoggedIn = true;
    }),
setFalseLoggedInState: action(function () {
        this.isLoggedIn = false;
    }),
consoleMe: action(function (e) {
console.log();
}),
getWordsByListId: action(function (listId) {  
var base = "http://localhost:3101/lists/"
var ending = "/words"
var url = base + listId + ending;
axios.get(url).then(action(json => { this.setWordIds(json) })).then(() => this.doneLoading = true).catch(function(error) {
    console.log(error);
})}),
getListsByUserId: action(function (userId) {   
var base = "http://localhost:3101/users/"
var ending = "/lists"
var url = base + userId + ending;
axios.get(url).then(action( y =>{ this.setListIds(y) }));
// (action ((y) => this.setListIds(y))).catch(function(error) 
// {
//     console.log(error);})


}
)
    



        })
}}

let myStore = new studySessionStore();
export default myStore;