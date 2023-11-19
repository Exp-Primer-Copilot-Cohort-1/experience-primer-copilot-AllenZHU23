// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://localhost/Comment');

//Create a schema - this is like a blueprint
var commentSchema = new mongoose.Schema({
  name: String,
  comment: String
});

var Comment = mongoose.model('Comment', commentSchema);

// var data = [{name: 'John', comment: 'This is a comment'}, {name: 'Jane', comment: 'This is another comment'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

app.get('/comment', function(req, res) {
  //get data from mongodb and pass it to view
  Comment.find({}, function(err, data) {
    if (err) throw err;
    res.render('comment', {comments: data});
  });
});

app.post('/comment', urlencodedParser, function(req, res) {
  //get data from view and add it to mongodb
  var newComment = Comment(req.body).save(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

app.delete('/comment/:item', function(req, res) {
  //delete the requested item from mongodb
  Comment.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

};