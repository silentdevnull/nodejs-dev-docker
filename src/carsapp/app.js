const express = require('express');
const Console = require("console");

const {MongoClient, Db} = require("mongodb");
// TODO: Need to convert to configuration file.
// TODO: for stage it needs ot be
// mongodbstage
//const uri = "mongodb://localhost:27017";
const uri = "mongodb://mongodbstage:27017";
let app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})

const truck1 = {
    Year:"2018",
    Make:"Ram",
    Model:"1500 Tradesman",
    Engine:"3.6",
    Drive_Line: "RWD"
}

const truck2 = {
    Year:"2022",
    Make:"Ford",
    Model:"1500 XL",
    Engine:"3.0",
    Drive_Line: "RWD"
}

app.get("/",function (req,res)
{
    res.send("Hello World");
});


app.get('/trucks',function (req,res)
{
   MongoClient.connect(uri,function (err,client)
   {
      if(err) throw err;
       let db = client.db("Vehicles");
       db.collection("trucks").find().toArray(function (err,result)
       {
          console.log(result);
          res.send(result);
       });
   });
});

app.get('/setup',function (req,res)
{
    MongoClient.connect(uri,function (err,client)
    {
       if(err) throw err;



       let db = client.db("Vehicles");
       // Test to see if the collection is existing
       db.listCollections({name:"trucks"})
           .next(function (err,collectionInfo)
       {
           db.createCollection("trucks",function (err,result)
           {
              if(err) throw err;
              console.log(result);
           });
           db.collection("trucks").insertOne(truck1,function (error, result)
           {
               if(err) throw err;
           });
           db.collection("trucks").insertOne(truck2,function (error, result)
           {
               if(err) throw err;
           });
       });
       //client.close();
    });
});

const server = app.listen(5000, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});