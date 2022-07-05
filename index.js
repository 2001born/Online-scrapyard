  var express = require("express")
  var bodyParser = require("body-parser")
  var mongoose = require("mongoose")

  const app = express()

  app.use(bodyParser.json())
  app.use(express.static('website'))
  app.use(bodyParser.urlencoded({
    extended:true
  }))
  mongoose.connect('mongodb://Localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  var db = mongoose.connection;
  app.post("/register",(req,res)=>{
    var fullname = req.body.fullname;
    var email = req.body.email;
    var mobno = req.body.mobno;
    var password = req.body.password;
    var gender = req.body.gender;
    var data ={
        "fullname": fullname,
        "email": email,
        "mobno": mobno,
        "password": password,
        "gender": gender
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("registered successfully");
        return res.redirect('index.html')
        
    
    });

  })


  app.get("/",(req,res)=>{
    res.set({
        "ALLow-access-ALLow-Origin": '*'
    })
    return res.redirect('home.html');
  }).listen(3000);
