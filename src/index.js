const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require('./route/route')
const redis = require("redis")
 const {promisify} = require("util")

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/',route)



const redisClient = redis.createClient(
    15993,
    "redis-15993.c277.us-east-1-3.ec2.cloud.redislabs.com",
    { no_ready_check: true }
  );
  redisClient.auth("qk3gYOwjfnlWy8oxmgM7ZVTn462PsEky", function (err) {
    if (err) throw err;
  });
  
  redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
  });
  const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
  const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);
  console.log(typeof GET_ASYNC)
  


const string = "mongodb+srv://Adhish-1998-DataBase:vQrIj9jTyDzRssqt@cluster0.af5tq.mongodb.net/group47DataBase"

mongoose.connect(string, {useNewUrlParser: true})
.then(()=>console.log("mongoDB is connected"))
.catch((err)=>console.log(err));



const port = process.env.PORT || 3000
app.listen(port,function(){
    console.log("app is running on the port"+port)
})

exports.GET_ASYNC = GET_ASYNC;
exports.SET_ASYNC = SET_ASYNC;
