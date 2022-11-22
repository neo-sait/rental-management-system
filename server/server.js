const express = require('express');
const firestore = require('./databaseaccess');
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json({ limit: 1000000}));
app.use(cors());

app.post('/login',(req,res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    console.log(email);
    console.log(pass);

    firestore.getAll("Tenants").then((result) =>{
        for (let i = 0; i < result.length; i++){
            if (result[i][0]["Email Address"] == email.toLowerCase()){

                let passResult = bcrypt.compare(pass,result[i][0]["Password"]).then((match) =>{
                    if (match){
                        const salt = bcrypt.genSalt(10, async(err,salt) =>{
                            const titleHash = await bcrypt.hash(result[i][0]["Title"],salt);
                            const nameHash = await bcrypt.hash(result[i][0]["Name"],salt);
                            res.send({id: titleHash, name: nameHash});
                        });
                    }else{
                        res.send(false);
                    }
                })
            break
            }else{
                res.send(false);
                break;
            }
        }
    })
});

// for now, hard coded to tenant owner
app.post('/api/authenticate',(req,res)=>{
    const id = req.body.id;

    if (id == null){
        res.send(false);
    }else{

    bcrypt.compare("Owner",id).then( (match)=>{
        if (match){
            res.send(true);
        }else{
            res.send(false);
        }
    })
    }
})

app.get('/api/loadTenants',(req,res) =>{
    firestore.getAll("Tenants","Name").then((result)=>{
        res.send(result);
    })
})

app.get('/api/loadTransactions',(req,res) =>{
    firestore.getAll("TransactionTest","Number").then((result)=>{
        res.send(result);
    })
})

// still developing, res input overload
app.post('/api/importCSV',(req,res)=>{
    const output = req.body.out;

    output.forEach(element => firestore.add("TranTest",element));
    res.send(true);
})

app.get('/api/loadDash',(req,res) =>{
    firestore.getAll("Transaction").then((result)=>{
        res.send(result)
    })
})

app.get('/api/getList',(req,res)=>{
    firestore.getAll("Lists").then((result)=>{
        res.send(result);
    })
})

app.post('/api/addToLists',(req,res)=>{
    const listType = req.body.listType;
    const input = req.body.input;
    let fb;

    if (listType == "address"){
        fb = firestore.add("Lists",{Address: input});
    }else if (listType == "payer"){
        fb = firestore.add("Lists",{"Payer Name": input});
    }else if (listType == "house"){
        fb = firestore.add("Lists",{"House Number": input});
    }else if (listType == "desc"){
        fb = firestore.add("Lists",{Description: input});
    }else if (listType == "type") {
        fb = firestore.add("Lists",{Type: input});
    }else if (listType == "title") {
        fb = firestore.add("Lists",{Title: input});
    }else if (listType == "payment"){
        fb = firestore.add("Lists",{"Payment Method": input});
    }

    console.log(listType);

    fb.then( (arr) =>{
        res.send(arr);
    })
})

app.post('/api/removeFromLists',(req,res)=>{
    const id = req.body.target;

    firestore.remove("Lists",id);
    
    res.send(true);
})

app.post('/api/editFromLists',(req,res)=>{
    const id = req.body.id;
    const type = req.body.type;
    const input = req.body.input;

    if (type == "address"){
        firestore.set("Lists",id,{Address: input });
    }else if (type == "payer"){
        firestore.set("Lists",id,{"Payer Name": input});
    }else if (type == "house"){
        firestore.set("Lists",id,{"House Number": input});
    }else if (type == "desc"){
        firestore.set("Lists",id,{Description: input});
    }else if (type == "type") {
        firestore.set("Lists",id,{Type: input});
    }else if (type == "title") {
        firestore.set("Lists",id,{Title: input});
    }else if (type == "payment"){
        firestore.set("Lists",id,{"Payment Method": input});
    }

    res.send(true);
})


app.listen(5000, () => console.log('Server on port 5000'));