var Module = {
	create:function(){
		obj = Object.create(this.proto);
		return obj.init.apply(obj,arguments);
	}
}
module.exports = Module