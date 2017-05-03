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
        _this.preloadLib(_this.parent.getOptions('views.create.preload')).then(_this.initData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderForm.bind(_this)).then(_this.onAfterRender.bind(_this)).catch(notCommon.report);
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
			_this.setData({ rows: [] });
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
					events: [[['afterRender', 'afterUpdate'], this.renderInside.bind(this)]]
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
				while (this.getData('rows').length > 0) {
					this.getData('rows').pop();
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
						data: field.component.data || preprocessed || { val: val, item: item, index: index },
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
		_this.preloadLib(_this.parent.getOptions('views.list.preload')).then(_this.renderWrapper.bind(_this)).then(_this.updateDatatable.bind(_this)).then(_this.onAfterRender.bind(_this)).catch(notCommon.report);
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

		_this.preloadLib(_this.parent.getOptions('views.update.preload')).then(_this.loadItem.bind(_this)).then(_this.setData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderForm.bind(_this)).then(_this.onAfterRender.bind(_this)).catch(notCommon.report);
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

		_this.preloadLib(_this.parent.getOptions('views.details.preload')).then(_this.loadItem.bind(_this)).then(_this.setData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderDetails.bind(_this)).then(_this.onAfterRender.bind(_this)).catch(notCommon.report);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90LWZyYW1ld29yay5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1vbi9uZXQuanMiLCIuLi9zcmMvY29tbW9uL2xvZ3MuanMiLCIuLi9zcmMvY29tbW9uL3Nob3J0cy5qcyIsIi4uL3NyYy9jb21tb24vb2JqZWN0cy5qcyIsIi4uL3NyYy9jb21tb24vc3RyaW5ncy5qcyIsIi4uL3NyYy9jb21tb24vZnVuY3Rpb25zLmpzIiwiLi4vc3JjL2NvbW1vbi9kb20uanMiLCIuLi9zcmMvY29tbW9uL2FwcC5qcyIsIi4uL3NyYy9jb21tb24vaW5kZXguanMiLCIuLi9zcmMvbm90UGF0aC5qcyIsIi4uL3NyYy9ub3RCYXNlLmpzIiwiLi4vc3JjL25vdFJvdXRlci5qcyIsIi4uL3NyYy9hcGkvb3B0aW9ucy5qcyIsIi4uL3NyYy9hcGkvcXVlZS5qcyIsIi4uL3NyYy9hcGkvYXBpLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdEltYWdlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL29wdGlvbnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZS5qcyIsIi4uL3NyYy9ub3RSZWNvcmRJbnRlcmZhY2UuanMiLCIuLi9zcmMvbm90UmVjb3JkLmpzIiwiLi4vc3JjL25vdEFwcC5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90UmVuZGVyZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlQWZ0ZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUJlZm9yZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlRmlyc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUxhc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9yZXBsYWNlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvaW5kZXguanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90Q29tcG9uZW50LmpzIiwiLi4vc3JjL25vdENvbnRyb2xsZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RGb3JtLmpzIiwiLi4vc3JjL0NSVUQvQ3JlYXRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90VGFibGUuanMiLCIuLi9zcmMvQ1JVRC9MaXN0LmpzIiwiLi4vc3JjL0NSVUQvVXBkYXRlLmpzIiwiLi4vc3JjL0NSVUQvRGVsZXRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90RGV0YWlscy5qcyIsIi4uL3NyYy9DUlVEL0RldGFpbHMuanMiLCIuLi9zcmMvQ1JVRC9Db250cm9sbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29tbW9uTmV0d29yayA9IHtcblx0YWRkSG9zdDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdob3N0JykgKyB1cmk7XG5cdH0sXG5cdGFkZFByb3RvY29sOiBmdW5jdGlvbih1cmkpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ3Byb3RvY29sJykgKyB1cmk7XG5cdH0sXG5cdHByZWxvYWRJbWFnZXM6IGZ1bmN0aW9uKGRhdGFBcnJheSwgZmllbGRzKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiBkYXRhQXJyYXkpIHtcblx0XHRcdGZvciAodmFyIGYgaW4gZmllbGRzKSB7XG5cdFx0XHRcdGlmIChkYXRhQXJyYXlbaV0uaGFzT3duUHJvcGVydHkoZmllbGRzW2ZdKSkge1xuXHRcdFx0XHRcdHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0XHRcdGltYWdlLnNldEF0dHJpYnV0ZSgnY3Jvc3NPcmlnaW4nLCAnYW5vbnltb3VzJyk7XG5cdFx0XHRcdFx0aW1hZ2Uuc3JjID0gZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV0uaW5kZXhPZignLy8nKSA9PT0gMCA/IHRoaXMuYWRkUHJvdG9jb2woZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV0pIDogZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdHB1dEZpbGUodXBsb2FkIC8qIG9iamVjdChmaWxlLCBvblByb2dyZXNzLCB1cmwpKi8gKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdGlmICh4aHIudXBsb2FkKSB7XG5cdFx0XHRcdC8vIHByb2dyZXNzIGJhclxuXHRcdFx0XHRpZiAodXBsb2FkLm9uUHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgdXBsb2FkLm9uUHJvZ3Jlc3MsIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBmaWxlIHJlY2VpdmVkL2ZhaWxlZFxuXHRcdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oIC8qZSovICkge1xuXHRcdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHRcdHhoci5vcGVuKCdQVVQnLCB1cGxvYWQudXJsLCB0cnVlKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgdXBsb2FkLmZpbGUudHlwZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYX0ZJTEVOQU1FJywgZW5jb2RlVVJJQ29tcG9uZW50KHVwbG9hZC5maWxlLm5hbWUpKTtcblx0XHRcdFx0eGhyLnNlbmQodXBsb2FkLmZpbGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHJlcXVlc3RKU09OOiBmdW5jdGlvbihtZXRob2QsIHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0cG9zdEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ1BPU1QnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHB1dEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ1BVVCcsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRIVE1MOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gKCkgPT4ge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHBhcnNlSW50KHN0YXR1cykgPT09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKGUpID0+IHJlamVjdChlKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldFNlc3Npb25JRDogZnVuY3Rpb24obmFtZSA9ICdTZXNzaW9uSUQnKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29va2llKG5hbWUpO1xuXHR9LFxuXHRnZXRDb29raWU6IChuYW1lKSA9PiB7XG5cdFx0bGV0IHZhbHVlID0gJzsgJyArIGRvY3VtZW50LmNvb2tpZSxcblx0XHRcdHBhcnRzID0gdmFsdWUuc3BsaXQoJzsgJyArIG5hbWUgKyAnPScpO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggPT0gMikge1xuXHRcdFx0cmV0dXJuIHBhcnRzLnBvcCgpLnNwbGl0KCc7Jykuc2hpZnQoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25OZXR3b3JrO1xuIiwiLy9kaXJ0eSBoYWNrIHRvIHJlbW92ZSBuby1jb25zb2xlIHdhcm5pbmcgb2YgZXNsaW50XG4vKiBnbG9iYWwgbm90RnJhbWV3b3JrKi9cbmNvbnN0IExPRyA9ICdjb25zb2xlJztcbnZhciBDb21tb25Mb2dzID0ge1xuXHRlcnJvcjogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdwcm9kdWN0aW9uJykpe1xuXHRcdFx0d2luZG93W0xPR10uZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0XHR9XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdwcm9kdWN0aW9uJykpe1xuXHRcdFx0d2luZG93W0xPR10ubG9nKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHRyZXBvcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHR0cmFjZTogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdwcm9kdWN0aW9uJykpe1xuXHRcdFx0d2luZG93W0xPR10udHJhY2UoLi4uYXJndW1lbnRzKTtcblx0XHR9XG5cdH0sXG5cdG11dGU6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJlZ2lzdGVyKCdwcm9kdWN0aW9uJywgdHJ1ZSk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cblx0bW92ZUl0ZW0oYXJyYXksIG9sZF9pbmRleCwgbmV3X2luZGV4KSB7XG5cdFx0aWYgKG5ld19pbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcblx0XHRcdHZhciBrID0gbmV3X2luZGV4IC0gYXJyYXkubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKChrLS0pICsgMSkge1xuXHRcdFx0XHRhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFycmF5LnNwbGljZShuZXdfaW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRfaW5kZXgsIDEpWzBdKTtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aChzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHVuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHRoaXMuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIG51bGwpO1xuXHR9XG5cblx0cGFyc2VQYXRoU3RlcChzdGVwLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGxldCByU3RlcCA9IG51bGw7XG5cdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUykgPT09IDAgJiYgaGVscGVyKXtcblx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfSEVMUEVSUywgJycpO1xuXHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRpZihoZWxwZXIuaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF07XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID09PSAwICYmIGl0ZW0pe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwgJycpO1xuXHRcdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fVxuXG5cdC8vOjpmaWVsZE5hbWUucmVzdWx0XG5cdC8ve31cblx0Ly97ZmllbGROYW1lOiAndGFyZ2V0UmVjb3JkRmllbGQnfVxuXHQvLy8vWyd0YXJnZXRSZWNvcmRGaWVsZCcsICdyZXN1bHQnXVxuXHRwYXJzZVBhdGgocGF0aCwgaXRlbSwgaGVscGVyKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cGF0aCA9IHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdHBhdGhbaV0gPSB0aGlzLnBhcnNlUGF0aFN0ZXAocGF0aFtpXSwgaXRlbSwgaGVscGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRub3JtaWxpemVQYXRoKHBhdGgpe1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH1lbHNle1xuXHRcdFx0d2hpbGUocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA+IC0xKXtcblx0XHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwnJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdHNtYWxsID0gW1widG9kb1wiXSxcblx0XHRiaWcgPSBbXCJ0b2RvXCIsIFwibGVuZ3RoXCJdXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0Ki9cblxuXHRpZkZ1bGxTdWJQYXRoKGJpZywgc21hbGwpe1xuXHRcdGlmIChiaWcubGVuZ3RoPHNtYWxsLmxlbmd0aCl7cmV0dXJuIGZhbHNlO31cblx0XHRmb3IobGV0IHQgPTA7IHQgPCBzbWFsbC5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZihzbWFsbFt0XSAhPT0gYmlnW3RdKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpLFxuXHRcdFx0aXNGdW5jdGlvbiA9IGF0dHJOYW1lLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKT4tMTtcblx0XHRpZiAoaXNGdW5jdGlvbil7XG5cdFx0XHRhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0fVxuXHRcdGlmICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIHR5cGVvZiBvYmplY3RbYXR0ck5hbWVdICE9PSAndW5kZWZpbmVkJyAmJiBvYmplY3RbYXR0ck5hbWVdICE9PSBudWxsKXtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uP29iamVjdFthdHRyTmFtZV0oe2l0ZW0sIGhlbHBlcnN9KTpvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChuZXdPYmosIGF0dHJQYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gbmV3T2JqO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7b2JqZWN0W2F0dHJOYW1lXSA9IHt9O31cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGpvaW4oKXtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX01FVEhPRF9JTklUID0gU3ltYm9sKCdpbml0JyksXG4gICAgTUVUQV9FVkVOVFMgPSBTeW1ib2woJ2V2ZW50cycpLFxuICAgIE1FVEFfREFUQSA9IFN5bWJvbCgnZGF0YScpLFxuICAgIE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuICAgIE1FVEFfT1BUSU9OUyA9IFN5bWJvbCgnb3B0aW9ucycpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgICAgICB0aGlzW01FVEFfRVZFTlRTXSA9IHt9O1xuICAgICAgICB0aGlzW01FVEFfREFUQV0gPSB7fTtcbiAgICAgICAgdGhpc1tNRVRBX1dPUktJTkddID0ge307XG4gICAgICAgIHRoaXNbTUVUQV9PUFRJT05TXSA9IHt9O1xuICAgICAgICB0aGlzW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KSB7XG4gICAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgICAgIGlucHV0ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0Lmhhc093blByb3BlcnR5KCdldmVudHMnKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgdCBvZiBpbnB1dC5ldmVudHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKC4uLnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlucHV0Lmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShpbnB1dC5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnd29ya2luZycpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFdvcmtpbmcoaW5wdXQud29ya2luZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb25zKGlucHV0Lm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLyogc2V0IGNvbGxlY3Rpb24gKi9cbiAgICAgICAgICAgICAgICAgICAgd2hhdCA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8qIHNldCBjb2xsZWN0aW9uIGVsZW1lbnQgKi9cbiAgICAgICAgICAgICAgICAgICAgbm90UGF0aC5zZXQoYXJnc1swXSAvKiBwYXRoICovICwgd2hhdCAvKiBjb2xsZWN0aW9uICovICwgdW5kZWZpbmVkIC8qIGhlbHBlcnMgKi8gLCBhcmdzWzFdIC8qIHZhbHVlICovICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgLyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoICovXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCB3aXRoIGRlZmF1bHQgdmFsdWUgKi9cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXMgPSBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBubyBkYXRhLCByZXR1cm4gZGVmYXVsdCB2YWx1ZSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBkYXRhLCByZXR1cm4gaXQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogcmV0dXJuIGZ1bGwgY29sbGVjdGlvbiAqL1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aGF0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgXHRDT1JFIE9CSkVDVFxuICAgIFx0XHREQVRBIC0gaW5mb3JtYXRpb25cbiAgICBcdFx0T1BUSU9OUyAtIGhvdyB0byB3b3JrXG4gICAgXHRcdFdPUktJTkcgLSB0ZW1wb3JhcmlseSBnZW5lcmF0ZWQgaW4gcHJvY2Nlc3NcbiAgICAqL1xuXG4gICAgc2V0RGF0YSgpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXNbTUVUQV9EQVRBXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0RGF0YSgpLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfREFUQV0sIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgc2V0T3B0aW9ucygpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXNbTUVUQV9PUFRJT05TXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0T3B0aW9ucygpLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfT1BUSU9OU10sIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgc2V0V29ya2luZygpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXNbTUVUQV9XT1JLSU5HXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0V29ya2luZygpLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldFdvcmtpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfV09SS0lOR10sIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgLypcbiAgICBcdEVWRU5UUyBoYW5kbGluZ1xuICAgICovXG5cbiAgICBvbihldmVudE5hbWVzLCBldmVudENhbGxiYWNrcywgb25jZSkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcbiAgICAgICAgICAgIGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuICAgICAgICAgICAgZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgIG5vdENvbW1vbi5kZWZpbmVJZk5vdEV4aXN0cyh0aGlzW01FVEFfRVZFTlRTXSwgbmFtZSwgW10pO1xuICAgICAgICAgICAgdGhpc1tNRVRBX0VWRU5UU11bbmFtZV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzOiBldmVudENhbGxiYWNrcyxcbiAgICAgICAgICAgICAgICBvbmNlOiBvbmNlLFxuICAgICAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLFxuICAgICAgICAgICAgZXZlbnROYW1lID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgZXZlbnROYW1lID0gW2V2ZW50TmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgZyA9IDA7IGcgPCBldmVudE5hbWUubGVuZ3RoOyBnKyspe1xuXHRcdFx0XHRcdGxldCBuYW1lID0gZXZlbnROYW1lW2ddO1xuXHRcdFx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgZXZlbnQgPSB0aGlzW01FVEFfRVZFTlRTXVtuYW1lXVt0XTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChldmVudC5vbmNlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnQuY2FsbGJhY2tzKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGggPSAwOyBoIDwgZXZlbnQuY2FsbGJhY2tzLmxlbmd0aDsgaCsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2tzW2hdKC4uLmFyZ3MpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG9mZihldmVudE5hbWVzIC8qIGFycmF5IG9mIGV2ZW50IG5hbWVzICovICwgZXZlbnRDYWxsYmFja3MgLyogYXJyYXkgb2YgY2FsbGJhY2tzICovICkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcbiAgICAgICAgICAgIGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuICAgICAgICAgICAgZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuICAgICAgICB9XG5cdFx0XHRcdGZvcihsZXQgZyA9IDA7IGcgPCBldmVudE5hbWVzLmxlbmd0aDsgZysrKXtcblx0XHRcdFx0XHRsZXQgbmFtZSA9IGV2ZW50TmFtZXNbZ107XG5cdFx0XHRcdFx0bGV0IHRhcmdldElkID0gLTE7XG5cdFx0XHRcdFx0Zm9yKGxldCBoID0gMDsgaCA8IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmxlbmd0aDsgaCsrKXtcblx0XHRcdFx0XHRcdGxldCBldmVudCA9IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdW2hdO1xuXHRcdFx0XHRcdFx0aWYgKHRhcmdldElkID09PSAtMSAmJiBldmVudENhbGxiYWNrcyA9PT0gZXZlbnQuY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGFyZ2V0SWQgPSBoO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodGFyZ2V0SWQgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5zcGxpY2UodGFyZ2V0SWQsIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBvZmZBbGwoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBPYmplY3Qua2V5cyh0aGlzW01FVEFfRVZFTlRTXSk7XG4gICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgZXZlbnRzLmxlbmd0aDsgdCsrKSB7XG4gICAgICAgICAgICBpZiAodGhpc1tNRVRBX0VWRU5UU10uaGFzT3duUHJvcGVydHkoZXZlbnRzW3RdKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzW01FVEFfRVZFTlRTXVtldmVudHNbdF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmNvbnN0IE9QVF9NT0RFX0hJU1RPUlkgPSBTeW1ib2woJ2hpc3RvcnknKSxcblx0T1BUX01PREVfSEFTSCA9IFN5bWJvbCgnaGFzaCcpLFxuXHRPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCA9IDUwO1xuXG5jbGFzcyBub3RSb3V0ZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLycsIC8vYWx3YXlzIGluIHNsYXNoZXMgL3VzZXIvLCAvLCAvaW5wdXQvLiBhbmQgbm8gL3VzZXIgb3IgaW5wdXQvbGV2ZWxcblx0XHRcdGluaXRpYWxpemVkOiBmYWxzZVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlzdG9yeSgpe1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZScsIE9QVF9NT0RFX0hJU1RPUlkpO1xuXHR9XG5cblx0aGFzaCgpe1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZScsIE9QVF9NT0RFX0hBU0gpO1xuXHR9XG5cblx0c2V0Um9vdChyb290KXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3Jvb3QnLCByb290ID8gJy8nICsgdGhpcy5jbGVhclNsYXNoZXMocm9vdCkgKyAnLycgOiAnLycpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y2xlYXJTbGFzaGVzKHBhdGgpIHtcblx0XHQvL2ZpcnN0IGFuZCBsYXN0IHNsYXNoZXMgcmVtb3ZhbFxuXHRcdHJldHVybiBwYXRoLnRvU3RyaW5nKCkucmVwbGFjZSgvXFwvJC8sICcnKS5yZXBsYWNlKC9eXFwvLywgJycpO1xuXHR9XG5cblx0YWRkKHJlLCBoYW5kbGVyKSB7XG5cdFx0aWYgKHR5cGVvZiByZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRoYW5kbGVyID0gcmU7XG5cdFx0XHRyZSA9ICcnO1xuXHRcdH1cblx0XHRsZXQgcnVsZSA9IHtcblx0XHRcdHJlOiByZSxcblx0XHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0XHR9O1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykucHVzaChydWxlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZExpc3QobGlzdCkge1xuXHRcdGZvciAobGV0IHQgaW4gbGlzdCkge1xuXHRcdFx0dGhpcy5hZGQodCwgbGlzdFt0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVtb3ZlKHBhcmFtKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIHI7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aCwgciA9IHRoaXMuZ2V0V29ya2luZygncm91dGVzJylbaV07IGkrKykge1xuXHRcdFx0aWYgKHIuaGFuZGxlciA9PT0gcGFyYW0gfHwgci5yZSA9PT0gcGFyYW0pIHtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGZsdXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyb3V0ZXM6IFtdLFxuXHRcdFx0bW9kZTogT1BUX01PREVfSElTVE9SWSxcblx0XHRcdHJvb3Q6ICcvJ1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aXNJbml0aWFsaXplZCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2luaXRpYWxpemVkJyk7XG5cdH1cblxuXHRzZXRJbml0aWFsaXplZCh2YWwgPSB0cnVlKXtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdpbml0aWFsaXplZCcsIHZhbCk7XG5cdH1cblxuXHRnZXRGcmFnbWVudCgpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSAnJztcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdtb2RlJykgPT09IE9QVF9NT0RFX0hJU1RPUlkpIHtcblx0XHRcdGlmICghbG9jYXRpb24pIHJldHVybiAnJztcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoKSk7XG5cdFx0XHRmcmFnbWVudCA9IGZyYWdtZW50LnJlcGxhY2UoL1xcPyguKikkLywgJycpO1xuXHRcdFx0ZnJhZ21lbnQgPSB0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSAhPSAnLycgPyBmcmFnbWVudC5yZXBsYWNlKHRoaXMuZ2V0V29ya2luZygncm9vdCcpLCAnJykgOiBmcmFnbWVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCF3aW5kb3cpIHJldHVybiAnJztcblx0XHRcdHZhciBtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdGZyYWdtZW50ID0gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jbGVhclNsYXNoZXMoZnJhZ21lbnQpO1xuXHR9XG5cblx0Y2hlY2tMb2NhdGlvbigpe1xuXHRcdGxldCBjdXJyZW50ID10aGlzLmdldFdvcmtpbmcoJ2N1cnJlbnQnKSxcblx0XHRcdGZyYWdtZW50ID10aGlzLmdldEZyYWdtZW50KCksXG5cdFx0XHRpbml0ID0gdGhpcy5pc0luaXRpYWxpemVkKCk7XG5cdFx0aWYgKGN1cnJlbnQgIT09ZnJhZ21lbnQgIHx8ICFpbml0KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLGZyYWdtZW50KTtcblx0XHRcdHRoaXMuY2hlY2soZnJhZ21lbnQpO1xuXHRcdFx0dGhpcy5zZXRJbml0aWFsaXplZCgpO1xuXHRcdH1cblx0fVxuXG5cdGhyZWZDbGljaygpe1xuXHRcdC8vY29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGdldFJvb3QoKXtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRsaXN0ZW4obG9vcEludGVydmFsID0gT1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLCAnbm90SW5pdGlhbGl6ZWQnKTtcblx0XHRjbGVhckludGVydmFsKHRoaXMuZ2V0V29ya2luZygnaW50ZXJ2YWwnKSk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcnZhbCcsIHNldEludGVydmFsKHRoaXMuY2hlY2tMb2NhdGlvbi5iaW5kKHRoaXMpLCBsb29wSW50ZXJ2YWwpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhyZWZDbGljay5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNoZWNrKGYpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSBmIHx8IHRoaXMuZ2V0RnJhZ21lbnQoKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0V29ya2luZygncm91dGVzJykubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBwYXRoID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgKyB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldLnJlO1xuXHRcdFx0bGV0IGZ1bGxSRSA9ICB0aGlzLmNsZWFyU2xhc2hlcyhkZWNvZGVVUkkocGF0aCkpO1xuXHRcdFx0dmFyIG1hdGNoID0gZnJhZ21lbnQubWF0Y2goZnVsbFJFKTtcblx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRtYXRjaC5zaGlmdCgpO1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldLmhhbmRsZXIuYXBwbHkodGhpcy5ob3N0IHx8IHt9LCBtYXRjaCk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG5hdmlnYXRlKHBhdGgpIHtcblx0XHRwYXRoID0gcGF0aCA/IHBhdGggOiAnJztcblx0XHRzd2l0Y2ggKHRoaXMuZ2V0V29ya2luZygnbW9kZScpKXtcblx0XHRcdGNhc2UgT1BUX01PREVfSElTVE9SWToge1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdwdXNoIHN0YXRlJywgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0aGlzLmdldEZ1bGxSb3V0ZShwYXRoKSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBPUFRfTU9ERV9IQVNIOiB7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jKC4qKSQvLCAnJykgKyAnIycgKyBwYXRoO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRGdWxsUm91dGUocGF0aCA9ICcnKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdyb290JykgKyB0aGlzLmNsZWFyU2xhc2hlcyhwYXRoKTtcblx0fVxuXG5cdGdldEFsbExpbmtzKCl7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKCduLWhyZWYnKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHRyZVJvdXRlRXhpc3RlZCgpe1xuXHRcdGxldCBsaXN0ID0gdGhpcy5nZXRBbGxMaW5rcygpO1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCBsaXN0Lmxlbmd0aDsgdCsrKXtcblx0XHRcdHRoaXMuaW5pdFJlcm91dGluZyhsaXN0W3RdLCBsaXN0W3RdLmdldEF0dHJpYnV0ZSgnbi1ocmVmJykpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRSZXJvdXRpbmcoZWwsIGxpbmspe1xuXHRcdGlmICghZWwubm90Um91dGVySW5pdGlhbGl6ZWQpe1xuXHRcdFx0bGV0IGZ1bGxMaW5rID0gdGhpcy5nZXRGdWxsUm91dGUobGluayk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBmdWxsTGluayk7XG5cdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHRoaXMubmF2aWdhdGUobGluayk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0ZWwubm90Um91dGVySW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RSb3V0ZXIoKTtcbiIsImxldCBub3RBUElPcHRpb25zID0ge1xuXHRycHM6IDUwLFxuXHRwcm90b2NvbDogJ2h0dHAnLFxuXHRob3N0OiAnbG9jYWxob3N0Jyxcblx0cG9ydDogOTAwMFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJT3B0aW9ucztcbiIsImNsYXNzIG5vdEFQSVF1ZWV7XG5cdGNvbnN0cnVjdG9yIChyZXF1ZXN0c1BlclNlY29uZCkge1xuXHRcdHRoaXMucXVlZSA9IFtdO1xuXHRcdHRoaXMuaW50ID0gbnVsbDtcblx0XHR0aGlzLnJlcXVlc3RzUGVyU2Vjb25kID0gcmVxdWVzdHNQZXJTZWNvbmQgfHwgNTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bigpe1xuXHRcdHRoaXMuaW50ID0gd2luZG93LnNldEludGVydmFsKHRoaXMuY2hlY2suYmluZCh0aGlzKSwgMTAwMCAvIHRoaXMucmVxdWVzdHNQZXJTZWNvbmQpO1xuXHR9XG5cblx0Y2hlY2soKXtcblx0XHRpZiAodGhpcy5pblByb2dyZXNzKXtyZXR1cm47fVxuXHRcdGVsc2V7XG5cdFx0XHRpZiAodGhpcy5xdWVlLmxlbmd0aCA+IDApe1xuXHRcdFx0XHR0aGlzLmluUHJvZ3Jlc3MgPSB0cnVlO1xuXHRcdFx0XHRsZXQgdG9DYWxsID0gdGhpcy5xdWVlLnNoaWZ0KCk7XG5cdFx0XHRcdHRvQ2FsbCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdG5leHQoKXtcblx0XHR0aGlzLmluUHJvZ3Jlc3MgPSBmYWxzZTtcblx0fVxuXG5cdGFkZChjYWxsKXtcblx0XHR0aGlzLnF1ZWUucHVzaChjYWxsKTtcblx0fVxuXG5cdHBhdXNlKCl7XG5cdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnQpO1xuXHR9XG5cblx0cmVzdW1lKCl7XG5cdFx0dGhpcy5ydW4oKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUElRdWVlO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZS5qcyc7XG5cbmltcG9ydCBub3RBUElPcHRpb25zIGZyb20gJy4vb3B0aW9ucy5qcyc7XG5pbXBvcnQgbm90QVBJUXVlZSBmcm9tICcuL3F1ZWUuanMnO1xuXG5cbmNsYXNzIG5vdEFQSSBleHRlbmRzICBub3RCYXNle1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMobm90Q29tbW9uLmV4dGVuZChub3RBUElPcHRpb25zLCBvcHRpb25zKSk7XG5cdFx0dGhpcy5xdWVlID0gbmV3IG5vdEFQSVF1ZWUodGhpcy5nZXRPcHRpb25zKCdycHMnKSk7XG5cdFx0dGhpcy5xdWVlLnJ1bigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bWFrZVVybChwYXJ0cykge1xuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcvJyk7XG5cdH1cblxuXHRxdWVlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCBtZXRob2QsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0bWFrZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpIHtcblx0XHRub3RDb21tb24ucmVxdWVzdEpTT04obWV0aG9kLCB1cmwsIGRhdGEpXG5cdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0dGhpcy5xdWVlLm5leHQoKTtcblx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2UpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncG9zdCcsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHV0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncHV0JywgdXJsLCBudWxsLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0bGlzdChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZ2V0JywgdXJsLCBudWxsLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2RlbGV0ZScsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSTtcbiIsImltcG9ydCBub3RCYXNlICBmcm9tICcuLi9ub3RCYXNlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEltYWdlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJjb25zdCBQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVggPSAnbi0nLFxuXHRURU1QTEFURV9UQUcgPSAnbnQnLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgPSAnLScsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYID0gJ2lmJyxcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCA9ICdub3RfY29tcG9uZW50XycsXG5cdFBBUlRfSURfUFJFRklYID0gJ25vdF9wYXJ0XycsXG5cdERFRkFVTFRfUExBQ0VSID0gJ3BsYWNlJyxcblx0REVGQVVMVF9QTEFDRVJfTE9PUCA9ICdwbGFjZUFmdGVyJztcblxuY29uc3QgT1BUUyA9IHtcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLFxuXHRURU1QTEFURV9UQUcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUixcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsXG5cdERFRkFVTFRfUExBQ0VSLFxuXHRDT01QT05FTlRfSURfUFJFRklYLFxuXHRQQVJUX0lEX1BSRUZJWCxcblx0REVGQVVMVF9QTEFDRVJfTE9PUFxufTtcblxuZXhwb3J0IGRlZmF1bHQgT1BUUztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmNvbnN0IE1FVEFfQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlQ2FjaGUgZXh0ZW5kcyBub3RCYXNle1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXSA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHR0aGlzLmhpZGVUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaWRlVGVtcGxhdGVzKCl7XG5cdFx0bGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdHQuaW5uZXJIVE1MID0gT1BUUy5URU1QTEFURV9UQUcgKyAne2Rpc3BsYXk6IG5vbmU7fSc7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KTtcblx0fVxuXG5cdHJlZ2lzdGVyKCkge1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcigndGVtcGxhdGVDYWNoZScsIHRoaXMpO1xuXHR9XG5cblx0bG9hZChtYXApIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0Zm9yICh2YXIgaSBpbiBtYXApIHtcblx0XHRcdHRoaXMubG9hZE9uZShpLCBtYXBbaV0pO1xuXHRcdH1cblx0fVxuXG5cdGxvYWRPbmUoa2V5LCB1cmwsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIG9SZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0b1JlcXVlc3Qub3BlbignR0VUJywgdXJsKTtcblx0XHRvUmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcblx0XHRcdGRpdi5kYXRhc2V0Lm5vdFRlbXBsYXRlTmFtZSA9IGtleTtcblx0XHRcdGRpdi5kYXRhc2V0Lm5vdFRlbXBsYXRlVVJMID0gdXJsO1xuXHRcdFx0ZGl2LmlubmVySFRNTCA9IHJlc3BvbnNlLnNyY0VsZW1lbnQucmVzcG9uc2VUZXh0O1xuXHRcdFx0dGhpcy5zZXRPbmUoa2V5LCBkaXYpO1xuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soa2V5LCB1cmwsIGRpdik7XG5cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdG9SZXF1ZXN0LnNlbmQoKTtcblx0fVxuXG5cdGlmQWxsTG9hZGVkKCl7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdsb2FkZWQnKTtcblx0XHR9XG5cdH1cblxuXHRzZXRPbmUoa2V5LCBlbGVtZW50KSB7XG5cdFx0aWYoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXtcblx0XHRcdHRoaXNbTUVUQV9DQUNIRV1ba2V5XSA9IGVsZW1lbnQ7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLmFkZEZyb21UZXh0KGtleSwgZWxlbWVudCk7XHRcblx0XHR9XG5cdH1cblxuXHRnZXQoa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9DQUNIRV0uaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXNbTUVUQV9DQUNIRV1ba2V5XS5jbG9uZU5vZGUodHJ1ZSkgOiBudWxsO1xuXHR9XG5cblx0Z2V0TmFtZXMoKXtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpc1tNRVRBX0NBQ0hFXSk7XG5cdH1cblxuXHRnZXRCeVVSTCh1cmwpIHtcblx0XHRmb3IgKHZhciBpIGluIHRoaXNbTUVUQV9DQUNIRV0pIHtcblx0XHRcdGlmICh0aGlzW01FVEFfQ0FDSEVdW2ldLnNyYyA9PSB1cmwpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0KGkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvL1x0TmV3IEFQSVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldExvYWRlZChrZXkpe1xuXHRcdGxldCB0ID0gdGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuaW5kZXhPZihrZXkpO1xuXHRcdGlmICh0ID4gLTEpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnNwbGljZSh0LCAxKTtcblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkZWQnKS5wdXNoKCdrZXknKTtcblx0fVxuXG5cdHdyYXAoa2V5LCB1cmwsIGlubmVySFRNTCl7XG5cdFx0dmFyIGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHRjb250Lm5hbWUgPSBrZXk7XG5cdFx0Y29udC5zcmMgPSB1cmw7XG5cdFx0Y29udC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG5cdFx0cmV0dXJuIGNvbnQ7XG5cdH1cblxuXHRwYXJzZUxpYih0ZXh0KXtcblx0XHRsZXQgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGxldCByZXN1bHQgPSB7fTtcblx0XHRjb250LmlubmVySFRNTCA9IHRleHQ7XG5cdFx0bGV0IG5vdFRlbXBsYXRlc0VsZW1lbnRzID0gY29udC5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHRmb3IobGV0IGVsSWQgPTA7IGVsSWQ8IG5vdFRlbXBsYXRlc0VsZW1lbnRzLmxlbmd0aDsgZWxJZCsrKXtcblx0XHRcdGxldCBlbCA9IG5vdFRlbXBsYXRlc0VsZW1lbnRzW2VsSWRdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUgPT09IGNvbnQpe1xuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRcdFx0cmVzdWx0W2VsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZV0gPSBlbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0YWRkTGliKGxpYil7XG5cdFx0Zm9yKGxldCB0IGluIGxpYil7XG5cdFx0XHR0aGlzLnNldE9uZSh0LCBsaWJbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21VUkwoa2V5LCB1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG5cdFx0XHRpZiAodGhpcy5nZXQoa2V5KSl7XG5cdFx0XHRcdHJlc29sdmUodGhpcy5nZXQoa2V5KSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly90aGF0LnNldExvYWRpbmcoa2V5LCB1cmwpO1xuXHRcdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpXG5cdFx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlSW5uZXJIVE1MKT0+e1xuXHRcdFx0XHRcdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhpcy53cmFwKGtleSwgdXJsLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0XHRcdFx0XHR0aGlzLnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRcdFx0XHRcdHJlc29sdmUodGhpcy5nZXQoa2V5KSk7XG5cdFx0XHRcdFx0fSkuY2F0Y2goKCk9Pntcblx0XHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZScsIGtleSwgdXJsKTtcblx0XHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YWRkTGliRnJvbVVSTCh1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHQudGhlbigodGVtcGxhdGVzSFRNTCk9Pntcblx0XHRcdFx0XHRsZXQgdGVtcGxhdGVzID0gdGhpcy5wYXJzZUxpYih0ZW1wbGF0ZXNIVE1MKTtcblx0XHRcdFx0XHR0aGlzLmFkZExpYih0ZW1wbGF0ZXMpO1xuXHRcdFx0XHRcdHJlc29sdmUodGVtcGxhdGVzKTtcblx0XHRcdFx0fSkuY2F0Y2goKGUpPT57XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdlcnJvciBsb2FkaW5nIHRlbXBsYXRlcyBsaWInLCB1cmwsZSk7XG5cdFx0XHRcdFx0cmVqZWN0KC4uLmFyZ3VtZW50cyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0YWRkRnJvbURvY3VtZW50KHNlbGVjdG9yT3JFbGVtZW50KXtcblx0XHRsZXQgZWwgPSAodHlwZW9mIHNlbGVjdG9yT3JFbGVtZW50ID09PSAnc3RyaW5nJyk/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yRWxlbWVudCk6c2VsZWN0b3JPckVsZW1lbnQ7XG5cdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0aWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gT1BUUy5URU1QTEFURV9UQUcudG9Mb3dlckNhc2UoKSl7XG5cdFx0XHRcdHRoaXMuc2V0T25lKGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSwgZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21UZXh0KGtleSwgdGVtcGxhdGVJbm5lckhUTUwpe1xuXHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksICcnLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlQ2FjaGUoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQuanMnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZID0gWydfaWQnLCAnaWQnLCAnSUQnXSxcblx0REVGQVVMVF9GSUxURVIgPSB7fSxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEludGVyZmFjZSBleHRlbmRzIG5vdEJhc2Uge1xuXG5cdGNvbnN0cnVjdG9yKG1hbmlmZXN0KSB7XG5cdFx0c3VwZXIoe30pO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHBhcnNlTGluZShsaW5lLCByZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgcmVjb3JkUkUgPSAnOnJlY29yZFsnLFxuXHRcdFx0ZmllbGROYW1lID0gJyc7XG5cdFx0d2hpbGUgKGxpbmUuaW5kZXhPZihyZWNvcmRSRSkgPiAtMSkge1xuXHRcdFx0dmFyIGluZCA9IGxpbmUuaW5kZXhPZihyZWNvcmRSRSk7XG5cdFx0XHR2YXIgbGVuID0gcmVjb3JkUkUubGVuZ3RoO1xuXHRcdFx0dmFyIGluZDIgPSBsaW5lLmluZGV4T2YoJ10nKTtcblx0XHRcdHZhciBzdGFydFNsaWNlID0gaW5kICsgbGVuO1xuXHRcdFx0dmFyIGVuZFNsaWNlID0gaW5kMjtcblx0XHRcdGZpZWxkTmFtZSA9IGxpbmUuc2xpY2Uoc3RhcnRTbGljZSwgZW5kU2xpY2UpO1xuXHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAnJykgYnJlYWs7XG5cdFx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6cmVjb3JkWycgKyBmaWVsZE5hbWUgKyAnXScsIHJlY29yZC5nZXRBdHRyKGZpZWxkTmFtZSkpO1xuXHRcdH1cblx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6bW9kZWxOYW1lJywgdGhpcy5tYW5pZmVzdC5tb2RlbCk7XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOmFjdGlvbk5hbWUnLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgbGluZSA9IHRoaXMucGFyc2VMaW5lKHRoaXMubWFuaWZlc3QudXJsLCByZWNvcmQsIGFjdGlvbk5hbWUpICsgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdwb3N0Rml4JykpID8gdGhpcy5wYXJzZUxpbmUoYWN0aW9uRGF0YS5wb3N0Rml4LCByZWNvcmQsIGFjdGlvbk5hbWUpIDogJycpO1xuXHRcdHJldHVybiBsaW5lO1xuXHR9XG5cblx0Z2V0SUQocmVjb3JkLCBhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlc3VsdElkLFxuXHRcdFx0bGlzdCA9IE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFksXG5cdFx0XHRwcmVmaXhlcyA9IFsnJywgdGhpcy5tYW5pZmVzdC5tb2RlbF07XG5cdFx0aWYgKGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2luZGV4JykgJiYgYWN0aW9uRGF0YS5pbmRleCkge1xuXHRcdFx0bGlzdCA9IFthY3Rpb25EYXRhLmluZGV4XS5jb25jYXQoT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHByZSBvZiBwcmVmaXhlcykge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiBsaXN0KSB7XG5cdFx0XHRcdGlmIChyZWNvcmQuaGFzT3duUHJvcGVydHkocHJlICsgdCkpIHtcblx0XHRcdFx0XHRyZXN1bHRJZCA9IHJlY29yZFtwcmUgKyB0XTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0SWQ7XG5cdH1cblxuXHRnZXRBY3Rpb25zQ291bnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpID8gT2JqZWN0LmtleXModGhpcy5nZXRBY3Rpb25zKCkpLmxlbmd0aCA6IDA7XG5cdH1cblxuXHRnZXRBY3Rpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLm1hbmlmZXN0ICYmIHRoaXMubWFuaWZlc3QuYWN0aW9ucyA/IHRoaXMubWFuaWZlc3QuYWN0aW9ucyA6IHt9O1xuXHR9XG5cblx0c2V0RmluZEJ5KGtleSwgdmFsdWUpIHtcblx0XHR2YXIgb2JqID0ge307XG5cdFx0b2JqW2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIob2JqKTtcblx0fVxuXG5cdHNldEZpbHRlcihmaWx0ZXJEYXRhID0gREVGQVVMVF9GSUxURVIpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdmaWx0ZXInLCBmaWx0ZXJEYXRhKTtcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnNldEZpbHRlcih7fSk7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyJyk7XG5cdH1cblxuXHRzZXRTb3J0ZXIoc29ydGVyRGF0YSkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3NvcnRlcicsIHNvcnRlckRhdGEpO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3NvcnRlcicpO1xuXHR9XG5cblx0c2V0UGFnZU51bWJlcihwYWdlTnVtYmVyKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHR9XG5cblx0c2V0UGFnZVNpemUocGFnZVNpemUpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdwYWdlU2l6ZScsIHBhZ2VTaXplKTtcblx0fVxuXG5cdHNldFBhZ2VyKHBhZ2VTaXplID0gREVGQVVMVF9QQUdFX1NJWkUsIHBhZ2VOdW1iZXIgPSBERUZBVUxUX1BBR0VfTlVNQkVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSkuc2V0V29ya2luZygncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRQYWdlcigpO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHBhZ2VTaXplOiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VTaXplJyksXG5cdFx0XHRwYWdlTnVtYmVyOiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VOdW1iZXInKVxuXHRcdH07XG5cdH1cblxuXHRnZXRNb2RlbE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMgJiYgdGhpcy5tYW5pZmVzdCA/IHRoaXMubWFuaWZlc3QubW9kZWwgOiBudWxsO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpICYmIHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdID8gdGhpcy5nZXRBY3Rpb25zKClbYWN0aW9uTmFtZV0gOiBudWxsO1xuXHR9XG5cblx0Y29sbGVjdFJlcXVlc3REYXRhKGFjdGlvbkRhdGEpIHtcblx0XHRsZXQgcmVxdWVzdERhdGEgPSB7fTtcblx0XHRpZiAoKGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkgJiYgQXJyYXkuaXNBcnJheShhY3Rpb25EYXRhLmRhdGEpKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFjdGlvbkRhdGEuZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgZGF0YVByb3ZpZGVyTmFtZSA9ICdnZXQnICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihhY3Rpb25EYXRhLmRhdGFbaV0pO1xuXHRcdFx0XHRpZiAodGhpc1tkYXRhUHJvdmlkZXJOYW1lXSAmJiB0eXBlb2YgdGhpc1tkYXRhUHJvdmlkZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdHJlcXVlc3REYXRhID0gbm90Q29tbW9uLmV4dGVuZChyZXF1ZXN0RGF0YSwgdGhpc1tkYXRhUHJvdmlkZXJOYW1lXSgpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVxdWVzdERhdGE7XG5cdH1cblxuXHRlbmNvZGVSZXF1ZXN0KGRhdGEpe1xuXHRcdGxldCBwID0gJz8nO1xuXHRcdGZvcihsZXQgdCBpbiBkYXRhKXtcblx0XHRcdHAgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHQpKyc9JytlbmNvZGVVUklDb21wb25lbnQoZGF0YVt0XSkrJyYnO1xuXHRcdH1cblx0XHRyZXR1cm4gcDtcblx0fVxuXG5cdC8vcmV0dXJuIFByb21pc2Vcblx0cmVxdWVzdChyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdHJlcXVlc3RQYXJhbXMgPSB0aGlzLmNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSxcblx0XHRcdHJlcXVlc3RQYXJhbXNFbmNvZGVkID0gdGhpcy5lbmNvZGVSZXF1ZXN0KHJlcXVlc3RQYXJhbXMpLFxuXHRcdFx0aWQgPSB0aGlzLmdldElEKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSksXG5cdFx0XHR1cmwgPSB0aGlzLmdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpO1xuXHRcdHJldHVybiBub3RDb21tb24uZ2V0QVBJKCkucXVlZVJlcXVlc3QoYWN0aW9uRGF0YS5tZXRob2QsIHVybCArIHJlcXVlc3RQYXJhbXNFbmNvZGVkLCBpZCwgSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSkpXG5cdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hZnRlclN1Y2Nlc3NSZXF1ZXN0KGRhdGEsIGFjdGlvbkRhdGEpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRhZnRlclN1Y2Nlc3NSZXF1ZXN0KGRhdGEsIGFjdGlvbkRhdGEpIHtcblx0XHRpZiAodGhpcyAmJiBhY3Rpb25EYXRhICYmIGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiBhY3Rpb25EYXRhLmlzQXJyYXkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgZGF0YS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7XG5cbmNvbnN0IE1FVEFfSU5URVJGQUNFID0gU3ltYm9sKCdpbnRlcmZhY2UnKSxcblx0TUVUQV9QUk9YWSA9IFN5bWJvbCgncHJveHknKSxcblx0TUVUQV9DSEFOR0UgPSBTeW1ib2woJ2NoYW5nZScpLFxuXHRNRVRBX0NIQU5HRV9ORVNURUQgPSBTeW1ib2woJ2NoYW5nZS5uZXN0ZWQnKSxcblx0TUVUQV9TQUwgPSBbXG5cdFx0J2dldEF0dHInLFxuXHRcdCdnZXRBdHRycycsXG5cdFx0J2lzUHJvcGVydHknLFxuXHRcdCdpc1JlY29yZCcsXG5cdFx0J2dldE1hbmlmZXN0Jyxcblx0XHQnc2V0QXR0cicsXG5cdFx0J3NldEF0dHJzJyxcblx0XHQnZ2V0RGF0YScsXG5cdFx0J3NldERhdGEnLFxuXHRcdCdnZXRKU09OJyxcblx0XHQnb24nLFxuXHRcdCdvZmYnLFxuXHRcdCd0cmlnZ2VyJ1xuXHRdLFxuXHRNRVRBX01BUF9UT19JTlRFUkZBQ0UgPSBbXG5cdFx0J2dldEFjdGlvbnNDb3VudCcsXG5cdFx0J2dldEFjdGlvbnMnLFxuXHRcdCdzZXRGaW5kQnknLFxuXHRcdCdyZXNldEZpbHRlcicsXG5cdFx0J3NldEZpbHRlcicsXG5cdFx0J2dldEZpbHRlcicsXG5cdFx0J3NldFNvcnRlcicsXG5cdFx0J2dldFNvcnRlcicsXG5cdFx0J3Jlc2V0U29ydGVyJyxcblx0XHQnc2V0UGFnZU51bWJlcicsXG5cdFx0J3NldFBhZ2VTaXplJyxcblx0XHQnc2V0UGFnZXInLFxuXHRcdCdyZXNldFBhZ2VyJyxcblx0XHQnZ2V0UGFnZXInXG5cdF0sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0TUVUQV9SRVRVUk5fVE9fUk9PVCA9IFN5bWJvbCgncmV0dXJuVG9Sb290Jyk7XG5cbnZhciBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0eXBlb2YgdGFyZ2V0W2tleV0pO1xuXG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RQcm9wZXJ0eSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihnZXRSb290LCBwYXRoVG8sIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUHJveHkgfHwgaXRlbS5pc1Byb3BlcnR5KSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRnZXRSb290OiBnZXRSb290LFxuXHRcdFx0cGF0aDogcGF0aFRvXG5cdFx0fSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzKHRoaXMpKTtcblx0XHR0aGlzLnNldERhdGEoaXRlbSk7XG5cdFx0dGhpcy5pc1Byb3BlcnR5ID0gdHJ1ZTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfUkVUVVJOX1RPX1JPT1RdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0W01FVEFfUkVUVVJOX1RPX1JPT1RdKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0bGV0IHJvb3QgPSB0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSgpO1xuXHRcdHJvb3QudHJpZ2dlcignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9QUk9YWV0sIHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXksIHZhbHVlKTtcblx0fVxufVxuXG5cbnZhciBjcmVhdGVSZWNvcmRIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScgfHwga2V5ID09PSAnaXNSZWNvcmQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykge1xuXHRcdFx0XHRpZiAodGhpc1trZXldKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfTUFQX1RPX0lOVEVSRkFDRS5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RSZWNvcmQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QsIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIGl0ZW0uaXNQcm94eSkge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCd0aGlzIGlzIFByb3h5IGl0ZW0nKTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUmVjb3JkIHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRPcHRpb25zKHt9KTtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXSA9IG5ldyBub3RSZWNvcmRJbnRlcmZhY2UobWFuaWZlc3QpO1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzLmludGVyZmFjZVVwKCk7XG5cdFx0dGhpcy5pc1JlY29yZCA9IHRydWU7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSByZWNvcmQgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRpbml0UHJvcGVydGllcyhpdGVtLCBwYXRoID0gJycpIHtcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoaXRlbSk7XG5cdFx0XHRmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuXHRcdFx0XHRsZXQgY3VyUGF0aCA9IHBhdGggKyAocGF0aC5sZW5ndGggPiAwID8gJy4nIDogJycpICsga2V5O1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2N1clBhdGgnLCBjdXJQYXRoKTtcblx0XHRcdFx0aWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbVtrZXldID09PSAnb2JqZWN0JyAmJiBpdGVtW2tleV0gIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbVtrZXldLCBjdXJQYXRoKTtcblx0XHRcdFx0XHRcdGl0ZW1ba2V5XSA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldFJvb3QuYmluZCh0aGlzKSwgY3VyUGF0aCwgaXRlbVtrZXldKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGtleSwgJ2lzIG93biBwcm9wZXJ0eSwgYnV0IG5vdCBvYmplY3QnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGtleSwgJ2lzIG5vdCBvd24gcHJvcGVydHknKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaXRlbTtcblx0fVxuXG5cdGdldFJvb3QoKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtcykge1xuXHRcdHZhciBjb2xsZWN0aW9uID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29sbGVjdGlvbi5wdXNoKG5ldyBub3RSZWNvcmQobWFuaWZlc3QsIGl0ZW1zW2ldKSk7XG5cdFx0fVxuXHRcdHJldHVybiBjb2xsZWN0aW9uO1xuXHR9XG5cblx0aW50ZXJmYWNlVXAoKSB7XG5cdFx0aWYgKHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEFjdGlvbnNDb3VudCgpID4gMCkge1xuXHRcdFx0bGV0IGFjdGlvbnMgPSB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zKCk7XG5cdFx0XHRmb3IgKGxldCBpIGluIGFjdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5hY3Rpb25VcChpLCBhY3Rpb25zW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gKCkgPT4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCk7XHRcdFx0XG5cdFx0fVxuXHR9XG5cdC8qXG5cdC0+ICdwYXRoLnRvLmtleScsIHZhbHVlT2ZLZXlcblx0PC0gb2ssIHdpdGggb25lIG9uQ2hhbmdlIGV2ZW50IHRyaWdnZXJlZFxuXHQqL1xuXG5cdHNldEF0dHIoa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBub3RQYXRoLnNldChrZXksIHRoaXNbTUVUQV9QUk9YWV0sIHt9LCB2YWx1ZSk7XG5cdH1cblxuXHQvKlxuXHQtPlxuXHR7XG5cdFx0J2tleVBhdGgnOiB2YWx1ZSxcblx0XHQna2V5LnN1YlBhdGgnOiB2YWx1ZTIsXG5cdFx0J2tleVBhdGguMC50aXRsZSc6IHZhbHVlM1xuXHR9XG5cdDwtIG9rLCB3aXRoIGJ1bmNoIG9mIG9uQ2hhbmdlIGV2ZW50cyB0cmlnZ2VyZWRcblx0Ki9cblx0c2V0QXR0cnMob2JqZWN0UGFydCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBpbiBvYmplY3RQYXJ0KSB7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMgb25lIHRvIGdvJywgcGF0aCk7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cihwYXRoLCBvYmplY3RQYXJ0W3BhdGhdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aFRvS2V5J1xuXHQ8LSB2YWx1ZTFcblxuXHQqL1xuXHRnZXRBdHRyKHdoYXQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ2dldEF0dHInLCB3aGF0KTtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQod2hhdCwgdGhpc1tNRVRBX1BST1hZXSwge30pO1xuXHR9XG5cblx0Lypcblx0LT4gWydwYXRoVG9LZXknLCAncGF0aC50by5rZXknLCAnc2ltcGxlS2V5JywuLi5dXG5cdDwtIFt2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzLC4uLl1cblx0Ki9cblx0Z2V0QXR0cnMod2hhdCkge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAod2hhdCAmJiB3aGF0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggb2Ygd2hhdCkge1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLmdldEF0dHIocGF0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0aWYgKHRoaXNbTUVUQV9JTlRFUkZBQ0VdKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ubWFuaWZlc3Q7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdGhhbmRsZXIgZm9yIFByb3h5IGNhbGxiYWNrc1xuXHQqL1xuXG5cdFtNRVRBX0NIQU5HRV0oKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCd0cnkgdG8gY2hhbmdlJywgLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdFtNRVRBX0NIQU5HRV9ORVNURURdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZSBuZXN0ZWQnLCAuLi5hcmd1bWVudHMpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0aGlzW01FVEFfUFJPWFldLCBub3RQYXRoLmpvaW4oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pLCBhcmd1bWVudHNbM10pO1xuXHR9XG5cblx0c2V0SXRlbShpdGVtKSB7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub2ZmKCdjaGFuZ2UnKTtcblx0XHR0aGlzLm9mZignY2hhbmdlLm5lc3RlZCcpO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24udHJhY2UoKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdHNldEZpbmRCeSgpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRGaW5kQnkoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0U29ydGVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFNvcnRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0UGFnZU51bWJlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0UGFnZVNpemUoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldFBhZ2VyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlc2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRNb2RlbE5hbWUoLi4uYXJndW1lbnRzKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlY29yZDtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG5cbmNvbnN0IE9QVF9DT05UUk9MTEVSX1BSRUZJWCA9ICduYycsXG5cdE9QVF9SRUNPUkRfUFJFRklYID0gJ25yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QXBwIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcih7b3B0aW9uc30pO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGFwcCcpO1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcignYXBwJywgdGhpcyk7XG5cdFx0dGhpcy5yZXNvdXJjZXMgPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0aW50ZXJmYWNlczoge30sXG5cdFx0XHRjb250cm9sbGVyczoge30sXG5cdFx0XHRpbml0Q29udHJvbGxlcjogbnVsbCxcblx0XHRcdGN1cnJlbnRDb250cm9sbGVyOiBudWxsXG5cdFx0fSk7XG5cdFx0dGhpcy5wcmVJbml0Um91dGVyKCk7XG5cdFx0dGhpcy5pbml0TWFuYWdlcigpO1xuXHRcdHRoaXMuaW5pdEFQSSgpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlcygpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdE1hbmFnZXIoKXtcblx0XHRub3RDb21tb24uc2V0TWFuYWdlcihcblx0XHRcdHtcblx0XHRcdFx0c2V0QVBJKHYpeyB0aGlzLmFwaSA9IHY7fSxcblx0XHRcdFx0Z2V0QVBJKCl7cmV0dXJuIHRoaXMuYXBpO30sXG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdGluaXRBUEkoKXtcblx0XHRub3RDb21tb24uZ2V0TWFuYWdlcigpLnNldEFQSShuZXcgbm90QVBJKHRoaXMuZ2V0T3B0aW9ucygnYXBpJykgfHwge30pKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZXMoKXtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRsZXQgcHJvbSA9IG51bGw7XG5cdFx0XHRmb3IobGV0IHQgaW4gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRcdGlmICh0ICYmIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdGxldCB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpW3RdO1xuXHRcdFx0XHRcdGlmKHByb20pe1xuXHRcdFx0XHRcdFx0cHJvbS50aGVuKG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTC5iaW5kKG5vdFRlbXBsYXRlQ2FjaGUsIHVybCkpO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cHJvbSA9IG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTCh1cmwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHByb20pe1xuXHRcdFx0XHRwcm9tLnRoZW4odGhpcy5pbml0TWFuaWZlc3QuYmluZCh0aGlzKSlcblx0XHRcdFx0XHQuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoJ25vIHRlbXBsYXRlcyBsaWInLCBlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5pbml0TWFuaWZlc3QoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFuaWZlc3QoKSB7XG5cdFx0dmFyIHVybCA9IHRoaXMuZ2V0T3B0aW9ucygnbWFuaWZlc3RVUkwnKTtcblx0XHRub3RDb21tb24uZ2V0SlNPTih1cmwsIHt9KVxuXHRcdFx0LnRoZW4odGhpcy5zZXRJbnRlcmZhY2VNYW5pZmVzdC5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRwcmVJbml0Um91dGVyKCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb3V0ZXInLCBub3RSb3V0ZXIpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuc2V0Um9vdCh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5yb290JykpO1xuXHRcdG5vdFJvdXRlci5yZVJvdXRlRXhpc3RlZCgpO1xuXHR9XG5cblx0aW5pdFJvdXRlcigpe1xuXHRcdHZhciByb3V0aWVJbnB1dCA9IHt9O1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5tYW5pZmVzdCcpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGxldCByb3V0ZUJsb2NrID0gdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKVt0XSxcblx0XHRcdFx0cGF0aHMgPSByb3V0ZUJsb2NrLnBhdGhzLFxuXHRcdFx0XHRjb250cm9sbGVyID0gcm91dGVCbG9jay5jb250cm9sbGVyO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0cm91dGllSW5wdXRbcGF0aHNbaV1dID0gdGhpcy5iaW5kQ29udHJvbGxlcihjb250cm9sbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXInKS5hZGRMaXN0KHJvdXRpZUlucHV0KS5saXN0ZW4oKTsvLy5uYXZpZ2F0ZSh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5pbmRleCcpKTtcblx0fVxuXG5cdHNldEludGVyZmFjZU1hbmlmZXN0KG1hbmlmZXN0KSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcsIG1hbmlmZXN0KTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlTWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHQvL9C90YPQttC90L4g0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNGC0Yxcblx0XHQvL9C80L7QtNC10LvQuCDQv9C+0LvRg9GH0LXQvdC90YvQvNC4INC40L3RgtC10YDRhNC10LnRgdCw0LzQuFxuXHRcdHRoaXMudXBkYXRlSW50ZXJmYWNlcygpO1xuXHRcdC8v0LjQvdC40YbQuNC70LjRhtC40YDQvtCy0LDRgtGMINC4INC30LDQv9GD0YHRgtC40YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHRcdHRoaXMuaW5pdENvbnRyb2xsZXIoKTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhcnRBcHAoKSB7XG5cdFx0Ly/RgdC+0LfQtNCw0YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0Ly/RgNC+0YPRgtC10YAg0Lgg0L/RgNC40LLRj9C30LDRgtGMINC6INC90LXQvNGDINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHR0aGlzLmluaXRSb3V0ZXIoKTtcblx0fVxuXG5cdGJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0bGV0IGFwcCA9IHRoaXM7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRuZXcgY29udHJvbGxlck5hbWUoYXBwLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdH1cblxuXHRpbml0Q29udHJvbGxlcigpIHtcblx0XHRpZiAodHlwZW9mKHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRsZXQgaW5pdENvbnRyb2xsZXIgPSB0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJyk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJywgbmV3IGluaXRDb250cm9sbGVyKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50Q29udHJvbGxlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicpO1xuXHR9XG5cblx0c2V0Q3VycmVudENvbnRyb2xsZXIoY3RybCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInLCBjdHJsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHVwZGF0ZUludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5jbGVhckludGVyZmFjZXMoKTtcblx0XHRsZXQgbWFuaWZlc3RzID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHRcdGlmIChtYW5pZmVzdHMpIHtcblx0XHRcdGZvcihsZXQgbmFtZSBpbiBtYW5pZmVzdHMpe1xuXHRcdFx0XHRsZXQgcmVjb3JkTWFuaWZlc3QgPSBtYW5pZmVzdHNbbmFtZV07XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdID0gKHJlY29yZERhdGEpID0+IG5ldyBub3RSZWNvcmQocmVjb3JkTWFuaWZlc3QsIHJlY29yZERhdGEpO1xuXHRcdFx0XHR3aW5kb3dbJ25yJyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSldID0gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbbmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0UmVjb3JkTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9SRUNPUkRfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldENvbnRyb2xsZXJOYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX0NPTlRST0xMRVJfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldEludGVyZmFjZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpO1xuXHR9XG5cblx0Y2xlYXJJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJmYWNlcycsIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHdhaXRUaGlzUmVzb3VyY2UodHlwZSwgaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMucmVzb3VyY2VzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG5cdFx0XHR0aGlzLnJlc291cmNlc1t0eXBlXSA9IHt9O1xuXHRcdH1cblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSBmYWxzZTtcblx0XHRyZXR1cm4gdGhpcy5vblJlc291cmNlUmVhZHkuYmluZCh0aGlzLCB0eXBlLCBpbmRleCk7XG5cdH1cblxuXHRvblJlc291cmNlUmVhZHkodHlwZSwgaW5kZXgpIHtcblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSB0cnVlO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRhbGxSZXNvdXJjZXNSZWFkeSgpIHtcblx0XHR2YXIgaSwgajtcblx0XHRmb3IgKGkgaW4gdGhpcy5yZXNvdXJjZXMpIHtcblx0XHRcdGZvciAoaiBpbiB0aGlzLnJlc291cmNlc1tpXSkge1xuXHRcdFx0XHRpZiAoIXRoaXMucmVzb3VyY2VzW2ldW2pdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuXG5jb25zdCBNRVRBX1BST0NFU1NPUlMgPSBTeW1ib2woJ3Byb2Nlc3NvcnMnKTtcblxuY2xhc3Mgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UHJvY2Vzc29yKC8qIGtleSwgdmFsdWUgKi8pe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFByb2Nlc3NvcigvKiBrZXksICBkZWZhdWx0VmFsdWUgKi8pe1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhclByb2Nlc3NvcnMoKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZCgpe1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcblx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHR9ZWxzZXtcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKXtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGFyZ3VtZW50c1swXSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IodCwgYXJndW1lbnRzWzBdW3RdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFByb2Nlc3NvciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXIoKXtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlUHJvY2Vzc29ycygpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnO1xuXG4vKlxuICog0JjRgdC/0L7Qu9GM0LfRg9C10YIgRE9NINC/0L7QtNC00LXRgNC10LLQviDQsiDQutCw0YfQtdGB0YLQstC1INGI0LDQsdC70L7QvdCwLlxuICog0JfQsNC/0L7Qu9C90Y/QtdGCINC10LPQviDQtNCw0L3QvdGL0LzQuC5cbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0LPQtdC90LXRgNC40YDQvtCy0LDQvdC90YvQtSDRjdC70LXQvNC10L3RgtGLXG4gKlxuICogKi9cblxuLypcblxuXHQ8ZGl2IG4tdGVtcGxhdGUtbmFtZT1cInZhc3lhXCI+XG5cdFx0PHA+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbi12YWx1ZT1cIjpjb29sTmFtZVwiLz48L3A+XG5cdFx0PHA+0JHQvtGA0LjRgSDRhdGA0LXQvSDQv9C+0L/QsNC00LXRiNGMINC4IHt7OmNvb2xOYW1lfX0uPC9wPlxuXHQ8L2Rpdj5cblxuICovXG5cbmNvbnN0IE1FVEFfQ09NUE9ORU5UUyA9IFN5bWJvbCgnY29tcG9uZW50cycpO1xuXG5jbGFzcyBub3RSZW5kZXJlciBleHRlbmRzIG5vdEJhc2Uge1xuXHQvKlxuXHRcdGlucHV0ID0ge1xuXHRcdFx0ZGF0YTogbm90UmVjb3JkLFxuXHRcdFx0dGVtcGxhdGU6IGVsZW1lbnRcblx0XHRcdG9wdGlvbnM6e1xuXHRcdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0fVxuXHRcdH1cblx0Ki9cblxuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdID0ge307XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLmNvbXBvbmVudCA9IGlucHV0LmNvbXBvbmVudDtcblx0XHR0aGlzLmluaXREYXRhKGlucHV0LmRhdGEgPyBpbnB1dC5kYXRhIDoge30pO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dC50ZW1wbGF0ZSk7XG5cdFx0dGhpcy5pbml0VGVtcGxhdGUoKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3RlbXBsYXRlJywgdGhpcy5nZXRXb3JraW5nKCdnZXRUZW1wbGF0ZScpKCkpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLmdldERhdGEoKS5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0fVxuXG5cdGluaXRXb3JraW5nKHRlbXBsYXRlKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGdldFRlbXBsYXRlOiB0ZW1wbGF0ZSxcblx0XHRcdHBhcnRJZDogdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA/IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgOiBPUFRTLlBBUlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHR9KTtcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCkge1xuXHRcdGlmICh0aGlzLmNvbXBvbmVudCkge1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLmNvbXBvbmVudC5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHRvbkNoYW5nZShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdHRoaXMudXBkYXRlKGtleSk7XG5cdFx0dGhpcy50cmlnZ2VyKCdvYnNvbGV0ZScsIHByb3h5LCBrZXksIHZhbHVlKTtcblx0fVxuXG5cdHVwZGF0ZShrZXkpIHtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHRmb3IgKGxldCB0IGluIHRoaXNbTUVUQV9DT01QT05FTlRTXSkge1xuXHRcdFx0bGV0IGl0ZW0gPSB0aGlzW01FVEFfQ09NUE9ORU5UU11bdF0sXG5cdFx0XHRcdGlmUGFydCA9IHRydWU7XG5cdFx0XHRpZiAoa2V5KSB7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJykgPT09IG51bGwpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgY29tcG9uZW50UGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJykpLFxuXHRcdFx0XHRcdGNoYW5nZWRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGtleSk7XG5cdFx0XHRcdGlmUGFydCA9IG5vdFBhdGguaWZGdWxsU3ViUGF0aChjaGFuZ2VkUGF0aCwgY29tcG9uZW50UGF0aCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpZlBhcnQpIHtcblx0XHRcdFx0aXRlbS51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXRXb3JraW5nTWFwcGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21hcHBpbmcnLCB0aGlzLmNyZWF0ZU1hcHBpbmcoKSk7XG5cdH1cblxuXHQvKlxuXG5cdNCh0L7Qt9C00LDQtdC8INC60LDRgNGC0Ysg0YHQvtC+0YLQstC10YHRgtCy0LjRjyDQv9GA0L7RhtC10YHRgdC+0YDQvtCyLCDQv9GD0YLQtdC5INC00LDQvdC90YvRhSDQsiDQvtCx0YrQtdC60YLQtSDQuCDRjdC70LXQvNC10L3RgtC+0LIg0YjQsNCx0LvQvtC90LAuXG5cdFt7XG5cdFx0ZWwsXG5cdFx0cHJvY2Vzc29yLFxuXHRcdHdvcmtpbmcsXG5cdFx0aXRlbS5wcm9wZXJ0eS5wYXRoXG5cdH1dXG5cblx0Ki9cblxuXHRjcmVhdGVNYXBwaW5nKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmZpbmRBbGxQcm9jZXNzb3JzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZpbmRBbGxQcm9jZXNzb3JzKCkge1xuXHRcdGxldCBwcm9jcyA9IFtdLFxuXHRcdFx0ZWxzID0gbm90Q29tbW9uLmdldEF0dHJpYnV0ZXNTdGFydHNXaXRoKHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLCBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCk7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBhdHRzID0gZWxzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhhdHRzW2ldKTtcblx0XHRcdFx0XHRsZXQgcHJvY0RhdGEgPSB0aGlzLnBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihhdHRzW2ldLm5vZGVOYW1lKTtcblx0XHRcdFx0XHRwcm9jRGF0YS5lbGVtZW50ID0gZWxzW2pdO1xuXHRcdFx0XHRcdHByb2NEYXRhLnByb2Nlc3NvckV4cHJlc3Npb24gPSBhdHRzW2ldLm5vZGVOYW1lO1xuXHRcdFx0XHRcdHByb2NEYXRhLmF0dHJpYnV0ZUV4cHJlc3Npb24gPSBhdHRzW2ldLnZhbHVlO1xuXHRcdFx0XHRcdHByb2NzLnB1c2gocHJvY0RhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwcm9jcztcblx0fVxuXG5cdHBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihwcm9jZXNzb3JFeHByZXNzaW9uKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdHBhcmFtczogW10sXG5cdFx0XHRwcm9jZXNzb3JOYW1lOiAnJyxcblx0XHRcdGlmQ29uZGl0aW9uOiBmYWxzZVxuXHRcdH07XG5cdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCwgJycpO1xuXHRcdGlmIChwcm9jZXNzb3JFeHByZXNzaW9uLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCkgPT09IChwcm9jZXNzb3JFeHByZXNzaW9uLmxlbmd0aCAtIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgubGVuZ3RoKSkge1xuXHRcdFx0cmVzdWx0LmlmQ29uZGl0aW9uID0gdHJ1ZTtcblx0XHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgKyBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLCAnJyk7XG5cdFx0fVxuXHRcdHJlc3VsdC5wYXJhbXMgPSBwcm9jZXNzb3JFeHByZXNzaW9uLnNwbGl0KE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SKTtcblx0XHRyZXN1bHQucHJvY2Vzc29yTmFtZSA9IHJlc3VsdC5wYXJhbXNbMF07XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHJlc3VsdC5wYXJhbXMuc2xpY2UoMSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGV4ZWNQcm9jZXNzb3JzKGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG1hcHBpbmcgPSB0aGlzLmdldFdvcmtpbmcoJ21hcHBpbmcnKTtcblx0XHRpZiAobWFwcGluZykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBwcm9jU2NvcGUgPSBtYXBwaW5nW2ldO1xuXHRcdFx0XHRwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHByb2NTY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBpbmRleCk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnYXR0cmlidXRlUmVzdWx0JywgcHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdFx0XHRcdGxldCBwcm9jTmFtZSA9IHByb2NTY29wZS5wcm9jZXNzb3JOYW1lLFxuXHRcdFx0XHRcdHByb2MgPSBub3RUZW1wbGF0ZVByb2Nlc3NvcnMuZ2V0KHByb2NOYW1lKTtcblx0XHRcdFx0aWYgKHByb2MpIHtcblx0XHRcdFx0XHRwcm9jKHByb2NTY29wZSwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0XHRcdFx0XHRwcm9jU2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvY1Njb3BlLnByb2Nlc3NvckV4cHJlc3Npb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gcHJvY2Vzc29yIGxpa2UnLCBwcm9jTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcpO1xuXHR9XG5cblx0Z2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwYXRoLCBpdGVtKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdH1cblxuXHRjbGVhclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmRlc3Ryb3lTdWJzKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdWJzJywgW10pO1xuXHR9XG5cblx0ZGVzdHJveVN1YnMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRTdGFzaCgpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRsZXQgZWwgPSB0aGlzLmdldFN0YXNoKClbdF07XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSkge1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZlN1YkVsZW1lbnRSZW5kZXJlZChudEVsKSB7XG5cdFx0cmV0dXJuIG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkICYmIChudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZC52YWx1ZSA9PT0gJ3RydWUnKTtcblx0fVxuXG5cdHNlYXJjaEZvclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0bGV0IHN1YnMgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCA9IDA7IG50IDwgc3Vicy5sZW5ndGg7IG50KyspIHtcblx0XHRcdGlmICghdGhpcy5pZlN1YkVsZW1lbnRSZW5kZXJlZChzdWJzW250XSkpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJTdWIoc3Vic1tudF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZFN1YihudEVsKSB7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdzdWJzJykucHVzaCh7XG5cdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdHBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiAnJyxcblx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnNyYyA6ICcnLFxuXHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0XHRyZW5kZXJlZExpc3Q6IFtdLFxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU3ViKG50RWwpIHtcblx0XHRpZiAoIW50RWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IGRldGFpbHMgPSB7XG5cdFx0XHRcdGRhdGFQYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogbnVsbCxcblx0XHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMuc3JjLnZhbHVlIDogJycsXG5cdFx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0ZGF0YTogZGV0YWlscy5kYXRhUGF0aCAhPT0gbnVsbCA/IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChkZXRhaWxzLmRhdGFQYXRoLCB0aGlzLmdldERhdGEoKSkgOiBudWxsLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRzcmM6IGRldGFpbHMuc3JjXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlQWZ0ZXInLFxuXHRcdFx0XHRcdGlkOiBkZXRhaWxzLmlkLFxuXHRcdFx0XHRcdG50RWw6IG50RWwsXG5cdFx0XHRcdFx0ZGF0YVBhdGg6IGRldGFpbHMuZGF0YVBhdGhcblx0XHRcdFx0fSxcblx0XHRcdFx0b3duZXI6IHRoaXNcblx0XHRcdH07XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgZGV0YWlscy5pZCk7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdW2RldGFpbHMuaWRdID0gbmV3IG5vdENvbXBvbmVudChvcHRpb25zKTtcblx0fVxuXG5cdGNsZWFyU3Rhc2goKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIFtdKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGUnKTtcblx0fVxuXG5cdGdldFN0YXNoKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3N0YXNoJyk7XG5cdH1cblxuXHRzdGFzaFJlbmRlcmVkKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHR0aGlzLmFkZFRvU3Rhc2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0fVxuXG5cdHJlcGxhY2VSZW5kZXJlZCgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3JlcGxhY2Ugc3Rhc2gnKTtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksXG5cdFx0XHRzdGFzaCA9IHRoaXMuZ2V0U3Rhc2goKSxcblx0XHRcdG5ld1N0YXNoID0gW10sXG5cdFx0XHRhbmNob3IgPSBzdGFzaC5sZW5ndGggPiAwID8gc3Rhc2hbMF0gOiB0aGlzLmdldE9wdGlvbnMoJ250RWwnKSxcblx0XHRcdHBhcmVudE5vZGUgPSBhbmNob3IucGFyZW50Tm9kZTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRuZXdTdGFzaC5wdXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBuZXdTdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0aWYgKGFuY2hvci5uZXh0U2libGluZykge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3Rhc2hbdF0sIGFuY2hvci5uZXh0U2libGluZyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChuZXdTdGFzaFt0XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgc3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3Rhc2hbdF0pO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgbmV3U3Rhc2gpO1xuXHR9XG5cblx0YWRkVG9TdGFzaChub2RlKSB7XG5cdFx0dGhpcy5nZXRTdGFzaCgpLnB1c2gobm9kZSk7XG5cdH1cblxuXHRpc0RhdGEoZGF0YSA9IHt9KSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG5cblx0aGlkZSgpIHtcblxuXHR9XG5cblx0c2hvdygpIHtcblxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlbmRlcmVyO1xuIiwiY29uc3QgcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdGxldCBsID0gMDtcblx0XHR3aGlsZSAodGFyZ2V0RWwuY2hpbGRyZW4ubGVuZ3RoIC0gbCkge1xuXHRcdFx0aWYgKHRhcmdldEVsLmNoaWxkcmVuWzBdLm5vZGVOYW1lID09PSAnTlQnKXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnbnQgZm91bmRlZCcpO1xuXHRcdFx0XHRsKys7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygncmVtb3ZlIGNoaWxkICcsdGFyZ2V0RWwuY2hpbGRyZW5bbF0pO1xuXHRcdFx0XHR0YXJnZXRFbC5yZW1vdmVDaGlsZCh0YXJnZXRFbC5jaGlsZHJlbltsXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRhcmdldEVsLnRleHRDb250ZW50ID0gJyc7XG5cdH0sXG5cdGJlZm9yZUVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgY2hpbGQgJywgcmVuZGVyZWRbaV0pO1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXJFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9XG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2U7XG4iLCJjb25zdCBwbGFjZUFmdGVyID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VBZnRlcjtcbiIsImNvbnN0IHBsYWNlQmVmb3JlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VCZWZvcmU7XG4iLCJjb25zdCBwbGFjZUZpcnN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gcmVuZGVyZWQubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ3BsYWNlIGZpcnN0JywgaSwgcmVuZGVyZWRbaV0pO1xuXHRcdFx0aWYgKHRhcmdldEVsLmNoaWxkcmVuLmxlbmd0aCl7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBiZWZvcmUgZmlyc3QnKTtcblx0XHRcdFx0dGFyZ2V0RWwuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5jaGlsZHJlblswXSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGFzIGZpcnN0Jyk7XG5cdFx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZUZpcnN0O1xuIiwiY29uc3QgcGxhY2VMYXN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUxhc3Q7XG4iLCJjb25zdCByZXBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRiZWZvcmVFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cblx0fSxcblx0YWZ0ZXJFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHtcdFx0XG5cdFx0aWYgKHRhcmdldEVsLm5vZGVOYW1lICE9PSAnTlQnKXtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFyZ2V0RWwpO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZTtcbiIsImltcG9ydCBwbGFjZSBmcm9tICcuL3BsYWNlJztcbmltcG9ydCBwbGFjZUFmdGVyIGZyb20gJy4vcGxhY2VBZnRlcic7XG5pbXBvcnQgcGxhY2VCZWZvcmUgZnJvbSAnLi9wbGFjZUJlZm9yZSc7XG5pbXBvcnQgcGxhY2VGaXJzdCBmcm9tICcuL3BsYWNlRmlyc3QnO1xuaW1wb3J0IHBsYWNlTGFzdCBmcm9tICcuL3BsYWNlTGFzdCc7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICcuL3JlcGxhY2UnO1xuXG5jb25zdCBub3RQbGFjZXJzID0ge1xuXHRwbGFjZTogcGxhY2UsXG5cdHBsYWNlQWZ0ZXI6IHBsYWNlQWZ0ZXIsXG5cdHBsYWNlQmVmb3JlOiBwbGFjZUJlZm9yZSxcblx0cGxhY2VGaXJzdDogcGxhY2VGaXJzdCxcblx0cGxhY2VMYXN0OiBwbGFjZUxhc3QsXG5cdHJlcGxhY2U6IHJlcGxhY2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFBsYWNlcnM7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vbm90UmVuZGVyZXInO1xuaW1wb3J0IG5vdFBsYWNlcnMgZnJvbSAnLi9wbGFjZXJzJztcblxuY29uc3QgTUVUQV9QQVJUUyA9IFN5bWJvbCgncGFydHMnKTtcbi8qXG5cdGlucHV0ID0ge1xuXHRcdGRhdGE6IG5vdFJlY29yZCBvciBbbm90UmVjb3JkXSxcblx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0aHRtbDogaHRtbChzdHJpbmcpLCBcdFx0Ly/RgtC10LrRgdGCINGBIGh0bWwg0LrQvtC00L7QvCDRiNCw0LHQu9C+0L3QsFxuXHRcdFx0ZWw6IEhUTUxFbGVtZW50KG9iamVjdCksIFx0Ly9ET00g0Y3Qu9C10LzQtdC90YJcblx0XHRcdHNyYzogc3JjKHN0cmluZyksXHRcdFx0Ly/RgdGB0YvQu9C60LAg0L3QsCDRhNCw0LnQuyDRgSDRiNCw0LHQu9C+0L3QvtC8XG5cdFx0XHRuYW1lOiBuYW1lKHN0cmluZylcdFx0XHQvL9C90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAg0LTQu9GPINC/0L7QuNGB0LrQsCDQsiDQutGN0YjQtSBub3RUZW1wbGF0ZUNhY2hlXG5cdFx0fVxuXHRcdG9wdGlvbnM6e1xuXHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0Ly/QsCDRjdGC0L4g0LrQsNC6INCx0YPQtNC10Lwg0L/QvtC80LXRidCw0YLRjCDRgNC10LfRg9C70YzRgtCw0YIg0YDQtdC90LTQtdGA0LjQvdCz0LBcblx0XHRcdHJlbmRlckFuZDogcGxhY2VTdHlsZShzdHJpbmcpINC+0LTQuNC9INC40Lcg0LLQsNGA0LjQsNC90YLQvtCyXG5cdFx0XHRcdFx0cGxhY2VcdFx0LVx00L/QvtC80LXRidCw0LXQvCDQstC90YPRgtGA0Lgg0YbQtdC70LXQstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG5cdFx0XHRcdFx0cmVwbGFjZVx0XHQtXHTQt9Cw0LzQtdC90Y/QtdC8XG5cdFx0XHRcdFx0cGxhY2VBZnRlclx0LVx00L/QvtGB0LvQtVxuXHRcdFx0XHRcdHBsYWNlQmVmb3JlXHQtXHTQtNC+XG5cdFx0XHRcdFx0cGxhY2VGaXJzdFx0LVx00LLQvdGD0YLRgNC4INC/0LXRgNCy0YvQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0XHRcdFx0cGxhY2VMYXN0XHQtXHTQstC90YPRgtGA0Lgg0L/QvtGB0LvQtdC00L3QuNC8INC00L7Rh9C10YDQvdC40Lxcblx0XHR9XG5cdH1cbiovXG5jbGFzcyBub3RDb21wb25lbnQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKXtcblx0XHRpZiAodGhpcy5vd25lcil7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMub3duZXIuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMub3duZXIgPSBpbnB1dC5vd25lcj9pbnB1dC5vd25lcjpudWxsO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dCk7XG5cdFx0dGhpcy5wcmVwYXJlVGVtcGxhdGVFbGVtZW50KGlucHV0LnRlbXBsYXRlID8gaW5wdXQudGVtcGxhdGUgOiBudWxsKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHR9XG5cblx0aW5pdEV2ZW50cyhsaXN0KXtcblx0XHRmb3IobGV0IHQgb2YgbGlzdCl7XG5cdFx0XHR0aGlzLm9uKC4uLnQpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdpZCcpKXtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygnaWQnLCBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ250RWwnKSl7XG5cdFx0XHR0aGlzLmluaXRNYXJrRWxlbWVudCgpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRNYXJrRWxlbWVudCgpe1xuXHRcdGxldCBtYXJrRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdudCcpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbnRFbCcsIG1hcmtFbCk7XG5cdFx0bGV0IHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpLFxuXHRcdFx0dGFyZ2V0UXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5Jyk7XG5cdFx0aWYgKHRhcmdldFF1ZXJ5KXtcblx0XHRcdGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFF1ZXJ5KTtcblx0XHRcdGlmICh0YXJnZXQpe1xuXHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3RhcmdldEVsJywgdGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSl7XG5cdFx0XHR0aHJvdyAnTm8gdGFyZ2V0IHRvIHBsYWNlIHJlbmRlcmVkJztcblx0XHR9ZWxzZXtcblx0XHRcdHBsYWNlci5tYWluKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSwgW21hcmtFbF0pO1xuXHRcdH1cblxuXHR9XG5cblx0aW5pdFdvcmtpbmcodmFsKSB7XG5cdFx0dGhpcy51bnNldFJlYWR5KHZhbCk7XG5cdH1cblxuXHRwcmVwYXJlVGVtcGxhdGVFbGVtZW50KHZhbCkge1xuXHRcdGlmICghdmFsKSB7XG5cdFx0XHR0aGlzLnVuc2V0UmVhZHkoKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnaHRtbCcpICYmIHZhbC5odG1sKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUud3JhcCgnJywgJycsIHZhbC5odG1sKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2VsJykgJiYgdmFsLmVsKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KHZhbC5lbC5jbG9uZU5vZGUodHJ1ZSkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdzcmMnKSAmJiB2YWwuc3JjKSB7XG5cdFx0XHRub3RUZW1wbGF0ZUNhY2hlLmFkZEZyb21VUkwodmFsLnNyYywgdmFsLnNyYylcblx0XHRcdFx0LnRoZW4odGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudC5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ25hbWUnKSAmJiB2YWwubmFtZSkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLmdldCh2YWwubmFtZSkpO1xuXHRcdH1cblx0fVxuXG5cdHNldFByb3RvVGVtcGxhdGVFbGVtZW50KGNvbnQpIHtcblx0XHRpZiAoY29udCkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcsIGNvbnQpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdyZWFkeScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ1dyb25nIHRlbXBsYXRlIGNvbnRhaW5lciBlbGVtZW50Jyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnKS5jbG9uZU5vZGUodHJ1ZSk7XG5cdH1cblxuXHRnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0cmVzZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3RlbXBsYXRlRWxlbWVudCcsIHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKS5jbG9uZU5vZGUodHJ1ZSkpO1xuXHR9XG5cblx0c2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIHRydWUpO1xuXHR9XG5cblx0dW5zZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgZmFsc2UpO1xuXHR9XG5cblx0aXNSZWFkeSgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdyZWFkeScpO1xuXHR9XG5cblx0Y2xlYXJQYXJ0cygpIHtcblx0XHQvKiDQuNC30LLQtdGJ0LDQtdC8INC+0LEg0YPQtNCw0LvQtdC90LjQuCDRjdC70LXQvNC10L3RgtC+0LIgKi9cblx0XHRpZiAodGhpc1tNRVRBX1BBUlRTXSAmJiBBcnJheS5pc0FycmF5KHRoaXNbTUVUQV9QQVJUU10pICYmIHRoaXNbTUVUQV9QQVJUU10ubGVuZ3RoKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXNbTUVUQV9QQVJUU10pIHtcblx0XHRcdFx0aWYgKHQuZGVzdHJveSl7XG5cdFx0XHRcdFx0dC5kZXN0cm95KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdH1cblxuXHRkZXN0cm95KCl7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLnBhcmVudE5vZGUpe1xuXHRcdFx0dGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmdldE9wdGlvbnMoJ250RWwnKSk7XG5cdFx0fVxuXHRcdHRoaXMuZGVhZCA9IHRydWU7XG5cdFx0dGhpcy5vZmZBbGwoKTtcblx0fVxuXG5cdHJlc2V0UGFydHMoKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXSA9IFtdO1xuXHR9XG5cblx0Z2V0UGFydHMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QQVJUU107XG5cdH1cblxuXHRhZGRQYXJ0KHRlbXBsYXRlKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXS5wdXNoKHRlbXBsYXRlKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdH1cblxuXHR1cGRhdGUoKXtcblx0XHR0aGlzLnJlbW92ZU9ic29sZXRlUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyVXBkYXRlJyk7XG5cdH1cblxuXHRwbGFjZVJlbmRlcmVkKCl7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSkge1xuXHRcdFx0bGV0IHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0cGxhY2VyLmJlZm9yZSh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpO1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnBsYWNlUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHBsYWNlci5hZnRlcih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ25vIHRhcmdldCBlbGVtZW50Jyk7XG5cdFx0fVxuXHR9XG5cblx0cGxhY2VQYXJ0KGRhdGEsIGluZGV4KXtcblx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSxcblx0XHRcdG5vZGVzID0gcGFydCYmcGFydC5nZXRTdGFzaD9wYXJ0LmdldFN0YXNoKCk6W10sXG5cdFx0XHR0YXJnZXRFbCxcblx0XHRcdGxhc3ROb2RlLFxuXHRcdFx0cGxhY2VyO1xuXHRcdGlmIChpbmRleCA9PT0gMCl7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIoT1BUUy5ERUZBVUxUX1BMQUNFUl9MT09QKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScpO1xuXHRcdH1cblx0XHRwbGFjZXIubWFpbih0YXJnZXRFbCwgbm9kZXMpO1xuXHRcdGxhc3ROb2RlID0gdGFyZ2V0RWw7XG5cdFx0Zm9yKGxldCB0IG9mIG5vZGVzKXtcblx0XHRcdGlmICh0Lm5vZGVUeXBlID09PSAxKXtcblx0XHRcdFx0bGFzdE5vZGUgPSB0O1xuXHRcdFx0XHRsYXN0Tm9kZS5zZXRBdHRyaWJ1dGUoJ250LWNvbXBvbmVudCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtcGFydCcsIHBhcnQuZ2V0V29ya2luZygncGFydElkJykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJywgbGFzdE5vZGUpO1xuXHR9XG5cblx0Z2V0UGxhY2VyKG1ldGhvZCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2VhcmNoaW5nIGZvciBwbGFjZXInLCBtZXRob2QpO1xuXHRcdGlmIChub3RQbGFjZXJzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW21ldGhvZF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW09QVFMuREVGQVVMVF9QTEFDRVJdO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hEYXRhKGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXREYXRhKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZ1bmModGhpcy5nZXREYXRhKCksIDApO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hQYXJ0KGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldFBhcnRzKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0UGFydHMoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHTQtdGB0LvQuCDRgSDQtNCw0L3QvdGL0LzQuCDQvdC1INGB0LLRj9C30LDQvSDRgNC10L3QtNC10YDQtdGAIC0g0YHQvtC30LTQsNC10Lxcblx0Ki9cblxuXHRyZW5kZXJQYXJ0KGRhdGEpIHtcblx0XHRpZiAoIXRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjcmVhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0bGV0IHJlbmRlcmVyID0gbmV3IG5vdFJlbmRlcmVyKHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dGVtcGxhdGU6IHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKSxcblx0XHRcdFx0Y29tcG9uZW50OiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdC8vcmVuZGVyZXIub24oJ29ic29sZXRlJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFkZFBhcnQocmVuZGVyZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCd1cGRhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0dGhpcy51cGRhdGVQYXJ0KHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlUGFydChwYXJ0KXtcblx0XHRwYXJ0LnVwZGF0ZSgpO1xuXHR9XG5cblx0cmVtb3ZlT2Jzb2xldGVQYXJ0cygpIHtcblx0XHQvL9C60L7QvdCy0LXQtdGAINC/0L7QuNGB0Log0LDQutGC0YPQsNC70YzQvdGL0YUgLSDRg9C00LDQu9C10L3QuNC1INC+0YHRgtCw0LvRjNC90YvRhVxuXHRcdG5vdENvbW1vbi5waXBlKFxuXHRcdFx0dW5kZWZpbmVkLCAvLyBwYXJ0cyB0byBzZWFyY2ggaW4sIGNhbiBiZSAndW5kZWZpbmVkJ1xuXHRcdFx0W1xuXHRcdFx0XHR0aGlzLmZpbmRBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL2ZpcnN0IHJvdW5kLCBzZWFyY2ggZm9yIG9ic29sZXRlXG5cdFx0XHRcdHRoaXMucmVtb3ZlTm90QWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9yZW1vdmUgJ2VtXG5cdFx0XHRdXG5cdFx0KTtcblx0fVxuXG5cdC8qXG5cdFx00LXRgdGC0Ywg0LTQsNC90L3Ri9C1INC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0LDQutGC0YPQsNC70YzQvdC+LFxuXHRcdNC90LXRgiDQtNCw0L3QvdGL0YUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDRgdGC0LDRgNGM0ZFcblx0Ki9cblxuXHRmaW5kQWN0dWFsUGFydHMoKSB7XG5cdFx0bGV0IGFjdHVhbFBhcnRzID0gW107XG5cdFx0dGhpcy5mb3JFYWNoRGF0YSgoZGF0YS8qLCBpbmRleCovKT0+e1xuXHRcdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSk7XG5cdFx0XHRpZiAocGFydCl7XG5cdFx0XHRcdGFjdHVhbFBhcnRzLnB1c2gocGFydCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGFjdHVhbFBhcnRzO1xuXHR9XG5cblx0Lypcblx0XHTRg9C00LDQu9GP0LXQvCDQstGB0LUg0LrRgNC+0LzQtSDQsNC60YLRg9Cw0LvRjNC90YvRhVxuXHQqL1xuXHRyZW1vdmVOb3RBY3R1YWxQYXJ0cyhhY3R1YWxQYXJ0cyl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAoYWN0dWFsUGFydHMuaW5kZXhPZih0aGlzLmdldFBhcnRzKClbdF0pID09PSAtMSl7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKVt0XS5kZXN0cm95KCk7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKS5zcGxpY2UodCwgMSk7XG5cdFx0XHRcdHQtLTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRQYXJ0QnlEYXRhKGRhdGEpIHtcblx0XHRmb3IgKGxldCB0IGluIHRoaXMuZ2V0UGFydHMoKSkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0UGFydHMoKVt0XS5pc0RhdGEoZGF0YSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UGFydHMoKVt0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0c2hvdygpe1xuXG5cdH1cblxuXHRoaWRlKCl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb21wb25lbnQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICcucGFnZS1jb250ZW50Jyxcblx0T1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCA9ICcuaHRtbCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMID0gdHJ1ZSxcblx0T1BUX0RFRkFVTFRfUExVUkFMX05BTUUgPSAnTW9kZWxzJyxcblx0T1BUX0RFRkFVTFRfU0lOR0xFX05BTUUgPSAnTW9kZWwnLFxuXHRPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSA9ICdtYWluJyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0FORCA9ICdwbGFjZSc7XG5cbmNsYXNzIG5vdENvbnRyb2xsZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoYXBwKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJlYWR5OiBmYWxzZSxcblx0XHRcdHZpZXdzOiB7fSxcblx0XHRcdGxpYnM6e30sXG5cdFx0XHR2aWV3TmFtZTogT1BUX0RFRkFVTFRfVklFV19OQU1FLFxuXHRcdFx0aGVscGVyczoge31cblx0XHR9KTtcblx0XHR0aGlzLnNldERhdGEoe30pO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRtb2R1bGVOYW1lOiBPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSxcblx0XHRcdGNvbnRhaW5lclNlbGVjdG9yOiBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IsXG5cdFx0XHRwcmVmaXg6IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZScpLFxuXHRcdFx0cG9zdGZpeDogT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCxcblx0XHRcdHJlbmRlckZyb21VUkw6IE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCxcblx0XHRcdG5hbWVzOntcblx0XHRcdFx0cGx1cmFsOk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FLFxuXHRcdFx0XHRzaW5nbGU6IE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLmluaXRSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0Lypcblx0XHQgICAg0YHRgNCw0LfRgyDQtNC10LvQsNC10Lwg0LTQvtGB0YLRg9C/0L3Ri9C80Lgg0LzQvtC00LXQu9C4IG5vdFJlY29yZCDQuNC3IG5jYENvbnRyb2xsZXJOYW1lYCDQsdGD0LTRg9GCINC00L7RgdGC0YPQv9C90Ysg0LrQsNC6IHRoaXMubnJgTW9kZWxOYW1lYFxuXHRcdCovXG5cdFx0bGV0IGludGVyZmFjZXMgPSB0aGlzLmFwcC5nZXRJbnRlcmZhY2VzKCk7XG5cdFx0dGhpcy5tYWtlID0ge307XG5cdFx0Zm9yIChsZXQgdCBpbiBpbnRlcmZhY2VzKSB7XG5cdFx0XHRpZiAoaW50ZXJmYWNlcy5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdHRoaXMubWFrZVt0XSA9IGludGVyZmFjZXNbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdFJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyKHRoaXMuZ2V0V29ya2luZygndmlld05hbWUnKSwgdGhpcy5nZXREYXRhKCksIHRoaXMuZ2V0V29ya2luZygnaGVscGVycycpKTtcblx0fVxuXG5cdHJlbmRlcih2aWV3TmFtZSA9J2RlZmF1bHQnIC8qIHZpZXcgbmFtZSAqLywgZGF0YSA9IHt9IC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzID0ge30vKiBjb3VsZCBiZSBub3QgcmVwcmVzZW50ZWQgKi8pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHZhciB2aWV3ID0gdGhpcy5nZXRWaWV3KHZpZXdOYW1lKTtcblxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3ID09PSAndW5kZWZpbmVkJyB8fCB2aWV3ID09PSBudWxsKSB7XG5cdFx0XHRcdHJlamVjdCgnTm8gdmlldyBmb3VuZCcsIHZpZXdOYW1lKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2aWV3ID0gbm90Q29tbW9uLmV4dGVuZCh7fSwgdmlldyk7XG5cdFx0XHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0XHRcdC8vINGN0LvQtdC80LXQvdGC0LAsINC90L4g0LjQt9Cy0LXRgdGC0L3QvtC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGA0LVcblx0XHRcdFx0aWYgKCgodHlwZW9mIHZpZXcudGFyZ2V0RWwgPT09ICd1bmRlZmluZWQnKSB8fCAodmlldy50YXJnZXRFbCA9PT0gbnVsbCkpICYmICh0eXBlb2Ygdmlldy50YXJnZXRRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy50YXJnZXRRdWVyeSAhPT0gbnVsbCAmJiB2aWV3LnRhcmdldFF1ZXJ5Lmxlbmd0aCA+IDApKSB7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iodmlldy50YXJnZXRRdWVyeSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHZpZXcuaGVscGVycywgaGVscGVycyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0fVxuXHRcdFx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0XHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckZyb21VUkwnKSkge1xuXHRcdFx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygdmlldy50ZW1wbGF0ZVVSTCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldy50ZW1wbGF0ZVVSTCA9PSBudWxsIHx8IHZpZXcudGVtcGxhdGVVUkwubGVuZ3RoID09IDApIHtcblx0XHRcdFx0XHRcdGxldCBwcmVmaXggPSAodmlldy5jb21tb24gPyB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5jb21tb24nKTogdGhpcy5nZXRNb2R1bGVQcmVmaXgoKSksXG5cdFx0XHRcdFx0XHRcdG5hbWUgPSAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiB2aWV3TmFtZSksXG5cdFx0XHRcdFx0XHRcdHBvc3RmaXggPSB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHRcdC8v0LPQtdC90LXRgNC40YDRg9C10Lwg0LDQtNGA0LXRgSDQv9C+INGI0LDQsdC70L7QvdGDXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gIFtwcmVmaXgsIG5hbWVdLmpvaW4oJy8nKSArIHBvc3RmaXg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8v0LAg0LXRgdC70Lgg0LXRgdGC0Ywg0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCwg0YLQvlxuXHRcdFx0XHRcdGlmICh2aWV3Lmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU5hbWUnKSkge1xuXHRcdFx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVOYW1lID0gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIHZpZXcudGVtcGxhdGVOYW1lICsgdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTp7XG5cdFx0XHRcdFx0XHRuYW1lOiB2aWV3LnRlbXBsYXRlTmFtZSxcblx0XHRcdFx0XHRcdHNyYzogdmlldy50ZW1wbGF0ZVVSTCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czpbWydhZnRlclJlbmRlcicsIHJlc29sdmVdXSxcblx0XHRcdFx0XHRvcHRpb25zOntcblx0XHRcdFx0XHRcdHRhcmdldEVsOiB2aWV3LnRhcmdldEVsLFxuXHRcdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRcdHJlbmRlckFuZDogdmlldy5yZW5kZXJBbmQgfHwgT1BUX0RFRkFVTFRfUkVOREVSX0FORFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRBcHAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwO1xuXHR9XG5cblx0c2V0TW9kZWwobW9kZWwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGVsJywgbW9kZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kZWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnbW9kZWwnKTtcblx0fVxuXG5cdHNldFJlYWR5KHZhbCA9IHRydWUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdmFsKTtcblx0XHR2YWwgPyB0aGlzLnRyaWdnZXIoJ3JlYWR5JykgOiB0aGlzLnRyaWdnZXIoJ2J1c3knKTtcblx0fVxuXG5cdHNldFZpZXcobmFtZSwgdmlldyl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSwgdmlldyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRWaWV3cyh2aWV3cyl7XG5cdFx0Zm9yKGxldCB0IGluIHZpZXdzKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgdCksIHZpZXdzW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRWaWV3KG5hbWUgPSAnZGVmYXVsdCcpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpKTtcblx0fVxuXG5cdHNldE1vZHVsZU5hbWUodmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdtb2R1bGVOYW1lJywgdmFsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZHVsZU5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnbW9kdWxlTmFtZScpO1xuXHR9XG5cblx0Z2V0TW9kdWxlUHJlZml4KCl7XG5cdFx0cmV0dXJuIFt0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGVzJyksIHRoaXMuZ2V0TW9kdWxlTmFtZSgpXS5qb2luKCcvJyk7XG5cdH1cblxuXHRwcmVsb2FkTGliKGxpc3QgPSB7fSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRpZih0eXBlb2YgbGlzdCAhPT0gJ29iamVjdCcpe1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gbGlzdCl7XG5cdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykucHVzaChsaXN0W3RdKTtcblx0XHRcdFx0XHR0aGlzLm1ha2VbbGlzdFt0XV0oe30pLiRsaXN0QWxsKClcblx0XHRcdFx0XHRcdC50aGVuKChkYXRhKT0+e1xuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbGlicycpKXtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2xpYnMnLCB7fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRPcHRpb25zKCdsaWJzJylbdF0gPSBkYXRhO1xuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pID4gLTEpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnNwbGljZSh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pLCAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KGVycik7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHF1ZWVVcGxvYWQobmFtZSwgbGlzdCl7XG5cdFx0Ly9oYXNoIChmaWVsZE5hbWU9PmZpbGVzTGlzdClcblx0XHRpZighdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRRdWVlJykpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd1cGxvYWRRdWVlJywge30pO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnKVtuYW1lXSA9IGxpc3Q7XG5cdH1cblxuXHRleGVjVXBsb2FkcyhpdGVtKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0V29ya2luZygndXBsb2FkUXVlZScpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0aWYodHlwZW9mIGxpc3QgIT09ICdvYmplY3QnKXtcblx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwbG9hZGluZycsIHt9KTtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGxpc3Qpe1xuXHRcdFx0XHRcdGxldCBmaWVsZEZpbGVzID0gbGlzdFt0XTtcblx0XHRcdFx0XHRpZiAoZmllbGRGaWxlcy5sZW5ndGggPiAxKXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSBbXTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSAnJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yKGxldCBmID0gMDsgZiA8IGZpZWxkRmlsZXMubGVuZ3RoOyBmKyspe1xuXHRcdFx0XHRcdFx0aWYoIXRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdID0gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0rKztcblx0XHRcdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3VwbG9hZGVyJylcblx0XHRcdFx0XHRcdFx0LnVwbG9hZChmaWVsZEZpbGVzW2ZdKVxuXHRcdFx0XHRcdFx0XHQudGhlbigoc2F2ZWRGaWxlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZmlsZSB1cGxvYWRlZCcsIHQsZiwgc2F2ZWRGaWxlKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdLS07XG5cdFx0XHRcdFx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XSA9PT0gMCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheShpdGVtW2ZdKSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtW3RdLnB1c2goc2F2ZWRGaWxlLmhhc2gpO1xuXHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVt0XSA9IHNhdmVkRmlsZS5oYXNoO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZihPYmplY3Qua2V5cyh0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKE9iamVjdC5rZXlzKHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0b25BZnRlclJlbmRlcigpe1xuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCA9ICdmb3JtXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfRk9STV9USVRMRSA9ICdGb3JtIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge30sXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUID0gWydvcHRpb25zJywgJ21hbmlmZXN0JywgJ2FwcCddO1xuXG5jbGFzcyBub3RGb3JtIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdwcmVmaXgnLCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50cycsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLnNldERhdGEobmV3IG5vdFJlY29yZCh7fSwgdGhpcy5nZXREYXRhKCkpKTtcblx0XHR9XG5cdFx0dGhpcy5vbignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjYW5jZWwnLCB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcykpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKTtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoKSB7XG5cdFx0bGV0IG1hbmlmZXN0ID0gdGhpcy5nZXRNYW5pZmVzdCgpO1xuXHRcdGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC5hY3Rpb25zKSB7XG5cdFx0XHRyZXR1cm4gbWFuaWZlc3QuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpKSA/IG1hbmlmZXN0LmFjdGlvbnNbdGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKV0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRnZXRGb3JtRmllbGRzTGlzdCgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0cm9sZSA9IHRoaXMuZ2V0T3B0aW9ucygncm9sZScsIE9QVF9ERUZBVUxUX1JPTEVfTkFNRSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpIHtcblxuXHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzKSB7XG5cdFx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xuXHRcdFx0XHRcdGxpc3QgPSBhY3Rpb25EYXRhLmZpZWxkc1tyb2xlXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdC8qXG5cdFx0UmVuZGVyaW5nXG5cdCovXG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHR9XG5cblx0Z2V0UGFydFRlbXBsYXRlTmFtZShmb3JtUGFydCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHRoaXMuYmluZEZvcm1FdmVudHMuYmluZCh0aGlzKV0sXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfRk9STV9USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KClbdF07XG5cdFx0XHRcdHRoaXMuYWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGVhckZpZWxkc0NvbXBvbmVudHMoKSB7XG5cdFx0bGV0IGNvbXBzID0gdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJyk7XG5cdFx0d2hpbGUgKGNvbXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbXBzWzBdLmNvbXBvbmVudC5kZXN0cm95KCk7XG5cdFx0XHRjb21wcy5zcGxpY2UoMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlicygpe1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRvcHRpb25zOiB7fSxcblx0XHRcdG1hbmlmZXN0OiB7fSxcblx0XHRcdGFwcDoge30sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAobm90Q29tbW9uLmdldEFwcCgpICYmIG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKSl7XG5cdFx0XHRyZXN1bHQuYXBwID0gbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQgJiYgdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKSl7XG5cdFx0XHRyZXN1bHQubWFuaWZlc3QgPSB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpLmZpZWxkcztcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSB7XG5cdFx0bGV0IGRlZiA9IE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04sXG5cdFx0XHRmaWVsZHNMaWJzID0gdGhpcy5nZXRGaWVsZHNMaWJzKCk7XG5cdFx0Zm9yKGxldCB0IG9mIE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUKXtcblx0XHRcdGlmIChmaWVsZHNMaWJzLmhhc093blByb3BlcnR5KHQpICYmIGZpZWxkc0xpYnNbdF0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSl7XG5cdFx0XHRcdHJldHVybiBmaWVsZHNMaWJzW3RdW2ZpZWxkTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkZWY7XG5cdH1cblxuXHRhZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpIHtcblx0XHRsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSk7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKT0+e1xuXHRcdFx0XHRyZXR1cm4gcGFyYW1zLml0ZW0udmFsdWUgPT09IHRoaXMuZ2V0RGF0YShmaWVsZE5hbWUpO1xuXHRcdFx0fSxcblx0XHRcdGZpZWxkOiByZWMuZmllbGQsXG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKVxuXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0Rm9ybVRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCcsXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlckRhdGFDaGFuZ2UnLCB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMocGFyYW1zKXtcblx0XHRub3RDb21tb24ubG9nKCdjb2xsZWN0IGRhdGEgZnJvbSBjb21wb25lbnRzJywgcGFyYW1zKTtcblx0fVxuXG5cdGdldEZvcm1UYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jyl7XG5cdFx0aWYgKCF0YXJnZXQpe3RhcmdldCA9ICdib2R5Jzt9XG5cdFx0bGV0IHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0IT09J2JvZHknKXtcblx0XHRcdHRhcmdldCA9ICdib2R5Jztcblx0XHRcdHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0fVxuXHRcdGlmKCFyZXMgJiYgdGFyZ2V0PT0nYm9keScpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHRjb2xsZWN0RGF0YSgpIHtcblx0XHQvL2xldCBkYXRhID0gdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcyk7XG5cdH1cblxuXHRiaW5kRm9ybUV2ZW50cygpe1xuXHRcdGxldCB0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZih0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZih0YXJnZXQpe1xuXHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3RhcmdldEVsJywgdGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSl7XG5cdFx0XHRsZXRcdGZvcm0gPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXHRcdFx0aWYoZm9ybSl7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR1cGRhdGVGaWVsZChmaWVsZE5hbWUpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uZmllbGQubmFtZSA9PT0gZmllbGROYW1lKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCkge1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpIHtcblxuXHR9XG5cblx0b25SZXNldCgpIHtcblxuXHR9XG5cblx0Z2V0RmllbGRzKCkge1xuXG5cdH1cblxuXHRhZGRGaWVsZCgpIHtcblxuXHR9XG5cblx0cmVtb3ZlRmllbGQoKSB7XG5cblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Rm9ybTtcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9ub3RGb3JtLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfVklFVyA9ICdlZGl0JyxcbiAgT1BUX0RFRkFVTFRfQUNUSU9OID0gJ2NyZWF0ZScsXG4gIE9QVF9ERUZBVUxUX0lURU0gPSB7XG4gICAgX2lkOiBudWxsLFxuICAgIHRpdGxlOiAnVGl0bGUnLFxuICAgIHZhbHVlOiAnVmFsdWUnXG4gIH07XG5cbmNsYXNzIENSVURDcmVhdGUgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuICAgICAgICBzdXBlcihwYXJlbnQuYXBwKTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcbiAgICAgICAgbm90Q29tbW9uLmxvZygnQ1JVRCBDcmVhdGUnKTtcbiAgICAgICAgdGhpcy5zZXRWaWV3cyh7XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLm5hbWUnKSB8fCBPUFRfREVGQVVMVF9WSUVXLFxuICAgICAgICAgICAgICAgIGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmNvbW1vbicpIHx8IHRydWUsXG4gICAgICAgICAgICAgICAgdGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG4gICAgICAgICAgICAgICAgaGVscGVyczoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUucHJlbG9hZCcpKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5pbml0RGF0YS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG4gICAgICAgICAgICAudGhlbih0aGlzLnJlbmRlckZvcm0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjcmVhdGVEZWZhdWx0KCl7XG4gICAgICBpZiAodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmRlZmF1bHRJdGVtJykgJiYgdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICYmIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSl7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0obm90Q29tbW9uLmV4dGVuZCh7fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmRlZmF1bHRJdGVtJykpKTtcbiAgICAgIH1lbHNlIGlmKHRoaXMucGFyZW50LmluaXRJdGVtKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmluaXRJdGVtKCk7XG4gICAgICB9ZWxzZSBpZiAodGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICYmIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSl7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0obm90Q29tbW9uLmV4dGVuZCh7fSwgT1BUX0RFRkFVTFRfSVRFTSkpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBuZXcgbm90UmVjb3JkKHt9LCBub3RDb21tb24uZXh0ZW5kKHt9LCBPUFRfREVGQVVMVF9JVEVNKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5pdERhdGEoKXtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICB0cnl7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuY3JlYXRlRGVmYXVsdCgpKTtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuZ2V0RGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKXtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcldyYXBwZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcignZGVmYXVsdCcsIHt9LCB7fSk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+e1xuICAgICAgICAgICAgdGhpcy5mb3JtID0gbmV3IG5vdEZvcm0oe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfQUNUSU9OLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnByZWZpeCcpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUucm9sZScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG4gICAgICAgICAgICAgICAgICAgICAgbGlua0JhY2tUb0xpc3Q6IHRoaXMucGFyZW50LmxpbmtCYWNrVG9MaXN0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiAocGFyYW1zKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVzID0gcGFyYW1zLmUudGFyZ2V0LmZpbGVzIHx8IHBhcmFtcy5lLmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RDb21tb24ubG9nKCdmaWxlIGNoYW5nZWQnLCBmaWxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oZWxwZXJzLmZpZWxkLm5hbWUgJiYgZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVlVXBsb2FkKHBhcmFtcy5oZWxwZXJzLmZpZWxkLm5hbWUsIGZpbGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90Q29tbW9uLmxvZygnc3VibWl0IGZvcm0gJywgdGhpcy5uZXdJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWNVcGxvYWRzKHRoaXMuZ2V0RGF0YSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbih0aGlzLmNyZWF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhZnRlclN1Ym1pdDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29Ub1RhYmxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGliczogdGhpcy5nZXRPcHRpb25zKCdsaWJzJyksXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5oZWxwZXJzJykgfHwge30pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBldmVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAgWydhZnRlclJlbmRlcicsIHJlc29sdmVdLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2FmdGVyU3VibWl0JywgJ2FmdGVyUmVzdG9yZSddLCB0aGlzLnBhcmVudC5iYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlKGl0ZW0pIHtcbiAgICAgICAgaXRlbVsnJCcgKyB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuYWN0aW9uJyldKClcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBub3RDb21tb24ubG9nKCdmb3JtIHNhdmVkJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUodGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIG5vdENvbW1vbi5lcnJvcignZm9ybSBub3Qgc2F2ZWQnLCByZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURDcmVhdGU7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9QQUdFX1NJWkUgPSAyMCxcblx0T1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIgPSAwLFxuXHRPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTiA9IDEsXG5cdE9QVF9ERUZBVUxUX1NPUlRfRklFTEQgPSAnX2lkJyxcblx0T1BUX0ZJRUxEX05BTUVfUFJFX1BST0MgPSAncHJlcHJvY2Vzc29yJztcblxuY2xhc3Mgbm90VGFibGUgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCBbXSk7XG5cdFx0aWYoIXRoaXMuZ2V0RGF0YSgpIHx8ICFBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgncm93cycpKSl7XG5cdFx0XHR0aGlzLnNldERhdGEoe3Jvd3M6W119KTtcblx0XHR9XG5cdFx0dGhpcy5yZXNldFBhZ2VyKCk7XG5cdFx0dGhpcy5yZXNldEZpbHRlcigpO1xuXHRcdHRoaXMucmVzZXRTb3J0ZXIoKTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudCcpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgY29tcG9uZW50ID0gbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6ICd0YWJsZV93cmFwcGVyJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0cmVuZGVyQW5kOiB0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckluc2lkZS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHRdXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgY29tcG9uZW50KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJJbnNpZGUoKSB7XG5cdFx0dGhpcy5yZW5kZXJIZWFkZXIoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0XHR0aGlzLnJlbmRlckJvZHkoKTtcblx0XHR0aGlzLmJpbmRTZWFyY2goKTtcblx0XHR0aGlzLmJpbmRDdXN0b21CaW5kaW5ncygpO1xuXHR9XG5cblx0cmVuZGVySGVhZGVyKCkge1xuXHRcdHZhciB0YWJsZUhlYWRlciA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCd0aGVhZCB0cicpO1xuXHRcdGlmICghdGFibGVIZWFkZXIpIHJldHVybjtcblx0XHRsZXQgZmllbGRzID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG5ld1RoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEgnKTtcblx0XHRcdG5ld1RoLmlubmVySFRNTCA9IGZpZWxkc1tpXS50aXRsZTtcblx0XHRcdGlmIChmaWVsZHNbaV0uaGFzT3duUHJvcGVydHkoJ3NvcnRhYmxlJykgJiYgZmllbGRzW2ldLnNvcnRhYmxlKSB7XG5cdFx0XHRcdHRoaXMuYXR0YWNoU29ydGluZ0hhbmRsZXJzKG5ld1RoLCBmaWVsZHNbaV0ucGF0aCk7XG5cdFx0XHR9XG5cdFx0XHR0YWJsZUhlYWRlci5hcHBlbmRDaGlsZChuZXdUaCk7XG5cdFx0fVxuXHR9XG5cblx0YXR0YWNoU29ydGluZ0hhbmRsZXJzKGhlYWRDZWxsLCBmaWVsZE5hbWUpIHtcblx0XHRoZWFkQ2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLmNoYW5nZVNvcnRpbmdPcHRpb25zKGhlYWRDZWxsLCBmaWVsZE5hbWUpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHRcdGhlYWRDZWxsLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0fVxuXG5cdGNoYW5nZVNvcnRpbmdPcHRpb25zKGVsLCBmaWVsZE5hbWUpIHtcblx0XHRpZiAoZmllbGROYW1lID09PSB0aGlzLmdldFNvcnRlcigpLnNvcnRCeUZpZWxkKXtcblx0XHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdFx0c29ydEJ5RmllbGQ6IGZpZWxkTmFtZSxcblx0XHRcdFx0c29ydERpcmVjdGlvbjogLTEgKiB0aGlzLmdldFNvcnRlcigpLnNvcnREaXJlY3Rpb24sXG5cdFx0XHR9KTtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdFx0c29ydEJ5RmllbGQ6IGZpZWxkTmFtZSxcblx0XHRcdFx0c29ydERpcmVjdGlvbjogT1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04sXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0aWYgKGVsLnBhcmVudE5vZGUpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWwucGFyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXSA9PT0gZWwpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnbm9uZScpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5nZXRTb3J0ZXIoKS5zb3J0RGlyZWN0aW9uID4gMCkge1xuXHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnYXNjZW5kaW5nJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ2Rlc2NlbmRpbmcnKTtcblx0XHR9XG5cdH1cblxuXHRzZXRTb3J0ZXIoaGFzaCkge1xuXHRcdC8vY29uc29sZS5sb2coJ3NldFNvcnRlcicsIGhhc2gpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnc29ydGVyJywgaGFzaCk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlRGF0YSgpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRTb3J0ZXIoKXtcblx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRzb3J0QnlGaWVsZDogT1BUX0RFRkFVTFRfU09SVF9GSUVMRCxcblx0XHRcdHNvcnREaXJlY3Rpb246IE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3NvcnRlcicpO1xuXHR9XG5cblx0Z2V0RmlsdGVyU2VhcmNoKCkge1xuXHRcdHJldHVybiAodHlwZW9mIHRoaXMuZ2V0RmlsdGVyKCkgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0RmlsdGVyKCkgIT09IG51bGwgJiYgdHlwZW9mIHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaCAhPT0gbnVsbCkgPyB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaC50b1N0cmluZygpIDogJyc7XG5cdH1cblxuXHRpbnZhbGlkYXRlRGF0YSgpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdsaXZlTG9hZCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnb25lUGFnZXInKSkge1xuXHRcdFx0d2hpbGUodGhpcy5nZXREYXRhKCdyb3dzJykubGVuZ3RoPjApe1xuXHRcdFx0XHR0aGlzLmdldERhdGEoJ3Jvd3MnKS5wb3AoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMucmVzZXRQYWdlcigpO1xuXHRcdH1cblx0fVxuXG5cdHNldEZpbHRlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXInLCBoYXNoKTtcblx0XHR0aGlzLmludmFsaWRhdGVEYXRhKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHR0aGlzLnNldEZpbHRlcih7fSk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyJyk7XG5cdH1cblxuXHRzZXRQYWdlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdwYWdlcicsIGhhc2gpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3BhZ2VyJywge1xuXHRcdFx0cGFnZVNpemU6IGlzTmFOKHRoaXMuZ2V0T3B0aW9ucygncGFnZVNpemUnKSkgPyBPUFRfREVGQVVMVF9QQUdFX1NJWkU6dGhpcy5nZXRPcHRpb25zKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogaXNOYU4odGhpcy5nZXRPcHRpb25zKCdwYWdlTnVtYmVyJykpID8gT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVI6dGhpcy5nZXRPcHRpb25zKCdwYWdlTnVtYmVyJyksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwYWdlcicpO1xuXHR9XG5cblx0c2V0VXBkYXRpbmcoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd1cGRhdGluZycsIHRydWUpO1xuXHR9XG5cblx0c2V0VXBkYXRlZCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwZGF0aW5nJywgZmFsc2UpO1xuXHR9XG5cblx0aWZVcGRhdGluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd1cGRhdGluZycpO1xuXHR9XG5cblx0dXBkYXRlRGF0YSgpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdsaXZlTG9hZCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlJykpIHtcblx0XHRcdGlmICh0aGlzLmlmVXBkYXRpbmcoKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvL2xvYWQgZnJvbSBzZXJ2ZXJcblx0XHRcdGxldCBxdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlJykoe30pXG5cdFx0XHRcdC5zZXRGaWx0ZXIodGhpcy5nZXRGaWx0ZXIoKSlcblx0XHRcdFx0LnNldFNvcnRlcih0aGlzLmdldFNvcnRlcigpKVxuXHRcdFx0XHQuc2V0UGFnZXIodGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplLCB0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlcik7XG5cdFx0XHR0aGlzLnNldFVwZGF0aW5nKCk7XG5cdFx0XHRxdWVyeS4kbGlzdCgpXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnJGxpc3QgZm9yIHRhYmxlJywgZGF0YSk7XG5cdFx0XHRcdFx0dGhpcy5zZXREYXRhKHtcblx0XHRcdFx0XHRcdHJvd3M6IHRoaXMuZ2V0RGF0YSgncm93cycpLmNvbmNhdChkYXRhKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHRoaXMucHJvY2Nlc3NEYXRhKCk7XG5cdFx0XHRcdFx0dGhpcy5yZWZyZXNoQm9keSgpO1xuXHRcdFx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoZSk7XG5cdFx0XHRcdFx0dGhpcy5zZXRVcGRhdGVkKCk7XG5cdFx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvL2xvY2FsIG1hZ2ljXG5cdFx0XHR0aGlzLnNldFVwZGF0aW5nKCk7XG5cdFx0XHR0aGlzLnByb2NjZXNzRGF0YSgpO1xuXHRcdFx0dGhpcy5yZWZyZXNoQm9keSgpO1xuXHRcdFx0dGhpcy5zZXRVcGRhdGVkKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJvY2Nlc3NEYXRhKCkge1xuXHRcdHZhciB0aGF0RmlsdGVyID0gdGhpcy5nZXRGaWx0ZXIoKTtcblx0XHRpZiAodHlwZW9mIHRoYXRGaWx0ZXIgIT09ICd1bmRlZmluZWQnICYmIHRoYXRGaWx0ZXIgIT09IG51bGwgJiYgdHlwZW9mIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gbnVsbCAmJiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaC5sZW5ndGggPiAwKSB7XG5cdFx0XHQvL1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKS5maWx0ZXIodGhpcy50ZXN0RGF0YUl0ZW0uYmluZCh0aGlzKSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIHRoaXMuZ2V0RGF0YSgncm93cycpKTtcblx0XHR9XG5cdFx0Ly8vL3NvcnRlclxuXHRcdHZhciB0aGF0U29ydGVyID0gdGhpcy5nZXRTb3J0ZXIoKTtcblx0XHRpZiAodHlwZW9mIHRoYXRTb3J0ZXIgIT09ICd1bmRlZmluZWQnICYmIHRoYXRTb3J0ZXIgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykuc29ydCgoaXRlbTEsIGl0ZW0yKSA9PiB7XG5cdFx0XHRcdGxldCB0MSA9IG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsIGl0ZW0xLCB7fSksXG5cdFx0XHRcdFx0dDIgPSBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLGl0ZW0yLHt9KTtcblx0XHRcdFx0aWYgKGlzTmFOKHQxKSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdDEgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0MiAhPT0gJ3VuZGVmaW5lZCcgJiYgdDEubG9jYWxlQ29tcGFyZSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdDEubG9jYWxlQ29tcGFyZSgpICogLSB0aGF0U29ydGVyLnNvcnREaXJlY3Rpb247XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuICgodDEgPCB0MikgPyAxIDogLTEpICogdGhhdFNvcnRlci5zb3J0RGlyZWN0aW9uO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRiaW5kU2VhcmNoKCkge1xuXHRcdHZhciBzZWFyY2hFbCA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwic2VhcmNoXCJdJylbMF07XG5cdFx0aWYgKCFzZWFyY2hFbCkgcmV0dXJuO1xuXHRcdHZhciBvbkV2ZW50ID0gKGUpID0+IHtcblx0XHRcdHRoaXMuc2V0RmlsdGVyKHtcblx0XHRcdFx0ZmlsdGVyU2VhcmNoOiBlLmN1cnJlbnRUYXJnZXQudmFsdWVcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblx0XHRzZWFyY2hFbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uRXZlbnQpO1xuXHRcdHNlYXJjaEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2VudGVyJywgb25FdmVudCk7XG5cdH1cblxuXG5cdGJpbmRDdXN0b21CaW5kaW5ncygpIHtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSB8fCAhdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGZvciAodmFyIHNlbGVjdG9yIGluIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSkge1xuXHRcdFx0dmFyIGVscyA9IHRoaXMuZ2V0T3B0aW9uKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0Zm9yICh2YXIgZWxJZCA9IDA7IGVsSWQgPCBlbHMubGVuZ3RoOyBlbElkKyspIHtcblx0XHRcdFx0dmFyIGVsID0gZWxzW2VsSWRdO1xuXHRcdFx0XHRmb3IgKHZhciBldmVudCBpbiB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJylbc2VsZWN0b3JdKSB7XG5cdFx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpW3NlbGVjdG9yXVtldmVudF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bG9hZE5leHQoKSB7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdwYWdlcicpLnBhZ2VOdW1iZXIrKztcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlbmRlclJvdyhpdGVtLCBpbmRleCkge1xuXHRcdGxldCBuZXdSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUUicpLFxuXHRcdFx0ZmllbGRzID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IG5ld1RkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEQnKSxcblx0XHRcdFx0ZmllbGQgPSBmaWVsZHNbaV0sXG5cdFx0XHRcdHByZXByb2Nlc3NlZCA9IG51bGwsXG5cdFx0XHRcdHZhbCA9IG5vdFBhdGguZ2V0KGZpZWxkLnBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZWRpdGFibGUnKSAmJiAhZmllbGQuaGFzT3duUHJvcGVydHkoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHRcdG5ld1RkLnNldEF0dHJpYnV0ZSgnY29udGVudEVkaXRhYmxlJywgdHJ1ZSk7XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQucGF0aCA9IGZpZWxkLnBhdGg7XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQuaXRlbUlkID0gaXRlbVt0aGlzLmdldE9wdGlvbnMoJ2l0ZW1JZEZpZWxkJyldO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0LnZhbHVlID0gdmFsO1xuXHRcdFx0XHRuZXdUZC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCk9Pntcblx0XHRcdFx0XHRub3RQYXRoLnNldChmaWVsZC5wYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSwgbmV3VGQudGV4dENvbnRlbnQpO1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KE9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DKSkge1xuXHRcdFx0XHRwcmVwcm9jZXNzZWQgPSBmaWVsZFtPUFRfRklFTERfTkFNRV9QUkVfUFJPQ10odmFsLCBpdGVtLCBpbmRleCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnY29tcG9uZW50JykpIHtcblx0XHRcdFx0bmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YTogZmllbGQuY29tcG9uZW50LmRhdGEgfHwgcHJlcHJvY2Vzc2VkIHx8IHt2YWwsIGl0ZW0sIGluZGV4fSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTogZmllbGQuY29tcG9uZW50LnRlbXBsYXRlLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBuZXdUZCxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IGZpZWxkLmNvbXBvbmVudC5ldmVudHMgfHwgW11cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXdUZC5pbm5lckhUTUwgPSBwcmVwcm9jZXNzZWQgfHwgdmFsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnc3R5bGUnKSl7XG5cdFx0XHRcdGZvcihsZXQgc3R5bGUgaW4gZmllbGQuc3R5bGUpe1xuXHRcdFx0XHRcdGlmKGZpZWxkLnN0eWxlLmhhc093blByb3BlcnR5KHN0eWxlKSl7XG5cdFx0XHRcdFx0XHRuZXdUZC5zdHlsZVtzdHlsZV0gPSBmaWVsZC5zdHlsZVtzdHlsZV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykgJiYgZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdGZvciAodmFyIGogaW4gZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcihqLCAoZSk9Pntcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHJldHVybiBmaWVsZC5ldmVudHNbal0oe1xuXHRcdFx0XHRcdFx0XHRldmVudDogZSxcblx0XHRcdFx0XHRcdFx0ZWxlbWVudDogbmV3VGQsXG5cdFx0XHRcdFx0XHRcdGl0ZW06IGl0ZW0sXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB2YWwsXG5cdFx0XHRcdFx0XHRcdGZpZWxkOiBmaWVsZFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRuZXdSb3cuYXBwZW5kQ2hpbGQobmV3VGQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdwcm9jUm93JykpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3Byb2NSb3cnKShuZXdSb3csIGl0ZW0pO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3Um93O1xuXHR9XG5cblx0cmVmcmVzaEJvZHkoKSB7XG5cdFx0dmFyIHRib2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXHRcdGlmICghdGJvZHkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5jbGVhckJvZHkoKTtcblx0XHR0aGlzLmNoZWNrRmlsdGVyZWQoKTtcblx0XHR2YXIgdGhpc1BhZ2VTdGFydHMgPSAwLFxuXHRcdFx0bmV4dFBhZ2VFbmRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyICsgMSk7XG5cdFx0Zm9yICh2YXIgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0dGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJSb3codGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKVtpXSkpO1xuXHRcdH1cblx0fVxuXG5cdGZpbmRCb2R5KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGJvZHknKTtcblx0fVxuXG5cdGNsZWFyQm9keSgpIHtcblx0XHR2YXIgdGFibGVCb2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXHRcdGlmICghdGFibGVCb2R5KSByZXR1cm47XG5cdFx0dGFibGVCb2R5LmlubmVySFRNTCA9ICcnO1xuXHR9XG5cblx0Y2hlY2tGaWx0ZXJlZCgpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsW10pO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlckJvZHkoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ29uZVBhZ2VyJykpIHtcblx0XHRcdHRoaXMuY2xlYXJCb2R5KCk7XG5cdFx0fVxuXHRcdHRoaXMuY2hlY2tGaWx0ZXJlZCgpO1xuXHRcdHZhciB0aGlzUGFnZVN0YXJ0cyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciksXG5cdFx0XHRuZXh0UGFnZUVuZHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIgKyAxKSxcblx0XHRcdHRib2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0dGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJSb3codGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKVtpXSkpO1xuXHRcdH1cblx0fVxuXG5cdHRlc3REYXRhSXRlbShpdGVtKXtcblx0XHR2YXIgc3RyVmFsdWUgPSB0aGlzLmdldEZpbHRlclNlYXJjaCgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0Zm9yKHZhciBrIGluIGl0ZW0pe1xuXHRcdFx0dmFyIHRvQ29tcCA9IGl0ZW1ba10udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKHRvQ29tcC5pbmRleE9mKHN0clZhbHVlKT4tMSl7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90VGFibGU7XG4iLCJpbXBvcnQgbm90VGFibGUgZnJvbSAnLi4vY29tcG9uZW50cy9ub3RUYWJsZS5qcyc7XG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BfREVGQVVMVF9QQUdFX1NJWkUgPSA1MCxcblx0T1BUX0RFRkFVTFRfVklFVyA9ICdsaXN0JztcblxuY2xhc3MgQ1JVRExpc3QgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpIHtcblx0XHRzdXBlcihwYXJlbnQuYXBwKTtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0bm90Q29tbW9uLmxvZygnQ1JVRCBMaXN0Jyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5jb21tb24nKSB8fCB0cnVlLFxuXHRcdFx0XHR0YXJnZXRRdWVyeTogcGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuXHRcdFx0XHRoZWxwZXJzOiB7fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy51cGRhdGVEYXRhdGFibGUuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoJ2RlZmF1bHQnLCB7fSwge1xuXHRcdFx0dGl0bGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ25hbWVzLnBsdXJhbCcpLFxuXHRcdFx0c2hvd0FkZEZvcm06ICgpID0+IHtcblx0XHRcdFx0dGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKFt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCksICdjcmVhdGUnXS5qb2luKCcvJykpO1xuXHRcdFx0fSxcblx0XHRsaW5rQmFja1RvTGlzdDogdGhpcy5wYXJlbnQubGlua0JhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCksXG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVEYXRhdGFibGUoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeXtcblx0XHRcdFx0dGhpcy50YWJsZVZpZXcgPSBuZXcgbm90VGFibGUoe1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGZpZWxkczogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5maWVsZHMnKSxcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ25hbWVzLnBsdXJhbCcpXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmhlbHBlcnMnKSB8fCB7fSksXG5cdFx0XHRcdFx0XHRwYWdlU2l6ZTogdGhpcy5hcHAuZ2V0T3B0aW9ucygncGFnZXIuc2l6ZScpIHx8IE9QX0RFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0XHRcdFx0cGFnZU51bWJlcjogMCxcblx0XHRcdFx0XHRcdG9uZVBhZ2VyOiB0cnVlLFxuXHRcdFx0XHRcdFx0bGl2ZUxvYWQ6IHRydWUsXG5cdFx0XHRcdFx0XHRpbnRlcmZhY2U6IHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHNob3dOZXh0UGFnZSgpIHtcblx0XHRpZiAodGhpcy50YWJsZVZpZXcpIHtcblx0XHRcdHRoaXMudGFibGVWaWV3LmxvYWROZXh0KCk7XG5cdFx0fVxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRExpc3Q7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvbm90Rm9ybS5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OID0gJ2dldFJhdycsXG5cdE9QVF9ERUZBVUxUX0FDVElPTiA9ICd1cGRhdGUnLFxuXHRPUFRfREVGQVVMVF9WSUVXID0gJ2VkaXQnO1xuXG5jbGFzcyBDUlVEVXBkYXRlIGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKSB7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgVXBkYXRlJyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuY29tbW9uJykgfHwgdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG5cdFx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMubG9hZEl0ZW0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlckZvcm0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bG9hZEl0ZW0oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKHtcblx0XHRcdCdfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJylcblx0XHR9KVsnJCcrKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5sb2FkQWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04pXSgpO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoJ2RlZmF1bHQnLCB0aGlzLmdldERhdGEoKSwge30pO1xuXHR9XG5cblx0cmVuZGVyRm9ybSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHRyeXtcblx0XHRcdFx0dGhpcy5mb3JtID0gbmV3IG5vdEZvcm0oe1xuXHRcdFx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGFjdGlvbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0FDVElPTixcblx0XHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRcdHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnByZWZpeCcpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdwcmVmaXgnKSxcblx0XHRcdFx0XHRcdHJvbGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5yb2xlJyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcblx0XHRcdFx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0XHRcdFx0aGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRcdGZpbGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgZmlsZXMgPSBwYXJhbXMuZS50YXJnZXQuZmlsZXMgfHwgcGFyYW1zLmUuZGF0YVRyYW5zZmVyLmZpbGVzO1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2ZpbGUgY2hhbmdlZCcsIGZpbGVzKTtcblx0XHRcdFx0XHRcdFx0XHRpZihwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lICYmIGZpbGVzKXtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucXVlZVVwbG9hZChwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRzdWJtaXQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdzdWJtaXQgZm9ybSAnLCBwYXJhbXMuaXRlbSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5leGVjVXBsb2FkcyhwYXJhbXMuaXRlbSlcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRsaWJzOiB0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKSxcblx0XHRcdFx0XHRcdFx0YWZ0ZXJTdWJtaXQ6IHRoaXMucGFyZW50LmJhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCksXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuaGVscGVycycpIHx8IHt9KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRcdFsnYWZ0ZXJSZXN0b3JlJywgJ2FmdGVyU3VibWl0J10sIHRoaXMucGFyZW50LmJhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudClcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fWNhdGNoKGUpe1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUoaXRlbSkge1xuXHRcdGl0ZW1bJyQnKyh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuYWN0aW9uJyl8fE9QVF9ERUZBVUxUX0FDVElPTildKClcblx0XHRcdC50aGVuKChyZXN1bHQpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygnZm9ybSBzYXZlZCcsIHJlc3VsdCk7XG5cdFx0XHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLmdldE1vZHVsZU5hbWUoKSk7XG5cdFx0XHRcdHRoaXMucGFyZW50LnJ1bkxpc3QoKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Zvcm0gbm90IHNhdmVkJywgcmVzdWx0KTtcblx0XHRcdH0pO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRFVwZGF0ZTtcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUFRfREVGQVVMVF9BQ1RJT04gPSAnZGVsZXRlJztcblxuY2xhc3MgQ1JVRERlbGV0ZSBleHRlbmRzIG5vdENvbnRyb2xsZXJ7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKXtcblx0XHRzdXBlcihwYXJlbnQuYXBwKTtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0bm90Q29tbW9uLmxvZygnQ1JVRCBEZWxldGUnKTtcblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGVsZXRlLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKCgpPT57XG5cdFx0XHRcdGlmIChjb25maXJtKCfQo9C00LDQu9C40YLRjCDQt9Cw0L/QuNGB0Yw/JykpIHtcblx0XHRcdFx0XHR0aGlzLmRlbGV0ZSgpO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHR0aGlzLnBhcmVudC5iYWNrVG9MaXN0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXG5cdGRlbGV0ZSgpIHtcblx0XHRsZXQgYWN0aW9uID0nJCcrKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRlbGV0ZS5hY3Rpb24nKXx8T1BUX0RFRkFVTFRfQUNUSU9OKTtcblx0XHR0aGlzLm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSh7J19pZCc6IHRoaXMuZ2V0T3B0aW9ucygncGFyYW1zLjAnKX0pW2FjdGlvbl0oKVxuXHRcdFx0LnRoZW4odGhpcy5wYXJlbnQuYmFja1RvTGlzdC5iaW5kKHRoaXMucGFyZW50KSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVUREZWxldGU7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9ERVRBSUxTX1BSRUZJWCA9ICdkZXRhaWxzXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfREVUQUlMU19USVRMRSA9ICdEZXRhaWxzIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge30sXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUID0gWydvcHRpb25zJywgJ21hbmlmZXN0JywgJ2FwcCddO1xuXG5jbGFzcyBub3REZXRhaWxzIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdwcmVmaXgnLCBPUFRfREVGQVVMVF9ERVRBSUxTX1BSRUZJWCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50cycsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLnNldERhdGEobmV3IG5vdFJlY29yZCh7fSwgdGhpcy5nZXREYXRhKCkpKTtcblx0XHR9XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YSgpIHtcblx0XHRsZXQgbWFuaWZlc3QgPSB0aGlzLmdldE1hbmlmZXN0KCk7XG5cdFx0aWYgKG1hbmlmZXN0ICYmIG1hbmlmZXN0LmFjdGlvbnMpIHtcblx0XHRcdHJldHVybiBtYW5pZmVzdC5hY3Rpb25zLmhhc093blByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJykpID8gbWFuaWZlc3QuYWN0aW9uc1t0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpXSA6IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpc3QoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKSxcblx0XHRcdGxpc3QgPSBbXSxcblx0XHRcdHJvbGUgPSB0aGlzLmdldE9wdGlvbnMoJ3JvbGUnLCBPUFRfREVGQVVMVF9ST0xFX05BTUUpO1xuXHRcdGlmIChhY3Rpb25EYXRhKSB7XG5cdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMpIHtcblx0XHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzLmhhc093blByb3BlcnR5KHJvbGUpKSB7XG5cdFx0XHRcdFx0bGlzdCA9IGFjdGlvbkRhdGEuZmllbGRzW3JvbGVdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHR9XG5cblx0Z2V0UGFydFRlbXBsYXRlTmFtZShmb3JtUGFydCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfREVUQUlMU19USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0RmllbGRzTGlzdCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0bGV0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0RmllbGRzTGlzdCgpW3RdO1xuXHRcdFx0XHR0aGlzLmFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xlYXJGaWVsZHNDb21wb25lbnRzKCkge1xuXHRcdGxldCBjb21wcyA9IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpO1xuXHRcdHdoaWxlIChjb21wcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb21wc1swXS5jb21wb25lbnQuZGVzdHJveSgpO1xuXHRcdFx0Y29tcHMuc3BsaWNlKDAsIDEpO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpYnMoKXtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0b3B0aW9uczoge30sXG5cdFx0XHRtYW5pZmVzdDoge30sXG5cdFx0XHRhcHA6IHt9LFxuXHRcdH07XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJykpIHtcblx0XHRcdHJlc3VsdC5vcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKG5vdENvbW1vbi5nZXRBcHAoKSAmJiBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJykpe1xuXHRcdFx0cmVzdWx0LmFwcCA9IG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkICYmIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkpe1xuXHRcdFx0cmVzdWx0Lm1hbmlmZXN0ID0gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKS5maWVsZHM7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSkge1xuXHRcdGxldCBkZWYgPSBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OLFxuXHRcdFx0ZmllbGRzTGlicyA9IHRoaXMuZ2V0RmllbGRzTGlicygpO1xuXHRcdGZvcihsZXQgdCBvZiBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCl7XG5cdFx0XHRpZiAoZmllbGRzTGlicy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBmaWVsZHNMaWJzW3RdLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpe1xuXHRcdFx0XHRyZXR1cm4gZmllbGRzTGlic1t0XVtmaWVsZE5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0YWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKSB7XG5cdFx0bGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpLFxuXHRcdFx0cmVjID0gbnVsbDtcblx0XHRpZihmaWVsZFR5cGUuY29tcG9uZW50KXtcblx0XHRcdHJlYyA9IHRoaXMuY2FzdEN1c3RvbShmaWVsZE5hbWUsIGZpZWxkVHlwZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZWMgPSB0aGlzLmNhc3RDb21tb24oZmllbGROYW1lLCBmaWVsZFR5cGUpO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5wdXNoKHJlYyk7XG5cdH1cblxuXHRjYXN0Q3VzdG9tKGZpZWxkTmFtZSwgZmllbGRUeXBlKXtcblx0XHRsZXQgQ3VzdG9tQ29tcG9uZW50ID0gbm90RnJhbWV3b3JrLm5vdENvbW1vbi5nZXQoJ2NvbXBvbmVudHMnKVtmaWVsZFR5cGUuY29tcG9uZW50XTtcblx0XHRsZXQgcmVjID0ge1xuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0bmFtZTogZmllbGROYW1lLFxuXHRcdFx0XHR0aXRsZTogZmllbGRUeXBlLmxhYmVsIHx8IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0dHlwZTogZmllbGRUeXBlLnR5cGUsXG5cdFx0XHRcdGxhYmVsOiBmaWVsZFR5cGUubGFiZWwsXG5cdFx0XHRcdGFycmF5OiBmaWVsZFR5cGUuYXJyYXksXG5cdFx0XHRcdGRlZmF1bHQ6IGZpZWxkVHlwZS5kZWZhdWx0LFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMobm90UGF0aC5qb2luKCdoZWxwZXJzJywnbGlicycsZmllbGROYW1lKSlcblx0XHRcdH1cblx0XHR9O1xuXHRcdGxldCBoZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRpc0NoZWNrZWQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0cmV0dXJuIHBhcmFtcy5pdGVtLnZhbHVlID09PSB0aGlzLmdldERhdGEoZmllbGROYW1lKTtcblx0XHRcdH0sXG5cdFx0XHRmaWVsZDogcmVjLmZpZWxkLFxuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKClcblx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cblx0XHRyZWMuY29tcG9uZW50ID0gbmV3IEN1c3RvbUNvbXBvbmVudCh7XG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiByZWM7XG5cdH1cblxuXHRjYXN0Q29tbW9uKGZpZWxkTmFtZSwgZmllbGRUeXBlKXtcblx0XHRsZXQgcmVjID0ge1xuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0bmFtZTogZmllbGROYW1lLFxuXHRcdFx0XHR0aXRsZTogZmllbGRUeXBlLmxhYmVsIHx8IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0dHlwZTogZmllbGRUeXBlLnR5cGUsXG5cdFx0XHRcdGxhYmVsOiBmaWVsZFR5cGUubGFiZWwsXG5cdFx0XHRcdGFycmF5OiBmaWVsZFR5cGUuYXJyYXksXG5cdFx0XHRcdGRlZmF1bHQ6IGZpZWxkVHlwZS5kZWZhdWx0LFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMobm90UGF0aC5qb2luKCdoZWxwZXJzJywnbGlicycsZmllbGROYW1lKSlcblx0XHRcdH1cblx0XHR9O1xuXHRcdGxldCBoZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRpc0NoZWNrZWQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0cmV0dXJuIHBhcmFtcy5pdGVtLnZhbHVlID09PSB0aGlzLmdldERhdGEoZmllbGROYW1lKTtcblx0XHRcdH0sXG5cdFx0XHRmaWVsZDogcmVjLmZpZWxkLFxuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKClcblx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoZmllbGRUeXBlLnR5cGUpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRUYXJnZXRFbGVtZW50KGZpZWxkVHlwZS50YXJnZXQpLFxuXHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUxhc3QnXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlYztcblx0fVxuXG5cdGdldFRhcmdldEVsZW1lbnQodGFyZ2V0ID0gJ2JvZHknKXtcblx0XHRpZiAoIXRhcmdldCl7dGFyZ2V0ID0gJ2JvZHknO31cblx0XHRsZXQgcmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHRpZiAoIXJlcyAmJiB0YXJnZXQhPT0nYm9keScpe1xuXHRcdFx0dGFyZ2V0ID0gJ2JvZHknO1xuXHRcdFx0cmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHR9XG5cdFx0aWYoIXJlcyAmJiB0YXJnZXQ9PSdib2R5Jyl7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdHVwZGF0ZUZpZWxkKGZpZWxkTmFtZSl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5maWVsZC5uYW1lID09PSBmaWVsZE5hbWUpe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3REZXRhaWxzO1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90RGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL25vdERldGFpbHMuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTiA9ICdnZXQnLFxuXHRPUFRfREVGQVVMVF9WSUVXID0gJ2RldGFpbHMnO1xuXG5jbGFzcyBDUlVERGV0YWlscyBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIERldGFpbHMnKTtcblx0XHR0aGlzLnNldFZpZXdzKHtcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmNvbW1vbicpIHx8IHRydWUsXG5cdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmNvbnRhaW5lclNlbGVjdG9yJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSxcblx0XHRcdFx0aGVscGVyczoge31cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMubG9hZEl0ZW0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlckRldGFpbHMuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bG9hZEl0ZW0oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKHtcblx0XHRcdCdfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJylcblx0XHR9KVsnJCcgKyAodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTildKCk7XG5cdH1cblxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0bGV0IGl0ZW0gPSB0aGlzLmdldERhdGEoKTtcblx0XHR2YXIgaGVscGVycyA9IHtcblx0XHRcdElEOiBpdGVtID8gaXRlbVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkgKyAnSUQnXSA6ICcnLFxuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0YXJyYXk6IGZhbHNlXG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKFt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCksIHBhcmFtcy5pdGVtLl9pZCwgJ3VwZGF0ZSddLmpvaW4oJy8nKSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKFt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCksIHBhcmFtcy5pdGVtLl9pZCwgJ2RlbGV0ZSddLmpvaW4oJy8nKSk7XG5cdFx0XHR9LFxuXHRcdFx0bGlua0JhY2tUb0xpc3Q6IHRoaXMucGFyZW50LmxpbmtCYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpLFxuXHRcdFx0dGl0bGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ25hbWVzLnNpbmdsZScpXG5cdFx0fTtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoJ2RlZmF1bHQnLCBpdGVtLCBoZWxwZXJzKTtcblx0fVxuXG5cdHJlbmRlckRldGFpbHMoKSB7XG5cdFx0bGV0IGl0ZW0gPSB0aGlzLmdldERhdGEoKTtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0bmV3IG5vdERldGFpbHMoe1xuXHRcdFx0XHRcdGRhdGE6IGl0ZW0sXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMudGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG5cdFx0XHRcdFx0XHRhY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04sXG5cdFx0XHRcdFx0XHRwcmVmaXg6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMucHJlZml4Jyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuXHRcdFx0XHRcdFx0cm9sZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5yb2xlJyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0XHRcdFx0XHRsaW5rQmFja1RvTGlzdDogdGhpcy5wYXJlbnQubGlua0JhY2tUb0xpc3QoKSxcblx0XHRcdFx0XHRcdFx0bGliczogdGhpcy5nZXRPcHRpb25zKCdsaWInKSxcblx0XHRcdFx0XHRcdFx0SUQ6IGl0ZW1bdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICsgJ0lEJ10sXG5cdFx0XHRcdFx0XHRcdF9fdmVyc2lvbjogaXRlbS5fX3ZlcnNpb24sXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmhlbHBlcnMnKSB8fCB7fSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHJlc29sdmVdXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmVqZWN0KGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRERldGFpbHM7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBDUlVEQ3JlYXRlIGZyb20gJy4vQ3JlYXRlJztcbmltcG9ydCBDUlVETGlzdCBmcm9tICcuL0xpc3QnO1xuaW1wb3J0IENSVURVcGRhdGUgZnJvbSAnLi9VcGRhdGUnO1xuaW1wb3J0IENSVUREZWxldGUgZnJvbSAnLi9EZWxldGUnO1xuaW1wb3J0IENSVUREZXRhaWxzIGZyb20gJy4vRGV0YWlscyc7XG5cblxuY2xhc3MgQ1JVRENvbnRyb2xsZXIgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoYXBwLCBwYXJhbXMpIHtcblx0XHRub3RDb21tb24ubG9nKCdydW5uaW5nIENSVURDb250cm9sbGVyJyk7XG5cdFx0c3VwZXIoYXBwKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ25hbWVzJywge1xuXHRcdFx0cGx1cmFsOiAncGx1cmFsJyxcblx0XHRcdHNpbmdsZTogJ3NpbmdsZScsXG5cdFx0fSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InLCB0aGlzLmFwcC5nZXRPcHRpb25zKCdjcnVkLmNvbnRhaW5lclNlbGVjdG9yJykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cm91dGUocGFyYW1zID0gW10pe1xuXHRcdGlmKHBhcmFtcy5sZW5ndGg9PTEpe1xuXHRcdFx0aWYocGFyYW1zWzBdID09PSAnY3JlYXRlJyl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1bkNyZWF0ZShwYXJhbXMpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1bkRldGFpbHMocGFyYW1zKTtcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihwYXJhbXMubGVuZ3RoID09IDIpe1xuXHRcdFx0aWYgKHBhcmFtc1sxXSA9PT0gJ2RlbGV0ZScpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5EZWxldGUocGFyYW1zKTtcblx0XHRcdH1lbHNlIGlmKHBhcmFtc1sxXSA9PT0gJ3VwZGF0ZScpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5VcGRhdGUocGFyYW1zKTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0bGV0IHJvdXRlUnVubmVyTmFtZSA9ICdydW4nICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihwYXJhbXNbMF0pO1xuXHRcdFx0XHRpZih0aGlzW3JvdXRlUnVubmVyTmFtZV0gJiYgdHlwZW9mIHRoaXNbcm91dGVSdW5uZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJyl7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXNbcm91dGVSdW5uZXJOYW1lXShwYXJhbXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnJ1bkxpc3QocGFyYW1zKTtcblx0fVxuXG5cdHJ1bkNyZWF0ZShwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVURDcmVhdGUodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bkxpc3QocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVETGlzdCh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuRGV0YWlscyhwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVUREZXRhaWxzKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5EZWxldGUocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVERGVsZXRlKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5VcGRhdGUocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVEVXBkYXRlKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvbkFmdGVyUmVuZGVyKCl7XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0YmFja1RvTGlzdCgpIHtcblx0XHR0aGlzLmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLmdldE1vZHVsZU5hbWUoKSk7XG5cdH1cblxuXHRsaW5rQmFja1RvTGlzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2R1bGVOYW1lKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoLmpzJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi4vbm90Um91dGVyJztcblxudmFyIG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiA9IHtcblx0Y29udGVudDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmluZGV4T2YoJ2NhcGl0YWxpemUnKSA+IC0xKSB7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQudG9VcHBlckNhc2UoKTtcblx0XHR9XG5cdFx0c2NvcGUuZWxlbWVudC50ZXh0Q29udGVudCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdDtcblx0fSxcblx0YmluZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5iaW5kcyl7XG5cdFx0XHRpZihzY29wZS5lbGVtZW50LmJpbmRzLmhhc093blByb3BlcnR5KHNjb3BlLnBhcmFtc1swXSkpe1xuXHRcdFx0XHRpZihzY29wZS5lbGVtZW50LmJpbmRzW3Njb3BlLnBhcmFtc1swXV0uaW5kZXhPZihzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uKSA+IC0xKXtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpID0+IHtcblx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoPT09MSB8fCBzY29wZS5wYXJhbXNbMV0gIT09ICdkZWZhdWx0Jykge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe1xuXHRcdFx0XHRcdHNjb3BlLFxuXHRcdFx0XHRcdGl0ZW0sXG5cdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSwgZmFsc2UpO1xuXHRcdGlmKCFzY29wZS5lbGVtZW50Lmhhc093blByb3BlcnR5KCdiaW5kcycpKXtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYmluZHMgPSB7fTtcblx0XHR9XG5cdFx0aWYoIXNjb3BlLmVsZW1lbnQuYmluZHMuaGFzT3duUHJvcGVydHkoc2NvcGUucGFyYW1zWzBdKSl7XG5cdFx0XHRzY29wZS5lbGVtZW50LmJpbmRzW3Njb3BlLnBhcmFtc1swXV0gPSBbXTtcblx0XHR9XG5cdFx0aWYoc2NvcGUuZWxlbWVudC5iaW5kc1tzY29wZS5wYXJhbXNbMF1dLmluZGV4T2Yoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbikgPT09IC0xKXtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYmluZHNbc2NvcGUucGFyYW1zWzBdXS5wdXNoKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24pO1xuXHRcdH1cblx0fSxcblx0dmFsdWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGxpdmVFdmVudHMgPSBbJ2NoYW5nZScsICdrZXl1cCddLFxuXHRcdFx0b25FdmVudCA9ICgpID0+IHtcblx0XHRcdFx0aWYgKFsnY2hlY2tib3gnLCAncmFkaW8nLCAnc2VsZWN0LW11bHRpcGxlJ10uaW5kZXhPZihzY29wZS5lbGVtZW50LnR5cGUpID4gLTEpIHtcblx0XHRcdFx0XHRzd2l0Y2ggKHNjb3BlLmVsZW1lbnQudHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgJ2NoZWNrYm94Jzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3JhZGlvJzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkP3Njb3BlLmVsZW1lbnQudmFsdWU6bnVsbCk7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KGhlbHBlcnMuZmllbGQubmFtZSwgaGVscGVycy5kYXRhLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQgPyBzY29wZS5lbGVtZW50LnZhbHVlIDogbnVsbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdzZWxlY3QtbXVsdGlwbGUnOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRsZXQgc2VsZWN0ZWQgPSBbXS5zbGljZS5jYWxsKHNjb3BlLmVsZW1lbnQuc2VsZWN0ZWRPcHRpb25zKS5tYXAoYSA9PiBhLnZhbHVlKTtcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnc2VsZWN0LW11bHRpcGxlJywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSwgJyAtPiAnLHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSAhPT0gdHJ1ZSkge1xuXHRcdFx0aWYoc2NvcGUuZWxlbWVudC50eXBlID09PSAndGV4dGFyZWEnKXtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1cblx0XHRcdGZvciAobGV0IHQgb2YgbGl2ZUV2ZW50cykge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodCwgb25FdmVudCk7XG5cdFx0XHR9XG5cdFx0XHRzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cdGF0dHI6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpIHx8IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlcyA9PT0gJ2Z1bmN0aW9uJykgPyByZXMoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzKTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZShzY29wZS5wYXJhbXNbMF0sIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdH0sXG5cdG5hbWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oIC8qc2NvcGUsIGl0ZW0sIGhlbHBlcnMqLyApIHtcblxuXHR9LFxuXHRjaGVja2VkOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXN1bHQgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXN1bHQgPT09ICdmdW5jdGlvbicpID8gcmVzdWx0KHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlc3VsdCk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID8gc2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKSA6IHNjb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG5cdH0sXG5cdGNsYXNzOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpID8gcmVzKHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlcyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPCAzIHx8IGlzTmFOKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpIHtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IHVzZWQgPSBmYWxzZTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcGUucGFyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChpID09PSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0XHR1c2VkID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCF1c2VkKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0b3B0aW9uczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgaSA9IDAsXG5cdFx0XHRvcHRpb24gPSBudWxsLFxuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSAndmFsdWUnLFxuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSAnbmFtZScsXG5cdFx0XHRpdGVtVmFsdWVGaWVsZE5hbWUgPSBoZWxwZXJzLmhhc093blByb3BlcnR5KCdmaWVsZCcpICYmIGhlbHBlcnMuZmllbGQuaGFzT3duUHJvcGVydHkoJ25hbWUnKSA/IGhlbHBlcnMuZmllbGQubmFtZSA6ICd2YWx1ZSc7XG5cdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHR9XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDMpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0XHRpdGVtVmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMl07XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgaGVscGVycyAhPT0gbnVsbCAmJiBoZWxwZXJzLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgJiYgaGVscGVycy5kZWZhdWx0KSB7XG5cdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJycpO1xuXHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gaGVscGVycy5wbGFjZWhvbGRlcjtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtICE9PSBudWxsKSB7XG5cdFx0XHR2YXIgbGliID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGliLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pO1xuXHRcdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBsaWJbaV1bbGFiZWxGaWVsZE5hbWVdO1xuXHRcdFx0XHRpZiAoaGVscGVycy5maWVsZC5hcnJheSkge1xuXHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0gJiYgQXJyYXkuaXNBcnJheShpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0pKXtcblx0XHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0uaW5kZXhPZihsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0gPT09IGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pIHtcblx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGhyZWY6ZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGlmICghc2NvcGUuZWxlbWVudC5ub3RSb3V0ZXJJbml0aWFsaXplZCl7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgbm90Um91dGVyLmdldEZ1bGxSb3V0ZShzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKTtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9Pntcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRub3RSb3V0ZXIubmF2aWdhdGUobm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdHNjb3BlLmVsZW1lbnQubm90Um91dGVySW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG59O1xuZXhwb3J0IGRlZmF1bHQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliO1xuIiwiLypcblx0Q29tbW9uIGZ1bmN0aW9uc1xuKi9cbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuLypcblx0ZnJhbWV3b3JrIHdpZGUgcGFyc2VyIGZvciBkYXRhIGFjY2Vzc1xuKi9cbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4vbm90Um91dGVyJztcblxuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG4vKlxuXHRiYXNpYyBldmVudCBoYW5kbGVycyBhbmQgY29yZSBkYXRhIG1vZGlmaWVyc1xuKi9cbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG4vKlxuXHRzbWFydGVyIGltYWdlIGNvbnRyb2xcbiovXG5pbXBvcnQgbm90SW1hZ2UgZnJvbSAnLi90ZW1wbGF0ZS9ub3RJbWFnZSc7XG4vKlxuXHRhcHBsaWNhdGlvbiBtYWluIGluZnJhc3RydWN0dXJlIHNldHRlclxuKi9cbmltcG9ydCBub3RBcHAgZnJvbSAnLi9ub3RBcHAnO1xuLypcblx0dXNlciBjb250cm9sbGVyc1xuKi9cbmltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4vbm90Q29udHJvbGxlcic7XG5cbmltcG9ydCB7Q1JVRENvbnRyb2xsZXIsQ1JVRENyZWF0ZSxDUlVERGVsZXRlLENSVUREZXRhaWxzLENSVURMaXN0LENSVURVcGRhdGV9IGZyb20gJy4vQ1JVRCc7XG5cbi8qXG5cdHRlbXBsYXRpbmcgYW5kIGNvbW1vbiBzdHJ1Y3R1cmVzXG4qL1xuXG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RSZW5kZXJlcic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnOyAvLyBzbWFydGVyIHdpdGggYmluZGluZ3MgZm9yIGV2ZW50cywgYWN0dWFseSBwcm94eVxuXG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbm90Rm9ybSc7XG5pbXBvcnQgbm90VGFibGUgZnJvbSAnLi9jb21wb25lbnRzL25vdFRhYmxlJztcbmltcG9ydCBub3REZXRhaWxzIGZyb20gJy4vY29tcG9uZW50cy9ub3REZXRhaWxzJztcblxuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7IC8vXHRob3cgdG8gaW50ZXJhY3Qgd2l0aCBkYXRhIG9uIHNlcnZlclxuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7IC8vXHR3cmFwcGVyIGZvciBkYXRhIHdpdGggc2VydmVyPC0+dmlldyBsaXZlIGludGVyYWN0aW9uc1xuXG5ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuYWRkKG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYik7XG5cbmV4cG9ydCB7XG5cdG5vdENvbW1vbixcblx0bm90UGF0aCxcblx0bm90QmFzZSxcblx0bm90SW1hZ2UsXG5cdG5vdEFwcCxcblx0bm90QVBJLFxuXHRub3RDb250cm9sbGVyLFxuXHRDUlVEQ29udHJvbGxlcixcblx0Q1JVRENyZWF0ZSxcblx0Q1JVRERlbGV0ZSxcblx0Q1JVRERldGFpbHMsXG5cdENSVURMaXN0LFxuXHRDUlVEVXBkYXRlLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnMsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYixcblx0bm90VGVtcGxhdGVDYWNoZSxcblx0bm90UmVuZGVyZXIsXG5cdG5vdENvbXBvbmVudCxcblx0bm90Rm9ybSxcblx0bm90Um91dGVyLFxuXHRub3RUYWJsZSxcblx0bm90RGV0YWlscyxcblx0bm90UmVjb3JkLFxuXHRub3RSZWNvcmRJbnRlcmZhY2Vcbn07XG4iXSwibmFtZXMiOlsiQ29tbW9uTmV0d29yayIsInVyaSIsImdldCIsImRhdGFBcnJheSIsImZpZWxkcyIsImkiLCJmIiwiaGFzT3duUHJvcGVydHkiLCJpbWFnZSIsIkltYWdlIiwic2V0QXR0cmlidXRlIiwic3JjIiwiaW5kZXhPZiIsImFkZFByb3RvY29sIiwidXBsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9uUHJvZ3Jlc3MiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzcG9uc2VUeXBlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwid2l0aENyZWRlbnRpYWxzIiwib3BlbiIsInVybCIsInNldFJlcXVlc3RIZWFkZXIiLCJnZXRTZXNzaW9uSUQiLCJmaWxlIiwidHlwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIm5hbWUiLCJzZW5kIiwibWV0aG9kIiwiZGF0YSIsIm9ubG9hZCIsInQiLCJvbmVycm9yIiwib250aW1lb3V0IiwicGFyc2VJbnQiLCJyZXNwb25zZVRleHQiLCJlIiwiZ2V0Q29va2llIiwidmFsdWUiLCJkb2N1bWVudCIsImNvb2tpZSIsInBhcnRzIiwic3BsaXQiLCJsZW5ndGgiLCJwb3AiLCJzaGlmdCIsIkxPRyIsIkNvbW1vbkxvZ3MiLCJub3RGcmFtZXdvcmsiLCJub3RDb21tb24iLCJlcnJvciIsImFyZ3VtZW50cyIsImxvZyIsInRyYWNlIiwicmVnaXN0ZXIiLCJNQU5BR0VSIiwiU3ltYm9sIiwiQ29tbW9uU2hvcnRzIiwiZ2V0TWFuYWdlciIsImdldEFQSSIsInYiLCJDb21tb25PYmplY3RzIiwiZGVmYXVsdHMiLCJvcHRpb25zIiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiY2FsbCIsInRhcmdldCIsInNvdXJjZXMiLCJmb3JFYWNoIiwiZGVzY3JpcHRvcnMiLCJrZXlzIiwic291cmNlIiwicmVkdWNlIiwia2V5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZGVzY3JpcHRvciIsInN5bSIsImVudW1lcmFibGUiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiYmlnIiwic21hbGwiLCJvYmoiLCJmaWx0ZXIiLCJjb250YWluc09iaiIsImljb25zIiwiYmF0Y2giLCJnZXREYXRhIiwicHVzaCIsImEiLCJiIiwicCIsImVxdWFsIiwidG9TdHJpbmciLCJkZWZhdWx0VmFsdWUiLCJvYmoxIiwib2JqMiIsImpRdWVyeSIsImV4dGVuZCIsInZhbCIsInJlZ2lzdHJ5IiwiYXJyYXkiLCJvbGRfaW5kZXgiLCJuZXdfaW5kZXgiLCJrIiwidW5kZWZpbmVkIiwic3BsaWNlIiwiQ29tbW9uU3RyaW5ncyIsInN0cmluZyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsIkNvbW1vbkZ1bmN0aW9ucyIsImZ1bmNzIiwicmVzdWx0IiwiZnVuYyIsIkNvbW1vbkRPTSIsImVsIiwic3RhcnRzV2l0aCIsImFsbEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImxpc3QiLCJqIiwiYXR0cyIsImF0dHJpYnV0ZXMiLCJuIiwibm9kZU5hbWUiLCJDb21tb25BcHAiLCJzdGFydGVyIiwiYXNzaWduIiwiZXh0ZW5kV2l0aCIsIlNVQl9QQVRIX1NUQVJUIiwiU1VCX1BBVEhfRU5EIiwiUEFUSF9TUExJVCIsIlBBVEhfU1RBUlRfT0JKRUNUIiwiUEFUSF9TVEFSVF9IRUxQRVJTIiwiRlVOQ1RJT05fTUFSS0VSIiwiTUFYX0RFRVAiLCJub3RQYXRoIiwicGF0aCIsInN1YlBhdGgiLCJmaW5kIiwic3ViIiwicGFyc2VkIiwic3ViZiIsInJlcGxhY2UiLCJpdGVtIiwiaGVscGVycyIsInN1YlBhdGhQYXJzZWQiLCJmaW5kTmV4dFN1YlBhdGgiLCJnZXRWYWx1ZUJ5UGF0aCIsInJlcGxhY2VTdWJQYXRoIiwicGFyc2VTdWJzIiwiYXR0clZhbHVlIiwic2V0VmFsdWVCeVBhdGgiLCJpc1JlY29yZCIsIm5vcm1pbGl6ZVBhdGgiLCJ0cmlnZ2VyIiwic2V0Iiwic3RlcCIsImhlbHBlciIsInJTdGVwIiwiQXJyYXkiLCJpc0FycmF5IiwicGFyc2VQYXRoU3RlcCIsIm9iamVjdCIsImF0dHJQYXRoIiwiYXR0ck5hbWUiLCJpc0Z1bmN0aW9uIiwibmV3T2JqIiwiYXJncyIsImpvaW4iLCJNRVRBX01FVEhPRF9JTklUIiwiTUVUQV9FVkVOVFMiLCJNRVRBX0RBVEEiLCJNRVRBX1dPUktJTkciLCJNRVRBX09QVElPTlMiLCJub3RCYXNlIiwiaW5wdXQiLCJldmVudHMiLCJvbiIsInNldERhdGEiLCJzZXRXb3JraW5nIiwid29ya2luZyIsInNldE9wdGlvbnMiLCJ3aGF0IiwicmVzIiwic2V0Q29tbW9uIiwiZ2V0Q29tbW9uIiwiZ2V0T3B0aW9ucyIsImdldFdvcmtpbmciLCJldmVudE5hbWVzIiwiZXZlbnRDYWxsYmFja3MiLCJvbmNlIiwiZGVmaW5lSWZOb3RFeGlzdHMiLCJmcm9tIiwiZXZlbnROYW1lIiwiZyIsImV2ZW50Iiwib2ZmIiwiY2FsbGJhY2tzIiwiaCIsInRhcmdldElkIiwiT1BUX01PREVfSElTVE9SWSIsIk9QVF9NT0RFX0hBU0giLCJPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCIsIm5vdFJvdXRlciIsInJvb3QiLCJjbGVhclNsYXNoZXMiLCJyZSIsImhhbmRsZXIiLCJydWxlIiwiYWRkIiwicGFyYW0iLCJyIiwiZnJhZ21lbnQiLCJsb2NhdGlvbiIsImRlY29kZVVSSSIsInBhdGhuYW1lIiwic2VhcmNoIiwid2luZG93IiwibWF0Y2giLCJocmVmIiwiY3VycmVudCIsImdldEZyYWdtZW50IiwiaW5pdCIsImlzSW5pdGlhbGl6ZWQiLCJjaGVjayIsInNldEluaXRpYWxpemVkIiwibG9vcEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjaGVja0xvY2F0aW9uIiwiYmluZCIsImhyZWZDbGljayIsImZ1bGxSRSIsImFwcGx5IiwiaG9zdCIsInB1c2hTdGF0ZSIsImdldEZ1bGxSb3V0ZSIsImJvZHkiLCJnZXRBbGxMaW5rcyIsImluaXRSZXJvdXRpbmciLCJnZXRBdHRyaWJ1dGUiLCJsaW5rIiwibm90Um91dGVySW5pdGlhbGl6ZWQiLCJmdWxsTGluayIsInByZXZlbnREZWZhdWx0IiwibmF2aWdhdGUiLCJub3RBUElPcHRpb25zIiwibm90QVBJUXVlZSIsInJlcXVlc3RzUGVyU2Vjb25kIiwicXVlZSIsImludCIsImluUHJvZ3Jlc3MiLCJ0b0NhbGwiLCJjbGVhckludGVydmFsIiwicnVuIiwibm90QVBJIiwiaWQiLCJnb29kIiwiYmFkIiwibWFrZVJlcXVlc3QiLCJyZXNwb25zZU9LIiwicmVzcG9uc2VGYWlsZWQiLCJyZXF1ZXN0SlNPTiIsInRoZW4iLCJuZXh0IiwiY2F0Y2giLCJnZXRJZCIsIm1vZGVsTmFtZSIsImdldE1vZGVsTmFtZSIsIm1ha2VVcmwiLCJnZXRKU09OIiwibm90SW1hZ2UiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgiLCJURU1QTEFURV9UQUciLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCIsIkNPTVBPTkVOVF9JRF9QUkVGSVgiLCJQQVJUX0lEX1BSRUZJWCIsIkRFRkFVTFRfUExBQ0VSIiwiREVGQVVMVF9QTEFDRVJfTE9PUCIsIk9QVFMiLCJNRVRBX0NBQ0hFIiwibm90VGVtcGxhdGVDYWNoZSIsImhpZGVUZW1wbGF0ZXMiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibWFwIiwibG9hZE9uZSIsImNhbGxiYWNrIiwib1JlcXVlc3QiLCJkaXYiLCJkYXRhc2V0Iiwibm90VGVtcGxhdGVOYW1lIiwibm90VGVtcGxhdGVVUkwiLCJzcmNFbGVtZW50Iiwic2V0T25lIiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwiYWRkRnJvbVRleHQiLCJjbG9uZU5vZGUiLCJjb250IiwidGV4dCIsIm5vdFRlbXBsYXRlc0VsZW1lbnRzIiwiZWxJZCIsInBhcmVudE5vZGUiLCJsaWIiLCJnZXRIVE1MIiwidGVtcGxhdGVJbm5lckhUTUwiLCJ0ZW1wbGF0ZUNvbnRFbCIsIndyYXAiLCJ0ZW1wbGF0ZXNIVE1MIiwidGVtcGxhdGVzIiwicGFyc2VMaWIiLCJhZGRMaWIiLCJzZWxlY3Rvck9yRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0YWdOYW1lIiwiT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSIsIkRFRkFVTFRfRklMVEVSIiwiREVGQVVMVF9QQUdFX05VTUJFUiIsIkRFRkFVTFRfUEFHRV9TSVpFIiwibm90SW50ZXJmYWNlIiwibWFuaWZlc3QiLCJsaW5lIiwicmVjb3JkIiwiYWN0aW9uTmFtZSIsInJlY29yZFJFIiwiZmllbGROYW1lIiwiaW5kIiwibGVuIiwiaW5kMiIsInN0YXJ0U2xpY2UiLCJlbmRTbGljZSIsImdldEF0dHIiLCJtb2RlbCIsImFjdGlvbkRhdGEiLCJwYXJzZUxpbmUiLCJwb3N0Rml4IiwicmVzdWx0SWQiLCJwcmVmaXhlcyIsImluZGV4IiwiY29uY2F0IiwicHJlIiwiZ2V0QWN0aW9ucyIsImFjdGlvbnMiLCJzZXRGaWx0ZXIiLCJmaWx0ZXJEYXRhIiwic29ydGVyRGF0YSIsInBhZ2VOdW1iZXIiLCJwYWdlU2l6ZSIsInNldFBhZ2VyIiwicmVxdWVzdERhdGEiLCJkYXRhUHJvdmlkZXJOYW1lIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwiZ2V0QWN0aW9uRGF0YSIsInJlcXVlc3RQYXJhbXMiLCJjb2xsZWN0UmVxdWVzdERhdGEiLCJyZXF1ZXN0UGFyYW1zRW5jb2RlZCIsImVuY29kZVJlcXVlc3QiLCJnZXRJRCIsImdldFVSTCIsInF1ZWVSZXF1ZXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsImFmdGVyU3VjY2Vzc1JlcXVlc3QiLCJub3RSZWNvcmQiLCJNRVRBX0lOVEVSRkFDRSIsIk1FVEFfUFJPWFkiLCJNRVRBX0NIQU5HRSIsIk1FVEFfQ0hBTkdFX05FU1RFRCIsIk1FVEFfU0FMIiwiTUVUQV9NQVBfVE9fSU5URVJGQUNFIiwiREVGQVVMVF9BQ1RJT05fUFJFRklYIiwiTUVUQV9SRVRVUk5fVE9fUk9PVCIsImNyZWF0ZVByb3BlcnR5SGFuZGxlcnMiLCJvd25lciIsImNvbnRleHQiLCJyZXNUYXJnZXQiLCJSZWZsZWN0IiwiRXJyb3IiLCJ2YWx1ZVRvUmVmbGVjdCIsIm5vdFByb3BlcnR5IiwiZ2V0Um9vdCIsInBhdGhUbyIsImlzUHJveHkiLCJpc1Byb3BlcnR5IiwiUHJveHkiLCJwcm94eSIsImNyZWF0ZVJlY29yZEhhbmRsZXJzIiwiY3JlYXRlQ29sbGVjdGlvbiIsIm5vdFJlY29yZEludGVyZmFjZSIsImluaXRQcm9wZXJ0aWVzIiwiaW50ZXJmYWNlVXAiLCJjdXJQYXRoIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsIml0ZW1zIiwiY29sbGVjdGlvbiIsImdldEFjdGlvbnNDb3VudCIsImFjdGlvblVwIiwicmVxdWVzdCIsIm9iamVjdFBhcnQiLCJzZXRBdHRyIiwic2V0RmluZEJ5IiwicmVzZXRGaWx0ZXIiLCJnZXRGaWx0ZXIiLCJzZXRTb3J0ZXIiLCJnZXRTb3J0ZXIiLCJzZXRQYWdlTnVtYmVyIiwic2V0UGFnZVNpemUiLCJyZXNldFBhZ2VyIiwiZ2V0UGFnZXIiLCJPUFRfQ09OVFJPTExFUl9QUkVGSVgiLCJPUFRfUkVDT1JEX1BSRUZJWCIsIm5vdEFwcCIsInJlc291cmNlcyIsInByZUluaXRSb3V0ZXIiLCJpbml0TWFuYWdlciIsImluaXRBUEkiLCJpbml0VGVtcGxhdGVzIiwic2V0TWFuYWdlciIsImFwaSIsInNldEFQSSIsInByb20iLCJhZGRMaWJGcm9tVVJMIiwiaW5pdE1hbmlmZXN0IiwicmVwb3J0Iiwic2V0SW50ZXJmYWNlTWFuaWZlc3QiLCJzZXRSb290IiwicmVSb3V0ZUV4aXN0ZWQiLCJyb3V0aWVJbnB1dCIsInJvdXRlQmxvY2siLCJwYXRocyIsImNvbnRyb2xsZXIiLCJiaW5kQ29udHJvbGxlciIsImFkZExpc3QiLCJsaXN0ZW4iLCJ1cGRhdGUiLCJ1cGRhdGVJbnRlcmZhY2VzIiwiaW5pdENvbnRyb2xsZXIiLCJhbGxSZXNvdXJjZXNSZWFkeSIsInN0YXJ0QXBwIiwiaW5pdFJvdXRlciIsImNvbnRyb2xsZXJOYW1lIiwiYXBwIiwiY3RybCIsImNsZWFySW50ZXJmYWNlcyIsIm1hbmlmZXN0cyIsInJlY29yZE1hbmlmZXN0IiwicmVjb3JkRGF0YSIsIm9uUmVzb3VyY2VSZWFkeSIsIk1FVEFfUFJPQ0VTU09SUyIsIm5vdFRlbXBsYXRlUHJvY2Vzc29ycyIsInNldFByb2Nlc3NvciIsImdldFByb2Nlc3NvciIsIk1FVEFfQ09NUE9ORU5UUyIsIm5vdFJlbmRlcmVyIiwicmVuZGVyIiwiY29tcG9uZW50IiwiaW5pdERhdGEiLCJpbml0T3B0aW9ucyIsImluaXRXb3JraW5nIiwidGVtcGxhdGUiLCJpbml0VGVtcGxhdGUiLCJvbkNoYW5nZSIsIk1hdGgiLCJyYW5kb20iLCJnZXRCcmVhZENydW1wcyIsImNsZWFyU3Rhc2giLCJzZXRXb3JraW5nTWFwcGluZyIsImV4ZWNQcm9jZXNzb3JzIiwic2VhcmNoRm9yU3ViVGVtcGxhdGVzIiwic3Rhc2hSZW5kZXJlZCIsImlmUGFydCIsImNvbXBvbmVudFBhdGgiLCJjaGFuZ2VkUGF0aCIsImlmRnVsbFN1YlBhdGgiLCJjcmVhdGVNYXBwaW5nIiwiZmluZEFsbFByb2Nlc3NvcnMiLCJwcm9jcyIsImVscyIsImdldEF0dHJpYnV0ZXNTdGFydHNXaXRoIiwiZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCIsInByb2NEYXRhIiwicGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uIiwicHJvY2Vzc29yRXhwcmVzc2lvbiIsImF0dHJpYnV0ZUV4cHJlc3Npb24iLCJpZkNvbmRpdGlvbiIsInBhcmFtcyIsInByb2Nlc3Nvck5hbWUiLCJtYXBwaW5nIiwicHJvY1Njb3BlIiwiYXR0cmlidXRlUmVzdWx0IiwiZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdCIsInByb2NOYW1lIiwicHJvYyIsInJlbW92ZUF0dHJpYnV0ZSIsImRlc3Ryb3lTdWJzIiwiZGVzdHJveSIsImNsZWFyU3ViVGVtcGxhdGVzIiwiZ2V0U3Rhc2giLCJyZW1vdmVDaGlsZCIsIm50RWwiLCJudFJlbmRlcmVkIiwic3VicyIsIm50IiwiaWZTdWJFbGVtZW50UmVuZGVyZWQiLCJyZW5kZXJTdWIiLCJkZXRhaWxzIiwiZGF0YVBhdGgiLCJub3RDb21wb25lbnQiLCJjaGlsZE5vZGVzIiwiYWRkVG9TdGFzaCIsInN0YXNoIiwibmV3U3Rhc2giLCJhbmNob3IiLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsIm5vZGUiLCJwbGFjZSIsInRhcmdldEVsIiwibCIsImNoaWxkcmVuIiwidGV4dENvbnRlbnQiLCJyZW5kZXJlZCIsInBsYWNlQWZ0ZXIiLCJwbGFjZUJlZm9yZSIsInBsYWNlRmlyc3QiLCJwbGFjZUxhc3QiLCJub3RQbGFjZXJzIiwiTUVUQV9QQVJUUyIsInJlc2V0UGFydHMiLCJwcmVwYXJlVGVtcGxhdGVFbGVtZW50IiwiaW5pdE1hcmtFbGVtZW50IiwibWFya0VsIiwicGxhY2VyIiwiZ2V0UGxhY2VyIiwidGFyZ2V0UXVlcnkiLCJtYWluIiwidW5zZXRSZWFkeSIsImh0bWwiLCJzZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImFkZEZyb21VUkwiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImNsZWFyUGFydHMiLCJkZWFkIiwib2ZmQWxsIiwiZm9yRWFjaERhdGEiLCJyZW5kZXJQYXJ0IiwicGxhY2VSZW5kZXJlZCIsInJlbW92ZU9ic29sZXRlUGFydHMiLCJiZWZvcmUiLCJwbGFjZVBhcnQiLCJhZnRlciIsInBhcnQiLCJnZXRQYXJ0QnlEYXRhIiwibm9kZXMiLCJsYXN0Tm9kZSIsIm5vZGVUeXBlIiwiZ2V0UGFydHMiLCJyZW5kZXJlciIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUiLCJhZGRQYXJ0IiwidXBkYXRlUGFydCIsInBpcGUiLCJmaW5kQWN0dWFsUGFydHMiLCJyZW1vdmVOb3RBY3R1YWxQYXJ0cyIsImFjdHVhbFBhcnRzIiwiaXNEYXRhIiwiT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SIiwiT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCIsIk9QVF9ERUZBVUxUX1ZJRVdfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCIsIk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FIiwiT1BUX0RFRkFVTFRfU0lOR0xFX05BTUUiLCJPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9BTkQiLCJub3RDb250cm9sbGVyIiwiaW5pdFJlbmRlciIsImludGVyZmFjZXMiLCJnZXRJbnRlcmZhY2VzIiwibWFrZSIsInZpZXdOYW1lIiwidmlldyIsImdldFZpZXciLCJ0ZW1wbGF0ZVVSTCIsInByZWZpeCIsImNvbW1vbiIsImdldE1vZHVsZVByZWZpeCIsInBvc3RmaXgiLCJ0ZW1wbGF0ZU5hbWUiLCJyZW5kZXJBbmQiLCJ2aWV3cyIsImdldE1vZHVsZU5hbWUiLCIkbGlzdEFsbCIsImVyciIsImZpZWxkRmlsZXMiLCJzYXZlZEZpbGUiLCJoYXNoIiwiT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgiLCJPUFRfREVGQVVMVF9ST0xFX05BTUUiLCJPUFRfREVGQVVMVF9GT1JNX1RJVExFIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiIsIk9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUIiwibm90Rm9ybSIsIm9uU3VibWl0Iiwib25SZXNldCIsIm9uQ2FuY2VsIiwiZ2V0TWFuaWZlc3QiLCJyb2xlIiwicmVuZGVyV3JhcHBlciIsImZvcm1QYXJ0IiwiZ2V0V3JhcHBlckRhdGEiLCJnZXRQYXJ0VGVtcGxhdGVOYW1lIiwiYmluZEZvcm1FdmVudHMiLCJyZW5kZXJDb21wb25lbnRzIiwid3JhcHBlciIsInRpdGxlIiwiZ2V0Rm9ybUZpZWxkc0xpc3QiLCJhZGRGaWVsZENvbXBvbmVudCIsImNvbXBzIiwiZ2V0QXBwIiwiZGVmIiwiZmllbGRzTGlicyIsImdldEZpZWxkc0xpYnMiLCJmaWVsZFR5cGUiLCJnZXRGaWVsZHNEZWZpbml0aW9uIiwicmVjIiwibGFiZWwiLCJwbGFjZWhvbGRlciIsImRlZmF1bHQiLCJmaWVsZCIsImdldEZvcm1UYXJnZXRFbGVtZW50IiwiY29sbGVjdERhdGFGcm9tQ29tcG9uZW50cyIsImZvcm0iLCJPUFRfREVGQVVMVF9WSUVXIiwiT1BUX0RFRkFVTFRfQUNUSU9OIiwiT1BUX0RFRkFVTFRfSVRFTSIsIkNSVURDcmVhdGUiLCJwYXJlbnQiLCJzZXRWaWV3cyIsInByZWxvYWRMaWIiLCJyZW5kZXJGb3JtIiwib25BZnRlclJlbmRlciIsImluaXRJdGVtIiwiY3JlYXRlRGVmYXVsdCIsImxpbmtCYWNrVG9MaXN0IiwiZmlsZXMiLCJkYXRhVHJhbnNmZXIiLCJxdWVlVXBsb2FkIiwibmV3SXRlbSIsImV4ZWNVcGxvYWRzIiwiY3JlYXRlIiwiZ29Ub1RhYmxlIiwiYmFja1RvTGlzdCIsIk9QVF9ERUZBVUxUX1BBR0VfU0laRSIsIk9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSIiwiT1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04iLCJPUFRfREVGQVVMVF9TT1JUX0ZJRUxEIiwiT1BUX0ZJRUxEX05BTUVfUFJFX1BST0MiLCJub3RUYWJsZSIsInJvd3MiLCJyZXNldFNvcnRlciIsInJlbmRlckluc2lkZSIsInJlbmRlckhlYWRlciIsInVwZGF0ZURhdGEiLCJyZW5kZXJCb2R5IiwiYmluZFNlYXJjaCIsImJpbmRDdXN0b21CaW5kaW5ncyIsInRhYmxlSGVhZGVyIiwibmV3VGgiLCJzb3J0YWJsZSIsImF0dGFjaFNvcnRpbmdIYW5kbGVycyIsImhlYWRDZWxsIiwiY2hhbmdlU29ydGluZ09wdGlvbnMiLCJzdHlsZSIsImN1cnNvciIsInNvcnRCeUZpZWxkIiwic29ydERpcmVjdGlvbiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImludmFsaWRhdGVEYXRhIiwiZmlsdGVyU2VhcmNoIiwiaXNOYU4iLCJpZlVwZGF0aW5nIiwicXVlcnkiLCJzZXRVcGRhdGluZyIsIiRsaXN0IiwicHJvY2Nlc3NEYXRhIiwicmVmcmVzaEJvZHkiLCJzZXRVcGRhdGVkIiwidGhhdEZpbHRlciIsInRlc3REYXRhSXRlbSIsInRoYXRTb3J0ZXIiLCJzb3J0IiwiaXRlbTEiLCJpdGVtMiIsInQxIiwidDIiLCJsb2NhbGVDb21wYXJlIiwic2VhcmNoRWwiLCJvbkV2ZW50IiwiY3VycmVudFRhcmdldCIsInNlbGVjdG9yIiwiZ2V0T3B0aW9uIiwibmV3Um93IiwibmV3VGQiLCJwcmVwcm9jZXNzZWQiLCJpdGVtSWQiLCJ0Ym9keSIsImZpbmRCb2R5IiwiY2xlYXJCb2R5IiwiY2hlY2tGaWx0ZXJlZCIsInRoaXNQYWdlU3RhcnRzIiwibmV4dFBhZ2VFbmRzIiwibWluIiwicmVuZGVyUm93IiwidGFibGVCb2R5Iiwic3RyVmFsdWUiLCJnZXRGaWx0ZXJTZWFyY2giLCJ0b0NvbXAiLCJPUF9ERUZBVUxUX1BBR0VfU0laRSIsIkNSVURMaXN0IiwidXBkYXRlRGF0YXRhYmxlIiwidGFibGVWaWV3IiwibG9hZE5leHQiLCJPUFRfREVGQVVMVF9MT0FEX0FDVElPTiIsIkNSVURVcGRhdGUiLCJsb2FkSXRlbSIsInJ1bkxpc3QiLCJDUlVERGVsZXRlIiwiY29uZmlybSIsImRlbGV0ZSIsImFjdGlvbiIsIk9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYIiwiT1BUX0RFRkFVTFRfREVUQUlMU19USVRMRSIsIm5vdERldGFpbHMiLCJnZXRGaWVsZHNMaXN0IiwiY2FzdEN1c3RvbSIsImNhc3RDb21tb24iLCJDdXN0b21Db21wb25lbnQiLCJnZXRUYXJnZXRFbGVtZW50IiwiQ1JVRERldGFpbHMiLCJyZW5kZXJEZXRhaWxzIiwiX2lkIiwiX192ZXJzaW9uIiwiQ1JVRENvbnRyb2xsZXIiLCJydW5DcmVhdGUiLCJydW5EZXRhaWxzIiwicnVuRGVsZXRlIiwicnVuVXBkYXRlIiwicm91dGVSdW5uZXJOYW1lIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIiwic2NvcGUiLCJiaW5kcyIsImxpdmVFdmVudHMiLCJjaGVja2VkIiwic2VsZWN0ZWQiLCJzZWxlY3RlZE9wdGlvbnMiLCJwcm9jZXNzZWRWYWx1ZSIsInVzZWQiLCJvcHRpb24iLCJ2YWx1ZUZpZWxkTmFtZSIsImxhYmVsRmllbGROYW1lIiwiaXRlbVZhbHVlRmllbGROYW1lIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxnQkFBZ0I7VUFDVixpQkFBU0MsR0FBVCxFQUFjO1NBQ2YsS0FBS0MsR0FBTCxDQUFTLE1BQVQsSUFBbUJELEdBQTFCO0VBRmtCO2NBSU4scUJBQVNBLEdBQVQsRUFBYztTQUNuQixLQUFLQyxHQUFMLENBQVMsVUFBVCxJQUF1QkQsR0FBOUI7RUFMa0I7Z0JBT0osdUJBQVNFLFNBQVQsRUFBb0JDLE1BQXBCLEVBQTRCO09BQ3JDLElBQUlDLENBQVQsSUFBY0YsU0FBZCxFQUF5QjtRQUNuQixJQUFJRyxDQUFULElBQWNGLE1BQWQsRUFBc0I7UUFDakJELFVBQVVFLENBQVYsRUFBYUUsY0FBYixDQUE0QkgsT0FBT0UsQ0FBUCxDQUE1QixDQUFKLEVBQTRDO1NBQ3ZDRSxRQUFRLElBQUlDLEtBQUosRUFBWjtXQUNNQyxZQUFOLENBQW1CLGFBQW5CLEVBQWtDLFdBQWxDO1dBQ01DLEdBQU4sR0FBWVIsVUFBVUUsQ0FBVixFQUFhRCxPQUFPRSxDQUFQLENBQWIsRUFBd0JNLE9BQXhCLENBQWdDLElBQWhDLE1BQTBDLENBQTFDLEdBQThDLEtBQUtDLFdBQUwsQ0FBaUJWLFVBQVVFLENBQVYsRUFBYUQsT0FBT0UsQ0FBUCxDQUFiLENBQWpCLENBQTlDLEdBQTBGSCxVQUFVRSxDQUFWLEVBQWFELE9BQU9FLENBQVAsQ0FBYixDQUF0Rzs7OztFQWJlO1FBQUEsbUJBa0JYUSxNQWxCVyxxQ0FrQmlDOzs7U0FDNUMsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixF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
