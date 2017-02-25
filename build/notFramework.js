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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9pbmRleC5qcyIsIi4uL3NyYy9ub3RQYXRoLmpzIiwiLi4vc3JjL25vdEJhc2UuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy9ub3RSZWNvcmRJbnRlcmZhY2UuanMiLCIuLi9zcmMvbm90UmVjb3JkLmpzIiwiLi4vc3JjL3RlbXBsYXRlL29wdGlvbnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90UmVuZGVyZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlQWZ0ZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUJlZm9yZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlRmlyc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUxhc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9yZXBsYWNlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvaW5kZXguanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90Q29tcG9uZW50LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybUZhY3RvcnkuanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RWaWV3LmpzIiwiLi4vc3JjL25vdENvbnRyb2xsZXIuanMiLCIuLi9zcmMvbm90QXBwLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdEZvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29tbW9uTmV0d29yayA9IHtcblx0YWRkSG9zdDogZnVuY3Rpb24odXJpKXtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ2hvc3QnKSArIHVyaTtcblx0fSxcblx0YWRkUHJvdG9jb2w6IGZ1bmN0aW9uKHVyaSl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvcih2YXIgaSBpbiBkYXRhQXJyYXkpIHtcblx0XHRcdGZvcih2YXIgZiBpbiBmaWVsZHMpIHtcblx0XHRcdFx0aWYoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRsZXQgdGhhdCA9IHRoaXM7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUFVUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpPT57XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAocGFyc2VJbnQoc3RhdHVzKSA9PT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKGUpID0+IHJlamVjdChlKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRTZXNzaW9uSUQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAnJztcblx0fSxcbn07XG5leHBvcnQgZGVmYXVsdCBDb21tb25OZXR3b3JrO1xuIiwidmFyIENvbW1vbkxvZ3MgPSB7XG5cdGRlYnVnOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZyguLi5hcmd1bWVudHMpO1xuXHR9LFxuXHRsb2c6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGVycm9yOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHJlcG9ydDogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5lcnJvciguLi5hcmd1bWVudHMpO1xuXHR9LFxuXHR0cmFjZTogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS50cmFjZSguLi5hcmd1bWVudHMpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTG9ncztcbiIsImNvbnN0IE1BUF9NQU5BR0VSID0gU3ltYm9sKCdNQVBfTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFQX01BTkFHRVJdID0gdjtcblx0fSxcblx0Z2V0TWFuYWdlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUFQX01BTkFHRVJdO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU2hvcnRzO1xuIiwiLyogZ2xvYmFsIGpRdWVyeSAqL1xudmFyIENvbW1vbk9iamVjdHMgPSB7XG5cdGV4dGVuZDogZnVuY3Rpb24oZGVmYXVsdHMsIG9wdGlvbnMpIHtcblx0XHR2YXIgZXh0ZW5kZWQgPSB7fTtcblx0XHR2YXIgcHJvcDtcblx0XHRmb3IgKHByb3AgaW4gZGVmYXVsdHMpIHtcblx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGVmYXVsdHMsIHByb3ApKSB7XG5cdFx0XHRcdGV4dGVuZGVkW3Byb3BdID0gZGVmYXVsdHNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsIHByb3ApKSB7XG5cdFx0XHRcdGV4dGVuZGVkW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGV4dGVuZGVkO1xuXHR9LFxuXHRjb21wbGV0ZUFzc2lnbjogZnVuY3Rpb24odGFyZ2V0LCAuLi5zb3VyY2VzKSB7XG5cdFx0c291cmNlcy5mb3JFYWNoKHNvdXJjZSA9PiB7XG5cdFx0XHRsZXQgZGVzY3JpcHRvcnMgPSBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZSgoZGVzY3JpcHRvcnMsIGtleSkgPT4ge1xuXHRcdFx0XHRkZXNjcmlwdG9yc1trZXldID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSk7XG5cdFx0XHRcdHJldHVybiBkZXNjcmlwdG9ycztcblx0XHRcdH0sIHt9KTtcblx0XHRcdC8vIGJ5IGRlZmF1bHQsIE9iamVjdC5hc3NpZ24gY29waWVzIGVudW1lcmFibGUgU3ltYm9scyB0b29cblx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5mb3JFYWNoKHN5bSA9PiB7XG5cdFx0XHRcdGxldCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSk7XG5cdFx0XHRcdGlmIChkZXNjcmlwdG9yLmVudW1lcmFibGUpIHtcblx0XHRcdFx0XHRkZXNjcmlwdG9yc1tzeW1dID0gZGVzY3JpcHRvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIGRlc2NyaXB0b3JzKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9LFxuXHRleHRlbmRXaXRoOiBmdW5jdGlvbihvcHRpb25zKXtcblx0XHRmb3IgKGxldCBwcm9wIGluIG9wdGlvbnMpIHtcblx0XHRcdGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KHByb3ApKSB7XG5cdFx0XHRcdHRoaXNbcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRjb250YWluc09iajogZnVuY3Rpb24oYmlnLCBzbWFsbCkge1xuXHRcdGZvciAodmFyIHQgaW4gc21hbGwpIHtcblx0XHRcdGlmIChzbWFsbC5oYXNPd25Qcm9wZXJ0eSh0KSkge1xuXHRcdFx0XHRpZiAoKCFiaWcuaGFzT3duUHJvcGVydHkodCkpIHx8IChiaWdbdF0gIT09IHNtYWxsW3RdKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmlsdGVyOiBmdW5jdGlvbihvYmosIGZpbHRlcikge1xuXHRcdGlmIChmaWx0ZXIgJiYgb2JqKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jb250YWluc09iaihvYmosIGZpbHRlcik7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRmaW5kSWNvbkJ5RmlsdGVyOiBmdW5jdGlvbihpY29ucywgZmlsdGVyKSB7XG5cdFx0dmFyIGJhdGNoID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpY29ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKHRoaXMuZmlsdGVyKGljb25zW2ldLmdldERhdGEoKSwgZmlsdGVyKSkge1xuXHRcdFx0XHRiYXRjaC5wdXNoKGljb25zW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGJhdGNoO1xuXHR9LFxuXHRlcXVhbE9iajogZnVuY3Rpb24oYSwgYikge1xuXHRcdHZhciBwO1xuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChwIGluIGEpIHtcblx0XHRcdGlmIChhW3BdKSB7XG5cdFx0XHRcdHN3aXRjaCAodHlwZW9mKGFbcF0pKSB7XG5cdFx0XHRcdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoIXRoaXMuZXF1YWwoYVtwXSwgYltwXSkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoYVtwXSAhPSBiW3BdKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChiW3BdKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKHAgaW4gYikge1xuXHRcdFx0aWYgKHR5cGVvZihhW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXHRkZWZpbmVJZk5vdEV4aXN0czogZnVuY3Rpb24ob2JqLCBrZXksIGRlZmF1bHRWYWx1ZSkge1xuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdG9ialtrZXldID0gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fSxcblx0ZGVlcE1lcmdlOiBmdW5jdGlvbihvYmoxLCBvYmoyKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIG9iajEsIG9iajIpO1xuXHR9LFxuXG5cdHJlZ2lzdHJ5OiB7fSxcblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbk9iamVjdHM7XG4iLCJ2YXIgQ29tbW9uU3RyaW5ncyA9IHtcblx0Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHN0cmluZykge1xuXHRcdHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG5cdH0sXG5cdGxvd2VyRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblN0cmluZ3M7XG4iLCJ2YXIgQ29tbW9uRnVuY3Rpb25zID0ge1xuXHRwaXBlOiBmdW5jdGlvbihkYXRhLyogZmVlZCBkYXRhICovLCBmdW5jcy8qIGZ1bmN0aW9ucyBhcnJheSAqLykge1xuXHRcdGxldCByZXN1bHQ7XG5cdFx0Zm9yKGxldCBmdW5jIG9mIGZ1bmNzKXtcblx0XHRcdHJlc3VsdCA9IGZ1bmMocmVzdWx0IHx8IGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRnVuY3Rpb25zO1xuIiwidmFyIENvbW1vbkRPTSA9IHtcblx0Z2V0QXR0cmlidXRlc1N0YXJ0c1dpdGg6IGZ1bmN0aW9uKGVsLCBzdGFydHNXaXRoKSB7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihzdGFydHNXaXRoKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwiaW1wb3J0IENvbW1vbk5ldHdvcmsgZnJvbSAnLi9uZXQuanMnO1xuaW1wb3J0IENvbW1vbkxvZ3MgZnJvbSAnLi9sb2dzLmpzJztcbmltcG9ydCBDb21tb25TaG9ydHMgZnJvbSAnLi9zaG9ydHMuanMnO1xuaW1wb3J0IENvbW1vbk9iamVjdHMgZnJvbSAnLi9vYmplY3RzLmpzJztcbmltcG9ydCBDb21tb25TdHJpbmdzIGZyb20gJy4vc3RyaW5ncy5qcyc7XG5pbXBvcnQgQ29tbW9uRnVuY3Rpb25zIGZyb20gJy4vZnVuY3Rpb25zLmpzJztcbmltcG9ydCBDb21tb25ET00gZnJvbSAnLi9kb20uanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tbW9uO1xuIiwiLypcblx0OnByb3BlcnR5LnN1YjEuZnVuYygpLmZ1bmNQcm9wXG5cdCA9IHJldHVybiBmdW5jUHJvcCBvZiBmdW5jdGlvbiByZXN1bHQgb2Ygc3ViMSBwcm9wZXJ0eSBvZiBwcm9wZXJ0eSBvZiBvYmplY3Rcblx0Ons6OmhlbHBlclZhbH0uc3ViXG5cdCA9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgcHJvcGVydHkgb2YgaGVscGVycyBvYmplY3Rcblx0Ons6OmhlbHBlckZ1bmMoKX0uc3ViXG5cdD0gcmV0dXJuIHN1YiBwcm9wZXJ0eSBvZiBvYmplY3QgcHJvcGVydHkgd2l0aCBuYW1lIHJldHJpZXZlZCBmcm9tIGhlbHBlclZhbCBmdW5jdGlvbiByZXN1bHQgb2YgaGVscGVycyBvYmplY3QuXG5cdGlmIGhlbHBlcnNGdW54IHJldHVybiAnY2FyJyB0aGVuIHNvdXJjZSBwYXRoIGJlY29tZXMgOmNhci5zdWJcblxuKi9cblxuY29uc3QgU1VCX1BBVEhfU1RBUlQgPSAneycsXG5cdFNVQl9QQVRIX0VORCA9ICd9Jyxcblx0UEFUSF9TUExJVCA9ICcuJyxcblx0UEFUSF9TVEFSVF9PQkpFQ1QgPSAnOicsXG5cdFBBVEhfU1RBUlRfSEVMUEVSUyA9ICc6OicsXG5cdEZVTkNUSU9OX01BUktFUiA9ICcoKScsXG5cdE1BWF9ERUVQID0gMTA7XG5cbmNsYXNzIG5vdFBhdGh7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Lypcblx0XHRpbnB1dCAnOns6OmhlbHBlclZhbH0uc3ViJ1xuXHRcdHJldHVybiA6OmhlbHBlclZhbFxuXHQqL1xuXHRmaW5kTmV4dFN1YlBhdGgocGF0aC8qIHN0cmluZyAqLyl7XG5cdFx0bGV0IHN1YlBhdGggPSAnJyxcblx0XHRcdGZpbmQgPSBmYWxzZTtcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRpZiAocGF0aFtpXSA9PT0gU1VCX1BBVEhfU1RBUlQpe1xuXHRcdFx0XHRmaW5kID0gdHJ1ZTtcblx0XHRcdFx0c3ViUGF0aCA9ICcnO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKHBhdGhbaV0gPT09IFNVQl9QQVRIX0VORCAmJiBmaW5kKXtcblx0XHRcdFx0XHRpZiAoZmluZCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHN1YlBhdGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRzdWJQYXRoKz1wYXRoW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmaW5kP3N1YlBhdGg6bnVsbDtcblx0fVxuXG5cdHJlcGxhY2VTdWJQYXRoKHBhdGgsIHN1YiwgcGFyc2VkKXtcblx0XHRsZXQgc3ViZiA9IFNVQl9QQVRIX1NUQVJUK3N1YitTVUJfUEFUSF9FTkQ7XG5cdFx0d2hpbGUocGF0aC5pbmRleE9mKHN1YmYpID4gLTEpe1xuXHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShzdWJmLCBwYXJzZWQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdHBhcnNlU3VicyhwYXRoLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cblxuXHRwYXJzZVBhdGhTdGVwKHN0ZXAsIGl0ZW0sIGhlbHBlcil7XG5cdFx0bGV0IHJTdGVwID0gbnVsbDtcblx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKSA9PT0gMCAmJiBoZWxwZXIpe1xuXHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9IRUxQRVJTLCAnJyk7XG5cdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdGlmKGhlbHBlci5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPT09IDAgJiYgaXRlbSl7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCAnJyk7XG5cdFx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRcdGlmKGl0ZW0uaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBzdGVwO1xuXHR9XG5cblx0Ly86OmZpZWxkTmFtZS5yZXN1bHRcblx0Ly97fVxuXHQvL3tmaWVsZE5hbWU6ICd0YXJnZXRSZWNvcmRGaWVsZCd9XG5cdC8vLy9bJ3RhcmdldFJlY29yZEZpZWxkJywgJ3Jlc3VsdCddXG5cdHBhcnNlUGF0aChwYXRoLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRwYXRoID0gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0cGF0aFtpXSA9IHRoaXMucGFyc2VQYXRoU3RlcChwYXRoW2ldLCBpdGVtLCBoZWxwZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fVxuXG5cdG5vcm1pbGl6ZVBhdGgocGF0aCl7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cmV0dXJuIHBhdGg7XG5cdFx0fWVsc2V7XG5cdFx0XHR3aGlsZShwYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID4gLTEpe1xuXHRcdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKFBBVEhfU1RBUlRfT0JKRUNULCcnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0c21hbGwgPSBbXCJ0b2RvXCJdLFxuXHRcdGJpZyA9IFtcInRvZG9cIiwgXCJsZW5ndGhcIl1cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHQqL1xuXG5cdGlmRnVsbFN1YlBhdGgoYmlnLCBzbWFsbCl7XG5cdFx0aWYgKGJpZy5sZW5ndGg8c21hbGwubGVuZ3RoKXtyZXR1cm4gZmFsc2U7fVxuXHRcdGZvcihsZXQgdCA9MDsgdCA8IHNtYWxsLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHNtYWxsW3RdICE9PSBiaWdbdF0pe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Z2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCksXG5cdFx0XHRpc0Z1bmN0aW9uID0gYXR0ck5hbWUuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpPi0xO1xuXHRcdGlmIChpc0Z1bmN0aW9uKXtcblx0XHRcdGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHR9XG5cdFx0aWYgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgdHlwZW9mIG9iamVjdFthdHRyTmFtZV0gIT09ICd1bmRlZmluZWQnICYmIG9iamVjdFthdHRyTmFtZV0gIT09IG51bGwpe1xuXHRcdFx0bGV0IG5ld09iaiA9IGlzRnVuY3Rpb24/b2JqZWN0W2F0dHJOYW1lXSgpOm9iamVjdFthdHRyTmFtZV07XG5cdFx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKG5ld09iaiwgYXR0clBhdGgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBuZXdPYmo7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdHNldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGF0dHJWYWx1ZSl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCk7XG5cdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0aWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoYXR0ck5hbWUpKXtvYmplY3RbYXR0ck5hbWVdID0ge307fVxuXHRcdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChvYmplY3RbYXR0ck5hbWVdLCBhdHRyUGF0aCwgYXR0clZhbHVlKTtcblx0XHR9ZWxzZXtcblx0XHRcdG9iamVjdFthdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0am9pbigpe1xuXHRcdGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gYXJncy5qb2luKFBBVEhfU1BMSVQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RQYXRoKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXNbTUVUQV9FVkVOVFNdID0ge307XG5cdFx0dGhpc1tNRVRBX0RBVEFdID0ge307XG5cdFx0dGhpc1tNRVRBX1dPUktJTkddID0ge307XG5cdFx0dGhpc1tNRVRBX09QVElPTlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uICovXG5cdFx0XHRcdHdoYXQgPSBhcmdzWzBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRjYXNlIDI6XG5cdFx0XHR7XG5cdFx0XHRcdC8qIHNldCBjb2xsZWN0aW9uIGVsZW1lbnQgKi9cblx0XHRcdFx0bm90UGF0aC5zZXQoYXJnc1swXSAvKiBwYXRoICovICwgd2hhdCAvKiBjb2xsZWN0aW9uICovICwgdW5kZWZpbmVkIC8qIGhlbHBlcnMgKi8gLCBhcmdzWzFdIC8qIHZhbHVlICovICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRnZXRDb21tb24od2hhdCwgYXJncykge1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRcdC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCAqL1xuXHRcdGNhc2UgMTpcblx0XHRcdHtcblx0XHRcdFx0cmV0dXJuIG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0fVxuXHRcdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggd2l0aCBkZWZhdWx0IHZhbHVlICovXG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHRcdGlmIChyZXMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdC8qIG5vIGRhdGEsIHJldHVybiBkZWZhdWx0IHZhbHVlICovXG5cdFx0XHRcdFx0cmV0dXJuIGFyZ3NbMV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LyogZGF0YSwgcmV0dXJuIGl0ICovXG5cdFx0XHRcdFx0cmV0dXJuIHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0LyogcmV0dXJuIGZ1bGwgY29sbGVjdGlvbiAqL1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiB3aGF0O1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0Q09SRSBPQkpFQ1Rcblx0XHRcdERBVEEgLSBpbmZvcm1hdGlvblxuXHRcdFx0T1BUSU9OUyAtIGhvdyB0byB3b3JrXG5cdFx0XHRXT1JLSU5HIC0gdGVtcG9yYXJpbHkgZ2VuZXJhdGVkIGluIHByb2NjZXNzXG5cdCovXG5cblx0c2V0RGF0YSgpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX0RBVEFdID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldERhdGEoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0fVxuXG5cdGdldERhdGEoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9EQVRBXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldE9wdGlvbnMoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRPcHRpb25zKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0T3B0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX09QVElPTlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0V29ya2luZygpIHtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0dGhpc1tNRVRBX1dPUktJTkddID0gYXJndW1lbnRzWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldENvbW1vbih0aGlzLmdldFdvcmtpbmcoKSwgYXJndW1lbnRzKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXb3JraW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfV09SS0lOR10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHQvKlxuXHRcdEVWRU5UUyBoYW5kbGluZ1xuXHQqL1xuXG5cdG9uKGV2ZW50TmFtZXMsIGV2ZW50Q2FsbGJhY2tzLCBvbmNlKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZXMpKSB7XG5cdFx0XHRldmVudE5hbWVzID0gW2V2ZW50TmFtZXNdO1xuXHRcdH1cblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRDYWxsYmFja3MpKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcyA9IFtldmVudENhbGxiYWNrc107XG5cdFx0fVxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdG5vdENvbW1vbi5kZWZpbmVJZk5vdEV4aXN0cyh0aGlzW01FVEFfRVZFTlRTXSwgbmFtZSwgW10pO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0ucHVzaCh7XG5cdFx0XHRcdGNhbGxiYWNrczogZXZlbnRDYWxsYmFja3MsXG5cdFx0XHRcdG9uY2U6IG9uY2UsXG5cdFx0XHRcdGNvdW50OiAwXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHRyaWdnZXIoKSB7XG5cdFx0bGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyksXG5cdFx0XHRldmVudE5hbWUgPSBhcmdzLnNoaWZ0KCk7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TmFtZSkpIHtcblx0XHRcdGV2ZW50TmFtZSA9IFtldmVudE5hbWVdO1xuXHRcdH1cblx0XHRldmVudE5hbWUuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5mb3JFYWNoKGV2ZW50ID0+IHtcblx0XHRcdFx0XHRpZiAoZXZlbnQub25jZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnQuY2FsbGJhY2tzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG9mZihldmVudE5hbWVzIC8qIGFycmF5IG9mIGV2ZW50IG5hbWVzICovICwgZXZlbnRDYWxsYmFja3MgLyogYXJyYXkgb2YgY2FsbGJhY2tzICovICkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGxldCB0YXJnZXRJZCA9IC0xO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaCgoZXZlbnQsIGkpID0+IHtcblx0XHRcdFx0aWYgKGkgPT09IC0xICYmIGV2ZW50Q2FsbGJhY2tzID09PSBldmVudC5jYWxsYmFja3MpIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9IGk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKHRhcmdldElkID4gLTEpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uc3BsaWNlKHRhcmdldElkLCAxKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuIiwibGV0IG5vdEFQSU9wdGlvbnMgPSB7XG5cdHJwczogNTAsXG5cdHByb3RvY29sOiAnaHR0cCcsXG5cdGhvc3Q6ICdsb2NhbGhvc3QnLFxuXHRwb3J0OiA5MDAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RBUElPcHRpb25zO1xuIiwiY2xhc3Mgbm90QVBJUXVlZXtcblx0Y29uc3RydWN0b3IgKHJlcXVlc3RzUGVyU2Vjb25kKSB7XG5cdFx0dGhpcy5xdWVlID0gW107XG5cdFx0dGhpcy5pbnQgPSBudWxsO1xuXHRcdHRoaXMucmVxdWVzdHNQZXJTZWNvbmQgPSByZXF1ZXN0c1BlclNlY29uZCB8fCA1O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuKCl7XG5cdFx0dGhpcy5pbnQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5jaGVjay5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5yZXF1ZXN0c1BlclNlY29uZCk7XG5cdH1cblxuXHRjaGVjaygpe1xuXHRcdGlmICh0aGlzLmluUHJvZ3Jlc3Mpe3JldHVybjt9XG5cdFx0ZWxzZXtcblx0XHRcdGlmICh0aGlzLnF1ZWUubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHRoaXMuaW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0XHRcdGxldCB0b0NhbGwgPSB0aGlzLnF1ZWUuc2hpZnQoKTtcblx0XHRcdFx0dG9DYWxsKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmV4dCgpe1xuXHRcdHRoaXMuaW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHR9XG5cblx0YWRkKGNhbGwpe1xuXHRcdHRoaXMucXVlZS5wdXNoKGNhbGwpO1xuXHR9XG5cblx0cGF1c2UoKXtcblx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludCk7XG5cdH1cblxuXHRyZXN1bWUoKXtcblx0XHR0aGlzLnJ1bigpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSVF1ZWU7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlLmpzJztcblxuaW1wb3J0IG5vdEFQSU9wdGlvbnMgZnJvbSAnLi9vcHRpb25zLmpzJztcbmltcG9ydCBub3RBUElRdWVlIGZyb20gJy4vcXVlZS5qcyc7XG5cblxuY2xhc3Mgbm90QVBJIGV4dGVuZHMgIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RDb21tb24uZXh0ZW5kKG5vdEFQSU9wdGlvbnMsIG9wdGlvbnMpKTtcblx0XHR0aGlzLnF1ZWUgPSBuZXcgbm90QVBJUXVlZSh0aGlzLmdldE9wdGlvbnMoJ3JwcycpKTtcblx0XHR0aGlzLnF1ZWUucnVuKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRtYWtlVXJsKHBhcnRzKSB7XG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJy8nKTtcblx0fVxuXG5cdHF1ZWVSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsIG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRtYWtlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCkge1xuXHRcdG5vdENvbW1vbi5sb2coJ21ha2luZyByZXF1ZXN0JywgbWV0aG9kLCB1cmwsIGlkKTtcblx0XHRub3RDb21tb24ucmVxdWVzdEpTT04obWV0aG9kLCB1cmwsIGRhdGEpXG5cdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVxdWVzdCBzdWNjZXNzZnVsbCcsIG1ldGhvZCwgdXJsLCBpZCwgcmVzcG9uc2UpO1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXNwb25zZSBpcyBnb29kJyk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChjb2RlLCByZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ3JlcXVlc3QgZmFpbGVkJywgbWV0aG9kLCB1cmwsIGlkLCByZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3Jlc3BvbnNlIGlzIGJhZCcpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZScpO1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncG9zdCcsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygncHV0dCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2dldCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnbGlzdCBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2RlbGV0ZScsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmdldE1vZGVsKCkuc2V0UHJpY2UocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2RlbGV0ZSBmYWlsZWQnKTtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldFVwbG9hZFVSTChtb2RlbCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSArIHRoaXMuZ2V0T3B0aW9ucygndXBsb2FkJykgKyBtb2RlbD9tb2RlbC5nZXRJZCgpOicnO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSTtcbiIsImltcG9ydCBub3RCYXNlICBmcm9tICcuLi9ub3RCYXNlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEltYWdlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW50ZXJmYWNlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGV4dGVuZE9iamVjdChvYmoxLCBvYmoyKSB7XG5cdFx0dmFyIGF0dHJOYW1lID0gJyc7XG5cdFx0Zm9yIChhdHRyTmFtZSBpbiBvYmoyKSB7XG5cdFx0XHRpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpIHtcblx0XHRcdFx0b2JqMVthdHRyTmFtZV0gPSBvYmoyW2F0dHJOYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG9iajE7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldEFjdGlvbnNDb3VudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBY3Rpb25zKCkgPyBPYmplY3Qua2V5cyh0aGlzLmdldEFjdGlvbnMoKSkubGVuZ3RoIDogMDtcblx0fVxuXG5cdGdldEFjdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFuaWZlc3QgJiYgdGhpcy5tYW5pZmVzdC5hY3Rpb25zP3RoaXMubWFuaWZlc3QuYWN0aW9ucyA6IHt9O1xuXHR9XG5cblx0c2V0RmluZEJ5KGtleSwgdmFsdWUpIHtcblx0XHR2YXIgb2JqID0ge307XG5cdFx0b2JqW2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIob2JqKTtcblx0fVxuXG5cdHNldEZpbHRlcihmaWx0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdmaWx0ZXInLCBmaWx0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFNvcnRlcihzb3J0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUocGFnZVNpemUpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZXIocGFnZVNpemUsIHBhZ2VOdW1iZXIpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldE1vZGVsUGFyYW0oJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0c2V0TW9kZWxQYXJhbShwYXJhbU5hbWUsIHBhcmFtVmFsdWUpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCkpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucyhwYXJhbU5hbWUsIHBhcmFtVmFsdWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZGVsUGFyYW0ocGFyYW1OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucyhwYXJhbU5hbWUsIG51bGwpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdC8vcmV0dXJuIFByb21pc2Vcblx0cmVxdWVzdChyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdHVybCA9IHRoaXMuZ2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIG5vdENvbW1vbi5nZXRBUEkoKS5xdWVlUmVxdWVzdChhY3Rpb25EYXRhLm1ldGhvZCwgdXJsLCBKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSwgdGhpcy5vbkxvYWQuYmluZCh7YWN0aW9uRGF0YSwgbWFuaWZlc3Q6IHRoaXMubWFuaWZlc3R9KSk7XG5cdH1cbi8qXG5cdF9yZXF1ZXN0X09ic29sZXRlXyhyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRub3RDb21tb24ubG9nKCdyZXF1ZXN0JywgcmVjb3JkLCBhY3Rpb25OYW1lLCBjYWxsYmFja1N1Y2Nlc3MsIGNhbGxiYWNrRXJyb3IpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwsIHJlY29yZC5nZXRJZCgpLCBKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSwgZ29vZCwgYmFkKVxuXHRcdFx0XHRcdC50aGVuKHJlc29sdmUpXG5cdFx0XHRcdFx0LmNhdGNoKHJlamVjdCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlJyk7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpO1xuXG5cdFx0fSk7XG5cblxuXHRcdGlmIChhY3Rpb25EYXRhKXtcblx0XHRcdHZhciB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eG1saHR0cC5vcGVuKGFjdGlvbkRhdGEubWV0aG9kLCB1cmwpO1xuXHRcdFx0eG1saHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04Jyk7XG5cdFx0XHR4bWxodHRwLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhtbGh0dHAud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhtbGh0dHAuY2FsbGJhY2tTdWNjZXNzID0gY2FsbGJhY2tTdWNjZXNzO1xuXHRcdFx0eG1saHR0cC5jYWxsYmFja0Vycm9yID0gY2FsbGJhY2tFcnJvcjtcblx0XHRcdHhtbGh0dHAub25sb2FkID0gdGhpcy5vbkxvYWQ7XG5cdFx0XHR4bWxodHRwLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSkpO1xuXHRcdH1cblx0fVxuKi9cblx0b25Mb2FkKGRhdGEpe1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZih0aGlzICYmIHRoaXMuYWN0aW9uRGF0YSAmJiB0aGlzLmFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiB0aGlzLmFjdGlvbkRhdGEuaXNBcnJheSkge1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0ZmlsZVVwbG9hZChmaWxlVXBsb2FkKSB7XG5cdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdC8vbm90Q29tbW9uLmxvZyhmaWxlVXBsb2FkLmZpbGUpO1xuXHRcdGlmICh4aHIudXBsb2FkICYmIHRoaXMuZmlsZUFsbG93ZWQoZmlsZVVwbG9hZC5maWxlKSkge1xuXHRcdFx0Ly8gcHJvZ3Jlc3MgYmFyXG5cdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcInByb2dyZXNzXCIsIGUsIGZpbGVVcGxvYWQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGF0LndvcmtpbmcuZmlsZVVwbG9hZHMuaW5kZXhPZihmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHRcdHRoYXQud29ya2luZy5maWxlVXBsb2Fkcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwic3VjY2Vzc1wiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9wZW4oXCJQT1NUXCIsIHRoaXMuZ2V0VXBsb2FkVXJsKCksIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgZmlsZVVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYX0ZJTEVOQU1FXCIsIGVuY29kZVVSSUNvbXBvbmVudChmaWxlVXBsb2FkLmZpbGUubmFtZSkpO1xuXHRcdFx0eGhyLnNlbmQoZmlsZVVwbG9hZC5maWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBuZXcgRXZlbnQoXCJXcm9uZ0ZpbGVUeXBlXCIpLCBmaWxlVXBsb2FkKTtcblx0XHR9XG5cdH1cblx0Ki9cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJztcblxuY29uc3QgTUVUQV9JTlRFUkZBQ0UgPSBTeW1ib2woJ2ludGVyZmFjZScpLFxuXHRNRVRBX1BST1hZID0gU3ltYm9sKCdwcm94eScpLFxuXHRNRVRBX0NIQU5HRSA9IFN5bWJvbCgnY2hhbmdlJyksXG5cdE1FVEFfQ0hBTkdFX05FU1RFRCA9IFN5bWJvbCgnY2hhbmdlLm5lc3RlZCcpLFxuXHRNRVRBX1NBTCA9IFsnZ2V0QXR0cicsICdnZXRBdHRycycsICdzZXRBdHRyJywgJ3NldEF0dHJzJywgJ2dldERhdGEnLCAnc2V0RGF0YScsICdnZXRKU09OJywgJ29uJywgJ29mZicsICd0cmlnZ2VyJ10sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTAsXG5cdE1FVEFfUkVUVVJOX1RPX1JPT1QgPSBTeW1ib2woJ3JldHVyblRvUm9vdCcpO1xuXG52YXIgY3JlYXRlUHJvcGVydHlIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdHlwZW9mIHRhcmdldFtrZXldKTtcblxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UHJvcGVydHkgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoZ2V0Um9vdCwgcGF0aFRvLCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUHJveHkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5zZXREYXRhKGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9SRVRVUk5fVE9fUk9PVF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRbTUVUQV9SRVRVUk5fVE9fUk9PVF0ocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHRsZXQgcm9vdCA9IHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpKCk7XG5cdFx0cm9vdC50cmlnZ2VyKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX1BST1hZXSwgdGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSwgdmFsdWUpO1xuXHR9XG59XG5cblxudmFyIGNyZWF0ZVJlY29yZEhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZSk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGFyZ2V0LCBrZXksIHZhbHVlKTtcblx0XHRcdFx0cmV0dXJuIHQ7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0fTtcbn07XG5cbmNsYXNzIG5vdFJlY29yZCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCwgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1Byb3h5KSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ3RoaXMgaXMgUHJveHkgaXRlbScpO1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1JlY29yZCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0ZmlsdGVyOiB7fSxcblx0XHRcdHNvcnRlcjoge30sXG5cdFx0XHRwYWdlTnVtYmVyOiBERUZBVUxUX1BBR0VfTlVNQkVSLFxuXHRcdFx0cGFnZVNpemU6IERFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0ZmllbGRzOiBbXVxuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdID0gbmV3IG5vdFJlY29yZEludGVyZmFjZShtYW5pZmVzdCk7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXMuaW50ZXJmYWNlVXAoKTtcblx0XHR0aGlzLmlzUmVjb3JkID0gdHJ1ZTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IHJlY29yZCBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdGluaXRQcm9wZXJ0aWVzKGl0ZW0sIHBhdGggPSAnJykge1xuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhpdGVtKTtcblx0XHRcdGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRcdGxldCBjdXJQYXRoID0gcGF0aCArIChwYXRoLmxlbmd0aCA+IDAgPyAnLicgOiAnJykgKyBrZXk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3VyUGF0aCcsIGN1clBhdGgpO1xuXHRcdFx0XHRpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtW2tleV0gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gKCkgPT4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCk7XG5cdFx0XHRub3RDb21tb24ubG9nKCdkZWZpbmUnLCBERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleCk7XG5cdFx0fVxuXHR9XG5cdC8qXG5cdC0+ICdwYXRoLnRvLmtleScsIHZhbHVlT2ZLZXlcblx0PC0gb2ssIHdpdGggb25lIG9uQ2hhbmdlIGV2ZW50IHRyaWdnZXJlZFxuXHQqL1xuXG5cdHNldEF0dHIoa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBub3RQYXRoLnNldChrZXksIHRoaXNbTUVUQV9QUk9YWV0sIHt9LCB2YWx1ZSk7XG5cdH1cblxuXHQvKlxuXHQtPlxuXHR7XG5cdFx0J2tleVBhdGgnOiB2YWx1ZSxcblx0XHQna2V5LnN1YlBhdGgnOiB2YWx1ZTIsXG5cdFx0J2tleVBhdGguMC50aXRsZSc6IHZhbHVlM1xuXHR9XG5cdDwtIG9rLCB3aXRoIGJ1bmNoIG9mIG9uQ2hhbmdlIGV2ZW50cyB0cmlnZ2VyZWRcblx0Ki9cblx0c2V0QXR0cnMob2JqZWN0UGFydCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBpbiBvYmplY3RQYXJ0KSB7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMgb25lIHRvIGdvJywgcGF0aCk7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cihwYXRoLCBvYmplY3RQYXJ0W3BhdGhdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aFRvS2V5J1xuXHQ8LSB2YWx1ZTFcblxuXHQqL1xuXHRnZXRBdHRyKHdoYXQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ2dldEF0dHInLCB3aGF0KTtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQod2hhdCwgdGhpc1tNRVRBX1BST1hZXSwge30pO1xuXHR9XG5cblx0Lypcblx0LT4gWydwYXRoVG9LZXknLCAncGF0aC50by5rZXknLCAnc2ltcGxlS2V5JywuLi5dXG5cdDwtIFt2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzLC4uLl1cblx0Ki9cblx0Z2V0QXR0cnMod2hhdCkge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAod2hhdCAmJiB3aGF0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggb2Ygd2hhdCkge1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLmdldEF0dHIocGF0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRnZXRKU09OKCkge1xuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJjb25zdCBQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVggPSAnbi0nLFxuXHRURU1QTEFURV9UQUcgPSAnbnQnLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgPSAnLScsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYID0gJ2lmJyxcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCA9ICdub3RfY29tcG9uZW50XycsXG5cdFBBUlRfSURfUFJFRklYID0gJ25vdF9wYXJ0XycsXG5cdERFRkFVTFRfUExBQ0VSID0gJ3BsYWNlJyxcblx0REVGQVVMVF9QTEFDRVJfTE9PUCA9ICdwbGFjZUFmdGVyJztcblxuY29uc3QgT1BUUyA9IHtcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLFxuXHRURU1QTEFURV9UQUcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUixcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsXG5cdERFRkFVTFRfUExBQ0VSLFxuXHRDT01QT05FTlRfSURfUFJFRklYLFxuXHRQQVJUX0lEX1BSRUZJWCxcblx0REVGQVVMVF9QTEFDRVJfTE9PUFxufTtcblxuZXhwb3J0IGRlZmF1bHQgT1BUUztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmNvbnN0IE1FVEFfQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlQ2FjaGUgZXh0ZW5kcyBub3RCYXNle1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXSA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHR0aGlzLmhpZGVUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaWRlVGVtcGxhdGVzKCl7XG5cdFx0bGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdHQuaW5uZXJIVE1MID0gT1BUUy5URU1QTEFURV9UQUcgKyAne2Rpc3BsYXk6IG5vbmU7fSc7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KTtcblx0fVxuXG5cdHJlZ2lzdGVyKCkge1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcigndGVtcGxhdGVDYWNoZScsIHRoaXMpO1xuXHR9XG5cblx0bG9hZChtYXApIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0Zm9yICh2YXIgaSBpbiBtYXApIHtcblx0XHRcdHRoaXMubG9hZE9uZShpLCBtYXBbaV0pO1xuXHRcdH1cblx0fVxuXG5cdGxvYWRPbmUoa2V5LCB1cmwsIGNhbGxiYWNrKSB7XG5cblx0XHR2YXIgb1JlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRvUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXHRcdG9SZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdGlmICh0aGF0LmdldChrZXkpKXtcblx0XHRcdFx0cmVzb2x2ZSh0aGF0LmdldChrZXkpKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL3RoYXQuc2V0TG9hZGluZyhrZXksIHVybCk7XG5cdFx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybCkudGhlbihmdW5jdGlvbih0ZW1wbGF0ZUlubmVySFRNTCl7XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhhdC53cmFwKGtleSwgdXJsLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0XHRcdFx0dGhhdC5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSh0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdlcnJvciBsb2FkaW5nIHRlbXBsYXRlJywga2V5LCB1cmwpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybCkudGhlbihmdW5jdGlvbih0ZW1wbGF0ZXNIVE1MKXtcblx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoYXQucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdHRoYXQuYWRkTGliKHRlbXBsYXRlcyk7XG5cdFx0XHRcdHJlc29sdmUodGVtcGxhdGVzKTtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGVzIGxpYicsIHVybCxlKTtcblx0XHRcdFx0cmVqZWN0KC4uLmFyZ3VtZW50cyk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcblxuY29uc3QgTUVUQV9QUk9DRVNTT1JTID0gU3ltYm9sKCdwcm9jZXNzb3JzJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFByb2Nlc3NvcigvKiBrZXksIHZhbHVlICovKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQcm9jZXNzb3IoLyoga2V5LCAgZGVmYXVsdFZhbHVlICovKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXJQcm9jZXNzb3JzKCl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGQoKXtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG5cdFx0XHR0aGlzLnNldFByb2Nlc3Nvcihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBhcmd1bWVudHNbMF0pe1xuXHRcdFx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKHQsIGFyZ3VtZW50c1swXVt0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRQcm9jZXNzb3IoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyKCl7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vbm90VGVtcGxhdGVQcm9jZXNzb3JzJztcblxuLypcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGCIERPTSDQv9C+0LTQtNC10YDQtdCy0L4g0LIg0LrQsNGH0LXRgdGC0LLQtSDRiNCw0LHQu9C+0L3QsC5cbiAqINCX0LDQv9C+0LvQvdGP0LXRgiDQtdCz0L4g0LTQsNC90L3Ri9C80LguXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgdCz0LXQvdC10YDQuNGA0L7QstCw0L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xuICpcbiAqICovXG5cbi8qXG5cblx0PGRpdiBuLXRlbXBsYXRlLW5hbWU9XCJ2YXN5YVwiPlxuXHRcdDxwPjxpbnB1dCB0eXBlPVwidGV4dFwiIG4tdmFsdWU9XCI6Y29vbE5hbWVcIi8+PC9wPlxuXHRcdDxwPtCR0L7RgNC40YEg0YXRgNC10L0g0L/QvtC/0LDQtNC10YjRjCDQuCB7ezpjb29sTmFtZX19LjwvcD5cblx0PC9kaXY+XG5cbiAqL1xuXG5jb25zdCBNRVRBX0NPTVBPTkVOVFMgPSBTeW1ib2woJ2NvbXBvbmVudHMnKTtcblxuY2xhc3Mgbm90UmVuZGVyZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Lypcblx0XHRpbnB1dCA9IHtcblx0XHRcdGRhdGE6IG5vdFJlY29yZCxcblx0XHRcdHRlbXBsYXRlOiBlbGVtZW50XG5cdFx0XHRvcHRpb25zOntcblx0XHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdH1cblx0XHR9XG5cdCovXG5cblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXSA9IHt9O1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5jb21wb25lbnQgPSBpbnB1dC5jb21wb25lbnQ7XG5cdFx0dGhpcy5pbml0RGF0YShpbnB1dC5kYXRhID8gaW5wdXQuZGF0YSA6IHt9KTtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQudGVtcGxhdGUpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlKCk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGUoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZScsIHRoaXMuZ2V0V29ya2luZygnZ2V0VGVtcGxhdGUnKSgpKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5nZXREYXRhKCkub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdH1cblxuXHRpbml0V29ya2luZyh0ZW1wbGF0ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRnZXRUZW1wbGF0ZTogdGVtcGxhdGUsXG5cdFx0XHRwYXJ0SWQ6IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgPyB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpIDogT1BUUy5QQVJUX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpIHtcblx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcblx0XHRcdHJldHVybiBbLi4udGhpcy5jb21wb25lbnQuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fVxuXHR9XG5cblx0b25DaGFuZ2UocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHQvKm5vdENvbW1vbi5sb2codGhpcyk7XG5cdFx0bm90Q29tbW9uLmxvZyh0aGlzLmdldEJyZWFkQ3J1bXBzKCkuam9pbignID4gJykpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHJlbmRlcmVyICcsIHRoaXMuZ2V0V29ya2luZygncGFydElkJyksICcgYWZ0ZXIgY2hhbmdlcycsIGtleSwgdmFsdWUpOyovXG5cdFx0dGhpcy51cGRhdGUoa2V5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ29ic29sZXRlJyk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHR1cGRhdGUoa2V5KSB7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfQ09NUE9ORU5UU10pIHtcblx0XHRcdGxldCBpdGVtID0gdGhpc1tNRVRBX0NPTVBPTkVOVFNdW3RdLFxuXHRcdFx0XHRpZlBhcnQgPSB0cnVlO1xuXHRcdFx0aWYgKGtleSl7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJyk9PT1udWxsKXtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXRcdGNvbXBvbmVudFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpKSxcblx0XHRcdFx0XHRjaGFuZ2VkUGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChrZXkpO1xuXHRcdFx0XHRpZlBhcnQgPSBub3RQYXRoLmlmRnVsbFN1YlBhdGgoY2hhbmdlZFBhdGgsIGNvbXBvbmVudFBhdGgpO1xuXHRcdFx0XHQvKm5vdENvbW1vbi5sb2coaXRlbS5nZXRPcHRpb25zKCduYW1lJyksICcgPi08ICcsIGl0ZW0uZ2V0T3B0aW9ucygnaWQnKSwgJyA+LTwgJywgY29tcG9uZW50UGF0aCwgY2hhbmdlZFBhdGgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCd3aWxsIGJlIHVwZGF0ZWQnLCBpZlBhcnQpOyovXG5cdFx0XHR9XG5cblx0XHRcdGlmIChpZlBhcnQpIHtcblx0XHRcdFx0aXRlbS51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXRXb3JraW5nTWFwcGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21hcHBpbmcnLCB0aGlzLmNyZWF0ZU1hcHBpbmcoKSk7XG5cdH1cblxuXHQvKlxuXG5cdNCh0L7Qt9C00LDQtdC8INC60LDRgNGC0Ysg0YHQvtC+0YLQstC10YHRgtCy0LjRjyDQv9GA0L7RhtC10YHRgdC+0YDQvtCyLCDQv9GD0YLQtdC5INC00LDQvdC90YvRhSDQsiDQvtCx0YrQtdC60YLQtSDQuCDRjdC70LXQvNC10L3RgtC+0LIg0YjQsNCx0LvQvtC90LAuXG5cdFt7XG5cdFx0ZWwsXG5cdFx0cHJvY2Vzc29yLFxuXHRcdHdvcmtpbmcsXG5cdFx0aXRlbS5wcm9wZXJ0eS5wYXRoXG5cdH1dXG5cblx0Ki9cblxuXHRjcmVhdGVNYXBwaW5nKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmZpbmRBbGxQcm9jZXNzb3JzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZpbmRBbGxQcm9jZXNzb3JzKCkge1xuXHRcdGxldCBwcm9jcyA9IFtdLFxuXHRcdFx0ZWxzID0gbm90Q29tbW9uLmdldEF0dHJpYnV0ZXNTdGFydHNXaXRoKHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLCBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCk7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBhdHRzID0gZWxzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhhdHRzW2ldKTtcblx0XHRcdFx0XHRsZXQgcHJvY0RhdGEgPSB0aGlzLnBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihhdHRzW2ldLm5vZGVOYW1lKTtcblx0XHRcdFx0XHRwcm9jRGF0YS5lbGVtZW50ID0gZWxzW2pdO1xuXHRcdFx0XHRcdHByb2NEYXRhLnByb2Nlc3NvckV4cHJlc3Npb24gPSBhdHRzW2ldLm5vZGVOYW1lO1xuXHRcdFx0XHRcdHByb2NEYXRhLmF0dHJpYnV0ZUV4cHJlc3Npb24gPSBhdHRzW2ldLnZhbHVlO1xuXHRcdFx0XHRcdHByb2NzLnB1c2gocHJvY0RhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwcm9jcztcblx0fVxuXG5cdHBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihwcm9jZXNzb3JFeHByZXNzaW9uKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdHBhcmFtczogW10sXG5cdFx0XHRwcm9jZXNzb3JOYW1lOiAnJyxcblx0XHRcdGlmQ29uZGl0aW9uOiBmYWxzZVxuXHRcdH07XG5cdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCwgJycpO1xuXHRcdGlmIChwcm9jZXNzb3JFeHByZXNzaW9uLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCkgPT09IChwcm9jZXNzb3JFeHByZXNzaW9uLmxlbmd0aCAtIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgubGVuZ3RoKSkge1xuXHRcdFx0cmVzdWx0LmlmQ29uZGl0aW9uID0gdHJ1ZTtcblx0XHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgKyBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLCAnJyk7XG5cdFx0fVxuXHRcdHJlc3VsdC5wYXJhbXMgPSBwcm9jZXNzb3JFeHByZXNzaW9uLnNwbGl0KE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SKTtcblx0XHRyZXN1bHQucHJvY2Vzc29yTmFtZSA9IHJlc3VsdC5wYXJhbXNbMF07XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHJlc3VsdC5wYXJhbXMuc2xpY2UoMSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGV4ZWNQcm9jZXNzb3JzKGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG1hcHBpbmcgPSB0aGlzLmdldFdvcmtpbmcoJ21hcHBpbmcnKTtcblx0XHRpZiAobWFwcGluZykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBwcm9jU2NvcGUgPSBtYXBwaW5nW2ldO1xuXHRcdFx0XHRwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHByb2NTY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBpbmRleCk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnYXR0cmlidXRlUmVzdWx0JywgcHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdFx0XHRcdGxldCBwcm9jTmFtZSA9IHByb2NTY29wZS5wcm9jZXNzb3JOYW1lLFxuXHRcdFx0XHRcdHByb2MgPSBub3RUZW1wbGF0ZVByb2Nlc3NvcnMuZ2V0KHByb2NOYW1lKTtcblx0XHRcdFx0aWYgKHByb2MpIHtcblx0XHRcdFx0XHRwcm9jKHByb2NTY29wZSwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0XHRcdFx0XHRwcm9jU2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvY1Njb3BlLnByb2Nlc3NvckV4cHJlc3Npb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gcHJvY2Vzc29yIGxpa2UnLCBwcm9jTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcpO1xuXHR9XG5cblx0Z2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwYXRoLCBpdGVtKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdH1cblxuXHRjbGVhclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmRlc3Ryb3lTdWJzKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdWJzJywgW10pO1xuXHR9XG5cblx0ZGVzdHJveVN1YnMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFN0YXNoKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IGVsID0gdGhpcy5nZXRTdGFzaCgpW3RdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUpe1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZlN1YkVsZW1lbnRSZW5kZXJlZChudEVsKSB7XG5cdFx0cmV0dXJuIG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkICYmIChudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZC52YWx1ZSA9PT0gJ3RydWUnKTtcblx0fVxuXG5cdHNlYXJjaEZvclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0bGV0IHN1YnMgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCA9IDA7IG50IDwgc3Vicy5sZW5ndGg7IG50KyspIHtcblx0XHRcdGlmICghdGhpcy5pZlN1YkVsZW1lbnRSZW5kZXJlZChzdWJzW250XSkpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJTdWIoc3Vic1tudF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZFN1YihudEVsKSB7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdzdWJzJykucHVzaCh7XG5cdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdHBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiAnJyxcblx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnNyYyA6ICcnLFxuXHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0XHRyZW5kZXJlZExpc3Q6IFtdLFxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU3ViKG50RWwpIHtcblx0XHRpZiAoIW50RWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IGRldGFpbHMgPSB7XG5cdFx0XHRcdGRhdGFQYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogbnVsbCxcblx0XHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMuc3JjLnZhbHVlIDogJycsXG5cdFx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0ZGF0YTogZGV0YWlscy5kYXRhUGF0aCE9PSBudWxsPyB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQoZGV0YWlscy5kYXRhUGF0aCwgdGhpcy5nZXREYXRhKCkpOm51bGwsXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHNyYzogZGV0YWlscy5zcmNcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSxcblx0XHRcdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VBZnRlcicsXG5cdFx0XHRcdFx0aWQ6IGRldGFpbHMuaWQsXG5cdFx0XHRcdFx0bnRFbDogbnRFbCxcblx0XHRcdFx0XHRkYXRhUGF0aDogZGV0YWlscy5kYXRhUGF0aFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvd25lcjogdGhpc1xuXHRcdFx0fTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnaWQnLCBkZXRhaWxzLmlkKTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU11bZGV0YWlscy5pZF0gPSBuZXcgbm90Q29tcG9uZW50KG9wdGlvbnMpO1xuXHR9XG5cblx0Y2xlYXJTdGFzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgW10pO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZScpO1xuXHR9XG5cblx0Z2V0U3Rhc2goKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc3Rhc2gnKTtcblx0fVxuXG5cdHN0YXNoUmVuZGVyZWQoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMuYWRkVG9TdGFzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHR9XG5cblx0cmVwbGFjZVJlbmRlcmVkKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygncmVwbGFjZSBzdGFzaCcpO1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSxcblx0XHRcdHN0YXNoID0gdGhpcy5nZXRTdGFzaCgpLFxuXHRcdFx0bmV3U3Rhc2ggPSBbXSxcblx0XHRcdGFuY2hvciA9IHN0YXNoLmxlbmd0aCA+IDAgPyBzdGFzaFswXSA6IHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLFxuXHRcdFx0cGFyZW50Tm9kZSA9IGFuY2hvci5wYXJlbnROb2RlO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdG5ld1N0YXNoLnB1c2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IG5ld1N0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRpZiAoYW5jaG9yLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTdGFzaFt0XSwgYW5jaG9yLm5leHRTaWJsaW5nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld1N0YXNoW3RdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBzdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdGFzaFt0XSk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBuZXdTdGFzaCk7XG5cdH1cblxuXHRhZGRUb1N0YXNoKG5vZGUpIHtcblx0XHR0aGlzLmdldFN0YXNoKCkucHVzaChub2RlKTtcblx0fVxuXG5cdGlzRGF0YShkYXRhKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlbmRlcmVyO1xuIiwiY29uc3QgcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdHdoaWxlICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuWzBdKTtcblx0XHR9XG5cdH0sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fVxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlO1xuIiwiY29uc3QgcGxhY2VBZnRlciA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQWZ0ZXI7XG4iLCJjb25zdCBwbGFjZUJlZm9yZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQmVmb3JlO1xuIiwiY29uc3QgcGxhY2VGaXJzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZUZpcnN0O1xuIiwiY29uc3QgcGxhY2VMYXN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VMYXN0O1xuIiwiY29uc3QgcmVwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHtcblx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhcmdldEVsKTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZTtcbiIsImltcG9ydCBwbGFjZSBmcm9tICcuL3BsYWNlJztcbmltcG9ydCBwbGFjZUFmdGVyIGZyb20gJy4vcGxhY2VBZnRlcic7XG5pbXBvcnQgcGxhY2VCZWZvcmUgZnJvbSAnLi9wbGFjZUJlZm9yZSc7XG5pbXBvcnQgcGxhY2VGaXJzdCBmcm9tICcuL3BsYWNlRmlyc3QnO1xuaW1wb3J0IHBsYWNlTGFzdCBmcm9tICcuL3BsYWNlTGFzdCc7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICcuL3JlcGxhY2UnO1xuXG5jb25zdCBub3RQbGFjZXJzID0ge1xuXHRwbGFjZTogcGxhY2UsXG5cdHBsYWNlQWZ0ZXI6IHBsYWNlQWZ0ZXIsXG5cdHBsYWNlQmVmb3JlOiBwbGFjZUJlZm9yZSxcblx0cGxhY2VGaXJzdDogcGxhY2VGaXJzdCxcblx0cGxhY2VMYXN0OiBwbGFjZUxhc3QsXG5cdHJlcGxhY2U6IHJlcGxhY2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFBsYWNlcnM7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vbm90UmVuZGVyZXInO1xuaW1wb3J0IG5vdFBsYWNlcnMgZnJvbSAnLi9wbGFjZXJzJztcblxuY29uc3QgTUVUQV9QQVJUUyA9IFN5bWJvbCgncGFydHMnKTtcbi8qXG5cdGlucHV0ID0ge1xuXHRcdGRhdGE6IG5vdFJlY29yZCBvciBbbm90UmVjb3JkXSxcblx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0aHRtbDogaHRtbChzdHJpbmcpLCBcdFx0Ly/RgtC10LrRgdGCINGBIGh0bWwg0LrQvtC00L7QvCDRiNCw0LHQu9C+0L3QsFxuXHRcdFx0ZWw6IEhUTUxFbGVtZW50KG9iamVjdCksIFx0Ly9ET00g0Y3Qu9C10LzQtdC90YJcblx0XHRcdHNyYzogc3JjKHN0cmluZyksXHRcdFx0Ly/RgdGB0YvQu9C60LAg0L3QsCDRhNCw0LnQuyDRgSDRiNCw0LHQu9C+0L3QvtC8XG5cdFx0XHRuYW1lOiBuYW1lKHN0cmluZylcdFx0XHQvL9C90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAg0LTQu9GPINC/0L7QuNGB0LrQsCDQsiDQutGN0YjQtSBub3RUZW1wbGF0ZUNhY2hlXG5cdFx0fVxuXHRcdG9wdGlvbnM6e1xuXHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0Ly/QsCDRjdGC0L4g0LrQsNC6INCx0YPQtNC10Lwg0L/QvtC80LXRidCw0YLRjCDRgNC10LfRg9C70YzRgtCw0YIg0YDQtdC90LTQtdGA0LjQvdCz0LBcblx0XHRcdHJlbmRlckFuZDogcGxhY2VTdHlsZShzdHJpbmcpINC+0LTQuNC9INC40Lcg0LLQsNGA0LjQsNC90YLQvtCyXG5cdFx0XHRcdFx0cGxhY2VcdFx0LVx00L/QvtC80LXRidCw0LXQvCDQstC90YPRgtGA0Lgg0YbQtdC70LXQstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG5cdFx0XHRcdFx0cmVwbGFjZVx0XHQtXHTQt9Cw0LzQtdC90Y/QtdC8XG5cdFx0XHRcdFx0cGxhY2VBZnRlclx0LVx00L/QvtGB0LvQtVxuXHRcdFx0XHRcdHBsYWNlQmVmb3JlXHQtXHTQtNC+XG5cdFx0XHRcdFx0cGxhY2VGaXJzdFx0LVx00LLQvdGD0YLRgNC4INC/0LXRgNCy0YvQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0XHRcdFx0cGxhY2VMYXN0XHQtXHTQstC90YPRgtGA0Lgg0L/QvtGB0LvQtdC00L3QuNC8INC00L7Rh9C10YDQvdC40Lxcblx0XHR9XG5cdH1cbiovXG5jbGFzcyBub3RDb21wb25lbnQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHRcdHRoaXMub24oJ3JlYWR5JywgdGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCl7XG5cdFx0aWYgKHRoaXMub3duZXIpe1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLm93bmVyLmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fVxuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLm93bmVyID0gaW5wdXQub3duZXI/aW5wdXQub3duZXI6bnVsbDtcblx0XHR0aGlzLmluaXREYXRhKGlucHV0LmRhdGEgPyBpbnB1dC5kYXRhIDoge30pO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0RXZlbnRzKGlucHV0LmV2ZW50cyA/IGlucHV0LmV2ZW50cyA6IFtdKTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0RXZlbnRzKGxpc3Qpe1xuXHRcdGZvcihsZXQgdCBvZiBsaXN0KXtcblx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2lkJykpe1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdpZCcsIE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKXtcblx0XHRcdHRoaXMuaW5pdE1hcmtFbGVtZW50KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hcmtFbGVtZW50KCl7XG5cdFx0bGV0IG1hcmtFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ250Jyk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdudEVsJywgbWFya0VsKTtcblx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0cGxhY2VyLm1haW4odGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLCBbbWFya0VsXSk7XG5cdH1cblxuXHRpbml0V29ya2luZyh2YWwpIHtcblx0XHR0aGlzLnVuc2V0UmVhZHkodmFsKTtcblx0fVxuXG5cdHByZXBhcmVUZW1wbGF0ZUVsZW1lbnQodmFsKSB7XG5cdFx0aWYgKCF2YWwpIHtcblx0XHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdodG1sJykgJiYgdmFsLmh0bWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQodmFsLmVsLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZhbC5zcmMpIHtcblx0XHRcdG5vdFRlbXBsYXRlQ2FjaGUuZ2V0RnJvbVVSTCh2YWwuc3JjLCB2YWwuc3JjKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpICYmIHZhbC5uYW1lKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUuZ2V0KHZhbC5uYW1lKSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JywgY29udCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRyZXNldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50JywgdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpLmNsb25lTm9kZSh0cnVlKSk7XG5cdH1cblxuXHRzZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdHJ1ZSk7XG5cdH1cblxuXHR1bnNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCBmYWxzZSk7XG5cdH1cblxuXHRpc1JlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3JlYWR5Jyk7XG5cdH1cblxuXHRjbGVhclBhcnRzKCkge1xuXHRcdC8qINC40LfQstC10YnQsNC10Lwg0L7QsSDRg9C00LDQu9C10L3QuNC4INGN0LvQtdC80LXQvdGC0L7QsiAqL1xuXHRcdGlmICh0aGlzW01FVEFfUEFSVFNdICYmIEFycmF5LmlzQXJyYXkodGhpc1tNRVRBX1BBUlRTXSkgJiYgdGhpc1tNRVRBX1BBUlRTXS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpc1tNRVRBX1BBUlRTXSkge1xuXHRcdFx0XHRpZiAodC5kZXN0cm95KXtcblx0XHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdudEVsJykgJiYgdGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZSl7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKTtcblx0XHR9XG5cdH1cblxuXHRyZXNldFBhcnRzKCkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10gPSBbXTtcblx0fVxuXG5cdGdldFBhcnRzKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfUEFSVFNdO1xuXHR9XG5cblx0YWRkUGFydCh0ZW1wbGF0ZSkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10ucHVzaCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0dGhpcy5yZW1vdmVPYnNvbGV0ZVBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gdGFyZ2V0IGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRwbGFjZVBhcnQoZGF0YSwgaW5kZXgpe1xuXHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpLFxuXHRcdFx0bm9kZXMgPSBwYXJ0LmdldFN0YXNoKCksXG5cdFx0XHR0YXJnZXRFbCxcblx0XHRcdGxhc3ROb2RlLFxuXHRcdFx0cGxhY2VyO1xuXHRcdGlmIChpbmRleCA9PT0gMCl7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIoT1BUUy5ERUZBVUxUX1BMQUNFUl9MT09QKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScpO1xuXHRcdH1cblx0XHRwbGFjZXIubWFpbih0YXJnZXRFbCwgbm9kZXMpO1xuXG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRwbGFjZU5vZGVzKG5vZGVzKXtcblx0XHQvL25vdENvbW1vbi5sb2coJ3BsYWNlZCBwYXJ0Jywgbm9kZXMpO1xuXHR9XG5cblx0Z2V0UGxhY2VyKG1ldGhvZCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2VhcmNoaW5nIGZvciBwbGFjZXInLCBtZXRob2QpO1xuXHRcdGlmIChub3RQbGFjZXJzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW21ldGhvZF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW09QVFMuREVGQVVMVF9QTEFDRVJdO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hEYXRhKGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXREYXRhKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZ1bmModGhpcy5nZXREYXRhKCksIDApO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hQYXJ0KGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldFBhcnRzKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0UGFydHMoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHTQtdGB0LvQuCDRgSDQtNCw0L3QvdGL0LzQuCDQvdC1INGB0LLRj9C30LDQvSDRgNC10L3QtNC10YDQtdGAIC0g0YHQvtC30LTQsNC10Lxcblx0Ki9cblxuXHRyZW5kZXJQYXJ0KGRhdGEpIHtcblx0XHRpZiAoIXRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjcmVhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0bGV0IHJlbmRlcmVyID0gbmV3IG5vdFJlbmRlcmVyKHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dGVtcGxhdGU6IHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKSxcblx0XHRcdFx0Y29tcG9uZW50OiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdC8vcmVuZGVyZXIub24oJ29ic29sZXRlJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFkZFBhcnQocmVuZGVyZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCd1cGRhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0dGhpcy51cGRhdGVQYXJ0KHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlUGFydChwYXJ0KXtcblx0XHRwYXJ0LnVwZGF0ZSgpO1xuXHR9XG5cblx0cmVtb3ZlT2Jzb2xldGVQYXJ0cygpIHtcblx0XHQvL9C60L7QvdCy0LXQtdGAINC/0L7QuNGB0Log0LDQutGC0YPQsNC70YzQvdGL0YUgLSDRg9C00LDQu9C10L3QuNC1INC+0YHRgtCw0LvRjNC90YvRhVxuXHRcdG5vdENvbW1vbi5waXBlKFxuXHRcdFx0dW5kZWZpbmVkLCAvLyBwYXJ0cyB0byBzZWFyY2ggaW4sIGNhbiBiZSAndW5kZWZpbmVkJ1xuXHRcdFx0W1xuXHRcdFx0XHR0aGlzLmZpbmRBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL2ZpcnN0IHJvdW5kLCBzZWFyY2ggZm9yIG9ic29sZXRlXG5cdFx0XHRcdHRoaXMucmVtb3ZlTm90QWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9yZW1vdmUgJ2VtXG5cdFx0XHRdXG5cdFx0KTtcblx0fVxuXG5cdC8qXG5cdFx00LXRgdGC0Ywg0LTQsNC90L3Ri9C1INC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0LDQutGC0YPQsNC70YzQvdC+LFxuXHRcdNC90LXRgiDQtNCw0L3QvdGL0YUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDRgdGC0LDRgNGM0ZFcblx0Ki9cblxuXHRmaW5kQWN0dWFsUGFydHMoKSB7XG5cdFx0bGV0IGFjdHVhbFBhcnRzID0gW107XG5cdFx0dGhpcy5mb3JFYWNoRGF0YSgoZGF0YS8qLCBpbmRleCovKT0+e1xuXHRcdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSk7XG5cdFx0XHRpZiAocGFydCl7XG5cdFx0XHRcdGFjdHVhbFBhcnRzLnB1c2gocGFydCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGFjdHVhbFBhcnRzO1xuXHR9XG5cblx0Lypcblx0XHTRg9C00LDQu9GP0LXQvCDQstGB0LUg0LrRgNC+0LzQtSDQsNC60YLRg9Cw0LvRjNC90YvRhVxuXHQqL1xuXHRyZW1vdmVOb3RBY3R1YWxQYXJ0cyhhY3R1YWxQYXJ0cyl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAoYWN0dWFsUGFydHMuaW5kZXhPZih0aGlzLmdldFBhcnRzKClbdF0pID09PSAtMSl7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKVt0XS5kZXN0cm95KCk7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKS5zcGxpY2UodCwgMSk7XG5cdFx0XHRcdHQtLTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRQYXJ0QnlEYXRhKGRhdGEpIHtcblx0XHRmb3IgKGxldCB0IGluIHRoaXMuZ2V0UGFydHMoKSkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0UGFydHMoKVt0XS5pc0RhdGEoZGF0YSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UGFydHMoKVt0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbXBvbmVudDtcbiIsImltcG9ydCAgbm90Q29tcG9uZW50ICBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RGb3JtRmFjdG9yeSBleHRlbmRzIG5vdENvbXBvbmVudHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucyl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHt9KTtcblx0XHR0aGlzLm9uKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0KTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldCk7XG5cdFx0dGhpcy5vbignY2FuY2VsJywgdGhpcy5vbkNhbmNlbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKlxuXHRcdFJlbmRlcmluZ1xuXHQqL1xuXG5cdHJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHRcdHRoaXMucmVuZGVyQ29tcG9uZW50cygpO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpe1xuXG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCl7XG5cblx0fVxuXG5cdC8qXG5cdFx0RGF0YSBtYW5hZ2VtZW50XG5cdCovXG5cblx0Y29sbGVjdERhdGEoKXtcblxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCl7XG5cblx0fVxuXG5cdG9uUmVzZXQoKXtcblxuXHR9XG5cblx0b25DYW5jZWwoKXtcblxuXHR9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jbGFzcyBub3RWaWV3IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFRlbXBsYXRlT3B0aW9ucygpIHtcblx0XHR2YXIgZGVmYXVsdFJlc3VsdCA9IHt9O1xuXHRcdHJldHVybiAodHlwZW9mIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVPcHRpb25zJykgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVPcHRpb25zJykgIT09IG51bGwpID8gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZU9wdGlvbnMnKTogZGVmYXVsdFJlc3VsdDtcblx0fVxuXG5cdGdldFBsYWNlVG9QdXQoKSB7XG5cdFx0aWYgKHR5cGVvZiB0aGlzLmdldE9wdGlvbnMoJ3BsYWNlVG9QdXQnKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRPcHRpb25zKCdwbGFjZVRvUHV0JykgIT09IG51bGwpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3BsYWNlVG9QdXQnKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRvY3VtZW50LmJvZHk7XG5cdH1cblxuXHRnZXRBZnRlckV4ZWNDYWxsYmFjayhjYWxsYmFjaykge1xuXHRcdHZhciBkZWZhdWx0UmVzdWx0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdkZWZhdWx0IHZpZXcgYWZ0ZXIgZXhlYyBjYWxsYmFjaycpO1xuXHRcdH07XG5cdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcgJiYgY2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHJldHVybiBjYWxsYmFjaztcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB0aGlzLmdldE9wdGlvbnMoJ2FmdGVyRXhlYycpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldE9wdGlvbnMoJ2FmdGVyRXhlYycpICE9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdhZnRlckV4ZWMnKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRlZmF1bHRSZXN1bHQ7XG5cdH1cblxuXHRleGVjKGNhbGxiYWNrKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBuZXcgbm90Q29tcG9uZW50KHRoaXMuZ2V0VGVtcGxhdGVPcHRpb25zKCkpKTtcblx0fTtcblxuXHRzZXRQYXJhbShuYW1lLCB2YWx1ZSkge1xuXHRcdHRoaXMuZ2V0T3B0aW9ucyhuYW1lLCB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRUZW1wbGF0ZVBhcmFtKG5hbWUsIHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdFBhdGguam9pbigndGVtcGxhdGVPcHRpb25zJyxuYW1lKSwgdmFsdWUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UGFyYW0obmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoKS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IHRoaXMuZ2V0T3B0aW9ucyhuYW1lKSA6IHVuZGVmaW5lZDtcblx0fVxuXG5cdGdldFBhcmFtcygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90VmlldztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jbGFzcyBub3RDb250cm9sbGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGFwcCwgY29udHJvbGxlck5hbWUpIHtcblx0XHRzdXBlcigpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGNvbnRyb2xsZXInKTtcblx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHR0aGlzLm5jTmFtZSA9ICduYycgKyAoY29udHJvbGxlck5hbWUuY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKCkpO1xuXHRcdHRoaXMuY29udGFpbmVyU2VsZWN0b3IgPSAnLnBhZ2UtY29udGVudCc7XG5cdFx0dGhpcy52aWV3c1Bvc3RmaXggPSAnLmh0bWwnO1xuXHRcdHRoaXMucmVuZGVyRnJvbVVSTCA9IHRydWU7XG5cdFx0Lypcblx0XHQgICAg0YHRgNCw0LfRgyDQtNC10LvQsNC10Lwg0LTQvtGB0YLRg9C/0L3Ri9C80Lgg0LzQvtC00LXQu9C4IG5vdFJlY29yZCDQuNC3IG5jYENvbnRyb2xsZXJOYW1lYCDQsdGD0LTRg9GCINC00L7RgdGC0YPQv9C90Ysg0LrQsNC6IHRoaXMubnJgTW9kZWxOYW1lYFxuXHRcdCovXG5cdFx0dGhpcy5hcHAuZ2V0SW50ZXJmYWNlcygpLmZvckVhY2goKGluZGV4LCBpbnRlcmZhYzMpID0+IHtcblx0XHRcdGlmICh0eXBlb2YoKHdpbmRvd1t0aGlzLm5jTmFtZV0pKSAhPT0gJ3VuZGVmaW5lZCcpKHdpbmRvd1t0aGlzLm5jTmFtZV0pLnByb3RvdHlwZVtpbmRleF0gPSBpbnRlcmZhYzM7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQkcmVuZGVyKG5jIC8qIG5jTmFtZSBmdW5jdGlvbiB0aGlzKi8gLCBuYW1lIC8qIHZpZXcgbmFtZSAqLyAsIGRhdGEgLyogZGF0YSBmb3Igbm90VGVtcGxhdGUqLyAsIGhlbHBlcnMgLyogY291bGQgYmUgbm90IHJlcHJlc2VudGVkICovICwgY2FsbGJhY2spIHtcblx0XHR2YXIgdmlldyA9IG5jLnZpZXdzLmhhc093blByb3BlcnR5KG5hbWUpID8gbmMudmlld3NbbmFtZV0gOiBudWxsLFxuXHRcdFx0cmVhbENhbGxiYWNrLFxuXHRcdFx0cmVhbEhlbHBlcnM7XG5cdFx0aWYgKHR5cGVvZiB2aWV3ID09PSAndW5kZWZpbmVkJyB8fCB2aWV3ID09PSBudWxsKSByZXR1cm47XG5cdFx0Ly8g0LXRgdC70LggcGxhY2Ug0L3QtSDRg9C60LDQt9Cw0L3Qviwg0YfRgtC+INCy0L7Qt9C80L7QttC90L4g0Lgg0YDQsNC30YPQvNC90L4g0L/RgNC4INC90LUg0YHRg9GJ0LXRgdGC0LLQvtCy0LDQvdC40Lhcblx0XHQvLyDRjdC70LXQvNC10L3RgtCwLCDQvdC+INC40LfQstC10YHRgtC90L7QvCDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgNC1XG5cdFx0aWYgKCgodHlwZW9mIHZpZXcucGxhY2UgPT09ICd1bmRlZmluZWQnKSB8fCAodmlldy5wbGFjZSA9PT0gbnVsbCkpICYmICh0eXBlb2Ygdmlldy5wbGFjZUlkICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3LnBsYWNlSWQgIT09IG51bGwgJiYgdmlldy5wbGFjZUlkLmxlbmd0aCA+IDApKSB7XG5cdFx0XHR2aWV3LnBsYWNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmlldy5wbGFjZUlkKTtcblx0XHR9XG5cdFx0Ly/QtdGB0LvQuCA0INCw0YDQs9GD0LzQtdC90YLQsCDQt9C90LDRh9C40YIsIGhlbHBlcnMgINC/0YDQvtC/0YPRgdGC0LjQu9C4XG5cdFx0c3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHQvL9C/0LXRgNC10L3QsNC30L3QsNGH0LDQtdC8INGB0L4g0YHQtNCy0LjQs9C+0Lxcblx0XHRcdGNhc2UgNDpcblx0XHRcdFx0cmVhbENhbGxiYWNrID0gaGVscGVycztcblx0XHRcdFx0cmVhbEhlbHBlcnMgPSB7fTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdC8v0L/QtdGA0LXQvdCw0LfQvdCw0YfQsNC10Lwg0L3QsNC/0YDRj9C80YPRjlxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmVhbEhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdFx0XHRyZWFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHR9XG5cdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRpZiAodHlwZW9mIHZpZXcuaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5oZWxwZXJzICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHZpZXcuaGVscGVycykubGVuZ3RoID4gMCkge1xuXHRcdFx0dmlldy5oZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh2aWV3LmhlbHBlcnMsIHJlYWxIZWxwZXJzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmlldy5oZWxwZXJzID0gcmVhbEhlbHBlcnM7XG5cdFx0fVxuXHRcdC8v0LXRgdC70Lgg0L3Rg9C20L3QviDQt9Cw0LPRgNGD0LbQsNGC0Ywg0YjQsNCx0LvQvtC90Ytcblx0XHRpZiAobmMucmVuZGVyRnJvbVVSTCkge1xuXHRcdFx0Ly/QuCDQsNC00YDQtdGBINC90LUg0YPQutCw0LfQsNC9XG5cdFx0XHRpZiAodHlwZW9mIHZpZXcudGVtcGxhdGVVUkwgPT09ICd1bmRlZmluZWQnIHx8IHZpZXcudGVtcGxhdGVVUkwgPT0gbnVsbCB8fCB2aWV3LnRlbXBsYXRlVVJMLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdC8v0LPQtdC90LXRgNC40YDRg9C10Lwg0LDQtNGA0LXRgSDQv9C+INGI0LDQsdC70L7QvdGDXG5cdFx0XHRcdHZpZXcudGVtcGxhdGVVUkwgPSAodmlldy5jb21tb24gPyBuYy5jb21tb25WaWV3c1ByZWZpeCA6IG5jLnZpZXdzUHJlZml4KSArICgodHlwZW9mIHZpZXcubmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5uYW1lICE9PSBudWxsICYmIHZpZXcubmFtZS5sZW5ndGggPiAwKSA/IHZpZXcubmFtZSA6IG5hbWUpICsgbmMudmlld3NQb3N0Zml4O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvL9CwINC10YHQu9C4INC10YHRgtGMINC90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAsINGC0L5cblx0XHRcdGlmICh2aWV3Lmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU5hbWUnKSkge1xuXHRcdFx0XHQvLy4uLlxuXHRcdFx0XHR2aWV3LnRlbXBsYXRlTmFtZSA9IG5jLnZpZXdzUHJlZml4ICsgdmlldy50ZW1wbGF0ZU5hbWUgKyBuYy52aWV3c1Bvc3RmaXg7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdChuZXcgbm90Q29tcG9uZW50KHZpZXcpKS5leGVjQW5kUHV0KHZpZXcucGxhY2UsIHJlYWxDYWxsYmFjayk7XG5cdH1cblxuXHRleGVjKHBhcmFtcykge1xuXHRcdC8vY29uc29sZS5sb2coJ2V4ZWMnLCB0aGlzLCBPYmplY3Qua2V5cyh0aGlzLl9fcHJvdG9fXykpO1xuXHRcdGlmICh0eXBlb2YoKHdpbmRvd1t0aGlzLm5jTmFtZV0pKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdC8v0LjRidC10Lwg0LjQvNC10L3QsCDRgNCw0LfQtNC10LvRj9C10LzRi9GFINGE0YPQvdC60YbQuNC5XG5cdFx0XHR2YXIgc2hhcmVkTGlzdCA9IE9iamVjdC5rZXlzKHRoaXMuX19wcm90b19fKS5maWx0ZXIoZnVuY3Rpb24oa2V5KSB7XG5cdFx0XHRcdHJldHVybiAoa2V5LmluZGV4T2YoJyQnKSA9PT0gMCk7XG5cdFx0XHR9KTtcblx0XHRcdC8v0LfQsNC60LjQtNGL0LLQsNC10Lwg0LjRhSDQsiDQvdC+0LLRg9GOINGE0YPQvdC60YbQuNGOXG5cdFx0XHRpZiAoc2hhcmVkTGlzdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGsgaW4gc2hhcmVkTGlzdCkge1xuXHRcdFx0XHRcdHdpbmRvd1t0aGlzLm5jTmFtZV0ucHJvdG90eXBlW3NoYXJlZExpc3Rba11dID0gdGhpcy5fX3Byb3RvX19bc2hhcmVkTGlzdFtrXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG5ldyh3aW5kb3dbdGhpcy5uY05hbWVdKSh0aGlzLmFwcCwgcGFyYW1zKTtcblx0XHRcdC8vY29uc29sZS5sb2cobmV3KHdpbmRvd1t0aGlzLm5jTmFtZV0pKHRoaXMuYXBwLCBwYXJhbXMpKTtcblx0XHRcdC8vY29uc29sZS5sb2coJ2FmdGVyIG5ldyBjb250cm9sbGVyJyk7XG5cdFx0fSBlbHNlIHtcblxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb250cm9sbGVyO1xuIiwiLyogZ2xvYmFsIHJvdXRpZSAqL1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdEZvcm1GYWN0b3J5IGZyb20gJy4vY29tcG9uZW50cy9ub3RGb3JtRmFjdG9yeSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFZpZXcgZnJvbSAnLi9jb21wb25lbnRzL25vdFZpZXcnO1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi9ub3RDb250cm9sbGVyJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5cbmNvbnN0IE9QVF9DT05UUk9MTEVSX1BSRUZJWCA9ICduYycsXG5cdE9QVF9SRUNPUkRfUFJFRklYID0gJ25yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QXBwIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG5vdE1hbmlmZXN0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBhcHAnKTtcblx0XHR0aGlzLnNldE9wdGlvbnMobm90TWFuaWZlc3QpO1xuXHRcdHRoaXMucmVzb3VyY2VzID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGludGVyZmFjZXM6IHt9LFxuXHRcdFx0Y29udHJvbGxlcnM6IHt9LFxuXHRcdFx0aW5pdENvbnRyb2xsZXI6IG51bGwsXG5cdFx0XHRjdXJyZW50Q29udHJvbGxlcjogbnVsbCxcblx0XHRcdGZvcm1zOiB7fVxuXHRcdH0pO1xuXHRcdHRoaXMuaW5pdCgpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdCgpIHtcblx0XHR2YXIgdXJsID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdFVSTCcpLFxuXHRcdFx0c3VjY2VzcyA9IHRoaXMuc2V0SW50ZXJmYWNlTWFuaWZlc3QuYmluZCh0aGlzKTtcblx0XHRub3RDb21tb24uZ2V0SlNPTih1cmwsIHt9KVxuXHRcdFx0LnRoZW4oc3VjY2Vzcylcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0LmJpbmQodGhpcykpO1xuXHR9XG5cblx0c2V0SW50ZXJmYWNlTWFuaWZlc3QobWFuaWZlc3QpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JywgbWFuaWZlc3QpO1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdC8v0L3Rg9C20L3QviDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0YLRjFxuXHRcdC8v0LzQvtC00LXQu9C4INC/0L7Qu9GD0YfQtdC90L3Ri9C80Lgg0LjQvdGC0LXRgNGE0LXQudGB0LDQvNC4XG5cdFx0dGhpcy51cGRhdGVJbnRlcmZhY2VzKCk7XG5cdFx0Ly/RgdC+0LfQtNCw0L3QuNC1INC+0LHRitC10LrRgtC+0LIg0LDQstGC0L7Qs9C10L3QtdGA0LDRhtC40Y8g0YTQvtGA0Lxcblx0XHR0aGlzLmluaXRGb3JtQnVpbGRlcnMoKTtcblx0XHQvL9C40L3QuNGG0LjQu9C40YbQuNGA0L7QstCw0YLRjCDQuCDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YAg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0XHR0aGlzLmluaXRDb250cm9sbGVyKCk7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXJ0QXBwKCkge1xuXHRcdC8v0YHQvtC30LTQsNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdC8v0YDQvtGD0YLQtdGAINC4INC/0YDQuNCy0Y/Qt9Cw0YLRjCDQuiDQvdC10LzRgyDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0dGhpcy5pbml0Um91dGVyKCk7XG5cdH1cblxuXHRiaW5kQ29udHJvbGxlcihjb250cm9sbGVyTmFtZSkge1xuXHRcdHZhciBjdHJsID0gbmV3IG5vdENvbnRyb2xsZXIodGhpcywgY29udHJvbGxlck5hbWUpO1xuXHRcdHJldHVybiBjdHJsLmV4ZWMuYmluZChjdHJsKTtcblx0fVxuXG5cdGluaXRDb250cm9sbGVyKCkge1xuXHRcdGlmICh0eXBlb2YodGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnaW5pdENvbnRyb2xsZXInLCBuZXcgbm90Q29udHJvbGxlcih0aGlzLCB0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJykpKTtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnaW5pdENvbnRyb2xsZXInKS5leGVjKCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdFJvdXRlcigpIHtcblx0XHR2YXIgcm91dGllSW5wdXQgPSB7fTtcblx0XHR0aGlzLmdldE9wdGlvbnMoJ3NpdGVNYW5pZmVzdCcpLmZvckVhY2goKHJvdXRlLCBjb250cm9sbGVyTmFtZSk9Pntcblx0XHRcdHJvdXRpZUlucHV0W3JvdXRlXSA9IHRoaXMuYmluZENvbnRyb2xsZXIoY29udHJvbGxlck5hbWUpO1xuXHRcdH0pO1xuXHRcdHRoaXMuc2V0V29ya2luZygncm91dGVyJywgcm91dGllKHJvdXRpZUlucHV0KSk7XG5cdH1cblxuXHRnZXRDdXJyZW50Q29udHJvbGxlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicpO1xuXHR9XG5cblx0c2V0Q3VycmVudENvbnRyb2xsZXIoY3RybCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInLCBjdHJsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHVwZGF0ZUludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5jbGVhckludGVyZmFjZXMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpKSB7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JykuZm9yRWFjaCh0aGlzLmluaXRJbnRlcmZhY2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0UmVjb3JkTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9SRUNPUkRfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldENvbnRyb2xsZXJOYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX0NPTlRST0xMRVJfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGluaXRJbnRlcmZhY2UoaW5kZXgsIG1hbmlmZXN0KSB7XG5cdFx0Ly9jb25zb2xlLmxvZyhpbmRleCwgbWFuaWZlc3QpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW3RoaXMuZ2V0UmVjb3JkTmFtZShpbmRleCldID0gbmV3IG5vdFJlY29yZChtYW5pZmVzdCk7XG5cdH1cblxuXHRucihtb2RlbE5hbWUsIGRhdGEpIHtcblx0XHR2YXIgbWFuaWZlc3QgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JykuaGFzT3duUHJvcGVydHkobW9kZWxOYW1lKSA/IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKVttb2RlbE5hbWVdIDoge307XG5cdFx0Ly9jb25zb2xlLmxvZyhtb2RlbE5hbWUsIG1hbmlmZXN0LCBkYXRhKTtcblx0XHRyZXR1cm4gbmV3IG5vdFJlY29yZChtYW5pZmVzdCwgZGF0YSk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKTtcblx0fVxuXG5cdGNsZWFySW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ludGVyZmFjZXMnLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0Rm9ybUJ1aWxkZXJzKCkge1xuXHRcdHRoaXMuY2xlYXJGb3JtQnVpbGRlcnMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmb3JtcycpKSB7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ2Zvcm1zJykuZm9yRWFjaCh0aGlzLmluaXRGb3JtQnVpbGRlci5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRpbml0Rm9ybUJ1aWxkZXIoaW5kZXgsIG1hbmlmZXN0KSB7XG5cdFx0bGV0IHBhdGggPSBub3RQYXRoLmpvaW4oJ2Zvcm1zJywgaW5kZXgpO1xuXHRcdHRoaXMuc2V0V29ya2luZyhwYXRoLCBuZXcgbm90Rm9ybUZhY3RvcnkodGhpcywgbWFuaWZlc3QpKTtcblx0XHR0aGlzLmdldFdvcmtpbmcocGF0aCkuaW5pdCh0aGlzLndhaXRUaGlzUmVzb3VyY2UoJ2Zvcm0nLCBpbmRleCkpO1xuXHR9XG5cblx0Z2V0Rm9ybUJ1aWxkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2Zvcm1zJyk7XG5cdH1cblxuXHRjbGVhckZvcm1CdWlsZGVycygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2Zvcm1zJywge30pO1xuXHR9XG5cblx0d2FpdFRoaXNSZXNvdXJjZSh0eXBlLCBpbmRleCkge1xuXHRcdGlmICghdGhpcy5yZXNvdXJjZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcblx0XHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdID0ge307XG5cdFx0fVxuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IGZhbHNlO1xuXHRcdHJldHVybiB0aGlzLm9uUmVzb3VyY2VSZWFkeS5iaW5kKHRoaXMsIHR5cGUsIGluZGV4KTtcblx0fVxuXG5cdG9uUmVzb3VyY2VSZWFkeSh0eXBlLCBpbmRleCkge1xuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IHRydWU7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdGFsbFJlc291cmNlc1JlYWR5KCkge1xuXHRcdHZhciBpLCBqO1xuXHRcdGZvciAoaSBpbiB0aGlzLnJlc291cmNlcykge1xuXHRcdFx0Zm9yIChqIGluIHRoaXMucmVzb3VyY2VzW2ldKSB7XG5cdFx0XHRcdGlmICghdGhpcy5yZXNvdXJjZXNbaV1bal0pIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRnZXRPcHRpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ29wdGlvbnMnKTtcblx0fVxufVxuIiwiaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aC5qcyc7XG5cbnZhciBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgPSB7XG5cdGNvbnRlbnQ6ZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMuaW5kZXhPZignY2FwaXRhbGl6ZScpID4gLTEpe1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0LnRvVXBwZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQudGV4dENvbnRlbnQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQ7XG5cdH0sXG5cdGJpbmQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoc2NvcGUucGFyYW1zWzBdLCAoZSk9Pntcblx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KXtcblx0XHRcdFx0cmV0dXJuIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCh7c2NvcGUsIGl0ZW0sIGhlbHBlcnMsIGV9KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0dmFsdWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRsZXQgbGl2ZUV2ZW50cyA9IFsnY2hhbmdlJywgJ2tleXVwJ10sXG5cdFx0XHRvbkV2ZW50ID0gKCk9Pm5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSAhPT0gdHJ1ZSl7XG5cdFx0XHRmb3IobGV0IHQgb2YgbGl2ZUV2ZW50cyl7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0LCBvbkV2ZW50KTtcblx0XHRcdH1cblx0XHRcdHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0YXR0cjogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpP3Jlcyh7c2NvcGUsIGl0ZW0sIGhlbHBlcnN9KTpyZXMpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKHNjb3BlLnBhcmFtc1swXSwgc2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0fSxcblx0bmFtZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbigvKnNjb3BlLCBpdGVtLCBoZWxwZXJzKi8pe1xuXG5cdH0sXG5cdGNoZWNrZWQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJyk/cmVzdWx0KHtzY29wZSwgaXRlbSwgaGVscGVyc30pOnJlc3VsdCk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID8gc2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKSA6IHNjb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG5cdH0sXG5cdGNsYXNzOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpP3Jlcyh7c2NvcGUsIGl0ZW0sIGhlbHBlcnN9KTpyZXMpO1xuXHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzBdKTtcblx0XHR9XG5cdH0sXG5cdG9wdGlvbnM6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0b3B0aW9uID0gbnVsbCxcblx0XHRcdHZhbHVlRmllbGROYW1lID0gJ3ZhbHVlJyxcblx0XHRcdGxhYmVsRmllbGROYW1lID0gJ25hbWUnLFxuXHRcdFx0c3ViTGliID0gdW5kZWZpbmVkLFxuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGROYW1lJykgPyBoZWxwZXJzWydmaWVsZE5hbWUnXSA6ICd2YWx1ZSc7XG5cdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBoZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWxwZXJzICE9PSBudWxsICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ29wdGlvbicpKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IGhlbHBlcnMub3B0aW9uLmxhYmVsO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBoZWxwZXJzLm9wdGlvbi52YWx1ZTtcblx0XHR9XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAyKSB7XG5cdFx0XHRpdGVtVmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMl07XG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMyAmJiBzY29wZS5wYXJhbXNbM10gPT09ICdkaWZmZXJlbnQnKSB7XG5cdFx0XHRzdWJMaWIgPSB2YWx1ZUZpZWxkTmFtZTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBoZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWxwZXJzICE9PSBudWxsICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkUGxhY2VIb2xkZXInKSAmJiBoZWxwZXJzLmhhc093blByb3BlcnR5KCdmaWVsZFBsYWNlSG9sZGVyRGVmYXVsdCcpICYmIGhlbHBlcnMuZmllbGRQbGFjZUhvbGRlckRlZmF1bHQpIHtcblx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyk7XG5cdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBoZWxwZXJzLmZpZWxkUGxhY2VIb2xkZXI7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0dmFyIGxpYiA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0aWYgKC8qZGlmZmVyZW50ICYmKi8gc3ViTGliICYmIGxpYi5oYXNPd25Qcm9wZXJ0eShzdWJMaWIpKSB7XG5cdFx0XHRcdGxpYiA9IGxpYltzdWJMaWJdO1xuXHRcdFx0fVxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxpYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKTtcblx0XHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gbGliW2ldW2xhYmVsRmllbGROYW1lXTtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdKSkge1xuXHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0uaW5kZXhPZihsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdID09PSBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSB7XG5cdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuZXhwb3J0IGRlZmF1bHQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliO1xuIiwiaW1wb3J0ICBub3RDb21wb25lbnQgIGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEZvcm0gZXh0ZW5kcyBub3RDb21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuXHRcdHRoaXMuc2V0V29ya2luZyh7fSk7XG5cdFx0dGhpcy5vbignc3VibWl0JywgdGhpcy5vblN1Ym1pdCk7XG5cdFx0dGhpcy5vbigncmVzZXQnLCB0aGlzLm9uUmVzZXQpO1xuXHRcdHRoaXMub24oJ2NhbmNlbCcsIHRoaXMub25DYW5jZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Lypcblx0XHRSZW5kZXJpbmdcblx0Ki9cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0XHR0aGlzLnJlbmRlckNvbXBvbmVudHMoKTtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKXtcblxuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpe1xuXG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdGNvbGxlY3REYXRhKCl7XG5cblx0fVxuXG5cdC8qXG5cdFx0RXZlbnQgaGFuZGxlcnNcblx0Ki9cblxuXHRvblN1Ym1pdCgpe1xuXG5cdH1cblxuXHRvblJlc2V0KCl7XG5cblx0fVxuXG5cdG9uQ2FuY2VsKCl7XG5cblx0fVxufVxuIiwiaW1wb3J0IG5vdENvbXBvbmVudCAgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90VGFibGUgZXh0ZW5kcyBub3RDb21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuIiwiLypcblx0Q29tbW9uIGZ1bmN0aW9uc1xuKi9cbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuLypcblx0ZnJhbWV3b3JrIHdpZGUgcGFyc2VyIGZvciBkYXRhIGFjY2Vzc1xuKi9cbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuLypcblx0YmFzaWMgZXZlbnQgaGFuZGxlcnMgYW5kIGNvcmUgZGF0YSBtb2RpZmllcnNcbiovXG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuLypcblx0c21hcnRlciBpbWFnZSBjb250cm9sXG4qL1xuaW1wb3J0IG5vdEltYWdlIGZyb20gJy4vdGVtcGxhdGUvbm90SW1hZ2UnO1xuLypcblx0YXBwbGljYXRpb24gbWFpbiBpbmZyYXN0cnVjdHVyZSBzZXR0ZXJcbiovXG5pbXBvcnQgbm90QXBwIGZyb20gJy4vbm90QXBwJztcbi8qXG5cdGRhZGR5IGZvciB1c2VyIGNvbnRyb2xsZXJzXG4qL1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi9ub3RDb250cm9sbGVyJztcbi8qXG5cdHRlbXBsYXRpbmcgYW5kIGNvbW1vbiBzdHJ1Y3R1cmVzXG4qL1xuXG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RSZW5kZXJlcic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnOyAvLyBzbWFydGVyIHdpdGggYmluZGluZ3MgZm9yIGV2ZW50cywgYWN0dWFseSBwcm94eVxuXG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbm90Rm9ybSc7XG5pbXBvcnQgbm90VGFibGUgZnJvbSAnLi9jb21wb25lbnRzL25vdFRhYmxlJztcbmltcG9ydCBub3RWaWV3IGZyb20gJy4vY29tcG9uZW50cy9ub3RWaWV3JztcblxuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7IC8vXHRob3cgdG8gaW50ZXJhY3Qgd2l0aCBkYXRhIG9uIHNlcnZlclxuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7IC8vXHR3cmFwcGVyIGZvciBkYXRhIHdpdGggc2VydmVyPC0+dmlldyBsaXZlIGludGVyYWN0aW9uc1xuXG5ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuYWRkKG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYik7XG5cbmV4cG9ydCB7XG5cdG5vdENvbW1vbixcblx0bm90UGF0aCxcblx0bm90QmFzZSxcblx0bm90SW1hZ2UsXG5cdG5vdEFwcCxcblx0bm90QVBJLFxuXHRub3RDb250cm9sbGVyLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnMsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYixcblx0bm90VGVtcGxhdGVDYWNoZSxcblx0bm90UmVuZGVyZXIsXG5cdG5vdENvbXBvbmVudCxcblx0bm90Rm9ybSxcblx0bm90VGFibGUsXG5cdG5vdFZpZXcsXG5cdG5vdFJlY29yZCxcblx0bm90UmVjb3JkSW50ZXJmYWNlXG59O1xuIl0sIm5hbWVzIjpbIkNvbW1vbk5ldHdvcmsiLCJ1cmkiLCJnZXQiLCJkYXRhQXJyYXkiLCJmaWVsZHMiLCJpIiwiZiIsImhhc093blByb3BlcnR5IiwiaW1hZ2UiLCJJbWFnZSIsInNldEF0dHJpYnV0ZSIsInNyYyIsImluZGV4T2YiLCJhZGRQcm90b2NvbCIsIm1ldGhvZCIsInVybCIsImRhdGEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJnZXRTZXNzaW9uSUQiLCJyZXNwb25zZVR5cGUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJvbmxvYWQiLCJzdGF0dXMiLCJyZXNwb25zZSIsInQiLCJvbmVycm9yIiwib250aW1lb3V0Iiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0aGF0IiwicGFyc2VJbnQiLCJyZXNwb25zZVRleHQiLCJlIiwiQ29tbW9uTG9ncyIsImxvZyIsImFyZ3VtZW50cyIsImVycm9yIiwidHJhY2UiLCJNQVBfTUFOQUdFUiIsIlN5bWJvbCIsIkNvbW1vblNob3J0cyIsImdldE1hbmFnZXIiLCJnZXRBUEkiLCJ2IiwiQ29tbW9uT2JqZWN0cyIsImRlZmF1bHRzIiwib3B0aW9ucyIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImNhbGwiLCJ0YXJnZXQiLCJzb3VyY2VzIiwiZm9yRWFjaCIsImRlc2NyaXB0b3JzIiwia2V5cyIsInNvdXJjZSIsInJlZHVjZSIsImtleSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldE93blByb3BlcnR5U3ltYm9scyIsImRlc2NyaXB0b3IiLCJzeW0iLCJlbnVtZXJhYmxlIiwiZGVmaW5lUHJvcGVydGllcyIsImJpZyIsInNtYWxsIiwib2JqIiwiZmlsdGVyIiwiY29udGFpbnNPYmoiLCJpY29ucyIsImJhdGNoIiwibGVuZ3RoIiwiZ2V0RGF0YSIsInB1c2giLCJhIiwiYiIsInAiLCJlcXVhbCIsInRvU3RyaW5nIiwiZGVmYXVsdFZhbHVlIiwib2JqMSIsIm9iajIiLCJqUXVlcnkiLCJleHRlbmQiLCJ2YWwiLCJyZWdpc3RyeSIsIkNvbW1vblN0cmluZ3MiLCJzdHJpbmciLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9Mb3dlckNhc2UiLCJDb21tb25GdW5jdGlvbnMiLCJmdW5jcyIsInJlc3VsdCIsImZ1bmMiLCJDb21tb25ET00iLCJlbCIsInN0YXJ0c1dpdGgiLCJhbGxFbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsaXN0IiwiaiIsImF0dHMiLCJhdHRyaWJ1dGVzIiwibiIsIm5vZGVOYW1lIiwibm90Q29tbW9uIiwiYXNzaWduIiwiZXh0ZW5kV2l0aCIsIlNVQl9QQVRIX1NUQVJUIiwiU1VCX1BBVEhfRU5EIiwiUEFUSF9TUExJVCIsIlBBVEhfU1RBUlRfT0JKRUNUIiwiUEFUSF9TVEFSVF9IRUxQRVJTIiwiRlVOQ1RJT05fTUFSS0VSIiwiTUFYX0RFRVAiLCJub3RQYXRoIiwicGF0aCIsInN1YlBhdGgiLCJmaW5kIiwic3ViIiwicGFyc2VkIiwic3ViZiIsInJlcGxhY2UiLCJpdGVtIiwiaGVscGVycyIsInN1YlBhdGhQYXJzZWQiLCJmaW5kTmV4dFN1YlBhdGgiLCJnZXRWYWx1ZUJ5UGF0aCIsInJlcGxhY2VTdWJQYXRoIiwicGFyc2VTdWJzIiwiYXR0clZhbHVlIiwic2V0VmFsdWVCeVBhdGgiLCJpc1JlY29yZCIsIm5vcm1pbGl6ZVBhdGgiLCJ0cmlnZ2VyIiwic3RlcCIsImhlbHBlciIsInJTdGVwIiwidW5kZWZpbmVkIiwiQXJyYXkiLCJpc0FycmF5Iiwic3BsaXQiLCJwYXJzZVBhdGhTdGVwIiwib2JqZWN0IiwiYXR0clBhdGgiLCJhdHRyTmFtZSIsInNoaWZ0IiwiaXNGdW5jdGlvbiIsIm5ld09iaiIsImFyZ3MiLCJqb2luIiwiTUVUQV9FVkVOVFMiLCJNRVRBX0RBVEEiLCJNRVRBX1dPUktJTkciLCJNRVRBX09QVElPTlMiLCJub3RCYXNlIiwid2hhdCIsInNldCIsInJlcyIsInNldENvbW1vbiIsImdldENvbW1vbiIsImdldE9wdGlvbnMiLCJnZXRXb3JraW5nIiwiZXZlbnROYW1lcyIsImV2ZW50Q2FsbGJhY2tzIiwib25jZSIsImRlZmluZUlmTm90RXhpc3RzIiwibmFtZSIsImZyb20iLCJldmVudE5hbWUiLCJldmVudCIsIm9mZiIsImNhbGxiYWNrcyIsImNhbGxiYWNrIiwidGFyZ2V0SWQiLCJzcGxpY2UiLCJub3RBUElPcHRpb25zIiwibm90QVBJUXVlZSIsInJlcXVlc3RzUGVyU2Vjb25kIiwicXVlZSIsImludCIsIndpbmRvdyIsInNldEludGVydmFsIiwiY2hlY2siLCJiaW5kIiwiaW5Qcm9ncmVzcyIsInRvQ2FsbCIsImNsZWFySW50ZXJ2YWwiLCJydW4iLCJub3RBUEkiLCJzZXRPcHRpb25zIiwicGFydHMiLCJpZCIsImdvb2QiLCJiYWQiLCJhZGQiLCJtYWtlUmVxdWVzdCIsInJlc3BvbnNlT0siLCJyZXNwb25zZUZhaWxlZCIsInJlcXVlc3RKU09OIiwidGhlbiIsIm5leHQiLCJjYXRjaCIsImNvZGUiLCJnZXRJZCIsIm1vZGVsTmFtZSIsImdldE1vZGVsTmFtZSIsIm1ha2VVcmwiLCJnZXRKU09OIiwiZ2V0TW9kZWwiLCJzZXRQcmljZSIsIm1vZGVsIiwibm90SW1hZ2UiLCJub3RJbnRlcmZhY2UiLCJtYW5pZmVzdCIsImxpbmUiLCJyZWNvcmQiLCJhY3Rpb25OYW1lIiwicmVjb3JkUkUiLCJmaWVsZE5hbWUiLCJpbmQiLCJsZW4iLCJpbmQyIiwic3RhcnRTbGljZSIsImVuZFNsaWNlIiwiZ2V0QXR0ciIsImFjdGlvbkRhdGEiLCJwYXJzZUxpbmUiLCJwb3N0Rml4IiwiZ2V0QWN0aW9ucyIsImFjdGlvbnMiLCJ2YWx1ZSIsInNldEZpbHRlciIsImZpbHRlckRhdGEiLCJzZXRNb2RlbFBhcmFtIiwiZ2V0TW9kZWxQYXJhbSIsInNvcnRlckRhdGEiLCJwYWdlTnVtYmVyIiwicGFnZVNpemUiLCJwYXJhbU5hbWUiLCJwYXJhbVZhbHVlIiwiZ2V0QWN0aW9uRGF0YSIsImdldFVSTCIsInF1ZWVSZXF1ZXN0Iiwib25Mb2FkIiwibm90UmVjb3JkIiwiTUVUQV9JTlRFUkZBQ0UiLCJNRVRBX1BST1hZIiwiTUVUQV9DSEFOR0UiLCJNRVRBX0NIQU5HRV9ORVNURUQiLCJNRVRBX1NBTCIsIkRFRkFVTFRfQUNUSU9OX1BSRUZJWCIsIkRFRkFVTFRfUEFHRV9OVU1CRVIiLCJERUZBVUxUX1BBR0VfU0laRSIsIk1FVEFfUkVUVVJOX1RPX1JPT1QiLCJjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzIiwib3duZXIiLCJjb250ZXh0IiwicmVzVGFyZ2V0IiwiUmVmbGVjdCIsIkVycm9yIiwidmFsdWVUb1JlZmxlY3QiLCJub3RQcm9wZXJ0eSIsImdldFJvb3QiLCJwYXRoVG8iLCJpc1Byb3h5IiwiUHJveHkiLCJzZXREYXRhIiwib24iLCJwcm94eSIsInJvb3QiLCJjcmVhdGVSZWNvcmRIYW5kbGVycyIsImNyZWF0ZUNvbGxlY3Rpb24iLCJub3RSZWNvcmRJbnRlcmZhY2UiLCJpbml0UHJvcGVydGllcyIsImludGVyZmFjZVVwIiwiY3VyUGF0aCIsImJhYmVsSGVscGVycy50eXBlb2YiLCJpdGVtcyIsImNvbGxlY3Rpb24iLCJnZXRBY3Rpb25zQ291bnQiLCJhY3Rpb25VcCIsImluZGV4IiwicmVxdWVzdCIsIm9iamVjdFBhcnQiLCJzZXRBdHRyIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYIiwiVEVNUExBVEVfVEFHIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgiLCJDT01QT05FTlRfSURfUFJFRklYIiwiUEFSVF9JRF9QUkVGSVgiLCJERUZBVUxUX1BMQUNFUiIsIkRFRkFVTFRfUExBQ0VSX0xPT1AiLCJPUFRTIiwiTUVUQV9DQUNIRSIsIm5vdFRlbXBsYXRlQ2FjaGUiLCJzZXRXb3JraW5nIiwiaGlkZVRlbXBsYXRlcyIsInJlZ2lzdGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibWFwIiwibG9hZE9uZSIsIm9SZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpdiIsImRhdGFzZXQiLCJub3RUZW1wbGF0ZU5hbWUiLCJub3RUZW1wbGF0ZVVSTCIsInNyY0VsZW1lbnQiLCJzZXRPbmUiLCJlbGVtZW50IiwiY2xvbmVOb2RlIiwiY29udCIsInRleHQiLCJub3RUZW1wbGF0ZXNFbGVtZW50cyIsImVsSWQiLCJwYXJlbnROb2RlIiwibGliIiwiZ2V0SFRNTCIsInRlbXBsYXRlSW5uZXJIVE1MIiwidGVtcGxhdGVDb250RWwiLCJ3cmFwIiwidGVtcGxhdGVzSFRNTCIsInRlbXBsYXRlcyIsInBhcnNlTGliIiwiYWRkTGliIiwic2VsZWN0b3JPckVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGFnTmFtZSIsIk1FVEFfUFJPQ0VTU09SUyIsIm5vdFRlbXBsYXRlUHJvY2Vzc29ycyIsInNldFByb2Nlc3NvciIsImdldFByb2Nlc3NvciIsIk1FVEFfQ09NUE9ORU5UUyIsIm5vdFJlbmRlcmVyIiwiaW5wdXQiLCJpbml0IiwicmVuZGVyIiwiY29tcG9uZW50IiwiaW5pdERhdGEiLCJpbml0T3B0aW9ucyIsImluaXRXb3JraW5nIiwidGVtcGxhdGUiLCJpbml0VGVtcGxhdGUiLCJvbkNoYW5nZSIsIk1hdGgiLCJyYW5kb20iLCJnZXRCcmVhZENydW1wcyIsInVwZGF0ZSIsImNsZWFyU3Rhc2giLCJzZXRXb3JraW5nTWFwcGluZyIsImV4ZWNQcm9jZXNzb3JzIiwic2VhcmNoRm9yU3ViVGVtcGxhdGVzIiwic3Rhc2hSZW5kZXJlZCIsImlmUGFydCIsImNvbXBvbmVudFBhdGgiLCJjaGFuZ2VkUGF0aCIsImlmRnVsbFN1YlBhdGgiLCJjcmVhdGVNYXBwaW5nIiwiZmluZEFsbFByb2Nlc3NvcnMiLCJwcm9jcyIsImVscyIsImdldEF0dHJpYnV0ZXNTdGFydHNXaXRoIiwiZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCIsInByb2NEYXRhIiwicGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uIiwicHJvY2Vzc29yRXhwcmVzc2lvbiIsImF0dHJpYnV0ZUV4cHJlc3Npb24iLCJpZkNvbmRpdGlvbiIsInBhcmFtcyIsInByb2Nlc3Nvck5hbWUiLCJtYXBwaW5nIiwicHJvY1Njb3BlIiwiYXR0cmlidXRlUmVzdWx0IiwiZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdCIsInByb2NOYW1lIiwicHJvYyIsInJlbW92ZUF0dHJpYnV0ZSIsImRlc3Ryb3lTdWJzIiwiZGVzdHJveSIsImNsZWFyU3ViVGVtcGxhdGVzIiwiZ2V0U3Rhc2giLCJyZW1vdmVDaGlsZCIsIm50RWwiLCJudFJlbmRlcmVkIiwic3VicyIsIm50IiwiaWZTdWJFbGVtZW50UmVuZGVyZWQiLCJyZW5kZXJTdWIiLCJkZXRhaWxzIiwiZGF0YVBhdGgiLCJub3RDb21wb25lbnQiLCJjaGlsZE5vZGVzIiwiYWRkVG9TdGFzaCIsInN0YXNoIiwibmV3U3Rhc2giLCJhbmNob3IiLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsIm5vZGUiLCJwbGFjZSIsInRhcmdldEVsIiwiY2hpbGRyZW4iLCJyZW5kZXJlZCIsInBsYWNlQWZ0ZXIiLCJwbGFjZUJlZm9yZSIsInBsYWNlRmlyc3QiLCJwbGFjZUxhc3QiLCJub3RQbGFjZXJzIiwiTUVUQV9QQVJUUyIsInJlc2V0UGFydHMiLCJpbml0RXZlbnRzIiwiZXZlbnRzIiwicHJlcGFyZVRlbXBsYXRlRWxlbWVudCIsImluaXRNYXJrRWxlbWVudCIsIm1hcmtFbCIsInBsYWNlciIsImdldFBsYWNlciIsIm1haW4iLCJ1bnNldFJlYWR5IiwiaHRtbCIsInNldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiZ2V0RnJvbVVSTCIsInJlcG9ydCIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiY2xlYXJQYXJ0cyIsImZvckVhY2hEYXRhIiwicmVuZGVyUGFydCIsInBsYWNlUmVuZGVyZWQiLCJyZW1vdmVPYnNvbGV0ZVBhcnRzIiwicGxhY2VQYXJ0IiwicGFydCIsImdldFBhcnRCeURhdGEiLCJub2RlcyIsImxhc3ROb2RlIiwibm9kZVR5cGUiLCJnZXRQYXJ0cyIsInJlbmRlcmVyIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSIsImFkZFBhcnQiLCJ1cGRhdGVQYXJ0IiwicGlwZSIsImZpbmRBY3R1YWxQYXJ0cyIsInJlbW92ZU5vdEFjdHVhbFBhcnRzIiwiYWN0dWFsUGFydHMiLCJpc0RhdGEiLCJub3RGb3JtRmFjdG9yeSIsIm9uU3VibWl0Iiwib25SZXNldCIsIm9uQ2FuY2VsIiwicmVuZGVyV3JhcHBlciIsInJlbmRlckNvbXBvbmVudHMiLCJub3RWaWV3IiwiZGVmYXVsdFJlc3VsdCIsImJvZHkiLCJnZXRUZW1wbGF0ZU9wdGlvbnMiLCJub3RDb250cm9sbGVyIiwiYXBwIiwiY29udHJvbGxlck5hbWUiLCJuY05hbWUiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJjb250YWluZXJTZWxlY3RvciIsInZpZXdzUG9zdGZpeCIsInJlbmRlckZyb21VUkwiLCJnZXRJbnRlcmZhY2VzIiwiaW50ZXJmYWMzIiwibmMiLCJ2aWV3Iiwidmlld3MiLCJyZWFsQ2FsbGJhY2siLCJyZWFsSGVscGVycyIsInBsYWNlSWQiLCJnZXRFbGVtZW50QnlJZCIsInRlbXBsYXRlVVJMIiwiY29tbW9uIiwiY29tbW9uVmlld3NQcmVmaXgiLCJ2aWV3c1ByZWZpeCIsInRlbXBsYXRlTmFtZSIsImV4ZWNBbmRQdXQiLCJzaGFyZWRMaXN0IiwiX19wcm90b19fIiwiayIsIk9QVF9DT05UUk9MTEVSX1BSRUZJWCIsIk9QVF9SRUNPUkRfUFJFRklYIiwibm90QXBwIiwibm90TWFuaWZlc3QiLCJyZXNvdXJjZXMiLCJzdWNjZXNzIiwic2V0SW50ZXJmYWNlTWFuaWZlc3QiLCJ1cGRhdGVJbnRlcmZhY2VzIiwiaW5pdEZvcm1CdWlsZGVycyIsImluaXRDb250cm9sbGVyIiwiYWxsUmVzb3VyY2VzUmVhZHkiLCJzdGFydEFwcCIsImluaXRSb3V0ZXIiLCJjdHJsIiwiZXhlYyIsInJvdXRpZUlucHV0Iiwicm91dGUiLCJiaW5kQ29udHJvbGxlciIsInJvdXRpZSIsImNsZWFySW50ZXJmYWNlcyIsImluaXRJbnRlcmZhY2UiLCJnZXRSZWNvcmROYW1lIiwiY2xlYXJGb3JtQnVpbGRlcnMiLCJpbml0Rm9ybUJ1aWxkZXIiLCJ3YWl0VGhpc1Jlc291cmNlIiwidHlwZSIsIm9uUmVzb3VyY2VSZWFkeSIsIm5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiIsInNjb3BlIiwidGV4dENvbnRlbnQiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsImxpdmVFdmVudHMiLCJvbkV2ZW50IiwicHJvY2Vzc2VkVmFsdWUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJvcHRpb24iLCJ2YWx1ZUZpZWxkTmFtZSIsImxhYmVsRmllbGROYW1lIiwic3ViTGliIiwiaXRlbVZhbHVlRmllbGROYW1lIiwibGFiZWwiLCJmaWVsZFBsYWNlSG9sZGVyRGVmYXVsdCIsImZpZWxkUGxhY2VIb2xkZXIiLCJub3RGb3JtIiwibm90VGFibGUiXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWE7U0FDZCxLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFhO1NBQ2xCLEtBQUtDLEdBQUwsQ0FBUyxVQUFULElBQXVCRCxHQUE5QjtFQUxrQjtnQkFPSix1QkFBU0UsU0FBVCxFQUFvQkMsTUFBcEIsRUFBNEI7T0FDdEMsSUFBSUMsQ0FBUixJQUFhRixTQUFiLEVBQXdCO1FBQ25CLElBQUlHLENBQVIsSUFBYUYsTUFBYixFQUFxQjtRQUNqQkQsVUFBVUUsQ0FBVixFQUFhRSxjQUFiLENBQTRCSCxPQUFPRSxDQUFQLENBQTVCLENBQUgsRUFBMkM7U0FDdENFLFFBQVEsSUFBSUMsS0FBSixFQUFaO1dBQ01DLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsV0FBbEM7V0FDTUMsR0FBTixHQUFZUixVQUFVRSxDQUFWLEVBQWFELE9BQU9FLENBQVAsQ0FBYixFQUF3Qk0sT0FBeEIsQ0FBZ0MsSUFBaEMs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
