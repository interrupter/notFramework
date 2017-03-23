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
	requestJSON: function requestJSON(method, url, data) {
		var _this = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			xhr.setRequestHeader('SessionID', _this.getSessionID());
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
		var _this2 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
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
	postJSON: function postJSON(url, data) {
		var _this3 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('POST', url);
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
	putJSON: function putJSON(url, data) {
		var _this4 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('PUT', url);
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
	deleteJSON: function deleteJSON(url, data) {
		var _this5 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('DELETE', url);
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
	getHTML: function getHTML(url, data) {
		var _this6 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', _this6.getSessionID());
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
		var value = "; " + document.cookie,
		    parts = value.split("; " + name + "=");
		if (parts.length == 2) {
			return parts.pop().split(";").shift();
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
			var _console;

			(_console = console).log.apply(_console, arguments);
		}
	}, {
		key: 'listen',
		value: function listen() {
			var loopInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : OPT_DEFAULT_CHECK_INTERVAL;

			this.setWorking('current', this.getFragment());
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
						console.log('push state', this.getFullRoute(path));
						history.pushState(null, null, this.getFullRoute(path));
					}
					break;
				case OPT_MODE_HASH:
					{
						window.location.href.match(/#(.*)$/);
						window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
					}
					break;
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

var notInterface = function (_notBase) {
	inherits(notInterface, _notBase);

	function notInterface(manifest) {
		var _ret;

		classCallCheck(this, notInterface);

		var _this = possibleConstructorReturn(this, (notInterface.__proto__ || Object.getPrototypeOf(notInterface)).call(this));

		_this.manifest = manifest;
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notInterface, [{
		key: 'extendObject',
		value: function extendObject(obj1, obj2) {
			var attrName = '';
			for (attrName in obj2) {
				if (obj2.hasOwnProperty(attrName)) {
					obj1[attrName] = obj2[attrName];
				}
			}
			return obj1;
		}
	}, {
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
		value: function getID(record, actionData, actionName) {
			var resultId = void 0,
			    list = OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY;
			if (actionData.hasOwnProperty('index') && actionData.index) {
				list = [actionData.index].concat(OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY);
			}
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;

					if (record.hasOwnProperty(t)) {
						resultId = record[t];
						break;
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
		value: function setFilter(filterData) {
			this.setModelParam('filter', filterData);
			return this;
		}
	}, {
		key: 'getFilter',
		value: function getFilter() {
			return this.getModelParam('filter');
		}
	}, {
		key: 'setSorter',
		value: function setSorter(sorterData) {
			this.setModelParam('sorter', sorterData);
			return this;
		}
	}, {
		key: 'getSorter',
		value: function getSorter() {
			return this.getModelParam('sorter');
		}
	}, {
		key: 'setPageNumber',
		value: function setPageNumber(pageNumber) {
			this.setModelParam('pageNumber', pageNumber);
			return this;
		}
	}, {
		key: 'setPageSize',
		value: function setPageSize(pageSize) {
			this.setModelParam('pageSize', pageSize);
			return this;
		}
	}, {
		key: 'setPager',
		value: function setPager(pageSize, pageNumber) {
			this.setModelParam('pageSize', pageSize).setModelParam('pageNumber', pageNumber);
			return this;
		}
	}, {
		key: 'getPager',
		value: function getPager() {
			return {
				pageSize: this.getModelParam('pageSize'),
				pageNumber: this.getModelParam('pageNumber')
			};
		}
	}, {
		key: 'setModelParam',
		value: function setModelParam(paramName, paramValue) {
			if (this.getOptions()) {
				this.setOptions(paramName, paramValue);
			}
			return this;
		}
	}, {
		key: 'getModelParam',
		value: function getModelParam(paramName) {
			return this.getOptions(paramName, null);
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

		//return Promise

	}, {
		key: 'request',
		value: function request(record, actionName) {
			var actionData = this.getActionData(actionName),
			    id = this.getID(record, actionData, actionName),
			    url = this.getURL(record, actionData, actionName);
			return notCommon.getAPI().queeRequest(actionData.method, url, id, JSON.stringify(record.getData()), this.onLoad.bind({ actionData: actionData, manifest: this.manifest }));
		}
		/*
  	_request_Obsolete_(record, actionName) {
  		notCommon.log('request', record, actionName, callbackSuccess, callbackError);
  		return new Promise((resolve, reject) => {
  			let actionData = this.getActionData(actionName),
  				url = this.getURL(record, actionData, actionName);
  				notCommon.getAPI().queeRequest(actionData.method, url, record.getId(), JSON.stringify(record.getData()), good, bad)
  					.then(resolve)
  					.catch(reject);
  		});
  
  		return new Promise((resolve, reject) => {
  			notCommon.log('update');
  			let id = obj.getId(),
  				modelName = obj.getModelName(),
  				url = this.makeUrl([this.getOptions('base'), modelName, id]),
  				data = obj.getJSON();
  
  		});
  
  
  		if (actionData){
  			var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
  			xmlhttp.open(actionData.method, url);
  			xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  			xmlhttp.responseType = 'json';
  			xmlhttp.withCredentials = true;
  			xmlhttp.callbackSuccess = callbackSuccess;
  			xmlhttp.callbackError = callbackError;
  			xmlhttp.onload = this.onLoad;
  			xmlhttp.send(JSON.stringify(record.getData()));
  		}
  	}
  */

	}, {
		key: 'onLoad',
		value: function onLoad(data) {
			if (this && this.actionData && this.actionData.hasOwnProperty('isArray') && this.actionData.isArray) {
				for (var t = 0; t < data.length; t++) {
					data[t] = new notRecord(this.manifest, data[t]);
				}
			} else {
				data = new notRecord(this.manifest, data);
			}
		}

		/*
  fileUpload(fileUpload) {
  	var xhr = new XMLHttpRequest();
  	//notCommon.log(fileUpload.file);
  	if (xhr.upload && this.fileAllowed(fileUpload.file)) {
  		// progress bar
  		xhr.upload.addEventListener("progress", function(e) {
  			fileUpload.trigger("progress", e, fileUpload);
  		}, false);
  		// file received/failed
  		xhr.onreadystatechange = function(e) {
  			if (xhr.readyState == 4) {
  				if (xhr.status == 200) {
  					var index = that.working.fileUploads.indexOf(fileUpload);
  					that.working.fileUploads.splice(index, 1);
  					fileUpload.trigger("success", e, fileUpload);
  				} else {
  					fileUpload.trigger("failure", e, fileUpload);
  				}
  			}
  		};
  		// start upload
  		xhr.withCredentials = true;
  		xhr.open("POST", this.getUploadUrl(), true);
  		xhr.setRequestHeader("Content-Type", fileUpload.file.type);
  		xhr.setRequestHeader("X_FILENAME", encodeURIComponent(fileUpload.file.name));
  		xhr.send(fileUpload.file);
  	} else {
  		fileUpload.trigger("failure", new Event("WrongFileType"), fileUpload);
  	}
  }
  */

	}]);
	return notInterface;
}(notBase);

var META_INTERFACE = Symbol('interface');
var META_PROXY = Symbol('proxy');
var META_CHANGE = Symbol('change');
var META_CHANGE_NESTED = Symbol('change.nested');
var META_SAL = ['getAttr', 'getAttrs', 'isProperty', 'isRecord', 'getManifest', 'setAttr', 'setAttrs', 'getData', 'setData', 'getJSON', 'on', 'off', 'trigger'];
var DEFAULT_ACTION_PREFIX = '$';
var DEFAULT_PAGE_NUMBER = 1;
var DEFAULT_PAGE_SIZE = 10;
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
				if (Object.keys(this).indexOf(key) > -1 || META_SAL.indexOf(key) > -1) {
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
		_this2.setOptions({
			filter: {},
			sorter: {},
			pageNumber: DEFAULT_PAGE_NUMBER,
			pageSize: DEFAULT_PAGE_SIZE,
			fields: []
		});
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
		key: 'getJSON',
		value: function getJSON() {}
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
						console.error('no templates lib', e);
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
			this.getWorking('router').addList(routieInput).listen().navigate(this.getOptions('router.index'));
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
				console.log('nt founded');
				l++;
			} else {
				console.log('remove child ', targetEl.children[l]);
				targetEl.removeChild(targetEl.children[l]);
			}
		}
		targetEl.textContent = '';
	},
	beforeEach: function beforeEach() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			console.log('append child ', rendered[i]);
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
			console.log('place first', i, rendered[i]);
			if (targetEl.children.length) {
				console.log('append before first');
				targetEl.insertBefore(rendered[i], targetEl.children[0]);
			} else {
				console.log('append as first');
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
		console.log('should remove node', targetEl);
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
			var data = this.collectDataFromComponents.bind(this);
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
	}, {
		key: 'bindFormEvents',
		value: function bindFormEvents() {
			var form = this.getOptions('targetEl').querySelector('form');
			if (form) {
				form.addEventListener('submit', this.onSubmit.bind(this));
				form.addEventListener('reset', this.onReset.bind(this));
			}
		}
	}]);
	return notForm;
}(notBase);

var OPT_DEFAULT_PAGE_SIZE = 20;
var OPT_DEFAULT_PAGE_NUMBER = 10;
var OPT_FIELD_NAME_PRE_PROC = 'preprocessor';

var notTable = function (_notBase) {
	inherits(notTable, _notBase);

	function notTable(input) {
		var _ret;

		classCallCheck(this, notTable);

		var _this = possibleConstructorReturn(this, (notTable.__proto__ || Object.getPrototypeOf(notTable)).call(this, input));

		_this.resetPager();
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
				newTh.dataset.dataFieldName = fields[i].path;
				newTh.dataset.sortingDirection = 0;
				if (fields[i].hasOwnProperty('sortable') && fields[i].sortable) {
					this.attachSortingHandlers(newTh);
				}
				tableHeader.appendChild(newTh);
			}
		}
	}, {
		key: 'attachSortingHandlers',
		value: function attachSortingHandlers(headCell) {
			var _this2 = this;

			headCell.addEventListener('click', function (e) {
				e.preventDefault();
				_this2.changeSortingOptions(e.currentTarget);
				return false;
			});
			headCell.style.cursor = 'pointer';
		}
	}, {
		key: 'changeSortingOptions',
		value: function changeSortingOptions(el) {
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
			this.setSorter({
				sortDirection: el.dataset.sortingDirection,
				sortByField: el.dataset.dataFieldName
			});
		}
	}, {
		key: 'setSorter',
		value: function setSorter(hash) {
			this.setWorking('sorter', hash);
			this.invalidateData();
			this.updateData();
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
				pageSize: this.getOptions('pageSize') ? this.getOptions('pageSize') : OPT_DEFAULT_PAGE_SIZE,
				pageNumber: this.getOptions('pageNumber') ? this.getOptions('pageNumber') : OPT_DEFAULT_PAGE_NUMBER
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
					console.log('$list for table', data);
					_this3.getData('rows').concat(data);
					_this3.proccessData();
					_this3.refreshBody();
					_this3.setUpdated();
				}).catch(function (e) {
					console.error(e);
				});
			} else {
				//local magic
				this.proccessData();
				this.refreshBody();
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
					if (isNaN(notPath$1.get(thatSorter.sortByField, item1, {}))) {
						return notPath$1.get(thatSorter.sortByField, item1, {}).localeCompare(notPath$1.get(thatSorter.sortByField, item2, {})) * -thatSorter.sortDirection;
					} else {
						return (notPath$1.get(thatSorter.sortByField, item1, {}) < notPath$1.get(thatSorter.sortByField, item2, {}) ? 1 : -1) * thatSorter.sortDirection;
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
					newTd.addEventListener('blur', function (e) {
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
		key: 'renderBody',
		value: function renderBody() {
			if (!this.getOptions('onePager')) {
				this.clearBody();
			}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdEZvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFZpZXcuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdob3N0JykgKyB1cmk7XG5cdH0sXG5cdGFkZFByb3RvY29sOiBmdW5jdGlvbih1cmkpe1xuXHRcdHJldHVybiB0aGlzLmdldCgncHJvdG9jb2wnKSArIHVyaTtcblx0fSxcblx0cHJlbG9hZEltYWdlczogZnVuY3Rpb24oZGF0YUFycmF5LCBmaWVsZHMpIHtcblx0XHRmb3IodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IodmFyIGYgaW4gZmllbGRzKSB7XG5cdFx0XHRcdGlmKGRhdGFBcnJheVtpXS5oYXNPd25Qcm9wZXJ0eShmaWVsZHNbZl0pKSB7XG5cdFx0XHRcdFx0dmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG5cdFx0XHRcdFx0aW1hZ2Uuc2V0QXR0cmlidXRlKCdjcm9zc09yaWdpbicsICdhbm9ueW1vdXMnKTtcblx0XHRcdFx0XHRpbWFnZS5zcmMgPSBkYXRhQXJyYXlbaV1bZmllbGRzW2ZdXS5pbmRleE9mKCcvLycpID09PSAwID8gdGhpcy5hZGRQcm90b2NvbChkYXRhQXJyYXlbaV1bZmllbGRzW2ZdXSkgOiBkYXRhQXJyYXlbaV1bZmllbGRzW2ZdXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0cmVxdWVzdEpTT046IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBkYXRhKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUFVUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpPT57XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAocGFyc2VJbnQoc3RhdHVzKSA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKGUpID0+IHJlamVjdChlKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldFNlc3Npb25JRDogZnVuY3Rpb24obmFtZSA9ICdTZXNzaW9uSUQnKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29va2llKG5hbWUpO1xuXHR9LFxuXHRnZXRDb29raWU6KG5hbWUpID0+IHtcbiAgXHRcdGxldCB2YWx1ZSA9IFwiOyBcIiArIGRvY3VtZW50LmNvb2tpZSxcbiAgXHRcdFx0cGFydHMgPSB2YWx1ZS5zcGxpdChcIjsgXCIgKyBuYW1lICsgXCI9XCIpO1xuICBcdFx0aWYgKHBhcnRzLmxlbmd0aCA9PSAyKSB7XG5cdFx0XHRyZXR1cm4gcGFydHMucG9wKCkuc3BsaXQoXCI7XCIpLnNoaWZ0KCk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblx0fVxufTtcbmV4cG9ydCBkZWZhdWx0IENvbW1vbk5ldHdvcms7XG4iLCJ2YXIgQ29tbW9uTG9ncyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fSxcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHRyYWNlOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKCF0aGlzLmVxdWFsKGFbcF0sIGJbcF0pKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXNlICdmdW5jdGlvbic6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJyB8fFxuXHRcdFx0XHRcdFx0XHQocCAhPSAnZXF1YWxzJyAmJiBhW3BdLnRvU3RyaW5nKCkgIT0gYltwXS50b1N0cmluZygpKSlcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cdFxuXHRyZWdpc3RlcjogZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0XHR0aGlzLnJlZ2lzdHJ5W2tleV0gPSB2YWw7XG5cdH0sXG5cblx0Z2V0OiBmdW5jdGlvbihrZXkpIHtcblx0XHRyZXR1cm4gdGhpcy5yZWdpc3RyeS5oYXNPd25Qcm9wZXJ0eShrZXkpID8gdGhpcy5yZWdpc3RyeVtrZXldIDogbnVsbDtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aCggc3ViUGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUyk+LTE/aGVscGVyczppdGVtLCBzdWJQYXRoKTtcblx0XHRcdHBhdGggPSB0aGlzLnJlcGxhY2VTdWJQYXRoKHBhdGgsIHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQpO1xuXHRcdFx0aSsrO1xuXHRcdFx0aWYgKGkgPiBNQVhfREVFUCl7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdGdldChwYXRoLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRzd2l0Y2ggKHBhdGgpe1xuXHRcdFx0Y2FzZSBQQVRIX1NUQVJUX09CSkVDVDogcmV0dXJuIGl0ZW07XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfSEVMUEVSUzogcmV0dXJuIGhlbHBlcnM7XG5cdFx0fVxuXHRcdHBhdGggPSB0aGlzLnBhcnNlU3VicyhwYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChwYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHBhdGgpO1xuXHR9XG5cblx0c2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIGF0dHJWYWx1ZSl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aCggc3ViUGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUyk+LTE/aGVscGVyczppdGVtLCBzdWJQYXRoKTtcblx0XHRcdHBhdGggPSB0aGlzLnJlcGxhY2VTdWJQYXRoKHBhdGgsIHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQpO1xuXHRcdFx0aWYgKGkgPiBNQVhfREVFUCl7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFZhbHVlQnlQYXRoKGl0ZW0sIHBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0aWYgKGl0ZW0uaXNSZWNvcmQgJiYgdGhpcy5ub3JtaWxpemVQYXRoKHBhdGgpLmxlbmd0aCA+IDEpIHtcblx0XHRcdGl0ZW0udHJpZ2dlcignY2hhbmdlJywgaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHR1bnNldChwYXRoLCBpdGVtLCBoZWxwZXJzKXtcblx0XHR0aGlzLnNldChwYXRoLCBpdGVtLCBoZWxwZXJzLCBudWxsKTtcblx0fVxuXG5cdHBhcnNlUGF0aFN0ZXAoc3RlcCwgaXRlbSwgaGVscGVyKXtcblx0XHRsZXQgclN0ZXAgPSBudWxsO1xuXHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpID09PSAwICYmIGhlbHBlcil7XG5cdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX0hFTFBFUlMsICcnKTtcblx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0aWYoaGVscGVyLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA9PT0gMCAmJiBpdGVtKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsICcnKTtcblx0XHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdFx0aWYoaXRlbS5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHN0ZXA7XG5cdH1cblxuXHQvLzo6ZmllbGROYW1lLnJlc3VsdFxuXHQvL3t9XG5cdC8ve2ZpZWxkTmFtZTogJ3RhcmdldFJlY29yZEZpZWxkJ31cblx0Ly8vL1sndGFyZ2V0UmVjb3JkRmllbGQnLCAncmVzdWx0J11cblx0cGFyc2VQYXRoKHBhdGgsIGl0ZW0sIGhlbHBlcil7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHBhdGggPSBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRwYXRoW2ldID0gdGhpcy5wYXJzZVBhdGhTdGVwKHBhdGhbaV0sIGl0ZW0sIGhlbHBlcik7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0bm9ybWlsaXplUGF0aChwYXRoKXtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRyZXR1cm4gcGF0aDtcblx0XHR9ZWxzZXtcblx0XHRcdHdoaWxlKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPiAtMSl7XG5cdFx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsJycpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRzbWFsbCA9IFtcInRvZG9cIl0sXG5cdFx0YmlnID0gW1widG9kb1wiLCBcImxlbmd0aFwiXVxuXHRcdHJldHVybiB0cnVlO1xuXG5cdCovXG5cblx0aWZGdWxsU3ViUGF0aChiaWcsIHNtYWxsKXtcblx0XHRpZiAoYmlnLmxlbmd0aDxzbWFsbC5sZW5ndGgpe3JldHVybiBmYWxzZTt9XG5cdFx0Zm9yKGxldCB0ID0wOyB0IDwgc21hbGwubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYoc21hbGxbdF0gIT09IGJpZ1t0XSl7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRnZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoKXtcblx0XHRhdHRyUGF0aCA9IHRoaXMubm9ybWlsaXplUGF0aChhdHRyUGF0aCk7XG5cdFx0bGV0IGF0dHJOYW1lID0gYXR0clBhdGguc2hpZnQoKSxcblx0XHRcdGlzRnVuY3Rpb24gPSBhdHRyTmFtZS5pbmRleE9mKEZVTkNUSU9OX01BUktFUik+LTE7XG5cdFx0aWYgKGlzRnVuY3Rpb24pe1xuXHRcdFx0YXR0ck5hbWUgPSBhdHRyTmFtZS5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdH1cblx0XHRpZiAoKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSAmJiB0eXBlb2Ygb2JqZWN0W2F0dHJOYW1lXSAhPT0gJ3VuZGVmaW5lZCcgJiYgb2JqZWN0W2F0dHJOYW1lXSAhPT0gbnVsbCl7XG5cdFx0XHRsZXQgbmV3T2JqID0gaXNGdW5jdGlvbj9vYmplY3RbYXR0ck5hbWVdKCk6b2JqZWN0W2F0dHJOYW1lXTtcblx0XHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0VmFsdWVCeVBhdGgobmV3T2JqLCBhdHRyUGF0aCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIG5ld09iajtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblx0c2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCwgYXR0clZhbHVlKXtcblx0XHRhdHRyUGF0aCA9IHRoaXMubm9ybWlsaXplUGF0aChhdHRyUGF0aCk7XG5cdFx0bGV0IGF0dHJOYW1lID0gYXR0clBhdGguc2hpZnQoKTtcblx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRpZiAoIW9iamVjdC5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpe29iamVjdFthdHRyTmFtZV0gPSB7fTt9XG5cdFx0XHR0aGlzLnNldFZhbHVlQnlQYXRoKG9iamVjdFthdHRyTmFtZV0sIGF0dHJQYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1lbHNle1xuXHRcdFx0b2JqZWN0W2F0dHJOYW1lXSA9IGF0dHJWYWx1ZTtcblx0XHR9XG5cdH1cblxuXHRqb2luKCl7XG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdHJldHVybiBhcmdzLmpvaW4oUEFUSF9TUExJVCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFBhdGgoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcblxuY29uc3QgTUVUQV9NRVRIT0RfSU5JVCA9IFN5bWJvbCgnaW5pdCcpLFxuXHRNRVRBX0VWRU5UUyA9IFN5bWJvbCgnZXZlbnRzJyksXG5cdE1FVEFfREFUQSA9IFN5bWJvbCgnZGF0YScpLFxuXHRNRVRBX1dPUktJTkcgPSBTeW1ib2woJ3dvcmtpbmcnKSxcblx0TUVUQV9PUFRJT05TID0gU3ltYm9sKCdvcHRpb25zJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHRoaXNbTUVUQV9FVkVOVFNdID0ge307XG5cdFx0dGhpc1tNRVRBX0RBVEFdID0ge307XG5cdFx0dGhpc1tNRVRBX1dPUktJTkddID0ge307XG5cdFx0dGhpc1tNRVRBX09QVElPTlNdID0ge307XG5cdFx0dGhpc1tNRVRBX01FVEhPRF9JTklUXShpbnB1dCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRbTUVUQV9NRVRIT0RfSU5JVF0oaW5wdXQpe1xuXHRcdGlmICghaW5wdXQpe1xuXHRcdFx0aW5wdXQgPSB7fTtcblx0XHR9XG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ2V2ZW50cycpKXtcblx0XHRcdGZvcihsZXQgdCBvZiBpbnB1dC5ldmVudHMpe1xuXHRcdFx0XHR0aGlzLm9uKC4uLnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKGlucHV0Lmhhc093blByb3BlcnR5KCdkYXRhJykpe1xuXHRcdFx0dGhpcy5zZXREYXRhKGlucHV0LmRhdGEpO1xuXHRcdH1cblxuXHRcdGlmKGlucHV0Lmhhc093blByb3BlcnR5KCd3b3JraW5nJykpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKGlucHV0LndvcmtpbmcpO1xuXHRcdH1cblxuXHRcdGlmKGlucHV0Lmhhc093blByb3BlcnR5KCdvcHRpb25zJykpe1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKGlucHV0Lm9wdGlvbnMpO1xuXHRcdH1cblx0fVxuXG5cdHNldENvbW1vbih3aGF0LCBhcmdzKSB7XG5cdFx0c3dpdGNoIChhcmdzLmxlbmd0aCkge1xuXHRcdGNhc2UgMTpcblx0XHRcdHtcblx0XHRcdFx0Lyogc2V0IGNvbGxlY3Rpb24gKi9cblx0XHRcdFx0d2hhdCA9IGFyZ3NbMF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdGNhc2UgMjpcblx0XHRcdHtcblx0XHRcdFx0Lyogc2V0IGNvbGxlY3Rpb24gZWxlbWVudCAqL1xuXHRcdFx0XHRub3RQYXRoLnNldChhcmdzWzBdIC8qIHBhdGggKi8gLCB3aGF0IC8qIGNvbGxlY3Rpb24gKi8gLCB1bmRlZmluZWQgLyogaGVscGVycyAqLyAsIGFyZ3NbMV0gLyogdmFsdWUgKi8gKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGdldENvbW1vbih3aGF0LCBhcmdzKSB7XG5cdFx0c3dpdGNoIChhcmdzLmxlbmd0aCkge1xuXHRcdFx0LyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoICovXG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHR9XG5cdFx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCB3aXRoIGRlZmF1bHQgdmFsdWUgKi9cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdGxldCByZXMgPSBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdFx0aWYgKHJlcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Lyogbm8gZGF0YSwgcmV0dXJuIGRlZmF1bHQgdmFsdWUgKi9cblx0XHRcdFx0XHRyZXR1cm4gYXJnc1sxXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvKiBkYXRhLCByZXR1cm4gaXQgKi9cblx0XHRcdFx0XHRyZXR1cm4gcmVzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvKiByZXR1cm4gZnVsbCBjb2xsZWN0aW9uICovXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHdoYXQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRDT1JFIE9CSkVDVFxuXHRcdFx0REFUQSAtIGluZm9ybWF0aW9uXG5cdFx0XHRPUFRJT05TIC0gaG93IHRvIHdvcmtcblx0XHRcdFdPUktJTkcgLSB0ZW1wb3JhcmlseSBnZW5lcmF0ZWQgaW4gcHJvY2Nlc3Ncblx0Ki9cblxuXHRzZXREYXRhKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfREFUQV0gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0RGF0YSgpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHR9XG5cblx0Z2V0RGF0YSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX0RBVEFdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0T3B0aW9ucygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX09QVElPTlNdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldE9wdGlvbnMoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cblxuXHRnZXRPcHRpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfT1BUSU9OU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRXb3JraW5nKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfV09SS0lOR10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0V29ya2luZygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdGdldFdvcmtpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9XT1JLSU5HXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qXG5cdFx0RVZFTlRTIGhhbmRsaW5nXG5cdCovXG5cblx0b24oZXZlbnROYW1lcywgZXZlbnRDYWxsYmFja3MsIG9uY2UpIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmRlZmluZUlmTm90RXhpc3RzKHRoaXNbTUVUQV9FVkVOVFNdLCBuYW1lLCBbXSk7XG5cdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5wdXNoKHtcblx0XHRcdFx0Y2FsbGJhY2tzOiBldmVudENhbGxiYWNrcyxcblx0XHRcdFx0b25jZTogb25jZSxcblx0XHRcdFx0Y291bnQ6IDBcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dHJpZ2dlcigpIHtcblx0XHRsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKSxcblx0XHRcdGV2ZW50TmFtZSA9IGFyZ3Muc2hpZnQoKTtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lKSkge1xuXHRcdFx0ZXZlbnROYW1lID0gW2V2ZW50TmFtZV07XG5cdFx0fVxuXHRcdGV2ZW50TmFtZS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0aWYgKHRoaXNbTUVUQV9FVkVOVFNdLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmZvckVhY2goZXZlbnQgPT4ge1xuXHRcdFx0XHRcdGlmIChldmVudC5vbmNlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9mZihuYW1lLCBldmVudC5jYWxsYmFja3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRldmVudC5jYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayguLi5hcmdzKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0b2ZmKGV2ZW50TmFtZXMgLyogYXJyYXkgb2YgZXZlbnQgbmFtZXMgKi8gLCBldmVudENhbGxiYWNrcyAvKiBhcnJheSBvZiBjYWxsYmFja3MgKi8gKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXG5cdFx0ZXZlbnROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0bGV0IHRhcmdldElkID0gLTE7XG5cdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5mb3JFYWNoKChldmVudCwgaSkgPT4ge1xuXHRcdFx0XHRpZiAoaSA9PT0gLTEgJiYgZXZlbnRDYWxsYmFja3MgPT09IGV2ZW50LmNhbGxiYWNrcykge1xuXHRcdFx0XHRcdHRhcmdldElkID0gaTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAodGFyZ2V0SWQgPiAtMSkge1xuXHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5zcGxpY2UodGFyZ2V0SWQsIDEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuY29uc3QgT1BUX01PREVfSElTVE9SWSA9IFN5bWJvbCgnaGlzdG9yeScpLFxuXHRPUFRfTU9ERV9IQVNIID0gU3ltYm9sKCdoYXNoJyksXG5cdE9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMID0gNTA7XG5cbmNsYXNzIG5vdFJvdXRlciBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyb3V0ZXM6IFtdLFxuXHRcdFx0bW9kZTogT1BUX01PREVfSElTVE9SWSxcblx0XHRcdHJvb3Q6ICcvJywgLy9hbHdheXMgaW4gc2xhc2hlcyAvdXNlci8sIC8sIC9pbnB1dC8uIGFuZCBubyAvdXNlciBvciBpbnB1dC9sZXZlbFxuXHRcdFx0aW5pdGlhbGl6ZWQ6IGZhbHNlXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaXN0b3J5KCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtb2RlJywgT1BUX01PREVfSElTVE9SWSk7XG5cdH1cblxuXHRoYXNoKCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtb2RlJywgT1BUX01PREVfSEFTSCk7XG5cdH1cblxuXHRzZXRSb290KHJvb3Qpe1xuXHRcdHRoaXMuc2V0V29ya2luZygncm9vdCcsIHJvb3QgPyAnLycgKyB0aGlzLmNsZWFyU2xhc2hlcyhyb290KSArICcvJyA6ICcvJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjbGVhclNsYXNoZXMocGF0aCkge1xuXHRcdC8vZmlyc3QgYW5kIGxhc3Qgc2xhc2hlcyByZW1vdmFsXG5cdFx0cmV0dXJuIHBhdGgudG9TdHJpbmcoKS5yZXBsYWNlKC9cXC8kLywgJycpLnJlcGxhY2UoL15cXC8vLCAnJyk7XG5cdH1cblxuXHRhZGQocmUsIGhhbmRsZXIpIHtcblx0XHRpZiAodHlwZW9mIHJlID09ICdmdW5jdGlvbicpIHtcblx0XHRcdGhhbmRsZXIgPSByZTtcblx0XHRcdHJlID0gJyc7XG5cdFx0fVxuXHRcdGxldCBydWxlID0ge1xuXHRcdFx0cmU6IHJlLFxuXHRcdFx0aGFuZGxlcjogaGFuZGxlclxuXHRcdH07XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5wdXNoKHJ1bGUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkTGlzdChsaXN0KSB7XG5cdFx0Zm9yIChsZXQgdCBpbiBsaXN0KSB7XG5cdFx0XHR0aGlzLmFkZCh0LCBsaXN0W3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZW1vdmUocGFyYW0pIHtcblx0XHRmb3IgKHZhciBpID0gMCwgcjsgaSA8IHRoaXMuZ2V0V29ya2luZygncm91dGVzJykubGVuZ3RoLCByID0gdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXTsgaSsrKSB7XG5cdFx0XHRpZiAoci5oYW5kbGVyID09PSBwYXJhbSB8fCByLnJlID09PSBwYXJhbSkge1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLnNwbGljZShpLCAxKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Zmx1c2goKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJvdXRlczogW10sXG5cdFx0XHRtb2RlOiBPUFRfTU9ERV9ISVNUT1JZLFxuXHRcdFx0cm9vdDogJy8nXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpc0luaXRpYWxpemVkKCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnaW5pdGlhbGl6ZWQnKTtcblx0fVxuXG5cdHNldEluaXRpYWxpemVkKHZhbCA9IHRydWUpe1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ2luaXRpYWxpemVkJywgdmFsKTtcblx0fVxuXG5cdGdldEZyYWdtZW50KCkge1xuXHRcdHZhciBmcmFnbWVudCA9ICcnO1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSA9PT0gT1BUX01PREVfSElTVE9SWSkge1xuXHRcdFx0aWYgKCFsb2NhdGlvbikgcmV0dXJuICcnO1xuXHRcdFx0ZnJhZ21lbnQgPSB0aGlzLmNsZWFyU2xhc2hlcyhkZWNvZGVVUkkobG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2gpKTtcblx0XHRcdGZyYWdtZW50ID0gZnJhZ21lbnQucmVwbGFjZSgvXFw/KC4qKSQvLCAnJyk7XG5cdFx0XHRmcmFnbWVudCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICE9ICcvJyA/IGZyYWdtZW50LnJlcGxhY2UodGhpcy5nZXRXb3JraW5nKCdyb290JyksICcnKSA6IGZyYWdtZW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIXdpbmRvdykgcmV0dXJuICcnO1xuXHRcdFx0dmFyIG1hdGNoID0gd2luZG93LmxvY2F0aW9uLmhyZWYubWF0Y2goLyMoLiopJC8pO1xuXHRcdFx0ZnJhZ21lbnQgPSBtYXRjaCA/IG1hdGNoWzFdIDogJyc7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNsZWFyU2xhc2hlcyhmcmFnbWVudCk7XG5cdH1cblxuXHRjaGVja0xvY2F0aW9uKCl7XG5cdFx0bGV0IGN1cnJlbnQgPXRoaXMuZ2V0V29ya2luZygnY3VycmVudCcpLFxuXHRcdFx0ZnJhZ21lbnQgPXRoaXMuZ2V0RnJhZ21lbnQoKSxcblx0XHRcdGluaXQgPSB0aGlzLmlzSW5pdGlhbGl6ZWQoKTtcblx0XHRpZiAoY3VycmVudCAhPT1mcmFnbWVudCAgfHwgIWluaXQpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudCcsZnJhZ21lbnQpO1xuXHRcdFx0dGhpcy5jaGVjayhmcmFnbWVudCk7XG5cdFx0XHR0aGlzLnNldEluaXRpYWxpemVkKCk7XG5cdFx0fVxuXHR9XG5cblx0aHJlZkNsaWNrKCl7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGxpc3Rlbihsb29wSW50ZXJ2YWwgPSBPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudCcsIHRoaXMuZ2V0RnJhZ21lbnQoKSk7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmdldFdvcmtpbmcoJ2ludGVydmFsJykpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJ2YWwnLCBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrTG9jYXRpb24uYmluZCh0aGlzKSwgbG9vcEludGVydmFsKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5ocmVmQ2xpY2suYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjaGVjayhmKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gZiB8fCB0aGlzLmdldEZyYWdtZW50KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGF0aCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5yZTtcblx0XHRcdGxldCBmdWxsUkUgPSAgdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKHBhdGgpKTtcblx0XHRcdHZhciBtYXRjaCA9IGZyYWdtZW50Lm1hdGNoKGZ1bGxSRSk7XHRcdFx0XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0bWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5oYW5kbGVyLmFwcGx5KHRoaXMuaG9zdCB8fCB7fSwgbWF0Y2gpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRuYXZpZ2F0ZShwYXRoKSB7XG5cdFx0cGF0aCA9IHBhdGggPyBwYXRoIDogJyc7XG5cdFx0c3dpdGNoICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSl7XG5cdFx0XHRjYXNlIE9QVF9NT0RFX0hJU1RPUlk6IHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ3B1c2ggc3RhdGUnLCB0aGlzLmdldEZ1bGxSb3V0ZShwYXRoKSk7XG5cdFx0XHRcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHRoaXMuZ2V0RnVsbFJvdXRlKHBhdGgpKTtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBPUFRfTU9ERV9IQVNIOiB7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jKC4qKSQvLCAnJykgKyAnIycgKyBwYXRoO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RnVsbFJvdXRlKHBhdGggPSAnJyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5jbGVhclNsYXNoZXMocGF0aCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFJvdXRlcigpO1xuIiwibGV0IG5vdEFQSU9wdGlvbnMgPSB7XG5cdHJwczogNTAsXG5cdHByb3RvY29sOiAnaHR0cCcsXG5cdGhvc3Q6ICdsb2NhbGhvc3QnLFxuXHRwb3J0OiA5MDAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RBUElPcHRpb25zO1xuIiwiY2xhc3Mgbm90QVBJUXVlZXtcblx0Y29uc3RydWN0b3IgKHJlcXVlc3RzUGVyU2Vjb25kKSB7XG5cdFx0dGhpcy5xdWVlID0gW107XG5cdFx0dGhpcy5pbnQgPSBudWxsO1xuXHRcdHRoaXMucmVxdWVzdHNQZXJTZWNvbmQgPSByZXF1ZXN0c1BlclNlY29uZCB8fCA1O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuKCl7XG5cdFx0dGhpcy5pbnQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5jaGVjay5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5yZXF1ZXN0c1BlclNlY29uZCk7XG5cdH1cblxuXHRjaGVjaygpe1xuXHRcdGlmICh0aGlzLmluUHJvZ3Jlc3Mpe3JldHVybjt9XG5cdFx0ZWxzZXtcblx0XHRcdGlmICh0aGlzLnF1ZWUubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHRoaXMuaW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0XHRcdGxldCB0b0NhbGwgPSB0aGlzLnF1ZWUuc2hpZnQoKTtcblx0XHRcdFx0dG9DYWxsKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmV4dCgpe1xuXHRcdHRoaXMuaW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHR9XG5cblx0YWRkKGNhbGwpe1xuXHRcdHRoaXMucXVlZS5wdXNoKGNhbGwpO1xuXHR9XG5cblx0cGF1c2UoKXtcblx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludCk7XG5cdH1cblxuXHRyZXN1bWUoKXtcblx0XHR0aGlzLnJ1bigpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSVF1ZWU7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlLmpzJztcblxuaW1wb3J0IG5vdEFQSU9wdGlvbnMgZnJvbSAnLi9vcHRpb25zLmpzJztcbmltcG9ydCBub3RBUElRdWVlIGZyb20gJy4vcXVlZS5qcyc7XG5cblxuY2xhc3Mgbm90QVBJIGV4dGVuZHMgIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RDb21tb24uZXh0ZW5kKG5vdEFQSU9wdGlvbnMsIG9wdGlvbnMpKTtcblx0XHR0aGlzLnF1ZWUgPSBuZXcgbm90QVBJUXVlZSh0aGlzLmdldE9wdGlvbnMoJ3JwcycpKTtcblx0XHR0aGlzLnF1ZWUucnVuKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRtYWtlVXJsKHBhcnRzKSB7XG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJy8nKTtcblx0fVxuXG5cdHF1ZWVSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsIG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRtYWtlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCkge1xuXHRcdG5vdENvbW1vbi5sb2coJ21ha2luZyByZXF1ZXN0JywgbWV0aG9kLCB1cmwsIGlkKTtcblx0XHRub3RDb21tb24ucmVxdWVzdEpTT04obWV0aG9kLCB1cmwsIGRhdGEpXG5cdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVxdWVzdCBzdWNjZXNzZnVsbCcsIG1ldGhvZCwgdXJsLCBpZCwgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXNwb25zZSBpcyBnb29kJyk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChjb2RlLCByZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ3JlcXVlc3QgZmFpbGVkJywgbWV0aG9kLCB1cmwsIGlkLCByZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3Jlc3BvbnNlIGlzIGJhZCcpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZScpO1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncG9zdCcsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygncHV0dCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2dldCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnbGlzdCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2RlbGV0ZScsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2RlbGV0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldFVwbG9hZFVSTChtb2RlbCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSArIHRoaXMuZ2V0T3B0aW9ucygndXBsb2FkJykgKyBtb2RlbD9tb2RlbC5nZXRJZCgpOicnO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSTtcbiIsImltcG9ydCBub3RCYXNlICBmcm9tICcuLi9ub3RCYXNlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEltYWdlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJjb25zdCBQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVggPSAnbi0nLFxuXHRURU1QTEFURV9UQUcgPSAnbnQnLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgPSAnLScsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYID0gJ2lmJyxcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCA9ICdub3RfY29tcG9uZW50XycsXG5cdFBBUlRfSURfUFJFRklYID0gJ25vdF9wYXJ0XycsXG5cdERFRkFVTFRfUExBQ0VSID0gJ3BsYWNlJyxcblx0REVGQVVMVF9QTEFDRVJfTE9PUCA9ICdwbGFjZUFmdGVyJztcblxuY29uc3QgT1BUUyA9IHtcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLFxuXHRURU1QTEFURV9UQUcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUixcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsXG5cdERFRkFVTFRfUExBQ0VSLFxuXHRDT01QT05FTlRfSURfUFJFRklYLFxuXHRQQVJUX0lEX1BSRUZJWCxcblx0REVGQVVMVF9QTEFDRVJfTE9PUFxufTtcblxuZXhwb3J0IGRlZmF1bHQgT1BUUztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmNvbnN0IE1FVEFfQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlQ2FjaGUgZXh0ZW5kcyBub3RCYXNle1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXSA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHR0aGlzLmhpZGVUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaWRlVGVtcGxhdGVzKCl7XG5cdFx0bGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdHQuaW5uZXJIVE1MID0gT1BUUy5URU1QTEFURV9UQUcgKyAne2Rpc3BsYXk6IG5vbmU7fSc7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KTtcblx0fVxuXG5cdHJlZ2lzdGVyKCkge1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcigndGVtcGxhdGVDYWNoZScsIHRoaXMpO1xuXHR9XG5cblx0bG9hZChtYXApIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0Zm9yICh2YXIgaSBpbiBtYXApIHtcblx0XHRcdHRoaXMubG9hZE9uZShpLCBtYXBbaV0pO1xuXHRcdH1cblx0fVxuXG5cdGxvYWRPbmUoa2V5LCB1cmwsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIG9SZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0b1JlcXVlc3Qub3BlbignR0VUJywgdXJsKTtcblx0XHRvUmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcblx0XHRcdGRpdi5kYXRhc2V0Lm5vdFRlbXBsYXRlTmFtZSA9IGtleTtcblx0XHRcdGRpdi5kYXRhc2V0Lm5vdFRlbXBsYXRlVVJMID0gdXJsO1xuXHRcdFx0ZGl2LmlubmVySFRNTCA9IHJlc3BvbnNlLnNyY0VsZW1lbnQucmVzcG9uc2VUZXh0O1xuXHRcdFx0dGhpcy5zZXRPbmUoa2V5LCBkaXYpO1xuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soa2V5LCB1cmwsIGRpdik7XG5cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdG9SZXF1ZXN0LnNlbmQoKTtcblx0fVxuXG5cdGlmQWxsTG9hZGVkKCl7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdsb2FkZWQnKTtcblx0XHR9XG5cdH1cblxuXHRzZXRPbmUoa2V5LCBlbGVtZW50KSB7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXVtrZXldID0gZWxlbWVudDtcblx0fVxuXG5cdGdldChrZXkpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0NBQ0hFXS5oYXNPd25Qcm9wZXJ0eShrZXkpID8gdGhpc1tNRVRBX0NBQ0hFXVtrZXldLmNsb25lTm9kZSh0cnVlKSA6IG51bGw7XG5cdH1cblxuXHRnZXROYW1lcygpe1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzW01FVEFfQ0FDSEVdKTtcblx0fVxuXG5cdGdldEJ5VVJMKHVybCkge1xuXHRcdGZvciAodmFyIGkgaW4gdGhpc1tNRVRBX0NBQ0hFXSkge1xuXHRcdFx0aWYgKHRoaXNbTUVUQV9DQUNIRV1baV0uc3JjID09IHVybCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXQoaSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8vXHROZXcgQVBJXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0TG9hZGVkKGtleSl7XG5cdFx0bGV0IHQgPSB0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGtleSk7XG5cdFx0aWYgKHQgPiAtMSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuc3BsaWNlKHQsIDEpO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRlZCcpLnB1c2goJ2tleScpO1xuXHR9XG5cblx0d3JhcChrZXksIHVybCwgaW5uZXJIVE1MKXtcblx0XHR2YXIgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdGNvbnQubmFtZSA9IGtleTtcblx0XHRjb250LnNyYyA9IHVybDtcblx0XHRjb250LmlubmVySFRNTCA9IGlubmVySFRNTDtcblx0XHRyZXR1cm4gY29udDtcblx0fVxuXG5cdHBhcnNlTGliKHRleHQpe1xuXHRcdGxldCBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0bGV0IHJlc3VsdCA9IHt9O1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gdGV4dDtcblx0XHRsZXQgbm90VGVtcGxhdGVzRWxlbWVudHMgPSBjb250LnF1ZXJ5U2VsZWN0b3JBbGwoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdGZvcihsZXQgZWxJZCA9MDsgZWxJZDwgbm90VGVtcGxhdGVzRWxlbWVudHMubGVuZ3RoOyBlbElkKyspe1xuXHRcdFx0bGV0IGVsID0gbm90VGVtcGxhdGVzRWxlbWVudHNbZWxJZF07XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSA9PT0gY29udCl7XG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdFx0XHRyZXN1bHRbZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlXSA9IGVsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRhZGRMaWIobGliKXtcblx0XHRmb3IobGV0IHQgaW4gbGliKXtcblx0XHRcdHRoaXMuc2V0T25lKHQsIGxpYlt0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVVSTChrZXksIHVybCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcblx0XHRcdGlmICh0aGlzLmdldChrZXkpKXtcblx0XHRcdFx0cmVzb2x2ZSh0aGlzLmdldChrZXkpKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL3RoYXQuc2V0TG9hZGluZyhrZXksIHVybCk7XG5cdFx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0XHQudGhlbigodGVtcGxhdGVJbm5lckhUTUwpPT57XG5cdFx0XHRcdFx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCB1cmwsIHRlbXBsYXRlSW5uZXJIVE1MKTtcblx0XHRcdFx0XHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh0aGlzLmdldChrZXkpKTtcblx0XHRcdFx0XHR9KS5jYXRjaCgoKT0+e1xuXHRcdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdlcnJvciBsb2FkaW5nIHRlbXBsYXRlJywga2V5LCB1cmwpO1xuXHRcdFx0XHRcdFx0cmVqZWN0KC4uLmFyZ3VtZW50cyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRMaWJGcm9tVVJMKHVybCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpXG5cdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZXNIVE1MKT0+e1xuXHRcdFx0XHRcdGxldCB0ZW1wbGF0ZXMgPSB0aGlzLnBhcnNlTGliKHRlbXBsYXRlc0hUTUwpO1xuXHRcdFx0XHRcdHRoaXMuYWRkTGliKHRlbXBsYXRlcyk7XG5cdFx0XHRcdFx0cmVzb2x2ZSh0ZW1wbGF0ZXMpO1xuXHRcdFx0XHR9KS5jYXRjaCgoZSk9Pntcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGVzIGxpYicsIHVybCxlKTtcblx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRGcm9tRG9jdW1lbnQoc2VsZWN0b3JPckVsZW1lbnQpe1xuXHRcdGxldCBlbCA9ICh0eXBlb2Ygc2VsZWN0b3JPckVsZW1lbnQgPT09ICdzdHJpbmcnKT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JFbGVtZW50KTpzZWxlY3Rvck9yRWxlbWVudDtcblx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBPUFRTLlRFTVBMQVRFX1RBRy50b0xvd2VyQ2FzZSgpKXtcblx0XHRcdFx0dGhpcy5zZXRPbmUoZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlLCBlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVRleHQoa2V5LCB0ZW1wbGF0ZUlubmVySFRNTCl7XG5cdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhpcy53cmFwKGtleSwgJycsIHRlbXBsYXRlSW5uZXJIVE1MKTtcblx0XHR0aGlzLnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVDYWNoZSgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZC5qcyc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkgPSBbJ19pZCcsICdpZCcsICdJRCddO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbnRlcmZhY2UgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0ZXh0ZW5kT2JqZWN0KG9iajEsIG9iajIpIHtcblx0XHR2YXIgYXR0ck5hbWUgPSAnJztcblx0XHRmb3IgKGF0dHJOYW1lIGluIG9iajIpIHtcblx0XHRcdGlmIChvYmoyLmhhc093blByb3BlcnR5KGF0dHJOYW1lKSkge1xuXHRcdFx0XHRvYmoxW2F0dHJOYW1lXSA9IG9iajJbYXR0ck5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb2JqMTtcblx0fVxuXG5cdHBhcnNlTGluZShsaW5lLCByZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgcmVjb3JkUkUgPSAnOnJlY29yZFsnLFxuXHRcdFx0ZmllbGROYW1lID0gJyc7XG5cdFx0d2hpbGUgKGxpbmUuaW5kZXhPZihyZWNvcmRSRSkgPiAtMSkge1xuXHRcdFx0dmFyIGluZCA9IGxpbmUuaW5kZXhPZihyZWNvcmRSRSk7XG5cdFx0XHR2YXIgbGVuID0gcmVjb3JkUkUubGVuZ3RoO1xuXHRcdFx0dmFyIGluZDIgPSBsaW5lLmluZGV4T2YoJ10nKTtcblx0XHRcdHZhciBzdGFydFNsaWNlID0gaW5kICsgbGVuO1xuXHRcdFx0dmFyIGVuZFNsaWNlID0gaW5kMjtcblx0XHRcdGZpZWxkTmFtZSA9IGxpbmUuc2xpY2Uoc3RhcnRTbGljZSwgZW5kU2xpY2UpO1xuXHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAnJykgYnJlYWs7XG5cdFx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6cmVjb3JkWycgKyBmaWVsZE5hbWUgKyAnXScsIHJlY29yZC5nZXRBdHRyKGZpZWxkTmFtZSkpO1xuXHRcdH1cblx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6bW9kZWxOYW1lJywgdGhpcy5tYW5pZmVzdC5tb2RlbCk7XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOmFjdGlvbk5hbWUnLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgbGluZSA9IHRoaXMucGFyc2VMaW5lKHRoaXMubWFuaWZlc3QudXJsLCByZWNvcmQsIGFjdGlvbk5hbWUpICsgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdwb3N0Rml4JykpID8gdGhpcy5wYXJzZUxpbmUoYWN0aW9uRGF0YS5wb3N0Rml4LCByZWNvcmQsIGFjdGlvbk5hbWUpIDogJycpO1xuXHRcdHJldHVybiBsaW5lO1xuXHR9XG5cblx0Z2V0SUQocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0bGV0IHJlc3VsdElkLFxuXHRcdFx0bGlzdCA9IE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFk7XG5cdFx0aWYgKGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2luZGV4JykgJiYgYWN0aW9uRGF0YS5pbmRleCl7XG5cdFx0XHRsaXN0ID0gW2FjdGlvbkRhdGEuaW5kZXhdLmNvbmNhdChPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZKTtcblx0XHR9XG5cdFx0Zm9yKGxldCB0IG9mIGxpc3Qpe1xuXHRcdFx0aWYocmVjb3JkLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0cmVzdWx0SWQgPSByZWNvcmRbdF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0SWQ7XG5cdH1cblxuXHRnZXRBY3Rpb25zQ291bnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpID8gT2JqZWN0LmtleXModGhpcy5nZXRBY3Rpb25zKCkpLmxlbmd0aCA6IDA7XG5cdH1cblxuXHRnZXRBY3Rpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLm1hbmlmZXN0ICYmIHRoaXMubWFuaWZlc3QuYWN0aW9ucz90aGlzLm1hbmlmZXN0LmFjdGlvbnMgOiB7fTtcblx0fVxuXG5cdHNldEZpbmRCeShrZXksIHZhbHVlKSB7XG5cdFx0dmFyIG9iaiA9IHt9O1xuXHRcdG9ialtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIHRoaXMuc2V0RmlsdGVyKG9iaik7XG5cdH1cblxuXHRzZXRGaWx0ZXIoZmlsdGVyRGF0YSkge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgnZmlsdGVyJywgZmlsdGVyRGF0YSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TW9kZWxQYXJhbSgnZmlsdGVyJyk7XG5cdH1cblxuXHRzZXRTb3J0ZXIoc29ydGVyRGF0YSkge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgnc29ydGVyJywgc29ydGVyRGF0YSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRTb3J0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TW9kZWxQYXJhbSgnc29ydGVyJyk7XG5cdH1cblxuXHRzZXRQYWdlTnVtYmVyKHBhZ2VOdW1iZXIpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VTaXplKHBhZ2VTaXplKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdwYWdlU2l6ZScsIHBhZ2VTaXplKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VyKHBhZ2VTaXplLCBwYWdlTnVtYmVyKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdwYWdlU2l6ZScsIHBhZ2VTaXplKS5zZXRNb2RlbFBhcmFtKCdwYWdlTnVtYmVyJywgcGFnZU51bWJlcik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cGFnZVNpemU6IHRoaXMuZ2V0TW9kZWxQYXJhbSgncGFnZVNpemUnKSxcblx0XHRcdHBhZ2VOdW1iZXI6IHRoaXMuZ2V0TW9kZWxQYXJhbSgncGFnZU51bWJlcicpXG5cdFx0fTtcblx0fVxuXG5cdHNldE1vZGVsUGFyYW0ocGFyYW1OYW1lLCBwYXJhbVZhbHVlKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMocGFyYW1OYW1lLCBwYXJhbVZhbHVlKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNb2RlbFBhcmFtKHBhcmFtTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMocGFyYW1OYW1lLCBudWxsKTtcblx0fVxuXG5cdGdldE1vZGVsTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcyAmJiB0aGlzLm1hbmlmZXN0ID8gdGhpcy5tYW5pZmVzdC5tb2RlbCA6IG51bGw7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKGFjdGlvbk5hbWUpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBY3Rpb25zKCkgJiYgdGhpcy5nZXRBY3Rpb25zKClbYWN0aW9uTmFtZV0gPyB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA6IG51bGw7XG5cdH1cblxuXHQvL3JldHVybiBQcm9taXNlXG5cdHJlcXVlc3QocmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSksXG5cdFx0XHRpZCA9IHRoaXMuZ2V0SUQocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSxcblx0XHRcdHVybCA9IHRoaXMuZ2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIG5vdENvbW1vbi5nZXRBUEkoKS5xdWVlUmVxdWVzdChhY3Rpb25EYXRhLm1ldGhvZCwgdXJsLCBpZCAsSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSksIHRoaXMub25Mb2FkLmJpbmQoe2FjdGlvbkRhdGEsIG1hbmlmZXN0OiB0aGlzLm1hbmlmZXN0fSkpO1xuXHR9XG4vKlxuXHRfcmVxdWVzdF9PYnNvbGV0ZV8ocmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0bm90Q29tbW9uLmxvZygncmVxdWVzdCcsIHJlY29yZCwgYWN0aW9uTmFtZSwgY2FsbGJhY2tTdWNjZXNzLCBjYWxsYmFja0Vycm9yKTtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSksXG5cdFx0XHRcdHVybCA9IHRoaXMuZ2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSk7XG5cdFx0XHRcdG5vdENvbW1vbi5nZXRBUEkoKS5xdWVlUmVxdWVzdChhY3Rpb25EYXRhLm1ldGhvZCwgdXJsLCByZWNvcmQuZ2V0SWQoKSwgSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSksIGdvb2QsIGJhZClcblx0XHRcdFx0XHQudGhlbihyZXNvbHZlKVxuXHRcdFx0XHRcdC5jYXRjaChyZWplY3QpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZScpO1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKTtcblxuXHRcdH0pO1xuXG5cblx0XHRpZiAoYWN0aW9uRGF0YSl7XG5cdFx0XHR2YXIgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhtbGh0dHAub3BlbihhY3Rpb25EYXRhLm1ldGhvZCwgdXJsKTtcblx0XHRcdHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuXHRcdFx0eG1saHR0cC5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4bWxodHRwLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4bWxodHRwLmNhbGxiYWNrU3VjY2VzcyA9IGNhbGxiYWNrU3VjY2Vzcztcblx0XHRcdHhtbGh0dHAuY2FsbGJhY2tFcnJvciA9IGNhbGxiYWNrRXJyb3I7XG5cdFx0XHR4bWxodHRwLm9ubG9hZCA9IHRoaXMub25Mb2FkO1xuXHRcdFx0eG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpKTtcblx0XHR9XG5cdH1cbiovXG5cdG9uTG9hZChkYXRhKXtcblx0XHRpZih0aGlzICYmIHRoaXMuYWN0aW9uRGF0YSAmJiB0aGlzLmFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiB0aGlzLmFjdGlvbkRhdGEuaXNBcnJheSkge1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0ZmlsZVVwbG9hZChmaWxlVXBsb2FkKSB7XG5cdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdC8vbm90Q29tbW9uLmxvZyhmaWxlVXBsb2FkLmZpbGUpO1xuXHRcdGlmICh4aHIudXBsb2FkICYmIHRoaXMuZmlsZUFsbG93ZWQoZmlsZVVwbG9hZC5maWxlKSkge1xuXHRcdFx0Ly8gcHJvZ3Jlc3MgYmFyXG5cdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcInByb2dyZXNzXCIsIGUsIGZpbGVVcGxvYWQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGF0LndvcmtpbmcuZmlsZVVwbG9hZHMuaW5kZXhPZihmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHRcdHRoYXQud29ya2luZy5maWxlVXBsb2Fkcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwic3VjY2Vzc1wiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9wZW4oXCJQT1NUXCIsIHRoaXMuZ2V0VXBsb2FkVXJsKCksIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgZmlsZVVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYX0ZJTEVOQU1FXCIsIGVuY29kZVVSSUNvbXBvbmVudChmaWxlVXBsb2FkLmZpbGUubmFtZSkpO1xuXHRcdFx0eGhyLnNlbmQoZmlsZVVwbG9hZC5maWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBuZXcgRXZlbnQoXCJXcm9uZ0ZpbGVUeXBlXCIpLCBmaWxlVXBsb2FkKTtcblx0XHR9XG5cdH1cblx0Ki9cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJztcblxuY29uc3QgTUVUQV9JTlRFUkZBQ0UgPSBTeW1ib2woJ2ludGVyZmFjZScpLFxuXHRNRVRBX1BST1hZID0gU3ltYm9sKCdwcm94eScpLFxuXHRNRVRBX0NIQU5HRSA9IFN5bWJvbCgnY2hhbmdlJyksXG5cdE1FVEFfQ0hBTkdFX05FU1RFRCA9IFN5bWJvbCgnY2hhbmdlLm5lc3RlZCcpLFxuXHRNRVRBX1NBTCA9IFsnZ2V0QXR0cicsICdnZXRBdHRycycsICdpc1Byb3BlcnR5JywgJ2lzUmVjb3JkJywgJ2dldE1hbmlmZXN0JywgJ3NldEF0dHInLCAnc2V0QXR0cnMnLCAnZ2V0RGF0YScsICdzZXREYXRhJywgJ2dldEpTT04nLCAnb24nLCAnb2ZmJywgJ3RyaWdnZXInXSxcblx0REVGQVVMVF9BQ1RJT05fUFJFRklYID0gJyQnLFxuXHRERUZBVUxUX1BBR0VfTlVNQkVSID0gMSxcblx0REVGQVVMVF9QQUdFX1NJWkUgPSAxMCxcblx0TUVUQV9SRVRVUk5fVE9fUk9PVCA9IFN5bWJvbCgncmV0dXJuVG9Sb290Jyk7XG5cbnZhciBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0eXBlb2YgdGFyZ2V0W2tleV0pO1xuXG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RQcm9wZXJ0eSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihnZXRSb290LCBwYXRoVG8sIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUHJveHkgfHwgaXRlbS5pc1Byb3BlcnR5KSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRnZXRSb290OiBnZXRSb290LFxuXHRcdFx0cGF0aDogcGF0aFRvXG5cdFx0fSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzKHRoaXMpKTtcblx0XHR0aGlzLnNldERhdGEoaXRlbSk7XG5cdFx0dGhpcy5pc1Byb3BlcnR5ID0gdHJ1ZTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfUkVUVVJOX1RPX1JPT1RdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0W01FVEFfUkVUVVJOX1RPX1JPT1RdKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0bGV0IHJvb3QgPSB0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSgpO1xuXHRcdHJvb3QudHJpZ2dlcignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9QUk9YWV0sIHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXksIHZhbHVlKTtcblx0fVxufVxuXG5cbnZhciBjcmVhdGVSZWNvcmRIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScgfHwga2V5ID09PSAnaXNSZWNvcmQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykge1xuXHRcdFx0XHRpZiAodGhpc1trZXldKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHJlc1RhcmdldCwga2V5LCBjb250ZXh0KTtcblx0XHR9LmJpbmQob3duZXIpLFxuXHRcdHNldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIHZhbHVlIC8qLCBwcm94eSovICkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGByZWNvcmQgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly9ub3RDb21tb24udHJhY2UoKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYXR0ZW1wdCB0byBwcml2YXRlIFwiJHtrZXl9XCIgcHJvcGVydHlgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCB2YWx1ZVRvUmVmbGVjdCA9IHZhbHVlO1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHZhbHVlVG9SZWZsZWN0ID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpLCBub3RQYXRoLmpvaW4odGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0cmV0dXJuIHQ7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0fTtcbn07XG5cbmNsYXNzIG5vdFJlY29yZCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCwgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1Byb3h5KSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ3RoaXMgaXMgUHJveHkgaXRlbScpO1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXG5cdFx0aWYgKGl0ZW0gJiYgKGl0ZW0uaXNSZWNvcmQgfHwgaXRlbS5pc1Byb3BlcnR5KSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0ZmlsdGVyOiB7fSxcblx0XHRcdHNvcnRlcjoge30sXG5cdFx0XHRwYWdlTnVtYmVyOiBERUZBVUxUX1BBR0VfTlVNQkVSLFxuXHRcdFx0cGFnZVNpemU6IERFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0ZmllbGRzOiBbXVxuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdID0gbmV3IG5vdFJlY29yZEludGVyZmFjZShtYW5pZmVzdCk7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXMuaW50ZXJmYWNlVXAoKTtcblx0XHR0aGlzLmlzUmVjb3JkID0gdHJ1ZTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IHJlY29yZCBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdGluaXRQcm9wZXJ0aWVzKGl0ZW0sIHBhdGggPSAnJykge1xuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhpdGVtKTtcblx0XHRcdGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRcdGxldCBjdXJQYXRoID0gcGF0aCArIChwYXRoLmxlbmd0aCA+IDAgPyAnLicgOiAnJykgKyBrZXk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3VyUGF0aCcsIGN1clBhdGgpO1xuXHRcdFx0XHRpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtW2tleV0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gKCkgPT4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCk7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ2RlZmluZScsIERFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4KTtcblx0XHR9XG5cdH1cblx0Lypcblx0LT4gJ3BhdGgudG8ua2V5JywgdmFsdWVPZktleVxuXHQ8LSBvaywgd2l0aCBvbmUgb25DaGFuZ2UgZXZlbnQgdHJpZ2dlcmVkXG5cdCovXG5cblx0c2V0QXR0cihrZXksIHZhbHVlKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguc2V0KGtleSwgdGhpc1tNRVRBX1BST1hZXSwge30sIHZhbHVlKTtcblx0fVxuXG5cdC8qXG5cdC0+XG5cdHtcblx0XHQna2V5UGF0aCc6IHZhbHVlLFxuXHRcdCdrZXkuc3ViUGF0aCc6IHZhbHVlMixcblx0XHQna2V5UGF0aC4wLnRpdGxlJzogdmFsdWUzXG5cdH1cblx0PC0gb2ssIHdpdGggYnVuY2ggb2Ygb25DaGFuZ2UgZXZlbnRzIHRyaWdnZXJlZFxuXHQqL1xuXHRzZXRBdHRycyhvYmplY3RQYXJ0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZXRBdHRycycsIG9iamVjdFBhcnQsIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpKTtcblx0XHRpZiAob2JqZWN0UGFydCAmJiAodHlwZW9mIG9iamVjdFBhcnQgPT09ICdvYmplY3QnKSAmJiBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KS5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIGluIG9iamVjdFBhcnQpIHtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdzZXRBdHRycyBvbmUgdG8gZ28nLCBwYXRoKTtcblx0XHRcdFx0dGhpcy5zZXRBdHRyKHBhdGgsIG9iamVjdFBhcnRbcGF0aF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdC0+ICdwYXRoVG9LZXknXG5cdDwtIHZhbHVlMVxuXG5cdCovXG5cdGdldEF0dHIod2hhdCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnZ2V0QXR0cicsIHdoYXQpO1xuXHRcdHJldHVybiBub3RQYXRoLmdldCh3aGF0LCB0aGlzW01FVEFfUFJPWFldLCB7fSk7XG5cdH1cblxuXHQvKlxuXHQtPiBbJ3BhdGhUb0tleScsICdwYXRoLnRvLmtleScsICdzaW1wbGVLZXknLC4uLl1cblx0PC0gW3ZhbHVlMSwgdmFsdWUyLCB2YWx1ZTMsLi4uXVxuXHQqL1xuXHRnZXRBdHRycyh3aGF0KSB7XG5cdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdGlmICh3aGF0ICYmIHdoYXQubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBvZiB3aGF0KSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHRoaXMuZ2V0QXR0cihwYXRoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRpZiAodGhpc1tNRVRBX0lOVEVSRkFDRV0pe1xuXHRcdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLm1hbmlmZXN0O1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0aGFuZGxlciBmb3IgUHJveHkgY2FsbGJhY2tzXG5cdCovXG5cblx0W01FVEFfQ0hBTkdFXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UnLCAuLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0W01FVEFfQ0hBTkdFX05FU1RFRF0oKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCd0cnkgdG8gY2hhbmdlIG5lc3RlZCcsIC4uLmFyZ3VtZW50cyk7XG5cdFx0Ly9ub3RDb21tb24udHJhY2UoKTtcblx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRoaXNbTUVUQV9QUk9YWV0sIG5vdFBhdGguam9pbihhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSksIGFyZ3VtZW50c1szXSk7XG5cdH1cblxuXHRzZXRJdGVtKGl0ZW0pIHtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZScpO1xuXHRcdHRoaXMub2ZmKCdjaGFuZ2UubmVzdGVkJyk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0Z2V0SlNPTigpIHtcblxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVjb3JkO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG5cbmNvbnN0IE9QVF9DT05UUk9MTEVSX1BSRUZJWCA9ICduYycsXG5cdE9QVF9SRUNPUkRfUFJFRklYID0gJ25yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QXBwIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcih7b3B0aW9uc30pO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGFwcCcpO1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcignYXBwJywgdGhpcyk7XG5cdFx0dGhpcy5yZXNvdXJjZXMgPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0aW50ZXJmYWNlczoge30sXG5cdFx0XHRjb250cm9sbGVyczoge30sXG5cdFx0XHRpbml0Q29udHJvbGxlcjogbnVsbCxcblx0XHRcdGN1cnJlbnRDb250cm9sbGVyOiBudWxsXG5cdFx0fSk7XG5cdFx0dGhpcy5wcmVJbml0Um91dGVyKCk7XG5cdFx0dGhpcy5pbml0TWFuYWdlcigpO1xuXHRcdHRoaXMuaW5pdEFQSSgpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlcygpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdE1hbmFnZXIoKXtcblx0XHRub3RDb21tb24uc2V0TWFuYWdlcihcblx0XHRcdHtcblx0XHRcdFx0c2V0QVBJKHYpeyB0aGlzLmFwaSA9IHY7fSxcblx0XHRcdFx0Z2V0QVBJKCl7cmV0dXJuIHRoaXMuYXBpO30sXG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdGluaXRBUEkoKXtcblx0XHRub3RDb21tb24uZ2V0TWFuYWdlcigpLnNldEFQSShuZXcgbm90QVBJKHt9KSk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGVzKCl7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykpe1xuXHRcdFx0bGV0IHByb20gPSBudWxsO1xuXHRcdFx0Zm9yKGxldCB0IGluIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykpe1xuXHRcdFx0XHRpZiAodCAmJiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0XHRsZXQgdXJsID0gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKVt0XTtcblx0XHRcdFx0XHRpZihwcm9tKXtcblx0XHRcdFx0XHRcdHByb20udGhlbihub3RUZW1wbGF0ZUNhY2hlLmFkZExpYkZyb21VUkwuYmluZChub3RUZW1wbGF0ZUNhY2hlLCB1cmwpKTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHByb20gPSBub3RUZW1wbGF0ZUNhY2hlLmFkZExpYkZyb21VUkwodXJsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChwcm9tKXtcblx0XHRcdFx0cHJvbS50aGVuKHRoaXMuaW5pdE1hbmlmZXN0LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdubyB0ZW1wbGF0ZXMgbGliJywgZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5pbml0TWFuaWZlc3QoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuaW5pdE1hbmlmZXN0KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hbmlmZXN0KCkge1xuXHRcdHZhciB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ21hbmlmZXN0VVJMJyk7XG5cdFx0bm90Q29tbW9uLmdldEpTT04odXJsLCB7fSlcblx0XHRcdC50aGVuKHRoaXMuc2V0SW50ZXJmYWNlTWFuaWZlc3QuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0LmJpbmQodGhpcykpO1xuXHR9XG5cblx0cHJlSW5pdFJvdXRlcigpe1xuXHRcdHRoaXMuc2V0V29ya2luZygncm91dGVyJywgbm90Um91dGVyKTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcicpLnNldFJvb3QodGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIucm9vdCcpKTtcblx0fVxuXG5cdGluaXRSb3V0ZXIoKXtcblx0XHR2YXIgcm91dGllSW5wdXQgPSB7fTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRsZXQgcm91dGVCbG9jayA9IHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLm1hbmlmZXN0JylbdF0sXG5cdFx0XHRcdHBhdGhzID0gcm91dGVCbG9jay5wYXRocyxcblx0XHRcdFx0Y29udHJvbGxlciA9IHJvdXRlQmxvY2suY29udHJvbGxlcjtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHJvdXRpZUlucHV0W3BhdGhzW2ldXSA9IHRoaXMuYmluZENvbnRyb2xsZXIoY29udHJvbGxlcik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuYWRkTGlzdChyb3V0aWVJbnB1dCkubGlzdGVuKCkubmF2aWdhdGUodGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIuaW5kZXgnKSk7XG5cdH1cblxuXHRzZXRJbnRlcmZhY2VNYW5pZmVzdChtYW5pZmVzdCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnLCBtYW5pZmVzdCk7XG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxuXG5cdGdldEludGVyZmFjZU1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0Jyk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0Ly/QvdGD0LbQvdC+INC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDRgtGMXG5cdFx0Ly/QvNC+0LTQtdC70Lgg0L/QvtC70YPRh9C10L3QvdGL0LzQuCDQuNC90YLQtdGA0YTQtdC50YHQsNC80Lhcblx0XHR0aGlzLnVwZGF0ZUludGVyZmFjZXMoKTtcblx0XHQvL9C40L3QuNGG0LjQu9C40YbQuNGA0L7QstCw0YLRjCDQuCDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YAg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0XHR0aGlzLmluaXRDb250cm9sbGVyKCk7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXJ0QXBwKCkge1xuXHRcdC8v0YHQvtC30LTQsNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdC8v0YDQvtGD0YLQtdGAINC4INC/0YDQuNCy0Y/Qt9Cw0YLRjCDQuiDQvdC10LzRgyDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0dGhpcy5pbml0Um91dGVyKCk7XG5cdH1cblxuXHRiaW5kQ29udHJvbGxlcihjb250cm9sbGVyTmFtZSkge1xuXHRcdGxldCBhcHAgPSB0aGlzO1xuXHRcdHJldHVybiBmdW5jdGlvbigpe1xuXHRcdFx0bmV3IGNvbnRyb2xsZXJOYW1lKGFwcCwgYXJndW1lbnRzKTtcblx0XHR9O1xuXHR9XG5cblx0aW5pdENvbnRyb2xsZXIoKSB7XG5cdFx0aWYgKHR5cGVvZih0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJykpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0bGV0IGluaXRDb250cm9sbGVyID0gdGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdpbml0Q29udHJvbGxlcicsIG5ldyBpbml0Q29udHJvbGxlcih0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudENvbnRyb2xsZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInKTtcblx0fVxuXG5cdHNldEN1cnJlbnRDb250cm9sbGVyKGN0cmwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJywgY3RybCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR1cGRhdGVJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuY2xlYXJJbnRlcmZhY2VzKCk7XG5cdFx0bGV0IG1hbmlmZXN0cyA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0XHRpZiAobWFuaWZlc3RzKSB7XG5cdFx0XHRmb3IobGV0IG5hbWUgaW4gbWFuaWZlc3RzKXtcblx0XHRcdFx0bGV0IHJlY29yZE1hbmlmZXN0ID0gbWFuaWZlc3RzW25hbWVdO1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXSA9IChyZWNvcmREYXRhKSA9PiBuZXcgbm90UmVjb3JkKHJlY29yZE1hbmlmZXN0LCByZWNvcmREYXRhKTtcblx0XHRcdFx0d2luZG93WyducicgKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpXSA9IHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFJlY29yZE5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfUkVDT1JEX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRDb250cm9sbGVyTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9DT05UUk9MTEVSX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKTtcblx0fVxuXG5cdGNsZWFySW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ludGVyZmFjZXMnLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR3YWl0VGhpc1Jlc291cmNlKHR5cGUsIGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLnJlc291cmNlcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuXHRcdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV0gPSB7fTtcblx0XHR9XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gZmFsc2U7XG5cdFx0cmV0dXJuIHRoaXMub25SZXNvdXJjZVJlYWR5LmJpbmQodGhpcywgdHlwZSwgaW5kZXgpO1xuXHR9XG5cblx0b25SZXNvdXJjZVJlYWR5KHR5cGUsIGluZGV4KSB7XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gdHJ1ZTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0YWxsUmVzb3VyY2VzUmVhZHkoKSB7XG5cdFx0dmFyIGksIGo7XG5cdFx0Zm9yIChpIGluIHRoaXMucmVzb3VyY2VzKSB7XG5cdFx0XHRmb3IgKGogaW4gdGhpcy5yZXNvdXJjZXNbaV0pIHtcblx0XHRcdFx0aWYgKCF0aGlzLnJlc291cmNlc1tpXVtqXSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcblxuY29uc3QgTUVUQV9QUk9DRVNTT1JTID0gU3ltYm9sKCdwcm9jZXNzb3JzJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFByb2Nlc3NvcigvKiBrZXksIHZhbHVlICovKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQcm9jZXNzb3IoLyoga2V5LCAgZGVmYXVsdFZhbHVlICovKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXJQcm9jZXNzb3JzKCl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGQoKXtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG5cdFx0XHR0aGlzLnNldFByb2Nlc3Nvcihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBhcmd1bWVudHNbMF0pe1xuXHRcdFx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKHQsIGFyZ3VtZW50c1swXVt0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRQcm9jZXNzb3IoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyKCl7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vbm90VGVtcGxhdGVQcm9jZXNzb3JzJztcblxuLypcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGCIERPTSDQv9C+0LTQtNC10YDQtdCy0L4g0LIg0LrQsNGH0LXRgdGC0LLQtSDRiNCw0LHQu9C+0L3QsC5cbiAqINCX0LDQv9C+0LvQvdGP0LXRgiDQtdCz0L4g0LTQsNC90L3Ri9C80LguXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgdCz0LXQvdC10YDQuNGA0L7QstCw0L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xuICpcbiAqICovXG5cbi8qXG5cblx0PGRpdiBuLXRlbXBsYXRlLW5hbWU9XCJ2YXN5YVwiPlxuXHRcdDxwPjxpbnB1dCB0eXBlPVwidGV4dFwiIG4tdmFsdWU9XCI6Y29vbE5hbWVcIi8+PC9wPlxuXHRcdDxwPtCR0L7RgNC40YEg0YXRgNC10L0g0L/QvtC/0LDQtNC10YjRjCDQuCB7ezpjb29sTmFtZX19LjwvcD5cblx0PC9kaXY+XG5cbiAqL1xuXG5jb25zdCBNRVRBX0NPTVBPTkVOVFMgPSBTeW1ib2woJ2NvbXBvbmVudHMnKTtcblxuY2xhc3Mgbm90UmVuZGVyZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Lypcblx0XHRpbnB1dCA9IHtcblx0XHRcdGRhdGE6IG5vdFJlY29yZCxcblx0XHRcdHRlbXBsYXRlOiBlbGVtZW50XG5cdFx0XHRvcHRpb25zOntcblx0XHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdH1cblx0XHR9XG5cdCovXG5cblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXSA9IHt9O1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5jb21wb25lbnQgPSBpbnB1dC5jb21wb25lbnQ7XG5cdFx0dGhpcy5pbml0RGF0YShpbnB1dC5kYXRhID8gaW5wdXQuZGF0YSA6IHt9KTtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQudGVtcGxhdGUpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlKCk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGUoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZScsIHRoaXMuZ2V0V29ya2luZygnZ2V0VGVtcGxhdGUnKSgpKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5nZXREYXRhKCkub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdH1cblxuXHRpbml0V29ya2luZyh0ZW1wbGF0ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRnZXRUZW1wbGF0ZTogdGVtcGxhdGUsXG5cdFx0XHRwYXJ0SWQ6IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgPyB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpIDogT1BUUy5QQVJUX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpIHtcblx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcblx0XHRcdHJldHVybiBbLi4udGhpcy5jb21wb25lbnQuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fVxuXHR9XG5cblx0b25DaGFuZ2UocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHQvKm5vdENvbW1vbi5sb2codGhpcyk7XG5cdFx0bm90Q29tbW9uLmxvZyh0aGlzLmdldEJyZWFkQ3J1bXBzKCkuam9pbignID4gJykpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHJlbmRlcmVyICcsIHRoaXMuZ2V0V29ya2luZygncGFydElkJyksICcgYWZ0ZXIgY2hhbmdlcycsIGtleSwgdmFsdWUpOyovXG5cdFx0dGhpcy51cGRhdGUoa2V5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ29ic29sZXRlJyxwcm94eSwga2V5LCB2YWx1ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHR1cGRhdGUoa2V5KSB7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfQ09NUE9ORU5UU10pIHtcblx0XHRcdGxldCBpdGVtID0gdGhpc1tNRVRBX0NPTVBPTkVOVFNdW3RdLFxuXHRcdFx0XHRpZlBhcnQgPSB0cnVlO1xuXHRcdFx0aWYgKGtleSl7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJyk9PT1udWxsKXtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXRcdGNvbXBvbmVudFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpKSxcblx0XHRcdFx0XHRjaGFuZ2VkUGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChrZXkpO1xuXHRcdFx0XHRpZlBhcnQgPSBub3RQYXRoLmlmRnVsbFN1YlBhdGgoY2hhbmdlZFBhdGgsIGNvbXBvbmVudFBhdGgpO1xuXHRcdFx0XHQvKm5vdENvbW1vbi5sb2coaXRlbS5nZXRPcHRpb25zKCduYW1lJyksICcgPi08ICcsIGl0ZW0uZ2V0T3B0aW9ucygnaWQnKSwgJyA+LTwgJywgY29tcG9uZW50UGF0aCwgY2hhbmdlZFBhdGgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCd3aWxsIGJlIHVwZGF0ZWQnLCBpZlBhcnQpOyovXG5cdFx0XHR9XG5cblx0XHRcdGlmIChpZlBhcnQpIHtcblx0XHRcdFx0aXRlbS51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXRXb3JraW5nTWFwcGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21hcHBpbmcnLCB0aGlzLmNyZWF0ZU1hcHBpbmcoKSk7XG5cdH1cblxuXHQvKlxuXG5cdNCh0L7Qt9C00LDQtdC8INC60LDRgNGC0Ysg0YHQvtC+0YLQstC10YHRgtCy0LjRjyDQv9GA0L7RhtC10YHRgdC+0YDQvtCyLCDQv9GD0YLQtdC5INC00LDQvdC90YvRhSDQsiDQvtCx0YrQtdC60YLQtSDQuCDRjdC70LXQvNC10L3RgtC+0LIg0YjQsNCx0LvQvtC90LAuXG5cdFt7XG5cdFx0ZWwsXG5cdFx0cHJvY2Vzc29yLFxuXHRcdHdvcmtpbmcsXG5cdFx0aXRlbS5wcm9wZXJ0eS5wYXRoXG5cdH1dXG5cblx0Ki9cblxuXHRjcmVhdGVNYXBwaW5nKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmZpbmRBbGxQcm9jZXNzb3JzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZpbmRBbGxQcm9jZXNzb3JzKCkge1xuXHRcdGxldCBwcm9jcyA9IFtdLFxuXHRcdFx0ZWxzID0gbm90Q29tbW9uLmdldEF0dHJpYnV0ZXNTdGFydHNXaXRoKHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLCBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCk7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBhdHRzID0gZWxzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhhdHRzW2ldKTtcblx0XHRcdFx0XHRsZXQgcHJvY0RhdGEgPSB0aGlzLnBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihhdHRzW2ldLm5vZGVOYW1lKTtcblx0XHRcdFx0XHRwcm9jRGF0YS5lbGVtZW50ID0gZWxzW2pdO1xuXHRcdFx0XHRcdHByb2NEYXRhLnByb2Nlc3NvckV4cHJlc3Npb24gPSBhdHRzW2ldLm5vZGVOYW1lO1xuXHRcdFx0XHRcdHByb2NEYXRhLmF0dHJpYnV0ZUV4cHJlc3Npb24gPSBhdHRzW2ldLnZhbHVlO1xuXHRcdFx0XHRcdHByb2NzLnB1c2gocHJvY0RhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwcm9jcztcblx0fVxuXG5cdHBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihwcm9jZXNzb3JFeHByZXNzaW9uKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdHBhcmFtczogW10sXG5cdFx0XHRwcm9jZXNzb3JOYW1lOiAnJyxcblx0XHRcdGlmQ29uZGl0aW9uOiBmYWxzZVxuXHRcdH07XG5cdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCwgJycpO1xuXHRcdGlmIChwcm9jZXNzb3JFeHByZXNzaW9uLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCkgPT09IChwcm9jZXNzb3JFeHByZXNzaW9uLmxlbmd0aCAtIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgubGVuZ3RoKSkge1xuXHRcdFx0cmVzdWx0LmlmQ29uZGl0aW9uID0gdHJ1ZTtcblx0XHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgKyBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLCAnJyk7XG5cdFx0fVxuXHRcdHJlc3VsdC5wYXJhbXMgPSBwcm9jZXNzb3JFeHByZXNzaW9uLnNwbGl0KE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SKTtcblx0XHRyZXN1bHQucHJvY2Vzc29yTmFtZSA9IHJlc3VsdC5wYXJhbXNbMF07XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHJlc3VsdC5wYXJhbXMuc2xpY2UoMSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGV4ZWNQcm9jZXNzb3JzKGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG1hcHBpbmcgPSB0aGlzLmdldFdvcmtpbmcoJ21hcHBpbmcnKTtcblx0XHRpZiAobWFwcGluZykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBwcm9jU2NvcGUgPSBtYXBwaW5nW2ldO1xuXHRcdFx0XHRwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHByb2NTY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBpbmRleCk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnYXR0cmlidXRlUmVzdWx0JywgcHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdFx0XHRcdGxldCBwcm9jTmFtZSA9IHByb2NTY29wZS5wcm9jZXNzb3JOYW1lLFxuXHRcdFx0XHRcdHByb2MgPSBub3RUZW1wbGF0ZVByb2Nlc3NvcnMuZ2V0KHByb2NOYW1lKTtcblx0XHRcdFx0aWYgKHByb2MpIHtcblx0XHRcdFx0XHRwcm9jKHByb2NTY29wZSwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0XHRcdFx0XHRwcm9jU2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvY1Njb3BlLnByb2Nlc3NvckV4cHJlc3Npb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gcHJvY2Vzc29yIGxpa2UnLCBwcm9jTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcpO1xuXHR9XG5cblx0Z2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwYXRoLCBpdGVtKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdH1cblxuXHRjbGVhclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmRlc3Ryb3lTdWJzKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdWJzJywgW10pO1xuXHR9XG5cblx0ZGVzdHJveVN1YnMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFN0YXNoKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IGVsID0gdGhpcy5nZXRTdGFzaCgpW3RdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUpe1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZlN1YkVsZW1lbnRSZW5kZXJlZChudEVsKSB7XG5cdFx0cmV0dXJuIG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkICYmIChudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZC52YWx1ZSA9PT0gJ3RydWUnKTtcblx0fVxuXG5cdHNlYXJjaEZvclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0bGV0IHN1YnMgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCA9IDA7IG50IDwgc3Vicy5sZW5ndGg7IG50KyspIHtcblx0XHRcdGlmICghdGhpcy5pZlN1YkVsZW1lbnRSZW5kZXJlZChzdWJzW250XSkpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJTdWIoc3Vic1tudF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZFN1YihudEVsKSB7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdzdWJzJykucHVzaCh7XG5cdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdHBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiAnJyxcblx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnNyYyA6ICcnLFxuXHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0XHRyZW5kZXJlZExpc3Q6IFtdLFxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU3ViKG50RWwpIHtcblx0XHRpZiAoIW50RWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IGRldGFpbHMgPSB7XG5cdFx0XHRcdGRhdGFQYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogbnVsbCxcblx0XHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMuc3JjLnZhbHVlIDogJycsXG5cdFx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0ZGF0YTogZGV0YWlscy5kYXRhUGF0aCE9PSBudWxsPyB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQoZGV0YWlscy5kYXRhUGF0aCwgdGhpcy5nZXREYXRhKCkpOm51bGwsXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHNyYzogZGV0YWlscy5zcmNcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSxcblx0XHRcdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VBZnRlcicsXG5cdFx0XHRcdFx0aWQ6IGRldGFpbHMuaWQsXG5cdFx0XHRcdFx0bnRFbDogbnRFbCxcblx0XHRcdFx0XHRkYXRhUGF0aDogZGV0YWlscy5kYXRhUGF0aFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvd25lcjogdGhpc1xuXHRcdFx0fTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnaWQnLCBkZXRhaWxzLmlkKTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU11bZGV0YWlscy5pZF0gPSBuZXcgbm90Q29tcG9uZW50KG9wdGlvbnMpO1xuXHR9XG5cblx0Y2xlYXJTdGFzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgW10pO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZScpO1xuXHR9XG5cblx0Z2V0U3Rhc2goKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc3Rhc2gnKTtcblx0fVxuXG5cdHN0YXNoUmVuZGVyZWQoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMuYWRkVG9TdGFzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHR9XG5cblx0cmVwbGFjZVJlbmRlcmVkKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygncmVwbGFjZSBzdGFzaCcpO1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSxcblx0XHRcdHN0YXNoID0gdGhpcy5nZXRTdGFzaCgpLFxuXHRcdFx0bmV3U3Rhc2ggPSBbXSxcblx0XHRcdGFuY2hvciA9IHN0YXNoLmxlbmd0aCA+IDAgPyBzdGFzaFswXSA6IHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLFxuXHRcdFx0cGFyZW50Tm9kZSA9IGFuY2hvci5wYXJlbnROb2RlO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdG5ld1N0YXNoLnB1c2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IG5ld1N0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRpZiAoYW5jaG9yLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTdGFzaFt0XSwgYW5jaG9yLm5leHRTaWJsaW5nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld1N0YXNoW3RdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBzdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdGFzaFt0XSk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBuZXdTdGFzaCk7XG5cdH1cblxuXHRhZGRUb1N0YXNoKG5vZGUpIHtcblx0XHR0aGlzLmdldFN0YXNoKCkucHVzaChub2RlKTtcblx0fVxuXG5cdGlzRGF0YShkYXRhKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlbmRlcmVyO1xuIiwiY29uc3QgcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdGxldCBsID0gMDtcblx0XHR3aGlsZSAodGFyZ2V0RWwuY2hpbGRyZW4ubGVuZ3RoIC0gbCkge1xuXHRcdFx0aWYgKHRhcmdldEVsLmNoaWxkcmVuWzBdLm5vZGVOYW1lID09PSAnTlQnKXtcblx0XHRcdFx0Y29uc29sZS5sb2coJ250IGZvdW5kZWQnKTtcblx0XHRcdFx0bCsrO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdyZW1vdmUgY2hpbGQgJyx0YXJnZXRFbC5jaGlsZHJlbltsXSk7XG5cdFx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGFyZ2V0RWwudGV4dENvbnRlbnQgPSAnJztcblx0fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnNvbGUubG9nKCdhcHBlbmQgY2hpbGQgJywgcmVuZGVyZWRbaV0pO1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXJFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9XG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2U7XG4iLCJjb25zdCBwbGFjZUFmdGVyID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VBZnRlcjtcbiIsImNvbnN0IHBsYWNlQmVmb3JlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VCZWZvcmU7XG4iLCJjb25zdCBwbGFjZUZpcnN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gcmVuZGVyZWQubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcblx0XHRcdGNvbnNvbGUubG9nKCdwbGFjZSBmaXJzdCcsIGksIHJlbmRlcmVkW2ldKTtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHRjb25zb2xlLmxvZygnYXBwZW5kIGJlZm9yZSBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLmNoaWxkcmVuWzBdKTtcblx0XHRcdH1lbHNle1x0XHRcdFx0XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdhcHBlbmQgYXMgZmlyc3QnKTtcblx0XHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlRmlyc3Q7XG4iLCJjb25zdCBwbGFjZUxhc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlTGFzdDtcbiIsImNvbnN0IHJlcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGJlZm9yZUVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdGNvbnNvbGUubG9nKCdzaG91bGQgcmVtb3ZlIG5vZGUnLCB0YXJnZXRFbCk7XG5cdFx0aWYgKHRhcmdldEVsLm5vZGVOYW1lICE9PSAnTlQnKXtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFyZ2V0RWwpO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZTtcbiIsImltcG9ydCBwbGFjZSBmcm9tICcuL3BsYWNlJztcbmltcG9ydCBwbGFjZUFmdGVyIGZyb20gJy4vcGxhY2VBZnRlcic7XG5pbXBvcnQgcGxhY2VCZWZvcmUgZnJvbSAnLi9wbGFjZUJlZm9yZSc7XG5pbXBvcnQgcGxhY2VGaXJzdCBmcm9tICcuL3BsYWNlRmlyc3QnO1xuaW1wb3J0IHBsYWNlTGFzdCBmcm9tICcuL3BsYWNlTGFzdCc7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICcuL3JlcGxhY2UnO1xuXG5jb25zdCBub3RQbGFjZXJzID0ge1xuXHRwbGFjZTogcGxhY2UsXG5cdHBsYWNlQWZ0ZXI6IHBsYWNlQWZ0ZXIsXG5cdHBsYWNlQmVmb3JlOiBwbGFjZUJlZm9yZSxcblx0cGxhY2VGaXJzdDogcGxhY2VGaXJzdCxcblx0cGxhY2VMYXN0OiBwbGFjZUxhc3QsXG5cdHJlcGxhY2U6IHJlcGxhY2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFBsYWNlcnM7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vbm90UmVuZGVyZXInO1xuaW1wb3J0IG5vdFBsYWNlcnMgZnJvbSAnLi9wbGFjZXJzJztcblxuY29uc3QgTUVUQV9QQVJUUyA9IFN5bWJvbCgncGFydHMnKTtcbi8qXG5cdGlucHV0ID0ge1xuXHRcdGRhdGE6IG5vdFJlY29yZCBvciBbbm90UmVjb3JkXSxcblx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0aHRtbDogaHRtbChzdHJpbmcpLCBcdFx0Ly/RgtC10LrRgdGCINGBIGh0bWwg0LrQvtC00L7QvCDRiNCw0LHQu9C+0L3QsFxuXHRcdFx0ZWw6IEhUTUxFbGVtZW50KG9iamVjdCksIFx0Ly9ET00g0Y3Qu9C10LzQtdC90YJcblx0XHRcdHNyYzogc3JjKHN0cmluZyksXHRcdFx0Ly/RgdGB0YvQu9C60LAg0L3QsCDRhNCw0LnQuyDRgSDRiNCw0LHQu9C+0L3QvtC8XG5cdFx0XHRuYW1lOiBuYW1lKHN0cmluZylcdFx0XHQvL9C90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAg0LTQu9GPINC/0L7QuNGB0LrQsCDQsiDQutGN0YjQtSBub3RUZW1wbGF0ZUNhY2hlXG5cdFx0fVxuXHRcdG9wdGlvbnM6e1xuXHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0Ly/QsCDRjdGC0L4g0LrQsNC6INCx0YPQtNC10Lwg0L/QvtC80LXRidCw0YLRjCDRgNC10LfRg9C70YzRgtCw0YIg0YDQtdC90LTQtdGA0LjQvdCz0LBcblx0XHRcdHJlbmRlckFuZDogcGxhY2VTdHlsZShzdHJpbmcpINC+0LTQuNC9INC40Lcg0LLQsNGA0LjQsNC90YLQvtCyXG5cdFx0XHRcdFx0cGxhY2VcdFx0LVx00L/QvtC80LXRidCw0LXQvCDQstC90YPRgtGA0Lgg0YbQtdC70LXQstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG5cdFx0XHRcdFx0cmVwbGFjZVx0XHQtXHTQt9Cw0LzQtdC90Y/QtdC8XG5cdFx0XHRcdFx0cGxhY2VBZnRlclx0LVx00L/QvtGB0LvQtVxuXHRcdFx0XHRcdHBsYWNlQmVmb3JlXHQtXHTQtNC+XG5cdFx0XHRcdFx0cGxhY2VGaXJzdFx0LVx00LLQvdGD0YLRgNC4INC/0LXRgNCy0YvQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0XHRcdFx0cGxhY2VMYXN0XHQtXHTQstC90YPRgtGA0Lgg0L/QvtGB0LvQtdC00L3QuNC8INC00L7Rh9C10YDQvdC40Lxcblx0XHR9XG5cdH1cbiovXG5jbGFzcyBub3RDb21wb25lbnQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKXtcblx0XHRpZiAodGhpcy5vd25lcil7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMub3duZXIuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMub3duZXIgPSBpbnB1dC5vd25lcj9pbnB1dC5vd25lcjpudWxsO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dCk7XG5cdFx0dGhpcy5wcmVwYXJlVGVtcGxhdGVFbGVtZW50KGlucHV0LnRlbXBsYXRlID8gaW5wdXQudGVtcGxhdGUgOiBudWxsKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHR9XG5cblx0aW5pdEV2ZW50cyhsaXN0KXtcblx0XHRmb3IobGV0IHQgb2YgbGlzdCl7XG5cdFx0XHR0aGlzLm9uKC4uLnQpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdpZCcpKXtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygnaWQnLCBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ250RWwnKSl7XG5cdFx0XHR0aGlzLmluaXRNYXJrRWxlbWVudCgpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRNYXJrRWxlbWVudCgpe1xuXHRcdGxldCBtYXJrRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdudCcpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbnRFbCcsIG1hcmtFbCk7XG5cdFx0bGV0IHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpLFxuXHRcdFx0dGFyZ2V0UXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5Jyk7XG5cdFx0aWYgKHRhcmdldFF1ZXJ5KXtcblx0XHRcdGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFF1ZXJ5KTtcblx0XHRcdGlmICh0YXJnZXQpe1xuXHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3RhcmdldEVsJywgdGFyZ2V0KVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKXtcblx0XHRcdHRocm93ICdObyB0YXJnZXQgdG8gcGxhY2UgcmVuZGVyZWQnO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyLm1haW4odGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLCBbbWFya0VsXSk7XG5cdFx0fVxuXG5cdH1cblxuXHRpbml0V29ya2luZyh2YWwpIHtcblx0XHR0aGlzLnVuc2V0UmVhZHkodmFsKTtcblx0fVxuXG5cdHByZXBhcmVUZW1wbGF0ZUVsZW1lbnQodmFsKSB7XG5cdFx0aWYgKCF2YWwpIHtcblx0XHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdodG1sJykgJiYgdmFsLmh0bWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQodmFsLmVsLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZhbC5zcmMpIHtcblx0XHRcdG5vdFRlbXBsYXRlQ2FjaGUuYWRkRnJvbVVSTCh2YWwuc3JjLCB2YWwuc3JjKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpICYmIHZhbC5uYW1lKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUuZ2V0KHZhbC5uYW1lKSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JywgY29udCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRyZXNldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50JywgdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpLmNsb25lTm9kZSh0cnVlKSk7XG5cdH1cblxuXHRzZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdHJ1ZSk7XG5cdH1cblxuXHR1bnNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCBmYWxzZSk7XG5cdH1cblxuXHRpc1JlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3JlYWR5Jyk7XG5cdH1cblxuXHRjbGVhclBhcnRzKCkge1xuXHRcdC8qINC40LfQstC10YnQsNC10Lwg0L7QsSDRg9C00LDQu9C10L3QuNC4INGN0LvQtdC80LXQvdGC0L7QsiAqL1xuXHRcdGlmICh0aGlzW01FVEFfUEFSVFNdICYmIEFycmF5LmlzQXJyYXkodGhpc1tNRVRBX1BBUlRTXSkgJiYgdGhpc1tNRVRBX1BBUlRTXS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpc1tNRVRBX1BBUlRTXSkge1xuXHRcdFx0XHRpZiAodC5kZXN0cm95KXtcblx0XHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdudEVsJykgJiYgdGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZSl7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKTtcblx0XHR9XG5cdH1cblxuXHRyZXNldFBhcnRzKCkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10gPSBbXTtcblx0fVxuXG5cdGdldFBhcnRzKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfUEFSVFNdO1xuXHR9XG5cblx0YWRkUGFydCh0ZW1wbGF0ZSkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10ucHVzaCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0dGhpcy5yZW1vdmVPYnNvbGV0ZVBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHBsYWNlci5iZWZvcmUodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHRwbGFjZXIuYWZ0ZXIodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyB0YXJnZXQgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdHBsYWNlUGFydChkYXRhLCBpbmRleCl7XG5cdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSksXG5cdFx0XHRub2RlcyA9IHBhcnQuZ2V0U3Rhc2goKSxcblx0XHRcdHRhcmdldEVsLFxuXHRcdFx0bGFzdE5vZGUsXG5cdFx0XHRwbGFjZXI7XG5cdFx0aWYgKGluZGV4ID09PSAwKXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcihPUFRTLkRFRkFVTFRfUExBQ0VSX0xPT1ApO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJyk7XG5cdFx0fVxuXHRcdHBsYWNlci5tYWluKHRhcmdldEVsLCBub2Rlcyk7XG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRnZXRQbGFjZXIobWV0aG9kKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZWFyY2hpbmcgZm9yIHBsYWNlcicsIG1ldGhvZCk7XG5cdFx0aWYgKG5vdFBsYWNlcnMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbbWV0aG9kXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbT1BUUy5ERUZBVUxUX1BMQUNFUl07XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaERhdGEoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldERhdGEoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaFBhcnQoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0UGFydHMoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXRQYXJ0cygpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdNC10YHQu9C4INGBINC00LDQvdC90YvQvNC4INC90LUg0YHQstGP0LfQsNC9INGA0LXQvdC00LXRgNC10YAgLSDRgdC+0LfQtNCw0LXQvFxuXHQqL1xuXG5cdHJlbmRlclBhcnQoZGF0YSkge1xuXHRcdGlmICghdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ2NyZWF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHRsZXQgcmVuZGVyZXIgPSBuZXcgbm90UmVuZGVyZXIoe1xuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0ZW1wbGF0ZTogdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lLmJpbmQodGhpcyksXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpLFxuXHRcdFx0XHRjb21wb25lbnQ6IHRoaXNcblx0XHRcdH0pO1xuXHRcdFx0Ly9yZW5kZXJlci5vbignb2Jzb2xldGUnLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkUGFydChyZW5kZXJlcik7XG5cdFx0fWVsc2V7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHR0aGlzLnVwZGF0ZVBhcnQodGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVQYXJ0KHBhcnQpe1xuXHRcdHBhcnQudXBkYXRlKCk7XG5cdH1cblxuXHRyZW1vdmVPYnNvbGV0ZVBhcnRzKCkge1xuXHRcdC8v0LrQvtC90LLQtdC10YAg0L/QvtC40YHQuiDQsNC60YLRg9Cw0LvRjNC90YvRhSAtINGD0LTQsNC70LXQvdC40LUg0L7RgdGC0LDQu9GM0L3Ri9GFXG5cdFx0bm90Q29tbW9uLnBpcGUoXG5cdFx0XHR1bmRlZmluZWQsIC8vIHBhcnRzIHRvIHNlYXJjaCBpbiwgY2FuIGJlICd1bmRlZmluZWQnXG5cdFx0XHRbXG5cdFx0XHRcdHRoaXMuZmluZEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vZmlyc3Qgcm91bmQsIHNlYXJjaCBmb3Igb2Jzb2xldGVcblx0XHRcdFx0dGhpcy5yZW1vdmVOb3RBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL3JlbW92ZSAnZW1cblx0XHRcdF1cblx0XHQpO1xuXHR9XG5cblx0Lypcblx0XHTQtdGB0YLRjCDQtNCw0L3QvdGL0LUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDQsNC60YLRg9Cw0LvRjNC90L4sXG5cdFx00L3QtdGCINC00LDQvdC90YvRhSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINGB0YLQsNGA0YzRkVxuXHQqL1xuXG5cdGZpbmRBY3R1YWxQYXJ0cygpIHtcblx0XHRsZXQgYWN0dWFsUGFydHMgPSBbXTtcblx0XHR0aGlzLmZvckVhY2hEYXRhKChkYXRhLyosIGluZGV4Ki8pPT57XG5cdFx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKTtcblx0XHRcdGlmIChwYXJ0KXtcblx0XHRcdFx0YWN0dWFsUGFydHMucHVzaChwYXJ0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gYWN0dWFsUGFydHM7XG5cdH1cblxuXHQvKlxuXHRcdNGD0LTQsNC70Y/QtdC8INCy0YHQtSDQutGA0L7QvNC1INCw0LrRgtGD0LDQu9GM0L3Ri9GFXG5cdCovXG5cdHJlbW92ZU5vdEFjdHVhbFBhcnRzKGFjdHVhbFBhcnRzKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmIChhY3R1YWxQYXJ0cy5pbmRleE9mKHRoaXMuZ2V0UGFydHMoKVt0XSkgPT09IC0xKXtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpW3RdLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpLnNwbGljZSh0LCAxKTtcblx0XHRcdFx0dC0tO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFBhcnRCeURhdGEoZGF0YSkge1xuXHRcdGZvciAobGV0IHQgaW4gdGhpcy5nZXRQYXJ0cygpKSB7XG5cdFx0XHRpZiAodGhpcy5nZXRQYXJ0cygpW3RdLmlzRGF0YShkYXRhKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRQYXJ0cygpW3RdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tcG9uZW50O1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IgPSAnLnBhZ2UtY29udGVudCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdTX1BPU1RGSVggPSAnLmh0bWwnLFxuXHRPUFRfREVGQVVMVF9WSUVXX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCA9IHRydWUsXG5cdE9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FID0gJ01vZGVscycsXG5cdE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FID0gJ01vZGVsJyxcblx0T1BUX0RFRkFVTFRfTU9EVUxFX05BTUUgPSAnbWFpbicsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9BTkQgPSAncGxhY2UnO1xuXG5jbGFzcyBub3RDb250cm9sbGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGFwcCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgY29udHJvbGxlcicpO1xuXHRcdHRoaXMuYXBwID0gYXBwO1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyZWFkeTogZmFsc2UsXG5cdFx0XHR2aWV3czoge30sXG5cdFx0XHR2aWV3TmFtZTogT1BUX0RFRkFVTFRfVklFV19OQU1FLFxuXHRcdFx0aGVscGVyczoge31cblx0XHR9KTtcblx0XHR0aGlzLnNldERhdGEoe30pO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRtb2R1bGVOYW1lOiBPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSxcblx0XHRcdGNvbnRhaW5lclNlbGVjdG9yOiBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IsXG5cdFx0XHRwcmVmaXg6IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZScpLFxuXHRcdFx0cG9zdGZpeDogT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCxcblx0XHRcdHJlbmRlckZyb21VUkw6IE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCxcblx0XHRcdG5hbWVzOntcblx0XHRcdFx0cGx1cmFsOk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FLFxuXHRcdFx0XHRzaW5nbGU6IE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLmluaXRSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0Lypcblx0XHQgICAg0YHRgNCw0LfRgyDQtNC10LvQsNC10Lwg0LTQvtGB0YLRg9C/0L3Ri9C80Lgg0LzQvtC00LXQu9C4IG5vdFJlY29yZCDQuNC3IG5jYENvbnRyb2xsZXJOYW1lYCDQsdGD0LTRg9GCINC00L7RgdGC0YPQv9C90Ysg0LrQsNC6IHRoaXMubnJgTW9kZWxOYW1lYFxuXHRcdCovXG5cdFx0bGV0IGludGVyZmFjZXMgPSB0aGlzLmFwcC5nZXRJbnRlcmZhY2VzKCk7XG5cdFx0dGhpcy5tYWtlID0ge307XG5cdFx0Zm9yIChsZXQgdCBpbiBpbnRlcmZhY2VzKSB7XG5cdFx0XHRpZiAoaW50ZXJmYWNlcy5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdHRoaXMubWFrZVt0XSA9IGludGVyZmFjZXNbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdFJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyKHRoaXMuZ2V0V29ya2luZygndmlld05hbWUnKSwgdGhpcy5nZXREYXRhKCksIHRoaXMuZ2V0V29ya2luZygnaGVscGVycycpKTtcblx0fVxuXG5cdHJlbmRlcih2aWV3TmFtZSA9J2RlZmF1bHQnIC8qIHZpZXcgbmFtZSAqLywgZGF0YSA9IHt9IC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzID0ge30vKiBjb3VsZCBiZSBub3QgcmVwcmVzZW50ZWQgKi8pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHZhciB2aWV3ID0gdGhpcy5nZXRWaWV3KHZpZXdOYW1lKTtcblxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3ID09PSAndW5kZWZpbmVkJyB8fCB2aWV3ID09PSBudWxsKSB7XG5cdFx0XHRcdHJlamVjdCgnTm8gdmlldyBmb3VuZCcsIHZpZXdOYW1lKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2aWV3ID0gbm90Q29tbW9uLmV4dGVuZCh7fSwgdmlldyk7XG5cdFx0XHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0XHRcdC8vINGN0LvQtdC80LXQvdGC0LAsINC90L4g0LjQt9Cy0LXRgdGC0L3QvtC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGA0LVcblx0XHRcdFx0aWYgKCgodHlwZW9mIHZpZXcudGFyZ2V0RWwgPT09ICd1bmRlZmluZWQnKSB8fCAodmlldy50YXJnZXRFbCA9PT0gbnVsbCkpICYmICh0eXBlb2Ygdmlldy50YXJnZXRRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy50YXJnZXRRdWVyeSAhPT0gbnVsbCAmJiB2aWV3LnRhcmdldFF1ZXJ5Lmxlbmd0aCA+IDApKSB7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iodmlldy50YXJnZXRRdWVyeSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHZpZXcuaGVscGVycywgaGVscGVycyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0fVxuXHRcdFx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0XHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckZyb21VUkwnKSkge1xuXHRcdFx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygdmlldy50ZW1wbGF0ZVVSTCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldy50ZW1wbGF0ZVVSTCA9PSBudWxsIHx8IHZpZXcudGVtcGxhdGVVUkwubGVuZ3RoID09IDApIHtcblx0XHRcdFx0XHRcdGxldCBwcmVmaXggPSAodmlldy5jb21tb24gPyB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5jb21tb24nKTogdGhpcy5nZXRNb2R1bGVQcmVmaXgoKSksXG5cdFx0XHRcdFx0XHRcdG5hbWUgPSAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiB2aWV3TmFtZSksXG5cdFx0XHRcdFx0XHRcdHBvc3RmaXggPSB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHRcdC8v0LPQtdC90LXRgNC40YDRg9C10Lwg0LDQtNGA0LXRgSDQv9C+INGI0LDQsdC70L7QvdGDXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gIFtwcmVmaXgsIG5hbWVdLmpvaW4oJy8nKSArIHBvc3RmaXg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8v0LAg0LXRgdC70Lgg0LXRgdGC0Ywg0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCwg0YLQvlxuXHRcdFx0XHRcdGlmICh2aWV3Lmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU5hbWUnKSkge1xuXHRcdFx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVOYW1lID0gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIHZpZXcudGVtcGxhdGVOYW1lICsgdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTp7XG5cdFx0XHRcdFx0XHRuYW1lOiB2aWV3LnRlbXBsYXRlTmFtZSxcblx0XHRcdFx0XHRcdHNyYzogdmlldy50ZW1wbGF0ZVVSTCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czpbWydhZnRlclJlbmRlcicsIHJlc29sdmVdXSxcblx0XHRcdFx0XHRvcHRpb25zOntcblx0XHRcdFx0XHRcdHRhcmdldEVsOiB2aWV3LnRhcmdldEVsLFxuXHRcdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRcdHJlbmRlckFuZDogT1BUX0RFRkFVTFRfUkVOREVSX0FORCB8fCB2aWV3LnJlbmRlckFuZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRBcHAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwO1xuXHR9XG5cblx0c2V0TW9kZWwobW9kZWwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGVsJywgbW9kZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kZWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnbW9kZWwnKTtcblx0fVxuXG5cdHNldFJlYWR5KHZhbCA9IHRydWUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdmFsKTtcblx0XHR2YWwgPyB0aGlzLnRyaWdnZXIoJ3JlYWR5JykgOiB0aGlzLnRyaWdnZXIoJ2J1c3knKTtcblx0fVxuXG5cdHNldFZpZXcobmFtZSwgdmlldyl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSwgdmlldyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRWaWV3cyh2aWV3cyl7XG5cdFx0Zm9yKGxldCB0IGluIHZpZXdzKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgdCksIHZpZXdzW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRWaWV3KG5hbWUgPSAnZGVmYXVsdCcpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpKTtcblx0fVxuXG5cdHNldE1vZHVsZU5hbWUodmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdtb2R1bGVOYW1lJywgdmFsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZHVsZU5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnbW9kdWxlTmFtZScpO1xuXHR9XG5cblx0Z2V0TW9kdWxlUHJlZml4KCl7XG5cdFx0cmV0dXJuIFt0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGVzJyksIHRoaXMuZ2V0TW9kdWxlTmFtZSgpXS5qb2luKCcvJyk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb250cm9sbGVyO1xuIiwiaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aC5qcyc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4uL25vdFJvdXRlcic7XG5cbnZhciBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgPSB7XG5cdGNvbnRlbnQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5pbmRleE9mKCdjYXBpdGFsaXplJykgPiAtMSkge1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0LnRvVXBwZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQudGV4dENvbnRlbnQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQ7XG5cdH0sXG5cdGJpbmQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpID0+IHtcblx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe1xuXHRcdFx0XHRcdHNjb3BlLFxuXHRcdFx0XHRcdGl0ZW0sXG5cdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBsaXZlRXZlbnRzID0gWydjaGFuZ2UnLCAna2V5dXAnXSxcblx0XHRcdG9uRXZlbnQgPSAoKSA9PiB7XG5cdFx0XHRcdGlmIChbJ2NoZWNrYm94JywgJ3JhZGlvJywgJ3NlbGVjdC1tdWx0aXBsZSddLmluZGV4T2Yoc2NvcGUuZWxlbWVudC50eXBlKSA+IC0xKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChzY29wZS5lbGVtZW50LnR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdyYWRpbyc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZD9zY29wZS5lbGVtZW50LnZhbHVlOm51bGwpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkID8gc2NvcGUuZWxlbWVudC52YWx1ZSA6IG51bGwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnc2VsZWN0LW11bHRpcGxlJzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bGV0IHNlbGVjdGVkID0gW10uc2xpY2UuY2FsbChzY29wZS5lbGVtZW50LnNlbGVjdGVkT3B0aW9ucykubWFwKGEgPT4gYS52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coJ3NlbGVjdC1tdWx0aXBsZScsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2cobm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyksICcgLT4gJyxzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgIT09IHRydWUpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgbGl2ZUV2ZW50cykge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodCwgb25FdmVudCk7XG5cdFx0XHR9XG5cdFx0XHRzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cdGF0dHI6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlcyA9PT0gJ2Z1bmN0aW9uJykgPyByZXMoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzKTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZShzY29wZS5wYXJhbXNbMF0sIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdH0sXG5cdG5hbWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oIC8qc2NvcGUsIGl0ZW0sIGhlbHBlcnMqLyApIHtcblxuXHR9LFxuXHRjaGVja2VkOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXN1bHQgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXN1bHQgPT09ICdmdW5jdGlvbicpID8gcmVzdWx0KHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlc3VsdCk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID8gc2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKSA6IHNjb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG5cdH0sXG5cdGNsYXNzOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpID8gcmVzKHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlcyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPCAzIHx8IGlzTmFOKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpIHtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IHVzZWQgPSBmYWxzZTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcGUucGFyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChpID09PSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0XHR1c2VkID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCF1c2VkKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0b3B0aW9uczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgaSA9IDAsXG5cdFx0XHRvcHRpb24gPSBudWxsLFxuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSAndmFsdWUnLFxuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSAnbmFtZScsXG5cdFx0XHRpdGVtVmFsdWVGaWVsZE5hbWUgPSBoZWxwZXJzLmhhc093blByb3BlcnR5KCdmaWVsZCcpICYmIGhlbHBlcnMuZmllbGQuaGFzT3duUHJvcGVydHkoJ25hbWUnKSA/IGhlbHBlcnMuZmllbGQubmFtZSA6ICd2YWx1ZSc7XG5cdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBoZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWxwZXJzICE9PSBudWxsICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSAmJiBoZWxwZXJzLmRlZmF1bHQpIHtcblx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyk7XG5cdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBoZWxwZXJzLnBsYWNlaG9sZGVyO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdHZhciBsaWIgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsaWIubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbGliW2ldW3ZhbHVlRmllbGROYW1lXSk7XG5cdFx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGxpYltpXVtsYWJlbEZpZWxkTmFtZV07XG5cdFx0XHRcdGlmIChoZWxwZXJzLmZpZWxkLmFycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXS5pbmRleE9mKGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pID4gLTEpIHtcblx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0gPT09IGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pIHtcblx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGhyZWY6ZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGlmICghc2NvcGUuZWxlbWVudC5ub3RSb3V0ZXJJbml0aWFsaXplZCl7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgbm90Um91dGVyLmdldEZ1bGxSb3V0ZShzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKTtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9Pntcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRub3RSb3V0ZXIubmF2aWdhdGUobm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdHNjb3BlLmVsZW1lbnQubm90Um91dGVySW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxufTtcbmV4cG9ydCBkZWZhdWx0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYjtcbiIsImltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi4vbm90UmVjb3JkJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYID0gJ2Zvcm1fJyxcblx0T1BUX0RFRkFVTFRfUk9MRV9OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9GT1JNX1RJVExFID0gJ0Zvcm0gZGVmYXVsdCB0aXRsZScsXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04gPSB7XG5cblx0fSxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QgPSBbJ29wdGlvbnMnLCAnbWFuaWZlc3QnLCAnYXBwJ107XG5cbmNsYXNzIG5vdEZvcm0gZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3ByZWZpeCcsIE9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnRzJywgW10pO1xuXHRcdGlmICghdGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuc2V0RGF0YShuZXcgbm90UmVjb3JkKHt9LCB0aGlzLmdldERhdGEoKSkpO1xuXHRcdH1cblx0XHR0aGlzLm9uKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ3Jlc2V0JywgdGhpcy5vblJlc2V0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NhbmNlbCcsIHRoaXMub25DYW5jZWwuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YSgpIHtcblx0XHRsZXQgbWFuaWZlc3QgPSB0aGlzLmdldE1hbmlmZXN0KCk7XG5cdFx0aWYgKG1hbmlmZXN0ICYmIG1hbmlmZXN0LmFjdGlvbnMpIHtcblx0XHRcdHJldHVybiBtYW5pZmVzdC5hY3Rpb25zLmhhc093blByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJykpID8gbWFuaWZlc3QuYWN0aW9uc1t0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpXSA6IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGdldEZvcm1GaWVsZHNMaXN0KCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCksXG5cdFx0XHRsaXN0ID0gW10sXG5cdFx0XHRyb2xlID0gdGhpcy5nZXRPcHRpb25zKCdyb2xlJywgT1BUX0RFRkFVTFRfUk9MRV9OQU1FKTtcblx0XHRpZiAoYWN0aW9uRGF0YSkge1xuXG5cdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMpIHtcblx0XHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzLmhhc093blByb3BlcnR5KHJvbGUpKSB7XG5cdFx0XHRcdFx0bGlzdCA9IGFjdGlvbkRhdGEuZmllbGRzW3JvbGVdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0Lypcblx0XHRSZW5kZXJpbmdcblx0Ki9cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdH1cblxuXHRnZXRQYXJ0VGVtcGxhdGVOYW1lKGZvcm1QYXJ0KXtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIGZvcm1QYXJ0O1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaW5wdXQgPSB7XG5cdFx0XHRcdGRhdGE6IHRoaXMuZ2V0V3JhcHBlckRhdGEoKSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoJ3dyYXBwZXInKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpLFxuXHRcdFx0XHRcdGlkOiB0aGlzLmdldE9wdGlvbnMoJ2lkJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgdGhpcy5iaW5kRm9ybUV2ZW50cy5iaW5kKHRoaXMpXSxcblx0XHRcdFx0XHRbWydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fTtcblx0XHRcdGxldCB3cmFwcGVyID0gbmV3IG5vdENvbXBvbmVudChpbnB1dCk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3dyYXBwZXInLCB3cmFwcGVyKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXcmFwcGVyRGF0YSgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpO1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogYWN0aW9uRGF0YS50aXRsZSA/IGFjdGlvbkRhdGEudGl0bGUgOiBPUFRfREVGQVVMVF9GT1JNX1RJVExFXG5cdFx0fTtcblx0fVxuXG5cdHJlbmRlckNvbXBvbmVudHMoKSB7XG5cblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykgJiYgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoKXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRsZXQgZmllbGROYW1lID0gdGhpcy5nZXRGb3JtRmllbGRzTGlzdCgpW3RdO1xuXHRcdFx0XHR0aGlzLmFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xlYXJGaWVsZHNDb21wb25lbnRzKCkge1xuXHRcdGxldCBjb21wcyA9IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpO1xuXHRcdHdoaWxlIChjb21wcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb21wc1swXS5jb21wb25lbnQuZGVzdHJveSgpO1xuXHRcdFx0Y29tcHMuc3BsaWNlKDAsIDEpO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpYnMoKXtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0b3B0aW9uczoge30sXG5cdFx0XHRtYW5pZmVzdDoge30sXG5cdFx0XHRhcHA6IHt9LFxuXHRcdH07XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJykpIHtcblx0XHRcdHJlc3VsdC5vcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKG5vdENvbW1vbi5nZXRBcHAoKSAmJiBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJykpe1xuXHRcdFx0cmVzdWx0LmFwcCA9IG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkICYmIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkpe1xuXHRcdFx0cmVzdWx0Lm1hbmlmZXN0ID0gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKS5maWVsZHM7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSkge1xuXHRcdGxldCBkZWYgPSBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OLFxuXHRcdFx0ZmllbGRzTGlicyA9IHRoaXMuZ2V0RmllbGRzTGlicygpO1xuXHRcdGZvcihsZXQgdCBvZiBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCl7XG5cdFx0XHRpZiAoZmllbGRzTGlicy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBmaWVsZHNMaWJzW3RdLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpe1xuXHRcdFx0XHRyZXR1cm4gZmllbGRzTGlic1t0XVtmaWVsZE5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0YWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKSB7XG5cdFx0bGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpO1xuXHRcdGxldCByZWMgPSB7XG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRuYW1lOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHRpdGxlOiBmaWVsZFR5cGUubGFiZWwgfHwgZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHR0eXBlOiBmaWVsZFR5cGUudHlwZSxcblx0XHRcdFx0bGFiZWw6IGZpZWxkVHlwZS5sYWJlbCxcblx0XHRcdFx0YXJyYXk6IGZpZWxkVHlwZS5hcnJheSxcblx0XHRcdFx0ZGVmYXVsdDogZmllbGRUeXBlLmRlZmF1bHQsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ2hlbHBlcnMnLCdsaWJzJyxmaWVsZE5hbWUpKVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0bGV0IGhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdGlzQ2hlY2tlZDogKHBhcmFtcyk9Pntcblx0XHRcdFx0cmV0dXJuIHBhcmFtcy5pdGVtLnZhbHVlID09PSB0aGlzLmdldERhdGEoZmllbGROYW1lKTtcblx0XHRcdH0sXG5cdFx0XHRmaWVsZDogcmVjLmZpZWxkLFxuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKClcblxuXHRcdH0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblx0XHRyZWMuY29tcG9uZW50ID0gbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZShmaWVsZFR5cGUudHlwZSlcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldEZvcm1UYXJnZXRFbGVtZW50KGZpZWxkVHlwZS50YXJnZXQpLFxuXHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUxhc3QnLFxuXHRcdFx0XHRldmVudHM6W1xuXHRcdFx0XHRcdFsnYWZ0ZXJEYXRhQ2hhbmdlJywgdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5wdXNoKHJlYyk7XG5cdH1cblxuXHRjb2xsZWN0RGF0YUZyb21Db21wb25lbnRzKHBhcmFtcyl7XG5cdFx0bm90Q29tbW9uLmxvZygnY29sbGVjdCBkYXRhIGZyb20gY29tcG9uZW50cycsIHBhcmFtcyk7XG5cdH1cblxuXHRnZXRGb3JtVGFyZ2V0RWxlbWVudCh0YXJnZXQgPSAnYm9keScpe1xuXHRcdGlmICghdGFyZ2V0KXt0YXJnZXQgPSAnYm9keSc7fVxuXHRcdGxldCByZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdGlmICghcmVzICYmIHRhcmdldCE9PSdib2R5Jyl7XG5cdFx0XHR0YXJnZXQgPSAnYm9keSc7XG5cdFx0XHRyZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdH1cblx0XHRpZighcmVzICYmIHRhcmdldD09J2JvZHknKXtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gcmVzO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0RGF0YSBtYW5hZ2VtZW50XG5cdCovXG5cblx0Y29sbGVjdERhdGEoKSB7XG5cdFx0bGV0IGRhdGEgPSB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKVxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCkge1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpIHtcblxuXHR9XG5cblx0b25SZXNldCgpIHtcblxuXHR9XG5cblx0Z2V0RmllbGRzKCkge1xuXG5cdH1cblxuXHRhZGRGaWVsZCgpIHtcblxuXHR9XG5cblx0cmVtb3ZlRmllbGQoKSB7XG5cblx0fVxuXG5cdGJpbmRGb3JtRXZlbnRzKCl7XG5cdFx0bGV0IGZvcm0gPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXHRcdGlmKGZvcm0pe1xuXHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Rm9ybTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX1BBR0VfU0laRSA9IDIwLFxuXHRPUFRfREVGQVVMVF9QQUdFX05VTUJFUiA9IDEwLFxuXHRPUFRfRklFTERfTkFNRV9QUkVfUFJPQyA9ICdwcmVwcm9jZXNzb3InO1xuXG5jbGFzcyBub3RUYWJsZSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudCcpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgY29tcG9uZW50ID0gbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6ICd0YWJsZV93cmFwcGVyJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0cmVuZGVyQW5kOiB0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckluc2lkZS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHRdXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgY29tcG9uZW50KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJJbnNpZGUoKSB7XG5cdFx0dGhpcy5yZW5kZXJIZWFkZXIoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0XHR0aGlzLnJlbmRlckJvZHkoKTtcblx0XHR0aGlzLmJpbmRTZWFyY2goKTtcblx0XHR0aGlzLmJpbmRDdXN0b21CaW5kaW5ncygpO1xuXHR9XG5cblx0cmVuZGVySGVhZGVyKCkge1xuXHRcdHZhciB0YWJsZUhlYWRlciA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCd0aGVhZCB0cicpO1xuXHRcdGlmICghdGFibGVIZWFkZXIpIHJldHVybjtcblx0XHRsZXQgZmllbGRzID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG5ld1RoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEgnKTtcblx0XHRcdG5ld1RoLmlubmVySFRNTCA9IGZpZWxkc1tpXS50aXRsZTtcblx0XHRcdG5ld1RoLmRhdGFzZXQuZGF0YUZpZWxkTmFtZSA9IGZpZWxkc1tpXS5wYXRoO1xuXHRcdFx0bmV3VGguZGF0YXNldC5zb3J0aW5nRGlyZWN0aW9uID0gMDtcblx0XHRcdGlmIChmaWVsZHNbaV0uaGFzT3duUHJvcGVydHkoJ3NvcnRhYmxlJykgJiYgZmllbGRzW2ldLnNvcnRhYmxlKSB7XG5cdFx0XHRcdHRoaXMuYXR0YWNoU29ydGluZ0hhbmRsZXJzKG5ld1RoKTtcblx0XHRcdH1cblx0XHRcdHRhYmxlSGVhZGVyLmFwcGVuZENoaWxkKG5ld1RoKTtcblx0XHR9XG5cdH1cblxuXHRhdHRhY2hTb3J0aW5nSGFuZGxlcnMoaGVhZENlbGwpIHtcblx0XHRoZWFkQ2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLmNoYW5nZVNvcnRpbmdPcHRpb25zKGUuY3VycmVudFRhcmdldCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdFx0aGVhZENlbGwuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHR9XG5cblx0Y2hhbmdlU29ydGluZ09wdGlvbnMoZWwpIHtcblx0XHRpZiAocGFyc2VJbnQoZWwuZGF0YXNldC5zb3J0aW5nRGlyZWN0aW9uKSA9PT0gMCkge1xuXHRcdFx0ZWwuZGF0YXNldC5zb3J0aW5nRGlyZWN0aW9uID0gMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwuZGF0YXNldC5zb3J0aW5nRGlyZWN0aW9uID0gcGFyc2VJbnQoZWwuZGF0YXNldC5zb3J0aW5nRGlyZWN0aW9uKSAqIC0xO1xuXHRcdH1cblx0XHRpZiAoZWwucGFyZW50Tm9kZSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbC5wYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldID09PSBlbCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19hc2MnKTtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHBhcnNlSW50KGVsLmRhdGFzZXQuc29ydGluZ0RpcmVjdGlvbikgPiAwKSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdhc2NlbmRpbmcnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnZGVzY2VuZGluZycpO1xuXHRcdH1cblx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRzb3J0RGlyZWN0aW9uOiBlbC5kYXRhc2V0LnNvcnRpbmdEaXJlY3Rpb24sXG5cdFx0XHRzb3J0QnlGaWVsZDogZWwuZGF0YXNldC5kYXRhRmllbGROYW1lXG5cdFx0fSk7XG5cdH1cblxuXHRzZXRTb3J0ZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnc29ydGVyJywgaGFzaCk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlRGF0YSgpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3NvcnRlcicpO1xuXHR9XG5cblx0Z2V0RmlsdGVyU2VhcmNoKCkge1xuXHRcdHJldHVybiAodHlwZW9mIHRoaXMuZ2V0RmlsdGVyKCkgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0RmlsdGVyKCkgIT09IG51bGwgJiYgdHlwZW9mIHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaCAhPT0gbnVsbCkgPyB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaC50b1N0cmluZygpIDogJyc7XG5cdH1cblxuXHRpbnZhbGlkYXRlRGF0YSgpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdsaXZlTG9hZCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnb25lUGFnZXInKSkge1xuXHRcdFx0d2hpbGUodGhpcy5nZXREYXRhKCdyb3dzJykubGVuZ3RoPjApe1xuXHRcdFx0XHR0aGlzLmdldERhdGEoJ3Jvd3MnKS5wb3AoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMucmVzZXRQYWdlcigpO1xuXHRcdH1cblx0fVxuXG5cdHNldEZpbHRlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXInLCBoYXNoKTtcblx0XHR0aGlzLmludmFsaWRhdGVEYXRhKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyJyk7XG5cdH1cblxuXHRzZXRQYWdlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdwYWdlcicsIGhhc2gpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3BhZ2VyJywge1xuXHRcdFx0cGFnZVNpemU6IHRoaXMuZ2V0T3B0aW9ucygncGFnZVNpemUnKSA/IHRoaXMuZ2V0T3B0aW9ucygncGFnZVNpemUnKSA6IE9QVF9ERUZBVUxUX1BBR0VfU0laRSxcblx0XHRcdHBhZ2VOdW1iZXI6IHRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpID8gdGhpcy5nZXRPcHRpb25zKCdwYWdlTnVtYmVyJykgOiBPUFRfREVGQVVMVF9QQUdFX05VTUJFUixcblx0XHR9KTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJyk7XG5cdH1cblxuXHRzZXRVcGRhdGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwZGF0aW5nJywgdHJ1ZSk7XG5cdH1cblxuXHRzZXRVcGRhdGVkKCkge1xuXHRcdHRoaXMuZ2V0V29ya2luZygndXBkYXRpbmcnLCBmYWxzZSk7XG5cdH1cblxuXHRpZlVwZGF0aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3VwZGF0aW5nJyk7XG5cdH1cblxuXHR1cGRhdGVEYXRhKCkge1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2xpdmVMb2FkJykgJiYgdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2UnKSkge1xuXHRcdFx0aWYgKHRoaXMuaWZVcGRhdGluZygpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vbG9hZCBmcm9tIHNlcnZlclxuXHRcdFx0bGV0IHF1ZXJ5ID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2UnKSh7fSkuc2V0RmlsdGVyKHRoaXMuZ2V0RmlsdGVyKCkpLnNldFNvcnRlcih0aGlzLmdldFNvcnRlcigpKS5zZXRQYWdlcih0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUsIHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyKTtcblx0XHRcdHRoaXMuc2V0VXBkYXRpbmcoKTtcblx0XHRcdHF1ZXJ5LiRsaXN0KClcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnJGxpc3QgZm9yIHRhYmxlJywgZGF0YSk7XG5cdFx0XHRcdFx0dGhpcy5nZXREYXRhKCdyb3dzJykuY29uY2F0KGRhdGEpO1xuXHRcdFx0XHRcdHRoaXMucHJvY2Nlc3NEYXRhKCk7XG5cdFx0XHRcdFx0dGhpcy5yZWZyZXNoQm9keSgpO1xuXHRcdFx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9sb2NhbCBtYWdpY1xuXHRcdFx0dGhpcy5wcm9jY2Vzc0RhdGEoKTtcblx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHR9XG5cdH1cblxuXHRwcm9jY2Vzc0RhdGEoKSB7XG5cdFx0dmFyIHRoYXRGaWx0ZXIgPSB0aGlzLmdldEZpbHRlcigpO1xuXHRcdGlmICh0eXBlb2YgdGhhdEZpbHRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdEZpbHRlciAhPT0gbnVsbCAmJiB0eXBlb2YgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2ggIT09ICd1bmRlZmluZWQnICYmIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoICE9PSBudWxsICYmIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoLmxlbmd0aCA+IDApIHtcblx0XHRcdC8vXG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIHRoaXMuZ2V0RGF0YSgncm93cycpLmZpbHRlcih0aGlzLnRlc3REYXRhSXRlbS5iaW5kKHRoaXMpKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgdGhpcy5nZXREYXRhKCdyb3dzJykpO1xuXHRcdH1cblx0XHQvLy8vc29ydGVyXG5cdFx0dmFyIHRoYXRTb3J0ZXIgPSB0aGlzLmdldFNvcnRlcigpO1xuXHRcdGlmICh0eXBlb2YgdGhhdFNvcnRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdFNvcnRlciAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5zb3J0KChpdGVtMSwgaXRlbTIpID0+IHtcblx0XHRcdFx0aWYgKGlzTmFOKG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsIGl0ZW0xLCB7fSkpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsIGl0ZW0xLCB7fSkubG9jYWxlQ29tcGFyZShub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLGl0ZW0yLHt9KSkgKiAtdGhhdFNvcnRlci5zb3J0RGlyZWN0aW9uO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiAoKG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsIGl0ZW0xLCB7fSkgPCBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLCBpdGVtMiwge30pKSA/IDEgOiAtMSkgKiB0aGF0U29ydGVyLnNvcnREaXJlY3Rpb247XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGJpbmRTZWFyY2goKSB7XG5cdFx0dmFyIHNlYXJjaEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJzZWFyY2hcIl0nKVswXTtcblx0XHRpZiAoIXNlYXJjaEVsKSByZXR1cm47XG5cdFx0dmFyIG9uRXZlbnQgPSAoZSkgPT4ge1xuXHRcdFx0dGhpcy5zZXRGaWx0ZXIoe1xuXHRcdFx0XHRmaWx0ZXJTZWFyY2g6IGUuY3VycmVudFRhcmdldC52YWx1ZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXHRcdHNlYXJjaEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25FdmVudCk7XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcignZW50ZXInLCBvbkV2ZW50KTtcblx0fVxuXG5cblx0YmluZEN1c3RvbUJpbmRpbmdzKCkge1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpIHx8ICF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Zm9yICh2YXIgc2VsZWN0b3IgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpKSB7XG5cdFx0XHR2YXIgZWxzID0gdGhpcy5nZXRPcHRpb24oJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRmb3IgKHZhciBlbElkID0gMDsgZWxJZCA8IGVscy5sZW5ndGg7IGVsSWQrKykge1xuXHRcdFx0XHR2YXIgZWwgPSBlbHNbZWxJZF07XG5cdFx0XHRcdGZvciAodmFyIGV2ZW50IGluIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl0pIHtcblx0XHRcdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJylbc2VsZWN0b3JdW2V2ZW50XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRsb2FkTmV4dCgpIHtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJykucGFnZU51bWJlcisrO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVuZGVyUm93KGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG5ld1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RSJyksXG5cdFx0XHRmaWVsZHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgbmV3VGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdURCcpLFxuXHRcdFx0XHRmaWVsZCA9IGZpZWxkc1tpXSxcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gbnVsbCxcblx0XHRcdFx0dmFsID0gbm90UGF0aC5nZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdlZGl0YWJsZScpICYmICFmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnY29tcG9uZW50JykpIHtcblx0XHRcdFx0bmV3VGQuc2V0QXR0cmlidXRlKCdjb250ZW50RWRpdGFibGUnLCB0cnVlKTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC5wYXRoID0gZmllbGQucGF0aDtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC5pdGVtSWQgPSBpdGVtW3RoaXMuZ2V0T3B0aW9ucygnaXRlbUlkRmllbGQnKV07XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQudmFsdWUgPSB2YWw7XG5cdFx0XHRcdG5ld1RkLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZSk9Pntcblx0XHRcdFx0XHRub3RQYXRoLnNldChmaWVsZC5wYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSwgbmV3VGQudGV4dENvbnRlbnQpO1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eShPUFRfRklFTERfTkFNRV9QUkVfUFJPQykpIHtcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gZmllbGRbT1BUX0ZJRUxEX05BTUVfUFJFX1BST0NdKHZhbCwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdjb21wb25lbnQnKSkge1xuXHRcdFx0XHRuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0XHRkYXRhOiBmaWVsZC5jb21wb25lbnQuZGF0YSB8fCBwcmVwcm9jZXNzZWQgfHwge3ZhbCwgaXRlbSwgaW5kZXh9LFxuXHRcdFx0XHRcdHRlbXBsYXRlOiBmaWVsZC5jb21wb25lbnQudGVtcGxhdGUsXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IG5ld1RkLFxuXHRcdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogZmllbGQuY29tcG9uZW50LmV2ZW50cyB8fCBbXVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ld1RkLmlubmVySFRNTCA9IHByZXByb2Nlc3NlZCB8fCB2YWw7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2V2ZW50cycpICYmIGZpZWxkLmV2ZW50cykge1xuXHRcdFx0XHRmb3IgKHZhciBqIGluIGZpZWxkLmV2ZW50cykge1xuXHRcdFx0XHRcdG5ld1RkLmFkZEV2ZW50TGlzdGVuZXIoaiwgKGUpPT57XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmllbGQuZXZlbnRzW2pdKHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQ6IGUsXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQ6IG5ld1RkLFxuXHRcdFx0XHRcdFx0XHRpdGVtOiBpdGVtLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdmFsLFxuXHRcdFx0XHRcdFx0XHRmaWVsZDogZmllbGRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bmV3Um93LmFwcGVuZENoaWxkKG5ld1RkKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygncHJvY1JvdycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcm9jUm93JykobmV3Um93LCBpdGVtKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Jvdztcblx0fVxuXG5cdHJlZnJlc2hCb2R5KCkge1xuXHRcdHZhciB0Ym9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRib2R5KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuY2xlYXJCb2R5KCk7XG5cdFx0dmFyIHRoaXNQYWdlU3RhcnRzID0gMCxcblx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpO1xuXHRcdGZvciAodmFyIGkgPSB0aGlzUGFnZVN0YXJ0czsgaSA8IE1hdGgubWluKG5leHRQYWdlRW5kcywgdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5sZW5ndGgpOyBpKyspIHtcblx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHR9XG5cdH1cblxuXHRmaW5kQm9keSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG5cdH1cblxuXHRjbGVhckJvZHkoKSB7XG5cdFx0dmFyIHRhYmxlQm9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRhYmxlQm9keSkgcmV0dXJuO1xuXHRcdHRhYmxlQm9keS5pbm5lckhUTUwgPSAnJztcblx0fVxuXG5cdHJlbmRlckJvZHkoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ29uZVBhZ2VyJykpIHtcblx0XHRcdHRoaXMuY2xlYXJCb2R5KCk7XG5cdFx0fVxuXHRcdHZhciB0aGlzUGFnZVN0YXJ0cyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciksXG5cdFx0XHRuZXh0UGFnZUVuZHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIgKyAxKSxcblx0XHRcdHRib2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXHRcdGZvciAodmFyIGkgPSB0aGlzUGFnZVN0YXJ0czsgaSA8IE1hdGgubWluKG5leHRQYWdlRW5kcywgdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5sZW5ndGgpOyBpKyspIHtcblx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHR9XG5cdH1cblxuXHR0ZXN0RGF0YUl0ZW0oaXRlbSl7XG5cdCAgICB2YXIgc3RyVmFsdWUgPSB0aGlzLmdldEZpbHRlclNlYXJjaCgpLnRvTG93ZXJDYXNlKCk7XG5cdCAgICBmb3IodmFyIGsgaW4gaXRlbSl7XG5cdCAgICAgICAgdmFyIHRvQ29tcCA9IGl0ZW1ba10udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuXHQgICAgICAgIGlmICh0b0NvbXAuaW5kZXhPZihzdHJWYWx1ZSk+LTEpe1xuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RUYWJsZTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuLy9pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbi8vaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jbGFzcyBub3RWaWV3IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoaW5wdXQub3B0aW9ucyB8fCB7fSk7XG5cdFx0dGhpcy5zZXREYXRhKGlucHV0LmRhdGEgfHwge30pO1xuXHRcdHRoaXMuc2V0V29ya2luZyhpbnB1dC53b3JraW5nIHx8IHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFZpZXc7XG4iLCIvKlxuXHRDb21tb24gZnVuY3Rpb25zXG4qL1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG4vKlxuXHRmcmFtZXdvcmsgd2lkZSBwYXJzZXIgZm9yIGRhdGEgYWNjZXNzXG4qL1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuXG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcbi8qXG5cdGJhc2ljIGV2ZW50IGhhbmRsZXJzIGFuZCBjb3JlIGRhdGEgbW9kaWZpZXJzXG4qL1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbi8qXG5cdHNtYXJ0ZXIgaW1hZ2UgY29udHJvbFxuKi9cbmltcG9ydCBub3RJbWFnZSBmcm9tICcuL3RlbXBsYXRlL25vdEltYWdlJztcbi8qXG5cdGFwcGxpY2F0aW9uIG1haW4gaW5mcmFzdHJ1Y3R1cmUgc2V0dGVyXG4qL1xuaW1wb3J0IG5vdEFwcCBmcm9tICcuL25vdEFwcCc7XG4vKlxuXHRkYWRkeSBmb3IgdXNlciBjb250cm9sbGVyc1xuKi9cbmltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4vbm90Q29udHJvbGxlcic7XG4vKlxuXHR0ZW1wbGF0aW5nIGFuZCBjb21tb24gc3RydWN0dXJlc1xuKi9cblxuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vdGVtcGxhdGUvbm90UmVuZGVyZXInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JzsgLy8gc21hcnRlciB3aXRoIGJpbmRpbmdzIGZvciBldmVudHMsIGFjdHVhbHkgcHJveHlcblxuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi9jb21wb25lbnRzL25vdEZvcm0nO1xuaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4vY29tcG9uZW50cy9ub3RUYWJsZSc7XG5pbXBvcnQgbm90VmlldyBmcm9tICcuL2NvbXBvbmVudHMvbm90Vmlldyc7XG5cbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnOyAvL1x0aG93IHRvIGludGVyYWN0IHdpdGggZGF0YSBvbiBzZXJ2ZXJcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnOyAvL1x0d3JhcHBlciBmb3IgZGF0YSB3aXRoIHNlcnZlcjwtPnZpZXcgbGl2ZSBpbnRlcmFjdGlvbnNcblxubm90VGVtcGxhdGVQcm9jZXNzb3JzLmFkZChub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIpO1xuXG5leHBvcnQge1xuXHRub3RDb21tb24sXG5cdG5vdFBhdGgsXG5cdG5vdEJhc2UsXG5cdG5vdEltYWdlLFxuXHRub3RBcHAsXG5cdG5vdEFQSSxcblx0bm90Q29udHJvbGxlcixcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIsXG5cdG5vdFRlbXBsYXRlQ2FjaGUsXG5cdG5vdFJlbmRlcmVyLFxuXHRub3RDb21wb25lbnQsXG5cdG5vdEZvcm0sXG5cdG5vdFJvdXRlcixcblx0bm90VGFibGUsXG5cdG5vdFZpZXcsXG5cdG5vdFJlY29yZCxcblx0bm90UmVjb3JkSW50ZXJmYWNlXG59O1xuIl0sIm5hbWVzIjpbIkNvbW1vbk5ldHdvcmsiLCJ1cmkiLCJnZXQiLCJkYXRhQXJyYXkiLCJmaWVsZHMiLCJpIiwiZiIsImhhc093blByb3BlcnR5IiwiaW1hZ2UiLCJJbWFnZSIsInNldEF0dHJpYnV0ZSIsInNyYyIsImluZGV4T2YiLCJhZGRQcm90b2NvbCIsIm1ldGhvZCIsInVybCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJnZXRTZXNzaW9uSUQiLCJyZXNwb25zZVR5cGUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJvbmxvYWQiLCJzdGF0dXMiLCJyZXNwb25zZSIsInQiLCJvbmVycm9yIiwib250aW1lb3V0Iiwic2VuZCIsInBhcnNlSW50IiwicmVzcG9uc2VUZXh0IiwiZSIsIm5hbWUiLCJnZXRDb29raWUiLCJ2YWx1ZSIsImRvY3VtZW50IiwiY29va2llIiwicGFydHMiLCJzcGxpdCIsImxlbmd0aCIsInBvcCIsInNoaWZ0IiwiQ29tbW9uTG9ncyIsImxvZyIsImFyZ3VtZW50cyIsImVycm9yIiwidHJhY2UiLCJNQU5BR0VSIiwiU3ltYm9sIiwiQ29tbW9uU2hvcnRzIiwiZ2V0TWFuYWdlciIsImdldEFQSSIsInYiLCJDb21tb25PYmplY3RzIiwiZGVmYXVsdHMiLCJvcHRpb25zIiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiY2FsbCIsInRhcmdldCIsInNvdXJjZXMiLCJmb3JFYWNoIiwiZGVzY3JpcHRvcnMiLCJrZXlzIiwic291cmNlIiwicmVkdWNlIiwia2V5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZGVzY3JpcHRvciIsInN5bSIsImVudW1lcmFibGUiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiYmlnIiwic21hbGwiLCJvYmoiLCJmaWx0ZXIiLCJjb250YWluc09iaiIsImljb25zIiwiYmF0Y2giLCJnZXREYXRhIiwicHVzaCIsImEiLCJiIiwicCIsImVxdWFsIiwidG9TdHJpbmciLCJkZWZhdWx0VmFsdWUiLCJvYmoxIiwib2JqMiIsImpRdWVyeSIsImV4dGVuZCIsInZhbCIsInJlZ2lzdHJ5IiwiQ29tbW9uU3RyaW5ncyIsInN0cmluZyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsIkNvbW1vbkZ1bmN0aW9ucyIsImZ1bmNzIiwicmVzdWx0IiwiZnVuYyIsIkNvbW1vbkRPTSIsImVsIiwic3RhcnRzV2l0aCIsImFsbEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImxpc3QiLCJqIiwiYXR0cyIsImF0dHJpYnV0ZXMiLCJuIiwibm9kZU5hbWUiLCJDb21tb25BcHAiLCJzdGFydGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm5vdENvbW1vbiIsImFzc2lnbiIsImV4dGVuZFdpdGgiLCJTVUJfUEFUSF9TVEFSVCIsIlNVQl9QQVRIX0VORCIsIlBBVEhfU1BMSVQiLCJQQVRIX1NUQVJUX09CSkVDVCIsIlBBVEhfU1RBUlRfSEVMUEVSUyIsIkZVTkNUSU9OX01BUktFUiIsIk1BWF9ERUVQIiwibm90UGF0aCIsInBhdGgiLCJzdWJQYXRoIiwiZmluZCIsInN1YiIsInBhcnNlZCIsInN1YmYiLCJyZXBsYWNlIiwiaXRlbSIsImhlbHBlcnMiLCJzdWJQYXRoUGFyc2VkIiwiZmluZE5leHRTdWJQYXRoIiwiZ2V0VmFsdWVCeVBhdGgiLCJyZXBsYWNlU3ViUGF0aCIsInBhcnNlU3VicyIsImF0dHJWYWx1ZSIsInNldFZhbHVlQnlQYXRoIiwiaXNSZWNvcmQiLCJub3JtaWxpemVQYXRoIiwidHJpZ2dlciIsInNldCIsInN0ZXAiLCJoZWxwZXIiLCJyU3RlcCIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsInBhcnNlUGF0aFN0ZXAiLCJvYmplY3QiLCJhdHRyUGF0aCIsImF0dHJOYW1lIiwiaXNGdW5jdGlvbiIsIm5ld09iaiIsImFyZ3MiLCJqb2luIiwiTUVUQV9NRVRIT0RfSU5JVCIsIk1FVEFfRVZFTlRTIiwiTUVUQV9EQVRBIiwiTUVUQV9XT1JLSU5HIiwiTUVUQV9PUFRJT05TIiwibm90QmFzZSIsImlucHV0IiwiZXZlbnRzIiwib24iLCJzZXREYXRhIiwic2V0V29ya2luZyIsIndvcmtpbmciLCJzZXRPcHRpb25zIiwid2hhdCIsInJlcyIsInNldENvbW1vbiIsImdldENvbW1vbiIsImdldE9wdGlvbnMiLCJnZXRXb3JraW5nIiwiZXZlbnROYW1lcyIsImV2ZW50Q2FsbGJhY2tzIiwib25jZSIsImRlZmluZUlmTm90RXhpc3RzIiwiZnJvbSIsImV2ZW50TmFtZSIsImV2ZW50Iiwib2ZmIiwiY2FsbGJhY2tzIiwiY2FsbGJhY2siLCJ0YXJnZXRJZCIsInNwbGljZSIsIk9QVF9NT0RFX0hJU1RPUlkiLCJPUFRfTU9ERV9IQVNIIiwiT1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwiLCJub3RSb3V0ZXIiLCJyb290IiwiY2xlYXJTbGFzaGVzIiwicmUiLCJoYW5kbGVyIiwicnVsZSIsImFkZCIsInBhcmFtIiwiciIsImZyYWdtZW50IiwibG9jYXRpb24iLCJkZWNvZGVVUkkiLCJwYXRobmFtZSIsInNlYXJjaCIsIndpbmRvdyIsIm1hdGNoIiwiaHJlZiIsImN1cnJlbnQiLCJnZXRGcmFnbWVudCIsImluaXQiLCJpc0luaXRpYWxpemVkIiwiY2hlY2siLCJzZXRJbml0aWFsaXplZCIsImxvb3BJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2hlY2tMb2NhdGlvbiIsImJpbmQiLCJocmVmQ2xpY2siLCJmdWxsUkUiLCJhcHBseSIsImhvc3QiLCJnZXRGdWxsUm91dGUiLCJwdXNoU3RhdGUiLCJub3RBUElPcHRpb25zIiwibm90QVBJUXVlZSIsInJlcXVlc3RzUGVyU2Vjb25kIiwicXVlZSIsImludCIsImluUHJvZ3Jlc3MiLCJ0b0NhbGwiLCJjbGVhckludGVydmFsIiwicnVuIiwibm90QVBJIiwiaWQiLCJnb29kIiwiYmFkIiwibWFrZVJlcXVlc3QiLCJyZXNwb25zZU9LIiwicmVzcG9uc2VGYWlsZWQiLCJyZXF1ZXN0SlNPTiIsInRoZW4iLCJuZXh0IiwiY2F0Y2giLCJjb2RlIiwiZ2V0SWQiLCJtb2RlbE5hbWUiLCJnZXRNb2RlbE5hbWUiLCJtYWtlVXJsIiwiZ2V0SlNPTiIsImdldE1vZGVsIiwic2V0UHJpY2UiLCJtb2RlbCIsIm5vdEltYWdlIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYIiwiVEVNUExBVEVfVEFHIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgiLCJDT01QT05FTlRfSURfUFJFRklYIiwiUEFSVF9JRF9QUkVGSVgiLCJERUZBVUxUX1BMQUNFUiIsIkRFRkFVTFRfUExBQ0VSX0xPT1AiLCJPUFRTIiwiTUVUQV9DQUNIRSIsIm5vdFRlbXBsYXRlQ2FjaGUiLCJoaWRlVGVtcGxhdGVzIiwicmVnaXN0ZXIiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibWFwIiwibG9hZE9uZSIsIm9SZXF1ZXN0IiwiZGl2IiwiZGF0YXNldCIsIm5vdFRlbXBsYXRlTmFtZSIsIm5vdFRlbXBsYXRlVVJMIiwic3JjRWxlbWVudCIsInNldE9uZSIsImVsZW1lbnQiLCJjbG9uZU5vZGUiLCJjb250IiwidGV4dCIsIm5vdFRlbXBsYXRlc0VsZW1lbnRzIiwiZWxJZCIsInBhcmVudE5vZGUiLCJsaWIiLCJnZXRIVE1MIiwidGVtcGxhdGVJbm5lckhUTUwiLCJ0ZW1wbGF0ZUNvbnRFbCIsIndyYXAiLCJ0ZW1wbGF0ZXNIVE1MIiwidGVtcGxhdGVzIiwicGFyc2VMaWIiLCJhZGRMaWIiLCJzZWxlY3Rvck9yRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0YWdOYW1lIiwiT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSIsIm5vdEludGVyZmFjZSIsIm1hbmlmZXN0IiwibGluZSIsInJlY29yZCIsImFjdGlvbk5hbWUiLCJyZWNvcmRSRSIsImZpZWxkTmFtZSIsImluZCIsImxlbiIsImluZDIiLCJzdGFydFNsaWNlIiwiZW5kU2xpY2UiLCJnZXRBdHRyIiwiYWN0aW9uRGF0YSIsInBhcnNlTGluZSIsInBvc3RGaXgiLCJyZXN1bHRJZCIsImluZGV4IiwiY29uY2F0IiwiZ2V0QWN0aW9ucyIsImFjdGlvbnMiLCJzZXRGaWx0ZXIiLCJmaWx0ZXJEYXRhIiwic2V0TW9kZWxQYXJhbSIsImdldE1vZGVsUGFyYW0iLCJzb3J0ZXJEYXRhIiwicGFnZU51bWJlciIsInBhZ2VTaXplIiwicGFyYW1OYW1lIiwicGFyYW1WYWx1ZSIsImdldEFjdGlvbkRhdGEiLCJnZXRJRCIsImdldFVSTCIsInF1ZWVSZXF1ZXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsIm9uTG9hZCIsIm5vdFJlY29yZCIsIk1FVEFfSU5URVJGQUNFIiwiTUVUQV9QUk9YWSIsIk1FVEFfQ0hBTkdFIiwiTUVUQV9DSEFOR0VfTkVTVEVEIiwiTUVUQV9TQUwiLCJERUZBVUxUX0FDVElPTl9QUkVGSVgiLCJERUZBVUxUX1BBR0VfTlVNQkVSIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJNRVRBX1JFVFVSTl9UT19ST09UIiwiY3JlYXRlUHJvcGVydHlIYW5kbGVycyIsIm93bmVyIiwiY29udGV4dCIsInJlc1RhcmdldCIsIlJlZmxlY3QiLCJFcnJvciIsInZhbHVlVG9SZWZsZWN0Iiwibm90UHJvcGVydHkiLCJnZXRSb290IiwicGF0aFRvIiwiaXNQcm94eSIsImlzUHJvcGVydHkiLCJQcm94eSIsInByb3h5IiwiY3JlYXRlUmVjb3JkSGFuZGxlcnMiLCJjcmVhdGVDb2xsZWN0aW9uIiwibm90UmVjb3JkSW50ZXJmYWNlIiwiaW5pdFByb3BlcnRpZXMiLCJpbnRlcmZhY2VVcCIsImN1clBhdGgiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiaXRlbXMiLCJjb2xsZWN0aW9uIiwiZ2V0QWN0aW9uc0NvdW50IiwiYWN0aW9uVXAiLCJyZXF1ZXN0Iiwib2JqZWN0UGFydCIsInNldEF0dHIiLCJPUFRfQ09OVFJPTExFUl9QUkVGSVgiLCJPUFRfUkVDT1JEX1BSRUZJWCIsIm5vdEFwcCIsInJlc291cmNlcyIsInByZUluaXRSb3V0ZXIiLCJpbml0TWFuYWdlciIsImluaXRBUEkiLCJpbml0VGVtcGxhdGVzIiwic2V0TWFuYWdlciIsImFwaSIsInNldEFQSSIsInByb20iLCJhZGRMaWJGcm9tVVJMIiwiaW5pdE1hbmlmZXN0Iiwic2V0SW50ZXJmYWNlTWFuaWZlc3QiLCJyZXBvcnQiLCJzZXRSb290Iiwicm91dGllSW5wdXQiLCJyb3V0ZUJsb2NrIiwicGF0aHMiLCJjb250cm9sbGVyIiwiYmluZENvbnRyb2xsZXIiLCJhZGRMaXN0IiwibGlzdGVuIiwibmF2aWdhdGUiLCJ1cGRhdGUiLCJ1cGRhdGVJbnRlcmZhY2VzIiwiaW5pdENvbnRyb2xsZXIiLCJhbGxSZXNvdXJjZXNSZWFkeSIsInN0YXJ0QXBwIiwiaW5pdFJvdXRlciIsImNvbnRyb2xsZXJOYW1lIiwiYXBwIiwiY3RybCIsImNsZWFySW50ZXJmYWNlcyIsIm1hbmlmZXN0cyIsInJlY29yZE1hbmlmZXN0IiwicmVjb3JkRGF0YSIsImNhcGl0YWxpemVGaXJzdExldHRlciIsInR5cGUiLCJvblJlc291cmNlUmVhZHkiLCJNRVRBX1BST0NFU1NPUlMiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnMiLCJzZXRQcm9jZXNzb3IiLCJnZXRQcm9jZXNzb3IiLCJNRVRBX0NPTVBPTkVOVFMiLCJub3RSZW5kZXJlciIsInJlbmRlciIsImNvbXBvbmVudCIsImluaXREYXRhIiwiaW5pdE9wdGlvbnMiLCJpbml0V29ya2luZyIsInRlbXBsYXRlIiwiaW5pdFRlbXBsYXRlIiwib25DaGFuZ2UiLCJNYXRoIiwicmFuZG9tIiwiZ2V0QnJlYWRDcnVtcHMiLCJjbGVhclN0YXNoIiwic2V0V29ya2luZ01hcHBpbmciLCJleGVjUHJvY2Vzc29ycyIsInNlYXJjaEZvclN1YlRlbXBsYXRlcyIsInN0YXNoUmVuZGVyZWQiLCJpZlBhcnQiLCJjb21wb25lbnRQYXRoIiwiY2hhbmdlZFBhdGgiLCJpZkZ1bGxTdWJQYXRoIiwiY3JlYXRlTWFwcGluZyIsImZpbmRBbGxQcm9jZXNzb3JzIiwicHJvY3MiLCJlbHMiLCJnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCIsImdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQiLCJwcm9jRGF0YSIsInBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbiIsInByb2Nlc3NvckV4cHJlc3Npb24iLCJhdHRyaWJ1dGVFeHByZXNzaW9uIiwiaWZDb25kaXRpb24iLCJwYXJhbXMiLCJwcm9jZXNzb3JOYW1lIiwibWFwcGluZyIsInByb2NTY29wZSIsImF0dHJpYnV0ZVJlc3VsdCIsImdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQiLCJwcm9jTmFtZSIsInByb2MiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkZXN0cm95U3VicyIsImRlc3Ryb3kiLCJjbGVhclN1YlRlbXBsYXRlcyIsImdldFN0YXNoIiwicmVtb3ZlQ2hpbGQiLCJudEVsIiwibnRSZW5kZXJlZCIsInN1YnMiLCJudCIsImlmU3ViRWxlbWVudFJlbmRlcmVkIiwicmVuZGVyU3ViIiwiZGV0YWlscyIsImRhdGFQYXRoIiwibm90Q29tcG9uZW50IiwiY2hpbGROb2RlcyIsImFkZFRvU3Rhc2giLCJzdGFzaCIsIm5ld1N0YXNoIiwiYW5jaG9yIiwibmV4dFNpYmxpbmciLCJpbnNlcnRCZWZvcmUiLCJub2RlIiwicGxhY2UiLCJ0YXJnZXRFbCIsImwiLCJjaGlsZHJlbiIsInRleHRDb250ZW50IiwicmVuZGVyZWQiLCJwbGFjZUFmdGVyIiwicGxhY2VCZWZvcmUiLCJwbGFjZUZpcnN0IiwicGxhY2VMYXN0Iiwibm90UGxhY2VycyIsIk1FVEFfUEFSVFMiLCJyZXNldFBhcnRzIiwicHJlcGFyZVRlbXBsYXRlRWxlbWVudCIsImluaXRNYXJrRWxlbWVudCIsIm1hcmtFbCIsInBsYWNlciIsImdldFBsYWNlciIsInRhcmdldFF1ZXJ5IiwibWFpbiIsInVuc2V0UmVhZHkiLCJodG1sIiwic2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJhZGRGcm9tVVJMIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJjbGVhclBhcnRzIiwiZm9yRWFjaERhdGEiLCJyZW5kZXJQYXJ0IiwicGxhY2VSZW5kZXJlZCIsInJlbW92ZU9ic29sZXRlUGFydHMiLCJiZWZvcmUiLCJwbGFjZVBhcnQiLCJhZnRlciIsInBhcnQiLCJnZXRQYXJ0QnlEYXRhIiwibm9kZXMiLCJsYXN0Tm9kZSIsIm5vZGVUeXBlIiwiZ2V0UGFydHMiLCJyZW5kZXJlciIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUiLCJhZGRQYXJ0IiwidXBkYXRlUGFydCIsInBpcGUiLCJmaW5kQWN0dWFsUGFydHMiLCJyZW1vdmVOb3RBY3R1YWxQYXJ0cyIsImFjdHVhbFBhcnRzIiwiaXNEYXRhIiwiT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SIiwiT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCIsIk9QVF9ERUZBVUxUX1ZJRVdfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCIsIk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FIiwiT1BUX0RFRkFVTFRfU0lOR0xFX05BTUUiLCJPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9BTkQiLCJub3RDb250cm9sbGVyIiwiaW5pdFJlbmRlciIsImludGVyZmFjZXMiLCJnZXRJbnRlcmZhY2VzIiwibWFrZSIsInZpZXdOYW1lIiwidmlldyIsImdldFZpZXciLCJ0ZW1wbGF0ZVVSTCIsInByZWZpeCIsImNvbW1vbiIsImdldE1vZHVsZVByZWZpeCIsInBvc3RmaXgiLCJ0ZW1wbGF0ZU5hbWUiLCJyZW5kZXJBbmQiLCJ2aWV3cyIsImdldE1vZHVsZU5hbWUiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIiLCJzY29wZSIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0IiwibGl2ZUV2ZW50cyIsIm9uRXZlbnQiLCJjaGVja2VkIiwiZmllbGQiLCJzZWxlY3RlZCIsInNlbGVjdGVkT3B0aW9ucyIsInByb2Nlc3NlZFZhbHVlIiwiaXNOYU4iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ1c2VkIiwib3B0aW9uIiwidmFsdWVGaWVsZE5hbWUiLCJsYWJlbEZpZWxkTmFtZSIsIml0ZW1WYWx1ZUZpZWxkTmFtZSIsImRlZmF1bHQiLCJwbGFjZWhvbGRlciIsImFycmF5Iiwibm90Um91dGVySW5pdGlhbGl6ZWQiLCJPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCIsIk9QVF9ERUZBVUxUX1JPTEVfTkFNRSIsIk9QVF9ERUZBVUxUX0ZPUk1fVElUTEUiLCJPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QiLCJub3RGb3JtIiwib25TdWJtaXQiLCJvblJlc2V0Iiwib25DYW5jZWwiLCJnZXRNYW5pZmVzdCIsInJvbGUiLCJyZW5kZXJXcmFwcGVyIiwiZm9ybVBhcnQiLCJnZXRXcmFwcGVyRGF0YSIsImdldFBhcnRUZW1wbGF0ZU5hbWUiLCJiaW5kRm9ybUV2ZW50cyIsInJlbmRlckNvbXBvbmVudHMiLCJ3cmFwcGVyIiwidGl0bGUiLCJnZXRGb3JtRmllbGRzTGlzdCIsImFkZEZpZWxkQ29tcG9uZW50IiwiY29tcHMiLCJnZXRBcHAiLCJkZWYiLCJmaWVsZHNMaWJzIiwiZ2V0RmllbGRzTGlicyIsImZpZWxkVHlwZSIsImdldEZpZWxkc0RlZmluaXRpb24iLCJyZWMiLCJsYWJlbCIsImdldEZvcm1UYXJnZXRFbGVtZW50IiwiY29sbGVjdERhdGFGcm9tQ29tcG9uZW50cyIsImZvcm0iLCJPUFRfREVGQVVMVF9QQUdFX1NJWkUiLCJPUFRfREVGQVVMVF9QQUdFX05VTUJFUiIsIk9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DIiwibm90VGFibGUiLCJyZXNldFBhZ2VyIiwicmVuZGVySW5zaWRlIiwicmVuZGVySGVhZGVyIiwidXBkYXRlRGF0YSIsInJlbmRlckJvZHkiLCJiaW5kU2VhcmNoIiwiYmluZEN1c3RvbUJpbmRpbmdzIiwidGFibGVIZWFkZXIiLCJuZXdUaCIsImRhdGFGaWVsZE5hbWUiLCJzb3J0aW5nRGlyZWN0aW9uIiwic29ydGFibGUiLCJhdHRhY2hTb3J0aW5nSGFuZGxlcnMiLCJoZWFkQ2VsbCIsImNoYW5nZVNvcnRpbmdPcHRpb25zIiwiY3VycmVudFRhcmdldCIsInN0eWxlIiwiY3Vyc29yIiwic2V0U29ydGVyIiwiaGFzaCIsImludmFsaWRhdGVEYXRhIiwiZ2V0RmlsdGVyIiwiZmlsdGVyU2VhcmNoIiwiaWZVcGRhdGluZyIsInF1ZXJ5IiwiZ2V0U29ydGVyIiwic2V0UGFnZXIiLCJnZXRQYWdlciIsInNldFVwZGF0aW5nIiwiJGxpc3QiLCJwcm9jY2Vzc0RhdGEiLCJyZWZyZXNoQm9keSIsInNldFVwZGF0ZWQiLCJ0aGF0RmlsdGVyIiwidGVzdERhdGFJdGVtIiwidGhhdFNvcnRlciIsInNvcnQiLCJpdGVtMSIsIml0ZW0yIiwic29ydEJ5RmllbGQiLCJsb2NhbGVDb21wYXJlIiwic29ydERpcmVjdGlvbiIsInNlYXJjaEVsIiwic2VsZWN0b3IiLCJnZXRPcHRpb24iLCJuZXdSb3ciLCJuZXdUZCIsInByZXByb2Nlc3NlZCIsIml0ZW1JZCIsInRib2R5IiwiZmluZEJvZHkiLCJjbGVhckJvZHkiLCJ0aGlzUGFnZVN0YXJ0cyIsIm5leHRQYWdlRW5kcyIsIm1pbiIsInJlbmRlclJvdyIsInRhYmxlQm9keSIsInN0clZhbHVlIiwiZ2V0RmlsdGVyU2VhcmNoIiwiayIsInRvQ29tcCIsIm5vdFZpZXciXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWE7U0FDZCxLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFhO1NBQ2xCLEtBQUtDLEdBQUwsQ0FBUyxVQUFULElBQXVCRCxHQUE5QjtFQUxrQjtnQkFPSix1QkFBU0UsU0FBVCxFQUFvQkMsTUFBcEIsRUFBNEI7T0FDdEMsSUFBSUMsQ0FBUixJQUFhRixTQUFiLEVBQXdCO1FBQ25CLElBQUlHLENBQVIsSUFBYUYsTUFBYixFQUFxQjtRQUNqQkQsVUFBVUUsQ0FBVixFQUFhRSxjQUFiLENBQTRCSCxPQUFPRSxDQUFQLENBQTVCLENBQUgsRUFBMkM7U0FDdENFLFFBQVEsSUFBSUMsS0FBSixFQUFaO1dBQ01DLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsV0FBbEM7V0FDTUMsR0FBTixHQUFZUixVQUFVRSxDQUFWLEVBQWFELE9BQU9FLENBQVAsQ0FBYixFQUF3Qk0sT0FBeEIsQ0FBZ0MsSUFBaEMsTUFBMEMsQ0FBMUMsR0FBOEMsS0FBS0MsV0FBTCxDQUFpQlYsVUFBVUUsQ0FBVixFQUFhRCxPQUFPRSxDQUFQLENBQWIsQ0FBakIsQ0FBOUMsR0FBMEZILFVBQVVFLENBQVYsRUFBYUQsT0FBT0UsQ0FBUCxDQUFiLENBQXRHOzs7O0VBYmU7Y0FrQk4scUJBQVNRLE1BQVQsRUFBaUJDLEdBQWpCLEVBQXNCQyxJQUF0QixFQUEyQjs7O1NBQ2hDLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7T0FDbkNDLE1BQU0sSUFBSUMsY0FBSixFQUFWO09BQ0lDLElBQUosQ0FBU1IsTUFBVCxFQUFpQkMsR0FBakIsRUFBc0IsSUFBdEI7T0FDSVEsZ0JBQUosQ0FBcUIsV0FBckIsRUFBa0MsTUFBS0MsWUFBTCxFQUFsQztPQUNJRCxnQkFBSixDQUFxQixjQUFyQixFQUFxQyxpQ0FBckM7T0FDSUUsWUFBSixHQUFtQixNQUFuQjtPQUNJQyxlQUFKLEdBQXNCLElBQXRCO09BQ0lDLE1BQUosR0FBYSxZQUFXO1FBQ25CQyxTQUFTUixJQUFJUSxNQUFqQjtRQUNJQSxVQUFVLEdBQWQsRUFBbUI7YUFDVlIsSUFBSVMsUUFBWjtLQURELE1BRU87WUFDQ0QsTUFBUCxFQUFlUixJQUFJUyxRQUFuQjs7SUFMRjtPQVFJQyxJQUFJLFNBQUpBLENBQUk7V0FBTVgsT0FBT0MsSUFBSVEsTUFBWCxDQUFOO0lBQVI7T0FDSUcsT0FBSixHQUFjRCxDQUFkO09BQ0lFLFNBQUosR0FBZ0JGLENBQWhCO09BQ0lHLElBQUosQ0FBU2pCLElBQVQ7R0FsQk0sQ0FBUDtFQW5Ca0I7VUF3Q1YsaUJBQVNELEdBQVQsRUFBY0MsSUFBZCxFQUFvQjs7O1NBQ3JCLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7T0FDbkNDLE1BQU0sSUFBSUMsY0FBSixFQUFWO09BQ0lDLElBQUosQ0FBUyxLQUFULEVBQWdCUCxHQUFoQixFQUFxQixJQUFyQjtPQUNJUSxnQkFBSixDQUFxQixXQUFyQixFQUFrQyxPQUFLQyxZQUFMLEVBQWxDO09BQ0lELGdCQUFKLENBQXFCLGNBQXJCLEVBQXFDLGlDQUFyQztPQUNJRSxZQUFKLEdBQW1CLE1BQW5CO09BQ0lDLGVBQUosR0FBc0IsSUFBdEI7T0FDSUMsTUFBSixHQUFhLFlBQVc7UUFDbkJDLFNBQVNSLElBQUlRLE1BQWpCO1FBQ0lBLFVBQVUsR0FBZCxFQUFtQjthQUNWUixJQUFJUyxRQUFaO0tBREQsTUFFTztZQUNDRCxNQUFQLEVBQWVSLElBQUlTLFFBQW5COztJQUxGO09BUUlDLElBQUksU0FBSkEsQ0FBSTtXQUFNWCxPQUFPQyxJQUFJUSxNQUFYLENBQU47SUFBUjtPQUNJRyxPQUFKLEdBQWNELENBQWQ7T0FDSUUsU0FBSixHQUFnQkYsQ0FBaEI7T0FDSUcsSUFBSixDQUFTakIsSUFBVDtHQWxCTSxDQUFQO0VBekNrQjtXQThEVCxrQkFBU0QsR0FBVCxFQUFjQyxJQUFkLEVBQW9COzs7U0FDdEIsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtPQUNuQ0MsTUFBTSxJQUFJQyxjQUFKLEVBQVYsQ0FEdUM7T0FFbkNDLElBQUosQ0FBUyxNQUFULEVBQWlCUCxHQUFqQjtPQUNJUSxnQkFBSixDQUFxQixXQUFyQixFQUFrQyxPQUFLQyxZQUFMLEVBQWxDO09BQ0lELGdCQUFKLENBQXFCLGNBQXJCLEVBQXFDLGlDQUFyQztPQUNJRSxZQUFKLEdBQW1CLE1BQW5CO09BQ0lDLGVBQUosR0FBc0IsSUFBdEI7T0FDSUMsTUFBSixHQUFhLFlBQVc7UUFDbkJDLFNBQVNSLElBQUlRLE1BQWpCO1FBQ0lBLFVBQVUsR0FBZCxFQUFtQjthQUNWUixJQUFJUyxRQUFaO0tBREQsTUFFTztZQUNDRCxNQUFQLEVBQWVSLElBQUlTLFFBQW5COztJQUxGO09BUUlDLElBQUksU0FBSkEsQ0FBSTtXQUFNWCxPQUFPQyxJQUFJUSxNQUFYLENBQU47SUFBUjtPQUNJRyxPQUFKLEdBQWNELENBQWQ7T0FDSUUsU0FBSixHQUFnQkYsQ0FBaEI7T0FDSUcsSUFBSixDQUFTakIsSUFBVDtHQWxCTSxDQUFQO0VBL0RrQjtVQW9GVixpQkFBU0QsR0FBVCxFQUFjQyxJQUFkLEVBQW9COzs7U0FDckIsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtPQUNuQ0MsTUFBTSxJQUFJQyxjQUFKLEVBQVYsQ0FEdUM7T0FFbkNDLElBQUosQ0FBUyxLQUFULEVBQWdCUCxHQUFoQjtPQUNJUSxnQkFBSixDQUFxQixXQUFyQixFQUFrQyxPQUFLQyxZQUFMLEVBQWxDO09BQ0lELGdCQUFKLENBQXFCLGNBQXJCLEVBQXFDLGlDQUFyQztPQUNJRSxZQUFKLEdBQW1CLE1BQW5CO09BQ0lDLGVBQUosR0FBc0IsSUFBdEI7T0FDSUMsTUFBSixHQUFhLFlBQVc7UUFDbkJDLFNBQVNSLElBQUlRLE1BQWpCO1FBQ0lBLFVBQVUsR0FBZCxFQUFtQjthQUNWUixJQUFJUyxRQUFaO0tBREQsTUFFTztZQUNDRCxNQUFQLEVBQWVSLElBQUlTLFFBQW5COztJQUxGO09BUUlDLElBQUksU0FBSkEsQ0FBSTtXQUFNWCxPQUFPQyxJQUFJUSxNQUFYLENBQU47SUFBUjtPQUNJRyxPQUFKLEdBQWNELENBQWQ7T0FDSUUsU0FBSixHQUFnQkYsQ0FBaEI7T0FDSUcsSUFBSixDQUFTakIsSUFBVDtHQWxCTSxDQUFQO0VBckZrQjthQTBHUCxvQkFBU0QsR0FBVCxFQUFjQyxJQUFkLEVBQW9COzs7U0FDeEIsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtPQUNuQ0MsTUFBTSxJQUFJQyxjQUFKLEVBQVYsQ0FEdUM7T0FFbkNDLElBQUosQ0FBUyxRQUFULEVBQW1CUCxHQUFuQjtPQUNJUSxnQkFBSixDQUFxQixXQUFyQixFQUFrQyxPQUFLQyxZQUFMLEVBQWxDO09BQ0lELGdCQUFKLENBQXFCLGNBQXJCLEVBQXFDLGlDQUFyQztPQUNJRSxZQUFKLEdBQW1CLE1BQW5CO09BQ0lDLGVBQUosR0FBc0IsSUFBdEI7T0FDSUMsTUFBSixHQUFhLFlBQVc7UUFDbkJDLFNBQVNSLElBQUlRLE1BQWpCO1FBQ0lBLFVBQVUsR0FBZCxFQUFtQjthQUNWUixJQUFJUyxRQUFaO0tBREQsTUFFTztZQUNDRCxNQUFQLEVBQWVSLElBQUlTLFFBQW5COztJQUxGO09BUUlDLElBQUksU0FBSkEsQ0FBSTtXQUFNWCxPQUFPQyxJQUFJUSxNQUFYLENBQU47SUFBUjtPQUNJRyxPQUFKLEdBQWNELENBQWQ7T0FDSUUsU0FBSixHQUFnQkYsQ0FBaEI7T0FDSUcsSUFBSixDQUFTakIsSUFBVDtHQWxCTSxDQUFQO0VBM0drQjtVQWdJVixpQkFBU0QsR0FBVCxFQUFjQyxJQUFkLEVBQW9COzs7U0FDckIsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtPQUNuQ0MsTUFBTSxJQUFJQyxjQUFKLEVBQVY7T0FDSUMsSUFBSixDQUFTLEtBQVQsRUFBZ0JQLEdBQWhCLEVBQXFCLElBQXJCO09BQ0lRLGdCQUFKLENBQXFCLFdBQXJCLEVBQWtDLE9BQUtDLFlBQUwsRUFBbEM7T0FDSUMsWUFBSixHQUFtQixNQUFuQjtPQUNJQyxlQUFKLEdBQXNCLElBQXRCO09BQ0lDLE1BQUosR0FBYSxZQUFJO1FBQ1pDLFNBQVNSLElBQUlRLE1BQWpCO1FBQ0lNLFNBQVNOLE1BQVQsTUFBcUIsR0FBekIsRUFBOEI7YUFDckJSLElBQUllLFlBQVo7S0FERCxNQUVPO1lBQ0NQLE1BQVAsRUFBZVIsSUFBSWUsWUFBbkI7O0lBTEY7T0FRSUwsSUFBSSxTQUFKQSxDQUFJLENBQUNNLENBQUQ7V0FBT2pCLE9BQU9pQixDQUFQLENBQVA7SUFBUjtPQUNJTCxPQUFKLEdBQWNELENBQWQ7T0FDSUUsU0FBSixHQUFnQkYsQ0FBaEI7T0FDSUcsSUFBSixDQUFTakIsSUFBVDtHQWpCTSxDQUFQO0VBaklrQjtlQXFKTCx3QkFBNkI7TUFBcEJxQixJQUFvQix1RUFBYixXQUFhOztTQUNuQyxLQUFLQyxTQUFMLENBQWVELElBQWYsQ0FBUDtFQXRKa0I7WUF3SlQsbUJBQUNBLElBQUQsRUFBVTtNQUNiRSxRQUFRLE9BQU9DLFNBQVNDLE1BQTVCO01BQ0NDLFFBQVFILE1BQU1JLEtBQU4sQ0FBWSxPQUFPTixJQUFQLEdBQWMsR0FBMUIsQ0FEVDtNQUVJSyxNQUFNRSxNQUFOLElBQWdCLENBQXBCLEVBQXVCO1VBQ2pCRixNQUFNRyxHQUFOLEdBQVlGLEtBQVosQ0FBa0IsR0FBbEIsRUFBdUJHLEtBQXZCLEVBQVA7R0FEQyxNQUVHO1VBQ0csSUFBUDs7O0NBOUpILENBa0tBOztBQ2xLQSxJQUFJQyxhQUFhO1FBQ1QsaUJBQVc7Ozt1QkFDVEMsR0FBUixpQkFBZUMsU0FBZjtFQUZlO01BSVgsZUFBVzs7O3dCQUNQRCxHQUFSLGtCQUFlQyxTQUFmO0VBTGU7UUFPVCxpQkFBVzs7O3dCQUNUQyxLQUFSLGtCQUFpQkQsU0FBakI7RUFSZTtTQVVSLGtCQUFXOzs7d0JBQ1ZDLEtBQVIsa0JBQWlCRCxTQUFqQjtFQVhlO1FBYVQsaUJBQVc7Ozt3QkFDVEUsS0FBUixrQkFBaUJGLFNBQWpCOztDQWRGLENBa0JBOztBQ2xCQSxJQUFNRyxVQUFVQyxPQUFPLFNBQVAsQ0FBaEI7O0FBRUEsSUFBSUMsZUFBZTtTQUNWLGtCQUFXO1NBQ1gsS0FBS0MsVUFBTCxHQUFrQkMsTUFBbEIsRUFBUDtFQUZpQjthQUlOLG9CQUFTQyxDQUFULEVBQVk7T0FDbEJMLE9BQUwsSUFBZ0JLLENBQWhCO0VBTGlCO2FBT04sc0JBQVc7U0FDZixLQUFLTCxPQUFMLENBQVA7O0NBUkYsQ0FZQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBLElBQUlNLGdCQUFnQjtTQUNYLGdCQUFTQyxXQUFULEVBQW1CQyxPQUFuQixFQUE0QjtNQUMvQkMsV0FBVyxFQUFmO01BQ0lDLElBQUo7T0FDS0EsSUFBTCxJQUFhSCxXQUFiLEVBQXVCO09BQ2xCSSxPQUFPQyxTQUFQLENBQWlCekQsY0FBakIsQ0FBZ0MwRCxJQUFoQyxDQUFxQ04sV0FBckMsRUFBK0NHLElBQS9DLENBQUosRUFBMEQ7YUFDaERBLElBQVQsSUFBaUJILFlBQVNHLElBQVQsQ0FBakI7OztPQUdHQSxJQUFMLElBQWFGLE9BQWIsRUFBc0I7T0FDakJHLE9BQU9DLFNBQVAsQ0FBaUJ6RCxjQUFqQixDQUFnQzBELElBQWhDLENBQXFDTCxPQUFyQyxFQUE4Q0UsSUFBOUMsQ0FBSixFQUF5RDthQUMvQ0EsSUFBVCxJQUFpQkYsUUFBUUUsSUFBUixDQUFqQjs7O1NBR0tELFFBQVA7RUFka0I7aUJBZ0JILHdCQUFTSyxNQUFULEVBQTZCO29DQUFUQyxPQUFTO1VBQUE7OztVQUNwQ0MsT0FBUixDQUFnQixrQkFBVTtPQUNyQkMsY0FBY04sT0FBT08sSUFBUCxDQUFZQyxNQUFaLEVBQW9CQyxNQUFwQixDQUEyQixVQUFDSCxXQUFELEVBQWNJLEdBQWQsRUFBc0I7Z0JBQ3REQSxHQUFaLElBQW1CVixPQUFPVyx3QkFBUCxDQUFnQ0gsTUFBaEMsRUFBd0NFLEdBQXhDLENBQW5CO1dBQ09KLFdBQVA7SUFGaUIsRUFHZixFQUhlLENBQWxCOztVQUtPTSxxQkFBUCxDQUE2QkosTUFBN0IsRUFBcUNILE9BQXJDLENBQTZDLGVBQU87UUFDL0NRLGFBQWFiLE9BQU9XLHdCQUFQLENBQWdDSCxNQUFoQyxFQUF3Q00sR0FBeEMsQ0FBakI7UUFDSUQsV0FBV0UsVUFBZixFQUEyQjtpQkFDZEQsR0FBWixJQUFtQkQsVUFBbkI7O0lBSEY7VUFNT0csZ0JBQVAsQ0FBd0JiLE1BQXhCLEVBQWdDRyxXQUFoQztHQVpEO1NBY09ILE1BQVA7RUEvQmtCO2FBaUNQLG9CQUFTTixPQUFULEVBQWlCO09BQ3ZCLElBQUlFLElBQVQsSUFBaUJGLE9BQWpCLEVBQTBCO09BQ3JCQSxRQUFRckQsY0FBUixDQUF1QnVELElBQXZCLENBQUosRUFBa0M7U0FDNUJBLElBQUwsSUFBYUYsUUFBUUUsSUFBUixDQUFiOzs7RUFwQ2dCOztjQXlDTixxQkFBU2tCLEdBQVQsRUFBY0MsS0FBZCxFQUFxQjtPQUM1QixJQUFJbkQsQ0FBVCxJQUFjbUQsS0FBZCxFQUFxQjtPQUNoQkEsTUFBTTFFLGNBQU4sQ0FBcUJ1QixDQUFyQixDQUFKLEVBQTZCO1FBQ3ZCLENBQUNrRCxJQUFJekUsY0FBSixDQUFtQnVCLENBQW5CLENBQUYsSUFBNkJrRCxJQUFJbEQsQ0FBSixNQUFXbUQsTUFBTW5ELENBQU4sQ0FBNUMsRUFBdUQ7WUFDL0MsS0FBUDs7OztTQUlJLElBQVA7RUFqRGtCO1NBbURYLGdCQUFTb0QsR0FBVCxFQUFjQyxPQUFkLEVBQXNCO01BQ3pCQSxXQUFVRCxHQUFkLEVBQW1CO1VBQ1gsS0FBS0UsV0FBTCxDQUFpQkYsR0FBakIsRUFBc0JDLE9BQXRCLENBQVA7O1NBRU0sSUFBUDtFQXZEa0I7bUJBeURELDBCQUFTRSxLQUFULEVBQWdCRixNQUFoQixFQUF3QjtNQUNyQ0csUUFBUSxFQUFaO09BQ0ssSUFBSWpGLElBQUksQ0FBYixFQUFnQkEsSUFBSWdGLE1BQU16QyxNQUExQixFQUFrQ3ZDLEdBQWxDLEVBQXVDO09BQ2xDLEtBQUs4RSxNQUFMLENBQVlFLE1BQU1oRixDQUFOLEVBQVNrRixPQUFULEVBQVosRUFBZ0NKLE1BQWhDLENBQUosRUFBNkM7VUFDdENLLElBQU4sQ0FBV0gsTUFBTWhGLENBQU4sQ0FBWDs7O1NBR0tpRixLQUFQO0VBaEVrQjtXQWtFVCxrQkFBU0csQ0FBVCxFQUFZQyxDQUFaLEVBQWU7TUFDcEJDLENBQUo7T0FDS0EsQ0FBTCxJQUFVRixDQUFWLEVBQWE7T0FDUixPQUFPQyxFQUFFQyxDQUFGLENBQVAsSUFBZ0IsV0FBcEIsRUFBaUM7V0FDekIsS0FBUDs7O09BR0dBLENBQUwsSUFBVUYsQ0FBVixFQUFhO09BQ1JBLEVBQUVFLENBQUYsQ0FBSixFQUFVO29CQUNNRixFQUFFRSxDQUFGLENBQWY7VUFDTSxRQUFMOztXQUVLLENBQUMsS0FBS0MsS0FBTCxDQUFXSCxFQUFFRSxDQUFGLENBQVgsRUFBaUJELEVBQUVDLENBQUYsQ0FBakIsQ0FBTCxFQUE2QjtlQUNyQixLQUFQOzs7O1VBSUcsVUFBTDs7V0FFSyxPQUFPRCxFQUFFQyxDQUFGLENBQVAsSUFBZ0IsV0FBaEIsSUFDRkEsS0FBSyxRQUFMLElBQWlCRixFQUFFRSxDQUFGLEVBQUtFLFFBQUwsTUFBbUJILEVBQUVDLENBQUYsRUFBS0UsUUFBTCxFQUR0QyxFQUVDLE9BQU8sS0FBUDs7Ozs7V0FLR0osRUFBRUUsQ0FBRixLQUFRRCxFQUFFQyxDQUFGLENBQVosRUFBa0I7ZUFDVixLQUFQOzs7O0lBbkJKLE1BdUJPO1FBQ0ZELEVBQUVDLENBQUYsQ0FBSixFQUNDLE9BQU8sS0FBUDs7OztPQUlFQSxDQUFMLElBQVVELENBQVYsRUFBYTtPQUNSLE9BQU9ELEVBQUVFLENBQUYsQ0FBUCxJQUFnQixXQUFwQixFQUFpQztXQUN6QixLQUFQOzs7U0FHSyxJQUFQO0VBNUdrQjtvQkE4R0EsMkJBQVNULEdBQVQsRUFBY1QsR0FBZCxFQUFtQnFCLFlBQW5CLEVBQWlDO01BQy9DLENBQUNaLElBQUkzRSxjQUFKLENBQW1Ca0UsR0FBbkIsQ0FBTCxFQUE4QjtPQUN6QkEsR0FBSixJQUFXcUIsWUFBWDs7RUFoSGlCO1lBbUhSLG1CQUFTQyxJQUFULEVBQWVDLElBQWYsRUFBcUI7U0FDeEJDLE9BQU9DLE1BQVAsQ0FBYyxJQUFkLEVBQW9CLEVBQXBCLEVBQXdCSCxJQUF4QixFQUE4QkMsSUFBOUIsQ0FBUDtFQXBIa0I7O1dBdUhULEVBdkhTOztXQXlIVCxrQkFBU3ZCLEdBQVQsRUFBYzBCLEdBQWQsRUFBbUI7T0FDdkJDLFFBQUwsQ0FBYzNCLEdBQWQsSUFBcUIwQixHQUFyQjtFQTFIa0I7O01BNkhkLGFBQVMxQixHQUFULEVBQWM7U0FDWCxLQUFLMkIsUUFBTCxDQUFjN0YsY0FBZCxDQUE2QmtFLEdBQTdCLElBQW9DLEtBQUsyQixRQUFMLENBQWMzQixHQUFkLENBQXBDLEdBQXlELElBQWhFOzs7Q0E5SEYsQ0FtSUE7O0FDcElBLElBQUk0QixnQkFBZ0I7c0JBQUEsaUNBQ0dDLE1BREgsRUFDVztTQUN0QkEsT0FBT0MsTUFBUCxDQUFjLENBQWQsRUFBaUJDLFdBQWpCLEtBQWlDRixPQUFPRyxLQUFQLENBQWEsQ0FBYixDQUF4QztFQUZrQjtpQkFBQSw0QkFJRkgsTUFKRSxFQUlNO1NBQ2pCQSxPQUFPQyxNQUFQLENBQWMsQ0FBZCxFQUFpQkcsV0FBakIsS0FBaUNKLE9BQU9HLEtBQVAsQ0FBYSxDQUFiLENBQXhDOztDQUxGLENBU0E7O0FDVEEsSUFBSUUsa0JBQWtCO09BQ2YsY0FBUzNGLElBQVQsa0JBQThCNEYsS0FBOUIsd0JBQTBEO01BQzNEQyxlQUFKOzs7Ozs7d0JBQ2dCRCxLQUFoQiw4SEFBc0I7UUFBZEUsSUFBYzs7YUFDWkEsS0FBS0QsVUFBVTdGLElBQWYsQ0FBVDs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FFTTZGLE1BQVA7O0NBTkYsQ0FVQTs7QUNWQSxJQUFJRSxZQUFZOzBCQUNVLGlDQUFTQyxFQUFULEVBQWFDLFVBQWIsRUFBeUI7TUFDN0NDLGNBQWNGLEdBQUdHLGdCQUFILENBQW9CLEdBQXBCLENBQWxCO01BQ0lDLE9BQU8sRUFBWDtPQUNLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsWUFBWXRFLE1BQWhDLEVBQXdDeUUsR0FBeEMsRUFBNkM7UUFDdkMsSUFBSWhILElBQUksQ0FBUixFQUFXaUgsT0FBT0osWUFBWUcsQ0FBWixFQUFlRSxVQUFqQyxFQUE2Q0MsSUFBSUYsS0FBSzFFLE1BQTNELEVBQW1FdkMsSUFBSW1ILENBQXZFLEVBQTBFbkgsR0FBMUUsRUFBK0U7UUFDMUVpSCxLQUFLakgsQ0FBTCxFQUFRb0gsUUFBUixDQUFpQjdHLE9BQWpCLENBQXlCcUcsVUFBekIsTUFBeUMsQ0FBN0MsRUFBZ0Q7VUFDMUN6QixJQUFMLENBQVUwQixZQUFZRyxDQUFaLENBQVY7Ozs7O1NBS0lELElBQVA7O0NBWkYsQ0FnQkE7O0FDaEJBLElBQUlNLFlBQVk7V0FDTCxrQkFBQ0MsT0FBRCxFQUFXO1dBQ1hDLGdCQUFULENBQTBCLGtCQUExQixFQUE4Q0QsT0FBOUM7RUFGYztTQUlQLGtCQUFVO1NBQ1YsS0FBS3pILEdBQUwsQ0FBUyxLQUFULENBQVA7O0NBTEYsQ0FTQTs7QUNBQTs7O0FBR0EsSUFBSTJILFlBQVk5RCxPQUFPK0QsTUFBUCxDQUFjLEVBQWQsRUFBa0JwRSxhQUFsQixDQUFoQjs7QUFFQW1FLFVBQVVFLFVBQVYsQ0FBcUIvSCxhQUFyQjtBQUNBNkgsVUFBVUUsVUFBVixDQUFxQjFCLGFBQXJCO0FBQ0F3QixVQUFVRSxVQUFWLENBQXFCaEYsVUFBckI7QUFDQThFLFVBQVVFLFVBQVYsQ0FBcUJ6RSxZQUFyQjtBQUNBdUUsVUFBVUUsVUFBVixDQUFxQnBCLGVBQXJCO0FBQ0FrQixVQUFVRSxVQUFWLENBQXFCaEIsU0FBckI7QUFDQWMsVUFBVUUsVUFBVixDQUFxQkwsU0FBckIsRUFFQTs7QUN0QkE7Ozs7Ozs7Ozs7O0FBV0EsSUFBTU0saUJBQWlCLEdBQXZCO0lBQ0NDLGVBQWUsR0FEaEI7SUFFQ0MsYUFBYSxHQUZkO0lBR0NDLG9CQUFvQixHQUhyQjtJQUlDQyxxQkFBcUIsSUFKdEI7SUFLQ0Msa0JBQWtCLElBTG5CO0lBTUNDLFdBQVcsRUFOWjs7SUFRTUM7b0JBQ1E7OztTQUNMLElBQVA7Ozs7Ozs7Ozs7a0NBTWVDLG1CQUFpQjtPQUM1QkMsVUFBVSxFQUFkO09BQ0NDLE9BQU8sS0FEUjtRQUVJLElBQUlySSxJQUFJLENBQVosRUFBZUEsSUFBSW1JLEtBQUs1RixNQUF4QixFQUFnQ3ZDLEdBQWhDLEVBQW9DO1FBQy9CbUksS0FBS25JLENBQUwsTUFBWTJILGNBQWhCLEVBQStCO1lBQ3ZCLElBQVA7ZUFDVSxFQUFWO0tBRkQsTUFHSztTQUNEUSxLQUFLbkksQ0FBTCxNQUFZNEgsWUFBWixJQUE0QlMsSUFBL0IsRUFBb0M7VUFDL0JBLElBQUosRUFBVTtjQUNGRCxPQUFQOztNQUZGLE1BSUs7aUJBQ0tELEtBQUtuSSxDQUFMLENBQVQ7Ozs7VUFJSXFJLE9BQUtELE9BQUwsR0FBYSxJQUFwQjs7OztpQ0FHY0QsTUFBTUcsS0FBS0MsUUFBTztPQUM1QkMsT0FBT2IsaUJBQWVXLEdBQWYsR0FBbUJWLFlBQTlCO1VBQ01PLEtBQUs1SCxPQUFMLENBQWFpSSxJQUFiLElBQXFCLENBQUMsQ0FBNUIsRUFBOEI7V0FDdEJMLEtBQUtNLE9BQUwsQ0FBYUQsSUFBYixFQUFtQkQsTUFBbkIsQ0FBUDs7VUFFTUosSUFBUDs7Ozs0QkFHU0EsTUFBTU8sTUFBTUMsU0FBUTtPQUN6QlAsZ0JBQUo7T0FBYVEsc0JBQWI7T0FBNEI1SSxJQUFJLENBQWhDO1VBQ01vSSxVQUFVLEtBQUtTLGVBQUwsQ0FBcUJWLElBQXJCLENBQWhCLEVBQTJDO29CQUMxQixLQUFLVyxjQUFMLENBQXFCVixRQUFRN0gsT0FBUixDQUFnQndILGtCQUFoQixJQUFvQyxDQUFDLENBQXJDLEdBQXVDWSxPQUF2QyxHQUErQ0QsSUFBcEUsRUFBMEVOLE9BQTFFLENBQWhCO1dBQ08sS0FBS1csY0FBTCxDQUFvQlosSUFBcEIsRUFBMEJDLE9BQTFCLEVBQW1DUSxhQUFuQyxDQUFQOztRQUVJNUksSUFBSWlJLFFBQVIsRUFBaUI7Ozs7VUFJWEUsSUFBUDs7OztzQkFHR0EsTUFBTU8sTUFBTUMsU0FBUTtXQUNmUixJQUFSO1NBQ01MLGlCQUFMO1lBQStCWSxJQUFQO1NBQ25CWCxrQkFBTDtZQUFnQ1ksT0FBUDs7VUFFbkIsS0FBS0ssU0FBTCxDQUFlYixJQUFmLEVBQXFCTyxJQUFyQixFQUEyQkMsT0FBM0IsQ0FBUDtVQUNPLEtBQUtHLGNBQUwsQ0FBb0JYLEtBQUs1SCxPQUFMLENBQWF3SCxrQkFBYixJQUFpQyxDQUFDLENBQWxDLEdBQW9DWSxPQUFwQyxHQUE0Q0QsSUFBaEUsRUFBc0VQLElBQXRFLENBQVA7Ozs7c0JBR0dBLE1BQU1PLE1BQU1DLFNBQVNNLFdBQVU7T0FDOUJiLGdCQUFKO09BQWFRLHNCQUFiO09BQTRCNUksSUFBSSxDQUFoQztVQUNNb0ksVUFBVSxLQUFLUyxlQUFMLENBQXFCVixJQUFyQixDQUFoQixFQUEyQztvQkFDMUIsS0FBS1csY0FBTCxDQUFxQlYsUUFBUTdILE9BQVIsQ0FBZ0J3SCxrQkFBaEIsSUFBb0MsQ0FBQyxDQUFyQyxHQUF1Q1ksT0FBdkMsR0FBK0NELElBQXBFLEVBQTBFTixPQUExRSxDQUFoQjtXQUNPLEtBQUtXLGNBQUwsQ0FBb0JaLElBQXBCLEVBQTBCQyxPQUExQixFQUFtQ1EsYUFBbkMsQ0FBUDtRQUNJNUksSUFBSWlJLFFBQVIsRUFBaUI7Ozs7UUFJYmlCLGNBQUwsQ0FBb0JSLElBQXBCLEVBQTBCUCxJQUExQixFQUFnQ2MsU0FBaEM7T0FDSVAsS0FBS1MsUUFBTCxJQUFpQixLQUFLQyxhQUFMLENBQW1CakIsSUFBbkIsRUFBeUI1RixNQUF6QixHQUFrQyxDQUF2RCxFQUEwRDtTQUNwRDhHLE9BQUwsQ0FBYSxRQUFiLEVBQXVCWCxJQUF2QixFQUE2QlAsSUFBN0IsRUFBbUNjLFNBQW5DOzs7Ozt3QkFJSWQsTUFBTU8sTUFBTUMsU0FBUTtRQUNwQlcsR0FBTCxDQUFTbkIsSUFBVCxFQUFlTyxJQUFmLEVBQXFCQyxPQUFyQixFQUE4QixJQUE5Qjs7OztnQ0FHYVksTUFBTWIsTUFBTWMsUUFBTztPQUM1QkMsUUFBUSxJQUFaO09BQ0dGLEtBQUtoSixPQUFMLENBQWF3SCxrQkFBYixNQUFxQyxDQUFyQyxJQUEwQ3lCLE1BQTdDLEVBQW9EO1lBQzNDRCxLQUFLZCxPQUFMLENBQWFWLGtCQUFiLEVBQWlDLEVBQWpDLENBQVI7UUFDRzBCLE1BQU1sSixPQUFOLENBQWN5SCxlQUFkLE1BQW1DeUIsTUFBTWxILE1BQU4sR0FBYSxDQUFuRCxFQUFxRDthQUM1Q2dILEtBQUtkLE9BQUwsQ0FBYVQsZUFBYixFQUE4QixFQUE5QixDQUFSO1NBQ0d3QixPQUFPdEosY0FBUCxDQUFzQnVKLEtBQXRCLENBQUgsRUFBZ0M7YUFDeEJELE9BQU9DLEtBQVAsRUFBY2YsSUFBZCxFQUFvQmdCLFNBQXBCLENBQVA7O0tBSEYsTUFLSztZQUNHRixPQUFPQyxLQUFQLENBQVA7O0lBUkYsTUFVSztRQUNERixLQUFLaEosT0FBTCxDQUFhdUgsaUJBQWIsTUFBb0MsQ0FBcEMsSUFBeUNZLElBQTVDLEVBQWlEO2FBQ3hDYSxLQUFLZCxPQUFMLENBQWFYLGlCQUFiLEVBQWdDLEVBQWhDLENBQVI7U0FDRzJCLE1BQU1sSixPQUFOLENBQWN5SCxlQUFkLE1BQW1DeUIsTUFBTWxILE1BQU4sR0FBYSxDQUFuRCxFQUFxRDtjQUM1Q2dILEtBQUtkLE9BQUwsQ0FBYVQsZUFBYixFQUE4QixFQUE5QixDQUFSO1VBQ0dVLEtBQUt4SSxjQUFMLENBQW9CdUosS0FBcEIsQ0FBSCxFQUE4QjtjQUN0QmYsS0FBS2UsS0FBTCxFQUFZZixJQUFaLEVBQWtCZ0IsU0FBbEIsQ0FBUDs7TUFIRixNQUtLO2FBQ0doQixLQUFLZSxLQUFMLENBQVA7Ozs7VUFJSUYsSUFBUDs7Ozs7Ozs7Ozs0QkFPU3BCLE1BQU1PLE1BQU1jLFFBQU87T0FDeEIsQ0FBQ0csTUFBTUMsT0FBTixDQUFjekIsSUFBZCxDQUFMLEVBQXlCO1dBQ2pCQSxLQUFLN0YsS0FBTCxDQUFXdUYsVUFBWCxDQUFQOztRQUVHLElBQUk3SCxJQUFJLENBQVosRUFBZUEsSUFBSW1JLEtBQUs1RixNQUF4QixFQUFnQ3ZDLEdBQWhDLEVBQW9DO1NBQzlCQSxDQUFMLElBQVUsS0FBSzZKLGFBQUwsQ0FBbUIxQixLQUFLbkksQ0FBTCxDQUFuQixFQUE0QjBJLElBQTVCLEVBQWtDYyxNQUFsQyxDQUFWOztVQUVNckIsSUFBUDs7OztnQ0FHYUEsTUFBSztPQUNkd0IsTUFBTUMsT0FBTixDQUFjekIsSUFBZCxDQUFKLEVBQXdCO1dBQ2hCQSxJQUFQO0lBREQsTUFFSztXQUNFQSxLQUFLNUgsT0FBTCxDQUFhdUgsaUJBQWIsSUFBa0MsQ0FBQyxDQUF6QyxFQUEyQztZQUNuQ0ssS0FBS00sT0FBTCxDQUFhWCxpQkFBYixFQUErQixFQUEvQixDQUFQOztXQUVNSyxLQUFLN0YsS0FBTCxDQUFXdUYsVUFBWCxDQUFQOzs7Ozs7Ozs7Ozs7Z0NBV1lsRCxLQUFLQyxPQUFNO09BQ3BCRCxJQUFJcEMsTUFBSixHQUFXcUMsTUFBTXJDLE1BQXJCLEVBQTRCO1dBQVEsS0FBUDs7UUFDekIsSUFBSWQsSUFBRyxDQUFYLEVBQWNBLElBQUltRCxNQUFNckMsTUFBeEIsRUFBZ0NkLEdBQWhDLEVBQW9DO1FBQ2hDbUQsTUFBTW5ELENBQU4sTUFBYWtELElBQUlsRCxDQUFKLENBQWhCLEVBQXVCO1lBQ2YsS0FBUDs7O1VBR0ssSUFBUDs7OztpQ0FHY3FJLFFBQVFDLFVBQVM7Y0FDcEIsS0FBS1gsYUFBTCxDQUFtQlcsUUFBbkIsQ0FBWDtPQUNJQyxXQUFXRCxTQUFTdEgsS0FBVCxFQUFmO09BQ0N3SCxhQUFhRCxTQUFTekosT0FBVCxDQUFpQnlILGVBQWpCLElBQWtDLENBQUMsQ0FEakQ7T0FFSWlDLFVBQUosRUFBZTtlQUNIRCxTQUFTdkIsT0FBVCxDQUFpQlQsZUFBakIsRUFBa0MsRUFBbEMsQ0FBWDs7T0FFSSxRQUFPOEIsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFuQixJQUFnQyxPQUFPQSxPQUFPRSxRQUFQLENBQVAsS0FBNEIsV0FBNUQsSUFBMkVGLE9BQU9FLFFBQVAsTUFBcUIsSUFBcEcsRUFBeUc7UUFDcEdFLFNBQVNELGFBQVdILE9BQU9FLFFBQVAsR0FBWCxHQUE4QkYsT0FBT0UsUUFBUCxDQUEzQztRQUNJRCxTQUFTeEgsTUFBVCxHQUFrQixDQUF0QixFQUF3QjtZQUNoQixLQUFLdUcsY0FBTCxDQUFvQm9CLE1BQXBCLEVBQTRCSCxRQUE1QixDQUFQO0tBREQsTUFFSztZQUNHRyxNQUFQOztJQUxGLE1BT0s7V0FDR1IsU0FBUDs7Ozs7aUNBSWFJLFFBQVFDLFVBQVVkLFdBQVU7Y0FDL0IsS0FBS0csYUFBTCxDQUFtQlcsUUFBbkIsQ0FBWDtPQUNJQyxXQUFXRCxTQUFTdEgsS0FBVCxFQUFmO09BQ0lzSCxTQUFTeEgsTUFBVCxHQUFrQixDQUF0QixFQUF3QjtRQUNuQixDQUFDdUgsT0FBTzVKLGNBQVAsQ0FBc0I4SixRQUF0QixDQUFMLEVBQXFDO1lBQVFBLFFBQVAsSUFBbUIsRUFBbkI7O1NBQ2pDZCxjQUFMLENBQW9CWSxPQUFPRSxRQUFQLENBQXBCLEVBQXNDRCxRQUF0QyxFQUFnRGQsU0FBaEQ7SUFGRCxNQUdLO1dBQ0dlLFFBQVAsSUFBbUJmLFNBQW5COzs7Ozt5QkFJSTtPQUNEa0IsT0FBT1IsTUFBTWhHLFNBQU4sQ0FBZ0J5QyxLQUFoQixDQUFzQnhDLElBQXRCLENBQTJCaEIsU0FBM0IsQ0FBWDtVQUNPdUgsS0FBS0MsSUFBTCxDQUFVdkMsVUFBVixDQUFQOzs7Ozs7QUFJRixnQkFBZSxJQUFJSyxPQUFKLEVBQWY7O0FDdk1BLElBQU1tQyxtQkFBbUJySCxPQUFPLE1BQVAsQ0FBekI7SUFDQ3NILGNBQWN0SCxPQUFPLFFBQVAsQ0FEZjtJQUVDdUgsWUFBWXZILE9BQU8sTUFBUCxDQUZiO0lBR0N3SCxlQUFleEgsT0FBTyxTQUFQLENBSGhCO0lBSUN5SCxlQUFlekgsT0FBTyxTQUFQLENBSmhCOztJQU1xQjBIO2tCQUNSQyxLQUFaLEVBQW1COzs7T0FDYkwsV0FBTCxJQUFvQixFQUFwQjtPQUNLQyxTQUFMLElBQWtCLEVBQWxCO09BQ0tDLFlBQUwsSUFBcUIsRUFBckI7T0FDS0MsWUFBTCxJQUFxQixFQUFyQjtPQUNLSixnQkFBTCxFQUF1Qk0sS0FBdkI7U0FDTyxJQUFQOzs7O09BR0FOO3dCQUFrQk0sT0FBTTtPQUNwQixDQUFDQSxLQUFMLEVBQVc7WUFDRixFQUFSOztPQUVFQSxNQUFNekssY0FBTixDQUFxQixRQUFyQixDQUFILEVBQWtDOzs7Ozs7MEJBQ3BCeUssTUFBTUMsTUFBbkIsOEhBQTBCO1VBQWxCbkosQ0FBa0I7O1dBQ3BCb0osRUFBTCwrQkFBV3BKLENBQVg7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQUlDa0osTUFBTXpLLGNBQU4sQ0FBcUIsTUFBckIsQ0FBSCxFQUFnQztTQUMxQjRLLE9BQUwsQ0FBYUgsTUFBTWhLLElBQW5COzs7T0FHRWdLLE1BQU16SyxjQUFOLENBQXFCLFNBQXJCLENBQUgsRUFBbUM7U0FDN0I2SyxVQUFMLENBQWdCSixNQUFNSyxPQUF0Qjs7O09BR0VMLE1BQU16SyxjQUFOLENBQXFCLFNBQXJCLENBQUgsRUFBbUM7U0FDN0IrSyxVQUFMLENBQWdCTixNQUFNcEgsT0FBdEI7Ozs7OzRCQUlRMkgsTUFBTWYsTUFBTTtXQUNiQSxLQUFLNUgsTUFBYjtTQUNLLENBQUw7OzthQUdTNEgsS0FBSyxDQUFMLENBQVA7OztTQUdHLENBQUw7OztnQkFHVWIsR0FBUixDQUFZYSxLQUFLLENBQUwsQ0FBWixhQUFpQ2UsSUFBakMsbUJBQXlEeEIsU0FBekQsZ0JBQW1GUyxLQUFLLENBQUwsQ0FBbkY7Ozs7Ozs7NEJBS09lLE1BQU1mLE1BQU07V0FDYkEsS0FBSzVILE1BQWI7O1NBRUssQ0FBTDs7YUFFUzJGLFVBQVFySSxHQUFSLENBQVlzSyxLQUFLLENBQUwsQ0FBWixFQUFxQmUsSUFBckIsQ0FBUDs7O1NBR0csQ0FBTDs7VUFFTUMsTUFBTWpELFVBQVFySSxHQUFSLENBQVlzSyxLQUFLLENBQUwsQ0FBWixFQUFxQmUsSUFBckIsQ0FBVjtVQUNJQyxRQUFRekIsU0FBWixFQUF1Qjs7Y0FFZlMsS0FBSyxDQUFMLENBQVA7T0FGRCxNQUdPOztjQUVDZ0IsR0FBUDs7Ozs7O2FBTU1ELElBQVA7Ozs7Ozs7Ozs7Ozs7OzRCQVlPO09BQ0x0SSxVQUFVTCxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO1NBQ3RCZ0ksU0FBTCxJQUFrQjNILFVBQVUsQ0FBVixDQUFsQjtJQURELE1BRU87U0FDRHdJLFNBQUwsQ0FBZSxLQUFLbEcsT0FBTCxFQUFmLEVBQStCdEMsU0FBL0I7O1FBRUl5RyxPQUFMLENBQWEsUUFBYjs7Ozs0QkFHUztVQUNGLEtBQUtnQyxTQUFMLENBQWUsS0FBS2QsU0FBTCxDQUFmLEVBQWdDM0gsU0FBaEMsQ0FBUDs7OzsrQkFHWTtPQUNSQSxVQUFVTCxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO1NBQ3RCa0ksWUFBTCxJQUFxQjdILFVBQVUsQ0FBVixDQUFyQjtJQURELE1BRU87U0FDRHdJLFNBQUwsQ0FBZSxLQUFLRSxVQUFMLEVBQWYsRUFBa0MxSSxTQUFsQzs7Ozs7K0JBSVc7VUFDTCxLQUFLeUksU0FBTCxDQUFlLEtBQUtaLFlBQUwsQ0FBZixFQUFtQzdILFNBQW5DLENBQVA7Ozs7K0JBR1k7T0FDUkEsVUFBVUwsTUFBVixLQUFxQixDQUF6QixFQUE0QjtTQUN0QmlJLFlBQUwsSUFBcUI1SCxVQUFVLENBQVYsQ0FBckI7SUFERCxNQUVPO1NBQ0R3SSxTQUFMLENBQWUsS0FBS0csVUFBTCxFQUFmLEVBQWtDM0ksU0FBbEM7Ozs7OytCQUlXO1VBQ0wsS0FBS3lJLFNBQUwsQ0FBZSxLQUFLYixZQUFMLENBQWYsRUFBbUM1SCxTQUFuQyxDQUFQOzs7Ozs7Ozs7cUJBT0U0SSxZQUFZQyxnQkFBZ0JDLE1BQU07OztPQUNoQyxDQUFDL0IsTUFBTUMsT0FBTixDQUFjNEIsVUFBZCxDQUFMLEVBQWdDO2lCQUNsQixDQUFDQSxVQUFELENBQWI7O09BRUcsQ0FBQzdCLE1BQU1DLE9BQU4sQ0FBYzZCLGNBQWQsQ0FBTCxFQUFvQztxQkFDbEIsQ0FBQ0EsY0FBRCxDQUFqQjs7Y0FFVTFILE9BQVgsQ0FBbUIsZ0JBQVE7Y0FDaEI0SCxpQkFBVixDQUE0QixNQUFLckIsV0FBTCxDQUE1QixFQUErQ3RJLElBQS9DLEVBQXFELEVBQXJEO1VBQ0tzSSxXQUFMLEVBQWtCdEksSUFBbEIsRUFBd0JtRCxJQUF4QixDQUE2QjtnQkFDakJzRyxjQURpQjtXQUV0QkMsSUFGc0I7WUFHckI7S0FIUjtJQUZEO1VBUU8sSUFBUDs7Ozs0QkFHUzs7O09BQ0x2QixPQUFPUixNQUFNaUMsSUFBTixDQUFXaEosU0FBWCxDQUFYO09BQ0NpSixZQUFZMUIsS0FBSzFILEtBQUwsRUFEYjtPQUVJLENBQUNrSCxNQUFNQyxPQUFOLENBQWNpQyxTQUFkLENBQUwsRUFBK0I7Z0JBQ2xCLENBQUNBLFNBQUQsQ0FBWjs7YUFFUzlILE9BQVYsQ0FBa0IsZ0JBQVE7UUFDckIsT0FBS3VHLFdBQUwsRUFBa0JwSyxjQUFsQixDQUFpQzhCLElBQWpDLENBQUosRUFBNEM7WUFDdENzSSxXQUFMLEVBQWtCdEksSUFBbEIsRUFBd0IrQixPQUF4QixDQUFnQyxpQkFBUztVQUNwQytILE1BQU1KLElBQVYsRUFBZ0I7Y0FDVkssR0FBTCxDQUFTL0osSUFBVCxFQUFlOEosTUFBTUUsU0FBckI7O1lBRUtBLFNBQU4sQ0FBZ0JqSSxPQUFoQixDQUF3QjtjQUFZa0ksNENBQVk5QixJQUFaLEVBQVo7T0FBeEI7TUFKRDs7SUFGRjtVQVVPLElBQVA7Ozs7c0JBR0dxQix1Q0FBd0NDLHlDQUEwQzs7O09BQ2pGLENBQUM5QixNQUFNQyxPQUFOLENBQWM0QixVQUFkLENBQUwsRUFBZ0M7aUJBQ2xCLENBQUNBLFVBQUQsQ0FBYjs7T0FFRyxDQUFDN0IsTUFBTUMsT0FBTixDQUFjNkIsY0FBZCxDQUFMLEVBQW9DO3FCQUNsQixDQUFDQSxjQUFELENBQWpCOzs7Y0FHVTFILE9BQVgsQ0FBbUIsZ0JBQVE7UUFDdEJtSSxXQUFXLENBQUMsQ0FBaEI7V0FDSzVCLFdBQUwsRUFBa0J0SSxJQUFsQixFQUF3QitCLE9BQXhCLENBQWdDLFVBQUMrSCxLQUFELEVBQVE5TCxDQUFSLEVBQWM7U0FDekNBLE1BQU0sQ0FBQyxDQUFQLElBQVl5TCxtQkFBbUJLLE1BQU1FLFNBQXpDLEVBQW9EO2lCQUN4Q2hNLENBQVg7O0tBRkY7UUFLSWtNLFdBQVcsQ0FBQyxDQUFoQixFQUFtQjtZQUNiNUIsV0FBTCxFQUFrQnRJLElBQWxCLEVBQXdCbUssTUFBeEIsQ0FBK0JELFFBQS9CLEVBQXlDLENBQXpDOztJQVJGO1VBV08sSUFBUDs7Ozs7O0FDNUxGLElBQU1FLG1CQUFtQnBKLE9BQU8sU0FBUCxDQUF6QjtJQUNDcUosZ0JBQWdCckosT0FBTyxNQUFQLENBRGpCO0lBRUNzSiw2QkFBNkIsRUFGOUI7O0lBSU1DOzs7c0JBQ1M7Ozs7Ozs7UUFFUnhCLFVBQUwsQ0FBZ0I7V0FDUCxFQURPO1NBRVRxQixnQkFGUztTQUdULEdBSFM7Z0JBSUY7R0FKZDs7Ozs7OzRCQVNRO1FBQ0hyQixVQUFMLENBQWdCLE1BQWhCLEVBQXdCcUIsZ0JBQXhCOzs7O3lCQUdLO1FBQ0FyQixVQUFMLENBQWdCLE1BQWhCLEVBQXdCc0IsYUFBeEI7Ozs7MEJBR09HLE1BQUs7UUFDUHpCLFVBQUwsQ0FBZ0IsTUFBaEIsRUFBd0J5QixPQUFPLE1BQU0sS0FBS0MsWUFBTCxDQUFrQkQsSUFBbEIsQ0FBTixHQUFnQyxHQUF2QyxHQUE2QyxHQUFyRTtVQUNPLElBQVA7Ozs7K0JBR1lyRSxNQUFNOztVQUVYQSxLQUFLM0MsUUFBTCxHQUFnQmlELE9BQWhCLENBQXdCLEtBQXhCLEVBQStCLEVBQS9CLEVBQW1DQSxPQUFuQyxDQUEyQyxLQUEzQyxFQUFrRCxFQUFsRCxDQUFQOzs7O3NCQUdHaUUsSUFBSUMsU0FBUztPQUNaLE9BQU9ELEVBQVAsSUFBYSxVQUFqQixFQUE2QjtjQUNsQkEsRUFBVjtTQUNLLEVBQUw7O09BRUdFLE9BQU87UUFDTkYsRUFETTthQUVEQztJQUZWO1FBSUtwQixVQUFMLENBQWdCLFFBQWhCLEVBQTBCcEcsSUFBMUIsQ0FBK0J5SCxJQUEvQjtVQUNPLElBQVA7Ozs7MEJBR083RixNQUFNO1FBQ1IsSUFBSXRGLENBQVQsSUFBY3NGLElBQWQsRUFBb0I7U0FDZDhGLEdBQUwsQ0FBU3BMLENBQVQsRUFBWXNGLEtBQUt0RixDQUFMLENBQVo7O1VBRU0sSUFBUDs7Ozt5QkFHTXFMLE9BQU87UUFDUixJQUFJOU0sSUFBSSxDQUFSLEVBQVcrTSxDQUFoQixFQUFtQi9NLElBQUksS0FBS3VMLFVBQUwsQ0FBZ0IsUUFBaEIsRUFBMEJoSixNQUE5QixFQUFzQ3dLLElBQUksS0FBS3hCLFVBQUwsQ0FBZ0IsUUFBaEIsRUFBMEJ2TCxDQUExQixDQUE3RCxFQUEyRkEsR0FBM0YsRUFBZ0c7UUFDM0YrTSxFQUFFSixPQUFGLEtBQWNHLEtBQWQsSUFBdUJDLEVBQUVMLEVBQUYsS0FBU0ksS0FBcEMsRUFBMkM7VUFDckN2QixVQUFMLENBQWdCLFFBQWhCLEVBQTBCWSxNQUExQixDQUFpQ25NLENBQWpDLEVBQW9DLENBQXBDO1lBQ08sSUFBUDs7O1VBR0ssSUFBUDs7OzswQkFHTztRQUNGK0ssVUFBTCxDQUFnQjtZQUNQLEVBRE87VUFFVHFCLGdCQUZTO1VBR1Q7SUFIUDtVQUtPLElBQVA7Ozs7a0NBR2M7VUFDUCxLQUFLYixVQUFMLENBQWdCLGFBQWhCLENBQVA7Ozs7bUNBR3lCO09BQVh6RixHQUFXLHVFQUFMLElBQUs7O1VBQ2xCLEtBQUtpRixVQUFMLENBQWdCLGFBQWhCLEVBQStCakYsR0FBL0IsQ0FBUDs7OztnQ0FHYTtPQUNUa0gsV0FBVyxFQUFmO09BQ0ksS0FBS3pCLFVBQUwsQ0FBZ0IsTUFBaEIsTUFBNEJhLGdCQUFoQyxFQUFrRDtRQUM3QyxDQUFDYSxRQUFMLEVBQWUsT0FBTyxFQUFQO2VBQ0osS0FBS1IsWUFBTCxDQUFrQlMsVUFBVUQsU0FBU0UsUUFBVCxHQUFvQkYsU0FBU0csTUFBdkMsQ0FBbEIsQ0FBWDtlQUNXSixTQUFTdkUsT0FBVCxDQUFpQixTQUFqQixFQUE0QixFQUE1QixDQUFYO2VBQ1csS0FBSzhDLFVBQUwsQ0FBZ0IsTUFBaEIsS0FBMkIsR0FBM0IsR0FBaUN5QixTQUFTdkUsT0FBVCxDQUFpQixLQUFLOEMsVUFBTCxDQUFnQixNQUFoQixDQUFqQixFQUEwQyxFQUExQyxDQUFqQyxHQUFpRnlCLFFBQTVGO0lBSkQsTUFLTztRQUNGLENBQUNLLE1BQUwsRUFBYSxPQUFPLEVBQVA7UUFDVEMsUUFBUUQsT0FBT0osUUFBUCxDQUFnQk0sSUFBaEIsQ0FBcUJELEtBQXJCLENBQTJCLFFBQTNCLENBQVo7ZUFDV0EsUUFBUUEsTUFBTSxDQUFOLENBQVIsR0FBbUIsRUFBOUI7O1VBRU0sS0FBS2IsWUFBTCxDQUFrQk8sUUFBbEIsQ0FBUDs7OztrQ0FHYztPQUNWUSxVQUFTLEtBQUtqQyxVQUFMLENBQWdCLFNBQWhCLENBQWI7T0FDQ3lCLFdBQVUsS0FBS1MsV0FBTCxFQURYO09BRUNDLE9BQU8sS0FBS0MsYUFBTCxFQUZSO09BR0lILFlBQVdSLFFBQVgsSUFBd0IsQ0FBQ1UsSUFBN0IsRUFBbUM7U0FDN0IzQyxVQUFMLENBQWdCLFNBQWhCLEVBQTBCaUMsUUFBMUI7U0FDS1ksS0FBTCxDQUFXWixRQUFYO1NBQ0thLGNBQUw7Ozs7OzhCQUlTOzs7d0JBQ0ZsTCxHQUFSLGlCQUFlQyxTQUFmOzs7OzJCQUdpRDtPQUEzQ2tMLFlBQTJDLHVFQUE1QnhCLDBCQUE0Qjs7UUFDNUN2QixVQUFMLENBQWdCLFNBQWhCLEVBQTJCLEtBQUswQyxXQUFMLEVBQTNCO2lCQUNjLEtBQUtsQyxVQUFMLENBQWdCLFVBQWhCLENBQWQ7UUFDS1IsVUFBTCxDQUFnQixVQUFoQixFQUE0QmdELFlBQVksS0FBS0MsYUFBTCxDQUFtQkMsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBWixFQUEyQ0gsWUFBM0MsQ0FBNUI7VUFDT3ZHLGdCQUFQLENBQXdCLFVBQXhCLEVBQW9DLEtBQUsyRyxTQUFMLENBQWVELElBQWYsQ0FBb0IsSUFBcEIsQ0FBcEM7VUFDTyxJQUFQOzs7O3dCQUdLaE8sR0FBRztPQUNKK00sV0FBVy9NLEtBQUssS0FBS3dOLFdBQUwsRUFBcEI7UUFDSyxJQUFJek4sSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUt1TCxVQUFMLENBQWdCLFFBQWhCLEVBQTBCaEosTUFBOUMsRUFBc0R2QyxHQUF0RCxFQUEyRDtRQUN0RG1JLE9BQU8sS0FBS29ELFVBQUwsQ0FBZ0IsTUFBaEIsSUFBMEIsS0FBS0EsVUFBTCxDQUFnQixRQUFoQixFQUEwQnZMLENBQTFCLEVBQTZCME0sRUFBbEU7UUFDSXlCLFNBQVUsS0FBSzFCLFlBQUwsQ0FBa0JTLFVBQVUvRSxJQUFWLENBQWxCLENBQWQ7UUFDSW1GLFFBQVFOLFNBQVNNLEtBQVQsQ0FBZWEsTUFBZixDQUFaO1FBQ0liLEtBQUosRUFBVztXQUNKN0ssS0FBTjtVQUNLOEksVUFBTCxDQUFnQixRQUFoQixFQUEwQnZMLENBQTFCLEVBQTZCMk0sT0FBN0IsQ0FBcUN5QixLQUFyQyxDQUEyQyxLQUFLQyxJQUFMLElBQWEsRUFBeEQsRUFBNERmLEtBQTVEO1lBQ08sSUFBUDs7O1VBR0ssSUFBUDs7OzsyQkFHUW5GLE1BQU07VUFDUEEsT0FBT0EsSUFBUCxHQUFjLEVBQXJCO1dBQ1EsS0FBS29ELFVBQUwsQ0FBZ0IsTUFBaEIsQ0FBUjtTQUNNYSxnQkFBTDs7Y0FDU3pKLEdBQVIsQ0FBWSxZQUFaLEVBQTBCLEtBQUsyTCxZQUFMLENBQWtCbkcsSUFBbEIsQ0FBMUI7Y0FDUW9HLFNBQVIsQ0FBa0IsSUFBbEIsRUFBd0IsSUFBeEIsRUFBOEIsS0FBS0QsWUFBTCxDQUFrQm5HLElBQWxCLENBQTlCOzs7U0FHSWtFLGFBQUw7O2FBQ1FZLFFBQVAsQ0FBZ0JNLElBQWhCLENBQXFCRCxLQUFyQixDQUEyQixRQUEzQjthQUNPTCxRQUFQLENBQWdCTSxJQUFoQixHQUF1QkYsT0FBT0osUUFBUCxDQUFnQk0sSUFBaEIsQ0FBcUI5RSxPQUFyQixDQUE2QixRQUE3QixFQUF1QyxFQUF2QyxJQUE2QyxHQUE3QyxHQUFtRE4sSUFBMUU7Ozs7VUFJSyxJQUFQOzs7O2lDQUdzQjtPQUFWQSxJQUFVLHVFQUFILEVBQUc7O1VBQ2YsS0FBS29ELFVBQUwsQ0FBZ0IsTUFBaEIsSUFBMEIsS0FBS2tCLFlBQUwsQ0FBa0J0RSxJQUFsQixDQUFqQzs7OztFQXBKc0J1Qzs7QUF3SnhCLGtCQUFlLElBQUk2QixTQUFKLEVBQWY7O0FDN0pBLElBQUlpQyxnQkFBZ0I7TUFDZCxFQURjO1dBRVQsTUFGUztPQUdiLFdBSGE7T0FJYjtDQUpQLENBT0E7O0lDUE1DO3FCQUNRQyxpQkFBYixFQUFnQzs7O09BQzFCQyxJQUFMLEdBQVksRUFBWjtPQUNLQyxHQUFMLEdBQVcsSUFBWDtPQUNLRixpQkFBTCxHQUF5QkEscUJBQXFCLENBQTlDO1NBQ08sSUFBUDs7Ozs7d0JBR0k7UUFDQ0UsR0FBTCxHQUFXdkIsT0FBT1UsV0FBUCxDQUFtQixLQUFLSCxLQUFMLENBQVdLLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBbkIsRUFBMEMsT0FBTyxLQUFLUyxpQkFBdEQsQ0FBWDs7OzswQkFHTTtPQUNGLEtBQUtHLFVBQVQsRUFBb0I7O0lBQXBCLE1BQ0k7UUFDQyxLQUFLRixJQUFMLENBQVVwTSxNQUFWLEdBQW1CLENBQXZCLEVBQXlCO1VBQ25Cc00sVUFBTCxHQUFrQixJQUFsQjtTQUNJQyxTQUFTLEtBQUtILElBQUwsQ0FBVWxNLEtBQVYsRUFBYjs7Ozs7Ozt5QkFNRztRQUNBb00sVUFBTCxHQUFrQixLQUFsQjs7OztzQkFHR2pMLE1BQUs7UUFDSCtLLElBQUwsQ0FBVXhKLElBQVYsQ0FBZXZCLElBQWY7Ozs7MEJBR007VUFDQ21MLGFBQVAsQ0FBcUIsS0FBS0gsR0FBMUI7Ozs7MkJBR087UUFDRkksR0FBTDs7OztJQUlGOztJQ2pDTUM7OztpQkFDTzFMLE9BQVosRUFBcUI7Ozs7Ozs7UUFFZjBILFVBQUwsQ0FBZ0J6RCxVQUFVM0IsTUFBVixDQUFpQjJJLGFBQWpCLEVBQWdDakwsT0FBaEMsQ0FBaEI7UUFDS29MLElBQUwsR0FBWSxJQUFJRixVQUFKLENBQWUsTUFBS25ELFVBQUwsQ0FBZ0IsS0FBaEIsQ0FBZixDQUFaO1FBQ0txRCxJQUFMLENBQVVLLEdBQVY7Ozs7OzswQkFJTzNNLE9BQU87VUFDUEEsTUFBTStILElBQU4sQ0FBVyxHQUFYLENBQVA7Ozs7OEJBR1czSixRQUFRQyxLQUFLd08sSUFBSXZPLE1BQU13TyxNQUFNQyxLQUFJOzs7VUFDckMsSUFBSXhPLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7V0FDbEM2TixJQUFMLENBQVU5QixHQUFWLENBQ0MsT0FBS3dDLFdBQUwsQ0FBaUJwQixJQUFqQixTQUE0QnhOLE1BQTVCLEVBQW9DQyxHQUFwQyxFQUF5Q3dPLEVBQXpDLEVBQTZDdk8sSUFBN0MsRUFBbUQsVUFBQzJPLFVBQUQsRUFBZ0I7YUFDMURILEtBQUtHLFVBQUwsQ0FBUjthQUNRQSxVQUFSO0tBRkQsRUFHRyxVQUFDQyxjQUFELEVBQW9CO1lBQ2ZILElBQUlHLGNBQUosQ0FBUDtZQUNPQSxjQUFQO0tBTEQsQ0FERDtJQURNLENBQVA7Ozs7OEJBYVc5TyxRQUFRQyxLQUFLd08sSUFBSXZPLE1BQU13TyxNQUFNQyxLQUFLOzs7YUFDbkN6TSxHQUFWLENBQWMsZ0JBQWQsRUFBZ0NsQyxNQUFoQyxFQUF3Q0MsR0FBeEMsRUFBNkN3TyxFQUE3QzthQUNVTSxXQUFWLENBQXNCL08sTUFBdEIsRUFBOEJDLEdBQTlCLEVBQW1DQyxJQUFuQyxFQUNFOE8sSUFERixDQUNPLFVBQUNqTyxRQUFELEVBQWM7Y0FDVG1CLEdBQVYsQ0FBYyxxQkFBZCxFQUFxQ2xDLE1BQXJDLEVBQTZDQyxHQUE3QyxFQUFrRHdPLEVBQWxELEVBQXNEMU4sUUFBdEQ7V0FDS21OLElBQUwsQ0FBVWUsSUFBVjtjQUNVL00sR0FBVixDQUFjLGtCQUFkO1lBQ1F3TSxLQUFLM04sUUFBTCxDQUFSO0lBTEYsRUFPRW1PLEtBUEYsQ0FPUSxVQUFDQyxJQUFELEVBQU9wTyxRQUFQLEVBQW9CO2NBQ2hCcUIsS0FBVixDQUFnQixnQkFBaEIsRUFBa0NwQyxNQUFsQyxFQUEwQ0MsR0FBMUMsRUFBK0N3TyxFQUEvQyxFQUFtRDFOLFFBQW5EO1dBQ0ttTixJQUFMLENBQVVlLElBQVY7Y0FDVS9NLEdBQVYsQ0FBYyxpQkFBZDtXQUNPeU0sSUFBSTVOLFFBQUosQ0FBUDtJQVhGOzs7O3lCQWVNcUQsS0FBS3NLLE1BQU1DLEtBQUs7OztVQUNmLElBQUl4TyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO2NBQzdCNkIsR0FBVixDQUFjLFFBQWQ7UUFDSXVNLEtBQUtySyxJQUFJZ0wsS0FBSixFQUFUO1FBQ0NDLFlBQVlqTCxJQUFJa0wsWUFBSixFQURiO1FBRUNyUCxNQUFNLE9BQUtzUCxPQUFMLENBQWEsQ0FBQyxPQUFLMUUsVUFBTCxDQUFnQixNQUFoQixDQUFELEVBQTBCd0UsU0FBMUIsRUFBcUNaLEVBQXJDLENBQWIsQ0FGUDtRQUdDdk8sT0FBT2tFLElBQUlvTCxPQUFKLEVBSFI7V0FJS3RCLElBQUwsQ0FBVTlCLEdBQVYsQ0FDQyxPQUFLd0MsV0FBTCxDQUFpQnBCLElBQWpCLFNBQTRCLE1BQTVCLEVBQW9Ddk4sR0FBcEMsRUFBeUN3TyxFQUF6QyxFQUE2Q3ZPLElBQTdDLEVBQW1ELFVBQUMyTyxVQUFELEVBQWdCO2VBQ3hEWSxRQUFWLEdBQXFCQyxRQUFyQixDQUE4QmIsVUFBOUI7YUFDUUgsS0FBS0csVUFBTCxDQUFSO2FBQ1FBLFVBQVI7S0FIRCxFQUlHLFVBQUNDLGNBQUQsRUFBb0I7ZUFDWjVNLEdBQVYsQ0FBYyxlQUFkO1lBQ095TSxJQUFJRyxjQUFKLENBQVA7WUFDT0EsY0FBUDtLQVBELENBREQ7SUFOTSxDQUFQOzs7O3NCQW9CRzFLLEtBQUtzSyxNQUFNQyxLQUFLOzs7VUFDWixJQUFJeE8sT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtRQUNuQ2dQLFlBQVlqTCxJQUFJa0wsWUFBSixFQUFoQjtRQUNDcFAsT0FBT2tFLElBQUlvTCxPQUFKLEVBRFI7UUFFQ3ZQLE1BQU0sT0FBS3NQLE9BQUwsQ0FBYSxDQUFDLE9BQUsxRSxVQUFMLENBQWdCLE1BQWhCLENBQUQsRUFBMEJ3RSxTQUExQixDQUFiLENBRlA7V0FHS25CLElBQUwsQ0FBVTlCLEdBQVYsQ0FDQyxPQUFLd0MsV0FBTCxDQUFpQnBCLElBQWpCLFNBQTRCLEtBQTVCLEVBQW1Ddk4sR0FBbkMsRUFBd0MsSUFBeEMsRUFBOENDLElBQTlDLEVBQW9ELFVBQUMyTyxVQUFELEVBQWdCO2VBQ3pEWSxRQUFWLEdBQXFCQyxRQUFyQixDQUE4QmIsVUFBOUI7YUFDUUgsS0FBS0csVUFBTCxDQUFSO2FBQ1FBLFVBQVI7S0FIRCxFQUlHLFVBQUNDLGNBQUQsRUFBb0I7ZUFDWjVNLEdBQVYsQ0FBYyxhQUFkO1lBQ095TSxJQUFJRyxjQUFKLENBQVA7WUFDT0EsY0FBUDtLQVBELENBREQ7SUFKTSxDQUFQOzs7O3NCQWtCRzFLLEtBQUtzSyxNQUFNQyxLQUFLOzs7VUFDWixJQUFJeE8sT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtRQUNuQ29PLEtBQUtySyxJQUFJZ0wsS0FBSixFQUFUO1FBQ0NDLFlBQVlqTCxJQUFJa0wsWUFBSixFQURiO1FBRUNyUCxNQUFNLE9BQUtzUCxPQUFMLENBQWEsQ0FBQyxPQUFLMUUsVUFBTCxDQUFnQixNQUFoQixDQUFELEVBQTBCd0UsU0FBMUIsRUFBcUNaLEVBQXJDLENBQWIsQ0FGUDtXQUdLUCxJQUFMLENBQVU5QixHQUFWLENBQ0MsT0FBS3dDLFdBQUwsQ0FBaUJwQixJQUFqQixTQUE0QixLQUE1QixFQUFtQ3ZOLEdBQW5DLEVBQXdDd08sRUFBeEMsRUFBNEMsSUFBNUMsRUFBa0QsVUFBQ0ksVUFBRCxFQUFnQjthQUN6REgsS0FBS0csVUFBTCxDQUFSO2FBQ1FBLFVBQVI7S0FGRCxFQUdHLFVBQUNDLGNBQUQsRUFBb0I7ZUFDWjVNLEdBQVYsQ0FBYyxZQUFkO1lBQ095TSxJQUFJRyxjQUFKLENBQVA7WUFDT0EsY0FBUDtLQU5ELENBREQ7SUFKTSxDQUFQOzs7O3VCQWlCSTFLLEtBQUtzSyxNQUFNQyxLQUFLOzs7VUFDYixJQUFJeE8sT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtRQUNuQ2dQLFlBQVlqTCxJQUFJa0wsWUFBSixFQUFoQjtRQUNDclAsTUFBTSxPQUFLc1AsT0FBTCxDQUFhLENBQUMsT0FBSzFFLFVBQUwsQ0FBZ0IsTUFBaEIsQ0FBRCxFQUEwQndFLFNBQTFCLENBQWIsQ0FEUDtXQUVLbkIsSUFBTCxDQUFVOUIsR0FBVixDQUNDLE9BQUt3QyxXQUFMLENBQWlCcEIsSUFBakIsU0FBNEIsS0FBNUIsRUFBbUN2TixHQUFuQyxFQUF3QyxJQUF4QyxFQUE4QyxJQUE5QyxFQUFvRCxVQUFDNE8sVUFBRCxFQUFnQjthQUMzREgsS0FBS0csVUFBTCxDQUFSO2FBQ1FBLFVBQVI7S0FGRCxFQUdHLFVBQUNDLGNBQUQsRUFBb0I7ZUFDWjVNLEdBQVYsQ0FBYyxhQUFkO1lBQ095TSxJQUFJRyxjQUFKLENBQVA7WUFDT0EsY0FBUDtLQU5ELENBREQ7SUFITSxDQUFQOzs7OzBCQWdCTTFLLEtBQUtzSyxNQUFNQyxLQUFLOzs7VUFDZixJQUFJeE8sT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtRQUNuQ29PLEtBQUtySyxJQUFJZ0wsS0FBSixFQUFUO1FBQ0NDLFlBQVlqTCxJQUFJa0wsWUFBSixFQURiO1FBRUNyUCxNQUFNLE9BQUtzUCxPQUFMLENBQWEsQ0FBQyxPQUFLMUUsVUFBTCxDQUFnQixNQUFoQixDQUFELEVBQTBCd0UsU0FBMUIsRUFBcUNaLEVBQXJDLENBQWIsQ0FGUDtXQUdLUCxJQUFMLENBQVU5QixHQUFWLENBQ0MsT0FBS3dDLFdBQUwsQ0FBaUJwQixJQUFqQixTQUE0QixRQUE1QixFQUFzQ3ZOLEdBQXRDLEVBQTJDd08sRUFBM0MsRUFBK0MsSUFBL0MsRUFBcUQsVUFBQ0ksVUFBRCxFQUFnQjtlQUMxRFksUUFBVixHQUFxQkMsUUFBckIsQ0FBOEJiLFVBQTlCO2FBQ1FILEtBQUtHLFVBQUwsQ0FBUjthQUNRQSxVQUFSO0tBSEQsRUFJRyxVQUFDQyxjQUFELEVBQW9CO2VBQ1o1TSxHQUFWLENBQWMsZUFBZDtZQUNPeU0sSUFBSUcsY0FBSixDQUFQO1lBQ09BLGNBQVA7S0FQRCxDQUREO0lBSk0sQ0FBUDs7OzsrQkFrQllhLE9BQU87VUFDWixLQUFLOUUsVUFBTCxDQUFnQixNQUFoQixJQUEwQixLQUFLQSxVQUFMLENBQWdCLFFBQWhCLENBQTFCLEdBQXNEOEUsS0FBdEQsR0FBNERBLE1BQU1QLEtBQU4sRUFBNUQsR0FBMEUsRUFBakY7Ozs7RUEzSW9CbkYsU0ErSXRCOztJQ3JKcUIyRjs7O3FCQUNQOzs7Ozs7RUFEd0IzRjs7QUNEdEMsSUFBTTRGLDhCQUE4QixJQUFwQztJQUNDQyxlQUFlLElBRGhCO0lBRUNDLGlDQUFpQyxHQUZsQztJQUdDQyx5Q0FBeUMsSUFIMUM7SUFJQ0Msc0JBQXNCLGdCQUp2QjtJQUtDQyxpQkFBaUIsV0FMbEI7SUFNQ0MsaUJBQWlCLE9BTmxCO0lBT0NDLHNCQUFzQixZQVB2Qjs7QUFTQSxJQUFNQyxPQUFPO3lEQUFBOzJCQUFBOytEQUFBOytFQUFBOytCQUFBO3lDQUFBOytCQUFBOztDQUFiLENBV0E7O0FDakJBLElBQU1DLGFBQWEvTixPQUFPLE9BQVAsQ0FBbkI7O0lBRU1nTzs7OzZCQUVTOzs7Ozs7O1FBRVJELFVBQUwsSUFBbUIsRUFBbkI7UUFDS2hHLFVBQUwsQ0FBZ0IsU0FBaEIsRUFBMkIsRUFBM0I7UUFDS2tHLGFBQUw7UUFDS0MsUUFBTDs7Ozs7O2tDQUljO09BQ1Z6UCxJQUFJVSxTQUFTZ1AsYUFBVCxDQUF1QixPQUF2QixDQUFSO0tBQ0VDLFNBQUYsR0FBY04sS0FBS1AsWUFBTCxHQUFvQixrQkFBbEM7WUFDU2MsSUFBVCxDQUFjQyxXQUFkLENBQTBCN1AsQ0FBMUI7Ozs7NkJBR1U7YUFDQXlQLFFBQVYsQ0FBbUIsZUFBbkIsRUFBb0MsSUFBcEM7Ozs7dUJBR0lLLEtBQUs7UUFDSnhHLFVBQUwsQ0FBZ0IsU0FBaEIsRUFBMkIsRUFBM0I7UUFDSyxJQUFJL0ssQ0FBVCxJQUFjdVIsR0FBZCxFQUFtQjtTQUNiQyxPQUFMLENBQWF4UixDQUFiLEVBQWdCdVIsSUFBSXZSLENBQUosQ0FBaEI7Ozs7OzBCQUlNb0UsS0FBSzFELEtBQUt1TCxVQUFVO09BQ3ZCd0YsV0FBVyxJQUFJelEsY0FBSixFQUFmO1lBQ1NDLElBQVQsQ0FBYyxLQUFkLEVBQXFCUCxHQUFyQjtZQUNTNkcsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0MsVUFBUy9GLFFBQVQsRUFBbUI7UUFDaERrUSxNQUFNdlAsU0FBU2dQLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBVjtRQUNJUSxPQUFKLENBQVlDLGVBQVosR0FBOEJ4TixHQUE5QjtRQUNJdU4sT0FBSixDQUFZRSxjQUFaLEdBQTZCblIsR0FBN0I7UUFDSTBRLFNBQUosR0FBZ0I1UCxTQUFTc1EsVUFBVCxDQUFvQmhRLFlBQXBDO1NBQ0tpUSxNQUFMLENBQVkzTixHQUFaLEVBQWlCc04sR0FBakI7Z0JBQ1l6RixTQUFTN0gsR0FBVCxFQUFjMUQsR0FBZCxFQUFtQmdSLEdBQW5CLENBQVo7SUFOaUMsQ0FRaEN6RCxJQVJnQyxDQVEzQixJQVIyQixDQUFsQztZQVNTck0sSUFBVDs7OztnQ0FHWTtPQUNSLEtBQUsySixVQUFMLENBQWdCLFNBQWhCLEVBQTJCaEosTUFBM0IsS0FBc0MsQ0FBMUMsRUFBNkM7U0FDdkM4RyxPQUFMLENBQWEsUUFBYjs7Ozs7eUJBSUtqRixLQUFLNE4sU0FBUztRQUNmakIsVUFBTCxFQUFpQjNNLEdBQWpCLElBQXdCNE4sT0FBeEI7Ozs7c0JBR0c1TixLQUFLO1VBQ0QsS0FBSzJNLFVBQUwsRUFBaUI3USxjQUFqQixDQUFnQ2tFLEdBQWhDLElBQXVDLEtBQUsyTSxVQUFMLEVBQWlCM00sR0FBakIsRUFBc0I2TixTQUF0QixDQUFnQyxJQUFoQyxDQUF2QyxHQUErRSxJQUF0Rjs7Ozs2QkFHUztVQUNGdk8sT0FBT08sSUFBUCxDQUFZLEtBQUs4TSxVQUFMLENBQVosQ0FBUDs7OzsyQkFHUXJRLEtBQUs7UUFDUixJQUFJVixDQUFULElBQWMsS0FBSytRLFVBQUwsQ0FBZCxFQUFnQztRQUMzQixLQUFLQSxVQUFMLEVBQWlCL1EsQ0FBakIsRUFBb0JNLEdBQXBCLElBQTJCSSxHQUEvQixFQUFvQztZQUM1QixLQUFLYixHQUFMLENBQVNHLENBQVQsQ0FBUDs7O1VBR0ssSUFBUDs7Ozs7Ozs7NEJBTVNvRSxLQUFJO09BQ1QzQyxJQUFJLEtBQUs4SixVQUFMLENBQWdCLFNBQWhCLEVBQTJCaEwsT0FBM0IsQ0FBbUM2RCxHQUFuQyxDQUFSO09BQ0kzQyxJQUFJLENBQUMsQ0FBVCxFQUFZO1NBQ044SixVQUFMLENBQWdCLFNBQWhCLEVBQTJCWSxNQUEzQixDQUFrQzFLLENBQWxDLEVBQXFDLENBQXJDOztRQUVJOEosVUFBTCxDQUFnQixRQUFoQixFQUEwQnBHLElBQTFCLENBQStCLEtBQS9COzs7O3VCQUdJZixLQUFLMUQsS0FBSzBRLFdBQVU7T0FDcEJjLE9BQU8vUCxTQUFTZ1AsYUFBVCxDQUF1QkwsS0FBS1AsWUFBNUIsQ0FBWDtRQUNLdk8sSUFBTCxHQUFZb0MsR0FBWjtRQUNLOUQsR0FBTCxHQUFXSSxHQUFYO1FBQ0swUSxTQUFMLEdBQWlCQSxTQUFqQjtVQUNPYyxJQUFQOzs7OzJCQUdRQyxNQUFLO09BQ1RELE9BQU8vUCxTQUFTZ1AsYUFBVCxDQUF1QixLQUF2QixDQUFYO09BQ0kzSyxTQUFTLEVBQWI7UUFDSzRLLFNBQUwsR0FBaUJlLElBQWpCO09BQ0lDLHVCQUF1QkYsS0FBS3BMLGdCQUFMLENBQXNCZ0ssS0FBS1AsWUFBM0IsQ0FBM0I7UUFDSSxJQUFJOEIsT0FBTSxDQUFkLEVBQWlCQSxPQUFNRCxxQkFBcUI3UCxNQUE1QyxFQUFvRDhQLE1BQXBELEVBQTJEO1FBQ3REMUwsS0FBS3lMLHFCQUFxQkMsSUFBckIsQ0FBVDtRQUNJMUwsR0FBRzJMLFVBQUgsS0FBa0JKLElBQXRCLEVBQTJCO1NBQ3RCdkwsR0FBR08sVUFBSCxDQUFjbEYsSUFBZCxJQUFzQjJFLEdBQUdPLFVBQUgsQ0FBY2xGLElBQWQsQ0FBbUJFLEtBQTdDLEVBQW1EO2FBQzNDeUUsR0FBR08sVUFBSCxDQUFjbEYsSUFBZCxDQUFtQkUsS0FBMUIsSUFBbUN5RSxFQUFuQzs7OztVQUlJSCxNQUFQOzs7O3lCQUdNK0wsS0FBSTtRQUNOLElBQUk5USxDQUFSLElBQWE4USxHQUFiLEVBQWlCO1NBQ1hSLE1BQUwsQ0FBWXRRLENBQVosRUFBZThRLElBQUk5USxDQUFKLENBQWY7O1VBRU0sSUFBUDs7Ozs2QkFHVTJDLEtBQUsxRCxLQUFLOzs7O1VBQ2IsSUFBSUUsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFvQjtRQUNsQyxPQUFLakIsR0FBTCxDQUFTdUUsR0FBVCxDQUFKLEVBQWtCO2FBQ1QsT0FBS3ZFLEdBQUwsQ0FBU3VFLEdBQVQsQ0FBUjtLQURELE1BRUs7O2VBRU1vTyxPQUFWLENBQWtCOVIsR0FBbEIsRUFDRStPLElBREYsQ0FDTyxVQUFDZ0QsaUJBQUQsRUFBcUI7VUFDdEJDLGlCQUFpQixPQUFLQyxJQUFMLENBQVV2TyxHQUFWLEVBQWUxRCxHQUFmLEVBQW9CK1IsaUJBQXBCLENBQXJCO2FBQ0tWLE1BQUwsQ0FBWTNOLEdBQVosRUFBaUJzTyxjQUFqQjtjQUNRLE9BQUs3UyxHQUFMLENBQVN1RSxHQUFULENBQVI7TUFKRixFQUtJdUwsS0FMSixDQUtVLFlBQUk7Z0JBQ0Y5TSxLQUFWLENBQWdCLHdCQUFoQixFQUEwQ3VCLEdBQTFDLEVBQStDMUQsR0FBL0M7O01BTkY7O0lBTEssQ0FBUDs7OztnQ0FrQmFBLEtBQUs7Ozs7VUFDWCxJQUFJRSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO2NBQzdCMFIsT0FBVixDQUFrQjlSLEdBQWxCLEVBQ0UrTyxJQURGLENBQ08sVUFBQ21ELGFBQUQsRUFBaUI7U0FDbEJDLFlBQVksT0FBS0MsUUFBTCxDQUFjRixhQUFkLENBQWhCO1lBQ0tHLE1BQUwsQ0FBWUYsU0FBWjthQUNRQSxTQUFSO0tBSkYsRUFLSWxELEtBTEosQ0FLVSxVQUFDNU4sQ0FBRCxFQUFLO2VBQ0hjLEtBQVYsQ0FBZ0IsNkJBQWhCLEVBQStDbkMsR0FBL0MsRUFBbURxQixDQUFuRDs7S0FORjtJQURNLENBQVA7Ozs7a0NBYWVpUixtQkFBa0I7T0FDN0JyTSxLQUFNLE9BQU9xTSxpQkFBUCxLQUE2QixRQUE5QixHQUF3QzdRLFNBQVM4USxhQUFULENBQXVCRCxpQkFBdkIsQ0FBeEMsR0FBa0ZBLGlCQUEzRjtPQUNJck0sR0FBR08sVUFBSCxDQUFjbEYsSUFBZCxJQUFzQjJFLEdBQUdPLFVBQUgsQ0FBY2xGLElBQWQsQ0FBbUJFLEtBQTdDLEVBQW1EO1FBQzlDeUUsR0FBR3VNLE9BQUgsQ0FBVzdNLFdBQVgsT0FBNkJ5SyxLQUFLUCxZQUFMLENBQWtCbEssV0FBbEIsRUFBakMsRUFBaUU7VUFDM0QwTCxNQUFMLENBQVlwTCxHQUFHTyxVQUFILENBQWNsRixJQUFkLENBQW1CRSxLQUEvQixFQUFzQ3lFLEVBQXRDOzs7VUFHSyxJQUFQOzs7OzhCQUdXdkMsS0FBS3FPLG1CQUFrQjtPQUM5QkMsaUJBQWlCLEtBQUtDLElBQUwsQ0FBVXZPLEdBQVYsRUFBZSxFQUFmLEVBQW1CcU8saUJBQW5CLENBQXJCO1FBQ0tWLE1BQUwsQ0FBWTNOLEdBQVosRUFBaUJzTyxjQUFqQjtVQUNPLElBQVA7Ozs7RUE5SjZCaEk7O0FBa0svQix5QkFBZSxJQUFJc0csZ0JBQUosRUFBZjs7QUNuS0EsSUFBTW1DLHdDQUF3QyxDQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWMsSUFBZCxDQUE5Qzs7SUFFcUJDOzs7dUJBQ1JDLFFBQVosRUFBc0I7Ozs7Ozs7UUFFaEJBLFFBQUwsR0FBZ0JBLFFBQWhCOzs7Ozs7K0JBSVkzTixNQUFNQyxNQUFNO09BQ3BCcUUsV0FBVyxFQUFmO1FBQ0tBLFFBQUwsSUFBaUJyRSxJQUFqQixFQUF1QjtRQUNsQkEsS0FBS3pGLGNBQUwsQ0FBb0I4SixRQUFwQixDQUFKLEVBQW1DO1VBQzdCQSxRQUFMLElBQWlCckUsS0FBS3FFLFFBQUwsQ0FBakI7OztVQUdLdEUsSUFBUDs7Ozs0QkFHUzROLE1BQU1DLFFBQVFDLFlBQVk7T0FDL0JDLFdBQVcsVUFBZjtPQUNDQyxZQUFZLEVBRGI7VUFFT0osS0FBSy9TLE9BQUwsQ0FBYWtULFFBQWIsSUFBeUIsQ0FBQyxDQUFqQyxFQUFvQztRQUMvQkUsTUFBTUwsS0FBSy9TLE9BQUwsQ0FBYWtULFFBQWIsQ0FBVjtRQUNJRyxNQUFNSCxTQUFTbFIsTUFBbkI7UUFDSXNSLE9BQU9QLEtBQUsvUyxPQUFMLENBQWEsR0FBYixDQUFYO1FBQ0l1VCxhQUFhSCxNQUFNQyxHQUF2QjtRQUNJRyxXQUFXRixJQUFmO2dCQUNZUCxLQUFLbE4sS0FBTCxDQUFXME4sVUFBWCxFQUF1QkMsUUFBdkIsQ0FBWjtRQUNJTCxhQUFhLEVBQWpCLEVBQXFCO1dBQ2RKLEtBQUs3SyxPQUFMLENBQWEsYUFBYWlMLFNBQWIsR0FBeUIsR0FBdEMsRUFBMkNILE9BQU9TLE9BQVAsQ0FBZU4sU0FBZixDQUEzQyxDQUFQOztVQUVNSixLQUFLN0ssT0FBTCxDQUFhLFlBQWIsRUFBMkIsS0FBSzRLLFFBQUwsQ0FBY2pELEtBQXpDLENBQVA7VUFDT2tELEtBQUs3SyxPQUFMLENBQWEsYUFBYixFQUE0QitLLFVBQTVCLENBQVA7VUFDT0YsSUFBUDs7Ozt5QkFHTUMsUUFBUVUsWUFBWVQsWUFBWTtPQUNsQ0YsT0FBTyxLQUFLWSxTQUFMLENBQWUsS0FBS2IsUUFBTCxDQUFjM1MsR0FBN0IsRUFBa0M2UyxNQUFsQyxFQUEwQ0MsVUFBMUMsS0FBMERTLFdBQVcvVCxjQUFYLENBQTBCLFNBQTFCLENBQUQsR0FBeUMsS0FBS2dVLFNBQUwsQ0FBZUQsV0FBV0UsT0FBMUIsRUFBbUNaLE1BQW5DLEVBQTJDQyxVQUEzQyxDQUF6QyxHQUFrRyxFQUEzSixDQUFYO1VBQ09GLElBQVA7Ozs7d0JBR0tDLFFBQVFVLFlBQVlULFlBQVk7T0FDakNZLGlCQUFKO09BQ0NyTixPQUFPb00scUNBRFI7T0FFSWMsV0FBVy9ULGNBQVgsQ0FBMEIsT0FBMUIsS0FBc0MrVCxXQUFXSSxLQUFyRCxFQUEyRDtXQUNuRCxDQUFDSixXQUFXSSxLQUFaLEVBQW1CQyxNQUFuQixDQUEwQm5CLHFDQUExQixDQUFQOzs7Ozs7O3lCQUVZcE0sSUFBYiw4SEFBa0I7U0FBVnRGLENBQVU7O1NBQ2Q4UixPQUFPclQsY0FBUCxDQUFzQnVCLENBQXRCLENBQUgsRUFBNEI7aUJBQ2hCOFIsT0FBTzlSLENBQVAsQ0FBWDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQUlLMlMsUUFBUDs7OztvQ0FHaUI7VUFDVixLQUFLRyxVQUFMLEtBQW9CN1EsT0FBT08sSUFBUCxDQUFZLEtBQUtzUSxVQUFMLEVBQVosRUFBK0JoUyxNQUFuRCxHQUE0RCxDQUFuRTs7OzsrQkFHWTtVQUNMLEtBQUs4USxRQUFMLElBQWlCLEtBQUtBLFFBQUwsQ0FBY21CLE9BQS9CLEdBQXVDLEtBQUtuQixRQUFMLENBQWNtQixPQUFyRCxHQUErRCxFQUF0RTs7Ozs0QkFHU3BRLEtBQUtsQyxPQUFPO09BQ2pCMkMsTUFBTSxFQUFWO09BQ0lULEdBQUosSUFBV2xDLEtBQVg7VUFDTyxLQUFLdVMsU0FBTCxDQUFlNVAsR0FBZixDQUFQOzs7OzRCQUdTNlAsWUFBWTtRQUNoQkMsYUFBTCxDQUFtQixRQUFuQixFQUE2QkQsVUFBN0I7VUFDTyxJQUFQOzs7OzhCQUdXO1VBQ0osS0FBS0UsYUFBTCxDQUFtQixRQUFuQixDQUFQOzs7OzRCQUdTQyxZQUFZO1FBQ2hCRixhQUFMLENBQW1CLFFBQW5CLEVBQTZCRSxVQUE3QjtVQUNPLElBQVA7Ozs7OEJBR1c7VUFDSixLQUFLRCxhQUFMLENBQW1CLFFBQW5CLENBQVA7Ozs7Z0NBR2FFLFlBQVk7UUFDcEJILGFBQUwsQ0FBbUIsWUFBbkIsRUFBaUNHLFVBQWpDO1VBQ08sSUFBUDs7Ozs4QkFHV0MsVUFBVTtRQUNoQkosYUFBTCxDQUFtQixVQUFuQixFQUErQkksUUFBL0I7VUFDTyxJQUFQOzs7OzJCQUdRQSxVQUFVRCxZQUFZO1FBQ3pCSCxhQUFMLENBQW1CLFVBQW5CLEVBQStCSSxRQUEvQixFQUF5Q0osYUFBekMsQ0FBdUQsWUFBdkQsRUFBcUVHLFVBQXJFO1VBQ08sSUFBUDs7Ozs2QkFHVTtVQUNIO2NBQ0ksS0FBS0YsYUFBTCxDQUFtQixVQUFuQixDQURKO2dCQUVNLEtBQUtBLGFBQUwsQ0FBbUIsWUFBbkI7SUFGYjs7OztnQ0FNYUksV0FBV0MsWUFBWTtPQUNoQyxLQUFLM0osVUFBTCxFQUFKLEVBQXVCO1NBQ2pCTCxVQUFMLENBQWdCK0osU0FBaEIsRUFBMkJDLFVBQTNCOztVQUVNLElBQVA7Ozs7Z0NBR2FELFdBQVc7VUFDakIsS0FBSzFKLFVBQUwsQ0FBZ0IwSixTQUFoQixFQUEyQixJQUEzQixDQUFQOzs7O2lDQUdjO1VBQ1AsUUFBUSxLQUFLM0IsUUFBYixHQUF3QixLQUFLQSxRQUFMLENBQWNqRCxLQUF0QyxHQUE4QyxJQUFyRDs7OztnQ0FHYW9ELFlBQVk7VUFDbEIsS0FBS2UsVUFBTCxNQUFxQixLQUFLQSxVQUFMLEdBQWtCZixVQUFsQixDQUFyQixHQUFxRCxLQUFLZSxVQUFMLEdBQWtCZixVQUFsQixDQUFyRCxHQUFxRixJQUE1Rjs7Ozs7OzswQkFJT0QsUUFBUUMsWUFBWTtPQUN2QlMsYUFBYSxLQUFLaUIsYUFBTCxDQUFtQjFCLFVBQW5CLENBQWpCO09BQ0N0RSxLQUFLLEtBQUtpRyxLQUFMLENBQVc1QixNQUFYLEVBQW1CVSxVQUFuQixFQUErQlQsVUFBL0IsQ0FETjtPQUVDOVMsTUFBTSxLQUFLMFUsTUFBTCxDQUFZN0IsTUFBWixFQUFvQlUsVUFBcEIsRUFBZ0NULFVBQWhDLENBRlA7VUFHT2hNLFVBQVVyRSxNQUFWLEdBQW1Ca1MsV0FBbkIsQ0FBK0JwQixXQUFXeFQsTUFBMUMsRUFBa0RDLEdBQWxELEVBQXVEd08sRUFBdkQsRUFBMkRvRyxLQUFLQyxTQUFMLENBQWVoQyxPQUFPck8sT0FBUCxFQUFmLENBQTNELEVBQTZGLEtBQUtzUSxNQUFMLENBQVl2SCxJQUFaLENBQWlCLEVBQUNnRyxzQkFBRCxFQUFhWixVQUFVLEtBQUtBLFFBQTVCLEVBQWpCLENBQTdGLENBQVA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFvQ00xUyxNQUFLO09BQ1IsUUFBUSxLQUFLc1QsVUFBYixJQUEyQixLQUFLQSxVQUFMLENBQWdCL1QsY0FBaEIsQ0FBK0IsU0FBL0IsQ0FBM0IsSUFBd0UsS0FBSytULFVBQUwsQ0FBZ0JySyxPQUEzRixFQUFvRztTQUMvRixJQUFJbkksSUFBSSxDQUFaLEVBQWVBLElBQUlkLEtBQUs0QixNQUF4QixFQUFnQ2QsR0FBaEMsRUFBb0M7VUFDOUJBLENBQUwsSUFBVSxJQUFJZ1UsU0FBSixDQUFjLEtBQUtwQyxRQUFuQixFQUE2QjFTLEtBQUtjLENBQUwsQ0FBN0IsQ0FBVjs7SUFGRixNQUlPO1dBQ0MsSUFBSWdVLFNBQUosQ0FBYyxLQUFLcEMsUUFBbkIsRUFBNkIxUyxJQUE3QixDQUFQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEvS3VDK0o7O0FDRDFDLElBQU1nTCxpQkFBaUIxUyxPQUFPLFdBQVAsQ0FBdkI7SUFDQzJTLGFBQWEzUyxPQUFPLE9BQVAsQ0FEZDtJQUVDNFMsY0FBYzVTLE9BQU8sUUFBUCxDQUZmO0lBR0M2UyxxQkFBcUI3UyxPQUFPLGVBQVAsQ0FIdEI7SUFJQzhTLFdBQVcsQ0FBQyxTQUFELEVBQVksVUFBWixFQUF3QixZQUF4QixFQUFzQyxVQUF0QyxFQUFrRCxhQUFsRCxFQUFpRSxTQUFqRSxFQUE0RSxVQUE1RSxFQUF3RixTQUF4RixFQUFtRyxTQUFuRyxFQUE4RyxTQUE5RyxFQUF5SCxJQUF6SCxFQUErSCxLQUEvSCxFQUFzSSxTQUF0SSxDQUpaO0lBS0NDLHdCQUF3QixHQUx6QjtJQU1DQyxzQkFBc0IsQ0FOdkI7SUFPQ0Msb0JBQW9CLEVBUHJCO0lBUUNDLHNCQUFzQmxULE9BQU8sY0FBUCxDQVJ2Qjs7QUFVQSxJQUFJbVQseUJBQXlCLFNBQXpCQSxzQkFBeUIsQ0FBU0MsS0FBVCxFQUFnQjtRQUNyQztPQUNELFVBQVN2UyxNQUFULEVBQWlCTyxHQUFqQixFQUFzQmlTLE9BQXRCLEVBQStCOztPQUUvQmpTLFFBQVEsU0FBWixFQUF1QjtXQUNmLElBQVA7O09BRUdrUyxZQUFZelMsTUFBaEI7T0FDSSxRQUFPTyxHQUFQLHlDQUFPQSxHQUFQLE9BQWUsUUFBbkIsRUFBNkI7UUFDeEIsS0FBS0EsR0FBTCxDQUFKLEVBQWU7aUJBQ0YsSUFBWjs7SUFGRixNQUlPO1FBQ0ZWLE9BQU9PLElBQVAsQ0FBWSxJQUFaLEVBQWtCMUQsT0FBbEIsQ0FBMEI2RCxHQUExQixJQUFpQyxDQUFDLENBQWxDLElBQXVDMFIsU0FBU3ZWLE9BQVQsQ0FBaUI2RCxHQUFqQixJQUF3QixDQUFDLENBQXBFLEVBQXVFO2lCQUMxRCxJQUFaOzs7VUFHS21TLFFBQVExVyxHQUFSLENBQVl5VyxTQUFaLEVBQXVCbFMsR0FBdkIsRUFBNEJpUyxPQUE1QixDQUFQO0dBZkksQ0FnQkhwSSxJQWhCRyxDQWdCRW1JLEtBaEJGLENBREM7T0FrQkQsVUFBU3ZTLE1BQVQsRUFBaUJPLEdBQWpCLEVBQXNCbEMsS0FBdEIsY0FBMEM7OztPQUcxQ3dCLE9BQU9PLElBQVAsQ0FBWSxJQUFaLEVBQWtCMUQsT0FBbEIsQ0FBMEI2RCxHQUExQixJQUFpQyxDQUFDLENBQXRDLEVBQXlDO1VBQ2xDLElBQUlvUyxLQUFKLGtDQUF5Q3BTLEdBQXpDLGdCQUFOO0lBREQsTUFFTztRQUNGcVMsaUJBQWlCdlUsS0FBckI7UUFDSSxRQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBQXJCLEVBQStCO3NCQUNiLElBQUl3VSxXQUFKLENBQWdCLEtBQUtwTCxVQUFMLENBQWdCLFNBQWhCLENBQWhCLEVBQTRDcEQsVUFBUWtDLElBQVIsQ0FBYSxLQUFLa0IsVUFBTCxDQUFnQixNQUFoQixDQUFiLEVBQXNDbEgsR0FBdEMsQ0FBNUMsRUFBd0ZsQyxLQUF4RixDQUFqQjs7UUFFR1QsSUFBSThVLFFBQVFqTixHQUFSLENBQVl6RixNQUFaLEVBQW9CTyxHQUFwQixFQUF5QnFTLGNBQXpCLENBQVI7U0FDS3BOLE9BQUwsQ0FBYSxRQUFiLEVBQXVCeEYsTUFBdkIsRUFBK0JPLEdBQS9CLEVBQW9DcVMsY0FBcEM7V0FDT2hWLENBQVA7O0dBWkcsQ0FjSHdNLElBZEcsQ0FjRW1JLEtBZEY7RUFsQk47Q0FERDs7SUFxQ01NOzs7c0JBQ09DLE9BQVosRUFBcUJDLE1BQXJCLEVBQTZCbE8sSUFBN0IsRUFBbUM7Ozs7Ozs7TUFFOUIsT0FBT0EsSUFBUCxLQUFnQixXQUFoQixJQUErQkEsU0FBUyxJQUE1QyxFQUFrRDs7O2lCQUMxQ0EsSUFBUDs7TUFFR0EsU0FBU0EsS0FBS21PLE9BQUwsSUFBZ0JuTyxLQUFLb08sVUFBOUIsQ0FBSixFQUErQzs7O2tCQUN2Q3BPLElBQVA7O1FBRUl1QyxVQUFMLENBQWdCO1lBQ04wTCxPQURNO1NBRVRDO0dBRlA7UUFJS2pCLFVBQUwsSUFBbUIsSUFBSW9CLEtBQUosQ0FBVXJPLElBQVYsRUFBZ0J5Tiw2QkFBaEIsQ0FBbkI7UUFDS3JMLE9BQUwsQ0FBYXBDLElBQWI7UUFDS29PLFVBQUwsR0FBa0IsSUFBbEI7UUFDS2pNLEVBQUwsQ0FBUSxRQUFSLEVBQWtCLE1BQUtxTCxtQkFBTCxFQUEwQmpJLElBQTFCLE9BQWxCO2lCQUNPLE1BQUswSCxVQUFMLENBQVA7Ozs7T0FHQU87d0JBQXFCYyxPQUFPNVMsS0FBS2xDLFFBQU87T0FDcENzSyxPQUFPLEtBQUtsQixVQUFMLENBQWdCLFNBQWhCLEdBQVg7UUFDS2pDLE9BQUwsQ0FBYSxlQUFiLEVBQThCLEtBQUtzTSxVQUFMLENBQTlCLEVBQWdELEtBQUtySyxVQUFMLENBQWdCLE1BQWhCLENBQWhELEVBQXlFbEgsR0FBekUsRUFBOEVsQyxNQUE5RTs7OztFQXRCd0J3STs7QUEyQjFCLElBQUl1TSx1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFTYixLQUFULEVBQWdCO1FBQ25DO09BQ0QsVUFBU3ZTLE1BQVQsRUFBaUJPLEdBQWpCLEVBQXNCaVMsT0FBdEIsRUFBK0I7O09BRS9CalMsUUFBUSxTQUFSLElBQXFCQSxRQUFRLFVBQWpDLEVBQTZDO1dBQ3JDLElBQVA7O09BRUdrUyxZQUFZelMsTUFBaEI7T0FDSSxRQUFPTyxHQUFQLHlDQUFPQSxHQUFQLE9BQWUsUUFBbkIsRUFBNkI7UUFDeEIsS0FBS0EsR0FBTCxDQUFKLEVBQWU7aUJBQ0YsSUFBWjs7SUFGRixNQUlPO1FBQ0ZWLE9BQU9PLElBQVAsQ0FBWSxJQUFaLEVBQWtCMUQsT0FBbEIsQ0FBMEI2RCxHQUExQixJQUFpQyxDQUFDLENBQWxDLElBQXVDMFIsU0FBU3ZWLE9BQVQsQ0FBaUI2RCxHQUFqQixJQUF3QixDQUFDLENBQXBFLEVBQXVFO2lCQUMxRCxJQUFaOzs7VUFHS21TLFFBQVExVyxHQUFSLENBQVl5VyxTQUFaLEVBQXVCbFMsR0FBdkIsRUFBNEJpUyxPQUE1QixDQUFQO0dBZkksQ0FnQkhwSSxJQWhCRyxDQWdCRW1JLEtBaEJGLENBREM7T0FrQkQsVUFBU3ZTLE1BQVQsRUFBaUJPLEdBQWpCLEVBQXNCbEMsS0FBdEIsY0FBMEM7OztPQUcxQ3dCLE9BQU9PLElBQVAsQ0FBWSxJQUFaLEVBQWtCMUQsT0FBbEIsQ0FBMEI2RCxHQUExQixJQUFpQyxDQUFDLENBQXRDLEVBQXlDO1VBQ2xDLElBQUlvUyxLQUFKLGtDQUF5Q3BTLEdBQXpDLGdCQUFOO0lBREQsTUFFTztRQUNGcVMsaUJBQWlCdlUsS0FBckI7UUFDSSxRQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBQXJCLEVBQStCO3NCQUNiLElBQUl3VSxXQUFKLENBQWdCLEtBQUtwTCxVQUFMLENBQWdCLFNBQWhCLENBQWhCLEVBQTRDcEQsVUFBUWtDLElBQVIsQ0FBYSxLQUFLa0IsVUFBTCxDQUFnQixNQUFoQixDQUFiLEVBQXNDbEgsR0FBdEMsQ0FBNUMsRUFBd0ZsQyxLQUF4RixDQUFqQjs7UUFFR1QsSUFBSThVLFFBQVFqTixHQUFSLENBQVl6RixNQUFaLEVBQW9CTyxHQUFwQixFQUF5QnFTLGNBQXpCLENBQVI7U0FDS3BOLE9BQUwsQ0FBYSxRQUFiLEVBQXVCeEYsTUFBdkIsRUFBK0JPLEdBQS9CLEVBQW9DcVMsY0FBcEM7V0FDT2hWLENBQVA7O0dBWkcsQ0FjSHdNLElBZEcsQ0FjRW1JLEtBZEY7RUFsQk47Q0FERDs7SUFxQ01YOzs7b0JBQ09wQyxRQUFaLEVBQXNCM0ssSUFBdEIsRUFBNEI7Ozs7Ozs7TUFFdkIsT0FBT0EsSUFBUCxLQUFnQixXQUFoQixJQUErQkEsU0FBUyxJQUE1QyxFQUFrRDs7O2tCQUMxQ0EsSUFBUDs7TUFFR0EsUUFBUUEsS0FBS21PLE9BQWpCLEVBQTBCOzs7YUFDZmhVLEtBQVYsQ0FBZ0Isb0JBQWhCO2tCQUNPNkYsSUFBUDs7O01BR0dBLFNBQVNBLEtBQUtTLFFBQUwsSUFBaUJULEtBQUtvTyxVQUEvQixDQUFKLEVBQWdEOzs7a0JBQ3hDcE8sSUFBUDtHQURELE1BRU87T0FDRmlCLE1BQU1DLE9BQU4sQ0FBY2xCLElBQWQsQ0FBSixFQUF5Qjs7O21CQUNqQixPQUFLd08sZ0JBQUwsQ0FBc0I3RCxRQUF0QixFQUFnQzNLLElBQWhDLENBQVA7OztTQUdHdUMsVUFBTCxDQUFnQjtXQUNQLEVBRE87V0FFUCxFQUZPO2VBR0grSyxtQkFIRzthQUlMQyxpQkFKSztXQUtQO0dBTFQ7U0FPS1AsY0FBTCxJQUF1QixJQUFJeUIsWUFBSixDQUF1QjlELFFBQXZCLENBQXZCO1NBQ0t2SSxPQUFMLENBQWEsT0FBS3NNLGNBQUwsQ0FBb0IxTyxJQUFwQixDQUFiO1NBQ0syTyxXQUFMO1NBQ0tsTyxRQUFMLEdBQWdCLElBQWhCO1NBQ0t3TSxVQUFMLElBQW1CLElBQUlvQixLQUFKLENBQVVyTyxJQUFWLEVBQWdCdU8sNEJBQWhCLENBQW5COztTQUVLcE0sRUFBTCxDQUFRLFFBQVIsRUFBa0IsT0FBSytLLFdBQUwsRUFBa0IzSCxJQUFsQixRQUFsQjtTQUNLcEQsRUFBTCxDQUFRLGVBQVIsRUFBeUIsT0FBS2dMLGtCQUFMLEVBQXlCNUgsSUFBekIsUUFBekI7aUJBQ08sT0FBSzBILFVBQUwsQ0FBUDs7Ozs7aUNBR2NqTixNQUFpQjtPQUFYUCxJQUFXLHVFQUFKLEVBQUk7O09BQzNCLE9BQU9PLElBQVAsS0FBZ0IsV0FBaEIsSUFBK0JBLFNBQVMsSUFBNUMsRUFBa0Q7UUFDN0N6RSxPQUFPUCxPQUFPTyxJQUFQLENBQVl5RSxJQUFaLENBQVg7Ozs7OzswQkFDZ0J6RSxJQUFoQiw4SEFBc0I7VUFBYkcsR0FBYTs7VUFDakJrVCxVQUFVblAsUUFBUUEsS0FBSzVGLE1BQUwsR0FBYyxDQUFkLEdBQWtCLEdBQWxCLEdBQXdCLEVBQWhDLElBQXNDNkIsR0FBcEQ7O1VBRUlzRSxLQUFLeEksY0FBTCxDQUFvQmtFLEdBQXBCLENBQUosRUFBOEI7V0FDekJtVCxRQUFPN08sS0FBS3RFLEdBQUwsQ0FBUCxNQUFxQixRQUF6QixFQUFtQzthQUM3QmdULGNBQUwsQ0FBb0IxTyxLQUFLdEUsR0FBTCxDQUFwQixFQUErQmtULE9BQS9CO2FBQ0tsVCxHQUFMLElBQVksSUFBSXNTLFdBQUosQ0FBZ0IsS0FBS0MsT0FBTCxDQUFhMUksSUFBYixDQUFrQixJQUFsQixDQUFoQixFQUF5Q3FKLE9BQXpDLEVBQWtENU8sS0FBS3RFLEdBQUwsQ0FBbEQsQ0FBWjtRQUZELE1BR087OztPQUpSLE1BT087Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFLRnNFLElBQVA7Ozs7NEJBR1M7VUFDRixJQUFQOzs7O21DQUdnQjJLLFVBQVVtRSxPQUFPO09BQzdCQyxhQUFhLEVBQWpCO1FBQ0ssSUFBSXpYLElBQUksQ0FBYixFQUFnQkEsSUFBSXdYLE1BQU1qVixNQUExQixFQUFrQ3ZDLEdBQWxDLEVBQXVDO2VBQzNCbUYsSUFBWCxDQUFnQixJQUFJc1EsU0FBSixDQUFjcEMsUUFBZCxFQUF3Qm1FLE1BQU14WCxDQUFOLENBQXhCLENBQWhCOztVQUVNeVgsVUFBUDs7OztnQ0FHYTtPQUNULEtBQUsvQixjQUFMLEVBQXFCZ0MsZUFBckIsS0FBeUMsQ0FBN0MsRUFBZ0Q7UUFDM0NsRCxVQUFVLEtBQUtrQixjQUFMLEVBQXFCbkIsVUFBckIsRUFBZDtTQUNLLElBQUl2VSxDQUFULElBQWN3VSxPQUFkLEVBQXVCO1VBQ2pCbUQsUUFBTCxDQUFjM1gsQ0FBZCxFQUFpQndVLFFBQVF4VSxDQUFSLENBQWpCOzs7Ozs7MkJBS01xVSxPQUFPOzs7T0FDWCxDQUFDLEtBQUtuVSxjQUFMLENBQW9CLENBQUM2Vix3QkFBd0IxQixLQUF6QixDQUFwQixDQUFMLEVBQTJEO1NBQ3JEMEIsd0JBQXdCMUIsS0FBN0IsSUFBc0M7WUFBTSxPQUFLcUIsY0FBTCxFQUFxQmtDLE9BQXJCLFNBQW1DdkQsS0FBbkMsQ0FBTjtLQUF0Qzs7Ozs7Ozs7Ozs7MEJBU01qUSxLQUFLbEMsT0FBTztVQUNaZ0csVUFBUW9CLEdBQVIsQ0FBWWxGLEdBQVosRUFBaUIsS0FBS3VSLFVBQUwsQ0FBakIsRUFBbUMsRUFBbkMsRUFBdUN6VCxLQUF2QyxDQUFQOzs7Ozs7Ozs7Ozs7Ozs7MkJBWVEyVixZQUFZOztPQUVoQkEsY0FBZSxRQUFPQSxVQUFQLHlDQUFPQSxVQUFQLE9BQXNCLFFBQXJDLElBQWtEblUsT0FBT08sSUFBUCxDQUFZNFQsVUFBWixFQUF3QnRWLE1BQXhCLEdBQWlDLENBQXZGLEVBQTBGO1NBQ3BGLElBQUk0RixJQUFULElBQWlCMFAsVUFBakIsRUFBNkI7O1VBRXZCQyxPQUFMLENBQWEzUCxJQUFiLEVBQW1CMFAsV0FBVzFQLElBQVgsQ0FBbkI7Ozs7Ozs7Ozs7OzswQkFVSytDLE1BQU07O1VBRU5oRCxVQUFRckksR0FBUixDQUFZcUwsSUFBWixFQUFrQixLQUFLeUssVUFBTCxDQUFsQixFQUFvQyxFQUFwQyxDQUFQOzs7Ozs7Ozs7OzJCQU9RekssTUFBTTtPQUNWMUUsU0FBUyxFQUFiO09BQ0kwRSxRQUFRQSxLQUFLM0ksTUFBTCxHQUFjLENBQTFCLEVBQTZCOzs7Ozs7MkJBQ1gySSxJQUFqQixtSUFBdUI7VUFBZC9DLElBQWM7O2FBQ2ZoRCxJQUFQLENBQVksS0FBSzZPLE9BQUwsQ0FBYTdMLElBQWIsQ0FBWjs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFHSzNCLE1BQVA7Ozs7Z0NBR2E7T0FDVCxLQUFLa1AsY0FBTCxDQUFKLEVBQXlCO1dBQ2pCLEtBQUtBLGNBQUwsRUFBcUJyQyxRQUE1QjtJQURELE1BRUs7V0FDRyxFQUFQOzs7Ozs7Ozs7T0FRRHVDOzBCQUFlOzs7O09BSWZDOzBCQUFzQjs7O1FBR2pCeE0sT0FBTCxDQUFhLFFBQWIsRUFBdUIsS0FBS3NNLFVBQUwsQ0FBdkIsRUFBeUN6TixVQUFRa0MsSUFBUixDQUFheEgsVUFBVSxDQUFWLENBQWIsRUFBMkJBLFVBQVUsQ0FBVixDQUEzQixDQUF6QyxFQUFtRkEsVUFBVSxDQUFWLENBQW5GOzs7OzBCQUdPOEYsTUFBTTtRQUNSb0MsT0FBTCxDQUFhLEtBQUtzTSxjQUFMLENBQW9CMU8sSUFBcEIsQ0FBYjtRQUNLaU4sVUFBTCxJQUFtQixJQUFJb0IsS0FBSixDQUFVck8sSUFBVixFQUFnQnVPLHFCQUFxQixJQUFyQixDQUFoQixDQUFuQjs7UUFFS2xMLEdBQUwsQ0FBUyxRQUFUO1FBQ0tBLEdBQUwsQ0FBUyxlQUFUO1FBQ0tsQixFQUFMLENBQVEsUUFBUixFQUFrQixLQUFLK0ssV0FBTCxFQUFrQjNILElBQWxCLENBQXVCLElBQXZCLENBQWxCO1FBQ0twRCxFQUFMLENBQVEsZUFBUixFQUF5QixLQUFLZ0wsa0JBQUwsRUFBeUI1SCxJQUF6QixDQUE4QixJQUE5QixDQUF6Qjs7VUFFTyxLQUFLMEgsVUFBTCxDQUFQOzs7OzRCQUdTOzs7RUExS2FqTCxTQWdMeEI7O0FDNVJBLElBQU1xTix3QkFBd0IsSUFBOUI7SUFDQ0Msb0JBQW9CLElBRHJCOztJQUdxQkM7OztpQkFDUjFVLE9BQVosRUFBcUI7Ozs7OzZHQUNkLEVBQUNBLGdCQUFELEVBRGM7O1lBRVZaLEdBQVYsQ0FBYyxXQUFkO1lBQ1V1TyxRQUFWLENBQW1CLEtBQW5CO1FBQ0tnSCxTQUFMLEdBQWlCLEVBQWpCO1FBQ0tuTixVQUFMLENBQWdCO2VBQ0gsRUFERztnQkFFRixFQUZFO21CQUdDLElBSEQ7c0JBSUk7R0FKcEI7UUFNS29OLGFBQUw7UUFDS0MsV0FBTDtRQUNLQyxPQUFMO1FBQ0tDLGFBQUw7Ozs7OztnQ0FJWTthQUNGQyxVQUFWLENBQ0M7VUFBQSxrQkFDUW5WLENBRFIsRUFDVTtVQUFPb1YsR0FBTCxHQUFXcFYsQ0FBWDtLQURaO1VBQUEsb0JBRVM7WUFBUSxLQUFLb1YsR0FBWjs7SUFIWDs7Ozs0QkFRUTthQUNFdFYsVUFBVixHQUF1QnVWLE1BQXZCLENBQThCLElBQUl4SixRQUFKLENBQVcsRUFBWCxDQUE5Qjs7OztrQ0FHYztPQUNWLEtBQUszRCxVQUFMLENBQWdCLFdBQWhCLENBQUosRUFBaUM7UUFDNUJvTixPQUFPLElBQVg7U0FDSSxJQUFJalgsQ0FBUixJQUFhLEtBQUs2SixVQUFMLENBQWdCLFdBQWhCLENBQWIsRUFBMEM7U0FDckM3SixLQUFLLEtBQUs2SixVQUFMLENBQWdCLFdBQWhCLEVBQTZCcEwsY0FBN0IsQ0FBNEN1QixDQUE1QyxDQUFULEVBQXdEO1VBQ25EZixNQUFNLEtBQUs0SyxVQUFMLENBQWdCLFdBQWhCLEVBQTZCN0osQ0FBN0IsQ0FBVjtVQUNHaVgsSUFBSCxFQUFRO1lBQ0ZqSixJQUFMLENBQVV1QixtQkFBaUIySCxhQUFqQixDQUErQjFLLElBQS9CLENBQW9DK0Msa0JBQXBDLEVBQXNEdFEsR0FBdEQsQ0FBVjtPQURELE1BRUs7Y0FDR3NRLG1CQUFpQjJILGFBQWpCLENBQStCalksR0FBL0IsQ0FBUDs7OztRQUlDZ1ksSUFBSixFQUFTO1VBQ0hqSixJQUFMLENBQVUsS0FBS21KLFlBQUwsQ0FBa0IzSyxJQUFsQixDQUF1QixJQUF2QixDQUFWLEVBQ0UwQixLQURGLENBQ1EsVUFBQzVOLENBQUQsRUFBTztjQUNMYyxLQUFSLENBQWMsa0JBQWQsRUFBa0NkLENBQWxDO01BRkY7S0FERCxNQUtLO1VBQ0M2VyxZQUFMOztJQWxCRixNQW9CSztTQUNDQSxZQUFMOzs7OztpQ0FJYTtPQUNWbFksTUFBTSxLQUFLNEssVUFBTCxDQUFnQixhQUFoQixDQUFWO2FBQ1UyRSxPQUFWLENBQWtCdlAsR0FBbEIsRUFBdUIsRUFBdkIsRUFDRStPLElBREYsQ0FDTyxLQUFLb0osb0JBQUwsQ0FBMEI1SyxJQUExQixDQUErQixJQUEvQixDQURQLEVBRUUwQixLQUZGLENBRVFuSSxVQUFVc1IsTUFBVixDQUFpQjdLLElBQWpCLENBQXNCLElBQXRCLENBRlI7Ozs7a0NBS2M7UUFDVGxELFVBQUwsQ0FBZ0IsUUFBaEIsRUFBMEJ3QixXQUExQjtRQUNLaEIsVUFBTCxDQUFnQixRQUFoQixFQUEwQndOLE9BQTFCLENBQWtDLEtBQUt6TixVQUFMLENBQWdCLGFBQWhCLENBQWxDOzs7OytCQUdXO09BQ1AwTixjQUFjLEVBQWxCO1FBQ0ksSUFBSXZYLElBQUksQ0FBWixFQUFlQSxJQUFJLEtBQUs2SixVQUFMLENBQWdCLGlCQUFoQixFQUFtQy9JLE1BQXRELEVBQThEZCxHQUE5RCxFQUFrRTtRQUM3RHdYLGFBQWEsS0FBSzNOLFVBQUwsQ0FBZ0IsaUJBQWhCLEVBQW1DN0osQ0FBbkMsQ0FBakI7UUFDQ3lYLFFBQVFELFdBQVdDLEtBRHBCO1FBRUNDLGFBQWFGLFdBQVdFLFVBRnpCO1NBR0ksSUFBSW5aLElBQUksQ0FBWixFQUFlQSxJQUFJa1osTUFBTTNXLE1BQXpCLEVBQWlDdkMsR0FBakMsRUFBcUM7aUJBQ3hCa1osTUFBTWxaLENBQU4sQ0FBWixJQUF3QixLQUFLb1osY0FBTCxDQUFvQkQsVUFBcEIsQ0FBeEI7OztRQUdHNU4sVUFBTCxDQUFnQixRQUFoQixFQUEwQjhOLE9BQTFCLENBQWtDTCxXQUFsQyxFQUErQ00sTUFBL0MsR0FBd0RDLFFBQXhELENBQWlFLEtBQUtqTyxVQUFMLENBQWdCLGNBQWhCLENBQWpFOzs7O3VDQUdvQitILFVBQVU7UUFDekJwSSxVQUFMLENBQWdCLG1CQUFoQixFQUFxQ29JLFFBQXJDO1FBQ0ttRyxNQUFMOzs7O3lDQUdzQjtVQUNmLEtBQUtsTyxVQUFMLENBQWdCLG1CQUFoQixDQUFQOzs7OzJCQUdROzs7UUFHSG1PLGdCQUFMOztRQUVLQyxjQUFMO09BQ0ksS0FBS0MsaUJBQUwsRUFBSixFQUE4QjtTQUN4QkMsUUFBTDs7Ozs7NkJBSVM7OztRQUdMQyxVQUFMOzs7O2lDQUdjQyxnQkFBZ0I7T0FDMUJDLE1BQU0sSUFBVjtVQUNPLFlBQVU7UUFDWkQsY0FBSixDQUFtQkMsR0FBbkIsRUFBd0JuWCxTQUF4QjtJQUREOzs7O21DQUtnQjtPQUNaLE9BQU8sS0FBSzBJLFVBQUwsQ0FBZ0IsZ0JBQWhCLENBQVAsS0FBOEMsV0FBbEQsRUFBK0Q7UUFDMURvTyxpQkFBaUIsS0FBS3BPLFVBQUwsQ0FBZ0IsZ0JBQWhCLENBQXJCO1NBQ0tQLFVBQUwsQ0FBZ0IsZ0JBQWhCLEVBQWtDLElBQUkyTyxjQUFKLENBQW1CLElBQW5CLENBQWxDOzs7Ozt5Q0FJcUI7VUFDZixLQUFLbk8sVUFBTCxDQUFnQixtQkFBaEIsQ0FBUDs7Ozt1Q0FHb0J5TyxNQUFNO1FBQ3JCalAsVUFBTCxDQUFnQixtQkFBaEIsRUFBcUNpUCxJQUFyQztVQUNPLElBQVA7Ozs7cUNBR2tCOzs7UUFDYkMsZUFBTDtPQUNJQyxZQUFZLEtBQUs1TyxVQUFMLENBQWdCLG1CQUFoQixDQUFoQjtPQUNJNE8sU0FBSixFQUFlOytCQUNObFksSUFETTtTQUVUbVksaUJBQWlCRCxVQUFVbFksSUFBVixDQUFyQjtZQUNLdUosVUFBTCxDQUFnQixZQUFoQixFQUE4QnZKLElBQTlCLElBQXNDLFVBQUNvWSxVQUFEO2FBQWdCLElBQUkzRSxTQUFKLENBQWMwRSxjQUFkLEVBQThCQyxVQUE5QixDQUFoQjtNQUF0QztZQUNPLE9BQU81UyxVQUFVNlMscUJBQVYsQ0FBZ0NyWSxJQUFoQyxDQUFkLElBQXVELE9BQUt1SixVQUFMLENBQWdCLFlBQWhCLEVBQThCdkosSUFBOUIsQ0FBdkQ7OztTQUhHLElBQUlBLElBQVIsSUFBZ0JrWSxTQUFoQixFQUEwQjtXQUFsQmxZLElBQWtCOzs7Ozs7Z0NBUWRBLE1BQU07VUFDWmdXLG9CQUFvQnhRLFVBQVU2UyxxQkFBVixDQUFnQ3JZLElBQWhDLENBQTNCOzs7O29DQUdpQkEsTUFBTTtVQUNoQitWLHdCQUF3QnZRLFVBQVU2UyxxQkFBVixDQUFnQ3JZLElBQWhDLENBQS9COzs7O2tDQUdlO1VBQ1IsS0FBS3VKLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBUDs7OztvQ0FHaUI7UUFDWlIsVUFBTCxDQUFnQixZQUFoQixFQUE4QixFQUE5QjtVQUNPLElBQVA7Ozs7bUNBR2dCdVAsTUFBTWpHLE9BQU87T0FDekIsQ0FBQyxLQUFLNkQsU0FBTCxDQUFlaFksY0FBZixDQUE4Qm9hLElBQTlCLENBQUwsRUFBMEM7U0FDcENwQyxTQUFMLENBQWVvQyxJQUFmLElBQXVCLEVBQXZCOztRQUVJcEMsU0FBTCxDQUFlb0MsSUFBZixFQUFxQmpHLEtBQXJCLElBQThCLEtBQTlCO1VBQ08sS0FBS2tHLGVBQUwsQ0FBcUJ0TSxJQUFyQixDQUEwQixJQUExQixFQUFnQ3FNLElBQWhDLEVBQXNDakcsS0FBdEMsQ0FBUDs7OztrQ0FHZWlHLE1BQU1qRyxPQUFPO1FBQ3ZCNkQsU0FBTCxDQUFlb0MsSUFBZixFQUFxQmpHLEtBQXJCLElBQThCLElBQTlCO09BQ0ksS0FBS3NGLGlCQUFMLEVBQUosRUFBOEI7U0FDeEJDLFFBQUw7Ozs7O3NDQUlrQjtPQUNmNVosQ0FBSixFQUFPZ0gsQ0FBUDtRQUNLaEgsQ0FBTCxJQUFVLEtBQUtrWSxTQUFmLEVBQTBCO1NBQ3BCbFIsQ0FBTCxJQUFVLEtBQUtrUixTQUFMLENBQWVsWSxDQUFmLENBQVYsRUFBNkI7U0FDeEIsQ0FBQyxLQUFLa1ksU0FBTCxDQUFlbFksQ0FBZixFQUFrQmdILENBQWxCLENBQUwsRUFBMkI7YUFDbkIsS0FBUDs7OztVQUlJLElBQVA7Ozs7RUF6TGtDMEQ7O0FDVHBDLElBQU04UCxrQkFBa0J4WCxPQUFPLFlBQVAsQ0FBeEI7O0lBRU15WDs7O2tDQUNROzs7Ozs7O1FBRVBELGVBQUwsSUFBd0IsRUFBeEI7Ozs7OztpREFJNkI7UUFDeEJwUCxTQUFMLENBQWUsS0FBS29QLGVBQUwsQ0FBZixFQUFzQzVYLFNBQXRDO1VBQ08sSUFBUDs7Ozt5REFHcUM7VUFDOUIsS0FBS3lJLFNBQUwsQ0FBZSxLQUFLbVAsZUFBTCxDQUFmLEVBQXNDNVgsU0FBdEMsQ0FBUDs7OztvQ0FHZ0I7UUFDWHdJLFNBQUwsQ0FBZSxLQUFLb1AsZUFBTCxDQUFmLEVBQXNDLEVBQXRDO1VBQ08sSUFBUDs7Ozt3QkFHSTtPQUNBNVgsVUFBVUwsTUFBVixLQUFxQixDQUF6QixFQUEyQjtTQUNyQm1ZLFlBQUwsQ0FBa0I5WCxVQUFVLENBQVYsQ0FBbEIsRUFBZ0NBLFVBQVUsQ0FBVixDQUFoQztJQURELE1BRUs7UUFDQUEsVUFBVUwsTUFBVixLQUFxQixDQUFyQixJQUEwQmdWLFFBQU8zVSxVQUFVLENBQVYsQ0FBUCxNQUF3QixRQUF0RCxFQUErRDtVQUMxRCxJQUFJbkIsQ0FBUixJQUFhbUIsVUFBVSxDQUFWLENBQWIsRUFBMEI7V0FDcEI4WCxZQUFMLENBQWtCalosQ0FBbEIsRUFBcUJtQixVQUFVLENBQVYsRUFBYW5CLENBQWIsQ0FBckI7Ozs7Ozs7d0JBTUM7VUFDRyxLQUFLa1osWUFBTCxhQUFxQi9YLFNBQXJCLENBQVA7Ozs7MEJBR007UUFDRDRYLGVBQUwsSUFBd0IsRUFBeEI7VUFDTyxJQUFQOzs7O0VBdkNrQzlQOztBQTBDcEMsOEJBQWUsSUFBSStQLHFCQUFKLEVBQWY7O0FDdkNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBLElBQU1HLGtCQUFrQjVYLE9BQU8sWUFBUCxDQUF4Qjs7SUFFTTZYOzs7Ozs7Ozs7Ozs7Ozs7c0JBYU9sUSxLQUFaLEVBQW1COzs7Ozs7O1FBRWJpUSxlQUFMLElBQXdCLEVBQXhCO1FBQ0tsTixJQUFMLENBQVUvQyxLQUFWO1FBQ0ttUSxNQUFMOzs7Ozs7dUJBSUluUSxPQUFPO1FBQ05BLEtBQUwsR0FBYUEsS0FBYjtRQUNLb1EsU0FBTCxHQUFpQnBRLE1BQU1vUSxTQUF2QjtRQUNLQyxRQUFMLENBQWNyUSxNQUFNaEssSUFBTixHQUFhZ0ssTUFBTWhLLElBQW5CLEdBQTBCLEVBQXhDO1FBQ0tzYSxXQUFMLENBQWlCdFEsTUFBTXBILE9BQU4sR0FBZ0JvSCxNQUFNcEgsT0FBdEIsR0FBZ0MsRUFBakQ7UUFDSzJYLFdBQUwsQ0FBaUJ2USxNQUFNd1EsUUFBdkI7UUFDS0MsWUFBTDs7OztpQ0FHYztRQUNUclEsVUFBTCxDQUFnQixVQUFoQixFQUE0QixLQUFLUSxVQUFMLENBQWdCLGFBQWhCLEdBQTVCOzs7OzJCQUdRekYsS0FBSztRQUNSZ0YsT0FBTCxDQUFhaEYsR0FBYjtPQUNJLEtBQUtaLE9BQUwsR0FBZWlFLFFBQW5CLEVBQTZCO1NBQ3ZCakUsT0FBTCxHQUFlMkYsRUFBZixDQUFrQixRQUFsQixFQUE0QixLQUFLd1EsUUFBTCxDQUFjcE4sSUFBZCxDQUFtQixJQUFuQixDQUE1Qjs7Ozs7OEJBSVVuSSxLQUFLO1FBQ1htRixVQUFMLENBQWdCbkYsR0FBaEI7Ozs7OEJBR1dxVixVQUFVO1FBQ2hCcFEsVUFBTCxDQUFnQjtpQkFDRm9RLFFBREU7WUFFUCxLQUFLN1AsVUFBTCxDQUFnQixRQUFoQixJQUE0QixLQUFLQSxVQUFMLENBQWdCLFFBQWhCLENBQTVCLEdBQXdEd0YsS0FBS0gsY0FBTCxHQUFzQjJLLEtBQUtDLE1BQUw7SUFGdkY7Ozs7bUNBTWdCO09BQ1osS0FBS1IsU0FBVCxFQUFvQjt1Q0FDUixLQUFLQSxTQUFMLENBQWVTLGNBQWYsRUFBWCxJQUE0QyxLQUFLalEsVUFBTCxDQUFnQixRQUFoQixDQUE1QztJQURELE1BRU87V0FDQyxDQUFDLEtBQUtBLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBRCxDQUFQOzs7OzsyQkFJT3lMLE9BQU81UyxLQUFLbEMsT0FBTzs7OztRQUl0QnNYLE1BQUwsQ0FBWXBWLEdBQVo7UUFDS2lGLE9BQUwsQ0FBYSxVQUFiLEVBQXdCMk4sS0FBeEIsRUFBK0I1UyxHQUEvQixFQUFvQ2xDLEtBQXBDOzs7OzJCQUdRO1FBQ0h1WixVQUFMO1FBQ0tDLGlCQUFMO1FBQ0tDLGNBQUwsQ0FBb0IsS0FBS3pXLE9BQUwsRUFBcEI7UUFDSzBXLHFCQUFMO1FBQ0tDLGFBQUw7Ozs7eUJBR016WCxLQUFLO1FBQ051WCxjQUFMLENBQW9CLEtBQUt6VyxPQUFMLEVBQXBCO1FBQ0ssSUFBSXpELENBQVQsSUFBYyxLQUFLbVosZUFBTCxDQUFkLEVBQXFDO1FBQ2hDbFMsT0FBTyxLQUFLa1MsZUFBTCxFQUFzQm5aLENBQXRCLENBQVg7UUFDQ3FhLFNBQVMsSUFEVjtRQUVJMVgsR0FBSixFQUFRO1NBQ0hzRSxLQUFLNEMsVUFBTCxDQUFnQixVQUFoQixNQUE4QixJQUFsQyxFQUF1Qzs7O1NBR25DeVEsZ0JBQWdCN1QsVUFBUWtCLGFBQVIsQ0FBc0JWLEtBQUs0QyxVQUFMLENBQWdCLFVBQWhCLENBQXRCLENBQXBCO1NBQ0MwUSxjQUFjOVQsVUFBUWtCLGFBQVIsQ0FBc0JoRixHQUF0QixDQURmO2NBRVM4RCxVQUFRK1QsYUFBUixDQUFzQkQsV0FBdEIsRUFBbUNELGFBQW5DLENBQVQ7Ozs7O1FBS0dELE1BQUosRUFBWTtVQUNOdEMsTUFBTDs7Ozs7O3NDQUtpQjtRQUNkek8sVUFBTCxDQUFnQixTQUFoQixFQUEyQixLQUFLbVIsYUFBTCxFQUEzQjs7Ozs7Ozs7Ozs7Ozs7O2tDQWVlO09BQ1gxVixTQUFTLEtBQUsyVixpQkFBTCxFQUFiO1VBQ08zVixNQUFQOzs7O3NDQUdtQjtPQUNmNFYsUUFBUSxFQUFaO09BQ0NDLE1BQU03VSxVQUFVOFUsdUJBQVYsQ0FBa0MsS0FBS0MseUJBQUwsRUFBbEMsRUFBb0V6TCxLQUFLUiwyQkFBekUsQ0FEUDtRQUVLLElBQUl0SixJQUFJLENBQWIsRUFBZ0JBLElBQUlxVixJQUFJOVosTUFBeEIsRUFBZ0N5RSxHQUFoQyxFQUFxQztTQUMvQixJQUFJaEgsSUFBSSxDQUFSLEVBQVdpSCxPQUFPb1YsSUFBSXJWLENBQUosRUFBT0UsVUFBekIsRUFBcUNDLElBQUlGLEtBQUsxRSxNQUFuRCxFQUEyRHZDLElBQUltSCxDQUEvRCxFQUFrRW5ILEdBQWxFLEVBQXVFO1NBQ2xFaUgsS0FBS2pILENBQUwsRUFBUW9ILFFBQVIsQ0FBaUI3RyxPQUFqQixDQUF5QnVRLEtBQUtSLDJCQUE5QixNQUErRCxDQUFuRSxFQUFzRTs7VUFFakVrTSxXQUFXLEtBQUtDLHdCQUFMLENBQThCeFYsS0FBS2pILENBQUwsRUFBUW9ILFFBQXRDLENBQWY7ZUFDUzRLLE9BQVQsR0FBbUJxSyxJQUFJclYsQ0FBSixDQUFuQjtlQUNTMFYsbUJBQVQsR0FBK0J6VixLQUFLakgsQ0FBTCxFQUFRb0gsUUFBdkM7ZUFDU3VWLG1CQUFULEdBQStCMVYsS0FBS2pILENBQUwsRUFBUWtDLEtBQXZDO1lBQ01pRCxJQUFOLENBQVdxWCxRQUFYOzs7O1VBSUlKLEtBQVA7Ozs7MkNBR3dCTSxxQkFBcUI7T0FDekNsVyxTQUFTO1lBQ0osRUFESTttQkFFRyxFQUZIO2lCQUdDO0lBSGQ7eUJBS3NCa1csb0JBQW9CalUsT0FBcEIsQ0FBNEJxSSxLQUFLUiwyQkFBakMsRUFBOEQsRUFBOUQsQ0FBdEI7T0FDSW9NLG9CQUFvQm5jLE9BQXBCLENBQTRCdVEsS0FBS0wsc0NBQWpDLE1BQThFaU0sb0JBQW9CbmEsTUFBcEIsR0FBNkJ1TyxLQUFLTCxzQ0FBTCxDQUE0Q2xPLE1BQTNKLEVBQW9LO1dBQzVKcWEsV0FBUCxHQUFxQixJQUFyQjswQkFDc0JGLG9CQUFvQmpVLE9BQXBCLENBQTRCcUksS0FBS04sOEJBQUwsR0FBc0NNLEtBQUtMLHNDQUF2RSxFQUErRyxFQUEvRyxDQUF0Qjs7VUFFTW9NLE1BQVAsR0FBZ0JILG9CQUFvQnBhLEtBQXBCLENBQTBCd08sS0FBS04sOEJBQS9CLENBQWhCO1VBQ09zTSxhQUFQLEdBQXVCdFcsT0FBT3FXLE1BQVAsQ0FBYyxDQUFkLENBQXZCO1VBQ09BLE1BQVAsR0FBZ0JyVyxPQUFPcVcsTUFBUCxDQUFjelcsS0FBZCxDQUFvQixDQUFwQixDQUFoQjtVQUNPSSxNQUFQOzs7O2lDQUdja0MsTUFBTTJMLE9BQU87T0FDdkIwSSxVQUFVLEtBQUt4UixVQUFMLENBQWdCLFNBQWhCLENBQWQ7T0FDSXdSLE9BQUosRUFBYTtTQUNQLElBQUkvYyxJQUFJLENBQWIsRUFBZ0JBLElBQUkrYyxRQUFReGEsTUFBNUIsRUFBb0N2QyxHQUFwQyxFQUF5QztTQUNwQ2dkLFlBQVlELFFBQVEvYyxDQUFSLENBQWhCO2VBQ1VpZCxlQUFWLEdBQTRCLEtBQUtDLDRCQUFMLENBQWtDRixVQUFVTCxtQkFBNUMsRUFBaUVqVSxJQUFqRSxFQUF1RTJMLEtBQXZFLENBQTVCOztTQUVJOEksV0FBV0gsVUFBVUYsYUFBekI7U0FDQ00sT0FBTzNDLHdCQUFzQjVhLEdBQXRCLENBQTBCc2QsUUFBMUIsQ0FEUjtTQUVJQyxJQUFKLEVBQVU7V0FDSkosU0FBTCxFQUFnQnRVLElBQWhCLEVBQXNCLEtBQUs0QyxVQUFMLENBQWdCLFNBQWhCLEVBQTJCLEVBQTNCLENBQXRCO2dCQUNVMEcsT0FBVixDQUFrQnFMLGVBQWxCLENBQWtDTCxVQUFVTixtQkFBNUM7TUFGRCxNQUdPO2dCQUNJN1osS0FBVixDQUFnQixtQkFBaEIsRUFBcUNzYSxRQUFyQzs7OztRQUlFOVQsT0FBTCxDQUFhLFVBQWI7Ozs7K0NBRzRCbEIsTUFBTU8sTUFBTTtVQUNqQ1IsVUFBUXJJLEdBQVIsQ0FBWXNJLElBQVosRUFBa0JPLElBQWxCLEVBQXdCLEtBQUs0QyxVQUFMLENBQWdCLFNBQWhCLEVBQTJCLEVBQTNCLENBQXhCLENBQVA7Ozs7c0NBR21CO1FBQ2RnUyxXQUFMO1FBQ0t2UyxVQUFMLENBQWdCLE1BQWhCLEVBQXdCLEVBQXhCOzs7O2dDQUdhO09BQ1QsS0FBS1EsVUFBTCxDQUFnQixNQUFoQixDQUFKLEVBQTZCOzs7Ozs7MEJBQ2QsS0FBS0EsVUFBTCxDQUFnQixNQUFoQixDQUFkLDhIQUF1QztVQUE5QjlKLENBQThCOztRQUNwQzhiLE9BQUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQUtPO1FBQ0pDLGlCQUFMO1FBQ0ksSUFBSS9iLElBQUksQ0FBWixFQUFlQSxJQUFJLEtBQUtnYyxRQUFMLEdBQWdCbGIsTUFBbkMsRUFBMkNkLEdBQTNDLEVBQStDO1FBQzFDa0YsS0FBSyxLQUFLOFcsUUFBTCxHQUFnQmhjLENBQWhCLENBQVQ7UUFDSWtGLEdBQUcyTCxVQUFQLEVBQWtCO1FBQ2RBLFVBQUgsQ0FBY29MLFdBQWQsQ0FBMEIvVyxFQUExQjs7Ozs7O3VDQUtrQmdYLE1BQU07VUFDbkJBLEtBQUt6VyxVQUFMLENBQWdCMFcsVUFBaEIsSUFBK0JELEtBQUt6VyxVQUFMLENBQWdCMFcsVUFBaEIsQ0FBMkIxYixLQUEzQixLQUFxQyxNQUEzRTs7OzswQ0FHdUI7UUFDbEJzYixpQkFBTDtPQUNJSyxPQUFPLEtBQUt0Qix5QkFBTCxHQUFpQ3pWLGdCQUFqQyxDQUFrRGdLLEtBQUtQLFlBQXZELENBQVg7O1FBRUssSUFBSXVOLEtBQUssQ0FBZCxFQUFpQkEsS0FBS0QsS0FBS3RiLE1BQTNCLEVBQW1DdWIsSUFBbkMsRUFBeUM7UUFDcEMsQ0FBQyxLQUFLQyxvQkFBTCxDQUEwQkYsS0FBS0MsRUFBTCxDQUExQixDQUFMLEVBQTBDO1VBQ3BDRSxTQUFMLENBQWVILEtBQUtDLEVBQUwsQ0FBZjs7Ozs7O3lCQUtJSCxNQUFNO1FBQ1B0ZCxZQUFMLENBQWtCLGFBQWxCLEVBQWlDLElBQWpDO1FBQ0trTCxVQUFMLENBQWdCLE1BQWhCLEVBQXdCcEcsSUFBeEIsQ0FBNkI7Y0FDbEJ3WSxJQURrQjtVQUV0QkEsS0FBS3pXLFVBQUwsQ0FBZ0J2RyxJQUFoQixHQUF1QmdkLEtBQUt6VyxVQUFMLENBQWdCdkcsSUFBaEIsQ0FBcUJ1QixLQUE1QyxHQUFvRCxFQUY5QjtVQUd0QnliLEtBQUt6VyxVQUFMLENBQWdCbEYsSUFBaEIsR0FBdUIyYixLQUFLelcsVUFBTCxDQUFnQmxGLElBQWhCLENBQXFCRSxLQUE1QyxHQUFvRCxFQUg5QjtTQUl2QnliLEtBQUt6VyxVQUFMLENBQWdCNUcsR0FBaEIsR0FBc0JxZCxLQUFLelcsVUFBTCxDQUFnQmxGLElBQWhCLENBQXFCMUIsR0FBM0MsR0FBaUQsRUFKMUI7UUFLeEJxZCxLQUFLelcsVUFBTCxDQUFnQmdJLEVBQWhCLEdBQXFCeU8sS0FBS3pXLFVBQUwsQ0FBZ0JnSSxFQUFoQixDQUFtQmhOLEtBQXhDLEdBQWdENE8sS0FBS0osbUJBQUwsR0FBMkI0SyxLQUFLQyxNQUFMLEVBTG5EO2tCQU1kO0lBTmY7Ozs7NEJBVVNvQyxNQUFNO09BQ1gsQ0FBQ0EsSUFBTCxFQUFXOzs7T0FHUE0sVUFBVTtjQUNGTixLQUFLelcsVUFBTCxDQUFnQnZHLElBQWhCLEdBQXVCZ2QsS0FBS3pXLFVBQUwsQ0FBZ0J2RyxJQUFoQixDQUFxQnVCLEtBQTVDLEdBQW9ELElBRGxEO1VBRU55YixLQUFLelcsVUFBTCxDQUFnQmxGLElBQWhCLEdBQXVCMmIsS0FBS3pXLFVBQUwsQ0FBZ0JsRixJQUFoQixDQUFxQkUsS0FBNUMsR0FBb0QsRUFGOUM7U0FHUHliLEtBQUt6VyxVQUFMLENBQWdCNUcsR0FBaEIsR0FBc0JxZCxLQUFLelcsVUFBTCxDQUFnQjVHLEdBQWhCLENBQW9CNEIsS0FBMUMsR0FBa0QsRUFIM0M7UUFJUnliLEtBQUt6VyxVQUFMLENBQWdCZ0ksRUFBaEIsR0FBcUJ5TyxLQUFLelcsVUFBTCxDQUFnQmdJLEVBQWhCLENBQW1CaE4sS0FBeEMsR0FBZ0Q0TyxLQUFLSixtQkFBTCxHQUEyQjRLLEtBQUtDLE1BQUw7SUFKakY7T0FNQ2hZLFVBQVU7VUFDSDBhLFFBQVFDLFFBQVIsS0FBb0IsSUFBcEIsR0FBMEIsS0FBS2hCLDRCQUFMLENBQWtDZSxRQUFRQyxRQUExQyxFQUFvRCxLQUFLaFosT0FBTCxFQUFwRCxDQUExQixHQUE4RixJQUQzRjtjQUVDO1dBQ0grWSxRQUFRamMsSUFETDtVQUVKaWMsUUFBUTNkO0tBSkw7YUFNQTtjQUNDLEtBQUtnTCxVQUFMLENBQWdCLFNBQWhCLEVBQTJCLEVBQTNCLENBREQ7ZUFFRXFTLElBRkY7V0FHRk0sUUFBUWpjLElBSE47Z0JBSUcsWUFKSDtTQUtKaWMsUUFBUS9PLEVBTEo7V0FNRnlPLElBTkU7ZUFPRU0sUUFBUUM7S0FiVjtXQWVGO0lBckJUO1FBdUJLN2QsWUFBTCxDQUFrQixJQUFsQixFQUF3QjRkLFFBQVEvTyxFQUFoQztRQUNLN08sWUFBTCxDQUFrQixhQUFsQixFQUFpQyxJQUFqQztRQUNLdWEsZUFBTCxFQUFzQnFELFFBQVEvTyxFQUE5QixJQUFvQyxJQUFJaVAsWUFBSixDQUFpQjVhLE9BQWpCLENBQXBDOzs7OytCQUdZO1FBQ1B3SCxVQUFMLENBQWdCLE9BQWhCLEVBQXlCLEVBQXpCOzs7OzhDQUcyQjtVQUNwQixLQUFLUSxVQUFMLENBQWdCLFVBQWhCLENBQVA7Ozs7NkJBR1U7VUFDSCxLQUFLQSxVQUFMLENBQWdCLE9BQWhCLENBQVA7Ozs7a0NBR2U7T0FDWC9FLFNBQVMsS0FBSytWLHlCQUFMLEVBQWI7UUFDSyxJQUFJOWEsSUFBSSxDQUFiLEVBQWdCQSxJQUFJK0UsT0FBTzRYLFVBQVAsQ0FBa0I3YixNQUF0QyxFQUE4Q2QsR0FBOUMsRUFBbUQ7U0FDN0M0YyxVQUFMLENBQWdCN1gsT0FBTzRYLFVBQVAsQ0FBa0IzYyxDQUFsQixDQUFoQjs7Ozs7b0NBSWdCOztPQUViK0UsU0FBUyxLQUFLK1YseUJBQUwsRUFBYjtPQUNDK0IsUUFBUSxLQUFLYixRQUFMLEVBRFQ7T0FFQ2MsV0FBVyxFQUZaO09BR0NDLFNBQVNGLE1BQU0vYixNQUFOLEdBQWUsQ0FBZixHQUFtQitiLE1BQU0sQ0FBTixDQUFuQixHQUE4QixLQUFLaFQsVUFBTCxDQUFnQixNQUFoQixDQUh4QztPQUlDZ0gsYUFBYWtNLE9BQU9sTSxVQUpyQjtRQUtLLElBQUk3USxJQUFJLENBQWIsRUFBZ0JBLElBQUkrRSxPQUFPNFgsVUFBUCxDQUFrQjdiLE1BQXRDLEVBQThDZCxHQUE5QyxFQUFtRDthQUN6QzBELElBQVQsQ0FBY3FCLE9BQU80WCxVQUFQLENBQWtCM2MsQ0FBbEIsQ0FBZDs7UUFFSSxJQUFJQSxLQUFJLENBQWIsRUFBZ0JBLEtBQUk4YyxTQUFTaGMsTUFBN0IsRUFBcUNkLElBQXJDLEVBQTBDO1FBQ3JDK2MsT0FBT0MsV0FBWCxFQUF3QjtZQUNoQm5NLFVBQVAsQ0FBa0JvTSxZQUFsQixDQUErQkgsU0FBUzljLEVBQVQsQ0FBL0IsRUFBNEMrYyxPQUFPQyxXQUFuRDtLQURELE1BRU87WUFDQ25NLFVBQVAsQ0FBa0JoQixXQUFsQixDQUE4QmlOLFNBQVM5YyxFQUFULENBQTlCOzs7UUFHRyxJQUFJQSxNQUFJLENBQWIsRUFBZ0JBLE1BQUk2YyxNQUFNL2IsTUFBMUIsRUFBa0NkLEtBQWxDLEVBQXVDO2VBQzNCaWMsV0FBWCxDQUF1QlksTUFBTTdjLEdBQU4sQ0FBdkI7O1FBRUlzSixVQUFMLENBQWdCLE9BQWhCLEVBQXlCd1QsUUFBekI7Ozs7NkJBR1VJLE1BQU07UUFDWGxCLFFBQUwsR0FBZ0J0WSxJQUFoQixDQUFxQndaLElBQXJCOzs7O3lCQUdNaGUsTUFBTTtVQUNMLEtBQUt1RSxPQUFMLE9BQW1CdkUsSUFBMUI7Ozs7RUFuVHdCK0osU0F1VDFCOztBQ2hWQSxJQUFNa1UsUUFBUTtTQUNMLGdCQUFTQyxRQUFULGlCQUFpQztNQUNwQ0MsSUFBSSxDQUFSO1NBQ09ELFNBQVNFLFFBQVQsQ0FBa0J4YyxNQUFsQixHQUEyQnVjLENBQWxDLEVBQXFDO09BQ2hDRCxTQUFTRSxRQUFULENBQWtCLENBQWxCLEVBQXFCM1gsUUFBckIsS0FBa0MsSUFBdEMsRUFBMkM7WUFDbEN6RSxHQUFSLENBQVksWUFBWjs7SUFERCxNQUdLO1lBQ0lBLEdBQVIsQ0FBWSxlQUFaLEVBQTRCa2MsU0FBU0UsUUFBVCxDQUFrQkQsQ0FBbEIsQ0FBNUI7YUFDU3BCLFdBQVQsQ0FBcUJtQixTQUFTRSxRQUFULENBQWtCRCxDQUFsQixDQUFyQjs7O1dBR09FLFdBQVQsR0FBdUIsRUFBdkI7RUFaWTthQWNELDRDQUFpQyxFQWRoQztPQWVQLGNBQVNILFFBQVQsRUFBbUJJLFFBQW5CLEVBQTZCO09BQzdCLElBQUlqZixJQUFJLENBQWIsRUFBZ0JBLElBQUlpZixTQUFTMWMsTUFBN0IsRUFBcUN2QyxHQUFyQyxFQUEwQztXQUNqQzJDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCc2MsU0FBU2pmLENBQVQsQ0FBN0I7WUFDU3NSLFdBQVQsQ0FBcUIyTixTQUFTamYsQ0FBVCxDQUFyQjs7RUFsQlc7WUFxQkYsMkNBQWlDLEVBckIvQjtRQXNCTix1Q0FBaUM7Q0F0QnpDLENBd0JBOztBQ3hCQSxJQUFNa2YsYUFBYTtTQUNWLHdDQUFpQyxFQUR2QjtPQUVaLGNBQVNMLFFBQVQsRUFBbUJJLFFBQW5CLEVBQTZCO09BQzdCLElBQUlqZixJQUFJLENBQWIsRUFBZ0JBLElBQUlpZixTQUFTMWMsTUFBN0IsRUFBcUN2QyxHQUFyQyxFQUEwQztZQUNoQ3NTLFVBQVQsQ0FBb0JvTSxZQUFwQixDQUFpQ08sU0FBU2pmLENBQVQsQ0FBakMsRUFBOEM2ZSxTQUFTSixXQUF2RDs7RUFKZ0I7UUFPWCx1Q0FBaUM7Q0FQekMsQ0FVQTs7QUNWQSxJQUFNVSxjQUFjO1NBQ1gsd0NBQWlDLEVBRHRCO09BRWIsY0FBU04sUUFBVCxFQUFtQkksUUFBbkIsRUFBNkI7T0FDN0IsSUFBSWpmLElBQUksQ0FBYixFQUFnQkEsSUFBSWlmLFNBQVMxYyxNQUE3QixFQUFxQ3ZDLEdBQXJDLEVBQTBDO1lBQ2hDc1MsVUFBVCxDQUFvQm9NLFlBQXBCLENBQWlDTyxTQUFTamYsQ0FBVCxDQUFqQyxFQUE4QzZlLFFBQTlDOztFQUppQjtRQU9aLHVDQUFpQztDQVB6QyxDQVVBOztBQ1ZBLElBQU1PLGFBQWE7U0FDVix3Q0FBaUMsRUFEdkI7T0FFWixjQUFTUCxRQUFULEVBQW1CSSxRQUFuQixFQUE2QjtPQUM3QixJQUFJamYsSUFBSWlmLFNBQVMxYyxNQUFULEdBQWtCLENBQS9CLEVBQWtDdkMsSUFBSSxDQUFDLENBQXZDLEVBQTBDQSxHQUExQyxFQUErQztXQUN0QzJDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCM0MsQ0FBM0IsRUFBOEJpZixTQUFTamYsQ0FBVCxDQUE5QjtPQUNJNmUsU0FBU0UsUUFBVCxDQUFrQnhjLE1BQXRCLEVBQTZCO1lBQ3BCSSxHQUFSLENBQVkscUJBQVo7YUFDUytiLFlBQVQsQ0FBc0JPLFNBQVNqZixDQUFULENBQXRCLEVBQW1DNmUsU0FBU0UsUUFBVCxDQUFrQixDQUFsQixDQUFuQztJQUZELE1BR0s7WUFDSXBjLEdBQVIsQ0FBWSxpQkFBWjthQUNTMk8sV0FBVCxDQUFxQjJOLFNBQVNqZixDQUFULENBQXJCOzs7RUFWZTtRQWNYLHVDQUFpQztDQWR6QyxDQWdCQTs7QUNoQkEsSUFBTXFmLFlBQVk7U0FDVCx3Q0FBaUMsRUFEeEI7T0FFWCxjQUFTUixRQUFULEVBQW1CSSxRQUFuQixFQUE2QjtPQUM3QixJQUFJamYsSUFBSSxDQUFiLEVBQWdCQSxJQUFJaWYsU0FBUzFjLE1BQTdCLEVBQXFDdkMsR0FBckMsRUFBMEM7WUFDaENzUixXQUFULENBQXFCMk4sU0FBU2pmLENBQVQsQ0FBckI7O0VBSmU7UUFPVix1Q0FBaUM7Q0FQekMsQ0FVQTs7QUNWQSxJQUFNeUksVUFBVTtTQUNQLHdDQUFpQyxFQUQxQjthQUVILDRDQUFpQyxFQUY5QjtPQUdULGNBQVNvVyxRQUFULEVBQW1CSSxRQUFuQixFQUE2QjtPQUM3QixJQUFJamYsSUFBSSxDQUFiLEVBQWdCQSxJQUFJaWYsU0FBUzFjLE1BQTdCLEVBQXFDdkMsR0FBckMsRUFBMEM7WUFDaENzUyxVQUFULENBQW9Cb00sWUFBcEIsQ0FBaUNPLFNBQVNqZixDQUFULENBQWpDLEVBQThDNmUsU0FBU0osV0FBdkQ7O0VBTGE7WUFTSiwyQ0FBaUMsRUFUN0I7UUFVUixlQUFTSSxRQUFULGlCQUFpQztVQUMvQmxjLEdBQVIsQ0FBWSxvQkFBWixFQUFrQ2tjLFFBQWxDO01BQ0lBLFNBQVN6WCxRQUFULEtBQXNCLElBQTFCLEVBQStCO1lBQ3JCa0wsVUFBVCxDQUFvQm9MLFdBQXBCLENBQWdDbUIsUUFBaEM7OztDQWJILENBa0JBOztBQ1hBLElBQU1TLGFBQWE7UUFDWFYsS0FEVzthQUVOTSxVQUZNO2NBR0xDLFdBSEs7YUFJTkMsVUFKTTtZQUtQQyxTQUxPO1VBTVQ1VztDQU5WLENBU0E7O0FDVEEsSUFBTThXLGFBQWF2YyxPQUFPLE9BQVAsQ0FBbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBeUJNbWI7Ozt1QkFDT3hULEtBQVosRUFBbUI7Ozs7O3lIQUNaQSxLQURZOztRQUViNlUsVUFBTDtRQUNLM1UsRUFBTCxDQUFRLE9BQVIsRUFBaUIsTUFBS2lRLE1BQUwsQ0FBWTdNLElBQVosT0FBakI7UUFDS1AsSUFBTCxDQUFVL0MsS0FBVjs7Ozs7O21DQUllO09BQ1gsS0FBS3lMLEtBQVQsRUFBZTt1Q0FDSCxLQUFLQSxLQUFMLENBQVdvRixjQUFYLEVBQVgsSUFBd0MsS0FBS2xRLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBeEM7SUFERCxNQUVLO1dBQ0csQ0FBQyxLQUFLQSxVQUFMLENBQWdCLElBQWhCLENBQUQsQ0FBUDs7Ozs7dUJBSUdYLE9BQU87UUFDTkEsS0FBTCxHQUFhQSxLQUFiO1FBQ0t5TCxLQUFMLEdBQWF6TCxNQUFNeUwsS0FBTixHQUFZekwsTUFBTXlMLEtBQWxCLEdBQXdCLElBQXJDO1FBQ0s2RSxXQUFMLENBQWlCdFEsTUFBTXBILE9BQU4sR0FBZ0JvSCxNQUFNcEgsT0FBdEIsR0FBZ0MsRUFBakQ7UUFDSzJYLFdBQUwsQ0FBaUJ2USxLQUFqQjtRQUNLOFUsc0JBQUwsQ0FBNEI5VSxNQUFNd1EsUUFBTixHQUFpQnhRLE1BQU13USxRQUF2QixHQUFrQyxJQUE5RDs7OzsyQkFHUXJWLEtBQUs7UUFDUmdGLE9BQUwsQ0FBYWhGLEdBQWI7Ozs7NkJBR1VpQixNQUFLOzs7Ozs7eUJBQ0ZBLElBQWIsOEhBQWtCO1NBQVZ0RixDQUFVOztVQUNab0osRUFBTCwrQkFBV3BKLENBQVg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBSVVxRSxLQUFLO1FBQ1htRixVQUFMLENBQWdCbkYsR0FBaEI7T0FDSSxDQUFDLEtBQUt3RixVQUFMLENBQWdCLElBQWhCLENBQUwsRUFBMkI7U0FDckJMLFVBQUwsQ0FBZ0IsSUFBaEIsRUFBc0I2RixLQUFLSixtQkFBTCxHQUEyQjRLLEtBQUtDLE1BQUwsRUFBakQ7O09BRUcsQ0FBQyxLQUFLalEsVUFBTCxDQUFnQixNQUFoQixDQUFMLEVBQTZCO1NBQ3ZCb1UsZUFBTDs7Ozs7b0NBSWU7T0FDWkMsU0FBU3hkLFNBQVNnUCxhQUFULENBQXVCLElBQXZCLENBQWI7VUFDTzlRLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEIsS0FBS2lMLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBMUI7VUFDT2pMLFlBQVAsQ0FBb0IsYUFBcEIsRUFBbUMsSUFBbkM7UUFDSzRLLFVBQUwsQ0FBZ0IsTUFBaEIsRUFBd0IwVSxNQUF4QjtPQUNJQyxTQUFTLEtBQUtDLFNBQUwsQ0FBZSxLQUFLdlUsVUFBTCxDQUFnQixXQUFoQixDQUFmLENBQWI7T0FDQ3dVLGNBQWMsS0FBS3hVLFVBQUwsQ0FBZ0IsYUFBaEIsQ0FEZjtPQUVJd1UsV0FBSixFQUFnQjtRQUNYamMsU0FBUzFCLFNBQVM4USxhQUFULENBQXVCNk0sV0FBdkIsQ0FBYjtRQUNJamMsTUFBSixFQUFXO1VBQ0xvSCxVQUFMLENBQWdCLFVBQWhCLEVBQTRCcEgsTUFBNUI7Ozs7T0FJRSxDQUFDLEtBQUt5SCxVQUFMLENBQWdCLFVBQWhCLENBQUwsRUFBaUM7VUFDMUIsNkJBQU47SUFERCxNQUVLO1dBQ0d5VSxJQUFQLENBQVksS0FBS3pVLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBWixFQUF5QyxDQUFDcVUsTUFBRCxDQUF6Qzs7Ozs7OEJBS1U3WixLQUFLO1FBQ1hrYSxVQUFMLENBQWdCbGEsR0FBaEI7Ozs7eUNBR3NCQSxLQUFLO09BQ3ZCLENBQUNBLEdBQUwsRUFBVTtTQUNKa2EsVUFBTDtJQURELE1BRU8sSUFBSWxhLElBQUk1RixjQUFKLENBQW1CLE1BQW5CLEtBQThCNEYsSUFBSW1hLElBQXRDLEVBQTRDO1NBQzdDQyx1QkFBTCxDQUE2QmxQLG1CQUFpQjJCLElBQWpCLENBQXNCLEVBQXRCLEVBQTBCLEVBQTFCLEVBQThCN00sSUFBSW1hLElBQWxDLENBQTdCO0lBRE0sTUFFQSxJQUFJbmEsSUFBSTVGLGNBQUosQ0FBbUIsSUFBbkIsS0FBNEI0RixJQUFJYSxFQUFwQyxFQUF3QztTQUN6Q3VaLHVCQUFMLENBQTZCcGEsSUFBSWEsRUFBSixDQUFPc0wsU0FBUCxDQUFpQixJQUFqQixDQUE3QjtJQURNLE1BRUEsSUFBSW5NLElBQUk1RixjQUFKLENBQW1CLEtBQW5CLEtBQTZCNEYsSUFBSXhGLEdBQXJDLEVBQTBDO3VCQUMvQjZmLFVBQWpCLENBQTRCcmEsSUFBSXhGLEdBQWhDLEVBQXFDd0YsSUFBSXhGLEdBQXpDLEVBQ0VtUCxJQURGLENBQ08sS0FBS3lRLHVCQUFMLENBQTZCalMsSUFBN0IsQ0FBa0MsSUFBbEMsQ0FEUCxFQUVFMEIsS0FGRixDQUVRbkksVUFBVXNSLE1BRmxCO0lBRE0sTUFJQSxJQUFJaFQsSUFBSTVGLGNBQUosQ0FBbUIsTUFBbkIsS0FBOEI0RixJQUFJOUQsSUFBdEMsRUFBNEM7U0FDN0NrZSx1QkFBTCxDQUE2QmxQLG1CQUFpQm5SLEdBQWpCLENBQXFCaUcsSUFBSTlELElBQXpCLENBQTdCOzs7OzswQ0FJc0JrUSxNQUFNO09BQ3pCQSxJQUFKLEVBQVU7U0FDSm5ILFVBQUwsQ0FBZ0Isc0JBQWhCLEVBQXdDbUgsSUFBeEM7U0FDSzdJLE9BQUwsQ0FBYSxPQUFiO0lBRkQsTUFHTztjQUNJeEcsS0FBVixDQUFnQixrQ0FBaEI7Ozs7OzRDQUl3QjtVQUNsQixLQUFLMEksVUFBTCxDQUFnQixzQkFBaEIsQ0FBUDs7OztpREFHOEI7VUFDdkIsS0FBS0EsVUFBTCxDQUFnQixzQkFBaEIsRUFBd0MwRyxTQUF4QyxDQUFrRCxJQUFsRCxDQUFQOzs7OzhDQUcyQjtVQUNwQixLQUFLMUcsVUFBTCxDQUFnQixpQkFBaEIsQ0FBUDs7OztnREFHNkI7VUFDdEIsS0FBS1IsVUFBTCxDQUFnQixpQkFBaEIsRUFBbUMsS0FBS3FWLHVCQUFMLEdBQStCbk8sU0FBL0IsQ0FBeUMsSUFBekMsQ0FBbkMsQ0FBUDs7Ozs2QkFHVTtRQUNMbEgsVUFBTCxDQUFnQixPQUFoQixFQUF5QixJQUF6Qjs7OzsrQkFHWTtRQUNQQSxVQUFMLENBQWdCLE9BQWhCLEVBQXlCLEtBQXpCOzs7OzRCQUdTO1VBQ0YsS0FBS0EsVUFBTCxDQUFnQixPQUFoQixDQUFQOzs7OytCQUdZOztPQUVSLEtBQUt3VSxVQUFMLEtBQW9CNVYsTUFBTUMsT0FBTixDQUFjLEtBQUsyVixVQUFMLENBQWQsQ0FBcEIsSUFBdUQsS0FBS0EsVUFBTCxFQUFpQmhkLE1BQTVFLEVBQW9GOzs7Ozs7MkJBQ3JFLEtBQUtnZCxVQUFMLENBQWQsbUlBQWdDO1VBQXZCOWQsQ0FBdUI7O1VBQzNCQSxFQUFFOGIsT0FBTixFQUFjO1NBQ1hBLE9BQUY7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUlFaUMsVUFBTDs7Ozs0QkFHUTtRQUNIYSxVQUFMO09BQ0ksS0FBSy9VLFVBQUwsQ0FBZ0IsTUFBaEIsS0FBMkIsS0FBS0EsVUFBTCxDQUFnQixNQUFoQixFQUF3QmdILFVBQXZELEVBQWtFO1NBQzVEaEgsVUFBTCxDQUFnQixNQUFoQixFQUF3QmdILFVBQXhCLENBQW1Db0wsV0FBbkMsQ0FBK0MsS0FBS3BTLFVBQUwsQ0FBZ0IsTUFBaEIsQ0FBL0M7Ozs7OytCQUlXO1FBQ1BpVSxVQUFMLElBQW1CLEVBQW5COzs7OzZCQUdVO1VBQ0gsS0FBS0EsVUFBTCxDQUFQOzs7OzBCQUdPcEUsVUFBVTtRQUNab0UsVUFBTCxFQUFpQnBhLElBQWpCLENBQXNCZ1csUUFBdEI7Ozs7MkJBR1E7UUFDSGtGLFVBQUw7T0FDSSxLQUFLRCx1QkFBTCxFQUFKLEVBQW9DO1NBQzlCRSxXQUFMLENBQWlCLEtBQUtDLFVBQUwsQ0FBZ0J0UyxJQUFoQixDQUFxQixJQUFyQixDQUFqQjtTQUNLdVMsYUFBTDs7UUFFSW5YLE9BQUwsQ0FBYSxhQUFiOzs7OzJCQUdPO1FBQ0ZvWCxtQkFBTDtPQUNJLEtBQUtMLHVCQUFMLEVBQUosRUFBb0M7U0FDOUJFLFdBQUwsQ0FBaUIsS0FBS0MsVUFBTCxDQUFnQnRTLElBQWhCLENBQXFCLElBQXJCLENBQWpCO1NBQ0t1UyxhQUFMOztRQUVJblgsT0FBTCxDQUFhLGFBQWI7Ozs7a0NBR2M7T0FDVixLQUFLaUMsVUFBTCxDQUFnQixVQUFoQixDQUFKLEVBQWlDO1FBQzVCc1UsU0FBUyxLQUFLQyxTQUFMLENBQWUsS0FBS3ZVLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBZixDQUFiO1dBQ09vVixNQUFQLENBQWMsS0FBS3BWLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBZDtTQUNLZ1YsV0FBTCxDQUFpQixLQUFLSyxTQUFMLENBQWUxUyxJQUFmLENBQW9CLElBQXBCLENBQWpCO1dBQ08yUyxLQUFQLENBQWEsS0FBS3RWLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBYjtJQUpELE1BS087Y0FDSXpJLEtBQVYsQ0FBZ0IsbUJBQWhCOzs7Ozs0QkFJUWxDLE1BQU0wVCxPQUFNO09BQ2pCd00sT0FBTyxLQUFLQyxhQUFMLENBQW1CbmdCLElBQW5CLENBQVg7T0FDQ29nQixRQUFRRixLQUFLcEQsUUFBTCxFQURUO09BRUNvQixpQkFGRDtPQUdDbUMsaUJBSEQ7T0FJQ3BCLGVBSkQ7T0FLSXZMLFVBQVUsQ0FBZCxFQUFnQjthQUNOLEtBQUt3TCxTQUFMLENBQWUsS0FBS3ZVLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBZixDQUFUO2VBQ1csS0FBS0EsVUFBTCxDQUFnQixVQUFoQixDQUFYO0lBRkQsTUFHSzthQUNLLEtBQUt1VSxTQUFMLENBQWUvTyxLQUFLRCxtQkFBcEIsQ0FBVDtlQUNXLEtBQUt0RixVQUFMLENBQWdCLGdCQUFoQixDQUFYOztVQUVNd1UsSUFBUCxDQUFZbEIsUUFBWixFQUFzQmtDLEtBQXRCO2NBQ1dsQyxRQUFYOzs7Ozs7MEJBQ2FrQyxLQUFiLG1JQUFtQjtTQUFYdGYsQ0FBVzs7U0FDZEEsRUFBRXdmLFFBQUYsS0FBZSxDQUFuQixFQUFxQjtpQkFDVHhmLENBQVg7ZUFDU3BCLFlBQVQsQ0FBc0IsY0FBdEIsRUFBc0MsS0FBS2lMLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBdEM7ZUFDU2pMLFlBQVQsQ0FBc0IsU0FBdEIsRUFBaUN3Z0IsS0FBS3RWLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBakM7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUdHUixVQUFMLENBQWdCLGdCQUFoQixFQUFrQ2lXLFFBQWxDOzs7OzRCQUdTdmdCLFFBQVE7O09BRWI2ZSxXQUFXcGYsY0FBWCxDQUEwQk8sTUFBMUIsQ0FBSixFQUF1QztXQUMvQjZlLFdBQVc3ZSxNQUFYLENBQVA7SUFERCxNQUVPO1dBQ0M2ZSxXQUFXeE8sS0FBS0YsY0FBaEIsQ0FBUDs7Ozs7OEJBSVVuSyxNQUFNO09BQ2JrRCxNQUFNQyxPQUFOLENBQWMsS0FBSzFFLE9BQUwsRUFBZCxDQUFKLEVBQW1DO1NBQzdCLElBQUl6RCxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS3lELE9BQUwsR0FBZTNDLE1BQW5DLEVBQTJDZCxHQUEzQyxFQUFnRDtVQUMxQyxLQUFLeUQsT0FBTCxHQUFlekQsQ0FBZixDQUFMLEVBQXdCQSxDQUF4Qjs7SUFGRixNQUlPO1NBQ0QsS0FBS3lELE9BQUwsRUFBTCxFQUFxQixDQUFyQjs7Ozs7OEJBSVV1QixNQUFNO09BQ2JrRCxNQUFNQyxPQUFOLENBQWMsS0FBS3NYLFFBQUwsRUFBZCxDQUFKLEVBQW9DO1NBQzlCLElBQUl6ZixJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS3lmLFFBQUwsR0FBZ0IzZSxNQUFwQyxFQUE0Q2QsR0FBNUMsRUFBaUQ7VUFDM0MsS0FBS3lmLFFBQUwsR0FBZ0J6ZixDQUFoQixDQUFMLEVBQXlCQSxDQUF6Qjs7Ozs7Ozs7Ozs7NkJBU1FkLE1BQU07T0FDWixDQUFDLEtBQUttZ0IsYUFBTCxDQUFtQm5nQixJQUFuQixDQUFMLEVBQStCOztRQUUxQndnQixXQUFXLElBQUl0RyxXQUFKLENBQWdCO1dBQ3hCbGEsSUFEd0I7ZUFFcEIsS0FBS3lnQiw0QkFBTCxDQUFrQ25ULElBQWxDLENBQXVDLElBQXZDLENBRm9CO2NBR3JCLEtBQUszQyxVQUFMLEVBSHFCO2dCQUluQjtLQUpHLENBQWY7O1NBT0srVixPQUFMLENBQWFGLFFBQWI7SUFURCxNQVVLOztTQUVDRyxVQUFMLENBQWdCLEtBQUtSLGFBQUwsQ0FBbUJuZ0IsSUFBbkIsQ0FBaEI7Ozs7OzZCQUlTa2dCLE1BQUs7UUFDVnJILE1BQUw7Ozs7d0NBR3FCOzthQUVYK0gsSUFBVixDQUNDN1gsU0FERDtJQUdFLEtBQUs4WCxlQUFMLENBQXFCdlQsSUFBckIsQ0FBMEIsSUFBMUIsQ0FERDtRQUVNd1Qsb0JBQUwsQ0FBMEJ4VCxJQUExQixDQUErQixJQUEvQixDQUZELENBRkQ7Ozs7Ozs7Ozs7b0NBY2lCOzs7T0FDYnlULGNBQWMsRUFBbEI7UUFDS3BCLFdBQUwsQ0FBaUIsVUFBQzNmLElBQUQsY0FBbUI7UUFDL0JrZ0IsT0FBTyxPQUFLQyxhQUFMLENBQW1CbmdCLElBQW5CLENBQVg7UUFDSWtnQixJQUFKLEVBQVM7aUJBQ0kxYixJQUFaLENBQWlCMGIsSUFBakI7O0lBSEY7VUFNT2EsV0FBUDs7Ozs7Ozs7O3VDQU1vQkEsYUFBWTtRQUM1QixJQUFJamdCLElBQUksQ0FBWixFQUFlQSxJQUFJLEtBQUt5ZixRQUFMLEdBQWdCM2UsTUFBbkMsRUFBMkNkLEdBQTNDLEVBQStDO1FBQzFDaWdCLFlBQVluaEIsT0FBWixDQUFvQixLQUFLMmdCLFFBQUwsR0FBZ0J6ZixDQUFoQixDQUFwQixNQUE0QyxDQUFDLENBQWpELEVBQW1EO1VBQzdDeWYsUUFBTCxHQUFnQnpmLENBQWhCLEVBQW1COGIsT0FBbkI7VUFDSzJELFFBQUwsR0FBZ0IvVSxNQUFoQixDQUF1QjFLLENBQXZCLEVBQTBCLENBQTFCOzs7Ozs7O2dDQU1XZCxNQUFNO1FBQ2QsSUFBSWMsQ0FBVCxJQUFjLEtBQUt5ZixRQUFMLEVBQWQsRUFBK0I7UUFDMUIsS0FBS0EsUUFBTCxHQUFnQnpmLENBQWhCLEVBQW1Ca2dCLE1BQW5CLENBQTBCaGhCLElBQTFCLENBQUosRUFBcUM7WUFDN0IsS0FBS3VnQixRQUFMLEdBQWdCemYsQ0FBaEIsQ0FBUDs7O1VBR0ssS0FBUDs7OztFQW5UeUJpSixTQXVUM0I7O0FDbFZBLElBQU1rWCxpQ0FBaUMsZUFBdkM7SUFDQ0MsNEJBQTRCLE9BRDdCO0lBRUNDLHdCQUF3QixTQUZ6QjtJQUdDQyw4QkFBOEIsSUFIL0I7SUFJQ0MsMEJBQTBCLFFBSjNCO0lBS0NDLDBCQUEwQixPQUwzQjtJQU1DQywwQkFBMEIsTUFOM0I7SUFPQ0MseUJBQXlCLE9BUDFCOztJQVNNQzs7O3dCQUNPckksR0FBWixFQUFpQjs7Ozs7OztZQUVOcFgsR0FBVixDQUFjLGtCQUFkO1FBQ0tvWCxHQUFMLEdBQVdBLEdBQVg7UUFDS2hQLFVBQUwsQ0FBZ0I7VUFDUixLQURRO1VBRVIsRUFGUTthQUdMK1cscUJBSEs7WUFJTjtHQUpWO1FBTUtoWCxPQUFMLENBQWEsRUFBYjtRQUNLRyxVQUFMLENBQWdCO2VBQ0hpWCx1QkFERztzQkFFSU4sOEJBRko7V0FHUCxNQUFLN0gsR0FBTCxDQUFTek8sVUFBVCxDQUFvQixjQUFwQixDQUhPO1lBSU51Vyx5QkFKTTtrQkFLQUUsMkJBTEE7VUFNVDtZQUNFQyx1QkFERjtZQUVHQzs7R0FSVjtRQVdLcFgsRUFBTCxDQUFRLE9BQVIsRUFBaUIsTUFBS3dYLFVBQUwsQ0FBZ0JwVSxJQUFoQixPQUFqQjs7OztNQUlJcVUsYUFBYSxNQUFLdkksR0FBTCxDQUFTd0ksYUFBVCxFQUFqQjtRQUNLQyxJQUFMLEdBQVksRUFBWjtPQUNLLElBQUkvZ0IsQ0FBVCxJQUFjNmdCLFVBQWQsRUFBMEI7T0FDckJBLFdBQVdwaUIsY0FBWCxDQUEwQnVCLENBQTFCLENBQUosRUFBaUM7VUFDM0IrZ0IsSUFBTCxDQUFVL2dCLENBQVYsSUFBZTZnQixXQUFXN2dCLENBQVgsQ0FBZjs7Ozs7Ozs7K0JBTVM7UUFDTnFaLE1BQUwsQ0FBWSxLQUFLdlAsVUFBTCxDQUFnQixVQUFoQixDQUFaLEVBQXlDLEtBQUtyRyxPQUFMLEVBQXpDLEVBQXlELEtBQUtxRyxVQUFMLENBQWdCLFNBQWhCLENBQXpEOzs7O3lEQUc2SDtPQUF2SGtYLFFBQXVILHVFQUE3RyxTQUE2Rzs7OztPQUFsRjloQixJQUFrRix1RUFBM0UsRUFBMkU7T0FBNUNnSSxPQUE0Qyx1RUFBbEMsRUFBa0M7O1VBQ3RILElBQUkvSCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQW1CO1FBQ2pDNGhCLE9BQU8sT0FBS0MsT0FBTCxDQUFhRixRQUFiLENBQVg7O1FBRUksT0FBT0MsSUFBUCxLQUFnQixXQUFoQixJQUErQkEsU0FBUyxJQUE1QyxFQUFrRDtZQUMxQyxlQUFQLEVBQXdCRCxRQUF4QjtLQURELE1BRUs7WUFDR2piLFVBQVUzQixNQUFWLENBQWlCLEVBQWpCLEVBQXFCNmMsSUFBckIsQ0FBUDs7O1NBR0ksQ0FBRSxPQUFPQSxLQUFLN0QsUUFBWixLQUF5QixXQUExQixJQUEyQzZELEtBQUs3RCxRQUFMLEtBQWtCLElBQTlELEtBQXlFLE9BQU82RCxLQUFLNUMsV0FBWixLQUE0QixXQUE1QixJQUEyQzRDLEtBQUs1QyxXQUFMLEtBQXFCLElBQWhFLElBQXdFNEMsS0FBSzVDLFdBQUwsQ0FBaUJ2ZCxNQUFqQixHQUEwQixDQUEvSyxFQUFtTDtXQUM3S3NjLFFBQUwsR0FBZ0IxYyxTQUFTOFEsYUFBVCxDQUF1QnlQLEtBQUs1QyxXQUE1QixDQUFoQjtNQURELE1BRUs7V0FDQ2pCLFFBQUwsR0FBZ0IxYyxTQUFTOFEsYUFBVCxDQUF1QixPQUFLM0gsVUFBTCxDQUFnQixtQkFBaEIsQ0FBdkIsQ0FBaEI7O1VBRUkzSyxJQUFMLEdBQVlBLElBQVo7U0FDSSxPQUFPK2hCLEtBQUsvWixPQUFaLEtBQXdCLFdBQXhCLElBQXVDK1osS0FBSy9aLE9BQUwsS0FBaUIsSUFBeEQsSUFBZ0VqRixPQUFPTyxJQUFQLENBQVl5ZSxLQUFLL1osT0FBakIsRUFBMEJwRyxNQUExQixHQUFtQyxDQUF2RyxFQUEwRztXQUNwR29HLE9BQUwsR0FBZW5CLFVBQVUzQixNQUFWLENBQWlCNmMsS0FBSy9aLE9BQXRCLEVBQStCQSxPQUEvQixDQUFmO01BREQsTUFFTztXQUNEQSxPQUFMLEdBQWVBLE9BQWY7OztTQUdHLE9BQUsyQyxVQUFMLENBQWdCLGVBQWhCLENBQUosRUFBc0M7O1VBRWpDLE9BQU9vWCxLQUFLRSxXQUFaLEtBQTRCLFdBQTVCLElBQTJDRixLQUFLRSxXQUFMLElBQW9CLElBQS9ELElBQXVFRixLQUFLRSxXQUFMLENBQWlCcmdCLE1BQWpCLElBQTJCLENBQXRHLEVBQXlHO1dBQ3BHc2dCLFNBQVVILEtBQUtJLE1BQUwsR0FBYyxPQUFLL0ksR0FBTCxDQUFTek8sVUFBVCxDQUFvQixjQUFwQixDQUFkLEdBQW1ELE9BQUt5WCxlQUFMLEVBQWpFO1dBQ0MvZ0IsT0FBUyxPQUFPMGdCLEtBQUsxZ0IsSUFBWixLQUFxQixXQUFyQixJQUFvQzBnQixLQUFLMWdCLElBQUwsS0FBYyxJQUFsRCxJQUEwRDBnQixLQUFLMWdCLElBQUwsQ0FBVU8sTUFBVixHQUFtQixDQUE5RSxHQUFtRm1nQixLQUFLMWdCLElBQXhGLEdBQStGeWdCLFFBRHhHO1dBRUNPLFVBQVUsT0FBSzFYLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FGWDs7WUFJS3NYLFdBQUwsR0FBb0IsQ0FBQ0MsTUFBRCxFQUFTN2dCLElBQVQsRUFBZW9JLElBQWYsQ0FBb0IsR0FBcEIsSUFBMkI0WSxPQUEvQzs7TUFQRixNQVNPOztVQUVGTixLQUFLeGlCLGNBQUwsQ0FBb0IsY0FBcEIsQ0FBSixFQUF5Qzs7WUFFbkMraUIsWUFBTCxHQUFvQixPQUFLM1gsVUFBTCxDQUFnQixRQUFoQixJQUE0Qm9YLEtBQUtPLFlBQWpDLEdBQWdELE9BQUszWCxVQUFMLENBQWdCLFNBQWhCLENBQXBFOzs7WUFHR1AsVUFBTCxDQUFnQixXQUFoQixFQUE2QixJQUFJb1QsWUFBSixDQUFpQjtnQkFBQTtnQkFFcEM7YUFDRnVFLEtBQUtPLFlBREg7WUFFSFAsS0FBS0U7T0FKa0M7Y0FNdEMsQ0FBQyxDQUFDLGFBQUQsRUFBZ0IvaEIsT0FBaEIsQ0FBRCxDQU5zQztlQU9yQztpQkFDRzZoQixLQUFLN0QsUUFEUjt1QkFBQTtrQkFHSXNELDBCQUEwQk8sS0FBS1E7O01BVmYsQ0FBN0I7O0lBckNLLENBQVA7Ozs7MkJBdURRO1VBQ0QsS0FBS25KLEdBQVo7Ozs7MkJBR1EzSixPQUFPO1FBQ1ZyRixVQUFMLENBQWdCLE9BQWhCLEVBQXlCcUYsS0FBekI7VUFDTyxJQUFQOzs7OzZCQUdVO1VBQ0gsS0FBS3JGLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBUDs7Ozs2QkFHb0I7T0FBWmpGLEdBQVksdUVBQU4sSUFBTTs7UUFDZmlGLFVBQUwsQ0FBZ0IsT0FBaEIsRUFBeUJqRixHQUF6QjtTQUNNLEtBQUt1RCxPQUFMLENBQWEsT0FBYixDQUFOLEdBQThCLEtBQUtBLE9BQUwsQ0FBYSxNQUFiLENBQTlCOzs7OzBCQUdPckgsTUFBTTBnQixNQUFLO1FBQ2IzWCxVQUFMLENBQWdCN0MsVUFBUWtDLElBQVIsQ0FBYSxPQUFiLEVBQXNCcEksSUFBdEIsQ0FBaEIsRUFBNkMwZ0IsSUFBN0M7VUFDTyxJQUFQOzs7OzJCQUdRUyxPQUFNO1FBQ1YsSUFBSTFoQixDQUFSLElBQWEwaEIsS0FBYixFQUFtQjtTQUNicFksVUFBTCxDQUFnQjdDLFVBQVFrQyxJQUFSLENBQWEsT0FBYixFQUFzQjNJLENBQXRCLENBQWhCLEVBQTBDMGhCLE1BQU0xaEIsQ0FBTixDQUExQzs7VUFFTSxJQUFQOzs7OzRCQUd3QjtPQUFqQk8sSUFBaUIsdUVBQVYsU0FBVTs7VUFDakIsS0FBS3VKLFVBQUwsQ0FBZ0JyRCxVQUFRa0MsSUFBUixDQUFhLE9BQWIsRUFBc0JwSSxJQUF0QixDQUFoQixDQUFQOzs7O2dDQUdhOEQsS0FBSztRQUNibUYsVUFBTCxDQUFnQixZQUFoQixFQUE4Qm5GLEdBQTlCO1VBQ08sSUFBUDs7OztrQ0FHZTtVQUNSLEtBQUt3RixVQUFMLENBQWdCLFlBQWhCLENBQVA7Ozs7b0NBR2dCO1VBQ1QsQ0FBQyxLQUFLeU8sR0FBTCxDQUFTek8sVUFBVCxDQUFvQixlQUFwQixDQUFELEVBQXVDLEtBQUs4WCxhQUFMLEVBQXZDLEVBQTZEaFosSUFBN0QsQ0FBa0UsR0FBbEUsQ0FBUDs7OztFQTdJMEJNLFNBa0o1Qjs7QUM3SkEsSUFBSTJZLDJCQUEyQjtVQUNyQixpQkFBU0MsS0FBVCxFQUFnQjVhLElBQWhCLEVBQXNCQyxPQUF0QixFQUErQjtRQUNqQ3NVLGVBQU4sR0FBd0IvVSxVQUFRYyxTQUFSLENBQWtCc2EsTUFBTTNHLG1CQUF4QixFQUE2Q2pVLElBQTdDLEVBQW1EQyxPQUFuRCxDQUF4QjtNQUNJMmEsTUFBTXpHLE1BQU4sQ0FBYXRjLE9BQWIsQ0FBcUIsWUFBckIsSUFBcUMsQ0FBQyxDQUExQyxFQUE2QztTQUN0QzBjLGVBQU4sR0FBd0JxRyxNQUFNckcsZUFBTixDQUFzQjlXLFdBQXRCLEVBQXhCOztRQUVLNkwsT0FBTixDQUFjZ04sV0FBZCxHQUE0QnNFLE1BQU1yRyxlQUFsQztFQU42QjtPQVF4QixjQUFTcUcsS0FBVCxFQUFnQjVhLElBQWhCLEVBQXNCQyxPQUF0QixFQUErQjtRQUM5QnFKLE9BQU4sQ0FBY3pLLGdCQUFkLENBQStCK2IsTUFBTXpHLE1BQU4sQ0FBYSxDQUFiLENBQS9CLEVBQWdELFVBQUM5YSxDQUFELEVBQU87S0FDcER3aEIsd0JBQUY7S0FDRUMsY0FBRjtPQUNJRixNQUFNckcsZUFBVixFQUEyQjtXQUNuQnFHLE1BQU1yRyxlQUFOLENBQXNCO2lCQUFBO2VBQUE7cUJBQUE7O0tBQXRCLENBQVA7SUFERCxNQU9PO1dBQ0MsSUFBUDs7R0FYRjtFQVQ2QjtRQXdCdkIsZUFBU3FHLEtBQVQsRUFBZ0I1YSxJQUFoQixFQUFzQkMsT0FBdEIsRUFBK0I7TUFDakM4YSxhQUFhLENBQUMsUUFBRCxFQUFXLE9BQVgsQ0FBakI7TUFDQ0MsVUFBVSxTQUFWQSxPQUFVLEdBQU07T0FDWCxDQUFDLFVBQUQsRUFBYSxPQUFiLEVBQXNCLGlCQUF0QixFQUF5Q25qQixPQUF6QyxDQUFpRCtpQixNQUFNdFIsT0FBTixDQUFjc0ksSUFBL0QsSUFBdUUsQ0FBQyxDQUE1RSxFQUErRTtZQUN0RWdKLE1BQU10UixPQUFOLENBQWNzSSxJQUF0QjtVQUNLLFVBQUw7O2lCQUVVaFIsR0FBUixDQUFZZ2EsTUFBTTNHLG1CQUFsQixFQUF1Q2pVLElBQXZDLEVBQTZDQyxPQUE3QyxFQUFzRDJhLE1BQU10UixPQUFOLENBQWMyUixPQUFwRTs7O1VBR0csT0FBTDs7O2lCQUdVcmEsR0FBUixDQUFZWCxRQUFRaWIsS0FBUixDQUFjNWhCLElBQTFCLEVBQWdDMkcsUUFBUWhJLElBQXhDLEVBQThDZ0ksT0FBOUMsRUFBdUQyYSxNQUFNdFIsT0FBTixDQUFjMlIsT0FBZCxHQUF3QkwsTUFBTXRSLE9BQU4sQ0FBYzlQLEtBQXRDLEdBQThDLElBQXJHOzs7VUFHRyxpQkFBTDs7V0FFTTJoQixXQUFXLEdBQUd6ZCxLQUFILENBQVN4QyxJQUFULENBQWMwZixNQUFNdFIsT0FBTixDQUFjOFIsZUFBNUIsRUFBNkN2UyxHQUE3QyxDQUFpRDtlQUFLbk0sRUFBRWxELEtBQVA7UUFBakQsQ0FBZjs7aUJBRVFvSCxHQUFSLENBQVlnYSxNQUFNM0csbUJBQWxCLEVBQXVDalUsSUFBdkMsRUFBNkNDLE9BQTdDLEVBQXNEa2IsUUFBdEQ7Ozs7SUFqQkgsTUFxQk87O2NBRUV2YSxHQUFSLENBQVlnYSxNQUFNM0csbUJBQWxCLEVBQXVDalUsSUFBdkMsRUFBNkNDLE9BQTdDLEVBQXNEMmEsTUFBTXRSLE9BQU4sQ0FBYzlQLEtBQXBFOztHQXpCSDtRQTRCTThQLE9BQU4sQ0FBYzNSLFlBQWQsQ0FBMkIsT0FBM0IsRUFBb0M2SCxVQUFRckksR0FBUixDQUFZeWpCLE1BQU0zRyxtQkFBbEIsRUFBdUNqVSxJQUF2QyxFQUE2Q0MsT0FBN0MsQ0FBcEM7TUFDSTJhLE1BQU10UixPQUFOLENBQWMrUixjQUFkLEtBQWlDLElBQXJDLEVBQTJDOzs7Ozs7eUJBQzVCTixVQUFkLDhIQUEwQjtTQUFqQmhpQixDQUFpQjs7V0FDbkJ1USxPQUFOLENBQWN6SyxnQkFBZCxDQUErQjlGLENBQS9CLEVBQWtDaWlCLE9BQWxDOzs7Ozs7Ozs7Ozs7Ozs7OztTQUVLMVIsT0FBTixDQUFjK1IsY0FBZCxHQUErQixJQUEvQjs7RUExRDRCO09BNkR4QixjQUFTVCxLQUFULEVBQWdCNWEsSUFBaEIsRUFBc0JDLE9BQXRCLEVBQStCO01BQ2hDd0MsTUFBTWpELFVBQVFySSxHQUFSLENBQVl5akIsTUFBTTNHLG1CQUFsQixFQUF1Q2pVLElBQXZDLEVBQTZDQyxPQUE3QyxDQUFWO1FBQ01zVSxlQUFOLEdBQTBCLE9BQU85UixHQUFQLEtBQWUsVUFBaEIsR0FBOEJBLElBQUk7ZUFBQTthQUFBOztHQUFKLENBQTlCLEdBSXBCQSxHQUpMO1FBS002RyxPQUFOLENBQWMzUixZQUFkLENBQTJCaWpCLE1BQU16RyxNQUFOLENBQWEsQ0FBYixDQUEzQixFQUE0Q3lHLE1BQU1yRyxlQUFsRDtFQXBFNkI7T0FzRXhCLGNBQVNxRyxLQUFULEVBQWdCNWEsSUFBaEIsRUFBc0JDLE9BQXRCLEVBQStCO1FBQzlCcUosT0FBTixDQUFjM1IsWUFBZCxDQUEyQixNQUEzQixFQUFtQzZILFVBQVFySSxHQUFSLENBQVl5akIsTUFBTTNHLG1CQUFsQixFQUF1Q2pVLElBQXZDLEVBQTZDQyxPQUE3QyxDQUFuQztFQXZFNkI7U0F5RXRCLDBDQUFxQyxFQXpFZjtVQTRFckIsaUJBQVMyYSxLQUFULEVBQWdCNWEsSUFBaEIsRUFBc0JDLE9BQXRCLEVBQStCO01BQ25DbkMsU0FBUzBCLFVBQVFySSxHQUFSLENBQVl5akIsTUFBTTNHLG1CQUFsQixFQUF1Q2pVLElBQXZDLEVBQTZDQyxPQUE3QyxDQUFiO1FBQ01zVSxlQUFOLEdBQTBCLE9BQU96VyxNQUFQLEtBQWtCLFVBQW5CLEdBQWlDQSxPQUFPO2VBQUE7YUFBQTs7R0FBUCxDQUFqQyxHQUlwQkEsTUFKTDtRQUtNeVcsZUFBTixHQUF3QnFHLE1BQU10UixPQUFOLENBQWMzUixZQUFkLENBQTJCLFNBQTNCLEVBQXNDLElBQXRDLENBQXhCLEdBQXNFaWpCLE1BQU10UixPQUFOLENBQWNxTCxlQUFkLENBQThCLFNBQTlCLENBQXRFO0VBbkY2QjtRQXFGdkIsZ0JBQVNpRyxLQUFULEVBQWdCNWEsSUFBaEIsRUFBc0JDLE9BQXRCLEVBQStCO01BQ2pDd0MsTUFBTWpELFVBQVFySSxHQUFSLENBQVl5akIsTUFBTTNHLG1CQUFsQixFQUF1Q2pVLElBQXZDLEVBQTZDQyxPQUE3QyxDQUFWO1FBQ01zVSxlQUFOLEdBQTBCLE9BQU85UixHQUFQLEtBQWUsVUFBaEIsR0FBOEJBLElBQUk7ZUFBQTthQUFBOztHQUFKLENBQTlCLEdBSXBCQSxHQUpMO01BS0ltWSxNQUFNekcsTUFBTixDQUFhdGEsTUFBYixHQUFzQixDQUF0QixJQUEyQnloQixNQUFNVixNQUFNckcsZUFBWixDQUEvQixFQUE2RDtPQUN4RHFHLE1BQU1yRyxlQUFWLEVBQTJCO1VBQ3BCakwsT0FBTixDQUFjaVMsU0FBZCxDQUF3QnBYLEdBQXhCLENBQTRCeVcsTUFBTXpHLE1BQU4sQ0FBYSxDQUFiLENBQTVCO1FBQ0l5RyxNQUFNekcsTUFBTixDQUFhdGEsTUFBYixHQUFzQixDQUExQixFQUE2QjtXQUN0QnlQLE9BQU4sQ0FBY2lTLFNBQWQsQ0FBd0JDLE1BQXhCLENBQStCWixNQUFNekcsTUFBTixDQUFhLENBQWIsQ0FBL0I7O0lBSEYsTUFLTztVQUNBN0ssT0FBTixDQUFjaVMsU0FBZCxDQUF3QkMsTUFBeEIsQ0FBK0JaLE1BQU16RyxNQUFOLENBQWEsQ0FBYixDQUEvQjtRQUNJeUcsTUFBTXpHLE1BQU4sQ0FBYXRhLE1BQWIsR0FBc0IsQ0FBMUIsRUFBNkI7V0FDdEJ5UCxPQUFOLENBQWNpUyxTQUFkLENBQXdCcFgsR0FBeEIsQ0FBNEJ5VyxNQUFNekcsTUFBTixDQUFhLENBQWIsQ0FBNUI7OztHQVRILE1BWU87T0FDRnNILE9BQU8sS0FBWDtRQUNLLElBQUlua0IsSUFBSSxDQUFiLEVBQWdCQSxJQUFJc2pCLE1BQU16RyxNQUFOLENBQWF0YSxNQUFqQyxFQUF5Q3ZDLEdBQXpDLEVBQThDO1FBQ3pDQSxNQUFNc2pCLE1BQU1yRyxlQUFoQixFQUFpQztXQUMxQmpMLE9BQU4sQ0FBY2lTLFNBQWQsQ0FBd0JwWCxHQUF4QixDQUE0QnlXLE1BQU16RyxNQUFOLENBQWE3YyxDQUFiLENBQTVCO1lBQ08sSUFBUDtLQUZELE1BR087V0FDQWdTLE9BQU4sQ0FBY2lTLFNBQWQsQ0FBd0JDLE1BQXhCLENBQStCWixNQUFNekcsTUFBTixDQUFhN2MsQ0FBYixDQUEvQjs7O09BR0UsQ0FBQ21rQixJQUFMLEVBQVc7VUFDSm5TLE9BQU4sQ0FBY2lTLFNBQWQsQ0FBd0JwWCxHQUF4QixDQUE0QnlXLE1BQU16RyxNQUFOLENBQWEsQ0FBYixDQUE1Qjs7O0VBbkgyQjtVQXVIckIsaUJBQVN5RyxLQUFULEVBQWdCNWEsSUFBaEIsRUFBc0JDLE9BQXRCLEVBQStCO01BQ25DM0ksSUFBSSxDQUFSO01BQ0Nva0IsU0FBUyxJQURWO01BRUNDLGlCQUFpQixPQUZsQjtNQUdDQyxpQkFBaUIsTUFIbEI7TUFJQ0MscUJBQXFCNWIsUUFBUXpJLGNBQVIsQ0FBdUIsT0FBdkIsS0FBbUN5SSxRQUFRaWIsS0FBUixDQUFjMWpCLGNBQWQsQ0FBNkIsTUFBN0IsQ0FBbkMsR0FBMEV5SSxRQUFRaWIsS0FBUixDQUFjNWhCLElBQXhGLEdBQStGLE9BSnJIO1FBS01nUSxPQUFOLENBQWNaLFNBQWQsR0FBMEIsRUFBMUI7TUFDSWtTLE1BQU16RyxNQUFOLENBQWF0YSxNQUFiLEtBQXdCLENBQTVCLEVBQStCO29CQUNiK2dCLE1BQU16RyxNQUFOLENBQWEsQ0FBYixDQUFqQjtvQkFDaUJ5RyxNQUFNekcsTUFBTixDQUFhLENBQWIsQ0FBakI7O01BRUcsT0FBT2xVLE9BQVAsS0FBbUIsV0FBbkIsSUFBa0NBLFlBQVksSUFBOUMsSUFBc0RBLFFBQVF6SSxjQUFSLENBQXVCLFNBQXZCLENBQXRELElBQTJGeUksUUFBUTZiLE9BQXZHLEVBQWdIO1lBQ3RHcmlCLFNBQVNnUCxhQUFULENBQXVCLFFBQXZCLENBQVQ7VUFDTzlRLFlBQVAsQ0FBb0IsT0FBcEIsRUFBNkIsRUFBN0I7VUFDTzJlLFdBQVAsR0FBcUJyVyxRQUFROGIsV0FBN0I7U0FDTXpTLE9BQU4sQ0FBY1YsV0FBZCxDQUEwQjhTLE1BQTFCOztNQUVHLE9BQU8xYixJQUFQLEtBQWdCLFdBQWhCLElBQStCQSxTQUFTLElBQTVDLEVBQWtEO09BQzdDNkosTUFBTXJLLFVBQVFySSxHQUFSLENBQVl5akIsTUFBTTNHLG1CQUFsQixFQUF1Q2pVLElBQXZDLEVBQTZDQyxPQUE3QyxDQUFWO1FBQ0szSSxJQUFJLENBQVQsRUFBWUEsSUFBSXVTLElBQUloUSxNQUFwQixFQUE0QnZDLEdBQTVCLEVBQWlDO2FBQ3ZCbUMsU0FBU2dQLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBVDtXQUNPOVEsWUFBUCxDQUFvQixPQUFwQixFQUE2QmtTLElBQUl2UyxDQUFKLEVBQU9xa0IsY0FBUCxDQUE3QjtXQUNPckYsV0FBUCxHQUFxQnpNLElBQUl2UyxDQUFKLEVBQU9za0IsY0FBUCxDQUFyQjtRQUNJM2IsUUFBUWliLEtBQVIsQ0FBY2MsS0FBbEIsRUFBeUI7U0FDcEJoYyxLQUFLNmIsa0JBQUwsRUFBeUJoa0IsT0FBekIsQ0FBaUNnUyxJQUFJdlMsQ0FBSixFQUFPcWtCLGNBQVAsQ0FBakMsSUFBMkQsQ0FBQyxDQUFoRSxFQUFtRTthQUMzRGhrQixZQUFQLENBQW9CLFVBQXBCLEVBQWdDLElBQWhDOztLQUZGLE1BSU87U0FDRnFJLEtBQUs2YixrQkFBTCxNQUE2QmhTLElBQUl2UyxDQUFKLEVBQU9xa0IsY0FBUCxDQUFqQyxFQUF5RDthQUNqRGhrQixZQUFQLENBQW9CLFVBQXBCLEVBQWdDLElBQWhDOzs7VUFHSTJSLE9BQU4sQ0FBY1YsV0FBZCxDQUEwQjhTLE1BQTFCOzs7RUF2SjJCO09BMkp6QixjQUFTZCxLQUFULEVBQWdCNWEsSUFBaEIsRUFBc0JDLE9BQXRCLEVBQThCO01BQzlCLENBQUMyYSxNQUFNdFIsT0FBTixDQUFjMlMsb0JBQW5CLEVBQXdDO1NBQ2pDMUgsZUFBTixHQUF3Qi9VLFVBQVFjLFNBQVIsQ0FBa0JzYSxNQUFNM0csbUJBQXhCLEVBQTZDalUsSUFBN0MsRUFBbURDLE9BQW5ELENBQXhCO1NBQ01xSixPQUFOLENBQWMzUixZQUFkLENBQTJCLE1BQTNCLEVBQW1Da00sWUFBVStCLFlBQVYsQ0FBdUJnVixNQUFNckcsZUFBN0IsQ0FBbkM7U0FDTWpMLE9BQU4sQ0FBY3pLLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLFVBQUN4RixDQUFELEVBQUs7TUFDMUN5aEIsY0FBRjtnQkFDVWpLLFFBQVYsQ0FBbUJyUixVQUFRYyxTQUFSLENBQWtCc2EsTUFBTTNHLG1CQUF4QixFQUE2Q2pVLElBQTdDLEVBQW1EQyxPQUFuRCxDQUFuQjtXQUNPLEtBQVA7SUFIRDtTQUtNcUosT0FBTixDQUFjMlMsb0JBQWQsR0FBcUMsSUFBckM7OztDQXBLSCxDQXdLQTs7QUNyS0EsSUFBTUMsMEJBQTBCLE9BQWhDO0lBQ0NDLHdCQUF3QixTQUR6QjtJQUVDQyx5QkFBeUIsb0JBRjFCO0lBR0NDLCtCQUErQixFQUhoQztJQU1DQyxxREFBcUQsQ0FBQyxTQUFELEVBQVksVUFBWixFQUF3QixLQUF4QixDQU50RDs7SUFRTUM7OztrQkFDT3RhLEtBQVosRUFBbUI7Ozs7OytHQUNaQSxLQURZOztNQUVkLENBQUMsTUFBS1csVUFBTCxDQUFnQixRQUFoQixDQUFMLEVBQWdDO1NBQzFCTCxVQUFMLENBQWdCLFFBQWhCLEVBQTBCMlosdUJBQTFCOztRQUVJN1osVUFBTCxDQUFnQixZQUFoQixFQUE4QixFQUE5QjtNQUNJLENBQUMsTUFBSzdGLE9BQUwsR0FBZWlFLFFBQXBCLEVBQThCO1NBQ3hCMkIsT0FBTCxDQUFhLElBQUkySyxTQUFKLENBQWMsRUFBZCxFQUFrQixNQUFLdlEsT0FBTCxFQUFsQixDQUFiOztRQUVJMkYsRUFBTCxDQUFRLFFBQVIsRUFBa0IsTUFBS3FhLFFBQUwsQ0FBY2pYLElBQWQsT0FBbEI7UUFDS3BELEVBQUwsQ0FBUSxPQUFSLEVBQWlCLE1BQUtzYSxPQUFMLENBQWFsWCxJQUFiLE9BQWpCO1FBQ0twRCxFQUFMLENBQVEsUUFBUixFQUFrQixNQUFLdWEsUUFBTCxDQUFjblgsSUFBZCxPQUFsQjtRQUNLNk0sTUFBTDs7Ozs7O2dDQUlhO1VBQ04sS0FBSzVWLE9BQUwsR0FBZW1nQixXQUFmLEVBQVA7Ozs7a0NBR2U7T0FDWGhTLFdBQVcsS0FBS2dTLFdBQUwsRUFBZjtPQUNJaFMsWUFBWUEsU0FBU21CLE9BQXpCLEVBQWtDO1dBQzFCbkIsU0FBU21CLE9BQVQsQ0FBaUJ0VSxjQUFqQixDQUFnQyxLQUFLb0wsVUFBTCxDQUFnQixRQUFoQixDQUFoQyxJQUE2RCtILFNBQVNtQixPQUFULENBQWlCLEtBQUtsSixVQUFMLENBQWdCLFFBQWhCLENBQWpCLENBQTdELEdBQTJHLElBQWxIO0lBREQsTUFFTztXQUNDLElBQVA7Ozs7O3NDQUlrQjtPQUNmMkksYUFBYSxLQUFLaUIsYUFBTCxFQUFqQjtPQUNDbk8sT0FBTyxFQURSO09BRUN1ZSxPQUFPLEtBQUtoYSxVQUFMLENBQWdCLE1BQWhCLEVBQXdCdVoscUJBQXhCLENBRlI7T0FHSTVRLFVBQUosRUFBZ0I7O1FBRVhBLFdBQVdsVSxNQUFmLEVBQXVCO1NBQ2xCa1UsV0FBV2xVLE1BQVgsQ0FBa0JHLGNBQWxCLENBQWlDb2xCLElBQWpDLENBQUosRUFBNEM7YUFDcENyUixXQUFXbFUsTUFBWCxDQUFrQnVsQixJQUFsQixDQUFQOzs7O1VBSUl2ZSxJQUFQOzs7Ozs7Ozs7MkJBT1E7UUFDSHdlLGFBQUw7Ozs7c0NBR21CQyxVQUFTO1VBQ3JCLEtBQUtsYSxVQUFMLENBQWdCLFFBQWhCLElBQTRCa2EsUUFBbkM7Ozs7a0NBR2U7T0FDWCxLQUFLamEsVUFBTCxDQUFnQixTQUFoQixDQUFKLEVBQWdDO1NBQzFCQSxVQUFMLENBQWdCLFNBQWhCLEVBQTJCaU8sTUFBM0I7SUFERCxNQUVPO1FBQ0Y3TyxRQUFRO1dBQ0wsS0FBSzhhLGNBQUwsRUFESztlQUVEO1lBQ0gsS0FBS0MsbUJBQUwsQ0FBeUIsU0FBekI7TUFISTtjQUtGO2VBQ0MsS0FBS3BhLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FERDtnQkFFRSxLQUFLQSxVQUFMLENBQWdCLFVBQWhCLENBRkY7bUJBR0ssS0FBS0EsVUFBTCxDQUFnQixhQUFoQixDQUhMO1VBSUosS0FBS0EsVUFBTCxDQUFnQixJQUFoQjtNQVRNO2FBV0osQ0FDTixDQUFDLGFBQUQsRUFBZ0IsS0FBS3FhLGNBQUwsQ0FBb0IxWCxJQUFwQixDQUF5QixJQUF6QixDQUFoQixDQURNLEVBRU4sQ0FBQyxDQUFDLGFBQUQsRUFBZ0IsYUFBaEIsQ0FBRCxFQUFpQyxLQUFLMlgsZ0JBQUwsQ0FBc0IzWCxJQUF0QixDQUEyQixJQUEzQixDQUFqQyxDQUZNO0tBWFI7UUFnQkk0WCxVQUFVLElBQUkxSCxZQUFKLENBQWlCeFQsS0FBakIsQ0FBZDtTQUNLSSxVQUFMLENBQWdCLFNBQWhCLEVBQTJCOGEsT0FBM0I7Ozs7O21DQUllO09BQ1o1UixhQUFhLEtBQUtpQixhQUFMLEVBQWpCO1VBQ087V0FDQ2pCLFdBQVc2UixLQUFYLEdBQW1CN1IsV0FBVzZSLEtBQTlCLEdBQXNDaEI7SUFEOUM7Ozs7cUNBS2tCOztPQUVkLEtBQUt2WixVQUFMLENBQWdCLFlBQWhCLEtBQWlDLEtBQUtBLFVBQUwsQ0FBZ0IsWUFBaEIsRUFBOEJoSixNQUFuRSxFQUEwRTtTQUNyRSxJQUFJZCxJQUFJLENBQVosRUFBZUEsSUFBSSxLQUFLOEosVUFBTCxDQUFnQixZQUFoQixFQUE4QmhKLE1BQWpELEVBQXlEZCxHQUF6RCxFQUE2RDtVQUN2RDhKLFVBQUwsQ0FBZ0IsWUFBaEIsRUFBOEI5SixDQUE5QixFQUFpQ3NaLFNBQWpDLENBQTJDdkIsTUFBM0M7O0lBRkYsTUFJSztTQUNBLElBQUkvWCxLQUFJLENBQVosRUFBZUEsS0FBSSxLQUFLc2tCLGlCQUFMLEdBQXlCeGpCLE1BQTVDLEVBQW9EZCxJQUFwRCxFQUF3RDtTQUNuRGlTLFlBQVksS0FBS3FTLGlCQUFMLEdBQXlCdGtCLEVBQXpCLENBQWhCO1VBQ0t1a0IsaUJBQUwsQ0FBdUJ0UyxTQUF2Qjs7Ozs7OzBDQUtxQjtPQUNuQnVTLFFBQVEsS0FBSzFhLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBWjtVQUNPMGEsTUFBTTFqQixNQUFOLEdBQWUsQ0FBdEIsRUFBeUI7VUFDbEIsQ0FBTixFQUFTd1ksU0FBVCxDQUFtQndDLE9BQW5CO1VBQ01wUixNQUFOLENBQWEsQ0FBYixFQUFnQixDQUFoQjs7Ozs7a0NBSWE7T0FDVjNGLFNBQVM7YUFDSCxFQURHO2NBRUYsRUFGRTtTQUdQO0lBSE47T0FLSSxLQUFLOEUsVUFBTCxDQUFnQixRQUFoQixDQUFKLEVBQStCO1dBQ3ZCL0gsT0FBUCxHQUFpQixLQUFLK0gsVUFBTCxDQUFnQixRQUFoQixDQUFqQjs7T0FFRzlELFVBQVUwZSxNQUFWLE1BQXNCMWUsVUFBVTBlLE1BQVYsR0FBbUI1YSxVQUFuQixDQUE4QixRQUE5QixDQUExQixFQUFrRTtXQUMxRHlPLEdBQVAsR0FBYXZTLFVBQVUwZSxNQUFWLEdBQW1CNWEsVUFBbkIsQ0FBOEIsUUFBOUIsQ0FBYjs7T0FFRyxLQUFLcEcsT0FBTCxHQUFlaUUsUUFBZixJQUEyQixLQUFLakUsT0FBTCxHQUFlbWdCLFdBQWYsRUFBL0IsRUFBNEQ7V0FDcERoUyxRQUFQLEdBQWtCLEtBQUtuTyxPQUFMLEdBQWVtZ0IsV0FBZixHQUE2QnRsQixNQUEvQzs7VUFFTXlHLE1BQVA7Ozs7c0NBR21Ca04sV0FBVztPQUMxQnlTLE1BQU1wQiw0QkFBVjtPQUNDcUIsYUFBYSxLQUFLQyxhQUFMLEVBRGQ7Ozs7Ozt5QkFFYXJCLGtEQUFiLDhIQUFnRTtTQUF4RHZqQixDQUF3RDs7U0FDM0Qya0IsV0FBV2xtQixjQUFYLENBQTBCdUIsQ0FBMUIsS0FBZ0Mya0IsV0FBVzNrQixDQUFYLEVBQWN2QixjQUFkLENBQTZCd1QsU0FBN0IsQ0FBcEMsRUFBNEU7YUFDcEUwUyxXQUFXM2tCLENBQVgsRUFBY2lTLFNBQWQsQ0FBUDs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBR0t5UyxHQUFQOzs7O29DQUdpQnpTLFdBQVc7OztPQUN4QjRTLFlBQVksS0FBS0MsbUJBQUwsQ0FBeUI3UyxTQUF6QixDQUFoQjtPQUNJOFMsTUFBTTtXQUNGO1dBQ0E5UyxTQURBO1lBRUM0UyxVQUFVRyxLQUFWLElBQW1CSCxVQUFVN0IsV0FGOUI7V0FHQTZCLFVBQVVoTSxJQUhWO1lBSUNnTSxVQUFVRyxLQUpYO1lBS0NILFVBQVU1QixLQUxYO2NBTUc0QixVQUFVOUIsT0FOYjtrQkFPTzhCLFVBQVU3QixXQVBqQjtjQVFHLEtBQUtuWixVQUFMLENBQWdCcEQsVUFBUWtDLElBQVIsQ0FBYSxTQUFiLEVBQXVCLE1BQXZCLEVBQThCc0osU0FBOUIsQ0FBaEI7O0lBVFg7T0FZSS9LLFVBQVVuQixVQUFVM0IsTUFBVixDQUFpQjtlQUNuQixtQkFBQ2dYLE1BQUQsRUFBVTtZQUNiQSxPQUFPblUsSUFBUCxDQUFZeEcsS0FBWixLQUFzQixPQUFLZ0QsT0FBTCxDQUFhd08sU0FBYixDQUE3QjtLQUY2QjtXQUl2QjhTLElBQUk1QyxLQUptQjtVQUt4QixLQUFLMWUsT0FBTDs7SUFMTyxFQU9YLEtBQUtvRyxVQUFMLENBQWdCLFNBQWhCLENBUFcsQ0FBZDtPQVFJeVAsU0FBSixHQUFnQixJQUFJb0QsWUFBSixDQUFpQjtVQUMxQixLQUFLalosT0FBTCxFQUQwQjtjQUV0QjtXQUNILEtBQUt3Z0IsbUJBQUwsQ0FBeUJZLFVBQVVoTSxJQUFuQztLQUh5QjthQUt2QjtxQkFBQTtlQUVFLEtBQUtvTSxvQkFBTCxDQUEwQkosVUFBVXppQixNQUFwQyxDQUZGO2dCQUdHLFdBSEg7YUFJRCxDQUNOLENBQUMsaUJBQUQsRUFBb0IsS0FBSzhpQix5QkFBTCxDQUErQjFZLElBQS9CLENBQW9DLElBQXBDLENBQXBCLENBRE07O0lBVE8sQ0FBaEI7UUFjSzFDLFVBQUwsQ0FBZ0IsWUFBaEIsRUFBOEJwRyxJQUE5QixDQUFtQ3FoQixHQUFuQzs7Ozs0Q0FHeUIzSixRQUFPO2FBQ3RCbGEsR0FBVixDQUFjLDhCQUFkLEVBQThDa2EsTUFBOUM7Ozs7eUNBR29DO09BQWhCaFosTUFBZ0IsdUVBQVAsTUFBTzs7T0FDaEMsQ0FBQ0EsTUFBTCxFQUFZO2FBQVUsTUFBVDs7T0FDVHNILE1BQU0sS0FBS0csVUFBTCxDQUFnQixVQUFoQixFQUE0QjJILGFBQTVCLENBQTBDLFlBQVlwUCxNQUFaLEdBQXFCLElBQS9ELENBQVY7T0FDSSxDQUFDc0gsR0FBRCxJQUFRdEgsV0FBUyxNQUFyQixFQUE0QjthQUNsQixNQUFUO1VBQ00sS0FBS3lILFVBQUwsQ0FBZ0IsVUFBaEIsRUFBNEIySCxhQUE1QixDQUEwQyxZQUFZcFAsTUFBWixHQUFxQixJQUEvRCxDQUFOOztPQUVFLENBQUNzSCxHQUFELElBQVF0SCxVQUFRLE1BQW5CLEVBQTBCO1dBQ2xCLEtBQUt5SCxVQUFMLENBQWdCLFVBQWhCLENBQVA7SUFERCxNQUVLO1dBQ0dILEdBQVA7Ozs7Ozs7Ozs7Z0NBUVk7T0FDVHhLLE9BQU8sS0FBS2dtQix5QkFBTCxDQUErQjFZLElBQS9CLENBQW9DLElBQXBDLENBQVg7Ozs7Ozs7Ozs2QkFPVTs7OzZCQUlBOzs7NEJBSUQ7Ozs4QkFJRTs7OzZCQUlEOzs7Z0NBSUc7OzttQ0FJRTtPQUNYMlksT0FBTyxLQUFLdGIsVUFBTCxDQUFnQixVQUFoQixFQUE0QjJILGFBQTVCLENBQTBDLE1BQTFDLENBQVg7T0FDRzJULElBQUgsRUFBUTtTQUNGcmYsZ0JBQUwsQ0FBc0IsUUFBdEIsRUFBZ0MsS0FBSzJkLFFBQUwsQ0FBY2pYLElBQWQsQ0FBbUIsSUFBbkIsQ0FBaEM7U0FDSzFHLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLEtBQUs0ZCxPQUFMLENBQWFsWCxJQUFiLENBQWtCLElBQWxCLENBQS9COzs7OztFQTdPbUJ2RCxTQWtQdEI7O0FDNVBBLElBQU1tYyx3QkFBd0IsRUFBOUI7SUFDQ0MsMEJBQTBCLEVBRDNCO0lBRUNDLDBCQUEwQixjQUYzQjs7SUFJTUM7OzttQkFDT3JjLEtBQVosRUFBbUI7Ozs7O2lIQUNaQSxLQURZOztRQUVic2MsVUFBTDtRQUNLbk0sTUFBTDs7Ozs7OzJCQUlRO09BQ0osS0FBS3ZQLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBSixFQUFrQztTQUM1QkEsVUFBTCxDQUFnQixXQUFoQixFQUE2QmlPLE1BQTdCO0lBREQsTUFFTztRQUNGdUIsWUFBWSxJQUFJb0QsWUFBSixDQUFpQjtXQUMxQixFQUQwQjtlQUV0QjtZQUNIO01BSHlCO2NBS3ZCO2lCQUNHLEtBQUs3UyxVQUFMLENBQWdCLFdBQWhCLENBREg7Z0JBRUUsS0FBS0EsVUFBTCxDQUFnQixVQUFoQixDQUZGO2VBR0MsS0FBS0EsVUFBTCxDQUFnQixTQUFoQjtNQVJzQjthQVV4QixDQUNQLENBQ0MsQ0FBQyxhQUFELEVBQWdCLGFBQWhCLENBREQsRUFDaUMsS0FBSzRiLFlBQUwsQ0FBa0JqWixJQUFsQixDQUF1QixJQUF2QixDQURqQyxDQURPO0tBVk8sQ0FBaEI7U0FnQktsRCxVQUFMLENBQWdCLFdBQWhCLEVBQTZCZ1EsU0FBN0I7Ozs7O2lDQUlhO1FBQ1RvTSxZQUFMO1FBQ0tDLFVBQUw7UUFDS0MsVUFBTDtRQUNLQyxVQUFMO1FBQ0tDLGtCQUFMOzs7O2lDQUdjO09BQ1ZDLGNBQWMsS0FBS2xjLFVBQUwsQ0FBZ0IsVUFBaEIsRUFBNEIySCxhQUE1QixDQUEwQyxVQUExQyxDQUFsQjtPQUNJLENBQUN1VSxXQUFMLEVBQWtCO09BQ2R6bkIsU0FBUyxLQUFLdUwsVUFBTCxDQUFnQixRQUFoQixDQUFiO1FBQ0ssSUFBSXRMLElBQUksQ0FBYixFQUFnQkEsSUFBSUQsT0FBT3dDLE1BQTNCLEVBQW1DdkMsR0FBbkMsRUFBd0M7UUFDbkN5bkIsUUFBUXRsQixTQUFTZ1AsYUFBVCxDQUF1QixJQUF2QixDQUFaO1VBQ01DLFNBQU4sR0FBa0JyUixPQUFPQyxDQUFQLEVBQVU4bEIsS0FBNUI7VUFDTW5VLE9BQU4sQ0FBYytWLGFBQWQsR0FBOEIzbkIsT0FBT0MsQ0FBUCxFQUFVbUksSUFBeEM7VUFDTXdKLE9BQU4sQ0FBY2dXLGdCQUFkLEdBQWlDLENBQWpDO1FBQ0k1bkIsT0FBT0MsQ0FBUCxFQUFVRSxjQUFWLENBQXlCLFVBQXpCLEtBQXdDSCxPQUFPQyxDQUFQLEVBQVU0bkIsUUFBdEQsRUFBZ0U7VUFDMURDLHFCQUFMLENBQTJCSixLQUEzQjs7Z0JBRVduVyxXQUFaLENBQXdCbVcsS0FBeEI7Ozs7O3dDQUlvQkssVUFBVTs7O1lBQ3RCdmdCLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFVBQUN4RixDQUFELEVBQU87TUFDdkN5aEIsY0FBRjtXQUNLdUUsb0JBQUwsQ0FBMEJobUIsRUFBRWltQixhQUE1QjtXQUNPLEtBQVA7SUFIRDtZQUtTQyxLQUFULENBQWVDLE1BQWYsR0FBd0IsU0FBeEI7Ozs7dUNBR29CdmhCLElBQUk7T0FDcEI5RSxTQUFTOEUsR0FBR2dMLE9BQUgsQ0FBV2dXLGdCQUFwQixNQUEwQyxDQUE5QyxFQUFpRDtPQUM3Q2hXLE9BQUgsQ0FBV2dXLGdCQUFYLEdBQThCLENBQTlCO0lBREQsTUFFTztPQUNIaFcsT0FBSCxDQUFXZ1csZ0JBQVgsR0FBOEI5bEIsU0FBUzhFLEdBQUdnTCxPQUFILENBQVdnVyxnQkFBcEIsSUFBd0MsQ0FBQyxDQUF2RTs7T0FFR2hoQixHQUFHMkwsVUFBUCxFQUFtQjtTQUNiLElBQUl0UyxJQUFJLENBQWIsRUFBZ0JBLElBQUkyRyxHQUFHMkwsVUFBSCxDQUFjeU0sUUFBZCxDQUF1QnhjLE1BQTNDLEVBQW1EdkMsR0FBbkQsRUFBd0Q7U0FDbkQyRyxHQUFHMkwsVUFBSCxDQUFjeU0sUUFBZCxDQUF1Qi9lLENBQXZCLE1BQThCMkcsRUFBbEMsRUFBc0M7OztRQUduQzJMLFVBQUgsQ0FBY3lNLFFBQWQsQ0FBdUIvZSxDQUF2QixFQUEwQmlrQixTQUExQixDQUFvQ0MsTUFBcEMsQ0FBMkMsYUFBM0M7UUFDRzVSLFVBQUgsQ0FBY3lNLFFBQWQsQ0FBdUIvZSxDQUF2QixFQUEwQmlrQixTQUExQixDQUFvQ0MsTUFBcEMsQ0FBMkMsY0FBM0M7OztPQUdFcmlCLFNBQVM4RSxHQUFHZ0wsT0FBSCxDQUFXZ1csZ0JBQXBCLElBQXdDLENBQTVDLEVBQStDO09BQzNDMUQsU0FBSCxDQUFhQyxNQUFiLENBQW9CLGNBQXBCO09BQ0dELFNBQUgsQ0FBYXBYLEdBQWIsQ0FBaUIsYUFBakI7T0FDR3hNLFlBQUgsQ0FBZ0IsV0FBaEIsRUFBNkIsV0FBN0I7SUFIRCxNQUlPO09BQ0g0akIsU0FBSCxDQUFhQyxNQUFiLENBQW9CLGFBQXBCO09BQ0dELFNBQUgsQ0FBYXBYLEdBQWIsQ0FBaUIsY0FBakI7T0FDR3hNLFlBQUgsQ0FBZ0IsV0FBaEIsRUFBNkIsWUFBN0I7O1FBRUk4bkIsU0FBTCxDQUFlO21CQUNDeGhCLEdBQUdnTCxPQUFILENBQVdnVyxnQkFEWjtpQkFFRGhoQixHQUFHZ0wsT0FBSCxDQUFXK1Y7SUFGekI7Ozs7NEJBTVNVLE1BQU07UUFDVnJkLFVBQUwsQ0FBZ0IsUUFBaEIsRUFBMEJxZCxJQUExQjtRQUNLQyxjQUFMO1FBQ0tqQixVQUFMOzs7OzhCQUdXO1VBQ0osS0FBSzdiLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBUDs7OztvQ0FHaUI7VUFDVCxPQUFPLEtBQUsrYyxTQUFMLEVBQVAsS0FBNEIsV0FBNUIsSUFBMkMsS0FBS0EsU0FBTCxPQUFxQixJQUFoRSxJQUF3RSxPQUFPLEtBQUtBLFNBQUwsR0FBaUJDLFlBQXhCLEtBQXlDLFdBQWpILElBQWdJLEtBQUtELFNBQUwsR0FBaUJDLFlBQWpCLEtBQWtDLElBQW5LLEdBQTJLLEtBQUtELFNBQUwsR0FBaUJDLFlBQWpCLENBQThCL2lCLFFBQTlCLEVBQTNLLEdBQXNOLEVBQTdOOzs7O21DQUdnQjtPQUNaLEtBQUs4RixVQUFMLENBQWdCLFVBQWhCLEtBQStCLEtBQUtBLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBbkMsRUFBZ0U7V0FDekQsS0FBS3BHLE9BQUwsQ0FBYSxNQUFiLEVBQXFCM0MsTUFBckIsR0FBNEIsQ0FBbEMsRUFBb0M7VUFDOUIyQyxPQUFMLENBQWEsTUFBYixFQUFxQjFDLEdBQXJCOztTQUVJeWtCLFVBQUw7Ozs7OzRCQUlRbUIsTUFBTTtRQUNWcmQsVUFBTCxDQUFnQixRQUFoQixFQUEwQnFkLElBQTFCO1FBQ0tDLGNBQUw7UUFDS2pCLFVBQUw7Ozs7OEJBR1c7VUFDSixLQUFLN2IsVUFBTCxDQUFnQixRQUFoQixDQUFQOzs7OzJCQUdRNmMsTUFBTTtRQUNUcmQsVUFBTCxDQUFnQixPQUFoQixFQUF5QnFkLElBQXpCO1FBQ0toQixVQUFMOzs7OytCQUdZO1FBQ1ByYyxVQUFMLENBQWdCLE9BQWhCLEVBQXlCO2NBQ2QsS0FBS08sVUFBTCxDQUFnQixVQUFoQixJQUE4QixLQUFLQSxVQUFMLENBQWdCLFVBQWhCLENBQTlCLEdBQTREdWIscUJBRDlDO2dCQUVaLEtBQUt2YixVQUFMLENBQWdCLFlBQWhCLElBQWdDLEtBQUtBLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBaEMsR0FBZ0V3YjtJQUY3RTs7Ozs2QkFNVTtVQUNILEtBQUt2YixVQUFMLENBQWdCLE9BQWhCLENBQVA7Ozs7Z0NBR2E7UUFDUlIsVUFBTCxDQUFnQixVQUFoQixFQUE0QixJQUE1Qjs7OzsrQkFHWTtRQUNQUSxVQUFMLENBQWdCLFVBQWhCLEVBQTRCLEtBQTVCOzs7OytCQUdZO1VBQ0wsS0FBS0EsVUFBTCxDQUFnQixVQUFoQixDQUFQOzs7OytCQUdZOzs7T0FDUixLQUFLRCxVQUFMLENBQWdCLFVBQWhCLEtBQStCLEtBQUtBLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBbkMsRUFBaUU7UUFDNUQsS0FBS2tkLFVBQUwsRUFBSixFQUF1Qjs7OztRQUluQkMsUUFBUSxLQUFLbmQsVUFBTCxDQUFnQixXQUFoQixFQUE2QixFQUE3QixFQUFpQ21KLFNBQWpDLENBQTJDLEtBQUs2VCxTQUFMLEVBQTNDLEVBQTZESCxTQUE3RCxDQUF1RSxLQUFLTyxTQUFMLEVBQXZFLEVBQXlGQyxRQUF6RixDQUFrRyxLQUFLQyxRQUFMLEdBQWdCN1QsUUFBbEgsRUFBNEgsS0FBSzZULFFBQUwsR0FBZ0I5VCxVQUE1SSxDQUFaO1NBQ0srVCxXQUFMO1VBQ01DLEtBQU4sR0FDRXJaLElBREYsQ0FDTyxVQUFDOU8sSUFBRCxFQUFVO2FBQ1BnQyxHQUFSLENBQVksaUJBQVosRUFBK0JoQyxJQUEvQjtZQUNLdUUsT0FBTCxDQUFhLE1BQWIsRUFBcUJvUCxNQUFyQixDQUE0QjNULElBQTVCO1lBQ0tvb0IsWUFBTDtZQUNLQyxXQUFMO1lBQ0tDLFVBQUw7S0FORixFQVFFdFosS0FSRixDQVFRLFVBQUM1TixDQUFELEVBQU87YUFDTGMsS0FBUixDQUFjZCxDQUFkO0tBVEY7SUFQRCxNQWtCTzs7U0FFRGduQixZQUFMO1NBQ0tDLFdBQUw7Ozs7O2lDQUlhO09BQ1ZFLGFBQWEsS0FBS1osU0FBTCxFQUFqQjtPQUNJLE9BQU9ZLFVBQVAsS0FBc0IsV0FBdEIsSUFBcUNBLGVBQWUsSUFBcEQsSUFBNEQsT0FBT0EsV0FBV1gsWUFBbEIsS0FBbUMsV0FBL0YsSUFBOEdXLFdBQVdYLFlBQVgsS0FBNEIsSUFBMUksSUFBa0pXLFdBQVdYLFlBQVgsQ0FBd0JobUIsTUFBeEIsR0FBaUMsQ0FBdkwsRUFBMEw7O1NBRXBMd0ksVUFBTCxDQUFnQixjQUFoQixFQUFnQyxLQUFLN0YsT0FBTCxDQUFhLE1BQWIsRUFBcUJKLE1BQXJCLENBQTRCLEtBQUtxa0IsWUFBTCxDQUFrQmxiLElBQWxCLENBQXVCLElBQXZCLENBQTVCLENBQWhDO0lBRkQsTUFHTztTQUNEbEQsVUFBTCxDQUFnQixjQUFoQixFQUFnQyxLQUFLN0YsT0FBTCxDQUFhLE1BQWIsQ0FBaEM7OztPQUdHa2tCLGFBQWEsS0FBS1YsU0FBTCxFQUFqQjtPQUNJLE9BQU9VLFVBQVAsS0FBc0IsV0FBdEIsSUFBcUNBLGVBQWUsSUFBeEQsRUFBOEQ7U0FDeEQ3ZCxVQUFMLENBQWdCLGNBQWhCLEVBQWdDOGQsSUFBaEMsQ0FBcUMsVUFBQ0MsS0FBRCxFQUFRQyxLQUFSLEVBQWtCO1NBQ2xEdkYsTUFBTTliLFVBQVFySSxHQUFSLENBQVl1cEIsV0FBV0ksV0FBdkIsRUFBb0NGLEtBQXBDLEVBQTJDLEVBQTNDLENBQU4sQ0FBSixFQUEyRDthQUNuRHBoQixVQUFRckksR0FBUixDQUFZdXBCLFdBQVdJLFdBQXZCLEVBQW9DRixLQUFwQyxFQUEyQyxFQUEzQyxFQUErQ0csYUFBL0MsQ0FBNkR2aEIsVUFBUXJJLEdBQVIsQ0FBWXVwQixXQUFXSSxXQUF2QixFQUFtQ0QsS0FBbkMsRUFBeUMsRUFBekMsQ0FBN0QsSUFBNkcsQ0FBQ0gsV0FBV00sYUFBaEk7TUFERCxNQUVPO2FBQ0MsQ0FBRXhoQixVQUFRckksR0FBUixDQUFZdXBCLFdBQVdJLFdBQXZCLEVBQW9DRixLQUFwQyxFQUEyQyxFQUEzQyxJQUFpRHBoQixVQUFRckksR0FBUixDQUFZdXBCLFdBQVdJLFdBQXZCLEVBQW9DRCxLQUFwQyxFQUEyQyxFQUEzQyxDQUFsRCxHQUFvRyxDQUFwRyxHQUF3RyxDQUFDLENBQTFHLElBQStHSCxXQUFXTSxhQUFqSTs7S0FKRjs7Ozs7K0JBVVc7OztPQUNSQyxXQUFXLEtBQUtyZSxVQUFMLENBQWdCLFVBQWhCLEVBQTRCeEUsZ0JBQTVCLENBQTZDLHNCQUE3QyxFQUFxRSxDQUFyRSxDQUFmO09BQ0ksQ0FBQzZpQixRQUFMLEVBQWU7T0FDWGpHLFVBQVUsU0FBVkEsT0FBVSxDQUFDM2hCLENBQUQsRUFBTztXQUNmMFMsU0FBTCxDQUFlO21CQUNBMVMsRUFBRWltQixhQUFGLENBQWdCOWxCO0tBRC9CO1dBR08sSUFBUDtJQUpEO1lBTVNxRixnQkFBVCxDQUEwQixPQUExQixFQUFtQ21jLE9BQW5DO1lBQ1NuYyxnQkFBVCxDQUEwQixPQUExQixFQUFtQ21jLE9BQW5DOzs7O3VDQUlvQjtPQUNoQixDQUFDLEtBQUtwWSxVQUFMLENBQWdCLFVBQWhCLENBQUQsSUFBZ0MsQ0FBQyxLQUFLQSxVQUFMLENBQWdCLFVBQWhCLENBQXJDLEVBQWtFOzs7UUFHN0QsSUFBSXNlLFFBQVQsSUFBcUIsS0FBS3RlLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBckIsRUFBa0Q7UUFDN0MrUSxNQUFNLEtBQUt3TixTQUFMLENBQWUsVUFBZixFQUEyQi9pQixnQkFBM0IsQ0FBNEM4aUIsUUFBNUMsQ0FBVjtTQUNLLElBQUl2WCxPQUFPLENBQWhCLEVBQW1CQSxPQUFPZ0ssSUFBSTlaLE1BQTlCLEVBQXNDOFAsTUFBdEMsRUFBOEM7U0FDekMxTCxLQUFLMFYsSUFBSWhLLElBQUosQ0FBVDtVQUNLLElBQUl2RyxLQUFULElBQWtCLEtBQUtSLFVBQUwsQ0FBZ0IsVUFBaEIsRUFBNEJzZSxRQUE1QixDQUFsQixFQUF5RDtTQUNyRHJpQixnQkFBSCxDQUFvQnVFLEtBQXBCLEVBQTJCLEtBQUtSLFVBQUwsQ0FBZ0IsVUFBaEIsRUFBNEJzZSxRQUE1QixFQUFzQzlkLEtBQXRDLENBQTNCOzs7Ozs7OzZCQU1PO1FBQ0xQLFVBQUwsQ0FBZ0IsT0FBaEIsRUFBeUJ1SixVQUF6QjtRQUNLc1MsVUFBTDs7Ozs0QkFHUzFlLE1BQU0yTCxPQUFPOzs7T0FDbEJ5VixTQUFTM25CLFNBQVNnUCxhQUFULENBQXVCLElBQXZCLENBQWI7T0FDQ3BSLFNBQVMsS0FBS3VMLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FEVjs7O1FBR0t5ZSxRQUFRNW5CLFNBQVNnUCxhQUFULENBQXVCLElBQXZCLENBQVo7UUFDQ3lTLFFBQVE3akIsT0FBT0MsQ0FBUCxDQURUO1FBRUNncUIsZUFBZSxJQUZoQjtRQUdDbGtCLE1BQU1vQyxVQUFRckksR0FBUixDQUFZK2pCLE1BQU16YixJQUFsQixFQUF3Qk8sSUFBeEIsRUFBOEIsT0FBSzRDLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FBOUIsQ0FIUDtRQUlJc1ksTUFBTTFqQixjQUFOLENBQXFCLFVBQXJCLEtBQW9DLENBQUMwakIsTUFBTTFqQixjQUFOLENBQXFCLFdBQXJCLENBQXpDLEVBQTRFO1dBQ3JFRyxZQUFOLENBQW1CLGlCQUFuQixFQUFzQyxJQUF0QztXQUNNc1IsT0FBTixDQUFjeEosSUFBZCxHQUFxQnliLE1BQU16YixJQUEzQjtXQUNNd0osT0FBTixDQUFjc1ksTUFBZCxHQUF1QnZoQixLQUFLLE9BQUs0QyxVQUFMLENBQWdCLGFBQWhCLENBQUwsQ0FBdkI7V0FDTXFHLE9BQU4sQ0FBY3pQLEtBQWQsR0FBc0I0RCxHQUF0QjtXQUNNeUIsZ0JBQU4sQ0FBdUIsTUFBdkIsRUFBK0IsVUFBQ3hGLENBQUQsRUFBSztnQkFDM0J1SCxHQUFSLENBQVlzYSxNQUFNemIsSUFBbEIsRUFBd0JPLElBQXhCLEVBQThCLE9BQUs0QyxVQUFMLENBQWdCLFNBQWhCLENBQTlCLEVBQTBEeWUsTUFBTS9LLFdBQWhFO2FBQ0tvSSxVQUFMO01BRkQ7O1FBS0d4RCxNQUFNMWpCLGNBQU4sQ0FBcUI2bUIsdUJBQXJCLENBQUosRUFBbUQ7b0JBQ25DbkQsTUFBTW1ELHVCQUFOLEVBQStCamhCLEdBQS9CLEVBQW9DNEMsSUFBcEMsRUFBMEMyTCxLQUExQyxDQUFmOztRQUVHdVAsTUFBTTFqQixjQUFOLENBQXFCLFdBQXJCLENBQUosRUFBdUM7U0FDbENpZSxZQUFKLENBQWlCO1lBQ1Z5RixNQUFNN0ksU0FBTixDQUFnQnBhLElBQWhCLElBQXdCcXBCLFlBQXhCLElBQXdDLEVBQUNsa0IsUUFBRCxFQUFNNEMsVUFBTixFQUFZMkwsWUFBWixFQUQ5QjtnQkFFTnVQLE1BQU03SSxTQUFOLENBQWdCSSxRQUZWO2VBR1A7aUJBQ0U0TyxLQURGO2dCQUVDLE9BQUt6ZSxVQUFMLENBQWdCLFNBQWhCO09BTE07Y0FPUnNZLE1BQU03SSxTQUFOLENBQWdCblEsTUFBaEIsSUFBMEI7TUFQbkM7S0FERCxNQVVPO1dBQ0F3RyxTQUFOLEdBQWtCNFksZ0JBQWdCbGtCLEdBQWxDOztRQUVHOGQsTUFBTTFqQixjQUFOLENBQXFCLFFBQXJCLEtBQWtDMGpCLE1BQU1oWixNQUE1QyxFQUFvRDtVQUMxQzVELENBQVQsSUFBYzRjLE1BQU1oWixNQUFwQixFQUE0QjtZQUNyQnJELGdCQUFOLENBQXVCUCxDQUF2QixFQUEwQixVQUFDakYsQ0FBRCxFQUFLO1NBQzVCeWhCLGNBQUY7Y0FDT0ksTUFBTWhaLE1BQU4sQ0FBYTVELENBQWIsRUFBZ0I7ZUFDZmpGLENBRGU7aUJBRWJnb0IsS0FGYTtjQUdoQnJoQixJQUhnQjtlQUlmNUMsR0FKZTtlQUtmOGQ7UUFMRCxDQUFQO09BRkQsRUFTRyxLQVRIOzs7V0FZS3RTLFdBQVAsQ0FBbUJ5WSxLQUFuQjs7O1FBN0NJLElBQUkvcEIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRCxPQUFPd0MsTUFBM0IsRUFBbUN2QyxHQUFuQyxFQUF3QztRQWdDN0JnSCxDQWhDNkI7Ozs7T0ErQ3BDLEtBQUtzRSxVQUFMLENBQWdCLFNBQWhCLENBQUosRUFBZ0M7V0FDeEIsS0FBS0EsVUFBTCxDQUFnQixTQUFoQixFQUEyQndlLE1BQTNCLEVBQW1DcGhCLElBQW5DLENBQVA7O1VBRU1vaEIsTUFBUDs7OztnQ0FHYTtPQUNUSSxRQUFRLEtBQUtDLFFBQUwsRUFBWjtPQUNJLENBQUNELEtBQUwsRUFBWTs7O1FBR1BFLFNBQUw7T0FDSUMsaUJBQWlCLENBQXJCO09BQ0NDLGVBQWUsS0FBSzFCLFFBQUwsR0FBZ0I3VCxRQUFoQixJQUE0QixLQUFLNlQsUUFBTCxHQUFnQjlULFVBQWhCLEdBQTZCLENBQXpELENBRGhCO1FBRUssSUFBSTlVLElBQUlxcUIsY0FBYixFQUE2QnJxQixJQUFJc2IsS0FBS2lQLEdBQUwsQ0FBU0QsWUFBVCxFQUF1QixLQUFLL2UsVUFBTCxDQUFnQixjQUFoQixFQUFnQ2hKLE1BQXZELENBQWpDLEVBQWlHdkMsR0FBakcsRUFBc0c7VUFDL0ZzUixXQUFOLENBQWtCLEtBQUtrWixTQUFMLENBQWUsS0FBS2pmLFVBQUwsQ0FBZ0IsY0FBaEIsRUFBZ0N2TCxDQUFoQyxDQUFmLENBQWxCOzs7Ozs2QkFJUztVQUNILEtBQUtzTCxVQUFMLENBQWdCLFVBQWhCLEVBQTRCMkgsYUFBNUIsQ0FBMEMsT0FBMUMsQ0FBUDs7Ozs4QkFHVztPQUNQd1gsWUFBWSxLQUFLTixRQUFMLEVBQWhCO09BQ0ksQ0FBQ00sU0FBTCxFQUFnQjthQUNOclosU0FBVixHQUFzQixFQUF0Qjs7OzsrQkFHWTtPQUNSLENBQUMsS0FBSzlGLFVBQUwsQ0FBZ0IsVUFBaEIsQ0FBTCxFQUFrQztTQUM1QjhlLFNBQUw7O09BRUdDLGlCQUFpQixLQUFLekIsUUFBTCxHQUFnQjdULFFBQWhCLEdBQTRCLEtBQUs2VCxRQUFMLEdBQWdCOVQsVUFBakU7T0FDQ3dWLGVBQWUsS0FBSzFCLFFBQUwsR0FBZ0I3VCxRQUFoQixJQUE0QixLQUFLNlQsUUFBTCxHQUFnQjlULFVBQWhCLEdBQTZCLENBQXpELENBRGhCO09BRUNvVixRQUFRLEtBQUtDLFFBQUwsRUFGVDtRQUdLLElBQUlucUIsSUFBSXFxQixjQUFiLEVBQTZCcnFCLElBQUlzYixLQUFLaVAsR0FBTCxDQUFTRCxZQUFULEVBQXVCLEtBQUsvZSxVQUFMLENBQWdCLGNBQWhCLEVBQWdDaEosTUFBdkQsQ0FBakMsRUFBaUd2QyxHQUFqRyxFQUFzRztVQUMvRnNSLFdBQU4sQ0FBa0IsS0FBS2taLFNBQUwsQ0FBZSxLQUFLamYsVUFBTCxDQUFnQixjQUFoQixFQUFnQ3ZMLENBQWhDLENBQWYsQ0FBbEI7Ozs7OytCQUlXMEksTUFBSztPQUNWZ2lCLFdBQVcsS0FBS0MsZUFBTCxHQUF1QnRrQixXQUF2QixFQUFmO1FBQ0ksSUFBSXVrQixDQUFSLElBQWFsaUIsSUFBYixFQUFrQjtRQUNWbWlCLFNBQVNuaUIsS0FBS2tpQixDQUFMLEVBQVFwbEIsUUFBUixHQUFtQmEsV0FBbkIsRUFBYjtRQUNJd2tCLE9BQU90cUIsT0FBUCxDQUFlbXFCLFFBQWYsSUFBeUIsQ0FBQyxDQUE5QixFQUFnQztZQUNyQixJQUFQOzs7VUFHRCxLQUFQOzs7O0VBaFZrQmhnQixTQXFWdkI7O0FDNVZBOzs7SUFHTW9nQjs7O2tCQUNPbmdCLEtBQVosRUFBbUI7Ozs7Ozs7UUFFYk0sVUFBTCxDQUFnQk4sTUFBTXBILE9BQU4sSUFBaUIsRUFBakM7UUFDS3VILE9BQUwsQ0FBYUgsTUFBTWhLLElBQU4sSUFBYyxFQUEzQjtRQUNLb0ssVUFBTCxDQUFnQkosTUFBTUssT0FBTixJQUFpQixFQUFqQzs7Ozs7RUFMb0JOLFNBV3RCOztBQ2ZBOzs7QUFHQSxBQUNBOzs7QUFHQSxBQUNBLEFBRUEsQUFDQTs7O0FBR0EsQUFDQTs7O0FBR0EsQUFDQTs7O0FBR0EsQUFDQTs7O0FBR0EsQUFDQTs7OztBQUlBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFFQSxBQUNBLEFBQ0EsQUFFQSxBQUNBLEFBRUErUCx3QkFBc0I1TixHQUF0QixDQUEwQndXLHdCQUExQixFQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
