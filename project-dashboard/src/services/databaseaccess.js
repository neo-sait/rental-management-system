//https://firebase.google.com/docs/firestore/query-data/get-data

const { async } = require('@firebase/util');
const firebase = require('./firebase');
const firestore = firebase.firestore();

// grabs all documents from a collection, returns in json format
// param String Collection Name
// return Object
export async function getAll(collection){
    let results = {};
    let list = firestore.collection(collection);
    let snapshot = await list.get();

    snapshot.forEach(doc => {
        results[doc.id] = doc.data();
      });

    return results;
}

// returns a single data object specified by collection and doc
// param String Collection Name
// param String Document Name
// return Object 
export async function get(collection, doc){
    let list = firestore.collection(collection).doc(doc);
    let document = await list.get();
    if (!document.exists){
        console.log("Document does not exist in the " + collection + " collection.");
    }else{
        return document.data();
    }
}

// adds new data to any specified collection and doc, based on the json
// param String Collection Name
// param String Document Name
// param Object Document Data
export async function add(collection,doc,json){
    let list = firestore.collection(collection).doc(doc);
    let document = await list.get();
    list.set(json);
}

// virtually the same as the add method, however checks if data exists in the first place
export async function set(collection,doc,json){
    let list = firestore.collection(collection).doc(doc);
    let document = await list.get();
    if (!document.exists){
        console.log("Document does not exist in the " + collection + " collection.");
    }else{
        list.set(json);
    }
}


module.exports = {getAll,get,add,set};