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