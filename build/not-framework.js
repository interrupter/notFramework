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
							reject(xhr.status, xhr.response);
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
					reject(status, xhr.response);
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
					reject(status, xhr.response);
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
					reject(status, xhr.response);
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
					reject(status, xhr.response);
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
					reject(status, xhr.response);
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
					reject(status, xhr.responseText);
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

var CommonLogs = {
	debug: function debug() {
		var _console;

		(_console = console).log.apply(_console, arguments);
	},
	log: function log() {
		var _console2;

		(_console2 = console).log.apply(_console2, arguments);
	},
	error: function error() {
		var _console3;

		(_console3 = console).error.apply(_console3, arguments);
	},
	report: function report() {
		var _console4;

		(_console4 = console).error.apply(_console4, arguments);
	},
	trace: function trace() {
		var _console5;

		(_console5 = console).trace.apply(_console5, arguments);
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





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





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







var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

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



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
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

	get: function get(key) {
		return this.registry.hasOwnProperty(key) ? this.registry[key] : null;
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
				subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath);
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
		value: function get(path, item, helpers) {
			switch (path) {
				case PATH_START_OBJECT:
					return item;
				case PATH_START_HELPERS:
					return helpers;
			}
			path = this.parseSubs(path, item, helpers);
			return this.getValueByPath(path.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, path);
		}
	}, {
		key: 'set',
		value: function set(path, item, helpers, attrValue) {
			var subPath = void 0,
			    subPathParsed = void 0,
			    i = 0;
			while (subPath = this.findNextSubPath(path)) {
				subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath);
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
		value: function getValueByPath(object, attrPath) {
			attrPath = this.normilizePath(attrPath);
			var attrName = attrPath.shift(),
			    isFunction = attrName.indexOf(FUNCTION_MARKER) > -1;
			if (isFunction) {
				attrName = attrName.replace(FUNCTION_MARKER, '');
			}
			if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object[attrName] !== 'undefined' && object[attrName] !== null) {
				var newObj = isFunction ? object[attrName]() : object[attrName];
				if (attrPath.length > 0) {
					return this.getValueByPath(newObj, attrPath);
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
			var _this2 = this;

			var args = Array.from(arguments),
			    eventName = args.shift();
			if (!Array.isArray(eventName)) {
				eventName = [eventName];
			}
			eventName.forEach(function (name) {
				if (_this2[META_EVENTS].hasOwnProperty(name)) {
					_this2[META_EVENTS][name].forEach(function (event) {
						if (event.once) {
							_this2.off(name, event.callbacks);
						}
						event.callbacks.forEach(function (callback) {
							return callback.apply(undefined, toConsumableArray(args));
						});
					});
				}
			});
			return this;
		}
	}, {
		key: 'off',
		value: function off(eventNames /* array of event names */, eventCallbacks /* array of callbacks */) {
			var _this3 = this;

			if (!Array.isArray(eventNames)) {
				eventNames = [eventNames];
			}
			if (!Array.isArray(eventCallbacks)) {
				eventCallbacks = [eventCallbacks];
			}

			eventNames.forEach(function (name) {
				var targetId = -1;
				_this3[META_EVENTS][name].forEach(function (event, i) {
					if (i === -1 && eventCallbacks === event.callbacks) {
						targetId = i;
					}
				});
				if (targetId > -1) {
					_this3[META_EVENTS][name].splice(targetId, 1);
				}
			});
			return this;
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

			notCommon.log('making request', method, url, id);
			notCommon.requestJSON(method, url, data).then(function (response) {
				notCommon.log('request successfull', method, url, id, response);
				_this3.quee.next();
				notCommon.log('response is good');
				good && good(response);
			}).catch(function (code, response) {
				notCommon.error('request failed', method, url, id, response);
				_this3.quee.next();
				notCommon.log('response is bad');
				bad && bad(response);
			});
		}
	}, {
		key: 'update',
		value: function update(obj, good, bad) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				notCommon.log('update');
				var id = obj.getId(),
				    modelName = obj.getModelName(),
				    url = _this4.makeUrl([_this4.getOptions('base'), modelName, id]),
				    data = obj.getJSON();
				_this4.quee.add(_this4.makeRequest.bind(_this4, 'post', url, id, data, function (responseOK) {
					notCommon.getModel().setPrice(responseOK);
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					notCommon.log('update failed');
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
					notCommon.getModel().setPrice(responseOK);
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					notCommon.log('putt failed');
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'get',
		value: function get(obj, good, bad) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				var id = obj.getId(),
				    modelName = obj.getModelName(),
				    url = _this6.makeUrl([_this6.getOptions('base'), modelName, id]);
				_this6.quee.add(_this6.makeRequest.bind(_this6, 'get', url, id, null, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					notCommon.log('get failed');
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
					notCommon.log('list failed');
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
					notCommon.getModel().setPrice(responseOK);
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					notCommon.log('delete failed');
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'getUploadURL',
		value: function getUploadURL(model) {
			return this.getOptions('base') + this.getOptions('upload') + model ? model.getId() : '';
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
			this[META_CACHE][key] = element;
		}
	}, {
		key: 'get',
		value: function get(key) {
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
			}).catch(function (e) {
				notCommon.report(e);
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
							if (_typeof(item[key]) === 'object') {
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
				//notCommon.log('define', DEFAULT_ACTION_PREFIX + index);
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
			notCommon.getManager().setAPI(new notAPI$1({}));
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
		value: function get() {
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
		key: 'onChange',
		value: function onChange(proxy, key, value) {
			/*notCommon.log(this);
   notCommon.log(this.getBreadCrumps().join(' > '));
   notCommon.log('updating renderer ', this.getWorking('partId'), ' after changes', key, value);*/
			this.update(key);
			this.trigger('obsolete', proxy, key, value);
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
					/*notCommon.log(item.getOptions('name'), ' >-< ', item.getOptions('id'), ' >-< ', componentPath, changedPath);
     notCommon.log('will be updated', ifPart);*/
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
			    nodes = part.getStash(),
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
							renderAnd: OPT_DEFAULT_RENDER_AND || view.renderAnd
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
	}]);
	return notController;
}(notBase);

var notTemplateProcessorsLib = {
	content: function content(scope, item, helpers) {
		scope.attributeResult = notPath$1.parseSubs(scope.attributeExpression, item, helpers);
		if (scope.params.indexOf('capitalize') > -1) {
			scope.attributeResult = scope.attributeResult.toUpperCase();
		}
		scope.element.textContent = scope.attributeResult;
	},
	bind: function bind(scope, item, helpers) {
		scope.element.addEventListener(scope.params[0], function (e) {
			e.stopImmediatePropagation();
			e.preventDefault();
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
		});
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
		var res = notPath$1.get(scope.attributeExpression, item, helpers);
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
					if (item[itemValueFieldName].indexOf(lib[i][valueFieldName]) > -1) {
						option.setAttribute('selected', true);
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

//import notPath from '../notPath';
//import notComponent from '../template/notComponent';

var notView = function (_notBase) {
	inherits(notView, _notBase);

	function notView(input) {
		var _ret;

		classCallCheck(this, notView);

		var _this = possibleConstructorReturn(this, (notView.__proto__ || Object.getPrototypeOf(notView)).call(this));

		_this.setOptions(input.options || {});
		_this.setData(input.data || {});
		_this.setWorking(input.working || {});
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	return notView;
}(notBase);

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
	daddy for user controllers
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
exports.notTemplateProcessors = notTemplateProcessors$1;
exports.notTemplateProcessorsLib = notTemplateProcessorsLib;
exports.notTemplateCache = notTemplateCache$1;
exports.notRenderer = notRenderer;
exports.notComponent = notComponent;
exports.notForm = notForm;
exports.notRouter = notRouter$1;
exports.notTable = notTable;
exports.notView = notView;
exports.notRecord = notRecord;
exports.notRecordInterface = notInterface;

}((this.notFramework = this.notFramework || {})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdEZvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFZpZXcuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSkge1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvciAodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IgKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwdXRGaWxlKHVwbG9hZCAvKiBvYmplY3QoZmlsZSwgb25Qcm9ncmVzcywgdXJsKSovICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRpZiAoeGhyLnVwbG9hZCkge1xuXHRcdFx0XHQvLyBwcm9ncmVzcyBiYXJcblx0XHRcdFx0aWYgKHVwbG9hZC5vblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZC5vblByb2dyZXNzLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCAvKmUqLyApIHtcblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh4aHIuc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0Ly8gc3RhcnQgdXBsb2FkXG5cdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0XHR4aHIub3BlbignUFVUJywgdXBsb2FkLnVybCwgdHJ1ZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignWF9GSUxFTkFNRScsIGVuY29kZVVSSUNvbXBvbmVudCh1cGxvYWQuZmlsZS5uYW1lKSk7XG5cdFx0XHRcdHhoci5zZW5kKHVwbG9hZC5maWxlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUFVUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChwYXJzZUludChzdGF0dXMpID09PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoZSkgPT4gcmVqZWN0KGUpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0U2Vzc2lvbklEOiBmdW5jdGlvbihuYW1lID0gJ1Nlc3Npb25JRCcpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb29raWUobmFtZSk7XG5cdH0sXG5cdGdldENvb2tpZTogKG5hbWUpID0+IHtcblx0XHRsZXQgdmFsdWUgPSAnOyAnICsgZG9jdW1lbnQuY29va2llLFxuXHRcdFx0cGFydHMgPSB2YWx1ZS5zcGxpdCgnOyAnICsgbmFtZSArICc9Jyk7XG5cdFx0aWYgKHBhcnRzLmxlbmd0aCA9PSAyKSB7XG5cdFx0XHRyZXR1cm4gcGFydHMucG9wKCkuc3BsaXQoJzsnKS5zaGlmdCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbk5ldHdvcms7XG4iLCJ2YXIgQ29tbW9uTG9ncyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fSxcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHRyYWNlOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbk9iamVjdHM7XG4iLCJ2YXIgQ29tbW9uU3RyaW5ncyA9IHtcblx0Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG5cdH0sXG5cdGxvd2VyRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblN0cmluZ3M7XG4iLCJ2YXIgQ29tbW9uRnVuY3Rpb25zID0ge1xuXHRwaXBlOiBmdW5jdGlvbihkYXRhLyogZmVlZCBkYXRhICovLCBmdW5jcy8qIGZ1bmN0aW9ucyBhcnJheSAqLykge1xuXHRcdGxldCByZXN1bHQ7XG5cdFx0Zm9yKGxldCBmdW5jIG9mIGZ1bmNzKXtcblx0XHRcdHJlc3VsdCA9IGZ1bmMocmVzdWx0IHx8IGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRnVuY3Rpb25zO1xuIiwidmFyIENvbW1vbkRPTSA9IHtcblx0Z2V0QXR0cmlidXRlc1N0YXJ0c1dpdGg6IGZ1bmN0aW9uKGVsLCBzdGFydHNXaXRoKSB7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihzdGFydHNXaXRoKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkRPTTtcbiIsInZhciBDb21tb25BcHAgPSB7XG5cdHN0YXJ0QXBwOiAoc3RhcnRlcik9Pntcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc3RhcnRlcik7XG5cdH0sXG5cdGdldEFwcDogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ2FwcCcpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25BcHA7XG4iLCJpbXBvcnQgQ29tbW9uTmV0d29yayBmcm9tICcuL25ldC5qcyc7XG5pbXBvcnQgQ29tbW9uTG9ncyBmcm9tICcuL2xvZ3MuanMnO1xuaW1wb3J0IENvbW1vblNob3J0cyBmcm9tICcuL3Nob3J0cy5qcyc7XG5pbXBvcnQgQ29tbW9uT2JqZWN0cyBmcm9tICcuL29iamVjdHMuanMnO1xuaW1wb3J0IENvbW1vblN0cmluZ3MgZnJvbSAnLi9zdHJpbmdzLmpzJztcbmltcG9ydCBDb21tb25GdW5jdGlvbnMgZnJvbSAnLi9mdW5jdGlvbnMuanMnO1xuaW1wb3J0IENvbW1vbkRPTSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgQ29tbW9uQXBwIGZyb20gJy4vYXBwLmpzJztcblxuLypcblx00YHQv9C40YHQvtC6INGC0L7Qs9C+INGH0YLQviDQvdGD0LbQvdC+INC/0L7QtNC60LvRjtGH0LjRgtGMINC60LDQuiDQvtCx0YnQuNC1XG4qL1xudmFyIG5vdENvbW1vbiA9IE9iamVjdC5hc3NpZ24oe30sIENvbW1vbk9iamVjdHMpO1xuXG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25OZXR3b3JrKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblN0cmluZ3MpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uTG9ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25TaG9ydHMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRnVuY3Rpb25zKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkRPTSk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25BcHApO1xuXG5leHBvcnQgZGVmYXVsdCBub3RDb21tb247XG4iLCIvKlxuXHQ6cHJvcGVydHkuc3ViMS5mdW5jKCkuZnVuY1Byb3Bcblx0ID0gcmV0dXJuIGZ1bmNQcm9wIG9mIGZ1bmN0aW9uIHJlc3VsdCBvZiBzdWIxIHByb3BlcnR5IG9mIHByb3BlcnR5IG9mIG9iamVjdFxuXHQ6ezo6aGVscGVyVmFsfS5zdWJcblx0ID0gcmV0dXJuIHN1YiBwcm9wZXJ0eSBvZiBvYmplY3QgcHJvcGVydHkgd2l0aCBuYW1lIHJldHJpZXZlZCBmcm9tIGhlbHBlclZhbCBwcm9wZXJ0eSBvZiBoZWxwZXJzIG9iamVjdFxuXHQ6ezo6aGVscGVyRnVuYygpfS5zdWJcblx0PSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIGZ1bmN0aW9uIHJlc3VsdCBvZiBoZWxwZXJzIG9iamVjdC5cblx0aWYgaGVscGVyc0Z1bnggcmV0dXJuICdjYXInIHRoZW4gc291cmNlIHBhdGggYmVjb21lcyA6Y2FyLnN1YlxuXG4qL1xuXG5jb25zdCBTVUJfUEFUSF9TVEFSVCA9ICd7Jyxcblx0U1VCX1BBVEhfRU5EID0gJ30nLFxuXHRQQVRIX1NQTElUID0gJy4nLFxuXHRQQVRIX1NUQVJUX09CSkVDVCA9ICc6Jyxcblx0UEFUSF9TVEFSVF9IRUxQRVJTID0gJzo6Jyxcblx0RlVOQ1RJT05fTUFSS0VSID0gJygpJyxcblx0TUFYX0RFRVAgPSAxMDtcblxuY2xhc3Mgbm90UGF0aHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQvKlxuXHRcdGlucHV0ICc6ezo6aGVscGVyVmFsfS5zdWInXG5cdFx0cmV0dXJuIDo6aGVscGVyVmFsXG5cdCovXG5cdGZpbmROZXh0U3ViUGF0aChwYXRoLyogc3RyaW5nICovKXtcblx0XHRsZXQgc3ViUGF0aCA9ICcnLFxuXHRcdFx0ZmluZCA9IGZhbHNlO1xuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdGlmIChwYXRoW2ldID09PSBTVUJfUEFUSF9TVEFSVCl7XG5cdFx0XHRcdGZpbmQgPSB0cnVlO1xuXHRcdFx0XHRzdWJQYXRoID0gJyc7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0aWYocGF0aFtpXSA9PT0gU1VCX1BBVEhfRU5EICYmIGZpbmQpe1xuXHRcdFx0XHRcdGlmIChmaW5kKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3ViUGF0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHN1YlBhdGgrPXBhdGhbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZpbmQ/c3ViUGF0aDpudWxsO1xuXHR9XG5cblx0cmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViLCBwYXJzZWQpe1xuXHRcdGxldCBzdWJmID0gU1VCX1BBVEhfU1RBUlQrc3ViK1NVQl9QQVRIX0VORDtcblx0XHR3aGlsZShwYXRoLmluZGV4T2Yoc3ViZikgPiAtMSl7XG5cdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKHN1YmYsIHBhcnNlZCk7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0cGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGxldCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkLCBpID0gMDtcblx0XHR3aGlsZShzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCkpe1xuXHRcdFx0c3ViUGF0aFBhcnNlZCA9IHRoaXMuZ2V0VmFsdWVCeVBhdGgoIHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgc3ViUGF0aCk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGkrKztcblx0XHRcdGlmIChpID4gTUFYX0RFRVApe1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRnZXQocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0c3dpdGNoIChwYXRoKXtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9PQkpFQ1Q6IHJldHVybiBpdGVtO1xuXHRcdFx0Y2FzZSBQQVRIX1NUQVJUX0hFTFBFUlM6IHJldHVybiBoZWxwZXJzO1xuXHRcdH1cblx0XHRwYXRoID0gdGhpcy5wYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0VmFsdWVCeVBhdGgocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUyk+LTE/aGVscGVyczppdGVtLCBwYXRoKTtcblx0fVxuXG5cdHNldChwYXRoLCBpdGVtLCBoZWxwZXJzLCBhdHRyVmFsdWUpe1xuXHRcdGxldCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkLCBpID0gMDtcblx0XHR3aGlsZShzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCkpe1xuXHRcdFx0c3ViUGF0aFBhcnNlZCA9IHRoaXMuZ2V0VmFsdWVCeVBhdGgoIHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgc3ViUGF0aCk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGlmIChpID4gTUFYX0RFRVApe1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdGlmIChpdGVtLmlzUmVjb3JkICYmIHRoaXMubm9ybWlsaXplUGF0aChwYXRoKS5sZW5ndGggPiAxKSB7XG5cdFx0XHRpdGVtLnRyaWdnZXIoJ2NoYW5nZScsIGl0ZW0sIHBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0dW5zZXQocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0dGhpcy5zZXQocGF0aCwgaXRlbSwgaGVscGVycywgbnVsbCk7XG5cdH1cblxuXHRwYXJzZVBhdGhTdGVwKHN0ZXAsIGl0ZW0sIGhlbHBlcil7XG5cdFx0bGV0IHJTdGVwID0gbnVsbDtcblx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKSA9PT0gMCAmJiBoZWxwZXIpe1xuXHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9IRUxQRVJTLCAnJyk7XG5cdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdGlmKGhlbHBlci5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPT09IDAgJiYgaXRlbSl7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCAnJyk7XG5cdFx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRcdGlmKGl0ZW0uaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBzdGVwO1xuXHR9XG5cblx0Ly86OmZpZWxkTmFtZS5yZXN1bHRcblx0Ly97fVxuXHQvL3tmaWVsZE5hbWU6ICd0YXJnZXRSZWNvcmRGaWVsZCd9XG5cdC8vLy9bJ3RhcmdldFJlY29yZEZpZWxkJywgJ3Jlc3VsdCddXG5cdHBhcnNlUGF0aChwYXRoLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRwYXRoID0gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0cGF0aFtpXSA9IHRoaXMucGFyc2VQYXRoU3RlcChwYXRoW2ldLCBpdGVtLCBoZWxwZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdG5vcm1pbGl6ZVBhdGgocGF0aCl7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cmV0dXJuIHBhdGg7XG5cdFx0fWVsc2V7XG5cdFx0XHR3aGlsZShwYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID4gLTEpe1xuXHRcdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCcnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0c21hbGwgPSBbXCJ0b2RvXCJdLFxuXHRcdGJpZyA9IFtcInRvZG9cIiwgXCJsZW5ndGhcIl1cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHQqL1xuXG5cdGlmRnVsbFN1YlBhdGgoYmlnLCBzbWFsbCl7XG5cdFx0aWYgKGJpZy5sZW5ndGg8c21hbGwubGVuZ3RoKXtyZXR1cm4gZmFsc2U7fVxuXHRcdGZvcihsZXQgdCA9MDsgdCA8IHNtYWxsLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHNtYWxsW3RdICE9PSBiaWdbdF0pe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCksXG5cdFx0XHRpc0Z1bmN0aW9uID0gYXR0ck5hbWUuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpPi0xO1xuXHRcdGlmIChpc0Z1bmN0aW9uKXtcblx0XHRcdGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHR9XG5cdFx0aWYgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgdHlwZW9mIG9iamVjdFthdHRyTmFtZV0gIT09ICd1bmRlZmluZWQnICYmIG9iamVjdFthdHRyTmFtZV0gIT09IG51bGwpe1xuXHRcdFx0bGV0IG5ld09iaiA9IGlzRnVuY3Rpb24/b2JqZWN0W2F0dHJOYW1lXSgpOm9iamVjdFthdHRyTmFtZV07XG5cdFx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKG5ld09iaiwgYXR0clBhdGgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBuZXdPYmo7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdHNldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGF0dHJWYWx1ZSl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCk7XG5cdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0aWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKXtvYmplY3RbYXR0ck5hbWVdID0ge307fVxuXHRcdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChvYmplY3RbYXR0ck5hbWVdLCBhdHRyUGF0aCwgYXR0clZhbHVlKTtcblx0XHR9ZWxzZXtcblx0XHRcdG9iamVjdFthdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0am9pbigpe1xuXHRcdGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gYXJncy5qb2luKFBBVEhfU1BMSVQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RQYXRoKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE1FVEFfTUVUSE9EX0lOSVQgPSBTeW1ib2woJ2luaXQnKSxcblx0TUVUQV9FVkVOVFMgPSBTeW1ib2woJ2V2ZW50cycpLFxuXHRNRVRBX0RBVEEgPSBTeW1ib2woJ2RhdGEnKSxcblx0TUVUQV9XT1JLSU5HID0gU3ltYm9sKCd3b3JraW5nJyksXG5cdE1FVEFfT1BUSU9OUyA9IFN5bWJvbCgnb3B0aW9ucycpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHR0aGlzW01FVEFfRVZFTlRTXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9EQVRBXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9NRVRIT0RfSU5JVF0oaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0W01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KXtcblx0XHRpZiAoIWlucHV0KXtcblx0XHRcdGlucHV0ID0ge307XG5cdFx0fVxuXHRcdGlmKGlucHV0Lmhhc093blByb3BlcnR5KCdldmVudHMnKSl7XG5cdFx0XHRmb3IobGV0IHQgb2YgaW5wdXQuZXZlbnRzKXtcblx0XHRcdFx0dGhpcy5vbiguLi50KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKXtcblx0XHRcdHRoaXMuc2V0RGF0YShpbnB1dC5kYXRhKTtcblx0XHR9XG5cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnd29ya2luZycpKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhpbnB1dC53b3JraW5nKTtcblx0XHR9XG5cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKXtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucyhpbnB1dC5vcHRpb25zKTtcblx0XHR9XG5cdH1cblxuXHRzZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uICovXG5cdFx0XHRcdHdoYXQgPSBhcmdzWzBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uIGVsZW1lbnQgKi9cblx0XHRcdFx0bm90UGF0aC5zZXQoYXJnc1swXSAvKiBwYXRoICovICwgd2hhdCAvKiBjb2xsZWN0aW9uICovICwgdW5kZWZpbmVkIC8qIGhlbHBlcnMgKi8gLCBhcmdzWzFdIC8qIHZhbHVlICovICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRnZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCAqL1xuXHRcdGNhc2UgMTpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0fVxuXHRcdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggd2l0aCBkZWZhdWx0IHZhbHVlICovXG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHRcdGlmIChyZXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdC8qIG5vIGRhdGEsIHJldHVybiBkZWZhdWx0IHZhbHVlICovXG5cdFx0XHRcdFx0cmV0dXJuIGFyZ3NbMV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LyogZGF0YSwgcmV0dXJuIGl0ICovXG5cdFx0XHRcdFx0cmV0dXJuIHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0LyogcmV0dXJuIGZ1bGwgY29sbGVjdGlvbiAqL1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB3aGF0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0Q09SRSBPQkpFQ1Rcblx0XHRcdERBVEEgLSBpbmZvcm1hdGlvblxuXHRcdFx0T1BUSU9OUyAtIGhvdyB0byB3b3JrXG5cdFx0XHRXT1JLSU5HIC0gdGVtcG9yYXJpbHkgZ2VuZXJhdGVkIGluIHByb2NjZXNzXG5cdCovXG5cblx0c2V0RGF0YSgpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX0RBVEFdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldERhdGEoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldERhdGEoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9EQVRBXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldE9wdGlvbnMoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRPcHRpb25zKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX09QVElPTlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0V29ya2luZygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX1dPUktJTkddID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldFdvcmtpbmcoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRXb3JraW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfV09SS0lOR10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKlxuXHRcdEVWRU5UUyBoYW5kbGluZ1xuXHQqL1xuXG5cdG9uKGV2ZW50TmFtZXMsIGV2ZW50Q2FsbGJhY2tzLCBvbmNlKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdG5vdENvbW1vbi5kZWZpbmVJZk5vdEV4aXN0cyh0aGlzW01FVEFfRVZFTlRTXSwgbmFtZSwgW10pO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0ucHVzaCh7XG5cdFx0XHRcdGNhbGxiYWNrczogZXZlbnRDYWxsYmFja3MsXG5cdFx0XHRcdG9uY2U6IG9uY2UsXG5cdFx0XHRcdGNvdW50OiAwXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHRyaWdnZXIoKSB7XG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyksXG5cdFx0XHRldmVudE5hbWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZSkpIHtcblx0XHRcdGV2ZW50TmFtZSA9IFtldmVudE5hbWVdO1xuXHRcdH1cblx0XHRldmVudE5hbWUuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5mb3JFYWNoKGV2ZW50ID0+IHtcblx0XHRcdFx0XHRpZiAoZXZlbnQub25jZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnQuY2FsbGJhY2tzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG9mZihldmVudE5hbWVzIC8qIGFycmF5IG9mIGV2ZW50IG5hbWVzICovICwgZXZlbnRDYWxsYmFja3MgLyogYXJyYXkgb2YgY2FsbGJhY2tzICovICkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGxldCB0YXJnZXRJZCA9IC0xO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaCgoZXZlbnQsIGkpID0+IHtcblx0XHRcdFx0aWYgKGkgPT09IC0xICYmIGV2ZW50Q2FsbGJhY2tzID09PSBldmVudC5jYWxsYmFja3MpIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9IGk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRhcmdldElkID4gLTEpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uc3BsaWNlKHRhcmdldElkLCAxKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmNvbnN0IE9QVF9NT0RFX0hJU1RPUlkgPSBTeW1ib2woJ2hpc3RvcnknKSxcblx0T1BUX01PREVfSEFTSCA9IFN5bWJvbCgnaGFzaCcpLFxuXHRPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCA9IDUwO1xuXG5jbGFzcyBub3RSb3V0ZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLycsIC8vYWx3YXlzIGluIHNsYXNoZXMgL3VzZXIvLCAvLCAvaW5wdXQvLiBhbmQgbm8gL3VzZXIgb3IgaW5wdXQvbGV2ZWxcblx0XHRcdGluaXRpYWxpemVkOiBmYWxzZVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlzdG9yeSgpe1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZScsIE9QVF9NT0RFX0hJU1RPUlkpO1xuXHR9XG5cblx0aGFzaCgpe1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZScsIE9QVF9NT0RFX0hBU0gpO1xuXHR9XG5cblx0c2V0Um9vdChyb290KXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3Jvb3QnLCByb290ID8gJy8nICsgdGhpcy5jbGVhclNsYXNoZXMocm9vdCkgKyAnLycgOiAnLycpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y2xlYXJTbGFzaGVzKHBhdGgpIHtcblx0XHQvL2ZpcnN0IGFuZCBsYXN0IHNsYXNoZXMgcmVtb3ZhbFxuXHRcdHJldHVybiBwYXRoLnRvU3RyaW5nKCkucmVwbGFjZSgvXFwvJC8sICcnKS5yZXBsYWNlKC9eXFwvLywgJycpO1xuXHR9XG5cblx0YWRkKHJlLCBoYW5kbGVyKSB7XG5cdFx0aWYgKHR5cGVvZiByZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRoYW5kbGVyID0gcmU7XG5cdFx0XHRyZSA9ICcnO1xuXHRcdH1cblx0XHRsZXQgcnVsZSA9IHtcblx0XHRcdHJlOiByZSxcblx0XHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0XHR9O1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykucHVzaChydWxlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZExpc3QobGlzdCkge1xuXHRcdGZvciAobGV0IHQgaW4gbGlzdCkge1xuXHRcdFx0dGhpcy5hZGQodCwgbGlzdFt0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVtb3ZlKHBhcmFtKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIHI7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aCwgciA9IHRoaXMuZ2V0V29ya2luZygncm91dGVzJylbaV07IGkrKykge1xuXHRcdFx0aWYgKHIuaGFuZGxlciA9PT0gcGFyYW0gfHwgci5yZSA9PT0gcGFyYW0pIHtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGZsdXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyb3V0ZXM6IFtdLFxuXHRcdFx0bW9kZTogT1BUX01PREVfSElTVE9SWSxcblx0XHRcdHJvb3Q6ICcvJ1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aXNJbml0aWFsaXplZCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2luaXRpYWxpemVkJyk7XG5cdH1cblxuXHRzZXRJbml0aWFsaXplZCh2YWwgPSB0cnVlKXtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdpbml0aWFsaXplZCcsIHZhbCk7XG5cdH1cblxuXHRnZXRGcmFnbWVudCgpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSAnJztcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdtb2RlJykgPT09IE9QVF9NT0RFX0hJU1RPUlkpIHtcblx0XHRcdGlmICghbG9jYXRpb24pIHJldHVybiAnJztcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoKSk7XG5cdFx0XHRmcmFnbWVudCA9IGZyYWdtZW50LnJlcGxhY2UoL1xcPyguKikkLywgJycpO1xuXHRcdFx0ZnJhZ21lbnQgPSB0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSAhPSAnLycgPyBmcmFnbWVudC5yZXBsYWNlKHRoaXMuZ2V0V29ya2luZygncm9vdCcpLCAnJykgOiBmcmFnbWVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCF3aW5kb3cpIHJldHVybiAnJztcblx0XHRcdHZhciBtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdGZyYWdtZW50ID0gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jbGVhclNsYXNoZXMoZnJhZ21lbnQpO1xuXHR9XG5cblx0Y2hlY2tMb2NhdGlvbigpe1xuXHRcdGxldCBjdXJyZW50ID10aGlzLmdldFdvcmtpbmcoJ2N1cnJlbnQnKSxcblx0XHRcdGZyYWdtZW50ID10aGlzLmdldEZyYWdtZW50KCksXG5cdFx0XHRpbml0ID0gdGhpcy5pc0luaXRpYWxpemVkKCk7XG5cdFx0aWYgKGN1cnJlbnQgIT09ZnJhZ21lbnQgIHx8ICFpbml0KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLGZyYWdtZW50KTtcblx0XHRcdHRoaXMuY2hlY2soZnJhZ21lbnQpO1xuXHRcdFx0dGhpcy5zZXRJbml0aWFsaXplZCgpO1xuXHRcdH1cblx0fVxuXG5cdGhyZWZDbGljaygpe1xuXHRcdC8vY29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGdldFJvb3QoKXtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRsaXN0ZW4obG9vcEludGVydmFsID0gT1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLCAnbm90SW5pdGlhbGl6ZWQnKTtcblx0XHRjbGVhckludGVydmFsKHRoaXMuZ2V0V29ya2luZygnaW50ZXJ2YWwnKSk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcnZhbCcsIHNldEludGVydmFsKHRoaXMuY2hlY2tMb2NhdGlvbi5iaW5kKHRoaXMpLCBsb29wSW50ZXJ2YWwpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhyZWZDbGljay5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNoZWNrKGYpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSBmIHx8IHRoaXMuZ2V0RnJhZ21lbnQoKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0V29ya2luZygncm91dGVzJykubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBwYXRoID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgKyB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldLnJlO1xuXHRcdFx0bGV0IGZ1bGxSRSA9ICB0aGlzLmNsZWFyU2xhc2hlcyhkZWNvZGVVUkkocGF0aCkpO1xuXHRcdFx0dmFyIG1hdGNoID0gZnJhZ21lbnQubWF0Y2goZnVsbFJFKTtcblx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRtYXRjaC5zaGlmdCgpO1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldLmhhbmRsZXIuYXBwbHkodGhpcy5ob3N0IHx8IHt9LCBtYXRjaCk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG5hdmlnYXRlKHBhdGgpIHtcblx0XHRwYXRoID0gcGF0aCA/IHBhdGggOiAnJztcblx0XHRzd2l0Y2ggKHRoaXMuZ2V0V29ya2luZygnbW9kZScpKXtcblx0XHRcdGNhc2UgT1BUX01PREVfSElTVE9SWToge1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdwdXNoIHN0YXRlJywgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0aGlzLmdldEZ1bGxSb3V0ZShwYXRoKSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBPUFRfTU9ERV9IQVNIOiB7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jKC4qKSQvLCAnJykgKyAnIycgKyBwYXRoO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRGdWxsUm91dGUocGF0aCA9ICcnKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdyb290JykgKyB0aGlzLmNsZWFyU2xhc2hlcyhwYXRoKTtcblx0fVxuXG5cdGdldEFsbExpbmtzKCl7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKCduLWhyZWYnKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHRyZVJvdXRlRXhpc3RlZCgpe1xuXHRcdGxldCBsaXN0ID0gdGhpcy5nZXRBbGxMaW5rcygpO1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCBsaXN0Lmxlbmd0aDsgdCsrKXtcblx0XHRcdHRoaXMuaW5pdFJlcm91dGluZyhsaXN0W3RdLCBsaXN0W3RdLmdldEF0dHJpYnV0ZSgnbi1ocmVmJykpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRSZXJvdXRpbmcoZWwsIGxpbmspe1xuXHRcdGlmICghZWwubm90Um91dGVySW5pdGlhbGl6ZWQpe1xuXHRcdFx0bGV0IGZ1bGxMaW5rID0gdGhpcy5nZXRGdWxsUm91dGUobGluayk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBmdWxsTGluayk7XG5cdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHRoaXMubmF2aWdhdGUobGluayk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0ZWwubm90Um91dGVySW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RSb3V0ZXIoKTtcbiIsImxldCBub3RBUElPcHRpb25zID0ge1xuXHRycHM6IDUwLFxuXHRwcm90b2NvbDogJ2h0dHAnLFxuXHRob3N0OiAnbG9jYWxob3N0Jyxcblx0cG9ydDogOTAwMFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJT3B0aW9ucztcbiIsImNsYXNzIG5vdEFQSVF1ZWV7XG5cdGNvbnN0cnVjdG9yIChyZXF1ZXN0c1BlclNlY29uZCkge1xuXHRcdHRoaXMucXVlZSA9IFtdO1xuXHRcdHRoaXMuaW50ID0gbnVsbDtcblx0XHR0aGlzLnJlcXVlc3RzUGVyU2Vjb25kID0gcmVxdWVzdHNQZXJTZWNvbmQgfHwgNTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bigpe1xuXHRcdHRoaXMuaW50ID0gd2luZG93LnNldEludGVydmFsKHRoaXMuY2hlY2suYmluZCh0aGlzKSwgMTAwMCAvIHRoaXMucmVxdWVzdHNQZXJTZWNvbmQpO1xuXHR9XG5cblx0Y2hlY2soKXtcblx0XHRpZiAodGhpcy5pblByb2dyZXNzKXtyZXR1cm47fVxuXHRcdGVsc2V7XG5cdFx0XHRpZiAodGhpcy5xdWVlLmxlbmd0aCA+IDApe1xuXHRcdFx0XHR0aGlzLmluUHJvZ3Jlc3MgPSB0cnVlO1xuXHRcdFx0XHRsZXQgdG9DYWxsID0gdGhpcy5xdWVlLnNoaWZ0KCk7XG5cdFx0XHRcdHRvQ2FsbCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdG5leHQoKXtcblx0XHR0aGlzLmluUHJvZ3Jlc3MgPSBmYWxzZTtcblx0fVxuXG5cdGFkZChjYWxsKXtcblx0XHR0aGlzLnF1ZWUucHVzaChjYWxsKTtcblx0fVxuXG5cdHBhdXNlKCl7XG5cdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnQpO1xuXHR9XG5cblx0cmVzdW1lKCl7XG5cdFx0dGhpcy5ydW4oKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUElRdWVlO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZS5qcyc7XG5cbmltcG9ydCBub3RBUElPcHRpb25zIGZyb20gJy4vb3B0aW9ucy5qcyc7XG5pbXBvcnQgbm90QVBJUXVlZSBmcm9tICcuL3F1ZWUuanMnO1xuXG5cbmNsYXNzIG5vdEFQSSBleHRlbmRzICBub3RCYXNle1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMobm90Q29tbW9uLmV4dGVuZChub3RBUElPcHRpb25zLCBvcHRpb25zKSk7XG5cdFx0dGhpcy5xdWVlID0gbmV3IG5vdEFQSVF1ZWUodGhpcy5nZXRPcHRpb25zKCdycHMnKSk7XG5cdFx0dGhpcy5xdWVlLnJ1bigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bWFrZVVybChwYXJ0cykge1xuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcvJyk7XG5cdH1cblxuXHRxdWVlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCBtZXRob2QsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0bWFrZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpIHtcblx0XHRub3RDb21tb24ubG9nKCdtYWtpbmcgcmVxdWVzdCcsIG1ldGhvZCwgdXJsLCBpZCk7XG5cdFx0bm90Q29tbW9uLnJlcXVlc3RKU09OKG1ldGhvZCwgdXJsLCBkYXRhKVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3JlcXVlc3Qgc3VjY2Vzc2Z1bGwnLCBtZXRob2QsIHVybCwgaWQsIHJlc3BvbnNlKTtcblx0XHRcdFx0dGhpcy5xdWVlLm5leHQoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVzcG9uc2UgaXMgZ29vZCcpO1xuXHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2UpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoY29kZSwgcmVzcG9uc2UpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdyZXF1ZXN0IGZhaWxlZCcsIG1ldGhvZCwgdXJsLCBpZCwgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXNwb25zZSBpcyBiYWQnKTtcblx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRub3RDb21tb24ubG9nKCd1cGRhdGUnKTtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3Bvc3QnLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5nZXRNb2RlbCgpLnNldFByaWNlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCd1cGRhdGUgZmFpbGVkJyk7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRwdXQob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZV0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdwdXQnLCB1cmwsIG51bGwsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ3B1dHQgZmFpbGVkJyk7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXQob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdnZXQnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdnZXQgZmFpbGVkJyk7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRsaXN0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZV0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdnZXQnLCB1cmwsIG51bGwsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2xpc3QgZmFpbGVkJyk7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZWxldGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdkZWxldGUnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5nZXRNb2RlbCgpLnNldFByaWNlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdkZWxldGUgZmFpbGVkJyk7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRVcGxvYWRVUkwobW9kZWwpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdiYXNlJykgKyB0aGlzLmdldE9wdGlvbnMoJ3VwbG9hZCcpICsgbW9kZWw/bW9kZWwuZ2V0SWQoKTonJztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUEk7XG4iLCJpbXBvcnQgbm90QmFzZSAgZnJvbSAnLi4vbm90QmFzZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbWFnZSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuIiwiY29uc3QgUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYID0gJ24tJyxcblx0VEVNUExBVEVfVEFHID0gJ250Jyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SID0gJy0nLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCA9ICdpZicsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVggPSAnbm90X2NvbXBvbmVudF8nLFxuXHRQQVJUX0lEX1BSRUZJWCA9ICdub3RfcGFydF8nLFxuXHRERUZBVUxUX1BMQUNFUiA9ICdwbGFjZScsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1AgPSAncGxhY2VBZnRlcic7XG5cbmNvbnN0IE9QVFMgPSB7XG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCxcblx0VEVNUExBVEVfVEFHLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLFxuXHRERUZBVUxUX1BMQUNFUixcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCxcblx0UEFSVF9JRF9QUkVGSVgsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1Bcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9QVFM7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5jb25zdCBNRVRBX0NBQ0hFID0gU3ltYm9sKCdjYWNoZScpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZUNhY2hlIGV4dGVuZHMgbm90QmFzZXtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DQUNIRV0gPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0dGhpcy5oaWRlVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5yZWdpc3RlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlkZVRlbXBsYXRlcygpe1xuXHRcdGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHR0LmlubmVySFRNTCA9IE9QVFMuVEVNUExBVEVfVEFHICsgJ3tkaXNwbGF5OiBub25lO30nO1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodCk7XG5cdH1cblxuXHRyZWdpc3RlcigpIHtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ3RlbXBsYXRlQ2FjaGUnLCB0aGlzKTtcblx0fVxuXG5cdGxvYWQobWFwKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdGZvciAodmFyIGkgaW4gbWFwKSB7XG5cdFx0XHR0aGlzLmxvYWRPbmUoaSwgbWFwW2ldKTtcblx0XHR9XG5cdH1cblxuXHRsb2FkT25lKGtleSwgdXJsLCBjYWxsYmFjaykge1xuXHRcdHZhciBvUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdG9SZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XG5cdFx0b1JlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZU5hbWUgPSBrZXk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZVVSTCA9IHVybDtcblx0XHRcdGRpdi5pbm5lckhUTUwgPSByZXNwb25zZS5zcmNFbGVtZW50LnJlc3BvbnNlVGV4dDtcblx0XHRcdHRoaXMuc2V0T25lKGtleSwgZGl2KTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKGtleSwgdXJsLCBkaXYpO1xuXG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRvUmVxdWVzdC5zZW5kKCk7XG5cdH1cblxuXHRpZkFsbExvYWRlZCgpe1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMudHJpZ2dlcignbG9hZGVkJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0T25lKGtleSwgZWxlbWVudCkge1xuXHRcdHRoaXNbTUVUQV9DQUNIRV1ba2V5XSA9IGVsZW1lbnQ7XG5cdH1cblxuXHRnZXQoa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9DQUNIRV0uaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXNbTUVUQV9DQUNIRV1ba2V5XS5jbG9uZU5vZGUodHJ1ZSkgOiBudWxsO1xuXHR9XG5cblx0Z2V0TmFtZXMoKXtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpc1tNRVRBX0NBQ0hFXSk7XG5cdH1cblxuXHRnZXRCeVVSTCh1cmwpIHtcblx0XHRmb3IgKHZhciBpIGluIHRoaXNbTUVUQV9DQUNIRV0pIHtcblx0XHRcdGlmICh0aGlzW01FVEFfQ0FDSEVdW2ldLnNyYyA9PSB1cmwpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0KGkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvL1x0TmV3IEFQSVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldExvYWRlZChrZXkpe1xuXHRcdGxldCB0ID0gdGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuaW5kZXhPZihrZXkpO1xuXHRcdGlmICh0ID4gLTEpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnNwbGljZSh0LCAxKTtcblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkZWQnKS5wdXNoKCdrZXknKTtcblx0fVxuXG5cdHdyYXAoa2V5LCB1cmwsIGlubmVySFRNTCl7XG5cdFx0dmFyIGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHRjb250Lm5hbWUgPSBrZXk7XG5cdFx0Y29udC5zcmMgPSB1cmw7XG5cdFx0Y29udC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG5cdFx0cmV0dXJuIGNvbnQ7XG5cdH1cblxuXHRwYXJzZUxpYih0ZXh0KXtcblx0XHRsZXQgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGxldCByZXN1bHQgPSB7fTtcblx0XHRjb250LmlubmVySFRNTCA9IHRleHQ7XG5cdFx0bGV0IG5vdFRlbXBsYXRlc0VsZW1lbnRzID0gY29udC5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHRmb3IobGV0IGVsSWQgPTA7IGVsSWQ8IG5vdFRlbXBsYXRlc0VsZW1lbnRzLmxlbmd0aDsgZWxJZCsrKXtcblx0XHRcdGxldCBlbCA9IG5vdFRlbXBsYXRlc0VsZW1lbnRzW2VsSWRdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUgPT09IGNvbnQpe1xuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRcdFx0cmVzdWx0W2VsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZV0gPSBlbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0YWRkTGliKGxpYil7XG5cdFx0Zm9yKGxldCB0IGluIGxpYil7XG5cdFx0XHR0aGlzLnNldE9uZSh0LCBsaWJbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21VUkwoa2V5LCB1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG5cdFx0XHRpZiAodGhpcy5nZXQoa2V5KSl7XG5cdFx0XHRcdHJlc29sdmUodGhpcy5nZXQoa2V5KSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly90aGF0LnNldExvYWRpbmcoa2V5LCB1cmwpO1xuXHRcdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpXG5cdFx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlSW5uZXJIVE1MKT0+e1xuXHRcdFx0XHRcdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhpcy53cmFwKGtleSwgdXJsLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0XHRcdFx0XHR0aGlzLnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRcdFx0XHRcdHJlc29sdmUodGhpcy5nZXQoa2V5KSk7XG5cdFx0XHRcdFx0fSkuY2F0Y2goKCk9Pntcblx0XHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZScsIGtleSwgdXJsKTtcblx0XHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YWRkTGliRnJvbVVSTCh1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHQudGhlbigodGVtcGxhdGVzSFRNTCk9Pntcblx0XHRcdFx0XHRsZXQgdGVtcGxhdGVzID0gdGhpcy5wYXJzZUxpYih0ZW1wbGF0ZXNIVE1MKTtcblx0XHRcdFx0XHR0aGlzLmFkZExpYih0ZW1wbGF0ZXMpO1xuXHRcdFx0XHRcdHJlc29sdmUodGVtcGxhdGVzKTtcblx0XHRcdFx0fSkuY2F0Y2goKGUpPT57XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdlcnJvciBsb2FkaW5nIHRlbXBsYXRlcyBsaWInLCB1cmwsZSk7XG5cdFx0XHRcdFx0cmVqZWN0KC4uLmFyZ3VtZW50cyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0YWRkRnJvbURvY3VtZW50KHNlbGVjdG9yT3JFbGVtZW50KXtcblx0XHRsZXQgZWwgPSAodHlwZW9mIHNlbGVjdG9yT3JFbGVtZW50ID09PSAnc3RyaW5nJyk/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yRWxlbWVudCk6c2VsZWN0b3JPckVsZW1lbnQ7XG5cdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0aWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gT1BUUy5URU1QTEFURV9UQUcudG9Mb3dlckNhc2UoKSl7XG5cdFx0XHRcdHRoaXMuc2V0T25lKGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSwgZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21UZXh0KGtleSwgdGVtcGxhdGVJbm5lckhUTUwpe1xuXHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksICcnLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlQ2FjaGUoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQuanMnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZID0gWydfaWQnLCAnaWQnLCAnSUQnXSxcblx0REVGQVVMVF9GSUxURVIgPSB7fSxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEludGVyZmFjZSBleHRlbmRzIG5vdEJhc2Uge1xuXG5cdGNvbnN0cnVjdG9yKG1hbmlmZXN0KSB7XG5cdFx0c3VwZXIoe30pO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHBhcnNlTGluZShsaW5lLCByZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgcmVjb3JkUkUgPSAnOnJlY29yZFsnLFxuXHRcdFx0ZmllbGROYW1lID0gJyc7XG5cdFx0d2hpbGUgKGxpbmUuaW5kZXhPZihyZWNvcmRSRSkgPiAtMSkge1xuXHRcdFx0dmFyIGluZCA9IGxpbmUuaW5kZXhPZihyZWNvcmRSRSk7XG5cdFx0XHR2YXIgbGVuID0gcmVjb3JkUkUubGVuZ3RoO1xuXHRcdFx0dmFyIGluZDIgPSBsaW5lLmluZGV4T2YoJ10nKTtcblx0XHRcdHZhciBzdGFydFNsaWNlID0gaW5kICsgbGVuO1xuXHRcdFx0dmFyIGVuZFNsaWNlID0gaW5kMjtcblx0XHRcdGZpZWxkTmFtZSA9IGxpbmUuc2xpY2Uoc3RhcnRTbGljZSwgZW5kU2xpY2UpO1xuXHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAnJykgYnJlYWs7XG5cdFx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6cmVjb3JkWycgKyBmaWVsZE5hbWUgKyAnXScsIHJlY29yZC5nZXRBdHRyKGZpZWxkTmFtZSkpO1xuXHRcdH1cblx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6bW9kZWxOYW1lJywgdGhpcy5tYW5pZmVzdC5tb2RlbCk7XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOmFjdGlvbk5hbWUnLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgbGluZSA9IHRoaXMucGFyc2VMaW5lKHRoaXMubWFuaWZlc3QudXJsLCByZWNvcmQsIGFjdGlvbk5hbWUpICsgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdwb3N0Rml4JykpID8gdGhpcy5wYXJzZUxpbmUoYWN0aW9uRGF0YS5wb3N0Rml4LCByZWNvcmQsIGFjdGlvbk5hbWUpIDogJycpO1xuXHRcdHJldHVybiBsaW5lO1xuXHR9XG5cblx0Z2V0SUQocmVjb3JkLCBhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlc3VsdElkLFxuXHRcdFx0bGlzdCA9IE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFksXG5cdFx0XHRwcmVmaXhlcyA9IFsnJywgdGhpcy5tYW5pZmVzdC5tb2RlbF07XG5cdFx0aWYgKGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2luZGV4JykgJiYgYWN0aW9uRGF0YS5pbmRleCkge1xuXHRcdFx0bGlzdCA9IFthY3Rpb25EYXRhLmluZGV4XS5jb25jYXQoT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHByZSBvZiBwcmVmaXhlcykge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiBsaXN0KSB7XG5cdFx0XHRcdGlmIChyZWNvcmQuaGFzT3duUHJvcGVydHkocHJlICsgdCkpIHtcblx0XHRcdFx0XHRyZXN1bHRJZCA9IHJlY29yZFtwcmUgKyB0XTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0SWQ7XG5cdH1cblxuXHRnZXRBY3Rpb25zQ291bnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpID8gT2JqZWN0LmtleXModGhpcy5nZXRBY3Rpb25zKCkpLmxlbmd0aCA6IDA7XG5cdH1cblxuXHRnZXRBY3Rpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLm1hbmlmZXN0ICYmIHRoaXMubWFuaWZlc3QuYWN0aW9ucyA/IHRoaXMubWFuaWZlc3QuYWN0aW9ucyA6IHt9O1xuXHR9XG5cblx0c2V0RmluZEJ5KGtleSwgdmFsdWUpIHtcblx0XHR2YXIgb2JqID0ge307XG5cdFx0b2JqW2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIob2JqKTtcblx0fVxuXG5cdHNldEZpbHRlcihmaWx0ZXJEYXRhID0gREVGQVVMVF9GSUxURVIpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdmaWx0ZXInLCBmaWx0ZXJEYXRhKTtcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnNldEZpbHRlcih7fSk7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyJyk7XG5cdH1cblxuXHRzZXRTb3J0ZXIoc29ydGVyRGF0YSkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3NvcnRlcicsIHNvcnRlckRhdGEpO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3NvcnRlcicpO1xuXHR9XG5cblx0c2V0UGFnZU51bWJlcihwYWdlTnVtYmVyKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHR9XG5cblx0c2V0UGFnZVNpemUocGFnZVNpemUpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdwYWdlU2l6ZScsIHBhZ2VTaXplKTtcblx0fVxuXG5cdHNldFBhZ2VyKHBhZ2VTaXplID0gREVGQVVMVF9QQUdFX1NJWkUsIHBhZ2VOdW1iZXIgPSBERUZBVUxUX1BBR0VfTlVNQkVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSkuc2V0V29ya2luZygncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRQYWdlcigpO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHBhZ2VTaXplOiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VTaXplJyksXG5cdFx0XHRwYWdlTnVtYmVyOiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VOdW1iZXInKVxuXHRcdH07XG5cdH1cblxuXHRnZXRNb2RlbE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMgJiYgdGhpcy5tYW5pZmVzdCA/IHRoaXMubWFuaWZlc3QubW9kZWwgOiBudWxsO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpICYmIHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdID8gdGhpcy5nZXRBY3Rpb25zKClbYWN0aW9uTmFtZV0gOiBudWxsO1xuXHR9XG5cblx0Y29sbGVjdFJlcXVlc3REYXRhKGFjdGlvbkRhdGEpIHtcblx0XHRsZXQgcmVxdWVzdERhdGEgPSB7fTtcblx0XHRpZiAoKGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkgJiYgQXJyYXkuaXNBcnJheShhY3Rpb25EYXRhLmRhdGEpKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFjdGlvbkRhdGEuZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgZGF0YVByb3ZpZGVyTmFtZSA9ICdnZXQnICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihhY3Rpb25EYXRhLmRhdGFbaV0pO1xuXHRcdFx0XHRpZiAodGhpc1tkYXRhUHJvdmlkZXJOYW1lXSAmJiB0eXBlb2YgdGhpc1tkYXRhUHJvdmlkZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdHJlcXVlc3REYXRhID0gbm90Q29tbW9uLmV4dGVuZChyZXF1ZXN0RGF0YSwgdGhpc1tkYXRhUHJvdmlkZXJOYW1lXSgpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVxdWVzdERhdGE7XG5cdH1cblxuXHRlbmNvZGVSZXF1ZXN0KGRhdGEpe1xuXHRcdGxldCBwID0gJz8nO1xuXHRcdGZvcihsZXQgdCBpbiBkYXRhKXtcblx0XHRcdHAgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHQpKyc9JytlbmNvZGVVUklDb21wb25lbnQoZGF0YVt0XSkrJyYnO1xuXHRcdH1cblx0XHRyZXR1cm4gcDtcblx0fVxuXG5cdC8vcmV0dXJuIFByb21pc2Vcblx0cmVxdWVzdChyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdHJlcXVlc3RQYXJhbXMgPSB0aGlzLmNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSxcblx0XHRcdHJlcXVlc3RQYXJhbXNFbmNvZGVkID0gdGhpcy5lbmNvZGVSZXF1ZXN0KHJlcXVlc3RQYXJhbXMpLFxuXHRcdFx0aWQgPSB0aGlzLmdldElEKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSksXG5cdFx0XHR1cmwgPSB0aGlzLmdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpO1xuXHRcdHJldHVybiBub3RDb21tb24uZ2V0QVBJKCkucXVlZVJlcXVlc3QoYWN0aW9uRGF0YS5tZXRob2QsIHVybCArIHJlcXVlc3RQYXJhbXNFbmNvZGVkLCBpZCwgSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSkpXG5cdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hZnRlclN1Y2Nlc3NSZXF1ZXN0KGRhdGEsIGFjdGlvbkRhdGEpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24ucmVwb3J0KGUpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRhZnRlclN1Y2Nlc3NSZXF1ZXN0KGRhdGEsIGFjdGlvbkRhdGEpIHtcblx0XHRpZiAodGhpcyAmJiBhY3Rpb25EYXRhICYmIGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiBhY3Rpb25EYXRhLmlzQXJyYXkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgZGF0YS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7XG5cbmNvbnN0IE1FVEFfSU5URVJGQUNFID0gU3ltYm9sKCdpbnRlcmZhY2UnKSxcblx0TUVUQV9QUk9YWSA9IFN5bWJvbCgncHJveHknKSxcblx0TUVUQV9DSEFOR0UgPSBTeW1ib2woJ2NoYW5nZScpLFxuXHRNRVRBX0NIQU5HRV9ORVNURUQgPSBTeW1ib2woJ2NoYW5nZS5uZXN0ZWQnKSxcblx0TUVUQV9TQUwgPSBbXG5cdFx0J2dldEF0dHInLFxuXHRcdCdnZXRBdHRycycsXG5cdFx0J2lzUHJvcGVydHknLFxuXHRcdCdpc1JlY29yZCcsXG5cdFx0J2dldE1hbmlmZXN0Jyxcblx0XHQnc2V0QXR0cicsXG5cdFx0J3NldEF0dHJzJyxcblx0XHQnZ2V0RGF0YScsXG5cdFx0J3NldERhdGEnLFxuXHRcdCdnZXRKU09OJyxcblx0XHQnb24nLFxuXHRcdCdvZmYnLFxuXHRcdCd0cmlnZ2VyJ1xuXHRdLFxuXHRNRVRBX01BUF9UT19JTlRFUkZBQ0UgPSBbXG5cdFx0J2dldEFjdGlvbnNDb3VudCcsXG5cdFx0J2dldEFjdGlvbnMnLFxuXHRcdCdzZXRGaW5kQnknLFxuXHRcdCdyZXNldEZpbHRlcicsXG5cdFx0J3NldEZpbHRlcicsXG5cdFx0J2dldEZpbHRlcicsXG5cdFx0J3NldFNvcnRlcicsXG5cdFx0J2dldFNvcnRlcicsXG5cdFx0J3Jlc2V0U29ydGVyJyxcblx0XHQnc2V0UGFnZU51bWJlcicsXG5cdFx0J3NldFBhZ2VTaXplJyxcblx0XHQnc2V0UGFnZXInLFxuXHRcdCdyZXNldFBhZ2VyJyxcblx0XHQnZ2V0UGFnZXInXG5cdF0sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0TUVUQV9SRVRVUk5fVE9fUk9PVCA9IFN5bWJvbCgncmV0dXJuVG9Sb290Jyk7XG5cbnZhciBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0eXBlb2YgdGFyZ2V0W2tleV0pO1xuXG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RQcm9wZXJ0eSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihnZXRSb290LCBwYXRoVG8sIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUHJveHkgfHwgaXRlbS5pc1Byb3BlcnR5KSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRnZXRSb290OiBnZXRSb290LFxuXHRcdFx0cGF0aDogcGF0aFRvXG5cdFx0fSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzKHRoaXMpKTtcblx0XHR0aGlzLnNldERhdGEoaXRlbSk7XG5cdFx0dGhpcy5pc1Byb3BlcnR5ID0gdHJ1ZTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfUkVUVVJOX1RPX1JPT1RdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0W01FVEFfUkVUVVJOX1RPX1JPT1RdKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0bGV0IHJvb3QgPSB0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSgpO1xuXHRcdHJvb3QudHJpZ2dlcignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9QUk9YWV0sIHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXksIHZhbHVlKTtcblx0fVxufVxuXG5cbnZhciBjcmVhdGVSZWNvcmRIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScgfHwga2V5ID09PSAnaXNSZWNvcmQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykge1xuXHRcdFx0XHRpZiAodGhpc1trZXldKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfTUFQX1RPX0lOVEVSRkFDRS5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RSZWNvcmQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QsIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIGl0ZW0uaXNQcm94eSkge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCd0aGlzIGlzIFByb3h5IGl0ZW0nKTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUmVjb3JkIHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRPcHRpb25zKHt9KTtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXSA9IG5ldyBub3RSZWNvcmRJbnRlcmZhY2UobWFuaWZlc3QpO1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzLmludGVyZmFjZVVwKCk7XG5cdFx0dGhpcy5pc1JlY29yZCA9IHRydWU7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSByZWNvcmQgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRpbml0UHJvcGVydGllcyhpdGVtLCBwYXRoID0gJycpIHtcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoaXRlbSk7XG5cdFx0XHRmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuXHRcdFx0XHRsZXQgY3VyUGF0aCA9IHBhdGggKyAocGF0aC5sZW5ndGggPiAwID8gJy4nIDogJycpICsga2V5O1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2N1clBhdGgnLCBjdXJQYXRoKTtcblx0XHRcdFx0aWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbVtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0dGhpcy5pbml0UHJvcGVydGllcyhpdGVtW2tleV0sIGN1clBhdGgpO1xuXHRcdFx0XHRcdFx0aXRlbVtrZXldID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0Um9vdC5iaW5kKHRoaXMpLCBjdXJQYXRoLCBpdGVtW2tleV0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgb3duIHByb3BlcnR5LCBidXQgbm90IG9iamVjdCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgbm90IG93biBwcm9wZXJ0eScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpdGVtO1xuXHR9XG5cblx0Z2V0Um9vdCgpIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW1zKSB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSBbXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb2xsZWN0aW9uLnB1c2gobmV3IG5vdFJlY29yZChtYW5pZmVzdCwgaXRlbXNbaV0pKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb247XG5cdH1cblxuXHRpbnRlcmZhY2VVcCgpIHtcblx0XHRpZiAodGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9uc0NvdW50KCkgPiAwKSB7XG5cdFx0XHRsZXQgYWN0aW9ucyA9IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEFjdGlvbnMoKTtcblx0XHRcdGZvciAobGV0IGkgaW4gYWN0aW9ucykge1xuXHRcdFx0XHR0aGlzLmFjdGlvblVwKGksIGFjdGlvbnNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cblxuXHRhY3Rpb25VcChpbmRleCkge1xuXHRcdGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdKSkge1xuXHRcdFx0dGhpc1tERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0gPSAoKSA9PiB0aGlzW01FVEFfSU5URVJGQUNFXS5yZXF1ZXN0KHRoaXMsIGluZGV4KTtcblx0XHRcdC8vbm90Q29tbW9uLmxvZygnZGVmaW5lJywgREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXgpO1xuXHRcdH1cblx0fVxuXHQvKlxuXHQtPiAncGF0aC50by5rZXknLCB2YWx1ZU9mS2V5XG5cdDwtIG9rLCB3aXRoIG9uZSBvbkNoYW5nZSBldmVudCB0cmlnZ2VyZWRcblx0Ki9cblxuXHRzZXRBdHRyKGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gbm90UGF0aC5zZXQoa2V5LCB0aGlzW01FVEFfUFJPWFldLCB7fSwgdmFsdWUpO1xuXHR9XG5cblx0Lypcblx0LT5cblx0e1xuXHRcdCdrZXlQYXRoJzogdmFsdWUsXG5cdFx0J2tleS5zdWJQYXRoJzogdmFsdWUyLFxuXHRcdCdrZXlQYXRoLjAudGl0bGUnOiB2YWx1ZTNcblx0fVxuXHQ8LSBvaywgd2l0aCBidW5jaCBvZiBvbkNoYW5nZSBldmVudHMgdHJpZ2dlcmVkXG5cdCovXG5cdHNldEF0dHJzKG9iamVjdFBhcnQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzJywgb2JqZWN0UGFydCwgT2JqZWN0LmtleXMob2JqZWN0UGFydCkpO1xuXHRcdGlmIChvYmplY3RQYXJ0ICYmICh0eXBlb2Ygb2JqZWN0UGFydCA9PT0gJ29iamVjdCcpICYmIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpLmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggaW4gb2JqZWN0UGFydCkge1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzIG9uZSB0byBnbycsIHBhdGgpO1xuXHRcdFx0XHR0aGlzLnNldEF0dHIocGF0aCwgb2JqZWN0UGFydFtwYXRoXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0LT4gJ3BhdGhUb0tleSdcblx0PC0gdmFsdWUxXG5cblx0Ki9cblx0Z2V0QXR0cih3aGF0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdnZXRBdHRyJywgd2hhdCk7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHdoYXQsIHRoaXNbTUVUQV9QUk9YWV0sIHt9KTtcblx0fVxuXG5cdC8qXG5cdC0+IFsncGF0aFRvS2V5JywgJ3BhdGgudG8ua2V5JywgJ3NpbXBsZUtleScsLi4uXVxuXHQ8LSBbdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMywuLi5dXG5cdCovXG5cdGdldEF0dHJzKHdoYXQpIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0aWYgKHdoYXQgJiYgd2hhdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIG9mIHdoYXQpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5nZXRBdHRyKHBhdGgpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXSkge1xuXHRcdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLm1hbmlmZXN0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRzZXRGaW5kQnkoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmluZEJ5KC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFNvcnRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0U29ydGVyKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRQYWdlTnVtYmVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VOdW1iZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VTaXplKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VTaXplKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGdldE1vZGVsTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0TW9kZWxOYW1lKC4uLmFyZ3VtZW50cyk7XHRcdFxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVjb3JkO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuL25vdFJvdXRlcic7XG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcblxuY29uc3QgT1BUX0NPTlRST0xMRVJfUFJFRklYID0gJ25jJyxcblx0T1BUX1JFQ09SRF9QUkVGSVggPSAnbnInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RBcHAgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKHtvcHRpb25zfSk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgYXBwJyk7XG5cdFx0bm90Q29tbW9uLnJlZ2lzdGVyKCdhcHAnLCB0aGlzKTtcblx0XHR0aGlzLnJlc291cmNlcyA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRpbnRlcmZhY2VzOiB7fSxcblx0XHRcdGNvbnRyb2xsZXJzOiB7fSxcblx0XHRcdGluaXRDb250cm9sbGVyOiBudWxsLFxuXHRcdFx0Y3VycmVudENvbnRyb2xsZXI6IG51bGxcblx0XHR9KTtcblx0XHR0aGlzLnByZUluaXRSb3V0ZXIoKTtcblx0XHR0aGlzLmluaXRNYW5hZ2VyKCk7XG5cdFx0dGhpcy5pbml0QVBJKCk7XG5cdFx0dGhpcy5pbml0VGVtcGxhdGVzKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0TWFuYWdlcigpe1xuXHRcdG5vdENvbW1vbi5zZXRNYW5hZ2VyKFxuXHRcdFx0e1xuXHRcdFx0XHRzZXRBUEkodil7IHRoaXMuYXBpID0gdjt9LFxuXHRcdFx0XHRnZXRBUEkoKXtyZXR1cm4gdGhpcy5hcGk7fSxcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0aW5pdEFQSSgpe1xuXHRcdG5vdENvbW1vbi5nZXRNYW5hZ2VyKCkuc2V0QVBJKG5ldyBub3RBUEkoe30pKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZXMoKXtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRsZXQgcHJvbSA9IG51bGw7XG5cdFx0XHRmb3IobGV0IHQgaW4gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRcdGlmICh0ICYmIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdGxldCB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpW3RdO1xuXHRcdFx0XHRcdGlmKHByb20pe1xuXHRcdFx0XHRcdFx0cHJvbS50aGVuKG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTC5iaW5kKG5vdFRlbXBsYXRlQ2FjaGUsIHVybCkpO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cHJvbSA9IG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTCh1cmwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHByb20pe1xuXHRcdFx0XHRwcm9tLnRoZW4odGhpcy5pbml0TWFuaWZlc3QuYmluZCh0aGlzKSlcblx0XHRcdFx0XHQuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoJ25vIHRlbXBsYXRlcyBsaWInLCBlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5pbml0TWFuaWZlc3QoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFuaWZlc3QoKSB7XG5cdFx0dmFyIHVybCA9IHRoaXMuZ2V0T3B0aW9ucygnbWFuaWZlc3RVUkwnKTtcblx0XHRub3RDb21tb24uZ2V0SlNPTih1cmwsIHt9KVxuXHRcdFx0LnRoZW4odGhpcy5zZXRJbnRlcmZhY2VNYW5pZmVzdC5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRwcmVJbml0Um91dGVyKCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb3V0ZXInLCBub3RSb3V0ZXIpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuc2V0Um9vdCh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5yb290JykpO1xuXHRcdG5vdFJvdXRlci5yZVJvdXRlRXhpc3RlZCgpO1xuXHR9XG5cblx0aW5pdFJvdXRlcigpe1xuXHRcdHZhciByb3V0aWVJbnB1dCA9IHt9O1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5tYW5pZmVzdCcpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGxldCByb3V0ZUJsb2NrID0gdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKVt0XSxcblx0XHRcdFx0cGF0aHMgPSByb3V0ZUJsb2NrLnBhdGhzLFxuXHRcdFx0XHRjb250cm9sbGVyID0gcm91dGVCbG9jay5jb250cm9sbGVyO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0cm91dGllSW5wdXRbcGF0aHNbaV1dID0gdGhpcy5iaW5kQ29udHJvbGxlcihjb250cm9sbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXInKS5hZGRMaXN0KHJvdXRpZUlucHV0KS5saXN0ZW4oKTsvLy5uYXZpZ2F0ZSh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5pbmRleCcpKTtcblx0fVxuXG5cdHNldEludGVyZmFjZU1hbmlmZXN0KG1hbmlmZXN0KSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcsIG1hbmlmZXN0KTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlTWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHQvL9C90YPQttC90L4g0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNGC0Yxcblx0XHQvL9C80L7QtNC10LvQuCDQv9C+0LvRg9GH0LXQvdC90YvQvNC4INC40L3RgtC10YDRhNC10LnRgdCw0LzQuFxuXHRcdHRoaXMudXBkYXRlSW50ZXJmYWNlcygpO1xuXHRcdC8v0LjQvdC40YbQuNC70LjRhtC40YDQvtCy0LDRgtGMINC4INC30LDQv9GD0YHRgtC40YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHRcdHRoaXMuaW5pdENvbnRyb2xsZXIoKTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhcnRBcHAoKSB7XG5cdFx0Ly/RgdC+0LfQtNCw0YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0Ly/RgNC+0YPRgtC10YAg0Lgg0L/RgNC40LLRj9C30LDRgtGMINC6INC90LXQvNGDINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHR0aGlzLmluaXRSb3V0ZXIoKTtcblx0fVxuXG5cdGJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0bGV0IGFwcCA9IHRoaXM7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRuZXcgY29udHJvbGxlck5hbWUoYXBwLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdH1cblxuXHRpbml0Q29udHJvbGxlcigpIHtcblx0XHRpZiAodHlwZW9mKHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRsZXQgaW5pdENvbnRyb2xsZXIgPSB0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJyk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJywgbmV3IGluaXRDb250cm9sbGVyKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50Q29udHJvbGxlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicpO1xuXHR9XG5cblx0c2V0Q3VycmVudENvbnRyb2xsZXIoY3RybCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInLCBjdHJsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHVwZGF0ZUludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5jbGVhckludGVyZmFjZXMoKTtcblx0XHRsZXQgbWFuaWZlc3RzID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHRcdGlmIChtYW5pZmVzdHMpIHtcblx0XHRcdGZvcihsZXQgbmFtZSBpbiBtYW5pZmVzdHMpe1xuXHRcdFx0XHRsZXQgcmVjb3JkTWFuaWZlc3QgPSBtYW5pZmVzdHNbbmFtZV07XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdID0gKHJlY29yZERhdGEpID0+IG5ldyBub3RSZWNvcmQocmVjb3JkTWFuaWZlc3QsIHJlY29yZERhdGEpO1xuXHRcdFx0XHR3aW5kb3dbJ25yJyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSldID0gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbbmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0UmVjb3JkTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9SRUNPUkRfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldENvbnRyb2xsZXJOYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX0NPTlRST0xMRVJfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldEludGVyZmFjZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpO1xuXHR9XG5cblx0Y2xlYXJJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJmYWNlcycsIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHdhaXRUaGlzUmVzb3VyY2UodHlwZSwgaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMucmVzb3VyY2VzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG5cdFx0XHR0aGlzLnJlc291cmNlc1t0eXBlXSA9IHt9O1xuXHRcdH1cblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSBmYWxzZTtcblx0XHRyZXR1cm4gdGhpcy5vblJlc291cmNlUmVhZHkuYmluZCh0aGlzLCB0eXBlLCBpbmRleCk7XG5cdH1cblxuXHRvblJlc291cmNlUmVhZHkodHlwZSwgaW5kZXgpIHtcblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSB0cnVlO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRhbGxSZXNvdXJjZXNSZWFkeSgpIHtcblx0XHR2YXIgaSwgajtcblx0XHRmb3IgKGkgaW4gdGhpcy5yZXNvdXJjZXMpIHtcblx0XHRcdGZvciAoaiBpbiB0aGlzLnJlc291cmNlc1tpXSkge1xuXHRcdFx0XHRpZiAoIXRoaXMucmVzb3VyY2VzW2ldW2pdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuXG5jb25zdCBNRVRBX1BST0NFU1NPUlMgPSBTeW1ib2woJ3Byb2Nlc3NvcnMnKTtcblxuY2xhc3Mgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UHJvY2Vzc29yKC8qIGtleSwgdmFsdWUgKi8pe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFByb2Nlc3NvcigvKiBrZXksICBkZWZhdWx0VmFsdWUgKi8pe1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhclByb2Nlc3NvcnMoKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZCgpe1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcblx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHR9ZWxzZXtcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKXtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGFyZ3VtZW50c1swXSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IodCwgYXJndW1lbnRzWzBdW3RdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFByb2Nlc3NvciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXIoKXtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlUHJvY2Vzc29ycygpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnO1xuXG4vKlxuICog0JjRgdC/0L7Qu9GM0LfRg9C10YIgRE9NINC/0L7QtNC00LXRgNC10LLQviDQsiDQutCw0YfQtdGB0YLQstC1INGI0LDQsdC70L7QvdCwLlxuICog0JfQsNC/0L7Qu9C90Y/QtdGCINC10LPQviDQtNCw0L3QvdGL0LzQuC5cbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0LPQtdC90LXRgNC40YDQvtCy0LDQvdC90YvQtSDRjdC70LXQvNC10L3RgtGLXG4gKlxuICogKi9cblxuLypcblxuXHQ8ZGl2IG4tdGVtcGxhdGUtbmFtZT1cInZhc3lhXCI+XG5cdFx0PHA+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbi12YWx1ZT1cIjpjb29sTmFtZVwiLz48L3A+XG5cdFx0PHA+0JHQvtGA0LjRgSDRhdGA0LXQvSDQv9C+0L/QsNC00LXRiNGMINC4IHt7OmNvb2xOYW1lfX0uPC9wPlxuXHQ8L2Rpdj5cblxuICovXG5cbmNvbnN0IE1FVEFfQ09NUE9ORU5UUyA9IFN5bWJvbCgnY29tcG9uZW50cycpO1xuXG5jbGFzcyBub3RSZW5kZXJlciBleHRlbmRzIG5vdEJhc2Uge1xuXHQvKlxuXHRcdGlucHV0ID0ge1xuXHRcdFx0ZGF0YTogbm90UmVjb3JkLFxuXHRcdFx0dGVtcGxhdGU6IGVsZW1lbnRcblx0XHRcdG9wdGlvbnM6e1xuXHRcdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0fVxuXHRcdH1cblx0Ki9cblxuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdID0ge307XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLmNvbXBvbmVudCA9IGlucHV0LmNvbXBvbmVudDtcblx0XHR0aGlzLmluaXREYXRhKGlucHV0LmRhdGEgPyBpbnB1dC5kYXRhIDoge30pO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dC50ZW1wbGF0ZSk7XG5cdFx0dGhpcy5pbml0VGVtcGxhdGUoKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3RlbXBsYXRlJywgdGhpcy5nZXRXb3JraW5nKCdnZXRUZW1wbGF0ZScpKCkpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLmdldERhdGEoKS5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0fVxuXG5cdGluaXRXb3JraW5nKHRlbXBsYXRlKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGdldFRlbXBsYXRlOiB0ZW1wbGF0ZSxcblx0XHRcdHBhcnRJZDogdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA/IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgOiBPUFRTLlBBUlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHR9KTtcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCkge1xuXHRcdGlmICh0aGlzLmNvbXBvbmVudCkge1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLmNvbXBvbmVudC5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9XG5cdH1cblxuXHRvbkNoYW5nZShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdC8qbm90Q29tbW9uLmxvZyh0aGlzKTtcblx0XHRub3RDb21tb24ubG9nKHRoaXMuZ2V0QnJlYWRDcnVtcHMoKS5qb2luKCcgPiAnKSk7XG5cdFx0bm90Q29tbW9uLmxvZygndXBkYXRpbmcgcmVuZGVyZXIgJywgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKSwgJyBhZnRlciBjaGFuZ2VzJywga2V5LCB2YWx1ZSk7Ki9cblx0XHR0aGlzLnVwZGF0ZShrZXkpO1xuXHRcdHRoaXMudHJpZ2dlcignb2Jzb2xldGUnLHByb3h5LCBrZXksIHZhbHVlKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyU3Rhc2goKTtcblx0XHR0aGlzLnNldFdvcmtpbmdNYXBwaW5nKCk7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0dGhpcy5zZWFyY2hGb3JTdWJUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnN0YXNoUmVuZGVyZWQoKTtcblx0fVxuXG5cdHVwZGF0ZShrZXkpIHtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHRmb3IgKGxldCB0IGluIHRoaXNbTUVUQV9DT01QT05FTlRTXSkge1xuXHRcdFx0bGV0IGl0ZW0gPSB0aGlzW01FVEFfQ09NUE9ORU5UU11bdF0sXG5cdFx0XHRcdGlmUGFydCA9IHRydWU7XG5cdFx0XHRpZiAoa2V5KXtcblx0XHRcdFx0aWYgKGl0ZW0uZ2V0T3B0aW9ucygnZGF0YVBhdGgnKT09PW51bGwpe1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldFx0Y29tcG9uZW50UGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJykpLFxuXHRcdFx0XHRcdGNoYW5nZWRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGtleSk7XG5cdFx0XHRcdGlmUGFydCA9IG5vdFBhdGguaWZGdWxsU3ViUGF0aChjaGFuZ2VkUGF0aCwgY29tcG9uZW50UGF0aCk7XG5cdFx0XHRcdC8qbm90Q29tbW9uLmxvZyhpdGVtLmdldE9wdGlvbnMoJ25hbWUnKSwgJyA+LTwgJywgaXRlbS5nZXRPcHRpb25zKCdpZCcpLCAnID4tPCAnLCBjb21wb25lbnRQYXRoLCBjaGFuZ2VkUGF0aCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3dpbGwgYmUgdXBkYXRlZCcsIGlmUGFydCk7Ki9cblx0XHRcdH1cblxuXHRcdFx0aWYgKGlmUGFydCkge1xuXHRcdFx0XHRpdGVtLnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldFdvcmtpbmdNYXBwaW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbWFwcGluZycsIHRoaXMuY3JlYXRlTWFwcGluZygpKTtcblx0fVxuXG5cdC8qXG5cblx00KHQvtC30LTQsNC10Lwg0LrQsNGA0YLRiyDRgdC+0L7RgtCy0LXRgdGC0LLQuNGPINC/0YDQvtGG0LXRgdGB0L7RgNC+0LIsINC/0YPRgtC10Lkg0LTQsNC90L3Ri9GFINCyINC+0LHRitC10LrRgtC1INC4INGN0LvQtdC80LXQvdGC0L7QsiDRiNCw0LHQu9C+0L3QsC5cblx0W3tcblx0XHRlbCxcblx0XHRwcm9jZXNzb3IsXG5cdFx0d29ya2luZyxcblx0XHRpdGVtLnByb3BlcnR5LnBhdGhcblx0fV1cblxuXHQqL1xuXG5cdGNyZWF0ZU1hcHBpbmcoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZmluZEFsbFByb2Nlc3NvcnMoKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZmluZEFsbFByb2Nlc3NvcnMoKSB7XG5cdFx0bGV0IHByb2NzID0gW10sXG5cdFx0XHRlbHMgPSBub3RDb21tb24uZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgodGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGVscy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGF0dHMgPSBlbHNbal0uYXR0cmlidXRlcywgbiA9IGF0dHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRzW2ldLm5vZGVOYW1lLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpID09PSAwKSB7XG5cdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGF0dHNbaV0pO1xuXHRcdFx0XHRcdGxldCBwcm9jRGF0YSA9IHRoaXMucGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKGF0dHNbaV0ubm9kZU5hbWUpO1xuXHRcdFx0XHRcdHByb2NEYXRhLmVsZW1lbnQgPSBlbHNbal07XG5cdFx0XHRcdFx0cHJvY0RhdGEucHJvY2Vzc29yRXhwcmVzc2lvbiA9IGF0dHNbaV0ubm9kZU5hbWU7XG5cdFx0XHRcdFx0cHJvY0RhdGEuYXR0cmlidXRlRXhwcmVzc2lvbiA9IGF0dHNbaV0udmFsdWU7XG5cdFx0XHRcdFx0cHJvY3MucHVzaChwcm9jRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHByb2NzO1xuXHR9XG5cblx0cGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKHByb2Nlc3NvckV4cHJlc3Npb24pIHtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0cGFyYW1zOiBbXSxcblx0XHRcdHByb2Nlc3Nvck5hbWU6ICcnLFxuXHRcdFx0aWZDb25kaXRpb246IGZhbHNlXG5cdFx0fTtcblx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLCAnJyk7XG5cdFx0aWYgKHByb2Nlc3NvckV4cHJlc3Npb24uaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYKSA9PT0gKHByb2Nlc3NvckV4cHJlc3Npb24ubGVuZ3RoIC0gT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWC5sZW5ndGgpKSB7XG5cdFx0XHRyZXN1bHQuaWZDb25kaXRpb24gPSB0cnVlO1xuXHRcdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiArIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsICcnKTtcblx0XHR9XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHByb2Nlc3NvckV4cHJlc3Npb24uc3BsaXQoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IpO1xuXHRcdHJlc3VsdC5wcm9jZXNzb3JOYW1lID0gcmVzdWx0LnBhcmFtc1swXTtcblx0XHRyZXN1bHQucGFyYW1zID0gcmVzdWx0LnBhcmFtcy5zbGljZSgxKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZXhlY1Byb2Nlc3NvcnMoaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbWFwcGluZyA9IHRoaXMuZ2V0V29ya2luZygnbWFwcGluZycpO1xuXHRcdGlmIChtYXBwaW5nKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBpbmcubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IHByb2NTY29wZSA9IG1hcHBpbmdbaV07XG5cdFx0XHRcdHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocHJvY1Njb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGluZGV4KTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdhdHRyaWJ1dGVSZXN1bHQnLCBwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0XHRcdFx0bGV0IHByb2NOYW1lID0gcHJvY1Njb3BlLnByb2Nlc3Nvck5hbWUsXG5cdFx0XHRcdFx0cHJvYyA9IG5vdFRlbXBsYXRlUHJvY2Vzc29ycy5nZXQocHJvY05hbWUpO1xuXHRcdFx0XHRpZiAocHJvYykge1xuXHRcdFx0XHRcdHByb2MocHJvY1Njb3BlLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHRcdFx0XHRcdHByb2NTY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9jU2NvcGUucHJvY2Vzc29yRXhwcmVzc2lvbik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyBwcm9jZXNzb3IgbGlrZScsIHByb2NOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ3JlbmRlcmVkJyk7XG5cdH1cblxuXHRnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHBhdGgsIGl0ZW0pIHtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQocGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0fVxuXG5cdGNsZWFyU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuZGVzdHJveVN1YnMoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N1YnMnLCBbXSk7XG5cdH1cblxuXHRkZXN0cm95U3VicygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdFx0dC5kZXN0cm95KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0U3Rhc2goKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRsZXQgZWwgPSB0aGlzLmdldFN0YXNoKClbdF07XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSl7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmU3ViRWxlbWVudFJlbmRlcmVkKG50RWwpIHtcblx0XHRyZXR1cm4gbnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQgJiYgKG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkLnZhbHVlID09PSAndHJ1ZScpO1xuXHR9XG5cblx0c2VhcmNoRm9yU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRsZXQgc3VicyA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3JBbGwoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc3ViIHRlbXBsYXRlcycsIHN1YnMpO1xuXHRcdGZvciAobGV0IG50ID0gMDsgbnQgPCBzdWJzLmxlbmd0aDsgbnQrKykge1xuXHRcdFx0aWYgKCF0aGlzLmlmU3ViRWxlbWVudFJlbmRlcmVkKHN1YnNbbnRdKSkge1xuXHRcdFx0XHR0aGlzLnJlbmRlclN1YihzdWJzW250XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWRkU3ViKG50RWwpIHtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKS5wdXNoKHtcblx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0cGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6ICcnLFxuXHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUuc3JjIDogJycsXG5cdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHRcdHJlbmRlcmVkTGlzdDogW10sXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJTdWIobnRFbCkge1xuXHRcdGlmICghbnRFbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRsZXQgZGV0YWlscyA9IHtcblx0XHRcdFx0ZGF0YVBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiBudWxsLFxuXHRcdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5zcmMudmFsdWUgOiAnJyxcblx0XHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKClcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHRkYXRhOiBkZXRhaWxzLmRhdGFQYXRoIT09IG51bGw/IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChkZXRhaWxzLmRhdGFQYXRoLCB0aGlzLmdldERhdGEoKSk6bnVsbCxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0c3JjOiBkZXRhaWxzLnNyY1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pLFxuXHRcdFx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUFmdGVyJyxcblx0XHRcdFx0XHRpZDogZGV0YWlscy5pZCxcblx0XHRcdFx0XHRudEVsOiBudEVsLFxuXHRcdFx0XHRcdGRhdGFQYXRoOiBkZXRhaWxzLmRhdGFQYXRoXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG93bmVyOiB0aGlzXG5cdFx0XHR9O1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdpZCcsIGRldGFpbHMuaWQpO1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXVtkZXRhaWxzLmlkXSA9IG5ldyBub3RDb21wb25lbnQob3B0aW9ucyk7XG5cdH1cblxuXHRjbGVhclN0YXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBbXSk7XG5cdH1cblxuXHRnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3RlbXBsYXRlJyk7XG5cdH1cblxuXHRnZXRTdGFzaCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzdGFzaCcpO1xuXHR9XG5cblx0c3Rhc2hSZW5kZXJlZCgpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCk7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0dGhpcy5hZGRUb1N0YXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdH1cblxuXHRyZXBsYWNlUmVuZGVyZWQoKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdyZXBsYWNlIHN0YXNoJyk7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLFxuXHRcdFx0c3Rhc2ggPSB0aGlzLmdldFN0YXNoKCksXG5cdFx0XHRuZXdTdGFzaCA9IFtdLFxuXHRcdFx0YW5jaG9yID0gc3Rhc2gubGVuZ3RoID4gMCA/IHN0YXNoWzBdIDogdGhpcy5nZXRPcHRpb25zKCdudEVsJyksXG5cdFx0XHRwYXJlbnROb2RlID0gYW5jaG9yLnBhcmVudE5vZGU7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0bmV3U3Rhc2gucHVzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgbmV3U3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdGlmIChhbmNob3IubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1N0YXNoW3RdLCBhbmNob3IubmV4dFNpYmxpbmcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3U3Rhc2hbdF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHN0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRwYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0YXNoW3RdKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIG5ld1N0YXNoKTtcblx0fVxuXG5cdGFkZFRvU3Rhc2gobm9kZSkge1xuXHRcdHRoaXMuZ2V0U3Rhc2goKS5wdXNoKG5vZGUpO1xuXHR9XG5cblx0aXNEYXRhKGRhdGEgPSB7fSkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKSA9PT0gZGF0YTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZW5kZXJlcjtcbiIsImNvbnN0IHBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHtcblx0XHRsZXQgbCA9IDA7XG5cdFx0d2hpbGUgKHRhcmdldEVsLmNoaWxkcmVuLmxlbmd0aCAtIGwpIHtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlblswXS5ub2RlTmFtZSA9PT0gJ05UJyl7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ250IGZvdW5kZWQnKTtcblx0XHRcdFx0bCsrO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ3JlbW92ZSBjaGlsZCAnLHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdFx0dGFyZ2V0RWwucmVtb3ZlQ2hpbGQodGFyZ2V0RWwuY2hpbGRyZW5bbF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0YXJnZXRFbC50ZXh0Q29udGVudCA9ICcnO1xuXHR9LFxuXHRiZWZvcmVFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGNoaWxkICcsIHJlbmRlcmVkW2ldKTtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fVxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlO1xuIiwiY29uc3QgcGxhY2VBZnRlciA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQWZ0ZXI7XG4iLCJjb25zdCBwbGFjZUJlZm9yZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQmVmb3JlO1xuIiwiY29uc3QgcGxhY2VGaXJzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IHJlbmRlcmVkLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdwbGFjZSBmaXJzdCcsIGksIHJlbmRlcmVkW2ldKTtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgYmVmb3JlIGZpcnN0Jyk7XG5cdFx0XHRcdHRhcmdldEVsLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwuY2hpbGRyZW5bMF0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBhcyBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2VGaXJzdDtcbiIsImNvbnN0IHBsYWNlTGFzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VMYXN0O1xuIiwiY29uc3QgcmVwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XHRcdFxuXHRcdGlmICh0YXJnZXRFbC5ub2RlTmFtZSAhPT0gJ05UJyl7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhcmdldEVsKTtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2U7XG4iLCJpbXBvcnQgcGxhY2UgZnJvbSAnLi9wbGFjZSc7XG5pbXBvcnQgcGxhY2VBZnRlciBmcm9tICcuL3BsYWNlQWZ0ZXInO1xuaW1wb3J0IHBsYWNlQmVmb3JlIGZyb20gJy4vcGxhY2VCZWZvcmUnO1xuaW1wb3J0IHBsYWNlRmlyc3QgZnJvbSAnLi9wbGFjZUZpcnN0JztcbmltcG9ydCBwbGFjZUxhc3QgZnJvbSAnLi9wbGFjZUxhc3QnO1xuaW1wb3J0IHJlcGxhY2UgZnJvbSAnLi9yZXBsYWNlJztcblxuY29uc3Qgbm90UGxhY2VycyA9IHtcblx0cGxhY2U6IHBsYWNlLFxuXHRwbGFjZUFmdGVyOiBwbGFjZUFmdGVyLFxuXHRwbGFjZUJlZm9yZTogcGxhY2VCZWZvcmUsXG5cdHBsYWNlRmlyc3Q6IHBsYWNlRmlyc3QsXG5cdHBsYWNlTGFzdDogcGxhY2VMYXN0LFxuXHRyZXBsYWNlOiByZXBsYWNlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RQbGFjZXJzO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi9ub3RUZW1wbGF0ZUNhY2hlJztcbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL25vdFJlbmRlcmVyJztcbmltcG9ydCBub3RQbGFjZXJzIGZyb20gJy4vcGxhY2Vycyc7XG5cbmNvbnN0IE1FVEFfUEFSVFMgPSBTeW1ib2woJ3BhcnRzJyk7XG4vKlxuXHRpbnB1dCA9IHtcblx0XHRkYXRhOiBub3RSZWNvcmQgb3IgW25vdFJlY29yZF0sXG5cdFx0dGVtcGxhdGU6IHtcblx0XHRcdGh0bWw6IGh0bWwoc3RyaW5nKSwgXHRcdC8v0YLQtdC60YHRgiDRgSBodG1sINC60L7QtNC+0Lwg0YjQsNCx0LvQvtC90LBcblx0XHRcdGVsOiBIVE1MRWxlbWVudChvYmplY3QpLCBcdC8vRE9NINGN0LvQtdC80LXQvdGCXG5cdFx0XHRzcmM6IHNyYyhzdHJpbmcpLFx0XHRcdC8v0YHRgdGL0LvQutCwINC90LAg0YTQsNC50Lsg0YEg0YjQsNCx0LvQvtC90L7QvFxuXHRcdFx0bmFtZTogbmFtZShzdHJpbmcpXHRcdFx0Ly/QvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwINC00LvRjyDQv9C+0LjRgdC60LAg0LIg0LrRjdGI0LUgbm90VGVtcGxhdGVDYWNoZVxuXHRcdH1cblx0XHRvcHRpb25zOntcblx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdC8v0LAg0Y3RgtC+INC60LDQuiDQsdGD0LTQtdC8INC/0L7QvNC10YnQsNGC0Ywg0YDQtdC30YPQu9GM0YLQsNGCINGA0LXQvdC00LXRgNC40L3Qs9CwXG5cdFx0XHRyZW5kZXJBbmQ6IHBsYWNlU3R5bGUoc3RyaW5nKSDQvtC00LjQvSDQuNC3INCy0LDRgNC40LDQvdGC0L7QslxuXHRcdFx0XHRcdHBsYWNlXHRcdC1cdNC/0L7QvNC10YnQsNC10Lwg0LLQvdGD0YLRgNC4INGG0LXQu9C10LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuXHRcdFx0XHRcdHJlcGxhY2VcdFx0LVx00LfQsNC80LXQvdGP0LXQvFxuXHRcdFx0XHRcdHBsYWNlQWZ0ZXJcdC1cdNC/0L7RgdC70LVcblx0XHRcdFx0XHRwbGFjZUJlZm9yZVx0LVx00LTQvlxuXHRcdFx0XHRcdHBsYWNlRmlyc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C10YDQstGL0Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdFx0XHRcdHBsYWNlTGFzdFx0LVx00LLQvdGD0YLRgNC4INC/0L7RgdC70LXQtNC90LjQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0fVxuXHR9XG4qL1xuY2xhc3Mgbm90Q29tcG9uZW50IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHRcdHRoaXMub24oJ3JlYWR5JywgdGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCl7XG5cdFx0aWYgKHRoaXMub3duZXIpe1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLm93bmVyLmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fVxuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLm93bmVyID0gaW5wdXQub3duZXI/aW5wdXQub3duZXI6bnVsbDtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQpO1xuXHRcdHRoaXMucHJlcGFyZVRlbXBsYXRlRWxlbWVudChpbnB1dC50ZW1wbGF0ZSA/IGlucHV0LnRlbXBsYXRlIDogbnVsbCk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0fVxuXG5cdGluaXRFdmVudHMobGlzdCl7XG5cdFx0Zm9yKGxldCB0IG9mIGxpc3Qpe1xuXHRcdFx0dGhpcy5vbiguLi50KTtcblx0XHR9XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnaWQnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2lkJywgT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdudEVsJykpe1xuXHRcdFx0dGhpcy5pbml0TWFya0VsZW1lbnQoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFya0VsZW1lbnQoKXtcblx0XHRsZXQgbWFya0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbnQnKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ250RWwnLCBtYXJrRWwpO1xuXHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKSxcblx0XHRcdHRhcmdldFF1ZXJ5ID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpO1xuXHRcdGlmICh0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZiAodGFyZ2V0KXtcblx0XHRcdFx0dGhpcy5zZXRPcHRpb25zKCd0YXJnZXRFbCcsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpe1xuXHRcdFx0dGhyb3cgJ05vIHRhcmdldCB0byBwbGFjZSByZW5kZXJlZCc7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIubWFpbih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksIFttYXJrRWxdKTtcblx0XHR9XG5cblx0fVxuXG5cdGluaXRXb3JraW5nKHZhbCkge1xuXHRcdHRoaXMudW5zZXRSZWFkeSh2YWwpO1xuXHR9XG5cblx0cHJlcGFyZVRlbXBsYXRlRWxlbWVudCh2YWwpIHtcblx0XHRpZiAoIXZhbCkge1xuXHRcdFx0dGhpcy51bnNldFJlYWR5KCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2h0bWwnKSAmJiB2YWwuaHRtbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLndyYXAoJycsICcnLCB2YWwuaHRtbCkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdlbCcpICYmIHZhbC5lbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudCh2YWwuZWwuY2xvbmVOb2RlKHRydWUpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnc3JjJykgJiYgdmFsLnNyYykge1xuXHRcdFx0bm90VGVtcGxhdGVDYWNoZS5hZGRGcm9tVVJMKHZhbC5zcmMsIHZhbC5zcmMpXG5cdFx0XHRcdC50aGVuKHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQuYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCduYW1lJykgJiYgdmFsLm5hbWUpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS5nZXQodmFsLm5hbWUpKTtcblx0XHR9XG5cdH1cblxuXHRzZXRQcm90b1RlbXBsYXRlRWxlbWVudChjb250KSB7XG5cdFx0aWYgKGNvbnQpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnLCBjb250KTtcblx0XHRcdHRoaXMudHJpZ2dlcigncmVhZHknKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdXcm9uZyB0ZW1wbGF0ZSBjb250YWluZXIgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JykuY2xvbmVOb2RlKHRydWUpO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdHJlc2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnLCB0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkuY2xvbmVOb2RlKHRydWUpKTtcblx0fVxuXG5cdHNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB0cnVlKTtcblx0fVxuXG5cdHVuc2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIGZhbHNlKTtcblx0fVxuXG5cdGlzUmVhZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncmVhZHknKTtcblx0fVxuXG5cdGNsZWFyUGFydHMoKSB7XG5cdFx0Lyog0LjQt9Cy0LXRidCw0LXQvCDQvtCxINGD0LTQsNC70LXQvdC40Lgg0Y3Qu9C10LzQtdC90YLQvtCyICovXG5cdFx0aWYgKHRoaXNbTUVUQV9QQVJUU10gJiYgQXJyYXkuaXNBcnJheSh0aGlzW01FVEFfUEFSVFNdKSAmJiB0aGlzW01FVEFfUEFSVFNdLmxlbmd0aCkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiB0aGlzW01FVEFfUEFSVFNdKSB7XG5cdFx0XHRcdGlmICh0LmRlc3Ryb3kpe1xuXHRcdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHR9XG5cblx0ZGVzdHJveSgpe1xuXHRcdHRoaXMuY2xlYXJQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ250RWwnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlKXtcblx0XHRcdHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5nZXRPcHRpb25zKCdudEVsJykpO1xuXHRcdH1cblx0fVxuXG5cdHJlc2V0UGFydHMoKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXSA9IFtdO1xuXHR9XG5cblx0Z2V0UGFydHMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QQVJUU107XG5cdH1cblxuXHRhZGRQYXJ0KHRlbXBsYXRlKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXS5wdXNoKHRlbXBsYXRlKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdH1cblxuXHR1cGRhdGUoKXtcblx0XHR0aGlzLnJlbW92ZU9ic29sZXRlUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyVXBkYXRlJyk7XG5cdH1cblxuXHRwbGFjZVJlbmRlcmVkKCl7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSkge1xuXHRcdFx0bGV0IHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0cGxhY2VyLmJlZm9yZSh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpO1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnBsYWNlUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHBsYWNlci5hZnRlcih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ25vIHRhcmdldCBlbGVtZW50Jyk7XG5cdFx0fVxuXHR9XG5cblx0cGxhY2VQYXJ0KGRhdGEsIGluZGV4KXtcblx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSxcblx0XHRcdG5vZGVzID0gcGFydC5nZXRTdGFzaCgpLFxuXHRcdFx0dGFyZ2V0RWwsXG5cdFx0XHRsYXN0Tm9kZSxcblx0XHRcdHBsYWNlcjtcblx0XHRpZiAoaW5kZXggPT09IDApe1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0XHR0YXJnZXRFbCA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKE9QVFMuREVGQVVMVF9QTEFDRVJfTE9PUCk7XG5cdFx0XHR0YXJnZXRFbCA9IHRoaXMuZ2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnKTtcblx0XHR9XG5cdFx0cGxhY2VyLm1haW4odGFyZ2V0RWwsIG5vZGVzKTtcblx0XHRsYXN0Tm9kZSA9IHRhcmdldEVsO1xuXHRcdGZvcihsZXQgdCBvZiBub2Rlcyl7XG5cdFx0XHRpZiAodC5ub2RlVHlwZSA9PT0gMSl7XG5cdFx0XHRcdGxhc3ROb2RlID0gdDtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1jb21wb25lbnQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdFx0XHRsYXN0Tm9kZS5zZXRBdHRyaWJ1dGUoJ250LXBhcnQnLCBwYXJ0LmdldFdvcmtpbmcoJ3BhcnRJZCcpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScsIGxhc3ROb2RlKTtcblx0fVxuXG5cdGdldFBsYWNlcihtZXRob2QpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NlYXJjaGluZyBmb3IgcGxhY2VyJywgbWV0aG9kKTtcblx0XHRpZiAobm90UGxhY2Vycy5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG5cdFx0XHRyZXR1cm4gbm90UGxhY2Vyc1ttZXRob2RdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbm90UGxhY2Vyc1tPUFRTLkRFRkFVTFRfUExBQ0VSXTtcblx0XHR9XG5cdH1cblxuXHRmb3JFYWNoRGF0YShmdW5jKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5nZXREYXRhKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0RGF0YSgpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXREYXRhKClbdF0sIHQpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpLCAwKTtcblx0XHR9XG5cdH1cblxuXHRmb3JFYWNoUGFydChmdW5jKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5nZXRQYXJ0cygpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFBhcnRzKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldFBhcnRzKClbdF0sIHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx00LXRgdC70Lgg0YEg0LTQsNC90L3Ri9C80Lgg0L3QtSDRgdCy0Y/Qt9Cw0L0g0YDQtdC90LTQtdGA0LXRgCAtINGB0L7Qt9C00LDQtdC8XG5cdCovXG5cblx0cmVuZGVyUGFydChkYXRhKSB7XG5cdFx0aWYgKCF0aGlzLmdldFBhcnRCeURhdGEoZGF0YSkpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3JlYXRpbmcgcGFydCByZW5kZXInKTtcblx0XHRcdGxldCByZW5kZXJlciA9IG5ldyBub3RSZW5kZXJlcih7XG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdHRlbXBsYXRlOiB0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUuYmluZCh0aGlzKSxcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKCksXG5cdFx0XHRcdGNvbXBvbmVudDogdGhpc1xuXHRcdFx0fSk7XG5cdFx0XHQvL3JlbmRlcmVyLm9uKCdvYnNvbGV0ZScsIHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5hZGRQYXJ0KHJlbmRlcmVyKTtcblx0XHR9ZWxzZXtcblx0XHRcdC8vbm90Q29tbW9uLmxvZygndXBkYXRpbmcgcGFydCByZW5kZXInKTtcblx0XHRcdHRoaXMudXBkYXRlUGFydCh0aGlzLmdldFBhcnRCeURhdGEoZGF0YSkpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZVBhcnQocGFydCl7XG5cdFx0cGFydC51cGRhdGUoKTtcblx0fVxuXG5cdHJlbW92ZU9ic29sZXRlUGFydHMoKSB7XG5cdFx0Ly/QutC+0L3QstC10LXRgCDQv9C+0LjRgdC6INCw0LrRgtGD0LDQu9GM0L3Ri9GFIC0g0YPQtNCw0LvQtdC90LjQtSDQvtGB0YLQsNC70YzQvdGL0YVcblx0XHRub3RDb21tb24ucGlwZShcblx0XHRcdHVuZGVmaW5lZCwgLy8gcGFydHMgdG8gc2VhcmNoIGluLCBjYW4gYmUgJ3VuZGVmaW5lZCdcblx0XHRcdFtcblx0XHRcdFx0dGhpcy5maW5kQWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9maXJzdCByb3VuZCwgc2VhcmNoIGZvciBvYnNvbGV0ZVxuXHRcdFx0XHR0aGlzLnJlbW92ZU5vdEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vcmVtb3ZlICdlbVxuXHRcdFx0XVxuXHRcdCk7XG5cdH1cblxuXHQvKlxuXHRcdNC10YHRgtGMINC00LDQvdC90YvQtSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINCw0LrRgtGD0LDQu9GM0L3Qvixcblx0XHTQvdC10YIg0LTQsNC90L3Ri9GFINC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0YHRgtCw0YDRjNGRXG5cdCovXG5cblx0ZmluZEFjdHVhbFBhcnRzKCkge1xuXHRcdGxldCBhY3R1YWxQYXJ0cyA9IFtdO1xuXHRcdHRoaXMuZm9yRWFjaERhdGEoKGRhdGEvKiwgaW5kZXgqLyk9Pntcblx0XHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpO1xuXHRcdFx0aWYgKHBhcnQpe1xuXHRcdFx0XHRhY3R1YWxQYXJ0cy5wdXNoKHBhcnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBhY3R1YWxQYXJ0cztcblx0fVxuXG5cdC8qXG5cdFx00YPQtNCw0LvRj9C10Lwg0LLRgdC1INC60YDQvtC80LUg0LDQutGC0YPQsNC70YzQvdGL0YVcblx0Ki9cblx0cmVtb3ZlTm90QWN0dWFsUGFydHMoYWN0dWFsUGFydHMpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFBhcnRzKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYgKGFjdHVhbFBhcnRzLmluZGV4T2YodGhpcy5nZXRQYXJ0cygpW3RdKSA9PT0gLTEpe1xuXHRcdFx0XHR0aGlzLmdldFBhcnRzKClbdF0uZGVzdHJveSgpO1xuXHRcdFx0XHR0aGlzLmdldFBhcnRzKCkuc3BsaWNlKHQsIDEpO1xuXHRcdFx0XHR0LS07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0UGFydEJ5RGF0YShkYXRhKSB7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzLmdldFBhcnRzKCkpIHtcblx0XHRcdGlmICh0aGlzLmdldFBhcnRzKClbdF0uaXNEYXRhKGRhdGEpKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFBhcnRzKClbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb21wb25lbnQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICcucGFnZS1jb250ZW50Jyxcblx0T1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCA9ICcuaHRtbCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMID0gdHJ1ZSxcblx0T1BUX0RFRkFVTFRfUExVUkFMX05BTUUgPSAnTW9kZWxzJyxcblx0T1BUX0RFRkFVTFRfU0lOR0xFX05BTUUgPSAnTW9kZWwnLFxuXHRPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSA9ICdtYWluJyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0FORCA9ICdwbGFjZSc7XG5cbmNsYXNzIG5vdENvbnRyb2xsZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoYXBwKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJlYWR5OiBmYWxzZSxcblx0XHRcdHZpZXdzOiB7fSxcblx0XHRcdHZpZXdOYW1lOiBPUFRfREVGQVVMVF9WSUVXX05BTUUsXG5cdFx0XHRoZWxwZXJzOiB7fVxuXHRcdH0pO1xuXHRcdHRoaXMuc2V0RGF0YSh7fSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHtcblx0XHRcdG1vZHVsZU5hbWU6IE9QVF9ERUZBVUxUX01PRFVMRV9OQU1FLFxuXHRcdFx0Y29udGFpbmVyU2VsZWN0b3I6IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUixcblx0XHRcdHByZWZpeDogdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMubW9kdWxlJyksXG5cdFx0XHRwb3N0Zml4OiBPUFRfREVGQVVMVF9WSUVXU19QT1NURklYLFxuXHRcdFx0cmVuZGVyRnJvbVVSTDogT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMLFxuXHRcdFx0bmFtZXM6e1xuXHRcdFx0XHRwbHVyYWw6T1BUX0RFRkFVTFRfUExVUkFMX05BTUUsXG5cdFx0XHRcdHNpbmdsZTogT1BUX0RFRkFVTFRfU0lOR0xFX05BTUVcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMuaW5pdFJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHQvKlxuXHRcdCAgICDRgdGA0LDQt9GDINC00LXQu9Cw0LXQvCDQtNC+0YHRgtGD0L/QvdGL0LzQuCDQvNC+0LTQtdC70Lggbm90UmVjb3JkINC40LcgbmNgQ29udHJvbGxlck5hbWVgINCx0YPQtNGD0YIg0LTQvtGB0YLRg9C/0L3RiyDQutCw0LogdGhpcy5ucmBNb2RlbE5hbWVgXG5cdFx0Ki9cblx0XHRsZXQgaW50ZXJmYWNlcyA9IHRoaXMuYXBwLmdldEludGVyZmFjZXMoKTtcblx0XHR0aGlzLm1ha2UgPSB7fTtcblx0XHRmb3IgKGxldCB0IGluIGludGVyZmFjZXMpIHtcblx0XHRcdGlmIChpbnRlcmZhY2VzLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0dGhpcy5tYWtlW3RdID0gaW50ZXJmYWNlc1t0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVuZGVyKCl7XG5cdFx0dGhpcy5yZW5kZXIodGhpcy5nZXRXb3JraW5nKCd2aWV3TmFtZScpLCB0aGlzLmdldERhdGEoKSwgdGhpcy5nZXRXb3JraW5nKCdoZWxwZXJzJykpO1xuXHR9XG5cblx0cmVuZGVyKHZpZXdOYW1lID0nZGVmYXVsdCcgLyogdmlldyBuYW1lICovLCBkYXRhID0ge30gLyogZGF0YSBmb3Igbm90VGVtcGxhdGUqLyAsIGhlbHBlcnMgPSB7fS8qIGNvdWxkIGJlIG5vdCByZXByZXNlbnRlZCAqLykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0dmFyIHZpZXcgPSB0aGlzLmdldFZpZXcodmlld05hbWUpO1xuXG5cdFx0XHRpZiAodHlwZW9mIHZpZXcgPT09ICd1bmRlZmluZWQnIHx8IHZpZXcgPT09IG51bGwpIHtcblx0XHRcdFx0cmVqZWN0KCdObyB2aWV3IGZvdW5kJywgdmlld05hbWUpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZpZXcgPSBub3RDb21tb24uZXh0ZW5kKHt9LCB2aWV3KTtcblx0XHRcdFx0Ly8g0LXRgdC70LggcGxhY2Ug0L3QtSDRg9C60LDQt9Cw0L3Qviwg0YfRgtC+INCy0L7Qt9C80L7QttC90L4g0Lgg0YDQsNC30YPQvNC90L4g0L/RgNC4INC90LUg0YHRg9GJ0LXRgdGC0LLQvtCy0LDQvdC40Lhcblx0XHRcdFx0Ly8g0Y3Qu9C10LzQtdC90YLQsCwg0L3QviDQuNC30LLQtdGB0YLQvdC+0Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YDQtVxuXHRcdFx0XHRpZiAoKCh0eXBlb2Ygdmlldy50YXJnZXRFbCA9PT0gJ3VuZGVmaW5lZCcpIHx8ICh2aWV3LnRhcmdldEVsID09PSBudWxsKSkgJiYgKHR5cGVvZiB2aWV3LnRhcmdldFF1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3LnRhcmdldFF1ZXJ5ICE9PSBudWxsICYmIHZpZXcudGFyZ2V0UXVlcnkubGVuZ3RoID4gMCkpIHtcblx0XHRcdFx0XHR2aWV3LnRhcmdldEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2aWV3LnRhcmdldFF1ZXJ5KTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2aWV3LmRhdGEgPSBkYXRhO1xuXHRcdFx0XHRpZiAodHlwZW9mIHZpZXcuaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5oZWxwZXJzICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHZpZXcuaGVscGVycykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZpZXcuaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQodmlldy5oZWxwZXJzLCBoZWxwZXJzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8v0LXRgdC70Lgg0L3Rg9C20L3QviDQt9Cw0LPRgNGD0LbQsNGC0Ywg0YjQsNCx0LvQvtC90Ytcblx0XHRcdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyRnJvbVVSTCcpKSB7XG5cdFx0XHRcdFx0Ly/QuCDQsNC00YDQtdGBINC90LUg0YPQutCw0LfQsNC9XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LnRlbXBsYXRlVVJMID09PSAndW5kZWZpbmVkJyB8fCB2aWV3LnRlbXBsYXRlVVJMID09IG51bGwgfHwgdmlldy50ZW1wbGF0ZVVSTC5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHRcdFx0bGV0IHByZWZpeCA9ICh2aWV3LmNvbW1vbiA/IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLmNvbW1vbicpOiB0aGlzLmdldE1vZHVsZVByZWZpeCgpKSxcblx0XHRcdFx0XHRcdFx0bmFtZSA9ICgodHlwZW9mIHZpZXcubmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5uYW1lICE9PSBudWxsICYmIHZpZXcubmFtZS5sZW5ndGggPiAwKSA/IHZpZXcubmFtZSA6IHZpZXdOYW1lKSxcblx0XHRcdFx0XHRcdFx0cG9zdGZpeCA9IHRoaXMuZ2V0T3B0aW9ucygncG9zdGZpeCcpO1xuXHRcdFx0XHRcdFx0Ly/Qs9C10L3QtdGA0LjRgNGD0LXQvCDQsNC00YDQtdGBINC/0L4g0YjQsNCx0LvQvtC90YNcblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVVUkwgPSAgW3ByZWZpeCwgbmFtZV0uam9pbignLycpICsgcG9zdGZpeDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly/QsCDQtdGB0LvQuCDQtdGB0YLRjCDQvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwLCDRgtC+XG5cdFx0XHRcdFx0aWYgKHZpZXcuaGFzT3duUHJvcGVydHkoJ3RlbXBsYXRlTmFtZScpKSB7XG5cdFx0XHRcdFx0XHQvLy4uLlxuXHRcdFx0XHRcdFx0dmlldy50ZW1wbGF0ZU5hbWUgPSB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgdmlldy50ZW1wbGF0ZU5hbWUgKyB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0XHRkYXRhLFxuXHRcdFx0XHRcdHRlbXBsYXRlOntcblx0XHRcdFx0XHRcdG5hbWU6IHZpZXcudGVtcGxhdGVOYW1lLFxuXHRcdFx0XHRcdFx0c3JjOiB2aWV3LnRlbXBsYXRlVVJMLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOltbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1dLFxuXHRcdFx0XHRcdG9wdGlvbnM6e1xuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IHZpZXcudGFyZ2V0RWwsXG5cdFx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdFx0cmVuZGVyQW5kOiBPUFRfREVGQVVMVF9SRU5ERVJfQU5EIHx8IHZpZXcucmVuZGVyQW5kXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0fVxuXG5cdGdldEFwcCgpIHtcblx0XHRyZXR1cm4gdGhpcy5hcHA7XG5cdH1cblxuXHRzZXRNb2RlbChtb2RlbCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZWwnLCBtb2RlbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNb2RlbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdtb2RlbCcpO1xuXHR9XG5cblx0c2V0UmVhZHkodmFsID0gdHJ1ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB2YWwpO1xuXHRcdHZhbCA/IHRoaXMudHJpZ2dlcigncmVhZHknKSA6IHRoaXMudHJpZ2dlcignYnVzeScpO1xuXHR9XG5cblx0c2V0VmlldyhuYW1lLCB2aWV3KXtcblx0XHR0aGlzLnNldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpLCB2aWV3KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFZpZXdzKHZpZXdzKXtcblx0XHRmb3IobGV0IHQgaW4gdmlld3Mpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCB0KSwgdmlld3NbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFZpZXcobmFtZSA9ICdkZWZhdWx0Jyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgbmFtZSkpO1xuXHR9XG5cblx0c2V0TW9kdWxlTmFtZSh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ21vZHVsZU5hbWUnLCB2YWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kdWxlTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdtb2R1bGVOYW1lJyk7XG5cdH1cblxuXHRnZXRNb2R1bGVQcmVmaXgoKXtcblx0XHRyZXR1cm4gW3RoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZXMnKSwgdGhpcy5nZXRNb2R1bGVOYW1lKCldLmpvaW4oJy8nKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoLmpzJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi4vbm90Um91dGVyJztcblxudmFyIG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiA9IHtcblx0Y29udGVudDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmluZGV4T2YoJ2NhcGl0YWxpemUnKSA+IC0xKSB7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQudG9VcHBlckNhc2UoKTtcblx0XHR9XG5cdFx0c2NvcGUuZWxlbWVudC50ZXh0Q29udGVudCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdDtcblx0fSxcblx0YmluZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoc2NvcGUucGFyYW1zWzBdLCAoZSkgPT4ge1xuXHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0cmV0dXJuIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCh7XG5cdFx0XHRcdFx0c2NvcGUsXG5cdFx0XHRcdFx0aXRlbSxcblx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdGVcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0dmFsdWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGxpdmVFdmVudHMgPSBbJ2NoYW5nZScsICdrZXl1cCddLFxuXHRcdFx0b25FdmVudCA9ICgpID0+IHtcblx0XHRcdFx0aWYgKFsnY2hlY2tib3gnLCAncmFkaW8nLCAnc2VsZWN0LW11bHRpcGxlJ10uaW5kZXhPZihzY29wZS5lbGVtZW50LnR5cGUpID4gLTEpIHtcblx0XHRcdFx0XHRzd2l0Y2ggKHNjb3BlLmVsZW1lbnQudHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgJ2NoZWNrYm94Jzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3JhZGlvJzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkP3Njb3BlLmVsZW1lbnQudmFsdWU6bnVsbCk7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KGhlbHBlcnMuZmllbGQubmFtZSwgaGVscGVycy5kYXRhLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQgPyBzY29wZS5lbGVtZW50LnZhbHVlIDogbnVsbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdzZWxlY3QtbXVsdGlwbGUnOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRsZXQgc2VsZWN0ZWQgPSBbXS5zbGljZS5jYWxsKHNjb3BlLmVsZW1lbnQuc2VsZWN0ZWRPcHRpb25zKS5tYXAoYSA9PiBhLnZhbHVlKTtcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnc2VsZWN0LW11bHRpcGxlJywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSwgJyAtPiAnLHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSAhPT0gdHJ1ZSkge1xuXHRcdFx0aWYoc2NvcGUuZWxlbWVudC50eXBlID09PSAndGV4dGFyZWEnKXtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1cblx0XHRcdGZvciAobGV0IHQgb2YgbGl2ZUV2ZW50cykge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodCwgb25FdmVudCk7XG5cdFx0XHR9XG5cdFx0XHRzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cdGF0dHI6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlcyA9PT0gJ2Z1bmN0aW9uJykgPyByZXMoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzKTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZShzY29wZS5wYXJhbXNbMF0sIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdH0sXG5cdG5hbWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oIC8qc2NvcGUsIGl0ZW0sIGhlbHBlcnMqLyApIHtcblxuXHR9LFxuXHRjaGVja2VkOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXN1bHQgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXN1bHQgPT09ICdmdW5jdGlvbicpID8gcmVzdWx0KHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlc3VsdCk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID8gc2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKSA6IHNjb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG5cdH0sXG5cdGNsYXNzOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpID8gcmVzKHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlcyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPCAzIHx8IGlzTmFOKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpIHtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IHVzZWQgPSBmYWxzZTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcGUucGFyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChpID09PSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0XHR1c2VkID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCF1c2VkKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0b3B0aW9uczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgaSA9IDAsXG5cdFx0XHRvcHRpb24gPSBudWxsLFxuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSAndmFsdWUnLFxuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSAnbmFtZScsXG5cdFx0XHRpdGVtVmFsdWVGaWVsZE5hbWUgPSBoZWxwZXJzLmhhc093blByb3BlcnR5KCdmaWVsZCcpICYmIGhlbHBlcnMuZmllbGQuaGFzT3duUHJvcGVydHkoJ25hbWUnKSA/IGhlbHBlcnMuZmllbGQubmFtZSA6ICd2YWx1ZSc7XG5cdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHR9XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDMpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0XHRpdGVtVmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMl07XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgaGVscGVycyAhPT0gbnVsbCAmJiBoZWxwZXJzLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgJiYgaGVscGVycy5kZWZhdWx0KSB7XG5cdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJycpO1xuXHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gaGVscGVycy5wbGFjZWhvbGRlcjtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtICE9PSBudWxsKSB7XG5cdFx0XHR2YXIgbGliID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGliLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pO1xuXHRcdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBsaWJbaV1bbGFiZWxGaWVsZE5hbWVdO1xuXHRcdFx0XHRpZiAoaGVscGVycy5maWVsZC5hcnJheSkge1xuXHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0uaW5kZXhPZihsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdID09PSBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSB7XG5cdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRocmVmOmZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRpZiAoIXNjb3BlLmVsZW1lbnQubm90Um91dGVySW5pdGlhbGl6ZWQpe1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIG5vdFJvdXRlci5nZXRGdWxsUm91dGUoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSk7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0bm90Um91dGVyLm5hdmlnYXRlKG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0XHRzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cbn07XG5leHBvcnQgZGVmYXVsdCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWI7XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCA9ICdmb3JtXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfRk9STV9USVRMRSA9ICdGb3JtIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge1xuXG5cdH0sXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUID0gWydvcHRpb25zJywgJ21hbmlmZXN0JywgJ2FwcCddO1xuXG5jbGFzcyBub3RGb3JtIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdwcmVmaXgnLCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50cycsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLnNldERhdGEobmV3IG5vdFJlY29yZCh7fSwgdGhpcy5nZXREYXRhKCkpKTtcblx0XHR9XG5cdFx0dGhpcy5vbignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjYW5jZWwnLCB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcykpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKTtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoKSB7XG5cdFx0bGV0IG1hbmlmZXN0ID0gdGhpcy5nZXRNYW5pZmVzdCgpO1xuXHRcdGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC5hY3Rpb25zKSB7XG5cdFx0XHRyZXR1cm4gbWFuaWZlc3QuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpKSA/IG1hbmlmZXN0LmFjdGlvbnNbdGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKV0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRnZXRGb3JtRmllbGRzTGlzdCgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0cm9sZSA9IHRoaXMuZ2V0T3B0aW9ucygncm9sZScsIE9QVF9ERUZBVUxUX1JPTEVfTkFNRSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpIHtcblxuXHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzKSB7XG5cdFx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xuXHRcdFx0XHRcdGxpc3QgPSBhY3Rpb25EYXRhLmZpZWxkc1tyb2xlXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdC8qXG5cdFx0UmVuZGVyaW5nXG5cdCovXG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHR9XG5cblx0Z2V0UGFydFRlbXBsYXRlTmFtZShmb3JtUGFydCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHRoaXMuYmluZEZvcm1FdmVudHMuYmluZCh0aGlzKV0sXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfRk9STV9USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpICYmIHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aCl7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRGb3JtRmllbGRzTGlzdCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0bGV0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKVt0XTtcblx0XHRcdFx0dGhpcy5hZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsZWFyRmllbGRzQ29tcG9uZW50cygpIHtcblx0XHRsZXQgY29tcHMgPSB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKTtcblx0XHR3aGlsZSAoY29tcHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29tcHNbMF0uY29tcG9uZW50LmRlc3Ryb3koKTtcblx0XHRcdGNvbXBzLnNwbGljZSgwLCAxKTtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHNMaWJzKCl7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdG9wdGlvbnM6IHt9LFxuXHRcdFx0bWFuaWZlc3Q6IHt9LFxuXHRcdFx0YXBwOiB7fSxcblx0XHR9O1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpKSB7XG5cdFx0XHRyZXN1bHQub3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmIChub3RDb21tb24uZ2V0QXBwKCkgJiYgbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpKXtcblx0XHRcdHJlc3VsdC5hcHAgPSBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCAmJiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpKXtcblx0XHRcdHJlc3VsdC5tYW5pZmVzdCA9IHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkuZmllbGRzO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpIHtcblx0XHRsZXQgZGVmID0gT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTixcblx0XHRcdGZpZWxkc0xpYnMgPSB0aGlzLmdldEZpZWxkc0xpYnMoKTtcblx0XHRmb3IobGV0IHQgb2YgT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1Qpe1xuXHRcdFx0aWYgKGZpZWxkc0xpYnMuaGFzT3duUHJvcGVydHkodCkgJiYgZmllbGRzTGlic1t0XS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpKXtcblx0XHRcdFx0cmV0dXJuIGZpZWxkc0xpYnNbdF1bZmllbGROYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSkge1xuXHRcdGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKTtcblx0XHRsZXQgcmVjID0ge1xuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0bmFtZTogZmllbGROYW1lLFxuXHRcdFx0XHR0aXRsZTogZmllbGRUeXBlLmxhYmVsIHx8IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0dHlwZTogZmllbGRUeXBlLnR5cGUsXG5cdFx0XHRcdGxhYmVsOiBmaWVsZFR5cGUubGFiZWwsXG5cdFx0XHRcdGFycmF5OiBmaWVsZFR5cGUuYXJyYXksXG5cdFx0XHRcdGRlZmF1bHQ6IGZpZWxkVHlwZS5kZWZhdWx0LFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMobm90UGF0aC5qb2luKCdoZWxwZXJzJywnbGlicycsZmllbGROYW1lKSlcblx0XHRcdH1cblx0XHR9O1xuXHRcdGxldCBoZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRpc0NoZWNrZWQ6IChwYXJhbXMpPT57XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cblx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoZmllbGRUeXBlLnR5cGUpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRGb3JtVGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0Jyxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbJ2FmdGVyRGF0YUNoYW5nZScsIHRoaXMuY29sbGVjdERhdGFGcm9tQ29tcG9uZW50cy5iaW5kKHRoaXMpXVxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykucHVzaChyZWMpO1xuXHR9XG5cblx0Y29sbGVjdERhdGFGcm9tQ29tcG9uZW50cyhwYXJhbXMpe1xuXHRcdG5vdENvbW1vbi5sb2coJ2NvbGxlY3QgZGF0YSBmcm9tIGNvbXBvbmVudHMnLCBwYXJhbXMpO1xuXHR9XG5cblx0Z2V0Rm9ybVRhcmdldEVsZW1lbnQodGFyZ2V0ID0gJ2JvZHknKXtcblx0XHRpZiAoIXRhcmdldCl7dGFyZ2V0ID0gJ2JvZHknO31cblx0XHRsZXQgcmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHRpZiAoIXJlcyAmJiB0YXJnZXQhPT0nYm9keScpe1xuXHRcdFx0dGFyZ2V0ID0gJ2JvZHknO1xuXHRcdFx0cmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHR9XG5cdFx0aWYoIXJlcyAmJiB0YXJnZXQ9PSdib2R5Jyl7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdGNvbGxlY3REYXRhKCkge1xuXHRcdC8vbGV0IGRhdGEgPSB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKTtcdFx0XG5cdH1cblxuXHRiaW5kRm9ybUV2ZW50cygpe1xuXHRcdGxldCB0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZih0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZih0YXJnZXQpe1xuXHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3RhcmdldEVsJywgdGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSl7XG5cdFx0XHRsZXRcdGZvcm0gPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXHRcdFx0aWYoZm9ybSl7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdEV2ZW50IGhhbmRsZXJzXG5cdCovXG5cblx0b25TdWJtaXQoKSB7XG5cblx0fVxuXG5cdG9uQ2FuY2VsKCkge1xuXG5cdH1cblxuXHRvblJlc2V0KCkge1xuXG5cdH1cblxuXHRnZXRGaWVsZHMoKSB7XG5cblx0fVxuXG5cdGFkZEZpZWxkKCkge1xuXG5cdH1cblxuXHRyZW1vdmVGaWVsZCgpIHtcblxuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RGb3JtO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfUEFHRV9TSVpFID0gMjAsXG5cdE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSID0gMCxcblx0T1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04gPSAxLFxuXHRPUFRfREVGQVVMVF9TT1JUX0ZJRUxEID0gJ19pZCcsXG5cdE9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DID0gJ3ByZXByb2Nlc3Nvcic7XG5cbmNsYXNzIG5vdFRhYmxlIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgW10pO1xuXHRcdGlmKCF0aGlzLmdldERhdGEoKSB8fCAhQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoJ3Jvd3MnKSkpe1xuXHRcdFx0dGhpcy5zZXREYXRhKHtyb3dzOltdfSk7XG5cdFx0fVxuXHRcdHRoaXMucmVzZXRQYWdlcigpO1xuXHRcdHRoaXMucmVzZXRGaWx0ZXIoKTtcblx0XHR0aGlzLnJlc2V0U29ydGVyKCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRkYXRhOiB7fSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiAndGFibGVfd3JhcHBlcidcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdHJlbmRlckFuZDogdGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJJbnNpZGUuYmluZCh0aGlzKVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudCcsIGNvbXBvbmVudCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVySW5zaWRlKCkge1xuXHRcdHRoaXMucmVuZGVySGVhZGVyKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdFx0dGhpcy5yZW5kZXJCb2R5KCk7XG5cdFx0dGhpcy5iaW5kU2VhcmNoKCk7XG5cdFx0dGhpcy5iaW5kQ3VzdG9tQmluZGluZ3MoKTtcblx0fVxuXG5cdHJlbmRlckhlYWRlcigpIHtcblx0XHR2YXIgdGFibGVIZWFkZXIgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGhlYWQgdHInKTtcblx0XHRpZiAoIXRhYmxlSGVhZGVyKSByZXR1cm47XG5cdFx0bGV0IGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBuZXdUaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJyk7XG5cdFx0XHRuZXdUaC5pbm5lckhUTUwgPSBmaWVsZHNbaV0udGl0bGU7XG5cdFx0XHRpZiAoZmllbGRzW2ldLmhhc093blByb3BlcnR5KCdzb3J0YWJsZScpICYmIGZpZWxkc1tpXS5zb3J0YWJsZSkge1xuXHRcdFx0XHR0aGlzLmF0dGFjaFNvcnRpbmdIYW5kbGVycyhuZXdUaCwgZmllbGRzW2ldLnBhdGgpO1xuXHRcdFx0fVxuXHRcdFx0dGFibGVIZWFkZXIuYXBwZW5kQ2hpbGQobmV3VGgpO1xuXHRcdH1cblx0fVxuXG5cdGF0dGFjaFNvcnRpbmdIYW5kbGVycyhoZWFkQ2VsbCwgZmllbGROYW1lKSB7XG5cdFx0aGVhZENlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5jaGFuZ2VTb3J0aW5nT3B0aW9ucyhoZWFkQ2VsbCwgZmllbGROYW1lKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblx0XHRoZWFkQ2VsbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdH1cblxuXHRjaGFuZ2VTb3J0aW5nT3B0aW9ucyhlbCwgZmllbGROYW1lKSB7XG5cdFx0aWYgKGZpZWxkTmFtZSA9PT0gdGhpcy5nZXRTb3J0ZXIoKS5zb3J0QnlGaWVsZCl7XG5cdFx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRcdHNvcnRCeUZpZWxkOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHNvcnREaXJlY3Rpb246IC0xICogdGhpcy5nZXRTb3J0ZXIoKS5zb3J0RGlyZWN0aW9uLFxuXHRcdFx0fSk7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRcdHNvcnRCeUZpZWxkOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHNvcnREaXJlY3Rpb246IE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmIChlbC5wYXJlbnROb2RlKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsLnBhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0gPT09IGVsKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ25vbmUnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0U29ydGVyKCkuc29ydERpcmVjdGlvbiA+IDApIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ2FzY2VuZGluZycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdkZXNjZW5kaW5nJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0U29ydGVyKGhhc2gpIHtcblx0XHQvL2NvbnNvbGUubG9nKCdzZXRTb3J0ZXInLCBoYXNoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3NvcnRlcicsIGhhc2gpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZURhdGEoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0U29ydGVyKCl7XG5cdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0c29ydEJ5RmllbGQ6IE9QVF9ERUZBVUxUX1NPUlRfRklFTEQsXG5cdFx0XHRzb3J0RGlyZWN0aW9uOiBPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTixcblx0XHR9KTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdGdldEZpbHRlclNlYXJjaCgpIHtcblx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmdldEZpbHRlcigpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldEZpbHRlcigpICE9PSBudWxsICYmIHR5cGVvZiB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2ggIT09IG51bGwpID8gdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2gudG9TdHJpbmcoKSA6ICcnO1xuXHR9XG5cblx0aW52YWxpZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ29uZVBhZ2VyJykpIHtcblx0XHRcdHdoaWxlKHRoaXMuZ2V0RGF0YSgncm93cycpLmxlbmd0aD4wKXtcblx0XHRcdFx0dGhpcy5nZXREYXRhKCdyb3dzJykucG9wKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR9XG5cdH1cblxuXHRzZXRGaWx0ZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgaGFzaCk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlRGF0YSgpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpcy5zZXRGaWx0ZXIoe30pO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0UGFnZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncGFnZXInLCBoYXNoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdwYWdlcicsIHtcblx0XHRcdHBhZ2VTaXplOiBpc05hTih0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJykpID8gT1BUX0RFRkFVTFRfUEFHRV9TSVpFOnRoaXMuZ2V0T3B0aW9ucygncGFnZVNpemUnKSxcblx0XHRcdHBhZ2VOdW1iZXI6IGlzTmFOKHRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpKSA/IE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSOnRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncGFnZXInKTtcblx0fVxuXG5cdHNldFVwZGF0aW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndXBkYXRpbmcnLCB0cnVlKTtcblx0fVxuXG5cdHNldFVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd1cGRhdGluZycsIGZhbHNlKTtcblx0fVxuXG5cdGlmVXBkYXRpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndXBkYXRpbmcnKTtcblx0fVxuXG5cdHVwZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKSB7XG5cdFx0XHRpZiAodGhpcy5pZlVwZGF0aW5nKCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly9sb2FkIGZyb20gc2VydmVyXG5cdFx0XHRsZXQgcXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKHt9KVxuXHRcdFx0XHQuc2V0RmlsdGVyKHRoaXMuZ2V0RmlsdGVyKCkpXG5cdFx0XHRcdC5zZXRTb3J0ZXIodGhpcy5nZXRTb3J0ZXIoKSlcblx0XHRcdFx0LnNldFBhZ2VyKHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSwgdGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpO1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0cXVlcnkuJGxpc3QoKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJyRsaXN0IGZvciB0YWJsZScsIGRhdGEpO1xuXHRcdFx0XHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRcdFx0XHRyb3dzOiB0aGlzLmdldERhdGEoJ3Jvd3MnKS5jb25jYXQoZGF0YSlcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR0aGlzLnByb2NjZXNzRGF0YSgpO1xuXHRcdFx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKGUpO1xuXHRcdFx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9sb2NhbCBtYWdpY1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0dGhpcy5wcm9jY2Vzc0RhdGEoKTtcblx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdH1cblx0fVxuXG5cdHByb2NjZXNzRGF0YSgpIHtcblx0XHR2YXIgdGhhdEZpbHRlciA9IHRoaXMuZ2V0RmlsdGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0RmlsdGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyICE9PSBudWxsICYmIHR5cGVvZiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2ggIT09IG51bGwgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2gubGVuZ3RoID4gMCkge1xuXHRcdFx0Ly9cblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgdGhpcy5nZXREYXRhKCdyb3dzJykuZmlsdGVyKHRoaXMudGVzdERhdGFJdGVtLmJpbmQodGhpcykpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKSk7XG5cdFx0fVxuXHRcdC8vLy9zb3J0ZXJcblx0XHR2YXIgdGhhdFNvcnRlciA9IHRoaXMuZ2V0U29ydGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0U29ydGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0U29ydGVyICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4ge1xuXHRcdFx0XHRsZXQgdDEgPSBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLCBpdGVtMSwge30pLFxuXHRcdFx0XHRcdHQyID0gbm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCxpdGVtMix7fSk7XG5cdFx0XHRcdGlmIChpc05hTih0MSkpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHQxICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdDIgIT09ICd1bmRlZmluZWQnICYmIHQxLmxvY2FsZUNvbXBhcmUpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIHQxLmxvY2FsZUNvbXBhcmUoKSAqIC0gdGhhdFNvcnRlci5zb3J0RGlyZWN0aW9uO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiAoKHQxIDwgdDIpID8gMSA6IC0xKSAqIHRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0YmluZFNlYXJjaCgpIHtcblx0XHR2YXIgc2VhcmNoRWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInNlYXJjaFwiXScpWzBdO1xuXHRcdGlmICghc2VhcmNoRWwpIHJldHVybjtcblx0XHR2YXIgb25FdmVudCA9IChlKSA9PiB7XG5cdFx0XHR0aGlzLnNldEZpbHRlcih7XG5cdFx0XHRcdGZpbHRlclNlYXJjaDogZS5jdXJyZW50VGFyZ2V0LnZhbHVlXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH07XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbkV2ZW50KTtcblx0XHRzZWFyY2hFbC5hZGRFdmVudExpc3RlbmVyKCdlbnRlcicsIG9uRXZlbnQpO1xuXHR9XG5cblxuXHRiaW5kQ3VzdG9tQmluZGluZ3MoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykgfHwgIXRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IgKHZhciBzZWxlY3RvciBpbiB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHZhciBlbHMgPSB0aGlzLmdldE9wdGlvbigndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdGZvciAodmFyIGVsSWQgPSAwOyBlbElkIDwgZWxzLmxlbmd0aDsgZWxJZCsrKSB7XG5cdFx0XHRcdHZhciBlbCA9IGVsc1tlbElkXTtcblx0XHRcdFx0Zm9yICh2YXIgZXZlbnQgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpW3NlbGVjdG9yXSkge1xuXHRcdFx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl1bZXZlbnRdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvYWROZXh0KCkge1xuXHRcdHRoaXMuZ2V0V29ya2luZygncGFnZXInKS5wYWdlTnVtYmVyKys7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZW5kZXJSb3coaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbmV3Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVFInKSxcblx0XHRcdGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBuZXdUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1REJyksXG5cdFx0XHRcdGZpZWxkID0gZmllbGRzW2ldLFxuXHRcdFx0XHRwcmVwcm9jZXNzZWQgPSBudWxsLFxuXHRcdFx0XHR2YWwgPSBub3RQYXRoLmdldChmaWVsZC5wYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2VkaXRhYmxlJykgJiYgIWZpZWxkLmhhc093blByb3BlcnR5KCdjb21wb25lbnQnKSkge1xuXHRcdFx0XHRuZXdUZC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRFZGl0YWJsZScsIHRydWUpO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0LnBhdGggPSBmaWVsZC5wYXRoO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0Lml0ZW1JZCA9IGl0ZW1bdGhpcy5nZXRPcHRpb25zKCdpdGVtSWRGaWVsZCcpXTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC52YWx1ZSA9IHZhbDtcblx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpPT57XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksIG5ld1RkLnRleHRDb250ZW50KTtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoT1BUX0ZJRUxEX05BTUVfUFJFX1BST0MpKSB7XG5cdFx0XHRcdHByZXByb2Nlc3NlZCA9IGZpZWxkW09QVF9GSUVMRF9OQU1FX1BSRV9QUk9DXSh2YWwsIGl0ZW0sIGluZGV4KTtcblx0XHRcdH1cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnY29tcG9uZW50JykpIHtcblx0XHRcdFx0bmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YTogZmllbGQuY29tcG9uZW50LmRhdGEgfHwgcHJlcHJvY2Vzc2VkIHx8IHt2YWwsIGl0ZW0sIGluZGV4fSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTogZmllbGQuY29tcG9uZW50LnRlbXBsYXRlLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBuZXdUZCxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IGZpZWxkLmNvbXBvbmVudC5ldmVudHMgfHwgW11cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXdUZC5pbm5lckhUTUwgPSBwcmVwcm9jZXNzZWQgfHwgdmFsO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdldmVudHMnKSAmJiBmaWVsZC5ldmVudHMpIHtcblx0XHRcdFx0Zm9yICh2YXIgaiBpbiBmaWVsZC5ldmVudHMpIHtcblx0XHRcdFx0XHRuZXdUZC5hZGRFdmVudExpc3RlbmVyKGosIChlKT0+e1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZpZWxkLmV2ZW50c1tqXSh7XG5cdFx0XHRcdFx0XHRcdGV2ZW50OiBlLFxuXHRcdFx0XHRcdFx0XHRlbGVtZW50OiBuZXdUZCxcblx0XHRcdFx0XHRcdFx0aXRlbTogaXRlbSxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHZhbCxcblx0XHRcdFx0XHRcdFx0ZmllbGQ6IGZpZWxkXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG5ld1Jvdy5hcHBlbmRDaGlsZChuZXdUZCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3Byb2NSb3cnKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJvY1JvdycpKG5ld1JvdywgaXRlbSk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXdSb3c7XG5cdH1cblxuXHRyZWZyZXNoQm9keSgpIHtcblx0XHR2YXIgdGJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0aWYgKCF0Ym9keSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdHRoaXMuY2hlY2tGaWx0ZXJlZCgpO1xuXHRcdHZhciB0aGlzUGFnZVN0YXJ0cyA9IDAsXG5cdFx0XHRuZXh0UGFnZUVuZHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIgKyAxKTtcblx0XHRmb3IgKHZhciBpID0gdGhpc1BhZ2VTdGFydHM7IGkgPCBNYXRoLm1pbihuZXh0UGFnZUVuZHMsIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykubGVuZ3RoKTsgaSsrKSB7XG5cdFx0XHR0Ym9keS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlclJvdyh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpW2ldKSk7XG5cdFx0fVxuXHR9XG5cblx0ZmluZEJvZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuXHR9XG5cblx0Y2xlYXJCb2R5KCkge1xuXHRcdHZhciB0YWJsZUJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0aWYgKCF0YWJsZUJvZHkpIHJldHVybjtcblx0XHR0YWJsZUJvZHkuaW5uZXJIVE1MID0gJyc7XG5cdH1cblxuXHRjaGVja0ZpbHRlcmVkKCl7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykpKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJyxbXSk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyQm9keSgpIHtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnb25lUGFnZXInKSkge1xuXHRcdFx0dGhpcy5jbGVhckJvZHkoKTtcblx0XHR9XG5cdFx0dGhpcy5jaGVja0ZpbHRlcmVkKCk7XG5cdFx0dmFyIHRoaXNQYWdlU3RhcnRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyKSxcblx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpLFxuXHRcdFx0dGJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cblx0XHRmb3IgKHZhciBpID0gdGhpc1BhZ2VTdGFydHM7IGkgPCBNYXRoLm1pbihuZXh0UGFnZUVuZHMsIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykubGVuZ3RoKTsgaSsrKSB7XG5cdFx0XHR0Ym9keS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlclJvdyh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpW2ldKSk7XG5cdFx0fVxuXHR9XG5cblx0dGVzdERhdGFJdGVtKGl0ZW0pe1xuXHRcdHZhciBzdHJWYWx1ZSA9IHRoaXMuZ2V0RmlsdGVyU2VhcmNoKCkudG9Mb3dlckNhc2UoKTtcblx0XHRmb3IodmFyIGsgaW4gaXRlbSl7XG5cdFx0XHR2YXIgdG9Db21wID0gaXRlbVtrXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZiAodG9Db21wLmluZGV4T2Yoc3RyVmFsdWUpPi0xKXtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RUYWJsZTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuLy9pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbi8vaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jbGFzcyBub3RWaWV3IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoaW5wdXQub3B0aW9ucyB8fCB7fSk7XG5cdFx0dGhpcy5zZXREYXRhKGlucHV0LmRhdGEgfHwge30pO1xuXHRcdHRoaXMuc2V0V29ya2luZyhpbnB1dC53b3JraW5nIHx8IHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFZpZXc7XG4iLCIvKlxuXHRDb21tb24gZnVuY3Rpb25zXG4qL1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG4vKlxuXHRmcmFtZXdvcmsgd2lkZSBwYXJzZXIgZm9yIGRhdGEgYWNjZXNzXG4qL1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuXG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcbi8qXG5cdGJhc2ljIGV2ZW50IGhhbmRsZXJzIGFuZCBjb3JlIGRhdGEgbW9kaWZpZXJzXG4qL1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbi8qXG5cdHNtYXJ0ZXIgaW1hZ2UgY29udHJvbFxuKi9cbmltcG9ydCBub3RJbWFnZSBmcm9tICcuL3RlbXBsYXRlL25vdEltYWdlJztcbi8qXG5cdGFwcGxpY2F0aW9uIG1haW4gaW5mcmFzdHJ1Y3R1cmUgc2V0dGVyXG4qL1xuaW1wb3J0IG5vdEFwcCBmcm9tICcuL25vdEFwcCc7XG4vKlxuXHRkYWRkeSBmb3IgdXNlciBjb250cm9sbGVyc1xuKi9cbmltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4vbm90Q29udHJvbGxlcic7XG4vKlxuXHR0ZW1wbGF0aW5nIGFuZCBjb21tb24gc3RydWN0dXJlc1xuKi9cblxuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vdGVtcGxhdGUvbm90UmVuZGVyZXInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JzsgLy8gc21hcnRlciB3aXRoIGJpbmRpbmdzIGZvciBldmVudHMsIGFjdHVhbHkgcHJveHlcblxuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi9jb21wb25lbnRzL25vdEZvcm0nO1xuaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4vY29tcG9uZW50cy9ub3RUYWJsZSc7XG5pbXBvcnQgbm90VmlldyBmcm9tICcuL2NvbXBvbmVudHMvbm90Vmlldyc7XG5cbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnOyAvL1x0aG93IHRvIGludGVyYWN0IHdpdGggZGF0YSBvbiBzZXJ2ZXJcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnOyAvL1x0d3JhcHBlciBmb3IgZGF0YSB3aXRoIHNlcnZlcjwtPnZpZXcgbGl2ZSBpbnRlcmFjdGlvbnNcblxubm90VGVtcGxhdGVQcm9jZXNzb3JzLmFkZChub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIpO1xuXG5leHBvcnQge1xuXHRub3RDb21tb24sXG5cdG5vdFBhdGgsXG5cdG5vdEJhc2UsXG5cdG5vdEltYWdlLFxuXHRub3RBcHAsXG5cdG5vdEFQSSxcblx0bm90Q29udHJvbGxlcixcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIsXG5cdG5vdFRlbXBsYXRlQ2FjaGUsXG5cdG5vdFJlbmRlcmVyLFxuXHRub3RDb21wb25lbnQsXG5cdG5vdEZvcm0sXG5cdG5vdFJvdXRlcixcblx0bm90VGFibGUsXG5cdG5vdFZpZXcsXG5cdG5vdFJlY29yZCxcblx0bm90UmVjb3JkSW50ZXJmYWNlXG59O1xuIl0sIm5hbWVzIjpbIkNvbW1vbk5ldHdvcmsiLCJ1cmkiLCJnZXQiLCJkYXRhQXJyYXkiLCJmaWVsZHMiLCJpIiwiZiIsImhhc093blByb3BlcnR5IiwiaW1hZ2UiLCJJbWFnZSIsInNldEF0dHJpYnV0ZSIsInNyYyIsImluZGV4T2YiLCJhZGRQcm90b2NvbCIsInVwbG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvblByb2dyZXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3BvbnNlVHlwZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsIndpdGhDcmVkZW50aWFscyIsIm9wZW4iLCJ1cmwiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZ2V0U2Vzc2lvbklEIiwiZmlsZSIsInR5cGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJuYW1lIiwic2VuZCIsIm1ldGhvZCIsImRhdGEiLCJvbmxvYWQiLCJ0Iiwib25lcnJvciIsIm9udGltZW91dCIsInBhcnNlSW50IiwicmVzcG9uc2VUZXh0IiwiZSIsImdldENvb2tpZSIsInZhbHVlIiwiZG9jdW1lbnQiLCJjb29raWUiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwicG9wIiwic2hpZnQiLCJDb21tb25Mb2dzIiwibG9nIiwiYXJndW1lbnRzIiwiZXJyb3IiLCJ0cmFjZSIsIk1BTkFHRVIiLCJTeW1ib2wiLCJDb21tb25TaG9ydHMiLCJnZXRNYW5hZ2VyIiwiZ2V0QVBJIiwidiIsIkNvbW1vbk9iamVjdHMiLCJkZWZhdWx0cyIsIm9wdGlvbnMiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0Iiwic291cmNlcyIsImZvckVhY2giLCJkZXNjcmlwdG9ycyIsImtleXMiLCJzb3VyY2UiLCJyZWR1Y2UiLCJrZXkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJkZXNjcmlwdG9yIiwic3ltIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJiaWciLCJzbWFsbCIsIm9iaiIsImZpbHRlciIsImNvbnRhaW5zT2JqIiwiaWNvbnMiLCJiYXRjaCIsImdldERhdGEiLCJwdXNoIiwiYSIsImIiLCJwIiwiZXF1YWwiLCJ0b1N0cmluZyIsImRlZmF1bHRWYWx1ZSIsIm9iajEiLCJvYmoyIiwialF1ZXJ5IiwiZXh0ZW5kIiwidmFsIiwicmVnaXN0cnkiLCJDb21tb25TdHJpbmdzIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIkNvbW1vbkFwcCIsInN0YXJ0ZXIiLCJub3RDb21tb24iLCJhc3NpZ24iLCJleHRlbmRXaXRoIiwiU1VCX1BBVEhfU1RBUlQiLCJTVUJfUEFUSF9FTkQiLCJQQVRIX1NQTElUIiwiUEFUSF9TVEFSVF9PQkpFQ1QiLCJQQVRIX1NUQVJUX0hFTFBFUlMiLCJGVU5DVElPTl9NQVJLRVIiLCJNQVhfREVFUCIsIm5vdFBhdGgiLCJwYXRoIiwic3ViUGF0aCIsImZpbmQiLCJzdWIiLCJwYXJzZWQiLCJzdWJmIiwicmVwbGFjZSIsIml0ZW0iLCJoZWxwZXJzIiwic3ViUGF0aFBhcnNlZCIsImZpbmROZXh0U3ViUGF0aCIsImdldFZhbHVlQnlQYXRoIiwicmVwbGFjZVN1YlBhdGgiLCJwYXJzZVN1YnMiLCJhdHRyVmFsdWUiLCJzZXRWYWx1ZUJ5UGF0aCIsImlzUmVjb3JkIiwibm9ybWlsaXplUGF0aCIsInRyaWdnZXIiLCJzZXQiLCJzdGVwIiwiaGVscGVyIiwiclN0ZXAiLCJ1bmRlZmluZWQiLCJBcnJheSIsImlzQXJyYXkiLCJwYXJzZVBhdGhTdGVwIiwib2JqZWN0IiwiYXR0clBhdGgiLCJhdHRyTmFtZSIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfTUVUSE9EX0lOSVQiLCJNRVRBX0VWRU5UUyIsIk1FVEFfREFUQSIsIk1FVEFfV09SS0lORyIsIk1FVEFfT1BUSU9OUyIsIm5vdEJhc2UiLCJpbnB1dCIsImV2ZW50cyIsIm9uIiwic2V0RGF0YSIsInNldFdvcmtpbmciLCJ3b3JraW5nIiwic2V0T3B0aW9ucyIsIndoYXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsImZyb20iLCJldmVudE5hbWUiLCJldmVudCIsIm9mZiIsImNhbGxiYWNrcyIsImNhbGxiYWNrIiwidGFyZ2V0SWQiLCJzcGxpY2UiLCJPUFRfTU9ERV9ISVNUT1JZIiwiT1BUX01PREVfSEFTSCIsIk9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMIiwibm90Um91dGVyIiwicm9vdCIsImNsZWFyU2xhc2hlcyIsInJlIiwiaGFuZGxlciIsInJ1bGUiLCJhZGQiLCJwYXJhbSIsInIiLCJmcmFnbWVudCIsImxvY2F0aW9uIiwiZGVjb2RlVVJJIiwicGF0aG5hbWUiLCJzZWFyY2giLCJ3aW5kb3ciLCJtYXRjaCIsImhyZWYiLCJjdXJyZW50IiwiZ2V0RnJhZ21lbnQiLCJpbml0IiwiaXNJbml0aWFsaXplZCIsImNoZWNrIiwic2V0SW5pdGlhbGl6ZWQiLCJsb29wSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNoZWNrTG9jYXRpb24iLCJiaW5kIiwiaHJlZkNsaWNrIiwiZnVsbFJFIiwiYXBwbHkiLCJob3N0IiwicHVzaFN0YXRlIiwiZ2V0RnVsbFJvdXRlIiwiYm9keSIsImdldEFsbExpbmtzIiwiaW5pdFJlcm91dGluZyIsImdldEF0dHJpYnV0ZSIsImxpbmsiLCJub3RSb3V0ZXJJbml0aWFsaXplZCIsImZ1bGxMaW5rIiwicHJldmVudERlZmF1bHQiLCJuYXZpZ2F0ZSIsIm5vdEFQSU9wdGlvbnMiLCJub3RBUElRdWVlIiwicmVxdWVzdHNQZXJTZWNvbmQiLCJxdWVlIiwiaW50IiwiaW5Qcm9ncmVzcyIsInRvQ2FsbCIsImNsZWFySW50ZXJ2YWwiLCJydW4iLCJub3RBUEkiLCJpZCIsImdvb2QiLCJiYWQiLCJtYWtlUmVxdWVzdCIsInJlc3BvbnNlT0siLCJyZXNwb25zZUZhaWxlZCIsInJlcXVlc3RKU09OIiwidGhlbiIsIm5leHQiLCJjYXRjaCIsImNvZGUiLCJnZXRJZCIsIm1vZGVsTmFtZSIsImdldE1vZGVsTmFtZSIsIm1ha2VVcmwiLCJnZXRKU09OIiwiZ2V0TW9kZWwiLCJzZXRQcmljZSIsIm1vZGVsIiwibm90SW1hZ2UiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgiLCJURU1QTEFURV9UQUciLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCIsIkNPTVBPTkVOVF9JRF9QUkVGSVgiLCJQQVJUX0lEX1BSRUZJWCIsIkRFRkFVTFRfUExBQ0VSIiwiREVGQVVMVF9QTEFDRVJfTE9PUCIsIk9QVFMiLCJNRVRBX0NBQ0hFIiwibm90VGVtcGxhdGVDYWNoZSIsImhpZGVUZW1wbGF0ZXMiLCJyZWdpc3RlciIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJtYXAiLCJsb2FkT25lIiwib1JlcXVlc3QiLCJkaXYiLCJkYXRhc2V0Iiwibm90VGVtcGxhdGVOYW1lIiwibm90VGVtcGxhdGVVUkwiLCJzcmNFbGVtZW50Iiwic2V0T25lIiwiZWxlbWVudCIsImNsb25lTm9kZSIsImNvbnQiLCJ0ZXh0Iiwibm90VGVtcGxhdGVzRWxlbWVudHMiLCJlbElkIiwicGFyZW50Tm9kZSIsImxpYiIsImdldEhUTUwiLCJ0ZW1wbGF0ZUlubmVySFRNTCIsInRlbXBsYXRlQ29udEVsIiwid3JhcCIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZIiwiREVGQVVMVF9GSUxURVIiLCJERUZBVUxUX1BBR0VfTlVNQkVSIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJub3RJbnRlcmZhY2UiLCJtYW5pZmVzdCIsImxpbmUiLCJyZWNvcmQiLCJhY3Rpb25OYW1lIiwicmVjb3JkUkUiLCJmaWVsZE5hbWUiLCJpbmQiLCJsZW4iLCJpbmQyIiwic3RhcnRTbGljZSIsImVuZFNsaWNlIiwiZ2V0QXR0ciIsImFjdGlvbkRhdGEiLCJwYXJzZUxpbmUiLCJwb3N0Rml4IiwicmVzdWx0SWQiLCJwcmVmaXhlcyIsImluZGV4IiwiY29uY2F0IiwicHJlIiwiZ2V0QWN0aW9ucyIsImFjdGlvbnMiLCJzZXRGaWx0ZXIiLCJmaWx0ZXJEYXRhIiwic29ydGVyRGF0YSIsInBhZ2VOdW1iZXIiLCJwYWdlU2l6ZSIsInNldFBhZ2VyIiwicmVxdWVzdERhdGEiLCJkYXRhUHJvdmlkZXJOYW1lIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwiZ2V0QWN0aW9uRGF0YSIsInJlcXVlc3RQYXJhbXMiLCJjb2xsZWN0UmVxdWVzdERhdGEiLCJyZXF1ZXN0UGFyYW1zRW5jb2RlZCIsImVuY29kZVJlcXVlc3QiLCJnZXRJRCIsImdldFVSTCIsInF1ZWVSZXF1ZXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsImFmdGVyU3VjY2Vzc1JlcXVlc3QiLCJyZXBvcnQiLCJub3RSZWNvcmQiLCJNRVRBX0lOVEVSRkFDRSIsIk1FVEFfUFJPWFkiLCJNRVRBX0NIQU5HRSIsIk1FVEFfQ0hBTkdFX05FU1RFRCIsIk1FVEFfU0FMIiwiTUVUQV9NQVBfVE9fSU5URVJGQUNFIiwiREVGQVVMVF9BQ1RJT05fUFJFRklYIiwiTUVUQV9SRVRVUk5fVE9fUk9PVCIsImNyZWF0ZVByb3BlcnR5SGFuZGxlcnMiLCJvd25lciIsImNvbnRleHQiLCJyZXNUYXJnZXQiLCJSZWZsZWN0IiwiRXJyb3IiLCJ2YWx1ZVRvUmVmbGVjdCIsIm5vdFByb3BlcnR5IiwiZ2V0Um9vdCIsInBhdGhUbyIsImlzUHJveHkiLCJpc1Byb3BlcnR5IiwiUHJveHkiLCJwcm94eSIsImNyZWF0ZVJlY29yZEhhbmRsZXJzIiwiY3JlYXRlQ29sbGVjdGlvbiIsIm5vdFJlY29yZEludGVyZmFjZSIsImluaXRQcm9wZXJ0aWVzIiwiaW50ZXJmYWNlVXAiLCJjdXJQYXRoIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsIml0ZW1zIiwiY29sbGVjdGlvbiIsImdldEFjdGlvbnNDb3VudCIsImFjdGlvblVwIiwicmVxdWVzdCIsIm9iamVjdFBhcnQiLCJzZXRBdHRyIiwic2V0RmluZEJ5IiwicmVzZXRGaWx0ZXIiLCJnZXRGaWx0ZXIiLCJzZXRTb3J0ZXIiLCJnZXRTb3J0ZXIiLCJzZXRQYWdlTnVtYmVyIiwic2V0UGFnZVNpemUiLCJyZXNldFBhZ2VyIiwiZ2V0UGFnZXIiLCJPUFRfQ09OVFJPTExFUl9QUkVGSVgiLCJPUFRfUkVDT1JEX1BSRUZJWCIsIm5vdEFwcCIsInJlc291cmNlcyIsInByZUluaXRSb3V0ZXIiLCJpbml0TWFuYWdlciIsImluaXRBUEkiLCJpbml0VGVtcGxhdGVzIiwic2V0TWFuYWdlciIsImFwaSIsInNldEFQSSIsInByb20iLCJhZGRMaWJGcm9tVVJMIiwiaW5pdE1hbmlmZXN0Iiwic2V0SW50ZXJmYWNlTWFuaWZlc3QiLCJzZXRSb290IiwicmVSb3V0ZUV4aXN0ZWQiLCJyb3V0aWVJbnB1dCIsInJvdXRlQmxvY2siLCJwYXRocyIsImNvbnRyb2xsZXIiLCJiaW5kQ29udHJvbGxlciIsImFkZExpc3QiLCJsaXN0ZW4iLCJ1cGRhdGUiLCJ1cGRhdGVJbnRlcmZhY2VzIiwiaW5pdENvbnRyb2xsZXIiLCJhbGxSZXNvdXJjZXNSZWFkeSIsInN0YXJ0QXBwIiwiaW5pdFJvdXRlciIsImNvbnRyb2xsZXJOYW1lIiwiYXBwIiwiY3RybCIsImNsZWFySW50ZXJmYWNlcyIsIm1hbmlmZXN0cyIsInJlY29yZE1hbmlmZXN0IiwicmVjb3JkRGF0YSIsIm9uUmVzb3VyY2VSZWFkeSIsIk1FVEFfUFJPQ0VTU09SUyIsIm5vdFRlbXBsYXRlUHJvY2Vzc29ycyIsInNldFByb2Nlc3NvciIsImdldFByb2Nlc3NvciIsIk1FVEFfQ09NUE9ORU5UUyIsIm5vdFJlbmRlcmVyIiwicmVuZGVyIiwiY29tcG9uZW50IiwiaW5pdERhdGEiLCJpbml0T3B0aW9ucyIsImluaXRXb3JraW5nIiwidGVtcGxhdGUiLCJpbml0VGVtcGxhdGUiLCJvbkNoYW5nZSIsIk1hdGgiLCJyYW5kb20iLCJnZXRCcmVhZENydW1wcyIsImNsZWFyU3Rhc2giLCJzZXRXb3JraW5nTWFwcGluZyIsImV4ZWNQcm9jZXNzb3JzIiwic2VhcmNoRm9yU3ViVGVtcGxhdGVzIiwic3Rhc2hSZW5kZXJlZCIsImlmUGFydCIsImNvbXBvbmVudFBhdGgiLCJjaGFuZ2VkUGF0aCIsImlmRnVsbFN1YlBhdGgiLCJjcmVhdGVNYXBwaW5nIiwiZmluZEFsbFByb2Nlc3NvcnMiLCJwcm9jcyIsImVscyIsImdldEF0dHJpYnV0ZXNTdGFydHNXaXRoIiwiZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCIsInByb2NEYXRhIiwicGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uIiwicHJvY2Vzc29yRXhwcmVzc2lvbiIsImF0dHJpYnV0ZUV4cHJlc3Npb24iLCJpZkNvbmRpdGlvbiIsInBhcmFtcyIsInByb2Nlc3Nvck5hbWUiLCJtYXBwaW5nIiwicHJvY1Njb3BlIiwiYXR0cmlidXRlUmVzdWx0IiwiZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdCIsInByb2NOYW1lIiwicHJvYyIsInJlbW92ZUF0dHJpYnV0ZSIsImRlc3Ryb3lTdWJzIiwiZGVzdHJveSIsImNsZWFyU3ViVGVtcGxhdGVzIiwiZ2V0U3Rhc2giLCJyZW1vdmVDaGlsZCIsIm50RWwiLCJudFJlbmRlcmVkIiwic3VicyIsIm50IiwiaWZTdWJFbGVtZW50UmVuZGVyZWQiLCJyZW5kZXJTdWIiLCJkZXRhaWxzIiwiZGF0YVBhdGgiLCJub3RDb21wb25lbnQiLCJjaGlsZE5vZGVzIiwiYWRkVG9TdGFzaCIsInN0YXNoIiwibmV3U3Rhc2giLCJhbmNob3IiLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsIm5vZGUiLCJwbGFjZSIsInRhcmdldEVsIiwibCIsImNoaWxkcmVuIiwidGV4dENvbnRlbnQiLCJyZW5kZXJlZCIsInBsYWNlQWZ0ZXIiLCJwbGFjZUJlZm9yZSIsInBsYWNlRmlyc3QiLCJwbGFjZUxhc3QiLCJub3RQbGFjZXJzIiwiTUVUQV9QQVJUUyIsInJlc2V0UGFydHMiLCJwcmVwYXJlVGVtcGxhdGVFbGVtZW50IiwiaW5pdE1hcmtFbGVtZW50IiwibWFya0VsIiwicGxhY2VyIiwiZ2V0UGxhY2VyIiwidGFyZ2V0UXVlcnkiLCJtYWluIiwidW5zZXRSZWFkeSIsImh0bWwiLCJzZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImFkZEZyb21VUkwiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImNsZWFyUGFydHMiLCJmb3JFYWNoRGF0YSIsInJlbmRlclBhcnQiLCJwbGFjZVJlbmRlcmVkIiwicmVtb3ZlT2Jzb2xldGVQYXJ0cyIsImJlZm9yZSIsInBsYWNlUGFydCIsImFmdGVyIiwicGFydCIsImdldFBhcnRCeURhdGEiLCJub2RlcyIsImxhc3ROb2RlIiwibm9kZVR5cGUiLCJnZXRQYXJ0cyIsInJlbmRlcmVyIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSIsImFkZFBhcnQiLCJ1cGRhdGVQYXJ0IiwicGlwZSIsImZpbmRBY3R1YWxQYXJ0cyIsInJlbW92ZU5vdEFjdHVhbFBhcnRzIiwiYWN0dWFsUGFydHMiLCJpc0RhdGEiLCJPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IiLCJPUFRfREVGQVVMVF9WSUVXU19QT1NURklYIiwiT1BUX0RFRkFVTFRfVklFV19OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMIiwiT1BUX0RFRkFVTFRfUExVUkFMX05BTUUiLCJPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSIsIk9QVF9ERUZBVUxUX01PRFVMRV9OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0FORCIsIm5vdENvbnRyb2xsZXIiLCJpbml0UmVuZGVyIiwiaW50ZXJmYWNlcyIsImdldEludGVyZmFjZXMiLCJtYWtlIiwidmlld05hbWUiLCJ2aWV3IiwiZ2V0VmlldyIsInRlbXBsYXRlVVJMIiwicHJlZml4IiwiY29tbW9uIiwiZ2V0TW9kdWxlUHJlZml4IiwicG9zdGZpeCIsInRlbXBsYXRlTmFtZSIsInJlbmRlckFuZCIsInZpZXdzIiwiZ2V0TW9kdWxlTmFtZSIsIm5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiIsInNjb3BlIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwibGl2ZUV2ZW50cyIsIm9uRXZlbnQiLCJjaGVja2VkIiwiZmllbGQiLCJzZWxlY3RlZCIsInNlbGVjdGVkT3B0aW9ucyIsInByb2Nlc3NlZFZhbHVlIiwiaXNOYU4iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ1c2VkIiwib3B0aW9uIiwidmFsdWVGaWVsZE5hbWUiLCJsYWJlbEZpZWxkTmFtZSIsIml0ZW1WYWx1ZUZpZWxkTmFtZSIsImRlZmF1bHQiLCJwbGFjZWhvbGRlciIsImFycmF5IiwiT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgiLCJPUFRfREVGQVVMVF9ST0xFX05BTUUiLCJPUFRfREVGQVVMVF9GT1JNX1RJVExFIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiIsIk9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUIiwibm90Rm9ybSIsIm9uU3VibWl0Iiwib25SZXNldCIsIm9uQ2FuY2VsIiwiZ2V0TWFuaWZlc3QiLCJyb2xlIiwicmVuZGVyV3JhcHBlciIsImZvcm1QYXJ0IiwiZ2V0V3JhcHBlckRhdGEiLCJnZXRQYXJ0VGVtcGxhdGVOYW1lIiwiYmluZEZvcm1FdmVudHMiLCJyZW5kZXJDb21wb25lbnRzIiwid3JhcHBlciIsInRpdGxlIiwiZ2V0Rm9ybUZpZWxkc0xpc3QiLCJhZGRGaWVsZENvbXBvbmVudCIsImNvbXBzIiwiZ2V0QXBwIiwiZGVmIiwiZmllbGRzTGlicyIsImdldEZpZWxkc0xpYnMiLCJmaWVsZFR5cGUiLCJnZXRGaWVsZHNEZWZpbml0aW9uIiwicmVjIiwibGFiZWwiLCJnZXRGb3JtVGFyZ2V0RWxlbWVudCIsImNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMiLCJmb3JtIiwiT1BUX0RFRkFVTFRfUEFHRV9TSVpFIiwiT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIiLCJPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTiIsIk9QVF9ERUZBVUxUX1NPUlRfRklFTEQiLCJPUFRfRklFTERfTkFNRV9QUkVfUFJPQyIsIm5vdFRhYmxlIiwicm93cyIsInJlc2V0U29ydGVyIiwicmVuZGVySW5zaWRlIiwicmVuZGVySGVhZGVyIiwidXBkYXRlRGF0YSIsInJlbmRlckJvZHkiLCJiaW5kU2VhcmNoIiwiYmluZEN1c3RvbUJpbmRpbmdzIiwidGFibGVIZWFkZXIiLCJuZXdUaCIsInNvcnRhYmxlIiwiYXR0YWNoU29ydGluZ0hhbmRsZXJzIiwiaGVhZENlbGwiLCJjaGFuZ2VTb3J0aW5nT3B0aW9ucyIsInN0eWxlIiwiY3Vyc29yIiwic29ydEJ5RmllbGQiLCJzb3J0RGlyZWN0aW9uIiwiaGFzaCIsImludmFsaWRhdGVEYXRhIiwiZmlsdGVyU2VhcmNoIiwiaWZVcGRhdGluZyIsInF1ZXJ5Iiwic2V0VXBkYXRpbmciLCIkbGlzdCIsInByb2NjZXNzRGF0YSIsInJlZnJlc2hCb2R5Iiwic2V0VXBkYXRlZCIsInRoYXRGaWx0ZXIiLCJ0ZXN0RGF0YUl0ZW0iLCJ0aGF0U29ydGVyIiwic29ydCIsIml0ZW0xIiwiaXRlbTIiLCJ0MSIsInQyIiwibG9jYWxlQ29tcGFyZSIsInNlYXJjaEVsIiwiY3VycmVudFRhcmdldCIsInNlbGVjdG9yIiwiZ2V0T3B0aW9uIiwibmV3Um93IiwibmV3VGQiLCJwcmVwcm9jZXNzZWQiLCJpdGVtSWQiLCJ0Ym9keSIsImZpbmRCb2R5IiwiY2xlYXJCb2R5IiwiY2hlY2tGaWx0ZXJlZCIsInRoaXNQYWdlU3RhcnRzIiwibmV4dFBhZ2VFbmRzIiwibWluIiwicmVuZGVyUm93IiwidGFibGVCb2R5Iiwic3RyVmFsdWUiLCJnZXRGaWx0ZXJTZWFyY2giLCJrIiwidG9Db21wIiwibm90VmlldyJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBSUEsZ0JBQWdCO1VBQ1YsaUJBQVNDLEdBQVQsRUFBYztTQUNmLEtBQUtDLEdBQUwsQ0FBUyxNQUFULElBQW1CRCxHQUExQjtFQUZrQjtjQUlOLHFCQUFTQSxHQUFULEVBQWM7U0FDbkIsS0FBS0MsR0FBTCxDQUFTLFVBQVQsSUFBdUJELEdBQTlCO0VBTGtCO2dCQU9KLHVCQUFTRSxT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
