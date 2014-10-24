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
		var done = 0;

		req.onload = req.onreadystatechange = function () {
			if(!done && (!req.readyState || req.readyState == 4)){
				done = 1;
				if(req.status == 200 || req.status == 304){
					resolve(req.responseText);
				}else{
					reject(Error(req.statusText));
				}
				req.onload = req.onreadystatechange = null;
			}
		};
		req.onerror = function(){
			done = 1;
			reject(Error('Network Error'));
		};

		//open connection
		req.open(method, (method === 'GET' && data ? url+'?'+data : url), true);
		
		// send it
		req.send(method !== 'GET' ? data : null);
	})
}

module.exports = request;