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
currentListInfo: "",
redirectReady: false,
setRedirectReady: action(function() {
    this.redirectReady = true;
}),
allowEditListName: true,
wordIds: [
    {id: "1", name1: "Nam", name2: "I'm from the store", status: 0},
    {id: "1", name1: "Nam", name2: "I'm from the store", status: 0},
    ],
setAllowEditListName: action(function() {
        this.allowEditListName = !this.allowEditListName;
    }), 
setUserName: action(function(username) {
    this.userName = username;
}),
setCurrentListInfo: action(function(currentListInfo) {
    this.currentListInfo = currentListInfo;
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
axios.get(url).then(action(json => { this.setWordIds(json); })).then(() => this.doneLoading = true).catch(function(error) {
    console.log(error);
})}),
createList: action(function (listName) {  
    var listNameObject = {listName: listName, userId: this.userId}
    var base = "http://localhost:3101/lists/"
    var url = base
    axios.post(url, listNameObject)
    .then(action(json => { this.create_ten_wordIds(json.data.listId); this.getListsByUserId(this.userId); }))
}),
updateWordByWordId: action(function (wordArrayId) {  
    var wordObject = this.wordIds.data[wordArrayId]
    var base = "http://localhost:3101/words/"
    var url = base + wordObject.wordId;
    axios.post(url, wordObject);
}),
create_ten_wordIds: action(function (listId) {  
    var base = "http://localhost:3101/words/newwords/"
    var url = base + listId
    axios.post(url, {listId: listId})
    .then(action(json => { this.getListsByUserId(this.userId); }))
}),
getListsByUserId: action(function (userId) {   
var base = "http://localhost:3101/users/"
var ending = "/lists"
var url = base + userId + ending;
axios.get(url).then(action( y =>{ this.setListIds(y); this.doneLoading = true }));
}
),
updateListByListId: action(function (listObject) {   
    var base = "http://localhost:3101/lists/"
    var ending = "/words"
    var url = base + listObject.listId + ending;
    axios.post(url, listObject).then(action( y => {this.setRedirectReady(); this.getListsByUserId(this.userId)}));
    }
    ),
    



        })
}}

let myStore = new studySessionStore();
export default myStore;