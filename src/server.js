var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var http = require('http');

var app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use('/uploads', express.static(__dirname + '/../uploads'));
//app.use('/api', router);

var port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is listening at port: ${port}`);
});

module.exports = app;

//export default server;
