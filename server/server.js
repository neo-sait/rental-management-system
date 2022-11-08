const express = require('express');
const firestore = require('./databaseaccess');
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(cors());

app.post('/login',(req,res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    console.log("called");

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

    output.forEach((element) => {
        console.log(element);
    })
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


app.listen(5000, () => console.log('Server on port 5000'));