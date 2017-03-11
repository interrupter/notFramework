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
				}).catch(function (e) {
					notCommon.error('error loading templates lib', url, e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9pbmRleC5qcyIsIi4uL3NyYy9ub3RQYXRoLmpzIiwiLi4vc3JjL25vdEJhc2UuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy9ub3RSZWNvcmRJbnRlcmZhY2UuanMiLCIuLi9zcmMvbm90UmVjb3JkLmpzIiwiLi4vc3JjL3RlbXBsYXRlL29wdGlvbnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90UmVuZGVyZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlQWZ0ZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUJlZm9yZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlRmlyc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUxhc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9yZXBsYWNlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvaW5kZXguanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90Q29tcG9uZW50LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybUZhY3RvcnkuanMiLCIuLi9zcmMvbm90Q29udHJvbGxlci5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFRhYmxlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Vmlldy5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29tbW9uTmV0d29yayA9IHtcblx0YWRkSG9zdDogZnVuY3Rpb24odXJpKXtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ2hvc3QnKSArIHVyaTtcblx0fSxcblx0YWRkUHJvdG9jb2w6IGZ1bmN0aW9uKHVyaSl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvcih2YXIgaSBpbiBkYXRhQXJyYXkpIHtcblx0XHRcdGZvcih2YXIgZiBpbiBmaWVsZHMpIHtcblx0XHRcdFx0aWYoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRsZXQgdGhhdCA9IHRoaXM7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUFVUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpPT57XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAocGFyc2VJbnQoc3RhdHVzKSA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKGUpID0+IHJlamVjdChlKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRTZXNzaW9uSUQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAnJztcblx0fSxcbn07XG5leHBvcnQgZGVmYXVsdCBDb21tb25OZXR3b3JrO1xuIiwidmFyIENvbW1vbkxvZ3MgPSB7XG5cdGRlYnVnOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZyguLi5hcmd1bWVudHMpO1xuXHR9LFxuXHRsb2c6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGVycm9yOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHJlcG9ydDogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5lcnJvciguLi5hcmd1bWVudHMpO1xuXHR9LFxuXHR0cmFjZTogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS50cmFjZSguLi5hcmd1bWVudHMpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTG9ncztcbiIsImNvbnN0IE1BUF9NQU5BR0VSID0gU3ltYm9sKCdNQVBfTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFQX01BTkFHRVJdID0gdjtcblx0fSxcblx0Z2V0TWFuYWdlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUFQX01BTkFHRVJdO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU2hvcnRzO1xuIiwiLyogZ2xvYmFsIGpRdWVyeSAqL1xudmFyIENvbW1vbk9iamVjdHMgPSB7XG5cdGV4dGVuZDogZnVuY3Rpb24oZGVmYXVsdHMsIG9wdGlvbnMpIHtcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcblx0XHR2YXIgcHJvcDtcblx0XHRmb3IgKHByb3AgaW4gZGVmYXVsdHMpIHtcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGVmYXVsdHMsIHByb3ApKSB7XG5cdFx0XHRcdGV4dGVuZGVkW3Byb3BdID0gZGVmYXVsdHNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsIHByb3ApKSB7XG5cdFx0XHRcdGV4dGVuZGVkW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGV4dGVuZGVkO1xuXHR9LFxuXHRjb21wbGV0ZUFzc2lnbjogZnVuY3Rpb24odGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG5cdFx0c291cmNlcy5mb3JFYWNoKHNvdXJjZSA9PiB7XG5cdFx0XHRsZXQgZGVzY3JpcHRvcnMgPSBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZSgoZGVzY3JpcHRvcnMsIGtleSkgPT4ge1xuXHRcdFx0XHRkZXNjcmlwdG9yc1trZXldID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSk7XG5cdFx0XHRcdHJldHVybiBkZXNjcmlwdG9ycztcblx0XHRcdH0sIHt9KTtcblx0XHRcdC8vIGJ5IGRlZmF1bHQsIE9iamVjdC5hc3NpZ24gY29waWVzIGVudW1lcmFibGUgU3ltYm9scyB0b29cblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5mb3JFYWNoKHN5bSA9PiB7XG5cdFx0XHRcdGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSk7XG5cdFx0XHRcdGlmIChkZXNjcmlwdG9yLmVudW1lcmFibGUpIHtcblx0XHRcdFx0XHRkZXNjcmlwdG9yc1tzeW1dID0gZGVzY3JpcHRvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIGRlc2NyaXB0b3JzKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9LFxuXHRleHRlbmRXaXRoOiBmdW5jdGlvbihvcHRpb25zKXtcblx0XHRmb3IgKGxldCBwcm9wIGluIG9wdGlvbnMpIHtcblx0XHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KHByb3ApKSB7XG5cdFx0XHRcdHRoaXNbcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRjb250YWluc09iajogZnVuY3Rpb24oYmlnLCBzbWFsbCkge1xuXHRcdGZvciAodmFyIHQgaW4gc21hbGwpIHtcblx0XHRcdGlmIChzbWFsbC5oYXNPd25Qcm9wZXJ0eSh0KSkge1xuXHRcdFx0XHRpZiAoKCFiaWcuaGFzT3duUHJvcGVydHkodCkpIHx8IChiaWdbdF0gIT09IHNtYWxsW3RdKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmlsdGVyOiBmdW5jdGlvbihvYmosIGZpbHRlcikge1xuXHRcdGlmIChmaWx0ZXIgJiYgb2JqKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jb250YWluc09iaihvYmosIGZpbHRlcik7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRmaW5kSWNvbkJ5RmlsdGVyOiBmdW5jdGlvbihpY29ucywgZmlsdGVyKSB7XG5cdFx0dmFyIGJhdGNoID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpY29ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuZmlsdGVyKGljb25zW2ldLmdldERhdGEoKSwgZmlsdGVyKSkge1xuXHRcdFx0XHRiYXRjaC5wdXNoKGljb25zW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGJhdGNoO1xuXHR9LFxuXHRlcXVhbE9iajogZnVuY3Rpb24oYSwgYikge1xuXHRcdHZhciBwO1xuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChwIGluIGEpIHtcblx0XHRcdGlmIChhW3BdKSB7XG5cdFx0XHRcdHN3aXRjaCAodHlwZW9mKGFbcF0pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoIXRoaXMuZXF1YWwoYVtwXSwgYltwXSkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoYVtwXSAhPSBiW3BdKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChiW3BdKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKHAgaW4gYikge1xuXHRcdFx0aWYgKHR5cGVvZihhW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRkZWZpbmVJZk5vdEV4aXN0czogZnVuY3Rpb24ob2JqLCBrZXksIGRlZmF1bHRWYWx1ZSkge1xuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdG9ialtrZXldID0gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fSxcblx0ZGVlcE1lcmdlOiBmdW5jdGlvbihvYmoxLCBvYmoyKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIG9iajEsIG9iajIpO1xuXHR9LFxuXG5cdHJlZ2lzdHJ5OiB7fSxcblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbk9iamVjdHM7XG4iLCJ2YXIgQ29tbW9uU3RyaW5ncyA9IHtcblx0Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG5cdH0sXG5cdGxvd2VyRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblN0cmluZ3M7XG4iLCJ2YXIgQ29tbW9uRnVuY3Rpb25zID0ge1xuXHRwaXBlOiBmdW5jdGlvbihkYXRhLyogZmVlZCBkYXRhICovLCBmdW5jcy8qIGZ1bmN0aW9ucyBhcnJheSAqLykge1xuXHRcdGxldCByZXN1bHQ7XG5cdFx0Zm9yKGxldCBmdW5jIG9mIGZ1bmNzKXtcblx0XHRcdHJlc3VsdCA9IGZ1bmMocmVzdWx0IHx8IGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRnVuY3Rpb25zO1xuIiwidmFyIENvbW1vbkRPTSA9IHtcblx0Z2V0QXR0cmlidXRlc1N0YXJ0c1dpdGg6IGZ1bmN0aW9uKGVsLCBzdGFydHNXaXRoKSB7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihzdGFydHNXaXRoKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwiaW1wb3J0IENvbW1vbk5ldHdvcmsgZnJvbSAnLi9uZXQuanMnO1xuaW1wb3J0IENvbW1vbkxvZ3MgZnJvbSAnLi9sb2dzLmpzJztcbmltcG9ydCBDb21tb25TaG9ydHMgZnJvbSAnLi9zaG9ydHMuanMnO1xuaW1wb3J0IENvbW1vbk9iamVjdHMgZnJvbSAnLi9vYmplY3RzLmpzJztcbmltcG9ydCBDb21tb25TdHJpbmdzIGZyb20gJy4vc3RyaW5ncy5qcyc7XG5pbXBvcnQgQ29tbW9uRnVuY3Rpb25zIGZyb20gJy4vZnVuY3Rpb25zLmpzJztcbmltcG9ydCBDb21tb25ET00gZnJvbSAnLi9kb20uanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tbW9uO1xuIiwiLypcblx0OnByb3BlcnR5LnN1YjEuZnVuYygpLmZ1bmNQcm9wXG5cdCA9IHJldHVybiBmdW5jUHJvcCBvZiBmdW5jdGlvbiByZXN1bHQgb2Ygc3ViMSBwcm9wZXJ0eSBvZiBwcm9wZXJ0eSBvZiBvYmplY3Rcblx0Ons6OmhlbHBlclZhbH0uc3ViXG5cdCA9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgcHJvcGVydHkgb2YgaGVscGVycyBvYmplY3Rcblx0Ons6OmhlbHBlckZ1bmMoKX0uc3ViXG5cdD0gcmV0dXJuIHN1YiBwcm9wZXJ0eSBvZiBvYmplY3QgcHJvcGVydHkgd2l0aCBuYW1lIHJldHJpZXZlZCBmcm9tIGhlbHBlclZhbCBmdW5jdGlvbiByZXN1bHQgb2YgaGVscGVycyBvYmplY3QuXG5cdGlmIGhlbHBlcnNGdW54IHJldHVybiAnY2FyJyB0aGVuIHNvdXJjZSBwYXRoIGJlY29tZXMgOmNhci5zdWJcblxuKi9cblxuY29uc3QgU1VCX1BBVEhfU1RBUlQgPSAneycsXG5cdFNVQl9QQVRIX0VORCA9ICd9Jyxcblx0UEFUSF9TUExJVCA9ICcuJyxcblx0UEFUSF9TVEFSVF9PQkpFQ1QgPSAnOicsXG5cdFBBVEhfU1RBUlRfSEVMUEVSUyA9ICc6OicsXG5cdEZVTkNUSU9OX01BUktFUiA9ICcoKScsXG5cdE1BWF9ERUVQID0gMTA7XG5cbmNsYXNzIG5vdFBhdGh7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Lypcblx0XHRpbnB1dCAnOns6OmhlbHBlclZhbH0uc3ViJ1xuXHRcdHJldHVybiA6OmhlbHBlclZhbFxuXHQqL1xuXHRmaW5kTmV4dFN1YlBhdGgocGF0aC8qIHN0cmluZyAqLyl7XG5cdFx0bGV0IHN1YlBhdGggPSAnJyxcblx0XHRcdGZpbmQgPSBmYWxzZTtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRpZiAocGF0aFtpXSA9PT0gU1VCX1BBVEhfU1RBUlQpe1xuXHRcdFx0XHRmaW5kID0gdHJ1ZTtcblx0XHRcdFx0c3ViUGF0aCA9ICcnO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKHBhdGhbaV0gPT09IFNVQl9QQVRIX0VORCAmJiBmaW5kKXtcblx0XHRcdFx0XHRpZiAoZmluZCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHN1YlBhdGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRzdWJQYXRoKz1wYXRoW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmaW5kP3N1YlBhdGg6bnVsbDtcblx0fVxuXG5cdHJlcGxhY2VTdWJQYXRoKHBhdGgsIHN1YiwgcGFyc2VkKXtcblx0XHRsZXQgc3ViZiA9IFNVQl9QQVRIX1NUQVJUK3N1YitTVUJfUEFUSF9FTkQ7XG5cdFx0d2hpbGUocGF0aC5pbmRleE9mKHN1YmYpID4gLTEpe1xuXHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShzdWJmLCBwYXJzZWQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdHBhcnNlU3VicyhwYXRoLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cblxuXHRwYXJzZVBhdGhTdGVwKHN0ZXAsIGl0ZW0sIGhlbHBlcil7XG5cdFx0bGV0IHJTdGVwID0gbnVsbDtcblx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKSA9PT0gMCAmJiBoZWxwZXIpe1xuXHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9IRUxQRVJTLCAnJyk7XG5cdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdGlmKGhlbHBlci5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPT09IDAgJiYgaXRlbSl7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCAnJyk7XG5cdFx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRcdGlmKGl0ZW0uaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBzdGVwO1xuXHR9XG5cblx0Ly86OmZpZWxkTmFtZS5yZXN1bHRcblx0Ly97fVxuXHQvL3tmaWVsZE5hbWU6ICd0YXJnZXRSZWNvcmRGaWVsZCd9XG5cdC8vLy9bJ3RhcmdldFJlY29yZEZpZWxkJywgJ3Jlc3VsdCddXG5cdHBhcnNlUGF0aChwYXRoLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRwYXRoID0gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0cGF0aFtpXSA9IHRoaXMucGFyc2VQYXRoU3RlcChwYXRoW2ldLCBpdGVtLCBoZWxwZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdG5vcm1pbGl6ZVBhdGgocGF0aCl7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cmV0dXJuIHBhdGg7XG5cdFx0fWVsc2V7XG5cdFx0XHR3aGlsZShwYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID4gLTEpe1xuXHRcdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCcnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0c21hbGwgPSBbXCJ0b2RvXCJdLFxuXHRcdGJpZyA9IFtcInRvZG9cIiwgXCJsZW5ndGhcIl1cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHQqL1xuXG5cdGlmRnVsbFN1YlBhdGgoYmlnLCBzbWFsbCl7XG5cdFx0aWYgKGJpZy5sZW5ndGg8c21hbGwubGVuZ3RoKXtyZXR1cm4gZmFsc2U7fVxuXHRcdGZvcihsZXQgdCA9MDsgdCA8IHNtYWxsLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHNtYWxsW3RdICE9PSBiaWdbdF0pe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCksXG5cdFx0XHRpc0Z1bmN0aW9uID0gYXR0ck5hbWUuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpPi0xO1xuXHRcdGlmIChpc0Z1bmN0aW9uKXtcblx0XHRcdGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHR9XG5cdFx0aWYgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgdHlwZW9mIG9iamVjdFthdHRyTmFtZV0gIT09ICd1bmRlZmluZWQnICYmIG9iamVjdFthdHRyTmFtZV0gIT09IG51bGwpe1xuXHRcdFx0bGV0IG5ld09iaiA9IGlzRnVuY3Rpb24/b2JqZWN0W2F0dHJOYW1lXSgpOm9iamVjdFthdHRyTmFtZV07XG5cdFx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKG5ld09iaiwgYXR0clBhdGgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBuZXdPYmo7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdHNldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGF0dHJWYWx1ZSl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCk7XG5cdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0aWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKXtvYmplY3RbYXR0ck5hbWVdID0ge307fVxuXHRcdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChvYmplY3RbYXR0ck5hbWVdLCBhdHRyUGF0aCwgYXR0clZhbHVlKTtcblx0XHR9ZWxzZXtcblx0XHRcdG9iamVjdFthdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0am9pbigpe1xuXHRcdGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gYXJncy5qb2luKFBBVEhfU1BMSVQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RQYXRoKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXNbTUVUQV9FVkVOVFNdID0ge307XG5cdFx0dGhpc1tNRVRBX0RBVEFdID0ge307XG5cdFx0dGhpc1tNRVRBX1dPUktJTkddID0ge307XG5cdFx0dGhpc1tNRVRBX09QVElPTlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uICovXG5cdFx0XHRcdHdoYXQgPSBhcmdzWzBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uIGVsZW1lbnQgKi9cblx0XHRcdFx0bm90UGF0aC5zZXQoYXJnc1swXSAvKiBwYXRoICovICwgd2hhdCAvKiBjb2xsZWN0aW9uICovICwgdW5kZWZpbmVkIC8qIGhlbHBlcnMgKi8gLCBhcmdzWzFdIC8qIHZhbHVlICovICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRnZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCAqL1xuXHRcdGNhc2UgMTpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0fVxuXHRcdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggd2l0aCBkZWZhdWx0IHZhbHVlICovXG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHRcdGlmIChyZXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdC8qIG5vIGRhdGEsIHJldHVybiBkZWZhdWx0IHZhbHVlICovXG5cdFx0XHRcdFx0cmV0dXJuIGFyZ3NbMV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LyogZGF0YSwgcmV0dXJuIGl0ICovXG5cdFx0XHRcdFx0cmV0dXJuIHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0LyogcmV0dXJuIGZ1bGwgY29sbGVjdGlvbiAqL1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB3aGF0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0Q09SRSBPQkpFQ1Rcblx0XHRcdERBVEEgLSBpbmZvcm1hdGlvblxuXHRcdFx0T1BUSU9OUyAtIGhvdyB0byB3b3JrXG5cdFx0XHRXT1JLSU5HIC0gdGVtcG9yYXJpbHkgZ2VuZXJhdGVkIGluIHByb2NjZXNzXG5cdCovXG5cblx0c2V0RGF0YSgpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX0RBVEFdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldERhdGEoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0fVxuXG5cdGdldERhdGEoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9EQVRBXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldE9wdGlvbnMoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRPcHRpb25zKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX09QVElPTlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0V29ya2luZygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX1dPUktJTkddID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldFdvcmtpbmcoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXb3JraW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfV09SS0lOR10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKlxuXHRcdEVWRU5UUyBoYW5kbGluZ1xuXHQqL1xuXG5cdG9uKGV2ZW50TmFtZXMsIGV2ZW50Q2FsbGJhY2tzLCBvbmNlKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdG5vdENvbW1vbi5kZWZpbmVJZk5vdEV4aXN0cyh0aGlzW01FVEFfRVZFTlRTXSwgbmFtZSwgW10pO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0ucHVzaCh7XG5cdFx0XHRcdGNhbGxiYWNrczogZXZlbnRDYWxsYmFja3MsXG5cdFx0XHRcdG9uY2U6IG9uY2UsXG5cdFx0XHRcdGNvdW50OiAwXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHRyaWdnZXIoKSB7XG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyksXG5cdFx0XHRldmVudE5hbWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZSkpIHtcblx0XHRcdGV2ZW50TmFtZSA9IFtldmVudE5hbWVdO1xuXHRcdH1cblx0XHRldmVudE5hbWUuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5mb3JFYWNoKGV2ZW50ID0+IHtcblx0XHRcdFx0XHRpZiAoZXZlbnQub25jZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnQuY2FsbGJhY2tzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG9mZihldmVudE5hbWVzIC8qIGFycmF5IG9mIGV2ZW50IG5hbWVzICovICwgZXZlbnRDYWxsYmFja3MgLyogYXJyYXkgb2YgY2FsbGJhY2tzICovICkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGxldCB0YXJnZXRJZCA9IC0xO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaCgoZXZlbnQsIGkpID0+IHtcblx0XHRcdFx0aWYgKGkgPT09IC0xICYmIGV2ZW50Q2FsbGJhY2tzID09PSBldmVudC5jYWxsYmFja3MpIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9IGk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRhcmdldElkID4gLTEpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uc3BsaWNlKHRhcmdldElkLCAxKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuIiwibGV0IG5vdEFQSU9wdGlvbnMgPSB7XG5cdHJwczogNTAsXG5cdHByb3RvY29sOiAnaHR0cCcsXG5cdGhvc3Q6ICdsb2NhbGhvc3QnLFxuXHRwb3J0OiA5MDAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RBUElPcHRpb25zO1xuIiwiY2xhc3Mgbm90QVBJUXVlZXtcblx0Y29uc3RydWN0b3IgKHJlcXVlc3RzUGVyU2Vjb25kKSB7XG5cdFx0dGhpcy5xdWVlID0gW107XG5cdFx0dGhpcy5pbnQgPSBudWxsO1xuXHRcdHRoaXMucmVxdWVzdHNQZXJTZWNvbmQgPSByZXF1ZXN0c1BlclNlY29uZCB8fCA1O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuKCl7XG5cdFx0dGhpcy5pbnQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5jaGVjay5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5yZXF1ZXN0c1BlclNlY29uZCk7XG5cdH1cblxuXHRjaGVjaygpe1xuXHRcdGlmICh0aGlzLmluUHJvZ3Jlc3Mpe3JldHVybjt9XG5cdFx0ZWxzZXtcblx0XHRcdGlmICh0aGlzLnF1ZWUubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHRoaXMuaW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0XHRcdGxldCB0b0NhbGwgPSB0aGlzLnF1ZWUuc2hpZnQoKTtcblx0XHRcdFx0dG9DYWxsKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmV4dCgpe1xuXHRcdHRoaXMuaW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHR9XG5cblx0YWRkKGNhbGwpe1xuXHRcdHRoaXMucXVlZS5wdXNoKGNhbGwpO1xuXHR9XG5cblx0cGF1c2UoKXtcblx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludCk7XG5cdH1cblxuXHRyZXN1bWUoKXtcblx0XHR0aGlzLnJ1bigpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSVF1ZWU7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlLmpzJztcblxuaW1wb3J0IG5vdEFQSU9wdGlvbnMgZnJvbSAnLi9vcHRpb25zLmpzJztcbmltcG9ydCBub3RBUElRdWVlIGZyb20gJy4vcXVlZS5qcyc7XG5cblxuY2xhc3Mgbm90QVBJIGV4dGVuZHMgIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RDb21tb24uZXh0ZW5kKG5vdEFQSU9wdGlvbnMsIG9wdGlvbnMpKTtcblx0XHR0aGlzLnF1ZWUgPSBuZXcgbm90QVBJUXVlZSh0aGlzLmdldE9wdGlvbnMoJ3JwcycpKTtcblx0XHR0aGlzLnF1ZWUucnVuKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRtYWtlVXJsKHBhcnRzKSB7XG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJy8nKTtcblx0fVxuXG5cdHF1ZWVSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsIG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRtYWtlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCkge1xuXHRcdG5vdENvbW1vbi5sb2coJ21ha2luZyByZXF1ZXN0JywgbWV0aG9kLCB1cmwsIGlkKTtcblx0XHRub3RDb21tb24ucmVxdWVzdEpTT04obWV0aG9kLCB1cmwsIGRhdGEpXG5cdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVxdWVzdCBzdWNjZXNzZnVsbCcsIG1ldGhvZCwgdXJsLCBpZCwgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXNwb25zZSBpcyBnb29kJyk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChjb2RlLCByZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ3JlcXVlc3QgZmFpbGVkJywgbWV0aG9kLCB1cmwsIGlkLCByZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3Jlc3BvbnNlIGlzIGJhZCcpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZScpO1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncG9zdCcsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygncHV0dCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2dldCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnbGlzdCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2RlbGV0ZScsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2RlbGV0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldFVwbG9hZFVSTChtb2RlbCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSArIHRoaXMuZ2V0T3B0aW9ucygndXBsb2FkJykgKyBtb2RlbD9tb2RlbC5nZXRJZCgpOicnO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSTtcbiIsImltcG9ydCBub3RCYXNlICBmcm9tICcuLi9ub3RCYXNlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEltYWdlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW50ZXJmYWNlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGV4dGVuZE9iamVjdChvYmoxLCBvYmoyKSB7XG5cdFx0dmFyIGF0dHJOYW1lID0gJyc7XG5cdFx0Zm9yIChhdHRyTmFtZSBpbiBvYmoyKSB7XG5cdFx0XHRpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpIHtcblx0XHRcdFx0b2JqMVthdHRyTmFtZV0gPSBvYmoyW2F0dHJOYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG9iajE7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldEFjdGlvbnNDb3VudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBY3Rpb25zKCkgPyBPYmplY3Qua2V5cyh0aGlzLmdldEFjdGlvbnMoKSkubGVuZ3RoIDogMDtcblx0fVxuXG5cdGdldEFjdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFuaWZlc3QgJiYgdGhpcy5tYW5pZmVzdC5hY3Rpb25zP3RoaXMubWFuaWZlc3QuYWN0aW9ucyA6IHt9O1xuXHR9XG5cblx0c2V0RmluZEJ5KGtleSwgdmFsdWUpIHtcblx0XHR2YXIgb2JqID0ge307XG5cdFx0b2JqW2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIob2JqKTtcblx0fVxuXG5cdHNldEZpbHRlcihmaWx0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdmaWx0ZXInLCBmaWx0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFNvcnRlcihzb3J0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUocGFnZVNpemUpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZXIocGFnZVNpemUsIHBhZ2VOdW1iZXIpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldE1vZGVsUGFyYW0oJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0c2V0TW9kZWxQYXJhbShwYXJhbU5hbWUsIHBhcmFtVmFsdWUpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCkpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucyhwYXJhbU5hbWUsIHBhcmFtVmFsdWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZGVsUGFyYW0ocGFyYW1OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucyhwYXJhbU5hbWUsIG51bGwpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdC8vcmV0dXJuIFByb21pc2Vcblx0cmVxdWVzdChyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdHVybCA9IHRoaXMuZ2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIG5vdENvbW1vbi5nZXRBUEkoKS5xdWVlUmVxdWVzdChhY3Rpb25EYXRhLm1ldGhvZCwgdXJsLCBKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSwgdGhpcy5vbkxvYWQuYmluZCh7YWN0aW9uRGF0YSwgbWFuaWZlc3Q6IHRoaXMubWFuaWZlc3R9KSk7XG5cdH1cbi8qXG5cdF9yZXF1ZXN0X09ic29sZXRlXyhyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRub3RDb21tb24ubG9nKCdyZXF1ZXN0JywgcmVjb3JkLCBhY3Rpb25OYW1lLCBjYWxsYmFja1N1Y2Nlc3MsIGNhbGxiYWNrRXJyb3IpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwsIHJlY29yZC5nZXRJZCgpLCBKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSwgZ29vZCwgYmFkKVxuXHRcdFx0XHRcdC50aGVuKHJlc29sdmUpXG5cdFx0XHRcdFx0LmNhdGNoKHJlamVjdCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlJyk7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpO1xuXG5cdFx0fSk7XG5cblxuXHRcdGlmIChhY3Rpb25EYXRhKXtcblx0XHRcdHZhciB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eG1saHR0cC5vcGVuKGFjdGlvbkRhdGEubWV0aG9kLCB1cmwpO1xuXHRcdFx0eG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4bWxodHRwLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhtbGh0dHAud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhtbGh0dHAuY2FsbGJhY2tTdWNjZXNzID0gY2FsbGJhY2tTdWNjZXNzO1xuXHRcdFx0eG1saHR0cC5jYWxsYmFja0Vycm9yID0gY2FsbGJhY2tFcnJvcjtcblx0XHRcdHhtbGh0dHAub25sb2FkID0gdGhpcy5vbkxvYWQ7XG5cdFx0XHR4bWxodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSkpO1xuXHRcdH1cblx0fVxuKi9cblx0b25Mb2FkKGRhdGEpe1x0XHRcblx0XHRpZih0aGlzICYmIHRoaXMuYWN0aW9uRGF0YSAmJiB0aGlzLmFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiB0aGlzLmFjdGlvbkRhdGEuaXNBcnJheSkge1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0ZmlsZVVwbG9hZChmaWxlVXBsb2FkKSB7XG5cdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdC8vbm90Q29tbW9uLmxvZyhmaWxlVXBsb2FkLmZpbGUpO1xuXHRcdGlmICh4aHIudXBsb2FkICYmIHRoaXMuZmlsZUFsbG93ZWQoZmlsZVVwbG9hZC5maWxlKSkge1xuXHRcdFx0Ly8gcHJvZ3Jlc3MgYmFyXG5cdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcInByb2dyZXNzXCIsIGUsIGZpbGVVcGxvYWQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGF0LndvcmtpbmcuZmlsZVVwbG9hZHMuaW5kZXhPZihmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHRcdHRoYXQud29ya2luZy5maWxlVXBsb2Fkcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwic3VjY2Vzc1wiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9wZW4oXCJQT1NUXCIsIHRoaXMuZ2V0VXBsb2FkVXJsKCksIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgZmlsZVVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYX0ZJTEVOQU1FXCIsIGVuY29kZVVSSUNvbXBvbmVudChmaWxlVXBsb2FkLmZpbGUubmFtZSkpO1xuXHRcdFx0eGhyLnNlbmQoZmlsZVVwbG9hZC5maWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBuZXcgRXZlbnQoXCJXcm9uZ0ZpbGVUeXBlXCIpLCBmaWxlVXBsb2FkKTtcblx0XHR9XG5cdH1cblx0Ki9cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJztcblxuY29uc3QgTUVUQV9JTlRFUkZBQ0UgPSBTeW1ib2woJ2ludGVyZmFjZScpLFxuXHRNRVRBX1BST1hZID0gU3ltYm9sKCdwcm94eScpLFxuXHRNRVRBX0NIQU5HRSA9IFN5bWJvbCgnY2hhbmdlJyksXG5cdE1FVEFfQ0hBTkdFX05FU1RFRCA9IFN5bWJvbCgnY2hhbmdlLm5lc3RlZCcpLFxuXHRNRVRBX1NBTCA9IFsnZ2V0QXR0cicsICdnZXRBdHRycycsICdzZXRBdHRyJywgJ3NldEF0dHJzJywgJ2dldERhdGEnLCAnc2V0RGF0YScsICdnZXRKU09OJywgJ29uJywgJ29mZicsICd0cmlnZ2VyJ10sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTAsXG5cdE1FVEFfUkVUVVJOX1RPX1JPT1QgPSBTeW1ib2woJ3JldHVyblRvUm9vdCcpO1xuXG52YXIgY3JlYXRlUHJvcGVydHlIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdHlwZW9mIHRhcmdldFtrZXldKTtcblxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UHJvcGVydHkgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoZ2V0Um9vdCwgcGF0aFRvLCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUHJveHkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5zZXREYXRhKGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9SRVRVUk5fVE9fUk9PVF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRbTUVUQV9SRVRVUk5fVE9fUk9PVF0ocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHRsZXQgcm9vdCA9IHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpKCk7XG5cdFx0cm9vdC50cmlnZ2VyKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX1BST1hZXSwgdGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSwgdmFsdWUpO1xuXHR9XG59XG5cblxudmFyIGNyZWF0ZVJlY29yZEhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGFyZ2V0LCBrZXksIHZhbHVlKTtcblx0XHRcdFx0cmV0dXJuIHQ7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0fTtcbn07XG5cbmNsYXNzIG5vdFJlY29yZCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCwgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1Byb3h5KSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ3RoaXMgaXMgUHJveHkgaXRlbScpO1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1JlY29yZCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0ZmlsdGVyOiB7fSxcblx0XHRcdHNvcnRlcjoge30sXG5cdFx0XHRwYWdlTnVtYmVyOiBERUZBVUxUX1BBR0VfTlVNQkVSLFxuXHRcdFx0cGFnZVNpemU6IERFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0ZmllbGRzOiBbXVxuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdID0gbmV3IG5vdFJlY29yZEludGVyZmFjZShtYW5pZmVzdCk7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXMuaW50ZXJmYWNlVXAoKTtcblx0XHR0aGlzLmlzUmVjb3JkID0gdHJ1ZTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IHJlY29yZCBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdGluaXRQcm9wZXJ0aWVzKGl0ZW0sIHBhdGggPSAnJykge1xuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhpdGVtKTtcblx0XHRcdGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRcdGxldCBjdXJQYXRoID0gcGF0aCArIChwYXRoLmxlbmd0aCA+IDAgPyAnLicgOiAnJykgKyBrZXk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3VyUGF0aCcsIGN1clBhdGgpO1xuXHRcdFx0XHRpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtW2tleV0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gKCkgPT4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCk7XG5cdFx0XHRub3RDb21tb24ubG9nKCdkZWZpbmUnLCBERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleCk7XG5cdFx0fVxuXHR9XG5cdC8qXG5cdC0+ICdwYXRoLnRvLmtleScsIHZhbHVlT2ZLZXlcblx0PC0gb2ssIHdpdGggb25lIG9uQ2hhbmdlIGV2ZW50IHRyaWdnZXJlZFxuXHQqL1xuXG5cdHNldEF0dHIoa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBub3RQYXRoLnNldChrZXksIHRoaXNbTUVUQV9QUk9YWV0sIHt9LCB2YWx1ZSk7XG5cdH1cblxuXHQvKlxuXHQtPlxuXHR7XG5cdFx0J2tleVBhdGgnOiB2YWx1ZSxcblx0XHQna2V5LnN1YlBhdGgnOiB2YWx1ZTIsXG5cdFx0J2tleVBhdGguMC50aXRsZSc6IHZhbHVlM1xuXHR9XG5cdDwtIG9rLCB3aXRoIGJ1bmNoIG9mIG9uQ2hhbmdlIGV2ZW50cyB0cmlnZ2VyZWRcblx0Ki9cblx0c2V0QXR0cnMob2JqZWN0UGFydCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBpbiBvYmplY3RQYXJ0KSB7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMgb25lIHRvIGdvJywgcGF0aCk7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cihwYXRoLCBvYmplY3RQYXJ0W3BhdGhdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aFRvS2V5J1xuXHQ8LSB2YWx1ZTFcblxuXHQqL1xuXHRnZXRBdHRyKHdoYXQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ2dldEF0dHInLCB3aGF0KTtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQod2hhdCwgdGhpc1tNRVRBX1BST1hZXSwge30pO1xuXHR9XG5cblx0Lypcblx0LT4gWydwYXRoVG9LZXknLCAncGF0aC50by5rZXknLCAnc2ltcGxlS2V5JywuLi5dXG5cdDwtIFt2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzLC4uLl1cblx0Ki9cblx0Z2V0QXR0cnMod2hhdCkge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAod2hhdCAmJiB3aGF0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggb2Ygd2hhdCkge1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLmdldEF0dHIocGF0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRnZXRKU09OKCkge1xuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJjb25zdCBQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVggPSAnbi0nLFxuXHRURU1QTEFURV9UQUcgPSAnbnQnLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgPSAnLScsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYID0gJ2lmJyxcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCA9ICdub3RfY29tcG9uZW50XycsXG5cdFBBUlRfSURfUFJFRklYID0gJ25vdF9wYXJ0XycsXG5cdERFRkFVTFRfUExBQ0VSID0gJ3BsYWNlJyxcblx0REVGQVVMVF9QTEFDRVJfTE9PUCA9ICdwbGFjZUFmdGVyJztcblxuY29uc3QgT1BUUyA9IHtcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLFxuXHRURU1QTEFURV9UQUcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUixcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsXG5cdERFRkFVTFRfUExBQ0VSLFxuXHRDT01QT05FTlRfSURfUFJFRklYLFxuXHRQQVJUX0lEX1BSRUZJWCxcblx0REVGQVVMVF9QTEFDRVJfTE9PUFxufTtcblxuZXhwb3J0IGRlZmF1bHQgT1BUUztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmNvbnN0IE1FVEFfQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlQ2FjaGUgZXh0ZW5kcyBub3RCYXNle1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXSA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHR0aGlzLmhpZGVUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaWRlVGVtcGxhdGVzKCl7XG5cdFx0bGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdHQuaW5uZXJIVE1MID0gT1BUUy5URU1QTEFURV9UQUcgKyAne2Rpc3BsYXk6IG5vbmU7fSc7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KTtcblx0fVxuXG5cdHJlZ2lzdGVyKCkge1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcigndGVtcGxhdGVDYWNoZScsIHRoaXMpO1xuXHR9XG5cblx0bG9hZChtYXApIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0Zm9yICh2YXIgaSBpbiBtYXApIHtcblx0XHRcdHRoaXMubG9hZE9uZShpLCBtYXBbaV0pO1xuXHRcdH1cblx0fVxuXG5cdGxvYWRPbmUoa2V5LCB1cmwsIGNhbGxiYWNrKSB7XG5cblx0XHR2YXIgb1JlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRvUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXHRcdG9SZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdGlmICh0aGF0LmdldChrZXkpKXtcblx0XHRcdFx0cmVzb2x2ZSh0aGF0LmdldChrZXkpKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL3RoYXQuc2V0TG9hZGluZyhrZXksIHVybCk7XG5cdFx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybCkudGhlbihmdW5jdGlvbih0ZW1wbGF0ZUlubmVySFRNTCl7XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhhdC53cmFwKGtleSwgdXJsLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0XHRcdFx0dGhhdC5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSh0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdlcnJvciBsb2FkaW5nIHRlbXBsYXRlJywga2V5LCB1cmwpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybCkudGhlbihmdW5jdGlvbih0ZW1wbGF0ZXNIVE1MKXtcblx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoYXQucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdHRoYXQuYWRkTGliKHRlbXBsYXRlcyk7XG5cdFx0XHRcdHJlc29sdmUodGVtcGxhdGVzKTtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGVzIGxpYicsIHVybCxlKTtcblx0XHRcdFx0cmVqZWN0KC4uLmFyZ3VtZW50cyk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcblxuY29uc3QgTUVUQV9QUk9DRVNTT1JTID0gU3ltYm9sKCdwcm9jZXNzb3JzJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFByb2Nlc3NvcigvKiBrZXksIHZhbHVlICovKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQcm9jZXNzb3IoLyoga2V5LCAgZGVmYXVsdFZhbHVlICovKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXJQcm9jZXNzb3JzKCl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGQoKXtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG5cdFx0XHR0aGlzLnNldFByb2Nlc3Nvcihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBhcmd1bWVudHNbMF0pe1xuXHRcdFx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKHQsIGFyZ3VtZW50c1swXVt0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRQcm9jZXNzb3IoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyKCl7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vbm90VGVtcGxhdGVQcm9jZXNzb3JzJztcblxuLypcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGCIERPTSDQv9C+0LTQtNC10YDQtdCy0L4g0LIg0LrQsNGH0LXRgdGC0LLQtSDRiNCw0LHQu9C+0L3QsC5cbiAqINCX0LDQv9C+0LvQvdGP0LXRgiDQtdCz0L4g0LTQsNC90L3Ri9C80LguXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgdCz0LXQvdC10YDQuNGA0L7QstCw0L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xuICpcbiAqICovXG5cbi8qXG5cblx0PGRpdiBuLXRlbXBsYXRlLW5hbWU9XCJ2YXN5YVwiPlxuXHRcdDxwPjxpbnB1dCB0eXBlPVwidGV4dFwiIG4tdmFsdWU9XCI6Y29vbE5hbWVcIi8+PC9wPlxuXHRcdDxwPtCR0L7RgNC40YEg0YXRgNC10L0g0L/QvtC/0LDQtNC10YjRjCDQuCB7ezpjb29sTmFtZX19LjwvcD5cblx0PC9kaXY+XG5cbiAqL1xuXG5jb25zdCBNRVRBX0NPTVBPTkVOVFMgPSBTeW1ib2woJ2NvbXBvbmVudHMnKTtcblxuY2xhc3Mgbm90UmVuZGVyZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Lypcblx0XHRpbnB1dCA9IHtcblx0XHRcdGRhdGE6IG5vdFJlY29yZCxcblx0XHRcdHRlbXBsYXRlOiBlbGVtZW50XG5cdFx0XHRvcHRpb25zOntcblx0XHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdH1cblx0XHR9XG5cdCovXG5cblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXSA9IHt9O1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5jb21wb25lbnQgPSBpbnB1dC5jb21wb25lbnQ7XG5cdFx0dGhpcy5pbml0RGF0YShpbnB1dC5kYXRhID8gaW5wdXQuZGF0YSA6IHt9KTtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQudGVtcGxhdGUpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlKCk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGUoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZScsIHRoaXMuZ2V0V29ya2luZygnZ2V0VGVtcGxhdGUnKSgpKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5nZXREYXRhKCkub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdH1cblxuXHRpbml0V29ya2luZyh0ZW1wbGF0ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRnZXRUZW1wbGF0ZTogdGVtcGxhdGUsXG5cdFx0XHRwYXJ0SWQ6IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgPyB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpIDogT1BUUy5QQVJUX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpIHtcblx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcblx0XHRcdHJldHVybiBbLi4udGhpcy5jb21wb25lbnQuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fVxuXHR9XG5cblx0b25DaGFuZ2UocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHQvKm5vdENvbW1vbi5sb2codGhpcyk7XG5cdFx0bm90Q29tbW9uLmxvZyh0aGlzLmdldEJyZWFkQ3J1bXBzKCkuam9pbignID4gJykpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHJlbmRlcmVyICcsIHRoaXMuZ2V0V29ya2luZygncGFydElkJyksICcgYWZ0ZXIgY2hhbmdlcycsIGtleSwgdmFsdWUpOyovXG5cdFx0dGhpcy51cGRhdGUoa2V5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ29ic29sZXRlJyk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHR1cGRhdGUoa2V5KSB7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfQ09NUE9ORU5UU10pIHtcblx0XHRcdGxldCBpdGVtID0gdGhpc1tNRVRBX0NPTVBPTkVOVFNdW3RdLFxuXHRcdFx0XHRpZlBhcnQgPSB0cnVlO1xuXHRcdFx0aWYgKGtleSl7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJyk9PT1udWxsKXtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXRcdGNvbXBvbmVudFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpKSxcblx0XHRcdFx0XHRjaGFuZ2VkUGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChrZXkpO1xuXHRcdFx0XHRpZlBhcnQgPSBub3RQYXRoLmlmRnVsbFN1YlBhdGgoY2hhbmdlZFBhdGgsIGNvbXBvbmVudFBhdGgpO1xuXHRcdFx0XHQvKm5vdENvbW1vbi5sb2coaXRlbS5nZXRPcHRpb25zKCduYW1lJyksICcgPi08ICcsIGl0ZW0uZ2V0T3B0aW9ucygnaWQnKSwgJyA+LTwgJywgY29tcG9uZW50UGF0aCwgY2hhbmdlZFBhdGgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCd3aWxsIGJlIHVwZGF0ZWQnLCBpZlBhcnQpOyovXG5cdFx0XHR9XG5cblx0XHRcdGlmIChpZlBhcnQpIHtcblx0XHRcdFx0aXRlbS51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXRXb3JraW5nTWFwcGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21hcHBpbmcnLCB0aGlzLmNyZWF0ZU1hcHBpbmcoKSk7XG5cdH1cblxuXHQvKlxuXG5cdNCh0L7Qt9C00LDQtdC8INC60LDRgNGC0Ysg0YHQvtC+0YLQstC10YHRgtCy0LjRjyDQv9GA0L7RhtC10YHRgdC+0YDQvtCyLCDQv9GD0YLQtdC5INC00LDQvdC90YvRhSDQsiDQvtCx0YrQtdC60YLQtSDQuCDRjdC70LXQvNC10L3RgtC+0LIg0YjQsNCx0LvQvtC90LAuXG5cdFt7XG5cdFx0ZWwsXG5cdFx0cHJvY2Vzc29yLFxuXHRcdHdvcmtpbmcsXG5cdFx0aXRlbS5wcm9wZXJ0eS5wYXRoXG5cdH1dXG5cblx0Ki9cblxuXHRjcmVhdGVNYXBwaW5nKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmZpbmRBbGxQcm9jZXNzb3JzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZpbmRBbGxQcm9jZXNzb3JzKCkge1xuXHRcdGxldCBwcm9jcyA9IFtdLFxuXHRcdFx0ZWxzID0gbm90Q29tbW9uLmdldEF0dHJpYnV0ZXNTdGFydHNXaXRoKHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLCBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCk7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBhdHRzID0gZWxzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhhdHRzW2ldKTtcblx0XHRcdFx0XHRsZXQgcHJvY0RhdGEgPSB0aGlzLnBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihhdHRzW2ldLm5vZGVOYW1lKTtcblx0XHRcdFx0XHRwcm9jRGF0YS5lbGVtZW50ID0gZWxzW2pdO1xuXHRcdFx0XHRcdHByb2NEYXRhLnByb2Nlc3NvckV4cHJlc3Npb24gPSBhdHRzW2ldLm5vZGVOYW1lO1xuXHRcdFx0XHRcdHByb2NEYXRhLmF0dHJpYnV0ZUV4cHJlc3Npb24gPSBhdHRzW2ldLnZhbHVlO1xuXHRcdFx0XHRcdHByb2NzLnB1c2gocHJvY0RhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwcm9jcztcblx0fVxuXG5cdHBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihwcm9jZXNzb3JFeHByZXNzaW9uKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdHBhcmFtczogW10sXG5cdFx0XHRwcm9jZXNzb3JOYW1lOiAnJyxcblx0XHRcdGlmQ29uZGl0aW9uOiBmYWxzZVxuXHRcdH07XG5cdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCwgJycpO1xuXHRcdGlmIChwcm9jZXNzb3JFeHByZXNzaW9uLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCkgPT09IChwcm9jZXNzb3JFeHByZXNzaW9uLmxlbmd0aCAtIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgubGVuZ3RoKSkge1xuXHRcdFx0cmVzdWx0LmlmQ29uZGl0aW9uID0gdHJ1ZTtcblx0XHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgKyBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLCAnJyk7XG5cdFx0fVxuXHRcdHJlc3VsdC5wYXJhbXMgPSBwcm9jZXNzb3JFeHByZXNzaW9uLnNwbGl0KE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SKTtcblx0XHRyZXN1bHQucHJvY2Vzc29yTmFtZSA9IHJlc3VsdC5wYXJhbXNbMF07XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHJlc3VsdC5wYXJhbXMuc2xpY2UoMSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGV4ZWNQcm9jZXNzb3JzKGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG1hcHBpbmcgPSB0aGlzLmdldFdvcmtpbmcoJ21hcHBpbmcnKTtcblx0XHRpZiAobWFwcGluZykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBwcm9jU2NvcGUgPSBtYXBwaW5nW2ldO1xuXHRcdFx0XHRwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHByb2NTY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBpbmRleCk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnYXR0cmlidXRlUmVzdWx0JywgcHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdFx0XHRcdGxldCBwcm9jTmFtZSA9IHByb2NTY29wZS5wcm9jZXNzb3JOYW1lLFxuXHRcdFx0XHRcdHByb2MgPSBub3RUZW1wbGF0ZVByb2Nlc3NvcnMuZ2V0KHByb2NOYW1lKTtcblx0XHRcdFx0aWYgKHByb2MpIHtcblx0XHRcdFx0XHRwcm9jKHByb2NTY29wZSwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0XHRcdFx0XHRwcm9jU2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvY1Njb3BlLnByb2Nlc3NvckV4cHJlc3Npb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gcHJvY2Vzc29yIGxpa2UnLCBwcm9jTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcpO1xuXHR9XG5cblx0Z2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwYXRoLCBpdGVtKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdH1cblxuXHRjbGVhclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmRlc3Ryb3lTdWJzKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdWJzJywgW10pO1xuXHR9XG5cblx0ZGVzdHJveVN1YnMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFN0YXNoKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IGVsID0gdGhpcy5nZXRTdGFzaCgpW3RdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUpe1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZlN1YkVsZW1lbnRSZW5kZXJlZChudEVsKSB7XG5cdFx0cmV0dXJuIG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkICYmIChudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZC52YWx1ZSA9PT0gJ3RydWUnKTtcblx0fVxuXG5cdHNlYXJjaEZvclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0bGV0IHN1YnMgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCA9IDA7IG50IDwgc3Vicy5sZW5ndGg7IG50KyspIHtcblx0XHRcdGlmICghdGhpcy5pZlN1YkVsZW1lbnRSZW5kZXJlZChzdWJzW250XSkpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJTdWIoc3Vic1tudF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZFN1YihudEVsKSB7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdzdWJzJykucHVzaCh7XG5cdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdHBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiAnJyxcblx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnNyYyA6ICcnLFxuXHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0XHRyZW5kZXJlZExpc3Q6IFtdLFxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU3ViKG50RWwpIHtcblx0XHRpZiAoIW50RWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IGRldGFpbHMgPSB7XG5cdFx0XHRcdGRhdGFQYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogbnVsbCxcblx0XHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMuc3JjLnZhbHVlIDogJycsXG5cdFx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0ZGF0YTogZGV0YWlscy5kYXRhUGF0aCE9PSBudWxsPyB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQoZGV0YWlscy5kYXRhUGF0aCwgdGhpcy5nZXREYXRhKCkpOm51bGwsXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHNyYzogZGV0YWlscy5zcmNcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSxcblx0XHRcdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VBZnRlcicsXG5cdFx0XHRcdFx0aWQ6IGRldGFpbHMuaWQsXG5cdFx0XHRcdFx0bnRFbDogbnRFbCxcblx0XHRcdFx0XHRkYXRhUGF0aDogZGV0YWlscy5kYXRhUGF0aFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvd25lcjogdGhpc1xuXHRcdFx0fTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnaWQnLCBkZXRhaWxzLmlkKTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU11bZGV0YWlscy5pZF0gPSBuZXcgbm90Q29tcG9uZW50KG9wdGlvbnMpO1xuXHR9XG5cblx0Y2xlYXJTdGFzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgW10pO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZScpO1xuXHR9XG5cblx0Z2V0U3Rhc2goKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc3Rhc2gnKTtcblx0fVxuXG5cdHN0YXNoUmVuZGVyZWQoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMuYWRkVG9TdGFzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHR9XG5cblx0cmVwbGFjZVJlbmRlcmVkKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygncmVwbGFjZSBzdGFzaCcpO1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSxcblx0XHRcdHN0YXNoID0gdGhpcy5nZXRTdGFzaCgpLFxuXHRcdFx0bmV3U3Rhc2ggPSBbXSxcblx0XHRcdGFuY2hvciA9IHN0YXNoLmxlbmd0aCA+IDAgPyBzdGFzaFswXSA6IHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLFxuXHRcdFx0cGFyZW50Tm9kZSA9IGFuY2hvci5wYXJlbnROb2RlO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdG5ld1N0YXNoLnB1c2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IG5ld1N0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRpZiAoYW5jaG9yLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTdGFzaFt0XSwgYW5jaG9yLm5leHRTaWJsaW5nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld1N0YXNoW3RdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBzdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdGFzaFt0XSk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBuZXdTdGFzaCk7XG5cdH1cblxuXHRhZGRUb1N0YXNoKG5vZGUpIHtcblx0XHR0aGlzLmdldFN0YXNoKCkucHVzaChub2RlKTtcblx0fVxuXG5cdGlzRGF0YShkYXRhKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlbmRlcmVyO1xuIiwiY29uc3QgcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdHdoaWxlICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuWzBdKTtcblx0XHR9XG5cdH0sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fVxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlO1xuIiwiY29uc3QgcGxhY2VBZnRlciA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQWZ0ZXI7XG4iLCJjb25zdCBwbGFjZUJlZm9yZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQmVmb3JlO1xuIiwiY29uc3QgcGxhY2VGaXJzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZUZpcnN0O1xuIiwiY29uc3QgcGxhY2VMYXN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VMYXN0O1xuIiwiY29uc3QgcmVwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHtcblx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhcmdldEVsKTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZTtcbiIsImltcG9ydCBwbGFjZSBmcm9tICcuL3BsYWNlJztcbmltcG9ydCBwbGFjZUFmdGVyIGZyb20gJy4vcGxhY2VBZnRlcic7XG5pbXBvcnQgcGxhY2VCZWZvcmUgZnJvbSAnLi9wbGFjZUJlZm9yZSc7XG5pbXBvcnQgcGxhY2VGaXJzdCBmcm9tICcuL3BsYWNlRmlyc3QnO1xuaW1wb3J0IHBsYWNlTGFzdCBmcm9tICcuL3BsYWNlTGFzdCc7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICcuL3JlcGxhY2UnO1xuXG5jb25zdCBub3RQbGFjZXJzID0ge1xuXHRwbGFjZTogcGxhY2UsXG5cdHBsYWNlQWZ0ZXI6IHBsYWNlQWZ0ZXIsXG5cdHBsYWNlQmVmb3JlOiBwbGFjZUJlZm9yZSxcblx0cGxhY2VGaXJzdDogcGxhY2VGaXJzdCxcblx0cGxhY2VMYXN0OiBwbGFjZUxhc3QsXG5cdHJlcGxhY2U6IHJlcGxhY2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFBsYWNlcnM7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vbm90UmVuZGVyZXInO1xuaW1wb3J0IG5vdFBsYWNlcnMgZnJvbSAnLi9wbGFjZXJzJztcblxuY29uc3QgTUVUQV9QQVJUUyA9IFN5bWJvbCgncGFydHMnKTtcbi8qXG5cdGlucHV0ID0ge1xuXHRcdGRhdGE6IG5vdFJlY29yZCBvciBbbm90UmVjb3JkXSxcblx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0aHRtbDogaHRtbChzdHJpbmcpLCBcdFx0Ly/RgtC10LrRgdGCINGBIGh0bWwg0LrQvtC00L7QvCDRiNCw0LHQu9C+0L3QsFxuXHRcdFx0ZWw6IEhUTUxFbGVtZW50KG9iamVjdCksIFx0Ly9ET00g0Y3Qu9C10LzQtdC90YJcblx0XHRcdHNyYzogc3JjKHN0cmluZyksXHRcdFx0Ly/RgdGB0YvQu9C60LAg0L3QsCDRhNCw0LnQuyDRgSDRiNCw0LHQu9C+0L3QvtC8XG5cdFx0XHRuYW1lOiBuYW1lKHN0cmluZylcdFx0XHQvL9C90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAg0LTQu9GPINC/0L7QuNGB0LrQsCDQsiDQutGN0YjQtSBub3RUZW1wbGF0ZUNhY2hlXG5cdFx0fVxuXHRcdG9wdGlvbnM6e1xuXHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0Ly/QsCDRjdGC0L4g0LrQsNC6INCx0YPQtNC10Lwg0L/QvtC80LXRidCw0YLRjCDRgNC10LfRg9C70YzRgtCw0YIg0YDQtdC90LTQtdGA0LjQvdCz0LBcblx0XHRcdHJlbmRlckFuZDogcGxhY2VTdHlsZShzdHJpbmcpINC+0LTQuNC9INC40Lcg0LLQsNGA0LjQsNC90YLQvtCyXG5cdFx0XHRcdFx0cGxhY2VcdFx0LVx00L/QvtC80LXRidCw0LXQvCDQstC90YPRgtGA0Lgg0YbQtdC70LXQstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG5cdFx0XHRcdFx0cmVwbGFjZVx0XHQtXHTQt9Cw0LzQtdC90Y/QtdC8XG5cdFx0XHRcdFx0cGxhY2VBZnRlclx0LVx00L/QvtGB0LvQtVxuXHRcdFx0XHRcdHBsYWNlQmVmb3JlXHQtXHTQtNC+XG5cdFx0XHRcdFx0cGxhY2VGaXJzdFx0LVx00LLQvdGD0YLRgNC4INC/0LXRgNCy0YvQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0XHRcdFx0cGxhY2VMYXN0XHQtXHTQstC90YPRgtGA0Lgg0L/QvtGB0LvQtdC00L3QuNC8INC00L7Rh9C10YDQvdC40Lxcblx0XHR9XG5cdH1cbiovXG5jbGFzcyBub3RDb21wb25lbnQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHRcdHRoaXMub24oJ3JlYWR5JywgdGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCl7XG5cdFx0aWYgKHRoaXMub3duZXIpe1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLm93bmVyLmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fVxuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLm93bmVyID0gaW5wdXQub3duZXI/aW5wdXQub3duZXI6bnVsbDtcblx0XHR0aGlzLmluaXREYXRhKGlucHV0LmRhdGEgPyBpbnB1dC5kYXRhIDoge30pO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0RXZlbnRzKGlucHV0LmV2ZW50cyA/IGlucHV0LmV2ZW50cyA6IFtdKTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0RXZlbnRzKGxpc3Qpe1xuXHRcdGZvcihsZXQgdCBvZiBsaXN0KXtcblx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2lkJykpe1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdpZCcsIE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKXtcblx0XHRcdHRoaXMuaW5pdE1hcmtFbGVtZW50KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hcmtFbGVtZW50KCl7XG5cdFx0bGV0IG1hcmtFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ250Jyk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdudEVsJywgbWFya0VsKTtcblx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0cGxhY2VyLm1haW4odGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLCBbbWFya0VsXSk7XG5cdH1cblxuXHRpbml0V29ya2luZyh2YWwpIHtcblx0XHR0aGlzLnVuc2V0UmVhZHkodmFsKTtcblx0fVxuXG5cdHByZXBhcmVUZW1wbGF0ZUVsZW1lbnQodmFsKSB7XG5cdFx0aWYgKCF2YWwpIHtcblx0XHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdodG1sJykgJiYgdmFsLmh0bWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQodmFsLmVsLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZhbC5zcmMpIHtcblx0XHRcdG5vdFRlbXBsYXRlQ2FjaGUuZ2V0RnJvbVVSTCh2YWwuc3JjLCB2YWwuc3JjKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpICYmIHZhbC5uYW1lKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUuZ2V0KHZhbC5uYW1lKSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JywgY29udCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRyZXNldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50JywgdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpLmNsb25lTm9kZSh0cnVlKSk7XG5cdH1cblxuXHRzZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdHJ1ZSk7XG5cdH1cblxuXHR1bnNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCBmYWxzZSk7XG5cdH1cblxuXHRpc1JlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3JlYWR5Jyk7XG5cdH1cblxuXHRjbGVhclBhcnRzKCkge1xuXHRcdC8qINC40LfQstC10YnQsNC10Lwg0L7QsSDRg9C00LDQu9C10L3QuNC4INGN0LvQtdC80LXQvdGC0L7QsiAqL1xuXHRcdGlmICh0aGlzW01FVEFfUEFSVFNdICYmIEFycmF5LmlzQXJyYXkodGhpc1tNRVRBX1BBUlRTXSkgJiYgdGhpc1tNRVRBX1BBUlRTXS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpc1tNRVRBX1BBUlRTXSkge1xuXHRcdFx0XHRpZiAodC5kZXN0cm95KXtcblx0XHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdudEVsJykgJiYgdGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZSl7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKTtcblx0XHR9XG5cdH1cblxuXHRyZXNldFBhcnRzKCkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10gPSBbXTtcblx0fVxuXG5cdGdldFBhcnRzKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfUEFSVFNdO1xuXHR9XG5cblx0YWRkUGFydCh0ZW1wbGF0ZSkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10ucHVzaCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0dGhpcy5yZW1vdmVPYnNvbGV0ZVBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gdGFyZ2V0IGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRwbGFjZVBhcnQoZGF0YSwgaW5kZXgpe1xuXHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpLFxuXHRcdFx0bm9kZXMgPSBwYXJ0LmdldFN0YXNoKCksXG5cdFx0XHR0YXJnZXRFbCxcblx0XHRcdGxhc3ROb2RlLFxuXHRcdFx0cGxhY2VyO1xuXHRcdGlmIChpbmRleCA9PT0gMCl7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIoT1BUUy5ERUZBVUxUX1BMQUNFUl9MT09QKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScpO1xuXHRcdH1cblx0XHRwbGFjZXIubWFpbih0YXJnZXRFbCwgbm9kZXMpO1xuXG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRwbGFjZU5vZGVzKG5vZGVzKXtcblx0XHQvL25vdENvbW1vbi5sb2coJ3BsYWNlZCBwYXJ0Jywgbm9kZXMpO1xuXHR9XG5cblx0Z2V0UGxhY2VyKG1ldGhvZCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2VhcmNoaW5nIGZvciBwbGFjZXInLCBtZXRob2QpO1xuXHRcdGlmIChub3RQbGFjZXJzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW21ldGhvZF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW09QVFMuREVGQVVMVF9QTEFDRVJdO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hEYXRhKGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXREYXRhKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZ1bmModGhpcy5nZXREYXRhKCksIDApO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hQYXJ0KGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldFBhcnRzKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0UGFydHMoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHTQtdGB0LvQuCDRgSDQtNCw0L3QvdGL0LzQuCDQvdC1INGB0LLRj9C30LDQvSDRgNC10L3QtNC10YDQtdGAIC0g0YHQvtC30LTQsNC10Lxcblx0Ki9cblxuXHRyZW5kZXJQYXJ0KGRhdGEpIHtcblx0XHRpZiAoIXRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjcmVhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0bGV0IHJlbmRlcmVyID0gbmV3IG5vdFJlbmRlcmVyKHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dGVtcGxhdGU6IHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKSxcblx0XHRcdFx0Y29tcG9uZW50OiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdC8vcmVuZGVyZXIub24oJ29ic29sZXRlJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFkZFBhcnQocmVuZGVyZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCd1cGRhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0dGhpcy51cGRhdGVQYXJ0KHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlUGFydChwYXJ0KXtcblx0XHRwYXJ0LnVwZGF0ZSgpO1xuXHR9XG5cblx0cmVtb3ZlT2Jzb2xldGVQYXJ0cygpIHtcblx0XHQvL9C60L7QvdCy0LXQtdGAINC/0L7QuNGB0Log0LDQutGC0YPQsNC70YzQvdGL0YUgLSDRg9C00LDQu9C10L3QuNC1INC+0YHRgtCw0LvRjNC90YvRhVxuXHRcdG5vdENvbW1vbi5waXBlKFxuXHRcdFx0dW5kZWZpbmVkLCAvLyBwYXJ0cyB0byBzZWFyY2ggaW4sIGNhbiBiZSAndW5kZWZpbmVkJ1xuXHRcdFx0W1xuXHRcdFx0XHR0aGlzLmZpbmRBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL2ZpcnN0IHJvdW5kLCBzZWFyY2ggZm9yIG9ic29sZXRlXG5cdFx0XHRcdHRoaXMucmVtb3ZlTm90QWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9yZW1vdmUgJ2VtXG5cdFx0XHRdXG5cdFx0KTtcblx0fVxuXG5cdC8qXG5cdFx00LXRgdGC0Ywg0LTQsNC90L3Ri9C1INC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0LDQutGC0YPQsNC70YzQvdC+LFxuXHRcdNC90LXRgiDQtNCw0L3QvdGL0YUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDRgdGC0LDRgNGM0ZFcblx0Ki9cblxuXHRmaW5kQWN0dWFsUGFydHMoKSB7XG5cdFx0bGV0IGFjdHVhbFBhcnRzID0gW107XG5cdFx0dGhpcy5mb3JFYWNoRGF0YSgoZGF0YS8qLCBpbmRleCovKT0+e1xuXHRcdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSk7XG5cdFx0XHRpZiAocGFydCl7XG5cdFx0XHRcdGFjdHVhbFBhcnRzLnB1c2gocGFydCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGFjdHVhbFBhcnRzO1xuXHR9XG5cblx0Lypcblx0XHTRg9C00LDQu9GP0LXQvCDQstGB0LUg0LrRgNC+0LzQtSDQsNC60YLRg9Cw0LvRjNC90YvRhVxuXHQqL1xuXHRyZW1vdmVOb3RBY3R1YWxQYXJ0cyhhY3R1YWxQYXJ0cyl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAoYWN0dWFsUGFydHMuaW5kZXhPZih0aGlzLmdldFBhcnRzKClbdF0pID09PSAtMSl7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKVt0XS5kZXN0cm95KCk7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKS5zcGxpY2UodCwgMSk7XG5cdFx0XHRcdHQtLTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRQYXJ0QnlEYXRhKGRhdGEpIHtcblx0XHRmb3IgKGxldCB0IGluIHRoaXMuZ2V0UGFydHMoKSkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0UGFydHMoKVt0XS5pc0RhdGEoZGF0YSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UGFydHMoKVt0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbXBvbmVudDtcbiIsImltcG9ydCAgbm90Q29tcG9uZW50ICBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RGb3JtRmFjdG9yeSBleHRlbmRzIG5vdENvbXBvbmVudHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucyl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHt9KTtcblx0XHR0aGlzLm9uKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0KTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldCk7XG5cdFx0dGhpcy5vbignY2FuY2VsJywgdGhpcy5vbkNhbmNlbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKlxuXHRcdFJlbmRlcmluZ1xuXHQqL1xuXG5cdHJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHRcdHRoaXMucmVuZGVyQ29tcG9uZW50cygpO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpe1xuXG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCl7XG5cblx0fVxuXG5cdC8qXG5cdFx0RGF0YSBtYW5hZ2VtZW50XG5cdCovXG5cblx0Y29sbGVjdERhdGEoKXtcblxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCl7XG5cblx0fVxuXG5cdG9uUmVzZXQoKXtcblxuXHR9XG5cblx0b25DYW5jZWwoKXtcblxuXHR9XG59XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuY2xhc3Mgbm90Q29udHJvbGxlciBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihhcHAsIGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5uY05hbWUgPSAnbmMnICsgKGNvbnRyb2xsZXJOYW1lLmNhcGl0YWxpemVGaXJzdExldHRlcigpKTtcblx0XHR0aGlzLmNvbnRhaW5lclNlbGVjdG9yID0gJy5wYWdlLWNvbnRlbnQnO1xuXHRcdHRoaXMudmlld3NQb3N0Zml4ID0gJy5odG1sJztcblx0XHR0aGlzLnJlbmRlckZyb21VUkwgPSB0cnVlO1xuXHRcdC8qXG5cdFx0ICAgINGB0YDQsNC30YMg0LTQtdC70LDQtdC8INC00L7RgdGC0YPQv9C90YvQvNC4INC80L7QtNC10LvQuCBub3RSZWNvcmQg0LjQtyBuY2BDb250cm9sbGVyTmFtZWAg0LHRg9C00YPRgiDQtNC+0YHRgtGD0L/QvdGLINC60LDQuiB0aGlzLm5yYE1vZGVsTmFtZWBcblx0XHQqL1xuXHRcdHRoaXMuYXBwLmdldEludGVyZmFjZXMoKS5mb3JFYWNoKChpbmRleCwgaW50ZXJmYWMzKSA9PiB7XG5cdFx0XHRpZiAodHlwZW9mKCh3aW5kb3dbdGhpcy5uY05hbWVdKSkgIT09ICd1bmRlZmluZWQnKSh3aW5kb3dbdGhpcy5uY05hbWVdKS5wcm90b3R5cGVbaW5kZXhdID0gaW50ZXJmYWMzO1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JHJlbmRlcihuYyAvKiBuY05hbWUgZnVuY3Rpb24gdGhpcyovICwgbmFtZSAvKiB2aWV3IG5hbWUgKi8gLCBkYXRhIC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzIC8qIGNvdWxkIGJlIG5vdCByZXByZXNlbnRlZCAqLyAsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIHZpZXcgPSBuYy52aWV3cy5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IG5jLnZpZXdzW25hbWVdIDogbnVsbCxcblx0XHRcdHJlYWxDYWxsYmFjayxcblx0XHRcdHJlYWxIZWxwZXJzO1xuXHRcdGlmICh0eXBlb2YgdmlldyA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldyA9PT0gbnVsbCkgcmV0dXJuO1xuXHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0Ly8g0Y3Qu9C10LzQtdC90YLQsCwg0L3QviDQuNC30LLQtdGB0YLQvdC+0Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YDQtVxuXHRcdGlmICgoKHR5cGVvZiB2aWV3LnBsYWNlID09PSAndW5kZWZpbmVkJykgfHwgKHZpZXcucGxhY2UgPT09IG51bGwpKSAmJiAodHlwZW9mIHZpZXcucGxhY2VJZCAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5wbGFjZUlkICE9PSBudWxsICYmIHZpZXcucGxhY2VJZC5sZW5ndGggPiAwKSkge1xuXHRcdFx0dmlldy5wbGFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXcucGxhY2VJZCk7XG5cdFx0fVxuXHRcdC8v0LXRgdC70LggNCDQsNGA0LPRg9C80LXQvdGC0LAg0LfQvdCw0YfQuNGCLCBoZWxwZXJzICDQv9GA0L7Qv9GD0YHRgtC40LvQuFxuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0Ly/Qv9C10YDQtdC90LDQt9C90LDRh9Cw0LXQvCDRgdC+INGB0LTQstC40LPQvtC8XG5cdFx0XHRjYXNlIDQ6XG5cdFx0XHRcdHJlYWxDYWxsYmFjayA9IGhlbHBlcnM7XG5cdFx0XHRcdHJlYWxIZWxwZXJzID0ge307XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHQvL9C/0LXRgNC10L3QsNC30L3QsNGH0LDQtdC8INC90LDQv9GA0Y/QvNGD0Y5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJlYWxIZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0cmVhbENhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0fVxuXHRcdHZpZXcuZGF0YSA9IGRhdGE7XG5cdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdHZpZXcuaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQodmlldy5oZWxwZXJzLCByZWFsSGVscGVycyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZpZXcuaGVscGVycyA9IHJlYWxIZWxwZXJzO1xuXHRcdH1cblx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0aWYgKG5jLnJlbmRlckZyb21VUkwpIHtcblx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3LnRlbXBsYXRlVVJMID09PSAndW5kZWZpbmVkJyB8fCB2aWV3LnRlbXBsYXRlVVJMID09IG51bGwgfHwgdmlldy50ZW1wbGF0ZVVSTC5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHQvL9Cz0LXQvdC10YDQuNGA0YPQtdC8INCw0LTRgNC10YEg0L/QviDRiNCw0LHQu9C+0L3Rg1xuXHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gKHZpZXcuY29tbW9uID8gbmMuY29tbW9uVmlld3NQcmVmaXggOiBuYy52aWV3c1ByZWZpeCkgKyAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiBuYW1lKSArIG5jLnZpZXdzUG9zdGZpeDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly/QsCDQtdGB0LvQuCDQtdGB0YLRjCDQvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwLCDRgtC+XG5cdFx0XHRpZiAodmlldy5oYXNPd25Qcm9wZXJ0eSgndGVtcGxhdGVOYW1lJykpIHtcblx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0dmlldy50ZW1wbGF0ZU5hbWUgPSBuYy52aWV3c1ByZWZpeCArIHZpZXcudGVtcGxhdGVOYW1lICsgbmMudmlld3NQb3N0Zml4O1xuXHRcdFx0fVxuXHRcdH1cblx0XHQobmV3IG5vdENvbXBvbmVudCh2aWV3KSkuZXhlY0FuZFB1dCh2aWV3LnBsYWNlLCByZWFsQ2FsbGJhY2spO1xuXHR9XG5cblx0ZXhlYyhwYXJhbXMpIHtcblx0XHQvL2NvbnNvbGUubG9nKCdleGVjJywgdGhpcywgT2JqZWN0LmtleXModGhpcy5fX3Byb3RvX18pKTtcblx0XHRpZiAodHlwZW9mKCh3aW5kb3dbdGhpcy5uY05hbWVdKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHQvL9C40YnQtdC8INC40LzQtdC90LAg0YDQsNC30LTQtdC70Y/QtdC80YvRhSDRhNGD0L3QutGG0LjQuVxuXHRcdFx0dmFyIHNoYXJlZExpc3QgPSBPYmplY3Qua2V5cyh0aGlzLl9fcHJvdG9fXykuZmlsdGVyKGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0XHRyZXR1cm4gKGtleS5pbmRleE9mKCckJykgPT09IDApO1xuXHRcdFx0fSk7XG5cdFx0XHQvL9C30LDQutC40LTRi9Cy0LDQtdC8INC40YUg0LIg0L3QvtCy0YPRjiDRhNGD0L3QutGG0LjRjlxuXHRcdFx0aWYgKHNoYXJlZExpc3QubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBrIGluIHNoYXJlZExpc3QpIHtcblx0XHRcdFx0XHR3aW5kb3dbdGhpcy5uY05hbWVdLnByb3RvdHlwZVtzaGFyZWRMaXN0W2tdXSA9IHRoaXMuX19wcm90b19fW3NoYXJlZExpc3Rba11dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRuZXcod2luZG93W3RoaXMubmNOYW1lXSkodGhpcy5hcHAsIHBhcmFtcyk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKG5ldyh3aW5kb3dbdGhpcy5uY05hbWVdKSh0aGlzLmFwcCwgcGFyYW1zKSk7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdhZnRlciBuZXcgY29udHJvbGxlcicpO1xuXHRcdH0gZWxzZSB7XG5cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29udHJvbGxlcjtcbiIsIi8qIGdsb2JhbCByb3V0aWUgKi9cbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Rm9ybUZhY3RvcnkgZnJvbSAnLi9jb21wb25lbnRzL25vdEZvcm1GYWN0b3J5JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuL25vdENvbnRyb2xsZXInO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcblxuY29uc3QgT1BUX0NPTlRST0xMRVJfUFJFRklYID0gJ25jJyxcblx0T1BUX1JFQ09SRF9QUkVGSVggPSAnbnInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RBcHAgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3Iobm90TWFuaWZlc3QpIHtcblx0XHRzdXBlcigpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGFwcCcpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RNYW5pZmVzdCk7XG5cdFx0dGhpcy5yZXNvdXJjZXMgPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0aW50ZXJmYWNlczoge30sXG5cdFx0XHRjb250cm9sbGVyczoge30sXG5cdFx0XHRpbml0Q29udHJvbGxlcjogbnVsbCxcblx0XHRcdGN1cnJlbnRDb250cm9sbGVyOiBudWxsLFxuXHRcdFx0Zm9ybXM6IHt9XG5cdFx0fSk7XG5cdFx0dGhpcy5pbml0KCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHZhciB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0VVJMJyksXG5cdFx0XHRzdWNjZXNzID0gdGhpcy5zZXRJbnRlcmZhY2VNYW5pZmVzdC5iaW5kKHRoaXMpO1xuXHRcdG5vdENvbW1vbi5nZXRKU09OKHVybCwge30pXG5cdFx0XHQudGhlbihzdWNjZXNzKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRzZXRJbnRlcmZhY2VNYW5pZmVzdChtYW5pZmVzdCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnLCBtYW5pZmVzdCk7XG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxuXG5cdGdldEludGVyZmFjZU1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0Jyk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0Ly/QvdGD0LbQvdC+INC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDRgtGMXG5cdFx0Ly/QvNC+0LTQtdC70Lgg0L/QvtC70YPRh9C10L3QvdGL0LzQuCDQuNC90YLQtdGA0YTQtdC50YHQsNC80Lhcblx0XHR0aGlzLnVwZGF0ZUludGVyZmFjZXMoKTtcblx0XHQvL9GB0L7Qt9C00LDQvdC40LUg0L7QsdGK0LXQutGC0L7QsiDQsNCy0YLQvtCz0LXQvdC10YDQsNGG0LjRjyDRhNC+0YDQvFxuXHRcdHRoaXMuaW5pdEZvcm1CdWlsZGVycygpO1xuXHRcdC8v0LjQvdC40YbQuNC70LjRhtC40YDQvtCy0LDRgtGMINC4INC30LDQv9GD0YHRgtC40YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHRcdHRoaXMuaW5pdENvbnRyb2xsZXIoKTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhcnRBcHAoKSB7XG5cdFx0Ly/RgdC+0LfQtNCw0YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0Ly/RgNC+0YPRgtC10YAg0Lgg0L/RgNC40LLRj9C30LDRgtGMINC6INC90LXQvNGDINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHR0aGlzLmluaXRSb3V0ZXIoKTtcblx0fVxuXG5cdGJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0dmFyIGN0cmwgPSBuZXcgbm90Q29udHJvbGxlcih0aGlzLCBjb250cm9sbGVyTmFtZSk7XG5cdFx0cmV0dXJuIGN0cmwuZXhlYy5iaW5kKGN0cmwpO1xuXHR9XG5cblx0aW5pdENvbnRyb2xsZXIoKSB7XG5cdFx0aWYgKHR5cGVvZih0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJykpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdpbml0Q29udHJvbGxlcicsIG5ldyBub3RDb250cm9sbGVyKHRoaXMsIHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkpO1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdpbml0Q29udHJvbGxlcicpLmV4ZWMoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0Um91dGVyKCkge1xuXHRcdHZhciByb3V0aWVJbnB1dCA9IHt9O1xuXHRcdGZvcihsZXQgcm91dGUgaW4gdGhpcy5nZXRPcHRpb25zKCdzaXRlTWFuaWZlc3QnKSl7XG5cdFx0XHRsZXQgY29udHJvbGxlck5hbWUgPSB0aGlzLmdldE9wdGlvbnMoJ3NpdGVNYW5pZmVzdCcpW3JvdXRlXTtcblx0XHRcdHJvdXRpZUlucHV0W3JvdXRlXSA9IHRoaXMuYmluZENvbnRyb2xsZXIoY29udHJvbGxlck5hbWUpO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JvdXRlcicsIHJvdXRpZShyb3V0aWVJbnB1dCkpO1xuXHR9XG5cblx0Z2V0Q3VycmVudENvbnRyb2xsZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInKTtcblx0fVxuXG5cdHNldEN1cnJlbnRDb250cm9sbGVyKGN0cmwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJywgY3RybCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR1cGRhdGVJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuY2xlYXJJbnRlcmZhY2VzKCk7XG5cdFx0bGV0IG1hbmlmZXN0cyA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0XHRpZiAobWFuaWZlc3RzKSB7XG5cdFx0XHRmb3IobGV0IG5hbWUgaW4gbWFuaWZlc3RzKXtcblx0XHRcdFx0bGV0IHJlY29yZE1hbmlmZXN0ID0gbWFuaWZlc3RzW25hbWVdO1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXSA9IChyZWNvcmREYXRhKSA9PiBuZXcgbm90UmVjb3JkKHJlY29yZE1hbmlmZXN0LCByZWNvcmREYXRhKTtcblx0XHRcdFx0d2luZG93WyducicgKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpXSA9IHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFJlY29yZE5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfUkVDT1JEX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRDb250cm9sbGVyTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9DT05UUk9MTEVSX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKTtcblx0fVxuXG5cdGNsZWFySW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ludGVyZmFjZXMnLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0Rm9ybUJ1aWxkZXJzKCkge1xuXHRcdHRoaXMuY2xlYXJGb3JtQnVpbGRlcnMoKTtcblx0XHRsZXQgZm9ybXMgPSB0aGlzLmdldE9wdGlvbnMoJ2Zvcm1zJyk7XG5cdFx0aWYgKGZvcm1zKSB7XG5cdFx0XHRmb3IobGV0IHQgaW4gZm9ybXMpe1xuXHRcdFx0XHR0aGlzLmluaXRGb3JtQnVpbGRlcih0LCBmb3Jtc1t0XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aW5pdEZvcm1CdWlsZGVyKGluZGV4LCBtYW5pZmVzdCkge1xuXHRcdGxldCBwYXRoID0gbm90UGF0aC5qb2luKCdmb3JtcycsIGluZGV4KTtcblx0XHR0aGlzLnNldFdvcmtpbmcocGF0aCwgbmV3IG5vdEZvcm1GYWN0b3J5KHRoaXMsIG1hbmlmZXN0KSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKHBhdGgpLmluaXQodGhpcy53YWl0VGhpc1Jlc291cmNlKCdmb3JtJywgaW5kZXgpKTtcblx0fVxuXG5cdGdldEZvcm1CdWlsZGVycygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdmb3JtcycpO1xuXHR9XG5cblx0Y2xlYXJGb3JtQnVpbGRlcnMoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmb3JtcycsIHt9KTtcblx0fVxuXG5cdHdhaXRUaGlzUmVzb3VyY2UodHlwZSwgaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMucmVzb3VyY2VzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG5cdFx0XHR0aGlzLnJlc291cmNlc1t0eXBlXSA9IHt9O1xuXHRcdH1cblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSBmYWxzZTtcblx0XHRyZXR1cm4gdGhpcy5vblJlc291cmNlUmVhZHkuYmluZCh0aGlzLCB0eXBlLCBpbmRleCk7XG5cdH1cblxuXHRvblJlc291cmNlUmVhZHkodHlwZSwgaW5kZXgpIHtcblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSB0cnVlO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRhbGxSZXNvdXJjZXNSZWFkeSgpIHtcblx0XHR2YXIgaSwgajtcblx0XHRmb3IgKGkgaW4gdGhpcy5yZXNvdXJjZXMpIHtcblx0XHRcdGZvciAoaiBpbiB0aGlzLnJlc291cmNlc1tpXSkge1xuXHRcdFx0XHRpZiAoIXRoaXMucmVzb3VyY2VzW2ldW2pdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cbn1cbiIsImltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGguanMnO1xuXG52YXIgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliID0ge1xuXHRjb250ZW50OmZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmluZGV4T2YoJ2NhcGl0YWxpemUnKSA+IC0xKXtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdC50b1VwcGVyQ2FzZSgpO1xuXHRcdH1cblx0XHRzY29wZS5lbGVtZW50LnRleHRDb250ZW50ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0O1xuXHR9LFxuXHRiaW5kOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpPT57XG5cdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aWYgKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCl7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe3Njb3BlLCBpdGVtLCBoZWxwZXJzLCBlfSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IGxpdmVFdmVudHMgPSBbJ2NoYW5nZScsICdrZXl1cCddLFxuXHRcdFx0b25FdmVudCA9ICgpPT5ub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgIT09IHRydWUpe1xuXHRcdFx0Zm9yKGxldCB0IG9mIGxpdmVFdmVudHMpe1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodCwgb25FdmVudCk7XG5cdFx0XHR9XG5cdFx0XHRzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cdGF0dHI6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKT9yZXMoe3Njb3BlLCBpdGVtLCBoZWxwZXJzfSk6cmVzKTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZShzY29wZS5wYXJhbXNbMF0sIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdH0sXG5cdG5hbWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oLypzY29wZSwgaXRlbSwgaGVscGVycyovKXtcblxuXHR9LFxuXHRjaGVja2VkOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXN1bHQgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXN1bHQgPT09ICdmdW5jdGlvbicpP3Jlc3VsdCh7c2NvcGUsIGl0ZW0sIGhlbHBlcnN9KTpyZXN1bHQpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA/IHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgdHJ1ZSkgOiBzY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuXHR9LFxuXHRjbGFzczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKT9yZXMoe3Njb3BlLCBpdGVtLCBoZWxwZXJzfSk6cmVzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA8IDMgfHwgaXNOYU4oc2NvcGUuYXR0cmlidXRlUmVzdWx0KSl7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KXtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSl7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKXtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0bGV0IHVzZWQgPSBmYWxzZTtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBzY29wZS5wYXJhbXMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRpZiAoIGkgPT09IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCl7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdFx0dXNlZCA9IHRydWU7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZighdXNlZCl7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0b3B0aW9uczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgaSA9IDAsXG5cdFx0XHRvcHRpb24gPSBudWxsLFxuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSAndmFsdWUnLFxuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSAnbmFtZScsXG5cdFx0XHRzdWJMaWIgPSB1bmRlZmluZWQsXG5cdFx0XHRpdGVtVmFsdWVGaWVsZE5hbWUgPSBoZWxwZXJzLmhhc093blByb3BlcnR5KCdmaWVsZE5hbWUnKSA/IGhlbHBlcnNbJ2ZpZWxkTmFtZSddIDogJ3ZhbHVlJztcblx0XHRzY29wZS5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIGhlbHBlcnMgIT09IG51bGwgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnb3B0aW9uJykpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gaGVscGVycy5vcHRpb24ubGFiZWw7XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IGhlbHBlcnMub3B0aW9uLnZhbHVlO1xuXHRcdH1cblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDIpIHtcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1syXTtcblx0XHR9XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAzICYmIHNjb3BlLnBhcmFtc1szXSA9PT0gJ2RpZmZlcmVudCcpIHtcblx0XHRcdHN1YkxpYiA9IHZhbHVlRmllbGROYW1lO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIGhlbHBlcnMgIT09IG51bGwgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGRQbGFjZUhvbGRlcicpICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkUGxhY2VIb2xkZXJEZWZhdWx0JykgJiYgaGVscGVycy5maWVsZFBsYWNlSG9sZGVyRGVmYXVsdCkge1xuXHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsICcnKTtcblx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGhlbHBlcnMuZmllbGRQbGFjZUhvbGRlcjtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtICE9PSBudWxsKSB7XG5cdFx0XHR2YXIgbGliID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHRpZiAoLypkaWZmZXJlbnQgJiYqLyBzdWJMaWIgJiYgbGliLmhhc093blByb3BlcnR5KHN1YkxpYikpIHtcblx0XHRcdFx0bGliID0gbGliW3N1YkxpYl07XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGliLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pO1xuXHRcdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBsaWJbaV1bbGFiZWxGaWVsZE5hbWVdO1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0pKSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXS5pbmRleE9mKGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pID4gLTEpIHtcblx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0gPT09IGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pIHtcblx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5leHBvcnQgZGVmYXVsdCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWI7XG4iLCJpbXBvcnQgIG5vdENvbXBvbmVudCAgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90Rm9ybSBleHRlbmRzIG5vdENvbXBvbmVudHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucyl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHt9KTtcblx0XHR0aGlzLm9uKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0KTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldCk7XG5cdFx0dGhpcy5vbignY2FuY2VsJywgdGhpcy5vbkNhbmNlbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKlxuXHRcdFJlbmRlcmluZ1xuXHQqL1xuXG5cdHJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHRcdHRoaXMucmVuZGVyQ29tcG9uZW50cygpO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpe1xuXG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCl7XG5cblx0fVxuXG5cdC8qXG5cdFx0RGF0YSBtYW5hZ2VtZW50XG5cdCovXG5cblx0Y29sbGVjdERhdGEoKXtcblxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCl7XG5cblx0fVxuXG5cdG9uUmVzZXQoKXtcblxuXHR9XG5cblx0b25DYW5jZWwoKXtcblxuXHR9XG59XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50ICBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RUYWJsZSBleHRlbmRzIG5vdENvbXBvbmVudHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jbGFzcyBub3RWaWV3IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFRlbXBsYXRlT3B0aW9ucygpIHtcblx0XHR2YXIgZGVmYXVsdFJlc3VsdCA9IHt9O1xuXHRcdHJldHVybiAodHlwZW9mIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVPcHRpb25zJykgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVPcHRpb25zJykgIT09IG51bGwpID8gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZU9wdGlvbnMnKTogZGVmYXVsdFJlc3VsdDtcblx0fVxuXG5cdGdldFBsYWNlVG9QdXQoKSB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLmdldE9wdGlvbnMoJ3BsYWNlVG9QdXQnKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRPcHRpb25zKCdwbGFjZVRvUHV0JykgIT09IG51bGwpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3BsYWNlVG9QdXQnKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRvY3VtZW50LmJvZHk7XG5cdH1cblxuXHRnZXRBZnRlckV4ZWNDYWxsYmFjayhjYWxsYmFjaykge1xuXHRcdHZhciBkZWZhdWx0UmVzdWx0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdkZWZhdWx0IHZpZXcgYWZ0ZXIgZXhlYyBjYWxsYmFjaycpO1xuXHRcdH07XG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcgJiYgY2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHJldHVybiBjYWxsYmFjaztcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB0aGlzLmdldE9wdGlvbnMoJ2FmdGVyRXhlYycpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldE9wdGlvbnMoJ2FmdGVyRXhlYycpICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdhZnRlckV4ZWMnKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRlZmF1bHRSZXN1bHQ7XG5cdH1cblxuXHRleGVjKGNhbGxiYWNrKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBuZXcgbm90Q29tcG9uZW50KHRoaXMuZ2V0VGVtcGxhdGVPcHRpb25zKCkpKTtcblx0fTtcblxuXHRzZXRQYXJhbShuYW1lLCB2YWx1ZSkge1xuXHRcdHRoaXMuZ2V0T3B0aW9ucyhuYW1lLCB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRUZW1wbGF0ZVBhcmFtKG5hbWUsIHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdFBhdGguam9pbigndGVtcGxhdGVPcHRpb25zJyxuYW1lKSwgdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UGFyYW0obmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoKS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHRoaXMuZ2V0T3B0aW9ucyhuYW1lKSA6IHVuZGVmaW5lZDtcblx0fVxuXG5cdGdldFBhcmFtcygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90VmlldztcbiIsIi8qXG5cdENvbW1vbiBmdW5jdGlvbnNcbiovXG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbi8qXG5cdGZyYW1ld29yayB3aWRlIHBhcnNlciBmb3IgZGF0YSBhY2Nlc3NcbiovXG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcbi8qXG5cdGJhc2ljIGV2ZW50IGhhbmRsZXJzIGFuZCBjb3JlIGRhdGEgbW9kaWZpZXJzXG4qL1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbi8qXG5cdHNtYXJ0ZXIgaW1hZ2UgY29udHJvbFxuKi9cbmltcG9ydCBub3RJbWFnZSBmcm9tICcuL3RlbXBsYXRlL25vdEltYWdlJztcbi8qXG5cdGFwcGxpY2F0aW9uIG1haW4gaW5mcmFzdHJ1Y3R1cmUgc2V0dGVyXG4qL1xuaW1wb3J0IG5vdEFwcCBmcm9tICcuL25vdEFwcCc7XG4vKlxuXHRkYWRkeSBmb3IgdXNlciBjb250cm9sbGVyc1xuKi9cbmltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4vbm90Q29udHJvbGxlcic7XG4vKlxuXHR0ZW1wbGF0aW5nIGFuZCBjb21tb24gc3RydWN0dXJlc1xuKi9cblxuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vdGVtcGxhdGUvbm90UmVuZGVyZXInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JzsgLy8gc21hcnRlciB3aXRoIGJpbmRpbmdzIGZvciBldmVudHMsIGFjdHVhbHkgcHJveHlcblxuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi9jb21wb25lbnRzL25vdEZvcm0nO1xuaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4vY29tcG9uZW50cy9ub3RUYWJsZSc7XG5pbXBvcnQgbm90VmlldyBmcm9tICcuL2NvbXBvbmVudHMvbm90Vmlldyc7XG5cbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnOyAvL1x0aG93IHRvIGludGVyYWN0IHdpdGggZGF0YSBvbiBzZXJ2ZXJcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnOyAvL1x0d3JhcHBlciBmb3IgZGF0YSB3aXRoIHNlcnZlcjwtPnZpZXcgbGl2ZSBpbnRlcmFjdGlvbnNcblxubm90VGVtcGxhdGVQcm9jZXNzb3JzLmFkZChub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIpO1xuXG5leHBvcnQge1xuXHRub3RDb21tb24sXG5cdG5vdFBhdGgsXG5cdG5vdEJhc2UsXG5cdG5vdEltYWdlLFxuXHRub3RBcHAsXG5cdG5vdEFQSSxcblx0bm90Q29udHJvbGxlcixcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIsXG5cdG5vdFRlbXBsYXRlQ2FjaGUsXG5cdG5vdFJlbmRlcmVyLFxuXHRub3RDb21wb25lbnQsXG5cdG5vdEZvcm0sXG5cdG5vdFRhYmxlLFxuXHRub3RWaWV3LFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZ2V0U2Vzc2lvbklEIiwicmVzcG9uc2VUeXBlIiwid2l0aENyZWRlbnRpYWxzIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ0Iiwib25lcnJvciIsIm9udGltZW91dCIsInNlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwidGhhdCIsInBhcnNlSW50IiwicmVzcG9uc2VUZXh0IiwiZSIsIkNvbW1vbkxvZ3MiLCJsb2ciLCJhcmd1bWVudHMiLCJlcnJvciIsInRyYWNlIiwiTUFQX01BTkFHRVIiLCJTeW1ib2wiLCJDb21tb25TaG9ydHMiLCJnZXRNYW5hZ2VyIiwiZ2V0QVBJIiwidiIsIkNvbW1vbk9iamVjdHMiLCJkZWZhdWx0cyIsIm9wdGlvbnMiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0Iiwic291cmNlcyIsImZvckVhY2giLCJkZXNjcmlwdG9ycyIsImtleXMiLCJzb3VyY2UiLCJyZWR1Y2UiLCJrZXkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJkZXNjcmlwdG9yIiwic3ltIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJiaWciLCJzbWFsbCIsIm9iaiIsImZpbHRlciIsImNvbnRhaW5zT2JqIiwiaWNvbnMiLCJiYXRjaCIsImxlbmd0aCIsImdldERhdGEiLCJwdXNoIiwiYSIsImIiLCJwIiwiZXF1YWwiLCJ0b1N0cmluZyIsImRlZmF1bHRWYWx1ZSIsIm9iajEiLCJvYmoyIiwialF1ZXJ5IiwiZXh0ZW5kIiwidmFsIiwicmVnaXN0cnkiLCJDb21tb25TdHJpbmdzIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIm5vdENvbW1vbiIsImFzc2lnbiIsImV4dGVuZFdpdGgiLCJTVUJfUEFUSF9TVEFSVCIsIlNVQl9QQVRIX0VORCIsIlBBVEhfU1BMSVQiLCJQQVRIX1NUQVJUX09CSkVDVCIsIlBBVEhfU1RBUlRfSEVMUEVSUyIsIkZVTkNUSU9OX01BUktFUiIsIk1BWF9ERUVQIiwibm90UGF0aCIsInBhdGgiLCJzdWJQYXRoIiwiZmluZCIsInN1YiIsInBhcnNlZCIsInN1YmYiLCJyZXBsYWNlIiwiaXRlbSIsImhlbHBlcnMiLCJzdWJQYXRoUGFyc2VkIiwiZmluZE5leHRTdWJQYXRoIiwiZ2V0VmFsdWVCeVBhdGgiLCJyZXBsYWNlU3ViUGF0aCIsInBhcnNlU3VicyIsImF0dHJWYWx1ZSIsInNldFZhbHVlQnlQYXRoIiwiaXNSZWNvcmQiLCJub3JtaWxpemVQYXRoIiwidHJpZ2dlciIsInN0ZXAiLCJoZWxwZXIiLCJyU3RlcCIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsInNwbGl0IiwicGFyc2VQYXRoU3RlcCIsIm9iamVjdCIsImF0dHJQYXRoIiwiYXR0ck5hbWUiLCJzaGlmdCIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfRVZFTlRTIiwiTUVUQV9EQVRBIiwiTUVUQV9XT1JLSU5HIiwiTUVUQV9PUFRJT05TIiwibm90QmFzZSIsIndoYXQiLCJzZXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsIm5hbWUiLCJmcm9tIiwiZXZlbnROYW1lIiwiZXZlbnQiLCJvZmYiLCJjYWxsYmFja3MiLCJjYWxsYmFjayIsInRhcmdldElkIiwic3BsaWNlIiwibm90QVBJT3B0aW9ucyIsIm5vdEFQSVF1ZWUiLCJyZXF1ZXN0c1BlclNlY29uZCIsInF1ZWUiLCJpbnQiLCJ3aW5kb3ciLCJzZXRJbnRlcnZhbCIsImNoZWNrIiwiYmluZCIsImluUHJvZ3Jlc3MiLCJ0b0NhbGwiLCJjbGVhckludGVydmFsIiwicnVuIiwibm90QVBJIiwic2V0T3B0aW9ucyIsInBhcnRzIiwiaWQiLCJnb29kIiwiYmFkIiwiYWRkIiwibWFrZVJlcXVlc3QiLCJyZXNwb25zZU9LIiwicmVzcG9uc2VGYWlsZWQiLCJyZXF1ZXN0SlNPTiIsInRoZW4iLCJuZXh0IiwiY2F0Y2giLCJjb2RlIiwiZ2V0SWQiLCJtb2RlbE5hbWUiLCJnZXRNb2RlbE5hbWUiLCJtYWtlVXJsIiwiZ2V0SlNPTiIsImdldE1vZGVsIiwic2V0UHJpY2UiLCJtb2RlbCIsIm5vdEltYWdlIiwibm90SW50ZXJmYWNlIiwibWFuaWZlc3QiLCJsaW5lIiwicmVjb3JkIiwiYWN0aW9uTmFtZSIsInJlY29yZFJFIiwiZmllbGROYW1lIiwiaW5kIiwibGVuIiwiaW5kMiIsInN0YXJ0U2xpY2UiLCJlbmRTbGljZSIsImdldEF0dHIiLCJhY3Rpb25EYXRhIiwicGFyc2VMaW5lIiwicG9zdEZpeCIsImdldEFjdGlvbnMiLCJhY3Rpb25zIiwidmFsdWUiLCJzZXRGaWx0ZXIiLCJmaWx0ZXJEYXRhIiwic2V0TW9kZWxQYXJhbSIsImdldE1vZGVsUGFyYW0iLCJzb3J0ZXJEYXRhIiwicGFnZU51bWJlciIsInBhZ2VTaXplIiwicGFyYW1OYW1lIiwicGFyYW1WYWx1ZSIsImdldEFjdGlvbkRhdGEiLCJnZXRVUkwiLCJxdWVlUmVxdWVzdCIsIm9uTG9hZCIsIm5vdFJlY29yZCIsIk1FVEFfSU5URVJGQUNFIiwiTUVUQV9QUk9YWSIsIk1FVEFfQ0hBTkdFIiwiTUVUQV9DSEFOR0VfTkVTVEVEIiwiTUVUQV9TQUwiLCJERUZBVUxUX0FDVElPTl9QUkVGSVgiLCJERUZBVUxUX1BBR0VfTlVNQkVSIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJNRVRBX1JFVFVSTl9UT19ST09UIiwiY3JlYXRlUHJvcGVydHlIYW5kbGVycyIsIm93bmVyIiwiY29udGV4dCIsInJlc1RhcmdldCIsIlJlZmxlY3QiLCJFcnJvciIsInZhbHVlVG9SZWZsZWN0Iiwibm90UHJvcGVydHkiLCJnZXRSb290IiwicGF0aFRvIiwiaXNQcm94eSIsIlByb3h5Iiwic2V0RGF0YSIsIm9uIiwicHJveHkiLCJyb290IiwiY3JlYXRlUmVjb3JkSGFuZGxlcnMiLCJjcmVhdGVDb2xsZWN0aW9uIiwibm90UmVjb3JkSW50ZXJmYWNlIiwiaW5pdFByb3BlcnRpZXMiLCJpbnRlcmZhY2VVcCIsImN1clBhdGgiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiaXRlbXMiLCJjb2xsZWN0aW9uIiwiZ2V0QWN0aW9uc0NvdW50IiwiYWN0aW9uVXAiLCJpbmRleCIsInJlcXVlc3QiLCJvYmplY3RQYXJ0Iiwic2V0QXR0ciIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCIsIlRFTVBMQVRFX1RBRyIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYIiwiQ09NUE9ORU5UX0lEX1BSRUZJWCIsIlBBUlRfSURfUFJFRklYIiwiREVGQVVMVF9QTEFDRVIiLCJERUZBVUxUX1BMQUNFUl9MT09QIiwiT1BUUyIsIk1FVEFfQ0FDSEUiLCJub3RUZW1wbGF0ZUNhY2hlIiwic2V0V29ya2luZyIsImhpZGVUZW1wbGF0ZXMiLCJyZWdpc3RlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1hcCIsImxvYWRPbmUiLCJvUmVxdWVzdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXYiLCJkYXRhc2V0Iiwibm90VGVtcGxhdGVOYW1lIiwibm90VGVtcGxhdGVVUkwiLCJzcmNFbGVtZW50Iiwic2V0T25lIiwiZWxlbWVudCIsImNsb25lTm9kZSIsImNvbnQiLCJ0ZXh0Iiwibm90VGVtcGxhdGVzRWxlbWVudHMiLCJlbElkIiwicGFyZW50Tm9kZSIsImxpYiIsImdldEhUTUwiLCJ0ZW1wbGF0ZUlubmVySFRNTCIsInRlbXBsYXRlQ29udEVsIiwid3JhcCIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJNRVRBX1BST0NFU1NPUlMiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnMiLCJzZXRQcm9jZXNzb3IiLCJnZXRQcm9jZXNzb3IiLCJNRVRBX0NPTVBPTkVOVFMiLCJub3RSZW5kZXJlciIsImlucHV0IiwiaW5pdCIsInJlbmRlciIsImNvbXBvbmVudCIsImluaXREYXRhIiwiaW5pdE9wdGlvbnMiLCJpbml0V29ya2luZyIsInRlbXBsYXRlIiwiaW5pdFRlbXBsYXRlIiwib25DaGFuZ2UiLCJNYXRoIiwicmFuZG9tIiwiZ2V0QnJlYWRDcnVtcHMiLCJ1cGRhdGUiLCJjbGVhclN0YXNoIiwic2V0V29ya2luZ01hcHBpbmciLCJleGVjUHJvY2Vzc29ycyIsInNlYXJjaEZvclN1YlRlbXBsYXRlcyIsInN0YXNoUmVuZGVyZWQiLCJpZlBhcnQiLCJjb21wb25lbnRQYXRoIiwiY2hhbmdlZFBhdGgiLCJpZkZ1bGxTdWJQYXRoIiwiY3JlYXRlTWFwcGluZyIsImZpbmRBbGxQcm9jZXNzb3JzIiwicHJvY3MiLCJlbHMiLCJnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCIsImdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQiLCJwcm9jRGF0YSIsInBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbiIsInByb2Nlc3NvckV4cHJlc3Npb24iLCJhdHRyaWJ1dGVFeHByZXNzaW9uIiwiaWZDb25kaXRpb24iLCJwYXJhbXMiLCJwcm9jZXNzb3JOYW1lIiwibWFwcGluZyIsInByb2NTY29wZSIsImF0dHJpYnV0ZVJlc3VsdCIsImdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQiLCJwcm9jTmFtZSIsInByb2MiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkZXN0cm95U3VicyIsImRlc3Ryb3kiLCJjbGVhclN1YlRlbXBsYXRlcyIsImdldFN0YXNoIiwicmVtb3ZlQ2hpbGQiLCJudEVsIiwibnRSZW5kZXJlZCIsInN1YnMiLCJudCIsImlmU3ViRWxlbWVudFJlbmRlcmVkIiwicmVuZGVyU3ViIiwiZGV0YWlscyIsImRhdGFQYXRoIiwibm90Q29tcG9uZW50IiwiY2hpbGROb2RlcyIsImFkZFRvU3Rhc2giLCJzdGFzaCIsIm5ld1N0YXNoIiwiYW5jaG9yIiwibmV4dFNpYmxpbmciLCJpbnNlcnRCZWZvcmUiLCJub2RlIiwicGxhY2UiLCJ0YXJnZXRFbCIsImNoaWxkcmVuIiwicmVuZGVyZWQiLCJwbGFjZUFmdGVyIiwicGxhY2VCZWZvcmUiLCJwbGFjZUZpcnN0IiwicGxhY2VMYXN0Iiwibm90UGxhY2VycyIsIk1FVEFfUEFSVFMiLCJyZXNldFBhcnRzIiwiaW5pdEV2ZW50cyIsImV2ZW50cyIsInByZXBhcmVUZW1wbGF0ZUVsZW1lbnQiLCJpbml0TWFya0VsZW1lbnQiLCJtYXJrRWwiLCJwbGFjZXIiLCJnZXRQbGFjZXIiLCJtYWluIiwidW5zZXRSZWFkeSIsImh0bWwiLCJzZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImdldEZyb21VUkwiLCJyZXBvcnQiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImNsZWFyUGFydHMiLCJmb3JFYWNoRGF0YSIsInJlbmRlclBhcnQiLCJwbGFjZVJlbmRlcmVkIiwicmVtb3ZlT2Jzb2xldGVQYXJ0cyIsInBsYWNlUGFydCIsInBhcnQiLCJnZXRQYXJ0QnlEYXRhIiwibm9kZXMiLCJsYXN0Tm9kZSIsIm5vZGVUeXBlIiwiZ2V0UGFydHMiLCJyZW5kZXJlciIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUiLCJhZGRQYXJ0IiwidXBkYXRlUGFydCIsInBpcGUiLCJmaW5kQWN0dWFsUGFydHMiLCJyZW1vdmVOb3RBY3R1YWxQYXJ0cyIsImFjdHVhbFBhcnRzIiwiaXNEYXRhIiwibm90Rm9ybUZhY3RvcnkiLCJvblN1Ym1pdCIsIm9uUmVzZXQiLCJvbkNhbmNlbCIsInJlbmRlcldyYXBwZXIiLCJyZW5kZXJDb21wb25lbnRzIiwibm90Q29udHJvbGxlciIsImFwcCIsImNvbnRyb2xsZXJOYW1lIiwibmNOYW1lIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwiY29udGFpbmVyU2VsZWN0b3IiLCJ2aWV3c1Bvc3RmaXgiLCJyZW5kZXJGcm9tVVJMIiwiZ2V0SW50ZXJmYWNlcyIsImludGVyZmFjMyIsIm5jIiwidmlldyIsInZpZXdzIiwicmVhbENhbGxiYWNrIiwicmVhbEhlbHBlcnMiLCJwbGFjZUlkIiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZW1wbGF0ZVVSTCIsImNvbW1vbiIsImNvbW1vblZpZXdzUHJlZml4Iiwidmlld3NQcmVmaXgiLCJ0ZW1wbGF0ZU5hbWUiLCJleGVjQW5kUHV0Iiwic2hhcmVkTGlzdCIsIl9fcHJvdG9fXyIsImsiLCJPUFRfQ09OVFJPTExFUl9QUkVGSVgiLCJPUFRfUkVDT1JEX1BSRUZJWCIsIm5vdEFwcCIsIm5vdE1hbmlmZXN0IiwicmVzb3VyY2VzIiwic3VjY2VzcyIsInNldEludGVyZmFjZU1hbmlmZXN0IiwidXBkYXRlSW50ZXJmYWNlcyIsImluaXRGb3JtQnVpbGRlcnMiLCJpbml0Q29udHJvbGxlciIsImFsbFJlc291cmNlc1JlYWR5Iiwic3RhcnRBcHAiLCJpbml0Um91dGVyIiwiY3RybCIsImV4ZWMiLCJyb3V0aWVJbnB1dCIsInJvdXRlIiwiYmluZENvbnRyb2xsZXIiLCJyb3V0aWUiLCJjbGVhckludGVyZmFjZXMiLCJtYW5pZmVzdHMiLCJyZWNvcmRNYW5pZmVzdCIsInJlY29yZERhdGEiLCJjbGVhckZvcm1CdWlsZGVycyIsImZvcm1zIiwiaW5pdEZvcm1CdWlsZGVyIiwid2FpdFRoaXNSZXNvdXJjZSIsInR5cGUiLCJvblJlc291cmNlUmVhZHkiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIiLCJzY29wZSIsInRleHRDb250ZW50Iiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJsaXZlRXZlbnRzIiwib25FdmVudCIsInByb2Nlc3NlZFZhbHVlIiwiaXNOYU4iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ1c2VkIiwib3B0aW9uIiwidmFsdWVGaWVsZE5hbWUiLCJsYWJlbEZpZWxkTmFtZSIsInN1YkxpYiIsIml0ZW1WYWx1ZUZpZWxkTmFtZSIsImxhYmVsIiwiZmllbGRQbGFjZUhvbGRlckRlZmF1bHQiLCJmaWVsZFBsYWNlSG9sZGVyIiwibm90Rm9ybSIsIm5vdFRhYmxlIiwibm90VmlldyIsImRlZmF1bHRSZXN1bHQiLCJib2R5IiwiZ2V0VGVtcGxhdGVPcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxnQkFB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
