const express = require('express');
const firestore = require('./databaseaccess');
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();

var transactCache = [];
var cached = false;

app.use(express.json({ limit: 1000000}));
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET","POST","DELETE"]
}));


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
    let payersFromList=[];
    let payersFromTenants=[];

    let finalResult;

    firestore.getAll("Tenants","Name").then((result)=>{
        result.forEach(obj=>{
            payersFromTenants.push(obj[1]);
        })

        // this checks if all tenants in the tenant page exists, if they dont they get
        // removed from the list and then sent to the client
        firestore.getAll("Lists").then((arr)=>{
            arr.forEach(obj=>{
                if ("Payer Name" in obj[0]){
                    payersFromList.push(obj[0]["Payer Name"]);
                }
            })

            let final = payersFromTenants.filter(tenant => payersFromList.indexOf(tenant) == -1)
            
            if (final.length > 0){
                final.forEach(tenant =>{
                
                    finalResult = result.filter(arr => arr[1] != tenant);
                    res.send(finalResult);
                    firestore.remove("Tenants",tenant);
                })
            }else{
                res.send(result);
            }
            
        })
    })
})

app.get('/api/loadTransactions',(req,res) =>{
    console.log("Load Transactions");
    console.log("Cache status: " + cached);
    
    if(cached){
        console.log("TRUE - sending cached data");
        res.send(transactCache);  
    }else{
        console.log("NO CACHE");
        cached = true;
        firestore.getAll("Transactions","Number").then((result)=>{
                console.log("FALSE - pulling from db and caching");
                
                transactCache = result;
                res.send(result);
        })
    }
    
    console.log("done");
})

// still developing, res input overload
app.post('/api/importCSV',(req,res)=>{
    cached = false;
    const output = req.body.out;

    output.forEach(element => firestore.add("Transactions",element));
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

        firestore.set("Tenants",input,{
            "Current Tenant": "No",
            "Email Address": "Placeholder",
            "House Number": "Placeholder",
            "Name": input,
            "Phone Number": "1234567890",
            "Title": "Tenant"
        })
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

app.get('/api/getTransactionCounter',(req,res)=>{
    firestore.get("Transaction","--Counter--").then((result)=>{
       // firestore.incrementDoc("Transaction","--Counter--");
        res.send(result);

    })
})

app.post('/api/newTransaction',(req,res)=>{
        cached = false;
        const input = req.body;
        console.log(input);
        firestore.add("Transaction",input);
        firestore.incrementDoc("Transaction","--Counter--", input.Number);
        

        res.send(true);
})

app.post('/api/saveTenantInformation',(req,res)=>{

    const tenant = req.body.tenant;
    const house = req.body.house;
    const email = req.body.email;
    const phone = req.body.phone;
    let current = null;
    let password = null;
    if (req.body.current){
        current = req.body.current;
        firestore.get("Tenants",tenant).then(data=>{
            data[0]["Current Tenant"] = current;
            data[0]["House Number"] = house;
            data[0]["Email Address"] = email;
            data[0]["Phone Number"] = phone;
            firestore.set("Tenants",tenant,data[0]);
        })
    }
    if (req.body.password){
        bcrypt.hash(req.body.password,10,(err,hash)=>{
            password = hash;
            firestore.get("Tenants",tenant).then(data=>{
                data[0]["House Number"] = house;
                data[0]["Email Address"] = email;
                data[0]["Phone Number"] = phone;
                data[0]["Password"] = password;
                firestore.set("Tenants",tenant,data[0]);
            })
        })
    }

    res.send(true);
})

app.get('/api/getAddresses',(req,res)=>{
    let addresses = [];
    firestore.getAll("Lists").then(result=>{
        result.forEach(obj=>{
            if ("Address" in obj[0]){
                addresses.push(obj[0].Address);
            }
        })
        res.send(addresses);
    })
})

app.get('/api/getNames',(req,res)=>{
    let names = [];
    firestore.getAll("Lists").then(result=>{
        result.forEach(obj=>{
            if ("Payer Name" in obj[0]){
                names.push(obj[0]["Payer Name"]);
            }
        })
        res.send(names);
    })
})

app.get('/api/getMethods',(req,res)=>{
    let method = [];
    firestore.getAll("Lists").then(result=>{
        result.forEach(obj=>{
            if ("Payment Method" in obj[0]){
                method.push(obj[0]["Payment Method"]);
            }
        })
        res.send(method);
    })
})

app.get('/api/getDescriptions',(req,res)=>{
    let descs = [];
    firestore.getAll("Lists").then(result=>{
        result.forEach(obj=>{
            if ("Description" in obj[0]){
                descs.push(obj[0]["Description"]);
            }
        })
        res.send(descs);
    })
})

app.get('/api/getHouseNumber',(req,res)=>{
    let house = [];
    firestore.getAll("Lists").then(result=>{
        result.forEach(obj=>{
            if ("House Number" in obj[0]){
                house.push(obj[0]["House Number"]);
            }
        })
        res.send(house);
    })
})

app.get('/api/getTypes',(req,res)=>{
    let types = [];
    firestore.getAll("Lists").then(result=>{
        result.forEach(obj=>{
            if ("Type" in obj[0]){
                types.push(obj[0].Type);
            }
        })
        res.send(types);
    })
})





app.post('/api/addCalcData',(req,res)=>{
    let json = req.body.data;
    let id = json.id.toString();
    console.log(json);

    firestore.set("CalculationData",id,json);
    res.send(true);
})

app.get('/api/getCalcData',(req,res)=>{
    firestore.getAll("CalculationData").then(response=>{
        res.send(response);
    })
})

app.post('/api/deleteCalcData',(req,res)=>{
    let id = req.body.id.toString();

    firestore.remove("CalculationData",id);
})

app.post('/api/calculateData',(req,res)=>{
    const properties = req.body.properties;
    let propertyData = {};

    properties.forEach(obj=>{
        propertyData[obj] = {Revenue: 0, Expense: 0, Principle: 0};
    })

    firestore.getAll("Transactions").then(result=>{
        
        result.forEach(obj=>{
            if (obj[0].Address in propertyData){
                if(obj[0].Type == "Revenue"){
                    propertyData[obj[0].Address].Revenue += obj[0].Payment;
                }else if(obj[0].Type == "Expense"){
                    propertyData[obj[0].Address].Expense += obj[0].Payment;
                }

                if (obj[0].Desc == "Mortgage"){
                    propertyData[obj[0].Address].Principle += obj[0].Payment;
                }else if (obj[0].Desc == "Interest"){
                    propertyData[obj[0].Address].Principle -= obj[0].Payment;
                }
            }
        })
        
        res.send(propertyData);
    })

})

app.post('/api/setTransaction',(req,res)=>{
    cached = false;
    const id = req.body.id;
    const data = req.body.data;

    firestore.set("Transactions",id,data);
    res.send(true);
})

app.post('/api/deleteTransaction',(req,res)=>{
    cached = false;
    const id = req.body.id;

    firestore.remove("Transactions",id);
})

app.listen(5000, () => console.log('Server on port 5000'));