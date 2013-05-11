/**

This script coverts all the .wav files 
in this folder 
to mp3 using FFMPEG.

Usage 1:
node make_mp3.js

Usage 2:
node make_mp3.js --file=SomeFile.wav

*/

var dst_path = 'C:/Work/TBMG/AsteroidsHTML5/source/assets/audio/';

var fs = require('fs');
var exec = require('child_process').exec;

var list;
var required_file = getCustomArgument("file");

if(required_file){
	list = [required_file];
}else{
	list = fs.readdirSync('.');
}

const n = list.length;
for(var i=0; i<n; i++)
{
	var src = list[i];
	if(getFileExtension(src)=='wav')
	{
		convertFile(src);
	}
}

function convertFile(src)
{
	//var dst = src.replace('.wav','.mp3');
	//var cmd = 'ffmpeg -y -i ' + src + ' ' + dst_path + dst;
	
	var dst = src.replace('.wav','.ogg');
	var cmd = 'ffmpeg -i ' + src + ' -acodec libvorbis ' + dst_path + dst;
	
	console.log(cmd);
	exec(cmd, function callback(error, stdout, stderr){
		if(error==null)
		{
			//console.log( 'assets.enqueue(\"./assets/audio/' + dst + '\");' );
			console.log( 'createjs.Sound.registerSound(\"./assets/audio/' + dst + '\");' );
		}
	});	
}

function getFileExtension(fn)
{
	var re = /(?:\.([^.]+))?$/;
	var ext = re.exec(fn)[1];
	return ext;
}

function getCustomArgument( key ) {
	var rsp;
	var search = "--" + key + "=";
	process.argv.forEach(function (val, index, array) {
		if(val.substring(0,search.length)==search) {
			rsp = val.substring(search.length);
		}
	});
	return rsp;
}