var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/img';

router.get('/', function(req, res, next) {
  res.render('searchPage', { title: 'Search Page', data: ""});
});

router.post('/', function(req, res, next) {
  var newDocs = [];
  
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('data');
    
    var string = req.body.search;
    var offset = parseInt(req.body.offset);
    
    if(!string)
      string = "";
    
    collection.find({url: {$regex : ".*" + string + ".*"}}).toArray(function(err, docs) {
      assert.equal(err, null);
      
      if(!offset)
        newDocs = docs;
      else{
        for(var i = 0; i < offset; i++){
          newDocs.push(docs[i])
        }
      }
      
      res.render('searchPage', { title: 'Search Page', data: newDocs});
    });
    
    db.close();
  });
  
//  res.render('searchPage', { title: 'Search Page', mess: 'error', data: newDocs});
})

module.exports = router;
