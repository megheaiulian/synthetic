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
module.exports = Element