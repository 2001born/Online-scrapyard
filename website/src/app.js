const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/gfg');
//var db=mongoose.connection;

const hbs = require("hbs");
/*
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
})*/






const port = process.env.PORT || 3000;
require("../db/conn");
const Registration = require("../models/users");



const static_path = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../template/partial");
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", templatepath);

app.use(express.static(static_path));

hbs.registerPartials(partialpath);



app.get("/", (req, res) => {
    res.render("index");
})

app.get("/login", (req, res) => {
    res.render("login");
})
app.get("/registration", (req, res) => {
    res.render("registration");
})





app.post("/registration", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {
            const userreg = new Registration({
                fullname: req.body.fullname,
                email: req.body.email,
                phno: req.body.phno,
                password: req.body.password,
                // cpassword:req.body.cpassword,
                gender: req.body.gender
            })
            const userregister = await userreg.save();
            // res.status(201).render("home");
            return res.redirect("home.html")
        } else {
            console.log("password not matching")
        }

    } catch (error) {
        // res.status(400).send(error);
        //  res.render("registration",{title :'done',email :'exists'})
    }
    try {
        const emailExits = await Registration.findOne({ email: req.body.email });
        if (emailExits) return res.status(400).send('Email already exits');
    }
    catch (err) {
        console.log(err);
    }
})



//login
var user = require("../models/users")
app.post('/login', async (req, res) => {
    const umail = req.body.email;
    const upass = req.body.password;
    try {
        const log = await Registration.findOne(Registration.email , (err, result) => {
            if (umail === user.email) {
                console.log("success")

            } else {
                console.log("fail")
            }
        })
        if (log) console.log(log)// return res.redirect("home.html")
    }
    catch (err) {
        console.log(err);
    }
})



app.listen(port, () => {

}) 