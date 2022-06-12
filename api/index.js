const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const client = require("mongodb").MongoClient

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const uri = "mongodb+srv://alyelazazy:azazypassword123%5E_@cluster0.1mkgj.mongodb.net/rabbit?authMechanism=DEFAULT";

app.get("/", function(req, res, next) {
    client.connect(uri, (err, dbclient) => {
        if (err) throw err
        const db = dbclient.db("rabbit")
        db.collection('products').find().toArray((err, result) => {
            if (err) throw err

            res.send(result)
        })
    })
});
 
app.get("/:slug", function(req, res, next) {
    client.connect(uri, (err, dbclient) => {
        if (err) throw err
        const db = dbclient.db("rabbit")
        db.collection('products').findOne({"id": req.params.slug}, (err, result) => {
            if (err) throw err

            res.send(result)
        })
    })
});


app.listen(4000);
