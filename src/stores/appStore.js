import { action, extendObservable,  observable, computed } from 'mobx';
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
currentListId: [],
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
allowEditListName: true,
wordIds: [],
finalStatus: [],
doneCreatingList: false,
setDoneCreatingList: action(function (status) {
    this.doneCreatingList = status;
    }),
renderDone: false,
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
}),
setListIds: action(function(listIds) {
    this.listIds = listIds;
}),
setUserId: action(function(userId) {
    this.userId = userId;
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
    this.wordIds = wordIds;
}),
setStudyWordIds: action(function(wordIds) {
    this.studyWordIds = wordIds;
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
    var base = "http://localhost:3101/lists/"
    var ending = "/words"
    var url = base + listId + ending;
    this.doneLoading = false;
    axios.get(url).then(action(json => { this.setWordIds(json.data); })).then(() => this.getListStatusByListId (listId) ).then(() => this.doneLoading = true).catch(function(error) {
        console.log(error.response);
    })}), 
getWordsByListId: action(function (listId) {  
var base = "http://localhost:3101/lists/"
var ending = "/words"
var url = base + listId + ending;
axios.get(url).then(action(json => { this.setWordIds(json.data); })).then(() => this.doneLoading = true).catch(function(error) {
    console.log(error.response);
})}),
getListStatusByListId: action(function (listId) {  
    var base = "http://localhost:3101/lists/status/"
    var url = base + listId
    axios.get(url).then(action(json => {this.setCurrentListId(json.data[0]); this.setCurrentListName(json.data[0][0].listName)})).then(() => this.doneLoading = true).catch(function(error) {
        console.log(error.response);
    })}),
getFinalStatusByListId: action(function (listId) {  
    console.log(listId);
    var base = "http://localhost:3101/lists/"
    var ending = "/words"
    var url = base + listId + ending;
    axios.get(url).then(action(json => {this.setRenderDone(false); this.setWordIds(json.data); })).then(() => this.finalStatus = [this.wordIds.reduce((sum, element) => sum + element.status, 0)]).then(() => {this.finalStatus == 100 ? this.updateListStatusByListId({listId: listId, listStatus: 1}) : null }  ).then(() => this.doneLoading = true).then(() => this.setRenderDone(true)).catch(function(error) {
        console.log(error.response);
    })}),
getStudyWordsByListId: action(function (listId) { 
    var base = "http://localhost:3101/lists/"
    console.log(listId);
    var ending = "/words"
    var url = base + listId + ending;
    axios.get(url).then(action(json => { this.setStudyWordIds((json.data.filter((json) => (json.status !== 10 && json.vn && json.en)))) })).then(() => {this.doneLoading = true;}).catch(function(error) {
        console.log(error);
    })}),
createList: action(function (listName) {  
    var listNameObject = {listName: listName, userId: this.userId}
    var base = "http://localhost:3101/lists/"
    var url = base
    axios.post(url, listNameObject)
    .then(action(json => { this.setCurrentListInfo(json.data.listId); this.create_ten_wordIds(json.data.listId) })).then(()=> this.setDoneCreatingList(true));
}),
updateWordByWordId: action(function (wordArrayId) {  
    var wordObject = this.studyWordIds[wordArrayId];
    var base = "http://localhost:3101/words/"
    var url = base + wordObject.wordId;
    axios.post(url, wordObject);
}),
updateLastWordByWordId: action(function (wordArrayId) {  
    var wordObject = this.studyWordIds[wordArrayId];
    var base = "http://localhost:3101/words/"
    var url = base + wordObject.wordId;
    axios.post(url, wordObject).then(action ((returnedWordObject) => {console.log("hi") ;this.getFinalStatusByListId(returnedWordObject.data.doc.listId)} ))
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
axios.get(url).then(action( y =>{ this.setListIds(y.data); this.doneLoading = true }));
}
),
updateListStatusByListId: action(function (listObject) {   
    var base = "http://localhost:3101/lists/status/";
    var url = base + listObject.listId;
    this.doneLoading = false;
    axios.post(url, listObject).then(action( y => {this.getListStatusByListId(listObject.listId)}));   //this.getListsByUserId(this.userId)
    }),
    updateListStatusByListIdAndRefresh: action(function (listObject) {   
        var base = "http://localhost:3101/lists/status/";
        var url = base + listObject.listId;
        this.doneLoading = false;
        axios.post(url, listObject).then(action( y => {this.getListStatusByListId(listObject.listId)})).then(() => this.getListsByUserId(this.userId));   //this.getListsByUserId(this.userId)
        }
    ),
    updateListNameByListId: action(function (listId, listName) {
        let listObject1 = Object.assign({}, this.currentListId[0]);
        listObject1.listName = listName;
        console.log(listObject1.listName);
        var base = "http://localhost:3101/lists/status/";
        var url = base + listId;
        axios.post(url, listObject1).then(action( y => {this.getListStatusByListId(listObject1.listId)}));   //this.getListsByUserId(this.userId)
        }),
        updateListNameByListIdAndRefresh: action(function (listId, listName) {
            let listObject1 = Object.assign({}, this.currentListId[0]);
            listObject1.listName = listName;
            console.log(listObject1.listName);
            var base = "http://localhost:3101/lists/status/";
            var url = base + listId;
            axios.post(url, listObject1).then(action( y => {this.getListStatusByListId(listObject1.listId)})).then(() => this.getListsByUserId(this.userId));   //this.getListsByUserId(this.userId)
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


// class studySessionStore {
//     constructor() {
//       extendObservable(this, {
// isLoggedIn: false,
// topicoToken: "",
// currentIndex: 0,
// userName: "",
// userId: "",
// doneLoading: false,
// listIds: [],
// currentListId: [],
// numberOfClosedLists: "",
// numberOfOpenLists: "",
// currentListInfo: "",
// currentListName: "",
// redirectReady: false,
// setRedirectReady: action(function() {
//   this.redirectReady = true;
// }),
// allowEditListName: true,
// wordIds: [],
// finalStatus: [],
// doneCreatingList: false,
// setDoneCreatingList: action(function (status) {
//   this.doneCreatingList = status;
//   }),
// renderDone: false,
// setRenderDone: action(function (status) {
// this.renderDone = status;
// }),
// setCurrentListName: action(function (listName) {
//   this.currentListName = listName;
//   }),
// studyWordIds: [],
// setAllowEditListName: action(function() {
//       this.allowEditListName = !this.allowEditListName;
//   }), 
// setUserName: action(function(username) {
//   this.userName = username;
// }),
// setCurrentListInfo: action(function(currentListInfo) {
//   this.currentListInfo = currentListInfo;
// }),
// setCurrentListId: action(function(currentListId) {
//   this.currentListId = currentListId;
// }),
// setListIds: action(function(listIds) {
//   this.listIds = listIds;
// }),
// setUserId: action(function(userId) {
//   this.userId = userId;
// }),
// updateListitem: action(function(wordArrayId, propName, propValue) {
// this.wordIds[wordArrayId][propName] = propValue;
// }),
// incrementStatus: action(function(wordArrayId) {
// if (this.wordIds[wordArrayId]["status"] < 10)
// this.wordIds[wordArrayId]["status"]++;
// }),
// decrementStatus: action(function(wordArrayId) {
// if (this.wordIds[wordArrayId]["status"] >= 0)
// this.wordIds[wordArrayId]["status"]--;
// }),
// incrementStudyStatus: action(function(wordArrayId) {
//   if (this.studyWordIds[wordArrayId]["status"] < 10)
//   this.studyWordIds[wordArrayId]["status"]++;
//   }),
// decrementStudyStatus: action(function(wordArrayId) {
//   if (this.studyWordIds[wordArrayId]["status"] > 0)
//   this.studyWordIds[wordArrayId]["status"]--;
//   }),
// settopicoToken: action(function(topicoToken) {
//   this.topicoToken = topicoToken;
// }),
// setWordIds: action(function(wordIds) {
//   this.wordIds = wordIds;
// }),
// setStudyWordIds: action(function(wordIds) {
//   this.studyWordIds = wordIds;
// }),
// toggleIsLoggedInState: action(function () {
// this.isLoggedIn = !this.isLoggedIn;
// }),
// setTrueLoggedInState: action(function () {
//   this.isLoggedIn = true;
//   }),
// setFalseLoggedInState: action(function () {
//       this.isLoggedIn = false;
//   }),
// consoleMe: action(function (e) {
// console.log();
// }),
// getNeededInfo: action (function (listId) {
//   var base = "http://localhost:3101/lists/"
//   var ending = "/words"
//   var url = base + listId + ending;
//   this.doneLoading = false;
//   axios.get(url).then(action(json => { this.setWordIds(json.data); })).then(() => this.getListStatusByListId (listId) ).then(() => this.doneLoading = true).catch(function(error) {
//       console.log(error.response);
//   })}), 
// getWordsByListId: action(function (listId) {  
// var base = "http://localhost:3101/lists/"
// var ending = "/words"
// var url = base + listId + ending;
// axios.get(url).then(action(json => { this.setWordIds(json.data); })).then(() => this.doneLoading = true).catch(function(error) {
//   console.log(error.response);
// })}),
// getListStatusByListId: action(function (listId) {  
//   var base = "http://localhost:3101/lists/status/"
//   var url = base + listId
//   axios.get(url).then(action(json => {this.setCurrentListId(json.data[0]); this.setCurrentListName(json.data[0][0].listName)})).then(() => this.doneLoading = true).catch(function(error) {
//       console.log(error.response);
//   })}),
// getFinalStatusByListId: action(function (listId) {  
//   console.log(listId);
//   var base = "http://localhost:3101/lists/"
//   var ending = "/words"
//   var url = base + listId + ending;
//   axios.get(url).then(action(json => {this.setRenderDone(false); this.setWordIds(json.data); })).then(() => this.finalStatus = [this.wordIds.reduce((sum, element) => sum + element.status, 0)]).then(() => {this.finalStatus == 100 ? this.updateListStatusByListId({listId: listId, listStatus: 1}) : null }  ).then(() => this.doneLoading = true).then(() => this.setRenderDone(true)).catch(function(error) {
//       console.log(error.response);
//   })}),
// getStudyWordsByListId: action(function (listId) { 
//   var base = "http://localhost:3101/lists/"
//   console.log(listId);
//   var ending = "/words"
//   var url = base + listId + ending;
//   axios.get(url).then(action(json => { this.setStudyWordIds((json.data.filter((json) => (json.status !== 10 && json.vn && json.en)))) })).then(() => {this.doneLoading = true;}).catch(function(error) {
//       console.log(error);
//   })}),
// createList: action(function (listName) {  
//   var listNameObject = {listName: listName, userId: this.userId}
//   var base = "http://localhost:3101/lists/"
//   var url = base
//   axios.post(url, listNameObject)
//   .then(action(json => { this.setCurrentListInfo(json.data.listId); this.create_ten_wordIds(json.data.listId) })).then(()=> this.setDoneCreatingList(true));
// }),
// updateWordByWordId: action(function (wordArrayId) {  
//   var wordObject = this.studyWordIds[wordArrayId];
//   var base = "http://localhost:3101/words/"
//   var url = base + wordObject.wordId;
//   axios.post(url, wordObject);
// }),
// updateLastWordByWordId: action(function (wordArrayId) {  
//   var wordObject = this.studyWordIds[wordArrayId];
//   var base = "http://localhost:3101/words/"
//   var url = base + wordObject.wordId;
//   axios.post(url, wordObject).then(action ((returnedWordObject) => {console.log("hi") ;this.getFinalStatusByListId(returnedWordObject.data.doc.listId)} ))
// }),
// create_ten_wordIds: action(function (listId) {  
//   var base = "http://localhost:3101/words/newwords/"
//   var url = base + listId
//   axios.post(url, {listId: listId})
//   .then(action(json => { this.getListsByUserId(this.userId); }))
// }),
// getListsByUserId: action(function (userId) {   
// var base = "http://localhost:3101/users/"
// var ending = "/lists"
// var url = base + userId + ending;
// axios.get(url).then(action( y =>{ this.setListIds(y.data); this.doneLoading = true }));
// }
// ),
// updateListStatusByListId: action(function (listObject) {   
//   var base = "http://localhost:3101/lists/status/";
//   var url = base + listObject.listId;
//   this.doneLoading = false;
//   axios.post(url, listObject).then(action( y => {this.getListStatusByListId(listObject.listId)}));   //this.getListsByUserId(this.userId)
//   }),
//   updateListStatusByListIdAndRefresh: action(function (listObject) {   
//       var base = "http://localhost:3101/lists/status/";
//       var url = base + listObject.listId;
//       this.doneLoading = false;
//       axios.post(url, listObject).then(action( y => {this.getListStatusByListId(listObject.listId)})).then(() => this.getListsByUserId(this.userId));   //this.getListsByUserId(this.userId)
//       }
//   ),
//   updateListNameByListId: action(function (listId, listName) {
//       let listObject1 = Object.assign({}, this.currentListId[0]);
//       listObject1.listName = listName;
//       console.log(listObject1.listName);
//       var base = "http://localhost:3101/lists/status/";
//       var url = base + listId;
//       axios.post(url, listObject1).then(action( y => {this.getListStatusByListId(listObject1.listId)}));   //this.getListsByUserId(this.userId)
//       }),
//       updateListNameByListIdAndRefresh: action(function (listId, listName) {
//           let listObject1 = Object.assign({}, this.currentListId[0]);
//           listObject1.listName = listName;
//           console.log(listObject1.listName);
//           var base = "http://localhost:3101/lists/status/";
//           var url = base + listId;
//           axios.post(url, listObject1).then(action( y => {this.getListStatusByListId(listObject1.listId)})).then(() => this.getListsByUserId(this.userId));   //this.getListsByUserId(this.userId)
//           }
//       ),
// updateListByListId: action(function (listObject) {   
//   var base = "http://localhost:3101/lists/"
//   var ending = "/words"
//   var url = base + listObject.listId + ending;
//   axios.post(url, listObject).then(action( y => {this.setRedirectReady(); this.getListsByUserId(this.userId)}));
//   }
//   ),
  



//       })
// }}

let myStore = new studySessionStore();
export default myStore;