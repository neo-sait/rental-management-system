//https://firebase.google.com/docs/firestore/query-data/get-data

const { async } = require('@firebase/util');
const firebase = require('./database');
const firestore = firebase.firestore();

// grabs all documents from a collection, returns in json format
// param String Collection Name
// return Object
async function getAll(col,orderByAttribute){
    let list = firestore.collection(col);
    let snapshot = orderByAttribute == null ?
    // if orderBy is null
    await list.get()
    //if orderBy is not null
    :await list.orderBy(orderByAttribute).get();

    let results = snapshot.docs.map((doc)=> [doc.data(), doc.id]);

    return results;
}

/*
export async function getAll2(coll) {
    var results = []
    const querySnapshot = await getDocs(collection(database, coll))
    querySnapshot.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id })
      console.log("data added to array")
    })
    return results
  }
*/

// returns a single data object specified by collection and doc
// param String Collection Name
// param String Document Name
// return Object 
async function get(collection, doc){
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
async function add(col,json){
    firestore.collection(col).add(json);
}

// virtually the same as the add method, however checks if data exists in the first place
async function set(collection,doc,json){
    let list = firestore.collection(collection).doc(doc);
    let document = await list.get();
    if (!document.exists){
        console.log("Document does not exist in the " + collection + " collection.");
    }else{
        list.set(json);
    }
}

// Deletes document from database
// param String Collection Name
// param Object Document Name
async function remove(col,doc){
    firestore.collection(col).doc(doc).delete();
}

module.exports = {getAll,get,add,set};