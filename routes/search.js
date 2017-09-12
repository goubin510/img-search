var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/img';

router.get('/', function(req, res, next) {

  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('data');
    
    var offset = parseInt(req.param("offset"));
    var string = req.param("search");
    
    if(!string)
      string = "";
    
    collection.find({url: {$regex : ".*" + string + ".*"}}).toArray(function(err, docs) {
      assert.equal(err, null);
      
      if(!offset)
        res.send(docs);
      else{
        var newDocs = [];
        for(var i = 0; i < offset; i++){
          newDocs.push(docs[i])
        }

        res.send(newDocs);
      }
    });
    
    db.close();
  });
});

module.exports = router;
