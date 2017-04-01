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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdEZvcm0uanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdERldGFpbHMuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSkge1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvciAodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IgKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwdXRGaWxlKHVwbG9hZCAvKiBvYmplY3QoZmlsZSwgb25Qcm9ncmVzcywgdXJsKSovICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRpZiAoeGhyLnVwbG9hZCkge1xuXHRcdFx0XHQvLyBwcm9ncmVzcyBiYXJcblx0XHRcdFx0aWYgKHVwbG9hZC5vblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZC5vblByb2dyZXNzLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCAvKmUqLyApIHtcblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh4aHIuc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0Ly8gc3RhcnQgdXBsb2FkXG5cdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0XHR4aHIub3BlbignUFVUJywgdXBsb2FkLnVybCwgdHJ1ZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignWF9GSUxFTkFNRScsIGVuY29kZVVSSUNvbXBvbmVudCh1cGxvYWQuZmlsZS5uYW1lKSk7XG5cdFx0XHRcdHhoci5zZW5kKHVwbG9hZC5maWxlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignUFVUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChwYXJzZUludChzdGF0dXMpID09PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoZSkgPT4gcmVqZWN0KGUpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0U2Vzc2lvbklEOiBmdW5jdGlvbihuYW1lID0gJ1Nlc3Npb25JRCcpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb29raWUobmFtZSk7XG5cdH0sXG5cdGdldENvb2tpZTogKG5hbWUpID0+IHtcblx0XHRsZXQgdmFsdWUgPSAnOyAnICsgZG9jdW1lbnQuY29va2llLFxuXHRcdFx0cGFydHMgPSB2YWx1ZS5zcGxpdCgnOyAnICsgbmFtZSArICc9Jyk7XG5cdFx0aWYgKHBhcnRzLmxlbmd0aCA9PSAyKSB7XG5cdFx0XHRyZXR1cm4gcGFydHMucG9wKCkuc3BsaXQoJzsnKS5zaGlmdCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbk5ldHdvcms7XG4iLCJ2YXIgQ29tbW9uTG9ncyA9IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fSxcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG5cdHRyYWNlOiBmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cblx0bW92ZUl0ZW0oYXJyYXksIG9sZF9pbmRleCwgbmV3X2luZGV4KSB7XG5cdFx0aWYgKG5ld19pbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcblx0XHRcdHZhciBrID0gbmV3X2luZGV4IC0gYXJyYXkubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKChrLS0pICsgMSkge1xuXHRcdFx0XHRhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFycmF5LnNwbGljZShuZXdfaW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRfaW5kZXgsIDEpWzBdKTtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aChzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHVuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHRoaXMuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIG51bGwpO1xuXHR9XG5cblx0cGFyc2VQYXRoU3RlcChzdGVwLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGxldCByU3RlcCA9IG51bGw7XG5cdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUykgPT09IDAgJiYgaGVscGVyKXtcblx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfSEVMUEVSUywgJycpO1xuXHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRpZihoZWxwZXIuaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF07XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID09PSAwICYmIGl0ZW0pe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwgJycpO1xuXHRcdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fVxuXG5cdC8vOjpmaWVsZE5hbWUucmVzdWx0XG5cdC8ve31cblx0Ly97ZmllbGROYW1lOiAndGFyZ2V0UmVjb3JkRmllbGQnfVxuXHQvLy8vWyd0YXJnZXRSZWNvcmRGaWVsZCcsICdyZXN1bHQnXVxuXHRwYXJzZVBhdGgocGF0aCwgaXRlbSwgaGVscGVyKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cGF0aCA9IHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdHBhdGhbaV0gPSB0aGlzLnBhcnNlUGF0aFN0ZXAocGF0aFtpXSwgaXRlbSwgaGVscGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRub3JtaWxpemVQYXRoKHBhdGgpe1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH1lbHNle1xuXHRcdFx0d2hpbGUocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA+IC0xKXtcblx0XHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwnJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdHNtYWxsID0gW1widG9kb1wiXSxcblx0XHRiaWcgPSBbXCJ0b2RvXCIsIFwibGVuZ3RoXCJdXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0Ki9cblxuXHRpZkZ1bGxTdWJQYXRoKGJpZywgc21hbGwpe1xuXHRcdGlmIChiaWcubGVuZ3RoPHNtYWxsLmxlbmd0aCl7cmV0dXJuIGZhbHNlO31cblx0XHRmb3IobGV0IHQgPTA7IHQgPCBzbWFsbC5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZihzbWFsbFt0XSAhPT0gYmlnW3RdKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpLFxuXHRcdFx0aXNGdW5jdGlvbiA9IGF0dHJOYW1lLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKT4tMTtcblx0XHRpZiAoaXNGdW5jdGlvbil7XG5cdFx0XHRhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0fVxuXHRcdGlmICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIHR5cGVvZiBvYmplY3RbYXR0ck5hbWVdICE9PSAndW5kZWZpbmVkJyAmJiBvYmplY3RbYXR0ck5hbWVdICE9PSBudWxsKXtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uP29iamVjdFthdHRyTmFtZV0oe2l0ZW0sIGhlbHBlcnN9KTpvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChuZXdPYmosIGF0dHJQYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gbmV3T2JqO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7b2JqZWN0W2F0dHJOYW1lXSA9IHt9O31cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGpvaW4oKXtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX01FVEhPRF9JTklUID0gU3ltYm9sKCdpbml0JyksXG5cdE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0dGhpc1tNRVRBX0VWRU5UU10gPSB7fTtcblx0XHR0aGlzW01FVEFfREFUQV0gPSB7fTtcblx0XHR0aGlzW01FVEFfV09SS0lOR10gPSB7fTtcblx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSB7fTtcblx0XHR0aGlzW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdFtNRVRBX01FVEhPRF9JTklUXShpbnB1dCl7XG5cdFx0aWYgKCFpbnB1dCl7XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH1cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykpe1xuXHRcdFx0Zm9yKGxldCB0IG9mIGlucHV0LmV2ZW50cyl7XG5cdFx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSl7XG5cdFx0XHR0aGlzLnNldERhdGEoaW5wdXQuZGF0YSk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ3dvcmtpbmcnKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoaW5wdXQud29ya2luZyk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoaW5wdXQub3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiAqL1xuXHRcdFx0XHR3aGF0ID0gYXJnc1swXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiBlbGVtZW50ICovXG5cdFx0XHRcdG5vdFBhdGguc2V0KGFyZ3NbMF0gLyogcGF0aCAqLyAsIHdoYXQgLyogY29sbGVjdGlvbiAqLyAsIHVuZGVmaW5lZCAvKiBoZWxwZXJzICovICwgYXJnc1sxXSAvKiB2YWx1ZSAqLyApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Z2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggKi9cblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdH1cblx0XHRcdFx0LyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoIHdpdGggZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdGNhc2UgMjpcblx0XHRcdHtcblx0XHRcdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0XHRpZiAocmVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHQvKiBubyBkYXRhLCByZXR1cm4gZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdFx0XHRcdHJldHVybiBhcmdzWzFdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8qIGRhdGEsIHJldHVybiBpdCAqL1xuXHRcdFx0XHRcdHJldHVybiByZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8qIHJldHVybiBmdWxsIGNvbGxlY3Rpb24gKi9cblx0XHRkZWZhdWx0OlxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gd2hhdDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdENPUkUgT0JKRUNUXG5cdFx0XHREQVRBIC0gaW5mb3JtYXRpb25cblx0XHRcdE9QVElPTlMgLSBob3cgdG8gd29ya1xuXHRcdFx0V09SS0lORyAtIHRlbXBvcmFyaWx5IGdlbmVyYXRlZCBpbiBwcm9jY2Vzc1xuXHQqL1xuXG5cdHNldERhdGEoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9EQVRBXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXREYXRhKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXREYXRhKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfREFUQV0sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRPcHRpb25zKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0T3B0aW9ucygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9PUFRJT05TXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFdvcmtpbmcoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRXb3JraW5nKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0V29ya2luZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1dPUktJTkddLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Lypcblx0XHRFVkVOVFMgaGFuZGxpbmdcblx0Ki9cblxuXHRvbihldmVudE5hbWVzLCBldmVudENhbGxiYWNrcywgb25jZSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRub3RDb21tb24uZGVmaW5lSWZOb3RFeGlzdHModGhpc1tNRVRBX0VWRU5UU10sIG5hbWUsIFtdKTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnB1c2goe1xuXHRcdFx0XHRjYWxsYmFja3M6IGV2ZW50Q2FsbGJhY2tzLFxuXHRcdFx0XHRvbmNlOiBvbmNlLFxuXHRcdFx0XHRjb3VudDogMFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR0cmlnZ2VyKCkge1xuXHRcdGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLFxuXHRcdFx0ZXZlbnROYW1lID0gYXJncy5zaGlmdCgpO1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWUpKSB7XG5cdFx0XHRldmVudE5hbWUgPSBbZXZlbnROYW1lXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0VWRU5UU10uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaChldmVudCA9PiB7XG5cdFx0XHRcdFx0aWYgKGV2ZW50Lm9uY2UpIHtcblx0XHRcdFx0XHRcdHRoaXMub2ZmKG5hbWUsIGV2ZW50LmNhbGxiYWNrcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LmNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmYoZXZlbnROYW1lcyAvKiBhcnJheSBvZiBldmVudCBuYW1lcyAqLyAsIGV2ZW50Q2FsbGJhY2tzIC8qIGFycmF5IG9mIGNhbGxiYWNrcyAqLyApIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRsZXQgdGFyZ2V0SWQgPSAtMTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmZvckVhY2goKGV2ZW50LCBpKSA9PiB7XG5cdFx0XHRcdGlmIChpID09PSAtMSAmJiBldmVudENhbGxiYWNrcyA9PT0gZXZlbnQuY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0dGFyZ2V0SWQgPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmICh0YXJnZXRJZCA+IC0xKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnNwbGljZSh0YXJnZXRJZCwgMSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmZBbGwoKXtcblx0XHRsZXQgZXZlbnRzID0gT2JqZWN0LmtleXModGhpc1tNRVRBX0VWRU5UU10pO1xuXHRcdGZvcihsZXQgdCA9MDsgdDwgZXZlbnRzLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHRoaXNbTUVUQV9FVkVOVFNdLmhhc093blByb3BlcnR5KGV2ZW50c1t0XSkpe1xuXHRcdFx0XHRkZWxldGUgdGhpc1tNRVRBX0VWRU5UU11bZXZlbnRzW3RdXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5jb25zdCBPUFRfTU9ERV9ISVNUT1JZID0gU3ltYm9sKCdoaXN0b3J5JyksXG5cdE9QVF9NT0RFX0hBU0ggPSBTeW1ib2woJ2hhc2gnKSxcblx0T1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwgPSA1MDtcblxuY2xhc3Mgbm90Um91dGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJvdXRlczogW10sXG5cdFx0XHRtb2RlOiBPUFRfTU9ERV9ISVNUT1JZLFxuXHRcdFx0cm9vdDogJy8nLCAvL2Fsd2F5cyBpbiBzbGFzaGVzIC91c2VyLywgLywgL2lucHV0Ly4gYW5kIG5vIC91c2VyIG9yIGlucHV0L2xldmVsXG5cdFx0XHRpbml0aWFsaXplZDogZmFsc2Vcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpc3RvcnkoKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9ISVNUT1JZKTtcblx0fVxuXG5cdGhhc2goKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9IQVNIKTtcblx0fVxuXG5cdHNldFJvb3Qocm9vdCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb290Jywgcm9vdCA/ICcvJyArIHRoaXMuY2xlYXJTbGFzaGVzKHJvb3QpICsgJy8nIDogJy8nKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNsZWFyU2xhc2hlcyhwYXRoKSB7XG5cdFx0Ly9maXJzdCBhbmQgbGFzdCBzbGFzaGVzIHJlbW92YWxcblx0XHRyZXR1cm4gcGF0aC50b1N0cmluZygpLnJlcGxhY2UoL1xcLyQvLCAnJykucmVwbGFjZSgvXlxcLy8sICcnKTtcblx0fVxuXG5cdGFkZChyZSwgaGFuZGxlcikge1xuXHRcdGlmICh0eXBlb2YgcmUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aGFuZGxlciA9IHJlO1xuXHRcdFx0cmUgPSAnJztcblx0XHR9XG5cdFx0bGV0IHJ1bGUgPSB7XG5cdFx0XHRyZTogcmUsXG5cdFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0fTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLnB1c2gocnVsZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRMaXN0KGxpc3QpIHtcblx0XHRmb3IgKGxldCB0IGluIGxpc3QpIHtcblx0XHRcdHRoaXMuYWRkKHQsIGxpc3RbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbW92ZShwYXJhbSkge1xuXHRcdGZvciAodmFyIGkgPSAwLCByOyBpIDwgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5sZW5ndGgsIHIgPSB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldOyBpKyspIHtcblx0XHRcdGlmIChyLmhhbmRsZXIgPT09IHBhcmFtIHx8IHIucmUgPT09IHBhcmFtKSB7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRmbHVzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLydcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGlzSW5pdGlhbGl6ZWQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbml0aWFsaXplZCcpO1xuXHR9XG5cblx0c2V0SW5pdGlhbGl6ZWQodmFsID0gdHJ1ZSl7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnaW5pdGlhbGl6ZWQnLCB2YWwpO1xuXHR9XG5cblx0Z2V0RnJhZ21lbnQoKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gJyc7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnbW9kZScpID09PSBPUFRfTU9ERV9ISVNUT1JZKSB7XG5cdFx0XHRpZiAoIWxvY2F0aW9uKSByZXR1cm4gJyc7XG5cdFx0XHRmcmFnbWVudCA9IHRoaXMuY2xlYXJTbGFzaGVzKGRlY29kZVVSSShsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCkpO1xuXHRcdFx0ZnJhZ21lbnQgPSBmcmFnbWVudC5yZXBsYWNlKC9cXD8oLiopJC8sICcnKTtcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgIT0gJy8nID8gZnJhZ21lbnQucmVwbGFjZSh0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSwgJycpIDogZnJhZ21lbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICghd2luZG93KSByZXR1cm4gJyc7XG5cdFx0XHR2YXIgbWF0Y2ggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRmcmFnbWVudCA9IG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY2xlYXJTbGFzaGVzKGZyYWdtZW50KTtcblx0fVxuXG5cdGNoZWNrTG9jYXRpb24oKXtcblx0XHRsZXQgY3VycmVudCA9dGhpcy5nZXRXb3JraW5nKCdjdXJyZW50JyksXG5cdFx0XHRmcmFnbWVudCA9dGhpcy5nZXRGcmFnbWVudCgpLFxuXHRcdFx0aW5pdCA9IHRoaXMuaXNJbml0aWFsaXplZCgpO1xuXHRcdGlmIChjdXJyZW50ICE9PWZyYWdtZW50ICB8fCAhaW5pdCkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JyxmcmFnbWVudCk7XG5cdFx0XHR0aGlzLmNoZWNrKGZyYWdtZW50KTtcblx0XHRcdHRoaXMuc2V0SW5pdGlhbGl6ZWQoKTtcblx0XHR9XG5cdH1cblxuXHRocmVmQ2xpY2soKXtcblx0XHQvL2NvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRnZXRSb290KCl7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0bGlzdGVuKGxvb3BJbnRlcnZhbCA9IE9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JywgJ25vdEluaXRpYWxpemVkJyk7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmdldFdvcmtpbmcoJ2ludGVydmFsJykpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJ2YWwnLCBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrTG9jYXRpb24uYmluZCh0aGlzKSwgbG9vcEludGVydmFsKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5ocmVmQ2xpY2suYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjaGVjayhmKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gZiB8fCB0aGlzLmdldEZyYWdtZW50KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGF0aCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5yZTtcblx0XHRcdGxldCBmdWxsUkUgPSAgdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKHBhdGgpKTtcblx0XHRcdHZhciBtYXRjaCA9IGZyYWdtZW50Lm1hdGNoKGZ1bGxSRSk7XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0bWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5oYW5kbGVyLmFwcGx5KHRoaXMuaG9zdCB8fCB7fSwgbWF0Y2gpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRuYXZpZ2F0ZShwYXRoKSB7XG5cdFx0cGF0aCA9IHBhdGggPyBwYXRoIDogJyc7XG5cdFx0c3dpdGNoICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSl7XG5cdFx0XHRjYXNlIE9QVF9NT0RFX0hJU1RPUlk6IHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygncHVzaCBzdGF0ZScsIHRoaXMuZ2V0RnVsbFJvdXRlKHBhdGgpKTtcblx0XHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgT1BUX01PREVfSEFTSDoge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyguKikkLywgJycpICsgJyMnICsgcGF0aDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RnVsbFJvdXRlKHBhdGggPSAnJyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5jbGVhclNsYXNoZXMocGF0aCk7XG5cdH1cblxuXHRnZXRBbGxMaW5rcygpe1xuXHRcdHZhciBhbGxFbGVtZW50cyA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZignbi1ocmVmJykgPT09IDApIHtcblx0XHRcdFx0XHRsaXN0LnB1c2goYWxsRWxlbWVudHNbal0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0cmVSb3V0ZUV4aXN0ZWQoKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0QWxsTGlua3MoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgbGlzdC5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmluaXRSZXJvdXRpbmcobGlzdFt0XSwgbGlzdFt0XS5nZXRBdHRyaWJ1dGUoJ24taHJlZicpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVyb3V0aW5nKGVsLCBsaW5rKXtcblx0XHRpZiAoIWVsLm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdGxldCBmdWxsTGluayA9IHRoaXMuZ2V0RnVsbFJvdXRlKGxpbmspO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdocmVmJywgZnVsbExpbmspO1xuXHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9Pntcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLm5hdmlnYXRlKGxpbmspO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdGVsLm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90Um91dGVyKCk7XG4iLCJsZXQgbm90QVBJT3B0aW9ucyA9IHtcblx0cnBzOiA1MCxcblx0cHJvdG9jb2w6ICdodHRwJyxcblx0aG9zdDogJ2xvY2FsaG9zdCcsXG5cdHBvcnQ6IDkwMDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSU9wdGlvbnM7XG4iLCJjbGFzcyBub3RBUElRdWVle1xuXHRjb25zdHJ1Y3RvciAocmVxdWVzdHNQZXJTZWNvbmQpIHtcblx0XHR0aGlzLnF1ZWUgPSBbXTtcblx0XHR0aGlzLmludCA9IG51bGw7XG5cdFx0dGhpcy5yZXF1ZXN0c1BlclNlY29uZCA9IHJlcXVlc3RzUGVyU2Vjb25kIHx8IDU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW4oKXtcblx0XHR0aGlzLmludCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLmNoZWNrLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLnJlcXVlc3RzUGVyU2Vjb25kKTtcblx0fVxuXG5cdGNoZWNrKCl7XG5cdFx0aWYgKHRoaXMuaW5Qcm9ncmVzcyl7cmV0dXJuO31cblx0XHRlbHNle1xuXHRcdFx0aWYgKHRoaXMucXVlZS5sZW5ndGggPiAwKXtcblx0XHRcdFx0dGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHRvQ2FsbCA9IHRoaXMucXVlZS5zaGlmdCgpO1xuXHRcdFx0XHR0b0NhbGwoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRuZXh0KCl7XG5cdFx0dGhpcy5pblByb2dyZXNzID0gZmFsc2U7XG5cdH1cblxuXHRhZGQoY2FsbCl7XG5cdFx0dGhpcy5xdWVlLnB1c2goY2FsbCk7XG5cdH1cblxuXHRwYXVzZSgpe1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50KTtcblx0fVxuXG5cdHJlc3VtZSgpe1xuXHRcdHRoaXMucnVuKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJUXVlZTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UuanMnO1xuXG5pbXBvcnQgbm90QVBJT3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuaW1wb3J0IG5vdEFQSVF1ZWUgZnJvbSAnLi9xdWVlLmpzJztcblxuXG5jbGFzcyBub3RBUEkgZXh0ZW5kcyAgbm90QmFzZXtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdENvbW1vbi5leHRlbmQobm90QVBJT3B0aW9ucywgb3B0aW9ucykpO1xuXHRcdHRoaXMucXVlZSA9IG5ldyBub3RBUElRdWVlKHRoaXMuZ2V0T3B0aW9ucygncnBzJykpO1xuXHRcdHRoaXMucXVlZS5ydW4oKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG1ha2VVcmwocGFydHMpIHtcblx0XHRyZXR1cm4gcGFydHMuam9pbignLycpO1xuXHR9XG5cblx0cXVlZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgbWV0aG9kLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdG1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKSB7XG5cdFx0bm90Q29tbW9uLmxvZygnbWFraW5nIHJlcXVlc3QnLCBtZXRob2QsIHVybCwgaWQpO1xuXHRcdG5vdENvbW1vbi5yZXF1ZXN0SlNPTihtZXRob2QsIHVybCwgZGF0YSlcblx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdyZXF1ZXN0IHN1Y2Nlc3NmdWxsJywgbWV0aG9kLCB1cmwsIGlkLCByZXNwb25zZSk7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3Jlc3BvbnNlIGlzIGdvb2QnKTtcblx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGNvZGUsIHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5lcnJvcigncmVxdWVzdCBmYWlsZWQnLCBtZXRob2QsIHVybCwgaWQsIHJlc3BvbnNlKTtcblx0XHRcdFx0dGhpcy5xdWVlLm5leHQoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygncmVzcG9uc2UgaXMgYmFkJyk7XG5cdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2UpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlJyk7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdwb3N0JywgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygndXBkYXRlIGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHV0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncHV0JywgdXJsLCBudWxsLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5nZXRNb2RlbCgpLnNldFByaWNlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdwdXR0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZ2V0JywgdXJsLCBpZCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZ2V0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0bGlzdChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZ2V0JywgdXJsLCBudWxsLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdsaXN0IGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGVsZXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZGVsZXRlJywgdXJsLCBpZCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZ2V0TW9kZWwoKS5zZXRQcmljZShyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZGVsZXRlIGZhaWxlZCcpO1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0VXBsb2FkVVJMKG1vZGVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnYmFzZScpICsgdGhpcy5nZXRPcHRpb25zKCd1cGxvYWQnKSArIG1vZGVsP21vZGVsLmdldElkKCk6Jyc7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJO1xuIiwiaW1wb3J0IG5vdEJhc2UgIGZyb20gJy4uL25vdEJhc2UnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW1hZ2UgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cbiIsImNvbnN0IFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCA9ICduLScsXG5cdFRFTVBMQVRFX1RBRyA9ICdudCcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiA9ICctJyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVggPSAnaWYnLFxuXHRDT01QT05FTlRfSURfUFJFRklYID0gJ25vdF9jb21wb25lbnRfJyxcblx0UEFSVF9JRF9QUkVGSVggPSAnbm90X3BhcnRfJyxcblx0REVGQVVMVF9QTEFDRVIgPSAncGxhY2UnLFxuXHRERUZBVUxUX1BMQUNFUl9MT09QID0gJ3BsYWNlQWZ0ZXInO1xuXG5jb25zdCBPUFRTID0ge1xuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgsXG5cdFRFTVBMQVRFX1RBRyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCxcblx0REVGQVVMVF9QTEFDRVIsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVgsXG5cdFBBUlRfSURfUFJFRklYLFxuXHRERUZBVUxUX1BMQUNFUl9MT09QXG59O1xuXG5leHBvcnQgZGVmYXVsdCBPUFRTO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuY29uc3QgTUVUQV9DQUNIRSA9IFN5bWJvbCgnY2FjaGUnKTtcblxuY2xhc3Mgbm90VGVtcGxhdGVDYWNoZSBleHRlbmRzIG5vdEJhc2V7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ0FDSEVdID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdHRoaXMuaGlkZVRlbXBsYXRlcygpO1xuXHRcdHRoaXMucmVnaXN0ZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpZGVUZW1wbGF0ZXMoKXtcblx0XHRsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdFx0dC5pbm5lckhUTUwgPSBPUFRTLlRFTVBMQVRFX1RBRyArICd7ZGlzcGxheTogbm9uZTt9Jztcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHQpO1xuXHR9XG5cblx0cmVnaXN0ZXIoKSB7XG5cdFx0bm90Q29tbW9uLnJlZ2lzdGVyKCd0ZW1wbGF0ZUNhY2hlJywgdGhpcyk7XG5cdH1cblxuXHRsb2FkKG1hcCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHRmb3IgKHZhciBpIGluIG1hcCkge1xuXHRcdFx0dGhpcy5sb2FkT25lKGksIG1hcFtpXSk7XG5cdFx0fVxuXHR9XG5cblx0bG9hZE9uZShrZXksIHVybCwgY2FsbGJhY2spIHtcblx0XHR2YXIgb1JlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRvUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXHRcdG9SZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KGtleSkpe1xuXHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vdGhhdC5zZXRMb2FkaW5nKGtleSwgdXJsKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZUlubmVySFRNTCk9Pntcblx0XHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0XHRcdH0pLmNhdGNoKCgpPT57XG5cdFx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGUnLCBrZXksIHVybCk7XG5cdFx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlc0hUTUwpPT57XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoaXMucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdFx0dGhpcy5hZGRMaWIodGVtcGxhdGVzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHRcdH0pLmNhdGNoKChlKT0+e1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZXMgbGliJywgdXJsLGUpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSA9IFsnX2lkJywgJ2lkJywgJ0lEJ10sXG5cdERFRkFVTFRfRklMVEVSID0ge30sXG5cdERFRkFVTFRfUEFHRV9OVU1CRVIgPSAxLFxuXHRERUZBVUxUX1BBR0VfU0laRSA9IDEwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbnRlcmZhY2UgZXh0ZW5kcyBub3RCYXNlIHtcblxuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCkge1xuXHRcdHN1cGVyKHt9KTtcblx0XHR0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldElEKHJlY29yZCwgYWN0aW9uRGF0YSkge1xuXHRcdGxldCByZXN1bHRJZCxcblx0XHRcdGxpc3QgPSBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZLFxuXHRcdFx0cHJlZml4ZXMgPSBbJycsIHRoaXMubWFuaWZlc3QubW9kZWxdO1xuXHRcdGlmIChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpbmRleCcpICYmIGFjdGlvbkRhdGEuaW5kZXgpIHtcblx0XHRcdGxpc3QgPSBbYWN0aW9uRGF0YS5pbmRleF0uY29uY2F0KE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkpO1xuXHRcdH1cblx0XHRmb3IgKGxldCBwcmUgb2YgcHJlZml4ZXMpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgbGlzdCkge1xuXHRcdFx0XHRpZiAocmVjb3JkLmhhc093blByb3BlcnR5KHByZSArIHQpKSB7XG5cdFx0XHRcdFx0cmVzdWx0SWQgPSByZWNvcmRbcHJlICsgdF07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdElkO1xuXHR9XG5cblx0Z2V0QWN0aW9uc0NvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSA/IE9iamVjdC5rZXlzKHRoaXMuZ2V0QWN0aW9ucygpKS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Z2V0QWN0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgPyB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgOiB7fTtcblx0fVxuXG5cdHNldEZpbmRCeShrZXksIHZhbHVlKSB7XG5cdFx0dmFyIG9iaiA9IHt9O1xuXHRcdG9ialtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIHRoaXMuc2V0RmlsdGVyKG9iaik7XG5cdH1cblxuXHRzZXRGaWx0ZXIoZmlsdGVyRGF0YSA9IERFRkFVTFRfRklMVEVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgZmlsdGVyRGF0YSk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIoe30pO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0U29ydGVyKHNvcnRlckRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHNldFBhZ2VTaXplKHBhZ2VTaXplKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSk7XG5cdH1cblxuXHRzZXRQYWdlcihwYWdlU2l6ZSA9IERFRkFVTFRfUEFHRV9TSVpFLCBwYWdlTnVtYmVyID0gREVGQVVMVF9QQUdFX05VTUJFUikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0UGFnZXIoKTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRXb3JraW5nKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRXb3JraW5nKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdGNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlcXVlc3REYXRhID0ge307XG5cdFx0aWYgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdkYXRhJykpICYmIEFycmF5LmlzQXJyYXkoYWN0aW9uRGF0YS5kYXRhKSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpb25EYXRhLmRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGRhdGFQcm92aWRlck5hbWUgPSAnZ2V0JyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoYWN0aW9uRGF0YS5kYXRhW2ldKTtcblx0XHRcdFx0aWYgKHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gJiYgdHlwZW9mIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRyZXF1ZXN0RGF0YSA9IG5vdENvbW1vbi5leHRlbmQocmVxdWVzdERhdGEsIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0oKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVlc3REYXRhO1xuXHR9XG5cblx0ZW5jb2RlUmVxdWVzdChkYXRhKXtcblx0XHRsZXQgcCA9ICc/Jztcblx0XHRmb3IobGV0IHQgaW4gZGF0YSl7XG5cdFx0XHRwICs9IGVuY29kZVVSSUNvbXBvbmVudCh0KSsnPScrZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFbdF0pKycmJztcblx0XHR9XG5cdFx0cmV0dXJuIHA7XG5cdH1cblxuXHQvL3JldHVybiBQcm9taXNlXG5cdHJlcXVlc3QocmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zID0gdGhpcy5jb2xsZWN0UmVxdWVzdERhdGEoYWN0aW9uRGF0YSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zRW5jb2RlZCA9IHRoaXMuZW5jb2RlUmVxdWVzdChyZXF1ZXN0UGFyYW1zKSxcblx0XHRcdGlkID0gdGhpcy5nZXRJRChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpLFxuXHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwgKyByZXF1ZXN0UGFyYW1zRW5jb2RlZCwgaWQsIEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpKVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0YWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKSB7XG5cdFx0aWYgKHRoaXMgJiYgYWN0aW9uRGF0YSAmJiBhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpc0FycmF5JykgJiYgYWN0aW9uRGF0YS5pc0FycmF5KSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZGF0YVt0XSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YVt0XSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSBuZXcgbm90UmVjb3JkKHRoaXMubWFuaWZlc3QsIGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnO1xuXG5jb25zdCBNRVRBX0lOVEVSRkFDRSA9IFN5bWJvbCgnaW50ZXJmYWNlJyksXG5cdE1FVEFfUFJPWFkgPSBTeW1ib2woJ3Byb3h5JyksXG5cdE1FVEFfQ0hBTkdFID0gU3ltYm9sKCdjaGFuZ2UnKSxcblx0TUVUQV9DSEFOR0VfTkVTVEVEID0gU3ltYm9sKCdjaGFuZ2UubmVzdGVkJyksXG5cdE1FVEFfU0FMID0gW1xuXHRcdCdnZXRBdHRyJyxcblx0XHQnZ2V0QXR0cnMnLFxuXHRcdCdpc1Byb3BlcnR5Jyxcblx0XHQnaXNSZWNvcmQnLFxuXHRcdCdnZXRNYW5pZmVzdCcsXG5cdFx0J3NldEF0dHInLFxuXHRcdCdzZXRBdHRycycsXG5cdFx0J2dldERhdGEnLFxuXHRcdCdzZXREYXRhJyxcblx0XHQnZ2V0SlNPTicsXG5cdFx0J29uJyxcblx0XHQnb2ZmJyxcblx0XHQndHJpZ2dlcidcblx0XSxcblx0TUVUQV9NQVBfVE9fSU5URVJGQUNFID0gW1xuXHRcdCdnZXRBY3Rpb25zQ291bnQnLFxuXHRcdCdnZXRBY3Rpb25zJyxcblx0XHQnc2V0RmluZEJ5Jyxcblx0XHQncmVzZXRGaWx0ZXInLFxuXHRcdCdzZXRGaWx0ZXInLFxuXHRcdCdnZXRGaWx0ZXInLFxuXHRcdCdzZXRTb3J0ZXInLFxuXHRcdCdnZXRTb3J0ZXInLFxuXHRcdCdyZXNldFNvcnRlcicsXG5cdFx0J3NldFBhZ2VOdW1iZXInLFxuXHRcdCdzZXRQYWdlU2l6ZScsXG5cdFx0J3NldFBhZ2VyJyxcblx0XHQncmVzZXRQYWdlcicsXG5cdFx0J2dldFBhZ2VyJ1xuXHRdLFxuXHRERUZBVUxUX0FDVElPTl9QUkVGSVggPSAnJCcsXG5cdE1FVEFfUkVUVVJOX1RPX1JPT1QgPSBTeW1ib2woJ3JldHVyblRvUm9vdCcpO1xuXG52YXIgY3JlYXRlUHJvcGVydHlIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdHlwZW9mIHRhcmdldFtrZXldKTtcblxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UHJvcGVydHkgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoZ2V0Um9vdCwgcGF0aFRvLCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1Byb3h5IHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5zZXREYXRhKGl0ZW0pO1xuXHRcdHRoaXMuaXNQcm9wZXJ0eSA9IHRydWU7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX1JFVFVSTl9UT19ST09UXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdFtNRVRBX1JFVFVSTl9UT19ST09UXShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdGxldCByb290ID0gdGhpcy5nZXRPcHRpb25zKCdnZXRSb290JykoKTtcblx0XHRyb290LnRyaWdnZXIoJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfUFJPWFldLCB0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5LCB2YWx1ZSk7XG5cdH1cbn1cblxuXG52YXIgY3JlYXRlUmVjb3JkSGFuZGxlcnMgPSBmdW5jdGlvbihvd25lcikge1xuXHRyZXR1cm4ge1xuXHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIGNvbnRleHQpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgZ2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQsIGNvbnRleHQpO1xuXHRcdFx0aWYgKGtleSA9PT0gJ2lzUHJveHknIHx8IGtleSA9PT0gJ2lzUmVjb3JkJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX01BUF9UT19JTlRFUkZBQ0UuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHJlY29yZCBwcm94eSBzZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCk7XG5cdFx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UmVjb3JkIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG1hbmlmZXN0LCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUHJveHkpIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcigndGhpcyBpcyBQcm94eSBpdGVtJyk7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1JlY29yZCB8fCBpdGVtLmlzUHJvcGVydHkpKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7fSk7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0gPSBuZXcgbm90UmVjb3JkSW50ZXJmYWNlKG1hbmlmZXN0KTtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpcy5pbnRlcmZhY2VVcCgpO1xuXHRcdHRoaXMuaXNSZWNvcmQgPSB0cnVlO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgcmVjb3JkIGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0aW5pdFByb3BlcnRpZXMoaXRlbSwgcGF0aCA9ICcnKSB7XG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtICE9PSBudWxsKSB7XG5cdFx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKGl0ZW0pO1xuXHRcdFx0Zm9yIChsZXQga2V5IG9mIGtleXMpIHtcblx0XHRcdFx0bGV0IGN1clBhdGggPSBwYXRoICsgKHBhdGgubGVuZ3RoID4gMCA/ICcuJyA6ICcnKSArIGtleTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjdXJQYXRoJywgY3VyUGF0aCk7XG5cdFx0XHRcdGlmIChpdGVtLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW1ba2V5XSA9PT0gJ29iamVjdCcgJiYgaXRlbVtrZXldICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXG5cdGFjdGlvblVwKGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLmhhc093blByb3BlcnR5KFtERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0pKSB7XG5cdFx0XHR0aGlzW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSA9ICgpID0+IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlcXVlc3QodGhpcywgaW5kZXgpO1x0XHRcdFxuXHRcdH1cblx0fVxuXHQvKlxuXHQtPiAncGF0aC50by5rZXknLCB2YWx1ZU9mS2V5XG5cdDwtIG9rLCB3aXRoIG9uZSBvbkNoYW5nZSBldmVudCB0cmlnZ2VyZWRcblx0Ki9cblxuXHRzZXRBdHRyKGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gbm90UGF0aC5zZXQoa2V5LCB0aGlzW01FVEFfUFJPWFldLCB7fSwgdmFsdWUpO1xuXHR9XG5cblx0Lypcblx0LT5cblx0e1xuXHRcdCdrZXlQYXRoJzogdmFsdWUsXG5cdFx0J2tleS5zdWJQYXRoJzogdmFsdWUyLFxuXHRcdCdrZXlQYXRoLjAudGl0bGUnOiB2YWx1ZTNcblx0fVxuXHQ8LSBvaywgd2l0aCBidW5jaCBvZiBvbkNoYW5nZSBldmVudHMgdHJpZ2dlcmVkXG5cdCovXG5cdHNldEF0dHJzKG9iamVjdFBhcnQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzJywgb2JqZWN0UGFydCwgT2JqZWN0LmtleXMob2JqZWN0UGFydCkpO1xuXHRcdGlmIChvYmplY3RQYXJ0ICYmICh0eXBlb2Ygb2JqZWN0UGFydCA9PT0gJ29iamVjdCcpICYmIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpLmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggaW4gb2JqZWN0UGFydCkge1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzIG9uZSB0byBnbycsIHBhdGgpO1xuXHRcdFx0XHR0aGlzLnNldEF0dHIocGF0aCwgb2JqZWN0UGFydFtwYXRoXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0LT4gJ3BhdGhUb0tleSdcblx0PC0gdmFsdWUxXG5cblx0Ki9cblx0Z2V0QXR0cih3aGF0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdnZXRBdHRyJywgd2hhdCk7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHdoYXQsIHRoaXNbTUVUQV9QUk9YWV0sIHt9KTtcblx0fVxuXG5cdC8qXG5cdC0+IFsncGF0aFRvS2V5JywgJ3BhdGgudG8ua2V5JywgJ3NpbXBsZUtleScsLi4uXVxuXHQ8LSBbdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMywuLi5dXG5cdCovXG5cdGdldEF0dHJzKHdoYXQpIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0aWYgKHdoYXQgJiYgd2hhdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIG9mIHdoYXQpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5nZXRBdHRyKHBhdGgpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXSkge1xuXHRcdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLm1hbmlmZXN0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRzZXRGaW5kQnkoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmluZEJ5KC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFNvcnRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0U29ydGVyKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRQYWdlTnVtYmVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VOdW1iZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VTaXplKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VTaXplKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGdldE1vZGVsTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0TW9kZWxOYW1lKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4vbm90Um91dGVyJztcbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuXG5jb25zdCBPUFRfQ09OVFJPTExFUl9QUkVGSVggPSAnbmMnLFxuXHRPUFRfUkVDT1JEX1BSRUZJWCA9ICducic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEFwcCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoe29wdGlvbnN9KTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBhcHAnKTtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ2FwcCcsIHRoaXMpO1xuXHRcdHRoaXMucmVzb3VyY2VzID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGludGVyZmFjZXM6IHt9LFxuXHRcdFx0Y29udHJvbGxlcnM6IHt9LFxuXHRcdFx0aW5pdENvbnRyb2xsZXI6IG51bGwsXG5cdFx0XHRjdXJyZW50Q29udHJvbGxlcjogbnVsbFxuXHRcdH0pO1xuXHRcdHRoaXMucHJlSW5pdFJvdXRlcigpO1xuXHRcdHRoaXMuaW5pdE1hbmFnZXIoKTtcblx0XHR0aGlzLmluaXRBUEkoKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZXMoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRNYW5hZ2VyKCl7XG5cdFx0bm90Q29tbW9uLnNldE1hbmFnZXIoXG5cdFx0XHR7XG5cdFx0XHRcdHNldEFQSSh2KXsgdGhpcy5hcGkgPSB2O30sXG5cdFx0XHRcdGdldEFQSSgpe3JldHVybiB0aGlzLmFwaTt9LFxuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHRpbml0QVBJKCl7XG5cdFx0bm90Q29tbW9uLmdldE1hbmFnZXIoKS5zZXRBUEkobmV3IG5vdEFQSSh7fSkpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlcygpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpKXtcblx0XHRcdGxldCBwcm9tID0gbnVsbDtcblx0XHRcdGZvcihsZXQgdCBpbiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpKXtcblx0XHRcdFx0aWYgKHQgJiYgdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKS5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdFx0bGV0IHVybCA9IHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJylbdF07XG5cdFx0XHRcdFx0aWYocHJvbSl7XG5cdFx0XHRcdFx0XHRwcm9tLnRoZW4obm90VGVtcGxhdGVDYWNoZS5hZGRMaWJGcm9tVVJMLmJpbmQobm90VGVtcGxhdGVDYWNoZSwgdXJsKSk7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRwcm9tID0gbm90VGVtcGxhdGVDYWNoZS5hZGRMaWJGcm9tVVJMKHVybCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAocHJvbSl7XG5cdFx0XHRcdHByb20udGhlbih0aGlzLmluaXRNYW5pZmVzdC5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdC5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRcdFx0bm90Q29tbW9uLnJlcG9ydCgnbm8gdGVtcGxhdGVzIGxpYicsIGUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuaW5pdE1hbmlmZXN0KCk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRNYW5pZmVzdCgpIHtcblx0XHR2YXIgdXJsID0gdGhpcy5nZXRPcHRpb25zKCdtYW5pZmVzdFVSTCcpO1xuXHRcdG5vdENvbW1vbi5nZXRKU09OKHVybCwge30pXG5cdFx0XHQudGhlbih0aGlzLnNldEludGVyZmFjZU1hbmlmZXN0LmJpbmQodGhpcykpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdHByZUluaXRSb3V0ZXIoKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JvdXRlcicsIG5vdFJvdXRlcik7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXInKS5zZXRSb290KHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLnJvb3QnKSk7XG5cdFx0bm90Um91dGVyLnJlUm91dGVFeGlzdGVkKCk7XG5cdH1cblxuXHRpbml0Um91dGVyKCl7XG5cdFx0dmFyIHJvdXRpZUlucHV0ID0ge307XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLm1hbmlmZXN0JykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IHJvdXRlQmxvY2sgPSB0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5tYW5pZmVzdCcpW3RdLFxuXHRcdFx0XHRwYXRocyA9IHJvdXRlQmxvY2sucGF0aHMsXG5cdFx0XHRcdGNvbnRyb2xsZXIgPSByb3V0ZUJsb2NrLmNvbnRyb2xsZXI7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRyb3V0aWVJbnB1dFtwYXRoc1tpXV0gPSB0aGlzLmJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcicpLmFkZExpc3Qocm91dGllSW5wdXQpLmxpc3RlbigpOy8vLm5hdmlnYXRlKHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLmluZGV4JykpO1xuXHR9XG5cblx0c2V0SW50ZXJmYWNlTWFuaWZlc3QobWFuaWZlc3QpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JywgbWFuaWZlc3QpO1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdC8v0L3Rg9C20L3QviDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0YLRjFxuXHRcdC8v0LzQvtC00LXQu9C4INC/0L7Qu9GD0YfQtdC90L3Ri9C80Lgg0LjQvdGC0LXRgNGE0LXQudGB0LDQvNC4XG5cdFx0dGhpcy51cGRhdGVJbnRlcmZhY2VzKCk7XG5cdFx0Ly/QuNC90LjRhtC40LvQuNGG0LjRgNC+0LLQsNGC0Ywg0Lgg0LfQsNC/0YPRgdGC0LjRgtGMINC60L7QvdGC0YDQvtC70LvQtdGAINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG5cdFx0dGhpcy5pbml0Q29udHJvbGxlcigpO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRzdGFydEFwcCgpIHtcblx0XHQvL9GB0L7Qt9C00LDRgtGMINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHQvL9GA0L7Rg9GC0LXRgCDQuCDQv9GA0LjQstGP0LfQsNGC0Ywg0Log0L3QtdC80YMg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdHRoaXMuaW5pdFJvdXRlcigpO1xuXHR9XG5cblx0YmluZENvbnRyb2xsZXIoY29udHJvbGxlck5hbWUpIHtcblx0XHRsZXQgYXBwID0gdGhpcztcblx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdG5ldyBjb250cm9sbGVyTmFtZShhcHAsIGFyZ3VtZW50cyk7XG5cdFx0fTtcblx0fVxuXG5cdGluaXRDb250cm9sbGVyKCkge1xuXHRcdGlmICh0eXBlb2YodGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGxldCBpbml0Q29udHJvbGxlciA9IHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnaW5pdENvbnRyb2xsZXInLCBuZXcgaW5pdENvbnRyb2xsZXIodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGdldEN1cnJlbnRDb250cm9sbGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJyk7XG5cdH1cblxuXHRzZXRDdXJyZW50Q29udHJvbGxlcihjdHJsKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicsIGN0cmwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dXBkYXRlSW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLmNsZWFySW50ZXJmYWNlcygpO1xuXHRcdGxldCBtYW5pZmVzdHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0Jyk7XG5cdFx0aWYgKG1hbmlmZXN0cykge1xuXHRcdFx0Zm9yKGxldCBuYW1lIGluIG1hbmlmZXN0cyl7XG5cdFx0XHRcdGxldCByZWNvcmRNYW5pZmVzdCA9IG1hbmlmZXN0c1tuYW1lXTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbbmFtZV0gPSAocmVjb3JkRGF0YSkgPT4gbmV3IG5vdFJlY29yZChyZWNvcmRNYW5pZmVzdCwgcmVjb3JkRGF0YSk7XG5cdFx0XHRcdHdpbmRvd1snbnInICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKV0gPSB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRSZWNvcmROYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX1JFQ09SRF9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0Z2V0Q29udHJvbGxlck5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfQ09OVFJPTExFUl9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlcygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJyk7XG5cdH1cblxuXHRjbGVhckludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcmZhY2VzJywge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0d2FpdFRoaXNSZXNvdXJjZSh0eXBlLCBpbmRleCkge1xuXHRcdGlmICghdGhpcy5yZXNvdXJjZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcblx0XHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdID0ge307XG5cdFx0fVxuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IGZhbHNlO1xuXHRcdHJldHVybiB0aGlzLm9uUmVzb3VyY2VSZWFkeS5iaW5kKHRoaXMsIHR5cGUsIGluZGV4KTtcblx0fVxuXG5cdG9uUmVzb3VyY2VSZWFkeSh0eXBlLCBpbmRleCkge1xuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IHRydWU7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdGFsbFJlc291cmNlc1JlYWR5KCkge1xuXHRcdHZhciBpLCBqO1xuXHRcdGZvciAoaSBpbiB0aGlzLnJlc291cmNlcykge1xuXHRcdFx0Zm9yIChqIGluIHRoaXMucmVzb3VyY2VzW2ldKSB7XG5cdFx0XHRcdGlmICghdGhpcy5yZXNvdXJjZXNbaV1bal0pIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5cbmNvbnN0IE1FVEFfUFJPQ0VTU09SUyA9IFN5bWJvbCgncHJvY2Vzc29ycycpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQcm9jZXNzb3IoLyoga2V5LCB2YWx1ZSAqLyl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UHJvY2Vzc29yKC8qIGtleSwgIGRlZmF1bHRWYWx1ZSAqLyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyUHJvY2Vzc29ycygpe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkKCl7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuXHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gYXJndW1lbnRzWzBdKXtcblx0XHRcdFx0XHR0aGlzLnNldFByb2Nlc3Nvcih0LCBhcmd1bWVudHNbMF1bdF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0UHJvY2Vzc29yKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhcigpe1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVQcm9jZXNzb3JzKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7XG5cbi8qXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgiBET00g0L/QvtC00LTQtdGA0LXQstC+INCyINC60LDRh9C10YHRgtCy0LUg0YjQsNCx0LvQvtC90LAuXG4gKiDQl9Cw0L/QvtC70L3Rj9C10YIg0LXQs9C+INC00LDQvdC90YvQvNC4LlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YHQs9C10L3QtdGA0LjRgNC+0LLQsNC90L3Ri9C1INGN0LvQtdC80LXQvdGC0YtcbiAqXG4gKiAqL1xuXG4vKlxuXG5cdDxkaXYgbi10ZW1wbGF0ZS1uYW1lPVwidmFzeWFcIj5cblx0XHQ8cD48aW5wdXQgdHlwZT1cInRleHRcIiBuLXZhbHVlPVwiOmNvb2xOYW1lXCIvPjwvcD5cblx0XHQ8cD7QkdC+0YDQuNGBINGF0YDQtdC9INC/0L7Qv9Cw0LTQtdGI0Ywg0Lgge3s6Y29vbE5hbWV9fS48L3A+XG5cdDwvZGl2PlxuXG4gKi9cblxuY29uc3QgTUVUQV9DT01QT05FTlRTID0gU3ltYm9sKCdjb21wb25lbnRzJyk7XG5cbmNsYXNzIG5vdFJlbmRlcmVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdC8qXG5cdFx0aW5wdXQgPSB7XG5cdFx0XHRkYXRhOiBub3RSZWNvcmQsXG5cdFx0XHR0ZW1wbGF0ZTogZWxlbWVudFxuXHRcdFx0b3B0aW9uczp7XG5cdFx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHQqL1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU10gPSB7fTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMuY29tcG9uZW50ID0gaW5wdXQuY29tcG9uZW50O1xuXHRcdHRoaXMuaW5pdERhdGEoaW5wdXQuZGF0YSA/IGlucHV0LmRhdGEgOiB7fSk7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0LnRlbXBsYXRlKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZSgpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndGVtcGxhdGUnLCB0aGlzLmdldFdvcmtpbmcoJ2dldFRlbXBsYXRlJykoKSk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuZ2V0RGF0YSgpLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHR9XG5cblx0aW5pdFdvcmtpbmcodGVtcGxhdGUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0Z2V0VGVtcGxhdGU6IHRlbXBsYXRlLFxuXHRcdFx0cGFydElkOiB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpID8gdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA6IE9QVFMuUEFSVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKSB7XG5cdFx0aWYgKHRoaXMuY29tcG9uZW50KSB7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMuY29tcG9uZW50LmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH1cblx0fVxuXG5cdG9uQ2hhbmdlKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0Lypub3RDb21tb24ubG9nKHRoaXMpO1xuXHRcdG5vdENvbW1vbi5sb2codGhpcy5nZXRCcmVhZENydW1wcygpLmpvaW4oJyA+ICcpKTtcblx0XHRub3RDb21tb24ubG9nKCd1cGRhdGluZyByZW5kZXJlciAnLCB0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpLCAnIGFmdGVyIGNoYW5nZXMnLCBrZXksIHZhbHVlKTsqL1xuXHRcdHRoaXMudXBkYXRlKGtleSk7XG5cdFx0dGhpcy50cmlnZ2VyKCdvYnNvbGV0ZScscHJveHksIGtleSwgdmFsdWUpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2xlYXJTdGFzaCgpO1xuXHRcdHRoaXMuc2V0V29ya2luZ01hcHBpbmcoKTtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHR0aGlzLnNlYXJjaEZvclN1YlRlbXBsYXRlcygpO1xuXHRcdHRoaXMuc3Rhc2hSZW5kZXJlZCgpO1xuXHR9XG5cblx0dXBkYXRlKGtleSkge1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdGZvciAobGV0IHQgaW4gdGhpc1tNRVRBX0NPTVBPTkVOVFNdKSB7XG5cdFx0XHRsZXQgaXRlbSA9IHRoaXNbTUVUQV9DT01QT05FTlRTXVt0XSxcblx0XHRcdFx0aWZQYXJ0ID0gdHJ1ZTtcblx0XHRcdGlmIChrZXkpe1xuXHRcdFx0XHRpZiAoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpPT09bnVsbCl7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0XHRjb21wb25lbnRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGl0ZW0uZ2V0T3B0aW9ucygnZGF0YVBhdGgnKSksXG5cdFx0XHRcdFx0Y2hhbmdlZFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoa2V5KTtcblx0XHRcdFx0aWZQYXJ0ID0gbm90UGF0aC5pZkZ1bGxTdWJQYXRoKGNoYW5nZWRQYXRoLCBjb21wb25lbnRQYXRoKTtcblx0XHRcdFx0Lypub3RDb21tb24ubG9nKGl0ZW0uZ2V0T3B0aW9ucygnbmFtZScpLCAnID4tPCAnLCBpdGVtLmdldE9wdGlvbnMoJ2lkJyksICcgPi08ICcsIGNvbXBvbmVudFBhdGgsIGNoYW5nZWRQYXRoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygnd2lsbCBiZSB1cGRhdGVkJywgaWZQYXJ0KTsqL1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaWZQYXJ0KSB7XG5cdFx0XHRcdGl0ZW0udXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0V29ya2luZ01hcHBpbmcoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtYXBwaW5nJywgdGhpcy5jcmVhdGVNYXBwaW5nKCkpO1xuXHR9XG5cblx0LypcblxuXHTQodC+0LfQtNCw0LXQvCDQutCw0YDRgtGLINGB0L7QvtGC0LLQtdGB0YLQstC40Y8g0L/RgNC+0YbQtdGB0YHQvtGA0L7Qsiwg0L/Rg9GC0LXQuSDQtNCw0L3QvdGL0YUg0LIg0L7QsdGK0LXQutGC0LUg0Lgg0Y3Qu9C10LzQtdC90YLQvtCyINGI0LDQsdC70L7QvdCwLlxuXHRbe1xuXHRcdGVsLFxuXHRcdHByb2Nlc3Nvcixcblx0XHR3b3JraW5nLFxuXHRcdGl0ZW0ucHJvcGVydHkucGF0aFxuXHR9XVxuXG5cdCovXG5cblx0Y3JlYXRlTWFwcGluZygpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5maW5kQWxsUHJvY2Vzc29ycygpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmaW5kQWxsUHJvY2Vzc29ycygpIHtcblx0XHRsZXQgcHJvY3MgPSBbXSxcblx0XHRcdGVscyA9IG5vdENvbW1vbi5nZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCh0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSwgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpO1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgZWxzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMCwgYXR0cyA9IGVsc1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCkgPT09IDApIHtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coYXR0c1tpXSk7XG5cdFx0XHRcdFx0bGV0IHByb2NEYXRhID0gdGhpcy5wYXJzZVByb2Nlc3NvckV4cHJlc3Npb24oYXR0c1tpXS5ub2RlTmFtZSk7XG5cdFx0XHRcdFx0cHJvY0RhdGEuZWxlbWVudCA9IGVsc1tqXTtcblx0XHRcdFx0XHRwcm9jRGF0YS5wcm9jZXNzb3JFeHByZXNzaW9uID0gYXR0c1tpXS5ub2RlTmFtZTtcblx0XHRcdFx0XHRwcm9jRGF0YS5hdHRyaWJ1dGVFeHByZXNzaW9uID0gYXR0c1tpXS52YWx1ZTtcblx0XHRcdFx0XHRwcm9jcy5wdXNoKHByb2NEYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcHJvY3M7XG5cdH1cblxuXHRwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24ocHJvY2Vzc29yRXhwcmVzc2lvbikge1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRwYXJhbXM6IFtdLFxuXHRcdFx0cHJvY2Vzc29yTmFtZTogJycsXG5cdFx0XHRpZkNvbmRpdGlvbjogZmFsc2Vcblx0XHR9O1xuXHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgsICcnKTtcblx0XHRpZiAocHJvY2Vzc29yRXhwcmVzc2lvbi5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgpID09PSAocHJvY2Vzc29yRXhwcmVzc2lvbi5sZW5ndGggLSBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLmxlbmd0aCkpIHtcblx0XHRcdHJlc3VsdC5pZkNvbmRpdGlvbiA9IHRydWU7XG5cdFx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SICsgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCwgJycpO1xuXHRcdH1cblx0XHRyZXN1bHQucGFyYW1zID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5zcGxpdChPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUik7XG5cdFx0cmVzdWx0LnByb2Nlc3Nvck5hbWUgPSByZXN1bHQucGFyYW1zWzBdO1xuXHRcdHJlc3VsdC5wYXJhbXMgPSByZXN1bHQucGFyYW1zLnNsaWNlKDEpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRleGVjUHJvY2Vzc29ycyhpdGVtLCBpbmRleCkge1xuXHRcdGxldCBtYXBwaW5nID0gdGhpcy5nZXRXb3JraW5nKCdtYXBwaW5nJyk7XG5cdFx0aWYgKG1hcHBpbmcpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbWFwcGluZy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgcHJvY1Njb3BlID0gbWFwcGluZ1tpXTtcblx0XHRcdFx0cHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwcm9jU2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2F0dHJpYnV0ZVJlc3VsdCcsIHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQpO1xuXHRcdFx0XHRsZXQgcHJvY05hbWUgPSBwcm9jU2NvcGUucHJvY2Vzc29yTmFtZSxcblx0XHRcdFx0XHRwcm9jID0gbm90VGVtcGxhdGVQcm9jZXNzb3JzLmdldChwcm9jTmFtZSk7XG5cdFx0XHRcdGlmIChwcm9jKSB7XG5cdFx0XHRcdFx0cHJvYyhwcm9jU2NvcGUsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdFx0XHRcdFx0cHJvY1Njb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb2NTY29wZS5wcm9jZXNzb3JFeHByZXNzaW9uKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ25vIHByb2Nlc3NvciBsaWtlJywgcHJvY05hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcigncmVuZGVyZWQnKTtcblx0fVxuXG5cdGdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocGF0aCwgaXRlbSkge1xuXHRcdHJldHVybiBub3RQYXRoLmdldChwYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHR9XG5cblx0Y2xlYXJTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5kZXN0cm95U3VicygpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3VicycsIFtdKTtcblx0fVxuXG5cdGRlc3Ryb3lTdWJzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiB0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRTdGFzaCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGxldCBlbCA9IHRoaXMuZ2V0U3Rhc2goKVt0XTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlKXtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWZTdWJFbGVtZW50UmVuZGVyZWQobnRFbCkge1xuXHRcdHJldHVybiBudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZCAmJiAobnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQudmFsdWUgPT09ICd0cnVlJyk7XG5cdH1cblxuXHRzZWFyY2hGb3JTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGxldCBzdWJzID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzdWIgdGVtcGxhdGVzJywgc3Vicyk7XG5cdFx0Zm9yIChsZXQgbnQgPSAwOyBudCA8IHN1YnMubGVuZ3RoOyBudCsrKSB7XG5cdFx0XHRpZiAoIXRoaXMuaWZTdWJFbGVtZW50UmVuZGVyZWQoc3Vic1tudF0pKSB7XG5cdFx0XHRcdHRoaXMucmVuZGVyU3ViKHN1YnNbbnRdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhZGRTdWIobnRFbCkge1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnc3VicycpLnB1c2goe1xuXHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRwYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogJycsXG5cdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS5zcmMgOiAnJyxcblx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdFx0cmVuZGVyZWRMaXN0OiBbXSxcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclN1YihudEVsKSB7XG5cdFx0aWYgKCFudEVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGxldCBkZXRhaWxzID0ge1xuXHRcdFx0XHRkYXRhUGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6IG51bGwsXG5cdFx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLnNyYy52YWx1ZSA6ICcnLFxuXHRcdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdGRhdGE6IGRldGFpbHMuZGF0YVBhdGghPT0gbnVsbD8gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KGRldGFpbHMuZGF0YVBhdGgsIHRoaXMuZ2V0RGF0YSgpKTpudWxsLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRzcmM6IGRldGFpbHMuc3JjXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlQWZ0ZXInLFxuXHRcdFx0XHRcdGlkOiBkZXRhaWxzLmlkLFxuXHRcdFx0XHRcdG50RWw6IG50RWwsXG5cdFx0XHRcdFx0ZGF0YVBhdGg6IGRldGFpbHMuZGF0YVBhdGhcblx0XHRcdFx0fSxcblx0XHRcdFx0b3duZXI6IHRoaXNcblx0XHRcdH07XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgZGV0YWlscy5pZCk7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdW2RldGFpbHMuaWRdID0gbmV3IG5vdENvbXBvbmVudChvcHRpb25zKTtcblx0fVxuXG5cdGNsZWFyU3Rhc2goKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIFtdKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGUnKTtcblx0fVxuXG5cdGdldFN0YXNoKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3N0YXNoJyk7XG5cdH1cblxuXHRzdGFzaFJlbmRlcmVkKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHR0aGlzLmFkZFRvU3Rhc2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0fVxuXG5cdHJlcGxhY2VSZW5kZXJlZCgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3JlcGxhY2Ugc3Rhc2gnKTtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksXG5cdFx0XHRzdGFzaCA9IHRoaXMuZ2V0U3Rhc2goKSxcblx0XHRcdG5ld1N0YXNoID0gW10sXG5cdFx0XHRhbmNob3IgPSBzdGFzaC5sZW5ndGggPiAwID8gc3Rhc2hbMF0gOiB0aGlzLmdldE9wdGlvbnMoJ250RWwnKSxcblx0XHRcdHBhcmVudE5vZGUgPSBhbmNob3IucGFyZW50Tm9kZTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRuZXdTdGFzaC5wdXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBuZXdTdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0aWYgKGFuY2hvci5uZXh0U2libGluZykge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3Rhc2hbdF0sIGFuY2hvci5uZXh0U2libGluZyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChuZXdTdGFzaFt0XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgc3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3Rhc2hbdF0pO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgbmV3U3Rhc2gpO1xuXHR9XG5cblx0YWRkVG9TdGFzaChub2RlKSB7XG5cdFx0dGhpcy5nZXRTdGFzaCgpLnB1c2gobm9kZSk7XG5cdH1cblxuXHRpc0RhdGEoZGF0YSA9IHt9KSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlbmRlcmVyO1xuIiwiY29uc3QgcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdGxldCBsID0gMDtcblx0XHR3aGlsZSAodGFyZ2V0RWwuY2hpbGRyZW4ubGVuZ3RoIC0gbCkge1xuXHRcdFx0aWYgKHRhcmdldEVsLmNoaWxkcmVuWzBdLm5vZGVOYW1lID09PSAnTlQnKXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnbnQgZm91bmRlZCcpO1xuXHRcdFx0XHRsKys7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygncmVtb3ZlIGNoaWxkICcsdGFyZ2V0RWwuY2hpbGRyZW5bbF0pO1xuXHRcdFx0XHR0YXJnZXRFbC5yZW1vdmVDaGlsZCh0YXJnZXRFbC5jaGlsZHJlbltsXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRhcmdldEVsLnRleHRDb250ZW50ID0gJyc7XG5cdH0sXG5cdGJlZm9yZUVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgY2hpbGQgJywgcmVuZGVyZWRbaV0pO1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXJFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9XG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2U7XG4iLCJjb25zdCBwbGFjZUFmdGVyID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VBZnRlcjtcbiIsImNvbnN0IHBsYWNlQmVmb3JlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VCZWZvcmU7XG4iLCJjb25zdCBwbGFjZUZpcnN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gcmVuZGVyZWQubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ3BsYWNlIGZpcnN0JywgaSwgcmVuZGVyZWRbaV0pO1xuXHRcdFx0aWYgKHRhcmdldEVsLmNoaWxkcmVuLmxlbmd0aCl7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBiZWZvcmUgZmlyc3QnKTtcblx0XHRcdFx0dGFyZ2V0RWwuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5jaGlsZHJlblswXSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGFzIGZpcnN0Jyk7XG5cdFx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZUZpcnN0O1xuIiwiY29uc3QgcGxhY2VMYXN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUxhc3Q7XG4iLCJjb25zdCByZXBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRiZWZvcmVFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cblx0fSxcblx0YWZ0ZXJFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHtcdFx0XG5cdFx0aWYgKHRhcmdldEVsLm5vZGVOYW1lICE9PSAnTlQnKXtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFyZ2V0RWwpO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZTtcbiIsImltcG9ydCBwbGFjZSBmcm9tICcuL3BsYWNlJztcbmltcG9ydCBwbGFjZUFmdGVyIGZyb20gJy4vcGxhY2VBZnRlcic7XG5pbXBvcnQgcGxhY2VCZWZvcmUgZnJvbSAnLi9wbGFjZUJlZm9yZSc7XG5pbXBvcnQgcGxhY2VGaXJzdCBmcm9tICcuL3BsYWNlRmlyc3QnO1xuaW1wb3J0IHBsYWNlTGFzdCBmcm9tICcuL3BsYWNlTGFzdCc7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICcuL3JlcGxhY2UnO1xuXG5jb25zdCBub3RQbGFjZXJzID0ge1xuXHRwbGFjZTogcGxhY2UsXG5cdHBsYWNlQWZ0ZXI6IHBsYWNlQWZ0ZXIsXG5cdHBsYWNlQmVmb3JlOiBwbGFjZUJlZm9yZSxcblx0cGxhY2VGaXJzdDogcGxhY2VGaXJzdCxcblx0cGxhY2VMYXN0OiBwbGFjZUxhc3QsXG5cdHJlcGxhY2U6IHJlcGxhY2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFBsYWNlcnM7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vbm90UmVuZGVyZXInO1xuaW1wb3J0IG5vdFBsYWNlcnMgZnJvbSAnLi9wbGFjZXJzJztcblxuY29uc3QgTUVUQV9QQVJUUyA9IFN5bWJvbCgncGFydHMnKTtcbi8qXG5cdGlucHV0ID0ge1xuXHRcdGRhdGE6IG5vdFJlY29yZCBvciBbbm90UmVjb3JkXSxcblx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0aHRtbDogaHRtbChzdHJpbmcpLCBcdFx0Ly/RgtC10LrRgdGCINGBIGh0bWwg0LrQvtC00L7QvCDRiNCw0LHQu9C+0L3QsFxuXHRcdFx0ZWw6IEhUTUxFbGVtZW50KG9iamVjdCksIFx0Ly9ET00g0Y3Qu9C10LzQtdC90YJcblx0XHRcdHNyYzogc3JjKHN0cmluZyksXHRcdFx0Ly/RgdGB0YvQu9C60LAg0L3QsCDRhNCw0LnQuyDRgSDRiNCw0LHQu9C+0L3QvtC8XG5cdFx0XHRuYW1lOiBuYW1lKHN0cmluZylcdFx0XHQvL9C90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAg0LTQu9GPINC/0L7QuNGB0LrQsCDQsiDQutGN0YjQtSBub3RUZW1wbGF0ZUNhY2hlXG5cdFx0fVxuXHRcdG9wdGlvbnM6e1xuXHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0Ly/QsCDRjdGC0L4g0LrQsNC6INCx0YPQtNC10Lwg0L/QvtC80LXRidCw0YLRjCDRgNC10LfRg9C70YzRgtCw0YIg0YDQtdC90LTQtdGA0LjQvdCz0LBcblx0XHRcdHJlbmRlckFuZDogcGxhY2VTdHlsZShzdHJpbmcpINC+0LTQuNC9INC40Lcg0LLQsNGA0LjQsNC90YLQvtCyXG5cdFx0XHRcdFx0cGxhY2VcdFx0LVx00L/QvtC80LXRidCw0LXQvCDQstC90YPRgtGA0Lgg0YbQtdC70LXQstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG5cdFx0XHRcdFx0cmVwbGFjZVx0XHQtXHTQt9Cw0LzQtdC90Y/QtdC8XG5cdFx0XHRcdFx0cGxhY2VBZnRlclx0LVx00L/QvtGB0LvQtVxuXHRcdFx0XHRcdHBsYWNlQmVmb3JlXHQtXHTQtNC+XG5cdFx0XHRcdFx0cGxhY2VGaXJzdFx0LVx00LLQvdGD0YLRgNC4INC/0LXRgNCy0YvQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0XHRcdFx0cGxhY2VMYXN0XHQtXHTQstC90YPRgtGA0Lgg0L/QvtGB0LvQtdC00L3QuNC8INC00L7Rh9C10YDQvdC40Lxcblx0XHR9XG5cdH1cbiovXG5jbGFzcyBub3RDb21wb25lbnQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKXtcblx0XHRpZiAodGhpcy5vd25lcil7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMub3duZXIuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMub3duZXIgPSBpbnB1dC5vd25lcj9pbnB1dC5vd25lcjpudWxsO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dCk7XG5cdFx0dGhpcy5wcmVwYXJlVGVtcGxhdGVFbGVtZW50KGlucHV0LnRlbXBsYXRlID8gaW5wdXQudGVtcGxhdGUgOiBudWxsKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHR9XG5cblx0aW5pdEV2ZW50cyhsaXN0KXtcblx0XHRmb3IobGV0IHQgb2YgbGlzdCl7XG5cdFx0XHR0aGlzLm9uKC4uLnQpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdpZCcpKXtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygnaWQnLCBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ250RWwnKSl7XG5cdFx0XHR0aGlzLmluaXRNYXJrRWxlbWVudCgpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRNYXJrRWxlbWVudCgpe1xuXHRcdGxldCBtYXJrRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdudCcpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbnRFbCcsIG1hcmtFbCk7XG5cdFx0bGV0IHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpLFxuXHRcdFx0dGFyZ2V0UXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5Jyk7XG5cdFx0aWYgKHRhcmdldFF1ZXJ5KXtcblx0XHRcdGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFF1ZXJ5KTtcblx0XHRcdGlmICh0YXJnZXQpe1xuXHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3RhcmdldEVsJywgdGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSl7XG5cdFx0XHR0aHJvdyAnTm8gdGFyZ2V0IHRvIHBsYWNlIHJlbmRlcmVkJztcblx0XHR9ZWxzZXtcblx0XHRcdHBsYWNlci5tYWluKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSwgW21hcmtFbF0pO1xuXHRcdH1cblxuXHR9XG5cblx0aW5pdFdvcmtpbmcodmFsKSB7XG5cdFx0dGhpcy51bnNldFJlYWR5KHZhbCk7XG5cdH1cblxuXHRwcmVwYXJlVGVtcGxhdGVFbGVtZW50KHZhbCkge1xuXHRcdGlmICghdmFsKSB7XG5cdFx0XHR0aGlzLnVuc2V0UmVhZHkoKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnaHRtbCcpICYmIHZhbC5odG1sKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUud3JhcCgnJywgJycsIHZhbC5odG1sKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2VsJykgJiYgdmFsLmVsKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KHZhbC5lbC5jbG9uZU5vZGUodHJ1ZSkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdzcmMnKSAmJiB2YWwuc3JjKSB7XG5cdFx0XHRub3RUZW1wbGF0ZUNhY2hlLmFkZEZyb21VUkwodmFsLnNyYywgdmFsLnNyYylcblx0XHRcdFx0LnRoZW4odGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudC5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ25hbWUnKSAmJiB2YWwubmFtZSkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLmdldCh2YWwubmFtZSkpO1xuXHRcdH1cblx0fVxuXG5cdHNldFByb3RvVGVtcGxhdGVFbGVtZW50KGNvbnQpIHtcblx0XHRpZiAoY29udCkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcsIGNvbnQpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdyZWFkeScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ1dyb25nIHRlbXBsYXRlIGNvbnRhaW5lciBlbGVtZW50Jyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnKS5jbG9uZU5vZGUodHJ1ZSk7XG5cdH1cblxuXHRnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0cmVzZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3RlbXBsYXRlRWxlbWVudCcsIHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKS5jbG9uZU5vZGUodHJ1ZSkpO1xuXHR9XG5cblx0c2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIHRydWUpO1xuXHR9XG5cblx0dW5zZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgZmFsc2UpO1xuXHR9XG5cblx0aXNSZWFkeSgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdyZWFkeScpO1xuXHR9XG5cblx0Y2xlYXJQYXJ0cygpIHtcblx0XHQvKiDQuNC30LLQtdGJ0LDQtdC8INC+0LEg0YPQtNCw0LvQtdC90LjQuCDRjdC70LXQvNC10L3RgtC+0LIgKi9cblx0XHRpZiAodGhpc1tNRVRBX1BBUlRTXSAmJiBBcnJheS5pc0FycmF5KHRoaXNbTUVUQV9QQVJUU10pICYmIHRoaXNbTUVUQV9QQVJUU10ubGVuZ3RoKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXNbTUVUQV9QQVJUU10pIHtcblx0XHRcdFx0aWYgKHQuZGVzdHJveSl7XG5cdFx0XHRcdFx0dC5kZXN0cm95KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdH1cblxuXHRkZXN0cm95KCl7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLnBhcmVudE5vZGUpe1xuXHRcdFx0dGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmdldE9wdGlvbnMoJ250RWwnKSk7XG5cdFx0fVxuXHRcdHRoaXMuZGVhZCA9IHRydWU7XG5cdFx0dGhpcy5vZmZBbGwoKTtcblx0fVxuXG5cdHJlc2V0UGFydHMoKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXSA9IFtdO1xuXHR9XG5cblx0Z2V0UGFydHMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QQVJUU107XG5cdH1cblxuXHRhZGRQYXJ0KHRlbXBsYXRlKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXS5wdXNoKHRlbXBsYXRlKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdH1cblxuXHR1cGRhdGUoKXtcblx0XHR0aGlzLnJlbW92ZU9ic29sZXRlUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyVXBkYXRlJyk7XG5cdH1cblxuXHRwbGFjZVJlbmRlcmVkKCl7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSkge1xuXHRcdFx0bGV0IHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0cGxhY2VyLmJlZm9yZSh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpO1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnBsYWNlUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHBsYWNlci5hZnRlcih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ25vIHRhcmdldCBlbGVtZW50Jyk7XG5cdFx0fVxuXHR9XG5cblx0cGxhY2VQYXJ0KGRhdGEsIGluZGV4KXtcblx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSxcblx0XHRcdG5vZGVzID0gcGFydC5nZXRTdGFzaCgpLFxuXHRcdFx0dGFyZ2V0RWwsXG5cdFx0XHRsYXN0Tm9kZSxcblx0XHRcdHBsYWNlcjtcblx0XHRpZiAoaW5kZXggPT09IDApe1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0XHR0YXJnZXRFbCA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKE9QVFMuREVGQVVMVF9QTEFDRVJfTE9PUCk7XG5cdFx0XHR0YXJnZXRFbCA9IHRoaXMuZ2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnKTtcblx0XHR9XG5cdFx0cGxhY2VyLm1haW4odGFyZ2V0RWwsIG5vZGVzKTtcblx0XHRsYXN0Tm9kZSA9IHRhcmdldEVsO1xuXHRcdGZvcihsZXQgdCBvZiBub2Rlcyl7XG5cdFx0XHRpZiAodC5ub2RlVHlwZSA9PT0gMSl7XG5cdFx0XHRcdGxhc3ROb2RlID0gdDtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1jb21wb25lbnQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdFx0XHRsYXN0Tm9kZS5zZXRBdHRyaWJ1dGUoJ250LXBhcnQnLCBwYXJ0LmdldFdvcmtpbmcoJ3BhcnRJZCcpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScsIGxhc3ROb2RlKTtcblx0fVxuXG5cdGdldFBsYWNlcihtZXRob2QpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NlYXJjaGluZyBmb3IgcGxhY2VyJywgbWV0aG9kKTtcblx0XHRpZiAobm90UGxhY2Vycy5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG5cdFx0XHRyZXR1cm4gbm90UGxhY2Vyc1ttZXRob2RdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbm90UGxhY2Vyc1tPUFRTLkRFRkFVTFRfUExBQ0VSXTtcblx0XHR9XG5cdH1cblxuXHRmb3JFYWNoRGF0YShmdW5jKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5nZXREYXRhKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0RGF0YSgpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXREYXRhKClbdF0sIHQpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpLCAwKTtcblx0XHR9XG5cdH1cblxuXHRmb3JFYWNoUGFydChmdW5jKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5nZXRQYXJ0cygpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFBhcnRzKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldFBhcnRzKClbdF0sIHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx00LXRgdC70Lgg0YEg0LTQsNC90L3Ri9C80Lgg0L3QtSDRgdCy0Y/Qt9Cw0L0g0YDQtdC90LTQtdGA0LXRgCAtINGB0L7Qt9C00LDQtdC8XG5cdCovXG5cblx0cmVuZGVyUGFydChkYXRhKSB7XG5cdFx0aWYgKCF0aGlzLmdldFBhcnRCeURhdGEoZGF0YSkpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3JlYXRpbmcgcGFydCByZW5kZXInKTtcblx0XHRcdGxldCByZW5kZXJlciA9IG5ldyBub3RSZW5kZXJlcih7XG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdHRlbXBsYXRlOiB0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUuYmluZCh0aGlzKSxcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKCksXG5cdFx0XHRcdGNvbXBvbmVudDogdGhpc1xuXHRcdFx0fSk7XG5cdFx0XHQvL3JlbmRlcmVyLm9uKCdvYnNvbGV0ZScsIHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5hZGRQYXJ0KHJlbmRlcmVyKTtcblx0XHR9ZWxzZXtcblx0XHRcdC8vbm90Q29tbW9uLmxvZygndXBkYXRpbmcgcGFydCByZW5kZXInKTtcblx0XHRcdHRoaXMudXBkYXRlUGFydCh0aGlzLmdldFBhcnRCeURhdGEoZGF0YSkpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZVBhcnQocGFydCl7XG5cdFx0cGFydC51cGRhdGUoKTtcblx0fVxuXG5cdHJlbW92ZU9ic29sZXRlUGFydHMoKSB7XG5cdFx0Ly/QutC+0L3QstC10LXRgCDQv9C+0LjRgdC6INCw0LrRgtGD0LDQu9GM0L3Ri9GFIC0g0YPQtNCw0LvQtdC90LjQtSDQvtGB0YLQsNC70YzQvdGL0YVcblx0XHRub3RDb21tb24ucGlwZShcblx0XHRcdHVuZGVmaW5lZCwgLy8gcGFydHMgdG8gc2VhcmNoIGluLCBjYW4gYmUgJ3VuZGVmaW5lZCdcblx0XHRcdFtcblx0XHRcdFx0dGhpcy5maW5kQWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9maXJzdCByb3VuZCwgc2VhcmNoIGZvciBvYnNvbGV0ZVxuXHRcdFx0XHR0aGlzLnJlbW92ZU5vdEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vcmVtb3ZlICdlbVxuXHRcdFx0XVxuXHRcdCk7XG5cdH1cblxuXHQvKlxuXHRcdNC10YHRgtGMINC00LDQvdC90YvQtSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINCw0LrRgtGD0LDQu9GM0L3Qvixcblx0XHTQvdC10YIg0LTQsNC90L3Ri9GFINC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0YHRgtCw0YDRjNGRXG5cdCovXG5cblx0ZmluZEFjdHVhbFBhcnRzKCkge1xuXHRcdGxldCBhY3R1YWxQYXJ0cyA9IFtdO1xuXHRcdHRoaXMuZm9yRWFjaERhdGEoKGRhdGEvKiwgaW5kZXgqLyk9Pntcblx0XHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpO1xuXHRcdFx0aWYgKHBhcnQpe1xuXHRcdFx0XHRhY3R1YWxQYXJ0cy5wdXNoKHBhcnQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBhY3R1YWxQYXJ0cztcblx0fVxuXG5cdC8qXG5cdFx00YPQtNCw0LvRj9C10Lwg0LLRgdC1INC60YDQvtC80LUg0LDQutGC0YPQsNC70YzQvdGL0YVcblx0Ki9cblx0cmVtb3ZlTm90QWN0dWFsUGFydHMoYWN0dWFsUGFydHMpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFBhcnRzKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYgKGFjdHVhbFBhcnRzLmluZGV4T2YodGhpcy5nZXRQYXJ0cygpW3RdKSA9PT0gLTEpe1xuXHRcdFx0XHR0aGlzLmdldFBhcnRzKClbdF0uZGVzdHJveSgpO1xuXHRcdFx0XHR0aGlzLmdldFBhcnRzKCkuc3BsaWNlKHQsIDEpO1xuXHRcdFx0XHR0LS07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0UGFydEJ5RGF0YShkYXRhKSB7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzLmdldFBhcnRzKCkpIHtcblx0XHRcdGlmICh0aGlzLmdldFBhcnRzKClbdF0uaXNEYXRhKGRhdGEpKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFBhcnRzKClbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb21wb25lbnQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICcucGFnZS1jb250ZW50Jyxcblx0T1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCA9ICcuaHRtbCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMID0gdHJ1ZSxcblx0T1BUX0RFRkFVTFRfUExVUkFMX05BTUUgPSAnTW9kZWxzJyxcblx0T1BUX0RFRkFVTFRfU0lOR0xFX05BTUUgPSAnTW9kZWwnLFxuXHRPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSA9ICdtYWluJyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0FORCA9ICdwbGFjZSc7XG5cbmNsYXNzIG5vdENvbnRyb2xsZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoYXBwKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJlYWR5OiBmYWxzZSxcblx0XHRcdHZpZXdzOiB7fSxcblx0XHRcdGxpYnM6e30sXG5cdFx0XHR2aWV3TmFtZTogT1BUX0RFRkFVTFRfVklFV19OQU1FLFxuXHRcdFx0aGVscGVyczoge31cblx0XHR9KTtcblx0XHR0aGlzLnNldERhdGEoe30pO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRtb2R1bGVOYW1lOiBPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSxcblx0XHRcdGNvbnRhaW5lclNlbGVjdG9yOiBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IsXG5cdFx0XHRwcmVmaXg6IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZScpLFxuXHRcdFx0cG9zdGZpeDogT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCxcblx0XHRcdHJlbmRlckZyb21VUkw6IE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCxcblx0XHRcdG5hbWVzOntcblx0XHRcdFx0cGx1cmFsOk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FLFxuXHRcdFx0XHRzaW5nbGU6IE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLmluaXRSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0Lypcblx0XHQgICAg0YHRgNCw0LfRgyDQtNC10LvQsNC10Lwg0LTQvtGB0YLRg9C/0L3Ri9C80Lgg0LzQvtC00LXQu9C4IG5vdFJlY29yZCDQuNC3IG5jYENvbnRyb2xsZXJOYW1lYCDQsdGD0LTRg9GCINC00L7RgdGC0YPQv9C90Ysg0LrQsNC6IHRoaXMubnJgTW9kZWxOYW1lYFxuXHRcdCovXG5cdFx0bGV0IGludGVyZmFjZXMgPSB0aGlzLmFwcC5nZXRJbnRlcmZhY2VzKCk7XG5cdFx0dGhpcy5tYWtlID0ge307XG5cdFx0Zm9yIChsZXQgdCBpbiBpbnRlcmZhY2VzKSB7XG5cdFx0XHRpZiAoaW50ZXJmYWNlcy5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdHRoaXMubWFrZVt0XSA9IGludGVyZmFjZXNbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdFJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyKHRoaXMuZ2V0V29ya2luZygndmlld05hbWUnKSwgdGhpcy5nZXREYXRhKCksIHRoaXMuZ2V0V29ya2luZygnaGVscGVycycpKTtcblx0fVxuXG5cdHJlbmRlcih2aWV3TmFtZSA9J2RlZmF1bHQnIC8qIHZpZXcgbmFtZSAqLywgZGF0YSA9IHt9IC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzID0ge30vKiBjb3VsZCBiZSBub3QgcmVwcmVzZW50ZWQgKi8pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHZhciB2aWV3ID0gdGhpcy5nZXRWaWV3KHZpZXdOYW1lKTtcblxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3ID09PSAndW5kZWZpbmVkJyB8fCB2aWV3ID09PSBudWxsKSB7XG5cdFx0XHRcdHJlamVjdCgnTm8gdmlldyBmb3VuZCcsIHZpZXdOYW1lKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2aWV3ID0gbm90Q29tbW9uLmV4dGVuZCh7fSwgdmlldyk7XG5cdFx0XHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0XHRcdC8vINGN0LvQtdC80LXQvdGC0LAsINC90L4g0LjQt9Cy0LXRgdGC0L3QvtC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGA0LVcblx0XHRcdFx0aWYgKCgodHlwZW9mIHZpZXcudGFyZ2V0RWwgPT09ICd1bmRlZmluZWQnKSB8fCAodmlldy50YXJnZXRFbCA9PT0gbnVsbCkpICYmICh0eXBlb2Ygdmlldy50YXJnZXRRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy50YXJnZXRRdWVyeSAhPT0gbnVsbCAmJiB2aWV3LnRhcmdldFF1ZXJ5Lmxlbmd0aCA+IDApKSB7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iodmlldy50YXJnZXRRdWVyeSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHZpZXcuaGVscGVycywgaGVscGVycyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0fVxuXHRcdFx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0XHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckZyb21VUkwnKSkge1xuXHRcdFx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygdmlldy50ZW1wbGF0ZVVSTCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldy50ZW1wbGF0ZVVSTCA9PSBudWxsIHx8IHZpZXcudGVtcGxhdGVVUkwubGVuZ3RoID09IDApIHtcblx0XHRcdFx0XHRcdGxldCBwcmVmaXggPSAodmlldy5jb21tb24gPyB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5jb21tb24nKTogdGhpcy5nZXRNb2R1bGVQcmVmaXgoKSksXG5cdFx0XHRcdFx0XHRcdG5hbWUgPSAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiB2aWV3TmFtZSksXG5cdFx0XHRcdFx0XHRcdHBvc3RmaXggPSB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHRcdC8v0LPQtdC90LXRgNC40YDRg9C10Lwg0LDQtNGA0LXRgSDQv9C+INGI0LDQsdC70L7QvdGDXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gIFtwcmVmaXgsIG5hbWVdLmpvaW4oJy8nKSArIHBvc3RmaXg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8v0LAg0LXRgdC70Lgg0LXRgdGC0Ywg0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCwg0YLQvlxuXHRcdFx0XHRcdGlmICh2aWV3Lmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU5hbWUnKSkge1xuXHRcdFx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVOYW1lID0gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIHZpZXcudGVtcGxhdGVOYW1lICsgdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTp7XG5cdFx0XHRcdFx0XHRuYW1lOiB2aWV3LnRlbXBsYXRlTmFtZSxcblx0XHRcdFx0XHRcdHNyYzogdmlldy50ZW1wbGF0ZVVSTCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czpbWydhZnRlclJlbmRlcicsIHJlc29sdmVdXSxcblx0XHRcdFx0XHRvcHRpb25zOntcblx0XHRcdFx0XHRcdHRhcmdldEVsOiB2aWV3LnRhcmdldEVsLFxuXHRcdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRcdHJlbmRlckFuZDogdmlldy5yZW5kZXJBbmQgfHwgT1BUX0RFRkFVTFRfUkVOREVSX0FORFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRBcHAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwO1xuXHR9XG5cblx0c2V0TW9kZWwobW9kZWwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGVsJywgbW9kZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kZWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnbW9kZWwnKTtcblx0fVxuXG5cdHNldFJlYWR5KHZhbCA9IHRydWUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdmFsKTtcblx0XHR2YWwgPyB0aGlzLnRyaWdnZXIoJ3JlYWR5JykgOiB0aGlzLnRyaWdnZXIoJ2J1c3knKTtcblx0fVxuXG5cdHNldFZpZXcobmFtZSwgdmlldyl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSwgdmlldyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRWaWV3cyh2aWV3cyl7XG5cdFx0Zm9yKGxldCB0IGluIHZpZXdzKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgdCksIHZpZXdzW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRWaWV3KG5hbWUgPSAnZGVmYXVsdCcpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpKTtcblx0fVxuXG5cdHNldE1vZHVsZU5hbWUodmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdtb2R1bGVOYW1lJywgdmFsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZHVsZU5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnbW9kdWxlTmFtZScpO1xuXHR9XG5cblx0Z2V0TW9kdWxlUHJlZml4KCl7XG5cdFx0cmV0dXJuIFt0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGVzJyksIHRoaXMuZ2V0TW9kdWxlTmFtZSgpXS5qb2luKCcvJyk7XG5cdH1cblxuXHRwcmVsb2FkTGliKGxpc3QgPSB7fSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRpZih0eXBlb2YgbGlzdCAhPT0gJ29iamVjdCcpe1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gbGlzdCl7XG5cdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykucHVzaChsaXN0W3RdKTtcblx0XHRcdFx0XHR0aGlzLm1ha2VbbGlzdFt0XV0oe30pLiRsaXN0QWxsKClcblx0XHRcdFx0XHRcdC50aGVuKChkYXRhKT0+e1xuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbGlicycpKXtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2xpYnMnLCB7fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRPcHRpb25zKCdsaWJzJylbdF0gPSBkYXRhO1xuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pID4gLTEpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnNwbGljZSh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pLCAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KGVycik7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHF1ZWVVcGxvYWQobmFtZSwgbGlzdCl7XG5cdFx0Ly9oYXNoIChmaWVsZE5hbWU9PmZpbGVzTGlzdClcblx0XHRpZighdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRRdWVlJykpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd1cGxvYWRRdWVlJywge30pO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnKVtuYW1lXSA9IGxpc3Q7XG5cdH1cblxuXHRleGVjVXBsb2FkcyhpdGVtKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0V29ya2luZygndXBsb2FkUXVlZScpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0aWYodHlwZW9mIGxpc3QgIT09ICdvYmplY3QnKXtcblx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwbG9hZGluZycsIHt9KTtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGxpc3Qpe1xuXHRcdFx0XHRcdGxldCBmaWVsZEZpbGVzID0gbGlzdFt0XTtcblx0XHRcdFx0XHRpZiAoZmllbGRGaWxlcy5sZW5ndGggPiAxKXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSBbXTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSAnJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yKGxldCBmID0gMDsgZiA8IGZpZWxkRmlsZXMubGVuZ3RoOyBmKyspe1xuXHRcdFx0XHRcdFx0aWYoIXRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdID0gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0rKztcblx0XHRcdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3VwbG9hZGVyJylcblx0XHRcdFx0XHRcdFx0LnVwbG9hZChmaWVsZEZpbGVzW2ZdKVxuXHRcdFx0XHRcdFx0XHQudGhlbigoc2F2ZWRGaWxlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2ZpbGUgdXBsb2FkZWQnLCB0LGYsIHNhdmVkRmlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XS0tO1xuXHRcdFx0XHRcdFx0XHRcdGlmKHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0gPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmKEFycmF5LmlzQXJyYXkoaXRlbVtmXSkpe1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVt0XS5wdXNoKHNhdmVkRmlsZS5oYXNoKTtcblx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1bdF0gPSBzYXZlZEZpbGUuaGFzaDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoT2JqZWN0LmtleXModGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKSkubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoaXRlbSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQuY2F0Y2goKGVycik9Pntcblx0XHRcdFx0XHRcdFx0XHRub3RGcmFtZXdvcmsubm90Q29tbW9uLnJlcG9ydChlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoT2JqZWN0LmtleXModGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKSkubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRyZXNvbHZlKGl0ZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb250cm9sbGVyO1xuIiwiaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aC5qcyc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4uL25vdFJvdXRlcic7XG5cbnZhciBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgPSB7XG5cdGNvbnRlbnQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5pbmRleE9mKCdjYXBpdGFsaXplJykgPiAtMSkge1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0LnRvVXBwZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQudGV4dENvbnRlbnQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQ7XG5cdH0sXG5cdGJpbmQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpID0+IHtcblx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe1xuXHRcdFx0XHRcdHNjb3BlLFxuXHRcdFx0XHRcdGl0ZW0sXG5cdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBsaXZlRXZlbnRzID0gWydjaGFuZ2UnLCAna2V5dXAnXSxcblx0XHRcdG9uRXZlbnQgPSAoKSA9PiB7XG5cdFx0XHRcdGlmIChbJ2NoZWNrYm94JywgJ3JhZGlvJywgJ3NlbGVjdC1tdWx0aXBsZSddLmluZGV4T2Yoc2NvcGUuZWxlbWVudC50eXBlKSA+IC0xKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChzY29wZS5lbGVtZW50LnR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdyYWRpbyc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZD9zY29wZS5lbGVtZW50LnZhbHVlOm51bGwpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkID8gc2NvcGUuZWxlbWVudC52YWx1ZSA6IG51bGwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnc2VsZWN0LW11bHRpcGxlJzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bGV0IHNlbGVjdGVkID0gW10uc2xpY2UuY2FsbChzY29wZS5lbGVtZW50LnNlbGVjdGVkT3B0aW9ucykubWFwKGEgPT4gYS52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coJ3NlbGVjdC1tdWx0aXBsZScsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2cobm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyksICcgLT4gJyxzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgIT09IHRydWUpIHtcblx0XHRcdGlmKHNjb3BlLmVsZW1lbnQudHlwZSA9PT0gJ3RleHRhcmVhJyl7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGxldCB0IG9mIGxpdmVFdmVudHMpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHQsIG9uRXZlbnQpO1xuXHRcdFx0fVxuXHRcdFx0c2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSA9IHRydWU7XG5cdFx0fVxuXHR9LFxuXHRhdHRyOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSB8fCBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpID8gcmVzKHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlcyk7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoc2NvcGUucGFyYW1zWzBdLCBzY29wZS5hdHRyaWJ1dGVSZXN1bHQpO1xuXHR9LFxuXHRuYW1lOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKCAvKnNjb3BlLCBpdGVtLCBoZWxwZXJzKi8gKSB7XG5cblx0fSxcblx0Y2hlY2tlZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzdWx0ID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzdWx0ID09PSAnZnVuY3Rpb24nKSA/IHJlc3VsdCh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXN1bHQpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA/IHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgdHJ1ZSkgOiBzY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuXHR9LFxuXHRjbGFzczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKSA/IHJlcyh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoIDwgMyB8fCBpc05hTihzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKSB7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCB1c2VkID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNjb3BlLnBhcmFtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoaSA9PT0gc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdFx0dXNlZCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICghdXNlZCkge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdG9wdGlvbnM6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0b3B0aW9uID0gbnVsbCxcblx0XHRcdHZhbHVlRmllbGROYW1lID0gJ3ZhbHVlJyxcblx0XHRcdGxhYmVsRmllbGROYW1lID0gJ25hbWUnLFxuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGQnKSAmJiBoZWxwZXJzLmZpZWxkLmhhc093blByb3BlcnR5KCduYW1lJykgPyBoZWxwZXJzLmZpZWxkLm5hbWUgOiAndmFsdWUnO1xuXHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzJdO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIGhlbHBlcnMgIT09IG51bGwgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpICYmIGhlbHBlcnMuZGVmYXVsdCkge1xuXHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsICcnKTtcblx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGhlbHBlcnMucGxhY2Vob2xkZXI7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0dmFyIGxpYiA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxpYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKTtcblx0XHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gbGliW2ldW2xhYmVsRmllbGROYW1lXTtcblx0XHRcdFx0aWYgKGhlbHBlcnMuZmllbGQuYXJyYXkpIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdICYmIEFycmF5LmlzQXJyYXkoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdKSl7XG5cdFx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdLmluZGV4T2YobGliW2ldW3ZhbHVlRmllbGROYW1lXSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdID09PSBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSB7XG5cdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRocmVmOmZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRpZiAoIXNjb3BlLmVsZW1lbnQubm90Um91dGVySW5pdGlhbGl6ZWQpe1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIG5vdFJvdXRlci5nZXRGdWxsUm91dGUoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSk7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0bm90Um91dGVyLm5hdmlnYXRlKG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0XHRzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cbn07XG5leHBvcnQgZGVmYXVsdCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWI7XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCA9ICdmb3JtXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfRk9STV9USVRMRSA9ICdGb3JtIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge30sXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUID0gWydvcHRpb25zJywgJ21hbmlmZXN0JywgJ2FwcCddO1xuXG5jbGFzcyBub3RGb3JtIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdwcmVmaXgnLCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50cycsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLnNldERhdGEobmV3IG5vdFJlY29yZCh7fSwgdGhpcy5nZXREYXRhKCkpKTtcblx0XHR9XG5cdFx0dGhpcy5vbignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjYW5jZWwnLCB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcykpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKTtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoKSB7XG5cdFx0bGV0IG1hbmlmZXN0ID0gdGhpcy5nZXRNYW5pZmVzdCgpO1xuXHRcdGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC5hY3Rpb25zKSB7XG5cdFx0XHRyZXR1cm4gbWFuaWZlc3QuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpKSA/IG1hbmlmZXN0LmFjdGlvbnNbdGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKV0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRnZXRGb3JtRmllbGRzTGlzdCgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0cm9sZSA9IHRoaXMuZ2V0T3B0aW9ucygncm9sZScsIE9QVF9ERUZBVUxUX1JPTEVfTkFNRSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpIHtcblxuXHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzKSB7XG5cdFx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xuXHRcdFx0XHRcdGxpc3QgPSBhY3Rpb25EYXRhLmZpZWxkc1tyb2xlXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdC8qXG5cdFx0UmVuZGVyaW5nXG5cdCovXG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHR9XG5cblx0Z2V0UGFydFRlbXBsYXRlTmFtZShmb3JtUGFydCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHRoaXMuYmluZEZvcm1FdmVudHMuYmluZCh0aGlzKV0sXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfRk9STV9USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KClbdF07XG5cdFx0XHRcdHRoaXMuYWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGVhckZpZWxkc0NvbXBvbmVudHMoKSB7XG5cdFx0bGV0IGNvbXBzID0gdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJyk7XG5cdFx0d2hpbGUgKGNvbXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbXBzWzBdLmNvbXBvbmVudC5kZXN0cm95KCk7XG5cdFx0XHRjb21wcy5zcGxpY2UoMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlicygpe1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRvcHRpb25zOiB7fSxcblx0XHRcdG1hbmlmZXN0OiB7fSxcblx0XHRcdGFwcDoge30sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAobm90Q29tbW9uLmdldEFwcCgpICYmIG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKSl7XG5cdFx0XHRyZXN1bHQuYXBwID0gbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQgJiYgdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKSl7XG5cdFx0XHRyZXN1bHQubWFuaWZlc3QgPSB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpLmZpZWxkcztcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSB7XG5cdFx0bGV0IGRlZiA9IE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04sXG5cdFx0XHRmaWVsZHNMaWJzID0gdGhpcy5nZXRGaWVsZHNMaWJzKCk7XG5cdFx0Zm9yKGxldCB0IG9mIE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUKXtcblx0XHRcdGlmIChmaWVsZHNMaWJzLmhhc093blByb3BlcnR5KHQpICYmIGZpZWxkc0xpYnNbdF0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSl7XG5cdFx0XHRcdHJldHVybiBmaWVsZHNMaWJzW3RdW2ZpZWxkTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkZWY7XG5cdH1cblxuXHRhZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpIHtcblx0XHRsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSk7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKT0+e1xuXHRcdFx0XHRyZXR1cm4gcGFyYW1zLml0ZW0udmFsdWUgPT09IHRoaXMuZ2V0RGF0YShmaWVsZE5hbWUpO1xuXHRcdFx0fSxcblx0XHRcdGZpZWxkOiByZWMuZmllbGQsXG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKVxuXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0Rm9ybVRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCcsXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlckRhdGFDaGFuZ2UnLCB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMocGFyYW1zKXtcblx0XHRub3RDb21tb24ubG9nKCdjb2xsZWN0IGRhdGEgZnJvbSBjb21wb25lbnRzJywgcGFyYW1zKTtcblx0fVxuXG5cdGdldEZvcm1UYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jyl7XG5cdFx0aWYgKCF0YXJnZXQpe3RhcmdldCA9ICdib2R5Jzt9XG5cdFx0bGV0IHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0IT09J2JvZHknKXtcblx0XHRcdHRhcmdldCA9ICdib2R5Jztcblx0XHRcdHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0fVxuXHRcdGlmKCFyZXMgJiYgdGFyZ2V0PT0nYm9keScpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHRjb2xsZWN0RGF0YSgpIHtcblx0XHQvL2xldCBkYXRhID0gdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcyk7XG5cdH1cblxuXHRiaW5kRm9ybUV2ZW50cygpe1xuXHRcdGxldCB0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZih0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZih0YXJnZXQpe1xuXHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3RhcmdldEVsJywgdGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSl7XG5cdFx0XHRsZXRcdGZvcm0gPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXHRcdFx0aWYoZm9ybSl7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR1cGRhdGVGaWVsZChmaWVsZE5hbWUpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uZmllbGQubmFtZSA9PT0gZmllbGROYW1lKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCkge1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpIHtcblxuXHR9XG5cblx0b25SZXNldCgpIHtcblxuXHR9XG5cblx0Z2V0RmllbGRzKCkge1xuXG5cdH1cblxuXHRhZGRGaWVsZCgpIHtcblxuXHR9XG5cblx0cmVtb3ZlRmllbGQoKSB7XG5cblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Rm9ybTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX1BBR0VfU0laRSA9IDIwLFxuXHRPUFRfREVGQVVMVF9QQUdFX05VTUJFUiA9IDAsXG5cdE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OID0gMSxcblx0T1BUX0RFRkFVTFRfU09SVF9GSUVMRCA9ICdfaWQnLFxuXHRPUFRfRklFTERfTkFNRV9QUkVfUFJPQyA9ICdwcmVwcm9jZXNzb3InO1xuXG5jbGFzcyBub3RUYWJsZSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIFtdKTtcblx0XHRpZighdGhpcy5nZXREYXRhKCkgfHwgIUFycmF5LmlzQXJyYXkodGhpcy5nZXREYXRhKCdyb3dzJykpKXtcblx0XHRcdHRoaXMuc2V0RGF0YSh7cm93czpbXX0pO1xuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR0aGlzLnJlc2V0RmlsdGVyKCk7XG5cdFx0dGhpcy5yZXNldFNvcnRlcigpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50JykpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50JykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBjb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogJ3RhYmxlX3dyYXBwZXInXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRyZW5kZXJBbmQ6IHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgJ2FmdGVyVXBkYXRlJ10sIHRoaXMucmVuZGVySW5zaWRlLmJpbmQodGhpcylcblx0XHRcdFx0XHRdXG5cdFx0XHRcdF1cblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBjb21wb25lbnQpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlckluc2lkZSgpIHtcblx0XHR0aGlzLnJlbmRlckhlYWRlcigpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHRcdHRoaXMucmVuZGVyQm9keSgpO1xuXHRcdHRoaXMuYmluZFNlYXJjaCgpO1xuXHRcdHRoaXMuYmluZEN1c3RvbUJpbmRpbmdzKCk7XG5cdH1cblxuXHRyZW5kZXJIZWFkZXIoKSB7XG5cdFx0dmFyIHRhYmxlSGVhZGVyID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIHRyJyk7XG5cdFx0aWYgKCF0YWJsZUhlYWRlcikgcmV0dXJuO1xuXHRcdGxldCBmaWVsZHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgbmV3VGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUSCcpO1xuXHRcdFx0bmV3VGguaW5uZXJIVE1MID0gZmllbGRzW2ldLnRpdGxlO1xuXHRcdFx0aWYgKGZpZWxkc1tpXS5oYXNPd25Qcm9wZXJ0eSgnc29ydGFibGUnKSAmJiBmaWVsZHNbaV0uc29ydGFibGUpIHtcblx0XHRcdFx0dGhpcy5hdHRhY2hTb3J0aW5nSGFuZGxlcnMobmV3VGgsIGZpZWxkc1tpXS5wYXRoKTtcblx0XHRcdH1cblx0XHRcdHRhYmxlSGVhZGVyLmFwcGVuZENoaWxkKG5ld1RoKTtcblx0XHR9XG5cdH1cblxuXHRhdHRhY2hTb3J0aW5nSGFuZGxlcnMoaGVhZENlbGwsIGZpZWxkTmFtZSkge1xuXHRcdGhlYWRDZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuY2hhbmdlU29ydGluZ09wdGlvbnMoaGVhZENlbGwsIGZpZWxkTmFtZSk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdFx0aGVhZENlbGwuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHR9XG5cblx0Y2hhbmdlU29ydGluZ09wdGlvbnMoZWwsIGZpZWxkTmFtZSkge1xuXHRcdGlmIChmaWVsZE5hbWUgPT09IHRoaXMuZ2V0U29ydGVyKCkuc29ydEJ5RmllbGQpe1xuXHRcdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0XHRzb3J0QnlGaWVsZDogZmllbGROYW1lLFxuXHRcdFx0XHRzb3J0RGlyZWN0aW9uOiAtMSAqIHRoaXMuZ2V0U29ydGVyKCkuc29ydERpcmVjdGlvbixcblx0XHRcdH0pO1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0XHRzb3J0QnlGaWVsZDogZmllbGROYW1lLFxuXHRcdFx0XHRzb3J0RGlyZWN0aW9uOiBPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTixcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZiAoZWwucGFyZW50Tm9kZSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbC5wYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldID09PSBlbCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19hc2MnKTtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdub25lJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldFNvcnRlcigpLnNvcnREaXJlY3Rpb24gPiAwKSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdhc2NlbmRpbmcnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnZGVzY2VuZGluZycpO1xuXHRcdH1cblx0fVxuXG5cdHNldFNvcnRlcihoYXNoKSB7XG5cdFx0Ly9jb25zb2xlLmxvZygnc2V0U29ydGVyJywgaGFzaCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBoYXNoKTtcblx0XHR0aGlzLmludmFsaWRhdGVEYXRhKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldFNvcnRlcigpe1xuXHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdHNvcnRCeUZpZWxkOiBPUFRfREVGQVVMVF9TT1JUX0ZJRUxELFxuXHRcdFx0c29ydERpcmVjdGlvbjogT1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04sXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRTb3J0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc29ydGVyJyk7XG5cdH1cblxuXHRnZXRGaWx0ZXJTZWFyY2goKSB7XG5cdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5nZXRGaWx0ZXIoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRGaWx0ZXIoKSAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2ggIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoICE9PSBudWxsKSA/IHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoLnRvU3RyaW5nKCkgOiAnJztcblx0fVxuXG5cdGludmFsaWRhdGVEYXRhKCkge1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2xpdmVMb2FkJykgJiYgdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpKSB7XG5cdFx0XHR3aGlsZSh0aGlzLmdldERhdGEoJ3Jvd3MnKS5sZW5ndGg+MCl7XG5cdFx0XHRcdHRoaXMuZ2V0RGF0YSgncm93cycpLnBvcCgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5yZXNldFBhZ2VyKCk7XG5cdFx0fVxuXHR9XG5cblx0c2V0RmlsdGVyKGhhc2gpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcicsIGhhc2gpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZURhdGEoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHRoaXMuc2V0RmlsdGVyKHt9KTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VyKGhhc2gpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3BhZ2VyJywgaGFzaCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldFBhZ2VyKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncGFnZXInLCB7XG5cdFx0XHRwYWdlU2l6ZTogaXNOYU4odGhpcy5nZXRPcHRpb25zKCdwYWdlU2l6ZScpKSA/IE9QVF9ERUZBVUxUX1BBR0VfU0laRTp0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJyksXG5cdFx0XHRwYWdlTnVtYmVyOiBpc05hTih0aGlzLmdldE9wdGlvbnMoJ3BhZ2VOdW1iZXInKSkgPyBPUFRfREVGQVVMVF9QQUdFX05VTUJFUjp0aGlzLmdldE9wdGlvbnMoJ3BhZ2VOdW1iZXInKSxcblx0XHR9KTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJyk7XG5cdH1cblxuXHRzZXRVcGRhdGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwZGF0aW5nJywgdHJ1ZSk7XG5cdH1cblxuXHRzZXRVcGRhdGVkKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndXBkYXRpbmcnLCBmYWxzZSk7XG5cdH1cblxuXHRpZlVwZGF0aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3VwZGF0aW5nJyk7XG5cdH1cblxuXHR1cGRhdGVEYXRhKCkge1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2xpdmVMb2FkJykgJiYgdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2UnKSkge1xuXHRcdFx0aWYgKHRoaXMuaWZVcGRhdGluZygpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vbG9hZCBmcm9tIHNlcnZlclxuXHRcdFx0bGV0IHF1ZXJ5ID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2UnKSh7fSlcblx0XHRcdFx0LnNldEZpbHRlcih0aGlzLmdldEZpbHRlcigpKVxuXHRcdFx0XHQuc2V0U29ydGVyKHRoaXMuZ2V0U29ydGVyKCkpXG5cdFx0XHRcdC5zZXRQYWdlcih0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUsIHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyKTtcblx0XHRcdHRoaXMuc2V0VXBkYXRpbmcoKTtcblx0XHRcdHF1ZXJ5LiRsaXN0KClcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCckbGlzdCBmb3IgdGFibGUnLCBkYXRhKTtcblx0XHRcdFx0XHR0aGlzLnNldERhdGEoe1xuXHRcdFx0XHRcdFx0cm93czogdGhpcy5nZXREYXRhKCdyb3dzJykuY29uY2F0KGRhdGEpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dGhpcy5wcm9jY2Vzc0RhdGEoKTtcblx0XHRcdFx0XHR0aGlzLnJlZnJlc2hCb2R5KCk7XG5cdFx0XHRcdFx0dGhpcy5zZXRVcGRhdGVkKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcihlKTtcblx0XHRcdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vbG9jYWwgbWFnaWNcblx0XHRcdHRoaXMuc2V0VXBkYXRpbmcoKTtcblx0XHRcdHRoaXMucHJvY2Nlc3NEYXRhKCk7XG5cdFx0XHR0aGlzLnJlZnJlc2hCb2R5KCk7XG5cdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHR9XG5cdH1cblxuXHRwcm9jY2Vzc0RhdGEoKSB7XG5cdFx0dmFyIHRoYXRGaWx0ZXIgPSB0aGlzLmdldEZpbHRlcigpO1xuXHRcdGlmICh0eXBlb2YgdGhhdEZpbHRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdEZpbHRlciAhPT0gbnVsbCAmJiB0eXBlb2YgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2ggIT09ICd1bmRlZmluZWQnICYmIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoICE9PSBudWxsICYmIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoLmxlbmd0aCA+IDApIHtcblx0XHRcdC8vXG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIHRoaXMuZ2V0RGF0YSgncm93cycpLmZpbHRlcih0aGlzLnRlc3REYXRhSXRlbS5iaW5kKHRoaXMpKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgdGhpcy5nZXREYXRhKCdyb3dzJykpO1xuXHRcdH1cblx0XHQvLy8vc29ydGVyXG5cdFx0dmFyIHRoYXRTb3J0ZXIgPSB0aGlzLmdldFNvcnRlcigpO1xuXHRcdGlmICh0eXBlb2YgdGhhdFNvcnRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdFNvcnRlciAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5zb3J0KChpdGVtMSwgaXRlbTIpID0+IHtcblx0XHRcdFx0bGV0IHQxID0gbm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCwgaXRlbTEsIHt9KSxcblx0XHRcdFx0XHR0MiA9IG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsaXRlbTIse30pO1xuXHRcdFx0XHRpZiAoaXNOYU4odDEpKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0MSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHQyICE9PSAndW5kZWZpbmVkJyAmJiB0MS5sb2NhbGVDb21wYXJlKXtcblx0XHRcdFx0XHRcdHJldHVybiB0MS5sb2NhbGVDb21wYXJlKCkgKiAtIHRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gKCh0MSA8IHQyKSA/IDEgOiAtMSkgKiB0aGF0U29ydGVyLnNvcnREaXJlY3Rpb247XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGJpbmRTZWFyY2goKSB7XG5cdFx0dmFyIHNlYXJjaEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJzZWFyY2hcIl0nKVswXTtcblx0XHRpZiAoIXNlYXJjaEVsKSByZXR1cm47XG5cdFx0dmFyIG9uRXZlbnQgPSAoZSkgPT4ge1xuXHRcdFx0dGhpcy5zZXRGaWx0ZXIoe1xuXHRcdFx0XHRmaWx0ZXJTZWFyY2g6IGUuY3VycmVudFRhcmdldC52YWx1ZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXHRcdHNlYXJjaEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25FdmVudCk7XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcignZW50ZXInLCBvbkV2ZW50KTtcblx0fVxuXG5cblx0YmluZEN1c3RvbUJpbmRpbmdzKCkge1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpIHx8ICF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Zm9yICh2YXIgc2VsZWN0b3IgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpKSB7XG5cdFx0XHR2YXIgZWxzID0gdGhpcy5nZXRPcHRpb24oJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRmb3IgKHZhciBlbElkID0gMDsgZWxJZCA8IGVscy5sZW5ndGg7IGVsSWQrKykge1xuXHRcdFx0XHR2YXIgZWwgPSBlbHNbZWxJZF07XG5cdFx0XHRcdGZvciAodmFyIGV2ZW50IGluIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl0pIHtcblx0XHRcdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJylbc2VsZWN0b3JdW2V2ZW50XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRsb2FkTmV4dCgpIHtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJykucGFnZU51bWJlcisrO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVuZGVyUm93KGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG5ld1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RSJyksXG5cdFx0XHRmaWVsZHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgbmV3VGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdURCcpLFxuXHRcdFx0XHRmaWVsZCA9IGZpZWxkc1tpXSxcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gbnVsbCxcblx0XHRcdFx0dmFsID0gbm90UGF0aC5nZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdlZGl0YWJsZScpICYmICFmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnY29tcG9uZW50JykpIHtcblx0XHRcdFx0bmV3VGQuc2V0QXR0cmlidXRlKCdjb250ZW50RWRpdGFibGUnLCB0cnVlKTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC5wYXRoID0gZmllbGQucGF0aDtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC5pdGVtSWQgPSBpdGVtW3RoaXMuZ2V0T3B0aW9ucygnaXRlbUlkRmllbGQnKV07XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQudmFsdWUgPSB2YWw7XG5cdFx0XHRcdG5ld1RkLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKT0+e1xuXHRcdFx0XHRcdG5vdFBhdGguc2V0KGZpZWxkLnBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLCBuZXdUZC50ZXh0Q29udGVudCk7XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KE9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DKSkge1xuXHRcdFx0XHRwcmVwcm9jZXNzZWQgPSBmaWVsZFtPUFRfRklFTERfTkFNRV9QUkVfUFJPQ10odmFsLCBpdGVtLCBpbmRleCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHRcdG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRcdGRhdGE6IGZpZWxkLmNvbXBvbmVudC5kYXRhIHx8IHByZXByb2Nlc3NlZCB8fCB7dmFsLCBpdGVtLCBpbmRleH0sXG5cdFx0XHRcdFx0dGVtcGxhdGU6IGZpZWxkLmNvbXBvbmVudC50ZW1wbGF0ZSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogbmV3VGQsXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBmaWVsZC5jb21wb25lbnQuZXZlbnRzIHx8IFtdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3VGQuaW5uZXJIVE1MID0gcHJlcHJvY2Vzc2VkIHx8IHZhbDtcblx0XHRcdH1cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykgJiYgZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdGZvciAodmFyIGogaW4gZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcihqLCAoZSk9Pntcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHJldHVybiBmaWVsZC5ldmVudHNbal0oe1xuXHRcdFx0XHRcdFx0XHRldmVudDogZSxcblx0XHRcdFx0XHRcdFx0ZWxlbWVudDogbmV3VGQsXG5cdFx0XHRcdFx0XHRcdGl0ZW06IGl0ZW0sXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB2YWwsXG5cdFx0XHRcdFx0XHRcdGZpZWxkOiBmaWVsZFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRuZXdSb3cuYXBwZW5kQ2hpbGQobmV3VGQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdwcm9jUm93JykpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3Byb2NSb3cnKShuZXdSb3csIGl0ZW0pO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3Um93O1xuXHR9XG5cblx0cmVmcmVzaEJvZHkoKSB7XG5cdFx0dmFyIHRib2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXHRcdGlmICghdGJvZHkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5jbGVhckJvZHkoKTtcblx0XHR0aGlzLmNoZWNrRmlsdGVyZWQoKTtcblx0XHR2YXIgdGhpc1BhZ2VTdGFydHMgPSAwLFxuXHRcdFx0bmV4dFBhZ2VFbmRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyICsgMSk7XG5cdFx0Zm9yICh2YXIgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0dGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJSb3codGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKVtpXSkpO1xuXHRcdH1cblx0fVxuXG5cdGZpbmRCb2R5KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGJvZHknKTtcblx0fVxuXG5cdGNsZWFyQm9keSgpIHtcblx0XHR2YXIgdGFibGVCb2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXHRcdGlmICghdGFibGVCb2R5KSByZXR1cm47XG5cdFx0dGFibGVCb2R5LmlubmVySFRNTCA9ICcnO1xuXHR9XG5cblx0Y2hlY2tGaWx0ZXJlZCgpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsW10pO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlckJvZHkoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ29uZVBhZ2VyJykpIHtcblx0XHRcdHRoaXMuY2xlYXJCb2R5KCk7XG5cdFx0fVxuXHRcdHRoaXMuY2hlY2tGaWx0ZXJlZCgpO1xuXHRcdHZhciB0aGlzUGFnZVN0YXJ0cyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciksXG5cdFx0XHRuZXh0UGFnZUVuZHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIgKyAxKSxcblx0XHRcdHRib2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0dGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJSb3codGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKVtpXSkpO1xuXHRcdH1cblx0fVxuXG5cdHRlc3REYXRhSXRlbShpdGVtKXtcblx0XHR2YXIgc3RyVmFsdWUgPSB0aGlzLmdldEZpbHRlclNlYXJjaCgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0Zm9yKHZhciBrIGluIGl0ZW0pe1xuXHRcdFx0dmFyIHRvQ29tcCA9IGl0ZW1ba10udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKHRvQ29tcC5pbmRleE9mKHN0clZhbHVlKT4tMSl7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90VGFibGU7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9ERVRBSUxTX1BSRUZJWCA9ICdkZXRhaWxzXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfREVUQUlMU19USVRMRSA9ICdEZXRhaWxzIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge30sXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUID0gWydvcHRpb25zJywgJ21hbmlmZXN0JywgJ2FwcCddO1xuXG5jbGFzcyBub3REZXRhaWxzIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdwcmVmaXgnLCBPUFRfREVGQVVMVF9ERVRBSUxTX1BSRUZJWCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50cycsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLnNldERhdGEobmV3IG5vdFJlY29yZCh7fSwgdGhpcy5nZXREYXRhKCkpKTtcblx0XHR9XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YSgpIHtcblx0XHRsZXQgbWFuaWZlc3QgPSB0aGlzLmdldE1hbmlmZXN0KCk7XG5cdFx0aWYgKG1hbmlmZXN0ICYmIG1hbmlmZXN0LmFjdGlvbnMpIHtcblx0XHRcdHJldHVybiBtYW5pZmVzdC5hY3Rpb25zLmhhc093blByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJykpID8gbWFuaWZlc3QuYWN0aW9uc1t0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpXSA6IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpc3QoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKSxcblx0XHRcdGxpc3QgPSBbXSxcblx0XHRcdHJvbGUgPSB0aGlzLmdldE9wdGlvbnMoJ3JvbGUnLCBPUFRfREVGQVVMVF9ST0xFX05BTUUpO1xuXHRcdGlmIChhY3Rpb25EYXRhKSB7XG5cdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMpIHtcblx0XHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzLmhhc093blByb3BlcnR5KHJvbGUpKSB7XG5cdFx0XHRcdFx0bGlzdCA9IGFjdGlvbkRhdGEuZmllbGRzW3JvbGVdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHR9XG5cblx0Z2V0UGFydFRlbXBsYXRlTmFtZShmb3JtUGFydCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfREVUQUlMU19USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0RmllbGRzTGlzdCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0bGV0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0RmllbGRzTGlzdCgpW3RdO1xuXHRcdFx0XHR0aGlzLmFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xlYXJGaWVsZHNDb21wb25lbnRzKCkge1xuXHRcdGxldCBjb21wcyA9IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpO1xuXHRcdHdoaWxlIChjb21wcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb21wc1swXS5jb21wb25lbnQuZGVzdHJveSgpO1xuXHRcdFx0Y29tcHMuc3BsaWNlKDAsIDEpO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpYnMoKXtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0b3B0aW9uczoge30sXG5cdFx0XHRtYW5pZmVzdDoge30sXG5cdFx0XHRhcHA6IHt9LFxuXHRcdH07XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJykpIHtcblx0XHRcdHJlc3VsdC5vcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKG5vdENvbW1vbi5nZXRBcHAoKSAmJiBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJykpe1xuXHRcdFx0cmVzdWx0LmFwcCA9IG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkICYmIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkpe1xuXHRcdFx0cmVzdWx0Lm1hbmlmZXN0ID0gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKS5maWVsZHM7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSkge1xuXHRcdGxldCBkZWYgPSBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OLFxuXHRcdFx0ZmllbGRzTGlicyA9IHRoaXMuZ2V0RmllbGRzTGlicygpO1xuXHRcdGZvcihsZXQgdCBvZiBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCl7XG5cdFx0XHRpZiAoZmllbGRzTGlicy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBmaWVsZHNMaWJzW3RdLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpe1xuXHRcdFx0XHRyZXR1cm4gZmllbGRzTGlic1t0XVtmaWVsZE5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0YWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKSB7XG5cdFx0bGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpO1xuXHRcdGxldCByZWMgPSB7XG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRuYW1lOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHRpdGxlOiBmaWVsZFR5cGUubGFiZWwgfHwgZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHR0eXBlOiBmaWVsZFR5cGUudHlwZSxcblx0XHRcdFx0bGFiZWw6IGZpZWxkVHlwZS5sYWJlbCxcblx0XHRcdFx0YXJyYXk6IGZpZWxkVHlwZS5hcnJheSxcblx0XHRcdFx0ZGVmYXVsdDogZmllbGRUeXBlLmRlZmF1bHQsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ2hlbHBlcnMnLCdsaWJzJyxmaWVsZE5hbWUpKVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0bGV0IGhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdGlzQ2hlY2tlZDogKHBhcmFtcykgPT4ge1xuXHRcdFx0XHRyZXR1cm4gcGFyYW1zLml0ZW0udmFsdWUgPT09IHRoaXMuZ2V0RGF0YShmaWVsZE5hbWUpO1xuXHRcdFx0fSxcblx0XHRcdGZpZWxkOiByZWMuZmllbGQsXG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKVxuXHRcdH0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblx0XHRyZWMuY29tcG9uZW50ID0gbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZShmaWVsZFR5cGUudHlwZSlcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldFRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCdcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5wdXNoKHJlYyk7XG5cdH1cblxuXHRnZXRUYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jyl7XG5cdFx0aWYgKCF0YXJnZXQpe3RhcmdldCA9ICdib2R5Jzt9XG5cdFx0bGV0IHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0IT09J2JvZHknKXtcblx0XHRcdHRhcmdldCA9ICdib2R5Jztcblx0XHRcdHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0fVxuXHRcdGlmKCFyZXMgJiYgdGFyZ2V0PT0nYm9keScpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHR1cGRhdGVGaWVsZChmaWVsZE5hbWUpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uZmllbGQubmFtZSA9PT0gZmllbGROYW1lKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90RGV0YWlscztcbiIsIi8qXG5cdENvbW1vbiBmdW5jdGlvbnNcbiovXG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbi8qXG5cdGZyYW1ld29yayB3aWRlIHBhcnNlciBmb3IgZGF0YSBhY2Nlc3NcbiovXG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuL25vdFJvdXRlcic7XG5cbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuLypcblx0YmFzaWMgZXZlbnQgaGFuZGxlcnMgYW5kIGNvcmUgZGF0YSBtb2RpZmllcnNcbiovXG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuLypcblx0c21hcnRlciBpbWFnZSBjb250cm9sXG4qL1xuaW1wb3J0IG5vdEltYWdlIGZyb20gJy4vdGVtcGxhdGUvbm90SW1hZ2UnO1xuLypcblx0YXBwbGljYXRpb24gbWFpbiBpbmZyYXN0cnVjdHVyZSBzZXR0ZXJcbiovXG5pbXBvcnQgbm90QXBwIGZyb20gJy4vbm90QXBwJztcbi8qXG5cdGRhZGR5IGZvciB1c2VyIGNvbnRyb2xsZXJzXG4qL1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi9ub3RDb250cm9sbGVyJztcbi8qXG5cdHRlbXBsYXRpbmcgYW5kIGNvbW1vbiBzdHJ1Y3R1cmVzXG4qL1xuXG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RSZW5kZXJlcic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnOyAvLyBzbWFydGVyIHdpdGggYmluZGluZ3MgZm9yIGV2ZW50cywgYWN0dWFseSBwcm94eVxuXG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuL2NvbXBvbmVudHMvbm90Rm9ybSc7XG5pbXBvcnQgbm90VGFibGUgZnJvbSAnLi9jb21wb25lbnRzL25vdFRhYmxlJztcbmltcG9ydCBub3REZXRhaWxzIGZyb20gJy4vY29tcG9uZW50cy9ub3REZXRhaWxzJztcblxuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7IC8vXHRob3cgdG8gaW50ZXJhY3Qgd2l0aCBkYXRhIG9uIHNlcnZlclxuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7IC8vXHR3cmFwcGVyIGZvciBkYXRhIHdpdGggc2VydmVyPC0+dmlldyBsaXZlIGludGVyYWN0aW9uc1xuXG5ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuYWRkKG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYik7XG5cbmV4cG9ydCB7XG5cdG5vdENvbW1vbixcblx0bm90UGF0aCxcblx0bm90QmFzZSxcblx0bm90SW1hZ2UsXG5cdG5vdEFwcCxcblx0bm90QVBJLFxuXHRub3RDb250cm9sbGVyLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnMsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYixcblx0bm90VGVtcGxhdGVDYWNoZSxcblx0bm90UmVuZGVyZXIsXG5cdG5vdENvbXBvbmVudCxcblx0bm90Rm9ybSxcblx0bm90Um91dGVyLFxuXHRub3RUYWJsZSxcblx0bm90RGV0YWlscyxcblx0bm90UmVjb3JkLFxuXHRub3RSZWNvcmRJbnRlcmZhY2Vcbn07XG4iXSwibmFtZXMiOlsiQ29tbW9uTmV0d29yayIsInVyaSIsImdldCIsImRhdGFBcnJheSIsImZpZWxkcyIsImkiLCJmIiwiaGFzT3duUHJvcGVydHkiLCJpbWFnZSIsIkltYWdlIiwic2V0QXR0cmlidXRlIiwic3JjIiwiaW5kZXhPZiIsImFkZFByb3RvY29sIiwidXBsb2FkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9uUHJvZ3Jlc3MiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzcG9uc2VUeXBlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwid2l0aENyZWRlbnRpYWxzIiwib3BlbiIsInVybCIsInNldFJlcXVlc3RIZWFkZXIiLCJnZXRTZXNzaW9uSUQiLCJmaWxlIiwidHlwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIm5hbWUiLCJzZW5kIiwibWV0aG9kIiwiZGF0YSIsIm9ubG9hZCIsInQiLCJvbmVycm9yIiwib250aW1lb3V0IiwicGFyc2VJbnQiLCJyZXNwb25zZVRleHQiLCJlIiwiZ2V0Q29va2llIiwidmFsdWUiLCJkb2N1bWVudCIsImNvb2tpZSIsInBhcnRzIiwic3BsaXQiLCJsZW5ndGgiLCJwb3AiLCJzaGlmdCIsIkNvbW1vbkxvZ3MiLCJsb2ciLCJhcmd1bWVudHMiLCJlcnJvciIsInRyYWNlIiwiTUFOQUdFUiIsIlN5bWJvbCIsIkNvbW1vblNob3J0cyIsImdldE1hbmFnZXIiLCJnZXRBUEkiLCJ2IiwiQ29tbW9uT2JqZWN0cyIsImRlZmF1bHRzIiwib3B0aW9ucyIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImNhbGwiLCJ0YXJnZXQiLCJzb3VyY2VzIiwiZm9yRWFjaCIsImRlc2NyaXB0b3JzIiwia2V5cyIsInNvdXJjZSIsInJlZHVjZSIsImtleSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldE93blByb3BlcnR5U3ltYm9scyIsImRlc2NyaXB0b3IiLCJzeW0iLCJlbnVtZXJhYmxlIiwiZGVmaW5lUHJvcGVydGllcyIsImJpZyIsInNtYWxsIiwib2JqIiwiZmlsdGVyIiwiY29udGFpbnNPYmoiLCJpY29ucyIsImJhdGNoIiwiZ2V0RGF0YSIsInB1c2giLCJhIiwiYiIsInAiLCJlcXVhbCIsInRvU3RyaW5nIiwiZGVmYXVsdFZhbHVlIiwib2JqMSIsIm9iajIiLCJqUXVlcnkiLCJleHRlbmQiLCJ2YWwiLCJyZWdpc3RyeSIsImFycmF5Iiwib2xkX2luZGV4IiwibmV3X2luZGV4IiwiayIsInVuZGVmaW5lZCIsInNwbGljZSIsIkNvbW1vblN0cmluZ3MiLCJzdHJpbmciLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9Mb3dlckNhc2UiLCJDb21tb25GdW5jdGlvbnMiLCJmdW5jcyIsInJlc3VsdCIsImZ1bmMiLCJDb21tb25ET00iLCJlbCIsInN0YXJ0c1dpdGgiLCJhbGxFbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsaXN0IiwiaiIsImF0dHMiLCJhdHRyaWJ1dGVzIiwibiIsIm5vZGVOYW1lIiwiQ29tbW9uQXBwIiwic3RhcnRlciIsIm5vdENvbW1vbiIsImFzc2lnbiIsImV4dGVuZFdpdGgiLCJTVUJfUEFUSF9TVEFSVCIsIlNVQl9QQVRIX0VORCIsIlBBVEhfU1BMSVQiLCJQQVRIX1NUQVJUX09CSkVDVCIsIlBBVEhfU1RBUlRfSEVMUEVSUyIsIkZVTkNUSU9OX01BUktFUiIsIk1BWF9ERUVQIiwibm90UGF0aCIsInBhdGgiLCJzdWJQYXRoIiwiZmluZCIsInN1YiIsInBhcnNlZCIsInN1YmYiLCJyZXBsYWNlIiwiaXRlbSIsImhlbHBlcnMiLCJzdWJQYXRoUGFyc2VkIiwiZmluZE5leHRTdWJQYXRoIiwiZ2V0VmFsdWVCeVBhdGgiLCJyZXBsYWNlU3ViUGF0aCIsInBhcnNlU3VicyIsImF0dHJWYWx1ZSIsInNldFZhbHVlQnlQYXRoIiwiaXNSZWNvcmQiLCJub3JtaWxpemVQYXRoIiwidHJpZ2dlciIsInNldCIsInN0ZXAiLCJoZWxwZXIiLCJyU3RlcCIsIkFycmF5IiwiaXNBcnJheSIsInBhcnNlUGF0aFN0ZXAiLCJvYmplY3QiLCJhdHRyUGF0aCIsImF0dHJOYW1lIiwiaXNGdW5jdGlvbiIsIm5ld09iaiIsImFyZ3MiLCJqb2luIiwiTUVUQV9NRVRIT0RfSU5JVCIsIk1FVEFfRVZFTlRTIiwiTUVUQV9EQVRBIiwiTUVUQV9XT1JLSU5HIiwiTUVUQV9PUFRJT05TIiwibm90QmFzZSIsImlucHV0IiwiZXZlbnRzIiwib24iLCJzZXREYXRhIiwic2V0V29ya2luZyIsIndvcmtpbmciLCJzZXRPcHRpb25zIiwid2hhdCIsInJlcyIsInNldENvbW1vbiIsImdldENvbW1vbiIsImdldE9wdGlvbnMiLCJnZXRXb3JraW5nIiwiZXZlbnROYW1lcyIsImV2ZW50Q2FsbGJhY2tzIiwib25jZSIsImRlZmluZUlmTm90RXhpc3RzIiwiZnJvbSIsImV2ZW50TmFtZSIsImV2ZW50Iiwib2ZmIiwiY2FsbGJhY2tzIiwiY2FsbGJhY2siLCJ0YXJnZXRJZCIsIk9QVF9NT0RFX0hJU1RPUlkiLCJPUFRfTU9ERV9IQVNIIiwiT1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwiLCJub3RSb3V0ZXIiLCJyb290IiwiY2xlYXJTbGFzaGVzIiwicmUiLCJoYW5kbGVyIiwicnVsZSIsImFkZCIsInBhcmFtIiwiciIsImZyYWdtZW50IiwibG9jYXRpb24iLCJkZWNvZGVVUkkiLCJwYXRobmFtZSIsInNlYXJjaCIsIndpbmRvdyIsIm1hdGNoIiwiaHJlZiIsImN1cnJlbnQiLCJnZXRGcmFnbWVudCIsImluaXQiLCJpc0luaXRpYWxpemVkIiwiY2hlY2siLCJzZXRJbml0aWFsaXplZCIsImxvb3BJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2hlY2tMb2NhdGlvbiIsImJpbmQiLCJocmVmQ2xpY2siLCJmdWxsUkUiLCJhcHBseSIsImhvc3QiLCJwdXNoU3RhdGUiLCJnZXRGdWxsUm91dGUiLCJib2R5IiwiZ2V0QWxsTGlua3MiLCJpbml0UmVyb3V0aW5nIiwiZ2V0QXR0cmlidXRlIiwibGluayIsIm5vdFJvdXRlckluaXRpYWxpemVkIiwiZnVsbExpbmsiLCJwcmV2ZW50RGVmYXVsdCIsIm5hdmlnYXRlIiwibm90QVBJT3B0aW9ucyIsIm5vdEFQSVF1ZWUiLCJyZXF1ZXN0c1BlclNlY29uZCIsInF1ZWUiLCJpbnQiLCJpblByb2dyZXNzIiwidG9DYWxsIiwiY2xlYXJJbnRlcnZhbCIsInJ1biIsIm5vdEFQSSIsImlkIiwiZ29vZCIsImJhZCIsIm1ha2VSZXF1ZXN0IiwicmVzcG9uc2VPSyIsInJlc3BvbnNlRmFpbGVkIiwicmVxdWVzdEpTT04iLCJ0aGVuIiwibmV4dCIsImNhdGNoIiwiY29kZSIsImdldElkIiwibW9kZWxOYW1lIiwiZ2V0TW9kZWxOYW1lIiwibWFrZVVybCIsImdldEpTT04iLCJnZXRNb2RlbCIsInNldFByaWNlIiwibW9kZWwiLCJub3RJbWFnZSIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCIsIlRFTVBMQVRFX1RBRyIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYIiwiQ09NUE9ORU5UX0lEX1BSRUZJWCIsIlBBUlRfSURfUFJFRklYIiwiREVGQVVMVF9QTEFDRVIiLCJERUZBVUxUX1BMQUNFUl9MT09QIiwiT1BUUyIsIk1FVEFfQ0FDSEUiLCJub3RUZW1wbGF0ZUNhY2hlIiwiaGlkZVRlbXBsYXRlcyIsInJlZ2lzdGVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1hcCIsImxvYWRPbmUiLCJvUmVxdWVzdCIsImRpdiIsImRhdGFzZXQiLCJub3RUZW1wbGF0ZU5hbWUiLCJub3RUZW1wbGF0ZVVSTCIsInNyY0VsZW1lbnQiLCJzZXRPbmUiLCJlbGVtZW50IiwiY2xvbmVOb2RlIiwiY29udCIsInRleHQiLCJub3RUZW1wbGF0ZXNFbGVtZW50cyIsImVsSWQiLCJwYXJlbnROb2RlIiwibGliIiwiZ2V0SFRNTCIsInRlbXBsYXRlSW5uZXJIVE1MIiwidGVtcGxhdGVDb250RWwiLCJ3cmFwIiwidGVtcGxhdGVzSFRNTCIsInRlbXBsYXRlcyIsInBhcnNlTGliIiwiYWRkTGliIiwic2VsZWN0b3JPckVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGFnTmFtZSIsIk9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkiLCJERUZBVUxUX0ZJTFRFUiIsIkRFRkFVTFRfUEFHRV9OVU1CRVIiLCJERUZBVUxUX1BBR0VfU0laRSIsIm5vdEludGVyZmFjZSIsIm1hbmlmZXN0IiwibGluZSIsInJlY29yZCIsImFjdGlvbk5hbWUiLCJyZWNvcmRSRSIsImZpZWxkTmFtZSIsImluZCIsImxlbiIsImluZDIiLCJzdGFydFNsaWNlIiwiZW5kU2xpY2UiLCJnZXRBdHRyIiwiYWN0aW9uRGF0YSIsInBhcnNlTGluZSIsInBvc3RGaXgiLCJyZXN1bHRJZCIsInByZWZpeGVzIiwiaW5kZXgiLCJjb25jYXQiLCJwcmUiLCJnZXRBY3Rpb25zIiwiYWN0aW9ucyIsInNldEZpbHRlciIsImZpbHRlckRhdGEiLCJzb3J0ZXJEYXRhIiwicGFnZU51bWJlciIsInBhZ2VTaXplIiwic2V0UGFnZXIiLCJyZXF1ZXN0RGF0YSIsImRhdGFQcm92aWRlck5hbWUiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJnZXRBY3Rpb25EYXRhIiwicmVxdWVzdFBhcmFtcyIsImNvbGxlY3RSZXF1ZXN0RGF0YSIsInJlcXVlc3RQYXJhbXNFbmNvZGVkIiwiZW5jb2RlUmVxdWVzdCIsImdldElEIiwiZ2V0VVJMIiwicXVlZVJlcXVlc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiYWZ0ZXJTdWNjZXNzUmVxdWVzdCIsIm5vdFJlY29yZCIsIk1FVEFfSU5URVJGQUNFIiwiTUVUQV9QUk9YWSIsIk1FVEFfQ0hBTkdFIiwiTUVUQV9DSEFOR0VfTkVTVEVEIiwiTUVUQV9TQUwiLCJNRVRBX01BUF9UT19JTlRFUkZBQ0UiLCJERUZBVUxUX0FDVElPTl9QUkVGSVgiLCJNRVRBX1JFVFVSTl9UT19ST09UIiwiY3JlYXRlUHJvcGVydHlIYW5kbGVycyIsIm93bmVyIiwiY29udGV4dCIsInJlc1RhcmdldCIsIlJlZmxlY3QiLCJFcnJvciIsInZhbHVlVG9SZWZsZWN0Iiwibm90UHJvcGVydHkiLCJnZXRSb290IiwicGF0aFRvIiwiaXNQcm94eSIsImlzUHJvcGVydHkiLCJQcm94eSIsInByb3h5IiwiY3JlYXRlUmVjb3JkSGFuZGxlcnMiLCJjcmVhdGVDb2xsZWN0aW9uIiwibm90UmVjb3JkSW50ZXJmYWNlIiwiaW5pdFByb3BlcnRpZXMiLCJpbnRlcmZhY2VVcCIsImN1clBhdGgiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiaXRlbXMiLCJjb2xsZWN0aW9uIiwiZ2V0QWN0aW9uc0NvdW50IiwiYWN0aW9uVXAiLCJyZXF1ZXN0Iiwib2JqZWN0UGFydCIsInNldEF0dHIiLCJzZXRGaW5kQnkiLCJyZXNldEZpbHRlciIsImdldEZpbHRlciIsInNldFNvcnRlciIsImdldFNvcnRlciIsInNldFBhZ2VOdW1iZXIiLCJzZXRQYWdlU2l6ZSIsInJlc2V0UGFnZXIiLCJnZXRQYWdlciIsIk9QVF9DT05UUk9MTEVSX1BSRUZJWCIsIk9QVF9SRUNPUkRfUFJFRklYIiwibm90QXBwIiwicmVzb3VyY2VzIiwicHJlSW5pdFJvdXRlciIsImluaXRNYW5hZ2VyIiwiaW5pdEFQSSIsImluaXRUZW1wbGF0ZXMiLCJzZXRNYW5hZ2VyIiwiYXBpIiwic2V0QVBJIiwicHJvbSIsImFkZExpYkZyb21VUkwiLCJpbml0TWFuaWZlc3QiLCJyZXBvcnQiLCJzZXRJbnRlcmZhY2VNYW5pZmVzdCIsInNldFJvb3QiLCJyZVJvdXRlRXhpc3RlZCIsInJvdXRpZUlucHV0Iiwicm91dGVCbG9jayIsInBhdGhzIiwiY29udHJvbGxlciIsImJpbmRDb250cm9sbGVyIiwiYWRkTGlzdCIsImxpc3RlbiIsInVwZGF0ZSIsInVwZGF0ZUludGVyZmFjZXMiLCJpbml0Q29udHJvbGxlciIsImFsbFJlc291cmNlc1JlYWR5Iiwic3RhcnRBcHAiLCJpbml0Um91dGVyIiwiY29udHJvbGxlck5hbWUiLCJhcHAiLCJjdHJsIiwiY2xlYXJJbnRlcmZhY2VzIiwibWFuaWZlc3RzIiwicmVjb3JkTWFuaWZlc3QiLCJyZWNvcmREYXRhIiwib25SZXNvdXJjZVJlYWR5IiwiTUVUQV9QUk9DRVNTT1JTIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzIiwic2V0UHJvY2Vzc29yIiwiZ2V0UHJvY2Vzc29yIiwiTUVUQV9DT01QT05FTlRTIiwibm90UmVuZGVyZXIiLCJyZW5kZXIiLCJjb21wb25lbnQiLCJpbml0RGF0YSIsImluaXRPcHRpb25zIiwiaW5pdFdvcmtpbmciLCJ0ZW1wbGF0ZSIsImluaXRUZW1wbGF0ZSIsIm9uQ2hhbmdlIiwiTWF0aCIsInJhbmRvbSIsImdldEJyZWFkQ3J1bXBzIiwiY2xlYXJTdGFzaCIsInNldFdvcmtpbmdNYXBwaW5nIiwiZXhlY1Byb2Nlc3NvcnMiLCJzZWFyY2hGb3JTdWJUZW1wbGF0ZXMiLCJzdGFzaFJlbmRlcmVkIiwiaWZQYXJ0IiwiY29tcG9uZW50UGF0aCIsImNoYW5nZWRQYXRoIiwiaWZGdWxsU3ViUGF0aCIsImNyZWF0ZU1hcHBpbmciLCJmaW5kQWxsUHJvY2Vzc29ycyIsInByb2NzIiwiZWxzIiwiZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgiLCJnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50IiwicHJvY0RhdGEiLCJwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24iLCJwcm9jZXNzb3JFeHByZXNzaW9uIiwiYXR0cmlidXRlRXhwcmVzc2lvbiIsImlmQ29uZGl0aW9uIiwicGFyYW1zIiwicHJvY2Vzc29yTmFtZSIsIm1hcHBpbmciLCJwcm9jU2NvcGUiLCJhdHRyaWJ1dGVSZXN1bHQiLCJnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0IiwicHJvY05hbWUiLCJwcm9jIiwicmVtb3ZlQXR0cmlidXRlIiwiZGVzdHJveVN1YnMiLCJkZXN0cm95IiwiY2xlYXJTdWJUZW1wbGF0ZXMiLCJnZXRTdGFzaCIsInJlbW92ZUNoaWxkIiwibnRFbCIsIm50UmVuZGVyZWQiLCJzdWJzIiwibnQiLCJpZlN1YkVsZW1lbnRSZW5kZXJlZCIsInJlbmRlclN1YiIsImRldGFpbHMiLCJkYXRhUGF0aCIsIm5vdENvbXBvbmVudCIsImNoaWxkTm9kZXMiLCJhZGRUb1N0YXNoIiwic3Rhc2giLCJuZXdTdGFzaCIsImFuY2hvciIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwibm9kZSIsInBsYWNlIiwidGFyZ2V0RWwiLCJsIiwiY2hpbGRyZW4iLCJ0ZXh0Q29udGVudCIsInJlbmRlcmVkIiwicGxhY2VBZnRlciIsInBsYWNlQmVmb3JlIiwicGxhY2VGaXJzdCIsInBsYWNlTGFzdCIsIm5vdFBsYWNlcnMiLCJNRVRBX1BBUlRTIiwicmVzZXRQYXJ0cyIsInByZXBhcmVUZW1wbGF0ZUVsZW1lbnQiLCJpbml0TWFya0VsZW1lbnQiLCJtYXJrRWwiLCJwbGFjZXIiLCJnZXRQbGFjZXIiLCJ0YXJnZXRRdWVyeSIsIm1haW4iLCJ1bnNldFJlYWR5IiwiaHRtbCIsInNldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiYWRkRnJvbVVSTCIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiY2xlYXJQYXJ0cyIsImRlYWQiLCJvZmZBbGwiLCJmb3JFYWNoRGF0YSIsInJlbmRlclBhcnQiLCJwbGFjZVJlbmRlcmVkIiwicmVtb3ZlT2Jzb2xldGVQYXJ0cyIsImJlZm9yZSIsInBsYWNlUGFydCIsImFmdGVyIiwicGFydCIsImdldFBhcnRCeURhdGEiLCJub2RlcyIsImxhc3ROb2RlIiwibm9kZVR5cGUiLCJnZXRQYXJ0cyIsInJlbmRlcmVyIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSIsImFkZFBhcnQiLCJ1cGRhdGVQYXJ0IiwicGlwZSIsImZpbmRBY3R1YWxQYXJ0cyIsInJlbW92ZU5vdEFjdHVhbFBhcnRzIiwiYWN0dWFsUGFydHMiLCJpc0RhdGEiLCJPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IiLCJPUFRfREVGQVVMVF9WSUVXU19QT1NURklYIiwiT1BUX0RFRkFVTFRfVklFV19OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMIiwiT1BUX0RFRkFVTFRfUExVUkFMX05BTUUiLCJPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSIsIk9QVF9ERUZBVUxUX01PRFVMRV9OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0FORCIsIm5vdENvbnRyb2xsZXIiLCJpbml0UmVuZGVyIiwiaW50ZXJmYWNlcyIsImdldEludGVyZmFjZXMiLCJtYWtlIiwidmlld05hbWUiLCJ2aWV3IiwiZ2V0VmlldyIsInRlbXBsYXRlVVJMIiwicHJlZml4IiwiY29tbW9uIiwiZ2V0TW9kdWxlUHJlZml4IiwicG9zdGZpeCIsInRlbXBsYXRlTmFtZSIsInJlbmRlckFuZCIsInZpZXdzIiwiZ2V0TW9kdWxlTmFtZSIsIiRsaXN0QWxsIiwiZXJyIiwiZmllbGRGaWxlcyIsInNhdmVkRmlsZSIsImhhc2giLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIiLCJzY29wZSIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsImxpdmVFdmVudHMiLCJvbkV2ZW50IiwiY2hlY2tlZCIsImZpZWxkIiwic2VsZWN0ZWQiLCJzZWxlY3RlZE9wdGlvbnMiLCJwcm9jZXNzZWRWYWx1ZSIsImlzTmFOIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidXNlZCIsIm9wdGlvbiIsInZhbHVlRmllbGROYW1lIiwibGFiZWxGaWVsZE5hbWUiLCJpdGVtVmFsdWVGaWVsZE5hbWUiLCJkZWZhdWx0IiwicGxhY2Vob2xkZXIiLCJPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCIsIk9QVF9ERUZBVUxUX1JPTEVfTkFNRSIsIk9QVF9ERUZBVUxUX0ZPUk1fVElUTEUiLCJPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QiLCJub3RGb3JtIiwib25TdWJtaXQiLCJvblJlc2V0Iiwib25DYW5jZWwiLCJnZXRNYW5pZmVzdCIsInJvbGUiLCJyZW5kZXJXcmFwcGVyIiwiZm9ybVBhcnQiLCJnZXRXcmFwcGVyRGF0YSIsImdldFBhcnRUZW1wbGF0ZU5hbWUiLCJiaW5kRm9ybUV2ZW50cyIsInJlbmRlckNvbXBvbmVudHMiLCJ3cmFwcGVyIiwidGl0bGUiLCJnZXRGb3JtRmllbGRzTGlzdCIsImFkZEZpZWxkQ29tcG9uZW50IiwiY29tcHMiLCJnZXRBcHAiLCJkZWYiLCJmaWVsZHNMaWJzIiwiZ2V0RmllbGRzTGlicyIsImZpZWxkVHlwZSIsImdldEZpZWxkc0RlZmluaXRpb24iLCJyZWMiLCJsYWJlbCIsImdldEZvcm1UYXJnZXRFbGVtZW50IiwiY29sbGVjdERhdGFGcm9tQ29tcG9uZW50cyIsImZvcm0iLCJPUFRfREVGQVVMVF9QQUdFX1NJWkUiLCJPUFRfREVGQVVMVF9QQUdFX05VTUJFUiIsIk9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OIiwiT1BUX0RFRkFVTFRfU09SVF9GSUVMRCIsIk9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DIiwibm90VGFibGUiLCJyb3dzIiwicmVzZXRTb3J0ZXIiLCJyZW5kZXJJbnNpZGUiLCJyZW5kZXJIZWFkZXIiLCJ1cGRhdGVEYXRhIiwicmVuZGVyQm9keSIsImJpbmRTZWFyY2giLCJiaW5kQ3VzdG9tQmluZGluZ3MiLCJ0YWJsZUhlYWRlciIsIm5ld1RoIiwic29ydGFibGUiLCJhdHRhY2hTb3J0aW5nSGFuZGxlcnMiLCJoZWFkQ2VsbCIsImNoYW5nZVNvcnRpbmdPcHRpb25zIiwic3R5bGUiLCJjdXJzb3IiLCJzb3J0QnlGaWVsZCIsInNvcnREaXJlY3Rpb24iLCJpbnZhbGlkYXRlRGF0YSIsImZpbHRlclNlYXJjaCIsImlmVXBkYXRpbmciLCJxdWVyeSIsInNldFVwZGF0aW5nIiwiJGxpc3QiLCJwcm9jY2Vzc0RhdGEiLCJyZWZyZXNoQm9keSIsInNldFVwZGF0ZWQiLCJ0aGF0RmlsdGVyIiwidGVzdERhdGFJdGVtIiwidGhhdFNvcnRlciIsInNvcnQiLCJpdGVtMSIsIml0ZW0yIiwidDEiLCJ0MiIsImxvY2FsZUNvbXBhcmUiLCJzZWFyY2hFbCIsImN1cnJlbnRUYXJnZXQiLCJzZWxlY3RvciIsImdldE9wdGlvbiIsIm5ld1JvdyIsIm5ld1RkIiwicHJlcHJvY2Vzc2VkIiwiaXRlbUlkIiwidGJvZHkiLCJmaW5kQm9keSIsImNsZWFyQm9keSIsImNoZWNrRmlsdGVyZWQiLCJ0aGlzUGFnZVN0YXJ0cyIsIm5leHRQYWdlRW5kcyIsIm1pbiIsInJlbmRlclJvdyIsInRhYmxlQm9keSIsInN0clZhbHVlIiwiZ2V0RmlsdGVyU2VhcmNoIiwidG9Db21wIiwiT1BUX0RFRkFVTFRfREVUQUlMU19QUkVGSVgiLCJPUFRfREVGQVVMVF9ERVRBSUxTX1RJVExFIiwibm90RGV0YWlscyIsImdldEZpZWxkc0xpc3QiLCJnZXRUYXJnZXRFbGVtZW50Il0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxnQkFBZ0I7VUFDVixpQkFBU0MsR0FBVCxFQUFjO1NBQ2YsS0FBS0MsR0FBTCxDQUFTLE1BQVQsSUFBbUJELEdBQTFCO0VBRmtCO2NBSU4scUJBQVNBLEdBQVQsRUFBYztTQUNuQixLQUFLQyxHQUFMLENBQVMsVUFBVCxJQUF1QkQsR0FBOUI7RUFMa0I7Z0JBT0osdUJBQVNFLFNBQVQsRUFBb0JDLE1BQXBCLEVBQTRCO09BQ3JDLElBQUlDLENBQVQsSUFBY0YsU0FBZCxFQUF5QjtRQUNuQixJQUFJRyxDQUFU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
