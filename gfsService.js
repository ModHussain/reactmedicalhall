var db = require('./db.js');
var Grid = require('gridfs-stream');
var fs = require('fs');
var Promise = require('bluebird');
var ObjectId = db.mongoose.Types.ObjectId;
Grid.mongo = db.mongoose.mongo;

var gfs;

var writeFileToDb = function (config) {
  console.log('file upload writeFileToDb')
	return new Promise(function (resolve,reject) {
		var objectId = ObjectId();
		var readStream = config.readStream;
		var writeStream = gfs.createWriteStream({
			_id:objectId,
			filename:config.fileName,
			root:config.collection
		});
		readStream.pipe(writeStream);
		writeStream.on('close',function () {
			resolve(objectId);
		});
		writeStream.on('error',function (error) {
			reject(error);
		});
		readStream.on('error',function (error) {
			reject(error);
		});
	});
};

var readFileFromDb = function (config) {
	return new Promise(function (resolve,reject) {
		var readStream = gfs.createReadStream({
			_id:config.objectId,
			root:config.collection
		});
		var writeStream = config.writeStream;
		readStream.pipe(writeStream);
		writeStream.on('close',function () {
			resolve();
		});
		writeStream.on('error',function (error) {
			reject(error);
		});
		readStream.on('error',function (error) {
			reject(error);
		});
	});
};

module.exports = function (connection) {
	gfs = Grid(connection.db);
	return{
		writeFileToDb:writeFileToDb,
		readFileFromDb:readFileFromDb
	};
};
