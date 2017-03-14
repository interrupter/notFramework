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

var MAP_MANAGER = Symbol('MAP_MANAGER');

var CommonShorts = {
	getAPI: function getAPI() {
		return this.getManager().getAPI();
	},
	setManager: function setManager(v) {
		this[MAP_MANAGER] = v;
	},
	getManager: function getManager() {
		return this[MAP_MANAGER];
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

		//return Promise

	}, {
		key: 'request',
		value: function request(record, actionName) {
			var actionData = this.getActionData(actionName),
			    url = this.getURL(record, actionData, actionName);
			return notCommon.getAPI().queeRequest(actionData.method, url, JSON.stringify(record.getData()), this.onLoad.bind({ actionData: actionData, manifest: this.manifest }));
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

var notFormFactory = function (_notBase) {
	inherits(notFormFactory, _notBase);

	function notFormFactory(app, manifest) {
		var _ret;

		classCallCheck(this, notFormFactory);

		var _this = possibleConstructorReturn(this, (notFormFactory.__proto__ || Object.getPrototypeOf(notFormFactory)).call(this));

		_this.setOptions({});
		_this.setWorking({});
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
			var _this2 = this;

			return function () {
				new controllerName(_this2);
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
		key: 'initRouter',
		value: function initRouter() {
			var routieInput = {};
			for (var route in this.getOptions('siteManifest')) {
				var controllerName = this.getOptions('siteManifest')[route];
				routieInput[route] = this.bindController(controllerName);
			}
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
			var _this3 = this;

			this.clearInterfaces();
			var manifests = this.getOptions('interfaceManifest');
			if (manifests) {
				var _loop = function _loop(name) {
					var recordManifest = manifests[name];
					_this3.getWorking('interfaces')[name] = function (recordData) {
						return new notRecord(recordManifest, recordData);
					};
					window['nr' + notCommon.capitalizeFirstLetter(name)] = _this3.getWorking('interfaces')[name];
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
		key: 'initFormBuilders',
		value: function initFormBuilders() {
			this.clearFormBuilders();
			var forms = this.getOptions('forms');
			if (forms) {
				for (var t in forms) {
					this.initFormBuilder(t, forms[t]);
				}
			}
		}
	}, {
		key: 'initFormBuilder',
		value: function initFormBuilder(index, manifest) {
			var path = notPath$1.join('forms', index);
			this.setWorking(path, new notFormFactory(this, manifest));
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
	}]);
	return notApp;
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
			console.log(targetEl.nodeName);
			if (targetEl.children[0].nodeName === 'NT') {
				l++;
			} else {
				targetEl.removeChild(targetEl.children[l]);
			}
		}
	},
	beforeEach: function beforeEach(targetEl /*, rendered*/) {},
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
		console.log(targetEl.nodeName);
		if (targetEl.nodeName !== 'NT') {
			targetEl.parentNode.removeChild(targetEl);
		}
	},
	after: function after(targetEl /*, rendered*/) {}
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
			this.initEvents(input.events ? input.events : []);
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
				return scope.attributeResult({ scope: scope, item: item, helpers: helpers, e: e });
			} else {
				return true;
			}
		});
	},
	value: function value(scope, item, helpers) {
		var liveEvents = ['change', 'keyup'],
		    onEvent = function onEvent() {
			//console.log(scope.element.type);
			if (['checkbox', 'radio', 'option', 'select', 'select-multiple'].indexOf(scope.element.type) > -1) {
				switch (scope.element.type) {
					case 'checkbox':
						notPath$1.set(scope.attributeExpression, item, helpers, scope.element.checked);
						break;
					case 'radio':
						{
							//console.log(helpers.field.name, helpers.data, helpers, scope.element.checked?scope.element.value:null);
							notPath$1.set(helpers.field.name, helpers.data, helpers, scope.element.checked ? scope.element.value : null);
						}break;
					case 'select-multiple':
						var selected = [].slice.call(scope.element.selectedOptions).map(function (a) {
							return a.value;
						});
						//console.log('select-multiple', selected);
						notPath$1.set(scope.attributeExpression, item, helpers, selected);
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
		scope.attributeResult = typeof res === 'function' ? res({ scope: scope, item: item, helpers: helpers }) : res;
		scope.element.setAttribute(scope.params[0], scope.attributeResult);
	},
	name: function name(scope, item, helpers) {
		scope.element.setAttribute('name', notPath$1.get(scope.attributeExpression, item, helpers));
	},
	change: function change() /*scope, item, helpers*/{},
	checked: function checked(scope, item, helpers) {
		var result = notPath$1.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = typeof result === 'function' ? result({ scope: scope, item: item, helpers: helpers }) : result;
		scope.attributeResult ? scope.element.setAttribute('checked', true) : scope.element.removeAttribute('checked');
	},
	class: function _class(scope, item, helpers) {
		var res = notPath$1.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = typeof res === 'function' ? res({ scope: scope, item: item, helpers: helpers }) : res;
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
	}
};

var OPT_DEFAULT_FORM_PREFIX = 'form_';
var OPT_DEFAULT_ROLE_NAME = 'default';
var OPT_DEFAULT_FORM_TITLE = 'Form default title';
var OPT_DEFAULT_FIELD_DEFINITION = {};

var notForm = function (_notBase) {
	inherits(notForm, _notBase);

	function notForm(input) {
		var _ret;

		classCallCheck(this, notForm);

		var _this = possibleConstructorReturn(this, (notForm.__proto__ || Object.getPrototypeOf(notForm)).call(this));

		_this.setOptions(input.options || {});
		if (!_this.getOptions('prefix')) {
			_this.setOptions('prefix', OPT_DEFAULT_FORM_PREFIX);
		}
		_this.setWorking({
			components: []
		});
		var data = input.data || {};
		if (!data.isRecord) {

			data = new notRecord({}, data);
		}
		_this.setData(data);
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
		key: 'getFieldsDefinition',
		value: function getFieldsDefinition(fieldName) {
			var def = OPT_DEFAULT_FIELD_DEFINITION;
			if (this.getOptions('fields') && this.getOptions('fields').hasOwnProperty(fieldName)) {
				def = this.getOptions('fields')[fieldName];
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
			rec.component = new notComponent({
				data: this.getData(),
				template: {
					name: this.getPartTemplateName(fieldType.type)
				},
				options: {
					helpers: {
						isChecked: function isChecked(params) {
							return params.item.value === _this2.getData(fieldName);
						},
						field: rec.field,
						data: this.getData(),
						libs: this.getOptions(notPath$1.join('helpers', 'libs'))
					},
					targetEl: this.getFormBodyElement(),
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
		key: 'getFormBodyElement',
		value: function getFormBodyElement() {
			return this.getOptions('targetEl').querySelector('[role="body"]');
		}

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

var notTable = function (_notComponent) {
	inherits(notTable, _notComponent);

	function notTable() {
		classCallCheck(this, notTable);
		return possibleConstructorReturn(this, (notTable.__proto__ || Object.getPrototypeOf(notTable)).call(this));
	}

	return notTable;
}(notComponent);

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
exports.notTable = notTable;
exports.notView = notView;
exports.notRecord = notRecord;
exports.notRecordInterface = notInterface;

}((this.notFramework = this.notFramework || {})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9hcGkvb3B0aW9ucy5qcyIsIi4uL3NyYy9hcGkvcXVlZS5qcyIsIi4uL3NyYy9hcGkvYXBpLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdEltYWdlLmpzIiwiLi4vc3JjL25vdFJlY29yZEludGVyZmFjZS5qcyIsIi4uL3NyYy9ub3RSZWNvcmQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RGb3JtRmFjdG9yeS5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvb3B0aW9ucy5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29ycy5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RSZW5kZXJlci5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VBZnRlci5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlQmVmb3JlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VGaXJzdC5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlTGFzdC5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3JlcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9pbmRleC5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RDb21wb25lbnQuanMiLCIuLi9zcmMvbm90Q29udHJvbGxlci5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RGb3JtLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90VGFibGUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RWaWV3LmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBDb21tb25OZXR3b3JrID0ge1xuXHRhZGRIb3N0OiBmdW5jdGlvbih1cmkpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKXtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ3Byb3RvY29sJykgKyB1cmk7XG5cdH0sXG5cdHByZWxvYWRJbWFnZXM6IGZ1bmN0aW9uKGRhdGFBcnJheSwgZmllbGRzKSB7XG5cdFx0Zm9yKHZhciBpIGluIGRhdGFBcnJheSkge1xuXHRcdFx0Zm9yKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZihkYXRhQXJyYXlbaV0uaGFzT3duUHJvcGVydHkoZmllbGRzW2ZdKSkge1xuXHRcdFx0XHRcdHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0XHRcdGltYWdlLnNldEF0dHJpYnV0ZSgnY3Jvc3NPcmlnaW4nLCAnYW5vbnltb3VzJyk7XG5cdFx0XHRcdFx0aW1hZ2Uuc3JjID0gZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV0uaW5kZXhPZignLy8nKSA9PT0gMCA/IHRoaXMuYWRkUHJvdG9jb2woZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV0pIDogZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdHJlcXVlc3RKU09OOiBmdW5jdGlvbihtZXRob2QsIHVybCwgZGF0YSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0cG9zdEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ1BPU1QnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0pO1xuXHR9LFxuXHRwdXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQVVQnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0pO1xuXHR9LFxuXHRkZWxldGVKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdERUxFVEUnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRIVE1MOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gKCk9Pntcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChwYXJzZUludChzdGF0dXMpID09PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoZSkgPT4gcmVqZWN0KGUpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldFNlc3Npb25JRDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9LFxufTtcbmV4cG9ydCBkZWZhdWx0IENvbW1vbk5ldHdvcms7XG4iLCJ2YXIgQ29tbW9uTG9ncyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fSxcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHRyYWNlOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFQX01BTkFHRVIgPSBTeW1ib2woJ01BUF9NQU5BR0VSJyk7XG5cbnZhciBDb21tb25TaG9ydHMgPSB7XG5cdGdldEFQSTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TWFuYWdlcigpLmdldEFQSSgpO1xuXHR9LFxuXHRzZXRNYW5hZ2VyOiBmdW5jdGlvbih2KSB7XG5cdFx0dGhpc1tNQVBfTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQVBfTUFOQUdFUl07XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25TaG9ydHM7XG4iLCIvKiBnbG9iYWwgalF1ZXJ5ICovXG52YXIgQ29tbW9uT2JqZWN0cyA9IHtcblx0ZXh0ZW5kOiBmdW5jdGlvbihkZWZhdWx0cywgb3B0aW9ucykge1xuXHRcdHZhciBleHRlbmRlZCA9IHt9O1xuXHRcdHZhciBwcm9wO1xuXHRcdGZvciAocHJvcCBpbiBkZWZhdWx0cykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkZWZhdWx0cywgcHJvcCkpIHtcblx0XHRcdFx0ZXh0ZW5kZWRbcHJvcF0gPSBkZWZhdWx0c1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChwcm9wIGluIG9wdGlvbnMpIHtcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywgcHJvcCkpIHtcblx0XHRcdFx0ZXh0ZW5kZWRbcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZXh0ZW5kZWQ7XG5cdH0sXG5cdGNvbXBsZXRlQXNzaWduOiBmdW5jdGlvbih0YXJnZXQsIC4uLnNvdXJjZXMpIHtcblx0XHRzb3VyY2VzLmZvckVhY2goc291cmNlID0+IHtcblx0XHRcdGxldCBkZXNjcmlwdG9ycyA9IE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKChkZXNjcmlwdG9ycywga2V5KSA9PiB7XG5cdFx0XHRcdGRlc2NyaXB0b3JzW2tleV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KTtcblx0XHRcdFx0cmV0dXJuIGRlc2NyaXB0b3JzO1xuXHRcdFx0fSwge30pO1xuXHRcdFx0Ly8gYnkgZGVmYXVsdCwgT2JqZWN0LmFzc2lnbiBjb3BpZXMgZW51bWVyYWJsZSBTeW1ib2xzIHRvb1xuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZvckVhY2goc3ltID0+IHtcblx0XHRcdFx0bGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKTtcblx0XHRcdFx0aWYgKGRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuXHRcdFx0XHRcdGRlc2NyaXB0b3JzW3N5bV0gPSBkZXNjcmlwdG9yO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgZGVzY3JpcHRvcnMpO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH0sXG5cdGV4dGVuZFdpdGg6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRcdGZvciAobGV0IHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcblx0XHRcdFx0dGhpc1twcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGNvbnRhaW5zT2JqOiBmdW5jdGlvbihiaWcsIHNtYWxsKSB7XG5cdFx0Zm9yICh2YXIgdCBpbiBzbWFsbCkge1xuXHRcdFx0aWYgKHNtYWxsLmhhc093blByb3BlcnR5KHQpKSB7XG5cdFx0XHRcdGlmICgoIWJpZy5oYXNPd25Qcm9wZXJ0eSh0KSkgfHwgKGJpZ1t0XSAhPT0gc21hbGxbdF0pKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRmaWx0ZXI6IGZ1bmN0aW9uKG9iaiwgZmlsdGVyKSB7XG5cdFx0aWYgKGZpbHRlciAmJiBvYmopIHtcblx0XHRcdHJldHVybiB0aGlzLmNvbnRhaW5zT2JqKG9iaiwgZmlsdGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbmRJY29uQnlGaWx0ZXI6IGZ1bmN0aW9uKGljb25zLCBmaWx0ZXIpIHtcblx0XHR2YXIgYmF0Y2ggPSBbXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGljb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5maWx0ZXIoaWNvbnNbaV0uZ2V0RGF0YSgpLCBmaWx0ZXIpKSB7XG5cdFx0XHRcdGJhdGNoLnB1c2goaWNvbnNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYmF0Y2g7XG5cdH0sXG5cdGVxdWFsT2JqOiBmdW5jdGlvbihhLCBiKSB7XG5cdFx0dmFyIHA7XG5cdFx0Zm9yIChwIGluIGEpIHtcblx0XHRcdGlmICh0eXBlb2YoYltwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKGFbcF0pIHtcblx0XHRcdFx0c3dpdGNoICh0eXBlb2YoYVtwXSkpIHtcblx0XHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2FzZSAnZnVuY3Rpb24nOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YoYltwXSkgPT0gJ3VuZGVmaW5lZCcgfHxcblx0XHRcdFx0XHRcdFx0KHAgIT0gJ2VxdWFscycgJiYgYVtwXS50b1N0cmluZygpICE9IGJbcF0udG9TdHJpbmcoKSkpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChhW3BdICE9IGJbcF0pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGJbcF0pXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAocCBpbiBiKSB7XG5cdFx0XHRpZiAodHlwZW9mKGFbcF0pID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGRlZmluZUlmTm90RXhpc3RzOiBmdW5jdGlvbihvYmosIGtleSwgZGVmYXVsdFZhbHVlKSB7XG5cdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0b2JqW2tleV0gPSBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9LFxuXHRkZWVwTWVyZ2U6IGZ1bmN0aW9uKG9iajEsIG9iajIpIHtcblx0XHRyZXR1cm4galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgb2JqMSwgb2JqMik7XG5cdH0sXG5cblx0cmVnaXN0cnk6IHt9LFxuXHRcblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbk9iamVjdHM7XG4iLCJ2YXIgQ29tbW9uU3RyaW5ncyA9IHtcblx0Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG5cdH0sXG5cdGxvd2VyRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblN0cmluZ3M7XG4iLCJ2YXIgQ29tbW9uRnVuY3Rpb25zID0ge1xuXHRwaXBlOiBmdW5jdGlvbihkYXRhLyogZmVlZCBkYXRhICovLCBmdW5jcy8qIGZ1bmN0aW9ucyBhcnJheSAqLykge1xuXHRcdGxldCByZXN1bHQ7XG5cdFx0Zm9yKGxldCBmdW5jIG9mIGZ1bmNzKXtcblx0XHRcdHJlc3VsdCA9IGZ1bmMocmVzdWx0IHx8IGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRnVuY3Rpb25zO1xuIiwidmFyIENvbW1vbkRPTSA9IHtcblx0Z2V0QXR0cmlidXRlc1N0YXJ0c1dpdGg6IGZ1bmN0aW9uKGVsLCBzdGFydHNXaXRoKSB7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihzdGFydHNXaXRoKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkRPTTtcbiIsInZhciBDb21tb25BcHAgPSB7XG5cdHN0YXJ0QXBwOiAoc3RhcnRlcik9Pntcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc3RhcnRlcik7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aCggc3ViUGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUyk+LTE/aGVscGVyczppdGVtLCBzdWJQYXRoKTtcblx0XHRcdHBhdGggPSB0aGlzLnJlcGxhY2VTdWJQYXRoKHBhdGgsIHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQpO1xuXHRcdFx0aSsrO1xuXHRcdFx0aWYgKGkgPiBNQVhfREVFUCl7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdGdldChwYXRoLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRzd2l0Y2ggKHBhdGgpe1xuXHRcdFx0Y2FzZSBQQVRIX1NUQVJUX09CSkVDVDogcmV0dXJuIGl0ZW07XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfSEVMUEVSUzogcmV0dXJuIGhlbHBlcnM7XG5cdFx0fVxuXHRcdHBhdGggPSB0aGlzLnBhcnNlU3VicyhwYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChwYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHBhdGgpO1xuXHR9XG5cblx0c2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIGF0dHJWYWx1ZSl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aCggc3ViUGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUyk+LTE/aGVscGVyczppdGVtLCBzdWJQYXRoKTtcblx0XHRcdHBhdGggPSB0aGlzLnJlcGxhY2VTdWJQYXRoKHBhdGgsIHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQpO1xuXHRcdFx0aWYgKGkgPiBNQVhfREVFUCl7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFZhbHVlQnlQYXRoKGl0ZW0sIHBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0aWYgKGl0ZW0uaXNSZWNvcmQgJiYgdGhpcy5ub3JtaWxpemVQYXRoKHBhdGgpLmxlbmd0aCA+IDEpIHtcblx0XHRcdGl0ZW0udHJpZ2dlcignY2hhbmdlJywgaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHR1bnNldChwYXRoLCBpdGVtLCBoZWxwZXJzKXtcblx0XHR0aGlzLnNldChwYXRoLCBpdGVtLCBoZWxwZXJzLCBudWxsKTtcblx0fVxuXG5cdHBhcnNlUGF0aFN0ZXAoc3RlcCwgaXRlbSwgaGVscGVyKXtcblx0XHRsZXQgclN0ZXAgPSBudWxsO1xuXHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpID09PSAwICYmIGhlbHBlcil7XG5cdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX0hFTFBFUlMsICcnKTtcblx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0aWYoaGVscGVyLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA9PT0gMCAmJiBpdGVtKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsICcnKTtcblx0XHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdFx0aWYoaXRlbS5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHN0ZXA7XG5cdH1cblxuXHQvLzo6ZmllbGROYW1lLnJlc3VsdFxuXHQvL3t9XG5cdC8ve2ZpZWxkTmFtZTogJ3RhcmdldFJlY29yZEZpZWxkJ31cblx0Ly8vL1sndGFyZ2V0UmVjb3JkRmllbGQnLCAncmVzdWx0J11cblx0cGFyc2VQYXRoKHBhdGgsIGl0ZW0sIGhlbHBlcil7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHBhdGggPSBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRwYXRoW2ldID0gdGhpcy5wYXJzZVBhdGhTdGVwKHBhdGhbaV0sIGl0ZW0sIGhlbHBlcik7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0bm9ybWlsaXplUGF0aChwYXRoKXtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRyZXR1cm4gcGF0aDtcblx0XHR9ZWxzZXtcblx0XHRcdHdoaWxlKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPiAtMSl7XG5cdFx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsJycpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRzbWFsbCA9IFtcInRvZG9cIl0sXG5cdFx0YmlnID0gW1widG9kb1wiLCBcImxlbmd0aFwiXVxuXHRcdHJldHVybiB0cnVlO1xuXG5cdCovXG5cblx0aWZGdWxsU3ViUGF0aChiaWcsIHNtYWxsKXtcblx0XHRpZiAoYmlnLmxlbmd0aDxzbWFsbC5sZW5ndGgpe3JldHVybiBmYWxzZTt9XG5cdFx0Zm9yKGxldCB0ID0wOyB0IDwgc21hbGwubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYoc21hbGxbdF0gIT09IGJpZ1t0XSl7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRnZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoKXtcblx0XHRhdHRyUGF0aCA9IHRoaXMubm9ybWlsaXplUGF0aChhdHRyUGF0aCk7XG5cdFx0bGV0IGF0dHJOYW1lID0gYXR0clBhdGguc2hpZnQoKSxcblx0XHRcdGlzRnVuY3Rpb24gPSBhdHRyTmFtZS5pbmRleE9mKEZVTkNUSU9OX01BUktFUik+LTE7XG5cdFx0aWYgKGlzRnVuY3Rpb24pe1xuXHRcdFx0YXR0ck5hbWUgPSBhdHRyTmFtZS5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdH1cblx0XHRpZiAoKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSAmJiB0eXBlb2Ygb2JqZWN0W2F0dHJOYW1lXSAhPT0gJ3VuZGVmaW5lZCcgJiYgb2JqZWN0W2F0dHJOYW1lXSAhPT0gbnVsbCl7XG5cdFx0XHRsZXQgbmV3T2JqID0gaXNGdW5jdGlvbj9vYmplY3RbYXR0ck5hbWVdKCk6b2JqZWN0W2F0dHJOYW1lXTtcblx0XHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0VmFsdWVCeVBhdGgobmV3T2JqLCBhdHRyUGF0aCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIG5ld09iajtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblx0c2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCwgYXR0clZhbHVlKXtcblx0XHRhdHRyUGF0aCA9IHRoaXMubm9ybWlsaXplUGF0aChhdHRyUGF0aCk7XG5cdFx0bGV0IGF0dHJOYW1lID0gYXR0clBhdGguc2hpZnQoKTtcblx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRpZiAoIW9iamVjdC5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpe29iamVjdFthdHRyTmFtZV0gPSB7fTt9XG5cdFx0XHR0aGlzLnNldFZhbHVlQnlQYXRoKG9iamVjdFthdHRyTmFtZV0sIGF0dHJQYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1lbHNle1xuXHRcdFx0b2JqZWN0W2F0dHJOYW1lXSA9IGF0dHJWYWx1ZTtcblx0XHR9XG5cdH1cblxuXHRqb2luKCl7XG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXHRcdHJldHVybiBhcmdzLmpvaW4oUEFUSF9TUExJVCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFBhdGgoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcblxuY29uc3QgTUVUQV9FVkVOVFMgPSBTeW1ib2woJ2V2ZW50cycpLFxuXHRNRVRBX0RBVEEgPSBTeW1ib2woJ2RhdGEnKSxcblx0TUVUQV9XT1JLSU5HID0gU3ltYm9sKCd3b3JraW5nJyksXG5cdE1FVEFfT1BUSU9OUyA9IFN5bWJvbCgnb3B0aW9ucycpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpc1tNRVRBX0VWRU5UU10gPSB7fTtcblx0XHR0aGlzW01FVEFfREFUQV0gPSB7fTtcblx0XHR0aGlzW01FVEFfV09SS0lOR10gPSB7fTtcblx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldENvbW1vbih3aGF0LCBhcmdzKSB7XG5cdFx0c3dpdGNoIChhcmdzLmxlbmd0aCkge1xuXHRcdGNhc2UgMTpcblx0XHRcdHtcblx0XHRcdFx0Lyogc2V0IGNvbGxlY3Rpb24gKi9cblx0XHRcdFx0d2hhdCA9IGFyZ3NbMF07XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdGNhc2UgMjpcblx0XHRcdHtcblx0XHRcdFx0Lyogc2V0IGNvbGxlY3Rpb24gZWxlbWVudCAqL1xuXHRcdFx0XHRub3RQYXRoLnNldChhcmdzWzBdIC8qIHBhdGggKi8gLCB3aGF0IC8qIGNvbGxlY3Rpb24gKi8gLCB1bmRlZmluZWQgLyogaGVscGVycyAqLyAsIGFyZ3NbMV0gLyogdmFsdWUgKi8gKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGdldENvbW1vbih3aGF0LCBhcmdzKSB7XG5cdFx0c3dpdGNoIChhcmdzLmxlbmd0aCkge1xuXHRcdFx0LyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoICovXG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHR9XG5cdFx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCB3aXRoIGRlZmF1bHQgdmFsdWUgKi9cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdGxldCByZXMgPSBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdFx0aWYgKHJlcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Lyogbm8gZGF0YSwgcmV0dXJuIGRlZmF1bHQgdmFsdWUgKi9cblx0XHRcdFx0XHRyZXR1cm4gYXJnc1sxXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvKiBkYXRhLCByZXR1cm4gaXQgKi9cblx0XHRcdFx0XHRyZXR1cm4gcmVzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvKiByZXR1cm4gZnVsbCBjb2xsZWN0aW9uICovXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIHdoYXQ7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRDT1JFIE9CSkVDVFxuXHRcdFx0REFUQSAtIGluZm9ybWF0aW9uXG5cdFx0XHRPUFRJT05TIC0gaG93IHRvIHdvcmtcblx0XHRcdFdPUktJTkcgLSB0ZW1wb3JhcmlseSBnZW5lcmF0ZWQgaW4gcHJvY2Nlc3Ncblx0Ki9cblxuXHRzZXREYXRhKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfREFUQV0gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0RGF0YSgpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScpO1xuXHR9XG5cblx0Z2V0RGF0YSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX0RBVEFdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0T3B0aW9ucygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX09QVElPTlNdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldE9wdGlvbnMoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cblxuXHRnZXRPcHRpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfT1BUSU9OU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRXb3JraW5nKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfV09SS0lOR10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0V29ya2luZygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdGdldFdvcmtpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9XT1JLSU5HXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdC8qXG5cdFx0RVZFTlRTIGhhbmRsaW5nXG5cdCovXG5cblx0b24oZXZlbnROYW1lcywgZXZlbnRDYWxsYmFja3MsIG9uY2UpIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmRlZmluZUlmTm90RXhpc3RzKHRoaXNbTUVUQV9FVkVOVFNdLCBuYW1lLCBbXSk7XG5cdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5wdXNoKHtcblx0XHRcdFx0Y2FsbGJhY2tzOiBldmVudENhbGxiYWNrcyxcblx0XHRcdFx0b25jZTogb25jZSxcblx0XHRcdFx0Y291bnQ6IDBcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dHJpZ2dlcigpIHtcblx0XHRsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKSxcblx0XHRcdGV2ZW50TmFtZSA9IGFyZ3Muc2hpZnQoKTtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lKSkge1xuXHRcdFx0ZXZlbnROYW1lID0gW2V2ZW50TmFtZV07XG5cdFx0fVxuXHRcdGV2ZW50TmFtZS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0aWYgKHRoaXNbTUVUQV9FVkVOVFNdLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmZvckVhY2goZXZlbnQgPT4ge1xuXHRcdFx0XHRcdGlmIChldmVudC5vbmNlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9mZihuYW1lLCBldmVudC5jYWxsYmFja3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRldmVudC5jYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayguLi5hcmdzKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0b2ZmKGV2ZW50TmFtZXMgLyogYXJyYXkgb2YgZXZlbnQgbmFtZXMgKi8gLCBldmVudENhbGxiYWNrcyAvKiBhcnJheSBvZiBjYWxsYmFja3MgKi8gKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXG5cdFx0ZXZlbnROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0bGV0IHRhcmdldElkID0gLTE7XG5cdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5mb3JFYWNoKChldmVudCwgaSkgPT4ge1xuXHRcdFx0XHRpZiAoaSA9PT0gLTEgJiYgZXZlbnRDYWxsYmFja3MgPT09IGV2ZW50LmNhbGxiYWNrcykge1xuXHRcdFx0XHRcdHRhcmdldElkID0gaTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAodGFyZ2V0SWQgPiAtMSkge1xuXHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5zcGxpY2UodGFyZ2V0SWQsIDEpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG4iLCJsZXQgbm90QVBJT3B0aW9ucyA9IHtcblx0cnBzOiA1MCxcblx0cHJvdG9jb2w6ICdodHRwJyxcblx0aG9zdDogJ2xvY2FsaG9zdCcsXG5cdHBvcnQ6IDkwMDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSU9wdGlvbnM7XG4iLCJjbGFzcyBub3RBUElRdWVle1xuXHRjb25zdHJ1Y3RvciAocmVxdWVzdHNQZXJTZWNvbmQpIHtcblx0XHR0aGlzLnF1ZWUgPSBbXTtcblx0XHR0aGlzLmludCA9IG51bGw7XG5cdFx0dGhpcy5yZXF1ZXN0c1BlclNlY29uZCA9IHJlcXVlc3RzUGVyU2Vjb25kIHx8IDU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW4oKXtcblx0XHR0aGlzLmludCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLmNoZWNrLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLnJlcXVlc3RzUGVyU2Vjb25kKTtcblx0fVxuXG5cdGNoZWNrKCl7XG5cdFx0aWYgKHRoaXMuaW5Qcm9ncmVzcyl7cmV0dXJuO31cblx0XHRlbHNle1xuXHRcdFx0aWYgKHRoaXMucXVlZS5sZW5ndGggPiAwKXtcblx0XHRcdFx0dGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHRvQ2FsbCA9IHRoaXMucXVlZS5zaGlmdCgpO1xuXHRcdFx0XHR0b0NhbGwoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRuZXh0KCl7XG5cdFx0dGhpcy5pblByb2dyZXNzID0gZmFsc2U7XG5cdH1cblxuXHRhZGQoY2FsbCl7XG5cdFx0dGhpcy5xdWVlLnB1c2goY2FsbCk7XG5cdH1cblxuXHRwYXVzZSgpe1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50KTtcblx0fVxuXG5cdHJlc3VtZSgpe1xuXHRcdHRoaXMucnVuKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJUXVlZTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UuanMnO1xuXG5pbXBvcnQgbm90QVBJT3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuaW1wb3J0IG5vdEFQSVF1ZWUgZnJvbSAnLi9xdWVlLmpzJztcblxuXG5jbGFzcyBub3RBUEkgZXh0ZW5kcyAgbm90QmFzZXtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdENvbW1vbi5leHRlbmQobm90QVBJT3B0aW9ucywgb3B0aW9ucykpO1xuXHRcdHRoaXMucXVlZSA9IG5ldyBub3RBUElRdWVlKHRoaXMuZ2V0T3B0aW9ucygncnBzJykpO1xuXHRcdHRoaXMucXVlZS5ydW4oKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG1ha2VVcmwocGFydHMpIHtcblx0XHRyZXR1cm4gcGFydHMuam9pbignLycpO1xuXHR9XG5cblx0cXVlZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgbWV0aG9kLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdG1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKSB7XG5cdFx0bm90Q29tbW9uLmxvZygnbWFraW5nIHJlcXVlc3QnLCBtZXRob2QsIHVybCwgaWQpO1xuXHRcdG5vdENvbW1vbi5yZXF1ZXN0SlNPTihtZXRob2QsIHVybCwgZGF0YSlcblx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXF1ZXN0IHN1Y2Nlc3NmdWxsJywgbWV0aG9kLCB1cmwsIGlkLCByZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3Jlc3BvbnNlIGlzIGdvb2QnKTtcblx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGNvZGUsIHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5lcnJvcigncmVxdWVzdCBmYWlsZWQnLCBtZXRob2QsIHVybCwgaWQsIHJlc3BvbnNlKTtcblx0XHRcdFx0dGhpcy5xdWVlLm5leHQoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVzcG9uc2UgaXMgYmFkJyk7XG5cdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2UpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlJyk7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdwb3N0JywgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlIGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHV0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncHV0JywgdXJsLCBudWxsLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5nZXRNb2RlbCgpLnNldFByaWNlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdwdXR0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZ2V0JywgdXJsLCBpZCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZ2V0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0bGlzdChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZ2V0JywgdXJsLCBudWxsLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdsaXN0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGVsZXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZGVsZXRlJywgdXJsLCBpZCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZGVsZXRlIGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0VXBsb2FkVVJMKG1vZGVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnYmFzZScpICsgdGhpcy5nZXRPcHRpb25zKCd1cGxvYWQnKSArIG1vZGVsP21vZGVsLmdldElkKCk6Jyc7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJO1xuIiwiaW1wb3J0IG5vdEJhc2UgIGZyb20gJy4uL25vdEJhc2UnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW1hZ2UgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbnRlcmZhY2UgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0ZXh0ZW5kT2JqZWN0KG9iajEsIG9iajIpIHtcblx0XHR2YXIgYXR0ck5hbWUgPSAnJztcblx0XHRmb3IgKGF0dHJOYW1lIGluIG9iajIpIHtcblx0XHRcdGlmIChvYmoyLmhhc093blByb3BlcnR5KGF0dHJOYW1lKSkge1xuXHRcdFx0XHRvYmoxW2F0dHJOYW1lXSA9IG9iajJbYXR0ck5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb2JqMTtcblx0fVxuXG5cdHBhcnNlTGluZShsaW5lLCByZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgcmVjb3JkUkUgPSAnOnJlY29yZFsnLFxuXHRcdFx0ZmllbGROYW1lID0gJyc7XG5cdFx0d2hpbGUgKGxpbmUuaW5kZXhPZihyZWNvcmRSRSkgPiAtMSkge1xuXHRcdFx0dmFyIGluZCA9IGxpbmUuaW5kZXhPZihyZWNvcmRSRSk7XG5cdFx0XHR2YXIgbGVuID0gcmVjb3JkUkUubGVuZ3RoO1xuXHRcdFx0dmFyIGluZDIgPSBsaW5lLmluZGV4T2YoJ10nKTtcblx0XHRcdHZhciBzdGFydFNsaWNlID0gaW5kICsgbGVuO1xuXHRcdFx0dmFyIGVuZFNsaWNlID0gaW5kMjtcblx0XHRcdGZpZWxkTmFtZSA9IGxpbmUuc2xpY2Uoc3RhcnRTbGljZSwgZW5kU2xpY2UpO1xuXHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAnJykgYnJlYWs7XG5cdFx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6cmVjb3JkWycgKyBmaWVsZE5hbWUgKyAnXScsIHJlY29yZC5nZXRBdHRyKGZpZWxkTmFtZSkpO1xuXHRcdH1cblx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6bW9kZWxOYW1lJywgdGhpcy5tYW5pZmVzdC5tb2RlbCk7XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOmFjdGlvbk5hbWUnLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgbGluZSA9IHRoaXMucGFyc2VMaW5lKHRoaXMubWFuaWZlc3QudXJsLCByZWNvcmQsIGFjdGlvbk5hbWUpICsgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdwb3N0Rml4JykpID8gdGhpcy5wYXJzZUxpbmUoYWN0aW9uRGF0YS5wb3N0Rml4LCByZWNvcmQsIGFjdGlvbk5hbWUpIDogJycpO1xuXHRcdHJldHVybiBsaW5lO1xuXHR9XG5cblx0Z2V0QWN0aW9uc0NvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSA/IE9iamVjdC5rZXlzKHRoaXMuZ2V0QWN0aW9ucygpKS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Z2V0QWN0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LmFjdGlvbnM/dGhpcy5tYW5pZmVzdC5hY3Rpb25zIDoge307XG5cdH1cblxuXHRzZXRGaW5kQnkoa2V5LCB2YWx1ZSkge1xuXHRcdHZhciBvYmogPSB7fTtcblx0XHRvYmpba2V5XSA9IHZhbHVlO1xuXHRcdHJldHVybiB0aGlzLnNldEZpbHRlcihvYmopO1xuXHR9XG5cblx0c2V0RmlsdGVyKGZpbHRlckRhdGEpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ2ZpbHRlcicsIGZpbHRlckRhdGEpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1vZGVsUGFyYW0oJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0U29ydGVyKHNvcnRlckRhdGEpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3NvcnRlcicsIHNvcnRlckRhdGEpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1vZGVsUGFyYW0oJ3NvcnRlcicpO1xuXHR9XG5cblx0c2V0UGFnZU51bWJlcihwYWdlTnVtYmVyKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdwYWdlTnVtYmVyJywgcGFnZU51bWJlcik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlU2l6ZShwYWdlU2l6ZSkge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgncGFnZVNpemUnLCBwYWdlU2l6ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlcihwYWdlU2l6ZSwgcGFnZU51bWJlcikge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgncGFnZVNpemUnLCBwYWdlU2l6ZSkuc2V0TW9kZWxQYXJhbSgncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHBhZ2VTaXplOiB0aGlzLmdldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJyksXG5cdFx0XHRwYWdlTnVtYmVyOiB0aGlzLmdldE1vZGVsUGFyYW0oJ3BhZ2VOdW1iZXInKVxuXHRcdH07XG5cdH1cblxuXHRzZXRNb2RlbFBhcmFtKHBhcmFtTmFtZSwgcGFyYW1WYWx1ZSkge1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKHBhcmFtTmFtZSwgcGFyYW1WYWx1ZSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kZWxQYXJhbShwYXJhbU5hbWUpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKHBhcmFtTmFtZSwgbnVsbCk7XG5cdH1cblxuXHRnZXRNb2RlbE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMgJiYgdGhpcy5tYW5pZmVzdCA/IHRoaXMubWFuaWZlc3QubW9kZWwgOiBudWxsO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpICYmIHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdID8gdGhpcy5nZXRBY3Rpb25zKClbYWN0aW9uTmFtZV0gOiBudWxsO1xuXHR9XG5cblx0Ly9yZXR1cm4gUHJvbWlzZVxuXHRyZXF1ZXN0KHJlY29yZCwgYWN0aW9uTmFtZSkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKGFjdGlvbk5hbWUpLFxuXHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwsIEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpLCB0aGlzLm9uTG9hZC5iaW5kKHthY3Rpb25EYXRhLCBtYW5pZmVzdDogdGhpcy5tYW5pZmVzdH0pKTtcblx0fVxuLypcblx0X3JlcXVlc3RfT2Jzb2xldGVfKHJlY29yZCwgYWN0aW9uTmFtZSkge1xuXHRcdG5vdENvbW1vbi5sb2coJ3JlcXVlc3QnLCByZWNvcmQsIGFjdGlvbk5hbWUsIGNhbGxiYWNrU3VjY2VzcywgY2FsbGJhY2tFcnJvcik7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKGFjdGlvbk5hbWUpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLmdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpO1xuXHRcdFx0XHRub3RDb21tb24uZ2V0QVBJKCkucXVlZVJlcXVlc3QoYWN0aW9uRGF0YS5tZXRob2QsIHVybCwgcmVjb3JkLmdldElkKCksIEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpLCBnb29kLCBiYWQpXG5cdFx0XHRcdFx0LnRoZW4ocmVzb2x2ZSlcblx0XHRcdFx0XHQuY2F0Y2gocmVqZWN0KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRub3RDb21tb24ubG9nKCd1cGRhdGUnKTtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCk7XG5cblx0XHR9KTtcblxuXG5cdFx0aWYgKGFjdGlvbkRhdGEpe1xuXHRcdFx0dmFyIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4bWxodHRwLm9wZW4oYWN0aW9uRGF0YS5tZXRob2QsIHVybCk7XG5cdFx0XHR4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLTgnKTtcblx0XHRcdHhtbGh0dHAucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eG1saHR0cC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eG1saHR0cC5jYWxsYmFja1N1Y2Nlc3MgPSBjYWxsYmFja1N1Y2Nlc3M7XG5cdFx0XHR4bWxodHRwLmNhbGxiYWNrRXJyb3IgPSBjYWxsYmFja0Vycm9yO1xuXHRcdFx0eG1saHR0cC5vbmxvYWQgPSB0aGlzLm9uTG9hZDtcblx0XHRcdHhtbGh0dHAuc2VuZChKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSk7XG5cdFx0fVxuXHR9XG4qL1xuXHRvbkxvYWQoZGF0YSl7XHRcdFxuXHRcdGlmKHRoaXMgJiYgdGhpcy5hY3Rpb25EYXRhICYmIHRoaXMuYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgnaXNBcnJheScpICYmIHRoaXMuYWN0aW9uRGF0YS5pc0FycmF5KSB7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgZGF0YS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGRhdGFbdF0gPSBuZXcgbm90UmVjb3JkKHRoaXMubWFuaWZlc3QsIGRhdGFbdF0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRmaWxlVXBsb2FkKGZpbGVVcGxvYWQpIHtcblx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKGZpbGVVcGxvYWQuZmlsZSk7XG5cdFx0aWYgKHhoci51cGxvYWQgJiYgdGhpcy5maWxlQWxsb3dlZChmaWxlVXBsb2FkLmZpbGUpKSB7XG5cdFx0XHQvLyBwcm9ncmVzcyBiYXJcblx0XHRcdHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwicHJvZ3Jlc3NcIiwgZSwgZmlsZVVwbG9hZCk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHQvLyBmaWxlIHJlY2VpdmVkL2ZhaWxlZFxuXHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcblx0XHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRcdHZhciBpbmRleCA9IHRoYXQud29ya2luZy5maWxlVXBsb2Fkcy5pbmRleE9mKGZpbGVVcGxvYWQpO1xuXHRcdFx0XHRcdFx0dGhhdC53b3JraW5nLmZpbGVVcGxvYWRzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0XHRmaWxlVXBsb2FkLnRyaWdnZXIoXCJzdWNjZXNzXCIsIGUsIGZpbGVVcGxvYWQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRmaWxlVXBsb2FkLnRyaWdnZXIoXCJmYWlsdXJlXCIsIGUsIGZpbGVVcGxvYWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdC8vIHN0YXJ0IHVwbG9hZFxuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub3BlbihcIlBPU1RcIiwgdGhpcy5nZXRVcGxvYWRVcmwoKSwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBmaWxlVXBsb2FkLmZpbGUudHlwZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIlhfRklMRU5BTUVcIiwgZW5jb2RlVVJJQ29tcG9uZW50KGZpbGVVcGxvYWQuZmlsZS5uYW1lKSk7XG5cdFx0XHR4aHIuc2VuZChmaWxlVXBsb2FkLmZpbGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmaWxlVXBsb2FkLnRyaWdnZXIoXCJmYWlsdXJlXCIsIG5ldyBFdmVudChcIldyb25nRmlsZVR5cGVcIiksIGZpbGVVcGxvYWQpO1xuXHRcdH1cblx0fVxuXHQqL1xufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnO1xuXG5jb25zdCBNRVRBX0lOVEVSRkFDRSA9IFN5bWJvbCgnaW50ZXJmYWNlJyksXG5cdE1FVEFfUFJPWFkgPSBTeW1ib2woJ3Byb3h5JyksXG5cdE1FVEFfQ0hBTkdFID0gU3ltYm9sKCdjaGFuZ2UnKSxcblx0TUVUQV9DSEFOR0VfTkVTVEVEID0gU3ltYm9sKCdjaGFuZ2UubmVzdGVkJyksXG5cdE1FVEFfU0FMID0gWydnZXRBdHRyJywgJ2dldEF0dHJzJywgJ2lzUHJvcGVydHknLCAnaXNSZWNvcmQnLCAnZ2V0TWFuaWZlc3QnLCAnc2V0QXR0cicsICdzZXRBdHRycycsICdnZXREYXRhJywgJ3NldERhdGEnLCAnZ2V0SlNPTicsICdvbicsICdvZmYnLCAndHJpZ2dlciddLFxuXHRERUZBVUxUX0FDVElPTl9QUkVGSVggPSAnJCcsXG5cdERFRkFVTFRfUEFHRV9OVU1CRVIgPSAxLFxuXHRERUZBVUxUX1BBR0VfU0laRSA9IDEwLFxuXHRNRVRBX1JFVFVSTl9UT19ST09UID0gU3ltYm9sKCdyZXR1cm5Ub1Jvb3QnKTtcblxudmFyIGNyZWF0ZVByb3BlcnR5SGFuZGxlcnMgPSBmdW5jdGlvbihvd25lcikge1xuXHRyZXR1cm4ge1xuXHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIGNvbnRleHQpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgZ2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQsIGNvbnRleHQpO1xuXHRcdFx0aWYgKGtleSA9PT0gJ2lzUHJveHknKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykge1xuXHRcdFx0XHRpZiAodGhpc1trZXldKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHJlc1RhcmdldCwga2V5LCBjb250ZXh0KTtcblx0XHR9LmJpbmQob3duZXIpLFxuXHRcdHNldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIHZhbHVlIC8qLCBwcm94eSovICkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBzZXQgXCIke2tleX1cImAsIHR5cGVvZiB0YXJnZXRba2V5XSk7XG5cblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYXR0ZW1wdCB0byBwcml2YXRlIFwiJHtrZXl9XCIgcHJvcGVydHlgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCB2YWx1ZVRvUmVmbGVjdCA9IHZhbHVlO1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHZhbHVlVG9SZWZsZWN0ID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpLCBub3RQYXRoLmpvaW4odGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0cmV0dXJuIHQ7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0fTtcbn07XG5cbmNsYXNzIG5vdFByb3BlcnR5IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGdldFJvb3QsIHBhdGhUbywgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0aWYgKGl0ZW0gJiYgKGl0ZW0uaXNQcm94eSB8fCBpdGVtLmlzUHJvcGVydHkpKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0dGhpcy5zZXRPcHRpb25zKHtcblx0XHRcdGdldFJvb3Q6IGdldFJvb3QsXG5cdFx0XHRwYXRoOiBwYXRoVG9cblx0XHR9KTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVByb3BlcnR5SGFuZGxlcnModGhpcykpO1xuXHRcdHRoaXMuc2V0RGF0YShpdGVtKTtcblx0XHR0aGlzLmlzUHJvcGVydHkgPSB0cnVlO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9SRVRVUk5fVE9fUk9PVF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRbTUVUQV9SRVRVUk5fVE9fUk9PVF0ocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHRsZXQgcm9vdCA9IHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpKCk7XG5cdFx0cm9vdC50cmlnZ2VyKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX1BST1hZXSwgdGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSwgdmFsdWUpO1xuXHR9XG59XG5cblxudmFyIGNyZWF0ZVJlY29yZEhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RSZWNvcmQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QsIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIGl0ZW0uaXNQcm94eSkge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCd0aGlzIGlzIFByb3h5IGl0ZW0nKTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUmVjb3JkIHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRPcHRpb25zKHtcblx0XHRcdGZpbHRlcjoge30sXG5cdFx0XHRzb3J0ZXI6IHt9LFxuXHRcdFx0cGFnZU51bWJlcjogREVGQVVMVF9QQUdFX05VTUJFUixcblx0XHRcdHBhZ2VTaXplOiBERUZBVUxUX1BBR0VfU0laRSxcblx0XHRcdGZpZWxkczogW11cblx0XHR9KTtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXSA9IG5ldyBub3RSZWNvcmRJbnRlcmZhY2UobWFuaWZlc3QpO1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzLmludGVyZmFjZVVwKCk7XG5cdFx0dGhpcy5pc1JlY29yZCA9IHRydWU7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSByZWNvcmQgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRpbml0UHJvcGVydGllcyhpdGVtLCBwYXRoID0gJycpIHtcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoaXRlbSk7XG5cdFx0XHRmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuXHRcdFx0XHRsZXQgY3VyUGF0aCA9IHBhdGggKyAocGF0aC5sZW5ndGggPiAwID8gJy4nIDogJycpICsga2V5O1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2N1clBhdGgnLCBjdXJQYXRoKTtcblx0XHRcdFx0aWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbVtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0dGhpcy5pbml0UHJvcGVydGllcyhpdGVtW2tleV0sIGN1clBhdGgpO1xuXHRcdFx0XHRcdFx0aXRlbVtrZXldID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0Um9vdC5iaW5kKHRoaXMpLCBjdXJQYXRoLCBpdGVtW2tleV0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgb3duIHByb3BlcnR5LCBidXQgbm90IG9iamVjdCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgbm90IG93biBwcm9wZXJ0eScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpdGVtO1xuXHR9XG5cblx0Z2V0Um9vdCgpIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW1zKSB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSBbXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb2xsZWN0aW9uLnB1c2gobmV3IG5vdFJlY29yZChtYW5pZmVzdCwgaXRlbXNbaV0pKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb247XG5cdH1cblxuXHRpbnRlcmZhY2VVcCgpIHtcblx0XHRpZiAodGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9uc0NvdW50KCkgPiAwKSB7XG5cdFx0XHRsZXQgYWN0aW9ucyA9IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEFjdGlvbnMoKTtcblx0XHRcdGZvciAobGV0IGkgaW4gYWN0aW9ucykge1xuXHRcdFx0XHR0aGlzLmFjdGlvblVwKGksIGFjdGlvbnNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFjdGlvblVwKGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLmhhc093blByb3BlcnR5KFtERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0pKSB7XG5cdFx0XHR0aGlzW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSA9ICgpID0+IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlcXVlc3QodGhpcywgaW5kZXgpO1xuXHRcdFx0bm90Q29tbW9uLmxvZygnZGVmaW5lJywgREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXgpO1xuXHRcdH1cblx0fVxuXHQvKlxuXHQtPiAncGF0aC50by5rZXknLCB2YWx1ZU9mS2V5XG5cdDwtIG9rLCB3aXRoIG9uZSBvbkNoYW5nZSBldmVudCB0cmlnZ2VyZWRcblx0Ki9cblxuXHRzZXRBdHRyKGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gbm90UGF0aC5zZXQoa2V5LCB0aGlzW01FVEFfUFJPWFldLCB7fSwgdmFsdWUpO1xuXHR9XG5cblx0Lypcblx0LT5cblx0e1xuXHRcdCdrZXlQYXRoJzogdmFsdWUsXG5cdFx0J2tleS5zdWJQYXRoJzogdmFsdWUyLFxuXHRcdCdrZXlQYXRoLjAudGl0bGUnOiB2YWx1ZTNcblx0fVxuXHQ8LSBvaywgd2l0aCBidW5jaCBvZiBvbkNoYW5nZSBldmVudHMgdHJpZ2dlcmVkXG5cdCovXG5cdHNldEF0dHJzKG9iamVjdFBhcnQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzJywgb2JqZWN0UGFydCwgT2JqZWN0LmtleXMob2JqZWN0UGFydCkpO1xuXHRcdGlmIChvYmplY3RQYXJ0ICYmICh0eXBlb2Ygb2JqZWN0UGFydCA9PT0gJ29iamVjdCcpICYmIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpLmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggaW4gb2JqZWN0UGFydCkge1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzIG9uZSB0byBnbycsIHBhdGgpO1xuXHRcdFx0XHR0aGlzLnNldEF0dHIocGF0aCwgb2JqZWN0UGFydFtwYXRoXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0LT4gJ3BhdGhUb0tleSdcblx0PC0gdmFsdWUxXG5cblx0Ki9cblx0Z2V0QXR0cih3aGF0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdnZXRBdHRyJywgd2hhdCk7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHdoYXQsIHRoaXNbTUVUQV9QUk9YWV0sIHt9KTtcblx0fVxuXG5cdC8qXG5cdC0+IFsncGF0aFRvS2V5JywgJ3BhdGgudG8ua2V5JywgJ3NpbXBsZUtleScsLi4uXVxuXHQ8LSBbdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMywuLi5dXG5cdCovXG5cdGdldEF0dHJzKHdoYXQpIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0aWYgKHdoYXQgJiYgd2hhdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIG9mIHdoYXQpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5nZXRBdHRyKHBhdGgpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXSl7XG5cdFx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ubWFuaWZlc3Q7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRnZXRKU09OKCkge1xuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJpbXBvcnQgIG5vdEJhc2UgIGZyb20gJy4uL25vdEJhc2UnO1xuXG5jbGFzcyBub3RGb3JtRmFjdG9yeSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKGFwcCwgbWFuaWZlc3Qpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHt9KTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Lypcblx0XHRSZW5kZXJpbmdcblx0Ki9cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0XHR0aGlzLnJlbmRlckNvbXBvbmVudHMoKTtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKXtcblxuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpe1xuXG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdGNvbGxlY3REYXRhKCl7XG5cblx0fVxuXG5cdC8qXG5cdFx0RXZlbnQgaGFuZGxlcnNcblx0Ki9cblxuXHRvblN1Ym1pdCgpe1xuXG5cdH1cblxuXHRvblJlc2V0KCl7XG5cblx0fVxuXG5cdG9uQ2FuY2VsKCl7XG5cblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IG5vdEZvcm1GYWN0b3J5O1xuIiwiLyogZ2xvYmFsIHJvdXRpZSAqL1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJztcbmltcG9ydCBub3RGb3JtRmFjdG9yeSBmcm9tICcuL2NvbXBvbmVudHMvbm90Rm9ybUZhY3RvcnknO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5cbmNvbnN0IE9QVF9DT05UUk9MTEVSX1BSRUZJWCA9ICduYycsXG5cdE9QVF9SRUNPUkRfUFJFRklYID0gJ25yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QXBwIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG5vdE1hbmlmZXN0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBhcHAnKTtcblx0XHR0aGlzLnNldE9wdGlvbnMobm90TWFuaWZlc3QpO1xuXHRcdHRoaXMucmVzb3VyY2VzID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGludGVyZmFjZXM6IHt9LFxuXHRcdFx0Y29udHJvbGxlcnM6IHt9LFxuXHRcdFx0aW5pdENvbnRyb2xsZXI6IG51bGwsXG5cdFx0XHRjdXJyZW50Q29udHJvbGxlcjogbnVsbCxcblx0XHRcdGZvcm1zOiB7fVxuXHRcdH0pO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHR2YXIgdXJsID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdFVSTCcpLFxuXHRcdFx0c3VjY2VzcyA9IHRoaXMuc2V0SW50ZXJmYWNlTWFuaWZlc3QuYmluZCh0aGlzKTtcblx0XHRub3RDb21tb24uZ2V0SlNPTih1cmwsIHt9KVxuXHRcdFx0LnRoZW4oc3VjY2Vzcylcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0LmJpbmQodGhpcykpO1xuXHR9XG5cblx0c2V0SW50ZXJmYWNlTWFuaWZlc3QobWFuaWZlc3QpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JywgbWFuaWZlc3QpO1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdC8v0L3Rg9C20L3QviDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0YLRjFxuXHRcdC8v0LzQvtC00LXQu9C4INC/0L7Qu9GD0YfQtdC90L3Ri9C80Lgg0LjQvdGC0LXRgNGE0LXQudGB0LDQvNC4XG5cdFx0dGhpcy51cGRhdGVJbnRlcmZhY2VzKCk7XG5cdFx0Ly/RgdC+0LfQtNCw0L3QuNC1INC+0LHRitC10LrRgtC+0LIg0LDQstGC0L7Qs9C10L3QtdGA0LDRhtC40Y8g0YTQvtGA0Lxcblx0XHR0aGlzLmluaXRGb3JtQnVpbGRlcnMoKTtcblx0XHQvL9C40L3QuNGG0LjQu9C40YbQuNGA0L7QstCw0YLRjCDQuCDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YAg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0XHR0aGlzLmluaXRDb250cm9sbGVyKCk7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXJ0QXBwKCkge1xuXHRcdC8v0YHQvtC30LTQsNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdC8v0YDQvtGD0YLQtdGAINC4INC/0YDQuNCy0Y/Qt9Cw0YLRjCDQuiDQvdC10LzRgyDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0dGhpcy5pbml0Um91dGVyKCk7XG5cdH1cblxuXHRiaW5kQ29udHJvbGxlcihjb250cm9sbGVyTmFtZSkge1xuXHRcdHJldHVybiAoKT0+e1xuXHRcdFx0bmV3IGNvbnRyb2xsZXJOYW1lKHRoaXMpO1xuXHRcdH07XG5cdH1cblxuXHRpbml0Q29udHJvbGxlcigpIHtcblx0XHRpZiAodHlwZW9mKHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRsZXQgaW5pdENvbnRyb2xsZXIgPSB0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJyk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJywgbmV3IGluaXRDb250cm9sbGVyKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRpbml0Um91dGVyKCkge1xuXHRcdHZhciByb3V0aWVJbnB1dCA9IHt9O1xuXHRcdGZvcihsZXQgcm91dGUgaW4gdGhpcy5nZXRPcHRpb25zKCdzaXRlTWFuaWZlc3QnKSl7XG5cdFx0XHRsZXQgY29udHJvbGxlck5hbWUgPSB0aGlzLmdldE9wdGlvbnMoJ3NpdGVNYW5pZmVzdCcpW3JvdXRlXTtcblx0XHRcdHJvdXRpZUlucHV0W3JvdXRlXSA9IHRoaXMuYmluZENvbnRyb2xsZXIoY29udHJvbGxlck5hbWUpO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JvdXRlcicsIHJvdXRpZShyb3V0aWVJbnB1dCkpO1xuXHR9XG5cblx0Z2V0Q3VycmVudENvbnRyb2xsZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInKTtcblx0fVxuXG5cdHNldEN1cnJlbnRDb250cm9sbGVyKGN0cmwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJywgY3RybCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR1cGRhdGVJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuY2xlYXJJbnRlcmZhY2VzKCk7XG5cdFx0bGV0IG1hbmlmZXN0cyA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0XHRpZiAobWFuaWZlc3RzKSB7XG5cdFx0XHRmb3IobGV0IG5hbWUgaW4gbWFuaWZlc3RzKXtcblx0XHRcdFx0bGV0IHJlY29yZE1hbmlmZXN0ID0gbWFuaWZlc3RzW25hbWVdO1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXSA9IChyZWNvcmREYXRhKSA9PiBuZXcgbm90UmVjb3JkKHJlY29yZE1hbmlmZXN0LCByZWNvcmREYXRhKTtcblx0XHRcdFx0d2luZG93WyducicgKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpXSA9IHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFJlY29yZE5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfUkVDT1JEX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRDb250cm9sbGVyTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9DT05UUk9MTEVSX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKTtcblx0fVxuXG5cdGNsZWFySW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ludGVyZmFjZXMnLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0Rm9ybUJ1aWxkZXJzKCkge1xuXHRcdHRoaXMuY2xlYXJGb3JtQnVpbGRlcnMoKTtcblx0XHRsZXQgZm9ybXMgPSB0aGlzLmdldE9wdGlvbnMoJ2Zvcm1zJyk7XG5cdFx0aWYgKGZvcm1zKSB7XG5cdFx0XHRmb3IobGV0IHQgaW4gZm9ybXMpe1xuXHRcdFx0XHR0aGlzLmluaXRGb3JtQnVpbGRlcih0LCBmb3Jtc1t0XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXHRpbml0Rm9ybUJ1aWxkZXIoaW5kZXgsIG1hbmlmZXN0KSB7XG5cdFx0bGV0IHBhdGggPSBub3RQYXRoLmpvaW4oJ2Zvcm1zJywgaW5kZXgpO1xuXHRcdHRoaXMuc2V0V29ya2luZyhwYXRoLCBuZXcgbm90Rm9ybUZhY3RvcnkodGhpcywgbWFuaWZlc3QpKTtcblx0fVxuXG5cdGdldEZvcm1CdWlsZGVycygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdmb3JtcycpO1xuXHR9XG5cblx0Y2xlYXJGb3JtQnVpbGRlcnMoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmb3JtcycsIHt9KTtcblx0fVxuXG5cdHdhaXRUaGlzUmVzb3VyY2UodHlwZSwgaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMucmVzb3VyY2VzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG5cdFx0XHR0aGlzLnJlc291cmNlc1t0eXBlXSA9IHt9O1xuXHRcdH1cblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSBmYWxzZTtcblx0XHRyZXR1cm4gdGhpcy5vblJlc291cmNlUmVhZHkuYmluZCh0aGlzLCB0eXBlLCBpbmRleCk7XG5cdH1cblxuXHRvblJlc291cmNlUmVhZHkodHlwZSwgaW5kZXgpIHtcblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSB0cnVlO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRhbGxSZXNvdXJjZXNSZWFkeSgpIHtcblx0XHR2YXIgaSwgajtcblx0XHRmb3IgKGkgaW4gdGhpcy5yZXNvdXJjZXMpIHtcblx0XHRcdGZvciAoaiBpbiB0aGlzLnJlc291cmNlc1tpXSkge1xuXHRcdFx0XHRpZiAoIXRoaXMucmVzb3VyY2VzW2ldW2pdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cbn1cbiIsImNvbnN0IFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCA9ICduLScsXG5cdFRFTVBMQVRFX1RBRyA9ICdudCcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiA9ICctJyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVggPSAnaWYnLFxuXHRDT01QT05FTlRfSURfUFJFRklYID0gJ25vdF9jb21wb25lbnRfJyxcblx0UEFSVF9JRF9QUkVGSVggPSAnbm90X3BhcnRfJyxcblx0REVGQVVMVF9QTEFDRVIgPSAncGxhY2UnLFxuXHRERUZBVUxUX1BMQUNFUl9MT09QID0gJ3BsYWNlQWZ0ZXInO1xuXG5jb25zdCBPUFRTID0ge1xuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgsXG5cdFRFTVBMQVRFX1RBRyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCxcblx0REVGQVVMVF9QTEFDRVIsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVgsXG5cdFBBUlRfSURfUFJFRklYLFxuXHRERUZBVUxUX1BMQUNFUl9MT09QXG59O1xuXG5leHBvcnQgZGVmYXVsdCBPUFRTO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuY29uc3QgTUVUQV9DQUNIRSA9IFN5bWJvbCgnY2FjaGUnKTtcblxuY2xhc3Mgbm90VGVtcGxhdGVDYWNoZSBleHRlbmRzIG5vdEJhc2V7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ0FDSEVdID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdHRoaXMuaGlkZVRlbXBsYXRlcygpO1xuXHRcdHRoaXMucmVnaXN0ZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpZGVUZW1wbGF0ZXMoKXtcblx0XHRsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdFx0dC5pbm5lckhUTUwgPSBPUFRTLlRFTVBMQVRFX1RBRyArICd7ZGlzcGxheTogbm9uZTt9Jztcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHQpO1xuXHR9XG5cblx0cmVnaXN0ZXIoKSB7XG5cdFx0bm90Q29tbW9uLnJlZ2lzdGVyKCd0ZW1wbGF0ZUNhY2hlJywgdGhpcyk7XG5cdH1cblxuXHRsb2FkKG1hcCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHRmb3IgKHZhciBpIGluIG1hcCkge1xuXHRcdFx0dGhpcy5sb2FkT25lKGksIG1hcFtpXSk7XG5cdFx0fVxuXHR9XG5cblx0bG9hZE9uZShrZXksIHVybCwgY2FsbGJhY2spIHtcblx0XHR2YXIgb1JlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRvUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXHRcdG9SZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KGtleSkpe1xuXHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vdGhhdC5zZXRMb2FkaW5nKGtleSwgdXJsKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZUlubmVySFRNTCk9Pntcblx0XHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0XHRcdH0pLmNhdGNoKCgpPT57XG5cdFx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGUnLCBrZXksIHVybCk7XG5cdFx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlc0hUTUwpPT57XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoaXMucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdFx0dGhpcy5hZGRMaWIodGVtcGxhdGVzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHRcdH0pLmNhdGNoKChlKT0+e1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZXMgbGliJywgdXJsLGUpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcblxuY29uc3QgTUVUQV9QUk9DRVNTT1JTID0gU3ltYm9sKCdwcm9jZXNzb3JzJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFByb2Nlc3NvcigvKiBrZXksIHZhbHVlICovKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQcm9jZXNzb3IoLyoga2V5LCAgZGVmYXVsdFZhbHVlICovKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXJQcm9jZXNzb3JzKCl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGQoKXtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG5cdFx0XHR0aGlzLnNldFByb2Nlc3Nvcihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBhcmd1bWVudHNbMF0pe1xuXHRcdFx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKHQsIGFyZ3VtZW50c1swXVt0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRQcm9jZXNzb3IoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyKCl7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vbm90VGVtcGxhdGVQcm9jZXNzb3JzJztcblxuLypcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGCIERPTSDQv9C+0LTQtNC10YDQtdCy0L4g0LIg0LrQsNGH0LXRgdGC0LLQtSDRiNCw0LHQu9C+0L3QsC5cbiAqINCX0LDQv9C+0LvQvdGP0LXRgiDQtdCz0L4g0LTQsNC90L3Ri9C80LguXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgdCz0LXQvdC10YDQuNGA0L7QstCw0L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xuICpcbiAqICovXG5cbi8qXG5cblx0PGRpdiBuLXRlbXBsYXRlLW5hbWU9XCJ2YXN5YVwiPlxuXHRcdDxwPjxpbnB1dCB0eXBlPVwidGV4dFwiIG4tdmFsdWU9XCI6Y29vbE5hbWVcIi8+PC9wPlxuXHRcdDxwPtCR0L7RgNC40YEg0YXRgNC10L0g0L/QvtC/0LDQtNC10YjRjCDQuCB7ezpjb29sTmFtZX19LjwvcD5cblx0PC9kaXY+XG5cbiAqL1xuXG5jb25zdCBNRVRBX0NPTVBPTkVOVFMgPSBTeW1ib2woJ2NvbXBvbmVudHMnKTtcblxuY2xhc3Mgbm90UmVuZGVyZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Lypcblx0XHRpbnB1dCA9IHtcblx0XHRcdGRhdGE6IG5vdFJlY29yZCxcblx0XHRcdHRlbXBsYXRlOiBlbGVtZW50XG5cdFx0XHRvcHRpb25zOntcblx0XHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdH1cblx0XHR9XG5cdCovXG5cblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXSA9IHt9O1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5jb21wb25lbnQgPSBpbnB1dC5jb21wb25lbnQ7XG5cdFx0dGhpcy5pbml0RGF0YShpbnB1dC5kYXRhID8gaW5wdXQuZGF0YSA6IHt9KTtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQudGVtcGxhdGUpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlKCk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGUoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZScsIHRoaXMuZ2V0V29ya2luZygnZ2V0VGVtcGxhdGUnKSgpKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5nZXREYXRhKCkub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdH1cblxuXHRpbml0V29ya2luZyh0ZW1wbGF0ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRnZXRUZW1wbGF0ZTogdGVtcGxhdGUsXG5cdFx0XHRwYXJ0SWQ6IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgPyB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpIDogT1BUUy5QQVJUX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpIHtcblx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcblx0XHRcdHJldHVybiBbLi4udGhpcy5jb21wb25lbnQuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fVxuXHR9XG5cblx0b25DaGFuZ2UocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHQvKm5vdENvbW1vbi5sb2codGhpcyk7XG5cdFx0bm90Q29tbW9uLmxvZyh0aGlzLmdldEJyZWFkQ3J1bXBzKCkuam9pbignID4gJykpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHJlbmRlcmVyICcsIHRoaXMuZ2V0V29ya2luZygncGFydElkJyksICcgYWZ0ZXIgY2hhbmdlcycsIGtleSwgdmFsdWUpOyovXG5cdFx0dGhpcy51cGRhdGUoa2V5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ29ic29sZXRlJyxwcm94eSwga2V5LCB2YWx1ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHR1cGRhdGUoa2V5KSB7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfQ09NUE9ORU5UU10pIHtcblx0XHRcdGxldCBpdGVtID0gdGhpc1tNRVRBX0NPTVBPTkVOVFNdW3RdLFxuXHRcdFx0XHRpZlBhcnQgPSB0cnVlO1xuXHRcdFx0aWYgKGtleSl7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJyk9PT1udWxsKXtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXRcdGNvbXBvbmVudFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpKSxcblx0XHRcdFx0XHRjaGFuZ2VkUGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChrZXkpO1xuXHRcdFx0XHRpZlBhcnQgPSBub3RQYXRoLmlmRnVsbFN1YlBhdGgoY2hhbmdlZFBhdGgsIGNvbXBvbmVudFBhdGgpO1xuXHRcdFx0XHQvKm5vdENvbW1vbi5sb2coaXRlbS5nZXRPcHRpb25zKCduYW1lJyksICcgPi08ICcsIGl0ZW0uZ2V0T3B0aW9ucygnaWQnKSwgJyA+LTwgJywgY29tcG9uZW50UGF0aCwgY2hhbmdlZFBhdGgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCd3aWxsIGJlIHVwZGF0ZWQnLCBpZlBhcnQpOyovXG5cdFx0XHR9XG5cblx0XHRcdGlmIChpZlBhcnQpIHtcblx0XHRcdFx0aXRlbS51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXRXb3JraW5nTWFwcGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21hcHBpbmcnLCB0aGlzLmNyZWF0ZU1hcHBpbmcoKSk7XG5cdH1cblxuXHQvKlxuXG5cdNCh0L7Qt9C00LDQtdC8INC60LDRgNGC0Ysg0YHQvtC+0YLQstC10YHRgtCy0LjRjyDQv9GA0L7RhtC10YHRgdC+0YDQvtCyLCDQv9GD0YLQtdC5INC00LDQvdC90YvRhSDQsiDQvtCx0YrQtdC60YLQtSDQuCDRjdC70LXQvNC10L3RgtC+0LIg0YjQsNCx0LvQvtC90LAuXG5cdFt7XG5cdFx0ZWwsXG5cdFx0cHJvY2Vzc29yLFxuXHRcdHdvcmtpbmcsXG5cdFx0aXRlbS5wcm9wZXJ0eS5wYXRoXG5cdH1dXG5cblx0Ki9cblxuXHRjcmVhdGVNYXBwaW5nKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmZpbmRBbGxQcm9jZXNzb3JzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZpbmRBbGxQcm9jZXNzb3JzKCkge1xuXHRcdGxldCBwcm9jcyA9IFtdLFxuXHRcdFx0ZWxzID0gbm90Q29tbW9uLmdldEF0dHJpYnV0ZXNTdGFydHNXaXRoKHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLCBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCk7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBhdHRzID0gZWxzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhhdHRzW2ldKTtcblx0XHRcdFx0XHRsZXQgcHJvY0RhdGEgPSB0aGlzLnBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihhdHRzW2ldLm5vZGVOYW1lKTtcblx0XHRcdFx0XHRwcm9jRGF0YS5lbGVtZW50ID0gZWxzW2pdO1xuXHRcdFx0XHRcdHByb2NEYXRhLnByb2Nlc3NvckV4cHJlc3Npb24gPSBhdHRzW2ldLm5vZGVOYW1lO1xuXHRcdFx0XHRcdHByb2NEYXRhLmF0dHJpYnV0ZUV4cHJlc3Npb24gPSBhdHRzW2ldLnZhbHVlO1xuXHRcdFx0XHRcdHByb2NzLnB1c2gocHJvY0RhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwcm9jcztcblx0fVxuXG5cdHBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihwcm9jZXNzb3JFeHByZXNzaW9uKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdHBhcmFtczogW10sXG5cdFx0XHRwcm9jZXNzb3JOYW1lOiAnJyxcblx0XHRcdGlmQ29uZGl0aW9uOiBmYWxzZVxuXHRcdH07XG5cdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCwgJycpO1xuXHRcdGlmIChwcm9jZXNzb3JFeHByZXNzaW9uLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCkgPT09IChwcm9jZXNzb3JFeHByZXNzaW9uLmxlbmd0aCAtIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgubGVuZ3RoKSkge1xuXHRcdFx0cmVzdWx0LmlmQ29uZGl0aW9uID0gdHJ1ZTtcblx0XHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgKyBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLCAnJyk7XG5cdFx0fVxuXHRcdHJlc3VsdC5wYXJhbXMgPSBwcm9jZXNzb3JFeHByZXNzaW9uLnNwbGl0KE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SKTtcblx0XHRyZXN1bHQucHJvY2Vzc29yTmFtZSA9IHJlc3VsdC5wYXJhbXNbMF07XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHJlc3VsdC5wYXJhbXMuc2xpY2UoMSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGV4ZWNQcm9jZXNzb3JzKGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG1hcHBpbmcgPSB0aGlzLmdldFdvcmtpbmcoJ21hcHBpbmcnKTtcblx0XHRpZiAobWFwcGluZykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBwcm9jU2NvcGUgPSBtYXBwaW5nW2ldO1xuXHRcdFx0XHRwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHByb2NTY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBpbmRleCk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnYXR0cmlidXRlUmVzdWx0JywgcHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdFx0XHRcdGxldCBwcm9jTmFtZSA9IHByb2NTY29wZS5wcm9jZXNzb3JOYW1lLFxuXHRcdFx0XHRcdHByb2MgPSBub3RUZW1wbGF0ZVByb2Nlc3NvcnMuZ2V0KHByb2NOYW1lKTtcblx0XHRcdFx0aWYgKHByb2MpIHtcblx0XHRcdFx0XHRwcm9jKHByb2NTY29wZSwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0XHRcdFx0XHRwcm9jU2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvY1Njb3BlLnByb2Nlc3NvckV4cHJlc3Npb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gcHJvY2Vzc29yIGxpa2UnLCBwcm9jTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcpO1xuXHR9XG5cblx0Z2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwYXRoLCBpdGVtKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdH1cblxuXHRjbGVhclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmRlc3Ryb3lTdWJzKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdWJzJywgW10pO1xuXHR9XG5cblx0ZGVzdHJveVN1YnMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFN0YXNoKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IGVsID0gdGhpcy5nZXRTdGFzaCgpW3RdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUpe1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZlN1YkVsZW1lbnRSZW5kZXJlZChudEVsKSB7XG5cdFx0cmV0dXJuIG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkICYmIChudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZC52YWx1ZSA9PT0gJ3RydWUnKTtcblx0fVxuXG5cdHNlYXJjaEZvclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0bGV0IHN1YnMgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCA9IDA7IG50IDwgc3Vicy5sZW5ndGg7IG50KyspIHtcblx0XHRcdGlmICghdGhpcy5pZlN1YkVsZW1lbnRSZW5kZXJlZChzdWJzW250XSkpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJTdWIoc3Vic1tudF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZFN1YihudEVsKSB7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdzdWJzJykucHVzaCh7XG5cdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdHBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiAnJyxcblx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnNyYyA6ICcnLFxuXHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0XHRyZW5kZXJlZExpc3Q6IFtdLFxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU3ViKG50RWwpIHtcblx0XHRpZiAoIW50RWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IGRldGFpbHMgPSB7XG5cdFx0XHRcdGRhdGFQYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogbnVsbCxcblx0XHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMuc3JjLnZhbHVlIDogJycsXG5cdFx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0ZGF0YTogZGV0YWlscy5kYXRhUGF0aCE9PSBudWxsPyB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQoZGV0YWlscy5kYXRhUGF0aCwgdGhpcy5nZXREYXRhKCkpOm51bGwsXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHNyYzogZGV0YWlscy5zcmNcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSxcblx0XHRcdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VBZnRlcicsXG5cdFx0XHRcdFx0aWQ6IGRldGFpbHMuaWQsXG5cdFx0XHRcdFx0bnRFbDogbnRFbCxcblx0XHRcdFx0XHRkYXRhUGF0aDogZGV0YWlscy5kYXRhUGF0aFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvd25lcjogdGhpc1xuXHRcdFx0fTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnaWQnLCBkZXRhaWxzLmlkKTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU11bZGV0YWlscy5pZF0gPSBuZXcgbm90Q29tcG9uZW50KG9wdGlvbnMpO1xuXHR9XG5cblx0Y2xlYXJTdGFzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgW10pO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZScpO1xuXHR9XG5cblx0Z2V0U3Rhc2goKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc3Rhc2gnKTtcblx0fVxuXG5cdHN0YXNoUmVuZGVyZWQoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMuYWRkVG9TdGFzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHR9XG5cblx0cmVwbGFjZVJlbmRlcmVkKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygncmVwbGFjZSBzdGFzaCcpO1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSxcblx0XHRcdHN0YXNoID0gdGhpcy5nZXRTdGFzaCgpLFxuXHRcdFx0bmV3U3Rhc2ggPSBbXSxcblx0XHRcdGFuY2hvciA9IHN0YXNoLmxlbmd0aCA+IDAgPyBzdGFzaFswXSA6IHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLFxuXHRcdFx0cGFyZW50Tm9kZSA9IGFuY2hvci5wYXJlbnROb2RlO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdG5ld1N0YXNoLnB1c2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IG5ld1N0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRpZiAoYW5jaG9yLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTdGFzaFt0XSwgYW5jaG9yLm5leHRTaWJsaW5nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld1N0YXNoW3RdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBzdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdGFzaFt0XSk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBuZXdTdGFzaCk7XG5cdH1cblxuXHRhZGRUb1N0YXNoKG5vZGUpIHtcblx0XHR0aGlzLmdldFN0YXNoKCkucHVzaChub2RlKTtcblx0fVxuXG5cdGlzRGF0YShkYXRhKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlbmRlcmVyO1xuIiwiY29uc3QgcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdGxldCBsID0gMDtcblx0XHR3aGlsZSAodGFyZ2V0RWwuY2hpbGRyZW4ubGVuZ3RoIC0gbCkge1xuXHRcdFx0Y29uc29sZS5sb2codGFyZ2V0RWwubm9kZU5hbWUpO1xuXHRcdFx0aWYgKHRhcmdldEVsLmNoaWxkcmVuWzBdLm5vZGVOYW1lID09PSAnTlQnKXtcblx0XHRcdFx0bCsrO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGJlZm9yZUVhY2g6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge31cbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZTtcbiIsImNvbnN0IHBsYWNlQWZ0ZXIgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUFmdGVyO1xuIiwiY29uc3QgcGxhY2VCZWZvcmUgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUJlZm9yZTtcbiIsImNvbnN0IHBsYWNlRmlyc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2VGaXJzdDtcbiIsImNvbnN0IHBsYWNlTGFzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VMYXN0O1xuIiwiY29uc3QgcmVwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdGNvbnNvbGUubG9nKHRhcmdldEVsLm5vZGVOYW1lKTtcblx0XHRpZiAodGFyZ2V0RWwubm9kZU5hbWUgIT09ICdOVCcpe1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YXJnZXRFbCk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2U7XG4iLCJpbXBvcnQgcGxhY2UgZnJvbSAnLi9wbGFjZSc7XG5pbXBvcnQgcGxhY2VBZnRlciBmcm9tICcuL3BsYWNlQWZ0ZXInO1xuaW1wb3J0IHBsYWNlQmVmb3JlIGZyb20gJy4vcGxhY2VCZWZvcmUnO1xuaW1wb3J0IHBsYWNlRmlyc3QgZnJvbSAnLi9wbGFjZUZpcnN0JztcbmltcG9ydCBwbGFjZUxhc3QgZnJvbSAnLi9wbGFjZUxhc3QnO1xuaW1wb3J0IHJlcGxhY2UgZnJvbSAnLi9yZXBsYWNlJztcblxuY29uc3Qgbm90UGxhY2VycyA9IHtcblx0cGxhY2U6IHBsYWNlLFxuXHRwbGFjZUFmdGVyOiBwbGFjZUFmdGVyLFxuXHRwbGFjZUJlZm9yZTogcGxhY2VCZWZvcmUsXG5cdHBsYWNlRmlyc3Q6IHBsYWNlRmlyc3QsXG5cdHBsYWNlTGFzdDogcGxhY2VMYXN0LFxuXHRyZXBsYWNlOiByZXBsYWNlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RQbGFjZXJzO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi9ub3RUZW1wbGF0ZUNhY2hlJztcbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL25vdFJlbmRlcmVyJztcbmltcG9ydCBub3RQbGFjZXJzIGZyb20gJy4vcGxhY2Vycyc7XG5cbmNvbnN0IE1FVEFfUEFSVFMgPSBTeW1ib2woJ3BhcnRzJyk7XG4vKlxuXHRpbnB1dCA9IHtcblx0XHRkYXRhOiBub3RSZWNvcmQgb3IgW25vdFJlY29yZF0sXG5cdFx0dGVtcGxhdGU6IHtcblx0XHRcdGh0bWw6IGh0bWwoc3RyaW5nKSwgXHRcdC8v0YLQtdC60YHRgiDRgSBodG1sINC60L7QtNC+0Lwg0YjQsNCx0LvQvtC90LBcblx0XHRcdGVsOiBIVE1MRWxlbWVudChvYmplY3QpLCBcdC8vRE9NINGN0LvQtdC80LXQvdGCXG5cdFx0XHRzcmM6IHNyYyhzdHJpbmcpLFx0XHRcdC8v0YHRgdGL0LvQutCwINC90LAg0YTQsNC50Lsg0YEg0YjQsNCx0LvQvtC90L7QvFxuXHRcdFx0bmFtZTogbmFtZShzdHJpbmcpXHRcdFx0Ly/QvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwINC00LvRjyDQv9C+0LjRgdC60LAg0LIg0LrRjdGI0LUgbm90VGVtcGxhdGVDYWNoZVxuXHRcdH1cblx0XHRvcHRpb25zOntcblx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdC8v0LAg0Y3RgtC+INC60LDQuiDQsdGD0LTQtdC8INC/0L7QvNC10YnQsNGC0Ywg0YDQtdC30YPQu9GM0YLQsNGCINGA0LXQvdC00LXRgNC40L3Qs9CwXG5cdFx0XHRyZW5kZXJBbmQ6IHBsYWNlU3R5bGUoc3RyaW5nKSDQvtC00LjQvSDQuNC3INCy0LDRgNC40LDQvdGC0L7QslxuXHRcdFx0XHRcdHBsYWNlXHRcdC1cdNC/0L7QvNC10YnQsNC10Lwg0LLQvdGD0YLRgNC4INGG0LXQu9C10LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuXHRcdFx0XHRcdHJlcGxhY2VcdFx0LVx00LfQsNC80LXQvdGP0LXQvFxuXHRcdFx0XHRcdHBsYWNlQWZ0ZXJcdC1cdNC/0L7RgdC70LVcblx0XHRcdFx0XHRwbGFjZUJlZm9yZVx0LVx00LTQvlxuXHRcdFx0XHRcdHBsYWNlRmlyc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C10YDQstGL0Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdFx0XHRcdHBsYWNlTGFzdFx0LVx00LLQvdGD0YLRgNC4INC/0L7RgdC70LXQtNC90LjQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0fVxuXHR9XG4qL1xuY2xhc3Mgbm90Q29tcG9uZW50IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpe1xuXHRcdGlmICh0aGlzLm93bmVyKXtcblx0XHRcdHJldHVybiBbLi4udGhpcy5vd25lci5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1cblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5vd25lciA9IGlucHV0Lm93bmVyP2lucHV0Lm93bmVyOm51bGw7XG5cdFx0dGhpcy5pbml0RGF0YShpbnB1dC5kYXRhID8gaW5wdXQuZGF0YSA6IHt9KTtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdEV2ZW50cyhpbnB1dC5ldmVudHMgPyBpbnB1dC5ldmVudHMgOiBbXSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dCk7XG5cdFx0dGhpcy5wcmVwYXJlVGVtcGxhdGVFbGVtZW50KGlucHV0LnRlbXBsYXRlID8gaW5wdXQudGVtcGxhdGUgOiBudWxsKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHR9XG5cblx0aW5pdEV2ZW50cyhsaXN0KXtcblx0XHRmb3IobGV0IHQgb2YgbGlzdCl7XG5cdFx0XHR0aGlzLm9uKC4uLnQpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdpZCcpKXtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygnaWQnLCBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ250RWwnKSl7XG5cdFx0XHR0aGlzLmluaXRNYXJrRWxlbWVudCgpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRNYXJrRWxlbWVudCgpe1xuXHRcdGxldCBtYXJrRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdudCcpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbnRFbCcsIG1hcmtFbCk7XG5cdFx0bGV0IHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdHBsYWNlci5tYWluKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSwgW21hcmtFbF0pO1xuXHR9XG5cblx0aW5pdFdvcmtpbmcodmFsKSB7XG5cdFx0dGhpcy51bnNldFJlYWR5KHZhbCk7XG5cdH1cblxuXHRwcmVwYXJlVGVtcGxhdGVFbGVtZW50KHZhbCkge1xuXHRcdGlmICghdmFsKSB7XG5cdFx0XHR0aGlzLnVuc2V0UmVhZHkoKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnaHRtbCcpICYmIHZhbC5odG1sKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUud3JhcCgnJywgJycsIHZhbC5odG1sKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2VsJykgJiYgdmFsLmVsKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KHZhbC5lbC5jbG9uZU5vZGUodHJ1ZSkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdzcmMnKSAmJiB2YWwuc3JjKSB7XG5cdFx0XHRub3RUZW1wbGF0ZUNhY2hlLmFkZEZyb21VUkwodmFsLnNyYywgdmFsLnNyYylcblx0XHRcdFx0LnRoZW4odGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudC5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ25hbWUnKSAmJiB2YWwubmFtZSkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLmdldCh2YWwubmFtZSkpO1xuXHRcdH1cblx0fVxuXG5cdHNldFByb3RvVGVtcGxhdGVFbGVtZW50KGNvbnQpIHtcblx0XHRpZiAoY29udCkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcsIGNvbnQpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdyZWFkeScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ1dyb25nIHRlbXBsYXRlIGNvbnRhaW5lciBlbGVtZW50Jyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnKS5jbG9uZU5vZGUodHJ1ZSk7XG5cdH1cblxuXHRnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0cmVzZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3RlbXBsYXRlRWxlbWVudCcsIHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKS5jbG9uZU5vZGUodHJ1ZSkpO1xuXHR9XG5cblx0c2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIHRydWUpO1xuXHR9XG5cblx0dW5zZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgZmFsc2UpO1xuXHR9XG5cblx0aXNSZWFkeSgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdyZWFkeScpO1xuXHR9XG5cblx0Y2xlYXJQYXJ0cygpIHtcblx0XHQvKiDQuNC30LLQtdGJ0LDQtdC8INC+0LEg0YPQtNCw0LvQtdC90LjQuCDRjdC70LXQvNC10L3RgtC+0LIgKi9cblx0XHRpZiAodGhpc1tNRVRBX1BBUlRTXSAmJiBBcnJheS5pc0FycmF5KHRoaXNbTUVUQV9QQVJUU10pICYmIHRoaXNbTUVUQV9QQVJUU10ubGVuZ3RoKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXNbTUVUQV9QQVJUU10pIHtcblx0XHRcdFx0aWYgKHQuZGVzdHJveSl7XG5cdFx0XHRcdFx0dC5kZXN0cm95KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdH1cblxuXHRkZXN0cm95KCl7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLnBhcmVudE5vZGUpe1xuXHRcdFx0dGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmdldE9wdGlvbnMoJ250RWwnKSk7XG5cdFx0fVxuXHR9XG5cblx0cmVzZXRQYXJ0cygpIHtcblx0XHR0aGlzW01FVEFfUEFSVFNdID0gW107XG5cdH1cblxuXHRnZXRQYXJ0cygpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BBUlRTXTtcblx0fVxuXG5cdGFkZFBhcnQodGVtcGxhdGUpIHtcblx0XHR0aGlzW01FVEFfUEFSVFNdLnB1c2godGVtcGxhdGUpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2xlYXJQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMucmVtb3ZlT2Jzb2xldGVQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJVcGRhdGUnKTtcblx0fVxuXG5cdHBsYWNlUmVuZGVyZWQoKXtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKSB7XG5cdFx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0XHRwbGFjZXIuYmVmb3JlKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSk7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucGxhY2VQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0cGxhY2VyLmFmdGVyKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gdGFyZ2V0IGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRwbGFjZVBhcnQoZGF0YSwgaW5kZXgpe1xuXHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpLFxuXHRcdFx0bm9kZXMgPSBwYXJ0LmdldFN0YXNoKCksXG5cdFx0XHR0YXJnZXRFbCxcblx0XHRcdGxhc3ROb2RlLFxuXHRcdFx0cGxhY2VyO1xuXHRcdGlmIChpbmRleCA9PT0gMCl7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIoT1BUUy5ERUZBVUxUX1BMQUNFUl9MT09QKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScpO1xuXHRcdH1cblx0XHRwbGFjZXIubWFpbih0YXJnZXRFbCwgbm9kZXMpO1xuXHRcdGxhc3ROb2RlID0gdGFyZ2V0RWw7XG5cdFx0Zm9yKGxldCB0IG9mIG5vZGVzKXtcblx0XHRcdGlmICh0Lm5vZGVUeXBlID09PSAxKXtcblx0XHRcdFx0bGFzdE5vZGUgPSB0O1xuXHRcdFx0XHRsYXN0Tm9kZS5zZXRBdHRyaWJ1dGUoJ250LWNvbXBvbmVudCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtcGFydCcsIHBhcnQuZ2V0V29ya2luZygncGFydElkJykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJywgbGFzdE5vZGUpO1xuXHR9XG5cblx0Z2V0UGxhY2VyKG1ldGhvZCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2VhcmNoaW5nIGZvciBwbGFjZXInLCBtZXRob2QpO1xuXHRcdGlmIChub3RQbGFjZXJzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW21ldGhvZF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW09QVFMuREVGQVVMVF9QTEFDRVJdO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hEYXRhKGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXREYXRhKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZ1bmModGhpcy5nZXREYXRhKCksIDApO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hQYXJ0KGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldFBhcnRzKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0UGFydHMoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHTQtdGB0LvQuCDRgSDQtNCw0L3QvdGL0LzQuCDQvdC1INGB0LLRj9C30LDQvSDRgNC10L3QtNC10YDQtdGAIC0g0YHQvtC30LTQsNC10Lxcblx0Ki9cblxuXHRyZW5kZXJQYXJ0KGRhdGEpIHtcblx0XHRpZiAoIXRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjcmVhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0bGV0IHJlbmRlcmVyID0gbmV3IG5vdFJlbmRlcmVyKHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dGVtcGxhdGU6IHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKSxcblx0XHRcdFx0Y29tcG9uZW50OiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdC8vcmVuZGVyZXIub24oJ29ic29sZXRlJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFkZFBhcnQocmVuZGVyZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCd1cGRhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0dGhpcy51cGRhdGVQYXJ0KHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlUGFydChwYXJ0KXtcblx0XHRwYXJ0LnVwZGF0ZSgpO1xuXHR9XG5cblx0cmVtb3ZlT2Jzb2xldGVQYXJ0cygpIHtcblx0XHQvL9C60L7QvdCy0LXQtdGAINC/0L7QuNGB0Log0LDQutGC0YPQsNC70YzQvdGL0YUgLSDRg9C00LDQu9C10L3QuNC1INC+0YHRgtCw0LvRjNC90YvRhVxuXHRcdG5vdENvbW1vbi5waXBlKFxuXHRcdFx0dW5kZWZpbmVkLCAvLyBwYXJ0cyB0byBzZWFyY2ggaW4sIGNhbiBiZSAndW5kZWZpbmVkJ1xuXHRcdFx0W1xuXHRcdFx0XHR0aGlzLmZpbmRBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL2ZpcnN0IHJvdW5kLCBzZWFyY2ggZm9yIG9ic29sZXRlXG5cdFx0XHRcdHRoaXMucmVtb3ZlTm90QWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9yZW1vdmUgJ2VtXG5cdFx0XHRdXG5cdFx0KTtcblx0fVxuXG5cdC8qXG5cdFx00LXRgdGC0Ywg0LTQsNC90L3Ri9C1INC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0LDQutGC0YPQsNC70YzQvdC+LFxuXHRcdNC90LXRgiDQtNCw0L3QvdGL0YUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDRgdGC0LDRgNGM0ZFcblx0Ki9cblxuXHRmaW5kQWN0dWFsUGFydHMoKSB7XG5cdFx0bGV0IGFjdHVhbFBhcnRzID0gW107XG5cdFx0dGhpcy5mb3JFYWNoRGF0YSgoZGF0YS8qLCBpbmRleCovKT0+e1xuXHRcdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSk7XG5cdFx0XHRpZiAocGFydCl7XG5cdFx0XHRcdGFjdHVhbFBhcnRzLnB1c2gocGFydCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGFjdHVhbFBhcnRzO1xuXHR9XG5cblx0Lypcblx0XHTRg9C00LDQu9GP0LXQvCDQstGB0LUg0LrRgNC+0LzQtSDQsNC60YLRg9Cw0LvRjNC90YvRhVxuXHQqL1xuXHRyZW1vdmVOb3RBY3R1YWxQYXJ0cyhhY3R1YWxQYXJ0cyl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAoYWN0dWFsUGFydHMuaW5kZXhPZih0aGlzLmdldFBhcnRzKClbdF0pID09PSAtMSl7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKVt0XS5kZXN0cm95KCk7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKS5zcGxpY2UodCwgMSk7XG5cdFx0XHRcdHQtLTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRQYXJ0QnlEYXRhKGRhdGEpIHtcblx0XHRmb3IgKGxldCB0IGluIHRoaXMuZ2V0UGFydHMoKSkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0UGFydHMoKVt0XS5pc0RhdGEoZGF0YSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UGFydHMoKVt0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbXBvbmVudDtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SID0gJy5wYWdlLWNvbnRlbnQnLFxuXHRPUFRfREVGQVVMVF9WSUVXU19QT1NURklYID0gJy5odG1sJyxcblx0T1BUX0RFRkFVTFRfVklFV19OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9SRU5ERVJfRlJPTV9VUkwgPSB0cnVlLFxuXHRPUFRfREVGQVVMVF9QTFVSQUxfTkFNRSA9ICdNb2RlbHMnLFxuXHRPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSA9ICdNb2RlbCcsXG5cdE9QVF9ERUZBVUxUX01PRFVMRV9OQU1FID0gJ21haW4nLFxuXHRPUFRfREVGQVVMVF9SRU5ERVJfQU5EID0gJ3BsYWNlJztcblxuY2xhc3Mgbm90Q29udHJvbGxlciBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihhcHApIHtcblx0XHRzdXBlcigpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGNvbnRyb2xsZXInKTtcblx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cmVhZHk6IGZhbHNlLFxuXHRcdFx0dmlld3M6IHt9LFxuXHRcdFx0dmlld05hbWU6IE9QVF9ERUZBVUxUX1ZJRVdfTkFNRSxcblx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0fSk7XG5cdFx0dGhpcy5zZXREYXRhKHt9KTtcblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0bW9kdWxlTmFtZTogT1BUX0RFRkFVTFRfTU9EVUxFX05BTUUsXG5cdFx0XHRjb250YWluZXJTZWxlY3RvcjogT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SLFxuXHRcdFx0cHJlZml4OiB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGUnKSxcblx0XHRcdHBvc3RmaXg6IE9QVF9ERUZBVUxUX1ZJRVdTX1BPU1RGSVgsXG5cdFx0XHRyZW5kZXJGcm9tVVJMOiBPUFRfREVGQVVMVF9SRU5ERVJfRlJPTV9VUkwsXG5cdFx0XHRwbHVyYWxOYW1lOiBPUFRfREVGQVVMVF9QTFVSQUxfTkFNRSxcblx0XHRcdHNpbmdsZU5hbWU6IE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FXG5cdFx0fSk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLmluaXRSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0Lypcblx0XHQgICAg0YHRgNCw0LfRgyDQtNC10LvQsNC10Lwg0LTQvtGB0YLRg9C/0L3Ri9C80Lgg0LzQvtC00LXQu9C4IG5vdFJlY29yZCDQuNC3IG5jYENvbnRyb2xsZXJOYW1lYCDQsdGD0LTRg9GCINC00L7RgdGC0YPQv9C90Ysg0LrQsNC6IHRoaXMubnJgTW9kZWxOYW1lYFxuXHRcdCovXG5cdFx0bGV0IGludGVyZmFjZXMgPSB0aGlzLmFwcC5nZXRJbnRlcmZhY2VzKCk7XG5cdFx0dGhpcy5tYWtlID0ge307XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBpbnRlcmZhY2VzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHR0aGlzLm1ha2VbdF0gPSBpbnRlcmZhY2VzW3RdO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRSZW5kZXIoKXtcblx0XHR0aGlzLnJlbmRlcih0aGlzLmdldFdvcmtpbmcoJ3ZpZXdOYW1lJyksIHRoaXMuZ2V0RGF0YSgpLCB0aGlzLmdldFdvcmtpbmcoJ2hlbHBlcnMnKSk7XG5cdH1cblxuXHRyZW5kZXIodmlld05hbWUgPSdkZWZhdWx0JyAvKiB2aWV3IG5hbWUgKi8sIGRhdGEgPSB7fSAvKiBkYXRhIGZvciBub3RUZW1wbGF0ZSovICwgaGVscGVycyA9IHt9LyogY291bGQgYmUgbm90IHJlcHJlc2VudGVkICovKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHR2YXIgdmlldyA9IHRoaXMuZ2V0Vmlldyh2aWV3TmFtZSk7XG5cblx0XHRcdGlmICh0eXBlb2YgdmlldyA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldyA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZWplY3QoJ05vIHZpZXcgZm91bmQnLCB2aWV3TmFtZSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dmlldyA9IG5vdENvbW1vbi5leHRlbmQoe30sIHZpZXcpO1xuXHRcdFx0XHQvLyDQtdGB0LvQuCBwbGFjZSDQvdC1INGD0LrQsNC30LDQvdC+LCDRh9GC0L4g0LLQvtC30LzQvtC20L3QviDQuCDRgNCw0LfRg9C80L3QviDQv9GA0Lgg0L3QtSDRgdGD0YnQtdGB0YLQstC+0LLQsNC90LjQuFxuXHRcdFx0XHQvLyDRjdC70LXQvNC10L3RgtCwLCDQvdC+INC40LfQstC10YHRgtC90L7QvCDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgNC1XG5cdFx0XHRcdGlmICgoKHR5cGVvZiB2aWV3LnRhcmdldEVsID09PSAndW5kZWZpbmVkJykgfHwgKHZpZXcudGFyZ2V0RWwgPT09IG51bGwpKSAmJiAodHlwZW9mIHZpZXcudGFyZ2V0UXVlcnkgIT09ICd1bmRlZmluZWQnICYmIHZpZXcudGFyZ2V0UXVlcnkgIT09IG51bGwgJiYgdmlldy50YXJnZXRRdWVyeS5sZW5ndGggPiAwKSkge1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZpZXcudGFyZ2V0UXVlcnkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZpZXcuZGF0YSA9IGRhdGE7XG5cdFx0XHRcdGlmICh0eXBlb2Ygdmlldy5oZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3LmhlbHBlcnMgIT09IG51bGwgJiYgT2JqZWN0LmtleXModmlldy5oZWxwZXJzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh2aWV3LmhlbHBlcnMsIGhlbHBlcnMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZpZXcuaGVscGVycyA9IGhlbHBlcnM7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly/QtdGB0LvQuCDQvdGD0LbQvdC+INC30LDQs9GA0YPQttCw0YLRjCDRiNCw0LHQu9C+0L3Ri1xuXHRcdFx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJGcm9tVVJMJykpIHtcblx0XHRcdFx0XHQvL9C4INCw0LTRgNC10YEg0L3QtSDRg9C60LDQt9Cw0L1cblx0XHRcdFx0XHRpZiAodHlwZW9mIHZpZXcudGVtcGxhdGVVUkwgPT09ICd1bmRlZmluZWQnIHx8IHZpZXcudGVtcGxhdGVVUkwgPT0gbnVsbCB8fCB2aWV3LnRlbXBsYXRlVVJMLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdFx0XHRsZXQgcHJlZml4ID0gKHZpZXcuY29tbW9uID8gdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMuY29tbW9uJyk6IHRoaXMuZ2V0TW9kdWxlUHJlZml4KCkpLFxuXHRcdFx0XHRcdFx0XHRuYW1lID0gKCh0eXBlb2Ygdmlldy5uYW1lICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3Lm5hbWUgIT09IG51bGwgJiYgdmlldy5uYW1lLmxlbmd0aCA+IDApID8gdmlldy5uYW1lIDogdmlld05hbWUpLFxuXHRcdFx0XHRcdFx0XHRwb3N0Zml4ID0gdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0XHQvL9Cz0LXQvdC10YDQuNGA0YPQtdC8INCw0LTRgNC10YEg0L/QviDRiNCw0LHQu9C+0L3Rg1xuXHRcdFx0XHRcdFx0dmlldy50ZW1wbGF0ZVVSTCA9ICBbcHJlZml4LCBuYW1lXS5qb2luKCcvJykgKyBwb3N0Zml4O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL9CwINC10YHQu9C4INC10YHRgtGMINC90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAsINGC0L5cblx0XHRcdFx0XHRpZiAodmlldy5oYXNPd25Qcm9wZXJ0eSgndGVtcGxhdGVOYW1lJykpIHtcblx0XHRcdFx0XHRcdC8vLi4uXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlTmFtZSA9IHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyB2aWV3LnRlbXBsYXRlTmFtZSArIHRoaXMuZ2V0T3B0aW9ucygncG9zdGZpeCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudCcsIG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRcdGRhdGEsXG5cdFx0XHRcdFx0dGVtcGxhdGU6e1xuXHRcdFx0XHRcdFx0bmFtZTogdmlldy50ZW1wbGF0ZU5hbWUsXG5cdFx0XHRcdFx0XHRzcmM6IHZpZXcudGVtcGxhdGVVUkwsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6W1snYWZ0ZXJSZW5kZXInLCByZXNvbHZlXV0sXG5cdFx0XHRcdFx0b3B0aW9uczp7XG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogdmlldy50YXJnZXRFbCxcblx0XHRcdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdFx0XHRyZW5kZXJBbmQ6IE9QVF9ERUZBVUxUX1JFTkRFUl9BTkQgfHwgdmlldy5yZW5kZXJBbmRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QXBwKCkge1xuXHRcdHJldHVybiB0aGlzLmFwcDtcblx0fVxuXG5cdHNldE1vZGVsKG1vZGVsKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtb2RlbCcsIG1vZGVsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZGVsKCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ21vZGVsJyk7XG5cdH1cblxuXHRzZXRSZWFkeSh2YWwgPSB0cnVlKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIHZhbCk7XG5cdFx0dmFsID8gdGhpcy50cmlnZ2VyKCdyZWFkeScpIDogdGhpcy50cmlnZ2VyKCdidXN5Jyk7XG5cdH1cblxuXHRzZXRWaWV3KG5hbWUsIHZpZXcpe1xuXHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgbmFtZSksIHZpZXcpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0Vmlld3Modmlld3Mpe1xuXHRcdGZvcihsZXQgdCBpbiB2aWV3cyl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIHQpLCB2aWV3c1t0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0VmlldyhuYW1lID0gJ2RlZmF1bHQnKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSk7XG5cdH1cblxuXHRzZXRNb2R1bGVOYW1lKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbW9kdWxlTmFtZScsIHZhbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNb2R1bGVOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ21vZHVsZU5hbWUnKTtcblx0fVxuXG5cdGdldE1vZHVsZVByZWZpeCgpe1xuXHRcdHJldHVybiBbdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMubW9kdWxlcycpLCB0aGlzLmdldE1vZHVsZU5hbWUoKV0uam9pbignLycpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29udHJvbGxlcjtcbiIsImltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGguanMnO1xuXG52YXIgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliID0ge1xuXHRjb250ZW50OmZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmluZGV4T2YoJ2NhcGl0YWxpemUnKSA+IC0xKXtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdC50b1VwcGVyQ2FzZSgpO1xuXHRcdH1cblx0XHRzY29wZS5lbGVtZW50LnRleHRDb250ZW50ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0O1xuXHR9LFxuXHRiaW5kOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpPT57XG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCl7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe3Njb3BlLCBpdGVtLCBoZWxwZXJzLCBlfSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IGxpdmVFdmVudHMgPSBbJ2NoYW5nZScsICdrZXl1cCddLFxuXHRcdFx0b25FdmVudCA9ICgpPT57XG5cdFx0XHRcdC8vY29uc29sZS5sb2coc2NvcGUuZWxlbWVudC50eXBlKTtcblx0XHRcdFx0aWYgKFsnY2hlY2tib3gnLCAncmFkaW8nLCAnb3B0aW9uJywgJ3NlbGVjdCcsICdzZWxlY3QtbXVsdGlwbGUnXS5pbmRleE9mKHNjb3BlLmVsZW1lbnQudHlwZSkgPiAtMSl7XG5cdFx0XHRcdFx0c3dpdGNoIChzY29wZS5lbGVtZW50LnR5cGUpe1xuXHRcdFx0XHRcdFx0Y2FzZSAnY2hlY2tib3gnOlxuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ3JhZGlvJzp7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZD9zY29wZS5lbGVtZW50LnZhbHVlOm51bGwpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkP3Njb3BlLmVsZW1lbnQudmFsdWU6bnVsbCk7XG5cdFx0XHRcdFx0XHR9YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICdzZWxlY3QtbXVsdGlwbGUnOlxuXHRcdFx0XHRcdFx0XHRsZXQgc2VsZWN0ZWQgPSBbXS5zbGljZS5jYWxsKHNjb3BlLmVsZW1lbnQuc2VsZWN0ZWRPcHRpb25zKS5tYXAoYSA9PiBhLnZhbHVlKTtcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnc2VsZWN0LW11bHRpcGxlJywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSwgJyAtPiAnLHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSAhPT0gdHJ1ZSl7XG5cdFx0XHRmb3IobGV0IHQgb2YgbGl2ZUV2ZW50cyl7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0LCBvbkV2ZW50KTtcblx0XHRcdH1cblx0XHRcdHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0YXR0cjogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpP3Jlcyh7c2NvcGUsIGl0ZW0sIGhlbHBlcnN9KTpyZXMpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKHNjb3BlLnBhcmFtc1swXSwgc2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0fSxcblx0bmFtZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbigvKnNjb3BlLCBpdGVtLCBoZWxwZXJzKi8pe1xuXG5cdH0sXG5cdGNoZWNrZWQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJyk/cmVzdWx0KHtzY29wZSwgaXRlbSwgaGVscGVyc30pOnJlc3VsdCk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID8gc2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKSA6IHNjb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG5cdH0sXG5cdGNsYXNzOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpP3Jlcyh7c2NvcGUsIGl0ZW0sIGhlbHBlcnN9KTpyZXMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoIDwgMyB8fCBpc05hTihzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKXtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpe1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKXtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpe1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRsZXQgdXNlZCA9IGZhbHNlO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHNjb3BlLnBhcmFtcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGlmICggaSA9PT0gc2NvcGUuYXR0cmlidXRlUmVzdWx0KXtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0XHR1c2VkID0gdHJ1ZTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKCF1c2VkKXtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRvcHRpb25zOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBpID0gMCxcblx0XHRcdG9wdGlvbiA9IG51bGwsXG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9ICd2YWx1ZScsXG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9ICduYW1lJyxcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkJykmJmhlbHBlcnMuZmllbGQuaGFzT3duUHJvcGVydHkoJ25hbWUnKSA/aGVscGVycy5maWVsZC5uYW1lICA6ICd2YWx1ZSc7XG5cdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBoZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWxwZXJzICE9PSBudWxsICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSAmJiBoZWxwZXJzLmRlZmF1bHQpIHtcblx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyk7XG5cdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBoZWxwZXJzLnBsYWNlaG9sZGVyO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdHZhciBsaWIgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsaWIubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbGliW2ldW3ZhbHVlRmllbGROYW1lXSk7XG5cdFx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGxpYltpXVtsYWJlbEZpZWxkTmFtZV07XG5cdFx0XHRcdGlmIChoZWxwZXJzLmZpZWxkLmFycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXS5pbmRleE9mKGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pID4gLTEpIHtcblx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0gPT09IGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pIHtcblx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5leHBvcnQgZGVmYXVsdCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWI7XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCA9ICdmb3JtXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfRk9STV9USVRMRSA9ICdGb3JtIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge1xuXG5cdH07XG5cbmNsYXNzIG5vdEZvcm0gZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhpbnB1dC5vcHRpb25zIHx8IHt9KTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygncHJlZml4JywgT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgpO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0Y29tcG9uZW50czogW11cblx0XHR9KTtcblx0XHRsZXQgZGF0YSA9IGlucHV0LmRhdGEgfHwge307XG5cdFx0aWYgKCFkYXRhLmlzUmVjb3JkKSB7XG5cblx0XHRcdGRhdGEgPSBuZXcgbm90UmVjb3JkKHt9LCBkYXRhKTtcblx0XHR9XG5cdFx0dGhpcy5zZXREYXRhKGRhdGEpO1xuXHRcdHRoaXMub24oJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbigncmVzZXQnLCB0aGlzLm9uUmVzZXQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2FuY2VsJywgdGhpcy5vbkNhbmNlbC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCk7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKCkge1xuXHRcdGxldCBtYW5pZmVzdCA9IHRoaXMuZ2V0TWFuaWZlc3QoKTtcblx0XHRpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QuYWN0aW9ucykge1xuXHRcdFx0cmV0dXJuIG1hbmlmZXN0LmFjdGlvbnMuaGFzT3duUHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKSkgPyBtYW5pZmVzdC5hY3Rpb25zW3RoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJyldIDogbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Rm9ybUZpZWxkc0xpc3QoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKSxcblx0XHRcdGxpc3QgPSBbXSxcblx0XHRcdHJvbGUgPSB0aGlzLmdldE9wdGlvbnMoJ3JvbGUnLCBPUFRfREVGQVVMVF9ST0xFX05BTUUpO1xuXHRcdGlmIChhY3Rpb25EYXRhKSB7XG5cblx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcykge1xuXHRcdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMuaGFzT3duUHJvcGVydHkocm9sZSkpIHtcblx0XHRcdFx0XHRsaXN0ID0gYWN0aW9uRGF0YS5maWVsZHNbcm9sZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHQvKlxuXHRcdFJlbmRlcmluZ1xuXHQqL1xuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0fVxuXG5cdGdldFBhcnRUZW1wbGF0ZU5hbWUoZm9ybVBhcnQpe1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgZm9ybVBhcnQ7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBpbnB1dCA9IHtcblx0XHRcdFx0ZGF0YTogdGhpcy5nZXRXcmFwcGVyRGF0YSgpLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZSgnd3JhcHBlcicpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdGlkOiB0aGlzLmdldE9wdGlvbnMoJ2lkJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbWydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fTtcblxuXHRcdFx0bGV0IHdyYXBwZXIgPSBuZXcgbm90Q29tcG9uZW50KGlucHV0KTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnd3JhcHBlcicsIHdyYXBwZXIpO1xuXHRcdH1cblx0fVxuXG5cdGdldFdyYXBwZXJEYXRhKCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiBhY3Rpb25EYXRhLnRpdGxlID8gYWN0aW9uRGF0YS50aXRsZSA6IE9QVF9ERUZBVUxUX0ZPUk1fVElUTEVcblx0XHR9O1xuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpIHtcblxuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KClbdF07XG5cdFx0XHRcdHRoaXMuYWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGVhckZpZWxkc0NvbXBvbmVudHMoKSB7XG5cdFx0bGV0IGNvbXBzID0gdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJyk7XG5cdFx0d2hpbGUgKGNvbXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbXBzWzBdLmNvbXBvbmVudC5kZXN0cm95KCk7XG5cdFx0XHRjb21wcy5zcGxpY2UoMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpIHtcblx0XHRsZXQgZGVmID0gT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTjtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpIHtcblx0XHRcdGRlZiA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJylbZmllbGROYW1lXTtcblx0XHR9XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSkge1xuXHRcdGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKTtcblxuXHRcdGxldCByZWMgPSB7XG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRuYW1lOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHRpdGxlOiBmaWVsZFR5cGUubGFiZWwgfHwgZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHR0eXBlOiBmaWVsZFR5cGUudHlwZSxcblx0XHRcdFx0bGFiZWw6IGZpZWxkVHlwZS5sYWJlbCxcblx0XHRcdFx0YXJyYXk6IGZpZWxkVHlwZS5hcnJheSxcblx0XHRcdFx0ZGVmYXVsdDogZmllbGRUeXBlLmRlZmF1bHQsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ2hlbHBlcnMnLCdsaWJzJyxmaWVsZE5hbWUpKVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoZmllbGRUeXBlLnR5cGUpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRoZWxwZXJzOiB7XG5cdFx0XHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKT0+e1xuXHRcdFx0XHRcdFx0cmV0dXJuIHBhcmFtcy5pdGVtLnZhbHVlID09PSB0aGlzLmdldERhdGEoZmllbGROYW1lKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGZpZWxkOiByZWMuZmllbGQsXG5cdFx0XHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHRcdFx0bGliczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnKSlcblx0XHRcdFx0fSxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0Rm9ybUJvZHlFbGVtZW50KCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCcsXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlckRhdGFDaGFuZ2UnLCB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMocGFyYW1zKXtcblx0XHRub3RDb21tb24ubG9nKCdjb2xsZWN0IGRhdGEgZnJvbSBjb21wb25lbnRzJywgcGFyYW1zKTtcblx0fVxuXG5cdGdldEZvcm1Cb2R5RWxlbWVudCgpe1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCJib2R5XCJdJyk7XG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdGNvbGxlY3REYXRhKCkge1xuXG5cdH1cblxuXHQvKlxuXHRcdEV2ZW50IGhhbmRsZXJzXG5cdCovXG5cblx0b25TdWJtaXQoKSB7XG5cblx0fVxuXG5cdG9uUmVzZXQoKSB7XG5cblx0fVxuXG5cdG9uQ2FuY2VsKCkge1xuXG5cdH1cblxuXHRnZXRGaWVsZHMoKSB7XG5cblx0fVxuXG5cdGFkZEZpZWxkKCkge1xuXG5cdH1cblxuXHRyZW1vdmVGaWVsZCgpIHtcblxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEZvcm07XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50ICBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RUYWJsZSBleHRlbmRzIG5vdENvbXBvbmVudHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jbGFzcyBub3RWaWV3IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoaW5wdXQub3B0aW9ucyB8fCB7fSk7XG5cdFx0dGhpcy5zZXREYXRhKGlucHV0LmRhdGEgfHwge30pO1xuXHRcdHRoaXMuc2V0V29ya2luZyhpbnB1dC53b3JraW5nIHx8IHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFZpZXc7XG4iLCIvKlxuXHRDb21tb24gZnVuY3Rpb25zXG4qL1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG4vKlxuXHRmcmFtZXdvcmsgd2lkZSBwYXJzZXIgZm9yIGRhdGEgYWNjZXNzXG4qL1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcblxuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG4vKlxuXHRiYXNpYyBldmVudCBoYW5kbGVycyBhbmQgY29yZSBkYXRhIG1vZGlmaWVyc1xuKi9cbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG4vKlxuXHRzbWFydGVyIGltYWdlIGNvbnRyb2xcbiovXG5pbXBvcnQgbm90SW1hZ2UgZnJvbSAnLi90ZW1wbGF0ZS9ub3RJbWFnZSc7XG4vKlxuXHRhcHBsaWNhdGlvbiBtYWluIGluZnJhc3RydWN0dXJlIHNldHRlclxuKi9cbmltcG9ydCBub3RBcHAgZnJvbSAnLi9ub3RBcHAnO1xuLypcblx0ZGFkZHkgZm9yIHVzZXIgY29udHJvbGxlcnNcbiovXG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuL25vdENvbnRyb2xsZXInO1xuLypcblx0dGVtcGxhdGluZyBhbmQgY29tbW9uIHN0cnVjdHVyZXNcbiovXG5cbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL3RlbXBsYXRlL25vdFJlbmRlcmVyJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7IC8vIHNtYXJ0ZXIgd2l0aCBiaW5kaW5ncyBmb3IgZXZlbnRzLCBhY3R1YWx5IHByb3h5XG5cbmltcG9ydCBub3RGb3JtIGZyb20gJy4vY29tcG9uZW50cy9ub3RGb3JtJztcbmltcG9ydCBub3RUYWJsZSBmcm9tICcuL2NvbXBvbmVudHMvbm90VGFibGUnO1xuaW1wb3J0IG5vdFZpZXcgZnJvbSAnLi9jb21wb25lbnRzL25vdFZpZXcnO1xuXG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJzsgLy9cdGhvdyB0byBpbnRlcmFjdCB3aXRoIGRhdGEgb24gc2VydmVyXG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJzsgLy9cdHdyYXBwZXIgZm9yIGRhdGEgd2l0aCBzZXJ2ZXI8LT52aWV3IGxpdmUgaW50ZXJhY3Rpb25zXG5cbm5vdFRlbXBsYXRlUHJvY2Vzc29ycy5hZGQobm90VGVtcGxhdGVQcm9jZXNzb3JzTGliKTtcblxuZXhwb3J0IHtcblx0bm90Q29tbW9uLFxuXHRub3RQYXRoLFxuXHRub3RCYXNlLFxuXHRub3RJbWFnZSxcblx0bm90QXBwLFxuXHRub3RBUEksXG5cdG5vdENvbnRyb2xsZXIsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29ycyxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLFxuXHRub3RUZW1wbGF0ZUNhY2hlLFxuXHRub3RSZW5kZXJlcixcblx0bm90Q29tcG9uZW50LFxuXHRub3RGb3JtLFxuXHRub3RUYWJsZSxcblx0bm90Vmlldyxcblx0bm90UmVjb3JkLFxuXHRub3RSZWNvcmRJbnRlcmZhY2Vcbn07XG4iXSwibmFtZXMiOlsiQ29tbW9uTmV0d29yayIsInVyaSIsImdldCIsImRhdGFBcnJheSIsImZpZWxkcyIsImkiLCJmIiwiaGFzT3duUHJvcGVydHkiLCJpbWFnZSIsIkltYWdlIiwic2V0QXR0cmlidXRlIiwic3JjIiwiaW5kZXhPZiIsImFkZFByb3RvY29sIiwibWV0aG9kIiwidXJsIiwiZGF0YSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsImdldFNlc3Npb25JRCIsInJlc3BvbnNlVHlwZSIsIndpdGhDcmVkZW50aWFscyIsIm9ubG9hZCIsInN0YXR1cyIsInJlc3BvbnNlIiwidCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhcnNlSW50IiwicmVzcG9uc2VUZXh0IiwiZSIsIkNvbW1vbkxvZ3MiLCJsb2ciLCJhcmd1bWVudHMiLCJlcnJvciIsInRyYWNlIiwiTUFQX01BTkFHRVIiLCJTeW1ib2wiLCJDb21tb25TaG9ydHMiLCJnZXRNYW5hZ2VyIiwiZ2V0QVBJIiwidiIsIkNvbW1vbk9iamVjdHMiLCJkZWZhdWx0cyIsIm9wdGlvbnMiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0Iiwic291cmNlcyIsImZvckVhY2giLCJkZXNjcmlwdG9ycyIsImtleXMiLCJzb3VyY2UiLCJyZWR1Y2UiLCJrZXkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJkZXNjcmlwdG9yIiwic3ltIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJiaWciLCJzbWFsbCIsIm9iaiIsImZpbHRlciIsImNvbnRhaW5zT2JqIiwiaWNvbnMiLCJiYXRjaCIsImxlbmd0aCIsImdldERhdGEiLCJwdXNoIiwiYSIsImIiLCJwIiwiZXF1YWwiLCJ0b1N0cmluZyIsImRlZmF1bHRWYWx1ZSIsIm9iajEiLCJvYmoyIiwialF1ZXJ5IiwiZXh0ZW5kIiwidmFsIiwicmVnaXN0cnkiLCJDb21tb25TdHJpbmdzIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIkNvbW1vbkFwcCIsInN0YXJ0ZXIiLCJhZGRFdmVudExpc3RlbmVyIiwibm90Q29tbW9uIiwiYXNzaWduIiwiZXh0ZW5kV2l0aCIsIlNVQl9QQVRIX1NUQVJUIiwiU1VCX1BBVEhfRU5EIiwiUEFUSF9TUExJVCIsIlBBVEhfU1RBUlRfT0JKRUNUIiwiUEFUSF9TVEFSVF9IRUxQRVJTIiwiRlVOQ1RJT05fTUFSS0VSIiwiTUFYX0RFRVAiLCJub3RQYXRoIiwicGF0aCIsInN1YlBhdGgiLCJmaW5kIiwic3ViIiwicGFyc2VkIiwic3ViZiIsInJlcGxhY2UiLCJpdGVtIiwiaGVscGVycyIsInN1YlBhdGhQYXJzZWQiLCJmaW5kTmV4dFN1YlBhdGgiLCJnZXRWYWx1ZUJ5UGF0aCIsInJlcGxhY2VTdWJQYXRoIiwicGFyc2VTdWJzIiwiYXR0clZhbHVlIiwic2V0VmFsdWVCeVBhdGgiLCJpc1JlY29yZCIsIm5vcm1pbGl6ZVBhdGgiLCJ0cmlnZ2VyIiwic2V0Iiwic3RlcCIsImhlbHBlciIsInJTdGVwIiwidW5kZWZpbmVkIiwiQXJyYXkiLCJpc0FycmF5Iiwic3BsaXQiLCJwYXJzZVBhdGhTdGVwIiwib2JqZWN0IiwiYXR0clBhdGgiLCJhdHRyTmFtZSIsInNoaWZ0IiwiaXNGdW5jdGlvbiIsIm5ld09iaiIsImFyZ3MiLCJqb2luIiwiTUVUQV9FVkVOVFMiLCJNRVRBX0RBVEEiLCJNRVRBX1dPUktJTkciLCJNRVRBX09QVElPTlMiLCJub3RCYXNlIiwid2hhdCIsInJlcyIsInNldENvbW1vbiIsImdldENvbW1vbiIsImdldE9wdGlvbnMiLCJnZXRXb3JraW5nIiwiZXZlbnROYW1lcyIsImV2ZW50Q2FsbGJhY2tzIiwib25jZSIsImRlZmluZUlmTm90RXhpc3RzIiwibmFtZSIsImZyb20iLCJldmVudE5hbWUiLCJldmVudCIsIm9mZiIsImNhbGxiYWNrcyIsImNhbGxiYWNrIiwidGFyZ2V0SWQiLCJzcGxpY2UiLCJub3RBUElPcHRpb25zIiwibm90QVBJUXVlZSIsInJlcXVlc3RzUGVyU2Vjb25kIiwicXVlZSIsImludCIsIndpbmRvdyIsInNldEludGVydmFsIiwiY2hlY2siLCJiaW5kIiwiaW5Qcm9ncmVzcyIsInRvQ2FsbCIsImNsZWFySW50ZXJ2YWwiLCJydW4iLCJub3RBUEkiLCJzZXRPcHRpb25zIiwicGFydHMiLCJpZCIsImdvb2QiLCJiYWQiLCJhZGQiLCJtYWtlUmVxdWVzdCIsInJlc3BvbnNlT0siLCJyZXNwb25zZUZhaWxlZCIsInJlcXVlc3RKU09OIiwidGhlbiIsIm5leHQiLCJjYXRjaCIsImNvZGUiLCJnZXRJZCIsIm1vZGVsTmFtZSIsImdldE1vZGVsTmFtZSIsIm1ha2VVcmwiLCJnZXRKU09OIiwiZ2V0TW9kZWwiLCJzZXRQcmljZSIsIm1vZGVsIiwibm90SW1hZ2UiLCJub3RJbnRlcmZhY2UiLCJtYW5pZmVzdCIsImxpbmUiLCJyZWNvcmQiLCJhY3Rpb25OYW1lIiwicmVjb3JkUkUiLCJmaWVsZE5hbWUiLCJpbmQiLCJsZW4iLCJpbmQyIiwic3RhcnRTbGljZSIsImVuZFNsaWNlIiwiZ2V0QXR0ciIsImFjdGlvbkRhdGEiLCJwYXJzZUxpbmUiLCJwb3N0Rml4IiwiZ2V0QWN0aW9ucyIsImFjdGlvbnMiLCJ2YWx1ZSIsInNldEZpbHRlciIsImZpbHRlckRhdGEiLCJzZXRNb2RlbFBhcmFtIiwiZ2V0TW9kZWxQYXJhbSIsInNvcnRlckRhdGEiLCJwYWdlTnVtYmVyIiwicGFnZVNpemUiLCJwYXJhbU5hbWUiLCJwYXJhbVZhbHVlIiwiZ2V0QWN0aW9uRGF0YSIsImdldFVSTCIsInF1ZWVSZXF1ZXN0Iiwib25Mb2FkIiwibm90UmVjb3JkIiwiTUVUQV9JTlRFUkZBQ0UiLCJNRVRBX1BST1hZIiwiTUVUQV9DSEFOR0UiLCJNRVRBX0NIQU5HRV9ORVNURUQiLCJNRVRBX1NBTCIsIkRFRkFVTFRfQUNUSU9OX1BSRUZJWCIsIkRFRkFVTFRfUEFHRV9OVU1CRVIiLCJERUZBVUxUX1BBR0VfU0laRSIsIk1FVEFfUkVUVVJOX1RPX1JPT1QiLCJjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzIiwib3duZXIiLCJjb250ZXh0IiwicmVzVGFyZ2V0IiwiUmVmbGVjdCIsIkVycm9yIiwidmFsdWVUb1JlZmxlY3QiLCJub3RQcm9wZXJ0eSIsImdldFJvb3QiLCJwYXRoVG8iLCJpc1Byb3h5IiwiaXNQcm9wZXJ0eSIsIlByb3h5Iiwic2V0RGF0YSIsIm9uIiwicHJveHkiLCJyb290IiwiY3JlYXRlUmVjb3JkSGFuZGxlcnMiLCJjcmVhdGVDb2xsZWN0aW9uIiwibm90UmVjb3JkSW50ZXJmYWNlIiwiaW5pdFByb3BlcnRpZXMiLCJpbnRlcmZhY2VVcCIsImN1clBhdGgiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiaXRlbXMiLCJjb2xsZWN0aW9uIiwiZ2V0QWN0aW9uc0NvdW50IiwiYWN0aW9uVXAiLCJpbmRleCIsInJlcXVlc3QiLCJvYmplY3RQYXJ0Iiwic2V0QXR0ciIsIm5vdEZvcm1GYWN0b3J5IiwiYXBwIiwic2V0V29ya2luZyIsInJlbmRlcldyYXBwZXIiLCJyZW5kZXJDb21wb25lbnRzIiwiT1BUX0NPTlRST0xMRVJfUFJFRklYIiwiT1BUX1JFQ09SRF9QUkVGSVgiLCJub3RBcHAiLCJub3RNYW5pZmVzdCIsInJlc291cmNlcyIsImluaXQiLCJzdWNjZXNzIiwic2V0SW50ZXJmYWNlTWFuaWZlc3QiLCJyZXBvcnQiLCJ1cGRhdGUiLCJ1cGRhdGVJbnRlcmZhY2VzIiwiaW5pdEZvcm1CdWlsZGVycyIsImluaXRDb250cm9sbGVyIiwiYWxsUmVzb3VyY2VzUmVhZHkiLCJzdGFydEFwcCIsImluaXRSb3V0ZXIiLCJjb250cm9sbGVyTmFtZSIsInJvdXRpZUlucHV0Iiwicm91dGUiLCJiaW5kQ29udHJvbGxlciIsInJvdXRpZSIsImN0cmwiLCJjbGVhckludGVyZmFjZXMiLCJtYW5pZmVzdHMiLCJyZWNvcmRNYW5pZmVzdCIsInJlY29yZERhdGEiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJjbGVhckZvcm1CdWlsZGVycyIsImZvcm1zIiwiaW5pdEZvcm1CdWlsZGVyIiwidHlwZSIsIm9uUmVzb3VyY2VSZWFkeSIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCIsIlRFTVBMQVRFX1RBRyIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYIiwiQ09NUE9ORU5UX0lEX1BSRUZJWCIsIlBBUlRfSURfUFJFRklYIiwiREVGQVVMVF9QTEFDRVIiLCJERUZBVUxUX1BMQUNFUl9MT09QIiwiT1BUUyIsIk1FVEFfQ0FDSEUiLCJub3RUZW1wbGF0ZUNhY2hlIiwiaGlkZVRlbXBsYXRlcyIsInJlZ2lzdGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibWFwIiwibG9hZE9uZSIsIm9SZXF1ZXN0IiwiZGl2IiwiZGF0YXNldCIsIm5vdFRlbXBsYXRlTmFtZSIsIm5vdFRlbXBsYXRlVVJMIiwic3JjRWxlbWVudCIsInNldE9uZSIsImVsZW1lbnQiLCJjbG9uZU5vZGUiLCJjb250IiwidGV4dCIsIm5vdFRlbXBsYXRlc0VsZW1lbnRzIiwiZWxJZCIsInBhcmVudE5vZGUiLCJsaWIiLCJnZXRIVE1MIiwidGVtcGxhdGVJbm5lckhUTUwiLCJ0ZW1wbGF0ZUNvbnRFbCIsIndyYXAiLCJ0ZW1wbGF0ZXNIVE1MIiwidGVtcGxhdGVzIiwicGFyc2VMaWIiLCJhZGRMaWIiLCJzZWxlY3Rvck9yRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0YWdOYW1lIiwiTUVUQV9QUk9DRVNTT1JTIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzIiwic2V0UHJvY2Vzc29yIiwiZ2V0UHJvY2Vzc29yIiwiTUVUQV9DT01QT05FTlRTIiwibm90UmVuZGVyZXIiLCJpbnB1dCIsInJlbmRlciIsImNvbXBvbmVudCIsImluaXREYXRhIiwiaW5pdE9wdGlvbnMiLCJpbml0V29ya2luZyIsInRlbXBsYXRlIiwiaW5pdFRlbXBsYXRlIiwib25DaGFuZ2UiLCJNYXRoIiwicmFuZG9tIiwiZ2V0QnJlYWRDcnVtcHMiLCJjbGVhclN0YXNoIiwic2V0V29ya2luZ01hcHBpbmciLCJleGVjUHJvY2Vzc29ycyIsInNlYXJjaEZvclN1YlRlbXBsYXRlcyIsInN0YXNoUmVuZGVyZWQiLCJpZlBhcnQiLCJjb21wb25lbnRQYXRoIiwiY2hhbmdlZFBhdGgiLCJpZkZ1bGxTdWJQYXRoIiwiY3JlYXRlTWFwcGluZyIsImZpbmRBbGxQcm9jZXNzb3JzIiwicHJvY3MiLCJlbHMiLCJnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCIsImdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQiLCJwcm9jRGF0YSIsInBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbiIsInByb2Nlc3NvckV4cHJlc3Npb24iLCJhdHRyaWJ1dGVFeHByZXNzaW9uIiwiaWZDb25kaXRpb24iLCJwYXJhbXMiLCJwcm9jZXNzb3JOYW1lIiwibWFwcGluZyIsInByb2NTY29wZSIsImF0dHJpYnV0ZVJlc3VsdCIsImdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQiLCJwcm9jTmFtZSIsInByb2MiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkZXN0cm95U3VicyIsImRlc3Ryb3kiLCJjbGVhclN1YlRlbXBsYXRlcyIsImdldFN0YXNoIiwicmVtb3ZlQ2hpbGQiLCJudEVsIiwibnRSZW5kZXJlZCIsInN1YnMiLCJudCIsImlmU3ViRWxlbWVudFJlbmRlcmVkIiwicmVuZGVyU3ViIiwiZGV0YWlscyIsImRhdGFQYXRoIiwibm90Q29tcG9uZW50IiwiY2hpbGROb2RlcyIsImFkZFRvU3Rhc2giLCJzdGFzaCIsIm5ld1N0YXNoIiwiYW5jaG9yIiwibmV4dFNpYmxpbmciLCJpbnNlcnRCZWZvcmUiLCJub2RlIiwicGxhY2UiLCJ0YXJnZXRFbCIsImwiLCJjaGlsZHJlbiIsInJlbmRlcmVkIiwicGxhY2VBZnRlciIsInBsYWNlQmVmb3JlIiwicGxhY2VGaXJzdCIsInBsYWNlTGFzdCIsIm5vdFBsYWNlcnMiLCJNRVRBX1BBUlRTIiwicmVzZXRQYXJ0cyIsImluaXRFdmVudHMiLCJldmVudHMiLCJwcmVwYXJlVGVtcGxhdGVFbGVtZW50IiwiaW5pdE1hcmtFbGVtZW50IiwibWFya0VsIiwicGxhY2VyIiwiZ2V0UGxhY2VyIiwibWFpbiIsInVuc2V0UmVhZHkiLCJodG1sIiwic2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJhZGRGcm9tVVJMIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJjbGVhclBhcnRzIiwiZm9yRWFjaERhdGEiLCJyZW5kZXJQYXJ0IiwicGxhY2VSZW5kZXJlZCIsInJlbW92ZU9ic29sZXRlUGFydHMiLCJiZWZvcmUiLCJwbGFjZVBhcnQiLCJhZnRlciIsInBhcnQiLCJnZXRQYXJ0QnlEYXRhIiwibm9kZXMiLCJsYXN0Tm9kZSIsIm5vZGVUeXBlIiwiZ2V0UGFydHMiLCJyZW5kZXJlciIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUiLCJhZGRQYXJ0IiwidXBkYXRlUGFydCIsInBpcGUiLCJmaW5kQWN0dWFsUGFydHMiLCJyZW1vdmVOb3RBY3R1YWxQYXJ0cyIsImFjdHVhbFBhcnRzIiwiaXNEYXRhIiwiT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SIiwiT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCIsIk9QVF9ERUZBVUxUX1ZJRVdfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCIsIk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FIiwiT1BUX0RFRkFVTFRfU0lOR0xFX05BTUUiLCJPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9BTkQiLCJub3RDb250cm9sbGVyIiwiaW5pdFJlbmRlciIsImludGVyZmFjZXMiLCJnZXRJbnRlcmZhY2VzIiwibWFrZSIsInZpZXdOYW1lIiwidmlldyIsImdldFZpZXciLCJ0YXJnZXRRdWVyeSIsInRlbXBsYXRlVVJMIiwicHJlZml4IiwiY29tbW9uIiwiZ2V0TW9kdWxlUHJlZml4IiwicG9zdGZpeCIsInRlbXBsYXRlTmFtZSIsInJlbmRlckFuZCIsInZpZXdzIiwiZ2V0TW9kdWxlTmFtZSIsIm5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiIsInNjb3BlIiwidGV4dENvbnRlbnQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImxpdmVFdmVudHMiLCJvbkV2ZW50IiwiY2hlY2tlZCIsImZpZWxkIiwic2VsZWN0ZWQiLCJzZWxlY3RlZE9wdGlvbnMiLCJwcm9jZXNzZWRWYWx1ZSIsImlzTmFOIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidXNlZCIsIm9wdGlvbiIsInZhbHVlRmllbGROYW1lIiwibGFiZWxGaWVsZE5hbWUiLCJpdGVtVmFsdWVGaWVsZE5hbWUiLCJkZWZhdWx0IiwicGxhY2Vob2xkZXIiLCJhcnJheSIsIk9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYIiwiT1BUX0RFRkFVTFRfUk9MRV9OQU1FIiwiT1BUX0RFRkFVTFRfRk9STV9USVRMRSIsIk9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04iLCJub3RGb3JtIiwib25TdWJtaXQiLCJvblJlc2V0Iiwib25DYW5jZWwiLCJnZXRNYW5pZmVzdCIsInJvbGUiLCJmb3JtUGFydCIsImdldFdyYXBwZXJEYXRhIiwiZ2V0UGFydFRlbXBsYXRlTmFtZSIsIndyYXBwZXIiLCJ0aXRsZSIsImdldEZvcm1GaWVsZHNMaXN0IiwiYWRkRmllbGRDb21wb25lbnQiLCJjb21wcyIsImRlZiIsImZpZWxkVHlwZSIsImdldEZpZWxkc0RlZmluaXRpb24iLCJyZWMiLCJsYWJlbCIsImdldEZvcm1Cb2R5RWxlbWVudCIsImNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMiLCJub3RUYWJsZSIsIm5vdFZpZXciLCJ3b3JraW5nIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxnQkFBZ0I7VUFDVixpQkFBU0MsR0FBVCxFQUFhO1NBQ2QsS0FBS0MsR0FBTCxDQUFTLE1BQVQsSUFBbUJELEdBQTFCO0VBRmtCO2NBSU4scUJBQVNBLEdBQVQsRUFBYTtTQUNsQixLQUFLQyxHQUFMLENBQVMsVUFBVCxJQUF1QkQsR0FBOUI7RUFMa0I7Z0JBT0osdUJBQVNFLFNBQVQsRUFBb0JDLE1BQXBCLEVBQTRCO09BQ3RDLElBQUlDLENBQVIsSUFBYUYsU0FBYixFQUF3QjtRQUNuQixJQUFJRyxDQUFSLElBQWFGLE1BQWIsRUFBcUI7UUFDakJELFVBQVVFLENBQVYsRUFBYUUsY0FBYixDQUE0QkgsT0FBT0UsQ0FBUCxDQUE1QixDQUFILEVBQTJDO1NBQ3RDRSxRQUFRLElBQUlDLEtBQUosRUFBWjtXQUNNQyxZQUFOLENBQW1CLGFBQW5CLEVBQWtDLFdBQWxDO1dBQ01DLEdBQU4sR0FBWVIsVUFBVUUsQ0FBVixFQUFhRCxPQUFPRSxDQUFQLENBQWIsRUFBd0JNLE9BQXhCLENBQWdDLElBQWhDLE1BQTBDLENBQTFDLEdBQThDLEtBQUtDLFdBQUwsQ0FBaUJWLFVBQVVFLENBQVYsRUFBYUQsT0FBT0UsQ0FBUCxDQUFiLENBQWpCLENBQTlDLEdBQTBGSCxVQUFVRSxDQUFWLEVBQWFELE9BQU9FLENBQVAsQ0FBYixDQUF0Rzs7OztFQWJlO2NBa0JOLHFCQUFTUSxNQUFULEVBQWlCQyxHQUFqQixFQUFzQkMsSUFBdEIsRUFBMkI7OztTQUNoQyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO09BQ25DQyxNQUFNLElBQUlDLGNBQUos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
