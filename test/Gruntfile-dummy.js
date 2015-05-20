'use strict';

// var helper = require('./helper');
var path = require('path');

module.exports = function (grunt) {

	// load test tasks
	grunt.loadTasks('./test_tasks');

	grunt.initConfig({
		clean: {
			tests: ['tmp/dummy/**/*']
		},
		dummy_tango: {
			tango_one: {},
			"tango-two": {}
		},
		"dash-victor": {
			victor_one: {},
			"victor-two": {}
		},
		echo: {
			before: {
				options: {
					echo: 'before: ' + path.basename(__filename)
				}
			},
			after: {
				options: {
					echo: 'after: ' + path.basename(__filename)
				}
			},
			echo: {
				options: {
					echo: 'echo'
				}
			}
		},
		inheritStdio: {
			doIt: {}
		}
	});

	//register a long running async multiTask to test inheritStdio (make sure we get real-time output from the child process rather than having to wait)
	grunt.registerMultiTask('inheritStdio', 'A long running async task to test real-time output', function() {
		var done = this.async();

		//each second, for 5 seconds, log something, then finish the task
		var n = 0;
		var interval = setInterval(function() {
			n++;
			grunt.log.writeln('long task logging value of n: ' + n.toString());
			if (n === 5) {
				clearInterval(interval);
				done();
			}
		}, 1000);
	});

	grunt.registerTask('default', ['echo:before', 'dummies', 'echo:after']);

	grunt.registerTask('dummies', [
		'dummy_tango:tango_one',
		'dummy_tango:tango-two',
		'echo:echo',
		'dash-victor:victor_one',
		'dash-victor:victor-two'
	]);

	grunt.registerTask('tangos', ['dummy_tango:tango_one', 'dummy_tango:tango_two']);
	grunt.registerTask('victors', ['dash-victor:victor_one', 'dash-victor:victor-two']);

	grunt.registerTask('multi', ['echo:before', 'echo:echo', 'echo:after']);
};
