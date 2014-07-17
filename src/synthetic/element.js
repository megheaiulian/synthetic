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