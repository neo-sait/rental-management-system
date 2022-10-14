//https://firebase.google.com/docs/firestore/query-data/get-data

//const { async } = require('@firebase/util');
//const firebase = require('./firebase');
//const firestore = firebase.firestore();
//import { writeBatch, doc, collection, addDoc, Timestamp  } from "firebase/firestore"; 
import {collection,doc,getDocs,addDoc} from "firebase/firestore";
import {db} from './database'
const database = db();


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


export async function getAll2(coll){
    var results = [];
        const querySnapshot = await getDocs(collection(database, coll));
    querySnapshot.forEach((doc) => {

    results.push(doc.data());
    console.log('data added to array');
   
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
//parseFloat(money.substring(1).replace(',','')) 
export async function asyncAdd(jsonIN,coll){
    try {
        const docRef = await addDoc(collection(database, coll), {
        Address: jsonIN.Address,//2
        Date: jsonIN.Date, //4
        DatePaid: jsonIN.DatePaid, //5
        Desc: jsonIN.Desc, //13
        HouseNum: parseInt(jsonIN.HouseNum),//2
        Month: parseInt(jsonIN.Month), //7
        Notes: jsonIN.Notes, //15
        Number: parseInt(jsonIN.Number),//1
        PayerName: jsonIN.PayerName, //9
        PayerTitle:  jsonIN.PayerTitle, //10
        Type: jsonIN.Type, //14
        PaymentMethod: jsonIN.PaymentMethod,//12
        Payment: parseFloat(jsonIN.Payment.substring(1).replace(',','')), //11
        Year: parseInt(jsonIN.Year), //6
        YearNum: parseInt(jsonIN.YearNum), //8
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};


//export {getAll,get,add,set,asyncAdd};