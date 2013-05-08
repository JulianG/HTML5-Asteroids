var fs = require('fs');
var JSHINT = require("jshint").JSHINT;

ProjectLinter = function () {
	this.test = "ok";
};

exports.ProjectLinter = ProjectLinter;

var api = ProjectLinter.prototype;

api.lint = function lint(path, filetype) {

	this.walk(path, filetype);
};

api.walk = function walk(dir, filetype) {
	var self = this;
	var results = [];
	fs.readdir(dir, function (err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return self.doneWalking(null, results);
		list.forEach(function (file) {
			file = dir + '/' + file;
			fs.stat(file, function (err, stat) {
				if (stat && stat.isDirectory()) {
					self.walk(file, filetype, function (err, res) {
						results = results.concat(res);
						if (!--pending) self.doneWalking(null, results);
					});
				} else {
					if (file.substr(-filetype.length) == filetype) {
						results.push(file);
					}
					if (!--pending) self.doneWalking(null, results);
				}
			});
		});
	});
};

api.doneWalking = function doneWalking(err, list) {
	if (list) this.testFileList(list);
	else console.log(err);
};

api.testFileList = function testFileList(list) {
	var self = this;
	list.forEach(function (filename) {
		var file_contents = fs.readFile(filename, 'utf8', function (err, data) {
			self.testFile(filename, data);
		});
	});
};

api.testFile = function testFile(filename, source) {
	var options = {};
	var globals = {};
	var success = JSHINT(source, options, globals);
	var n = JSHINT.errors.length;
	//console.log('Testing ' + filename + ' - ' + n + ' errors.');
	for (var i = 0; i < n; i++) {
		this.report(filename, JSHINT.errors[i]);
	}
};

api.report = function report(filename, error) {
	var msg = "";
	msg += '\n' + error.code + ": " + error.reason + '\n';
	msg += ' - ' + filename + ', line:' + error.line + ', char:' + error.character + '.\n';
	msg += '   ' + error.evidence;
	console.log(msg);
	//console.log(error);
};