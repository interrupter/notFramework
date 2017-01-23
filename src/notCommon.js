'use strict';

var notCommon = {
	extend: function(destination, source) {
		for (let property in source) {
			if (source[property] && source[property].constructor && source[property].constructor === Object) {
				destination[property] = destination[property] || {};
				arguments.callee(destination[property], source[property]);
			} else {
				destination[property] = source[property];
			}
		}
		return destination;
	},

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},


	defineIfNotExists: function(obj, key, defaultValue) {
		if (!obj.hasOwnProperty(key) || typeof obj[key] === 'undefined' || obj[key] === null) {
			obj[key] = defaultValue;
		}
	},

	//::fieldName.sub.value
	////['fieldName', 'sub', 'value']
	normilizePath: function(path) {
		if (Array.isArray(path)) {
			return path;
		} else {
			while (path.indexOf(':') > -1) {
				path = path.replace(':', '');
			}
			return path.split('.');
		}
	},

	parsePathStep: function(step, item, helper) {
		let rStep = null;
		if (step.indexOf('::') === 0 && helper) {
			rStep = step.replace('::', '');
			if (rStep.indexOf('()') === rStep.length - 2) {
				rStep = step.replace('()', '');
				if (helper.hasOwnProperty(rStep)) {
					return helper[rStep](item, undefined);
				}
			} else {
				return helper[rStep];
			}
		} else {
			if (step.indexOf(':') === 0 && item) {
				rStep = step.replace(':', '');
				if (rStep.indexOf('()') === rStep.length - 2) {
					rStep = step.replace('()', '');
					if (item.hasOwnProperty(rStep)) {
						return item[rStep](item, undefined);
					}
				} else {
					return item[rStep];
				}
			}
		}
		return step;
	},

	//::fieldName.result
	//{}
	//{fieldName: 'targetRecordField'}
	////['targetRecordField', 'result']
	parsePath: function(path, item, helper) {
		if (!Array.isArray(path)) {
			path = path.split('.');
		}
		for (var i = 0; i < path.length; i++) {
			path[i] = this.parsePathStep(path[i], item, helper);
		}
		return path;
	},

	getValueByPath: function(object, attrPath) {
		attrPath = this.normilizePath(attrPath);
		let attrName = attrPath.shift();
		if (typeof object == 'object' && object.hasOwnProperty(attrName)) {
			if (attrPath.length > 0) {
				return this.getValueByPath(object[attrName], attrPath);
			} else {
				return object[attrName];
			}
		} else {
			return undefined;
		}
	},

	setValueByPath: function(object, attrPath, attrValue) {
		attrPath = this.normilizePath(attrPath);
		let attrName = attrPath.shift();
		if (attrPath.length > 0) {
			if (!object.hasOwnProperty(attrName)) {
				object[attrName] = {};
			}
			this.setValueByPath(object[attrName], attrPath, attrValue);
		} else {
			if (object && object.isRecord) {
				object._setAttr(attrName, attrValue, true);
			} else {
				object[attrName] = attrValue;
			}
		}
		if (object && object.isRecord) {
			object.trigger('onAttrChange_' + attrName, object, attrName, attrValue);
			object.trigger('onAttrChange', object, attrName, attrValue);
		}
	},

	identicalArrays: function(arr1, arr2) {
		arr1.sort();
		arr2.sort();
		return (arr1.join(',').localeCompare(arr2.join(',')) === 0);
	},

	identicalToArray: function(arr, val) {
		return ((arr.length == 1) && arr.indexOf(val) === 0);
	},

	identical: function(a, b) {
		if (Array.isArray(a) && Array.isArray(b)) {
			return this.identicalArrays(a, b);
		} else {
			if ((Array.isArray(a) && !Array.isArray(b)) || (!Array.isArray(a) && Array.isArray(b))) {
				return Array.isArray(a) ? this.identicalToArray(a, b) : this.identicalToArray(b, a);
			} else {
				return a == b;
			}
		}
	},

	getAttributesStartsWith: function(el, startsWith) {
		var allElements = el.querySelectorAll('*');
		var list = [];
		for (var j = 0; j < allElements.length; j++) {
			for (var i = 0, atts = allElements[j].attributes, n = atts.length; i < n; i++) {
				if (atts[i].nodeName.indexOf(startsWith) === 0) {
					list.push(allElements[j]);
					break;
				}
			}
		}
		return list;
	},

	moveElementInArray: function(arr, old_index, new_index) {
		if (new_index >= arr.length) {
			let k = new_index - arr.length;
			while ((k--) + 1) {
				arr.push(undefined);
			}
		}
		arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		return arr;
	},

	/*

		Registry for framework wide store

	*/
	registry: {},
	register: function(key, val) {
		this.registry[key] = val;
	},

	get: function(key) {
		return this.registry.hasOwnProperty(key) ? this.registry[key] : null;
	},

	getSessionID: function(){
		return '';
	},

	getHTML: function(url, data) {
		let that = this;
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader("SessionID", that.getSessionID());
			xhr.responseType = 'text';
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
			xhr.send();
		});
	},

	getJSON: function(url, data) {
		let that = this;
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader("SessionID", that.getSessionID());
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
			xhr.send();
		});
	},
	postJSON: function(url, data) {
		let that = this;
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open("POST", url);
			xhr.setRequestHeader("SessionID", that.getSessionID());
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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
			xhr.open("PUT", url);
			xhr.setRequestHeader("SessionID", that.getSessionID());
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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
			xhr.open("DELETE", url);
			xhr.setRequestHeader("SessionID", that.getSessionID());
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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

	}

};

export default notCommon;
