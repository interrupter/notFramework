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
			var subPath = this.findNextSubPath(path),
			    subPathParsed = void 0,
			    i = 0;
			while (subPath) {
				subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath, item, helpers);
				path = this.replaceSubPath(path, subPath, subPathParsed);
				i++;
				if (i > MAX_DEEP) {
					break;
				}
				subPath = this.findNextSubPath(path);
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
			if (arguments.length === 3) {
				attrValue = helpers;
				helpers = undefined;
			}
			var subPath = this.findNextSubPath(path),
			    subPathParsed = void 0,
			    i = 0;
			while (subPath) {
				subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath, item, helpers);
				path = this.replaceSubPath(path, subPath, subPathParsed);
				if (i > MAX_DEEP) {
					break;
				}
				subPath = this.findNextSubPath(path);
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
				var newObj = isFunction ? object[attrName]({
					item: item,
					helpers: helpers
				}) : object[attrName];
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

var notAPICache = function () {
	function notAPICache() {
		var ttl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2000;
		classCallCheck(this, notAPICache);

		this.data = {};
		this.ttl = parseInt(ttl);
		return this;
	}

	createClass(notAPICache, [{
		key: 'add',
		value: function add(bucket, key, data) {
			notPath$1.set(notPath$1.join(bucket, key), {
				data: data,
				validTill: new Date().getTime() + this.ttl
			}, {}, this.data);
			return this;
		}
	}, {
		key: 'find',
		value: function find(bucket, key) {
			var r = notPath$1.get(notPath$1.join(bucket, key), this.data);
			if (r && r.validTill < new Date().getTime() && r.data) {
				return r.data;
			} else {
				notPath$1.unset(notPath$1.join(bucket, key), this.data);
				return undefined;
			}
		}
	}]);
	return notAPICache;
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
		_this.cache = new notAPICache();
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
var META_RETURN_TO_ROOT = Symbol('returnToRoot');
var META_PROXY = Symbol('proxy');
var META_INTERFACE = Symbol('interface');
var META_CHANGE = Symbol('change');
var META_CHANGE_NESTED = Symbol('change.nested');
var META_SAL = ['getAttr', 'getAttrs', 'isProperty', 'isRecord', 'getManifest', 'setAttr', 'setAttrs', 'getData', 'setData', 'getJSON', 'on', 'off', 'trigger'];
var META_MAP_TO_INTERFACE = ['getActionsCount', 'getActions', 'setFindBy', 'resetFilter', 'setFilter', 'getFilter', 'setSorter', 'getSorter', 'resetSorter', 'setPageNumber', 'setPageSize', 'setPager', 'resetPager', 'getPager'];
var DEFAULT_ACTION_PREFIX = '$';

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
					data[t] = new notRecord$1(this.manifest, data[t]);
				}
			} else {
				data = new notRecord$1(this.manifest, data);
			}
			return data;
		}
	}]);
	return notInterface;
}(notBase);

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
					valueToReflect = new notRecordProperty(this.getOptions('getRoot'), notPath$1.join(this.getOptions('path'), key), value);
				}
				var t = Reflect.set(target, key, valueToReflect);
				this.trigger('change', target, key, valueToReflect);
				return t;
			}
		}.bind(owner)
	};
};

var notRecordProperty = function (_notBase) {
	inherits(notRecordProperty, _notBase);

	function notRecordProperty(getRoot, pathTo, item) {
		var _ret3;

		classCallCheck(this, notRecordProperty);

		var _this = possibleConstructorReturn(this, (notRecordProperty.__proto__ || Object.getPrototypeOf(notRecordProperty)).call(this));

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

	createClass(notRecordProperty, [{
		key: META_RETURN_TO_ROOT,
		value: function value(proxy, key, _value) {
			var root = this.getOptions('getRoot')();
			root.trigger('change.nested', this[META_PROXY], this.getOptions('path'), key, _value);
		}
	}]);
	return notRecordProperty;
}(notBase);

var createRecordHandlers = function createRecordHandlers(owner) {
	return {
		get: function (target, key, context) {
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
			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error('Invalid attempt to private "' + key + '" property');
			} else {
				var valueToReflect = value;
				if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
					valueToReflect = new notRecordProperty(this.getRoot.bind(this), notPath$1.join(this.getOptions('path'), key), value);
				}
				var t = Reflect.set(target, key, valueToReflect);
				this.trigger('change', target, key, valueToReflect);
				return t;
			}
		}.bind(owner)
	};
};

var notRecord$1 = function (_notBase) {
	inherits(notRecord, _notBase);

	function notRecord(manifest, item) {
		var _ret5;

		classCallCheck(this, notRecord);

		var _this = possibleConstructorReturn(this, (notRecord.__proto__ || Object.getPrototypeOf(notRecord)).call(this));

		if (typeof item === 'undefined' || item === null) {
			var _ret;

			return _ret = item, possibleConstructorReturn(_this, _ret);
		}
		if (item && item.isProxy) {
			var _ret2;

			notCommon.error('this is Proxy item');
			return _ret2 = item, possibleConstructorReturn(_this, _ret2);
		}

		if (item && (item.isRecord || item.isProperty)) {
			var _ret3;

			return _ret3 = item, possibleConstructorReturn(_this, _ret3);
		} else {
			if (Array.isArray(item)) {
				var _ret4;

				return _ret4 = _this.createCollection(manifest, item), possibleConstructorReturn(_this, _ret4);
			}
		}
		_this.setOptions({});
		_this[META_INTERFACE] = new notInterface(manifest);
		_this.setData(_this.initProperties(item));
		_this.interfaceUp();
		_this.isRecord = true;
		_this[META_PROXY] = new Proxy(item, createRecordHandlers(_this));
		//notCommon.log('proxy record created from ', item);
		_this.on('change', _this[META_CHANGE].bind(_this));
		_this.on('change.nested', _this[META_CHANGE_NESTED].bind(_this));
		return _ret5 = _this[META_PROXY], possibleConstructorReturn(_this, _ret5);
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
								item[key] = new notRecordProperty(this.getRoot.bind(this), curPath, item[key]);
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
			var _this2 = this;

			if (!this.hasOwnProperty([DEFAULT_ACTION_PREFIX + index])) {
				this[DEFAULT_ACTION_PREFIX + index] = function () {
					return _this2[META_INTERFACE].request(_this2, index);
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

		var _this = possibleConstructorReturn(this, (notApp.__proto__ || Object.getPrototypeOf(notApp)).call(this, {
			options: options
		}));

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
						return new notRecord$1(recordManifest, recordData);
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
			_this.setData(new notRecord$1({}, _this.getData()));
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
				return new notRecord$1({}, notCommon.extend({}, OPT_DEFAULT_ITEM));
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
				try {
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
				} catch (e) {
					reject(e);
				}
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

/* global jQuery,$ */
var OPT_DEFAULT_PAGE_SIZE$1 = 20;
var OPT_DEFAULT_PAGE_NUMBER$1 = 0;
var OPT_DEFAULT_PAGE_RANGE = 6;
var OPT_DEFAULT_SORT_DIRECTION = 1;
var OPT_DEFAULT_COUNT_ACTION = 'count';
var OPT_DEFAULT_LIST_ACTION = 'list';
var OPT_DEFAULT_SORT_FIELD = '_id';
var OPT_FIELD_NAME_PRE_PROC = 'preprocessor';

/**
	Few concepts
		*	two modes 1 - live requesting from server, 2 - static data

		*	in live mode: changing of filters or sorters leads to another request
			to server, in endless mode after scroll down to the bottom of
			table next page will be requested and glued to the bottom of the
			table, in pagination mode after change of sorter or filter
			pagination will be reset

		*	in static mode: change in filters or sorters will lead to pagination
			reset

	let input = {
		data:	//array of items to be presented in table
				//in case of static - unfiltered
				//in case of live - will be mirrored to table without any changes
		options: {
			//to post proc any row after it will be rendered
			procRow:(
				trow,	//HTMLElement of row
				titem	//item displayed in row
			)=>{
				//some actions
				return trow;
			},
			//array of fields that we will show in table
			fields:[
				{
					path: ':id', 	// notPath to field
					title: 'ID',	//what show in table titles row
					sortable: true	//enale sorting
					editable: true,	//inline editing
					searchable: true//searchable from inline search field
					events : {
						click: (input){
							console.log(...arguments);
							input.item.status = !input.item.status;
							table.updateData();
						}
					}
				}
			],
			pageSize: 50,		//how many rows per "page"
			pageNumber: 0,		//default page number aka first
			endless: true,		//true - will loadup data from
			endlessTrigger: 	//endless trigger
			helpers: {},		//will be available for every processor in sub-templates
			targetEl: el		//where we will place it
			interface:{			//for online requested list
				factory: 		//target notRecord factory with notRecordInterface, source of online data
				listAction:		//which action will be called to retrieve data from server, default 'list'
				countAction:	//which action will be called to retrieve raws count from server, default 'count'
				onSuccess:		//will be called after successfull request
				onError:		//will be called after failed request
			},
		}
	}
*/

var notTable = function (_notBase) {
	inherits(notTable, _notBase);

	function notTable(input) {
		var _ret;

		classCallCheck(this, notTable);

		var _this = possibleConstructorReturn(this, (notTable.__proto__ || Object.getPrototypeOf(notTable)).call(this, input));

		_this.setWorking('filteredData', []);
		_this.data = new notRecord$1({}, {
			pagination: {
				items: {
					count: 0,
					from: 0,
					to: 0
				},
				pages: {
					count: 0,
					from: 0,
					to: 0,
					current: 0,
					list: []
				}
			}
		});
		if (_this.getData() && !Array.isArray(_this.getData())) {
			_this.setData(new notRecord$1({}, []));
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
			var _this2 = this;

			if (this.getWorking('component')) {
				this.getWorking('component').update();
			} else {
				var component = new notComponent({
					data: this.data,
					template: {
						name: 'table_wrapper'
					},
					options: {
						renderAnd: this.getOptions('renderAnd'),
						targetEl: this.getOptions('targetEl'),
						helpers: notCommon.extend({
							goToPage: function goToPage(input) {
								_this2.goToPage(input.item.index);
							},
							goToFirst: this.goToFirst.bind(this),
							goToLast: this.goToLast.bind(this),
							goToNext: this.goToNext.bind(this),
							goToPrev: this.goToPrev.bind(this),
							isPageActive: function isPageActive(input) {
								return input.item.index === _this2.data.pagination.pages.current;
							}
						}, this.getOptions('helpers'))
					},
					events: [[['afterRender', 'afterUpdate'], [this.initAutoloader.bind(this), this.renderInside.bind(this)]]]
				});
				this.setWorking('component', component);
			}
		}
	}, {
		key: 'renderPagination',
		value: function renderPagination() {
			var _this3 = this;

			if (this.getWorking('componentPagination')) {
				this.getWorking('componentPagination').update();
			} else {
				var component = new notComponent({
					data: this.data.pagination,
					template: {
						name: 'table_pagination'
					},
					options: {
						renderAnd: this.getOptions('replace'),
						targetEl: this.getOptions('targetEl').querySelector('nav[role="pagination"]'),
						helpers: notCommon.extend({
							goToPage: function goToPage(input) {
								_this3.goToPage(input.item.index);
							},
							goToFirst: this.goToFirst.bind(this),
							goToLast: this.goToLast.bind(this),
							goToNext: this.goToNext.bind(this),
							goToPrev: this.goToPrev.bind(this),
							isPageActive: function isPageActive(input) {
								return input.item.index === _this3.data.pagination.pages.current;
							}
						}, this.getOptions('helpers'))
					}
				});
				this.setWorking('componentPagination', component);
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
			var _this4 = this;

			headCell.addEventListener('click', function (e) {
				e.preventDefault();
				_this4.changeSortingOptions(headCell, fieldName);
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
		key: 'clearFilteredData',
		value: function clearFilteredData() {
			if (this.getWorking('filteredData') && this.getWorking('filteredData').length > 0) {
				this.getWorking('filteredData').splice(0, this.getWorking('filteredData').length);
			} else {
				//initialize if not exists
				this.setWorking('filteredData', new notRecord$1({}, []));
			}
		}
	}, {
		key: 'clearData',
		value: function clearData() {
			if (this.getData() && this.getData().length > 0) {
				this.getData().splice(0, this.getData().length);
			} else {
				//or init empty list
				this.setData(new notRecord$1({}, []));
			}
		}
	}, {
		key: 'invalidateData',
		value: function invalidateData() {
			//clearing filtered and sorted
			this.clearFilteredData();
			//in case live loading from server
			if (this.isLive()) {
				//clearing loaded data
				this.clearData();
			}
			//resset pager anyway
			this.resetPager();
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
		key: 'getDefaultPageNumber',
		value: function getDefaultPageNumber() {
			return isNaN(this.getOptions('pageNumber')) ? OPT_DEFAULT_PAGE_NUMBER$1 : this.getOptions('pageNumber');
		}
	}, {
		key: 'getDefaultPageSize',
		value: function getDefaultPageSize() {
			return isNaN(this.getOptions('pageSize')) ? OPT_DEFAULT_PAGE_SIZE$1 : this.getOptions('pageSize');
		}
	}, {
		key: 'resetPager',
		value: function resetPager() {
			this.setWorking('pager', {
				pageSize: this.getDefaultPageSize(),
				pageNumber: this.getDefaultPageNumber()
			});
		}
	}, {
		key: 'getPager',
		value: function getPager() {
			return this.getWorking('pager');
		}
	}, {
		key: 'isLive',
		value: function isLive() {
			return this.getOptions('interface') && this.getOptions('interface.factory');
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
		key: 'getDataInterface',
		value: function getDataInterface() {
			return this.getOptions('interface.factory')({});
		}
	}, {
		key: 'getLoadDataActionName',
		value: function getLoadDataActionName() {
			return this.getOptions('interface.listAction') ? this.getOptions('interface.listAction') : OPT_DEFAULT_LIST_ACTION;
		}
	}, {
		key: 'getCountActionName',
		value: function getCountActionName() {
			return this.getOptions('interface.countAction') ? this.getOptions('interface.countAction') : OPT_DEFAULT_COUNT_ACTION;
		}
	}, {
		key: 'loadData',
		value: function loadData() {
			//load from server
			var query = this.getDataInterface().setFilter(this.getFilter()).setSorter(this.getSorter()).setPager(this.getPager().pageSize, this.getPager().pageNumber);
			return query['$' + this.getLoadDataActionName()]();
		}
	}, {
		key: 'goToNext',
		value: function goToNext() {
			var next = isNaN(this.getWorking('pager').pageNumber) ? this.getDefaultPageNumber() : this.getWorking('pager').pageNumber + 1;
			this.getWorking('pager').pageNumber = Math.min(next, this.data.pagination.pages.to);
			this.updateData();
		}
	}, {
		key: 'goToPrev',
		value: function goToPrev() {
			var prev = isNaN(this.getWorking('pager').pageNumber) ? this.getDefaultPageNumber() : this.getWorking('pager').pageNumber - 1;
			this.getWorking('pager').pageNumber = Math.max(prev, this.data.pagination.pages.from);
			this.updateData();
		}
	}, {
		key: 'goToFirst',
		value: function goToFirst() {
			this.getWorking('pager').pageNumber = this.data.pagination.pages.from;
			this.updateData();
		}
	}, {
		key: 'goToLast',
		value: function goToLast() {
			this.getWorking('pager').pageNumber = this.data.pagination.pages.to;
			this.updateData();
		}
	}, {
		key: 'goToPage',
		value: function goToPage(pageNumber) {
			this.getWorking('pager').pageNumber = pageNumber;
			this.updateData();
		}
	}, {
		key: 'updateData',
		value: function updateData() {
			var _this5 = this;

			if (this.isLive()) {
				if (this.ifUpdating()) {
					return;
				}
				if (!this.getOptions('endless', false)) {
					this.getData().splice(0, this.getData().length);
				}
				this.setUpdating();
				this.loadData().then(function (data) {
					var _getData;

					return (_getData = _this5.getData()).push.apply(_getData, toConsumableArray(data));
				}).then(this.getRowsCount.bind(this)).then(this.refreshBody.bind(this)).catch(notCommon.error.bind(this)).then(this.setUpdated.bind(this));
			} else {
				//local magic
				this.setUpdating();
				this.processData();
				this.refreshBody();
				this.setUpdated();
			}
		}
	}, {
		key: 'processData',
		value: function processData() {
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
			var _this6 = this;

			var searchEl = this.getOptions('targetEl').querySelectorAll('input[name="search"]')[0];
			if (!searchEl) return;
			var onEvent = function onEvent(e) {
				_this6.setFilter({
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
			var _this7 = this;

			var newRow = document.createElement('TR'),
			    fields = this.getOptions('fields');

			var _loop = function _loop() {
				var newTd = document.createElement('TD'),
				    field = fields[i],
				    preprocessed = null,
				    val = notPath$1.get(field.path, item, _this7.getOptions('helpers'));
				if (field.hasOwnProperty('editable') && !field.hasOwnProperty('component')) {
					newTd.setAttribute('contentEditable', true);
					newTd.dataset.path = field.path;
					newTd.dataset.itemId = item[_this7.getOptions('itemIdField')];
					newTd.dataset.value = val;
					newTd.addEventListener('blur', function () {
						notPath$1.set(field.path, item, _this7.getOptions('helpers'), newTd.textContent);
						_this7.updateData();
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
							helpers: _this7.getOptions('helpers')
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
			var tbody = this.findBody();
			if (!tbody) {
				return;
			}
			if (!this.getOptions('endless')) {
				this.clearBody();
			}
			this.checkFiltered();
			if (this.isLive()) {

				for (var i = 0; i < this.getData().length; i++) {
					tbody.appendChild(this.renderRow(this.getData()[i]));
				}
			} else {
				var thisPageStarts = this.getPager().pageSize * this.getPager().pageNumber,
				    nextPageEnds = this.getPager().pageSize * (this.getPager().pageNumber + 1);

				for (var _i = thisPageStarts; _i < Math.min(nextPageEnds, this.getWorking('filteredData').length); _i++) {
					tbody.appendChild(this.renderRow(this.getWorking('filteredData')[_i]));
				}
			}
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
			if (this.isLive()) {
				for (var i = 0; i < this.getData().length; i++) {
					tbody.appendChild(this.renderRow(this.getData()[i]));
				}
			} else {
				var thisPageStarts = 0,
				    nextPageEnds = this.getPager().pageSize * (this.getPager().pageNumber + 1);
				for (var _i2 = thisPageStarts; _i2 < Math.min(nextPageEnds, this.getWorking('filteredData').length); _i2++) {
					tbody.appendChild(this.renderRow(this.getWorking('filteredData')[_i2]));
				}
			}
		}
	}, {
		key: 'getRowsCount',
		value: function getRowsCount() {
			var _this8 = this;

			var query = this.getDataInterface().setFilter(this.getFilter());
			return query['$' + this.getCountActionName()]().then(function (data) {
				_this8.updatePagination(data.count);
			}).catch(function (e) {
				notCommon.error(e);
			});
		}
	}, {
		key: 'updatePagination',
		value: function updatePagination(itemsCount) {
			var _data$pagination$page;

			this.data.pagination.pages.list.splice(0, this.data.pagination.pages.list.length);
			var itemsFrom = (this.getPager().pageNumber - OPT_DEFAULT_PAGE_NUMBER$1) * this.getPager().pageSize + 1,
			    pagesCount = itemsCount % this.getPager().pageSize ? Math.floor(itemsCount / this.getPager().pageSize) + 1 : Math.round(itemsCount / this.getPager().pageSize),
			    pagesFrom = Math.max(OPT_DEFAULT_PAGE_NUMBER$1, this.getPager().pageNumber - OPT_DEFAULT_PAGE_RANGE),
			    pagesTo = Math.min(pagesCount - (1 - OPT_DEFAULT_PAGE_NUMBER$1), this.getPager().pageNumber + OPT_DEFAULT_PAGE_RANGE),
			    list = [],
			    itemsTo = Math.min(itemsFrom + this.getPager().pageSize - 1, itemsCount);
			for (var t = pagesFrom; t <= pagesTo; t++) {
				list.push({
					index: t
				});
			}
			this.data.pagination.items.count = itemsCount;
			this.data.pagination.items.from = itemsFrom;
			this.data.pagination.items.to = itemsTo;
			this.data.pagination.pages.count = pagesCount;
			this.data.pagination.pages.from = pagesFrom;
			this.data.pagination.pages.to = pagesTo;
			this.data.pagination.pages.current = this.getPager().pageNumber;
			(_data$pagination$page = this.data.pagination.pages.list).splice.apply(_data$pagination$page, [0, this.data.pagination.pages.list.length].concat(list));
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
				if (this.isLive() && this.getOptions('endless') && this.getOptions('endlessTrigger')) {
					var t = $(this.getOptions('endlessTrigger'));
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

var OPT_DEFAULT_PAGE_SIZE = 50;
var OPT_DEFAULT_PAGE_NUMBER = 0;
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
							procRow: _this3.parent.getOptions('views.list.procRow', false),
							fields: _this3.parent.getOptions('views.list.fields'),
							pageSize: _this3.getOptions('views.list.pager.size') || _this3.app.getOptions('pager.size') || OPT_DEFAULT_PAGE_SIZE,
							pageNumber: _this3.getOptions('views.list.pager.number') || _this3.app.getOptions('pager.number') || OPT_DEFAULT_PAGE_NUMBER,
							endless: _this3.parent.getOptions('views.list.endless', false),
							endlessTrigger: _this3.parent.getOptions('views.list.endlessTrigger', null),
							helpers: notCommon.extend({
								title: _this3.parent.getOptions('names.plural')
							}, _this3.parent.getOptions('views.list.helpers') || {}),
							targetEl: document.querySelector(_this3.parent.getOptions('views.list.targetQuery') || _this3.parent.getOptions('targetQuery')),
							interface: {
								factory: _this3.parent.getOptions('views.list.interface.factory', _this3.make[_this3.parent.getModuleName()]),
								listAction: _this3.parent.getOptions('views.list.interface.listAction'),
								countAction: _this3.parent.getOptions('views.list.interface.countAction')
							}
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
			_this.setData(new notRecord$1({}, _this.getData()));
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

			var CustomComponent = notCommon.get('components')[fieldType.component];
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
	},
	/*
 n-keybind-[enter|letter|digit]-[ctrl|shift|alt|meta]*="actionPath"
 */
	keybind: function keybind(scope, item, helpers) {
		if (scope.element.keybinds) {
			if (scope.element.keybinds.hasOwnProperty(scope.params.join('-'))) {
				if (scope.element.keybinds[scope.params.join('-')].indexOf(scope.attributeExpression) > -1) {
					return;
				}
			}
		}
		scope.element.addEventListener('keyup', function (e) {
			if (scope.attributeResult) {
				if (e.key.toLowerCase() === scope.params[0]) {
					return scope.attributeResult({
						scope: scope,
						item: item,
						helpers: helpers,
						e: e
					});
				} else {
					return true;
				}
			} else {
				return true;
			}
		}, false);
		if (!scope.element.hasOwnProperty('binds')) {
			scope.element.keybinds = {};
		}
		if (!scope.element.keybinds.hasOwnProperty(scope.params.join('-'))) {
			scope.element.keybinds[scope.params.join('-')] = [];
		}
		if (scope.element.keybinds[scope.params.join('-')].indexOf(scope.attributeExpression) === -1) {
			scope.element.keybinds[scope.params.join('-')].push(scope.attributeExpression);
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
exports.notRecord = notRecord$1;
exports.notRecordInterface = notInterface;

}((this.notFramework = this.notFramework || {})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90LWZyYW1ld29yay5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1vbi9uZXQuanMiLCIuLi9zcmMvY29tbW9uL2xvZ3MuanMiLCIuLi9zcmMvY29tbW9uL3Nob3J0cy5qcyIsIi4uL3NyYy9jb21tb24vb2JqZWN0cy5qcyIsIi4uL3NyYy9jb21tb24vc3RyaW5ncy5qcyIsIi4uL3NyYy9jb21tb24vZnVuY3Rpb25zLmpzIiwiLi4vc3JjL2NvbW1vbi9kb20uanMiLCIuLi9zcmMvY29tbW9uL2FwcC5qcyIsIi4uL3NyYy9jb21tb24vaW5kZXguanMiLCIuLi9zcmMvbm90UGF0aC5qcyIsIi4uL3NyYy9ub3RCYXNlLmpzIiwiLi4vc3JjL25vdFJvdXRlci5qcyIsIi4uL3NyYy9hcGkvb3B0aW9ucy5qcyIsIi4uL3NyYy9hcGkvcXVlZS5qcyIsIi4uL3NyYy9hcGkvY2FjaGUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvcmVjb3JkL29wdGlvbnMuanMiLCIuLi9zcmMvcmVjb3JkL2ludGVyZmFjZS5qcyIsIi4uL3NyYy9yZWNvcmQvcHJvcGVydHkuanMiLCIuLi9zcmMvcmVjb3JkL3JlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybS5qcyIsIi4uL3NyYy9DUlVEL0NyZWF0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFRhYmxlLmpzIiwiLi4vc3JjL0NSVUQvTGlzdC5qcyIsIi4uL3NyYy9DUlVEL1VwZGF0ZS5qcyIsIi4uL3NyYy9DUlVEL0RlbGV0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdERldGFpbHMuanMiLCIuLi9zcmMvQ1JVRC9EZXRhaWxzLmpzIiwiLi4vc3JjL0NSVUQvQ29udHJvbGxlci5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSkge1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvciAodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IgKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwdXRGaWxlKHVwbG9hZCAvKiBvYmplY3QoZmlsZSwgb25Qcm9ncmVzcywgdXJsKSovICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRpZiAoeGhyLnVwbG9hZCkge1xuXHRcdFx0XHQvLyBwcm9ncmVzcyBiYXJcblx0XHRcdFx0aWYgKHVwbG9hZC5vblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZC5vblByb2dyZXNzLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCAvKmUqLyApIHtcblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0Ly8gc3RhcnQgdXBsb2FkXG5cdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0XHR4aHIub3BlbignUFVUJywgdXBsb2FkLnVybCwgdHJ1ZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignWF9GSUxFTkFNRScsIGVuY29kZVVSSUNvbXBvbmVudCh1cGxvYWQuZmlsZS5uYW1lKSk7XG5cdFx0XHRcdHhoci5zZW5kKHVwbG9hZC5maWxlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRwdXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQVVQnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdGRlbGV0ZUpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ0RFTEVURScsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChwYXJzZUludChzdGF0dXMpID09PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9IChlKSA9PiByZWplY3QoZSk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRTZXNzaW9uSUQ6IGZ1bmN0aW9uKG5hbWUgPSAnU2Vzc2lvbklEJykge1xuXHRcdHJldHVybiB0aGlzLmdldENvb2tpZShuYW1lKTtcblx0fSxcblx0Z2V0Q29va2llOiAobmFtZSkgPT4ge1xuXHRcdGxldCB2YWx1ZSA9ICc7ICcgKyBkb2N1bWVudC5jb29raWUsXG5cdFx0XHRwYXJ0cyA9IHZhbHVlLnNwbGl0KCc7ICcgKyBuYW1lICsgJz0nKTtcblx0XHRpZiAocGFydHMubGVuZ3RoID09IDIpIHtcblx0XHRcdHJldHVybiBwYXJ0cy5wb3AoKS5zcGxpdCgnOycpLnNoaWZ0KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTmV0d29yaztcbiIsIi8vZGlydHkgaGFjayB0byByZW1vdmUgbm8tY29uc29sZSB3YXJuaW5nIG9mIGVzbGludFxuLyogZ2xvYmFsIG5vdEZyYW1ld29yayovXG5jb25zdCBMT0cgPSAnY29uc29sZSc7XG52YXIgQ29tbW9uTG9ncyA9IHtcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHRsb2c6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmxvZyguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRpZighbm90RnJhbWV3b3JrLm5vdENvbW1vbi5nZXQoJ3Byb2R1Y3Rpb24nKSl7XG5cdFx0XHR3aW5kb3dbTE9HXS5lcnJvciguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0dHJhY2U6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHRtdXRlOmZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5yZWdpc3RlcigncHJvZHVjdGlvbicsIHRydWUpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTG9ncztcbiIsImNvbnN0IE1BTkFHRVIgPSBTeW1ib2woJ01BTkFHRVInKTtcblxudmFyIENvbW1vblNob3J0cyA9IHtcblx0Z2V0QVBJOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNYW5hZ2VyKCkuZ2V0QVBJKCk7XG5cdH0sXG5cdHNldE1hbmFnZXI6IGZ1bmN0aW9uKHYpIHtcblx0XHR0aGlzW01BTkFHRVJdID0gdjtcblx0fSxcblx0Z2V0TWFuYWdlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUFOQUdFUl07XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25TaG9ydHM7XG4iLCIvKiBnbG9iYWwgalF1ZXJ5ICovXG52YXIgQ29tbW9uT2JqZWN0cyA9IHtcblx0ZXh0ZW5kOiBmdW5jdGlvbihkZWZhdWx0cywgb3B0aW9ucykge1xuXHRcdHZhciBleHRlbmRlZCA9IHt9O1xuXHRcdHZhciBwcm9wO1xuXHRcdGZvciAocHJvcCBpbiBkZWZhdWx0cykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkZWZhdWx0cywgcHJvcCkpIHtcblx0XHRcdFx0ZXh0ZW5kZWRbcHJvcF0gPSBkZWZhdWx0c1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChwcm9wIGluIG9wdGlvbnMpIHtcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywgcHJvcCkpIHtcblx0XHRcdFx0ZXh0ZW5kZWRbcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZXh0ZW5kZWQ7XG5cdH0sXG5cdGNvbXBsZXRlQXNzaWduOiBmdW5jdGlvbih0YXJnZXQsIC4uLnNvdXJjZXMpIHtcblx0XHRzb3VyY2VzLmZvckVhY2goc291cmNlID0+IHtcblx0XHRcdGxldCBkZXNjcmlwdG9ycyA9IE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKChkZXNjcmlwdG9ycywga2V5KSA9PiB7XG5cdFx0XHRcdGRlc2NyaXB0b3JzW2tleV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KTtcblx0XHRcdFx0cmV0dXJuIGRlc2NyaXB0b3JzO1xuXHRcdFx0fSwge30pO1xuXHRcdFx0Ly8gYnkgZGVmYXVsdCwgT2JqZWN0LmFzc2lnbiBjb3BpZXMgZW51bWVyYWJsZSBTeW1ib2xzIHRvb1xuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZvckVhY2goc3ltID0+IHtcblx0XHRcdFx0bGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKTtcblx0XHRcdFx0aWYgKGRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuXHRcdFx0XHRcdGRlc2NyaXB0b3JzW3N5bV0gPSBkZXNjcmlwdG9yO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgZGVzY3JpcHRvcnMpO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH0sXG5cdGV4dGVuZFdpdGg6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRcdGZvciAobGV0IHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcblx0XHRcdFx0dGhpc1twcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGNvbnRhaW5zT2JqOiBmdW5jdGlvbihiaWcsIHNtYWxsKSB7XG5cdFx0Zm9yICh2YXIgdCBpbiBzbWFsbCkge1xuXHRcdFx0aWYgKHNtYWxsLmhhc093blByb3BlcnR5KHQpKSB7XG5cdFx0XHRcdGlmICgoIWJpZy5oYXNPd25Qcm9wZXJ0eSh0KSkgfHwgKGJpZ1t0XSAhPT0gc21hbGxbdF0pKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRmaWx0ZXI6IGZ1bmN0aW9uKG9iaiwgZmlsdGVyKSB7XG5cdFx0aWYgKGZpbHRlciAmJiBvYmopIHtcblx0XHRcdHJldHVybiB0aGlzLmNvbnRhaW5zT2JqKG9iaiwgZmlsdGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbmRJY29uQnlGaWx0ZXI6IGZ1bmN0aW9uKGljb25zLCBmaWx0ZXIpIHtcblx0XHR2YXIgYmF0Y2ggPSBbXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGljb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5maWx0ZXIoaWNvbnNbaV0uZ2V0RGF0YSgpLCBmaWx0ZXIpKSB7XG5cdFx0XHRcdGJhdGNoLnB1c2goaWNvbnNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYmF0Y2g7XG5cdH0sXG5cdGVxdWFsT2JqOiBmdW5jdGlvbihhLCBiKSB7XG5cdFx0dmFyIHA7XG5cdFx0Zm9yIChwIGluIGEpIHtcblx0XHRcdGlmICh0eXBlb2YoYltwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKGFbcF0pIHtcblx0XHRcdFx0c3dpdGNoICh0eXBlb2YoYVtwXSkpIHtcblx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoIXRoaXMuZXF1YWwoYVtwXSwgYltwXSkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlICdmdW5jdGlvbic6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJyB8fFxuXHRcdFx0XHRcdFx0XHQocCAhPSAnZXF1YWxzJyAmJiBhW3BdLnRvU3RyaW5nKCkgIT0gYltwXS50b1N0cmluZygpKSlcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChhW3BdICE9IGJbcF0pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGJbcF0pXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAocCBpbiBiKSB7XG5cdFx0XHRpZiAodHlwZW9mKGFbcF0pID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGRlZmluZUlmTm90RXhpc3RzOiBmdW5jdGlvbihvYmosIGtleSwgZGVmYXVsdFZhbHVlKSB7XG5cdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0b2JqW2tleV0gPSBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9LFxuXHRkZWVwTWVyZ2U6IGZ1bmN0aW9uKG9iajEsIG9iajIpIHtcblx0XHRyZXR1cm4galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgb2JqMSwgb2JqMik7XG5cdH0sXG5cblx0cmVnaXN0cnk6IHt9LFxuXG5cdHJlZ2lzdGVyOiBmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdHRoaXMucmVnaXN0cnlba2V5XSA9IHZhbDtcblx0fSxcblxuXHRnZXQ6IGZ1bmN0aW9uKGtleSkge1xuXHRcdHJldHVybiB0aGlzLnJlZ2lzdHJ5Lmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzLnJlZ2lzdHJ5W2tleV0gOiBudWxsO1xuXHR9LFxuXG5cdG1vdmVJdGVtKGFycmF5LCBvbGRfaW5kZXgsIG5ld19pbmRleCkge1xuXHRcdGlmIChuZXdfaW5kZXggPj0gYXJyYXkubGVuZ3RoKSB7XG5cdFx0XHR2YXIgayA9IG5ld19pbmRleCAtIGFycmF5Lmxlbmd0aDtcblx0XHRcdHdoaWxlICgoay0tKSArIDEpIHtcblx0XHRcdFx0YXJyYXkucHVzaCh1bmRlZmluZWQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRhcnJheS5zcGxpY2UobmV3X2luZGV4LCAwLCBhcnJheS5zcGxpY2Uob2xkX2luZGV4LCAxKVswXSk7XG5cdH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbk9iamVjdHM7XG4iLCJ2YXIgQ29tbW9uU3RyaW5ncyA9IHtcblx0Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG5cdH0sXG5cdGxvd2VyRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblN0cmluZ3M7XG4iLCJ2YXIgQ29tbW9uRnVuY3Rpb25zID0ge1xuXHRwaXBlOiBmdW5jdGlvbihkYXRhLyogZmVlZCBkYXRhICovLCBmdW5jcy8qIGZ1bmN0aW9ucyBhcnJheSAqLykge1xuXHRcdGxldCByZXN1bHQ7XG5cdFx0Zm9yKGxldCBmdW5jIG9mIGZ1bmNzKXtcblx0XHRcdHJlc3VsdCA9IGZ1bmMocmVzdWx0IHx8IGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRnVuY3Rpb25zO1xuIiwidmFyIENvbW1vbkRPTSA9IHtcblx0Z2V0QXR0cmlidXRlc1N0YXJ0c1dpdGg6IGZ1bmN0aW9uKGVsLCBzdGFydHNXaXRoKSB7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihzdGFydHNXaXRoKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkRPTTtcbiIsInZhciBDb21tb25BcHAgPSB7XG5cdHN0YXJ0QXBwOiAoc3RhcnRlcik9Pntcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc3RhcnRlcik7XG5cdH0sXG5cdGdldEFwcDogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ2FwcCcpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25BcHA7XG4iLCJpbXBvcnQgQ29tbW9uTmV0d29yayBmcm9tICcuL25ldC5qcyc7XG5pbXBvcnQgQ29tbW9uTG9ncyBmcm9tICcuL2xvZ3MuanMnO1xuaW1wb3J0IENvbW1vblNob3J0cyBmcm9tICcuL3Nob3J0cy5qcyc7XG5pbXBvcnQgQ29tbW9uT2JqZWN0cyBmcm9tICcuL29iamVjdHMuanMnO1xuaW1wb3J0IENvbW1vblN0cmluZ3MgZnJvbSAnLi9zdHJpbmdzLmpzJztcbmltcG9ydCBDb21tb25GdW5jdGlvbnMgZnJvbSAnLi9mdW5jdGlvbnMuanMnO1xuaW1wb3J0IENvbW1vbkRPTSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgQ29tbW9uQXBwIGZyb20gJy4vYXBwLmpzJztcblxuLypcblx00YHQv9C40YHQvtC6INGC0L7Qs9C+INGH0YLQviDQvdGD0LbQvdC+INC/0L7QtNC60LvRjtGH0LjRgtGMINC60LDQuiDQvtCx0YnQuNC1XG4qL1xudmFyIG5vdENvbW1vbiA9IE9iamVjdC5hc3NpZ24oe30sIENvbW1vbk9iamVjdHMpO1xuXG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25OZXR3b3JrKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblN0cmluZ3MpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uTG9ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25TaG9ydHMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRnVuY3Rpb25zKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkRPTSk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25BcHApO1xuXG5leHBvcnQgZGVmYXVsdCBub3RDb21tb247XG4iLCIvKlxuXHQ6cHJvcGVydHkuc3ViMS5mdW5jKCkuZnVuY1Byb3Bcblx0ID0gcmV0dXJuIGZ1bmNQcm9wIG9mIGZ1bmN0aW9uIHJlc3VsdCBvZiBzdWIxIHByb3BlcnR5IG9mIHByb3BlcnR5IG9mIG9iamVjdFxuXHQ6ezo6aGVscGVyVmFsfS5zdWJcblx0ID0gcmV0dXJuIHN1YiBwcm9wZXJ0eSBvZiBvYmplY3QgcHJvcGVydHkgd2l0aCBuYW1lIHJldHJpZXZlZCBmcm9tIGhlbHBlclZhbCBwcm9wZXJ0eSBvZiBoZWxwZXJzIG9iamVjdFxuXHQ6ezo6aGVscGVyRnVuYygpfS5zdWJcblx0PSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIGZ1bmN0aW9uIHJlc3VsdCBvZiBoZWxwZXJzIG9iamVjdC5cblx0aWYgaGVscGVyc0Z1bnggcmV0dXJuICdjYXInIHRoZW4gc291cmNlIHBhdGggYmVjb21lcyA6Y2FyLnN1YlxuXG4qL1xuXG5jb25zdCBTVUJfUEFUSF9TVEFSVCA9ICd7Jyxcblx0U1VCX1BBVEhfRU5EID0gJ30nLFxuXHRQQVRIX1NQTElUID0gJy4nLFxuXHRQQVRIX1NUQVJUX09CSkVDVCA9ICc6Jyxcblx0UEFUSF9TVEFSVF9IRUxQRVJTID0gJzo6Jyxcblx0RlVOQ1RJT05fTUFSS0VSID0gJygpJyxcblx0TUFYX0RFRVAgPSAxMDtcblxuY2xhc3Mgbm90UGF0aCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGggLyogc3RyaW5nICovICkge1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAocGF0aFtpXSA9PT0gU1VCX1BBVEhfU1RBUlQpIHtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCkge1xuXHRcdFx0XHRcdGlmIChmaW5kKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3ViUGF0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c3ViUGF0aCArPSBwYXRoW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmaW5kID8gc3ViUGF0aCA6IG51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCkge1xuXHRcdGxldCBzdWJmID0gU1VCX1BBVEhfU1RBUlQgKyBzdWIgKyBTVUJfUEFUSF9FTkQ7XG5cdFx0d2hpbGUgKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKSB7XG5cdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKHN1YmYsIHBhcnNlZCk7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0cGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpLFxuXHRcdFx0c3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUgKHN1YlBhdGgpIHtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpID4gLTEgPyBoZWxwZXJzIDogaXRlbSwgc3ViUGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGkrKztcblx0XHRcdGlmIChpID4gTUFYX0RFRVApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCk7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzd2l0Y2ggKHBhdGgpIHtcblx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOlxuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0Y2FzZSBQQVRIX1NUQVJUX0hFTFBFUlM6XG5cdFx0XHRyZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpID4gLTEgPyBoZWxwZXJzIDogaXRlbSwgcGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcblx0XHRcdGF0dHJWYWx1ZSA9IGhlbHBlcnM7XG5cdFx0XHRoZWxwZXJzID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRsZXQgc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpLFxuXHRcdFx0c3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUgKHN1YlBhdGgpIHtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpID4gLTEgPyBoZWxwZXJzIDogaXRlbSwgc3ViUGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGlmIChpID4gTUFYX0RFRVApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHVuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHR0aGlzLnNldChwYXRoLCBpdGVtLCBoZWxwZXJzLCBudWxsKTtcblx0fVxuXG5cdHBhcnNlUGF0aFN0ZXAoc3RlcCwgaXRlbSwgaGVscGVyKSB7XG5cdFx0bGV0IHJTdGVwID0gbnVsbDtcblx0XHRpZiAoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUykgPT09IDAgJiYgaGVscGVyKSB7XG5cdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX0hFTFBFUlMsICcnKTtcblx0XHRcdGlmIChyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aCAtIDIpIHtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdGlmIChoZWxwZXIuaGFzT3duUHJvcGVydHkoclN0ZXApKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID09PSAwICYmIGl0ZW0pIHtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsICcnKTtcblx0XHRcdFx0aWYgKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoIC0gMikge1xuXHRcdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRcdGlmIChpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fVxuXG5cdC8vOjpmaWVsZE5hbWUucmVzdWx0XG5cdC8ve31cblx0Ly97ZmllbGROYW1lOiAndGFyZ2V0UmVjb3JkRmllbGQnfVxuXHQvLy8vWyd0YXJnZXRSZWNvcmRGaWVsZCcsICdyZXN1bHQnXVxuXHRwYXJzZVBhdGgocGF0aCwgaXRlbSwgaGVscGVyKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKSB7XG5cdFx0XHRwYXRoID0gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRwYXRoW2ldID0gdGhpcy5wYXJzZVBhdGhTdGVwKHBhdGhbaV0sIGl0ZW0sIGhlbHBlcik7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0bm9ybWlsaXplUGF0aChwYXRoKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocGF0aCkpIHtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aGlsZSAocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA+IC0xKSB7XG5cdFx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsICcnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0c21hbGwgPSBbXCJ0b2RvXCJdLFxuXHRcdGJpZyA9IFtcInRvZG9cIiwgXCJsZW5ndGhcIl1cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHQqL1xuXG5cdGlmRnVsbFN1YlBhdGgoYmlnLCBzbWFsbCkge1xuXHRcdGlmIChiaWcubGVuZ3RoIDwgc21hbGwubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgc21hbGwubGVuZ3RoOyB0KyspIHtcblx0XHRcdGlmIChzbWFsbFt0XSAhPT0gYmlnW3RdKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRnZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCksXG5cdFx0XHRpc0Z1bmN0aW9uID0gYXR0ck5hbWUuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID4gLTE7XG5cdFx0aWYgKGlzRnVuY3Rpb24pIHtcblx0XHRcdGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHR9XG5cdFx0aWYgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgdHlwZW9mIG9iamVjdFthdHRyTmFtZV0gIT09ICd1bmRlZmluZWQnICYmIG9iamVjdFthdHRyTmFtZV0gIT09IG51bGwpIHtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uID8gb2JqZWN0W2F0dHJOYW1lXSh7XG5cdFx0XHRcdGl0ZW0sXG5cdFx0XHRcdGhlbHBlcnNcblx0XHRcdH0pIDogb2JqZWN0W2F0dHJOYW1lXTtcblx0XHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKG5ld09iaiwgYXR0clBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIG5ld09iajtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpIHtcblx0XHRhdHRyUGF0aCA9IHRoaXMubm9ybWlsaXplUGF0aChhdHRyUGF0aCk7XG5cdFx0bGV0IGF0dHJOYW1lID0gYXR0clBhdGguc2hpZnQoKTtcblx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCkge1xuXHRcdFx0aWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKSB7XG5cdFx0XHRcdG9iamVjdFthdHRyTmFtZV0gPSB7fTtcblx0XHRcdH1cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9iamVjdFthdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0am9pbigpIHtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX01FVEhPRF9JTklUID0gU3ltYm9sKCdpbml0JyksXG5cdE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0dGhpc1tNRVRBX0VWRU5UU10gPSB7fTtcblx0XHR0aGlzW01FVEFfREFUQV0gPSB7fTtcblx0XHR0aGlzW01FVEFfV09SS0lOR10gPSB7fTtcblx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSB7fTtcblx0XHR0aGlzW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdFtNRVRBX01FVEhPRF9JTklUXShpbnB1dCkge1xuXHRcdGlmICghaW5wdXQpIHtcblx0XHRcdGlucHV0ID0ge307XG5cdFx0fVxuXHRcdGlmIChpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgaW5wdXQuZXZlbnRzKSB7XG5cdFx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGlucHV0Lmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcblx0XHRcdHRoaXMuc2V0RGF0YShpbnB1dC5kYXRhKTtcblx0XHR9XG5cblx0XHRpZiAoaW5wdXQuaGFzT3duUHJvcGVydHkoJ3dvcmtpbmcnKSkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKGlucHV0LndvcmtpbmcpO1xuXHRcdH1cblxuXHRcdGlmIChpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoaW5wdXQub3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiAqL1xuXHRcdFx0XHR3aGF0ID0gYXJnc1swXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiBlbGVtZW50ICovXG5cdFx0XHRcdG5vdFBhdGguc2V0KGFyZ3NbMF0gLyogcGF0aCAqLyAsIHdoYXQgLyogY29sbGVjdGlvbiAqLyAsIHVuZGVmaW5lZCAvKiBoZWxwZXJzICovICwgYXJnc1sxXSAvKiB2YWx1ZSAqLyApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Z2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggKi9cblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdH1cblx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCB3aXRoIGRlZmF1bHQgdmFsdWUgKi9cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdGxldCByZXMgPSBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdFx0aWYgKHJlcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Lyogbm8gZGF0YSwgcmV0dXJuIGRlZmF1bHQgdmFsdWUgKi9cblx0XHRcdFx0XHRyZXR1cm4gYXJnc1sxXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvKiBkYXRhLCByZXR1cm4gaXQgKi9cblx0XHRcdFx0XHRyZXR1cm4gcmVzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvKiByZXR1cm4gZnVsbCBjb2xsZWN0aW9uICovXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHdoYXQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRDT1JFIE9CSkVDVFxuXHRcdFx0REFUQSAtIGluZm9ybWF0aW9uXG5cdFx0XHRPUFRJT05TIC0gaG93IHRvIHdvcmtcblx0XHRcdFdPUktJTkcgLSB0ZW1wb3JhcmlseSBnZW5lcmF0ZWQgaW4gcHJvY2Nlc3Ncblx0Ki9cblxuXHRzZXREYXRhKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfREFUQV0gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0RGF0YSgpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RGF0YSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX0RBVEFdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0T3B0aW9ucygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX09QVElPTlNdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldE9wdGlvbnMoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRPcHRpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfT1BUSU9OU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRXb3JraW5nKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfV09SS0lOR10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0V29ya2luZygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFdvcmtpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9XT1JLSU5HXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qXG5cdFx0RVZFTlRTIGhhbmRsaW5nXG5cdCovXG5cblx0b24oZXZlbnROYW1lcywgZXZlbnRDYWxsYmFja3MsIG9uY2UpIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmRlZmluZUlmTm90RXhpc3RzKHRoaXNbTUVUQV9FVkVOVFNdLCBuYW1lLCBbXSk7XG5cdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5wdXNoKHtcblx0XHRcdFx0Y2FsbGJhY2tzOiBldmVudENhbGxiYWNrcyxcblx0XHRcdFx0b25jZTogb25jZSxcblx0XHRcdFx0Y291bnQ6IDBcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dHJpZ2dlcigpIHtcblx0XHRsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKSxcblx0XHRcdGV2ZW50TmFtZSA9IGFyZ3Muc2hpZnQoKTtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lKSkge1xuXHRcdFx0ZXZlbnROYW1lID0gW2V2ZW50TmFtZV07XG5cdFx0fVxuXHRcdGZvciAobGV0IGcgPSAwOyBnIDwgZXZlbnROYW1lLmxlbmd0aDsgZysrKSB7XG5cdFx0XHRsZXQgbmFtZSA9IGV2ZW50TmFtZVtnXTtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdFx0bGV0IGV2ZW50ID0gdGhpc1tNRVRBX0VWRU5UU11bbmFtZV1bdF07XG5cdFx0XHRcdFx0aWYgKGV2ZW50Lm9uY2UpIHtcblx0XHRcdFx0XHRcdHRoaXMub2ZmKG5hbWUsIGV2ZW50LmNhbGxiYWNrcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvciAodmFyIGggPSAwOyBoIDwgZXZlbnQuY2FsbGJhY2tzLmxlbmd0aDsgaCsrKSB7XG5cdFx0XHRcdFx0XHRldmVudC5jYWxsYmFja3NbaF0oLi4uYXJncyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0b2ZmKGV2ZW50TmFtZXMgLyogYXJyYXkgb2YgZXZlbnQgbmFtZXMgKi8gLCBldmVudENhbGxiYWNrcyAvKiBhcnJheSBvZiBjYWxsYmFja3MgKi8gKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXHRcdGZvciAobGV0IGcgPSAwOyBnIDwgZXZlbnROYW1lcy5sZW5ndGg7IGcrKykge1xuXHRcdFx0bGV0IG5hbWUgPSBldmVudE5hbWVzW2ddO1xuXHRcdFx0bGV0IHRhcmdldElkID0gLTE7XG5cdFx0XHRmb3IgKGxldCBoID0gMDsgaCA8IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmxlbmd0aDsgaCsrKSB7XG5cdFx0XHRcdGxldCBldmVudCA9IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdW2hdO1xuXHRcdFx0XHRpZiAodGFyZ2V0SWQgPT09IC0xICYmIGV2ZW50Q2FsbGJhY2tzID09PSBldmVudC5jYWxsYmFja3MpIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9IGg7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0YXJnZXRJZCA+IC0xKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnNwbGljZSh0YXJnZXRJZCwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0b2ZmQWxsKCkge1xuXHRcdGxldCBldmVudHMgPSBPYmplY3Qua2V5cyh0aGlzW01FVEFfRVZFTlRTXSk7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBldmVudHMubGVuZ3RoOyB0KyspIHtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShldmVudHNbdF0pKSB7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzW01FVEFfRVZFTlRTXVtldmVudHNbdF1dO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvZygpIHtcblx0XHRpZiAoIW5vdENvbW1vbi5nZXQoJ3Byb2R1Y3Rpb24nKSAmJiBub3RDb21tb24ubG9nKSB7XG5cdFx0XHRub3RDb21tb24ubG9nKHRoaXMuZ2V0V29ya2luZygnbmFtZScpLCAuLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdGluZm8oKSB7XG5cdFx0aWYgKCFub3RDb21tb24uZ2V0KCdwcm9kdWN0aW9uJykgJiYgbm90Q29tbW9uLmluZm8pIHtcblx0XHRcdG5vdENvbW1vbi5pbmZvKHRoaXMuZ2V0V29ya2luZygnbmFtZScpLCAuLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdGVycm9yKCkge1xuXHRcdGlmICghbm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpICYmIG5vdENvbW1vbi5lcnJvcikge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKHRoaXMuZ2V0V29ya2luZygnbmFtZScpLCAuLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdHJlcG9ydCgpIHtcblx0XHRpZiAobm90Q29tbW9uLnJlcG9ydCkge1xuXHRcdFx0bm90Q29tbW9uLnJlcG9ydCh0aGlzLmdldFdvcmtpbmcoJ25hbWUnKSwgLi4uYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5jb25zdCBPUFRfTU9ERV9ISVNUT1JZID0gU3ltYm9sKCdoaXN0b3J5JyksXG5cdE9QVF9NT0RFX0hBU0ggPSBTeW1ib2woJ2hhc2gnKSxcblx0T1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwgPSA1MDtcblxuY2xhc3Mgbm90Um91dGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJvdXRlczogW10sXG5cdFx0XHRtb2RlOiBPUFRfTU9ERV9ISVNUT1JZLFxuXHRcdFx0cm9vdDogJy8nLCAvL2Fsd2F5cyBpbiBzbGFzaGVzIC91c2VyLywgLywgL2lucHV0Ly4gYW5kIG5vIC91c2VyIG9yIGlucHV0L2xldmVsXG5cdFx0XHRpbml0aWFsaXplZDogZmFsc2Vcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpc3RvcnkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtb2RlJywgT1BUX01PREVfSElTVE9SWSk7XG5cdH1cblxuXHRoYXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZScsIE9QVF9NT0RFX0hBU0gpO1xuXHR9XG5cblx0c2V0Um9vdChyb290KSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb290Jywgcm9vdCA/ICcvJyArIHRoaXMuY2xlYXJTbGFzaGVzKHJvb3QpICsgJy8nIDogJy8nKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNsZWFyU2xhc2hlcyhwYXRoKSB7XG5cdFx0Ly9maXJzdCBhbmQgbGFzdCBzbGFzaGVzIHJlbW92YWxcblx0XHRyZXR1cm4gcGF0aC50b1N0cmluZygpLnJlcGxhY2UoL1xcLyQvLCAnJykucmVwbGFjZSgvXlxcLy8sICcnKTtcblx0fVxuXG5cdGFkZChyZSwgaGFuZGxlcikge1xuXHRcdGlmICh0eXBlb2YgcmUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aGFuZGxlciA9IHJlO1xuXHRcdFx0cmUgPSAnJztcblx0XHR9XG5cdFx0bGV0IHJ1bGUgPSB7XG5cdFx0XHRyZTogcmUsXG5cdFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0fTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLnB1c2gocnVsZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRMaXN0KGxpc3QpIHtcblx0XHRmb3IgKGxldCB0IGluIGxpc3QpIHtcblx0XHRcdHRoaXMuYWRkKHQsIGxpc3RbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbW92ZShwYXJhbSkge1xuXHRcdGZvciAodmFyIGkgPSAwLCByOyBpIDwgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5sZW5ndGgsIHIgPSB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldOyBpKyspIHtcblx0XHRcdGlmIChyLmhhbmRsZXIgPT09IHBhcmFtIHx8IHIucmUgPT09IHBhcmFtKSB7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRmbHVzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLydcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGlzSW5pdGlhbGl6ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnaW5pdGlhbGl6ZWQnKTtcblx0fVxuXG5cdHNldEluaXRpYWxpemVkKHZhbCA9IHRydWUpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdpbml0aWFsaXplZCcsIHZhbCk7XG5cdH1cblxuXHRnZXRGcmFnbWVudCgpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSAnJztcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdtb2RlJykgPT09IE9QVF9NT0RFX0hJU1RPUlkpIHtcblx0XHRcdGlmICghbG9jYXRpb24pIHJldHVybiAnJztcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoKSk7XG5cdFx0XHRmcmFnbWVudCA9IGZyYWdtZW50LnJlcGxhY2UoL1xcPyguKikkLywgJycpO1xuXHRcdFx0ZnJhZ21lbnQgPSB0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSAhPSAnLycgPyBmcmFnbWVudC5yZXBsYWNlKHRoaXMuZ2V0V29ya2luZygncm9vdCcpLCAnJykgOiBmcmFnbWVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCF3aW5kb3cpIHJldHVybiAnJztcblx0XHRcdHZhciBtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdGZyYWdtZW50ID0gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jbGVhclNsYXNoZXMoZnJhZ21lbnQpO1xuXHR9XG5cblx0Y2hlY2tMb2NhdGlvbigpIHtcblx0XHRsZXQgY3VycmVudCA9IHRoaXMuZ2V0V29ya2luZygnY3VycmVudCcpLFxuXHRcdFx0ZnJhZ21lbnQgPSB0aGlzLmdldEZyYWdtZW50KCksXG5cdFx0XHRpbml0ID0gdGhpcy5pc0luaXRpYWxpemVkKCk7XG5cdFx0aWYgKGN1cnJlbnQgIT09IGZyYWdtZW50IHx8ICFpbml0KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLCBmcmFnbWVudCk7XG5cdFx0XHR0aGlzLmNoZWNrKGZyYWdtZW50KTtcblx0XHRcdHRoaXMuc2V0SW5pdGlhbGl6ZWQoKTtcblx0XHR9XG5cdH1cblxuXHRocmVmQ2xpY2soKSB7XG5cdFx0Ly9jb25zb2xlLmxvZyguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Z2V0Um9vdCgpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRsaXN0ZW4obG9vcEludGVydmFsID0gT1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLCAnbm90SW5pdGlhbGl6ZWQnKTtcblx0XHRjbGVhckludGVydmFsKHRoaXMuZ2V0V29ya2luZygnaW50ZXJ2YWwnKSk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcnZhbCcsIHNldEludGVydmFsKHRoaXMuY2hlY2tMb2NhdGlvbi5iaW5kKHRoaXMpLCBsb29wSW50ZXJ2YWwpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhyZWZDbGljay5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNoZWNrKGYpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSBmIHx8IHRoaXMuZ2V0RnJhZ21lbnQoKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0V29ya2luZygncm91dGVzJykubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBwYXRoID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgKyB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldLnJlO1xuXHRcdFx0bGV0IGZ1bGxSRSA9IHRoaXMuY2xlYXJTbGFzaGVzKGRlY29kZVVSSShwYXRoKSk7XG5cdFx0XHR2YXIgbWF0Y2ggPSBmcmFnbWVudC5tYXRjaChmdWxsUkUpO1xuXHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJylbaV0uaGFuZGxlci5hcHBseSh0aGlzLmhvc3QgfHwge30sIG1hdGNoKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bmF2aWdhdGUocGF0aCkge1xuXHRcdHBhdGggPSBwYXRoID8gcGF0aCA6ICcnO1xuXHRcdHN3aXRjaCAodGhpcy5nZXRXb3JraW5nKCdtb2RlJykpIHtcblx0XHRjYXNlIE9QVF9NT0RFX0hJU1RPUlk6XG5cdFx0XHR7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ3B1c2ggc3RhdGUnLCB0aGlzLmdldEZ1bGxSb3V0ZShwYXRoKSk7XG5cdFx0XHRcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHRoaXMuZ2V0RnVsbFJvdXRlKHBhdGgpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y2FzZSBPUFRfTU9ERV9IQVNIOlxuXHRcdFx0e1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyguKikkLywgJycpICsgJyMnICsgcGF0aDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RnVsbFJvdXRlKHBhdGggPSAnJykge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSArIHRoaXMuY2xlYXJTbGFzaGVzKHBhdGgpO1xuXHR9XG5cblx0Z2V0QWxsTGlua3MoKSB7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKCduLWhyZWYnKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHRyZVJvdXRlRXhpc3RlZCgpIHtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0QWxsTGlua3MoKTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IGxpc3QubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMuaW5pdFJlcm91dGluZyhsaXN0W3RdLCBsaXN0W3RdLmdldEF0dHJpYnV0ZSgnbi1ocmVmJykpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRSZXJvdXRpbmcoZWwsIGxpbmspIHtcblx0XHRpZiAoIWVsLm5vdFJvdXRlckluaXRpYWxpemVkKSB7XG5cdFx0XHRsZXQgZnVsbExpbmsgPSB0aGlzLmdldEZ1bGxSb3V0ZShsaW5rKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnaHJlZicsIGZ1bGxMaW5rKTtcblx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLm5hdmlnYXRlKGxpbmspO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdGVsLm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90Um91dGVyKCk7XG4iLCJsZXQgbm90QVBJT3B0aW9ucyA9IHtcblx0cnBzOiA1MCxcblx0cHJvdG9jb2w6ICdodHRwJyxcblx0aG9zdDogJ2xvY2FsaG9zdCcsXG5cdHBvcnQ6IDkwMDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSU9wdGlvbnM7XG4iLCJjbGFzcyBub3RBUElRdWVle1xuXHRjb25zdHJ1Y3RvciAocmVxdWVzdHNQZXJTZWNvbmQpIHtcblx0XHR0aGlzLnF1ZWUgPSBbXTtcblx0XHR0aGlzLmludCA9IG51bGw7XG5cdFx0dGhpcy5yZXF1ZXN0c1BlclNlY29uZCA9IHJlcXVlc3RzUGVyU2Vjb25kIHx8IDU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW4oKXtcblx0XHR0aGlzLmludCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLmNoZWNrLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLnJlcXVlc3RzUGVyU2Vjb25kKTtcblx0fVxuXG5cdGNoZWNrKCl7XG5cdFx0aWYgKHRoaXMuaW5Qcm9ncmVzcyl7cmV0dXJuO31cblx0XHRlbHNle1xuXHRcdFx0aWYgKHRoaXMucXVlZS5sZW5ndGggPiAwKXtcblx0XHRcdFx0dGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHRvQ2FsbCA9IHRoaXMucXVlZS5zaGlmdCgpO1xuXHRcdFx0XHR0b0NhbGwoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRuZXh0KCl7XG5cdFx0dGhpcy5pblByb2dyZXNzID0gZmFsc2U7XG5cdH1cblxuXHRhZGQoY2FsbCl7XG5cdFx0dGhpcy5xdWVlLnB1c2goY2FsbCk7XG5cdH1cblxuXHRwYXVzZSgpe1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50KTtcblx0fVxuXG5cdHJlc3VtZSgpe1xuXHRcdHRoaXMucnVuKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJUXVlZTtcbiIsImltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jbGFzcyBub3RBUElDYWNoZSB7XG5cdGNvbnN0cnVjdG9yKHR0bCA9IDIwMDApIHtcblx0XHR0aGlzLmRhdGEgPSB7fTtcblx0XHR0aGlzLnR0bCA9IHBhcnNlSW50KHR0bCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGQoYnVja2V0LCBrZXksIGRhdGEpIHtcblx0XHRub3RQYXRoLnNldChub3RQYXRoLmpvaW4oYnVja2V0LCBrZXkpLCB7XG5cdFx0XHRkYXRhLFxuXHRcdFx0dmFsaWRUaWxsOiAobmV3IERhdGUoKSkuZ2V0VGltZSgpICsgdGhpcy50dGxcblx0XHR9LCB7fSwgdGhpcy5kYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGZpbmQoYnVja2V0LCBrZXkpIHtcblx0XHRsZXQgciA9IG5vdFBhdGguZ2V0KG5vdFBhdGguam9pbihidWNrZXQsIGtleSksIHRoaXMuZGF0YSk7XG5cdFx0aWYgKHIgJiYgci52YWxpZFRpbGwgPCAobmV3IERhdGUoKSkuZ2V0VGltZSgpICYmIHIuZGF0YSkge1xuXHRcdFx0cmV0dXJuIHIuZGF0YTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90UGF0aC51bnNldChub3RQYXRoLmpvaW4oYnVja2V0LCBrZXkpLCB0aGlzLmRhdGEpO1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJQ2FjaGU7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlLmpzJztcblxuaW1wb3J0IG5vdEFQSU9wdGlvbnMgZnJvbSAnLi9vcHRpb25zLmpzJztcbmltcG9ydCBub3RBUElRdWVlIGZyb20gJy4vcXVlZS5qcyc7XG5pbXBvcnQgbm90QVBJQ2FjaGUgZnJvbSAnLi9jYWNoZS5qcyc7XG5cblxuY2xhc3Mgbm90QVBJIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RDb21tb24uZXh0ZW5kKG5vdEFQSU9wdGlvbnMsIG9wdGlvbnMpKTtcblx0XHR0aGlzLnF1ZWUgPSBuZXcgbm90QVBJUXVlZSh0aGlzLmdldE9wdGlvbnMoJ3JwcycpKTtcblx0XHR0aGlzLnF1ZWUucnVuKCk7XG5cdFx0dGhpcy5jYWNoZSA9IG5ldyBub3RBUElDYWNoZSgpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bWFrZVVybChwYXJ0cykge1xuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcvJyk7XG5cdH1cblxuXHRxdWVlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgbWV0aG9kLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdG1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKSB7XG5cdFx0bm90Q29tbW9uLnJlcXVlc3RKU09OKG1ldGhvZCwgdXJsLCBkYXRhKVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3Bvc3QnLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXQob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdnZXQnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZWxldGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdkZWxldGUnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUEk7XG4iLCJpbXBvcnQgbm90QmFzZSAgZnJvbSAnLi4vbm90QmFzZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbWFnZSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuIiwiY29uc3QgUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYID0gJ24tJyxcblx0VEVNUExBVEVfVEFHID0gJ250Jyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SID0gJy0nLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCA9ICdpZicsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVggPSAnbm90X2NvbXBvbmVudF8nLFxuXHRQQVJUX0lEX1BSRUZJWCA9ICdub3RfcGFydF8nLFxuXHRERUZBVUxUX1BMQUNFUiA9ICdwbGFjZScsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1AgPSAncGxhY2VBZnRlcic7XG5cbmNvbnN0IE9QVFMgPSB7XG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCxcblx0VEVNUExBVEVfVEFHLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLFxuXHRERUZBVUxUX1BMQUNFUixcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCxcblx0UEFSVF9JRF9QUkVGSVgsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1Bcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9QVFM7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5jb25zdCBNRVRBX0NBQ0hFID0gU3ltYm9sKCdjYWNoZScpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZUNhY2hlIGV4dGVuZHMgbm90QmFzZXtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DQUNIRV0gPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0dGhpcy5oaWRlVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5yZWdpc3RlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlkZVRlbXBsYXRlcygpe1xuXHRcdGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHR0LmlubmVySFRNTCA9IE9QVFMuVEVNUExBVEVfVEFHICsgJ3tkaXNwbGF5OiBub25lO30nO1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodCk7XG5cdH1cblxuXHRyZWdpc3RlcigpIHtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ3RlbXBsYXRlQ2FjaGUnLCB0aGlzKTtcblx0fVxuXG5cdGxvYWQobWFwKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdGZvciAodmFyIGkgaW4gbWFwKSB7XG5cdFx0XHR0aGlzLmxvYWRPbmUoaSwgbWFwW2ldKTtcblx0XHR9XG5cdH1cblxuXHRsb2FkT25lKGtleSwgdXJsLCBjYWxsYmFjaykge1xuXHRcdHZhciBvUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdG9SZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XG5cdFx0b1JlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZU5hbWUgPSBrZXk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZVVSTCA9IHVybDtcblx0XHRcdGRpdi5pbm5lckhUTUwgPSByZXNwb25zZS5zcmNFbGVtZW50LnJlc3BvbnNlVGV4dDtcblx0XHRcdHRoaXMuc2V0T25lKGtleSwgZGl2KTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKGtleSwgdXJsLCBkaXYpO1xuXG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRvUmVxdWVzdC5zZW5kKCk7XG5cdH1cblxuXHRpZkFsbExvYWRlZCgpe1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMudHJpZ2dlcignbG9hZGVkJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0T25lKGtleSwgZWxlbWVudCkge1xuXHRcdGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7XG5cdFx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5hZGRGcm9tVGV4dChrZXksIGVsZW1lbnQpO1x0XG5cdFx0fVxuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KGtleSkpe1xuXHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vdGhhdC5zZXRMb2FkaW5nKGtleSwgdXJsKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZUlubmVySFRNTCk9Pntcblx0XHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0XHRcdH0pLmNhdGNoKCgpPT57XG5cdFx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGUnLCBrZXksIHVybCk7XG5cdFx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlc0hUTUwpPT57XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoaXMucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdFx0dGhpcy5hZGRMaWIodGVtcGxhdGVzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHRcdH0pLmNhdGNoKChlKT0+e1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZXMgbGliJywgdXJsLGUpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJjb25zdFxuXHQvL2ludGVyZmFjZVxuXHRPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZID0gWydfaWQnLCAnaWQnLCAnSUQnXSxcblx0REVGQVVMVF9GSUxURVIgPSB7fSxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTAsXG5cdC8vcHJvcGVydHlcblx0TUVUQV9SRVRVUk5fVE9fUk9PVCA9IFN5bWJvbCgncmV0dXJuVG9Sb290JyksXG5cdE1FVEFfUFJPWFkgPSBTeW1ib2woJ3Byb3h5JyksXG5cdC8vcmVjb3JkXG5cdE1FVEFfSU5URVJGQUNFID0gU3ltYm9sKCdpbnRlcmZhY2UnKSxcblx0TUVUQV9DSEFOR0UgPSBTeW1ib2woJ2NoYW5nZScpLFxuXHRNRVRBX0NIQU5HRV9ORVNURUQgPSBTeW1ib2woJ2NoYW5nZS5uZXN0ZWQnKSxcblx0TUVUQV9TQUwgPSBbXG5cdFx0J2dldEF0dHInLFxuXHRcdCdnZXRBdHRycycsXG5cdFx0J2lzUHJvcGVydHknLFxuXHRcdCdpc1JlY29yZCcsXG5cdFx0J2dldE1hbmlmZXN0Jyxcblx0XHQnc2V0QXR0cicsXG5cdFx0J3NldEF0dHJzJyxcblx0XHQnZ2V0RGF0YScsXG5cdFx0J3NldERhdGEnLFxuXHRcdCdnZXRKU09OJyxcblx0XHQnb24nLFxuXHRcdCdvZmYnLFxuXHRcdCd0cmlnZ2VyJ1xuXHRdLFxuXHRNRVRBX01BUF9UT19JTlRFUkZBQ0UgPSBbXG5cdFx0J2dldEFjdGlvbnNDb3VudCcsXG5cdFx0J2dldEFjdGlvbnMnLFxuXHRcdCdzZXRGaW5kQnknLFxuXHRcdCdyZXNldEZpbHRlcicsXG5cdFx0J3NldEZpbHRlcicsXG5cdFx0J2dldEZpbHRlcicsXG5cdFx0J3NldFNvcnRlcicsXG5cdFx0J2dldFNvcnRlcicsXG5cdFx0J3Jlc2V0U29ydGVyJyxcblx0XHQnc2V0UGFnZU51bWJlcicsXG5cdFx0J3NldFBhZ2VTaXplJyxcblx0XHQnc2V0UGFnZXInLFxuXHRcdCdyZXNldFBhZ2VyJyxcblx0XHQnZ2V0UGFnZXInXG5cdF0sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJztcblxuZXhwb3J0IHtcblx0T1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSxcblx0REVGQVVMVF9GSUxURVIsXG5cdERFRkFVTFRfUEFHRV9OVU1CRVIsXG5cdERFRkFVTFRfUEFHRV9TSVpFLFxuXHRNRVRBX1JFVFVSTl9UT19ST09ULFxuXHRNRVRBX1BST1hZLFxuXHRNRVRBX0lOVEVSRkFDRSxcblx0TUVUQV9DSEFOR0UsXG5cdE1FVEFfQ0hBTkdFX05FU1RFRCxcblx0TUVUQV9TQUwsXG5cdE1FVEFfTUFQX1RPX0lOVEVSRkFDRSxcblx0REVGQVVMVF9BQ1RJT05fUFJFRklYXG59O1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQge1xuXHRPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZLFxuXHRERUZBVUxUX0ZJTFRFUixcblx0REVGQVVMVF9QQUdFX05VTUJFUixcblx0REVGQVVMVF9QQUdFX1NJWkVcbn0gZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9yZWNvcmQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbnRlcmZhY2UgZXh0ZW5kcyBub3RCYXNlIHtcblxuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCkge1xuXHRcdHN1cGVyKHt9KTtcblx0XHR0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldElEKHJlY29yZCwgYWN0aW9uRGF0YSkge1xuXHRcdGxldCByZXN1bHRJZCxcblx0XHRcdGxpc3QgPSBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZLFxuXHRcdFx0cHJlZml4ZXMgPSBbJycsIHRoaXMubWFuaWZlc3QubW9kZWxdO1xuXHRcdGlmIChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpbmRleCcpICYmIGFjdGlvbkRhdGEuaW5kZXgpIHtcblx0XHRcdGxpc3QgPSBbYWN0aW9uRGF0YS5pbmRleF0uY29uY2F0KE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkpO1xuXHRcdH1cblx0XHRmb3IgKGxldCBwcmUgb2YgcHJlZml4ZXMpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgbGlzdCkge1xuXHRcdFx0XHRpZiAocmVjb3JkLmhhc093blByb3BlcnR5KHByZSArIHQpKSB7XG5cdFx0XHRcdFx0cmVzdWx0SWQgPSByZWNvcmRbcHJlICsgdF07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdElkO1xuXHR9XG5cblx0Z2V0QWN0aW9uc0NvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSA/IE9iamVjdC5rZXlzKHRoaXMuZ2V0QWN0aW9ucygpKS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Z2V0QWN0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgPyB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgOiB7fTtcblx0fVxuXG5cdHNldEZpbmRCeShrZXksIHZhbHVlKSB7XG5cdFx0dmFyIG9iaiA9IHt9O1xuXHRcdG9ialtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIHRoaXMuc2V0RmlsdGVyKG9iaik7XG5cdH1cblxuXHRzZXRGaWx0ZXIoZmlsdGVyRGF0YSA9IERFRkFVTFRfRklMVEVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgZmlsdGVyRGF0YSk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIoe30pO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0U29ydGVyKHNvcnRlckRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHNldFBhZ2VTaXplKHBhZ2VTaXplKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSk7XG5cdH1cblxuXHRzZXRQYWdlcihwYWdlU2l6ZSA9IERFRkFVTFRfUEFHRV9TSVpFLCBwYWdlTnVtYmVyID0gREVGQVVMVF9QQUdFX05VTUJFUikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0UGFnZXIoKTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRXb3JraW5nKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRXb3JraW5nKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdGNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlcXVlc3REYXRhID0ge307XG5cdFx0aWYgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdkYXRhJykpICYmIEFycmF5LmlzQXJyYXkoYWN0aW9uRGF0YS5kYXRhKSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpb25EYXRhLmRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGRhdGFQcm92aWRlck5hbWUgPSAnZ2V0JyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoYWN0aW9uRGF0YS5kYXRhW2ldKTtcblx0XHRcdFx0aWYgKHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gJiYgdHlwZW9mIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRyZXF1ZXN0RGF0YSA9IG5vdENvbW1vbi5leHRlbmQocmVxdWVzdERhdGEsIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0oKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVlc3REYXRhO1xuXHR9XG5cblx0ZW5jb2RlUmVxdWVzdChkYXRhKSB7XG5cdFx0bGV0IHAgPSAnPyc7XG5cdFx0Zm9yIChsZXQgdCBpbiBkYXRhKSB7XG5cdFx0XHRwICs9IGVuY29kZVVSSUNvbXBvbmVudCh0KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChkYXRhW3RdKSArICcmJztcblx0XHR9XG5cdFx0cmV0dXJuIHA7XG5cdH1cblxuXHQvL3JldHVybiBQcm9taXNlXG5cdHJlcXVlc3QocmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zID0gdGhpcy5jb2xsZWN0UmVxdWVzdERhdGEoYWN0aW9uRGF0YSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zRW5jb2RlZCA9IHRoaXMuZW5jb2RlUmVxdWVzdChyZXF1ZXN0UGFyYW1zKSxcblx0XHRcdGlkID0gdGhpcy5nZXRJRChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpLFxuXHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwgKyByZXF1ZXN0UGFyYW1zRW5jb2RlZCwgaWQsIEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpKVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0YWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKSB7XG5cdFx0aWYgKHRoaXMgJiYgYWN0aW9uRGF0YSAmJiBhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpc0FycmF5JykgJiYgYWN0aW9uRGF0YS5pc0FycmF5KSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZGF0YVt0XSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YVt0XSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSBuZXcgbm90UmVjb3JkKHRoaXMubWFuaWZlc3QsIGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxufVxuIiwiaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcblxuaW1wb3J0IHtcblx0TUVUQV9SRVRVUk5fVE9fUk9PVCxcblx0TUVUQV9QUk9YWSxcblx0TUVUQV9TQUxcbn0gZnJvbSAnLi9vcHRpb25zJztcblxudmFyIGNyZWF0ZVByb3BlcnR5SGFuZGxlcnMgPSBmdW5jdGlvbiAob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbiAodGFyZ2V0LCBrZXksIHZhbHVlIC8qLCBwcm94eSovICkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBzZXQgXCIke2tleX1cImAsIHR5cGVvZiB0YXJnZXRba2V5XSk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RSZWNvcmRQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RSZWNvcmRQcm9wZXJ0eSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihnZXRSb290LCBwYXRoVG8sIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUHJveHkgfHwgaXRlbS5pc1Byb3BlcnR5KSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRnZXRSb290OiBnZXRSb290LFxuXHRcdFx0cGF0aDogcGF0aFRvXG5cdFx0fSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzKHRoaXMpKTtcblx0XHR0aGlzLnNldERhdGEoaXRlbSk7XG5cdFx0dGhpcy5pc1Byb3BlcnR5ID0gdHJ1ZTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfUkVUVVJOX1RPX1JPT1RdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0W01FVEFfUkVUVVJOX1RPX1JPT1RdKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0bGV0IHJvb3QgPSB0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSgpO1xuXHRcdHJvb3QudHJpZ2dlcignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9QUk9YWV0sIHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXksIHZhbHVlKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmRQcm9wZXJ0eTtcbmV4cG9ydCB7XG5cdE1FVEFfUkVUVVJOX1RPX1JPT1Rcbn07XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IHtcblx0TUVUQV9JTlRFUkZBQ0UsXG5cdE1FVEFfUFJPWFksXG5cdE1FVEFfQ0hBTkdFLFxuXHRNRVRBX0NIQU5HRV9ORVNURUQsXG5cdE1FVEFfU0FMLFxuXHRNRVRBX01BUF9UT19JTlRFUkZBQ0UsXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWFxufSBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL2ludGVyZmFjZSc7XG5pbXBvcnQgbm90UmVjb3JkUHJvcGVydHkgZnJvbSAnLi9wcm9wZXJ0eSc7XG5cbnZhciBjcmVhdGVSZWNvcmRIYW5kbGVycyA9IGZ1bmN0aW9uIChvd25lcikge1xuXHRyZXR1cm4ge1xuXHRcdGdldDogZnVuY3Rpb24gKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScgfHwga2V5ID09PSAnaXNSZWNvcmQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykge1xuXHRcdFx0XHRpZiAodGhpc1trZXldKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfTUFQX1RPX0lOVEVSRkFDRS5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RSZWNvcmRQcm9wZXJ0eSh0aGlzLmdldFJvb3QuYmluZCh0aGlzKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RSZWNvcmQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QsIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIGl0ZW0uaXNQcm94eSkge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCd0aGlzIGlzIFByb3h5IGl0ZW0nKTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUmVjb3JkIHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRPcHRpb25zKHt9KTtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXSA9IG5ldyBub3RSZWNvcmRJbnRlcmZhY2UobWFuaWZlc3QpO1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzLmludGVyZmFjZVVwKCk7XG5cdFx0dGhpcy5pc1JlY29yZCA9IHRydWU7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSByZWNvcmQgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRpbml0UHJvcGVydGllcyhpdGVtLCBwYXRoID0gJycpIHtcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoaXRlbSk7XG5cdFx0XHRmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuXHRcdFx0XHRsZXQgY3VyUGF0aCA9IHBhdGggKyAocGF0aC5sZW5ndGggPiAwID8gJy4nIDogJycpICsga2V5O1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2N1clBhdGgnLCBjdXJQYXRoKTtcblx0XHRcdFx0aWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbVtrZXldID09PSAnb2JqZWN0JyAmJiBpdGVtW2tleV0gIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbVtrZXldLCBjdXJQYXRoKTtcblx0XHRcdFx0XHRcdGl0ZW1ba2V5XSA9IG5ldyBub3RSZWNvcmRQcm9wZXJ0eSh0aGlzLmdldFJvb3QuYmluZCh0aGlzKSwgY3VyUGF0aCwgaXRlbVtrZXldKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGtleSwgJ2lzIG93biBwcm9wZXJ0eSwgYnV0IG5vdCBvYmplY3QnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGtleSwgJ2lzIG5vdCBvd24gcHJvcGVydHknKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaXRlbTtcblx0fVxuXG5cdGdldFJvb3QoKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtcykge1xuXHRcdHZhciBjb2xsZWN0aW9uID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29sbGVjdGlvbi5wdXNoKG5ldyBub3RSZWNvcmQobWFuaWZlc3QsIGl0ZW1zW2ldKSk7XG5cdFx0fVxuXHRcdHJldHVybiBjb2xsZWN0aW9uO1xuXHR9XG5cblx0aW50ZXJmYWNlVXAoKSB7XG5cdFx0aWYgKHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEFjdGlvbnNDb3VudCgpID4gMCkge1xuXHRcdFx0bGV0IGFjdGlvbnMgPSB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zKCk7XG5cdFx0XHRmb3IgKGxldCBpIGluIGFjdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5hY3Rpb25VcChpLCBhY3Rpb25zW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gKCkgPT4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCk7XG5cdFx0fVxuXHR9XG5cdC8qXG5cdC0+ICdwYXRoLnRvLmtleScsIHZhbHVlT2ZLZXlcblx0PC0gb2ssIHdpdGggb25lIG9uQ2hhbmdlIGV2ZW50IHRyaWdnZXJlZFxuXHQqL1xuXG5cdHNldEF0dHIoa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBub3RQYXRoLnNldChrZXksIHRoaXNbTUVUQV9QUk9YWV0sIHt9LCB2YWx1ZSk7XG5cdH1cblxuXHQvKlxuXHQtPlxuXHR7XG5cdFx0J2tleVBhdGgnOiB2YWx1ZSxcblx0XHQna2V5LnN1YlBhdGgnOiB2YWx1ZTIsXG5cdFx0J2tleVBhdGguMC50aXRsZSc6IHZhbHVlM1xuXHR9XG5cdDwtIG9rLCB3aXRoIGJ1bmNoIG9mIG9uQ2hhbmdlIGV2ZW50cyB0cmlnZ2VyZWRcblx0Ki9cblx0c2V0QXR0cnMob2JqZWN0UGFydCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBpbiBvYmplY3RQYXJ0KSB7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMgb25lIHRvIGdvJywgcGF0aCk7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cihwYXRoLCBvYmplY3RQYXJ0W3BhdGhdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aFRvS2V5J1xuXHQ8LSB2YWx1ZTFcblxuXHQqL1xuXHRnZXRBdHRyKHdoYXQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ2dldEF0dHInLCB3aGF0KTtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQod2hhdCwgdGhpc1tNRVRBX1BST1hZXSwge30pO1xuXHR9XG5cblx0Lypcblx0LT4gWydwYXRoVG9LZXknLCAncGF0aC50by5rZXknLCAnc2ltcGxlS2V5JywuLi5dXG5cdDwtIFt2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzLC4uLl1cblx0Ki9cblx0Z2V0QXR0cnMod2hhdCkge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAod2hhdCAmJiB3aGF0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggb2Ygd2hhdCkge1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLmdldEF0dHIocGF0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0aWYgKHRoaXNbTUVUQV9JTlRFUkZBQ0VdKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ubWFuaWZlc3Q7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdGhhbmRsZXIgZm9yIFByb3h5IGNhbGxiYWNrc1xuXHQqL1xuXG5cdFtNRVRBX0NIQU5HRV0oKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCd0cnkgdG8gY2hhbmdlJywgLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdFtNRVRBX0NIQU5HRV9ORVNURURdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZSBuZXN0ZWQnLCAuLi5hcmd1bWVudHMpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0aGlzW01FVEFfUFJPWFldLCBub3RQYXRoLmpvaW4oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pLCBhcmd1bWVudHNbM10pO1xuXHR9XG5cblx0c2V0SXRlbShpdGVtKSB7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub2ZmKCdjaGFuZ2UnKTtcblx0XHR0aGlzLm9mZignY2hhbmdlLm5lc3RlZCcpO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24udHJhY2UoKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdHNldEZpbmRCeSgpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRGaW5kQnkoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0U29ydGVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFNvcnRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0UGFnZU51bWJlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0UGFnZVNpemUoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldFBhZ2VyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlc2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRNb2RlbE5hbWUoLi4uYXJndW1lbnRzKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlY29yZDtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9yZWNvcmQnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG5cbmNvbnN0IE9QVF9DT05UUk9MTEVSX1BSRUZJWCA9ICduYycsXG5cdE9QVF9SRUNPUkRfUFJFRklYID0gJ25yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QXBwIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcih7XG5cdFx0XHRvcHRpb25zXG5cdFx0fSk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgYXBwJyk7XG5cdFx0bm90Q29tbW9uLnJlZ2lzdGVyKCdhcHAnLCB0aGlzKTtcblx0XHR0aGlzLnJlc291cmNlcyA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRpbnRlcmZhY2VzOiB7fSxcblx0XHRcdGNvbnRyb2xsZXJzOiB7fSxcblx0XHRcdGluaXRDb250cm9sbGVyOiBudWxsLFxuXHRcdFx0Y3VycmVudENvbnRyb2xsZXI6IG51bGxcblx0XHR9KTtcblx0XHR0aGlzLnByZUluaXRSb3V0ZXIoKTtcblx0XHR0aGlzLmluaXRNYW5hZ2VyKCk7XG5cdFx0dGhpcy5pbml0QVBJKCk7XG5cdFx0dGhpcy5pbml0VGVtcGxhdGVzKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0TWFuYWdlcigpIHtcblx0XHRub3RDb21tb24uc2V0TWFuYWdlcih7XG5cdFx0XHRzZXRBUEkodikge1xuXHRcdFx0XHR0aGlzLmFwaSA9IHY7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0QVBJKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcGk7XG5cdFx0XHR9LFxuXHRcdH0pO1xuXHR9XG5cblx0aW5pdEFQSSgpIHtcblx0XHRub3RDb21tb24uZ2V0TWFuYWdlcigpLnNldEFQSShuZXcgbm90QVBJKHRoaXMuZ2V0T3B0aW9ucygnYXBpJykgfHwge30pKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZXMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykpIHtcblx0XHRcdGxldCBwcm9tID0gbnVsbDtcblx0XHRcdGZvciAobGV0IHQgaW4gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSkge1xuXHRcdFx0XHRpZiAodCAmJiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpLmhhc093blByb3BlcnR5KHQpKSB7XG5cdFx0XHRcdFx0bGV0IHVybCA9IHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJylbdF07XG5cdFx0XHRcdFx0aWYgKHByb20pIHtcblx0XHRcdFx0XHRcdHByb20udGhlbihub3RUZW1wbGF0ZUNhY2hlLmFkZExpYkZyb21VUkwuYmluZChub3RUZW1wbGF0ZUNhY2hlLCB1cmwpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cHJvbSA9IG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTCh1cmwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHByb20pIHtcblx0XHRcdFx0cHJvbS50aGVuKHRoaXMuaW5pdE1hbmlmZXN0LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KCdubyB0ZW1wbGF0ZXMgbGliJywgZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRNYW5pZmVzdCgpIHtcblx0XHR2YXIgdXJsID0gdGhpcy5nZXRPcHRpb25zKCdtYW5pZmVzdFVSTCcpO1xuXHRcdG5vdENvbW1vbi5nZXRKU09OKHVybCwge30pXG5cdFx0XHQudGhlbih0aGlzLnNldEludGVyZmFjZU1hbmlmZXN0LmJpbmQodGhpcykpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdHByZUluaXRSb3V0ZXIoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb3V0ZXInLCBub3RSb3V0ZXIpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuc2V0Um9vdCh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5yb290JykpO1xuXHRcdG5vdFJvdXRlci5yZVJvdXRlRXhpc3RlZCgpO1xuXHR9XG5cblx0aW5pdFJvdXRlcigpIHtcblx0XHR2YXIgcm91dGllSW5wdXQgPSB7fTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLm1hbmlmZXN0JykubGVuZ3RoOyB0KyspIHtcblx0XHRcdGxldCByb3V0ZUJsb2NrID0gdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKVt0XSxcblx0XHRcdFx0cGF0aHMgPSByb3V0ZUJsb2NrLnBhdGhzLFxuXHRcdFx0XHRjb250cm9sbGVyID0gcm91dGVCbG9jay5jb250cm9sbGVyO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRyb3V0aWVJbnB1dFtwYXRoc1tpXV0gPSB0aGlzLmJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcicpLmFkZExpc3Qocm91dGllSW5wdXQpLmxpc3RlbigpOyAvLy5uYXZpZ2F0ZSh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5pbmRleCcpKTtcblx0fVxuXG5cdHNldEludGVyZmFjZU1hbmlmZXN0KG1hbmlmZXN0KSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcsIG1hbmlmZXN0KTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlTWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHQvL9C90YPQttC90L4g0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNGC0Yxcblx0XHQvL9C80L7QtNC10LvQuCDQv9C+0LvRg9GH0LXQvdC90YvQvNC4INC40L3RgtC10YDRhNC10LnRgdCw0LzQuFxuXHRcdHRoaXMudXBkYXRlSW50ZXJmYWNlcygpO1xuXHRcdC8v0LjQvdC40YbQuNC70LjRhtC40YDQvtCy0LDRgtGMINC4INC30LDQv9GD0YHRgtC40YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHRcdHRoaXMuaW5pdENvbnRyb2xsZXIoKTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhcnRBcHAoKSB7XG5cdFx0Ly/RgdC+0LfQtNCw0YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0Ly/RgNC+0YPRgtC10YAg0Lgg0L/RgNC40LLRj9C30LDRgtGMINC6INC90LXQvNGDINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHR0aGlzLmluaXRSb3V0ZXIoKTtcblx0fVxuXG5cdGJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0bGV0IGFwcCA9IHRoaXM7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5ldyBjb250cm9sbGVyTmFtZShhcHAsIGFyZ3VtZW50cyk7XG5cdFx0fTtcblx0fVxuXG5cdGluaXRDb250cm9sbGVyKCkge1xuXHRcdGlmICh0eXBlb2YgKHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRsZXQgaW5pdENvbnRyb2xsZXIgPSB0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJyk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJywgbmV3IGluaXRDb250cm9sbGVyKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50Q29udHJvbGxlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicpO1xuXHR9XG5cblx0c2V0Q3VycmVudENvbnRyb2xsZXIoY3RybCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInLCBjdHJsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHVwZGF0ZUludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5jbGVhckludGVyZmFjZXMoKTtcblx0XHRsZXQgbWFuaWZlc3RzID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHRcdGlmIChtYW5pZmVzdHMpIHtcblx0XHRcdGZvciAobGV0IG5hbWUgaW4gbWFuaWZlc3RzKSB7XG5cdFx0XHRcdGxldCByZWNvcmRNYW5pZmVzdCA9IG1hbmlmZXN0c1tuYW1lXTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbbmFtZV0gPSAocmVjb3JkRGF0YSkgPT4gbmV3IG5vdFJlY29yZChyZWNvcmRNYW5pZmVzdCwgcmVjb3JkRGF0YSk7XG5cdFx0XHRcdHdpbmRvd1snbnInICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKV0gPSB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRSZWNvcmROYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX1JFQ09SRF9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0Z2V0Q29udHJvbGxlck5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfQ09OVFJPTExFUl9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlcygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJyk7XG5cdH1cblxuXHRjbGVhckludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcmZhY2VzJywge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0d2FpdFRoaXNSZXNvdXJjZSh0eXBlLCBpbmRleCkge1xuXHRcdGlmICghdGhpcy5yZXNvdXJjZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcblx0XHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdID0ge307XG5cdFx0fVxuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IGZhbHNlO1xuXHRcdHJldHVybiB0aGlzLm9uUmVzb3VyY2VSZWFkeS5iaW5kKHRoaXMsIHR5cGUsIGluZGV4KTtcblx0fVxuXG5cdG9uUmVzb3VyY2VSZWFkeSh0eXBlLCBpbmRleCkge1xuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IHRydWU7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdGFsbFJlc291cmNlc1JlYWR5KCkge1xuXHRcdHZhciBpLCBqO1xuXHRcdGZvciAoaSBpbiB0aGlzLnJlc291cmNlcykge1xuXHRcdFx0Zm9yIChqIGluIHRoaXMucmVzb3VyY2VzW2ldKSB7XG5cdFx0XHRcdGlmICghdGhpcy5yZXNvdXJjZXNbaV1bal0pIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5cbmNvbnN0IE1FVEFfUFJPQ0VTU09SUyA9IFN5bWJvbCgncHJvY2Vzc29ycycpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQcm9jZXNzb3IoLyoga2V5LCB2YWx1ZSAqLyl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UHJvY2Vzc29yKC8qIGtleSwgIGRlZmF1bHRWYWx1ZSAqLyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyUHJvY2Vzc29ycygpe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkKCl7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuXHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gYXJndW1lbnRzWzBdKXtcblx0XHRcdFx0XHR0aGlzLnNldFByb2Nlc3Nvcih0LCBhcmd1bWVudHNbMF1bdF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0UHJvY2Vzc29yKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhcigpe1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVQcm9jZXNzb3JzKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7XG5cbi8qXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgiBET00g0L/QvtC00LTQtdGA0LXQstC+INCyINC60LDRh9C10YHRgtCy0LUg0YjQsNCx0LvQvtC90LAuXG4gKiDQl9Cw0L/QvtC70L3Rj9C10YIg0LXQs9C+INC00LDQvdC90YvQvNC4LlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YHQs9C10L3QtdGA0LjRgNC+0LLQsNC90L3Ri9C1INGN0LvQtdC80LXQvdGC0YtcbiAqXG4gKiAqL1xuXG4vKlxuXG5cdDxkaXYgbi10ZW1wbGF0ZS1uYW1lPVwidmFzeWFcIj5cblx0XHQ8cD48aW5wdXQgdHlwZT1cInRleHRcIiBuLXZhbHVlPVwiOmNvb2xOYW1lXCIvPjwvcD5cblx0XHQ8cD7QkdC+0YDQuNGBINGF0YDQtdC9INC/0L7Qv9Cw0LTQtdGI0Ywg0Lgge3s6Y29vbE5hbWV9fS48L3A+XG5cdDwvZGl2PlxuXG4gKi9cblxuY29uc3QgTUVUQV9DT01QT05FTlRTID0gU3ltYm9sKCdjb21wb25lbnRzJyk7XG5cbmNsYXNzIG5vdFJlbmRlcmVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdC8qXG5cdFx0aW5wdXQgPSB7XG5cdFx0XHRkYXRhOiBub3RSZWNvcmQsXG5cdFx0XHR0ZW1wbGF0ZTogZWxlbWVudFxuXHRcdFx0b3B0aW9uczp7XG5cdFx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHQqL1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU10gPSB7fTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMuY29tcG9uZW50ID0gaW5wdXQuY29tcG9uZW50O1xuXHRcdHRoaXMuaW5pdERhdGEoaW5wdXQuZGF0YSA/IGlucHV0LmRhdGEgOiB7fSk7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0LnRlbXBsYXRlKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZSgpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndGVtcGxhdGUnLCB0aGlzLmdldFdvcmtpbmcoJ2dldFRlbXBsYXRlJykoKSk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuZ2V0RGF0YSgpLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHR9XG5cblx0aW5pdFdvcmtpbmcodGVtcGxhdGUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0Z2V0VGVtcGxhdGU6IHRlbXBsYXRlLFxuXHRcdFx0cGFydElkOiB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpID8gdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA6IE9QVFMuUEFSVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKSB7XG5cdFx0aWYgKHRoaXMuY29tcG9uZW50KSB7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMuY29tcG9uZW50LmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyU3Rhc2goKTtcblx0XHR0aGlzLnNldFdvcmtpbmdNYXBwaW5nKCk7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0dGhpcy5zZWFyY2hGb3JTdWJUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnN0YXNoUmVuZGVyZWQoKTtcblx0fVxuXG5cdG9uQ2hhbmdlKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0dGhpcy51cGRhdGUoa2V5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ29ic29sZXRlJywgcHJveHksIGtleSwgdmFsdWUpO1xuXHR9XG5cblx0dXBkYXRlKGtleSkge1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdGZvciAobGV0IHQgaW4gdGhpc1tNRVRBX0NPTVBPTkVOVFNdKSB7XG5cdFx0XHRsZXQgaXRlbSA9IHRoaXNbTUVUQV9DT01QT05FTlRTXVt0XSxcblx0XHRcdFx0aWZQYXJ0ID0gdHJ1ZTtcblx0XHRcdGlmIChrZXkpIHtcblx0XHRcdFx0aWYgKGl0ZW0uZ2V0T3B0aW9ucygnZGF0YVBhdGgnKSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCBjb21wb25lbnRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGl0ZW0uZ2V0T3B0aW9ucygnZGF0YVBhdGgnKSksXG5cdFx0XHRcdFx0Y2hhbmdlZFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoa2V5KTtcblx0XHRcdFx0aWZQYXJ0ID0gbm90UGF0aC5pZkZ1bGxTdWJQYXRoKGNoYW5nZWRQYXRoLCBjb21wb25lbnRQYXRoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlmUGFydCkge1xuXHRcdFx0XHRpdGVtLnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldFdvcmtpbmdNYXBwaW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbWFwcGluZycsIHRoaXMuY3JlYXRlTWFwcGluZygpKTtcblx0fVxuXG5cdC8qXG5cblx00KHQvtC30LTQsNC10Lwg0LrQsNGA0YLRiyDRgdC+0L7RgtCy0LXRgdGC0LLQuNGPINC/0YDQvtGG0LXRgdGB0L7RgNC+0LIsINC/0YPRgtC10Lkg0LTQsNC90L3Ri9GFINCyINC+0LHRitC10LrRgtC1INC4INGN0LvQtdC80LXQvdGC0L7QsiDRiNCw0LHQu9C+0L3QsC5cblx0W3tcblx0XHRlbCxcblx0XHRwcm9jZXNzb3IsXG5cdFx0d29ya2luZyxcblx0XHRpdGVtLnByb3BlcnR5LnBhdGhcblx0fV1cblxuXHQqL1xuXG5cdGNyZWF0ZU1hcHBpbmcoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZmluZEFsbFByb2Nlc3NvcnMoKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZmluZEFsbFByb2Nlc3NvcnMoKSB7XG5cdFx0bGV0IHByb2NzID0gW10sXG5cdFx0XHRlbHMgPSBub3RDb21tb24uZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgodGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGVscy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGF0dHMgPSBlbHNbal0uYXR0cmlidXRlcywgbiA9IGF0dHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRzW2ldLm5vZGVOYW1lLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpID09PSAwKSB7XG5cdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGF0dHNbaV0pO1xuXHRcdFx0XHRcdGxldCBwcm9jRGF0YSA9IHRoaXMucGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKGF0dHNbaV0ubm9kZU5hbWUpO1xuXHRcdFx0XHRcdHByb2NEYXRhLmVsZW1lbnQgPSBlbHNbal07XG5cdFx0XHRcdFx0cHJvY0RhdGEucHJvY2Vzc29yRXhwcmVzc2lvbiA9IGF0dHNbaV0ubm9kZU5hbWU7XG5cdFx0XHRcdFx0cHJvY0RhdGEuYXR0cmlidXRlRXhwcmVzc2lvbiA9IGF0dHNbaV0udmFsdWU7XG5cdFx0XHRcdFx0cHJvY3MucHVzaChwcm9jRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHByb2NzO1xuXHR9XG5cblx0cGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKHByb2Nlc3NvckV4cHJlc3Npb24pIHtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0cGFyYW1zOiBbXSxcblx0XHRcdHByb2Nlc3Nvck5hbWU6ICcnLFxuXHRcdFx0aWZDb25kaXRpb246IGZhbHNlXG5cdFx0fTtcblx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLCAnJyk7XG5cdFx0aWYgKHByb2Nlc3NvckV4cHJlc3Npb24uaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYKSA9PT0gKHByb2Nlc3NvckV4cHJlc3Npb24ubGVuZ3RoIC0gT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWC5sZW5ndGgpKSB7XG5cdFx0XHRyZXN1bHQuaWZDb25kaXRpb24gPSB0cnVlO1xuXHRcdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiArIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsICcnKTtcblx0XHR9XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHByb2Nlc3NvckV4cHJlc3Npb24uc3BsaXQoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IpO1xuXHRcdHJlc3VsdC5wcm9jZXNzb3JOYW1lID0gcmVzdWx0LnBhcmFtc1swXTtcblx0XHRyZXN1bHQucGFyYW1zID0gcmVzdWx0LnBhcmFtcy5zbGljZSgxKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZXhlY1Byb2Nlc3NvcnMoaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbWFwcGluZyA9IHRoaXMuZ2V0V29ya2luZygnbWFwcGluZycpO1xuXHRcdGlmIChtYXBwaW5nKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBpbmcubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IHByb2NTY29wZSA9IG1hcHBpbmdbaV07XG5cdFx0XHRcdHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocHJvY1Njb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGluZGV4KTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdhdHRyaWJ1dGVSZXN1bHQnLCBwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0XHRcdFx0bGV0IHByb2NOYW1lID0gcHJvY1Njb3BlLnByb2Nlc3Nvck5hbWUsXG5cdFx0XHRcdFx0cHJvYyA9IG5vdFRlbXBsYXRlUHJvY2Vzc29ycy5nZXQocHJvY05hbWUpO1xuXHRcdFx0XHRpZiAocHJvYykge1xuXHRcdFx0XHRcdHByb2MocHJvY1Njb3BlLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHRcdFx0XHRcdHByb2NTY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9jU2NvcGUucHJvY2Vzc29yRXhwcmVzc2lvbik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyBwcm9jZXNzb3IgbGlrZScsIHByb2NOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ3JlbmRlcmVkJyk7XG5cdH1cblxuXHRnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHBhdGgsIGl0ZW0pIHtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQocGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0fVxuXG5cdGNsZWFyU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuZGVzdHJveVN1YnMoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N1YnMnLCBbXSk7XG5cdH1cblxuXHRkZXN0cm95U3VicygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdFx0dC5kZXN0cm95KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFN0YXNoKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdGxldCBlbCA9IHRoaXMuZ2V0U3Rhc2goKVt0XTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlKSB7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmU3ViRWxlbWVudFJlbmRlcmVkKG50RWwpIHtcblx0XHRyZXR1cm4gbnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQgJiYgKG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkLnZhbHVlID09PSAndHJ1ZScpO1xuXHR9XG5cblx0c2VhcmNoRm9yU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRsZXQgc3VicyA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3JBbGwoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc3ViIHRlbXBsYXRlcycsIHN1YnMpO1xuXHRcdGZvciAobGV0IG50ID0gMDsgbnQgPCBzdWJzLmxlbmd0aDsgbnQrKykge1xuXHRcdFx0aWYgKCF0aGlzLmlmU3ViRWxlbWVudFJlbmRlcmVkKHN1YnNbbnRdKSkge1xuXHRcdFx0XHR0aGlzLnJlbmRlclN1YihzdWJzW250XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWRkU3ViKG50RWwpIHtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKS5wdXNoKHtcblx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0cGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6ICcnLFxuXHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUuc3JjIDogJycsXG5cdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHRcdHJlbmRlcmVkTGlzdDogW10sXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJTdWIobnRFbCkge1xuXHRcdGlmICghbnRFbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRsZXQgZGV0YWlscyA9IHtcblx0XHRcdFx0ZGF0YVBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiBudWxsLFxuXHRcdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5zcmMudmFsdWUgOiAnJyxcblx0XHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKClcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHRkYXRhOiBkZXRhaWxzLmRhdGFQYXRoICE9PSBudWxsID8gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KGRldGFpbHMuZGF0YVBhdGgsIHRoaXMuZ2V0RGF0YSgpKSA6IG51bGwsXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHNyYzogZGV0YWlscy5zcmNcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSxcblx0XHRcdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VBZnRlcicsXG5cdFx0XHRcdFx0aWQ6IGRldGFpbHMuaWQsXG5cdFx0XHRcdFx0bnRFbDogbnRFbCxcblx0XHRcdFx0XHRkYXRhUGF0aDogZGV0YWlscy5kYXRhUGF0aFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvd25lcjogdGhpc1xuXHRcdFx0fTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnaWQnLCBkZXRhaWxzLmlkKTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU11bZGV0YWlscy5pZF0gPSBuZXcgbm90Q29tcG9uZW50KG9wdGlvbnMpO1xuXHR9XG5cblx0Y2xlYXJTdGFzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgW10pO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZScpO1xuXHR9XG5cblx0Z2V0U3Rhc2goKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc3Rhc2gnKTtcblx0fVxuXG5cdHN0YXNoUmVuZGVyZWQoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMuYWRkVG9TdGFzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHR9XG5cblx0cmVwbGFjZVJlbmRlcmVkKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygncmVwbGFjZSBzdGFzaCcpO1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSxcblx0XHRcdHN0YXNoID0gdGhpcy5nZXRTdGFzaCgpLFxuXHRcdFx0bmV3U3Rhc2ggPSBbXSxcblx0XHRcdGFuY2hvciA9IHN0YXNoLmxlbmd0aCA+IDAgPyBzdGFzaFswXSA6IHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLFxuXHRcdFx0cGFyZW50Tm9kZSA9IGFuY2hvci5wYXJlbnROb2RlO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdG5ld1N0YXNoLnB1c2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IG5ld1N0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRpZiAoYW5jaG9yLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTdGFzaFt0XSwgYW5jaG9yLm5leHRTaWJsaW5nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld1N0YXNoW3RdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBzdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdGFzaFt0XSk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBuZXdTdGFzaCk7XG5cdH1cblxuXHRhZGRUb1N0YXNoKG5vZGUpIHtcblx0XHR0aGlzLmdldFN0YXNoKCkucHVzaChub2RlKTtcblx0fVxuXG5cdGlzRGF0YShkYXRhID0ge30pIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkgPT09IGRhdGE7XG5cdH1cblxuXHRoaWRlKCkge1xuXG5cdH1cblxuXHRzaG93KCkge1xuXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVuZGVyZXI7XG4iLCJjb25zdCBwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XG5cdFx0bGV0IGwgPSAwO1xuXHRcdHdoaWxlICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGggLSBsKSB7XG5cdFx0XHRpZiAodGFyZ2V0RWwuY2hpbGRyZW5bMF0ubm9kZU5hbWUgPT09ICdOVCcpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdudCBmb3VuZGVkJyk7XG5cdFx0XHRcdGwrKztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdyZW1vdmUgY2hpbGQgJyx0YXJnZXRFbC5jaGlsZHJlbltsXSk7XG5cdFx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGFyZ2V0RWwudGV4dENvbnRlbnQgPSAnJztcblx0fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBjaGlsZCAnLCByZW5kZXJlZFtpXSk7XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge31cbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZTtcbiIsImNvbnN0IHBsYWNlQWZ0ZXIgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUFmdGVyO1xuIiwiY29uc3QgcGxhY2VCZWZvcmUgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbCk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUJlZm9yZTtcbiIsImNvbnN0IHBsYWNlRmlyc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSByZW5kZXJlZC5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygncGxhY2UgZmlyc3QnLCBpLCByZW5kZXJlZFtpXSk7XG5cdFx0XHRpZiAodGFyZ2V0RWwuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGJlZm9yZSBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLmNoaWxkcmVuWzBdKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgYXMgZmlyc3QnKTtcblx0XHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlRmlyc3Q7XG4iLCJjb25zdCBwbGFjZUxhc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlTGFzdDtcbiIsImNvbnN0IHJlcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGJlZm9yZUVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1x0XHRcblx0XHRpZiAodGFyZ2V0RWwubm9kZU5hbWUgIT09ICdOVCcpe1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YXJnZXRFbCk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlO1xuIiwiaW1wb3J0IHBsYWNlIGZyb20gJy4vcGxhY2UnO1xuaW1wb3J0IHBsYWNlQWZ0ZXIgZnJvbSAnLi9wbGFjZUFmdGVyJztcbmltcG9ydCBwbGFjZUJlZm9yZSBmcm9tICcuL3BsYWNlQmVmb3JlJztcbmltcG9ydCBwbGFjZUZpcnN0IGZyb20gJy4vcGxhY2VGaXJzdCc7XG5pbXBvcnQgcGxhY2VMYXN0IGZyb20gJy4vcGxhY2VMYXN0JztcbmltcG9ydCByZXBsYWNlIGZyb20gJy4vcmVwbGFjZSc7XG5cbmNvbnN0IG5vdFBsYWNlcnMgPSB7XG5cdHBsYWNlOiBwbGFjZSxcblx0cGxhY2VBZnRlcjogcGxhY2VBZnRlcixcblx0cGxhY2VCZWZvcmU6IHBsYWNlQmVmb3JlLFxuXHRwbGFjZUZpcnN0OiBwbGFjZUZpcnN0LFxuXHRwbGFjZUxhc3Q6IHBsYWNlTGFzdCxcblx0cmVwbGFjZTogcmVwbGFjZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90UGxhY2VycztcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi9ub3RSZW5kZXJlcic7XG5pbXBvcnQgbm90UGxhY2VycyBmcm9tICcuL3BsYWNlcnMnO1xuXG5jb25zdCBNRVRBX1BBUlRTID0gU3ltYm9sKCdwYXJ0cycpO1xuLypcblx0aW5wdXQgPSB7XG5cdFx0ZGF0YTogbm90UmVjb3JkIG9yIFtub3RSZWNvcmRdLFxuXHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRodG1sOiBodG1sKHN0cmluZyksIFx0XHQvL9GC0LXQutGB0YIg0YEgaHRtbCDQutC+0LTQvtC8INGI0LDQsdC70L7QvdCwXG5cdFx0XHRlbDogSFRNTEVsZW1lbnQob2JqZWN0KSwgXHQvL0RPTSDRjdC70LXQvNC10L3RglxuXHRcdFx0c3JjOiBzcmMoc3RyaW5nKSxcdFx0XHQvL9GB0YHRi9C70LrQsCDQvdCwINGE0LDQudC7INGBINGI0LDQsdC70L7QvdC+0Lxcblx0XHRcdG5hbWU6IG5hbWUoc3RyaW5nKVx0XHRcdC8v0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCDQtNC70Y8g0L/QvtC40YHQutCwINCyINC60Y3RiNC1IG5vdFRlbXBsYXRlQ2FjaGVcblx0XHR9XG5cdFx0b3B0aW9uczp7XG5cdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHQvL9CwINGN0YLQviDQutCw0Log0LHRg9C00LXQvCDQv9C+0LzQtdGJ0LDRgtGMINGA0LXQt9GD0LvRjNGC0LDRgiDRgNC10L3QtNC10YDQuNC90LPQsFxuXHRcdFx0cmVuZGVyQW5kOiBwbGFjZVN0eWxlKHN0cmluZykg0L7QtNC40L0g0LjQtyDQstCw0YDQuNCw0L3RgtC+0LJcblx0XHRcdFx0XHRwbGFjZVx0XHQtXHTQv9C+0LzQtdGJ0LDQtdC8INCy0L3Rg9GC0YDQuCDRhtC10LvQtdCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0XHRyZXBsYWNlXHRcdC1cdNC30LDQvNC10L3Rj9C10Lxcblx0XHRcdFx0XHRwbGFjZUFmdGVyXHQtXHTQv9C+0YHQu9C1XG5cdFx0XHRcdFx0cGxhY2VCZWZvcmVcdC1cdNC00L5cblx0XHRcdFx0XHRwbGFjZUZpcnN0XHQtXHTQstC90YPRgtGA0Lgg0L/QtdGA0LLRi9C8INC00L7Rh9C10YDQvdC40Lxcblx0XHRcdFx0XHRwbGFjZUxhc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C+0YHQu9C10LTQvdC40Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdH1cblx0fVxuKi9cbmNsYXNzIG5vdENvbXBvbmVudCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpe1xuXHRcdGlmICh0aGlzLm93bmVyKXtcblx0XHRcdHJldHVybiBbLi4udGhpcy5vd25lci5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1cblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5vd25lciA9IGlucHV0Lm93bmVyP2lucHV0Lm93bmVyOm51bGw7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0RXZlbnRzKGxpc3Qpe1xuXHRcdGZvcihsZXQgdCBvZiBsaXN0KXtcblx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2lkJykpe1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdpZCcsIE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKXtcblx0XHRcdHRoaXMuaW5pdE1hcmtFbGVtZW50KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hcmtFbGVtZW50KCl7XG5cdFx0bGV0IG1hcmtFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ250Jyk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdudEVsJywgbWFya0VsKTtcblx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSksXG5cdFx0XHR0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZiAodGFyZ2V0UXVlcnkpe1xuXHRcdFx0bGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0UXVlcnkpO1xuXHRcdFx0aWYgKHRhcmdldCl7XG5cdFx0XHRcdHRoaXMuc2V0T3B0aW9ucygndGFyZ2V0RWwnLCB0YXJnZXQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKXtcblx0XHRcdHRocm93ICdObyB0YXJnZXQgdG8gcGxhY2UgcmVuZGVyZWQnO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyLm1haW4odGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLCBbbWFya0VsXSk7XG5cdFx0fVxuXG5cdH1cblxuXHRpbml0V29ya2luZyh2YWwpIHtcblx0XHR0aGlzLnVuc2V0UmVhZHkodmFsKTtcblx0fVxuXG5cdHByZXBhcmVUZW1wbGF0ZUVsZW1lbnQodmFsKSB7XG5cdFx0aWYgKCF2YWwpIHtcblx0XHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdodG1sJykgJiYgdmFsLmh0bWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQodmFsLmVsLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZhbC5zcmMpIHtcblx0XHRcdG5vdFRlbXBsYXRlQ2FjaGUuYWRkRnJvbVVSTCh2YWwuc3JjLCB2YWwuc3JjKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpICYmIHZhbC5uYW1lKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUuZ2V0KHZhbC5uYW1lKSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JywgY29udCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRyZXNldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50JywgdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpLmNsb25lTm9kZSh0cnVlKSk7XG5cdH1cblxuXHRzZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdHJ1ZSk7XG5cdH1cblxuXHR1bnNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCBmYWxzZSk7XG5cdH1cblxuXHRpc1JlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3JlYWR5Jyk7XG5cdH1cblxuXHRjbGVhclBhcnRzKCkge1xuXHRcdC8qINC40LfQstC10YnQsNC10Lwg0L7QsSDRg9C00LDQu9C10L3QuNC4INGN0LvQtdC80LXQvdGC0L7QsiAqL1xuXHRcdGlmICh0aGlzW01FVEFfUEFSVFNdICYmIEFycmF5LmlzQXJyYXkodGhpc1tNRVRBX1BBUlRTXSkgJiYgdGhpc1tNRVRBX1BBUlRTXS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpc1tNRVRBX1BBUlRTXSkge1xuXHRcdFx0XHRpZiAodC5kZXN0cm95KXtcblx0XHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdudEVsJykgJiYgdGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZSl7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKTtcblx0XHR9XG5cdFx0dGhpcy5kZWFkID0gdHJ1ZTtcblx0XHR0aGlzLm9mZkFsbCgpO1xuXHR9XG5cblx0cmVzZXRQYXJ0cygpIHtcblx0XHR0aGlzW01FVEFfUEFSVFNdID0gW107XG5cdH1cblxuXHRnZXRQYXJ0cygpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BBUlRTXTtcblx0fVxuXG5cdGFkZFBhcnQodGVtcGxhdGUpIHtcblx0XHR0aGlzW01FVEFfUEFSVFNdLnB1c2godGVtcGxhdGUpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2xlYXJQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMucmVtb3ZlT2Jzb2xldGVQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJVcGRhdGUnKTtcblx0fVxuXG5cdHBsYWNlUmVuZGVyZWQoKXtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKSB7XG5cdFx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0XHRwbGFjZXIuYmVmb3JlKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSk7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucGxhY2VQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0cGxhY2VyLmFmdGVyKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gdGFyZ2V0IGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRwbGFjZVBhcnQoZGF0YSwgaW5kZXgpe1xuXHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpLFxuXHRcdFx0bm9kZXMgPSBwYXJ0JiZwYXJ0LmdldFN0YXNoP3BhcnQuZ2V0U3Rhc2goKTpbXSxcblx0XHRcdHRhcmdldEVsLFxuXHRcdFx0bGFzdE5vZGUsXG5cdFx0XHRwbGFjZXI7XG5cdFx0aWYgKGluZGV4ID09PSAwKXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcihPUFRTLkRFRkFVTFRfUExBQ0VSX0xPT1ApO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJyk7XG5cdFx0fVxuXHRcdHBsYWNlci5tYWluKHRhcmdldEVsLCBub2Rlcyk7XG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRnZXRQbGFjZXIobWV0aG9kKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZWFyY2hpbmcgZm9yIHBsYWNlcicsIG1ldGhvZCk7XG5cdFx0aWYgKG5vdFBsYWNlcnMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbbWV0aG9kXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbT1BUUy5ERUZBVUxUX1BMQUNFUl07XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaERhdGEoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldERhdGEoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaFBhcnQoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0UGFydHMoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXRQYXJ0cygpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdNC10YHQu9C4INGBINC00LDQvdC90YvQvNC4INC90LUg0YHQstGP0LfQsNC9INGA0LXQvdC00LXRgNC10YAgLSDRgdC+0LfQtNCw0LXQvFxuXHQqL1xuXG5cdHJlbmRlclBhcnQoZGF0YSkge1xuXHRcdGlmICghdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ2NyZWF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHRsZXQgcmVuZGVyZXIgPSBuZXcgbm90UmVuZGVyZXIoe1xuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0ZW1wbGF0ZTogdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lLmJpbmQodGhpcyksXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpLFxuXHRcdFx0XHRjb21wb25lbnQ6IHRoaXNcblx0XHRcdH0pO1xuXHRcdFx0Ly9yZW5kZXJlci5vbignb2Jzb2xldGUnLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkUGFydChyZW5kZXJlcik7XG5cdFx0fWVsc2V7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHR0aGlzLnVwZGF0ZVBhcnQodGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVQYXJ0KHBhcnQpe1xuXHRcdHBhcnQudXBkYXRlKCk7XG5cdH1cblxuXHRyZW1vdmVPYnNvbGV0ZVBhcnRzKCkge1xuXHRcdC8v0LrQvtC90LLQtdC10YAg0L/QvtC40YHQuiDQsNC60YLRg9Cw0LvRjNC90YvRhSAtINGD0LTQsNC70LXQvdC40LUg0L7RgdGC0LDQu9GM0L3Ri9GFXG5cdFx0bm90Q29tbW9uLnBpcGUoXG5cdFx0XHR1bmRlZmluZWQsIC8vIHBhcnRzIHRvIHNlYXJjaCBpbiwgY2FuIGJlICd1bmRlZmluZWQnXG5cdFx0XHRbXG5cdFx0XHRcdHRoaXMuZmluZEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vZmlyc3Qgcm91bmQsIHNlYXJjaCBmb3Igb2Jzb2xldGVcblx0XHRcdFx0dGhpcy5yZW1vdmVOb3RBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL3JlbW92ZSAnZW1cblx0XHRcdF1cblx0XHQpO1xuXHR9XG5cblx0Lypcblx0XHTQtdGB0YLRjCDQtNCw0L3QvdGL0LUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDQsNC60YLRg9Cw0LvRjNC90L4sXG5cdFx00L3QtdGCINC00LDQvdC90YvRhSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINGB0YLQsNGA0YzRkVxuXHQqL1xuXG5cdGZpbmRBY3R1YWxQYXJ0cygpIHtcblx0XHRsZXQgYWN0dWFsUGFydHMgPSBbXTtcblx0XHR0aGlzLmZvckVhY2hEYXRhKChkYXRhLyosIGluZGV4Ki8pPT57XG5cdFx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKTtcblx0XHRcdGlmIChwYXJ0KXtcblx0XHRcdFx0YWN0dWFsUGFydHMucHVzaChwYXJ0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gYWN0dWFsUGFydHM7XG5cdH1cblxuXHQvKlxuXHRcdNGD0LTQsNC70Y/QtdC8INCy0YHQtSDQutGA0L7QvNC1INCw0LrRgtGD0LDQu9GM0L3Ri9GFXG5cdCovXG5cdHJlbW92ZU5vdEFjdHVhbFBhcnRzKGFjdHVhbFBhcnRzKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmIChhY3R1YWxQYXJ0cy5pbmRleE9mKHRoaXMuZ2V0UGFydHMoKVt0XSkgPT09IC0xKXtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpW3RdLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpLnNwbGljZSh0LCAxKTtcblx0XHRcdFx0dC0tO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFBhcnRCeURhdGEoZGF0YSkge1xuXHRcdGZvciAobGV0IHQgaW4gdGhpcy5nZXRQYXJ0cygpKSB7XG5cdFx0XHRpZiAodGhpcy5nZXRQYXJ0cygpW3RdLmlzRGF0YShkYXRhKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRQYXJ0cygpW3RdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRzaG93KCl7XG5cblx0fVxuXG5cdGhpZGUoKXtcblxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbXBvbmVudDtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SID0gJy5wYWdlLWNvbnRlbnQnLFxuXHRPUFRfREVGQVVMVF9WSUVXU19QT1NURklYID0gJy5odG1sJyxcblx0T1BUX0RFRkFVTFRfVklFV19OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9SRU5ERVJfRlJPTV9VUkwgPSB0cnVlLFxuXHRPUFRfREVGQVVMVF9QTFVSQUxfTkFNRSA9ICdNb2RlbHMnLFxuXHRPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSA9ICdNb2RlbCcsXG5cdE9QVF9ERUZBVUxUX01PRFVMRV9OQU1FID0gJ21haW4nLFxuXHRPUFRfREVGQVVMVF9SRU5ERVJfQU5EID0gJ3BsYWNlJztcblxuY2xhc3Mgbm90Q29udHJvbGxlciBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihhcHApIHtcblx0XHRzdXBlcigpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGNvbnRyb2xsZXInKTtcblx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cmVhZHk6IGZhbHNlLFxuXHRcdFx0dmlld3M6IHt9LFxuXHRcdFx0bGliczp7fSxcblx0XHRcdHZpZXdOYW1lOiBPUFRfREVGQVVMVF9WSUVXX05BTUUsXG5cdFx0XHRoZWxwZXJzOiB7fVxuXHRcdH0pO1xuXHRcdHRoaXMuc2V0RGF0YSh7fSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHtcblx0XHRcdG1vZHVsZU5hbWU6IE9QVF9ERUZBVUxUX01PRFVMRV9OQU1FLFxuXHRcdFx0Y29udGFpbmVyU2VsZWN0b3I6IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUixcblx0XHRcdHByZWZpeDogdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMubW9kdWxlJyksXG5cdFx0XHRwb3N0Zml4OiBPUFRfREVGQVVMVF9WSUVXU19QT1NURklYLFxuXHRcdFx0cmVuZGVyRnJvbVVSTDogT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMLFxuXHRcdFx0bmFtZXM6e1xuXHRcdFx0XHRwbHVyYWw6T1BUX0RFRkFVTFRfUExVUkFMX05BTUUsXG5cdFx0XHRcdHNpbmdsZTogT1BUX0RFRkFVTFRfU0lOR0xFX05BTUVcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMuaW5pdFJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHQvKlxuXHRcdCAgICDRgdGA0LDQt9GDINC00LXQu9Cw0LXQvCDQtNC+0YHRgtGD0L/QvdGL0LzQuCDQvNC+0LTQtdC70Lggbm90UmVjb3JkINC40LcgbmNgQ29udHJvbGxlck5hbWVgINCx0YPQtNGD0YIg0LTQvtGB0YLRg9C/0L3RiyDQutCw0LogdGhpcy5ucmBNb2RlbE5hbWVgXG5cdFx0Ki9cblx0XHRsZXQgaW50ZXJmYWNlcyA9IHRoaXMuYXBwLmdldEludGVyZmFjZXMoKTtcblx0XHR0aGlzLm1ha2UgPSB7fTtcblx0XHRmb3IgKGxldCB0IGluIGludGVyZmFjZXMpIHtcblx0XHRcdGlmIChpbnRlcmZhY2VzLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0dGhpcy5tYWtlW3RdID0gaW50ZXJmYWNlc1t0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVuZGVyKCl7XG5cdFx0dGhpcy5yZW5kZXIodGhpcy5nZXRXb3JraW5nKCd2aWV3TmFtZScpLCB0aGlzLmdldERhdGEoKSwgdGhpcy5nZXRXb3JraW5nKCdoZWxwZXJzJykpO1xuXHR9XG5cblx0cmVuZGVyKHZpZXdOYW1lID0nZGVmYXVsdCcgLyogdmlldyBuYW1lICovLCBkYXRhID0ge30gLyogZGF0YSBmb3Igbm90VGVtcGxhdGUqLyAsIGhlbHBlcnMgPSB7fS8qIGNvdWxkIGJlIG5vdCByZXByZXNlbnRlZCAqLykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0dmFyIHZpZXcgPSB0aGlzLmdldFZpZXcodmlld05hbWUpO1xuXG5cdFx0XHRpZiAodHlwZW9mIHZpZXcgPT09ICd1bmRlZmluZWQnIHx8IHZpZXcgPT09IG51bGwpIHtcblx0XHRcdFx0cmVqZWN0KCdObyB2aWV3IGZvdW5kJywgdmlld05hbWUpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZpZXcgPSBub3RDb21tb24uZXh0ZW5kKHt9LCB2aWV3KTtcblx0XHRcdFx0Ly8g0LXRgdC70LggcGxhY2Ug0L3QtSDRg9C60LDQt9Cw0L3Qviwg0YfRgtC+INCy0L7Qt9C80L7QttC90L4g0Lgg0YDQsNC30YPQvNC90L4g0L/RgNC4INC90LUg0YHRg9GJ0LXRgdGC0LLQvtCy0LDQvdC40Lhcblx0XHRcdFx0Ly8g0Y3Qu9C10LzQtdC90YLQsCwg0L3QviDQuNC30LLQtdGB0YLQvdC+0Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YDQtVxuXHRcdFx0XHRpZiAoKCh0eXBlb2Ygdmlldy50YXJnZXRFbCA9PT0gJ3VuZGVmaW5lZCcpIHx8ICh2aWV3LnRhcmdldEVsID09PSBudWxsKSkgJiYgKHR5cGVvZiB2aWV3LnRhcmdldFF1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3LnRhcmdldFF1ZXJ5ICE9PSBudWxsICYmIHZpZXcudGFyZ2V0UXVlcnkubGVuZ3RoID4gMCkpIHtcblx0XHRcdFx0XHR2aWV3LnRhcmdldEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2aWV3LnRhcmdldFF1ZXJ5KTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2aWV3LmRhdGEgPSBkYXRhO1xuXHRcdFx0XHRpZiAodHlwZW9mIHZpZXcuaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5oZWxwZXJzICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHZpZXcuaGVscGVycykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZpZXcuaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQodmlldy5oZWxwZXJzLCBoZWxwZXJzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8v0LXRgdC70Lgg0L3Rg9C20L3QviDQt9Cw0LPRgNGD0LbQsNGC0Ywg0YjQsNCx0LvQvtC90Ytcblx0XHRcdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyRnJvbVVSTCcpKSB7XG5cdFx0XHRcdFx0Ly/QuCDQsNC00YDQtdGBINC90LUg0YPQutCw0LfQsNC9XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LnRlbXBsYXRlVVJMID09PSAndW5kZWZpbmVkJyB8fCB2aWV3LnRlbXBsYXRlVVJMID09IG51bGwgfHwgdmlldy50ZW1wbGF0ZVVSTC5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHRcdFx0bGV0IHByZWZpeCA9ICh2aWV3LmNvbW1vbiA/IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLmNvbW1vbicpOiB0aGlzLmdldE1vZHVsZVByZWZpeCgpKSxcblx0XHRcdFx0XHRcdFx0bmFtZSA9ICgodHlwZW9mIHZpZXcubmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5uYW1lICE9PSBudWxsICYmIHZpZXcubmFtZS5sZW5ndGggPiAwKSA/IHZpZXcubmFtZSA6IHZpZXdOYW1lKSxcblx0XHRcdFx0XHRcdFx0cG9zdGZpeCA9IHRoaXMuZ2V0T3B0aW9ucygncG9zdGZpeCcpO1xuXHRcdFx0XHRcdFx0Ly/Qs9C10L3QtdGA0LjRgNGD0LXQvCDQsNC00YDQtdGBINC/0L4g0YjQsNCx0LvQvtC90YNcblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVVUkwgPSAgW3ByZWZpeCwgbmFtZV0uam9pbignLycpICsgcG9zdGZpeDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly/QsCDQtdGB0LvQuCDQtdGB0YLRjCDQvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwLCDRgtC+XG5cdFx0XHRcdFx0aWYgKHZpZXcuaGFzT3duUHJvcGVydHkoJ3RlbXBsYXRlTmFtZScpKSB7XG5cdFx0XHRcdFx0XHQvLy4uLlxuXHRcdFx0XHRcdFx0dmlldy50ZW1wbGF0ZU5hbWUgPSB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgdmlldy50ZW1wbGF0ZU5hbWUgKyB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0XHRkYXRhLFxuXHRcdFx0XHRcdHRlbXBsYXRlOntcblx0XHRcdFx0XHRcdG5hbWU6IHZpZXcudGVtcGxhdGVOYW1lLFxuXHRcdFx0XHRcdFx0c3JjOiB2aWV3LnRlbXBsYXRlVVJMLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOltbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1dLFxuXHRcdFx0XHRcdG9wdGlvbnM6e1xuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IHZpZXcudGFyZ2V0RWwsXG5cdFx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdFx0cmVuZGVyQW5kOiB2aWV3LnJlbmRlckFuZCB8fCBPUFRfREVGQVVMVF9SRU5ERVJfQU5EXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0fVxuXG5cdGdldEFwcCgpIHtcblx0XHRyZXR1cm4gdGhpcy5hcHA7XG5cdH1cblxuXHRzZXRNb2RlbChtb2RlbCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZWwnLCBtb2RlbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNb2RlbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdtb2RlbCcpO1xuXHR9XG5cblx0c2V0UmVhZHkodmFsID0gdHJ1ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB2YWwpO1xuXHRcdHZhbCA/IHRoaXMudHJpZ2dlcigncmVhZHknKSA6IHRoaXMudHJpZ2dlcignYnVzeScpO1xuXHR9XG5cblx0c2V0VmlldyhuYW1lLCB2aWV3KXtcblx0XHR0aGlzLnNldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpLCB2aWV3KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFZpZXdzKHZpZXdzKXtcblx0XHRmb3IobGV0IHQgaW4gdmlld3Mpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCB0KSwgdmlld3NbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFZpZXcobmFtZSA9ICdkZWZhdWx0Jyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgbmFtZSkpO1xuXHR9XG5cblx0c2V0TW9kdWxlTmFtZSh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ21vZHVsZU5hbWUnLCB2YWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kdWxlTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdtb2R1bGVOYW1lJyk7XG5cdH1cblxuXHRnZXRNb2R1bGVQcmVmaXgoKXtcblx0XHRyZXR1cm4gW3RoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZXMnKSwgdGhpcy5nZXRNb2R1bGVOYW1lKCldLmpvaW4oJy8nKTtcblx0fVxuXG5cdHByZWxvYWRMaWIobGlzdCA9IHt9KXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGlmKHR5cGVvZiBsaXN0ICE9PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBsaXN0KXtcblx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5wdXNoKGxpc3RbdF0pO1xuXHRcdFx0XHRcdHRoaXMubWFrZVtsaXN0W3RdXSh7fSkuJGxpc3RBbGwoKVxuXHRcdFx0XHRcdFx0LnRoZW4oKGRhdGEpPT57XG5cdFx0XHRcdFx0XHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdsaWJzJykpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0T3B0aW9ucygnbGlicycsIHt9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKVt0XSA9IGRhdGE7XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2YobGlzdFt0XSkgPiAtMSl7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuc3BsaWNlKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2YobGlzdFt0XSksIDEpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmNhdGNoKChlcnIpPT57XG5cdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoZXJyKTtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cXVlZVVwbG9hZChuYW1lLCBsaXN0KXtcblx0XHQvL2hhc2ggKGZpZWxkTmFtZT0+ZmlsZXNMaXN0KVxuXHRcdGlmKCF0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnLCB7fSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkUXVlZScpW25hbWVdID0gbGlzdDtcblx0fVxuXG5cdGV4ZWNVcGxvYWRzKGl0ZW0pe1xuXHRcdGxldCBsaXN0ID0gdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRRdWVlJyk7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRpZih0eXBlb2YgbGlzdCAhPT0gJ29iamVjdCcpe1xuXHRcdFx0XHRyZXNvbHZlKGl0ZW0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygndXBsb2FkaW5nJywge30pO1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gbGlzdCl7XG5cdFx0XHRcdFx0bGV0IGZpZWxkRmlsZXMgPSBsaXN0W3RdO1xuXHRcdFx0XHRcdGlmIChmaWVsZEZpbGVzLmxlbmd0aCA+IDEpe1xuXHRcdFx0XHRcdFx0aXRlbVt0XSA9IFtdO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0aXRlbVt0XSA9ICcnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IobGV0IGYgPSAwOyBmIDwgZmllbGRGaWxlcy5sZW5ndGg7IGYrKyl7XG5cdFx0XHRcdFx0XHRpZighdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKS5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0gPSAwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XSsrO1xuXHRcdFx0XHRcdFx0dGhpcy5hcHAuZ2V0V29ya2luZygndXBsb2FkZXInKVxuXHRcdFx0XHRcdFx0XHQudXBsb2FkKGZpZWxkRmlsZXNbZl0pXG5cdFx0XHRcdFx0XHRcdC50aGVuKChzYXZlZEZpbGUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdmaWxlIHVwbG9hZGVkJywgdCxmLCBzYXZlZEZpbGUpO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0tLTtcblx0XHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdID09PSAwKXtcblx0XHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSB0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZihBcnJheS5pc0FycmF5KGl0ZW1bZl0pKXtcblx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1bdF0ucHVzaChzYXZlZEZpbGUuaGFzaCk7XG5cdFx0XHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtW3RdID0gc2F2ZWRGaWxlLmhhc2g7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmKE9iamVjdC5rZXlzKHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKGl0ZW0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0LmNhdGNoKChlcnIpPT57XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLnJlcG9ydChlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoT2JqZWN0LmtleXModGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKSkubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRyZXNvbHZlKGl0ZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRvbkFmdGVyUmVuZGVyKCl7XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29udHJvbGxlcjtcbiIsImltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi4vcmVjb3JkJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYID0gJ2Zvcm1fJyxcblx0T1BUX0RFRkFVTFRfUk9MRV9OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9GT1JNX1RJVExFID0gJ0Zvcm0gZGVmYXVsdCB0aXRsZScsXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04gPSB7fSxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QgPSBbJ29wdGlvbnMnLCAnbWFuaWZlc3QnLCAnYXBwJ107XG5cbmNsYXNzIG5vdEZvcm0gZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3ByZWZpeCcsIE9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnRzJywgW10pO1xuXHRcdGlmICghdGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuc2V0RGF0YShuZXcgbm90UmVjb3JkKHt9LCB0aGlzLmdldERhdGEoKSkpO1xuXHRcdH1cblx0XHR0aGlzLm9uKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ3Jlc2V0JywgdGhpcy5vblJlc2V0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NhbmNlbCcsIHRoaXMub25DYW5jZWwuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YSgpIHtcblx0XHRsZXQgbWFuaWZlc3QgPSB0aGlzLmdldE1hbmlmZXN0KCk7XG5cdFx0aWYgKG1hbmlmZXN0ICYmIG1hbmlmZXN0LmFjdGlvbnMpIHtcblx0XHRcdHJldHVybiBtYW5pZmVzdC5hY3Rpb25zLmhhc093blByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJykpID8gbWFuaWZlc3QuYWN0aW9uc1t0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpXSA6IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGdldEZvcm1GaWVsZHNMaXN0KCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCksXG5cdFx0XHRsaXN0ID0gW10sXG5cdFx0XHRyb2xlID0gdGhpcy5nZXRPcHRpb25zKCdyb2xlJywgT1BUX0RFRkFVTFRfUk9MRV9OQU1FKTtcblx0XHRpZiAoYWN0aW9uRGF0YSkge1xuXG5cdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMpIHtcblx0XHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzLmhhc093blByb3BlcnR5KHJvbGUpKSB7XG5cdFx0XHRcdFx0bGlzdCA9IGFjdGlvbkRhdGEuZmllbGRzW3JvbGVdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0Lypcblx0XHRSZW5kZXJpbmdcblx0Ki9cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdH1cblxuXHRnZXRQYXJ0VGVtcGxhdGVOYW1lKGZvcm1QYXJ0KSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCB0aGlzLmJpbmRGb3JtRXZlbnRzLmJpbmQodGhpcyldLFxuXHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcylcblx0XHRcdFx0XHRdXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfRk9STV9USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRsZXQgZmllbGROYW1lID0gdGhpcy5nZXRGb3JtRmllbGRzTGlzdCgpW3RdO1xuXHRcdFx0XHR0aGlzLmFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xlYXJGaWVsZHNDb21wb25lbnRzKCkge1xuXHRcdGxldCBjb21wcyA9IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpO1xuXHRcdHdoaWxlIChjb21wcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb21wc1swXS5jb21wb25lbnQuZGVzdHJveSgpO1xuXHRcdFx0Y29tcHMuc3BsaWNlKDAsIDEpO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpYnMoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdG9wdGlvbnM6IHt9LFxuXHRcdFx0bWFuaWZlc3Q6IHt9LFxuXHRcdFx0YXBwOiB7fSxcblx0XHR9O1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpKSB7XG5cdFx0XHRyZXN1bHQub3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmIChub3RDb21tb24uZ2V0QXBwKCkgJiYgbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpKSB7XG5cdFx0XHRyZXN1bHQuYXBwID0gbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQgJiYgdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKSkge1xuXHRcdFx0cmVzdWx0Lm1hbmlmZXN0ID0gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKS5maWVsZHM7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSkge1xuXHRcdGxldCBkZWYgPSBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OLFxuXHRcdFx0ZmllbGRzTGlicyA9IHRoaXMuZ2V0RmllbGRzTGlicygpO1xuXHRcdGZvciAobGV0IHQgb2YgT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QpIHtcblx0XHRcdGlmIChmaWVsZHNMaWJzLmhhc093blByb3BlcnR5KHQpICYmIGZpZWxkc0xpYnNbdF0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gZmllbGRzTGlic1t0XVtmaWVsZE5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0YWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKSB7XG5cdFx0bGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpO1xuXHRcdGxldCByZWMgPSB7XG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRuYW1lOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHRpdGxlOiBmaWVsZFR5cGUubGFiZWwgfHwgZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHR0eXBlOiBmaWVsZFR5cGUudHlwZSxcblx0XHRcdFx0bGFiZWw6IGZpZWxkVHlwZS5sYWJlbCxcblx0XHRcdFx0YXJyYXk6IGZpZWxkVHlwZS5hcnJheSxcblx0XHRcdFx0ZGVmYXVsdDogZmllbGRUeXBlLmRlZmF1bHQsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ2hlbHBlcnMnLCAnbGlicycsIGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cblx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoZmllbGRUeXBlLnR5cGUpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRGb3JtVGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0Jyxcblx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0WydhZnRlckRhdGFDaGFuZ2UnLCB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMocGFyYW1zKSB7XG5cdFx0bm90Q29tbW9uLmxvZygnY29sbGVjdCBkYXRhIGZyb20gY29tcG9uZW50cycsIHBhcmFtcyk7XG5cdH1cblxuXHRnZXRGb3JtVGFyZ2V0RWxlbWVudCh0YXJnZXQgPSAnYm9keScpIHtcblx0XHRpZiAoIXRhcmdldCkge1xuXHRcdFx0dGFyZ2V0ID0gJ2JvZHknO1xuXHRcdH1cblx0XHRsZXQgcmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHRpZiAoIXJlcyAmJiB0YXJnZXQgIT09ICdib2R5Jykge1xuXHRcdFx0dGFyZ2V0ID0gJ2JvZHknO1xuXHRcdFx0cmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHR9XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0ID09ICdib2R5Jykge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdGNvbGxlY3REYXRhKCkge1xuXHRcdC8vbGV0IGRhdGEgPSB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKTtcblx0fVxuXG5cdGJpbmRGb3JtRXZlbnRzKCkge1xuXHRcdGxldCB0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZiAodGFyZ2V0UXVlcnkpIHtcblx0XHRcdGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFF1ZXJ5KTtcblx0XHRcdGlmICh0YXJnZXQpIHtcblx0XHRcdFx0dGhpcy5zZXRPcHRpb25zKCd0YXJnZXRFbCcsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBmb3JtID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcblx0XHRcdGlmIChmb3JtKSB7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR1cGRhdGVGaWVsZChmaWVsZE5hbWUpIHtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uZmllbGQubmFtZSA9PT0gZmllbGROYW1lKSB7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0RXZlbnQgaGFuZGxlcnNcblx0Ki9cblxuXHRvblN1Ym1pdCgpIHtcblxuXHR9XG5cblx0b25DYW5jZWwoKSB7XG5cblx0fVxuXG5cdG9uUmVzZXQoKSB7XG5cblx0fVxuXG5cdGdldEZpZWxkcygpIHtcblxuXHR9XG5cblx0YWRkRmllbGQoKSB7XG5cblx0fVxuXG5cdHJlbW92ZUZpZWxkKCkge1xuXG5cdH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEZvcm07XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi4vcmVjb3JkJztcbmltcG9ydCBub3RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvbm90Rm9ybS5qcyc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX1ZJRVcgPSAnZWRpdCcsXG5cdE9QVF9ERUZBVUxUX0FDVElPTiA9ICdjcmVhdGUnLFxuXHRPUFRfREVGQVVMVF9JVEVNID0ge1xuXHRcdF9pZDogbnVsbCxcblx0XHR0aXRsZTogJ1RpdGxlJyxcblx0XHR2YWx1ZTogJ1ZhbHVlJ1xuXHR9O1xuXG5jbGFzcyBDUlVEQ3JlYXRlIGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKSB7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgQ3JlYXRlJyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuY29tbW9uJykgfHwgdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG5cdFx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLmluaXREYXRhLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlcldyYXBwZXIuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyRm9ybS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlRGVmYXVsdCgpIHtcblx0XHRpZiAodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmRlZmF1bHRJdGVtJykgJiYgdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICYmIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXShub3RDb21tb24uZXh0ZW5kKHt9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuZGVmYXVsdEl0ZW0nKSkpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wYXJlbnQuaW5pdEl0ZW0pIHtcblx0XHRcdHJldHVybiB0aGlzLnBhcmVudC5pbml0SXRlbSgpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICYmIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXShub3RDb21tb24uZXh0ZW5kKHt9LCBPUFRfREVGQVVMVF9JVEVNKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBuZXcgbm90UmVjb3JkKHt9LCBub3RDb21tb24uZXh0ZW5kKHt9LCBPUFRfREVGQVVMVF9JVEVNKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdERhdGEoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0YSh0aGlzLmNyZWF0ZURlZmF1bHQoKSk7XG5cdFx0XHRcdHJlc29sdmUodGhpcy5nZXREYXRhKCkpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnJlbmRlcignZGVmYXVsdCcsIHt9LCB7fSk7XG5cdH1cblxuXHRyZW5kZXJGb3JtKCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aGlzLmZvcm0gPSBuZXcgbm90Rm9ybSh7XG5cdFx0XHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0YWN0aW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfQUNUSU9OLFxuXHRcdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS50YXJnZXRRdWVyeScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUudGFyZ2V0UXVlcnknKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpKSxcblx0XHRcdFx0XHRcdHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnByZWZpeCcpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuXHRcdFx0XHRcdFx0cm9sZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnJvbGUnKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdyb2xlJyksXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdFx0bGlua0JhY2tUb0xpc3Q6IHRoaXMucGFyZW50LmxpbmtCYWNrVG9MaXN0KCksXG5cdFx0XHRcdFx0XHRcdGZpbGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgZmlsZXMgPSBwYXJhbXMuZS50YXJnZXQuZmlsZXMgfHwgcGFyYW1zLmUuZGF0YVRyYW5zZmVyLmZpbGVzO1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2ZpbGUgY2hhbmdlZCcsIGZpbGVzKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAocGFyYW1zLmhlbHBlcnMuZmllbGQubmFtZSAmJiBmaWxlcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5xdWVlVXBsb2FkKHBhcmFtcy5oZWxwZXJzLmZpZWxkLm5hbWUsIGZpbGVzKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHN1Ym1pdDogKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ3N1Ym1pdCBmb3JtICcsIHRoaXMubmV3SXRlbSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5leGVjVXBsb2Fkcyh0aGlzLmdldERhdGEoKSlcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHRoaXMuY3JlYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRhZnRlclN1Ym1pdDogKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZ29Ub1RhYmxlKCk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGxpYnM6IHRoaXMuZ2V0T3B0aW9ucygnbGlicycpLFxuXHRcdFx0XHRcdFx0fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmhlbHBlcnMnKSB8fCB7fSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHJlc29sdmVdLFxuXHRcdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0XHRbJ2FmdGVyU3VibWl0JywgJ2FmdGVyUmVzdG9yZSddLCB0aGlzLnBhcmVudC5iYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpXG5cdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmVqZWN0KGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Y3JlYXRlKGl0ZW0pIHtcblx0XHRpdGVtWyckJyArIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5hY3Rpb24nKV0oKVxuXHRcdFx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdmb3JtIHNhdmVkJywgcmVzdWx0KTtcblx0XHRcdFx0dGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChyZXN1bHQpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdmb3JtIG5vdCBzYXZlZCcsIHJlc3VsdCk7XG5cdFx0XHR9KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURDcmVhdGU7XG4iLCIvKiBnbG9iYWwgalF1ZXJ5LCQgKi9cbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL3JlY29yZCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX1BBR0VfU0laRSA9IDIwLFxuXHRPUFRfREVGQVVMVF9QQUdFX05VTUJFUiA9IDAsXG5cdE9QVF9ERUZBVUxUX1BBR0VfUkFOR0UgPSA2LFxuXHRPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTiA9IDEsXG5cdE9QVF9ERUZBVUxUX0NPVU5UX0FDVElPTiA9ICdjb3VudCcsXG5cdE9QVF9ERUZBVUxUX0xJU1RfQUNUSU9OID0gJ2xpc3QnLFxuXHRPUFRfREVGQVVMVF9TT1JUX0ZJRUxEID0gJ19pZCcsXG5cdE9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DID0gJ3ByZXByb2Nlc3Nvcic7XG5cbi8qKlxuXHRGZXcgY29uY2VwdHNcblx0XHQqXHR0d28gbW9kZXMgMSAtIGxpdmUgcmVxdWVzdGluZyBmcm9tIHNlcnZlciwgMiAtIHN0YXRpYyBkYXRhXG5cblx0XHQqXHRpbiBsaXZlIG1vZGU6IGNoYW5naW5nIG9mIGZpbHRlcnMgb3Igc29ydGVycyBsZWFkcyB0byBhbm90aGVyIHJlcXVlc3Rcblx0XHRcdHRvIHNlcnZlciwgaW4gZW5kbGVzcyBtb2RlIGFmdGVyIHNjcm9sbCBkb3duIHRvIHRoZSBib3R0b20gb2Zcblx0XHRcdHRhYmxlIG5leHQgcGFnZSB3aWxsIGJlIHJlcXVlc3RlZCBhbmQgZ2x1ZWQgdG8gdGhlIGJvdHRvbSBvZiB0aGVcblx0XHRcdHRhYmxlLCBpbiBwYWdpbmF0aW9uIG1vZGUgYWZ0ZXIgY2hhbmdlIG9mIHNvcnRlciBvciBmaWx0ZXJcblx0XHRcdHBhZ2luYXRpb24gd2lsbCBiZSByZXNldFxuXG5cdFx0Klx0aW4gc3RhdGljIG1vZGU6IGNoYW5nZSBpbiBmaWx0ZXJzIG9yIHNvcnRlcnMgd2lsbCBsZWFkIHRvIHBhZ2luYXRpb25cblx0XHRcdHJlc2V0XG5cblx0bGV0IGlucHV0ID0ge1xuXHRcdGRhdGE6XHQvL2FycmF5IG9mIGl0ZW1zIHRvIGJlIHByZXNlbnRlZCBpbiB0YWJsZVxuXHRcdFx0XHQvL2luIGNhc2Ugb2Ygc3RhdGljIC0gdW5maWx0ZXJlZFxuXHRcdFx0XHQvL2luIGNhc2Ugb2YgbGl2ZSAtIHdpbGwgYmUgbWlycm9yZWQgdG8gdGFibGUgd2l0aG91dCBhbnkgY2hhbmdlc1xuXHRcdG9wdGlvbnM6IHtcblx0XHRcdC8vdG8gcG9zdCBwcm9jIGFueSByb3cgYWZ0ZXIgaXQgd2lsbCBiZSByZW5kZXJlZFxuXHRcdFx0cHJvY1JvdzooXG5cdFx0XHRcdHRyb3csXHQvL0hUTUxFbGVtZW50IG9mIHJvd1xuXHRcdFx0XHR0aXRlbVx0Ly9pdGVtIGRpc3BsYXllZCBpbiByb3dcblx0XHRcdCk9Pntcblx0XHRcdFx0Ly9zb21lIGFjdGlvbnNcblx0XHRcdFx0cmV0dXJuIHRyb3c7XG5cdFx0XHR9LFxuXHRcdFx0Ly9hcnJheSBvZiBmaWVsZHMgdGhhdCB3ZSB3aWxsIHNob3cgaW4gdGFibGVcblx0XHRcdGZpZWxkczpbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRwYXRoOiAnOmlkJywgXHQvLyBub3RQYXRoIHRvIGZpZWxkXG5cdFx0XHRcdFx0dGl0bGU6ICdJRCcsXHQvL3doYXQgc2hvdyBpbiB0YWJsZSB0aXRsZXMgcm93XG5cdFx0XHRcdFx0c29ydGFibGU6IHRydWVcdC8vZW5hbGUgc29ydGluZ1xuXHRcdFx0XHRcdGVkaXRhYmxlOiB0cnVlLFx0Ly9pbmxpbmUgZWRpdGluZ1xuXHRcdFx0XHRcdHNlYXJjaGFibGU6IHRydWUvL3NlYXJjaGFibGUgZnJvbSBpbmxpbmUgc2VhcmNoIGZpZWxkXG5cdFx0XHRcdFx0ZXZlbnRzIDoge1xuXHRcdFx0XHRcdFx0Y2xpY2s6IChpbnB1dCl7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdFx0XHRcdFx0XHRcdGlucHV0Lml0ZW0uc3RhdHVzID0gIWlucHV0Lml0ZW0uc3RhdHVzO1xuXHRcdFx0XHRcdFx0XHR0YWJsZS51cGRhdGVEYXRhKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRdLFxuXHRcdFx0cGFnZVNpemU6IDUwLFx0XHQvL2hvdyBtYW55IHJvd3MgcGVyIFwicGFnZVwiXG5cdFx0XHRwYWdlTnVtYmVyOiAwLFx0XHQvL2RlZmF1bHQgcGFnZSBudW1iZXIgYWthIGZpcnN0XG5cdFx0XHRlbmRsZXNzOiB0cnVlLFx0XHQvL3RydWUgLSB3aWxsIGxvYWR1cCBkYXRhIGZyb21cblx0XHRcdGVuZGxlc3NUcmlnZ2VyOiBcdC8vZW5kbGVzcyB0cmlnZ2VyXG5cdFx0XHRoZWxwZXJzOiB7fSxcdFx0Ly93aWxsIGJlIGF2YWlsYWJsZSBmb3IgZXZlcnkgcHJvY2Vzc29yIGluIHN1Yi10ZW1wbGF0ZXNcblx0XHRcdHRhcmdldEVsOiBlbFx0XHQvL3doZXJlIHdlIHdpbGwgcGxhY2UgaXRcblx0XHRcdGludGVyZmFjZTp7XHRcdFx0Ly9mb3Igb25saW5lIHJlcXVlc3RlZCBsaXN0XG5cdFx0XHRcdGZhY3Rvcnk6IFx0XHQvL3RhcmdldCBub3RSZWNvcmQgZmFjdG9yeSB3aXRoIG5vdFJlY29yZEludGVyZmFjZSwgc291cmNlIG9mIG9ubGluZSBkYXRhXG5cdFx0XHRcdGxpc3RBY3Rpb246XHRcdC8vd2hpY2ggYWN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIHJldHJpZXZlIGRhdGEgZnJvbSBzZXJ2ZXIsIGRlZmF1bHQgJ2xpc3QnXG5cdFx0XHRcdGNvdW50QWN0aW9uOlx0Ly93aGljaCBhY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gcmV0cmlldmUgcmF3cyBjb3VudCBmcm9tIHNlcnZlciwgZGVmYXVsdCAnY291bnQnXG5cdFx0XHRcdG9uU3VjY2VzczpcdFx0Ly93aWxsIGJlIGNhbGxlZCBhZnRlciBzdWNjZXNzZnVsbCByZXF1ZXN0XG5cdFx0XHRcdG9uRXJyb3I6XHRcdC8vd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgZmFpbGVkIHJlcXVlc3Rcblx0XHRcdH0sXG5cdFx0fVxuXHR9XG4qL1xuXG5jbGFzcyBub3RUYWJsZSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIFtdKTtcblx0XHR0aGlzLmRhdGEgPSBuZXcgbm90UmVjb3JkKHt9LCB7XG5cdFx0XHRwYWdpbmF0aW9uOiB7XG5cdFx0XHRcdGl0ZW1zOiB7XG5cdFx0XHRcdFx0Y291bnQ6IDAsXG5cdFx0XHRcdFx0ZnJvbTogMCxcblx0XHRcdFx0XHR0bzogMFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRwYWdlczoge1xuXHRcdFx0XHRcdGNvdW50OiAwLFxuXHRcdFx0XHRcdGZyb206IDAsXG5cdFx0XHRcdFx0dG86IDAsXG5cdFx0XHRcdFx0Y3VycmVudDogMCxcblx0XHRcdFx0XHRsaXN0OiBbXVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpICYmICFBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0dGhpcy5zZXREYXRhKG5ldyBub3RSZWNvcmQoe30sIFtdKSk7XG5cdFx0fVxuXHRcdHRoaXMucmVzZXRQYWdlcigpO1xuXHRcdHRoaXMucmVzZXRGaWx0ZXIoKTtcblx0XHR0aGlzLnJlc2V0U29ydGVyKCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRkYXRhOiB0aGlzLmRhdGEsXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogJ3RhYmxlX3dyYXBwZXInXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRyZW5kZXJBbmQ6IHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdGdvVG9QYWdlOiAoaW5wdXQpID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy5nb1RvUGFnZShpbnB1dC5pdGVtLmluZGV4KTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRnb1RvRmlyc3Q6IHRoaXMuZ29Ub0ZpcnN0LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0XHRnb1RvTGFzdDogdGhpcy5nb1RvTGFzdC5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdFx0Z29Ub05leHQ6IHRoaXMuZ29Ub05leHQuYmluZCh0aGlzKSxcblx0XHRcdFx0XHRcdGdvVG9QcmV2OiB0aGlzLmdvVG9QcmV2LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0XHRpc1BhZ2VBY3RpdmU6IChpbnB1dCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaW5wdXQuaXRlbS5pbmRleCA9PT0gdGhpcy5kYXRhLnBhZ2luYXRpb24ucGFnZXMuY3VycmVudDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSlcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLFxuXHRcdFx0XHRcdFx0W3RoaXMuaW5pdEF1dG9sb2FkZXIuYmluZCh0aGlzKSwgdGhpcy5yZW5kZXJJbnNpZGUuYmluZCh0aGlzKV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdF1cblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBjb21wb25lbnQpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlclBhZ2luYXRpb24oKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50UGFnaW5hdGlvbicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudFBhZ2luYXRpb24nKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRkYXRhOiB0aGlzLmRhdGEucGFnaW5hdGlvbixcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiAndGFibGVfcGFnaW5hdGlvbidcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdHJlbmRlckFuZDogdGhpcy5nZXRPcHRpb25zKCdyZXBsYWNlJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCduYXZbcm9sZT1cInBhZ2luYXRpb25cIl0nKSxcblx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdGdvVG9QYWdlOiAoaW5wdXQpID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy5nb1RvUGFnZShpbnB1dC5pdGVtLmluZGV4KTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRnb1RvRmlyc3Q6IHRoaXMuZ29Ub0ZpcnN0LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0XHRnb1RvTGFzdDogdGhpcy5nb1RvTGFzdC5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdFx0Z29Ub05leHQ6IHRoaXMuZ29Ub05leHQuYmluZCh0aGlzKSxcblx0XHRcdFx0XHRcdGdvVG9QcmV2OiB0aGlzLmdvVG9QcmV2LmJpbmQodGhpcyksXG5cdFx0XHRcdFx0XHRpc1BhZ2VBY3RpdmU6IChpbnB1dCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaW5wdXQuaXRlbS5pbmRleCA9PT0gdGhpcy5kYXRhLnBhZ2luYXRpb24ucGFnZXMuY3VycmVudDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSlcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudFBhZ2luYXRpb24nLCBjb21wb25lbnQpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlckluc2lkZSgpIHtcblx0XHR0aGlzLnJlbmRlckhlYWRlcigpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHRcdHRoaXMucmVuZGVyQm9keSgpO1xuXHRcdHRoaXMuYmluZFNlYXJjaCgpO1xuXHRcdHRoaXMuYmluZEN1c3RvbUJpbmRpbmdzKCk7XG5cdH1cblxuXHRyZW5kZXJIZWFkZXIoKSB7XG5cdFx0dmFyIHRhYmxlSGVhZGVyID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIHRyJyk7XG5cdFx0aWYgKCF0YWJsZUhlYWRlcikgcmV0dXJuO1xuXHRcdGxldCBmaWVsZHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgbmV3VGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUSCcpO1xuXHRcdFx0bmV3VGguaW5uZXJIVE1MID0gZmllbGRzW2ldLnRpdGxlO1xuXHRcdFx0aWYgKGZpZWxkc1tpXS5oYXNPd25Qcm9wZXJ0eSgnc29ydGFibGUnKSAmJiBmaWVsZHNbaV0uc29ydGFibGUpIHtcblx0XHRcdFx0dGhpcy5hdHRhY2hTb3J0aW5nSGFuZGxlcnMobmV3VGgsIGZpZWxkc1tpXS5wYXRoKTtcblx0XHRcdH1cblx0XHRcdHRhYmxlSGVhZGVyLmFwcGVuZENoaWxkKG5ld1RoKTtcblx0XHR9XG5cdH1cblxuXHRhdHRhY2hTb3J0aW5nSGFuZGxlcnMoaGVhZENlbGwsIGZpZWxkTmFtZSkge1xuXHRcdGhlYWRDZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuY2hhbmdlU29ydGluZ09wdGlvbnMoaGVhZENlbGwsIGZpZWxkTmFtZSk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdFx0aGVhZENlbGwuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHR9XG5cblx0Y2hhbmdlU29ydGluZ09wdGlvbnMoZWwsIGZpZWxkTmFtZSkge1xuXHRcdGlmIChmaWVsZE5hbWUgPT09IHRoaXMuZ2V0U29ydGVyKCkuc29ydEJ5RmllbGQpIHtcblx0XHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdFx0c29ydEJ5RmllbGQ6IGZpZWxkTmFtZSxcblx0XHRcdFx0c29ydERpcmVjdGlvbjogLTEgKiB0aGlzLmdldFNvcnRlcigpLnNvcnREaXJlY3Rpb24sXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0XHRzb3J0QnlGaWVsZDogZmllbGROYW1lLFxuXHRcdFx0XHRzb3J0RGlyZWN0aW9uOiBPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTixcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZiAoZWwucGFyZW50Tm9kZSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbC5wYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldID09PSBlbCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19hc2MnKTtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdub25lJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldFNvcnRlcigpLnNvcnREaXJlY3Rpb24gPiAwKSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdhc2NlbmRpbmcnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnZGVzY2VuZGluZycpO1xuXHRcdH1cblx0fVxuXG5cdHNldFNvcnRlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBoYXNoKTtcblx0XHR0aGlzLmludmFsaWRhdGVEYXRhKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldFNvcnRlcigpIHtcblx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRzb3J0QnlGaWVsZDogT1BUX0RFRkFVTFRfU09SVF9GSUVMRCxcblx0XHRcdHNvcnREaXJlY3Rpb246IE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3NvcnRlcicpO1xuXHR9XG5cblx0Z2V0RmlsdGVyU2VhcmNoKCkge1xuXHRcdHJldHVybiAodHlwZW9mIHRoaXMuZ2V0RmlsdGVyKCkgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0RmlsdGVyKCkgIT09IG51bGwgJiYgdHlwZW9mIHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaCAhPT0gbnVsbCkgPyB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaC50b1N0cmluZygpIDogJyc7XG5cdH1cblxuXHRjbGVhckZpbHRlcmVkRGF0YSgpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykuc3BsaWNlKDAsIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykubGVuZ3RoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9pbml0aWFsaXplIGlmIG5vdCBleGlzdHNcblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgbmV3IG5vdFJlY29yZCh7fSwgW10pKTtcblx0XHR9XG5cdH1cblxuXHRjbGVhckRhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpICYmIHRoaXMuZ2V0RGF0YSgpLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuZ2V0RGF0YSgpLnNwbGljZSgwLCB0aGlzLmdldERhdGEoKS5sZW5ndGgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvL29yIGluaXQgZW1wdHkgbGlzdFxuXHRcdFx0dGhpcy5zZXREYXRhKG5ldyBub3RSZWNvcmQoe30sIFtdKSk7XG5cdFx0fVxuXHR9XG5cblx0aW52YWxpZGF0ZURhdGEoKSB7XG5cdFx0Ly9jbGVhcmluZyBmaWx0ZXJlZCBhbmQgc29ydGVkXG5cdFx0dGhpcy5jbGVhckZpbHRlcmVkRGF0YSgpO1xuXHRcdC8vaW4gY2FzZSBsaXZlIGxvYWRpbmcgZnJvbSBzZXJ2ZXJcblx0XHRpZiAodGhpcy5pc0xpdmUoKSkge1xuXHRcdFx0Ly9jbGVhcmluZyBsb2FkZWQgZGF0YVxuXHRcdFx0dGhpcy5jbGVhckRhdGEoKTtcblx0XHR9XG5cdFx0Ly9yZXNzZXQgcGFnZXIgYW55d2F5XG5cdFx0dGhpcy5yZXNldFBhZ2VyKCk7XG5cdH1cblxuXHRzZXRGaWx0ZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgaGFzaCk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlRGF0YSgpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpcy5zZXRGaWx0ZXIoe30pO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0UGFnZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncGFnZXInLCBoYXNoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdGdldERlZmF1bHRQYWdlTnVtYmVyKCkge1xuXHRcdHJldHVybiBpc05hTih0aGlzLmdldE9wdGlvbnMoJ3BhZ2VOdW1iZXInKSkgPyBPUFRfREVGQVVMVF9QQUdFX05VTUJFUiA6IHRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpO1xuXHR9XG5cblx0Z2V0RGVmYXVsdFBhZ2VTaXplKCkge1xuXHRcdHJldHVybiBpc05hTih0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJykpID8gT1BUX0RFRkFVTFRfUEFHRV9TSVpFIDogdGhpcy5nZXRPcHRpb25zKCdwYWdlU2l6ZScpO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3BhZ2VyJywge1xuXHRcdFx0cGFnZVNpemU6IHRoaXMuZ2V0RGVmYXVsdFBhZ2VTaXplKCksXG5cdFx0XHRwYWdlTnVtYmVyOiB0aGlzLmdldERlZmF1bHRQYWdlTnVtYmVyKCksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwYWdlcicpO1xuXHR9XG5cblx0aXNMaXZlKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpICYmIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlLmZhY3RvcnknKTtcblx0fVxuXG5cdHNldFVwZGF0aW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndXBkYXRpbmcnLCB0cnVlKTtcblx0fVxuXG5cdHNldFVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd1cGRhdGluZycsIGZhbHNlKTtcblx0fVxuXG5cdGlmVXBkYXRpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndXBkYXRpbmcnKTtcblx0fVxuXG5cdGdldERhdGFJbnRlcmZhY2UoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlLmZhY3RvcnknKSh7fSk7XG5cdH1cblxuXHRnZXRMb2FkRGF0YUFjdGlvbk5hbWUoKSB7XG5cdFx0cmV0dXJuICh0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZS5saXN0QWN0aW9uJykgPyB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZS5saXN0QWN0aW9uJykgOiBPUFRfREVGQVVMVF9MSVNUX0FDVElPTik7XG5cdH1cblxuXHRnZXRDb3VudEFjdGlvbk5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlLmNvdW50QWN0aW9uJykgPyB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZS5jb3VudEFjdGlvbicpIDogT1BUX0RFRkFVTFRfQ09VTlRfQUNUSU9OO1xuXHR9XG5cblx0bG9hZERhdGEoKSB7XG5cdFx0Ly9sb2FkIGZyb20gc2VydmVyXG5cdFx0bGV0IHF1ZXJ5ID0gdGhpcy5nZXREYXRhSW50ZXJmYWNlKClcblx0XHRcdC5zZXRGaWx0ZXIodGhpcy5nZXRGaWx0ZXIoKSlcblx0XHRcdC5zZXRTb3J0ZXIodGhpcy5nZXRTb3J0ZXIoKSlcblx0XHRcdC5zZXRQYWdlcih0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUsIHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyKTtcblx0XHRyZXR1cm4gcXVlcnlbJyQnICsgdGhpcy5nZXRMb2FkRGF0YUFjdGlvbk5hbWUoKV0oKTtcblx0fVxuXG5cdGdvVG9OZXh0KCkge1xuXHRcdGxldCBuZXh0ID0gaXNOYU4odGhpcy5nZXRXb3JraW5nKCdwYWdlcicpLnBhZ2VOdW1iZXIpID8gdGhpcy5nZXREZWZhdWx0UGFnZU51bWJlcigpIDogdGhpcy5nZXRXb3JraW5nKCdwYWdlcicpLnBhZ2VOdW1iZXIgKyAxO1xuXHRcdHRoaXMuZ2V0V29ya2luZygncGFnZXInKS5wYWdlTnVtYmVyID0gTWF0aC5taW4obmV4dCwgdGhpcy5kYXRhLnBhZ2luYXRpb24ucGFnZXMudG8pO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0Z29Ub1ByZXYoKSB7XG5cdFx0bGV0IHByZXYgPSBpc05hTih0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJykucGFnZU51bWJlcikgPyB0aGlzLmdldERlZmF1bHRQYWdlTnVtYmVyKCkgOiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJykucGFnZU51bWJlciAtIDE7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdwYWdlcicpLnBhZ2VOdW1iZXIgPSBNYXRoLm1heChwcmV2LCB0aGlzLmRhdGEucGFnaW5hdGlvbi5wYWdlcy5mcm9tKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdGdvVG9GaXJzdCgpIHtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJykucGFnZU51bWJlciA9IHRoaXMuZGF0YS5wYWdpbmF0aW9uLnBhZ2VzLmZyb207XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRnb1RvTGFzdCgpIHtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJykucGFnZU51bWJlciA9IHRoaXMuZGF0YS5wYWdpbmF0aW9uLnBhZ2VzLnRvO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0Z29Ub1BhZ2UocGFnZU51bWJlcikge1xuXHRcdHRoaXMuZ2V0V29ya2luZygncGFnZXInKS5wYWdlTnVtYmVyID0gcGFnZU51bWJlcjtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHVwZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuaXNMaXZlKCkpIHtcblx0XHRcdGlmICh0aGlzLmlmVXBkYXRpbmcoKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnZW5kbGVzcycsIGZhbHNlKSkge1xuXHRcdFx0XHR0aGlzLmdldERhdGEoKS5zcGxpY2UoMCwgdGhpcy5nZXREYXRhKCkubGVuZ3RoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuc2V0VXBkYXRpbmcoKTtcblx0XHRcdHRoaXMubG9hZERhdGEoKVxuXHRcdFx0XHQudGhlbihkYXRhID0+IHRoaXMuZ2V0RGF0YSgpLnB1c2goLi4uZGF0YSkpXG5cdFx0XHRcdC50aGVuKHRoaXMuZ2V0Um93c0NvdW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC50aGVuKHRoaXMucmVmcmVzaEJvZHkuYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKG5vdENvbW1vbi5lcnJvci5iaW5kKHRoaXMpKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFVwZGF0ZWQuYmluZCh0aGlzKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vbG9jYWwgbWFnaWNcblx0XHRcdHRoaXMuc2V0VXBkYXRpbmcoKTtcblx0XHRcdHRoaXMucHJvY2Vzc0RhdGEoKTtcblx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdH1cblx0fVxuXG5cdHByb2Nlc3NEYXRhKCkge1xuXHRcdHZhciB0aGF0RmlsdGVyID0gdGhpcy5nZXRGaWx0ZXIoKTtcblx0XHRpZiAodHlwZW9mIHRoYXRGaWx0ZXIgIT09ICd1bmRlZmluZWQnICYmIHRoYXRGaWx0ZXIgIT09IG51bGwgJiYgdHlwZW9mIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gbnVsbCAmJiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaC5sZW5ndGggPiAwKSB7XG5cdFx0XHQvL1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKS5maWx0ZXIodGhpcy50ZXN0RGF0YUl0ZW0uYmluZCh0aGlzKSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIHRoaXMuZ2V0RGF0YSgncm93cycpKTtcblx0XHR9XG5cdFx0Ly8vL3NvcnRlclxuXHRcdHZhciB0aGF0U29ydGVyID0gdGhpcy5nZXRTb3J0ZXIoKTtcblx0XHRpZiAodHlwZW9mIHRoYXRTb3J0ZXIgIT09ICd1bmRlZmluZWQnICYmIHRoYXRTb3J0ZXIgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykuc29ydCgoaXRlbTEsIGl0ZW0yKSA9PiB7XG5cdFx0XHRcdGxldCB0MSA9IG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsIGl0ZW0xLCB7fSksXG5cdFx0XHRcdFx0dDIgPSBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLCBpdGVtMiwge30pO1xuXHRcdFx0XHRpZiAoaXNOYU4odDEpKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0MSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHQyICE9PSAndW5kZWZpbmVkJyAmJiB0MS5sb2NhbGVDb21wYXJlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdDEubG9jYWxlQ29tcGFyZSgpICogLXRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiAoKHQxIDwgdDIpID8gMSA6IC0xKSAqIHRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0YmluZFNlYXJjaCgpIHtcblx0XHR2YXIgc2VhcmNoRWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInNlYXJjaFwiXScpWzBdO1xuXHRcdGlmICghc2VhcmNoRWwpIHJldHVybjtcblx0XHR2YXIgb25FdmVudCA9IChlKSA9PiB7XG5cdFx0XHR0aGlzLnNldEZpbHRlcih7XG5cdFx0XHRcdGZpbHRlclNlYXJjaDogZS5jdXJyZW50VGFyZ2V0LnZhbHVlXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH07XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbkV2ZW50KTtcblx0XHRzZWFyY2hFbC5hZGRFdmVudExpc3RlbmVyKCdlbnRlcicsIG9uRXZlbnQpO1xuXHR9XG5cblxuXHRiaW5kQ3VzdG9tQmluZGluZ3MoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykgfHwgIXRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IgKHZhciBzZWxlY3RvciBpbiB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHZhciBlbHMgPSB0aGlzLmdldE9wdGlvbigndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdGZvciAodmFyIGVsSWQgPSAwOyBlbElkIDwgZWxzLmxlbmd0aDsgZWxJZCsrKSB7XG5cdFx0XHRcdHZhciBlbCA9IGVsc1tlbElkXTtcblx0XHRcdFx0Zm9yICh2YXIgZXZlbnQgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpW3NlbGVjdG9yXSkge1xuXHRcdFx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl1bZXZlbnRdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvYWROZXh0KCkge1xuXHRcdHRoaXMuZ2V0V29ya2luZygncGFnZXInKS5wYWdlTnVtYmVyKys7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZW5kZXJSb3coaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbmV3Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVFInKSxcblx0XHRcdGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBuZXdUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1REJyksXG5cdFx0XHRcdGZpZWxkID0gZmllbGRzW2ldLFxuXHRcdFx0XHRwcmVwcm9jZXNzZWQgPSBudWxsLFxuXHRcdFx0XHR2YWwgPSBub3RQYXRoLmdldChmaWVsZC5wYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2VkaXRhYmxlJykgJiYgIWZpZWxkLmhhc093blByb3BlcnR5KCdjb21wb25lbnQnKSkge1xuXHRcdFx0XHRuZXdUZC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRFZGl0YWJsZScsIHRydWUpO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0LnBhdGggPSBmaWVsZC5wYXRoO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0Lml0ZW1JZCA9IGl0ZW1bdGhpcy5nZXRPcHRpb25zKCdpdGVtSWRGaWVsZCcpXTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC52YWx1ZSA9IHZhbDtcblx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcblx0XHRcdFx0XHRub3RQYXRoLnNldChmaWVsZC5wYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSwgbmV3VGQudGV4dENvbnRlbnQpO1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eShPUFRfRklFTERfTkFNRV9QUkVfUFJPQykpIHtcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gZmllbGRbT1BUX0ZJRUxEX05BTUVfUFJFX1BST0NdKHZhbCwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdjb21wb25lbnQnKSkge1xuXHRcdFx0XHRuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0XHRkYXRhOiBmaWVsZC5jb21wb25lbnQuZGF0YSB8fCBwcmVwcm9jZXNzZWQgfHwge1xuXHRcdFx0XHRcdFx0dmFsLFxuXHRcdFx0XHRcdFx0aXRlbSxcblx0XHRcdFx0XHRcdGluZGV4XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTogZmllbGQuY29tcG9uZW50LnRlbXBsYXRlLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBuZXdUZCxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IGZpZWxkLmNvbXBvbmVudC5ldmVudHMgfHwgW11cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXdUZC5pbm5lckhUTUwgPSBwcmVwcm9jZXNzZWQgfHwgdmFsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ3N0eWxlJykpIHtcblx0XHRcdFx0Zm9yIChsZXQgc3R5bGUgaW4gZmllbGQuc3R5bGUpIHtcblx0XHRcdFx0XHRpZiAoZmllbGQuc3R5bGUuaGFzT3duUHJvcGVydHkoc3R5bGUpKSB7XG5cdFx0XHRcdFx0XHRuZXdUZC5zdHlsZVtzdHlsZV0gPSBmaWVsZC5zdHlsZVtzdHlsZV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykgJiYgZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdGZvciAodmFyIGogaW4gZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcihqLCAoZSkgPT4ge1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZpZWxkLmV2ZW50c1tqXSh7XG5cdFx0XHRcdFx0XHRcdGV2ZW50OiBlLFxuXHRcdFx0XHRcdFx0XHRlbGVtZW50OiBuZXdUZCxcblx0XHRcdFx0XHRcdFx0aXRlbTogaXRlbSxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHZhbCxcblx0XHRcdFx0XHRcdFx0ZmllbGQ6IGZpZWxkXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG5ld1Jvdy5hcHBlbmRDaGlsZChuZXdUZCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3Byb2NSb3cnKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJvY1JvdycpKG5ld1JvdywgaXRlbSk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXdSb3c7XG5cdH1cblxuXG5cblx0ZmluZEJvZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuXHR9XG5cblx0Y2xlYXJCb2R5KCkge1xuXHRcdHZhciB0YWJsZUJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0aWYgKCF0YWJsZUJvZHkpIHJldHVybjtcblx0XHR0YWJsZUJvZHkuaW5uZXJIVE1MID0gJyc7XG5cdH1cblxuXHRjaGVja0ZpbHRlcmVkKCkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpKSkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCBbXSk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyQm9keSgpIHtcblx0XHRsZXQgdGJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0aWYgKCF0Ym9keSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnZW5kbGVzcycpKSB7XG5cdFx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdH1cblx0XHR0aGlzLmNoZWNrRmlsdGVyZWQoKTtcblx0XHRpZiAodGhpcy5pc0xpdmUoKSkge1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0RGF0YSgpLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0RGF0YSgpW2ldKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCB0aGlzUGFnZVN0YXJ0cyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciksXG5cdFx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gdGhpc1BhZ2VTdGFydHM7IGkgPCBNYXRoLm1pbihuZXh0UGFnZUVuZHMsIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykubGVuZ3RoKTsgaSsrKSB7XG5cdFx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZWZyZXNoQm9keSgpIHtcblx0XHR2YXIgdGJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0aWYgKCF0Ym9keSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdHRoaXMuY2hlY2tGaWx0ZXJlZCgpO1xuXHRcdGlmICh0aGlzLmlzTGl2ZSgpKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2V0RGF0YSgpLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0RGF0YSgpW2ldKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCB0aGlzUGFnZVN0YXJ0cyA9IDAsXG5cdFx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpO1xuXHRcdFx0Zm9yIChsZXQgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0XHR0Ym9keS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlclJvdyh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpW2ldKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0Um93c0NvdW50KCkge1xuXHRcdGxldCBxdWVyeSA9IHRoaXMuZ2V0RGF0YUludGVyZmFjZSgpLnNldEZpbHRlcih0aGlzLmdldEZpbHRlcigpKTtcblx0XHRyZXR1cm4gcXVlcnlbJyQnICsgdGhpcy5nZXRDb3VudEFjdGlvbk5hbWUoKV0oKVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0dGhpcy51cGRhdGVQYWdpbmF0aW9uKGRhdGEuY291bnQpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoZSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZVBhZ2luYXRpb24oaXRlbXNDb3VudCkge1xuXHRcdHRoaXMuZGF0YS5wYWdpbmF0aW9uLnBhZ2VzLmxpc3Quc3BsaWNlKDAsIHRoaXMuZGF0YS5wYWdpbmF0aW9uLnBhZ2VzLmxpc3QubGVuZ3RoKTtcblx0XHRsZXQgaXRlbXNGcm9tID0gKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyIC0gT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIpICogdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICsgMSxcblx0XHRcdHBhZ2VzQ291bnQgPSBpdGVtc0NvdW50ICUgdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplID8gTWF0aC5mbG9vcihpdGVtc0NvdW50IC8gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplKSArIDEgOiBNYXRoLnJvdW5kKGl0ZW1zQ291bnQgLyB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUpLFxuXHRcdFx0cGFnZXNGcm9tID0gTWF0aC5tYXgoT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIsIHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyIC0gT1BUX0RFRkFVTFRfUEFHRV9SQU5HRSksXG5cdFx0XHRwYWdlc1RvID0gTWF0aC5taW4ocGFnZXNDb3VudCAtICgxIC0gT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIpLCB0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIE9QVF9ERUZBVUxUX1BBR0VfUkFOR0UpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0aXRlbXNUbyA9IE1hdGgubWluKGl0ZW1zRnJvbSArIHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAtIDEsIGl0ZW1zQ291bnQpO1xuXHRcdGZvciAobGV0IHQgPSBwYWdlc0Zyb207IHQgPD0gcGFnZXNUbzsgdCsrKSB7XG5cdFx0XHRsaXN0LnB1c2goe1xuXHRcdFx0XHRpbmRleDogdFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHRoaXMuZGF0YS5wYWdpbmF0aW9uLml0ZW1zLmNvdW50ID0gaXRlbXNDb3VudDtcblx0XHR0aGlzLmRhdGEucGFnaW5hdGlvbi5pdGVtcy5mcm9tID0gaXRlbXNGcm9tO1xuXHRcdHRoaXMuZGF0YS5wYWdpbmF0aW9uLml0ZW1zLnRvID0gaXRlbXNUbztcblx0XHR0aGlzLmRhdGEucGFnaW5hdGlvbi5wYWdlcy5jb3VudCA9IHBhZ2VzQ291bnQ7XG5cdFx0dGhpcy5kYXRhLnBhZ2luYXRpb24ucGFnZXMuZnJvbSA9IHBhZ2VzRnJvbTtcblx0XHR0aGlzLmRhdGEucGFnaW5hdGlvbi5wYWdlcy50byA9IHBhZ2VzVG87XG5cdFx0dGhpcy5kYXRhLnBhZ2luYXRpb24ucGFnZXMuY3VycmVudCA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyO1xuXHRcdHRoaXMuZGF0YS5wYWdpbmF0aW9uLnBhZ2VzLmxpc3Quc3BsaWNlKDAsIHRoaXMuZGF0YS5wYWdpbmF0aW9uLnBhZ2VzLmxpc3QubGVuZ3RoLCAuLi5saXN0KTtcblx0fVxuXG5cblx0dGVzdERhdGFJdGVtKGl0ZW0pIHtcblx0XHR2YXIgc3RyVmFsdWUgPSB0aGlzLmdldEZpbHRlclNlYXJjaCgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0Zm9yICh2YXIgayBpbiBpdGVtKSB7XG5cdFx0XHR2YXIgdG9Db21wID0gaXRlbVtrXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZiAodG9Db21wLmluZGV4T2Yoc3RyVmFsdWUpID4gLTEpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGluaXRBdXRvbG9hZGVyKCkge1xuXHRcdGlmIChqUXVlcnkgJiYgalF1ZXJ5LnNjcm9sbFNweSAmJiAhdGhpcy5nZXRXb3JraW5nKCdsaXZlJykpIHtcblx0XHRcdGlmICh0aGlzLmlzTGl2ZSgpICYmIHRoaXMuZ2V0T3B0aW9ucygnZW5kbGVzcycpICYmIHRoaXMuZ2V0T3B0aW9ucygnZW5kbGVzc1RyaWdnZXInKSkge1xuXHRcdFx0XHRsZXQgdCA9ICQodGhpcy5nZXRPcHRpb25zKCdlbmRsZXNzVHJpZ2dlcicpKTtcblx0XHRcdFx0aWYgKHQpIHtcblx0XHRcdFx0XHR0Lm9uKCdzY3JvbGxTcHk6ZW50ZXInLCB0aGlzLmxvYWROZXh0LmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdHQuc2Nyb2xsU3B5KCk7XG5cdFx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdsaXZlJywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90VGFibGU7XG4iLCJpbXBvcnQgbm90VGFibGUgZnJvbSAnLi4vY29tcG9uZW50cy9ub3RUYWJsZS5qcyc7XG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BUX0RFRkFVTFRfUEFHRV9TSVpFID0gNTAsXG5cdE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSID0gMCxcblx0T1BUX0RFRkFVTFRfVklFVyA9ICdsaXN0JztcblxuY2xhc3MgQ1JVRExpc3QgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpIHtcblx0XHRzdXBlcihwYXJlbnQuYXBwKTtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0bm90Q29tbW9uLmxvZygnQ1JVRCBMaXN0Jyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5jb21tb24nKSB8fCB0cnVlLFxuXHRcdFx0XHR0YXJnZXRRdWVyeTogcGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuXHRcdFx0XHRoZWxwZXJzOiB7fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy51cGRhdGVEYXRhdGFibGUuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0Jywge30sIHtcblx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5wbHVyYWwnKSxcblx0XHRcdHNob3dBZGRGb3JtOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZShbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpLCAnY3JlYXRlJ10uam9pbignLycpKTtcblx0XHRcdH0sXG5cdFx0XHRsaW5rQmFja1RvTGlzdDogdGhpcy5wYXJlbnQubGlua0JhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCksXG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVEYXRhdGFibGUoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoaXMudGFibGVWaWV3ID0gbmV3IG5vdFRhYmxlKHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRwcm9jUm93OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LnByb2NSb3cnLCBmYWxzZSksXG5cdFx0XHRcdFx0XHRmaWVsZHM6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuZmllbGRzJyksXG5cdFx0XHRcdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRPcHRpb25zKCd2aWV3cy5saXN0LnBhZ2VyLnNpemUnKSB8fCB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYWdlci5zaXplJykgfHwgT1BUX0RFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0XHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRPcHRpb25zKCd2aWV3cy5saXN0LnBhZ2VyLm51bWJlcicpIHx8IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhZ2VyLm51bWJlcicpIHx8IE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSLFxuXHRcdFx0XHRcdFx0ZW5kbGVzczogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5lbmRsZXNzJywgZmFsc2UpLFxuXHRcdFx0XHRcdFx0ZW5kbGVzc1RyaWdnZXI6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuZW5kbGVzc1RyaWdnZXInLCBudWxsKSxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0XHRcdFx0XHR0aXRsZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnbmFtZXMucGx1cmFsJylcblx0XHRcdFx0XHRcdH0sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuaGVscGVycycpIHx8IHt9KSxcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QudGFyZ2V0UXVlcnknKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpKSxcblx0XHRcdFx0XHRcdGludGVyZmFjZToge1xuXHRcdFx0XHRcdFx0XHRmYWN0b3J5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmludGVyZmFjZS5mYWN0b3J5JywgdGhpcy5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0pLFxuXHRcdFx0XHRcdFx0XHRcdGxpc3RBY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuaW50ZXJmYWNlLmxpc3RBY3Rpb24nKSxcblx0XHRcdFx0XHRcdFx0XHRjb3VudEFjdGlvbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5pbnRlcmZhY2UuY291bnRBY3Rpb24nKSxcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHJlc29sdmVdXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmVqZWN0KGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0c2hvd05leHRQYWdlKCkge1xuXHRcdGlmICh0aGlzLnRhYmxlVmlldykge1xuXHRcdFx0dGhpcy50YWJsZVZpZXcubG9hZE5leHQoKTtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVETGlzdDtcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9ub3RGb3JtLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04gPSAnZ2V0UmF3Jyxcblx0T1BUX0RFRkFVTFRfQUNUSU9OID0gJ3VwZGF0ZScsXG5cdE9QVF9ERUZBVUxUX1ZJRVcgPSAnZWRpdCc7XG5cbmNsYXNzIENSVURVcGRhdGUgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpIHtcblx0XHRzdXBlcihwYXJlbnQuYXBwKTtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0bm90Q29tbW9uLmxvZygnQ1JVRCBVcGRhdGUnKTtcblx0XHR0aGlzLnNldFZpZXdzKHtcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLm5hbWUnKSB8fCBPUFRfREVGQVVMVF9WSUVXLFxuXHRcdFx0XHRjb21tb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5jb21tb24nKSB8fCB0cnVlLFxuXHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmNvbnRhaW5lclNlbGVjdG9yJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSxcblx0XHRcdFx0aGVscGVyczoge31cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUucHJlbG9hZCcpKVxuXHRcdFx0LnRoZW4odGhpcy5sb2FkSXRlbS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5zZXREYXRhLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlcldyYXBwZXIuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyRm9ybS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bG9hZEl0ZW0oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKHtcblx0XHRcdCdfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJylcblx0XHR9KVsnJCcgKyAodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmxvYWRBY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTildKCk7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnJlbmRlcignZGVmYXVsdCcsIHRoaXMuZ2V0RGF0YSgpLCB7fSk7XG5cdH1cblxuXHRyZW5kZXJGb3JtKCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aGlzLmZvcm0gPSBuZXcgbm90Rm9ybSh7XG5cdFx0XHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0YWN0aW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfQUNUSU9OLFxuXHRcdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS50YXJnZXRRdWVyeScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0XHRwcmVmaXg6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5wcmVmaXgnKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdwcmVmaXgnKSxcblx0XHRcdFx0XHRcdHJvbGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5yb2xlJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygncm9sZScpLFxuXHRcdFx0XHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdFx0ZmlsZTogKHBhcmFtcykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGxldCBmaWxlcyA9IHBhcmFtcy5lLnRhcmdldC5maWxlcyB8fCBwYXJhbXMuZS5kYXRhVHJhbnNmZXIuZmlsZXM7XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZmlsZSBjaGFuZ2VkJywgZmlsZXMpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lICYmIGZpbGVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnF1ZWVVcGxvYWQocGFyYW1zLmhlbHBlcnMuZmllbGQubmFtZSwgZmlsZXMpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0c3VibWl0OiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnc3VibWl0IGZvcm0gJywgcGFyYW1zLml0ZW0pO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZXhlY1VwbG9hZHMocGFyYW1zLml0ZW0pXG5cdFx0XHRcdFx0XHRcdFx0XHQudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0bGliczogdGhpcy5nZXRPcHRpb25zKCdsaWJzJyksXG5cdFx0XHRcdFx0XHRcdGFmdGVyU3VibWl0OiB0aGlzLnBhcmVudC5iYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpLFxuXHRcdFx0XHRcdFx0fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmhlbHBlcnMnKSB8fCB7fSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0XHRbJ2FmdGVyUmVzdG9yZScsICdhZnRlclN1Ym1pdCddLCB0aGlzLnBhcmVudC5iYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHJlc29sdmVdXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmVqZWN0KGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKGl0ZW0pIHtcblx0XHRpdGVtWyckJyArICh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfQUNUSU9OKV0oKVxuXHRcdFx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdmb3JtIHNhdmVkJywgcmVzdWx0KTtcblx0XHRcdFx0dGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMuZ2V0TW9kdWxlTmFtZSgpKTtcblx0XHRcdFx0dGhpcy5wYXJlbnQucnVuTGlzdCgpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZm9ybSBub3Qgc2F2ZWQnLCByZXN1bHQpO1xuXHRcdFx0fSk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVEVXBkYXRlO1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0FDVElPTiA9ICdkZWxldGUnO1xuXG5jbGFzcyBDUlVERGVsZXRlIGV4dGVuZHMgbm90Q29udHJvbGxlcntcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpe1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIERlbGV0ZScpO1xuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZWxldGUucHJlbG9hZCcpKVxuXHRcdFx0LnRoZW4oKCk9Pntcblx0XHRcdFx0aWYgKGNvbmZpcm0oJ9Cj0LTQsNC70LjRgtGMINC30LDQv9C40YHRjD8nKSkge1xuXHRcdFx0XHRcdHRoaXMuZGVsZXRlKCk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHRoaXMucGFyZW50LmJhY2tUb0xpc3QoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cblx0ZGVsZXRlKCkge1xuXHRcdGxldCBhY3Rpb24gPSckJysodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGVsZXRlLmFjdGlvbicpfHxPUFRfREVGQVVMVF9BQ1RJT04pO1xuXHRcdHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKHsnX2lkJzogdGhpcy5nZXRPcHRpb25zKCdwYXJhbXMuMCcpfSlbYWN0aW9uXSgpXG5cdFx0XHQudGhlbih0aGlzLnBhcmVudC5iYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRERlbGV0ZTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL3JlY29yZCc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYID0gJ2RldGFpbHNfJyxcblx0T1BUX0RFRkFVTFRfUk9MRV9OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9ERVRBSUxTX1RJVExFID0gJ0RldGFpbHMgZGVmYXVsdCB0aXRsZScsXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04gPSB7fSxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QgPSBbJ29wdGlvbnMnLCAnbWFuaWZlc3QnLCAnYXBwJ107XG5cbmNsYXNzIG5vdERldGFpbHMgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3ByZWZpeCcsIE9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnRzJywgW10pO1xuXHRcdGlmICghdGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuc2V0RGF0YShuZXcgbm90UmVjb3JkKHt9LCB0aGlzLmdldERhdGEoKSkpO1xuXHRcdH1cblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCk7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKCkge1xuXHRcdGxldCBtYW5pZmVzdCA9IHRoaXMuZ2V0TWFuaWZlc3QoKTtcblx0XHRpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QuYWN0aW9ucykge1xuXHRcdFx0cmV0dXJuIG1hbmlmZXN0LmFjdGlvbnMuaGFzT3duUHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKSkgPyBtYW5pZmVzdC5hY3Rpb25zW3RoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJyldIDogbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlzdCgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0cm9sZSA9IHRoaXMuZ2V0T3B0aW9ucygncm9sZScsIE9QVF9ERUZBVUxUX1JPTEVfTkFNRSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpIHtcblx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcykge1xuXHRcdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMuaGFzT3duUHJvcGVydHkocm9sZSkpIHtcblx0XHRcdFx0XHRsaXN0ID0gYWN0aW9uRGF0YS5maWVsZHNbcm9sZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdH1cblxuXHRnZXRQYXJ0VGVtcGxhdGVOYW1lKGZvcm1QYXJ0KSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcylcblx0XHRcdFx0XHRdXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfREVUQUlMU19USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0RmllbGRzTGlzdCgpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZpZWxkc0xpc3QoKVt0XTtcblx0XHRcdFx0dGhpcy5hZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsZWFyRmllbGRzQ29tcG9uZW50cygpIHtcblx0XHRsZXQgY29tcHMgPSB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKTtcblx0XHR3aGlsZSAoY29tcHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29tcHNbMF0uY29tcG9uZW50LmRlc3Ryb3koKTtcblx0XHRcdGNvbXBzLnNwbGljZSgwLCAxKTtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHNMaWJzKCkge1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRvcHRpb25zOiB7fSxcblx0XHRcdG1hbmlmZXN0OiB7fSxcblx0XHRcdGFwcDoge30sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAobm90Q29tbW9uLmdldEFwcCgpICYmIG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0LmFwcCA9IG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkICYmIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkpIHtcblx0XHRcdHJlc3VsdC5tYW5pZmVzdCA9IHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkuZmllbGRzO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpIHtcblx0XHRsZXQgZGVmID0gT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTixcblx0XHRcdGZpZWxkc0xpYnMgPSB0aGlzLmdldEZpZWxkc0xpYnMoKTtcblx0XHRmb3IgKGxldCB0IG9mIE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUKSB7XG5cdFx0XHRpZiAoZmllbGRzTGlicy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBmaWVsZHNMaWJzW3RdLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIGZpZWxkc0xpYnNbdF1bZmllbGROYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSkge1xuXHRcdGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSxcblx0XHRcdHJlYyA9IG51bGw7XG5cdFx0aWYgKGZpZWxkVHlwZS5jb21wb25lbnQpIHtcblx0XHRcdHJlYyA9IHRoaXMuY2FzdEN1c3RvbShmaWVsZE5hbWUsIGZpZWxkVHlwZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlYyA9IHRoaXMuY2FzdENvbW1vbihmaWVsZE5hbWUsIGZpZWxkVHlwZSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGNhc3RDdXN0b20oZmllbGROYW1lLCBmaWVsZFR5cGUpIHtcblx0XHRsZXQgQ3VzdG9tQ29tcG9uZW50ID0gbm90Q29tbW9uLmdldCgnY29tcG9uZW50cycpW2ZpZWxkVHlwZS5jb21wb25lbnRdO1xuXHRcdGxldCByZWMgPSB7XG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRuYW1lOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHRpdGxlOiBmaWVsZFR5cGUubGFiZWwgfHwgZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHR0eXBlOiBmaWVsZFR5cGUudHlwZSxcblx0XHRcdFx0bGFiZWw6IGZpZWxkVHlwZS5sYWJlbCxcblx0XHRcdFx0YXJyYXk6IGZpZWxkVHlwZS5hcnJheSxcblx0XHRcdFx0ZGVmYXVsdDogZmllbGRUeXBlLmRlZmF1bHQsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ2hlbHBlcnMnLCAnbGlicycsIGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBDdXN0b21Db21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldFRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCdcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gcmVjO1xuXHR9XG5cblx0Y2FzdENvbW1vbihmaWVsZE5hbWUsIGZpZWxkVHlwZSkge1xuXHRcdGxldCByZWMgPSB7XG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRuYW1lOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHRpdGxlOiBmaWVsZFR5cGUubGFiZWwgfHwgZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHR0eXBlOiBmaWVsZFR5cGUudHlwZSxcblx0XHRcdFx0bGFiZWw6IGZpZWxkVHlwZS5sYWJlbCxcblx0XHRcdFx0YXJyYXk6IGZpZWxkVHlwZS5hcnJheSxcblx0XHRcdFx0ZGVmYXVsdDogZmllbGRUeXBlLmRlZmF1bHQsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ2hlbHBlcnMnLCAnbGlicycsIGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiByZWM7XG5cdH1cblxuXHRnZXRUYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jykge1xuXHRcdGlmICghdGFyZ2V0KSB7XG5cdFx0XHR0YXJnZXQgPSAnYm9keSc7XG5cdFx0fVxuXHRcdGxldCByZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdGlmICghcmVzICYmIHRhcmdldCAhPT0gJ2JvZHknKSB7XG5cdFx0XHR0YXJnZXQgPSAnYm9keSc7XG5cdFx0XHRyZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdH1cblx0XHRpZiAoIXJlcyAmJiB0YXJnZXQgPT0gJ2JvZHknKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gcmVzO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0RGF0YSBtYW5hZ2VtZW50XG5cdCovXG5cblx0dXBkYXRlRmllbGQoZmllbGROYW1lKSB7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmZpZWxkLm5hbWUgPT09IGZpZWxkTmFtZSkge1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3REZXRhaWxzO1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90RGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL25vdERldGFpbHMuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTiA9ICdnZXQnLFxuXHRPUFRfREVGQVVMVF9WSUVXID0gJ2RldGFpbHMnO1xuXG5jbGFzcyBDUlVERGV0YWlscyBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIERldGFpbHMnKTtcblx0XHR0aGlzLnNldFZpZXdzKHtcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmNvbW1vbicpIHx8IHRydWUsXG5cdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmNvbnRhaW5lclNlbGVjdG9yJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSxcblx0XHRcdFx0aGVscGVyczoge31cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMubG9hZEl0ZW0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlckRldGFpbHMuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGxvYWRJdGVtKCkge1xuXHRcdHJldHVybiB0aGlzLm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSh7XG5cdFx0XHQnX2lkJzogdGhpcy5nZXRPcHRpb25zKCdwYXJhbXMuMCcpXG5cdFx0fSlbJyQnICsgKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04pXSgpO1xuXHR9XG5cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdGxldCBpdGVtID0gdGhpcy5nZXREYXRhKCk7XG5cdFx0dmFyIGhlbHBlcnMgPSB7XG5cdFx0XHRJRDogaXRlbSA/IGl0ZW1bdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICsgJ0lEJ10gOiAnJyxcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdGFycmF5OiBmYWxzZVxuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZTogKHBhcmFtcykgPT4ge1xuXHRcdFx0XHR0aGlzLmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZShbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpLCBwYXJhbXMuaXRlbS5faWQsICd1cGRhdGUnXS5qb2luKCcvJykpO1xuXHRcdFx0fSxcblx0XHRcdGRlbGV0ZTogKHBhcmFtcykgPT4ge1xuXHRcdFx0XHR0aGlzLmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZShbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpLCBwYXJhbXMuaXRlbS5faWQsICdkZWxldGUnXS5qb2luKCcvJykpO1xuXHRcdFx0fSxcblx0XHRcdGxpbmtCYWNrVG9MaXN0OiB0aGlzLnBhcmVudC5saW5rQmFja1RvTGlzdC5iaW5kKHRoaXMucGFyZW50KSxcblx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5zaW5nbGUnKVxuXHRcdH07XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0JywgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRyZW5kZXJEZXRhaWxzKCkge1xuXHRcdGxldCBpdGVtID0gdGhpcy5nZXREYXRhKCk7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdG5ldyBub3REZXRhaWxzKHtcblx0XHRcdFx0XHRkYXRhOiBpdGVtLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnRhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG5cdFx0XHRcdFx0XHRhY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04sXG5cdFx0XHRcdFx0XHRwcmVmaXg6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMucHJlZml4JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygncHJlZml4JyksXG5cdFx0XHRcdFx0XHRyb2xlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnJvbGUnKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdyb2xlJyksXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdFx0bGlua0JhY2tUb0xpc3Q6IHRoaXMucGFyZW50LmxpbmtCYWNrVG9MaXN0KCksXG5cdFx0XHRcdFx0XHRcdGxpYnM6IHRoaXMuZ2V0T3B0aW9ucygnbGliJyksXG5cdFx0XHRcdFx0XHRcdElEOiBpdGVtW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSArICdJRCddLFxuXHRcdFx0XHRcdFx0XHRfX3ZlcnNpb246IGl0ZW0uX192ZXJzaW9uLFxuXHRcdFx0XHRcdFx0fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5oZWxwZXJzJykgfHwge30pXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVUREZXRhaWxzO1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgQ1JVRENyZWF0ZSBmcm9tICcuL0NyZWF0ZSc7XG5pbXBvcnQgQ1JVRExpc3QgZnJvbSAnLi9MaXN0JztcbmltcG9ydCBDUlVEVXBkYXRlIGZyb20gJy4vVXBkYXRlJztcbmltcG9ydCBDUlVERGVsZXRlIGZyb20gJy4vRGVsZXRlJztcbmltcG9ydCBDUlVERGV0YWlscyBmcm9tICcuL0RldGFpbHMnO1xuXG5cbmNsYXNzIENSVURDb250cm9sbGVyIGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKGFwcCwgcGFyYW1zKSB7XG5cdFx0bm90Q29tbW9uLmxvZygncnVubmluZyBDUlVEQ29udHJvbGxlcicpO1xuXHRcdHN1cGVyKGFwcCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCduYW1lcycsIHtcblx0XHRcdHBsdXJhbDogJ3BsdXJhbCcsXG5cdFx0XHRzaW5nbGU6ICdzaW5nbGUnLFxuXHRcdH0pO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJywgdGhpcy5hcHAuZ2V0T3B0aW9ucygnY3J1ZC5jb250YWluZXJTZWxlY3RvcicpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJvdXRlKHBhcmFtcyA9IFtdKXtcblx0XHRpZihwYXJhbXMubGVuZ3RoPT0xKXtcblx0XHRcdGlmKHBhcmFtc1swXSA9PT0gJ2NyZWF0ZScpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5DcmVhdGUocGFyYW1zKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5EZXRhaWxzKHBhcmFtcyk7XG5cdFx0XHR9XG5cdFx0fWVsc2UgaWYocGFyYW1zLmxlbmd0aCA9PSAyKXtcblx0XHRcdGlmIChwYXJhbXNbMV0gPT09ICdkZWxldGUnKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMucnVuRGVsZXRlKHBhcmFtcyk7XG5cdFx0XHR9ZWxzZSBpZihwYXJhbXNbMV0gPT09ICd1cGRhdGUnKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMucnVuVXBkYXRlKHBhcmFtcyk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdGxldCByb3V0ZVJ1bm5lck5hbWUgPSAncnVuJyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIocGFyYW1zWzBdKTtcblx0XHRcdFx0aWYodGhpc1tyb3V0ZVJ1bm5lck5hbWVdICYmIHR5cGVvZiB0aGlzW3JvdXRlUnVubmVyTmFtZV0gPT09ICdmdW5jdGlvbicpe1xuXHRcdFx0XHRcdHJldHVybiB0aGlzW3JvdXRlUnVubmVyTmFtZV0ocGFyYW1zKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5ydW5MaXN0KHBhcmFtcyk7XG5cdH1cblxuXHRydW5DcmVhdGUocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVEQ3JlYXRlKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5MaXN0KHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRExpc3QodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bkRldGFpbHMocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVERGV0YWlscyh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuRGVsZXRlKHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRERlbGV0ZSh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuVXBkYXRlKHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRFVwZGF0ZSh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0b25BZnRlclJlbmRlcigpe1xuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG5cdGJhY2tUb0xpc3QoKSB7XG5cdFx0dGhpcy5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUodGhpcy5nZXRNb2R1bGVOYW1lKCkpO1xuXHR9XG5cblx0bGlua0JhY2tUb0xpc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TW9kdWxlTmFtZSgpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURDb250cm9sbGVyO1xuIiwiaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aC5qcyc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4uL25vdFJvdXRlcic7XG5cbnZhciBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgPSB7XG5cdGNvbnRlbnQ6IGZ1bmN0aW9uIChzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMuaW5kZXhPZignY2FwaXRhbGl6ZScpID4gLTEpIHtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdC50b1VwcGVyQ2FzZSgpO1xuXHRcdH1cblx0XHRzY29wZS5lbGVtZW50LnRleHRDb250ZW50ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0O1xuXHR9LFxuXHRiaW5kOiBmdW5jdGlvbiAoc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5iaW5kcykge1xuXHRcdFx0aWYgKHNjb3BlLmVsZW1lbnQuYmluZHMuaGFzT3duUHJvcGVydHkoc2NvcGUucGFyYW1zWzBdKSkge1xuXHRcdFx0XHRpZiAoc2NvcGUuZWxlbWVudC5iaW5kc1tzY29wZS5wYXJhbXNbMF1dLmluZGV4T2Yoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbikgPiAtMSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoc2NvcGUucGFyYW1zWzBdLCAoZSkgPT4ge1xuXHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDEgfHwgc2NvcGUucGFyYW1zWzFdICE9PSAnZGVmYXVsdCcpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRyZXR1cm4gc2NvcGUuYXR0cmlidXRlUmVzdWx0KHtcblx0XHRcdFx0XHRzY29wZSxcblx0XHRcdFx0XHRpdGVtLFxuXHRcdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdFx0ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH0sIGZhbHNlKTtcblx0XHRpZiAoIXNjb3BlLmVsZW1lbnQuaGFzT3duUHJvcGVydHkoJ2JpbmRzJykpIHtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYmluZHMgPSB7fTtcblx0XHR9XG5cdFx0aWYgKCFzY29wZS5lbGVtZW50LmJpbmRzLmhhc093blByb3BlcnR5KHNjb3BlLnBhcmFtc1swXSkpIHtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYmluZHNbc2NvcGUucGFyYW1zWzBdXSA9IFtdO1xuXHRcdH1cblx0XHRpZiAoc2NvcGUuZWxlbWVudC5iaW5kc1tzY29wZS5wYXJhbXNbMF1dLmluZGV4T2Yoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbikgPT09IC0xKSB7XG5cdFx0XHRzY29wZS5lbGVtZW50LmJpbmRzW3Njb3BlLnBhcmFtc1swXV0ucHVzaChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uKTtcblx0XHR9XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbiAoc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgbGl2ZUV2ZW50cyA9IFsnY2hhbmdlJywgJ2tleXVwJ10sXG5cdFx0XHRvbkV2ZW50ID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAoWydjaGVja2JveCcsICdyYWRpbycsICdzZWxlY3QtbXVsdGlwbGUnXS5pbmRleE9mKHNjb3BlLmVsZW1lbnQudHlwZSkgPiAtMSkge1xuXHRcdFx0XHRcdHN3aXRjaCAoc2NvcGUuZWxlbWVudC50eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnY2hlY2tib3gnOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAncmFkaW8nOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGhlbHBlcnMuZmllbGQubmFtZSwgaGVscGVycy5kYXRhLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQ/c2NvcGUuZWxlbWVudC52YWx1ZTpudWxsKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCA/IHNjb3BlLmVsZW1lbnQudmFsdWUgOiBudWxsKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3NlbGVjdC1tdWx0aXBsZSc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGxldCBzZWxlY3RlZCA9IFtdLnNsaWNlLmNhbGwoc2NvcGUuZWxlbWVudC5zZWxlY3RlZE9wdGlvbnMpLm1hcChhID0+IGEudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCdzZWxlY3QtbXVsdGlwbGUnLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpLCAnIC0+ICcsc2NvcGUuZWxlbWVudC52YWx1ZSk7XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2NvcGUuZWxlbWVudC52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHRcdGlmIChzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlICE9PSB0cnVlKSB7XG5cdFx0XHRpZiAoc2NvcGUuZWxlbWVudC50eXBlID09PSAndGV4dGFyZWEnKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGxldCB0IG9mIGxpdmVFdmVudHMpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHQsIG9uRXZlbnQpO1xuXHRcdFx0fVxuXHRcdFx0c2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSA9IHRydWU7XG5cdFx0fVxuXHR9LFxuXHRhdHRyOiBmdW5jdGlvbiAoc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykgfHwgbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKSA/IHJlcyh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXMpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKHNjb3BlLnBhcmFtc1swXSwgc2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0fSxcblx0bmFtZTogZnVuY3Rpb24gKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24gKCAvKnNjb3BlLCBpdGVtLCBoZWxwZXJzKi8gKSB7XG5cblx0fSxcblx0Y2hlY2tlZDogZnVuY3Rpb24gKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykgPyByZXN1bHQoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzdWx0KTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPyBzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpIDogc2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcblx0fSxcblx0Y2xhc3M6IGZ1bmN0aW9uIChzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpID8gcmVzKHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlcyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPCAzIHx8IGlzTmFOKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpIHtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IHVzZWQgPSBmYWxzZTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcGUucGFyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChpID09PSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0XHR1c2VkID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCF1c2VkKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0b3B0aW9uczogZnVuY3Rpb24gKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0b3B0aW9uID0gbnVsbCxcblx0XHRcdHZhbHVlRmllbGROYW1lID0gJ3ZhbHVlJyxcblx0XHRcdGxhYmVsRmllbGROYW1lID0gJ25hbWUnLFxuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGQnKSAmJiBoZWxwZXJzLmZpZWxkLmhhc093blByb3BlcnR5KCduYW1lJykgPyBoZWxwZXJzLmZpZWxkLm5hbWUgOiAndmFsdWUnO1xuXHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzJdO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIGhlbHBlcnMgIT09IG51bGwgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpICYmIGhlbHBlcnMuZGVmYXVsdCkge1xuXHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsICcnKTtcblx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGhlbHBlcnMucGxhY2Vob2xkZXI7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0dmFyIGxpYiA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxpYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKTtcblx0XHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gbGliW2ldW2xhYmVsRmllbGROYW1lXTtcblx0XHRcdFx0aWYgKGhlbHBlcnMuZmllbGQuYXJyYXkpIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdICYmIEFycmF5LmlzQXJyYXkoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdKSkge1xuXHRcdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXS5pbmRleE9mKGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSA9PT0gbGliW2ldW3ZhbHVlRmllbGROYW1lXSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aHJlZjogZnVuY3Rpb24gKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0aWYgKCFzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkKSB7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgbm90Um91dGVyLmdldEZ1bGxSb3V0ZShzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKTtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdG5vdFJvdXRlci5uYXZpZ2F0ZShub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5ub3RSb3V0ZXJJbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fVxuXHR9LFxuXHQvKlxuXHRuLWtleWJpbmQtW2VudGVyfGxldHRlcnxkaWdpdF0tW2N0cmx8c2hpZnR8YWx0fG1ldGFdKj1cImFjdGlvblBhdGhcIlxuXHQqL1xuXHRrZXliaW5kOiBmdW5jdGlvbiAoc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5rZXliaW5kcykge1xuXHRcdFx0aWYgKHNjb3BlLmVsZW1lbnQua2V5YmluZHMuaGFzT3duUHJvcGVydHkoc2NvcGUucGFyYW1zLmpvaW4oJy0nKSkpIHtcblx0XHRcdFx0aWYgKHNjb3BlLmVsZW1lbnQua2V5YmluZHNbc2NvcGUucGFyYW1zLmpvaW4oJy0nKV0uaW5kZXhPZihzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uKSA+IC0xKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuXHRcdFx0aWYgKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRpZiAoZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gc2NvcGUucGFyYW1zWzBdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCh7XG5cdFx0XHRcdFx0XHRzY29wZSxcblx0XHRcdFx0XHRcdGl0ZW0sXG5cdFx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdFx0ZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LCBmYWxzZSk7XG5cdFx0aWYgKCFzY29wZS5lbGVtZW50Lmhhc093blByb3BlcnR5KCdiaW5kcycpKSB7XG5cdFx0XHRzY29wZS5lbGVtZW50LmtleWJpbmRzID0ge307XG5cdFx0fVxuXHRcdGlmICghc2NvcGUuZWxlbWVudC5rZXliaW5kcy5oYXNPd25Qcm9wZXJ0eShzY29wZS5wYXJhbXMuam9pbignLScpKSkge1xuXHRcdFx0c2NvcGUuZWxlbWVudC5rZXliaW5kc1tzY29wZS5wYXJhbXMuam9pbignLScpXSA9IFtdO1xuXHRcdH1cblx0XHRpZiAoc2NvcGUuZWxlbWVudC5rZXliaW5kc1tzY29wZS5wYXJhbXMuam9pbignLScpXS5pbmRleE9mKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24pID09PSAtMSkge1xuXHRcdFx0c2NvcGUuZWxlbWVudC5rZXliaW5kc1tzY29wZS5wYXJhbXMuam9pbignLScpXS5wdXNoKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24pO1xuXHRcdH1cblx0fVxufTtcbmV4cG9ydCBkZWZhdWx0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYjtcbiIsIi8qXG5cdENvbW1vbiBmdW5jdGlvbnNcbiovXG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbi8qXG5cdGZyYW1ld29yayB3aWRlIHBhcnNlciBmb3IgZGF0YSBhY2Nlc3NcbiovXG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuL25vdFJvdXRlcic7XG5cbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuLypcblx0YmFzaWMgZXZlbnQgaGFuZGxlcnMgYW5kIGNvcmUgZGF0YSBtb2RpZmllcnNcbiovXG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuLypcblx0c21hcnRlciBpbWFnZSBjb250cm9sXG4qL1xuaW1wb3J0IG5vdEltYWdlIGZyb20gJy4vdGVtcGxhdGUvbm90SW1hZ2UnO1xuLypcblx0YXBwbGljYXRpb24gbWFpbiBpbmZyYXN0cnVjdHVyZSBzZXR0ZXJcbiovXG5pbXBvcnQgbm90QXBwIGZyb20gJy4vbm90QXBwJztcbi8qXG5cdHVzZXIgY29udHJvbGxlcnNcbiovXG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuL25vdENvbnRyb2xsZXInO1xuXG5pbXBvcnQge1xuXHRDUlVEQ29udHJvbGxlcixcblx0Q1JVRENyZWF0ZSxcblx0Q1JVRERlbGV0ZSxcblx0Q1JVRERldGFpbHMsXG5cdENSVURMaXN0LFxuXHRDUlVEVXBkYXRlXG59IGZyb20gJy4vQ1JVRCc7XG5cbi8qXG5cdHRlbXBsYXRpbmcgYW5kIGNvbW1vbiBzdHJ1Y3R1cmVzXG4qL1xuXG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RSZW5kZXJlcic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnOyAvLyBzbWFydGVyIHdpdGggYmluZGluZ3MgZm9yIGV2ZW50cywgYWN0dWFseSBwcm94eVxuXG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbm90Rm9ybSc7XG5pbXBvcnQgbm90VGFibGUgZnJvbSAnLi9jb21wb25lbnRzL25vdFRhYmxlJztcbmltcG9ydCBub3REZXRhaWxzIGZyb20gJy4vY29tcG9uZW50cy9ub3REZXRhaWxzJztcblxuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL3JlY29yZCc7IC8vXHR3cmFwcGVyIGZvciBkYXRhIHdpdGggc2VydmVyPC0+dmlldyBsaXZlIGludGVyYWN0aW9uc1xuaW1wb3J0IHtcblx0bm90UmVjb3JkSW50ZXJmYWNlXG59IGZyb20gJy4vcmVjb3JkJzsgLy9cdGhvdyB0byBpbnRlcmFjdCB3aXRoIGRhdGEgb24gc2VydmVyXG5cbm5vdFRlbXBsYXRlUHJvY2Vzc29ycy5hZGQobm90VGVtcGxhdGVQcm9jZXNzb3JzTGliKTtcblxuZXhwb3J0IHtcblx0bm90Q29tbW9uLFxuXHRub3RQYXRoLFxuXHRub3RCYXNlLFxuXHRub3RJbWFnZSxcblx0bm90QXBwLFxuXHRub3RBUEksXG5cdG5vdENvbnRyb2xsZXIsXG5cdENSVURDb250cm9sbGVyLFxuXHRDUlVEQ3JlYXRlLFxuXHRDUlVERGVsZXRlLFxuXHRDUlVERGV0YWlscyxcblx0Q1JVRExpc3QsXG5cdENSVURVcGRhdGUsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29ycyxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLFxuXHRub3RUZW1wbGF0ZUNhY2hlLFxuXHRub3RSZW5kZXJlcixcblx0bm90Q29tcG9uZW50LFxuXHRub3RGb3JtLFxuXHRub3RSb3V0ZXIsXG5cdG5vdFRhYmxlLFxuXHRub3REZXRhaWxzLFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJ1cGxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25Qcm9ncmVzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNwb25zZVR5cGUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ3aXRoQ3JlZGVudGlhbHMiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsImdldFNlc3Npb25JRCIsImZpbGUiLCJ0eXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwibmFtZSIsInNlbmQiLCJtZXRob2QiLCJkYXRhIiwib25sb2FkIiwidCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJwYXJzZUludCIsInJlc3BvbnNlVGV4dCIsImUiLCJnZXRDb29raWUiLCJ2YWx1ZSIsImRvY3VtZW50IiwiY29va2llIiwicGFydHMiLCJzcGxpdCIsImxlbmd0aCIsInBvcCIsInNoaWZ0IiwiTE9HIiwiQ29tbW9uTG9ncyIsIm5vdEZyYW1ld29yayIsIm5vdENvbW1vbiIsImVycm9yIiwiYXJndW1lbnRzIiwibG9nIiwidHJhY2UiLCJyZWdpc3RlciIsIk1BTkFHRVIiLCJTeW1ib2wiLCJDb21tb25TaG9ydHMiLCJnZXRNYW5hZ2VyIiwiZ2V0QVBJIiwidiIsIkNvbW1vbk9iamVjdHMiLCJkZWZhdWx0cyIsIm9wdGlvbnMiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0Iiwic291cmNlcyIsImZvckVhY2giLCJkZXNjcmlwdG9ycyIsImtleXMiLCJzb3VyY2UiLCJyZWR1Y2UiLCJrZXkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJkZXNjcmlwdG9yIiwic3ltIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJiaWciLCJzbWFsbCIsIm9iaiIsImZpbHRlciIsImNvbnRhaW5zT2JqIiwiaWNvbnMiLCJiYXRjaCIsImdldERhdGEiLCJwdXNoIiwiYSIsImIiLCJwIiwiZXF1YWwiLCJ0b1N0cmluZyIsImRlZmF1bHRWYWx1ZSIsIm9iajEiLCJvYmoyIiwialF1ZXJ5IiwiZXh0ZW5kIiwidmFsIiwicmVnaXN0cnkiLCJhcnJheSIsIm9sZF9pbmRleCIsIm5ld19pbmRleCIsImsiLCJ1bmRlZmluZWQiLCJzcGxpY2UiLCJDb21tb25TdHJpbmdzIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIkNvbW1vbkFwcCIsInN0YXJ0ZXIiLCJhc3NpZ24iLCJleHRlbmRXaXRoIiwiU1VCX1BBVEhfU1RBUlQiLCJTVUJfUEFUSF9FTkQiLCJQQVRIX1NQTElUIiwiUEFUSF9TVEFSVF9PQkpFQ1QiLCJQQVRIX1NUQVJUX0hFTFBFUlMiLCJGVU5DVElPTl9NQVJLRVIiLCJNQVhfREVFUCIsIm5vdFBhdGgiLCJwYXRoIiwic3ViUGF0aCIsImZpbmQiLCJzdWIiLCJwYXJzZWQiLCJzdWJmIiwicmVwbGFjZSIsIml0ZW0iLCJoZWxwZXJzIiwiZmluZE5leHRTdWJQYXRoIiwic3ViUGF0aFBhcnNlZCIsImdldFZhbHVlQnlQYXRoIiwicmVwbGFjZVN1YlBhdGgiLCJwYXJzZVN1YnMiLCJhdHRyVmFsdWUiLCJzZXRWYWx1ZUJ5UGF0aCIsImlzUmVjb3JkIiwibm9ybWlsaXplUGF0aCIsInRyaWdnZXIiLCJzZXQiLCJzdGVwIiwiaGVscGVyIiwiclN0ZXAiLCJBcnJheSIsImlzQXJyYXkiLCJwYXJzZVBhdGhTdGVwIiwib2JqZWN0IiwiYXR0clBhdGgiLCJhdHRyTmFtZSIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfTUVUSE9EX0lOSVQiLCJNRVRBX0VWRU5UUyIsIk1FVEFfREFUQSIsIk1FVEFfV09SS0lORyIsIk1FVEFfT1BUSU9OUyIsIm5vdEJhc2UiLCJpbnB1dCIsImV2ZW50cyIsIm9uIiwic2V0RGF0YSIsInNldFdvcmtpbmciLCJ3b3JraW5nIiwic2V0T3B0aW9ucyIsIndoYXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsImZyb20iLCJldmVudE5hbWUiLCJnIiwiZXZlbnQiLCJvZmYiLCJjYWxsYmFja3MiLCJoIiwidGFyZ2V0SWQiLCJpbmZvIiwicmVwb3J0IiwiT1BUX01PREVfSElTVE9SWSIsIk9QVF9NT0RFX0hBU0giLCJPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCIsIm5vdFJvdXRlciIsInJvb3QiLCJjbGVhclNsYXNoZXMiLCJyZSIsImhhbmRsZXIiLCJydWxlIiwiYWRkIiwicGFyYW0iLCJyIiwiZnJhZ21lbnQiLCJsb2NhdGlvbiIsImRlY29kZVVSSSIsInBhdGhuYW1lIiwic2VhcmNoIiwid2luZG93IiwibWF0Y2giLCJocmVmIiwiY3VycmVudCIsImdldEZyYWdtZW50IiwiaW5pdCIsImlzSW5pdGlhbGl6ZWQiLCJjaGVjayIsInNldEluaXRpYWxpemVkIiwibG9vcEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjaGVja0xvY2F0aW9uIiwiYmluZCIsImhyZWZDbGljayIsImZ1bGxSRSIsImFwcGx5IiwiaG9zdCIsInB1c2hTdGF0ZSIsImdldEZ1bGxSb3V0ZSIsImJvZHkiLCJnZXRBbGxMaW5rcyIsImluaXRSZXJvdXRpbmciLCJnZXRBdHRyaWJ1dGUiLCJsaW5rIiwibm90Um91dGVySW5pdGlhbGl6ZWQiLCJmdWxsTGluayIsInByZXZlbnREZWZhdWx0IiwibmF2aWdhdGUiLCJub3RBUElPcHRpb25zIiwibm90QVBJUXVlZSIsInJlcXVlc3RzUGVyU2Vjb25kIiwicXVlZSIsImludCIsImluUHJvZ3Jlc3MiLCJ0b0NhbGwiLCJjbGVhckludGVydmFsIiwicnVuIiwibm90QVBJQ2FjaGUiLCJ0dGwiLCJidWNrZXQiLCJEYXRlIiwiZ2V0VGltZSIsInZhbGlkVGlsbCIsInVuc2V0Iiwibm90QVBJIiwiY2FjaGUiLCJpZCIsImdvb2QiLCJiYWQiLCJtYWtlUmVxdWVzdCIsInJlc3BvbnNlT0siLCJyZXNwb25zZUZhaWxlZCIsInJlcXVlc3RKU09OIiwidGhlbiIsIm5leHQiLCJjYXRjaCIsImdldElkIiwibW9kZWxOYW1lIiwiZ2V0TW9kZWxOYW1lIiwibWFrZVVybCIsImdldEpTT04iLCJub3RJbWFnZSIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCIsIlRFTVBMQVRFX1RBRyIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYIiwiQ09NUE9ORU5UX0lEX1BSRUZJWCIsIlBBUlRfSURfUFJFRklYIiwiREVGQVVMVF9QTEFDRVIiLCJERUZBVUxUX1BMQUNFUl9MT09QIiwiT1BUUyIsIk1FVEFfQ0FDSEUiLCJub3RUZW1wbGF0ZUNhY2hlIiwiaGlkZVRlbXBsYXRlcyIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJtYXAiLCJsb2FkT25lIiwiY2FsbGJhY2siLCJvUmVxdWVzdCIsImRpdiIsImRhdGFzZXQiLCJub3RUZW1wbGF0ZU5hbWUiLCJub3RUZW1wbGF0ZVVSTCIsInNyY0VsZW1lbnQiLCJzZXRPbmUiLCJlbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJhZGRGcm9tVGV4dCIsImNsb25lTm9kZSIsImNvbnQiLCJ0ZXh0Iiwibm90VGVtcGxhdGVzRWxlbWVudHMiLCJlbElkIiwicGFyZW50Tm9kZSIsImxpYiIsImdldEhUTUwiLCJ0ZW1wbGF0ZUlubmVySFRNTCIsInRlbXBsYXRlQ29udEVsIiwid3JhcCIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZIiwiREVGQVVMVF9GSUxURVIiLCJERUZBVUxUX1BBR0VfTlVNQkVSIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJNRVRBX1JFVFVSTl9UT19ST09UIiwiTUVUQV9QUk9YWSIsIk1FVEFfSU5URVJGQUNFIiwiTUVUQV9DSEFOR0UiLCJNRVRBX0NIQU5HRV9ORVNURUQiLCJNRVRBX1NBTCIsIk1FVEFfTUFQX1RPX0lOVEVSRkFDRSIsIkRFRkFVTFRfQUNUSU9OX1BSRUZJWCIsIm5vdEludGVyZmFjZSIsIm1hbmlmZXN0IiwibGluZSIsInJlY29yZCIsImFjdGlvbk5hbWUiLCJyZWNvcmRSRSIsImZpZWxkTmFtZSIsImluZCIsImxlbiIsImluZDIiLCJzdGFydFNsaWNlIiwiZW5kU2xpY2UiLCJnZXRBdHRyIiwibW9kZWwiLCJhY3Rpb25EYXRhIiwicGFyc2VMaW5lIiwicG9zdEZpeCIsInJlc3VsdElkIiwicHJlZml4ZXMiLCJpbmRleCIsImNvbmNhdCIsInByZSIsImdldEFjdGlvbnMiLCJhY3Rpb25zIiwic2V0RmlsdGVyIiwiZmlsdGVyRGF0YSIsInNvcnRlckRhdGEiLCJwYWdlTnVtYmVyIiwicGFnZVNpemUiLCJzZXRQYWdlciIsInJlcXVlc3REYXRhIiwiZGF0YVByb3ZpZGVyTmFtZSIsImNhcGl0YWxpemVGaXJzdExldHRlciIsImdldEFjdGlvbkRhdGEiLCJyZXF1ZXN0UGFyYW1zIiwiY29sbGVjdFJlcXVlc3REYXRhIiwicmVxdWVzdFBhcmFtc0VuY29kZWQiLCJlbmNvZGVSZXF1ZXN0IiwiZ2V0SUQiLCJnZXRVUkwiLCJxdWVlUmVxdWVzdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJhZnRlclN1Y2Nlc3NSZXF1ZXN0Iiwibm90UmVjb3JkIiwiY3JlYXRlUHJvcGVydHlIYW5kbGVycyIsIm93bmVyIiwiY29udGV4dCIsInJlc1RhcmdldCIsIlJlZmxlY3QiLCJFcnJvciIsInZhbHVlVG9SZWZsZWN0Iiwibm90UmVjb3JkUHJvcGVydHkiLCJnZXRSb290IiwicGF0aFRvIiwiaXNQcm94eSIsImlzUHJvcGVydHkiLCJQcm94eSIsInByb3h5IiwiY3JlYXRlUmVjb3JkSGFuZGxlcnMiLCJjcmVhdGVDb2xsZWN0aW9uIiwibm90UmVjb3JkSW50ZXJmYWNlIiwiaW5pdFByb3BlcnRpZXMiLCJpbnRlcmZhY2VVcCIsImN1clBhdGgiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiaXRlbXMiLCJjb2xsZWN0aW9uIiwiZ2V0QWN0aW9uc0NvdW50IiwiYWN0aW9uVXAiLCJyZXF1ZXN0Iiwib2JqZWN0UGFydCIsInNldEF0dHIiLCJzZXRGaW5kQnkiLCJyZXNldEZpbHRlciIsImdldEZpbHRlciIsInNldFNvcnRlciIsImdldFNvcnRlciIsInNldFBhZ2VOdW1iZXIiLCJzZXRQYWdlU2l6ZSIsInJlc2V0UGFnZXIiLCJnZXRQYWdlciIsIk9QVF9DT05UUk9MTEVSX1BSRUZJWCIsIk9QVF9SRUNPUkRfUFJFRklYIiwibm90QXBwIiwicmVzb3VyY2VzIiwicHJlSW5pdFJvdXRlciIsImluaXRNYW5hZ2VyIiwiaW5pdEFQSSIsImluaXRUZW1wbGF0ZXMiLCJzZXRNYW5hZ2VyIiwiYXBpIiwic2V0QVBJIiwicHJvbSIsImFkZExpYkZyb21VUkwiLCJpbml0TWFuaWZlc3QiLCJzZXRJbnRlcmZhY2VNYW5pZmVzdCIsInNldFJvb3QiLCJyZVJvdXRlRXhpc3RlZCIsInJvdXRpZUlucHV0Iiwicm91dGVCbG9jayIsInBhdGhzIiwiY29udHJvbGxlciIsImJpbmRDb250cm9sbGVyIiwiYWRkTGlzdCIsImxpc3RlbiIsInVwZGF0ZSIsInVwZGF0ZUludGVyZmFjZXMiLCJpbml0Q29udHJvbGxlciIsImFsbFJlc291cmNlc1JlYWR5Iiwic3RhcnRBcHAiLCJpbml0Um91dGVyIiwiY29udHJvbGxlck5hbWUiLCJhcHAiLCJjdHJsIiwiY2xlYXJJbnRlcmZhY2VzIiwibWFuaWZlc3RzIiwicmVjb3JkTWFuaWZlc3QiLCJyZWNvcmREYXRhIiwib25SZXNvdXJjZVJlYWR5IiwiTUVUQV9QUk9DRVNTT1JTIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzIiwic2V0UHJvY2Vzc29yIiwiZ2V0UHJvY2Vzc29yIiwiTUVUQV9DT01QT05FTlRTIiwibm90UmVuZGVyZXIiLCJyZW5kZXIiLCJjb21wb25lbnQiLCJpbml0RGF0YSIsImluaXRPcHRpb25zIiwiaW5pdFdvcmtpbmciLCJ0ZW1wbGF0ZSIsImluaXRUZW1wbGF0ZSIsIm9uQ2hhbmdlIiwiTWF0aCIsInJhbmRvbSIsImdldEJyZWFkQ3J1bXBzIiwiY2xlYXJTdGFzaCIsInNldFdvcmtpbmdNYXBwaW5nIiwiZXhlY1Byb2Nlc3NvcnMiLCJzZWFyY2hGb3JTdWJUZW1wbGF0ZXMiLCJzdGFzaFJlbmRlcmVkIiwiaWZQYXJ0IiwiY29tcG9uZW50UGF0aCIsImNoYW5nZWRQYXRoIiwiaWZGdWxsU3ViUGF0aCIsImNyZWF0ZU1hcHBpbmciLCJmaW5kQWxsUHJvY2Vzc29ycyIsInByb2NzIiwiZWxzIiwiZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgiLCJnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50IiwicHJvY0RhdGEiLCJwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24iLCJwcm9jZXNzb3JFeHByZXNzaW9uIiwiYXR0cmlidXRlRXhwcmVzc2lvbiIsImlmQ29uZGl0aW9uIiwicGFyYW1zIiwicHJvY2Vzc29yTmFtZSIsIm1hcHBpbmciLCJwcm9jU2NvcGUiLCJhdHRyaWJ1dGVSZXN1bHQiLCJnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0IiwicHJvY05hbWUiLCJwcm9jIiwicmVtb3ZlQXR0cmlidXRlIiwiZGVzdHJveVN1YnMiLCJkZXN0cm95IiwiY2xlYXJTdWJUZW1wbGF0ZXMiLCJnZXRTdGFzaCIsInJlbW92ZUNoaWxkIiwibnRFbCIsIm50UmVuZGVyZWQiLCJzdWJzIiwibnQiLCJpZlN1YkVsZW1lbnRSZW5kZXJlZCIsInJlbmRlclN1YiIsImRldGFpbHMiLCJkYXRhUGF0aCIsIm5vdENvbXBvbmVudCIsImNoaWxkTm9kZXMiLCJhZGRUb1N0YXNoIiwic3Rhc2giLCJuZXdTdGFzaCIsImFuY2hvciIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwibm9kZSIsInBsYWNlIiwidGFyZ2V0RWwiLCJsIiwiY2hpbGRyZW4iLCJ0ZXh0Q29udGVudCIsInJlbmRlcmVkIiwicGxhY2VBZnRlciIsInBsYWNlQmVmb3JlIiwicGxhY2VGaXJzdCIsInBsYWNlTGFzdCIsIm5vdFBsYWNlcnMiLCJNRVRBX1BBUlRTIiwicmVzZXRQYXJ0cyIsInByZXBhcmVUZW1wbGF0ZUVsZW1lbnQiLCJpbml0TWFya0VsZW1lbnQiLCJtYXJrRWwiLCJwbGFjZXIiLCJnZXRQbGFjZXIiLCJ0YXJnZXRRdWVyeSIsIm1haW4iLCJ1bnNldFJlYWR5IiwiaHRtbCIsInNldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiYWRkRnJvbVVSTCIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiY2xlYXJQYXJ0cyIsImRlYWQiLCJvZmZBbGwiLCJmb3JFYWNoRGF0YSIsInJlbmRlclBhcnQiLCJwbGFjZVJlbmRlcmVkIiwicmVtb3ZlT2Jzb2xldGVQYXJ0cyIsImJlZm9yZSIsInBsYWNlUGFydCIsImFmdGVyIiwicGFydCIsImdldFBhcnRCeURhdGEiLCJub2RlcyIsImxhc3ROb2RlIiwibm9kZVR5cGUiLCJnZXRQYXJ0cyIsInJlbmRlcmVyIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSIsImFkZFBhcnQiLCJ1cGRhdGVQYXJ0IiwicGlwZSIsImZpbmRBY3R1YWxQYXJ0cyIsInJlbW92ZU5vdEFjdHVhbFBhcnRzIiwiYWN0dWFsUGFydHMiLCJpc0RhdGEiLCJPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IiLCJPUFRfREVGQVVMVF9WSUVXU19QT1NURklYIiwiT1BUX0RFRkFVTFRfVklFV19OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMIiwiT1BUX0RFRkFVTFRfUExVUkFMX05BTUUiLCJPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSIsIk9QVF9ERUZBVUxUX01PRFVMRV9OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0FORCIsIm5vdENvbnRyb2xsZXIiLCJpbml0UmVuZGVyIiwiaW50ZXJmYWNlcyIsImdldEludGVyZmFjZXMiLCJtYWtlIiwidmlld05hbWUiLCJ2aWV3IiwiZ2V0VmlldyIsInRlbXBsYXRlVVJMIiwicHJlZml4IiwiY29tbW9uIiwiZ2V0TW9kdWxlUHJlZml4IiwicG9zdGZpeCIsInRlbXBsYXRlTmFtZSIsInJlbmRlckFuZCIsInZpZXdzIiwiZ2V0TW9kdWxlTmFtZSIsIiRsaXN0QWxsIiwiZXJyIiwiZmllbGRGaWxlcyIsInNhdmVkRmlsZSIsImhhc2giLCJPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCIsIk9QVF9ERUZBVUxUX1JPTEVfTkFNRSIsIk9QVF9ERUZBVUxUX0ZPUk1fVElUTEUiLCJPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QiLCJub3RGb3JtIiwib25TdWJtaXQiLCJvblJlc2V0Iiwib25DYW5jZWwiLCJnZXRNYW5pZmVzdCIsInJvbGUiLCJyZW5kZXJXcmFwcGVyIiwiZm9ybVBhcnQiLCJnZXRXcmFwcGVyRGF0YSIsImdldFBhcnRUZW1wbGF0ZU5hbWUiLCJiaW5kRm9ybUV2ZW50cyIsInJlbmRlckNvbXBvbmVudHMiLCJ3cmFwcGVyIiwidGl0bGUiLCJnZXRGb3JtRmllbGRzTGlzdCIsImFkZEZpZWxkQ29tcG9uZW50IiwiY29tcHMiLCJnZXRBcHAiLCJkZWYiLCJmaWVsZHNMaWJzIiwiZ2V0RmllbGRzTGlicyIsImZpZWxkVHlwZSIsImdldEZpZWxkc0RlZmluaXRpb24iLCJyZWMiLCJsYWJlbCIsInBsYWNlaG9sZGVyIiwiZGVmYXVsdCIsImZpZWxkIiwiZ2V0Rm9ybVRhcmdldEVsZW1lbnQiLCJjb2xsZWN0RGF0YUZyb21Db21wb25lbnRzIiwiZm9ybSIsIk9QVF9ERUZBVUxUX1ZJRVciLCJPUFRfREVGQVVMVF9BQ1RJT04iLCJPUFRfREVGQVVMVF9JVEVNIiwiQ1JVRENyZWF0ZSIsInBhcmVudCIsInNldFZpZXdzIiwicHJlbG9hZExpYiIsInJlbmRlckZvcm0iLCJpbml0SXRlbSIsImNyZWF0ZURlZmF1bHQiLCJsaW5rQmFja1RvTGlzdCIsImZpbGVzIiwiZGF0YVRyYW5zZmVyIiwicXVlZVVwbG9hZCIsIm5ld0l0ZW0iLCJleGVjVXBsb2FkcyIsImNyZWF0ZSIsImdvVG9UYWJsZSIsImJhY2tUb0xpc3QiLCJPUFRfREVGQVVMVF9QQUdFX1NJWkUiLCJPUFRfREVGQVVMVF9QQUdFX05VTUJFUiIsIk9QVF9ERUZBVUxUX1BBR0VfUkFOR0UiLCJPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTiIsIk9QVF9ERUZBVUxUX0NPVU5UX0FDVElPTiIsIk9QVF9ERUZBVUxUX0xJU1RfQUNUSU9OIiwiT1BUX0RFRkFVTFRfU09SVF9GSUVMRCIsIk9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DIiwibm90VGFibGUiLCJyZXNldFNvcnRlciIsImdvVG9QYWdlIiwiZ29Ub0ZpcnN0IiwiZ29Ub0xhc3QiLCJnb1RvTmV4dCIsImdvVG9QcmV2IiwicGFnaW5hdGlvbiIsInBhZ2VzIiwiaW5pdEF1dG9sb2FkZXIiLCJyZW5kZXJJbnNpZGUiLCJyZW5kZXJIZWFkZXIiLCJ1cGRhdGVEYXRhIiwicmVuZGVyQm9keSIsImJpbmRTZWFyY2giLCJiaW5kQ3VzdG9tQmluZGluZ3MiLCJ0YWJsZUhlYWRlciIsIm5ld1RoIiwic29ydGFibGUiLCJhdHRhY2hTb3J0aW5nSGFuZGxlcnMiLCJoZWFkQ2VsbCIsImNoYW5nZVNvcnRpbmdPcHRpb25zIiwic3R5bGUiLCJjdXJzb3IiLCJzb3J0QnlGaWVsZCIsInNvcnREaXJlY3Rpb24iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJpbnZhbGlkYXRlRGF0YSIsImZpbHRlclNlYXJjaCIsImNsZWFyRmlsdGVyZWREYXRhIiwiaXNMaXZlIiwiY2xlYXJEYXRhIiwiaXNOYU4iLCJnZXREZWZhdWx0UGFnZVNpemUiLCJnZXREZWZhdWx0UGFnZU51bWJlciIsInF1ZXJ5IiwiZ2V0RGF0YUludGVyZmFjZSIsImdldExvYWREYXRhQWN0aW9uTmFtZSIsIm1pbiIsInRvIiwicHJldiIsIm1heCIsImlmVXBkYXRpbmciLCJzZXRVcGRhdGluZyIsImxvYWREYXRhIiwiZ2V0Um93c0NvdW50IiwicmVmcmVzaEJvZHkiLCJzZXRVcGRhdGVkIiwicHJvY2Vzc0RhdGEiLCJ0aGF0RmlsdGVyIiwidGVzdERhdGFJdGVtIiwidGhhdFNvcnRlciIsInNvcnQiLCJpdGVtMSIsIml0ZW0yIiwidDEiLCJ0MiIsImxvY2FsZUNvbXBhcmUiLCJzZWFyY2hFbCIsIm9uRXZlbnQiLCJjdXJyZW50VGFyZ2V0Iiwic2VsZWN0b3IiLCJnZXRPcHRpb24iLCJuZXdSb3ciLCJuZXdUZCIsInByZXByb2Nlc3NlZCIsIml0ZW1JZCIsInRhYmxlQm9keSIsImZpbmRCb2R5IiwidGJvZHkiLCJjbGVhckJvZHkiLCJjaGVja0ZpbHRlcmVkIiwicmVuZGVyUm93IiwidGhpc1BhZ2VTdGFydHMiLCJuZXh0UGFnZUVuZHMiLCJnZXRDb3VudEFjdGlvbk5hbWUiLCJ1cGRhdGVQYWdpbmF0aW9uIiwiY291bnQiLCJpdGVtc0NvdW50IiwiaXRlbXNGcm9tIiwicGFnZXNDb3VudCIsImZsb29yIiwicm91bmQiLCJwYWdlc0Zyb20iLCJwYWdlc1RvIiwiaXRlbXNUbyIsInN0clZhbHVlIiwiZ2V0RmlsdGVyU2VhcmNoIiwidG9Db21wIiwic2Nyb2xsU3B5IiwiJCIsImxvYWROZXh0IiwiQ1JVRExpc3QiLCJ1cGRhdGVEYXRhdGFibGUiLCJ0YWJsZVZpZXciLCJPUFRfREVGQVVMVF9MT0FEX0FDVElPTiIsIkNSVURVcGRhdGUiLCJsb2FkSXRlbSIsInJ1bkxpc3QiLCJDUlVERGVsZXRlIiwiY29uZmlybSIsImRlbGV0ZSIsImFjdGlvbiIsIk9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYIiwiT1BUX0RFRkFVTFRfREVUQUlMU19USVRMRSIsIm5vdERldGFpbHMiLCJnZXRGaWVsZHNMaXN0IiwiY2FzdEN1c3RvbSIsImNhc3RDb21tb24iLCJDdXN0b21Db21wb25lbnQiLCJnZXRUYXJnZXRFbGVtZW50IiwiQ1JVRERldGFpbHMiLCJyZW5kZXJEZXRhaWxzIiwiX2lkIiwiX192ZXJzaW9uIiwiQ1JVRENvbnRyb2xsZXIiLCJydW5DcmVhdGUiLCJydW5EZXRhaWxzIiwicnVuRGVsZXRlIiwicnVuVXBkYXRlIiwicm91dGVSdW5uZXJOYW1lIiwib25BZnRlclJlbmRlciIsIm5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiIsInNjb3BlIiwiYmluZHMiLCJsaXZlRXZlbnRzIiwiY2hlY2tlZCIsInNlbGVjdGVkIiwic2VsZWN0ZWRPcHRpb25zIiwicHJvY2Vzc2VkVmFsdWUiLCJ1c2VkIiwib3B0aW9uIiwidmFsdWVGaWVsZE5hbWUiLCJsYWJlbEZpZWxkTmFtZSIsIml0ZW1WYWx1ZUZpZWxkTmFtZSIsImtleWJpbmRzIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxnQkFBZ0I7VUFDVixpQkFBU0MsR0FBVCxFQUFjO1NBQ2YsS0FBS0MsR0FBTCxDQUFTLE1BQVQsSUFBbUJELEdBQTFCO0VBRmtCO2NBSU4scUJBQVNBLEdBQVQsRUFBYztTQUNuQixLQUFLQyxHQUFMLENBQVMsVUFBVCxJQUF1QkQsR0FBOUI7RUFMa0I7Z0JBT0osdUJBQVNFLFNBQVQsRUFBb0JDLE1BQXBCLEVBQTRCO09BQ3JDLElBQUlDLENBQVQsSUFBY0YsU0FBZCxFQUF5QjtRQUNuQixJQUFJRyxDQUFULElBQWNGLE1BQWQsRUFBc0I7UUFDakJELFVBQVVFLENBQVYsRUFBYUUsY0FBYixDQUE0QkgsT0FBT0UsQ0FBUCxDQUE1QixDQUFKLEVBQTRDO1NBQ3ZDRSxRQUFRLElBQUlDLEtBQUosRUFBWjtXQUNNQyxZQUFOLENBQW1CLGFBQW5CLEVB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
