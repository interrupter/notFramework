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
			xhr.send(JSON.stringify(data));
		});
	},
	getJSON: function getJSON(url, data) {
		var _this2 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', _this2.getSessionID());
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
			xhr.send(JSON.stringify(data));
		});
	},
	postJSON: function postJSON(url, data) {
		var _this3 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('POST', url);
			xhr.setRequestHeader('SessionID', _this3.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
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
			xhr.send(JSON.stringify(data));
		});
	},
	putJSON: function putJSON(url, data) {
		var _this4 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('PUT', url);
			xhr.setRequestHeader('SessionID', _this4.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
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
			xhr.send(JSON.stringify(data));
		});
	},
	deleteJSON: function deleteJSON(url, data) {
		var _this5 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('DELETE', url);
			xhr.setRequestHeader('SessionID', _this5.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
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
			xhr.send(JSON.stringify(data));
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
			xhr.send(JSON.stringify(data));
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
		this.get('app');
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
				notCommon.log('define', DEFAULT_ACTION_PREFIX + index);
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
		key: 'initRouter',
		value: function initRouter() {
			this.setWorking('router', notRouter$1);
			this.getWorking('router').setRoot(this.getOptions('router.root'));
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
				l++;
			} else {
				targetEl.removeChild(targetEl.children[l]);
			}
		}
	},
	beforeEach: function beforeEach() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
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
			targetEl.parentNode.insertBefore(rendered[i], targetEl.nextSibling);
		}
	},
	after: function after() /*targetEl, rendered*/{}
};

var placeFirst = {
	before: function before() /*targetEl, rendered*/{},
	main: function main() /*targetEl, rendered*/{},
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
	afterEach: function afterEach(targetEl /*, rendered*/) {
		if (targetEl.nodeName !== 'NT') {
			targetEl.parentNode.removeChild(targetEl);
		}
	},
	after: function after() /*targetEl, rendered*/{}
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
			var placer = this.getPlacer(this.getOptions('renderAnd'));
			placer.main(this.getOptions('targetEl'), [markEl]);
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
			pluralName: OPT_DEFAULT_PLURAL_NAME,
			singleName: OPT_DEFAULT_SINGLE_NAME
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
				    val = notPath$1.get(field.path, item, _this5.getOptions('helpers'));
				if (field.hasOwnProperty('editable')) {
					newTd.setAttribute('contentEditable', true);
					newTd.dataset.path = field.path;
					newTd.dataset.itemId = item[_this5.getOptions('itemIdField')];
					newTd.dataset.value = val;
					newTd.addEventListener('blur', function (e) {
						notPath$1.set(field.path, item, _this5.getOptions('helpers'), newTd.textContent);
						_this5.updateData();
					});
				}
				if (field.hasOwnProperty('proccessor')) {
					newTd.innerHTML = field.proccessor(val, item, index);
				} else {
					newTd.innerHTML = val;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdEZvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFZpZXcuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdob3N0JykgKyB1cmk7XG5cdH0sXG5cdGFkZFByb3RvY29sOiBmdW5jdGlvbih1cmkpe1xuXHRcdHJldHVybiB0aGlzLmdldCgncHJvdG9jb2wnKSArIHVyaTtcblx0fSxcblx0cHJlbG9hZEltYWdlczogZnVuY3Rpb24oZGF0YUFycmF5LCBmaWVsZHMpIHtcblx0XHRmb3IodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IodmFyIGYgaW4gZmllbGRzKSB7XG5cdFx0XHRcdGlmKGRhdGFBcnJheVtpXS5oYXNPd25Qcm9wZXJ0eShmaWVsZHNbZl0pKSB7XG5cdFx0XHRcdFx0dmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG5cdFx0XHRcdFx0aW1hZ2Uuc2V0QXR0cmlidXRlKCdjcm9zc09yaWdpbicsICdhbm9ueW1vdXMnKTtcblx0XHRcdFx0XHRpbWFnZS5zcmMgPSBkYXRhQXJyYXlbaV1bZmllbGRzW2ZdXS5pbmRleE9mKCcvLycpID09PSAwID8gdGhpcy5hZGRQcm90b2NvbChkYXRhQXJyYXlbaV1bZmllbGRzW2ZdXSkgOiBkYXRhQXJyYXlbaV1bZmllbGRzW2ZdXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0cmVxdWVzdEpTT046IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBkYXRhKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0pO1xuXHR9LFxuXHRwb3N0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUE9TVCcsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdHB1dEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ1BVVCcsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdGRlbGV0ZUpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ0RFTEVURScsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldEhUTUw6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAndGV4dCc7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSAoKT0+e1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHBhcnNlSW50KHN0YXR1cykgPT09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9IChlKSA9PiByZWplY3QoZSk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0U2Vzc2lvbklEOiBmdW5jdGlvbihuYW1lID0gJ1Nlc3Npb25JRCcpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb29raWUobmFtZSk7XG5cdH0sXG5cdGdldENvb2tpZToobmFtZSkgPT4ge1xuICBcdFx0bGV0IHZhbHVlID0gXCI7IFwiICsgZG9jdW1lbnQuY29va2llLFxuICBcdFx0XHRwYXJ0cyA9IHZhbHVlLnNwbGl0KFwiOyBcIiArIG5hbWUgKyBcIj1cIik7XG4gIFx0XHRpZiAocGFydHMubGVuZ3RoID09IDIpIHtcblx0XHRcdHJldHVybiBwYXJ0cy5wb3AoKS5zcGxpdChcIjtcIikuc2hpZnQoKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXHR9XG59O1xuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTmV0d29yaztcbiIsInZhciBDb21tb25Mb2dzID0ge1xuXHRkZWJ1ZzogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fSxcblx0bG9nOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZyguLi5hcmd1bWVudHMpO1xuXHR9LFxuXHRlcnJvcjogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5lcnJvciguLi5hcmd1bWVudHMpO1xuXHR9LFxuXHRyZXBvcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0fSxcblx0dHJhY2U6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUudHJhY2UoLi4uYXJndW1lbnRzKTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkxvZ3M7XG4iLCJjb25zdCBNQU5BR0VSID0gU3ltYm9sKCdNQU5BR0VSJyk7XG5cbnZhciBDb21tb25TaG9ydHMgPSB7XG5cdGdldEFQSTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TWFuYWdlcigpLmdldEFQSSgpO1xuXHR9LFxuXHRzZXRNYW5hZ2VyOiBmdW5jdGlvbih2KSB7XG5cdFx0dGhpc1tNQU5BR0VSXSA9IHY7XG5cdH0sXG5cdGdldE1hbmFnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzW01BTkFHRVJdO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU2hvcnRzO1xuIiwiLyogZ2xvYmFsIGpRdWVyeSAqL1xudmFyIENvbW1vbk9iamVjdHMgPSB7XG5cdGV4dGVuZDogZnVuY3Rpb24oZGVmYXVsdHMsIG9wdGlvbnMpIHtcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcblx0XHR2YXIgcHJvcDtcblx0XHRmb3IgKHByb3AgaW4gZGVmYXVsdHMpIHtcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGVmYXVsdHMsIHByb3ApKSB7XG5cdFx0XHRcdGV4dGVuZGVkW3Byb3BdID0gZGVmYXVsdHNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsIHByb3ApKSB7XG5cdFx0XHRcdGV4dGVuZGVkW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGV4dGVuZGVkO1xuXHR9LFxuXHRjb21wbGV0ZUFzc2lnbjogZnVuY3Rpb24odGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG5cdFx0c291cmNlcy5mb3JFYWNoKHNvdXJjZSA9PiB7XG5cdFx0XHRsZXQgZGVzY3JpcHRvcnMgPSBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZSgoZGVzY3JpcHRvcnMsIGtleSkgPT4ge1xuXHRcdFx0XHRkZXNjcmlwdG9yc1trZXldID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSk7XG5cdFx0XHRcdHJldHVybiBkZXNjcmlwdG9ycztcblx0XHRcdH0sIHt9KTtcblx0XHRcdC8vIGJ5IGRlZmF1bHQsIE9iamVjdC5hc3NpZ24gY29waWVzIGVudW1lcmFibGUgU3ltYm9scyB0b29cblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5mb3JFYWNoKHN5bSA9PiB7XG5cdFx0XHRcdGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSk7XG5cdFx0XHRcdGlmIChkZXNjcmlwdG9yLmVudW1lcmFibGUpIHtcblx0XHRcdFx0XHRkZXNjcmlwdG9yc1tzeW1dID0gZGVzY3JpcHRvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIGRlc2NyaXB0b3JzKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9LFxuXHRleHRlbmRXaXRoOiBmdW5jdGlvbihvcHRpb25zKXtcblx0XHRmb3IgKGxldCBwcm9wIGluIG9wdGlvbnMpIHtcblx0XHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KHByb3ApKSB7XG5cdFx0XHRcdHRoaXNbcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRjb250YWluc09iajogZnVuY3Rpb24oYmlnLCBzbWFsbCkge1xuXHRcdGZvciAodmFyIHQgaW4gc21hbGwpIHtcblx0XHRcdGlmIChzbWFsbC5oYXNPd25Qcm9wZXJ0eSh0KSkge1xuXHRcdFx0XHRpZiAoKCFiaWcuaGFzT3duUHJvcGVydHkodCkpIHx8IChiaWdbdF0gIT09IHNtYWxsW3RdKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmlsdGVyOiBmdW5jdGlvbihvYmosIGZpbHRlcikge1xuXHRcdGlmIChmaWx0ZXIgJiYgb2JqKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jb250YWluc09iaihvYmosIGZpbHRlcik7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRmaW5kSWNvbkJ5RmlsdGVyOiBmdW5jdGlvbihpY29ucywgZmlsdGVyKSB7XG5cdFx0dmFyIGJhdGNoID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpY29ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuZmlsdGVyKGljb25zW2ldLmdldERhdGEoKSwgZmlsdGVyKSkge1xuXHRcdFx0XHRiYXRjaC5wdXNoKGljb25zW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGJhdGNoO1xuXHR9LFxuXHRlcXVhbE9iajogZnVuY3Rpb24oYSwgYikge1xuXHRcdHZhciBwO1xuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChwIGluIGEpIHtcblx0XHRcdGlmIChhW3BdKSB7XG5cdFx0XHRcdHN3aXRjaCAodHlwZW9mKGFbcF0pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoIXRoaXMuZXF1YWwoYVtwXSwgYltwXSkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoYVtwXSAhPSBiW3BdKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChiW3BdKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKHAgaW4gYikge1xuXHRcdFx0aWYgKHR5cGVvZihhW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRkZWZpbmVJZk5vdEV4aXN0czogZnVuY3Rpb24ob2JqLCBrZXksIGRlZmF1bHRWYWx1ZSkge1xuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdG9ialtrZXldID0gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fSxcblx0ZGVlcE1lcmdlOiBmdW5jdGlvbihvYmoxLCBvYmoyKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIG9iajEsIG9iajIpO1xuXHR9LFxuXG5cdHJlZ2lzdHJ5OiB7fSxcblx0XG5cdHJlZ2lzdGVyOiBmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdHRoaXMucmVnaXN0cnlba2V5XSA9IHZhbDtcblx0fSxcblxuXHRnZXQ6IGZ1bmN0aW9uKGtleSkge1xuXHRcdHJldHVybiB0aGlzLnJlZ2lzdHJ5Lmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzLnJlZ2lzdHJ5W2tleV0gOiBudWxsO1xuXHR9LFxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25PYmplY3RzO1xuIiwidmFyIENvbW1vblN0cmluZ3MgPSB7XG5cdGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxuXHRsb3dlckZpcnN0TGV0dGVyKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25TdHJpbmdzO1xuIiwidmFyIENvbW1vbkZ1bmN0aW9ucyA9IHtcblx0cGlwZTogZnVuY3Rpb24oZGF0YS8qIGZlZWQgZGF0YSAqLywgZnVuY3MvKiBmdW5jdGlvbnMgYXJyYXkgKi8pIHtcblx0XHRsZXQgcmVzdWx0O1xuXHRcdGZvcihsZXQgZnVuYyBvZiBmdW5jcyl7XG5cdFx0XHRyZXN1bHQgPSBmdW5jKHJlc3VsdCB8fCBkYXRhKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkZ1bmN0aW9ucztcbiIsInZhciBDb21tb25ET00gPSB7XG5cdGdldEF0dHJpYnV0ZXNTdGFydHNXaXRoOiBmdW5jdGlvbihlbCwgc3RhcnRzV2l0aCkge1xuXHRcdHZhciBhbGxFbGVtZW50cyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJyonKTtcblx0XHR2YXIgbGlzdCA9IFtdO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgYWxsRWxlbWVudHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBhdHRzID0gYWxsRWxlbWVudHNbal0uYXR0cmlidXRlcywgbiA9IGF0dHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRzW2ldLm5vZGVOYW1lLmluZGV4T2Yoc3RhcnRzV2l0aCkgPT09IDApIHtcblx0XHRcdFx0XHRsaXN0LnB1c2goYWxsRWxlbWVudHNbal0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25ET007XG4iLCJ2YXIgQ29tbW9uQXBwID0ge1xuXHRzdGFydEFwcDogKHN0YXJ0ZXIpPT57XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHN0YXJ0ZXIpO1xuXHR9LFxuXHRnZXRBcHA6IGZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5nZXQoJ2FwcCcpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25BcHA7XG4iLCJpbXBvcnQgQ29tbW9uTmV0d29yayBmcm9tICcuL25ldC5qcyc7XG5pbXBvcnQgQ29tbW9uTG9ncyBmcm9tICcuL2xvZ3MuanMnO1xuaW1wb3J0IENvbW1vblNob3J0cyBmcm9tICcuL3Nob3J0cy5qcyc7XG5pbXBvcnQgQ29tbW9uT2JqZWN0cyBmcm9tICcuL29iamVjdHMuanMnO1xuaW1wb3J0IENvbW1vblN0cmluZ3MgZnJvbSAnLi9zdHJpbmdzLmpzJztcbmltcG9ydCBDb21tb25GdW5jdGlvbnMgZnJvbSAnLi9mdW5jdGlvbnMuanMnO1xuaW1wb3J0IENvbW1vbkRPTSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgQ29tbW9uQXBwIGZyb20gJy4vYXBwLmpzJztcblxuLypcblx00YHQv9C40YHQvtC6INGC0L7Qs9C+INGH0YLQviDQvdGD0LbQvdC+INC/0L7QtNC60LvRjtGH0LjRgtGMINC60LDQuiDQvtCx0YnQuNC1XG4qL1xudmFyIG5vdENvbW1vbiA9IE9iamVjdC5hc3NpZ24oe30sIENvbW1vbk9iamVjdHMpO1xuXG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25OZXR3b3JrKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblN0cmluZ3MpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uTG9ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25TaG9ydHMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRnVuY3Rpb25zKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkRPTSk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25BcHApO1xuXG5leHBvcnQgZGVmYXVsdCBub3RDb21tb247XG4iLCIvKlxuXHQ6cHJvcGVydHkuc3ViMS5mdW5jKCkuZnVuY1Byb3Bcblx0ID0gcmV0dXJuIGZ1bmNQcm9wIG9mIGZ1bmN0aW9uIHJlc3VsdCBvZiBzdWIxIHByb3BlcnR5IG9mIHByb3BlcnR5IG9mIG9iamVjdFxuXHQ6ezo6aGVscGVyVmFsfS5zdWJcblx0ID0gcmV0dXJuIHN1YiBwcm9wZXJ0eSBvZiBvYmplY3QgcHJvcGVydHkgd2l0aCBuYW1lIHJldHJpZXZlZCBmcm9tIGhlbHBlclZhbCBwcm9wZXJ0eSBvZiBoZWxwZXJzIG9iamVjdFxuXHQ6ezo6aGVscGVyRnVuYygpfS5zdWJcblx0PSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIGZ1bmN0aW9uIHJlc3VsdCBvZiBoZWxwZXJzIG9iamVjdC5cblx0aWYgaGVscGVyc0Z1bnggcmV0dXJuICdjYXInIHRoZW4gc291cmNlIHBhdGggYmVjb21lcyA6Y2FyLnN1YlxuXG4qL1xuXG5jb25zdCBTVUJfUEFUSF9TVEFSVCA9ICd7Jyxcblx0U1VCX1BBVEhfRU5EID0gJ30nLFxuXHRQQVRIX1NQTElUID0gJy4nLFxuXHRQQVRIX1NUQVJUX09CSkVDVCA9ICc6Jyxcblx0UEFUSF9TVEFSVF9IRUxQRVJTID0gJzo6Jyxcblx0RlVOQ1RJT05fTUFSS0VSID0gJygpJyxcblx0TUFYX0RFRVAgPSAxMDtcblxuY2xhc3Mgbm90UGF0aHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQvKlxuXHRcdGlucHV0ICc6ezo6aGVscGVyVmFsfS5zdWInXG5cdFx0cmV0dXJuIDo6aGVscGVyVmFsXG5cdCovXG5cdGZpbmROZXh0U3ViUGF0aChwYXRoLyogc3RyaW5nICovKXtcblx0XHRsZXQgc3ViUGF0aCA9ICcnLFxuXHRcdFx0ZmluZCA9IGZhbHNlO1xuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdGlmIChwYXRoW2ldID09PSBTVUJfUEFUSF9TVEFSVCl7XG5cdFx0XHRcdGZpbmQgPSB0cnVlO1xuXHRcdFx0XHRzdWJQYXRoID0gJyc7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0aWYocGF0aFtpXSA9PT0gU1VCX1BBVEhfRU5EICYmIGZpbmQpe1xuXHRcdFx0XHRcdGlmIChmaW5kKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3ViUGF0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHN1YlBhdGgrPXBhdGhbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZpbmQ/c3ViUGF0aDpudWxsO1xuXHR9XG5cblx0cmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViLCBwYXJzZWQpe1xuXHRcdGxldCBzdWJmID0gU1VCX1BBVEhfU1RBUlQrc3ViK1NVQl9QQVRIX0VORDtcblx0XHR3aGlsZShwYXRoLmluZGV4T2Yoc3ViZikgPiAtMSl7XG5cdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKHN1YmYsIHBhcnNlZCk7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0cGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGxldCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkLCBpID0gMDtcblx0XHR3aGlsZShzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCkpe1xuXHRcdFx0c3ViUGF0aFBhcnNlZCA9IHRoaXMuZ2V0VmFsdWVCeVBhdGgoIHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgc3ViUGF0aCk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGkrKztcblx0XHRcdGlmIChpID4gTUFYX0RFRVApe1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRnZXQocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0c3dpdGNoIChwYXRoKXtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9PQkpFQ1Q6IHJldHVybiBpdGVtO1xuXHRcdFx0Y2FzZSBQQVRIX1NUQVJUX0hFTFBFUlM6IHJldHVybiBoZWxwZXJzO1xuXHRcdH1cblx0XHRwYXRoID0gdGhpcy5wYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0VmFsdWVCeVBhdGgocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUyk+LTE/aGVscGVyczppdGVtLCBwYXRoKTtcblx0fVxuXG5cdHNldChwYXRoLCBpdGVtLCBoZWxwZXJzLCBhdHRyVmFsdWUpe1xuXHRcdGxldCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkLCBpID0gMDtcblx0XHR3aGlsZShzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCkpe1xuXHRcdFx0c3ViUGF0aFBhcnNlZCA9IHRoaXMuZ2V0VmFsdWVCeVBhdGgoIHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgc3ViUGF0aCk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGlmIChpID4gTUFYX0RFRVApe1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdGlmIChpdGVtLmlzUmVjb3JkICYmIHRoaXMubm9ybWlsaXplUGF0aChwYXRoKS5sZW5ndGggPiAxKSB7XG5cdFx0XHRpdGVtLnRyaWdnZXIoJ2NoYW5nZScsIGl0ZW0sIHBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fVxuXHR9XG5cblx0dW5zZXQocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0dGhpcy5zZXQocGF0aCwgaXRlbSwgaGVscGVycywgbnVsbCk7XG5cdH1cblxuXHRwYXJzZVBhdGhTdGVwKHN0ZXAsIGl0ZW0sIGhlbHBlcil7XG5cdFx0bGV0IHJTdGVwID0gbnVsbDtcblx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKSA9PT0gMCAmJiBoZWxwZXIpe1xuXHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9IRUxQRVJTLCAnJyk7XG5cdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdGlmKGhlbHBlci5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPT09IDAgJiYgaXRlbSl7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCAnJyk7XG5cdFx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRcdGlmKGl0ZW0uaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBzdGVwO1xuXHR9XG5cblx0Ly86OmZpZWxkTmFtZS5yZXN1bHRcblx0Ly97fVxuXHQvL3tmaWVsZE5hbWU6ICd0YXJnZXRSZWNvcmRGaWVsZCd9XG5cdC8vLy9bJ3RhcmdldFJlY29yZEZpZWxkJywgJ3Jlc3VsdCddXG5cdHBhcnNlUGF0aChwYXRoLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRwYXRoID0gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0cGF0aFtpXSA9IHRoaXMucGFyc2VQYXRoU3RlcChwYXRoW2ldLCBpdGVtLCBoZWxwZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdG5vcm1pbGl6ZVBhdGgocGF0aCl7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cmV0dXJuIHBhdGg7XG5cdFx0fWVsc2V7XG5cdFx0XHR3aGlsZShwYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID4gLTEpe1xuXHRcdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCcnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0c21hbGwgPSBbXCJ0b2RvXCJdLFxuXHRcdGJpZyA9IFtcInRvZG9cIiwgXCJsZW5ndGhcIl1cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHQqL1xuXG5cdGlmRnVsbFN1YlBhdGgoYmlnLCBzbWFsbCl7XG5cdFx0aWYgKGJpZy5sZW5ndGg8c21hbGwubGVuZ3RoKXtyZXR1cm4gZmFsc2U7fVxuXHRcdGZvcihsZXQgdCA9MDsgdCA8IHNtYWxsLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHNtYWxsW3RdICE9PSBiaWdbdF0pe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCksXG5cdFx0XHRpc0Z1bmN0aW9uID0gYXR0ck5hbWUuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpPi0xO1xuXHRcdGlmIChpc0Z1bmN0aW9uKXtcblx0XHRcdGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHR9XG5cdFx0aWYgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgdHlwZW9mIG9iamVjdFthdHRyTmFtZV0gIT09ICd1bmRlZmluZWQnICYmIG9iamVjdFthdHRyTmFtZV0gIT09IG51bGwpe1xuXHRcdFx0bGV0IG5ld09iaiA9IGlzRnVuY3Rpb24/b2JqZWN0W2F0dHJOYW1lXSgpOm9iamVjdFthdHRyTmFtZV07XG5cdFx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKG5ld09iaiwgYXR0clBhdGgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBuZXdPYmo7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdHNldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGF0dHJWYWx1ZSl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCk7XG5cdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0aWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKXtvYmplY3RbYXR0ck5hbWVdID0ge307fVxuXHRcdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChvYmplY3RbYXR0ck5hbWVdLCBhdHRyUGF0aCwgYXR0clZhbHVlKTtcblx0XHR9ZWxzZXtcblx0XHRcdG9iamVjdFthdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0am9pbigpe1xuXHRcdGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gYXJncy5qb2luKFBBVEhfU1BMSVQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RQYXRoKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE1FVEFfTUVUSE9EX0lOSVQgPSBTeW1ib2woJ2luaXQnKSxcblx0TUVUQV9FVkVOVFMgPSBTeW1ib2woJ2V2ZW50cycpLFxuXHRNRVRBX0RBVEEgPSBTeW1ib2woJ2RhdGEnKSxcblx0TUVUQV9XT1JLSU5HID0gU3ltYm9sKCd3b3JraW5nJyksXG5cdE1FVEFfT1BUSU9OUyA9IFN5bWJvbCgnb3B0aW9ucycpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHR0aGlzW01FVEFfRVZFTlRTXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9EQVRBXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9NRVRIT0RfSU5JVF0oaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0W01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KXtcblx0XHRpZiAoIWlucHV0KXtcblx0XHRcdGlucHV0ID0ge307XG5cdFx0fVxuXHRcdGlmKGlucHV0Lmhhc093blByb3BlcnR5KCdldmVudHMnKSl7XG5cdFx0XHRmb3IobGV0IHQgb2YgaW5wdXQuZXZlbnRzKXtcblx0XHRcdFx0dGhpcy5vbiguLi50KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKXtcblx0XHRcdHRoaXMuc2V0RGF0YShpbnB1dC5kYXRhKTtcblx0XHR9XG5cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnd29ya2luZycpKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhpbnB1dC53b3JraW5nKTtcblx0XHR9XG5cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9ucycpKXtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucyhpbnB1dC5vcHRpb25zKTtcblx0XHR9XG5cdH1cblxuXHRzZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uICovXG5cdFx0XHRcdHdoYXQgPSBhcmdzWzBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uIGVsZW1lbnQgKi9cblx0XHRcdFx0bm90UGF0aC5zZXQoYXJnc1swXSAvKiBwYXRoICovICwgd2hhdCAvKiBjb2xsZWN0aW9uICovICwgdW5kZWZpbmVkIC8qIGhlbHBlcnMgKi8gLCBhcmdzWzFdIC8qIHZhbHVlICovICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRnZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCAqL1xuXHRcdGNhc2UgMTpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0fVxuXHRcdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggd2l0aCBkZWZhdWx0IHZhbHVlICovXG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHRcdGlmIChyZXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdC8qIG5vIGRhdGEsIHJldHVybiBkZWZhdWx0IHZhbHVlICovXG5cdFx0XHRcdFx0cmV0dXJuIGFyZ3NbMV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LyogZGF0YSwgcmV0dXJuIGl0ICovXG5cdFx0XHRcdFx0cmV0dXJuIHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0LyogcmV0dXJuIGZ1bGwgY29sbGVjdGlvbiAqL1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB3aGF0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0Q09SRSBPQkpFQ1Rcblx0XHRcdERBVEEgLSBpbmZvcm1hdGlvblxuXHRcdFx0T1BUSU9OUyAtIGhvdyB0byB3b3JrXG5cdFx0XHRXT1JLSU5HIC0gdGVtcG9yYXJpbHkgZ2VuZXJhdGVkIGluIHByb2NjZXNzXG5cdCovXG5cblx0c2V0RGF0YSgpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX0RBVEFdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldERhdGEoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0fVxuXG5cdGdldERhdGEoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9EQVRBXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldE9wdGlvbnMoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRPcHRpb25zKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX09QVElPTlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0V29ya2luZygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX1dPUktJTkddID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldFdvcmtpbmcoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXb3JraW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfV09SS0lOR10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKlxuXHRcdEVWRU5UUyBoYW5kbGluZ1xuXHQqL1xuXG5cdG9uKGV2ZW50TmFtZXMsIGV2ZW50Q2FsbGJhY2tzLCBvbmNlKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdG5vdENvbW1vbi5kZWZpbmVJZk5vdEV4aXN0cyh0aGlzW01FVEFfRVZFTlRTXSwgbmFtZSwgW10pO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0ucHVzaCh7XG5cdFx0XHRcdGNhbGxiYWNrczogZXZlbnRDYWxsYmFja3MsXG5cdFx0XHRcdG9uY2U6IG9uY2UsXG5cdFx0XHRcdGNvdW50OiAwXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHRyaWdnZXIoKSB7XG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyksXG5cdFx0XHRldmVudE5hbWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZSkpIHtcblx0XHRcdGV2ZW50TmFtZSA9IFtldmVudE5hbWVdO1xuXHRcdH1cblx0XHRldmVudE5hbWUuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5mb3JFYWNoKGV2ZW50ID0+IHtcblx0XHRcdFx0XHRpZiAoZXZlbnQub25jZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnQuY2FsbGJhY2tzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG9mZihldmVudE5hbWVzIC8qIGFycmF5IG9mIGV2ZW50IG5hbWVzICovICwgZXZlbnRDYWxsYmFja3MgLyogYXJyYXkgb2YgY2FsbGJhY2tzICovICkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGxldCB0YXJnZXRJZCA9IC0xO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaCgoZXZlbnQsIGkpID0+IHtcblx0XHRcdFx0aWYgKGkgPT09IC0xICYmIGV2ZW50Q2FsbGJhY2tzID09PSBldmVudC5jYWxsYmFja3MpIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9IGk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRhcmdldElkID4gLTEpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uc3BsaWNlKHRhcmdldElkLCAxKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmNvbnN0IE9QVF9NT0RFX0hJU1RPUlkgPSBTeW1ib2woJ2hpc3RvcnknKSxcblx0T1BUX01PREVfSEFTSCA9IFN5bWJvbCgnaGFzaCcpLFxuXHRPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCA9IDUwO1xuXG5jbGFzcyBub3RSb3V0ZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLycsIC8vYWx3YXlzIGluIHNsYXNoZXMgL3VzZXIvLCAvLCAvaW5wdXQvLiBhbmQgbm8gL3VzZXIgb3IgaW5wdXQvbGV2ZWxcblx0XHRcdGluaXRpYWxpemVkOiBmYWxzZVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlzdG9yeSgpe1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZScsIE9QVF9NT0RFX0hJU1RPUlkpO1xuXHR9XG5cblx0aGFzaCgpe1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZScsIE9QVF9NT0RFX0hBU0gpO1xuXHR9XG5cblx0c2V0Um9vdChyb290KXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3Jvb3QnLCByb290ID8gJy8nICsgdGhpcy5jbGVhclNsYXNoZXMocm9vdCkgKyAnLycgOiAnLycpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y2xlYXJTbGFzaGVzKHBhdGgpIHtcblx0XHQvL2ZpcnN0IGFuZCBsYXN0IHNsYXNoZXMgcmVtb3ZhbFxuXHRcdHJldHVybiBwYXRoLnRvU3RyaW5nKCkucmVwbGFjZSgvXFwvJC8sICcnKS5yZXBsYWNlKC9eXFwvLywgJycpO1xuXHR9XG5cblx0YWRkKHJlLCBoYW5kbGVyKSB7XG5cdFx0aWYgKHR5cGVvZiByZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRoYW5kbGVyID0gcmU7XG5cdFx0XHRyZSA9ICcnO1xuXHRcdH1cblx0XHRsZXQgcnVsZSA9IHtcblx0XHRcdHJlOiByZSxcblx0XHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0XHR9O1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykucHVzaChydWxlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZExpc3QobGlzdCkge1xuXHRcdGZvciAobGV0IHQgaW4gbGlzdCkge1xuXHRcdFx0dGhpcy5hZGQodCwgbGlzdFt0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVtb3ZlKHBhcmFtKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIHI7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aCwgciA9IHRoaXMuZ2V0V29ya2luZygncm91dGVzJylbaV07IGkrKykge1xuXHRcdFx0aWYgKHIuaGFuZGxlciA9PT0gcGFyYW0gfHwgci5yZSA9PT0gcGFyYW0pIHtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGZsdXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyb3V0ZXM6IFtdLFxuXHRcdFx0bW9kZTogT1BUX01PREVfSElTVE9SWSxcblx0XHRcdHJvb3Q6ICcvJ1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aXNJbml0aWFsaXplZCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2luaXRpYWxpemVkJyk7XG5cdH1cblxuXHRzZXRJbml0aWFsaXplZCh2YWwgPSB0cnVlKXtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdpbml0aWFsaXplZCcsIHZhbCk7XG5cdH1cblxuXHRnZXRGcmFnbWVudCgpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSAnJztcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdtb2RlJykgPT09IE9QVF9NT0RFX0hJU1RPUlkpIHtcblx0XHRcdGlmICghbG9jYXRpb24pIHJldHVybiAnJztcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoKSk7XG5cdFx0XHRmcmFnbWVudCA9IGZyYWdtZW50LnJlcGxhY2UoL1xcPyguKikkLywgJycpO1xuXHRcdFx0ZnJhZ21lbnQgPSB0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSAhPSAnLycgPyBmcmFnbWVudC5yZXBsYWNlKHRoaXMuZ2V0V29ya2luZygncm9vdCcpLCAnJykgOiBmcmFnbWVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCF3aW5kb3cpIHJldHVybiAnJztcblx0XHRcdHZhciBtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdGZyYWdtZW50ID0gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jbGVhclNsYXNoZXMoZnJhZ21lbnQpO1xuXHR9XG5cblx0Y2hlY2tMb2NhdGlvbigpe1xuXHRcdGxldCBjdXJyZW50ID10aGlzLmdldFdvcmtpbmcoJ2N1cnJlbnQnKSxcblx0XHRcdGZyYWdtZW50ID10aGlzLmdldEZyYWdtZW50KCksXG5cdFx0XHRpbml0ID0gdGhpcy5pc0luaXRpYWxpemVkKCk7XG5cdFx0aWYgKGN1cnJlbnQgIT09ZnJhZ21lbnQgIHx8ICFpbml0KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLGZyYWdtZW50KTtcblx0XHRcdHRoaXMuY2hlY2soZnJhZ21lbnQpO1xuXHRcdFx0dGhpcy5zZXRJbml0aWFsaXplZCgpO1xuXHRcdH1cblx0fVxuXG5cdGhyZWZDbGljaygpe1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRsaXN0ZW4obG9vcEludGVydmFsID0gT1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLCB0aGlzLmdldEZyYWdtZW50KCkpO1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5nZXRXb3JraW5nKCdpbnRlcnZhbCcpKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ludGVydmFsJywgc2V0SW50ZXJ2YWwodGhpcy5jaGVja0xvY2F0aW9uLmJpbmQodGhpcyksIGxvb3BJbnRlcnZhbCkpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuaHJlZkNsaWNrLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y2hlY2soZikge1xuXHRcdHZhciBmcmFnbWVudCA9IGYgfHwgdGhpcy5nZXRGcmFnbWVudCgpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IHBhdGggPSB0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSArIHRoaXMuZ2V0V29ya2luZygncm91dGVzJylbaV0ucmU7XG5cdFx0XHRsZXQgZnVsbFJFID0gIHRoaXMuY2xlYXJTbGFzaGVzKGRlY29kZVVSSShwYXRoKSk7XG5cdFx0XHR2YXIgbWF0Y2ggPSBmcmFnbWVudC5tYXRjaChmdWxsUkUpO1x0XHRcdFxuXHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJylbaV0uaGFuZGxlci5hcHBseSh0aGlzLmhvc3QgfHwge30sIG1hdGNoKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bmF2aWdhdGUocGF0aCkge1xuXHRcdHBhdGggPSBwYXRoID8gcGF0aCA6ICcnO1xuXHRcdHN3aXRjaCAodGhpcy5nZXRXb3JraW5nKCdtb2RlJykpe1xuXHRcdFx0Y2FzZSBPUFRfTU9ERV9ISVNUT1JZOiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdwdXNoIHN0YXRlJywgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0aGlzLmdldEZ1bGxSb3V0ZShwYXRoKSk7XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHRcdGNhc2UgT1BUX01PREVfSEFTSDoge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyguKikkLywgJycpICsgJyMnICsgcGF0aDtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEZ1bGxSb3V0ZShwYXRoID0gJycpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSArIHRoaXMuY2xlYXJTbGFzaGVzKHBhdGgpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RSb3V0ZXIoKTtcbiIsImxldCBub3RBUElPcHRpb25zID0ge1xuXHRycHM6IDUwLFxuXHRwcm90b2NvbDogJ2h0dHAnLFxuXHRob3N0OiAnbG9jYWxob3N0Jyxcblx0cG9ydDogOTAwMFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJT3B0aW9ucztcbiIsImNsYXNzIG5vdEFQSVF1ZWV7XG5cdGNvbnN0cnVjdG9yIChyZXF1ZXN0c1BlclNlY29uZCkge1xuXHRcdHRoaXMucXVlZSA9IFtdO1xuXHRcdHRoaXMuaW50ID0gbnVsbDtcblx0XHR0aGlzLnJlcXVlc3RzUGVyU2Vjb25kID0gcmVxdWVzdHNQZXJTZWNvbmQgfHwgNTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bigpe1xuXHRcdHRoaXMuaW50ID0gd2luZG93LnNldEludGVydmFsKHRoaXMuY2hlY2suYmluZCh0aGlzKSwgMTAwMCAvIHRoaXMucmVxdWVzdHNQZXJTZWNvbmQpO1xuXHR9XG5cblx0Y2hlY2soKXtcblx0XHRpZiAodGhpcy5pblByb2dyZXNzKXtyZXR1cm47fVxuXHRcdGVsc2V7XG5cdFx0XHRpZiAodGhpcy5xdWVlLmxlbmd0aCA+IDApe1xuXHRcdFx0XHR0aGlzLmluUHJvZ3Jlc3MgPSB0cnVlO1xuXHRcdFx0XHRsZXQgdG9DYWxsID0gdGhpcy5xdWVlLnNoaWZ0KCk7XG5cdFx0XHRcdHRvQ2FsbCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdG5leHQoKXtcblx0XHR0aGlzLmluUHJvZ3Jlc3MgPSBmYWxzZTtcblx0fVxuXG5cdGFkZChjYWxsKXtcblx0XHR0aGlzLnF1ZWUucHVzaChjYWxsKTtcblx0fVxuXG5cdHBhdXNlKCl7XG5cdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnQpO1xuXHR9XG5cblx0cmVzdW1lKCl7XG5cdFx0dGhpcy5ydW4oKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUElRdWVlO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZS5qcyc7XG5cbmltcG9ydCBub3RBUElPcHRpb25zIGZyb20gJy4vb3B0aW9ucy5qcyc7XG5pbXBvcnQgbm90QVBJUXVlZSBmcm9tICcuL3F1ZWUuanMnO1xuXG5cbmNsYXNzIG5vdEFQSSBleHRlbmRzICBub3RCYXNle1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMobm90Q29tbW9uLmV4dGVuZChub3RBUElPcHRpb25zLCBvcHRpb25zKSk7XG5cdFx0dGhpcy5xdWVlID0gbmV3IG5vdEFQSVF1ZWUodGhpcy5nZXRPcHRpb25zKCdycHMnKSk7XG5cdFx0dGhpcy5xdWVlLnJ1bigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bWFrZVVybChwYXJ0cykge1xuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcvJyk7XG5cdH1cblxuXHRxdWVlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCBtZXRob2QsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0bWFrZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpIHtcblx0XHRub3RDb21tb24ubG9nKCdtYWtpbmcgcmVxdWVzdCcsIG1ldGhvZCwgdXJsLCBpZCk7XG5cdFx0bm90Q29tbW9uLnJlcXVlc3RKU09OKG1ldGhvZCwgdXJsLCBkYXRhKVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3JlcXVlc3Qgc3VjY2Vzc2Z1bGwnLCBtZXRob2QsIHVybCwgaWQsIHJlc3BvbnNlKTtcblx0XHRcdFx0dGhpcy5xdWVlLm5leHQoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVzcG9uc2UgaXMgZ29vZCcpO1xuXHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2UpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgoY29kZSwgcmVzcG9uc2UpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdyZXF1ZXN0IGZhaWxlZCcsIG1ldGhvZCwgdXJsLCBpZCwgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXNwb25zZSBpcyBiYWQnKTtcblx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRub3RDb21tb24ubG9nKCd1cGRhdGUnKTtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3Bvc3QnLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5nZXRNb2RlbCgpLnNldFByaWNlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCd1cGRhdGUgZmFpbGVkJyk7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRwdXQob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZV0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdwdXQnLCB1cmwsIG51bGwsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ3B1dHQgZmFpbGVkJyk7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXQob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdnZXQnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdnZXQgZmFpbGVkJyk7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRsaXN0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZV0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdnZXQnLCB1cmwsIG51bGwsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2xpc3QgZmFpbGVkJyk7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZWxldGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdkZWxldGUnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5nZXRNb2RlbCgpLnNldFByaWNlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdkZWxldGUgZmFpbGVkJyk7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRVcGxvYWRVUkwobW9kZWwpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdiYXNlJykgKyB0aGlzLmdldE9wdGlvbnMoJ3VwbG9hZCcpICsgbW9kZWw/bW9kZWwuZ2V0SWQoKTonJztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUEk7XG4iLCJpbXBvcnQgbm90QmFzZSAgZnJvbSAnLi4vbm90QmFzZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbWFnZSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuIiwiY29uc3QgUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYID0gJ24tJyxcblx0VEVNUExBVEVfVEFHID0gJ250Jyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SID0gJy0nLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCA9ICdpZicsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVggPSAnbm90X2NvbXBvbmVudF8nLFxuXHRQQVJUX0lEX1BSRUZJWCA9ICdub3RfcGFydF8nLFxuXHRERUZBVUxUX1BMQUNFUiA9ICdwbGFjZScsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1AgPSAncGxhY2VBZnRlcic7XG5cbmNvbnN0IE9QVFMgPSB7XG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCxcblx0VEVNUExBVEVfVEFHLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLFxuXHRERUZBVUxUX1BMQUNFUixcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCxcblx0UEFSVF9JRF9QUkVGSVgsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1Bcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9QVFM7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5jb25zdCBNRVRBX0NBQ0hFID0gU3ltYm9sKCdjYWNoZScpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZUNhY2hlIGV4dGVuZHMgbm90QmFzZXtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DQUNIRV0gPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0dGhpcy5oaWRlVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5yZWdpc3RlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlkZVRlbXBsYXRlcygpe1xuXHRcdGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHR0LmlubmVySFRNTCA9IE9QVFMuVEVNUExBVEVfVEFHICsgJ3tkaXNwbGF5OiBub25lO30nO1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodCk7XG5cdH1cblxuXHRyZWdpc3RlcigpIHtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ3RlbXBsYXRlQ2FjaGUnLCB0aGlzKTtcblx0fVxuXG5cdGxvYWQobWFwKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdGZvciAodmFyIGkgaW4gbWFwKSB7XG5cdFx0XHR0aGlzLmxvYWRPbmUoaSwgbWFwW2ldKTtcblx0XHR9XG5cdH1cblxuXHRsb2FkT25lKGtleSwgdXJsLCBjYWxsYmFjaykge1xuXHRcdHZhciBvUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdG9SZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XG5cdFx0b1JlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZU5hbWUgPSBrZXk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZVVSTCA9IHVybDtcblx0XHRcdGRpdi5pbm5lckhUTUwgPSByZXNwb25zZS5zcmNFbGVtZW50LnJlc3BvbnNlVGV4dDtcblx0XHRcdHRoaXMuc2V0T25lKGtleSwgZGl2KTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKGtleSwgdXJsLCBkaXYpO1xuXG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRvUmVxdWVzdC5zZW5kKCk7XG5cdH1cblxuXHRpZkFsbExvYWRlZCgpe1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMudHJpZ2dlcignbG9hZGVkJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0T25lKGtleSwgZWxlbWVudCkge1xuXHRcdHRoaXNbTUVUQV9DQUNIRV1ba2V5XSA9IGVsZW1lbnQ7XG5cdH1cblxuXHRnZXQoa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9DQUNIRV0uaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXNbTUVUQV9DQUNIRV1ba2V5XS5jbG9uZU5vZGUodHJ1ZSkgOiBudWxsO1xuXHR9XG5cblx0Z2V0TmFtZXMoKXtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpc1tNRVRBX0NBQ0hFXSk7XG5cdH1cblxuXHRnZXRCeVVSTCh1cmwpIHtcblx0XHRmb3IgKHZhciBpIGluIHRoaXNbTUVUQV9DQUNIRV0pIHtcblx0XHRcdGlmICh0aGlzW01FVEFfQ0FDSEVdW2ldLnNyYyA9PSB1cmwpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0KGkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvL1x0TmV3IEFQSVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldExvYWRlZChrZXkpe1xuXHRcdGxldCB0ID0gdGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuaW5kZXhPZihrZXkpO1xuXHRcdGlmICh0ID4gLTEpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnNwbGljZSh0LCAxKTtcblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkZWQnKS5wdXNoKCdrZXknKTtcblx0fVxuXG5cdHdyYXAoa2V5LCB1cmwsIGlubmVySFRNTCl7XG5cdFx0dmFyIGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHRjb250Lm5hbWUgPSBrZXk7XG5cdFx0Y29udC5zcmMgPSB1cmw7XG5cdFx0Y29udC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG5cdFx0cmV0dXJuIGNvbnQ7XG5cdH1cblxuXHRwYXJzZUxpYih0ZXh0KXtcblx0XHRsZXQgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGxldCByZXN1bHQgPSB7fTtcblx0XHRjb250LmlubmVySFRNTCA9IHRleHQ7XG5cdFx0bGV0IG5vdFRlbXBsYXRlc0VsZW1lbnRzID0gY29udC5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHRmb3IobGV0IGVsSWQgPTA7IGVsSWQ8IG5vdFRlbXBsYXRlc0VsZW1lbnRzLmxlbmd0aDsgZWxJZCsrKXtcblx0XHRcdGxldCBlbCA9IG5vdFRlbXBsYXRlc0VsZW1lbnRzW2VsSWRdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUgPT09IGNvbnQpe1xuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRcdFx0cmVzdWx0W2VsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZV0gPSBlbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0YWRkTGliKGxpYil7XG5cdFx0Zm9yKGxldCB0IGluIGxpYil7XG5cdFx0XHR0aGlzLnNldE9uZSh0LCBsaWJbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21VUkwoa2V5LCB1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG5cdFx0XHRpZiAodGhpcy5nZXQoa2V5KSl7XG5cdFx0XHRcdHJlc29sdmUodGhpcy5nZXQoa2V5KSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly90aGF0LnNldExvYWRpbmcoa2V5LCB1cmwpO1xuXHRcdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpXG5cdFx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlSW5uZXJIVE1MKT0+e1xuXHRcdFx0XHRcdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhpcy53cmFwKGtleSwgdXJsLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0XHRcdFx0XHR0aGlzLnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRcdFx0XHRcdHJlc29sdmUodGhpcy5nZXQoa2V5KSk7XG5cdFx0XHRcdFx0fSkuY2F0Y2goKCk9Pntcblx0XHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZScsIGtleSwgdXJsKTtcblx0XHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YWRkTGliRnJvbVVSTCh1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHQudGhlbigodGVtcGxhdGVzSFRNTCk9Pntcblx0XHRcdFx0XHRsZXQgdGVtcGxhdGVzID0gdGhpcy5wYXJzZUxpYih0ZW1wbGF0ZXNIVE1MKTtcblx0XHRcdFx0XHR0aGlzLmFkZExpYih0ZW1wbGF0ZXMpO1xuXHRcdFx0XHRcdHJlc29sdmUodGVtcGxhdGVzKTtcblx0XHRcdFx0fSkuY2F0Y2goKGUpPT57XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdlcnJvciBsb2FkaW5nIHRlbXBsYXRlcyBsaWInLCB1cmwsZSk7XG5cdFx0XHRcdFx0cmVqZWN0KC4uLmFyZ3VtZW50cyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0YWRkRnJvbURvY3VtZW50KHNlbGVjdG9yT3JFbGVtZW50KXtcblx0XHRsZXQgZWwgPSAodHlwZW9mIHNlbGVjdG9yT3JFbGVtZW50ID09PSAnc3RyaW5nJyk/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yRWxlbWVudCk6c2VsZWN0b3JPckVsZW1lbnQ7XG5cdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0aWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gT1BUUy5URU1QTEFURV9UQUcudG9Mb3dlckNhc2UoKSl7XG5cdFx0XHRcdHRoaXMuc2V0T25lKGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSwgZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21UZXh0KGtleSwgdGVtcGxhdGVJbm5lckhUTUwpe1xuXHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksICcnLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlQ2FjaGUoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQuanMnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZID0gWydfaWQnLCAnaWQnLCAnSUQnXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW50ZXJmYWNlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGV4dGVuZE9iamVjdChvYmoxLCBvYmoyKSB7XG5cdFx0dmFyIGF0dHJOYW1lID0gJyc7XG5cdFx0Zm9yIChhdHRyTmFtZSBpbiBvYmoyKSB7XG5cdFx0XHRpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpIHtcblx0XHRcdFx0b2JqMVthdHRyTmFtZV0gPSBvYmoyW2F0dHJOYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG9iajE7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldElEKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSkge1xuXHRcdGxldCByZXN1bHRJZCxcblx0XHRcdGxpc3QgPSBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZO1xuXHRcdGlmIChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpbmRleCcpICYmIGFjdGlvbkRhdGEuaW5kZXgpe1xuXHRcdFx0bGlzdCA9IFthY3Rpb25EYXRhLmluZGV4XS5jb25jYXQoT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSk7XG5cdFx0fVxuXHRcdGZvcihsZXQgdCBvZiBsaXN0KXtcblx0XHRcdGlmKHJlY29yZC5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdHJlc3VsdElkID0gcmVjb3JkW3RdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdElkO1xuXHR9XG5cblx0Z2V0QWN0aW9uc0NvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSA/IE9iamVjdC5rZXlzKHRoaXMuZ2V0QWN0aW9ucygpKS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Z2V0QWN0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LmFjdGlvbnM/dGhpcy5tYW5pZmVzdC5hY3Rpb25zIDoge307XG5cdH1cblxuXHRzZXRGaW5kQnkoa2V5LCB2YWx1ZSkge1xuXHRcdHZhciBvYmogPSB7fTtcblx0XHRvYmpba2V5XSA9IHZhbHVlO1xuXHRcdHJldHVybiB0aGlzLnNldEZpbHRlcihvYmopO1xuXHR9XG5cblx0c2V0RmlsdGVyKGZpbHRlckRhdGEpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ2ZpbHRlcicsIGZpbHRlckRhdGEpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1vZGVsUGFyYW0oJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0U29ydGVyKHNvcnRlckRhdGEpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3NvcnRlcicsIHNvcnRlckRhdGEpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1vZGVsUGFyYW0oJ3NvcnRlcicpO1xuXHR9XG5cblx0c2V0UGFnZU51bWJlcihwYWdlTnVtYmVyKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdwYWdlTnVtYmVyJywgcGFnZU51bWJlcik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlU2l6ZShwYWdlU2l6ZSkge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgncGFnZVNpemUnLCBwYWdlU2l6ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlcihwYWdlU2l6ZSwgcGFnZU51bWJlcikge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgncGFnZVNpemUnLCBwYWdlU2l6ZSkuc2V0TW9kZWxQYXJhbSgncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHBhZ2VTaXplOiB0aGlzLmdldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJyksXG5cdFx0XHRwYWdlTnVtYmVyOiB0aGlzLmdldE1vZGVsUGFyYW0oJ3BhZ2VOdW1iZXInKVxuXHRcdH07XG5cdH1cblxuXHRzZXRNb2RlbFBhcmFtKHBhcmFtTmFtZSwgcGFyYW1WYWx1ZSkge1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKHBhcmFtTmFtZSwgcGFyYW1WYWx1ZSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kZWxQYXJhbShwYXJhbU5hbWUpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKHBhcmFtTmFtZSwgbnVsbCk7XG5cdH1cblxuXHRnZXRNb2RlbE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMgJiYgdGhpcy5tYW5pZmVzdCA/IHRoaXMubWFuaWZlc3QubW9kZWwgOiBudWxsO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpICYmIHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdID8gdGhpcy5nZXRBY3Rpb25zKClbYWN0aW9uTmFtZV0gOiBudWxsO1xuXHR9XG5cblx0Ly9yZXR1cm4gUHJvbWlzZVxuXHRyZXF1ZXN0KHJlY29yZCwgYWN0aW9uTmFtZSkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKGFjdGlvbk5hbWUpLFxuXHRcdFx0aWQgPSB0aGlzLmdldElEKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSksXG5cdFx0XHR1cmwgPSB0aGlzLmdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpO1xuXHRcdHJldHVybiBub3RDb21tb24uZ2V0QVBJKCkucXVlZVJlcXVlc3QoYWN0aW9uRGF0YS5tZXRob2QsIHVybCwgaWQgLEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpLCB0aGlzLm9uTG9hZC5iaW5kKHthY3Rpb25EYXRhLCBtYW5pZmVzdDogdGhpcy5tYW5pZmVzdH0pKTtcblx0fVxuLypcblx0X3JlcXVlc3RfT2Jzb2xldGVfKHJlY29yZCwgYWN0aW9uTmFtZSkge1xuXHRcdG5vdENvbW1vbi5sb2coJ3JlcXVlc3QnLCByZWNvcmQsIGFjdGlvbk5hbWUsIGNhbGxiYWNrU3VjY2VzcywgY2FsbGJhY2tFcnJvcik7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKGFjdGlvbk5hbWUpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLmdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpO1xuXHRcdFx0XHRub3RDb21tb24uZ2V0QVBJKCkucXVlZVJlcXVlc3QoYWN0aW9uRGF0YS5tZXRob2QsIHVybCwgcmVjb3JkLmdldElkKCksIEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpLCBnb29kLCBiYWQpXG5cdFx0XHRcdFx0LnRoZW4ocmVzb2x2ZSlcblx0XHRcdFx0XHQuY2F0Y2gocmVqZWN0KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRub3RDb21tb24ubG9nKCd1cGRhdGUnKTtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCk7XG5cblx0XHR9KTtcblxuXG5cdFx0aWYgKGFjdGlvbkRhdGEpe1xuXHRcdFx0dmFyIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4bWxodHRwLm9wZW4oYWN0aW9uRGF0YS5tZXRob2QsIHVybCk7XG5cdFx0XHR4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTtcblx0XHRcdHhtbGh0dHAucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eG1saHR0cC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eG1saHR0cC5jYWxsYmFja1N1Y2Nlc3MgPSBjYWxsYmFja1N1Y2Nlc3M7XG5cdFx0XHR4bWxodHRwLmNhbGxiYWNrRXJyb3IgPSBjYWxsYmFja0Vycm9yO1xuXHRcdFx0eG1saHR0cC5vbmxvYWQgPSB0aGlzLm9uTG9hZDtcblx0XHRcdHhtbGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSk7XG5cdFx0fVxuXHR9XG4qL1xuXHRvbkxvYWQoZGF0YSl7XG5cdFx0aWYodGhpcyAmJiB0aGlzLmFjdGlvbkRhdGEgJiYgdGhpcy5hY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpc0FycmF5JykgJiYgdGhpcy5hY3Rpb25EYXRhLmlzQXJyYXkpIHtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCBkYXRhLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0ZGF0YVt0XSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YVt0XSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSBuZXcgbm90UmVjb3JkKHRoaXMubWFuaWZlc3QsIGRhdGEpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdGZpbGVVcGxvYWQoZmlsZVVwbG9hZCkge1xuXHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHQvL25vdENvbW1vbi5sb2coZmlsZVVwbG9hZC5maWxlKTtcblx0XHRpZiAoeGhyLnVwbG9hZCAmJiB0aGlzLmZpbGVBbGxvd2VkKGZpbGVVcGxvYWQuZmlsZSkpIHtcblx0XHRcdC8vIHByb2dyZXNzIGJhclxuXHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKFwicHJvZ3Jlc3NcIiwgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRmaWxlVXBsb2FkLnRyaWdnZXIoXCJwcm9ncmVzc1wiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdC8vIGZpbGUgcmVjZWl2ZWQvZmFpbGVkXG5cdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRcdGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdFx0dmFyIGluZGV4ID0gdGhhdC53b3JraW5nLmZpbGVVcGxvYWRzLmluZGV4T2YoZmlsZVVwbG9hZCk7XG5cdFx0XHRcdFx0XHR0aGF0LndvcmtpbmcuZmlsZVVwbG9hZHMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcInN1Y2Nlc3NcIiwgZSwgZmlsZVVwbG9hZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcImZhaWx1cmVcIiwgZSwgZmlsZVVwbG9hZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0Ly8gc3RhcnQgdXBsb2FkXG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vcGVuKFwiUE9TVFwiLCB0aGlzLmdldFVwbG9hZFVybCgpLCB0cnVlKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIGZpbGVVcGxvYWQuZmlsZS50eXBlKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiWF9GSUxFTkFNRVwiLCBlbmNvZGVVUklDb21wb25lbnQoZmlsZVVwbG9hZC5maWxlLm5hbWUpKTtcblx0XHRcdHhoci5zZW5kKGZpbGVVcGxvYWQuZmlsZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcImZhaWx1cmVcIiwgbmV3IEV2ZW50KFwiV3JvbmdGaWxlVHlwZVwiKSwgZmlsZVVwbG9hZCk7XG5cdFx0fVxuXHR9XG5cdCovXG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7XG5cbmNvbnN0IE1FVEFfSU5URVJGQUNFID0gU3ltYm9sKCdpbnRlcmZhY2UnKSxcblx0TUVUQV9QUk9YWSA9IFN5bWJvbCgncHJveHknKSxcblx0TUVUQV9DSEFOR0UgPSBTeW1ib2woJ2NoYW5nZScpLFxuXHRNRVRBX0NIQU5HRV9ORVNURUQgPSBTeW1ib2woJ2NoYW5nZS5uZXN0ZWQnKSxcblx0TUVUQV9TQUwgPSBbJ2dldEF0dHInLCAnZ2V0QXR0cnMnLCAnaXNQcm9wZXJ0eScsICdpc1JlY29yZCcsICdnZXRNYW5pZmVzdCcsICdzZXRBdHRyJywgJ3NldEF0dHJzJywgJ2dldERhdGEnLCAnc2V0RGF0YScsICdnZXRKU09OJywgJ29uJywgJ29mZicsICd0cmlnZ2VyJ10sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTAsXG5cdE1FVEFfUkVUVVJOX1RPX1JPT1QgPSBTeW1ib2woJ3JldHVyblRvUm9vdCcpO1xuXG52YXIgY3JlYXRlUHJvcGVydHlIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdHlwZW9mIHRhcmdldFtrZXldKTtcblxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UHJvcGVydHkgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoZ2V0Um9vdCwgcGF0aFRvLCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1Byb3h5IHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5zZXREYXRhKGl0ZW0pO1xuXHRcdHRoaXMuaXNQcm9wZXJ0eSA9IHRydWU7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX1JFVFVSTl9UT19ST09UXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdFtNRVRBX1JFVFVSTl9UT19ST09UXShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdGxldCByb290ID0gdGhpcy5nZXRPcHRpb25zKCdnZXRSb290JykoKTtcblx0XHRyb290LnRyaWdnZXIoJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfUFJPWFldLCB0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5LCB2YWx1ZSk7XG5cdH1cbn1cblxuXG52YXIgY3JlYXRlUmVjb3JkSGFuZGxlcnMgPSBmdW5jdGlvbihvd25lcikge1xuXHRyZXR1cm4ge1xuXHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIGNvbnRleHQpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgZ2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQsIGNvbnRleHQpO1xuXHRcdFx0aWYgKGtleSA9PT0gJ2lzUHJveHknIHx8IGtleSA9PT0gJ2lzUmVjb3JkJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RSZWNvcmQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QsIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIGl0ZW0uaXNQcm94eSkge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCd0aGlzIGlzIFByb3h5IGl0ZW0nKTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUmVjb3JkIHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRPcHRpb25zKHtcblx0XHRcdGZpbHRlcjoge30sXG5cdFx0XHRzb3J0ZXI6IHt9LFxuXHRcdFx0cGFnZU51bWJlcjogREVGQVVMVF9QQUdFX05VTUJFUixcblx0XHRcdHBhZ2VTaXplOiBERUZBVUxUX1BBR0VfU0laRSxcblx0XHRcdGZpZWxkczogW11cblx0XHR9KTtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXSA9IG5ldyBub3RSZWNvcmRJbnRlcmZhY2UobWFuaWZlc3QpO1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzLmludGVyZmFjZVVwKCk7XG5cdFx0dGhpcy5pc1JlY29yZCA9IHRydWU7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSByZWNvcmQgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRpbml0UHJvcGVydGllcyhpdGVtLCBwYXRoID0gJycpIHtcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoaXRlbSk7XG5cdFx0XHRmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuXHRcdFx0XHRsZXQgY3VyUGF0aCA9IHBhdGggKyAocGF0aC5sZW5ndGggPiAwID8gJy4nIDogJycpICsga2V5O1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2N1clBhdGgnLCBjdXJQYXRoKTtcblx0XHRcdFx0aWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbVtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0dGhpcy5pbml0UHJvcGVydGllcyhpdGVtW2tleV0sIGN1clBhdGgpO1xuXHRcdFx0XHRcdFx0aXRlbVtrZXldID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0Um9vdC5iaW5kKHRoaXMpLCBjdXJQYXRoLCBpdGVtW2tleV0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgb3duIHByb3BlcnR5LCBidXQgbm90IG9iamVjdCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgbm90IG93biBwcm9wZXJ0eScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpdGVtO1xuXHR9XG5cblx0Z2V0Um9vdCgpIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW1zKSB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSBbXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb2xsZWN0aW9uLnB1c2gobmV3IG5vdFJlY29yZChtYW5pZmVzdCwgaXRlbXNbaV0pKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb247XG5cdH1cblxuXHRpbnRlcmZhY2VVcCgpIHtcblx0XHRpZiAodGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9uc0NvdW50KCkgPiAwKSB7XG5cdFx0XHRsZXQgYWN0aW9ucyA9IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEFjdGlvbnMoKTtcblx0XHRcdGZvciAobGV0IGkgaW4gYWN0aW9ucykge1xuXHRcdFx0XHR0aGlzLmFjdGlvblVwKGksIGFjdGlvbnNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFjdGlvblVwKGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLmhhc093blByb3BlcnR5KFtERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0pKSB7XG5cdFx0XHR0aGlzW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSA9ICgpID0+IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlcXVlc3QodGhpcywgaW5kZXgpO1xuXHRcdFx0bm90Q29tbW9uLmxvZygnZGVmaW5lJywgREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXgpO1xuXHRcdH1cblx0fVxuXHQvKlxuXHQtPiAncGF0aC50by5rZXknLCB2YWx1ZU9mS2V5XG5cdDwtIG9rLCB3aXRoIG9uZSBvbkNoYW5nZSBldmVudCB0cmlnZ2VyZWRcblx0Ki9cblxuXHRzZXRBdHRyKGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gbm90UGF0aC5zZXQoa2V5LCB0aGlzW01FVEFfUFJPWFldLCB7fSwgdmFsdWUpO1xuXHR9XG5cblx0Lypcblx0LT5cblx0e1xuXHRcdCdrZXlQYXRoJzogdmFsdWUsXG5cdFx0J2tleS5zdWJQYXRoJzogdmFsdWUyLFxuXHRcdCdrZXlQYXRoLjAudGl0bGUnOiB2YWx1ZTNcblx0fVxuXHQ8LSBvaywgd2l0aCBidW5jaCBvZiBvbkNoYW5nZSBldmVudHMgdHJpZ2dlcmVkXG5cdCovXG5cdHNldEF0dHJzKG9iamVjdFBhcnQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzJywgb2JqZWN0UGFydCwgT2JqZWN0LmtleXMob2JqZWN0UGFydCkpO1xuXHRcdGlmIChvYmplY3RQYXJ0ICYmICh0eXBlb2Ygb2JqZWN0UGFydCA9PT0gJ29iamVjdCcpICYmIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpLmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggaW4gb2JqZWN0UGFydCkge1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzIG9uZSB0byBnbycsIHBhdGgpO1xuXHRcdFx0XHR0aGlzLnNldEF0dHIocGF0aCwgb2JqZWN0UGFydFtwYXRoXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0LT4gJ3BhdGhUb0tleSdcblx0PC0gdmFsdWUxXG5cblx0Ki9cblx0Z2V0QXR0cih3aGF0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdnZXRBdHRyJywgd2hhdCk7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHdoYXQsIHRoaXNbTUVUQV9QUk9YWV0sIHt9KTtcblx0fVxuXG5cdC8qXG5cdC0+IFsncGF0aFRvS2V5JywgJ3BhdGgudG8ua2V5JywgJ3NpbXBsZUtleScsLi4uXVxuXHQ8LSBbdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMywuLi5dXG5cdCovXG5cdGdldEF0dHJzKHdoYXQpIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0aWYgKHdoYXQgJiYgd2hhdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIG9mIHdoYXQpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5nZXRBdHRyKHBhdGgpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXSl7XG5cdFx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ubWFuaWZlc3Q7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRnZXRKU09OKCkge1xuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuL25vdFJvdXRlcic7XG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcblxuY29uc3QgT1BUX0NPTlRST0xMRVJfUFJFRklYID0gJ25jJyxcblx0T1BUX1JFQ09SRF9QUkVGSVggPSAnbnInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RBcHAgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKHtvcHRpb25zfSk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgYXBwJyk7XG5cdFx0bm90Q29tbW9uLnJlZ2lzdGVyKCdhcHAnLCB0aGlzKTtcblx0XHR0aGlzLnJlc291cmNlcyA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRpbnRlcmZhY2VzOiB7fSxcblx0XHRcdGNvbnRyb2xsZXJzOiB7fSxcblx0XHRcdGluaXRDb250cm9sbGVyOiBudWxsLFxuXHRcdFx0Y3VycmVudENvbnRyb2xsZXI6IG51bGxcblx0XHR9KTtcblx0XHR0aGlzLmluaXRNYW5hZ2VyKCk7XG5cdFx0dGhpcy5pbml0QVBJKCk7XG5cdFx0dGhpcy5pbml0VGVtcGxhdGVzKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0TWFuYWdlcigpe1xuXHRcdG5vdENvbW1vbi5zZXRNYW5hZ2VyKFxuXHRcdFx0e1xuXHRcdFx0XHRzZXRBUEkodil7IHRoaXMuYXBpID0gdjt9LFxuXHRcdFx0XHRnZXRBUEkoKXtyZXR1cm4gdGhpcy5hcGk7fSxcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0aW5pdEFQSSgpe1xuXHRcdG5vdENvbW1vbi5nZXRNYW5hZ2VyKCkuc2V0QVBJKG5ldyBub3RBUEkoe30pKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZXMoKXtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRsZXQgcHJvbSA9IG51bGw7XG5cdFx0XHRmb3IobGV0IHQgaW4gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRcdGlmICh0ICYmIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdGxldCB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpW3RdO1xuXHRcdFx0XHRcdGlmKHByb20pe1xuXHRcdFx0XHRcdFx0cHJvbS50aGVuKG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTC5iaW5kKG5vdFRlbXBsYXRlQ2FjaGUsIHVybCkpO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cHJvbSA9IG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTCh1cmwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHByb20pe1xuXHRcdFx0XHRwcm9tLnRoZW4odGhpcy5pbml0TWFuaWZlc3QuYmluZCh0aGlzKSlcblx0XHRcdFx0XHQuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ25vIHRlbXBsYXRlcyBsaWInLCBlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5pbml0TWFuaWZlc3QoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFuaWZlc3QoKSB7XG5cdFx0dmFyIHVybCA9IHRoaXMuZ2V0T3B0aW9ucygnbWFuaWZlc3RVUkwnKTtcblx0XHRub3RDb21tb24uZ2V0SlNPTih1cmwsIHt9KVxuXHRcdFx0LnRoZW4odGhpcy5zZXRJbnRlcmZhY2VNYW5pZmVzdC5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRpbml0Um91dGVyKCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb3V0ZXInLCBub3RSb3V0ZXIpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuc2V0Um9vdCh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5yb290JykpO1xuXHRcdHZhciByb3V0aWVJbnB1dCA9IHt9O1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5tYW5pZmVzdCcpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGxldCByb3V0ZUJsb2NrID0gdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKVt0XSxcblx0XHRcdFx0cGF0aHMgPSByb3V0ZUJsb2NrLnBhdGhzLFxuXHRcdFx0XHRjb250cm9sbGVyID0gcm91dGVCbG9jay5jb250cm9sbGVyO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0cm91dGllSW5wdXRbcGF0aHNbaV1dID0gdGhpcy5iaW5kQ29udHJvbGxlcihjb250cm9sbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXInKS5hZGRMaXN0KHJvdXRpZUlucHV0KS5saXN0ZW4oKS5uYXZpZ2F0ZSh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5pbmRleCcpKTtcblx0fVxuXG5cdHNldEludGVyZmFjZU1hbmlmZXN0KG1hbmlmZXN0KSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcsIG1hbmlmZXN0KTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlTWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHQvL9C90YPQttC90L4g0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNGC0Yxcblx0XHQvL9C80L7QtNC10LvQuCDQv9C+0LvRg9GH0LXQvdC90YvQvNC4INC40L3RgtC10YDRhNC10LnRgdCw0LzQuFxuXHRcdHRoaXMudXBkYXRlSW50ZXJmYWNlcygpO1xuXHRcdC8v0LjQvdC40YbQuNC70LjRhtC40YDQvtCy0LDRgtGMINC4INC30LDQv9GD0YHRgtC40YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHRcdHRoaXMuaW5pdENvbnRyb2xsZXIoKTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhcnRBcHAoKSB7XG5cdFx0Ly/RgdC+0LfQtNCw0YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0Ly/RgNC+0YPRgtC10YAg0Lgg0L/RgNC40LLRj9C30LDRgtGMINC6INC90LXQvNGDINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHR0aGlzLmluaXRSb3V0ZXIoKTtcblx0fVxuXG5cdGJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0bGV0IGFwcCA9IHRoaXM7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRuZXcgY29udHJvbGxlck5hbWUoYXBwLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdH1cblxuXHRpbml0Q29udHJvbGxlcigpIHtcblx0XHRpZiAodHlwZW9mKHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRsZXQgaW5pdENvbnRyb2xsZXIgPSB0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJyk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJywgbmV3IGluaXRDb250cm9sbGVyKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50Q29udHJvbGxlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicpO1xuXHR9XG5cblx0c2V0Q3VycmVudENvbnRyb2xsZXIoY3RybCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInLCBjdHJsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHVwZGF0ZUludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5jbGVhckludGVyZmFjZXMoKTtcblx0XHRsZXQgbWFuaWZlc3RzID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHRcdGlmIChtYW5pZmVzdHMpIHtcblx0XHRcdGZvcihsZXQgbmFtZSBpbiBtYW5pZmVzdHMpe1xuXHRcdFx0XHRsZXQgcmVjb3JkTWFuaWZlc3QgPSBtYW5pZmVzdHNbbmFtZV07XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdID0gKHJlY29yZERhdGEpID0+IG5ldyBub3RSZWNvcmQocmVjb3JkTWFuaWZlc3QsIHJlY29yZERhdGEpO1xuXHRcdFx0XHR3aW5kb3dbJ25yJyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSldID0gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbbmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0UmVjb3JkTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9SRUNPUkRfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldENvbnRyb2xsZXJOYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX0NPTlRST0xMRVJfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldEludGVyZmFjZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpO1xuXHR9XG5cblx0Y2xlYXJJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJmYWNlcycsIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHdhaXRUaGlzUmVzb3VyY2UodHlwZSwgaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMucmVzb3VyY2VzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG5cdFx0XHR0aGlzLnJlc291cmNlc1t0eXBlXSA9IHt9O1xuXHRcdH1cblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSBmYWxzZTtcblx0XHRyZXR1cm4gdGhpcy5vblJlc291cmNlUmVhZHkuYmluZCh0aGlzLCB0eXBlLCBpbmRleCk7XG5cdH1cblxuXHRvblJlc291cmNlUmVhZHkodHlwZSwgaW5kZXgpIHtcblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSB0cnVlO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRhbGxSZXNvdXJjZXNSZWFkeSgpIHtcblx0XHR2YXIgaSwgajtcblx0XHRmb3IgKGkgaW4gdGhpcy5yZXNvdXJjZXMpIHtcblx0XHRcdGZvciAoaiBpbiB0aGlzLnJlc291cmNlc1tpXSkge1xuXHRcdFx0XHRpZiAoIXRoaXMucmVzb3VyY2VzW2ldW2pdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuXG5jb25zdCBNRVRBX1BST0NFU1NPUlMgPSBTeW1ib2woJ3Byb2Nlc3NvcnMnKTtcblxuY2xhc3Mgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UHJvY2Vzc29yKC8qIGtleSwgdmFsdWUgKi8pe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFByb2Nlc3NvcigvKiBrZXksICBkZWZhdWx0VmFsdWUgKi8pe1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhclByb2Nlc3NvcnMoKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZCgpe1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcblx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHR9ZWxzZXtcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKXtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGFyZ3VtZW50c1swXSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IodCwgYXJndW1lbnRzWzBdW3RdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFByb2Nlc3NvciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXIoKXtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlUHJvY2Vzc29ycygpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnO1xuXG4vKlxuICog0JjRgdC/0L7Qu9GM0LfRg9C10YIgRE9NINC/0L7QtNC00LXRgNC10LLQviDQsiDQutCw0YfQtdGB0YLQstC1INGI0LDQsdC70L7QvdCwLlxuICog0JfQsNC/0L7Qu9C90Y/QtdGCINC10LPQviDQtNCw0L3QvdGL0LzQuC5cbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0LPQtdC90LXRgNC40YDQvtCy0LDQvdC90YvQtSDRjdC70LXQvNC10L3RgtGLXG4gKlxuICogKi9cblxuLypcblxuXHQ8ZGl2IG4tdGVtcGxhdGUtbmFtZT1cInZhc3lhXCI+XG5cdFx0PHA+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbi12YWx1ZT1cIjpjb29sTmFtZVwiLz48L3A+XG5cdFx0PHA+0JHQvtGA0LjRgSDRhdGA0LXQvSDQv9C+0L/QsNC00LXRiNGMINC4IHt7OmNvb2xOYW1lfX0uPC9wPlxuXHQ8L2Rpdj5cblxuICovXG5cbmNvbnN0IE1FVEFfQ09NUE9ORU5UUyA9IFN5bWJvbCgnY29tcG9uZW50cycpO1xuXG5jbGFzcyBub3RSZW5kZXJlciBleHRlbmRzIG5vdEJhc2Uge1xuXHQvKlxuXHRcdGlucHV0ID0ge1xuXHRcdFx0ZGF0YTogbm90UmVjb3JkLFxuXHRcdFx0dGVtcGxhdGU6IGVsZW1lbnRcblx0XHRcdG9wdGlvbnM6e1xuXHRcdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0fVxuXHRcdH1cblx0Ki9cblxuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdID0ge307XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLmNvbXBvbmVudCA9IGlucHV0LmNvbXBvbmVudDtcblx0XHR0aGlzLmluaXREYXRhKGlucHV0LmRhdGEgPyBpbnB1dC5kYXRhIDoge30pO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dC50ZW1wbGF0ZSk7XG5cdFx0dGhpcy5pbml0VGVtcGxhdGUoKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3RlbXBsYXRlJywgdGhpcy5nZXRXb3JraW5nKCdnZXRUZW1wbGF0ZScpKCkpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLmdldERhdGEoKS5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0fVxuXG5cdGluaXRXb3JraW5nKHRlbXBsYXRlKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGdldFRlbXBsYXRlOiB0ZW1wbGF0ZSxcblx0XHRcdHBhcnRJZDogdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA/IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgOiBPUFRTLlBBUlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHR9KTtcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCkge1xuXHRcdGlmICh0aGlzLmNvbXBvbmVudCkge1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLmNvbXBvbmVudC5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9XG5cdH1cblxuXHRvbkNoYW5nZShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdC8qbm90Q29tbW9uLmxvZyh0aGlzKTtcblx0XHRub3RDb21tb24ubG9nKHRoaXMuZ2V0QnJlYWRDcnVtcHMoKS5qb2luKCcgPiAnKSk7XG5cdFx0bm90Q29tbW9uLmxvZygndXBkYXRpbmcgcmVuZGVyZXIgJywgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKSwgJyBhZnRlciBjaGFuZ2VzJywga2V5LCB2YWx1ZSk7Ki9cblx0XHR0aGlzLnVwZGF0ZShrZXkpO1xuXHRcdHRoaXMudHJpZ2dlcignb2Jzb2xldGUnLHByb3h5LCBrZXksIHZhbHVlKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyU3Rhc2goKTtcblx0XHR0aGlzLnNldFdvcmtpbmdNYXBwaW5nKCk7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0dGhpcy5zZWFyY2hGb3JTdWJUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnN0YXNoUmVuZGVyZWQoKTtcblx0fVxuXG5cdHVwZGF0ZShrZXkpIHtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHRmb3IgKGxldCB0IGluIHRoaXNbTUVUQV9DT01QT05FTlRTXSkge1xuXHRcdFx0bGV0IGl0ZW0gPSB0aGlzW01FVEFfQ09NUE9ORU5UU11bdF0sXG5cdFx0XHRcdGlmUGFydCA9IHRydWU7XG5cdFx0XHRpZiAoa2V5KXtcblx0XHRcdFx0aWYgKGl0ZW0uZ2V0T3B0aW9ucygnZGF0YVBhdGgnKT09PW51bGwpe1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldFx0Y29tcG9uZW50UGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJykpLFxuXHRcdFx0XHRcdGNoYW5nZWRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGtleSk7XG5cdFx0XHRcdGlmUGFydCA9IG5vdFBhdGguaWZGdWxsU3ViUGF0aChjaGFuZ2VkUGF0aCwgY29tcG9uZW50UGF0aCk7XG5cdFx0XHRcdC8qbm90Q29tbW9uLmxvZyhpdGVtLmdldE9wdGlvbnMoJ25hbWUnKSwgJyA+LTwgJywgaXRlbS5nZXRPcHRpb25zKCdpZCcpLCAnID4tPCAnLCBjb21wb25lbnRQYXRoLCBjaGFuZ2VkUGF0aCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3dpbGwgYmUgdXBkYXRlZCcsIGlmUGFydCk7Ki9cblx0XHRcdH1cblxuXHRcdFx0aWYgKGlmUGFydCkge1xuXHRcdFx0XHRpdGVtLnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldFdvcmtpbmdNYXBwaW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbWFwcGluZycsIHRoaXMuY3JlYXRlTWFwcGluZygpKTtcblx0fVxuXG5cdC8qXG5cblx00KHQvtC30LTQsNC10Lwg0LrQsNGA0YLRiyDRgdC+0L7RgtCy0LXRgdGC0LLQuNGPINC/0YDQvtGG0LXRgdGB0L7RgNC+0LIsINC/0YPRgtC10Lkg0LTQsNC90L3Ri9GFINCyINC+0LHRitC10LrRgtC1INC4INGN0LvQtdC80LXQvdGC0L7QsiDRiNCw0LHQu9C+0L3QsC5cblx0W3tcblx0XHRlbCxcblx0XHRwcm9jZXNzb3IsXG5cdFx0d29ya2luZyxcblx0XHRpdGVtLnByb3BlcnR5LnBhdGhcblx0fV1cblxuXHQqL1xuXG5cdGNyZWF0ZU1hcHBpbmcoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZmluZEFsbFByb2Nlc3NvcnMoKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZmluZEFsbFByb2Nlc3NvcnMoKSB7XG5cdFx0bGV0IHByb2NzID0gW10sXG5cdFx0XHRlbHMgPSBub3RDb21tb24uZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgodGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGVscy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGF0dHMgPSBlbHNbal0uYXR0cmlidXRlcywgbiA9IGF0dHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRzW2ldLm5vZGVOYW1lLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpID09PSAwKSB7XG5cdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGF0dHNbaV0pO1xuXHRcdFx0XHRcdGxldCBwcm9jRGF0YSA9IHRoaXMucGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKGF0dHNbaV0ubm9kZU5hbWUpO1xuXHRcdFx0XHRcdHByb2NEYXRhLmVsZW1lbnQgPSBlbHNbal07XG5cdFx0XHRcdFx0cHJvY0RhdGEucHJvY2Vzc29yRXhwcmVzc2lvbiA9IGF0dHNbaV0ubm9kZU5hbWU7XG5cdFx0XHRcdFx0cHJvY0RhdGEuYXR0cmlidXRlRXhwcmVzc2lvbiA9IGF0dHNbaV0udmFsdWU7XG5cdFx0XHRcdFx0cHJvY3MucHVzaChwcm9jRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHByb2NzO1xuXHR9XG5cblx0cGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKHByb2Nlc3NvckV4cHJlc3Npb24pIHtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0cGFyYW1zOiBbXSxcblx0XHRcdHByb2Nlc3Nvck5hbWU6ICcnLFxuXHRcdFx0aWZDb25kaXRpb246IGZhbHNlXG5cdFx0fTtcblx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLCAnJyk7XG5cdFx0aWYgKHByb2Nlc3NvckV4cHJlc3Npb24uaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYKSA9PT0gKHByb2Nlc3NvckV4cHJlc3Npb24ubGVuZ3RoIC0gT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWC5sZW5ndGgpKSB7XG5cdFx0XHRyZXN1bHQuaWZDb25kaXRpb24gPSB0cnVlO1xuXHRcdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiArIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsICcnKTtcblx0XHR9XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHByb2Nlc3NvckV4cHJlc3Npb24uc3BsaXQoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IpO1xuXHRcdHJlc3VsdC5wcm9jZXNzb3JOYW1lID0gcmVzdWx0LnBhcmFtc1swXTtcblx0XHRyZXN1bHQucGFyYW1zID0gcmVzdWx0LnBhcmFtcy5zbGljZSgxKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZXhlY1Byb2Nlc3NvcnMoaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbWFwcGluZyA9IHRoaXMuZ2V0V29ya2luZygnbWFwcGluZycpO1xuXHRcdGlmIChtYXBwaW5nKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBpbmcubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IHByb2NTY29wZSA9IG1hcHBpbmdbaV07XG5cdFx0XHRcdHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocHJvY1Njb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGluZGV4KTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdhdHRyaWJ1dGVSZXN1bHQnLCBwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0XHRcdFx0bGV0IHByb2NOYW1lID0gcHJvY1Njb3BlLnByb2Nlc3Nvck5hbWUsXG5cdFx0XHRcdFx0cHJvYyA9IG5vdFRlbXBsYXRlUHJvY2Vzc29ycy5nZXQocHJvY05hbWUpO1xuXHRcdFx0XHRpZiAocHJvYykge1xuXHRcdFx0XHRcdHByb2MocHJvY1Njb3BlLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHRcdFx0XHRcdHByb2NTY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9jU2NvcGUucHJvY2Vzc29yRXhwcmVzc2lvbik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyBwcm9jZXNzb3IgbGlrZScsIHByb2NOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ3JlbmRlcmVkJyk7XG5cdH1cblxuXHRnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHBhdGgsIGl0ZW0pIHtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQocGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0fVxuXG5cdGNsZWFyU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuZGVzdHJveVN1YnMoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N1YnMnLCBbXSk7XG5cdH1cblxuXHRkZXN0cm95U3VicygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdFx0dC5kZXN0cm95KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0U3Rhc2goKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRsZXQgZWwgPSB0aGlzLmdldFN0YXNoKClbdF07XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSl7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmU3ViRWxlbWVudFJlbmRlcmVkKG50RWwpIHtcblx0XHRyZXR1cm4gbnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQgJiYgKG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkLnZhbHVlID09PSAndHJ1ZScpO1xuXHR9XG5cblx0c2VhcmNoRm9yU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRsZXQgc3VicyA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3JBbGwoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc3ViIHRlbXBsYXRlcycsIHN1YnMpO1xuXHRcdGZvciAobGV0IG50ID0gMDsgbnQgPCBzdWJzLmxlbmd0aDsgbnQrKykge1xuXHRcdFx0aWYgKCF0aGlzLmlmU3ViRWxlbWVudFJlbmRlcmVkKHN1YnNbbnRdKSkge1xuXHRcdFx0XHR0aGlzLnJlbmRlclN1YihzdWJzW250XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWRkU3ViKG50RWwpIHtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKS5wdXNoKHtcblx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0cGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6ICcnLFxuXHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUuc3JjIDogJycsXG5cdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHRcdHJlbmRlcmVkTGlzdDogW10sXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJTdWIobnRFbCkge1xuXHRcdGlmICghbnRFbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRsZXQgZGV0YWlscyA9IHtcblx0XHRcdFx0ZGF0YVBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiBudWxsLFxuXHRcdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5zcmMudmFsdWUgOiAnJyxcblx0XHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKClcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHRkYXRhOiBkZXRhaWxzLmRhdGFQYXRoIT09IG51bGw/IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChkZXRhaWxzLmRhdGFQYXRoLCB0aGlzLmdldERhdGEoKSk6bnVsbCxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0c3JjOiBkZXRhaWxzLnNyY1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pLFxuXHRcdFx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUFmdGVyJyxcblx0XHRcdFx0XHRpZDogZGV0YWlscy5pZCxcblx0XHRcdFx0XHRudEVsOiBudEVsLFxuXHRcdFx0XHRcdGRhdGFQYXRoOiBkZXRhaWxzLmRhdGFQYXRoXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG93bmVyOiB0aGlzXG5cdFx0XHR9O1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdpZCcsIGRldGFpbHMuaWQpO1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXVtkZXRhaWxzLmlkXSA9IG5ldyBub3RDb21wb25lbnQob3B0aW9ucyk7XG5cdH1cblxuXHRjbGVhclN0YXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBbXSk7XG5cdH1cblxuXHRnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3RlbXBsYXRlJyk7XG5cdH1cblxuXHRnZXRTdGFzaCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzdGFzaCcpO1xuXHR9XG5cblx0c3Rhc2hSZW5kZXJlZCgpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCk7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0dGhpcy5hZGRUb1N0YXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdH1cblxuXHRyZXBsYWNlUmVuZGVyZWQoKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdyZXBsYWNlIHN0YXNoJyk7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLFxuXHRcdFx0c3Rhc2ggPSB0aGlzLmdldFN0YXNoKCksXG5cdFx0XHRuZXdTdGFzaCA9IFtdLFxuXHRcdFx0YW5jaG9yID0gc3Rhc2gubGVuZ3RoID4gMCA/IHN0YXNoWzBdIDogdGhpcy5nZXRPcHRpb25zKCdudEVsJyksXG5cdFx0XHRwYXJlbnROb2RlID0gYW5jaG9yLnBhcmVudE5vZGU7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0bmV3U3Rhc2gucHVzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgbmV3U3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdGlmIChhbmNob3IubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1N0YXNoW3RdLCBhbmNob3IubmV4dFNpYmxpbmcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3U3Rhc2hbdF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHN0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRwYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0YXNoW3RdKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIG5ld1N0YXNoKTtcblx0fVxuXG5cdGFkZFRvU3Rhc2gobm9kZSkge1xuXHRcdHRoaXMuZ2V0U3Rhc2goKS5wdXNoKG5vZGUpO1xuXHR9XG5cblx0aXNEYXRhKGRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkgPT09IGRhdGE7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVuZGVyZXI7XG4iLCJjb25zdCBwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XG5cdFx0bGV0IGwgPSAwO1xuXHRcdHdoaWxlICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGggLSBsKSB7XG5cdFx0XHRpZiAodGFyZ2V0RWwuY2hpbGRyZW5bMF0ubm9kZU5hbWUgPT09ICdOVCcpe1xuXHRcdFx0XHRsKys7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGFyZ2V0RWwucmVtb3ZlQ2hpbGQodGFyZ2V0RWwuY2hpbGRyZW5bbF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fVxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlO1xuIiwiY29uc3QgcGxhY2VBZnRlciA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQWZ0ZXI7XG4iLCJjb25zdCBwbGFjZUJlZm9yZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQmVmb3JlO1xuIiwiY29uc3QgcGxhY2VGaXJzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZUZpcnN0O1xuIiwiY29uc3QgcGxhY2VMYXN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUxhc3Q7XG4iLCJjb25zdCByZXBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRiZWZvcmVFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cblx0fSxcblx0YWZ0ZXJFYWNoOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XG5cdFx0aWYgKHRhcmdldEVsLm5vZGVOYW1lICE9PSAnTlQnKXtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFyZ2V0RWwpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHtcblxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlO1xuIiwiaW1wb3J0IHBsYWNlIGZyb20gJy4vcGxhY2UnO1xuaW1wb3J0IHBsYWNlQWZ0ZXIgZnJvbSAnLi9wbGFjZUFmdGVyJztcbmltcG9ydCBwbGFjZUJlZm9yZSBmcm9tICcuL3BsYWNlQmVmb3JlJztcbmltcG9ydCBwbGFjZUZpcnN0IGZyb20gJy4vcGxhY2VGaXJzdCc7XG5pbXBvcnQgcGxhY2VMYXN0IGZyb20gJy4vcGxhY2VMYXN0JztcbmltcG9ydCByZXBsYWNlIGZyb20gJy4vcmVwbGFjZSc7XG5cbmNvbnN0IG5vdFBsYWNlcnMgPSB7XG5cdHBsYWNlOiBwbGFjZSxcblx0cGxhY2VBZnRlcjogcGxhY2VBZnRlcixcblx0cGxhY2VCZWZvcmU6IHBsYWNlQmVmb3JlLFxuXHRwbGFjZUZpcnN0OiBwbGFjZUZpcnN0LFxuXHRwbGFjZUxhc3Q6IHBsYWNlTGFzdCxcblx0cmVwbGFjZTogcmVwbGFjZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90UGxhY2VycztcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi9ub3RSZW5kZXJlcic7XG5pbXBvcnQgbm90UGxhY2VycyBmcm9tICcuL3BsYWNlcnMnO1xuXG5jb25zdCBNRVRBX1BBUlRTID0gU3ltYm9sKCdwYXJ0cycpO1xuLypcblx0aW5wdXQgPSB7XG5cdFx0ZGF0YTogbm90UmVjb3JkIG9yIFtub3RSZWNvcmRdLFxuXHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRodG1sOiBodG1sKHN0cmluZyksIFx0XHQvL9GC0LXQutGB0YIg0YEgaHRtbCDQutC+0LTQvtC8INGI0LDQsdC70L7QvdCwXG5cdFx0XHRlbDogSFRNTEVsZW1lbnQob2JqZWN0KSwgXHQvL0RPTSDRjdC70LXQvNC10L3RglxuXHRcdFx0c3JjOiBzcmMoc3RyaW5nKSxcdFx0XHQvL9GB0YHRi9C70LrQsCDQvdCwINGE0LDQudC7INGBINGI0LDQsdC70L7QvdC+0Lxcblx0XHRcdG5hbWU6IG5hbWUoc3RyaW5nKVx0XHRcdC8v0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCDQtNC70Y8g0L/QvtC40YHQutCwINCyINC60Y3RiNC1IG5vdFRlbXBsYXRlQ2FjaGVcblx0XHR9XG5cdFx0b3B0aW9uczp7XG5cdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHQvL9CwINGN0YLQviDQutCw0Log0LHRg9C00LXQvCDQv9C+0LzQtdGJ0LDRgtGMINGA0LXQt9GD0LvRjNGC0LDRgiDRgNC10L3QtNC10YDQuNC90LPQsFxuXHRcdFx0cmVuZGVyQW5kOiBwbGFjZVN0eWxlKHN0cmluZykg0L7QtNC40L0g0LjQtyDQstCw0YDQuNCw0L3RgtC+0LJcblx0XHRcdFx0XHRwbGFjZVx0XHQtXHTQv9C+0LzQtdGJ0LDQtdC8INCy0L3Rg9GC0YDQuCDRhtC10LvQtdCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0XHRyZXBsYWNlXHRcdC1cdNC30LDQvNC10L3Rj9C10Lxcblx0XHRcdFx0XHRwbGFjZUFmdGVyXHQtXHTQv9C+0YHQu9C1XG5cdFx0XHRcdFx0cGxhY2VCZWZvcmVcdC1cdNC00L5cblx0XHRcdFx0XHRwbGFjZUZpcnN0XHQtXHTQstC90YPRgtGA0Lgg0L/QtdGA0LLRi9C8INC00L7Rh9C10YDQvdC40Lxcblx0XHRcdFx0XHRwbGFjZUxhc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C+0YHQu9C10LTQvdC40Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdH1cblx0fVxuKi9cbmNsYXNzIG5vdENvbXBvbmVudCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpe1xuXHRcdGlmICh0aGlzLm93bmVyKXtcblx0XHRcdHJldHVybiBbLi4udGhpcy5vd25lci5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1cblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5vd25lciA9IGlucHV0Lm93bmVyP2lucHV0Lm93bmVyOm51bGw7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0RXZlbnRzKGxpc3Qpe1xuXHRcdGZvcihsZXQgdCBvZiBsaXN0KXtcblx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2lkJykpe1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdpZCcsIE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKXtcblx0XHRcdHRoaXMuaW5pdE1hcmtFbGVtZW50KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hcmtFbGVtZW50KCl7XG5cdFx0bGV0IG1hcmtFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ250Jyk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdudEVsJywgbWFya0VsKTtcblx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0cGxhY2VyLm1haW4odGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLCBbbWFya0VsXSk7XG5cdH1cblxuXHRpbml0V29ya2luZyh2YWwpIHtcblx0XHR0aGlzLnVuc2V0UmVhZHkodmFsKTtcblx0fVxuXG5cdHByZXBhcmVUZW1wbGF0ZUVsZW1lbnQodmFsKSB7XG5cdFx0aWYgKCF2YWwpIHtcblx0XHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdodG1sJykgJiYgdmFsLmh0bWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQodmFsLmVsLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZhbC5zcmMpIHtcblx0XHRcdG5vdFRlbXBsYXRlQ2FjaGUuYWRkRnJvbVVSTCh2YWwuc3JjLCB2YWwuc3JjKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpICYmIHZhbC5uYW1lKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUuZ2V0KHZhbC5uYW1lKSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JywgY29udCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRyZXNldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50JywgdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpLmNsb25lTm9kZSh0cnVlKSk7XG5cdH1cblxuXHRzZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdHJ1ZSk7XG5cdH1cblxuXHR1bnNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCBmYWxzZSk7XG5cdH1cblxuXHRpc1JlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3JlYWR5Jyk7XG5cdH1cblxuXHRjbGVhclBhcnRzKCkge1xuXHRcdC8qINC40LfQstC10YnQsNC10Lwg0L7QsSDRg9C00LDQu9C10L3QuNC4INGN0LvQtdC80LXQvdGC0L7QsiAqL1xuXHRcdGlmICh0aGlzW01FVEFfUEFSVFNdICYmIEFycmF5LmlzQXJyYXkodGhpc1tNRVRBX1BBUlRTXSkgJiYgdGhpc1tNRVRBX1BBUlRTXS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpc1tNRVRBX1BBUlRTXSkge1xuXHRcdFx0XHRpZiAodC5kZXN0cm95KXtcblx0XHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdudEVsJykgJiYgdGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZSl7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKTtcblx0XHR9XG5cdH1cblxuXHRyZXNldFBhcnRzKCkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10gPSBbXTtcblx0fVxuXG5cdGdldFBhcnRzKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfUEFSVFNdO1xuXHR9XG5cblx0YWRkUGFydCh0ZW1wbGF0ZSkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10ucHVzaCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0dGhpcy5yZW1vdmVPYnNvbGV0ZVBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHBsYWNlci5iZWZvcmUodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHRwbGFjZXIuYWZ0ZXIodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyB0YXJnZXQgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdHBsYWNlUGFydChkYXRhLCBpbmRleCl7XG5cdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSksXG5cdFx0XHRub2RlcyA9IHBhcnQuZ2V0U3Rhc2goKSxcblx0XHRcdHRhcmdldEVsLFxuXHRcdFx0bGFzdE5vZGUsXG5cdFx0XHRwbGFjZXI7XG5cdFx0aWYgKGluZGV4ID09PSAwKXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcihPUFRTLkRFRkFVTFRfUExBQ0VSX0xPT1ApO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJyk7XG5cdFx0fVxuXHRcdHBsYWNlci5tYWluKHRhcmdldEVsLCBub2Rlcyk7XG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRnZXRQbGFjZXIobWV0aG9kKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZWFyY2hpbmcgZm9yIHBsYWNlcicsIG1ldGhvZCk7XG5cdFx0aWYgKG5vdFBsYWNlcnMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbbWV0aG9kXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbT1BUUy5ERUZBVUxUX1BMQUNFUl07XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaERhdGEoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldERhdGEoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaFBhcnQoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0UGFydHMoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXRQYXJ0cygpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdNC10YHQu9C4INGBINC00LDQvdC90YvQvNC4INC90LUg0YHQstGP0LfQsNC9INGA0LXQvdC00LXRgNC10YAgLSDRgdC+0LfQtNCw0LXQvFxuXHQqL1xuXG5cdHJlbmRlclBhcnQoZGF0YSkge1xuXHRcdGlmICghdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ2NyZWF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHRsZXQgcmVuZGVyZXIgPSBuZXcgbm90UmVuZGVyZXIoe1xuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0ZW1wbGF0ZTogdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lLmJpbmQodGhpcyksXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpLFxuXHRcdFx0XHRjb21wb25lbnQ6IHRoaXNcblx0XHRcdH0pO1xuXHRcdFx0Ly9yZW5kZXJlci5vbignb2Jzb2xldGUnLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkUGFydChyZW5kZXJlcik7XG5cdFx0fWVsc2V7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHR0aGlzLnVwZGF0ZVBhcnQodGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVQYXJ0KHBhcnQpe1xuXHRcdHBhcnQudXBkYXRlKCk7XG5cdH1cblxuXHRyZW1vdmVPYnNvbGV0ZVBhcnRzKCkge1xuXHRcdC8v0LrQvtC90LLQtdC10YAg0L/QvtC40YHQuiDQsNC60YLRg9Cw0LvRjNC90YvRhSAtINGD0LTQsNC70LXQvdC40LUg0L7RgdGC0LDQu9GM0L3Ri9GFXG5cdFx0bm90Q29tbW9uLnBpcGUoXG5cdFx0XHR1bmRlZmluZWQsIC8vIHBhcnRzIHRvIHNlYXJjaCBpbiwgY2FuIGJlICd1bmRlZmluZWQnXG5cdFx0XHRbXG5cdFx0XHRcdHRoaXMuZmluZEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vZmlyc3Qgcm91bmQsIHNlYXJjaCBmb3Igb2Jzb2xldGVcblx0XHRcdFx0dGhpcy5yZW1vdmVOb3RBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL3JlbW92ZSAnZW1cblx0XHRcdF1cblx0XHQpO1xuXHR9XG5cblx0Lypcblx0XHTQtdGB0YLRjCDQtNCw0L3QvdGL0LUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDQsNC60YLRg9Cw0LvRjNC90L4sXG5cdFx00L3QtdGCINC00LDQvdC90YvRhSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINGB0YLQsNGA0YzRkVxuXHQqL1xuXG5cdGZpbmRBY3R1YWxQYXJ0cygpIHtcblx0XHRsZXQgYWN0dWFsUGFydHMgPSBbXTtcblx0XHR0aGlzLmZvckVhY2hEYXRhKChkYXRhLyosIGluZGV4Ki8pPT57XG5cdFx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKTtcblx0XHRcdGlmIChwYXJ0KXtcblx0XHRcdFx0YWN0dWFsUGFydHMucHVzaChwYXJ0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gYWN0dWFsUGFydHM7XG5cdH1cblxuXHQvKlxuXHRcdNGD0LTQsNC70Y/QtdC8INCy0YHQtSDQutGA0L7QvNC1INCw0LrRgtGD0LDQu9GM0L3Ri9GFXG5cdCovXG5cdHJlbW92ZU5vdEFjdHVhbFBhcnRzKGFjdHVhbFBhcnRzKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmIChhY3R1YWxQYXJ0cy5pbmRleE9mKHRoaXMuZ2V0UGFydHMoKVt0XSkgPT09IC0xKXtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpW3RdLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpLnNwbGljZSh0LCAxKTtcblx0XHRcdFx0dC0tO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFBhcnRCeURhdGEoZGF0YSkge1xuXHRcdGZvciAobGV0IHQgaW4gdGhpcy5nZXRQYXJ0cygpKSB7XG5cdFx0XHRpZiAodGhpcy5nZXRQYXJ0cygpW3RdLmlzRGF0YShkYXRhKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRQYXJ0cygpW3RdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tcG9uZW50O1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IgPSAnLnBhZ2UtY29udGVudCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdTX1BPU1RGSVggPSAnLmh0bWwnLFxuXHRPUFRfREVGQVVMVF9WSUVXX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCA9IHRydWUsXG5cdE9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FID0gJ01vZGVscycsXG5cdE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FID0gJ01vZGVsJyxcblx0T1BUX0RFRkFVTFRfTU9EVUxFX05BTUUgPSAnbWFpbicsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9BTkQgPSAncmVwbGFjZSc7XG5cbmNsYXNzIG5vdENvbnRyb2xsZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoYXBwKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJlYWR5OiBmYWxzZSxcblx0XHRcdHZpZXdzOiB7fSxcblx0XHRcdHZpZXdOYW1lOiBPUFRfREVGQVVMVF9WSUVXX05BTUUsXG5cdFx0XHRoZWxwZXJzOiB7fVxuXHRcdH0pO1xuXHRcdHRoaXMuc2V0RGF0YSh7fSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHtcblx0XHRcdG1vZHVsZU5hbWU6IE9QVF9ERUZBVUxUX01PRFVMRV9OQU1FLFxuXHRcdFx0Y29udGFpbmVyU2VsZWN0b3I6IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUixcblx0XHRcdHByZWZpeDogdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMubW9kdWxlJyksXG5cdFx0XHRwb3N0Zml4OiBPUFRfREVGQVVMVF9WSUVXU19QT1NURklYLFxuXHRcdFx0cmVuZGVyRnJvbVVSTDogT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMLFxuXHRcdFx0cGx1cmFsTmFtZTogT1BUX0RFRkFVTFRfUExVUkFMX05BTUUsXG5cdFx0XHRzaW5nbGVOYW1lOiBPUFRfREVGQVVMVF9TSU5HTEVfTkFNRVxuXHRcdH0pO1xuXHRcdHRoaXMub24oJ3JlYWR5JywgdGhpcy5pbml0UmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdC8qXG5cdFx0ICAgINGB0YDQsNC30YMg0LTQtdC70LDQtdC8INC00L7RgdGC0YPQv9C90YvQvNC4INC80L7QtNC10LvQuCBub3RSZWNvcmQg0LjQtyBuY2BDb250cm9sbGVyTmFtZWAg0LHRg9C00YPRgiDQtNC+0YHRgtGD0L/QvdGLINC60LDQuiB0aGlzLm5yYE1vZGVsTmFtZWBcblx0XHQqL1xuXHRcdGxldCBpbnRlcmZhY2VzID0gdGhpcy5hcHAuZ2V0SW50ZXJmYWNlcygpO1xuXHRcdHRoaXMubWFrZSA9IHt9O1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgaW50ZXJmYWNlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0dGhpcy5tYWtlW3RdID0gaW50ZXJmYWNlc1t0XTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVuZGVyKCl7XG5cdFx0dGhpcy5yZW5kZXIodGhpcy5nZXRXb3JraW5nKCd2aWV3TmFtZScpLCB0aGlzLmdldERhdGEoKSwgdGhpcy5nZXRXb3JraW5nKCdoZWxwZXJzJykpO1xuXHR9XG5cblx0cmVuZGVyKHZpZXdOYW1lID0nZGVmYXVsdCcgLyogdmlldyBuYW1lICovLCBkYXRhID0ge30gLyogZGF0YSBmb3Igbm90VGVtcGxhdGUqLyAsIGhlbHBlcnMgPSB7fS8qIGNvdWxkIGJlIG5vdCByZXByZXNlbnRlZCAqLykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0dmFyIHZpZXcgPSB0aGlzLmdldFZpZXcodmlld05hbWUpO1xuXG5cdFx0XHRpZiAodHlwZW9mIHZpZXcgPT09ICd1bmRlZmluZWQnIHx8IHZpZXcgPT09IG51bGwpIHtcblx0XHRcdFx0cmVqZWN0KCdObyB2aWV3IGZvdW5kJywgdmlld05hbWUpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZpZXcgPSBub3RDb21tb24uZXh0ZW5kKHt9LCB2aWV3KTtcblx0XHRcdFx0Ly8g0LXRgdC70LggcGxhY2Ug0L3QtSDRg9C60LDQt9Cw0L3Qviwg0YfRgtC+INCy0L7Qt9C80L7QttC90L4g0Lgg0YDQsNC30YPQvNC90L4g0L/RgNC4INC90LUg0YHRg9GJ0LXRgdGC0LLQvtCy0LDQvdC40Lhcblx0XHRcdFx0Ly8g0Y3Qu9C10LzQtdC90YLQsCwg0L3QviDQuNC30LLQtdGB0YLQvdC+0Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YDQtVxuXHRcdFx0XHRpZiAoKCh0eXBlb2Ygdmlldy50YXJnZXRFbCA9PT0gJ3VuZGVmaW5lZCcpIHx8ICh2aWV3LnRhcmdldEVsID09PSBudWxsKSkgJiYgKHR5cGVvZiB2aWV3LnRhcmdldFF1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3LnRhcmdldFF1ZXJ5ICE9PSBudWxsICYmIHZpZXcudGFyZ2V0UXVlcnkubGVuZ3RoID4gMCkpIHtcblx0XHRcdFx0XHR2aWV3LnRhcmdldEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2aWV3LnRhcmdldFF1ZXJ5KTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2aWV3LmRhdGEgPSBkYXRhO1xuXHRcdFx0XHRpZiAodHlwZW9mIHZpZXcuaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5oZWxwZXJzICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHZpZXcuaGVscGVycykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZpZXcuaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQodmlldy5oZWxwZXJzLCBoZWxwZXJzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8v0LXRgdC70Lgg0L3Rg9C20L3QviDQt9Cw0LPRgNGD0LbQsNGC0Ywg0YjQsNCx0LvQvtC90Ytcblx0XHRcdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyRnJvbVVSTCcpKSB7XG5cdFx0XHRcdFx0Ly/QuCDQsNC00YDQtdGBINC90LUg0YPQutCw0LfQsNC9XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LnRlbXBsYXRlVVJMID09PSAndW5kZWZpbmVkJyB8fCB2aWV3LnRlbXBsYXRlVVJMID09IG51bGwgfHwgdmlldy50ZW1wbGF0ZVVSTC5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHRcdFx0bGV0IHByZWZpeCA9ICh2aWV3LmNvbW1vbiA/IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLmNvbW1vbicpOiB0aGlzLmdldE1vZHVsZVByZWZpeCgpKSxcblx0XHRcdFx0XHRcdFx0bmFtZSA9ICgodHlwZW9mIHZpZXcubmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5uYW1lICE9PSBudWxsICYmIHZpZXcubmFtZS5sZW5ndGggPiAwKSA/IHZpZXcubmFtZSA6IHZpZXdOYW1lKSxcblx0XHRcdFx0XHRcdFx0cG9zdGZpeCA9IHRoaXMuZ2V0T3B0aW9ucygncG9zdGZpeCcpO1xuXHRcdFx0XHRcdFx0Ly/Qs9C10L3QtdGA0LjRgNGD0LXQvCDQsNC00YDQtdGBINC/0L4g0YjQsNCx0LvQvtC90YNcblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVVUkwgPSAgW3ByZWZpeCwgbmFtZV0uam9pbignLycpICsgcG9zdGZpeDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly/QsCDQtdGB0LvQuCDQtdGB0YLRjCDQvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwLCDRgtC+XG5cdFx0XHRcdFx0aWYgKHZpZXcuaGFzT3duUHJvcGVydHkoJ3RlbXBsYXRlTmFtZScpKSB7XG5cdFx0XHRcdFx0XHQvLy4uLlxuXHRcdFx0XHRcdFx0dmlldy50ZW1wbGF0ZU5hbWUgPSB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgdmlldy50ZW1wbGF0ZU5hbWUgKyB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0XHRkYXRhLFxuXHRcdFx0XHRcdHRlbXBsYXRlOntcblx0XHRcdFx0XHRcdG5hbWU6IHZpZXcudGVtcGxhdGVOYW1lLFxuXHRcdFx0XHRcdFx0c3JjOiB2aWV3LnRlbXBsYXRlVVJMLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOltbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1dLFxuXHRcdFx0XHRcdG9wdGlvbnM6e1xuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IHZpZXcudGFyZ2V0RWwsXG5cdFx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdFx0cmVuZGVyQW5kOiBPUFRfREVGQVVMVF9SRU5ERVJfQU5EIHx8IHZpZXcucmVuZGVyQW5kXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0fVxuXG5cdGdldEFwcCgpIHtcblx0XHRyZXR1cm4gdGhpcy5hcHA7XG5cdH1cblxuXHRzZXRNb2RlbChtb2RlbCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZWwnLCBtb2RlbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNb2RlbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdtb2RlbCcpO1xuXHR9XG5cblx0c2V0UmVhZHkodmFsID0gdHJ1ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB2YWwpO1xuXHRcdHZhbCA/IHRoaXMudHJpZ2dlcigncmVhZHknKSA6IHRoaXMudHJpZ2dlcignYnVzeScpO1xuXHR9XG5cblx0c2V0VmlldyhuYW1lLCB2aWV3KXtcblx0XHR0aGlzLnNldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpLCB2aWV3KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFZpZXdzKHZpZXdzKXtcblx0XHRmb3IobGV0IHQgaW4gdmlld3Mpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCB0KSwgdmlld3NbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFZpZXcobmFtZSA9ICdkZWZhdWx0Jyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgbmFtZSkpO1xuXHR9XG5cblx0c2V0TW9kdWxlTmFtZSh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ21vZHVsZU5hbWUnLCB2YWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kdWxlTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdtb2R1bGVOYW1lJyk7XG5cdH1cblxuXHRnZXRNb2R1bGVQcmVmaXgoKXtcblx0XHRyZXR1cm4gW3RoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZXMnKSwgdGhpcy5nZXRNb2R1bGVOYW1lKCldLmpvaW4oJy8nKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoLmpzJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi4vbm90Um91dGVyJztcblxudmFyIG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiA9IHtcblx0Y29udGVudDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmluZGV4T2YoJ2NhcGl0YWxpemUnKSA+IC0xKSB7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQudG9VcHBlckNhc2UoKTtcblx0XHR9XG5cdFx0c2NvcGUuZWxlbWVudC50ZXh0Q29udGVudCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdDtcblx0fSxcblx0YmluZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoc2NvcGUucGFyYW1zWzBdLCAoZSkgPT4ge1xuXHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0cmV0dXJuIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCh7XG5cdFx0XHRcdFx0c2NvcGUsXG5cdFx0XHRcdFx0aXRlbSxcblx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdGVcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0dmFsdWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGxpdmVFdmVudHMgPSBbJ2NoYW5nZScsICdrZXl1cCddLFxuXHRcdFx0b25FdmVudCA9ICgpID0+IHtcblx0XHRcdFx0aWYgKFsnY2hlY2tib3gnLCAncmFkaW8nLCAnc2VsZWN0LW11bHRpcGxlJ10uaW5kZXhPZihzY29wZS5lbGVtZW50LnR5cGUpID4gLTEpIHtcblx0XHRcdFx0XHRzd2l0Y2ggKHNjb3BlLmVsZW1lbnQudHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgJ2NoZWNrYm94Jzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3JhZGlvJzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkP3Njb3BlLmVsZW1lbnQudmFsdWU6bnVsbCk7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KGhlbHBlcnMuZmllbGQubmFtZSwgaGVscGVycy5kYXRhLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQgPyBzY29wZS5lbGVtZW50LnZhbHVlIDogbnVsbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdzZWxlY3QtbXVsdGlwbGUnOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRsZXQgc2VsZWN0ZWQgPSBbXS5zbGljZS5jYWxsKHNjb3BlLmVsZW1lbnQuc2VsZWN0ZWRPcHRpb25zKS5tYXAoYSA9PiBhLnZhbHVlKTtcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnc2VsZWN0LW11bHRpcGxlJywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSwgJyAtPiAnLHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSAhPT0gdHJ1ZSkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiBsaXZlRXZlbnRzKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0LCBvbkV2ZW50KTtcblx0XHRcdH1cblx0XHRcdHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0YXR0cjogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKSA/IHJlcyh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXMpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKHNjb3BlLnBhcmFtc1swXSwgc2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0fSxcblx0bmFtZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbiggLypzY29wZSwgaXRlbSwgaGVscGVycyovICkge1xuXG5cdH0sXG5cdGNoZWNrZWQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykgPyByZXN1bHQoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzdWx0KTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPyBzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpIDogc2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcblx0fSxcblx0Y2xhc3M6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlcyA9PT0gJ2Z1bmN0aW9uJykgPyByZXMoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA8IDMgfHwgaXNOYU4oc2NvcGUuYXR0cmlidXRlUmVzdWx0KSkge1xuXHRcdFx0aWYgKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgdXNlZCA9IGZhbHNlO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzY29wZS5wYXJhbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGkgPT09IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbaV0pO1xuXHRcdFx0XHRcdHVzZWQgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXVzZWQpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRvcHRpb25zOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBpID0gMCxcblx0XHRcdG9wdGlvbiA9IG51bGwsXG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9ICd2YWx1ZScsXG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9ICduYW1lJyxcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkJykgJiYgaGVscGVycy5maWVsZC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpID8gaGVscGVycy5maWVsZC5uYW1lIDogJ3ZhbHVlJztcblx0XHRzY29wZS5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIGhlbHBlcnMgIT09IG51bGwgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpICYmIGhlbHBlcnMuZGVmYXVsdCkge1xuXHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsICcnKTtcblx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGhlbHBlcnMucGxhY2Vob2xkZXI7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0dmFyIGxpYiA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxpYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKTtcblx0XHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gbGliW2ldW2xhYmVsRmllbGROYW1lXTtcblx0XHRcdFx0aWYgKGhlbHBlcnMuZmllbGQuYXJyYXkpIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdLmluZGV4T2YobGliW2ldW3ZhbHVlRmllbGROYW1lXSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSA9PT0gbGliW2ldW3ZhbHVlRmllbGROYW1lXSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aHJlZjpmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0aWYgKCFzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBub3RSb3V0ZXIuZ2V0RnVsbFJvdXRlKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdG5vdFJvdXRlci5uYXZpZ2F0ZShub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5ub3RSb3V0ZXJJbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fVxuXHR9XG59O1xuZXhwb3J0IGRlZmF1bHQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliO1xuIiwiaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfRk9STV9QUkVGSVggPSAnZm9ybV8nLFxuXHRPUFRfREVGQVVMVF9ST0xFX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX0ZPUk1fVElUTEUgPSAnRm9ybSBkZWZhdWx0IHRpdGxlJyxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiA9IHtcblxuXHR9LFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCA9IFsnb3B0aW9ucycsICdtYW5pZmVzdCcsICdhcHAnXTtcblxuY2xhc3Mgbm90Rm9ybSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygncHJlZml4JywgT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgpO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudHMnLCBbXSk7XG5cdFx0aWYgKCF0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5zZXREYXRhKG5ldyBub3RSZWNvcmQoe30sIHRoaXMuZ2V0RGF0YSgpKSk7XG5cdFx0fVxuXHRcdHRoaXMub24oJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbigncmVzZXQnLCB0aGlzLm9uUmVzZXQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2FuY2VsJywgdGhpcy5vbkNhbmNlbC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCk7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKCkge1xuXHRcdGxldCBtYW5pZmVzdCA9IHRoaXMuZ2V0TWFuaWZlc3QoKTtcblx0XHRpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QuYWN0aW9ucykge1xuXHRcdFx0cmV0dXJuIG1hbmlmZXN0LmFjdGlvbnMuaGFzT3duUHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKSkgPyBtYW5pZmVzdC5hY3Rpb25zW3RoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJyldIDogbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Rm9ybUZpZWxkc0xpc3QoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKSxcblx0XHRcdGxpc3QgPSBbXSxcblx0XHRcdHJvbGUgPSB0aGlzLmdldE9wdGlvbnMoJ3JvbGUnLCBPUFRfREVGQVVMVF9ST0xFX05BTUUpO1xuXHRcdGlmIChhY3Rpb25EYXRhKSB7XG5cblx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcykge1xuXHRcdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMuaGFzT3duUHJvcGVydHkocm9sZSkpIHtcblx0XHRcdFx0XHRsaXN0ID0gYWN0aW9uRGF0YS5maWVsZHNbcm9sZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHQvKlxuXHRcdFJlbmRlcmluZ1xuXHQqL1xuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0fVxuXG5cdGdldFBhcnRUZW1wbGF0ZU5hbWUoZm9ybVBhcnQpe1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgZm9ybVBhcnQ7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBpbnB1dCA9IHtcblx0XHRcdFx0ZGF0YTogdGhpcy5nZXRXcmFwcGVyRGF0YSgpLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZSgnd3JhcHBlcicpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdGlkOiB0aGlzLmdldE9wdGlvbnMoJ2lkJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgdGhpcy5iaW5kRm9ybUV2ZW50cy5iaW5kKHRoaXMpXSxcblx0XHRcdFx0XHRbWydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fTtcblx0XHRcdGxldCB3cmFwcGVyID0gbmV3IG5vdENvbXBvbmVudChpbnB1dCk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3dyYXBwZXInLCB3cmFwcGVyKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXcmFwcGVyRGF0YSgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpO1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogYWN0aW9uRGF0YS50aXRsZSA/IGFjdGlvbkRhdGEudGl0bGUgOiBPUFRfREVGQVVMVF9GT1JNX1RJVExFXG5cdFx0fTtcblx0fVxuXG5cdHJlbmRlckNvbXBvbmVudHMoKSB7XG5cblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykgJiYgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoKXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRsZXQgZmllbGROYW1lID0gdGhpcy5nZXRGb3JtRmllbGRzTGlzdCgpW3RdO1xuXHRcdFx0XHR0aGlzLmFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xlYXJGaWVsZHNDb21wb25lbnRzKCkge1xuXHRcdGxldCBjb21wcyA9IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpO1xuXHRcdHdoaWxlIChjb21wcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb21wc1swXS5jb21wb25lbnQuZGVzdHJveSgpO1xuXHRcdFx0Y29tcHMuc3BsaWNlKDAsIDEpO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpYnMoKXtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0b3B0aW9uczoge30sXG5cdFx0XHRtYW5pZmVzdDoge30sXG5cdFx0XHRhcHA6IHt9LFxuXHRcdH07XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJykpIHtcblx0XHRcdHJlc3VsdC5vcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKG5vdENvbW1vbi5nZXRBcHAoKSAmJiBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJykpe1xuXHRcdFx0cmVzdWx0LmFwcCA9IG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkICYmIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkpe1xuXHRcdFx0cmVzdWx0Lm1hbmlmZXN0ID0gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKS5maWVsZHM7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSkge1xuXHRcdGxldCBkZWYgPSBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OLFxuXHRcdFx0ZmllbGRzTGlicyA9IHRoaXMuZ2V0RmllbGRzTGlicygpO1xuXHRcdGZvcihsZXQgdCBvZiBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCl7XG5cdFx0XHRpZiAoZmllbGRzTGlicy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBmaWVsZHNMaWJzW3RdLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpe1xuXHRcdFx0XHRyZXR1cm4gZmllbGRzTGlic1t0XVtmaWVsZE5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0YWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKSB7XG5cdFx0bGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpO1xuXHRcdGxldCByZWMgPSB7XG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRuYW1lOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHRpdGxlOiBmaWVsZFR5cGUubGFiZWwgfHwgZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHR0eXBlOiBmaWVsZFR5cGUudHlwZSxcblx0XHRcdFx0bGFiZWw6IGZpZWxkVHlwZS5sYWJlbCxcblx0XHRcdFx0YXJyYXk6IGZpZWxkVHlwZS5hcnJheSxcblx0XHRcdFx0ZGVmYXVsdDogZmllbGRUeXBlLmRlZmF1bHQsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ2hlbHBlcnMnLCdsaWJzJyxmaWVsZE5hbWUpKVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0bGV0IGhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdGlzQ2hlY2tlZDogKHBhcmFtcyk9Pntcblx0XHRcdFx0cmV0dXJuIHBhcmFtcy5pdGVtLnZhbHVlID09PSB0aGlzLmdldERhdGEoZmllbGROYW1lKTtcblx0XHRcdH0sXG5cdFx0XHRmaWVsZDogcmVjLmZpZWxkLFxuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKClcblxuXHRcdH0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblx0XHRyZWMuY29tcG9uZW50ID0gbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZShmaWVsZFR5cGUudHlwZSlcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldEZvcm1UYXJnZXRFbGVtZW50KGZpZWxkVHlwZS50YXJnZXQpLFxuXHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUxhc3QnLFxuXHRcdFx0XHRldmVudHM6W1xuXHRcdFx0XHRcdFsnYWZ0ZXJEYXRhQ2hhbmdlJywgdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5wdXNoKHJlYyk7XG5cdH1cblxuXHRjb2xsZWN0RGF0YUZyb21Db21wb25lbnRzKHBhcmFtcyl7XG5cdFx0bm90Q29tbW9uLmxvZygnY29sbGVjdCBkYXRhIGZyb20gY29tcG9uZW50cycsIHBhcmFtcyk7XG5cdH1cblxuXHRnZXRGb3JtVGFyZ2V0RWxlbWVudCh0YXJnZXQgPSAnYm9keScpe1xuXHRcdGlmICghdGFyZ2V0KXt0YXJnZXQgPSAnYm9keSc7fVxuXHRcdGxldCByZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdGlmICghcmVzICYmIHRhcmdldCE9PSdib2R5Jyl7XG5cdFx0XHR0YXJnZXQgPSAnYm9keSc7XG5cdFx0XHRyZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdH1cblx0XHRpZighcmVzICYmIHRhcmdldD09J2JvZHknKXtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gcmVzO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0RGF0YSBtYW5hZ2VtZW50XG5cdCovXG5cblx0Y29sbGVjdERhdGEoKSB7XG5cdFx0bGV0IGRhdGEgPSB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKVxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCkge1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpIHtcblxuXHR9XG5cblx0b25SZXNldCgpIHtcblxuXHR9XG5cblx0Z2V0RmllbGRzKCkge1xuXG5cdH1cblxuXHRhZGRGaWVsZCgpIHtcblxuXHR9XG5cblx0cmVtb3ZlRmllbGQoKSB7XG5cblx0fVxuXG5cdGJpbmRGb3JtRXZlbnRzKCl7XG5cdFx0bGV0IGZvcm0gPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXHRcdGlmKGZvcm0pe1xuXHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Rm9ybTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX1BBR0VfU0laRSA9IDIwLFxuXHRPUFRfREVGQVVMVF9QQUdFX05VTUJFUiA9IDEwO1xuXG5jbGFzcyBub3RUYWJsZSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudCcpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgY29tcG9uZW50ID0gbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6ICd0YWJsZV93cmFwcGVyJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgJ2FmdGVyVXBkYXRlJ10sIHRoaXMucmVuZGVySW5zaWRlLmJpbmQodGhpcylcblx0XHRcdFx0XHRdXG5cdFx0XHRcdF1cblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBjb21wb25lbnQpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlckluc2lkZSgpIHtcblx0XHR0aGlzLnJlbmRlckhlYWRlcigpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHRcdHRoaXMucmVuZGVyQm9keSgpO1xuXHRcdHRoaXMuYmluZFNlYXJjaCgpO1xuXHRcdHRoaXMuYmluZEN1c3RvbUJpbmRpbmdzKCk7XG5cdH1cblxuXHRyZW5kZXJIZWFkZXIoKSB7XG5cdFx0dmFyIHRhYmxlSGVhZGVyID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIHRyJyk7XG5cdFx0aWYgKCF0YWJsZUhlYWRlcikgcmV0dXJuO1xuXHRcdGxldCBmaWVsZHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgbmV3VGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUSCcpO1xuXHRcdFx0bmV3VGguaW5uZXJIVE1MID0gZmllbGRzW2ldLnRpdGxlO1xuXHRcdFx0bmV3VGguZGF0YXNldC5kYXRhRmllbGROYW1lID0gZmllbGRzW2ldLnBhdGg7XG5cdFx0XHRuZXdUaC5kYXRhc2V0LnNvcnRpbmdEaXJlY3Rpb24gPSAwO1xuXHRcdFx0aWYgKGZpZWxkc1tpXS5oYXNPd25Qcm9wZXJ0eSgnc29ydGFibGUnKSAmJiBmaWVsZHNbaV0uc29ydGFibGUpIHtcblx0XHRcdFx0dGhpcy5hdHRhY2hTb3J0aW5nSGFuZGxlcnMobmV3VGgpO1xuXHRcdFx0fVxuXHRcdFx0dGFibGVIZWFkZXIuYXBwZW5kQ2hpbGQobmV3VGgpO1xuXHRcdH1cblx0fVxuXG5cdGF0dGFjaFNvcnRpbmdIYW5kbGVycyhoZWFkQ2VsbCkge1xuXHRcdGhlYWRDZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuY2hhbmdlU29ydGluZ09wdGlvbnMoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblx0XHRoZWFkQ2VsbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdH1cblxuXHRjaGFuZ2VTb3J0aW5nT3B0aW9ucyhlbCkge1xuXHRcdGlmIChwYXJzZUludChlbC5kYXRhc2V0LnNvcnRpbmdEaXJlY3Rpb24pID09PSAwKSB7XG5cdFx0XHRlbC5kYXRhc2V0LnNvcnRpbmdEaXJlY3Rpb24gPSAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5kYXRhc2V0LnNvcnRpbmdEaXJlY3Rpb24gPSBwYXJzZUludChlbC5kYXRhc2V0LnNvcnRpbmdEaXJlY3Rpb24pICogLTE7XG5cdFx0fVxuXHRcdGlmIChlbC5wYXJlbnROb2RlKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsLnBhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0gPT09IGVsKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAocGFyc2VJbnQoZWwuZGF0YXNldC5zb3J0aW5nRGlyZWN0aW9uKSA+IDApIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ2FzY2VuZGluZycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdkZXNjZW5kaW5nJyk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdHNvcnREaXJlY3Rpb246IGVsLmRhdGFzZXQuc29ydGluZ0RpcmVjdGlvbixcblx0XHRcdHNvcnRCeUZpZWxkOiBlbC5kYXRhc2V0LmRhdGFGaWVsZE5hbWVcblx0XHR9KTtcblx0fVxuXG5cdHNldFNvcnRlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBoYXNoKTtcblx0XHR0aGlzLmludmFsaWRhdGVEYXRhKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRnZXRTb3J0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc29ydGVyJyk7XG5cdH1cblxuXHRnZXRGaWx0ZXJTZWFyY2goKSB7XG5cdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5nZXRGaWx0ZXIoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRGaWx0ZXIoKSAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2ggIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoICE9PSBudWxsKSA/IHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoLnRvU3RyaW5nKCkgOiAnJztcblx0fVxuXG5cdGludmFsaWRhdGVEYXRhKCkge1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2xpdmVMb2FkJykgJiYgdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpKSB7XG5cdFx0XHR3aGlsZSh0aGlzLmdldERhdGEoJ3Jvd3MnKS5sZW5ndGg+MCl7XG5cdFx0XHRcdHRoaXMuZ2V0RGF0YSgncm93cycpLnBvcCgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5yZXNldFBhZ2VyKCk7XG5cdFx0fVxuXHR9XG5cblx0c2V0RmlsdGVyKGhhc2gpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcicsIGhhc2gpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZURhdGEoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VyKGhhc2gpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3BhZ2VyJywgaGFzaCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldFBhZ2VyKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncGFnZXInLCB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRPcHRpb25zKCdwYWdlU2l6ZScpID8gdGhpcy5nZXRPcHRpb25zKCdwYWdlU2l6ZScpIDogT1BUX0RFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRPcHRpb25zKCdwYWdlTnVtYmVyJykgPyB0aGlzLmdldE9wdGlvbnMoJ3BhZ2VOdW1iZXInKSA6IE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncGFnZXInKTtcblx0fVxuXG5cdHNldFVwZGF0aW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndXBkYXRpbmcnLCB0cnVlKTtcblx0fVxuXG5cdHNldFVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCd1cGRhdGluZycsIGZhbHNlKTtcblx0fVxuXG5cdGlmVXBkYXRpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndXBkYXRpbmcnKTtcblx0fVxuXG5cdHVwZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKSB7XG5cdFx0XHRpZiAodGhpcy5pZlVwZGF0aW5nKCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly9sb2FkIGZyb20gc2VydmVyXG5cdFx0XHRsZXQgcXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKHt9KS5zZXRGaWx0ZXIodGhpcy5nZXRGaWx0ZXIoKSkuc2V0U29ydGVyKHRoaXMuZ2V0U29ydGVyKCkpLnNldFBhZ2VyKHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSwgdGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpO1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0cXVlcnkuJGxpc3QoKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCckbGlzdCBmb3IgdGFibGUnLCBkYXRhKTtcblx0XHRcdFx0XHR0aGlzLmdldERhdGEoJ3Jvd3MnKS5jb25jYXQoZGF0YSk7XG5cdFx0XHRcdFx0dGhpcy5wcm9jY2Vzc0RhdGEoKTtcblx0XHRcdFx0XHR0aGlzLnJlZnJlc2hCb2R5KCk7XG5cdFx0XHRcdFx0dGhpcy5zZXRVcGRhdGVkKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XG5cdFx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvL2xvY2FsIG1hZ2ljXG5cdFx0XHR0aGlzLnByb2NjZXNzRGF0YSgpO1xuXHRcdFx0dGhpcy5yZWZyZXNoQm9keSgpO1xuXHRcdH1cblx0fVxuXG5cdHByb2NjZXNzRGF0YSgpIHtcblx0XHR2YXIgdGhhdEZpbHRlciA9IHRoaXMuZ2V0RmlsdGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0RmlsdGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyICE9PSBudWxsICYmIHR5cGVvZiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2ggIT09IG51bGwgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2gubGVuZ3RoID4gMCkge1xuXHRcdFx0Ly9cblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgdGhpcy5nZXREYXRhKCdyb3dzJykuZmlsdGVyKHRoaXMudGVzdERhdGFJdGVtLmJpbmQodGhpcykpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKSk7XG5cdFx0fVxuXHRcdC8vLy9zb3J0ZXJcblx0XHR2YXIgdGhhdFNvcnRlciA9IHRoaXMuZ2V0U29ydGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0U29ydGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0U29ydGVyICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4ge1xuXHRcdFx0XHRpZiAoaXNOYU4obm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCwgaXRlbTEsIHt9KSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gbm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCwgaXRlbTEsIHt9KS5sb2NhbGVDb21wYXJlKG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsaXRlbTIse30pKSAqIC10aGF0U29ydGVyLnNvcnREaXJlY3Rpb247XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuICgobm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCwgaXRlbTEsIHt9KSA8IG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsIGl0ZW0yLCB7fSkpID8gMSA6IC0xKSAqIHRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0YmluZFNlYXJjaCgpIHtcblx0XHR2YXIgc2VhcmNoRWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInNlYXJjaFwiXScpWzBdO1xuXHRcdGlmICghc2VhcmNoRWwpIHJldHVybjtcblx0XHR2YXIgb25FdmVudCA9IChlKSA9PiB7XG5cdFx0XHR0aGlzLnNldEZpbHRlcih7XG5cdFx0XHRcdGZpbHRlclNlYXJjaDogZS5jdXJyZW50VGFyZ2V0LnZhbHVlXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH07XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbkV2ZW50KTtcblx0XHRzZWFyY2hFbC5hZGRFdmVudExpc3RlbmVyKCdlbnRlcicsIG9uRXZlbnQpO1xuXHR9XG5cblxuXHRiaW5kQ3VzdG9tQmluZGluZ3MoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykgfHwgIXRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IgKHZhciBzZWxlY3RvciBpbiB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHZhciBlbHMgPSB0aGlzLmdldE9wdGlvbigndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdGZvciAodmFyIGVsSWQgPSAwOyBlbElkIDwgZWxzLmxlbmd0aDsgZWxJZCsrKSB7XG5cdFx0XHRcdHZhciBlbCA9IGVsc1tlbElkXTtcblx0XHRcdFx0Zm9yICh2YXIgZXZlbnQgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpW3NlbGVjdG9yXSkge1xuXHRcdFx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl1bZXZlbnRdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cblx0bG9hZE5leHQoKSB7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdwYWdlcicpLnBhZ2VOdW1iZXIrKztcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlbmRlclJvdyhpdGVtLCBpbmRleCkge1xuXHRcdGxldCBuZXdSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUUicpLFxuXHRcdFx0ZmllbGRzID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IG5ld1RkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEQnKSxcblx0XHRcdFx0ZmllbGQgPSBmaWVsZHNbaV0sXG5cdFx0XHRcdHZhbCA9IG5vdFBhdGguZ2V0KGZpZWxkLnBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZWRpdGFibGUnKSkge1xuXHRcdFx0XHRuZXdUZC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRFZGl0YWJsZScsIHRydWUpO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0LnBhdGggPSBmaWVsZC5wYXRoO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0Lml0ZW1JZCA9IGl0ZW1bdGhpcy5nZXRPcHRpb25zKCdpdGVtSWRGaWVsZCcpXTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC52YWx1ZSA9IHZhbDtcblx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChlKT0+e1xuXHRcdFx0XHRcdG5vdFBhdGguc2V0KGZpZWxkLnBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLCBuZXdUZC50ZXh0Q29udGVudCk7XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdwcm9jY2Vzc29yJykpIHtcblx0XHRcdFx0bmV3VGQuaW5uZXJIVE1MID0gZmllbGQucHJvY2Nlc3Nvcih2YWwsIGl0ZW0sIGluZGV4KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ld1RkLmlubmVySFRNTCA9IHZhbDtcblx0XHRcdH1cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykgJiYgZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdGZvciAodmFyIGogaW4gZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcihqLCAoZSk9Pntcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHJldHVybiBmaWVsZC5ldmVudHNbal0oe1xuXHRcdFx0XHRcdFx0XHRldmVudDogZSxcblx0XHRcdFx0XHRcdFx0ZWxlbWVudDogbmV3VGQsXG5cdFx0XHRcdFx0XHRcdGl0ZW06IGl0ZW0sXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB2YWwsXG5cdFx0XHRcdFx0XHRcdGZpZWxkOiBmaWVsZFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRuZXdSb3cuYXBwZW5kQ2hpbGQobmV3VGQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdwcm9jUm93JykpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3Byb2NSb3cnKShuZXdSb3csIGl0ZW0pO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3Um93O1xuXHR9XG5cblx0cmVmcmVzaEJvZHkoKSB7XG5cdFx0dmFyIHRib2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXHRcdGlmICghdGJvZHkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5jbGVhckJvZHkoKTtcblx0XHR2YXIgdGhpc1BhZ2VTdGFydHMgPSAwLFxuXHRcdFx0bmV4dFBhZ2VFbmRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyICsgMSk7XG5cdFx0Zm9yICh2YXIgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0dGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJSb3codGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKVtpXSkpO1xuXHRcdH1cblx0fVxuXG5cdGZpbmRCb2R5KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGJvZHknKTtcblx0fVxuXG5cdGNsZWFyQm9keSgpIHtcblx0XHR2YXIgdGFibGVCb2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXHRcdGlmICghdGFibGVCb2R5KSByZXR1cm47XG5cdFx0dGFibGVCb2R5LmlubmVySFRNTCA9ICcnO1xuXHR9XG5cblx0cmVuZGVyQm9keSgpIHtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnb25lUGFnZXInKSkge1xuXHRcdFx0dGhpcy5jbGVhckJvZHkoKTtcblx0XHR9XG5cdFx0dmFyIHRoaXNQYWdlU3RhcnRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyKSxcblx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpLFxuXHRcdFx0dGJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0Zm9yICh2YXIgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0dGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJSb3codGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKVtpXSkpO1xuXHRcdH1cblx0fVxuXG5cdHRlc3REYXRhSXRlbShpdGVtKXtcblx0ICAgIHZhciBzdHJWYWx1ZSA9IHRoaXMuZ2V0RmlsdGVyU2VhcmNoKCkudG9Mb3dlckNhc2UoKTtcblx0ICAgIGZvcih2YXIgayBpbiBpdGVtKXtcblx0ICAgICAgICB2YXIgdG9Db21wID0gaXRlbVtrXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG5cdCAgICAgICAgaWYgKHRvQ29tcC5pbmRleE9mKHN0clZhbHVlKT4tMSl7XG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBmYWxzZTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFRhYmxlO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG4vL2ltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuLy9pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmNsYXNzIG5vdFZpZXcgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhpbnB1dC5vcHRpb25zIHx8IHt9KTtcblx0XHR0aGlzLnNldERhdGEoaW5wdXQuZGF0YSB8fCB7fSk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKGlucHV0LndvcmtpbmcgfHwge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90VmlldztcbiIsIi8qXG5cdENvbW1vbiBmdW5jdGlvbnNcbiovXG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbi8qXG5cdGZyYW1ld29yayB3aWRlIHBhcnNlciBmb3IgZGF0YSBhY2Nlc3NcbiovXG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuL25vdFJvdXRlcic7XG5cbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuLypcblx0YmFzaWMgZXZlbnQgaGFuZGxlcnMgYW5kIGNvcmUgZGF0YSBtb2RpZmllcnNcbiovXG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuLypcblx0c21hcnRlciBpbWFnZSBjb250cm9sXG4qL1xuaW1wb3J0IG5vdEltYWdlIGZyb20gJy4vdGVtcGxhdGUvbm90SW1hZ2UnO1xuLypcblx0YXBwbGljYXRpb24gbWFpbiBpbmZyYXN0cnVjdHVyZSBzZXR0ZXJcbiovXG5pbXBvcnQgbm90QXBwIGZyb20gJy4vbm90QXBwJztcbi8qXG5cdGRhZGR5IGZvciB1c2VyIGNvbnRyb2xsZXJzXG4qL1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi9ub3RDb250cm9sbGVyJztcbi8qXG5cdHRlbXBsYXRpbmcgYW5kIGNvbW1vbiBzdHJ1Y3R1cmVzXG4qL1xuXG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RSZW5kZXJlcic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnOyAvLyBzbWFydGVyIHdpdGggYmluZGluZ3MgZm9yIGV2ZW50cywgYWN0dWFseSBwcm94eVxuXG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbm90Rm9ybSc7XG5pbXBvcnQgbm90VGFibGUgZnJvbSAnLi9jb21wb25lbnRzL25vdFRhYmxlJztcbmltcG9ydCBub3RWaWV3IGZyb20gJy4vY29tcG9uZW50cy9ub3RWaWV3JztcblxuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7IC8vXHRob3cgdG8gaW50ZXJhY3Qgd2l0aCBkYXRhIG9uIHNlcnZlclxuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7IC8vXHR3cmFwcGVyIGZvciBkYXRhIHdpdGggc2VydmVyPC0+dmlldyBsaXZlIGludGVyYWN0aW9uc1xuXG5ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuYWRkKG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYik7XG5cbmV4cG9ydCB7XG5cdG5vdENvbW1vbixcblx0bm90UGF0aCxcblx0bm90QmFzZSxcblx0bm90SW1hZ2UsXG5cdG5vdEFwcCxcblx0bm90QVBJLFxuXHRub3RDb250cm9sbGVyLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnMsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYixcblx0bm90VGVtcGxhdGVDYWNoZSxcblx0bm90UmVuZGVyZXIsXG5cdG5vdENvbXBvbmVudCxcblx0bm90Rm9ybSxcblx0bm90Um91dGVyLFxuXHRub3RUYWJsZSxcblx0bm90Vmlldyxcblx0bm90UmVjb3JkLFxuXHRub3RSZWNvcmRJbnRlcmZhY2Vcbn07XG4iXSwibmFtZXMiOlsiQ29tbW9uTmV0d29yayIsInVyaSIsImdldCIsImRhdGFBcnJheSIsImZpZWxkcyIsImkiLCJmIiwiaGFzT3duUHJvcGVydHkiLCJpbWFnZSIsIkltYWdlIiwic2V0QXR0cmlidXRlIiwic3JjIiwiaW5kZXhPZiIsImFkZFByb3RvY29sIiwibWV0aG9kIiwidXJsIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsImdldFNlc3Npb25JRCIsInJlc3BvbnNlVHlwZSIsIndpdGhDcmVkZW50aWFscyIsIm9ubG9hZCIsInN0YXR1cyIsInJlc3BvbnNlIiwidCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlSW50IiwicmVzcG9uc2VUZXh0IiwiZSIsIm5hbWUiLCJnZXRDb29raWUiLCJ2YWx1ZSIsImRvY3VtZW50IiwiY29va2llIiwicGFydHMiLCJzcGxpdCIsImxlbmd0aCIsInBvcCIsInNoaWZ0IiwiQ29tbW9uTG9ncyIsImxvZyIsImFyZ3VtZW50cyIsImVycm9yIiwidHJhY2UiLCJNQU5BR0VSIiwiU3ltYm9sIiwiQ29tbW9uU2hvcnRzIiwiZ2V0TWFuYWdlciIsImdldEFQSSIsInYiLCJDb21tb25PYmplY3RzIiwiZGVmYXVsdHMiLCJvcHRpb25zIiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiY2FsbCIsInRhcmdldCIsInNvdXJjZXMiLCJmb3JFYWNoIiwiZGVzY3JpcHRvcnMiLCJrZXlzIiwic291cmNlIiwicmVkdWNlIiwia2V5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZGVzY3JpcHRvciIsInN5bSIsImVudW1lcmFibGUiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiYmlnIiwic21hbGwiLCJvYmoiLCJmaWx0ZXIiLCJjb250YWluc09iaiIsImljb25zIiwiYmF0Y2giLCJnZXREYXRhIiwicHVzaCIsImEiLCJiIiwicCIsImVxdWFsIiwidG9TdHJpbmciLCJkZWZhdWx0VmFsdWUiLCJvYmoxIiwib2JqMiIsImpRdWVyeSIsImV4dGVuZCIsInZhbCIsInJlZ2lzdHJ5IiwiQ29tbW9uU3RyaW5ncyIsInN0cmluZyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsIkNvbW1vbkZ1bmN0aW9ucyIsImZ1bmNzIiwicmVzdWx0IiwiZnVuYyIsIkNvbW1vbkRPTSIsImVsIiwic3RhcnRzV2l0aCIsImFsbEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImxpc3QiLCJqIiwiYXR0cyIsImF0dHJpYnV0ZXMiLCJuIiwibm9kZU5hbWUiLCJDb21tb25BcHAiLCJzdGFydGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm5vdENvbW1vbiIsImFzc2lnbiIsImV4dGVuZFdpdGgiLCJTVUJfUEFUSF9TVEFSVCIsIlNVQl9QQVRIX0VORCIsIlBBVEhfU1BMSVQiLCJQQVRIX1NUQVJUX09CSkVDVCIsIlBBVEhfU1RBUlRfSEVMUEVSUyIsIkZVTkNUSU9OX01BUktFUiIsIk1BWF9ERUVQIiwibm90UGF0aCIsInBhdGgiLCJzdWJQYXRoIiwiZmluZCIsInN1YiIsInBhcnNlZCIsInN1YmYiLCJyZXBsYWNlIiwiaXRlbSIsImhlbHBlcnMiLCJzdWJQYXRoUGFyc2VkIiwiZmluZE5leHRTdWJQYXRoIiwiZ2V0VmFsdWVCeVBhdGgiLCJyZXBsYWNlU3ViUGF0aCIsInBhcnNlU3VicyIsImF0dHJWYWx1ZSIsInNldFZhbHVlQnlQYXRoIiwiaXNSZWNvcmQiLCJub3JtaWxpemVQYXRoIiwidHJpZ2dlciIsInNldCIsInN0ZXAiLCJoZWxwZXIiLCJyU3RlcCIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsInBhcnNlUGF0aFN0ZXAiLCJvYmplY3QiLCJhdHRyUGF0aCIsImF0dHJOYW1lIiwiaXNGdW5jdGlvbiIsIm5ld09iaiIsImFyZ3MiLCJqb2luIiwiTUVUQV9NRVRIT0RfSU5JVCIsIk1FVEFfRVZFTlRTIiwiTUVUQV9EQVRBIiwiTUVUQV9XT1JLSU5HIiwiTUVUQV9PUFRJT05TIiwibm90QmFzZSIsImlucHV0IiwiZXZlbnRzIiwib24iLCJzZXREYXRhIiwic2V0V29ya2luZyIsIndvcmtpbmciLCJzZXRPcHRpb25zIiwid2hhdCIsInJlcyIsInNldENvbW1vbiIsImdldENvbW1vbiIsImdldE9wdGlvbnMiLCJnZXRXb3JraW5nIiwiZXZlbnROYW1lcyIsImV2ZW50Q2FsbGJhY2tzIiwib25jZSIsImRlZmluZUlmTm90RXhpc3RzIiwiZnJvbSIsImV2ZW50TmFtZSIsImV2ZW50Iiwib2ZmIiwiY2FsbGJhY2tzIiwiY2FsbGJhY2siLCJ0YXJnZXRJZCIsInNwbGljZSIsIk9QVF9NT0RFX0hJU1RPUlkiLCJPUFRfTU9ERV9IQVNIIiwiT1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwiLCJub3RSb3V0ZXIiLCJyb290IiwiY2xlYXJTbGFzaGVzIiwicmUiLCJoYW5kbGVyIiwicnVsZSIsImFkZCIsInBhcmFtIiwiciIsImZyYWdtZW50IiwibG9jYXRpb24iLCJkZWNvZGVVUkkiLCJwYXRobmFtZSIsInNlYXJjaCIsIndpbmRvdyIsIm1hdGNoIiwiaHJlZiIsImN1cnJlbnQiLCJnZXRGcmFnbWVudCIsImluaXQiLCJpc0luaXRpYWxpemVkIiwiY2hlY2siLCJzZXRJbml0aWFsaXplZCIsImxvb3BJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2hlY2tMb2NhdGlvbiIsImJpbmQiLCJocmVmQ2xpY2siLCJmdWxsUkUiLCJhcHBseSIsImhvc3QiLCJnZXRGdWxsUm91dGUiLCJwdXNoU3RhdGUiLCJub3RBUElPcHRpb25zIiwibm90QVBJUXVlZSIsInJlcXVlc3RzUGVyU2Vjb25kIiwicXVlZSIsImludCIsImluUHJvZ3Jlc3MiLCJ0b0NhbGwiLCJjbGVhckludGVydmFsIiwicnVuIiwibm90QVBJIiwiaWQiLCJnb29kIiwiYmFkIiwibWFrZVJlcXVlc3QiLCJyZXNwb25zZU9LIiwicmVzcG9uc2VGYWlsZWQiLCJyZXF1ZXN0SlNPTiIsInRoZW4iLCJuZXh0IiwiY2F0Y2giLCJjb2RlIiwiZ2V0SWQiLCJtb2RlbE5hbWUiLCJnZXRNb2RlbE5hbWUiLCJtYWtlVXJsIiwiZ2V0SlNPTiIsImdldE1vZGVsIiwic2V0UHJpY2UiLCJtb2RlbCIsIm5vdEltYWdlIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYIiwiVEVNUExBVEVfVEFHIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgiLCJDT01QT05FTlRfSURfUFJFRklYIiwiUEFSVF9JRF9QUkVGSVgiLCJERUZBVUxUX1BMQUNFUiIsIkRFRkFVTFRfUExBQ0VSX0xPT1AiLCJPUFRTIiwiTUVUQV9DQUNIRSIsIm5vdFRlbXBsYXRlQ2FjaGUiLCJoaWRlVGVtcGxhdGVzIiwicmVnaXN0ZXIiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibWFwIiwibG9hZE9uZSIsIm9SZXF1ZXN0IiwiZGl2IiwiZGF0YXNldCIsIm5vdFRlbXBsYXRlTmFtZSIsIm5vdFRlbXBsYXRlVVJMIiwic3JjRWxlbWVudCIsInNldE9uZSIsImVsZW1lbnQiLCJjbG9uZU5vZGUiLCJjb250IiwidGV4dCIsIm5vdFRlbXBsYXRlc0VsZW1lbnRzIiwiZWxJZCIsInBhcmVudE5vZGUiLCJsaWIiLCJnZXRIVE1MIiwidGVtcGxhdGVJbm5lckhUTUwiLCJ0ZW1wbGF0ZUNvbnRFbCIsIndyYXAiLCJ0ZW1wbGF0ZXNIVE1MIiwidGVtcGxhdGVzIiwicGFyc2VMaWIiLCJhZGRMaWIiLCJzZWxlY3Rvck9yRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0YWdOYW1lIiwiT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSIsIm5vdEludGVyZmFjZSIsIm1hbmlmZXN0IiwibGluZSIsInJlY29yZCIsImFjdGlvbk5hbWUiLCJyZWNvcmRSRSIsImZpZWxkTmFtZSIsImluZCIsImxlbiIsImluZDIiLCJzdGFydFNsaWNlIiwiZW5kU2xpY2UiLCJnZXRBdHRyIiwiYWN0aW9uRGF0YSIsInBhcnNlTGluZSIsInBvc3RGaXgiLCJyZXN1bHRJZCIsImluZGV4IiwiY29uY2F0IiwiZ2V0QWN0aW9ucyIsImFjdGlvbnMiLCJzZXRGaWx0ZXIiLCJmaWx0ZXJEYXRhIiwic2V0TW9kZWxQYXJhbSIsImdldE1vZGVsUGFyYW0iLCJzb3J0ZXJEYXRhIiwicGFnZU51bWJlciIsInBhZ2VTaXplIiwicGFyYW1OYW1lIiwicGFyYW1WYWx1ZSIsImdldEFjdGlvbkRhdGEiLCJnZXRJRCIsImdldFVSTCIsInF1ZWVSZXF1ZXN0Iiwib25Mb2FkIiwibm90UmVjb3JkIiwiTUVUQV9JTlRFUkZBQ0UiLCJNRVRBX1BST1hZIiwiTUVUQV9DSEFOR0UiLCJNRVRBX0NIQU5HRV9ORVNURUQiLCJNRVRBX1NBTCIsIkRFRkFVTFRfQUNUSU9OX1BSRUZJWCIsIkRFRkFVTFRfUEFHRV9OVU1CRVIiLCJERUZBVUxUX1BBR0VfU0laRSIsIk1FVEFfUkVUVVJOX1RPX1JPT1QiLCJjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzIiwib3duZXIiLCJjb250ZXh0IiwicmVzVGFyZ2V0IiwiUmVmbGVjdCIsIkVycm9yIiwidmFsdWVUb1JlZmxlY3QiLCJub3RQcm9wZXJ0eSIsImdldFJvb3QiLCJwYXRoVG8iLCJpc1Byb3h5IiwiaXNQcm9wZXJ0eSIsIlByb3h5IiwicHJveHkiLCJjcmVhdGVSZWNvcmRIYW5kbGVycyIsImNyZWF0ZUNvbGxlY3Rpb24iLCJub3RSZWNvcmRJbnRlcmZhY2UiLCJpbml0UHJvcGVydGllcyIsImludGVyZmFjZVVwIiwiY3VyUGF0aCIsImJhYmVsSGVscGVycy50eXBlb2YiLCJpdGVtcyIsImNvbGxlY3Rpb24iLCJnZXRBY3Rpb25zQ291bnQiLCJhY3Rpb25VcCIsInJlcXVlc3QiLCJvYmplY3RQYXJ0Iiwic2V0QXR0ciIsIk9QVF9DT05UUk9MTEVSX1BSRUZJWCIsIk9QVF9SRUNPUkRfUFJFRklYIiwibm90QXBwIiwicmVzb3VyY2VzIiwiaW5pdE1hbmFnZXIiLCJpbml0QVBJIiwiaW5pdFRlbXBsYXRlcyIsInNldE1hbmFnZXIiLCJhcGkiLCJzZXRBUEkiLCJwcm9tIiwiYWRkTGliRnJvbVVSTCIsImluaXRNYW5pZmVzdCIsInNldEludGVyZmFjZU1hbmlmZXN0IiwicmVwb3J0Iiwic2V0Um9vdCIsInJvdXRpZUlucHV0Iiwicm91dGVCbG9jayIsInBhdGhzIiwiY29udHJvbGxlciIsImJpbmRDb250cm9sbGVyIiwiYWRkTGlzdCIsImxpc3RlbiIsIm5hdmlnYXRlIiwidXBkYXRlIiwidXBkYXRlSW50ZXJmYWNlcyIsImluaXRDb250cm9sbGVyIiwiYWxsUmVzb3VyY2VzUmVhZHkiLCJzdGFydEFwcCIsImluaXRSb3V0ZXIiLCJjb250cm9sbGVyTmFtZSIsImFwcCIsImN0cmwiLCJjbGVhckludGVyZmFjZXMiLCJtYW5pZmVzdHMiLCJyZWNvcmRNYW5pZmVzdCIsInJlY29yZERhdGEiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJ0eXBlIiwib25SZXNvdXJjZVJlYWR5IiwiTUVUQV9QUk9DRVNTT1JTIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzIiwic2V0UHJvY2Vzc29yIiwiZ2V0UHJvY2Vzc29yIiwiTUVUQV9DT01QT05FTlRTIiwibm90UmVuZGVyZXIiLCJyZW5kZXIiLCJjb21wb25lbnQiLCJpbml0RGF0YSIsImluaXRPcHRpb25zIiwiaW5pdFdvcmtpbmciLCJ0ZW1wbGF0ZSIsImluaXRUZW1wbGF0ZSIsIm9uQ2hhbmdlIiwiTWF0aCIsInJhbmRvbSIsImdldEJyZWFkQ3J1bXBzIiwiY2xlYXJTdGFzaCIsInNldFdvcmtpbmdNYXBwaW5nIiwiZXhlY1Byb2Nlc3NvcnMiLCJzZWFyY2hGb3JTdWJUZW1wbGF0ZXMiLCJzdGFzaFJlbmRlcmVkIiwiaWZQYXJ0IiwiY29tcG9uZW50UGF0aCIsImNoYW5nZWRQYXRoIiwiaWZGdWxsU3ViUGF0aCIsImNyZWF0ZU1hcHBpbmciLCJmaW5kQWxsUHJvY2Vzc29ycyIsInByb2NzIiwiZWxzIiwiZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgiLCJnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50IiwicHJvY0RhdGEiLCJwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24iLCJwcm9jZXNzb3JFeHByZXNzaW9uIiwiYXR0cmlidXRlRXhwcmVzc2lvbiIsImlmQ29uZGl0aW9uIiwicGFyYW1zIiwicHJvY2Vzc29yTmFtZSIsIm1hcHBpbmciLCJwcm9jU2NvcGUiLCJhdHRyaWJ1dGVSZXN1bHQiLCJnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0IiwicHJvY05hbWUiLCJwcm9jIiwicmVtb3ZlQXR0cmlidXRlIiwiZGVzdHJveVN1YnMiLCJkZXN0cm95IiwiY2xlYXJTdWJUZW1wbGF0ZXMiLCJnZXRTdGFzaCIsInJlbW92ZUNoaWxkIiwibnRFbCIsIm50UmVuZGVyZWQiLCJzdWJzIiwibnQiLCJpZlN1YkVsZW1lbnRSZW5kZXJlZCIsInJlbmRlclN1YiIsImRldGFpbHMiLCJkYXRhUGF0aCIsIm5vdENvbXBvbmVudCIsImNoaWxkTm9kZXMiLCJhZGRUb1N0YXNoIiwic3Rhc2giLCJuZXdTdGFzaCIsImFuY2hvciIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwibm9kZSIsInBsYWNlIiwidGFyZ2V0RWwiLCJsIiwiY2hpbGRyZW4iLCJyZW5kZXJlZCIsInBsYWNlQWZ0ZXIiLCJwbGFjZUJlZm9yZSIsInBsYWNlRmlyc3QiLCJwbGFjZUxhc3QiLCJub3RQbGFjZXJzIiwiTUVUQV9QQVJUUyIsInJlc2V0UGFydHMiLCJwcmVwYXJlVGVtcGxhdGVFbGVtZW50IiwiaW5pdE1hcmtFbGVtZW50IiwibWFya0VsIiwicGxhY2VyIiwiZ2V0UGxhY2VyIiwibWFpbiIsInVuc2V0UmVhZHkiLCJodG1sIiwic2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJhZGRGcm9tVVJMIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJjbGVhclBhcnRzIiwiZm9yRWFjaERhdGEiLCJyZW5kZXJQYXJ0IiwicGxhY2VSZW5kZXJlZCIsInJlbW92ZU9ic29sZXRlUGFydHMiLCJiZWZvcmUiLCJwbGFjZVBhcnQiLCJhZnRlciIsInBhcnQiLCJnZXRQYXJ0QnlEYXRhIiwibm9kZXMiLCJsYXN0Tm9kZSIsIm5vZGVUeXBlIiwiZ2V0UGFydHMiLCJyZW5kZXJlciIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUiLCJhZGRQYXJ0IiwidXBkYXRlUGFydCIsInBpcGUiLCJmaW5kQWN0dWFsUGFydHMiLCJyZW1vdmVOb3RBY3R1YWxQYXJ0cyIsImFjdHVhbFBhcnRzIiwiaXNEYXRhIiwiT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SIiwiT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCIsIk9QVF9ERUZBVUxUX1ZJRVdfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCIsIk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FIiwiT1BUX0RFRkFVTFRfU0lOR0xFX05BTUUiLCJPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9BTkQiLCJub3RDb250cm9sbGVyIiwiaW5pdFJlbmRlciIsImludGVyZmFjZXMiLCJnZXRJbnRlcmZhY2VzIiwibWFrZSIsInZpZXdOYW1lIiwidmlldyIsImdldFZpZXciLCJ0YXJnZXRRdWVyeSIsInRlbXBsYXRlVVJMIiwicHJlZml4IiwiY29tbW9uIiwiZ2V0TW9kdWxlUHJlZml4IiwicG9zdGZpeCIsInRlbXBsYXRlTmFtZSIsInJlbmRlckFuZCIsInZpZXdzIiwiZ2V0TW9kdWxlTmFtZSIsIm5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiIsInNjb3BlIiwidGV4dENvbnRlbnQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImxpdmVFdmVudHMiLCJvbkV2ZW50IiwiY2hlY2tlZCIsImZpZWxkIiwic2VsZWN0ZWQiLCJzZWxlY3RlZE9wdGlvbnMiLCJwcm9jZXNzZWRWYWx1ZSIsImlzTmFOIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidXNlZCIsIm9wdGlvbiIsInZhbHVlRmllbGROYW1lIiwibGFiZWxGaWVsZE5hbWUiLCJpdGVtVmFsdWVGaWVsZE5hbWUiLCJkZWZhdWx0IiwicGxhY2Vob2xkZXIiLCJhcnJheSIsIm5vdFJvdXRlckluaXRpYWxpemVkIiwiT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgiLCJPUFRfREVGQVVMVF9ST0xFX05BTUUiLCJPUFRfREVGQVVMVF9GT1JNX1RJVExFIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiIsIk9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUIiwibm90Rm9ybSIsIm9uU3VibWl0Iiwib25SZXNldCIsIm9uQ2FuY2VsIiwiZ2V0TWFuaWZlc3QiLCJyb2xlIiwicmVuZGVyV3JhcHBlciIsImZvcm1QYXJ0IiwiZ2V0V3JhcHBlckRhdGEiLCJnZXRQYXJ0VGVtcGxhdGVOYW1lIiwiYmluZEZvcm1FdmVudHMiLCJyZW5kZXJDb21wb25lbnRzIiwid3JhcHBlciIsInRpdGxlIiwiZ2V0Rm9ybUZpZWxkc0xpc3QiLCJhZGRGaWVsZENvbXBvbmVudCIsImNvbXBzIiwiZ2V0QXBwIiwiZGVmIiwiZmllbGRzTGlicyIsImdldEZpZWxkc0xpYnMiLCJmaWVsZFR5cGUiLCJnZXRGaWVsZHNEZWZpbml0aW9uIiwicmVjIiwibGFiZWwiLCJnZXRGb3JtVGFyZ2V0RWxlbWVudCIsImNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMiLCJmb3JtIiwiT1BUX0RFRkFVTFRfUEFHRV9TSVpFIiwiT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIiLCJub3RUYWJsZSIsInJlc2V0UGFnZXIiLCJyZW5kZXJJbnNpZGUiLCJyZW5kZXJIZWFkZXIiLCJ1cGRhdGVEYXRhIiwicmVuZGVyQm9keSIsImJpbmRTZWFyY2giLCJiaW5kQ3VzdG9tQmluZGluZ3MiLCJ0YWJsZUhlYWRlciIsIm5ld1RoIiwiZGF0YUZpZWxkTmFtZSIsInNvcnRpbmdEaXJlY3Rpb24iLCJzb3J0YWJsZSIsImF0dGFjaFNvcnRpbmdIYW5kbGVycyIsImhlYWRDZWxsIiwiY2hhbmdlU29ydGluZ09wdGlvbnMiLCJjdXJyZW50VGFyZ2V0Iiwic3R5bGUiLCJjdXJzb3IiLCJzZXRTb3J0ZXIiLCJoYXNoIiwiaW52YWxpZGF0ZURhdGEiLCJnZXRGaWx0ZXIiLCJmaWx0ZXJTZWFyY2giLCJpZlVwZGF0aW5nIiwicXVlcnkiLCJnZXRTb3J0ZXIiLCJzZXRQYWdlciIsImdldFBhZ2VyIiwic2V0VXBkYXRpbmciLCIkbGlzdCIsInByb2NjZXNzRGF0YSIsInJlZnJlc2hCb2R5Iiwic2V0VXBkYXRlZCIsInRoYXRGaWx0ZXIiLCJ0ZXN0RGF0YUl0ZW0iLCJ0aGF0U29ydGVyIiwic29ydCIsIml0ZW0xIiwiaXRlbTIiLCJzb3J0QnlGaWVsZCIsImxvY2FsZUNvbXBhcmUiLCJzb3J0RGlyZWN0aW9uIiwic2VhcmNoRWwiLCJzZWxlY3RvciIsImdldE9wdGlvbiIsIm5ld1JvdyIsIm5ld1RkIiwiaXRlbUlkIiwicHJvY2Nlc3NvciIsInRib2R5IiwiZmluZEJvZHkiLCJjbGVhckJvZHkiLCJ0aGlzUGFnZVN0YXJ0cyIsIm5leHRQYWdlRW5kcyIsIm1pbiIsInJlbmRlclJvdyIsInRhYmxlQm9keSIsInN0clZhbHVlIiwiZ2V0RmlsdGVyU2VhcmNoIiwiayIsInRvQ29tcCIsIm5vdFZpZXciXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWE7U0FDZCxLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFhO1NBQ2xCLEtBQUtDLEdBQUwsQ0FBUyxVQUFULElBQXVCRCxHQUE5QjtFQUxrQjtnQkFPSix1QkFBU0UsU0FBVCxFQUFvQkMsTUFBcEIsRUFBNEI7T0FDdEMsSUFBSUMsQ0FBUixJQUFhRixTQUFiLEVBQXdCO1FBQ25CLElBQUlHLENBQVIsSUFBYUYsTUFBYixFQUFxQjtRQUNqQkQsVUFBVUUsQ0FBVixFQUFhRSxjQUFiLENBQTRCSCxPQUFPRSxDQUFQLENBQTVCLENBQUgsRUFBMkM7U0FDdENFLFFBQVEsSUFBSUMsS0FBSixFQUFaO1dBQ01DLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsV0FBbEM7V0FDTUMsR0FB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
