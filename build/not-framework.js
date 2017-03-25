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
					if (this.hasOwnProperty(dataProviderName) && typeof this[dataProviderName] === 'function') {
						requestData = notCommon.extend(requestData, this[dataProviderName]());
					}
				}
			}
			return requestData;
		}

		//return Promise

	}, {
		key: 'request',
		value: function request(record, actionName) {
			var _this2 = this;

			var actionData = this.getActionData(actionName),
			    requestData = this.collectRequestData(actionData),
			    id = this.getID(record, actionData, actionName),
			    url = this.getURL(record, actionData, actionName);
			return notCommon.getAPI().queeRequest(actionData.method, url, id, JSON.stringify(notCommon.extend(requestData, record.getData()))).then(function (data) {
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
		value: function isData(data) {
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
			if (parseInt(el.dataset.sortingDirection) === 0) {
				el.dataset.sortingDirection = 1;
			} else {
				el.dataset.sortingDirection = parseInt(el.dataset.sortingDirection) * -1;
			}
			if (el.parentNode) {
				for (var i = 0; i < el.parentNode.children.length; i++) {
					if (el.parentNode.children[i] === el) {
						continue;
					}
					el.parentNode.children[i].classList.remove('sorting_asc');
					el.parentNode.children[i].classList.remove('sorting_desc');
				}
			}
			if (parseInt(el.dataset.sortingDirection) > 0) {
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
			this.getWorking('updating', false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdEZvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFZpZXcuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSkge1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvciAodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IgKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwdXRGaWxlKHVwbG9hZCAvKiBvYmplY3QoZmlsZSwgb25Qcm9ncmVzcywgdXJsKSovICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRpZiAoeGhyLnVwbG9hZCkge1xuXHRcdFx0XHQvLyBwcm9ncmVzcyBiYXJcblx0XHRcdFx0aWYgKHVwbG9hZC5vblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZC5vblByb2dyZXNzLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCAvKmUqLyApIHtcblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh4aHIuc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0Ly8gc3RhcnQgdXBsb2FkXG5cdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0XHR4aHIub3BlbignUFVUJywgdXBsb2FkLnVybCwgdHJ1ZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignWF9GSUxFTkFNRScsIGVuY29kZVVSSUNvbXBvbmVudCh1cGxvYWQuZmlsZS5uYW1lKSk7XG5cdFx0XHRcdHhoci5zZW5kKHVwbG9hZC5maWxlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUFVUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChwYXJzZUludChzdGF0dXMpID09PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoZSkgPT4gcmVqZWN0KGUpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0U2Vzc2lvbklEOiBmdW5jdGlvbihuYW1lID0gJ1Nlc3Npb25JRCcpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb29raWUobmFtZSk7XG5cdH0sXG5cdGdldENvb2tpZTogKG5hbWUpID0+IHtcblx0XHRsZXQgdmFsdWUgPSAnOyAnICsgZG9jdW1lbnQuY29va2llLFxuXHRcdFx0cGFydHMgPSB2YWx1ZS5zcGxpdCgnOyAnICsgbmFtZSArICc9Jyk7XG5cdFx0aWYgKHBhcnRzLmxlbmd0aCA9PSAyKSB7XG5cdFx0XHRyZXR1cm4gcGFydHMucG9wKCkuc3BsaXQoJzsnKS5zaGlmdCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbk5ldHdvcms7XG4iLCJ2YXIgQ29tbW9uTG9ncyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fSxcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHRyYWNlOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbk9iamVjdHM7XG4iLCJ2YXIgQ29tbW9uU3RyaW5ncyA9IHtcblx0Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG5cdH0sXG5cdGxvd2VyRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblN0cmluZ3M7XG4iLCJ2YXIgQ29tbW9uRnVuY3Rpb25zID0ge1xuXHRwaXBlOiBmdW5jdGlvbihkYXRhLyogZmVlZCBkYXRhICovLCBmdW5jcy8qIGZ1bmN0aW9ucyBhcnJheSAqLykge1xuXHRcdGxldCByZXN1bHQ7XG5cdFx0Zm9yKGxldCBmdW5jIG9mIGZ1bmNzKXtcblx0XHRcdHJlc3VsdCA9IGZ1bmMocmVzdWx0IHx8IGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRnVuY3Rpb25zO1xuIiwidmFyIENvbW1vbkRPTSA9IHtcblx0Z2V0QXR0cmlidXRlc1N0YXJ0c1dpdGg6IGZ1bmN0aW9uKGVsLCBzdGFydHNXaXRoKSB7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihzdGFydHNXaXRoKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkRPTTtcbiIsInZhciBDb21tb25BcHAgPSB7XG5cdHN0YXJ0QXBwOiAoc3RhcnRlcik9Pntcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc3RhcnRlcik7XG5cdH0sXG5cdGdldEFwcDogZnVuY3Rpb24oKXtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ2FwcCcpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25BcHA7XG4iLCJpbXBvcnQgQ29tbW9uTmV0d29yayBmcm9tICcuL25ldC5qcyc7XG5pbXBvcnQgQ29tbW9uTG9ncyBmcm9tICcuL2xvZ3MuanMnO1xuaW1wb3J0IENvbW1vblNob3J0cyBmcm9tICcuL3Nob3J0cy5qcyc7XG5pbXBvcnQgQ29tbW9uT2JqZWN0cyBmcm9tICcuL29iamVjdHMuanMnO1xuaW1wb3J0IENvbW1vblN0cmluZ3MgZnJvbSAnLi9zdHJpbmdzLmpzJztcbmltcG9ydCBDb21tb25GdW5jdGlvbnMgZnJvbSAnLi9mdW5jdGlvbnMuanMnO1xuaW1wb3J0IENvbW1vbkRPTSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgQ29tbW9uQXBwIGZyb20gJy4vYXBwLmpzJztcblxuLypcblx00YHQv9C40YHQvtC6INGC0L7Qs9C+INGH0YLQviDQvdGD0LbQvdC+INC/0L7QtNC60LvRjtGH0LjRgtGMINC60LDQuiDQvtCx0YnQuNC1XG4qL1xudmFyIG5vdENvbW1vbiA9IE9iamVjdC5hc3NpZ24oe30sIENvbW1vbk9iamVjdHMpO1xuXG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25OZXR3b3JrKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblN0cmluZ3MpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uTG9ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25TaG9ydHMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRnVuY3Rpb25zKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkRPTSk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25BcHApO1xuXG5leHBvcnQgZGVmYXVsdCBub3RDb21tb247XG4iLCIvKlxuXHQ6cHJvcGVydHkuc3ViMS5mdW5jKCkuZnVuY1Byb3Bcblx0ID0gcmV0dXJuIGZ1bmNQcm9wIG9mIGZ1bmN0aW9uIHJlc3VsdCBvZiBzdWIxIHByb3BlcnR5IG9mIHByb3BlcnR5IG9mIG9iamVjdFxuXHQ6ezo6aGVscGVyVmFsfS5zdWJcblx0ID0gcmV0dXJuIHN1YiBwcm9wZXJ0eSBvZiBvYmplY3QgcHJvcGVydHkgd2l0aCBuYW1lIHJldHJpZXZlZCBmcm9tIGhlbHBlclZhbCBwcm9wZXJ0eSBvZiBoZWxwZXJzIG9iamVjdFxuXHQ6ezo6aGVscGVyRnVuYygpfS5zdWJcblx0PSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIGZ1bmN0aW9uIHJlc3VsdCBvZiBoZWxwZXJzIG9iamVjdC5cblx0aWYgaGVscGVyc0Z1bnggcmV0dXJuICdjYXInIHRoZW4gc291cmNlIHBhdGggYmVjb21lcyA6Y2FyLnN1YlxuXG4qL1xuXG5jb25zdCBTVUJfUEFUSF9TVEFSVCA9ICd7Jyxcblx0U1VCX1BBVEhfRU5EID0gJ30nLFxuXHRQQVRIX1NQTElUID0gJy4nLFxuXHRQQVRIX1NUQVJUX09CSkVDVCA9ICc6Jyxcblx0UEFUSF9TVEFSVF9IRUxQRVJTID0gJzo6Jyxcblx0RlVOQ1RJT05fTUFSS0VSID0gJygpJyxcblx0TUFYX0RFRVAgPSAxMDtcblxuY2xhc3Mgbm90UGF0aHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQvKlxuXHRcdGlucHV0ICc6ezo6aGVscGVyVmFsfS5zdWInXG5cdFx0cmV0dXJuIDo6aGVscGVyVmFsXG5cdCovXG5cdGZpbmROZXh0U3ViUGF0aChwYXRoLyogc3RyaW5nICovKXtcblx0XHRsZXQgc3ViUGF0aCA9ICcnLFxuXHRcdFx0ZmluZCA9IGZhbHNlO1xuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdGlmIChwYXRoW2ldID09PSBTVUJfUEFUSF9TVEFSVCl7XG5cdFx0XHRcdGZpbmQgPSB0cnVlO1xuXHRcdFx0XHRzdWJQYXRoID0gJyc7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0aWYocGF0aFtpXSA9PT0gU1VCX1BBVEhfRU5EICYmIGZpbmQpe1xuXHRcdFx0XHRcdGlmIChmaW5kKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3ViUGF0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHN1YlBhdGgrPXBhdGhbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZpbmQ/c3ViUGF0aDpudWxsO1xuXHR9XG5cblx0cmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViLCBwYXJzZWQpe1xuXHRcdGxldCBzdWJmID0gU1VCX1BBVEhfU1RBUlQrc3ViK1NVQl9QQVRIX0VORDtcblx0XHR3aGlsZShwYXRoLmluZGV4T2Yoc3ViZikgPiAtMSl7XG5cdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKHN1YmYsIHBhcnNlZCk7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0cGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGxldCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkLCBpID0gMDtcblx0XHR3aGlsZShzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCkpe1xuXHRcdFx0c3ViUGF0aFBhcnNlZCA9IHRoaXMuZ2V0VmFsdWVCeVBhdGgoIHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgc3ViUGF0aCk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGkrKztcblx0XHRcdGlmIChpID4gTUFYX0RFRVApe1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRnZXQocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0c3dpdGNoIChwYXRoKXtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9PQkpFQ1Q6IHJldHVybiBpdGVtO1xuXHRcdFx0Y2FzZSBQQVRIX1NUQVJUX0hFTFBFUlM6IHJldHVybiBoZWxwZXJzO1xuXHRcdH1cblx0XHRwYXRoID0gdGhpcy5wYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0VmFsdWVCeVBhdGgocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUyk+LTE/aGVscGVyczppdGVtLCBwYXRoKTtcblx0fVxuXG5cdHNldChwYXRoLCBpdGVtLCBoZWxwZXJzLCBhdHRyVmFsdWUpe1xuXHRcdGxldCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkLCBpID0gMDtcblx0XHR3aGlsZShzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCkpe1xuXHRcdFx0c3ViUGF0aFBhcnNlZCA9IHRoaXMuZ2V0VmFsdWVCeVBhdGgoIHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgc3ViUGF0aCk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGlmIChpID4gTUFYX0RFRVApe1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdGlmIChpdGVtLmlzUmVjb3JkICYmIHRoaXMubm9ybWlsaXplUGF0aChwYXRoKS5sZW5ndGggPiAxKSB7XG5cdFx0XHRpdGVtLnRyaWdnZXIoJ2NoYW5nZScsIGl0ZW0sIHBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0dW5zZXQocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0dGhpcy5zZXQocGF0aCwgaXRlbSwgaGVscGVycywgbnVsbCk7XG5cdH1cblxuXHRwYXJzZVBhdGhTdGVwKHN0ZXAsIGl0ZW0sIGhlbHBlcil7XG5cdFx0bGV0IHJTdGVwID0gbnVsbDtcblx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKSA9PT0gMCAmJiBoZWxwZXIpe1xuXHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9IRUxQRVJTLCAnJyk7XG5cdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdGlmKGhlbHBlci5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPT09IDAgJiYgaXRlbSl7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCAnJyk7XG5cdFx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRcdGlmKGl0ZW0uaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBzdGVwO1xuXHR9XG5cblx0Ly86OmZpZWxkTmFtZS5yZXN1bHRcblx0Ly97fVxuXHQvL3tmaWVsZE5hbWU6ICd0YXJnZXRSZWNvcmRGaWVsZCd9XG5cdC8vLy9bJ3RhcmdldFJlY29yZEZpZWxkJywgJ3Jlc3VsdCddXG5cdHBhcnNlUGF0aChwYXRoLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRwYXRoID0gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0cGF0aFtpXSA9IHRoaXMucGFyc2VQYXRoU3RlcChwYXRoW2ldLCBpdGVtLCBoZWxwZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdG5vcm1pbGl6ZVBhdGgocGF0aCl7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cmV0dXJuIHBhdGg7XG5cdFx0fWVsc2V7XG5cdFx0XHR3aGlsZShwYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID4gLTEpe1xuXHRcdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCcnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0c21hbGwgPSBbXCJ0b2RvXCJdLFxuXHRcdGJpZyA9IFtcInRvZG9cIiwgXCJsZW5ndGhcIl1cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHQqL1xuXG5cdGlmRnVsbFN1YlBhdGgoYmlnLCBzbWFsbCl7XG5cdFx0aWYgKGJpZy5sZW5ndGg8c21hbGwubGVuZ3RoKXtyZXR1cm4gZmFsc2U7fVxuXHRcdGZvcihsZXQgdCA9MDsgdCA8IHNtYWxsLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHNtYWxsW3RdICE9PSBiaWdbdF0pe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCksXG5cdFx0XHRpc0Z1bmN0aW9uID0gYXR0ck5hbWUuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpPi0xO1xuXHRcdGlmIChpc0Z1bmN0aW9uKXtcblx0XHRcdGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHR9XG5cdFx0aWYgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgdHlwZW9mIG9iamVjdFthdHRyTmFtZV0gIT09ICd1bmRlZmluZWQnICYmIG9iamVjdFthdHRyTmFtZV0gIT09IG51bGwpe1xuXHRcdFx0bGV0IG5ld09iaiA9IGlzRnVuY3Rpb24/b2JqZWN0W2F0dHJOYW1lXSgpOm9iamVjdFthdHRyTmFtZV07XG5cdFx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKG5ld09iaiwgYXR0clBhdGgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBuZXdPYmo7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdHNldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGF0dHJWYWx1ZSl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCk7XG5cdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0aWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKXtvYmplY3RbYXR0ck5hbWVdID0ge307fVxuXHRcdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChvYmplY3RbYXR0ck5hbWVdLCBhdHRyUGF0aCwgYXR0clZhbHVlKTtcblx0XHR9ZWxzZXtcblx0XHRcdG9iamVjdFthdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0am9pbigpe1xuXHRcdGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gYXJncy5qb2luKFBBVEhfU1BMSVQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RQYXRoKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE1FVEFfTUVUSE9EX0lOSVQgPSBTeW1ib2woJ2luaXQnKSxcblx0TUVUQV9FVkVOVFMgPSBTeW1ib2woJ2V2ZW50cycpLFxuXHRNRVRBX0RBVEEgPSBTeW1ib2woJ2RhdGEnKSxcblx0TUVUQV9XT1JLSU5HID0gU3ltYm9sKCd3b3JraW5nJyksXG5cdE1FVEFfT1BUSU9OUyA9IFN5bWJvbCgnb3B0aW9ucycpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHR0aGlzW01FVEFfRVZFTlRTXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9EQVRBXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9NRVRIT0RfSU5JVF0oaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0W01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KXtcblx0XHRpZiAoIWlucHV0KXtcblx0XHRcdGlucHV0ID0ge307XG5cdFx0fVxuXHRcdGlmKGlucHV0Lmhhc093blByb3BlcnR5KCdldmVudHMnKSl7XG5cdFx0XHRmb3IobGV0IHQgb2YgaW5wdXQuZXZlbnRzKXtcblx0XHRcdFx0dGhpcy5vbiguLi50KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKXtcblx0XHRcdHRoaXMuc2V0RGF0YShpbnB1dC5kYXRhKTtcblx0XHR9XG5cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnd29ya2luZycpKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhpbnB1dC53b3JraW5nKTtcblx0XHR9XG5cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKXtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucyhpbnB1dC5vcHRpb25zKTtcblx0XHR9XG5cdH1cblxuXHRzZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uICovXG5cdFx0XHRcdHdoYXQgPSBhcmdzWzBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uIGVsZW1lbnQgKi9cblx0XHRcdFx0bm90UGF0aC5zZXQoYXJnc1swXSAvKiBwYXRoICovICwgd2hhdCAvKiBjb2xsZWN0aW9uICovICwgdW5kZWZpbmVkIC8qIGhlbHBlcnMgKi8gLCBhcmdzWzFdIC8qIHZhbHVlICovICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRnZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCAqL1xuXHRcdGNhc2UgMTpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0fVxuXHRcdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggd2l0aCBkZWZhdWx0IHZhbHVlICovXG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHRcdGlmIChyZXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdC8qIG5vIGRhdGEsIHJldHVybiBkZWZhdWx0IHZhbHVlICovXG5cdFx0XHRcdFx0cmV0dXJuIGFyZ3NbMV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LyogZGF0YSwgcmV0dXJuIGl0ICovXG5cdFx0XHRcdFx0cmV0dXJuIHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0LyogcmV0dXJuIGZ1bGwgY29sbGVjdGlvbiAqL1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB3aGF0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0Q09SRSBPQkpFQ1Rcblx0XHRcdERBVEEgLSBpbmZvcm1hdGlvblxuXHRcdFx0T1BUSU9OUyAtIGhvdyB0byB3b3JrXG5cdFx0XHRXT1JLSU5HIC0gdGVtcG9yYXJpbHkgZ2VuZXJhdGVkIGluIHByb2NjZXNzXG5cdCovXG5cblx0c2V0RGF0YSgpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX0RBVEFdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldERhdGEoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldERhdGEoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9EQVRBXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldE9wdGlvbnMoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRPcHRpb25zKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX09QVElPTlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0V29ya2luZygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX1dPUktJTkddID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldFdvcmtpbmcoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRXb3JraW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfV09SS0lOR10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKlxuXHRcdEVWRU5UUyBoYW5kbGluZ1xuXHQqL1xuXG5cdG9uKGV2ZW50TmFtZXMsIGV2ZW50Q2FsbGJhY2tzLCBvbmNlKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdG5vdENvbW1vbi5kZWZpbmVJZk5vdEV4aXN0cyh0aGlzW01FVEFfRVZFTlRTXSwgbmFtZSwgW10pO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0ucHVzaCh7XG5cdFx0XHRcdGNhbGxiYWNrczogZXZlbnRDYWxsYmFja3MsXG5cdFx0XHRcdG9uY2U6IG9uY2UsXG5cdFx0XHRcdGNvdW50OiAwXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHRyaWdnZXIoKSB7XG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyksXG5cdFx0XHRldmVudE5hbWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZSkpIHtcblx0XHRcdGV2ZW50TmFtZSA9IFtldmVudE5hbWVdO1xuXHRcdH1cblx0XHRldmVudE5hbWUuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5mb3JFYWNoKGV2ZW50ID0+IHtcblx0XHRcdFx0XHRpZiAoZXZlbnQub25jZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnQuY2FsbGJhY2tzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG9mZihldmVudE5hbWVzIC8qIGFycmF5IG9mIGV2ZW50IG5hbWVzICovICwgZXZlbnRDYWxsYmFja3MgLyogYXJyYXkgb2YgY2FsbGJhY2tzICovICkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGxldCB0YXJnZXRJZCA9IC0xO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaCgoZXZlbnQsIGkpID0+IHtcblx0XHRcdFx0aWYgKGkgPT09IC0xICYmIGV2ZW50Q2FsbGJhY2tzID09PSBldmVudC5jYWxsYmFja3MpIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9IGk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRhcmdldElkID4gLTEpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uc3BsaWNlKHRhcmdldElkLCAxKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmNvbnN0IE9QVF9NT0RFX0hJU1RPUlkgPSBTeW1ib2woJ2hpc3RvcnknKSxcblx0T1BUX01PREVfSEFTSCA9IFN5bWJvbCgnaGFzaCcpLFxuXHRPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCA9IDUwO1xuXG5jbGFzcyBub3RSb3V0ZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLycsIC8vYWx3YXlzIGluIHNsYXNoZXMgL3VzZXIvLCAvLCAvaW5wdXQvLiBhbmQgbm8gL3VzZXIgb3IgaW5wdXQvbGV2ZWxcblx0XHRcdGluaXRpYWxpemVkOiBmYWxzZVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlzdG9yeSgpe1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZScsIE9QVF9NT0RFX0hJU1RPUlkpO1xuXHR9XG5cblx0aGFzaCgpe1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZScsIE9QVF9NT0RFX0hBU0gpO1xuXHR9XG5cblx0c2V0Um9vdChyb290KXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3Jvb3QnLCByb290ID8gJy8nICsgdGhpcy5jbGVhclNsYXNoZXMocm9vdCkgKyAnLycgOiAnLycpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y2xlYXJTbGFzaGVzKHBhdGgpIHtcblx0XHQvL2ZpcnN0IGFuZCBsYXN0IHNsYXNoZXMgcmVtb3ZhbFxuXHRcdHJldHVybiBwYXRoLnRvU3RyaW5nKCkucmVwbGFjZSgvXFwvJC8sICcnKS5yZXBsYWNlKC9eXFwvLywgJycpO1xuXHR9XG5cblx0YWRkKHJlLCBoYW5kbGVyKSB7XG5cdFx0aWYgKHR5cGVvZiByZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRoYW5kbGVyID0gcmU7XG5cdFx0XHRyZSA9ICcnO1xuXHRcdH1cblx0XHRsZXQgcnVsZSA9IHtcblx0XHRcdHJlOiByZSxcblx0XHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0XHR9O1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykucHVzaChydWxlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZExpc3QobGlzdCkge1xuXHRcdGZvciAobGV0IHQgaW4gbGlzdCkge1xuXHRcdFx0dGhpcy5hZGQodCwgbGlzdFt0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVtb3ZlKHBhcmFtKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIHI7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aCwgciA9IHRoaXMuZ2V0V29ya2luZygncm91dGVzJylbaV07IGkrKykge1xuXHRcdFx0aWYgKHIuaGFuZGxlciA9PT0gcGFyYW0gfHwgci5yZSA9PT0gcGFyYW0pIHtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGZsdXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyb3V0ZXM6IFtdLFxuXHRcdFx0bW9kZTogT1BUX01PREVfSElTVE9SWSxcblx0XHRcdHJvb3Q6ICcvJ1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aXNJbml0aWFsaXplZCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2luaXRpYWxpemVkJyk7XG5cdH1cblxuXHRzZXRJbml0aWFsaXplZCh2YWwgPSB0cnVlKXtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdpbml0aWFsaXplZCcsIHZhbCk7XG5cdH1cblxuXHRnZXRGcmFnbWVudCgpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSAnJztcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdtb2RlJykgPT09IE9QVF9NT0RFX0hJU1RPUlkpIHtcblx0XHRcdGlmICghbG9jYXRpb24pIHJldHVybiAnJztcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoKSk7XG5cdFx0XHRmcmFnbWVudCA9IGZyYWdtZW50LnJlcGxhY2UoL1xcPyguKikkLywgJycpO1xuXHRcdFx0ZnJhZ21lbnQgPSB0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSAhPSAnLycgPyBmcmFnbWVudC5yZXBsYWNlKHRoaXMuZ2V0V29ya2luZygncm9vdCcpLCAnJykgOiBmcmFnbWVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCF3aW5kb3cpIHJldHVybiAnJztcblx0XHRcdHZhciBtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdGZyYWdtZW50ID0gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jbGVhclNsYXNoZXMoZnJhZ21lbnQpO1xuXHR9XG5cblx0Y2hlY2tMb2NhdGlvbigpe1xuXHRcdGxldCBjdXJyZW50ID10aGlzLmdldFdvcmtpbmcoJ2N1cnJlbnQnKSxcblx0XHRcdGZyYWdtZW50ID10aGlzLmdldEZyYWdtZW50KCksXG5cdFx0XHRpbml0ID0gdGhpcy5pc0luaXRpYWxpemVkKCk7XG5cdFx0aWYgKGN1cnJlbnQgIT09ZnJhZ21lbnQgIHx8ICFpbml0KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLGZyYWdtZW50KTtcblx0XHRcdHRoaXMuY2hlY2soZnJhZ21lbnQpO1xuXHRcdFx0dGhpcy5zZXRJbml0aWFsaXplZCgpO1xuXHRcdH1cblx0fVxuXG5cdGhyZWZDbGljaygpe1xuXHRcdC8vY29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGdldFJvb3QoKXtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRsaXN0ZW4obG9vcEludGVydmFsID0gT1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLCAnbm90SW5pdGlhbGl6ZWQnKTtcblx0XHRjbGVhckludGVydmFsKHRoaXMuZ2V0V29ya2luZygnaW50ZXJ2YWwnKSk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcnZhbCcsIHNldEludGVydmFsKHRoaXMuY2hlY2tMb2NhdGlvbi5iaW5kKHRoaXMpLCBsb29wSW50ZXJ2YWwpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhyZWZDbGljay5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNoZWNrKGYpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSBmIHx8IHRoaXMuZ2V0RnJhZ21lbnQoKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0V29ya2luZygncm91dGVzJykubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBwYXRoID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgKyB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldLnJlO1xuXHRcdFx0bGV0IGZ1bGxSRSA9ICB0aGlzLmNsZWFyU2xhc2hlcyhkZWNvZGVVUkkocGF0aCkpO1xuXHRcdFx0dmFyIG1hdGNoID0gZnJhZ21lbnQubWF0Y2goZnVsbFJFKTtcblx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRtYXRjaC5zaGlmdCgpO1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldLmhhbmRsZXIuYXBwbHkodGhpcy5ob3N0IHx8IHt9LCBtYXRjaCk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG5hdmlnYXRlKHBhdGgpIHtcblx0XHRwYXRoID0gcGF0aCA/IHBhdGggOiAnJztcblx0XHRzd2l0Y2ggKHRoaXMuZ2V0V29ya2luZygnbW9kZScpKXtcblx0XHRcdGNhc2UgT1BUX01PREVfSElTVE9SWToge1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdwdXNoIHN0YXRlJywgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0aGlzLmdldEZ1bGxSb3V0ZShwYXRoKSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBPUFRfTU9ERV9IQVNIOiB7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jKC4qKSQvLCAnJykgKyAnIycgKyBwYXRoO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRGdWxsUm91dGUocGF0aCA9ICcnKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdyb290JykgKyB0aGlzLmNsZWFyU2xhc2hlcyhwYXRoKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90Um91dGVyKCk7XG4iLCJsZXQgbm90QVBJT3B0aW9ucyA9IHtcblx0cnBzOiA1MCxcblx0cHJvdG9jb2w6ICdodHRwJyxcblx0aG9zdDogJ2xvY2FsaG9zdCcsXG5cdHBvcnQ6IDkwMDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSU9wdGlvbnM7XG4iLCJjbGFzcyBub3RBUElRdWVle1xuXHRjb25zdHJ1Y3RvciAocmVxdWVzdHNQZXJTZWNvbmQpIHtcblx0XHR0aGlzLnF1ZWUgPSBbXTtcblx0XHR0aGlzLmludCA9IG51bGw7XG5cdFx0dGhpcy5yZXF1ZXN0c1BlclNlY29uZCA9IHJlcXVlc3RzUGVyU2Vjb25kIHx8IDU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW4oKXtcblx0XHR0aGlzLmludCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLmNoZWNrLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLnJlcXVlc3RzUGVyU2Vjb25kKTtcblx0fVxuXG5cdGNoZWNrKCl7XG5cdFx0aWYgKHRoaXMuaW5Qcm9ncmVzcyl7cmV0dXJuO31cblx0XHRlbHNle1xuXHRcdFx0aWYgKHRoaXMucXVlZS5sZW5ndGggPiAwKXtcblx0XHRcdFx0dGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHRvQ2FsbCA9IHRoaXMucXVlZS5zaGlmdCgpO1xuXHRcdFx0XHR0b0NhbGwoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRuZXh0KCl7XG5cdFx0dGhpcy5pblByb2dyZXNzID0gZmFsc2U7XG5cdH1cblxuXHRhZGQoY2FsbCl7XG5cdFx0dGhpcy5xdWVlLnB1c2goY2FsbCk7XG5cdH1cblxuXHRwYXVzZSgpe1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50KTtcblx0fVxuXG5cdHJlc3VtZSgpe1xuXHRcdHRoaXMucnVuKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJUXVlZTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UuanMnO1xuXG5pbXBvcnQgbm90QVBJT3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuaW1wb3J0IG5vdEFQSVF1ZWUgZnJvbSAnLi9xdWVlLmpzJztcblxuXG5jbGFzcyBub3RBUEkgZXh0ZW5kcyAgbm90QmFzZXtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdENvbW1vbi5leHRlbmQobm90QVBJT3B0aW9ucywgb3B0aW9ucykpO1xuXHRcdHRoaXMucXVlZSA9IG5ldyBub3RBUElRdWVlKHRoaXMuZ2V0T3B0aW9ucygncnBzJykpO1xuXHRcdHRoaXMucXVlZS5ydW4oKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG1ha2VVcmwocGFydHMpIHtcblx0XHRyZXR1cm4gcGFydHMuam9pbignLycpO1xuXHR9XG5cblx0cXVlZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgbWV0aG9kLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdG1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKSB7XG5cdFx0bm90Q29tbW9uLmxvZygnbWFraW5nIHJlcXVlc3QnLCBtZXRob2QsIHVybCwgaWQpO1xuXHRcdG5vdENvbW1vbi5yZXF1ZXN0SlNPTihtZXRob2QsIHVybCwgZGF0YSlcblx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXF1ZXN0IHN1Y2Nlc3NmdWxsJywgbWV0aG9kLCB1cmwsIGlkLCByZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3Jlc3BvbnNlIGlzIGdvb2QnKTtcblx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGNvZGUsIHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5lcnJvcigncmVxdWVzdCBmYWlsZWQnLCBtZXRob2QsIHVybCwgaWQsIHJlc3BvbnNlKTtcblx0XHRcdFx0dGhpcy5xdWVlLm5leHQoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVzcG9uc2UgaXMgYmFkJyk7XG5cdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2UpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlJyk7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdwb3N0JywgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlIGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHV0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncHV0JywgdXJsLCBudWxsLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5nZXRNb2RlbCgpLnNldFByaWNlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdwdXR0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZ2V0JywgdXJsLCBpZCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZ2V0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0bGlzdChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZ2V0JywgdXJsLCBudWxsLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdsaXN0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGVsZXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZGVsZXRlJywgdXJsLCBpZCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZGVsZXRlIGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0VXBsb2FkVVJMKG1vZGVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnYmFzZScpICsgdGhpcy5nZXRPcHRpb25zKCd1cGxvYWQnKSArIG1vZGVsP21vZGVsLmdldElkKCk6Jyc7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJO1xuIiwiaW1wb3J0IG5vdEJhc2UgIGZyb20gJy4uL25vdEJhc2UnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW1hZ2UgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cbiIsImNvbnN0IFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCA9ICduLScsXG5cdFRFTVBMQVRFX1RBRyA9ICdudCcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiA9ICctJyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVggPSAnaWYnLFxuXHRDT01QT05FTlRfSURfUFJFRklYID0gJ25vdF9jb21wb25lbnRfJyxcblx0UEFSVF9JRF9QUkVGSVggPSAnbm90X3BhcnRfJyxcblx0REVGQVVMVF9QTEFDRVIgPSAncGxhY2UnLFxuXHRERUZBVUxUX1BMQUNFUl9MT09QID0gJ3BsYWNlQWZ0ZXInO1xuXG5jb25zdCBPUFRTID0ge1xuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgsXG5cdFRFTVBMQVRFX1RBRyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCxcblx0REVGQVVMVF9QTEFDRVIsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVgsXG5cdFBBUlRfSURfUFJFRklYLFxuXHRERUZBVUxUX1BMQUNFUl9MT09QXG59O1xuXG5leHBvcnQgZGVmYXVsdCBPUFRTO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuY29uc3QgTUVUQV9DQUNIRSA9IFN5bWJvbCgnY2FjaGUnKTtcblxuY2xhc3Mgbm90VGVtcGxhdGVDYWNoZSBleHRlbmRzIG5vdEJhc2V7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ0FDSEVdID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdHRoaXMuaGlkZVRlbXBsYXRlcygpO1xuXHRcdHRoaXMucmVnaXN0ZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpZGVUZW1wbGF0ZXMoKXtcblx0XHRsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdFx0dC5pbm5lckhUTUwgPSBPUFRTLlRFTVBMQVRFX1RBRyArICd7ZGlzcGxheTogbm9uZTt9Jztcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHQpO1xuXHR9XG5cblx0cmVnaXN0ZXIoKSB7XG5cdFx0bm90Q29tbW9uLnJlZ2lzdGVyKCd0ZW1wbGF0ZUNhY2hlJywgdGhpcyk7XG5cdH1cblxuXHRsb2FkKG1hcCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHRmb3IgKHZhciBpIGluIG1hcCkge1xuXHRcdFx0dGhpcy5sb2FkT25lKGksIG1hcFtpXSk7XG5cdFx0fVxuXHR9XG5cblx0bG9hZE9uZShrZXksIHVybCwgY2FsbGJhY2spIHtcblx0XHR2YXIgb1JlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRvUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXHRcdG9SZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KGtleSkpe1xuXHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vdGhhdC5zZXRMb2FkaW5nKGtleSwgdXJsKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZUlubmVySFRNTCk9Pntcblx0XHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0XHRcdH0pLmNhdGNoKCgpPT57XG5cdFx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGUnLCBrZXksIHVybCk7XG5cdFx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlc0hUTUwpPT57XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoaXMucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdFx0dGhpcy5hZGRMaWIodGVtcGxhdGVzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHRcdH0pLmNhdGNoKChlKT0+e1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZXMgbGliJywgdXJsLGUpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSA9IFsnX2lkJywgJ2lkJywgJ0lEJ10sXG5cdERFRkFVTFRfRklMVEVSID0ge30sXG5cdERFRkFVTFRfUEFHRV9OVU1CRVIgPSAxLFxuXHRERUZBVUxUX1BBR0VfU0laRSA9IDEwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbnRlcmZhY2UgZXh0ZW5kcyBub3RCYXNlIHtcblxuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCkge1xuXHRcdHN1cGVyKHt9KTtcblx0XHR0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldElEKHJlY29yZCwgYWN0aW9uRGF0YSkge1xuXHRcdGxldCByZXN1bHRJZCxcblx0XHRcdGxpc3QgPSBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZLFxuXHRcdFx0cHJlZml4ZXMgPSBbJycsIHRoaXMubWFuaWZlc3QubW9kZWxdO1xuXHRcdGlmIChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpbmRleCcpICYmIGFjdGlvbkRhdGEuaW5kZXgpIHtcblx0XHRcdGxpc3QgPSBbYWN0aW9uRGF0YS5pbmRleF0uY29uY2F0KE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkpO1xuXHRcdH1cblx0XHRmb3IgKGxldCBwcmUgb2YgcHJlZml4ZXMpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgbGlzdCkge1xuXHRcdFx0XHRpZiAocmVjb3JkLmhhc093blByb3BlcnR5KHByZSArIHQpKSB7XG5cdFx0XHRcdFx0cmVzdWx0SWQgPSByZWNvcmRbcHJlICsgdF07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdElkO1xuXHR9XG5cblx0Z2V0QWN0aW9uc0NvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSA/IE9iamVjdC5rZXlzKHRoaXMuZ2V0QWN0aW9ucygpKS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Z2V0QWN0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgPyB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgOiB7fTtcblx0fVxuXG5cdHNldEZpbmRCeShrZXksIHZhbHVlKSB7XG5cdFx0dmFyIG9iaiA9IHt9O1xuXHRcdG9ialtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIHRoaXMuc2V0RmlsdGVyKG9iaik7XG5cdH1cblxuXHRzZXRGaWx0ZXIoZmlsdGVyRGF0YSA9IERFRkFVTFRfRklMVEVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgZmlsdGVyRGF0YSk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIoe30pO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0U29ydGVyKHNvcnRlckRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHNldFBhZ2VTaXplKHBhZ2VTaXplKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSk7XG5cdH1cblxuXHRzZXRQYWdlcihwYWdlU2l6ZSA9IERFRkFVTFRfUEFHRV9TSVpFLCBwYWdlTnVtYmVyID0gREVGQVVMVF9QQUdFX05VTUJFUikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0UGFnZXIoKTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRXb3JraW5nKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRXb3JraW5nKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdGNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlcXVlc3REYXRhID0ge307XG5cdFx0aWYgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdkYXRhJykpICYmIEFycmF5LmlzQXJyYXkoYWN0aW9uRGF0YS5kYXRhKSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpb25EYXRhLmRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGRhdGFQcm92aWRlck5hbWUgPSAnZ2V0JyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoYWN0aW9uRGF0YS5kYXRhW2ldKTtcblx0XHRcdFx0aWYgKHRoaXMuaGFzT3duUHJvcGVydHkoZGF0YVByb3ZpZGVyTmFtZSkgJiYgdHlwZW9mIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRyZXF1ZXN0RGF0YSA9IG5vdENvbW1vbi5leHRlbmQocmVxdWVzdERhdGEsIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0oKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVlc3REYXRhO1xuXHR9XG5cblx0Ly9yZXR1cm4gUHJvbWlzZVxuXHRyZXF1ZXN0KHJlY29yZCwgYWN0aW9uTmFtZSkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKGFjdGlvbk5hbWUpLFxuXHRcdFx0cmVxdWVzdERhdGEgPSB0aGlzLmNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSxcblx0XHRcdGlkID0gdGhpcy5nZXRJRChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpLFxuXHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwsIGlkLCBKU09OLnN0cmluZ2lmeShub3RDb21tb24uZXh0ZW5kKHJlcXVlc3REYXRhLCByZWNvcmQuZ2V0RGF0YSgpKSkpXG5cdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hZnRlclN1Y2Nlc3NSZXF1ZXN0KGRhdGEsIGFjdGlvbkRhdGEpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24ucmVwb3J0KGUpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRhZnRlclN1Y2Nlc3NSZXF1ZXN0KGRhdGEsIGFjdGlvbkRhdGEpIHtcblx0XHRpZiAodGhpcyAmJiBhY3Rpb25EYXRhICYmIGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiBhY3Rpb25EYXRhLmlzQXJyYXkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgZGF0YS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7XG5cbmNvbnN0IE1FVEFfSU5URVJGQUNFID0gU3ltYm9sKCdpbnRlcmZhY2UnKSxcblx0TUVUQV9QUk9YWSA9IFN5bWJvbCgncHJveHknKSxcblx0TUVUQV9DSEFOR0UgPSBTeW1ib2woJ2NoYW5nZScpLFxuXHRNRVRBX0NIQU5HRV9ORVNURUQgPSBTeW1ib2woJ2NoYW5nZS5uZXN0ZWQnKSxcblx0TUVUQV9TQUwgPSBbXG5cdFx0J2dldEF0dHInLFxuXHRcdCdnZXRBdHRycycsXG5cdFx0J2lzUHJvcGVydHknLFxuXHRcdCdpc1JlY29yZCcsXG5cdFx0J2dldE1hbmlmZXN0Jyxcblx0XHQnc2V0QXR0cicsXG5cdFx0J3NldEF0dHJzJyxcblx0XHQnZ2V0RGF0YScsXG5cdFx0J3NldERhdGEnLFxuXHRcdCdnZXRKU09OJyxcblx0XHQnb24nLFxuXHRcdCdvZmYnLFxuXHRcdCd0cmlnZ2VyJ1xuXHRdLFxuXHRNRVRBX01BUF9UT19JTlRFUkZBQ0UgPSBbXG5cdFx0J2dldEFjdGlvbnNDb3VudCcsXG5cdFx0J2dldEFjdGlvbnMnLFxuXHRcdCdzZXRGaW5kQnknLFxuXHRcdCdyZXNldEZpbHRlcicsXG5cdFx0J3NldEZpbHRlcicsXG5cdFx0J2dldEZpbHRlcicsXG5cdFx0J3NldFNvcnRlcicsXG5cdFx0J2dldFNvcnRlcicsXG5cdFx0J3Jlc2V0U29ydGVyJyxcblx0XHQnc2V0UGFnZU51bWJlcicsXG5cdFx0J3NldFBhZ2VTaXplJyxcblx0XHQnc2V0UGFnZXInLFxuXHRcdCdyZXNldFBhZ2VyJyxcblx0XHQnZ2V0UGFnZXInXG5cdF0sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0TUVUQV9SRVRVUk5fVE9fUk9PVCA9IFN5bWJvbCgncmV0dXJuVG9Sb290Jyk7XG5cbnZhciBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0eXBlb2YgdGFyZ2V0W2tleV0pO1xuXG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RQcm9wZXJ0eSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihnZXRSb290LCBwYXRoVG8sIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUHJveHkgfHwgaXRlbS5pc1Byb3BlcnR5KSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRnZXRSb290OiBnZXRSb290LFxuXHRcdFx0cGF0aDogcGF0aFRvXG5cdFx0fSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzKHRoaXMpKTtcblx0XHR0aGlzLnNldERhdGEoaXRlbSk7XG5cdFx0dGhpcy5pc1Byb3BlcnR5ID0gdHJ1ZTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfUkVUVVJOX1RPX1JPT1RdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0W01FVEFfUkVUVVJOX1RPX1JPT1RdKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0bGV0IHJvb3QgPSB0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSgpO1xuXHRcdHJvb3QudHJpZ2dlcignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9QUk9YWV0sIHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXksIHZhbHVlKTtcblx0fVxufVxuXG5cbnZhciBjcmVhdGVSZWNvcmRIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScgfHwga2V5ID09PSAnaXNSZWNvcmQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykge1xuXHRcdFx0XHRpZiAodGhpc1trZXldKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfTUFQX1RPX0lOVEVSRkFDRS5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RSZWNvcmQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QsIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIGl0ZW0uaXNQcm94eSkge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCd0aGlzIGlzIFByb3h5IGl0ZW0nKTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUmVjb3JkIHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRPcHRpb25zKHt9KTtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXSA9IG5ldyBub3RSZWNvcmRJbnRlcmZhY2UobWFuaWZlc3QpO1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzLmludGVyZmFjZVVwKCk7XG5cdFx0dGhpcy5pc1JlY29yZCA9IHRydWU7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSByZWNvcmQgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRpbml0UHJvcGVydGllcyhpdGVtLCBwYXRoID0gJycpIHtcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoaXRlbSk7XG5cdFx0XHRmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuXHRcdFx0XHRsZXQgY3VyUGF0aCA9IHBhdGggKyAocGF0aC5sZW5ndGggPiAwID8gJy4nIDogJycpICsga2V5O1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2N1clBhdGgnLCBjdXJQYXRoKTtcblx0XHRcdFx0aWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbVtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0dGhpcy5pbml0UHJvcGVydGllcyhpdGVtW2tleV0sIGN1clBhdGgpO1xuXHRcdFx0XHRcdFx0aXRlbVtrZXldID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0Um9vdC5iaW5kKHRoaXMpLCBjdXJQYXRoLCBpdGVtW2tleV0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgb3duIHByb3BlcnR5LCBidXQgbm90IG9iamVjdCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgbm90IG93biBwcm9wZXJ0eScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpdGVtO1xuXHR9XG5cblx0Z2V0Um9vdCgpIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW1zKSB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSBbXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb2xsZWN0aW9uLnB1c2gobmV3IG5vdFJlY29yZChtYW5pZmVzdCwgaXRlbXNbaV0pKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb247XG5cdH1cblxuXHRpbnRlcmZhY2VVcCgpIHtcblx0XHRpZiAodGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9uc0NvdW50KCkgPiAwKSB7XG5cdFx0XHRsZXQgYWN0aW9ucyA9IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEFjdGlvbnMoKTtcblx0XHRcdGZvciAobGV0IGkgaW4gYWN0aW9ucykge1xuXHRcdFx0XHR0aGlzLmFjdGlvblVwKGksIGFjdGlvbnNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cblxuXHRhY3Rpb25VcChpbmRleCkge1xuXHRcdGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdKSkge1xuXHRcdFx0dGhpc1tERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0gPSAoKSA9PiB0aGlzW01FVEFfSU5URVJGQUNFXS5yZXF1ZXN0KHRoaXMsIGluZGV4KTtcblx0XHRcdC8vbm90Q29tbW9uLmxvZygnZGVmaW5lJywgREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXgpO1xuXHRcdH1cblx0fVxuXHQvKlxuXHQtPiAncGF0aC50by5rZXknLCB2YWx1ZU9mS2V5XG5cdDwtIG9rLCB3aXRoIG9uZSBvbkNoYW5nZSBldmVudCB0cmlnZ2VyZWRcblx0Ki9cblxuXHRzZXRBdHRyKGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gbm90UGF0aC5zZXQoa2V5LCB0aGlzW01FVEFfUFJPWFldLCB7fSwgdmFsdWUpO1xuXHR9XG5cblx0Lypcblx0LT5cblx0e1xuXHRcdCdrZXlQYXRoJzogdmFsdWUsXG5cdFx0J2tleS5zdWJQYXRoJzogdmFsdWUyLFxuXHRcdCdrZXlQYXRoLjAudGl0bGUnOiB2YWx1ZTNcblx0fVxuXHQ8LSBvaywgd2l0aCBidW5jaCBvZiBvbkNoYW5nZSBldmVudHMgdHJpZ2dlcmVkXG5cdCovXG5cdHNldEF0dHJzKG9iamVjdFBhcnQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzJywgb2JqZWN0UGFydCwgT2JqZWN0LmtleXMob2JqZWN0UGFydCkpO1xuXHRcdGlmIChvYmplY3RQYXJ0ICYmICh0eXBlb2Ygb2JqZWN0UGFydCA9PT0gJ29iamVjdCcpICYmIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpLmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggaW4gb2JqZWN0UGFydCkge1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzIG9uZSB0byBnbycsIHBhdGgpO1xuXHRcdFx0XHR0aGlzLnNldEF0dHIocGF0aCwgb2JqZWN0UGFydFtwYXRoXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0LT4gJ3BhdGhUb0tleSdcblx0PC0gdmFsdWUxXG5cblx0Ki9cblx0Z2V0QXR0cih3aGF0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdnZXRBdHRyJywgd2hhdCk7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHdoYXQsIHRoaXNbTUVUQV9QUk9YWV0sIHt9KTtcblx0fVxuXG5cdC8qXG5cdC0+IFsncGF0aFRvS2V5JywgJ3BhdGgudG8ua2V5JywgJ3NpbXBsZUtleScsLi4uXVxuXHQ8LSBbdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMywuLi5dXG5cdCovXG5cdGdldEF0dHJzKHdoYXQpIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0aWYgKHdoYXQgJiYgd2hhdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIG9mIHdoYXQpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5nZXRBdHRyKHBhdGgpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXSkge1xuXHRcdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLm1hbmlmZXN0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRzZXRGaW5kQnkoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmluZEJ5KC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFNvcnRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0U29ydGVyKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRQYWdlTnVtYmVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VOdW1iZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VTaXplKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VTaXplKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGdldE1vZGVsTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0TW9kZWxOYW1lKC4uLmFyZ3VtZW50cyk7XHRcdFxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVjb3JkO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuL25vdFJvdXRlcic7XG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcblxuY29uc3QgT1BUX0NPTlRST0xMRVJfUFJFRklYID0gJ25jJyxcblx0T1BUX1JFQ09SRF9QUkVGSVggPSAnbnInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RBcHAgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKHtvcHRpb25zfSk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgYXBwJyk7XG5cdFx0bm90Q29tbW9uLnJlZ2lzdGVyKCdhcHAnLCB0aGlzKTtcblx0XHR0aGlzLnJlc291cmNlcyA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRpbnRlcmZhY2VzOiB7fSxcblx0XHRcdGNvbnRyb2xsZXJzOiB7fSxcblx0XHRcdGluaXRDb250cm9sbGVyOiBudWxsLFxuXHRcdFx0Y3VycmVudENvbnRyb2xsZXI6IG51bGxcblx0XHR9KTtcblx0XHR0aGlzLnByZUluaXRSb3V0ZXIoKTtcblx0XHR0aGlzLmluaXRNYW5hZ2VyKCk7XG5cdFx0dGhpcy5pbml0QVBJKCk7XG5cdFx0dGhpcy5pbml0VGVtcGxhdGVzKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0TWFuYWdlcigpe1xuXHRcdG5vdENvbW1vbi5zZXRNYW5hZ2VyKFxuXHRcdFx0e1xuXHRcdFx0XHRzZXRBUEkodil7IHRoaXMuYXBpID0gdjt9LFxuXHRcdFx0XHRnZXRBUEkoKXtyZXR1cm4gdGhpcy5hcGk7fSxcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0aW5pdEFQSSgpe1xuXHRcdG5vdENvbW1vbi5nZXRNYW5hZ2VyKCkuc2V0QVBJKG5ldyBub3RBUEkoe30pKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZXMoKXtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRsZXQgcHJvbSA9IG51bGw7XG5cdFx0XHRmb3IobGV0IHQgaW4gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRcdGlmICh0ICYmIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdGxldCB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpW3RdO1xuXHRcdFx0XHRcdGlmKHByb20pe1xuXHRcdFx0XHRcdFx0cHJvbS50aGVuKG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTC5iaW5kKG5vdFRlbXBsYXRlQ2FjaGUsIHVybCkpO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cHJvbSA9IG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTCh1cmwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHByb20pe1xuXHRcdFx0XHRwcm9tLnRoZW4odGhpcy5pbml0TWFuaWZlc3QuYmluZCh0aGlzKSlcblx0XHRcdFx0XHQuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoJ25vIHRlbXBsYXRlcyBsaWInLCBlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5pbml0TWFuaWZlc3QoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFuaWZlc3QoKSB7XG5cdFx0dmFyIHVybCA9IHRoaXMuZ2V0T3B0aW9ucygnbWFuaWZlc3RVUkwnKTtcblx0XHRub3RDb21tb24uZ2V0SlNPTih1cmwsIHt9KVxuXHRcdFx0LnRoZW4odGhpcy5zZXRJbnRlcmZhY2VNYW5pZmVzdC5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRwcmVJbml0Um91dGVyKCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb3V0ZXInLCBub3RSb3V0ZXIpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuc2V0Um9vdCh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5yb290JykpO1xuXHR9XG5cblx0aW5pdFJvdXRlcigpe1xuXHRcdHZhciByb3V0aWVJbnB1dCA9IHt9O1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5tYW5pZmVzdCcpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGxldCByb3V0ZUJsb2NrID0gdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKVt0XSxcblx0XHRcdFx0cGF0aHMgPSByb3V0ZUJsb2NrLnBhdGhzLFxuXHRcdFx0XHRjb250cm9sbGVyID0gcm91dGVCbG9jay5jb250cm9sbGVyO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0cm91dGllSW5wdXRbcGF0aHNbaV1dID0gdGhpcy5iaW5kQ29udHJvbGxlcihjb250cm9sbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXInKS5hZGRMaXN0KHJvdXRpZUlucHV0KS5saXN0ZW4oKTsvLy5uYXZpZ2F0ZSh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5pbmRleCcpKTtcblx0fVxuXG5cdHNldEludGVyZmFjZU1hbmlmZXN0KG1hbmlmZXN0KSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcsIG1hbmlmZXN0KTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlTWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHQvL9C90YPQttC90L4g0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNGC0Yxcblx0XHQvL9C80L7QtNC10LvQuCDQv9C+0LvRg9GH0LXQvdC90YvQvNC4INC40L3RgtC10YDRhNC10LnRgdCw0LzQuFxuXHRcdHRoaXMudXBkYXRlSW50ZXJmYWNlcygpO1xuXHRcdC8v0LjQvdC40YbQuNC70LjRhtC40YDQvtCy0LDRgtGMINC4INC30LDQv9GD0YHRgtC40YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHRcdHRoaXMuaW5pdENvbnRyb2xsZXIoKTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhcnRBcHAoKSB7XG5cdFx0Ly/RgdC+0LfQtNCw0YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0Ly/RgNC+0YPRgtC10YAg0Lgg0L/RgNC40LLRj9C30LDRgtGMINC6INC90LXQvNGDINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHR0aGlzLmluaXRSb3V0ZXIoKTtcblx0fVxuXG5cdGJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0bGV0IGFwcCA9IHRoaXM7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRuZXcgY29udHJvbGxlck5hbWUoYXBwLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdH1cblxuXHRpbml0Q29udHJvbGxlcigpIHtcblx0XHRpZiAodHlwZW9mKHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRsZXQgaW5pdENvbnRyb2xsZXIgPSB0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJyk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJywgbmV3IGluaXRDb250cm9sbGVyKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50Q29udHJvbGxlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicpO1xuXHR9XG5cblx0c2V0Q3VycmVudENvbnRyb2xsZXIoY3RybCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInLCBjdHJsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHVwZGF0ZUludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5jbGVhckludGVyZmFjZXMoKTtcblx0XHRsZXQgbWFuaWZlc3RzID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHRcdGlmIChtYW5pZmVzdHMpIHtcblx0XHRcdGZvcihsZXQgbmFtZSBpbiBtYW5pZmVzdHMpe1xuXHRcdFx0XHRsZXQgcmVjb3JkTWFuaWZlc3QgPSBtYW5pZmVzdHNbbmFtZV07XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdID0gKHJlY29yZERhdGEpID0+IG5ldyBub3RSZWNvcmQocmVjb3JkTWFuaWZlc3QsIHJlY29yZERhdGEpO1xuXHRcdFx0XHR3aW5kb3dbJ25yJyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSldID0gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbbmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0UmVjb3JkTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9SRUNPUkRfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldENvbnRyb2xsZXJOYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX0NPTlRST0xMRVJfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldEludGVyZmFjZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpO1xuXHR9XG5cblx0Y2xlYXJJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJmYWNlcycsIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHdhaXRUaGlzUmVzb3VyY2UodHlwZSwgaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMucmVzb3VyY2VzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG5cdFx0XHR0aGlzLnJlc291cmNlc1t0eXBlXSA9IHt9O1xuXHRcdH1cblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSBmYWxzZTtcblx0XHRyZXR1cm4gdGhpcy5vblJlc291cmNlUmVhZHkuYmluZCh0aGlzLCB0eXBlLCBpbmRleCk7XG5cdH1cblxuXHRvblJlc291cmNlUmVhZHkodHlwZSwgaW5kZXgpIHtcblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSB0cnVlO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRhbGxSZXNvdXJjZXNSZWFkeSgpIHtcblx0XHR2YXIgaSwgajtcblx0XHRmb3IgKGkgaW4gdGhpcy5yZXNvdXJjZXMpIHtcblx0XHRcdGZvciAoaiBpbiB0aGlzLnJlc291cmNlc1tpXSkge1xuXHRcdFx0XHRpZiAoIXRoaXMucmVzb3VyY2VzW2ldW2pdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuXG5jb25zdCBNRVRBX1BST0NFU1NPUlMgPSBTeW1ib2woJ3Byb2Nlc3NvcnMnKTtcblxuY2xhc3Mgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UHJvY2Vzc29yKC8qIGtleSwgdmFsdWUgKi8pe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFByb2Nlc3NvcigvKiBrZXksICBkZWZhdWx0VmFsdWUgKi8pe1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhclByb2Nlc3NvcnMoKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZCgpe1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcblx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHR9ZWxzZXtcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKXtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGFyZ3VtZW50c1swXSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IodCwgYXJndW1lbnRzWzBdW3RdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFByb2Nlc3NvciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXIoKXtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlUHJvY2Vzc29ycygpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnO1xuXG4vKlxuICog0JjRgdC/0L7Qu9GM0LfRg9C10YIgRE9NINC/0L7QtNC00LXRgNC10LLQviDQsiDQutCw0YfQtdGB0YLQstC1INGI0LDQsdC70L7QvdCwLlxuICog0JfQsNC/0L7Qu9C90Y/QtdGCINC10LPQviDQtNCw0L3QvdGL0LzQuC5cbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0LPQtdC90LXRgNC40YDQvtCy0LDQvdC90YvQtSDRjdC70LXQvNC10L3RgtGLXG4gKlxuICogKi9cblxuLypcblxuXHQ8ZGl2IG4tdGVtcGxhdGUtbmFtZT1cInZhc3lhXCI+XG5cdFx0PHA+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbi12YWx1ZT1cIjpjb29sTmFtZVwiLz48L3A+XG5cdFx0PHA+0JHQvtGA0LjRgSDRhdGA0LXQvSDQv9C+0L/QsNC00LXRiNGMINC4IHt7OmNvb2xOYW1lfX0uPC9wPlxuXHQ8L2Rpdj5cblxuICovXG5cbmNvbnN0IE1FVEFfQ09NUE9ORU5UUyA9IFN5bWJvbCgnY29tcG9uZW50cycpO1xuXG5jbGFzcyBub3RSZW5kZXJlciBleHRlbmRzIG5vdEJhc2Uge1xuXHQvKlxuXHRcdGlucHV0ID0ge1xuXHRcdFx0ZGF0YTogbm90UmVjb3JkLFxuXHRcdFx0dGVtcGxhdGU6IGVsZW1lbnRcblx0XHRcdG9wdGlvbnM6e1xuXHRcdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0fVxuXHRcdH1cblx0Ki9cblxuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdID0ge307XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLmNvbXBvbmVudCA9IGlucHV0LmNvbXBvbmVudDtcblx0XHR0aGlzLmluaXREYXRhKGlucHV0LmRhdGEgPyBpbnB1dC5kYXRhIDoge30pO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dC50ZW1wbGF0ZSk7XG5cdFx0dGhpcy5pbml0VGVtcGxhdGUoKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3RlbXBsYXRlJywgdGhpcy5nZXRXb3JraW5nKCdnZXRUZW1wbGF0ZScpKCkpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLmdldERhdGEoKS5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0fVxuXG5cdGluaXRXb3JraW5nKHRlbXBsYXRlKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGdldFRlbXBsYXRlOiB0ZW1wbGF0ZSxcblx0XHRcdHBhcnRJZDogdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA/IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgOiBPUFRTLlBBUlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHR9KTtcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCkge1xuXHRcdGlmICh0aGlzLmNvbXBvbmVudCkge1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLmNvbXBvbmVudC5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9XG5cdH1cblxuXHRvbkNoYW5nZShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdC8qbm90Q29tbW9uLmxvZyh0aGlzKTtcblx0XHRub3RDb21tb24ubG9nKHRoaXMuZ2V0QnJlYWRDcnVtcHMoKS5qb2luKCcgPiAnKSk7XG5cdFx0bm90Q29tbW9uLmxvZygndXBkYXRpbmcgcmVuZGVyZXIgJywgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKSwgJyBhZnRlciBjaGFuZ2VzJywga2V5LCB2YWx1ZSk7Ki9cblx0XHR0aGlzLnVwZGF0ZShrZXkpO1xuXHRcdHRoaXMudHJpZ2dlcignb2Jzb2xldGUnLHByb3h5LCBrZXksIHZhbHVlKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyU3Rhc2goKTtcblx0XHR0aGlzLnNldFdvcmtpbmdNYXBwaW5nKCk7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0dGhpcy5zZWFyY2hGb3JTdWJUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnN0YXNoUmVuZGVyZWQoKTtcblx0fVxuXG5cdHVwZGF0ZShrZXkpIHtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHRmb3IgKGxldCB0IGluIHRoaXNbTUVUQV9DT01QT05FTlRTXSkge1xuXHRcdFx0bGV0IGl0ZW0gPSB0aGlzW01FVEFfQ09NUE9ORU5UU11bdF0sXG5cdFx0XHRcdGlmUGFydCA9IHRydWU7XG5cdFx0XHRpZiAoa2V5KXtcblx0XHRcdFx0aWYgKGl0ZW0uZ2V0T3B0aW9ucygnZGF0YVBhdGgnKT09PW51bGwpe1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldFx0Y29tcG9uZW50UGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJykpLFxuXHRcdFx0XHRcdGNoYW5nZWRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGtleSk7XG5cdFx0XHRcdGlmUGFydCA9IG5vdFBhdGguaWZGdWxsU3ViUGF0aChjaGFuZ2VkUGF0aCwgY29tcG9uZW50UGF0aCk7XG5cdFx0XHRcdC8qbm90Q29tbW9uLmxvZyhpdGVtLmdldE9wdGlvbnMoJ25hbWUnKSwgJyA+LTwgJywgaXRlbS5nZXRPcHRpb25zKCdpZCcpLCAnID4tPCAnLCBjb21wb25lbnRQYXRoLCBjaGFuZ2VkUGF0aCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3dpbGwgYmUgdXBkYXRlZCcsIGlmUGFydCk7Ki9cblx0XHRcdH1cblxuXHRcdFx0aWYgKGlmUGFydCkge1xuXHRcdFx0XHRpdGVtLnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldFdvcmtpbmdNYXBwaW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbWFwcGluZycsIHRoaXMuY3JlYXRlTWFwcGluZygpKTtcblx0fVxuXG5cdC8qXG5cblx00KHQvtC30LTQsNC10Lwg0LrQsNGA0YLRiyDRgdC+0L7RgtCy0LXRgdGC0LLQuNGPINC/0YDQvtGG0LXRgdGB0L7RgNC+0LIsINC/0YPRgtC10Lkg0LTQsNC90L3Ri9GFINCyINC+0LHRitC10LrRgtC1INC4INGN0LvQtdC80LXQvdGC0L7QsiDRiNCw0LHQu9C+0L3QsC5cblx0W3tcblx0XHRlbCxcblx0XHRwcm9jZXNzb3IsXG5cdFx0d29ya2luZyxcblx0XHRpdGVtLnByb3BlcnR5LnBhdGhcblx0fV1cblxuXHQqL1xuXG5cdGNyZWF0ZU1hcHBpbmcoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZmluZEFsbFByb2Nlc3NvcnMoKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZmluZEFsbFByb2Nlc3NvcnMoKSB7XG5cdFx0bGV0IHByb2NzID0gW10sXG5cdFx0XHRlbHMgPSBub3RDb21tb24uZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgodGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGVscy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGF0dHMgPSBlbHNbal0uYXR0cmlidXRlcywgbiA9IGF0dHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRzW2ldLm5vZGVOYW1lLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpID09PSAwKSB7XG5cdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGF0dHNbaV0pO1xuXHRcdFx0XHRcdGxldCBwcm9jRGF0YSA9IHRoaXMucGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKGF0dHNbaV0ubm9kZU5hbWUpO1xuXHRcdFx0XHRcdHByb2NEYXRhLmVsZW1lbnQgPSBlbHNbal07XG5cdFx0XHRcdFx0cHJvY0RhdGEucHJvY2Vzc29yRXhwcmVzc2lvbiA9IGF0dHNbaV0ubm9kZU5hbWU7XG5cdFx0XHRcdFx0cHJvY0RhdGEuYXR0cmlidXRlRXhwcmVzc2lvbiA9IGF0dHNbaV0udmFsdWU7XG5cdFx0XHRcdFx0cHJvY3MucHVzaChwcm9jRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHByb2NzO1xuXHR9XG5cblx0cGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKHByb2Nlc3NvckV4cHJlc3Npb24pIHtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0cGFyYW1zOiBbXSxcblx0XHRcdHByb2Nlc3Nvck5hbWU6ICcnLFxuXHRcdFx0aWZDb25kaXRpb246IGZhbHNlXG5cdFx0fTtcblx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLCAnJyk7XG5cdFx0aWYgKHByb2Nlc3NvckV4cHJlc3Npb24uaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYKSA9PT0gKHByb2Nlc3NvckV4cHJlc3Npb24ubGVuZ3RoIC0gT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWC5sZW5ndGgpKSB7XG5cdFx0XHRyZXN1bHQuaWZDb25kaXRpb24gPSB0cnVlO1xuXHRcdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiArIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsICcnKTtcblx0XHR9XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHByb2Nlc3NvckV4cHJlc3Npb24uc3BsaXQoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IpO1xuXHRcdHJlc3VsdC5wcm9jZXNzb3JOYW1lID0gcmVzdWx0LnBhcmFtc1swXTtcblx0XHRyZXN1bHQucGFyYW1zID0gcmVzdWx0LnBhcmFtcy5zbGljZSgxKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZXhlY1Byb2Nlc3NvcnMoaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbWFwcGluZyA9IHRoaXMuZ2V0V29ya2luZygnbWFwcGluZycpO1xuXHRcdGlmIChtYXBwaW5nKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBpbmcubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IHByb2NTY29wZSA9IG1hcHBpbmdbaV07XG5cdFx0XHRcdHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocHJvY1Njb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGluZGV4KTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdhdHRyaWJ1dGVSZXN1bHQnLCBwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0XHRcdFx0bGV0IHByb2NOYW1lID0gcHJvY1Njb3BlLnByb2Nlc3Nvck5hbWUsXG5cdFx0XHRcdFx0cHJvYyA9IG5vdFRlbXBsYXRlUHJvY2Vzc29ycy5nZXQocHJvY05hbWUpO1xuXHRcdFx0XHRpZiAocHJvYykge1xuXHRcdFx0XHRcdHByb2MocHJvY1Njb3BlLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHRcdFx0XHRcdHByb2NTY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9jU2NvcGUucHJvY2Vzc29yRXhwcmVzc2lvbik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyBwcm9jZXNzb3IgbGlrZScsIHByb2NOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ3JlbmRlcmVkJyk7XG5cdH1cblxuXHRnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHBhdGgsIGl0ZW0pIHtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQocGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0fVxuXG5cdGNsZWFyU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuZGVzdHJveVN1YnMoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N1YnMnLCBbXSk7XG5cdH1cblxuXHRkZXN0cm95U3VicygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdFx0dC5kZXN0cm95KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0U3Rhc2goKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRsZXQgZWwgPSB0aGlzLmdldFN0YXNoKClbdF07XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSl7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmU3ViRWxlbWVudFJlbmRlcmVkKG50RWwpIHtcblx0XHRyZXR1cm4gbnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQgJiYgKG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkLnZhbHVlID09PSAndHJ1ZScpO1xuXHR9XG5cblx0c2VhcmNoRm9yU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRsZXQgc3VicyA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3JBbGwoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc3ViIHRlbXBsYXRlcycsIHN1YnMpO1xuXHRcdGZvciAobGV0IG50ID0gMDsgbnQgPCBzdWJzLmxlbmd0aDsgbnQrKykge1xuXHRcdFx0aWYgKCF0aGlzLmlmU3ViRWxlbWVudFJlbmRlcmVkKHN1YnNbbnRdKSkge1xuXHRcdFx0XHR0aGlzLnJlbmRlclN1YihzdWJzW250XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWRkU3ViKG50RWwpIHtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKS5wdXNoKHtcblx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0cGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6ICcnLFxuXHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUuc3JjIDogJycsXG5cdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHRcdHJlbmRlcmVkTGlzdDogW10sXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJTdWIobnRFbCkge1xuXHRcdGlmICghbnRFbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRsZXQgZGV0YWlscyA9IHtcblx0XHRcdFx0ZGF0YVBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiBudWxsLFxuXHRcdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5zcmMudmFsdWUgOiAnJyxcblx0XHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKClcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHRkYXRhOiBkZXRhaWxzLmRhdGFQYXRoIT09IG51bGw/IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChkZXRhaWxzLmRhdGFQYXRoLCB0aGlzLmdldERhdGEoKSk6bnVsbCxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0c3JjOiBkZXRhaWxzLnNyY1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pLFxuXHRcdFx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUFmdGVyJyxcblx0XHRcdFx0XHRpZDogZGV0YWlscy5pZCxcblx0XHRcdFx0XHRudEVsOiBudEVsLFxuXHRcdFx0XHRcdGRhdGFQYXRoOiBkZXRhaWxzLmRhdGFQYXRoXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG93bmVyOiB0aGlzXG5cdFx0XHR9O1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdpZCcsIGRldGFpbHMuaWQpO1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXVtkZXRhaWxzLmlkXSA9IG5ldyBub3RDb21wb25lbnQob3B0aW9ucyk7XG5cdH1cblxuXHRjbGVhclN0YXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBbXSk7XG5cdH1cblxuXHRnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3RlbXBsYXRlJyk7XG5cdH1cblxuXHRnZXRTdGFzaCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzdGFzaCcpO1xuXHR9XG5cblx0c3Rhc2hSZW5kZXJlZCgpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCk7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0dGhpcy5hZGRUb1N0YXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdH1cblxuXHRyZXBsYWNlUmVuZGVyZWQoKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdyZXBsYWNlIHN0YXNoJyk7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLFxuXHRcdFx0c3Rhc2ggPSB0aGlzLmdldFN0YXNoKCksXG5cdFx0XHRuZXdTdGFzaCA9IFtdLFxuXHRcdFx0YW5jaG9yID0gc3Rhc2gubGVuZ3RoID4gMCA/IHN0YXNoWzBdIDogdGhpcy5nZXRPcHRpb25zKCdudEVsJyksXG5cdFx0XHRwYXJlbnROb2RlID0gYW5jaG9yLnBhcmVudE5vZGU7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0bmV3U3Rhc2gucHVzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgbmV3U3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdGlmIChhbmNob3IubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1N0YXNoW3RdLCBhbmNob3IubmV4dFNpYmxpbmcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3U3Rhc2hbdF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHN0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRwYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0YXNoW3RdKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIG5ld1N0YXNoKTtcblx0fVxuXG5cdGFkZFRvU3Rhc2gobm9kZSkge1xuXHRcdHRoaXMuZ2V0U3Rhc2goKS5wdXNoKG5vZGUpO1xuXHR9XG5cblx0aXNEYXRhKGRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkgPT09IGRhdGE7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVuZGVyZXI7XG4iLCJjb25zdCBwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XG5cdFx0bGV0IGwgPSAwO1xuXHRcdHdoaWxlICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGggLSBsKSB7XG5cdFx0XHRpZiAodGFyZ2V0RWwuY2hpbGRyZW5bMF0ubm9kZU5hbWUgPT09ICdOVCcpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdudCBmb3VuZGVkJyk7XG5cdFx0XHRcdGwrKztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdyZW1vdmUgY2hpbGQgJyx0YXJnZXRFbC5jaGlsZHJlbltsXSk7XG5cdFx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGFyZ2V0RWwudGV4dENvbnRlbnQgPSAnJztcblx0fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBjaGlsZCAnLCByZW5kZXJlZFtpXSk7XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge31cbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZTtcbiIsImNvbnN0IHBsYWNlQWZ0ZXIgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUFmdGVyO1xuIiwiY29uc3QgcGxhY2VCZWZvcmUgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbCk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUJlZm9yZTtcbiIsImNvbnN0IHBsYWNlRmlyc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSByZW5kZXJlZC5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygncGxhY2UgZmlyc3QnLCBpLCByZW5kZXJlZFtpXSk7XG5cdFx0XHRpZiAodGFyZ2V0RWwuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGJlZm9yZSBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLmNoaWxkcmVuWzBdKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgYXMgZmlyc3QnKTtcblx0XHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlRmlyc3Q7XG4iLCJjb25zdCBwbGFjZUxhc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlTGFzdDtcbiIsImNvbnN0IHJlcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGJlZm9yZUVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1x0XHRcblx0XHRpZiAodGFyZ2V0RWwubm9kZU5hbWUgIT09ICdOVCcpe1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YXJnZXRFbCk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlO1xuIiwiaW1wb3J0IHBsYWNlIGZyb20gJy4vcGxhY2UnO1xuaW1wb3J0IHBsYWNlQWZ0ZXIgZnJvbSAnLi9wbGFjZUFmdGVyJztcbmltcG9ydCBwbGFjZUJlZm9yZSBmcm9tICcuL3BsYWNlQmVmb3JlJztcbmltcG9ydCBwbGFjZUZpcnN0IGZyb20gJy4vcGxhY2VGaXJzdCc7XG5pbXBvcnQgcGxhY2VMYXN0IGZyb20gJy4vcGxhY2VMYXN0JztcbmltcG9ydCByZXBsYWNlIGZyb20gJy4vcmVwbGFjZSc7XG5cbmNvbnN0IG5vdFBsYWNlcnMgPSB7XG5cdHBsYWNlOiBwbGFjZSxcblx0cGxhY2VBZnRlcjogcGxhY2VBZnRlcixcblx0cGxhY2VCZWZvcmU6IHBsYWNlQmVmb3JlLFxuXHRwbGFjZUZpcnN0OiBwbGFjZUZpcnN0LFxuXHRwbGFjZUxhc3Q6IHBsYWNlTGFzdCxcblx0cmVwbGFjZTogcmVwbGFjZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90UGxhY2VycztcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi9ub3RSZW5kZXJlcic7XG5pbXBvcnQgbm90UGxhY2VycyBmcm9tICcuL3BsYWNlcnMnO1xuXG5jb25zdCBNRVRBX1BBUlRTID0gU3ltYm9sKCdwYXJ0cycpO1xuLypcblx0aW5wdXQgPSB7XG5cdFx0ZGF0YTogbm90UmVjb3JkIG9yIFtub3RSZWNvcmRdLFxuXHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRodG1sOiBodG1sKHN0cmluZyksIFx0XHQvL9GC0LXQutGB0YIg0YEgaHRtbCDQutC+0LTQvtC8INGI0LDQsdC70L7QvdCwXG5cdFx0XHRlbDogSFRNTEVsZW1lbnQob2JqZWN0KSwgXHQvL0RPTSDRjdC70LXQvNC10L3RglxuXHRcdFx0c3JjOiBzcmMoc3RyaW5nKSxcdFx0XHQvL9GB0YHRi9C70LrQsCDQvdCwINGE0LDQudC7INGBINGI0LDQsdC70L7QvdC+0Lxcblx0XHRcdG5hbWU6IG5hbWUoc3RyaW5nKVx0XHRcdC8v0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCDQtNC70Y8g0L/QvtC40YHQutCwINCyINC60Y3RiNC1IG5vdFRlbXBsYXRlQ2FjaGVcblx0XHR9XG5cdFx0b3B0aW9uczp7XG5cdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHQvL9CwINGN0YLQviDQutCw0Log0LHRg9C00LXQvCDQv9C+0LzQtdGJ0LDRgtGMINGA0LXQt9GD0LvRjNGC0LDRgiDRgNC10L3QtNC10YDQuNC90LPQsFxuXHRcdFx0cmVuZGVyQW5kOiBwbGFjZVN0eWxlKHN0cmluZykg0L7QtNC40L0g0LjQtyDQstCw0YDQuNCw0L3RgtC+0LJcblx0XHRcdFx0XHRwbGFjZVx0XHQtXHTQv9C+0LzQtdGJ0LDQtdC8INCy0L3Rg9GC0YDQuCDRhtC10LvQtdCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0XHRyZXBsYWNlXHRcdC1cdNC30LDQvNC10L3Rj9C10Lxcblx0XHRcdFx0XHRwbGFjZUFmdGVyXHQtXHTQv9C+0YHQu9C1XG5cdFx0XHRcdFx0cGxhY2VCZWZvcmVcdC1cdNC00L5cblx0XHRcdFx0XHRwbGFjZUZpcnN0XHQtXHTQstC90YPRgtGA0Lgg0L/QtdGA0LLRi9C8INC00L7Rh9C10YDQvdC40Lxcblx0XHRcdFx0XHRwbGFjZUxhc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C+0YHQu9C10LTQvdC40Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdH1cblx0fVxuKi9cbmNsYXNzIG5vdENvbXBvbmVudCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpe1xuXHRcdGlmICh0aGlzLm93bmVyKXtcblx0XHRcdHJldHVybiBbLi4udGhpcy5vd25lci5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1cblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5vd25lciA9IGlucHV0Lm93bmVyP2lucHV0Lm93bmVyOm51bGw7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0RXZlbnRzKGxpc3Qpe1xuXHRcdGZvcihsZXQgdCBvZiBsaXN0KXtcblx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2lkJykpe1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdpZCcsIE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKXtcblx0XHRcdHRoaXMuaW5pdE1hcmtFbGVtZW50KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hcmtFbGVtZW50KCl7XG5cdFx0bGV0IG1hcmtFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ250Jyk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdudEVsJywgbWFya0VsKTtcblx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSksXG5cdFx0XHR0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZiAodGFyZ2V0UXVlcnkpe1xuXHRcdFx0bGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0UXVlcnkpO1xuXHRcdFx0aWYgKHRhcmdldCl7XG5cdFx0XHRcdHRoaXMuc2V0T3B0aW9ucygndGFyZ2V0RWwnLCB0YXJnZXQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKXtcblx0XHRcdHRocm93ICdObyB0YXJnZXQgdG8gcGxhY2UgcmVuZGVyZWQnO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyLm1haW4odGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLCBbbWFya0VsXSk7XG5cdFx0fVxuXG5cdH1cblxuXHRpbml0V29ya2luZyh2YWwpIHtcblx0XHR0aGlzLnVuc2V0UmVhZHkodmFsKTtcblx0fVxuXG5cdHByZXBhcmVUZW1wbGF0ZUVsZW1lbnQodmFsKSB7XG5cdFx0aWYgKCF2YWwpIHtcblx0XHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdodG1sJykgJiYgdmFsLmh0bWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQodmFsLmVsLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZhbC5zcmMpIHtcblx0XHRcdG5vdFRlbXBsYXRlQ2FjaGUuYWRkRnJvbVVSTCh2YWwuc3JjLCB2YWwuc3JjKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpICYmIHZhbC5uYW1lKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUuZ2V0KHZhbC5uYW1lKSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JywgY29udCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRyZXNldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50JywgdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpLmNsb25lTm9kZSh0cnVlKSk7XG5cdH1cblxuXHRzZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdHJ1ZSk7XG5cdH1cblxuXHR1bnNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCBmYWxzZSk7XG5cdH1cblxuXHRpc1JlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3JlYWR5Jyk7XG5cdH1cblxuXHRjbGVhclBhcnRzKCkge1xuXHRcdC8qINC40LfQstC10YnQsNC10Lwg0L7QsSDRg9C00LDQu9C10L3QuNC4INGN0LvQtdC80LXQvdGC0L7QsiAqL1xuXHRcdGlmICh0aGlzW01FVEFfUEFSVFNdICYmIEFycmF5LmlzQXJyYXkodGhpc1tNRVRBX1BBUlRTXSkgJiYgdGhpc1tNRVRBX1BBUlRTXS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpc1tNRVRBX1BBUlRTXSkge1xuXHRcdFx0XHRpZiAodC5kZXN0cm95KXtcblx0XHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdudEVsJykgJiYgdGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZSl7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKTtcblx0XHR9XG5cdH1cblxuXHRyZXNldFBhcnRzKCkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10gPSBbXTtcblx0fVxuXG5cdGdldFBhcnRzKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfUEFSVFNdO1xuXHR9XG5cblx0YWRkUGFydCh0ZW1wbGF0ZSkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10ucHVzaCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0dGhpcy5yZW1vdmVPYnNvbGV0ZVBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHBsYWNlci5iZWZvcmUodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHRwbGFjZXIuYWZ0ZXIodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyB0YXJnZXQgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdHBsYWNlUGFydChkYXRhLCBpbmRleCl7XG5cdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSksXG5cdFx0XHRub2RlcyA9IHBhcnQuZ2V0U3Rhc2goKSxcblx0XHRcdHRhcmdldEVsLFxuXHRcdFx0bGFzdE5vZGUsXG5cdFx0XHRwbGFjZXI7XG5cdFx0aWYgKGluZGV4ID09PSAwKXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcihPUFRTLkRFRkFVTFRfUExBQ0VSX0xPT1ApO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJyk7XG5cdFx0fVxuXHRcdHBsYWNlci5tYWluKHRhcmdldEVsLCBub2Rlcyk7XG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRnZXRQbGFjZXIobWV0aG9kKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZWFyY2hpbmcgZm9yIHBsYWNlcicsIG1ldGhvZCk7XG5cdFx0aWYgKG5vdFBsYWNlcnMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbbWV0aG9kXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbT1BUUy5ERUZBVUxUX1BMQUNFUl07XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaERhdGEoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldERhdGEoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaFBhcnQoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0UGFydHMoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXRQYXJ0cygpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdNC10YHQu9C4INGBINC00LDQvdC90YvQvNC4INC90LUg0YHQstGP0LfQsNC9INGA0LXQvdC00LXRgNC10YAgLSDRgdC+0LfQtNCw0LXQvFxuXHQqL1xuXG5cdHJlbmRlclBhcnQoZGF0YSkge1xuXHRcdGlmICghdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ2NyZWF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHRsZXQgcmVuZGVyZXIgPSBuZXcgbm90UmVuZGVyZXIoe1xuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0ZW1wbGF0ZTogdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lLmJpbmQodGhpcyksXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpLFxuXHRcdFx0XHRjb21wb25lbnQ6IHRoaXNcblx0XHRcdH0pO1xuXHRcdFx0Ly9yZW5kZXJlci5vbignb2Jzb2xldGUnLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkUGFydChyZW5kZXJlcik7XG5cdFx0fWVsc2V7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHR0aGlzLnVwZGF0ZVBhcnQodGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVQYXJ0KHBhcnQpe1xuXHRcdHBhcnQudXBkYXRlKCk7XG5cdH1cblxuXHRyZW1vdmVPYnNvbGV0ZVBhcnRzKCkge1xuXHRcdC8v0LrQvtC90LLQtdC10YAg0L/QvtC40YHQuiDQsNC60YLRg9Cw0LvRjNC90YvRhSAtINGD0LTQsNC70LXQvdC40LUg0L7RgdGC0LDQu9GM0L3Ri9GFXG5cdFx0bm90Q29tbW9uLnBpcGUoXG5cdFx0XHR1bmRlZmluZWQsIC8vIHBhcnRzIHRvIHNlYXJjaCBpbiwgY2FuIGJlICd1bmRlZmluZWQnXG5cdFx0XHRbXG5cdFx0XHRcdHRoaXMuZmluZEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vZmlyc3Qgcm91bmQsIHNlYXJjaCBmb3Igb2Jzb2xldGVcblx0XHRcdFx0dGhpcy5yZW1vdmVOb3RBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL3JlbW92ZSAnZW1cblx0XHRcdF1cblx0XHQpO1xuXHR9XG5cblx0Lypcblx0XHTQtdGB0YLRjCDQtNCw0L3QvdGL0LUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDQsNC60YLRg9Cw0LvRjNC90L4sXG5cdFx00L3QtdGCINC00LDQvdC90YvRhSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINGB0YLQsNGA0YzRkVxuXHQqL1xuXG5cdGZpbmRBY3R1YWxQYXJ0cygpIHtcblx0XHRsZXQgYWN0dWFsUGFydHMgPSBbXTtcblx0XHR0aGlzLmZvckVhY2hEYXRhKChkYXRhLyosIGluZGV4Ki8pPT57XG5cdFx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKTtcblx0XHRcdGlmIChwYXJ0KXtcblx0XHRcdFx0YWN0dWFsUGFydHMucHVzaChwYXJ0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gYWN0dWFsUGFydHM7XG5cdH1cblxuXHQvKlxuXHRcdNGD0LTQsNC70Y/QtdC8INCy0YHQtSDQutGA0L7QvNC1INCw0LrRgtGD0LDQu9GM0L3Ri9GFXG5cdCovXG5cdHJlbW92ZU5vdEFjdHVhbFBhcnRzKGFjdHVhbFBhcnRzKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmIChhY3R1YWxQYXJ0cy5pbmRleE9mKHRoaXMuZ2V0UGFydHMoKVt0XSkgPT09IC0xKXtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpW3RdLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpLnNwbGljZSh0LCAxKTtcblx0XHRcdFx0dC0tO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFBhcnRCeURhdGEoZGF0YSkge1xuXHRcdGZvciAobGV0IHQgaW4gdGhpcy5nZXRQYXJ0cygpKSB7XG5cdFx0XHRpZiAodGhpcy5nZXRQYXJ0cygpW3RdLmlzRGF0YShkYXRhKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRQYXJ0cygpW3RdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tcG9uZW50O1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IgPSAnLnBhZ2UtY29udGVudCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdTX1BPU1RGSVggPSAnLmh0bWwnLFxuXHRPUFRfREVGQVVMVF9WSUVXX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCA9IHRydWUsXG5cdE9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FID0gJ01vZGVscycsXG5cdE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FID0gJ01vZGVsJyxcblx0T1BUX0RFRkFVTFRfTU9EVUxFX05BTUUgPSAnbWFpbicsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9BTkQgPSAncGxhY2UnO1xuXG5jbGFzcyBub3RDb250cm9sbGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGFwcCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgY29udHJvbGxlcicpO1xuXHRcdHRoaXMuYXBwID0gYXBwO1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyZWFkeTogZmFsc2UsXG5cdFx0XHR2aWV3czoge30sXG5cdFx0XHR2aWV3TmFtZTogT1BUX0RFRkFVTFRfVklFV19OQU1FLFxuXHRcdFx0aGVscGVyczoge31cblx0XHR9KTtcblx0XHR0aGlzLnNldERhdGEoe30pO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRtb2R1bGVOYW1lOiBPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSxcblx0XHRcdGNvbnRhaW5lclNlbGVjdG9yOiBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IsXG5cdFx0XHRwcmVmaXg6IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZScpLFxuXHRcdFx0cG9zdGZpeDogT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCxcblx0XHRcdHJlbmRlckZyb21VUkw6IE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCxcblx0XHRcdG5hbWVzOntcblx0XHRcdFx0cGx1cmFsOk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FLFxuXHRcdFx0XHRzaW5nbGU6IE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLmluaXRSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0Lypcblx0XHQgICAg0YHRgNCw0LfRgyDQtNC10LvQsNC10Lwg0LTQvtGB0YLRg9C/0L3Ri9C80Lgg0LzQvtC00LXQu9C4IG5vdFJlY29yZCDQuNC3IG5jYENvbnRyb2xsZXJOYW1lYCDQsdGD0LTRg9GCINC00L7RgdGC0YPQv9C90Ysg0LrQsNC6IHRoaXMubnJgTW9kZWxOYW1lYFxuXHRcdCovXG5cdFx0bGV0IGludGVyZmFjZXMgPSB0aGlzLmFwcC5nZXRJbnRlcmZhY2VzKCk7XG5cdFx0dGhpcy5tYWtlID0ge307XG5cdFx0Zm9yIChsZXQgdCBpbiBpbnRlcmZhY2VzKSB7XG5cdFx0XHRpZiAoaW50ZXJmYWNlcy5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdHRoaXMubWFrZVt0XSA9IGludGVyZmFjZXNbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdFJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyKHRoaXMuZ2V0V29ya2luZygndmlld05hbWUnKSwgdGhpcy5nZXREYXRhKCksIHRoaXMuZ2V0V29ya2luZygnaGVscGVycycpKTtcblx0fVxuXG5cdHJlbmRlcih2aWV3TmFtZSA9J2RlZmF1bHQnIC8qIHZpZXcgbmFtZSAqLywgZGF0YSA9IHt9IC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzID0ge30vKiBjb3VsZCBiZSBub3QgcmVwcmVzZW50ZWQgKi8pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHZhciB2aWV3ID0gdGhpcy5nZXRWaWV3KHZpZXdOYW1lKTtcblxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3ID09PSAndW5kZWZpbmVkJyB8fCB2aWV3ID09PSBudWxsKSB7XG5cdFx0XHRcdHJlamVjdCgnTm8gdmlldyBmb3VuZCcsIHZpZXdOYW1lKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2aWV3ID0gbm90Q29tbW9uLmV4dGVuZCh7fSwgdmlldyk7XG5cdFx0XHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0XHRcdC8vINGN0LvQtdC80LXQvdGC0LAsINC90L4g0LjQt9Cy0LXRgdGC0L3QvtC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGA0LVcblx0XHRcdFx0aWYgKCgodHlwZW9mIHZpZXcudGFyZ2V0RWwgPT09ICd1bmRlZmluZWQnKSB8fCAodmlldy50YXJnZXRFbCA9PT0gbnVsbCkpICYmICh0eXBlb2Ygdmlldy50YXJnZXRRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy50YXJnZXRRdWVyeSAhPT0gbnVsbCAmJiB2aWV3LnRhcmdldFF1ZXJ5Lmxlbmd0aCA+IDApKSB7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iodmlldy50YXJnZXRRdWVyeSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHZpZXcuaGVscGVycywgaGVscGVycyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0fVxuXHRcdFx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0XHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckZyb21VUkwnKSkge1xuXHRcdFx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygdmlldy50ZW1wbGF0ZVVSTCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldy50ZW1wbGF0ZVVSTCA9PSBudWxsIHx8IHZpZXcudGVtcGxhdGVVUkwubGVuZ3RoID09IDApIHtcblx0XHRcdFx0XHRcdGxldCBwcmVmaXggPSAodmlldy5jb21tb24gPyB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5jb21tb24nKTogdGhpcy5nZXRNb2R1bGVQcmVmaXgoKSksXG5cdFx0XHRcdFx0XHRcdG5hbWUgPSAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiB2aWV3TmFtZSksXG5cdFx0XHRcdFx0XHRcdHBvc3RmaXggPSB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHRcdC8v0LPQtdC90LXRgNC40YDRg9C10Lwg0LDQtNGA0LXRgSDQv9C+INGI0LDQsdC70L7QvdGDXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gIFtwcmVmaXgsIG5hbWVdLmpvaW4oJy8nKSArIHBvc3RmaXg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8v0LAg0LXRgdC70Lgg0LXRgdGC0Ywg0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCwg0YLQvlxuXHRcdFx0XHRcdGlmICh2aWV3Lmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU5hbWUnKSkge1xuXHRcdFx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVOYW1lID0gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIHZpZXcudGVtcGxhdGVOYW1lICsgdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTp7XG5cdFx0XHRcdFx0XHRuYW1lOiB2aWV3LnRlbXBsYXRlTmFtZSxcblx0XHRcdFx0XHRcdHNyYzogdmlldy50ZW1wbGF0ZVVSTCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czpbWydhZnRlclJlbmRlcicsIHJlc29sdmVdXSxcblx0XHRcdFx0XHRvcHRpb25zOntcblx0XHRcdFx0XHRcdHRhcmdldEVsOiB2aWV3LnRhcmdldEVsLFxuXHRcdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRcdHJlbmRlckFuZDogT1BUX0RFRkFVTFRfUkVOREVSX0FORCB8fCB2aWV3LnJlbmRlckFuZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRBcHAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwO1xuXHR9XG5cblx0c2V0TW9kZWwobW9kZWwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGVsJywgbW9kZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kZWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnbW9kZWwnKTtcblx0fVxuXG5cdHNldFJlYWR5KHZhbCA9IHRydWUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdmFsKTtcblx0XHR2YWwgPyB0aGlzLnRyaWdnZXIoJ3JlYWR5JykgOiB0aGlzLnRyaWdnZXIoJ2J1c3knKTtcblx0fVxuXG5cdHNldFZpZXcobmFtZSwgdmlldyl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSwgdmlldyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRWaWV3cyh2aWV3cyl7XG5cdFx0Zm9yKGxldCB0IGluIHZpZXdzKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgdCksIHZpZXdzW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRWaWV3KG5hbWUgPSAnZGVmYXVsdCcpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpKTtcblx0fVxuXG5cdHNldE1vZHVsZU5hbWUodmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdtb2R1bGVOYW1lJywgdmFsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZHVsZU5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnbW9kdWxlTmFtZScpO1xuXHR9XG5cblx0Z2V0TW9kdWxlUHJlZml4KCl7XG5cdFx0cmV0dXJuIFt0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGVzJyksIHRoaXMuZ2V0TW9kdWxlTmFtZSgpXS5qb2luKCcvJyk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb250cm9sbGVyO1xuIiwiaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aC5qcyc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4uL25vdFJvdXRlcic7XG5cbnZhciBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgPSB7XG5cdGNvbnRlbnQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5pbmRleE9mKCdjYXBpdGFsaXplJykgPiAtMSkge1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0LnRvVXBwZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQudGV4dENvbnRlbnQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQ7XG5cdH0sXG5cdGJpbmQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpID0+IHtcblx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe1xuXHRcdFx0XHRcdHNjb3BlLFxuXHRcdFx0XHRcdGl0ZW0sXG5cdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBsaXZlRXZlbnRzID0gWydjaGFuZ2UnLCAna2V5dXAnXSxcblx0XHRcdG9uRXZlbnQgPSAoKSA9PiB7XG5cdFx0XHRcdGlmIChbJ2NoZWNrYm94JywgJ3JhZGlvJywgJ3NlbGVjdC1tdWx0aXBsZSddLmluZGV4T2Yoc2NvcGUuZWxlbWVudC50eXBlKSA+IC0xKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChzY29wZS5lbGVtZW50LnR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdyYWRpbyc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZD9zY29wZS5lbGVtZW50LnZhbHVlOm51bGwpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkID8gc2NvcGUuZWxlbWVudC52YWx1ZSA6IG51bGwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnc2VsZWN0LW11bHRpcGxlJzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bGV0IHNlbGVjdGVkID0gW10uc2xpY2UuY2FsbChzY29wZS5lbGVtZW50LnNlbGVjdGVkT3B0aW9ucykubWFwKGEgPT4gYS52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coJ3NlbGVjdC1tdWx0aXBsZScsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2cobm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyksICcgLT4gJyxzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgIT09IHRydWUpIHtcblx0XHRcdGlmKHNjb3BlLmVsZW1lbnQudHlwZSA9PT0gJ3RleHRhcmVhJyl7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGxldCB0IG9mIGxpdmVFdmVudHMpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHQsIG9uRXZlbnQpO1xuXHRcdFx0fVxuXHRcdFx0c2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSA9IHRydWU7XG5cdFx0fVxuXHR9LFxuXHRhdHRyOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpID8gcmVzKHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlcyk7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoc2NvcGUucGFyYW1zWzBdLCBzY29wZS5hdHRyaWJ1dGVSZXN1bHQpO1xuXHR9LFxuXHRuYW1lOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKCAvKnNjb3BlLCBpdGVtLCBoZWxwZXJzKi8gKSB7XG5cblx0fSxcblx0Y2hlY2tlZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzdWx0ID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzdWx0ID09PSAnZnVuY3Rpb24nKSA/IHJlc3VsdCh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXN1bHQpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA/IHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgdHJ1ZSkgOiBzY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuXHR9LFxuXHRjbGFzczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKSA/IHJlcyh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoIDwgMyB8fCBpc05hTihzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKSB7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCB1c2VkID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNjb3BlLnBhcmFtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoaSA9PT0gc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdFx0dXNlZCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICghdXNlZCkge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdG9wdGlvbnM6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0b3B0aW9uID0gbnVsbCxcblx0XHRcdHZhbHVlRmllbGROYW1lID0gJ3ZhbHVlJyxcblx0XHRcdGxhYmVsRmllbGROYW1lID0gJ25hbWUnLFxuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGQnKSAmJiBoZWxwZXJzLmZpZWxkLmhhc093blByb3BlcnR5KCduYW1lJykgPyBoZWxwZXJzLmZpZWxkLm5hbWUgOiAndmFsdWUnO1xuXHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzJdO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIGhlbHBlcnMgIT09IG51bGwgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpICYmIGhlbHBlcnMuZGVmYXVsdCkge1xuXHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsICcnKTtcblx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGhlbHBlcnMucGxhY2Vob2xkZXI7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0dmFyIGxpYiA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxpYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKTtcblx0XHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gbGliW2ldW2xhYmVsRmllbGROYW1lXTtcblx0XHRcdFx0aWYgKGhlbHBlcnMuZmllbGQuYXJyYXkpIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdLmluZGV4T2YobGliW2ldW3ZhbHVlRmllbGROYW1lXSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSA9PT0gbGliW2ldW3ZhbHVlRmllbGROYW1lXSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aHJlZjpmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0aWYgKCFzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBub3RSb3V0ZXIuZ2V0RnVsbFJvdXRlKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdG5vdFJvdXRlci5uYXZpZ2F0ZShub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5ub3RSb3V0ZXJJbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fVxuXHR9XG59O1xuZXhwb3J0IGRlZmF1bHQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliO1xuIiwiaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfRk9STV9QUkVGSVggPSAnZm9ybV8nLFxuXHRPUFRfREVGQVVMVF9ST0xFX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX0ZPUk1fVElUTEUgPSAnRm9ybSBkZWZhdWx0IHRpdGxlJyxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiA9IHtcblxuXHR9LFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCA9IFsnb3B0aW9ucycsICdtYW5pZmVzdCcsICdhcHAnXTtcblxuY2xhc3Mgbm90Rm9ybSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygncHJlZml4JywgT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgpO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudHMnLCBbXSk7XG5cdFx0aWYgKCF0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5zZXREYXRhKG5ldyBub3RSZWNvcmQoe30sIHRoaXMuZ2V0RGF0YSgpKSk7XG5cdFx0fVxuXHRcdHRoaXMub24oJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbigncmVzZXQnLCB0aGlzLm9uUmVzZXQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2FuY2VsJywgdGhpcy5vbkNhbmNlbC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCk7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKCkge1xuXHRcdGxldCBtYW5pZmVzdCA9IHRoaXMuZ2V0TWFuaWZlc3QoKTtcblx0XHRpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QuYWN0aW9ucykge1xuXHRcdFx0cmV0dXJuIG1hbmlmZXN0LmFjdGlvbnMuaGFzT3duUHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKSkgPyBtYW5pZmVzdC5hY3Rpb25zW3RoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJyldIDogbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Rm9ybUZpZWxkc0xpc3QoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKSxcblx0XHRcdGxpc3QgPSBbXSxcblx0XHRcdHJvbGUgPSB0aGlzLmdldE9wdGlvbnMoJ3JvbGUnLCBPUFRfREVGQVVMVF9ST0xFX05BTUUpO1xuXHRcdGlmIChhY3Rpb25EYXRhKSB7XG5cblx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcykge1xuXHRcdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMuaGFzT3duUHJvcGVydHkocm9sZSkpIHtcblx0XHRcdFx0XHRsaXN0ID0gYWN0aW9uRGF0YS5maWVsZHNbcm9sZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHQvKlxuXHRcdFJlbmRlcmluZ1xuXHQqL1xuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0fVxuXG5cdGdldFBhcnRUZW1wbGF0ZU5hbWUoZm9ybVBhcnQpe1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgZm9ybVBhcnQ7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBpbnB1dCA9IHtcblx0XHRcdFx0ZGF0YTogdGhpcy5nZXRXcmFwcGVyRGF0YSgpLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZSgnd3JhcHBlcicpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0aWQ6IHRoaXMuZ2V0T3B0aW9ucygnaWQnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6W1xuXHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCB0aGlzLmJpbmRGb3JtRXZlbnRzLmJpbmQodGhpcyldLFxuXHRcdFx0XHRcdFtbJ2FmdGVyUmVuZGVyJywgJ2FmdGVyVXBkYXRlJ10sIHRoaXMucmVuZGVyQ29tcG9uZW50cy5iaW5kKHRoaXMpXVxuXHRcdFx0XHRdXG5cdFx0XHR9O1xuXHRcdFx0bGV0IHdyYXBwZXIgPSBuZXcgbm90Q29tcG9uZW50KGlucHV0KTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnd3JhcHBlcicsIHdyYXBwZXIpO1xuXHRcdH1cblx0fVxuXG5cdGdldFdyYXBwZXJEYXRhKCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiBhY3Rpb25EYXRhLnRpdGxlID8gYWN0aW9uRGF0YS50aXRsZSA6IE9QVF9ERUZBVUxUX0ZPUk1fVElUTEVcblx0XHR9O1xuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpIHtcblxuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KClbdF07XG5cdFx0XHRcdHRoaXMuYWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGVhckZpZWxkc0NvbXBvbmVudHMoKSB7XG5cdFx0bGV0IGNvbXBzID0gdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJyk7XG5cdFx0d2hpbGUgKGNvbXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbXBzWzBdLmNvbXBvbmVudC5kZXN0cm95KCk7XG5cdFx0XHRjb21wcy5zcGxpY2UoMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlicygpe1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRvcHRpb25zOiB7fSxcblx0XHRcdG1hbmlmZXN0OiB7fSxcblx0XHRcdGFwcDoge30sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAobm90Q29tbW9uLmdldEFwcCgpICYmIG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKSl7XG5cdFx0XHRyZXN1bHQuYXBwID0gbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQgJiYgdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKSl7XG5cdFx0XHRyZXN1bHQubWFuaWZlc3QgPSB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpLmZpZWxkcztcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSB7XG5cdFx0bGV0IGRlZiA9IE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04sXG5cdFx0XHRmaWVsZHNMaWJzID0gdGhpcy5nZXRGaWVsZHNMaWJzKCk7XG5cdFx0Zm9yKGxldCB0IG9mIE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUKXtcblx0XHRcdGlmIChmaWVsZHNMaWJzLmhhc093blByb3BlcnR5KHQpICYmIGZpZWxkc0xpYnNbdF0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSl7XG5cdFx0XHRcdHJldHVybiBmaWVsZHNMaWJzW3RdW2ZpZWxkTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkZWY7XG5cdH1cblxuXHRhZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpIHtcblx0XHRsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSk7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKT0+e1xuXHRcdFx0XHRyZXR1cm4gcGFyYW1zLml0ZW0udmFsdWUgPT09IHRoaXMuZ2V0RGF0YShmaWVsZE5hbWUpO1xuXHRcdFx0fSxcblx0XHRcdGZpZWxkOiByZWMuZmllbGQsXG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKVxuXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0Rm9ybVRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCcsXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlckRhdGFDaGFuZ2UnLCB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMocGFyYW1zKXtcblx0XHRub3RDb21tb24ubG9nKCdjb2xsZWN0IGRhdGEgZnJvbSBjb21wb25lbnRzJywgcGFyYW1zKTtcblx0fVxuXG5cdGdldEZvcm1UYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jyl7XG5cdFx0aWYgKCF0YXJnZXQpe3RhcmdldCA9ICdib2R5Jzt9XG5cdFx0bGV0IHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0IT09J2JvZHknKXtcblx0XHRcdHRhcmdldCA9ICdib2R5Jztcblx0XHRcdHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0fVxuXHRcdGlmKCFyZXMgJiYgdGFyZ2V0PT0nYm9keScpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHRjb2xsZWN0RGF0YSgpIHtcblx0XHQvL2xldCBkYXRhID0gdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcyk7XHRcdFxuXHR9XG5cblx0YmluZEZvcm1FdmVudHMoKXtcblx0XHRsZXQgdGFyZ2V0UXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5Jyk7XG5cdFx0aWYodGFyZ2V0UXVlcnkpe1xuXHRcdFx0bGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0UXVlcnkpO1xuXHRcdFx0aWYodGFyZ2V0KXtcblx0XHRcdFx0dGhpcy5zZXRPcHRpb25zKCd0YXJnZXRFbCcsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpe1xuXHRcdFx0bGV0XHRmb3JtID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcblx0XHRcdGlmKGZvcm0pe1xuXHRcdFx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSk7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCB0aGlzLm9uUmVzZXQuYmluZCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCkge1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpIHtcblxuXHR9XG5cblx0b25SZXNldCgpIHtcblxuXHR9XG5cblx0Z2V0RmllbGRzKCkge1xuXG5cdH1cblxuXHRhZGRGaWVsZCgpIHtcblxuXHR9XG5cblx0cmVtb3ZlRmllbGQoKSB7XG5cblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Rm9ybTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX1BBR0VfU0laRSA9IDIwLFxuXHRPUFRfREVGQVVMVF9QQUdFX05VTUJFUiA9IDAsXG5cdE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OID0gMSxcblx0T1BUX0RFRkFVTFRfU09SVF9GSUVMRCA9ICdfaWQnLFxuXHRPUFRfRklFTERfTkFNRV9QUkVfUFJPQyA9ICdwcmVwcm9jZXNzb3InO1xuXG5jbGFzcyBub3RUYWJsZSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIFtdKTtcblx0XHRpZighdGhpcy5nZXREYXRhKCkgfHwgIUFycmF5LmlzQXJyYXkodGhpcy5nZXREYXRhKCdyb3dzJykpKXtcblx0XHRcdHRoaXMuc2V0RGF0YSh7cm93czpbXX0pO1xuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR0aGlzLnJlc2V0RmlsdGVyKCk7XG5cdFx0dGhpcy5yZXNldFNvcnRlcigpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50JykpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50JykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBjb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogJ3RhYmxlX3dyYXBwZXInXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRyZW5kZXJBbmQ6IHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgJ2FmdGVyVXBkYXRlJ10sIHRoaXMucmVuZGVySW5zaWRlLmJpbmQodGhpcylcblx0XHRcdFx0XHRdXG5cdFx0XHRcdF1cblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBjb21wb25lbnQpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlckluc2lkZSgpIHtcblx0XHR0aGlzLnJlbmRlckhlYWRlcigpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHRcdHRoaXMucmVuZGVyQm9keSgpO1xuXHRcdHRoaXMuYmluZFNlYXJjaCgpO1xuXHRcdHRoaXMuYmluZEN1c3RvbUJpbmRpbmdzKCk7XG5cdH1cblxuXHRyZW5kZXJIZWFkZXIoKSB7XG5cdFx0dmFyIHRhYmxlSGVhZGVyID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIHRyJyk7XG5cdFx0aWYgKCF0YWJsZUhlYWRlcikgcmV0dXJuO1xuXHRcdGxldCBmaWVsZHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgbmV3VGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUSCcpO1xuXHRcdFx0bmV3VGguaW5uZXJIVE1MID0gZmllbGRzW2ldLnRpdGxlO1xuXHRcdFx0aWYgKGZpZWxkc1tpXS5oYXNPd25Qcm9wZXJ0eSgnc29ydGFibGUnKSAmJiBmaWVsZHNbaV0uc29ydGFibGUpIHtcblx0XHRcdFx0dGhpcy5hdHRhY2hTb3J0aW5nSGFuZGxlcnMobmV3VGgsIGZpZWxkc1tpXS5wYXRoKTtcblx0XHRcdH1cblx0XHRcdHRhYmxlSGVhZGVyLmFwcGVuZENoaWxkKG5ld1RoKTtcblx0XHR9XG5cdH1cblxuXHRhdHRhY2hTb3J0aW5nSGFuZGxlcnMoaGVhZENlbGwsIGZpZWxkTmFtZSkge1xuXHRcdGhlYWRDZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuY2hhbmdlU29ydGluZ09wdGlvbnMoaGVhZENlbGwsIGZpZWxkTmFtZSk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdFx0aGVhZENlbGwuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHR9XG5cblx0Y2hhbmdlU29ydGluZ09wdGlvbnMoZWwsIGZpZWxkTmFtZSkge1xuXHRcdGlmIChmaWVsZE5hbWUgPT09IHRoaXMuZ2V0U29ydGVyKCkuc29ydEJ5RmllbGQpe1xuXHRcdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0XHRzb3J0QnlGaWVsZDogZmllbGROYW1lLFxuXHRcdFx0XHRzb3J0RGlyZWN0aW9uOiAtMSAqIHRoaXMuZ2V0U29ydGVyKCkuc29ydERpcmVjdGlvbixcblx0XHRcdH0pO1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0XHRzb3J0QnlGaWVsZDogZmllbGROYW1lLFxuXHRcdFx0XHRzb3J0RGlyZWN0aW9uOiBPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTixcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZiAocGFyc2VJbnQoZWwuZGF0YXNldC5zb3J0aW5nRGlyZWN0aW9uKSA9PT0gMCkge1xuXHRcdFx0ZWwuZGF0YXNldC5zb3J0aW5nRGlyZWN0aW9uID0gMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwuZGF0YXNldC5zb3J0aW5nRGlyZWN0aW9uID0gcGFyc2VJbnQoZWwuZGF0YXNldC5zb3J0aW5nRGlyZWN0aW9uKSAqIC0xO1xuXHRcdH1cblx0XHRpZiAoZWwucGFyZW50Tm9kZSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbC5wYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldID09PSBlbCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19hc2MnKTtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHBhcnNlSW50KGVsLmRhdGFzZXQuc29ydGluZ0RpcmVjdGlvbikgPiAwKSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdhc2NlbmRpbmcnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnZGVzY2VuZGluZycpO1xuXHRcdH1cblx0fVxuXG5cdHNldFNvcnRlcihoYXNoKSB7XG5cdFx0Ly9jb25zb2xlLmxvZygnc2V0U29ydGVyJywgaGFzaCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBoYXNoKTtcblx0XHR0aGlzLmludmFsaWRhdGVEYXRhKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldFNvcnRlcigpe1xuXHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdHNvcnRCeUZpZWxkOiBPUFRfREVGQVVMVF9TT1JUX0ZJRUxELFxuXHRcdFx0c29ydERpcmVjdGlvbjogT1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04sXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRTb3J0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc29ydGVyJyk7XG5cdH1cblxuXHRnZXRGaWx0ZXJTZWFyY2goKSB7XG5cdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5nZXRGaWx0ZXIoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRGaWx0ZXIoKSAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2ggIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoICE9PSBudWxsKSA/IHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoLnRvU3RyaW5nKCkgOiAnJztcblx0fVxuXG5cdGludmFsaWRhdGVEYXRhKCkge1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2xpdmVMb2FkJykgJiYgdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpKSB7XG5cdFx0XHR3aGlsZSh0aGlzLmdldERhdGEoJ3Jvd3MnKS5sZW5ndGg+MCl7XG5cdFx0XHRcdHRoaXMuZ2V0RGF0YSgncm93cycpLnBvcCgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5yZXNldFBhZ2VyKCk7XG5cdFx0fVxuXHR9XG5cblx0c2V0RmlsdGVyKGhhc2gpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcicsIGhhc2gpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZURhdGEoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHRoaXMuc2V0RmlsdGVyKHt9KTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VyKGhhc2gpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3BhZ2VyJywgaGFzaCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldFBhZ2VyKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncGFnZXInLCB7XG5cdFx0XHRwYWdlU2l6ZTogaXNOYU4odGhpcy5nZXRPcHRpb25zKCdwYWdlU2l6ZScpKSA/IE9QVF9ERUZBVUxUX1BBR0VfU0laRTp0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJyksXG5cdFx0XHRwYWdlTnVtYmVyOiBpc05hTih0aGlzLmdldE9wdGlvbnMoJ3BhZ2VOdW1iZXInKSkgPyBPUFRfREVGQVVMVF9QQUdFX05VTUJFUjp0aGlzLmdldE9wdGlvbnMoJ3BhZ2VOdW1iZXInKSxcblx0XHR9KTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJyk7XG5cdH1cblxuXHRzZXRVcGRhdGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwZGF0aW5nJywgdHJ1ZSk7XG5cdH1cblxuXHRzZXRVcGRhdGVkKCkge1xuXHRcdHRoaXMuZ2V0V29ya2luZygndXBkYXRpbmcnLCBmYWxzZSk7XG5cdH1cblxuXHRpZlVwZGF0aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3VwZGF0aW5nJyk7XG5cdH1cblxuXHR1cGRhdGVEYXRhKCkge1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2xpdmVMb2FkJykgJiYgdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2UnKSkge1xuXHRcdFx0aWYgKHRoaXMuaWZVcGRhdGluZygpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vbG9hZCBmcm9tIHNlcnZlclxuXHRcdFx0bGV0IHF1ZXJ5ID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2UnKSh7fSlcblx0XHRcdFx0LnNldEZpbHRlcih0aGlzLmdldEZpbHRlcigpKVxuXHRcdFx0XHQuc2V0U29ydGVyKHRoaXMuZ2V0U29ydGVyKCkpXG5cdFx0XHRcdC5zZXRQYWdlcih0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUsIHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyKTtcblx0XHRcdHRoaXMuc2V0VXBkYXRpbmcoKTtcblx0XHRcdHF1ZXJ5LiRsaXN0KClcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCckbGlzdCBmb3IgdGFibGUnLCBkYXRhKTtcblx0XHRcdFx0XHR0aGlzLnNldERhdGEoe1xuXHRcdFx0XHRcdFx0cm93czogdGhpcy5nZXREYXRhKCdyb3dzJykuY29uY2F0KGRhdGEpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dGhpcy5wcm9jY2Vzc0RhdGEoKTtcblx0XHRcdFx0XHR0aGlzLnJlZnJlc2hCb2R5KCk7XG5cdFx0XHRcdFx0dGhpcy5zZXRVcGRhdGVkKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcihlKTtcblx0XHRcdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vbG9jYWwgbWFnaWNcblx0XHRcdHRoaXMuc2V0VXBkYXRpbmcoKTtcblx0XHRcdHRoaXMucHJvY2Nlc3NEYXRhKCk7XG5cdFx0XHR0aGlzLnJlZnJlc2hCb2R5KCk7XG5cdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHR9XG5cdH1cblxuXHRwcm9jY2Vzc0RhdGEoKSB7XG5cdFx0dmFyIHRoYXRGaWx0ZXIgPSB0aGlzLmdldEZpbHRlcigpO1xuXHRcdGlmICh0eXBlb2YgdGhhdEZpbHRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdEZpbHRlciAhPT0gbnVsbCAmJiB0eXBlb2YgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2ggIT09ICd1bmRlZmluZWQnICYmIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoICE9PSBudWxsICYmIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoLmxlbmd0aCA+IDApIHtcblx0XHRcdC8vXG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIHRoaXMuZ2V0RGF0YSgncm93cycpLmZpbHRlcih0aGlzLnRlc3REYXRhSXRlbS5iaW5kKHRoaXMpKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgdGhpcy5nZXREYXRhKCdyb3dzJykpO1xuXHRcdH1cblx0XHQvLy8vc29ydGVyXG5cdFx0dmFyIHRoYXRTb3J0ZXIgPSB0aGlzLmdldFNvcnRlcigpO1xuXHRcdGlmICh0eXBlb2YgdGhhdFNvcnRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdFNvcnRlciAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5zb3J0KChpdGVtMSwgaXRlbTIpID0+IHtcblx0XHRcdFx0bGV0IHQxID0gbm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCwgaXRlbTEsIHt9KSxcblx0XHRcdFx0XHR0MiA9IG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsaXRlbTIse30pO1xuXHRcdFx0XHRpZiAoaXNOYU4odDEpKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0MSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHQyICE9PSAndW5kZWZpbmVkJyAmJiB0MS5sb2NhbGVDb21wYXJlKXtcblx0XHRcdFx0XHRcdHJldHVybiB0MS5sb2NhbGVDb21wYXJlKCkgKiAtIHRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gKCh0MSA8IHQyKSA/IDEgOiAtMSkgKiB0aGF0U29ydGVyLnNvcnREaXJlY3Rpb247XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGJpbmRTZWFyY2goKSB7XG5cdFx0dmFyIHNlYXJjaEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJzZWFyY2hcIl0nKVswXTtcblx0XHRpZiAoIXNlYXJjaEVsKSByZXR1cm47XG5cdFx0dmFyIG9uRXZlbnQgPSAoZSkgPT4ge1xuXHRcdFx0dGhpcy5zZXRGaWx0ZXIoe1xuXHRcdFx0XHRmaWx0ZXJTZWFyY2g6IGUuY3VycmVudFRhcmdldC52YWx1ZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXHRcdHNlYXJjaEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25FdmVudCk7XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcignZW50ZXInLCBvbkV2ZW50KTtcblx0fVxuXG5cblx0YmluZEN1c3RvbUJpbmRpbmdzKCkge1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpIHx8ICF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Zm9yICh2YXIgc2VsZWN0b3IgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpKSB7XG5cdFx0XHR2YXIgZWxzID0gdGhpcy5nZXRPcHRpb24oJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRmb3IgKHZhciBlbElkID0gMDsgZWxJZCA8IGVscy5sZW5ndGg7IGVsSWQrKykge1xuXHRcdFx0XHR2YXIgZWwgPSBlbHNbZWxJZF07XG5cdFx0XHRcdGZvciAodmFyIGV2ZW50IGluIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl0pIHtcblx0XHRcdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJylbc2VsZWN0b3JdW2V2ZW50XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRsb2FkTmV4dCgpIHtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJykucGFnZU51bWJlcisrO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVuZGVyUm93KGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG5ld1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RSJyksXG5cdFx0XHRmaWVsZHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgbmV3VGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdURCcpLFxuXHRcdFx0XHRmaWVsZCA9IGZpZWxkc1tpXSxcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gbnVsbCxcblx0XHRcdFx0dmFsID0gbm90UGF0aC5nZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdlZGl0YWJsZScpICYmICFmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnY29tcG9uZW50JykpIHtcblx0XHRcdFx0bmV3VGQuc2V0QXR0cmlidXRlKCdjb250ZW50RWRpdGFibGUnLCB0cnVlKTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC5wYXRoID0gZmllbGQucGF0aDtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC5pdGVtSWQgPSBpdGVtW3RoaXMuZ2V0T3B0aW9ucygnaXRlbUlkRmllbGQnKV07XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQudmFsdWUgPSB2YWw7XG5cdFx0XHRcdG5ld1RkLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKT0+e1xuXHRcdFx0XHRcdG5vdFBhdGguc2V0KGZpZWxkLnBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLCBuZXdUZC50ZXh0Q29udGVudCk7XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KE9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DKSkge1xuXHRcdFx0XHRwcmVwcm9jZXNzZWQgPSBmaWVsZFtPUFRfRklFTERfTkFNRV9QUkVfUFJPQ10odmFsLCBpdGVtLCBpbmRleCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHRcdG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRcdGRhdGE6IGZpZWxkLmNvbXBvbmVudC5kYXRhIHx8IHByZXByb2Nlc3NlZCB8fCB7dmFsLCBpdGVtLCBpbmRleH0sXG5cdFx0XHRcdFx0dGVtcGxhdGU6IGZpZWxkLmNvbXBvbmVudC50ZW1wbGF0ZSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogbmV3VGQsXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBmaWVsZC5jb21wb25lbnQuZXZlbnRzIHx8IFtdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3VGQuaW5uZXJIVE1MID0gcHJlcHJvY2Vzc2VkIHx8IHZhbDtcblx0XHRcdH1cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykgJiYgZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdGZvciAodmFyIGogaW4gZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcihqLCAoZSk9Pntcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHJldHVybiBmaWVsZC5ldmVudHNbal0oe1xuXHRcdFx0XHRcdFx0XHRldmVudDogZSxcblx0XHRcdFx0XHRcdFx0ZWxlbWVudDogbmV3VGQsXG5cdFx0XHRcdFx0XHRcdGl0ZW06IGl0ZW0sXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB2YWwsXG5cdFx0XHRcdFx0XHRcdGZpZWxkOiBmaWVsZFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRuZXdSb3cuYXBwZW5kQ2hpbGQobmV3VGQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdwcm9jUm93JykpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3Byb2NSb3cnKShuZXdSb3csIGl0ZW0pO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3Um93O1xuXHR9XG5cblx0cmVmcmVzaEJvZHkoKSB7XG5cdFx0dmFyIHRib2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXHRcdGlmICghdGJvZHkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5jbGVhckJvZHkoKTtcblx0XHR0aGlzLmNoZWNrRmlsdGVyZWQoKTtcblx0XHR2YXIgdGhpc1BhZ2VTdGFydHMgPSAwLFxuXHRcdFx0bmV4dFBhZ2VFbmRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyICsgMSk7XG5cdFx0Zm9yICh2YXIgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0dGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJSb3codGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKVtpXSkpO1xuXHRcdH1cblx0fVxuXG5cdGZpbmRCb2R5KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGJvZHknKTtcblx0fVxuXG5cdGNsZWFyQm9keSgpIHtcblx0XHR2YXIgdGFibGVCb2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXHRcdGlmICghdGFibGVCb2R5KSByZXR1cm47XG5cdFx0dGFibGVCb2R5LmlubmVySFRNTCA9ICcnO1xuXHR9XG5cblx0Y2hlY2tGaWx0ZXJlZCgpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsW10pO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlckJvZHkoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ29uZVBhZ2VyJykpIHtcblx0XHRcdHRoaXMuY2xlYXJCb2R5KCk7XG5cdFx0fVxuXHRcdHRoaXMuY2hlY2tGaWx0ZXJlZCgpO1xuXHRcdHZhciB0aGlzUGFnZVN0YXJ0cyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciksXG5cdFx0XHRuZXh0UGFnZUVuZHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIgKyAxKSxcblx0XHRcdHRib2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0dGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJSb3codGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKVtpXSkpO1xuXHRcdH1cblx0fVxuXG5cdHRlc3REYXRhSXRlbShpdGVtKXtcblx0XHR2YXIgc3RyVmFsdWUgPSB0aGlzLmdldEZpbHRlclNlYXJjaCgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0Zm9yKHZhciBrIGluIGl0ZW0pe1xuXHRcdFx0dmFyIHRvQ29tcCA9IGl0ZW1ba10udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKHRvQ29tcC5pbmRleE9mKHN0clZhbHVlKT4tMSl7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90VGFibGU7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbi8vaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG4vL2ltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuY2xhc3Mgbm90VmlldyBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgfHwge30pO1xuXHRcdHRoaXMuc2V0RGF0YShpbnB1dC5kYXRhIHx8IHt9KTtcblx0XHR0aGlzLnNldFdvcmtpbmcoaW5wdXQud29ya2luZyB8fCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RWaWV3O1xuIiwiLypcblx0Q29tbW9uIGZ1bmN0aW9uc1xuKi9cbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuLypcblx0ZnJhbWV3b3JrIHdpZGUgcGFyc2VyIGZvciBkYXRhIGFjY2Vzc1xuKi9cbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4vbm90Um91dGVyJztcblxuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG4vKlxuXHRiYXNpYyBldmVudCBoYW5kbGVycyBhbmQgY29yZSBkYXRhIG1vZGlmaWVyc1xuKi9cbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG4vKlxuXHRzbWFydGVyIGltYWdlIGNvbnRyb2xcbiovXG5pbXBvcnQgbm90SW1hZ2UgZnJvbSAnLi90ZW1wbGF0ZS9ub3RJbWFnZSc7XG4vKlxuXHRhcHBsaWNhdGlvbiBtYWluIGluZnJhc3RydWN0dXJlIHNldHRlclxuKi9cbmltcG9ydCBub3RBcHAgZnJvbSAnLi9ub3RBcHAnO1xuLypcblx0ZGFkZHkgZm9yIHVzZXIgY29udHJvbGxlcnNcbiovXG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuL25vdENvbnRyb2xsZXInO1xuLypcblx0dGVtcGxhdGluZyBhbmQgY29tbW9uIHN0cnVjdHVyZXNcbiovXG5cbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL3RlbXBsYXRlL25vdFJlbmRlcmVyJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7IC8vIHNtYXJ0ZXIgd2l0aCBiaW5kaW5ncyBmb3IgZXZlbnRzLCBhY3R1YWx5IHByb3h5XG5cbmltcG9ydCBub3RGb3JtIGZyb20gJy4vY29tcG9uZW50cy9ub3RGb3JtJztcbmltcG9ydCBub3RUYWJsZSBmcm9tICcuL2NvbXBvbmVudHMvbm90VGFibGUnO1xuaW1wb3J0IG5vdFZpZXcgZnJvbSAnLi9jb21wb25lbnRzL25vdFZpZXcnO1xuXG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJzsgLy9cdGhvdyB0byBpbnRlcmFjdCB3aXRoIGRhdGEgb24gc2VydmVyXG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJzsgLy9cdHdyYXBwZXIgZm9yIGRhdGEgd2l0aCBzZXJ2ZXI8LT52aWV3IGxpdmUgaW50ZXJhY3Rpb25zXG5cbm5vdFRlbXBsYXRlUHJvY2Vzc29ycy5hZGQobm90VGVtcGxhdGVQcm9jZXNzb3JzTGliKTtcblxuZXhwb3J0IHtcblx0bm90Q29tbW9uLFxuXHRub3RQYXRoLFxuXHRub3RCYXNlLFxuXHRub3RJbWFnZSxcblx0bm90QXBwLFxuXHRub3RBUEksXG5cdG5vdENvbnRyb2xsZXIsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29ycyxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLFxuXHRub3RUZW1wbGF0ZUNhY2hlLFxuXHRub3RSZW5kZXJlcixcblx0bm90Q29tcG9uZW50LFxuXHRub3RGb3JtLFxuXHRub3RSb3V0ZXIsXG5cdG5vdFRhYmxlLFxuXHRub3RWaWV3LFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJ1cGxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25Qcm9ncmVzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNwb25zZVR5cGUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ3aXRoQ3JlZGVudGlhbHMiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsImdldFNlc3Npb25JRCIsImZpbGUiLCJ0eXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwibmFtZSIsInNlbmQiLCJtZXRob2QiLCJkYXRhIiwib25sb2FkIiwidCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJwYXJzZUludCIsInJlc3BvbnNlVGV4dCIsImUiLCJnZXRDb29raWUiLCJ2YWx1ZSIsImRvY3VtZW50IiwiY29va2llIiwicGFydHMiLCJzcGxpdCIsImxlbmd0aCIsInBvcCIsInNoaWZ0IiwiQ29tbW9uTG9ncyIsImxvZyIsImFyZ3VtZW50cyIsImVycm9yIiwidHJhY2UiLCJNQU5BR0VSIiwiU3ltYm9sIiwiQ29tbW9uU2hvcnRzIiwiZ2V0TWFuYWdlciIsImdldEFQSSIsInYiLCJDb21tb25PYmplY3RzIiwiZGVmYXVsdHMiLCJvcHRpb25zIiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiY2FsbCIsInRhcmdldCIsInNvdXJjZXMiLCJmb3JFYWNoIiwiZGVzY3JpcHRvcnMiLCJrZXlzIiwic291cmNlIiwicmVkdWNlIiwia2V5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZGVzY3JpcHRvciIsInN5bSIsImVudW1lcmFibGUiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiYmlnIiwic21hbGwiLCJvYmoiLCJmaWx0ZXIiLCJjb250YWluc09iaiIsImljb25zIiwiYmF0Y2giLCJnZXREYXRhIiwicHVzaCIsImEiLCJiIiwicCIsImVxdWFsIiwidG9TdHJpbmciLCJkZWZhdWx0VmFsdWUiLCJvYmoxIiwib2JqMiIsImpRdWVyeSIsImV4dGVuZCIsInZhbCIsInJlZ2lzdHJ5IiwiQ29tbW9uU3RyaW5ncyIsInN0cmluZyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsIkNvbW1vbkZ1bmN0aW9ucyIsImZ1bmNzIiwicmVzdWx0IiwiZnVuYyIsIkNvbW1vbkRPTSIsImVsIiwic3RhcnRzV2l0aCIsImFsbEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImxpc3QiLCJqIiwiYXR0cyIsImF0dHJpYnV0ZXMiLCJuIiwibm9kZU5hbWUiLCJDb21tb25BcHAiLCJzdGFydGVyIiwibm90Q29tbW9uIiwiYXNzaWduIiwiZXh0ZW5kV2l0aCIsIlNVQl9QQVRIX1NUQVJUIiwiU1VCX1BBVEhfRU5EIiwiUEFUSF9TUExJVCIsIlBBVEhfU1RBUlRfT0JKRUNUIiwiUEFUSF9TVEFSVF9IRUxQRVJTIiwiRlVOQ1RJT05fTUFSS0VSIiwiTUFYX0RFRVAiLCJub3RQYXRoIiwicGF0aCIsInN1YlBhdGgiLCJmaW5kIiwic3ViIiwicGFyc2VkIiwic3ViZiIsInJlcGxhY2UiLCJpdGVtIiwiaGVscGVycyIsInN1YlBhdGhQYXJzZWQiLCJmaW5kTmV4dFN1YlBhdGgiLCJnZXRWYWx1ZUJ5UGF0aCIsInJlcGxhY2VTdWJQYXRoIiwicGFyc2VTdWJzIiwiYXR0clZhbHVlIiwic2V0VmFsdWVCeVBhdGgiLCJpc1JlY29yZCIsIm5vcm1pbGl6ZVBhdGgiLCJ0cmlnZ2VyIiwic2V0Iiwic3RlcCIsImhlbHBlciIsInJTdGVwIiwidW5kZWZpbmVkIiwiQXJyYXkiLCJpc0FycmF5IiwicGFyc2VQYXRoU3RlcCIsIm9iamVjdCIsImF0dHJQYXRoIiwiYXR0ck5hbWUiLCJpc0Z1bmN0aW9uIiwibmV3T2JqIiwiYXJncyIsImpvaW4iLCJNRVRBX01FVEhPRF9JTklUIiwiTUVUQV9FVkVOVFMiLCJNRVRBX0RBVEEiLCJNRVRBX1dPUktJTkciLCJNRVRBX09QVElPTlMiLCJub3RCYXNlIiwiaW5wdXQiLCJldmVudHMiLCJvbiIsInNldERhdGEiLCJzZXRXb3JraW5nIiwid29ya2luZyIsInNldE9wdGlvbnMiLCJ3aGF0IiwicmVzIiwic2V0Q29tbW9uIiwiZ2V0Q29tbW9uIiwiZ2V0T3B0aW9ucyIsImdldFdvcmtpbmciLCJldmVudE5hbWVzIiwiZXZlbnRDYWxsYmFja3MiLCJvbmNlIiwiZGVmaW5lSWZOb3RFeGlzdHMiLCJmcm9tIiwiZXZlbnROYW1lIiwiZXZlbnQiLCJvZmYiLCJjYWxsYmFja3MiLCJjYWxsYmFjayIsInRhcmdldElkIiwic3BsaWNlIiwiT1BUX01PREVfSElTVE9SWSIsIk9QVF9NT0RFX0hBU0giLCJPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCIsIm5vdFJvdXRlciIsInJvb3QiLCJjbGVhclNsYXNoZXMiLCJyZSIsImhhbmRsZXIiLCJydWxlIiwiYWRkIiwicGFyYW0iLCJyIiwiZnJhZ21lbnQiLCJsb2NhdGlvbiIsImRlY29kZVVSSSIsInBhdGhuYW1lIiwic2VhcmNoIiwid2luZG93IiwibWF0Y2giLCJocmVmIiwiY3VycmVudCIsImdldEZyYWdtZW50IiwiaW5pdCIsImlzSW5pdGlhbGl6ZWQiLCJjaGVjayIsInNldEluaXRpYWxpemVkIiwibG9vcEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjaGVja0xvY2F0aW9uIiwiYmluZCIsImhyZWZDbGljayIsImZ1bGxSRSIsImFwcGx5IiwiaG9zdCIsInB1c2hTdGF0ZSIsImdldEZ1bGxSb3V0ZSIsIm5vdEFQSU9wdGlvbnMiLCJub3RBUElRdWVlIiwicmVxdWVzdHNQZXJTZWNvbmQiLCJxdWVlIiwiaW50IiwiaW5Qcm9ncmVzcyIsInRvQ2FsbCIsImNsZWFySW50ZXJ2YWwiLCJydW4iLCJub3RBUEkiLCJpZCIsImdvb2QiLCJiYWQiLCJtYWtlUmVxdWVzdCIsInJlc3BvbnNlT0siLCJyZXNwb25zZUZhaWxlZCIsInJlcXVlc3RKU09OIiwidGhlbiIsIm5leHQiLCJjYXRjaCIsImNvZGUiLCJnZXRJZCIsIm1vZGVsTmFtZSIsImdldE1vZGVsTmFtZSIsIm1ha2VVcmwiLCJnZXRKU09OIiwiZ2V0TW9kZWwiLCJzZXRQcmljZSIsIm1vZGVsIiwibm90SW1hZ2UiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgiLCJURU1QTEFURV9UQUciLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCIsIkNPTVBPTkVOVF9JRF9QUkVGSVgiLCJQQVJUX0lEX1BSRUZJWCIsIkRFRkFVTFRfUExBQ0VSIiwiREVGQVVMVF9QTEFDRVJfTE9PUCIsIk9QVFMiLCJNRVRBX0NBQ0hFIiwibm90VGVtcGxhdGVDYWNoZSIsImhpZGVUZW1wbGF0ZXMiLCJyZWdpc3RlciIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJtYXAiLCJsb2FkT25lIiwib1JlcXVlc3QiLCJkaXYiLCJkYXRhc2V0Iiwibm90VGVtcGxhdGVOYW1lIiwibm90VGVtcGxhdGVVUkwiLCJzcmNFbGVtZW50Iiwic2V0T25lIiwiZWxlbWVudCIsImNsb25lTm9kZSIsImNvbnQiLCJ0ZXh0Iiwibm90VGVtcGxhdGVzRWxlbWVudHMiLCJlbElkIiwicGFyZW50Tm9kZSIsImxpYiIsImdldEhUTUwiLCJ0ZW1wbGF0ZUlubmVySFRNTCIsInRlbXBsYXRlQ29udEVsIiwid3JhcCIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZIiwiREVGQVVMVF9GSUxURVIiLCJERUZBVUxUX1BBR0VfTlVNQkVSIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJub3RJbnRlcmZhY2UiLCJtYW5pZmVzdCIsImxpbmUiLCJyZWNvcmQiLCJhY3Rpb25OYW1lIiwicmVjb3JkUkUiLCJmaWVsZE5hbWUiLCJpbmQiLCJsZW4iLCJpbmQyIiwic3RhcnRTbGljZSIsImVuZFNsaWNlIiwiZ2V0QXR0ciIsImFjdGlvbkRhdGEiLCJwYXJzZUxpbmUiLCJwb3N0Rml4IiwicmVzdWx0SWQiLCJwcmVmaXhlcyIsImluZGV4IiwiY29uY2F0IiwicHJlIiwiZ2V0QWN0aW9ucyIsImFjdGlvbnMiLCJzZXRGaWx0ZXIiLCJmaWx0ZXJEYXRhIiwic29ydGVyRGF0YSIsInBhZ2VOdW1iZXIiLCJwYWdlU2l6ZSIsInNldFBhZ2VyIiwicmVxdWVzdERhdGEiLCJkYXRhUHJvdmlkZXJOYW1lIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwiZ2V0QWN0aW9uRGF0YSIsImNvbGxlY3RSZXF1ZXN0RGF0YSIsImdldElEIiwiZ2V0VVJMIiwicXVlZVJlcXVlc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiYWZ0ZXJTdWNjZXNzUmVxdWVzdCIsInJlcG9ydCIsIm5vdFJlY29yZCIsIk1FVEFfSU5URVJGQUNFIiwiTUVUQV9QUk9YWSIsIk1FVEFfQ0hBTkdFIiwiTUVUQV9DSEFOR0VfTkVTVEVEIiwiTUVUQV9TQUwiLCJNRVRBX01BUF9UT19JTlRFUkZBQ0UiLCJERUZBVUxUX0FDVElPTl9QUkVGSVgiLCJNRVRBX1JFVFVSTl9UT19ST09UIiwiY3JlYXRlUHJvcGVydHlIYW5kbGVycyIsIm93bmVyIiwiY29udGV4dCIsInJlc1RhcmdldCIsIlJlZmxlY3QiLCJFcnJvciIsInZhbHVlVG9SZWZsZWN0Iiwibm90UHJvcGVydHkiLCJnZXRSb290IiwicGF0aFRvIiwiaXNQcm94eSIsImlzUHJvcGVydHkiLCJQcm94eSIsInByb3h5IiwiY3JlYXRlUmVjb3JkSGFuZGxlcnMiLCJjcmVhdGVDb2xsZWN0aW9uIiwibm90UmVjb3JkSW50ZXJmYWNlIiwiaW5pdFByb3BlcnRpZXMiLCJpbnRlcmZhY2VVcCIsImN1clBhdGgiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiaXRlbXMiLCJjb2xsZWN0aW9uIiwiZ2V0QWN0aW9uc0NvdW50IiwiYWN0aW9uVXAiLCJyZXF1ZXN0Iiwib2JqZWN0UGFydCIsInNldEF0dHIiLCJzZXRGaW5kQnkiLCJyZXNldEZpbHRlciIsImdldEZpbHRlciIsInNldFNvcnRlciIsImdldFNvcnRlciIsInNldFBhZ2VOdW1iZXIiLCJzZXRQYWdlU2l6ZSIsInJlc2V0UGFnZXIiLCJnZXRQYWdlciIsIk9QVF9DT05UUk9MTEVSX1BSRUZJWCIsIk9QVF9SRUNPUkRfUFJFRklYIiwibm90QXBwIiwicmVzb3VyY2VzIiwicHJlSW5pdFJvdXRlciIsImluaXRNYW5hZ2VyIiwiaW5pdEFQSSIsImluaXRUZW1wbGF0ZXMiLCJzZXRNYW5hZ2VyIiwiYXBpIiwic2V0QVBJIiwicHJvbSIsImFkZExpYkZyb21VUkwiLCJpbml0TWFuaWZlc3QiLCJzZXRJbnRlcmZhY2VNYW5pZmVzdCIsInNldFJvb3QiLCJyb3V0aWVJbnB1dCIsInJvdXRlQmxvY2siLCJwYXRocyIsImNvbnRyb2xsZXIiLCJiaW5kQ29udHJvbGxlciIsImFkZExpc3QiLCJsaXN0ZW4iLCJ1cGRhdGUiLCJ1cGRhdGVJbnRlcmZhY2VzIiwiaW5pdENvbnRyb2xsZXIiLCJhbGxSZXNvdXJjZXNSZWFkeSIsInN0YXJ0QXBwIiwiaW5pdFJvdXRlciIsImNvbnRyb2xsZXJOYW1lIiwiYXBwIiwiY3RybCIsImNsZWFySW50ZXJmYWNlcyIsIm1hbmlmZXN0cyIsInJlY29yZE1hbmlmZXN0IiwicmVjb3JkRGF0YSIsIm9uUmVzb3VyY2VSZWFkeSIsIk1FVEFfUFJPQ0VTU09SUyIsIm5vdFRlbXBsYXRlUHJvY2Vzc29ycyIsInNldFByb2Nlc3NvciIsImdldFByb2Nlc3NvciIsIk1FVEFfQ09NUE9ORU5UUyIsIm5vdFJlbmRlcmVyIiwicmVuZGVyIiwiY29tcG9uZW50IiwiaW5pdERhdGEiLCJpbml0T3B0aW9ucyIsImluaXRXb3JraW5nIiwidGVtcGxhdGUiLCJpbml0VGVtcGxhdGUiLCJvbkNoYW5nZSIsIk1hdGgiLCJyYW5kb20iLCJnZXRCcmVhZENydW1wcyIsImNsZWFyU3Rhc2giLCJzZXRXb3JraW5nTWFwcGluZyIsImV4ZWNQcm9jZXNzb3JzIiwic2VhcmNoRm9yU3ViVGVtcGxhdGVzIiwic3Rhc2hSZW5kZXJlZCIsImlmUGFydCIsImNvbXBvbmVudFBhdGgiLCJjaGFuZ2VkUGF0aCIsImlmRnVsbFN1YlBhdGgiLCJjcmVhdGVNYXBwaW5nIiwiZmluZEFsbFByb2Nlc3NvcnMiLCJwcm9jcyIsImVscyIsImdldEF0dHJpYnV0ZXNTdGFydHNXaXRoIiwiZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCIsInByb2NEYXRhIiwicGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uIiwicHJvY2Vzc29yRXhwcmVzc2lvbiIsImF0dHJpYnV0ZUV4cHJlc3Npb24iLCJpZkNvbmRpdGlvbiIsInBhcmFtcyIsInByb2Nlc3Nvck5hbWUiLCJtYXBwaW5nIiwicHJvY1Njb3BlIiwiYXR0cmlidXRlUmVzdWx0IiwiZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdCIsInByb2NOYW1lIiwicHJvYyIsInJlbW92ZUF0dHJpYnV0ZSIsImRlc3Ryb3lTdWJzIiwiZGVzdHJveSIsImNsZWFyU3ViVGVtcGxhdGVzIiwiZ2V0U3Rhc2giLCJyZW1vdmVDaGlsZCIsIm50RWwiLCJudFJlbmRlcmVkIiwic3VicyIsIm50IiwiaWZTdWJFbGVtZW50UmVuZGVyZWQiLCJyZW5kZXJTdWIiLCJkZXRhaWxzIiwiZGF0YVBhdGgiLCJub3RDb21wb25lbnQiLCJjaGlsZE5vZGVzIiwiYWRkVG9TdGFzaCIsInN0YXNoIiwibmV3U3Rhc2giLCJhbmNob3IiLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsIm5vZGUiLCJwbGFjZSIsInRhcmdldEVsIiwibCIsImNoaWxkcmVuIiwidGV4dENvbnRlbnQiLCJyZW5kZXJlZCIsInBsYWNlQWZ0ZXIiLCJwbGFjZUJlZm9yZSIsInBsYWNlRmlyc3QiLCJwbGFjZUxhc3QiLCJub3RQbGFjZXJzIiwiTUVUQV9QQVJUUyIsInJlc2V0UGFydHMiLCJwcmVwYXJlVGVtcGxhdGVFbGVtZW50IiwiaW5pdE1hcmtFbGVtZW50IiwibWFya0VsIiwicGxhY2VyIiwiZ2V0UGxhY2VyIiwidGFyZ2V0UXVlcnkiLCJtYWluIiwidW5zZXRSZWFkeSIsImh0bWwiLCJzZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImFkZEZyb21VUkwiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImNsZWFyUGFydHMiLCJmb3JFYWNoRGF0YSIsInJlbmRlclBhcnQiLCJwbGFjZVJlbmRlcmVkIiwicmVtb3ZlT2Jzb2xldGVQYXJ0cyIsImJlZm9yZSIsInBsYWNlUGFydCIsImFmdGVyIiwicGFydCIsImdldFBhcnRCeURhdGEiLCJub2RlcyIsImxhc3ROb2RlIiwibm9kZVR5cGUiLCJnZXRQYXJ0cyIsInJlbmRlcmVyIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSIsImFkZFBhcnQiLCJ1cGRhdGVQYXJ0IiwicGlwZSIsImZpbmRBY3R1YWxQYXJ0cyIsInJlbW92ZU5vdEFjdHVhbFBhcnRzIiwiYWN0dWFsUGFydHMiLCJpc0RhdGEiLCJPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IiLCJPUFRfREVGQVVMVF9WSUVXU19QT1NURklYIiwiT1BUX0RFRkFVTFRfVklFV19OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMIiwiT1BUX0RFRkFVTFRfUExVUkFMX05BTUUiLCJPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSIsIk9QVF9ERUZBVUxUX01PRFVMRV9OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0FORCIsIm5vdENvbnRyb2xsZXIiLCJpbml0UmVuZGVyIiwiaW50ZXJmYWNlcyIsImdldEludGVyZmFjZXMiLCJtYWtlIiwidmlld05hbWUiLCJ2aWV3IiwiZ2V0VmlldyIsInRlbXBsYXRlVVJMIiwicHJlZml4IiwiY29tbW9uIiwiZ2V0TW9kdWxlUHJlZml4IiwicG9zdGZpeCIsInRlbXBsYXRlTmFtZSIsInJlbmRlckFuZCIsInZpZXdzIiwiZ2V0TW9kdWxlTmFtZSIsIm5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiIsInNjb3BlIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJsaXZlRXZlbnRzIiwib25FdmVudCIsImNoZWNrZWQiLCJmaWVsZCIsInNlbGVjdGVkIiwic2VsZWN0ZWRPcHRpb25zIiwicHJvY2Vzc2VkVmFsdWUiLCJpc05hTiIsImNsYXNzTGlzdCIsInJlbW92ZSIsInVzZWQiLCJvcHRpb24iLCJ2YWx1ZUZpZWxkTmFtZSIsImxhYmVsRmllbGROYW1lIiwiaXRlbVZhbHVlRmllbGROYW1lIiwiZGVmYXVsdCIsInBsYWNlaG9sZGVyIiwiYXJyYXkiLCJub3RSb3V0ZXJJbml0aWFsaXplZCIsIm5hdmlnYXRlIiwiT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgiLCJPUFRfREVGQVVMVF9ST0xFX05BTUUiLCJPUFRfREVGQVVMVF9GT1JNX1RJVExFIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiIsIk9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUIiwibm90Rm9ybSIsIm9uU3VibWl0Iiwib25SZXNldCIsIm9uQ2FuY2VsIiwiZ2V0TWFuaWZlc3QiLCJyb2xlIiwicmVuZGVyV3JhcHBlciIsImZvcm1QYXJ0IiwiZ2V0V3JhcHBlckRhdGEiLCJnZXRQYXJ0VGVtcGxhdGVOYW1lIiwiYmluZEZvcm1FdmVudHMiLCJyZW5kZXJDb21wb25lbnRzIiwid3JhcHBlciIsInRpdGxlIiwiZ2V0Rm9ybUZpZWxkc0xpc3QiLCJhZGRGaWVsZENvbXBvbmVudCIsImNvbXBzIiwiZ2V0QXBwIiwiZGVmIiwiZmllbGRzTGlicyIsImdldEZpZWxkc0xpYnMiLCJmaWVsZFR5cGUiLCJnZXRGaWVsZHNEZWZpbml0aW9uIiwicmVjIiwibGFiZWwiLCJnZXRGb3JtVGFyZ2V0RWxlbWVudCIsImNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMiLCJmb3JtIiwiT1BUX0RFRkFVTFRfUEFHRV9TSVpFIiwiT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIiLCJPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTiIsIk9QVF9ERUZBVUxUX1NPUlRfRklFTEQiLCJPUFRfRklFTERfTkFNRV9QUkVfUFJPQyIsIm5vdFRhYmxlIiwicm93cyIsInJlc2V0U29ydGVyIiwicmVuZGVySW5zaWRlIiwicmVuZGVySGVhZGVyIiwidXBkYXRlRGF0YSIsInJlbmRlckJvZHkiLCJiaW5kU2VhcmNoIiwiYmluZEN1c3RvbUJpbmRpbmdzIiwidGFibGVIZWFkZXIiLCJuZXdUaCIsInNvcnRhYmxlIiwiYXR0YWNoU29ydGluZ0hhbmRsZXJzIiwiaGVhZENlbGwiLCJjaGFuZ2VTb3J0aW5nT3B0aW9ucyIsInN0eWxlIiwiY3Vyc29yIiwic29ydEJ5RmllbGQiLCJzb3J0RGlyZWN0aW9uIiwic29ydGluZ0RpcmVjdGlvbiIsImhhc2giLCJpbnZhbGlkYXRlRGF0YSIsImZpbHRlclNlYXJjaCIsImlmVXBkYXRpbmciLCJxdWVyeSIsInNldFVwZGF0aW5nIiwiJGxpc3QiLCJwcm9jY2Vzc0RhdGEiLCJyZWZyZXNoQm9keSIsInNldFVwZGF0ZWQiLCJ0aGF0RmlsdGVyIiwidGVzdERhdGFJdGVtIiwidGhhdFNvcnRlciIsInNvcnQiLCJpdGVtMSIsIml0ZW0yIiwidDEiLCJ0MiIsImxvY2FsZUNvbXBhcmUiLCJzZWFyY2hFbCIsImN1cnJlbnRUYXJnZXQiLCJzZWxlY3RvciIsImdldE9wdGlvbiIsIm5ld1JvdyIsIm5ld1RkIiwicHJlcHJvY2Vzc2VkIiwiaXRlbUlkIiwidGJvZHkiLCJmaW5kQm9keSIsImNsZWFyQm9keSIsImNoZWNrRmlsdGVyZWQiLCJ0aGlzUGFnZVN0YXJ0cyIsIm5leHRQYWdlRW5kcyIsIm1pbiIsInJlbmRlclJvdyIsInRhYmxlQm9keSIsInN0clZhbHVlIiwiZ2V0RmlsdGVyU2VhcmNoIiwiayIsInRvQ29tcCIsIm5vdFZpZXciXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWM7U0FDZixLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFjO1NBQ25CLEtBQUtDLEdBQUwsQ0FBUyxVQUFULElBQXVCRCxHQUE5QjtFQUxrQjtnQkFPSix1QkFBU0UsU0FBVCxFQUFvQkMsTUFBcEIsRUFBNEI7T0FDckMsSUFBSUMsQ0FBVCxJQUFjRixTQUFkLEVBQXlCO1FBQ25CLElBQUlHLENBQVQsSUFBY0YsTUFBZCxFQUFzQjtRQUNqQkQsVUFBVUUsQ0FBVixFQUFhRSxjQUFiLENBQTRCSCxPQUFPRSxDQUFQLENBQTVCLENBQUosRUFBNEM7U0FDdkNFLFFBQVEsSUFBSUMsS0FBSixFQUFaO1dBQ01DLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsV0FBbEM7V0FDTUMsR0FBTixHQUFZUixVQUFVRSxDQUFWLEVBQWFELE9BQU9FLENBQVAsQ0FBYixFQUF3Qk0sT0FBeEIsQ0FBZ0MsSUFBaEMsTUFBMEMsQ0FB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
