var CommonNetwork = {
	addHost: function(uri){
		return this.get('host') + uri;
	},
	addProtocol: function(uri){
		return this.get('protocol') + uri;
	},
	preloadImages: function(dataArray, fields) {
		for(var i in dataArray) {
			for(var f in fields) {
				if(dataArray[i].hasOwnProperty(fields[f])) {
					var image = new Image();
					image.setAttribute('crossOrigin', 'anonymous');
					image.src = dataArray[i][fields[f]].indexOf('//') === 0 ? this.addProtocol(dataArray[i][fields[f]]) : dataArray[i][fields[f]];
				}
			}
		}
	},
	requestJSON: function(method, url, data){
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			xhr.setRequestHeader('SessionID', this.getSessionID());
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function() {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(status, xhr.response);
				}
			};
			let t = () => reject(xhr.status);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(JSON.stringify(data));
		});
	},
	getJSON: function(url, data) {
		let that = this;
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', that.getSessionID());
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function() {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(status, xhr.response);
				}
			};
			let t = () => reject(xhr.status);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(JSON.stringify(data));
		});
	},
	postJSON: function(url, data) {
		let that = this;
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('POST', url);
			xhr.setRequestHeader('SessionID', that.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function() {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(status, xhr.response);
				}
			};
			let t = () => reject(xhr.status);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(JSON.stringify(data));
		});
	},
	putJSON: function(url, data) {
		let that = this;
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('PUT', url);
			xhr.setRequestHeader('SessionID', that.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function() {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(status, xhr.response);
				}
			};
			let t = () => reject(xhr.status);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(JSON.stringify(data));
		});
	},
	deleteJSON: function(url, data) {
		let that = this;
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('DELETE', url);
			xhr.setRequestHeader('SessionID', that.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function() {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(status, xhr.response);
				}
			};
			let t = () => reject(xhr.status);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(JSON.stringify(data));
		});
	},
	getHTML: function(url, data) {
		let that = this;
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', that.getSessionID());
			xhr.responseType = 'blob';
			xhr.withCredentials = true;
			xhr.onload = function() {
				var status = xhr.status;
				if (parseInt(status) == 200) {
					resolve(xhr.response);
				} else {
					reject(status, xhr.response);
				}
			};
			let t = () => reject(xhr.status);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(JSON.stringify(data));
		});
	},
	getSessionID: function() {
		return '';
	},
};
export default CommonNetwork;
