var express = require("express");
var router = express.Router();
const client = require("mongodb").MongoClient
const uri = "mongodb+srv://alyelazazy:azazypassword123%5E_@cluster0.1mkgj.mongodb.net/rabbit?authMechanism=DEFAULT";

router.get("/", function(req, res, next) {
    client.connect(uri, (err, dbclient) => {
        if (err) throw err
        const db = dbclient.db("rabbit")
        db.collection('products').find().toArray((err, result) => {
            if (err) throw err

            res.send(result)
        })
    })
});

router.get("/:slug", function(req, res, next) {
    client.connect(uri, (err, dbclient) => {
        if (err) throw err
        const db = dbclient.db("rabbit")
        db.collection('products').findOne({"id": req.params.slug}, (err, result) => {
            if (err) throw err

            res.send(result)
        })
    })
});



module.exports = router;