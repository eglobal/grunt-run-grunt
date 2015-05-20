'use strict';

// var helper = require('./helper');

module.exports = function (grunt) {

	// load run_grunt
	grunt.loadTasks('./../tasks');

	grunt.initConfig({
		run_grunt: {
			stdio: {
				options: {
					task: 'inheritStdio',
          inheritStdio: true
				},
				src: ['Gruntfile-dummy.js']
			}
		}
	});

	grunt.registerTask('default', ['run_grunt']);

};
