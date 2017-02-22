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
		if (item && item.isProxy) {
			var _ret2;

			return _ret2 = item, possibleConstructorReturn(_this, _ret2);
		}
		_this.setOptions({
			getRoot: getRoot,
			path: pathTo
		});
		_this[META_PROXY] = new Proxy(item, createPropertyHandlers(_this));
		_this.setData(item);
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
			/*notCommon.log(this);
   notCommon.log(this.getBreadCrumps().join(' > '));
   notCommon.log('updating renderer ', this.getWorking('partId'), ' after changes', key, value);*/
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
			//notCommon.log('placed part', nodes);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9pbmRleC5qcyIsIi4uL3NyYy9ub3RQYXRoLmpzIiwiLi4vc3JjL25vdEJhc2UuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy9ub3RSZWNvcmRJbnRlcmZhY2UuanMiLCIuLi9zcmMvbm90UmVjb3JkLmpzIiwiLi4vc3JjL3RlbXBsYXRlL29wdGlvbnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90UmVuZGVyZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlQWZ0ZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUJlZm9yZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlRmlyc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUxhc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9yZXBsYWNlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvaW5kZXguanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90Q29tcG9uZW50LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybUZhY3RvcnkuanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RWaWV3LmpzIiwiLi4vc3JjL25vdENvbnRyb2xsZXIuanMiLCIuLi9zcmMvbm90QXBwLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdEZvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29tbW9uTmV0d29yayA9IHtcblx0YWRkSG9zdDogZnVuY3Rpb24odXJpKXtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ2hvc3QnKSArIHVyaTtcblx0fSxcblx0YWRkUHJvdG9jb2w6IGZ1bmN0aW9uKHVyaSl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvcih2YXIgaSBpbiBkYXRhQXJyYXkpIHtcblx0XHRcdGZvcih2YXIgZiBpbiBmaWVsZHMpIHtcblx0XHRcdFx0aWYoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRsZXQgdGhhdCA9IHRoaXM7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUFVUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldFNlc3Npb25JRDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9LFxufTtcbmV4cG9ydCBkZWZhdWx0IENvbW1vbk5ldHdvcms7XG4iLCJ2YXIgQ29tbW9uTG9ncyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fSxcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHRyYWNlOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFQX01BTkFHRVIgPSBTeW1ib2woJ01BUF9NQU5BR0VSJyk7XG5cbnZhciBDb21tb25TaG9ydHMgPSB7XG5cdGdldEFQSTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TWFuYWdlcigpLmdldEFQSSgpO1xuXHR9LFxuXHRzZXRNYW5hZ2VyOiBmdW5jdGlvbih2KSB7XG5cdFx0dGhpc1tNQVBfTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQVBfTUFOQUdFUl07XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25TaG9ydHM7XG4iLCIvKiBnbG9iYWwgalF1ZXJ5ICovXG52YXIgQ29tbW9uT2JqZWN0cyA9IHtcblx0ZXh0ZW5kOiBmdW5jdGlvbihkZWZhdWx0cywgb3B0aW9ucykge1xuXHRcdHZhciBleHRlbmRlZCA9IHt9O1xuXHRcdHZhciBwcm9wO1xuXHRcdGZvciAocHJvcCBpbiBkZWZhdWx0cykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkZWZhdWx0cywgcHJvcCkpIHtcblx0XHRcdFx0ZXh0ZW5kZWRbcHJvcF0gPSBkZWZhdWx0c1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChwcm9wIGluIG9wdGlvbnMpIHtcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywgcHJvcCkpIHtcblx0XHRcdFx0ZXh0ZW5kZWRbcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZXh0ZW5kZWQ7XG5cdH0sXG5cdGNvbXBsZXRlQXNzaWduOiBmdW5jdGlvbih0YXJnZXQsIC4uLnNvdXJjZXMpIHtcblx0XHRzb3VyY2VzLmZvckVhY2goc291cmNlID0+IHtcblx0XHRcdGxldCBkZXNjcmlwdG9ycyA9IE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKChkZXNjcmlwdG9ycywga2V5KSA9PiB7XG5cdFx0XHRcdGRlc2NyaXB0b3JzW2tleV0gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KTtcblx0XHRcdFx0cmV0dXJuIGRlc2NyaXB0b3JzO1xuXHRcdFx0fSwge30pO1xuXHRcdFx0Ly8gYnkgZGVmYXVsdCwgT2JqZWN0LmFzc2lnbiBjb3BpZXMgZW51bWVyYWJsZSBTeW1ib2xzIHRvb1xuXHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZvckVhY2goc3ltID0+IHtcblx0XHRcdFx0bGV0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKTtcblx0XHRcdFx0aWYgKGRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuXHRcdFx0XHRcdGRlc2NyaXB0b3JzW3N5bV0gPSBkZXNjcmlwdG9yO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgZGVzY3JpcHRvcnMpO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0YXJnZXQ7XG5cdH0sXG5cdGV4dGVuZFdpdGg6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRcdGZvciAobGV0IHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcblx0XHRcdFx0dGhpc1twcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGNvbnRhaW5zT2JqOiBmdW5jdGlvbihiaWcsIHNtYWxsKSB7XG5cdFx0Zm9yICh2YXIgdCBpbiBzbWFsbCkge1xuXHRcdFx0aWYgKHNtYWxsLmhhc093blByb3BlcnR5KHQpKSB7XG5cdFx0XHRcdGlmICgoIWJpZy5oYXNPd25Qcm9wZXJ0eSh0KSkgfHwgKGJpZ1t0XSAhPT0gc21hbGxbdF0pKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRmaWx0ZXI6IGZ1bmN0aW9uKG9iaiwgZmlsdGVyKSB7XG5cdFx0aWYgKGZpbHRlciAmJiBvYmopIHtcblx0XHRcdHJldHVybiB0aGlzLmNvbnRhaW5zT2JqKG9iaiwgZmlsdGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbmRJY29uQnlGaWx0ZXI6IGZ1bmN0aW9uKGljb25zLCBmaWx0ZXIpIHtcblx0XHR2YXIgYmF0Y2ggPSBbXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGljb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAodGhpcy5maWx0ZXIoaWNvbnNbaV0uZ2V0RGF0YSgpLCBmaWx0ZXIpKSB7XG5cdFx0XHRcdGJhdGNoLnB1c2goaWNvbnNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYmF0Y2g7XG5cdH0sXG5cdGVxdWFsT2JqOiBmdW5jdGlvbihhLCBiKSB7XG5cdFx0dmFyIHA7XG5cdFx0Zm9yIChwIGluIGEpIHtcblx0XHRcdGlmICh0eXBlb2YoYltwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKGFbcF0pIHtcblx0XHRcdFx0c3dpdGNoICh0eXBlb2YoYVtwXSkpIHtcblx0XHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2FzZSAnZnVuY3Rpb24nOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YoYltwXSkgPT0gJ3VuZGVmaW5lZCcgfHxcblx0XHRcdFx0XHRcdFx0KHAgIT0gJ2VxdWFscycgJiYgYVtwXS50b1N0cmluZygpICE9IGJbcF0udG9TdHJpbmcoKSkpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChhW3BdICE9IGJbcF0pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGJbcF0pXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAocCBpbiBiKSB7XG5cdFx0XHRpZiAodHlwZW9mKGFbcF0pID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGRlZmluZUlmTm90RXhpc3RzOiBmdW5jdGlvbihvYmosIGtleSwgZGVmYXVsdFZhbHVlKSB7XG5cdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0b2JqW2tleV0gPSBkZWZhdWx0VmFsdWU7XG5cdFx0fVxuXHR9LFxuXHRkZWVwTWVyZ2U6IGZ1bmN0aW9uKG9iajEsIG9iajIpIHtcblx0XHRyZXR1cm4galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgb2JqMSwgb2JqMik7XG5cdH0sXG5cblx0cmVnaXN0cnk6IHt9LFxuXHRyZWdpc3RlcjogZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0XHR0aGlzLnJlZ2lzdHJ5W2tleV0gPSB2YWw7XG5cdH0sXG5cblx0Z2V0OiBmdW5jdGlvbihrZXkpIHtcblx0XHRyZXR1cm4gdGhpcy5yZWdpc3RyeS5oYXNPd25Qcm9wZXJ0eShrZXkpID8gdGhpcy5yZWdpc3RyeVtrZXldIDogbnVsbDtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblN0cmluZ3M7XG4iLCJ2YXIgQ29tbW9uRnVuY3Rpb25zID0ge1xuXHRwaXBlOiBmdW5jdGlvbihkYXRhLyogZmVlZCBkYXRhICovLCBmdW5jcy8qIGZ1bmN0aW9ucyBhcnJheSAqLykge1xuXHRcdGxldCByZXN1bHQ7XG5cdFx0Zm9yKGxldCBmdW5jIG9mIGZ1bmNzKXtcblx0XHRcdHJlc3VsdCA9IGZ1bmMocmVzdWx0IHx8IGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRnVuY3Rpb25zO1xuIiwidmFyIENvbW1vbkRPTSA9IHtcblx0Z2V0QXR0cmlidXRlc1N0YXJ0c1dpdGg6IGZ1bmN0aW9uKGVsLCBzdGFydHNXaXRoKSB7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihzdGFydHNXaXRoKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwiaW1wb3J0IENvbW1vbk5ldHdvcmsgZnJvbSAnLi9uZXQuanMnO1xuaW1wb3J0IENvbW1vbkxvZ3MgZnJvbSAnLi9sb2dzLmpzJztcbmltcG9ydCBDb21tb25TaG9ydHMgZnJvbSAnLi9zaG9ydHMuanMnO1xuaW1wb3J0IENvbW1vbk9iamVjdHMgZnJvbSAnLi9vYmplY3RzLmpzJztcbmltcG9ydCBDb21tb25TdHJpbmdzIGZyb20gJy4vc3RyaW5ncy5qcyc7XG5pbXBvcnQgQ29tbW9uRnVuY3Rpb25zIGZyb20gJy4vZnVuY3Rpb25zLmpzJztcbmltcG9ydCBDb21tb25ET00gZnJvbSAnLi9kb20uanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tbW9uO1xuIiwiLypcblx0OnByb3BlcnR5LnN1YjEuZnVuYygpLmZ1bmNQcm9wXG5cdCA9IHJldHVybiBmdW5jUHJvcCBvZiBmdW5jdGlvbiByZXN1bHQgb2Ygc3ViMSBwcm9wZXJ0eSBvZiBwcm9wZXJ0eSBvZiBvYmplY3Rcblx0Ons6OmhlbHBlclZhbH0uc3ViXG5cdCA9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgcHJvcGVydHkgb2YgaGVscGVycyBvYmplY3Rcblx0Ons6OmhlbHBlckZ1bmMoKX0uc3ViXG5cdD0gcmV0dXJuIHN1YiBwcm9wZXJ0eSBvZiBvYmplY3QgcHJvcGVydHkgd2l0aCBuYW1lIHJldHJpZXZlZCBmcm9tIGhlbHBlclZhbCBmdW5jdGlvbiByZXN1bHQgb2YgaGVscGVycyBvYmplY3QuXG5cdGlmIGhlbHBlcnNGdW54IHJldHVybiAnY2FyJyB0aGVuIHNvdXJjZSBwYXRoIGJlY29tZXMgOmNhci5zdWJcblxuKi9cblxuY29uc3QgU1VCX1BBVEhfU1RBUlQgPSAneycsXG5cdFNVQl9QQVRIX0VORCA9ICd9Jyxcblx0UEFUSF9TUExJVCA9ICcuJyxcblx0UEFUSF9TVEFSVF9PQkpFQ1QgPSAnOicsXG5cdFBBVEhfU1RBUlRfSEVMUEVSUyA9ICc6OicsXG5cdEZVTkNUSU9OX01BUktFUiA9ICcoKScsXG5cdE1BWF9ERUVQID0gMTA7XG5cbmNsYXNzIG5vdFBhdGh7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Lypcblx0XHRpbnB1dCAnOns6OmhlbHBlclZhbH0uc3ViJ1xuXHRcdHJldHVybiA6OmhlbHBlclZhbFxuXHQqL1xuXHRmaW5kTmV4dFN1YlBhdGgocGF0aC8qIHN0cmluZyAqLyl7XG5cdFx0bGV0IHN1YlBhdGggPSAnJyxcblx0XHRcdGZpbmQgPSBmYWxzZTtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRpZiAocGF0aFtpXSA9PT0gU1VCX1BBVEhfU1RBUlQpe1xuXHRcdFx0XHRmaW5kID0gdHJ1ZTtcblx0XHRcdFx0c3ViUGF0aCA9ICcnO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKHBhdGhbaV0gPT09IFNVQl9QQVRIX0VORCAmJiBmaW5kKXtcblx0XHRcdFx0XHRpZiAoZmluZCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHN1YlBhdGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRzdWJQYXRoKz1wYXRoW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmaW5kP3N1YlBhdGg6bnVsbDtcblx0fVxuXG5cdHJlcGxhY2VTdWJQYXRoKHBhdGgsIHN1YiwgcGFyc2VkKXtcblx0XHRsZXQgc3ViZiA9IFNVQl9QQVRIX1NUQVJUK3N1YitTVUJfUEFUSF9FTkQ7XG5cdFx0d2hpbGUocGF0aC5pbmRleE9mKHN1YmYpID4gLTEpe1xuXHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShzdWJmLCBwYXJzZWQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdHBhcnNlU3VicyhwYXRoLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cblxuXHRwYXJzZVBhdGhTdGVwKHN0ZXAsIGl0ZW0sIGhlbHBlcil7XG5cdFx0bGV0IHJTdGVwID0gbnVsbDtcblx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKSA9PT0gMCAmJiBoZWxwZXIpe1xuXHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9IRUxQRVJTLCAnJyk7XG5cdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdGlmKGhlbHBlci5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPT09IDAgJiYgaXRlbSl7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCAnJyk7XG5cdFx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRcdGlmKGl0ZW0uaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBzdGVwO1xuXHR9XG5cblx0Ly86OmZpZWxkTmFtZS5yZXN1bHRcblx0Ly97fVxuXHQvL3tmaWVsZE5hbWU6ICd0YXJnZXRSZWNvcmRGaWVsZCd9XG5cdC8vLy9bJ3RhcmdldFJlY29yZEZpZWxkJywgJ3Jlc3VsdCddXG5cdHBhcnNlUGF0aChwYXRoLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRwYXRoID0gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0cGF0aFtpXSA9IHRoaXMucGFyc2VQYXRoU3RlcChwYXRoW2ldLCBpdGVtLCBoZWxwZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdG5vcm1pbGl6ZVBhdGgocGF0aCl7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cmV0dXJuIHBhdGg7XG5cdFx0fWVsc2V7XG5cdFx0XHR3aGlsZShwYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID4gLTEpe1xuXHRcdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCcnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0c21hbGwgPSBbXCJ0b2RvXCJdLFxuXHRcdGJpZyA9IFtcInRvZG9cIiwgXCJsZW5ndGhcIl1cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHQqL1xuXG5cdGlmRnVsbFN1YlBhdGgoYmlnLCBzbWFsbCl7XG5cdFx0aWYgKGJpZy5sZW5ndGg8c21hbGwubGVuZ3RoKXtyZXR1cm4gZmFsc2U7fVxuXHRcdGZvcihsZXQgdCA9MDsgdCA8IHNtYWxsLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHNtYWxsW3RdICE9PSBiaWdbdF0pe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCksXG5cdFx0XHRpc0Z1bmN0aW9uID0gYXR0ck5hbWUuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpPi0xO1xuXHRcdGlmIChpc0Z1bmN0aW9uKXtcblx0XHRcdGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHR9XG5cdFx0aWYgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgdHlwZW9mIG9iamVjdFthdHRyTmFtZV0gIT09ICd1bmRlZmluZWQnICYmIG9iamVjdFthdHRyTmFtZV0gIT09IG51bGwpe1xuXHRcdFx0bGV0IG5ld09iaiA9IGlzRnVuY3Rpb24/b2JqZWN0W2F0dHJOYW1lXSgpOm9iamVjdFthdHRyTmFtZV07XG5cdFx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKG5ld09iaiwgYXR0clBhdGgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBuZXdPYmo7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdHNldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGF0dHJWYWx1ZSl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCk7XG5cdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0aWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKXtvYmplY3RbYXR0ck5hbWVdID0ge307fVxuXHRcdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChvYmplY3RbYXR0ck5hbWVdLCBhdHRyUGF0aCwgYXR0clZhbHVlKTtcblx0XHR9ZWxzZXtcblx0XHRcdG9iamVjdFthdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0am9pbigpe1xuXHRcdGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gYXJncy5qb2luKFBBVEhfU1BMSVQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RQYXRoKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXNbTUVUQV9FVkVOVFNdID0ge307XG5cdFx0dGhpc1tNRVRBX0RBVEFdID0ge307XG5cdFx0dGhpc1tNRVRBX1dPUktJTkddID0ge307XG5cdFx0dGhpc1tNRVRBX09QVElPTlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uICovXG5cdFx0XHRcdHdoYXQgPSBhcmdzWzBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uIGVsZW1lbnQgKi9cblx0XHRcdFx0bm90UGF0aC5zZXQoYXJnc1swXSAvKiBwYXRoICovICwgd2hhdCAvKiBjb2xsZWN0aW9uICovICwgdW5kZWZpbmVkIC8qIGhlbHBlcnMgKi8gLCBhcmdzWzFdIC8qIHZhbHVlICovICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRnZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCAqL1xuXHRcdGNhc2UgMTpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0fVxuXHRcdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggd2l0aCBkZWZhdWx0IHZhbHVlICovXG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHRcdGlmIChyZXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdC8qIG5vIGRhdGEsIHJldHVybiBkZWZhdWx0IHZhbHVlICovXG5cdFx0XHRcdFx0cmV0dXJuIGFyZ3NbMV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LyogZGF0YSwgcmV0dXJuIGl0ICovXG5cdFx0XHRcdFx0cmV0dXJuIHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0LyogcmV0dXJuIGZ1bGwgY29sbGVjdGlvbiAqL1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB3aGF0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0Q09SRSBPQkpFQ1Rcblx0XHRcdERBVEEgLSBpbmZvcm1hdGlvblxuXHRcdFx0T1BUSU9OUyAtIGhvdyB0byB3b3JrXG5cdFx0XHRXT1JLSU5HIC0gdGVtcG9yYXJpbHkgZ2VuZXJhdGVkIGluIHByb2NjZXNzXG5cdCovXG5cblx0c2V0RGF0YSgpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX0RBVEFdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldERhdGEoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0fVxuXG5cdGdldERhdGEoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9EQVRBXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldE9wdGlvbnMoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRPcHRpb25zKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX09QVElPTlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0V29ya2luZygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX1dPUktJTkddID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldFdvcmtpbmcoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXb3JraW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfV09SS0lOR10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKlxuXHRcdEVWRU5UUyBoYW5kbGluZ1xuXHQqL1xuXG5cdG9uKGV2ZW50TmFtZXMsIGV2ZW50Q2FsbGJhY2tzLCBvbmNlKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdG5vdENvbW1vbi5kZWZpbmVJZk5vdEV4aXN0cyh0aGlzW01FVEFfRVZFTlRTXSwgbmFtZSwgW10pO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0ucHVzaCh7XG5cdFx0XHRcdGNhbGxiYWNrczogZXZlbnRDYWxsYmFja3MsXG5cdFx0XHRcdG9uY2U6IG9uY2UsXG5cdFx0XHRcdGNvdW50OiAwXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHRyaWdnZXIoKSB7XG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyksXG5cdFx0XHRldmVudE5hbWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZSkpIHtcblx0XHRcdGV2ZW50TmFtZSA9IFtldmVudE5hbWVdO1xuXHRcdH1cblx0XHRldmVudE5hbWUuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5mb3JFYWNoKGV2ZW50ID0+IHtcblx0XHRcdFx0XHRpZiAoZXZlbnQub25jZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnQuY2FsbGJhY2tzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG9mZihldmVudE5hbWVzIC8qIGFycmF5IG9mIGV2ZW50IG5hbWVzICovICwgZXZlbnRDYWxsYmFja3MgLyogYXJyYXkgb2YgY2FsbGJhY2tzICovICkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGxldCB0YXJnZXRJZCA9IC0xO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaCgoZXZlbnQsIGkpID0+IHtcblx0XHRcdFx0aWYgKGkgPT09IC0xICYmIGV2ZW50Q2FsbGJhY2tzID09PSBldmVudC5jYWxsYmFja3MpIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9IGk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRhcmdldElkID4gLTEpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uc3BsaWNlKHRhcmdldElkLCAxKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuIiwibGV0IG5vdEFQSU9wdGlvbnMgPSB7XG5cdHJwczogNTAsXG5cdHByb3RvY29sOiAnaHR0cCcsXG5cdGhvc3Q6ICdsb2NhbGhvc3QnLFxuXHRwb3J0OiA5MDAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RBUElPcHRpb25zO1xuIiwiY2xhc3Mgbm90QVBJUXVlZXtcblx0Y29uc3RydWN0b3IgKHJlcXVlc3RzUGVyU2Vjb25kKSB7XG5cdFx0dGhpcy5xdWVlID0gW107XG5cdFx0dGhpcy5pbnQgPSBudWxsO1xuXHRcdHRoaXMucmVxdWVzdHNQZXJTZWNvbmQgPSByZXF1ZXN0c1BlclNlY29uZCB8fCA1O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuKCl7XG5cdFx0dGhpcy5pbnQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5jaGVjay5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5yZXF1ZXN0c1BlclNlY29uZCk7XG5cdH1cblxuXHRjaGVjaygpe1xuXHRcdGlmICh0aGlzLmluUHJvZ3Jlc3Mpe3JldHVybjt9XG5cdFx0ZWxzZXtcblx0XHRcdGlmICh0aGlzLnF1ZWUubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHRoaXMuaW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0XHRcdGxldCB0b0NhbGwgPSB0aGlzLnF1ZWUuc2hpZnQoKTtcblx0XHRcdFx0dG9DYWxsKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmV4dCgpe1xuXHRcdHRoaXMuaW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHR9XG5cblx0YWRkKGNhbGwpe1xuXHRcdHRoaXMucXVlZS5wdXNoKGNhbGwpO1xuXHR9XG5cblx0cGF1c2UoKXtcblx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludCk7XG5cdH1cblxuXHRyZXN1bWUoKXtcblx0XHR0aGlzLnJ1bigpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSVF1ZWU7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlLmpzJztcblxuaW1wb3J0IG5vdEFQSU9wdGlvbnMgZnJvbSAnLi9vcHRpb25zLmpzJztcbmltcG9ydCBub3RBUElRdWVlIGZyb20gJy4vcXVlZS5qcyc7XG5cblxuY2xhc3Mgbm90QVBJIGV4dGVuZHMgIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RDb21tb24uZXh0ZW5kKG5vdEFQSU9wdGlvbnMsIG9wdGlvbnMpKTtcblx0XHR0aGlzLnF1ZWUgPSBuZXcgbm90QVBJUXVlZSh0aGlzLmdldE9wdGlvbnMoJ3JwcycpKTtcblx0XHR0aGlzLnF1ZWUucnVuKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRtYWtlVXJsKHBhcnRzKSB7XG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJy8nKTtcblx0fVxuXG5cdHF1ZWVSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsIG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRtYWtlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCkge1xuXHRcdG5vdENvbW1vbi5sb2coJ21ha2luZyByZXF1ZXN0JywgbWV0aG9kLCB1cmwsIGlkKTtcblx0XHRub3RDb21tb24ucmVxdWVzdEpTT04obWV0aG9kLCB1cmwsIGRhdGEpXG5cdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVxdWVzdCBzdWNjZXNzZnVsbCcsIG1ldGhvZCwgdXJsLCBpZCwgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXNwb25zZSBpcyBnb29kJyk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChjb2RlLCByZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ3JlcXVlc3QgZmFpbGVkJywgbWV0aG9kLCB1cmwsIGlkLCByZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3Jlc3BvbnNlIGlzIGJhZCcpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZScpO1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncG9zdCcsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygncHV0dCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2dldCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnbGlzdCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2RlbGV0ZScsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2RlbGV0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldFVwbG9hZFVSTChtb2RlbCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSArIHRoaXMuZ2V0T3B0aW9ucygndXBsb2FkJykgKyBtb2RlbD9tb2RlbC5nZXRJZCgpOicnO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSTtcbiIsImltcG9ydCBub3RCYXNlICBmcm9tICcuLi9ub3RCYXNlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEltYWdlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW50ZXJmYWNlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGV4dGVuZE9iamVjdChvYmoxLCBvYmoyKSB7XG5cdFx0dmFyIGF0dHJOYW1lID0gJyc7XG5cdFx0Zm9yIChhdHRyTmFtZSBpbiBvYmoyKSB7XG5cdFx0XHRpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpIHtcblx0XHRcdFx0b2JqMVthdHRyTmFtZV0gPSBvYmoyW2F0dHJOYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG9iajE7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldEFjdGlvbnNDb3VudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBY3Rpb25zKCkgPyBPYmplY3Qua2V5cyh0aGlzLmdldEFjdGlvbnMoKSkubGVuZ3RoIDogMDtcblx0fVxuXG5cdGdldEFjdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFuaWZlc3QgJiYgdGhpcy5tYW5pZmVzdC5hY3Rpb25zP3RoaXMubWFuaWZlc3QuYWN0aW9ucyA6IHt9O1xuXHR9XG5cblx0c2V0RmluZEJ5KGtleSwgdmFsdWUpIHtcblx0XHR2YXIgb2JqID0ge307XG5cdFx0b2JqW2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIob2JqKTtcblx0fVxuXG5cdHNldEZpbHRlcihmaWx0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdmaWx0ZXInLCBmaWx0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFNvcnRlcihzb3J0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUocGFnZVNpemUpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZXIocGFnZVNpemUsIHBhZ2VOdW1iZXIpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldE1vZGVsUGFyYW0oJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0c2V0TW9kZWxQYXJhbShwYXJhbU5hbWUsIHBhcmFtVmFsdWUpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCkpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucyhwYXJhbU5hbWUsIHBhcmFtVmFsdWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZGVsUGFyYW0ocGFyYW1OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucyhwYXJhbU5hbWUsIG51bGwpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdC8vcmV0dXJuIFByb21pc2Vcblx0cmVxdWVzdChyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdHVybCA9IHRoaXMuZ2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIG5vdENvbW1vbi5nZXRBUEkoKS5xdWVlUmVxdWVzdChhY3Rpb25EYXRhLm1ldGhvZCwgdXJsLCBKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSwgdGhpcy5vbkxvYWQuYmluZCh7YWN0aW9uRGF0YSwgbWFuaWZlc3Q6IHRoaXMubWFuaWZlc3R9KSk7XG5cdH1cbi8qXG5cdF9yZXF1ZXN0X09ic29sZXRlXyhyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRub3RDb21tb24ubG9nKCdyZXF1ZXN0JywgcmVjb3JkLCBhY3Rpb25OYW1lLCBjYWxsYmFja1N1Y2Nlc3MsIGNhbGxiYWNrRXJyb3IpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwsIHJlY29yZC5nZXRJZCgpLCBKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSwgZ29vZCwgYmFkKVxuXHRcdFx0XHRcdC50aGVuKHJlc29sdmUpXG5cdFx0XHRcdFx0LmNhdGNoKHJlamVjdCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlJyk7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpO1xuXG5cdFx0fSk7XG5cblxuXHRcdGlmIChhY3Rpb25EYXRhKXtcblx0XHRcdHZhciB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eG1saHR0cC5vcGVuKGFjdGlvbkRhdGEubWV0aG9kLCB1cmwpO1xuXHRcdFx0eG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4bWxodHRwLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhtbGh0dHAud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhtbGh0dHAuY2FsbGJhY2tTdWNjZXNzID0gY2FsbGJhY2tTdWNjZXNzO1xuXHRcdFx0eG1saHR0cC5jYWxsYmFja0Vycm9yID0gY2FsbGJhY2tFcnJvcjtcblx0XHRcdHhtbGh0dHAub25sb2FkID0gdGhpcy5vbkxvYWQ7XG5cdFx0XHR4bWxodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSkpO1xuXHRcdH1cblx0fVxuKi9cblx0b25Mb2FkKGRhdGEpe1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZih0aGlzICYmIHRoaXMuYWN0aW9uRGF0YSAmJiB0aGlzLmFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiB0aGlzLmFjdGlvbkRhdGEuaXNBcnJheSkge1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0ZmlsZVVwbG9hZChmaWxlVXBsb2FkKSB7XG5cdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdC8vbm90Q29tbW9uLmxvZyhmaWxlVXBsb2FkLmZpbGUpO1xuXHRcdGlmICh4aHIudXBsb2FkICYmIHRoaXMuZmlsZUFsbG93ZWQoZmlsZVVwbG9hZC5maWxlKSkge1xuXHRcdFx0Ly8gcHJvZ3Jlc3MgYmFyXG5cdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcInByb2dyZXNzXCIsIGUsIGZpbGVVcGxvYWQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGF0LndvcmtpbmcuZmlsZVVwbG9hZHMuaW5kZXhPZihmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHRcdHRoYXQud29ya2luZy5maWxlVXBsb2Fkcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwic3VjY2Vzc1wiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9wZW4oXCJQT1NUXCIsIHRoaXMuZ2V0VXBsb2FkVXJsKCksIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgZmlsZVVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYX0ZJTEVOQU1FXCIsIGVuY29kZVVSSUNvbXBvbmVudChmaWxlVXBsb2FkLmZpbGUubmFtZSkpO1xuXHRcdFx0eGhyLnNlbmQoZmlsZVVwbG9hZC5maWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBuZXcgRXZlbnQoXCJXcm9uZ0ZpbGVUeXBlXCIpLCBmaWxlVXBsb2FkKTtcblx0XHR9XG5cdH1cblx0Ki9cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJztcblxuY29uc3QgTUVUQV9JTlRFUkZBQ0UgPSBTeW1ib2woJ2ludGVyZmFjZScpLFxuXHRNRVRBX1BST1hZID0gU3ltYm9sKCdwcm94eScpLFxuXHRNRVRBX0NIQU5HRSA9IFN5bWJvbCgnY2hhbmdlJyksXG5cdE1FVEFfQ0hBTkdFX05FU1RFRCA9IFN5bWJvbCgnY2hhbmdlLm5lc3RlZCcpLFxuXHRNRVRBX1NBTCA9IFsnZ2V0QXR0cicsICdnZXRBdHRycycsICdzZXRBdHRyJywgJ3NldEF0dHJzJywgJ2dldERhdGEnLCAnc2V0RGF0YScsICdnZXRKU09OJywgJ29uJywgJ29mZicsICd0cmlnZ2VyJ10sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTAsXG5cdE1FVEFfUkVUVVJOX1RPX1JPT1QgPSBTeW1ib2woJ3JldHVyblRvUm9vdCcpO1xuXG52YXIgY3JlYXRlUHJvcGVydHlIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdHlwZW9mIHRhcmdldFtrZXldKTtcblxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UHJvcGVydHkgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoZ2V0Um9vdCwgcGF0aFRvLCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUHJveHkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5zZXREYXRhKGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9SRVRVUk5fVE9fUk9PVF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRbTUVUQV9SRVRVUk5fVE9fUk9PVF0ocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHRsZXQgcm9vdCA9IHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpKCk7XG5cdFx0cm9vdC50cmlnZ2VyKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX1BST1hZXSwgdGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSwgdmFsdWUpO1xuXHR9XG59XG5cblxudmFyIGNyZWF0ZVJlY29yZEhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGFyZ2V0LCBrZXksIHZhbHVlKTtcblx0XHRcdFx0cmV0dXJuIHQ7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0fTtcbn07XG5cbmNsYXNzIG5vdFJlY29yZCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCwgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1Byb3h5KSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ3RoaXMgaXMgUHJveHkgaXRlbScpO1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1JlY29yZCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0ZmlsdGVyOiB7fSxcblx0XHRcdHNvcnRlcjoge30sXG5cdFx0XHRwYWdlTnVtYmVyOiBERUZBVUxUX1BBR0VfTlVNQkVSLFxuXHRcdFx0cGFnZVNpemU6IERFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0ZmllbGRzOiBbXVxuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdID0gbmV3IG5vdFJlY29yZEludGVyZmFjZShtYW5pZmVzdCk7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXMuaW50ZXJmYWNlVXAoKTtcblx0XHR0aGlzLmlzUmVjb3JkID0gdHJ1ZTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IHJlY29yZCBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdGluaXRQcm9wZXJ0aWVzKGl0ZW0sIHBhdGggPSAnJykge1xuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhpdGVtKTtcblx0XHRcdGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRcdGxldCBjdXJQYXRoID0gcGF0aCArIChwYXRoLmxlbmd0aCA+IDAgPyAnLicgOiAnJykgKyBrZXk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3VyUGF0aCcsIGN1clBhdGgpO1xuXHRcdFx0XHRpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtW2tleV0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gKCkgPT4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCk7XG5cdFx0XHRub3RDb21tb24ubG9nKCdkZWZpbmUnLCBERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleCk7XG5cdFx0fVxuXHR9XG5cdC8qXG5cdC0+ICdwYXRoLnRvLmtleScsIHZhbHVlT2ZLZXlcblx0PC0gb2ssIHdpdGggb25lIG9uQ2hhbmdlIGV2ZW50IHRyaWdnZXJlZFxuXHQqL1xuXG5cdHNldEF0dHIoa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBub3RQYXRoLnNldChrZXksIHRoaXNbTUVUQV9QUk9YWV0sIHt9LCB2YWx1ZSk7XG5cdH1cblxuXHQvKlxuXHQtPlxuXHR7XG5cdFx0J2tleVBhdGgnOiB2YWx1ZSxcblx0XHQna2V5LnN1YlBhdGgnOiB2YWx1ZTIsXG5cdFx0J2tleVBhdGguMC50aXRsZSc6IHZhbHVlM1xuXHR9XG5cdDwtIG9rLCB3aXRoIGJ1bmNoIG9mIG9uQ2hhbmdlIGV2ZW50cyB0cmlnZ2VyZWRcblx0Ki9cblx0c2V0QXR0cnMob2JqZWN0UGFydCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBpbiBvYmplY3RQYXJ0KSB7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMgb25lIHRvIGdvJywgcGF0aCk7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cihwYXRoLCBvYmplY3RQYXJ0W3BhdGhdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aFRvS2V5J1xuXHQ8LSB2YWx1ZTFcblxuXHQqL1xuXHRnZXRBdHRyKHdoYXQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ2dldEF0dHInLCB3aGF0KTtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQod2hhdCwgdGhpc1tNRVRBX1BST1hZXSwge30pO1xuXHR9XG5cblx0Lypcblx0LT4gWydwYXRoVG9LZXknLCAncGF0aC50by5rZXknLCAnc2ltcGxlS2V5JywuLi5dXG5cdDwtIFt2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzLC4uLl1cblx0Ki9cblx0Z2V0QXR0cnMod2hhdCkge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAod2hhdCAmJiB3aGF0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggb2Ygd2hhdCkge1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLmdldEF0dHIocGF0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRnZXRKU09OKCkge1xuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJjb25zdCBQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVggPSAnbi0nLFxuXHRURU1QTEFURV9UQUcgPSAnbnQnLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgPSAnLScsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYID0gJ2lmJyxcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCA9ICdub3RfY29tcG9uZW50XycsXG5cdFBBUlRfSURfUFJFRklYID0gJ25vdF9wYXJ0XycsXG5cdERFRkFVTFRfUExBQ0VSID0gJ3BsYWNlJyxcblx0REVGQVVMVF9QTEFDRVJfTE9PUCA9ICdwbGFjZUFmdGVyJztcblxuY29uc3QgT1BUUyA9IHtcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLFxuXHRURU1QTEFURV9UQUcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUixcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsXG5cdERFRkFVTFRfUExBQ0VSLFxuXHRDT01QT05FTlRfSURfUFJFRklYLFxuXHRQQVJUX0lEX1BSRUZJWCxcblx0REVGQVVMVF9QTEFDRVJfTE9PUFxufTtcblxuZXhwb3J0IGRlZmF1bHQgT1BUUztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmNvbnN0IE1FVEFfQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlQ2FjaGUgZXh0ZW5kcyBub3RCYXNle1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXSA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHR0aGlzLmhpZGVUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaWRlVGVtcGxhdGVzKCl7XG5cdFx0bGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdHQuaW5uZXJIVE1MID0gT1BUUy5URU1QTEFURV9UQUcgKyAne2Rpc3BsYXk6IG5vbmU7fSc7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KTtcblx0fVxuXG5cdHJlZ2lzdGVyKCkge1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcigndGVtcGxhdGVDYWNoZScsIHRoaXMpO1xuXHR9XG5cblx0bG9hZChtYXApIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0Zm9yICh2YXIgaSBpbiBtYXApIHtcblx0XHRcdHRoaXMubG9hZE9uZShpLCBtYXBbaV0pO1xuXHRcdH1cblx0fVxuXG5cdGxvYWRPbmUoa2V5LCB1cmwsIGNhbGxiYWNrKSB7XG5cblx0XHR2YXIgb1JlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRvUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXHRcdG9SZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbCBvZiBub3RUZW1wbGF0ZXNFbGVtZW50cyl7XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSA9PT0gY29udCl7XG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdFx0XHRyZXN1bHRbZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlXSA9IGVsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRhZGRMaWIobGliKXtcblx0XHRmb3IobGV0IHQgaW4gbGliKXtcblx0XHRcdHRoaXMuc2V0T25lKHQsIGxpYlt0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVVSTChrZXksIHVybCkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRpZiAodGhhdC5nZXQoa2V5KSl7XG5cdFx0XHRcdHJlc29sdmUodGhhdC5nZXQoa2V5KSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly90aGF0LnNldExvYWRpbmcoa2V5LCB1cmwpO1xuXHRcdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpLnRoZW4oZnVuY3Rpb24odGVtcGxhdGVJbm5lckhUTUwpe1xuXHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoYXQud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdHRoYXQuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdFx0XHRcdHJlc29sdmUodGVtcGxhdGVDb250RWwpO1xuXHRcdFx0XHR9KS5jYXRjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZScsIGtleSwgdXJsKTtcblx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRMaWJGcm9tVVJMKHVybCkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpLnRoZW4oZnVuY3Rpb24odGVtcGxhdGVzSFRNTCl7XG5cdFx0XHRcdGxldCB0ZW1wbGF0ZXMgPSB0aGF0LnBhcnNlTGliKHRlbXBsYXRlc0hUTUwpO1xuXHRcdFx0XHR0aGF0LmFkZExpYih0ZW1wbGF0ZXMpO1xuXHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbigpe1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGVzIGxpYicsIHVybCk7XG5cdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRGcm9tRG9jdW1lbnQoc2VsZWN0b3JPckVsZW1lbnQpe1xuXHRcdGxldCBlbCA9ICh0eXBlb2Ygc2VsZWN0b3JPckVsZW1lbnQgPT09ICdzdHJpbmcnKT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JFbGVtZW50KTpzZWxlY3Rvck9yRWxlbWVudDtcblx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBPUFRTLlRFTVBMQVRFX1RBRy50b0xvd2VyQ2FzZSgpKXtcblx0XHRcdFx0dGhpcy5zZXRPbmUoZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlLCBlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVRleHQoa2V5LCB0ZW1wbGF0ZUlubmVySFRNTCl7XG5cdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhpcy53cmFwKGtleSwgJycsIHRlbXBsYXRlSW5uZXJIVE1MKTtcblx0XHR0aGlzLnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVDYWNoZSgpO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5cbmNvbnN0IE1FVEFfUFJPQ0VTU09SUyA9IFN5bWJvbCgncHJvY2Vzc29ycycpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQcm9jZXNzb3IoLyoga2V5LCB2YWx1ZSAqLyl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UHJvY2Vzc29yKC8qIGtleSwgIGRlZmF1bHRWYWx1ZSAqLyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyUHJvY2Vzc29ycygpe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkKCl7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuXHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gYXJndW1lbnRzWzBdKXtcblx0XHRcdFx0XHR0aGlzLnNldFByb2Nlc3Nvcih0LCBhcmd1bWVudHNbMF1bdF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0UHJvY2Vzc29yKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhcigpe1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVQcm9jZXNzb3JzKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7XG5cbi8qXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgiBET00g0L/QvtC00LTQtdGA0LXQstC+INCyINC60LDRh9C10YHRgtCy0LUg0YjQsNCx0LvQvtC90LAuXG4gKiDQl9Cw0L/QvtC70L3Rj9C10YIg0LXQs9C+INC00LDQvdC90YvQvNC4LlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YHQs9C10L3QtdGA0LjRgNC+0LLQsNC90L3Ri9C1INGN0LvQtdC80LXQvdGC0YtcbiAqXG4gKiAqL1xuXG4vKlxuXG5cdDxkaXYgbi10ZW1wbGF0ZS1uYW1lPVwidmFzeWFcIj5cblx0XHQ8cD48aW5wdXQgdHlwZT1cInRleHRcIiBuLXZhbHVlPVwiOmNvb2xOYW1lXCIvPjwvcD5cblx0XHQ8cD7QkdC+0YDQuNGBINGF0YDQtdC9INC/0L7Qv9Cw0LTQtdGI0Ywg0Lgge3s6Y29vbE5hbWV9fS48L3A+XG5cdDwvZGl2PlxuXG4gKi9cblxuY29uc3QgTUVUQV9DT01QT05FTlRTID0gU3ltYm9sKCdjb21wb25lbnRzJyk7XG5cbmNsYXNzIG5vdFJlbmRlcmVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdC8qXG5cdFx0aW5wdXQgPSB7XG5cdFx0XHRkYXRhOiBub3RSZWNvcmQsXG5cdFx0XHR0ZW1wbGF0ZTogZWxlbWVudFxuXHRcdFx0b3B0aW9uczp7XG5cdFx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHQqL1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU10gPSB7fTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMuY29tcG9uZW50ID0gaW5wdXQuY29tcG9uZW50O1xuXHRcdHRoaXMuaW5pdERhdGEoaW5wdXQuZGF0YSA/IGlucHV0LmRhdGEgOiB7fSk7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0LnRlbXBsYXRlKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZSgpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndGVtcGxhdGUnLCB0aGlzLmdldFdvcmtpbmcoJ2dldFRlbXBsYXRlJykoKSk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuZ2V0RGF0YSgpLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHR9XG5cblx0aW5pdFdvcmtpbmcodGVtcGxhdGUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0Z2V0VGVtcGxhdGU6IHRlbXBsYXRlLFxuXHRcdFx0cGFydElkOiB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpID8gdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA6IE9QVFMuUEFSVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKSB7XG5cdFx0aWYgKHRoaXMuY29tcG9uZW50KSB7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMuY29tcG9uZW50LmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH1cblx0fVxuXG5cdG9uQ2hhbmdlKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0Lypub3RDb21tb24ubG9nKHRoaXMpO1xuXHRcdG5vdENvbW1vbi5sb2codGhpcy5nZXRCcmVhZENydW1wcygpLmpvaW4oJyA+ICcpKTtcblx0XHRub3RDb21tb24ubG9nKCd1cGRhdGluZyByZW5kZXJlciAnLCB0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpLCAnIGFmdGVyIGNoYW5nZXMnLCBrZXksIHZhbHVlKTsqL1xuXHRcdHRoaXMudXBkYXRlKGtleSk7XG5cdFx0dGhpcy50cmlnZ2VyKCdvYnNvbGV0ZScpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2xlYXJTdGFzaCgpO1xuXHRcdHRoaXMuc2V0V29ya2luZ01hcHBpbmcoKTtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHR0aGlzLnNlYXJjaEZvclN1YlRlbXBsYXRlcygpO1xuXHRcdHRoaXMuc3Rhc2hSZW5kZXJlZCgpO1xuXHR9XG5cblx0dXBkYXRlKGtleSkge1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdGZvciAobGV0IHQgaW4gdGhpc1tNRVRBX0NPTVBPTkVOVFNdKSB7XG5cdFx0XHRsZXQgaXRlbSA9IHRoaXNbTUVUQV9DT01QT05FTlRTXVt0XSxcblx0XHRcdFx0aWZQYXJ0ID0gdHJ1ZTtcblx0XHRcdGlmIChrZXkpe1xuXHRcdFx0XHRpZiAoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpPT09bnVsbCl7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0XHRjb21wb25lbnRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGl0ZW0uZ2V0T3B0aW9ucygnZGF0YVBhdGgnKSksXG5cdFx0XHRcdFx0Y2hhbmdlZFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoa2V5KTtcblx0XHRcdFx0aWZQYXJ0ID0gbm90UGF0aC5pZkZ1bGxTdWJQYXRoKGNoYW5nZWRQYXRoLCBjb21wb25lbnRQYXRoKTtcblx0XHRcdFx0Lypub3RDb21tb24ubG9nKGl0ZW0uZ2V0T3B0aW9ucygnbmFtZScpLCAnID4tPCAnLCBpdGVtLmdldE9wdGlvbnMoJ2lkJyksICcgPi08ICcsIGNvbXBvbmVudFBhdGgsIGNoYW5nZWRQYXRoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygnd2lsbCBiZSB1cGRhdGVkJywgaWZQYXJ0KTsqL1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaWZQYXJ0KSB7XG5cdFx0XHRcdGl0ZW0udXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0V29ya2luZ01hcHBpbmcoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtYXBwaW5nJywgdGhpcy5jcmVhdGVNYXBwaW5nKCkpO1xuXHR9XG5cblx0LypcblxuXHTQodC+0LfQtNCw0LXQvCDQutCw0YDRgtGLINGB0L7QvtGC0LLQtdGB0YLQstC40Y8g0L/RgNC+0YbQtdGB0YHQvtGA0L7Qsiwg0L/Rg9GC0LXQuSDQtNCw0L3QvdGL0YUg0LIg0L7QsdGK0LXQutGC0LUg0Lgg0Y3Qu9C10LzQtdC90YLQvtCyINGI0LDQsdC70L7QvdCwLlxuXHRbe1xuXHRcdGVsLFxuXHRcdHByb2Nlc3Nvcixcblx0XHR3b3JraW5nLFxuXHRcdGl0ZW0ucHJvcGVydHkucGF0aFxuXHR9XVxuXG5cdCovXG5cblx0Y3JlYXRlTWFwcGluZygpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5maW5kQWxsUHJvY2Vzc29ycygpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmaW5kQWxsUHJvY2Vzc29ycygpIHtcblx0XHRsZXQgcHJvY3MgPSBbXSxcblx0XHRcdGVscyA9IG5vdENvbW1vbi5nZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCh0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSwgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpO1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgZWxzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMCwgYXR0cyA9IGVsc1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCkgPT09IDApIHtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coYXR0c1tpXSk7XG5cdFx0XHRcdFx0bGV0IHByb2NEYXRhID0gdGhpcy5wYXJzZVByb2Nlc3NvckV4cHJlc3Npb24oYXR0c1tpXS5ub2RlTmFtZSk7XG5cdFx0XHRcdFx0cHJvY0RhdGEuZWxlbWVudCA9IGVsc1tqXTtcblx0XHRcdFx0XHRwcm9jRGF0YS5wcm9jZXNzb3JFeHByZXNzaW9uID0gYXR0c1tpXS5ub2RlTmFtZTtcblx0XHRcdFx0XHRwcm9jRGF0YS5hdHRyaWJ1dGVFeHByZXNzaW9uID0gYXR0c1tpXS52YWx1ZTtcblx0XHRcdFx0XHRwcm9jcy5wdXNoKHByb2NEYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcHJvY3M7XG5cdH1cblxuXHRwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24ocHJvY2Vzc29yRXhwcmVzc2lvbikge1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRwYXJhbXM6IFtdLFxuXHRcdFx0cHJvY2Vzc29yTmFtZTogJycsXG5cdFx0XHRpZkNvbmRpdGlvbjogZmFsc2Vcblx0XHR9O1xuXHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgsICcnKTtcblx0XHRpZiAocHJvY2Vzc29yRXhwcmVzc2lvbi5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgpID09PSAocHJvY2Vzc29yRXhwcmVzc2lvbi5sZW5ndGggLSBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLmxlbmd0aCkpIHtcblx0XHRcdHJlc3VsdC5pZkNvbmRpdGlvbiA9IHRydWU7XG5cdFx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SICsgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCwgJycpO1xuXHRcdH1cblx0XHRyZXN1bHQucGFyYW1zID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5zcGxpdChPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUik7XG5cdFx0cmVzdWx0LnByb2Nlc3Nvck5hbWUgPSByZXN1bHQucGFyYW1zWzBdO1xuXHRcdHJlc3VsdC5wYXJhbXMgPSByZXN1bHQucGFyYW1zLnNsaWNlKDEpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRleGVjUHJvY2Vzc29ycyhpdGVtLCBpbmRleCkge1xuXHRcdGxldCBtYXBwaW5nID0gdGhpcy5nZXRXb3JraW5nKCdtYXBwaW5nJyk7XG5cdFx0aWYgKG1hcHBpbmcpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbWFwcGluZy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgcHJvY1Njb3BlID0gbWFwcGluZ1tpXTtcblx0XHRcdFx0cHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwcm9jU2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2F0dHJpYnV0ZVJlc3VsdCcsIHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQpO1xuXHRcdFx0XHRsZXQgcHJvY05hbWUgPSBwcm9jU2NvcGUucHJvY2Vzc29yTmFtZSxcblx0XHRcdFx0XHRwcm9jID0gbm90VGVtcGxhdGVQcm9jZXNzb3JzLmdldChwcm9jTmFtZSk7XG5cdFx0XHRcdGlmIChwcm9jKSB7XG5cdFx0XHRcdFx0cHJvYyhwcm9jU2NvcGUsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdFx0XHRcdFx0cHJvY1Njb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb2NTY29wZS5wcm9jZXNzb3JFeHByZXNzaW9uKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ25vIHByb2Nlc3NvciBsaWtlJywgcHJvY05hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcigncmVuZGVyZWQnKTtcblx0fVxuXG5cdGdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocGF0aCwgaXRlbSkge1xuXHRcdHJldHVybiBub3RQYXRoLmdldChwYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHR9XG5cblx0Y2xlYXJTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5kZXN0cm95U3VicygpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3VicycsIFtdKTtcblx0fVxuXG5cdGRlc3Ryb3lTdWJzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiB0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRTdGFzaCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGxldCBlbCA9IHRoaXMuZ2V0U3Rhc2goKVt0XTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlKXtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWZTdWJFbGVtZW50UmVuZGVyZWQobnRFbCkge1xuXHRcdHJldHVybiBudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZCAmJiAobnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQudmFsdWUgPT09ICd0cnVlJyk7XG5cdH1cblxuXHRzZWFyY2hGb3JTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGxldCBzdWJzID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzdWIgdGVtcGxhdGVzJywgc3Vicyk7XG5cdFx0Zm9yIChsZXQgbnQgb2Ygc3Vicykge1xuXHRcdFx0aWYgKCF0aGlzLmlmU3ViRWxlbWVudFJlbmRlcmVkKG50KSkge1xuXHRcdFx0XHR0aGlzLnJlbmRlclN1YihudCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWRkU3ViKG50RWwpIHtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKS5wdXNoKHtcblx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0cGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6ICcnLFxuXHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUuc3JjIDogJycsXG5cdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHRcdHJlbmRlcmVkTGlzdDogW10sXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJTdWIobnRFbCkge1xuXHRcdGlmICghbnRFbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRsZXQgZGV0YWlscyA9IHtcblx0XHRcdFx0ZGF0YVBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiBudWxsLFxuXHRcdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5zcmMudmFsdWUgOiAnJyxcblx0XHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKClcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHRkYXRhOiBkZXRhaWxzLmRhdGFQYXRoIT09IG51bGw/IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChkZXRhaWxzLmRhdGFQYXRoLCB0aGlzLmdldERhdGEoKSk6bnVsbCxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0c3JjOiBkZXRhaWxzLnNyY1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pLFxuXHRcdFx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUFmdGVyJyxcblx0XHRcdFx0XHRpZDogZGV0YWlscy5pZCxcblx0XHRcdFx0XHRudEVsOiBudEVsLFxuXHRcdFx0XHRcdGRhdGFQYXRoOiBkZXRhaWxzLmRhdGFQYXRoXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG93bmVyOiB0aGlzXG5cdFx0XHR9O1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdpZCcsIGRldGFpbHMuaWQpO1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXVtkZXRhaWxzLmlkXSA9IG5ldyBub3RDb21wb25lbnQob3B0aW9ucyk7XG5cdH1cblxuXHRjbGVhclN0YXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBbXSk7XG5cdH1cblxuXHRnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3RlbXBsYXRlJyk7XG5cdH1cblxuXHRnZXRTdGFzaCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzdGFzaCcpO1xuXHR9XG5cblx0c3Rhc2hSZW5kZXJlZCgpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCk7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0dGhpcy5hZGRUb1N0YXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdH1cblxuXHRyZXBsYWNlUmVuZGVyZWQoKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdyZXBsYWNlIHN0YXNoJyk7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLFxuXHRcdFx0c3Rhc2ggPSB0aGlzLmdldFN0YXNoKCksXG5cdFx0XHRuZXdTdGFzaCA9IFtdLFxuXHRcdFx0YW5jaG9yID0gc3Rhc2gubGVuZ3RoID4gMCA/IHN0YXNoWzBdIDogdGhpcy5nZXRPcHRpb25zKCdudEVsJyksXG5cdFx0XHRwYXJlbnROb2RlID0gYW5jaG9yLnBhcmVudE5vZGU7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0bmV3U3Rhc2gucHVzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgbmV3U3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdGlmIChhbmNob3IubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1N0YXNoW3RdLCBhbmNob3IubmV4dFNpYmxpbmcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3U3Rhc2hbdF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHN0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRwYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0YXNoW3RdKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIG5ld1N0YXNoKTtcblx0fVxuXG5cdGFkZFRvU3Rhc2gobm9kZSkge1xuXHRcdHRoaXMuZ2V0U3Rhc2goKS5wdXNoKG5vZGUpO1xuXHR9XG5cblx0aXNEYXRhKGRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkgPT09IGRhdGE7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVuZGVyZXI7XG4iLCJjb25zdCBwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XG5cdFx0d2hpbGUgKHRhcmdldEVsLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0dGFyZ2V0RWwucmVtb3ZlQ2hpbGQodGFyZ2V0RWwuY2hpbGRyZW5bMF0pO1xuXHRcdH1cblx0fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9XG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2U7XG4iLCJjb25zdCBwbGFjZUFmdGVyID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VBZnRlcjtcbiIsImNvbnN0IHBsYWNlQmVmb3JlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VCZWZvcmU7XG4iLCJjb25zdCBwbGFjZUZpcnN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlRmlyc3Q7XG4iLCJjb25zdCBwbGFjZUxhc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUxhc3Q7XG4iLCJjb25zdCByZXBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdHRhcmdldEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFyZ2V0RWwpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlO1xuIiwiaW1wb3J0IHBsYWNlIGZyb20gJy4vcGxhY2UnO1xuaW1wb3J0IHBsYWNlQWZ0ZXIgZnJvbSAnLi9wbGFjZUFmdGVyJztcbmltcG9ydCBwbGFjZUJlZm9yZSBmcm9tICcuL3BsYWNlQmVmb3JlJztcbmltcG9ydCBwbGFjZUZpcnN0IGZyb20gJy4vcGxhY2VGaXJzdCc7XG5pbXBvcnQgcGxhY2VMYXN0IGZyb20gJy4vcGxhY2VMYXN0JztcbmltcG9ydCByZXBsYWNlIGZyb20gJy4vcmVwbGFjZSc7XG5cbmNvbnN0IG5vdFBsYWNlcnMgPSB7XG5cdHBsYWNlOiBwbGFjZSxcblx0cGxhY2VBZnRlcjogcGxhY2VBZnRlcixcblx0cGxhY2VCZWZvcmU6IHBsYWNlQmVmb3JlLFxuXHRwbGFjZUZpcnN0OiBwbGFjZUZpcnN0LFxuXHRwbGFjZUxhc3Q6IHBsYWNlTGFzdCxcblx0cmVwbGFjZTogcmVwbGFjZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90UGxhY2VycztcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi9ub3RSZW5kZXJlcic7XG5pbXBvcnQgbm90UGxhY2VycyBmcm9tICcuL3BsYWNlcnMnO1xuXG5jb25zdCBNRVRBX1BBUlRTID0gU3ltYm9sKCdwYXJ0cycpO1xuLypcblx0aW5wdXQgPSB7XG5cdFx0ZGF0YTogbm90UmVjb3JkIG9yIFtub3RSZWNvcmRdLFxuXHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRodG1sOiBodG1sKHN0cmluZyksIFx0XHQvL9GC0LXQutGB0YIg0YEgaHRtbCDQutC+0LTQvtC8INGI0LDQsdC70L7QvdCwXG5cdFx0XHRlbDogSFRNTEVsZW1lbnQob2JqZWN0KSwgXHQvL0RPTSDRjdC70LXQvNC10L3RglxuXHRcdFx0c3JjOiBzcmMoc3RyaW5nKSxcdFx0XHQvL9GB0YHRi9C70LrQsCDQvdCwINGE0LDQudC7INGBINGI0LDQsdC70L7QvdC+0Lxcblx0XHRcdG5hbWU6IG5hbWUoc3RyaW5nKVx0XHRcdC8v0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCDQtNC70Y8g0L/QvtC40YHQutCwINCyINC60Y3RiNC1IG5vdFRlbXBsYXRlQ2FjaGVcblx0XHR9XG5cdFx0b3B0aW9uczp7XG5cdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHQvL9CwINGN0YLQviDQutCw0Log0LHRg9C00LXQvCDQv9C+0LzQtdGJ0LDRgtGMINGA0LXQt9GD0LvRjNGC0LDRgiDRgNC10L3QtNC10YDQuNC90LPQsFxuXHRcdFx0cmVuZGVyQW5kOiBwbGFjZVN0eWxlKHN0cmluZykg0L7QtNC40L0g0LjQtyDQstCw0YDQuNCw0L3RgtC+0LJcblx0XHRcdFx0XHRwbGFjZVx0XHQtXHTQv9C+0LzQtdGJ0LDQtdC8INCy0L3Rg9GC0YDQuCDRhtC10LvQtdCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0XHRyZXBsYWNlXHRcdC1cdNC30LDQvNC10L3Rj9C10Lxcblx0XHRcdFx0XHRwbGFjZUFmdGVyXHQtXHTQv9C+0YHQu9C1XG5cdFx0XHRcdFx0cGxhY2VCZWZvcmVcdC1cdNC00L5cblx0XHRcdFx0XHRwbGFjZUZpcnN0XHQtXHTQstC90YPRgtGA0Lgg0L/QtdGA0LLRi9C8INC00L7Rh9C10YDQvdC40Lxcblx0XHRcdFx0XHRwbGFjZUxhc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C+0YHQu9C10LTQvdC40Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdH1cblx0fVxuKi9cbmNsYXNzIG5vdENvbXBvbmVudCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKXtcblx0XHRpZiAodGhpcy5vd25lcil7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMub3duZXIuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMub3duZXIgPSBpbnB1dC5vd25lcj9pbnB1dC5vd25lcjpudWxsO1xuXHRcdHRoaXMuaW5pdERhdGEoaW5wdXQuZGF0YSA/IGlucHV0LmRhdGEgOiB7fSk7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnaWQnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2lkJywgT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdudEVsJykpe1xuXHRcdFx0dGhpcy5pbml0TWFya0VsZW1lbnQoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFya0VsZW1lbnQoKXtcblx0XHRsZXQgbWFya0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbnQnKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ250RWwnLCBtYXJrRWwpO1xuXHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRwbGFjZXIubWFpbih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksIFttYXJrRWxdKTtcblx0fVxuXG5cdGluaXRXb3JraW5nKHZhbCkge1xuXHRcdHRoaXMudW5zZXRSZWFkeSh2YWwpO1xuXHR9XG5cblx0cHJlcGFyZVRlbXBsYXRlRWxlbWVudCh2YWwpIHtcblx0XHRpZiAoIXZhbCkge1xuXHRcdFx0dGhpcy51bnNldFJlYWR5KCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2h0bWwnKSAmJiB2YWwuaHRtbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLndyYXAoJycsICcnLCB2YWwuaHRtbCkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdlbCcpICYmIHZhbC5lbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudCh2YWwuZWwuY2xvbmVOb2RlKHRydWUpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnc3JjJykgJiYgdmFsLnNyYykge1xuXHRcdFx0bm90VGVtcGxhdGVDYWNoZS5nZXRGcm9tVVJMKHZhbC5zcmMsIHZhbC5zcmMpXG5cdFx0XHRcdC50aGVuKHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQuYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCduYW1lJykgJiYgdmFsLm5hbWUpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS5nZXQodmFsLm5hbWUpKTtcblx0XHR9XG5cdH1cblxuXHRzZXRQcm90b1RlbXBsYXRlRWxlbWVudChjb250KSB7XG5cdFx0aWYgKGNvbnQpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnLCBjb250KTtcblx0XHRcdHRoaXMudHJpZ2dlcigncmVhZHknKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdXcm9uZyB0ZW1wbGF0ZSBjb250YWluZXIgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JykuY2xvbmVOb2RlKHRydWUpO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdHJlc2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnLCB0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkuY2xvbmVOb2RlKHRydWUpKTtcblx0fVxuXG5cdHNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB0cnVlKTtcblx0fVxuXG5cdHVuc2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIGZhbHNlKTtcblx0fVxuXG5cdGlzUmVhZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncmVhZHknKTtcblx0fVxuXG5cdGNsZWFyUGFydHMoKSB7XG5cdFx0Lyog0LjQt9Cy0LXRidCw0LXQvCDQvtCxINGD0LTQsNC70LXQvdC40Lgg0Y3Qu9C10LzQtdC90YLQvtCyICovXG5cdFx0aWYgKHRoaXNbTUVUQV9QQVJUU10gJiYgQXJyYXkuaXNBcnJheSh0aGlzW01FVEFfUEFSVFNdKSAmJiB0aGlzW01FVEFfUEFSVFNdLmxlbmd0aCkge1xuXHRcdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfUEFSVFNdKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdHJlc2V0UGFydHMoKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXSA9IFtdO1xuXHR9XG5cblx0Z2V0UGFydHMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QQVJUU107XG5cdH1cblxuXHRhZGRQYXJ0KHRlbXBsYXRlKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXS5wdXNoKHRlbXBsYXRlKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdH1cblxuXHR1cGRhdGUoKXtcblx0XHR0aGlzLnJlbW92ZU9ic29sZXRlUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyVXBkYXRlJyk7XG5cdH1cblxuXHRwbGFjZVJlbmRlcmVkKCl7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSkge1xuXHRcdFx0bGV0IHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnBsYWNlUGFydC5iaW5kKHRoaXMpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyB0YXJnZXQgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdHBsYWNlUGFydChkYXRhLCBpbmRleCl7XG5cdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSksXG5cdFx0XHRub2RlcyA9IHBhcnQuZ2V0U3Rhc2goKSxcblx0XHRcdHRhcmdldEVsLFxuXHRcdFx0bGFzdE5vZGUsXG5cdFx0XHRwbGFjZXI7XG5cdFx0aWYgKGluZGV4ID09PSAwKXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcihPUFRTLkRFRkFVTFRfUExBQ0VSX0xPT1ApO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJyk7XG5cdFx0fVxuXHRcdHBsYWNlci5tYWluKHRhcmdldEVsLCBub2Rlcyk7XG5cblx0XHRsYXN0Tm9kZSA9IHRhcmdldEVsO1xuXHRcdGZvcihsZXQgdCBvZiBub2Rlcyl7XG5cdFx0XHRpZiAodC5ub2RlVHlwZSA9PT0gMSl7XG5cdFx0XHRcdGxhc3ROb2RlID0gdDtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1jb21wb25lbnQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdFx0XHRsYXN0Tm9kZS5zZXRBdHRyaWJ1dGUoJ250LXBhcnQnLCBwYXJ0LmdldFdvcmtpbmcoJ3BhcnRJZCcpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScsIGxhc3ROb2RlKTtcblx0fVxuXG5cdHBsYWNlTm9kZXMobm9kZXMpe1xuXHRcdC8vbm90Q29tbW9uLmxvZygncGxhY2VkIHBhcnQnLCBub2Rlcyk7XG5cdH1cblxuXHRnZXRQbGFjZXIobWV0aG9kKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZWFyY2hpbmcgZm9yIHBsYWNlcicsIG1ldGhvZCk7XG5cdFx0aWYgKG5vdFBsYWNlcnMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbbWV0aG9kXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbT1BUUy5ERUZBVUxUX1BMQUNFUl07XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaERhdGEoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldERhdGEoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaFBhcnQoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0UGFydHMoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXRQYXJ0cygpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdNC10YHQu9C4INGBINC00LDQvdC90YvQvNC4INC90LUg0YHQstGP0LfQsNC9INGA0LXQvdC00LXRgNC10YAgLSDRgdC+0LfQtNCw0LXQvFxuXHQqL1xuXG5cdHJlbmRlclBhcnQoZGF0YSkge1xuXHRcdGlmICghdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ2NyZWF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHRsZXQgcmVuZGVyZXIgPSBuZXcgbm90UmVuZGVyZXIoe1xuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0ZW1wbGF0ZTogdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lLmJpbmQodGhpcyksXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpLFxuXHRcdFx0XHRjb21wb25lbnQ6IHRoaXNcblx0XHRcdH0pO1xuXHRcdFx0Ly9yZW5kZXJlci5vbignb2Jzb2xldGUnLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkUGFydChyZW5kZXJlcik7XG5cdFx0fWVsc2V7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHR0aGlzLnVwZGF0ZVBhcnQodGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVQYXJ0KHBhcnQpe1xuXHRcdHBhcnQudXBkYXRlKCk7XG5cdH1cblxuXHRyZW1vdmVPYnNvbGV0ZVBhcnRzKCkge1xuXHRcdC8v0LrQvtC90LLQtdC10YAg0L/QvtC40YHQuiDQsNC60YLRg9Cw0LvRjNC90YvRhSAtINGD0LTQsNC70LXQvdC40LUg0L7RgdGC0LDQu9GM0L3Ri9GFXG5cdFx0bm90Q29tbW9uLnBpcGUoXG5cdFx0XHR1bmRlZmluZWQsIC8vIHBhcnRzIHRvIHNlYXJjaCBpbiwgY2FuIGJlICd1bmRlZmluZWQnXG5cdFx0XHRbXG5cdFx0XHRcdHRoaXMuZmluZEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vZmlyc3Qgcm91bmQsIHNlYXJjaCBmb3Igb2Jzb2xldGVcblx0XHRcdFx0dGhpcy5yZW1vdmVOb3RBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL3JlbW92ZSAnZW1cblx0XHRcdF1cblx0XHQpO1xuXHR9XG5cblx0Lypcblx0XHTQtdGB0YLRjCDQtNCw0L3QvdGL0LUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDQsNC60YLRg9Cw0LvRjNC90L4sXG5cdFx00L3QtdGCINC00LDQvdC90YvRhSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINGB0YLQsNGA0YzRkVxuXHQqL1xuXG5cdGZpbmRBY3R1YWxQYXJ0cygpIHtcblx0XHRsZXQgYWN0dWFsUGFydHMgPSBbXTtcblx0XHR0aGlzLmZvckVhY2hEYXRhKChkYXRhLyosIGluZGV4Ki8pPT57XG5cdFx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKTtcblx0XHRcdGlmIChwYXJ0KXtcblx0XHRcdFx0YWN0dWFsUGFydHMucHVzaChwYXJ0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gYWN0dWFsUGFydHM7XG5cdH1cblxuXHQvKlxuXHRcdNGD0LTQsNC70Y/QtdC8INCy0YHQtSDQutGA0L7QvNC1INCw0LrRgtGD0LDQu9GM0L3Ri9GFXG5cdCovXG5cdHJlbW92ZU5vdEFjdHVhbFBhcnRzKGFjdHVhbFBhcnRzKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmIChhY3R1YWxQYXJ0cy5pbmRleE9mKHRoaXMuZ2V0UGFydHMoKVt0XSkgPT09IC0xKXtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpW3RdLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpLnNwbGljZSh0LCAxKTtcblx0XHRcdFx0dC0tO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFBhcnRCeURhdGEoZGF0YSkge1xuXHRcdGZvciAobGV0IHQgaW4gdGhpcy5nZXRQYXJ0cygpKSB7XG5cdFx0XHRpZiAodGhpcy5nZXRQYXJ0cygpW3RdLmlzRGF0YShkYXRhKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRQYXJ0cygpW3RdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tcG9uZW50O1xuIiwiaW1wb3J0ICBub3RDb21wb25lbnQgIGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEZvcm1GYWN0b3J5IGV4dGVuZHMgbm90Q29tcG9uZW50e1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe30pO1xuXHRcdHRoaXMub24oJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQpO1xuXHRcdHRoaXMub24oJ3Jlc2V0JywgdGhpcy5vblJlc2V0KTtcblx0XHR0aGlzLm9uKCdjYW5jZWwnLCB0aGlzLm9uQ2FuY2VsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qXG5cdFx0UmVuZGVyaW5nXG5cdCovXG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdFx0dGhpcy5yZW5kZXJDb21wb25lbnRzKCk7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCl7XG5cblx0fVxuXG5cdHJlbmRlckNvbXBvbmVudHMoKXtcblxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHRjb2xsZWN0RGF0YSgpe1xuXG5cdH1cblxuXHQvKlxuXHRcdEV2ZW50IGhhbmRsZXJzXG5cdCovXG5cblx0b25TdWJtaXQoKXtcblxuXHR9XG5cblx0b25SZXNldCgpe1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpe1xuXG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmNsYXNzIG5vdFZpZXcgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0VGVtcGxhdGVPcHRpb25zKCkge1xuXHRcdHZhciBkZWZhdWx0UmVzdWx0ID0ge307XG5cdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZU9wdGlvbnMnKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZU9wdGlvbnMnKSAhPT0gbnVsbCkgPyB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlT3B0aW9ucycpOiBkZWZhdWx0UmVzdWx0O1xuXHR9XG5cblx0Z2V0UGxhY2VUb1B1dCgpIHtcblx0XHRpZiAodHlwZW9mIHRoaXMuZ2V0T3B0aW9ucygncGxhY2VUb1B1dCcpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldE9wdGlvbnMoJ3BsYWNlVG9QdXQnKSAhPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncGxhY2VUb1B1dCcpO1xuXHRcdH1cblx0XHRyZXR1cm4gZG9jdW1lbnQuYm9keTtcblx0fVxuXG5cdGdldEFmdGVyRXhlY0NhbGxiYWNrKGNhbGxiYWNrKSB7XG5cdFx0dmFyIGRlZmF1bHRSZXN1bHQgPSBmdW5jdGlvbigpIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ2RlZmF1bHQgdmlldyBhZnRlciBleGVjIGNhbGxiYWNrJyk7XG5cdFx0fTtcblx0XHRpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAndW5kZWZpbmVkJyAmJiBjYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGNhbGxiYWNrO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIHRoaXMuZ2V0T3B0aW9ucygnYWZ0ZXJFeGVjJykgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0T3B0aW9ucygnYWZ0ZXJFeGVjJykgIT09IG51bGwpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2FmdGVyRXhlYycpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGVmYXVsdFJlc3VsdDtcblx0fVxuXG5cdGV4ZWMoY2FsbGJhY2spIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudCcsIG5ldyBub3RDb21wb25lbnQodGhpcy5nZXRUZW1wbGF0ZU9wdGlvbnMoKSkpO1xuXHR9O1xuXG5cdHNldFBhcmFtKG5hbWUsIHZhbHVlKSB7XG5cdFx0dGhpcy5nZXRPcHRpb25zKG5hbWUsIHZhbHVlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFRlbXBsYXRlUGFyYW0obmFtZSwgdmFsdWUpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMobm90UGF0aC5qb2luKCd0ZW1wbGF0ZU9wdGlvbnMnLG5hbWUpLCB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQYXJhbShuYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygpLmhhc093blByb3BlcnR5KG5hbWUpID8gdGhpcy5nZXRPcHRpb25zKG5hbWUpIDogdW5kZWZpbmVkO1xuXHR9XG5cblx0Z2V0UGFyYW1zKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RWaWV3O1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmNsYXNzIG5vdENvbnRyb2xsZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoYXBwLCBjb250cm9sbGVyTmFtZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgY29udHJvbGxlcicpO1xuXHRcdHRoaXMuYXBwID0gYXBwO1xuXHRcdHRoaXMubmNOYW1lID0gJ25jJyArIChjb250cm9sbGVyTmFtZS5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoKSk7XG5cdFx0dGhpcy5jb250YWluZXJTZWxlY3RvciA9ICcucGFnZS1jb250ZW50Jztcblx0XHR0aGlzLnZpZXdzUG9zdGZpeCA9ICcuaHRtbCc7XG5cdFx0dGhpcy5yZW5kZXJGcm9tVVJMID0gdHJ1ZTtcblx0XHQvKlxuXHRcdCAgICDRgdGA0LDQt9GDINC00LXQu9Cw0LXQvCDQtNC+0YHRgtGD0L/QvdGL0LzQuCDQvNC+0LTQtdC70Lggbm90UmVjb3JkINC40LcgbmNgQ29udHJvbGxlck5hbWVgINCx0YPQtNGD0YIg0LTQvtGB0YLRg9C/0L3RiyDQutCw0LogdGhpcy5ucmBNb2RlbE5hbWVgXG5cdFx0Ki9cblx0XHR0aGlzLmFwcC5nZXRJbnRlcmZhY2VzKCkuZm9yRWFjaCgoaW5kZXgsIGludGVyZmFjMykgPT4ge1xuXHRcdFx0aWYgKHR5cGVvZigod2luZG93W3RoaXMubmNOYW1lXSkpICE9PSAndW5kZWZpbmVkJykod2luZG93W3RoaXMubmNOYW1lXSkucHJvdG90eXBlW2luZGV4XSA9IGludGVyZmFjMztcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdCRyZW5kZXIobmMgLyogbmNOYW1lIGZ1bmN0aW9uIHRoaXMqLyAsIG5hbWUgLyogdmlldyBuYW1lICovICwgZGF0YSAvKiBkYXRhIGZvciBub3RUZW1wbGF0ZSovICwgaGVscGVycyAvKiBjb3VsZCBiZSBub3QgcmVwcmVzZW50ZWQgKi8gLCBjYWxsYmFjaykge1xuXHRcdHZhciB2aWV3ID0gbmMudmlld3MuaGFzT3duUHJvcGVydHkobmFtZSkgPyBuYy52aWV3c1tuYW1lXSA6IG51bGwsXG5cdFx0XHRyZWFsQ2FsbGJhY2ssXG5cdFx0XHRyZWFsSGVscGVycztcblx0XHRpZiAodHlwZW9mIHZpZXcgPT09ICd1bmRlZmluZWQnIHx8IHZpZXcgPT09IG51bGwpIHJldHVybjtcblx0XHQvLyDQtdGB0LvQuCBwbGFjZSDQvdC1INGD0LrQsNC30LDQvdC+LCDRh9GC0L4g0LLQvtC30LzQvtC20L3QviDQuCDRgNCw0LfRg9C80L3QviDQv9GA0Lgg0L3QtSDRgdGD0YnQtdGB0YLQstC+0LLQsNC90LjQuFxuXHRcdC8vINGN0LvQtdC80LXQvdGC0LAsINC90L4g0LjQt9Cy0LXRgdGC0L3QvtC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGA0LVcblx0XHRpZiAoKCh0eXBlb2Ygdmlldy5wbGFjZSA9PT0gJ3VuZGVmaW5lZCcpIHx8ICh2aWV3LnBsYWNlID09PSBudWxsKSkgJiYgKHR5cGVvZiB2aWV3LnBsYWNlSWQgIT09ICd1bmRlZmluZWQnICYmIHZpZXcucGxhY2VJZCAhPT0gbnVsbCAmJiB2aWV3LnBsYWNlSWQubGVuZ3RoID4gMCkpIHtcblx0XHRcdHZpZXcucGxhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3LnBsYWNlSWQpO1xuXHRcdH1cblx0XHQvL9C10YHQu9C4IDQg0LDRgNCz0YPQvNC10L3RgtCwINC30L3QsNGH0LjRgiwgaGVscGVycyAg0L/RgNC+0L/Rg9GB0YLQuNC70Lhcblx0XHRzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdC8v0L/QtdGA0LXQvdCw0LfQvdCw0YfQsNC10Lwg0YHQviDRgdC00LLQuNCz0L7QvFxuXHRcdFx0Y2FzZSA0OlxuXHRcdFx0XHRyZWFsQ2FsbGJhY2sgPSBoZWxwZXJzO1xuXHRcdFx0XHRyZWFsSGVscGVycyA9IHt9O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdFx0Ly/Qv9C10YDQtdC90LDQt9C90LDRh9Cw0LXQvCDQvdCw0L/RgNGP0LzRg9GOXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZWFsSGVscGVycyA9IGhlbHBlcnM7XG5cdFx0XHRcdHJlYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdH1cblx0XHR2aWV3LmRhdGEgPSBkYXRhO1xuXHRcdGlmICh0eXBlb2Ygdmlldy5oZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3LmhlbHBlcnMgIT09IG51bGwgJiYgT2JqZWN0LmtleXModmlldy5oZWxwZXJzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHR2aWV3LmhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHZpZXcuaGVscGVycywgcmVhbEhlbHBlcnMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2aWV3LmhlbHBlcnMgPSByZWFsSGVscGVycztcblx0XHR9XG5cdFx0Ly/QtdGB0LvQuCDQvdGD0LbQvdC+INC30LDQs9GA0YPQttCw0YLRjCDRiNCw0LHQu9C+0L3Ri1xuXHRcdGlmIChuYy5yZW5kZXJGcm9tVVJMKSB7XG5cdFx0XHQvL9C4INCw0LTRgNC10YEg0L3QtSDRg9C60LDQt9Cw0L1cblx0XHRcdGlmICh0eXBlb2Ygdmlldy50ZW1wbGF0ZVVSTCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldy50ZW1wbGF0ZVVSTCA9PSBudWxsIHx8IHZpZXcudGVtcGxhdGVVUkwubGVuZ3RoID09IDApIHtcblx0XHRcdFx0Ly/Qs9C10L3QtdGA0LjRgNGD0LXQvCDQsNC00YDQtdGBINC/0L4g0YjQsNCx0LvQvtC90YNcblx0XHRcdFx0dmlldy50ZW1wbGF0ZVVSTCA9ICh2aWV3LmNvbW1vbiA/IG5jLmNvbW1vblZpZXdzUHJlZml4IDogbmMudmlld3NQcmVmaXgpICsgKCh0eXBlb2Ygdmlldy5uYW1lICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3Lm5hbWUgIT09IG51bGwgJiYgdmlldy5uYW1lLmxlbmd0aCA+IDApID8gdmlldy5uYW1lIDogbmFtZSkgKyBuYy52aWV3c1Bvc3RmaXg7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8v0LAg0LXRgdC70Lgg0LXRgdGC0Ywg0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCwg0YLQvlxuXHRcdFx0aWYgKHZpZXcuaGFzT3duUHJvcGVydHkoJ3RlbXBsYXRlTmFtZScpKSB7XG5cdFx0XHRcdC8vLi4uXG5cdFx0XHRcdHZpZXcudGVtcGxhdGVOYW1lID0gbmMudmlld3NQcmVmaXggKyB2aWV3LnRlbXBsYXRlTmFtZSArIG5jLnZpZXdzUG9zdGZpeDtcblx0XHRcdH1cblx0XHR9XG5cdFx0KG5ldyBub3RDb21wb25lbnQodmlldykpLmV4ZWNBbmRQdXQodmlldy5wbGFjZSwgcmVhbENhbGxiYWNrKTtcblx0fVxuXG5cdGV4ZWMocGFyYW1zKSB7XG5cdFx0Ly9jb25zb2xlLmxvZygnZXhlYycsIHRoaXMsIE9iamVjdC5rZXlzKHRoaXMuX19wcm90b19fKSk7XG5cdFx0aWYgKHR5cGVvZigod2luZG93W3RoaXMubmNOYW1lXSkpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0Ly/QuNGJ0LXQvCDQuNC80LXQvdCwINGA0LDQt9C00LXQu9GP0LXQvNGL0YUg0YTRg9C90LrRhtC40Llcblx0XHRcdHZhciBzaGFyZWRMaXN0ID0gT2JqZWN0LmtleXModGhpcy5fX3Byb3RvX18pLmZpbHRlcihmdW5jdGlvbihrZXkpIHtcblx0XHRcdFx0cmV0dXJuIChrZXkuaW5kZXhPZignJCcpID09PSAwKTtcblx0XHRcdH0pO1xuXHRcdFx0Ly/Qt9Cw0LrQuNC00YvQstCw0LXQvCDQuNGFINCyINC90L7QstGD0Y4g0YTRg9C90LrRhtC40Y5cblx0XHRcdGlmIChzaGFyZWRMaXN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgayBpbiBzaGFyZWRMaXN0KSB7XG5cdFx0XHRcdFx0d2luZG93W3RoaXMubmNOYW1lXS5wcm90b3R5cGVbc2hhcmVkTGlzdFtrXV0gPSB0aGlzLl9fcHJvdG9fX1tzaGFyZWRMaXN0W2tdXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bmV3KHdpbmRvd1t0aGlzLm5jTmFtZV0pKHRoaXMuYXBwLCBwYXJhbXMpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhuZXcod2luZG93W3RoaXMubmNOYW1lXSkodGhpcy5hcHAsIHBhcmFtcykpO1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnYWZ0ZXIgbmV3IGNvbnRyb2xsZXInKTtcblx0XHR9IGVsc2Uge1xuXG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbnRyb2xsZXI7XG4iLCIvKiBnbG9iYWwgcm91dGllICovXG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90Rm9ybUZhY3RvcnkgZnJvbSAnLi9jb21wb25lbnRzL25vdEZvcm1GYWN0b3J5JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90VmlldyBmcm9tICcuL2NvbXBvbmVudHMvbm90Vmlldyc7XG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuL25vdENvbnRyb2xsZXInO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcblxuY29uc3QgT1BUX0NPTlRST0xMRVJfUFJFRklYID0gJ25jJyxcblx0T1BUX1JFQ09SRF9QUkVGSVggPSAnbnInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RBcHAgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3Iobm90TWFuaWZlc3QpIHtcblx0XHRzdXBlcigpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGFwcCcpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RNYW5pZmVzdCk7XG5cdFx0dGhpcy5yZXNvdXJjZXMgPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0aW50ZXJmYWNlczoge30sXG5cdFx0XHRjb250cm9sbGVyczoge30sXG5cdFx0XHRpbml0Q29udHJvbGxlcjogbnVsbCxcblx0XHRcdGN1cnJlbnRDb250cm9sbGVyOiBudWxsLFxuXHRcdFx0Zm9ybXM6IHt9XG5cdFx0fSk7XG5cdFx0dGhpcy5pbml0KCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHZhciB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0VVJMJyksXG5cdFx0XHRzdWNjZXNzID0gdGhpcy5zZXRJbnRlcmZhY2VNYW5pZmVzdC5iaW5kKHRoaXMpO1xuXHRcdG5vdENvbW1vbi5nZXRKU09OKHVybCwge30pXG5cdFx0XHQudGhlbihzdWNjZXNzKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRzZXRJbnRlcmZhY2VNYW5pZmVzdChtYW5pZmVzdCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnLCBtYW5pZmVzdCk7XG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxuXG5cdGdldEludGVyZmFjZU1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0Jyk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0Ly/QvdGD0LbQvdC+INC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDRgtGMXG5cdFx0Ly/QvNC+0LTQtdC70Lgg0L/QvtC70YPRh9C10L3QvdGL0LzQuCDQuNC90YLQtdGA0YTQtdC50YHQsNC80Lhcblx0XHR0aGlzLnVwZGF0ZUludGVyZmFjZXMoKTtcblx0XHQvL9GB0L7Qt9C00LDQvdC40LUg0L7QsdGK0LXQutGC0L7QsiDQsNCy0YLQvtCz0LXQvdC10YDQsNGG0LjRjyDRhNC+0YDQvFxuXHRcdHRoaXMuaW5pdEZvcm1CdWlsZGVycygpO1xuXHRcdC8v0LjQvdC40YbQuNC70LjRhtC40YDQvtCy0LDRgtGMINC4INC30LDQv9GD0YHRgtC40YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHRcdHRoaXMuaW5pdENvbnRyb2xsZXIoKTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhcnRBcHAoKSB7XG5cdFx0Ly/RgdC+0LfQtNCw0YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0Ly/RgNC+0YPRgtC10YAg0Lgg0L/RgNC40LLRj9C30LDRgtGMINC6INC90LXQvNGDINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHR0aGlzLmluaXRSb3V0ZXIoKTtcblx0fVxuXG5cdGJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0dmFyIGN0cmwgPSBuZXcgbm90Q29udHJvbGxlcih0aGlzLCBjb250cm9sbGVyTmFtZSk7XG5cdFx0cmV0dXJuIGN0cmwuZXhlYy5iaW5kKGN0cmwpO1xuXHR9XG5cblx0aW5pdENvbnRyb2xsZXIoKSB7XG5cdFx0aWYgKHR5cGVvZih0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJykpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdpbml0Q29udHJvbGxlcicsIG5ldyBub3RDb250cm9sbGVyKHRoaXMsIHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkpO1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdpbml0Q29udHJvbGxlcicpLmV4ZWMoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0Um91dGVyKCkge1xuXHRcdHZhciByb3V0aWVJbnB1dCA9IHt9O1xuXHRcdHRoaXMuZ2V0T3B0aW9ucygnc2l0ZU1hbmlmZXN0JykuZm9yRWFjaCgocm91dGUsIGNvbnRyb2xsZXJOYW1lKT0+e1xuXHRcdFx0cm91dGllSW5wdXRbcm91dGVdID0gdGhpcy5iaW5kQ29udHJvbGxlcihjb250cm9sbGVyTmFtZSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb3V0ZXInLCByb3V0aWUocm91dGllSW5wdXQpKTtcblx0fVxuXG5cdGdldEN1cnJlbnRDb250cm9sbGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJyk7XG5cdH1cblxuXHRzZXRDdXJyZW50Q29udHJvbGxlcihjdHJsKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicsIGN0cmwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dXBkYXRlSW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLmNsZWFySW50ZXJmYWNlcygpO1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JykpIHtcblx0XHRcdHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKS5mb3JFYWNoKHRoaXMuaW5pdEludGVyZmFjZS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRnZXRSZWNvcmROYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX1JFQ09SRF9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0Z2V0Q29udHJvbGxlck5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfQ09OVFJPTExFUl9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0aW5pdEludGVyZmFjZShpbmRleCwgbWFuaWZlc3QpIHtcblx0XHQvL2NvbnNvbGUubG9nKGluZGV4LCBtYW5pZmVzdCk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbdGhpcy5nZXRSZWNvcmROYW1lKGluZGV4KV0gPSBuZXcgbm90UmVjb3JkKG1hbmlmZXN0KTtcblx0fVxuXG5cdG5yKG1vZGVsTmFtZSwgZGF0YSkge1xuXHRcdHZhciBtYW5pZmVzdCA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKS5oYXNPd25Qcm9wZXJ0eShtb2RlbE5hbWUpID8gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpW21vZGVsTmFtZV0gOiB7fTtcblx0XHQvL2NvbnNvbGUubG9nKG1vZGVsTmFtZSwgbWFuaWZlc3QsIGRhdGEpO1xuXHRcdHJldHVybiBuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBkYXRhKTtcblx0fVxuXG5cdGdldEludGVyZmFjZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpO1xuXHR9XG5cblx0Y2xlYXJJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJmYWNlcycsIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRGb3JtQnVpbGRlcnMoKSB7XG5cdFx0dGhpcy5jbGVhckZvcm1CdWlsZGVycygpO1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2Zvcm1zJykpIHtcblx0XHRcdHRoaXMuZ2V0T3B0aW9ucygnZm9ybXMnKS5mb3JFYWNoKHRoaXMuaW5pdEZvcm1CdWlsZGVyLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRGb3JtQnVpbGRlcihpbmRleCwgbWFuaWZlc3QpIHtcblx0XHRsZXQgcGF0aCA9IG5vdFBhdGguam9pbignZm9ybXMnLCBpbmRleCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHBhdGgsIG5ldyBub3RGb3JtRmFjdG9yeSh0aGlzLCBtYW5pZmVzdCkpO1xuXHRcdHRoaXMuZ2V0V29ya2luZyhwYXRoKS5pbml0KHRoaXMud2FpdFRoaXNSZXNvdXJjZSgnZm9ybScsIGluZGV4KSk7XG5cdH1cblxuXHRnZXRGb3JtQnVpbGRlcnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnZm9ybXMnKTtcblx0fVxuXG5cdGNsZWFyRm9ybUJ1aWxkZXJzKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnZm9ybXMnLCB7fSk7XG5cdH1cblxuXHR3YWl0VGhpc1Jlc291cmNlKHR5cGUsIGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLnJlc291cmNlcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuXHRcdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV0gPSB7fTtcblx0XHR9XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gZmFsc2U7XG5cdFx0cmV0dXJuIHRoaXMub25SZXNvdXJjZVJlYWR5LmJpbmQodGhpcywgdHlwZSwgaW5kZXgpO1xuXHR9XG5cblx0b25SZXNvdXJjZVJlYWR5KHR5cGUsIGluZGV4KSB7XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gdHJ1ZTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0YWxsUmVzb3VyY2VzUmVhZHkoKSB7XG5cdFx0dmFyIGksIGo7XG5cdFx0Zm9yIChpIGluIHRoaXMucmVzb3VyY2VzKSB7XG5cdFx0XHRmb3IgKGogaW4gdGhpcy5yZXNvdXJjZXNbaV0pIHtcblx0XHRcdFx0aWYgKCF0aGlzLnJlc291cmNlc1tpXVtqXSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnb3B0aW9ucycpO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoLmpzJztcblxudmFyIG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiA9IHtcblx0Y29udGVudDpmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5pbmRleE9mKCdjYXBpdGFsaXplJykgPiAtMSl7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQudG9VcHBlckNhc2UoKTtcblx0XHR9XG5cdFx0c2NvcGUuZWxlbWVudC50ZXh0Q29udGVudCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdDtcblx0fSxcblx0YmluZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihzY29wZS5wYXJhbXNbMF0sIChlKT0+e1xuXHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpe1xuXHRcdFx0XHRyZXR1cm4gc2NvcGUuYXR0cmlidXRlUmVzdWx0KHtzY29wZSwgaXRlbSwgaGVscGVycywgZX0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHR2YWx1ZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGxldCBsaXZlRXZlbnRzID0gWydjaGFuZ2UnLCAna2V5dXAnXSxcblx0XHRcdG9uRXZlbnQgPSAoKT0+bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2NvcGUuZWxlbWVudC52YWx1ZSk7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHRcdGlmIChzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlICE9PSB0cnVlKXtcblx0XHRcdGZvcihsZXQgdCBvZiBsaXZlRXZlbnRzKXtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHQsIG9uRXZlbnQpO1xuXHRcdFx0fVxuXHRcdFx0c2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSA9IHRydWU7XG5cdFx0fVxuXHR9LFxuXHRhdHRyOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHJlc3VsdCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKHNjb3BlLnBhcmFtc1swXSwgcmVzdWx0KTtcblx0fSxcblx0bmFtZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbigvKnNjb3BlLCBpdGVtLCBoZWxwZXJzKi8pe1xuXG5cdH0sXG5cdGNoZWNrZWQ6IGZ1bmN0aW9uKHNjb3BlLyosIGl0ZW0sIGhlbHBlcnMqLykge1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA/IHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgdHJ1ZSkgOiBzY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuXHR9LFxuXHRjbGFzczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKT9yZXMoe3Njb3BlLCBpdGVtLCBoZWxwZXJzfSk6cmVzKTtcblx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KXtcblx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdH1lbHNle1xuXHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0fVxuXHR9LFxuXHRvcHRpb25zOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBpID0gMCxcblx0XHRcdG9wdGlvbiA9IG51bGwsXG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9ICd2YWx1ZScsXG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9ICduYW1lJyxcblx0XHRcdHN1YkxpYiA9IHVuZGVmaW5lZCxcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkTmFtZScpID8gaGVscGVyc1snZmllbGROYW1lJ10gOiAndmFsdWUnO1xuXHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgaGVscGVycyAhPT0gbnVsbCAmJiBoZWxwZXJzLmhhc093blByb3BlcnR5KCdvcHRpb24nKSkge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBoZWxwZXJzLm9wdGlvbi5sYWJlbDtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gaGVscGVycy5vcHRpb24udmFsdWU7XG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMikge1xuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzJdO1xuXHRcdH1cblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDMgJiYgc2NvcGUucGFyYW1zWzNdID09PSAnZGlmZmVyZW50Jykge1xuXHRcdFx0c3ViTGliID0gdmFsdWVGaWVsZE5hbWU7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgaGVscGVycyAhPT0gbnVsbCAmJiBoZWxwZXJzLmhhc093blByb3BlcnR5KCdmaWVsZFBsYWNlSG9sZGVyJykgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGRQbGFjZUhvbGRlckRlZmF1bHQnKSAmJiBoZWxwZXJzLmZpZWxkUGxhY2VIb2xkZXJEZWZhdWx0KSB7XG5cdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJycpO1xuXHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gaGVscGVycy5maWVsZFBsYWNlSG9sZGVyO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdHZhciBsaWIgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdGlmICgvKmRpZmZlcmVudCAmJiovIHN1YkxpYiAmJiBsaWIuaGFzT3duUHJvcGVydHkoc3ViTGliKSkge1xuXHRcdFx0XHRsaWIgPSBsaWJbc3ViTGliXTtcblx0XHRcdH1cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsaWIubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbGliW2ldW3ZhbHVlRmllbGROYW1lXSk7XG5cdFx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGxpYltpXVtsYWJlbEZpZWxkTmFtZV07XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSkpIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdLmluZGV4T2YobGliW2ldW3ZhbHVlRmllbGROYW1lXSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSA9PT0gbGliW2ldW3ZhbHVlRmllbGROYW1lXSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcbmV4cG9ydCBkZWZhdWx0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYjtcbiIsImltcG9ydCAgbm90Q29tcG9uZW50ICBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RGb3JtIGV4dGVuZHMgbm90Q29tcG9uZW50e1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe30pO1xuXHRcdHRoaXMub24oJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQpO1xuXHRcdHRoaXMub24oJ3Jlc2V0JywgdGhpcy5vblJlc2V0KTtcblx0XHR0aGlzLm9uKCdjYW5jZWwnLCB0aGlzLm9uQ2FuY2VsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qXG5cdFx0UmVuZGVyaW5nXG5cdCovXG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdFx0dGhpcy5yZW5kZXJDb21wb25lbnRzKCk7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCl7XG5cblx0fVxuXG5cdHJlbmRlckNvbXBvbmVudHMoKXtcblxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHRjb2xsZWN0RGF0YSgpe1xuXG5cdH1cblxuXHQvKlxuXHRcdEV2ZW50IGhhbmRsZXJzXG5cdCovXG5cblx0b25TdWJtaXQoKXtcblxuXHR9XG5cblx0b25SZXNldCgpe1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpe1xuXG5cdH1cbn1cbiIsImltcG9ydCBub3RDb21wb25lbnQgIGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdFRhYmxlIGV4dGVuZHMgbm90Q29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cbiIsIi8qXG5cdENvbW1vbiBmdW5jdGlvbnNcbiovXG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbi8qXG5cdGZyYW1ld29yayB3aWRlIHBhcnNlciBmb3IgZGF0YSBhY2Nlc3NcbiovXG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcbi8qXG5cdGJhc2ljIGV2ZW50IGhhbmRsZXJzIGFuZCBjb3JlIGRhdGEgbW9kaWZpZXJzXG4qL1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbi8qXG5cdHNtYXJ0ZXIgaW1hZ2UgY29udHJvbFxuKi9cbmltcG9ydCBub3RJbWFnZSBmcm9tICcuL3RlbXBsYXRlL25vdEltYWdlJztcbi8qXG5cdGFwcGxpY2F0aW9uIG1haW4gaW5mcmFzdHJ1Y3R1cmUgc2V0dGVyXG4qL1xuaW1wb3J0IG5vdEFwcCBmcm9tICcuL25vdEFwcCc7XG4vKlxuXHRkYWRkeSBmb3IgdXNlciBjb250cm9sbGVyc1xuKi9cbmltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4vbm90Q29udHJvbGxlcic7XG4vKlxuXHR0ZW1wbGF0aW5nIGFuZCBjb21tb24gc3RydWN0dXJlc1xuKi9cblxuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vdGVtcGxhdGUvbm90UmVuZGVyZXInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JzsgLy8gc21hcnRlciB3aXRoIGJpbmRpbmdzIGZvciBldmVudHMsIGFjdHVhbHkgcHJveHlcblxuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi9jb21wb25lbnRzL25vdEZvcm0nO1xuaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4vY29tcG9uZW50cy9ub3RUYWJsZSc7XG5pbXBvcnQgbm90VmlldyBmcm9tICcuL2NvbXBvbmVudHMvbm90Vmlldyc7XG5cbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnOyAvL1x0aG93IHRvIGludGVyYWN0IHdpdGggZGF0YSBvbiBzZXJ2ZXJcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnOyAvL1x0d3JhcHBlciBmb3IgZGF0YSB3aXRoIHNlcnZlcjwtPnZpZXcgbGl2ZSBpbnRlcmFjdGlvbnNcblxubm90VGVtcGxhdGVQcm9jZXNzb3JzLmFkZChub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIpO1xuXG5leHBvcnQge1xuXHRub3RDb21tb24sXG5cdG5vdFBhdGgsXG5cdG5vdEJhc2UsXG5cdG5vdEltYWdlLFxuXHRub3RBcHAsXG5cdG5vdEFQSSxcblx0bm90Q29udHJvbGxlcixcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIsXG5cdG5vdFRlbXBsYXRlQ2FjaGUsXG5cdG5vdFJlbmRlcmVyLFxuXHRub3RDb21wb25lbnQsXG5cdG5vdEZvcm0sXG5cdG5vdFRhYmxlLFxuXHRub3RWaWV3LFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZ2V0U2Vzc2lvbklEIiwicmVzcG9uc2VUeXBlIiwid2l0aENyZWRlbnRpYWxzIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ0Iiwib25lcnJvciIsIm9udGltZW91dCIsInNlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwidGhhdCIsIkNvbW1vbkxvZ3MiLCJsb2ciLCJhcmd1bWVudHMiLCJlcnJvciIsInRyYWNlIiwiTUFQX01BTkFHRVIiLCJTeW1ib2wiLCJDb21tb25TaG9ydHMiLCJnZXRNYW5hZ2VyIiwiZ2V0QVBJIiwidiIsIkNvbW1vbk9iamVjdHMiLCJkZWZhdWx0cyIsIm9wdGlvbnMiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0Iiwic291cmNlcyIsImZvckVhY2giLCJkZXNjcmlwdG9ycyIsImtleXMiLCJzb3VyY2UiLCJyZWR1Y2UiLCJrZXkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJkZXNjcmlwdG9yIiwic3ltIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJiaWciLCJzbWFsbCIsIm9iaiIsImZpbHRlciIsImNvbnRhaW5zT2JqIiwiaWNvbnMiLCJiYXRjaCIsImxlbmd0aCIsImdldERhdGEiLCJwdXNoIiwiYSIsImIiLCJwIiwiZXF1YWwiLCJ0b1N0cmluZyIsImRlZmF1bHRWYWx1ZSIsIm9iajEiLCJvYmoyIiwialF1ZXJ5IiwiZXh0ZW5kIiwidmFsIiwicmVnaXN0cnkiLCJDb21tb25TdHJpbmdzIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsIkNvbW1vbkZ1bmN0aW9ucyIsImZ1bmNzIiwicmVzdWx0IiwiZnVuYyIsIkNvbW1vbkRPTSIsImVsIiwic3RhcnRzV2l0aCIsImFsbEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImxpc3QiLCJqIiwiYXR0cyIsImF0dHJpYnV0ZXMiLCJuIiwibm9kZU5hbWUiLCJub3RDb21tb24iLCJhc3NpZ24iLCJleHRlbmRXaXRoIiwiU1VCX1BBVEhfU1RBUlQiLCJTVUJfUEFUSF9FTkQiLCJQQVRIX1NQTElUIiwiUEFUSF9TVEFSVF9PQkpFQ1QiLCJQQVRIX1NUQVJUX0hFTFBFUlMiLCJGVU5DVElPTl9NQVJLRVIiLCJNQVhfREVFUCIsIm5vdFBhdGgiLCJwYXRoIiwic3ViUGF0aCIsImZpbmQiLCJzdWIiLCJwYXJzZWQiLCJzdWJmIiwicmVwbGFjZSIsIml0ZW0iLCJoZWxwZXJzIiwic3ViUGF0aFBhcnNlZCIsImZpbmROZXh0U3ViUGF0aCIsImdldFZhbHVlQnlQYXRoIiwicmVwbGFjZVN1YlBhdGgiLCJwYXJzZVN1YnMiLCJhdHRyVmFsdWUiLCJzZXRWYWx1ZUJ5UGF0aCIsImlzUmVjb3JkIiwibm9ybWlsaXplUGF0aCIsInRyaWdnZXIiLCJzdGVwIiwiaGVscGVyIiwiclN0ZXAiLCJ1bmRlZmluZWQiLCJBcnJheSIsImlzQXJyYXkiLCJzcGxpdCIsInBhcnNlUGF0aFN0ZXAiLCJvYmplY3QiLCJhdHRyUGF0aCIsImF0dHJOYW1lIiwic2hpZnQiLCJpc0Z1bmN0aW9uIiwibmV3T2JqIiwiYXJncyIsImpvaW4iLCJNRVRBX0VWRU5UUyIsIk1FVEFfREFUQSIsIk1FVEFfV09SS0lORyIsIk1FVEFfT1BUSU9OUyIsIm5vdEJhc2UiLCJ3aGF0Iiwic2V0IiwicmVzIiwic2V0Q29tbW9uIiwiZ2V0Q29tbW9uIiwiZ2V0T3B0aW9ucyIsImdldFdvcmtpbmciLCJldmVudE5hbWVzIiwiZXZlbnRDYWxsYmFja3MiLCJvbmNlIiwiZGVmaW5lSWZOb3RFeGlzdHMiLCJuYW1lIiwiZnJvbSIsImV2ZW50TmFtZSIsImV2ZW50Iiwib2ZmIiwiY2FsbGJhY2tzIiwiY2FsbGJhY2siLCJ0YXJnZXRJZCIsInNwbGljZSIsIm5vdEFQSU9wdGlvbnMiLCJub3RBUElRdWVlIiwicmVxdWVzdHNQZXJTZWNvbmQiLCJxdWVlIiwiaW50Iiwid2luZG93Iiwic2V0SW50ZXJ2YWwiLCJjaGVjayIsImJpbmQiLCJpblByb2dyZXNzIiwidG9DYWxsIiwiY2xlYXJJbnRlcnZhbCIsInJ1biIsIm5vdEFQSSIsInNldE9wdGlvbnMiLCJwYXJ0cyIsImlkIiwiZ29vZCIsImJhZCIsImFkZCIsIm1ha2VSZXF1ZXN0IiwicmVzcG9uc2VPSyIsInJlc3BvbnNlRmFpbGVkIiwicmVxdWVzdEpTT04iLCJ0aGVuIiwibmV4dCIsImNhdGNoIiwiY29kZSIsImdldElkIiwibW9kZWxOYW1lIiwiZ2V0TW9kZWxOYW1lIiwibWFrZVVybCIsImdldEpTT04iLCJnZXRNb2RlbCIsInNldFByaWNlIiwibW9kZWwiLCJub3RJbWFnZSIsIm5vdEludGVyZmFjZSIsIm1hbmlmZXN0IiwibGluZSIsInJlY29yZCIsImFjdGlvbk5hbWUiLCJyZWNvcmRSRSIsImZpZWxkTmFtZSIsImluZCIsImxlbiIsImluZDIiLCJzdGFydFNsaWNlIiwiZW5kU2xpY2UiLCJnZXRBdHRyIiwiYWN0aW9uRGF0YSIsInBhcnNlTGluZSIsInBvc3RGaXgiLCJnZXRBY3Rpb25zIiwiYWN0aW9ucyIsInZhbHVlIiwic2V0RmlsdGVyIiwiZmlsdGVyRGF0YSIsInNldE1vZGVsUGFyYW0iLCJnZXRNb2RlbFBhcmFtIiwic29ydGVyRGF0YSIsInBhZ2VOdW1iZXIiLCJwYWdlU2l6ZSIsInBhcmFtTmFtZSIsInBhcmFtVmFsdWUiLCJnZXRBY3Rpb25EYXRhIiwiZ2V0VVJMIiwicXVlZVJlcXVlc3QiLCJvbkxvYWQiLCJub3RSZWNvcmQiLCJNRVRBX0lOVEVSRkFDRSIsIk1FVEFfUFJPWFkiLCJNRVRBX0NIQU5HRSIsIk1FVEFfQ0hBTkdFX05FU1RFRCIsIk1FVEFfU0FMIiwiREVGQVVMVF9BQ1RJT05fUFJFRklYIiwiREVGQVVMVF9QQUdFX05VTUJFUiIsIkRFRkFVTFRfUEFHRV9TSVpFIiwiTUVUQV9SRVRVUk5fVE9fUk9PVCIsImNyZWF0ZVByb3BlcnR5SGFuZGxlcnMiLCJvd25lciIsImNvbnRleHQiLCJyZXNUYXJnZXQiLCJSZWZsZWN0IiwiRXJyb3IiLCJ2YWx1ZVRvUmVmbGVjdCIsIm5vdFByb3BlcnR5IiwiZ2V0Um9vdCIsInBhdGhUbyIsImlzUHJveHkiLCJQcm94eSIsInNldERhdGEiLCJvbiIsInByb3h5Iiwicm9vdCIsImNyZWF0ZVJlY29yZEhhbmRsZXJzIiwiY3JlYXRlQ29sbGVjdGlvbiIsIm5vdFJlY29yZEludGVyZmFjZSIsImluaXRQcm9wZXJ0aWVzIiwiaW50ZXJmYWNlVXAiLCJjdXJQYXRoIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsIml0ZW1zIiwiY29sbGVjdGlvbiIsImdldEFjdGlvbnNDb3VudCIsImFjdGlvblVwIiwiaW5kZXgiLCJyZXF1ZXN0Iiwib2JqZWN0UGFydCIsInNldEF0dHIiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgiLCJURU1QTEFURV9UQUciLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCIsIkNPTVBPTkVOVF9JRF9QUkVGSVgiLCJQQVJUX0lEX1BSRUZJWCIsIkRFRkFVTFRfUExBQ0VSIiwiREVGQVVMVF9QTEFDRVJfTE9PUCIsIk9QVFMiLCJNRVRBX0NBQ0hFIiwibm90VGVtcGxhdGVDYWNoZSIsInNldFdvcmtpbmciLCJoaWRlVGVtcGxhdGVzIiwicmVnaXN0ZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJtYXAiLCJsb2FkT25lIiwib1JlcXVlc3QiLCJhZGRFdmVudExpc3RlbmVyIiwiZGl2IiwiZGF0YXNldCIsIm5vdFRlbXBsYXRlTmFtZSIsIm5vdFRlbXBsYXRlVVJMIiwic3JjRWxlbWVudCIsInJlc3BvbnNlVGV4dCIsInNldE9uZSIsImVsZW1lbnQiLCJjbG9uZU5vZGUiLCJjb250IiwidGV4dCIsIm5vdFRlbXBsYXRlc0VsZW1lbnRzIiwicGFyZW50Tm9kZSIsImxpYiIsImdldEhUTUwiLCJ0ZW1wbGF0ZUlubmVySFRNTCIsInRlbXBsYXRlQ29udEVsIiwid3JhcCIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsIk1FVEFfUFJPQ0VTU09SUyIsIm5vdFRlbXBsYXRlUHJvY2Vzc29ycyIsInNldFByb2Nlc3NvciIsImdldFByb2Nlc3NvciIsIk1FVEFfQ09NUE9ORU5UUyIsIm5vdFJlbmRlcmVyIiwiaW5wdXQiLCJpbml0IiwicmVuZGVyIiwiY29tcG9uZW50IiwiaW5pdERhdGEiLCJpbml0T3B0aW9ucyIsImluaXRXb3JraW5nIiwidGVtcGxhdGUiLCJpbml0VGVtcGxhdGUiLCJvbkNoYW5nZSIsIk1hdGgiLCJyYW5kb20iLCJnZXRCcmVhZENydW1wcyIsInVwZGF0ZSIsImNsZWFyU3Rhc2giLCJzZXRXb3JraW5nTWFwcGluZyIsImV4ZWNQcm9jZXNzb3JzIiwic2VhcmNoRm9yU3ViVGVtcGxhdGVzIiwic3Rhc2hSZW5kZXJlZCIsImlmUGFydCIsImNvbXBvbmVudFBhdGgiLCJjaGFuZ2VkUGF0aCIsImlmRnVsbFN1YlBhdGgiLCJjcmVhdGVNYXBwaW5nIiwiZmluZEFsbFByb2Nlc3NvcnMiLCJwcm9jcyIsImVscyIsImdldEF0dHJpYnV0ZXNTdGFydHNXaXRoIiwiZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCIsInByb2NEYXRhIiwicGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uIiwicHJvY2Vzc29yRXhwcmVzc2lvbiIsImF0dHJpYnV0ZUV4cHJlc3Npb24iLCJpZkNvbmRpdGlvbiIsInBhcmFtcyIsInByb2Nlc3Nvck5hbWUiLCJtYXBwaW5nIiwicHJvY1Njb3BlIiwiYXR0cmlidXRlUmVzdWx0IiwiZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdCIsInByb2NOYW1lIiwicHJvYyIsInJlbW92ZUF0dHJpYnV0ZSIsImRlc3Ryb3lTdWJzIiwiZGVzdHJveSIsImNsZWFyU3ViVGVtcGxhdGVzIiwiZ2V0U3Rhc2giLCJyZW1vdmVDaGlsZCIsIm50RWwiLCJudFJlbmRlcmVkIiwic3VicyIsIm50IiwiaWZTdWJFbGVtZW50UmVuZGVyZWQiLCJyZW5kZXJTdWIiLCJkZXRhaWxzIiwiZGF0YVBhdGgiLCJub3RDb21wb25lbnQiLCJjaGlsZE5vZGVzIiwiYWRkVG9TdGFzaCIsInN0YXNoIiwibmV3U3Rhc2giLCJhbmNob3IiLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsIm5vZGUiLCJwbGFjZSIsInRhcmdldEVsIiwiY2hpbGRyZW4iLCJyZW5kZXJlZCIsInBsYWNlQWZ0ZXIiLCJwbGFjZUJlZm9yZSIsInBsYWNlRmlyc3QiLCJwbGFjZUxhc3QiLCJub3RQbGFjZXJzIiwiTUVUQV9QQVJUUyIsInJlc2V0UGFydHMiLCJwcmVwYXJlVGVtcGxhdGVFbGVtZW50IiwiaW5pdE1hcmtFbGVtZW50IiwibWFya0VsIiwicGxhY2VyIiwiZ2V0UGxhY2VyIiwibWFpbiIsInVuc2V0UmVhZHkiLCJodG1sIiwic2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJnZXRGcm9tVVJMIiwicmVwb3J0IiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJjbGVhclBhcnRzIiwiZm9yRWFjaERhdGEiLCJyZW5kZXJQYXJ0IiwicGxhY2VSZW5kZXJlZCIsInJlbW92ZU9ic29sZXRlUGFydHMiLCJwbGFjZVBhcnQiLCJwYXJ0IiwiZ2V0UGFydEJ5RGF0YSIsIm5vZGVzIiwibGFzdE5vZGUiLCJub2RlVHlwZSIsImdldFBhcnRzIiwicmVuZGVyZXIiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lIiwiYWRkUGFydCIsInVwZGF0ZVBhcnQiLCJwaXBlIiwiZmluZEFjdHVhbFBhcnRzIiwicmVtb3ZlTm90QWN0dWFsUGFydHMiLCJhY3R1YWxQYXJ0cyIsImlzRGF0YSIsIm5vdEZvcm1GYWN0b3J5Iiwib25TdWJtaXQiLCJvblJlc2V0Iiwib25DYW5jZWwiLCJyZW5kZXJXcmFwcGVyIiwicmVuZGVyQ29tcG9uZW50cyIsIm5vdFZpZXciLCJkZWZhdWx0UmVzdWx0IiwiYm9keSIsImdldFRlbXBsYXRlT3B0aW9ucyIsIm5vdENvbnRyb2xsZXIiLCJhcHAiLCJjb250cm9sbGVyTmFtZSIsIm5jTmFtZSIsImNhcGl0YWxpemVGaXJzdExldHRlciIsImNvbnRhaW5lclNlbGVjdG9yIiwidmlld3NQb3N0Zml4IiwicmVuZGVyRnJvbVVSTCIsImdldEludGVyZmFjZXMiLCJpbnRlcmZhYzMiLCJuYyIsInZpZXciLCJ2aWV3cyIsInJlYWxDYWxsYmFjayIsInJlYWxIZWxwZXJzIiwicGxhY2VJZCIsImdldEVsZW1lbnRCeUlkIiwidGVtcGxhdGVVUkwiLCJjb21tb24iLCJjb21tb25WaWV3c1ByZWZpeCIsInZpZXdzUHJlZml4IiwidGVtcGxhdGVOYW1lIiwiZXhlY0FuZFB1dCIsInNoYXJlZExpc3QiLCJfX3Byb3RvX18iLCJrIiwiT1BUX0NPTlRST0xMRVJfUFJFRklYIiwiT1BUX1JFQ09SRF9QUkVGSVgiLCJub3RBcHAiLCJub3RNYW5pZmVzdCIsInJlc291cmNlcyIsInN1Y2Nlc3MiLCJzZXRJbnRlcmZhY2VNYW5pZmVzdCIsInVwZGF0ZUludGVyZmFjZXMiLCJpbml0Rm9ybUJ1aWxkZXJzIiwiaW5pdENvbnRyb2xsZXIiLCJhbGxSZXNvdXJjZXNSZWFkeSIsInN0YXJ0QXBwIiwiaW5pdFJvdXRlciIsImN0cmwiLCJleGVjIiwicm91dGllSW5wdXQiLCJyb3V0ZSIsImJpbmRDb250cm9sbGVyIiwicm91dGllIiwiY2xlYXJJbnRlcmZhY2VzIiwiaW5pdEludGVyZmFjZSIsImdldFJlY29yZE5hbWUiLCJjbGVhckZvcm1CdWlsZGVycyIsImluaXRGb3JtQnVpbGRlciIsIndhaXRUaGlzUmVzb3VyY2UiLCJ0eXBlIiwib25SZXNvdXJjZVJlYWR5Iiwibm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIiwic2NvcGUiLCJ0ZXh0Q29udGVudCIsImUiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImxpdmVFdmVudHMiLCJvbkV2ZW50IiwicHJvY2Vzc2VkVmFsdWUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJvcHRpb24iLCJ2YWx1ZUZpZWxkTmFtZSIsImxhYmVsRmllbGROYW1lIiwic3ViTGliIiwiaXRlbVZhbHVlRmllbGROYW1lIiwibGFiZWwiLCJmaWVsZFBsYWNlSG9sZGVyRGVmYXVsdCIsImZpZWxkUGxhY2VIb2xkZXIiLCJub3RGb3JtIiwibm90VGFibGUiXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWE7U0FDZCxLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFhO1NBQ2xCLEtBQUtDLEdBQUwsQ0FBUyxVQUFULElBQXVCRCxHQUE5QjtFQUxrQjtnQkFPSix1QkFBU0UsU0FBVCxFQUFvQkMsTUFBcEIsRUFBNEI7T0FDdEMsSUFBSUMsQ0FBUixJQUFhRixTQUFiLEVBQXdCO1FBQ25CLElBQUlHLENBQVIsSUFBYUYsTUFBYixFQUFxQjtRQUNqQkQsVUFBVUUsQ0FBVixFQUFhRSxjQUFiLENBQTRCSCxPQUFPRSxDQUFQLENBQTVCLENBQUgsRUFBMkM7U0FDdENFLFFBQVEsSUFBSUMsS0FBSixFQUFaO1dBQ01DLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsV0FBbEM7V0FDTUMsR0FBTixHQUFZUixVQUFVRSxDQUFWLEVBQWFELE9BQU9FLENBQVAsQ0FBYixFQUF3Qk0sT0FBeEIsQ0FBZ0MsSUFBaEMs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
