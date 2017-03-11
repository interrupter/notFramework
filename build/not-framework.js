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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9pbmRleC5qcyIsIi4uL3NyYy9ub3RQYXRoLmpzIiwiLi4vc3JjL25vdEJhc2UuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy9ub3RSZWNvcmRJbnRlcmZhY2UuanMiLCIuLi9zcmMvbm90UmVjb3JkLmpzIiwiLi4vc3JjL3RlbXBsYXRlL29wdGlvbnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90UmVuZGVyZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlQWZ0ZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUJlZm9yZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlRmlyc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUxhc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9yZXBsYWNlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvaW5kZXguanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90Q29tcG9uZW50LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybUZhY3RvcnkuanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RWaWV3LmpzIiwiLi4vc3JjL25vdENvbnRyb2xsZXIuanMiLCIuLi9zcmMvbm90QXBwLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdEZvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29tbW9uTmV0d29yayA9IHtcblx0YWRkSG9zdDogZnVuY3Rpb24odXJpKXtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ2hvc3QnKSArIHVyaTtcblx0fSxcblx0YWRkUHJvdG9jb2w6IGZ1bmN0aW9uKHVyaSl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvcih2YXIgaSBpbiBkYXRhQXJyYXkpIHtcblx0XHRcdGZvcih2YXIgZiBpbiBmaWVsZHMpIHtcblx0XHRcdFx0aWYoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRsZXQgdGhhdCA9IHRoaXM7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUFVUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpPT57XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAocGFyc2VJbnQoc3RhdHVzKSA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKGUpID0+IHJlamVjdChlKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRTZXNzaW9uSUQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAnJztcblx0fSxcbn07XG5leHBvcnQgZGVmYXVsdCBDb21tb25OZXR3b3JrO1xuIiwidmFyIENvbW1vbkxvZ3MgPSB7XG5cdGRlYnVnOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZyguLi5hcmd1bWVudHMpO1xuXHR9LFxuXHRsb2c6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGVycm9yOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHJlcG9ydDogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5lcnJvciguLi5hcmd1bWVudHMpO1xuXHR9LFxuXHR0cmFjZTogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS50cmFjZSguLi5hcmd1bWVudHMpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTG9ncztcbiIsImNvbnN0IE1BUF9NQU5BR0VSID0gU3ltYm9sKCdNQVBfTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFQX01BTkFHRVJdID0gdjtcblx0fSxcblx0Z2V0TWFuYWdlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUFQX01BTkFHRVJdO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU2hvcnRzO1xuIiwiLyogZ2xvYmFsIGpRdWVyeSAqL1xudmFyIENvbW1vbk9iamVjdHMgPSB7XG5cdGV4dGVuZDogZnVuY3Rpb24oZGVmYXVsdHMsIG9wdGlvbnMpIHtcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcblx0XHR2YXIgcHJvcDtcblx0XHRmb3IgKHByb3AgaW4gZGVmYXVsdHMpIHtcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGVmYXVsdHMsIHByb3ApKSB7XG5cdFx0XHRcdGV4dGVuZGVkW3Byb3BdID0gZGVmYXVsdHNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsIHByb3ApKSB7XG5cdFx0XHRcdGV4dGVuZGVkW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGV4dGVuZGVkO1xuXHR9LFxuXHRjb21wbGV0ZUFzc2lnbjogZnVuY3Rpb24odGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG5cdFx0c291cmNlcy5mb3JFYWNoKHNvdXJjZSA9PiB7XG5cdFx0XHRsZXQgZGVzY3JpcHRvcnMgPSBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZSgoZGVzY3JpcHRvcnMsIGtleSkgPT4ge1xuXHRcdFx0XHRkZXNjcmlwdG9yc1trZXldID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSk7XG5cdFx0XHRcdHJldHVybiBkZXNjcmlwdG9ycztcblx0XHRcdH0sIHt9KTtcblx0XHRcdC8vIGJ5IGRlZmF1bHQsIE9iamVjdC5hc3NpZ24gY29waWVzIGVudW1lcmFibGUgU3ltYm9scyB0b29cblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5mb3JFYWNoKHN5bSA9PiB7XG5cdFx0XHRcdGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSk7XG5cdFx0XHRcdGlmIChkZXNjcmlwdG9yLmVudW1lcmFibGUpIHtcblx0XHRcdFx0XHRkZXNjcmlwdG9yc1tzeW1dID0gZGVzY3JpcHRvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIGRlc2NyaXB0b3JzKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9LFxuXHRleHRlbmRXaXRoOiBmdW5jdGlvbihvcHRpb25zKXtcblx0XHRmb3IgKGxldCBwcm9wIGluIG9wdGlvbnMpIHtcblx0XHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KHByb3ApKSB7XG5cdFx0XHRcdHRoaXNbcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRjb250YWluc09iajogZnVuY3Rpb24oYmlnLCBzbWFsbCkge1xuXHRcdGZvciAodmFyIHQgaW4gc21hbGwpIHtcblx0XHRcdGlmIChzbWFsbC5oYXNPd25Qcm9wZXJ0eSh0KSkge1xuXHRcdFx0XHRpZiAoKCFiaWcuaGFzT3duUHJvcGVydHkodCkpIHx8IChiaWdbdF0gIT09IHNtYWxsW3RdKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmlsdGVyOiBmdW5jdGlvbihvYmosIGZpbHRlcikge1xuXHRcdGlmIChmaWx0ZXIgJiYgb2JqKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jb250YWluc09iaihvYmosIGZpbHRlcik7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRmaW5kSWNvbkJ5RmlsdGVyOiBmdW5jdGlvbihpY29ucywgZmlsdGVyKSB7XG5cdFx0dmFyIGJhdGNoID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpY29ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuZmlsdGVyKGljb25zW2ldLmdldERhdGEoKSwgZmlsdGVyKSkge1xuXHRcdFx0XHRiYXRjaC5wdXNoKGljb25zW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGJhdGNoO1xuXHR9LFxuXHRlcXVhbE9iajogZnVuY3Rpb24oYSwgYikge1xuXHRcdHZhciBwO1xuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChwIGluIGEpIHtcblx0XHRcdGlmIChhW3BdKSB7XG5cdFx0XHRcdHN3aXRjaCAodHlwZW9mKGFbcF0pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoIXRoaXMuZXF1YWwoYVtwXSwgYltwXSkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoYVtwXSAhPSBiW3BdKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChiW3BdKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKHAgaW4gYikge1xuXHRcdFx0aWYgKHR5cGVvZihhW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRkZWZpbmVJZk5vdEV4aXN0czogZnVuY3Rpb24ob2JqLCBrZXksIGRlZmF1bHRWYWx1ZSkge1xuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdG9ialtrZXldID0gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fSxcblx0ZGVlcE1lcmdlOiBmdW5jdGlvbihvYmoxLCBvYmoyKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIG9iajEsIG9iajIpO1xuXHR9LFxuXG5cdHJlZ2lzdHJ5OiB7fSxcblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbk9iamVjdHM7XG4iLCJ2YXIgQ29tbW9uU3RyaW5ncyA9IHtcblx0Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG5cdH0sXG5cdGxvd2VyRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblN0cmluZ3M7XG4iLCJ2YXIgQ29tbW9uRnVuY3Rpb25zID0ge1xuXHRwaXBlOiBmdW5jdGlvbihkYXRhLyogZmVlZCBkYXRhICovLCBmdW5jcy8qIGZ1bmN0aW9ucyBhcnJheSAqLykge1xuXHRcdGxldCByZXN1bHQ7XG5cdFx0Zm9yKGxldCBmdW5jIG9mIGZ1bmNzKXtcblx0XHRcdHJlc3VsdCA9IGZ1bmMocmVzdWx0IHx8IGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRnVuY3Rpb25zO1xuIiwidmFyIENvbW1vbkRPTSA9IHtcblx0Z2V0QXR0cmlidXRlc1N0YXJ0c1dpdGg6IGZ1bmN0aW9uKGVsLCBzdGFydHNXaXRoKSB7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihzdGFydHNXaXRoKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwiaW1wb3J0IENvbW1vbk5ldHdvcmsgZnJvbSAnLi9uZXQuanMnO1xuaW1wb3J0IENvbW1vbkxvZ3MgZnJvbSAnLi9sb2dzLmpzJztcbmltcG9ydCBDb21tb25TaG9ydHMgZnJvbSAnLi9zaG9ydHMuanMnO1xuaW1wb3J0IENvbW1vbk9iamVjdHMgZnJvbSAnLi9vYmplY3RzLmpzJztcbmltcG9ydCBDb21tb25TdHJpbmdzIGZyb20gJy4vc3RyaW5ncy5qcyc7XG5pbXBvcnQgQ29tbW9uRnVuY3Rpb25zIGZyb20gJy4vZnVuY3Rpb25zLmpzJztcbmltcG9ydCBDb21tb25ET00gZnJvbSAnLi9kb20uanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tbW9uO1xuIiwiLypcblx0OnByb3BlcnR5LnN1YjEuZnVuYygpLmZ1bmNQcm9wXG5cdCA9IHJldHVybiBmdW5jUHJvcCBvZiBmdW5jdGlvbiByZXN1bHQgb2Ygc3ViMSBwcm9wZXJ0eSBvZiBwcm9wZXJ0eSBvZiBvYmplY3Rcblx0Ons6OmhlbHBlclZhbH0uc3ViXG5cdCA9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgcHJvcGVydHkgb2YgaGVscGVycyBvYmplY3Rcblx0Ons6OmhlbHBlckZ1bmMoKX0uc3ViXG5cdD0gcmV0dXJuIHN1YiBwcm9wZXJ0eSBvZiBvYmplY3QgcHJvcGVydHkgd2l0aCBuYW1lIHJldHJpZXZlZCBmcm9tIGhlbHBlclZhbCBmdW5jdGlvbiByZXN1bHQgb2YgaGVscGVycyBvYmplY3QuXG5cdGlmIGhlbHBlcnNGdW54IHJldHVybiAnY2FyJyB0aGVuIHNvdXJjZSBwYXRoIGJlY29tZXMgOmNhci5zdWJcblxuKi9cblxuY29uc3QgU1VCX1BBVEhfU1RBUlQgPSAneycsXG5cdFNVQl9QQVRIX0VORCA9ICd9Jyxcblx0UEFUSF9TUExJVCA9ICcuJyxcblx0UEFUSF9TVEFSVF9PQkpFQ1QgPSAnOicsXG5cdFBBVEhfU1RBUlRfSEVMUEVSUyA9ICc6OicsXG5cdEZVTkNUSU9OX01BUktFUiA9ICcoKScsXG5cdE1BWF9ERUVQID0gMTA7XG5cbmNsYXNzIG5vdFBhdGh7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Lypcblx0XHRpbnB1dCAnOns6OmhlbHBlclZhbH0uc3ViJ1xuXHRcdHJldHVybiA6OmhlbHBlclZhbFxuXHQqL1xuXHRmaW5kTmV4dFN1YlBhdGgocGF0aC8qIHN0cmluZyAqLyl7XG5cdFx0bGV0IHN1YlBhdGggPSAnJyxcblx0XHRcdGZpbmQgPSBmYWxzZTtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRpZiAocGF0aFtpXSA9PT0gU1VCX1BBVEhfU1RBUlQpe1xuXHRcdFx0XHRmaW5kID0gdHJ1ZTtcblx0XHRcdFx0c3ViUGF0aCA9ICcnO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKHBhdGhbaV0gPT09IFNVQl9QQVRIX0VORCAmJiBmaW5kKXtcblx0XHRcdFx0XHRpZiAoZmluZCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHN1YlBhdGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRzdWJQYXRoKz1wYXRoW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmaW5kP3N1YlBhdGg6bnVsbDtcblx0fVxuXG5cdHJlcGxhY2VTdWJQYXRoKHBhdGgsIHN1YiwgcGFyc2VkKXtcblx0XHRsZXQgc3ViZiA9IFNVQl9QQVRIX1NUQVJUK3N1YitTVUJfUEFUSF9FTkQ7XG5cdFx0d2hpbGUocGF0aC5pbmRleE9mKHN1YmYpID4gLTEpe1xuXHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShzdWJmLCBwYXJzZWQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdHBhcnNlU3VicyhwYXRoLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cblxuXHRwYXJzZVBhdGhTdGVwKHN0ZXAsIGl0ZW0sIGhlbHBlcil7XG5cdFx0bGV0IHJTdGVwID0gbnVsbDtcblx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKSA9PT0gMCAmJiBoZWxwZXIpe1xuXHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9IRUxQRVJTLCAnJyk7XG5cdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdGlmKGhlbHBlci5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPT09IDAgJiYgaXRlbSl7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCAnJyk7XG5cdFx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRcdGlmKGl0ZW0uaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBzdGVwO1xuXHR9XG5cblx0Ly86OmZpZWxkTmFtZS5yZXN1bHRcblx0Ly97fVxuXHQvL3tmaWVsZE5hbWU6ICd0YXJnZXRSZWNvcmRGaWVsZCd9XG5cdC8vLy9bJ3RhcmdldFJlY29yZEZpZWxkJywgJ3Jlc3VsdCddXG5cdHBhcnNlUGF0aChwYXRoLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRwYXRoID0gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0cGF0aFtpXSA9IHRoaXMucGFyc2VQYXRoU3RlcChwYXRoW2ldLCBpdGVtLCBoZWxwZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdG5vcm1pbGl6ZVBhdGgocGF0aCl7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cmV0dXJuIHBhdGg7XG5cdFx0fWVsc2V7XG5cdFx0XHR3aGlsZShwYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID4gLTEpe1xuXHRcdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCcnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0c21hbGwgPSBbXCJ0b2RvXCJdLFxuXHRcdGJpZyA9IFtcInRvZG9cIiwgXCJsZW5ndGhcIl1cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHQqL1xuXG5cdGlmRnVsbFN1YlBhdGgoYmlnLCBzbWFsbCl7XG5cdFx0aWYgKGJpZy5sZW5ndGg8c21hbGwubGVuZ3RoKXtyZXR1cm4gZmFsc2U7fVxuXHRcdGZvcihsZXQgdCA9MDsgdCA8IHNtYWxsLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHNtYWxsW3RdICE9PSBiaWdbdF0pe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCksXG5cdFx0XHRpc0Z1bmN0aW9uID0gYXR0ck5hbWUuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpPi0xO1xuXHRcdGlmIChpc0Z1bmN0aW9uKXtcblx0XHRcdGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHR9XG5cdFx0aWYgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgdHlwZW9mIG9iamVjdFthdHRyTmFtZV0gIT09ICd1bmRlZmluZWQnICYmIG9iamVjdFthdHRyTmFtZV0gIT09IG51bGwpe1xuXHRcdFx0bGV0IG5ld09iaiA9IGlzRnVuY3Rpb24/b2JqZWN0W2F0dHJOYW1lXSgpOm9iamVjdFthdHRyTmFtZV07XG5cdFx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKG5ld09iaiwgYXR0clBhdGgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBuZXdPYmo7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdHNldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGF0dHJWYWx1ZSl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCk7XG5cdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0aWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKXtvYmplY3RbYXR0ck5hbWVdID0ge307fVxuXHRcdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChvYmplY3RbYXR0ck5hbWVdLCBhdHRyUGF0aCwgYXR0clZhbHVlKTtcblx0XHR9ZWxzZXtcblx0XHRcdG9iamVjdFthdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0am9pbigpe1xuXHRcdGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gYXJncy5qb2luKFBBVEhfU1BMSVQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RQYXRoKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXNbTUVUQV9FVkVOVFNdID0ge307XG5cdFx0dGhpc1tNRVRBX0RBVEFdID0ge307XG5cdFx0dGhpc1tNRVRBX1dPUktJTkddID0ge307XG5cdFx0dGhpc1tNRVRBX09QVElPTlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uICovXG5cdFx0XHRcdHdoYXQgPSBhcmdzWzBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uIGVsZW1lbnQgKi9cblx0XHRcdFx0bm90UGF0aC5zZXQoYXJnc1swXSAvKiBwYXRoICovICwgd2hhdCAvKiBjb2xsZWN0aW9uICovICwgdW5kZWZpbmVkIC8qIGhlbHBlcnMgKi8gLCBhcmdzWzFdIC8qIHZhbHVlICovICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRnZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCAqL1xuXHRcdGNhc2UgMTpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0fVxuXHRcdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggd2l0aCBkZWZhdWx0IHZhbHVlICovXG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHRcdGlmIChyZXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdC8qIG5vIGRhdGEsIHJldHVybiBkZWZhdWx0IHZhbHVlICovXG5cdFx0XHRcdFx0cmV0dXJuIGFyZ3NbMV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LyogZGF0YSwgcmV0dXJuIGl0ICovXG5cdFx0XHRcdFx0cmV0dXJuIHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0LyogcmV0dXJuIGZ1bGwgY29sbGVjdGlvbiAqL1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB3aGF0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0Q09SRSBPQkpFQ1Rcblx0XHRcdERBVEEgLSBpbmZvcm1hdGlvblxuXHRcdFx0T1BUSU9OUyAtIGhvdyB0byB3b3JrXG5cdFx0XHRXT1JLSU5HIC0gdGVtcG9yYXJpbHkgZ2VuZXJhdGVkIGluIHByb2NjZXNzXG5cdCovXG5cblx0c2V0RGF0YSgpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX0RBVEFdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldERhdGEoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0fVxuXG5cdGdldERhdGEoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9EQVRBXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldE9wdGlvbnMoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRPcHRpb25zKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX09QVElPTlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0V29ya2luZygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX1dPUktJTkddID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldFdvcmtpbmcoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXb3JraW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfV09SS0lOR10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKlxuXHRcdEVWRU5UUyBoYW5kbGluZ1xuXHQqL1xuXG5cdG9uKGV2ZW50TmFtZXMsIGV2ZW50Q2FsbGJhY2tzLCBvbmNlKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdG5vdENvbW1vbi5kZWZpbmVJZk5vdEV4aXN0cyh0aGlzW01FVEFfRVZFTlRTXSwgbmFtZSwgW10pO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0ucHVzaCh7XG5cdFx0XHRcdGNhbGxiYWNrczogZXZlbnRDYWxsYmFja3MsXG5cdFx0XHRcdG9uY2U6IG9uY2UsXG5cdFx0XHRcdGNvdW50OiAwXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHRyaWdnZXIoKSB7XG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyksXG5cdFx0XHRldmVudE5hbWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZSkpIHtcblx0XHRcdGV2ZW50TmFtZSA9IFtldmVudE5hbWVdO1xuXHRcdH1cblx0XHRldmVudE5hbWUuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5mb3JFYWNoKGV2ZW50ID0+IHtcblx0XHRcdFx0XHRpZiAoZXZlbnQub25jZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnQuY2FsbGJhY2tzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG9mZihldmVudE5hbWVzIC8qIGFycmF5IG9mIGV2ZW50IG5hbWVzICovICwgZXZlbnRDYWxsYmFja3MgLyogYXJyYXkgb2YgY2FsbGJhY2tzICovICkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGxldCB0YXJnZXRJZCA9IC0xO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaCgoZXZlbnQsIGkpID0+IHtcblx0XHRcdFx0aWYgKGkgPT09IC0xICYmIGV2ZW50Q2FsbGJhY2tzID09PSBldmVudC5jYWxsYmFja3MpIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9IGk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRhcmdldElkID4gLTEpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uc3BsaWNlKHRhcmdldElkLCAxKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuIiwibGV0IG5vdEFQSU9wdGlvbnMgPSB7XG5cdHJwczogNTAsXG5cdHByb3RvY29sOiAnaHR0cCcsXG5cdGhvc3Q6ICdsb2NhbGhvc3QnLFxuXHRwb3J0OiA5MDAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RBUElPcHRpb25zO1xuIiwiY2xhc3Mgbm90QVBJUXVlZXtcblx0Y29uc3RydWN0b3IgKHJlcXVlc3RzUGVyU2Vjb25kKSB7XG5cdFx0dGhpcy5xdWVlID0gW107XG5cdFx0dGhpcy5pbnQgPSBudWxsO1xuXHRcdHRoaXMucmVxdWVzdHNQZXJTZWNvbmQgPSByZXF1ZXN0c1BlclNlY29uZCB8fCA1O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuKCl7XG5cdFx0dGhpcy5pbnQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5jaGVjay5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5yZXF1ZXN0c1BlclNlY29uZCk7XG5cdH1cblxuXHRjaGVjaygpe1xuXHRcdGlmICh0aGlzLmluUHJvZ3Jlc3Mpe3JldHVybjt9XG5cdFx0ZWxzZXtcblx0XHRcdGlmICh0aGlzLnF1ZWUubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHRoaXMuaW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0XHRcdGxldCB0b0NhbGwgPSB0aGlzLnF1ZWUuc2hpZnQoKTtcblx0XHRcdFx0dG9DYWxsKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmV4dCgpe1xuXHRcdHRoaXMuaW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHR9XG5cblx0YWRkKGNhbGwpe1xuXHRcdHRoaXMucXVlZS5wdXNoKGNhbGwpO1xuXHR9XG5cblx0cGF1c2UoKXtcblx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludCk7XG5cdH1cblxuXHRyZXN1bWUoKXtcblx0XHR0aGlzLnJ1bigpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSVF1ZWU7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlLmpzJztcblxuaW1wb3J0IG5vdEFQSU9wdGlvbnMgZnJvbSAnLi9vcHRpb25zLmpzJztcbmltcG9ydCBub3RBUElRdWVlIGZyb20gJy4vcXVlZS5qcyc7XG5cblxuY2xhc3Mgbm90QVBJIGV4dGVuZHMgIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RDb21tb24uZXh0ZW5kKG5vdEFQSU9wdGlvbnMsIG9wdGlvbnMpKTtcblx0XHR0aGlzLnF1ZWUgPSBuZXcgbm90QVBJUXVlZSh0aGlzLmdldE9wdGlvbnMoJ3JwcycpKTtcblx0XHR0aGlzLnF1ZWUucnVuKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRtYWtlVXJsKHBhcnRzKSB7XG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJy8nKTtcblx0fVxuXG5cdHF1ZWVSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsIG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRtYWtlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCkge1xuXHRcdG5vdENvbW1vbi5sb2coJ21ha2luZyByZXF1ZXN0JywgbWV0aG9kLCB1cmwsIGlkKTtcblx0XHRub3RDb21tb24ucmVxdWVzdEpTT04obWV0aG9kLCB1cmwsIGRhdGEpXG5cdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVxdWVzdCBzdWNjZXNzZnVsbCcsIG1ldGhvZCwgdXJsLCBpZCwgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXNwb25zZSBpcyBnb29kJyk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChjb2RlLCByZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ3JlcXVlc3QgZmFpbGVkJywgbWV0aG9kLCB1cmwsIGlkLCByZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3Jlc3BvbnNlIGlzIGJhZCcpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZScpO1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncG9zdCcsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygncHV0dCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2dldCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnbGlzdCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2RlbGV0ZScsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2RlbGV0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldFVwbG9hZFVSTChtb2RlbCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSArIHRoaXMuZ2V0T3B0aW9ucygndXBsb2FkJykgKyBtb2RlbD9tb2RlbC5nZXRJZCgpOicnO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSTtcbiIsImltcG9ydCBub3RCYXNlICBmcm9tICcuLi9ub3RCYXNlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEltYWdlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW50ZXJmYWNlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGV4dGVuZE9iamVjdChvYmoxLCBvYmoyKSB7XG5cdFx0dmFyIGF0dHJOYW1lID0gJyc7XG5cdFx0Zm9yIChhdHRyTmFtZSBpbiBvYmoyKSB7XG5cdFx0XHRpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpIHtcblx0XHRcdFx0b2JqMVthdHRyTmFtZV0gPSBvYmoyW2F0dHJOYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG9iajE7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldEFjdGlvbnNDb3VudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBY3Rpb25zKCkgPyBPYmplY3Qua2V5cyh0aGlzLmdldEFjdGlvbnMoKSkubGVuZ3RoIDogMDtcblx0fVxuXG5cdGdldEFjdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFuaWZlc3QgJiYgdGhpcy5tYW5pZmVzdC5hY3Rpb25zP3RoaXMubWFuaWZlc3QuYWN0aW9ucyA6IHt9O1xuXHR9XG5cblx0c2V0RmluZEJ5KGtleSwgdmFsdWUpIHtcblx0XHR2YXIgb2JqID0ge307XG5cdFx0b2JqW2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIob2JqKTtcblx0fVxuXG5cdHNldEZpbHRlcihmaWx0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdmaWx0ZXInLCBmaWx0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFNvcnRlcihzb3J0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUocGFnZVNpemUpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZXIocGFnZVNpemUsIHBhZ2VOdW1iZXIpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldE1vZGVsUGFyYW0oJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0c2V0TW9kZWxQYXJhbShwYXJhbU5hbWUsIHBhcmFtVmFsdWUpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCkpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucyhwYXJhbU5hbWUsIHBhcmFtVmFsdWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZGVsUGFyYW0ocGFyYW1OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucyhwYXJhbU5hbWUsIG51bGwpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdC8vcmV0dXJuIFByb21pc2Vcblx0cmVxdWVzdChyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdHVybCA9IHRoaXMuZ2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIG5vdENvbW1vbi5nZXRBUEkoKS5xdWVlUmVxdWVzdChhY3Rpb25EYXRhLm1ldGhvZCwgdXJsLCBKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSwgdGhpcy5vbkxvYWQuYmluZCh7YWN0aW9uRGF0YSwgbWFuaWZlc3Q6IHRoaXMubWFuaWZlc3R9KSk7XG5cdH1cbi8qXG5cdF9yZXF1ZXN0X09ic29sZXRlXyhyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRub3RDb21tb24ubG9nKCdyZXF1ZXN0JywgcmVjb3JkLCBhY3Rpb25OYW1lLCBjYWxsYmFja1N1Y2Nlc3MsIGNhbGxiYWNrRXJyb3IpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwsIHJlY29yZC5nZXRJZCgpLCBKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSwgZ29vZCwgYmFkKVxuXHRcdFx0XHRcdC50aGVuKHJlc29sdmUpXG5cdFx0XHRcdFx0LmNhdGNoKHJlamVjdCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlJyk7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpO1xuXG5cdFx0fSk7XG5cblxuXHRcdGlmIChhY3Rpb25EYXRhKXtcblx0XHRcdHZhciB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eG1saHR0cC5vcGVuKGFjdGlvbkRhdGEubWV0aG9kLCB1cmwpO1xuXHRcdFx0eG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4bWxodHRwLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhtbGh0dHAud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhtbGh0dHAuY2FsbGJhY2tTdWNjZXNzID0gY2FsbGJhY2tTdWNjZXNzO1xuXHRcdFx0eG1saHR0cC5jYWxsYmFja0Vycm9yID0gY2FsbGJhY2tFcnJvcjtcblx0XHRcdHhtbGh0dHAub25sb2FkID0gdGhpcy5vbkxvYWQ7XG5cdFx0XHR4bWxodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSkpO1xuXHRcdH1cblx0fVxuKi9cblx0b25Mb2FkKGRhdGEpe1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZih0aGlzICYmIHRoaXMuYWN0aW9uRGF0YSAmJiB0aGlzLmFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiB0aGlzLmFjdGlvbkRhdGEuaXNBcnJheSkge1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0ZmlsZVVwbG9hZChmaWxlVXBsb2FkKSB7XG5cdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdC8vbm90Q29tbW9uLmxvZyhmaWxlVXBsb2FkLmZpbGUpO1xuXHRcdGlmICh4aHIudXBsb2FkICYmIHRoaXMuZmlsZUFsbG93ZWQoZmlsZVVwbG9hZC5maWxlKSkge1xuXHRcdFx0Ly8gcHJvZ3Jlc3MgYmFyXG5cdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcInByb2dyZXNzXCIsIGUsIGZpbGVVcGxvYWQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGF0LndvcmtpbmcuZmlsZVVwbG9hZHMuaW5kZXhPZihmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHRcdHRoYXQud29ya2luZy5maWxlVXBsb2Fkcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwic3VjY2Vzc1wiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9wZW4oXCJQT1NUXCIsIHRoaXMuZ2V0VXBsb2FkVXJsKCksIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgZmlsZVVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYX0ZJTEVOQU1FXCIsIGVuY29kZVVSSUNvbXBvbmVudChmaWxlVXBsb2FkLmZpbGUubmFtZSkpO1xuXHRcdFx0eGhyLnNlbmQoZmlsZVVwbG9hZC5maWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBuZXcgRXZlbnQoXCJXcm9uZ0ZpbGVUeXBlXCIpLCBmaWxlVXBsb2FkKTtcblx0XHR9XG5cdH1cblx0Ki9cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJztcblxuY29uc3QgTUVUQV9JTlRFUkZBQ0UgPSBTeW1ib2woJ2ludGVyZmFjZScpLFxuXHRNRVRBX1BST1hZID0gU3ltYm9sKCdwcm94eScpLFxuXHRNRVRBX0NIQU5HRSA9IFN5bWJvbCgnY2hhbmdlJyksXG5cdE1FVEFfQ0hBTkdFX05FU1RFRCA9IFN5bWJvbCgnY2hhbmdlLm5lc3RlZCcpLFxuXHRNRVRBX1NBTCA9IFsnZ2V0QXR0cicsICdnZXRBdHRycycsICdzZXRBdHRyJywgJ3NldEF0dHJzJywgJ2dldERhdGEnLCAnc2V0RGF0YScsICdnZXRKU09OJywgJ29uJywgJ29mZicsICd0cmlnZ2VyJ10sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTAsXG5cdE1FVEFfUkVUVVJOX1RPX1JPT1QgPSBTeW1ib2woJ3JldHVyblRvUm9vdCcpO1xuXG52YXIgY3JlYXRlUHJvcGVydHlIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdHlwZW9mIHRhcmdldFtrZXldKTtcblxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UHJvcGVydHkgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoZ2V0Um9vdCwgcGF0aFRvLCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUHJveHkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5zZXREYXRhKGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9SRVRVUk5fVE9fUk9PVF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRbTUVUQV9SRVRVUk5fVE9fUk9PVF0ocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHRsZXQgcm9vdCA9IHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpKCk7XG5cdFx0cm9vdC50cmlnZ2VyKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX1BST1hZXSwgdGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSwgdmFsdWUpO1xuXHR9XG59XG5cblxudmFyIGNyZWF0ZVJlY29yZEhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGFyZ2V0LCBrZXksIHZhbHVlKTtcblx0XHRcdFx0cmV0dXJuIHQ7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0fTtcbn07XG5cbmNsYXNzIG5vdFJlY29yZCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCwgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1Byb3h5KSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ3RoaXMgaXMgUHJveHkgaXRlbScpO1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1JlY29yZCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0ZmlsdGVyOiB7fSxcblx0XHRcdHNvcnRlcjoge30sXG5cdFx0XHRwYWdlTnVtYmVyOiBERUZBVUxUX1BBR0VfTlVNQkVSLFxuXHRcdFx0cGFnZVNpemU6IERFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0ZmllbGRzOiBbXVxuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdID0gbmV3IG5vdFJlY29yZEludGVyZmFjZShtYW5pZmVzdCk7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXMuaW50ZXJmYWNlVXAoKTtcblx0XHR0aGlzLmlzUmVjb3JkID0gdHJ1ZTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IHJlY29yZCBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdGluaXRQcm9wZXJ0aWVzKGl0ZW0sIHBhdGggPSAnJykge1xuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhpdGVtKTtcblx0XHRcdGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRcdGxldCBjdXJQYXRoID0gcGF0aCArIChwYXRoLmxlbmd0aCA+IDAgPyAnLicgOiAnJykgKyBrZXk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3VyUGF0aCcsIGN1clBhdGgpO1xuXHRcdFx0XHRpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtW2tleV0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gKCkgPT4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCk7XG5cdFx0XHRub3RDb21tb24ubG9nKCdkZWZpbmUnLCBERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleCk7XG5cdFx0fVxuXHR9XG5cdC8qXG5cdC0+ICdwYXRoLnRvLmtleScsIHZhbHVlT2ZLZXlcblx0PC0gb2ssIHdpdGggb25lIG9uQ2hhbmdlIGV2ZW50IHRyaWdnZXJlZFxuXHQqL1xuXG5cdHNldEF0dHIoa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBub3RQYXRoLnNldChrZXksIHRoaXNbTUVUQV9QUk9YWV0sIHt9LCB2YWx1ZSk7XG5cdH1cblxuXHQvKlxuXHQtPlxuXHR7XG5cdFx0J2tleVBhdGgnOiB2YWx1ZSxcblx0XHQna2V5LnN1YlBhdGgnOiB2YWx1ZTIsXG5cdFx0J2tleVBhdGguMC50aXRsZSc6IHZhbHVlM1xuXHR9XG5cdDwtIG9rLCB3aXRoIGJ1bmNoIG9mIG9uQ2hhbmdlIGV2ZW50cyB0cmlnZ2VyZWRcblx0Ki9cblx0c2V0QXR0cnMob2JqZWN0UGFydCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBpbiBvYmplY3RQYXJ0KSB7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMgb25lIHRvIGdvJywgcGF0aCk7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cihwYXRoLCBvYmplY3RQYXJ0W3BhdGhdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aFRvS2V5J1xuXHQ8LSB2YWx1ZTFcblxuXHQqL1xuXHRnZXRBdHRyKHdoYXQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ2dldEF0dHInLCB3aGF0KTtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQod2hhdCwgdGhpc1tNRVRBX1BST1hZXSwge30pO1xuXHR9XG5cblx0Lypcblx0LT4gWydwYXRoVG9LZXknLCAncGF0aC50by5rZXknLCAnc2ltcGxlS2V5JywuLi5dXG5cdDwtIFt2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzLC4uLl1cblx0Ki9cblx0Z2V0QXR0cnMod2hhdCkge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAod2hhdCAmJiB3aGF0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggb2Ygd2hhdCkge1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLmdldEF0dHIocGF0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRnZXRKU09OKCkge1xuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJjb25zdCBQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVggPSAnbi0nLFxuXHRURU1QTEFURV9UQUcgPSAnbnQnLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgPSAnLScsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYID0gJ2lmJyxcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCA9ICdub3RfY29tcG9uZW50XycsXG5cdFBBUlRfSURfUFJFRklYID0gJ25vdF9wYXJ0XycsXG5cdERFRkFVTFRfUExBQ0VSID0gJ3BsYWNlJyxcblx0REVGQVVMVF9QTEFDRVJfTE9PUCA9ICdwbGFjZUFmdGVyJztcblxuY29uc3QgT1BUUyA9IHtcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLFxuXHRURU1QTEFURV9UQUcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUixcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsXG5cdERFRkFVTFRfUExBQ0VSLFxuXHRDT01QT05FTlRfSURfUFJFRklYLFxuXHRQQVJUX0lEX1BSRUZJWCxcblx0REVGQVVMVF9QTEFDRVJfTE9PUFxufTtcblxuZXhwb3J0IGRlZmF1bHQgT1BUUztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmNvbnN0IE1FVEFfQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlQ2FjaGUgZXh0ZW5kcyBub3RCYXNle1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXSA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHR0aGlzLmhpZGVUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaWRlVGVtcGxhdGVzKCl7XG5cdFx0bGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdHQuaW5uZXJIVE1MID0gT1BUUy5URU1QTEFURV9UQUcgKyAne2Rpc3BsYXk6IG5vbmU7fSc7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KTtcblx0fVxuXG5cdHJlZ2lzdGVyKCkge1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcigndGVtcGxhdGVDYWNoZScsIHRoaXMpO1xuXHR9XG5cblx0bG9hZChtYXApIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0Zm9yICh2YXIgaSBpbiBtYXApIHtcblx0XHRcdHRoaXMubG9hZE9uZShpLCBtYXBbaV0pO1xuXHRcdH1cblx0fVxuXG5cdGxvYWRPbmUoa2V5LCB1cmwsIGNhbGxiYWNrKSB7XG5cblx0XHR2YXIgb1JlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRvUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXHRcdG9SZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdGlmICh0aGF0LmdldChrZXkpKXtcblx0XHRcdFx0cmVzb2x2ZSh0aGF0LmdldChrZXkpKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL3RoYXQuc2V0TG9hZGluZyhrZXksIHVybCk7XG5cdFx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybCkudGhlbihmdW5jdGlvbih0ZW1wbGF0ZUlubmVySFRNTCl7XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhhdC53cmFwKGtleSwgdXJsLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0XHRcdFx0dGhhdC5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSh0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdlcnJvciBsb2FkaW5nIHRlbXBsYXRlJywga2V5LCB1cmwpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybCkudGhlbihmdW5jdGlvbih0ZW1wbGF0ZXNIVE1MKXtcblx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoYXQucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdHRoYXQuYWRkTGliKHRlbXBsYXRlcyk7XG5cdFx0XHRcdHJlc29sdmUodGVtcGxhdGVzKTtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGVzIGxpYicsIHVybCxlKTtcblx0XHRcdFx0cmVqZWN0KC4uLmFyZ3VtZW50cyk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcblxuY29uc3QgTUVUQV9QUk9DRVNTT1JTID0gU3ltYm9sKCdwcm9jZXNzb3JzJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFByb2Nlc3NvcigvKiBrZXksIHZhbHVlICovKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQcm9jZXNzb3IoLyoga2V5LCAgZGVmYXVsdFZhbHVlICovKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXJQcm9jZXNzb3JzKCl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGQoKXtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG5cdFx0XHR0aGlzLnNldFByb2Nlc3Nvcihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBhcmd1bWVudHNbMF0pe1xuXHRcdFx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKHQsIGFyZ3VtZW50c1swXVt0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRQcm9jZXNzb3IoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyKCl7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vbm90VGVtcGxhdGVQcm9jZXNzb3JzJztcblxuLypcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGCIERPTSDQv9C+0LTQtNC10YDQtdCy0L4g0LIg0LrQsNGH0LXRgdGC0LLQtSDRiNCw0LHQu9C+0L3QsC5cbiAqINCX0LDQv9C+0LvQvdGP0LXRgiDQtdCz0L4g0LTQsNC90L3Ri9C80LguXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgdCz0LXQvdC10YDQuNGA0L7QstCw0L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xuICpcbiAqICovXG5cbi8qXG5cblx0PGRpdiBuLXRlbXBsYXRlLW5hbWU9XCJ2YXN5YVwiPlxuXHRcdDxwPjxpbnB1dCB0eXBlPVwidGV4dFwiIG4tdmFsdWU9XCI6Y29vbE5hbWVcIi8+PC9wPlxuXHRcdDxwPtCR0L7RgNC40YEg0YXRgNC10L0g0L/QvtC/0LDQtNC10YjRjCDQuCB7ezpjb29sTmFtZX19LjwvcD5cblx0PC9kaXY+XG5cbiAqL1xuXG5jb25zdCBNRVRBX0NPTVBPTkVOVFMgPSBTeW1ib2woJ2NvbXBvbmVudHMnKTtcblxuY2xhc3Mgbm90UmVuZGVyZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Lypcblx0XHRpbnB1dCA9IHtcblx0XHRcdGRhdGE6IG5vdFJlY29yZCxcblx0XHRcdHRlbXBsYXRlOiBlbGVtZW50XG5cdFx0XHRvcHRpb25zOntcblx0XHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdH1cblx0XHR9XG5cdCovXG5cblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXSA9IHt9O1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5jb21wb25lbnQgPSBpbnB1dC5jb21wb25lbnQ7XG5cdFx0dGhpcy5pbml0RGF0YShpbnB1dC5kYXRhID8gaW5wdXQuZGF0YSA6IHt9KTtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQudGVtcGxhdGUpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlKCk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGUoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZScsIHRoaXMuZ2V0V29ya2luZygnZ2V0VGVtcGxhdGUnKSgpKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5nZXREYXRhKCkub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdH1cblxuXHRpbml0V29ya2luZyh0ZW1wbGF0ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRnZXRUZW1wbGF0ZTogdGVtcGxhdGUsXG5cdFx0XHRwYXJ0SWQ6IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgPyB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpIDogT1BUUy5QQVJUX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpIHtcblx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcblx0XHRcdHJldHVybiBbLi4udGhpcy5jb21wb25lbnQuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fVxuXHR9XG5cblx0b25DaGFuZ2UocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHQvKm5vdENvbW1vbi5sb2codGhpcyk7XG5cdFx0bm90Q29tbW9uLmxvZyh0aGlzLmdldEJyZWFkQ3J1bXBzKCkuam9pbignID4gJykpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHJlbmRlcmVyICcsIHRoaXMuZ2V0V29ya2luZygncGFydElkJyksICcgYWZ0ZXIgY2hhbmdlcycsIGtleSwgdmFsdWUpOyovXG5cdFx0dGhpcy51cGRhdGUoa2V5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ29ic29sZXRlJyk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHR1cGRhdGUoa2V5KSB7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfQ09NUE9ORU5UU10pIHtcblx0XHRcdGxldCBpdGVtID0gdGhpc1tNRVRBX0NPTVBPTkVOVFNdW3RdLFxuXHRcdFx0XHRpZlBhcnQgPSB0cnVlO1xuXHRcdFx0aWYgKGtleSl7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJyk9PT1udWxsKXtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXRcdGNvbXBvbmVudFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpKSxcblx0XHRcdFx0XHRjaGFuZ2VkUGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChrZXkpO1xuXHRcdFx0XHRpZlBhcnQgPSBub3RQYXRoLmlmRnVsbFN1YlBhdGgoY2hhbmdlZFBhdGgsIGNvbXBvbmVudFBhdGgpO1xuXHRcdFx0XHQvKm5vdENvbW1vbi5sb2coaXRlbS5nZXRPcHRpb25zKCduYW1lJyksICcgPi08ICcsIGl0ZW0uZ2V0T3B0aW9ucygnaWQnKSwgJyA+LTwgJywgY29tcG9uZW50UGF0aCwgY2hhbmdlZFBhdGgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCd3aWxsIGJlIHVwZGF0ZWQnLCBpZlBhcnQpOyovXG5cdFx0XHR9XG5cblx0XHRcdGlmIChpZlBhcnQpIHtcblx0XHRcdFx0aXRlbS51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXRXb3JraW5nTWFwcGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21hcHBpbmcnLCB0aGlzLmNyZWF0ZU1hcHBpbmcoKSk7XG5cdH1cblxuXHQvKlxuXG5cdNCh0L7Qt9C00LDQtdC8INC60LDRgNGC0Ysg0YHQvtC+0YLQstC10YHRgtCy0LjRjyDQv9GA0L7RhtC10YHRgdC+0YDQvtCyLCDQv9GD0YLQtdC5INC00LDQvdC90YvRhSDQsiDQvtCx0YrQtdC60YLQtSDQuCDRjdC70LXQvNC10L3RgtC+0LIg0YjQsNCx0LvQvtC90LAuXG5cdFt7XG5cdFx0ZWwsXG5cdFx0cHJvY2Vzc29yLFxuXHRcdHdvcmtpbmcsXG5cdFx0aXRlbS5wcm9wZXJ0eS5wYXRoXG5cdH1dXG5cblx0Ki9cblxuXHRjcmVhdGVNYXBwaW5nKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmZpbmRBbGxQcm9jZXNzb3JzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZpbmRBbGxQcm9jZXNzb3JzKCkge1xuXHRcdGxldCBwcm9jcyA9IFtdLFxuXHRcdFx0ZWxzID0gbm90Q29tbW9uLmdldEF0dHJpYnV0ZXNTdGFydHNXaXRoKHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLCBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCk7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBhdHRzID0gZWxzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhhdHRzW2ldKTtcblx0XHRcdFx0XHRsZXQgcHJvY0RhdGEgPSB0aGlzLnBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihhdHRzW2ldLm5vZGVOYW1lKTtcblx0XHRcdFx0XHRwcm9jRGF0YS5lbGVtZW50ID0gZWxzW2pdO1xuXHRcdFx0XHRcdHByb2NEYXRhLnByb2Nlc3NvckV4cHJlc3Npb24gPSBhdHRzW2ldLm5vZGVOYW1lO1xuXHRcdFx0XHRcdHByb2NEYXRhLmF0dHJpYnV0ZUV4cHJlc3Npb24gPSBhdHRzW2ldLnZhbHVlO1xuXHRcdFx0XHRcdHByb2NzLnB1c2gocHJvY0RhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwcm9jcztcblx0fVxuXG5cdHBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihwcm9jZXNzb3JFeHByZXNzaW9uKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdHBhcmFtczogW10sXG5cdFx0XHRwcm9jZXNzb3JOYW1lOiAnJyxcblx0XHRcdGlmQ29uZGl0aW9uOiBmYWxzZVxuXHRcdH07XG5cdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCwgJycpO1xuXHRcdGlmIChwcm9jZXNzb3JFeHByZXNzaW9uLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCkgPT09IChwcm9jZXNzb3JFeHByZXNzaW9uLmxlbmd0aCAtIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgubGVuZ3RoKSkge1xuXHRcdFx0cmVzdWx0LmlmQ29uZGl0aW9uID0gdHJ1ZTtcblx0XHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgKyBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLCAnJyk7XG5cdFx0fVxuXHRcdHJlc3VsdC5wYXJhbXMgPSBwcm9jZXNzb3JFeHByZXNzaW9uLnNwbGl0KE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SKTtcblx0XHRyZXN1bHQucHJvY2Vzc29yTmFtZSA9IHJlc3VsdC5wYXJhbXNbMF07XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHJlc3VsdC5wYXJhbXMuc2xpY2UoMSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGV4ZWNQcm9jZXNzb3JzKGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG1hcHBpbmcgPSB0aGlzLmdldFdvcmtpbmcoJ21hcHBpbmcnKTtcblx0XHRpZiAobWFwcGluZykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBwcm9jU2NvcGUgPSBtYXBwaW5nW2ldO1xuXHRcdFx0XHRwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHByb2NTY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBpbmRleCk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnYXR0cmlidXRlUmVzdWx0JywgcHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdFx0XHRcdGxldCBwcm9jTmFtZSA9IHByb2NTY29wZS5wcm9jZXNzb3JOYW1lLFxuXHRcdFx0XHRcdHByb2MgPSBub3RUZW1wbGF0ZVByb2Nlc3NvcnMuZ2V0KHByb2NOYW1lKTtcblx0XHRcdFx0aWYgKHByb2MpIHtcblx0XHRcdFx0XHRwcm9jKHByb2NTY29wZSwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0XHRcdFx0XHRwcm9jU2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvY1Njb3BlLnByb2Nlc3NvckV4cHJlc3Npb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gcHJvY2Vzc29yIGxpa2UnLCBwcm9jTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcpO1xuXHR9XG5cblx0Z2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwYXRoLCBpdGVtKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdH1cblxuXHRjbGVhclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmRlc3Ryb3lTdWJzKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdWJzJywgW10pO1xuXHR9XG5cblx0ZGVzdHJveVN1YnMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFN0YXNoKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IGVsID0gdGhpcy5nZXRTdGFzaCgpW3RdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUpe1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZlN1YkVsZW1lbnRSZW5kZXJlZChudEVsKSB7XG5cdFx0cmV0dXJuIG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkICYmIChudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZC52YWx1ZSA9PT0gJ3RydWUnKTtcblx0fVxuXG5cdHNlYXJjaEZvclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0bGV0IHN1YnMgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCA9IDA7IG50IDwgc3Vicy5sZW5ndGg7IG50KyspIHtcblx0XHRcdGlmICghdGhpcy5pZlN1YkVsZW1lbnRSZW5kZXJlZChzdWJzW250XSkpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJTdWIoc3Vic1tudF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZFN1YihudEVsKSB7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdzdWJzJykucHVzaCh7XG5cdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdHBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiAnJyxcblx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnNyYyA6ICcnLFxuXHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0XHRyZW5kZXJlZExpc3Q6IFtdLFxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU3ViKG50RWwpIHtcblx0XHRpZiAoIW50RWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IGRldGFpbHMgPSB7XG5cdFx0XHRcdGRhdGFQYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogbnVsbCxcblx0XHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMuc3JjLnZhbHVlIDogJycsXG5cdFx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0ZGF0YTogZGV0YWlscy5kYXRhUGF0aCE9PSBudWxsPyB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQoZGV0YWlscy5kYXRhUGF0aCwgdGhpcy5nZXREYXRhKCkpOm51bGwsXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHNyYzogZGV0YWlscy5zcmNcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSxcblx0XHRcdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VBZnRlcicsXG5cdFx0XHRcdFx0aWQ6IGRldGFpbHMuaWQsXG5cdFx0XHRcdFx0bnRFbDogbnRFbCxcblx0XHRcdFx0XHRkYXRhUGF0aDogZGV0YWlscy5kYXRhUGF0aFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvd25lcjogdGhpc1xuXHRcdFx0fTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnaWQnLCBkZXRhaWxzLmlkKTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU11bZGV0YWlscy5pZF0gPSBuZXcgbm90Q29tcG9uZW50KG9wdGlvbnMpO1xuXHR9XG5cblx0Y2xlYXJTdGFzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgW10pO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZScpO1xuXHR9XG5cblx0Z2V0U3Rhc2goKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc3Rhc2gnKTtcblx0fVxuXG5cdHN0YXNoUmVuZGVyZWQoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMuYWRkVG9TdGFzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHR9XG5cblx0cmVwbGFjZVJlbmRlcmVkKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygncmVwbGFjZSBzdGFzaCcpO1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSxcblx0XHRcdHN0YXNoID0gdGhpcy5nZXRTdGFzaCgpLFxuXHRcdFx0bmV3U3Rhc2ggPSBbXSxcblx0XHRcdGFuY2hvciA9IHN0YXNoLmxlbmd0aCA+IDAgPyBzdGFzaFswXSA6IHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLFxuXHRcdFx0cGFyZW50Tm9kZSA9IGFuY2hvci5wYXJlbnROb2RlO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdG5ld1N0YXNoLnB1c2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IG5ld1N0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRpZiAoYW5jaG9yLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTdGFzaFt0XSwgYW5jaG9yLm5leHRTaWJsaW5nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld1N0YXNoW3RdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBzdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdGFzaFt0XSk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBuZXdTdGFzaCk7XG5cdH1cblxuXHRhZGRUb1N0YXNoKG5vZGUpIHtcblx0XHR0aGlzLmdldFN0YXNoKCkucHVzaChub2RlKTtcblx0fVxuXG5cdGlzRGF0YShkYXRhKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlbmRlcmVyO1xuIiwiY29uc3QgcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdHdoaWxlICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuWzBdKTtcblx0XHR9XG5cdH0sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fVxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlO1xuIiwiY29uc3QgcGxhY2VBZnRlciA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQWZ0ZXI7XG4iLCJjb25zdCBwbGFjZUJlZm9yZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQmVmb3JlO1xuIiwiY29uc3QgcGxhY2VGaXJzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZUZpcnN0O1xuIiwiY29uc3QgcGxhY2VMYXN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VMYXN0O1xuIiwiY29uc3QgcmVwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHtcblx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhcmdldEVsKTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZTtcbiIsImltcG9ydCBwbGFjZSBmcm9tICcuL3BsYWNlJztcbmltcG9ydCBwbGFjZUFmdGVyIGZyb20gJy4vcGxhY2VBZnRlcic7XG5pbXBvcnQgcGxhY2VCZWZvcmUgZnJvbSAnLi9wbGFjZUJlZm9yZSc7XG5pbXBvcnQgcGxhY2VGaXJzdCBmcm9tICcuL3BsYWNlRmlyc3QnO1xuaW1wb3J0IHBsYWNlTGFzdCBmcm9tICcuL3BsYWNlTGFzdCc7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICcuL3JlcGxhY2UnO1xuXG5jb25zdCBub3RQbGFjZXJzID0ge1xuXHRwbGFjZTogcGxhY2UsXG5cdHBsYWNlQWZ0ZXI6IHBsYWNlQWZ0ZXIsXG5cdHBsYWNlQmVmb3JlOiBwbGFjZUJlZm9yZSxcblx0cGxhY2VGaXJzdDogcGxhY2VGaXJzdCxcblx0cGxhY2VMYXN0OiBwbGFjZUxhc3QsXG5cdHJlcGxhY2U6IHJlcGxhY2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFBsYWNlcnM7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vbm90UmVuZGVyZXInO1xuaW1wb3J0IG5vdFBsYWNlcnMgZnJvbSAnLi9wbGFjZXJzJztcblxuY29uc3QgTUVUQV9QQVJUUyA9IFN5bWJvbCgncGFydHMnKTtcbi8qXG5cdGlucHV0ID0ge1xuXHRcdGRhdGE6IG5vdFJlY29yZCBvciBbbm90UmVjb3JkXSxcblx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0aHRtbDogaHRtbChzdHJpbmcpLCBcdFx0Ly/RgtC10LrRgdGCINGBIGh0bWwg0LrQvtC00L7QvCDRiNCw0LHQu9C+0L3QsFxuXHRcdFx0ZWw6IEhUTUxFbGVtZW50KG9iamVjdCksIFx0Ly9ET00g0Y3Qu9C10LzQtdC90YJcblx0XHRcdHNyYzogc3JjKHN0cmluZyksXHRcdFx0Ly/RgdGB0YvQu9C60LAg0L3QsCDRhNCw0LnQuyDRgSDRiNCw0LHQu9C+0L3QvtC8XG5cdFx0XHRuYW1lOiBuYW1lKHN0cmluZylcdFx0XHQvL9C90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAg0LTQu9GPINC/0L7QuNGB0LrQsCDQsiDQutGN0YjQtSBub3RUZW1wbGF0ZUNhY2hlXG5cdFx0fVxuXHRcdG9wdGlvbnM6e1xuXHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0Ly/QsCDRjdGC0L4g0LrQsNC6INCx0YPQtNC10Lwg0L/QvtC80LXRidCw0YLRjCDRgNC10LfRg9C70YzRgtCw0YIg0YDQtdC90LTQtdGA0LjQvdCz0LBcblx0XHRcdHJlbmRlckFuZDogcGxhY2VTdHlsZShzdHJpbmcpINC+0LTQuNC9INC40Lcg0LLQsNGA0LjQsNC90YLQvtCyXG5cdFx0XHRcdFx0cGxhY2VcdFx0LVx00L/QvtC80LXRidCw0LXQvCDQstC90YPRgtGA0Lgg0YbQtdC70LXQstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG5cdFx0XHRcdFx0cmVwbGFjZVx0XHQtXHTQt9Cw0LzQtdC90Y/QtdC8XG5cdFx0XHRcdFx0cGxhY2VBZnRlclx0LVx00L/QvtGB0LvQtVxuXHRcdFx0XHRcdHBsYWNlQmVmb3JlXHQtXHTQtNC+XG5cdFx0XHRcdFx0cGxhY2VGaXJzdFx0LVx00LLQvdGD0YLRgNC4INC/0LXRgNCy0YvQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0XHRcdFx0cGxhY2VMYXN0XHQtXHTQstC90YPRgtGA0Lgg0L/QvtGB0LvQtdC00L3QuNC8INC00L7Rh9C10YDQvdC40Lxcblx0XHR9XG5cdH1cbiovXG5jbGFzcyBub3RDb21wb25lbnQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHRcdHRoaXMub24oJ3JlYWR5JywgdGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCl7XG5cdFx0aWYgKHRoaXMub3duZXIpe1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLm93bmVyLmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fVxuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLm93bmVyID0gaW5wdXQub3duZXI/aW5wdXQub3duZXI6bnVsbDtcblx0XHR0aGlzLmluaXREYXRhKGlucHV0LmRhdGEgPyBpbnB1dC5kYXRhIDoge30pO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0RXZlbnRzKGlucHV0LmV2ZW50cyA/IGlucHV0LmV2ZW50cyA6IFtdKTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0RXZlbnRzKGxpc3Qpe1xuXHRcdGZvcihsZXQgdCBvZiBsaXN0KXtcblx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2lkJykpe1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdpZCcsIE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKXtcblx0XHRcdHRoaXMuaW5pdE1hcmtFbGVtZW50KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hcmtFbGVtZW50KCl7XG5cdFx0bGV0IG1hcmtFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ250Jyk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdudEVsJywgbWFya0VsKTtcblx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0cGxhY2VyLm1haW4odGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLCBbbWFya0VsXSk7XG5cdH1cblxuXHRpbml0V29ya2luZyh2YWwpIHtcblx0XHR0aGlzLnVuc2V0UmVhZHkodmFsKTtcblx0fVxuXG5cdHByZXBhcmVUZW1wbGF0ZUVsZW1lbnQodmFsKSB7XG5cdFx0aWYgKCF2YWwpIHtcblx0XHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdodG1sJykgJiYgdmFsLmh0bWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQodmFsLmVsLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZhbC5zcmMpIHtcblx0XHRcdG5vdFRlbXBsYXRlQ2FjaGUuZ2V0RnJvbVVSTCh2YWwuc3JjLCB2YWwuc3JjKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpICYmIHZhbC5uYW1lKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUuZ2V0KHZhbC5uYW1lKSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JywgY29udCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRyZXNldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50JywgdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpLmNsb25lTm9kZSh0cnVlKSk7XG5cdH1cblxuXHRzZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdHJ1ZSk7XG5cdH1cblxuXHR1bnNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCBmYWxzZSk7XG5cdH1cblxuXHRpc1JlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3JlYWR5Jyk7XG5cdH1cblxuXHRjbGVhclBhcnRzKCkge1xuXHRcdC8qINC40LfQstC10YnQsNC10Lwg0L7QsSDRg9C00LDQu9C10L3QuNC4INGN0LvQtdC80LXQvdGC0L7QsiAqL1xuXHRcdGlmICh0aGlzW01FVEFfUEFSVFNdICYmIEFycmF5LmlzQXJyYXkodGhpc1tNRVRBX1BBUlRTXSkgJiYgdGhpc1tNRVRBX1BBUlRTXS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpc1tNRVRBX1BBUlRTXSkge1xuXHRcdFx0XHRpZiAodC5kZXN0cm95KXtcblx0XHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdudEVsJykgJiYgdGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZSl7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKTtcblx0XHR9XG5cdH1cblxuXHRyZXNldFBhcnRzKCkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10gPSBbXTtcblx0fVxuXG5cdGdldFBhcnRzKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfUEFSVFNdO1xuXHR9XG5cblx0YWRkUGFydCh0ZW1wbGF0ZSkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10ucHVzaCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0dGhpcy5yZW1vdmVPYnNvbGV0ZVBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gdGFyZ2V0IGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRwbGFjZVBhcnQoZGF0YSwgaW5kZXgpe1xuXHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpLFxuXHRcdFx0bm9kZXMgPSBwYXJ0LmdldFN0YXNoKCksXG5cdFx0XHR0YXJnZXRFbCxcblx0XHRcdGxhc3ROb2RlLFxuXHRcdFx0cGxhY2VyO1xuXHRcdGlmIChpbmRleCA9PT0gMCl7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIoT1BUUy5ERUZBVUxUX1BMQUNFUl9MT09QKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScpO1xuXHRcdH1cblx0XHRwbGFjZXIubWFpbih0YXJnZXRFbCwgbm9kZXMpO1xuXG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRwbGFjZU5vZGVzKG5vZGVzKXtcblx0XHQvL25vdENvbW1vbi5sb2coJ3BsYWNlZCBwYXJ0Jywgbm9kZXMpO1xuXHR9XG5cblx0Z2V0UGxhY2VyKG1ldGhvZCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2VhcmNoaW5nIGZvciBwbGFjZXInLCBtZXRob2QpO1xuXHRcdGlmIChub3RQbGFjZXJzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW21ldGhvZF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW09QVFMuREVGQVVMVF9QTEFDRVJdO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hEYXRhKGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXREYXRhKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZ1bmModGhpcy5nZXREYXRhKCksIDApO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hQYXJ0KGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldFBhcnRzKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0UGFydHMoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHTQtdGB0LvQuCDRgSDQtNCw0L3QvdGL0LzQuCDQvdC1INGB0LLRj9C30LDQvSDRgNC10L3QtNC10YDQtdGAIC0g0YHQvtC30LTQsNC10Lxcblx0Ki9cblxuXHRyZW5kZXJQYXJ0KGRhdGEpIHtcblx0XHRpZiAoIXRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjcmVhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0bGV0IHJlbmRlcmVyID0gbmV3IG5vdFJlbmRlcmVyKHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dGVtcGxhdGU6IHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKSxcblx0XHRcdFx0Y29tcG9uZW50OiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdC8vcmVuZGVyZXIub24oJ29ic29sZXRlJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFkZFBhcnQocmVuZGVyZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCd1cGRhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0dGhpcy51cGRhdGVQYXJ0KHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlUGFydChwYXJ0KXtcblx0XHRwYXJ0LnVwZGF0ZSgpO1xuXHR9XG5cblx0cmVtb3ZlT2Jzb2xldGVQYXJ0cygpIHtcblx0XHQvL9C60L7QvdCy0LXQtdGAINC/0L7QuNGB0Log0LDQutGC0YPQsNC70YzQvdGL0YUgLSDRg9C00LDQu9C10L3QuNC1INC+0YHRgtCw0LvRjNC90YvRhVxuXHRcdG5vdENvbW1vbi5waXBlKFxuXHRcdFx0dW5kZWZpbmVkLCAvLyBwYXJ0cyB0byBzZWFyY2ggaW4sIGNhbiBiZSAndW5kZWZpbmVkJ1xuXHRcdFx0W1xuXHRcdFx0XHR0aGlzLmZpbmRBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL2ZpcnN0IHJvdW5kLCBzZWFyY2ggZm9yIG9ic29sZXRlXG5cdFx0XHRcdHRoaXMucmVtb3ZlTm90QWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9yZW1vdmUgJ2VtXG5cdFx0XHRdXG5cdFx0KTtcblx0fVxuXG5cdC8qXG5cdFx00LXRgdGC0Ywg0LTQsNC90L3Ri9C1INC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0LDQutGC0YPQsNC70YzQvdC+LFxuXHRcdNC90LXRgiDQtNCw0L3QvdGL0YUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDRgdGC0LDRgNGM0ZFcblx0Ki9cblxuXHRmaW5kQWN0dWFsUGFydHMoKSB7XG5cdFx0bGV0IGFjdHVhbFBhcnRzID0gW107XG5cdFx0dGhpcy5mb3JFYWNoRGF0YSgoZGF0YS8qLCBpbmRleCovKT0+e1xuXHRcdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSk7XG5cdFx0XHRpZiAocGFydCl7XG5cdFx0XHRcdGFjdHVhbFBhcnRzLnB1c2gocGFydCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGFjdHVhbFBhcnRzO1xuXHR9XG5cblx0Lypcblx0XHTRg9C00LDQu9GP0LXQvCDQstGB0LUg0LrRgNC+0LzQtSDQsNC60YLRg9Cw0LvRjNC90YvRhVxuXHQqL1xuXHRyZW1vdmVOb3RBY3R1YWxQYXJ0cyhhY3R1YWxQYXJ0cyl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAoYWN0dWFsUGFydHMuaW5kZXhPZih0aGlzLmdldFBhcnRzKClbdF0pID09PSAtMSl7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKVt0XS5kZXN0cm95KCk7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKS5zcGxpY2UodCwgMSk7XG5cdFx0XHRcdHQtLTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRQYXJ0QnlEYXRhKGRhdGEpIHtcblx0XHRmb3IgKGxldCB0IGluIHRoaXMuZ2V0UGFydHMoKSkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0UGFydHMoKVt0XS5pc0RhdGEoZGF0YSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UGFydHMoKVt0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbXBvbmVudDtcbiIsImltcG9ydCAgbm90Q29tcG9uZW50ICBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RGb3JtRmFjdG9yeSBleHRlbmRzIG5vdENvbXBvbmVudHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucyl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHt9KTtcblx0XHR0aGlzLm9uKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0KTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldCk7XG5cdFx0dGhpcy5vbignY2FuY2VsJywgdGhpcy5vbkNhbmNlbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKlxuXHRcdFJlbmRlcmluZ1xuXHQqL1xuXG5cdHJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHRcdHRoaXMucmVuZGVyQ29tcG9uZW50cygpO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpe1xuXG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCl7XG5cblx0fVxuXG5cdC8qXG5cdFx0RGF0YSBtYW5hZ2VtZW50XG5cdCovXG5cblx0Y29sbGVjdERhdGEoKXtcblxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCl7XG5cblx0fVxuXG5cdG9uUmVzZXQoKXtcblxuXHR9XG5cblx0b25DYW5jZWwoKXtcblxuXHR9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jbGFzcyBub3RWaWV3IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFRlbXBsYXRlT3B0aW9ucygpIHtcblx0XHR2YXIgZGVmYXVsdFJlc3VsdCA9IHt9O1xuXHRcdHJldHVybiAodHlwZW9mIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVPcHRpb25zJykgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVPcHRpb25zJykgIT09IG51bGwpID8gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZU9wdGlvbnMnKTogZGVmYXVsdFJlc3VsdDtcblx0fVxuXG5cdGdldFBsYWNlVG9QdXQoKSB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLmdldE9wdGlvbnMoJ3BsYWNlVG9QdXQnKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRPcHRpb25zKCdwbGFjZVRvUHV0JykgIT09IG51bGwpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3BsYWNlVG9QdXQnKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRvY3VtZW50LmJvZHk7XG5cdH1cblxuXHRnZXRBZnRlckV4ZWNDYWxsYmFjayhjYWxsYmFjaykge1xuXHRcdHZhciBkZWZhdWx0UmVzdWx0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdkZWZhdWx0IHZpZXcgYWZ0ZXIgZXhlYyBjYWxsYmFjaycpO1xuXHRcdH07XG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcgJiYgY2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHJldHVybiBjYWxsYmFjaztcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB0aGlzLmdldE9wdGlvbnMoJ2FmdGVyRXhlYycpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldE9wdGlvbnMoJ2FmdGVyRXhlYycpICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdhZnRlckV4ZWMnKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRlZmF1bHRSZXN1bHQ7XG5cdH1cblxuXHRleGVjKGNhbGxiYWNrKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBuZXcgbm90Q29tcG9uZW50KHRoaXMuZ2V0VGVtcGxhdGVPcHRpb25zKCkpKTtcblx0fTtcblxuXHRzZXRQYXJhbShuYW1lLCB2YWx1ZSkge1xuXHRcdHRoaXMuZ2V0T3B0aW9ucyhuYW1lLCB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRUZW1wbGF0ZVBhcmFtKG5hbWUsIHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdFBhdGguam9pbigndGVtcGxhdGVPcHRpb25zJyxuYW1lKSwgdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UGFyYW0obmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoKS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHRoaXMuZ2V0T3B0aW9ucyhuYW1lKSA6IHVuZGVmaW5lZDtcblx0fVxuXG5cdGdldFBhcmFtcygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90VmlldztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jbGFzcyBub3RDb250cm9sbGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGFwcCwgY29udHJvbGxlck5hbWUpIHtcblx0XHRzdXBlcigpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGNvbnRyb2xsZXInKTtcblx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHR0aGlzLm5jTmFtZSA9ICduYycgKyAoY29udHJvbGxlck5hbWUuY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKCkpO1xuXHRcdHRoaXMuY29udGFpbmVyU2VsZWN0b3IgPSAnLnBhZ2UtY29udGVudCc7XG5cdFx0dGhpcy52aWV3c1Bvc3RmaXggPSAnLmh0bWwnO1xuXHRcdHRoaXMucmVuZGVyRnJvbVVSTCA9IHRydWU7XG5cdFx0Lypcblx0XHQgICAg0YHRgNCw0LfRgyDQtNC10LvQsNC10Lwg0LTQvtGB0YLRg9C/0L3Ri9C80Lgg0LzQvtC00LXQu9C4IG5vdFJlY29yZCDQuNC3IG5jYENvbnRyb2xsZXJOYW1lYCDQsdGD0LTRg9GCINC00L7RgdGC0YPQv9C90Ysg0LrQsNC6IHRoaXMubnJgTW9kZWxOYW1lYFxuXHRcdCovXG5cdFx0dGhpcy5hcHAuZ2V0SW50ZXJmYWNlcygpLmZvckVhY2goKGluZGV4LCBpbnRlcmZhYzMpID0+IHtcblx0XHRcdGlmICh0eXBlb2YoKHdpbmRvd1t0aGlzLm5jTmFtZV0pKSAhPT0gJ3VuZGVmaW5lZCcpKHdpbmRvd1t0aGlzLm5jTmFtZV0pLnByb3RvdHlwZVtpbmRleF0gPSBpbnRlcmZhYzM7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQkcmVuZGVyKG5jIC8qIG5jTmFtZSBmdW5jdGlvbiB0aGlzKi8gLCBuYW1lIC8qIHZpZXcgbmFtZSAqLyAsIGRhdGEgLyogZGF0YSBmb3Igbm90VGVtcGxhdGUqLyAsIGhlbHBlcnMgLyogY291bGQgYmUgbm90IHJlcHJlc2VudGVkICovICwgY2FsbGJhY2spIHtcblx0XHR2YXIgdmlldyA9IG5jLnZpZXdzLmhhc093blByb3BlcnR5KG5hbWUpID8gbmMudmlld3NbbmFtZV0gOiBudWxsLFxuXHRcdFx0cmVhbENhbGxiYWNrLFxuXHRcdFx0cmVhbEhlbHBlcnM7XG5cdFx0aWYgKHR5cGVvZiB2aWV3ID09PSAndW5kZWZpbmVkJyB8fCB2aWV3ID09PSBudWxsKSByZXR1cm47XG5cdFx0Ly8g0LXRgdC70LggcGxhY2Ug0L3QtSDRg9C60LDQt9Cw0L3Qviwg0YfRgtC+INCy0L7Qt9C80L7QttC90L4g0Lgg0YDQsNC30YPQvNC90L4g0L/RgNC4INC90LUg0YHRg9GJ0LXRgdGC0LLQvtCy0LDQvdC40Lhcblx0XHQvLyDRjdC70LXQvNC10L3RgtCwLCDQvdC+INC40LfQstC10YHRgtC90L7QvCDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgNC1XG5cdFx0aWYgKCgodHlwZW9mIHZpZXcucGxhY2UgPT09ICd1bmRlZmluZWQnKSB8fCAodmlldy5wbGFjZSA9PT0gbnVsbCkpICYmICh0eXBlb2Ygdmlldy5wbGFjZUlkICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3LnBsYWNlSWQgIT09IG51bGwgJiYgdmlldy5wbGFjZUlkLmxlbmd0aCA+IDApKSB7XG5cdFx0XHR2aWV3LnBsYWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmlldy5wbGFjZUlkKTtcblx0XHR9XG5cdFx0Ly/QtdGB0LvQuCA0INCw0YDQs9GD0LzQtdC90YLQsCDQt9C90LDRh9C40YIsIGhlbHBlcnMgINC/0YDQvtC/0YPRgdGC0LjQu9C4XG5cdFx0c3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHQvL9C/0LXRgNC10L3QsNC30L3QsNGH0LDQtdC8INGB0L4g0YHQtNCy0LjQs9C+0Lxcblx0XHRcdGNhc2UgNDpcblx0XHRcdFx0cmVhbENhbGxiYWNrID0gaGVscGVycztcblx0XHRcdFx0cmVhbEhlbHBlcnMgPSB7fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdC8v0L/QtdGA0LXQvdCw0LfQvdCw0YfQsNC10Lwg0L3QsNC/0YDRj9C80YPRjlxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmVhbEhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdFx0XHRyZWFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHR9XG5cdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRpZiAodHlwZW9mIHZpZXcuaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5oZWxwZXJzICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHZpZXcuaGVscGVycykubGVuZ3RoID4gMCkge1xuXHRcdFx0dmlldy5oZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh2aWV3LmhlbHBlcnMsIHJlYWxIZWxwZXJzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmlldy5oZWxwZXJzID0gcmVhbEhlbHBlcnM7XG5cdFx0fVxuXHRcdC8v0LXRgdC70Lgg0L3Rg9C20L3QviDQt9Cw0LPRgNGD0LbQsNGC0Ywg0YjQsNCx0LvQvtC90Ytcblx0XHRpZiAobmMucmVuZGVyRnJvbVVSTCkge1xuXHRcdFx0Ly/QuCDQsNC00YDQtdGBINC90LUg0YPQutCw0LfQsNC9XG5cdFx0XHRpZiAodHlwZW9mIHZpZXcudGVtcGxhdGVVUkwgPT09ICd1bmRlZmluZWQnIHx8IHZpZXcudGVtcGxhdGVVUkwgPT0gbnVsbCB8fCB2aWV3LnRlbXBsYXRlVVJMLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdC8v0LPQtdC90LXRgNC40YDRg9C10Lwg0LDQtNGA0LXRgSDQv9C+INGI0LDQsdC70L7QvdGDXG5cdFx0XHRcdHZpZXcudGVtcGxhdGVVUkwgPSAodmlldy5jb21tb24gPyBuYy5jb21tb25WaWV3c1ByZWZpeCA6IG5jLnZpZXdzUHJlZml4KSArICgodHlwZW9mIHZpZXcubmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5uYW1lICE9PSBudWxsICYmIHZpZXcubmFtZS5sZW5ndGggPiAwKSA/IHZpZXcubmFtZSA6IG5hbWUpICsgbmMudmlld3NQb3N0Zml4O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvL9CwINC10YHQu9C4INC10YHRgtGMINC90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAsINGC0L5cblx0XHRcdGlmICh2aWV3Lmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU5hbWUnKSkge1xuXHRcdFx0XHQvLy4uLlxuXHRcdFx0XHR2aWV3LnRlbXBsYXRlTmFtZSA9IG5jLnZpZXdzUHJlZml4ICsgdmlldy50ZW1wbGF0ZU5hbWUgKyBuYy52aWV3c1Bvc3RmaXg7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdChuZXcgbm90Q29tcG9uZW50KHZpZXcpKS5leGVjQW5kUHV0KHZpZXcucGxhY2UsIHJlYWxDYWxsYmFjayk7XG5cdH1cblxuXHRleGVjKHBhcmFtcykge1xuXHRcdC8vY29uc29sZS5sb2coJ2V4ZWMnLCB0aGlzLCBPYmplY3Qua2V5cyh0aGlzLl9fcHJvdG9fXykpO1xuXHRcdGlmICh0eXBlb2YoKHdpbmRvd1t0aGlzLm5jTmFtZV0pKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdC8v0LjRidC10Lwg0LjQvNC10L3QsCDRgNCw0LfQtNC10LvRj9C10LzRi9GFINGE0YPQvdC60YbQuNC5XG5cdFx0XHR2YXIgc2hhcmVkTGlzdCA9IE9iamVjdC5rZXlzKHRoaXMuX19wcm90b19fKS5maWx0ZXIoZnVuY3Rpb24oa2V5KSB7XG5cdFx0XHRcdHJldHVybiAoa2V5LmluZGV4T2YoJyQnKSA9PT0gMCk7XG5cdFx0XHR9KTtcblx0XHRcdC8v0LfQsNC60LjQtNGL0LLQsNC10Lwg0LjRhSDQsiDQvdC+0LLRg9GOINGE0YPQvdC60YbQuNGOXG5cdFx0XHRpZiAoc2hhcmVkTGlzdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGsgaW4gc2hhcmVkTGlzdCkge1xuXHRcdFx0XHRcdHdpbmRvd1t0aGlzLm5jTmFtZV0ucHJvdG90eXBlW3NoYXJlZExpc3Rba11dID0gdGhpcy5fX3Byb3RvX19bc2hhcmVkTGlzdFtrXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG5ldyh3aW5kb3dbdGhpcy5uY05hbWVdKSh0aGlzLmFwcCwgcGFyYW1zKTtcblx0XHRcdC8vY29uc29sZS5sb2cobmV3KHdpbmRvd1t0aGlzLm5jTmFtZV0pKHRoaXMuYXBwLCBwYXJhbXMpKTtcblx0XHRcdC8vY29uc29sZS5sb2coJ2FmdGVyIG5ldyBjb250cm9sbGVyJyk7XG5cdFx0fSBlbHNlIHtcblxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb250cm9sbGVyO1xuIiwiLyogZ2xvYmFsIHJvdXRpZSAqL1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdEZvcm1GYWN0b3J5IGZyb20gJy4vY29tcG9uZW50cy9ub3RGb3JtRmFjdG9yeSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFZpZXcgZnJvbSAnLi9jb21wb25lbnRzL25vdFZpZXcnO1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi9ub3RDb250cm9sbGVyJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5cbmNvbnN0IE9QVF9DT05UUk9MTEVSX1BSRUZJWCA9ICduYycsXG5cdE9QVF9SRUNPUkRfUFJFRklYID0gJ25yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QXBwIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG5vdE1hbmlmZXN0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBhcHAnKTtcblx0XHR0aGlzLnNldE9wdGlvbnMobm90TWFuaWZlc3QpO1xuXHRcdHRoaXMucmVzb3VyY2VzID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGludGVyZmFjZXM6IHt9LFxuXHRcdFx0Y29udHJvbGxlcnM6IHt9LFxuXHRcdFx0aW5pdENvbnRyb2xsZXI6IG51bGwsXG5cdFx0XHRjdXJyZW50Q29udHJvbGxlcjogbnVsbCxcblx0XHRcdGZvcm1zOiB7fVxuXHRcdH0pO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHR2YXIgdXJsID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdFVSTCcpLFxuXHRcdFx0c3VjY2VzcyA9IHRoaXMuc2V0SW50ZXJmYWNlTWFuaWZlc3QuYmluZCh0aGlzKTtcblx0XHRub3RDb21tb24uZ2V0SlNPTih1cmwsIHt9KVxuXHRcdFx0LnRoZW4oc3VjY2Vzcylcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0LmJpbmQodGhpcykpO1xuXHR9XG5cblx0c2V0SW50ZXJmYWNlTWFuaWZlc3QobWFuaWZlc3QpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JywgbWFuaWZlc3QpO1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdC8v0L3Rg9C20L3QviDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0YLRjFxuXHRcdC8v0LzQvtC00LXQu9C4INC/0L7Qu9GD0YfQtdC90L3Ri9C80Lgg0LjQvdGC0LXRgNGE0LXQudGB0LDQvNC4XG5cdFx0dGhpcy51cGRhdGVJbnRlcmZhY2VzKCk7XG5cdFx0Ly/RgdC+0LfQtNCw0L3QuNC1INC+0LHRitC10LrRgtC+0LIg0LDQstGC0L7Qs9C10L3QtdGA0LDRhtC40Y8g0YTQvtGA0Lxcblx0XHR0aGlzLmluaXRGb3JtQnVpbGRlcnMoKTtcblx0XHQvL9C40L3QuNGG0LjQu9C40YbQuNGA0L7QstCw0YLRjCDQuCDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YAg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0XHR0aGlzLmluaXRDb250cm9sbGVyKCk7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXJ0QXBwKCkge1xuXHRcdC8v0YHQvtC30LTQsNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdC8v0YDQvtGD0YLQtdGAINC4INC/0YDQuNCy0Y/Qt9Cw0YLRjCDQuiDQvdC10LzRgyDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0dGhpcy5pbml0Um91dGVyKCk7XG5cdH1cblxuXHRiaW5kQ29udHJvbGxlcihjb250cm9sbGVyTmFtZSkge1xuXHRcdHZhciBjdHJsID0gbmV3IG5vdENvbnRyb2xsZXIodGhpcywgY29udHJvbGxlck5hbWUpO1xuXHRcdHJldHVybiBjdHJsLmV4ZWMuYmluZChjdHJsKTtcblx0fVxuXG5cdGluaXRDb250cm9sbGVyKCkge1xuXHRcdGlmICh0eXBlb2YodGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnaW5pdENvbnRyb2xsZXInLCBuZXcgbm90Q29udHJvbGxlcih0aGlzLCB0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJykpKTtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnaW5pdENvbnRyb2xsZXInKS5leGVjKCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdFJvdXRlcigpIHtcblx0XHR2YXIgcm91dGllSW5wdXQgPSB7fTtcblx0XHR0aGlzLmdldE9wdGlvbnMoJ3NpdGVNYW5pZmVzdCcpLmZvckVhY2goKHJvdXRlLCBjb250cm9sbGVyTmFtZSk9Pntcblx0XHRcdHJvdXRpZUlucHV0W3JvdXRlXSA9IHRoaXMuYmluZENvbnRyb2xsZXIoY29udHJvbGxlck5hbWUpO1xuXHRcdH0pO1xuXHRcdHRoaXMuc2V0V29ya2luZygncm91dGVyJywgcm91dGllKHJvdXRpZUlucHV0KSk7XG5cdH1cblxuXHRnZXRDdXJyZW50Q29udHJvbGxlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicpO1xuXHR9XG5cblx0c2V0Q3VycmVudENvbnRyb2xsZXIoY3RybCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInLCBjdHJsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHVwZGF0ZUludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5jbGVhckludGVyZmFjZXMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpKSB7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JykuZm9yRWFjaCh0aGlzLmluaXRJbnRlcmZhY2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0UmVjb3JkTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9SRUNPUkRfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldENvbnRyb2xsZXJOYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX0NPTlRST0xMRVJfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGluaXRJbnRlcmZhY2UoaW5kZXgsIG1hbmlmZXN0KSB7XG5cdFx0Ly9jb25zb2xlLmxvZyhpbmRleCwgbWFuaWZlc3QpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW3RoaXMuZ2V0UmVjb3JkTmFtZShpbmRleCldID0gbmV3IG5vdFJlY29yZChtYW5pZmVzdCk7XG5cdH1cblxuXHRucihtb2RlbE5hbWUsIGRhdGEpIHtcblx0XHR2YXIgbWFuaWZlc3QgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JykuaGFzT3duUHJvcGVydHkobW9kZWxOYW1lKSA/IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKVttb2RlbE5hbWVdIDoge307XG5cdFx0Ly9jb25zb2xlLmxvZyhtb2RlbE5hbWUsIG1hbmlmZXN0LCBkYXRhKTtcblx0XHRyZXR1cm4gbmV3IG5vdFJlY29yZChtYW5pZmVzdCwgZGF0YSk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKTtcblx0fVxuXG5cdGNsZWFySW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ludGVyZmFjZXMnLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0Rm9ybUJ1aWxkZXJzKCkge1xuXHRcdHRoaXMuY2xlYXJGb3JtQnVpbGRlcnMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmb3JtcycpKSB7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ2Zvcm1zJykuZm9yRWFjaCh0aGlzLmluaXRGb3JtQnVpbGRlci5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRpbml0Rm9ybUJ1aWxkZXIoaW5kZXgsIG1hbmlmZXN0KSB7XG5cdFx0bGV0IHBhdGggPSBub3RQYXRoLmpvaW4oJ2Zvcm1zJywgaW5kZXgpO1xuXHRcdHRoaXMuc2V0V29ya2luZyhwYXRoLCBuZXcgbm90Rm9ybUZhY3RvcnkodGhpcywgbWFuaWZlc3QpKTtcblx0XHR0aGlzLmdldFdvcmtpbmcocGF0aCkuaW5pdCh0aGlzLndhaXRUaGlzUmVzb3VyY2UoJ2Zvcm0nLCBpbmRleCkpO1xuXHR9XG5cblx0Z2V0Rm9ybUJ1aWxkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2Zvcm1zJyk7XG5cdH1cblxuXHRjbGVhckZvcm1CdWlsZGVycygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2Zvcm1zJywge30pO1xuXHR9XG5cblx0d2FpdFRoaXNSZXNvdXJjZSh0eXBlLCBpbmRleCkge1xuXHRcdGlmICghdGhpcy5yZXNvdXJjZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcblx0XHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdID0ge307XG5cdFx0fVxuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IGZhbHNlO1xuXHRcdHJldHVybiB0aGlzLm9uUmVzb3VyY2VSZWFkeS5iaW5kKHRoaXMsIHR5cGUsIGluZGV4KTtcblx0fVxuXG5cdG9uUmVzb3VyY2VSZWFkeSh0eXBlLCBpbmRleCkge1xuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IHRydWU7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdGFsbFJlc291cmNlc1JlYWR5KCkge1xuXHRcdHZhciBpLCBqO1xuXHRcdGZvciAoaSBpbiB0aGlzLnJlc291cmNlcykge1xuXHRcdFx0Zm9yIChqIGluIHRoaXMucmVzb3VyY2VzW2ldKSB7XG5cdFx0XHRcdGlmICghdGhpcy5yZXNvdXJjZXNbaV1bal0pIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxufVxuIiwiaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aC5qcyc7XG5cbnZhciBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgPSB7XG5cdGNvbnRlbnQ6ZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMuaW5kZXhPZignY2FwaXRhbGl6ZScpID4gLTEpe1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0LnRvVXBwZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQudGV4dENvbnRlbnQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQ7XG5cdH0sXG5cdGJpbmQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoc2NvcGUucGFyYW1zWzBdLCAoZSk9Pntcblx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KXtcblx0XHRcdFx0cmV0dXJuIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCh7c2NvcGUsIGl0ZW0sIGhlbHBlcnMsIGV9KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0dmFsdWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRsZXQgbGl2ZUV2ZW50cyA9IFsnY2hhbmdlJywgJ2tleXVwJ10sXG5cdFx0XHRvbkV2ZW50ID0gKCk9Pm5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSAhPT0gdHJ1ZSl7XG5cdFx0XHRmb3IobGV0IHQgb2YgbGl2ZUV2ZW50cyl7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0LCBvbkV2ZW50KTtcblx0XHRcdH1cblx0XHRcdHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0YXR0cjogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpP3Jlcyh7c2NvcGUsIGl0ZW0sIGhlbHBlcnN9KTpyZXMpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKHNjb3BlLnBhcmFtc1swXSwgc2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0fSxcblx0bmFtZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbigvKnNjb3BlLCBpdGVtLCBoZWxwZXJzKi8pe1xuXG5cdH0sXG5cdGNoZWNrZWQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJyk/cmVzdWx0KHtzY29wZSwgaXRlbSwgaGVscGVyc30pOnJlc3VsdCk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID8gc2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKSA6IHNjb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG5cdH0sXG5cdGNsYXNzOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpP3Jlcyh7c2NvcGUsIGl0ZW0sIGhlbHBlcnN9KTpyZXMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoIDwgMyB8fCBpc05hTihzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKXtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpe1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKXtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpe1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRsZXQgdXNlZCA9IGZhbHNlO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHNjb3BlLnBhcmFtcy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdGlmICggaSA9PT0gc2NvcGUuYXR0cmlidXRlUmVzdWx0KXtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0XHR1c2VkID0gdHJ1ZTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKCF1c2VkKXtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRvcHRpb25zOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBpID0gMCxcblx0XHRcdG9wdGlvbiA9IG51bGwsXG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9ICd2YWx1ZScsXG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9ICduYW1lJyxcblx0XHRcdHN1YkxpYiA9IHVuZGVmaW5lZCxcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkTmFtZScpID8gaGVscGVyc1snZmllbGROYW1lJ10gOiAndmFsdWUnO1xuXHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgaGVscGVycyAhPT0gbnVsbCAmJiBoZWxwZXJzLmhhc093blByb3BlcnR5KCdvcHRpb24nKSkge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBoZWxwZXJzLm9wdGlvbi5sYWJlbDtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gaGVscGVycy5vcHRpb24udmFsdWU7XG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMikge1xuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzJdO1xuXHRcdH1cblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDMgJiYgc2NvcGUucGFyYW1zWzNdID09PSAnZGlmZmVyZW50Jykge1xuXHRcdFx0c3ViTGliID0gdmFsdWVGaWVsZE5hbWU7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgaGVscGVycyAhPT0gbnVsbCAmJiBoZWxwZXJzLmhhc093blByb3BlcnR5KCdmaWVsZFBsYWNlSG9sZGVyJykgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGRQbGFjZUhvbGRlckRlZmF1bHQnKSAmJiBoZWxwZXJzLmZpZWxkUGxhY2VIb2xkZXJEZWZhdWx0KSB7XG5cdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJycpO1xuXHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gaGVscGVycy5maWVsZFBsYWNlSG9sZGVyO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdHZhciBsaWIgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdGlmICgvKmRpZmZlcmVudCAmJiovIHN1YkxpYiAmJiBsaWIuaGFzT3duUHJvcGVydHkoc3ViTGliKSkge1xuXHRcdFx0XHRsaWIgPSBsaWJbc3ViTGliXTtcblx0XHRcdH1cblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsaWIubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbGliW2ldW3ZhbHVlRmllbGROYW1lXSk7XG5cdFx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGxpYltpXVtsYWJlbEZpZWxkTmFtZV07XG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSkpIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdLmluZGV4T2YobGliW2ldW3ZhbHVlRmllbGROYW1lXSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSA9PT0gbGliW2ldW3ZhbHVlRmllbGROYW1lXSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufTtcbmV4cG9ydCBkZWZhdWx0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYjtcbiIsImltcG9ydCAgbm90Q29tcG9uZW50ICBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RGb3JtIGV4dGVuZHMgbm90Q29tcG9uZW50e1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe30pO1xuXHRcdHRoaXMub24oJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQpO1xuXHRcdHRoaXMub24oJ3Jlc2V0JywgdGhpcy5vblJlc2V0KTtcblx0XHR0aGlzLm9uKCdjYW5jZWwnLCB0aGlzLm9uQ2FuY2VsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qXG5cdFx0UmVuZGVyaW5nXG5cdCovXG5cblx0cmVuZGVyKCl7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdFx0dGhpcy5yZW5kZXJDb21wb25lbnRzKCk7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCl7XG5cblx0fVxuXG5cdHJlbmRlckNvbXBvbmVudHMoKXtcblxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHRjb2xsZWN0RGF0YSgpe1xuXG5cdH1cblxuXHQvKlxuXHRcdEV2ZW50IGhhbmRsZXJzXG5cdCovXG5cblx0b25TdWJtaXQoKXtcblxuXHR9XG5cblx0b25SZXNldCgpe1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpe1xuXG5cdH1cbn1cbiIsImltcG9ydCBub3RDb21wb25lbnQgIGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdFRhYmxlIGV4dGVuZHMgbm90Q29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cbiIsIi8qXG5cdENvbW1vbiBmdW5jdGlvbnNcbiovXG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbi8qXG5cdGZyYW1ld29yayB3aWRlIHBhcnNlciBmb3IgZGF0YSBhY2Nlc3NcbiovXG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcbi8qXG5cdGJhc2ljIGV2ZW50IGhhbmRsZXJzIGFuZCBjb3JlIGRhdGEgbW9kaWZpZXJzXG4qL1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbi8qXG5cdHNtYXJ0ZXIgaW1hZ2UgY29udHJvbFxuKi9cbmltcG9ydCBub3RJbWFnZSBmcm9tICcuL3RlbXBsYXRlL25vdEltYWdlJztcbi8qXG5cdGFwcGxpY2F0aW9uIG1haW4gaW5mcmFzdHJ1Y3R1cmUgc2V0dGVyXG4qL1xuaW1wb3J0IG5vdEFwcCBmcm9tICcuL25vdEFwcCc7XG4vKlxuXHRkYWRkeSBmb3IgdXNlciBjb250cm9sbGVyc1xuKi9cbmltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4vbm90Q29udHJvbGxlcic7XG4vKlxuXHR0ZW1wbGF0aW5nIGFuZCBjb21tb24gc3RydWN0dXJlc1xuKi9cblxuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vdGVtcGxhdGUvbm90UmVuZGVyZXInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JzsgLy8gc21hcnRlciB3aXRoIGJpbmRpbmdzIGZvciBldmVudHMsIGFjdHVhbHkgcHJveHlcblxuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi9jb21wb25lbnRzL25vdEZvcm0nO1xuaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4vY29tcG9uZW50cy9ub3RUYWJsZSc7XG5pbXBvcnQgbm90VmlldyBmcm9tICcuL2NvbXBvbmVudHMvbm90Vmlldyc7XG5cbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnOyAvL1x0aG93IHRvIGludGVyYWN0IHdpdGggZGF0YSBvbiBzZXJ2ZXJcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnOyAvL1x0d3JhcHBlciBmb3IgZGF0YSB3aXRoIHNlcnZlcjwtPnZpZXcgbGl2ZSBpbnRlcmFjdGlvbnNcblxubm90VGVtcGxhdGVQcm9jZXNzb3JzLmFkZChub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIpO1xuXG5leHBvcnQge1xuXHRub3RDb21tb24sXG5cdG5vdFBhdGgsXG5cdG5vdEJhc2UsXG5cdG5vdEltYWdlLFxuXHRub3RBcHAsXG5cdG5vdEFQSSxcblx0bm90Q29udHJvbGxlcixcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIsXG5cdG5vdFRlbXBsYXRlQ2FjaGUsXG5cdG5vdFJlbmRlcmVyLFxuXHRub3RDb21wb25lbnQsXG5cdG5vdEZvcm0sXG5cdG5vdFRhYmxlLFxuXHRub3RWaWV3LFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZ2V0U2Vzc2lvbklEIiwicmVzcG9uc2VUeXBlIiwid2l0aENyZWRlbnRpYWxzIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ0Iiwib25lcnJvciIsIm9udGltZW91dCIsInNlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwidGhhdCIsInBhcnNlSW50IiwicmVzcG9uc2VUZXh0IiwiZSIsIkNvbW1vbkxvZ3MiLCJsb2ciLCJhcmd1bWVudHMiLCJlcnJvciIsInRyYWNlIiwiTUFQX01BTkFHRVIiLCJTeW1ib2wiLCJDb21tb25TaG9ydHMiLCJnZXRNYW5hZ2VyIiwiZ2V0QVBJIiwidiIsIkNvbW1vbk9iamVjdHMiLCJkZWZhdWx0cyIsIm9wdGlvbnMiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0Iiwic291cmNlcyIsImZvckVhY2giLCJkZXNjcmlwdG9ycyIsImtleXMiLCJzb3VyY2UiLCJyZWR1Y2UiLCJrZXkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJkZXNjcmlwdG9yIiwic3ltIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJiaWciLCJzbWFsbCIsIm9iaiIsImZpbHRlciIsImNvbnRhaW5zT2JqIiwiaWNvbnMiLCJiYXRjaCIsImxlbmd0aCIsImdldERhdGEiLCJwdXNoIiwiYSIsImIiLCJwIiwiZXF1YWwiLCJ0b1N0cmluZyIsImRlZmF1bHRWYWx1ZSIsIm9iajEiLCJvYmoyIiwialF1ZXJ5IiwiZXh0ZW5kIiwidmFsIiwicmVnaXN0cnkiLCJDb21tb25TdHJpbmdzIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIm5vdENvbW1vbiIsImFzc2lnbiIsImV4dGVuZFdpdGgiLCJTVUJfUEFUSF9TVEFSVCIsIlNVQl9QQVRIX0VORCIsIlBBVEhfU1BMSVQiLCJQQVRIX1NUQVJUX09CSkVDVCIsIlBBVEhfU1RBUlRfSEVMUEVSUyIsIkZVTkNUSU9OX01BUktFUiIsIk1BWF9ERUVQIiwibm90UGF0aCIsInBhdGgiLCJzdWJQYXRoIiwiZmluZCIsInN1YiIsInBhcnNlZCIsInN1YmYiLCJyZXBsYWNlIiwiaXRlbSIsImhlbHBlcnMiLCJzdWJQYXRoUGFyc2VkIiwiZmluZE5leHRTdWJQYXRoIiwiZ2V0VmFsdWVCeVBhdGgiLCJyZXBsYWNlU3ViUGF0aCIsInBhcnNlU3VicyIsImF0dHJWYWx1ZSIsInNldFZhbHVlQnlQYXRoIiwiaXNSZWNvcmQiLCJub3JtaWxpemVQYXRoIiwidHJpZ2dlciIsInN0ZXAiLCJoZWxwZXIiLCJyU3RlcCIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsInNwbGl0IiwicGFyc2VQYXRoU3RlcCIsIm9iamVjdCIsImF0dHJQYXRoIiwiYXR0ck5hbWUiLCJzaGlmdCIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfRVZFTlRTIiwiTUVUQV9EQVRBIiwiTUVUQV9XT1JLSU5HIiwiTUVUQV9PUFRJT05TIiwibm90QmFzZSIsIndoYXQiLCJzZXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsIm5hbWUiLCJmcm9tIiwiZXZlbnROYW1lIiwiZXZlbnQiLCJvZmYiLCJjYWxsYmFja3MiLCJjYWxsYmFjayIsInRhcmdldElkIiwic3BsaWNlIiwibm90QVBJT3B0aW9ucyIsIm5vdEFQSVF1ZWUiLCJyZXF1ZXN0c1BlclNlY29uZCIsInF1ZWUiLCJpbnQiLCJ3aW5kb3ciLCJzZXRJbnRlcnZhbCIsImNoZWNrIiwiYmluZCIsImluUHJvZ3Jlc3MiLCJ0b0NhbGwiLCJjbGVhckludGVydmFsIiwicnVuIiwibm90QVBJIiwic2V0T3B0aW9ucyIsInBhcnRzIiwiaWQiLCJnb29kIiwiYmFkIiwiYWRkIiwibWFrZVJlcXVlc3QiLCJyZXNwb25zZU9LIiwicmVzcG9uc2VGYWlsZWQiLCJyZXF1ZXN0SlNPTiIsInRoZW4iLCJuZXh0IiwiY2F0Y2giLCJjb2RlIiwiZ2V0SWQiLCJtb2RlbE5hbWUiLCJnZXRNb2RlbE5hbWUiLCJtYWtlVXJsIiwiZ2V0SlNPTiIsImdldE1vZGVsIiwic2V0UHJpY2UiLCJtb2RlbCIsIm5vdEltYWdlIiwibm90SW50ZXJmYWNlIiwibWFuaWZlc3QiLCJsaW5lIiwicmVjb3JkIiwiYWN0aW9uTmFtZSIsInJlY29yZFJFIiwiZmllbGROYW1lIiwiaW5kIiwibGVuIiwiaW5kMiIsInN0YXJ0U2xpY2UiLCJlbmRTbGljZSIsImdldEF0dHIiLCJhY3Rpb25EYXRhIiwicGFyc2VMaW5lIiwicG9zdEZpeCIsImdldEFjdGlvbnMiLCJhY3Rpb25zIiwidmFsdWUiLCJzZXRGaWx0ZXIiLCJmaWx0ZXJEYXRhIiwic2V0TW9kZWxQYXJhbSIsImdldE1vZGVsUGFyYW0iLCJzb3J0ZXJEYXRhIiwicGFnZU51bWJlciIsInBhZ2VTaXplIiwicGFyYW1OYW1lIiwicGFyYW1WYWx1ZSIsImdldEFjdGlvbkRhdGEiLCJnZXRVUkwiLCJxdWVlUmVxdWVzdCIsIm9uTG9hZCIsIm5vdFJlY29yZCIsIk1FVEFfSU5URVJGQUNFIiwiTUVUQV9QUk9YWSIsIk1FVEFfQ0hBTkdFIiwiTUVUQV9DSEFOR0VfTkVTVEVEIiwiTUVUQV9TQUwiLCJERUZBVUxUX0FDVElPTl9QUkVGSVgiLCJERUZBVUxUX1BBR0VfTlVNQkVSIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJNRVRBX1JFVFVSTl9UT19ST09UIiwiY3JlYXRlUHJvcGVydHlIYW5kbGVycyIsIm93bmVyIiwiY29udGV4dCIsInJlc1RhcmdldCIsIlJlZmxlY3QiLCJFcnJvciIsInZhbHVlVG9SZWZsZWN0Iiwibm90UHJvcGVydHkiLCJnZXRSb290IiwicGF0aFRvIiwiaXNQcm94eSIsIlByb3h5Iiwic2V0RGF0YSIsIm9uIiwicHJveHkiLCJyb290IiwiY3JlYXRlUmVjb3JkSGFuZGxlcnMiLCJjcmVhdGVDb2xsZWN0aW9uIiwibm90UmVjb3JkSW50ZXJmYWNlIiwiaW5pdFByb3BlcnRpZXMiLCJpbnRlcmZhY2VVcCIsImN1clBhdGgiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiaXRlbXMiLCJjb2xsZWN0aW9uIiwiZ2V0QWN0aW9uc0NvdW50IiwiYWN0aW9uVXAiLCJpbmRleCIsInJlcXVlc3QiLCJvYmplY3RQYXJ0Iiwic2V0QXR0ciIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCIsIlRFTVBMQVRFX1RBRyIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYIiwiQ09NUE9ORU5UX0lEX1BSRUZJWCIsIlBBUlRfSURfUFJFRklYIiwiREVGQVVMVF9QTEFDRVIiLCJERUZBVUxUX1BMQUNFUl9MT09QIiwiT1BUUyIsIk1FVEFfQ0FDSEUiLCJub3RUZW1wbGF0ZUNhY2hlIiwic2V0V29ya2luZyIsImhpZGVUZW1wbGF0ZXMiLCJyZWdpc3RlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1hcCIsImxvYWRPbmUiLCJvUmVxdWVzdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXYiLCJkYXRhc2V0Iiwibm90VGVtcGxhdGVOYW1lIiwibm90VGVtcGxhdGVVUkwiLCJzcmNFbGVtZW50Iiwic2V0T25lIiwiZWxlbWVudCIsImNsb25lTm9kZSIsImNvbnQiLCJ0ZXh0Iiwibm90VGVtcGxhdGVzRWxlbWVudHMiLCJlbElkIiwicGFyZW50Tm9kZSIsImxpYiIsImdldEhUTUwiLCJ0ZW1wbGF0ZUlubmVySFRNTCIsInRlbXBsYXRlQ29udEVsIiwid3JhcCIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJNRVRBX1BST0NFU1NPUlMiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnMiLCJzZXRQcm9jZXNzb3IiLCJnZXRQcm9jZXNzb3IiLCJNRVRBX0NPTVBPTkVOVFMiLCJub3RSZW5kZXJlciIsImlucHV0IiwiaW5pdCIsInJlbmRlciIsImNvbXBvbmVudCIsImluaXREYXRhIiwiaW5pdE9wdGlvbnMiLCJpbml0V29ya2luZyIsInRlbXBsYXRlIiwiaW5pdFRlbXBsYXRlIiwib25DaGFuZ2UiLCJNYXRoIiwicmFuZG9tIiwiZ2V0QnJlYWRDcnVtcHMiLCJ1cGRhdGUiLCJjbGVhclN0YXNoIiwic2V0V29ya2luZ01hcHBpbmciLCJleGVjUHJvY2Vzc29ycyIsInNlYXJjaEZvclN1YlRlbXBsYXRlcyIsInN0YXNoUmVuZGVyZWQiLCJpZlBhcnQiLCJjb21wb25lbnRQYXRoIiwiY2hhbmdlZFBhdGgiLCJpZkZ1bGxTdWJQYXRoIiwiY3JlYXRlTWFwcGluZyIsImZpbmRBbGxQcm9jZXNzb3JzIiwicHJvY3MiLCJlbHMiLCJnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCIsImdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQiLCJwcm9jRGF0YSIsInBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbiIsInByb2Nlc3NvckV4cHJlc3Npb24iLCJhdHRyaWJ1dGVFeHByZXNzaW9uIiwiaWZDb25kaXRpb24iLCJwYXJhbXMiLCJwcm9jZXNzb3JOYW1lIiwibWFwcGluZyIsInByb2NTY29wZSIsImF0dHJpYnV0ZVJlc3VsdCIsImdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQiLCJwcm9jTmFtZSIsInByb2MiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkZXN0cm95U3VicyIsImRlc3Ryb3kiLCJjbGVhclN1YlRlbXBsYXRlcyIsImdldFN0YXNoIiwicmVtb3ZlQ2hpbGQiLCJudEVsIiwibnRSZW5kZXJlZCIsInN1YnMiLCJudCIsImlmU3ViRWxlbWVudFJlbmRlcmVkIiwicmVuZGVyU3ViIiwiZGV0YWlscyIsImRhdGFQYXRoIiwibm90Q29tcG9uZW50IiwiY2hpbGROb2RlcyIsImFkZFRvU3Rhc2giLCJzdGFzaCIsIm5ld1N0YXNoIiwiYW5jaG9yIiwibmV4dFNpYmxpbmciLCJpbnNlcnRCZWZvcmUiLCJub2RlIiwicGxhY2UiLCJ0YXJnZXRFbCIsImNoaWxkcmVuIiwicmVuZGVyZWQiLCJwbGFjZUFmdGVyIiwicGxhY2VCZWZvcmUiLCJwbGFjZUZpcnN0IiwicGxhY2VMYXN0Iiwibm90UGxhY2VycyIsIk1FVEFfUEFSVFMiLCJyZXNldFBhcnRzIiwiaW5pdEV2ZW50cyIsImV2ZW50cyIsInByZXBhcmVUZW1wbGF0ZUVsZW1lbnQiLCJpbml0TWFya0VsZW1lbnQiLCJtYXJrRWwiLCJwbGFjZXIiLCJnZXRQbGFjZXIiLCJtYWluIiwidW5zZXRSZWFkeSIsImh0bWwiLCJzZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImdldEZyb21VUkwiLCJyZXBvcnQiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImNsZWFyUGFydHMiLCJmb3JFYWNoRGF0YSIsInJlbmRlclBhcnQiLCJwbGFjZVJlbmRlcmVkIiwicmVtb3ZlT2Jzb2xldGVQYXJ0cyIsInBsYWNlUGFydCIsInBhcnQiLCJnZXRQYXJ0QnlEYXRhIiwibm9kZXMiLCJsYXN0Tm9kZSIsIm5vZGVUeXBlIiwiZ2V0UGFydHMiLCJyZW5kZXJlciIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUiLCJhZGRQYXJ0IiwidXBkYXRlUGFydCIsInBpcGUiLCJmaW5kQWN0dWFsUGFydHMiLCJyZW1vdmVOb3RBY3R1YWxQYXJ0cyIsImFjdHVhbFBhcnRzIiwiaXNEYXRhIiwibm90Rm9ybUZhY3RvcnkiLCJvblN1Ym1pdCIsIm9uUmVzZXQiLCJvbkNhbmNlbCIsInJlbmRlcldyYXBwZXIiLCJyZW5kZXJDb21wb25lbnRzIiwibm90VmlldyIsImRlZmF1bHRSZXN1bHQiLCJib2R5IiwiZ2V0VGVtcGxhdGVPcHRpb25zIiwibm90Q29udHJvbGxlciIsImFwcCIsImNvbnRyb2xsZXJOYW1lIiwibmNOYW1lIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwiY29udGFpbmVyU2VsZWN0b3IiLCJ2aWV3c1Bvc3RmaXgiLCJyZW5kZXJGcm9tVVJMIiwiZ2V0SW50ZXJmYWNlcyIsImludGVyZmFjMyIsIm5jIiwidmlldyIsInZpZXdzIiwicmVhbENhbGxiYWNrIiwicmVhbEhlbHBlcnMiLCJwbGFjZUlkIiwiZ2V0RWxlbWVudEJ5SWQiLCJ0ZW1wbGF0ZVVSTCIsImNvbW1vbiIsImNvbW1vblZpZXdzUHJlZml4Iiwidmlld3NQcmVmaXgiLCJ0ZW1wbGF0ZU5hbWUiLCJleGVjQW5kUHV0Iiwic2hhcmVkTGlzdCIsIl9fcHJvdG9fXyIsImsiLCJPUFRfQ09OVFJPTExFUl9QUkVGSVgiLCJPUFRfUkVDT1JEX1BSRUZJWCIsIm5vdEFwcCIsIm5vdE1hbmlmZXN0IiwicmVzb3VyY2VzIiwic3VjY2VzcyIsInNldEludGVyZmFjZU1hbmlmZXN0IiwidXBkYXRlSW50ZXJmYWNlcyIsImluaXRGb3JtQnVpbGRlcnMiLCJpbml0Q29udHJvbGxlciIsImFsbFJlc291cmNlc1JlYWR5Iiwic3RhcnRBcHAiLCJpbml0Um91dGVyIiwiY3RybCIsImV4ZWMiLCJyb3V0aWVJbnB1dCIsInJvdXRlIiwiYmluZENvbnRyb2xsZXIiLCJyb3V0aWUiLCJjbGVhckludGVyZmFjZXMiLCJpbml0SW50ZXJmYWNlIiwiZ2V0UmVjb3JkTmFtZSIsImNsZWFyRm9ybUJ1aWxkZXJzIiwiaW5pdEZvcm1CdWlsZGVyIiwid2FpdFRoaXNSZXNvdXJjZSIsInR5cGUiLCJvblJlc291cmNlUmVhZHkiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIiLCJzY29wZSIsInRleHRDb250ZW50Iiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJsaXZlRXZlbnRzIiwib25FdmVudCIsInByb2Nlc3NlZFZhbHVlIiwiaXNOYU4iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ1c2VkIiwib3B0aW9uIiwidmFsdWVGaWVsZE5hbWUiLCJsYWJlbEZpZWxkTmFtZSIsInN1YkxpYiIsIml0ZW1WYWx1ZUZpZWxkTmFtZSIsImxhYmVsIiwiZmllbGRQbGFjZUhvbGRlckRlZmF1bHQiLCJmaWVsZFBsYWNlSG9sZGVyIiwibm90Rm9ybSIsIm5vdFRhYmxlIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxnQkFBZ0I7VUFDVixpQkFBU0MsR0FBVCxFQUFhO1NBQ2QsS0FBS0MsR0FBTCxDQUFTLE1BQVQsSUFBbUJELEdBQTFCO0VBRmtCO2NBSU4scUJBQVNBLEdBQVQsRUFBYTtTQUNsQixLQUFLQyxHQUFMLENBQVMsVUFBVCxJQUF1QkQsR0FBOUI7RUFMa0I7Z0JBT0osdUJBQVNFLFNBQVQsRUFBb0JDLE1BQXBCLEVBQTRCO09BQ3RDLElBQUlDLENBQVIsSUFBYUYsU0FBYixFQUF3QjtRQUNuQixJQUFJRyxDQUFSLElBQWFGLE1BQWIsRUFBcUI7UUFDakJELFVBQVVFLENBQVYsRUFBYUUsY0FBYixDQUE0QkgsT0FBT0UsQ0FBUCxDQUE1QixDQUFILEVBQTJDO1NBQ3RDRSxRQUFRLElBQUlDLEtBQUosRUFBWjtXQUNNQyxZQUFOLENBQW1CLGFBQW5CLEVBQWtDLFdBQWxDO1dBQ01DLEdBQU4sR0FBWVIsVUFBVUUsQ0FBVixFQUFhRCxPQUFPRSxDQUFQLENBQWIsRUFBd0JNLE9BQXhCLENBQWdDLElBQWhDLE1BQTBDLENBQTFDLEdBQThDLEtBQUtDLFdBQUwsQ0FBaUJWLFVBQVVFLENBQVYsRUFBYUQsT0FBT0UsQ0FBUCxDQUFiLENBQWpCLENBQTlDLEdBQTBGSCxVQUFVRSxDQUFWLEVBQWFELE9BQU9FLENBQVAsQ0FBYixDQUF0Rzs7OztFQWJlO2NBa0JOLHFCQUFTUSxNQUFULEVBQWlCQyxHQUFqQixFQUFzQkMsSUFBdEIsRUFBMkI7OztTQUNoQyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO09BQ25DQyxNQUFNLElBQUlD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
