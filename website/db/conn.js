const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/userdata",{
  
}).then(()=> {
    console.log("connected");

}).catch((e)=>{
console.log('no connection');

})