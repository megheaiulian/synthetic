require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"synthetic/element":[function(require,module,exports){
module.exports=require('ztAftZ');
},{}],"ztAftZ":[function(require,module,exports){
var Module = require('./module');
var Element = { 
	tag  	: 'div',
	init : function(options){
		var self = this;
		
		self.options = options;
		Object.keys(options).forEach(function(key){
			self[key] = options[key];
		});

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
		//self.events.trigger('release', self)
		self.el.remove();
		//self.events.unbind();
	},
	query 	: function(selector){
		return self.el.querySelector(selector);
	},
	queryAll : function(selector){
		return self.el.querySelectorAll(selector);
	}
}

module.exports = Object.create(Module,{
	proto:{enumerable:true,value:Element}
});

},{"./module":"SsRCJd"}],"b13XKl":[function(require,module,exports){
var Module = require('./module')
var EventsProto = {
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

module.exports = Object.create(Module,{
	proto: {enumerable:true, value:Events}
});

module.exports = Events
},{"./module":"SsRCJd"}],"synthetic/events":[function(require,module,exports){
module.exports=require('b13XKl');
},{}],"SsRCJd":[function(require,module,exports){
var Module = {
	create:function(){
		obj = Object.create(this.proto);
		return obj.init.apply(obj,arguments);
	}
}
module.exports = Module
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
		req.onload = function(){
			if(req.status == 200){
				resolve(req.response);
			}else{
				reject(Error(req.statusText));
			}
		};
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