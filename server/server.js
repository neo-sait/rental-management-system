const express = require('express');
const firestore = require('./databaseaccess');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post('/login',(req,res) => {
    let tenants;
    const email = req.body.email;

    firestore.getAll("Tenants").then((result) =>{
        tenants = result;

       for (const tenant in tenants){
            if (tenants[tenant].Email == email){
                res.send({id: tenant});
                console.log("Found tenant with same email, send 200");
            }else{
                res.send("popup");
                console.log("Bad login info, send 404")
            }
       }
    })
});

app.post('/api/tenantData',(req,res) =>{
    const tenant = req.body.id
    let data;

    firestore.get("Tenants",tenant).then((result) =>{
       res.send({email: result.Email, name: result.Name});
    })
});

app.listen(5000, () => console.log('Server on port 5000'));