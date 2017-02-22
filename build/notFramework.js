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
notCommon.extendWith(CommonShorts);
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
			var result = [];
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
				if (Object.keys(target).indexOf(key) === -1 && (Object.keys(this).indexOf(key) > -1 || META_SAL.indexOf(key) > -1)) {
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
		if (item && item.isProxy) {
			var _ret2;

			//notCommon.error('this is Proxy property');
			return _ret2 = item, possibleConstructorReturn(_this, _ret2);
		}
		_this.setOptions({
			getRoot: getRoot,
			path: pathTo
		});
		_this[META_PROXY] = new Proxy(item, createPropertyHandlers(_this));
		//notCommon.log('property proxy property created from', item);
		_this.setData(item);
		_this.on('change', _this.returnToRoot.bind(_this));
		return _ret3 = _this[META_PROXY], possibleConstructorReturn(_this, _ret3);
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

		if (item && item.isRecord) {
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
		var result = notPath$1.get(scope.attributeExpression, item, helpers);
		scope.element.setAttribute(scope.params[0], result);
	},
	name: function name(scope, item, helpers) {
		scope.element.setAttribute('name', notPath$1.get(scope.attributeExpression, item, helpers));
	},
	change: function change() /*scope, item, helpers*/{},
	checked: function checked(scope /*, item, helpers*/) {
		scope.attributeResult ? scope.element.setAttribute('checked', true) : scope.element.removeAttribute('checked');
	},
	class: function _class(scope, item, helpers) {
		var res = notPath$1.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = typeof res === 'function' ? res({ scope: scope, item: item, helpers: helpers }) : res;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9pbmRleC5qcyIsIi4uL3NyYy9ub3RQYXRoLmpzIiwiLi4vc3JjL25vdEJhc2UuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy9ub3RSZWNvcmRJbnRlcmZhY2UuanMiLCIuLi9zcmMvbm90UmVjb3JkLmpzIiwiLi4vc3JjL3RlbXBsYXRlL29wdGlvbnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90UmVuZGVyZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlQWZ0ZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUJlZm9yZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlRmlyc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUxhc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9yZXBsYWNlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvaW5kZXguanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90Q29tcG9uZW50LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybUZhY3RvcnkuanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RWaWV3LmpzIiwiLi4vc3JjL25vdENvbnRyb2xsZXIuanMiLCIuLi9zcmMvbm90QXBwLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdEZvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29tbW9uTmV0d29yayA9IHtcblx0YWRkSG9zdDogZnVuY3Rpb24odXJpKXtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ2hvc3QnKSArIHVyaTtcblx0fSxcblx0YWRkUHJvdG9jb2w6IGZ1bmN0aW9uKHVyaSl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvcih2YXIgaSBpbiBkYXRhQXJyYXkpIHtcblx0XHRcdGZvcih2YXIgZiBpbiBmaWVsZHMpIHtcblx0XHRcdFx0aWYoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRsZXQgdGhhdCA9IHRoaXM7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUFVUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldFNlc3Npb25JRDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9LFxufTtcbmV4cG9ydCBkZWZhdWx0IENvbW1vbk5ldHdvcms7XG4iLCJ2YXIgQ29tbW9uTG9ncyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fSxcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHRyYWNlOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFQX01BTkFHRVIgPSBTeW1ib2woJ01BUF9NQU5BR0VSJyk7XG5cbnZhciBDb21tb25TaG9ydHMgPSB7XG5cdGdldEFQSTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TWFuYWdlcigpLmdldEFQSSgpO1xuXHR9LFxuXHRzZXRNYW5hZ2VyOiBmdW5jdGlvbih2KSB7XG5cdFx0dGhpc1tNQVBfTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQVBfTUFOQUdFUl07XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25TaG9ydHM7XG4iLCIvKiBnbG9iYWwgalF1ZXJ5ICovXG52YXIgQ29tbW9uT2JqZWN0cyA9IHtcblx0ZXh0ZW5kOiBmdW5jdGlvbihkZWZhdWx0cywgb3B0aW9ucykge1xuXHRcdHZhciBleHRlbmRlZCA9IHt9O1xuXHRcdHZhciBwcm9wO1xuXHRcdGZvciAocHJvcCBpbiBkZWZhdWx0cykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkZWZhdWx0cywgcHJvcCkpIHtcblx0XHRcdFx0ZXh0ZW5kZWRbcHJvcF0gPSBkZWZhdWx0c1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChwcm9wIGluIG9wdGlvbnMpIHtcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywgcHJvcCkpIHtcblx0XHRcdFx0ZXh0ZW5kZWRbcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZXh0ZW5kZWQ7XG5cdH0sXG5cdGNvbXBsZXRlQXNzaWduOiBmdW5jdGlvbih0YXJnZXQsIC4uLnNvdXJjZXMpIHtcblx0XHRzb3VyY2VzLmZvckVhY2goc291cmNlID0+IHtcblx0XHRcdGxldCBkZXNjcmlwdG9ycyA9IE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKChkZXNjcmlwdG9ycywga2V5KSA9PiB7XG5cdFx0XHRcdGRlc2NyaXB0b3JzW2tleV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KTtcblx0XHRcdFx0cmV0dXJuIGRlc2NyaXB0b3JzO1xuXHRcdFx0fSwge30pO1xuXHRcdFx0Ly8gYnkgZGVmYXVsdCwgT2JqZWN0LmFzc2lnbiBjb3BpZXMgZW51bWVyYWJsZSBTeW1ib2xzIHRvb1xuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZvckVhY2goc3ltID0+IHtcblx0XHRcdFx0bGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKTtcblx0XHRcdFx0aWYgKGRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuXHRcdFx0XHRcdGRlc2NyaXB0b3JzW3N5bV0gPSBkZXNjcmlwdG9yO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgZGVzY3JpcHRvcnMpO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH0sXG5cdGV4dGVuZFdpdGg6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRcdGZvciAobGV0IHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcblx0XHRcdFx0dGhpc1twcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGNvbnRhaW5zT2JqOiBmdW5jdGlvbihiaWcsIHNtYWxsKSB7XG5cdFx0Zm9yICh2YXIgdCBpbiBzbWFsbCkge1xuXHRcdFx0aWYgKHNtYWxsLmhhc093blByb3BlcnR5KHQpKSB7XG5cdFx0XHRcdGlmICgoIWJpZy5oYXNPd25Qcm9wZXJ0eSh0KSkgfHwgKGJpZ1t0XSAhPT0gc21hbGxbdF0pKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRmaWx0ZXI6IGZ1bmN0aW9uKG9iaiwgZmlsdGVyKSB7XG5cdFx0aWYgKGZpbHRlciAmJiBvYmopIHtcblx0XHRcdHJldHVybiB0aGlzLmNvbnRhaW5zT2JqKG9iaiwgZmlsdGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbmRJY29uQnlGaWx0ZXI6IGZ1bmN0aW9uKGljb25zLCBmaWx0ZXIpIHtcblx0XHR2YXIgYmF0Y2ggPSBbXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGljb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5maWx0ZXIoaWNvbnNbaV0uZ2V0RGF0YSgpLCBmaWx0ZXIpKSB7XG5cdFx0XHRcdGJhdGNoLnB1c2goaWNvbnNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYmF0Y2g7XG5cdH0sXG5cdGVxdWFsT2JqOiBmdW5jdGlvbihhLCBiKSB7XG5cdFx0dmFyIHA7XG5cdFx0Zm9yIChwIGluIGEpIHtcblx0XHRcdGlmICh0eXBlb2YoYltwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKGFbcF0pIHtcblx0XHRcdFx0c3dpdGNoICh0eXBlb2YoYVtwXSkpIHtcblx0XHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2FzZSAnZnVuY3Rpb24nOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YoYltwXSkgPT0gJ3VuZGVmaW5lZCcgfHxcblx0XHRcdFx0XHRcdFx0KHAgIT0gJ2VxdWFscycgJiYgYVtwXS50b1N0cmluZygpICE9IGJbcF0udG9TdHJpbmcoKSkpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChhW3BdICE9IGJbcF0pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGJbcF0pXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAocCBpbiBiKSB7XG5cdFx0XHRpZiAodHlwZW9mKGFbcF0pID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGRlZmluZUlmTm90RXhpc3RzOiBmdW5jdGlvbihvYmosIGtleSwgZGVmYXVsdFZhbHVlKSB7XG5cdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0b2JqW2tleV0gPSBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9LFxuXHRkZWVwTWVyZ2U6IGZ1bmN0aW9uKG9iajEsIG9iajIpIHtcblx0XHRyZXR1cm4galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgb2JqMSwgb2JqMik7XG5cdH0sXG5cblx0cmVnaXN0cnk6IHt9LFxuXHRyZWdpc3RlcjogZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0XHR0aGlzLnJlZ2lzdHJ5W2tleV0gPSB2YWw7XG5cdH0sXG5cblx0Z2V0OiBmdW5jdGlvbihrZXkpIHtcblx0XHRyZXR1cm4gdGhpcy5yZWdpc3RyeS5oYXNPd25Qcm9wZXJ0eShrZXkpID8gdGhpcy5yZWdpc3RyeVtrZXldIDogbnVsbDtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblN0cmluZ3M7XG4iLCJ2YXIgQ29tbW9uRnVuY3Rpb25zID0ge1xuXHRwaXBlOiBmdW5jdGlvbihkYXRhLyogZmVlZCBkYXRhICovLCBmdW5jcy8qIGZ1bmN0aW9ucyBhcnJheSAqLykge1xuXHRcdGxldCByZXN1bHQ7XG5cdFx0Zm9yKGxldCBmdW5jIG9mIGZ1bmNzKXtcblx0XHRcdHJlc3VsdCA9IGZ1bmMocmVzdWx0IHx8IGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRnVuY3Rpb25zO1xuIiwidmFyIENvbW1vbkRPTSA9IHtcblx0Z2V0QXR0cmlidXRlc1N0YXJ0c1dpdGg6IGZ1bmN0aW9uKGVsLCBzdGFydHNXaXRoKSB7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihzdGFydHNXaXRoKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwiaW1wb3J0IENvbW1vbk5ldHdvcmsgZnJvbSAnLi9uZXQuanMnO1xuaW1wb3J0IENvbW1vbkxvZ3MgZnJvbSAnLi9sb2dzLmpzJztcbmltcG9ydCBDb21tb25TaG9ydHMgZnJvbSAnLi9zaG9ydHMuanMnO1xuaW1wb3J0IENvbW1vbk9iamVjdHMgZnJvbSAnLi9vYmplY3RzLmpzJztcbmltcG9ydCBDb21tb25TdHJpbmdzIGZyb20gJy4vc3RyaW5ncy5qcyc7XG5pbXBvcnQgQ29tbW9uRnVuY3Rpb25zIGZyb20gJy4vZnVuY3Rpb25zLmpzJztcbmltcG9ydCBDb21tb25ET00gZnJvbSAnLi9kb20uanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tbW9uO1xuIiwiLypcblx0OnByb3BlcnR5LnN1YjEuZnVuYygpLmZ1bmNQcm9wXG5cdCA9IHJldHVybiBmdW5jUHJvcCBvZiBmdW5jdGlvbiByZXN1bHQgb2Ygc3ViMSBwcm9wZXJ0eSBvZiBwcm9wZXJ0eSBvZiBvYmplY3Rcblx0Ons6OmhlbHBlclZhbH0uc3ViXG5cdCA9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgcHJvcGVydHkgb2YgaGVscGVycyBvYmplY3Rcblx0Ons6OmhlbHBlckZ1bmMoKX0uc3ViXG5cdD0gcmV0dXJuIHN1YiBwcm9wZXJ0eSBvZiBvYmplY3QgcHJvcGVydHkgd2l0aCBuYW1lIHJldHJpZXZlZCBmcm9tIGhlbHBlclZhbCBmdW5jdGlvbiByZXN1bHQgb2YgaGVscGVycyBvYmplY3QuXG5cdGlmIGhlbHBlcnNGdW54IHJldHVybiAnY2FyJyB0aGVuIHNvdXJjZSBwYXRoIGJlY29tZXMgOmNhci5zdWJcblxuKi9cblxuY29uc3QgU1VCX1BBVEhfU1RBUlQgPSAneycsXG5cdFNVQl9QQVRIX0VORCA9ICd9Jyxcblx0UEFUSF9TUExJVCA9ICcuJyxcblx0UEFUSF9TVEFSVF9PQkpFQ1QgPSAnOicsXG5cdFBBVEhfU1RBUlRfSEVMUEVSUyA9ICc6OicsXG5cdEZVTkNUSU9OX01BUktFUiA9ICcoKScsXG5cdE1BWF9ERUVQID0gMTA7XG5cbmNsYXNzIG5vdFBhdGh7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Lypcblx0XHRpbnB1dCAnOns6OmhlbHBlclZhbH0uc3ViJ1xuXHRcdHJldHVybiA6OmhlbHBlclZhbFxuXHQqL1xuXHRmaW5kTmV4dFN1YlBhdGgocGF0aC8qIHN0cmluZyAqLyl7XG5cdFx0bGV0IHN1YlBhdGggPSAnJyxcblx0XHRcdGZpbmQgPSBmYWxzZTtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRpZiAocGF0aFtpXSA9PT0gU1VCX1BBVEhfU1RBUlQpe1xuXHRcdFx0XHRmaW5kID0gdHJ1ZTtcblx0XHRcdFx0c3ViUGF0aCA9ICcnO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKHBhdGhbaV0gPT09IFNVQl9QQVRIX0VORCAmJiBmaW5kKXtcblx0XHRcdFx0XHRpZiAoZmluZCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHN1YlBhdGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRzdWJQYXRoKz1wYXRoW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmaW5kP3N1YlBhdGg6bnVsbDtcblx0fVxuXG5cdHJlcGxhY2VTdWJQYXRoKHBhdGgsIHN1YiwgcGFyc2VkKXtcblx0XHRsZXQgc3ViZiA9IFNVQl9QQVRIX1NUQVJUK3N1YitTVUJfUEFUSF9FTkQ7XG5cdFx0d2hpbGUocGF0aC5pbmRleE9mKHN1YmYpID4gLTEpe1xuXHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShzdWJmLCBwYXJzZWQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdHBhcnNlU3VicyhwYXRoLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cblxuXHRwYXJzZVBhdGhTdGVwKHN0ZXAsIGl0ZW0sIGhlbHBlcil7XG5cdFx0bGV0IHJTdGVwID0gbnVsbDtcblx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKSA9PT0gMCAmJiBoZWxwZXIpe1xuXHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9IRUxQRVJTLCAnJyk7XG5cdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdGlmKGhlbHBlci5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPT09IDAgJiYgaXRlbSl7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCAnJyk7XG5cdFx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRcdGlmKGl0ZW0uaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBzdGVwO1xuXHR9XG5cblx0Ly86OmZpZWxkTmFtZS5yZXN1bHRcblx0Ly97fVxuXHQvL3tmaWVsZE5hbWU6ICd0YXJnZXRSZWNvcmRGaWVsZCd9XG5cdC8vLy9bJ3RhcmdldFJlY29yZEZpZWxkJywgJ3Jlc3VsdCddXG5cdHBhcnNlUGF0aChwYXRoLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRwYXRoID0gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0cGF0aFtpXSA9IHRoaXMucGFyc2VQYXRoU3RlcChwYXRoW2ldLCBpdGVtLCBoZWxwZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdG5vcm1pbGl6ZVBhdGgocGF0aCl7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cmV0dXJuIHBhdGg7XG5cdFx0fWVsc2V7XG5cdFx0XHR3aGlsZShwYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID4gLTEpe1xuXHRcdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCcnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0c21hbGwgPSBbXCJ0b2RvXCJdLFxuXHRcdGJpZyA9IFtcInRvZG9cIiwgXCJsZW5ndGhcIl1cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHQqL1xuXG5cdGlmRnVsbFN1YlBhdGgoYmlnLCBzbWFsbCl7XG5cdFx0aWYgKGJpZy5sZW5ndGg8c21hbGwubGVuZ3RoKXtyZXR1cm4gZmFsc2U7fVxuXHRcdGZvcihsZXQgdCA9MDsgdCA8IHNtYWxsLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHNtYWxsW3RdICE9PSBiaWdbdF0pe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCksXG5cdFx0XHRpc0Z1bmN0aW9uID0gYXR0ck5hbWUuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpPi0xO1xuXHRcdGlmIChpc0Z1bmN0aW9uKXtcblx0XHRcdGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHR9XG5cdFx0aWYgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgdHlwZW9mIG9iamVjdFthdHRyTmFtZV0gIT09ICd1bmRlZmluZWQnICYmIG9iamVjdFthdHRyTmFtZV0gIT09IG51bGwpe1xuXHRcdFx0bGV0IG5ld09iaiA9IGlzRnVuY3Rpb24/b2JqZWN0W2F0dHJOYW1lXSgpOm9iamVjdFthdHRyTmFtZV07XG5cdFx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKG5ld09iaiwgYXR0clBhdGgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBuZXdPYmo7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdHNldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGF0dHJWYWx1ZSl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCk7XG5cdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0aWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKXtvYmplY3RbYXR0ck5hbWVdID0ge307fVxuXHRcdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChvYmplY3RbYXR0ck5hbWVdLCBhdHRyUGF0aCwgYXR0clZhbHVlKTtcblx0XHR9ZWxzZXtcblx0XHRcdG9iamVjdFthdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0am9pbigpe1xuXHRcdGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gYXJncy5qb2luKFBBVEhfU1BMSVQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RQYXRoKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXNbTUVUQV9FVkVOVFNdID0ge307XG5cdFx0dGhpc1tNRVRBX0RBVEFdID0ge307XG5cdFx0dGhpc1tNRVRBX1dPUktJTkddID0ge307XG5cdFx0dGhpc1tNRVRBX09QVElPTlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uICovXG5cdFx0XHRcdHdoYXQgPSBhcmdzWzBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uIGVsZW1lbnQgKi9cblx0XHRcdFx0bm90UGF0aC5zZXQoYXJnc1swXSAvKiBwYXRoICovICwgd2hhdCAvKiBjb2xsZWN0aW9uICovICwgdW5kZWZpbmVkIC8qIGhlbHBlcnMgKi8gLCBhcmdzWzFdIC8qIHZhbHVlICovICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRnZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCAqL1xuXHRcdGNhc2UgMTpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0fVxuXHRcdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggd2l0aCBkZWZhdWx0IHZhbHVlICovXG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHRcdGlmIChyZXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdC8qIG5vIGRhdGEsIHJldHVybiBkZWZhdWx0IHZhbHVlICovXG5cdFx0XHRcdFx0cmV0dXJuIGFyZ3NbMV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LyogZGF0YSwgcmV0dXJuIGl0ICovXG5cdFx0XHRcdFx0cmV0dXJuIHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0LyogcmV0dXJuIGZ1bGwgY29sbGVjdGlvbiAqL1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB3aGF0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0Q09SRSBPQkpFQ1Rcblx0XHRcdERBVEEgLSBpbmZvcm1hdGlvblxuXHRcdFx0T1BUSU9OUyAtIGhvdyB0byB3b3JrXG5cdFx0XHRXT1JLSU5HIC0gdGVtcG9yYXJpbHkgZ2VuZXJhdGVkIGluIHByb2NjZXNzXG5cdCovXG5cblx0c2V0RGF0YSgpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX0RBVEFdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldERhdGEoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0fVxuXG5cdGdldERhdGEoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9EQVRBXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldE9wdGlvbnMoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRPcHRpb25zKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX09QVElPTlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0V29ya2luZygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX1dPUktJTkddID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldFdvcmtpbmcoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXb3JraW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfV09SS0lOR10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKlxuXHRcdEVWRU5UUyBoYW5kbGluZ1xuXHQqL1xuXG5cdG9uKGV2ZW50TmFtZXMsIGV2ZW50Q2FsbGJhY2tzLCBvbmNlKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdG5vdENvbW1vbi5kZWZpbmVJZk5vdEV4aXN0cyh0aGlzW01FVEFfRVZFTlRTXSwgbmFtZSwgW10pO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0ucHVzaCh7XG5cdFx0XHRcdGNhbGxiYWNrczogZXZlbnRDYWxsYmFja3MsXG5cdFx0XHRcdG9uY2U6IG9uY2UsXG5cdFx0XHRcdGNvdW50OiAwXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHRyaWdnZXIoKSB7XG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyksXG5cdFx0XHRldmVudE5hbWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZSkpIHtcblx0XHRcdGV2ZW50TmFtZSA9IFtldmVudE5hbWVdO1xuXHRcdH1cblx0XHRldmVudE5hbWUuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5mb3JFYWNoKGV2ZW50ID0+IHtcblx0XHRcdFx0XHRpZiAoZXZlbnQub25jZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnQuY2FsbGJhY2tzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG9mZihldmVudE5hbWVzIC8qIGFycmF5IG9mIGV2ZW50IG5hbWVzICovICwgZXZlbnRDYWxsYmFja3MgLyogYXJyYXkgb2YgY2FsbGJhY2tzICovICkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGxldCB0YXJnZXRJZCA9IC0xO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaCgoZXZlbnQsIGkpID0+IHtcblx0XHRcdFx0aWYgKGkgPT09IC0xICYmIGV2ZW50Q2FsbGJhY2tzID09PSBldmVudC5jYWxsYmFja3MpIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9IGk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRhcmdldElkID4gLTEpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uc3BsaWNlKHRhcmdldElkLCAxKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuIiwibGV0IG5vdEFQSU9wdGlvbnMgPSB7XG5cdHJwczogNTAsXG5cdHByb3RvY29sOiAnaHR0cCcsXG5cdGhvc3Q6ICdsb2NhbGhvc3QnLFxuXHRwb3J0OiA5MDAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RBUElPcHRpb25zO1xuIiwiY2xhc3Mgbm90QVBJUXVlZXtcblx0Y29uc3RydWN0b3IgKHJlcXVlc3RzUGVyU2Vjb25kKSB7XG5cdFx0dGhpcy5xdWVlID0gW107XG5cdFx0dGhpcy5pbnQgPSBudWxsO1xuXHRcdHRoaXMucmVxdWVzdHNQZXJTZWNvbmQgPSByZXF1ZXN0c1BlclNlY29uZCB8fCA1O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuKCl7XG5cdFx0dGhpcy5pbnQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5jaGVjay5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5yZXF1ZXN0c1BlclNlY29uZCk7XG5cdH1cblxuXHRjaGVjaygpe1xuXHRcdGlmICh0aGlzLmluUHJvZ3Jlc3Mpe3JldHVybjt9XG5cdFx0ZWxzZXtcblx0XHRcdGlmICh0aGlzLnF1ZWUubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHRoaXMuaW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0XHRcdGxldCB0b0NhbGwgPSB0aGlzLnF1ZWUuc2hpZnQoKTtcblx0XHRcdFx0dG9DYWxsKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmV4dCgpe1xuXHRcdHRoaXMuaW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHR9XG5cblx0YWRkKGNhbGwpe1xuXHRcdHRoaXMucXVlZS5wdXNoKGNhbGwpO1xuXHR9XG5cblx0cGF1c2UoKXtcblx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludCk7XG5cdH1cblxuXHRyZXN1bWUoKXtcblx0XHR0aGlzLnJ1bigpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSVF1ZWU7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlLmpzJztcblxuaW1wb3J0IG5vdEFQSU9wdGlvbnMgZnJvbSAnLi9vcHRpb25zLmpzJztcbmltcG9ydCBub3RBUElRdWVlIGZyb20gJy4vcXVlZS5qcyc7XG5cblxuY2xhc3Mgbm90QVBJIGV4dGVuZHMgIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RDb21tb24uZXh0ZW5kKG5vdEFQSU9wdGlvbnMsIG9wdGlvbnMpKTtcblx0XHR0aGlzLnF1ZWUgPSBuZXcgbm90QVBJUXVlZSh0aGlzLmdldE9wdGlvbnMoJ3JwcycpKTtcblx0XHR0aGlzLnF1ZWUucnVuKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRtYWtlVXJsKHBhcnRzKSB7XG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJy8nKTtcblx0fVxuXG5cdHF1ZWVSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsIG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRtYWtlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCkge1xuXHRcdG5vdENvbW1vbi5sb2coJ21ha2luZyByZXF1ZXN0JywgbWV0aG9kLCB1cmwsIGlkKTtcblx0XHRub3RDb21tb24ucmVxdWVzdEpTT04obWV0aG9kLCB1cmwsIGRhdGEpXG5cdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVxdWVzdCBzdWNjZXNzZnVsbCcsIG1ldGhvZCwgdXJsLCBpZCwgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXNwb25zZSBpcyBnb29kJyk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChjb2RlLCByZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ3JlcXVlc3QgZmFpbGVkJywgbWV0aG9kLCB1cmwsIGlkLCByZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3Jlc3BvbnNlIGlzIGJhZCcpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZScpO1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncG9zdCcsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygncHV0dCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2dldCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnbGlzdCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2RlbGV0ZScsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2RlbGV0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldFVwbG9hZFVSTChtb2RlbCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSArIHRoaXMuZ2V0T3B0aW9ucygndXBsb2FkJykgKyBtb2RlbD9tb2RlbC5nZXRJZCgpOicnO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSTtcbiIsImltcG9ydCBub3RCYXNlICBmcm9tICcuLi9ub3RCYXNlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEltYWdlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW50ZXJmYWNlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGV4dGVuZE9iamVjdChvYmoxLCBvYmoyKSB7XG5cdFx0dmFyIGF0dHJOYW1lID0gJyc7XG5cdFx0Zm9yIChhdHRyTmFtZSBpbiBvYmoyKSB7XG5cdFx0XHRpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpIHtcblx0XHRcdFx0b2JqMVthdHRyTmFtZV0gPSBvYmoyW2F0dHJOYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG9iajE7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldEFjdGlvbnNDb3VudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBY3Rpb25zKCkgPyBPYmplY3Qua2V5cyh0aGlzLmdldEFjdGlvbnMoKSkubGVuZ3RoIDogMDtcblx0fVxuXG5cdGdldEFjdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFuaWZlc3QgJiYgdGhpcy5tYW5pZmVzdC5hY3Rpb25zP3RoaXMubWFuaWZlc3QuYWN0aW9ucyA6IHt9O1xuXHR9XG5cblx0c2V0RmluZEJ5KGtleSwgdmFsdWUpIHtcblx0XHR2YXIgb2JqID0ge307XG5cdFx0b2JqW2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIob2JqKTtcblx0fVxuXG5cdHNldEZpbHRlcihmaWx0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdmaWx0ZXInLCBmaWx0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFNvcnRlcihzb3J0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUocGFnZVNpemUpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZXIocGFnZVNpemUsIHBhZ2VOdW1iZXIpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldE1vZGVsUGFyYW0oJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0c2V0TW9kZWxQYXJhbShwYXJhbU5hbWUsIHBhcmFtVmFsdWUpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCkpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucyhwYXJhbU5hbWUsIHBhcmFtVmFsdWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZGVsUGFyYW0ocGFyYW1OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucyhwYXJhbU5hbWUsIG51bGwpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdC8vcmV0dXJuIFByb21pc2Vcblx0cmVxdWVzdChyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdHVybCA9IHRoaXMuZ2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIG5vdENvbW1vbi5nZXRBUEkoKS5xdWVlUmVxdWVzdChhY3Rpb25EYXRhLm1ldGhvZCwgdXJsLCBKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSwgdGhpcy5vbkxvYWQuYmluZCh7YWN0aW9uRGF0YSwgbWFuaWZlc3Q6IHRoaXMubWFuaWZlc3R9KSk7XG5cdH1cbi8qXG5cdF9yZXF1ZXN0X09ic29sZXRlXyhyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRub3RDb21tb24ubG9nKCdyZXF1ZXN0JywgcmVjb3JkLCBhY3Rpb25OYW1lLCBjYWxsYmFja1N1Y2Nlc3MsIGNhbGxiYWNrRXJyb3IpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwsIHJlY29yZC5nZXRJZCgpLCBKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSwgZ29vZCwgYmFkKVxuXHRcdFx0XHRcdC50aGVuKHJlc29sdmUpXG5cdFx0XHRcdFx0LmNhdGNoKHJlamVjdCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlJyk7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpO1xuXG5cdFx0fSk7XG5cblxuXHRcdGlmIChhY3Rpb25EYXRhKXtcblx0XHRcdHZhciB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eG1saHR0cC5vcGVuKGFjdGlvbkRhdGEubWV0aG9kLCB1cmwpO1xuXHRcdFx0eG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4bWxodHRwLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhtbGh0dHAud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhtbGh0dHAuY2FsbGJhY2tTdWNjZXNzID0gY2FsbGJhY2tTdWNjZXNzO1xuXHRcdFx0eG1saHR0cC5jYWxsYmFja0Vycm9yID0gY2FsbGJhY2tFcnJvcjtcblx0XHRcdHhtbGh0dHAub25sb2FkID0gdGhpcy5vbkxvYWQ7XG5cdFx0XHR4bWxodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSkpO1xuXHRcdH1cblx0fVxuKi9cblx0b25Mb2FkKGRhdGEpe1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZih0aGlzICYmIHRoaXMuYWN0aW9uRGF0YSAmJiB0aGlzLmFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiB0aGlzLmFjdGlvbkRhdGEuaXNBcnJheSkge1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0ZmlsZVVwbG9hZChmaWxlVXBsb2FkKSB7XG5cdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdC8vbm90Q29tbW9uLmxvZyhmaWxlVXBsb2FkLmZpbGUpO1xuXHRcdGlmICh4aHIudXBsb2FkICYmIHRoaXMuZmlsZUFsbG93ZWQoZmlsZVVwbG9hZC5maWxlKSkge1xuXHRcdFx0Ly8gcHJvZ3Jlc3MgYmFyXG5cdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcInByb2dyZXNzXCIsIGUsIGZpbGVVcGxvYWQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGF0LndvcmtpbmcuZmlsZVVwbG9hZHMuaW5kZXhPZihmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHRcdHRoYXQud29ya2luZy5maWxlVXBsb2Fkcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwic3VjY2Vzc1wiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9wZW4oXCJQT1NUXCIsIHRoaXMuZ2V0VXBsb2FkVXJsKCksIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgZmlsZVVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYX0ZJTEVOQU1FXCIsIGVuY29kZVVSSUNvbXBvbmVudChmaWxlVXBsb2FkLmZpbGUubmFtZSkpO1xuXHRcdFx0eGhyLnNlbmQoZmlsZVVwbG9hZC5maWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBuZXcgRXZlbnQoXCJXcm9uZ0ZpbGVUeXBlXCIpLCBmaWxlVXBsb2FkKTtcblx0XHR9XG5cdH1cblx0Ki9cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJztcblxuY29uc3QgTUVUQV9JTlRFUkZBQ0UgPSBTeW1ib2woJ2ludGVyZmFjZScpLFxuXHRNRVRBX1BST1hZID0gU3ltYm9sKCdwcm94eScpLFxuXHRNRVRBX0NIQU5HRSA9IFN5bWJvbCgnY2hhbmdlJyksXG5cdE1FVEFfQ0hBTkdFX05FU1RFRCA9IFN5bWJvbCgnY2hhbmdlLm5lc3RlZCcpLFxuXHRNRVRBX1NBTCA9IFsnZ2V0QXR0cicsICdnZXRBdHRycycsICdzZXRBdHRyJywgJ3NldEF0dHJzJywgJ2dldERhdGEnLCAnc2V0RGF0YScsICdnZXRKU09OJywgJ29uJywgJ29mZicsICd0cmlnZ2VyJ10sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTA7XG5cbnZhciBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jyl7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJyl7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRhcmdldCkuaW5kZXhPZihrZXkpID09PSAtMSAmJiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHJlc1RhcmdldCwga2V5LCBjb250ZXh0KTtcblx0XHR9LmJpbmQob3duZXIpLFxuXHRcdHNldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIHZhbHVlLyosIHByb3h5Ki8pIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0eXBlb2YgdGFyZ2V0W2tleV0pO1xuXG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0XHRcdHZhbHVlVG9SZWZsZWN0ID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpLCBub3RQYXRoLmpvaW4odGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCAgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RQcm9wZXJ0eSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKGdldFJvb3QsIHBhdGhUbywgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKXtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUHJveHkpe1xuXHRcdFx0Ly9ub3RDb21tb24uZXJyb3IoJ3RoaXMgaXMgUHJveHkgcHJvcGVydHknKTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm9wZXJ0eSBwcm94eSBwcm9wZXJ0eSBjcmVhdGVkIGZyb20nLCBpdGVtKTtcblx0XHR0aGlzLnNldERhdGEoaXRlbSk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpcy5yZXR1cm5Ub1Jvb3QuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRyZXR1cm5Ub1Jvb3QocHJveHksIGtleSwgdmFsdWUpe1xuXHRcdGxldCAvKnBhdGggPSB0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwqL1xuXHRcdFx0cm9vdCA9IHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpKCk7XG5cdFx0cm9vdC50cmlnZ2VyKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX1BST1hZXSwgdGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSwgdmFsdWUpO1xuXHR9XG59XG5cbnZhciBjcmVhdGVSZWNvcmRIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpe1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpe1xuXHRcdFx0XHRpZiAodGhpc1trZXldKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZS8qLCBwcm94eSovKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHJlY29yZCBwcm94eSBzZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCk7XG5cdFx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZSk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RSZWNvcmQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QsIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCl7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1Byb3h5KXtcblx0XHRcdG5vdENvbW1vbi5lcnJvcigndGhpcyBpcyBQcm94eSBpdGVtJyk7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUmVjb3JkKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRmaWx0ZXI6IHt9LFxuXHRcdFx0c29ydGVyOiB7fSxcblx0XHRcdHBhZ2VOdW1iZXI6IERFRkFVTFRfUEFHRV9OVU1CRVIsXG5cdFx0XHRwYWdlU2l6ZTogREVGQVVMVF9QQUdFX1NJWkUsXG5cdFx0XHRmaWVsZHM6IFtdXG5cdFx0fSk7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0gPSBuZXcgbm90UmVjb3JkSW50ZXJmYWNlKG1hbmlmZXN0KTtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpcy5pbnRlcmZhY2VVcCgpO1xuXHRcdHRoaXMuaXNSZWNvcmQgPSB0cnVlO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgcmVjb3JkIGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0aW5pdFByb3BlcnRpZXMoaXRlbSwgcGF0aCA9ICcnKXtcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpe1xuXHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhpdGVtKTtcblx0XHRcdGZvcihsZXQga2V5IG9mIGtleXMpe1xuXHRcdFx0XHRsZXQgY3VyUGF0aCA9IHBhdGgrKHBhdGgubGVuZ3RoPjA/Jy4nOicnKStrZXk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3VyUGF0aCcsIGN1clBhdGgpO1xuXHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KGtleSkpe1xuXHRcdFx0XHRcdGlmKHR5cGVvZiBpdGVtW2tleV0gPT09ICdvYmplY3QnKXtcblx0XHRcdFx0XHRcdHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbVtrZXldLCBjdXJQYXRoKTtcblx0XHRcdFx0XHRcdGl0ZW1ba2V5XSA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldFJvb3QuYmluZCh0aGlzKSwgY3VyUGF0aCwgaXRlbVtrZXldKTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgbm90IG93biBwcm9wZXJ0eScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpdGVtO1xuXHR9XG5cblx0Z2V0Um9vdCgpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gKCkgPT4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCk7XG5cdFx0XHRub3RDb21tb24ubG9nKCdkZWZpbmUnLCBERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleCk7XG5cdFx0fVxuXHR9XG5cdC8qXG5cdC0+ICdwYXRoLnRvLmtleScsIHZhbHVlT2ZLZXlcblx0PC0gb2ssIHdpdGggb25lIG9uQ2hhbmdlIGV2ZW50IHRyaWdnZXJlZFxuXHQqL1xuXG5cdHNldEF0dHIoa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBub3RQYXRoLnNldChrZXksIHRoaXNbTUVUQV9QUk9YWV0sIHt9LCB2YWx1ZSk7XG5cdH1cblxuXHQvKlxuXHQtPlxuXHR7XG5cdFx0J2tleVBhdGgnOiB2YWx1ZSxcblx0XHQna2V5LnN1YlBhdGgnOiB2YWx1ZTIsXG5cdFx0J2tleVBhdGguMC50aXRsZSc6IHZhbHVlM1xuXHR9XG5cdDwtIG9rLCB3aXRoIGJ1bmNoIG9mIG9uQ2hhbmdlIGV2ZW50cyB0cmlnZ2VyZWRcblx0Ki9cblx0c2V0QXR0cnMob2JqZWN0UGFydCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCl7XG5cdFx0XHRmb3IobGV0IHBhdGggaW4gb2JqZWN0UGFydCl7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMgb25lIHRvIGdvJywgcGF0aCk7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cihwYXRoLCBvYmplY3RQYXJ0W3BhdGhdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aFRvS2V5J1xuXHQ8LSB2YWx1ZTFcblxuXHQqL1xuXHRnZXRBdHRyKHdoYXQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ2dldEF0dHInLCB3aGF0KTtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQod2hhdCwgdGhpc1tNRVRBX1BST1hZXSwge30pO1xuXHR9XG5cblx0Lypcblx0LT4gWydwYXRoVG9LZXknLCAncGF0aC50by5rZXknLCAnc2ltcGxlS2V5JywuLi5dXG5cdDwtIFt2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzLC4uLl1cblx0Ki9cblx0Z2V0QXR0cnMod2hhdCkge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAod2hhdCAmJiB3aGF0Lmxlbmd0aCA+IDApe1xuXHRcdFx0Zm9yKGxldCBwYXRoIG9mIHdoYXQpe1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLmdldEF0dHIocGF0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSxhcmd1bWVudHNbMl0pLCBhcmd1bWVudHNbM10pO1xuXHR9XG5cblx0c2V0SXRlbShpdGVtKXtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZScpO1xuXHRcdHRoaXMub2ZmKCdjaGFuZ2UubmVzdGVkJyk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0Z2V0SlNPTigpe1xuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJjb25zdCBQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVggPSAnbi0nLFxuXHRURU1QTEFURV9UQUcgPSAnbnQnLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgPSAnLScsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYID0gJ2lmJyxcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCA9ICdub3RfY29tcG9uZW50XycsXG5cdFBBUlRfSURfUFJFRklYID0gJ25vdF9wYXJ0XycsXG5cdERFRkFVTFRfUExBQ0VSID0gJ3BsYWNlJyxcblx0REVGQVVMVF9QTEFDRVJfTE9PUCA9ICdwbGFjZUFmdGVyJztcblxuY29uc3QgT1BUUyA9IHtcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLFxuXHRURU1QTEFURV9UQUcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUixcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsXG5cdERFRkFVTFRfUExBQ0VSLFxuXHRDT01QT05FTlRfSURfUFJFRklYLFxuXHRQQVJUX0lEX1BSRUZJWCxcblx0REVGQVVMVF9QTEFDRVJfTE9PUFxufTtcblxuZXhwb3J0IGRlZmF1bHQgT1BUUztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmNvbnN0IE1FVEFfQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlQ2FjaGUgZXh0ZW5kcyBub3RCYXNle1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXSA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHR0aGlzLmhpZGVUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaWRlVGVtcGxhdGVzKCl7XG5cdFx0bGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdHQuaW5uZXJIVE1MID0gT1BUUy5URU1QTEFURV9UQUcgKyAne2Rpc3BsYXk6IG5vbmU7fSc7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KTtcblx0fVxuXG5cdHJlZ2lzdGVyKCkge1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcigndGVtcGxhdGVDYWNoZScsIHRoaXMpO1xuXHR9XG5cblx0bG9hZChtYXApIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0Zm9yICh2YXIgaSBpbiBtYXApIHtcblx0XHRcdHRoaXMubG9hZE9uZShpLCBtYXBbaV0pO1xuXHRcdH1cblx0fVxuXG5cdGxvYWRPbmUoa2V5LCB1cmwsIGNhbGxiYWNrKSB7XG5cblx0XHR2YXIgb1JlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRvUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXHRcdG9SZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbCBvZiBub3RUZW1wbGF0ZXNFbGVtZW50cyl7XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSA9PT0gY29udCl7XG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdFx0XHRyZXN1bHRbZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlXSA9IGVsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRhZGRMaWIobGliKXtcblx0XHRmb3IobGV0IHQgaW4gbGliKXtcblx0XHRcdHRoaXMuc2V0T25lKHQsIGxpYlt0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVVSTChrZXksIHVybCkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRpZiAodGhhdC5nZXQoa2V5KSl7XG5cdFx0XHRcdHJlc29sdmUodGhhdC5nZXQoa2V5KSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly90aGF0LnNldExvYWRpbmcoa2V5LCB1cmwpO1xuXHRcdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpLnRoZW4oZnVuY3Rpb24odGVtcGxhdGVJbm5lckhUTUwpe1xuXHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoYXQud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdHRoYXQuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdFx0XHRcdHJlc29sdmUodGVtcGxhdGVDb250RWwpO1xuXHRcdFx0XHR9KS5jYXRjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZScsIGtleSwgdXJsKTtcblx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRMaWJGcm9tVVJMKHVybCkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpLnRoZW4oZnVuY3Rpb24odGVtcGxhdGVzSFRNTCl7XG5cdFx0XHRcdGxldCB0ZW1wbGF0ZXMgPSB0aGF0LnBhcnNlTGliKHRlbXBsYXRlc0hUTUwpO1xuXHRcdFx0XHR0aGF0LmFkZExpYih0ZW1wbGF0ZXMpO1xuXHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGVzIGxpYicsIHVybCk7XG5cdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRGcm9tRG9jdW1lbnQoc2VsZWN0b3JPckVsZW1lbnQpe1xuXHRcdGxldCBlbCA9ICh0eXBlb2Ygc2VsZWN0b3JPckVsZW1lbnQgPT09ICdzdHJpbmcnKT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JFbGVtZW50KTpzZWxlY3Rvck9yRWxlbWVudDtcblx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBPUFRTLlRFTVBMQVRFX1RBRy50b0xvd2VyQ2FzZSgpKXtcblx0XHRcdFx0dGhpcy5zZXRPbmUoZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlLCBlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVRleHQoa2V5LCB0ZW1wbGF0ZUlubmVySFRNTCl7XG5cdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhpcy53cmFwKGtleSwgJycsIHRlbXBsYXRlSW5uZXJIVE1MKTtcblx0XHR0aGlzLnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVDYWNoZSgpO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5cbmNvbnN0IE1FVEFfUFJPQ0VTU09SUyA9IFN5bWJvbCgncHJvY2Vzc29ycycpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQcm9jZXNzb3IoLyoga2V5LCB2YWx1ZSAqLyl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UHJvY2Vzc29yKC8qIGtleSwgIGRlZmF1bHRWYWx1ZSAqLyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyUHJvY2Vzc29ycygpe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkKCl7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuXHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gYXJndW1lbnRzWzBdKXtcblx0XHRcdFx0XHR0aGlzLnNldFByb2Nlc3Nvcih0LCBhcmd1bWVudHNbMF1bdF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0UHJvY2Vzc29yKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhcigpe1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVQcm9jZXNzb3JzKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7XG5cbi8qXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgiBET00g0L/QvtC00LTQtdGA0LXQstC+INCyINC60LDRh9C10YHRgtCy0LUg0YjQsNCx0LvQvtC90LAuXG4gKiDQl9Cw0L/QvtC70L3Rj9C10YIg0LXQs9C+INC00LDQvdC90YvQvNC4LlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YHQs9C10L3QtdGA0LjRgNC+0LLQsNC90L3Ri9C1INGN0LvQtdC80LXQvdGC0YtcbiAqXG4gKiAqL1xuXG4vKlxuXG5cdDxkaXYgbi10ZW1wbGF0ZS1uYW1lPVwidmFzeWFcIj5cblx0XHQ8cD48aW5wdXQgdHlwZT1cInRleHRcIiBuLXZhbHVlPVwiOmNvb2xOYW1lXCIvPjwvcD5cblx0XHQ8cD7QkdC+0YDQuNGBINGF0YDQtdC9INC/0L7Qv9Cw0LTQtdGI0Ywg0Lgge3s6Y29vbE5hbWV9fS48L3A+XG5cdDwvZGl2PlxuXG4gKi9cblxuY29uc3QgTUVUQV9DT01QT05FTlRTID0gU3ltYm9sKCdjb21wb25lbnRzJyk7XG5cbmNsYXNzIG5vdFJlbmRlcmVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdC8qXG5cdFx0aW5wdXQgPSB7XG5cdFx0XHRkYXRhOiBub3RSZWNvcmQsXG5cdFx0XHR0ZW1wbGF0ZTogZWxlbWVudFxuXHRcdFx0b3B0aW9uczp7XG5cdFx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHQqL1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU10gPSB7fTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMuY29tcG9uZW50ID0gaW5wdXQuY29tcG9uZW50O1xuXHRcdHRoaXMuaW5pdERhdGEoaW5wdXQuZGF0YSA/IGlucHV0LmRhdGEgOiB7fSk7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0LnRlbXBsYXRlKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZSgpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndGVtcGxhdGUnLCB0aGlzLmdldFdvcmtpbmcoJ2dldFRlbXBsYXRlJykoKSk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuZ2V0RGF0YSgpLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHR9XG5cblx0aW5pdFdvcmtpbmcodGVtcGxhdGUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0Z2V0VGVtcGxhdGU6IHRlbXBsYXRlLFxuXHRcdFx0cGFydElkOiB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpID8gdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA6IE9QVFMuUEFSVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKSB7XG5cdFx0aWYgKHRoaXMuY29tcG9uZW50KSB7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMuY29tcG9uZW50LmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH1cblx0fVxuXG5cdG9uQ2hhbmdlKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0bm90Q29tbW9uLmxvZyh0aGlzKTtcblx0XHRub3RDb21tb24ubG9nKHRoaXMuZ2V0QnJlYWRDcnVtcHMoKS5qb2luKCcgPiAnKSk7XG5cdFx0bm90Q29tbW9uLmxvZygndXBkYXRpbmcgcmVuZGVyZXIgJywgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKSwgJyBhZnRlciBjaGFuZ2VzJywga2V5LCB2YWx1ZSk7XG5cdFx0dGhpcy51cGRhdGUoa2V5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ29ic29sZXRlJyk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHR1cGRhdGUoa2V5KSB7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfQ09NUE9ORU5UU10pIHtcblx0XHRcdGxldCBpdGVtID0gdGhpc1tNRVRBX0NPTVBPTkVOVFNdW3RdLFxuXHRcdFx0XHRpZlBhcnQgPSB0cnVlO1xuXHRcdFx0aWYgKGtleSl7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJyk9PT1udWxsKXtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXRcdGNvbXBvbmVudFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpKSxcblx0XHRcdFx0XHRjaGFuZ2VkUGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChrZXkpO1xuXHRcdFx0XHRpZlBhcnQgPSBub3RQYXRoLmlmRnVsbFN1YlBhdGgoY2hhbmdlZFBhdGgsIGNvbXBvbmVudFBhdGgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKGl0ZW0uZ2V0T3B0aW9ucygnbmFtZScpLCAnID4tPCAnLCBpdGVtLmdldE9wdGlvbnMoJ2lkJyksICcgPi08ICcsIGNvbXBvbmVudFBhdGgsIGNoYW5nZWRQYXRoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygnd2lsbCBiZSB1cGRhdGVkJywgaWZQYXJ0KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlmUGFydCkge1xuXHRcdFx0XHRpdGVtLnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldFdvcmtpbmdNYXBwaW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbWFwcGluZycsIHRoaXMuY3JlYXRlTWFwcGluZygpKTtcblx0fVxuXG5cdC8qXG5cblx00KHQvtC30LTQsNC10Lwg0LrQsNGA0YLRiyDRgdC+0L7RgtCy0LXRgdGC0LLQuNGPINC/0YDQvtGG0LXRgdGB0L7RgNC+0LIsINC/0YPRgtC10Lkg0LTQsNC90L3Ri9GFINCyINC+0LHRitC10LrRgtC1INC4INGN0LvQtdC80LXQvdGC0L7QsiDRiNCw0LHQu9C+0L3QsC5cblx0W3tcblx0XHRlbCxcblx0XHRwcm9jZXNzb3IsXG5cdFx0d29ya2luZyxcblx0XHRpdGVtLnByb3BlcnR5LnBhdGhcblx0fV1cblxuXHQqL1xuXG5cdGNyZWF0ZU1hcHBpbmcoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZmluZEFsbFByb2Nlc3NvcnMoKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZmluZEFsbFByb2Nlc3NvcnMoKSB7XG5cdFx0bGV0IHByb2NzID0gW10sXG5cdFx0XHRlbHMgPSBub3RDb21tb24uZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgodGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGVscy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGF0dHMgPSBlbHNbal0uYXR0cmlidXRlcywgbiA9IGF0dHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRzW2ldLm5vZGVOYW1lLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpID09PSAwKSB7XG5cdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGF0dHNbaV0pO1xuXHRcdFx0XHRcdGxldCBwcm9jRGF0YSA9IHRoaXMucGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKGF0dHNbaV0ubm9kZU5hbWUpO1xuXHRcdFx0XHRcdHByb2NEYXRhLmVsZW1lbnQgPSBlbHNbal07XG5cdFx0XHRcdFx0cHJvY0RhdGEucHJvY2Vzc29yRXhwcmVzc2lvbiA9IGF0dHNbaV0ubm9kZU5hbWU7XG5cdFx0XHRcdFx0cHJvY0RhdGEuYXR0cmlidXRlRXhwcmVzc2lvbiA9IGF0dHNbaV0udmFsdWU7XG5cdFx0XHRcdFx0cHJvY3MucHVzaChwcm9jRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHByb2NzO1xuXHR9XG5cblx0cGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKHByb2Nlc3NvckV4cHJlc3Npb24pIHtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0cGFyYW1zOiBbXSxcblx0XHRcdHByb2Nlc3Nvck5hbWU6ICcnLFxuXHRcdFx0aWZDb25kaXRpb246IGZhbHNlXG5cdFx0fTtcblx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLCAnJyk7XG5cdFx0aWYgKHByb2Nlc3NvckV4cHJlc3Npb24uaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYKSA9PT0gKHByb2Nlc3NvckV4cHJlc3Npb24ubGVuZ3RoIC0gT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWC5sZW5ndGgpKSB7XG5cdFx0XHRyZXN1bHQuaWZDb25kaXRpb24gPSB0cnVlO1xuXHRcdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiArIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsICcnKTtcblx0XHR9XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHByb2Nlc3NvckV4cHJlc3Npb24uc3BsaXQoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IpO1xuXHRcdHJlc3VsdC5wcm9jZXNzb3JOYW1lID0gcmVzdWx0LnBhcmFtc1swXTtcblx0XHRyZXN1bHQucGFyYW1zID0gcmVzdWx0LnBhcmFtcy5zbGljZSgxKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZXhlY1Byb2Nlc3NvcnMoaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbWFwcGluZyA9IHRoaXMuZ2V0V29ya2luZygnbWFwcGluZycpO1xuXHRcdGlmIChtYXBwaW5nKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBpbmcubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IHByb2NTY29wZSA9IG1hcHBpbmdbaV07XG5cdFx0XHRcdHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocHJvY1Njb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGluZGV4KTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdhdHRyaWJ1dGVSZXN1bHQnLCBwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0XHRcdFx0bGV0IHByb2NOYW1lID0gcHJvY1Njb3BlLnByb2Nlc3Nvck5hbWUsXG5cdFx0XHRcdFx0cHJvYyA9IG5vdFRlbXBsYXRlUHJvY2Vzc29ycy5nZXQocHJvY05hbWUpO1xuXHRcdFx0XHRpZiAocHJvYykge1xuXHRcdFx0XHRcdHByb2MocHJvY1Njb3BlLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHRcdFx0XHRcdHByb2NTY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9jU2NvcGUucHJvY2Vzc29yRXhwcmVzc2lvbik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyBwcm9jZXNzb3IgbGlrZScsIHByb2NOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ3JlbmRlcmVkJyk7XG5cdH1cblxuXHRnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHBhdGgsIGl0ZW0pIHtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQocGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0fVxuXG5cdGNsZWFyU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuZGVzdHJveVN1YnMoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N1YnMnLCBbXSk7XG5cdH1cblxuXHRkZXN0cm95U3VicygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdFx0dC5kZXN0cm95KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0U3Rhc2goKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRsZXQgZWwgPSB0aGlzLmdldFN0YXNoKClbdF07XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSl7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmU3ViRWxlbWVudFJlbmRlcmVkKG50RWwpIHtcblx0XHRyZXR1cm4gbnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQgJiYgKG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkLnZhbHVlID09PSAndHJ1ZScpO1xuXHR9XG5cblx0c2VhcmNoRm9yU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRsZXQgc3VicyA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3JBbGwoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCBvZiBzdWJzKSB7XG5cdFx0XHRpZiAoIXRoaXMuaWZTdWJFbGVtZW50UmVuZGVyZWQobnQpKSB7XG5cdFx0XHRcdHRoaXMucmVuZGVyU3ViKG50KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhZGRTdWIobnRFbCkge1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnc3VicycpLnB1c2goe1xuXHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRwYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogJycsXG5cdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS5zcmMgOiAnJyxcblx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdFx0cmVuZGVyZWRMaXN0OiBbXSxcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclN1YihudEVsKSB7XG5cdFx0aWYgKCFudEVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGxldCBkZXRhaWxzID0ge1xuXHRcdFx0XHRkYXRhUGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6IG51bGwsXG5cdFx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLnNyYy52YWx1ZSA6ICcnLFxuXHRcdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdGRhdGE6IGRldGFpbHMuZGF0YVBhdGghPT0gbnVsbD8gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KGRldGFpbHMuZGF0YVBhdGgsIHRoaXMuZ2V0RGF0YSgpKTpudWxsLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRzcmM6IGRldGFpbHMuc3JjXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlQWZ0ZXInLFxuXHRcdFx0XHRcdGlkOiBkZXRhaWxzLmlkLFxuXHRcdFx0XHRcdG50RWw6IG50RWwsXG5cdFx0XHRcdFx0ZGF0YVBhdGg6IGRldGFpbHMuZGF0YVBhdGhcblx0XHRcdFx0fSxcblx0XHRcdFx0b3duZXI6IHRoaXNcblx0XHRcdH07XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgZGV0YWlscy5pZCk7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdW2RldGFpbHMuaWRdID0gbmV3IG5vdENvbXBvbmVudChvcHRpb25zKTtcblx0fVxuXG5cdGNsZWFyU3Rhc2goKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIFtdKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGUnKTtcblx0fVxuXG5cdGdldFN0YXNoKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3N0YXNoJyk7XG5cdH1cblxuXHRzdGFzaFJlbmRlcmVkKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHR0aGlzLmFkZFRvU3Rhc2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0fVxuXG5cdHJlcGxhY2VSZW5kZXJlZCgpIHtcblx0XHRub3RDb21tb24ubG9nKCdyZXBsYWNlIHN0YXNoJyk7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLFxuXHRcdFx0c3Rhc2ggPSB0aGlzLmdldFN0YXNoKCksXG5cdFx0XHRuZXdTdGFzaCA9IFtdLFxuXHRcdFx0YW5jaG9yID0gc3Rhc2gubGVuZ3RoID4gMCA/IHN0YXNoWzBdIDogdGhpcy5nZXRPcHRpb25zKCdudEVsJyksXG5cdFx0XHRwYXJlbnROb2RlID0gYW5jaG9yLnBhcmVudE5vZGU7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0bmV3U3Rhc2gucHVzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgbmV3U3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdGlmIChhbmNob3IubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1N0YXNoW3RdLCBhbmNob3IubmV4dFNpYmxpbmcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3U3Rhc2hbdF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHN0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRwYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0YXNoW3RdKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIG5ld1N0YXNoKTtcblx0fVxuXG5cdGFkZFRvU3Rhc2gobm9kZSkge1xuXHRcdHRoaXMuZ2V0U3Rhc2goKS5wdXNoKG5vZGUpO1xuXHR9XG5cblx0aXNEYXRhKGRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkgPT09IGRhdGE7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVuZGVyZXI7XG4iLCJjb25zdCBwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XG5cdFx0d2hpbGUgKHRhcmdldEVsLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0dGFyZ2V0RWwucmVtb3ZlQ2hpbGQodGFyZ2V0RWwuY2hpbGRyZW5bMF0pO1xuXHRcdH1cblx0fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9XG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2U7XG4iLCJjb25zdCBwbGFjZUFmdGVyID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VBZnRlcjtcbiIsImNvbnN0IHBsYWNlQmVmb3JlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VCZWZvcmU7XG4iLCJjb25zdCBwbGFjZUZpcnN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlRmlyc3Q7XG4iLCJjb25zdCBwbGFjZUxhc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUxhc3Q7XG4iLCJjb25zdCByZXBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdHRhcmdldEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFyZ2V0RWwpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlO1xuIiwiaW1wb3J0IHBsYWNlIGZyb20gJy4vcGxhY2UnO1xuaW1wb3J0IHBsYWNlQWZ0ZXIgZnJvbSAnLi9wbGFjZUFmdGVyJztcbmltcG9ydCBwbGFjZUJlZm9yZSBmcm9tICcuL3BsYWNlQmVmb3JlJztcbmltcG9ydCBwbGFjZUZpcnN0IGZyb20gJy4vcGxhY2VGaXJzdCc7XG5pbXBvcnQgcGxhY2VMYXN0IGZyb20gJy4vcGxhY2VMYXN0JztcbmltcG9ydCByZXBsYWNlIGZyb20gJy4vcmVwbGFjZSc7XG5cbmNvbnN0IG5vdFBsYWNlcnMgPSB7XG5cdHBsYWNlOiBwbGFjZSxcblx0cGxhY2VBZnRlcjogcGxhY2VBZnRlcixcblx0cGxhY2VCZWZvcmU6IHBsYWNlQmVmb3JlLFxuXHRwbGFjZUZpcnN0OiBwbGFjZUZpcnN0LFxuXHRwbGFjZUxhc3Q6IHBsYWNlTGFzdCxcblx0cmVwbGFjZTogcmVwbGFjZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90UGxhY2VycztcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi9ub3RSZW5kZXJlcic7XG5pbXBvcnQgbm90UGxhY2VycyBmcm9tICcuL3BsYWNlcnMnO1xuXG5jb25zdCBNRVRBX1BBUlRTID0gU3ltYm9sKCdwYXJ0cycpO1xuLypcblx0aW5wdXQgPSB7XG5cdFx0ZGF0YTogbm90UmVjb3JkIG9yIFtub3RSZWNvcmRdLFxuXHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRodG1sOiBodG1sKHN0cmluZyksIFx0XHQvL9GC0LXQutGB0YIg0YEgaHRtbCDQutC+0LTQvtC8INGI0LDQsdC70L7QvdCwXG5cdFx0XHRlbDogSFRNTEVsZW1lbnQob2JqZWN0KSwgXHQvL0RPTSDRjdC70LXQvNC10L3RglxuXHRcdFx0c3JjOiBzcmMoc3RyaW5nKSxcdFx0XHQvL9GB0YHRi9C70LrQsCDQvdCwINGE0LDQudC7INGBINGI0LDQsdC70L7QvdC+0Lxcblx0XHRcdG5hbWU6IG5hbWUoc3RyaW5nKVx0XHRcdC8v0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCDQtNC70Y8g0L/QvtC40YHQutCwINCyINC60Y3RiNC1IG5vdFRlbXBsYXRlQ2FjaGVcblx0XHR9XG5cdFx0b3B0aW9uczp7XG5cdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHQvL9CwINGN0YLQviDQutCw0Log0LHRg9C00LXQvCDQv9C+0LzQtdGJ0LDRgtGMINGA0LXQt9GD0LvRjNGC0LDRgiDRgNC10L3QtNC10YDQuNC90LPQsFxuXHRcdFx0cmVuZGVyQW5kOiBwbGFjZVN0eWxlKHN0cmluZykg0L7QtNC40L0g0LjQtyDQstCw0YDQuNCw0L3RgtC+0LJcblx0XHRcdFx0XHRwbGFjZVx0XHQtXHTQv9C+0LzQtdGJ0LDQtdC8INCy0L3Rg9GC0YDQuCDRhtC10LvQtdCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0XHRyZXBsYWNlXHRcdC1cdNC30LDQvNC10L3Rj9C10Lxcblx0XHRcdFx0XHRwbGFjZUFmdGVyXHQtXHTQv9C+0YHQu9C1XG5cdFx0XHRcdFx0cGxhY2VCZWZvcmVcdC1cdNC00L5cblx0XHRcdFx0XHRwbGFjZUZpcnN0XHQtXHTQstC90YPRgtGA0Lgg0L/QtdGA0LLRi9C8INC00L7Rh9C10YDQvdC40Lxcblx0XHRcdFx0XHRwbGFjZUxhc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C+0YHQu9C10LTQvdC40Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdH1cblx0fVxuKi9cbmNsYXNzIG5vdENvbXBvbmVudCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKXtcblx0XHRpZiAodGhpcy5vd25lcil7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMub3duZXIuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMub3duZXIgPSBpbnB1dC5vd25lcj9pbnB1dC5vd25lcjpudWxsO1xuXHRcdHRoaXMuaW5pdERhdGEoaW5wdXQuZGF0YSA/IGlucHV0LmRhdGEgOiB7fSk7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnaWQnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2lkJywgT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdudEVsJykpe1xuXHRcdFx0dGhpcy5pbml0TWFya0VsZW1lbnQoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFya0VsZW1lbnQoKXtcblx0XHRsZXQgbWFya0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbnQnKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ250RWwnLCBtYXJrRWwpO1xuXHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRwbGFjZXIubWFpbih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksIFttYXJrRWxdKTtcblx0fVxuXG5cdGluaXRXb3JraW5nKHZhbCkge1xuXHRcdHRoaXMudW5zZXRSZWFkeSh2YWwpO1xuXHR9XG5cblx0cHJlcGFyZVRlbXBsYXRlRWxlbWVudCh2YWwpIHtcblx0XHRpZiAoIXZhbCkge1xuXHRcdFx0dGhpcy51bnNldFJlYWR5KCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2h0bWwnKSAmJiB2YWwuaHRtbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLndyYXAoJycsICcnLCB2YWwuaHRtbCkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdlbCcpICYmIHZhbC5lbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudCh2YWwuZWwuY2xvbmVOb2RlKHRydWUpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnc3JjJykgJiYgdmFsLnNyYykge1xuXHRcdFx0bm90VGVtcGxhdGVDYWNoZS5nZXRGcm9tVVJMKHZhbC5zcmMsIHZhbC5zcmMpXG5cdFx0XHRcdC50aGVuKHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQuYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCduYW1lJykgJiYgdmFsLm5hbWUpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS5nZXQodmFsLm5hbWUpKTtcblx0XHR9XG5cdH1cblxuXHRzZXRQcm90b1RlbXBsYXRlRWxlbWVudChjb250KSB7XG5cdFx0aWYgKGNvbnQpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnLCBjb250KTtcblx0XHRcdHRoaXMudHJpZ2dlcigncmVhZHknKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdXcm9uZyB0ZW1wbGF0ZSBjb250YWluZXIgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JykuY2xvbmVOb2RlKHRydWUpO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdHJlc2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnLCB0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkuY2xvbmVOb2RlKHRydWUpKTtcblx0fVxuXG5cdHNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB0cnVlKTtcblx0fVxuXG5cdHVuc2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIGZhbHNlKTtcblx0fVxuXG5cdGlzUmVhZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncmVhZHknKTtcblx0fVxuXG5cdGNsZWFyUGFydHMoKSB7XG5cdFx0Lyog0LjQt9Cy0LXRidCw0LXQvCDQvtCxINGD0LTQsNC70LXQvdC40Lgg0Y3Qu9C10LzQtdC90YLQvtCyICovXG5cdFx0aWYgKHRoaXNbTUVUQV9QQVJUU10gJiYgQXJyYXkuaXNBcnJheSh0aGlzW01FVEFfUEFSVFNdKSAmJiB0aGlzW01FVEFfUEFSVFNdLmxlbmd0aCkge1xuXHRcdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfUEFSVFNdKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdHJlc2V0UGFydHMoKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXSA9IFtdO1xuXHR9XG5cblx0Z2V0UGFydHMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QQVJUU107XG5cdH1cblxuXHRhZGRQYXJ0KHRlbXBsYXRlKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXS5wdXNoKHRlbXBsYXRlKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMucmVtb3ZlT2Jzb2xldGVQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gdGFyZ2V0IGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRwbGFjZVBhcnQoZGF0YSwgaW5kZXgpe1xuXHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpLFxuXHRcdFx0bm9kZXMgPSBwYXJ0LmdldFN0YXNoKCksXG5cdFx0XHR0YXJnZXRFbCxcblx0XHRcdGxhc3ROb2RlLFxuXHRcdFx0cGxhY2VyO1xuXHRcdGlmIChpbmRleCA9PT0gMCl7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIoT1BUUy5ERUZBVUxUX1BMQUNFUl9MT09QKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScpO1xuXHRcdH1cblx0XHRwbGFjZXIubWFpbih0YXJnZXRFbCwgbm9kZXMpO1xuXG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRwbGFjZU5vZGVzKG5vZGVzKXtcblx0XHRub3RDb21tb24ubG9nKCdwbGFjZWQgcGFydCcsIG5vZGVzKTtcblx0fVxuXG5cdGdldFBsYWNlcihtZXRob2QpIHtcblx0XHRub3RDb21tb24ubG9nKCdzZWFyY2hpbmcgZm9yIHBsYWNlcicsIG1ldGhvZCk7XG5cdFx0aWYgKG5vdFBsYWNlcnMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbbWV0aG9kXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbT1BUUy5ERUZBVUxUX1BMQUNFUl07XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaERhdGEoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldERhdGEoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaFBhcnQoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0UGFydHMoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXRQYXJ0cygpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdNC10YHQu9C4INGBINC00LDQvdC90YvQvNC4INC90LUg0YHQstGP0LfQsNC9INGA0LXQvdC00LXRgNC10YAgLSDRgdC+0LfQtNCw0LXQvFxuXHQqL1xuXG5cdHJlbmRlclBhcnQoZGF0YSkge1xuXHRcdGlmICghdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKSB7XG5cdFx0XHRub3RDb21tb24ubG9nKCdjcmVhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0bGV0IHJlbmRlcmVyID0gbmV3IG5vdFJlbmRlcmVyKHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dGVtcGxhdGU6IHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKSxcblx0XHRcdFx0Y29tcG9uZW50OiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdC8vcmVuZGVyZXIub24oJ29ic29sZXRlJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFkZFBhcnQocmVuZGVyZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRpbmcgcGFydCByZW5kZXInKTtcblx0XHRcdHRoaXMudXBkYXRlUGFydCh0aGlzLmdldFBhcnRCeURhdGEoZGF0YSkpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZVBhcnQocGFydCl7XG5cdFx0cGFydC51cGRhdGUoKTtcblx0fVxuXG5cdHJlbW92ZU9ic29sZXRlUGFydHMoKSB7XG5cdFx0Ly/QutC+0L3QstC10LXRgCDQv9C+0LjRgdC6INCw0LrRgtGD0LDQu9GM0L3Ri9GFIC0g0YPQtNCw0LvQtdC90LjQtSDQvtGB0YLQsNC70YzQvdGL0YVcblx0XHRub3RDb21tb24ucGlwZShcblx0XHRcdHVuZGVmaW5lZCwgLy8gcGFydHMgdG8gc2VhcmNoIGluLCBjYW4gYmUgJ3VuZGVmaW5lZCdcblx0XHRcdFtcblx0XHRcdFx0dGhpcy5maW5kQWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9maXJzdCByb3VuZCwgc2VhcmNoIGZvciBvYnNvbGV0ZVxuXHRcdFx0XHR0aGlzLnJlbW92ZU5vdEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vcmVtb3ZlICdlbVxuXHRcdFx0XVxuXHRcdCk7XG5cdH1cblxuXHQvKlxuXHRcdNC10YHRgtGMINC00LDQvdC90YvQtSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINCw0LrRgtGD0LDQu9GM0L3Qvixcblx0XHTQvdC10YIg0LTQsNC90L3Ri9GFINC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0YHRgtCw0YDRjNGRXG5cdCovXG5cblx0ZmluZEFjdHVhbFBhcnRzKCkge1xuXHRcdGxldCBhY3R1YWxQYXJ0cyA9IFtdO1xuXHRcdHRoaXMuZm9yRWFjaERhdGEoKGRhdGEvKiwgaW5kZXgqLyk9Pntcblx0XHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpO1xuXHRcdFx0aWYgKHBhcnQpe1xuXHRcdFx0XHRhY3R1YWxQYXJ0cy5wdXNoKHBhcnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBhY3R1YWxQYXJ0cztcblx0fVxuXG5cdC8qXG5cdFx00YPQtNCw0LvRj9C10Lwg0LLRgdC1INC60YDQvtC80LUg0LDQutGC0YPQsNC70YzQvdGL0YVcblx0Ki9cblx0cmVtb3ZlTm90QWN0dWFsUGFydHMoYWN0dWFsUGFydHMpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFBhcnRzKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYgKGFjdHVhbFBhcnRzLmluZGV4T2YodGhpcy5nZXRQYXJ0cygpW3RdKSA9PT0gLTEpe1xuXHRcdFx0XHR0aGlzLmdldFBhcnRzKClbdF0uZGVzdHJveSgpO1xuXHRcdFx0XHR0aGlzLmdldFBhcnRzKCkuc3BsaWNlKHQsIDEpO1xuXHRcdFx0XHR0LS07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0UGFydEJ5RGF0YShkYXRhKSB7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzLmdldFBhcnRzKCkpIHtcblx0XHRcdGlmICh0aGlzLmdldFBhcnRzKClbdF0uaXNEYXRhKGRhdGEpKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFBhcnRzKClbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb21wb25lbnQ7XG4iLCJpbXBvcnQgIG5vdENvbXBvbmVudCAgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90Rm9ybUZhY3RvcnkgZXh0ZW5kcyBub3RDb21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuXHRcdHRoaXMuc2V0V29ya2luZyh7fSk7XG5cdFx0dGhpcy5vbignc3VibWl0JywgdGhpcy5vblN1Ym1pdCk7XG5cdFx0dGhpcy5vbigncmVzZXQnLCB0aGlzLm9uUmVzZXQpO1xuXHRcdHRoaXMub24oJ2NhbmNlbCcsIHRoaXMub25DYW5jZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Lypcblx0XHRSZW5kZXJpbmdcblx0Ki9cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0XHR0aGlzLnJlbmRlckNvbXBvbmVudHMoKTtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKXtcblxuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpe1xuXG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdGNvbGxlY3REYXRhKCl7XG5cblx0fVxuXG5cdC8qXG5cdFx0RXZlbnQgaGFuZGxlcnNcblx0Ki9cblxuXHRvblN1Ym1pdCgpe1xuXG5cdH1cblxuXHRvblJlc2V0KCl7XG5cblx0fVxuXG5cdG9uQ2FuY2VsKCl7XG5cblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuY2xhc3Mgbm90VmlldyBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRUZW1wbGF0ZU9wdGlvbnMoKSB7XG5cdFx0dmFyIGRlZmF1bHRSZXN1bHQgPSB7fTtcblx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlT3B0aW9ucycpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlT3B0aW9ucycpICE9PSBudWxsKSA/IHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVPcHRpb25zJyk6IGRlZmF1bHRSZXN1bHQ7XG5cdH1cblxuXHRnZXRQbGFjZVRvUHV0KCkge1xuXHRcdGlmICh0eXBlb2YgdGhpcy5nZXRPcHRpb25zKCdwbGFjZVRvUHV0JykgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0T3B0aW9ucygncGxhY2VUb1B1dCcpICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwbGFjZVRvUHV0Jyk7XG5cdFx0fVxuXHRcdHJldHVybiBkb2N1bWVudC5ib2R5O1xuXHR9XG5cblx0Z2V0QWZ0ZXJFeGVjQ2FsbGJhY2soY2FsbGJhY2spIHtcblx0XHR2YXIgZGVmYXVsdFJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnZGVmYXVsdCB2aWV3IGFmdGVyIGV4ZWMgY2FsbGJhY2snKTtcblx0XHR9O1xuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICd1bmRlZmluZWQnICYmIGNhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gY2FsbGJhY2s7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdGhpcy5nZXRPcHRpb25zKCdhZnRlckV4ZWMnKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRPcHRpb25zKCdhZnRlckV4ZWMnKSAhPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnYWZ0ZXJFeGVjJyk7XG5cdFx0fVxuXHRcdHJldHVybiBkZWZhdWx0UmVzdWx0O1xuXHR9XG5cblx0ZXhlYyhjYWxsYmFjaykge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgbmV3IG5vdENvbXBvbmVudCh0aGlzLmdldFRlbXBsYXRlT3B0aW9ucygpKSk7XG5cdH07XG5cblx0c2V0UGFyYW0obmFtZSwgdmFsdWUpIHtcblx0XHR0aGlzLmdldE9wdGlvbnMobmFtZSwgdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0VGVtcGxhdGVQYXJhbShuYW1lLCB2YWx1ZSkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ3RlbXBsYXRlT3B0aW9ucycsbmFtZSksIHZhbHVlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhcmFtKG5hbWUpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCkuaGFzT3duUHJvcGVydHkobmFtZSkgPyB0aGlzLmdldE9wdGlvbnMobmFtZSkgOiB1bmRlZmluZWQ7XG5cdH1cblxuXHRnZXRQYXJhbXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFZpZXc7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuY2xhc3Mgbm90Q29udHJvbGxlciBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihhcHAsIGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5uY05hbWUgPSAnbmMnICsgKGNvbnRyb2xsZXJOYW1lLmNhcGl0YWxpemVGaXJzdExldHRlcigpKTtcblx0XHR0aGlzLmNvbnRhaW5lclNlbGVjdG9yID0gJy5wYWdlLWNvbnRlbnQnO1xuXHRcdHRoaXMudmlld3NQb3N0Zml4ID0gJy5odG1sJztcblx0XHR0aGlzLnJlbmRlckZyb21VUkwgPSB0cnVlO1xuXHRcdC8qXG5cdFx0ICAgINGB0YDQsNC30YMg0LTQtdC70LDQtdC8INC00L7RgdGC0YPQv9C90YvQvNC4INC80L7QtNC10LvQuCBub3RSZWNvcmQg0LjQtyBuY2BDb250cm9sbGVyTmFtZWAg0LHRg9C00YPRgiDQtNC+0YHRgtGD0L/QvdGLINC60LDQuiB0aGlzLm5yYE1vZGVsTmFtZWBcblx0XHQqL1xuXHRcdHRoaXMuYXBwLmdldEludGVyZmFjZXMoKS5mb3JFYWNoKChpbmRleCwgaW50ZXJmYWMzKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mKCh3aW5kb3dbdGhpcy5uY05hbWVdKSkgIT09ICd1bmRlZmluZWQnKSh3aW5kb3dbdGhpcy5uY05hbWVdKS5wcm90b3R5cGVbaW5kZXhdID0gaW50ZXJmYWMzO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JHJlbmRlcihuYyAvKiBuY05hbWUgZnVuY3Rpb24gdGhpcyovICwgbmFtZSAvKiB2aWV3IG5hbWUgKi8gLCBkYXRhIC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzIC8qIGNvdWxkIGJlIG5vdCByZXByZXNlbnRlZCAqLyAsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIHZpZXcgPSBuYy52aWV3cy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IG5jLnZpZXdzW25hbWVdIDogbnVsbCxcblx0XHRcdHJlYWxDYWxsYmFjayxcblx0XHRcdHJlYWxIZWxwZXJzO1xuXHRcdGlmICh0eXBlb2YgdmlldyA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldyA9PT0gbnVsbCkgcmV0dXJuO1xuXHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0Ly8g0Y3Qu9C10LzQtdC90YLQsCwg0L3QviDQuNC30LLQtdGB0YLQvdC+0Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YDQtVxuXHRcdGlmICgoKHR5cGVvZiB2aWV3LnBsYWNlID09PSAndW5kZWZpbmVkJykgfHwgKHZpZXcucGxhY2UgPT09IG51bGwpKSAmJiAodHlwZW9mIHZpZXcucGxhY2VJZCAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5wbGFjZUlkICE9PSBudWxsICYmIHZpZXcucGxhY2VJZC5sZW5ndGggPiAwKSkge1xuXHRcdFx0dmlldy5wbGFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXcucGxhY2VJZCk7XG5cdFx0fVxuXHRcdC8v0LXRgdC70LggNCDQsNGA0LPRg9C80LXQvdGC0LAg0LfQvdCw0YfQuNGCLCBoZWxwZXJzICDQv9GA0L7Qv9GD0YHRgtC40LvQuFxuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0Ly/Qv9C10YDQtdC90LDQt9C90LDRh9Cw0LXQvCDRgdC+INGB0LTQstC40LPQvtC8XG5cdFx0XHRjYXNlIDQ6XG5cdFx0XHRcdHJlYWxDYWxsYmFjayA9IGhlbHBlcnM7XG5cdFx0XHRcdHJlYWxIZWxwZXJzID0ge307XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHQvL9C/0LXRgNC10L3QsNC30L3QsNGH0LDQtdC8INC90LDQv9GA0Y/QvNGD0Y5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJlYWxIZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0cmVhbENhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0fVxuXHRcdHZpZXcuZGF0YSA9IGRhdGE7XG5cdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdHZpZXcuaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQodmlldy5oZWxwZXJzLCByZWFsSGVscGVycyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZpZXcuaGVscGVycyA9IHJlYWxIZWxwZXJzO1xuXHRcdH1cblx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0aWYgKG5jLnJlbmRlckZyb21VUkwpIHtcblx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3LnRlbXBsYXRlVVJMID09PSAndW5kZWZpbmVkJyB8fCB2aWV3LnRlbXBsYXRlVVJMID09IG51bGwgfHwgdmlldy50ZW1wbGF0ZVVSTC5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHQvL9Cz0LXQvdC10YDQuNGA0YPQtdC8INCw0LTRgNC10YEg0L/QviDRiNCw0LHQu9C+0L3Rg1xuXHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gKHZpZXcuY29tbW9uID8gbmMuY29tbW9uVmlld3NQcmVmaXggOiBuYy52aWV3c1ByZWZpeCkgKyAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiBuYW1lKSArIG5jLnZpZXdzUG9zdGZpeDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly/QsCDQtdGB0LvQuCDQtdGB0YLRjCDQvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwLCDRgtC+XG5cdFx0XHRpZiAodmlldy5oYXNPd25Qcm9wZXJ0eSgndGVtcGxhdGVOYW1lJykpIHtcblx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0dmlldy50ZW1wbGF0ZU5hbWUgPSBuYy52aWV3c1ByZWZpeCArIHZpZXcudGVtcGxhdGVOYW1lICsgbmMudmlld3NQb3N0Zml4O1xuXHRcdFx0fVxuXHRcdH1cblx0XHQobmV3IG5vdENvbXBvbmVudCh2aWV3KSkuZXhlY0FuZFB1dCh2aWV3LnBsYWNlLCByZWFsQ2FsbGJhY2spO1xuXHR9XG5cblx0ZXhlYyhwYXJhbXMpIHtcblx0XHQvL2NvbnNvbGUubG9nKCdleGVjJywgdGhpcywgT2JqZWN0LmtleXModGhpcy5fX3Byb3RvX18pKTtcblx0XHRpZiAodHlwZW9mKCh3aW5kb3dbdGhpcy5uY05hbWVdKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHQvL9C40YnQtdC8INC40LzQtdC90LAg0YDQsNC30LTQtdC70Y/QtdC80YvRhSDRhNGD0L3QutGG0LjQuVxuXHRcdFx0dmFyIHNoYXJlZExpc3QgPSBPYmplY3Qua2V5cyh0aGlzLl9fcHJvdG9fXykuZmlsdGVyKGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0XHRyZXR1cm4gKGtleS5pbmRleE9mKCckJykgPT09IDApO1xuXHRcdFx0fSk7XG5cdFx0XHQvL9C30LDQutC40LTRi9Cy0LDQtdC8INC40YUg0LIg0L3QvtCy0YPRjiDRhNGD0L3QutGG0LjRjlxuXHRcdFx0aWYgKHNoYXJlZExpc3QubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBrIGluIHNoYXJlZExpc3QpIHtcblx0XHRcdFx0XHR3aW5kb3dbdGhpcy5uY05hbWVdLnByb3RvdHlwZVtzaGFyZWRMaXN0W2tdXSA9IHRoaXMuX19wcm90b19fW3NoYXJlZExpc3Rba11dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRuZXcod2luZG93W3RoaXMubmNOYW1lXSkodGhpcy5hcHAsIHBhcmFtcyk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKG5ldyh3aW5kb3dbdGhpcy5uY05hbWVdKSh0aGlzLmFwcCwgcGFyYW1zKSk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdhZnRlciBuZXcgY29udHJvbGxlcicpO1xuXHRcdH0gZWxzZSB7XG5cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29udHJvbGxlcjtcbiIsIi8qIGdsb2JhbCByb3V0aWUgKi9cbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RGb3JtRmFjdG9yeSBmcm9tICcuL2NvbXBvbmVudHMvbm90Rm9ybUZhY3RvcnknO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RWaWV3IGZyb20gJy4vY29tcG9uZW50cy9ub3RWaWV3JztcbmltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4vbm90Q29udHJvbGxlcic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuXG5jb25zdCBPUFRfQ09OVFJPTExFUl9QUkVGSVggPSAnbmMnLFxuXHRPUFRfUkVDT1JEX1BSRUZJWCA9ICducic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEFwcCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3Rvcihub3RNYW5pZmVzdCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgYXBwJyk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdE1hbmlmZXN0KTtcblx0XHR0aGlzLnJlc291cmNlcyA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRpbnRlcmZhY2VzOiB7fSxcblx0XHRcdGNvbnRyb2xsZXJzOiB7fSxcblx0XHRcdGluaXRDb250cm9sbGVyOiBudWxsLFxuXHRcdFx0Y3VycmVudENvbnRyb2xsZXI6IG51bGwsXG5cdFx0XHRmb3Jtczoge31cblx0XHR9KTtcblx0XHR0aGlzLmluaXQoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0dmFyIHVybCA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3RVUkwnKSxcblx0XHRcdHN1Y2Nlc3MgPSB0aGlzLnNldEludGVyZmFjZU1hbmlmZXN0LmJpbmQodGhpcyk7XG5cdFx0bm90Q29tbW9uLmdldEpTT04odXJsLCB7fSlcblx0XHRcdC50aGVuKHN1Y2Nlc3MpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdHNldEludGVyZmFjZU1hbmlmZXN0KG1hbmlmZXN0KSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcsIG1hbmlmZXN0KTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlTWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHQvL9C90YPQttC90L4g0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNGC0Yxcblx0XHQvL9C80L7QtNC10LvQuCDQv9C+0LvRg9GH0LXQvdC90YvQvNC4INC40L3RgtC10YDRhNC10LnRgdCw0LzQuFxuXHRcdHRoaXMudXBkYXRlSW50ZXJmYWNlcygpO1xuXHRcdC8v0YHQvtC30LTQsNC90LjQtSDQvtCx0YrQtdC60YLQvtCyINCw0LLRgtC+0LPQtdC90LXRgNCw0YbQuNGPINGE0L7RgNC8XG5cdFx0dGhpcy5pbml0Rm9ybUJ1aWxkZXJzKCk7XG5cdFx0Ly/QuNC90LjRhtC40LvQuNGG0LjRgNC+0LLQsNGC0Ywg0Lgg0LfQsNC/0YPRgdGC0LjRgtGMINC60L7QvdGC0YDQvtC70LvQtdGAINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG5cdFx0dGhpcy5pbml0Q29udHJvbGxlcigpO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRzdGFydEFwcCgpIHtcblx0XHQvL9GB0L7Qt9C00LDRgtGMINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHQvL9GA0L7Rg9GC0LXRgCDQuCDQv9GA0LjQstGP0LfQsNGC0Ywg0Log0L3QtdC80YMg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdHRoaXMuaW5pdFJvdXRlcigpO1xuXHR9XG5cblx0YmluZENvbnRyb2xsZXIoY29udHJvbGxlck5hbWUpIHtcblx0XHR2YXIgY3RybCA9IG5ldyBub3RDb250cm9sbGVyKHRoaXMsIGNvbnRyb2xsZXJOYW1lKTtcblx0XHRyZXR1cm4gY3RybC5leGVjLmJpbmQoY3RybCk7XG5cdH1cblxuXHRpbml0Q29udHJvbGxlcigpIHtcblx0XHRpZiAodHlwZW9mKHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJywgbmV3IG5vdENvbnRyb2xsZXIodGhpcywgdGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpKSk7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJykuZXhlYygpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRSb3V0ZXIoKSB7XG5cdFx0dmFyIHJvdXRpZUlucHV0ID0ge307XG5cdFx0dGhpcy5nZXRPcHRpb25zKCdzaXRlTWFuaWZlc3QnKS5mb3JFYWNoKChyb3V0ZSwgY29udHJvbGxlck5hbWUpPT57XG5cdFx0XHRyb3V0aWVJbnB1dFtyb3V0ZV0gPSB0aGlzLmJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lKTtcblx0XHR9KTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JvdXRlcicsIHJvdXRpZShyb3V0aWVJbnB1dCkpO1xuXHR9XG5cblx0Z2V0Q3VycmVudENvbnRyb2xsZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInKTtcblx0fVxuXG5cdHNldEN1cnJlbnRDb250cm9sbGVyKGN0cmwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJywgY3RybCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR1cGRhdGVJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuY2xlYXJJbnRlcmZhY2VzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKSkge1xuXHRcdFx0dGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpLmZvckVhY2godGhpcy5pbml0SW50ZXJmYWNlLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGdldFJlY29yZE5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfUkVDT1JEX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRDb250cm9sbGVyTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9DT05UUk9MTEVSX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRpbml0SW50ZXJmYWNlKGluZGV4LCBtYW5pZmVzdCkge1xuXHRcdC8vY29uc29sZS5sb2coaW5kZXgsIG1hbmlmZXN0KTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVt0aGlzLmdldFJlY29yZE5hbWUoaW5kZXgpXSA9IG5ldyBub3RSZWNvcmQobWFuaWZlc3QpO1xuXHR9XG5cblx0bnIobW9kZWxOYW1lLCBkYXRhKSB7XG5cdFx0dmFyIG1hbmlmZXN0ID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpLmhhc093blByb3BlcnR5KG1vZGVsTmFtZSkgPyB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JylbbW9kZWxOYW1lXSA6IHt9O1xuXHRcdC8vY29uc29sZS5sb2cobW9kZWxOYW1lLCBtYW5pZmVzdCwgZGF0YSk7XG5cdFx0cmV0dXJuIG5ldyBub3RSZWNvcmQobWFuaWZlc3QsIGRhdGEpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlcygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJyk7XG5cdH1cblxuXHRjbGVhckludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcmZhY2VzJywge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdEZvcm1CdWlsZGVycygpIHtcblx0XHR0aGlzLmNsZWFyRm9ybUJ1aWxkZXJzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnZm9ybXMnKSkge1xuXHRcdFx0dGhpcy5nZXRPcHRpb25zKCdmb3JtcycpLmZvckVhY2godGhpcy5pbml0Rm9ybUJ1aWxkZXIuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdEZvcm1CdWlsZGVyKGluZGV4LCBtYW5pZmVzdCkge1xuXHRcdGxldCBwYXRoID0gbm90UGF0aC5qb2luKCdmb3JtcycsIGluZGV4KTtcblx0XHR0aGlzLnNldFdvcmtpbmcocGF0aCwgbmV3IG5vdEZvcm1GYWN0b3J5KHRoaXMsIG1hbmlmZXN0KSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKHBhdGgpLmluaXQodGhpcy53YWl0VGhpc1Jlc291cmNlKCdmb3JtJywgaW5kZXgpKTtcblx0fVxuXG5cdGdldEZvcm1CdWlsZGVycygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdmb3JtcycpO1xuXHR9XG5cblx0Y2xlYXJGb3JtQnVpbGRlcnMoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmb3JtcycsIHt9KTtcblx0fVxuXG5cdHdhaXRUaGlzUmVzb3VyY2UodHlwZSwgaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMucmVzb3VyY2VzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG5cdFx0XHR0aGlzLnJlc291cmNlc1t0eXBlXSA9IHt9O1xuXHRcdH1cblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSBmYWxzZTtcblx0XHRyZXR1cm4gdGhpcy5vblJlc291cmNlUmVhZHkuYmluZCh0aGlzLCB0eXBlLCBpbmRleCk7XG5cdH1cblxuXHRvblJlc291cmNlUmVhZHkodHlwZSwgaW5kZXgpIHtcblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSB0cnVlO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRhbGxSZXNvdXJjZXNSZWFkeSgpIHtcblx0XHR2YXIgaSwgajtcblx0XHRmb3IgKGkgaW4gdGhpcy5yZXNvdXJjZXMpIHtcblx0XHRcdGZvciAoaiBpbiB0aGlzLnJlc291cmNlc1tpXSkge1xuXHRcdFx0XHRpZiAoIXRoaXMucmVzb3VyY2VzW2ldW2pdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdvcHRpb25zJyk7XG5cdH1cbn1cbiIsImltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGguanMnO1xuXG52YXIgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliID0ge1xuXHRjb250ZW50OmZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmluZGV4T2YoJ2NhcGl0YWxpemUnKSA+IC0xKXtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdC50b1VwcGVyQ2FzZSgpO1xuXHRcdH1cblx0XHRzY29wZS5lbGVtZW50LnRleHRDb250ZW50ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0O1xuXHR9LFxuXHRiaW5kOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpPT57XG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCl7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe3Njb3BlLCBpdGVtLCBoZWxwZXJzLCBlfSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IGxpdmVFdmVudHMgPSBbJ2NoYW5nZScsICdrZXl1cCddLFxuXHRcdFx0b25FdmVudCA9ICgpPT5ub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgIT09IHRydWUpe1xuXHRcdFx0Zm9yKGxldCB0IG9mIGxpdmVFdmVudHMpe1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodCwgb25FdmVudCk7XG5cdFx0XHR9XG5cdFx0XHRzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cdGF0dHI6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRsZXQgcmVzdWx0ID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoc2NvcGUucGFyYW1zWzBdLCByZXN1bHQpO1xuXHR9LFxuXHRuYW1lOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKC8qc2NvcGUsIGl0ZW0sIGhlbHBlcnMqLyl7XG5cblx0fSxcblx0Y2hlY2tlZDogZnVuY3Rpb24oc2NvcGUvKiwgaXRlbSwgaGVscGVycyovKSB7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID8gc2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKSA6IHNjb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG5cdH0sXG5cdGNsYXNzOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpP3Jlcyh7c2NvcGUsIGl0ZW0sIGhlbHBlcnN9KTpyZXMpO1xuXHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzBdKTtcblx0XHR9XG5cdH0sXG5cdG9wdGlvbnM6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0b3B0aW9uID0gbnVsbCxcblx0XHRcdHZhbHVlRmllbGROYW1lID0gJ3ZhbHVlJyxcblx0XHRcdGxhYmVsRmllbGROYW1lID0gJ25hbWUnLFxuXHRcdFx0c3ViTGliID0gdW5kZWZpbmVkLFxuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGROYW1lJykgPyBoZWxwZXJzWydmaWVsZE5hbWUnXSA6ICd2YWx1ZSc7XG5cdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBoZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWxwZXJzICE9PSBudWxsICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ29wdGlvbicpKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IGhlbHBlcnMub3B0aW9uLmxhYmVsO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBoZWxwZXJzLm9wdGlvbi52YWx1ZTtcblx0XHR9XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAyKSB7XG5cdFx0XHRpdGVtVmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMl07XG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMyAmJiBzY29wZS5wYXJhbXNbM10gPT09ICdkaWZmZXJlbnQnKSB7XG5cdFx0XHRzdWJMaWIgPSB2YWx1ZUZpZWxkTmFtZTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBoZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWxwZXJzICE9PSBudWxsICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkUGxhY2VIb2xkZXInKSAmJiBoZWxwZXJzLmhhc093blByb3BlcnR5KCdmaWVsZFBsYWNlSG9sZGVyRGVmYXVsdCcpICYmIGhlbHBlcnMuZmllbGRQbGFjZUhvbGRlckRlZmF1bHQpIHtcblx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyk7XG5cdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBoZWxwZXJzLmZpZWxkUGxhY2VIb2xkZXI7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0dmFyIGxpYiA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0aWYgKC8qZGlmZmVyZW50ICYmKi8gc3ViTGliICYmIGxpYi5oYXNPd25Qcm9wZXJ0eShzdWJMaWIpKSB7XG5cdFx0XHRcdGxpYiA9IGxpYltzdWJMaWJdO1xuXHRcdFx0fVxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxpYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKTtcblx0XHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gbGliW2ldW2xhYmVsRmllbGROYW1lXTtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdKSkge1xuXHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0uaW5kZXhPZihsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdID09PSBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSB7XG5cdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuZXhwb3J0IGRlZmF1bHQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliO1xuIiwiaW1wb3J0ICBub3RDb21wb25lbnQgIGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEZvcm0gZXh0ZW5kcyBub3RDb21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuXHRcdHRoaXMuc2V0V29ya2luZyh7fSk7XG5cdFx0dGhpcy5vbignc3VibWl0JywgdGhpcy5vblN1Ym1pdCk7XG5cdFx0dGhpcy5vbigncmVzZXQnLCB0aGlzLm9uUmVzZXQpO1xuXHRcdHRoaXMub24oJ2NhbmNlbCcsIHRoaXMub25DYW5jZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Lypcblx0XHRSZW5kZXJpbmdcblx0Ki9cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0XHR0aGlzLnJlbmRlckNvbXBvbmVudHMoKTtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKXtcblxuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpe1xuXG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdGNvbGxlY3REYXRhKCl7XG5cblx0fVxuXG5cdC8qXG5cdFx0RXZlbnQgaGFuZGxlcnNcblx0Ki9cblxuXHRvblN1Ym1pdCgpe1xuXG5cdH1cblxuXHRvblJlc2V0KCl7XG5cblx0fVxuXG5cdG9uQ2FuY2VsKCl7XG5cblx0fVxufVxuIiwiaW1wb3J0IG5vdENvbXBvbmVudCAgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90VGFibGUgZXh0ZW5kcyBub3RDb21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuIiwiLypcblx0Q29tbW9uIGZ1bmN0aW9uc1xuKi9cbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuLypcblx0ZnJhbWV3b3JrIHdpZGUgcGFyc2VyIGZvciBkYXRhIGFjY2Vzc1xuKi9cbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuLypcblx0YmFzaWMgZXZlbnQgaGFuZGxlcnMgYW5kIGNvcmUgZGF0YSBtb2RpZmllcnNcbiovXG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuLypcblx0c21hcnRlciBpbWFnZSBjb250cm9sXG4qL1xuaW1wb3J0IG5vdEltYWdlIGZyb20gJy4vdGVtcGxhdGUvbm90SW1hZ2UnO1xuLypcblx0YXBwbGljYXRpb24gbWFpbiBpbmZyYXN0cnVjdHVyZSBzZXR0ZXJcbiovXG5pbXBvcnQgbm90QXBwIGZyb20gJy4vbm90QXBwJztcbi8qXG5cdGRhZGR5IGZvciB1c2VyIGNvbnRyb2xsZXJzXG4qL1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi9ub3RDb250cm9sbGVyJztcbi8qXG5cdHRlbXBsYXRpbmcgYW5kIGNvbW1vbiBzdHJ1Y3R1cmVzXG4qL1xuXG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RSZW5kZXJlcic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnOyAvLyBzbWFydGVyIHdpdGggYmluZGluZ3MgZm9yIGV2ZW50cywgYWN0dWFseSBwcm94eVxuXG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbm90Rm9ybSc7XG5pbXBvcnQgbm90VGFibGUgZnJvbSAnLi9jb21wb25lbnRzL25vdFRhYmxlJztcbmltcG9ydCBub3RWaWV3IGZyb20gJy4vY29tcG9uZW50cy9ub3RWaWV3JztcblxuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7IC8vXHRob3cgdG8gaW50ZXJhY3Qgd2l0aCBkYXRhIG9uIHNlcnZlclxuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7IC8vXHR3cmFwcGVyIGZvciBkYXRhIHdpdGggc2VydmVyPC0+dmlldyBsaXZlIGludGVyYWN0aW9uc1xuXG5ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuYWRkKG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYik7XG5cbmV4cG9ydCB7XG5cdG5vdENvbW1vbixcblx0bm90UGF0aCxcblx0bm90QmFzZSxcblx0bm90SW1hZ2UsXG5cdG5vdEFwcCxcblx0bm90QVBJLFxuXHRub3RDb250cm9sbGVyLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnMsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYixcblx0bm90VGVtcGxhdGVDYWNoZSxcblx0bm90UmVuZGVyZXIsXG5cdG5vdENvbXBvbmVudCxcblx0bm90Rm9ybSxcblx0bm90VGFibGUsXG5cdG5vdFZpZXcsXG5cdG5vdFJlY29yZCxcblx0bm90UmVjb3JkSW50ZXJmYWNlXG59O1xuIl0sIm5hbWVzIjpbIkNvbW1vbk5ldHdvcmsiLCJ1cmkiLCJnZXQiLCJkYXRhQXJyYXkiLCJmaWVsZHMiLCJpIiwiZiIsImhhc093blByb3BlcnR5IiwiaW1hZ2UiLCJJbWFnZSIsInNldEF0dHJpYnV0ZSIsInNyYyIsImluZGV4T2YiLCJhZGRQcm90b2NvbCIsIm1ldGhvZCIsInVybCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJnZXRTZXNzaW9uSUQiLCJyZXNwb25zZVR5cGUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJvbmxvYWQiLCJzdGF0dXMiLCJyZXNwb25zZSIsInQiLCJvbmVycm9yIiwib250aW1lb3V0Iiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGF0IiwiQ29tbW9uTG9ncyIsImxvZyIsImFyZ3VtZW50cyIsImVycm9yIiwidHJhY2UiLCJNQVBfTUFOQUdFUiIsIlN5bWJvbCIsIkNvbW1vblNob3J0cyIsImdldE1hbmFnZXIiLCJnZXRBUEkiLCJ2IiwiQ29tbW9uT2JqZWN0cyIsImRlZmF1bHRzIiwib3B0aW9ucyIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImNhbGwiLCJ0YXJnZXQiLCJzb3VyY2VzIiwiZm9yRWFjaCIsImRlc2NyaXB0b3JzIiwia2V5cyIsInNvdXJjZSIsInJlZHVjZSIsImtleSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldE93blByb3BlcnR5U3ltYm9scyIsImRlc2NyaXB0b3IiLCJzeW0iLCJlbnVtZXJhYmxlIiwiZGVmaW5lUHJvcGVydGllcyIsImJpZyIsInNtYWxsIiwib2JqIiwiZmlsdGVyIiwiY29udGFpbnNPYmoiLCJpY29ucyIsImJhdGNoIiwibGVuZ3RoIiwiZ2V0RGF0YSIsInB1c2giLCJhIiwiYiIsInAiLCJlcXVhbCIsInRvU3RyaW5nIiwiZGVmYXVsdFZhbHVlIiwib2JqMSIsIm9iajIiLCJqUXVlcnkiLCJleHRlbmQiLCJ2YWwiLCJyZWdpc3RyeSIsIkNvbW1vblN0cmluZ3MiLCJzdHJpbmciLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIm5vdENvbW1vbiIsImFzc2lnbiIsImV4dGVuZFdpdGgiLCJTVUJfUEFUSF9TVEFSVCIsIlNVQl9QQVRIX0VORCIsIlBBVEhfU1BMSVQiLCJQQVRIX1NUQVJUX09CSkVDVCIsIlBBVEhfU1RBUlRfSEVMUEVSUyIsIkZVTkNUSU9OX01BUktFUiIsIk1BWF9ERUVQIiwibm90UGF0aCIsInBhdGgiLCJzdWJQYXRoIiwiZmluZCIsInN1YiIsInBhcnNlZCIsInN1YmYiLCJyZXBsYWNlIiwiaXRlbSIsImhlbHBlcnMiLCJzdWJQYXRoUGFyc2VkIiwiZmluZE5leHRTdWJQYXRoIiwiZ2V0VmFsdWVCeVBhdGgiLCJyZXBsYWNlU3ViUGF0aCIsInBhcnNlU3VicyIsImF0dHJWYWx1ZSIsInNldFZhbHVlQnlQYXRoIiwiaXNSZWNvcmQiLCJub3JtaWxpemVQYXRoIiwidHJpZ2dlciIsInN0ZXAiLCJoZWxwZXIiLCJyU3RlcCIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsInNwbGl0IiwicGFyc2VQYXRoU3RlcCIsIm9iamVjdCIsImF0dHJQYXRoIiwiYXR0ck5hbWUiLCJzaGlmdCIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfRVZFTlRTIiwiTUVUQV9EQVRBIiwiTUVUQV9XT1JLSU5HIiwiTUVUQV9PUFRJT05TIiwibm90QmFzZSIsIndoYXQiLCJzZXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsIm5hbWUiLCJmcm9tIiwiZXZlbnROYW1lIiwiZXZlbnQiLCJvZmYiLCJjYWxsYmFja3MiLCJjYWxsYmFjayIsInRhcmdldElkIiwic3BsaWNlIiwibm90QVBJT3B0aW9ucyIsIm5vdEFQSVF1ZWUiLCJyZXF1ZXN0c1BlclNlY29uZCIsInF1ZWUiLCJpbnQiLCJ3aW5kb3ciLCJzZXRJbnRlcnZhbCIsImNoZWNrIiwiYmluZCIsImluUHJvZ3Jlc3MiLCJ0b0NhbGwiLCJjbGVhckludGVydmFsIiwicnVuIiwibm90QVBJIiwic2V0T3B0aW9ucyIsInBhcnRzIiwiaWQiLCJnb29kIiwiYmFkIiwiYWRkIiwibWFrZVJlcXVlc3QiLCJyZXNwb25zZU9LIiwicmVzcG9uc2VGYWlsZWQiLCJyZXF1ZXN0SlNPTiIsInRoZW4iLCJuZXh0IiwiY2F0Y2giLCJjb2RlIiwiZ2V0SWQiLCJtb2RlbE5hbWUiLCJnZXRNb2RlbE5hbWUiLCJtYWtlVXJsIiwiZ2V0SlNPTiIsImdldE1vZGVsIiwic2V0UHJpY2UiLCJtb2RlbCIsIm5vdEltYWdlIiwibm90SW50ZXJmYWNlIiwibWFuaWZlc3QiLCJsaW5lIiwicmVjb3JkIiwiYWN0aW9uTmFtZSIsInJlY29yZFJFIiwiZmllbGROYW1lIiwiaW5kIiwibGVuIiwiaW5kMiIsInN0YXJ0U2xpY2UiLCJlbmRTbGljZSIsImdldEF0dHIiLCJhY3Rpb25EYXRhIiwicGFyc2VMaW5lIiwicG9zdEZpeCIsImdldEFjdGlvbnMiLCJhY3Rpb25zIiwidmFsdWUiLCJzZXRGaWx0ZXIiLCJmaWx0ZXJEYXRhIiwic2V0TW9kZWxQYXJhbSIsImdldE1vZGVsUGFyYW0iLCJzb3J0ZXJEYXRhIiwicGFnZU51bWJlciIsInBhZ2VTaXplIiwicGFyYW1OYW1lIiwicGFyYW1WYWx1ZSIsImdldEFjdGlvbkRhdGEiLCJnZXRVUkwiLCJxdWVlUmVxdWVzdCIsIm9uTG9hZCIsIm5vdFJlY29yZCIsIk1FVEFfSU5URVJGQUNFIiwiTUVUQV9QUk9YWSIsIk1FVEFfQ0hBTkdFIiwiTUVUQV9DSEFOR0VfTkVTVEVEIiwiTUVUQV9TQUwiLCJERUZBVUxUX0FDVElPTl9QUkVGSVgiLCJERUZBVUxUX1BBR0VfTlVNQkVSIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzIiwib3duZXIiLCJjb250ZXh0IiwicmVzVGFyZ2V0IiwiUmVmbGVjdCIsIkVycm9yIiwidmFsdWVUb1JlZmxlY3QiLCJub3RQcm9wZXJ0eSIsImdldFJvb3QiLCJwYXRoVG8iLCJpc1Byb3h5IiwiUHJveHkiLCJzZXREYXRhIiwib24iLCJyZXR1cm5Ub1Jvb3QiLCJwcm94eSIsImNyZWF0ZVJlY29yZEhhbmRsZXJzIiwiY3JlYXRlQ29sbGVjdGlvbiIsIm5vdFJlY29yZEludGVyZmFjZSIsImluaXRQcm9wZXJ0aWVzIiwiaW50ZXJmYWNlVXAiLCJjdXJQYXRoIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsIml0ZW1zIiwiY29sbGVjdGlvbiIsImdldEFjdGlvbnNDb3VudCIsImFjdGlvblVwIiwiaW5kZXgiLCJyZXF1ZXN0Iiwib2JqZWN0UGFydCIsInNldEF0dHIiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgiLCJURU1QTEFURV9UQUciLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCIsIkNPTVBPTkVOVF9JRF9QUkVGSVgiLCJQQVJUX0lEX1BSRUZJWCIsIkRFRkFVTFRfUExBQ0VSIiwiREVGQVVMVF9QTEFDRVJfTE9PUCIsIk9QVFMiLCJNRVRBX0NBQ0hFIiwibm90VGVtcGxhdGVDYWNoZSIsInNldFdvcmtpbmciLCJoaWRlVGVtcGxhdGVzIiwicmVnaXN0ZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJtYXAiLCJsb2FkT25lIiwib1JlcXVlc3QiLCJhZGRFdmVudExpc3RlbmVyIiwiZGl2IiwiZGF0YXNldCIsIm5vdFRlbXBsYXRlTmFtZSIsIm5vdFRlbXBsYXRlVVJMIiwic3JjRWxlbWVudCIsInJlc3BvbnNlVGV4dCIsInNldE9uZSIsImVsZW1lbnQiLCJjbG9uZU5vZGUiLCJjb250IiwidGV4dCIsIm5vdFRlbXBsYXRlc0VsZW1lbnRzIiwicGFyZW50Tm9kZSIsImxpYiIsImdldEhUTUwiLCJ0ZW1wbGF0ZUlubmVySFRNTCIsInRlbXBsYXRlQ29udEVsIiwid3JhcCIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsIk1FVEFfUFJPQ0VTU09SUyIsIm5vdFRlbXBsYXRlUHJvY2Vzc29ycyIsInNldFByb2Nlc3NvciIsImdldFByb2Nlc3NvciIsIk1FVEFfQ09NUE9ORU5UUyIsIm5vdFJlbmRlcmVyIiwiaW5wdXQiLCJpbml0IiwicmVuZGVyIiwiY29tcG9uZW50IiwiaW5pdERhdGEiLCJpbml0T3B0aW9ucyIsImluaXRXb3JraW5nIiwidGVtcGxhdGUiLCJpbml0VGVtcGxhdGUiLCJvbkNoYW5nZSIsIk1hdGgiLCJyYW5kb20iLCJnZXRCcmVhZENydW1wcyIsInVwZGF0ZSIsImNsZWFyU3Rhc2giLCJzZXRXb3JraW5nTWFwcGluZyIsImV4ZWNQcm9jZXNzb3JzIiwic2VhcmNoRm9yU3ViVGVtcGxhdGVzIiwic3Rhc2hSZW5kZXJlZCIsImlmUGFydCIsImNvbXBvbmVudFBhdGgiLCJjaGFuZ2VkUGF0aCIsImlmRnVsbFN1YlBhdGgiLCJjcmVhdGVNYXBwaW5nIiwiZmluZEFsbFByb2Nlc3NvcnMiLCJwcm9jcyIsImVscyIsImdldEF0dHJpYnV0ZXNTdGFydHNXaXRoIiwiZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCIsInByb2NEYXRhIiwicGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uIiwicHJvY2Vzc29yRXhwcmVzc2lvbiIsImF0dHJpYnV0ZUV4cHJlc3Npb24iLCJpZkNvbmRpdGlvbiIsInBhcmFtcyIsInByb2Nlc3Nvck5hbWUiLCJtYXBwaW5nIiwicHJvY1Njb3BlIiwiYXR0cmlidXRlUmVzdWx0IiwiZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdCIsInByb2NOYW1lIiwicHJvYyIsInJlbW92ZUF0dHJpYnV0ZSIsImRlc3Ryb3lTdWJzIiwiZGVzdHJveSIsImNsZWFyU3ViVGVtcGxhdGVzIiwiZ2V0U3Rhc2giLCJyZW1vdmVDaGlsZCIsIm50RWwiLCJudFJlbmRlcmVkIiwic3VicyIsIm50IiwiaWZTdWJFbGVtZW50UmVuZGVyZWQiLCJyZW5kZXJTdWIiLCJkZXRhaWxzIiwiZGF0YVBhdGgiLCJub3RDb21wb25lbnQiLCJjaGlsZE5vZGVzIiwiYWRkVG9TdGFzaCIsInN0YXNoIiwibmV3U3Rhc2giLCJhbmNob3IiLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsIm5vZGUiLCJwbGFjZSIsInRhcmdldEVsIiwiY2hpbGRyZW4iLCJyZW5kZXJlZCIsInBsYWNlQWZ0ZXIiLCJwbGFjZUJlZm9yZSIsInBsYWNlRmlyc3QiLCJwbGFjZUxhc3QiLCJub3RQbGFjZXJzIiwiTUVUQV9QQVJUUyIsInJlc2V0UGFydHMiLCJwcmVwYXJlVGVtcGxhdGVFbGVtZW50IiwiaW5pdE1hcmtFbGVtZW50IiwibWFya0VsIiwicGxhY2VyIiwiZ2V0UGxhY2VyIiwibWFpbiIsInVuc2V0UmVhZHkiLCJodG1sIiwic2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJnZXRGcm9tVVJMIiwicmVwb3J0IiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJjbGVhclBhcnRzIiwiZm9yRWFjaERhdGEiLCJyZW5kZXJQYXJ0IiwicGxhY2VSZW5kZXJlZCIsInJlbW92ZU9ic29sZXRlUGFydHMiLCJwbGFjZVBhcnQiLCJwYXJ0IiwiZ2V0UGFydEJ5RGF0YSIsIm5vZGVzIiwibGFzdE5vZGUiLCJub2RlVHlwZSIsImdldFBhcnRzIiwicmVuZGVyZXIiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lIiwiYWRkUGFydCIsInVwZGF0ZVBhcnQiLCJwaXBlIiwiZmluZEFjdHVhbFBhcnRzIiwicmVtb3ZlTm90QWN0dWFsUGFydHMiLCJhY3R1YWxQYXJ0cyIsImlzRGF0YSIsIm5vdEZvcm1GYWN0b3J5Iiwib25TdWJtaXQiLCJvblJlc2V0Iiwib25DYW5jZWwiLCJyZW5kZXJXcmFwcGVyIiwicmVuZGVyQ29tcG9uZW50cyIsIm5vdFZpZXciLCJkZWZhdWx0UmVzdWx0IiwiYm9keSIsImdldFRlbXBsYXRlT3B0aW9ucyIsIm5vdENvbnRyb2xsZXIiLCJhcHAiLCJjb250cm9sbGVyTmFtZSIsIm5jTmFtZSIsImNhcGl0YWxpemVGaXJzdExldHRlciIsImNvbnRhaW5lclNlbGVjdG9yIiwidmlld3NQb3N0Zml4IiwicmVuZGVyRnJvbVVSTCIsImdldEludGVyZmFjZXMiLCJpbnRlcmZhYzMiLCJuYyIsInZpZXciLCJ2aWV3cyIsInJlYWxDYWxsYmFjayIsInJlYWxIZWxwZXJzIiwicGxhY2VJZCIsImdldEVsZW1lbnRCeUlkIiwidGVtcGxhdGVVUkwiLCJjb21tb24iLCJjb21tb25WaWV3c1ByZWZpeCIsInZpZXdzUHJlZml4IiwidGVtcGxhdGVOYW1lIiwiZXhlY0FuZFB1dCIsInNoYXJlZExpc3QiLCJfX3Byb3RvX18iLCJrIiwiT1BUX0NPTlRST0xMRVJfUFJFRklYIiwiT1BUX1JFQ09SRF9QUkVGSVgiLCJub3RBcHAiLCJub3RNYW5pZmVzdCIsInJlc291cmNlcyIsInN1Y2Nlc3MiLCJzZXRJbnRlcmZhY2VNYW5pZmVzdCIsInVwZGF0ZUludGVyZmFjZXMiLCJpbml0Rm9ybUJ1aWxkZXJzIiwiaW5pdENvbnRyb2xsZXIiLCJhbGxSZXNvdXJjZXNSZWFkeSIsInN0YXJ0QXBwIiwiaW5pdFJvdXRlciIsImN0cmwiLCJleGVjIiwicm91dGllSW5wdXQiLCJyb3V0ZSIsImJpbmRDb250cm9sbGVyIiwicm91dGllIiwiY2xlYXJJbnRlcmZhY2VzIiwiaW5pdEludGVyZmFjZSIsImdldFJlY29yZE5hbWUiLCJjbGVhckZvcm1CdWlsZGVycyIsImluaXRGb3JtQnVpbGRlciIsIndhaXRUaGlzUmVzb3VyY2UiLCJ0eXBlIiwib25SZXNvdXJjZVJlYWR5Iiwibm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIiwic2NvcGUiLCJ0ZXh0Q29udGVudCIsImUiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImxpdmVFdmVudHMiLCJvbkV2ZW50IiwicHJvY2Vzc2VkVmFsdWUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJvcHRpb24iLCJ2YWx1ZUZpZWxkTmFtZSIsImxhYmVsRmllbGROYW1lIiwic3ViTGliIiwiaXRlbVZhbHVlRmllbGROYW1lIiwibGFiZWwiLCJmaWVsZFBsYWNlSG9sZGVyRGVmYXVsdCIsImZpZWxkUGxhY2VIb2xkZXIiLCJub3RGb3JtIiwibm90VGFibGUiXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWE7U0FDZCxLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFhO1NBQ2xCLEtBQUtDLEdBQUwsQ0FBUyxVQUFULElBQXVCRCxHQUE5QjtFQUxrQjtnQkFPSix1QkFBU0UsU0FBVCxFQUFvQkMsTUFBcEIsRUFBNEI7T0FDdEMsSUFBSUMsQ0FBUixJQUFhRixTQUFiLEVBQXdCO1FBQ25CLElBQUlHLENBQVIsSUFBYUYsTUFBYixFQUFxQjtRQUNqQkQsVUFBVUUsQ0FBVixFQUFhRSxjQUFiLENBQTRCSCxPQUFPRSxDQUFQLENBQTVCLENBQUgsRUFBMkM7U0FDdENFLFFBQVEsSUFBSUMsS0FBSixFQUFaO1dBQ01DLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsV0FBbEM7V0FDTUMsR0FBTixHQUFZUixVQUFVRSxDQUFWLEVBQWFELE9BQU9FLENBQVAsQ0FBYixFQUF3Qk0sT0FBeEIsQ0FBZ0MsSUFBaEMsTUFBMEMsQ0FBMUMs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
