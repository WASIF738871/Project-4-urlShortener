const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require('./route/route')


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',route)

const string = "mongodb+srv://Adhish-1998-DataBase:vQrIj9jTyDzRssqt@cluster0.af5tq.mongodb.net/group47DataBase"

mongoose.connect(string, {useNewUrlParser: true})
.then(()=>console.log("mongoDB is connected"))
.catch((err)=>console.log(err));

const port = process.env.PORT || 3000
app.listen(port,function(){
    console.log("app is running on the port"+port)
})