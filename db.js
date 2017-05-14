var mongoose = require('mongoose');
var config=require('./config');

mongoose.connect(config.dbUrl);

exports.mongoose=mongoose;

var patientSchema = mongoose.Schema({
  name:String,
  age:Number,
  sex:String,
  mobile:String,
  doctorId:String,
  ailment:String,
  pictureId: String,
  drugs:[{id:String}],
  createDate: {
    type: Date,
    default: Date.now
  }
})

exports.Patient = mongoose.model('Patient',patientSchema,'patients');

var familySchema = mongoose.Schema({
  familyName:String,
  mobile:String,
  email:String,
  patients:[{
    id:String,
    relation:String
  }],
  createDate: {
    type: Date,
    default: Date.now
  }
  })

exports.Family = mongoose.model('Family',familySchema,'families');

var drugSchema = mongoose.Schema({
  ailment:String,
  drug:String,
  drugQty:Number,
  renewalDate:String,
  patientReminder:String,
  createDate: {
    type: Date,
    default: Date.now
  }
})

exports.Drug = mongoose.model('Drug',drugSchema,'drugs');

var doctorSchema = mongoose.Schema({
  doctor:String,
  specialization:String,
  address:{
    doorNo:Number,
    area:String,
    city:String,
    state:String,
    pincode:Number
  },
  timings:{
    from:String,
    to:String
  },
  mobile:String,
  createDate: {
    type: Date,
    default: Date.now
  }
})

exports.Doctor = mongoose.model('Doctor',doctorSchema,'doctors');

var userSchema = mongoose.Schema({
  name:String,
  email:String,
  phone:String,
  password:String,
  createDate: {
    type: Date,
    default: Date.now
  }
})

exports.User = mongoose.model('User',userSchema,'users');
