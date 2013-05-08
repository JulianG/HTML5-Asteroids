/*

node jshint.js

*/
var ProjectLinter = require('./lint/project-linter').ProjectLinter;
var linter = new ProjectLinter();
console.log("Checking entire project for Javascript errors...");
linter.lint('./source/js', '.js');
