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
			    target = this.getOptions('targetEl');
			if (!target && this.getOptions('targetQuery')) {
				target = document.querySelector(this.getOptions('targetQuery'));
			}
			if (!target) {
				throw new Exception('No target to place rendered');
			} else {
				placer.main(target, [markEl]);
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
var OPT_DEFAULT_RENDER_AND = 'replace';

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
		for (var t = 0; t < interfaces.length; t++) {
			_this.make[t] = interfaces[t];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdEZvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFZpZXcuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdob3N0JykgKyB1cmk7XG5cdH0sXG5cdGFkZFByb3RvY29sOiBmdW5jdGlvbih1cmkpe1xuXHRcdHJldHVybiB0aGlzLmdldCgncHJvdG9jb2wnKSArIHVyaTtcblx0fSxcblx0cHJlbG9hZEltYWdlczogZnVuY3Rpb24oZGF0YUFycmF5LCBmaWVsZHMpIHtcblx0XHRmb3IodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IodmFyIGYgaW4gZmllbGRzKSB7XG5cdFx0XHRcdGlmKGRhdGFBcnJheVtpXS5oYXNPd25Qcm9wZXJ0eShmaWVsZHNbZl0pKSB7XG5cdFx0XHRcdFx0dmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG5cdFx0XHRcdFx0aW1hZ2Uuc2V0QXR0cmlidXRlKCdjcm9zc09yaWdpbicsICdhbm9ueW1vdXMnKTtcblx0XHRcdFx0XHRpbWFnZS5zcmMgPSBkYXRhQXJyYXlbaV1bZmllbGRzW2ZdXS5pbmRleE9mKCcvLycpID09PSAwID8gdGhpcy5hZGRQcm90b2NvbChkYXRhQXJyYXlbaV1bZmllbGRzW2ZdXSkgOiBkYXRhQXJyYXlbaV1bZmllbGRzW2ZdXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0cmVxdWVzdEpTT046IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBkYXRhKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUFVUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpPT57XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAocGFyc2VJbnQoc3RhdHVzKSA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKGUpID0+IHJlamVjdChlKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldFNlc3Npb25JRDogZnVuY3Rpb24obmFtZSA9ICdTZXNzaW9uSUQnKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29va2llKG5hbWUpO1xuXHR9LFxuXHRnZXRDb29raWU6KG5hbWUpID0+IHtcbiAgXHRcdGxldCB2YWx1ZSA9IFwiOyBcIiArIGRvY3VtZW50LmNvb2tpZSxcbiAgXHRcdFx0cGFydHMgPSB2YWx1ZS5zcGxpdChcIjsgXCIgKyBuYW1lICsgXCI9XCIpO1xuICBcdFx0aWYgKHBhcnRzLmxlbmd0aCA9PSAyKSB7XG5cdFx0XHRyZXR1cm4gcGFydHMucG9wKCkuc3BsaXQoXCI7XCIpLnNoaWZ0KCk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblx0fVxufTtcbmV4cG9ydCBkZWZhdWx0IENvbW1vbk5ldHdvcms7XG4iLCJ2YXIgQ29tbW9uTG9ncyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fSxcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHRyYWNlOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKCF0aGlzLmVxdWFsKGFbcF0sIGJbcF0pKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXNlICdmdW5jdGlvbic6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJyB8fFxuXHRcdFx0XHRcdFx0XHQocCAhPSAnZXF1YWxzJyAmJiBhW3BdLnRvU3RyaW5nKCkgIT0gYltwXS50b1N0cmluZygpKSlcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cdFxuXHRyZWdpc3RlcjogZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0XHR0aGlzLnJlZ2lzdHJ5W2tleV0gPSB2YWw7XG5cdH0sXG5cblx0Z2V0OiBmdW5jdGlvbihrZXkpIHtcblx0XHRyZXR1cm4gdGhpcy5yZWdpc3RyeS5oYXNPd25Qcm9wZXJ0eShrZXkpID8gdGhpcy5yZWdpc3RyeVtrZXldIDogbnVsbDtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aCggc3ViUGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUyk+LTE/aGVscGVyczppdGVtLCBzdWJQYXRoKTtcblx0XHRcdHBhdGggPSB0aGlzLnJlcGxhY2VTdWJQYXRoKHBhdGgsIHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQpO1xuXHRcdFx0aSsrO1xuXHRcdFx0aWYgKGkgPiBNQVhfREVFUCl7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdGdldChwYXRoLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRzd2l0Y2ggKHBhdGgpe1xuXHRcdFx0Y2FzZSBQQVRIX1NUQVJUX09CSkVDVDogcmV0dXJuIGl0ZW07XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfSEVMUEVSUzogcmV0dXJuIGhlbHBlcnM7XG5cdFx0fVxuXHRcdHBhdGggPSB0aGlzLnBhcnNlU3VicyhwYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChwYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHBhdGgpO1xuXHR9XG5cblx0c2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIGF0dHJWYWx1ZSl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aCggc3ViUGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUyk+LTE/aGVscGVyczppdGVtLCBzdWJQYXRoKTtcblx0XHRcdHBhdGggPSB0aGlzLnJlcGxhY2VTdWJQYXRoKHBhdGgsIHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQpO1xuXHRcdFx0aWYgKGkgPiBNQVhfREVFUCl7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFZhbHVlQnlQYXRoKGl0ZW0sIHBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0aWYgKGl0ZW0uaXNSZWNvcmQgJiYgdGhpcy5ub3JtaWxpemVQYXRoKHBhdGgpLmxlbmd0aCA+IDEpIHtcblx0XHRcdGl0ZW0udHJpZ2dlcignY2hhbmdlJywgaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHR1bnNldChwYXRoLCBpdGVtLCBoZWxwZXJzKXtcblx0XHR0aGlzLnNldChwYXRoLCBpdGVtLCBoZWxwZXJzLCBudWxsKTtcblx0fVxuXG5cdHBhcnNlUGF0aFN0ZXAoc3RlcCwgaXRlbSwgaGVscGVyKXtcblx0XHRsZXQgclN0ZXAgPSBudWxsO1xuXHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpID09PSAwICYmIGhlbHBlcil7XG5cdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX0hFTFBFUlMsICcnKTtcblx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0aWYoaGVscGVyLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA9PT0gMCAmJiBpdGVtKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsICcnKTtcblx0XHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdFx0aWYoaXRlbS5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHN0ZXA7XG5cdH1cblxuXHQvLzo6ZmllbGROYW1lLnJlc3VsdFxuXHQvL3t9XG5cdC8ve2ZpZWxkTmFtZTogJ3RhcmdldFJlY29yZEZpZWxkJ31cblx0Ly8vL1sndGFyZ2V0UmVjb3JkRmllbGQnLCAncmVzdWx0J11cblx0cGFyc2VQYXRoKHBhdGgsIGl0ZW0sIGhlbHBlcil7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHBhdGggPSBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRwYXRoW2ldID0gdGhpcy5wYXJzZVBhdGhTdGVwKHBhdGhbaV0sIGl0ZW0sIGhlbHBlcik7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0bm9ybWlsaXplUGF0aChwYXRoKXtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRyZXR1cm4gcGF0aDtcblx0XHR9ZWxzZXtcblx0XHRcdHdoaWxlKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPiAtMSl7XG5cdFx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsJycpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRzbWFsbCA9IFtcInRvZG9cIl0sXG5cdFx0YmlnID0gW1widG9kb1wiLCBcImxlbmd0aFwiXVxuXHRcdHJldHVybiB0cnVlO1xuXG5cdCovXG5cblx0aWZGdWxsU3ViUGF0aChiaWcsIHNtYWxsKXtcblx0XHRpZiAoYmlnLmxlbmd0aDxzbWFsbC5sZW5ndGgpe3JldHVybiBmYWxzZTt9XG5cdFx0Zm9yKGxldCB0ID0wOyB0IDwgc21hbGwubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYoc21hbGxbdF0gIT09IGJpZ1t0XSl7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRnZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoKXtcblx0XHRhdHRyUGF0aCA9IHRoaXMubm9ybWlsaXplUGF0aChhdHRyUGF0aCk7XG5cdFx0bGV0IGF0dHJOYW1lID0gYXR0clBhdGguc2hpZnQoKSxcblx0XHRcdGlzRnVuY3Rpb24gPSBhdHRyTmFtZS5pbmRleE9mKEZVTkNUSU9OX01BUktFUik+LTE7XG5cdFx0aWYgKGlzRnVuY3Rpb24pe1xuXHRcdFx0YXR0ck5hbWUgPSBhdHRyTmFtZS5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdH1cblx0XHRpZiAoKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSAmJiB0eXBlb2Ygb2JqZWN0W2F0dHJOYW1lXSAhPT0gJ3VuZGVmaW5lZCcgJiYgb2JqZWN0W2F0dHJOYW1lXSAhPT0gbnVsbCl7XG5cdFx0XHRsZXQgbmV3T2JqID0gaXNGdW5jdGlvbj9vYmplY3RbYXR0ck5hbWVdKCk6b2JqZWN0W2F0dHJOYW1lXTtcblx0XHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0VmFsdWVCeVBhdGgobmV3T2JqLCBhdHRyUGF0aCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIG5ld09iajtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblx0c2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCwgYXR0clZhbHVlKXtcblx0XHRhdHRyUGF0aCA9IHRoaXMubm9ybWlsaXplUGF0aChhdHRyUGF0aCk7XG5cdFx0bGV0IGF0dHJOYW1lID0gYXR0clBhdGguc2hpZnQoKTtcblx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRpZiAoIW9iamVjdC5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpe29iamVjdFthdHRyTmFtZV0gPSB7fTt9XG5cdFx0XHR0aGlzLnNldFZhbHVlQnlQYXRoKG9iamVjdFthdHRyTmFtZV0sIGF0dHJQYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1lbHNle1xuXHRcdFx0b2JqZWN0W2F0dHJOYW1lXSA9IGF0dHJWYWx1ZTtcblx0XHR9XG5cdH1cblxuXHRqb2luKCl7XG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdHJldHVybiBhcmdzLmpvaW4oUEFUSF9TUExJVCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFBhdGgoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcblxuY29uc3QgTUVUQV9NRVRIT0RfSU5JVCA9IFN5bWJvbCgnaW5pdCcpLFxuXHRNRVRBX0VWRU5UUyA9IFN5bWJvbCgnZXZlbnRzJyksXG5cdE1FVEFfREFUQSA9IFN5bWJvbCgnZGF0YScpLFxuXHRNRVRBX1dPUktJTkcgPSBTeW1ib2woJ3dvcmtpbmcnKSxcblx0TUVUQV9PUFRJT05TID0gU3ltYm9sKCdvcHRpb25zJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHRoaXNbTUVUQV9FVkVOVFNdID0ge307XG5cdFx0dGhpc1tNRVRBX0RBVEFdID0ge307XG5cdFx0dGhpc1tNRVRBX1dPUktJTkddID0ge307XG5cdFx0dGhpc1tNRVRBX09QVElPTlNdID0ge307XG5cdFx0dGhpc1tNRVRBX01FVEhPRF9JTklUXShpbnB1dCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRbTUVUQV9NRVRIT0RfSU5JVF0oaW5wdXQpe1xuXHRcdGlmICghaW5wdXQpe1xuXHRcdFx0aW5wdXQgPSB7fTtcblx0XHR9XG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ2V2ZW50cycpKXtcblx0XHRcdGZvcihsZXQgdCBvZiBpbnB1dC5ldmVudHMpe1xuXHRcdFx0XHR0aGlzLm9uKC4uLnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKGlucHV0Lmhhc093blByb3BlcnR5KCdkYXRhJykpe1xuXHRcdFx0dGhpcy5zZXREYXRhKGlucHV0LmRhdGEpO1xuXHRcdH1cblxuXHRcdGlmKGlucHV0Lmhhc093blByb3BlcnR5KCd3b3JraW5nJykpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKGlucHV0LndvcmtpbmcpO1xuXHRcdH1cblxuXHRcdGlmKGlucHV0Lmhhc093blByb3BlcnR5KCdvcHRpb25zJykpe1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKGlucHV0Lm9wdGlvbnMpO1xuXHRcdH1cblx0fVxuXG5cdHNldENvbW1vbih3aGF0LCBhcmdzKSB7XG5cdFx0c3dpdGNoIChhcmdzLmxlbmd0aCkge1xuXHRcdGNhc2UgMTpcblx0XHRcdHtcblx0XHRcdFx0Lyogc2V0IGNvbGxlY3Rpb24gKi9cblx0XHRcdFx0d2hhdCA9IGFyZ3NbMF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdGNhc2UgMjpcblx0XHRcdHtcblx0XHRcdFx0Lyogc2V0IGNvbGxlY3Rpb24gZWxlbWVudCAqL1xuXHRcdFx0XHRub3RQYXRoLnNldChhcmdzWzBdIC8qIHBhdGggKi8gLCB3aGF0IC8qIGNvbGxlY3Rpb24gKi8gLCB1bmRlZmluZWQgLyogaGVscGVycyAqLyAsIGFyZ3NbMV0gLyogdmFsdWUgKi8gKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGdldENvbW1vbih3aGF0LCBhcmdzKSB7XG5cdFx0c3dpdGNoIChhcmdzLmxlbmd0aCkge1xuXHRcdFx0LyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoICovXG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHR9XG5cdFx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCB3aXRoIGRlZmF1bHQgdmFsdWUgKi9cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdGxldCByZXMgPSBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdFx0aWYgKHJlcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Lyogbm8gZGF0YSwgcmV0dXJuIGRlZmF1bHQgdmFsdWUgKi9cblx0XHRcdFx0XHRyZXR1cm4gYXJnc1sxXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvKiBkYXRhLCByZXR1cm4gaXQgKi9cblx0XHRcdFx0XHRyZXR1cm4gcmVzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvKiByZXR1cm4gZnVsbCBjb2xsZWN0aW9uICovXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHdoYXQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRDT1JFIE9CSkVDVFxuXHRcdFx0REFUQSAtIGluZm9ybWF0aW9uXG5cdFx0XHRPUFRJT05TIC0gaG93IHRvIHdvcmtcblx0XHRcdFdPUktJTkcgLSB0ZW1wb3JhcmlseSBnZW5lcmF0ZWQgaW4gcHJvY2Nlc3Ncblx0Ki9cblxuXHRzZXREYXRhKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfREFUQV0gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0RGF0YSgpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHR9XG5cblx0Z2V0RGF0YSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX0RBVEFdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0T3B0aW9ucygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX09QVElPTlNdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldE9wdGlvbnMoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cblxuXHRnZXRPcHRpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfT1BUSU9OU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRXb3JraW5nKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfV09SS0lOR10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0V29ya2luZygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdGdldFdvcmtpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9XT1JLSU5HXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qXG5cdFx0RVZFTlRTIGhhbmRsaW5nXG5cdCovXG5cblx0b24oZXZlbnROYW1lcywgZXZlbnRDYWxsYmFja3MsIG9uY2UpIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmRlZmluZUlmTm90RXhpc3RzKHRoaXNbTUVUQV9FVkVOVFNdLCBuYW1lLCBbXSk7XG5cdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5wdXNoKHtcblx0XHRcdFx0Y2FsbGJhY2tzOiBldmVudENhbGxiYWNrcyxcblx0XHRcdFx0b25jZTogb25jZSxcblx0XHRcdFx0Y291bnQ6IDBcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dHJpZ2dlcigpIHtcblx0XHRsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKSxcblx0XHRcdGV2ZW50TmFtZSA9IGFyZ3Muc2hpZnQoKTtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lKSkge1xuXHRcdFx0ZXZlbnROYW1lID0gW2V2ZW50TmFtZV07XG5cdFx0fVxuXHRcdGV2ZW50TmFtZS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0aWYgKHRoaXNbTUVUQV9FVkVOVFNdLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmZvckVhY2goZXZlbnQgPT4ge1xuXHRcdFx0XHRcdGlmIChldmVudC5vbmNlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9mZihuYW1lLCBldmVudC5jYWxsYmFja3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRldmVudC5jYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayguLi5hcmdzKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0b2ZmKGV2ZW50TmFtZXMgLyogYXJyYXkgb2YgZXZlbnQgbmFtZXMgKi8gLCBldmVudENhbGxiYWNrcyAvKiBhcnJheSBvZiBjYWxsYmFja3MgKi8gKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXG5cdFx0ZXZlbnROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0bGV0IHRhcmdldElkID0gLTE7XG5cdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5mb3JFYWNoKChldmVudCwgaSkgPT4ge1xuXHRcdFx0XHRpZiAoaSA9PT0gLTEgJiYgZXZlbnRDYWxsYmFja3MgPT09IGV2ZW50LmNhbGxiYWNrcykge1xuXHRcdFx0XHRcdHRhcmdldElkID0gaTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAodGFyZ2V0SWQgPiAtMSkge1xuXHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5zcGxpY2UodGFyZ2V0SWQsIDEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuY29uc3QgT1BUX01PREVfSElTVE9SWSA9IFN5bWJvbCgnaGlzdG9yeScpLFxuXHRPUFRfTU9ERV9IQVNIID0gU3ltYm9sKCdoYXNoJyksXG5cdE9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMID0gNTA7XG5cbmNsYXNzIG5vdFJvdXRlciBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyb3V0ZXM6IFtdLFxuXHRcdFx0bW9kZTogT1BUX01PREVfSElTVE9SWSxcblx0XHRcdHJvb3Q6ICcvJywgLy9hbHdheXMgaW4gc2xhc2hlcyAvdXNlci8sIC8sIC9pbnB1dC8uIGFuZCBubyAvdXNlciBvciBpbnB1dC9sZXZlbFxuXHRcdFx0aW5pdGlhbGl6ZWQ6IGZhbHNlXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaXN0b3J5KCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtb2RlJywgT1BUX01PREVfSElTVE9SWSk7XG5cdH1cblxuXHRoYXNoKCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtb2RlJywgT1BUX01PREVfSEFTSCk7XG5cdH1cblxuXHRzZXRSb290KHJvb3Qpe1xuXHRcdHRoaXMuc2V0V29ya2luZygncm9vdCcsIHJvb3QgPyAnLycgKyB0aGlzLmNsZWFyU2xhc2hlcyhyb290KSArICcvJyA6ICcvJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjbGVhclNsYXNoZXMocGF0aCkge1xuXHRcdC8vZmlyc3QgYW5kIGxhc3Qgc2xhc2hlcyByZW1vdmFsXG5cdFx0cmV0dXJuIHBhdGgudG9TdHJpbmcoKS5yZXBsYWNlKC9cXC8kLywgJycpLnJlcGxhY2UoL15cXC8vLCAnJyk7XG5cdH1cblxuXHRhZGQocmUsIGhhbmRsZXIpIHtcblx0XHRpZiAodHlwZW9mIHJlID09ICdmdW5jdGlvbicpIHtcblx0XHRcdGhhbmRsZXIgPSByZTtcblx0XHRcdHJlID0gJyc7XG5cdFx0fVxuXHRcdGxldCBydWxlID0ge1xuXHRcdFx0cmU6IHJlLFxuXHRcdFx0aGFuZGxlcjogaGFuZGxlclxuXHRcdH07XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5wdXNoKHJ1bGUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkTGlzdChsaXN0KSB7XG5cdFx0Zm9yIChsZXQgdCBpbiBsaXN0KSB7XG5cdFx0XHR0aGlzLmFkZCh0LCBsaXN0W3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZW1vdmUocGFyYW0pIHtcblx0XHRmb3IgKHZhciBpID0gMCwgcjsgaSA8IHRoaXMuZ2V0V29ya2luZygncm91dGVzJykubGVuZ3RoLCByID0gdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXTsgaSsrKSB7XG5cdFx0XHRpZiAoci5oYW5kbGVyID09PSBwYXJhbSB8fCByLnJlID09PSBwYXJhbSkge1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLnNwbGljZShpLCAxKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Zmx1c2goKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJvdXRlczogW10sXG5cdFx0XHRtb2RlOiBPUFRfTU9ERV9ISVNUT1JZLFxuXHRcdFx0cm9vdDogJy8nXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpc0luaXRpYWxpemVkKCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnaW5pdGlhbGl6ZWQnKTtcblx0fVxuXG5cdHNldEluaXRpYWxpemVkKHZhbCA9IHRydWUpe1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ2luaXRpYWxpemVkJywgdmFsKTtcblx0fVxuXG5cdGdldEZyYWdtZW50KCkge1xuXHRcdHZhciBmcmFnbWVudCA9ICcnO1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSA9PT0gT1BUX01PREVfSElTVE9SWSkge1xuXHRcdFx0aWYgKCFsb2NhdGlvbikgcmV0dXJuICcnO1xuXHRcdFx0ZnJhZ21lbnQgPSB0aGlzLmNsZWFyU2xhc2hlcyhkZWNvZGVVUkkobG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2gpKTtcblx0XHRcdGZyYWdtZW50ID0gZnJhZ21lbnQucmVwbGFjZSgvXFw/KC4qKSQvLCAnJyk7XG5cdFx0XHRmcmFnbWVudCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICE9ICcvJyA/IGZyYWdtZW50LnJlcGxhY2UodGhpcy5nZXRXb3JraW5nKCdyb290JyksICcnKSA6IGZyYWdtZW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIXdpbmRvdykgcmV0dXJuICcnO1xuXHRcdFx0dmFyIG1hdGNoID0gd2luZG93LmxvY2F0aW9uLmhyZWYubWF0Y2goLyMoLiopJC8pO1xuXHRcdFx0ZnJhZ21lbnQgPSBtYXRjaCA/IG1hdGNoWzFdIDogJyc7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNsZWFyU2xhc2hlcyhmcmFnbWVudCk7XG5cdH1cblxuXHRjaGVja0xvY2F0aW9uKCl7XG5cdFx0bGV0IGN1cnJlbnQgPXRoaXMuZ2V0V29ya2luZygnY3VycmVudCcpLFxuXHRcdFx0ZnJhZ21lbnQgPXRoaXMuZ2V0RnJhZ21lbnQoKSxcblx0XHRcdGluaXQgPSB0aGlzLmlzSW5pdGlhbGl6ZWQoKTtcblx0XHRpZiAoY3VycmVudCAhPT1mcmFnbWVudCAgfHwgIWluaXQpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudCcsZnJhZ21lbnQpO1xuXHRcdFx0dGhpcy5jaGVjayhmcmFnbWVudCk7XG5cdFx0XHR0aGlzLnNldEluaXRpYWxpemVkKCk7XG5cdFx0fVxuXHR9XG5cblx0aHJlZkNsaWNrKCl7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGxpc3Rlbihsb29wSW50ZXJ2YWwgPSBPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudCcsIHRoaXMuZ2V0RnJhZ21lbnQoKSk7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmdldFdvcmtpbmcoJ2ludGVydmFsJykpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJ2YWwnLCBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrTG9jYXRpb24uYmluZCh0aGlzKSwgbG9vcEludGVydmFsKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5ocmVmQ2xpY2suYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjaGVjayhmKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gZiB8fCB0aGlzLmdldEZyYWdtZW50KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGF0aCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5yZTtcblx0XHRcdGxldCBmdWxsUkUgPSAgdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKHBhdGgpKTtcblx0XHRcdHZhciBtYXRjaCA9IGZyYWdtZW50Lm1hdGNoKGZ1bGxSRSk7XHRcdFx0XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0bWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5oYW5kbGVyLmFwcGx5KHRoaXMuaG9zdCB8fCB7fSwgbWF0Y2gpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRuYXZpZ2F0ZShwYXRoKSB7XG5cdFx0cGF0aCA9IHBhdGggPyBwYXRoIDogJyc7XG5cdFx0c3dpdGNoICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSl7XG5cdFx0XHRjYXNlIE9QVF9NT0RFX0hJU1RPUlk6IHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ3B1c2ggc3RhdGUnLCB0aGlzLmdldEZ1bGxSb3V0ZShwYXRoKSk7XG5cdFx0XHRcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHRoaXMuZ2V0RnVsbFJvdXRlKHBhdGgpKTtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBPUFRfTU9ERV9IQVNIOiB7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jKC4qKSQvLCAnJykgKyAnIycgKyBwYXRoO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RnVsbFJvdXRlKHBhdGggPSAnJyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5jbGVhclNsYXNoZXMocGF0aCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFJvdXRlcigpO1xuIiwibGV0IG5vdEFQSU9wdGlvbnMgPSB7XG5cdHJwczogNTAsXG5cdHByb3RvY29sOiAnaHR0cCcsXG5cdGhvc3Q6ICdsb2NhbGhvc3QnLFxuXHRwb3J0OiA5MDAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RBUElPcHRpb25zO1xuIiwiY2xhc3Mgbm90QVBJUXVlZXtcblx0Y29uc3RydWN0b3IgKHJlcXVlc3RzUGVyU2Vjb25kKSB7XG5cdFx0dGhpcy5xdWVlID0gW107XG5cdFx0dGhpcy5pbnQgPSBudWxsO1xuXHRcdHRoaXMucmVxdWVzdHNQZXJTZWNvbmQgPSByZXF1ZXN0c1BlclNlY29uZCB8fCA1O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuKCl7XG5cdFx0dGhpcy5pbnQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5jaGVjay5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5yZXF1ZXN0c1BlclNlY29uZCk7XG5cdH1cblxuXHRjaGVjaygpe1xuXHRcdGlmICh0aGlzLmluUHJvZ3Jlc3Mpe3JldHVybjt9XG5cdFx0ZWxzZXtcblx0XHRcdGlmICh0aGlzLnF1ZWUubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHRoaXMuaW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0XHRcdGxldCB0b0NhbGwgPSB0aGlzLnF1ZWUuc2hpZnQoKTtcblx0XHRcdFx0dG9DYWxsKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmV4dCgpe1xuXHRcdHRoaXMuaW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHR9XG5cblx0YWRkKGNhbGwpe1xuXHRcdHRoaXMucXVlZS5wdXNoKGNhbGwpO1xuXHR9XG5cblx0cGF1c2UoKXtcblx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludCk7XG5cdH1cblxuXHRyZXN1bWUoKXtcblx0XHR0aGlzLnJ1bigpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSVF1ZWU7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlLmpzJztcblxuaW1wb3J0IG5vdEFQSU9wdGlvbnMgZnJvbSAnLi9vcHRpb25zLmpzJztcbmltcG9ydCBub3RBUElRdWVlIGZyb20gJy4vcXVlZS5qcyc7XG5cblxuY2xhc3Mgbm90QVBJIGV4dGVuZHMgIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RDb21tb24uZXh0ZW5kKG5vdEFQSU9wdGlvbnMsIG9wdGlvbnMpKTtcblx0XHR0aGlzLnF1ZWUgPSBuZXcgbm90QVBJUXVlZSh0aGlzLmdldE9wdGlvbnMoJ3JwcycpKTtcblx0XHR0aGlzLnF1ZWUucnVuKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRtYWtlVXJsKHBhcnRzKSB7XG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJy8nKTtcblx0fVxuXG5cdHF1ZWVSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsIG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRtYWtlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCkge1xuXHRcdG5vdENvbW1vbi5sb2coJ21ha2luZyByZXF1ZXN0JywgbWV0aG9kLCB1cmwsIGlkKTtcblx0XHRub3RDb21tb24ucmVxdWVzdEpTT04obWV0aG9kLCB1cmwsIGRhdGEpXG5cdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVxdWVzdCBzdWNjZXNzZnVsbCcsIG1ldGhvZCwgdXJsLCBpZCwgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXNwb25zZSBpcyBnb29kJyk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChjb2RlLCByZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ3JlcXVlc3QgZmFpbGVkJywgbWV0aG9kLCB1cmwsIGlkLCByZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3Jlc3BvbnNlIGlzIGJhZCcpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZScpO1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncG9zdCcsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygncHV0dCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2dldCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnbGlzdCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2RlbGV0ZScsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2RlbGV0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldFVwbG9hZFVSTChtb2RlbCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSArIHRoaXMuZ2V0T3B0aW9ucygndXBsb2FkJykgKyBtb2RlbD9tb2RlbC5nZXRJZCgpOicnO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSTtcbiIsImltcG9ydCBub3RCYXNlICBmcm9tICcuLi9ub3RCYXNlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEltYWdlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJjb25zdCBQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVggPSAnbi0nLFxuXHRURU1QTEFURV9UQUcgPSAnbnQnLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgPSAnLScsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYID0gJ2lmJyxcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCA9ICdub3RfY29tcG9uZW50XycsXG5cdFBBUlRfSURfUFJFRklYID0gJ25vdF9wYXJ0XycsXG5cdERFRkFVTFRfUExBQ0VSID0gJ3BsYWNlJyxcblx0REVGQVVMVF9QTEFDRVJfTE9PUCA9ICdwbGFjZUFmdGVyJztcblxuY29uc3QgT1BUUyA9IHtcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLFxuXHRURU1QTEFURV9UQUcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUixcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsXG5cdERFRkFVTFRfUExBQ0VSLFxuXHRDT01QT05FTlRfSURfUFJFRklYLFxuXHRQQVJUX0lEX1BSRUZJWCxcblx0REVGQVVMVF9QTEFDRVJfTE9PUFxufTtcblxuZXhwb3J0IGRlZmF1bHQgT1BUUztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmNvbnN0IE1FVEFfQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlQ2FjaGUgZXh0ZW5kcyBub3RCYXNle1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXSA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHR0aGlzLmhpZGVUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaWRlVGVtcGxhdGVzKCl7XG5cdFx0bGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdHQuaW5uZXJIVE1MID0gT1BUUy5URU1QTEFURV9UQUcgKyAne2Rpc3BsYXk6IG5vbmU7fSc7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KTtcblx0fVxuXG5cdHJlZ2lzdGVyKCkge1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcigndGVtcGxhdGVDYWNoZScsIHRoaXMpO1xuXHR9XG5cblx0bG9hZChtYXApIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0Zm9yICh2YXIgaSBpbiBtYXApIHtcblx0XHRcdHRoaXMubG9hZE9uZShpLCBtYXBbaV0pO1xuXHRcdH1cblx0fVxuXG5cdGxvYWRPbmUoa2V5LCB1cmwsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIG9SZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0b1JlcXVlc3Qub3BlbignR0VUJywgdXJsKTtcblx0XHRvUmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcblx0XHRcdGRpdi5kYXRhc2V0Lm5vdFRlbXBsYXRlTmFtZSA9IGtleTtcblx0XHRcdGRpdi5kYXRhc2V0Lm5vdFRlbXBsYXRlVVJMID0gdXJsO1xuXHRcdFx0ZGl2LmlubmVySFRNTCA9IHJlc3BvbnNlLnNyY0VsZW1lbnQucmVzcG9uc2VUZXh0O1xuXHRcdFx0dGhpcy5zZXRPbmUoa2V5LCBkaXYpO1xuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soa2V5LCB1cmwsIGRpdik7XG5cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdG9SZXF1ZXN0LnNlbmQoKTtcblx0fVxuXG5cdGlmQWxsTG9hZGVkKCl7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdsb2FkZWQnKTtcblx0XHR9XG5cdH1cblxuXHRzZXRPbmUoa2V5LCBlbGVtZW50KSB7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXVtrZXldID0gZWxlbWVudDtcblx0fVxuXG5cdGdldChrZXkpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0NBQ0hFXS5oYXNPd25Qcm9wZXJ0eShrZXkpID8gdGhpc1tNRVRBX0NBQ0hFXVtrZXldLmNsb25lTm9kZSh0cnVlKSA6IG51bGw7XG5cdH1cblxuXHRnZXROYW1lcygpe1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzW01FVEFfQ0FDSEVdKTtcblx0fVxuXG5cdGdldEJ5VVJMKHVybCkge1xuXHRcdGZvciAodmFyIGkgaW4gdGhpc1tNRVRBX0NBQ0hFXSkge1xuXHRcdFx0aWYgKHRoaXNbTUVUQV9DQUNIRV1baV0uc3JjID09IHVybCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXQoaSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8vXHROZXcgQVBJXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0TG9hZGVkKGtleSl7XG5cdFx0bGV0IHQgPSB0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGtleSk7XG5cdFx0aWYgKHQgPiAtMSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuc3BsaWNlKHQsIDEpO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRlZCcpLnB1c2goJ2tleScpO1xuXHR9XG5cblx0d3JhcChrZXksIHVybCwgaW5uZXJIVE1MKXtcblx0XHR2YXIgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdGNvbnQubmFtZSA9IGtleTtcblx0XHRjb250LnNyYyA9IHVybDtcblx0XHRjb250LmlubmVySFRNTCA9IGlubmVySFRNTDtcblx0XHRyZXR1cm4gY29udDtcblx0fVxuXG5cdHBhcnNlTGliKHRleHQpe1xuXHRcdGxldCBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0bGV0IHJlc3VsdCA9IHt9O1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gdGV4dDtcblx0XHRsZXQgbm90VGVtcGxhdGVzRWxlbWVudHMgPSBjb250LnF1ZXJ5U2VsZWN0b3JBbGwoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdGZvcihsZXQgZWxJZCA9MDsgZWxJZDwgbm90VGVtcGxhdGVzRWxlbWVudHMubGVuZ3RoOyBlbElkKyspe1xuXHRcdFx0bGV0IGVsID0gbm90VGVtcGxhdGVzRWxlbWVudHNbZWxJZF07XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSA9PT0gY29udCl7XG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdFx0XHRyZXN1bHRbZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlXSA9IGVsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRhZGRMaWIobGliKXtcblx0XHRmb3IobGV0IHQgaW4gbGliKXtcblx0XHRcdHRoaXMuc2V0T25lKHQsIGxpYlt0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVVSTChrZXksIHVybCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcblx0XHRcdGlmICh0aGlzLmdldChrZXkpKXtcblx0XHRcdFx0cmVzb2x2ZSh0aGlzLmdldChrZXkpKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL3RoYXQuc2V0TG9hZGluZyhrZXksIHVybCk7XG5cdFx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0XHQudGhlbigodGVtcGxhdGVJbm5lckhUTUwpPT57XG5cdFx0XHRcdFx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCB1cmwsIHRlbXBsYXRlSW5uZXJIVE1MKTtcblx0XHRcdFx0XHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh0aGlzLmdldChrZXkpKTtcblx0XHRcdFx0XHR9KS5jYXRjaCgoKT0+e1xuXHRcdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdlcnJvciBsb2FkaW5nIHRlbXBsYXRlJywga2V5LCB1cmwpO1xuXHRcdFx0XHRcdFx0cmVqZWN0KC4uLmFyZ3VtZW50cyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRMaWJGcm9tVVJMKHVybCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpXG5cdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZXNIVE1MKT0+e1xuXHRcdFx0XHRcdGxldCB0ZW1wbGF0ZXMgPSB0aGlzLnBhcnNlTGliKHRlbXBsYXRlc0hUTUwpO1xuXHRcdFx0XHRcdHRoaXMuYWRkTGliKHRlbXBsYXRlcyk7XG5cdFx0XHRcdFx0cmVzb2x2ZSh0ZW1wbGF0ZXMpO1xuXHRcdFx0XHR9KS5jYXRjaCgoZSk9Pntcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGVzIGxpYicsIHVybCxlKTtcblx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRGcm9tRG9jdW1lbnQoc2VsZWN0b3JPckVsZW1lbnQpe1xuXHRcdGxldCBlbCA9ICh0eXBlb2Ygc2VsZWN0b3JPckVsZW1lbnQgPT09ICdzdHJpbmcnKT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JFbGVtZW50KTpzZWxlY3Rvck9yRWxlbWVudDtcblx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBPUFRTLlRFTVBMQVRFX1RBRy50b0xvd2VyQ2FzZSgpKXtcblx0XHRcdFx0dGhpcy5zZXRPbmUoZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlLCBlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVRleHQoa2V5LCB0ZW1wbGF0ZUlubmVySFRNTCl7XG5cdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhpcy53cmFwKGtleSwgJycsIHRlbXBsYXRlSW5uZXJIVE1MKTtcblx0XHR0aGlzLnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVDYWNoZSgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZC5qcyc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkgPSBbJ19pZCcsICdpZCcsICdJRCddO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbnRlcmZhY2UgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0ZXh0ZW5kT2JqZWN0KG9iajEsIG9iajIpIHtcblx0XHR2YXIgYXR0ck5hbWUgPSAnJztcblx0XHRmb3IgKGF0dHJOYW1lIGluIG9iajIpIHtcblx0XHRcdGlmIChvYmoyLmhhc093blByb3BlcnR5KGF0dHJOYW1lKSkge1xuXHRcdFx0XHRvYmoxW2F0dHJOYW1lXSA9IG9iajJbYXR0ck5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb2JqMTtcblx0fVxuXG5cdHBhcnNlTGluZShsaW5lLCByZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgcmVjb3JkUkUgPSAnOnJlY29yZFsnLFxuXHRcdFx0ZmllbGROYW1lID0gJyc7XG5cdFx0d2hpbGUgKGxpbmUuaW5kZXhPZihyZWNvcmRSRSkgPiAtMSkge1xuXHRcdFx0dmFyIGluZCA9IGxpbmUuaW5kZXhPZihyZWNvcmRSRSk7XG5cdFx0XHR2YXIgbGVuID0gcmVjb3JkUkUubGVuZ3RoO1xuXHRcdFx0dmFyIGluZDIgPSBsaW5lLmluZGV4T2YoJ10nKTtcblx0XHRcdHZhciBzdGFydFNsaWNlID0gaW5kICsgbGVuO1xuXHRcdFx0dmFyIGVuZFNsaWNlID0gaW5kMjtcblx0XHRcdGZpZWxkTmFtZSA9IGxpbmUuc2xpY2Uoc3RhcnRTbGljZSwgZW5kU2xpY2UpO1xuXHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAnJykgYnJlYWs7XG5cdFx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6cmVjb3JkWycgKyBmaWVsZE5hbWUgKyAnXScsIHJlY29yZC5nZXRBdHRyKGZpZWxkTmFtZSkpO1xuXHRcdH1cblx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6bW9kZWxOYW1lJywgdGhpcy5tYW5pZmVzdC5tb2RlbCk7XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOmFjdGlvbk5hbWUnLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgbGluZSA9IHRoaXMucGFyc2VMaW5lKHRoaXMubWFuaWZlc3QudXJsLCByZWNvcmQsIGFjdGlvbk5hbWUpICsgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdwb3N0Rml4JykpID8gdGhpcy5wYXJzZUxpbmUoYWN0aW9uRGF0YS5wb3N0Rml4LCByZWNvcmQsIGFjdGlvbk5hbWUpIDogJycpO1xuXHRcdHJldHVybiBsaW5lO1xuXHR9XG5cblx0Z2V0SUQocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0bGV0IHJlc3VsdElkLFxuXHRcdFx0bGlzdCA9IE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFk7XG5cdFx0aWYgKGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2luZGV4JykgJiYgYWN0aW9uRGF0YS5pbmRleCl7XG5cdFx0XHRsaXN0ID0gW2FjdGlvbkRhdGEuaW5kZXhdLmNvbmNhdChPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZKTtcblx0XHR9XG5cdFx0Zm9yKGxldCB0IG9mIGxpc3Qpe1xuXHRcdFx0aWYocmVjb3JkLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0cmVzdWx0SWQgPSByZWNvcmRbdF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0SWQ7XG5cdH1cblxuXHRnZXRBY3Rpb25zQ291bnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpID8gT2JqZWN0LmtleXModGhpcy5nZXRBY3Rpb25zKCkpLmxlbmd0aCA6IDA7XG5cdH1cblxuXHRnZXRBY3Rpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLm1hbmlmZXN0ICYmIHRoaXMubWFuaWZlc3QuYWN0aW9ucz90aGlzLm1hbmlmZXN0LmFjdGlvbnMgOiB7fTtcblx0fVxuXG5cdHNldEZpbmRCeShrZXksIHZhbHVlKSB7XG5cdFx0dmFyIG9iaiA9IHt9O1xuXHRcdG9ialtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIHRoaXMuc2V0RmlsdGVyKG9iaik7XG5cdH1cblxuXHRzZXRGaWx0ZXIoZmlsdGVyRGF0YSkge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgnZmlsdGVyJywgZmlsdGVyRGF0YSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TW9kZWxQYXJhbSgnZmlsdGVyJyk7XG5cdH1cblxuXHRzZXRTb3J0ZXIoc29ydGVyRGF0YSkge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgnc29ydGVyJywgc29ydGVyRGF0YSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRTb3J0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TW9kZWxQYXJhbSgnc29ydGVyJyk7XG5cdH1cblxuXHRzZXRQYWdlTnVtYmVyKHBhZ2VOdW1iZXIpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VTaXplKHBhZ2VTaXplKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdwYWdlU2l6ZScsIHBhZ2VTaXplKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VyKHBhZ2VTaXplLCBwYWdlTnVtYmVyKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdwYWdlU2l6ZScsIHBhZ2VTaXplKS5zZXRNb2RlbFBhcmFtKCdwYWdlTnVtYmVyJywgcGFnZU51bWJlcik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cGFnZVNpemU6IHRoaXMuZ2V0TW9kZWxQYXJhbSgncGFnZVNpemUnKSxcblx0XHRcdHBhZ2VOdW1iZXI6IHRoaXMuZ2V0TW9kZWxQYXJhbSgncGFnZU51bWJlcicpXG5cdFx0fTtcblx0fVxuXG5cdHNldE1vZGVsUGFyYW0ocGFyYW1OYW1lLCBwYXJhbVZhbHVlKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMocGFyYW1OYW1lLCBwYXJhbVZhbHVlKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNb2RlbFBhcmFtKHBhcmFtTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMocGFyYW1OYW1lLCBudWxsKTtcblx0fVxuXG5cdGdldE1vZGVsTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcyAmJiB0aGlzLm1hbmlmZXN0ID8gdGhpcy5tYW5pZmVzdC5tb2RlbCA6IG51bGw7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKGFjdGlvbk5hbWUpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBY3Rpb25zKCkgJiYgdGhpcy5nZXRBY3Rpb25zKClbYWN0aW9uTmFtZV0gPyB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA6IG51bGw7XG5cdH1cblxuXHQvL3JldHVybiBQcm9taXNlXG5cdHJlcXVlc3QocmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSksXG5cdFx0XHRpZCA9IHRoaXMuZ2V0SUQocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSxcblx0XHRcdHVybCA9IHRoaXMuZ2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIG5vdENvbW1vbi5nZXRBUEkoKS5xdWVlUmVxdWVzdChhY3Rpb25EYXRhLm1ldGhvZCwgdXJsLCBpZCAsSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSksIHRoaXMub25Mb2FkLmJpbmQoe2FjdGlvbkRhdGEsIG1hbmlmZXN0OiB0aGlzLm1hbmlmZXN0fSkpO1xuXHR9XG4vKlxuXHRfcmVxdWVzdF9PYnNvbGV0ZV8ocmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0bm90Q29tbW9uLmxvZygncmVxdWVzdCcsIHJlY29yZCwgYWN0aW9uTmFtZSwgY2FsbGJhY2tTdWNjZXNzLCBjYWxsYmFja0Vycm9yKTtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSksXG5cdFx0XHRcdHVybCA9IHRoaXMuZ2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSk7XG5cdFx0XHRcdG5vdENvbW1vbi5nZXRBUEkoKS5xdWVlUmVxdWVzdChhY3Rpb25EYXRhLm1ldGhvZCwgdXJsLCByZWNvcmQuZ2V0SWQoKSwgSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSksIGdvb2QsIGJhZClcblx0XHRcdFx0XHQudGhlbihyZXNvbHZlKVxuXHRcdFx0XHRcdC5jYXRjaChyZWplY3QpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZScpO1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKTtcblxuXHRcdH0pO1xuXG5cblx0XHRpZiAoYWN0aW9uRGF0YSl7XG5cdFx0XHR2YXIgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhtbGh0dHAub3BlbihhY3Rpb25EYXRhLm1ldGhvZCwgdXJsKTtcblx0XHRcdHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuXHRcdFx0eG1saHR0cC5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4bWxodHRwLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4bWxodHRwLmNhbGxiYWNrU3VjY2VzcyA9IGNhbGxiYWNrU3VjY2Vzcztcblx0XHRcdHhtbGh0dHAuY2FsbGJhY2tFcnJvciA9IGNhbGxiYWNrRXJyb3I7XG5cdFx0XHR4bWxodHRwLm9ubG9hZCA9IHRoaXMub25Mb2FkO1xuXHRcdFx0eG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpKTtcblx0XHR9XG5cdH1cbiovXG5cdG9uTG9hZChkYXRhKXtcblx0XHRpZih0aGlzICYmIHRoaXMuYWN0aW9uRGF0YSAmJiB0aGlzLmFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiB0aGlzLmFjdGlvbkRhdGEuaXNBcnJheSkge1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0ZmlsZVVwbG9hZChmaWxlVXBsb2FkKSB7XG5cdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdC8vbm90Q29tbW9uLmxvZyhmaWxlVXBsb2FkLmZpbGUpO1xuXHRcdGlmICh4aHIudXBsb2FkICYmIHRoaXMuZmlsZUFsbG93ZWQoZmlsZVVwbG9hZC5maWxlKSkge1xuXHRcdFx0Ly8gcHJvZ3Jlc3MgYmFyXG5cdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcInByb2dyZXNzXCIsIGUsIGZpbGVVcGxvYWQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGF0LndvcmtpbmcuZmlsZVVwbG9hZHMuaW5kZXhPZihmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHRcdHRoYXQud29ya2luZy5maWxlVXBsb2Fkcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwic3VjY2Vzc1wiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9wZW4oXCJQT1NUXCIsIHRoaXMuZ2V0VXBsb2FkVXJsKCksIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgZmlsZVVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYX0ZJTEVOQU1FXCIsIGVuY29kZVVSSUNvbXBvbmVudChmaWxlVXBsb2FkLmZpbGUubmFtZSkpO1xuXHRcdFx0eGhyLnNlbmQoZmlsZVVwbG9hZC5maWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBuZXcgRXZlbnQoXCJXcm9uZ0ZpbGVUeXBlXCIpLCBmaWxlVXBsb2FkKTtcblx0XHR9XG5cdH1cblx0Ki9cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJztcblxuY29uc3QgTUVUQV9JTlRFUkZBQ0UgPSBTeW1ib2woJ2ludGVyZmFjZScpLFxuXHRNRVRBX1BST1hZID0gU3ltYm9sKCdwcm94eScpLFxuXHRNRVRBX0NIQU5HRSA9IFN5bWJvbCgnY2hhbmdlJyksXG5cdE1FVEFfQ0hBTkdFX05FU1RFRCA9IFN5bWJvbCgnY2hhbmdlLm5lc3RlZCcpLFxuXHRNRVRBX1NBTCA9IFsnZ2V0QXR0cicsICdnZXRBdHRycycsICdpc1Byb3BlcnR5JywgJ2lzUmVjb3JkJywgJ2dldE1hbmlmZXN0JywgJ3NldEF0dHInLCAnc2V0QXR0cnMnLCAnZ2V0RGF0YScsICdzZXREYXRhJywgJ2dldEpTT04nLCAnb24nLCAnb2ZmJywgJ3RyaWdnZXInXSxcblx0REVGQVVMVF9BQ1RJT05fUFJFRklYID0gJyQnLFxuXHRERUZBVUxUX1BBR0VfTlVNQkVSID0gMSxcblx0REVGQVVMVF9QQUdFX1NJWkUgPSAxMCxcblx0TUVUQV9SRVRVUk5fVE9fUk9PVCA9IFN5bWJvbCgncmV0dXJuVG9Sb290Jyk7XG5cbnZhciBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0eXBlb2YgdGFyZ2V0W2tleV0pO1xuXG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RQcm9wZXJ0eSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihnZXRSb290LCBwYXRoVG8sIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUHJveHkgfHwgaXRlbS5pc1Byb3BlcnR5KSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRnZXRSb290OiBnZXRSb290LFxuXHRcdFx0cGF0aDogcGF0aFRvXG5cdFx0fSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzKHRoaXMpKTtcblx0XHR0aGlzLnNldERhdGEoaXRlbSk7XG5cdFx0dGhpcy5pc1Byb3BlcnR5ID0gdHJ1ZTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfUkVUVVJOX1RPX1JPT1RdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0W01FVEFfUkVUVVJOX1RPX1JPT1RdKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0bGV0IHJvb3QgPSB0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSgpO1xuXHRcdHJvb3QudHJpZ2dlcignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9QUk9YWV0sIHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXksIHZhbHVlKTtcblx0fVxufVxuXG5cbnZhciBjcmVhdGVSZWNvcmRIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScgfHwga2V5ID09PSAnaXNSZWNvcmQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykge1xuXHRcdFx0XHRpZiAodGhpc1trZXldKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHJlc1RhcmdldCwga2V5LCBjb250ZXh0KTtcblx0XHR9LmJpbmQob3duZXIpLFxuXHRcdHNldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIHZhbHVlIC8qLCBwcm94eSovICkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGByZWNvcmQgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly9ub3RDb21tb24udHJhY2UoKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYXR0ZW1wdCB0byBwcml2YXRlIFwiJHtrZXl9XCIgcHJvcGVydHlgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCB2YWx1ZVRvUmVmbGVjdCA9IHZhbHVlO1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHZhbHVlVG9SZWZsZWN0ID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpLCBub3RQYXRoLmpvaW4odGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0cmV0dXJuIHQ7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0fTtcbn07XG5cbmNsYXNzIG5vdFJlY29yZCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCwgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1Byb3h5KSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ3RoaXMgaXMgUHJveHkgaXRlbScpO1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXG5cdFx0aWYgKGl0ZW0gJiYgKGl0ZW0uaXNSZWNvcmQgfHwgaXRlbS5pc1Byb3BlcnR5KSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0ZmlsdGVyOiB7fSxcblx0XHRcdHNvcnRlcjoge30sXG5cdFx0XHRwYWdlTnVtYmVyOiBERUZBVUxUX1BBR0VfTlVNQkVSLFxuXHRcdFx0cGFnZVNpemU6IERFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0ZmllbGRzOiBbXVxuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdID0gbmV3IG5vdFJlY29yZEludGVyZmFjZShtYW5pZmVzdCk7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXMuaW50ZXJmYWNlVXAoKTtcblx0XHR0aGlzLmlzUmVjb3JkID0gdHJ1ZTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IHJlY29yZCBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdGluaXRQcm9wZXJ0aWVzKGl0ZW0sIHBhdGggPSAnJykge1xuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhpdGVtKTtcblx0XHRcdGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRcdGxldCBjdXJQYXRoID0gcGF0aCArIChwYXRoLmxlbmd0aCA+IDAgPyAnLicgOiAnJykgKyBrZXk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3VyUGF0aCcsIGN1clBhdGgpO1xuXHRcdFx0XHRpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtW2tleV0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gKCkgPT4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCk7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ2RlZmluZScsIERFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4KTtcblx0XHR9XG5cdH1cblx0Lypcblx0LT4gJ3BhdGgudG8ua2V5JywgdmFsdWVPZktleVxuXHQ8LSBvaywgd2l0aCBvbmUgb25DaGFuZ2UgZXZlbnQgdHJpZ2dlcmVkXG5cdCovXG5cblx0c2V0QXR0cihrZXksIHZhbHVlKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguc2V0KGtleSwgdGhpc1tNRVRBX1BST1hZXSwge30sIHZhbHVlKTtcblx0fVxuXG5cdC8qXG5cdC0+XG5cdHtcblx0XHQna2V5UGF0aCc6IHZhbHVlLFxuXHRcdCdrZXkuc3ViUGF0aCc6IHZhbHVlMixcblx0XHQna2V5UGF0aC4wLnRpdGxlJzogdmFsdWUzXG5cdH1cblx0PC0gb2ssIHdpdGggYnVuY2ggb2Ygb25DaGFuZ2UgZXZlbnRzIHRyaWdnZXJlZFxuXHQqL1xuXHRzZXRBdHRycyhvYmplY3RQYXJ0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZXRBdHRycycsIG9iamVjdFBhcnQsIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpKTtcblx0XHRpZiAob2JqZWN0UGFydCAmJiAodHlwZW9mIG9iamVjdFBhcnQgPT09ICdvYmplY3QnKSAmJiBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KS5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIGluIG9iamVjdFBhcnQpIHtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdzZXRBdHRycyBvbmUgdG8gZ28nLCBwYXRoKTtcblx0XHRcdFx0dGhpcy5zZXRBdHRyKHBhdGgsIG9iamVjdFBhcnRbcGF0aF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdC0+ICdwYXRoVG9LZXknXG5cdDwtIHZhbHVlMVxuXG5cdCovXG5cdGdldEF0dHIod2hhdCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnZ2V0QXR0cicsIHdoYXQpO1xuXHRcdHJldHVybiBub3RQYXRoLmdldCh3aGF0LCB0aGlzW01FVEFfUFJPWFldLCB7fSk7XG5cdH1cblxuXHQvKlxuXHQtPiBbJ3BhdGhUb0tleScsICdwYXRoLnRvLmtleScsICdzaW1wbGVLZXknLC4uLl1cblx0PC0gW3ZhbHVlMSwgdmFsdWUyLCB2YWx1ZTMsLi4uXVxuXHQqL1xuXHRnZXRBdHRycyh3aGF0KSB7XG5cdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdGlmICh3aGF0ICYmIHdoYXQubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBvZiB3aGF0KSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHRoaXMuZ2V0QXR0cihwYXRoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRpZiAodGhpc1tNRVRBX0lOVEVSRkFDRV0pe1xuXHRcdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLm1hbmlmZXN0O1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0aGFuZGxlciBmb3IgUHJveHkgY2FsbGJhY2tzXG5cdCovXG5cblx0W01FVEFfQ0hBTkdFXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UnLCAuLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0W01FVEFfQ0hBTkdFX05FU1RFRF0oKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCd0cnkgdG8gY2hhbmdlIG5lc3RlZCcsIC4uLmFyZ3VtZW50cyk7XG5cdFx0Ly9ub3RDb21tb24udHJhY2UoKTtcblx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRoaXNbTUVUQV9QUk9YWV0sIG5vdFBhdGguam9pbihhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSksIGFyZ3VtZW50c1szXSk7XG5cdH1cblxuXHRzZXRJdGVtKGl0ZW0pIHtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZScpO1xuXHRcdHRoaXMub2ZmKCdjaGFuZ2UubmVzdGVkJyk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0Z2V0SlNPTigpIHtcblxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVjb3JkO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG5cbmNvbnN0IE9QVF9DT05UUk9MTEVSX1BSRUZJWCA9ICduYycsXG5cdE9QVF9SRUNPUkRfUFJFRklYID0gJ25yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QXBwIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcih7b3B0aW9uc30pO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGFwcCcpO1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcignYXBwJywgdGhpcyk7XG5cdFx0dGhpcy5yZXNvdXJjZXMgPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0aW50ZXJmYWNlczoge30sXG5cdFx0XHRjb250cm9sbGVyczoge30sXG5cdFx0XHRpbml0Q29udHJvbGxlcjogbnVsbCxcblx0XHRcdGN1cnJlbnRDb250cm9sbGVyOiBudWxsXG5cdFx0fSk7XG5cdFx0dGhpcy5wcmVJbml0Um91dGVyKCk7XG5cdFx0dGhpcy5pbml0TWFuYWdlcigpO1xuXHRcdHRoaXMuaW5pdEFQSSgpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlcygpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdE1hbmFnZXIoKXtcblx0XHRub3RDb21tb24uc2V0TWFuYWdlcihcblx0XHRcdHtcblx0XHRcdFx0c2V0QVBJKHYpeyB0aGlzLmFwaSA9IHY7fSxcblx0XHRcdFx0Z2V0QVBJKCl7cmV0dXJuIHRoaXMuYXBpO30sXG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdGluaXRBUEkoKXtcblx0XHRub3RDb21tb24uZ2V0TWFuYWdlcigpLnNldEFQSShuZXcgbm90QVBJKHt9KSk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGVzKCl7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykpe1xuXHRcdFx0bGV0IHByb20gPSBudWxsO1xuXHRcdFx0Zm9yKGxldCB0IGluIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykpe1xuXHRcdFx0XHRpZiAodCAmJiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0XHRsZXQgdXJsID0gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKVt0XTtcblx0XHRcdFx0XHRpZihwcm9tKXtcblx0XHRcdFx0XHRcdHByb20udGhlbihub3RUZW1wbGF0ZUNhY2hlLmFkZExpYkZyb21VUkwuYmluZChub3RUZW1wbGF0ZUNhY2hlLCB1cmwpKTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHByb20gPSBub3RUZW1wbGF0ZUNhY2hlLmFkZExpYkZyb21VUkwodXJsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChwcm9tKXtcblx0XHRcdFx0cHJvbS50aGVuKHRoaXMuaW5pdE1hbmlmZXN0LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdubyB0ZW1wbGF0ZXMgbGliJywgZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5pbml0TWFuaWZlc3QoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuaW5pdE1hbmlmZXN0KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hbmlmZXN0KCkge1xuXHRcdHZhciB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ21hbmlmZXN0VVJMJyk7XG5cdFx0bm90Q29tbW9uLmdldEpTT04odXJsLCB7fSlcblx0XHRcdC50aGVuKHRoaXMuc2V0SW50ZXJmYWNlTWFuaWZlc3QuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0LmJpbmQodGhpcykpO1xuXHR9XG5cblx0cHJlSW5pdFJvdXRlcigpe1xuXHRcdHRoaXMuc2V0V29ya2luZygncm91dGVyJywgbm90Um91dGVyKTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcicpLnNldFJvb3QodGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIucm9vdCcpKTtcblx0fVxuXG5cdGluaXRSb3V0ZXIoKXtcblx0XHR2YXIgcm91dGllSW5wdXQgPSB7fTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRsZXQgcm91dGVCbG9jayA9IHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLm1hbmlmZXN0JylbdF0sXG5cdFx0XHRcdHBhdGhzID0gcm91dGVCbG9jay5wYXRocyxcblx0XHRcdFx0Y29udHJvbGxlciA9IHJvdXRlQmxvY2suY29udHJvbGxlcjtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHJvdXRpZUlucHV0W3BhdGhzW2ldXSA9IHRoaXMuYmluZENvbnRyb2xsZXIoY29udHJvbGxlcik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuYWRkTGlzdChyb3V0aWVJbnB1dCkubGlzdGVuKCkubmF2aWdhdGUodGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIuaW5kZXgnKSk7XG5cdH1cblxuXHRzZXRJbnRlcmZhY2VNYW5pZmVzdChtYW5pZmVzdCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnLCBtYW5pZmVzdCk7XG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxuXG5cdGdldEludGVyZmFjZU1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0Jyk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0Ly/QvdGD0LbQvdC+INC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDRgtGMXG5cdFx0Ly/QvNC+0LTQtdC70Lgg0L/QvtC70YPRh9C10L3QvdGL0LzQuCDQuNC90YLQtdGA0YTQtdC50YHQsNC80Lhcblx0XHR0aGlzLnVwZGF0ZUludGVyZmFjZXMoKTtcblx0XHQvL9C40L3QuNGG0LjQu9C40YbQuNGA0L7QstCw0YLRjCDQuCDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YAg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0XHR0aGlzLmluaXRDb250cm9sbGVyKCk7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXJ0QXBwKCkge1xuXHRcdC8v0YHQvtC30LTQsNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdC8v0YDQvtGD0YLQtdGAINC4INC/0YDQuNCy0Y/Qt9Cw0YLRjCDQuiDQvdC10LzRgyDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0dGhpcy5pbml0Um91dGVyKCk7XG5cdH1cblxuXHRiaW5kQ29udHJvbGxlcihjb250cm9sbGVyTmFtZSkge1xuXHRcdGxldCBhcHAgPSB0aGlzO1xuXHRcdHJldHVybiBmdW5jdGlvbigpe1xuXHRcdFx0bmV3IGNvbnRyb2xsZXJOYW1lKGFwcCwgYXJndW1lbnRzKTtcblx0XHR9O1xuXHR9XG5cblx0aW5pdENvbnRyb2xsZXIoKSB7XG5cdFx0aWYgKHR5cGVvZih0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJykpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0bGV0IGluaXRDb250cm9sbGVyID0gdGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdpbml0Q29udHJvbGxlcicsIG5ldyBpbml0Q29udHJvbGxlcih0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudENvbnRyb2xsZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInKTtcblx0fVxuXG5cdHNldEN1cnJlbnRDb250cm9sbGVyKGN0cmwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJywgY3RybCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR1cGRhdGVJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuY2xlYXJJbnRlcmZhY2VzKCk7XG5cdFx0bGV0IG1hbmlmZXN0cyA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0XHRpZiAobWFuaWZlc3RzKSB7XG5cdFx0XHRmb3IobGV0IG5hbWUgaW4gbWFuaWZlc3RzKXtcblx0XHRcdFx0bGV0IHJlY29yZE1hbmlmZXN0ID0gbWFuaWZlc3RzW25hbWVdO1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXSA9IChyZWNvcmREYXRhKSA9PiBuZXcgbm90UmVjb3JkKHJlY29yZE1hbmlmZXN0LCByZWNvcmREYXRhKTtcblx0XHRcdFx0d2luZG93WyducicgKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpXSA9IHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFJlY29yZE5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfUkVDT1JEX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRDb250cm9sbGVyTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9DT05UUk9MTEVSX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKTtcblx0fVxuXG5cdGNsZWFySW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ludGVyZmFjZXMnLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR3YWl0VGhpc1Jlc291cmNlKHR5cGUsIGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLnJlc291cmNlcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuXHRcdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV0gPSB7fTtcblx0XHR9XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gZmFsc2U7XG5cdFx0cmV0dXJuIHRoaXMub25SZXNvdXJjZVJlYWR5LmJpbmQodGhpcywgdHlwZSwgaW5kZXgpO1xuXHR9XG5cblx0b25SZXNvdXJjZVJlYWR5KHR5cGUsIGluZGV4KSB7XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gdHJ1ZTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0YWxsUmVzb3VyY2VzUmVhZHkoKSB7XG5cdFx0dmFyIGksIGo7XG5cdFx0Zm9yIChpIGluIHRoaXMucmVzb3VyY2VzKSB7XG5cdFx0XHRmb3IgKGogaW4gdGhpcy5yZXNvdXJjZXNbaV0pIHtcblx0XHRcdFx0aWYgKCF0aGlzLnJlc291cmNlc1tpXVtqXSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcblxuY29uc3QgTUVUQV9QUk9DRVNTT1JTID0gU3ltYm9sKCdwcm9jZXNzb3JzJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFByb2Nlc3NvcigvKiBrZXksIHZhbHVlICovKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQcm9jZXNzb3IoLyoga2V5LCAgZGVmYXVsdFZhbHVlICovKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXJQcm9jZXNzb3JzKCl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGQoKXtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG5cdFx0XHR0aGlzLnNldFByb2Nlc3Nvcihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBhcmd1bWVudHNbMF0pe1xuXHRcdFx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKHQsIGFyZ3VtZW50c1swXVt0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRQcm9jZXNzb3IoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyKCl7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vbm90VGVtcGxhdGVQcm9jZXNzb3JzJztcblxuLypcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGCIERPTSDQv9C+0LTQtNC10YDQtdCy0L4g0LIg0LrQsNGH0LXRgdGC0LLQtSDRiNCw0LHQu9C+0L3QsC5cbiAqINCX0LDQv9C+0LvQvdGP0LXRgiDQtdCz0L4g0LTQsNC90L3Ri9C80LguXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgdCz0LXQvdC10YDQuNGA0L7QstCw0L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xuICpcbiAqICovXG5cbi8qXG5cblx0PGRpdiBuLXRlbXBsYXRlLW5hbWU9XCJ2YXN5YVwiPlxuXHRcdDxwPjxpbnB1dCB0eXBlPVwidGV4dFwiIG4tdmFsdWU9XCI6Y29vbE5hbWVcIi8+PC9wPlxuXHRcdDxwPtCR0L7RgNC40YEg0YXRgNC10L0g0L/QvtC/0LDQtNC10YjRjCDQuCB7ezpjb29sTmFtZX19LjwvcD5cblx0PC9kaXY+XG5cbiAqL1xuXG5jb25zdCBNRVRBX0NPTVBPTkVOVFMgPSBTeW1ib2woJ2NvbXBvbmVudHMnKTtcblxuY2xhc3Mgbm90UmVuZGVyZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Lypcblx0XHRpbnB1dCA9IHtcblx0XHRcdGRhdGE6IG5vdFJlY29yZCxcblx0XHRcdHRlbXBsYXRlOiBlbGVtZW50XG5cdFx0XHRvcHRpb25zOntcblx0XHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdH1cblx0XHR9XG5cdCovXG5cblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXSA9IHt9O1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5jb21wb25lbnQgPSBpbnB1dC5jb21wb25lbnQ7XG5cdFx0dGhpcy5pbml0RGF0YShpbnB1dC5kYXRhID8gaW5wdXQuZGF0YSA6IHt9KTtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQudGVtcGxhdGUpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlKCk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGUoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZScsIHRoaXMuZ2V0V29ya2luZygnZ2V0VGVtcGxhdGUnKSgpKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5nZXREYXRhKCkub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdH1cblxuXHRpbml0V29ya2luZyh0ZW1wbGF0ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRnZXRUZW1wbGF0ZTogdGVtcGxhdGUsXG5cdFx0XHRwYXJ0SWQ6IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgPyB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpIDogT1BUUy5QQVJUX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpIHtcblx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcblx0XHRcdHJldHVybiBbLi4udGhpcy5jb21wb25lbnQuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fVxuXHR9XG5cblx0b25DaGFuZ2UocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHQvKm5vdENvbW1vbi5sb2codGhpcyk7XG5cdFx0bm90Q29tbW9uLmxvZyh0aGlzLmdldEJyZWFkQ3J1bXBzKCkuam9pbignID4gJykpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHJlbmRlcmVyICcsIHRoaXMuZ2V0V29ya2luZygncGFydElkJyksICcgYWZ0ZXIgY2hhbmdlcycsIGtleSwgdmFsdWUpOyovXG5cdFx0dGhpcy51cGRhdGUoa2V5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ29ic29sZXRlJyxwcm94eSwga2V5LCB2YWx1ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHR1cGRhdGUoa2V5KSB7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfQ09NUE9ORU5UU10pIHtcblx0XHRcdGxldCBpdGVtID0gdGhpc1tNRVRBX0NPTVBPTkVOVFNdW3RdLFxuXHRcdFx0XHRpZlBhcnQgPSB0cnVlO1xuXHRcdFx0aWYgKGtleSl7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJyk9PT1udWxsKXtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXRcdGNvbXBvbmVudFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpKSxcblx0XHRcdFx0XHRjaGFuZ2VkUGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChrZXkpO1xuXHRcdFx0XHRpZlBhcnQgPSBub3RQYXRoLmlmRnVsbFN1YlBhdGgoY2hhbmdlZFBhdGgsIGNvbXBvbmVudFBhdGgpO1xuXHRcdFx0XHQvKm5vdENvbW1vbi5sb2coaXRlbS5nZXRPcHRpb25zKCduYW1lJyksICcgPi08ICcsIGl0ZW0uZ2V0T3B0aW9ucygnaWQnKSwgJyA+LTwgJywgY29tcG9uZW50UGF0aCwgY2hhbmdlZFBhdGgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCd3aWxsIGJlIHVwZGF0ZWQnLCBpZlBhcnQpOyovXG5cdFx0XHR9XG5cblx0XHRcdGlmIChpZlBhcnQpIHtcblx0XHRcdFx0aXRlbS51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXRXb3JraW5nTWFwcGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21hcHBpbmcnLCB0aGlzLmNyZWF0ZU1hcHBpbmcoKSk7XG5cdH1cblxuXHQvKlxuXG5cdNCh0L7Qt9C00LDQtdC8INC60LDRgNGC0Ysg0YHQvtC+0YLQstC10YHRgtCy0LjRjyDQv9GA0L7RhtC10YHRgdC+0YDQvtCyLCDQv9GD0YLQtdC5INC00LDQvdC90YvRhSDQsiDQvtCx0YrQtdC60YLQtSDQuCDRjdC70LXQvNC10L3RgtC+0LIg0YjQsNCx0LvQvtC90LAuXG5cdFt7XG5cdFx0ZWwsXG5cdFx0cHJvY2Vzc29yLFxuXHRcdHdvcmtpbmcsXG5cdFx0aXRlbS5wcm9wZXJ0eS5wYXRoXG5cdH1dXG5cblx0Ki9cblxuXHRjcmVhdGVNYXBwaW5nKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmZpbmRBbGxQcm9jZXNzb3JzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZpbmRBbGxQcm9jZXNzb3JzKCkge1xuXHRcdGxldCBwcm9jcyA9IFtdLFxuXHRcdFx0ZWxzID0gbm90Q29tbW9uLmdldEF0dHJpYnV0ZXNTdGFydHNXaXRoKHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLCBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCk7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBhdHRzID0gZWxzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhhdHRzW2ldKTtcblx0XHRcdFx0XHRsZXQgcHJvY0RhdGEgPSB0aGlzLnBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihhdHRzW2ldLm5vZGVOYW1lKTtcblx0XHRcdFx0XHRwcm9jRGF0YS5lbGVtZW50ID0gZWxzW2pdO1xuXHRcdFx0XHRcdHByb2NEYXRhLnByb2Nlc3NvckV4cHJlc3Npb24gPSBhdHRzW2ldLm5vZGVOYW1lO1xuXHRcdFx0XHRcdHByb2NEYXRhLmF0dHJpYnV0ZUV4cHJlc3Npb24gPSBhdHRzW2ldLnZhbHVlO1xuXHRcdFx0XHRcdHByb2NzLnB1c2gocHJvY0RhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwcm9jcztcblx0fVxuXG5cdHBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihwcm9jZXNzb3JFeHByZXNzaW9uKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdHBhcmFtczogW10sXG5cdFx0XHRwcm9jZXNzb3JOYW1lOiAnJyxcblx0XHRcdGlmQ29uZGl0aW9uOiBmYWxzZVxuXHRcdH07XG5cdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCwgJycpO1xuXHRcdGlmIChwcm9jZXNzb3JFeHByZXNzaW9uLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCkgPT09IChwcm9jZXNzb3JFeHByZXNzaW9uLmxlbmd0aCAtIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgubGVuZ3RoKSkge1xuXHRcdFx0cmVzdWx0LmlmQ29uZGl0aW9uID0gdHJ1ZTtcblx0XHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgKyBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLCAnJyk7XG5cdFx0fVxuXHRcdHJlc3VsdC5wYXJhbXMgPSBwcm9jZXNzb3JFeHByZXNzaW9uLnNwbGl0KE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SKTtcblx0XHRyZXN1bHQucHJvY2Vzc29yTmFtZSA9IHJlc3VsdC5wYXJhbXNbMF07XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHJlc3VsdC5wYXJhbXMuc2xpY2UoMSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGV4ZWNQcm9jZXNzb3JzKGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG1hcHBpbmcgPSB0aGlzLmdldFdvcmtpbmcoJ21hcHBpbmcnKTtcblx0XHRpZiAobWFwcGluZykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBwcm9jU2NvcGUgPSBtYXBwaW5nW2ldO1xuXHRcdFx0XHRwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHByb2NTY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBpbmRleCk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnYXR0cmlidXRlUmVzdWx0JywgcHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdFx0XHRcdGxldCBwcm9jTmFtZSA9IHByb2NTY29wZS5wcm9jZXNzb3JOYW1lLFxuXHRcdFx0XHRcdHByb2MgPSBub3RUZW1wbGF0ZVByb2Nlc3NvcnMuZ2V0KHByb2NOYW1lKTtcblx0XHRcdFx0aWYgKHByb2MpIHtcblx0XHRcdFx0XHRwcm9jKHByb2NTY29wZSwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0XHRcdFx0XHRwcm9jU2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvY1Njb3BlLnByb2Nlc3NvckV4cHJlc3Npb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gcHJvY2Vzc29yIGxpa2UnLCBwcm9jTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcpO1xuXHR9XG5cblx0Z2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwYXRoLCBpdGVtKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdH1cblxuXHRjbGVhclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmRlc3Ryb3lTdWJzKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdWJzJywgW10pO1xuXHR9XG5cblx0ZGVzdHJveVN1YnMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFN0YXNoKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IGVsID0gdGhpcy5nZXRTdGFzaCgpW3RdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUpe1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZlN1YkVsZW1lbnRSZW5kZXJlZChudEVsKSB7XG5cdFx0cmV0dXJuIG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkICYmIChudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZC52YWx1ZSA9PT0gJ3RydWUnKTtcblx0fVxuXG5cdHNlYXJjaEZvclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0bGV0IHN1YnMgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCA9IDA7IG50IDwgc3Vicy5sZW5ndGg7IG50KyspIHtcblx0XHRcdGlmICghdGhpcy5pZlN1YkVsZW1lbnRSZW5kZXJlZChzdWJzW250XSkpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJTdWIoc3Vic1tudF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZFN1YihudEVsKSB7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdzdWJzJykucHVzaCh7XG5cdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdHBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiAnJyxcblx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnNyYyA6ICcnLFxuXHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0XHRyZW5kZXJlZExpc3Q6IFtdLFxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU3ViKG50RWwpIHtcblx0XHRpZiAoIW50RWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IGRldGFpbHMgPSB7XG5cdFx0XHRcdGRhdGFQYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogbnVsbCxcblx0XHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMuc3JjLnZhbHVlIDogJycsXG5cdFx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0ZGF0YTogZGV0YWlscy5kYXRhUGF0aCE9PSBudWxsPyB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQoZGV0YWlscy5kYXRhUGF0aCwgdGhpcy5nZXREYXRhKCkpOm51bGwsXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHNyYzogZGV0YWlscy5zcmNcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSxcblx0XHRcdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VBZnRlcicsXG5cdFx0XHRcdFx0aWQ6IGRldGFpbHMuaWQsXG5cdFx0XHRcdFx0bnRFbDogbnRFbCxcblx0XHRcdFx0XHRkYXRhUGF0aDogZGV0YWlscy5kYXRhUGF0aFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvd25lcjogdGhpc1xuXHRcdFx0fTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnaWQnLCBkZXRhaWxzLmlkKTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU11bZGV0YWlscy5pZF0gPSBuZXcgbm90Q29tcG9uZW50KG9wdGlvbnMpO1xuXHR9XG5cblx0Y2xlYXJTdGFzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgW10pO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZScpO1xuXHR9XG5cblx0Z2V0U3Rhc2goKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc3Rhc2gnKTtcblx0fVxuXG5cdHN0YXNoUmVuZGVyZWQoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMuYWRkVG9TdGFzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHR9XG5cblx0cmVwbGFjZVJlbmRlcmVkKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygncmVwbGFjZSBzdGFzaCcpO1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSxcblx0XHRcdHN0YXNoID0gdGhpcy5nZXRTdGFzaCgpLFxuXHRcdFx0bmV3U3Rhc2ggPSBbXSxcblx0XHRcdGFuY2hvciA9IHN0YXNoLmxlbmd0aCA+IDAgPyBzdGFzaFswXSA6IHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLFxuXHRcdFx0cGFyZW50Tm9kZSA9IGFuY2hvci5wYXJlbnROb2RlO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdG5ld1N0YXNoLnB1c2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IG5ld1N0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRpZiAoYW5jaG9yLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTdGFzaFt0XSwgYW5jaG9yLm5leHRTaWJsaW5nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld1N0YXNoW3RdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBzdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdGFzaFt0XSk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBuZXdTdGFzaCk7XG5cdH1cblxuXHRhZGRUb1N0YXNoKG5vZGUpIHtcblx0XHR0aGlzLmdldFN0YXNoKCkucHVzaChub2RlKTtcblx0fVxuXG5cdGlzRGF0YShkYXRhKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlbmRlcmVyO1xuIiwiY29uc3QgcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdGxldCBsID0gMDtcblx0XHR3aGlsZSAodGFyZ2V0RWwuY2hpbGRyZW4ubGVuZ3RoIC0gbCkge1xuXHRcdFx0aWYgKHRhcmdldEVsLmNoaWxkcmVuWzBdLm5vZGVOYW1lID09PSAnTlQnKXtcblx0XHRcdFx0Y29uc29sZS5sb2coJ250IGZvdW5kZWQnKTtcblx0XHRcdFx0bCsrO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdyZW1vdmUgY2hpbGQgJyx0YXJnZXRFbC5jaGlsZHJlbltsXSk7XG5cdFx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGFyZ2V0RWwudGV4dENvbnRlbnQgPSAnJztcblx0fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnNvbGUubG9nKCdhcHBlbmQgY2hpbGQgJywgcmVuZGVyZWRbaV0pO1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXJFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9XG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2U7XG4iLCJjb25zdCBwbGFjZUFmdGVyID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VBZnRlcjtcbiIsImNvbnN0IHBsYWNlQmVmb3JlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VCZWZvcmU7XG4iLCJjb25zdCBwbGFjZUZpcnN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gcmVuZGVyZWQubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcblx0XHRcdGNvbnNvbGUubG9nKCdwbGFjZSBmaXJzdCcsIGksIHJlbmRlcmVkW2ldKTtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHRjb25zb2xlLmxvZygnYXBwZW5kIGJlZm9yZSBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLmNoaWxkcmVuWzBdKTtcblx0XHRcdH1lbHNle1x0XHRcdFx0XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdhcHBlbmQgYXMgZmlyc3QnKTtcblx0XHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlRmlyc3Q7XG4iLCJjb25zdCBwbGFjZUxhc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlTGFzdDtcbiIsImNvbnN0IHJlcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGJlZm9yZUVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdGNvbnNvbGUubG9nKCdzaG91bGQgcmVtb3ZlIG5vZGUnLCB0YXJnZXRFbCk7XG5cdFx0aWYgKHRhcmdldEVsLm5vZGVOYW1lICE9PSAnTlQnKXtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFyZ2V0RWwpO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZTtcbiIsImltcG9ydCBwbGFjZSBmcm9tICcuL3BsYWNlJztcbmltcG9ydCBwbGFjZUFmdGVyIGZyb20gJy4vcGxhY2VBZnRlcic7XG5pbXBvcnQgcGxhY2VCZWZvcmUgZnJvbSAnLi9wbGFjZUJlZm9yZSc7XG5pbXBvcnQgcGxhY2VGaXJzdCBmcm9tICcuL3BsYWNlRmlyc3QnO1xuaW1wb3J0IHBsYWNlTGFzdCBmcm9tICcuL3BsYWNlTGFzdCc7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICcuL3JlcGxhY2UnO1xuXG5jb25zdCBub3RQbGFjZXJzID0ge1xuXHRwbGFjZTogcGxhY2UsXG5cdHBsYWNlQWZ0ZXI6IHBsYWNlQWZ0ZXIsXG5cdHBsYWNlQmVmb3JlOiBwbGFjZUJlZm9yZSxcblx0cGxhY2VGaXJzdDogcGxhY2VGaXJzdCxcblx0cGxhY2VMYXN0OiBwbGFjZUxhc3QsXG5cdHJlcGxhY2U6IHJlcGxhY2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFBsYWNlcnM7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vbm90UmVuZGVyZXInO1xuaW1wb3J0IG5vdFBsYWNlcnMgZnJvbSAnLi9wbGFjZXJzJztcblxuY29uc3QgTUVUQV9QQVJUUyA9IFN5bWJvbCgncGFydHMnKTtcbi8qXG5cdGlucHV0ID0ge1xuXHRcdGRhdGE6IG5vdFJlY29yZCBvciBbbm90UmVjb3JkXSxcblx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0aHRtbDogaHRtbChzdHJpbmcpLCBcdFx0Ly/RgtC10LrRgdGCINGBIGh0bWwg0LrQvtC00L7QvCDRiNCw0LHQu9C+0L3QsFxuXHRcdFx0ZWw6IEhUTUxFbGVtZW50KG9iamVjdCksIFx0Ly9ET00g0Y3Qu9C10LzQtdC90YJcblx0XHRcdHNyYzogc3JjKHN0cmluZyksXHRcdFx0Ly/RgdGB0YvQu9C60LAg0L3QsCDRhNCw0LnQuyDRgSDRiNCw0LHQu9C+0L3QvtC8XG5cdFx0XHRuYW1lOiBuYW1lKHN0cmluZylcdFx0XHQvL9C90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAg0LTQu9GPINC/0L7QuNGB0LrQsCDQsiDQutGN0YjQtSBub3RUZW1wbGF0ZUNhY2hlXG5cdFx0fVxuXHRcdG9wdGlvbnM6e1xuXHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0Ly/QsCDRjdGC0L4g0LrQsNC6INCx0YPQtNC10Lwg0L/QvtC80LXRidCw0YLRjCDRgNC10LfRg9C70YzRgtCw0YIg0YDQtdC90LTQtdGA0LjQvdCz0LBcblx0XHRcdHJlbmRlckFuZDogcGxhY2VTdHlsZShzdHJpbmcpINC+0LTQuNC9INC40Lcg0LLQsNGA0LjQsNC90YLQvtCyXG5cdFx0XHRcdFx0cGxhY2VcdFx0LVx00L/QvtC80LXRidCw0LXQvCDQstC90YPRgtGA0Lgg0YbQtdC70LXQstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG5cdFx0XHRcdFx0cmVwbGFjZVx0XHQtXHTQt9Cw0LzQtdC90Y/QtdC8XG5cdFx0XHRcdFx0cGxhY2VBZnRlclx0LVx00L/QvtGB0LvQtVxuXHRcdFx0XHRcdHBsYWNlQmVmb3JlXHQtXHTQtNC+XG5cdFx0XHRcdFx0cGxhY2VGaXJzdFx0LVx00LLQvdGD0YLRgNC4INC/0LXRgNCy0YvQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0XHRcdFx0cGxhY2VMYXN0XHQtXHTQstC90YPRgtGA0Lgg0L/QvtGB0LvQtdC00L3QuNC8INC00L7Rh9C10YDQvdC40Lxcblx0XHR9XG5cdH1cbiovXG5jbGFzcyBub3RDb21wb25lbnQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKXtcblx0XHRpZiAodGhpcy5vd25lcil7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMub3duZXIuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMub3duZXIgPSBpbnB1dC5vd25lcj9pbnB1dC5vd25lcjpudWxsO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dCk7XG5cdFx0dGhpcy5wcmVwYXJlVGVtcGxhdGVFbGVtZW50KGlucHV0LnRlbXBsYXRlID8gaW5wdXQudGVtcGxhdGUgOiBudWxsKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHR9XG5cblx0aW5pdEV2ZW50cyhsaXN0KXtcblx0XHRmb3IobGV0IHQgb2YgbGlzdCl7XG5cdFx0XHR0aGlzLm9uKC4uLnQpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdpZCcpKXtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygnaWQnLCBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ250RWwnKSl7XG5cdFx0XHR0aGlzLmluaXRNYXJrRWxlbWVudCgpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRNYXJrRWxlbWVudCgpe1xuXHRcdGxldCBtYXJrRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdudCcpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbnRFbCcsIG1hcmtFbCk7XG5cdFx0bGV0IHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpLFxuXHRcdFx0dGFyZ2V0ID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdGlmICghdGFyZ2V0ICYmIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSl7XG5cdFx0XHR0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSk7XG5cdFx0fVxuXHRcdGlmICghdGFyZ2V0KXtcblx0XHRcdHRocm93IG5ldyBFeGNlcHRpb24oJ05vIHRhcmdldCB0byBwbGFjZSByZW5kZXJlZCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyLm1haW4odGFyZ2V0LCBbbWFya0VsXSk7XG5cdFx0fVxuXG5cdH1cblxuXHRpbml0V29ya2luZyh2YWwpIHtcblx0XHR0aGlzLnVuc2V0UmVhZHkodmFsKTtcblx0fVxuXG5cdHByZXBhcmVUZW1wbGF0ZUVsZW1lbnQodmFsKSB7XG5cdFx0aWYgKCF2YWwpIHtcblx0XHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdodG1sJykgJiYgdmFsLmh0bWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQodmFsLmVsLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZhbC5zcmMpIHtcblx0XHRcdG5vdFRlbXBsYXRlQ2FjaGUuYWRkRnJvbVVSTCh2YWwuc3JjLCB2YWwuc3JjKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpICYmIHZhbC5uYW1lKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUuZ2V0KHZhbC5uYW1lKSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JywgY29udCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRyZXNldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50JywgdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpLmNsb25lTm9kZSh0cnVlKSk7XG5cdH1cblxuXHRzZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdHJ1ZSk7XG5cdH1cblxuXHR1bnNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCBmYWxzZSk7XG5cdH1cblxuXHRpc1JlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3JlYWR5Jyk7XG5cdH1cblxuXHRjbGVhclBhcnRzKCkge1xuXHRcdC8qINC40LfQstC10YnQsNC10Lwg0L7QsSDRg9C00LDQu9C10L3QuNC4INGN0LvQtdC80LXQvdGC0L7QsiAqL1xuXHRcdGlmICh0aGlzW01FVEFfUEFSVFNdICYmIEFycmF5LmlzQXJyYXkodGhpc1tNRVRBX1BBUlRTXSkgJiYgdGhpc1tNRVRBX1BBUlRTXS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpc1tNRVRBX1BBUlRTXSkge1xuXHRcdFx0XHRpZiAodC5kZXN0cm95KXtcblx0XHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdudEVsJykgJiYgdGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZSl7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKTtcblx0XHR9XG5cdH1cblxuXHRyZXNldFBhcnRzKCkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10gPSBbXTtcblx0fVxuXG5cdGdldFBhcnRzKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfUEFSVFNdO1xuXHR9XG5cblx0YWRkUGFydCh0ZW1wbGF0ZSkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10ucHVzaCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0dGhpcy5yZW1vdmVPYnNvbGV0ZVBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHBsYWNlci5iZWZvcmUodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHRwbGFjZXIuYWZ0ZXIodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyB0YXJnZXQgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdHBsYWNlUGFydChkYXRhLCBpbmRleCl7XG5cdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSksXG5cdFx0XHRub2RlcyA9IHBhcnQuZ2V0U3Rhc2goKSxcblx0XHRcdHRhcmdldEVsLFxuXHRcdFx0bGFzdE5vZGUsXG5cdFx0XHRwbGFjZXI7XG5cdFx0aWYgKGluZGV4ID09PSAwKXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcihPUFRTLkRFRkFVTFRfUExBQ0VSX0xPT1ApO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJyk7XG5cdFx0fVxuXHRcdHBsYWNlci5tYWluKHRhcmdldEVsLCBub2Rlcyk7XG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRnZXRQbGFjZXIobWV0aG9kKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZWFyY2hpbmcgZm9yIHBsYWNlcicsIG1ldGhvZCk7XG5cdFx0aWYgKG5vdFBsYWNlcnMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbbWV0aG9kXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbT1BUUy5ERUZBVUxUX1BMQUNFUl07XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaERhdGEoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldERhdGEoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaFBhcnQoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0UGFydHMoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXRQYXJ0cygpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdNC10YHQu9C4INGBINC00LDQvdC90YvQvNC4INC90LUg0YHQstGP0LfQsNC9INGA0LXQvdC00LXRgNC10YAgLSDRgdC+0LfQtNCw0LXQvFxuXHQqL1xuXG5cdHJlbmRlclBhcnQoZGF0YSkge1xuXHRcdGlmICghdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ2NyZWF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHRsZXQgcmVuZGVyZXIgPSBuZXcgbm90UmVuZGVyZXIoe1xuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0ZW1wbGF0ZTogdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lLmJpbmQodGhpcyksXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpLFxuXHRcdFx0XHRjb21wb25lbnQ6IHRoaXNcblx0XHRcdH0pO1xuXHRcdFx0Ly9yZW5kZXJlci5vbignb2Jzb2xldGUnLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkUGFydChyZW5kZXJlcik7XG5cdFx0fWVsc2V7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHR0aGlzLnVwZGF0ZVBhcnQodGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVQYXJ0KHBhcnQpe1xuXHRcdHBhcnQudXBkYXRlKCk7XG5cdH1cblxuXHRyZW1vdmVPYnNvbGV0ZVBhcnRzKCkge1xuXHRcdC8v0LrQvtC90LLQtdC10YAg0L/QvtC40YHQuiDQsNC60YLRg9Cw0LvRjNC90YvRhSAtINGD0LTQsNC70LXQvdC40LUg0L7RgdGC0LDQu9GM0L3Ri9GFXG5cdFx0bm90Q29tbW9uLnBpcGUoXG5cdFx0XHR1bmRlZmluZWQsIC8vIHBhcnRzIHRvIHNlYXJjaCBpbiwgY2FuIGJlICd1bmRlZmluZWQnXG5cdFx0XHRbXG5cdFx0XHRcdHRoaXMuZmluZEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vZmlyc3Qgcm91bmQsIHNlYXJjaCBmb3Igb2Jzb2xldGVcblx0XHRcdFx0dGhpcy5yZW1vdmVOb3RBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL3JlbW92ZSAnZW1cblx0XHRcdF1cblx0XHQpO1xuXHR9XG5cblx0Lypcblx0XHTQtdGB0YLRjCDQtNCw0L3QvdGL0LUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDQsNC60YLRg9Cw0LvRjNC90L4sXG5cdFx00L3QtdGCINC00LDQvdC90YvRhSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINGB0YLQsNGA0YzRkVxuXHQqL1xuXG5cdGZpbmRBY3R1YWxQYXJ0cygpIHtcblx0XHRsZXQgYWN0dWFsUGFydHMgPSBbXTtcblx0XHR0aGlzLmZvckVhY2hEYXRhKChkYXRhLyosIGluZGV4Ki8pPT57XG5cdFx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKTtcblx0XHRcdGlmIChwYXJ0KXtcblx0XHRcdFx0YWN0dWFsUGFydHMucHVzaChwYXJ0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gYWN0dWFsUGFydHM7XG5cdH1cblxuXHQvKlxuXHRcdNGD0LTQsNC70Y/QtdC8INCy0YHQtSDQutGA0L7QvNC1INCw0LrRgtGD0LDQu9GM0L3Ri9GFXG5cdCovXG5cdHJlbW92ZU5vdEFjdHVhbFBhcnRzKGFjdHVhbFBhcnRzKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmIChhY3R1YWxQYXJ0cy5pbmRleE9mKHRoaXMuZ2V0UGFydHMoKVt0XSkgPT09IC0xKXtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpW3RdLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpLnNwbGljZSh0LCAxKTtcblx0XHRcdFx0dC0tO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFBhcnRCeURhdGEoZGF0YSkge1xuXHRcdGZvciAobGV0IHQgaW4gdGhpcy5nZXRQYXJ0cygpKSB7XG5cdFx0XHRpZiAodGhpcy5nZXRQYXJ0cygpW3RdLmlzRGF0YShkYXRhKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRQYXJ0cygpW3RdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tcG9uZW50O1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IgPSAnLnBhZ2UtY29udGVudCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdTX1BPU1RGSVggPSAnLmh0bWwnLFxuXHRPUFRfREVGQVVMVF9WSUVXX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCA9IHRydWUsXG5cdE9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FID0gJ01vZGVscycsXG5cdE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FID0gJ01vZGVsJyxcblx0T1BUX0RFRkFVTFRfTU9EVUxFX05BTUUgPSAnbWFpbicsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9BTkQgPSAncmVwbGFjZSc7XG5cbmNsYXNzIG5vdENvbnRyb2xsZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoYXBwKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJlYWR5OiBmYWxzZSxcblx0XHRcdHZpZXdzOiB7fSxcblx0XHRcdHZpZXdOYW1lOiBPUFRfREVGQVVMVF9WSUVXX05BTUUsXG5cdFx0XHRoZWxwZXJzOiB7fVxuXHRcdH0pO1xuXHRcdHRoaXMuc2V0RGF0YSh7fSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHtcblx0XHRcdG1vZHVsZU5hbWU6IE9QVF9ERUZBVUxUX01PRFVMRV9OQU1FLFxuXHRcdFx0Y29udGFpbmVyU2VsZWN0b3I6IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUixcblx0XHRcdHByZWZpeDogdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMubW9kdWxlJyksXG5cdFx0XHRwb3N0Zml4OiBPUFRfREVGQVVMVF9WSUVXU19QT1NURklYLFxuXHRcdFx0cmVuZGVyRnJvbVVSTDogT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMLFxuXHRcdFx0bmFtZXM6e1xuXHRcdFx0XHRwbHVyYWw6T1BUX0RFRkFVTFRfUExVUkFMX05BTUUsXG5cdFx0XHRcdHNpbmdsZTogT1BUX0RFRkFVTFRfU0lOR0xFX05BTUVcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMuaW5pdFJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHQvKlxuXHRcdCAgICDRgdGA0LDQt9GDINC00LXQu9Cw0LXQvCDQtNC+0YHRgtGD0L/QvdGL0LzQuCDQvNC+0LTQtdC70Lggbm90UmVjb3JkINC40LcgbmNgQ29udHJvbGxlck5hbWVgINCx0YPQtNGD0YIg0LTQvtGB0YLRg9C/0L3RiyDQutCw0LogdGhpcy5ucmBNb2RlbE5hbWVgXG5cdFx0Ki9cblx0XHRsZXQgaW50ZXJmYWNlcyA9IHRoaXMuYXBwLmdldEludGVyZmFjZXMoKTtcblx0XHR0aGlzLm1ha2UgPSB7fTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IGludGVyZmFjZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMubWFrZVt0XSA9IGludGVyZmFjZXNbdF07XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdFJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyKHRoaXMuZ2V0V29ya2luZygndmlld05hbWUnKSwgdGhpcy5nZXREYXRhKCksIHRoaXMuZ2V0V29ya2luZygnaGVscGVycycpKTtcblx0fVxuXG5cdHJlbmRlcih2aWV3TmFtZSA9J2RlZmF1bHQnIC8qIHZpZXcgbmFtZSAqLywgZGF0YSA9IHt9IC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzID0ge30vKiBjb3VsZCBiZSBub3QgcmVwcmVzZW50ZWQgKi8pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHZhciB2aWV3ID0gdGhpcy5nZXRWaWV3KHZpZXdOYW1lKTtcblxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3ID09PSAndW5kZWZpbmVkJyB8fCB2aWV3ID09PSBudWxsKSB7XG5cdFx0XHRcdHJlamVjdCgnTm8gdmlldyBmb3VuZCcsIHZpZXdOYW1lKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2aWV3ID0gbm90Q29tbW9uLmV4dGVuZCh7fSwgdmlldyk7XG5cdFx0XHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0XHRcdC8vINGN0LvQtdC80LXQvdGC0LAsINC90L4g0LjQt9Cy0LXRgdGC0L3QvtC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGA0LVcblx0XHRcdFx0aWYgKCgodHlwZW9mIHZpZXcudGFyZ2V0RWwgPT09ICd1bmRlZmluZWQnKSB8fCAodmlldy50YXJnZXRFbCA9PT0gbnVsbCkpICYmICh0eXBlb2Ygdmlldy50YXJnZXRRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy50YXJnZXRRdWVyeSAhPT0gbnVsbCAmJiB2aWV3LnRhcmdldFF1ZXJ5Lmxlbmd0aCA+IDApKSB7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iodmlldy50YXJnZXRRdWVyeSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHZpZXcuaGVscGVycywgaGVscGVycyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0fVxuXHRcdFx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0XHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckZyb21VUkwnKSkge1xuXHRcdFx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygdmlldy50ZW1wbGF0ZVVSTCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldy50ZW1wbGF0ZVVSTCA9PSBudWxsIHx8IHZpZXcudGVtcGxhdGVVUkwubGVuZ3RoID09IDApIHtcblx0XHRcdFx0XHRcdGxldCBwcmVmaXggPSAodmlldy5jb21tb24gPyB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5jb21tb24nKTogdGhpcy5nZXRNb2R1bGVQcmVmaXgoKSksXG5cdFx0XHRcdFx0XHRcdG5hbWUgPSAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiB2aWV3TmFtZSksXG5cdFx0XHRcdFx0XHRcdHBvc3RmaXggPSB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHRcdC8v0LPQtdC90LXRgNC40YDRg9C10Lwg0LDQtNGA0LXRgSDQv9C+INGI0LDQsdC70L7QvdGDXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gIFtwcmVmaXgsIG5hbWVdLmpvaW4oJy8nKSArIHBvc3RmaXg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8v0LAg0LXRgdC70Lgg0LXRgdGC0Ywg0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCwg0YLQvlxuXHRcdFx0XHRcdGlmICh2aWV3Lmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU5hbWUnKSkge1xuXHRcdFx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVOYW1lID0gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIHZpZXcudGVtcGxhdGVOYW1lICsgdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTp7XG5cdFx0XHRcdFx0XHRuYW1lOiB2aWV3LnRlbXBsYXRlTmFtZSxcblx0XHRcdFx0XHRcdHNyYzogdmlldy50ZW1wbGF0ZVVSTCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czpbWydhZnRlclJlbmRlcicsIHJlc29sdmVdXSxcblx0XHRcdFx0XHRvcHRpb25zOntcblx0XHRcdFx0XHRcdHRhcmdldEVsOiB2aWV3LnRhcmdldEVsLFxuXHRcdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRcdHJlbmRlckFuZDogT1BUX0RFRkFVTFRfUkVOREVSX0FORCB8fCB2aWV3LnJlbmRlckFuZFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRBcHAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwO1xuXHR9XG5cblx0c2V0TW9kZWwobW9kZWwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGVsJywgbW9kZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kZWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnbW9kZWwnKTtcblx0fVxuXG5cdHNldFJlYWR5KHZhbCA9IHRydWUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdmFsKTtcblx0XHR2YWwgPyB0aGlzLnRyaWdnZXIoJ3JlYWR5JykgOiB0aGlzLnRyaWdnZXIoJ2J1c3knKTtcblx0fVxuXG5cdHNldFZpZXcobmFtZSwgdmlldyl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSwgdmlldyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRWaWV3cyh2aWV3cyl7XG5cdFx0Zm9yKGxldCB0IGluIHZpZXdzKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgdCksIHZpZXdzW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRWaWV3KG5hbWUgPSAnZGVmYXVsdCcpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpKTtcblx0fVxuXG5cdHNldE1vZHVsZU5hbWUodmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdtb2R1bGVOYW1lJywgdmFsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZHVsZU5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnbW9kdWxlTmFtZScpO1xuXHR9XG5cblx0Z2V0TW9kdWxlUHJlZml4KCl7XG5cdFx0cmV0dXJuIFt0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGVzJyksIHRoaXMuZ2V0TW9kdWxlTmFtZSgpXS5qb2luKCcvJyk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb250cm9sbGVyO1xuIiwiaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aC5qcyc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4uL25vdFJvdXRlcic7XG5cbnZhciBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgPSB7XG5cdGNvbnRlbnQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5pbmRleE9mKCdjYXBpdGFsaXplJykgPiAtMSkge1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0LnRvVXBwZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQudGV4dENvbnRlbnQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQ7XG5cdH0sXG5cdGJpbmQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpID0+IHtcblx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe1xuXHRcdFx0XHRcdHNjb3BlLFxuXHRcdFx0XHRcdGl0ZW0sXG5cdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBsaXZlRXZlbnRzID0gWydjaGFuZ2UnLCAna2V5dXAnXSxcblx0XHRcdG9uRXZlbnQgPSAoKSA9PiB7XG5cdFx0XHRcdGlmIChbJ2NoZWNrYm94JywgJ3JhZGlvJywgJ3NlbGVjdC1tdWx0aXBsZSddLmluZGV4T2Yoc2NvcGUuZWxlbWVudC50eXBlKSA+IC0xKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChzY29wZS5lbGVtZW50LnR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdyYWRpbyc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZD9zY29wZS5lbGVtZW50LnZhbHVlOm51bGwpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkID8gc2NvcGUuZWxlbWVudC52YWx1ZSA6IG51bGwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnc2VsZWN0LW11bHRpcGxlJzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bGV0IHNlbGVjdGVkID0gW10uc2xpY2UuY2FsbChzY29wZS5lbGVtZW50LnNlbGVjdGVkT3B0aW9ucykubWFwKGEgPT4gYS52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coJ3NlbGVjdC1tdWx0aXBsZScsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2cobm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyksICcgLT4gJyxzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgIT09IHRydWUpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgbGl2ZUV2ZW50cykge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodCwgb25FdmVudCk7XG5cdFx0XHR9XG5cdFx0XHRzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cdGF0dHI6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlcyA9PT0gJ2Z1bmN0aW9uJykgPyByZXMoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzKTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZShzY29wZS5wYXJhbXNbMF0sIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdH0sXG5cdG5hbWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oIC8qc2NvcGUsIGl0ZW0sIGhlbHBlcnMqLyApIHtcblxuXHR9LFxuXHRjaGVja2VkOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXN1bHQgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXN1bHQgPT09ICdmdW5jdGlvbicpID8gcmVzdWx0KHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlc3VsdCk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID8gc2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKSA6IHNjb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG5cdH0sXG5cdGNsYXNzOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpID8gcmVzKHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlcyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPCAzIHx8IGlzTmFOKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpIHtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IHVzZWQgPSBmYWxzZTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcGUucGFyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChpID09PSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0XHR1c2VkID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCF1c2VkKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0b3B0aW9uczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgaSA9IDAsXG5cdFx0XHRvcHRpb24gPSBudWxsLFxuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSAndmFsdWUnLFxuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSAnbmFtZScsXG5cdFx0XHRpdGVtVmFsdWVGaWVsZE5hbWUgPSBoZWxwZXJzLmhhc093blByb3BlcnR5KCdmaWVsZCcpICYmIGhlbHBlcnMuZmllbGQuaGFzT3duUHJvcGVydHkoJ25hbWUnKSA/IGhlbHBlcnMuZmllbGQubmFtZSA6ICd2YWx1ZSc7XG5cdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBoZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWxwZXJzICE9PSBudWxsICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSAmJiBoZWxwZXJzLmRlZmF1bHQpIHtcblx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyk7XG5cdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBoZWxwZXJzLnBsYWNlaG9sZGVyO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdHZhciBsaWIgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsaWIubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbGliW2ldW3ZhbHVlRmllbGROYW1lXSk7XG5cdFx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGxpYltpXVtsYWJlbEZpZWxkTmFtZV07XG5cdFx0XHRcdGlmIChoZWxwZXJzLmZpZWxkLmFycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXS5pbmRleE9mKGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pID4gLTEpIHtcblx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0gPT09IGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pIHtcblx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGhyZWY6ZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGlmICghc2NvcGUuZWxlbWVudC5ub3RSb3V0ZXJJbml0aWFsaXplZCl7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgbm90Um91dGVyLmdldEZ1bGxSb3V0ZShzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKTtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9Pntcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRub3RSb3V0ZXIubmF2aWdhdGUobm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdHNjb3BlLmVsZW1lbnQubm90Um91dGVySW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxufTtcbmV4cG9ydCBkZWZhdWx0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYjtcbiIsImltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi4vbm90UmVjb3JkJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYID0gJ2Zvcm1fJyxcblx0T1BUX0RFRkFVTFRfUk9MRV9OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9GT1JNX1RJVExFID0gJ0Zvcm0gZGVmYXVsdCB0aXRsZScsXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04gPSB7XG5cblx0fSxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QgPSBbJ29wdGlvbnMnLCAnbWFuaWZlc3QnLCAnYXBwJ107XG5cbmNsYXNzIG5vdEZvcm0gZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3ByZWZpeCcsIE9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnRzJywgW10pO1xuXHRcdGlmICghdGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuc2V0RGF0YShuZXcgbm90UmVjb3JkKHt9LCB0aGlzLmdldERhdGEoKSkpO1xuXHRcdH1cblx0XHR0aGlzLm9uKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ3Jlc2V0JywgdGhpcy5vblJlc2V0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NhbmNlbCcsIHRoaXMub25DYW5jZWwuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YSgpIHtcblx0XHRsZXQgbWFuaWZlc3QgPSB0aGlzLmdldE1hbmlmZXN0KCk7XG5cdFx0aWYgKG1hbmlmZXN0ICYmIG1hbmlmZXN0LmFjdGlvbnMpIHtcblx0XHRcdHJldHVybiBtYW5pZmVzdC5hY3Rpb25zLmhhc093blByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJykpID8gbWFuaWZlc3QuYWN0aW9uc1t0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpXSA6IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGdldEZvcm1GaWVsZHNMaXN0KCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCksXG5cdFx0XHRsaXN0ID0gW10sXG5cdFx0XHRyb2xlID0gdGhpcy5nZXRPcHRpb25zKCdyb2xlJywgT1BUX0RFRkFVTFRfUk9MRV9OQU1FKTtcblx0XHRpZiAoYWN0aW9uRGF0YSkge1xuXG5cdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMpIHtcblx0XHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzLmhhc093blByb3BlcnR5KHJvbGUpKSB7XG5cdFx0XHRcdFx0bGlzdCA9IGFjdGlvbkRhdGEuZmllbGRzW3JvbGVdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0Lypcblx0XHRSZW5kZXJpbmdcblx0Ki9cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdH1cblxuXHRnZXRQYXJ0VGVtcGxhdGVOYW1lKGZvcm1QYXJ0KXtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIGZvcm1QYXJ0O1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaW5wdXQgPSB7XG5cdFx0XHRcdGRhdGE6IHRoaXMuZ2V0V3JhcHBlckRhdGEoKSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoJ3dyYXBwZXInKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHRoaXMuYmluZEZvcm1FdmVudHMuYmluZCh0aGlzKV0sXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfRk9STV9USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpICYmIHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aCl7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRGb3JtRmllbGRzTGlzdCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0bGV0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKVt0XTtcblx0XHRcdFx0dGhpcy5hZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsZWFyRmllbGRzQ29tcG9uZW50cygpIHtcblx0XHRsZXQgY29tcHMgPSB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKTtcblx0XHR3aGlsZSAoY29tcHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29tcHNbMF0uY29tcG9uZW50LmRlc3Ryb3koKTtcblx0XHRcdGNvbXBzLnNwbGljZSgwLCAxKTtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHNMaWJzKCl7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdG9wdGlvbnM6IHt9LFxuXHRcdFx0bWFuaWZlc3Q6IHt9LFxuXHRcdFx0YXBwOiB7fSxcblx0XHR9O1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpKSB7XG5cdFx0XHRyZXN1bHQub3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmIChub3RDb21tb24uZ2V0QXBwKCkgJiYgbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpKXtcblx0XHRcdHJlc3VsdC5hcHAgPSBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCAmJiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpKXtcblx0XHRcdHJlc3VsdC5tYW5pZmVzdCA9IHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkuZmllbGRzO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpIHtcblx0XHRsZXQgZGVmID0gT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTixcblx0XHRcdGZpZWxkc0xpYnMgPSB0aGlzLmdldEZpZWxkc0xpYnMoKTtcblx0XHRmb3IobGV0IHQgb2YgT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1Qpe1xuXHRcdFx0aWYgKGZpZWxkc0xpYnMuaGFzT3duUHJvcGVydHkodCkgJiYgZmllbGRzTGlic1t0XS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpKXtcblx0XHRcdFx0cmV0dXJuIGZpZWxkc0xpYnNbdF1bZmllbGROYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSkge1xuXHRcdGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKTtcblx0XHRsZXQgcmVjID0ge1xuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0bmFtZTogZmllbGROYW1lLFxuXHRcdFx0XHR0aXRsZTogZmllbGRUeXBlLmxhYmVsIHx8IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0dHlwZTogZmllbGRUeXBlLnR5cGUsXG5cdFx0XHRcdGxhYmVsOiBmaWVsZFR5cGUubGFiZWwsXG5cdFx0XHRcdGFycmF5OiBmaWVsZFR5cGUuYXJyYXksXG5cdFx0XHRcdGRlZmF1bHQ6IGZpZWxkVHlwZS5kZWZhdWx0LFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMobm90UGF0aC5qb2luKCdoZWxwZXJzJywnbGlicycsZmllbGROYW1lKSlcblx0XHRcdH1cblx0XHR9O1xuXHRcdGxldCBoZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRpc0NoZWNrZWQ6IChwYXJhbXMpPT57XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cblx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoZmllbGRUeXBlLnR5cGUpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRGb3JtVGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0Jyxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbJ2FmdGVyRGF0YUNoYW5nZScsIHRoaXMuY29sbGVjdERhdGFGcm9tQ29tcG9uZW50cy5iaW5kKHRoaXMpXVxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykucHVzaChyZWMpO1xuXHR9XG5cblx0Y29sbGVjdERhdGFGcm9tQ29tcG9uZW50cyhwYXJhbXMpe1xuXHRcdG5vdENvbW1vbi5sb2coJ2NvbGxlY3QgZGF0YSBmcm9tIGNvbXBvbmVudHMnLCBwYXJhbXMpO1xuXHR9XG5cblx0Z2V0Rm9ybVRhcmdldEVsZW1lbnQodGFyZ2V0ID0gJ2JvZHknKXtcblx0XHRpZiAoIXRhcmdldCl7dGFyZ2V0ID0gJ2JvZHknO31cblx0XHRsZXQgcmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHRpZiAoIXJlcyAmJiB0YXJnZXQhPT0nYm9keScpe1xuXHRcdFx0dGFyZ2V0ID0gJ2JvZHknO1xuXHRcdFx0cmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHR9XG5cdFx0aWYoIXJlcyAmJiB0YXJnZXQ9PSdib2R5Jyl7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdGNvbGxlY3REYXRhKCkge1xuXHRcdGxldCBkYXRhID0gdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcylcblx0fVxuXG5cdC8qXG5cdFx0RXZlbnQgaGFuZGxlcnNcblx0Ki9cblxuXHRvblN1Ym1pdCgpIHtcblxuXHR9XG5cblx0b25DYW5jZWwoKSB7XG5cblx0fVxuXG5cdG9uUmVzZXQoKSB7XG5cblx0fVxuXG5cdGdldEZpZWxkcygpIHtcblxuXHR9XG5cblx0YWRkRmllbGQoKSB7XG5cblx0fVxuXG5cdHJlbW92ZUZpZWxkKCkge1xuXG5cdH1cblxuXHRiaW5kRm9ybUV2ZW50cygpe1xuXHRcdGxldCBmb3JtID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcblx0XHRpZihmb3JtKXtcblx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCB0aGlzLm9uUmVzZXQuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEZvcm07XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9QQUdFX1NJWkUgPSAyMCxcblx0T1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIgPSAxMCxcblx0T1BUX0ZJRUxEX05BTUVfUFJFX1BST0MgPSAncHJlcHJvY2Vzc29yJztcblxuY2xhc3Mgbm90VGFibGUgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0dGhpcy5yZXNldFBhZ2VyKCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRkYXRhOiB7fSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiAndGFibGVfd3JhcHBlcidcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdHJlbmRlckFuZDogdGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJJbnNpZGUuYmluZCh0aGlzKVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudCcsIGNvbXBvbmVudCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVySW5zaWRlKCkge1xuXHRcdHRoaXMucmVuZGVySGVhZGVyKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdFx0dGhpcy5yZW5kZXJCb2R5KCk7XG5cdFx0dGhpcy5iaW5kU2VhcmNoKCk7XG5cdFx0dGhpcy5iaW5kQ3VzdG9tQmluZGluZ3MoKTtcblx0fVxuXG5cdHJlbmRlckhlYWRlcigpIHtcblx0XHR2YXIgdGFibGVIZWFkZXIgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGhlYWQgdHInKTtcblx0XHRpZiAoIXRhYmxlSGVhZGVyKSByZXR1cm47XG5cdFx0bGV0IGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBuZXdUaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJyk7XG5cdFx0XHRuZXdUaC5pbm5lckhUTUwgPSBmaWVsZHNbaV0udGl0bGU7XG5cdFx0XHRuZXdUaC5kYXRhc2V0LmRhdGFGaWVsZE5hbWUgPSBmaWVsZHNbaV0ucGF0aDtcblx0XHRcdG5ld1RoLmRhdGFzZXQuc29ydGluZ0RpcmVjdGlvbiA9IDA7XG5cdFx0XHRpZiAoZmllbGRzW2ldLmhhc093blByb3BlcnR5KCdzb3J0YWJsZScpICYmIGZpZWxkc1tpXS5zb3J0YWJsZSkge1xuXHRcdFx0XHR0aGlzLmF0dGFjaFNvcnRpbmdIYW5kbGVycyhuZXdUaCk7XG5cdFx0XHR9XG5cdFx0XHR0YWJsZUhlYWRlci5hcHBlbmRDaGlsZChuZXdUaCk7XG5cdFx0fVxuXHR9XG5cblx0YXR0YWNoU29ydGluZ0hhbmRsZXJzKGhlYWRDZWxsKSB7XG5cdFx0aGVhZENlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5jaGFuZ2VTb3J0aW5nT3B0aW9ucyhlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHRcdGhlYWRDZWxsLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0fVxuXG5cdGNoYW5nZVNvcnRpbmdPcHRpb25zKGVsKSB7XG5cdFx0aWYgKHBhcnNlSW50KGVsLmRhdGFzZXQuc29ydGluZ0RpcmVjdGlvbikgPT09IDApIHtcblx0XHRcdGVsLmRhdGFzZXQuc29ydGluZ0RpcmVjdGlvbiA9IDE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmRhdGFzZXQuc29ydGluZ0RpcmVjdGlvbiA9IHBhcnNlSW50KGVsLmRhdGFzZXQuc29ydGluZ0RpcmVjdGlvbikgKiAtMTtcblx0XHR9XG5cdFx0aWYgKGVsLnBhcmVudE5vZGUpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWwucGFyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXSA9PT0gZWwpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChwYXJzZUludChlbC5kYXRhc2V0LnNvcnRpbmdEaXJlY3Rpb24pID4gMCkge1xuXHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnYXNjZW5kaW5nJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ2Rlc2NlbmRpbmcnKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0c29ydERpcmVjdGlvbjogZWwuZGF0YXNldC5zb3J0aW5nRGlyZWN0aW9uLFxuXHRcdFx0c29ydEJ5RmllbGQ6IGVsLmRhdGFzZXQuZGF0YUZpZWxkTmFtZVxuXHRcdH0pO1xuXHR9XG5cblx0c2V0U29ydGVyKGhhc2gpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3NvcnRlcicsIGhhc2gpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZURhdGEoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdGdldEZpbHRlclNlYXJjaCgpIHtcblx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmdldEZpbHRlcigpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldEZpbHRlcigpICE9PSBudWxsICYmIHR5cGVvZiB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2ggIT09IG51bGwpID8gdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2gudG9TdHJpbmcoKSA6ICcnO1xuXHR9XG5cblx0aW52YWxpZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ29uZVBhZ2VyJykpIHtcblx0XHRcdHdoaWxlKHRoaXMuZ2V0RGF0YSgncm93cycpLmxlbmd0aD4wKXtcblx0XHRcdFx0dGhpcy5nZXREYXRhKCdyb3dzJykucG9wKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR9XG5cdH1cblxuXHRzZXRGaWx0ZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgaGFzaCk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlRGF0YSgpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0UGFnZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncGFnZXInLCBoYXNoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdwYWdlcicsIHtcblx0XHRcdHBhZ2VTaXplOiB0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJykgPyB0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJykgOiBPUFRfREVGQVVMVF9QQUdFX1NJWkUsXG5cdFx0XHRwYWdlTnVtYmVyOiB0aGlzLmdldE9wdGlvbnMoJ3BhZ2VOdW1iZXInKSA/IHRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpIDogT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIsXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwYWdlcicpO1xuXHR9XG5cblx0c2V0VXBkYXRpbmcoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd1cGRhdGluZycsIHRydWUpO1xuXHR9XG5cblx0c2V0VXBkYXRlZCgpIHtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwZGF0aW5nJywgZmFsc2UpO1xuXHR9XG5cblx0aWZVcGRhdGluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd1cGRhdGluZycpO1xuXHR9XG5cblx0dXBkYXRlRGF0YSgpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdsaXZlTG9hZCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlJykpIHtcblx0XHRcdGlmICh0aGlzLmlmVXBkYXRpbmcoKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvL2xvYWQgZnJvbSBzZXJ2ZXJcblx0XHRcdGxldCBxdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlJykoe30pLnNldEZpbHRlcih0aGlzLmdldEZpbHRlcigpKS5zZXRTb3J0ZXIodGhpcy5nZXRTb3J0ZXIoKSkuc2V0UGFnZXIodGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplLCB0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlcik7XG5cdFx0XHR0aGlzLnNldFVwZGF0aW5nKCk7XG5cdFx0XHRxdWVyeS4kbGlzdCgpXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJyRsaXN0IGZvciB0YWJsZScsIGRhdGEpO1xuXHRcdFx0XHRcdHRoaXMuZ2V0RGF0YSgncm93cycpLmNvbmNhdChkYXRhKTtcblx0XHRcdFx0XHR0aGlzLnByb2NjZXNzRGF0YSgpO1xuXHRcdFx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcblx0XHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vbG9jYWwgbWFnaWNcblx0XHRcdHRoaXMucHJvY2Nlc3NEYXRhKCk7XG5cdFx0XHR0aGlzLnJlZnJlc2hCb2R5KCk7XG5cdFx0fVxuXHR9XG5cblx0cHJvY2Nlc3NEYXRhKCkge1xuXHRcdHZhciB0aGF0RmlsdGVyID0gdGhpcy5nZXRGaWx0ZXIoKTtcblx0XHRpZiAodHlwZW9mIHRoYXRGaWx0ZXIgIT09ICd1bmRlZmluZWQnICYmIHRoYXRGaWx0ZXIgIT09IG51bGwgJiYgdHlwZW9mIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gbnVsbCAmJiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaC5sZW5ndGggPiAwKSB7XG5cdFx0XHQvL1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKS5maWx0ZXIodGhpcy50ZXN0RGF0YUl0ZW0uYmluZCh0aGlzKSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIHRoaXMuZ2V0RGF0YSgncm93cycpKTtcblx0XHR9XG5cdFx0Ly8vL3NvcnRlclxuXHRcdHZhciB0aGF0U29ydGVyID0gdGhpcy5nZXRTb3J0ZXIoKTtcblx0XHRpZiAodHlwZW9mIHRoYXRTb3J0ZXIgIT09ICd1bmRlZmluZWQnICYmIHRoYXRTb3J0ZXIgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykuc29ydCgoaXRlbTEsIGl0ZW0yKSA9PiB7XG5cdFx0XHRcdGlmIChpc05hTihub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLCBpdGVtMSwge30pKSkge1xuXHRcdFx0XHRcdHJldHVybiBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLCBpdGVtMSwge30pLmxvY2FsZUNvbXBhcmUobm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCxpdGVtMix7fSkpICogLXRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gKChub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLCBpdGVtMSwge30pIDwgbm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCwgaXRlbTIsIHt9KSkgPyAxIDogLTEpICogdGhhdFNvcnRlci5zb3J0RGlyZWN0aW9uO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRiaW5kU2VhcmNoKCkge1xuXHRcdHZhciBzZWFyY2hFbCA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwic2VhcmNoXCJdJylbMF07XG5cdFx0aWYgKCFzZWFyY2hFbCkgcmV0dXJuO1xuXHRcdHZhciBvbkV2ZW50ID0gKGUpID0+IHtcblx0XHRcdHRoaXMuc2V0RmlsdGVyKHtcblx0XHRcdFx0ZmlsdGVyU2VhcmNoOiBlLmN1cnJlbnRUYXJnZXQudmFsdWVcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblx0XHRzZWFyY2hFbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uRXZlbnQpO1xuXHRcdHNlYXJjaEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2VudGVyJywgb25FdmVudCk7XG5cdH1cblxuXG5cdGJpbmRDdXN0b21CaW5kaW5ncygpIHtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSB8fCAhdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGZvciAodmFyIHNlbGVjdG9yIGluIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSkge1xuXHRcdFx0dmFyIGVscyA9IHRoaXMuZ2V0T3B0aW9uKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0Zm9yICh2YXIgZWxJZCA9IDA7IGVsSWQgPCBlbHMubGVuZ3RoOyBlbElkKyspIHtcblx0XHRcdFx0dmFyIGVsID0gZWxzW2VsSWRdO1xuXHRcdFx0XHRmb3IgKHZhciBldmVudCBpbiB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJylbc2VsZWN0b3JdKSB7XG5cdFx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpW3NlbGVjdG9yXVtldmVudF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bG9hZE5leHQoKSB7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdwYWdlcicpLnBhZ2VOdW1iZXIrKztcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlbmRlclJvdyhpdGVtLCBpbmRleCkge1xuXHRcdGxldCBuZXdSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUUicpLFxuXHRcdFx0ZmllbGRzID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IG5ld1RkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEQnKSxcblx0XHRcdFx0ZmllbGQgPSBmaWVsZHNbaV0sXG5cdFx0XHRcdHByZXByb2Nlc3NlZCA9IG51bGwsXG5cdFx0XHRcdHZhbCA9IG5vdFBhdGguZ2V0KGZpZWxkLnBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZWRpdGFibGUnKSAmJiAhZmllbGQuaGFzT3duUHJvcGVydHkoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHRcdG5ld1RkLnNldEF0dHJpYnV0ZSgnY29udGVudEVkaXRhYmxlJywgdHJ1ZSk7XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQucGF0aCA9IGZpZWxkLnBhdGg7XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQuaXRlbUlkID0gaXRlbVt0aGlzLmdldE9wdGlvbnMoJ2l0ZW1JZEZpZWxkJyldO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0LnZhbHVlID0gdmFsO1xuXHRcdFx0XHRuZXdUZC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKGUpPT57XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksIG5ld1RkLnRleHRDb250ZW50KTtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoT1BUX0ZJRUxEX05BTUVfUFJFX1BST0MpKSB7XG5cdFx0XHRcdHByZXByb2Nlc3NlZCA9IGZpZWxkW09QVF9GSUVMRF9OQU1FX1BSRV9QUk9DXSh2YWwsIGl0ZW0sIGluZGV4KTtcblx0XHRcdH1cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnY29tcG9uZW50JykpIHtcblx0XHRcdFx0bmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YTogZmllbGQuY29tcG9uZW50LmRhdGEgfHwgcHJlcHJvY2Vzc2VkIHx8IHt2YWwsIGl0ZW0sIGluZGV4fSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTogZmllbGQuY29tcG9uZW50LnRlbXBsYXRlLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBuZXdUZCxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IGZpZWxkLmNvbXBvbmVudC5ldmVudHMgfHwgW11cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXdUZC5pbm5lckhUTUwgPSBwcmVwcm9jZXNzZWQgfHwgdmFsO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdldmVudHMnKSAmJiBmaWVsZC5ldmVudHMpIHtcblx0XHRcdFx0Zm9yICh2YXIgaiBpbiBmaWVsZC5ldmVudHMpIHtcblx0XHRcdFx0XHRuZXdUZC5hZGRFdmVudExpc3RlbmVyKGosIChlKT0+e1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZpZWxkLmV2ZW50c1tqXSh7XG5cdFx0XHRcdFx0XHRcdGV2ZW50OiBlLFxuXHRcdFx0XHRcdFx0XHRlbGVtZW50OiBuZXdUZCxcblx0XHRcdFx0XHRcdFx0aXRlbTogaXRlbSxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHZhbCxcblx0XHRcdFx0XHRcdFx0ZmllbGQ6IGZpZWxkXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG5ld1Jvdy5hcHBlbmRDaGlsZChuZXdUZCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3Byb2NSb3cnKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJvY1JvdycpKG5ld1JvdywgaXRlbSk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXdSb3c7XG5cdH1cblxuXHRyZWZyZXNoQm9keSgpIHtcblx0XHR2YXIgdGJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0aWYgKCF0Ym9keSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdHZhciB0aGlzUGFnZVN0YXJ0cyA9IDAsXG5cdFx0XHRuZXh0UGFnZUVuZHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIgKyAxKTtcblx0XHRmb3IgKHZhciBpID0gdGhpc1BhZ2VTdGFydHM7IGkgPCBNYXRoLm1pbihuZXh0UGFnZUVuZHMsIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykubGVuZ3RoKTsgaSsrKSB7XG5cdFx0XHR0Ym9keS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlclJvdyh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpW2ldKSk7XG5cdFx0fVxuXHR9XG5cblx0ZmluZEJvZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuXHR9XG5cblx0Y2xlYXJCb2R5KCkge1xuXHRcdHZhciB0YWJsZUJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0aWYgKCF0YWJsZUJvZHkpIHJldHVybjtcblx0XHR0YWJsZUJvZHkuaW5uZXJIVE1MID0gJyc7XG5cdH1cblxuXHRyZW5kZXJCb2R5KCkge1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpKSB7XG5cdFx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdH1cblx0XHR2YXIgdGhpc1BhZ2VTdGFydHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpLFxuXHRcdFx0bmV4dFBhZ2VFbmRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyICsgMSksXG5cdFx0XHR0Ym9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRmb3IgKHZhciBpID0gdGhpc1BhZ2VTdGFydHM7IGkgPCBNYXRoLm1pbihuZXh0UGFnZUVuZHMsIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykubGVuZ3RoKTsgaSsrKSB7XG5cdFx0XHR0Ym9keS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlclJvdyh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpW2ldKSk7XG5cdFx0fVxuXHR9XG5cblx0dGVzdERhdGFJdGVtKGl0ZW0pe1xuXHQgICAgdmFyIHN0clZhbHVlID0gdGhpcy5nZXRGaWx0ZXJTZWFyY2goKS50b0xvd2VyQ2FzZSgpO1xuXHQgICAgZm9yKHZhciBrIGluIGl0ZW0pe1xuXHQgICAgICAgIHZhciB0b0NvbXAgPSBpdGVtW2tdLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcblx0ICAgICAgICBpZiAodG9Db21wLmluZGV4T2Yoc3RyVmFsdWUpPi0xKXtcblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90VGFibGU7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbi8vaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG4vL2ltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuY2xhc3Mgbm90VmlldyBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgfHwge30pO1xuXHRcdHRoaXMuc2V0RGF0YShpbnB1dC5kYXRhIHx8IHt9KTtcblx0XHR0aGlzLnNldFdvcmtpbmcoaW5wdXQud29ya2luZyB8fCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RWaWV3O1xuIiwiLypcblx0Q29tbW9uIGZ1bmN0aW9uc1xuKi9cbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuLypcblx0ZnJhbWV3b3JrIHdpZGUgcGFyc2VyIGZvciBkYXRhIGFjY2Vzc1xuKi9cbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4vbm90Um91dGVyJztcblxuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG4vKlxuXHRiYXNpYyBldmVudCBoYW5kbGVycyBhbmQgY29yZSBkYXRhIG1vZGlmaWVyc1xuKi9cbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG4vKlxuXHRzbWFydGVyIGltYWdlIGNvbnRyb2xcbiovXG5pbXBvcnQgbm90SW1hZ2UgZnJvbSAnLi90ZW1wbGF0ZS9ub3RJbWFnZSc7XG4vKlxuXHRhcHBsaWNhdGlvbiBtYWluIGluZnJhc3RydWN0dXJlIHNldHRlclxuKi9cbmltcG9ydCBub3RBcHAgZnJvbSAnLi9ub3RBcHAnO1xuLypcblx0ZGFkZHkgZm9yIHVzZXIgY29udHJvbGxlcnNcbiovXG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuL25vdENvbnRyb2xsZXInO1xuLypcblx0dGVtcGxhdGluZyBhbmQgY29tbW9uIHN0cnVjdHVyZXNcbiovXG5cbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL3RlbXBsYXRlL25vdFJlbmRlcmVyJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7IC8vIHNtYXJ0ZXIgd2l0aCBiaW5kaW5ncyBmb3IgZXZlbnRzLCBhY3R1YWx5IHByb3h5XG5cbmltcG9ydCBub3RGb3JtIGZyb20gJy4vY29tcG9uZW50cy9ub3RGb3JtJztcbmltcG9ydCBub3RUYWJsZSBmcm9tICcuL2NvbXBvbmVudHMvbm90VGFibGUnO1xuaW1wb3J0IG5vdFZpZXcgZnJvbSAnLi9jb21wb25lbnRzL25vdFZpZXcnO1xuXG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJzsgLy9cdGhvdyB0byBpbnRlcmFjdCB3aXRoIGRhdGEgb24gc2VydmVyXG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJzsgLy9cdHdyYXBwZXIgZm9yIGRhdGEgd2l0aCBzZXJ2ZXI8LT52aWV3IGxpdmUgaW50ZXJhY3Rpb25zXG5cbm5vdFRlbXBsYXRlUHJvY2Vzc29ycy5hZGQobm90VGVtcGxhdGVQcm9jZXNzb3JzTGliKTtcblxuZXhwb3J0IHtcblx0bm90Q29tbW9uLFxuXHRub3RQYXRoLFxuXHRub3RCYXNlLFxuXHRub3RJbWFnZSxcblx0bm90QXBwLFxuXHRub3RBUEksXG5cdG5vdENvbnRyb2xsZXIsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29ycyxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLFxuXHRub3RUZW1wbGF0ZUNhY2hlLFxuXHRub3RSZW5kZXJlcixcblx0bm90Q29tcG9uZW50LFxuXHRub3RGb3JtLFxuXHRub3RSb3V0ZXIsXG5cdG5vdFRhYmxlLFxuXHRub3RWaWV3LFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZ2V0U2Vzc2lvbklEIiwicmVzcG9uc2VUeXBlIiwid2l0aENyZWRlbnRpYWxzIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ0Iiwib25lcnJvciIsIm9udGltZW91dCIsInNlbmQiLCJwYXJzZUludCIsInJlc3BvbnNlVGV4dCIsImUiLCJuYW1lIiwiZ2V0Q29va2llIiwidmFsdWUiLCJkb2N1bWVudCIsImNvb2tpZSIsInBhcnRzIiwic3BsaXQiLCJsZW5ndGgiLCJwb3AiLCJzaGlmdCIsIkNvbW1vbkxvZ3MiLCJsb2ciLCJhcmd1bWVudHMiLCJlcnJvciIsInRyYWNlIiwiTUFOQUdFUiIsIlN5bWJvbCIsIkNvbW1vblNob3J0cyIsImdldE1hbmFnZXIiLCJnZXRBUEkiLCJ2IiwiQ29tbW9uT2JqZWN0cyIsImRlZmF1bHRzIiwib3B0aW9ucyIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImNhbGwiLCJ0YXJnZXQiLCJzb3VyY2VzIiwiZm9yRWFjaCIsImRlc2NyaXB0b3JzIiwia2V5cyIsInNvdXJjZSIsInJlZHVjZSIsImtleSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldE93blByb3BlcnR5U3ltYm9scyIsImRlc2NyaXB0b3IiLCJzeW0iLCJlbnVtZXJhYmxlIiwiZGVmaW5lUHJvcGVydGllcyIsImJpZyIsInNtYWxsIiwib2JqIiwiZmlsdGVyIiwiY29udGFpbnNPYmoiLCJpY29ucyIsImJhdGNoIiwiZ2V0RGF0YSIsInB1c2giLCJhIiwiYiIsInAiLCJlcXVhbCIsInRvU3RyaW5nIiwiZGVmYXVsdFZhbHVlIiwib2JqMSIsIm9iajIiLCJqUXVlcnkiLCJleHRlbmQiLCJ2YWwiLCJyZWdpc3RyeSIsIkNvbW1vblN0cmluZ3MiLCJzdHJpbmciLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9Mb3dlckNhc2UiLCJDb21tb25GdW5jdGlvbnMiLCJmdW5jcyIsInJlc3VsdCIsImZ1bmMiLCJDb21tb25ET00iLCJlbCIsInN0YXJ0c1dpdGgiLCJhbGxFbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsaXN0IiwiaiIsImF0dHMiLCJhdHRyaWJ1dGVzIiwibiIsIm5vZGVOYW1lIiwiQ29tbW9uQXBwIiwic3RhcnRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJub3RDb21tb24iLCJhc3NpZ24iLCJleHRlbmRXaXRoIiwiU1VCX1BBVEhfU1RBUlQiLCJTVUJfUEFUSF9FTkQiLCJQQVRIX1NQTElUIiwiUEFUSF9TVEFSVF9PQkpFQ1QiLCJQQVRIX1NUQVJUX0hFTFBFUlMiLCJGVU5DVElPTl9NQVJLRVIiLCJNQVhfREVFUCIsIm5vdFBhdGgiLCJwYXRoIiwic3ViUGF0aCIsImZpbmQiLCJzdWIiLCJwYXJzZWQiLCJzdWJmIiwicmVwbGFjZSIsIml0ZW0iLCJoZWxwZXJzIiwic3ViUGF0aFBhcnNlZCIsImZpbmROZXh0U3ViUGF0aCIsImdldFZhbHVlQnlQYXRoIiwicmVwbGFjZVN1YlBhdGgiLCJwYXJzZVN1YnMiLCJhdHRyVmFsdWUiLCJzZXRWYWx1ZUJ5UGF0aCIsImlzUmVjb3JkIiwibm9ybWlsaXplUGF0aCIsInRyaWdnZXIiLCJzZXQiLCJzdGVwIiwiaGVscGVyIiwiclN0ZXAiLCJ1bmRlZmluZWQiLCJBcnJheSIsImlzQXJyYXkiLCJwYXJzZVBhdGhTdGVwIiwib2JqZWN0IiwiYXR0clBhdGgiLCJhdHRyTmFtZSIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfTUVUSE9EX0lOSVQiLCJNRVRBX0VWRU5UUyIsIk1FVEFfREFUQSIsIk1FVEFfV09SS0lORyIsIk1FVEFfT1BUSU9OUyIsIm5vdEJhc2UiLCJpbnB1dCIsImV2ZW50cyIsIm9uIiwic2V0RGF0YSIsInNldFdvcmtpbmciLCJ3b3JraW5nIiwic2V0T3B0aW9ucyIsIndoYXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsImZyb20iLCJldmVudE5hbWUiLCJldmVudCIsIm9mZiIsImNhbGxiYWNrcyIsImNhbGxiYWNrIiwidGFyZ2V0SWQiLCJzcGxpY2UiLCJPUFRfTU9ERV9ISVNUT1JZIiwiT1BUX01PREVfSEFTSCIsIk9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMIiwibm90Um91dGVyIiwicm9vdCIsImNsZWFyU2xhc2hlcyIsInJlIiwiaGFuZGxlciIsInJ1bGUiLCJhZGQiLCJwYXJhbSIsInIiLCJmcmFnbWVudCIsImxvY2F0aW9uIiwiZGVjb2RlVVJJIiwicGF0aG5hbWUiLCJzZWFyY2giLCJ3aW5kb3ciLCJtYXRjaCIsImhyZWYiLCJjdXJyZW50IiwiZ2V0RnJhZ21lbnQiLCJpbml0IiwiaXNJbml0aWFsaXplZCIsImNoZWNrIiwic2V0SW5pdGlhbGl6ZWQiLCJsb29wSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNoZWNrTG9jYXRpb24iLCJiaW5kIiwiaHJlZkNsaWNrIiwiZnVsbFJFIiwiYXBwbHkiLCJob3N0IiwiZ2V0RnVsbFJvdXRlIiwicHVzaFN0YXRlIiwibm90QVBJT3B0aW9ucyIsIm5vdEFQSVF1ZWUiLCJyZXF1ZXN0c1BlclNlY29uZCIsInF1ZWUiLCJpbnQiLCJpblByb2dyZXNzIiwidG9DYWxsIiwiY2xlYXJJbnRlcnZhbCIsInJ1biIsIm5vdEFQSSIsImlkIiwiZ29vZCIsImJhZCIsIm1ha2VSZXF1ZXN0IiwicmVzcG9uc2VPSyIsInJlc3BvbnNlRmFpbGVkIiwicmVxdWVzdEpTT04iLCJ0aGVuIiwibmV4dCIsImNhdGNoIiwiY29kZSIsImdldElkIiwibW9kZWxOYW1lIiwiZ2V0TW9kZWxOYW1lIiwibWFrZVVybCIsImdldEpTT04iLCJnZXRNb2RlbCIsInNldFByaWNlIiwibW9kZWwiLCJub3RJbWFnZSIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCIsIlRFTVBMQVRFX1RBRyIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYIiwiQ09NUE9ORU5UX0lEX1BSRUZJWCIsIlBBUlRfSURfUFJFRklYIiwiREVGQVVMVF9QTEFDRVIiLCJERUZBVUxUX1BMQUNFUl9MT09QIiwiT1BUUyIsIk1FVEFfQ0FDSEUiLCJub3RUZW1wbGF0ZUNhY2hlIiwiaGlkZVRlbXBsYXRlcyIsInJlZ2lzdGVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1hcCIsImxvYWRPbmUiLCJvUmVxdWVzdCIsImRpdiIsImRhdGFzZXQiLCJub3RUZW1wbGF0ZU5hbWUiLCJub3RUZW1wbGF0ZVVSTCIsInNyY0VsZW1lbnQiLCJzZXRPbmUiLCJlbGVtZW50IiwiY2xvbmVOb2RlIiwiY29udCIsInRleHQiLCJub3RUZW1wbGF0ZXNFbGVtZW50cyIsImVsSWQiLCJwYXJlbnROb2RlIiwibGliIiwiZ2V0SFRNTCIsInRlbXBsYXRlSW5uZXJIVE1MIiwidGVtcGxhdGVDb250RWwiLCJ3cmFwIiwidGVtcGxhdGVzSFRNTCIsInRlbXBsYXRlcyIsInBhcnNlTGliIiwiYWRkTGliIiwic2VsZWN0b3JPckVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGFnTmFtZSIsIk9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkiLCJub3RJbnRlcmZhY2UiLCJtYW5pZmVzdCIsImxpbmUiLCJyZWNvcmQiLCJhY3Rpb25OYW1lIiwicmVjb3JkUkUiLCJmaWVsZE5hbWUiLCJpbmQiLCJsZW4iLCJpbmQyIiwic3RhcnRTbGljZSIsImVuZFNsaWNlIiwiZ2V0QXR0ciIsImFjdGlvbkRhdGEiLCJwYXJzZUxpbmUiLCJwb3N0Rml4IiwicmVzdWx0SWQiLCJpbmRleCIsImNvbmNhdCIsImdldEFjdGlvbnMiLCJhY3Rpb25zIiwic2V0RmlsdGVyIiwiZmlsdGVyRGF0YSIsInNldE1vZGVsUGFyYW0iLCJnZXRNb2RlbFBhcmFtIiwic29ydGVyRGF0YSIsInBhZ2VOdW1iZXIiLCJwYWdlU2l6ZSIsInBhcmFtTmFtZSIsInBhcmFtVmFsdWUiLCJnZXRBY3Rpb25EYXRhIiwiZ2V0SUQiLCJnZXRVUkwiLCJxdWVlUmVxdWVzdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJvbkxvYWQiLCJub3RSZWNvcmQiLCJNRVRBX0lOVEVSRkFDRSIsIk1FVEFfUFJPWFkiLCJNRVRBX0NIQU5HRSIsIk1FVEFfQ0hBTkdFX05FU1RFRCIsIk1FVEFfU0FMIiwiREVGQVVMVF9BQ1RJT05fUFJFRklYIiwiREVGQVVMVF9QQUdFX05VTUJFUiIsIkRFRkFVTFRfUEFHRV9TSVpFIiwiTUVUQV9SRVRVUk5fVE9fUk9PVCIsImNyZWF0ZVByb3BlcnR5SGFuZGxlcnMiLCJvd25lciIsImNvbnRleHQiLCJyZXNUYXJnZXQiLCJSZWZsZWN0IiwiRXJyb3IiLCJ2YWx1ZVRvUmVmbGVjdCIsIm5vdFByb3BlcnR5IiwiZ2V0Um9vdCIsInBhdGhUbyIsImlzUHJveHkiLCJpc1Byb3BlcnR5IiwiUHJveHkiLCJwcm94eSIsImNyZWF0ZVJlY29yZEhhbmRsZXJzIiwiY3JlYXRlQ29sbGVjdGlvbiIsIm5vdFJlY29yZEludGVyZmFjZSIsImluaXRQcm9wZXJ0aWVzIiwiaW50ZXJmYWNlVXAiLCJjdXJQYXRoIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsIml0ZW1zIiwiY29sbGVjdGlvbiIsImdldEFjdGlvbnNDb3VudCIsImFjdGlvblVwIiwicmVxdWVzdCIsIm9iamVjdFBhcnQiLCJzZXRBdHRyIiwiT1BUX0NPTlRST0xMRVJfUFJFRklYIiwiT1BUX1JFQ09SRF9QUkVGSVgiLCJub3RBcHAiLCJyZXNvdXJjZXMiLCJwcmVJbml0Um91dGVyIiwiaW5pdE1hbmFnZXIiLCJpbml0QVBJIiwiaW5pdFRlbXBsYXRlcyIsInNldE1hbmFnZXIiLCJhcGkiLCJzZXRBUEkiLCJwcm9tIiwiYWRkTGliRnJvbVVSTCIsImluaXRNYW5pZmVzdCIsInNldEludGVyZmFjZU1hbmlmZXN0IiwicmVwb3J0Iiwic2V0Um9vdCIsInJvdXRpZUlucHV0Iiwicm91dGVCbG9jayIsInBhdGhzIiwiY29udHJvbGxlciIsImJpbmRDb250cm9sbGVyIiwiYWRkTGlzdCIsImxpc3RlbiIsIm5hdmlnYXRlIiwidXBkYXRlIiwidXBkYXRlSW50ZXJmYWNlcyIsImluaXRDb250cm9sbGVyIiwiYWxsUmVzb3VyY2VzUmVhZHkiLCJzdGFydEFwcCIsImluaXRSb3V0ZXIiLCJjb250cm9sbGVyTmFtZSIsImFwcCIsImN0cmwiLCJjbGVhckludGVyZmFjZXMiLCJtYW5pZmVzdHMiLCJyZWNvcmRNYW5pZmVzdCIsInJlY29yZERhdGEiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJ0eXBlIiwib25SZXNvdXJjZVJlYWR5IiwiTUVUQV9QUk9DRVNTT1JTIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzIiwic2V0UHJvY2Vzc29yIiwiZ2V0UHJvY2Vzc29yIiwiTUVUQV9DT01QT05FTlRTIiwibm90UmVuZGVyZXIiLCJyZW5kZXIiLCJjb21wb25lbnQiLCJpbml0RGF0YSIsImluaXRPcHRpb25zIiwiaW5pdFdvcmtpbmciLCJ0ZW1wbGF0ZSIsImluaXRUZW1wbGF0ZSIsIm9uQ2hhbmdlIiwiTWF0aCIsInJhbmRvbSIsImdldEJyZWFkQ3J1bXBzIiwiY2xlYXJTdGFzaCIsInNldFdvcmtpbmdNYXBwaW5nIiwiZXhlY1Byb2Nlc3NvcnMiLCJzZWFyY2hGb3JTdWJUZW1wbGF0ZXMiLCJzdGFzaFJlbmRlcmVkIiwiaWZQYXJ0IiwiY29tcG9uZW50UGF0aCIsImNoYW5nZWRQYXRoIiwiaWZGdWxsU3ViUGF0aCIsImNyZWF0ZU1hcHBpbmciLCJmaW5kQWxsUHJvY2Vzc29ycyIsInByb2NzIiwiZWxzIiwiZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgiLCJnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50IiwicHJvY0RhdGEiLCJwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24iLCJwcm9jZXNzb3JFeHByZXNzaW9uIiwiYXR0cmlidXRlRXhwcmVzc2lvbiIsImlmQ29uZGl0aW9uIiwicGFyYW1zIiwicHJvY2Vzc29yTmFtZSIsIm1hcHBpbmciLCJwcm9jU2NvcGUiLCJhdHRyaWJ1dGVSZXN1bHQiLCJnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0IiwicHJvY05hbWUiLCJwcm9jIiwicmVtb3ZlQXR0cmlidXRlIiwiZGVzdHJveVN1YnMiLCJkZXN0cm95IiwiY2xlYXJTdWJUZW1wbGF0ZXMiLCJnZXRTdGFzaCIsInJlbW92ZUNoaWxkIiwibnRFbCIsIm50UmVuZGVyZWQiLCJzdWJzIiwibnQiLCJpZlN1YkVsZW1lbnRSZW5kZXJlZCIsInJlbmRlclN1YiIsImRldGFpbHMiLCJkYXRhUGF0aCIsIm5vdENvbXBvbmVudCIsImNoaWxkTm9kZXMiLCJhZGRUb1N0YXNoIiwic3Rhc2giLCJuZXdTdGFzaCIsImFuY2hvciIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwibm9kZSIsInBsYWNlIiwidGFyZ2V0RWwiLCJsIiwiY2hpbGRyZW4iLCJ0ZXh0Q29udGVudCIsInJlbmRlcmVkIiwicGxhY2VBZnRlciIsInBsYWNlQmVmb3JlIiwicGxhY2VGaXJzdCIsInBsYWNlTGFzdCIsIm5vdFBsYWNlcnMiLCJNRVRBX1BBUlRTIiwicmVzZXRQYXJ0cyIsInByZXBhcmVUZW1wbGF0ZUVsZW1lbnQiLCJpbml0TWFya0VsZW1lbnQiLCJtYXJrRWwiLCJwbGFjZXIiLCJnZXRQbGFjZXIiLCJFeGNlcHRpb24iLCJtYWluIiwidW5zZXRSZWFkeSIsImh0bWwiLCJzZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImFkZEZyb21VUkwiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImNsZWFyUGFydHMiLCJmb3JFYWNoRGF0YSIsInJlbmRlclBhcnQiLCJwbGFjZVJlbmRlcmVkIiwicmVtb3ZlT2Jzb2xldGVQYXJ0cyIsImJlZm9yZSIsInBsYWNlUGFydCIsImFmdGVyIiwicGFydCIsImdldFBhcnRCeURhdGEiLCJub2RlcyIsImxhc3ROb2RlIiwibm9kZVR5cGUiLCJnZXRQYXJ0cyIsInJlbmRlcmVyIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSIsImFkZFBhcnQiLCJ1cGRhdGVQYXJ0IiwicGlwZSIsImZpbmRBY3R1YWxQYXJ0cyIsInJlbW92ZU5vdEFjdHVhbFBhcnRzIiwiYWN0dWFsUGFydHMiLCJpc0RhdGEiLCJPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IiLCJPUFRfREVGQVVMVF9WSUVXU19QT1NURklYIiwiT1BUX0RFRkFVTFRfVklFV19OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMIiwiT1BUX0RFRkFVTFRfUExVUkFMX05BTUUiLCJPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSIsIk9QVF9ERUZBVUxUX01PRFVMRV9OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0FORCIsIm5vdENvbnRyb2xsZXIiLCJpbml0UmVuZGVyIiwiaW50ZXJmYWNlcyIsImdldEludGVyZmFjZXMiLCJtYWtlIiwidmlld05hbWUiLCJ2aWV3IiwiZ2V0VmlldyIsInRhcmdldFF1ZXJ5IiwidGVtcGxhdGVVUkwiLCJwcmVmaXgiLCJjb21tb24iLCJnZXRNb2R1bGVQcmVmaXgiLCJwb3N0Zml4IiwidGVtcGxhdGVOYW1lIiwicmVuZGVyQW5kIiwidmlld3MiLCJnZXRNb2R1bGVOYW1lIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIiwic2NvcGUiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImxpdmVFdmVudHMiLCJvbkV2ZW50IiwiY2hlY2tlZCIsImZpZWxkIiwic2VsZWN0ZWQiLCJzZWxlY3RlZE9wdGlvbnMiLCJwcm9jZXNzZWRWYWx1ZSIsImlzTmFOIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidXNlZCIsIm9wdGlvbiIsInZhbHVlRmllbGROYW1lIiwibGFiZWxGaWVsZE5hbWUiLCJpdGVtVmFsdWVGaWVsZE5hbWUiLCJkZWZhdWx0IiwicGxhY2Vob2xkZXIiLCJhcnJheSIsIm5vdFJvdXRlckluaXRpYWxpemVkIiwiT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgiLCJPUFRfREVGQVVMVF9ST0xFX05BTUUiLCJPUFRfREVGQVVMVF9GT1JNX1RJVExFIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiIsIk9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUIiwibm90Rm9ybSIsIm9uU3VibWl0Iiwib25SZXNldCIsIm9uQ2FuY2VsIiwiZ2V0TWFuaWZlc3QiLCJyb2xlIiwicmVuZGVyV3JhcHBlciIsImZvcm1QYXJ0IiwiZ2V0V3JhcHBlckRhdGEiLCJnZXRQYXJ0VGVtcGxhdGVOYW1lIiwiYmluZEZvcm1FdmVudHMiLCJyZW5kZXJDb21wb25lbnRzIiwid3JhcHBlciIsInRpdGxlIiwiZ2V0Rm9ybUZpZWxkc0xpc3QiLCJhZGRGaWVsZENvbXBvbmVudCIsImNvbXBzIiwiZ2V0QXBwIiwiZGVmIiwiZmllbGRzTGlicyIsImdldEZpZWxkc0xpYnMiLCJmaWVsZFR5cGUiLCJnZXRGaWVsZHNEZWZpbml0aW9uIiwicmVjIiwibGFiZWwiLCJnZXRGb3JtVGFyZ2V0RWxlbWVudCIsImNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMiLCJmb3JtIiwiT1BUX0RFRkFVTFRfUEFHRV9TSVpFIiwiT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIiLCJPUFRfRklFTERfTkFNRV9QUkVfUFJPQyIsIm5vdFRhYmxlIiwicmVzZXRQYWdlciIsInJlbmRlckluc2lkZSIsInJlbmRlckhlYWRlciIsInVwZGF0ZURhdGEiLCJyZW5kZXJCb2R5IiwiYmluZFNlYXJjaCIsImJpbmRDdXN0b21CaW5kaW5ncyIsInRhYmxlSGVhZGVyIiwibmV3VGgiLCJkYXRhRmllbGROYW1lIiwic29ydGluZ0RpcmVjdGlvbiIsInNvcnRhYmxlIiwiYXR0YWNoU29ydGluZ0hhbmRsZXJzIiwiaGVhZENlbGwiLCJjaGFuZ2VTb3J0aW5nT3B0aW9ucyIsImN1cnJlbnRUYXJnZXQiLCJzdHlsZSIsImN1cnNvciIsInNldFNvcnRlciIsImhhc2giLCJpbnZhbGlkYXRlRGF0YSIsImdldEZpbHRlciIsImZpbHRlclNlYXJjaCIsImlmVXBkYXRpbmciLCJxdWVyeSIsImdldFNvcnRlciIsInNldFBhZ2VyIiwiZ2V0UGFnZXIiLCJzZXRVcGRhdGluZyIsIiRsaXN0IiwicHJvY2Nlc3NEYXRhIiwicmVmcmVzaEJvZHkiLCJzZXRVcGRhdGVkIiwidGhhdEZpbHRlciIsInRlc3REYXRhSXRlbSIsInRoYXRTb3J0ZXIiLCJzb3J0IiwiaXRlbTEiLCJpdGVtMiIsInNvcnRCeUZpZWxkIiwibG9jYWxlQ29tcGFyZSIsInNvcnREaXJlY3Rpb24iLCJzZWFyY2hFbCIsInNlbGVjdG9yIiwiZ2V0T3B0aW9uIiwibmV3Um93IiwibmV3VGQiLCJwcmVwcm9jZXNzZWQiLCJpdGVtSWQiLCJ0Ym9keSIsImZpbmRCb2R5IiwiY2xlYXJCb2R5IiwidGhpc1BhZ2VTdGFydHMiLCJuZXh0UGFnZUVuZHMiLCJtaW4iLCJyZW5kZXJSb3ciLCJ0YWJsZUJvZHkiLCJzdHJWYWx1ZSIsImdldEZpbHRlclNlYXJjaCIsImsiLCJ0b0NvbXAiLCJub3RWaWV3Il0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxnQkFBZ0I7VUFDVixpQkFBU0MsR0FBVCxFQUFhO1NBQ2QsS0FBS0MsR0FBTCxDQUFTLE1BQVQsSUFBbUJELEdBQTFCO0VBRmtCO2NBSU4scUJBQVNBLEdBQVQsRUFBYTtTQUNsQixLQUFLQyxHQUFMLENBQVMsVUFBVCxJQUF1QkQsR0FBOUI7RUFMa0I7Z0JBT0osdUJBQVNFLFNBQVQsRUFBb0JDLE1BQXBCLEVBQTRCO09BQ3RDLElBQUlDLENBQVIsSUFBYUYsU0FBYixFQUF3QjtRQUNuQixJQUFJRyxDQUFSLElBQWFGLE1BQWIsRUFBcUI7UUFDakJELFVBQVVFLENBQVYsRUFBYUUsY0FBYixDQUE0QkgsT0FBT0UsQ0FBUCxDQUE1QixDQUFILEVBQTJDO1NBQ3RDRSxRQUFRLElBQUlDLEtBQUosRUFBWjtXQUNNQyxZQUFOLENBQW1CLGFBQW5CLEVBQWtDLFdBQWxDO1dBQ01DLEdBQU4sR0FBWVIsVUFBVUUsQ0FBVixFQUFhRCxPQUFPRSxDQUFQLENBQWIsRUFBd0JNLE9BQXhCLENBQWdD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
