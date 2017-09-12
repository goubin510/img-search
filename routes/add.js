var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var url = 'mongodb://localhost:27017/img';

router.get('/', function(req, res, next) {
  res.render('add', { mess: '' });
});

router.post('/', function(req, res) {
  var json = {};
  json.url = req.body.url;
  json.snippet = req.body.snippet;
  json.thumbnail = req.body.thumbnail;
  json.context = req.body.context;
  
  MongoClient.connect(url, function(err, db) {
    var collection = db.collection('data');
    
    collection.insertOne(json);
    db.close();
  });
  
  
   res.render('add', { mess: 'something happen' });
});

module.exports = router;
