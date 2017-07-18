var CommonNetwork = {
	addHost: function (uri) {
		return this.get('host') + uri;
	},
	addProtocol: function (uri) {
		return this.get('protocol') + uri;
	},
	preloadImages: function (dataArray, fields) {
		for (var i in dataArray) {
			for (var f in fields) {
				if (dataArray[i].hasOwnProperty(fields[f])) {
					var image = new Image();
					image.setAttribute('crossOrigin', 'anonymous');
					image.src = dataArray[i][fields[f]].indexOf('//') === 0 ? this.addProtocol(dataArray[i][fields[f]]) : dataArray[i][fields[f]];
				}
			}
		}
	},
	putFile(upload /* object(file, onProgress, url)*/ ) {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest();
			if (xhr.upload) {
				// progress bar
				if (upload.onProgress) {
					xhr.upload.addEventListener('progress', upload.onProgress, false);
				}
				// file received/failed
				xhr.responseType = 'json';
				xhr.onreadystatechange = function ( /*e*/ ) {
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							resolve(xhr.response);
						} else {
							reject(xhr.response);
						}
					}
				};
				// start upload
				xhr.withCredentials = true;
				xhr.open('PUT', upload.url, true);
				xhr.setRequestHeader('SessionID', this.getSessionID());
				xhr.setRequestHeader('Content-Type', upload.file.type);
				xhr.setRequestHeader('X_FILENAME', encodeURIComponent(upload.file.name));
				xhr.send(upload.file);
			} else {
				reject();
			}
		});
	},
	requestJSON: function (method, url, data) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			xhr.setRequestHeader('SessionID', this.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function () {
				let status = xhr.status;
				if (status == 200) {
					xhr.response.lengthInBytes = xhr.getResponseHeader('Content-Length');
					resolve(xhr.response);
				} else {
					reject(xhr.response);
				}
			};
			let t = () => reject(xhr.status);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	getJSON: function (url, data) {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', this.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function () {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(xhr.response);
				}
			};
			let t = () => reject(xhr.status);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	postJSON: function (url, data) {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('POST', url);
			xhr.setRequestHeader('SessionID', this.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function () {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(xhr.response);
				}
			};
			let t = () => reject(xhr.status);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	putJSON: function (url, data) {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('PUT', url);
			xhr.setRequestHeader('SessionID', this.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function () {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(xhr.response);
				}
			};
			let t = () => reject(xhr.status);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	deleteJSON: function (url, data) {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('DELETE', url);
			xhr.setRequestHeader('SessionID', this.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function () {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(xhr.response);
				}
			};
			let t = () => reject(xhr.status);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	getHTML: function (url, data) {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', this.getSessionID());
			xhr.responseType = 'text';
			xhr.withCredentials = true;
			xhr.onload = () => {
				var status = xhr.status;
				if (parseInt(status) === 200) {
					resolve(xhr.responseText);
				} else {
					reject(xhr.responseText);
				}
			};
			let t = (e) => reject(e);
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	getSessionID: function (name = 'SessionID') {
		return this.getCookie(name);
	},
	getCookie: (name) => {
		let value = '; ' + document.cookie,
			parts = value.split('; ' + name + '=');
		if (parts.length == 2) {
			return parts.pop().split(';').shift();
		} else {
			return null;
		}
	}
};

export default CommonNetwork;
