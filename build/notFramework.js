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
	getJSON: function getJSON(url, data) {
		var that = this;
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', that.getSessionID());
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
		var that = this;
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('POST', url);
			xhr.setRequestHeader('SessionID', that.getSessionID());
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
		var that = this;
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('PUT', url);
			xhr.setRequestHeader('SessionID', that.getSessionID());
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
		var that = this;
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('DELETE', url);
			xhr.setRequestHeader('SessionID', that.getSessionID());
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
		var that = this;
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', that.getSessionID());
			xhr.responseType = 'text';
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
	getSessionID: function getSessionID() {
		return '';
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

/*
	список того что нужно подключить как общие
*/
var notCommon = Object.assign({}, CommonObjects);

notCommon.extendWith(CommonNetwork);
notCommon.extendWith(CommonStrings);
notCommon.extendWith(CommonLogs);
notCommon.extendWith(CommonFunctions);
notCommon.extendWith(CommonDOM);

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
			if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && object.hasOwnProperty(attrName)) {
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

var META_EVENTS = Symbol('events');
var META_DATA = Symbol('data');
var META_WORKING = Symbol('working');
var META_OPTIONS = Symbol('options');

var notBase = function () {
	function notBase() {
		classCallCheck(this, notBase);

		this[META_EVENTS] = {};
		this[META_DATA] = {};
		this[META_WORKING] = {};
		this[META_OPTIONS] = {};
		return this;
	}

	createClass(notBase, [{
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

var notImage = function (_notBase) {
	inherits(notImage, _notBase);

	function notImage() {
		classCallCheck(this, notImage);
		return possibleConstructorReturn(this, (notImage.__proto__ || Object.getPrototypeOf(notImage)).call(this));
	}

	return notImage;
}(notBase);

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
	}, {
		key: 'request',
		value: function request(record, actionName, callbackSuccess, callbackError) {
			notCommon.log('request', record, actionName, callbackSuccess, callbackError);
			var actionData = this.getActionData(actionName),
			    url = this.getURL(record, actionData, actionName);
			if (actionData) {
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
	}, {
		key: 'onLoad',
		value: function onLoad() {
			var _this2 = this;

			var status = this.status,
			    data = this.response,
			    result = [];
			if (status == 200) {
				if (this.actionData && this.actionData.hasOwnProperty('isArray') && this.actionData.isArray) {
					data.forEach(function (item) {
						result.push(new notRecord(_this2.manifest, item));
					});
				} else {
					result = new notRecord(this.manifest, data);
				}
				this.callbackSuccess && this.callbackSuccess(result);
			} else {
				this.callbackError && this.callbackError(data);
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
var META_SAL = ['getAttr', 'getAttrs', 'setAttr', 'setAttrs', 'getData', 'setData', 'getJSON', 'on', 'off', 'trigger'];
var DEFAULT_ACTION_PREFIX = '$';
var DEFAULT_PAGE_NUMBER = 1;
var DEFAULT_PAGE_SIZE = 10;

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
		var _ret2;

		classCallCheck(this, notProperty);

		var _this = possibleConstructorReturn(this, (notProperty.__proto__ || Object.getPrototypeOf(notProperty)).call(this));

		if (item.isProxy) {
			var _ret;

			//notCommon.error('this is Proxy property');
			return _ret = item, possibleConstructorReturn(_this, _ret);
		}
		_this.setOptions({
			getRoot: getRoot,
			path: pathTo
		});
		_this[META_PROXY] = new Proxy(item, createPropertyHandlers(_this));
		//notCommon.log('property proxy property created from', item);
		_this.setData(item);
		_this.on('change', _this.returnToRoot.bind(_this));
		return _ret2 = _this[META_PROXY], possibleConstructorReturn(_this, _ret2);
	}

	createClass(notProperty, [{
		key: 'returnToRoot',
		value: function returnToRoot(proxy, key, value) {
			var /*path = this.getOptions('path'),*/
			root = this.getOptions('getRoot')();
			root.trigger('change.nested', this[META_PROXY], this.getOptions('path'), key, value);
		}
	}]);
	return notProperty;
}(notBase);

var createRecordHandlers = function createRecordHandlers(owner) {
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
			//notCommon.log(`record proxy set "${key}"`, this, target);
			//notCommon.trace();
			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error('Invalid attempt to private "' + key + '" property');
			} else {
				var t = Reflect.set(target, key, value);
				this.trigger('change', target, key, value);
				return t;
			}
		}.bind(owner)
	};
};

var notRecord = function (_notBase2) {
	inherits(notRecord, _notBase2);

	function notRecord(manifest, item) {
		var _ret6;

		classCallCheck(this, notRecord);

		var _this2 = possibleConstructorReturn(this, (notRecord.__proto__ || Object.getPrototypeOf(notRecord)).call(this));

		if (item && item.isProxy) {
			var _ret3;

			notCommon.error('this is Proxy item');
			return _ret3 = item, possibleConstructorReturn(_this2, _ret3);
		}

		if (item && item.isRecord) {
			var _ret4;

			return _ret4 = item, possibleConstructorReturn(_this2, _ret4);
		} else {
			if (Array.isArray(item)) {
				var _ret5;

				return _ret5 = _this2.createCollection(manifest, item), possibleConstructorReturn(_this2, _ret5);
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
		return _ret6 = _this2[META_PROXY], possibleConstructorReturn(_this2, _ret6);
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
			if (!this.hasOwnProperty([DEFAULT_ACTION_PREFIX + index])) {
				this[DEFAULT_ACTION_PREFIX + index] = this.createCommonRequest(index);
				//notCommon.log('define', DEFAULT_ACTION_PREFIX + index);
			}
		}
	}, {
		key: 'createCommonRequest',
		value: function createCommonRequest(index) {
			return function (callbackSuccess, callbackError) {
				this[META_INTERFACE].request(this, index, callbackSuccess, callbackError);
			}.bind(this);
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
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = notTemplatesElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var el = _step.value;

					if (el.parentNode === cont) {
						if (el.attributes.name && el.attributes.name.value) {
							result[el.attributes.name.value] = el;
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
			var that = this;
			return new Promise(function (resolve, reject) {
				if (that.get(key)) {
					resolve(that.get(key));
				} else {
					//that.setLoading(key, url);
					notCommon.getHTML(url).then(function (templateInnerHTML) {
						var templateContEl = that.wrap(key, url, templateInnerHTML);
						that.setOne(key, templateContEl);
						resolve(templateContEl);
					}).catch(function () {
						notCommon.error('error loading template', key, url);
						reject.apply(undefined, arguments);
					});
				}
			});
		}
	}, {
		key: 'addLibFromURL',
		value: function addLibFromURL(url) {
			var that = this;
			return new Promise(function (resolve, reject) {
				notCommon.getHTML(url).then(function (templatesHTML) {
					var templates = that.parseLib(templatesHTML);
					that.addLib(templates);
					resolve(templates);
				}).catch(function () {
					notCommon.error('error loading templates lib', url);
					reject.apply(undefined, arguments);
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
			notCommon.log(this);
			notCommon.log(this.getBreadCrumps().join(' > '));
			notCommon.log('updating renderer ', this.getWorking('partId'), ' after changes', key, value);
			this.update(key);
			this.trigger('obsolete');
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
					notCommon.log(item.getOptions('name'), ' >-< ', item.getOptions('id'), ' >-< ', componentPath, changedPath);
					notCommon.log('will be updated', ifPart);
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
			notCommon.log('sub templates', subs);
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = subs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var nt = _step2.value;

					if (!this.ifSubElementRendered(nt)) {
						this.renderSub(nt);
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
			notCommon.log('replace stash');
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
		while (targetEl.children.length) {
			targetEl.removeChild(targetEl.children[0]);
		}
	},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			targetEl.appendChild(rendered[i]);
		}
	},
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
	main: function main() /*targetEl, rendered*/{},
	after: function after() /*targetEl, rendered*/{}
};

var replace = {
	before: function before() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			targetEl.parentNode.insertBefore(rendered[i], targetEl.nextSibling);
		}
	},
	after: function after(targetEl /*, rendered*/) {
		targetEl.parentNode.removeChild(targetEl);
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

		var _this = possibleConstructorReturn(this, (notComponent.__proto__ || Object.getPrototypeOf(notComponent)).call(this));

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
			this.initData(input.data ? input.data : {});
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
				notTemplateCache$1.getFromURL(val.src, val.src).then(this.setProtoTemplateElement.bind(this)).catch(notCommon.report);
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
				for (var t in this[META_PARTS]) {
					t.destroy();
				}
			}
			this.resetParts();
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
		}
	}, {
		key: 'update',
		value: function update() {
			this.removeObsoleteParts();
			if (this.getProtoTemplateElement()) {
				this.forEachData(this.renderPart.bind(this));
				this.placeRendered();
			}
		}
	}, {
		key: 'placeRendered',
		value: function placeRendered() {
			if (this.getOptions('targetEl')) {
				var placer = this.getPlacer(this.getOptions('renderAnd'));
				this.forEachData(this.placePart.bind(this));
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
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;

					if (t.nodeType === 1) {
						lastNode = t;
						lastNode.setAttribute('nt-component', this.getOptions('id'));
						lastNode.setAttribute('nt-part', part.getWorking('partId'));
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

			this.setWorking('lastPlacedNode', lastNode);
		}
	}, {
		key: 'placeNodes',
		value: function placeNodes(nodes) {
			notCommon.log('placed part', nodes);
		}
	}, {
		key: 'getPlacer',
		value: function getPlacer(method) {
			notCommon.log('searching for placer', method);
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
				notCommon.log('creating part render');
				var renderer = new notRenderer({
					data: data,
					template: this.getProtoTemplateElementClone.bind(this),
					options: this.getOptions(),
					component: this
				});
				//renderer.on('obsolete', this.update.bind(this));
				this.addPart(renderer);
			} else {
				notCommon.log('updating part render');
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

var notFormFactory = function (_notComponent) {
	inherits(notFormFactory, _notComponent);

	function notFormFactory(options) {
		var _ret;

		classCallCheck(this, notFormFactory);

		var _this = possibleConstructorReturn(this, (notFormFactory.__proto__ || Object.getPrototypeOf(notFormFactory)).call(this));

		_this.setOptions(options);
		_this.setWorking({});
		_this.on('submit', _this.onSubmit);
		_this.on('reset', _this.onReset);
		_this.on('cancel', _this.onCancel);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	/*
 	Rendering
 */

	createClass(notFormFactory, [{
		key: 'render',
		value: function render() {
			this.renderWrapper();
			this.renderComponents();
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {}
	}, {
		key: 'renderComponents',
		value: function renderComponents() {}

		/*
  	Data management
  */

	}, {
		key: 'collectData',
		value: function collectData() {}

		/*
  	Event handlers
  */

	}, {
		key: 'onSubmit',
		value: function onSubmit() {}
	}, {
		key: 'onReset',
		value: function onReset() {}
	}, {
		key: 'onCancel',
		value: function onCancel() {}
	}]);
	return notFormFactory;
}(notComponent);

var notView = function (_notBase) {
	inherits(notView, _notBase);

	function notView(options) {
		var _ret;

		classCallCheck(this, notView);

		var _this = possibleConstructorReturn(this, (notView.__proto__ || Object.getPrototypeOf(notView)).call(this));

		_this.setOptions(options);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notView, [{
		key: 'getTemplateOptions',
		value: function getTemplateOptions() {
			var defaultResult = {};
			return typeof this.getOptions('templateOptions') !== 'undefined' && this.getOptions('templateOptions') !== null ? this.getOptions('templateOptions') : defaultResult;
		}
	}, {
		key: 'getPlaceToPut',
		value: function getPlaceToPut() {
			if (typeof this.getOptions('placeToPut') !== 'undefined' && this.getOptions('placeToPut') !== null) {
				return this.getOptions('placeToPut');
			}
			return document.body;
		}
	}, {
		key: 'getAfterExecCallback',
		value: function getAfterExecCallback(callback) {
			var defaultResult = function defaultResult() {
				//console.log('default view after exec callback');
			};
			if (typeof callback !== 'undefined' && callback !== null) {
				return callback;
			}
			if (typeof this.getOptions('afterExec') !== 'undefined' && this.getOptions('afterExec') !== null) {
				return this.getOptions('afterExec');
			}
			return defaultResult;
		}
	}, {
		key: 'exec',
		value: function exec(callback) {
			this.setWorking('component', new notComponent(this.getTemplateOptions()));
		}
	}, {
		key: 'setParam',
		value: function setParam(name, value) {
			this.getOptions(name, value);
			return this;
		}
	}, {
		key: 'setTemplateParam',
		value: function setTemplateParam(name, value) {
			this.setOptions(notPath$1.join('templateOptions', name), value);
			return this;
		}
	}, {
		key: 'getParam',
		value: function getParam(name) {
			return this.getOptions().hasOwnProperty(name) ? this.getOptions(name) : undefined;
		}
	}, {
		key: 'getParams',
		value: function getParams() {
			return this.getOptions();
		}
	}]);
	return notView;
}(notBase);

var notController = function (_notBase) {
	inherits(notController, _notBase);

	function notController(app, controllerName) {
		var _ret;

		classCallCheck(this, notController);

		var _this = possibleConstructorReturn(this, (notController.__proto__ || Object.getPrototypeOf(notController)).call(this));

		notCommon.log('start controller');
		_this.app = app;
		_this.ncName = 'nc' + controllerName.capitalizeFirstLetter();
		_this.containerSelector = '.page-content';
		_this.viewsPostfix = '.html';
		_this.renderFromURL = true;
		/*
      сразу делаем доступными модели notRecord из nc`ControllerName` будут доступны как this.nr`ModelName`
  */
		_this.app.getInterfaces().forEach(function (index, interfac3) {
			if (typeof window[_this.ncName] !== 'undefined') window[_this.ncName].prototype[index] = interfac3;
		});
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notController, [{
		key: '$render',
		value: function $render(nc /* ncName function this*/, name /* view name */, data /* data for notTemplate*/, helpers /* could be not represented */, callback) {
			var view = nc.views.hasOwnProperty(name) ? nc.views[name] : null,
			    realCallback,
			    realHelpers;
			if (typeof view === 'undefined' || view === null) return;
			// если place не указано, что возможно и разумно при не существовании
			// элемента, но известном идентификаторе
			if ((typeof view.place === 'undefined' || view.place === null) && typeof view.placeId !== 'undefined' && view.placeId !== null && view.placeId.length > 0) {
				view.place = document.getElementById(view.placeId);
			}
			//если 4 аргумента значит, helpers  пропустили
			switch (arguments.length) {
				//переназначаем со сдвигом
				case 4:
					realCallback = helpers;
					realHelpers = {};
					break;
				//переназначаем напрямую
				default:
					realHelpers = helpers;
					realCallback = callback;
			}
			view.data = data;
			if (typeof view.helpers !== 'undefined' && view.helpers !== null && Object.keys(view.helpers).length > 0) {
				view.helpers = notCommon.extend(view.helpers, realHelpers);
			} else {
				view.helpers = realHelpers;
			}
			//если нужно загружать шаблоны
			if (nc.renderFromURL) {
				//и адрес не указан
				if (typeof view.templateURL === 'undefined' || view.templateURL == null || view.templateURL.length == 0) {
					//генерируем адрес по шаблону
					view.templateURL = (view.common ? nc.commonViewsPrefix : nc.viewsPrefix) + (typeof view.name !== 'undefined' && view.name !== null && view.name.length > 0 ? view.name : name) + nc.viewsPostfix;
				}
			} else {
				//а если есть название шаблона, то
				if (view.hasOwnProperty('templateName')) {
					//...
					view.templateName = nc.viewsPrefix + view.templateName + nc.viewsPostfix;
				}
			}
			new notComponent(view).execAndPut(view.place, realCallback);
		}
	}, {
		key: 'exec',
		value: function exec(params) {
			//console.log('exec', this, Object.keys(this.__proto__));
			if (typeof window[this.ncName] !== 'undefined') {
				//ищем имена разделяемых функций
				var sharedList = Object.keys(this.__proto__).filter(function (key) {
					return key.indexOf('$') === 0;
				});
				//закидываем их в новую функцию
				if (sharedList.length > 0) {
					for (var k in sharedList) {
						window[this.ncName].prototype[sharedList[k]] = this.__proto__[sharedList[k]];
					}
				}
				new window[this.ncName](this.app, params);
				//console.log(new(window[this.ncName])(this.app, params));
				//console.log('after new controller');
			} else {}
		}
	}]);
	return notController;
}(notBase);

/* global routie */
var OPT_CONTROLLER_PREFIX = 'nc';
var OPT_RECORD_PREFIX = 'nr';

var notApp = function (_notBase) {
	inherits(notApp, _notBase);

	function notApp(notManifest) {
		var _ret;

		classCallCheck(this, notApp);

		var _this = possibleConstructorReturn(this, (notApp.__proto__ || Object.getPrototypeOf(notApp)).call(this));

		notCommon.log('start app');
		_this.setOptions(notManifest);
		_this.resources = {};
		_this.setWorking({
			interfaces: {},
			controllers: {},
			initController: null,
			currentController: null,
			forms: {}
		});
		_this.init();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notApp, [{
		key: 'init',
		value: function init() {
			var url = this.getOptions('interfaceManifestURL'),
			    success = this.setInterfaceManifest.bind(this);
			notCommon.getJSON(url, {}).then(success).catch(notCommon.report.bind(this));
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
			//создание объектов автогенерация форм
			this.initFormBuilders();
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
			var ctrl = new notController(this, controllerName);
			return ctrl.exec.bind(ctrl);
		}
	}, {
		key: 'initController',
		value: function initController() {
			if (typeof this.getOptions('initController') !== 'undefined') {
				this.setWorking('initController', new notController(this, this.getOptions('initController')));
				this.getWorking('initController').exec();
			}
		}
	}, {
		key: 'initRouter',
		value: function initRouter() {
			var _this2 = this;

			var routieInput = {};
			this.getOptions('siteManifest').forEach(function (route, controllerName) {
				routieInput[route] = _this2.bindController(controllerName);
			});
			this.setWorking('router', routie(routieInput));
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
			this.clearInterfaces();
			if (this.getOptions('interfaceManifest')) {
				this.getOptions('interfaceManifest').forEach(this.initInterface.bind(this));
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
		key: 'initInterface',
		value: function initInterface(index, manifest) {
			//console.log(index, manifest);
			this.getWorking('interfaces')[this.getRecordName(index)] = new notRecord(manifest);
		}
	}, {
		key: 'nr',
		value: function nr(modelName, data) {
			var manifest = this.getOptions('interfaceManifest').hasOwnProperty(modelName) ? this.getOptions('interfaceManifest')[modelName] : {};
			//console.log(modelName, manifest, data);
			return new notRecord(manifest, data);
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
		key: 'initFormBuilders',
		value: function initFormBuilders() {
			this.clearFormBuilders();
			if (this.getOptions('forms')) {
				this.getOptions('forms').forEach(this.initFormBuilder.bind(this));
			}
		}
	}, {
		key: 'initFormBuilder',
		value: function initFormBuilder(index, manifest) {
			var path = notPath$1.join('forms', index);
			this.setWorking(path, new notFormFactory(this, manifest));
			this.getWorking(path).init(this.waitThisResource('form', index));
		}
	}, {
		key: 'getFormBuilders',
		value: function getFormBuilders() {
			return this.getWorking('forms');
		}
	}, {
		key: 'clearFormBuilders',
		value: function clearFormBuilders() {
			this.setWorking('forms', {});
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
	}, {
		key: 'getOptions',
		value: function getOptions() {
			return this.getOptions('options');
		}
	}]);
	return notApp;
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
				return scope.attributeResult({ scope: scope, item: item, helpers: helpers, e: e });
			} else {
				return true;
			}
		});
	},
	value: function value(scope, item, helpers) {
		var liveEvents = ['change', 'keyup'],
		    onEvent = function onEvent() {
			return notPath$1.set(scope.attributeExpression, item, helpers, scope.element.value);
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
		scope.element.setAttribute(scope.params[0], notPath$1.get(scope.attributeExpression, item, helpers));
	},
	name: function name(scope, item, helpers) {
		scope.element.setAttribute('name', notPath$1.get(scope.attributeExpression, item, helpers));
	},
	change: function change() /*scope, item, helpers*/{},
	checked: function checked(scope /*, item, helpers*/) {
		scope.attributeResult ? scope.element.setAttribute('checked', true) : scope.element.removeAttribute('checked');
	},
	class: function _class(scope, item, helpers) {
		scope.attributeResult = notPath$1.get(scope.attributeExpression, item, helpers);
		if (scope.attributeResult) {
			scope.element.classList.add(scope.params[0]);
		} else {
			scope.element.classList.remove(scope.params[0]);
		}
	},
	options: function options(scope, item, helpers) {
		var i = 0,
		    option = null,
		    valueFieldName = 'value',
		    labelFieldName = 'name',
		    subLib = undefined,
		    itemValueFieldName = helpers.hasOwnProperty('fieldName') ? helpers['fieldName'] : 'value';
		scope.element.innerHTML = '';
		if (scope.params.length === 2) {
			labelFieldName = scope.params[0];
			valueFieldName = scope.params[1];
		}
		if (typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty('option')) {
			labelFieldName = helpers.option.label;
			valueFieldName = helpers.option.value;
		}
		if (scope.params.length > 2) {
			itemValueFieldName = scope.params[2];
		}
		if (scope.params.length > 3 && scope.params[3] === 'different') {
			subLib = valueFieldName;
		}
		if (typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty('fieldPlaceHolder') && helpers.hasOwnProperty('fieldPlaceHolderDefault') && helpers.fieldPlaceHolderDefault) {
			option = document.createElement('option');
			option.setAttribute('value', '');
			option.textContent = helpers.fieldPlaceHolder;
			scope.element.appendChild(option);
		}
		if (typeof item !== 'undefined' && item !== null) {
			var lib = notPath$1.get(scope.attributeExpression, item, helpers);
			if ( /*different &&*/subLib && lib.hasOwnProperty(subLib)) {
				lib = lib[subLib];
			}
			for (i = 0; i < lib.length; i++) {
				option = document.createElement('option');
				option.setAttribute('value', lib[i][valueFieldName]);
				option.textContent = lib[i][labelFieldName];
				if (Array.isArray(item[itemValueFieldName])) {
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
	}
};

var notForm = function (_notComponent) {
	inherits(notForm, _notComponent);

	function notForm(options) {
		var _ret;

		classCallCheck(this, notForm);

		var _this = possibleConstructorReturn(this, (notForm.__proto__ || Object.getPrototypeOf(notForm)).call(this));

		_this.setOptions(options);
		_this.setWorking({});
		_this.on('submit', _this.onSubmit);
		_this.on('reset', _this.onReset);
		_this.on('cancel', _this.onCancel);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	/*
 	Rendering
 */

	createClass(notForm, [{
		key: 'render',
		value: function render() {
			this.renderWrapper();
			this.renderComponents();
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {}
	}, {
		key: 'renderComponents',
		value: function renderComponents() {}

		/*
  	Data management
  */

	}, {
		key: 'collectData',
		value: function collectData() {}

		/*
  	Event handlers
  */

	}, {
		key: 'onSubmit',
		value: function onSubmit() {}
	}, {
		key: 'onReset',
		value: function onReset() {}
	}, {
		key: 'onCancel',
		value: function onCancel() {}
	}]);
	return notForm;
}(notComponent);

var notTable = function (_notComponent) {
	inherits(notTable, _notComponent);

	function notTable() {
		classCallCheck(this, notTable);
		return possibleConstructorReturn(this, (notTable.__proto__ || Object.getPrototypeOf(notTable)).call(this));
	}

	return notTable;
}(notComponent);

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
exports.notController = notController;
exports.notTemplateProcessors = notTemplateProcessors$1;
exports.notTemplateProcessorsLib = notTemplateProcessorsLib;
exports.notTemplateCache = notTemplateCache$1;
exports.notRenderer = notRenderer;
exports.notComponent = notComponent;
exports.notForm = notForm;
exports.notTable = notTable;
exports.notView = notView;
exports.notRecord = notRecord;
exports.notRecordInterface = notInterface;

}((this.notFramework = this.notFramework || {})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9vYmplY3RzLmpzIiwiLi4vc3JjL2NvbW1vbi9zdHJpbmdzLmpzIiwiLi4vc3JjL2NvbW1vbi9mdW5jdGlvbnMuanMiLCIuLi9zcmMvY29tbW9uL2RvbS5qcyIsIi4uL3NyYy9jb21tb24vaW5kZXguanMiLCIuLi9zcmMvbm90UGF0aC5qcyIsIi4uL3NyYy9ub3RCYXNlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdEltYWdlLmpzIiwiLi4vc3JjL25vdFJlY29yZEludGVyZmFjZS5qcyIsIi4uL3NyYy9ub3RSZWNvcmQuanMiLCIuLi9zcmMvdGVtcGxhdGUvb3B0aW9ucy5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29ycy5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RSZW5kZXJlci5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VBZnRlci5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlQmVmb3JlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VGaXJzdC5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlTGFzdC5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3JlcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9pbmRleC5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RDb21wb25lbnQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RGb3JtRmFjdG9yeS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFZpZXcuanMiLCIuLi9zcmMvbm90Q29udHJvbGxlci5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFRhYmxlLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBDb21tb25OZXR3b3JrID0ge1xuXHRhZGRIb3N0OiBmdW5jdGlvbih1cmkpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKXtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ3Byb3RvY29sJykgKyB1cmk7XG5cdH0sXG5cdHByZWxvYWRJbWFnZXM6IGZ1bmN0aW9uKGRhdGFBcnJheSwgZmllbGRzKSB7XG5cdFx0Zm9yKHZhciBpIGluIGRhdGFBcnJheSkge1xuXHRcdFx0Zm9yKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZihkYXRhQXJyYXlbaV0uaGFzT3duUHJvcGVydHkoZmllbGRzW2ZdKSkge1xuXHRcdFx0XHRcdHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0XHRcdGltYWdlLnNldEF0dHJpYnV0ZSgnY3Jvc3NPcmlnaW4nLCAnYW5vbnltb3VzJyk7XG5cdFx0XHRcdFx0aW1hZ2Uuc3JjID0gZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV0uaW5kZXhPZignLy8nKSA9PT0gMCA/IHRoaXMuYWRkUHJvdG9jb2woZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV0pIDogZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGdldEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0pO1xuXHR9LFxuXHRwb3N0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUE9TVCcsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhhdC5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdHB1dEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ1BVVCcsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhhdC5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdGRlbGV0ZUpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ0RFTEVURScsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhhdC5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldEhUTUw6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAndGV4dCc7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRTZXNzaW9uSUQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAnJztcblx0fSxcbn07XG5leHBvcnQgZGVmYXVsdCBDb21tb25OZXR3b3JrO1xuIiwidmFyIENvbW1vbkxvZ3MgPSB7XG5cdGRlYnVnOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZyguLi5hcmd1bWVudHMpO1xuXHR9LFxuXHRsb2c6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGVycm9yOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHJlcG9ydDogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5lcnJvciguLi5hcmd1bWVudHMpO1xuXHR9LFxuXHR0cmFjZTogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS50cmFjZSguLi5hcmd1bWVudHMpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTG9ncztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKCF0aGlzLmVxdWFsKGFbcF0sIGJbcF0pKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjYXNlICdmdW5jdGlvbic6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJyB8fFxuXHRcdFx0XHRcdFx0XHQocCAhPSAnZXF1YWxzJyAmJiBhW3BdLnRvU3RyaW5nKCkgIT0gYltwXS50b1N0cmluZygpKSlcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cdHJlZ2lzdGVyOiBmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdHRoaXMucmVnaXN0cnlba2V5XSA9IHZhbDtcblx0fSxcblxuXHRnZXQ6IGZ1bmN0aW9uKGtleSkge1xuXHRcdHJldHVybiB0aGlzLnJlZ2lzdHJ5Lmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzLnJlZ2lzdHJ5W2tleV0gOiBudWxsO1xuXHR9LFxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25PYmplY3RzO1xuIiwidmFyIENvbW1vblN0cmluZ3MgPSB7XG5cdGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21tb25ET007XG4iLCJpbXBvcnQgQ29tbW9uTmV0d29yayBmcm9tICcuL25ldC5qcyc7XG5pbXBvcnQgQ29tbW9uTG9ncyBmcm9tICcuL2xvZ3MuanMnO1xuaW1wb3J0IENvbW1vbk9iamVjdHMgZnJvbSAnLi9vYmplY3RzLmpzJztcbmltcG9ydCBDb21tb25TdHJpbmdzIGZyb20gJy4vc3RyaW5ncy5qcyc7XG5pbXBvcnQgQ29tbW9uRnVuY3Rpb25zIGZyb20gJy4vZnVuY3Rpb25zLmpzJztcbmltcG9ydCBDb21tb25ET00gZnJvbSAnLi9kb20uanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkZ1bmN0aW9ucyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25ET00pO1xuXG5leHBvcnQgZGVmYXVsdCBub3RDb21tb247XG4iLCIvKlxuXHQ6cHJvcGVydHkuc3ViMS5mdW5jKCkuZnVuY1Byb3Bcblx0ID0gcmV0dXJuIGZ1bmNQcm9wIG9mIGZ1bmN0aW9uIHJlc3VsdCBvZiBzdWIxIHByb3BlcnR5IG9mIHByb3BlcnR5IG9mIG9iamVjdFxuXHQ6ezo6aGVscGVyVmFsfS5zdWJcblx0ID0gcmV0dXJuIHN1YiBwcm9wZXJ0eSBvZiBvYmplY3QgcHJvcGVydHkgd2l0aCBuYW1lIHJldHJpZXZlZCBmcm9tIGhlbHBlclZhbCBwcm9wZXJ0eSBvZiBoZWxwZXJzIG9iamVjdFxuXHQ6ezo6aGVscGVyRnVuYygpfS5zdWJcblx0PSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIGZ1bmN0aW9uIHJlc3VsdCBvZiBoZWxwZXJzIG9iamVjdC5cblx0aWYgaGVscGVyc0Z1bnggcmV0dXJuICdjYXInIHRoZW4gc291cmNlIHBhdGggYmVjb21lcyA6Y2FyLnN1YlxuXG4qL1xuXG5jb25zdCBTVUJfUEFUSF9TVEFSVCA9ICd7Jyxcblx0U1VCX1BBVEhfRU5EID0gJ30nLFxuXHRQQVRIX1NQTElUID0gJy4nLFxuXHRQQVRIX1NUQVJUX09CSkVDVCA9ICc6Jyxcblx0UEFUSF9TVEFSVF9IRUxQRVJTID0gJzo6Jyxcblx0RlVOQ1RJT05fTUFSS0VSID0gJygpJyxcblx0TUFYX0RFRVAgPSAxMDtcblxuY2xhc3Mgbm90UGF0aHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQvKlxuXHRcdGlucHV0ICc6ezo6aGVscGVyVmFsfS5zdWInXG5cdFx0cmV0dXJuIDo6aGVscGVyVmFsXG5cdCovXG5cdGZpbmROZXh0U3ViUGF0aChwYXRoLyogc3RyaW5nICovKXtcblx0XHRsZXQgc3ViUGF0aCA9ICcnLFxuXHRcdFx0ZmluZCA9IGZhbHNlO1xuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdGlmIChwYXRoW2ldID09PSBTVUJfUEFUSF9TVEFSVCl7XG5cdFx0XHRcdGZpbmQgPSB0cnVlO1xuXHRcdFx0XHRzdWJQYXRoID0gJyc7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0aWYocGF0aFtpXSA9PT0gU1VCX1BBVEhfRU5EICYmIGZpbmQpe1xuXHRcdFx0XHRcdGlmIChmaW5kKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3ViUGF0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHN1YlBhdGgrPXBhdGhbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZpbmQ/c3ViUGF0aDpudWxsO1xuXHR9XG5cblx0cmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViLCBwYXJzZWQpe1xuXHRcdGxldCBzdWJmID0gU1VCX1BBVEhfU1RBUlQrc3ViK1NVQl9QQVRIX0VORDtcblx0XHR3aGlsZShwYXRoLmluZGV4T2Yoc3ViZikgPiAtMSl7XG5cdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKHN1YmYsIHBhcnNlZCk7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0cGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGxldCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkLCBpID0gMDtcblx0XHR3aGlsZShzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCkpe1xuXHRcdFx0c3ViUGF0aFBhcnNlZCA9IHRoaXMuZ2V0VmFsdWVCeVBhdGgoIHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgc3ViUGF0aCk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGkrKztcblx0XHRcdGlmIChpID4gTUFYX0RFRVApe1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRnZXQocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0c3dpdGNoIChwYXRoKXtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9PQkpFQ1Q6IHJldHVybiBpdGVtO1xuXHRcdFx0Y2FzZSBQQVRIX1NUQVJUX0hFTFBFUlM6IHJldHVybiBoZWxwZXJzO1xuXHRcdH1cblx0XHRwYXRoID0gdGhpcy5wYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0VmFsdWVCeVBhdGgocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUyk+LTE/aGVscGVyczppdGVtLCBwYXRoKTtcblx0fVxuXG5cdHNldChwYXRoLCBpdGVtLCBoZWxwZXJzLCBhdHRyVmFsdWUpe1xuXHRcdGxldCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkLCBpID0gMDtcblx0XHR3aGlsZShzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCkpe1xuXHRcdFx0c3ViUGF0aFBhcnNlZCA9IHRoaXMuZ2V0VmFsdWVCeVBhdGgoIHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgc3ViUGF0aCk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGlmIChpID4gTUFYX0RFRVApe1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdGlmIChpdGVtLmlzUmVjb3JkICYmIHRoaXMubm9ybWlsaXplUGF0aChwYXRoKS5sZW5ndGggPiAxKSB7XG5cdFx0XHRpdGVtLnRyaWdnZXIoJ2NoYW5nZScsIGl0ZW0sIHBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fVxuXHR9XG5cblxuXG5cdHBhcnNlUGF0aFN0ZXAoc3RlcCwgaXRlbSwgaGVscGVyKXtcblx0XHRsZXQgclN0ZXAgPSBudWxsO1xuXHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpID09PSAwICYmIGhlbHBlcil7XG5cdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX0hFTFBFUlMsICcnKTtcblx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0aWYoaGVscGVyLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA9PT0gMCAmJiBpdGVtKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsICcnKTtcblx0XHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdFx0aWYoaXRlbS5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHN0ZXA7XG5cdH1cblxuXHQvLzo6ZmllbGROYW1lLnJlc3VsdFxuXHQvL3t9XG5cdC8ve2ZpZWxkTmFtZTogJ3RhcmdldFJlY29yZEZpZWxkJ31cblx0Ly8vL1sndGFyZ2V0UmVjb3JkRmllbGQnLCAncmVzdWx0J11cblx0cGFyc2VQYXRoKHBhdGgsIGl0ZW0sIGhlbHBlcil7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHBhdGggPSBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRwYXRoW2ldID0gdGhpcy5wYXJzZVBhdGhTdGVwKHBhdGhbaV0sIGl0ZW0sIGhlbHBlcik7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0bm9ybWlsaXplUGF0aChwYXRoKXtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRyZXR1cm4gcGF0aDtcblx0XHR9ZWxzZXtcblx0XHRcdHdoaWxlKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPiAtMSl7XG5cdFx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsJycpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRzbWFsbCA9IFtcInRvZG9cIl0sXG5cdFx0YmlnID0gW1widG9kb1wiLCBcImxlbmd0aFwiXVxuXHRcdHJldHVybiB0cnVlO1xuXG5cdCovXG5cblx0aWZGdWxsU3ViUGF0aChiaWcsIHNtYWxsKXtcblx0XHRpZiAoYmlnLmxlbmd0aDxzbWFsbC5sZW5ndGgpe3JldHVybiBmYWxzZTt9XG5cdFx0Zm9yKGxldCB0ID0wOyB0IDwgc21hbGwubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYoc21hbGxbdF0gIT09IGJpZ1t0XSl7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRnZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoKXtcblx0XHRhdHRyUGF0aCA9IHRoaXMubm9ybWlsaXplUGF0aChhdHRyUGF0aCk7XG5cdFx0bGV0IGF0dHJOYW1lID0gYXR0clBhdGguc2hpZnQoKSxcblx0XHRcdGlzRnVuY3Rpb24gPSBhdHRyTmFtZS5pbmRleE9mKEZVTkNUSU9OX01BUktFUik+LTE7XG5cdFx0aWYgKGlzRnVuY3Rpb24pe1xuXHRcdFx0YXR0ck5hbWUgPSBhdHRyTmFtZS5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJiBvYmplY3QuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKXtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uP29iamVjdFthdHRyTmFtZV0oKTpvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChuZXdPYmosIGF0dHJQYXRoKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gbmV3T2JqO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7b2JqZWN0W2F0dHJOYW1lXSA9IHt9O31cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGpvaW4oKXtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX0VWRU5UUyA9IFN5bWJvbCgnZXZlbnRzJyksXG5cdE1FVEFfREFUQSA9IFN5bWJvbCgnZGF0YScpLFxuXHRNRVRBX1dPUktJTkcgPSBTeW1ib2woJ3dvcmtpbmcnKSxcblx0TUVUQV9PUFRJT05TID0gU3ltYm9sKCdvcHRpb25zJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzW01FVEFfRVZFTlRTXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9EQVRBXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiAqL1xuXHRcdFx0XHR3aGF0ID0gYXJnc1swXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiBlbGVtZW50ICovXG5cdFx0XHRcdG5vdFBhdGguc2V0KGFyZ3NbMF0gLyogcGF0aCAqLyAsIHdoYXQgLyogY29sbGVjdGlvbiAqLyAsIHVuZGVmaW5lZCAvKiBoZWxwZXJzICovICwgYXJnc1sxXSAvKiB2YWx1ZSAqLyApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Z2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggKi9cblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdH1cblx0XHRcdFx0LyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoIHdpdGggZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdGNhc2UgMjpcblx0XHRcdHtcblx0XHRcdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0XHRpZiAocmVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHQvKiBubyBkYXRhLCByZXR1cm4gZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdFx0XHRcdHJldHVybiBhcmdzWzFdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8qIGRhdGEsIHJldHVybiBpdCAqL1xuXHRcdFx0XHRcdHJldHVybiByZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8qIHJldHVybiBmdWxsIGNvbGxlY3Rpb24gKi9cblx0XHRkZWZhdWx0OlxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gd2hhdDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdENPUkUgT0JKRUNUXG5cdFx0XHREQVRBIC0gaW5mb3JtYXRpb25cblx0XHRcdE9QVElPTlMgLSBob3cgdG8gd29ya1xuXHRcdFx0V09SS0lORyAtIHRlbXBvcmFyaWx5IGdlbmVyYXRlZCBpbiBwcm9jY2Vzc1xuXHQqL1xuXG5cdHNldERhdGEoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9EQVRBXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXREYXRhKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG5cdH1cblxuXHRnZXREYXRhKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfREFUQV0sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRPcHRpb25zKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0T3B0aW9ucygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9PUFRJT05TXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFdvcmtpbmcoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRXb3JraW5nKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V29ya2luZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1dPUktJTkddLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Lypcblx0XHRFVkVOVFMgaGFuZGxpbmdcblx0Ki9cblxuXHRvbihldmVudE5hbWVzLCBldmVudENhbGxiYWNrcywgb25jZSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRub3RDb21tb24uZGVmaW5lSWZOb3RFeGlzdHModGhpc1tNRVRBX0VWRU5UU10sIG5hbWUsIFtdKTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnB1c2goe1xuXHRcdFx0XHRjYWxsYmFja3M6IGV2ZW50Q2FsbGJhY2tzLFxuXHRcdFx0XHRvbmNlOiBvbmNlLFxuXHRcdFx0XHRjb3VudDogMFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR0cmlnZ2VyKCkge1xuXHRcdGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLFxuXHRcdFx0ZXZlbnROYW1lID0gYXJncy5zaGlmdCgpO1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWUpKSB7XG5cdFx0XHRldmVudE5hbWUgPSBbZXZlbnROYW1lXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0VWRU5UU10uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaChldmVudCA9PiB7XG5cdFx0XHRcdFx0aWYgKGV2ZW50Lm9uY2UpIHtcblx0XHRcdFx0XHRcdHRoaXMub2ZmKG5hbWUsIGV2ZW50LmNhbGxiYWNrcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LmNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmYoZXZlbnROYW1lcyAvKiBhcnJheSBvZiBldmVudCBuYW1lcyAqLyAsIGV2ZW50Q2FsbGJhY2tzIC8qIGFycmF5IG9mIGNhbGxiYWNrcyAqLyApIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRsZXQgdGFyZ2V0SWQgPSAtMTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmZvckVhY2goKGV2ZW50LCBpKSA9PiB7XG5cdFx0XHRcdGlmIChpID09PSAtMSAmJiBldmVudENhbGxiYWNrcyA9PT0gZXZlbnQuY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0dGFyZ2V0SWQgPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmICh0YXJnZXRJZCA+IC0xKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnNwbGljZSh0YXJnZXRJZCwgMSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlICBmcm9tICcuLi9ub3RCYXNlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEltYWdlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW50ZXJmYWNlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGV4dGVuZE9iamVjdChvYmoxLCBvYmoyKSB7XG5cdFx0dmFyIGF0dHJOYW1lID0gJyc7XG5cdFx0Zm9yIChhdHRyTmFtZSBpbiBvYmoyKSB7XG5cdFx0XHRpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpIHtcblx0XHRcdFx0b2JqMVthdHRyTmFtZV0gPSBvYmoyW2F0dHJOYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG9iajE7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldEFjdGlvbnNDb3VudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBY3Rpb25zKCkgPyBPYmplY3Qua2V5cyh0aGlzLmdldEFjdGlvbnMoKSkubGVuZ3RoIDogMDtcblx0fVxuXG5cdGdldEFjdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFuaWZlc3QgJiYgdGhpcy5tYW5pZmVzdC5hY3Rpb25zP3RoaXMubWFuaWZlc3QuYWN0aW9ucyA6IHt9O1xuXHR9XG5cblx0c2V0RmluZEJ5KGtleSwgdmFsdWUpIHtcblx0XHR2YXIgb2JqID0ge307XG5cdFx0b2JqW2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIob2JqKTtcblx0fVxuXG5cdHNldEZpbHRlcihmaWx0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdmaWx0ZXInLCBmaWx0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFNvcnRlcihzb3J0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUocGFnZVNpemUpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZXIocGFnZVNpemUsIHBhZ2VOdW1iZXIpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldE1vZGVsUGFyYW0oJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0c2V0TW9kZWxQYXJhbShwYXJhbU5hbWUsIHBhcmFtVmFsdWUpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCkpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucyhwYXJhbU5hbWUsIHBhcmFtVmFsdWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZGVsUGFyYW0ocGFyYW1OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucyhwYXJhbU5hbWUsIG51bGwpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdHJlcXVlc3QocmVjb3JkLCBhY3Rpb25OYW1lLCBjYWxsYmFja1N1Y2Nlc3MsIGNhbGxiYWNrRXJyb3IpIHtcblx0XHRub3RDb21tb24ubG9nKCdyZXF1ZXN0JywgcmVjb3JkLCBhY3Rpb25OYW1lLCBjYWxsYmFja1N1Y2Nlc3MsIGNhbGxiYWNrRXJyb3IpO1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKGFjdGlvbk5hbWUpLFxuXHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRpZiAoYWN0aW9uRGF0YSl7XG5cdFx0XHR2YXIgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhtbGh0dHAub3BlbihhY3Rpb25EYXRhLm1ldGhvZCwgdXJsKTtcblx0XHRcdHhtbGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpO1xuXHRcdFx0eG1saHR0cC5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4bWxodHRwLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4bWxodHRwLmNhbGxiYWNrU3VjY2VzcyA9IGNhbGxiYWNrU3VjY2Vzcztcblx0XHRcdHhtbGh0dHAuY2FsbGJhY2tFcnJvciA9IGNhbGxiYWNrRXJyb3I7XG5cdFx0XHR4bWxodHRwLm9ubG9hZCA9IHRoaXMub25Mb2FkO1xuXHRcdFx0eG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpKTtcblx0XHR9XG5cdH1cblxuXHRvbkxvYWQoKXtcblx0XHRsZXQgc3RhdHVzID0gdGhpcy5zdGF0dXMsXG5cdFx0XHRkYXRhID0gdGhpcy5yZXNwb25zZSxcblx0XHRcdHJlc3VsdCA9IFtdO1xuXHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRpZih0aGlzLmFjdGlvbkRhdGEgJiYgdGhpcy5hY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpc0FycmF5JykgJiYgdGhpcy5hY3Rpb25EYXRhLmlzQXJyYXkpIHtcblx0XHRcdFx0ZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBpdGVtKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0ID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2FsbGJhY2tTdWNjZXNzICYmIHRoaXMuY2FsbGJhY2tTdWNjZXNzKHJlc3VsdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY2FsbGJhY2tFcnJvciAmJiB0aGlzLmNhbGxiYWNrRXJyb3IoZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0ZmlsZVVwbG9hZChmaWxlVXBsb2FkKSB7XG5cdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdC8vbm90Q29tbW9uLmxvZyhmaWxlVXBsb2FkLmZpbGUpO1xuXHRcdGlmICh4aHIudXBsb2FkICYmIHRoaXMuZmlsZUFsbG93ZWQoZmlsZVVwbG9hZC5maWxlKSkge1xuXHRcdFx0Ly8gcHJvZ3Jlc3MgYmFyXG5cdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcInByb2dyZXNzXCIsIGUsIGZpbGVVcGxvYWQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGF0LndvcmtpbmcuZmlsZVVwbG9hZHMuaW5kZXhPZihmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHRcdHRoYXQud29ya2luZy5maWxlVXBsb2Fkcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwic3VjY2Vzc1wiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9wZW4oXCJQT1NUXCIsIHRoaXMuZ2V0VXBsb2FkVXJsKCksIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgZmlsZVVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYX0ZJTEVOQU1FXCIsIGVuY29kZVVSSUNvbXBvbmVudChmaWxlVXBsb2FkLmZpbGUubmFtZSkpO1xuXHRcdFx0eGhyLnNlbmQoZmlsZVVwbG9hZC5maWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBuZXcgRXZlbnQoXCJXcm9uZ0ZpbGVUeXBlXCIpLCBmaWxlVXBsb2FkKTtcblx0XHR9XG5cdH1cblx0Ki9cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJztcblxuY29uc3QgTUVUQV9JTlRFUkZBQ0UgPSBTeW1ib2woJ2ludGVyZmFjZScpLFxuXHRNRVRBX1BST1hZID0gU3ltYm9sKCdwcm94eScpLFxuXHRNRVRBX0NIQU5HRSA9IFN5bWJvbCgnY2hhbmdlJyksXG5cdE1FVEFfQ0hBTkdFX05FU1RFRCA9IFN5bWJvbCgnY2hhbmdlLm5lc3RlZCcpLFxuXHRNRVRBX1NBTCA9IFsnZ2V0QXR0cicsICdnZXRBdHRycycsICdzZXRBdHRyJywgJ3NldEF0dHJzJywgJ2dldERhdGEnLCAnc2V0RGF0YScsICdnZXRKU09OJywgJ29uJywgJ29mZicsICd0cmlnZ2VyJ10sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTA7XG5cbnZhciBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jyl7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJyl7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHJlc1RhcmdldCwga2V5LCBjb250ZXh0KTtcblx0XHR9LmJpbmQob3duZXIpLFxuXHRcdHNldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIHZhbHVlLyosIHByb3h5Ki8pIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0eXBlb2YgdGFyZ2V0W2tleV0pO1xuXG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0XHRcdHZhbHVlVG9SZWZsZWN0ID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpLCBub3RQYXRoLmpvaW4odGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCAgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RQcm9wZXJ0eSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKGdldFJvb3QsIHBhdGhUbywgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKGl0ZW0uaXNQcm94eSl7XG5cdFx0XHQvL25vdENvbW1vbi5lcnJvcigndGhpcyBpcyBQcm94eSBwcm9wZXJ0eScpO1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRnZXRSb290OiBnZXRSb290LFxuXHRcdFx0cGF0aDogcGF0aFRvXG5cdFx0fSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3BlcnR5IHByb3h5IHByb3BlcnR5IGNyZWF0ZWQgZnJvbScsIGl0ZW0pO1xuXHRcdHRoaXMuc2V0RGF0YShpdGVtKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzLnJldHVyblRvUm9vdC5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdHJldHVyblRvUm9vdChwcm94eSwga2V5LCB2YWx1ZSl7XG5cdFx0bGV0IC8qcGF0aCA9IHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCovXG5cdFx0XHRyb290ID0gdGhpcy5nZXRPcHRpb25zKCdnZXRSb290JykoKTtcblx0XHRyb290LnRyaWdnZXIoJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfUFJPWFldLCB0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5LCB2YWx1ZSk7XG5cdH1cbn1cblxudmFyIGNyZWF0ZVJlY29yZEhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jyl7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJyl7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHJlc1RhcmdldCwga2V5LCBjb250ZXh0KTtcblx0XHR9LmJpbmQob3duZXIpLFxuXHRcdHNldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIHZhbHVlLyosIHByb3h5Ki8pIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGFyZ2V0LCBrZXksIHZhbHVlKTtcblx0XHRcdFx0cmV0dXJuIHQ7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0fTtcbn07XG5cbmNsYXNzIG5vdFJlY29yZCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCwgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1Byb3h5KXtcblx0XHRcdG5vdENvbW1vbi5lcnJvcigndGhpcyBpcyBQcm94eSBpdGVtJyk7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUmVjb3JkKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRmaWx0ZXI6IHt9LFxuXHRcdFx0c29ydGVyOiB7fSxcblx0XHRcdHBhZ2VOdW1iZXI6IERFRkFVTFRfUEFHRV9OVU1CRVIsXG5cdFx0XHRwYWdlU2l6ZTogREVGQVVMVF9QQUdFX1NJWkUsXG5cdFx0XHRmaWVsZHM6IFtdXG5cdFx0fSk7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0gPSBuZXcgbm90UmVjb3JkSW50ZXJmYWNlKG1hbmlmZXN0KTtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpcy5pbnRlcmZhY2VVcCgpO1xuXHRcdHRoaXMuaXNSZWNvcmQgPSB0cnVlO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgcmVjb3JkIGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0aW5pdFByb3BlcnRpZXMoaXRlbSwgcGF0aCA9ICcnKXtcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpe1xuXHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhpdGVtKTtcblx0XHRcdGZvcihsZXQga2V5IG9mIGtleXMpe1xuXHRcdFx0XHRsZXQgY3VyUGF0aCA9IHBhdGgrKHBhdGgubGVuZ3RoPjA/Jy4nOicnKStrZXk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3VyUGF0aCcsIGN1clBhdGgpO1xuXHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KGtleSkpe1xuXHRcdFx0XHRcdGlmKHR5cGVvZiBpdGVtW2tleV0gPT09ICdvYmplY3QnKXtcblx0XHRcdFx0XHRcdHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbVtrZXldLCBjdXJQYXRoKTtcblx0XHRcdFx0XHRcdGl0ZW1ba2V5XSA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldFJvb3QuYmluZCh0aGlzKSwgY3VyUGF0aCwgaXRlbVtrZXldKTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgbm90IG93biBwcm9wZXJ0eScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpdGVtO1xuXHR9XG5cblx0Z2V0Um9vdCgpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gdGhpcy5jcmVhdGVDb21tb25SZXF1ZXN0KGluZGV4KTtcblx0XHRcdC8vbm90Q29tbW9uLmxvZygnZGVmaW5lJywgREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXgpO1xuXHRcdH1cblx0fVxuXG5cdGNyZWF0ZUNvbW1vblJlcXVlc3QoaW5kZXgpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2tTdWNjZXNzLCBjYWxsYmFja0Vycm9yKSB7XG5cdFx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXF1ZXN0KHRoaXMsIGluZGV4LCBjYWxsYmFja1N1Y2Nlc3MsIGNhbGxiYWNrRXJyb3IpO1xuXHRcdH0uYmluZCh0aGlzKTtcblx0fVxuXG5cdC8qXG5cdC0+ICdwYXRoLnRvLmtleScsIHZhbHVlT2ZLZXlcblx0PC0gb2ssIHdpdGggb25lIG9uQ2hhbmdlIGV2ZW50IHRyaWdnZXJlZFxuXHQqL1xuXG5cdHNldEF0dHIoa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBub3RQYXRoLnNldChrZXksIHRoaXNbTUVUQV9QUk9YWV0sIHt9LCB2YWx1ZSk7XG5cdH1cblxuXHQvKlxuXHQtPlxuXHR7XG5cdFx0J2tleVBhdGgnOiB2YWx1ZSxcblx0XHQna2V5LnN1YlBhdGgnOiB2YWx1ZTIsXG5cdFx0J2tleVBhdGguMC50aXRsZSc6IHZhbHVlM1xuXHR9XG5cdDwtIG9rLCB3aXRoIGJ1bmNoIG9mIG9uQ2hhbmdlIGV2ZW50cyB0cmlnZ2VyZWRcblx0Ki9cblx0c2V0QXR0cnMob2JqZWN0UGFydCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCl7XG5cdFx0XHRmb3IobGV0IHBhdGggaW4gb2JqZWN0UGFydCl7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMgb25lIHRvIGdvJywgcGF0aCk7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cihwYXRoLCBvYmplY3RQYXJ0W3BhdGhdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aFRvS2V5J1xuXHQ8LSB2YWx1ZTFcblxuXHQqL1xuXHRnZXRBdHRyKHdoYXQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ2dldEF0dHInLCB3aGF0KTtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQod2hhdCwgdGhpc1tNRVRBX1BST1hZXSwge30pO1xuXHR9XG5cblx0Lypcblx0LT4gWydwYXRoVG9LZXknLCAncGF0aC50by5rZXknLCAnc2ltcGxlS2V5JywuLi5dXG5cdDwtIFt2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzLC4uLl1cblx0Ki9cblx0Z2V0QXR0cnMod2hhdCkge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAod2hhdCAmJiB3aGF0Lmxlbmd0aCA+IDApe1xuXHRcdFx0Zm9yKGxldCBwYXRoIG9mIHdoYXQpe1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLmdldEF0dHIocGF0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSxhcmd1bWVudHNbMl0pLCBhcmd1bWVudHNbM10pO1xuXHR9XG5cblx0c2V0SXRlbShpdGVtKXtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZScpO1xuXHRcdHRoaXMub2ZmKCdjaGFuZ2UubmVzdGVkJyk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0Z2V0SlNPTigpe1xuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJjb25zdCBQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVggPSAnbi0nLFxuXHRURU1QTEFURV9UQUcgPSAnbnQnLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgPSAnLScsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYID0gJ2lmJyxcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCA9ICdub3RfY29tcG9uZW50XycsXG5cdFBBUlRfSURfUFJFRklYID0gJ25vdF9wYXJ0XycsXG5cdERFRkFVTFRfUExBQ0VSID0gJ3BsYWNlJyxcblx0REVGQVVMVF9QTEFDRVJfTE9PUCA9ICdwbGFjZUFmdGVyJztcblxuY29uc3QgT1BUUyA9IHtcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLFxuXHRURU1QTEFURV9UQUcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUixcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsXG5cdERFRkFVTFRfUExBQ0VSLFxuXHRDT01QT05FTlRfSURfUFJFRklYLFxuXHRQQVJUX0lEX1BSRUZJWCxcblx0REVGQVVMVF9QTEFDRVJfTE9PUFxufTtcblxuZXhwb3J0IGRlZmF1bHQgT1BUUztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmNvbnN0IE1FVEFfQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlQ2FjaGUgZXh0ZW5kcyBub3RCYXNle1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXSA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHR0aGlzLmhpZGVUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaWRlVGVtcGxhdGVzKCl7XG5cdFx0bGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdHQuaW5uZXJIVE1MID0gT1BUUy5URU1QTEFURV9UQUcgKyAne2Rpc3BsYXk6IG5vbmU7fSc7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KTtcblx0fVxuXG5cdHJlZ2lzdGVyKCkge1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcigndGVtcGxhdGVDYWNoZScsIHRoaXMpO1xuXHR9XG5cblx0bG9hZChtYXApIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0Zm9yICh2YXIgaSBpbiBtYXApIHtcblx0XHRcdHRoaXMubG9hZE9uZShpLCBtYXBbaV0pO1xuXHRcdH1cblx0fVxuXG5cdGxvYWRPbmUoa2V5LCB1cmwsIGNhbGxiYWNrKSB7XG5cblx0XHR2YXIgb1JlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRvUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXHRcdG9SZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbCBvZiBub3RUZW1wbGF0ZXNFbGVtZW50cyl7XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSA9PT0gY29udCl7XG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdFx0XHRyZXN1bHRbZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlXSA9IGVsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRhZGRMaWIobGliKXtcblx0XHRmb3IobGV0IHQgaW4gbGliKXtcblx0XHRcdHRoaXMuc2V0T25lKHQsIGxpYlt0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVVSTChrZXksIHVybCkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRpZiAodGhhdC5nZXQoa2V5KSl7XG5cdFx0XHRcdHJlc29sdmUodGhhdC5nZXQoa2V5KSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly90aGF0LnNldExvYWRpbmcoa2V5LCB1cmwpO1xuXHRcdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpLnRoZW4oZnVuY3Rpb24odGVtcGxhdGVJbm5lckhUTUwpe1xuXHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoYXQud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdHRoYXQuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdFx0XHRcdHJlc29sdmUodGVtcGxhdGVDb250RWwpO1xuXHRcdFx0XHR9KS5jYXRjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZScsIGtleSwgdXJsKTtcblx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRMaWJGcm9tVVJMKHVybCkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpLnRoZW4oZnVuY3Rpb24odGVtcGxhdGVzSFRNTCl7XG5cdFx0XHRcdGxldCB0ZW1wbGF0ZXMgPSB0aGF0LnBhcnNlTGliKHRlbXBsYXRlc0hUTUwpO1xuXHRcdFx0XHR0aGF0LmFkZExpYih0ZW1wbGF0ZXMpO1xuXHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGVzIGxpYicsIHVybCk7XG5cdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRGcm9tRG9jdW1lbnQoc2VsZWN0b3JPckVsZW1lbnQpe1xuXHRcdGxldCBlbCA9ICh0eXBlb2Ygc2VsZWN0b3JPckVsZW1lbnQgPT09ICdzdHJpbmcnKT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JFbGVtZW50KTpzZWxlY3Rvck9yRWxlbWVudDtcblx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBPUFRTLlRFTVBMQVRFX1RBRy50b0xvd2VyQ2FzZSgpKXtcblx0XHRcdFx0dGhpcy5zZXRPbmUoZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlLCBlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVRleHQoa2V5LCB0ZW1wbGF0ZUlubmVySFRNTCl7XG5cdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhpcy53cmFwKGtleSwgJycsIHRlbXBsYXRlSW5uZXJIVE1MKTtcblx0XHR0aGlzLnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVDYWNoZSgpO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5cbmNvbnN0IE1FVEFfUFJPQ0VTU09SUyA9IFN5bWJvbCgncHJvY2Vzc29ycycpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQcm9jZXNzb3IoLyoga2V5LCB2YWx1ZSAqLyl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UHJvY2Vzc29yKC8qIGtleSwgIGRlZmF1bHRWYWx1ZSAqLyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyUHJvY2Vzc29ycygpe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkKCl7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuXHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gYXJndW1lbnRzWzBdKXtcblx0XHRcdFx0XHR0aGlzLnNldFByb2Nlc3Nvcih0LCBhcmd1bWVudHNbMF1bdF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0UHJvY2Vzc29yKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhcigpe1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVQcm9jZXNzb3JzKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7XG5cbi8qXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgiBET00g0L/QvtC00LTQtdGA0LXQstC+INCyINC60LDRh9C10YHRgtCy0LUg0YjQsNCx0LvQvtC90LAuXG4gKiDQl9Cw0L/QvtC70L3Rj9C10YIg0LXQs9C+INC00LDQvdC90YvQvNC4LlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YHQs9C10L3QtdGA0LjRgNC+0LLQsNC90L3Ri9C1INGN0LvQtdC80LXQvdGC0YtcbiAqXG4gKiAqL1xuXG4vKlxuXG5cdDxkaXYgbi10ZW1wbGF0ZS1uYW1lPVwidmFzeWFcIj5cblx0XHQ8cD48aW5wdXQgdHlwZT1cInRleHRcIiBuLXZhbHVlPVwiOmNvb2xOYW1lXCIvPjwvcD5cblx0XHQ8cD7QkdC+0YDQuNGBINGF0YDQtdC9INC/0L7Qv9Cw0LTQtdGI0Ywg0Lgge3s6Y29vbE5hbWV9fS48L3A+XG5cdDwvZGl2PlxuXG4gKi9cblxuY29uc3QgTUVUQV9DT01QT05FTlRTID0gU3ltYm9sKCdjb21wb25lbnRzJyk7XG5cbmNsYXNzIG5vdFJlbmRlcmVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdC8qXG5cdFx0aW5wdXQgPSB7XG5cdFx0XHRkYXRhOiBub3RSZWNvcmQsXG5cdFx0XHR0ZW1wbGF0ZTogZWxlbWVudFxuXHRcdFx0b3B0aW9uczp7XG5cdFx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHQqL1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU10gPSB7fTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMuY29tcG9uZW50ID0gaW5wdXQuY29tcG9uZW50O1xuXHRcdHRoaXMuaW5pdERhdGEoaW5wdXQuZGF0YSA/IGlucHV0LmRhdGEgOiB7fSk7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0LnRlbXBsYXRlKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZSgpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndGVtcGxhdGUnLCB0aGlzLmdldFdvcmtpbmcoJ2dldFRlbXBsYXRlJykoKSk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuZ2V0RGF0YSgpLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHR9XG5cblx0aW5pdFdvcmtpbmcodGVtcGxhdGUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0Z2V0VGVtcGxhdGU6IHRlbXBsYXRlLFxuXHRcdFx0cGFydElkOiB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpID8gdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA6IE9QVFMuUEFSVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKSB7XG5cdFx0aWYgKHRoaXMuY29tcG9uZW50KSB7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMuY29tcG9uZW50LmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH1cblx0fVxuXG5cdG9uQ2hhbmdlKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0bm90Q29tbW9uLmxvZyh0aGlzKTtcblx0XHRub3RDb21tb24ubG9nKHRoaXMuZ2V0QnJlYWRDcnVtcHMoKS5qb2luKCcgPiAnKSk7XG5cdFx0bm90Q29tbW9uLmxvZygndXBkYXRpbmcgcmVuZGVyZXIgJywgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKSwgJyBhZnRlciBjaGFuZ2VzJywga2V5LCB2YWx1ZSk7XG5cdFx0dGhpcy51cGRhdGUoa2V5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ29ic29sZXRlJyk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHR1cGRhdGUoa2V5KSB7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfQ09NUE9ORU5UU10pIHtcblx0XHRcdGxldCBpdGVtID0gdGhpc1tNRVRBX0NPTVBPTkVOVFNdW3RdLFxuXHRcdFx0XHRpZlBhcnQgPSB0cnVlO1xuXHRcdFx0aWYgKGtleSl7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJyk9PT1udWxsKXtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXRcdGNvbXBvbmVudFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpKSxcblx0XHRcdFx0XHRjaGFuZ2VkUGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChrZXkpO1xuXHRcdFx0XHRpZlBhcnQgPSBub3RQYXRoLmlmRnVsbFN1YlBhdGgoY2hhbmdlZFBhdGgsIGNvbXBvbmVudFBhdGgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKGl0ZW0uZ2V0T3B0aW9ucygnbmFtZScpLCAnID4tPCAnLCBpdGVtLmdldE9wdGlvbnMoJ2lkJyksICcgPi08ICcsIGNvbXBvbmVudFBhdGgsIGNoYW5nZWRQYXRoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygnd2lsbCBiZSB1cGRhdGVkJywgaWZQYXJ0KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlmUGFydCkge1xuXHRcdFx0XHRpdGVtLnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldFdvcmtpbmdNYXBwaW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbWFwcGluZycsIHRoaXMuY3JlYXRlTWFwcGluZygpKTtcblx0fVxuXG5cdC8qXG5cblx00KHQvtC30LTQsNC10Lwg0LrQsNGA0YLRiyDRgdC+0L7RgtCy0LXRgdGC0LLQuNGPINC/0YDQvtGG0LXRgdGB0L7RgNC+0LIsINC/0YPRgtC10Lkg0LTQsNC90L3Ri9GFINCyINC+0LHRitC10LrRgtC1INC4INGN0LvQtdC80LXQvdGC0L7QsiDRiNCw0LHQu9C+0L3QsC5cblx0W3tcblx0XHRlbCxcblx0XHRwcm9jZXNzb3IsXG5cdFx0d29ya2luZyxcblx0XHRpdGVtLnByb3BlcnR5LnBhdGhcblx0fV1cblxuXHQqL1xuXG5cdGNyZWF0ZU1hcHBpbmcoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZmluZEFsbFByb2Nlc3NvcnMoKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZmluZEFsbFByb2Nlc3NvcnMoKSB7XG5cdFx0bGV0IHByb2NzID0gW10sXG5cdFx0XHRlbHMgPSBub3RDb21tb24uZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgodGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGVscy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGF0dHMgPSBlbHNbal0uYXR0cmlidXRlcywgbiA9IGF0dHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRzW2ldLm5vZGVOYW1lLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpID09PSAwKSB7XG5cdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGF0dHNbaV0pO1xuXHRcdFx0XHRcdGxldCBwcm9jRGF0YSA9IHRoaXMucGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKGF0dHNbaV0ubm9kZU5hbWUpO1xuXHRcdFx0XHRcdHByb2NEYXRhLmVsZW1lbnQgPSBlbHNbal07XG5cdFx0XHRcdFx0cHJvY0RhdGEucHJvY2Vzc29yRXhwcmVzc2lvbiA9IGF0dHNbaV0ubm9kZU5hbWU7XG5cdFx0XHRcdFx0cHJvY0RhdGEuYXR0cmlidXRlRXhwcmVzc2lvbiA9IGF0dHNbaV0udmFsdWU7XG5cdFx0XHRcdFx0cHJvY3MucHVzaChwcm9jRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHByb2NzO1xuXHR9XG5cblx0cGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKHByb2Nlc3NvckV4cHJlc3Npb24pIHtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0cGFyYW1zOiBbXSxcblx0XHRcdHByb2Nlc3Nvck5hbWU6ICcnLFxuXHRcdFx0aWZDb25kaXRpb246IGZhbHNlXG5cdFx0fTtcblx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLCAnJyk7XG5cdFx0aWYgKHByb2Nlc3NvckV4cHJlc3Npb24uaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYKSA9PT0gKHByb2Nlc3NvckV4cHJlc3Npb24ubGVuZ3RoIC0gT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWC5sZW5ndGgpKSB7XG5cdFx0XHRyZXN1bHQuaWZDb25kaXRpb24gPSB0cnVlO1xuXHRcdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiArIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsICcnKTtcblx0XHR9XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHByb2Nlc3NvckV4cHJlc3Npb24uc3BsaXQoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IpO1xuXHRcdHJlc3VsdC5wcm9jZXNzb3JOYW1lID0gcmVzdWx0LnBhcmFtc1swXTtcblx0XHRyZXN1bHQucGFyYW1zID0gcmVzdWx0LnBhcmFtcy5zbGljZSgxKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZXhlY1Byb2Nlc3NvcnMoaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbWFwcGluZyA9IHRoaXMuZ2V0V29ya2luZygnbWFwcGluZycpO1xuXHRcdGlmIChtYXBwaW5nKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBpbmcubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IHByb2NTY29wZSA9IG1hcHBpbmdbaV07XG5cdFx0XHRcdHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocHJvY1Njb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGluZGV4KTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdhdHRyaWJ1dGVSZXN1bHQnLCBwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0XHRcdFx0bGV0IHByb2NOYW1lID0gcHJvY1Njb3BlLnByb2Nlc3Nvck5hbWUsXG5cdFx0XHRcdFx0cHJvYyA9IG5vdFRlbXBsYXRlUHJvY2Vzc29ycy5nZXQocHJvY05hbWUpO1xuXHRcdFx0XHRpZiAocHJvYykge1xuXHRcdFx0XHRcdHByb2MocHJvY1Njb3BlLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHRcdFx0XHRcdHByb2NTY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9jU2NvcGUucHJvY2Vzc29yRXhwcmVzc2lvbik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyBwcm9jZXNzb3IgbGlrZScsIHByb2NOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ3JlbmRlcmVkJyk7XG5cdH1cblxuXHRnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHBhdGgsIGl0ZW0pIHtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQocGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0fVxuXG5cdGNsZWFyU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuZGVzdHJveVN1YnMoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N1YnMnLCBbXSk7XG5cdH1cblxuXHRkZXN0cm95U3VicygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdFx0dC5kZXN0cm95KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0U3Rhc2goKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRsZXQgZWwgPSB0aGlzLmdldFN0YXNoKClbdF07XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSl7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmU3ViRWxlbWVudFJlbmRlcmVkKG50RWwpIHtcblx0XHRyZXR1cm4gbnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQgJiYgKG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkLnZhbHVlID09PSAndHJ1ZScpO1xuXHR9XG5cblx0c2VhcmNoRm9yU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRsZXQgc3VicyA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3JBbGwoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCBvZiBzdWJzKSB7XG5cdFx0XHRpZiAoIXRoaXMuaWZTdWJFbGVtZW50UmVuZGVyZWQobnQpKSB7XG5cdFx0XHRcdHRoaXMucmVuZGVyU3ViKG50KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhZGRTdWIobnRFbCkge1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnc3VicycpLnB1c2goe1xuXHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRwYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogJycsXG5cdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS5zcmMgOiAnJyxcblx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdFx0cmVuZGVyZWRMaXN0OiBbXSxcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclN1YihudEVsKSB7XG5cdFx0aWYgKCFudEVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGxldCBkZXRhaWxzID0ge1xuXHRcdFx0XHRkYXRhUGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6IG51bGwsXG5cdFx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLnNyYy52YWx1ZSA6ICcnLFxuXHRcdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdGRhdGE6IGRldGFpbHMuZGF0YVBhdGghPT0gbnVsbD8gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KGRldGFpbHMuZGF0YVBhdGgsIHRoaXMuZ2V0RGF0YSgpKTpudWxsLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRzcmM6IGRldGFpbHMuc3JjXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlQWZ0ZXInLFxuXHRcdFx0XHRcdGlkOiBkZXRhaWxzLmlkLFxuXHRcdFx0XHRcdG50RWw6IG50RWwsXG5cdFx0XHRcdFx0ZGF0YVBhdGg6IGRldGFpbHMuZGF0YVBhdGhcblx0XHRcdFx0fSxcblx0XHRcdFx0b3duZXI6IHRoaXNcblx0XHRcdH07XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgZGV0YWlscy5pZCk7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdW2RldGFpbHMuaWRdID0gbmV3IG5vdENvbXBvbmVudChvcHRpb25zKTtcblx0fVxuXG5cdGNsZWFyU3Rhc2goKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIFtdKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGUnKTtcblx0fVxuXG5cdGdldFN0YXNoKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3N0YXNoJyk7XG5cdH1cblxuXHRzdGFzaFJlbmRlcmVkKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHR0aGlzLmFkZFRvU3Rhc2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0fVxuXG5cdHJlcGxhY2VSZW5kZXJlZCgpIHtcblx0XHRub3RDb21tb24ubG9nKCdyZXBsYWNlIHN0YXNoJyk7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLFxuXHRcdFx0c3Rhc2ggPSB0aGlzLmdldFN0YXNoKCksXG5cdFx0XHRuZXdTdGFzaCA9IFtdLFxuXHRcdFx0YW5jaG9yID0gc3Rhc2gubGVuZ3RoID4gMCA/IHN0YXNoWzBdIDogdGhpcy5nZXRPcHRpb25zKCdudEVsJyksXG5cdFx0XHRwYXJlbnROb2RlID0gYW5jaG9yLnBhcmVudE5vZGU7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0bmV3U3Rhc2gucHVzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgbmV3U3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdGlmIChhbmNob3IubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1N0YXNoW3RdLCBhbmNob3IubmV4dFNpYmxpbmcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3U3Rhc2hbdF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHN0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRwYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0YXNoW3RdKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIG5ld1N0YXNoKTtcblx0fVxuXG5cdGFkZFRvU3Rhc2gobm9kZSkge1xuXHRcdHRoaXMuZ2V0U3Rhc2goKS5wdXNoKG5vZGUpO1xuXHR9XG5cblx0aXNEYXRhKGRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkgPT09IGRhdGE7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVuZGVyZXI7XG4iLCJjb25zdCBwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XG5cdFx0d2hpbGUgKHRhcmdldEVsLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0dGFyZ2V0RWwucmVtb3ZlQ2hpbGQodGFyZ2V0RWwuY2hpbGRyZW5bMF0pO1xuXHRcdH1cblx0fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9XG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2U7XG4iLCJjb25zdCBwbGFjZUFmdGVyID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VBZnRlcjtcbiIsImNvbnN0IHBsYWNlQmVmb3JlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VCZWZvcmU7XG4iLCJjb25zdCBwbGFjZUZpcnN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlRmlyc3Q7XG4iLCJjb25zdCBwbGFjZUxhc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUxhc3Q7XG4iLCJjb25zdCByZXBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdHRhcmdldEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFyZ2V0RWwpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlO1xuIiwiaW1wb3J0IHBsYWNlIGZyb20gJy4vcGxhY2UnO1xuaW1wb3J0IHBsYWNlQWZ0ZXIgZnJvbSAnLi9wbGFjZUFmdGVyJztcbmltcG9ydCBwbGFjZUJlZm9yZSBmcm9tICcuL3BsYWNlQmVmb3JlJztcbmltcG9ydCBwbGFjZUZpcnN0IGZyb20gJy4vcGxhY2VGaXJzdCc7XG5pbXBvcnQgcGxhY2VMYXN0IGZyb20gJy4vcGxhY2VMYXN0JztcbmltcG9ydCByZXBsYWNlIGZyb20gJy4vcmVwbGFjZSc7XG5cbmNvbnN0IG5vdFBsYWNlcnMgPSB7XG5cdHBsYWNlOiBwbGFjZSxcblx0cGxhY2VBZnRlcjogcGxhY2VBZnRlcixcblx0cGxhY2VCZWZvcmU6IHBsYWNlQmVmb3JlLFxuXHRwbGFjZUZpcnN0OiBwbGFjZUZpcnN0LFxuXHRwbGFjZUxhc3Q6IHBsYWNlTGFzdCxcblx0cmVwbGFjZTogcmVwbGFjZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90UGxhY2VycztcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi9ub3RSZW5kZXJlcic7XG5pbXBvcnQgbm90UGxhY2VycyBmcm9tICcuL3BsYWNlcnMnO1xuXG5jb25zdCBNRVRBX1BBUlRTID0gU3ltYm9sKCdwYXJ0cycpO1xuLypcblx0aW5wdXQgPSB7XG5cdFx0ZGF0YTogbm90UmVjb3JkIG9yIFtub3RSZWNvcmRdLFxuXHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRodG1sOiBodG1sKHN0cmluZyksIFx0XHQvL9GC0LXQutGB0YIg0YEgaHRtbCDQutC+0LTQvtC8INGI0LDQsdC70L7QvdCwXG5cdFx0XHRlbDogSFRNTEVsZW1lbnQob2JqZWN0KSwgXHQvL0RPTSDRjdC70LXQvNC10L3RglxuXHRcdFx0c3JjOiBzcmMoc3RyaW5nKSxcdFx0XHQvL9GB0YHRi9C70LrQsCDQvdCwINGE0LDQudC7INGBINGI0LDQsdC70L7QvdC+0Lxcblx0XHRcdG5hbWU6IG5hbWUoc3RyaW5nKVx0XHRcdC8v0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCDQtNC70Y8g0L/QvtC40YHQutCwINCyINC60Y3RiNC1IG5vdFRlbXBsYXRlQ2FjaGVcblx0XHR9XG5cdFx0b3B0aW9uczp7XG5cdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHQvL9CwINGN0YLQviDQutCw0Log0LHRg9C00LXQvCDQv9C+0LzQtdGJ0LDRgtGMINGA0LXQt9GD0LvRjNGC0LDRgiDRgNC10L3QtNC10YDQuNC90LPQsFxuXHRcdFx0cmVuZGVyQW5kOiBwbGFjZVN0eWxlKHN0cmluZykg0L7QtNC40L0g0LjQtyDQstCw0YDQuNCw0L3RgtC+0LJcblx0XHRcdFx0XHRwbGFjZVx0XHQtXHTQv9C+0LzQtdGJ0LDQtdC8INCy0L3Rg9GC0YDQuCDRhtC10LvQtdCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0XHRyZXBsYWNlXHRcdC1cdNC30LDQvNC10L3Rj9C10Lxcblx0XHRcdFx0XHRwbGFjZUFmdGVyXHQtXHTQv9C+0YHQu9C1XG5cdFx0XHRcdFx0cGxhY2VCZWZvcmVcdC1cdNC00L5cblx0XHRcdFx0XHRwbGFjZUZpcnN0XHQtXHTQstC90YPRgtGA0Lgg0L/QtdGA0LLRi9C8INC00L7Rh9C10YDQvdC40Lxcblx0XHRcdFx0XHRwbGFjZUxhc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C+0YHQu9C10LTQvdC40Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdH1cblx0fVxuKi9cbmNsYXNzIG5vdENvbXBvbmVudCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKXtcblx0XHRpZiAodGhpcy5vd25lcil7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMub3duZXIuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMub3duZXIgPSBpbnB1dC5vd25lcj9pbnB1dC5vd25lcjpudWxsO1xuXHRcdHRoaXMuaW5pdERhdGEoaW5wdXQuZGF0YSA/IGlucHV0LmRhdGEgOiB7fSk7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnaWQnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2lkJywgT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdudEVsJykpe1xuXHRcdFx0dGhpcy5pbml0TWFya0VsZW1lbnQoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFya0VsZW1lbnQoKXtcblx0XHRsZXQgbWFya0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbnQnKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ250RWwnLCBtYXJrRWwpO1xuXHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRwbGFjZXIubWFpbih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksIFttYXJrRWxdKTtcblx0fVxuXG5cdGluaXRXb3JraW5nKHZhbCkge1xuXHRcdHRoaXMudW5zZXRSZWFkeSh2YWwpO1xuXHR9XG5cblx0cHJlcGFyZVRlbXBsYXRlRWxlbWVudCh2YWwpIHtcblx0XHRpZiAoIXZhbCkge1xuXHRcdFx0dGhpcy51bnNldFJlYWR5KCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2h0bWwnKSAmJiB2YWwuaHRtbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLndyYXAoJycsICcnLCB2YWwuaHRtbCkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdlbCcpICYmIHZhbC5lbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudCh2YWwuZWwuY2xvbmVOb2RlKHRydWUpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnc3JjJykgJiYgdmFsLnNyYykge1xuXHRcdFx0bm90VGVtcGxhdGVDYWNoZS5nZXRGcm9tVVJMKHZhbC5zcmMsIHZhbC5zcmMpXG5cdFx0XHRcdC50aGVuKHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQuYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCduYW1lJykgJiYgdmFsLm5hbWUpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS5nZXQodmFsLm5hbWUpKTtcblx0XHR9XG5cdH1cblxuXHRzZXRQcm90b1RlbXBsYXRlRWxlbWVudChjb250KSB7XG5cdFx0aWYgKGNvbnQpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnLCBjb250KTtcblx0XHRcdHRoaXMudHJpZ2dlcigncmVhZHknKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdXcm9uZyB0ZW1wbGF0ZSBjb250YWluZXIgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JykuY2xvbmVOb2RlKHRydWUpO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdHJlc2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnLCB0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkuY2xvbmVOb2RlKHRydWUpKTtcblx0fVxuXG5cdHNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB0cnVlKTtcblx0fVxuXG5cdHVuc2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIGZhbHNlKTtcblx0fVxuXG5cdGlzUmVhZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncmVhZHknKTtcblx0fVxuXG5cdGNsZWFyUGFydHMoKSB7XG5cdFx0Lyog0LjQt9Cy0LXRidCw0LXQvCDQvtCxINGD0LTQsNC70LXQvdC40Lgg0Y3Qu9C10LzQtdC90YLQvtCyICovXG5cdFx0aWYgKHRoaXNbTUVUQV9QQVJUU10gJiYgQXJyYXkuaXNBcnJheSh0aGlzW01FVEFfUEFSVFNdKSAmJiB0aGlzW01FVEFfUEFSVFNdLmxlbmd0aCkge1xuXHRcdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfUEFSVFNdKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdHJlc2V0UGFydHMoKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXSA9IFtdO1xuXHR9XG5cblx0Z2V0UGFydHMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QQVJUU107XG5cdH1cblxuXHRhZGRQYXJ0KHRlbXBsYXRlKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXS5wdXNoKHRlbXBsYXRlKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMucmVtb3ZlT2Jzb2xldGVQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gdGFyZ2V0IGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRwbGFjZVBhcnQoZGF0YSwgaW5kZXgpe1xuXHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpLFxuXHRcdFx0bm9kZXMgPSBwYXJ0LmdldFN0YXNoKCksXG5cdFx0XHR0YXJnZXRFbCxcblx0XHRcdGxhc3ROb2RlLFxuXHRcdFx0cGxhY2VyO1xuXHRcdGlmIChpbmRleCA9PT0gMCl7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIoT1BUUy5ERUZBVUxUX1BMQUNFUl9MT09QKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScpO1xuXHRcdH1cblx0XHRwbGFjZXIubWFpbih0YXJnZXRFbCwgbm9kZXMpO1xuXG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRwbGFjZU5vZGVzKG5vZGVzKXtcblx0XHRub3RDb21tb24ubG9nKCdwbGFjZWQgcGFydCcsIG5vZGVzKTtcblx0fVxuXG5cdGdldFBsYWNlcihtZXRob2QpIHtcblx0XHRub3RDb21tb24ubG9nKCdzZWFyY2hpbmcgZm9yIHBsYWNlcicsIG1ldGhvZCk7XG5cdFx0aWYgKG5vdFBsYWNlcnMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbbWV0aG9kXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbT1BUUy5ERUZBVUxUX1BMQUNFUl07XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaERhdGEoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldERhdGEoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaFBhcnQoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0UGFydHMoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXRQYXJ0cygpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdNC10YHQu9C4INGBINC00LDQvdC90YvQvNC4INC90LUg0YHQstGP0LfQsNC9INGA0LXQvdC00LXRgNC10YAgLSDRgdC+0LfQtNCw0LXQvFxuXHQqL1xuXG5cdHJlbmRlclBhcnQoZGF0YSkge1xuXHRcdGlmICghdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKSB7XG5cdFx0XHRub3RDb21tb24ubG9nKCdjcmVhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0bGV0IHJlbmRlcmVyID0gbmV3IG5vdFJlbmRlcmVyKHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dGVtcGxhdGU6IHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKSxcblx0XHRcdFx0Y29tcG9uZW50OiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdC8vcmVuZGVyZXIub24oJ29ic29sZXRlJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFkZFBhcnQocmVuZGVyZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRpbmcgcGFydCByZW5kZXInKTtcblx0XHRcdHRoaXMudXBkYXRlUGFydCh0aGlzLmdldFBhcnRCeURhdGEoZGF0YSkpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZVBhcnQocGFydCl7XG5cdFx0cGFydC51cGRhdGUoKTtcblx0fVxuXG5cdHJlbW92ZU9ic29sZXRlUGFydHMoKSB7XG5cdFx0Ly/QutC+0L3QstC10LXRgCDQv9C+0LjRgdC6INCw0LrRgtGD0LDQu9GM0L3Ri9GFIC0g0YPQtNCw0LvQtdC90LjQtSDQvtGB0YLQsNC70YzQvdGL0YVcblx0XHRub3RDb21tb24ucGlwZShcblx0XHRcdHVuZGVmaW5lZCwgLy8gcGFydHMgdG8gc2VhcmNoIGluLCBjYW4gYmUgJ3VuZGVmaW5lZCdcblx0XHRcdFtcblx0XHRcdFx0dGhpcy5maW5kQWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9maXJzdCByb3VuZCwgc2VhcmNoIGZvciBvYnNvbGV0ZVxuXHRcdFx0XHR0aGlzLnJlbW92ZU5vdEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vcmVtb3ZlICdlbVxuXHRcdFx0XVxuXHRcdCk7XG5cdH1cblxuXHQvKlxuXHRcdNC10YHRgtGMINC00LDQvdC90YvQtSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINCw0LrRgtGD0LDQu9GM0L3Qvixcblx0XHTQvdC10YIg0LTQsNC90L3Ri9GFINC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0YHRgtCw0YDRjNGRXG5cdCovXG5cblx0ZmluZEFjdHVhbFBhcnRzKCkge1xuXHRcdGxldCBhY3R1YWxQYXJ0cyA9IFtdO1xuXHRcdHRoaXMuZm9yRWFjaERhdGEoKGRhdGEvKiwgaW5kZXgqLyk9Pntcblx0XHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpO1xuXHRcdFx0aWYgKHBhcnQpe1xuXHRcdFx0XHRhY3R1YWxQYXJ0cy5wdXNoKHBhcnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBhY3R1YWxQYXJ0cztcblx0fVxuXG5cdC8qXG5cdFx00YPQtNCw0LvRj9C10Lwg0LLRgdC1INC60YDQvtC80LUg0LDQutGC0YPQsNC70YzQvdGL0YVcblx0Ki9cblx0cmVtb3ZlTm90QWN0dWFsUGFydHMoYWN0dWFsUGFydHMpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFBhcnRzKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYgKGFjdHVhbFBhcnRzLmluZGV4T2YodGhpcy5nZXRQYXJ0cygpW3RdKSA9PT0gLTEpe1xuXHRcdFx0XHR0aGlzLmdldFBhcnRzKClbdF0uZGVzdHJveSgpO1xuXHRcdFx0XHR0aGlzLmdldFBhcnRzKCkuc3BsaWNlKHQsIDEpO1xuXHRcdFx0XHR0LS07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0UGFydEJ5RGF0YShkYXRhKSB7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzLmdldFBhcnRzKCkpIHtcblx0XHRcdGlmICh0aGlzLmdldFBhcnRzKClbdF0uaXNEYXRhKGRhdGEpKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFBhcnRzKClbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb21wb25lbnQ7XG4iLCJpbXBvcnQgIG5vdENvbXBvbmVudCAgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90Rm9ybUZhY3RvcnkgZXh0ZW5kcyBub3RDb21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuXHRcdHRoaXMuc2V0V29ya2luZyh7fSk7XG5cdFx0dGhpcy5vbignc3VibWl0JywgdGhpcy5vblN1Ym1pdCk7XG5cdFx0dGhpcy5vbigncmVzZXQnLCB0aGlzLm9uUmVzZXQpO1xuXHRcdHRoaXMub24oJ2NhbmNlbCcsIHRoaXMub25DYW5jZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Lypcblx0XHRSZW5kZXJpbmdcblx0Ki9cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0XHR0aGlzLnJlbmRlckNvbXBvbmVudHMoKTtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKXtcblxuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpe1xuXG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdGNvbGxlY3REYXRhKCl7XG5cblx0fVxuXG5cdC8qXG5cdFx0RXZlbnQgaGFuZGxlcnNcblx0Ki9cblxuXHRvblN1Ym1pdCgpe1xuXG5cdH1cblxuXHRvblJlc2V0KCl7XG5cblx0fVxuXG5cdG9uQ2FuY2VsKCl7XG5cblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuY2xhc3Mgbm90VmlldyBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRUZW1wbGF0ZU9wdGlvbnMoKSB7XG5cdFx0dmFyIGRlZmF1bHRSZXN1bHQgPSB7fTtcblx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlT3B0aW9ucycpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlT3B0aW9ucycpICE9PSBudWxsKSA/IHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVPcHRpb25zJyk6IGRlZmF1bHRSZXN1bHQ7XG5cdH1cblxuXHRnZXRQbGFjZVRvUHV0KCkge1xuXHRcdGlmICh0eXBlb2YgdGhpcy5nZXRPcHRpb25zKCdwbGFjZVRvUHV0JykgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0T3B0aW9ucygncGxhY2VUb1B1dCcpICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwbGFjZVRvUHV0Jyk7XG5cdFx0fVxuXHRcdHJldHVybiBkb2N1bWVudC5ib2R5O1xuXHR9XG5cblx0Z2V0QWZ0ZXJFeGVjQ2FsbGJhY2soY2FsbGJhY2spIHtcblx0XHR2YXIgZGVmYXVsdFJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnZGVmYXVsdCB2aWV3IGFmdGVyIGV4ZWMgY2FsbGJhY2snKTtcblx0XHR9O1xuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICd1bmRlZmluZWQnICYmIGNhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2s7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdGhpcy5nZXRPcHRpb25zKCdhZnRlckV4ZWMnKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRPcHRpb25zKCdhZnRlckV4ZWMnKSAhPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnYWZ0ZXJFeGVjJyk7XG5cdFx0fVxuXHRcdHJldHVybiBkZWZhdWx0UmVzdWx0O1xuXHR9XG5cblx0ZXhlYyhjYWxsYmFjaykge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgbmV3IG5vdENvbXBvbmVudCh0aGlzLmdldFRlbXBsYXRlT3B0aW9ucygpKSk7XG5cdH07XG5cblx0c2V0UGFyYW0obmFtZSwgdmFsdWUpIHtcblx0XHR0aGlzLmdldE9wdGlvbnMobmFtZSwgdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0VGVtcGxhdGVQYXJhbShuYW1lLCB2YWx1ZSkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ3RlbXBsYXRlT3B0aW9ucycsbmFtZSksIHZhbHVlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhcmFtKG5hbWUpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCkuaGFzT3duUHJvcGVydHkobmFtZSkgPyB0aGlzLmdldE9wdGlvbnMobmFtZSkgOiB1bmRlZmluZWQ7XG5cdH1cblxuXHRnZXRQYXJhbXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFZpZXc7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuY2xhc3Mgbm90Q29udHJvbGxlciBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihhcHAsIGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5uY05hbWUgPSAnbmMnICsgKGNvbnRyb2xsZXJOYW1lLmNhcGl0YWxpemVGaXJzdExldHRlcigpKTtcblx0XHR0aGlzLmNvbnRhaW5lclNlbGVjdG9yID0gJy5wYWdlLWNvbnRlbnQnO1xuXHRcdHRoaXMudmlld3NQb3N0Zml4ID0gJy5odG1sJztcblx0XHR0aGlzLnJlbmRlckZyb21VUkwgPSB0cnVlO1xuXHRcdC8qXG5cdFx0ICAgINGB0YDQsNC30YMg0LTQtdC70LDQtdC8INC00L7RgdGC0YPQv9C90YvQvNC4INC80L7QtNC10LvQuCBub3RSZWNvcmQg0LjQtyBuY2BDb250cm9sbGVyTmFtZWAg0LHRg9C00YPRgiDQtNC+0YHRgtGD0L/QvdGLINC60LDQuiB0aGlzLm5yYE1vZGVsTmFtZWBcblx0XHQqL1xuXHRcdHRoaXMuYXBwLmdldEludGVyZmFjZXMoKS5mb3JFYWNoKChpbmRleCwgaW50ZXJmYWMzKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mKCh3aW5kb3dbdGhpcy5uY05hbWVdKSkgIT09ICd1bmRlZmluZWQnKSh3aW5kb3dbdGhpcy5uY05hbWVdKS5wcm90b3R5cGVbaW5kZXhdID0gaW50ZXJmYWMzO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JHJlbmRlcihuYyAvKiBuY05hbWUgZnVuY3Rpb24gdGhpcyovICwgbmFtZSAvKiB2aWV3IG5hbWUgKi8gLCBkYXRhIC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzIC8qIGNvdWxkIGJlIG5vdCByZXByZXNlbnRlZCAqLyAsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIHZpZXcgPSBuYy52aWV3cy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IG5jLnZpZXdzW25hbWVdIDogbnVsbCxcblx0XHRcdHJlYWxDYWxsYmFjayxcblx0XHRcdHJlYWxIZWxwZXJzO1xuXHRcdGlmICh0eXBlb2YgdmlldyA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldyA9PT0gbnVsbCkgcmV0dXJuO1xuXHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0Ly8g0Y3Qu9C10LzQtdC90YLQsCwg0L3QviDQuNC30LLQtdGB0YLQvdC+0Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YDQtVxuXHRcdGlmICgoKHR5cGVvZiB2aWV3LnBsYWNlID09PSAndW5kZWZpbmVkJykgfHwgKHZpZXcucGxhY2UgPT09IG51bGwpKSAmJiAodHlwZW9mIHZpZXcucGxhY2VJZCAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5wbGFjZUlkICE9PSBudWxsICYmIHZpZXcucGxhY2VJZC5sZW5ndGggPiAwKSkge1xuXHRcdFx0dmlldy5wbGFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXcucGxhY2VJZCk7XG5cdFx0fVxuXHRcdC8v0LXRgdC70LggNCDQsNGA0LPRg9C80LXQvdGC0LAg0LfQvdCw0YfQuNGCLCBoZWxwZXJzICDQv9GA0L7Qv9GD0YHRgtC40LvQuFxuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0Ly/Qv9C10YDQtdC90LDQt9C90LDRh9Cw0LXQvCDRgdC+INGB0LTQstC40LPQvtC8XG5cdFx0XHRjYXNlIDQ6XG5cdFx0XHRcdHJlYWxDYWxsYmFjayA9IGhlbHBlcnM7XG5cdFx0XHRcdHJlYWxIZWxwZXJzID0ge307XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHQvL9C/0LXRgNC10L3QsNC30L3QsNGH0LDQtdC8INC90LDQv9GA0Y/QvNGD0Y5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJlYWxIZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0cmVhbENhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0fVxuXHRcdHZpZXcuZGF0YSA9IGRhdGE7XG5cdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdHZpZXcuaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQodmlldy5oZWxwZXJzLCByZWFsSGVscGVycyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZpZXcuaGVscGVycyA9IHJlYWxIZWxwZXJzO1xuXHRcdH1cblx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0aWYgKG5jLnJlbmRlckZyb21VUkwpIHtcblx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3LnRlbXBsYXRlVVJMID09PSAndW5kZWZpbmVkJyB8fCB2aWV3LnRlbXBsYXRlVVJMID09IG51bGwgfHwgdmlldy50ZW1wbGF0ZVVSTC5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHQvL9Cz0LXQvdC10YDQuNGA0YPQtdC8INCw0LTRgNC10YEg0L/QviDRiNCw0LHQu9C+0L3Rg1xuXHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gKHZpZXcuY29tbW9uID8gbmMuY29tbW9uVmlld3NQcmVmaXggOiBuYy52aWV3c1ByZWZpeCkgKyAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiBuYW1lKSArIG5jLnZpZXdzUG9zdGZpeDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly/QsCDQtdGB0LvQuCDQtdGB0YLRjCDQvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwLCDRgtC+XG5cdFx0XHRpZiAodmlldy5oYXNPd25Qcm9wZXJ0eSgndGVtcGxhdGVOYW1lJykpIHtcblx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0dmlldy50ZW1wbGF0ZU5hbWUgPSBuYy52aWV3c1ByZWZpeCArIHZpZXcudGVtcGxhdGVOYW1lICsgbmMudmlld3NQb3N0Zml4O1xuXHRcdFx0fVxuXHRcdH1cblx0XHQobmV3IG5vdENvbXBvbmVudCh2aWV3KSkuZXhlY0FuZFB1dCh2aWV3LnBsYWNlLCByZWFsQ2FsbGJhY2spO1xuXHR9XG5cblx0ZXhlYyhwYXJhbXMpIHtcblx0XHQvL2NvbnNvbGUubG9nKCdleGVjJywgdGhpcywgT2JqZWN0LmtleXModGhpcy5fX3Byb3RvX18pKTtcblx0XHRpZiAodHlwZW9mKCh3aW5kb3dbdGhpcy5uY05hbWVdKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHQvL9C40YnQtdC8INC40LzQtdC90LAg0YDQsNC30LTQtdC70Y/QtdC80YvRhSDRhNGD0L3QutGG0LjQuVxuXHRcdFx0dmFyIHNoYXJlZExpc3QgPSBPYmplY3Qua2V5cyh0aGlzLl9fcHJvdG9fXykuZmlsdGVyKGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0XHRyZXR1cm4gKGtleS5pbmRleE9mKCckJykgPT09IDApO1xuXHRcdFx0fSk7XG5cdFx0XHQvL9C30LDQutC40LTRi9Cy0LDQtdC8INC40YUg0LIg0L3QvtCy0YPRjiDRhNGD0L3QutGG0LjRjlxuXHRcdFx0aWYgKHNoYXJlZExpc3QubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBrIGluIHNoYXJlZExpc3QpIHtcblx0XHRcdFx0XHR3aW5kb3dbdGhpcy5uY05hbWVdLnByb3RvdHlwZVtzaGFyZWRMaXN0W2tdXSA9IHRoaXMuX19wcm90b19fW3NoYXJlZExpc3Rba11dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRuZXcod2luZG93W3RoaXMubmNOYW1lXSkodGhpcy5hcHAsIHBhcmFtcyk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKG5ldyh3aW5kb3dbdGhpcy5uY05hbWVdKSh0aGlzLmFwcCwgcGFyYW1zKSk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdhZnRlciBuZXcgY29udHJvbGxlcicpO1xuXHRcdH0gZWxzZSB7XG5cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29udHJvbGxlcjtcbiIsIi8qIGdsb2JhbCByb3V0aWUgKi9cbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RGb3JtRmFjdG9yeSBmcm9tICcuL2NvbXBvbmVudHMvbm90Rm9ybUZhY3RvcnknO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RWaWV3IGZyb20gJy4vY29tcG9uZW50cy9ub3RWaWV3JztcbmltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4vbm90Q29udHJvbGxlcic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuXG5jb25zdCBPUFRfQ09OVFJPTExFUl9QUkVGSVggPSAnbmMnLFxuXHRPUFRfUkVDT1JEX1BSRUZJWCA9ICducic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEFwcCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3Rvcihub3RNYW5pZmVzdCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgYXBwJyk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdE1hbmlmZXN0KTtcblx0XHR0aGlzLnJlc291cmNlcyA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRpbnRlcmZhY2VzOiB7fSxcblx0XHRcdGNvbnRyb2xsZXJzOiB7fSxcblx0XHRcdGluaXRDb250cm9sbGVyOiBudWxsLFxuXHRcdFx0Y3VycmVudENvbnRyb2xsZXI6IG51bGwsXG5cdFx0XHRmb3Jtczoge31cblx0XHR9KTtcblx0XHR0aGlzLmluaXQoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0dmFyIHVybCA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3RVUkwnKSxcblx0XHRcdHN1Y2Nlc3MgPSB0aGlzLnNldEludGVyZmFjZU1hbmlmZXN0LmJpbmQodGhpcyk7XG5cdFx0bm90Q29tbW9uLmdldEpTT04odXJsLCB7fSlcblx0XHRcdC50aGVuKHN1Y2Nlc3MpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdHNldEludGVyZmFjZU1hbmlmZXN0KG1hbmlmZXN0KSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcsIG1hbmlmZXN0KTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlTWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHQvL9C90YPQttC90L4g0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNGC0Yxcblx0XHQvL9C80L7QtNC10LvQuCDQv9C+0LvRg9GH0LXQvdC90YvQvNC4INC40L3RgtC10YDRhNC10LnRgdCw0LzQuFxuXHRcdHRoaXMudXBkYXRlSW50ZXJmYWNlcygpO1xuXHRcdC8v0YHQvtC30LTQsNC90LjQtSDQvtCx0YrQtdC60YLQvtCyINCw0LLRgtC+0LPQtdC90LXRgNCw0YbQuNGPINGE0L7RgNC8XG5cdFx0dGhpcy5pbml0Rm9ybUJ1aWxkZXJzKCk7XG5cdFx0Ly/QuNC90LjRhtC40LvQuNGG0LjRgNC+0LLQsNGC0Ywg0Lgg0LfQsNC/0YPRgdGC0LjRgtGMINC60L7QvdGC0YDQvtC70LvQtdGAINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG5cdFx0dGhpcy5pbml0Q29udHJvbGxlcigpO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRzdGFydEFwcCgpIHtcblx0XHQvL9GB0L7Qt9C00LDRgtGMINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHQvL9GA0L7Rg9GC0LXRgCDQuCDQv9GA0LjQstGP0LfQsNGC0Ywg0Log0L3QtdC80YMg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdHRoaXMuaW5pdFJvdXRlcigpO1xuXHR9XG5cblx0YmluZENvbnRyb2xsZXIoY29udHJvbGxlck5hbWUpIHtcblx0XHR2YXIgY3RybCA9IG5ldyBub3RDb250cm9sbGVyKHRoaXMsIGNvbnRyb2xsZXJOYW1lKTtcblx0XHRyZXR1cm4gY3RybC5leGVjLmJpbmQoY3RybCk7XG5cdH1cblxuXHRpbml0Q29udHJvbGxlcigpIHtcblx0XHRpZiAodHlwZW9mKHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJywgbmV3IG5vdENvbnRyb2xsZXIodGhpcywgdGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpKSk7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJykuZXhlYygpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRSb3V0ZXIoKSB7XG5cdFx0dmFyIHJvdXRpZUlucHV0ID0ge307XG5cdFx0dGhpcy5nZXRPcHRpb25zKCdzaXRlTWFuaWZlc3QnKS5mb3JFYWNoKChyb3V0ZSwgY29udHJvbGxlck5hbWUpPT57XG5cdFx0XHRyb3V0aWVJbnB1dFtyb3V0ZV0gPSB0aGlzLmJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lKTtcblx0XHR9KTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JvdXRlcicsIHJvdXRpZShyb3V0aWVJbnB1dCkpO1xuXHR9XG5cblx0Z2V0Q3VycmVudENvbnRyb2xsZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInKTtcblx0fVxuXG5cdHNldEN1cnJlbnRDb250cm9sbGVyKGN0cmwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJywgY3RybCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR1cGRhdGVJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuY2xlYXJJbnRlcmZhY2VzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKSkge1xuXHRcdFx0dGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpLmZvckVhY2godGhpcy5pbml0SW50ZXJmYWNlLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGdldFJlY29yZE5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfUkVDT1JEX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRDb250cm9sbGVyTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9DT05UUk9MTEVSX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRpbml0SW50ZXJmYWNlKGluZGV4LCBtYW5pZmVzdCkge1xuXHRcdC8vY29uc29sZS5sb2coaW5kZXgsIG1hbmlmZXN0KTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVt0aGlzLmdldFJlY29yZE5hbWUoaW5kZXgpXSA9IG5ldyBub3RSZWNvcmQobWFuaWZlc3QpO1xuXHR9XG5cblx0bnIobW9kZWxOYW1lLCBkYXRhKSB7XG5cdFx0dmFyIG1hbmlmZXN0ID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpLmhhc093blByb3BlcnR5KG1vZGVsTmFtZSkgPyB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JylbbW9kZWxOYW1lXSA6IHt9O1xuXHRcdC8vY29uc29sZS5sb2cobW9kZWxOYW1lLCBtYW5pZmVzdCwgZGF0YSk7XG5cdFx0cmV0dXJuIG5ldyBub3RSZWNvcmQobWFuaWZlc3QsIGRhdGEpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlcygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJyk7XG5cdH1cblxuXHRjbGVhckludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcmZhY2VzJywge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdEZvcm1CdWlsZGVycygpIHtcblx0XHR0aGlzLmNsZWFyRm9ybUJ1aWxkZXJzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnZm9ybXMnKSkge1xuXHRcdFx0dGhpcy5nZXRPcHRpb25zKCdmb3JtcycpLmZvckVhY2godGhpcy5pbml0Rm9ybUJ1aWxkZXIuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdEZvcm1CdWlsZGVyKGluZGV4LCBtYW5pZmVzdCkge1xuXHRcdGxldCBwYXRoID0gbm90UGF0aC5qb2luKCdmb3JtcycsIGluZGV4KTtcblx0XHR0aGlzLnNldFdvcmtpbmcocGF0aCwgbmV3IG5vdEZvcm1GYWN0b3J5KHRoaXMsIG1hbmlmZXN0KSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKHBhdGgpLmluaXQodGhpcy53YWl0VGhpc1Jlc291cmNlKCdmb3JtJywgaW5kZXgpKTtcblx0fVxuXG5cdGdldEZvcm1CdWlsZGVycygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdmb3JtcycpO1xuXHR9XG5cblx0Y2xlYXJGb3JtQnVpbGRlcnMoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmb3JtcycsIHt9KTtcblx0fVxuXG5cdHdhaXRUaGlzUmVzb3VyY2UodHlwZSwgaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMucmVzb3VyY2VzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG5cdFx0XHR0aGlzLnJlc291cmNlc1t0eXBlXSA9IHt9O1xuXHRcdH1cblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSBmYWxzZTtcblx0XHRyZXR1cm4gdGhpcy5vblJlc291cmNlUmVhZHkuYmluZCh0aGlzLCB0eXBlLCBpbmRleCk7XG5cdH1cblxuXHRvblJlc291cmNlUmVhZHkodHlwZSwgaW5kZXgpIHtcblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSB0cnVlO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRhbGxSZXNvdXJjZXNSZWFkeSgpIHtcblx0XHR2YXIgaSwgajtcblx0XHRmb3IgKGkgaW4gdGhpcy5yZXNvdXJjZXMpIHtcblx0XHRcdGZvciAoaiBpbiB0aGlzLnJlc291cmNlc1tpXSkge1xuXHRcdFx0XHRpZiAoIXRoaXMucmVzb3VyY2VzW2ldW2pdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdvcHRpb25zJyk7XG5cdH1cbn1cbiIsImltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGguanMnO1xuXG52YXIgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliID0ge1xuXHRjb250ZW50OmZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmluZGV4T2YoJ2NhcGl0YWxpemUnKSA+IC0xKXtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdC50b1VwcGVyQ2FzZSgpO1xuXHRcdH1cblx0XHRzY29wZS5lbGVtZW50LnRleHRDb250ZW50ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0O1xuXHR9LFxuXHRiaW5kOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpPT57XG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCl7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe3Njb3BlLCBpdGVtLCBoZWxwZXJzLCBlfSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IGxpdmVFdmVudHMgPSBbJ2NoYW5nZScsICdrZXl1cCddLFxuXHRcdFx0b25FdmVudCA9ICgpPT5ub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgIT09IHRydWUpe1xuXHRcdFx0Zm9yKGxldCB0IG9mIGxpdmVFdmVudHMpe1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodCwgb25FdmVudCk7XG5cdFx0XHR9XG5cdFx0XHRzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cdGF0dHI6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZShzY29wZS5wYXJhbXNbMF0sIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0fSxcblx0bmFtZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbigvKnNjb3BlLCBpdGVtLCBoZWxwZXJzKi8pe1xuXG5cdH0sXG5cdGNoZWNrZWQ6IGZ1bmN0aW9uKHNjb3BlLyosIGl0ZW0sIGhlbHBlcnMqLykge1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA/IHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgdHJ1ZSkgOiBzY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuXHR9LFxuXHRjbGFzczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KXtcblx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdH1lbHNle1xuXHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0fVxuXHR9LFxuXHRvcHRpb25zOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBpID0gMCxcblx0XHRcdG9wdGlvbiA9IG51bGwsXG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9ICd2YWx1ZScsXG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9ICduYW1lJyxcblx0XHRcdHN1YkxpYiA9IHVuZGVmaW5lZCxcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkTmFtZScpID8gaGVscGVyc1snZmllbGROYW1lJ10gOiAndmFsdWUnO1xuXHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgaGVscGVycyAhPT0gbnVsbCAmJiBoZWxwZXJzLmhhc093blByb3BlcnR5KCdvcHRpb24nKSkge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBoZWxwZXJzLm9wdGlvbi5sYWJlbDtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gaGVscGVycy5vcHRpb24udmFsdWU7XG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMikge1xuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzJdO1xuXHRcdH1cblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDMgJiYgc2NvcGUucGFyYW1zWzNdID09PSAnZGlmZmVyZW50Jykge1xuXHRcdFx0c3ViTGliID0gdmFsdWVGaWVsZE5hbWU7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgaGVscGVycyAhPT0gbnVsbCAmJiBoZWxwZXJzLmhhc093blByb3BlcnR5KCdmaWVsZFBsYWNlSG9sZGVyJykgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGRQbGFjZUhvbGRlckRlZmF1bHQnKSAmJiBoZWxwZXJzLmZpZWxkUGxhY2VIb2xkZXJEZWZhdWx0KSB7XG5cdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJycpO1xuXHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gaGVscGVycy5maWVsZFBsYWNlSG9sZGVyO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdHZhciBsaWIgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdGlmICgvKmRpZmZlcmVudCAmJiovIHN1YkxpYiAmJiBsaWIuaGFzT3duUHJvcGVydHkoc3ViTGliKSkge1xuXHRcdFx0XHRsaWIgPSBsaWJbc3ViTGliXTtcblx0XHRcdH1cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsaWIubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbGliW2ldW3ZhbHVlRmllbGROYW1lXSk7XG5cdFx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGxpYltpXVtsYWJlbEZpZWxkTmFtZV07XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSkpIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdLmluZGV4T2YobGliW2ldW3ZhbHVlRmllbGROYW1lXSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSA9PT0gbGliW2ldW3ZhbHVlRmllbGROYW1lXSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcbmV4cG9ydCBkZWZhdWx0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYjtcbiIsImltcG9ydCAgbm90Q29tcG9uZW50ICBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RGb3JtIGV4dGVuZHMgbm90Q29tcG9uZW50e1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe30pO1xuXHRcdHRoaXMub24oJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQpO1xuXHRcdHRoaXMub24oJ3Jlc2V0JywgdGhpcy5vblJlc2V0KTtcblx0XHR0aGlzLm9uKCdjYW5jZWwnLCB0aGlzLm9uQ2FuY2VsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qXG5cdFx0UmVuZGVyaW5nXG5cdCovXG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdFx0dGhpcy5yZW5kZXJDb21wb25lbnRzKCk7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCl7XG5cblx0fVxuXG5cdHJlbmRlckNvbXBvbmVudHMoKXtcblxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHRjb2xsZWN0RGF0YSgpe1xuXG5cdH1cblxuXHQvKlxuXHRcdEV2ZW50IGhhbmRsZXJzXG5cdCovXG5cblx0b25TdWJtaXQoKXtcblxuXHR9XG5cblx0b25SZXNldCgpe1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpe1xuXG5cdH1cbn1cbiIsImltcG9ydCBub3RDb21wb25lbnQgIGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdFRhYmxlIGV4dGVuZHMgbm90Q29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cbiIsIi8qXG5cdENvbW1vbiBmdW5jdGlvbnNcbiovXG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbi8qXG5cdGZyYW1ld29yayB3aWRlIHBhcnNlciBmb3IgZGF0YSBhY2Nlc3NcbiovXG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuLypcblx0YmFzaWMgZXZlbnQgaGFuZGxlcnMgYW5kIGNvcmUgZGF0YSBtb2RpZmllcnNcbiovXG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuLypcblx0c21hcnRlciBpbWFnZSBjb250cm9sXG4qL1xuaW1wb3J0IG5vdEltYWdlIGZyb20gJy4vdGVtcGxhdGUvbm90SW1hZ2UnO1xuLypcblx0YXBwbGljYXRpb24gbWFpbiBpbmZyYXN0cnVjdHVyZSBzZXR0ZXJcbiovXG5pbXBvcnQgbm90QXBwIGZyb20gJy4vbm90QXBwJztcbi8qXG5cdGRhZGR5IGZvciB1c2VyIGNvbnRyb2xsZXJzXG4qL1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi9ub3RDb250cm9sbGVyJztcbi8qXG5cdHRlbXBsYXRpbmcgYW5kIGNvbW1vbiBzdHJ1Y3R1cmVzXG4qL1xuXG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RSZW5kZXJlcic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnOyAvLyBzbWFydGVyIHdpdGggYmluZGluZ3MgZm9yIGV2ZW50cywgYWN0dWFseSBwcm94eVxuXG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbm90Rm9ybSc7XG5pbXBvcnQgbm90VGFibGUgZnJvbSAnLi9jb21wb25lbnRzL25vdFRhYmxlJztcbmltcG9ydCBub3RWaWV3IGZyb20gJy4vY29tcG9uZW50cy9ub3RWaWV3JztcblxuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7IC8vXHRob3cgdG8gaW50ZXJhY3Qgd2l0aCBkYXRhIG9uIHNlcnZlclxuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7IC8vXHR3cmFwcGVyIGZvciBkYXRhIHdpdGggc2VydmVyPC0+dmlldyBsaXZlIGludGVyYWN0aW9uc1xuXG5ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuYWRkKG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYik7XG5cbmV4cG9ydCB7XG5cdG5vdENvbW1vbixcblx0bm90UGF0aCxcblx0bm90QmFzZSxcblx0bm90SW1hZ2UsXG5cdG5vdEFwcCxcblx0bm90Q29udHJvbGxlcixcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIsXG5cdG5vdFRlbXBsYXRlQ2FjaGUsXG5cdG5vdFJlbmRlcmVyLFxuXHRub3RDb21wb25lbnQsXG5cdG5vdEZvcm0sXG5cdG5vdFRhYmxlLFxuXHRub3RWaWV3LFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJ1cmwiLCJkYXRhIiwidGhhdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsImdldFNlc3Npb25JRCIsInJlc3BvbnNlVHlwZSIsIndpdGhDcmVkZW50aWFscyIsIm9ubG9hZCIsInN0YXR1cyIsInJlc3BvbnNlIiwidCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsIkNvbW1vbkxvZ3MiLCJsb2ciLCJhcmd1bWVudHMiLCJlcnJvciIsInRyYWNlIiwiQ29tbW9uT2JqZWN0cyIsImRlZmF1bHRzIiwib3B0aW9ucyIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImNhbGwiLCJ0YXJnZXQiLCJzb3VyY2VzIiwiZm9yRWFjaCIsImRlc2NyaXB0b3JzIiwia2V5cyIsInNvdXJjZSIsInJlZHVjZSIsImtleSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldE93blByb3BlcnR5U3ltYm9scyIsImRlc2NyaXB0b3IiLCJzeW0iLCJlbnVtZXJhYmxlIiwiZGVmaW5lUHJvcGVydGllcyIsImJpZyIsInNtYWxsIiwib2JqIiwiZmlsdGVyIiwiY29udGFpbnNPYmoiLCJpY29ucyIsImJhdGNoIiwibGVuZ3RoIiwiZ2V0RGF0YSIsInB1c2giLCJhIiwiYiIsInAiLCJlcXVhbCIsInRvU3RyaW5nIiwiZGVmYXVsdFZhbHVlIiwib2JqMSIsIm9iajIiLCJqUXVlcnkiLCJleHRlbmQiLCJ2YWwiLCJyZWdpc3RyeSIsIkNvbW1vblN0cmluZ3MiLCJzdHJpbmciLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIm5vdENvbW1vbiIsImFzc2lnbiIsImV4dGVuZFdpdGgiLCJTVUJfUEFUSF9TVEFSVCIsIlNVQl9QQVRIX0VORCIsIlBBVEhfU1BMSVQiLCJQQVRIX1NUQVJUX09CSkVDVCIsIlBBVEhfU1RBUlRfSEVMUEVSUyIsIkZVTkNUSU9OX01BUktFUiIsIk1BWF9ERUVQIiwibm90UGF0aCIsInBhdGgiLCJzdWJQYXRoIiwiZmluZCIsInN1YiIsInBhcnNlZCIsInN1YmYiLCJyZXBsYWNlIiwiaXRlbSIsImhlbHBlcnMiLCJzdWJQYXRoUGFyc2VkIiwiZmluZE5leHRTdWJQYXRoIiwiZ2V0VmFsdWVCeVBhdGgiLCJyZXBsYWNlU3ViUGF0aCIsInBhcnNlU3VicyIsImF0dHJWYWx1ZSIsInNldFZhbHVlQnlQYXRoIiwiaXNSZWNvcmQiLCJub3JtaWxpemVQYXRoIiwidHJpZ2dlciIsInN0ZXAiLCJoZWxwZXIiLCJyU3RlcCIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsInNwbGl0IiwicGFyc2VQYXRoU3RlcCIsIm9iamVjdCIsImF0dHJQYXRoIiwiYXR0ck5hbWUiLCJzaGlmdCIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfRVZFTlRTIiwiU3ltYm9sIiwiTUVUQV9EQVRBIiwiTUVUQV9XT1JLSU5HIiwiTUVUQV9PUFRJT05TIiwibm90QmFzZSIsIndoYXQiLCJzZXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsIm5hbWUiLCJmcm9tIiwiZXZlbnROYW1lIiwiZXZlbnQiLCJvZmYiLCJjYWxsYmFja3MiLCJjYWxsYmFjayIsInRhcmdldElkIiwic3BsaWNlIiwibm90SW1hZ2UiLCJub3RJbnRlcmZhY2UiLCJtYW5pZmVzdCIsImxpbmUiLCJyZWNvcmQiLCJhY3Rpb25OYW1lIiwicmVjb3JkUkUiLCJmaWVsZE5hbWUiLCJpbmQiLCJsZW4iLCJpbmQyIiwic3RhcnRTbGljZSIsImVuZFNsaWNlIiwiZ2V0QXR0ciIsIm1vZGVsIiwiYWN0aW9uRGF0YSIsInBhcnNlTGluZSIsInBvc3RGaXgiLCJnZXRBY3Rpb25zIiwiYWN0aW9ucyIsInZhbHVlIiwic2V0RmlsdGVyIiwiZmlsdGVyRGF0YSIsInNldE1vZGVsUGFyYW0iLCJnZXRNb2RlbFBhcmFtIiwic29ydGVyRGF0YSIsInBhZ2VOdW1iZXIiLCJwYWdlU2l6ZSIsInBhcmFtTmFtZSIsInBhcmFtVmFsdWUiLCJzZXRPcHRpb25zIiwiY2FsbGJhY2tTdWNjZXNzIiwiY2FsbGJhY2tFcnJvciIsImdldEFjdGlvbkRhdGEiLCJnZXRVUkwiLCJ4bWxodHRwIiwibWV0aG9kIiwib25Mb2FkIiwibm90UmVjb3JkIiwiTUVUQV9JTlRFUkZBQ0UiLCJNRVRBX1BST1hZIiwiTUVUQV9DSEFOR0UiLCJNRVRBX0NIQU5HRV9ORVNURUQiLCJNRVRBX1NBTCIsIkRFRkFVTFRfQUNUSU9OX1BSRUZJWCIsIkRFRkFVTFRfUEFHRV9OVU1CRVIiLCJERUZBVUxUX1BBR0VfU0laRSIsImNyZWF0ZVByb3BlcnR5SGFuZGxlcnMiLCJvd25lciIsImNvbnRleHQiLCJyZXNUYXJnZXQiLCJSZWZsZWN0IiwiYmluZCIsIkVycm9yIiwidmFsdWVUb1JlZmxlY3QiLCJub3RQcm9wZXJ0eSIsImdldFJvb3QiLCJwYXRoVG8iLCJpc1Byb3h5IiwiUHJveHkiLCJzZXREYXRhIiwib24iLCJyZXR1cm5Ub1Jvb3QiLCJwcm94eSIsImNyZWF0ZVJlY29yZEhhbmRsZXJzIiwiY3JlYXRlQ29sbGVjdGlvbiIsIm5vdFJlY29yZEludGVyZmFjZSIsImluaXRQcm9wZXJ0aWVzIiwiaW50ZXJmYWNlVXAiLCJjdXJQYXRoIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsIml0ZW1zIiwiY29sbGVjdGlvbiIsImdldEFjdGlvbnNDb3VudCIsImFjdGlvblVwIiwiaW5kZXgiLCJjcmVhdGVDb21tb25SZXF1ZXN0IiwicmVxdWVzdCIsIm9iamVjdFBhcnQiLCJzZXRBdHRyIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYIiwiVEVNUExBVEVfVEFHIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgiLCJDT01QT05FTlRfSURfUFJFRklYIiwiUEFSVF9JRF9QUkVGSVgiLCJERUZBVUxUX1BMQUNFUiIsIkRFRkFVTFRfUExBQ0VSX0xPT1AiLCJPUFRTIiwiTUVUQV9DQUNIRSIsIm5vdFRlbXBsYXRlQ2FjaGUiLCJzZXRXb3JraW5nIiwiaGlkZVRlbXBsYXRlcyIsInJlZ2lzdGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibWFwIiwibG9hZE9uZSIsIm9SZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpdiIsImRhdGFzZXQiLCJub3RUZW1wbGF0ZU5hbWUiLCJub3RUZW1wbGF0ZVVSTCIsInNyY0VsZW1lbnQiLCJyZXNwb25zZVRleHQiLCJzZXRPbmUiLCJlbGVtZW50IiwiY2xvbmVOb2RlIiwiY29udCIsInRleHQiLCJub3RUZW1wbGF0ZXNFbGVtZW50cyIsInBhcmVudE5vZGUiLCJsaWIiLCJnZXRIVE1MIiwidGhlbiIsInRlbXBsYXRlSW5uZXJIVE1MIiwidGVtcGxhdGVDb250RWwiLCJ3cmFwIiwiY2F0Y2giLCJ0ZW1wbGF0ZXNIVE1MIiwidGVtcGxhdGVzIiwicGFyc2VMaWIiLCJhZGRMaWIiLCJzZWxlY3Rvck9yRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJNRVRBX1BST0NFU1NPUlMiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnMiLCJzZXRQcm9jZXNzb3IiLCJnZXRQcm9jZXNzb3IiLCJNRVRBX0NPTVBPTkVOVFMiLCJub3RSZW5kZXJlciIsImlucHV0IiwiaW5pdCIsInJlbmRlciIsImNvbXBvbmVudCIsImluaXREYXRhIiwiaW5pdE9wdGlvbnMiLCJpbml0V29ya2luZyIsInRlbXBsYXRlIiwiaW5pdFRlbXBsYXRlIiwib25DaGFuZ2UiLCJNYXRoIiwicmFuZG9tIiwiZ2V0QnJlYWRDcnVtcHMiLCJ1cGRhdGUiLCJjbGVhclN0YXNoIiwic2V0V29ya2luZ01hcHBpbmciLCJleGVjUHJvY2Vzc29ycyIsInNlYXJjaEZvclN1YlRlbXBsYXRlcyIsInN0YXNoUmVuZGVyZWQiLCJpZlBhcnQiLCJjb21wb25lbnRQYXRoIiwiY2hhbmdlZFBhdGgiLCJpZkZ1bGxTdWJQYXRoIiwiY3JlYXRlTWFwcGluZyIsImZpbmRBbGxQcm9jZXNzb3JzIiwicHJvY3MiLCJlbHMiLCJnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCIsImdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQiLCJwcm9jRGF0YSIsInBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbiIsInByb2Nlc3NvckV4cHJlc3Npb24iLCJhdHRyaWJ1dGVFeHByZXNzaW9uIiwiaWZDb25kaXRpb24iLCJwYXJhbXMiLCJwcm9jZXNzb3JOYW1lIiwibWFwcGluZyIsInByb2NTY29wZSIsImF0dHJpYnV0ZVJlc3VsdCIsImdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQiLCJwcm9jTmFtZSIsInByb2MiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkZXN0cm95U3VicyIsImRlc3Ryb3kiLCJjbGVhclN1YlRlbXBsYXRlcyIsImdldFN0YXNoIiwicmVtb3ZlQ2hpbGQiLCJudEVsIiwibnRSZW5kZXJlZCIsInN1YnMiLCJudCIsImlmU3ViRWxlbWVudFJlbmRlcmVkIiwicmVuZGVyU3ViIiwiaWQiLCJkZXRhaWxzIiwiZGF0YVBhdGgiLCJub3RDb21wb25lbnQiLCJjaGlsZE5vZGVzIiwiYWRkVG9TdGFzaCIsInN0YXNoIiwibmV3U3Rhc2giLCJhbmNob3IiLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsIm5vZGUiLCJwbGFjZSIsInRhcmdldEVsIiwiY2hpbGRyZW4iLCJyZW5kZXJlZCIsInBsYWNlQWZ0ZXIiLCJwbGFjZUJlZm9yZSIsInBsYWNlRmlyc3QiLCJwbGFjZUxhc3QiLCJub3RQbGFjZXJzIiwiTUVUQV9QQVJUUyIsInJlc2V0UGFydHMiLCJwcmVwYXJlVGVtcGxhdGVFbGVtZW50IiwiaW5pdE1hcmtFbGVtZW50IiwibWFya0VsIiwicGxhY2VyIiwiZ2V0UGxhY2VyIiwibWFpbiIsInVuc2V0UmVhZHkiLCJodG1sIiwic2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJnZXRGcm9tVVJMIiwicmVwb3J0IiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJjbGVhclBhcnRzIiwiZm9yRWFjaERhdGEiLCJyZW5kZXJQYXJ0IiwicGxhY2VSZW5kZXJlZCIsInJlbW92ZU9ic29sZXRlUGFydHMiLCJwbGFjZVBhcnQiLCJwYXJ0IiwiZ2V0UGFydEJ5RGF0YSIsIm5vZGVzIiwibGFzdE5vZGUiLCJub2RlVHlwZSIsImdldFBhcnRzIiwicmVuZGVyZXIiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lIiwiYWRkUGFydCIsInVwZGF0ZVBhcnQiLCJwaXBlIiwiZmluZEFjdHVhbFBhcnRzIiwicmVtb3ZlTm90QWN0dWFsUGFydHMiLCJhY3R1YWxQYXJ0cyIsImlzRGF0YSIsIm5vdEZvcm1GYWN0b3J5Iiwib25TdWJtaXQiLCJvblJlc2V0Iiwib25DYW5jZWwiLCJyZW5kZXJXcmFwcGVyIiwicmVuZGVyQ29tcG9uZW50cyIsIm5vdFZpZXciLCJkZWZhdWx0UmVzdWx0IiwiYm9keSIsImdldFRlbXBsYXRlT3B0aW9ucyIsIm5vdENvbnRyb2xsZXIiLCJhcHAiLCJjb250cm9sbGVyTmFtZSIsIm5jTmFtZSIsImNhcGl0YWxpemVGaXJzdExldHRlciIsImNvbnRhaW5lclNlbGVjdG9yIiwidmlld3NQb3N0Zml4IiwicmVuZGVyRnJvbVVSTCIsImdldEludGVyZmFjZXMiLCJpbnRlcmZhYzMiLCJ3aW5kb3ciLCJuYyIsInZpZXciLCJ2aWV3cyIsInJlYWxDYWxsYmFjayIsInJlYWxIZWxwZXJzIiwicGxhY2VJZCIsImdldEVsZW1lbnRCeUlkIiwidGVtcGxhdGVVUkwiLCJjb21tb24iLCJjb21tb25WaWV3c1ByZWZpeCIsInZpZXdzUHJlZml4IiwidGVtcGxhdGVOYW1lIiwiZXhlY0FuZFB1dCIsInNoYXJlZExpc3QiLCJfX3Byb3RvX18iLCJrIiwiT1BUX0NPTlRST0xMRVJfUFJFRklYIiwiT1BUX1JFQ09SRF9QUkVGSVgiLCJub3RBcHAiLCJub3RNYW5pZmVzdCIsInJlc291cmNlcyIsInN1Y2Nlc3MiLCJzZXRJbnRlcmZhY2VNYW5pZmVzdCIsImdldEpTT04iLCJ1cGRhdGVJbnRlcmZhY2VzIiwiaW5pdEZvcm1CdWlsZGVycyIsImluaXRDb250cm9sbGVyIiwiYWxsUmVzb3VyY2VzUmVhZHkiLCJzdGFydEFwcCIsImluaXRSb3V0ZXIiLCJjdHJsIiwiZXhlYyIsInJvdXRpZUlucHV0Iiwicm91dGUiLCJiaW5kQ29udHJvbGxlciIsInJvdXRpZSIsImNsZWFySW50ZXJmYWNlcyIsImluaXRJbnRlcmZhY2UiLCJnZXRSZWNvcmROYW1lIiwibW9kZWxOYW1lIiwiY2xlYXJGb3JtQnVpbGRlcnMiLCJpbml0Rm9ybUJ1aWxkZXIiLCJ3YWl0VGhpc1Jlc291cmNlIiwidHlwZSIsIm9uUmVzb3VyY2VSZWFkeSIsIm5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiIsInNjb3BlIiwidGV4dENvbnRlbnQiLCJlIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJsaXZlRXZlbnRzIiwib25FdmVudCIsInByb2Nlc3NlZFZhbHVlIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwib3B0aW9uIiwidmFsdWVGaWVsZE5hbWUiLCJsYWJlbEZpZWxkTmFtZSIsInN1YkxpYiIsIml0ZW1WYWx1ZUZpZWxkTmFtZSIsImxhYmVsIiwiZmllbGRQbGFjZUhvbGRlckRlZmF1bHQiLCJmaWVsZFBsYWNlSG9sZGVyIiwibm90Rm9ybSIsIm5vdFRhYmxlIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxnQkFBZ0I7VUFDVixpQkFBU0MsR0FBVCxFQUFhO1NBQ2QsS0FBS0MsR0FBTCxDQUFTLE1BQVQsSUFBbUJELEdBQTFCO0VBRmtCO2NBSU4scUJBQVNBLEdBQVQsRUFBYTtTQUNsQixLQUFLQyxHQUFMLENBQVMsVUFBVCxJ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
