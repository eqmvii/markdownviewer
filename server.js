'use strict';

var express = require('express');
var mongo = require('mongodb');
var routes = require('./app/routes/index.js');

var app = express();

mongo.connect(process.env.MONGO_URI, function (err, db) {

   if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB via stuff.');
   }
app.use('/', express.static(process.cwd() + '/')); // hack to serve transformed
   app.use('/public', express.static(process.cwd() + '/public'));
   app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

   routes(app, db);

// ready to listen if deployed to heroku
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
});

});
