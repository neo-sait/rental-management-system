const bcrypt = require("bcrypt");

const salt = bcrypt.genSalt(10, async(err,salt) =>{
    let hash = await bcrypt.hash("password",salt);
    console.log(hash);
});