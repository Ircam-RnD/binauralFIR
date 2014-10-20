var gulp = require('gulp');
var packageJson = require('./package.json');

require('./node_modules/module-boilerplate/load-dependencies')(packageJson);

tasks = require('./node_modules/module-boilerplate/tasks.json');

for(var i in tasks) {
  require('./node_modules/module-boilerplate/tasks/' + tasks[i])(gulp, packageJson);
}
