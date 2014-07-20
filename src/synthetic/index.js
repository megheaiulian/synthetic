var MixFill = require('mixfill'),
	ready = function () {
		var fns = [], listener
		, doc = document
		, domContentLoaded = 'DOMContentLoaded'
		, loaded = /^loaded|^i|^c/.test(doc.readyState)

	if (!loaded)
		doc.addEventListener(domContentLoaded, listener = function () {
		doc.removeEventListener(domContentLoaded, listener)
		loaded = 1
		while (listener = fns.shift()) listener()
	});

	return function (fn) {
		loaded ? fn() : fns.push(fn)
	}

};

var Synthetic = {
	mixfill : new MixFill("http://mixfill.herokuapp.com/"),
	ready  : function(fn){
		var self = this;
		self.mixfill.needs(['elementClassList','elementMatches','es5','es5Object','eventListener','promise']).load(function(){
			ready()(function(){
				fn();
			});
		});
	},
	needs : function(features){
		var self = this;
		self.mixfill.needs(features);
		return self;
	}
}

module.exports = Synthetic;