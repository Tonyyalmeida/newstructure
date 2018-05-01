import { action, extendObservable,  computed } from 'mobx';
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
isMobile: false,
setIsMobile: action(function(status) {
    this.isMobile = status;
}),
listIds: [],
currentListId: [],
isEditing: false,
userIdFromCookie: "",
isRealUser: computed(function () {
    return (this.userIdFromCookie.toString() === this.userId)
}), 
numberOfClosedLists: computed(function() { 
return this.listIds.filter((list) => list.listStatus == "1").length;
}) ,
numberOfOpenLists: computed(function() {
return this.listIds.filter((list) => list.listStatus == "undefined" || list.listStatus == 0 || list.listStatus == '0' ).length;
}) ,
currentListInfo: "",
currentListName: "",
redirectReady: false,
setRedirectReady: action(function() {
    this.redirectReady = true;
}),
setDoneLoading: action(function(status) {
    this.doneLoading = status;
}),
allowEditListName: true,
wordIds: [],
finalStatus: computed(function () {
return this.wordIds.reduce((sum, element) => sum + element.status, 0);
}),
doneCreatingList: false,
setDoneCreatingList: action(function (status) {
    this.doneCreatingList = status;
    }),
renderDone: false,
breach: false,
setBreach: action(function (status) {
this.breach = status;
}),
setRenderDone: action(function (status) {
this.renderDone = status;
}),
setCurrentListName: action(function (listName) {
    this.currentListName = listName;
    }),
studyWordIds: [],
setAllowEditListName: action(function() {
        this.allowEditListName = !this.allowEditListName;
    }), 
setUserName: action(function(username) {
    this.userName = username;
}),
setCurrentListInfo: action(function(currentListInfo) {
    this.currentListInfo = currentListInfo;
}),
setCurrentListId: action(function(currentListId) {
    this.currentListId = currentListId;
    this.doneLoading = true;
}),
setListIds: action(function(listIds) {
    this.listIds = listIds;
}),
setUserId: action(function(userId) {
    this.userId = userId;
}),
setUserIdFromCookie: action(function(userId) {
    this.userIdFromCookie = userId;
}),
updateListitem: action(function(wordArrayId, propName, propValue) {
this.wordIds[wordArrayId][propName] = propValue;
}),
incrementStatus: action(function(wordArrayId) {
if (this.wordIds[wordArrayId]["status"] < 10)
this.wordIds[wordArrayId]["status"]++;
}),
decrementStatus: action(function(wordArrayId) {
if (this.wordIds[wordArrayId]["status"] >= 0)
this.wordIds[wordArrayId]["status"]--;
}),
incrementStudyStatus: action(function(wordArrayId) {
    if (this.studyWordIds[wordArrayId]["status"] < 10)
    this.studyWordIds[wordArrayId]["status"]++;
    }),
decrementStudyStatus: action(function(wordArrayId) {
    if (this.studyWordIds[wordArrayId]["status"] > 0)
    this.studyWordIds[wordArrayId]["status"]--;
    }),
settopicoToken: action(function(topicoToken) {
    this.topicoToken = topicoToken;
}),
setWordIds: action(function(wordIds) {
const newWordIds = Object.assign(wordIds);
newWordIds.sort((a, b) => a.wordId - b.wordId);
    this.wordIds = newWordIds;
}),
setStudyWordIds: action(function(wordIds) {
    const newStudyWordIds = Object.assign(wordIds);
newStudyWordIds.sort(() => Math.random() - 0.5);
this.studyWordIds = newStudyWordIds;
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
getNeededInfo: action (function (listId) {
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/lists/"
    var ending = "/words"
    var url1 = base + listId + ending;
    var base2 = "https://peaceful-tundra-85950.herokuapp.com/api/lists/status/"
    var url2 = base2 + listId;
    axios.all([
        axios.get(url1, {headers: {"Authorization": this.topicoToken}}),
        axios.get(url2, {headers: {"Authorization": this.topicoToken}})
      ]).then(axios.spread((jsonWords, jsonList) => {if (jsonWords.data.success === false || jsonList.data.success === false) {this.setBreach(true)}; this.setWordIds(jsonWords.data); this.setCurrentListId(jsonList.data[0]); this.setCurrentListName(jsonList.data[0][0].listName )      })).then( () => {this.setDoneLoading(true); console.log(this.wordIds)} ).catch(function(error) {
        console.log(error.response);})
}),
getNeededInfoToStudy: action (function (listId) {
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/lists/"
    var ending = "/words"
    var url1 = base + listId + ending;
    var base2 = "https://peaceful-tundra-85950.herokuapp.com/api/lists/status/"
    var url2 = base2 + listId;
    axios.all([
        axios.get(url1, {headers: {"Authorization": this.topicoToken}}),
        axios.get(url2, {headers: {"Authorization": this.topicoToken}})
      ]).then(axios.spread((jsonWords, jsonList) => {if (jsonWords.data.success === false || jsonList.data.success === false) {this.setBreach(true)}; this.setWordIds(jsonWords.data); this.setStudyWordIds((jsonWords.data.filter((json) => (json.status !== 10 && json.vn && json.en)))); this.setCurrentListId(jsonList.data[0]); this.setCurrentListName(jsonList.data[0][0].listName )      })).then( () => this.setDoneLoading(true)).catch(function(error) {
        console.log(error.response);})
}),
getWordsByListId: action(function (listId) {  
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/lists/"
    var ending = "/words"
    var url = base + listId + ending;
    axios.get(url, {headers: {"Authorization": this.topicoToken}}).then(action(json => {if (json.data.success === false) {this.setBreach(true)}; this.setWordIds(json.data); })).then(() => this.doneLoading = true).catch(function(error) {
        console.log(error.response)})
    }),
getListStatusByListId: action(function (listId) {
    this.setDoneLoading(false);  
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/lists/status/"
    var url = base + listId
    axios.get(url, {headers: {"Authorization": this.topicoToken}}).then(action(json => {this.setCurrentListId(json.data[0]); this.setCurrentListName(json.data[0][0].listName);})).catch(function(error) {
        console.log(error);
    })}),
getStudyWordsByListId: action(function (listId) { 
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/lists/"
    var ending = "/words"
    var url = base + listId + ending;
    axios.get(url, {headers: {"Authorization": this.topicoToken}}).then(action(json => {if (json.data.success === false) {this.setBreach(true)}  this.setWordIds(json.data); this.setStudyWordIds((json.data.filter((json) => (json.status !== 10 && json.vn && json.en)))) })).then(() => {this.doneLoading = true;}).catch(function(error) {
        console.log(error);
    })}),
createList: action(function (listName) {
    this.setDoneLoading(false);  
    var listNameObject = {listName: listName, userId: this.userId}
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/lists/"
    var url = base;
    axios.post(url, listNameObject, {headers: {"Authorization": this.topicoToken}})
    .then(action(json => { this.setCurrentListInfo(json.data.listId); this.create_ten_wordIds(json.data.listId) }));
}),
updateWordByWordId: action(function (wordArrayId) {  
    var wordObject = this.studyWordIds[wordArrayId];
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/words/"
    var url = base + wordObject.wordId;
    axios.post(url, wordObject, {headers: {"Authorization": this.topicoToken}});
}),
updateLastWordByWordId: action(function (wordArrayId, listId) {  
    var wordObject = this.studyWordIds[wordArrayId];
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/words/"
    var url = base + wordObject.wordId;
    axios.post(url, wordObject, {headers: {"Authorization": this.topicoToken}}).then(action ((returnedWordObject) => {this.getStudyWordsByListId(this.currentListInfo)})).then(() => this.setRenderDone(true) );
}),
create_ten_wordIds: action(function (listId) {  
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/words/newwords/"
    var url = base + listId
    axios.post(url, {listId: listId}, {headers: {"Authorization": this.topicoToken}})
    .then(action(json => { this.getLatestListsByUserId(this.userId) }))
}),
getListsByUserId: action(function (userId) {
//const authHeaders = {headers: {"Authorization": this.topicoToken}}; 
var base = "https://peaceful-tundra-85950.herokuapp.com/api/users/"
var ending = "/lists";
this.setDoneLoading(false);
var url = base + userId + ending;
axios.get(url,{headers: {"Authorization": this.topicoToken}} ).then(action( y =>{if (y.data.success === false) {this.setBreach(true)} this.setListIds(y.data); this.doneLoading = true })).catch((error) => 
{console.log(error);this.setDoneLoading(true);  })
}),
getLatestListsByUserId: action(function (userId) {
    //const authHeaders = {headers: {"Authorization": this.topicoToken}}; 
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/users/"
    var ending = "/lists"
    var url = base + userId + ending;
    axios.get(url,{headers: {"Authorization": this.topicoToken}} ).then(action( y =>{if (y.data.success === false) {this.setBreach(true)} this.setListIds(y.data); this.doneLoading = true })).then(() => {this.setDoneCreatingList(true)}).catch((error) => 
    {console.log(error) })
    }),
updateListStatusByListId: action(function (listObject) {   
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/lists/status/";
    var url = base + listObject.listId;
    this.doneLoading = false;
    axios.post(url, listObject, {headers: {"Authorization": this.topicoToken}}).then(action( y => {this.getListStatusByListId(listObject.listId)}));   //this.getListsByUserId(this.userId)
    }),
    updateListStatusByListIdAndRefresh: action(function (listObject) {   
        var base = "https://peaceful-tundra-85950.herokuapp.com/api/lists/status/";
        var url = base + listObject.listId;
        this.doneLoading = false;
        axios.post(url, listObject, {headers: {"Authorization": this.topicoToken}}).then(action( y => {this.getListStatusByListId(listObject.listId)})).then(() => this.getListsByUserId(this.userId));   //this.getListsByUserId(this.userId)
        }
    ),
    updateListNameByListId: action(function (listId, listName) {
        let listObject1 = Object.assign({}, this.currentListId[0]);
        listObject1.listName = listName;
        var base = "https://peaceful-tundra-85950.herokuapp.com/api/lists/status/";
        var url = base + listId;
        axios.post(url, listObject1, {headers: {"Authorization": this.topicoToken}}).then(action( y => {this.getListStatusByListId(listObject1.listId)}));   //this.getListsByUserId(this.userId)
        }),
        updateListNameByListIdAndRefresh: action(function (listId, listName) {
            let listObject1 = Object.assign({}, this.currentListId[0]);
            listObject1.listName = listName;
            var base = "https://peaceful-tundra-85950.herokuapp.com/api/lists/status/";
            var url = base + listId;
            axios.post(url, listObject1, {headers: {"Authorization": this.topicoToken}}).then(action( y => {this.getListStatusByListId(listObject1.listId)})).then(() => this.getListsByUserId(this.userId));   //this.getListsByUserId(this.userId)
            }
        ),
updateListByListId: action(function (listObject) {   
    var base = "https://peaceful-tundra-85950.herokuapp.com/api/lists/"
    var ending = "/words"
    var url = base + listObject.listId + ending;
    axios.post(url, listObject, {headers: {"Authorization": this.topicoToken}}).then(action( y => {this.setRedirectReady(); this.getListsByUserId(this.userId)}));
    }
    ),
    



        })
}}

let myStore = new studySessionStore();
export default myStore;