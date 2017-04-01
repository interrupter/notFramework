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
	putFile: function putFile(upload /* object(file, onProgress, url)*/) {
		var _this = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			if (xhr.upload) {
				// progress bar
				if (upload.onProgress) {
					xhr.upload.addEventListener('progress', upload.onProgress, false);
				}
				// file received/failed
				xhr.responseType = 'json';
				xhr.onreadystatechange = function () /*e*/{
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							resolve(xhr.response);
						} else {
							reject(xhr.status, xhr.response);
						}
					}
				};
				// start upload
				xhr.withCredentials = true;
				xhr.open('PUT', upload.url, true);
				xhr.setRequestHeader('SessionID', _this.getSessionID());
				xhr.setRequestHeader('Content-Type', upload.file.type);
				xhr.setRequestHeader('X_FILENAME', encodeURIComponent(upload.file.name));
				xhr.send(upload.file);
			} else {
				reject();
			}
		});
	},

	requestJSON: function requestJSON(method, url, data) {
		var _this2 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
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
	getJSON: function getJSON(url, data) {
		var _this3 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
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
	postJSON: function postJSON(url, data) {
		var _this4 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('POST', url);
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
	putJSON: function putJSON(url, data) {
		var _this5 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('PUT', url);
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
	deleteJSON: function deleteJSON(url, data) {
		var _this6 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('DELETE', url);
			xhr.setRequestHeader('SessionID', _this6.getSessionID());
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
		var _this7 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', _this7.getSessionID());
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
		var value = '; ' + document.cookie,
		    parts = value.split('; ' + name + '=');
		if (parts.length == 2) {
			return parts.pop().split(';').shift();
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
	},

	moveItem: function moveItem(array, old_index, new_index) {
		if (new_index >= array.length) {
			var k = new_index - array.length;
			while (k-- + 1) {
				array.push(undefined);
			}
		}
		array.splice(new_index, 0, array.splice(old_index, 1)[0]);
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
				subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath, item, helpers);
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
			return this.getValueByPath(path.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, path, item, helpers);
		}
	}, {
		key: 'set',
		value: function set(path, item, helpers, attrValue) {
			var subPath = void 0,
			    subPathParsed = void 0,
			    i = 0;
			while (subPath = this.findNextSubPath(path)) {
				subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath, item, helpers);
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
		value: function getValueByPath(object, attrPath, item, helpers) {
			attrPath = this.normilizePath(attrPath);
			var attrName = attrPath.shift(),
			    isFunction = attrName.indexOf(FUNCTION_MARKER) > -1;
			if (isFunction) {
				attrName = attrName.replace(FUNCTION_MARKER, '');
			}
			if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object[attrName] !== 'undefined' && object[attrName] !== null) {
				var newObj = isFunction ? object[attrName]({ item: item, helpers: helpers }) : object[attrName];
				if (attrPath.length > 0) {
					return this.getValueByPath(newObj, attrPath, item, helpers);
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
			return this;
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
			return this;
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
			return this;
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
			return this;
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
	}, {
		key: 'offAll',
		value: function offAll() {
			var events = Object.keys(this[META_EVENTS]);
			for (var t = 0; t < events.length; t++) {
				if (this[META_EVENTS].hasOwnProperty(events[t])) {
					delete this[META_EVENTS][events[t]];
				}
			}
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
			//console.log(...arguments);
		}
	}, {
		key: 'getRoot',
		value: function getRoot() {
			return '';
		}
	}, {
		key: 'listen',
		value: function listen() {
			var loopInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : OPT_DEFAULT_CHECK_INTERVAL;

			this.setWorking('current', 'notInitialized');
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
						//console.log('push state', this.getFullRoute(path));
						history.pushState(null, null, this.getFullRoute(path));
						break;
					}
				case OPT_MODE_HASH:
					{
						window.location.href.match(/#(.*)$/);
						window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
						break;
					}
			}
			return this;
		}
	}, {
		key: 'getFullRoute',
		value: function getFullRoute() {
			var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			return this.getWorking('root') + this.clearSlashes(path);
		}
	}, {
		key: 'getAllLinks',
		value: function getAllLinks() {
			var allElements = document.body.querySelectorAll('a');
			var list = [];
			for (var j = 0; j < allElements.length; j++) {
				for (var i = 0, atts = allElements[j].attributes, n = atts.length; i < n; i++) {
					if (atts[i].nodeName.indexOf('n-href') === 0) {
						list.push(allElements[j]);
						break;
					}
				}
			}
			return list;
		}
	}, {
		key: 'reRouteExisted',
		value: function reRouteExisted() {
			var list = this.getAllLinks();
			for (var t = 0; t < list.length; t++) {
				this.initRerouting(list[t], list[t].getAttribute('n-href'));
			}
			return this;
		}
	}, {
		key: 'initRerouting',
		value: function initRerouting(el, link) {
			var _this2 = this;

			if (!el.notRouterInitialized) {
				var fullLink = this.getFullRoute(link);
				el.setAttribute('href', fullLink);
				el.addEventListener('click', function (e) {
					e.preventDefault();
					_this2.navigate(link);
					return false;
				});
				el.notRouterInitialized = true;
			}
			return this;
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
var DEFAULT_FILTER = {};
var DEFAULT_PAGE_NUMBER = 1;
var DEFAULT_PAGE_SIZE = 10;

var notInterface = function (_notBase) {
	inherits(notInterface, _notBase);

	function notInterface(manifest) {
		var _ret;

		classCallCheck(this, notInterface);

		var _this = possibleConstructorReturn(this, (notInterface.__proto__ || Object.getPrototypeOf(notInterface)).call(this, {}));

		_this.manifest = manifest;
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notInterface, [{
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
		value: function getID(record, actionData) {
			var resultId = void 0,
			    list = OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY,
			    prefixes = ['', this.manifest.model];
			if (actionData.hasOwnProperty('index') && actionData.index) {
				list = [actionData.index].concat(OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY);
			}
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = prefixes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var pre = _step.value;
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var t = _step2.value;

							if (record.hasOwnProperty(pre + t)) {
								resultId = record[pre + t];
								break;
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
		value: function setFilter() {
			var filterData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_FILTER;

			return this.setWorking('filter', filterData);
		}
	}, {
		key: 'resetFilter',
		value: function resetFilter() {
			return this.setFilter({});
		}
	}, {
		key: 'getFilter',
		value: function getFilter() {
			return this.getWorking('filter');
		}
	}, {
		key: 'setSorter',
		value: function setSorter(sorterData) {
			return this.setWorking('sorter', sorterData);
		}
	}, {
		key: 'getSorter',
		value: function getSorter() {
			return this.getWorking('sorter');
		}
	}, {
		key: 'setPageNumber',
		value: function setPageNumber(pageNumber) {
			return this.setWorking('pageNumber', pageNumber);
		}
	}, {
		key: 'setPageSize',
		value: function setPageSize(pageSize) {
			return this.setWorking('pageSize', pageSize);
		}
	}, {
		key: 'setPager',
		value: function setPager() {
			var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_PAGE_SIZE;
			var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PAGE_NUMBER;

			return this.setWorking('pageSize', pageSize).setWorking('pageNumber', pageNumber);
		}
	}, {
		key: 'resetPager',
		value: function resetPager() {
			return this.setPager();
		}
	}, {
		key: 'getPager',
		value: function getPager() {
			return {
				pageSize: this.getWorking('pageSize'),
				pageNumber: this.getWorking('pageNumber')
			};
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
		key: 'collectRequestData',
		value: function collectRequestData(actionData) {
			var requestData = {};
			if (actionData.hasOwnProperty('data') && Array.isArray(actionData.data)) {
				for (var i = 0; i < actionData.data.length; i++) {
					var dataProviderName = 'get' + notCommon.capitalizeFirstLetter(actionData.data[i]);
					if (this[dataProviderName] && typeof this[dataProviderName] === 'function') {
						requestData = notCommon.extend(requestData, this[dataProviderName]());
					}
				}
			}
			return requestData;
		}
	}, {
		key: 'encodeRequest',
		value: function encodeRequest(data) {
			var p = '?';
			for (var t in data) {
				p += encodeURIComponent(t) + '=' + encodeURIComponent(data[t]) + '&';
			}
			return p;
		}

		//return Promise

	}, {
		key: 'request',
		value: function request(record, actionName) {
			var _this2 = this;

			var actionData = this.getActionData(actionName),
			    requestParams = this.collectRequestData(actionData),
			    requestParamsEncoded = this.encodeRequest(requestParams),
			    id = this.getID(record, actionData, actionName),
			    url = this.getURL(record, actionData, actionName);
			return notCommon.getAPI().queeRequest(actionData.method, url + requestParamsEncoded, id, JSON.stringify(record.getData())).then(function (data) {
				return _this2.afterSuccessRequest(data, actionData);
			}).catch(function (e) {
				notCommon.report(e);
			});
		}
	}, {
		key: 'afterSuccessRequest',
		value: function afterSuccessRequest(data, actionData) {
			if (this && actionData && actionData.hasOwnProperty('isArray') && actionData.isArray) {
				for (var t = 0; t < data.length; t++) {
					data[t] = new notRecord(this.manifest, data[t]);
				}
			} else {
				data = new notRecord(this.manifest, data);
			}
			return data;
		}
	}]);
	return notInterface;
}(notBase);

var META_INTERFACE = Symbol('interface');
var META_PROXY = Symbol('proxy');
var META_CHANGE = Symbol('change');
var META_CHANGE_NESTED = Symbol('change.nested');
var META_SAL = ['getAttr', 'getAttrs', 'isProperty', 'isRecord', 'getManifest', 'setAttr', 'setAttrs', 'getData', 'setData', 'getJSON', 'on', 'off', 'trigger'];
var META_MAP_TO_INTERFACE = ['getActionsCount', 'getActions', 'setFindBy', 'resetFilter', 'setFilter', 'getFilter', 'setSorter', 'getSorter', 'resetSorter', 'setPageNumber', 'setPageSize', 'setPager', 'resetPager', 'getPager'];
var DEFAULT_ACTION_PREFIX = '$';
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
				if (Object.keys(this).indexOf(key) > -1 || META_SAL.indexOf(key) > -1 || META_MAP_TO_INTERFACE.indexOf(key) > -1) {
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
		_this2.setOptions({});
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
							if (_typeof(item[key]) === 'object' && item[key] !== null) {
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
		key: 'setFindBy',
		value: function setFindBy() {
			var _META_INTERFACE;

			(_META_INTERFACE = this[META_INTERFACE]).setFindBy.apply(_META_INTERFACE, arguments);
			return this;
		}
	}, {
		key: 'setFilter',
		value: function setFilter() {
			var _META_INTERFACE2;

			(_META_INTERFACE2 = this[META_INTERFACE]).setFilter.apply(_META_INTERFACE2, arguments);
			return this;
		}
	}, {
		key: 'resetFilter',
		value: function resetFilter() {
			var _META_INTERFACE3;

			(_META_INTERFACE3 = this[META_INTERFACE]).resetFilter.apply(_META_INTERFACE3, arguments);
			return this;
		}
	}, {
		key: 'getFilter',
		value: function getFilter() {
			var _META_INTERFACE4;

			return (_META_INTERFACE4 = this[META_INTERFACE]).getFilter.apply(_META_INTERFACE4, arguments);
		}
	}, {
		key: 'setSorter',
		value: function setSorter() {
			var _META_INTERFACE5;

			(_META_INTERFACE5 = this[META_INTERFACE]).setSorter.apply(_META_INTERFACE5, arguments);
			return this;
		}
	}, {
		key: 'getSorter',
		value: function getSorter() {
			var _META_INTERFACE6;

			return (_META_INTERFACE6 = this[META_INTERFACE]).getSorter.apply(_META_INTERFACE6, arguments);
		}
	}, {
		key: 'setPageNumber',
		value: function setPageNumber() {
			var _META_INTERFACE7;

			(_META_INTERFACE7 = this[META_INTERFACE]).setPageNumber.apply(_META_INTERFACE7, arguments);
			return this;
		}
	}, {
		key: 'setPageSize',
		value: function setPageSize() {
			var _META_INTERFACE8;

			(_META_INTERFACE8 = this[META_INTERFACE]).setPageSize.apply(_META_INTERFACE8, arguments);
			return this;
		}
	}, {
		key: 'setPager',
		value: function setPager() {
			var _META_INTERFACE9;

			(_META_INTERFACE9 = this[META_INTERFACE]).setPager.apply(_META_INTERFACE9, arguments);
			return this;
		}
	}, {
		key: 'resetPager',
		value: function resetPager() {
			var _META_INTERFACE10;

			(_META_INTERFACE10 = this[META_INTERFACE]).resetPager.apply(_META_INTERFACE10, arguments);
			return this;
		}
	}, {
		key: 'getPager',
		value: function getPager() {
			var _META_INTERFACE11;

			return (_META_INTERFACE11 = this[META_INTERFACE]).getPager.apply(_META_INTERFACE11, arguments);
		}
	}, {
		key: 'getModelName',
		value: function getModelName() {
			var _META_INTERFACE12;

			return (_META_INTERFACE12 = this[META_INTERFACE]).getModelName.apply(_META_INTERFACE12, arguments);
		}
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
						notCommon.report('no templates lib', e);
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
			notRouter$1.reRouteExisted();
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
			this.getWorking('router').addList(routieInput).listen(); //.navigate(this.getOptions('router.index'));
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
		value: function isData() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
				//console.log('nt founded');
				l++;
			} else {
				//console.log('remove child ',targetEl.children[l]);
				targetEl.removeChild(targetEl.children[l]);
			}
		}
		targetEl.textContent = '';
	},
	beforeEach: function beforeEach() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			//console.log('append child ', rendered[i]);
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
			//console.log('place first', i, rendered[i]);
			if (targetEl.children.length) {
				//console.log('append before first');
				targetEl.insertBefore(rendered[i], targetEl.children[0]);
			} else {
				//console.log('append as first');
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
			this.dead = true;
			this.offAll();
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
			libs: {},
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
							renderAnd: view.renderAnd || OPT_DEFAULT_RENDER_AND
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
	}, {
		key: 'preloadLib',
		value: function preloadLib() {
			var _this3 = this;

			var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			return new Promise(function (resolve, reject) {
				if ((typeof list === 'undefined' ? 'undefined' : _typeof(list)) !== 'object') {
					resolve();
				} else {
					_this3.setWorking('loading', []);

					var _loop = function _loop(t) {
						_this3.getWorking('loading').push(list[t]);
						_this3.make[list[t]]({}).$listAll().then(function (data) {
							if (!_this3.getOptions('libs')) {
								_this3.setOptions('libs', {});
							}
							_this3.getOptions('libs')[t] = data;
							if (_this3.getWorking('loading').indexOf(list[t]) > -1) {
								_this3.getWorking('loading').splice(_this3.getWorking('loading').indexOf(list[t]), 1);
							}
							if (_this3.getWorking('loading').length === 0) {
								resolve();
							}
						}).catch(function (err) {
							notCommon.report(err);
							reject();
						});
					};

					for (var t in list) {
						_loop(t);
					}
					if (_this3.getWorking('loading').length === 0) {
						resolve();
					}
				}
			});
		}
	}, {
		key: 'queeUpload',
		value: function queeUpload(name, list) {
			//hash (fieldName=>filesList)
			if (!this.getWorking('uploadQuee')) {
				this.setWorking('uploadQuee', {});
			}
			this.getWorking('uploadQuee')[name] = list;
		}
	}, {
		key: 'execUploads',
		value: function execUploads(item) {
			var _this4 = this;

			var list = this.getWorking('uploadQuee');
			return new Promise(function (resolve, reject) {
				if ((typeof list === 'undefined' ? 'undefined' : _typeof(list)) !== 'object') {
					resolve(item);
				} else {
					_this4.setWorking('uploading', {});

					var _loop2 = function _loop2(t) {
						var fieldFiles = list[t];
						if (fieldFiles.length > 1) {
							item[t] = [];
						} else {
							item[t] = '';
						}

						var _loop3 = function _loop3(f) {
							if (!_this4.getWorking('uploading').hasOwnProperty(t)) {
								_this4.getWorking('uploading')[t] = 0;
							}
							_this4.getWorking('uploading')[t]++;
							_this4.app.getWorking('uploader').upload(fieldFiles[f]).then(function (savedFile) {
								console.log('file uploaded', t, f, savedFile);
								_this4.getWorking('uploading')[t]--;
								if (_this4.getWorking('uploading')[t] === 0) {
									delete _this4.getWorking('uploading')[t];
								}
								if (Array.isArray(item[f])) {
									item[t].push(savedFile.hash);
								} else {
									item[t] = savedFile.hash;
								}
								if (Object.keys(_this4.getWorking('uploading')).length === 0) {
									resolve(item);
								}
							}).catch(function (err) {
								notFramework.notCommon.report(err);
								reject();
							});
						};

						for (var f = 0; f < fieldFiles.length; f++) {
							_loop3(f);
						}
					};

					for (var t in list) {
						_loop2(t);
					}
					if (Object.keys(_this4.getWorking('uploading')).length === 0) {
						resolve(item);
					}
				}
			});
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
			if (scope.element.type === 'textarea') {
				scope.element.innerHTML = notPath$1.get(scope.attributeExpression, item, helpers);
			}
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
		var res = notPath$1.get(scope.attributeExpression, item, helpers) || notPath$1.parseSubs(scope.attributeExpression, item, helpers);
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
		if (scope.params.length === 3) {
			labelFieldName = scope.params[0];
			valueFieldName = scope.params[1];
			itemValueFieldName = scope.params[2];
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
					if (item[itemValueFieldName] && Array.isArray(item[itemValueFieldName])) {
						if (item[itemValueFieldName].indexOf(lib[i][valueFieldName]) > -1) {
							option.setAttribute('selected', true);
						}
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
			//let data = this.collectDataFromComponents.bind(this);
		}
	}, {
		key: 'bindFormEvents',
		value: function bindFormEvents() {
			var targetQuery = this.getOptions('targetQuery');
			if (targetQuery) {
				var target = document.querySelector(targetQuery);
				if (target) {
					this.setOptions('targetEl', target);
				}
			}
			if (this.getOptions('targetEl')) {
				var form = this.getOptions('targetEl').querySelector('form');
				if (form) {
					form.addEventListener('submit', this.onSubmit.bind(this));
					form.addEventListener('reset', this.onReset.bind(this));
				}
			}
		}
	}, {
		key: 'updateField',
		value: function updateField(fieldName) {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				if (this.getWorking('components')[t].field.name === fieldName) {
					this.getWorking('components')[t].component.update();
				}
			}
		}
	}, {
		key: 'update',
		value: function update() {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				this.getWorking('components')[t].component.update();
			}
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
	}]);
	return notForm;
}(notBase);

var OPT_DEFAULT_PAGE_SIZE = 20;
var OPT_DEFAULT_PAGE_NUMBER = 0;
var OPT_DEFAULT_SORT_DIRECTION = 1;
var OPT_DEFAULT_SORT_FIELD = '_id';
var OPT_FIELD_NAME_PRE_PROC = 'preprocessor';

var notTable = function (_notBase) {
	inherits(notTable, _notBase);

	function notTable(input) {
		var _ret;

		classCallCheck(this, notTable);

		var _this = possibleConstructorReturn(this, (notTable.__proto__ || Object.getPrototypeOf(notTable)).call(this, input));

		_this.setWorking('filteredData', []);
		if (!_this.getData() || !Array.isArray(_this.getData('rows'))) {
			_this.setData({ rows: [] });
		}
		_this.resetPager();
		_this.resetFilter();
		_this.resetSorter();
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
				if (fields[i].hasOwnProperty('sortable') && fields[i].sortable) {
					this.attachSortingHandlers(newTh, fields[i].path);
				}
				tableHeader.appendChild(newTh);
			}
		}
	}, {
		key: 'attachSortingHandlers',
		value: function attachSortingHandlers(headCell, fieldName) {
			var _this2 = this;

			headCell.addEventListener('click', function (e) {
				e.preventDefault();
				_this2.changeSortingOptions(headCell, fieldName);
				return false;
			});
			headCell.style.cursor = 'pointer';
		}
	}, {
		key: 'changeSortingOptions',
		value: function changeSortingOptions(el, fieldName) {
			if (fieldName === this.getSorter().sortByField) {
				this.setSorter({
					sortByField: fieldName,
					sortDirection: -1 * this.getSorter().sortDirection
				});
			} else {
				this.setSorter({
					sortByField: fieldName,
					sortDirection: OPT_DEFAULT_SORT_DIRECTION
				});
			}
			if (el.parentNode) {
				for (var i = 0; i < el.parentNode.children.length; i++) {
					if (el.parentNode.children[i] === el) {
						continue;
					}
					el.parentNode.children[i].classList.remove('sorting_asc');
					el.parentNode.children[i].classList.remove('sorting_desc');
					el.parentNode.children[i].setAttribute('aria-sort', 'none');
				}
			}
			if (this.getSorter().sortDirection > 0) {
				el.classList.remove('sorting_desc');
				el.classList.add('sorting_asc');
				el.setAttribute('aria-sort', 'ascending');
			} else {
				el.classList.remove('sorting_asc');
				el.classList.add('sorting_desc');
				el.setAttribute('aria-sort', 'descending');
			}
		}
	}, {
		key: 'setSorter',
		value: function setSorter(hash) {
			//console.log('setSorter', hash);
			this.setWorking('sorter', hash);
			this.invalidateData();
			this.updateData();
		}
	}, {
		key: 'resetSorter',
		value: function resetSorter() {
			this.setSorter({
				sortByField: OPT_DEFAULT_SORT_FIELD,
				sortDirection: OPT_DEFAULT_SORT_DIRECTION
			});
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
		key: 'resetFilter',
		value: function resetFilter() {
			this.setFilter({});
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
				pageSize: isNaN(this.getOptions('pageSize')) ? OPT_DEFAULT_PAGE_SIZE : this.getOptions('pageSize'),
				pageNumber: isNaN(this.getOptions('pageNumber')) ? OPT_DEFAULT_PAGE_NUMBER : this.getOptions('pageNumber')
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
			this.setWorking('updating', false);
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
					//console.log('$list for table', data);
					_this3.setData({
						rows: _this3.getData('rows').concat(data)
					});
					_this3.proccessData();
					_this3.refreshBody();
					_this3.setUpdated();
				}).catch(function (e) {
					notCommon.error(e);
					_this3.setUpdated();
				});
			} else {
				//local magic
				this.setUpdating();
				this.proccessData();
				this.refreshBody();
				this.setUpdated();
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
					var t1 = notPath$1.get(thatSorter.sortByField, item1, {}),
					    t2 = notPath$1.get(thatSorter.sortByField, item2, {});
					if (isNaN(t1)) {
						if (typeof t1 !== 'undefined' && typeof t2 !== 'undefined' && t1.localeCompare) {
							return t1.localeCompare() * -thatSorter.sortDirection;
						} else {
							return 0;
						}
					} else {
						return (t1 < t2 ? 1 : -1) * thatSorter.sortDirection;
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
					newTd.addEventListener('blur', function () {
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
			this.checkFiltered();
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
		key: 'checkFiltered',
		value: function checkFiltered() {
			if (!Array.isArray(this.getWorking('filteredData'))) {
				this.setWorking('filteredData', []);
			}
		}
	}, {
		key: 'renderBody',
		value: function renderBody() {
			if (!this.getOptions('onePager')) {
				this.clearBody();
			}
			this.checkFiltered();
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

var OPT_DEFAULT_DETAILS_PREFIX = 'details_';
var OPT_DEFAULT_ROLE_NAME$1 = 'default';
var OPT_DEFAULT_DETAILS_TITLE = 'Details default title';
var OPT_DEFAULT_FIELD_DEFINITION$1 = {};
var OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST$1 = ['options', 'manifest', 'app'];

var notDetails = function (_notBase) {
	inherits(notDetails, _notBase);

	function notDetails(input) {
		var _ret;

		classCallCheck(this, notDetails);

		var _this = possibleConstructorReturn(this, (notDetails.__proto__ || Object.getPrototypeOf(notDetails)).call(this, input));

		if (!_this.getOptions('prefix')) {
			_this.setOptions('prefix', OPT_DEFAULT_DETAILS_PREFIX);
		}
		_this.setWorking('components', []);
		if (!_this.getData().isRecord) {
			_this.setData(new notRecord({}, _this.getData()));
		}
		_this.render();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notDetails, [{
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
		key: 'getFieldsList',
		value: function getFieldsList() {
			var actionData = this.getActionData(),
			    list = [],
			    role = this.getOptions('role', OPT_DEFAULT_ROLE_NAME$1);
			if (actionData) {
				if (actionData.fields) {
					if (actionData.fields.hasOwnProperty(role)) {
						list = actionData.fields[role];
					}
				}
			}
			return list;
		}
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
				title: actionData.title ? actionData.title : OPT_DEFAULT_DETAILS_TITLE
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
				for (var _t = 0; _t < this.getFieldsList().length; _t++) {
					var fieldName = this.getFieldsList()[_t];
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
			var def = OPT_DEFAULT_FIELD_DEFINITION$1,
			    fieldsLibs = this.getFieldsLibs();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST$1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
					targetEl: this.getTargetElement(fieldType.target),
					renderAnd: 'placeLast'
				}
			});
			this.getWorking('components').push(rec);
		}
	}, {
		key: 'getTargetElement',
		value: function getTargetElement() {
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
		key: 'updateField',
		value: function updateField(fieldName) {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				if (this.getWorking('components')[t].field.name === fieldName) {
					this.getWorking('components')[t].component.update();
				}
			}
		}
	}, {
		key: 'update',
		value: function update() {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				this.getWorking('components')[t].component.update();
			}
		}
	}]);
	return notDetails;
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
exports.notDetails = notDetails;
exports.notRecord = notRecord;
exports.notRecordInterface = notInterface;

}((this.notFramework = this.notFramework || {})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdEZvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdERldGFpbHMuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSkge1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvciAodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IgKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwdXRGaWxlKHVwbG9hZCAvKiBvYmplY3QoZmlsZSwgb25Qcm9ncmVzcywgdXJsKSovICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRpZiAoeGhyLnVwbG9hZCkge1xuXHRcdFx0XHQvLyBwcm9ncmVzcyBiYXJcblx0XHRcdFx0aWYgKHVwbG9hZC5vblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZC5vblByb2dyZXNzLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCAvKmUqLyApIHtcblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh4aHIuc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0Ly8gc3RhcnQgdXBsb2FkXG5cdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0XHR4aHIub3BlbignUFVUJywgdXBsb2FkLnVybCwgdHJ1ZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignWF9GSUxFTkFNRScsIGVuY29kZVVSSUNvbXBvbmVudCh1cGxvYWQuZmlsZS5uYW1lKSk7XG5cdFx0XHRcdHhoci5zZW5kKHVwbG9hZC5maWxlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUFVUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChwYXJzZUludChzdGF0dXMpID09PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoZSkgPT4gcmVqZWN0KGUpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0U2Vzc2lvbklEOiBmdW5jdGlvbihuYW1lID0gJ1Nlc3Npb25JRCcpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb29raWUobmFtZSk7XG5cdH0sXG5cdGdldENvb2tpZTogKG5hbWUpID0+IHtcblx0XHRsZXQgdmFsdWUgPSAnOyAnICsgZG9jdW1lbnQuY29va2llLFxuXHRcdFx0cGFydHMgPSB2YWx1ZS5zcGxpdCgnOyAnICsgbmFtZSArICc9Jyk7XG5cdFx0aWYgKHBhcnRzLmxlbmd0aCA9PSAyKSB7XG5cdFx0XHRyZXR1cm4gcGFydHMucG9wKCkuc3BsaXQoJzsnKS5zaGlmdCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbk5ldHdvcms7XG4iLCJ2YXIgQ29tbW9uTG9ncyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fSxcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHRyYWNlOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cblx0bW92ZUl0ZW0oYXJyYXksIG9sZF9pbmRleCwgbmV3X2luZGV4KSB7XG5cdFx0aWYgKG5ld19pbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcblx0XHRcdHZhciBrID0gbmV3X2luZGV4IC0gYXJyYXkubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKChrLS0pICsgMSkge1xuXHRcdFx0XHRhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFycmF5LnNwbGljZShuZXdfaW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRfaW5kZXgsIDEpWzBdKTtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aChzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHVuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHRoaXMuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIG51bGwpO1xuXHR9XG5cblx0cGFyc2VQYXRoU3RlcChzdGVwLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGxldCByU3RlcCA9IG51bGw7XG5cdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUykgPT09IDAgJiYgaGVscGVyKXtcblx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfSEVMUEVSUywgJycpO1xuXHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRpZihoZWxwZXIuaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF07XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID09PSAwICYmIGl0ZW0pe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwgJycpO1xuXHRcdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fVxuXG5cdC8vOjpmaWVsZE5hbWUucmVzdWx0XG5cdC8ve31cblx0Ly97ZmllbGROYW1lOiAndGFyZ2V0UmVjb3JkRmllbGQnfVxuXHQvLy8vWyd0YXJnZXRSZWNvcmRGaWVsZCcsICdyZXN1bHQnXVxuXHRwYXJzZVBhdGgocGF0aCwgaXRlbSwgaGVscGVyKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cGF0aCA9IHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdHBhdGhbaV0gPSB0aGlzLnBhcnNlUGF0aFN0ZXAocGF0aFtpXSwgaXRlbSwgaGVscGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRub3JtaWxpemVQYXRoKHBhdGgpe1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH1lbHNle1xuXHRcdFx0d2hpbGUocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA+IC0xKXtcblx0XHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwnJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdHNtYWxsID0gW1widG9kb1wiXSxcblx0XHRiaWcgPSBbXCJ0b2RvXCIsIFwibGVuZ3RoXCJdXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0Ki9cblxuXHRpZkZ1bGxTdWJQYXRoKGJpZywgc21hbGwpe1xuXHRcdGlmIChiaWcubGVuZ3RoPHNtYWxsLmxlbmd0aCl7cmV0dXJuIGZhbHNlO31cblx0XHRmb3IobGV0IHQgPTA7IHQgPCBzbWFsbC5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZihzbWFsbFt0XSAhPT0gYmlnW3RdKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpLFxuXHRcdFx0aXNGdW5jdGlvbiA9IGF0dHJOYW1lLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKT4tMTtcblx0XHRpZiAoaXNGdW5jdGlvbil7XG5cdFx0XHRhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0fVxuXHRcdGlmICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIHR5cGVvZiBvYmplY3RbYXR0ck5hbWVdICE9PSAndW5kZWZpbmVkJyAmJiBvYmplY3RbYXR0ck5hbWVdICE9PSBudWxsKXtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uP29iamVjdFthdHRyTmFtZV0oe2l0ZW0sIGhlbHBlcnN9KTpvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChuZXdPYmosIGF0dHJQYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gbmV3T2JqO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7b2JqZWN0W2F0dHJOYW1lXSA9IHt9O31cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGpvaW4oKXtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX01FVEhPRF9JTklUID0gU3ltYm9sKCdpbml0JyksXG5cdE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0dGhpc1tNRVRBX0VWRU5UU10gPSB7fTtcblx0XHR0aGlzW01FVEFfREFUQV0gPSB7fTtcblx0XHR0aGlzW01FVEFfV09SS0lOR10gPSB7fTtcblx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSB7fTtcblx0XHR0aGlzW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdFtNRVRBX01FVEhPRF9JTklUXShpbnB1dCl7XG5cdFx0aWYgKCFpbnB1dCl7XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH1cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykpe1xuXHRcdFx0Zm9yKGxldCB0IG9mIGlucHV0LmV2ZW50cyl7XG5cdFx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSl7XG5cdFx0XHR0aGlzLnNldERhdGEoaW5wdXQuZGF0YSk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ3dvcmtpbmcnKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoaW5wdXQud29ya2luZyk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoaW5wdXQub3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiAqL1xuXHRcdFx0XHR3aGF0ID0gYXJnc1swXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiBlbGVtZW50ICovXG5cdFx0XHRcdG5vdFBhdGguc2V0KGFyZ3NbMF0gLyogcGF0aCAqLyAsIHdoYXQgLyogY29sbGVjdGlvbiAqLyAsIHVuZGVmaW5lZCAvKiBoZWxwZXJzICovICwgYXJnc1sxXSAvKiB2YWx1ZSAqLyApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Z2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggKi9cblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdH1cblx0XHRcdFx0LyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoIHdpdGggZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdGNhc2UgMjpcblx0XHRcdHtcblx0XHRcdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0XHRpZiAocmVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHQvKiBubyBkYXRhLCByZXR1cm4gZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdFx0XHRcdHJldHVybiBhcmdzWzFdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8qIGRhdGEsIHJldHVybiBpdCAqL1xuXHRcdFx0XHRcdHJldHVybiByZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8qIHJldHVybiBmdWxsIGNvbGxlY3Rpb24gKi9cblx0XHRkZWZhdWx0OlxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gd2hhdDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdENPUkUgT0JKRUNUXG5cdFx0XHREQVRBIC0gaW5mb3JtYXRpb25cblx0XHRcdE9QVElPTlMgLSBob3cgdG8gd29ya1xuXHRcdFx0V09SS0lORyAtIHRlbXBvcmFyaWx5IGdlbmVyYXRlZCBpbiBwcm9jY2Vzc1xuXHQqL1xuXG5cdHNldERhdGEoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9EQVRBXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXREYXRhKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXREYXRhKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfREFUQV0sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRPcHRpb25zKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0T3B0aW9ucygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9PUFRJT05TXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFdvcmtpbmcoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRXb3JraW5nKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0V29ya2luZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1dPUktJTkddLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Lypcblx0XHRFVkVOVFMgaGFuZGxpbmdcblx0Ki9cblxuXHRvbihldmVudE5hbWVzLCBldmVudENhbGxiYWNrcywgb25jZSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRub3RDb21tb24uZGVmaW5lSWZOb3RFeGlzdHModGhpc1tNRVRBX0VWRU5UU10sIG5hbWUsIFtdKTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnB1c2goe1xuXHRcdFx0XHRjYWxsYmFja3M6IGV2ZW50Q2FsbGJhY2tzLFxuXHRcdFx0XHRvbmNlOiBvbmNlLFxuXHRcdFx0XHRjb3VudDogMFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR0cmlnZ2VyKCkge1xuXHRcdGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLFxuXHRcdFx0ZXZlbnROYW1lID0gYXJncy5zaGlmdCgpO1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWUpKSB7XG5cdFx0XHRldmVudE5hbWUgPSBbZXZlbnROYW1lXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0VWRU5UU10uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaChldmVudCA9PiB7XG5cdFx0XHRcdFx0aWYgKGV2ZW50Lm9uY2UpIHtcblx0XHRcdFx0XHRcdHRoaXMub2ZmKG5hbWUsIGV2ZW50LmNhbGxiYWNrcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LmNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmYoZXZlbnROYW1lcyAvKiBhcnJheSBvZiBldmVudCBuYW1lcyAqLyAsIGV2ZW50Q2FsbGJhY2tzIC8qIGFycmF5IG9mIGNhbGxiYWNrcyAqLyApIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRsZXQgdGFyZ2V0SWQgPSAtMTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmZvckVhY2goKGV2ZW50LCBpKSA9PiB7XG5cdFx0XHRcdGlmIChpID09PSAtMSAmJiBldmVudENhbGxiYWNrcyA9PT0gZXZlbnQuY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0dGFyZ2V0SWQgPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmICh0YXJnZXRJZCA+IC0xKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnNwbGljZSh0YXJnZXRJZCwgMSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmZBbGwoKXtcblx0XHRsZXQgZXZlbnRzID0gT2JqZWN0LmtleXModGhpc1tNRVRBX0VWRU5UU10pO1xuXHRcdGZvcihsZXQgdCA9MDsgdDwgZXZlbnRzLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHRoaXNbTUVUQV9FVkVOVFNdLmhhc093blByb3BlcnR5KGV2ZW50c1t0XSkpe1xuXHRcdFx0XHRkZWxldGUgdGhpc1tNRVRBX0VWRU5UU11bZXZlbnRzW3RdXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5jb25zdCBPUFRfTU9ERV9ISVNUT1JZID0gU3ltYm9sKCdoaXN0b3J5JyksXG5cdE9QVF9NT0RFX0hBU0ggPSBTeW1ib2woJ2hhc2gnKSxcblx0T1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwgPSA1MDtcblxuY2xhc3Mgbm90Um91dGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJvdXRlczogW10sXG5cdFx0XHRtb2RlOiBPUFRfTU9ERV9ISVNUT1JZLFxuXHRcdFx0cm9vdDogJy8nLCAvL2Fsd2F5cyBpbiBzbGFzaGVzIC91c2VyLywgLywgL2lucHV0Ly4gYW5kIG5vIC91c2VyIG9yIGlucHV0L2xldmVsXG5cdFx0XHRpbml0aWFsaXplZDogZmFsc2Vcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpc3RvcnkoKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9ISVNUT1JZKTtcblx0fVxuXG5cdGhhc2goKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9IQVNIKTtcblx0fVxuXG5cdHNldFJvb3Qocm9vdCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb290Jywgcm9vdCA/ICcvJyArIHRoaXMuY2xlYXJTbGFzaGVzKHJvb3QpICsgJy8nIDogJy8nKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNsZWFyU2xhc2hlcyhwYXRoKSB7XG5cdFx0Ly9maXJzdCBhbmQgbGFzdCBzbGFzaGVzIHJlbW92YWxcblx0XHRyZXR1cm4gcGF0aC50b1N0cmluZygpLnJlcGxhY2UoL1xcLyQvLCAnJykucmVwbGFjZSgvXlxcLy8sICcnKTtcblx0fVxuXG5cdGFkZChyZSwgaGFuZGxlcikge1xuXHRcdGlmICh0eXBlb2YgcmUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aGFuZGxlciA9IHJlO1xuXHRcdFx0cmUgPSAnJztcblx0XHR9XG5cdFx0bGV0IHJ1bGUgPSB7XG5cdFx0XHRyZTogcmUsXG5cdFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0fTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLnB1c2gocnVsZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRMaXN0KGxpc3QpIHtcblx0XHRmb3IgKGxldCB0IGluIGxpc3QpIHtcblx0XHRcdHRoaXMuYWRkKHQsIGxpc3RbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbW92ZShwYXJhbSkge1xuXHRcdGZvciAodmFyIGkgPSAwLCByOyBpIDwgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5sZW5ndGgsIHIgPSB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldOyBpKyspIHtcblx0XHRcdGlmIChyLmhhbmRsZXIgPT09IHBhcmFtIHx8IHIucmUgPT09IHBhcmFtKSB7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRmbHVzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLydcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGlzSW5pdGlhbGl6ZWQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbml0aWFsaXplZCcpO1xuXHR9XG5cblx0c2V0SW5pdGlhbGl6ZWQodmFsID0gdHJ1ZSl7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnaW5pdGlhbGl6ZWQnLCB2YWwpO1xuXHR9XG5cblx0Z2V0RnJhZ21lbnQoKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gJyc7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnbW9kZScpID09PSBPUFRfTU9ERV9ISVNUT1JZKSB7XG5cdFx0XHRpZiAoIWxvY2F0aW9uKSByZXR1cm4gJyc7XG5cdFx0XHRmcmFnbWVudCA9IHRoaXMuY2xlYXJTbGFzaGVzKGRlY29kZVVSSShsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCkpO1xuXHRcdFx0ZnJhZ21lbnQgPSBmcmFnbWVudC5yZXBsYWNlKC9cXD8oLiopJC8sICcnKTtcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgIT0gJy8nID8gZnJhZ21lbnQucmVwbGFjZSh0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSwgJycpIDogZnJhZ21lbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICghd2luZG93KSByZXR1cm4gJyc7XG5cdFx0XHR2YXIgbWF0Y2ggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRmcmFnbWVudCA9IG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY2xlYXJTbGFzaGVzKGZyYWdtZW50KTtcblx0fVxuXG5cdGNoZWNrTG9jYXRpb24oKXtcblx0XHRsZXQgY3VycmVudCA9dGhpcy5nZXRXb3JraW5nKCdjdXJyZW50JyksXG5cdFx0XHRmcmFnbWVudCA9dGhpcy5nZXRGcmFnbWVudCgpLFxuXHRcdFx0aW5pdCA9IHRoaXMuaXNJbml0aWFsaXplZCgpO1xuXHRcdGlmIChjdXJyZW50ICE9PWZyYWdtZW50ICB8fCAhaW5pdCkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JyxmcmFnbWVudCk7XG5cdFx0XHR0aGlzLmNoZWNrKGZyYWdtZW50KTtcblx0XHRcdHRoaXMuc2V0SW5pdGlhbGl6ZWQoKTtcblx0XHR9XG5cdH1cblxuXHRocmVmQ2xpY2soKXtcblx0XHQvL2NvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRnZXRSb290KCl7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0bGlzdGVuKGxvb3BJbnRlcnZhbCA9IE9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JywgJ25vdEluaXRpYWxpemVkJyk7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmdldFdvcmtpbmcoJ2ludGVydmFsJykpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJ2YWwnLCBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrTG9jYXRpb24uYmluZCh0aGlzKSwgbG9vcEludGVydmFsKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5ocmVmQ2xpY2suYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjaGVjayhmKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gZiB8fCB0aGlzLmdldEZyYWdtZW50KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGF0aCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5yZTtcblx0XHRcdGxldCBmdWxsUkUgPSAgdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKHBhdGgpKTtcblx0XHRcdHZhciBtYXRjaCA9IGZyYWdtZW50Lm1hdGNoKGZ1bGxSRSk7XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0bWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5oYW5kbGVyLmFwcGx5KHRoaXMuaG9zdCB8fCB7fSwgbWF0Y2gpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRuYXZpZ2F0ZShwYXRoKSB7XG5cdFx0cGF0aCA9IHBhdGggPyBwYXRoIDogJyc7XG5cdFx0c3dpdGNoICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSl7XG5cdFx0XHRjYXNlIE9QVF9NT0RFX0hJU1RPUlk6IHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygncHVzaCBzdGF0ZScsIHRoaXMuZ2V0RnVsbFJvdXRlKHBhdGgpKTtcblx0XHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgT1BUX01PREVfSEFTSDoge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyguKikkLywgJycpICsgJyMnICsgcGF0aDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RnVsbFJvdXRlKHBhdGggPSAnJyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5jbGVhclNsYXNoZXMocGF0aCk7XG5cdH1cblxuXHRnZXRBbGxMaW5rcygpe1xuXHRcdHZhciBhbGxFbGVtZW50cyA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZignbi1ocmVmJykgPT09IDApIHtcblx0XHRcdFx0XHRsaXN0LnB1c2goYWxsRWxlbWVudHNbal0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0cmVSb3V0ZUV4aXN0ZWQoKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0QWxsTGlua3MoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgbGlzdC5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmluaXRSZXJvdXRpbmcobGlzdFt0XSwgbGlzdFt0XS5nZXRBdHRyaWJ1dGUoJ24taHJlZicpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVyb3V0aW5nKGVsLCBsaW5rKXtcblx0XHRpZiAoIWVsLm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdGxldCBmdWxsTGluayA9IHRoaXMuZ2V0RnVsbFJvdXRlKGxpbmspO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdocmVmJywgZnVsbExpbmspO1xuXHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9Pntcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLm5hdmlnYXRlKGxpbmspO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdGVsLm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90Um91dGVyKCk7XG4iLCJsZXQgbm90QVBJT3B0aW9ucyA9IHtcblx0cnBzOiA1MCxcblx0cHJvdG9jb2w6ICdodHRwJyxcblx0aG9zdDogJ2xvY2FsaG9zdCcsXG5cdHBvcnQ6IDkwMDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSU9wdGlvbnM7XG4iLCJjbGFzcyBub3RBUElRdWVle1xuXHRjb25zdHJ1Y3RvciAocmVxdWVzdHNQZXJTZWNvbmQpIHtcblx0XHR0aGlzLnF1ZWUgPSBbXTtcblx0XHR0aGlzLmludCA9IG51bGw7XG5cdFx0dGhpcy5yZXF1ZXN0c1BlclNlY29uZCA9IHJlcXVlc3RzUGVyU2Vjb25kIHx8IDU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW4oKXtcblx0XHR0aGlzLmludCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLmNoZWNrLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLnJlcXVlc3RzUGVyU2Vjb25kKTtcblx0fVxuXG5cdGNoZWNrKCl7XG5cdFx0aWYgKHRoaXMuaW5Qcm9ncmVzcyl7cmV0dXJuO31cblx0XHRlbHNle1xuXHRcdFx0aWYgKHRoaXMucXVlZS5sZW5ndGggPiAwKXtcblx0XHRcdFx0dGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHRvQ2FsbCA9IHRoaXMucXVlZS5zaGlmdCgpO1xuXHRcdFx0XHR0b0NhbGwoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRuZXh0KCl7XG5cdFx0dGhpcy5pblByb2dyZXNzID0gZmFsc2U7XG5cdH1cblxuXHRhZGQoY2FsbCl7XG5cdFx0dGhpcy5xdWVlLnB1c2goY2FsbCk7XG5cdH1cblxuXHRwYXVzZSgpe1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50KTtcblx0fVxuXG5cdHJlc3VtZSgpe1xuXHRcdHRoaXMucnVuKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJUXVlZTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UuanMnO1xuXG5pbXBvcnQgbm90QVBJT3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuaW1wb3J0IG5vdEFQSVF1ZWUgZnJvbSAnLi9xdWVlLmpzJztcblxuXG5jbGFzcyBub3RBUEkgZXh0ZW5kcyAgbm90QmFzZXtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdENvbW1vbi5leHRlbmQobm90QVBJT3B0aW9ucywgb3B0aW9ucykpO1xuXHRcdHRoaXMucXVlZSA9IG5ldyBub3RBUElRdWVlKHRoaXMuZ2V0T3B0aW9ucygncnBzJykpO1xuXHRcdHRoaXMucXVlZS5ydW4oKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG1ha2VVcmwocGFydHMpIHtcblx0XHRyZXR1cm4gcGFydHMuam9pbignLycpO1xuXHR9XG5cblx0cXVlZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgbWV0aG9kLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdG1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKSB7XG5cdFx0bm90Q29tbW9uLmxvZygnbWFraW5nIHJlcXVlc3QnLCBtZXRob2QsIHVybCwgaWQpO1xuXHRcdG5vdENvbW1vbi5yZXF1ZXN0SlNPTihtZXRob2QsIHVybCwgZGF0YSlcblx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXF1ZXN0IHN1Y2Nlc3NmdWxsJywgbWV0aG9kLCB1cmwsIGlkLCByZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3Jlc3BvbnNlIGlzIGdvb2QnKTtcblx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGNvZGUsIHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5lcnJvcigncmVxdWVzdCBmYWlsZWQnLCBtZXRob2QsIHVybCwgaWQsIHJlc3BvbnNlKTtcblx0XHRcdFx0dGhpcy5xdWVlLm5leHQoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVzcG9uc2UgaXMgYmFkJyk7XG5cdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2UpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlJyk7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdwb3N0JywgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlIGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHV0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncHV0JywgdXJsLCBudWxsLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5nZXRNb2RlbCgpLnNldFByaWNlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdwdXR0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZ2V0JywgdXJsLCBpZCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZ2V0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0bGlzdChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZ2V0JywgdXJsLCBudWxsLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdsaXN0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGVsZXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZGVsZXRlJywgdXJsLCBpZCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZGVsZXRlIGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0VXBsb2FkVVJMKG1vZGVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnYmFzZScpICsgdGhpcy5nZXRPcHRpb25zKCd1cGxvYWQnKSArIG1vZGVsP21vZGVsLmdldElkKCk6Jyc7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJO1xuIiwiaW1wb3J0IG5vdEJhc2UgIGZyb20gJy4uL25vdEJhc2UnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW1hZ2UgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cbiIsImNvbnN0IFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCA9ICduLScsXG5cdFRFTVBMQVRFX1RBRyA9ICdudCcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiA9ICctJyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVggPSAnaWYnLFxuXHRDT01QT05FTlRfSURfUFJFRklYID0gJ25vdF9jb21wb25lbnRfJyxcblx0UEFSVF9JRF9QUkVGSVggPSAnbm90X3BhcnRfJyxcblx0REVGQVVMVF9QTEFDRVIgPSAncGxhY2UnLFxuXHRERUZBVUxUX1BMQUNFUl9MT09QID0gJ3BsYWNlQWZ0ZXInO1xuXG5jb25zdCBPUFRTID0ge1xuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgsXG5cdFRFTVBMQVRFX1RBRyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCxcblx0REVGQVVMVF9QTEFDRVIsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVgsXG5cdFBBUlRfSURfUFJFRklYLFxuXHRERUZBVUxUX1BMQUNFUl9MT09QXG59O1xuXG5leHBvcnQgZGVmYXVsdCBPUFRTO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuY29uc3QgTUVUQV9DQUNIRSA9IFN5bWJvbCgnY2FjaGUnKTtcblxuY2xhc3Mgbm90VGVtcGxhdGVDYWNoZSBleHRlbmRzIG5vdEJhc2V7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ0FDSEVdID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdHRoaXMuaGlkZVRlbXBsYXRlcygpO1xuXHRcdHRoaXMucmVnaXN0ZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpZGVUZW1wbGF0ZXMoKXtcblx0XHRsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdFx0dC5pbm5lckhUTUwgPSBPUFRTLlRFTVBMQVRFX1RBRyArICd7ZGlzcGxheTogbm9uZTt9Jztcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHQpO1xuXHR9XG5cblx0cmVnaXN0ZXIoKSB7XG5cdFx0bm90Q29tbW9uLnJlZ2lzdGVyKCd0ZW1wbGF0ZUNhY2hlJywgdGhpcyk7XG5cdH1cblxuXHRsb2FkKG1hcCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHRmb3IgKHZhciBpIGluIG1hcCkge1xuXHRcdFx0dGhpcy5sb2FkT25lKGksIG1hcFtpXSk7XG5cdFx0fVxuXHR9XG5cblx0bG9hZE9uZShrZXksIHVybCwgY2FsbGJhY2spIHtcblx0XHR2YXIgb1JlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRvUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXHRcdG9SZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KGtleSkpe1xuXHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vdGhhdC5zZXRMb2FkaW5nKGtleSwgdXJsKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZUlubmVySFRNTCk9Pntcblx0XHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0XHRcdH0pLmNhdGNoKCgpPT57XG5cdFx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGUnLCBrZXksIHVybCk7XG5cdFx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlc0hUTUwpPT57XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoaXMucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdFx0dGhpcy5hZGRMaWIodGVtcGxhdGVzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHRcdH0pLmNhdGNoKChlKT0+e1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZXMgbGliJywgdXJsLGUpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSA9IFsnX2lkJywgJ2lkJywgJ0lEJ10sXG5cdERFRkFVTFRfRklMVEVSID0ge30sXG5cdERFRkFVTFRfUEFHRV9OVU1CRVIgPSAxLFxuXHRERUZBVUxUX1BBR0VfU0laRSA9IDEwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbnRlcmZhY2UgZXh0ZW5kcyBub3RCYXNlIHtcblxuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCkge1xuXHRcdHN1cGVyKHt9KTtcblx0XHR0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldElEKHJlY29yZCwgYWN0aW9uRGF0YSkge1xuXHRcdGxldCByZXN1bHRJZCxcblx0XHRcdGxpc3QgPSBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZLFxuXHRcdFx0cHJlZml4ZXMgPSBbJycsIHRoaXMubWFuaWZlc3QubW9kZWxdO1xuXHRcdGlmIChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpbmRleCcpICYmIGFjdGlvbkRhdGEuaW5kZXgpIHtcblx0XHRcdGxpc3QgPSBbYWN0aW9uRGF0YS5pbmRleF0uY29uY2F0KE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkpO1xuXHRcdH1cblx0XHRmb3IgKGxldCBwcmUgb2YgcHJlZml4ZXMpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgbGlzdCkge1xuXHRcdFx0XHRpZiAocmVjb3JkLmhhc093blByb3BlcnR5KHByZSArIHQpKSB7XG5cdFx0XHRcdFx0cmVzdWx0SWQgPSByZWNvcmRbcHJlICsgdF07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdElkO1xuXHR9XG5cblx0Z2V0QWN0aW9uc0NvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSA/IE9iamVjdC5rZXlzKHRoaXMuZ2V0QWN0aW9ucygpKS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Z2V0QWN0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgPyB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgOiB7fTtcblx0fVxuXG5cdHNldEZpbmRCeShrZXksIHZhbHVlKSB7XG5cdFx0dmFyIG9iaiA9IHt9O1xuXHRcdG9ialtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIHRoaXMuc2V0RmlsdGVyKG9iaik7XG5cdH1cblxuXHRzZXRGaWx0ZXIoZmlsdGVyRGF0YSA9IERFRkFVTFRfRklMVEVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgZmlsdGVyRGF0YSk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIoe30pO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0U29ydGVyKHNvcnRlckRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHNldFBhZ2VTaXplKHBhZ2VTaXplKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSk7XG5cdH1cblxuXHRzZXRQYWdlcihwYWdlU2l6ZSA9IERFRkFVTFRfUEFHRV9TSVpFLCBwYWdlTnVtYmVyID0gREVGQVVMVF9QQUdFX05VTUJFUikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0UGFnZXIoKTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRXb3JraW5nKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRXb3JraW5nKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdGNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlcXVlc3REYXRhID0ge307XG5cdFx0aWYgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdkYXRhJykpICYmIEFycmF5LmlzQXJyYXkoYWN0aW9uRGF0YS5kYXRhKSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpb25EYXRhLmRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGRhdGFQcm92aWRlck5hbWUgPSAnZ2V0JyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoYWN0aW9uRGF0YS5kYXRhW2ldKTtcblx0XHRcdFx0aWYgKHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gJiYgdHlwZW9mIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRyZXF1ZXN0RGF0YSA9IG5vdENvbW1vbi5leHRlbmQocmVxdWVzdERhdGEsIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0oKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVlc3REYXRhO1xuXHR9XG5cblx0ZW5jb2RlUmVxdWVzdChkYXRhKXtcblx0XHRsZXQgcCA9ICc/Jztcblx0XHRmb3IobGV0IHQgaW4gZGF0YSl7XG5cdFx0XHRwICs9IGVuY29kZVVSSUNvbXBvbmVudCh0KSsnPScrZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFbdF0pKycmJztcblx0XHR9XG5cdFx0cmV0dXJuIHA7XG5cdH1cblxuXHQvL3JldHVybiBQcm9taXNlXG5cdHJlcXVlc3QocmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zID0gdGhpcy5jb2xsZWN0UmVxdWVzdERhdGEoYWN0aW9uRGF0YSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zRW5jb2RlZCA9IHRoaXMuZW5jb2RlUmVxdWVzdChyZXF1ZXN0UGFyYW1zKSxcblx0XHRcdGlkID0gdGhpcy5nZXRJRChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpLFxuXHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwgKyByZXF1ZXN0UGFyYW1zRW5jb2RlZCwgaWQsIEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpKVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLnJlcG9ydChlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0YWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKSB7XG5cdFx0aWYgKHRoaXMgJiYgYWN0aW9uRGF0YSAmJiBhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpc0FycmF5JykgJiYgYWN0aW9uRGF0YS5pc0FycmF5KSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZGF0YVt0XSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YVt0XSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSBuZXcgbm90UmVjb3JkKHRoaXMubWFuaWZlc3QsIGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnO1xuXG5jb25zdCBNRVRBX0lOVEVSRkFDRSA9IFN5bWJvbCgnaW50ZXJmYWNlJyksXG5cdE1FVEFfUFJPWFkgPSBTeW1ib2woJ3Byb3h5JyksXG5cdE1FVEFfQ0hBTkdFID0gU3ltYm9sKCdjaGFuZ2UnKSxcblx0TUVUQV9DSEFOR0VfTkVTVEVEID0gU3ltYm9sKCdjaGFuZ2UubmVzdGVkJyksXG5cdE1FVEFfU0FMID0gW1xuXHRcdCdnZXRBdHRyJyxcblx0XHQnZ2V0QXR0cnMnLFxuXHRcdCdpc1Byb3BlcnR5Jyxcblx0XHQnaXNSZWNvcmQnLFxuXHRcdCdnZXRNYW5pZmVzdCcsXG5cdFx0J3NldEF0dHInLFxuXHRcdCdzZXRBdHRycycsXG5cdFx0J2dldERhdGEnLFxuXHRcdCdzZXREYXRhJyxcblx0XHQnZ2V0SlNPTicsXG5cdFx0J29uJyxcblx0XHQnb2ZmJyxcblx0XHQndHJpZ2dlcidcblx0XSxcblx0TUVUQV9NQVBfVE9fSU5URVJGQUNFID0gW1xuXHRcdCdnZXRBY3Rpb25zQ291bnQnLFxuXHRcdCdnZXRBY3Rpb25zJyxcblx0XHQnc2V0RmluZEJ5Jyxcblx0XHQncmVzZXRGaWx0ZXInLFxuXHRcdCdzZXRGaWx0ZXInLFxuXHRcdCdnZXRGaWx0ZXInLFxuXHRcdCdzZXRTb3J0ZXInLFxuXHRcdCdnZXRTb3J0ZXInLFxuXHRcdCdyZXNldFNvcnRlcicsXG5cdFx0J3NldFBhZ2VOdW1iZXInLFxuXHRcdCdzZXRQYWdlU2l6ZScsXG5cdFx0J3NldFBhZ2VyJyxcblx0XHQncmVzZXRQYWdlcicsXG5cdFx0J2dldFBhZ2VyJ1xuXHRdLFxuXHRERUZBVUxUX0FDVElPTl9QUkVGSVggPSAnJCcsXG5cdE1FVEFfUkVUVVJOX1RPX1JPT1QgPSBTeW1ib2woJ3JldHVyblRvUm9vdCcpO1xuXG52YXIgY3JlYXRlUHJvcGVydHlIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdHlwZW9mIHRhcmdldFtrZXldKTtcblxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UHJvcGVydHkgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoZ2V0Um9vdCwgcGF0aFRvLCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1Byb3h5IHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5zZXREYXRhKGl0ZW0pO1xuXHRcdHRoaXMuaXNQcm9wZXJ0eSA9IHRydWU7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX1JFVFVSTl9UT19ST09UXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdFtNRVRBX1JFVFVSTl9UT19ST09UXShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdGxldCByb290ID0gdGhpcy5nZXRPcHRpb25zKCdnZXRSb290JykoKTtcblx0XHRyb290LnRyaWdnZXIoJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfUFJPWFldLCB0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5LCB2YWx1ZSk7XG5cdH1cbn1cblxuXG52YXIgY3JlYXRlUmVjb3JkSGFuZGxlcnMgPSBmdW5jdGlvbihvd25lcikge1xuXHRyZXR1cm4ge1xuXHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIGNvbnRleHQpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgZ2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQsIGNvbnRleHQpO1xuXHRcdFx0aWYgKGtleSA9PT0gJ2lzUHJveHknIHx8IGtleSA9PT0gJ2lzUmVjb3JkJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX01BUF9UT19JTlRFUkZBQ0UuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHJlY29yZCBwcm94eSBzZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCk7XG5cdFx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UmVjb3JkIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG1hbmlmZXN0LCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUHJveHkpIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcigndGhpcyBpcyBQcm94eSBpdGVtJyk7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1JlY29yZCB8fCBpdGVtLmlzUHJvcGVydHkpKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7fSk7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0gPSBuZXcgbm90UmVjb3JkSW50ZXJmYWNlKG1hbmlmZXN0KTtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpcy5pbnRlcmZhY2VVcCgpO1xuXHRcdHRoaXMuaXNSZWNvcmQgPSB0cnVlO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgcmVjb3JkIGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0aW5pdFByb3BlcnRpZXMoaXRlbSwgcGF0aCA9ICcnKSB7XG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtICE9PSBudWxsKSB7XG5cdFx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKGl0ZW0pO1xuXHRcdFx0Zm9yIChsZXQga2V5IG9mIGtleXMpIHtcblx0XHRcdFx0bGV0IGN1clBhdGggPSBwYXRoICsgKHBhdGgubGVuZ3RoID4gMCA/ICcuJyA6ICcnKSArIGtleTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjdXJQYXRoJywgY3VyUGF0aCk7XG5cdFx0XHRcdGlmIChpdGVtLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW1ba2V5XSA9PT0gJ29iamVjdCcgJiYgaXRlbVtrZXldICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXG5cdGFjdGlvblVwKGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLmhhc093blByb3BlcnR5KFtERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0pKSB7XG5cdFx0XHR0aGlzW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSA9ICgpID0+IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlcXVlc3QodGhpcywgaW5kZXgpO1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCdkZWZpbmUnLCBERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleCk7XG5cdFx0fVxuXHR9XG5cdC8qXG5cdC0+ICdwYXRoLnRvLmtleScsIHZhbHVlT2ZLZXlcblx0PC0gb2ssIHdpdGggb25lIG9uQ2hhbmdlIGV2ZW50IHRyaWdnZXJlZFxuXHQqL1xuXG5cdHNldEF0dHIoa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBub3RQYXRoLnNldChrZXksIHRoaXNbTUVUQV9QUk9YWV0sIHt9LCB2YWx1ZSk7XG5cdH1cblxuXHQvKlxuXHQtPlxuXHR7XG5cdFx0J2tleVBhdGgnOiB2YWx1ZSxcblx0XHQna2V5LnN1YlBhdGgnOiB2YWx1ZTIsXG5cdFx0J2tleVBhdGguMC50aXRsZSc6IHZhbHVlM1xuXHR9XG5cdDwtIG9rLCB3aXRoIGJ1bmNoIG9mIG9uQ2hhbmdlIGV2ZW50cyB0cmlnZ2VyZWRcblx0Ki9cblx0c2V0QXR0cnMob2JqZWN0UGFydCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBpbiBvYmplY3RQYXJ0KSB7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMgb25lIHRvIGdvJywgcGF0aCk7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cihwYXRoLCBvYmplY3RQYXJ0W3BhdGhdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aFRvS2V5J1xuXHQ8LSB2YWx1ZTFcblxuXHQqL1xuXHRnZXRBdHRyKHdoYXQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ2dldEF0dHInLCB3aGF0KTtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQod2hhdCwgdGhpc1tNRVRBX1BST1hZXSwge30pO1xuXHR9XG5cblx0Lypcblx0LT4gWydwYXRoVG9LZXknLCAncGF0aC50by5rZXknLCAnc2ltcGxlS2V5JywuLi5dXG5cdDwtIFt2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzLC4uLl1cblx0Ki9cblx0Z2V0QXR0cnMod2hhdCkge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAod2hhdCAmJiB3aGF0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggb2Ygd2hhdCkge1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLmdldEF0dHIocGF0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0aWYgKHRoaXNbTUVUQV9JTlRFUkZBQ0VdKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ubWFuaWZlc3Q7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdGhhbmRsZXIgZm9yIFByb3h5IGNhbGxiYWNrc1xuXHQqL1xuXG5cdFtNRVRBX0NIQU5HRV0oKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCd0cnkgdG8gY2hhbmdlJywgLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdFtNRVRBX0NIQU5HRV9ORVNURURdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZSBuZXN0ZWQnLCAuLi5hcmd1bWVudHMpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0aGlzW01FVEFfUFJPWFldLCBub3RQYXRoLmpvaW4oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pLCBhcmd1bWVudHNbM10pO1xuXHR9XG5cblx0c2V0SXRlbShpdGVtKSB7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub2ZmKCdjaGFuZ2UnKTtcblx0XHR0aGlzLm9mZignY2hhbmdlLm5lc3RlZCcpO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24udHJhY2UoKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdHNldEZpbmRCeSgpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRGaW5kQnkoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0U29ydGVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFNvcnRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0UGFnZU51bWJlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0UGFnZVNpemUoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldFBhZ2VyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlc2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRNb2RlbE5hbWUoLi4uYXJndW1lbnRzKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlY29yZDtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG5cbmNvbnN0IE9QVF9DT05UUk9MTEVSX1BSRUZJWCA9ICduYycsXG5cdE9QVF9SRUNPUkRfUFJFRklYID0gJ25yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QXBwIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcih7b3B0aW9uc30pO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGFwcCcpO1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcignYXBwJywgdGhpcyk7XG5cdFx0dGhpcy5yZXNvdXJjZXMgPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0aW50ZXJmYWNlczoge30sXG5cdFx0XHRjb250cm9sbGVyczoge30sXG5cdFx0XHRpbml0Q29udHJvbGxlcjogbnVsbCxcblx0XHRcdGN1cnJlbnRDb250cm9sbGVyOiBudWxsXG5cdFx0fSk7XG5cdFx0dGhpcy5wcmVJbml0Um91dGVyKCk7XG5cdFx0dGhpcy5pbml0TWFuYWdlcigpO1xuXHRcdHRoaXMuaW5pdEFQSSgpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlcygpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdE1hbmFnZXIoKXtcblx0XHRub3RDb21tb24uc2V0TWFuYWdlcihcblx0XHRcdHtcblx0XHRcdFx0c2V0QVBJKHYpeyB0aGlzLmFwaSA9IHY7fSxcblx0XHRcdFx0Z2V0QVBJKCl7cmV0dXJuIHRoaXMuYXBpO30sXG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdGluaXRBUEkoKXtcblx0XHRub3RDb21tb24uZ2V0TWFuYWdlcigpLnNldEFQSShuZXcgbm90QVBJKHt9KSk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGVzKCl7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykpe1xuXHRcdFx0bGV0IHByb20gPSBudWxsO1xuXHRcdFx0Zm9yKGxldCB0IGluIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykpe1xuXHRcdFx0XHRpZiAodCAmJiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0XHRsZXQgdXJsID0gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKVt0XTtcblx0XHRcdFx0XHRpZihwcm9tKXtcblx0XHRcdFx0XHRcdHByb20udGhlbihub3RUZW1wbGF0ZUNhY2hlLmFkZExpYkZyb21VUkwuYmluZChub3RUZW1wbGF0ZUNhY2hlLCB1cmwpKTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHByb20gPSBub3RUZW1wbGF0ZUNhY2hlLmFkZExpYkZyb21VUkwodXJsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChwcm9tKXtcblx0XHRcdFx0cHJvbS50aGVuKHRoaXMuaW5pdE1hbmlmZXN0LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KCdubyB0ZW1wbGF0ZXMgbGliJywgZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5pbml0TWFuaWZlc3QoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuaW5pdE1hbmlmZXN0KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hbmlmZXN0KCkge1xuXHRcdHZhciB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ21hbmlmZXN0VVJMJyk7XG5cdFx0bm90Q29tbW9uLmdldEpTT04odXJsLCB7fSlcblx0XHRcdC50aGVuKHRoaXMuc2V0SW50ZXJmYWNlTWFuaWZlc3QuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0LmJpbmQodGhpcykpO1xuXHR9XG5cblx0cHJlSW5pdFJvdXRlcigpe1xuXHRcdHRoaXMuc2V0V29ya2luZygncm91dGVyJywgbm90Um91dGVyKTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcicpLnNldFJvb3QodGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIucm9vdCcpKTtcblx0XHRub3RSb3V0ZXIucmVSb3V0ZUV4aXN0ZWQoKTtcblx0fVxuXG5cdGluaXRSb3V0ZXIoKXtcblx0XHR2YXIgcm91dGllSW5wdXQgPSB7fTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRsZXQgcm91dGVCbG9jayA9IHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLm1hbmlmZXN0JylbdF0sXG5cdFx0XHRcdHBhdGhzID0gcm91dGVCbG9jay5wYXRocyxcblx0XHRcdFx0Y29udHJvbGxlciA9IHJvdXRlQmxvY2suY29udHJvbGxlcjtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHJvdXRpZUlucHV0W3BhdGhzW2ldXSA9IHRoaXMuYmluZENvbnRyb2xsZXIoY29udHJvbGxlcik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuYWRkTGlzdChyb3V0aWVJbnB1dCkubGlzdGVuKCk7Ly8ubmF2aWdhdGUodGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIuaW5kZXgnKSk7XG5cdH1cblxuXHRzZXRJbnRlcmZhY2VNYW5pZmVzdChtYW5pZmVzdCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnLCBtYW5pZmVzdCk7XG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxuXG5cdGdldEludGVyZmFjZU1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0Jyk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0Ly/QvdGD0LbQvdC+INC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDRgtGMXG5cdFx0Ly/QvNC+0LTQtdC70Lgg0L/QvtC70YPRh9C10L3QvdGL0LzQuCDQuNC90YLQtdGA0YTQtdC50YHQsNC80Lhcblx0XHR0aGlzLnVwZGF0ZUludGVyZmFjZXMoKTtcblx0XHQvL9C40L3QuNGG0LjQu9C40YbQuNGA0L7QstCw0YLRjCDQuCDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YAg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0XHR0aGlzLmluaXRDb250cm9sbGVyKCk7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXJ0QXBwKCkge1xuXHRcdC8v0YHQvtC30LTQsNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdC8v0YDQvtGD0YLQtdGAINC4INC/0YDQuNCy0Y/Qt9Cw0YLRjCDQuiDQvdC10LzRgyDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0dGhpcy5pbml0Um91dGVyKCk7XG5cdH1cblxuXHRiaW5kQ29udHJvbGxlcihjb250cm9sbGVyTmFtZSkge1xuXHRcdGxldCBhcHAgPSB0aGlzO1xuXHRcdHJldHVybiBmdW5jdGlvbigpe1xuXHRcdFx0bmV3IGNvbnRyb2xsZXJOYW1lKGFwcCwgYXJndW1lbnRzKTtcblx0XHR9O1xuXHR9XG5cblx0aW5pdENvbnRyb2xsZXIoKSB7XG5cdFx0aWYgKHR5cGVvZih0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJykpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0bGV0IGluaXRDb250cm9sbGVyID0gdGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdpbml0Q29udHJvbGxlcicsIG5ldyBpbml0Q29udHJvbGxlcih0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudENvbnRyb2xsZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInKTtcblx0fVxuXG5cdHNldEN1cnJlbnRDb250cm9sbGVyKGN0cmwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJywgY3RybCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR1cGRhdGVJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuY2xlYXJJbnRlcmZhY2VzKCk7XG5cdFx0bGV0IG1hbmlmZXN0cyA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0XHRpZiAobWFuaWZlc3RzKSB7XG5cdFx0XHRmb3IobGV0IG5hbWUgaW4gbWFuaWZlc3RzKXtcblx0XHRcdFx0bGV0IHJlY29yZE1hbmlmZXN0ID0gbWFuaWZlc3RzW25hbWVdO1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXSA9IChyZWNvcmREYXRhKSA9PiBuZXcgbm90UmVjb3JkKHJlY29yZE1hbmlmZXN0LCByZWNvcmREYXRhKTtcblx0XHRcdFx0d2luZG93WyducicgKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpXSA9IHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFJlY29yZE5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfUkVDT1JEX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRDb250cm9sbGVyTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9DT05UUk9MTEVSX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKTtcblx0fVxuXG5cdGNsZWFySW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ludGVyZmFjZXMnLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR3YWl0VGhpc1Jlc291cmNlKHR5cGUsIGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLnJlc291cmNlcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuXHRcdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV0gPSB7fTtcblx0XHR9XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gZmFsc2U7XG5cdFx0cmV0dXJuIHRoaXMub25SZXNvdXJjZVJlYWR5LmJpbmQodGhpcywgdHlwZSwgaW5kZXgpO1xuXHR9XG5cblx0b25SZXNvdXJjZVJlYWR5KHR5cGUsIGluZGV4KSB7XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gdHJ1ZTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0YWxsUmVzb3VyY2VzUmVhZHkoKSB7XG5cdFx0dmFyIGksIGo7XG5cdFx0Zm9yIChpIGluIHRoaXMucmVzb3VyY2VzKSB7XG5cdFx0XHRmb3IgKGogaW4gdGhpcy5yZXNvdXJjZXNbaV0pIHtcblx0XHRcdFx0aWYgKCF0aGlzLnJlc291cmNlc1tpXVtqXSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcblxuY29uc3QgTUVUQV9QUk9DRVNTT1JTID0gU3ltYm9sKCdwcm9jZXNzb3JzJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFByb2Nlc3NvcigvKiBrZXksIHZhbHVlICovKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQcm9jZXNzb3IoLyoga2V5LCAgZGVmYXVsdFZhbHVlICovKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXJQcm9jZXNzb3JzKCl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGQoKXtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG5cdFx0XHR0aGlzLnNldFByb2Nlc3Nvcihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBhcmd1bWVudHNbMF0pe1xuXHRcdFx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKHQsIGFyZ3VtZW50c1swXVt0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRQcm9jZXNzb3IoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyKCl7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vbm90VGVtcGxhdGVQcm9jZXNzb3JzJztcblxuLypcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGCIERPTSDQv9C+0LTQtNC10YDQtdCy0L4g0LIg0LrQsNGH0LXRgdGC0LLQtSDRiNCw0LHQu9C+0L3QsC5cbiAqINCX0LDQv9C+0LvQvdGP0LXRgiDQtdCz0L4g0LTQsNC90L3Ri9C80LguXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgdCz0LXQvdC10YDQuNGA0L7QstCw0L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xuICpcbiAqICovXG5cbi8qXG5cblx0PGRpdiBuLXRlbXBsYXRlLW5hbWU9XCJ2YXN5YVwiPlxuXHRcdDxwPjxpbnB1dCB0eXBlPVwidGV4dFwiIG4tdmFsdWU9XCI6Y29vbE5hbWVcIi8+PC9wPlxuXHRcdDxwPtCR0L7RgNC40YEg0YXRgNC10L0g0L/QvtC/0LDQtNC10YjRjCDQuCB7ezpjb29sTmFtZX19LjwvcD5cblx0PC9kaXY+XG5cbiAqL1xuXG5jb25zdCBNRVRBX0NPTVBPTkVOVFMgPSBTeW1ib2woJ2NvbXBvbmVudHMnKTtcblxuY2xhc3Mgbm90UmVuZGVyZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Lypcblx0XHRpbnB1dCA9IHtcblx0XHRcdGRhdGE6IG5vdFJlY29yZCxcblx0XHRcdHRlbXBsYXRlOiBlbGVtZW50XG5cdFx0XHRvcHRpb25zOntcblx0XHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdH1cblx0XHR9XG5cdCovXG5cblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXSA9IHt9O1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5jb21wb25lbnQgPSBpbnB1dC5jb21wb25lbnQ7XG5cdFx0dGhpcy5pbml0RGF0YShpbnB1dC5kYXRhID8gaW5wdXQuZGF0YSA6IHt9KTtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQudGVtcGxhdGUpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlKCk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGUoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZScsIHRoaXMuZ2V0V29ya2luZygnZ2V0VGVtcGxhdGUnKSgpKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5nZXREYXRhKCkub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdH1cblxuXHRpbml0V29ya2luZyh0ZW1wbGF0ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRnZXRUZW1wbGF0ZTogdGVtcGxhdGUsXG5cdFx0XHRwYXJ0SWQ6IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgPyB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpIDogT1BUUy5QQVJUX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpIHtcblx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcblx0XHRcdHJldHVybiBbLi4udGhpcy5jb21wb25lbnQuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fVxuXHR9XG5cblx0b25DaGFuZ2UocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHQvKm5vdENvbW1vbi5sb2codGhpcyk7XG5cdFx0bm90Q29tbW9uLmxvZyh0aGlzLmdldEJyZWFkQ3J1bXBzKCkuam9pbignID4gJykpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHJlbmRlcmVyICcsIHRoaXMuZ2V0V29ya2luZygncGFydElkJyksICcgYWZ0ZXIgY2hhbmdlcycsIGtleSwgdmFsdWUpOyovXG5cdFx0dGhpcy51cGRhdGUoa2V5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ29ic29sZXRlJyxwcm94eSwga2V5LCB2YWx1ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHR1cGRhdGUoa2V5KSB7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfQ09NUE9ORU5UU10pIHtcblx0XHRcdGxldCBpdGVtID0gdGhpc1tNRVRBX0NPTVBPTkVOVFNdW3RdLFxuXHRcdFx0XHRpZlBhcnQgPSB0cnVlO1xuXHRcdFx0aWYgKGtleSl7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJyk9PT1udWxsKXtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXRcdGNvbXBvbmVudFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpKSxcblx0XHRcdFx0XHRjaGFuZ2VkUGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChrZXkpO1xuXHRcdFx0XHRpZlBhcnQgPSBub3RQYXRoLmlmRnVsbFN1YlBhdGgoY2hhbmdlZFBhdGgsIGNvbXBvbmVudFBhdGgpO1xuXHRcdFx0XHQvKm5vdENvbW1vbi5sb2coaXRlbS5nZXRPcHRpb25zKCduYW1lJyksICcgPi08ICcsIGl0ZW0uZ2V0T3B0aW9ucygnaWQnKSwgJyA+LTwgJywgY29tcG9uZW50UGF0aCwgY2hhbmdlZFBhdGgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCd3aWxsIGJlIHVwZGF0ZWQnLCBpZlBhcnQpOyovXG5cdFx0XHR9XG5cblx0XHRcdGlmIChpZlBhcnQpIHtcblx0XHRcdFx0aXRlbS51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXRXb3JraW5nTWFwcGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21hcHBpbmcnLCB0aGlzLmNyZWF0ZU1hcHBpbmcoKSk7XG5cdH1cblxuXHQvKlxuXG5cdNCh0L7Qt9C00LDQtdC8INC60LDRgNGC0Ysg0YHQvtC+0YLQstC10YHRgtCy0LjRjyDQv9GA0L7RhtC10YHRgdC+0YDQvtCyLCDQv9GD0YLQtdC5INC00LDQvdC90YvRhSDQsiDQvtCx0YrQtdC60YLQtSDQuCDRjdC70LXQvNC10L3RgtC+0LIg0YjQsNCx0LvQvtC90LAuXG5cdFt7XG5cdFx0ZWwsXG5cdFx0cHJvY2Vzc29yLFxuXHRcdHdvcmtpbmcsXG5cdFx0aXRlbS5wcm9wZXJ0eS5wYXRoXG5cdH1dXG5cblx0Ki9cblxuXHRjcmVhdGVNYXBwaW5nKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmZpbmRBbGxQcm9jZXNzb3JzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZpbmRBbGxQcm9jZXNzb3JzKCkge1xuXHRcdGxldCBwcm9jcyA9IFtdLFxuXHRcdFx0ZWxzID0gbm90Q29tbW9uLmdldEF0dHJpYnV0ZXNTdGFydHNXaXRoKHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLCBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCk7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBhdHRzID0gZWxzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhhdHRzW2ldKTtcblx0XHRcdFx0XHRsZXQgcHJvY0RhdGEgPSB0aGlzLnBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihhdHRzW2ldLm5vZGVOYW1lKTtcblx0XHRcdFx0XHRwcm9jRGF0YS5lbGVtZW50ID0gZWxzW2pdO1xuXHRcdFx0XHRcdHByb2NEYXRhLnByb2Nlc3NvckV4cHJlc3Npb24gPSBhdHRzW2ldLm5vZGVOYW1lO1xuXHRcdFx0XHRcdHByb2NEYXRhLmF0dHJpYnV0ZUV4cHJlc3Npb24gPSBhdHRzW2ldLnZhbHVlO1xuXHRcdFx0XHRcdHByb2NzLnB1c2gocHJvY0RhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwcm9jcztcblx0fVxuXG5cdHBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihwcm9jZXNzb3JFeHByZXNzaW9uKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdHBhcmFtczogW10sXG5cdFx0XHRwcm9jZXNzb3JOYW1lOiAnJyxcblx0XHRcdGlmQ29uZGl0aW9uOiBmYWxzZVxuXHRcdH07XG5cdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCwgJycpO1xuXHRcdGlmIChwcm9jZXNzb3JFeHByZXNzaW9uLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCkgPT09IChwcm9jZXNzb3JFeHByZXNzaW9uLmxlbmd0aCAtIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgubGVuZ3RoKSkge1xuXHRcdFx0cmVzdWx0LmlmQ29uZGl0aW9uID0gdHJ1ZTtcblx0XHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgKyBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLCAnJyk7XG5cdFx0fVxuXHRcdHJlc3VsdC5wYXJhbXMgPSBwcm9jZXNzb3JFeHByZXNzaW9uLnNwbGl0KE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SKTtcblx0XHRyZXN1bHQucHJvY2Vzc29yTmFtZSA9IHJlc3VsdC5wYXJhbXNbMF07XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHJlc3VsdC5wYXJhbXMuc2xpY2UoMSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGV4ZWNQcm9jZXNzb3JzKGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG1hcHBpbmcgPSB0aGlzLmdldFdvcmtpbmcoJ21hcHBpbmcnKTtcblx0XHRpZiAobWFwcGluZykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBwcm9jU2NvcGUgPSBtYXBwaW5nW2ldO1xuXHRcdFx0XHRwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHByb2NTY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBpbmRleCk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnYXR0cmlidXRlUmVzdWx0JywgcHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdFx0XHRcdGxldCBwcm9jTmFtZSA9IHByb2NTY29wZS5wcm9jZXNzb3JOYW1lLFxuXHRcdFx0XHRcdHByb2MgPSBub3RUZW1wbGF0ZVByb2Nlc3NvcnMuZ2V0KHByb2NOYW1lKTtcblx0XHRcdFx0aWYgKHByb2MpIHtcblx0XHRcdFx0XHRwcm9jKHByb2NTY29wZSwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0XHRcdFx0XHRwcm9jU2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvY1Njb3BlLnByb2Nlc3NvckV4cHJlc3Npb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gcHJvY2Vzc29yIGxpa2UnLCBwcm9jTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcpO1xuXHR9XG5cblx0Z2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwYXRoLCBpdGVtKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdH1cblxuXHRjbGVhclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmRlc3Ryb3lTdWJzKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdWJzJywgW10pO1xuXHR9XG5cblx0ZGVzdHJveVN1YnMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFN0YXNoKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IGVsID0gdGhpcy5nZXRTdGFzaCgpW3RdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUpe1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZlN1YkVsZW1lbnRSZW5kZXJlZChudEVsKSB7XG5cdFx0cmV0dXJuIG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkICYmIChudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZC52YWx1ZSA9PT0gJ3RydWUnKTtcblx0fVxuXG5cdHNlYXJjaEZvclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0bGV0IHN1YnMgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCA9IDA7IG50IDwgc3Vicy5sZW5ndGg7IG50KyspIHtcblx0XHRcdGlmICghdGhpcy5pZlN1YkVsZW1lbnRSZW5kZXJlZChzdWJzW250XSkpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJTdWIoc3Vic1tudF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZFN1YihudEVsKSB7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdzdWJzJykucHVzaCh7XG5cdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdHBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiAnJyxcblx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnNyYyA6ICcnLFxuXHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0XHRyZW5kZXJlZExpc3Q6IFtdLFxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU3ViKG50RWwpIHtcblx0XHRpZiAoIW50RWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IGRldGFpbHMgPSB7XG5cdFx0XHRcdGRhdGFQYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogbnVsbCxcblx0XHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMuc3JjLnZhbHVlIDogJycsXG5cdFx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0ZGF0YTogZGV0YWlscy5kYXRhUGF0aCE9PSBudWxsPyB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQoZGV0YWlscy5kYXRhUGF0aCwgdGhpcy5nZXREYXRhKCkpOm51bGwsXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHNyYzogZGV0YWlscy5zcmNcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSxcblx0XHRcdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VBZnRlcicsXG5cdFx0XHRcdFx0aWQ6IGRldGFpbHMuaWQsXG5cdFx0XHRcdFx0bnRFbDogbnRFbCxcblx0XHRcdFx0XHRkYXRhUGF0aDogZGV0YWlscy5kYXRhUGF0aFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvd25lcjogdGhpc1xuXHRcdFx0fTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnaWQnLCBkZXRhaWxzLmlkKTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU11bZGV0YWlscy5pZF0gPSBuZXcgbm90Q29tcG9uZW50KG9wdGlvbnMpO1xuXHR9XG5cblx0Y2xlYXJTdGFzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgW10pO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZScpO1xuXHR9XG5cblx0Z2V0U3Rhc2goKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc3Rhc2gnKTtcblx0fVxuXG5cdHN0YXNoUmVuZGVyZWQoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMuYWRkVG9TdGFzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHR9XG5cblx0cmVwbGFjZVJlbmRlcmVkKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygncmVwbGFjZSBzdGFzaCcpO1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSxcblx0XHRcdHN0YXNoID0gdGhpcy5nZXRTdGFzaCgpLFxuXHRcdFx0bmV3U3Rhc2ggPSBbXSxcblx0XHRcdGFuY2hvciA9IHN0YXNoLmxlbmd0aCA+IDAgPyBzdGFzaFswXSA6IHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLFxuXHRcdFx0cGFyZW50Tm9kZSA9IGFuY2hvci5wYXJlbnROb2RlO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdG5ld1N0YXNoLnB1c2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IG5ld1N0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRpZiAoYW5jaG9yLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTdGFzaFt0XSwgYW5jaG9yLm5leHRTaWJsaW5nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld1N0YXNoW3RdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBzdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdGFzaFt0XSk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBuZXdTdGFzaCk7XG5cdH1cblxuXHRhZGRUb1N0YXNoKG5vZGUpIHtcblx0XHR0aGlzLmdldFN0YXNoKCkucHVzaChub2RlKTtcblx0fVxuXG5cdGlzRGF0YShkYXRhID0ge30pIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkgPT09IGRhdGE7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVuZGVyZXI7XG4iLCJjb25zdCBwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XG5cdFx0bGV0IGwgPSAwO1xuXHRcdHdoaWxlICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGggLSBsKSB7XG5cdFx0XHRpZiAodGFyZ2V0RWwuY2hpbGRyZW5bMF0ubm9kZU5hbWUgPT09ICdOVCcpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdudCBmb3VuZGVkJyk7XG5cdFx0XHRcdGwrKztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdyZW1vdmUgY2hpbGQgJyx0YXJnZXRFbC5jaGlsZHJlbltsXSk7XG5cdFx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGFyZ2V0RWwudGV4dENvbnRlbnQgPSAnJztcblx0fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBjaGlsZCAnLCByZW5kZXJlZFtpXSk7XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge31cbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZTtcbiIsImNvbnN0IHBsYWNlQWZ0ZXIgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUFmdGVyO1xuIiwiY29uc3QgcGxhY2VCZWZvcmUgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbCk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUJlZm9yZTtcbiIsImNvbnN0IHBsYWNlRmlyc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSByZW5kZXJlZC5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygncGxhY2UgZmlyc3QnLCBpLCByZW5kZXJlZFtpXSk7XG5cdFx0XHRpZiAodGFyZ2V0RWwuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGJlZm9yZSBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLmNoaWxkcmVuWzBdKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgYXMgZmlyc3QnKTtcblx0XHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlRmlyc3Q7XG4iLCJjb25zdCBwbGFjZUxhc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlTGFzdDtcbiIsImNvbnN0IHJlcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGJlZm9yZUVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1x0XHRcblx0XHRpZiAodGFyZ2V0RWwubm9kZU5hbWUgIT09ICdOVCcpe1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YXJnZXRFbCk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlO1xuIiwiaW1wb3J0IHBsYWNlIGZyb20gJy4vcGxhY2UnO1xuaW1wb3J0IHBsYWNlQWZ0ZXIgZnJvbSAnLi9wbGFjZUFmdGVyJztcbmltcG9ydCBwbGFjZUJlZm9yZSBmcm9tICcuL3BsYWNlQmVmb3JlJztcbmltcG9ydCBwbGFjZUZpcnN0IGZyb20gJy4vcGxhY2VGaXJzdCc7XG5pbXBvcnQgcGxhY2VMYXN0IGZyb20gJy4vcGxhY2VMYXN0JztcbmltcG9ydCByZXBsYWNlIGZyb20gJy4vcmVwbGFjZSc7XG5cbmNvbnN0IG5vdFBsYWNlcnMgPSB7XG5cdHBsYWNlOiBwbGFjZSxcblx0cGxhY2VBZnRlcjogcGxhY2VBZnRlcixcblx0cGxhY2VCZWZvcmU6IHBsYWNlQmVmb3JlLFxuXHRwbGFjZUZpcnN0OiBwbGFjZUZpcnN0LFxuXHRwbGFjZUxhc3Q6IHBsYWNlTGFzdCxcblx0cmVwbGFjZTogcmVwbGFjZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90UGxhY2VycztcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi9ub3RSZW5kZXJlcic7XG5pbXBvcnQgbm90UGxhY2VycyBmcm9tICcuL3BsYWNlcnMnO1xuXG5jb25zdCBNRVRBX1BBUlRTID0gU3ltYm9sKCdwYXJ0cycpO1xuLypcblx0aW5wdXQgPSB7XG5cdFx0ZGF0YTogbm90UmVjb3JkIG9yIFtub3RSZWNvcmRdLFxuXHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRodG1sOiBodG1sKHN0cmluZyksIFx0XHQvL9GC0LXQutGB0YIg0YEgaHRtbCDQutC+0LTQvtC8INGI0LDQsdC70L7QvdCwXG5cdFx0XHRlbDogSFRNTEVsZW1lbnQob2JqZWN0KSwgXHQvL0RPTSDRjdC70LXQvNC10L3RglxuXHRcdFx0c3JjOiBzcmMoc3RyaW5nKSxcdFx0XHQvL9GB0YHRi9C70LrQsCDQvdCwINGE0LDQudC7INGBINGI0LDQsdC70L7QvdC+0Lxcblx0XHRcdG5hbWU6IG5hbWUoc3RyaW5nKVx0XHRcdC8v0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCDQtNC70Y8g0L/QvtC40YHQutCwINCyINC60Y3RiNC1IG5vdFRlbXBsYXRlQ2FjaGVcblx0XHR9XG5cdFx0b3B0aW9uczp7XG5cdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHQvL9CwINGN0YLQviDQutCw0Log0LHRg9C00LXQvCDQv9C+0LzQtdGJ0LDRgtGMINGA0LXQt9GD0LvRjNGC0LDRgiDRgNC10L3QtNC10YDQuNC90LPQsFxuXHRcdFx0cmVuZGVyQW5kOiBwbGFjZVN0eWxlKHN0cmluZykg0L7QtNC40L0g0LjQtyDQstCw0YDQuNCw0L3RgtC+0LJcblx0XHRcdFx0XHRwbGFjZVx0XHQtXHTQv9C+0LzQtdGJ0LDQtdC8INCy0L3Rg9GC0YDQuCDRhtC10LvQtdCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0XHRyZXBsYWNlXHRcdC1cdNC30LDQvNC10L3Rj9C10Lxcblx0XHRcdFx0XHRwbGFjZUFmdGVyXHQtXHTQv9C+0YHQu9C1XG5cdFx0XHRcdFx0cGxhY2VCZWZvcmVcdC1cdNC00L5cblx0XHRcdFx0XHRwbGFjZUZpcnN0XHQtXHTQstC90YPRgtGA0Lgg0L/QtdGA0LLRi9C8INC00L7Rh9C10YDQvdC40Lxcblx0XHRcdFx0XHRwbGFjZUxhc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C+0YHQu9C10LTQvdC40Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdH1cblx0fVxuKi9cbmNsYXNzIG5vdENvbXBvbmVudCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpe1xuXHRcdGlmICh0aGlzLm93bmVyKXtcblx0XHRcdHJldHVybiBbLi4udGhpcy5vd25lci5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1cblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5vd25lciA9IGlucHV0Lm93bmVyP2lucHV0Lm93bmVyOm51bGw7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0RXZlbnRzKGxpc3Qpe1xuXHRcdGZvcihsZXQgdCBvZiBsaXN0KXtcblx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2lkJykpe1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdpZCcsIE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKXtcblx0XHRcdHRoaXMuaW5pdE1hcmtFbGVtZW50KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hcmtFbGVtZW50KCl7XG5cdFx0bGV0IG1hcmtFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ250Jyk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdudEVsJywgbWFya0VsKTtcblx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSksXG5cdFx0XHR0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZiAodGFyZ2V0UXVlcnkpe1xuXHRcdFx0bGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0UXVlcnkpO1xuXHRcdFx0aWYgKHRhcmdldCl7XG5cdFx0XHRcdHRoaXMuc2V0T3B0aW9ucygndGFyZ2V0RWwnLCB0YXJnZXQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKXtcblx0XHRcdHRocm93ICdObyB0YXJnZXQgdG8gcGxhY2UgcmVuZGVyZWQnO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyLm1haW4odGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLCBbbWFya0VsXSk7XG5cdFx0fVxuXG5cdH1cblxuXHRpbml0V29ya2luZyh2YWwpIHtcblx0XHR0aGlzLnVuc2V0UmVhZHkodmFsKTtcblx0fVxuXG5cdHByZXBhcmVUZW1wbGF0ZUVsZW1lbnQodmFsKSB7XG5cdFx0aWYgKCF2YWwpIHtcblx0XHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdodG1sJykgJiYgdmFsLmh0bWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQodmFsLmVsLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZhbC5zcmMpIHtcblx0XHRcdG5vdFRlbXBsYXRlQ2FjaGUuYWRkRnJvbVVSTCh2YWwuc3JjLCB2YWwuc3JjKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpICYmIHZhbC5uYW1lKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUuZ2V0KHZhbC5uYW1lKSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JywgY29udCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRyZXNldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50JywgdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpLmNsb25lTm9kZSh0cnVlKSk7XG5cdH1cblxuXHRzZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdHJ1ZSk7XG5cdH1cblxuXHR1bnNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCBmYWxzZSk7XG5cdH1cblxuXHRpc1JlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3JlYWR5Jyk7XG5cdH1cblxuXHRjbGVhclBhcnRzKCkge1xuXHRcdC8qINC40LfQstC10YnQsNC10Lwg0L7QsSDRg9C00LDQu9C10L3QuNC4INGN0LvQtdC80LXQvdGC0L7QsiAqL1xuXHRcdGlmICh0aGlzW01FVEFfUEFSVFNdICYmIEFycmF5LmlzQXJyYXkodGhpc1tNRVRBX1BBUlRTXSkgJiYgdGhpc1tNRVRBX1BBUlRTXS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpc1tNRVRBX1BBUlRTXSkge1xuXHRcdFx0XHRpZiAodC5kZXN0cm95KXtcblx0XHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdudEVsJykgJiYgdGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZSl7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKTtcblx0XHR9XG5cdFx0dGhpcy5kZWFkID0gdHJ1ZTtcblx0XHR0aGlzLm9mZkFsbCgpO1xuXHR9XG5cblx0cmVzZXRQYXJ0cygpIHtcblx0XHR0aGlzW01FVEFfUEFSVFNdID0gW107XG5cdH1cblxuXHRnZXRQYXJ0cygpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BBUlRTXTtcblx0fVxuXG5cdGFkZFBhcnQodGVtcGxhdGUpIHtcblx0XHR0aGlzW01FVEFfUEFSVFNdLnB1c2godGVtcGxhdGUpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2xlYXJQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMucmVtb3ZlT2Jzb2xldGVQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJVcGRhdGUnKTtcblx0fVxuXG5cdHBsYWNlUmVuZGVyZWQoKXtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKSB7XG5cdFx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0XHRwbGFjZXIuYmVmb3JlKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSk7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucGxhY2VQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0cGxhY2VyLmFmdGVyKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gdGFyZ2V0IGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRwbGFjZVBhcnQoZGF0YSwgaW5kZXgpe1xuXHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpLFxuXHRcdFx0bm9kZXMgPSBwYXJ0LmdldFN0YXNoKCksXG5cdFx0XHR0YXJnZXRFbCxcblx0XHRcdGxhc3ROb2RlLFxuXHRcdFx0cGxhY2VyO1xuXHRcdGlmIChpbmRleCA9PT0gMCl7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIoT1BUUy5ERUZBVUxUX1BMQUNFUl9MT09QKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScpO1xuXHRcdH1cblx0XHRwbGFjZXIubWFpbih0YXJnZXRFbCwgbm9kZXMpO1xuXHRcdGxhc3ROb2RlID0gdGFyZ2V0RWw7XG5cdFx0Zm9yKGxldCB0IG9mIG5vZGVzKXtcblx0XHRcdGlmICh0Lm5vZGVUeXBlID09PSAxKXtcblx0XHRcdFx0bGFzdE5vZGUgPSB0O1xuXHRcdFx0XHRsYXN0Tm9kZS5zZXRBdHRyaWJ1dGUoJ250LWNvbXBvbmVudCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtcGFydCcsIHBhcnQuZ2V0V29ya2luZygncGFydElkJykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJywgbGFzdE5vZGUpO1xuXHR9XG5cblx0Z2V0UGxhY2VyKG1ldGhvZCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2VhcmNoaW5nIGZvciBwbGFjZXInLCBtZXRob2QpO1xuXHRcdGlmIChub3RQbGFjZXJzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW21ldGhvZF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW09QVFMuREVGQVVMVF9QTEFDRVJdO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hEYXRhKGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXREYXRhKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZ1bmModGhpcy5nZXREYXRhKCksIDApO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hQYXJ0KGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldFBhcnRzKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0UGFydHMoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHTQtdGB0LvQuCDRgSDQtNCw0L3QvdGL0LzQuCDQvdC1INGB0LLRj9C30LDQvSDRgNC10L3QtNC10YDQtdGAIC0g0YHQvtC30LTQsNC10Lxcblx0Ki9cblxuXHRyZW5kZXJQYXJ0KGRhdGEpIHtcblx0XHRpZiAoIXRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjcmVhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0bGV0IHJlbmRlcmVyID0gbmV3IG5vdFJlbmRlcmVyKHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dGVtcGxhdGU6IHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKSxcblx0XHRcdFx0Y29tcG9uZW50OiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdC8vcmVuZGVyZXIub24oJ29ic29sZXRlJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFkZFBhcnQocmVuZGVyZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCd1cGRhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0dGhpcy51cGRhdGVQYXJ0KHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlUGFydChwYXJ0KXtcblx0XHRwYXJ0LnVwZGF0ZSgpO1xuXHR9XG5cblx0cmVtb3ZlT2Jzb2xldGVQYXJ0cygpIHtcblx0XHQvL9C60L7QvdCy0LXQtdGAINC/0L7QuNGB0Log0LDQutGC0YPQsNC70YzQvdGL0YUgLSDRg9C00LDQu9C10L3QuNC1INC+0YHRgtCw0LvRjNC90YvRhVxuXHRcdG5vdENvbW1vbi5waXBlKFxuXHRcdFx0dW5kZWZpbmVkLCAvLyBwYXJ0cyB0byBzZWFyY2ggaW4sIGNhbiBiZSAndW5kZWZpbmVkJ1xuXHRcdFx0W1xuXHRcdFx0XHR0aGlzLmZpbmRBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL2ZpcnN0IHJvdW5kLCBzZWFyY2ggZm9yIG9ic29sZXRlXG5cdFx0XHRcdHRoaXMucmVtb3ZlTm90QWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9yZW1vdmUgJ2VtXG5cdFx0XHRdXG5cdFx0KTtcblx0fVxuXG5cdC8qXG5cdFx00LXRgdGC0Ywg0LTQsNC90L3Ri9C1INC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0LDQutGC0YPQsNC70YzQvdC+LFxuXHRcdNC90LXRgiDQtNCw0L3QvdGL0YUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDRgdGC0LDRgNGM0ZFcblx0Ki9cblxuXHRmaW5kQWN0dWFsUGFydHMoKSB7XG5cdFx0bGV0IGFjdHVhbFBhcnRzID0gW107XG5cdFx0dGhpcy5mb3JFYWNoRGF0YSgoZGF0YS8qLCBpbmRleCovKT0+e1xuXHRcdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSk7XG5cdFx0XHRpZiAocGFydCl7XG5cdFx0XHRcdGFjdHVhbFBhcnRzLnB1c2gocGFydCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGFjdHVhbFBhcnRzO1xuXHR9XG5cblx0Lypcblx0XHTRg9C00LDQu9GP0LXQvCDQstGB0LUg0LrRgNC+0LzQtSDQsNC60YLRg9Cw0LvRjNC90YvRhVxuXHQqL1xuXHRyZW1vdmVOb3RBY3R1YWxQYXJ0cyhhY3R1YWxQYXJ0cyl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAoYWN0dWFsUGFydHMuaW5kZXhPZih0aGlzLmdldFBhcnRzKClbdF0pID09PSAtMSl7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKVt0XS5kZXN0cm95KCk7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKS5zcGxpY2UodCwgMSk7XG5cdFx0XHRcdHQtLTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRQYXJ0QnlEYXRhKGRhdGEpIHtcblx0XHRmb3IgKGxldCB0IGluIHRoaXMuZ2V0UGFydHMoKSkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0UGFydHMoKVt0XS5pc0RhdGEoZGF0YSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UGFydHMoKVt0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbXBvbmVudDtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SID0gJy5wYWdlLWNvbnRlbnQnLFxuXHRPUFRfREVGQVVMVF9WSUVXU19QT1NURklYID0gJy5odG1sJyxcblx0T1BUX0RFRkFVTFRfVklFV19OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9SRU5ERVJfRlJPTV9VUkwgPSB0cnVlLFxuXHRPUFRfREVGQVVMVF9QTFVSQUxfTkFNRSA9ICdNb2RlbHMnLFxuXHRPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSA9ICdNb2RlbCcsXG5cdE9QVF9ERUZBVUxUX01PRFVMRV9OQU1FID0gJ21haW4nLFxuXHRPUFRfREVGQVVMVF9SRU5ERVJfQU5EID0gJ3BsYWNlJztcblxuY2xhc3Mgbm90Q29udHJvbGxlciBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihhcHApIHtcblx0XHRzdXBlcigpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGNvbnRyb2xsZXInKTtcblx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cmVhZHk6IGZhbHNlLFxuXHRcdFx0dmlld3M6IHt9LFxuXHRcdFx0bGliczp7fSxcblx0XHRcdHZpZXdOYW1lOiBPUFRfREVGQVVMVF9WSUVXX05BTUUsXG5cdFx0XHRoZWxwZXJzOiB7fVxuXHRcdH0pO1xuXHRcdHRoaXMuc2V0RGF0YSh7fSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHtcblx0XHRcdG1vZHVsZU5hbWU6IE9QVF9ERUZBVUxUX01PRFVMRV9OQU1FLFxuXHRcdFx0Y29udGFpbmVyU2VsZWN0b3I6IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUixcblx0XHRcdHByZWZpeDogdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMubW9kdWxlJyksXG5cdFx0XHRwb3N0Zml4OiBPUFRfREVGQVVMVF9WSUVXU19QT1NURklYLFxuXHRcdFx0cmVuZGVyRnJvbVVSTDogT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMLFxuXHRcdFx0bmFtZXM6e1xuXHRcdFx0XHRwbHVyYWw6T1BUX0RFRkFVTFRfUExVUkFMX05BTUUsXG5cdFx0XHRcdHNpbmdsZTogT1BUX0RFRkFVTFRfU0lOR0xFX05BTUVcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMuaW5pdFJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHQvKlxuXHRcdCAgICDRgdGA0LDQt9GDINC00LXQu9Cw0LXQvCDQtNC+0YHRgtGD0L/QvdGL0LzQuCDQvNC+0LTQtdC70Lggbm90UmVjb3JkINC40LcgbmNgQ29udHJvbGxlck5hbWVgINCx0YPQtNGD0YIg0LTQvtGB0YLRg9C/0L3RiyDQutCw0LogdGhpcy5ucmBNb2RlbE5hbWVgXG5cdFx0Ki9cblx0XHRsZXQgaW50ZXJmYWNlcyA9IHRoaXMuYXBwLmdldEludGVyZmFjZXMoKTtcblx0XHR0aGlzLm1ha2UgPSB7fTtcblx0XHRmb3IgKGxldCB0IGluIGludGVyZmFjZXMpIHtcblx0XHRcdGlmIChpbnRlcmZhY2VzLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0dGhpcy5tYWtlW3RdID0gaW50ZXJmYWNlc1t0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVuZGVyKCl7XG5cdFx0dGhpcy5yZW5kZXIodGhpcy5nZXRXb3JraW5nKCd2aWV3TmFtZScpLCB0aGlzLmdldERhdGEoKSwgdGhpcy5nZXRXb3JraW5nKCdoZWxwZXJzJykpO1xuXHR9XG5cblx0cmVuZGVyKHZpZXdOYW1lID0nZGVmYXVsdCcgLyogdmlldyBuYW1lICovLCBkYXRhID0ge30gLyogZGF0YSBmb3Igbm90VGVtcGxhdGUqLyAsIGhlbHBlcnMgPSB7fS8qIGNvdWxkIGJlIG5vdCByZXByZXNlbnRlZCAqLykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0dmFyIHZpZXcgPSB0aGlzLmdldFZpZXcodmlld05hbWUpO1xuXG5cdFx0XHRpZiAodHlwZW9mIHZpZXcgPT09ICd1bmRlZmluZWQnIHx8IHZpZXcgPT09IG51bGwpIHtcblx0XHRcdFx0cmVqZWN0KCdObyB2aWV3IGZvdW5kJywgdmlld05hbWUpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZpZXcgPSBub3RDb21tb24uZXh0ZW5kKHt9LCB2aWV3KTtcblx0XHRcdFx0Ly8g0LXRgdC70LggcGxhY2Ug0L3QtSDRg9C60LDQt9Cw0L3Qviwg0YfRgtC+INCy0L7Qt9C80L7QttC90L4g0Lgg0YDQsNC30YPQvNC90L4g0L/RgNC4INC90LUg0YHRg9GJ0LXRgdGC0LLQvtCy0LDQvdC40Lhcblx0XHRcdFx0Ly8g0Y3Qu9C10LzQtdC90YLQsCwg0L3QviDQuNC30LLQtdGB0YLQvdC+0Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YDQtVxuXHRcdFx0XHRpZiAoKCh0eXBlb2Ygdmlldy50YXJnZXRFbCA9PT0gJ3VuZGVmaW5lZCcpIHx8ICh2aWV3LnRhcmdldEVsID09PSBudWxsKSkgJiYgKHR5cGVvZiB2aWV3LnRhcmdldFF1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3LnRhcmdldFF1ZXJ5ICE9PSBudWxsICYmIHZpZXcudGFyZ2V0UXVlcnkubGVuZ3RoID4gMCkpIHtcblx0XHRcdFx0XHR2aWV3LnRhcmdldEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2aWV3LnRhcmdldFF1ZXJ5KTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2aWV3LmRhdGEgPSBkYXRhO1xuXHRcdFx0XHRpZiAodHlwZW9mIHZpZXcuaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5oZWxwZXJzICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHZpZXcuaGVscGVycykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZpZXcuaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQodmlldy5oZWxwZXJzLCBoZWxwZXJzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8v0LXRgdC70Lgg0L3Rg9C20L3QviDQt9Cw0LPRgNGD0LbQsNGC0Ywg0YjQsNCx0LvQvtC90Ytcblx0XHRcdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyRnJvbVVSTCcpKSB7XG5cdFx0XHRcdFx0Ly/QuCDQsNC00YDQtdGBINC90LUg0YPQutCw0LfQsNC9XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LnRlbXBsYXRlVVJMID09PSAndW5kZWZpbmVkJyB8fCB2aWV3LnRlbXBsYXRlVVJMID09IG51bGwgfHwgdmlldy50ZW1wbGF0ZVVSTC5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHRcdFx0bGV0IHByZWZpeCA9ICh2aWV3LmNvbW1vbiA/IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLmNvbW1vbicpOiB0aGlzLmdldE1vZHVsZVByZWZpeCgpKSxcblx0XHRcdFx0XHRcdFx0bmFtZSA9ICgodHlwZW9mIHZpZXcubmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5uYW1lICE9PSBudWxsICYmIHZpZXcubmFtZS5sZW5ndGggPiAwKSA/IHZpZXcubmFtZSA6IHZpZXdOYW1lKSxcblx0XHRcdFx0XHRcdFx0cG9zdGZpeCA9IHRoaXMuZ2V0T3B0aW9ucygncG9zdGZpeCcpO1xuXHRcdFx0XHRcdFx0Ly/Qs9C10L3QtdGA0LjRgNGD0LXQvCDQsNC00YDQtdGBINC/0L4g0YjQsNCx0LvQvtC90YNcblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVVUkwgPSAgW3ByZWZpeCwgbmFtZV0uam9pbignLycpICsgcG9zdGZpeDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly/QsCDQtdGB0LvQuCDQtdGB0YLRjCDQvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwLCDRgtC+XG5cdFx0XHRcdFx0aWYgKHZpZXcuaGFzT3duUHJvcGVydHkoJ3RlbXBsYXRlTmFtZScpKSB7XG5cdFx0XHRcdFx0XHQvLy4uLlxuXHRcdFx0XHRcdFx0dmlldy50ZW1wbGF0ZU5hbWUgPSB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgdmlldy50ZW1wbGF0ZU5hbWUgKyB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0XHRkYXRhLFxuXHRcdFx0XHRcdHRlbXBsYXRlOntcblx0XHRcdFx0XHRcdG5hbWU6IHZpZXcudGVtcGxhdGVOYW1lLFxuXHRcdFx0XHRcdFx0c3JjOiB2aWV3LnRlbXBsYXRlVVJMLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOltbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1dLFxuXHRcdFx0XHRcdG9wdGlvbnM6e1xuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IHZpZXcudGFyZ2V0RWwsXG5cdFx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdFx0cmVuZGVyQW5kOiB2aWV3LnJlbmRlckFuZCB8fCBPUFRfREVGQVVMVF9SRU5ERVJfQU5EXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0fVxuXG5cdGdldEFwcCgpIHtcblx0XHRyZXR1cm4gdGhpcy5hcHA7XG5cdH1cblxuXHRzZXRNb2RlbChtb2RlbCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZWwnLCBtb2RlbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNb2RlbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdtb2RlbCcpO1xuXHR9XG5cblx0c2V0UmVhZHkodmFsID0gdHJ1ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB2YWwpO1xuXHRcdHZhbCA/IHRoaXMudHJpZ2dlcigncmVhZHknKSA6IHRoaXMudHJpZ2dlcignYnVzeScpO1xuXHR9XG5cblx0c2V0VmlldyhuYW1lLCB2aWV3KXtcblx0XHR0aGlzLnNldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpLCB2aWV3KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFZpZXdzKHZpZXdzKXtcblx0XHRmb3IobGV0IHQgaW4gdmlld3Mpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCB0KSwgdmlld3NbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFZpZXcobmFtZSA9ICdkZWZhdWx0Jyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgbmFtZSkpO1xuXHR9XG5cblx0c2V0TW9kdWxlTmFtZSh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ21vZHVsZU5hbWUnLCB2YWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kdWxlTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdtb2R1bGVOYW1lJyk7XG5cdH1cblxuXHRnZXRNb2R1bGVQcmVmaXgoKXtcblx0XHRyZXR1cm4gW3RoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZXMnKSwgdGhpcy5nZXRNb2R1bGVOYW1lKCldLmpvaW4oJy8nKTtcblx0fVxuXG5cdHByZWxvYWRMaWIobGlzdCA9IHt9KXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGlmKHR5cGVvZiBsaXN0ICE9PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBsaXN0KXtcblx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5wdXNoKGxpc3RbdF0pO1xuXHRcdFx0XHRcdHRoaXMubWFrZVtsaXN0W3RdXSh7fSkuJGxpc3RBbGwoKVxuXHRcdFx0XHRcdFx0LnRoZW4oKGRhdGEpPT57XG5cdFx0XHRcdFx0XHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdsaWJzJykpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0T3B0aW9ucygnbGlicycsIHt9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKVt0XSA9IGRhdGE7XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2YobGlzdFt0XSkgPiAtMSl7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuc3BsaWNlKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2YobGlzdFt0XSksIDEpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmNhdGNoKChlcnIpPT57XG5cdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoZXJyKTtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cXVlZVVwbG9hZChuYW1lLCBsaXN0KXtcblx0XHQvL2hhc2ggKGZpZWxkTmFtZT0+ZmlsZXNMaXN0KVxuXHRcdGlmKCF0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnLCB7fSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkUXVlZScpW25hbWVdID0gbGlzdDtcblx0fVxuXG5cdGV4ZWNVcGxvYWRzKGl0ZW0pe1xuXHRcdGxldCBsaXN0ID0gdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRRdWVlJyk7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRpZih0eXBlb2YgbGlzdCAhPT0gJ29iamVjdCcpe1xuXHRcdFx0XHRyZXNvbHZlKGl0ZW0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygndXBsb2FkaW5nJywge30pO1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gbGlzdCl7XG5cdFx0XHRcdFx0bGV0IGZpZWxkRmlsZXMgPSBsaXN0W3RdO1xuXHRcdFx0XHRcdGlmIChmaWVsZEZpbGVzLmxlbmd0aCA+IDEpe1xuXHRcdFx0XHRcdFx0aXRlbVt0XSA9IFtdO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0aXRlbVt0XSA9ICcnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IobGV0IGYgPSAwOyBmIDwgZmllbGRGaWxlcy5sZW5ndGg7IGYrKyl7XG5cdFx0XHRcdFx0XHRpZighdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKS5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0gPSAwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XSsrO1xuXHRcdFx0XHRcdFx0dGhpcy5hcHAuZ2V0V29ya2luZygndXBsb2FkZXInKVxuXHRcdFx0XHRcdFx0XHQudXBsb2FkKGZpZWxkRmlsZXNbZl0pXG5cdFx0XHRcdFx0XHRcdC50aGVuKChzYXZlZEZpbGUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnZmlsZSB1cGxvYWRlZCcsIHQsZiwgc2F2ZWRGaWxlKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdLS07XG5cdFx0XHRcdFx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XSA9PT0gMCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheShpdGVtW2ZdKSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtW3RdLnB1c2goc2F2ZWRGaWxlLmhhc2gpO1xuXHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVt0XSA9IHNhdmVkRmlsZS5oYXNoO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZihPYmplY3Qua2V5cyh0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRcdG5vdEZyYW1ld29yay5ub3RDb21tb24ucmVwb3J0KGVycik7XG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZihPYmplY3Qua2V5cyh0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdHJlc29sdmUoaXRlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoLmpzJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi4vbm90Um91dGVyJztcblxudmFyIG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiA9IHtcblx0Y29udGVudDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmluZGV4T2YoJ2NhcGl0YWxpemUnKSA+IC0xKSB7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQudG9VcHBlckNhc2UoKTtcblx0XHR9XG5cdFx0c2NvcGUuZWxlbWVudC50ZXh0Q29udGVudCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdDtcblx0fSxcblx0YmluZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoc2NvcGUucGFyYW1zWzBdLCAoZSkgPT4ge1xuXHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0cmV0dXJuIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCh7XG5cdFx0XHRcdFx0c2NvcGUsXG5cdFx0XHRcdFx0aXRlbSxcblx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdGVcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblx0dmFsdWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGxpdmVFdmVudHMgPSBbJ2NoYW5nZScsICdrZXl1cCddLFxuXHRcdFx0b25FdmVudCA9ICgpID0+IHtcblx0XHRcdFx0aWYgKFsnY2hlY2tib3gnLCAncmFkaW8nLCAnc2VsZWN0LW11bHRpcGxlJ10uaW5kZXhPZihzY29wZS5lbGVtZW50LnR5cGUpID4gLTEpIHtcblx0XHRcdFx0XHRzd2l0Y2ggKHNjb3BlLmVsZW1lbnQudHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgJ2NoZWNrYm94Jzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3JhZGlvJzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkP3Njb3BlLmVsZW1lbnQudmFsdWU6bnVsbCk7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KGhlbHBlcnMuZmllbGQubmFtZSwgaGVscGVycy5kYXRhLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQgPyBzY29wZS5lbGVtZW50LnZhbHVlIDogbnVsbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdzZWxlY3QtbXVsdGlwbGUnOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRsZXQgc2VsZWN0ZWQgPSBbXS5zbGljZS5jYWxsKHNjb3BlLmVsZW1lbnQuc2VsZWN0ZWRPcHRpb25zKS5tYXAoYSA9PiBhLnZhbHVlKTtcblx0XHRcdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnc2VsZWN0LW11bHRpcGxlJywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSwgJyAtPiAnLHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSAhPT0gdHJ1ZSkge1xuXHRcdFx0aWYoc2NvcGUuZWxlbWVudC50eXBlID09PSAndGV4dGFyZWEnKXtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1cblx0XHRcdGZvciAobGV0IHQgb2YgbGl2ZUV2ZW50cykge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodCwgb25FdmVudCk7XG5cdFx0XHR9XG5cdFx0XHRzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlID0gdHJ1ZTtcblx0XHR9XG5cdH0sXG5cdGF0dHI6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpIHx8IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlcyA9PT0gJ2Z1bmN0aW9uJykgPyByZXMoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzKTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZShzY29wZS5wYXJhbXNbMF0sIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdH0sXG5cdG5hbWU6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdH0sXG5cdGNoYW5nZTogZnVuY3Rpb24oIC8qc2NvcGUsIGl0ZW0sIGhlbHBlcnMqLyApIHtcblxuXHR9LFxuXHRjaGVja2VkOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXN1bHQgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXN1bHQgPT09ICdmdW5jdGlvbicpID8gcmVzdWx0KHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlc3VsdCk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID8gc2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKSA6IHNjb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG5cdH0sXG5cdGNsYXNzOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpID8gcmVzKHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlcyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPCAzIHx8IGlzTmFOKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpIHtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IHVzZWQgPSBmYWxzZTtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcGUucGFyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChpID09PSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0XHR1c2VkID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCF1c2VkKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0b3B0aW9uczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgaSA9IDAsXG5cdFx0XHRvcHRpb24gPSBudWxsLFxuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSAndmFsdWUnLFxuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSAnbmFtZScsXG5cdFx0XHRpdGVtVmFsdWVGaWVsZE5hbWUgPSBoZWxwZXJzLmhhc093blByb3BlcnR5KCdmaWVsZCcpICYmIGhlbHBlcnMuZmllbGQuaGFzT3duUHJvcGVydHkoJ25hbWUnKSA/IGhlbHBlcnMuZmllbGQubmFtZSA6ICd2YWx1ZSc7XG5cdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHR9XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDMpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0XHRpdGVtVmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMl07XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgaGVscGVycyAhPT0gbnVsbCAmJiBoZWxwZXJzLmhhc093blByb3BlcnR5KCdkZWZhdWx0JykgJiYgaGVscGVycy5kZWZhdWx0KSB7XG5cdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJycpO1xuXHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gaGVscGVycy5wbGFjZWhvbGRlcjtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtICE9PSBudWxsKSB7XG5cdFx0XHR2YXIgbGliID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbGliLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsIGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pO1xuXHRcdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBsaWJbaV1bbGFiZWxGaWVsZE5hbWVdO1xuXHRcdFx0XHRpZiAoaGVscGVycy5maWVsZC5hcnJheSkge1xuXHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0gJiYgQXJyYXkuaXNBcnJheShpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0pKXtcblx0XHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0uaW5kZXhPZihsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChpdGVtW2l0ZW1WYWx1ZUZpZWxkTmFtZV0gPT09IGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pIHtcblx0XHRcdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYXBwZW5kQ2hpbGQob3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGhyZWY6ZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGlmICghc2NvcGUuZWxlbWVudC5ub3RSb3V0ZXJJbml0aWFsaXplZCl7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgbm90Um91dGVyLmdldEZ1bGxSb3V0ZShzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKTtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9Pntcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRub3RSb3V0ZXIubmF2aWdhdGUobm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdHNjb3BlLmVsZW1lbnQubm90Um91dGVySW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdH1cblx0fVxufTtcbmV4cG9ydCBkZWZhdWx0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYjtcbiIsImltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi4vbm90UmVjb3JkJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYID0gJ2Zvcm1fJyxcblx0T1BUX0RFRkFVTFRfUk9MRV9OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9GT1JNX1RJVExFID0gJ0Zvcm0gZGVmYXVsdCB0aXRsZScsXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04gPSB7fSxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QgPSBbJ29wdGlvbnMnLCAnbWFuaWZlc3QnLCAnYXBwJ107XG5cbmNsYXNzIG5vdEZvcm0gZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3ByZWZpeCcsIE9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnRzJywgW10pO1xuXHRcdGlmICghdGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuc2V0RGF0YShuZXcgbm90UmVjb3JkKHt9LCB0aGlzLmdldERhdGEoKSkpO1xuXHRcdH1cblx0XHR0aGlzLm9uKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ3Jlc2V0JywgdGhpcy5vblJlc2V0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NhbmNlbCcsIHRoaXMub25DYW5jZWwuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YSgpIHtcblx0XHRsZXQgbWFuaWZlc3QgPSB0aGlzLmdldE1hbmlmZXN0KCk7XG5cdFx0aWYgKG1hbmlmZXN0ICYmIG1hbmlmZXN0LmFjdGlvbnMpIHtcblx0XHRcdHJldHVybiBtYW5pZmVzdC5hY3Rpb25zLmhhc093blByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJykpID8gbWFuaWZlc3QuYWN0aW9uc1t0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpXSA6IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGdldEZvcm1GaWVsZHNMaXN0KCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCksXG5cdFx0XHRsaXN0ID0gW10sXG5cdFx0XHRyb2xlID0gdGhpcy5nZXRPcHRpb25zKCdyb2xlJywgT1BUX0RFRkFVTFRfUk9MRV9OQU1FKTtcblx0XHRpZiAoYWN0aW9uRGF0YSkge1xuXG5cdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMpIHtcblx0XHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzLmhhc093blByb3BlcnR5KHJvbGUpKSB7XG5cdFx0XHRcdFx0bGlzdCA9IGFjdGlvbkRhdGEuZmllbGRzW3JvbGVdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0Lypcblx0XHRSZW5kZXJpbmdcblx0Ki9cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdH1cblxuXHRnZXRQYXJ0VGVtcGxhdGVOYW1lKGZvcm1QYXJ0KXtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIGZvcm1QYXJ0O1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaW5wdXQgPSB7XG5cdFx0XHRcdGRhdGE6IHRoaXMuZ2V0V3JhcHBlckRhdGEoKSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoJ3dyYXBwZXInKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpLFxuXHRcdFx0XHRcdGlkOiB0aGlzLmdldE9wdGlvbnMoJ2lkJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgdGhpcy5iaW5kRm9ybUV2ZW50cy5iaW5kKHRoaXMpXSxcblx0XHRcdFx0XHRbWydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fTtcblx0XHRcdGxldCB3cmFwcGVyID0gbmV3IG5vdENvbXBvbmVudChpbnB1dCk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3dyYXBwZXInLCB3cmFwcGVyKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXcmFwcGVyRGF0YSgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpO1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogYWN0aW9uRGF0YS50aXRsZSA/IGFjdGlvbkRhdGEudGl0bGUgOiBPUFRfREVGQVVMVF9GT1JNX1RJVExFXG5cdFx0fTtcblx0fVxuXG5cdHJlbmRlckNvbXBvbmVudHMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpICYmIHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aCl7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRGb3JtRmllbGRzTGlzdCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0bGV0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKVt0XTtcblx0XHRcdFx0dGhpcy5hZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsZWFyRmllbGRzQ29tcG9uZW50cygpIHtcblx0XHRsZXQgY29tcHMgPSB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKTtcblx0XHR3aGlsZSAoY29tcHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29tcHNbMF0uY29tcG9uZW50LmRlc3Ryb3koKTtcblx0XHRcdGNvbXBzLnNwbGljZSgwLCAxKTtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHNMaWJzKCl7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdG9wdGlvbnM6IHt9LFxuXHRcdFx0bWFuaWZlc3Q6IHt9LFxuXHRcdFx0YXBwOiB7fSxcblx0XHR9O1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpKSB7XG5cdFx0XHRyZXN1bHQub3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmIChub3RDb21tb24uZ2V0QXBwKCkgJiYgbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpKXtcblx0XHRcdHJlc3VsdC5hcHAgPSBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCAmJiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpKXtcblx0XHRcdHJlc3VsdC5tYW5pZmVzdCA9IHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkuZmllbGRzO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpIHtcblx0XHRsZXQgZGVmID0gT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTixcblx0XHRcdGZpZWxkc0xpYnMgPSB0aGlzLmdldEZpZWxkc0xpYnMoKTtcblx0XHRmb3IobGV0IHQgb2YgT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1Qpe1xuXHRcdFx0aWYgKGZpZWxkc0xpYnMuaGFzT3duUHJvcGVydHkodCkgJiYgZmllbGRzTGlic1t0XS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpKXtcblx0XHRcdFx0cmV0dXJuIGZpZWxkc0xpYnNbdF1bZmllbGROYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSkge1xuXHRcdGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKTtcblx0XHRsZXQgcmVjID0ge1xuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0bmFtZTogZmllbGROYW1lLFxuXHRcdFx0XHR0aXRsZTogZmllbGRUeXBlLmxhYmVsIHx8IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0dHlwZTogZmllbGRUeXBlLnR5cGUsXG5cdFx0XHRcdGxhYmVsOiBmaWVsZFR5cGUubGFiZWwsXG5cdFx0XHRcdGFycmF5OiBmaWVsZFR5cGUuYXJyYXksXG5cdFx0XHRcdGRlZmF1bHQ6IGZpZWxkVHlwZS5kZWZhdWx0LFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMobm90UGF0aC5qb2luKCdoZWxwZXJzJywnbGlicycsZmllbGROYW1lKSlcblx0XHRcdH1cblx0XHR9O1xuXHRcdGxldCBoZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRpc0NoZWNrZWQ6IChwYXJhbXMpPT57XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cblx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoZmllbGRUeXBlLnR5cGUpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRGb3JtVGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0Jyxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbJ2FmdGVyRGF0YUNoYW5nZScsIHRoaXMuY29sbGVjdERhdGFGcm9tQ29tcG9uZW50cy5iaW5kKHRoaXMpXVxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykucHVzaChyZWMpO1xuXHR9XG5cblx0Y29sbGVjdERhdGFGcm9tQ29tcG9uZW50cyhwYXJhbXMpe1xuXHRcdG5vdENvbW1vbi5sb2coJ2NvbGxlY3QgZGF0YSBmcm9tIGNvbXBvbmVudHMnLCBwYXJhbXMpO1xuXHR9XG5cblx0Z2V0Rm9ybVRhcmdldEVsZW1lbnQodGFyZ2V0ID0gJ2JvZHknKXtcblx0XHRpZiAoIXRhcmdldCl7dGFyZ2V0ID0gJ2JvZHknO31cblx0XHRsZXQgcmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHRpZiAoIXJlcyAmJiB0YXJnZXQhPT0nYm9keScpe1xuXHRcdFx0dGFyZ2V0ID0gJ2JvZHknO1xuXHRcdFx0cmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHR9XG5cdFx0aWYoIXJlcyAmJiB0YXJnZXQ9PSdib2R5Jyl7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdGNvbGxlY3REYXRhKCkge1xuXHRcdC8vbGV0IGRhdGEgPSB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKTtcblx0fVxuXG5cdGJpbmRGb3JtRXZlbnRzKCl7XG5cdFx0bGV0IHRhcmdldFF1ZXJ5ID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpO1xuXHRcdGlmKHRhcmdldFF1ZXJ5KXtcblx0XHRcdGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFF1ZXJ5KTtcblx0XHRcdGlmKHRhcmdldCl7XG5cdFx0XHRcdHRoaXMuc2V0T3B0aW9ucygndGFyZ2V0RWwnLCB0YXJnZXQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKXtcblx0XHRcdGxldFx0Zm9ybSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG5cdFx0XHRpZihmb3JtKXtcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXHRcdFx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2V0JywgdGhpcy5vblJlc2V0LmJpbmQodGhpcykpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZUZpZWxkKGZpZWxkTmFtZSl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5maWVsZC5uYW1lID09PSBmaWVsZE5hbWUpe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdEV2ZW50IGhhbmRsZXJzXG5cdCovXG5cblx0b25TdWJtaXQoKSB7XG5cblx0fVxuXG5cdG9uQ2FuY2VsKCkge1xuXG5cdH1cblxuXHRvblJlc2V0KCkge1xuXG5cdH1cblxuXHRnZXRGaWVsZHMoKSB7XG5cblx0fVxuXG5cdGFkZEZpZWxkKCkge1xuXG5cdH1cblxuXHRyZW1vdmVGaWVsZCgpIHtcblxuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RGb3JtO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfUEFHRV9TSVpFID0gMjAsXG5cdE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSID0gMCxcblx0T1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04gPSAxLFxuXHRPUFRfREVGQVVMVF9TT1JUX0ZJRUxEID0gJ19pZCcsXG5cdE9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DID0gJ3ByZXByb2Nlc3Nvcic7XG5cbmNsYXNzIG5vdFRhYmxlIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgW10pO1xuXHRcdGlmKCF0aGlzLmdldERhdGEoKSB8fCAhQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoJ3Jvd3MnKSkpe1xuXHRcdFx0dGhpcy5zZXREYXRhKHtyb3dzOltdfSk7XG5cdFx0fVxuXHRcdHRoaXMucmVzZXRQYWdlcigpO1xuXHRcdHRoaXMucmVzZXRGaWx0ZXIoKTtcblx0XHR0aGlzLnJlc2V0U29ydGVyKCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRkYXRhOiB7fSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiAndGFibGVfd3JhcHBlcidcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdHJlbmRlckFuZDogdGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJJbnNpZGUuYmluZCh0aGlzKVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudCcsIGNvbXBvbmVudCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVySW5zaWRlKCkge1xuXHRcdHRoaXMucmVuZGVySGVhZGVyKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdFx0dGhpcy5yZW5kZXJCb2R5KCk7XG5cdFx0dGhpcy5iaW5kU2VhcmNoKCk7XG5cdFx0dGhpcy5iaW5kQ3VzdG9tQmluZGluZ3MoKTtcblx0fVxuXG5cdHJlbmRlckhlYWRlcigpIHtcblx0XHR2YXIgdGFibGVIZWFkZXIgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGhlYWQgdHInKTtcblx0XHRpZiAoIXRhYmxlSGVhZGVyKSByZXR1cm47XG5cdFx0bGV0IGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBuZXdUaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJyk7XG5cdFx0XHRuZXdUaC5pbm5lckhUTUwgPSBmaWVsZHNbaV0udGl0bGU7XG5cdFx0XHRpZiAoZmllbGRzW2ldLmhhc093blByb3BlcnR5KCdzb3J0YWJsZScpICYmIGZpZWxkc1tpXS5zb3J0YWJsZSkge1xuXHRcdFx0XHR0aGlzLmF0dGFjaFNvcnRpbmdIYW5kbGVycyhuZXdUaCwgZmllbGRzW2ldLnBhdGgpO1xuXHRcdFx0fVxuXHRcdFx0dGFibGVIZWFkZXIuYXBwZW5kQ2hpbGQobmV3VGgpO1xuXHRcdH1cblx0fVxuXG5cdGF0dGFjaFNvcnRpbmdIYW5kbGVycyhoZWFkQ2VsbCwgZmllbGROYW1lKSB7XG5cdFx0aGVhZENlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5jaGFuZ2VTb3J0aW5nT3B0aW9ucyhoZWFkQ2VsbCwgZmllbGROYW1lKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblx0XHRoZWFkQ2VsbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdH1cblxuXHRjaGFuZ2VTb3J0aW5nT3B0aW9ucyhlbCwgZmllbGROYW1lKSB7XG5cdFx0aWYgKGZpZWxkTmFtZSA9PT0gdGhpcy5nZXRTb3J0ZXIoKS5zb3J0QnlGaWVsZCl7XG5cdFx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRcdHNvcnRCeUZpZWxkOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHNvcnREaXJlY3Rpb246IC0xICogdGhpcy5nZXRTb3J0ZXIoKS5zb3J0RGlyZWN0aW9uLFxuXHRcdFx0fSk7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRcdHNvcnRCeUZpZWxkOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHNvcnREaXJlY3Rpb246IE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmIChlbC5wYXJlbnROb2RlKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsLnBhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0gPT09IGVsKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ25vbmUnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0U29ydGVyKCkuc29ydERpcmVjdGlvbiA+IDApIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ2FzY2VuZGluZycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdkZXNjZW5kaW5nJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0U29ydGVyKGhhc2gpIHtcblx0XHQvL2NvbnNvbGUubG9nKCdzZXRTb3J0ZXInLCBoYXNoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3NvcnRlcicsIGhhc2gpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZURhdGEoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0U29ydGVyKCl7XG5cdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0c29ydEJ5RmllbGQ6IE9QVF9ERUZBVUxUX1NPUlRfRklFTEQsXG5cdFx0XHRzb3J0RGlyZWN0aW9uOiBPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTixcblx0XHR9KTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdGdldEZpbHRlclNlYXJjaCgpIHtcblx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmdldEZpbHRlcigpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldEZpbHRlcigpICE9PSBudWxsICYmIHR5cGVvZiB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2ggIT09IG51bGwpID8gdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2gudG9TdHJpbmcoKSA6ICcnO1xuXHR9XG5cblx0aW52YWxpZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ29uZVBhZ2VyJykpIHtcblx0XHRcdHdoaWxlKHRoaXMuZ2V0RGF0YSgncm93cycpLmxlbmd0aD4wKXtcblx0XHRcdFx0dGhpcy5nZXREYXRhKCdyb3dzJykucG9wKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR9XG5cdH1cblxuXHRzZXRGaWx0ZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgaGFzaCk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlRGF0YSgpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpcy5zZXRGaWx0ZXIoe30pO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0UGFnZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncGFnZXInLCBoYXNoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdwYWdlcicsIHtcblx0XHRcdHBhZ2VTaXplOiBpc05hTih0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJykpID8gT1BUX0RFRkFVTFRfUEFHRV9TSVpFOnRoaXMuZ2V0T3B0aW9ucygncGFnZVNpemUnKSxcblx0XHRcdHBhZ2VOdW1iZXI6IGlzTmFOKHRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpKSA/IE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSOnRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncGFnZXInKTtcblx0fVxuXG5cdHNldFVwZGF0aW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndXBkYXRpbmcnLCB0cnVlKTtcblx0fVxuXG5cdHNldFVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd1cGRhdGluZycsIGZhbHNlKTtcblx0fVxuXG5cdGlmVXBkYXRpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndXBkYXRpbmcnKTtcblx0fVxuXG5cdHVwZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKSB7XG5cdFx0XHRpZiAodGhpcy5pZlVwZGF0aW5nKCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly9sb2FkIGZyb20gc2VydmVyXG5cdFx0XHRsZXQgcXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKHt9KVxuXHRcdFx0XHQuc2V0RmlsdGVyKHRoaXMuZ2V0RmlsdGVyKCkpXG5cdFx0XHRcdC5zZXRTb3J0ZXIodGhpcy5nZXRTb3J0ZXIoKSlcblx0XHRcdFx0LnNldFBhZ2VyKHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSwgdGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpO1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0cXVlcnkuJGxpc3QoKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJyRsaXN0IGZvciB0YWJsZScsIGRhdGEpO1xuXHRcdFx0XHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRcdFx0XHRyb3dzOiB0aGlzLmdldERhdGEoJ3Jvd3MnKS5jb25jYXQoZGF0YSlcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR0aGlzLnByb2NjZXNzRGF0YSgpO1xuXHRcdFx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKGUpO1xuXHRcdFx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9sb2NhbCBtYWdpY1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0dGhpcy5wcm9jY2Vzc0RhdGEoKTtcblx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdH1cblx0fVxuXG5cdHByb2NjZXNzRGF0YSgpIHtcblx0XHR2YXIgdGhhdEZpbHRlciA9IHRoaXMuZ2V0RmlsdGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0RmlsdGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyICE9PSBudWxsICYmIHR5cGVvZiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2ggIT09IG51bGwgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2gubGVuZ3RoID4gMCkge1xuXHRcdFx0Ly9cblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgdGhpcy5nZXREYXRhKCdyb3dzJykuZmlsdGVyKHRoaXMudGVzdERhdGFJdGVtLmJpbmQodGhpcykpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKSk7XG5cdFx0fVxuXHRcdC8vLy9zb3J0ZXJcblx0XHR2YXIgdGhhdFNvcnRlciA9IHRoaXMuZ2V0U29ydGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0U29ydGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0U29ydGVyICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4ge1xuXHRcdFx0XHRsZXQgdDEgPSBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLCBpdGVtMSwge30pLFxuXHRcdFx0XHRcdHQyID0gbm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCxpdGVtMix7fSk7XG5cdFx0XHRcdGlmIChpc05hTih0MSkpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHQxICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdDIgIT09ICd1bmRlZmluZWQnICYmIHQxLmxvY2FsZUNvbXBhcmUpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIHQxLmxvY2FsZUNvbXBhcmUoKSAqIC0gdGhhdFNvcnRlci5zb3J0RGlyZWN0aW9uO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiAoKHQxIDwgdDIpID8gMSA6IC0xKSAqIHRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0YmluZFNlYXJjaCgpIHtcblx0XHR2YXIgc2VhcmNoRWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInNlYXJjaFwiXScpWzBdO1xuXHRcdGlmICghc2VhcmNoRWwpIHJldHVybjtcblx0XHR2YXIgb25FdmVudCA9IChlKSA9PiB7XG5cdFx0XHR0aGlzLnNldEZpbHRlcih7XG5cdFx0XHRcdGZpbHRlclNlYXJjaDogZS5jdXJyZW50VGFyZ2V0LnZhbHVlXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH07XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbkV2ZW50KTtcblx0XHRzZWFyY2hFbC5hZGRFdmVudExpc3RlbmVyKCdlbnRlcicsIG9uRXZlbnQpO1xuXHR9XG5cblxuXHRiaW5kQ3VzdG9tQmluZGluZ3MoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykgfHwgIXRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IgKHZhciBzZWxlY3RvciBpbiB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHZhciBlbHMgPSB0aGlzLmdldE9wdGlvbigndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdGZvciAodmFyIGVsSWQgPSAwOyBlbElkIDwgZWxzLmxlbmd0aDsgZWxJZCsrKSB7XG5cdFx0XHRcdHZhciBlbCA9IGVsc1tlbElkXTtcblx0XHRcdFx0Zm9yICh2YXIgZXZlbnQgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpW3NlbGVjdG9yXSkge1xuXHRcdFx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl1bZXZlbnRdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvYWROZXh0KCkge1xuXHRcdHRoaXMuZ2V0V29ya2luZygncGFnZXInKS5wYWdlTnVtYmVyKys7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZW5kZXJSb3coaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbmV3Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVFInKSxcblx0XHRcdGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBuZXdUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1REJyksXG5cdFx0XHRcdGZpZWxkID0gZmllbGRzW2ldLFxuXHRcdFx0XHRwcmVwcm9jZXNzZWQgPSBudWxsLFxuXHRcdFx0XHR2YWwgPSBub3RQYXRoLmdldChmaWVsZC5wYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2VkaXRhYmxlJykgJiYgIWZpZWxkLmhhc093blByb3BlcnR5KCdjb21wb25lbnQnKSkge1xuXHRcdFx0XHRuZXdUZC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRFZGl0YWJsZScsIHRydWUpO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0LnBhdGggPSBmaWVsZC5wYXRoO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0Lml0ZW1JZCA9IGl0ZW1bdGhpcy5nZXRPcHRpb25zKCdpdGVtSWRGaWVsZCcpXTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC52YWx1ZSA9IHZhbDtcblx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpPT57XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksIG5ld1RkLnRleHRDb250ZW50KTtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoT1BUX0ZJRUxEX05BTUVfUFJFX1BST0MpKSB7XG5cdFx0XHRcdHByZXByb2Nlc3NlZCA9IGZpZWxkW09QVF9GSUVMRF9OQU1FX1BSRV9QUk9DXSh2YWwsIGl0ZW0sIGluZGV4KTtcblx0XHRcdH1cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnY29tcG9uZW50JykpIHtcblx0XHRcdFx0bmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YTogZmllbGQuY29tcG9uZW50LmRhdGEgfHwgcHJlcHJvY2Vzc2VkIHx8IHt2YWwsIGl0ZW0sIGluZGV4fSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTogZmllbGQuY29tcG9uZW50LnRlbXBsYXRlLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBuZXdUZCxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IGZpZWxkLmNvbXBvbmVudC5ldmVudHMgfHwgW11cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXdUZC5pbm5lckhUTUwgPSBwcmVwcm9jZXNzZWQgfHwgdmFsO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdldmVudHMnKSAmJiBmaWVsZC5ldmVudHMpIHtcblx0XHRcdFx0Zm9yICh2YXIgaiBpbiBmaWVsZC5ldmVudHMpIHtcblx0XHRcdFx0XHRuZXdUZC5hZGRFdmVudExpc3RlbmVyKGosIChlKT0+e1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZpZWxkLmV2ZW50c1tqXSh7XG5cdFx0XHRcdFx0XHRcdGV2ZW50OiBlLFxuXHRcdFx0XHRcdFx0XHRlbGVtZW50OiBuZXdUZCxcblx0XHRcdFx0XHRcdFx0aXRlbTogaXRlbSxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHZhbCxcblx0XHRcdFx0XHRcdFx0ZmllbGQ6IGZpZWxkXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG5ld1Jvdy5hcHBlbmRDaGlsZChuZXdUZCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3Byb2NSb3cnKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJvY1JvdycpKG5ld1JvdywgaXRlbSk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXdSb3c7XG5cdH1cblxuXHRyZWZyZXNoQm9keSgpIHtcblx0XHR2YXIgdGJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0aWYgKCF0Ym9keSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdHRoaXMuY2hlY2tGaWx0ZXJlZCgpO1xuXHRcdHZhciB0aGlzUGFnZVN0YXJ0cyA9IDAsXG5cdFx0XHRuZXh0UGFnZUVuZHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIgKyAxKTtcblx0XHRmb3IgKHZhciBpID0gdGhpc1BhZ2VTdGFydHM7IGkgPCBNYXRoLm1pbihuZXh0UGFnZUVuZHMsIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykubGVuZ3RoKTsgaSsrKSB7XG5cdFx0XHR0Ym9keS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlclJvdyh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpW2ldKSk7XG5cdFx0fVxuXHR9XG5cblx0ZmluZEJvZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuXHR9XG5cblx0Y2xlYXJCb2R5KCkge1xuXHRcdHZhciB0YWJsZUJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0aWYgKCF0YWJsZUJvZHkpIHJldHVybjtcblx0XHR0YWJsZUJvZHkuaW5uZXJIVE1MID0gJyc7XG5cdH1cblxuXHRjaGVja0ZpbHRlcmVkKCl7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykpKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJyxbXSk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyQm9keSgpIHtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnb25lUGFnZXInKSkge1xuXHRcdFx0dGhpcy5jbGVhckJvZHkoKTtcblx0XHR9XG5cdFx0dGhpcy5jaGVja0ZpbHRlcmVkKCk7XG5cdFx0dmFyIHRoaXNQYWdlU3RhcnRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyKSxcblx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpLFxuXHRcdFx0dGJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cblx0XHRmb3IgKHZhciBpID0gdGhpc1BhZ2VTdGFydHM7IGkgPCBNYXRoLm1pbihuZXh0UGFnZUVuZHMsIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykubGVuZ3RoKTsgaSsrKSB7XG5cdFx0XHR0Ym9keS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlclJvdyh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpW2ldKSk7XG5cdFx0fVxuXHR9XG5cblx0dGVzdERhdGFJdGVtKGl0ZW0pe1xuXHRcdHZhciBzdHJWYWx1ZSA9IHRoaXMuZ2V0RmlsdGVyU2VhcmNoKCkudG9Mb3dlckNhc2UoKTtcblx0XHRmb3IodmFyIGsgaW4gaXRlbSl7XG5cdFx0XHR2YXIgdG9Db21wID0gaXRlbVtrXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZiAodG9Db21wLmluZGV4T2Yoc3RyVmFsdWUpPi0xKXtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RUYWJsZTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYID0gJ2RldGFpbHNfJyxcblx0T1BUX0RFRkFVTFRfUk9MRV9OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9ERVRBSUxTX1RJVExFID0gJ0RldGFpbHMgZGVmYXVsdCB0aXRsZScsXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04gPSB7fSxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QgPSBbJ29wdGlvbnMnLCAnbWFuaWZlc3QnLCAnYXBwJ107XG5cbmNsYXNzIG5vdERldGFpbHMgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3ByZWZpeCcsIE9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnRzJywgW10pO1xuXHRcdGlmICghdGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuc2V0RGF0YShuZXcgbm90UmVjb3JkKHt9LCB0aGlzLmdldERhdGEoKSkpO1xuXHRcdH1cblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCk7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKCkge1xuXHRcdGxldCBtYW5pZmVzdCA9IHRoaXMuZ2V0TWFuaWZlc3QoKTtcblx0XHRpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QuYWN0aW9ucykge1xuXHRcdFx0cmV0dXJuIG1hbmlmZXN0LmFjdGlvbnMuaGFzT3duUHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKSkgPyBtYW5pZmVzdC5hY3Rpb25zW3RoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJyldIDogbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlzdCgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0cm9sZSA9IHRoaXMuZ2V0T3B0aW9ucygncm9sZScsIE9QVF9ERUZBVUxUX1JPTEVfTkFNRSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpIHtcblx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcykge1xuXHRcdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMuaGFzT3duUHJvcGVydHkocm9sZSkpIHtcblx0XHRcdFx0XHRsaXN0ID0gYWN0aW9uRGF0YS5maWVsZHNbcm9sZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdH1cblxuXHRnZXRQYXJ0VGVtcGxhdGVOYW1lKGZvcm1QYXJ0KXtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIGZvcm1QYXJ0O1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaW5wdXQgPSB7XG5cdFx0XHRcdGRhdGE6IHRoaXMuZ2V0V3JhcHBlckRhdGEoKSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoJ3dyYXBwZXInKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpLFxuXHRcdFx0XHRcdGlkOiB0aGlzLmdldE9wdGlvbnMoJ2lkJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbWydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fTtcblx0XHRcdGxldCB3cmFwcGVyID0gbmV3IG5vdENvbXBvbmVudChpbnB1dCk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3dyYXBwZXInLCB3cmFwcGVyKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXcmFwcGVyRGF0YSgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpO1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogYWN0aW9uRGF0YS50aXRsZSA/IGFjdGlvbkRhdGEudGl0bGUgOiBPUFRfREVGQVVMVF9ERVRBSUxTX1RJVExFXG5cdFx0fTtcblx0fVxuXG5cdHJlbmRlckNvbXBvbmVudHMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpICYmIHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aCl7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRGaWVsZHNMaXN0KCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRsZXQgZmllbGROYW1lID0gdGhpcy5nZXRGaWVsZHNMaXN0KClbdF07XG5cdFx0XHRcdHRoaXMuYWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGVhckZpZWxkc0NvbXBvbmVudHMoKSB7XG5cdFx0bGV0IGNvbXBzID0gdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJyk7XG5cdFx0d2hpbGUgKGNvbXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbXBzWzBdLmNvbXBvbmVudC5kZXN0cm95KCk7XG5cdFx0XHRjb21wcy5zcGxpY2UoMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlicygpe1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRvcHRpb25zOiB7fSxcblx0XHRcdG1hbmlmZXN0OiB7fSxcblx0XHRcdGFwcDoge30sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAobm90Q29tbW9uLmdldEFwcCgpICYmIG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKSl7XG5cdFx0XHRyZXN1bHQuYXBwID0gbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQgJiYgdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKSl7XG5cdFx0XHRyZXN1bHQubWFuaWZlc3QgPSB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpLmZpZWxkcztcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSB7XG5cdFx0bGV0IGRlZiA9IE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04sXG5cdFx0XHRmaWVsZHNMaWJzID0gdGhpcy5nZXRGaWVsZHNMaWJzKCk7XG5cdFx0Zm9yKGxldCB0IG9mIE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUKXtcblx0XHRcdGlmIChmaWVsZHNMaWJzLmhhc093blByb3BlcnR5KHQpICYmIGZpZWxkc0xpYnNbdF0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSl7XG5cdFx0XHRcdHJldHVybiBmaWVsZHNMaWJzW3RdW2ZpZWxkTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkZWY7XG5cdH1cblxuXHRhZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpIHtcblx0XHRsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSk7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGdldFRhcmdldEVsZW1lbnQodGFyZ2V0ID0gJ2JvZHknKXtcblx0XHRpZiAoIXRhcmdldCl7dGFyZ2V0ID0gJ2JvZHknO31cblx0XHRsZXQgcmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHRpZiAoIXJlcyAmJiB0YXJnZXQhPT0nYm9keScpe1xuXHRcdFx0dGFyZ2V0ID0gJ2JvZHknO1xuXHRcdFx0cmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHR9XG5cdFx0aWYoIXJlcyAmJiB0YXJnZXQ9PSdib2R5Jyl7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdHVwZGF0ZUZpZWxkKGZpZWxkTmFtZSl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5maWVsZC5uYW1lID09PSBmaWVsZE5hbWUpe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3REZXRhaWxzO1xuIiwiLypcblx0Q29tbW9uIGZ1bmN0aW9uc1xuKi9cbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuLypcblx0ZnJhbWV3b3JrIHdpZGUgcGFyc2VyIGZvciBkYXRhIGFjY2Vzc1xuKi9cbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4vbm90Um91dGVyJztcblxuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG4vKlxuXHRiYXNpYyBldmVudCBoYW5kbGVycyBhbmQgY29yZSBkYXRhIG1vZGlmaWVyc1xuKi9cbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG4vKlxuXHRzbWFydGVyIGltYWdlIGNvbnRyb2xcbiovXG5pbXBvcnQgbm90SW1hZ2UgZnJvbSAnLi90ZW1wbGF0ZS9ub3RJbWFnZSc7XG4vKlxuXHRhcHBsaWNhdGlvbiBtYWluIGluZnJhc3RydWN0dXJlIHNldHRlclxuKi9cbmltcG9ydCBub3RBcHAgZnJvbSAnLi9ub3RBcHAnO1xuLypcblx0ZGFkZHkgZm9yIHVzZXIgY29udHJvbGxlcnNcbiovXG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuL25vdENvbnRyb2xsZXInO1xuLypcblx0dGVtcGxhdGluZyBhbmQgY29tbW9uIHN0cnVjdHVyZXNcbiovXG5cbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL3RlbXBsYXRlL25vdFJlbmRlcmVyJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7IC8vIHNtYXJ0ZXIgd2l0aCBiaW5kaW5ncyBmb3IgZXZlbnRzLCBhY3R1YWx5IHByb3h5XG5cbmltcG9ydCBub3RGb3JtIGZyb20gJy4vY29tcG9uZW50cy9ub3RGb3JtJztcbmltcG9ydCBub3RUYWJsZSBmcm9tICcuL2NvbXBvbmVudHMvbm90VGFibGUnO1xuaW1wb3J0IG5vdERldGFpbHMgZnJvbSAnLi9jb21wb25lbnRzL25vdERldGFpbHMnO1xuXG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJzsgLy9cdGhvdyB0byBpbnRlcmFjdCB3aXRoIGRhdGEgb24gc2VydmVyXG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJzsgLy9cdHdyYXBwZXIgZm9yIGRhdGEgd2l0aCBzZXJ2ZXI8LT52aWV3IGxpdmUgaW50ZXJhY3Rpb25zXG5cbm5vdFRlbXBsYXRlUHJvY2Vzc29ycy5hZGQobm90VGVtcGxhdGVQcm9jZXNzb3JzTGliKTtcblxuZXhwb3J0IHtcblx0bm90Q29tbW9uLFxuXHRub3RQYXRoLFxuXHRub3RCYXNlLFxuXHRub3RJbWFnZSxcblx0bm90QXBwLFxuXHRub3RBUEksXG5cdG5vdENvbnRyb2xsZXIsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29ycyxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLFxuXHRub3RUZW1wbGF0ZUNhY2hlLFxuXHRub3RSZW5kZXJlcixcblx0bm90Q29tcG9uZW50LFxuXHRub3RGb3JtLFxuXHRub3RSb3V0ZXIsXG5cdG5vdFRhYmxlLFxuXHRub3REZXRhaWxzLFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJ1cGxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25Qcm9ncmVzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNwb25zZVR5cGUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ3aXRoQ3JlZGVudGlhbHMiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsImdldFNlc3Npb25JRCIsImZpbGUiLCJ0eXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwibmFtZSIsInNlbmQiLCJtZXRob2QiLCJkYXRhIiwib25sb2FkIiwidCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJwYXJzZUludCIsInJlc3BvbnNlVGV4dCIsImUiLCJnZXRDb29raWUiLCJ2YWx1ZSIsImRvY3VtZW50IiwiY29va2llIiwicGFydHMiLCJzcGxpdCIsImxlbmd0aCIsInBvcCIsInNoaWZ0IiwiQ29tbW9uTG9ncyIsImxvZyIsImFyZ3VtZW50cyIsImVycm9yIiwidHJhY2UiLCJNQU5BR0VSIiwiU3ltYm9sIiwiQ29tbW9uU2hvcnRzIiwiZ2V0TWFuYWdlciIsImdldEFQSSIsInYiLCJDb21tb25PYmplY3RzIiwiZGVmYXVsdHMiLCJvcHRpb25zIiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiY2FsbCIsInRhcmdldCIsInNvdXJjZXMiLCJmb3JFYWNoIiwiZGVzY3JpcHRvcnMiLCJrZXlzIiwic291cmNlIiwicmVkdWNlIiwia2V5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZGVzY3JpcHRvciIsInN5bSIsImVudW1lcmFibGUiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiYmlnIiwic21hbGwiLCJvYmoiLCJmaWx0ZXIiLCJjb250YWluc09iaiIsImljb25zIiwiYmF0Y2giLCJnZXREYXRhIiwicHVzaCIsImEiLCJiIiwicCIsImVxdWFsIiwidG9TdHJpbmciLCJkZWZhdWx0VmFsdWUiLCJvYmoxIiwib2JqMiIsImpRdWVyeSIsImV4dGVuZCIsInZhbCIsInJlZ2lzdHJ5IiwiYXJyYXkiLCJvbGRfaW5kZXgiLCJuZXdfaW5kZXgiLCJrIiwidW5kZWZpbmVkIiwic3BsaWNlIiwiQ29tbW9uU3RyaW5ncyIsInN0cmluZyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsIkNvbW1vbkZ1bmN0aW9ucyIsImZ1bmNzIiwicmVzdWx0IiwiZnVuYyIsIkNvbW1vbkRPTSIsImVsIiwic3RhcnRzV2l0aCIsImFsbEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImxpc3QiLCJqIiwiYXR0cyIsImF0dHJpYnV0ZXMiLCJuIiwibm9kZU5hbWUiLCJDb21tb25BcHAiLCJzdGFydGVyIiwibm90Q29tbW9uIiwiYXNzaWduIiwiZXh0ZW5kV2l0aCIsIlNVQl9QQVRIX1NUQVJUIiwiU1VCX1BBVEhfRU5EIiwiUEFUSF9TUExJVCIsIlBBVEhfU1RBUlRfT0JKRUNUIiwiUEFUSF9TVEFSVF9IRUxQRVJTIiwiRlVOQ1RJT05fTUFSS0VSIiwiTUFYX0RFRVAiLCJub3RQYXRoIiwicGF0aCIsInN1YlBhdGgiLCJmaW5kIiwic3ViIiwicGFyc2VkIiwic3ViZiIsInJlcGxhY2UiLCJpdGVtIiwiaGVscGVycyIsInN1YlBhdGhQYXJzZWQiLCJmaW5kTmV4dFN1YlBhdGgiLCJnZXRWYWx1ZUJ5UGF0aCIsInJlcGxhY2VTdWJQYXRoIiwicGFyc2VTdWJzIiwiYXR0clZhbHVlIiwic2V0VmFsdWVCeVBhdGgiLCJpc1JlY29yZCIsIm5vcm1pbGl6ZVBhdGgiLCJ0cmlnZ2VyIiwic2V0Iiwic3RlcCIsImhlbHBlciIsInJTdGVwIiwiQXJyYXkiLCJpc0FycmF5IiwicGFyc2VQYXRoU3RlcCIsIm9iamVjdCIsImF0dHJQYXRoIiwiYXR0ck5hbWUiLCJpc0Z1bmN0aW9uIiwibmV3T2JqIiwiYXJncyIsImpvaW4iLCJNRVRBX01FVEhPRF9JTklUIiwiTUVUQV9FVkVOVFMiLCJNRVRBX0RBVEEiLCJNRVRBX1dPUktJTkciLCJNRVRBX09QVElPTlMiLCJub3RCYXNlIiwiaW5wdXQiLCJldmVudHMiLCJvbiIsInNldERhdGEiLCJzZXRXb3JraW5nIiwid29ya2luZyIsInNldE9wdGlvbnMiLCJ3aGF0IiwicmVzIiwic2V0Q29tbW9uIiwiZ2V0Q29tbW9uIiwiZ2V0T3B0aW9ucyIsImdldFdvcmtpbmciLCJldmVudE5hbWVzIiwiZXZlbnRDYWxsYmFja3MiLCJvbmNlIiwiZGVmaW5lSWZOb3RFeGlzdHMiLCJmcm9tIiwiZXZlbnROYW1lIiwiZXZlbnQiLCJvZmYiLCJjYWxsYmFja3MiLCJjYWxsYmFjayIsInRhcmdldElkIiwiT1BUX01PREVfSElTVE9SWSIsIk9QVF9NT0RFX0hBU0giLCJPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCIsIm5vdFJvdXRlciIsInJvb3QiLCJjbGVhclNsYXNoZXMiLCJyZSIsImhhbmRsZXIiLCJydWxlIiwiYWRkIiwicGFyYW0iLCJyIiwiZnJhZ21lbnQiLCJsb2NhdGlvbiIsImRlY29kZVVSSSIsInBhdGhuYW1lIiwic2VhcmNoIiwid2luZG93IiwibWF0Y2giLCJocmVmIiwiY3VycmVudCIsImdldEZyYWdtZW50IiwiaW5pdCIsImlzSW5pdGlhbGl6ZWQiLCJjaGVjayIsInNldEluaXRpYWxpemVkIiwibG9vcEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjaGVja0xvY2F0aW9uIiwiYmluZCIsImhyZWZDbGljayIsImZ1bGxSRSIsImFwcGx5IiwiaG9zdCIsInB1c2hTdGF0ZSIsImdldEZ1bGxSb3V0ZSIsImJvZHkiLCJnZXRBbGxMaW5rcyIsImluaXRSZXJvdXRpbmciLCJnZXRBdHRyaWJ1dGUiLCJsaW5rIiwibm90Um91dGVySW5pdGlhbGl6ZWQiLCJmdWxsTGluayIsInByZXZlbnREZWZhdWx0IiwibmF2aWdhdGUiLCJub3RBUElPcHRpb25zIiwibm90QVBJUXVlZSIsInJlcXVlc3RzUGVyU2Vjb25kIiwicXVlZSIsImludCIsImluUHJvZ3Jlc3MiLCJ0b0NhbGwiLCJjbGVhckludGVydmFsIiwicnVuIiwibm90QVBJIiwiaWQiLCJnb29kIiwiYmFkIiwibWFrZVJlcXVlc3QiLCJyZXNwb25zZU9LIiwicmVzcG9uc2VGYWlsZWQiLCJyZXF1ZXN0SlNPTiIsInRoZW4iLCJuZXh0IiwiY2F0Y2giLCJjb2RlIiwiZ2V0SWQiLCJtb2RlbE5hbWUiLCJnZXRNb2RlbE5hbWUiLCJtYWtlVXJsIiwiZ2V0SlNPTiIsImdldE1vZGVsIiwic2V0UHJpY2UiLCJtb2RlbCIsIm5vdEltYWdlIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYIiwiVEVNUExBVEVfVEFHIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SIiwiUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgiLCJDT01QT05FTlRfSURfUFJFRklYIiwiUEFSVF9JRF9QUkVGSVgiLCJERUZBVUxUX1BMQUNFUiIsIkRFRkFVTFRfUExBQ0VSX0xPT1AiLCJPUFRTIiwiTUVUQV9DQUNIRSIsIm5vdFRlbXBsYXRlQ2FjaGUiLCJoaWRlVGVtcGxhdGVzIiwicmVnaXN0ZXIiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiaGVhZCIsImFwcGVuZENoaWxkIiwibWFwIiwibG9hZE9uZSIsIm9SZXF1ZXN0IiwiZGl2IiwiZGF0YXNldCIsIm5vdFRlbXBsYXRlTmFtZSIsIm5vdFRlbXBsYXRlVVJMIiwic3JjRWxlbWVudCIsInNldE9uZSIsImVsZW1lbnQiLCJjbG9uZU5vZGUiLCJjb250IiwidGV4dCIsIm5vdFRlbXBsYXRlc0VsZW1lbnRzIiwiZWxJZCIsInBhcmVudE5vZGUiLCJsaWIiLCJnZXRIVE1MIiwidGVtcGxhdGVJbm5lckhUTUwiLCJ0ZW1wbGF0ZUNvbnRFbCIsIndyYXAiLCJ0ZW1wbGF0ZXNIVE1MIiwidGVtcGxhdGVzIiwicGFyc2VMaWIiLCJhZGRMaWIiLCJzZWxlY3Rvck9yRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0YWdOYW1lIiwiT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSIsIkRFRkFVTFRfRklMVEVSIiwiREVGQVVMVF9QQUdFX05VTUJFUiIsIkRFRkFVTFRfUEFHRV9TSVpFIiwibm90SW50ZXJmYWNlIiwibWFuaWZlc3QiLCJsaW5lIiwicmVjb3JkIiwiYWN0aW9uTmFtZSIsInJlY29yZFJFIiwiZmllbGROYW1lIiwiaW5kIiwibGVuIiwiaW5kMiIsInN0YXJ0U2xpY2UiLCJlbmRTbGljZSIsImdldEF0dHIiLCJhY3Rpb25EYXRhIiwicGFyc2VMaW5lIiwicG9zdEZpeCIsInJlc3VsdElkIiwicHJlZml4ZXMiLCJpbmRleCIsImNvbmNhdCIsInByZSIsImdldEFjdGlvbnMiLCJhY3Rpb25zIiwic2V0RmlsdGVyIiwiZmlsdGVyRGF0YSIsInNvcnRlckRhdGEiLCJwYWdlTnVtYmVyIiwicGFnZVNpemUiLCJzZXRQYWdlciIsInJlcXVlc3REYXRhIiwiZGF0YVByb3ZpZGVyTmFtZSIsImNhcGl0YWxpemVGaXJzdExldHRlciIsImdldEFjdGlvbkRhdGEiLCJyZXF1ZXN0UGFyYW1zIiwiY29sbGVjdFJlcXVlc3REYXRhIiwicmVxdWVzdFBhcmFtc0VuY29kZWQiLCJlbmNvZGVSZXF1ZXN0IiwiZ2V0SUQiLCJnZXRVUkwiLCJxdWVlUmVxdWVzdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJhZnRlclN1Y2Nlc3NSZXF1ZXN0IiwicmVwb3J0Iiwibm90UmVjb3JkIiwiTUVUQV9JTlRFUkZBQ0UiLCJNRVRBX1BST1hZIiwiTUVUQV9DSEFOR0UiLCJNRVRBX0NIQU5HRV9ORVNURUQiLCJNRVRBX1NBTCIsIk1FVEFfTUFQX1RPX0lOVEVSRkFDRSIsIkRFRkFVTFRfQUNUSU9OX1BSRUZJWCIsIk1FVEFfUkVUVVJOX1RPX1JPT1QiLCJjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzIiwib3duZXIiLCJjb250ZXh0IiwicmVzVGFyZ2V0IiwiUmVmbGVjdCIsIkVycm9yIiwidmFsdWVUb1JlZmxlY3QiLCJub3RQcm9wZXJ0eSIsImdldFJvb3QiLCJwYXRoVG8iLCJpc1Byb3h5IiwiaXNQcm9wZXJ0eSIsIlByb3h5IiwicHJveHkiLCJjcmVhdGVSZWNvcmRIYW5kbGVycyIsImNyZWF0ZUNvbGxlY3Rpb24iLCJub3RSZWNvcmRJbnRlcmZhY2UiLCJpbml0UHJvcGVydGllcyIsImludGVyZmFjZVVwIiwiY3VyUGF0aCIsImJhYmVsSGVscGVycy50eXBlb2YiLCJpdGVtcyIsImNvbGxlY3Rpb24iLCJnZXRBY3Rpb25zQ291bnQiLCJhY3Rpb25VcCIsInJlcXVlc3QiLCJvYmplY3RQYXJ0Iiwic2V0QXR0ciIsInNldEZpbmRCeSIsInJlc2V0RmlsdGVyIiwiZ2V0RmlsdGVyIiwic2V0U29ydGVyIiwiZ2V0U29ydGVyIiwic2V0UGFnZU51bWJlciIsInNldFBhZ2VTaXplIiwicmVzZXRQYWdlciIsImdldFBhZ2VyIiwiT1BUX0NPTlRST0xMRVJfUFJFRklYIiwiT1BUX1JFQ09SRF9QUkVGSVgiLCJub3RBcHAiLCJyZXNvdXJjZXMiLCJwcmVJbml0Um91dGVyIiwiaW5pdE1hbmFnZXIiLCJpbml0QVBJIiwiaW5pdFRlbXBsYXRlcyIsInNldE1hbmFnZXIiLCJhcGkiLCJzZXRBUEkiLCJwcm9tIiwiYWRkTGliRnJvbVVSTCIsImluaXRNYW5pZmVzdCIsInNldEludGVyZmFjZU1hbmlmZXN0Iiwic2V0Um9vdCIsInJlUm91dGVFeGlzdGVkIiwicm91dGllSW5wdXQiLCJyb3V0ZUJsb2NrIiwicGF0aHMiLCJjb250cm9sbGVyIiwiYmluZENvbnRyb2xsZXIiLCJhZGRMaXN0IiwibGlzdGVuIiwidXBkYXRlIiwidXBkYXRlSW50ZXJmYWNlcyIsImluaXRDb250cm9sbGVyIiwiYWxsUmVzb3VyY2VzUmVhZHkiLCJzdGFydEFwcCIsImluaXRSb3V0ZXIiLCJjb250cm9sbGVyTmFtZSIsImFwcCIsImN0cmwiLCJjbGVhckludGVyZmFjZXMiLCJtYW5pZmVzdHMiLCJyZWNvcmRNYW5pZmVzdCIsInJlY29yZERhdGEiLCJvblJlc291cmNlUmVhZHkiLCJNRVRBX1BST0NFU1NPUlMiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnMiLCJzZXRQcm9jZXNzb3IiLCJnZXRQcm9jZXNzb3IiLCJNRVRBX0NPTVBPTkVOVFMiLCJub3RSZW5kZXJlciIsInJlbmRlciIsImNvbXBvbmVudCIsImluaXREYXRhIiwiaW5pdE9wdGlvbnMiLCJpbml0V29ya2luZyIsInRlbXBsYXRlIiwiaW5pdFRlbXBsYXRlIiwib25DaGFuZ2UiLCJNYXRoIiwicmFuZG9tIiwiZ2V0QnJlYWRDcnVtcHMiLCJjbGVhclN0YXNoIiwic2V0V29ya2luZ01hcHBpbmciLCJleGVjUHJvY2Vzc29ycyIsInNlYXJjaEZvclN1YlRlbXBsYXRlcyIsInN0YXNoUmVuZGVyZWQiLCJpZlBhcnQiLCJjb21wb25lbnRQYXRoIiwiY2hhbmdlZFBhdGgiLCJpZkZ1bGxTdWJQYXRoIiwiY3JlYXRlTWFwcGluZyIsImZpbmRBbGxQcm9jZXNzb3JzIiwicHJvY3MiLCJlbHMiLCJnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCIsImdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQiLCJwcm9jRGF0YSIsInBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbiIsInByb2Nlc3NvckV4cHJlc3Npb24iLCJhdHRyaWJ1dGVFeHByZXNzaW9uIiwiaWZDb25kaXRpb24iLCJwYXJhbXMiLCJwcm9jZXNzb3JOYW1lIiwibWFwcGluZyIsInByb2NTY29wZSIsImF0dHJpYnV0ZVJlc3VsdCIsImdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQiLCJwcm9jTmFtZSIsInByb2MiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkZXN0cm95U3VicyIsImRlc3Ryb3kiLCJjbGVhclN1YlRlbXBsYXRlcyIsImdldFN0YXNoIiwicmVtb3ZlQ2hpbGQiLCJudEVsIiwibnRSZW5kZXJlZCIsInN1YnMiLCJudCIsImlmU3ViRWxlbWVudFJlbmRlcmVkIiwicmVuZGVyU3ViIiwiZGV0YWlscyIsImRhdGFQYXRoIiwibm90Q29tcG9uZW50IiwiY2hpbGROb2RlcyIsImFkZFRvU3Rhc2giLCJzdGFzaCIsIm5ld1N0YXNoIiwiYW5jaG9yIiwibmV4dFNpYmxpbmciLCJpbnNlcnRCZWZvcmUiLCJub2RlIiwicGxhY2UiLCJ0YXJnZXRFbCIsImwiLCJjaGlsZHJlbiIsInRleHRDb250ZW50IiwicmVuZGVyZWQiLCJwbGFjZUFmdGVyIiwicGxhY2VCZWZvcmUiLCJwbGFjZUZpcnN0IiwicGxhY2VMYXN0Iiwibm90UGxhY2VycyIsIk1FVEFfUEFSVFMiLCJyZXNldFBhcnRzIiwicHJlcGFyZVRlbXBsYXRlRWxlbWVudCIsImluaXRNYXJrRWxlbWVudCIsIm1hcmtFbCIsInBsYWNlciIsImdldFBsYWNlciIsInRhcmdldFF1ZXJ5IiwibWFpbiIsInVuc2V0UmVhZHkiLCJodG1sIiwic2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJhZGRGcm9tVVJMIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJjbGVhclBhcnRzIiwiZGVhZCIsIm9mZkFsbCIsImZvckVhY2hEYXRhIiwicmVuZGVyUGFydCIsInBsYWNlUmVuZGVyZWQiLCJyZW1vdmVPYnNvbGV0ZVBhcnRzIiwiYmVmb3JlIiwicGxhY2VQYXJ0IiwiYWZ0ZXIiLCJwYXJ0IiwiZ2V0UGFydEJ5RGF0YSIsIm5vZGVzIiwibGFzdE5vZGUiLCJub2RlVHlwZSIsImdldFBhcnRzIiwicmVuZGVyZXIiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lIiwiYWRkUGFydCIsInVwZGF0ZVBhcnQiLCJwaXBlIiwiZmluZEFjdHVhbFBhcnRzIiwicmVtb3ZlTm90QWN0dWFsUGFydHMiLCJhY3R1YWxQYXJ0cyIsImlzRGF0YSIsIk9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUiIsIk9QVF9ERUZBVUxUX1ZJRVdTX1BPU1RGSVgiLCJPUFRfREVGQVVMVF9WSUVXX05BTUUiLCJPUFRfREVGQVVMVF9SRU5ERVJfRlJPTV9VUkwiLCJPUFRfREVGQVVMVF9QTFVSQUxfTkFNRSIsIk9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FIiwiT1BUX0RFRkFVTFRfTU9EVUxFX05BTUUiLCJPUFRfREVGQVVMVF9SRU5ERVJfQU5EIiwibm90Q29udHJvbGxlciIsImluaXRSZW5kZXIiLCJpbnRlcmZhY2VzIiwiZ2V0SW50ZXJmYWNlcyIsIm1ha2UiLCJ2aWV3TmFtZSIsInZpZXciLCJnZXRWaWV3IiwidGVtcGxhdGVVUkwiLCJwcmVmaXgiLCJjb21tb24iLCJnZXRNb2R1bGVQcmVmaXgiLCJwb3N0Zml4IiwidGVtcGxhdGVOYW1lIiwicmVuZGVyQW5kIiwidmlld3MiLCJnZXRNb2R1bGVOYW1lIiwiJGxpc3RBbGwiLCJlcnIiLCJmaWVsZEZpbGVzIiwic2F2ZWRGaWxlIiwiaGFzaCIsIm5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiIsInNjb3BlIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwibGl2ZUV2ZW50cyIsIm9uRXZlbnQiLCJjaGVja2VkIiwiZmllbGQiLCJzZWxlY3RlZCIsInNlbGVjdGVkT3B0aW9ucyIsInByb2Nlc3NlZFZhbHVlIiwiaXNOYU4iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ1c2VkIiwib3B0aW9uIiwidmFsdWVGaWVsZE5hbWUiLCJsYWJlbEZpZWxkTmFtZSIsIml0ZW1WYWx1ZUZpZWxkTmFtZSIsImRlZmF1bHQiLCJwbGFjZWhvbGRlciIsIk9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYIiwiT1BUX0RFRkFVTFRfUk9MRV9OQU1FIiwiT1BUX0RFRkFVTFRfRk9STV9USVRMRSIsIk9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04iLCJPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCIsIm5vdEZvcm0iLCJvblN1Ym1pdCIsIm9uUmVzZXQiLCJvbkNhbmNlbCIsImdldE1hbmlmZXN0Iiwicm9sZSIsInJlbmRlcldyYXBwZXIiLCJmb3JtUGFydCIsImdldFdyYXBwZXJEYXRhIiwiZ2V0UGFydFRlbXBsYXRlTmFtZSIsImJpbmRGb3JtRXZlbnRzIiwicmVuZGVyQ29tcG9uZW50cyIsIndyYXBwZXIiLCJ0aXRsZSIsImdldEZvcm1GaWVsZHNMaXN0IiwiYWRkRmllbGRDb21wb25lbnQiLCJjb21wcyIsImdldEFwcCIsImRlZiIsImZpZWxkc0xpYnMiLCJnZXRGaWVsZHNMaWJzIiwiZmllbGRUeXBlIiwiZ2V0RmllbGRzRGVmaW5pdGlvbiIsInJlYyIsImxhYmVsIiwiZ2V0Rm9ybVRhcmdldEVsZW1lbnQiLCJjb2xsZWN0RGF0YUZyb21Db21wb25lbnRzIiwiZm9ybSIsIk9QVF9ERUZBVUxUX1BBR0VfU0laRSIsIk9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSIiwiT1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04iLCJPUFRfREVGQVVMVF9TT1JUX0ZJRUxEIiwiT1BUX0ZJRUxEX05BTUVfUFJFX1BST0MiLCJub3RUYWJsZSIsInJvd3MiLCJyZXNldFNvcnRlciIsInJlbmRlckluc2lkZSIsInJlbmRlckhlYWRlciIsInVwZGF0ZURhdGEiLCJyZW5kZXJCb2R5IiwiYmluZFNlYXJjaCIsImJpbmRDdXN0b21CaW5kaW5ncyIsInRhYmxlSGVhZGVyIiwibmV3VGgiLCJzb3J0YWJsZSIsImF0dGFjaFNvcnRpbmdIYW5kbGVycyIsImhlYWRDZWxsIiwiY2hhbmdlU29ydGluZ09wdGlvbnMiLCJzdHlsZSIsImN1cnNvciIsInNvcnRCeUZpZWxkIiwic29ydERpcmVjdGlvbiIsImludmFsaWRhdGVEYXRhIiwiZmlsdGVyU2VhcmNoIiwiaWZVcGRhdGluZyIsInF1ZXJ5Iiwic2V0VXBkYXRpbmciLCIkbGlzdCIsInByb2NjZXNzRGF0YSIsInJlZnJlc2hCb2R5Iiwic2V0VXBkYXRlZCIsInRoYXRGaWx0ZXIiLCJ0ZXN0RGF0YUl0ZW0iLCJ0aGF0U29ydGVyIiwic29ydCIsIml0ZW0xIiwiaXRlbTIiLCJ0MSIsInQyIiwibG9jYWxlQ29tcGFyZSIsInNlYXJjaEVsIiwiY3VycmVudFRhcmdldCIsInNlbGVjdG9yIiwiZ2V0T3B0aW9uIiwibmV3Um93IiwibmV3VGQiLCJwcmVwcm9jZXNzZWQiLCJpdGVtSWQiLCJ0Ym9keSIsImZpbmRCb2R5IiwiY2xlYXJCb2R5IiwiY2hlY2tGaWx0ZXJlZCIsInRoaXNQYWdlU3RhcnRzIiwibmV4dFBhZ2VFbmRzIiwibWluIiwicmVuZGVyUm93IiwidGFibGVCb2R5Iiwic3RyVmFsdWUiLCJnZXRGaWx0ZXJTZWFyY2giLCJ0b0NvbXAiLCJPUFRfREVGQVVMVF9ERVRBSUxTX1BSRUZJWCIsIk9QVF9ERUZBVUxUX0RFVEFJTFNfVElUTEUiLCJub3REZXRhaWxzIiwiZ2V0RmllbGRzTGlzdCIsImdldFRhcmdldEVsZW1lbnQiXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWM7U0FDZixLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFjO1NBQ25CLEtBQUtD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
