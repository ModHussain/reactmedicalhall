var express=require('express');
var logger=require('morgan');
var bodyParser=require('body-parser');
var errorHandler=require('errorhandler');
var routes=require('./routes');

var app = express();
var host = 'localhost';
var port = 1337;

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.all('/*', routes.auth);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('build'));

app.use('/api/doctors',routes.doctor);
app.use('/api/drugs',routes.drug);
app.use('/api/families',routes.family);
app.use('/api/patients',routes.patient);
app.use('/api/users',routes.user);

app.use(errorHandler);

app.listen(port,function () {
  console.log('MedicalHall delivering drugs on port ' + port);
});
