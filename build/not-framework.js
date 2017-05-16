(function (exports) {
'use strict';

var CommonNetwork = {
	addHost: function addHost(uri) {
		return this.get('host') + uri;
	},
	addProtocol: function addProtocol(uri) {
		return this.get('protocol') + uri;
	},
	preloadImages: function preloadImages(dataArray, fields) {
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
	putFile: function putFile(upload /* object(file, onProgress, url)*/) {
		var _this = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			if (xhr.upload) {
				// progress bar
				if (upload.onProgress) {
					xhr.upload.addEventListener('progress', upload.onProgress, false);
				}
				// file received/failed
				xhr.responseType = 'json';
				xhr.onreadystatechange = function () /*e*/{
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
				xhr.setRequestHeader('SessionID', _this.getSessionID());
				xhr.setRequestHeader('Content-Type', upload.file.type);
				xhr.setRequestHeader('X_FILENAME', encodeURIComponent(upload.file.name));
				xhr.send(upload.file);
			} else {
				reject();
			}
		});
	},

	requestJSON: function requestJSON(method, url, data) {
		var _this2 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			xhr.setRequestHeader('SessionID', _this2.getSessionID());
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
			var t = function t() {
				return reject(xhr.status);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	getJSON: function getJSON(url, data) {
		var _this3 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', _this3.getSessionID());
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
			var t = function t() {
				return reject(xhr.status);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	postJSON: function postJSON(url, data) {
		var _this4 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('POST', url);
			xhr.setRequestHeader('SessionID', _this4.getSessionID());
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
			var t = function t() {
				return reject(xhr.status);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	putJSON: function putJSON(url, data) {
		var _this5 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('PUT', url);
			xhr.setRequestHeader('SessionID', _this5.getSessionID());
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
			var t = function t() {
				return reject(xhr.status);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	deleteJSON: function deleteJSON(url, data) {
		var _this6 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('DELETE', url);
			xhr.setRequestHeader('SessionID', _this6.getSessionID());
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
			var t = function t() {
				return reject(xhr.status);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	getHTML: function getHTML(url, data) {
		var _this7 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', _this7.getSessionID());
			xhr.responseType = 'text';
			xhr.withCredentials = true;
			xhr.onload = function () {
				var status = xhr.status;
				if (parseInt(status) === 200) {
					resolve(xhr.responseText);
				} else {
					reject(xhr.responseText);
				}
			};
			var t = function t(e) {
				return reject(e);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	getSessionID: function getSessionID() {
		var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SessionID';

		return this.getCookie(name);
	},
	getCookie: function getCookie(name) {
		var value = '; ' + document.cookie,
		    parts = value.split('; ' + name + '=');
		if (parts.length == 2) {
			return parts.pop().split(';').shift();
		} else {
			return null;
		}
	}
};

//dirty hack to remove no-console warning of eslint
/* global notFramework*/
var LOG = 'console';
var CommonLogs = {
	error: function error() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG;

			(_window$LOG = window[LOG]).error.apply(_window$LOG, arguments);
		}
	},
	log: function log() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG2;

			(_window$LOG2 = window[LOG]).log.apply(_window$LOG2, arguments);
		}
	},
	report: function report() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG3;

			(_window$LOG3 = window[LOG]).error.apply(_window$LOG3, arguments);
		}
	},
	trace: function trace() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG4;

			(_window$LOG4 = window[LOG]).trace.apply(_window$LOG4, arguments);
		}
	},
	mute: function mute() {
		this.register('production', true);
	}
};

var MANAGER = Symbol('MANAGER');

var CommonShorts = {
	getAPI: function getAPI() {
		return this.getManager().getAPI();
	},
	setManager: function setManager(v) {
		this[MANAGER] = v;
	},
	getManager: function getManager() {
		return this[MANAGER];
	}
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* global jQuery */
var CommonObjects = {
	extend: function extend(defaults$$1, options) {
		var extended = {};
		var prop;
		for (prop in defaults$$1) {
			if (Object.prototype.hasOwnProperty.call(defaults$$1, prop)) {
				extended[prop] = defaults$$1[prop];
			}
		}
		for (prop in options) {
			if (Object.prototype.hasOwnProperty.call(options, prop)) {
				extended[prop] = options[prop];
			}
		}
		return extended;
	},
	completeAssign: function completeAssign(target) {
		for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			sources[_key - 1] = arguments[_key];
		}

		sources.forEach(function (source) {
			var descriptors = Object.keys(source).reduce(function (descriptors, key) {
				descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
				return descriptors;
			}, {});
			// by default, Object.assign copies enumerable Symbols too
			Object.getOwnPropertySymbols(source).forEach(function (sym) {
				var descriptor = Object.getOwnPropertyDescriptor(source, sym);
				if (descriptor.enumerable) {
					descriptors[sym] = descriptor;
				}
			});
			Object.defineProperties(target, descriptors);
		});
		return target;
	},
	extendWith: function extendWith(options) {
		for (var prop in options) {
			if (options.hasOwnProperty(prop)) {
				this[prop] = options[prop];
			}
		}
	},

	containsObj: function containsObj(big, small) {
		for (var t in small) {
			if (small.hasOwnProperty(t)) {
				if (!big.hasOwnProperty(t) || big[t] !== small[t]) {
					return false;
				}
			}
		}
		return true;
	},
	filter: function filter(obj, _filter) {
		if (_filter && obj) {
			return this.containsObj(obj, _filter);
		}
		return true;
	},
	findIconByFilter: function findIconByFilter(icons, filter) {
		var batch = [];
		for (var i = 0; i < icons.length; i++) {
			if (this.filter(icons[i].getData(), filter)) {
				batch.push(icons[i]);
			}
		}
		return batch;
	},
	equalObj: function equalObj(a, b) {
		var p;
		for (p in a) {
			if (typeof b[p] == 'undefined') {
				return false;
			}
		}
		for (p in a) {
			if (a[p]) {
				switch (_typeof(a[p])) {
					case 'object':
						{
							if (!this.equal(a[p], b[p])) {
								return false;
							}
							break;
						}
					case 'function':
						{
							if (typeof b[p] == 'undefined' || p != 'equals' && a[p].toString() != b[p].toString()) return false;
							break;
						}
					default:
						{
							if (a[p] != b[p]) {
								return false;
							}
						}
				}
			} else {
				if (b[p]) return false;
			}
		}

		for (p in b) {
			if (typeof a[p] == 'undefined') {
				return false;
			}
		}
		return true;
	},
	defineIfNotExists: function defineIfNotExists(obj, key, defaultValue) {
		if (!obj.hasOwnProperty(key)) {
			obj[key] = defaultValue;
		}
	},
	deepMerge: function deepMerge(obj1, obj2) {
		return jQuery.extend(true, {}, obj1, obj2);
	},

	registry: {},

	register: function register(key, val) {
		this.registry[key] = val;
	},

	get: function get$$1(key) {
		return this.registry.hasOwnProperty(key) ? this.registry[key] : null;
	},

	moveItem: function moveItem(array, old_index, new_index) {
		if (new_index >= array.length) {
			var k = new_index - array.length;
			while (k-- + 1) {
				array.push(undefined);
			}
		}
		array.splice(new_index, 0, array.splice(old_index, 1)[0]);
	}
};

var CommonStrings = {
	capitalizeFirstLetter: function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	lowerFirstLetter: function lowerFirstLetter(string) {
		return string.charAt(0).toLowerCase() + string.slice(1);
	}
};

var CommonFunctions = {
	pipe: function pipe(data /* feed data */, funcs /* functions array */) {
		var result = void 0;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = funcs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var func = _step.value;

				result = func(result || data);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return result;
	}
};

var CommonDOM = {
	getAttributesStartsWith: function getAttributesStartsWith(el, startsWith) {
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
	}
};

var CommonApp = {
	startApp: function startApp(starter) {
		document.addEventListener('DOMContentLoaded', starter);
	},
	getApp: function getApp() {
		return this.get('app');
	}
};

/*
	список того что нужно подключить как общие
*/
var notCommon = Object.assign({}, CommonObjects);

notCommon.extendWith(CommonNetwork);
notCommon.extendWith(CommonStrings);
notCommon.extendWith(CommonLogs);
notCommon.extendWith(CommonShorts);
notCommon.extendWith(CommonFunctions);
notCommon.extendWith(CommonDOM);
notCommon.extendWith(CommonApp);

/*
	:property.sub1.func().funcProp
	 = return funcProp of function result of sub1 property of property of object
	:{::helperVal}.sub
	 = return sub property of object property with name retrieved from helperVal property of helpers object
	:{::helperFunc()}.sub
	= return sub property of object property with name retrieved from helperVal function result of helpers object.
	if helpersFunx return 'car' then source path becomes :car.sub

*/

var SUB_PATH_START = '{';
var SUB_PATH_END = '}';
var PATH_SPLIT = '.';
var PATH_START_OBJECT = ':';
var PATH_START_HELPERS = '::';
var FUNCTION_MARKER = '()';
var MAX_DEEP = 10;

var notPath = function () {
	function notPath() {
		classCallCheck(this, notPath);

		return this;
	}
	/*
 	input ':{::helperVal}.sub'
 	return ::helperVal
 */


	createClass(notPath, [{
		key: 'findNextSubPath',
		value: function findNextSubPath(path /* string */) {
			var subPath = '',
			    find = false;
			for (var i = 0; i < path.length; i++) {
				if (path[i] === SUB_PATH_START) {
					find = true;
					subPath = '';
				} else {
					if (path[i] === SUB_PATH_END && find) {
						if (find) {
							return subPath;
						}
					} else {
						subPath += path[i];
					}
				}
			}
			return find ? subPath : null;
		}
	}, {
		key: 'replaceSubPath',
		value: function replaceSubPath(path, sub, parsed) {
			var subf = SUB_PATH_START + sub + SUB_PATH_END;
			while (path.indexOf(subf) > -1) {
				path = path.replace(subf, parsed);
			}
			return path;
		}
	}, {
		key: 'parseSubs',
		value: function parseSubs(path, item, helpers) {
			var subPath = void 0,
			    subPathParsed = void 0,
			    i = 0;
			while (subPath = this.findNextSubPath(path)) {
				subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath, item, helpers);
				path = this.replaceSubPath(path, subPath, subPathParsed);
				i++;
				if (i > MAX_DEEP) {
					break;
				}
			}
			return path;
		}
	}, {
		key: 'get',
		value: function get$$1(path, item, helpers) {
			switch (path) {
				case PATH_START_OBJECT:
					return item;
				case PATH_START_HELPERS:
					return helpers;
			}
			path = this.parseSubs(path, item, helpers);
			return this.getValueByPath(path.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, path, item, helpers);
		}
	}, {
		key: 'set',
		value: function set$$1(path, item, helpers, attrValue) {
			var subPath = void 0,
			    subPathParsed = void 0,
			    i = 0;
			while (subPath = this.findNextSubPath(path)) {
				subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath, item, helpers);
				path = this.replaceSubPath(path, subPath, subPathParsed);
				if (i > MAX_DEEP) {
					break;
				}
			}
			this.setValueByPath(item, path, attrValue);
			if (item.isRecord && this.normilizePath(path).length > 1) {
				item.trigger('change', item, path, attrValue);
			}
		}
	}, {
		key: 'unset',
		value: function unset(path, item, helpers) {
			this.set(path, item, helpers, null);
		}
	}, {
		key: 'parsePathStep',
		value: function parsePathStep(step, item, helper) {
			var rStep = null;
			if (step.indexOf(PATH_START_HELPERS) === 0 && helper) {
				rStep = step.replace(PATH_START_HELPERS, '');
				if (rStep.indexOf(FUNCTION_MARKER) === rStep.length - 2) {
					rStep = step.replace(FUNCTION_MARKER, '');
					if (helper.hasOwnProperty(rStep)) {
						return helper[rStep](item, undefined);
					}
				} else {
					return helper[rStep];
				}
			} else {
				if (step.indexOf(PATH_START_OBJECT) === 0 && item) {
					rStep = step.replace(PATH_START_OBJECT, '');
					if (rStep.indexOf(FUNCTION_MARKER) === rStep.length - 2) {
						rStep = step.replace(FUNCTION_MARKER, '');
						if (item.hasOwnProperty(rStep)) {
							return item[rStep](item, undefined);
						}
					} else {
						return item[rStep];
					}
				}
			}
			return step;
		}

		//::fieldName.result
		//{}
		//{fieldName: 'targetRecordField'}
		////['targetRecordField', 'result']

	}, {
		key: 'parsePath',
		value: function parsePath(path, item, helper) {
			if (!Array.isArray(path)) {
				path = path.split(PATH_SPLIT);
			}
			for (var i = 0; i < path.length; i++) {
				path[i] = this.parsePathStep(path[i], item, helper);
			}
			return path;
		}
	}, {
		key: 'normilizePath',
		value: function normilizePath(path) {
			if (Array.isArray(path)) {
				return path;
			} else {
				while (path.indexOf(PATH_START_OBJECT) > -1) {
					path = path.replace(PATH_START_OBJECT, '');
				}
				return path.split(PATH_SPLIT);
			}
		}

		/*
  	small = ["todo"],
  	big = ["todo", "length"]
  	return true;
  	*/

	}, {
		key: 'ifFullSubPath',
		value: function ifFullSubPath(big, small) {
			if (big.length < small.length) {
				return false;
			}
			for (var t = 0; t < small.length; t++) {
				if (small[t] !== big[t]) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: 'getValueByPath',
		value: function getValueByPath(object, attrPath, item, helpers) {
			attrPath = this.normilizePath(attrPath);
			var attrName = attrPath.shift(),
			    isFunction = attrName.indexOf(FUNCTION_MARKER) > -1;
			if (isFunction) {
				attrName = attrName.replace(FUNCTION_MARKER, '');
			}
			if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object[attrName] !== 'undefined' && object[attrName] !== null) {
				var newObj = isFunction ? object[attrName]({ item: item, helpers: helpers }) : object[attrName];
				if (attrPath.length > 0) {
					return this.getValueByPath(newObj, attrPath, item, helpers);
				} else {
					return newObj;
				}
			} else {
				return undefined;
			}
		}
	}, {
		key: 'setValueByPath',
		value: function setValueByPath(object, attrPath, attrValue) {
			attrPath = this.normilizePath(attrPath);
			var attrName = attrPath.shift();
			if (attrPath.length > 0) {
				if (!object.hasOwnProperty(attrName)) {
					object[attrName] = {};
				}
				this.setValueByPath(object[attrName], attrPath, attrValue);
			} else {
				object[attrName] = attrValue;
			}
		}
	}, {
		key: 'join',
		value: function join() {
			var args = Array.prototype.slice.call(arguments);
			return args.join(PATH_SPLIT);
		}
	}]);
	return notPath;
}();

var notPath$1 = new notPath();

var META_METHOD_INIT = Symbol('init');
var META_EVENTS = Symbol('events');
var META_DATA = Symbol('data');
var META_WORKING = Symbol('working');
var META_OPTIONS = Symbol('options');

var notBase = function () {
	function notBase(input) {
		classCallCheck(this, notBase);

		this[META_EVENTS] = {};
		this[META_DATA] = {};
		this[META_WORKING] = {};
		this[META_OPTIONS] = {};
		this[META_METHOD_INIT](input);
		return this;
	}

	createClass(notBase, [{
		key: META_METHOD_INIT,
		value: function value(input) {
			if (!input) {
				input = {};
			}
			if (input.hasOwnProperty('events')) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = input.events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var t = _step.value;

						this.on.apply(this, toConsumableArray(t));
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}

			if (input.hasOwnProperty('data')) {
				this.setData(input.data);
			}

			if (input.hasOwnProperty('working')) {
				this.setWorking(input.working);
			}

			if (input.hasOwnProperty('options')) {
				this.setOptions(input.options);
			}
		}
	}, {
		key: 'setCommon',
		value: function setCommon(what, args) {
			switch (args.length) {
				case 1:
					{
						/* set collection */
						what = args[0];
						break;
					}
				case 2:
					{
						/* set collection element */
						notPath$1.set(args[0] /* path */, what /* collection */, undefined /* helpers */, args[1] /* value */);
						break;
					}
			}
			return this;
		}
	}, {
		key: 'getCommon',
		value: function getCommon(what, args) {
			switch (args.length) {
				/* if we want get data by path */
				case 1:
					{
						return notPath$1.get(args[0], what);
					}
				/* if we want get data by path with default value */
				case 2:
					{
						var res = notPath$1.get(args[0], what);
						if (res === undefined) {
							/* no data, return default value */
							return args[1];
						} else {
							/* data, return it */
							return res;
						}
					}
				/* return full collection */
				default:
					{
						return what;
					}
			}
		}

		/*
  	CORE OBJECT
  		DATA - information
  		OPTIONS - how to work
  		WORKING - temporarily generated in proccess
  */

	}, {
		key: 'setData',
		value: function setData() {
			if (arguments.length === 1) {
				this[META_DATA] = arguments[0];
			} else {
				this.setCommon(this.getData(), arguments);
			}
			this.trigger('change');
			return this;
		}
	}, {
		key: 'getData',
		value: function getData() {
			return this.getCommon(this[META_DATA], arguments);
		}
	}, {
		key: 'setOptions',
		value: function setOptions() {
			if (arguments.length === 1) {
				this[META_OPTIONS] = arguments[0];
			} else {
				this.setCommon(this.getOptions(), arguments);
			}
			return this;
		}
	}, {
		key: 'getOptions',
		value: function getOptions() {
			return this.getCommon(this[META_OPTIONS], arguments);
		}
	}, {
		key: 'setWorking',
		value: function setWorking() {
			if (arguments.length === 1) {
				this[META_WORKING] = arguments[0];
			} else {
				this.setCommon(this.getWorking(), arguments);
			}
			return this;
		}
	}, {
		key: 'getWorking',
		value: function getWorking() {
			return this.getCommon(this[META_WORKING], arguments);
		}

		/*
  	EVENTS handling
  */

	}, {
		key: 'on',
		value: function on(eventNames, eventCallbacks, once) {
			var _this = this;

			if (!Array.isArray(eventNames)) {
				eventNames = [eventNames];
			}
			if (!Array.isArray(eventCallbacks)) {
				eventCallbacks = [eventCallbacks];
			}
			eventNames.forEach(function (name) {
				notCommon.defineIfNotExists(_this[META_EVENTS], name, []);
				_this[META_EVENTS][name].push({
					callbacks: eventCallbacks,
					once: once,
					count: 0
				});
			});
			return this;
		}
	}, {
		key: 'trigger',
		value: function trigger() {
			var args = Array.from(arguments),
			    eventName = args.shift();
			if (!Array.isArray(eventName)) {
				eventName = [eventName];
			}
			for (var g = 0; g < eventName.length; g++) {
				var name = eventName[g];
				if (this[META_EVENTS].hasOwnProperty(name)) {
					for (var t = 0; t < this[META_EVENTS][name].length; t++) {
						var event = this[META_EVENTS][name][t];
						if (event.once) {
							this.off(name, event.callbacks);
						}
						for (var h = 0; h < event.callbacks.length; h++) {
							var _event$callbacks;

							(_event$callbacks = event.callbacks)[h].apply(_event$callbacks, toConsumableArray(args));
						}
					}
				}
			}
			return this;
		}
	}, {
		key: 'off',
		value: function off(eventNames /* array of event names */, eventCallbacks /* array of callbacks */) {
			if (!Array.isArray(eventNames)) {
				eventNames = [eventNames];
			}
			if (!Array.isArray(eventCallbacks)) {
				eventCallbacks = [eventCallbacks];
			}
			for (var g = 0; g < eventNames.length; g++) {
				var name = eventNames[g];
				var targetId = -1;
				for (var h = 0; h < this[META_EVENTS][name].length; h++) {
					var event = this[META_EVENTS][name][h];
					if (targetId === -1 && eventCallbacks === event.callbacks) {
						targetId = h;
						break;
					}
				}
				if (targetId > -1) {
					this[META_EVENTS][name].splice(targetId, 1);
				}
			}
			return this;
		}
	}, {
		key: 'offAll',
		value: function offAll() {
			var events = Object.keys(this[META_EVENTS]);
			for (var t = 0; t < events.length; t++) {
				if (this[META_EVENTS].hasOwnProperty(events[t])) {
					delete this[META_EVENTS][events[t]];
				}
			}
		}
	}, {
		key: 'log',
		value: function log() {
			if (!notCommon.get('production') && notCommon.log) {
				notCommon.log.apply(notCommon, [this.getWorking('name')].concat(Array.prototype.slice.call(arguments)));
			}
		}
	}, {
		key: 'info',
		value: function info() {
			if (!notCommon.get('production') && notCommon.info) {
				notCommon.info.apply(notCommon, [this.getWorking('name')].concat(Array.prototype.slice.call(arguments)));
			}
		}
	}, {
		key: 'error',
		value: function error() {
			if (!notCommon.get('production') && notCommon.error) {
				notCommon.error.apply(notCommon, [this.getWorking('name')].concat(Array.prototype.slice.call(arguments)));
			}
		}
	}, {
		key: 'report',
		value: function report() {
			if (notCommon.report) {
				notCommon.report.apply(notCommon, [this.getWorking('name')].concat(Array.prototype.slice.call(arguments)));
			}
		}
	}]);
	return notBase;
}();

var OPT_MODE_HISTORY = Symbol('history');
var OPT_MODE_HASH = Symbol('hash');
var OPT_DEFAULT_CHECK_INTERVAL = 50;

var notRouter = function (_notBase) {
	inherits(notRouter, _notBase);

	function notRouter() {
		var _ret;

		classCallCheck(this, notRouter);

		var _this = possibleConstructorReturn(this, (notRouter.__proto__ || Object.getPrototypeOf(notRouter)).call(this));

		_this.setWorking({
			routes: [],
			mode: OPT_MODE_HISTORY,
			root: '/', //always in slashes /user/, /, /input/. and no /user or input/level
			initialized: false
		});
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notRouter, [{
		key: 'history',
		value: function history() {
			this.setWorking('mode', OPT_MODE_HISTORY);
		}
	}, {
		key: 'hash',
		value: function hash() {
			this.setWorking('mode', OPT_MODE_HASH);
		}
	}, {
		key: 'setRoot',
		value: function setRoot(root) {
			this.setWorking('root', root ? '/' + this.clearSlashes(root) + '/' : '/');
			return this;
		}
	}, {
		key: 'clearSlashes',
		value: function clearSlashes(path) {
			//first and last slashes removal
			return path.toString().replace(/\/$/, '').replace(/^\//, '');
		}
	}, {
		key: 'add',
		value: function add(re, handler) {
			if (typeof re == 'function') {
				handler = re;
				re = '';
			}
			var rule = {
				re: re,
				handler: handler
			};
			this.getWorking('routes').push(rule);
			return this;
		}
	}, {
		key: 'addList',
		value: function addList(list) {
			for (var t in list) {
				this.add(t, list[t]);
			}
			return this;
		}
	}, {
		key: 'remove',
		value: function remove(param) {
			for (var i = 0, r; i < this.getWorking('routes').length, r = this.getWorking('routes')[i]; i++) {
				if (r.handler === param || r.re === param) {
					this.getWorking('routes').splice(i, 1);
					return this;
				}
			}
			return this;
		}
	}, {
		key: 'flush',
		value: function flush() {
			this.setWorking({
				routes: [],
				mode: OPT_MODE_HISTORY,
				root: '/'
			});
			return this;
		}
	}, {
		key: 'isInitialized',
		value: function isInitialized() {
			return this.getWorking('initialized');
		}
	}, {
		key: 'setInitialized',
		value: function setInitialized() {
			var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			return this.setWorking('initialized', val);
		}
	}, {
		key: 'getFragment',
		value: function getFragment() {
			var fragment = '';
			if (this.getWorking('mode') === OPT_MODE_HISTORY) {
				if (!location) return '';
				fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
				fragment = fragment.replace(/\?(.*)$/, '');
				fragment = this.getWorking('root') != '/' ? fragment.replace(this.getWorking('root'), '') : fragment;
			} else {
				if (!window) return '';
				var match = window.location.href.match(/#(.*)$/);
				fragment = match ? match[1] : '';
			}
			return this.clearSlashes(fragment);
		}
	}, {
		key: 'checkLocation',
		value: function checkLocation() {
			var current = this.getWorking('current'),
			    fragment = this.getFragment(),
			    init = this.isInitialized();
			if (current !== fragment || !init) {
				this.setWorking('current', fragment);
				this.check(fragment);
				this.setInitialized();
			}
		}
	}, {
		key: 'hrefClick',
		value: function hrefClick() {
			//console.log(...arguments);
		}
	}, {
		key: 'getRoot',
		value: function getRoot() {
			return '';
		}
	}, {
		key: 'listen',
		value: function listen() {
			var loopInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : OPT_DEFAULT_CHECK_INTERVAL;

			this.setWorking('current', 'notInitialized');
			clearInterval(this.getWorking('interval'));
			this.setWorking('interval', setInterval(this.checkLocation.bind(this), loopInterval));
			window.addEventListener('popstate', this.hrefClick.bind(this));
			return this;
		}
	}, {
		key: 'check',
		value: function check(f) {
			var fragment = f || this.getFragment();
			for (var i = 0; i < this.getWorking('routes').length; i++) {
				var path = this.getWorking('root') + this.getWorking('routes')[i].re;
				var fullRE = this.clearSlashes(decodeURI(path));
				var match = fragment.match(fullRE);
				if (match) {
					match.shift();
					this.getWorking('routes')[i].handler.apply(this.host || {}, match);
					return this;
				}
			}
			return this;
		}
	}, {
		key: 'navigate',
		value: function navigate(path) {
			path = path ? path : '';
			switch (this.getWorking('mode')) {
				case OPT_MODE_HISTORY:
					{
						//console.log('push state', this.getFullRoute(path));
						history.pushState(null, null, this.getFullRoute(path));
						break;
					}
				case OPT_MODE_HASH:
					{
						window.location.href.match(/#(.*)$/);
						window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
						break;
					}
			}
			return this;
		}
	}, {
		key: 'getFullRoute',
		value: function getFullRoute() {
			var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			return this.getWorking('root') + this.clearSlashes(path);
		}
	}, {
		key: 'getAllLinks',
		value: function getAllLinks() {
			var allElements = document.body.querySelectorAll('a');
			var list = [];
			for (var j = 0; j < allElements.length; j++) {
				for (var i = 0, atts = allElements[j].attributes, n = atts.length; i < n; i++) {
					if (atts[i].nodeName.indexOf('n-href') === 0) {
						list.push(allElements[j]);
						break;
					}
				}
			}
			return list;
		}
	}, {
		key: 'reRouteExisted',
		value: function reRouteExisted() {
			var list = this.getAllLinks();
			for (var t = 0; t < list.length; t++) {
				this.initRerouting(list[t], list[t].getAttribute('n-href'));
			}
			return this;
		}
	}, {
		key: 'initRerouting',
		value: function initRerouting(el, link) {
			var _this2 = this;

			if (!el.notRouterInitialized) {
				var fullLink = this.getFullRoute(link);
				el.setAttribute('href', fullLink);
				el.addEventListener('click', function (e) {
					e.preventDefault();
					_this2.navigate(link);
					return false;
				});
				el.notRouterInitialized = true;
			}
			return this;
		}
	}]);
	return notRouter;
}(notBase);

var notRouter$1 = new notRouter();

var notAPIOptions = {
	rps: 50,
	protocol: 'http',
	host: 'localhost',
	port: 9000
};

var notAPIQuee = function () {
	function notAPIQuee(requestsPerSecond) {
		classCallCheck(this, notAPIQuee);

		this.quee = [];
		this.int = null;
		this.requestsPerSecond = requestsPerSecond || 5;
		return this;
	}

	createClass(notAPIQuee, [{
		key: "run",
		value: function run() {
			this.int = window.setInterval(this.check.bind(this), 1000 / this.requestsPerSecond);
		}
	}, {
		key: "check",
		value: function check() {
			if (this.inProgress) {
				return;
			} else {
				if (this.quee.length > 0) {
					this.inProgress = true;
					var toCall = this.quee.shift();
					toCall();
				}
			}
		}
	}, {
		key: "next",
		value: function next() {
			this.inProgress = false;
		}
	}, {
		key: "add",
		value: function add(call) {
			this.quee.push(call);
		}
	}, {
		key: "pause",
		value: function pause() {
			window.clearInterval(this.int);
		}
	}, {
		key: "resume",
		value: function resume() {
			this.run();
		}
	}]);
	return notAPIQuee;
}();

var notAPI$1 = function (_notBase) {
	inherits(notAPI, _notBase);

	function notAPI(options) {
		var _ret;

		classCallCheck(this, notAPI);

		var _this = possibleConstructorReturn(this, (notAPI.__proto__ || Object.getPrototypeOf(notAPI)).call(this));

		_this.setOptions(notCommon.extend(notAPIOptions, options));
		_this.quee = new notAPIQuee(_this.getOptions('rps'));
		_this.quee.run();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notAPI, [{
		key: 'makeUrl',
		value: function makeUrl(parts) {
			return parts.join('/');
		}
	}, {
		key: 'queeRequest',
		value: function queeRequest(method, url, id, data, good, bad) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				_this2.quee.add(_this2.makeRequest.bind(_this2, method, url, id, data, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'makeRequest',
		value: function makeRequest(method, url, id, data, good, bad) {
			var _this3 = this;

			notCommon.requestJSON(method, url, data).then(function (response) {
				_this3.quee.next();
				good && good(response);
			}).catch(function (response) {
				_this3.quee.next();
				bad && bad(response);
			});
		}
	}, {
		key: 'update',
		value: function update(obj, good, bad) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var id = obj.getId(),
				    modelName = obj.getModelName(),
				    url = _this4.makeUrl([_this4.getOptions('base'), modelName, id]),
				    data = obj.getJSON();
				_this4.quee.add(_this4.makeRequest.bind(_this4, 'post', url, id, data, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'put',
		value: function put(obj, good, bad) {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				var modelName = obj.getModelName(),
				    data = obj.getJSON(),
				    url = _this5.makeUrl([_this5.getOptions('base'), modelName]);
				_this5.quee.add(_this5.makeRequest.bind(_this5, 'put', url, null, data, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'get',
		value: function get$$1(obj, good, bad) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				var id = obj.getId(),
				    modelName = obj.getModelName(),
				    url = _this6.makeUrl([_this6.getOptions('base'), modelName, id]);
				_this6.quee.add(_this6.makeRequest.bind(_this6, 'get', url, id, null, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'list',
		value: function list(obj, good, bad) {
			var _this7 = this;

			return new Promise(function (resolve, reject) {
				var modelName = obj.getModelName(),
				    url = _this7.makeUrl([_this7.getOptions('base'), modelName]);
				_this7.quee.add(_this7.makeRequest.bind(_this7, 'get', url, null, null, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'delete',
		value: function _delete(obj, good, bad) {
			var _this8 = this;

			return new Promise(function (resolve, reject) {
				var id = obj.getId(),
				    modelName = obj.getModelName(),
				    url = _this8.makeUrl([_this8.getOptions('base'), modelName, id]);
				_this8.quee.add(_this8.makeRequest.bind(_this8, 'delete', url, id, null, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}]);
	return notAPI;
}(notBase);

var notImage = function (_notBase) {
	inherits(notImage, _notBase);

	function notImage() {
		classCallCheck(this, notImage);
		return possibleConstructorReturn(this, (notImage.__proto__ || Object.getPrototypeOf(notImage)).call(this));
	}

	return notImage;
}(notBase);

var PROCESSOR_EXPRESSION_PREFIX = 'n-';
var TEMPLATE_TAG = 'nt';
var PROCESSOR_EXPRESSION_SEPARATOR = '-';
var PROCESSOR_EXPRESSION_CONDITION_POSTFIX = 'if';
var COMPONENT_ID_PREFIX = 'not_component_';
var PART_ID_PREFIX = 'not_part_';
var DEFAULT_PLACER = 'place';
var DEFAULT_PLACER_LOOP = 'placeAfter';

var OPTS = {
	PROCESSOR_EXPRESSION_PREFIX: PROCESSOR_EXPRESSION_PREFIX,
	TEMPLATE_TAG: TEMPLATE_TAG,
	PROCESSOR_EXPRESSION_SEPARATOR: PROCESSOR_EXPRESSION_SEPARATOR,
	PROCESSOR_EXPRESSION_CONDITION_POSTFIX: PROCESSOR_EXPRESSION_CONDITION_POSTFIX,
	DEFAULT_PLACER: DEFAULT_PLACER,
	COMPONENT_ID_PREFIX: COMPONENT_ID_PREFIX,
	PART_ID_PREFIX: PART_ID_PREFIX,
	DEFAULT_PLACER_LOOP: DEFAULT_PLACER_LOOP
};

var META_CACHE = Symbol('cache');

var notTemplateCache = function (_notBase) {
	inherits(notTemplateCache, _notBase);

	function notTemplateCache() {
		var _ret;

		classCallCheck(this, notTemplateCache);

		var _this = possibleConstructorReturn(this, (notTemplateCache.__proto__ || Object.getPrototypeOf(notTemplateCache)).call(this));

		_this[META_CACHE] = {};
		_this.setWorking('loading', []);
		_this.hideTemplates();
		_this.register();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notTemplateCache, [{
		key: 'hideTemplates',
		value: function hideTemplates() {
			var t = document.createElement('style');
			t.innerHTML = OPTS.TEMPLATE_TAG + '{display: none;}';
			document.head.appendChild(t);
		}
	}, {
		key: 'register',
		value: function register() {
			notCommon.register('templateCache', this);
		}
	}, {
		key: 'load',
		value: function load(map) {
			this.setWorking('loading', []);
			for (var i in map) {
				this.loadOne(i, map[i]);
			}
		}
	}, {
		key: 'loadOne',
		value: function loadOne(key, url, callback) {
			var oRequest = new XMLHttpRequest();
			oRequest.open('GET', url);
			oRequest.addEventListener('load', function (response) {
				var div = document.createElement('DIV');
				div.dataset.notTemplateName = key;
				div.dataset.notTemplateURL = url;
				div.innerHTML = response.srcElement.responseText;
				this.setOne(key, div);
				callback && callback(key, url, div);
			}.bind(this));
			oRequest.send();
		}
	}, {
		key: 'ifAllLoaded',
		value: function ifAllLoaded() {
			if (this.getWorking('loading').length === 0) {
				this.trigger('loaded');
			}
		}
	}, {
		key: 'setOne',
		value: function setOne(key, element) {
			if (element instanceof HTMLElement) {
				this[META_CACHE][key] = element;
			} else {
				this.addFromText(key, element);
			}
		}
	}, {
		key: 'get',
		value: function get$$1(key) {
			return this[META_CACHE].hasOwnProperty(key) ? this[META_CACHE][key].cloneNode(true) : null;
		}
	}, {
		key: 'getNames',
		value: function getNames() {
			return Object.keys(this[META_CACHE]);
		}
	}, {
		key: 'getByURL',
		value: function getByURL(url) {
			for (var i in this[META_CACHE]) {
				if (this[META_CACHE][i].src == url) {
					return this.get(i);
				}
			}
			return null;
		}
		/*----------------------------------------------------------------------------*/
		//	New API
		/*----------------------------------------------------------------------------*/

	}, {
		key: 'setLoaded',
		value: function setLoaded(key) {
			var t = this.getWorking('loading').indexOf(key);
			if (t > -1) {
				this.getWorking('loading').splice(t, 1);
			}
			this.getWorking('loaded').push('key');
		}
	}, {
		key: 'wrap',
		value: function wrap(key, url, innerHTML) {
			var cont = document.createElement(OPTS.TEMPLATE_TAG);
			cont.name = key;
			cont.src = url;
			cont.innerHTML = innerHTML;
			return cont;
		}
	}, {
		key: 'parseLib',
		value: function parseLib(text) {
			var cont = document.createElement('div');
			var result = {};
			cont.innerHTML = text;
			var notTemplatesElements = cont.querySelectorAll(OPTS.TEMPLATE_TAG);
			for (var elId = 0; elId < notTemplatesElements.length; elId++) {
				var el = notTemplatesElements[elId];
				if (el.parentNode === cont) {
					if (el.attributes.name && el.attributes.name.value) {
						result[el.attributes.name.value] = el;
					}
				}
			}
			return result;
		}
	}, {
		key: 'addLib',
		value: function addLib(lib) {
			for (var t in lib) {
				this.setOne(t, lib[t]);
			}
			return this;
		}
	}, {
		key: 'addFromURL',
		value: function addFromURL(key, url) {
			var _this2 = this,
			    _arguments = arguments;

			return new Promise(function (resolve, reject) {
				if (_this2.get(key)) {
					resolve(_this2.get(key));
				} else {
					//that.setLoading(key, url);
					notCommon.getHTML(url).then(function (templateInnerHTML) {
						var templateContEl = _this2.wrap(key, url, templateInnerHTML);
						_this2.setOne(key, templateContEl);
						resolve(_this2.get(key));
					}).catch(function () {
						notCommon.error('error loading template', key, url);
						reject.apply(undefined, _arguments);
					});
				}
			});
		}
	}, {
		key: 'addLibFromURL',
		value: function addLibFromURL(url) {
			var _this3 = this,
			    _arguments2 = arguments;

			return new Promise(function (resolve, reject) {
				notCommon.getHTML(url).then(function (templatesHTML) {
					var templates = _this3.parseLib(templatesHTML);
					_this3.addLib(templates);
					resolve(templates);
				}).catch(function (e) {
					notCommon.error('error loading templates lib', url, e);
					reject.apply(undefined, _arguments2);
				});
			});
		}
	}, {
		key: 'addFromDocument',
		value: function addFromDocument(selectorOrElement) {
			var el = typeof selectorOrElement === 'string' ? document.querySelector(selectorOrElement) : selectorOrElement;
			if (el.attributes.name && el.attributes.name.value) {
				if (el.tagName.toLowerCase() === OPTS.TEMPLATE_TAG.toLowerCase()) {
					this.setOne(el.attributes.name.value, el);
				}
			}
			return this;
		}
	}, {
		key: 'addFromText',
		value: function addFromText(key, templateInnerHTML) {
			var templateContEl = this.wrap(key, '', templateInnerHTML);
			this.setOne(key, templateContEl);
			return this;
		}
	}]);
	return notTemplateCache;
}(notBase);

var notTemplateCache$1 = new notTemplateCache();

var OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY = ['_id', 'id', 'ID'];
var DEFAULT_FILTER = {};
var DEFAULT_PAGE_NUMBER = 1;
var DEFAULT_PAGE_SIZE = 10;

var notInterface = function (_notBase) {
	inherits(notInterface, _notBase);

	function notInterface(manifest) {
		var _ret;

		classCallCheck(this, notInterface);

		var _this = possibleConstructorReturn(this, (notInterface.__proto__ || Object.getPrototypeOf(notInterface)).call(this, {}));

		_this.manifest = manifest;
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notInterface, [{
		key: 'parseLine',
		value: function parseLine(line, record, actionName) {
			var recordRE = ':record[',
			    fieldName = '';
			while (line.indexOf(recordRE) > -1) {
				var ind = line.indexOf(recordRE);
				var len = recordRE.length;
				var ind2 = line.indexOf(']');
				var startSlice = ind + len;
				var endSlice = ind2;
				fieldName = line.slice(startSlice, endSlice);
				if (fieldName == '') break;
				line = line.replace(':record[' + fieldName + ']', record.getAttr(fieldName));
			}
			line = line.replace(':modelName', this.manifest.model);
			line = line.replace(':actionName', actionName);
			return line;
		}
	}, {
		key: 'getURL',
		value: function getURL(record, actionData, actionName) {
			var line = this.parseLine(this.manifest.url, record, actionName) + (actionData.hasOwnProperty('postFix') ? this.parseLine(actionData.postFix, record, actionName) : '');
			return line;
		}
	}, {
		key: 'getID',
		value: function getID(record, actionData) {
			var resultId = void 0,
			    list = OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY,
			    prefixes = ['', this.manifest.model];
			if (actionData.hasOwnProperty('index') && actionData.index) {
				list = [actionData.index].concat(OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY);
			}
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = prefixes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var pre = _step.value;
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var t = _step2.value;

							if (record.hasOwnProperty(pre + t)) {
								resultId = record[pre + t];
								break;
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return resultId;
		}
	}, {
		key: 'getActionsCount',
		value: function getActionsCount() {
			return this.getActions() ? Object.keys(this.getActions()).length : 0;
		}
	}, {
		key: 'getActions',
		value: function getActions() {
			return this.manifest && this.manifest.actions ? this.manifest.actions : {};
		}
	}, {
		key: 'setFindBy',
		value: function setFindBy(key, value) {
			var obj = {};
			obj[key] = value;
			return this.setFilter(obj);
		}
	}, {
		key: 'setFilter',
		value: function setFilter() {
			var filterData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_FILTER;

			return this.setWorking('filter', filterData);
		}
	}, {
		key: 'resetFilter',
		value: function resetFilter() {
			return this.setFilter({});
		}
	}, {
		key: 'getFilter',
		value: function getFilter() {
			return this.getWorking('filter');
		}
	}, {
		key: 'setSorter',
		value: function setSorter(sorterData) {
			return this.setWorking('sorter', sorterData);
		}
	}, {
		key: 'getSorter',
		value: function getSorter() {
			return this.getWorking('sorter');
		}
	}, {
		key: 'setPageNumber',
		value: function setPageNumber(pageNumber) {
			return this.setWorking('pageNumber', pageNumber);
		}
	}, {
		key: 'setPageSize',
		value: function setPageSize(pageSize) {
			return this.setWorking('pageSize', pageSize);
		}
	}, {
		key: 'setPager',
		value: function setPager() {
			var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_PAGE_SIZE;
			var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PAGE_NUMBER;

			return this.setWorking('pageSize', pageSize).setWorking('pageNumber', pageNumber);
		}
	}, {
		key: 'resetPager',
		value: function resetPager() {
			return this.setPager();
		}
	}, {
		key: 'getPager',
		value: function getPager() {
			return {
				pageSize: this.getWorking('pageSize'),
				pageNumber: this.getWorking('pageNumber')
			};
		}
	}, {
		key: 'getModelName',
		value: function getModelName() {
			return this && this.manifest ? this.manifest.model : null;
		}
	}, {
		key: 'getActionData',
		value: function getActionData(actionName) {
			return this.getActions() && this.getActions()[actionName] ? this.getActions()[actionName] : null;
		}
	}, {
		key: 'collectRequestData',
		value: function collectRequestData(actionData) {
			var requestData = {};
			if (actionData.hasOwnProperty('data') && Array.isArray(actionData.data)) {
				for (var i = 0; i < actionData.data.length; i++) {
					var dataProviderName = 'get' + notCommon.capitalizeFirstLetter(actionData.data[i]);
					if (this[dataProviderName] && typeof this[dataProviderName] === 'function') {
						requestData = notCommon.extend(requestData, this[dataProviderName]());
					}
				}
			}
			return requestData;
		}
	}, {
		key: 'encodeRequest',
		value: function encodeRequest(data) {
			var p = '?';
			for (var t in data) {
				p += encodeURIComponent(t) + '=' + encodeURIComponent(data[t]) + '&';
			}
			return p;
		}

		//return Promise

	}, {
		key: 'request',
		value: function request(record, actionName) {
			var _this2 = this;

			var actionData = this.getActionData(actionName),
			    requestParams = this.collectRequestData(actionData),
			    requestParamsEncoded = this.encodeRequest(requestParams),
			    id = this.getID(record, actionData, actionName),
			    url = this.getURL(record, actionData, actionName);
			return notCommon.getAPI().queeRequest(actionData.method, url + requestParamsEncoded, id, JSON.stringify(record.getData())).then(function (data) {
				return _this2.afterSuccessRequest(data, actionData);
			});
		}
	}, {
		key: 'afterSuccessRequest',
		value: function afterSuccessRequest(data, actionData) {
			if (this && actionData && actionData.hasOwnProperty('isArray') && actionData.isArray) {
				for (var t = 0; t < data.length; t++) {
					data[t] = new notRecord(this.manifest, data[t]);
				}
			} else {
				data = new notRecord(this.manifest, data);
			}
			return data;
		}
	}]);
	return notInterface;
}(notBase);

var META_INTERFACE = Symbol('interface');
var META_PROXY = Symbol('proxy');
var META_CHANGE = Symbol('change');
var META_CHANGE_NESTED = Symbol('change.nested');
var META_SAL = ['getAttr', 'getAttrs', 'isProperty', 'isRecord', 'getManifest', 'setAttr', 'setAttrs', 'getData', 'setData', 'getJSON', 'on', 'off', 'trigger'];
var META_MAP_TO_INTERFACE = ['getActionsCount', 'getActions', 'setFindBy', 'resetFilter', 'setFilter', 'getFilter', 'setSorter', 'getSorter', 'resetSorter', 'setPageNumber', 'setPageSize', 'setPager', 'resetPager', 'getPager'];
var DEFAULT_ACTION_PREFIX = '$';
var META_RETURN_TO_ROOT = Symbol('returnToRoot');

var createPropertyHandlers = function createPropertyHandlers(owner) {
	return {
		get: function (target, key, context) {
			//notCommon.log(`proxy get "${key}"`, this, target, context);
			if (key === 'isProxy') {
				return true;
			}
			var resTarget = target;
			if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'symbol') {
				if (this[key]) {
					resTarget = this;
				}
			} else {
				if (Object.keys(this).indexOf(key) > -1 || META_SAL.indexOf(key) > -1) {
					resTarget = this;
				}
			}
			return Reflect.get(resTarget, key, context);
		}.bind(owner),
		set: function (target, key, value /*, proxy*/) {
			//notCommon.log(`proxy set "${key}"`, typeof target[key]);

			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error('Invalid attempt to private "' + key + '" property');
			} else {
				var valueToReflect = value;
				if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
					valueToReflect = new notProperty(this.getOptions('getRoot'), notPath$1.join(this.getOptions('path'), key), value);
				}
				var t = Reflect.set(target, key, valueToReflect);
				this.trigger('change', target, key, valueToReflect);
				return t;
			}
		}.bind(owner)
	};
};

var notProperty = function (_notBase) {
	inherits(notProperty, _notBase);

	function notProperty(getRoot, pathTo, item) {
		var _ret3;

		classCallCheck(this, notProperty);

		var _this = possibleConstructorReturn(this, (notProperty.__proto__ || Object.getPrototypeOf(notProperty)).call(this));

		if (typeof item === 'undefined' || item === null) {
			var _ret;

			return _ret = item, possibleConstructorReturn(_this, _ret);
		}
		if (item && (item.isProxy || item.isProperty)) {
			var _ret2;

			return _ret2 = item, possibleConstructorReturn(_this, _ret2);
		}
		_this.setOptions({
			getRoot: getRoot,
			path: pathTo
		});
		_this[META_PROXY] = new Proxy(item, createPropertyHandlers(_this));
		_this.setData(item);
		_this.isProperty = true;
		_this.on('change', _this[META_RETURN_TO_ROOT].bind(_this));
		return _ret3 = _this[META_PROXY], possibleConstructorReturn(_this, _ret3);
	}

	createClass(notProperty, [{
		key: META_RETURN_TO_ROOT,
		value: function value(proxy, key, _value) {
			var root = this.getOptions('getRoot')();
			root.trigger('change.nested', this[META_PROXY], this.getOptions('path'), key, _value);
		}
	}]);
	return notProperty;
}(notBase);

var createRecordHandlers = function createRecordHandlers(owner) {
	return {
		get: function (target, key, context) {
			//notCommon.log(`proxy get "${key}"`, this, target, context);
			if (key === 'isProxy' || key === 'isRecord') {
				return true;
			}
			var resTarget = target;
			if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'symbol') {
				if (this[key]) {
					resTarget = this;
				}
			} else {
				if (Object.keys(this).indexOf(key) > -1 || META_SAL.indexOf(key) > -1 || META_MAP_TO_INTERFACE.indexOf(key) > -1) {
					resTarget = this;
				}
			}
			return Reflect.get(resTarget, key, context);
		}.bind(owner),
		set: function (target, key, value /*, proxy*/) {
			//notCommon.log(`record proxy set "${key}"`, this, target);
			//notCommon.trace();
			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error('Invalid attempt to private "' + key + '" property');
			} else {
				var valueToReflect = value;
				if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
					valueToReflect = new notProperty(this.getOptions('getRoot'), notPath$1.join(this.getOptions('path'), key), value);
				}
				var t = Reflect.set(target, key, valueToReflect);
				this.trigger('change', target, key, valueToReflect);
				return t;
			}
		}.bind(owner)
	};
};

var notRecord = function (_notBase2) {
	inherits(notRecord, _notBase2);

	function notRecord(manifest, item) {
		var _ret8;

		classCallCheck(this, notRecord);

		var _this2 = possibleConstructorReturn(this, (notRecord.__proto__ || Object.getPrototypeOf(notRecord)).call(this));

		if (typeof item === 'undefined' || item === null) {
			var _ret4;

			return _ret4 = item, possibleConstructorReturn(_this2, _ret4);
		}
		if (item && item.isProxy) {
			var _ret5;

			notCommon.error('this is Proxy item');
			return _ret5 = item, possibleConstructorReturn(_this2, _ret5);
		}

		if (item && (item.isRecord || item.isProperty)) {
			var _ret6;

			return _ret6 = item, possibleConstructorReturn(_this2, _ret6);
		} else {
			if (Array.isArray(item)) {
				var _ret7;

				return _ret7 = _this2.createCollection(manifest, item), possibleConstructorReturn(_this2, _ret7);
			}
		}
		_this2.setOptions({});
		_this2[META_INTERFACE] = new notInterface(manifest);
		_this2.setData(_this2.initProperties(item));
		_this2.interfaceUp();
		_this2.isRecord = true;
		_this2[META_PROXY] = new Proxy(item, createRecordHandlers(_this2));
		//notCommon.log('proxy record created from ', item);
		_this2.on('change', _this2[META_CHANGE].bind(_this2));
		_this2.on('change.nested', _this2[META_CHANGE_NESTED].bind(_this2));
		return _ret8 = _this2[META_PROXY], possibleConstructorReturn(_this2, _ret8);
	}

	createClass(notRecord, [{
		key: 'initProperties',
		value: function initProperties(item) {
			var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

			if (typeof item !== 'undefined' && item !== null) {
				var keys = Object.keys(item);
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var key = _step.value;

						var curPath = path + (path.length > 0 ? '.' : '') + key;
						//notCommon.log('curPath', curPath);
						if (item.hasOwnProperty(key)) {
							if (_typeof(item[key]) === 'object' && item[key] !== null) {
								this.initProperties(item[key], curPath);
								item[key] = new notProperty(this.getRoot.bind(this), curPath, item[key]);
							} else {
								//notCommon.log(key, 'is own property, but not object');
							}
						} else {
								//notCommon.log(key, 'is not own property');
							}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
			return item;
		}
	}, {
		key: 'getRoot',
		value: function getRoot() {
			return this;
		}
	}, {
		key: 'createCollection',
		value: function createCollection(manifest, items) {
			var collection = [];
			for (var i = 0; i < items.length; i++) {
				collection.push(new notRecord(manifest, items[i]));
			}
			return collection;
		}
	}, {
		key: 'interfaceUp',
		value: function interfaceUp() {
			if (this[META_INTERFACE].getActionsCount() > 0) {
				var actions = this[META_INTERFACE].getActions();
				for (var i in actions) {
					this.actionUp(i, actions[i]);
				}
			}
		}
	}, {
		key: 'actionUp',
		value: function actionUp(index) {
			var _this3 = this;

			if (!this.hasOwnProperty([DEFAULT_ACTION_PREFIX + index])) {
				this[DEFAULT_ACTION_PREFIX + index] = function () {
					return _this3[META_INTERFACE].request(_this3, index);
				};
			}
		}
		/*
  -> 'path.to.key', valueOfKey
  <- ok, with one onChange event triggered
  */

	}, {
		key: 'setAttr',
		value: function setAttr(key, value) {
			return notPath$1.set(key, this[META_PROXY], {}, value);
		}

		/*
  ->
  {
  	'keyPath': value,
  	'key.subPath': value2,
  	'keyPath.0.title': value3
  }
  <- ok, with bunch of onChange events triggered
  */

	}, {
		key: 'setAttrs',
		value: function setAttrs(objectPart) {
			//notCommon.log('setAttrs', objectPart, Object.keys(objectPart));
			if (objectPart && (typeof objectPart === 'undefined' ? 'undefined' : _typeof(objectPart)) === 'object' && Object.keys(objectPart).length > 0) {
				for (var path in objectPart) {
					//notCommon.log('setAttrs one to go', path);
					this.setAttr(path, objectPart[path]);
				}
			}
		}

		/*
  -> 'pathToKey'
  <- value1
  	*/

	}, {
		key: 'getAttr',
		value: function getAttr(what) {
			//notCommon.log('getAttr', what);
			return notPath$1.get(what, this[META_PROXY], {});
		}

		/*
  -> ['pathToKey', 'path.to.key', 'simpleKey',...]
  <- [value1, value2, value3,...]
  */

	}, {
		key: 'getAttrs',
		value: function getAttrs(what) {
			var result = [];
			if (what && what.length > 0) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = what[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var path = _step2.value;

						result.push(this.getAttr(path));
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
			return result;
		}
	}, {
		key: 'getManifest',
		value: function getManifest() {
			if (this[META_INTERFACE]) {
				return this[META_INTERFACE].manifest;
			} else {
				return {};
			}
		}

		/*
  	handler for Proxy callbacks
  */

	}, {
		key: META_CHANGE,
		value: function value() {
			//notCommon.log('try to change', ...arguments);
		}
	}, {
		key: META_CHANGE_NESTED,
		value: function value() {
			//notCommon.log('try to change nested', ...arguments);
			//notCommon.trace();
			this.trigger('change', this[META_PROXY], notPath$1.join(arguments[1], arguments[2]), arguments[3]);
		}
	}, {
		key: 'setItem',
		value: function setItem(item) {
			this.setData(this.initProperties(item));
			this[META_PROXY] = new Proxy(item, createRecordHandlers(this));
			//notCommon.log('proxy created from ', item);
			this.off('change');
			this.off('change.nested');
			this.on('change', this[META_CHANGE].bind(this));
			this.on('change.nested', this[META_CHANGE_NESTED].bind(this));
			//notCommon.trace();
			return this[META_PROXY];
		}
	}, {
		key: 'setFindBy',
		value: function setFindBy() {
			var _META_INTERFACE;

			(_META_INTERFACE = this[META_INTERFACE]).setFindBy.apply(_META_INTERFACE, arguments);
			return this;
		}
	}, {
		key: 'setFilter',
		value: function setFilter() {
			var _META_INTERFACE2;

			(_META_INTERFACE2 = this[META_INTERFACE]).setFilter.apply(_META_INTERFACE2, arguments);
			return this;
		}
	}, {
		key: 'resetFilter',
		value: function resetFilter() {
			var _META_INTERFACE3;

			(_META_INTERFACE3 = this[META_INTERFACE]).resetFilter.apply(_META_INTERFACE3, arguments);
			return this;
		}
	}, {
		key: 'getFilter',
		value: function getFilter() {
			var _META_INTERFACE4;

			return (_META_INTERFACE4 = this[META_INTERFACE]).getFilter.apply(_META_INTERFACE4, arguments);
		}
	}, {
		key: 'setSorter',
		value: function setSorter() {
			var _META_INTERFACE5;

			(_META_INTERFACE5 = this[META_INTERFACE]).setSorter.apply(_META_INTERFACE5, arguments);
			return this;
		}
	}, {
		key: 'getSorter',
		value: function getSorter() {
			var _META_INTERFACE6;

			return (_META_INTERFACE6 = this[META_INTERFACE]).getSorter.apply(_META_INTERFACE6, arguments);
		}
	}, {
		key: 'setPageNumber',
		value: function setPageNumber() {
			var _META_INTERFACE7;

			(_META_INTERFACE7 = this[META_INTERFACE]).setPageNumber.apply(_META_INTERFACE7, arguments);
			return this;
		}
	}, {
		key: 'setPageSize',
		value: function setPageSize() {
			var _META_INTERFACE8;

			(_META_INTERFACE8 = this[META_INTERFACE]).setPageSize.apply(_META_INTERFACE8, arguments);
			return this;
		}
	}, {
		key: 'setPager',
		value: function setPager() {
			var _META_INTERFACE9;

			(_META_INTERFACE9 = this[META_INTERFACE]).setPager.apply(_META_INTERFACE9, arguments);
			return this;
		}
	}, {
		key: 'resetPager',
		value: function resetPager() {
			var _META_INTERFACE10;

			(_META_INTERFACE10 = this[META_INTERFACE]).resetPager.apply(_META_INTERFACE10, arguments);
			return this;
		}
	}, {
		key: 'getPager',
		value: function getPager() {
			var _META_INTERFACE11;

			return (_META_INTERFACE11 = this[META_INTERFACE]).getPager.apply(_META_INTERFACE11, arguments);
		}
	}, {
		key: 'getModelName',
		value: function getModelName() {
			var _META_INTERFACE12;

			return (_META_INTERFACE12 = this[META_INTERFACE]).getModelName.apply(_META_INTERFACE12, arguments);
		}
	}]);
	return notRecord;
}(notBase);

var OPT_CONTROLLER_PREFIX = 'nc';
var OPT_RECORD_PREFIX = 'nr';

var notApp = function (_notBase) {
	inherits(notApp, _notBase);

	function notApp(options) {
		var _ret;

		classCallCheck(this, notApp);

		var _this = possibleConstructorReturn(this, (notApp.__proto__ || Object.getPrototypeOf(notApp)).call(this, { options: options }));

		notCommon.log('start app');
		notCommon.register('app', _this);
		_this.resources = {};
		_this.setWorking({
			interfaces: {},
			controllers: {},
			initController: null,
			currentController: null
		});
		_this.preInitRouter();
		_this.initManager();
		_this.initAPI();
		_this.initTemplates();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notApp, [{
		key: 'initManager',
		value: function initManager() {
			notCommon.setManager({
				setAPI: function setAPI(v) {
					this.api = v;
				},
				getAPI: function getAPI() {
					return this.api;
				}
			});
		}
	}, {
		key: 'initAPI',
		value: function initAPI() {
			notCommon.getManager().setAPI(new notAPI$1(this.getOptions('api') || {}));
		}
	}, {
		key: 'initTemplates',
		value: function initTemplates() {
			if (this.getOptions('templates')) {
				var prom = null;
				for (var t in this.getOptions('templates')) {
					if (t && this.getOptions('templates').hasOwnProperty(t)) {
						var url = this.getOptions('templates')[t];
						if (prom) {
							prom.then(notTemplateCache$1.addLibFromURL.bind(notTemplateCache$1, url));
						} else {
							prom = notTemplateCache$1.addLibFromURL(url);
						}
					}
				}
				if (prom) {
					prom.then(this.initManifest.bind(this)).catch(function (e) {
						notCommon.report('no templates lib', e);
					});
				} else {
					this.initManifest();
				}
			} else {
				this.initManifest();
			}
		}
	}, {
		key: 'initManifest',
		value: function initManifest() {
			var url = this.getOptions('manifestURL');
			notCommon.getJSON(url, {}).then(this.setInterfaceManifest.bind(this)).catch(notCommon.report.bind(this));
		}
	}, {
		key: 'preInitRouter',
		value: function preInitRouter() {
			this.setWorking('router', notRouter$1);
			this.getWorking('router').setRoot(this.getOptions('router.root'));
			notRouter$1.reRouteExisted();
		}
	}, {
		key: 'initRouter',
		value: function initRouter() {
			var routieInput = {};
			for (var t = 0; t < this.getOptions('router.manifest').length; t++) {
				var routeBlock = this.getOptions('router.manifest')[t],
				    paths = routeBlock.paths,
				    controller = routeBlock.controller;
				for (var i = 0; i < paths.length; i++) {
					routieInput[paths[i]] = this.bindController(controller);
				}
			}
			this.getWorking('router').addList(routieInput).listen(); //.navigate(this.getOptions('router.index'));
		}
	}, {
		key: 'setInterfaceManifest',
		value: function setInterfaceManifest(manifest) {
			this.setOptions('interfaceManifest', manifest);
			this.update();
		}
	}, {
		key: 'getInterfaceManifest',
		value: function getInterfaceManifest() {
			return this.getOptions('interfaceManifest');
		}
	}, {
		key: 'update',
		value: function update() {
			//нужно инициализировать
			//модели полученными интерфейсами
			this.updateInterfaces();
			//иницилицировать и запустить контроллер инициализации
			this.initController();
			if (this.allResourcesReady()) {
				this.startApp();
			}
		}
	}, {
		key: 'startApp',
		value: function startApp() {
			//создать контроллеры
			//роутер и привязать к нему контроллеры
			this.initRouter();
		}
	}, {
		key: 'bindController',
		value: function bindController(controllerName) {
			var app = this;
			return function () {
				new controllerName(app, arguments);
			};
		}
	}, {
		key: 'initController',
		value: function initController() {
			if (typeof this.getOptions('initController') !== 'undefined') {
				var initController = this.getOptions('initController');
				this.setWorking('initController', new initController(this));
			}
		}
	}, {
		key: 'getCurrentController',
		value: function getCurrentController() {
			return this.getWorking('currentController');
		}
	}, {
		key: 'setCurrentController',
		value: function setCurrentController(ctrl) {
			this.setWorking('currentController', ctrl);
			return this;
		}
	}, {
		key: 'updateInterfaces',
		value: function updateInterfaces() {
			var _this2 = this;

			this.clearInterfaces();
			var manifests = this.getOptions('interfaceManifest');
			if (manifests) {
				var _loop = function _loop(name) {
					var recordManifest = manifests[name];
					_this2.getWorking('interfaces')[name] = function (recordData) {
						return new notRecord(recordManifest, recordData);
					};
					window['nr' + notCommon.capitalizeFirstLetter(name)] = _this2.getWorking('interfaces')[name];
				};

				for (var name in manifests) {
					_loop(name);
				}
			}
		}
	}, {
		key: 'getRecordName',
		value: function getRecordName(name) {
			return OPT_RECORD_PREFIX + notCommon.capitalizeFirstLetter(name);
		}
	}, {
		key: 'getControllerName',
		value: function getControllerName(name) {
			return OPT_CONTROLLER_PREFIX + notCommon.capitalizeFirstLetter(name);
		}
	}, {
		key: 'getInterfaces',
		value: function getInterfaces() {
			return this.getWorking('interfaces');
		}
	}, {
		key: 'clearInterfaces',
		value: function clearInterfaces() {
			this.setWorking('interfaces', {});
			return this;
		}
	}, {
		key: 'waitThisResource',
		value: function waitThisResource(type, index) {
			if (!this.resources.hasOwnProperty(type)) {
				this.resources[type] = {};
			}
			this.resources[type][index] = false;
			return this.onResourceReady.bind(this, type, index);
		}
	}, {
		key: 'onResourceReady',
		value: function onResourceReady(type, index) {
			this.resources[type][index] = true;
			if (this.allResourcesReady()) {
				this.startApp();
			}
		}
	}, {
		key: 'allResourcesReady',
		value: function allResourcesReady() {
			var i, j;
			for (i in this.resources) {
				for (j in this.resources[i]) {
					if (!this.resources[i][j]) {
						return false;
					}
				}
			}
			return true;
		}
	}]);
	return notApp;
}(notBase);

var META_PROCESSORS = Symbol('processors');

var notTemplateProcessors = function (_notBase) {
	inherits(notTemplateProcessors, _notBase);

	function notTemplateProcessors() {
		var _ret;

		classCallCheck(this, notTemplateProcessors);

		var _this = possibleConstructorReturn(this, (notTemplateProcessors.__proto__ || Object.getPrototypeOf(notTemplateProcessors)).call(this));

		_this[META_PROCESSORS] = {};
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notTemplateProcessors, [{
		key: 'setProcessor',
		value: function setProcessor() /* key, value */{
			this.setCommon(this[META_PROCESSORS], arguments);
			return this;
		}
	}, {
		key: 'getProcessor',
		value: function getProcessor() /* key,  defaultValue */{
			return this.getCommon(this[META_PROCESSORS], arguments);
		}
	}, {
		key: 'clearProcessors',
		value: function clearProcessors() {
			this.setCommon(this[META_PROCESSORS], {});
			return this;
		}
	}, {
		key: 'add',
		value: function add() {
			if (arguments.length === 2) {
				this.setProcessor(arguments[0], arguments[1]);
			} else {
				if (arguments.length === 1 && _typeof(arguments[0]) === 'object') {
					for (var t in arguments[0]) {
						this.setProcessor(t, arguments[0][t]);
					}
				}
			}
		}
	}, {
		key: 'get',
		value: function get$$1() {
			return this.getProcessor.apply(this, arguments);
		}
	}, {
		key: 'clear',
		value: function clear() {
			this[META_PROCESSORS] = {};
			return this;
		}
	}]);
	return notTemplateProcessors;
}(notBase);

var notTemplateProcessors$1 = new notTemplateProcessors();

/*
 * Использует DOM поддерево в качестве шаблона.
 * Заполняет его данными.
 * Возвращает сгенерированные элементы
 *
 * */

/*

	<div n-template-name="vasya">
		<p><input type="text" n-value=":coolName"/></p>
		<p>Борис хрен попадешь и {{:coolName}}.</p>
	</div>

 */

var META_COMPONENTS = Symbol('components');

var notRenderer = function (_notBase) {
	inherits(notRenderer, _notBase);

	/*
 	input = {
 		data: notRecord,
 		template: element
 		options:{
 			helpers: object
 			// если задать, то сразу после загрузки будет отрендерено сюда
 			targetEl: HTMLElement(object) или html selector (string)
 		}
 	}
 */

	function notRenderer(input) {
		var _ret;

		classCallCheck(this, notRenderer);

		var _this = possibleConstructorReturn(this, (notRenderer.__proto__ || Object.getPrototypeOf(notRenderer)).call(this));

		_this[META_COMPONENTS] = {};
		_this.init(input);
		_this.render();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notRenderer, [{
		key: 'init',
		value: function init(input) {
			this.input = input;
			this.component = input.component;
			this.initData(input.data ? input.data : {});
			this.initOptions(input.options ? input.options : {});
			this.initWorking(input.template);
			this.initTemplate();
		}
	}, {
		key: 'initTemplate',
		value: function initTemplate() {
			this.setWorking('template', this.getWorking('getTemplate')());
		}
	}, {
		key: 'initData',
		value: function initData(val) {
			this.setData(val);
			if (this.getData().isRecord) {
				this.getData().on('change', this.onChange.bind(this));
			}
		}
	}, {
		key: 'initOptions',
		value: function initOptions(val) {
			this.setOptions(val);
		}
	}, {
		key: 'initWorking',
		value: function initWorking(template) {
			this.setWorking({
				getTemplate: template,
				partId: this.getOptions('partId') ? this.getOptions('partId') : OPTS.PART_ID_PREFIX + Math.random()
			});
		}
	}, {
		key: 'getBreadCrumps',
		value: function getBreadCrumps() {
			if (this.component) {
				return [].concat(toConsumableArray(this.component.getBreadCrumps()), [this.getWorking('partId')]);
			} else {
				return [this.getWorking('partId')];
			}
		}
	}, {
		key: 'render',
		value: function render() {
			this.clearStash();
			this.setWorkingMapping();
			this.execProcessors(this.getData());
			this.searchForSubTemplates();
			this.stashRendered();
		}
	}, {
		key: 'onChange',
		value: function onChange(proxy, key, value) {
			this.update(key);
			this.trigger('obsolete', proxy, key, value);
		}
	}, {
		key: 'update',
		value: function update(key) {
			this.execProcessors(this.getData());
			for (var t in this[META_COMPONENTS]) {
				var item = this[META_COMPONENTS][t],
				    ifPart = true;
				if (key) {
					if (item.getOptions('dataPath') === null) {
						continue;
					}
					var componentPath = notPath$1.normilizePath(item.getOptions('dataPath')),
					    changedPath = notPath$1.normilizePath(key);
					ifPart = notPath$1.ifFullSubPath(changedPath, componentPath);
				}

				if (ifPart) {
					item.update();
				}
			}
		}
	}, {
		key: 'setWorkingMapping',
		value: function setWorkingMapping() {
			this.setWorking('mapping', this.createMapping());
		}

		/*
  	Создаем карты соотвествия процессоров, путей данных в объекте и элементов шаблона.
  [{
  	el,
  	processor,
  	working,
  	item.property.path
  }]
  	*/

	}, {
		key: 'createMapping',
		value: function createMapping() {
			var result = this.findAllProcessors();
			return result;
		}
	}, {
		key: 'findAllProcessors',
		value: function findAllProcessors() {
			var procs = [],
			    els = notCommon.getAttributesStartsWith(this.getWorkingTemplateElement(), OPTS.PROCESSOR_EXPRESSION_PREFIX);
			for (var j = 0; j < els.length; j++) {
				for (var i = 0, atts = els[j].attributes, n = atts.length; i < n; i++) {
					if (atts[i].nodeName.indexOf(OPTS.PROCESSOR_EXPRESSION_PREFIX) === 0) {
						//notCommon.log(atts[i]);
						var procData = this.parseProcessorExpression(atts[i].nodeName);
						procData.element = els[j];
						procData.processorExpression = atts[i].nodeName;
						procData.attributeExpression = atts[i].value;
						procs.push(procData);
					}
				}
			}
			return procs;
		}
	}, {
		key: 'parseProcessorExpression',
		value: function parseProcessorExpression(processorExpression) {
			var result = {
				params: [],
				processorName: '',
				ifCondition: false
			};
			processorExpression = processorExpression.replace(OPTS.PROCESSOR_EXPRESSION_PREFIX, '');
			if (processorExpression.indexOf(OPTS.PROCESSOR_EXPRESSION_CONDITION_POSTFIX) === processorExpression.length - OPTS.PROCESSOR_EXPRESSION_CONDITION_POSTFIX.length) {
				result.ifCondition = true;
				processorExpression = processorExpression.replace(OPTS.PROCESSOR_EXPRESSION_SEPARATOR + OPTS.PROCESSOR_EXPRESSION_CONDITION_POSTFIX, '');
			}
			result.params = processorExpression.split(OPTS.PROCESSOR_EXPRESSION_SEPARATOR);
			result.processorName = result.params[0];
			result.params = result.params.slice(1);
			return result;
		}
	}, {
		key: 'execProcessors',
		value: function execProcessors(item, index) {
			var mapping = this.getWorking('mapping');
			if (mapping) {
				for (var i = 0; i < mapping.length; i++) {
					var procScope = mapping[i];
					procScope.attributeResult = this.getAttributeExpressionResult(procScope.attributeExpression, item, index);
					//notCommon.log('attributeResult', procScope.attributeResult);
					var procName = procScope.processorName,
					    proc = notTemplateProcessors$1.get(procName);
					if (proc) {
						proc(procScope, item, this.getOptions('helpers', {}));
						procScope.element.removeAttribute(procScope.processorExpression);
					} else {
						notCommon.error('no processor like', procName);
					}
				}
			}
			this.trigger('rendered');
		}
	}, {
		key: 'getAttributeExpressionResult',
		value: function getAttributeExpressionResult(path, item) {
			return notPath$1.get(path, item, this.getOptions('helpers', {}));
		}
	}, {
		key: 'clearSubTemplates',
		value: function clearSubTemplates() {
			this.destroySubs();
			this.setWorking('subs', []);
		}
	}, {
		key: 'destroySubs',
		value: function destroySubs() {
			if (this.getWorking('subs')) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.getWorking('subs')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var t = _step.value;

						t.destroy();
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.clearSubTemplates();
			for (var t = 0; t < this.getStash().length; t++) {
				var el = this.getStash()[t];
				if (el.parentNode) {
					el.parentNode.removeChild(el);
				}
			}
		}
	}, {
		key: 'ifSubElementRendered',
		value: function ifSubElementRendered(ntEl) {
			return ntEl.attributes.ntRendered && ntEl.attributes.ntRendered.value === 'true';
		}
	}, {
		key: 'searchForSubTemplates',
		value: function searchForSubTemplates() {
			this.clearSubTemplates();
			var subs = this.getWorkingTemplateElement().querySelectorAll(OPTS.TEMPLATE_TAG);
			//notCommon.log('sub templates', subs);
			for (var nt = 0; nt < subs.length; nt++) {
				if (!this.ifSubElementRendered(subs[nt])) {
					this.renderSub(subs[nt]);
				}
			}
		}
	}, {
		key: 'addSub',
		value: function addSub(ntEl) {
			ntEl.setAttribute('nt-rendered', true);
			this.getWorking('subs').push({
				targetEl: ntEl,
				path: ntEl.attributes.data ? ntEl.attributes.data.value : '',
				name: ntEl.attributes.name ? ntEl.attributes.name.value : '',
				src: ntEl.attributes.src ? ntEl.attributes.name.src : '',
				id: ntEl.attributes.id ? ntEl.attributes.id.value : OPTS.COMPONENT_ID_PREFIX + Math.random(),
				renderedList: []
			});
		}
	}, {
		key: 'renderSub',
		value: function renderSub(ntEl) {
			if (!ntEl) {
				return;
			}
			var details = {
				dataPath: ntEl.attributes.data ? ntEl.attributes.data.value : null,
				name: ntEl.attributes.name ? ntEl.attributes.name.value : '',
				src: ntEl.attributes.src ? ntEl.attributes.src.value : '',
				id: ntEl.attributes.id ? ntEl.attributes.id.value : OPTS.COMPONENT_ID_PREFIX + Math.random()
			},
			    options = {
				data: details.dataPath !== null ? this.getAttributeExpressionResult(details.dataPath, this.getData()) : null,
				template: {
					name: details.name,
					src: details.src
				},
				options: {
					helpers: this.getOptions('helpers', {}),
					targetEl: ntEl,
					name: details.name,
					renderAnd: 'placeAfter',
					id: details.id,
					ntEl: ntEl,
					dataPath: details.dataPath
				},
				owner: this
			};
			ntEl.setAttribute('id', details.id);
			ntEl.setAttribute('nt-rendered', true);
			this[META_COMPONENTS][details.id] = new notComponent(options);
		}
	}, {
		key: 'clearStash',
		value: function clearStash() {
			this.setWorking('stash', []);
		}
	}, {
		key: 'getWorkingTemplateElement',
		value: function getWorkingTemplateElement() {
			return this.getWorking('template');
		}
	}, {
		key: 'getStash',
		value: function getStash() {
			return this.getWorking('stash');
		}
	}, {
		key: 'stashRendered',
		value: function stashRendered() {
			var result = this.getWorkingTemplateElement();
			for (var t = 0; t < result.childNodes.length; t++) {
				this.addToStash(result.childNodes[t]);
			}
		}
	}, {
		key: 'replaceRendered',
		value: function replaceRendered() {
			//notCommon.log('replace stash');
			var result = this.getWorkingTemplateElement(),
			    stash = this.getStash(),
			    newStash = [],
			    anchor = stash.length > 0 ? stash[0] : this.getOptions('ntEl'),
			    parentNode = anchor.parentNode;
			for (var t = 0; t < result.childNodes.length; t++) {
				newStash.push(result.childNodes[t]);
			}
			for (var _t = 0; _t < newStash.length; _t++) {
				if (anchor.nextSibling) {
					anchor.parentNode.insertBefore(newStash[_t], anchor.nextSibling);
				} else {
					anchor.parentNode.appendChild(newStash[_t]);
				}
			}
			for (var _t2 = 0; _t2 < stash.length; _t2++) {
				parentNode.removeChild(stash[_t2]);
			}
			this.setWorking('stash', newStash);
		}
	}, {
		key: 'addToStash',
		value: function addToStash(node) {
			this.getStash().push(node);
		}
	}, {
		key: 'isData',
		value: function isData() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			return this.getData() === data;
		}
	}, {
		key: 'hide',
		value: function hide() {}
	}, {
		key: 'show',
		value: function show() {}
	}]);
	return notRenderer;
}(notBase);

var place = {
	before: function before(targetEl /*, rendered*/) {
		var l = 0;
		while (targetEl.children.length - l) {
			if (targetEl.children[0].nodeName === 'NT') {
				//console.log('nt founded');
				l++;
			} else {
				//console.log('remove child ',targetEl.children[l]);
				targetEl.removeChild(targetEl.children[l]);
			}
		}
		targetEl.textContent = '';
	},
	beforeEach: function beforeEach() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			//console.log('append child ', rendered[i]);
			targetEl.appendChild(rendered[i]);
		}
	},
	afterEach: function afterEach() /*targetEl, rendered*/{},
	after: function after() /*targetEl, rendered*/{}
};

var placeAfter = {
	before: function before() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			targetEl.parentNode.insertBefore(rendered[i], targetEl.nextSibling);
		}
	},
	after: function after() /*targetEl, rendered*/{}
};

var placeBefore = {
	before: function before() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			targetEl.parentNode.insertBefore(rendered[i], targetEl);
		}
	},
	after: function after() /*targetEl, rendered*/{}
};

var placeFirst = {
	before: function before() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = rendered.length - 1; i > -1; i--) {
			//console.log('place first', i, rendered[i]);
			if (targetEl.children.length) {
				//console.log('append before first');
				targetEl.insertBefore(rendered[i], targetEl.children[0]);
			} else {
				//console.log('append as first');
				targetEl.appendChild(rendered[i]);
			}
		}
	},
	after: function after() /*targetEl, rendered*/{}
};

var placeLast = {
	before: function before() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			targetEl.appendChild(rendered[i]);
		}
	},
	after: function after() /*targetEl, rendered*/{}
};

var replace = {
	before: function before() /*targetEl, rendered*/{},
	beforeEach: function beforeEach() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			targetEl.parentNode.insertBefore(rendered[i], targetEl.nextSibling);
		}
	},
	afterEach: function afterEach() /*targetEl, rendered*/{},
	after: function after(targetEl /*, rendered*/) {
		if (targetEl.nodeName !== 'NT') {
			targetEl.parentNode.removeChild(targetEl);
		}
	}
};

var notPlacers = {
	place: place,
	placeAfter: placeAfter,
	placeBefore: placeBefore,
	placeFirst: placeFirst,
	placeLast: placeLast,
	replace: replace
};

var META_PARTS = Symbol('parts');
/*
	input = {
		data: notRecord or [notRecord],
		template: {
			html: html(string), 		//текст с html кодом шаблона
			el: HTMLElement(object), 	//DOM элемент
			src: src(string),			//ссылка на файл с шаблоном
			name: name(string)			//название шаблона для поиска в кэше notTemplateCache
		}
		options:{
			helpers: object
			// если задать, то сразу после загрузки будет отрендерено сюда
			targetEl: HTMLElement(object) или html selector (string)
			//а это как будем помещать результат рендеринга
			renderAnd: placeStyle(string) один из вариантов
					place		-	помещаем внутри целевого элемента
					replace		-	заменяем
					placeAfter	-	после
					placeBefore	-	до
					placeFirst	-	внутри первым дочерним
					placeLast	-	внутри последним дочерним
		}
	}
*/

var notComponent = function (_notBase) {
	inherits(notComponent, _notBase);

	function notComponent(input) {
		var _ret;

		classCallCheck(this, notComponent);

		var _this = possibleConstructorReturn(this, (notComponent.__proto__ || Object.getPrototypeOf(notComponent)).call(this, input));

		_this.resetParts();
		_this.on('ready', _this.render.bind(_this));
		_this.init(input);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notComponent, [{
		key: 'getBreadCrumps',
		value: function getBreadCrumps() {
			if (this.owner) {
				return [].concat(toConsumableArray(this.owner.getBreadCrumps()), [this.getOptions('id')]);
			} else {
				return [this.getOptions('id')];
			}
		}
	}, {
		key: 'init',
		value: function init(input) {
			this.input = input;
			this.owner = input.owner ? input.owner : null;
			this.initOptions(input.options ? input.options : {});
			this.initWorking(input);
			this.prepareTemplateElement(input.template ? input.template : null);
		}
	}, {
		key: 'initData',
		value: function initData(val) {
			this.setData(val);
		}
	}, {
		key: 'initEvents',
		value: function initEvents(list) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;

					this.on.apply(this, toConsumableArray(t));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'initOptions',
		value: function initOptions(val) {
			this.setOptions(val);
			if (!this.getOptions('id')) {
				this.setOptions('id', OPTS.COMPONENT_ID_PREFIX + Math.random());
			}
			if (!this.getOptions('ntEl')) {
				this.initMarkElement();
			}
		}
	}, {
		key: 'initMarkElement',
		value: function initMarkElement() {
			var markEl = document.createElement('nt');
			markEl.setAttribute('id', this.getOptions('id'));
			markEl.setAttribute('nt-rendered', true);
			this.setOptions('ntEl', markEl);
			var placer = this.getPlacer(this.getOptions('renderAnd')),
			    targetQuery = this.getOptions('targetQuery');
			if (targetQuery) {
				var target = document.querySelector(targetQuery);
				if (target) {
					this.setOptions('targetEl', target);
				}
			}

			if (!this.getOptions('targetEl')) {
				throw 'No target to place rendered';
			} else {
				placer.main(this.getOptions('targetEl'), [markEl]);
			}
		}
	}, {
		key: 'initWorking',
		value: function initWorking(val) {
			this.unsetReady(val);
		}
	}, {
		key: 'prepareTemplateElement',
		value: function prepareTemplateElement(val) {
			if (!val) {
				this.unsetReady();
			} else if (val.hasOwnProperty('html') && val.html) {
				this.setProtoTemplateElement(notTemplateCache$1.wrap('', '', val.html));
			} else if (val.hasOwnProperty('el') && val.el) {
				this.setProtoTemplateElement(val.el.cloneNode(true));
			} else if (val.hasOwnProperty('src') && val.src) {
				notTemplateCache$1.addFromURL(val.src, val.src).then(this.setProtoTemplateElement.bind(this)).catch(notCommon.report);
			} else if (val.hasOwnProperty('name') && val.name) {
				this.setProtoTemplateElement(notTemplateCache$1.get(val.name));
			}
		}
	}, {
		key: 'setProtoTemplateElement',
		value: function setProtoTemplateElement(cont) {
			if (cont) {
				this.setWorking('protoTemplateElement', cont);
				this.trigger('ready');
			} else {
				notCommon.error('Wrong template container element');
			}
		}
	}, {
		key: 'getProtoTemplateElement',
		value: function getProtoTemplateElement() {
			return this.getWorking('protoTemplateElement');
		}
	}, {
		key: 'getProtoTemplateElementClone',
		value: function getProtoTemplateElementClone() {
			return this.getWorking('protoTemplateElement').cloneNode(true);
		}
	}, {
		key: 'getWorkingTemplateElement',
		value: function getWorkingTemplateElement() {
			return this.getWorking('templateElement');
		}
	}, {
		key: 'resetWorkingTemplateElement',
		value: function resetWorkingTemplateElement() {
			return this.setWorking('templateElement', this.getProtoTemplateElement().cloneNode(true));
		}
	}, {
		key: 'setReady',
		value: function setReady() {
			this.setWorking('ready', true);
		}
	}, {
		key: 'unsetReady',
		value: function unsetReady() {
			this.setWorking('ready', false);
		}
	}, {
		key: 'isReady',
		value: function isReady() {
			return this.setWorking('ready');
		}
	}, {
		key: 'clearParts',
		value: function clearParts() {
			/* извещаем об удалении элементов */
			if (this[META_PARTS] && Array.isArray(this[META_PARTS]) && this[META_PARTS].length) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this[META_PARTS][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var t = _step2.value;

						if (t.destroy) {
							t.destroy();
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
			this.resetParts();
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.clearParts();
			if (this.getOptions('ntEl') && this.getOptions('ntEl').parentNode) {
				this.getOptions('ntEl').parentNode.removeChild(this.getOptions('ntEl'));
			}
			this.dead = true;
			this.offAll();
		}
	}, {
		key: 'resetParts',
		value: function resetParts() {
			this[META_PARTS] = [];
		}
	}, {
		key: 'getParts',
		value: function getParts() {
			return this[META_PARTS];
		}
	}, {
		key: 'addPart',
		value: function addPart(template) {
			this[META_PARTS].push(template);
		}
	}, {
		key: 'render',
		value: function render() {
			this.clearParts();
			if (this.getProtoTemplateElement()) {
				this.forEachData(this.renderPart.bind(this));
				this.placeRendered();
			}
			this.trigger('afterRender');
		}
	}, {
		key: 'update',
		value: function update() {
			this.removeObsoleteParts();
			if (this.getProtoTemplateElement()) {
				this.forEachData(this.renderPart.bind(this));
				this.placeRendered();
			}
			this.trigger('afterUpdate');
		}
	}, {
		key: 'placeRendered',
		value: function placeRendered() {
			if (this.getOptions('targetEl')) {
				var placer = this.getPlacer(this.getOptions('renderAnd'));
				placer.before(this.getOptions('targetEl'));
				this.forEachData(this.placePart.bind(this));
				placer.after(this.getOptions('targetEl'));
			} else {
				notCommon.error('no target element');
			}
		}
	}, {
		key: 'placePart',
		value: function placePart(data, index) {
			var part = this.getPartByData(data),
			    nodes = part && part.getStash ? part.getStash() : [],
			    targetEl = void 0,
			    lastNode = void 0,
			    placer = void 0;
			if (index === 0) {
				placer = this.getPlacer(this.getOptions('renderAnd'));
				targetEl = this.getOptions('targetEl');
			} else {
				placer = this.getPlacer(OPTS.DEFAULT_PLACER_LOOP);
				targetEl = this.getWorking('lastPlacedNode');
			}
			placer.main(targetEl, nodes);
			lastNode = targetEl;
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = nodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var t = _step3.value;

					if (t.nodeType === 1) {
						lastNode = t;
						lastNode.setAttribute('nt-component', this.getOptions('id'));
						lastNode.setAttribute('nt-part', part.getWorking('partId'));
					}
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			this.setWorking('lastPlacedNode', lastNode);
		}
	}, {
		key: 'getPlacer',
		value: function getPlacer(method) {
			//notCommon.log('searching for placer', method);
			if (notPlacers.hasOwnProperty(method)) {
				return notPlacers[method];
			} else {
				return notPlacers[OPTS.DEFAULT_PLACER];
			}
		}
	}, {
		key: 'forEachData',
		value: function forEachData(func) {
			if (Array.isArray(this.getData())) {
				for (var t = 0; t < this.getData().length; t++) {
					func(this.getData()[t], t);
				}
			} else {
				func(this.getData(), 0);
			}
		}
	}, {
		key: 'forEachPart',
		value: function forEachPart(func) {
			if (Array.isArray(this.getParts())) {
				for (var t = 0; t < this.getParts().length; t++) {
					func(this.getParts()[t], t);
				}
			}
		}

		/*
  	если с данными не связан рендерер - создаем
  */

	}, {
		key: 'renderPart',
		value: function renderPart(data) {
			if (!this.getPartByData(data)) {
				//notCommon.log('creating part render');
				var renderer = new notRenderer({
					data: data,
					template: this.getProtoTemplateElementClone.bind(this),
					options: this.getOptions(),
					component: this
				});
				//renderer.on('obsolete', this.update.bind(this));
				this.addPart(renderer);
			} else {
				//notCommon.log('updating part render');
				this.updatePart(this.getPartByData(data));
			}
		}
	}, {
		key: 'updatePart',
		value: function updatePart(part) {
			part.update();
		}
	}, {
		key: 'removeObsoleteParts',
		value: function removeObsoleteParts() {
			//конвеер поиск актуальных - удаление остальных
			notCommon.pipe(undefined, // parts to search in, can be 'undefined'
			[this.findActualParts.bind(this), //first round, search for obsolete
			this.removeNotActualParts.bind(this)]);
		}

		/*
  	есть данные и есть рендерер - значит актуально,
  	нет данных и есть рендерер - значит старьё
  */

	}, {
		key: 'findActualParts',
		value: function findActualParts() {
			var _this2 = this;

			var actualParts = [];
			this.forEachData(function (data /*, index*/) {
				var part = _this2.getPartByData(data);
				if (part) {
					actualParts.push(part);
				}
			});
			return actualParts;
		}

		/*
  	удаляем все кроме актуальных
  */

	}, {
		key: 'removeNotActualParts',
		value: function removeNotActualParts(actualParts) {
			for (var t = 0; t < this.getParts().length; t++) {
				if (actualParts.indexOf(this.getParts()[t]) === -1) {
					this.getParts()[t].destroy();
					this.getParts().splice(t, 1);
					t--;
				}
			}
		}
	}, {
		key: 'getPartByData',
		value: function getPartByData(data) {
			for (var t in this.getParts()) {
				if (this.getParts()[t].isData(data)) {
					return this.getParts()[t];
				}
			}
			return false;
		}
	}, {
		key: 'show',
		value: function show() {}
	}, {
		key: 'hide',
		value: function hide() {}
	}]);
	return notComponent;
}(notBase);

var OPT_DEFAULT_CONTAINER_SELECTOR = '.page-content';
var OPT_DEFAULT_VIEWS_POSTFIX = '.html';
var OPT_DEFAULT_VIEW_NAME = 'default';
var OPT_DEFAULT_RENDER_FROM_URL = true;
var OPT_DEFAULT_PLURAL_NAME = 'Models';
var OPT_DEFAULT_SINGLE_NAME = 'Model';
var OPT_DEFAULT_MODULE_NAME = 'main';
var OPT_DEFAULT_RENDER_AND = 'place';

var notController = function (_notBase) {
	inherits(notController, _notBase);

	function notController(app) {
		var _ret;

		classCallCheck(this, notController);

		var _this = possibleConstructorReturn(this, (notController.__proto__ || Object.getPrototypeOf(notController)).call(this));

		notCommon.log('start controller');
		_this.app = app;
		_this.setWorking({
			ready: false,
			views: {},
			libs: {},
			viewName: OPT_DEFAULT_VIEW_NAME,
			helpers: {}
		});
		_this.setData({});
		_this.setOptions({
			moduleName: OPT_DEFAULT_MODULE_NAME,
			containerSelector: OPT_DEFAULT_CONTAINER_SELECTOR,
			prefix: _this.app.getOptions('paths.module'),
			postfix: OPT_DEFAULT_VIEWS_POSTFIX,
			renderFromURL: OPT_DEFAULT_RENDER_FROM_URL,
			names: {
				plural: OPT_DEFAULT_PLURAL_NAME,
				single: OPT_DEFAULT_SINGLE_NAME
			}
		});
		_this.on('ready', _this.initRender.bind(_this));
		/*
      сразу делаем доступными модели notRecord из nc`ControllerName` будут доступны как this.nr`ModelName`
  */
		var interfaces = _this.app.getInterfaces();
		_this.make = {};
		for (var t in interfaces) {
			if (interfaces.hasOwnProperty(t)) {
				_this.make[t] = interfaces[t];
			}
		}
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notController, [{
		key: 'initRender',
		value: function initRender() {
			this.render(this.getWorking('viewName'), this.getData(), this.getWorking('helpers'));
		}
	}, {
		key: 'render',
		value: function render() /* could be not represented */{
			var viewName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

			var _this2 = this;

			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var helpers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			return new Promise(function (resolve, reject) {
				var view = _this2.getView(viewName);

				if (typeof view === 'undefined' || view === null) {
					reject('No view found', viewName);
				} else {
					view = notCommon.extend({}, view);
					// если place не указано, что возможно и разумно при не существовании
					// элемента, но известном идентификаторе
					if ((typeof view.targetEl === 'undefined' || view.targetEl === null) && typeof view.targetQuery !== 'undefined' && view.targetQuery !== null && view.targetQuery.length > 0) {
						view.targetEl = document.querySelector(view.targetQuery);
					} else {
						view.targetEl = document.querySelector(_this2.getOptions('containerSelector'));
					}
					view.data = data;
					if (typeof view.helpers !== 'undefined' && view.helpers !== null && Object.keys(view.helpers).length > 0) {
						view.helpers = notCommon.extend(view.helpers, helpers);
					} else {
						view.helpers = helpers;
					}
					//если нужно загружать шаблоны
					if (_this2.getOptions('renderFromURL')) {
						//и адрес не указан
						if (typeof view.templateURL === 'undefined' || view.templateURL == null || view.templateURL.length == 0) {
							var prefix = view.common ? _this2.app.getOptions('paths.common') : _this2.getModulePrefix(),
							    name = typeof view.name !== 'undefined' && view.name !== null && view.name.length > 0 ? view.name : viewName,
							    postfix = _this2.getOptions('postfix');
							//генерируем адрес по шаблону
							view.templateURL = [prefix, name].join('/') + postfix;
						}
					} else {
						//а если есть название шаблона, то
						if (view.hasOwnProperty('templateName')) {
							//...
							view.templateName = _this2.getOptions('prefix') + view.templateName + _this2.getOptions('postfix');
						}
					}
					_this2.setWorking('component', new notComponent({
						data: data,
						template: {
							name: view.templateName,
							src: view.templateURL
						},
						events: [['afterRender', resolve]],
						options: {
							targetEl: view.targetEl,
							helpers: helpers,
							renderAnd: view.renderAnd || OPT_DEFAULT_RENDER_AND
						}
					}));
				}
			});
		}
	}, {
		key: 'getApp',
		value: function getApp() {
			return this.app;
		}
	}, {
		key: 'setModel',
		value: function setModel(model) {
			this.setWorking('model', model);
			return this;
		}
	}, {
		key: 'getModel',
		value: function getModel() {
			return this.setWorking('model');
		}
	}, {
		key: 'setReady',
		value: function setReady() {
			var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			this.setWorking('ready', val);
			val ? this.trigger('ready') : this.trigger('busy');
		}
	}, {
		key: 'setView',
		value: function setView(name, view) {
			this.setWorking(notPath$1.join('views', name), view);
			return this;
		}
	}, {
		key: 'setViews',
		value: function setViews(views) {
			for (var t in views) {
				this.setWorking(notPath$1.join('views', t), views[t]);
			}
			return this;
		}
	}, {
		key: 'getView',
		value: function getView() {
			var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

			return this.getWorking(notPath$1.join('views', name));
		}
	}, {
		key: 'setModuleName',
		value: function setModuleName(val) {
			this.setOptions('moduleName', val);
			return this;
		}
	}, {
		key: 'getModuleName',
		value: function getModuleName() {
			return this.getOptions('moduleName');
		}
	}, {
		key: 'getModulePrefix',
		value: function getModulePrefix() {
			return [this.app.getOptions('paths.modules'), this.getModuleName()].join('/');
		}
	}, {
		key: 'preloadLib',
		value: function preloadLib() {
			var _this3 = this;

			var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			return new Promise(function (resolve, reject) {
				if ((typeof list === 'undefined' ? 'undefined' : _typeof(list)) !== 'object') {
					resolve();
				} else {
					_this3.setWorking('loading', []);

					var _loop = function _loop(t) {
						_this3.getWorking('loading').push(list[t]);
						_this3.make[list[t]]({}).$listAll().then(function (data) {
							if (!_this3.getOptions('libs')) {
								_this3.setOptions('libs', {});
							}
							_this3.getOptions('libs')[t] = data;
							if (_this3.getWorking('loading').indexOf(list[t]) > -1) {
								_this3.getWorking('loading').splice(_this3.getWorking('loading').indexOf(list[t]), 1);
							}
							if (_this3.getWorking('loading').length === 0) {
								resolve();
							}
						}).catch(function (err) {
							notCommon.report(err);
							reject();
						});
					};

					for (var t in list) {
						_loop(t);
					}
					if (_this3.getWorking('loading').length === 0) {
						resolve();
					}
				}
			});
		}
	}, {
		key: 'queeUpload',
		value: function queeUpload(name, list) {
			//hash (fieldName=>filesList)
			if (!this.getWorking('uploadQuee')) {
				this.setWorking('uploadQuee', {});
			}
			this.getWorking('uploadQuee')[name] = list;
		}
	}, {
		key: 'execUploads',
		value: function execUploads(item) {
			var _this4 = this;

			var list = this.getWorking('uploadQuee');
			return new Promise(function (resolve, reject) {
				if ((typeof list === 'undefined' ? 'undefined' : _typeof(list)) !== 'object') {
					resolve(item);
				} else {
					_this4.setWorking('uploading', {});

					var _loop2 = function _loop2(t) {
						var fieldFiles = list[t];
						if (fieldFiles.length > 1) {
							item[t] = [];
						} else {
							item[t] = '';
						}

						var _loop3 = function _loop3(f) {
							if (!_this4.getWorking('uploading').hasOwnProperty(t)) {
								_this4.getWorking('uploading')[t] = 0;
							}
							_this4.getWorking('uploading')[t]++;
							_this4.app.getWorking('uploader').upload(fieldFiles[f]).then(function (savedFile) {
								notCommon.log('file uploaded', t, f, savedFile);
								_this4.getWorking('uploading')[t]--;
								if (_this4.getWorking('uploading')[t] === 0) {
									delete _this4.getWorking('uploading')[t];
								}
								if (Array.isArray(item[f])) {
									item[t].push(savedFile.hash);
								} else {
									item[t] = savedFile.hash;
								}
								if (Object.keys(_this4.getWorking('uploading')).length === 0) {
									resolve(item);
								}
							}).catch(function (err) {
								notCommon.report(err);
								reject(err);
							});
						};

						for (var f = 0; f < fieldFiles.length; f++) {
							_loop3(f);
						}
					};

					for (var t in list) {
						_loop2(t);
					}
					if (Object.keys(_this4.getWorking('uploading')).length === 0) {
						resolve(item);
					}
				}
			});
		}
	}, {
		key: 'onAfterRender',
		value: function onAfterRender() {
			this.trigger('afterRender');
		}
	}]);
	return notController;
}(notBase);

var OPT_DEFAULT_FORM_PREFIX = 'form_';
var OPT_DEFAULT_ROLE_NAME = 'default';
var OPT_DEFAULT_FORM_TITLE = 'Form default title';
var OPT_DEFAULT_FIELD_DEFINITION = {};
var OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST = ['options', 'manifest', 'app'];

var notForm = function (_notBase) {
	inherits(notForm, _notBase);

	function notForm(input) {
		var _ret;

		classCallCheck(this, notForm);

		var _this = possibleConstructorReturn(this, (notForm.__proto__ || Object.getPrototypeOf(notForm)).call(this, input));

		if (!_this.getOptions('prefix')) {
			_this.setOptions('prefix', OPT_DEFAULT_FORM_PREFIX);
		}
		_this.setWorking('components', []);
		if (!_this.getData().isRecord) {
			_this.setData(new notRecord({}, _this.getData()));
		}
		_this.on('submit', _this.onSubmit.bind(_this));
		_this.on('reset', _this.onReset.bind(_this));
		_this.on('cancel', _this.onCancel.bind(_this));
		_this.render();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notForm, [{
		key: 'getManifest',
		value: function getManifest() {
			return this.getData().getManifest();
		}
	}, {
		key: 'getActionData',
		value: function getActionData() {
			var manifest = this.getManifest();
			if (manifest && manifest.actions) {
				return manifest.actions.hasOwnProperty(this.getOptions('action')) ? manifest.actions[this.getOptions('action')] : null;
			} else {
				return null;
			}
		}
	}, {
		key: 'getFormFieldsList',
		value: function getFormFieldsList() {
			var actionData = this.getActionData(),
			    list = [],
			    role = this.getOptions('role', OPT_DEFAULT_ROLE_NAME);
			if (actionData) {

				if (actionData.fields) {
					if (actionData.fields.hasOwnProperty(role)) {
						list = actionData.fields[role];
					}
				}
			}
			return list;
		}

		/*
  	Rendering
  */

	}, {
		key: 'render',
		value: function render() {
			this.renderWrapper();
		}
	}, {
		key: 'getPartTemplateName',
		value: function getPartTemplateName(formPart) {
			return this.getOptions('prefix') + formPart;
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			if (this.getWorking('wrapper')) {
				this.getWorking('wrapper').update();
			} else {
				var input = {
					data: this.getWrapperData(),
					template: {
						name: this.getPartTemplateName('wrapper')
					},
					options: {
						helpers: this.getOptions('helpers'),
						targetEl: this.getOptions('targetEl'),
						targetQuery: this.getOptions('targetQuery'),
						id: this.getOptions('id')
					},
					events: [['afterRender', this.bindFormEvents.bind(this)], [['afterRender', 'afterUpdate'], this.renderComponents.bind(this)]]
				};
				var wrapper = new notComponent(input);
				this.setWorking('wrapper', wrapper);
			}
		}
	}, {
		key: 'getWrapperData',
		value: function getWrapperData() {
			var actionData = this.getActionData();
			return {
				title: actionData.title ? actionData.title : OPT_DEFAULT_FORM_TITLE
			};
		}
	}, {
		key: 'renderComponents',
		value: function renderComponents() {
			if (this.getWorking('components') && this.getWorking('components').length) {
				for (var t = 0; t < this.getWorking('components').length; t++) {
					this.getWorking('components')[t].component.update();
				}
			} else {
				for (var _t = 0; _t < this.getFormFieldsList().length; _t++) {
					var fieldName = this.getFormFieldsList()[_t];
					this.addFieldComponent(fieldName);
				}
			}
		}
	}, {
		key: 'clearFieldsComponents',
		value: function clearFieldsComponents() {
			var comps = this.getWorking('components');
			while (comps.length > 0) {
				comps[0].component.destroy();
				comps.splice(0, 1);
			}
		}
	}, {
		key: 'getFieldsLibs',
		value: function getFieldsLibs() {
			var result = {
				options: {},
				manifest: {},
				app: {}
			};
			if (this.getOptions('fields')) {
				result.options = this.getOptions('fields');
			}
			if (notCommon.getApp() && notCommon.getApp().getOptions('fields')) {
				result.app = notCommon.getApp().getOptions('fields');
			}
			if (this.getData().isRecord && this.getData().getManifest()) {
				result.manifest = this.getData().getManifest().fields;
			}
			return result;
		}
	}, {
		key: 'getFieldsDefinition',
		value: function getFieldsDefinition(fieldName) {
			var def = OPT_DEFAULT_FIELD_DEFINITION,
			    fieldsLibs = this.getFieldsLibs();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;

					if (fieldsLibs.hasOwnProperty(t) && fieldsLibs[t].hasOwnProperty(fieldName)) {
						return fieldsLibs[t][fieldName];
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return def;
		}
	}, {
		key: 'addFieldComponent',
		value: function addFieldComponent(fieldName) {
			var _this2 = this;

			var fieldType = this.getFieldsDefinition(fieldName);
			var rec = {
				field: {
					name: fieldName,
					title: fieldType.label || fieldType.placeholder,
					type: fieldType.type,
					label: fieldType.label,
					array: fieldType.array,
					default: fieldType.default,
					placeholder: fieldType.placeholder,
					options: this.getOptions(notPath$1.join('helpers', 'libs', fieldName))
				}
			};
			var helpers = notCommon.extend({
				isChecked: function isChecked(params) {
					return params.item.value === _this2.getData(fieldName);
				},
				field: rec.field,
				data: this.getData()

			}, this.getOptions('helpers'));
			rec.component = new notComponent({
				data: this.getData(),
				template: {
					name: this.getPartTemplateName(fieldType.type)
				},
				options: {
					helpers: helpers,
					targetEl: this.getFormTargetElement(fieldType.target),
					renderAnd: 'placeLast',
					events: [['afterDataChange', this.collectDataFromComponents.bind(this)]]
				}
			});
			this.getWorking('components').push(rec);
		}
	}, {
		key: 'collectDataFromComponents',
		value: function collectDataFromComponents(params) {
			notCommon.log('collect data from components', params);
		}
	}, {
		key: 'getFormTargetElement',
		value: function getFormTargetElement() {
			var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

			if (!target) {
				target = 'body';
			}
			var res = this.getOptions('targetEl').querySelector('[role="' + target + '"]');
			if (!res && target !== 'body') {
				target = 'body';
				res = this.getOptions('targetEl').querySelector('[role="' + target + '"]');
			}
			if (!res && target == 'body') {
				return this.getOptions('targetEl');
			} else {
				return res;
			}
		}

		/*
  	Data management
  */

	}, {
		key: 'collectData',
		value: function collectData() {
			//let data = this.collectDataFromComponents.bind(this);
		}
	}, {
		key: 'bindFormEvents',
		value: function bindFormEvents() {
			var targetQuery = this.getOptions('targetQuery');
			if (targetQuery) {
				var target = document.querySelector(targetQuery);
				if (target) {
					this.setOptions('targetEl', target);
				}
			}
			if (this.getOptions('targetEl')) {
				var form = this.getOptions('targetEl').querySelector('form');
				if (form) {
					form.addEventListener('submit', this.onSubmit.bind(this));
					form.addEventListener('reset', this.onReset.bind(this));
				}
			}
		}
	}, {
		key: 'updateField',
		value: function updateField(fieldName) {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				if (this.getWorking('components')[t].field.name === fieldName) {
					this.getWorking('components')[t].component.update();
				}
			}
		}
	}, {
		key: 'update',
		value: function update() {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				this.getWorking('components')[t].component.update();
			}
		}

		/*
  	Event handlers
  */

	}, {
		key: 'onSubmit',
		value: function onSubmit() {}
	}, {
		key: 'onCancel',
		value: function onCancel() {}
	}, {
		key: 'onReset',
		value: function onReset() {}
	}, {
		key: 'getFields',
		value: function getFields() {}
	}, {
		key: 'addField',
		value: function addField() {}
	}, {
		key: 'removeField',
		value: function removeField() {}
	}]);
	return notForm;
}(notBase);

var OPT_DEFAULT_VIEW = 'edit';
var OPT_DEFAULT_ACTION = 'create';
var OPT_DEFAULT_ITEM = {
	_id: null,
	title: 'Title',
	value: 'Value'
};

var CRUDCreate = function (_notController) {
	inherits(CRUDCreate, _notController);

	function CRUDCreate(parent, params) {
		var _ret;

		classCallCheck(this, CRUDCreate);

		var _this = possibleConstructorReturn(this, (CRUDCreate.__proto__ || Object.getPrototypeOf(CRUDCreate)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Create');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.create.name') || OPT_DEFAULT_VIEW,
				common: _this.parent.getOptions('views.create.common') || true,
				targetQuery: _this.parent.getOptions('views.create.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});
		_this.preloadLib(_this.parent.getOptions('views.create.preload')).then(_this.initData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderForm.bind(_this)).then(function () {
			_this.trigger('afterRender');
		}).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDCreate, [{
		key: 'createDefault',
		value: function createDefault() {
			if (this.parent.getOptions('views.create.defaultItem') && this.parent.getModuleName() && this.parent.make[this.parent.getModuleName()]) {
				return this.parent.make[this.parent.getModuleName()](notCommon.extend({}, this.parent.getOptions('views.create.defaultItem')));
			} else if (this.parent.initItem) {
				return this.parent.initItem();
			} else if (this.parent.getModuleName() && this.parent.make[this.parent.getModuleName()]) {
				return this.parent.make[this.parent.getModuleName()](notCommon.extend({}, OPT_DEFAULT_ITEM));
			} else {
				return new notRecord({}, notCommon.extend({}, OPT_DEFAULT_ITEM));
			}
		}
	}, {
		key: 'initData',
		value: function initData() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				try {
					_this2.setData(_this2.createDefault());
					resolve(_this2.getData());
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			return this.render('default', {}, {});
		}
	}, {
		key: 'renderForm',
		value: function renderForm() {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				_this3.form = new notForm({
					data: _this3.getData(),
					options: {
						action: _this3.parent.getOptions('views.create.action') || OPT_DEFAULT_ACTION,
						targetQuery: _this3.parent.getOptions('views.create.targetQuery') || _this3.parent.getOptions('targetQuery'),
						targetEl: document.querySelector(_this3.parent.getOptions('views.create.targetQuery') || _this3.parent.getOptions('targetQuery')),
						prefix: _this3.parent.getOptions('views.create.prefix') || _this3.parent.getOptions('prefix'),
						role: _this3.parent.getOptions('views.create.role') || _this3.parent.getOptions('role'),
						helpers: notCommon.extend({
							linkBackToList: _this3.parent.linkBackToList(),
							file: function file(params) {
								var files = params.e.target.files || params.e.dataTransfer.files;
								notCommon.log('file changed', files);
								if (params.helpers.field.name && files) {
									_this3.queeUpload(params.helpers.field.name, files);
								}
							},
							submit: function submit() {
								notCommon.log('submit form ', _this3.newItem);
								_this3.execUploads(_this3.getData()).then(_this3.create.bind(_this3));
							},
							afterSubmit: function afterSubmit() {
								_this3.goToTable();
							},
							libs: _this3.getOptions('libs')
						}, _this3.parent.getOptions('views.create.helpers') || {})
					},
					events: [['afterRender', resolve], [['afterSubmit', 'afterRestore'], _this3.parent.backToList.bind(_this3.parent)]]
				});
			});
		}
	}, {
		key: 'create',
		value: function create(item) {
			var _this4 = this;

			item['$' + this.parent.getOptions('views.create.action')]().then(function (result) {
				notCommon.log('form saved', result);
				_this4.parent.app.getWorking('router').navigate(_this4.parent.getModuleName());
			}).catch(function (result) {
				notCommon.error('form not saved', result);
			});
		}
	}]);
	return CRUDCreate;
}(notController);

var OPT_DEFAULT_PAGE_SIZE = 20;
var OPT_DEFAULT_PAGE_NUMBER = 0;
var OPT_DEFAULT_SORT_DIRECTION = 1;
var OPT_DEFAULT_SORT_FIELD = '_id';
var OPT_FIELD_NAME_PRE_PROC = 'preprocessor';

var notTable = function (_notBase) {
	inherits(notTable, _notBase);

	function notTable(input) {
		var _ret;

		classCallCheck(this, notTable);

		var _this = possibleConstructorReturn(this, (notTable.__proto__ || Object.getPrototypeOf(notTable)).call(this, input));

		_this.setWorking('filteredData', []);
		if (!_this.getData() || !Array.isArray(_this.getData('rows'))) {
			_this.setData({
				rows: []
			});
		}
		_this.resetPager();
		_this.resetFilter();
		_this.resetSorter();
		_this.render();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notTable, [{
		key: 'render',
		value: function render() {
			if (this.getWorking('component')) {
				this.getWorking('component').update();
			} else {
				var component = new notComponent({
					data: {},
					template: {
						name: 'table_wrapper'
					},
					options: {
						renderAnd: this.getOptions('renderAnd'),
						targetEl: this.getOptions('targetEl'),
						helpers: this.getOptions('helpers')
					},
					events: [[['afterRender', 'afterUpdate'], [this.initAutoloader.bind(this), this.renderInside.bind(this)]]]
				});
				this.setWorking('component', component);
			}
		}
	}, {
		key: 'renderInside',
		value: function renderInside() {
			this.renderHeader();
			this.updateData();
			this.renderBody();
			this.bindSearch();
			this.bindCustomBindings();
		}
	}, {
		key: 'renderHeader',
		value: function renderHeader() {
			var tableHeader = this.getOptions('targetEl').querySelector('thead tr');
			if (!tableHeader) return;
			var fields = this.getOptions('fields');
			for (var i = 0; i < fields.length; i++) {
				var newTh = document.createElement('TH');
				newTh.innerHTML = fields[i].title;
				if (fields[i].hasOwnProperty('sortable') && fields[i].sortable) {
					this.attachSortingHandlers(newTh, fields[i].path);
				}
				tableHeader.appendChild(newTh);
			}
		}
	}, {
		key: 'attachSortingHandlers',
		value: function attachSortingHandlers(headCell, fieldName) {
			var _this2 = this;

			headCell.addEventListener('click', function (e) {
				e.preventDefault();
				_this2.changeSortingOptions(headCell, fieldName);
				return false;
			});
			headCell.style.cursor = 'pointer';
		}
	}, {
		key: 'changeSortingOptions',
		value: function changeSortingOptions(el, fieldName) {
			if (fieldName === this.getSorter().sortByField) {
				this.setSorter({
					sortByField: fieldName,
					sortDirection: -1 * this.getSorter().sortDirection
				});
			} else {
				this.setSorter({
					sortByField: fieldName,
					sortDirection: OPT_DEFAULT_SORT_DIRECTION
				});
			}
			if (el.parentNode) {
				for (var i = 0; i < el.parentNode.children.length; i++) {
					if (el.parentNode.children[i] === el) {
						continue;
					}
					el.parentNode.children[i].classList.remove('sorting_asc');
					el.parentNode.children[i].classList.remove('sorting_desc');
					el.parentNode.children[i].setAttribute('aria-sort', 'none');
				}
			}
			if (this.getSorter().sortDirection > 0) {
				el.classList.remove('sorting_desc');
				el.classList.add('sorting_asc');
				el.setAttribute('aria-sort', 'ascending');
			} else {
				el.classList.remove('sorting_asc');
				el.classList.add('sorting_desc');
				el.setAttribute('aria-sort', 'descending');
			}
		}
	}, {
		key: 'setSorter',
		value: function setSorter(hash) {
			//console.log('setSorter', hash);
			this.setWorking('sorter', hash);
			this.invalidateData();
			this.updateData();
		}
	}, {
		key: 'resetSorter',
		value: function resetSorter() {
			this.setSorter({
				sortByField: OPT_DEFAULT_SORT_FIELD,
				sortDirection: OPT_DEFAULT_SORT_DIRECTION
			});
		}
	}, {
		key: 'getSorter',
		value: function getSorter() {
			return this.getWorking('sorter');
		}
	}, {
		key: 'getFilterSearch',
		value: function getFilterSearch() {
			return typeof this.getFilter() !== 'undefined' && this.getFilter() !== null && typeof this.getFilter().filterSearch !== 'undefined' && this.getFilter().filterSearch !== null ? this.getFilter().filterSearch.toString() : '';
		}
	}, {
		key: 'invalidateData',
		value: function invalidateData() {
			if (this.getOptions('liveLoad') && this.getOptions('onePager')) {
				if (this.getData('rows').length > 0) {
					this.getData('rows').splice(0, this.getData('rows').length);
				}
				this.resetPager();
			}
		}
	}, {
		key: 'setFilter',
		value: function setFilter(hash) {
			this.setWorking('filter', hash);
			this.invalidateData();
			this.updateData();
		}
	}, {
		key: 'resetFilter',
		value: function resetFilter() {
			this.setFilter({});
			this.updateData();
		}
	}, {
		key: 'getFilter',
		value: function getFilter() {
			return this.getWorking('filter');
		}
	}, {
		key: 'setPager',
		value: function setPager(hash) {
			this.setWorking('pager', hash);
			this.updateData();
		}
	}, {
		key: 'resetPager',
		value: function resetPager() {
			this.setWorking('pager', {
				pageSize: isNaN(this.getOptions('pageSize')) ? OPT_DEFAULT_PAGE_SIZE : this.getOptions('pageSize'),
				pageNumber: isNaN(this.getOptions('pageNumber')) ? OPT_DEFAULT_PAGE_NUMBER : this.getOptions('pageNumber')
			});
		}
	}, {
		key: 'getPager',
		value: function getPager() {
			return this.getWorking('pager');
		}
	}, {
		key: 'setUpdating',
		value: function setUpdating() {
			this.setWorking('updating', true);
		}
	}, {
		key: 'setUpdated',
		value: function setUpdated() {
			this.setWorking('updating', false);
		}
	}, {
		key: 'ifUpdating',
		value: function ifUpdating() {
			return this.getWorking('updating');
		}
	}, {
		key: 'updateData',
		value: function updateData() {
			var _this3 = this;

			if (this.getOptions('liveLoad') && this.getOptions('interface')) {
				if (this.ifUpdating()) {
					return;
				}
				//load from server
				var query = this.getOptions('interface')({}).setFilter(this.getFilter()).setSorter(this.getSorter()).setPager(this.getPager().pageSize, this.getPager().pageNumber);
				this.setUpdating();
				query.$list().then(function (data) {
					//console.log('$list for table', data);
					_this3.setData({
						rows: _this3.getData('rows').concat(data)
					});
					_this3.proccessData();
					_this3.refreshBody();
					_this3.setUpdated();
				}).catch(function (e) {
					notCommon.error(e);
					_this3.setUpdated();
				});
			} else {
				//local magic
				this.setUpdating();
				this.proccessData();
				this.refreshBody();
				this.setUpdated();
			}
		}
	}, {
		key: 'proccessData',
		value: function proccessData() {
			var thatFilter = this.getFilter();
			if (typeof thatFilter !== 'undefined' && thatFilter !== null && typeof thatFilter.filterSearch !== 'undefined' && thatFilter.filterSearch !== null && thatFilter.filterSearch.length > 0) {
				//
				this.setWorking('filteredData', this.getData('rows').filter(this.testDataItem.bind(this)));
			} else {
				this.setWorking('filteredData', this.getData('rows'));
			}
			////sorter
			var thatSorter = this.getSorter();
			if (typeof thatSorter !== 'undefined' && thatSorter !== null) {
				this.getWorking('filteredData').sort(function (item1, item2) {
					var t1 = notPath$1.get(thatSorter.sortByField, item1, {}),
					    t2 = notPath$1.get(thatSorter.sortByField, item2, {});
					if (isNaN(t1)) {
						if (typeof t1 !== 'undefined' && typeof t2 !== 'undefined' && t1.localeCompare) {
							return t1.localeCompare() * -thatSorter.sortDirection;
						} else {
							return 0;
						}
					} else {
						return (t1 < t2 ? 1 : -1) * thatSorter.sortDirection;
					}
				});
			}
		}
	}, {
		key: 'bindSearch',
		value: function bindSearch() {
			var _this4 = this;

			var searchEl = this.getOptions('targetEl').querySelectorAll('input[name="search"]')[0];
			if (!searchEl) return;
			var onEvent = function onEvent(e) {
				_this4.setFilter({
					filterSearch: e.currentTarget.value
				});
				return true;
			};
			searchEl.addEventListener('keyup', onEvent);
			searchEl.addEventListener('enter', onEvent);
		}
	}, {
		key: 'bindCustomBindings',
		value: function bindCustomBindings() {
			if (!this.getOptions('bindings') || !this.getOptions('bindings')) {
				return;
			}
			for (var selector in this.getOptions('bindings')) {
				var els = this.getOption('targetEl').querySelectorAll(selector);
				for (var elId = 0; elId < els.length; elId++) {
					var el = els[elId];
					for (var event in this.getOptions('bindings')[selector]) {
						el.addEventListener(event, this.getOptions('bindings')[selector][event]);
					}
				}
			}
		}
	}, {
		key: 'loadNext',
		value: function loadNext() {
			this.getWorking('pager').pageNumber++;
			this.updateData();
		}
	}, {
		key: 'renderRow',
		value: function renderRow(item, index) {
			var _this5 = this;

			var newRow = document.createElement('TR'),
			    fields = this.getOptions('fields');

			var _loop = function _loop() {
				var newTd = document.createElement('TD'),
				    field = fields[i],
				    preprocessed = null,
				    val = notPath$1.get(field.path, item, _this5.getOptions('helpers'));
				if (field.hasOwnProperty('editable') && !field.hasOwnProperty('component')) {
					newTd.setAttribute('contentEditable', true);
					newTd.dataset.path = field.path;
					newTd.dataset.itemId = item[_this5.getOptions('itemIdField')];
					newTd.dataset.value = val;
					newTd.addEventListener('blur', function () {
						notPath$1.set(field.path, item, _this5.getOptions('helpers'), newTd.textContent);
						_this5.updateData();
					});
				}

				if (field.hasOwnProperty(OPT_FIELD_NAME_PRE_PROC)) {
					preprocessed = field[OPT_FIELD_NAME_PRE_PROC](val, item, index);
				}

				if (field.hasOwnProperty('component')) {
					new notComponent({
						data: field.component.data || preprocessed || {
							val: val,
							item: item,
							index: index
						},
						template: field.component.template,
						options: {
							targetEl: newTd,
							helpers: _this5.getOptions('helpers')
						},
						events: field.component.events || []
					});
				} else {
					newTd.innerHTML = preprocessed || val;
				}

				if (field.hasOwnProperty('style')) {
					for (var style in field.style) {
						if (field.style.hasOwnProperty(style)) {
							newTd.style[style] = field.style[style];
						}
					}
				}

				if (field.hasOwnProperty('events') && field.events) {
					for (j in field.events) {
						newTd.addEventListener(j, function (e) {
							e.preventDefault();
							return field.events[j]({
								event: e,
								element: newTd,
								item: item,
								value: val,
								field: field
							});
						}, false);
					}
				}
				newRow.appendChild(newTd);
			};

			for (var i = 0; i < fields.length; i++) {
				var j;

				_loop();
			}
			if (this.getOptions('procRow')) {
				return this.getOptions('procRow')(newRow, item);
			}
			return newRow;
		}
	}, {
		key: 'refreshBody',
		value: function refreshBody() {
			var tbody = this.findBody();
			if (!tbody) {
				return;
			}
			this.clearBody();
			this.checkFiltered();
			var thisPageStarts = 0,
			    nextPageEnds = this.getPager().pageSize * (this.getPager().pageNumber + 1);
			for (var i = thisPageStarts; i < Math.min(nextPageEnds, this.getWorking('filteredData').length); i++) {
				tbody.appendChild(this.renderRow(this.getWorking('filteredData')[i]));
			}
		}
	}, {
		key: 'findBody',
		value: function findBody() {
			return this.getOptions('targetEl').querySelector('tbody');
		}
	}, {
		key: 'clearBody',
		value: function clearBody() {
			var tableBody = this.findBody();
			if (!tableBody) return;
			tableBody.innerHTML = '';
		}
	}, {
		key: 'checkFiltered',
		value: function checkFiltered() {
			if (!Array.isArray(this.getWorking('filteredData'))) {
				this.setWorking('filteredData', []);
			}
		}
	}, {
		key: 'renderBody',
		value: function renderBody() {
			if (!this.getOptions('onePager')) {
				this.clearBody();
			}
			this.checkFiltered();

			var thisPageStarts = this.getPager().pageSize * this.getPager().pageNumber,
			    nextPageEnds = this.getPager().pageSize * (this.getPager().pageNumber + 1),
			    tbody = this.findBody();

			for (var i = thisPageStarts; i < Math.min(nextPageEnds, this.getWorking('filteredData').length); i++) {
				tbody.appendChild(this.renderRow(this.getWorking('filteredData')[i]));
			}
		}
	}, {
		key: 'testDataItem',
		value: function testDataItem(item) {
			var strValue = this.getFilterSearch().toLowerCase();
			for (var k in item) {
				var toComp = item[k].toString().toLowerCase();
				if (toComp.indexOf(strValue) > -1) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: 'initAutoloader',
		value: function initAutoloader() {
			if (jQuery && jQuery.scrollSpy && !this.getWorking('live')) {
				console.log('autoload possible');
				if (this.getOptions('liveLoad') && this.getOptions('onePager') && this.getOptions('footerQuery')) {
					var t = $(this.getOptions('footerQuery'));
					if (t) {
						t.on('scrollSpy:enter', this.loadNext.bind(this));
						t.scrollSpy();
						this.setWorking('live', true);
					}
				}
			}
		}
	}]);
	return notTable;
}(notBase);

var OP_DEFAULT_PAGE_SIZE = 50;
var OPT_DEFAULT_VIEW$1 = 'list';

var CRUDList = function (_notController) {
	inherits(CRUDList, _notController);

	function CRUDList(parent, params) {
		var _ret;

		classCallCheck(this, CRUDList);

		var _this = possibleConstructorReturn(this, (CRUDList.__proto__ || Object.getPrototypeOf(CRUDList)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD List');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.list.name') || OPT_DEFAULT_VIEW$1,
				common: _this.parent.getOptions('views.list.common') || true,
				targetQuery: parent.getOptions('views.list.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});
		_this.preloadLib(_this.parent.getOptions('views.list.preload')).then(_this.renderWrapper.bind(_this)).then(_this.updateDatatable.bind(_this)).then(function () {
			_this.trigger('afterRender');
		}).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDList, [{
		key: 'renderWrapper',
		value: function renderWrapper() {
			var _this2 = this;

			return this.render('default', {}, {
				title: this.parent.getOptions('names.plural'),
				showAddForm: function showAddForm() {
					_this2.parent.app.getWorking('router').navigate([_this2.parent.getModuleName(), 'create'].join('/'));
				},
				linkBackToList: this.parent.linkBackToList.bind(this.parent)
			});
		}
	}, {
		key: 'updateDatatable',
		value: function updateDatatable() {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				try {
					_this3.tableView = new notTable({
						options: {
							fields: _this3.parent.getOptions('views.list.fields'),
							targetEl: document.querySelector(_this3.parent.getOptions('views.list.targetQuery') || _this3.parent.getOptions('targetQuery')),
							helpers: notCommon.extend({
								title: _this3.parent.getOptions('names.plural')
							}, _this3.parent.getOptions('views.list.helpers') || {}),
							pageSize: _this3.app.getOptions('pager.size') || OP_DEFAULT_PAGE_SIZE,
							pageNumber: 0,
							onePager: true,
							liveLoad: true,
							footerQuery: _this3.parent.getOptions('views.list.footerQuery'),
							interface: _this3.make[_this3.parent.getModuleName()]
						},
						events: [['afterRender', resolve]]
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'showNextPage',
		value: function showNextPage() {
			if (this.tableView) {
				this.tableView.loadNext();
			}
		}
	}]);
	return CRUDList;
}(notController);

var OPT_DEFAULT_LOAD_ACTION = 'getRaw';
var OPT_DEFAULT_ACTION$1 = 'update';
var OPT_DEFAULT_VIEW$2 = 'edit';

var CRUDUpdate = function (_notController) {
	inherits(CRUDUpdate, _notController);

	function CRUDUpdate(parent, params) {
		var _ret;

		classCallCheck(this, CRUDUpdate);

		var _this = possibleConstructorReturn(this, (CRUDUpdate.__proto__ || Object.getPrototypeOf(CRUDUpdate)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Update');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.update.name') || OPT_DEFAULT_VIEW$2,
				common: _this.parent.getOptions('views.update.common') || true,
				targetQuery: _this.parent.getOptions('views.update.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});

		_this.preloadLib(_this.parent.getOptions('views.update.preload')).then(_this.loadItem.bind(_this)).then(_this.setData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderForm.bind(_this)).then(function () {
			_this.trigger('afterRender');
		}).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDUpdate, [{
		key: 'loadItem',
		value: function loadItem() {
			return this.make[this.parent.getModuleName()]({
				'_id': this.getOptions('params.0')
			})['$' + (this.parent.getOptions('views.update.loadAction') || OPT_DEFAULT_LOAD_ACTION)]();
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			return this.render('default', this.getData(), {});
		}
	}, {
		key: 'renderForm',
		value: function renderForm() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				try {
					_this2.form = new notForm({
						data: _this2.getData(),
						options: {
							action: _this2.parent.getOptions('views.update.action') || OPT_DEFAULT_ACTION$1,
							targetQuery: _this2.parent.getOptions('views.update.targetQuery') || _this2.parent.getOptions('targetQuery'),
							prefix: _this2.parent.getOptions('views.update.prefix') || _this2.parent.getOptions('prefix'),
							role: _this2.parent.getOptions('views.update.role') || _this2.parent.getOptions('role'),
							data: _this2.getData(),
							helpers: notCommon.extend({
								file: function file(params) {
									var files = params.e.target.files || params.e.dataTransfer.files;
									notCommon.log('file changed', files);
									if (params.helpers.field.name && files) {
										_this2.queeUpload(params.helpers.field.name, files);
									}
								},
								submit: function submit(params) {
									notCommon.log('submit form ', params.item);
									_this2.execUploads(params.item).then(_this2.update.bind(_this2));
								},
								libs: _this2.getOptions('libs'),
								afterSubmit: _this2.parent.backToList.bind(_this2.parent)
							}, _this2.parent.getOptions('views.update.helpers') || {})
						},
						events: [[['afterRestore', 'afterSubmit'], _this2.parent.backToList.bind(_this2.parent)], ['afterRender', resolve]]
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'update',
		value: function update(item) {
			var _this3 = this;

			item['$' + (this.parent.getOptions('views.update.action') || OPT_DEFAULT_ACTION$1)]().then(function (result) {
				notCommon.log('form saved', result);
				_this3.parent.app.getWorking('router').navigate(_this3.getModuleName());
				_this3.parent.runList();
			}).catch(function (result) {
				notCommon.error('form not saved', result);
			});
		}
	}]);
	return CRUDUpdate;
}(notController);

var OPT_DEFAULT_ACTION$2 = 'delete';

var CRUDDelete = function (_notController) {
	inherits(CRUDDelete, _notController);

	function CRUDDelete(parent, params) {
		var _ret;

		classCallCheck(this, CRUDDelete);

		var _this = possibleConstructorReturn(this, (CRUDDelete.__proto__ || Object.getPrototypeOf(CRUDDelete)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Delete');
		_this.preloadLib(_this.parent.getOptions('views.delete.preload')).then(function () {
			if (confirm('Удалить запись?')) {
				_this.delete();
			} else {
				_this.parent.backToList();
			}
		});

		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDDelete, [{
		key: 'delete',
		value: function _delete() {
			var action = '$' + (this.parent.getOptions('views.delete.action') || OPT_DEFAULT_ACTION$2);
			this.make[this.parent.getModuleName()]({ '_id': this.getOptions('params.0') })[action]().then(this.parent.backToList.bind(this.parent)).catch(notCommon.report);
		}
	}]);
	return CRUDDelete;
}(notController);

var OPT_DEFAULT_DETAILS_PREFIX = 'details_';
var OPT_DEFAULT_ROLE_NAME$1 = 'default';
var OPT_DEFAULT_DETAILS_TITLE = 'Details default title';
var OPT_DEFAULT_FIELD_DEFINITION$1 = {};
var OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST$1 = ['options', 'manifest', 'app'];

var notDetails = function (_notBase) {
	inherits(notDetails, _notBase);

	function notDetails(input) {
		var _ret;

		classCallCheck(this, notDetails);

		var _this = possibleConstructorReturn(this, (notDetails.__proto__ || Object.getPrototypeOf(notDetails)).call(this, input));

		if (!_this.getOptions('prefix')) {
			_this.setOptions('prefix', OPT_DEFAULT_DETAILS_PREFIX);
		}
		_this.setWorking('components', []);
		if (!_this.getData().isRecord) {
			_this.setData(new notRecord({}, _this.getData()));
		}
		_this.render();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notDetails, [{
		key: 'getManifest',
		value: function getManifest() {
			return this.getData().getManifest();
		}
	}, {
		key: 'getActionData',
		value: function getActionData() {
			var manifest = this.getManifest();
			if (manifest && manifest.actions) {
				return manifest.actions.hasOwnProperty(this.getOptions('action')) ? manifest.actions[this.getOptions('action')] : null;
			} else {
				return null;
			}
		}
	}, {
		key: 'getFieldsList',
		value: function getFieldsList() {
			var actionData = this.getActionData(),
			    list = [],
			    role = this.getOptions('role', OPT_DEFAULT_ROLE_NAME$1);
			if (actionData) {
				if (actionData.fields) {
					if (actionData.fields.hasOwnProperty(role)) {
						list = actionData.fields[role];
					}
				}
			}
			return list;
		}
	}, {
		key: 'render',
		value: function render() {
			this.renderWrapper();
		}
	}, {
		key: 'getPartTemplateName',
		value: function getPartTemplateName(formPart) {
			return this.getOptions('prefix') + formPart;
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			if (this.getWorking('wrapper')) {
				this.getWorking('wrapper').update();
			} else {
				var input = {
					data: this.getWrapperData(),
					template: {
						name: this.getPartTemplateName('wrapper')
					},
					options: {
						helpers: this.getOptions('helpers'),
						targetEl: this.getOptions('targetEl'),
						targetQuery: this.getOptions('targetQuery'),
						id: this.getOptions('id')
					},
					events: [[['afterRender', 'afterUpdate'], this.renderComponents.bind(this)]]
				};
				var wrapper = new notComponent(input);
				this.setWorking('wrapper', wrapper);
			}
		}
	}, {
		key: 'getWrapperData',
		value: function getWrapperData() {
			var actionData = this.getActionData();
			return {
				title: actionData.title ? actionData.title : OPT_DEFAULT_DETAILS_TITLE
			};
		}
	}, {
		key: 'renderComponents',
		value: function renderComponents() {
			if (this.getWorking('components') && this.getWorking('components').length) {
				for (var t = 0; t < this.getWorking('components').length; t++) {
					this.getWorking('components')[t].component.update();
				}
			} else {
				for (var _t = 0; _t < this.getFieldsList().length; _t++) {
					var fieldName = this.getFieldsList()[_t];
					this.addFieldComponent(fieldName);
				}
			}
		}
	}, {
		key: 'clearFieldsComponents',
		value: function clearFieldsComponents() {
			var comps = this.getWorking('components');
			while (comps.length > 0) {
				comps[0].component.destroy();
				comps.splice(0, 1);
			}
		}
	}, {
		key: 'getFieldsLibs',
		value: function getFieldsLibs() {
			var result = {
				options: {},
				manifest: {},
				app: {}
			};
			if (this.getOptions('fields')) {
				result.options = this.getOptions('fields');
			}
			if (notCommon.getApp() && notCommon.getApp().getOptions('fields')) {
				result.app = notCommon.getApp().getOptions('fields');
			}
			if (this.getData().isRecord && this.getData().getManifest()) {
				result.manifest = this.getData().getManifest().fields;
			}
			return result;
		}
	}, {
		key: 'getFieldsDefinition',
		value: function getFieldsDefinition(fieldName) {
			var def = OPT_DEFAULT_FIELD_DEFINITION$1,
			    fieldsLibs = this.getFieldsLibs();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST$1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;

					if (fieldsLibs.hasOwnProperty(t) && fieldsLibs[t].hasOwnProperty(fieldName)) {
						return fieldsLibs[t][fieldName];
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return def;
		}
	}, {
		key: 'addFieldComponent',
		value: function addFieldComponent(fieldName) {
			var fieldType = this.getFieldsDefinition(fieldName),
			    rec = null;
			if (fieldType.component) {
				rec = this.castCustom(fieldName, fieldType);
			} else {
				rec = this.castCommon(fieldName, fieldType);
			}
			this.getWorking('components').push(rec);
		}
	}, {
		key: 'castCustom',
		value: function castCustom(fieldName, fieldType) {
			var _this2 = this;

			var CustomComponent = notFramework.notCommon.get('components')[fieldType.component];
			var rec = {
				field: {
					name: fieldName,
					title: fieldType.label || fieldType.placeholder,
					type: fieldType.type,
					label: fieldType.label,
					array: fieldType.array,
					default: fieldType.default,
					placeholder: fieldType.placeholder,
					options: this.getOptions(notPath$1.join('helpers', 'libs', fieldName))
				}
			};
			var helpers = notCommon.extend({
				isChecked: function isChecked(params) {
					return params.item.value === _this2.getData(fieldName);
				},
				field: rec.field,
				data: this.getData()
			}, this.getOptions('helpers'));

			rec.component = new CustomComponent({
				data: this.getData(),
				options: {
					helpers: helpers,
					targetEl: this.getTargetElement(fieldType.target),
					renderAnd: 'placeLast'
				}
			});
			return rec;
		}
	}, {
		key: 'castCommon',
		value: function castCommon(fieldName, fieldType) {
			var _this3 = this;

			var rec = {
				field: {
					name: fieldName,
					title: fieldType.label || fieldType.placeholder,
					type: fieldType.type,
					label: fieldType.label,
					array: fieldType.array,
					default: fieldType.default,
					placeholder: fieldType.placeholder,
					options: this.getOptions(notPath$1.join('helpers', 'libs', fieldName))
				}
			};
			var helpers = notCommon.extend({
				isChecked: function isChecked(params) {
					return params.item.value === _this3.getData(fieldName);
				},
				field: rec.field,
				data: this.getData()
			}, this.getOptions('helpers'));
			rec.component = new notComponent({
				data: this.getData(),
				template: {
					name: this.getPartTemplateName(fieldType.type)
				},
				options: {
					helpers: helpers,
					targetEl: this.getTargetElement(fieldType.target),
					renderAnd: 'placeLast'
				}
			});
			return rec;
		}
	}, {
		key: 'getTargetElement',
		value: function getTargetElement() {
			var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

			if (!target) {
				target = 'body';
			}
			var res = this.getOptions('targetEl').querySelector('[role="' + target + '"]');
			if (!res && target !== 'body') {
				target = 'body';
				res = this.getOptions('targetEl').querySelector('[role="' + target + '"]');
			}
			if (!res && target == 'body') {
				return this.getOptions('targetEl');
			} else {
				return res;
			}
		}

		/*
  	Data management
  */

	}, {
		key: 'updateField',
		value: function updateField(fieldName) {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				if (this.getWorking('components')[t].field.name === fieldName) {
					this.getWorking('components')[t].component.update();
				}
			}
		}
	}, {
		key: 'update',
		value: function update() {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				this.getWorking('components')[t].component.update();
			}
		}
	}]);
	return notDetails;
}(notBase);

var OPT_DEFAULT_LOAD_ACTION$1 = 'get';
var OPT_DEFAULT_VIEW$3 = 'details';

var CRUDDetails = function (_notController) {
	inherits(CRUDDetails, _notController);

	function CRUDDetails(parent, params) {
		var _ret;

		classCallCheck(this, CRUDDetails);

		var _this = possibleConstructorReturn(this, (CRUDDetails.__proto__ || Object.getPrototypeOf(CRUDDetails)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Details');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.details.name') || OPT_DEFAULT_VIEW$3,
				common: _this.parent.getOptions('views.details.common') || true,
				targetQuery: _this.parent.getOptions('views.details.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});

		_this.preloadLib(_this.parent.getOptions('views.details.preload')).then(_this.loadItem.bind(_this)).then(_this.setData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderDetails.bind(_this)).then(function () {
			_this.trigger('afterRender');
		}).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDDetails, [{
		key: 'loadItem',
		value: function loadItem() {
			return this.make[this.parent.getModuleName()]({
				'_id': this.getOptions('params.0')
			})['$' + (this.parent.getOptions('views.details.action') || OPT_DEFAULT_LOAD_ACTION$1)]();
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			var _this2 = this;

			var item = this.getData();
			var helpers = {
				ID: item ? item[this.parent.getModuleName() + 'ID'] : '',
				field: {
					array: false
				},
				update: function update(params) {
					_this2.app.getWorking('router').navigate([_this2.parent.getModuleName(), params.item._id, 'update'].join('/'));
				},
				delete: function _delete(params) {
					_this2.app.getWorking('router').navigate([_this2.parent.getModuleName(), params.item._id, 'delete'].join('/'));
				},
				linkBackToList: this.parent.linkBackToList.bind(this.parent),
				title: this.parent.getOptions('names.single')
			};
			return this.render('default', item, helpers);
		}
	}, {
		key: 'renderDetails',
		value: function renderDetails() {
			var _this3 = this;

			var item = this.getData();
			return new Promise(function (resolve, reject) {
				try {
					new notDetails({
						data: item,
						options: {
							targetQuery: _this3.parent.getOptions('views.details.targetQuery'),
							targetEl: document.querySelector(_this3.parent.getOptions('views.details.targetQuery') || _this3.parent.getOptions('targetQuery')),
							action: _this3.parent.getOptions('views.details.action') || OPT_DEFAULT_LOAD_ACTION$1,
							prefix: _this3.parent.getOptions('views.details.prefix') || _this3.parent.getOptions('prefix'),
							role: _this3.parent.getOptions('views.details.role') || _this3.parent.getOptions('role'),
							helpers: notCommon.extend({
								linkBackToList: _this3.parent.linkBackToList(),
								libs: _this3.getOptions('lib'),
								ID: item[_this3.parent.getModuleName() + 'ID'],
								__version: item.__version
							}, _this3.parent.getOptions('views.details.helpers') || {})
						},
						events: [['afterRender', resolve]]
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}]);
	return CRUDDetails;
}(notController);

var CRUDController = function (_notController) {
	inherits(CRUDController, _notController);

	function CRUDController(app, params) {
		var _ret;

		classCallCheck(this, CRUDController);

		notCommon.log('running CRUDController');

		var _this = possibleConstructorReturn(this, (CRUDController.__proto__ || Object.getPrototypeOf(CRUDController)).call(this, app));

		_this.setOptions('names', {
			plural: 'plural',
			single: 'single'
		});
		_this.setOptions('params', params);
		_this.setOptions('containerSelector', _this.app.getOptions('crud.containerSelector'));
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDController, [{
		key: 'route',
		value: function route() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			if (params.length == 1) {
				if (params[0] === 'create') {
					return this.runCreate(params);
				} else {
					return this.runDetails(params);
				}
			} else if (params.length == 2) {
				if (params[1] === 'delete') {
					return this.runDelete(params);
				} else if (params[1] === 'update') {
					return this.runUpdate(params);
				} else {
					var routeRunnerName = 'run' + notCommon.capitalizeFirstLetter(params[0]);
					if (this[routeRunnerName] && typeof this[routeRunnerName] === 'function') {
						return this[routeRunnerName](params);
					}
				}
			}
			return this.runList(params);
		}
	}, {
		key: 'runCreate',
		value: function runCreate() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDCreate(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runList',
		value: function runList() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDList(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runDetails',
		value: function runDetails() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDDetails(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runDelete',
		value: function runDelete() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDDelete(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runUpdate',
		value: function runUpdate() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDUpdate(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'onAfterRender',
		value: function onAfterRender() {
			this.trigger('afterRender');
		}
	}, {
		key: 'backToList',
		value: function backToList() {
			this.app.getWorking('router').navigate(this.getModuleName());
		}
	}, {
		key: 'linkBackToList',
		value: function linkBackToList() {
			return this.getModuleName();
		}
	}]);
	return CRUDController;
}(notController);

var notTemplateProcessorsLib = {
	content: function content(scope, item, helpers) {
		scope.attributeResult = notPath$1.parseSubs(scope.attributeExpression, item, helpers);
		if (scope.params.indexOf('capitalize') > -1) {
			scope.attributeResult = scope.attributeResult.toUpperCase();
		}
		scope.element.textContent = scope.attributeResult;
	},
	bind: function bind(scope, item, helpers) {
		if (scope.element.binds) {
			if (scope.element.binds.hasOwnProperty(scope.params[0])) {
				if (scope.element.binds[scope.params[0]].indexOf(scope.attributeExpression) > -1) {
					return;
				}
			}
		}
		scope.element.addEventListener(scope.params[0], function (e) {
			if (scope.params.length === 1 || scope.params[1] !== 'default') {
				e.preventDefault();
			}
			if (scope.attributeResult) {
				return scope.attributeResult({
					scope: scope,
					item: item,
					helpers: helpers,
					e: e
				});
			} else {
				return true;
			}
		}, false);
		if (!scope.element.hasOwnProperty('binds')) {
			scope.element.binds = {};
		}
		if (!scope.element.binds.hasOwnProperty(scope.params[0])) {
			scope.element.binds[scope.params[0]] = [];
		}
		if (scope.element.binds[scope.params[0]].indexOf(scope.attributeExpression) === -1) {
			scope.element.binds[scope.params[0]].push(scope.attributeExpression);
		}
	},
	value: function value(scope, item, helpers) {
		var liveEvents = ['change', 'keyup'],
		    onEvent = function onEvent() {
			if (['checkbox', 'radio', 'select-multiple'].indexOf(scope.element.type) > -1) {
				switch (scope.element.type) {
					case 'checkbox':
						{
							notPath$1.set(scope.attributeExpression, item, helpers, scope.element.checked);
						}
						break;
					case 'radio':
						{
							//console.log(helpers.field.name, helpers.data, helpers, scope.element.checked?scope.element.value:null);
							notPath$1.set(helpers.field.name, helpers.data, helpers, scope.element.checked ? scope.element.value : null);
						}
						break;
					case 'select-multiple':
						{
							var selected = [].slice.call(scope.element.selectedOptions).map(function (a) {
								return a.value;
							});
							//console.log('select-multiple', selected);
							notPath$1.set(scope.attributeExpression, item, helpers, selected);
						}
						break;
				}
			} else {
				//console.log(notPath.get(scope.attributeExpression, item, helpers), ' -> ',scope.element.value);
				notPath$1.set(scope.attributeExpression, item, helpers, scope.element.value);
			}
		};
		scope.element.setAttribute('value', notPath$1.get(scope.attributeExpression, item, helpers));
		if (scope.element.processedValue !== true) {
			if (scope.element.type === 'textarea') {
				scope.element.innerHTML = notPath$1.get(scope.attributeExpression, item, helpers);
			}
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = liveEvents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;

					scope.element.addEventListener(t, onEvent);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			scope.element.processedValue = true;
		}
	},
	attr: function attr(scope, item, helpers) {
		var res = notPath$1.get(scope.attributeExpression, item, helpers) || notPath$1.parseSubs(scope.attributeExpression, item, helpers);
		scope.attributeResult = typeof res === 'function' ? res({
			scope: scope,
			item: item,
			helpers: helpers
		}) : res;
		scope.element.setAttribute(scope.params[0], scope.attributeResult);
	},
	name: function name(scope, item, helpers) {
		scope.element.setAttribute('name', notPath$1.get(scope.attributeExpression, item, helpers));
	},
	change: function change() /*scope, item, helpers*/{},
	checked: function checked(scope, item, helpers) {
		var result = notPath$1.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = typeof result === 'function' ? result({
			scope: scope,
			item: item,
			helpers: helpers
		}) : result;
		scope.attributeResult ? scope.element.setAttribute('checked', true) : scope.element.removeAttribute('checked');
	},
	class: function _class(scope, item, helpers) {
		var res = notPath$1.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = typeof res === 'function' ? res({
			scope: scope,
			item: item,
			helpers: helpers
		}) : res;
		if (scope.params.length < 3 || isNaN(scope.attributeResult)) {
			if (scope.attributeResult) {
				scope.element.classList.add(scope.params[0]);
				if (scope.params.length > 1) {
					scope.element.classList.remove(scope.params[1]);
				}
			} else {
				scope.element.classList.remove(scope.params[0]);
				if (scope.params.length > 1) {
					scope.element.classList.add(scope.params[1]);
				}
			}
		} else {
			var used = false;
			for (var i = 0; i < scope.params.length; i++) {
				if (i === scope.attributeResult) {
					scope.element.classList.add(scope.params[i]);
					used = true;
				} else {
					scope.element.classList.remove(scope.params[i]);
				}
			}
			if (!used) {
				scope.element.classList.add(scope.params[0]);
			}
		}
	},
	options: function options(scope, item, helpers) {
		var i = 0,
		    option = null,
		    valueFieldName = 'value',
		    labelFieldName = 'name',
		    itemValueFieldName = helpers.hasOwnProperty('field') && helpers.field.hasOwnProperty('name') ? helpers.field.name : 'value';
		scope.element.innerHTML = '';
		if (scope.params.length === 2) {
			labelFieldName = scope.params[0];
			valueFieldName = scope.params[1];
		}
		if (scope.params.length === 3) {
			labelFieldName = scope.params[0];
			valueFieldName = scope.params[1];
			itemValueFieldName = scope.params[2];
		}
		if (typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty('default') && helpers.default) {
			option = document.createElement('option');
			option.setAttribute('value', '');
			option.textContent = helpers.placeholder;
			scope.element.appendChild(option);
		}
		if (typeof item !== 'undefined' && item !== null) {
			var lib = notPath$1.get(scope.attributeExpression, item, helpers);
			for (i = 0; i < lib.length; i++) {
				option = document.createElement('option');
				option.setAttribute('value', lib[i][valueFieldName]);
				option.textContent = lib[i][labelFieldName];
				if (helpers.field.array) {
					if (item[itemValueFieldName] && Array.isArray(item[itemValueFieldName])) {
						if (item[itemValueFieldName].indexOf(lib[i][valueFieldName]) > -1) {
							option.setAttribute('selected', true);
						}
					}
				} else {
					if (item[itemValueFieldName] === lib[i][valueFieldName]) {
						option.setAttribute('selected', true);
					}
				}
				scope.element.appendChild(option);
			}
		}
	},
	href: function href(scope, item, helpers) {
		if (!scope.element.notRouterInitialized) {
			scope.attributeResult = notPath$1.parseSubs(scope.attributeExpression, item, helpers);
			scope.element.setAttribute('href', notRouter$1.getFullRoute(scope.attributeResult));
			scope.element.addEventListener('click', function (e) {
				e.preventDefault();
				notRouter$1.navigate(notPath$1.parseSubs(scope.attributeExpression, item, helpers));
				return false;
			});
			scope.element.notRouterInitialized = true;
		}
	}

};

/*
	Common functions
*/
/*
	framework wide parser for data access
*/
/*
	basic event handlers and core data modifiers
*/
/*
	smarter image control
*/
/*
	application main infrastructure setter
*/
/*
	user controllers
*/
/*
	templating and common structures
*/

notTemplateProcessors$1.add(notTemplateProcessorsLib);

exports.notCommon = notCommon;
exports.notPath = notPath$1;
exports.notBase = notBase;
exports.notImage = notImage;
exports.notApp = notApp;
exports.notAPI = notAPI$1;
exports.notController = notController;
exports.CRUDController = CRUDController;
exports.CRUDCreate = CRUDCreate;
exports.CRUDDelete = CRUDDelete;
exports.CRUDDetails = CRUDDetails;
exports.CRUDList = CRUDList;
exports.CRUDUpdate = CRUDUpdate;
exports.notTemplateProcessors = notTemplateProcessors$1;
exports.notTemplateProcessorsLib = notTemplateProcessorsLib;
exports.notTemplateCache = notTemplateCache$1;
exports.notRenderer = notRenderer;
exports.notComponent = notComponent;
exports.notForm = notForm;
exports.notRouter = notRouter$1;
exports.notTable = notTable;
exports.notDetails = notDetails;
exports.notRecord = notRecord;
exports.notRecordInterface = notInterface;

}((this.notFramework = this.notFramework || {})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90LWZyYW1ld29yay5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1vbi9uZXQuanMiLCIuLi9zcmMvY29tbW9uL2xvZ3MuanMiLCIuLi9zcmMvY29tbW9uL3Nob3J0cy5qcyIsIi4uL3NyYy9jb21tb24vb2JqZWN0cy5qcyIsIi4uL3NyYy9jb21tb24vc3RyaW5ncy5qcyIsIi4uL3NyYy9jb21tb24vZnVuY3Rpb25zLmpzIiwiLi4vc3JjL2NvbW1vbi9kb20uanMiLCIuLi9zcmMvY29tbW9uL2FwcC5qcyIsIi4uL3NyYy9jb21tb24vaW5kZXguanMiLCIuLi9zcmMvbm90UGF0aC5qcyIsIi4uL3NyYy9ub3RCYXNlLmpzIiwiLi4vc3JjL25vdFJvdXRlci5qcyIsIi4uL3NyYy9hcGkvb3B0aW9ucy5qcyIsIi4uL3NyYy9hcGkvcXVlZS5qcyIsIi4uL3NyYy9hcGkvYXBpLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdEltYWdlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL29wdGlvbnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZS5qcyIsIi4uL3NyYy9ub3RSZWNvcmRJbnRlcmZhY2UuanMiLCIuLi9zcmMvbm90UmVjb3JkLmpzIiwiLi4vc3JjL25vdEFwcC5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90UmVuZGVyZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlQWZ0ZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUJlZm9yZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlRmlyc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUxhc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9yZXBsYWNlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvaW5kZXguanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90Q29tcG9uZW50LmpzIiwiLi4vc3JjL25vdENvbnRyb2xsZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RGb3JtLmpzIiwiLi4vc3JjL0NSVUQvQ3JlYXRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90VGFibGUuanMiLCIuLi9zcmMvQ1JVRC9MaXN0LmpzIiwiLi4vc3JjL0NSVUQvVXBkYXRlLmpzIiwiLi4vc3JjL0NSVUQvRGVsZXRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90RGV0YWlscy5qcyIsIi4uL3NyYy9DUlVEL0RldGFpbHMuanMiLCIuLi9zcmMvQ1JVRC9Db250cm9sbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29tbW9uTmV0d29yayA9IHtcblx0YWRkSG9zdDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdob3N0JykgKyB1cmk7XG5cdH0sXG5cdGFkZFByb3RvY29sOiBmdW5jdGlvbih1cmkpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ3Byb3RvY29sJykgKyB1cmk7XG5cdH0sXG5cdHByZWxvYWRJbWFnZXM6IGZ1bmN0aW9uKGRhdGFBcnJheSwgZmllbGRzKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiBkYXRhQXJyYXkpIHtcblx0XHRcdGZvciAodmFyIGYgaW4gZmllbGRzKSB7XG5cdFx0XHRcdGlmIChkYXRhQXJyYXlbaV0uaGFzT3duUHJvcGVydHkoZmllbGRzW2ZdKSkge1xuXHRcdFx0XHRcdHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0XHRcdGltYWdlLnNldEF0dHJpYnV0ZSgnY3Jvc3NPcmlnaW4nLCAnYW5vbnltb3VzJyk7XG5cdFx0XHRcdFx0aW1hZ2Uuc3JjID0gZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV0uaW5kZXhPZignLy8nKSA9PT0gMCA/IHRoaXMuYWRkUHJvdG9jb2woZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV0pIDogZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdHB1dEZpbGUodXBsb2FkIC8qIG9iamVjdChmaWxlLCBvblByb2dyZXNzLCB1cmwpKi8gKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdGlmICh4aHIudXBsb2FkKSB7XG5cdFx0XHRcdC8vIHByb2dyZXNzIGJhclxuXHRcdFx0XHRpZiAodXBsb2FkLm9uUHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgdXBsb2FkLm9uUHJvZ3Jlc3MsIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBmaWxlIHJlY2VpdmVkL2ZhaWxlZFxuXHRcdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oIC8qZSovICkge1xuXHRcdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHRcdHhoci5vcGVuKCdQVVQnLCB1cGxvYWQudXJsLCB0cnVlKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgdXBsb2FkLmZpbGUudHlwZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYX0ZJTEVOQU1FJywgZW5jb2RlVVJJQ29tcG9uZW50KHVwbG9hZC5maWxlLm5hbWUpKTtcblx0XHRcdFx0eGhyLnNlbmQodXBsb2FkLmZpbGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHJlcXVlc3RKU09OOiBmdW5jdGlvbihtZXRob2QsIHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0cG9zdEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ1BPU1QnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHB1dEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ1BVVCcsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRIVE1MOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gKCkgPT4ge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHBhcnNlSW50KHN0YXR1cykgPT09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKGUpID0+IHJlamVjdChlKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldFNlc3Npb25JRDogZnVuY3Rpb24obmFtZSA9ICdTZXNzaW9uSUQnKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29va2llKG5hbWUpO1xuXHR9LFxuXHRnZXRDb29raWU6IChuYW1lKSA9PiB7XG5cdFx0bGV0IHZhbHVlID0gJzsgJyArIGRvY3VtZW50LmNvb2tpZSxcblx0XHRcdHBhcnRzID0gdmFsdWUuc3BsaXQoJzsgJyArIG5hbWUgKyAnPScpO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggPT0gMikge1xuXHRcdFx0cmV0dXJuIHBhcnRzLnBvcCgpLnNwbGl0KCc7Jykuc2hpZnQoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25OZXR3b3JrO1xuIiwiLy9kaXJ0eSBoYWNrIHRvIHJlbW92ZSBuby1jb25zb2xlIHdhcm5pbmcgb2YgZXNsaW50XG4vKiBnbG9iYWwgbm90RnJhbWV3b3JrKi9cbmNvbnN0IExPRyA9ICdjb25zb2xlJztcbnZhciBDb21tb25Mb2dzID0ge1xuXHRlcnJvcjogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdwcm9kdWN0aW9uJykpe1xuXHRcdFx0d2luZG93W0xPR10uZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0XHR9XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdwcm9kdWN0aW9uJykpe1xuXHRcdFx0d2luZG93W0xPR10ubG9nKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHRyZXBvcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHR0cmFjZTogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdwcm9kdWN0aW9uJykpe1xuXHRcdFx0d2luZG93W0xPR10udHJhY2UoLi4uYXJndW1lbnRzKTtcblx0XHR9XG5cdH0sXG5cdG11dGU6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJlZ2lzdGVyKCdwcm9kdWN0aW9uJywgdHJ1ZSk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cblx0bW92ZUl0ZW0oYXJyYXksIG9sZF9pbmRleCwgbmV3X2luZGV4KSB7XG5cdFx0aWYgKG5ld19pbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcblx0XHRcdHZhciBrID0gbmV3X2luZGV4IC0gYXJyYXkubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKChrLS0pICsgMSkge1xuXHRcdFx0XHRhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFycmF5LnNwbGljZShuZXdfaW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRfaW5kZXgsIDEpWzBdKTtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aChzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHVuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHRoaXMuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIG51bGwpO1xuXHR9XG5cblx0cGFyc2VQYXRoU3RlcChzdGVwLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGxldCByU3RlcCA9IG51bGw7XG5cdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUykgPT09IDAgJiYgaGVscGVyKXtcblx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfSEVMUEVSUywgJycpO1xuXHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRpZihoZWxwZXIuaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF07XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID09PSAwICYmIGl0ZW0pe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwgJycpO1xuXHRcdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fVxuXG5cdC8vOjpmaWVsZE5hbWUucmVzdWx0XG5cdC8ve31cblx0Ly97ZmllbGROYW1lOiAndGFyZ2V0UmVjb3JkRmllbGQnfVxuXHQvLy8vWyd0YXJnZXRSZWNvcmRGaWVsZCcsICdyZXN1bHQnXVxuXHRwYXJzZVBhdGgocGF0aCwgaXRlbSwgaGVscGVyKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cGF0aCA9IHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdHBhdGhbaV0gPSB0aGlzLnBhcnNlUGF0aFN0ZXAocGF0aFtpXSwgaXRlbSwgaGVscGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRub3JtaWxpemVQYXRoKHBhdGgpe1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH1lbHNle1xuXHRcdFx0d2hpbGUocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA+IC0xKXtcblx0XHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwnJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdHNtYWxsID0gW1widG9kb1wiXSxcblx0XHRiaWcgPSBbXCJ0b2RvXCIsIFwibGVuZ3RoXCJdXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0Ki9cblxuXHRpZkZ1bGxTdWJQYXRoKGJpZywgc21hbGwpe1xuXHRcdGlmIChiaWcubGVuZ3RoPHNtYWxsLmxlbmd0aCl7cmV0dXJuIGZhbHNlO31cblx0XHRmb3IobGV0IHQgPTA7IHQgPCBzbWFsbC5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZihzbWFsbFt0XSAhPT0gYmlnW3RdKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpLFxuXHRcdFx0aXNGdW5jdGlvbiA9IGF0dHJOYW1lLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKT4tMTtcblx0XHRpZiAoaXNGdW5jdGlvbil7XG5cdFx0XHRhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0fVxuXHRcdGlmICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIHR5cGVvZiBvYmplY3RbYXR0ck5hbWVdICE9PSAndW5kZWZpbmVkJyAmJiBvYmplY3RbYXR0ck5hbWVdICE9PSBudWxsKXtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uP29iamVjdFthdHRyTmFtZV0oe2l0ZW0sIGhlbHBlcnN9KTpvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChuZXdPYmosIGF0dHJQYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gbmV3T2JqO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7b2JqZWN0W2F0dHJOYW1lXSA9IHt9O31cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGpvaW4oKXtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX01FVEhPRF9JTklUID0gU3ltYm9sKCdpbml0JyksXG5cdE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0dGhpc1tNRVRBX0VWRU5UU10gPSB7fTtcblx0XHR0aGlzW01FVEFfREFUQV0gPSB7fTtcblx0XHR0aGlzW01FVEFfV09SS0lOR10gPSB7fTtcblx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSB7fTtcblx0XHR0aGlzW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdFtNRVRBX01FVEhPRF9JTklUXShpbnB1dCkge1xuXHRcdGlmICghaW5wdXQpIHtcblx0XHRcdGlucHV0ID0ge307XG5cdFx0fVxuXHRcdGlmIChpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgaW5wdXQuZXZlbnRzKSB7XG5cdFx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlucHV0Lmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcblx0XHRcdHRoaXMuc2V0RGF0YShpbnB1dC5kYXRhKTtcblx0XHR9XG5cblx0XHRpZiAoaW5wdXQuaGFzT3duUHJvcGVydHkoJ3dvcmtpbmcnKSkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKGlucHV0LndvcmtpbmcpO1xuXHRcdH1cblxuXHRcdGlmIChpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoaW5wdXQub3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiAqL1xuXHRcdFx0XHR3aGF0ID0gYXJnc1swXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiBlbGVtZW50ICovXG5cdFx0XHRcdG5vdFBhdGguc2V0KGFyZ3NbMF0gLyogcGF0aCAqLyAsIHdoYXQgLyogY29sbGVjdGlvbiAqLyAsIHVuZGVmaW5lZCAvKiBoZWxwZXJzICovICwgYXJnc1sxXSAvKiB2YWx1ZSAqLyApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Z2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggKi9cblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdH1cblx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCB3aXRoIGRlZmF1bHQgdmFsdWUgKi9cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdGxldCByZXMgPSBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdFx0aWYgKHJlcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Lyogbm8gZGF0YSwgcmV0dXJuIGRlZmF1bHQgdmFsdWUgKi9cblx0XHRcdFx0XHRyZXR1cm4gYXJnc1sxXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvKiBkYXRhLCByZXR1cm4gaXQgKi9cblx0XHRcdFx0XHRyZXR1cm4gcmVzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvKiByZXR1cm4gZnVsbCBjb2xsZWN0aW9uICovXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHdoYXQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRDT1JFIE9CSkVDVFxuXHRcdFx0REFUQSAtIGluZm9ybWF0aW9uXG5cdFx0XHRPUFRJT05TIC0gaG93IHRvIHdvcmtcblx0XHRcdFdPUktJTkcgLSB0ZW1wb3JhcmlseSBnZW5lcmF0ZWQgaW4gcHJvY2Nlc3Ncblx0Ki9cblxuXHRzZXREYXRhKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfREFUQV0gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0RGF0YSgpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RGF0YSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX0RBVEFdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0T3B0aW9ucygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX09QVElPTlNdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldE9wdGlvbnMoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRPcHRpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfT1BUSU9OU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRXb3JraW5nKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfV09SS0lOR10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0V29ya2luZygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFdvcmtpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9XT1JLSU5HXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qXG5cdFx0RVZFTlRTIGhhbmRsaW5nXG5cdCovXG5cblx0b24oZXZlbnROYW1lcywgZXZlbnRDYWxsYmFja3MsIG9uY2UpIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmRlZmluZUlmTm90RXhpc3RzKHRoaXNbTUVUQV9FVkVOVFNdLCBuYW1lLCBbXSk7XG5cdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5wdXNoKHtcblx0XHRcdFx0Y2FsbGJhY2tzOiBldmVudENhbGxiYWNrcyxcblx0XHRcdFx0b25jZTogb25jZSxcblx0XHRcdFx0Y291bnQ6IDBcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dHJpZ2dlcigpIHtcblx0XHRsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKSxcblx0XHRcdGV2ZW50TmFtZSA9IGFyZ3Muc2hpZnQoKTtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lKSkge1xuXHRcdFx0ZXZlbnROYW1lID0gW2V2ZW50TmFtZV07XG5cdFx0fVxuXHRcdGZvciAobGV0IGcgPSAwOyBnIDwgZXZlbnROYW1lLmxlbmd0aDsgZysrKSB7XG5cdFx0XHRsZXQgbmFtZSA9IGV2ZW50TmFtZVtnXTtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdFx0bGV0IGV2ZW50ID0gdGhpc1tNRVRBX0VWRU5UU11bbmFtZV1bdF07XG5cdFx0XHRcdFx0aWYgKGV2ZW50Lm9uY2UpIHtcblx0XHRcdFx0XHRcdHRoaXMub2ZmKG5hbWUsIGV2ZW50LmNhbGxiYWNrcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvciAodmFyIGggPSAwOyBoIDwgZXZlbnQuY2FsbGJhY2tzLmxlbmd0aDsgaCsrKSB7XG5cdFx0XHRcdFx0XHRldmVudC5jYWxsYmFja3NbaF0oLi4uYXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0b2ZmKGV2ZW50TmFtZXMgLyogYXJyYXkgb2YgZXZlbnQgbmFtZXMgKi8gLCBldmVudENhbGxiYWNrcyAvKiBhcnJheSBvZiBjYWxsYmFja3MgKi8gKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXHRcdGZvciAobGV0IGcgPSAwOyBnIDwgZXZlbnROYW1lcy5sZW5ndGg7IGcrKykge1xuXHRcdFx0bGV0IG5hbWUgPSBldmVudE5hbWVzW2ddO1xuXHRcdFx0bGV0IHRhcmdldElkID0gLTE7XG5cdFx0XHRmb3IgKGxldCBoID0gMDsgaCA8IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmxlbmd0aDsgaCsrKSB7XG5cdFx0XHRcdGxldCBldmVudCA9IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdW2hdO1xuXHRcdFx0XHRpZiAodGFyZ2V0SWQgPT09IC0xICYmIGV2ZW50Q2FsbGJhY2tzID09PSBldmVudC5jYWxsYmFja3MpIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9IGg7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0YXJnZXRJZCA+IC0xKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnNwbGljZSh0YXJnZXRJZCwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0b2ZmQWxsKCkge1xuXHRcdGxldCBldmVudHMgPSBPYmplY3Qua2V5cyh0aGlzW01FVEFfRVZFTlRTXSk7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBldmVudHMubGVuZ3RoOyB0KyspIHtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShldmVudHNbdF0pKSB7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzW01FVEFfRVZFTlRTXVtldmVudHNbdF1dO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvZygpIHtcblx0XHRpZiAoIW5vdENvbW1vbi5nZXQoJ3Byb2R1Y3Rpb24nKSAmJiBub3RDb21tb24ubG9nKSB7XG5cdFx0XHRub3RDb21tb24ubG9nKHRoaXMuZ2V0V29ya2luZygnbmFtZScpLCAuLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdGluZm8oKSB7XG5cdFx0aWYgKCFub3RDb21tb24uZ2V0KCdwcm9kdWN0aW9uJykgJiYgbm90Q29tbW9uLmluZm8pIHtcblx0XHRcdG5vdENvbW1vbi5pbmZvKHRoaXMuZ2V0V29ya2luZygnbmFtZScpLCAuLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdGVycm9yKCkge1xuXHRcdGlmICghbm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpICYmIG5vdENvbW1vbi5lcnJvcikge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKHRoaXMuZ2V0V29ya2luZygnbmFtZScpLCAuLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdHJlcG9ydCgpIHtcblx0XHRpZiAobm90Q29tbW9uLnJlcG9ydCkge1xuXHRcdFx0bm90Q29tbW9uLnJlcG9ydCh0aGlzLmdldFdvcmtpbmcoJ25hbWUnKSwgLi4uYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5jb25zdCBPUFRfTU9ERV9ISVNUT1JZID0gU3ltYm9sKCdoaXN0b3J5JyksXG5cdE9QVF9NT0RFX0hBU0ggPSBTeW1ib2woJ2hhc2gnKSxcblx0T1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwgPSA1MDtcblxuY2xhc3Mgbm90Um91dGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJvdXRlczogW10sXG5cdFx0XHRtb2RlOiBPUFRfTU9ERV9ISVNUT1JZLFxuXHRcdFx0cm9vdDogJy8nLCAvL2Fsd2F5cyBpbiBzbGFzaGVzIC91c2VyLywgLywgL2lucHV0Ly4gYW5kIG5vIC91c2VyIG9yIGlucHV0L2xldmVsXG5cdFx0XHRpbml0aWFsaXplZDogZmFsc2Vcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpc3RvcnkoKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9ISVNUT1JZKTtcblx0fVxuXG5cdGhhc2goKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9IQVNIKTtcblx0fVxuXG5cdHNldFJvb3Qocm9vdCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb290Jywgcm9vdCA/ICcvJyArIHRoaXMuY2xlYXJTbGFzaGVzKHJvb3QpICsgJy8nIDogJy8nKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNsZWFyU2xhc2hlcyhwYXRoKSB7XG5cdFx0Ly9maXJzdCBhbmQgbGFzdCBzbGFzaGVzIHJlbW92YWxcblx0XHRyZXR1cm4gcGF0aC50b1N0cmluZygpLnJlcGxhY2UoL1xcLyQvLCAnJykucmVwbGFjZSgvXlxcLy8sICcnKTtcblx0fVxuXG5cdGFkZChyZSwgaGFuZGxlcikge1xuXHRcdGlmICh0eXBlb2YgcmUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aGFuZGxlciA9IHJlO1xuXHRcdFx0cmUgPSAnJztcblx0XHR9XG5cdFx0bGV0IHJ1bGUgPSB7XG5cdFx0XHRyZTogcmUsXG5cdFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0fTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLnB1c2gocnVsZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRMaXN0KGxpc3QpIHtcblx0XHRmb3IgKGxldCB0IGluIGxpc3QpIHtcblx0XHRcdHRoaXMuYWRkKHQsIGxpc3RbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbW92ZShwYXJhbSkge1xuXHRcdGZvciAodmFyIGkgPSAwLCByOyBpIDwgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5sZW5ndGgsIHIgPSB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldOyBpKyspIHtcblx0XHRcdGlmIChyLmhhbmRsZXIgPT09IHBhcmFtIHx8IHIucmUgPT09IHBhcmFtKSB7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRmbHVzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLydcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGlzSW5pdGlhbGl6ZWQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbml0aWFsaXplZCcpO1xuXHR9XG5cblx0c2V0SW5pdGlhbGl6ZWQodmFsID0gdHJ1ZSl7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnaW5pdGlhbGl6ZWQnLCB2YWwpO1xuXHR9XG5cblx0Z2V0RnJhZ21lbnQoKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gJyc7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnbW9kZScpID09PSBPUFRfTU9ERV9ISVNUT1JZKSB7XG5cdFx0XHRpZiAoIWxvY2F0aW9uKSByZXR1cm4gJyc7XG5cdFx0XHRmcmFnbWVudCA9IHRoaXMuY2xlYXJTbGFzaGVzKGRlY29kZVVSSShsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCkpO1xuXHRcdFx0ZnJhZ21lbnQgPSBmcmFnbWVudC5yZXBsYWNlKC9cXD8oLiopJC8sICcnKTtcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgIT0gJy8nID8gZnJhZ21lbnQucmVwbGFjZSh0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSwgJycpIDogZnJhZ21lbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICghd2luZG93KSByZXR1cm4gJyc7XG5cdFx0XHR2YXIgbWF0Y2ggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRmcmFnbWVudCA9IG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY2xlYXJTbGFzaGVzKGZyYWdtZW50KTtcblx0fVxuXG5cdGNoZWNrTG9jYXRpb24oKXtcblx0XHRsZXQgY3VycmVudCA9dGhpcy5nZXRXb3JraW5nKCdjdXJyZW50JyksXG5cdFx0XHRmcmFnbWVudCA9dGhpcy5nZXRGcmFnbWVudCgpLFxuXHRcdFx0aW5pdCA9IHRoaXMuaXNJbml0aWFsaXplZCgpO1xuXHRcdGlmIChjdXJyZW50ICE9PWZyYWdtZW50ICB8fCAhaW5pdCkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JyxmcmFnbWVudCk7XG5cdFx0XHR0aGlzLmNoZWNrKGZyYWdtZW50KTtcblx0XHRcdHRoaXMuc2V0SW5pdGlhbGl6ZWQoKTtcblx0XHR9XG5cdH1cblxuXHRocmVmQ2xpY2soKXtcblx0XHQvL2NvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRnZXRSb290KCl7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0bGlzdGVuKGxvb3BJbnRlcnZhbCA9IE9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JywgJ25vdEluaXRpYWxpemVkJyk7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmdldFdvcmtpbmcoJ2ludGVydmFsJykpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJ2YWwnLCBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrTG9jYXRpb24uYmluZCh0aGlzKSwgbG9vcEludGVydmFsKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5ocmVmQ2xpY2suYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjaGVjayhmKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gZiB8fCB0aGlzLmdldEZyYWdtZW50KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGF0aCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5yZTtcblx0XHRcdGxldCBmdWxsUkUgPSAgdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKHBhdGgpKTtcblx0XHRcdHZhciBtYXRjaCA9IGZyYWdtZW50Lm1hdGNoKGZ1bGxSRSk7XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0bWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5oYW5kbGVyLmFwcGx5KHRoaXMuaG9zdCB8fCB7fSwgbWF0Y2gpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRuYXZpZ2F0ZShwYXRoKSB7XG5cdFx0cGF0aCA9IHBhdGggPyBwYXRoIDogJyc7XG5cdFx0c3dpdGNoICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSl7XG5cdFx0XHRjYXNlIE9QVF9NT0RFX0hJU1RPUlk6IHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygncHVzaCBzdGF0ZScsIHRoaXMuZ2V0RnVsbFJvdXRlKHBhdGgpKTtcblx0XHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgT1BUX01PREVfSEFTSDoge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyguKikkLywgJycpICsgJyMnICsgcGF0aDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RnVsbFJvdXRlKHBhdGggPSAnJyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5jbGVhclNsYXNoZXMocGF0aCk7XG5cdH1cblxuXHRnZXRBbGxMaW5rcygpe1xuXHRcdHZhciBhbGxFbGVtZW50cyA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZignbi1ocmVmJykgPT09IDApIHtcblx0XHRcdFx0XHRsaXN0LnB1c2goYWxsRWxlbWVudHNbal0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0cmVSb3V0ZUV4aXN0ZWQoKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0QWxsTGlua3MoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgbGlzdC5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmluaXRSZXJvdXRpbmcobGlzdFt0XSwgbGlzdFt0XS5nZXRBdHRyaWJ1dGUoJ24taHJlZicpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVyb3V0aW5nKGVsLCBsaW5rKXtcblx0XHRpZiAoIWVsLm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdGxldCBmdWxsTGluayA9IHRoaXMuZ2V0RnVsbFJvdXRlKGxpbmspO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdocmVmJywgZnVsbExpbmspO1xuXHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9Pntcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLm5hdmlnYXRlKGxpbmspO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdGVsLm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90Um91dGVyKCk7XG4iLCJsZXQgbm90QVBJT3B0aW9ucyA9IHtcblx0cnBzOiA1MCxcblx0cHJvdG9jb2w6ICdodHRwJyxcblx0aG9zdDogJ2xvY2FsaG9zdCcsXG5cdHBvcnQ6IDkwMDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSU9wdGlvbnM7XG4iLCJjbGFzcyBub3RBUElRdWVle1xuXHRjb25zdHJ1Y3RvciAocmVxdWVzdHNQZXJTZWNvbmQpIHtcblx0XHR0aGlzLnF1ZWUgPSBbXTtcblx0XHR0aGlzLmludCA9IG51bGw7XG5cdFx0dGhpcy5yZXF1ZXN0c1BlclNlY29uZCA9IHJlcXVlc3RzUGVyU2Vjb25kIHx8IDU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW4oKXtcblx0XHR0aGlzLmludCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLmNoZWNrLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLnJlcXVlc3RzUGVyU2Vjb25kKTtcblx0fVxuXG5cdGNoZWNrKCl7XG5cdFx0aWYgKHRoaXMuaW5Qcm9ncmVzcyl7cmV0dXJuO31cblx0XHRlbHNle1xuXHRcdFx0aWYgKHRoaXMucXVlZS5sZW5ndGggPiAwKXtcblx0XHRcdFx0dGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHRvQ2FsbCA9IHRoaXMucXVlZS5zaGlmdCgpO1xuXHRcdFx0XHR0b0NhbGwoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRuZXh0KCl7XG5cdFx0dGhpcy5pblByb2dyZXNzID0gZmFsc2U7XG5cdH1cblxuXHRhZGQoY2FsbCl7XG5cdFx0dGhpcy5xdWVlLnB1c2goY2FsbCk7XG5cdH1cblxuXHRwYXVzZSgpe1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50KTtcblx0fVxuXG5cdHJlc3VtZSgpe1xuXHRcdHRoaXMucnVuKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJUXVlZTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UuanMnO1xuXG5pbXBvcnQgbm90QVBJT3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuaW1wb3J0IG5vdEFQSVF1ZWUgZnJvbSAnLi9xdWVlLmpzJztcblxuXG5jbGFzcyBub3RBUEkgZXh0ZW5kcyAgbm90QmFzZXtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdENvbW1vbi5leHRlbmQobm90QVBJT3B0aW9ucywgb3B0aW9ucykpO1xuXHRcdHRoaXMucXVlZSA9IG5ldyBub3RBUElRdWVlKHRoaXMuZ2V0T3B0aW9ucygncnBzJykpO1xuXHRcdHRoaXMucXVlZS5ydW4oKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG1ha2VVcmwocGFydHMpIHtcblx0XHRyZXR1cm4gcGFydHMuam9pbignLycpO1xuXHR9XG5cblx0cXVlZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgbWV0aG9kLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdG1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKSB7XG5cdFx0bm90Q29tbW9uLnJlcXVlc3RKU09OKG1ldGhvZCwgdXJsLCBkYXRhKVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3Bvc3QnLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXQob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdnZXQnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZWxldGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdkZWxldGUnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUEk7XG4iLCJpbXBvcnQgbm90QmFzZSAgZnJvbSAnLi4vbm90QmFzZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbWFnZSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuIiwiY29uc3QgUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYID0gJ24tJyxcblx0VEVNUExBVEVfVEFHID0gJ250Jyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SID0gJy0nLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCA9ICdpZicsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVggPSAnbm90X2NvbXBvbmVudF8nLFxuXHRQQVJUX0lEX1BSRUZJWCA9ICdub3RfcGFydF8nLFxuXHRERUZBVUxUX1BMQUNFUiA9ICdwbGFjZScsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1AgPSAncGxhY2VBZnRlcic7XG5cbmNvbnN0IE9QVFMgPSB7XG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCxcblx0VEVNUExBVEVfVEFHLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLFxuXHRERUZBVUxUX1BMQUNFUixcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCxcblx0UEFSVF9JRF9QUkVGSVgsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1Bcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9QVFM7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5jb25zdCBNRVRBX0NBQ0hFID0gU3ltYm9sKCdjYWNoZScpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZUNhY2hlIGV4dGVuZHMgbm90QmFzZXtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DQUNIRV0gPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0dGhpcy5oaWRlVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5yZWdpc3RlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlkZVRlbXBsYXRlcygpe1xuXHRcdGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHR0LmlubmVySFRNTCA9IE9QVFMuVEVNUExBVEVfVEFHICsgJ3tkaXNwbGF5OiBub25lO30nO1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodCk7XG5cdH1cblxuXHRyZWdpc3RlcigpIHtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ3RlbXBsYXRlQ2FjaGUnLCB0aGlzKTtcblx0fVxuXG5cdGxvYWQobWFwKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdGZvciAodmFyIGkgaW4gbWFwKSB7XG5cdFx0XHR0aGlzLmxvYWRPbmUoaSwgbWFwW2ldKTtcblx0XHR9XG5cdH1cblxuXHRsb2FkT25lKGtleSwgdXJsLCBjYWxsYmFjaykge1xuXHRcdHZhciBvUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdG9SZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XG5cdFx0b1JlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZU5hbWUgPSBrZXk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZVVSTCA9IHVybDtcblx0XHRcdGRpdi5pbm5lckhUTUwgPSByZXNwb25zZS5zcmNFbGVtZW50LnJlc3BvbnNlVGV4dDtcblx0XHRcdHRoaXMuc2V0T25lKGtleSwgZGl2KTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKGtleSwgdXJsLCBkaXYpO1xuXG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRvUmVxdWVzdC5zZW5kKCk7XG5cdH1cblxuXHRpZkFsbExvYWRlZCgpe1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMudHJpZ2dlcignbG9hZGVkJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0T25lKGtleSwgZWxlbWVudCkge1xuXHRcdGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7XG5cdFx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5hZGRGcm9tVGV4dChrZXksIGVsZW1lbnQpO1x0XG5cdFx0fVxuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KGtleSkpe1xuXHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vdGhhdC5zZXRMb2FkaW5nKGtleSwgdXJsKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZUlubmVySFRNTCk9Pntcblx0XHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0XHRcdH0pLmNhdGNoKCgpPT57XG5cdFx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGUnLCBrZXksIHVybCk7XG5cdFx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlc0hUTUwpPT57XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoaXMucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdFx0dGhpcy5hZGRMaWIodGVtcGxhdGVzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHRcdH0pLmNhdGNoKChlKT0+e1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZXMgbGliJywgdXJsLGUpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSA9IFsnX2lkJywgJ2lkJywgJ0lEJ10sXG5cdERFRkFVTFRfRklMVEVSID0ge30sXG5cdERFRkFVTFRfUEFHRV9OVU1CRVIgPSAxLFxuXHRERUZBVUxUX1BBR0VfU0laRSA9IDEwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbnRlcmZhY2UgZXh0ZW5kcyBub3RCYXNlIHtcblxuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCkge1xuXHRcdHN1cGVyKHt9KTtcblx0XHR0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldElEKHJlY29yZCwgYWN0aW9uRGF0YSkge1xuXHRcdGxldCByZXN1bHRJZCxcblx0XHRcdGxpc3QgPSBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZLFxuXHRcdFx0cHJlZml4ZXMgPSBbJycsIHRoaXMubWFuaWZlc3QubW9kZWxdO1xuXHRcdGlmIChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpbmRleCcpICYmIGFjdGlvbkRhdGEuaW5kZXgpIHtcblx0XHRcdGxpc3QgPSBbYWN0aW9uRGF0YS5pbmRleF0uY29uY2F0KE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkpO1xuXHRcdH1cblx0XHRmb3IgKGxldCBwcmUgb2YgcHJlZml4ZXMpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgbGlzdCkge1xuXHRcdFx0XHRpZiAocmVjb3JkLmhhc093blByb3BlcnR5KHByZSArIHQpKSB7XG5cdFx0XHRcdFx0cmVzdWx0SWQgPSByZWNvcmRbcHJlICsgdF07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdElkO1xuXHR9XG5cblx0Z2V0QWN0aW9uc0NvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSA/IE9iamVjdC5rZXlzKHRoaXMuZ2V0QWN0aW9ucygpKS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Z2V0QWN0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgPyB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgOiB7fTtcblx0fVxuXG5cdHNldEZpbmRCeShrZXksIHZhbHVlKSB7XG5cdFx0dmFyIG9iaiA9IHt9O1xuXHRcdG9ialtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIHRoaXMuc2V0RmlsdGVyKG9iaik7XG5cdH1cblxuXHRzZXRGaWx0ZXIoZmlsdGVyRGF0YSA9IERFRkFVTFRfRklMVEVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgZmlsdGVyRGF0YSk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIoe30pO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0U29ydGVyKHNvcnRlckRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHNldFBhZ2VTaXplKHBhZ2VTaXplKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSk7XG5cdH1cblxuXHRzZXRQYWdlcihwYWdlU2l6ZSA9IERFRkFVTFRfUEFHRV9TSVpFLCBwYWdlTnVtYmVyID0gREVGQVVMVF9QQUdFX05VTUJFUikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0UGFnZXIoKTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRXb3JraW5nKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRXb3JraW5nKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdGNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlcXVlc3REYXRhID0ge307XG5cdFx0aWYgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdkYXRhJykpICYmIEFycmF5LmlzQXJyYXkoYWN0aW9uRGF0YS5kYXRhKSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpb25EYXRhLmRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGRhdGFQcm92aWRlck5hbWUgPSAnZ2V0JyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoYWN0aW9uRGF0YS5kYXRhW2ldKTtcblx0XHRcdFx0aWYgKHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gJiYgdHlwZW9mIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRyZXF1ZXN0RGF0YSA9IG5vdENvbW1vbi5leHRlbmQocmVxdWVzdERhdGEsIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0oKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVlc3REYXRhO1xuXHR9XG5cblx0ZW5jb2RlUmVxdWVzdChkYXRhKXtcblx0XHRsZXQgcCA9ICc/Jztcblx0XHRmb3IobGV0IHQgaW4gZGF0YSl7XG5cdFx0XHRwICs9IGVuY29kZVVSSUNvbXBvbmVudCh0KSsnPScrZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFbdF0pKycmJztcblx0XHR9XG5cdFx0cmV0dXJuIHA7XG5cdH1cblxuXHQvL3JldHVybiBQcm9taXNlXG5cdHJlcXVlc3QocmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zID0gdGhpcy5jb2xsZWN0UmVxdWVzdERhdGEoYWN0aW9uRGF0YSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zRW5jb2RlZCA9IHRoaXMuZW5jb2RlUmVxdWVzdChyZXF1ZXN0UGFyYW1zKSxcblx0XHRcdGlkID0gdGhpcy5nZXRJRChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpLFxuXHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwgKyByZXF1ZXN0UGFyYW1zRW5jb2RlZCwgaWQsIEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpKVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0YWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKSB7XG5cdFx0aWYgKHRoaXMgJiYgYWN0aW9uRGF0YSAmJiBhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpc0FycmF5JykgJiYgYWN0aW9uRGF0YS5pc0FycmF5KSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZGF0YVt0XSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YVt0XSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSBuZXcgbm90UmVjb3JkKHRoaXMubWFuaWZlc3QsIGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnO1xuXG5jb25zdCBNRVRBX0lOVEVSRkFDRSA9IFN5bWJvbCgnaW50ZXJmYWNlJyksXG5cdE1FVEFfUFJPWFkgPSBTeW1ib2woJ3Byb3h5JyksXG5cdE1FVEFfQ0hBTkdFID0gU3ltYm9sKCdjaGFuZ2UnKSxcblx0TUVUQV9DSEFOR0VfTkVTVEVEID0gU3ltYm9sKCdjaGFuZ2UubmVzdGVkJyksXG5cdE1FVEFfU0FMID0gW1xuXHRcdCdnZXRBdHRyJyxcblx0XHQnZ2V0QXR0cnMnLFxuXHRcdCdpc1Byb3BlcnR5Jyxcblx0XHQnaXNSZWNvcmQnLFxuXHRcdCdnZXRNYW5pZmVzdCcsXG5cdFx0J3NldEF0dHInLFxuXHRcdCdzZXRBdHRycycsXG5cdFx0J2dldERhdGEnLFxuXHRcdCdzZXREYXRhJyxcblx0XHQnZ2V0SlNPTicsXG5cdFx0J29uJyxcblx0XHQnb2ZmJyxcblx0XHQndHJpZ2dlcidcblx0XSxcblx0TUVUQV9NQVBfVE9fSU5URVJGQUNFID0gW1xuXHRcdCdnZXRBY3Rpb25zQ291bnQnLFxuXHRcdCdnZXRBY3Rpb25zJyxcblx0XHQnc2V0RmluZEJ5Jyxcblx0XHQncmVzZXRGaWx0ZXInLFxuXHRcdCdzZXRGaWx0ZXInLFxuXHRcdCdnZXRGaWx0ZXInLFxuXHRcdCdzZXRTb3J0ZXInLFxuXHRcdCdnZXRTb3J0ZXInLFxuXHRcdCdyZXNldFNvcnRlcicsXG5cdFx0J3NldFBhZ2VOdW1iZXInLFxuXHRcdCdzZXRQYWdlU2l6ZScsXG5cdFx0J3NldFBhZ2VyJyxcblx0XHQncmVzZXRQYWdlcicsXG5cdFx0J2dldFBhZ2VyJ1xuXHRdLFxuXHRERUZBVUxUX0FDVElPTl9QUkVGSVggPSAnJCcsXG5cdE1FVEFfUkVUVVJOX1RPX1JPT1QgPSBTeW1ib2woJ3JldHVyblRvUm9vdCcpO1xuXG52YXIgY3JlYXRlUHJvcGVydHlIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdHlwZW9mIHRhcmdldFtrZXldKTtcblxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UHJvcGVydHkgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoZ2V0Um9vdCwgcGF0aFRvLCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1Byb3h5IHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5zZXREYXRhKGl0ZW0pO1xuXHRcdHRoaXMuaXNQcm9wZXJ0eSA9IHRydWU7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX1JFVFVSTl9UT19ST09UXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdFtNRVRBX1JFVFVSTl9UT19ST09UXShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdGxldCByb290ID0gdGhpcy5nZXRPcHRpb25zKCdnZXRSb290JykoKTtcblx0XHRyb290LnRyaWdnZXIoJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfUFJPWFldLCB0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5LCB2YWx1ZSk7XG5cdH1cbn1cblxuXG52YXIgY3JlYXRlUmVjb3JkSGFuZGxlcnMgPSBmdW5jdGlvbihvd25lcikge1xuXHRyZXR1cm4ge1xuXHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIGNvbnRleHQpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgZ2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQsIGNvbnRleHQpO1xuXHRcdFx0aWYgKGtleSA9PT0gJ2lzUHJveHknIHx8IGtleSA9PT0gJ2lzUmVjb3JkJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX01BUF9UT19JTlRFUkZBQ0UuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHJlY29yZCBwcm94eSBzZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCk7XG5cdFx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UmVjb3JkIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG1hbmlmZXN0LCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUHJveHkpIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcigndGhpcyBpcyBQcm94eSBpdGVtJyk7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1JlY29yZCB8fCBpdGVtLmlzUHJvcGVydHkpKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7fSk7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0gPSBuZXcgbm90UmVjb3JkSW50ZXJmYWNlKG1hbmlmZXN0KTtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpcy5pbnRlcmZhY2VVcCgpO1xuXHRcdHRoaXMuaXNSZWNvcmQgPSB0cnVlO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgcmVjb3JkIGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0aW5pdFByb3BlcnRpZXMoaXRlbSwgcGF0aCA9ICcnKSB7XG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtICE9PSBudWxsKSB7XG5cdFx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKGl0ZW0pO1xuXHRcdFx0Zm9yIChsZXQga2V5IG9mIGtleXMpIHtcblx0XHRcdFx0bGV0IGN1clBhdGggPSBwYXRoICsgKHBhdGgubGVuZ3RoID4gMCA/ICcuJyA6ICcnKSArIGtleTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjdXJQYXRoJywgY3VyUGF0aCk7XG5cdFx0XHRcdGlmIChpdGVtLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW1ba2V5XSA9PT0gJ29iamVjdCcgJiYgaXRlbVtrZXldICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXG5cdGFjdGlvblVwKGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLmhhc093blByb3BlcnR5KFtERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0pKSB7XG5cdFx0XHR0aGlzW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSA9ICgpID0+IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlcXVlc3QodGhpcywgaW5kZXgpO1x0XHRcdFxuXHRcdH1cblx0fVxuXHQvKlxuXHQtPiAncGF0aC50by5rZXknLCB2YWx1ZU9mS2V5XG5cdDwtIG9rLCB3aXRoIG9uZSBvbkNoYW5nZSBldmVudCB0cmlnZ2VyZWRcblx0Ki9cblxuXHRzZXRBdHRyKGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gbm90UGF0aC5zZXQoa2V5LCB0aGlzW01FVEFfUFJPWFldLCB7fSwgdmFsdWUpO1xuXHR9XG5cblx0Lypcblx0LT5cblx0e1xuXHRcdCdrZXlQYXRoJzogdmFsdWUsXG5cdFx0J2tleS5zdWJQYXRoJzogdmFsdWUyLFxuXHRcdCdrZXlQYXRoLjAudGl0bGUnOiB2YWx1ZTNcblx0fVxuXHQ8LSBvaywgd2l0aCBidW5jaCBvZiBvbkNoYW5nZSBldmVudHMgdHJpZ2dlcmVkXG5cdCovXG5cdHNldEF0dHJzKG9iamVjdFBhcnQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzJywgb2JqZWN0UGFydCwgT2JqZWN0LmtleXMob2JqZWN0UGFydCkpO1xuXHRcdGlmIChvYmplY3RQYXJ0ICYmICh0eXBlb2Ygb2JqZWN0UGFydCA9PT0gJ29iamVjdCcpICYmIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpLmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggaW4gb2JqZWN0UGFydCkge1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzIG9uZSB0byBnbycsIHBhdGgpO1xuXHRcdFx0XHR0aGlzLnNldEF0dHIocGF0aCwgb2JqZWN0UGFydFtwYXRoXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0LT4gJ3BhdGhUb0tleSdcblx0PC0gdmFsdWUxXG5cblx0Ki9cblx0Z2V0QXR0cih3aGF0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdnZXRBdHRyJywgd2hhdCk7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHdoYXQsIHRoaXNbTUVUQV9QUk9YWV0sIHt9KTtcblx0fVxuXG5cdC8qXG5cdC0+IFsncGF0aFRvS2V5JywgJ3BhdGgudG8ua2V5JywgJ3NpbXBsZUtleScsLi4uXVxuXHQ8LSBbdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMywuLi5dXG5cdCovXG5cdGdldEF0dHJzKHdoYXQpIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0aWYgKHdoYXQgJiYgd2hhdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIG9mIHdoYXQpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5nZXRBdHRyKHBhdGgpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXSkge1xuXHRcdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLm1hbmlmZXN0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRzZXRGaW5kQnkoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmluZEJ5KC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFNvcnRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0U29ydGVyKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRQYWdlTnVtYmVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VOdW1iZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VTaXplKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VTaXplKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGdldE1vZGVsTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0TW9kZWxOYW1lKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4vbm90Um91dGVyJztcbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuXG5jb25zdCBPUFRfQ09OVFJPTExFUl9QUkVGSVggPSAnbmMnLFxuXHRPUFRfUkVDT1JEX1BSRUZJWCA9ICducic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEFwcCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoe29wdGlvbnN9KTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBhcHAnKTtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ2FwcCcsIHRoaXMpO1xuXHRcdHRoaXMucmVzb3VyY2VzID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGludGVyZmFjZXM6IHt9LFxuXHRcdFx0Y29udHJvbGxlcnM6IHt9LFxuXHRcdFx0aW5pdENvbnRyb2xsZXI6IG51bGwsXG5cdFx0XHRjdXJyZW50Q29udHJvbGxlcjogbnVsbFxuXHRcdH0pO1xuXHRcdHRoaXMucHJlSW5pdFJvdXRlcigpO1xuXHRcdHRoaXMuaW5pdE1hbmFnZXIoKTtcblx0XHR0aGlzLmluaXRBUEkoKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZXMoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRNYW5hZ2VyKCl7XG5cdFx0bm90Q29tbW9uLnNldE1hbmFnZXIoXG5cdFx0XHR7XG5cdFx0XHRcdHNldEFQSSh2KXsgdGhpcy5hcGkgPSB2O30sXG5cdFx0XHRcdGdldEFQSSgpe3JldHVybiB0aGlzLmFwaTt9LFxuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHRpbml0QVBJKCl7XG5cdFx0bm90Q29tbW9uLmdldE1hbmFnZXIoKS5zZXRBUEkobmV3IG5vdEFQSSh0aGlzLmdldE9wdGlvbnMoJ2FwaScpIHx8IHt9KSk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGVzKCl7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykpe1xuXHRcdFx0bGV0IHByb20gPSBudWxsO1xuXHRcdFx0Zm9yKGxldCB0IGluIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykpe1xuXHRcdFx0XHRpZiAodCAmJiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0XHRsZXQgdXJsID0gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKVt0XTtcblx0XHRcdFx0XHRpZihwcm9tKXtcblx0XHRcdFx0XHRcdHByb20udGhlbihub3RUZW1wbGF0ZUNhY2hlLmFkZExpYkZyb21VUkwuYmluZChub3RUZW1wbGF0ZUNhY2hlLCB1cmwpKTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHByb20gPSBub3RUZW1wbGF0ZUNhY2hlLmFkZExpYkZyb21VUkwodXJsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChwcm9tKXtcblx0XHRcdFx0cHJvbS50aGVuKHRoaXMuaW5pdE1hbmlmZXN0LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KCdubyB0ZW1wbGF0ZXMgbGliJywgZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5pbml0TWFuaWZlc3QoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuaW5pdE1hbmlmZXN0KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hbmlmZXN0KCkge1xuXHRcdHZhciB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ21hbmlmZXN0VVJMJyk7XG5cdFx0bm90Q29tbW9uLmdldEpTT04odXJsLCB7fSlcblx0XHRcdC50aGVuKHRoaXMuc2V0SW50ZXJmYWNlTWFuaWZlc3QuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0LmJpbmQodGhpcykpO1xuXHR9XG5cblx0cHJlSW5pdFJvdXRlcigpe1xuXHRcdHRoaXMuc2V0V29ya2luZygncm91dGVyJywgbm90Um91dGVyKTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcicpLnNldFJvb3QodGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIucm9vdCcpKTtcblx0XHRub3RSb3V0ZXIucmVSb3V0ZUV4aXN0ZWQoKTtcblx0fVxuXG5cdGluaXRSb3V0ZXIoKXtcblx0XHR2YXIgcm91dGllSW5wdXQgPSB7fTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRsZXQgcm91dGVCbG9jayA9IHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLm1hbmlmZXN0JylbdF0sXG5cdFx0XHRcdHBhdGhzID0gcm91dGVCbG9jay5wYXRocyxcblx0XHRcdFx0Y29udHJvbGxlciA9IHJvdXRlQmxvY2suY29udHJvbGxlcjtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHJvdXRpZUlucHV0W3BhdGhzW2ldXSA9IHRoaXMuYmluZENvbnRyb2xsZXIoY29udHJvbGxlcik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuYWRkTGlzdChyb3V0aWVJbnB1dCkubGlzdGVuKCk7Ly8ubmF2aWdhdGUodGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIuaW5kZXgnKSk7XG5cdH1cblxuXHRzZXRJbnRlcmZhY2VNYW5pZmVzdChtYW5pZmVzdCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnLCBtYW5pZmVzdCk7XG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxuXG5cdGdldEludGVyZmFjZU1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0Jyk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0Ly/QvdGD0LbQvdC+INC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDRgtGMXG5cdFx0Ly/QvNC+0LTQtdC70Lgg0L/QvtC70YPRh9C10L3QvdGL0LzQuCDQuNC90YLQtdGA0YTQtdC50YHQsNC80Lhcblx0XHR0aGlzLnVwZGF0ZUludGVyZmFjZXMoKTtcblx0XHQvL9C40L3QuNGG0LjQu9C40YbQuNGA0L7QstCw0YLRjCDQuCDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YAg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0XHR0aGlzLmluaXRDb250cm9sbGVyKCk7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXJ0QXBwKCkge1xuXHRcdC8v0YHQvtC30LTQsNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdC8v0YDQvtGD0YLQtdGAINC4INC/0YDQuNCy0Y/Qt9Cw0YLRjCDQuiDQvdC10LzRgyDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0dGhpcy5pbml0Um91dGVyKCk7XG5cdH1cblxuXHRiaW5kQ29udHJvbGxlcihjb250cm9sbGVyTmFtZSkge1xuXHRcdGxldCBhcHAgPSB0aGlzO1xuXHRcdHJldHVybiBmdW5jdGlvbigpe1xuXHRcdFx0bmV3IGNvbnRyb2xsZXJOYW1lKGFwcCwgYXJndW1lbnRzKTtcblx0XHR9O1xuXHR9XG5cblx0aW5pdENvbnRyb2xsZXIoKSB7XG5cdFx0aWYgKHR5cGVvZih0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJykpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0bGV0IGluaXRDb250cm9sbGVyID0gdGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdpbml0Q29udHJvbGxlcicsIG5ldyBpbml0Q29udHJvbGxlcih0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudENvbnRyb2xsZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInKTtcblx0fVxuXG5cdHNldEN1cnJlbnRDb250cm9sbGVyKGN0cmwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJywgY3RybCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR1cGRhdGVJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuY2xlYXJJbnRlcmZhY2VzKCk7XG5cdFx0bGV0IG1hbmlmZXN0cyA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0XHRpZiAobWFuaWZlc3RzKSB7XG5cdFx0XHRmb3IobGV0IG5hbWUgaW4gbWFuaWZlc3RzKXtcblx0XHRcdFx0bGV0IHJlY29yZE1hbmlmZXN0ID0gbWFuaWZlc3RzW25hbWVdO1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXSA9IChyZWNvcmREYXRhKSA9PiBuZXcgbm90UmVjb3JkKHJlY29yZE1hbmlmZXN0LCByZWNvcmREYXRhKTtcblx0XHRcdFx0d2luZG93WyducicgKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpXSA9IHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFJlY29yZE5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfUkVDT1JEX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRDb250cm9sbGVyTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9DT05UUk9MTEVSX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKTtcblx0fVxuXG5cdGNsZWFySW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ludGVyZmFjZXMnLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR3YWl0VGhpc1Jlc291cmNlKHR5cGUsIGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLnJlc291cmNlcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuXHRcdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV0gPSB7fTtcblx0XHR9XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gZmFsc2U7XG5cdFx0cmV0dXJuIHRoaXMub25SZXNvdXJjZVJlYWR5LmJpbmQodGhpcywgdHlwZSwgaW5kZXgpO1xuXHR9XG5cblx0b25SZXNvdXJjZVJlYWR5KHR5cGUsIGluZGV4KSB7XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gdHJ1ZTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0YWxsUmVzb3VyY2VzUmVhZHkoKSB7XG5cdFx0dmFyIGksIGo7XG5cdFx0Zm9yIChpIGluIHRoaXMucmVzb3VyY2VzKSB7XG5cdFx0XHRmb3IgKGogaW4gdGhpcy5yZXNvdXJjZXNbaV0pIHtcblx0XHRcdFx0aWYgKCF0aGlzLnJlc291cmNlc1tpXVtqXSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcblxuY29uc3QgTUVUQV9QUk9DRVNTT1JTID0gU3ltYm9sKCdwcm9jZXNzb3JzJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFByb2Nlc3NvcigvKiBrZXksIHZhbHVlICovKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQcm9jZXNzb3IoLyoga2V5LCAgZGVmYXVsdFZhbHVlICovKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXJQcm9jZXNzb3JzKCl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGQoKXtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG5cdFx0XHR0aGlzLnNldFByb2Nlc3Nvcihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBhcmd1bWVudHNbMF0pe1xuXHRcdFx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKHQsIGFyZ3VtZW50c1swXVt0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRQcm9jZXNzb3IoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyKCl7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vbm90VGVtcGxhdGVQcm9jZXNzb3JzJztcblxuLypcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGCIERPTSDQv9C+0LTQtNC10YDQtdCy0L4g0LIg0LrQsNGH0LXRgdGC0LLQtSDRiNCw0LHQu9C+0L3QsC5cbiAqINCX0LDQv9C+0LvQvdGP0LXRgiDQtdCz0L4g0LTQsNC90L3Ri9C80LguXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgdCz0LXQvdC10YDQuNGA0L7QstCw0L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xuICpcbiAqICovXG5cbi8qXG5cblx0PGRpdiBuLXRlbXBsYXRlLW5hbWU9XCJ2YXN5YVwiPlxuXHRcdDxwPjxpbnB1dCB0eXBlPVwidGV4dFwiIG4tdmFsdWU9XCI6Y29vbE5hbWVcIi8+PC9wPlxuXHRcdDxwPtCR0L7RgNC40YEg0YXRgNC10L0g0L/QvtC/0LDQtNC10YjRjCDQuCB7ezpjb29sTmFtZX19LjwvcD5cblx0PC9kaXY+XG5cbiAqL1xuXG5jb25zdCBNRVRBX0NPTVBPTkVOVFMgPSBTeW1ib2woJ2NvbXBvbmVudHMnKTtcblxuY2xhc3Mgbm90UmVuZGVyZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Lypcblx0XHRpbnB1dCA9IHtcblx0XHRcdGRhdGE6IG5vdFJlY29yZCxcblx0XHRcdHRlbXBsYXRlOiBlbGVtZW50XG5cdFx0XHRvcHRpb25zOntcblx0XHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdH1cblx0XHR9XG5cdCovXG5cblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXSA9IHt9O1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5jb21wb25lbnQgPSBpbnB1dC5jb21wb25lbnQ7XG5cdFx0dGhpcy5pbml0RGF0YShpbnB1dC5kYXRhID8gaW5wdXQuZGF0YSA6IHt9KTtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQudGVtcGxhdGUpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlKCk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGUoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZScsIHRoaXMuZ2V0V29ya2luZygnZ2V0VGVtcGxhdGUnKSgpKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5nZXREYXRhKCkub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdH1cblxuXHRpbml0V29ya2luZyh0ZW1wbGF0ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRnZXRUZW1wbGF0ZTogdGVtcGxhdGUsXG5cdFx0XHRwYXJ0SWQ6IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgPyB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpIDogT1BUUy5QQVJUX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpIHtcblx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcblx0XHRcdHJldHVybiBbLi4udGhpcy5jb21wb25lbnQuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2xlYXJTdGFzaCgpO1xuXHRcdHRoaXMuc2V0V29ya2luZ01hcHBpbmcoKTtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHR0aGlzLnNlYXJjaEZvclN1YlRlbXBsYXRlcygpO1xuXHRcdHRoaXMuc3Rhc2hSZW5kZXJlZCgpO1xuXHR9XG5cblx0b25DaGFuZ2UocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHR0aGlzLnVwZGF0ZShrZXkpO1xuXHRcdHRoaXMudHJpZ2dlcignb2Jzb2xldGUnLCBwcm94eSwga2V5LCB2YWx1ZSk7XG5cdH1cblxuXHR1cGRhdGUoa2V5KSB7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfQ09NUE9ORU5UU10pIHtcblx0XHRcdGxldCBpdGVtID0gdGhpc1tNRVRBX0NPTVBPTkVOVFNdW3RdLFxuXHRcdFx0XHRpZlBhcnQgPSB0cnVlO1xuXHRcdFx0aWYgKGtleSkge1xuXHRcdFx0XHRpZiAoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpID09PSBudWxsKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IGNvbXBvbmVudFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpKSxcblx0XHRcdFx0XHRjaGFuZ2VkUGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChrZXkpO1xuXHRcdFx0XHRpZlBhcnQgPSBub3RQYXRoLmlmRnVsbFN1YlBhdGgoY2hhbmdlZFBhdGgsIGNvbXBvbmVudFBhdGgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaWZQYXJ0KSB7XG5cdFx0XHRcdGl0ZW0udXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0V29ya2luZ01hcHBpbmcoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtYXBwaW5nJywgdGhpcy5jcmVhdGVNYXBwaW5nKCkpO1xuXHR9XG5cblx0LypcblxuXHTQodC+0LfQtNCw0LXQvCDQutCw0YDRgtGLINGB0L7QvtGC0LLQtdGB0YLQstC40Y8g0L/RgNC+0YbQtdGB0YHQvtGA0L7Qsiwg0L/Rg9GC0LXQuSDQtNCw0L3QvdGL0YUg0LIg0L7QsdGK0LXQutGC0LUg0Lgg0Y3Qu9C10LzQtdC90YLQvtCyINGI0LDQsdC70L7QvdCwLlxuXHRbe1xuXHRcdGVsLFxuXHRcdHByb2Nlc3Nvcixcblx0XHR3b3JraW5nLFxuXHRcdGl0ZW0ucHJvcGVydHkucGF0aFxuXHR9XVxuXG5cdCovXG5cblx0Y3JlYXRlTWFwcGluZygpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5maW5kQWxsUHJvY2Vzc29ycygpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmaW5kQWxsUHJvY2Vzc29ycygpIHtcblx0XHRsZXQgcHJvY3MgPSBbXSxcblx0XHRcdGVscyA9IG5vdENvbW1vbi5nZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCh0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSwgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpO1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgZWxzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMCwgYXR0cyA9IGVsc1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCkgPT09IDApIHtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coYXR0c1tpXSk7XG5cdFx0XHRcdFx0bGV0IHByb2NEYXRhID0gdGhpcy5wYXJzZVByb2Nlc3NvckV4cHJlc3Npb24oYXR0c1tpXS5ub2RlTmFtZSk7XG5cdFx0XHRcdFx0cHJvY0RhdGEuZWxlbWVudCA9IGVsc1tqXTtcblx0XHRcdFx0XHRwcm9jRGF0YS5wcm9jZXNzb3JFeHByZXNzaW9uID0gYXR0c1tpXS5ub2RlTmFtZTtcblx0XHRcdFx0XHRwcm9jRGF0YS5hdHRyaWJ1dGVFeHByZXNzaW9uID0gYXR0c1tpXS52YWx1ZTtcblx0XHRcdFx0XHRwcm9jcy5wdXNoKHByb2NEYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcHJvY3M7XG5cdH1cblxuXHRwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24ocHJvY2Vzc29yRXhwcmVzc2lvbikge1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRwYXJhbXM6IFtdLFxuXHRcdFx0cHJvY2Vzc29yTmFtZTogJycsXG5cdFx0XHRpZkNvbmRpdGlvbjogZmFsc2Vcblx0XHR9O1xuXHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgsICcnKTtcblx0XHRpZiAocHJvY2Vzc29yRXhwcmVzc2lvbi5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgpID09PSAocHJvY2Vzc29yRXhwcmVzc2lvbi5sZW5ndGggLSBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLmxlbmd0aCkpIHtcblx0XHRcdHJlc3VsdC5pZkNvbmRpdGlvbiA9IHRydWU7XG5cdFx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SICsgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCwgJycpO1xuXHRcdH1cblx0XHRyZXN1bHQucGFyYW1zID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5zcGxpdChPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUik7XG5cdFx0cmVzdWx0LnByb2Nlc3Nvck5hbWUgPSByZXN1bHQucGFyYW1zWzBdO1xuXHRcdHJlc3VsdC5wYXJhbXMgPSByZXN1bHQucGFyYW1zLnNsaWNlKDEpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRleGVjUHJvY2Vzc29ycyhpdGVtLCBpbmRleCkge1xuXHRcdGxldCBtYXBwaW5nID0gdGhpcy5nZXRXb3JraW5nKCdtYXBwaW5nJyk7XG5cdFx0aWYgKG1hcHBpbmcpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbWFwcGluZy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgcHJvY1Njb3BlID0gbWFwcGluZ1tpXTtcblx0XHRcdFx0cHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwcm9jU2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2F0dHJpYnV0ZVJlc3VsdCcsIHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQpO1xuXHRcdFx0XHRsZXQgcHJvY05hbWUgPSBwcm9jU2NvcGUucHJvY2Vzc29yTmFtZSxcblx0XHRcdFx0XHRwcm9jID0gbm90VGVtcGxhdGVQcm9jZXNzb3JzLmdldChwcm9jTmFtZSk7XG5cdFx0XHRcdGlmIChwcm9jKSB7XG5cdFx0XHRcdFx0cHJvYyhwcm9jU2NvcGUsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdFx0XHRcdFx0cHJvY1Njb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb2NTY29wZS5wcm9jZXNzb3JFeHByZXNzaW9uKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ25vIHByb2Nlc3NvciBsaWtlJywgcHJvY05hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcigncmVuZGVyZWQnKTtcblx0fVxuXG5cdGdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocGF0aCwgaXRlbSkge1xuXHRcdHJldHVybiBub3RQYXRoLmdldChwYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHR9XG5cblx0Y2xlYXJTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5kZXN0cm95U3VicygpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3VicycsIFtdKTtcblx0fVxuXG5cdGRlc3Ryb3lTdWJzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiB0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0U3Rhc2goKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0bGV0IGVsID0gdGhpcy5nZXRTdGFzaCgpW3RdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUpIHtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWZTdWJFbGVtZW50UmVuZGVyZWQobnRFbCkge1xuXHRcdHJldHVybiBudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZCAmJiAobnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQudmFsdWUgPT09ICd0cnVlJyk7XG5cdH1cblxuXHRzZWFyY2hGb3JTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGxldCBzdWJzID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzdWIgdGVtcGxhdGVzJywgc3Vicyk7XG5cdFx0Zm9yIChsZXQgbnQgPSAwOyBudCA8IHN1YnMubGVuZ3RoOyBudCsrKSB7XG5cdFx0XHRpZiAoIXRoaXMuaWZTdWJFbGVtZW50UmVuZGVyZWQoc3Vic1tudF0pKSB7XG5cdFx0XHRcdHRoaXMucmVuZGVyU3ViKHN1YnNbbnRdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhZGRTdWIobnRFbCkge1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnc3VicycpLnB1c2goe1xuXHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRwYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogJycsXG5cdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS5zcmMgOiAnJyxcblx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdFx0cmVuZGVyZWRMaXN0OiBbXSxcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclN1YihudEVsKSB7XG5cdFx0aWYgKCFudEVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGxldCBkZXRhaWxzID0ge1xuXHRcdFx0XHRkYXRhUGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6IG51bGwsXG5cdFx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLnNyYy52YWx1ZSA6ICcnLFxuXHRcdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdGRhdGE6IGRldGFpbHMuZGF0YVBhdGggIT09IG51bGwgPyB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQoZGV0YWlscy5kYXRhUGF0aCwgdGhpcy5nZXREYXRhKCkpIDogbnVsbCxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0c3JjOiBkZXRhaWxzLnNyY1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pLFxuXHRcdFx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUFmdGVyJyxcblx0XHRcdFx0XHRpZDogZGV0YWlscy5pZCxcblx0XHRcdFx0XHRudEVsOiBudEVsLFxuXHRcdFx0XHRcdGRhdGFQYXRoOiBkZXRhaWxzLmRhdGFQYXRoXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG93bmVyOiB0aGlzXG5cdFx0XHR9O1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdpZCcsIGRldGFpbHMuaWQpO1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXVtkZXRhaWxzLmlkXSA9IG5ldyBub3RDb21wb25lbnQob3B0aW9ucyk7XG5cdH1cblxuXHRjbGVhclN0YXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBbXSk7XG5cdH1cblxuXHRnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3RlbXBsYXRlJyk7XG5cdH1cblxuXHRnZXRTdGFzaCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzdGFzaCcpO1xuXHR9XG5cblx0c3Rhc2hSZW5kZXJlZCgpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCk7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0dGhpcy5hZGRUb1N0YXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdH1cblxuXHRyZXBsYWNlUmVuZGVyZWQoKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdyZXBsYWNlIHN0YXNoJyk7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLFxuXHRcdFx0c3Rhc2ggPSB0aGlzLmdldFN0YXNoKCksXG5cdFx0XHRuZXdTdGFzaCA9IFtdLFxuXHRcdFx0YW5jaG9yID0gc3Rhc2gubGVuZ3RoID4gMCA/IHN0YXNoWzBdIDogdGhpcy5nZXRPcHRpb25zKCdudEVsJyksXG5cdFx0XHRwYXJlbnROb2RlID0gYW5jaG9yLnBhcmVudE5vZGU7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0bmV3U3Rhc2gucHVzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgbmV3U3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdGlmIChhbmNob3IubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1N0YXNoW3RdLCBhbmNob3IubmV4dFNpYmxpbmcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3U3Rhc2hbdF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHN0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRwYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0YXNoW3RdKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIG5ld1N0YXNoKTtcblx0fVxuXG5cdGFkZFRvU3Rhc2gobm9kZSkge1xuXHRcdHRoaXMuZ2V0U3Rhc2goKS5wdXNoKG5vZGUpO1xuXHR9XG5cblx0aXNEYXRhKGRhdGEgPSB7fSkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKSA9PT0gZGF0YTtcblx0fVxuXG5cdGhpZGUoKSB7XG5cblx0fVxuXG5cdHNob3coKSB7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZW5kZXJlcjtcbiIsImNvbnN0IHBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHtcblx0XHRsZXQgbCA9IDA7XG5cdFx0d2hpbGUgKHRhcmdldEVsLmNoaWxkcmVuLmxlbmd0aCAtIGwpIHtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlblswXS5ub2RlTmFtZSA9PT0gJ05UJyl7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ250IGZvdW5kZWQnKTtcblx0XHRcdFx0bCsrO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ3JlbW92ZSBjaGlsZCAnLHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdFx0dGFyZ2V0RWwucmVtb3ZlQ2hpbGQodGFyZ2V0RWwuY2hpbGRyZW5bbF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0YXJnZXRFbC50ZXh0Q29udGVudCA9ICcnO1xuXHR9LFxuXHRiZWZvcmVFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGNoaWxkICcsIHJlbmRlcmVkW2ldKTtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fVxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlO1xuIiwiY29uc3QgcGxhY2VBZnRlciA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQWZ0ZXI7XG4iLCJjb25zdCBwbGFjZUJlZm9yZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQmVmb3JlO1xuIiwiY29uc3QgcGxhY2VGaXJzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IHJlbmRlcmVkLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdwbGFjZSBmaXJzdCcsIGksIHJlbmRlcmVkW2ldKTtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgYmVmb3JlIGZpcnN0Jyk7XG5cdFx0XHRcdHRhcmdldEVsLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwuY2hpbGRyZW5bMF0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBhcyBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2VGaXJzdDtcbiIsImNvbnN0IHBsYWNlTGFzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VMYXN0O1xuIiwiY29uc3QgcmVwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XHRcdFxuXHRcdGlmICh0YXJnZXRFbC5ub2RlTmFtZSAhPT0gJ05UJyl7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhcmdldEVsKTtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2U7XG4iLCJpbXBvcnQgcGxhY2UgZnJvbSAnLi9wbGFjZSc7XG5pbXBvcnQgcGxhY2VBZnRlciBmcm9tICcuL3BsYWNlQWZ0ZXInO1xuaW1wb3J0IHBsYWNlQmVmb3JlIGZyb20gJy4vcGxhY2VCZWZvcmUnO1xuaW1wb3J0IHBsYWNlRmlyc3QgZnJvbSAnLi9wbGFjZUZpcnN0JztcbmltcG9ydCBwbGFjZUxhc3QgZnJvbSAnLi9wbGFjZUxhc3QnO1xuaW1wb3J0IHJlcGxhY2UgZnJvbSAnLi9yZXBsYWNlJztcblxuY29uc3Qgbm90UGxhY2VycyA9IHtcblx0cGxhY2U6IHBsYWNlLFxuXHRwbGFjZUFmdGVyOiBwbGFjZUFmdGVyLFxuXHRwbGFjZUJlZm9yZTogcGxhY2VCZWZvcmUsXG5cdHBsYWNlRmlyc3Q6IHBsYWNlRmlyc3QsXG5cdHBsYWNlTGFzdDogcGxhY2VMYXN0LFxuXHRyZXBsYWNlOiByZXBsYWNlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RQbGFjZXJzO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi9ub3RUZW1wbGF0ZUNhY2hlJztcbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL25vdFJlbmRlcmVyJztcbmltcG9ydCBub3RQbGFjZXJzIGZyb20gJy4vcGxhY2Vycyc7XG5cbmNvbnN0IE1FVEFfUEFSVFMgPSBTeW1ib2woJ3BhcnRzJyk7XG4vKlxuXHRpbnB1dCA9IHtcblx0XHRkYXRhOiBub3RSZWNvcmQgb3IgW25vdFJlY29yZF0sXG5cdFx0dGVtcGxhdGU6IHtcblx0XHRcdGh0bWw6IGh0bWwoc3RyaW5nKSwgXHRcdC8v0YLQtdC60YHRgiDRgSBodG1sINC60L7QtNC+0Lwg0YjQsNCx0LvQvtC90LBcblx0XHRcdGVsOiBIVE1MRWxlbWVudChvYmplY3QpLCBcdC8vRE9NINGN0LvQtdC80LXQvdGCXG5cdFx0XHRzcmM6IHNyYyhzdHJpbmcpLFx0XHRcdC8v0YHRgdGL0LvQutCwINC90LAg0YTQsNC50Lsg0YEg0YjQsNCx0LvQvtC90L7QvFxuXHRcdFx0bmFtZTogbmFtZShzdHJpbmcpXHRcdFx0Ly/QvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwINC00LvRjyDQv9C+0LjRgdC60LAg0LIg0LrRjdGI0LUgbm90VGVtcGxhdGVDYWNoZVxuXHRcdH1cblx0XHRvcHRpb25zOntcblx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdC8v0LAg0Y3RgtC+INC60LDQuiDQsdGD0LTQtdC8INC/0L7QvNC10YnQsNGC0Ywg0YDQtdC30YPQu9GM0YLQsNGCINGA0LXQvdC00LXRgNC40L3Qs9CwXG5cdFx0XHRyZW5kZXJBbmQ6IHBsYWNlU3R5bGUoc3RyaW5nKSDQvtC00LjQvSDQuNC3INCy0LDRgNC40LDQvdGC0L7QslxuXHRcdFx0XHRcdHBsYWNlXHRcdC1cdNC/0L7QvNC10YnQsNC10Lwg0LLQvdGD0YLRgNC4INGG0LXQu9C10LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuXHRcdFx0XHRcdHJlcGxhY2VcdFx0LVx00LfQsNC80LXQvdGP0LXQvFxuXHRcdFx0XHRcdHBsYWNlQWZ0ZXJcdC1cdNC/0L7RgdC70LVcblx0XHRcdFx0XHRwbGFjZUJlZm9yZVx0LVx00LTQvlxuXHRcdFx0XHRcdHBsYWNlRmlyc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C10YDQstGL0Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdFx0XHRcdHBsYWNlTGFzdFx0LVx00LLQvdGD0YLRgNC4INC/0L7RgdC70LXQtNC90LjQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0fVxuXHR9XG4qL1xuY2xhc3Mgbm90Q29tcG9uZW50IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHRcdHRoaXMub24oJ3JlYWR5JywgdGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCl7XG5cdFx0aWYgKHRoaXMub3duZXIpe1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLm93bmVyLmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fVxuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLm93bmVyID0gaW5wdXQub3duZXI/aW5wdXQub3duZXI6bnVsbDtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQpO1xuXHRcdHRoaXMucHJlcGFyZVRlbXBsYXRlRWxlbWVudChpbnB1dC50ZW1wbGF0ZSA/IGlucHV0LnRlbXBsYXRlIDogbnVsbCk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0fVxuXG5cdGluaXRFdmVudHMobGlzdCl7XG5cdFx0Zm9yKGxldCB0IG9mIGxpc3Qpe1xuXHRcdFx0dGhpcy5vbiguLi50KTtcblx0XHR9XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnaWQnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2lkJywgT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdudEVsJykpe1xuXHRcdFx0dGhpcy5pbml0TWFya0VsZW1lbnQoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFya0VsZW1lbnQoKXtcblx0XHRsZXQgbWFya0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbnQnKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ250RWwnLCBtYXJrRWwpO1xuXHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKSxcblx0XHRcdHRhcmdldFF1ZXJ5ID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpO1xuXHRcdGlmICh0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZiAodGFyZ2V0KXtcblx0XHRcdFx0dGhpcy5zZXRPcHRpb25zKCd0YXJnZXRFbCcsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpe1xuXHRcdFx0dGhyb3cgJ05vIHRhcmdldCB0byBwbGFjZSByZW5kZXJlZCc7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIubWFpbih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksIFttYXJrRWxdKTtcblx0XHR9XG5cblx0fVxuXG5cdGluaXRXb3JraW5nKHZhbCkge1xuXHRcdHRoaXMudW5zZXRSZWFkeSh2YWwpO1xuXHR9XG5cblx0cHJlcGFyZVRlbXBsYXRlRWxlbWVudCh2YWwpIHtcblx0XHRpZiAoIXZhbCkge1xuXHRcdFx0dGhpcy51bnNldFJlYWR5KCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2h0bWwnKSAmJiB2YWwuaHRtbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLndyYXAoJycsICcnLCB2YWwuaHRtbCkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdlbCcpICYmIHZhbC5lbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudCh2YWwuZWwuY2xvbmVOb2RlKHRydWUpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnc3JjJykgJiYgdmFsLnNyYykge1xuXHRcdFx0bm90VGVtcGxhdGVDYWNoZS5hZGRGcm9tVVJMKHZhbC5zcmMsIHZhbC5zcmMpXG5cdFx0XHRcdC50aGVuKHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQuYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCduYW1lJykgJiYgdmFsLm5hbWUpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS5nZXQodmFsLm5hbWUpKTtcblx0XHR9XG5cdH1cblxuXHRzZXRQcm90b1RlbXBsYXRlRWxlbWVudChjb250KSB7XG5cdFx0aWYgKGNvbnQpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnLCBjb250KTtcblx0XHRcdHRoaXMudHJpZ2dlcigncmVhZHknKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdXcm9uZyB0ZW1wbGF0ZSBjb250YWluZXIgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JykuY2xvbmVOb2RlKHRydWUpO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdHJlc2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnLCB0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkuY2xvbmVOb2RlKHRydWUpKTtcblx0fVxuXG5cdHNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB0cnVlKTtcblx0fVxuXG5cdHVuc2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIGZhbHNlKTtcblx0fVxuXG5cdGlzUmVhZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncmVhZHknKTtcblx0fVxuXG5cdGNsZWFyUGFydHMoKSB7XG5cdFx0Lyog0LjQt9Cy0LXRidCw0LXQvCDQvtCxINGD0LTQsNC70LXQvdC40Lgg0Y3Qu9C10LzQtdC90YLQvtCyICovXG5cdFx0aWYgKHRoaXNbTUVUQV9QQVJUU10gJiYgQXJyYXkuaXNBcnJheSh0aGlzW01FVEFfUEFSVFNdKSAmJiB0aGlzW01FVEFfUEFSVFNdLmxlbmd0aCkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiB0aGlzW01FVEFfUEFSVFNdKSB7XG5cdFx0XHRcdGlmICh0LmRlc3Ryb3kpe1xuXHRcdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHR9XG5cblx0ZGVzdHJveSgpe1xuXHRcdHRoaXMuY2xlYXJQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ250RWwnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlKXtcblx0XHRcdHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5nZXRPcHRpb25zKCdudEVsJykpO1xuXHRcdH1cblx0XHR0aGlzLmRlYWQgPSB0cnVlO1xuXHRcdHRoaXMub2ZmQWxsKCk7XG5cdH1cblxuXHRyZXNldFBhcnRzKCkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10gPSBbXTtcblx0fVxuXG5cdGdldFBhcnRzKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfUEFSVFNdO1xuXHR9XG5cblx0YWRkUGFydCh0ZW1wbGF0ZSkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10ucHVzaCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0dGhpcy5yZW1vdmVPYnNvbGV0ZVBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHBsYWNlci5iZWZvcmUodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHRwbGFjZXIuYWZ0ZXIodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyB0YXJnZXQgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdHBsYWNlUGFydChkYXRhLCBpbmRleCl7XG5cdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSksXG5cdFx0XHRub2RlcyA9IHBhcnQmJnBhcnQuZ2V0U3Rhc2g/cGFydC5nZXRTdGFzaCgpOltdLFxuXHRcdFx0dGFyZ2V0RWwsXG5cdFx0XHRsYXN0Tm9kZSxcblx0XHRcdHBsYWNlcjtcblx0XHRpZiAoaW5kZXggPT09IDApe1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0XHR0YXJnZXRFbCA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKE9QVFMuREVGQVVMVF9QTEFDRVJfTE9PUCk7XG5cdFx0XHR0YXJnZXRFbCA9IHRoaXMuZ2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnKTtcblx0XHR9XG5cdFx0cGxhY2VyLm1haW4odGFyZ2V0RWwsIG5vZGVzKTtcblx0XHRsYXN0Tm9kZSA9IHRhcmdldEVsO1xuXHRcdGZvcihsZXQgdCBvZiBub2Rlcyl7XG5cdFx0XHRpZiAodC5ub2RlVHlwZSA9PT0gMSl7XG5cdFx0XHRcdGxhc3ROb2RlID0gdDtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1jb21wb25lbnQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdFx0XHRsYXN0Tm9kZS5zZXRBdHRyaWJ1dGUoJ250LXBhcnQnLCBwYXJ0LmdldFdvcmtpbmcoJ3BhcnRJZCcpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScsIGxhc3ROb2RlKTtcblx0fVxuXG5cdGdldFBsYWNlcihtZXRob2QpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NlYXJjaGluZyBmb3IgcGxhY2VyJywgbWV0aG9kKTtcblx0XHRpZiAobm90UGxhY2Vycy5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG5cdFx0XHRyZXR1cm4gbm90UGxhY2Vyc1ttZXRob2RdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbm90UGxhY2Vyc1tPUFRTLkRFRkFVTFRfUExBQ0VSXTtcblx0XHR9XG5cdH1cblxuXHRmb3JFYWNoRGF0YShmdW5jKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5nZXREYXRhKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0RGF0YSgpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXREYXRhKClbdF0sIHQpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpLCAwKTtcblx0XHR9XG5cdH1cblxuXHRmb3JFYWNoUGFydChmdW5jKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5nZXRQYXJ0cygpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFBhcnRzKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldFBhcnRzKClbdF0sIHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx00LXRgdC70Lgg0YEg0LTQsNC90L3Ri9C80Lgg0L3QtSDRgdCy0Y/Qt9Cw0L0g0YDQtdC90LTQtdGA0LXRgCAtINGB0L7Qt9C00LDQtdC8XG5cdCovXG5cblx0cmVuZGVyUGFydChkYXRhKSB7XG5cdFx0aWYgKCF0aGlzLmdldFBhcnRCeURhdGEoZGF0YSkpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3JlYXRpbmcgcGFydCByZW5kZXInKTtcblx0XHRcdGxldCByZW5kZXJlciA9IG5ldyBub3RSZW5kZXJlcih7XG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdHRlbXBsYXRlOiB0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUuYmluZCh0aGlzKSxcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKCksXG5cdFx0XHRcdGNvbXBvbmVudDogdGhpc1xuXHRcdFx0fSk7XG5cdFx0XHQvL3JlbmRlcmVyLm9uKCdvYnNvbGV0ZScsIHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5hZGRQYXJ0KHJlbmRlcmVyKTtcblx0XHR9ZWxzZXtcblx0XHRcdC8vbm90Q29tbW9uLmxvZygndXBkYXRpbmcgcGFydCByZW5kZXInKTtcblx0XHRcdHRoaXMudXBkYXRlUGFydCh0aGlzLmdldFBhcnRCeURhdGEoZGF0YSkpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZVBhcnQocGFydCl7XG5cdFx0cGFydC51cGRhdGUoKTtcblx0fVxuXG5cdHJlbW92ZU9ic29sZXRlUGFydHMoKSB7XG5cdFx0Ly/QutC+0L3QstC10LXRgCDQv9C+0LjRgdC6INCw0LrRgtGD0LDQu9GM0L3Ri9GFIC0g0YPQtNCw0LvQtdC90LjQtSDQvtGB0YLQsNC70YzQvdGL0YVcblx0XHRub3RDb21tb24ucGlwZShcblx0XHRcdHVuZGVmaW5lZCwgLy8gcGFydHMgdG8gc2VhcmNoIGluLCBjYW4gYmUgJ3VuZGVmaW5lZCdcblx0XHRcdFtcblx0XHRcdFx0dGhpcy5maW5kQWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9maXJzdCByb3VuZCwgc2VhcmNoIGZvciBvYnNvbGV0ZVxuXHRcdFx0XHR0aGlzLnJlbW92ZU5vdEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vcmVtb3ZlICdlbVxuXHRcdFx0XVxuXHRcdCk7XG5cdH1cblxuXHQvKlxuXHRcdNC10YHRgtGMINC00LDQvdC90YvQtSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINCw0LrRgtGD0LDQu9GM0L3Qvixcblx0XHTQvdC10YIg0LTQsNC90L3Ri9GFINC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0YHRgtCw0YDRjNGRXG5cdCovXG5cblx0ZmluZEFjdHVhbFBhcnRzKCkge1xuXHRcdGxldCBhY3R1YWxQYXJ0cyA9IFtdO1xuXHRcdHRoaXMuZm9yRWFjaERhdGEoKGRhdGEvKiwgaW5kZXgqLyk9Pntcblx0XHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpO1xuXHRcdFx0aWYgKHBhcnQpe1xuXHRcdFx0XHRhY3R1YWxQYXJ0cy5wdXNoKHBhcnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBhY3R1YWxQYXJ0cztcblx0fVxuXG5cdC8qXG5cdFx00YPQtNCw0LvRj9C10Lwg0LLRgdC1INC60YDQvtC80LUg0LDQutGC0YPQsNC70YzQvdGL0YVcblx0Ki9cblx0cmVtb3ZlTm90QWN0dWFsUGFydHMoYWN0dWFsUGFydHMpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFBhcnRzKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYgKGFjdHVhbFBhcnRzLmluZGV4T2YodGhpcy5nZXRQYXJ0cygpW3RdKSA9PT0gLTEpe1xuXHRcdFx0XHR0aGlzLmdldFBhcnRzKClbdF0uZGVzdHJveSgpO1xuXHRcdFx0XHR0aGlzLmdldFBhcnRzKCkuc3BsaWNlKHQsIDEpO1xuXHRcdFx0XHR0LS07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0UGFydEJ5RGF0YShkYXRhKSB7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzLmdldFBhcnRzKCkpIHtcblx0XHRcdGlmICh0aGlzLmdldFBhcnRzKClbdF0uaXNEYXRhKGRhdGEpKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFBhcnRzKClbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHNob3coKXtcblxuXHR9XG5cblx0aGlkZSgpe1xuXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tcG9uZW50O1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IgPSAnLnBhZ2UtY29udGVudCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdTX1BPU1RGSVggPSAnLmh0bWwnLFxuXHRPUFRfREVGQVVMVF9WSUVXX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCA9IHRydWUsXG5cdE9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FID0gJ01vZGVscycsXG5cdE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FID0gJ01vZGVsJyxcblx0T1BUX0RFRkFVTFRfTU9EVUxFX05BTUUgPSAnbWFpbicsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9BTkQgPSAncGxhY2UnO1xuXG5jbGFzcyBub3RDb250cm9sbGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGFwcCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgY29udHJvbGxlcicpO1xuXHRcdHRoaXMuYXBwID0gYXBwO1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyZWFkeTogZmFsc2UsXG5cdFx0XHR2aWV3czoge30sXG5cdFx0XHRsaWJzOnt9LFxuXHRcdFx0dmlld05hbWU6IE9QVF9ERUZBVUxUX1ZJRVdfTkFNRSxcblx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0fSk7XG5cdFx0dGhpcy5zZXREYXRhKHt9KTtcblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0bW9kdWxlTmFtZTogT1BUX0RFRkFVTFRfTU9EVUxFX05BTUUsXG5cdFx0XHRjb250YWluZXJTZWxlY3RvcjogT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SLFxuXHRcdFx0cHJlZml4OiB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGUnKSxcblx0XHRcdHBvc3RmaXg6IE9QVF9ERUZBVUxUX1ZJRVdTX1BPU1RGSVgsXG5cdFx0XHRyZW5kZXJGcm9tVVJMOiBPUFRfREVGQVVMVF9SRU5ERVJfRlJPTV9VUkwsXG5cdFx0XHRuYW1lczp7XG5cdFx0XHRcdHBsdXJhbDpPUFRfREVGQVVMVF9QTFVSQUxfTkFNRSxcblx0XHRcdFx0c2luZ2xlOiBPUFRfREVGQVVMVF9TSU5HTEVfTkFNRVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMub24oJ3JlYWR5JywgdGhpcy5pbml0UmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdC8qXG5cdFx0ICAgINGB0YDQsNC30YMg0LTQtdC70LDQtdC8INC00L7RgdGC0YPQv9C90YvQvNC4INC80L7QtNC10LvQuCBub3RSZWNvcmQg0LjQtyBuY2BDb250cm9sbGVyTmFtZWAg0LHRg9C00YPRgiDQtNC+0YHRgtGD0L/QvdGLINC60LDQuiB0aGlzLm5yYE1vZGVsTmFtZWBcblx0XHQqL1xuXHRcdGxldCBpbnRlcmZhY2VzID0gdGhpcy5hcHAuZ2V0SW50ZXJmYWNlcygpO1xuXHRcdHRoaXMubWFrZSA9IHt9O1xuXHRcdGZvciAobGV0IHQgaW4gaW50ZXJmYWNlcykge1xuXHRcdFx0aWYgKGludGVyZmFjZXMuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHR0aGlzLm1ha2VbdF0gPSBpbnRlcmZhY2VzW3RdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRSZW5kZXIoKXtcblx0XHR0aGlzLnJlbmRlcih0aGlzLmdldFdvcmtpbmcoJ3ZpZXdOYW1lJyksIHRoaXMuZ2V0RGF0YSgpLCB0aGlzLmdldFdvcmtpbmcoJ2hlbHBlcnMnKSk7XG5cdH1cblxuXHRyZW5kZXIodmlld05hbWUgPSdkZWZhdWx0JyAvKiB2aWV3IG5hbWUgKi8sIGRhdGEgPSB7fSAvKiBkYXRhIGZvciBub3RUZW1wbGF0ZSovICwgaGVscGVycyA9IHt9LyogY291bGQgYmUgbm90IHJlcHJlc2VudGVkICovKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHR2YXIgdmlldyA9IHRoaXMuZ2V0Vmlldyh2aWV3TmFtZSk7XG5cblx0XHRcdGlmICh0eXBlb2YgdmlldyA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldyA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZWplY3QoJ05vIHZpZXcgZm91bmQnLCB2aWV3TmFtZSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dmlldyA9IG5vdENvbW1vbi5leHRlbmQoe30sIHZpZXcpO1xuXHRcdFx0XHQvLyDQtdGB0LvQuCBwbGFjZSDQvdC1INGD0LrQsNC30LDQvdC+LCDRh9GC0L4g0LLQvtC30LzQvtC20L3QviDQuCDRgNCw0LfRg9C80L3QviDQv9GA0Lgg0L3QtSDRgdGD0YnQtdGB0YLQstC+0LLQsNC90LjQuFxuXHRcdFx0XHQvLyDRjdC70LXQvNC10L3RgtCwLCDQvdC+INC40LfQstC10YHRgtC90L7QvCDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgNC1XG5cdFx0XHRcdGlmICgoKHR5cGVvZiB2aWV3LnRhcmdldEVsID09PSAndW5kZWZpbmVkJykgfHwgKHZpZXcudGFyZ2V0RWwgPT09IG51bGwpKSAmJiAodHlwZW9mIHZpZXcudGFyZ2V0UXVlcnkgIT09ICd1bmRlZmluZWQnICYmIHZpZXcudGFyZ2V0UXVlcnkgIT09IG51bGwgJiYgdmlldy50YXJnZXRRdWVyeS5sZW5ndGggPiAwKSkge1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZpZXcudGFyZ2V0UXVlcnkpO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHR2aWV3LnRhcmdldEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJykpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZpZXcuZGF0YSA9IGRhdGE7XG5cdFx0XHRcdGlmICh0eXBlb2Ygdmlldy5oZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3LmhlbHBlcnMgIT09IG51bGwgJiYgT2JqZWN0LmtleXModmlldy5oZWxwZXJzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh2aWV3LmhlbHBlcnMsIGhlbHBlcnMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZpZXcuaGVscGVycyA9IGhlbHBlcnM7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly/QtdGB0LvQuCDQvdGD0LbQvdC+INC30LDQs9GA0YPQttCw0YLRjCDRiNCw0LHQu9C+0L3Ri1xuXHRcdFx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJGcm9tVVJMJykpIHtcblx0XHRcdFx0XHQvL9C4INCw0LTRgNC10YEg0L3QtSDRg9C60LDQt9Cw0L1cblx0XHRcdFx0XHRpZiAodHlwZW9mIHZpZXcudGVtcGxhdGVVUkwgPT09ICd1bmRlZmluZWQnIHx8IHZpZXcudGVtcGxhdGVVUkwgPT0gbnVsbCB8fCB2aWV3LnRlbXBsYXRlVVJMLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdFx0XHRsZXQgcHJlZml4ID0gKHZpZXcuY29tbW9uID8gdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMuY29tbW9uJyk6IHRoaXMuZ2V0TW9kdWxlUHJlZml4KCkpLFxuXHRcdFx0XHRcdFx0XHRuYW1lID0gKCh0eXBlb2Ygdmlldy5uYW1lICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3Lm5hbWUgIT09IG51bGwgJiYgdmlldy5uYW1lLmxlbmd0aCA+IDApID8gdmlldy5uYW1lIDogdmlld05hbWUpLFxuXHRcdFx0XHRcdFx0XHRwb3N0Zml4ID0gdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0XHQvL9Cz0LXQvdC10YDQuNGA0YPQtdC8INCw0LTRgNC10YEg0L/QviDRiNCw0LHQu9C+0L3Rg1xuXHRcdFx0XHRcdFx0dmlldy50ZW1wbGF0ZVVSTCA9ICBbcHJlZml4LCBuYW1lXS5qb2luKCcvJykgKyBwb3N0Zml4O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL9CwINC10YHQu9C4INC10YHRgtGMINC90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAsINGC0L5cblx0XHRcdFx0XHRpZiAodmlldy5oYXNPd25Qcm9wZXJ0eSgndGVtcGxhdGVOYW1lJykpIHtcblx0XHRcdFx0XHRcdC8vLi4uXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlTmFtZSA9IHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyB2aWV3LnRlbXBsYXRlTmFtZSArIHRoaXMuZ2V0T3B0aW9ucygncG9zdGZpeCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudCcsIG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRcdGRhdGEsXG5cdFx0XHRcdFx0dGVtcGxhdGU6e1xuXHRcdFx0XHRcdFx0bmFtZTogdmlldy50ZW1wbGF0ZU5hbWUsXG5cdFx0XHRcdFx0XHRzcmM6IHZpZXcudGVtcGxhdGVVUkwsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6W1snYWZ0ZXJSZW5kZXInLCByZXNvbHZlXV0sXG5cdFx0XHRcdFx0b3B0aW9uczp7XG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogdmlldy50YXJnZXRFbCxcblx0XHRcdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdFx0XHRyZW5kZXJBbmQ6IHZpZXcucmVuZGVyQW5kIHx8IE9QVF9ERUZBVUxUX1JFTkRFUl9BTkRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QXBwKCkge1xuXHRcdHJldHVybiB0aGlzLmFwcDtcblx0fVxuXG5cdHNldE1vZGVsKG1vZGVsKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtb2RlbCcsIG1vZGVsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZGVsKCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ21vZGVsJyk7XG5cdH1cblxuXHRzZXRSZWFkeSh2YWwgPSB0cnVlKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIHZhbCk7XG5cdFx0dmFsID8gdGhpcy50cmlnZ2VyKCdyZWFkeScpIDogdGhpcy50cmlnZ2VyKCdidXN5Jyk7XG5cdH1cblxuXHRzZXRWaWV3KG5hbWUsIHZpZXcpe1xuXHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgbmFtZSksIHZpZXcpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0Vmlld3Modmlld3Mpe1xuXHRcdGZvcihsZXQgdCBpbiB2aWV3cyl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIHQpLCB2aWV3c1t0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0VmlldyhuYW1lID0gJ2RlZmF1bHQnKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSk7XG5cdH1cblxuXHRzZXRNb2R1bGVOYW1lKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbW9kdWxlTmFtZScsIHZhbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNb2R1bGVOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ21vZHVsZU5hbWUnKTtcblx0fVxuXG5cdGdldE1vZHVsZVByZWZpeCgpe1xuXHRcdHJldHVybiBbdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMubW9kdWxlcycpLCB0aGlzLmdldE1vZHVsZU5hbWUoKV0uam9pbignLycpO1xuXHR9XG5cblx0cHJlbG9hZExpYihsaXN0ID0ge30pe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0aWYodHlwZW9mIGxpc3QgIT09ICdvYmplY3QnKXtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGxpc3Qpe1xuXHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnB1c2gobGlzdFt0XSk7XG5cdFx0XHRcdFx0dGhpcy5tYWtlW2xpc3RbdF1dKHt9KS4kbGlzdEFsbCgpXG5cdFx0XHRcdFx0XHQudGhlbigoZGF0YSk9Pntcblx0XHRcdFx0XHRcdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKSl7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXRPcHRpb25zKCdsaWJzJywge30pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0T3B0aW9ucygnbGlicycpW3RdID0gZGF0YTtcblx0XHRcdFx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuaW5kZXhPZihsaXN0W3RdKSA+IC0xKXtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuaW5kZXhPZihsaXN0W3RdKSwgMSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuY2F0Y2goKGVycik9Pntcblx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLnJlcG9ydChlcnIpO1xuXHRcdFx0XHRcdFx0XHRyZWplY3QoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRxdWVlVXBsb2FkKG5hbWUsIGxpc3Qpe1xuXHRcdC8vaGFzaCAoZmllbGROYW1lPT5maWxlc0xpc3QpXG5cdFx0aWYoIXRoaXMuZ2V0V29ya2luZygndXBsb2FkUXVlZScpKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZygndXBsb2FkUXVlZScsIHt9KTtcblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCd1cGxvYWRRdWVlJylbbmFtZV0gPSBsaXN0O1xuXHR9XG5cblx0ZXhlY1VwbG9hZHMoaXRlbSl7XG5cdFx0bGV0IGxpc3QgPSB0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnKTtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGlmKHR5cGVvZiBsaXN0ICE9PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdHJlc29sdmUoaXRlbSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCd1cGxvYWRpbmcnLCB7fSk7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBsaXN0KXtcblx0XHRcdFx0XHRsZXQgZmllbGRGaWxlcyA9IGxpc3RbdF07XG5cdFx0XHRcdFx0aWYgKGZpZWxkRmlsZXMubGVuZ3RoID4gMSl7XG5cdFx0XHRcdFx0XHRpdGVtW3RdID0gW107XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRpdGVtW3RdID0gJyc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvcihsZXQgZiA9IDA7IGYgPCBmaWVsZEZpbGVzLmxlbmd0aDsgZisrKXtcblx0XHRcdFx0XHRcdGlmKCF0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XSA9IDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdKys7XG5cdFx0XHRcdFx0XHR0aGlzLmFwcC5nZXRXb3JraW5nKCd1cGxvYWRlcicpXG5cdFx0XHRcdFx0XHRcdC51cGxvYWQoZmllbGRGaWxlc1tmXSlcblx0XHRcdFx0XHRcdFx0LnRoZW4oKHNhdmVkRmlsZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2ZpbGUgdXBsb2FkZWQnLCB0LGYsIHNhdmVkRmlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XS0tO1xuXHRcdFx0XHRcdFx0XHRcdGlmKHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0gPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmKEFycmF5LmlzQXJyYXkoaXRlbVtmXSkpe1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVt0XS5wdXNoKHNhdmVkRmlsZS5oYXNoKTtcblx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1bdF0gPSBzYXZlZEZpbGUuaGFzaDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoT2JqZWN0LmtleXModGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKSkubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoaXRlbSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQuY2F0Y2goKGVycik9Pntcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KGVycik7XG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZihPYmplY3Qua2V5cyh0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdHJlc29sdmUoaXRlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdG9uQWZ0ZXJSZW5kZXIoKXtcblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb250cm9sbGVyO1xuIiwiaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfRk9STV9QUkVGSVggPSAnZm9ybV8nLFxuXHRPUFRfREVGQVVMVF9ST0xFX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX0ZPUk1fVElUTEUgPSAnRm9ybSBkZWZhdWx0IHRpdGxlJyxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiA9IHt9LFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCA9IFsnb3B0aW9ucycsICdtYW5pZmVzdCcsICdhcHAnXTtcblxuY2xhc3Mgbm90Rm9ybSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygncHJlZml4JywgT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgpO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudHMnLCBbXSk7XG5cdFx0aWYgKCF0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5zZXREYXRhKG5ldyBub3RSZWNvcmQoe30sIHRoaXMuZ2V0RGF0YSgpKSk7XG5cdFx0fVxuXHRcdHRoaXMub24oJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbigncmVzZXQnLCB0aGlzLm9uUmVzZXQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2FuY2VsJywgdGhpcy5vbkNhbmNlbC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCk7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKCkge1xuXHRcdGxldCBtYW5pZmVzdCA9IHRoaXMuZ2V0TWFuaWZlc3QoKTtcblx0XHRpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QuYWN0aW9ucykge1xuXHRcdFx0cmV0dXJuIG1hbmlmZXN0LmFjdGlvbnMuaGFzT3duUHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKSkgPyBtYW5pZmVzdC5hY3Rpb25zW3RoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJyldIDogbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Rm9ybUZpZWxkc0xpc3QoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKSxcblx0XHRcdGxpc3QgPSBbXSxcblx0XHRcdHJvbGUgPSB0aGlzLmdldE9wdGlvbnMoJ3JvbGUnLCBPUFRfREVGQVVMVF9ST0xFX05BTUUpO1xuXHRcdGlmIChhY3Rpb25EYXRhKSB7XG5cblx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcykge1xuXHRcdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMuaGFzT3duUHJvcGVydHkocm9sZSkpIHtcblx0XHRcdFx0XHRsaXN0ID0gYWN0aW9uRGF0YS5maWVsZHNbcm9sZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHQvKlxuXHRcdFJlbmRlcmluZ1xuXHQqL1xuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0fVxuXG5cdGdldFBhcnRUZW1wbGF0ZU5hbWUoZm9ybVBhcnQpe1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgZm9ybVBhcnQ7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBpbnB1dCA9IHtcblx0XHRcdFx0ZGF0YTogdGhpcy5nZXRXcmFwcGVyRGF0YSgpLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZSgnd3JhcHBlcicpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0aWQ6IHRoaXMuZ2V0T3B0aW9ucygnaWQnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6W1xuXHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCB0aGlzLmJpbmRGb3JtRXZlbnRzLmJpbmQodGhpcyldLFxuXHRcdFx0XHRcdFtbJ2FmdGVyUmVuZGVyJywgJ2FmdGVyVXBkYXRlJ10sIHRoaXMucmVuZGVyQ29tcG9uZW50cy5iaW5kKHRoaXMpXVxuXHRcdFx0XHRdXG5cdFx0XHR9O1xuXHRcdFx0bGV0IHdyYXBwZXIgPSBuZXcgbm90Q29tcG9uZW50KGlucHV0KTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnd3JhcHBlcicsIHdyYXBwZXIpO1xuXHRcdH1cblx0fVxuXG5cdGdldFdyYXBwZXJEYXRhKCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiBhY3Rpb25EYXRhLnRpdGxlID8gYWN0aW9uRGF0YS50aXRsZSA6IE9QVF9ERUZBVUxUX0ZPUk1fVElUTEVcblx0XHR9O1xuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykgJiYgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoKXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRsZXQgZmllbGROYW1lID0gdGhpcy5nZXRGb3JtRmllbGRzTGlzdCgpW3RdO1xuXHRcdFx0XHR0aGlzLmFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xlYXJGaWVsZHNDb21wb25lbnRzKCkge1xuXHRcdGxldCBjb21wcyA9IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpO1xuXHRcdHdoaWxlIChjb21wcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb21wc1swXS5jb21wb25lbnQuZGVzdHJveSgpO1xuXHRcdFx0Y29tcHMuc3BsaWNlKDAsIDEpO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpYnMoKXtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0b3B0aW9uczoge30sXG5cdFx0XHRtYW5pZmVzdDoge30sXG5cdFx0XHRhcHA6IHt9LFxuXHRcdH07XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJykpIHtcblx0XHRcdHJlc3VsdC5vcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKG5vdENvbW1vbi5nZXRBcHAoKSAmJiBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJykpe1xuXHRcdFx0cmVzdWx0LmFwcCA9IG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkICYmIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkpe1xuXHRcdFx0cmVzdWx0Lm1hbmlmZXN0ID0gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKS5maWVsZHM7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSkge1xuXHRcdGxldCBkZWYgPSBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OLFxuXHRcdFx0ZmllbGRzTGlicyA9IHRoaXMuZ2V0RmllbGRzTGlicygpO1xuXHRcdGZvcihsZXQgdCBvZiBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCl7XG5cdFx0XHRpZiAoZmllbGRzTGlicy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBmaWVsZHNMaWJzW3RdLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpe1xuXHRcdFx0XHRyZXR1cm4gZmllbGRzTGlic1t0XVtmaWVsZE5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0YWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKSB7XG5cdFx0bGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpO1xuXHRcdGxldCByZWMgPSB7XG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRuYW1lOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHRpdGxlOiBmaWVsZFR5cGUubGFiZWwgfHwgZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHR0eXBlOiBmaWVsZFR5cGUudHlwZSxcblx0XHRcdFx0bGFiZWw6IGZpZWxkVHlwZS5sYWJlbCxcblx0XHRcdFx0YXJyYXk6IGZpZWxkVHlwZS5hcnJheSxcblx0XHRcdFx0ZGVmYXVsdDogZmllbGRUeXBlLmRlZmF1bHQsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ2hlbHBlcnMnLCdsaWJzJyxmaWVsZE5hbWUpKVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0bGV0IGhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdGlzQ2hlY2tlZDogKHBhcmFtcyk9Pntcblx0XHRcdFx0cmV0dXJuIHBhcmFtcy5pdGVtLnZhbHVlID09PSB0aGlzLmdldERhdGEoZmllbGROYW1lKTtcblx0XHRcdH0sXG5cdFx0XHRmaWVsZDogcmVjLmZpZWxkLFxuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKClcblxuXHRcdH0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblx0XHRyZWMuY29tcG9uZW50ID0gbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZShmaWVsZFR5cGUudHlwZSlcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldEZvcm1UYXJnZXRFbGVtZW50KGZpZWxkVHlwZS50YXJnZXQpLFxuXHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUxhc3QnLFxuXHRcdFx0XHRldmVudHM6W1xuXHRcdFx0XHRcdFsnYWZ0ZXJEYXRhQ2hhbmdlJywgdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5wdXNoKHJlYyk7XG5cdH1cblxuXHRjb2xsZWN0RGF0YUZyb21Db21wb25lbnRzKHBhcmFtcyl7XG5cdFx0bm90Q29tbW9uLmxvZygnY29sbGVjdCBkYXRhIGZyb20gY29tcG9uZW50cycsIHBhcmFtcyk7XG5cdH1cblxuXHRnZXRGb3JtVGFyZ2V0RWxlbWVudCh0YXJnZXQgPSAnYm9keScpe1xuXHRcdGlmICghdGFyZ2V0KXt0YXJnZXQgPSAnYm9keSc7fVxuXHRcdGxldCByZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdGlmICghcmVzICYmIHRhcmdldCE9PSdib2R5Jyl7XG5cdFx0XHR0YXJnZXQgPSAnYm9keSc7XG5cdFx0XHRyZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdH1cblx0XHRpZighcmVzICYmIHRhcmdldD09J2JvZHknKXtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gcmVzO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0RGF0YSBtYW5hZ2VtZW50XG5cdCovXG5cblx0Y29sbGVjdERhdGEoKSB7XG5cdFx0Ly9sZXQgZGF0YSA9IHRoaXMuY29sbGVjdERhdGFGcm9tQ29tcG9uZW50cy5iaW5kKHRoaXMpO1xuXHR9XG5cblx0YmluZEZvcm1FdmVudHMoKXtcblx0XHRsZXQgdGFyZ2V0UXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5Jyk7XG5cdFx0aWYodGFyZ2V0UXVlcnkpe1xuXHRcdFx0bGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0UXVlcnkpO1xuXHRcdFx0aWYodGFyZ2V0KXtcblx0XHRcdFx0dGhpcy5zZXRPcHRpb25zKCd0YXJnZXRFbCcsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpe1xuXHRcdFx0bGV0XHRmb3JtID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcblx0XHRcdGlmKGZvcm0pe1xuXHRcdFx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSk7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCB0aGlzLm9uUmVzZXQuYmluZCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlRmllbGQoZmllbGROYW1lKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmZpZWxkLm5hbWUgPT09IGZpZWxkTmFtZSl7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR1cGRhdGUoKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0RXZlbnQgaGFuZGxlcnNcblx0Ki9cblxuXHRvblN1Ym1pdCgpIHtcblxuXHR9XG5cblx0b25DYW5jZWwoKSB7XG5cblx0fVxuXG5cdG9uUmVzZXQoKSB7XG5cblx0fVxuXG5cdGdldEZpZWxkcygpIHtcblxuXHR9XG5cblx0YWRkRmllbGQoKSB7XG5cblx0fVxuXG5cdHJlbW92ZUZpZWxkKCkge1xuXG5cdH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEZvcm07XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi4vbm90UmVjb3JkJztcbmltcG9ydCBub3RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvbm90Rm9ybS5qcyc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX1ZJRVcgPSAnZWRpdCcsXG5cdE9QVF9ERUZBVUxUX0FDVElPTiA9ICdjcmVhdGUnLFxuXHRPUFRfREVGQVVMVF9JVEVNID0ge1xuXHRcdF9pZDogbnVsbCxcblx0XHR0aXRsZTogJ1RpdGxlJyxcblx0XHR2YWx1ZTogJ1ZhbHVlJ1xuXHR9O1xuXG5jbGFzcyBDUlVEQ3JlYXRlIGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKSB7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgQ3JlYXRlJyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuY29tbW9uJykgfHwgdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG5cdFx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLmluaXREYXRhLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlcldyYXBwZXIuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyRm9ybS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlRGVmYXVsdCgpIHtcblx0XHRpZiAodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmRlZmF1bHRJdGVtJykgJiYgdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICYmIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXShub3RDb21tb24uZXh0ZW5kKHt9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuZGVmYXVsdEl0ZW0nKSkpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wYXJlbnQuaW5pdEl0ZW0pIHtcblx0XHRcdHJldHVybiB0aGlzLnBhcmVudC5pbml0SXRlbSgpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICYmIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXShub3RDb21tb24uZXh0ZW5kKHt9LCBPUFRfREVGQVVMVF9JVEVNKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBuZXcgbm90UmVjb3JkKHt9LCBub3RDb21tb24uZXh0ZW5kKHt9LCBPUFRfREVGQVVMVF9JVEVNKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdERhdGEoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0YSh0aGlzLmNyZWF0ZURlZmF1bHQoKSk7XG5cdFx0XHRcdHJlc29sdmUodGhpcy5nZXREYXRhKCkpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnJlbmRlcignZGVmYXVsdCcsIHt9LCB7fSk7XG5cdH1cblxuXHRyZW5kZXJGb3JtKCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLmZvcm0gPSBuZXcgbm90Rm9ybSh7XG5cdFx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0YWN0aW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfQUNUSU9OLFxuXHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUudGFyZ2V0UXVlcnknKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS50YXJnZXRRdWVyeScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JykpLFxuXHRcdFx0XHRcdHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnByZWZpeCcpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuXHRcdFx0XHRcdHJvbGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5yb2xlJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygncm9sZScpLFxuXHRcdFx0XHRcdGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0XHRcdFx0bGlua0JhY2tUb0xpc3Q6IHRoaXMucGFyZW50LmxpbmtCYWNrVG9MaXN0KCksXG5cdFx0XHRcdFx0XHRmaWxlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGxldCBmaWxlcyA9IHBhcmFtcy5lLnRhcmdldC5maWxlcyB8fCBwYXJhbXMuZS5kYXRhVHJhbnNmZXIuZmlsZXM7XG5cdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2ZpbGUgY2hhbmdlZCcsIGZpbGVzKTtcblx0XHRcdFx0XHRcdFx0aWYgKHBhcmFtcy5oZWxwZXJzLmZpZWxkLm5hbWUgJiYgZmlsZXMpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnF1ZWVVcGxvYWQocGFyYW1zLmhlbHBlcnMuZmllbGQubmFtZSwgZmlsZXMpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3VibWl0OiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ3N1Ym1pdCBmb3JtICcsIHRoaXMubmV3SXRlbSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZXhlY1VwbG9hZHModGhpcy5nZXREYXRhKCkpXG5cdFx0XHRcdFx0XHRcdFx0LnRoZW4odGhpcy5jcmVhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0YWZ0ZXJTdWJtaXQ6ICgpID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy5nb1RvVGFibGUoKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRsaWJzOiB0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKSxcblx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuaGVscGVycycpIHx8IHt9KVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV0sXG5cdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0WydhZnRlclN1Ym1pdCcsICdhZnRlclJlc3RvcmUnXSwgdGhpcy5wYXJlbnQuYmFja1RvTGlzdC5iaW5kKHRoaXMucGFyZW50KVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjcmVhdGUoaXRlbSkge1xuXHRcdGl0ZW1bJyQnICsgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmFjdGlvbicpXSgpXG5cdFx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ2Zvcm0gc2F2ZWQnLCByZXN1bHQpO1xuXHRcdFx0XHR0aGlzLnBhcmVudC5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUodGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Zvcm0gbm90IHNhdmVkJywgcmVzdWx0KTtcblx0XHRcdH0pO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRENyZWF0ZTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX1BBR0VfU0laRSA9IDIwLFxuXHRPUFRfREVGQVVMVF9QQUdFX05VTUJFUiA9IDAsXG5cdE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OID0gMSxcblx0T1BUX0RFRkFVTFRfU09SVF9GSUVMRCA9ICdfaWQnLFxuXHRPUFRfRklFTERfTkFNRV9QUkVfUFJPQyA9ICdwcmVwcm9jZXNzb3InO1xuXG5jbGFzcyBub3RUYWJsZSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpIHx8ICFBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgncm93cycpKSkge1xuXHRcdFx0dGhpcy5zZXREYXRhKHtcblx0XHRcdFx0cm93czogW11cblx0XHRcdH0pO1xuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR0aGlzLnJlc2V0RmlsdGVyKCk7XG5cdFx0dGhpcy5yZXNldFNvcnRlcigpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50JykpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50JykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBjb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogJ3RhYmxlX3dyYXBwZXInXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRyZW5kZXJBbmQ6IHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgJ2FmdGVyVXBkYXRlJ10sXG5cdFx0XHRcdFx0XHRbdGhpcy5pbml0QXV0b2xvYWRlci5iaW5kKHRoaXMpLCB0aGlzLnJlbmRlckluc2lkZS5iaW5kKHRoaXMpXVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudCcsIGNvbXBvbmVudCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVySW5zaWRlKCkge1xuXHRcdHRoaXMucmVuZGVySGVhZGVyKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdFx0dGhpcy5yZW5kZXJCb2R5KCk7XG5cdFx0dGhpcy5iaW5kU2VhcmNoKCk7XG5cdFx0dGhpcy5iaW5kQ3VzdG9tQmluZGluZ3MoKTtcblx0fVxuXG5cdHJlbmRlckhlYWRlcigpIHtcblx0XHR2YXIgdGFibGVIZWFkZXIgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGhlYWQgdHInKTtcblx0XHRpZiAoIXRhYmxlSGVhZGVyKSByZXR1cm47XG5cdFx0bGV0IGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBuZXdUaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJyk7XG5cdFx0XHRuZXdUaC5pbm5lckhUTUwgPSBmaWVsZHNbaV0udGl0bGU7XG5cdFx0XHRpZiAoZmllbGRzW2ldLmhhc093blByb3BlcnR5KCdzb3J0YWJsZScpICYmIGZpZWxkc1tpXS5zb3J0YWJsZSkge1xuXHRcdFx0XHR0aGlzLmF0dGFjaFNvcnRpbmdIYW5kbGVycyhuZXdUaCwgZmllbGRzW2ldLnBhdGgpO1xuXHRcdFx0fVxuXHRcdFx0dGFibGVIZWFkZXIuYXBwZW5kQ2hpbGQobmV3VGgpO1xuXHRcdH1cblx0fVxuXG5cdGF0dGFjaFNvcnRpbmdIYW5kbGVycyhoZWFkQ2VsbCwgZmllbGROYW1lKSB7XG5cdFx0aGVhZENlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5jaGFuZ2VTb3J0aW5nT3B0aW9ucyhoZWFkQ2VsbCwgZmllbGROYW1lKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblx0XHRoZWFkQ2VsbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdH1cblxuXHRjaGFuZ2VTb3J0aW5nT3B0aW9ucyhlbCwgZmllbGROYW1lKSB7XG5cdFx0aWYgKGZpZWxkTmFtZSA9PT0gdGhpcy5nZXRTb3J0ZXIoKS5zb3J0QnlGaWVsZCkge1xuXHRcdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0XHRzb3J0QnlGaWVsZDogZmllbGROYW1lLFxuXHRcdFx0XHRzb3J0RGlyZWN0aW9uOiAtMSAqIHRoaXMuZ2V0U29ydGVyKCkuc29ydERpcmVjdGlvbixcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRcdHNvcnRCeUZpZWxkOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHNvcnREaXJlY3Rpb246IE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmIChlbC5wYXJlbnROb2RlKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsLnBhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0gPT09IGVsKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ25vbmUnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0U29ydGVyKCkuc29ydERpcmVjdGlvbiA+IDApIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ2FzY2VuZGluZycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdkZXNjZW5kaW5nJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0U29ydGVyKGhhc2gpIHtcblx0XHQvL2NvbnNvbGUubG9nKCdzZXRTb3J0ZXInLCBoYXNoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3NvcnRlcicsIGhhc2gpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZURhdGEoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0U29ydGVyKCkge1xuXHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdHNvcnRCeUZpZWxkOiBPUFRfREVGQVVMVF9TT1JUX0ZJRUxELFxuXHRcdFx0c29ydERpcmVjdGlvbjogT1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04sXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRTb3J0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc29ydGVyJyk7XG5cdH1cblxuXHRnZXRGaWx0ZXJTZWFyY2goKSB7XG5cdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5nZXRGaWx0ZXIoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRGaWx0ZXIoKSAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2ggIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoICE9PSBudWxsKSA/IHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoLnRvU3RyaW5nKCkgOiAnJztcblx0fVxuXG5cdGludmFsaWRhdGVEYXRhKCkge1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2xpdmVMb2FkJykgJiYgdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpKSB7XG5cdFx0XHRpZiAodGhpcy5nZXREYXRhKCdyb3dzJykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHR0aGlzLmdldERhdGEoJ3Jvd3MnKS5zcGxpY2UoMCwgdGhpcy5nZXREYXRhKCdyb3dzJykubGVuZ3RoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMucmVzZXRQYWdlcigpO1xuXHRcdH1cblx0fVxuXG5cdHNldEZpbHRlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXInLCBoYXNoKTtcblx0XHR0aGlzLmludmFsaWRhdGVEYXRhKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHR0aGlzLnNldEZpbHRlcih7fSk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyJyk7XG5cdH1cblxuXHRzZXRQYWdlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdwYWdlcicsIGhhc2gpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3BhZ2VyJywge1xuXHRcdFx0cGFnZVNpemU6IGlzTmFOKHRoaXMuZ2V0T3B0aW9ucygncGFnZVNpemUnKSkgPyBPUFRfREVGQVVMVF9QQUdFX1NJWkUgOiB0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJyksXG5cdFx0XHRwYWdlTnVtYmVyOiBpc05hTih0aGlzLmdldE9wdGlvbnMoJ3BhZ2VOdW1iZXInKSkgPyBPUFRfREVGQVVMVF9QQUdFX05VTUJFUiA6IHRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncGFnZXInKTtcblx0fVxuXG5cdHNldFVwZGF0aW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndXBkYXRpbmcnLCB0cnVlKTtcblx0fVxuXG5cdHNldFVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd1cGRhdGluZycsIGZhbHNlKTtcblx0fVxuXG5cdGlmVXBkYXRpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndXBkYXRpbmcnKTtcblx0fVxuXG5cdHVwZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKSB7XG5cdFx0XHRpZiAodGhpcy5pZlVwZGF0aW5nKCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly9sb2FkIGZyb20gc2VydmVyXG5cdFx0XHRsZXQgcXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKHt9KVxuXHRcdFx0XHQuc2V0RmlsdGVyKHRoaXMuZ2V0RmlsdGVyKCkpXG5cdFx0XHRcdC5zZXRTb3J0ZXIodGhpcy5nZXRTb3J0ZXIoKSlcblx0XHRcdFx0LnNldFBhZ2VyKHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSwgdGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpO1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0cXVlcnkuJGxpc3QoKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJyRsaXN0IGZvciB0YWJsZScsIGRhdGEpO1xuXHRcdFx0XHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRcdFx0XHRyb3dzOiB0aGlzLmdldERhdGEoJ3Jvd3MnKS5jb25jYXQoZGF0YSlcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR0aGlzLnByb2NjZXNzRGF0YSgpO1xuXHRcdFx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKGUpO1xuXHRcdFx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9sb2NhbCBtYWdpY1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0dGhpcy5wcm9jY2Vzc0RhdGEoKTtcblx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdH1cblx0fVxuXG5cdHByb2NjZXNzRGF0YSgpIHtcblx0XHR2YXIgdGhhdEZpbHRlciA9IHRoaXMuZ2V0RmlsdGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0RmlsdGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyICE9PSBudWxsICYmIHR5cGVvZiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2ggIT09IG51bGwgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2gubGVuZ3RoID4gMCkge1xuXHRcdFx0Ly9cblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgdGhpcy5nZXREYXRhKCdyb3dzJykuZmlsdGVyKHRoaXMudGVzdERhdGFJdGVtLmJpbmQodGhpcykpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKSk7XG5cdFx0fVxuXHRcdC8vLy9zb3J0ZXJcblx0XHR2YXIgdGhhdFNvcnRlciA9IHRoaXMuZ2V0U29ydGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0U29ydGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0U29ydGVyICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4ge1xuXHRcdFx0XHRsZXQgdDEgPSBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLCBpdGVtMSwge30pLFxuXHRcdFx0XHRcdHQyID0gbm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCwgaXRlbTIsIHt9KTtcblx0XHRcdFx0aWYgKGlzTmFOKHQxKSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdDEgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0MiAhPT0gJ3VuZGVmaW5lZCcgJiYgdDEubG9jYWxlQ29tcGFyZSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHQxLmxvY2FsZUNvbXBhcmUoKSAqIC10aGF0U29ydGVyLnNvcnREaXJlY3Rpb247XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gKCh0MSA8IHQyKSA/IDEgOiAtMSkgKiB0aGF0U29ydGVyLnNvcnREaXJlY3Rpb247XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGJpbmRTZWFyY2goKSB7XG5cdFx0dmFyIHNlYXJjaEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJzZWFyY2hcIl0nKVswXTtcblx0XHRpZiAoIXNlYXJjaEVsKSByZXR1cm47XG5cdFx0dmFyIG9uRXZlbnQgPSAoZSkgPT4ge1xuXHRcdFx0dGhpcy5zZXRGaWx0ZXIoe1xuXHRcdFx0XHRmaWx0ZXJTZWFyY2g6IGUuY3VycmVudFRhcmdldC52YWx1ZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXHRcdHNlYXJjaEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25FdmVudCk7XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcignZW50ZXInLCBvbkV2ZW50KTtcblx0fVxuXG5cblx0YmluZEN1c3RvbUJpbmRpbmdzKCkge1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpIHx8ICF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Zm9yICh2YXIgc2VsZWN0b3IgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpKSB7XG5cdFx0XHR2YXIgZWxzID0gdGhpcy5nZXRPcHRpb24oJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRmb3IgKHZhciBlbElkID0gMDsgZWxJZCA8IGVscy5sZW5ndGg7IGVsSWQrKykge1xuXHRcdFx0XHR2YXIgZWwgPSBlbHNbZWxJZF07XG5cdFx0XHRcdGZvciAodmFyIGV2ZW50IGluIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl0pIHtcblx0XHRcdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJylbc2VsZWN0b3JdW2V2ZW50XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRsb2FkTmV4dCgpIHtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJykucGFnZU51bWJlcisrO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVuZGVyUm93KGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG5ld1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RSJyksXG5cdFx0XHRmaWVsZHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgbmV3VGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdURCcpLFxuXHRcdFx0XHRmaWVsZCA9IGZpZWxkc1tpXSxcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gbnVsbCxcblx0XHRcdFx0dmFsID0gbm90UGF0aC5nZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdlZGl0YWJsZScpICYmICFmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnY29tcG9uZW50JykpIHtcblx0XHRcdFx0bmV3VGQuc2V0QXR0cmlidXRlKCdjb250ZW50RWRpdGFibGUnLCB0cnVlKTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC5wYXRoID0gZmllbGQucGF0aDtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC5pdGVtSWQgPSBpdGVtW3RoaXMuZ2V0T3B0aW9ucygnaXRlbUlkRmllbGQnKV07XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQudmFsdWUgPSB2YWw7XG5cdFx0XHRcdG5ld1RkLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB7XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksIG5ld1RkLnRleHRDb250ZW50KTtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eShPUFRfRklFTERfTkFNRV9QUkVfUFJPQykpIHtcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gZmllbGRbT1BUX0ZJRUxEX05BTUVfUFJFX1BST0NdKHZhbCwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHRcdG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRcdGRhdGE6IGZpZWxkLmNvbXBvbmVudC5kYXRhIHx8IHByZXByb2Nlc3NlZCB8fCB7XG5cdFx0XHRcdFx0XHR2YWwsXG5cdFx0XHRcdFx0XHRpdGVtLFxuXHRcdFx0XHRcdFx0aW5kZXhcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHRlbXBsYXRlOiBmaWVsZC5jb21wb25lbnQudGVtcGxhdGUsXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IG5ld1RkLFxuXHRcdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogZmllbGQuY29tcG9uZW50LmV2ZW50cyB8fCBbXVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ld1RkLmlubmVySFRNTCA9IHByZXByb2Nlc3NlZCB8fCB2YWw7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnc3R5bGUnKSkge1xuXHRcdFx0XHRmb3IgKGxldCBzdHlsZSBpbiBmaWVsZC5zdHlsZSkge1xuXHRcdFx0XHRcdGlmIChmaWVsZC5zdHlsZS5oYXNPd25Qcm9wZXJ0eShzdHlsZSkpIHtcblx0XHRcdFx0XHRcdG5ld1RkLnN0eWxlW3N0eWxlXSA9IGZpZWxkLnN0eWxlW3N0eWxlXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdldmVudHMnKSAmJiBmaWVsZC5ldmVudHMpIHtcblx0XHRcdFx0Zm9yICh2YXIgaiBpbiBmaWVsZC5ldmVudHMpIHtcblx0XHRcdFx0XHRuZXdUZC5hZGRFdmVudExpc3RlbmVyKGosIChlKSA9PiB7XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmllbGQuZXZlbnRzW2pdKHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQ6IGUsXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQ6IG5ld1RkLFxuXHRcdFx0XHRcdFx0XHRpdGVtOiBpdGVtLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdmFsLFxuXHRcdFx0XHRcdFx0XHRmaWVsZDogZmllbGRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bmV3Um93LmFwcGVuZENoaWxkKG5ld1RkKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygncHJvY1JvdycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcm9jUm93JykobmV3Um93LCBpdGVtKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Jvdztcblx0fVxuXG5cdHJlZnJlc2hCb2R5KCkge1xuXHRcdHZhciB0Ym9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRib2R5KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuY2xlYXJCb2R5KCk7XG5cdFx0dGhpcy5jaGVja0ZpbHRlcmVkKCk7XG5cdFx0dmFyIHRoaXNQYWdlU3RhcnRzID0gMCxcblx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpO1xuXHRcdGZvciAodmFyIGkgPSB0aGlzUGFnZVN0YXJ0czsgaSA8IE1hdGgubWluKG5leHRQYWdlRW5kcywgdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5sZW5ndGgpOyBpKyspIHtcblx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHR9XG5cdH1cblxuXHRmaW5kQm9keSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG5cdH1cblxuXHRjbGVhckJvZHkoKSB7XG5cdFx0dmFyIHRhYmxlQm9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRhYmxlQm9keSkgcmV0dXJuO1xuXHRcdHRhYmxlQm9keS5pbm5lckhUTUwgPSAnJztcblx0fVxuXG5cdGNoZWNrRmlsdGVyZWQoKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykpKSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIFtdKTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJCb2R5KCkge1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpKSB7XG5cdFx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdH1cblx0XHR0aGlzLmNoZWNrRmlsdGVyZWQoKTtcblxuXHRcdHZhciB0aGlzUGFnZVN0YXJ0cyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciksXG5cdFx0XHRuZXh0UGFnZUVuZHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIgKyAxKSxcblx0XHRcdHRib2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0dGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJSb3codGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKVtpXSkpO1xuXHRcdH1cblx0fVxuXG5cdHRlc3REYXRhSXRlbShpdGVtKSB7XG5cdFx0dmFyIHN0clZhbHVlID0gdGhpcy5nZXRGaWx0ZXJTZWFyY2goKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGZvciAodmFyIGsgaW4gaXRlbSkge1xuXHRcdFx0dmFyIHRvQ29tcCA9IGl0ZW1ba10udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKHRvQ29tcC5pbmRleE9mKHN0clZhbHVlKSA+IC0xKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpbml0QXV0b2xvYWRlcigpIHtcblx0XHRpZiAoalF1ZXJ5ICYmIGpRdWVyeS5zY3JvbGxTcHkgJiYgIXRoaXMuZ2V0V29ya2luZygnbGl2ZScpKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnYXV0b2xvYWQgcG9zc2libGUnKTtcblx0XHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2xpdmVMb2FkJykgJiYgdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpICYmIHRoaXMuZ2V0T3B0aW9ucygnZm9vdGVyUXVlcnknKSkge1xuXHRcdFx0XHRsZXQgdCA9ICQodGhpcy5nZXRPcHRpb25zKCdmb290ZXJRdWVyeScpKTtcblx0XHRcdFx0aWYgKHQpIHtcblx0XHRcdFx0XHR0Lm9uKCdzY3JvbGxTcHk6ZW50ZXInLCB0aGlzLmxvYWROZXh0LmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdHQuc2Nyb2xsU3B5KCk7XG5cdFx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdsaXZlJywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90VGFibGU7XG4iLCJpbXBvcnQgbm90VGFibGUgZnJvbSAnLi4vY29tcG9uZW50cy9ub3RUYWJsZS5qcyc7XG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BfREVGQVVMVF9QQUdFX1NJWkUgPSA1MCxcblx0T1BUX0RFRkFVTFRfVklFVyA9ICdsaXN0JztcblxuY2xhc3MgQ1JVRExpc3QgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpIHtcblx0XHRzdXBlcihwYXJlbnQuYXBwKTtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0bm90Q29tbW9uLmxvZygnQ1JVRCBMaXN0Jyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5jb21tb24nKSB8fCB0cnVlLFxuXHRcdFx0XHR0YXJnZXRRdWVyeTogcGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuXHRcdFx0XHRoZWxwZXJzOiB7fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy51cGRhdGVEYXRhdGFibGUuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0Jywge30sIHtcblx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5wbHVyYWwnKSxcblx0XHRcdHNob3dBZGRGb3JtOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZShbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpLCAnY3JlYXRlJ10uam9pbignLycpKTtcblx0XHRcdH0sXG5cdFx0XHRsaW5rQmFja1RvTGlzdDogdGhpcy5wYXJlbnQubGlua0JhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCksXG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVEYXRhdGFibGUoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoaXMudGFibGVWaWV3ID0gbmV3IG5vdFRhYmxlKHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRmaWVsZHM6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuZmllbGRzJyksXG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ25hbWVzLnBsdXJhbCcpXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmhlbHBlcnMnKSB8fCB7fSksXG5cdFx0XHRcdFx0XHRwYWdlU2l6ZTogdGhpcy5hcHAuZ2V0T3B0aW9ucygncGFnZXIuc2l6ZScpIHx8IE9QX0RFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0XHRcdFx0cGFnZU51bWJlcjogMCxcblx0XHRcdFx0XHRcdG9uZVBhZ2VyOiB0cnVlLFxuXHRcdFx0XHRcdFx0bGl2ZUxvYWQ6IHRydWUsXG5cdFx0XHRcdFx0XHRmb290ZXJRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5mb290ZXJRdWVyeScpLFxuXHRcdFx0XHRcdFx0aW50ZXJmYWNlOiB0aGlzLm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzaG93TmV4dFBhZ2UoKSB7XG5cdFx0aWYgKHRoaXMudGFibGVWaWV3KSB7XG5cdFx0XHR0aGlzLnRhYmxlVmlldy5sb2FkTmV4dCgpO1xuXHRcdH1cblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURMaXN0O1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL25vdEZvcm0uanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTiA9ICdnZXRSYXcnLFxuXHRPUFRfREVGQVVMVF9BQ1RJT04gPSAndXBkYXRlJyxcblx0T1BUX0RFRkFVTFRfVklFVyA9ICdlZGl0JztcblxuY2xhc3MgQ1JVRFVwZGF0ZSBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIFVwZGF0ZScpO1xuXHRcdHRoaXMuc2V0Vmlld3Moe1xuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRuYW1lOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmNvbW1vbicpIHx8IHRydWUsXG5cdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuXHRcdFx0XHRoZWxwZXJzOiB7fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLmxvYWRJdGVtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnNldERhdGEuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJGb3JtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRsb2FkSXRlbSgpIHtcblx0XHRyZXR1cm4gdGhpcy5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0oe1xuXHRcdFx0J19pZCc6IHRoaXMuZ2V0T3B0aW9ucygncGFyYW1zLjAnKVxuXHRcdH0pWyckJyArICh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUubG9hZEFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OKV0oKTtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0JywgdGhpcy5nZXREYXRhKCksIHt9KTtcblx0fVxuXG5cdHJlbmRlckZvcm0oKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoaXMuZm9ybSA9IG5ldyBub3RGb3JtKHtcblx0XHRcdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRhY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9BQ1RJT04sXG5cdFx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRcdHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnByZWZpeCcpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuXHRcdFx0XHRcdFx0cm9sZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnJvbGUnKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdyb2xlJyksXG5cdFx0XHRcdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0XHRcdFx0XHRmaWxlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGZpbGVzID0gcGFyYW1zLmUudGFyZ2V0LmZpbGVzIHx8IHBhcmFtcy5lLmRhdGFUcmFuc2Zlci5maWxlcztcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdmaWxlIGNoYW5nZWQnLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHBhcmFtcy5oZWxwZXJzLmZpZWxkLm5hbWUgJiYgZmlsZXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucXVlZVVwbG9hZChwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRzdWJtaXQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdzdWJtaXQgZm9ybSAnLCBwYXJhbXMuaXRlbSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5leGVjVXBsb2FkcyhwYXJhbXMuaXRlbSlcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRsaWJzOiB0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKSxcblx0XHRcdFx0XHRcdFx0YWZ0ZXJTdWJtaXQ6IHRoaXMucGFyZW50LmJhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCksXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuaGVscGVycycpIHx8IHt9KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRcdFsnYWZ0ZXJSZXN0b3JlJywgJ2FmdGVyU3VibWl0J10sIHRoaXMucGFyZW50LmJhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudClcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUoaXRlbSkge1xuXHRcdGl0ZW1bJyQnICsgKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9BQ1RJT04pXSgpXG5cdFx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ2Zvcm0gc2F2ZWQnLCByZXN1bHQpO1xuXHRcdFx0XHR0aGlzLnBhcmVudC5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUodGhpcy5nZXRNb2R1bGVOYW1lKCkpO1xuXHRcdFx0XHR0aGlzLnBhcmVudC5ydW5MaXN0KCk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChyZXN1bHQpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdmb3JtIG5vdCBzYXZlZCcsIHJlc3VsdCk7XG5cdFx0XHR9KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURVcGRhdGU7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BUX0RFRkFVTFRfQUNUSU9OID0gJ2RlbGV0ZSc7XG5cbmNsYXNzIENSVUREZWxldGUgZXh0ZW5kcyBub3RDb250cm9sbGVye1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcyl7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgRGVsZXRlJyk7XG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRlbGV0ZS5wcmVsb2FkJykpXG5cdFx0XHQudGhlbigoKT0+e1xuXHRcdFx0XHRpZiAoY29uZmlybSgn0KPQtNCw0LvQuNGC0Ywg0LfQsNC/0LjRgdGMPycpKSB7XG5cdFx0XHRcdFx0dGhpcy5kZWxldGUoKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dGhpcy5wYXJlbnQuYmFja1RvTGlzdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblxuXHRkZWxldGUoKSB7XG5cdFx0bGV0IGFjdGlvbiA9JyQnKyh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZWxldGUuYWN0aW9uJyl8fE9QVF9ERUZBVUxUX0FDVElPTik7XG5cdFx0dGhpcy5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0oeydfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJyl9KVthY3Rpb25dKClcblx0XHRcdC50aGVuKHRoaXMucGFyZW50LmJhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCkpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVERGVsZXRlO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi4vbm90UmVjb3JkJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuY29uc3QgT1BUX0RFRkFVTFRfREVUQUlMU19QUkVGSVggPSAnZGV0YWlsc18nLFxuXHRPUFRfREVGQVVMVF9ST0xFX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX0RFVEFJTFNfVElUTEUgPSAnRGV0YWlscyBkZWZhdWx0IHRpdGxlJyxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiA9IHt9LFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCA9IFsnb3B0aW9ucycsICdtYW5pZmVzdCcsICdhcHAnXTtcblxuY2xhc3Mgbm90RGV0YWlscyBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygncHJlZml4JywgT1BUX0RFRkFVTFRfREVUQUlMU19QUkVGSVgpO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudHMnLCBbXSk7XG5cdFx0aWYgKCF0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5zZXREYXRhKG5ldyBub3RSZWNvcmQoe30sIHRoaXMuZ2V0RGF0YSgpKSk7XG5cdFx0fVxuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKTtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoKSB7XG5cdFx0bGV0IG1hbmlmZXN0ID0gdGhpcy5nZXRNYW5pZmVzdCgpO1xuXHRcdGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC5hY3Rpb25zKSB7XG5cdFx0XHRyZXR1cm4gbWFuaWZlc3QuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpKSA/IG1hbmlmZXN0LmFjdGlvbnNbdGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKV0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHNMaXN0KCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCksXG5cdFx0XHRsaXN0ID0gW10sXG5cdFx0XHRyb2xlID0gdGhpcy5nZXRPcHRpb25zKCdyb2xlJywgT1BUX0RFRkFVTFRfUk9MRV9OQU1FKTtcblx0XHRpZiAoYWN0aW9uRGF0YSkge1xuXHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzKSB7XG5cdFx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xuXHRcdFx0XHRcdGxpc3QgPSBhY3Rpb25EYXRhLmZpZWxkc1tyb2xlXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0fVxuXG5cdGdldFBhcnRUZW1wbGF0ZU5hbWUoZm9ybVBhcnQpe1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgZm9ybVBhcnQ7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBpbnB1dCA9IHtcblx0XHRcdFx0ZGF0YTogdGhpcy5nZXRXcmFwcGVyRGF0YSgpLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZSgnd3JhcHBlcicpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0aWQ6IHRoaXMuZ2V0T3B0aW9ucygnaWQnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6W1xuXHRcdFx0XHRcdFtbJ2FmdGVyUmVuZGVyJywgJ2FmdGVyVXBkYXRlJ10sIHRoaXMucmVuZGVyQ29tcG9uZW50cy5iaW5kKHRoaXMpXVxuXHRcdFx0XHRdXG5cdFx0XHR9O1xuXHRcdFx0bGV0IHdyYXBwZXIgPSBuZXcgbm90Q29tcG9uZW50KGlucHV0KTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnd3JhcHBlcicsIHdyYXBwZXIpO1xuXHRcdH1cblx0fVxuXG5cdGdldFdyYXBwZXJEYXRhKCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiBhY3Rpb25EYXRhLnRpdGxlID8gYWN0aW9uRGF0YS50aXRsZSA6IE9QVF9ERUZBVUxUX0RFVEFJTFNfVElUTEVcblx0XHR9O1xuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykgJiYgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoKXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldEZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZpZWxkc0xpc3QoKVt0XTtcblx0XHRcdFx0dGhpcy5hZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsZWFyRmllbGRzQ29tcG9uZW50cygpIHtcblx0XHRsZXQgY29tcHMgPSB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKTtcblx0XHR3aGlsZSAoY29tcHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29tcHNbMF0uY29tcG9uZW50LmRlc3Ryb3koKTtcblx0XHRcdGNvbXBzLnNwbGljZSgwLCAxKTtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHNMaWJzKCl7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdG9wdGlvbnM6IHt9LFxuXHRcdFx0bWFuaWZlc3Q6IHt9LFxuXHRcdFx0YXBwOiB7fSxcblx0XHR9O1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpKSB7XG5cdFx0XHRyZXN1bHQub3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmIChub3RDb21tb24uZ2V0QXBwKCkgJiYgbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpKXtcblx0XHRcdHJlc3VsdC5hcHAgPSBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCAmJiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpKXtcblx0XHRcdHJlc3VsdC5tYW5pZmVzdCA9IHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkuZmllbGRzO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpIHtcblx0XHRsZXQgZGVmID0gT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTixcblx0XHRcdGZpZWxkc0xpYnMgPSB0aGlzLmdldEZpZWxkc0xpYnMoKTtcblx0XHRmb3IobGV0IHQgb2YgT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1Qpe1xuXHRcdFx0aWYgKGZpZWxkc0xpYnMuaGFzT3duUHJvcGVydHkodCkgJiYgZmllbGRzTGlic1t0XS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpKXtcblx0XHRcdFx0cmV0dXJuIGZpZWxkc0xpYnNbdF1bZmllbGROYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSkge1xuXHRcdGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSxcblx0XHRcdHJlYyA9IG51bGw7XG5cdFx0aWYoZmllbGRUeXBlLmNvbXBvbmVudCl7XG5cdFx0XHRyZWMgPSB0aGlzLmNhc3RDdXN0b20oZmllbGROYW1lLCBmaWVsZFR5cGUpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmVjID0gdGhpcy5jYXN0Q29tbW9uKGZpZWxkTmFtZSwgZmllbGRUeXBlKTtcblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykucHVzaChyZWMpO1xuXHR9XG5cblx0Y2FzdEN1c3RvbShmaWVsZE5hbWUsIGZpZWxkVHlwZSl7XG5cdFx0bGV0IEN1c3RvbUNvbXBvbmVudCA9IG5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdjb21wb25lbnRzJylbZmllbGRUeXBlLmNvbXBvbmVudF07XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBDdXN0b21Db21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldFRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCdcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gcmVjO1xuXHR9XG5cblx0Y2FzdENvbW1vbihmaWVsZE5hbWUsIGZpZWxkVHlwZSl7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiByZWM7XG5cdH1cblxuXHRnZXRUYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jyl7XG5cdFx0aWYgKCF0YXJnZXQpe3RhcmdldCA9ICdib2R5Jzt9XG5cdFx0bGV0IHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0IT09J2JvZHknKXtcblx0XHRcdHRhcmdldCA9ICdib2R5Jztcblx0XHRcdHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0fVxuXHRcdGlmKCFyZXMgJiYgdGFyZ2V0PT0nYm9keScpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHR1cGRhdGVGaWVsZChmaWVsZE5hbWUpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uZmllbGQubmFtZSA9PT0gZmllbGROYW1lKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90RGV0YWlscztcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdERldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9ub3REZXRhaWxzLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04gPSAnZ2V0Jyxcblx0T1BUX0RFRkFVTFRfVklFVyA9ICdkZXRhaWxzJztcblxuY2xhc3MgQ1JVRERldGFpbHMgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpIHtcblx0XHRzdXBlcihwYXJlbnQuYXBwKTtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0bm90Q29tbW9uLmxvZygnQ1JVRCBEZXRhaWxzJyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5jb21tb24nKSB8fCB0cnVlLFxuXHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG5cdFx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLmxvYWRJdGVtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnNldERhdGEuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJEZXRhaWxzLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRsb2FkSXRlbSgpIHtcblx0XHRyZXR1cm4gdGhpcy5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0oe1xuXHRcdFx0J19pZCc6IHRoaXMuZ2V0T3B0aW9ucygncGFyYW1zLjAnKVxuXHRcdH0pWyckJyArICh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OKV0oKTtcblx0fVxuXG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRsZXQgaXRlbSA9IHRoaXMuZ2V0RGF0YSgpO1xuXHRcdHZhciBoZWxwZXJzID0ge1xuXHRcdFx0SUQ6IGl0ZW0gPyBpdGVtW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSArICdJRCddIDogJycsXG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRhcnJheTogZmFsc2Vcblx0XHRcdH0sXG5cdFx0XHR1cGRhdGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0dGhpcy5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUoW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSwgcGFyYW1zLml0ZW0uX2lkLCAndXBkYXRlJ10uam9pbignLycpKTtcblx0XHRcdH0sXG5cdFx0XHRkZWxldGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0dGhpcy5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUoW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSwgcGFyYW1zLml0ZW0uX2lkLCAnZGVsZXRlJ10uam9pbignLycpKTtcblx0XHRcdH0sXG5cdFx0XHRsaW5rQmFja1RvTGlzdDogdGhpcy5wYXJlbnQubGlua0JhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCksXG5cdFx0XHR0aXRsZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnbmFtZXMuc2luZ2xlJylcblx0XHR9O1xuXHRcdHJldHVybiB0aGlzLnJlbmRlcignZGVmYXVsdCcsIGl0ZW0sIGhlbHBlcnMpO1xuXHR9XG5cblx0cmVuZGVyRGV0YWlscygpIHtcblx0XHRsZXQgaXRlbSA9IHRoaXMuZ2V0RGF0YSgpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRuZXcgbm90RGV0YWlscyh7XG5cdFx0XHRcdFx0ZGF0YTogaXRlbSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy50YXJnZXRRdWVyeScpLFxuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy50YXJnZXRRdWVyeScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JykpLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OLFxuXHRcdFx0XHRcdFx0cHJlZml4OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnByZWZpeCcpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuXHRcdFx0XHRcdFx0cm9sZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5yb2xlJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygncm9sZScpLFxuXHRcdFx0XHRcdFx0aGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRcdGxpbmtCYWNrVG9MaXN0OiB0aGlzLnBhcmVudC5saW5rQmFja1RvTGlzdCgpLFxuXHRcdFx0XHRcdFx0XHRsaWJzOiB0aGlzLmdldE9wdGlvbnMoJ2xpYicpLFxuXHRcdFx0XHRcdFx0XHRJRDogaXRlbVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkgKyAnSUQnXSxcblx0XHRcdFx0XHRcdFx0X192ZXJzaW9uOiBpdGVtLl9fdmVyc2lvbixcblx0XHRcdFx0XHRcdH0sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMuaGVscGVycycpIHx8IHt9KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVERGV0YWlscztcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IENSVURDcmVhdGUgZnJvbSAnLi9DcmVhdGUnO1xuaW1wb3J0IENSVURMaXN0IGZyb20gJy4vTGlzdCc7XG5pbXBvcnQgQ1JVRFVwZGF0ZSBmcm9tICcuL1VwZGF0ZSc7XG5pbXBvcnQgQ1JVRERlbGV0ZSBmcm9tICcuL0RlbGV0ZSc7XG5pbXBvcnQgQ1JVRERldGFpbHMgZnJvbSAnLi9EZXRhaWxzJztcblxuXG5jbGFzcyBDUlVEQ29udHJvbGxlciBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihhcHAsIHBhcmFtcykge1xuXHRcdG5vdENvbW1vbi5sb2coJ3J1bm5pbmcgQ1JVRENvbnRyb2xsZXInKTtcblx0XHRzdXBlcihhcHApO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbmFtZXMnLCB7XG5cdFx0XHRwbHVyYWw6ICdwbHVyYWwnLFxuXHRcdFx0c2luZ2xlOiAnc2luZ2xlJyxcblx0XHR9KTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicsIHRoaXMuYXBwLmdldE9wdGlvbnMoJ2NydWQuY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyb3V0ZShwYXJhbXMgPSBbXSl7XG5cdFx0aWYocGFyYW1zLmxlbmd0aD09MSl7XG5cdFx0XHRpZihwYXJhbXNbMF0gPT09ICdjcmVhdGUnKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMucnVuQ3JlYXRlKHBhcmFtcyk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRoaXMucnVuRGV0YWlscyhwYXJhbXMpO1xuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKHBhcmFtcy5sZW5ndGggPT0gMil7XG5cdFx0XHRpZiAocGFyYW1zWzFdID09PSAnZGVsZXRlJyl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1bkRlbGV0ZShwYXJhbXMpO1xuXHRcdFx0fWVsc2UgaWYocGFyYW1zWzFdID09PSAndXBkYXRlJyl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1blVwZGF0ZShwYXJhbXMpO1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRsZXQgcm91dGVSdW5uZXJOYW1lID0gJ3J1bicgKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHBhcmFtc1swXSk7XG5cdFx0XHRcdGlmKHRoaXNbcm91dGVSdW5uZXJOYW1lXSAmJiB0eXBlb2YgdGhpc1tyb3V0ZVJ1bm5lck5hbWVdID09PSAnZnVuY3Rpb24nKXtcblx0XHRcdFx0XHRyZXR1cm4gdGhpc1tyb3V0ZVJ1bm5lck5hbWVdKHBhcmFtcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMucnVuTGlzdChwYXJhbXMpO1xuXHR9XG5cblx0cnVuQ3JlYXRlKHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRENyZWF0ZSh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuTGlzdChwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVURMaXN0KHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5EZXRhaWxzKHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRERldGFpbHModGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bkRlbGV0ZShwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVUREZWxldGUodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1blVwZGF0ZShwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVURVcGRhdGUodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG9uQWZ0ZXJSZW5kZXIoKXtcblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdH1cblxuXHRiYWNrVG9MaXN0KCkge1xuXHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMuZ2V0TW9kdWxlTmFtZSgpKTtcblx0fVxuXG5cdGxpbmtCYWNrVG9MaXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1vZHVsZU5hbWUoKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVEQ29udHJvbGxlcjtcbiIsImltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGguanMnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuLi9ub3RSb3V0ZXInO1xuXG52YXIgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliID0ge1xuXHRjb250ZW50OiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMuaW5kZXhPZignY2FwaXRhbGl6ZScpID4gLTEpIHtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdC50b1VwcGVyQ2FzZSgpO1xuXHRcdH1cblx0XHRzY29wZS5lbGVtZW50LnRleHRDb250ZW50ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0O1xuXHR9LFxuXHRiaW5kOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGlmIChzY29wZS5lbGVtZW50LmJpbmRzKXtcblx0XHRcdGlmKHNjb3BlLmVsZW1lbnQuYmluZHMuaGFzT3duUHJvcGVydHkoc2NvcGUucGFyYW1zWzBdKSl7XG5cdFx0XHRcdGlmKHNjb3BlLmVsZW1lbnQuYmluZHNbc2NvcGUucGFyYW1zWzBdXS5pbmRleE9mKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24pID4gLTEpe1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoc2NvcGUucGFyYW1zWzBdLCAoZSkgPT4ge1xuXHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGg9PT0xIHx8IHNjb3BlLnBhcmFtc1sxXSAhPT0gJ2RlZmF1bHQnKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0cmV0dXJuIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCh7XG5cdFx0XHRcdFx0c2NvcGUsXG5cdFx0XHRcdFx0aXRlbSxcblx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdGVcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LCBmYWxzZSk7XG5cdFx0aWYoIXNjb3BlLmVsZW1lbnQuaGFzT3duUHJvcGVydHkoJ2JpbmRzJykpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5iaW5kcyA9IHt9O1xuXHRcdH1cblx0XHRpZighc2NvcGUuZWxlbWVudC5iaW5kcy5oYXNPd25Qcm9wZXJ0eShzY29wZS5wYXJhbXNbMF0pKXtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYmluZHNbc2NvcGUucGFyYW1zWzBdXSA9IFtdO1xuXHRcdH1cblx0XHRpZihzY29wZS5lbGVtZW50LmJpbmRzW3Njb3BlLnBhcmFtc1swXV0uaW5kZXhPZihzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uKSA9PT0gLTEpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5iaW5kc1tzY29wZS5wYXJhbXNbMF1dLnB1c2goc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbik7XG5cdFx0fVxuXHR9LFxuXHR2YWx1ZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgbGl2ZUV2ZW50cyA9IFsnY2hhbmdlJywgJ2tleXVwJ10sXG5cdFx0XHRvbkV2ZW50ID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAoWydjaGVja2JveCcsICdyYWRpbycsICdzZWxlY3QtbXVsdGlwbGUnXS5pbmRleE9mKHNjb3BlLmVsZW1lbnQudHlwZSkgPiAtMSkge1xuXHRcdFx0XHRcdHN3aXRjaCAoc2NvcGUuZWxlbWVudC50eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnY2hlY2tib3gnOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAncmFkaW8nOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGhlbHBlcnMuZmllbGQubmFtZSwgaGVscGVycy5kYXRhLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQ/c2NvcGUuZWxlbWVudC52YWx1ZTpudWxsKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCA/IHNjb3BlLmVsZW1lbnQudmFsdWUgOiBudWxsKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3NlbGVjdC1tdWx0aXBsZSc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGxldCBzZWxlY3RlZCA9IFtdLnNsaWNlLmNhbGwoc2NvcGUuZWxlbWVudC5zZWxlY3RlZE9wdGlvbnMpLm1hcChhID0+IGEudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCdzZWxlY3QtbXVsdGlwbGUnLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpLCAnIC0+ICcsc2NvcGUuZWxlbWVudC52YWx1ZSk7XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2NvcGUuZWxlbWVudC52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHRcdGlmIChzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlICE9PSB0cnVlKSB7XG5cdFx0XHRpZihzY29wZS5lbGVtZW50LnR5cGUgPT09ICd0ZXh0YXJlYScpe1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmlubmVySFRNTCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0fVxuXHRcdFx0Zm9yIChsZXQgdCBvZiBsaXZlRXZlbnRzKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0LCBvbkV2ZW50KTtcblx0XHRcdH1cblx0XHRcdHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0YXR0cjogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykgfHwgbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKSA/IHJlcyh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXMpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKHNjb3BlLnBhcmFtc1swXSwgc2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0fSxcblx0bmFtZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbiggLypzY29wZSwgaXRlbSwgaGVscGVycyovICkge1xuXG5cdH0sXG5cdGNoZWNrZWQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykgPyByZXN1bHQoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzdWx0KTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPyBzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpIDogc2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcblx0fSxcblx0Y2xhc3M6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlcyA9PT0gJ2Z1bmN0aW9uJykgPyByZXMoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA8IDMgfHwgaXNOYU4oc2NvcGUuYXR0cmlidXRlUmVzdWx0KSkge1xuXHRcdFx0aWYgKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgdXNlZCA9IGZhbHNlO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzY29wZS5wYXJhbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGkgPT09IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbaV0pO1xuXHRcdFx0XHRcdHVzZWQgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXVzZWQpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRvcHRpb25zOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBpID0gMCxcblx0XHRcdG9wdGlvbiA9IG51bGwsXG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9ICd2YWx1ZScsXG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9ICduYW1lJyxcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkJykgJiYgaGVscGVycy5maWVsZC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpID8gaGVscGVycy5maWVsZC5uYW1lIDogJ3ZhbHVlJztcblx0XHRzY29wZS5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdH1cblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMykge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1syXTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBoZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWxwZXJzICE9PSBudWxsICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSAmJiBoZWxwZXJzLmRlZmF1bHQpIHtcblx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyk7XG5cdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBoZWxwZXJzLnBsYWNlaG9sZGVyO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdHZhciBsaWIgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsaWIubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbGliW2ldW3ZhbHVlRmllbGROYW1lXSk7XG5cdFx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGxpYltpXVtsYWJlbEZpZWxkTmFtZV07XG5cdFx0XHRcdGlmIChoZWxwZXJzLmZpZWxkLmFycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSAmJiBBcnJheS5pc0FycmF5KGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSkpe1xuXHRcdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXS5pbmRleE9mKGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSA9PT0gbGliW2ldW3ZhbHVlRmllbGROYW1lXSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aHJlZjpmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0aWYgKCFzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBub3RSb3V0ZXIuZ2V0RnVsbFJvdXRlKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdG5vdFJvdXRlci5uYXZpZ2F0ZShub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5ub3RSb3V0ZXJJbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cbn07XG5leHBvcnQgZGVmYXVsdCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWI7XG4iLCIvKlxuXHRDb21tb24gZnVuY3Rpb25zXG4qL1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG4vKlxuXHRmcmFtZXdvcmsgd2lkZSBwYXJzZXIgZm9yIGRhdGEgYWNjZXNzXG4qL1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuXG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcbi8qXG5cdGJhc2ljIGV2ZW50IGhhbmRsZXJzIGFuZCBjb3JlIGRhdGEgbW9kaWZpZXJzXG4qL1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbi8qXG5cdHNtYXJ0ZXIgaW1hZ2UgY29udHJvbFxuKi9cbmltcG9ydCBub3RJbWFnZSBmcm9tICcuL3RlbXBsYXRlL25vdEltYWdlJztcbi8qXG5cdGFwcGxpY2F0aW9uIG1haW4gaW5mcmFzdHJ1Y3R1cmUgc2V0dGVyXG4qL1xuaW1wb3J0IG5vdEFwcCBmcm9tICcuL25vdEFwcCc7XG4vKlxuXHR1c2VyIGNvbnRyb2xsZXJzXG4qL1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi9ub3RDb250cm9sbGVyJztcblxuaW1wb3J0IHtDUlVEQ29udHJvbGxlcixDUlVEQ3JlYXRlLENSVUREZWxldGUsQ1JVRERldGFpbHMsQ1JVRExpc3QsQ1JVRFVwZGF0ZX0gZnJvbSAnLi9DUlVEJztcblxuLypcblx0dGVtcGxhdGluZyBhbmQgY29tbW9uIHN0cnVjdHVyZXNcbiovXG5cbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL3RlbXBsYXRlL25vdFJlbmRlcmVyJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7IC8vIHNtYXJ0ZXIgd2l0aCBiaW5kaW5ncyBmb3IgZXZlbnRzLCBhY3R1YWx5IHByb3h5XG5cbmltcG9ydCBub3RGb3JtIGZyb20gJy4vY29tcG9uZW50cy9ub3RGb3JtJztcbmltcG9ydCBub3RUYWJsZSBmcm9tICcuL2NvbXBvbmVudHMvbm90VGFibGUnO1xuaW1wb3J0IG5vdERldGFpbHMgZnJvbSAnLi9jb21wb25lbnRzL25vdERldGFpbHMnO1xuXG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJzsgLy9cdGhvdyB0byBpbnRlcmFjdCB3aXRoIGRhdGEgb24gc2VydmVyXG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJzsgLy9cdHdyYXBwZXIgZm9yIGRhdGEgd2l0aCBzZXJ2ZXI8LT52aWV3IGxpdmUgaW50ZXJhY3Rpb25zXG5cbm5vdFRlbXBsYXRlUHJvY2Vzc29ycy5hZGQobm90VGVtcGxhdGVQcm9jZXNzb3JzTGliKTtcblxuZXhwb3J0IHtcblx0bm90Q29tbW9uLFxuXHRub3RQYXRoLFxuXHRub3RCYXNlLFxuXHRub3RJbWFnZSxcblx0bm90QXBwLFxuXHRub3RBUEksXG5cdG5vdENvbnRyb2xsZXIsXG5cdENSVURDb250cm9sbGVyLFxuXHRDUlVEQ3JlYXRlLFxuXHRDUlVERGVsZXRlLFxuXHRDUlVERGV0YWlscyxcblx0Q1JVRExpc3QsXG5cdENSVURVcGRhdGUsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29ycyxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLFxuXHRub3RUZW1wbGF0ZUNhY2hlLFxuXHRub3RSZW5kZXJlcixcblx0bm90Q29tcG9uZW50LFxuXHRub3RGb3JtLFxuXHRub3RSb3V0ZXIsXG5cdG5vdFRhYmxlLFxuXHRub3REZXRhaWxzLFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJ1cGxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25Qcm9ncmVzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNwb25zZVR5cGUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ3aXRoQ3JlZGVudGlhbHMiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsImdldFNlc3Npb25JRCIsImZpbGUiLCJ0eXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwibmFtZSIsInNlbmQiLCJtZXRob2QiLCJkYXRhIiwib25sb2FkIiwidCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJwYXJzZUludCIsInJlc3BvbnNlVGV4dCIsImUiLCJnZXRDb29raWUiLCJ2YWx1ZSIsImRvY3VtZW50IiwiY29va2llIiwicGFydHMiLCJzcGxpdCIsImxlbmd0aCIsInBvcCIsInNoaWZ0IiwiTE9HIiwiQ29tbW9uTG9ncyIsIm5vdEZyYW1ld29yayIsIm5vdENvbW1vbiIsImVycm9yIiwiYXJndW1lbnRzIiwibG9nIiwidHJhY2UiLCJyZWdpc3RlciIsIk1BTkFHRVIiLCJTeW1ib2wiLCJDb21tb25TaG9ydHMiLCJnZXRNYW5hZ2VyIiwiZ2V0QVBJIiwidiIsIkNvbW1vbk9iamVjdHMiLCJkZWZhdWx0cyIsIm9wdGlvbnMiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0Iiwic291cmNlcyIsImZvckVhY2giLCJkZXNjcmlwdG9ycyIsImtleXMiLCJzb3VyY2UiLCJyZWR1Y2UiLCJrZXkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJkZXNjcmlwdG9yIiwic3ltIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJiaWciLCJzbWFsbCIsIm9iaiIsImZpbHRlciIsImNvbnRhaW5zT2JqIiwiaWNvbnMiLCJiYXRjaCIsImdldERhdGEiLCJwdXNoIiwiYSIsImIiLCJwIiwiZXF1YWwiLCJ0b1N0cmluZyIsImRlZmF1bHRWYWx1ZSIsIm9iajEiLCJvYmoyIiwialF1ZXJ5IiwiZXh0ZW5kIiwidmFsIiwicmVnaXN0cnkiLCJhcnJheSIsIm9sZF9pbmRleCIsIm5ld19pbmRleCIsImsiLCJ1bmRlZmluZWQiLCJzcGxpY2UiLCJDb21tb25TdHJpbmdzIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIkNvbW1vbkFwcCIsInN0YXJ0ZXIiLCJhc3NpZ24iLCJleHRlbmRXaXRoIiwiU1VCX1BBVEhfU1RBUlQiLCJTVUJfUEFUSF9FTkQiLCJQQVRIX1NQTElUIiwiUEFUSF9TVEFSVF9PQkpFQ1QiLCJQQVRIX1NUQVJUX0hFTFBFUlMiLCJGVU5DVElPTl9NQVJLRVIiLCJNQVhfREVFUCIsIm5vdFBhdGgiLCJwYXRoIiwic3ViUGF0aCIsImZpbmQiLCJzdWIiLCJwYXJzZWQiLCJzdWJmIiwicmVwbGFjZSIsIml0ZW0iLCJoZWxwZXJzIiwic3ViUGF0aFBhcnNlZCIsImZpbmROZXh0U3ViUGF0aCIsImdldFZhbHVlQnlQYXRoIiwicmVwbGFjZVN1YlBhdGgiLCJwYXJzZVN1YnMiLCJhdHRyVmFsdWUiLCJzZXRWYWx1ZUJ5UGF0aCIsImlzUmVjb3JkIiwibm9ybWlsaXplUGF0aCIsInRyaWdnZXIiLCJzZXQiLCJzdGVwIiwiaGVscGVyIiwiclN0ZXAiLCJBcnJheSIsImlzQXJyYXkiLCJwYXJzZVBhdGhTdGVwIiwib2JqZWN0IiwiYXR0clBhdGgiLCJhdHRyTmFtZSIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfTUVUSE9EX0lOSVQiLCJNRVRBX0VWRU5UUyIsIk1FVEFfREFUQSIsIk1FVEFfV09SS0lORyIsIk1FVEFfT1BUSU9OUyIsIm5vdEJhc2UiLCJpbnB1dCIsImV2ZW50cyIsIm9uIiwic2V0RGF0YSIsInNldFdvcmtpbmciLCJ3b3JraW5nIiwic2V0T3B0aW9ucyIsIndoYXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsImZyb20iLCJldmVudE5hbWUiLCJnIiwiZXZlbnQiLCJvZmYiLCJjYWxsYmFja3MiLCJoIiwidGFyZ2V0SWQiLCJpbmZvIiwicmVwb3J0IiwiT1BUX01PREVfSElTVE9SWSIsIk9QVF9NT0RFX0hBU0giLCJPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCIsIm5vdFJvdXRlciIsInJvb3QiLCJjbGVhclNsYXNoZXMiLCJyZSIsImhhbmRsZXIiLCJydWxlIiwiYWRkIiwicGFyYW0iLCJyIiwiZnJhZ21lbnQiLCJsb2NhdGlvbiIsImRlY29kZVVSSSIsInBhdGhuYW1lIiwic2VhcmNoIiwid2luZG93IiwibWF0Y2giLCJocmVmIiwiY3VycmVudCIsImdldEZyYWdtZW50IiwiaW5pdCIsImlzSW5pdGlhbGl6ZWQiLCJjaGVjayIsInNldEluaXRpYWxpemVkIiwibG9vcEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjaGVja0xvY2F0aW9uIiwiYmluZCIsImhyZWZDbGljayIsImZ1bGxSRSIsImFwcGx5IiwiaG9zdCIsInB1c2hTdGF0ZSIsImdldEZ1bGxSb3V0ZSIsImJvZHkiLCJnZXRBbGxMaW5rcyIsImluaXRSZXJvdXRpbmciLCJnZXRBdHRyaWJ1dGUiLCJsaW5rIiwibm90Um91dGVySW5pdGlhbGl6ZWQiLCJmdWxsTGluayIsInByZXZlbnREZWZhdWx0IiwibmF2aWdhdGUiLCJub3RBUElPcHRpb25zIiwibm90QVBJUXVlZSIsInJlcXVlc3RzUGVyU2Vjb25kIiwicXVlZSIsImludCIsImluUHJvZ3Jlc3MiLCJ0b0NhbGwiLCJjbGVhckludGVydmFsIiwicnVuIiwibm90QVBJIiwiaWQiLCJnb29kIiwiYmFkIiwibWFrZVJlcXVlc3QiLCJyZXNwb25zZU9LIiwicmVzcG9uc2VGYWlsZWQiLCJyZXF1ZXN0SlNPTiIsInRoZW4iLCJuZXh0IiwiY2F0Y2giLCJnZXRJZCIsIm1vZGVsTmFtZSIsImdldE1vZGVsTmFtZSIsIm1ha2VVcmwiLCJnZXRKU09OIiwibm90SW1hZ2UiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgiLCJURU1QTEFURV9UQUciLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCIsIkNPTVBPTkVOVF9JRF9QUkVGSVgiLCJQQVJUX0lEX1BSRUZJWCIsIkRFRkFVTFRfUExBQ0VSIiwiREVGQVVMVF9QTEFDRVJfTE9PUCIsIk9QVFMiLCJNRVRBX0NBQ0hFIiwibm90VGVtcGxhdGVDYWNoZSIsImhpZGVUZW1wbGF0ZXMiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibWFwIiwibG9hZE9uZSIsImNhbGxiYWNrIiwib1JlcXVlc3QiLCJkaXYiLCJkYXRhc2V0Iiwibm90VGVtcGxhdGVOYW1lIiwibm90VGVtcGxhdGVVUkwiLCJzcmNFbGVtZW50Iiwic2V0T25lIiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwiYWRkRnJvbVRleHQiLCJjbG9uZU5vZGUiLCJjb250IiwidGV4dCIsIm5vdFRlbXBsYXRlc0VsZW1lbnRzIiwiZWxJZCIsInBhcmVudE5vZGUiLCJsaWIiLCJnZXRIVE1MIiwidGVtcGxhdGVJbm5lckhUTUwiLCJ0ZW1wbGF0ZUNvbnRFbCIsIndyYXAiLCJ0ZW1wbGF0ZXNIVE1MIiwidGVtcGxhdGVzIiwicGFyc2VMaWIiLCJhZGRMaWIiLCJzZWxlY3Rvck9yRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0YWdOYW1lIiwiT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSIsIkRFRkFVTFRfRklMVEVSIiwiREVGQVVMVF9QQUdFX05VTUJFUiIsIkRFRkFVTFRfUEFHRV9TSVpFIiwibm90SW50ZXJmYWNlIiwibWFuaWZlc3QiLCJsaW5lIiwicmVjb3JkIiwiYWN0aW9uTmFtZSIsInJlY29yZFJFIiwiZmllbGROYW1lIiwiaW5kIiwibGVuIiwiaW5kMiIsInN0YXJ0U2xpY2UiLCJlbmRTbGljZSIsImdldEF0dHIiLCJtb2RlbCIsImFjdGlvbkRhdGEiLCJwYXJzZUxpbmUiLCJwb3N0Rml4IiwicmVzdWx0SWQiLCJwcmVmaXhlcyIsImluZGV4IiwiY29uY2F0IiwicHJlIiwiZ2V0QWN0aW9ucyIsImFjdGlvbnMiLCJzZXRGaWx0ZXIiLCJmaWx0ZXJEYXRhIiwic29ydGVyRGF0YSIsInBhZ2VOdW1iZXIiLCJwYWdlU2l6ZSIsInNldFBhZ2VyIiwicmVxdWVzdERhdGEiLCJkYXRhUHJvdmlkZXJOYW1lIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwiZ2V0QWN0aW9uRGF0YSIsInJlcXVlc3RQYXJhbXMiLCJjb2xsZWN0UmVxdWVzdERhdGEiLCJyZXF1ZXN0UGFyYW1zRW5jb2RlZCIsImVuY29kZVJlcXVlc3QiLCJnZXRJRCIsImdldFVSTCIsInF1ZWVSZXF1ZXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsImFmdGVyU3VjY2Vzc1JlcXVlc3QiLCJub3RSZWNvcmQiLCJNRVRBX0lOVEVSRkFDRSIsIk1FVEFfUFJPWFkiLCJNRVRBX0NIQU5HRSIsIk1FVEFfQ0hBTkdFX05FU1RFRCIsIk1FVEFfU0FMIiwiTUVUQV9NQVBfVE9fSU5URVJGQUNFIiwiREVGQVVMVF9BQ1RJT05fUFJFRklYIiwiTUVUQV9SRVRVUk5fVE9fUk9PVCIsImNyZWF0ZVByb3BlcnR5SGFuZGxlcnMiLCJvd25lciIsImNvbnRleHQiLCJyZXNUYXJnZXQiLCJSZWZsZWN0IiwiRXJyb3IiLCJ2YWx1ZVRvUmVmbGVjdCIsIm5vdFByb3BlcnR5IiwiZ2V0Um9vdCIsInBhdGhUbyIsImlzUHJveHkiLCJpc1Byb3BlcnR5IiwiUHJveHkiLCJwcm94eSIsImNyZWF0ZVJlY29yZEhhbmRsZXJzIiwiY3JlYXRlQ29sbGVjdGlvbiIsIm5vdFJlY29yZEludGVyZmFjZSIsImluaXRQcm9wZXJ0aWVzIiwiaW50ZXJmYWNlVXAiLCJjdXJQYXRoIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsIml0ZW1zIiwiY29sbGVjdGlvbiIsImdldEFjdGlvbnNDb3VudCIsImFjdGlvblVwIiwicmVxdWVzdCIsIm9iamVjdFBhcnQiLCJzZXRBdHRyIiwic2V0RmluZEJ5IiwicmVzZXRGaWx0ZXIiLCJnZXRGaWx0ZXIiLCJzZXRTb3J0ZXIiLCJnZXRTb3J0ZXIiLCJzZXRQYWdlTnVtYmVyIiwic2V0UGFnZVNpemUiLCJyZXNldFBhZ2VyIiwiZ2V0UGFnZXIiLCJPUFRfQ09OVFJPTExFUl9QUkVGSVgiLCJPUFRfUkVDT1JEX1BSRUZJWCIsIm5vdEFwcCIsInJlc291cmNlcyIsInByZUluaXRSb3V0ZXIiLCJpbml0TWFuYWdlciIsImluaXRBUEkiLCJpbml0VGVtcGxhdGVzIiwic2V0TWFuYWdlciIsImFwaSIsInNldEFQSSIsInByb20iLCJhZGRMaWJGcm9tVVJMIiwiaW5pdE1hbmlmZXN0Iiwic2V0SW50ZXJmYWNlTWFuaWZlc3QiLCJzZXRSb290IiwicmVSb3V0ZUV4aXN0ZWQiLCJyb3V0aWVJbnB1dCIsInJvdXRlQmxvY2siLCJwYXRocyIsImNvbnRyb2xsZXIiLCJiaW5kQ29udHJvbGxlciIsImFkZExpc3QiLCJsaXN0ZW4iLCJ1cGRhdGUiLCJ1cGRhdGVJbnRlcmZhY2VzIiwiaW5pdENvbnRyb2xsZXIiLCJhbGxSZXNvdXJjZXNSZWFkeSIsInN0YXJ0QXBwIiwiaW5pdFJvdXRlciIsImNvbnRyb2xsZXJOYW1lIiwiYXBwIiwiY3RybCIsImNsZWFySW50ZXJmYWNlcyIsIm1hbmlmZXN0cyIsInJlY29yZE1hbmlmZXN0IiwicmVjb3JkRGF0YSIsIm9uUmVzb3VyY2VSZWFkeSIsIk1FVEFfUFJPQ0VTU09SUyIsIm5vdFRlbXBsYXRlUHJvY2Vzc29ycyIsInNldFByb2Nlc3NvciIsImdldFByb2Nlc3NvciIsIk1FVEFfQ09NUE9ORU5UUyIsIm5vdFJlbmRlcmVyIiwicmVuZGVyIiwiY29tcG9uZW50IiwiaW5pdERhdGEiLCJpbml0T3B0aW9ucyIsImluaXRXb3JraW5nIiwidGVtcGxhdGUiLCJpbml0VGVtcGxhdGUiLCJvbkNoYW5nZSIsIk1hdGgiLCJyYW5kb20iLCJnZXRCcmVhZENydW1wcyIsImNsZWFyU3Rhc2giLCJzZXRXb3JraW5nTWFwcGluZyIsImV4ZWNQcm9jZXNzb3JzIiwic2VhcmNoRm9yU3ViVGVtcGxhdGVzIiwic3Rhc2hSZW5kZXJlZCIsImlmUGFydCIsImNvbXBvbmVudFBhdGgiLCJjaGFuZ2VkUGF0aCIsImlmRnVsbFN1YlBhdGgiLCJjcmVhdGVNYXBwaW5nIiwiZmluZEFsbFByb2Nlc3NvcnMiLCJwcm9jcyIsImVscyIsImdldEF0dHJpYnV0ZXNTdGFydHNXaXRoIiwiZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCIsInByb2NEYXRhIiwicGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uIiwicHJvY2Vzc29yRXhwcmVzc2lvbiIsImF0dHJpYnV0ZUV4cHJlc3Npb24iLCJpZkNvbmRpdGlvbiIsInBhcmFtcyIsInByb2Nlc3Nvck5hbWUiLCJtYXBwaW5nIiwicHJvY1Njb3BlIiwiYXR0cmlidXRlUmVzdWx0IiwiZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdCIsInByb2NOYW1lIiwicHJvYyIsInJlbW92ZUF0dHJpYnV0ZSIsImRlc3Ryb3lTdWJzIiwiZGVzdHJveSIsImNsZWFyU3ViVGVtcGxhdGVzIiwiZ2V0U3Rhc2giLCJyZW1vdmVDaGlsZCIsIm50RWwiLCJudFJlbmRlcmVkIiwic3VicyIsIm50IiwiaWZTdWJFbGVtZW50UmVuZGVyZWQiLCJyZW5kZXJTdWIiLCJkZXRhaWxzIiwiZGF0YVBhdGgiLCJub3RDb21wb25lbnQiLCJjaGlsZE5vZGVzIiwiYWRkVG9TdGFzaCIsInN0YXNoIiwibmV3U3Rhc2giLCJhbmNob3IiLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsIm5vZGUiLCJwbGFjZSIsInRhcmdldEVsIiwibCIsImNoaWxkcmVuIiwidGV4dENvbnRlbnQiLCJyZW5kZXJlZCIsInBsYWNlQWZ0ZXIiLCJwbGFjZUJlZm9yZSIsInBsYWNlRmlyc3QiLCJwbGFjZUxhc3QiLCJub3RQbGFjZXJzIiwiTUVUQV9QQVJUUyIsInJlc2V0UGFydHMiLCJwcmVwYXJlVGVtcGxhdGVFbGVtZW50IiwiaW5pdE1hcmtFbGVtZW50IiwibWFya0VsIiwicGxhY2VyIiwiZ2V0UGxhY2VyIiwidGFyZ2V0UXVlcnkiLCJtYWluIiwidW5zZXRSZWFkeSIsImh0bWwiLCJzZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImFkZEZyb21VUkwiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImNsZWFyUGFydHMiLCJkZWFkIiwib2ZmQWxsIiwiZm9yRWFjaERhdGEiLCJyZW5kZXJQYXJ0IiwicGxhY2VSZW5kZXJlZCIsInJlbW92ZU9ic29sZXRlUGFydHMiLCJiZWZvcmUiLCJwbGFjZVBhcnQiLCJhZnRlciIsInBhcnQiLCJnZXRQYXJ0QnlEYXRhIiwibm9kZXMiLCJsYXN0Tm9kZSIsIm5vZGVUeXBlIiwiZ2V0UGFydHMiLCJyZW5kZXJlciIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUiLCJhZGRQYXJ0IiwidXBkYXRlUGFydCIsInBpcGUiLCJmaW5kQWN0dWFsUGFydHMiLCJyZW1vdmVOb3RBY3R1YWxQYXJ0cyIsImFjdHVhbFBhcnRzIiwiaXNEYXRhIiwiT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SIiwiT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCIsIk9QVF9ERUZBVUxUX1ZJRVdfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCIsIk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FIiwiT1BUX0RFRkFVTFRfU0lOR0xFX05BTUUiLCJPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9BTkQiLCJub3RDb250cm9sbGVyIiwiaW5pdFJlbmRlciIsImludGVyZmFjZXMiLCJnZXRJbnRlcmZhY2VzIiwibWFrZSIsInZpZXdOYW1lIiwidmlldyIsImdldFZpZXciLCJ0ZW1wbGF0ZVVSTCIsInByZWZpeCIsImNvbW1vbiIsImdldE1vZHVsZVByZWZpeCIsInBvc3RmaXgiLCJ0ZW1wbGF0ZU5hbWUiLCJyZW5kZXJBbmQiLCJ2aWV3cyIsImdldE1vZHVsZU5hbWUiLCIkbGlzdEFsbCIsImVyciIsImZpZWxkRmlsZXMiLCJzYXZlZEZpbGUiLCJoYXNoIiwiT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgiLCJPUFRfREVGQVVMVF9ST0xFX05BTUUiLCJPUFRfREVGQVVMVF9GT1JNX1RJVExFIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiIsIk9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUIiwibm90Rm9ybSIsIm9uU3VibWl0Iiwib25SZXNldCIsIm9uQ2FuY2VsIiwiZ2V0TWFuaWZlc3QiLCJyb2xlIiwicmVuZGVyV3JhcHBlciIsImZvcm1QYXJ0IiwiZ2V0V3JhcHBlckRhdGEiLCJnZXRQYXJ0VGVtcGxhdGVOYW1lIiwiYmluZEZvcm1FdmVudHMiLCJyZW5kZXJDb21wb25lbnRzIiwid3JhcHBlciIsInRpdGxlIiwiZ2V0Rm9ybUZpZWxkc0xpc3QiLCJhZGRGaWVsZENvbXBvbmVudCIsImNvbXBzIiwiZ2V0QXBwIiwiZGVmIiwiZmllbGRzTGlicyIsImdldEZpZWxkc0xpYnMiLCJmaWVsZFR5cGUiLCJnZXRGaWVsZHNEZWZpbml0aW9uIiwicmVjIiwibGFiZWwiLCJwbGFjZWhvbGRlciIsImRlZmF1bHQiLCJmaWVsZCIsImdldEZvcm1UYXJnZXRFbGVtZW50IiwiY29sbGVjdERhdGFGcm9tQ29tcG9uZW50cyIsImZvcm0iLCJPUFRfREVGQVVMVF9WSUVXIiwiT1BUX0RFRkFVTFRfQUNUSU9OIiwiT1BUX0RFRkFVTFRfSVRFTSIsIkNSVURDcmVhdGUiLCJwYXJlbnQiLCJzZXRWaWV3cyIsInByZWxvYWRMaWIiLCJyZW5kZXJGb3JtIiwiaW5pdEl0ZW0iLCJjcmVhdGVEZWZhdWx0IiwibGlua0JhY2tUb0xpc3QiLCJmaWxlcyIsImRhdGFUcmFuc2ZlciIsInF1ZWVVcGxvYWQiLCJuZXdJdGVtIiwiZXhlY1VwbG9hZHMiLCJjcmVhdGUiLCJnb1RvVGFibGUiLCJiYWNrVG9MaXN0IiwiT1BUX0RFRkFVTFRfUEFHRV9TSVpFIiwiT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIiLCJPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTiIsIk9QVF9ERUZBVUxUX1NPUlRfRklFTEQiLCJPUFRfRklFTERfTkFNRV9QUkVfUFJPQyIsIm5vdFRhYmxlIiwicmVzZXRTb3J0ZXIiLCJpbml0QXV0b2xvYWRlciIsInJlbmRlckluc2lkZSIsInJlbmRlckhlYWRlciIsInVwZGF0ZURhdGEiLCJyZW5kZXJCb2R5IiwiYmluZFNlYXJjaCIsImJpbmRDdXN0b21CaW5kaW5ncyIsInRhYmxlSGVhZGVyIiwibmV3VGgiLCJzb3J0YWJsZSIsImF0dGFjaFNvcnRpbmdIYW5kbGVycyIsImhlYWRDZWxsIiwiY2hhbmdlU29ydGluZ09wdGlvbnMiLCJzdHlsZSIsImN1cnNvciIsInNvcnRCeUZpZWxkIiwic29ydERpcmVjdGlvbiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImludmFsaWRhdGVEYXRhIiwiZmlsdGVyU2VhcmNoIiwiaXNOYU4iLCJpZlVwZGF0aW5nIiwicXVlcnkiLCJzZXRVcGRhdGluZyIsIiRsaXN0IiwicHJvY2Nlc3NEYXRhIiwicmVmcmVzaEJvZHkiLCJzZXRVcGRhdGVkIiwidGhhdEZpbHRlciIsInRlc3REYXRhSXRlbSIsInRoYXRTb3J0ZXIiLCJzb3J0IiwiaXRlbTEiLCJpdGVtMiIsInQxIiwidDIiLCJsb2NhbGVDb21wYXJlIiwic2VhcmNoRWwiLCJvbkV2ZW50IiwiY3VycmVudFRhcmdldCIsInNlbGVjdG9yIiwiZ2V0T3B0aW9uIiwibmV3Um93IiwibmV3VGQiLCJwcmVwcm9jZXNzZWQiLCJpdGVtSWQiLCJ0Ym9keSIsImZpbmRCb2R5IiwiY2xlYXJCb2R5IiwiY2hlY2tGaWx0ZXJlZCIsInRoaXNQYWdlU3RhcnRzIiwibmV4dFBhZ2VFbmRzIiwibWluIiwicmVuZGVyUm93IiwidGFibGVCb2R5Iiwic3RyVmFsdWUiLCJnZXRGaWx0ZXJTZWFyY2giLCJ0b0NvbXAiLCJzY3JvbGxTcHkiLCIkIiwibG9hZE5leHQiLCJPUF9ERUZBVUxUX1BBR0VfU0laRSIsIkNSVURMaXN0IiwidXBkYXRlRGF0YXRhYmxlIiwidGFibGVWaWV3IiwiT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04iLCJDUlVEVXBkYXRlIiwibG9hZEl0ZW0iLCJydW5MaXN0IiwiQ1JVRERlbGV0ZSIsImNvbmZpcm0iLCJkZWxldGUiLCJhY3Rpb24iLCJPUFRfREVGQVVMVF9ERVRBSUxTX1BSRUZJWCIsIk9QVF9ERUZBVUxUX0RFVEFJTFNfVElUTEUiLCJub3REZXRhaWxzIiwiZ2V0RmllbGRzTGlzdCIsImNhc3RDdXN0b20iLCJjYXN0Q29tbW9uIiwiQ3VzdG9tQ29tcG9uZW50IiwiZ2V0VGFyZ2V0RWxlbWVudCIsIkNSVUREZXRhaWxzIiwicmVuZGVyRGV0YWlscyIsIl9pZCIsIl9fdmVyc2lvbiIsIkNSVURDb250cm9sbGVyIiwicnVuQ3JlYXRlIiwicnVuRGV0YWlscyIsInJ1bkRlbGV0ZSIsInJ1blVwZGF0ZSIsInJvdXRlUnVubmVyTmFtZSIsIm9uQWZ0ZXJSZW5kZXIiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIiLCJzY29wZSIsImJpbmRzIiwibGl2ZUV2ZW50cyIsImNoZWNrZWQiLCJzZWxlY3RlZCIsInNlbGVjdGVkT3B0aW9ucyIsInByb2Nlc3NlZFZhbHVlIiwidXNlZCIsIm9wdGlvbiIsInZhbHVlRmllbGROYW1lIiwibGFiZWxGaWVsZE5hbWUiLCJpdGVtVmFsdWVGaWVsZE5hbWUiXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWM7U0FDZixLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFjO1NBQ25CLEtBQUtDLEdBQUwsQ0FBUyxVQUFULElBQXVCRCxHQUE5QjtFQUxrQjtnQkFPSix1QkFBU0UsU0FBVCxFQUFvQkMsTUFBcEIsRUFBNEI7T0FDckMsSUFBSUMsQ0FBVCxJQUFjRixTQUFkLEVBQXlCO1FBQ25CLElBQUlHLENBQVQsSUFBY0YsTUFBZCxFQUFzQjtRQUNqQkQsVUFBVUUsQ0FBVixFQUFhRSxjQUFiLENBQTRCSCxPQUFPRSxDQUFQLENBQTVCLENBQUosRUFBNEM7U0FDdkNFLFFBQVEsSUFBSUMsS0FBSixFQUFaO1dBQ01DLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsV0FBbEM7V0FDTUMsR0FBTixHQUFZUixVQUFVRSxDQUFWLEVBQWFELE9BQU9FLENBQVAsQ0FBYixFQUF3Qk0sT0FBeEIsQ0FBZ0MsSUFBaEMsTUFBMEMsQ0FBMUMsR0FBOEMsS0FBS0MsV0FBTCxDQUFpQlYsVUFBVUUsQ0FBVixFQUFhRCxPQUFPRSxDQUFQLENBQWIsQ0FBakIsQ0FBOUMsR0FBMEZILFVBQVVFLENBQVYsRUFBYUQsT0FBT0UsQ0FBUCxDQUFiLENBQXRHOzs7O0VBYmU7UUFBQSxtQkFrQlhRLE1BbEJXLHFDQWtCaUM7OztTQUM1QyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO09BQ25DQyxNQUFNLElBQUlDLGNBQUosRUFBVjtPQUNJRCxJQUFJSixNQUFSLEVBQWdCOztRQUVYQSxPQUFPTSxVQUFYLEVBQXVCO1NBQ2xCTixNQUFKLENBQVdPLGdCQUFYLENBQTRCLFVBQTVCLEVBQXdDUCxPQUFPTSxVQUEvQyxFQUEyRCxLQUEz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
