util = require 'util'
module.exports = (grunt)=>
	aliasify = (aliases)->
		aliasArray = [];
		aliases = if util.isArray(aliases) then aliases else [aliases];
		aliases.forEach (alias)->
			grunt.file.expandMapping(alias.src, alias.dest, {cwd: alias.cwd}).forEach (file)->
				expose = file.dest.substr(0, file.dest.lastIndexOf('.'));
				aliasArray.push('./' + file.src[0] + ':' + expose);
		return aliasArray;

	grunt.initConfig(
		pkg: grunt.file.readJSON 'package.json'
		browserify:
			source:
				dest: 'lib/index.js'
				src:[]            
				options:
					alias: aliasify
						cwd 	: 'src/synthetic',
						src 	: ['*.js','**/*.js']
						dest	: 'synthetic'
	)
	grunt.loadNpmTasks "grunt-browserify"
	grunt.registerTask 'default', ['browserify']