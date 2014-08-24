require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var tests = require('./tests') 
	, isArray = function(obj){return Object.prototype.toString.call( obj ) === '[object Array]'}
	, isFunction = function(obj){return !!(obj && obj.constructor && obj.call && obj.apply)}
	, doc = document
	, head = doc.getElementsByTagName("head")[0] || doc.documentElement
	, loadScript = function(src,cb){
		var script = doc.createElement('script')
			, done
			, ready = function(err){ if(cb) cb(err);};

		script.src 		= src;
		script.async 	= true;

		script.onload = script.onreadystatechange = function () {
			if(!done && (!script.readyState || /loaded|complete/.test( script.readyState ))){
				done = 1;
				script.onload = script.onreadystatechange = null;
				if(script.parentNode){
				 	script.parentNode.removeChild(script);
				}
				script = null;
				ready();
			}
		};
		script.onerror = function(){
			done = 1;
			ready(new Error('Script Error: ' + src));
		};
		setTimeout(function(){
			if(!done){
				done = 1;
				ready(new Error('Timeout: ' + src));
			}
		},10e3);
		head.insertBefore(script,head.firstChild);
	};

var MixFill = function(base){

	var that = this;
	
	that.base = base;
	that.tests = tests;
	that._need = {};

	that.setBase = function(base){
		var self = this;
		self.base = base;
		return self;
	};
	
	that.all = function(cb){
		var self = this,tests=self.tests,all=[];
		for(var test in tests){
			if(tests.hasOwnProperty(test)){
				all.push(test);
			}
		}
		return self.need(all).load(cb);
	};

	that.need = function(features){
		var self = this,i, tests = self.tests;
		if(features){
			features = !isArray(features)?[features]:features;
			for(i=0; i < features.length; i++){
				var feature = features[i]
					, ok = tests[feature];
				if(ok && !(ok = tests[feature] = (isFunction(ok)?Boolean(ok()):ok))){
					self._need[feature] = true;
				}
			}
		}
		return self;
	};

	that.load = function(cb){
		var self = this
			, url = self.base
			, need = self._need
			, tests = self.tests
			, shims = []
			, fn = function(err){
				if(cb) cb(err);
				return self;
			}
		
		if(need){
			for(var shim in need){
				if(need.hasOwnProperty(shim) && need[shim]){
					shims.push(shim);
				}
			}
			if(!shims.length){
				return fn();
			}
			shims.sort();
			url = url.replace(/\/$/,'')+ "/" + shims.join("-")+'.js';
			console.log('loading:',url);
			loadScript(url,function(err){
				if(!err){
					self._need = {};
					for(var i=0;i<shims.length;i++){
						if(tests[shims[i]]){
							delete tests[shims[i]];
						}
					}
				}
				fn(err);
			});
		}else{
			fn()
		}
		return self;
	}
};
module.exports = MixFill;
},{"./tests":2}],2:[function(require,module,exports){
var Tests = {
	elementClassList: function(){
		return "classList" in document.createElement("_")
	},
	elementMatches: function(){
		if (Element){(function(proto){
			proto.matches = proto.matchesSelector =
			proto.matchesSelector || 
			proto.webkitMatchesSelector ||
			proto.mozMatchesSelector ||
			proto.msMatchesSelector ||
			proto.oMatchesSelector ||
			function (selector) {
				var nodes = (this.parentNode || this.document).querySelectorAll(selector), i = -1;
		 
				while (nodes[++i] && nodes[i] !== this);
		 
				return !!nodes[i];
			};
			})(Element.prototype);
		}
		return true;
	},
	es5: function(){
		var arrayProto = Array.prototype
			, dateProto = Date.prototype
			, stringProto = String.prototype;
		return (arrayProto.every && arrayProto.filter && arrayProto.forEach && arrayProto.indexOf && arrayProto.lastIndexOf
			&& arrayProto.map && arrayProto.some && arrayProto.reduce && arrayProto.reduceRight && Array.isArray && Date.now &&
			Date.parse && dateProto.toJSON && dateProto.toISOString && Function.prototype.bind && Number.prototype.toFixed &&
			Object.keys && stringProto.split && stringProto.trim && stringProto.replace);
	},
	es5Object: function(){
		var obj = Object;
		return obj.create && obj.getPrototypeOf && obj.getOwnPropertyNames && obj.isSealed && obj.isFrozen &&
			obj.isExtensible && obj.getOwnPropertyDescriptor && obj.defineProperty && obj.defineProperties &&
			obj.seal && obj.freeze && obj.preventExtensions;
	},
	eventListener: function(){
		var win = window
			, Win = win['Window']
			, winProto = Win?Win.prototype:win;
		return 'addEventListener' in winProto && 'removeEventListener' in winProto && 'dispatchEvent' in winProto
	},
	promise : function(){
		return 'Promise' in window
	}
}
module.exports = Tests;
},{}],"synthetic/element":[function(require,module,exports){
module.exports=require('ztAftZ');
},{}],"ztAftZ":[function(require,module,exports){
var Module = require('./module');
var Element = { 
	tag  	: 'div',
	init: function(options){
		var self = this;
		
		self.options = options;
		Object.assign(self,options);

		self.el = self.el || document.createElement(self.tag);

		if(self.className){
			self.el.className = self.className;
		}
		if(self.attributes){
			Object.keys(self.attributes).forEach(function(attr){
				self.el.setAttribute(self.attributes[attr]);
			});
		}
		return self;
	},
	release : function(){
		var self = this;
		self.el.remove();
	},
	query 	: function(selector){
		return this.el.querySelector(selector);
	},
	queryAll : function(selector){
		return this.el.querySelectorAll(selector);
	},
	on:function(event,selector,callback){
		
	}
}
Element = Module.extend(Element);
module.exports = Element
},{"./module":"SsRCJd"}],"b13XKl":[function(require,module,exports){
var Events = {
	on : function(ev,cb){
		var evs = ev.split(' '), 
			self = this,
			callbacks = self.callbacks;
		
		evs.forEach(function(name){
			(callbacks[name] = callbacks[name] || []).push(cb);
		});
	},
	one : function(ev,callback){
		var self = this,
			handler = function(){
				self.unbind(ev,handler);
				callback.apply(self.target,arguments);
			};
		self.bind(ev,handler);
	},

	trigger : function(ev){
		var self = this,
			args = Array.prototype.slice.call(arguments, 0),
			ev 	 = args.shift(),
			list = self.callbacks[ev]||[];

		for(var i=0; i<list.length;i++){
			if(list[i].apply(self.target,args) === false){
				break;
			}
		}
	},
	off 	: function(ev,callback){
		var self = this,
			callbacks, evs;
		
		if(arguments.length == 0 || !ev){
			!ev?self.callbacks = {}:0;
			return self
		}
		callbacks = self.callbacks;
		evs = ev.split(' ');
		for(var i=0;i<evs.length;i++){
			var name = evs[i],
				list = callbacks[name];
			
			if(!list || !callback){
				!callback?delete callbacks[name]:0;
				continue
			}
			for(var j=0;j<list.length;j++){
				var cb = list[i];
				if(cb === callback){
					list = list.slice();
					list.splice(i,1);
					callbacks[name] = list;
					break;
				}
			}			
		}
		return self;
	},
	init 	: function(target){
		var self = this;
		self.target = target;
		self.callbacks = {};
		return self;
	}
}
Events = Module.extend(Events);
module.exports = Events
},{}],"synthetic/events":[function(require,module,exports){
module.exports=require('b13XKl');
},{}],"synthetic/index":[function(require,module,exports){
module.exports=require('sBF/ke');
},{}],"sBF/ke":[function(require,module,exports){
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
	setBase: function(){
		var self = this;
		self.mixfill.setBase(base);
		return self;
	},
	ready  : function(cb){
		var self = this;
		self.mixfill.all(function(err){
			ready()(function(){
				fn(cb);
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
},{"mixfill":1}],"SsRCJd":[function(require,module,exports){
if(!Object.assign){
	var isObject = function (obj) {
		return obj && typeof obj === 'object';
	};

	Object.assign = function(target, source) {
		var s, i, props;
		if (!isObject(target)) { throw new TypeError('target must be an object'); }
		for (s = 1; s < arguments.length; ++s) {
			source = arguments[s];
			if (!isObject(source)) { throw new TypeError('source ' + s + ' must be an object'); }
			props = Object.keys(Object(source));
			for (i = 0; i < props.length; ++i) {
				target[props[i]] = source[props[i]];
			}
		}
		return target;
	};
}
var Module = {
	extend : function(extension){
		var obj = Object.create(this);
		return Object.assign(obj,extension);
	},
	create : function(){
		obj = Object.create(this);
		obj.init.apply(obj,arguments);
		return obj;
	}
}
module.exports = Module;
},{}],"synthetic/module":[function(require,module,exports){
module.exports=require('SsRCJd');
},{}],"yepV+Y":[function(require,module,exports){
var get = "GET";
var request = function(url,method,data){
	method = method || get;
	data 	= data || {};
	
	if(method instanceof Object){
		data 	= method;
		method	= get;
	}

	var req = (function() {
		if (typeof 'XMLHttpRequest' !== 'undefined') {
			// CORS (IE8-9)
			return url.indexOf('http') === 0 && typeof XDomainRequest !== 'undefined'?
				new XDomainRequest(): new XMLHttpRequest();
		} else if (typeof 'ActiveXObject' !== 'undefined') {
			return new ActiveXObject('Microsoft.XMLHTTP');
		}
	})();
	if (!req) {
		throw new Error ('Browser doesn\'t support XHR');
	}
	// serialize data?
	if (typeof data !== 'string') {
		var serialized = [];
		for (var datum in data) {
			serialized.push(datum + '=' + data[datum]);
		}
		data = serialized.join('&');
	}
	return new Promise(function(resolve,reject){
		var onload = function(){
			if(req.status == 200){
				resolve(req.responseText);
			}else{
				reject(Error(req.statusText));
			}
		};
		if(!('onload' in req) && ('onreadystatechange' in req)){
			req.onreadystatechange = onload;
		}else{
			req.onload = onload;
		}
		req.onerror = function(){
			reject(Error('Network Error'));
		};

		//open connection
		req.open(method, (method === 'GET' && data ? url+'?'+data : url), true);
		
		// send it
		req.send(method !== 'GET' ? data : null);
	})
}

module.exports = request;
},{}],"synthetic/request":[function(require,module,exports){
module.exports=require('yepV+Y');
},{}]},{},[]);