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
	mixfill : new MixFill(window.MIXFILL_BASE||"http://mixfill.herokuapp.com/"),
	setBase: function(){
		var self = this;
		self.mixfill.setBase(base);
		return self;
	},
	ready  : function(cb){
		var self = this;
		self.mixfill.all(function(err){
			ready()(function(){
				cb(err);
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