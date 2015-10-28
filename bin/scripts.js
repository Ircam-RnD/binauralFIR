var fs = require("fs");
var minimist = require('minimist');

// colors for shell - for a more complete list
// cf. http://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux
var red   = '\033[0;31m';
var green = '\033[0;32m';
var NC    = '\033[0m'; // No Color

// COMMAND INTERPRETER
// -----------------------------------------------
var command = process.argv[2];
// execute the correct function given the script
switch (command) {
  case '--cover-report':
    coverReport();
    break;
}

// Cover report
function coverReport() {
  'use strict';

  var argv = minimist(process.argv.slice(3));
  var chunks = [];
  var uncovered = clc.red.bold;
  var covered = clc.green;
  var f = fs.readFileSync(argv['i']);
  var json = JSON.parse(f);
  Object.keys(json).forEach(function(key){
    if(json[key].length > 0){
      console.log(key);
      var notCovered = {};
      for(var i=0; i<json[key].length;i++ ){
        var line = json[key][i]['lineNum'];
        var range = json[key][i].lines[0].range;
        notCovered[line] = range;
      }
      var file = fs.readFileSync(key, 'utf8')
      file = file.split('\n');
      for(var i=0; i<file.length; i++){
        var line = file[i];
        if(notCovered[i]){
          console.log(pad((i+1).toString(), 6)+' '+uncovered(line));
        }else{
          console.log(pad((i+1).toString(), 6)+' '+covered(line));
        }
      };
    }
  });
}

