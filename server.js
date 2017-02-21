var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var mongoose = require('mongoose');

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));

mongoose.connect('mongodb://localhost/rem');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;

app.get('/sample', function(req, res) {
  // grab the user model
// create a new user
  var newUser = User({
    name: 'Peter Quill',
    username: 'starlord55',
    password: 'password',
    admin: true
  });

// save the user
  newUser.save(function(err) {
    if (err) throw err;

    console.log('User created!');
  });
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('server started ' + port);
