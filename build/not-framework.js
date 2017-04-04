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
							reject(xhr.response);
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
					reject(xhr.response);
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
					reject(xhr.response);
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
					reject(xhr.response);
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
					reject(xhr.response);
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
					reject(xhr.response);
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
					reject(xhr.responseText);
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

//dirty hack to remove no-console warning of eslint
/* global notFramework*/
var LOG = 'console';
var CommonLogs = {
	error: function error() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG;

			(_window$LOG = window[LOG]).error.apply(_window$LOG, arguments);
		}
	},
	log: function log() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG2;

			(_window$LOG2 = window[LOG]).log.apply(_window$LOG2, arguments);
		}
	},
	report: function report() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG3;

			(_window$LOG3 = window[LOG]).error.apply(_window$LOG3, arguments);
		}
	},
	trace: function trace() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG4;

			(_window$LOG4 = window[LOG]).trace.apply(_window$LOG4, arguments);
		}
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

			notCommon.requestJSON(method, url, data).then(function (response) {
				_this3.quee.next();
				good && good(response);
			}).catch(function (response) {
				_this3.quee.next();
				bad && bad(response);
			});
		}
	}, {
		key: 'update',
		value: function update(obj, good, bad) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var id = obj.getId(),
				    modelName = obj.getModelName(),
				    url = _this4.makeUrl([_this4.getOptions('base'), modelName, id]),
				    data = obj.getJSON();
				_this4.quee.add(_this4.makeRequest.bind(_this4, 'post', url, id, data, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
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
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
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
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
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
								notCommon.log('file uploaded', t, f, savedFile);
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
								notCommon.report(err);
								reject(err);
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
	}, {
		key: 'onAfterRender',
		value: function onAfterRender() {
			this.trigger('afterRender');
		}
	}]);
	return notController;
}(notBase);

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

var OPT_DEFAULT_VIEW = 'edit';

var CRUDCreate = function (_notController) {
	inherits(CRUDCreate, _notController);

	function CRUDCreate(parent, params) {
		var _ret;

		classCallCheck(this, CRUDCreate);

		var _this = possibleConstructorReturn(this, (CRUDCreate.__proto__ || Object.getPrototypeOf(CRUDCreate)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Create');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.create.name') || OPT_DEFAULT_VIEW,
				common: _this.parent.getOptions('views.create.common') || true,
				targetQuery: _this.parent.getOptions('views.create.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});
		_this.preloadLib(_this.parent.getOptions('views.create.preload')).then(_this.renderWrapper.bind(_this)).then(_this.renderForm.bind(_this)).then(_this.onAfterRender.bind(_this)).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDCreate, [{
		key: 'renderWrapper',
		value: function renderWrapper() {
			return this.render('default', {}, {});
		}
	}, {
		key: 'renderForm',
		value: function renderForm() {
			var _this2 = this;

			this.newItem = this.parent.initItem();
			return new Promise(function (resolve, reject) {
				try {
					_this2.form = new notForm({
						data: _this2.newItem,
						options: {
							action: _this2.parent.getOptions('views.create.action'),
							targetQuery: _this2.parent.getOptions('views.create.targetQuery') || _this2.parent.getOptions('targetQuery'),
							targetEl: document.querySelector(_this2.parent.getOptions('views.create.targetQuery') || _this2.parent.getOptions('targetQuery')),
							prefix: _this2.parent.getOptions('views.create.prefix') || _this2.parent.getOptions('prefix'),
							role: _this2.parent.getOptions('views.create.role') || _this2.parent.getOptions('role'),
							helpers: notCommon.extend({
								file: function file(params) {
									var files = params.e.target.files || params.e.dataTransfer.files;
									notCommon.log('file changed', files);
									if (params.helpers.field.name && files) {
										_this2.queeUpload(params.helpers.field.name, files);
									}
								},
								submit: function submit() {
									notCommon.log('submit form ', _this2.newItem);
									_this2.execUploads(_this2.newItem).then(_this2.create.bind(_this2));
								},
								afterSubmit: function afterSubmit() {
									_this2.goToTable();
								},
								libs: _this2.getOptions('libs')
							}, _this2.parent.getOptions('views.create.helpers') || {})
						},
						events: [['afterRender', resolve], [['afterSubmit', 'afterRestore'], _this2.backToList.bind(_this2)]]
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'backToList',
		value: function backToList() {
			this.parent.app.getWorking('router').navigate(this.parent.getModuleName());
		}
	}, {
		key: 'create',
		value: function create(item) {
			var _this3 = this;

			item['$' + this.parent.getOptions('views.create.action')]().then(function (result) {
				notCommon.log('form saved', result);
				_this3.parent.app.getWorking('router').navigate(_this3.parent.getModuleName());
			}).catch(function (result) {
				notCommon.error('form not saved', result);
			});
		}
	}]);
	return CRUDCreate;
}(notController);

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

var OP_DEFAULT_PAGE_SIZE = 50;
var OPT_DEFAULT_VIEW$1 = 'list';

var CRUDList = function (_notController) {
	inherits(CRUDList, _notController);

	function CRUDList(parent, params) {
		var _ret;

		classCallCheck(this, CRUDList);

		var _this = possibleConstructorReturn(this, (CRUDList.__proto__ || Object.getPrototypeOf(CRUDList)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD List');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.list.name') || OPT_DEFAULT_VIEW$1,
				common: _this.parent.getOptions('views.list.common') || true,
				targetQuery: parent.getOptions('views.list.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});
		_this.preloadLib(_this.parent.getOptions('views.list.preload')).then(_this.renderWrapper.bind(_this)).then(_this.updateDatatable.bind(_this)).then(_this.onAfterRender.bind(_this)).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDList, [{
		key: 'renderWrapper',
		value: function renderWrapper() {
			var _this2 = this;

			return this.render('default', {}, {
				title: this.parent.getOptions('names.plural'),
				showAddForm: function showAddForm() {
					_this2.parent.app.getWorking('router').navigate([_this2.parent.getModuleName(), 'create'].join('/'));
				},
				getLinkToView: function getLinkToView() {
					return '/' + _this2.parent.getModuleName();
				}
			});
		}
	}, {
		key: 'updateDatatable',
		value: function updateDatatable() {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				try {
					_this3.tableView = new notTable({
						options: {
							fields: _this3.parent.getOptions('views.list.fields'),
							targetEl: document.querySelector(_this3.parent.getOptions('views.list.targetQuery') || _this3.parent.getOptions('targetQuery')),
							helpers: notCommon.extend({
								title: _this3.parent.getOptions('names.plural')
							}, _this3.parent.getOptions('views.list.helpers') || {}),
							pageSize: _this3.app.getOptions('pager.size') || OP_DEFAULT_PAGE_SIZE,
							pageNumber: 0,
							onePager: true,
							liveLoad: true,
							interface: _this3.make[_this3.parent.getModuleName()]
						},
						events: [['afterRender', resolve]]
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'showNextPage',
		value: function showNextPage() {
			if (this.tableView) {
				this.tableView.loadNext();
			}
		}
	}]);
	return CRUDList;
}(notController);

var OPT_DEFAULT_LOAD_ACTION = 'getRaw';
var OPT_DEFAULT_ACTION = 'update';
var OPT_DEFAULT_VIEW$2 = 'edit';

var CRUDUpdate = function (_notController) {
	inherits(CRUDUpdate, _notController);

	function CRUDUpdate(parent, params) {
		var _ret;

		classCallCheck(this, CRUDUpdate);

		var _this = possibleConstructorReturn(this, (CRUDUpdate.__proto__ || Object.getPrototypeOf(CRUDUpdate)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Update');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.update.name') || OPT_DEFAULT_VIEW$2,
				common: _this.parent.getOptions('views.update.common') || true,
				targetQuery: _this.parent.getOptions('views.update.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});

		_this.preloadLib(_this.parent.getOptions('views.update.preload')).then(_this.loadItem.bind(_this)).then(_this.setData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderForm.bind(_this)).then(_this.onAfterRender.bind(_this)).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDUpdate, [{
		key: 'loadItem',
		value: function loadItem() {
			return this.make[this.parent.getModuleName()]({
				'_id': this.getOptions('params.0')
			})['$' + (this.parent.getOptions('views.update.loadAction') || OPT_DEFAULT_LOAD_ACTION)]();
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			return this.render('default', this.getData(), {});
		}
	}, {
		key: 'renderForm',
		value: function renderForm() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				try {
					_this2.form = new notForm({
						data: _this2.getData(),
						options: {
							action: _this2.parent.getOptions('views.update.action') || OPT_DEFAULT_ACTION,
							targetQuery: _this2.parent.getOptions('views.update.targetQuery') || _this2.parent.getOptions('targetQuery'),
							prefix: _this2.parent.getOptions('views.update.prefix') || _this2.parent.getOptions('prefix'),
							role: _this2.parent.getOptions('views.update.role') || _this2.parent.getOptions('role'),
							data: _this2.getData(),
							helpers: notCommon.extend({
								file: function file(params) {
									var files = params.e.target.files || params.e.dataTransfer.files;
									notCommon.log('file changed', files);
									if (params.helpers.field.name && files) {
										_this2.queeUpload(params.helpers.field.name, files);
									}
								},
								submit: function submit(params) {
									notCommon.log('submit form ', params.item);
									_this2.execUploads(params.item).then(_this2.update.bind(_this2));
								},
								libs: _this2.getOptions('libs'),
								afterSubmit: _this2.backToList.bind(_this2)
							}, _this2.parent.getOptions('views.update.helpers') || {})
						},
						events: [[['afterRestore', 'afterSubmit'], _this2.backToList.bind(_this2)], ['afterRender', resolve]]
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'update',
		value: function update(item) {
			var _this3 = this;

			item['$' + (this.parent.getOptions('views.update.action') || OPT_DEFAULT_ACTION)]().then(function (result) {
				notCommon.log('form saved', result);
				_this3.parent.app.getWorking('router').navigate(_this3.getModuleName());
				_this3.parent.runList();
			}).catch(function (result) {
				notCommon.error('form not saved', result);
			});
		}
	}, {
		key: 'backToList',
		value: function backToList() {
			this.parent.app.getWorking('router').navigate(this.parent.getModuleName());
		}
	}]);
	return CRUDUpdate;
}(notController);

var OPT_DEFAULT_ACTION$1 = 'delete';

var CRUDDelete = function (_notController) {
	inherits(CRUDDelete, _notController);

	function CRUDDelete(parent, params) {
		var _ret;

		classCallCheck(this, CRUDDelete);

		var _this = possibleConstructorReturn(this, (CRUDDelete.__proto__ || Object.getPrototypeOf(CRUDDelete)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Delete');
		_this.preloadLib(_this.parent.getOptions('views.delete.preload')).then(function () {
			if (confirm('Удалить запись?')) {
				_this.delete();
			} else {
				_this.backToList();
			}
		});

		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDDelete, [{
		key: 'backToList',
		value: function backToList() {
			this.parent.app.getWorking('router').navigate(this.parent.getModuleName());
		}
	}, {
		key: 'delete',
		value: function _delete() {
			var action = '$' + (this.parent.getOptions('views.delete.action') || OPT_DEFAULT_ACTION$1);
			this.make[this.parent.getModuleName()]({ '_id': this.getOptions('params.0') })[action]().then(this.backToList.bind(this)).catch(notCommon.report);
		}
	}]);
	return CRUDDelete;
}(notController);

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

var OPT_DEFAULT_LOAD_ACTION$1 = 'get';
var OPT_DEFAULT_VIEW$3 = 'details';

var CRUDDetails = function (_notController) {
	inherits(CRUDDetails, _notController);

	function CRUDDetails(parent, params) {
		var _ret;

		classCallCheck(this, CRUDDetails);

		var _this = possibleConstructorReturn(this, (CRUDDetails.__proto__ || Object.getPrototypeOf(CRUDDetails)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Details');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.details.name') || OPT_DEFAULT_VIEW$3,
				common: _this.parent.getOptions('views.details.common') || true,
				targetQuery: _this.parent.getOptions('views.details.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});

		_this.preloadLib(_this.parent.getOptions('views.details.preload')).then(_this.loadItem.bind(_this)).then(_this.setData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderDetails.bind(_this)).then(_this.onAfterRender.bind(_this)).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDDetails, [{
		key: 'loadItem',
		value: function loadItem() {
			return this.make[this.parent.getModuleName()]({
				'_id': this.getOptions('params.0')
			})['$' + (this.parent.getOptions('views.details.action') || OPT_DEFAULT_LOAD_ACTION$1)]();
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			var _this2 = this;

			var item = this.getData();
			var helpers = {
				ID: item ? item[this.parent.getModuleName() + 'ID'] : '',
				field: {
					array: false
				},
				update: function update(params) {
					_this2.app.getWorking('router').navigate([_this2.parent.getModuleName(), params.item._id, 'update'].join('/'));
				},
				delete: function _delete(params) {
					_this2.app.getWorking('router').navigate([_this2.parent.getModuleName(), params.item._id, 'delete'].join('/'));
				},
				getLinkToTable: function getLinkToTable() {
					return _this2.app.getWorking('router').getFullRoute(_this2.parent.getModuleName());
				},
				title: this.parent.getOptions('names.single')
			};
			return this.render('default', item, helpers);
		}
	}, {
		key: 'renderDetails',
		value: function renderDetails() {
			var _this3 = this;

			var item = this.getData();
			return new Promise(function (resolve, reject) {
				try {
					new notDetails({
						data: item,
						options: {
							targetQuery: _this3.parent.getOptions('views.details.targetQuery'),
							targetEl: document.querySelector(_this3.parent.getOptions('views.details.targetQuery') || _this3.parent.getOptions('targetQuery')),
							action: _this3.parent.getOptions('views.details.action') || OPT_DEFAULT_LOAD_ACTION$1,
							prefix: _this3.parent.getOptions('views.details.prefix') || _this3.parent.getOptions('prefix'),
							role: _this3.parent.getOptions('views.details.role') || _this3.parent.getOptions('role'),
							helpers: notCommon.extend({
								libs: _this3.getOptions('lib'),
								ID: item[_this3.parent.getModuleName() + 'ID'],
								__version: item.__version
							}, _this3.parent.getOptions('views.details.helpers') || {})
						},
						events: [['afterRender', resolve]]
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'backToList',
		value: function backToList() {
			this.app.getWorking('router').navigate(this.parent.getModuleName());
		}
	}]);
	return CRUDDetails;
}(notController);

var CRUDController = function (_notController) {
	inherits(CRUDController, _notController);

	function CRUDController(app, params) {
		var _ret;

		classCallCheck(this, CRUDController);

		notCommon.log('running CRUDController');

		var _this = possibleConstructorReturn(this, (CRUDController.__proto__ || Object.getPrototypeOf(CRUDController)).call(this, app));

		_this.setOptions('names', {
			plural: 'plural',
			single: 'single'
		});
		_this.setOptions('params', params);
		_this.setOptions('containerSelector', _this.app.getOptions('crud.containerSelector'));
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDController, [{
		key: 'route',
		value: function route() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			if (params.length == 1) {
				if (params[0] === 'create') {
					return this.runCreate(params);
				} else {
					return this.runDetails(params);
				}
			} else if (params.length == 2) {
				if (params[1] === 'delete') {
					return this.runDelete(params);
				} else if (params[1] === 'update') {
					return this.runUpdate(params);
				} else {
					var routeRunnerName = 'run' + notCommon.capitalizeFirstLetter(params[1]);
					if (this[routeRunnerName] && typeof this[routeRunnerName] === 'function') {
						return this[routeRunnerName](params);
					}
				}
			}
			return this.runList(params);
		}
	}, {
		key: 'runCreate',
		value: function runCreate() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDCreate(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runList',
		value: function runList() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDList(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runDetails',
		value: function runDetails() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDDetails(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runDelete',
		value: function runDelete() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDDelete(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runUpdate',
		value: function runUpdate() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDUpdate(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'onAfterRender',
		value: function onAfterRender() {
			this.trigger('afterRender');
		}
	}]);
	return CRUDController;
}(notController);

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
	user controllers
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
exports.CRUDController = CRUDController;
exports.CRUDCreate = CRUDCreate;
exports.CRUDDelete = CRUDDelete;
exports.CRUDDetails = CRUDDetails;
exports.CRUDList = CRUDList;
exports.CRUDUpdate = CRUDUpdate;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybS5qcyIsIi4uL3NyYy9DUlVEL0NyZWF0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFRhYmxlLmpzIiwiLi4vc3JjL0NSVUQvTGlzdC5qcyIsIi4uL3NyYy9DUlVEL1VwZGF0ZS5qcyIsIi4uL3NyYy9DUlVEL0RlbGV0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdERldGFpbHMuanMiLCIuLi9zcmMvQ1JVRC9EZXRhaWxzLmpzIiwiLi4vc3JjL0NSVUQvQ29udHJvbGxlci5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSkge1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvciAodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IgKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwdXRGaWxlKHVwbG9hZCAvKiBvYmplY3QoZmlsZSwgb25Qcm9ncmVzcywgdXJsKSovICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRpZiAoeGhyLnVwbG9hZCkge1xuXHRcdFx0XHQvLyBwcm9ncmVzcyBiYXJcblx0XHRcdFx0aWYgKHVwbG9hZC5vblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZC5vblByb2dyZXNzLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCAvKmUqLyApIHtcblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0Ly8gc3RhcnQgdXBsb2FkXG5cdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0XHR4aHIub3BlbignUFVUJywgdXBsb2FkLnVybCwgdHJ1ZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignWF9GSUxFTkFNRScsIGVuY29kZVVSSUNvbXBvbmVudCh1cGxvYWQuZmlsZS5uYW1lKSk7XG5cdFx0XHRcdHhoci5zZW5kKHVwbG9hZC5maWxlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRwdXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQVVQnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdGRlbGV0ZUpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ0RFTEVURScsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChwYXJzZUludChzdGF0dXMpID09PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9IChlKSA9PiByZWplY3QoZSk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRTZXNzaW9uSUQ6IGZ1bmN0aW9uKG5hbWUgPSAnU2Vzc2lvbklEJykge1xuXHRcdHJldHVybiB0aGlzLmdldENvb2tpZShuYW1lKTtcblx0fSxcblx0Z2V0Q29va2llOiAobmFtZSkgPT4ge1xuXHRcdGxldCB2YWx1ZSA9ICc7ICcgKyBkb2N1bWVudC5jb29raWUsXG5cdFx0XHRwYXJ0cyA9IHZhbHVlLnNwbGl0KCc7ICcgKyBuYW1lICsgJz0nKTtcblx0XHRpZiAocGFydHMubGVuZ3RoID09IDIpIHtcblx0XHRcdHJldHVybiBwYXJ0cy5wb3AoKS5zcGxpdCgnOycpLnNoaWZ0KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTmV0d29yaztcbiIsIi8vZGlydHkgaGFjayB0byByZW1vdmUgbm8tY29uc29sZSB3YXJuaW5nIG9mIGVzbGludFxuLyogZ2xvYmFsIG5vdEZyYW1ld29yayovXG5jb25zdCBMT0cgPSAnY29uc29sZSc7XG52YXIgQ29tbW9uTG9ncyA9IHtcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHRsb2c6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmxvZyguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRpZighbm90RnJhbWV3b3JrLm5vdENvbW1vbi5nZXQoJ3Byb2R1Y3Rpb24nKSl7XG5cdFx0XHR3aW5kb3dbTE9HXS5lcnJvciguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0dHJhY2U6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cblx0bW92ZUl0ZW0oYXJyYXksIG9sZF9pbmRleCwgbmV3X2luZGV4KSB7XG5cdFx0aWYgKG5ld19pbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcblx0XHRcdHZhciBrID0gbmV3X2luZGV4IC0gYXJyYXkubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKChrLS0pICsgMSkge1xuXHRcdFx0XHRhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFycmF5LnNwbGljZShuZXdfaW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRfaW5kZXgsIDEpWzBdKTtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aChzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHVuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHRoaXMuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIG51bGwpO1xuXHR9XG5cblx0cGFyc2VQYXRoU3RlcChzdGVwLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGxldCByU3RlcCA9IG51bGw7XG5cdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUykgPT09IDAgJiYgaGVscGVyKXtcblx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfSEVMUEVSUywgJycpO1xuXHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRpZihoZWxwZXIuaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF07XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID09PSAwICYmIGl0ZW0pe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwgJycpO1xuXHRcdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fVxuXG5cdC8vOjpmaWVsZE5hbWUucmVzdWx0XG5cdC8ve31cblx0Ly97ZmllbGROYW1lOiAndGFyZ2V0UmVjb3JkRmllbGQnfVxuXHQvLy8vWyd0YXJnZXRSZWNvcmRGaWVsZCcsICdyZXN1bHQnXVxuXHRwYXJzZVBhdGgocGF0aCwgaXRlbSwgaGVscGVyKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cGF0aCA9IHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdHBhdGhbaV0gPSB0aGlzLnBhcnNlUGF0aFN0ZXAocGF0aFtpXSwgaXRlbSwgaGVscGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRub3JtaWxpemVQYXRoKHBhdGgpe1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH1lbHNle1xuXHRcdFx0d2hpbGUocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA+IC0xKXtcblx0XHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwnJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdHNtYWxsID0gW1widG9kb1wiXSxcblx0XHRiaWcgPSBbXCJ0b2RvXCIsIFwibGVuZ3RoXCJdXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0Ki9cblxuXHRpZkZ1bGxTdWJQYXRoKGJpZywgc21hbGwpe1xuXHRcdGlmIChiaWcubGVuZ3RoPHNtYWxsLmxlbmd0aCl7cmV0dXJuIGZhbHNlO31cblx0XHRmb3IobGV0IHQgPTA7IHQgPCBzbWFsbC5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZihzbWFsbFt0XSAhPT0gYmlnW3RdKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpLFxuXHRcdFx0aXNGdW5jdGlvbiA9IGF0dHJOYW1lLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKT4tMTtcblx0XHRpZiAoaXNGdW5jdGlvbil7XG5cdFx0XHRhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0fVxuXHRcdGlmICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIHR5cGVvZiBvYmplY3RbYXR0ck5hbWVdICE9PSAndW5kZWZpbmVkJyAmJiBvYmplY3RbYXR0ck5hbWVdICE9PSBudWxsKXtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uP29iamVjdFthdHRyTmFtZV0oe2l0ZW0sIGhlbHBlcnN9KTpvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChuZXdPYmosIGF0dHJQYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gbmV3T2JqO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7b2JqZWN0W2F0dHJOYW1lXSA9IHt9O31cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGpvaW4oKXtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX01FVEhPRF9JTklUID0gU3ltYm9sKCdpbml0JyksXG5cdE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0dGhpc1tNRVRBX0VWRU5UU10gPSB7fTtcblx0XHR0aGlzW01FVEFfREFUQV0gPSB7fTtcblx0XHR0aGlzW01FVEFfV09SS0lOR10gPSB7fTtcblx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSB7fTtcblx0XHR0aGlzW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdFtNRVRBX01FVEhPRF9JTklUXShpbnB1dCl7XG5cdFx0aWYgKCFpbnB1dCl7XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH1cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykpe1xuXHRcdFx0Zm9yKGxldCB0IG9mIGlucHV0LmV2ZW50cyl7XG5cdFx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSl7XG5cdFx0XHR0aGlzLnNldERhdGEoaW5wdXQuZGF0YSk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ3dvcmtpbmcnKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoaW5wdXQud29ya2luZyk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoaW5wdXQub3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiAqL1xuXHRcdFx0XHR3aGF0ID0gYXJnc1swXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiBlbGVtZW50ICovXG5cdFx0XHRcdG5vdFBhdGguc2V0KGFyZ3NbMF0gLyogcGF0aCAqLyAsIHdoYXQgLyogY29sbGVjdGlvbiAqLyAsIHVuZGVmaW5lZCAvKiBoZWxwZXJzICovICwgYXJnc1sxXSAvKiB2YWx1ZSAqLyApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Z2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggKi9cblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdH1cblx0XHRcdFx0LyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoIHdpdGggZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdGNhc2UgMjpcblx0XHRcdHtcblx0XHRcdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0XHRpZiAocmVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHQvKiBubyBkYXRhLCByZXR1cm4gZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdFx0XHRcdHJldHVybiBhcmdzWzFdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8qIGRhdGEsIHJldHVybiBpdCAqL1xuXHRcdFx0XHRcdHJldHVybiByZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8qIHJldHVybiBmdWxsIGNvbGxlY3Rpb24gKi9cblx0XHRkZWZhdWx0OlxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gd2hhdDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdENPUkUgT0JKRUNUXG5cdFx0XHREQVRBIC0gaW5mb3JtYXRpb25cblx0XHRcdE9QVElPTlMgLSBob3cgdG8gd29ya1xuXHRcdFx0V09SS0lORyAtIHRlbXBvcmFyaWx5IGdlbmVyYXRlZCBpbiBwcm9jY2Vzc1xuXHQqL1xuXG5cdHNldERhdGEoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9EQVRBXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXREYXRhKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXREYXRhKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfREFUQV0sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRPcHRpb25zKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0T3B0aW9ucygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9PUFRJT05TXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFdvcmtpbmcoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRXb3JraW5nKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0V29ya2luZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1dPUktJTkddLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Lypcblx0XHRFVkVOVFMgaGFuZGxpbmdcblx0Ki9cblxuXHRvbihldmVudE5hbWVzLCBldmVudENhbGxiYWNrcywgb25jZSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRub3RDb21tb24uZGVmaW5lSWZOb3RFeGlzdHModGhpc1tNRVRBX0VWRU5UU10sIG5hbWUsIFtdKTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnB1c2goe1xuXHRcdFx0XHRjYWxsYmFja3M6IGV2ZW50Q2FsbGJhY2tzLFxuXHRcdFx0XHRvbmNlOiBvbmNlLFxuXHRcdFx0XHRjb3VudDogMFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR0cmlnZ2VyKCkge1xuXHRcdGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLFxuXHRcdFx0ZXZlbnROYW1lID0gYXJncy5zaGlmdCgpO1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWUpKSB7XG5cdFx0XHRldmVudE5hbWUgPSBbZXZlbnROYW1lXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0VWRU5UU10uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaChldmVudCA9PiB7XG5cdFx0XHRcdFx0aWYgKGV2ZW50Lm9uY2UpIHtcblx0XHRcdFx0XHRcdHRoaXMub2ZmKG5hbWUsIGV2ZW50LmNhbGxiYWNrcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LmNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmYoZXZlbnROYW1lcyAvKiBhcnJheSBvZiBldmVudCBuYW1lcyAqLyAsIGV2ZW50Q2FsbGJhY2tzIC8qIGFycmF5IG9mIGNhbGxiYWNrcyAqLyApIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRsZXQgdGFyZ2V0SWQgPSAtMTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmZvckVhY2goKGV2ZW50LCBpKSA9PiB7XG5cdFx0XHRcdGlmIChpID09PSAtMSAmJiBldmVudENhbGxiYWNrcyA9PT0gZXZlbnQuY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0dGFyZ2V0SWQgPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmICh0YXJnZXRJZCA+IC0xKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnNwbGljZSh0YXJnZXRJZCwgMSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmZBbGwoKXtcblx0XHRsZXQgZXZlbnRzID0gT2JqZWN0LmtleXModGhpc1tNRVRBX0VWRU5UU10pO1xuXHRcdGZvcihsZXQgdCA9MDsgdDwgZXZlbnRzLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHRoaXNbTUVUQV9FVkVOVFNdLmhhc093blByb3BlcnR5KGV2ZW50c1t0XSkpe1xuXHRcdFx0XHRkZWxldGUgdGhpc1tNRVRBX0VWRU5UU11bZXZlbnRzW3RdXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5jb25zdCBPUFRfTU9ERV9ISVNUT1JZID0gU3ltYm9sKCdoaXN0b3J5JyksXG5cdE9QVF9NT0RFX0hBU0ggPSBTeW1ib2woJ2hhc2gnKSxcblx0T1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwgPSA1MDtcblxuY2xhc3Mgbm90Um91dGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJvdXRlczogW10sXG5cdFx0XHRtb2RlOiBPUFRfTU9ERV9ISVNUT1JZLFxuXHRcdFx0cm9vdDogJy8nLCAvL2Fsd2F5cyBpbiBzbGFzaGVzIC91c2VyLywgLywgL2lucHV0Ly4gYW5kIG5vIC91c2VyIG9yIGlucHV0L2xldmVsXG5cdFx0XHRpbml0aWFsaXplZDogZmFsc2Vcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpc3RvcnkoKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9ISVNUT1JZKTtcblx0fVxuXG5cdGhhc2goKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9IQVNIKTtcblx0fVxuXG5cdHNldFJvb3Qocm9vdCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb290Jywgcm9vdCA/ICcvJyArIHRoaXMuY2xlYXJTbGFzaGVzKHJvb3QpICsgJy8nIDogJy8nKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNsZWFyU2xhc2hlcyhwYXRoKSB7XG5cdFx0Ly9maXJzdCBhbmQgbGFzdCBzbGFzaGVzIHJlbW92YWxcblx0XHRyZXR1cm4gcGF0aC50b1N0cmluZygpLnJlcGxhY2UoL1xcLyQvLCAnJykucmVwbGFjZSgvXlxcLy8sICcnKTtcblx0fVxuXG5cdGFkZChyZSwgaGFuZGxlcikge1xuXHRcdGlmICh0eXBlb2YgcmUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aGFuZGxlciA9IHJlO1xuXHRcdFx0cmUgPSAnJztcblx0XHR9XG5cdFx0bGV0IHJ1bGUgPSB7XG5cdFx0XHRyZTogcmUsXG5cdFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0fTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLnB1c2gocnVsZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRMaXN0KGxpc3QpIHtcblx0XHRmb3IgKGxldCB0IGluIGxpc3QpIHtcblx0XHRcdHRoaXMuYWRkKHQsIGxpc3RbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbW92ZShwYXJhbSkge1xuXHRcdGZvciAodmFyIGkgPSAwLCByOyBpIDwgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5sZW5ndGgsIHIgPSB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldOyBpKyspIHtcblx0XHRcdGlmIChyLmhhbmRsZXIgPT09IHBhcmFtIHx8IHIucmUgPT09IHBhcmFtKSB7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRmbHVzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLydcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGlzSW5pdGlhbGl6ZWQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbml0aWFsaXplZCcpO1xuXHR9XG5cblx0c2V0SW5pdGlhbGl6ZWQodmFsID0gdHJ1ZSl7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnaW5pdGlhbGl6ZWQnLCB2YWwpO1xuXHR9XG5cblx0Z2V0RnJhZ21lbnQoKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gJyc7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnbW9kZScpID09PSBPUFRfTU9ERV9ISVNUT1JZKSB7XG5cdFx0XHRpZiAoIWxvY2F0aW9uKSByZXR1cm4gJyc7XG5cdFx0XHRmcmFnbWVudCA9IHRoaXMuY2xlYXJTbGFzaGVzKGRlY29kZVVSSShsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCkpO1xuXHRcdFx0ZnJhZ21lbnQgPSBmcmFnbWVudC5yZXBsYWNlKC9cXD8oLiopJC8sICcnKTtcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgIT0gJy8nID8gZnJhZ21lbnQucmVwbGFjZSh0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSwgJycpIDogZnJhZ21lbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICghd2luZG93KSByZXR1cm4gJyc7XG5cdFx0XHR2YXIgbWF0Y2ggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRmcmFnbWVudCA9IG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY2xlYXJTbGFzaGVzKGZyYWdtZW50KTtcblx0fVxuXG5cdGNoZWNrTG9jYXRpb24oKXtcblx0XHRsZXQgY3VycmVudCA9dGhpcy5nZXRXb3JraW5nKCdjdXJyZW50JyksXG5cdFx0XHRmcmFnbWVudCA9dGhpcy5nZXRGcmFnbWVudCgpLFxuXHRcdFx0aW5pdCA9IHRoaXMuaXNJbml0aWFsaXplZCgpO1xuXHRcdGlmIChjdXJyZW50ICE9PWZyYWdtZW50ICB8fCAhaW5pdCkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JyxmcmFnbWVudCk7XG5cdFx0XHR0aGlzLmNoZWNrKGZyYWdtZW50KTtcblx0XHRcdHRoaXMuc2V0SW5pdGlhbGl6ZWQoKTtcblx0XHR9XG5cdH1cblxuXHRocmVmQ2xpY2soKXtcblx0XHQvL2NvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRnZXRSb290KCl7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0bGlzdGVuKGxvb3BJbnRlcnZhbCA9IE9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JywgJ25vdEluaXRpYWxpemVkJyk7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmdldFdvcmtpbmcoJ2ludGVydmFsJykpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJ2YWwnLCBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrTG9jYXRpb24uYmluZCh0aGlzKSwgbG9vcEludGVydmFsKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5ocmVmQ2xpY2suYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjaGVjayhmKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gZiB8fCB0aGlzLmdldEZyYWdtZW50KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGF0aCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5yZTtcblx0XHRcdGxldCBmdWxsUkUgPSAgdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKHBhdGgpKTtcblx0XHRcdHZhciBtYXRjaCA9IGZyYWdtZW50Lm1hdGNoKGZ1bGxSRSk7XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0bWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5oYW5kbGVyLmFwcGx5KHRoaXMuaG9zdCB8fCB7fSwgbWF0Y2gpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRuYXZpZ2F0ZShwYXRoKSB7XG5cdFx0cGF0aCA9IHBhdGggPyBwYXRoIDogJyc7XG5cdFx0c3dpdGNoICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSl7XG5cdFx0XHRjYXNlIE9QVF9NT0RFX0hJU1RPUlk6IHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygncHVzaCBzdGF0ZScsIHRoaXMuZ2V0RnVsbFJvdXRlKHBhdGgpKTtcblx0XHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgT1BUX01PREVfSEFTSDoge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyguKikkLywgJycpICsgJyMnICsgcGF0aDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RnVsbFJvdXRlKHBhdGggPSAnJyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5jbGVhclNsYXNoZXMocGF0aCk7XG5cdH1cblxuXHRnZXRBbGxMaW5rcygpe1xuXHRcdHZhciBhbGxFbGVtZW50cyA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZignbi1ocmVmJykgPT09IDApIHtcblx0XHRcdFx0XHRsaXN0LnB1c2goYWxsRWxlbWVudHNbal0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0cmVSb3V0ZUV4aXN0ZWQoKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0QWxsTGlua3MoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgbGlzdC5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmluaXRSZXJvdXRpbmcobGlzdFt0XSwgbGlzdFt0XS5nZXRBdHRyaWJ1dGUoJ24taHJlZicpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVyb3V0aW5nKGVsLCBsaW5rKXtcblx0XHRpZiAoIWVsLm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdGxldCBmdWxsTGluayA9IHRoaXMuZ2V0RnVsbFJvdXRlKGxpbmspO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdocmVmJywgZnVsbExpbmspO1xuXHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9Pntcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLm5hdmlnYXRlKGxpbmspO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdGVsLm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90Um91dGVyKCk7XG4iLCJsZXQgbm90QVBJT3B0aW9ucyA9IHtcblx0cnBzOiA1MCxcblx0cHJvdG9jb2w6ICdodHRwJyxcblx0aG9zdDogJ2xvY2FsaG9zdCcsXG5cdHBvcnQ6IDkwMDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSU9wdGlvbnM7XG4iLCJjbGFzcyBub3RBUElRdWVle1xuXHRjb25zdHJ1Y3RvciAocmVxdWVzdHNQZXJTZWNvbmQpIHtcblx0XHR0aGlzLnF1ZWUgPSBbXTtcblx0XHR0aGlzLmludCA9IG51bGw7XG5cdFx0dGhpcy5yZXF1ZXN0c1BlclNlY29uZCA9IHJlcXVlc3RzUGVyU2Vjb25kIHx8IDU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW4oKXtcblx0XHR0aGlzLmludCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLmNoZWNrLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLnJlcXVlc3RzUGVyU2Vjb25kKTtcblx0fVxuXG5cdGNoZWNrKCl7XG5cdFx0aWYgKHRoaXMuaW5Qcm9ncmVzcyl7cmV0dXJuO31cblx0XHRlbHNle1xuXHRcdFx0aWYgKHRoaXMucXVlZS5sZW5ndGggPiAwKXtcblx0XHRcdFx0dGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHRvQ2FsbCA9IHRoaXMucXVlZS5zaGlmdCgpO1xuXHRcdFx0XHR0b0NhbGwoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRuZXh0KCl7XG5cdFx0dGhpcy5pblByb2dyZXNzID0gZmFsc2U7XG5cdH1cblxuXHRhZGQoY2FsbCl7XG5cdFx0dGhpcy5xdWVlLnB1c2goY2FsbCk7XG5cdH1cblxuXHRwYXVzZSgpe1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50KTtcblx0fVxuXG5cdHJlc3VtZSgpe1xuXHRcdHRoaXMucnVuKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJUXVlZTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UuanMnO1xuXG5pbXBvcnQgbm90QVBJT3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuaW1wb3J0IG5vdEFQSVF1ZWUgZnJvbSAnLi9xdWVlLmpzJztcblxuXG5jbGFzcyBub3RBUEkgZXh0ZW5kcyAgbm90QmFzZXtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdENvbW1vbi5leHRlbmQobm90QVBJT3B0aW9ucywgb3B0aW9ucykpO1xuXHRcdHRoaXMucXVlZSA9IG5ldyBub3RBUElRdWVlKHRoaXMuZ2V0T3B0aW9ucygncnBzJykpO1xuXHRcdHRoaXMucXVlZS5ydW4oKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG1ha2VVcmwocGFydHMpIHtcblx0XHRyZXR1cm4gcGFydHMuam9pbignLycpO1xuXHR9XG5cblx0cXVlZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgbWV0aG9kLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdG1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKSB7XG5cdFx0bm90Q29tbW9uLnJlcXVlc3RKU09OKG1ldGhvZCwgdXJsLCBkYXRhKVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3Bvc3QnLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXQob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdnZXQnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZWxldGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdkZWxldGUnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUEk7XG4iLCJpbXBvcnQgbm90QmFzZSAgZnJvbSAnLi4vbm90QmFzZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbWFnZSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuIiwiY29uc3QgUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYID0gJ24tJyxcblx0VEVNUExBVEVfVEFHID0gJ250Jyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SID0gJy0nLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCA9ICdpZicsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVggPSAnbm90X2NvbXBvbmVudF8nLFxuXHRQQVJUX0lEX1BSRUZJWCA9ICdub3RfcGFydF8nLFxuXHRERUZBVUxUX1BMQUNFUiA9ICdwbGFjZScsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1AgPSAncGxhY2VBZnRlcic7XG5cbmNvbnN0IE9QVFMgPSB7XG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCxcblx0VEVNUExBVEVfVEFHLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLFxuXHRERUZBVUxUX1BMQUNFUixcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCxcblx0UEFSVF9JRF9QUkVGSVgsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1Bcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9QVFM7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5jb25zdCBNRVRBX0NBQ0hFID0gU3ltYm9sKCdjYWNoZScpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZUNhY2hlIGV4dGVuZHMgbm90QmFzZXtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DQUNIRV0gPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0dGhpcy5oaWRlVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5yZWdpc3RlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlkZVRlbXBsYXRlcygpe1xuXHRcdGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHR0LmlubmVySFRNTCA9IE9QVFMuVEVNUExBVEVfVEFHICsgJ3tkaXNwbGF5OiBub25lO30nO1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodCk7XG5cdH1cblxuXHRyZWdpc3RlcigpIHtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ3RlbXBsYXRlQ2FjaGUnLCB0aGlzKTtcblx0fVxuXG5cdGxvYWQobWFwKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdGZvciAodmFyIGkgaW4gbWFwKSB7XG5cdFx0XHR0aGlzLmxvYWRPbmUoaSwgbWFwW2ldKTtcblx0XHR9XG5cdH1cblxuXHRsb2FkT25lKGtleSwgdXJsLCBjYWxsYmFjaykge1xuXHRcdHZhciBvUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdG9SZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XG5cdFx0b1JlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZU5hbWUgPSBrZXk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZVVSTCA9IHVybDtcblx0XHRcdGRpdi5pbm5lckhUTUwgPSByZXNwb25zZS5zcmNFbGVtZW50LnJlc3BvbnNlVGV4dDtcblx0XHRcdHRoaXMuc2V0T25lKGtleSwgZGl2KTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKGtleSwgdXJsLCBkaXYpO1xuXG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRvUmVxdWVzdC5zZW5kKCk7XG5cdH1cblxuXHRpZkFsbExvYWRlZCgpe1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMudHJpZ2dlcignbG9hZGVkJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0T25lKGtleSwgZWxlbWVudCkge1xuXHRcdHRoaXNbTUVUQV9DQUNIRV1ba2V5XSA9IGVsZW1lbnQ7XG5cdH1cblxuXHRnZXQoa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9DQUNIRV0uaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXNbTUVUQV9DQUNIRV1ba2V5XS5jbG9uZU5vZGUodHJ1ZSkgOiBudWxsO1xuXHR9XG5cblx0Z2V0TmFtZXMoKXtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpc1tNRVRBX0NBQ0hFXSk7XG5cdH1cblxuXHRnZXRCeVVSTCh1cmwpIHtcblx0XHRmb3IgKHZhciBpIGluIHRoaXNbTUVUQV9DQUNIRV0pIHtcblx0XHRcdGlmICh0aGlzW01FVEFfQ0FDSEVdW2ldLnNyYyA9PSB1cmwpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0KGkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvL1x0TmV3IEFQSVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldExvYWRlZChrZXkpe1xuXHRcdGxldCB0ID0gdGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuaW5kZXhPZihrZXkpO1xuXHRcdGlmICh0ID4gLTEpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnNwbGljZSh0LCAxKTtcblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkZWQnKS5wdXNoKCdrZXknKTtcblx0fVxuXG5cdHdyYXAoa2V5LCB1cmwsIGlubmVySFRNTCl7XG5cdFx0dmFyIGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHRjb250Lm5hbWUgPSBrZXk7XG5cdFx0Y29udC5zcmMgPSB1cmw7XG5cdFx0Y29udC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG5cdFx0cmV0dXJuIGNvbnQ7XG5cdH1cblxuXHRwYXJzZUxpYih0ZXh0KXtcblx0XHRsZXQgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGxldCByZXN1bHQgPSB7fTtcblx0XHRjb250LmlubmVySFRNTCA9IHRleHQ7XG5cdFx0bGV0IG5vdFRlbXBsYXRlc0VsZW1lbnRzID0gY29udC5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHRmb3IobGV0IGVsSWQgPTA7IGVsSWQ8IG5vdFRlbXBsYXRlc0VsZW1lbnRzLmxlbmd0aDsgZWxJZCsrKXtcblx0XHRcdGxldCBlbCA9IG5vdFRlbXBsYXRlc0VsZW1lbnRzW2VsSWRdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUgPT09IGNvbnQpe1xuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRcdFx0cmVzdWx0W2VsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZV0gPSBlbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0YWRkTGliKGxpYil7XG5cdFx0Zm9yKGxldCB0IGluIGxpYil7XG5cdFx0XHR0aGlzLnNldE9uZSh0LCBsaWJbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21VUkwoa2V5LCB1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG5cdFx0XHRpZiAodGhpcy5nZXQoa2V5KSl7XG5cdFx0XHRcdHJlc29sdmUodGhpcy5nZXQoa2V5KSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly90aGF0LnNldExvYWRpbmcoa2V5LCB1cmwpO1xuXHRcdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpXG5cdFx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlSW5uZXJIVE1MKT0+e1xuXHRcdFx0XHRcdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhpcy53cmFwKGtleSwgdXJsLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0XHRcdFx0XHR0aGlzLnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRcdFx0XHRcdHJlc29sdmUodGhpcy5nZXQoa2V5KSk7XG5cdFx0XHRcdFx0fSkuY2F0Y2goKCk9Pntcblx0XHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZScsIGtleSwgdXJsKTtcblx0XHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YWRkTGliRnJvbVVSTCh1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHQudGhlbigodGVtcGxhdGVzSFRNTCk9Pntcblx0XHRcdFx0XHRsZXQgdGVtcGxhdGVzID0gdGhpcy5wYXJzZUxpYih0ZW1wbGF0ZXNIVE1MKTtcblx0XHRcdFx0XHR0aGlzLmFkZExpYih0ZW1wbGF0ZXMpO1xuXHRcdFx0XHRcdHJlc29sdmUodGVtcGxhdGVzKTtcblx0XHRcdFx0fSkuY2F0Y2goKGUpPT57XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdlcnJvciBsb2FkaW5nIHRlbXBsYXRlcyBsaWInLCB1cmwsZSk7XG5cdFx0XHRcdFx0cmVqZWN0KC4uLmFyZ3VtZW50cyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0YWRkRnJvbURvY3VtZW50KHNlbGVjdG9yT3JFbGVtZW50KXtcblx0XHRsZXQgZWwgPSAodHlwZW9mIHNlbGVjdG9yT3JFbGVtZW50ID09PSAnc3RyaW5nJyk/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yRWxlbWVudCk6c2VsZWN0b3JPckVsZW1lbnQ7XG5cdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0aWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gT1BUUy5URU1QTEFURV9UQUcudG9Mb3dlckNhc2UoKSl7XG5cdFx0XHRcdHRoaXMuc2V0T25lKGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSwgZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21UZXh0KGtleSwgdGVtcGxhdGVJbm5lckhUTUwpe1xuXHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksICcnLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlQ2FjaGUoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQuanMnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZID0gWydfaWQnLCAnaWQnLCAnSUQnXSxcblx0REVGQVVMVF9GSUxURVIgPSB7fSxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEludGVyZmFjZSBleHRlbmRzIG5vdEJhc2Uge1xuXG5cdGNvbnN0cnVjdG9yKG1hbmlmZXN0KSB7XG5cdFx0c3VwZXIoe30pO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHBhcnNlTGluZShsaW5lLCByZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgcmVjb3JkUkUgPSAnOnJlY29yZFsnLFxuXHRcdFx0ZmllbGROYW1lID0gJyc7XG5cdFx0d2hpbGUgKGxpbmUuaW5kZXhPZihyZWNvcmRSRSkgPiAtMSkge1xuXHRcdFx0dmFyIGluZCA9IGxpbmUuaW5kZXhPZihyZWNvcmRSRSk7XG5cdFx0XHR2YXIgbGVuID0gcmVjb3JkUkUubGVuZ3RoO1xuXHRcdFx0dmFyIGluZDIgPSBsaW5lLmluZGV4T2YoJ10nKTtcblx0XHRcdHZhciBzdGFydFNsaWNlID0gaW5kICsgbGVuO1xuXHRcdFx0dmFyIGVuZFNsaWNlID0gaW5kMjtcblx0XHRcdGZpZWxkTmFtZSA9IGxpbmUuc2xpY2Uoc3RhcnRTbGljZSwgZW5kU2xpY2UpO1xuXHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAnJykgYnJlYWs7XG5cdFx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6cmVjb3JkWycgKyBmaWVsZE5hbWUgKyAnXScsIHJlY29yZC5nZXRBdHRyKGZpZWxkTmFtZSkpO1xuXHRcdH1cblx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6bW9kZWxOYW1lJywgdGhpcy5tYW5pZmVzdC5tb2RlbCk7XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOmFjdGlvbk5hbWUnLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgbGluZSA9IHRoaXMucGFyc2VMaW5lKHRoaXMubWFuaWZlc3QudXJsLCByZWNvcmQsIGFjdGlvbk5hbWUpICsgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdwb3N0Rml4JykpID8gdGhpcy5wYXJzZUxpbmUoYWN0aW9uRGF0YS5wb3N0Rml4LCByZWNvcmQsIGFjdGlvbk5hbWUpIDogJycpO1xuXHRcdHJldHVybiBsaW5lO1xuXHR9XG5cblx0Z2V0SUQocmVjb3JkLCBhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlc3VsdElkLFxuXHRcdFx0bGlzdCA9IE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFksXG5cdFx0XHRwcmVmaXhlcyA9IFsnJywgdGhpcy5tYW5pZmVzdC5tb2RlbF07XG5cdFx0aWYgKGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2luZGV4JykgJiYgYWN0aW9uRGF0YS5pbmRleCkge1xuXHRcdFx0bGlzdCA9IFthY3Rpb25EYXRhLmluZGV4XS5jb25jYXQoT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHByZSBvZiBwcmVmaXhlcykge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiBsaXN0KSB7XG5cdFx0XHRcdGlmIChyZWNvcmQuaGFzT3duUHJvcGVydHkocHJlICsgdCkpIHtcblx0XHRcdFx0XHRyZXN1bHRJZCA9IHJlY29yZFtwcmUgKyB0XTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0SWQ7XG5cdH1cblxuXHRnZXRBY3Rpb25zQ291bnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpID8gT2JqZWN0LmtleXModGhpcy5nZXRBY3Rpb25zKCkpLmxlbmd0aCA6IDA7XG5cdH1cblxuXHRnZXRBY3Rpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLm1hbmlmZXN0ICYmIHRoaXMubWFuaWZlc3QuYWN0aW9ucyA/IHRoaXMubWFuaWZlc3QuYWN0aW9ucyA6IHt9O1xuXHR9XG5cblx0c2V0RmluZEJ5KGtleSwgdmFsdWUpIHtcblx0XHR2YXIgb2JqID0ge307XG5cdFx0b2JqW2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIob2JqKTtcblx0fVxuXG5cdHNldEZpbHRlcihmaWx0ZXJEYXRhID0gREVGQVVMVF9GSUxURVIpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdmaWx0ZXInLCBmaWx0ZXJEYXRhKTtcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnNldEZpbHRlcih7fSk7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyJyk7XG5cdH1cblxuXHRzZXRTb3J0ZXIoc29ydGVyRGF0YSkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3NvcnRlcicsIHNvcnRlckRhdGEpO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3NvcnRlcicpO1xuXHR9XG5cblx0c2V0UGFnZU51bWJlcihwYWdlTnVtYmVyKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHR9XG5cblx0c2V0UGFnZVNpemUocGFnZVNpemUpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdwYWdlU2l6ZScsIHBhZ2VTaXplKTtcblx0fVxuXG5cdHNldFBhZ2VyKHBhZ2VTaXplID0gREVGQVVMVF9QQUdFX1NJWkUsIHBhZ2VOdW1iZXIgPSBERUZBVUxUX1BBR0VfTlVNQkVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSkuc2V0V29ya2luZygncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRQYWdlcigpO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHBhZ2VTaXplOiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VTaXplJyksXG5cdFx0XHRwYWdlTnVtYmVyOiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VOdW1iZXInKVxuXHRcdH07XG5cdH1cblxuXHRnZXRNb2RlbE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMgJiYgdGhpcy5tYW5pZmVzdCA/IHRoaXMubWFuaWZlc3QubW9kZWwgOiBudWxsO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpICYmIHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdID8gdGhpcy5nZXRBY3Rpb25zKClbYWN0aW9uTmFtZV0gOiBudWxsO1xuXHR9XG5cblx0Y29sbGVjdFJlcXVlc3REYXRhKGFjdGlvbkRhdGEpIHtcblx0XHRsZXQgcmVxdWVzdERhdGEgPSB7fTtcblx0XHRpZiAoKGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkgJiYgQXJyYXkuaXNBcnJheShhY3Rpb25EYXRhLmRhdGEpKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFjdGlvbkRhdGEuZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgZGF0YVByb3ZpZGVyTmFtZSA9ICdnZXQnICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihhY3Rpb25EYXRhLmRhdGFbaV0pO1xuXHRcdFx0XHRpZiAodGhpc1tkYXRhUHJvdmlkZXJOYW1lXSAmJiB0eXBlb2YgdGhpc1tkYXRhUHJvdmlkZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdHJlcXVlc3REYXRhID0gbm90Q29tbW9uLmV4dGVuZChyZXF1ZXN0RGF0YSwgdGhpc1tkYXRhUHJvdmlkZXJOYW1lXSgpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVxdWVzdERhdGE7XG5cdH1cblxuXHRlbmNvZGVSZXF1ZXN0KGRhdGEpe1xuXHRcdGxldCBwID0gJz8nO1xuXHRcdGZvcihsZXQgdCBpbiBkYXRhKXtcblx0XHRcdHAgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHQpKyc9JytlbmNvZGVVUklDb21wb25lbnQoZGF0YVt0XSkrJyYnO1xuXHRcdH1cblx0XHRyZXR1cm4gcDtcblx0fVxuXG5cdC8vcmV0dXJuIFByb21pc2Vcblx0cmVxdWVzdChyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdHJlcXVlc3RQYXJhbXMgPSB0aGlzLmNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSxcblx0XHRcdHJlcXVlc3RQYXJhbXNFbmNvZGVkID0gdGhpcy5lbmNvZGVSZXF1ZXN0KHJlcXVlc3RQYXJhbXMpLFxuXHRcdFx0aWQgPSB0aGlzLmdldElEKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSksXG5cdFx0XHR1cmwgPSB0aGlzLmdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpO1xuXHRcdHJldHVybiBub3RDb21tb24uZ2V0QVBJKCkucXVlZVJlcXVlc3QoYWN0aW9uRGF0YS5tZXRob2QsIHVybCArIHJlcXVlc3RQYXJhbXNFbmNvZGVkLCBpZCwgSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSkpXG5cdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hZnRlclN1Y2Nlc3NSZXF1ZXN0KGRhdGEsIGFjdGlvbkRhdGEpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRhZnRlclN1Y2Nlc3NSZXF1ZXN0KGRhdGEsIGFjdGlvbkRhdGEpIHtcblx0XHRpZiAodGhpcyAmJiBhY3Rpb25EYXRhICYmIGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiBhY3Rpb25EYXRhLmlzQXJyYXkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgZGF0YS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7XG5cbmNvbnN0IE1FVEFfSU5URVJGQUNFID0gU3ltYm9sKCdpbnRlcmZhY2UnKSxcblx0TUVUQV9QUk9YWSA9IFN5bWJvbCgncHJveHknKSxcblx0TUVUQV9DSEFOR0UgPSBTeW1ib2woJ2NoYW5nZScpLFxuXHRNRVRBX0NIQU5HRV9ORVNURUQgPSBTeW1ib2woJ2NoYW5nZS5uZXN0ZWQnKSxcblx0TUVUQV9TQUwgPSBbXG5cdFx0J2dldEF0dHInLFxuXHRcdCdnZXRBdHRycycsXG5cdFx0J2lzUHJvcGVydHknLFxuXHRcdCdpc1JlY29yZCcsXG5cdFx0J2dldE1hbmlmZXN0Jyxcblx0XHQnc2V0QXR0cicsXG5cdFx0J3NldEF0dHJzJyxcblx0XHQnZ2V0RGF0YScsXG5cdFx0J3NldERhdGEnLFxuXHRcdCdnZXRKU09OJyxcblx0XHQnb24nLFxuXHRcdCdvZmYnLFxuXHRcdCd0cmlnZ2VyJ1xuXHRdLFxuXHRNRVRBX01BUF9UT19JTlRFUkZBQ0UgPSBbXG5cdFx0J2dldEFjdGlvbnNDb3VudCcsXG5cdFx0J2dldEFjdGlvbnMnLFxuXHRcdCdzZXRGaW5kQnknLFxuXHRcdCdyZXNldEZpbHRlcicsXG5cdFx0J3NldEZpbHRlcicsXG5cdFx0J2dldEZpbHRlcicsXG5cdFx0J3NldFNvcnRlcicsXG5cdFx0J2dldFNvcnRlcicsXG5cdFx0J3Jlc2V0U29ydGVyJyxcblx0XHQnc2V0UGFnZU51bWJlcicsXG5cdFx0J3NldFBhZ2VTaXplJyxcblx0XHQnc2V0UGFnZXInLFxuXHRcdCdyZXNldFBhZ2VyJyxcblx0XHQnZ2V0UGFnZXInXG5cdF0sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0TUVUQV9SRVRVUk5fVE9fUk9PVCA9IFN5bWJvbCgncmV0dXJuVG9Sb290Jyk7XG5cbnZhciBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0eXBlb2YgdGFyZ2V0W2tleV0pO1xuXG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RQcm9wZXJ0eSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihnZXRSb290LCBwYXRoVG8sIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUHJveHkgfHwgaXRlbS5pc1Byb3BlcnR5KSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRnZXRSb290OiBnZXRSb290LFxuXHRcdFx0cGF0aDogcGF0aFRvXG5cdFx0fSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzKHRoaXMpKTtcblx0XHR0aGlzLnNldERhdGEoaXRlbSk7XG5cdFx0dGhpcy5pc1Byb3BlcnR5ID0gdHJ1ZTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfUkVUVVJOX1RPX1JPT1RdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0W01FVEFfUkVUVVJOX1RPX1JPT1RdKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0bGV0IHJvb3QgPSB0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSgpO1xuXHRcdHJvb3QudHJpZ2dlcignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9QUk9YWV0sIHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXksIHZhbHVlKTtcblx0fVxufVxuXG5cbnZhciBjcmVhdGVSZWNvcmRIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScgfHwga2V5ID09PSAnaXNSZWNvcmQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykge1xuXHRcdFx0XHRpZiAodGhpc1trZXldKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfTUFQX1RPX0lOVEVSRkFDRS5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RSZWNvcmQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QsIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIGl0ZW0uaXNQcm94eSkge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCd0aGlzIGlzIFByb3h5IGl0ZW0nKTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUmVjb3JkIHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRPcHRpb25zKHt9KTtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXSA9IG5ldyBub3RSZWNvcmRJbnRlcmZhY2UobWFuaWZlc3QpO1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzLmludGVyZmFjZVVwKCk7XG5cdFx0dGhpcy5pc1JlY29yZCA9IHRydWU7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSByZWNvcmQgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRpbml0UHJvcGVydGllcyhpdGVtLCBwYXRoID0gJycpIHtcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoaXRlbSk7XG5cdFx0XHRmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuXHRcdFx0XHRsZXQgY3VyUGF0aCA9IHBhdGggKyAocGF0aC5sZW5ndGggPiAwID8gJy4nIDogJycpICsga2V5O1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2N1clBhdGgnLCBjdXJQYXRoKTtcblx0XHRcdFx0aWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbVtrZXldID09PSAnb2JqZWN0JyAmJiBpdGVtW2tleV0gIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbVtrZXldLCBjdXJQYXRoKTtcblx0XHRcdFx0XHRcdGl0ZW1ba2V5XSA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldFJvb3QuYmluZCh0aGlzKSwgY3VyUGF0aCwgaXRlbVtrZXldKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGtleSwgJ2lzIG93biBwcm9wZXJ0eSwgYnV0IG5vdCBvYmplY3QnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGtleSwgJ2lzIG5vdCBvd24gcHJvcGVydHknKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaXRlbTtcblx0fVxuXG5cdGdldFJvb3QoKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtcykge1xuXHRcdHZhciBjb2xsZWN0aW9uID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29sbGVjdGlvbi5wdXNoKG5ldyBub3RSZWNvcmQobWFuaWZlc3QsIGl0ZW1zW2ldKSk7XG5cdFx0fVxuXHRcdHJldHVybiBjb2xsZWN0aW9uO1xuXHR9XG5cblx0aW50ZXJmYWNlVXAoKSB7XG5cdFx0aWYgKHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEFjdGlvbnNDb3VudCgpID4gMCkge1xuXHRcdFx0bGV0IGFjdGlvbnMgPSB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zKCk7XG5cdFx0XHRmb3IgKGxldCBpIGluIGFjdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5hY3Rpb25VcChpLCBhY3Rpb25zW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gKCkgPT4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCk7XHRcdFx0XG5cdFx0fVxuXHR9XG5cdC8qXG5cdC0+ICdwYXRoLnRvLmtleScsIHZhbHVlT2ZLZXlcblx0PC0gb2ssIHdpdGggb25lIG9uQ2hhbmdlIGV2ZW50IHRyaWdnZXJlZFxuXHQqL1xuXG5cdHNldEF0dHIoa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBub3RQYXRoLnNldChrZXksIHRoaXNbTUVUQV9QUk9YWV0sIHt9LCB2YWx1ZSk7XG5cdH1cblxuXHQvKlxuXHQtPlxuXHR7XG5cdFx0J2tleVBhdGgnOiB2YWx1ZSxcblx0XHQna2V5LnN1YlBhdGgnOiB2YWx1ZTIsXG5cdFx0J2tleVBhdGguMC50aXRsZSc6IHZhbHVlM1xuXHR9XG5cdDwtIG9rLCB3aXRoIGJ1bmNoIG9mIG9uQ2hhbmdlIGV2ZW50cyB0cmlnZ2VyZWRcblx0Ki9cblx0c2V0QXR0cnMob2JqZWN0UGFydCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBpbiBvYmplY3RQYXJ0KSB7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMgb25lIHRvIGdvJywgcGF0aCk7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cihwYXRoLCBvYmplY3RQYXJ0W3BhdGhdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aFRvS2V5J1xuXHQ8LSB2YWx1ZTFcblxuXHQqL1xuXHRnZXRBdHRyKHdoYXQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ2dldEF0dHInLCB3aGF0KTtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQod2hhdCwgdGhpc1tNRVRBX1BST1hZXSwge30pO1xuXHR9XG5cblx0Lypcblx0LT4gWydwYXRoVG9LZXknLCAncGF0aC50by5rZXknLCAnc2ltcGxlS2V5JywuLi5dXG5cdDwtIFt2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzLC4uLl1cblx0Ki9cblx0Z2V0QXR0cnMod2hhdCkge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAod2hhdCAmJiB3aGF0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggb2Ygd2hhdCkge1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLmdldEF0dHIocGF0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0aWYgKHRoaXNbTUVUQV9JTlRFUkZBQ0VdKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ubWFuaWZlc3Q7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdGhhbmRsZXIgZm9yIFByb3h5IGNhbGxiYWNrc1xuXHQqL1xuXG5cdFtNRVRBX0NIQU5HRV0oKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCd0cnkgdG8gY2hhbmdlJywgLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdFtNRVRBX0NIQU5HRV9ORVNURURdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZSBuZXN0ZWQnLCAuLi5hcmd1bWVudHMpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0aGlzW01FVEFfUFJPWFldLCBub3RQYXRoLmpvaW4oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pLCBhcmd1bWVudHNbM10pO1xuXHR9XG5cblx0c2V0SXRlbShpdGVtKSB7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub2ZmKCdjaGFuZ2UnKTtcblx0XHR0aGlzLm9mZignY2hhbmdlLm5lc3RlZCcpO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24udHJhY2UoKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdHNldEZpbmRCeSgpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRGaW5kQnkoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0U29ydGVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFNvcnRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0UGFnZU51bWJlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0UGFnZVNpemUoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldFBhZ2VyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlc2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRNb2RlbE5hbWUoLi4uYXJndW1lbnRzKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlY29yZDtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG5cbmNvbnN0IE9QVF9DT05UUk9MTEVSX1BSRUZJWCA9ICduYycsXG5cdE9QVF9SRUNPUkRfUFJFRklYID0gJ25yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QXBwIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcih7b3B0aW9uc30pO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGFwcCcpO1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcignYXBwJywgdGhpcyk7XG5cdFx0dGhpcy5yZXNvdXJjZXMgPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0aW50ZXJmYWNlczoge30sXG5cdFx0XHRjb250cm9sbGVyczoge30sXG5cdFx0XHRpbml0Q29udHJvbGxlcjogbnVsbCxcblx0XHRcdGN1cnJlbnRDb250cm9sbGVyOiBudWxsXG5cdFx0fSk7XG5cdFx0dGhpcy5wcmVJbml0Um91dGVyKCk7XG5cdFx0dGhpcy5pbml0TWFuYWdlcigpO1xuXHRcdHRoaXMuaW5pdEFQSSgpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlcygpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdE1hbmFnZXIoKXtcblx0XHRub3RDb21tb24uc2V0TWFuYWdlcihcblx0XHRcdHtcblx0XHRcdFx0c2V0QVBJKHYpeyB0aGlzLmFwaSA9IHY7fSxcblx0XHRcdFx0Z2V0QVBJKCl7cmV0dXJuIHRoaXMuYXBpO30sXG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdGluaXRBUEkoKXtcblx0XHRub3RDb21tb24uZ2V0TWFuYWdlcigpLnNldEFQSShuZXcgbm90QVBJKHt9KSk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGVzKCl7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykpe1xuXHRcdFx0bGV0IHByb20gPSBudWxsO1xuXHRcdFx0Zm9yKGxldCB0IGluIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykpe1xuXHRcdFx0XHRpZiAodCAmJiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0XHRsZXQgdXJsID0gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKVt0XTtcblx0XHRcdFx0XHRpZihwcm9tKXtcblx0XHRcdFx0XHRcdHByb20udGhlbihub3RUZW1wbGF0ZUNhY2hlLmFkZExpYkZyb21VUkwuYmluZChub3RUZW1wbGF0ZUNhY2hlLCB1cmwpKTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHByb20gPSBub3RUZW1wbGF0ZUNhY2hlLmFkZExpYkZyb21VUkwodXJsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChwcm9tKXtcblx0XHRcdFx0cHJvbS50aGVuKHRoaXMuaW5pdE1hbmlmZXN0LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KCdubyB0ZW1wbGF0ZXMgbGliJywgZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5pbml0TWFuaWZlc3QoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuaW5pdE1hbmlmZXN0KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hbmlmZXN0KCkge1xuXHRcdHZhciB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ21hbmlmZXN0VVJMJyk7XG5cdFx0bm90Q29tbW9uLmdldEpTT04odXJsLCB7fSlcblx0XHRcdC50aGVuKHRoaXMuc2V0SW50ZXJmYWNlTWFuaWZlc3QuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0LmJpbmQodGhpcykpO1xuXHR9XG5cblx0cHJlSW5pdFJvdXRlcigpe1xuXHRcdHRoaXMuc2V0V29ya2luZygncm91dGVyJywgbm90Um91dGVyKTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcicpLnNldFJvb3QodGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIucm9vdCcpKTtcblx0XHRub3RSb3V0ZXIucmVSb3V0ZUV4aXN0ZWQoKTtcblx0fVxuXG5cdGluaXRSb3V0ZXIoKXtcblx0XHR2YXIgcm91dGllSW5wdXQgPSB7fTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRsZXQgcm91dGVCbG9jayA9IHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLm1hbmlmZXN0JylbdF0sXG5cdFx0XHRcdHBhdGhzID0gcm91dGVCbG9jay5wYXRocyxcblx0XHRcdFx0Y29udHJvbGxlciA9IHJvdXRlQmxvY2suY29udHJvbGxlcjtcblx0XHRcdGZvcihsZXQgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHJvdXRpZUlucHV0W3BhdGhzW2ldXSA9IHRoaXMuYmluZENvbnRyb2xsZXIoY29udHJvbGxlcik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuYWRkTGlzdChyb3V0aWVJbnB1dCkubGlzdGVuKCk7Ly8ubmF2aWdhdGUodGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIuaW5kZXgnKSk7XG5cdH1cblxuXHRzZXRJbnRlcmZhY2VNYW5pZmVzdChtYW5pZmVzdCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnLCBtYW5pZmVzdCk7XG5cdFx0dGhpcy51cGRhdGUoKTtcblx0fVxuXG5cdGdldEludGVyZmFjZU1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0Jyk7XG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cdFx0Ly/QvdGD0LbQvdC+INC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDRgtGMXG5cdFx0Ly/QvNC+0LTQtdC70Lgg0L/QvtC70YPRh9C10L3QvdGL0LzQuCDQuNC90YLQtdGA0YTQtdC50YHQsNC80Lhcblx0XHR0aGlzLnVwZGF0ZUludGVyZmFjZXMoKTtcblx0XHQvL9C40L3QuNGG0LjQu9C40YbQuNGA0L7QstCw0YLRjCDQuCDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YAg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lhcblx0XHR0aGlzLmluaXRDb250cm9sbGVyKCk7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXJ0QXBwKCkge1xuXHRcdC8v0YHQvtC30LTQsNGC0Ywg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdC8v0YDQvtGD0YLQtdGAINC4INC/0YDQuNCy0Y/Qt9Cw0YLRjCDQuiDQvdC10LzRgyDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0dGhpcy5pbml0Um91dGVyKCk7XG5cdH1cblxuXHRiaW5kQ29udHJvbGxlcihjb250cm9sbGVyTmFtZSkge1xuXHRcdGxldCBhcHAgPSB0aGlzO1xuXHRcdHJldHVybiBmdW5jdGlvbigpe1xuXHRcdFx0bmV3IGNvbnRyb2xsZXJOYW1lKGFwcCwgYXJndW1lbnRzKTtcblx0XHR9O1xuXHR9XG5cblx0aW5pdENvbnRyb2xsZXIoKSB7XG5cdFx0aWYgKHR5cGVvZih0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJykpICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0bGV0IGluaXRDb250cm9sbGVyID0gdGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdpbml0Q29udHJvbGxlcicsIG5ldyBpbml0Q29udHJvbGxlcih0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Q3VycmVudENvbnRyb2xsZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInKTtcblx0fVxuXG5cdHNldEN1cnJlbnRDb250cm9sbGVyKGN0cmwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJywgY3RybCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR1cGRhdGVJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuY2xlYXJJbnRlcmZhY2VzKCk7XG5cdFx0bGV0IG1hbmlmZXN0cyA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0XHRpZiAobWFuaWZlc3RzKSB7XG5cdFx0XHRmb3IobGV0IG5hbWUgaW4gbWFuaWZlc3RzKXtcblx0XHRcdFx0bGV0IHJlY29yZE1hbmlmZXN0ID0gbWFuaWZlc3RzW25hbWVdO1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXSA9IChyZWNvcmREYXRhKSA9PiBuZXcgbm90UmVjb3JkKHJlY29yZE1hbmlmZXN0LCByZWNvcmREYXRhKTtcblx0XHRcdFx0d2luZG93WyducicgKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpXSA9IHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFJlY29yZE5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfUkVDT1JEX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRDb250cm9sbGVyTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9DT05UUk9MTEVSX1BSRUZJWCArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VzKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKTtcblx0fVxuXG5cdGNsZWFySW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ludGVyZmFjZXMnLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR3YWl0VGhpc1Jlc291cmNlKHR5cGUsIGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLnJlc291cmNlcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuXHRcdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV0gPSB7fTtcblx0XHR9XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gZmFsc2U7XG5cdFx0cmV0dXJuIHRoaXMub25SZXNvdXJjZVJlYWR5LmJpbmQodGhpcywgdHlwZSwgaW5kZXgpO1xuXHR9XG5cblx0b25SZXNvdXJjZVJlYWR5KHR5cGUsIGluZGV4KSB7XG5cdFx0dGhpcy5yZXNvdXJjZXNbdHlwZV1baW5kZXhdID0gdHJ1ZTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0YWxsUmVzb3VyY2VzUmVhZHkoKSB7XG5cdFx0dmFyIGksIGo7XG5cdFx0Zm9yIChpIGluIHRoaXMucmVzb3VyY2VzKSB7XG5cdFx0XHRmb3IgKGogaW4gdGhpcy5yZXNvdXJjZXNbaV0pIHtcblx0XHRcdFx0aWYgKCF0aGlzLnJlc291cmNlc1tpXVtqXSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcblxuY29uc3QgTUVUQV9QUk9DRVNTT1JTID0gU3ltYm9sKCdwcm9jZXNzb3JzJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFByb2Nlc3NvcigvKiBrZXksIHZhbHVlICovKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQcm9jZXNzb3IoLyoga2V5LCAgZGVmYXVsdFZhbHVlICovKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXJQcm9jZXNzb3JzKCl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCB7fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGQoKXtcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG5cdFx0XHR0aGlzLnNldFByb2Nlc3Nvcihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBhcmd1bWVudHNbMF0pe1xuXHRcdFx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKHQsIGFyZ3VtZW50c1swXVt0XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRQcm9jZXNzb3IoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyKCl7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vbm90VGVtcGxhdGVQcm9jZXNzb3JzJztcblxuLypcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGCIERPTSDQv9C+0LTQtNC10YDQtdCy0L4g0LIg0LrQsNGH0LXRgdGC0LLQtSDRiNCw0LHQu9C+0L3QsC5cbiAqINCX0LDQv9C+0LvQvdGP0LXRgiDQtdCz0L4g0LTQsNC90L3Ri9C80LguXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgdCz0LXQvdC10YDQuNGA0L7QstCw0L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xuICpcbiAqICovXG5cbi8qXG5cblx0PGRpdiBuLXRlbXBsYXRlLW5hbWU9XCJ2YXN5YVwiPlxuXHRcdDxwPjxpbnB1dCB0eXBlPVwidGV4dFwiIG4tdmFsdWU9XCI6Y29vbE5hbWVcIi8+PC9wPlxuXHRcdDxwPtCR0L7RgNC40YEg0YXRgNC10L0g0L/QvtC/0LDQtNC10YjRjCDQuCB7ezpjb29sTmFtZX19LjwvcD5cblx0PC9kaXY+XG5cbiAqL1xuXG5jb25zdCBNRVRBX0NPTVBPTkVOVFMgPSBTeW1ib2woJ2NvbXBvbmVudHMnKTtcblxuY2xhc3Mgbm90UmVuZGVyZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Lypcblx0XHRpbnB1dCA9IHtcblx0XHRcdGRhdGE6IG5vdFJlY29yZCxcblx0XHRcdHRlbXBsYXRlOiBlbGVtZW50XG5cdFx0XHRvcHRpb25zOntcblx0XHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdH1cblx0XHR9XG5cdCovXG5cblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXSA9IHt9O1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5jb21wb25lbnQgPSBpbnB1dC5jb21wb25lbnQ7XG5cdFx0dGhpcy5pbml0RGF0YShpbnB1dC5kYXRhID8gaW5wdXQuZGF0YSA6IHt9KTtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQudGVtcGxhdGUpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlKCk7XG5cdH1cblxuXHRpbml0VGVtcGxhdGUoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZScsIHRoaXMuZ2V0V29ya2luZygnZ2V0VGVtcGxhdGUnKSgpKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5nZXREYXRhKCkub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdH1cblxuXHRpbml0V29ya2luZyh0ZW1wbGF0ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRnZXRUZW1wbGF0ZTogdGVtcGxhdGUsXG5cdFx0XHRwYXJ0SWQ6IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgPyB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpIDogT1BUUy5QQVJUX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpIHtcblx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcblx0XHRcdHJldHVybiBbLi4udGhpcy5jb21wb25lbnQuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKV07XG5cdFx0fVxuXHR9XG5cblx0b25DaGFuZ2UocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHQvKm5vdENvbW1vbi5sb2codGhpcyk7XG5cdFx0bm90Q29tbW9uLmxvZyh0aGlzLmdldEJyZWFkQ3J1bXBzKCkuam9pbignID4gJykpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHJlbmRlcmVyICcsIHRoaXMuZ2V0V29ya2luZygncGFydElkJyksICcgYWZ0ZXIgY2hhbmdlcycsIGtleSwgdmFsdWUpOyovXG5cdFx0dGhpcy51cGRhdGUoa2V5KTtcblx0XHR0aGlzLnRyaWdnZXIoJ29ic29sZXRlJyxwcm94eSwga2V5LCB2YWx1ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHR1cGRhdGUoa2V5KSB7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0Zm9yIChsZXQgdCBpbiB0aGlzW01FVEFfQ09NUE9ORU5UU10pIHtcblx0XHRcdGxldCBpdGVtID0gdGhpc1tNRVRBX0NPTVBPTkVOVFNdW3RdLFxuXHRcdFx0XHRpZlBhcnQgPSB0cnVlO1xuXHRcdFx0aWYgKGtleSl7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJyk9PT1udWxsKXtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXRcdGNvbXBvbmVudFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpKSxcblx0XHRcdFx0XHRjaGFuZ2VkUGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChrZXkpO1xuXHRcdFx0XHRpZlBhcnQgPSBub3RQYXRoLmlmRnVsbFN1YlBhdGgoY2hhbmdlZFBhdGgsIGNvbXBvbmVudFBhdGgpO1xuXHRcdFx0XHQvKm5vdENvbW1vbi5sb2coaXRlbS5nZXRPcHRpb25zKCduYW1lJyksICcgPi08ICcsIGl0ZW0uZ2V0T3B0aW9ucygnaWQnKSwgJyA+LTwgJywgY29tcG9uZW50UGF0aCwgY2hhbmdlZFBhdGgpO1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCd3aWxsIGJlIHVwZGF0ZWQnLCBpZlBhcnQpOyovXG5cdFx0XHR9XG5cblx0XHRcdGlmIChpZlBhcnQpIHtcblx0XHRcdFx0aXRlbS51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXRXb3JraW5nTWFwcGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21hcHBpbmcnLCB0aGlzLmNyZWF0ZU1hcHBpbmcoKSk7XG5cdH1cblxuXHQvKlxuXG5cdNCh0L7Qt9C00LDQtdC8INC60LDRgNGC0Ysg0YHQvtC+0YLQstC10YHRgtCy0LjRjyDQv9GA0L7RhtC10YHRgdC+0YDQvtCyLCDQv9GD0YLQtdC5INC00LDQvdC90YvRhSDQsiDQvtCx0YrQtdC60YLQtSDQuCDRjdC70LXQvNC10L3RgtC+0LIg0YjQsNCx0LvQvtC90LAuXG5cdFt7XG5cdFx0ZWwsXG5cdFx0cHJvY2Vzc29yLFxuXHRcdHdvcmtpbmcsXG5cdFx0aXRlbS5wcm9wZXJ0eS5wYXRoXG5cdH1dXG5cblx0Ki9cblxuXHRjcmVhdGVNYXBwaW5nKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmZpbmRBbGxQcm9jZXNzb3JzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZpbmRBbGxQcm9jZXNzb3JzKCkge1xuXHRcdGxldCBwcm9jcyA9IFtdLFxuXHRcdFx0ZWxzID0gbm90Q29tbW9uLmdldEF0dHJpYnV0ZXNTdGFydHNXaXRoKHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLCBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCk7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBhdHRzID0gZWxzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhhdHRzW2ldKTtcblx0XHRcdFx0XHRsZXQgcHJvY0RhdGEgPSB0aGlzLnBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihhdHRzW2ldLm5vZGVOYW1lKTtcblx0XHRcdFx0XHRwcm9jRGF0YS5lbGVtZW50ID0gZWxzW2pdO1xuXHRcdFx0XHRcdHByb2NEYXRhLnByb2Nlc3NvckV4cHJlc3Npb24gPSBhdHRzW2ldLm5vZGVOYW1lO1xuXHRcdFx0XHRcdHByb2NEYXRhLmF0dHJpYnV0ZUV4cHJlc3Npb24gPSBhdHRzW2ldLnZhbHVlO1xuXHRcdFx0XHRcdHByb2NzLnB1c2gocHJvY0RhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwcm9jcztcblx0fVxuXG5cdHBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihwcm9jZXNzb3JFeHByZXNzaW9uKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdHBhcmFtczogW10sXG5cdFx0XHRwcm9jZXNzb3JOYW1lOiAnJyxcblx0XHRcdGlmQ29uZGl0aW9uOiBmYWxzZVxuXHRcdH07XG5cdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCwgJycpO1xuXHRcdGlmIChwcm9jZXNzb3JFeHByZXNzaW9uLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCkgPT09IChwcm9jZXNzb3JFeHByZXNzaW9uLmxlbmd0aCAtIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgubGVuZ3RoKSkge1xuXHRcdFx0cmVzdWx0LmlmQ29uZGl0aW9uID0gdHJ1ZTtcblx0XHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgKyBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLCAnJyk7XG5cdFx0fVxuXHRcdHJlc3VsdC5wYXJhbXMgPSBwcm9jZXNzb3JFeHByZXNzaW9uLnNwbGl0KE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SKTtcblx0XHRyZXN1bHQucHJvY2Vzc29yTmFtZSA9IHJlc3VsdC5wYXJhbXNbMF07XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHJlc3VsdC5wYXJhbXMuc2xpY2UoMSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGV4ZWNQcm9jZXNzb3JzKGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG1hcHBpbmcgPSB0aGlzLmdldFdvcmtpbmcoJ21hcHBpbmcnKTtcblx0XHRpZiAobWFwcGluZykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBwcm9jU2NvcGUgPSBtYXBwaW5nW2ldO1xuXHRcdFx0XHRwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHByb2NTY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBpbmRleCk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnYXR0cmlidXRlUmVzdWx0JywgcHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdFx0XHRcdGxldCBwcm9jTmFtZSA9IHByb2NTY29wZS5wcm9jZXNzb3JOYW1lLFxuXHRcdFx0XHRcdHByb2MgPSBub3RUZW1wbGF0ZVByb2Nlc3NvcnMuZ2V0KHByb2NOYW1lKTtcblx0XHRcdFx0aWYgKHByb2MpIHtcblx0XHRcdFx0XHRwcm9jKHByb2NTY29wZSwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0XHRcdFx0XHRwcm9jU2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvY1Njb3BlLnByb2Nlc3NvckV4cHJlc3Npb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gcHJvY2Vzc29yIGxpa2UnLCBwcm9jTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcpO1xuXHR9XG5cblx0Z2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwYXRoLCBpdGVtKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdH1cblxuXHRjbGVhclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmRlc3Ryb3lTdWJzKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdWJzJywgW10pO1xuXHR9XG5cblx0ZGVzdHJveVN1YnMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFN0YXNoKCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IGVsID0gdGhpcy5nZXRTdGFzaCgpW3RdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUpe1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZlN1YkVsZW1lbnRSZW5kZXJlZChudEVsKSB7XG5cdFx0cmV0dXJuIG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkICYmIChudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZC52YWx1ZSA9PT0gJ3RydWUnKTtcblx0fVxuXG5cdHNlYXJjaEZvclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0bGV0IHN1YnMgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCA9IDA7IG50IDwgc3Vicy5sZW5ndGg7IG50KyspIHtcblx0XHRcdGlmICghdGhpcy5pZlN1YkVsZW1lbnRSZW5kZXJlZChzdWJzW250XSkpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJTdWIoc3Vic1tudF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZFN1YihudEVsKSB7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdzdWJzJykucHVzaCh7XG5cdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdHBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiAnJyxcblx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnNyYyA6ICcnLFxuXHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0XHRyZW5kZXJlZExpc3Q6IFtdLFxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU3ViKG50RWwpIHtcblx0XHRpZiAoIW50RWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IGRldGFpbHMgPSB7XG5cdFx0XHRcdGRhdGFQYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogbnVsbCxcblx0XHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMuc3JjLnZhbHVlIDogJycsXG5cdFx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0ZGF0YTogZGV0YWlscy5kYXRhUGF0aCE9PSBudWxsPyB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQoZGV0YWlscy5kYXRhUGF0aCwgdGhpcy5nZXREYXRhKCkpOm51bGwsXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHNyYzogZGV0YWlscy5zcmNcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSxcblx0XHRcdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VBZnRlcicsXG5cdFx0XHRcdFx0aWQ6IGRldGFpbHMuaWQsXG5cdFx0XHRcdFx0bnRFbDogbnRFbCxcblx0XHRcdFx0XHRkYXRhUGF0aDogZGV0YWlscy5kYXRhUGF0aFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvd25lcjogdGhpc1xuXHRcdFx0fTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnaWQnLCBkZXRhaWxzLmlkKTtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU11bZGV0YWlscy5pZF0gPSBuZXcgbm90Q29tcG9uZW50KG9wdGlvbnMpO1xuXHR9XG5cblx0Y2xlYXJTdGFzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgW10pO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZScpO1xuXHR9XG5cblx0Z2V0U3Rhc2goKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc3Rhc2gnKTtcblx0fVxuXG5cdHN0YXNoUmVuZGVyZWQoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdHRoaXMuYWRkVG9TdGFzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHR9XG5cblx0cmVwbGFjZVJlbmRlcmVkKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygncmVwbGFjZSBzdGFzaCcpO1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSxcblx0XHRcdHN0YXNoID0gdGhpcy5nZXRTdGFzaCgpLFxuXHRcdFx0bmV3U3Rhc2ggPSBbXSxcblx0XHRcdGFuY2hvciA9IHN0YXNoLmxlbmd0aCA+IDAgPyBzdGFzaFswXSA6IHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLFxuXHRcdFx0cGFyZW50Tm9kZSA9IGFuY2hvci5wYXJlbnROb2RlO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgcmVzdWx0LmNoaWxkTm9kZXMubGVuZ3RoOyB0KyspIHtcblx0XHRcdG5ld1N0YXNoLnB1c2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IG5ld1N0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRpZiAoYW5jaG9yLm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdTdGFzaFt0XSwgYW5jaG9yLm5leHRTaWJsaW5nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFuY2hvci5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld1N0YXNoW3RdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBzdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0cGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdGFzaFt0XSk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBuZXdTdGFzaCk7XG5cdH1cblxuXHRhZGRUb1N0YXNoKG5vZGUpIHtcblx0XHR0aGlzLmdldFN0YXNoKCkucHVzaChub2RlKTtcblx0fVxuXG5cdGlzRGF0YShkYXRhID0ge30pIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkgPT09IGRhdGE7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVuZGVyZXI7XG4iLCJjb25zdCBwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XG5cdFx0bGV0IGwgPSAwO1xuXHRcdHdoaWxlICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGggLSBsKSB7XG5cdFx0XHRpZiAodGFyZ2V0RWwuY2hpbGRyZW5bMF0ubm9kZU5hbWUgPT09ICdOVCcpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdudCBmb3VuZGVkJyk7XG5cdFx0XHRcdGwrKztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdyZW1vdmUgY2hpbGQgJyx0YXJnZXRFbC5jaGlsZHJlbltsXSk7XG5cdFx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGFyZ2V0RWwudGV4dENvbnRlbnQgPSAnJztcblx0fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBjaGlsZCAnLCByZW5kZXJlZFtpXSk7XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge31cbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZTtcbiIsImNvbnN0IHBsYWNlQWZ0ZXIgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUFmdGVyO1xuIiwiY29uc3QgcGxhY2VCZWZvcmUgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbCk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUJlZm9yZTtcbiIsImNvbnN0IHBsYWNlRmlyc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSByZW5kZXJlZC5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygncGxhY2UgZmlyc3QnLCBpLCByZW5kZXJlZFtpXSk7XG5cdFx0XHRpZiAodGFyZ2V0RWwuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGJlZm9yZSBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLmNoaWxkcmVuWzBdKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgYXMgZmlyc3QnKTtcblx0XHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlRmlyc3Q7XG4iLCJjb25zdCBwbGFjZUxhc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlTGFzdDtcbiIsImNvbnN0IHJlcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGJlZm9yZUVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1x0XHRcblx0XHRpZiAodGFyZ2V0RWwubm9kZU5hbWUgIT09ICdOVCcpe1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YXJnZXRFbCk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlO1xuIiwiaW1wb3J0IHBsYWNlIGZyb20gJy4vcGxhY2UnO1xuaW1wb3J0IHBsYWNlQWZ0ZXIgZnJvbSAnLi9wbGFjZUFmdGVyJztcbmltcG9ydCBwbGFjZUJlZm9yZSBmcm9tICcuL3BsYWNlQmVmb3JlJztcbmltcG9ydCBwbGFjZUZpcnN0IGZyb20gJy4vcGxhY2VGaXJzdCc7XG5pbXBvcnQgcGxhY2VMYXN0IGZyb20gJy4vcGxhY2VMYXN0JztcbmltcG9ydCByZXBsYWNlIGZyb20gJy4vcmVwbGFjZSc7XG5cbmNvbnN0IG5vdFBsYWNlcnMgPSB7XG5cdHBsYWNlOiBwbGFjZSxcblx0cGxhY2VBZnRlcjogcGxhY2VBZnRlcixcblx0cGxhY2VCZWZvcmU6IHBsYWNlQmVmb3JlLFxuXHRwbGFjZUZpcnN0OiBwbGFjZUZpcnN0LFxuXHRwbGFjZUxhc3Q6IHBsYWNlTGFzdCxcblx0cmVwbGFjZTogcmVwbGFjZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90UGxhY2VycztcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi9ub3RSZW5kZXJlcic7XG5pbXBvcnQgbm90UGxhY2VycyBmcm9tICcuL3BsYWNlcnMnO1xuXG5jb25zdCBNRVRBX1BBUlRTID0gU3ltYm9sKCdwYXJ0cycpO1xuLypcblx0aW5wdXQgPSB7XG5cdFx0ZGF0YTogbm90UmVjb3JkIG9yIFtub3RSZWNvcmRdLFxuXHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRodG1sOiBodG1sKHN0cmluZyksIFx0XHQvL9GC0LXQutGB0YIg0YEgaHRtbCDQutC+0LTQvtC8INGI0LDQsdC70L7QvdCwXG5cdFx0XHRlbDogSFRNTEVsZW1lbnQob2JqZWN0KSwgXHQvL0RPTSDRjdC70LXQvNC10L3RglxuXHRcdFx0c3JjOiBzcmMoc3RyaW5nKSxcdFx0XHQvL9GB0YHRi9C70LrQsCDQvdCwINGE0LDQudC7INGBINGI0LDQsdC70L7QvdC+0Lxcblx0XHRcdG5hbWU6IG5hbWUoc3RyaW5nKVx0XHRcdC8v0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCDQtNC70Y8g0L/QvtC40YHQutCwINCyINC60Y3RiNC1IG5vdFRlbXBsYXRlQ2FjaGVcblx0XHR9XG5cdFx0b3B0aW9uczp7XG5cdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHQvL9CwINGN0YLQviDQutCw0Log0LHRg9C00LXQvCDQv9C+0LzQtdGJ0LDRgtGMINGA0LXQt9GD0LvRjNGC0LDRgiDRgNC10L3QtNC10YDQuNC90LPQsFxuXHRcdFx0cmVuZGVyQW5kOiBwbGFjZVN0eWxlKHN0cmluZykg0L7QtNC40L0g0LjQtyDQstCw0YDQuNCw0L3RgtC+0LJcblx0XHRcdFx0XHRwbGFjZVx0XHQtXHTQv9C+0LzQtdGJ0LDQtdC8INCy0L3Rg9GC0YDQuCDRhtC10LvQtdCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0XHRyZXBsYWNlXHRcdC1cdNC30LDQvNC10L3Rj9C10Lxcblx0XHRcdFx0XHRwbGFjZUFmdGVyXHQtXHTQv9C+0YHQu9C1XG5cdFx0XHRcdFx0cGxhY2VCZWZvcmVcdC1cdNC00L5cblx0XHRcdFx0XHRwbGFjZUZpcnN0XHQtXHTQstC90YPRgtGA0Lgg0L/QtdGA0LLRi9C8INC00L7Rh9C10YDQvdC40Lxcblx0XHRcdFx0XHRwbGFjZUxhc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C+0YHQu9C10LTQvdC40Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdH1cblx0fVxuKi9cbmNsYXNzIG5vdENvbXBvbmVudCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpe1xuXHRcdGlmICh0aGlzLm93bmVyKXtcblx0XHRcdHJldHVybiBbLi4udGhpcy5vd25lci5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1cblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5vd25lciA9IGlucHV0Lm93bmVyP2lucHV0Lm93bmVyOm51bGw7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0RXZlbnRzKGxpc3Qpe1xuXHRcdGZvcihsZXQgdCBvZiBsaXN0KXtcblx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2lkJykpe1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdpZCcsIE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKXtcblx0XHRcdHRoaXMuaW5pdE1hcmtFbGVtZW50KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hcmtFbGVtZW50KCl7XG5cdFx0bGV0IG1hcmtFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ250Jyk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdudEVsJywgbWFya0VsKTtcblx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSksXG5cdFx0XHR0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZiAodGFyZ2V0UXVlcnkpe1xuXHRcdFx0bGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0UXVlcnkpO1xuXHRcdFx0aWYgKHRhcmdldCl7XG5cdFx0XHRcdHRoaXMuc2V0T3B0aW9ucygndGFyZ2V0RWwnLCB0YXJnZXQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKXtcblx0XHRcdHRocm93ICdObyB0YXJnZXQgdG8gcGxhY2UgcmVuZGVyZWQnO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyLm1haW4odGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLCBbbWFya0VsXSk7XG5cdFx0fVxuXG5cdH1cblxuXHRpbml0V29ya2luZyh2YWwpIHtcblx0XHR0aGlzLnVuc2V0UmVhZHkodmFsKTtcblx0fVxuXG5cdHByZXBhcmVUZW1wbGF0ZUVsZW1lbnQodmFsKSB7XG5cdFx0aWYgKCF2YWwpIHtcblx0XHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdodG1sJykgJiYgdmFsLmh0bWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQodmFsLmVsLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZhbC5zcmMpIHtcblx0XHRcdG5vdFRlbXBsYXRlQ2FjaGUuYWRkRnJvbVVSTCh2YWwuc3JjLCB2YWwuc3JjKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpICYmIHZhbC5uYW1lKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUuZ2V0KHZhbC5uYW1lKSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JywgY29udCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRyZXNldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50JywgdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpLmNsb25lTm9kZSh0cnVlKSk7XG5cdH1cblxuXHRzZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdHJ1ZSk7XG5cdH1cblxuXHR1bnNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCBmYWxzZSk7XG5cdH1cblxuXHRpc1JlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3JlYWR5Jyk7XG5cdH1cblxuXHRjbGVhclBhcnRzKCkge1xuXHRcdC8qINC40LfQstC10YnQsNC10Lwg0L7QsSDRg9C00LDQu9C10L3QuNC4INGN0LvQtdC80LXQvdGC0L7QsiAqL1xuXHRcdGlmICh0aGlzW01FVEFfUEFSVFNdICYmIEFycmF5LmlzQXJyYXkodGhpc1tNRVRBX1BBUlRTXSkgJiYgdGhpc1tNRVRBX1BBUlRTXS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpc1tNRVRBX1BBUlRTXSkge1xuXHRcdFx0XHRpZiAodC5kZXN0cm95KXtcblx0XHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdudEVsJykgJiYgdGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZSl7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKTtcblx0XHR9XG5cdFx0dGhpcy5kZWFkID0gdHJ1ZTtcblx0XHR0aGlzLm9mZkFsbCgpO1xuXHR9XG5cblx0cmVzZXRQYXJ0cygpIHtcblx0XHR0aGlzW01FVEFfUEFSVFNdID0gW107XG5cdH1cblxuXHRnZXRQYXJ0cygpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BBUlRTXTtcblx0fVxuXG5cdGFkZFBhcnQodGVtcGxhdGUpIHtcblx0XHR0aGlzW01FVEFfUEFSVFNdLnB1c2godGVtcGxhdGUpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2xlYXJQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMucmVtb3ZlT2Jzb2xldGVQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJVcGRhdGUnKTtcblx0fVxuXG5cdHBsYWNlUmVuZGVyZWQoKXtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKSB7XG5cdFx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0XHRwbGFjZXIuYmVmb3JlKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSk7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucGxhY2VQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0cGxhY2VyLmFmdGVyKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gdGFyZ2V0IGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRwbGFjZVBhcnQoZGF0YSwgaW5kZXgpe1xuXHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpLFxuXHRcdFx0bm9kZXMgPSBwYXJ0LmdldFN0YXNoKCksXG5cdFx0XHR0YXJnZXRFbCxcblx0XHRcdGxhc3ROb2RlLFxuXHRcdFx0cGxhY2VyO1xuXHRcdGlmIChpbmRleCA9PT0gMCl7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIoT1BUUy5ERUZBVUxUX1BMQUNFUl9MT09QKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScpO1xuXHRcdH1cblx0XHRwbGFjZXIubWFpbih0YXJnZXRFbCwgbm9kZXMpO1xuXHRcdGxhc3ROb2RlID0gdGFyZ2V0RWw7XG5cdFx0Zm9yKGxldCB0IG9mIG5vZGVzKXtcblx0XHRcdGlmICh0Lm5vZGVUeXBlID09PSAxKXtcblx0XHRcdFx0bGFzdE5vZGUgPSB0O1xuXHRcdFx0XHRsYXN0Tm9kZS5zZXRBdHRyaWJ1dGUoJ250LWNvbXBvbmVudCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtcGFydCcsIHBhcnQuZ2V0V29ya2luZygncGFydElkJykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJywgbGFzdE5vZGUpO1xuXHR9XG5cblx0Z2V0UGxhY2VyKG1ldGhvZCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2VhcmNoaW5nIGZvciBwbGFjZXInLCBtZXRob2QpO1xuXHRcdGlmIChub3RQbGFjZXJzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW21ldGhvZF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW09QVFMuREVGQVVMVF9QTEFDRVJdO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hEYXRhKGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXREYXRhKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZ1bmModGhpcy5nZXREYXRhKCksIDApO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hQYXJ0KGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldFBhcnRzKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0UGFydHMoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHTQtdGB0LvQuCDRgSDQtNCw0L3QvdGL0LzQuCDQvdC1INGB0LLRj9C30LDQvSDRgNC10L3QtNC10YDQtdGAIC0g0YHQvtC30LTQsNC10Lxcblx0Ki9cblxuXHRyZW5kZXJQYXJ0KGRhdGEpIHtcblx0XHRpZiAoIXRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjcmVhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0bGV0IHJlbmRlcmVyID0gbmV3IG5vdFJlbmRlcmVyKHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dGVtcGxhdGU6IHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKSxcblx0XHRcdFx0Y29tcG9uZW50OiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdC8vcmVuZGVyZXIub24oJ29ic29sZXRlJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFkZFBhcnQocmVuZGVyZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCd1cGRhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0dGhpcy51cGRhdGVQYXJ0KHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlUGFydChwYXJ0KXtcblx0XHRwYXJ0LnVwZGF0ZSgpO1xuXHR9XG5cblx0cmVtb3ZlT2Jzb2xldGVQYXJ0cygpIHtcblx0XHQvL9C60L7QvdCy0LXQtdGAINC/0L7QuNGB0Log0LDQutGC0YPQsNC70YzQvdGL0YUgLSDRg9C00LDQu9C10L3QuNC1INC+0YHRgtCw0LvRjNC90YvRhVxuXHRcdG5vdENvbW1vbi5waXBlKFxuXHRcdFx0dW5kZWZpbmVkLCAvLyBwYXJ0cyB0byBzZWFyY2ggaW4sIGNhbiBiZSAndW5kZWZpbmVkJ1xuXHRcdFx0W1xuXHRcdFx0XHR0aGlzLmZpbmRBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL2ZpcnN0IHJvdW5kLCBzZWFyY2ggZm9yIG9ic29sZXRlXG5cdFx0XHRcdHRoaXMucmVtb3ZlTm90QWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9yZW1vdmUgJ2VtXG5cdFx0XHRdXG5cdFx0KTtcblx0fVxuXG5cdC8qXG5cdFx00LXRgdGC0Ywg0LTQsNC90L3Ri9C1INC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0LDQutGC0YPQsNC70YzQvdC+LFxuXHRcdNC90LXRgiDQtNCw0L3QvdGL0YUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDRgdGC0LDRgNGM0ZFcblx0Ki9cblxuXHRmaW5kQWN0dWFsUGFydHMoKSB7XG5cdFx0bGV0IGFjdHVhbFBhcnRzID0gW107XG5cdFx0dGhpcy5mb3JFYWNoRGF0YSgoZGF0YS8qLCBpbmRleCovKT0+e1xuXHRcdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSk7XG5cdFx0XHRpZiAocGFydCl7XG5cdFx0XHRcdGFjdHVhbFBhcnRzLnB1c2gocGFydCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGFjdHVhbFBhcnRzO1xuXHR9XG5cblx0Lypcblx0XHTRg9C00LDQu9GP0LXQvCDQstGB0LUg0LrRgNC+0LzQtSDQsNC60YLRg9Cw0LvRjNC90YvRhVxuXHQqL1xuXHRyZW1vdmVOb3RBY3R1YWxQYXJ0cyhhY3R1YWxQYXJ0cyl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAoYWN0dWFsUGFydHMuaW5kZXhPZih0aGlzLmdldFBhcnRzKClbdF0pID09PSAtMSl7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKVt0XS5kZXN0cm95KCk7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKS5zcGxpY2UodCwgMSk7XG5cdFx0XHRcdHQtLTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRQYXJ0QnlEYXRhKGRhdGEpIHtcblx0XHRmb3IgKGxldCB0IGluIHRoaXMuZ2V0UGFydHMoKSkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0UGFydHMoKVt0XS5pc0RhdGEoZGF0YSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UGFydHMoKVt0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbXBvbmVudDtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SID0gJy5wYWdlLWNvbnRlbnQnLFxuXHRPUFRfREVGQVVMVF9WSUVXU19QT1NURklYID0gJy5odG1sJyxcblx0T1BUX0RFRkFVTFRfVklFV19OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9SRU5ERVJfRlJPTV9VUkwgPSB0cnVlLFxuXHRPUFRfREVGQVVMVF9QTFVSQUxfTkFNRSA9ICdNb2RlbHMnLFxuXHRPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSA9ICdNb2RlbCcsXG5cdE9QVF9ERUZBVUxUX01PRFVMRV9OQU1FID0gJ21haW4nLFxuXHRPUFRfREVGQVVMVF9SRU5ERVJfQU5EID0gJ3BsYWNlJztcblxuY2xhc3Mgbm90Q29udHJvbGxlciBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihhcHApIHtcblx0XHRzdXBlcigpO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGNvbnRyb2xsZXInKTtcblx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cmVhZHk6IGZhbHNlLFxuXHRcdFx0dmlld3M6IHt9LFxuXHRcdFx0bGliczp7fSxcblx0XHRcdHZpZXdOYW1lOiBPUFRfREVGQVVMVF9WSUVXX05BTUUsXG5cdFx0XHRoZWxwZXJzOiB7fVxuXHRcdH0pO1xuXHRcdHRoaXMuc2V0RGF0YSh7fSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHtcblx0XHRcdG1vZHVsZU5hbWU6IE9QVF9ERUZBVUxUX01PRFVMRV9OQU1FLFxuXHRcdFx0Y29udGFpbmVyU2VsZWN0b3I6IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUixcblx0XHRcdHByZWZpeDogdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMubW9kdWxlJyksXG5cdFx0XHRwb3N0Zml4OiBPUFRfREVGQVVMVF9WSUVXU19QT1NURklYLFxuXHRcdFx0cmVuZGVyRnJvbVVSTDogT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMLFxuXHRcdFx0bmFtZXM6e1xuXHRcdFx0XHRwbHVyYWw6T1BUX0RFRkFVTFRfUExVUkFMX05BTUUsXG5cdFx0XHRcdHNpbmdsZTogT1BUX0RFRkFVTFRfU0lOR0xFX05BTUVcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMuaW5pdFJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHQvKlxuXHRcdCAgICDRgdGA0LDQt9GDINC00LXQu9Cw0LXQvCDQtNC+0YHRgtGD0L/QvdGL0LzQuCDQvNC+0LTQtdC70Lggbm90UmVjb3JkINC40LcgbmNgQ29udHJvbGxlck5hbWVgINCx0YPQtNGD0YIg0LTQvtGB0YLRg9C/0L3RiyDQutCw0LogdGhpcy5ucmBNb2RlbE5hbWVgXG5cdFx0Ki9cblx0XHRsZXQgaW50ZXJmYWNlcyA9IHRoaXMuYXBwLmdldEludGVyZmFjZXMoKTtcblx0XHR0aGlzLm1ha2UgPSB7fTtcblx0XHRmb3IgKGxldCB0IGluIGludGVyZmFjZXMpIHtcblx0XHRcdGlmIChpbnRlcmZhY2VzLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0dGhpcy5tYWtlW3RdID0gaW50ZXJmYWNlc1t0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVuZGVyKCl7XG5cdFx0dGhpcy5yZW5kZXIodGhpcy5nZXRXb3JraW5nKCd2aWV3TmFtZScpLCB0aGlzLmdldERhdGEoKSwgdGhpcy5nZXRXb3JraW5nKCdoZWxwZXJzJykpO1xuXHR9XG5cblx0cmVuZGVyKHZpZXdOYW1lID0nZGVmYXVsdCcgLyogdmlldyBuYW1lICovLCBkYXRhID0ge30gLyogZGF0YSBmb3Igbm90VGVtcGxhdGUqLyAsIGhlbHBlcnMgPSB7fS8qIGNvdWxkIGJlIG5vdCByZXByZXNlbnRlZCAqLykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0dmFyIHZpZXcgPSB0aGlzLmdldFZpZXcodmlld05hbWUpO1xuXG5cdFx0XHRpZiAodHlwZW9mIHZpZXcgPT09ICd1bmRlZmluZWQnIHx8IHZpZXcgPT09IG51bGwpIHtcblx0XHRcdFx0cmVqZWN0KCdObyB2aWV3IGZvdW5kJywgdmlld05hbWUpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZpZXcgPSBub3RDb21tb24uZXh0ZW5kKHt9LCB2aWV3KTtcblx0XHRcdFx0Ly8g0LXRgdC70LggcGxhY2Ug0L3QtSDRg9C60LDQt9Cw0L3Qviwg0YfRgtC+INCy0L7Qt9C80L7QttC90L4g0Lgg0YDQsNC30YPQvNC90L4g0L/RgNC4INC90LUg0YHRg9GJ0LXRgdGC0LLQvtCy0LDQvdC40Lhcblx0XHRcdFx0Ly8g0Y3Qu9C10LzQtdC90YLQsCwg0L3QviDQuNC30LLQtdGB0YLQvdC+0Lwg0LjQtNC10L3RgtC40YTQuNC60LDRgtC+0YDQtVxuXHRcdFx0XHRpZiAoKCh0eXBlb2Ygdmlldy50YXJnZXRFbCA9PT0gJ3VuZGVmaW5lZCcpIHx8ICh2aWV3LnRhcmdldEVsID09PSBudWxsKSkgJiYgKHR5cGVvZiB2aWV3LnRhcmdldFF1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3LnRhcmdldFF1ZXJ5ICE9PSBudWxsICYmIHZpZXcudGFyZ2V0UXVlcnkubGVuZ3RoID4gMCkpIHtcblx0XHRcdFx0XHR2aWV3LnRhcmdldEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih2aWV3LnRhcmdldFF1ZXJ5KTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR2aWV3LmRhdGEgPSBkYXRhO1xuXHRcdFx0XHRpZiAodHlwZW9mIHZpZXcuaGVscGVycyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5oZWxwZXJzICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHZpZXcuaGVscGVycykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZpZXcuaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQodmlldy5oZWxwZXJzLCBoZWxwZXJzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBoZWxwZXJzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8v0LXRgdC70Lgg0L3Rg9C20L3QviDQt9Cw0LPRgNGD0LbQsNGC0Ywg0YjQsNCx0LvQvtC90Ytcblx0XHRcdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyRnJvbVVSTCcpKSB7XG5cdFx0XHRcdFx0Ly/QuCDQsNC00YDQtdGBINC90LUg0YPQutCw0LfQsNC9XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LnRlbXBsYXRlVVJMID09PSAndW5kZWZpbmVkJyB8fCB2aWV3LnRlbXBsYXRlVVJMID09IG51bGwgfHwgdmlldy50ZW1wbGF0ZVVSTC5sZW5ndGggPT0gMCkge1xuXHRcdFx0XHRcdFx0bGV0IHByZWZpeCA9ICh2aWV3LmNvbW1vbiA/IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLmNvbW1vbicpOiB0aGlzLmdldE1vZHVsZVByZWZpeCgpKSxcblx0XHRcdFx0XHRcdFx0bmFtZSA9ICgodHlwZW9mIHZpZXcubmFtZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy5uYW1lICE9PSBudWxsICYmIHZpZXcubmFtZS5sZW5ndGggPiAwKSA/IHZpZXcubmFtZSA6IHZpZXdOYW1lKSxcblx0XHRcdFx0XHRcdFx0cG9zdGZpeCA9IHRoaXMuZ2V0T3B0aW9ucygncG9zdGZpeCcpO1xuXHRcdFx0XHRcdFx0Ly/Qs9C10L3QtdGA0LjRgNGD0LXQvCDQsNC00YDQtdGBINC/0L4g0YjQsNCx0LvQvtC90YNcblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVVUkwgPSAgW3ByZWZpeCwgbmFtZV0uam9pbignLycpICsgcG9zdGZpeDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly/QsCDQtdGB0LvQuCDQtdGB0YLRjCDQvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwLCDRgtC+XG5cdFx0XHRcdFx0aWYgKHZpZXcuaGFzT3duUHJvcGVydHkoJ3RlbXBsYXRlTmFtZScpKSB7XG5cdFx0XHRcdFx0XHQvLy4uLlxuXHRcdFx0XHRcdFx0dmlldy50ZW1wbGF0ZU5hbWUgPSB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgdmlldy50ZW1wbGF0ZU5hbWUgKyB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0XHRkYXRhLFxuXHRcdFx0XHRcdHRlbXBsYXRlOntcblx0XHRcdFx0XHRcdG5hbWU6IHZpZXcudGVtcGxhdGVOYW1lLFxuXHRcdFx0XHRcdFx0c3JjOiB2aWV3LnRlbXBsYXRlVVJMLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOltbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1dLFxuXHRcdFx0XHRcdG9wdGlvbnM6e1xuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IHZpZXcudGFyZ2V0RWwsXG5cdFx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdFx0cmVuZGVyQW5kOiB2aWV3LnJlbmRlckFuZCB8fCBPUFRfREVGQVVMVF9SRU5ERVJfQU5EXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblx0fVxuXG5cdGdldEFwcCgpIHtcblx0XHRyZXR1cm4gdGhpcy5hcHA7XG5cdH1cblxuXHRzZXRNb2RlbChtb2RlbCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZWwnLCBtb2RlbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNb2RlbCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdtb2RlbCcpO1xuXHR9XG5cblx0c2V0UmVhZHkodmFsID0gdHJ1ZSkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB2YWwpO1xuXHRcdHZhbCA/IHRoaXMudHJpZ2dlcigncmVhZHknKSA6IHRoaXMudHJpZ2dlcignYnVzeScpO1xuXHR9XG5cblx0c2V0VmlldyhuYW1lLCB2aWV3KXtcblx0XHR0aGlzLnNldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpLCB2aWV3KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFZpZXdzKHZpZXdzKXtcblx0XHRmb3IobGV0IHQgaW4gdmlld3Mpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCB0KSwgdmlld3NbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFZpZXcobmFtZSA9ICdkZWZhdWx0Jyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgbmFtZSkpO1xuXHR9XG5cblx0c2V0TW9kdWxlTmFtZSh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ21vZHVsZU5hbWUnLCB2YWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kdWxlTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdtb2R1bGVOYW1lJyk7XG5cdH1cblxuXHRnZXRNb2R1bGVQcmVmaXgoKXtcblx0XHRyZXR1cm4gW3RoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZXMnKSwgdGhpcy5nZXRNb2R1bGVOYW1lKCldLmpvaW4oJy8nKTtcblx0fVxuXG5cdHByZWxvYWRMaWIobGlzdCA9IHt9KXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGlmKHR5cGVvZiBsaXN0ICE9PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBsaXN0KXtcblx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5wdXNoKGxpc3RbdF0pO1xuXHRcdFx0XHRcdHRoaXMubWFrZVtsaXN0W3RdXSh7fSkuJGxpc3RBbGwoKVxuXHRcdFx0XHRcdFx0LnRoZW4oKGRhdGEpPT57XG5cdFx0XHRcdFx0XHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdsaWJzJykpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0T3B0aW9ucygnbGlicycsIHt9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKVt0XSA9IGRhdGE7XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2YobGlzdFt0XSkgPiAtMSl7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuc3BsaWNlKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2YobGlzdFt0XSksIDEpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0LmNhdGNoKChlcnIpPT57XG5cdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoZXJyKTtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cXVlZVVwbG9hZChuYW1lLCBsaXN0KXtcblx0XHQvL2hhc2ggKGZpZWxkTmFtZT0+ZmlsZXNMaXN0KVxuXHRcdGlmKCF0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnLCB7fSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkUXVlZScpW25hbWVdID0gbGlzdDtcblx0fVxuXG5cdGV4ZWNVcGxvYWRzKGl0ZW0pe1xuXHRcdGxldCBsaXN0ID0gdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRRdWVlJyk7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRpZih0eXBlb2YgbGlzdCAhPT0gJ29iamVjdCcpe1xuXHRcdFx0XHRyZXNvbHZlKGl0ZW0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygndXBsb2FkaW5nJywge30pO1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gbGlzdCl7XG5cdFx0XHRcdFx0bGV0IGZpZWxkRmlsZXMgPSBsaXN0W3RdO1xuXHRcdFx0XHRcdGlmIChmaWVsZEZpbGVzLmxlbmd0aCA+IDEpe1xuXHRcdFx0XHRcdFx0aXRlbVt0XSA9IFtdO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0aXRlbVt0XSA9ICcnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IobGV0IGYgPSAwOyBmIDwgZmllbGRGaWxlcy5sZW5ndGg7IGYrKyl7XG5cdFx0XHRcdFx0XHRpZighdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKS5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0gPSAwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XSsrO1xuXHRcdFx0XHRcdFx0dGhpcy5hcHAuZ2V0V29ya2luZygndXBsb2FkZXInKVxuXHRcdFx0XHRcdFx0XHQudXBsb2FkKGZpZWxkRmlsZXNbZl0pXG5cdFx0XHRcdFx0XHRcdC50aGVuKChzYXZlZEZpbGUpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdmaWxlIHVwbG9hZGVkJywgdCxmLCBzYXZlZEZpbGUpO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0tLTtcblx0XHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdID09PSAwKXtcblx0XHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSB0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZihBcnJheS5pc0FycmF5KGl0ZW1bZl0pKXtcblx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1bdF0ucHVzaChzYXZlZEZpbGUuaGFzaCk7XG5cdFx0XHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtW3RdID0gc2F2ZWRGaWxlLmhhc2g7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmKE9iamVjdC5rZXlzKHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKGl0ZW0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0LmNhdGNoKChlcnIpPT57XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLnJlcG9ydChlcnIpO1xuXHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoT2JqZWN0LmtleXModGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKSkubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRyZXNvbHZlKGl0ZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRvbkFmdGVyUmVuZGVyKCl7XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29udHJvbGxlcjtcbiIsImltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi4vbm90UmVjb3JkJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYID0gJ2Zvcm1fJyxcblx0T1BUX0RFRkFVTFRfUk9MRV9OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9GT1JNX1RJVExFID0gJ0Zvcm0gZGVmYXVsdCB0aXRsZScsXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04gPSB7fSxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QgPSBbJ29wdGlvbnMnLCAnbWFuaWZlc3QnLCAnYXBwJ107XG5cbmNsYXNzIG5vdEZvcm0gZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3ByZWZpeCcsIE9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnRzJywgW10pO1xuXHRcdGlmICghdGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuc2V0RGF0YShuZXcgbm90UmVjb3JkKHt9LCB0aGlzLmdldERhdGEoKSkpO1xuXHRcdH1cblx0XHR0aGlzLm9uKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ3Jlc2V0JywgdGhpcy5vblJlc2V0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NhbmNlbCcsIHRoaXMub25DYW5jZWwuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YSgpIHtcblx0XHRsZXQgbWFuaWZlc3QgPSB0aGlzLmdldE1hbmlmZXN0KCk7XG5cdFx0aWYgKG1hbmlmZXN0ICYmIG1hbmlmZXN0LmFjdGlvbnMpIHtcblx0XHRcdHJldHVybiBtYW5pZmVzdC5hY3Rpb25zLmhhc093blByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJykpID8gbWFuaWZlc3QuYWN0aW9uc1t0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpXSA6IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGdldEZvcm1GaWVsZHNMaXN0KCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCksXG5cdFx0XHRsaXN0ID0gW10sXG5cdFx0XHRyb2xlID0gdGhpcy5nZXRPcHRpb25zKCdyb2xlJywgT1BUX0RFRkFVTFRfUk9MRV9OQU1FKTtcblx0XHRpZiAoYWN0aW9uRGF0YSkge1xuXG5cdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMpIHtcblx0XHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzLmhhc093blByb3BlcnR5KHJvbGUpKSB7XG5cdFx0XHRcdFx0bGlzdCA9IGFjdGlvbkRhdGEuZmllbGRzW3JvbGVdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0Lypcblx0XHRSZW5kZXJpbmdcblx0Ki9cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdH1cblxuXHRnZXRQYXJ0VGVtcGxhdGVOYW1lKGZvcm1QYXJ0KXtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIGZvcm1QYXJ0O1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaW5wdXQgPSB7XG5cdFx0XHRcdGRhdGE6IHRoaXMuZ2V0V3JhcHBlckRhdGEoKSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoJ3dyYXBwZXInKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpLFxuXHRcdFx0XHRcdGlkOiB0aGlzLmdldE9wdGlvbnMoJ2lkJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgdGhpcy5iaW5kRm9ybUV2ZW50cy5iaW5kKHRoaXMpXSxcblx0XHRcdFx0XHRbWydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fTtcblx0XHRcdGxldCB3cmFwcGVyID0gbmV3IG5vdENvbXBvbmVudChpbnB1dCk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3dyYXBwZXInLCB3cmFwcGVyKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXcmFwcGVyRGF0YSgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpO1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogYWN0aW9uRGF0YS50aXRsZSA/IGFjdGlvbkRhdGEudGl0bGUgOiBPUFRfREVGQVVMVF9GT1JNX1RJVExFXG5cdFx0fTtcblx0fVxuXG5cdHJlbmRlckNvbXBvbmVudHMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpICYmIHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aCl7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRGb3JtRmllbGRzTGlzdCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0bGV0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKVt0XTtcblx0XHRcdFx0dGhpcy5hZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsZWFyRmllbGRzQ29tcG9uZW50cygpIHtcblx0XHRsZXQgY29tcHMgPSB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKTtcblx0XHR3aGlsZSAoY29tcHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29tcHNbMF0uY29tcG9uZW50LmRlc3Ryb3koKTtcblx0XHRcdGNvbXBzLnNwbGljZSgwLCAxKTtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHNMaWJzKCl7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdG9wdGlvbnM6IHt9LFxuXHRcdFx0bWFuaWZlc3Q6IHt9LFxuXHRcdFx0YXBwOiB7fSxcblx0XHR9O1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpKSB7XG5cdFx0XHRyZXN1bHQub3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmIChub3RDb21tb24uZ2V0QXBwKCkgJiYgbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpKXtcblx0XHRcdHJlc3VsdC5hcHAgPSBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCAmJiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpKXtcblx0XHRcdHJlc3VsdC5tYW5pZmVzdCA9IHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkuZmllbGRzO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpIHtcblx0XHRsZXQgZGVmID0gT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTixcblx0XHRcdGZpZWxkc0xpYnMgPSB0aGlzLmdldEZpZWxkc0xpYnMoKTtcblx0XHRmb3IobGV0IHQgb2YgT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1Qpe1xuXHRcdFx0aWYgKGZpZWxkc0xpYnMuaGFzT3duUHJvcGVydHkodCkgJiYgZmllbGRzTGlic1t0XS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpKXtcblx0XHRcdFx0cmV0dXJuIGZpZWxkc0xpYnNbdF1bZmllbGROYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSkge1xuXHRcdGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKTtcblx0XHRsZXQgcmVjID0ge1xuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0bmFtZTogZmllbGROYW1lLFxuXHRcdFx0XHR0aXRsZTogZmllbGRUeXBlLmxhYmVsIHx8IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0dHlwZTogZmllbGRUeXBlLnR5cGUsXG5cdFx0XHRcdGxhYmVsOiBmaWVsZFR5cGUubGFiZWwsXG5cdFx0XHRcdGFycmF5OiBmaWVsZFR5cGUuYXJyYXksXG5cdFx0XHRcdGRlZmF1bHQ6IGZpZWxkVHlwZS5kZWZhdWx0LFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMobm90UGF0aC5qb2luKCdoZWxwZXJzJywnbGlicycsZmllbGROYW1lKSlcblx0XHRcdH1cblx0XHR9O1xuXHRcdGxldCBoZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRpc0NoZWNrZWQ6IChwYXJhbXMpPT57XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cblx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoZmllbGRUeXBlLnR5cGUpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRGb3JtVGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0Jyxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbJ2FmdGVyRGF0YUNoYW5nZScsIHRoaXMuY29sbGVjdERhdGFGcm9tQ29tcG9uZW50cy5iaW5kKHRoaXMpXVxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykucHVzaChyZWMpO1xuXHR9XG5cblx0Y29sbGVjdERhdGFGcm9tQ29tcG9uZW50cyhwYXJhbXMpe1xuXHRcdG5vdENvbW1vbi5sb2coJ2NvbGxlY3QgZGF0YSBmcm9tIGNvbXBvbmVudHMnLCBwYXJhbXMpO1xuXHR9XG5cblx0Z2V0Rm9ybVRhcmdldEVsZW1lbnQodGFyZ2V0ID0gJ2JvZHknKXtcblx0XHRpZiAoIXRhcmdldCl7dGFyZ2V0ID0gJ2JvZHknO31cblx0XHRsZXQgcmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHRpZiAoIXJlcyAmJiB0YXJnZXQhPT0nYm9keScpe1xuXHRcdFx0dGFyZ2V0ID0gJ2JvZHknO1xuXHRcdFx0cmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHR9XG5cdFx0aWYoIXJlcyAmJiB0YXJnZXQ9PSdib2R5Jyl7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdGNvbGxlY3REYXRhKCkge1xuXHRcdC8vbGV0IGRhdGEgPSB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKTtcblx0fVxuXG5cdGJpbmRGb3JtRXZlbnRzKCl7XG5cdFx0bGV0IHRhcmdldFF1ZXJ5ID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpO1xuXHRcdGlmKHRhcmdldFF1ZXJ5KXtcblx0XHRcdGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFF1ZXJ5KTtcblx0XHRcdGlmKHRhcmdldCl7XG5cdFx0XHRcdHRoaXMuc2V0T3B0aW9ucygndGFyZ2V0RWwnLCB0YXJnZXQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKXtcblx0XHRcdGxldFx0Zm9ybSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG5cdFx0XHRpZihmb3JtKXtcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXHRcdFx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2V0JywgdGhpcy5vblJlc2V0LmJpbmQodGhpcykpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZUZpZWxkKGZpZWxkTmFtZSl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5maWVsZC5uYW1lID09PSBmaWVsZE5hbWUpe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdEV2ZW50IGhhbmRsZXJzXG5cdCovXG5cblx0b25TdWJtaXQoKSB7XG5cblx0fVxuXG5cdG9uQ2FuY2VsKCkge1xuXG5cdH1cblxuXHRvblJlc2V0KCkge1xuXG5cdH1cblxuXHRnZXRGaWVsZHMoKSB7XG5cblx0fVxuXG5cdGFkZEZpZWxkKCkge1xuXG5cdH1cblxuXHRyZW1vdmVGaWVsZCgpIHtcblxuXHR9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RGb3JtO1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL25vdEZvcm0uanMnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9WSUVXID0gJ2VkaXQnO1xuXG5jbGFzcyBDUlVEQ3JlYXRlIGV4dGVuZHMgbm90Q29udHJvbGxlcntcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpe1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIENyZWF0ZScpO1xuXHRcdHRoaXMuc2V0Vmlld3Moe1xuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRuYW1lOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmNvbW1vbicpIHx8IHRydWUsXG5cdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuXHRcdFx0XHRoZWxwZXJzOiB7fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUucHJlbG9hZCcpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlckZvcm0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpe1xuXHRcdHJldHVybiB0aGlzLnJlbmRlcignZGVmYXVsdCcsIHt9LCB7fSk7XG5cdH1cblxuXHRyZW5kZXJGb3JtKCl7XG5cdFx0dGhpcy5uZXdJdGVtID0gdGhpcy5wYXJlbnQuaW5pdEl0ZW0oKTtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHRyeXtcblx0XHRcdFx0dGhpcy5mb3JtID0gbmV3IG5vdEZvcm0oe1xuXHRcdFx0XHRcdGRhdGE6IHRoaXMubmV3SXRlbSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRhY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5hY3Rpb24nKSxcblx0XHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS50YXJnZXRRdWVyeScpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpKSxcblx0XHRcdFx0XHRcdHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnByZWZpeCcpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdwcmVmaXgnKSxcblx0XHRcdFx0XHRcdHJvbGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5yb2xlJyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0XHRcdFx0XHRmaWxlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGZpbGVzID0gcGFyYW1zLmUudGFyZ2V0LmZpbGVzIHx8IHBhcmFtcy5lLmRhdGFUcmFuc2Zlci5maWxlcztcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdmaWxlIGNoYW5nZWQnLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0aWYocGFyYW1zLmhlbHBlcnMuZmllbGQubmFtZSAmJiBmaWxlcyl7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnF1ZWVVcGxvYWQocGFyYW1zLmhlbHBlcnMuZmllbGQubmFtZSwgZmlsZXMpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0c3VibWl0OiAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnc3VibWl0IGZvcm0gJywgdGhpcy5uZXdJdGVtKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmV4ZWNVcGxvYWRzKHRoaXMubmV3SXRlbSlcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHRoaXMuY3JlYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRhZnRlclN1Ym1pdDogKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZ29Ub1RhYmxlKCk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGxpYnM6ICB0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKSxcblx0XHRcdFx0XHRcdH0sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5oZWxwZXJzJykgfHwge30pXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXSxcblx0XHRcdFx0XHRcdFtbJ2FmdGVyU3VibWl0JywgJ2FmdGVyUmVzdG9yZSddLCB0aGlzLmJhY2tUb0xpc3QuYmluZCh0aGlzKV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fWNhdGNoKGUpe1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRiYWNrVG9MaXN0KCl7XG5cdFx0dGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSk7XG5cdH1cblxuXHRjcmVhdGUoaXRlbSkge1xuXHRcdGl0ZW1bJyQnK3RoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5hY3Rpb24nKV0oKVxuXHRcdFx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdmb3JtIHNhdmVkJywgcmVzdWx0KTtcblx0XHRcdFx0dGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChyZXN1bHQpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdmb3JtIG5vdCBzYXZlZCcsIHJlc3VsdCk7XG5cdFx0XHR9KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURDcmVhdGU7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9QQUdFX1NJWkUgPSAyMCxcblx0T1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIgPSAwLFxuXHRPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTiA9IDEsXG5cdE9QVF9ERUZBVUxUX1NPUlRfRklFTEQgPSAnX2lkJyxcblx0T1BUX0ZJRUxEX05BTUVfUFJFX1BST0MgPSAncHJlcHJvY2Vzc29yJztcblxuY2xhc3Mgbm90VGFibGUgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCBbXSk7XG5cdFx0aWYoIXRoaXMuZ2V0RGF0YSgpIHx8ICFBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgncm93cycpKSl7XG5cdFx0XHR0aGlzLnNldERhdGEoe3Jvd3M6W119KTtcblx0XHR9XG5cdFx0dGhpcy5yZXNldFBhZ2VyKCk7XG5cdFx0dGhpcy5yZXNldEZpbHRlcigpO1xuXHRcdHRoaXMucmVzZXRTb3J0ZXIoKTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudCcpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgY29tcG9uZW50ID0gbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6ICd0YWJsZV93cmFwcGVyJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0cmVuZGVyQW5kOiB0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckluc2lkZS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHRdXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgY29tcG9uZW50KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJJbnNpZGUoKSB7XG5cdFx0dGhpcy5yZW5kZXJIZWFkZXIoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0XHR0aGlzLnJlbmRlckJvZHkoKTtcblx0XHR0aGlzLmJpbmRTZWFyY2goKTtcblx0XHR0aGlzLmJpbmRDdXN0b21CaW5kaW5ncygpO1xuXHR9XG5cblx0cmVuZGVySGVhZGVyKCkge1xuXHRcdHZhciB0YWJsZUhlYWRlciA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCd0aGVhZCB0cicpO1xuXHRcdGlmICghdGFibGVIZWFkZXIpIHJldHVybjtcblx0XHRsZXQgZmllbGRzID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG5ld1RoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEgnKTtcblx0XHRcdG5ld1RoLmlubmVySFRNTCA9IGZpZWxkc1tpXS50aXRsZTtcblx0XHRcdGlmIChmaWVsZHNbaV0uaGFzT3duUHJvcGVydHkoJ3NvcnRhYmxlJykgJiYgZmllbGRzW2ldLnNvcnRhYmxlKSB7XG5cdFx0XHRcdHRoaXMuYXR0YWNoU29ydGluZ0hhbmRsZXJzKG5ld1RoLCBmaWVsZHNbaV0ucGF0aCk7XG5cdFx0XHR9XG5cdFx0XHR0YWJsZUhlYWRlci5hcHBlbmRDaGlsZChuZXdUaCk7XG5cdFx0fVxuXHR9XG5cblx0YXR0YWNoU29ydGluZ0hhbmRsZXJzKGhlYWRDZWxsLCBmaWVsZE5hbWUpIHtcblx0XHRoZWFkQ2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLmNoYW5nZVNvcnRpbmdPcHRpb25zKGhlYWRDZWxsLCBmaWVsZE5hbWUpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHRcdGhlYWRDZWxsLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0fVxuXG5cdGNoYW5nZVNvcnRpbmdPcHRpb25zKGVsLCBmaWVsZE5hbWUpIHtcblx0XHRpZiAoZmllbGROYW1lID09PSB0aGlzLmdldFNvcnRlcigpLnNvcnRCeUZpZWxkKXtcblx0XHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdFx0c29ydEJ5RmllbGQ6IGZpZWxkTmFtZSxcblx0XHRcdFx0c29ydERpcmVjdGlvbjogLTEgKiB0aGlzLmdldFNvcnRlcigpLnNvcnREaXJlY3Rpb24sXG5cdFx0XHR9KTtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdFx0c29ydEJ5RmllbGQ6IGZpZWxkTmFtZSxcblx0XHRcdFx0c29ydERpcmVjdGlvbjogT1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04sXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0aWYgKGVsLnBhcmVudE5vZGUpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWwucGFyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXSA9PT0gZWwpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnbm9uZScpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5nZXRTb3J0ZXIoKS5zb3J0RGlyZWN0aW9uID4gMCkge1xuXHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnYXNjZW5kaW5nJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ2Rlc2NlbmRpbmcnKTtcblx0XHR9XG5cdH1cblxuXHRzZXRTb3J0ZXIoaGFzaCkge1xuXHRcdC8vY29uc29sZS5sb2coJ3NldFNvcnRlcicsIGhhc2gpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnc29ydGVyJywgaGFzaCk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlRGF0YSgpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRTb3J0ZXIoKXtcblx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRzb3J0QnlGaWVsZDogT1BUX0RFRkFVTFRfU09SVF9GSUVMRCxcblx0XHRcdHNvcnREaXJlY3Rpb246IE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3NvcnRlcicpO1xuXHR9XG5cblx0Z2V0RmlsdGVyU2VhcmNoKCkge1xuXHRcdHJldHVybiAodHlwZW9mIHRoaXMuZ2V0RmlsdGVyKCkgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0RmlsdGVyKCkgIT09IG51bGwgJiYgdHlwZW9mIHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaCAhPT0gbnVsbCkgPyB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaC50b1N0cmluZygpIDogJyc7XG5cdH1cblxuXHRpbnZhbGlkYXRlRGF0YSgpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdsaXZlTG9hZCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnb25lUGFnZXInKSkge1xuXHRcdFx0d2hpbGUodGhpcy5nZXREYXRhKCdyb3dzJykubGVuZ3RoPjApe1xuXHRcdFx0XHR0aGlzLmdldERhdGEoJ3Jvd3MnKS5wb3AoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMucmVzZXRQYWdlcigpO1xuXHRcdH1cblx0fVxuXG5cdHNldEZpbHRlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXInLCBoYXNoKTtcblx0XHR0aGlzLmludmFsaWRhdGVEYXRhKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHR0aGlzLnNldEZpbHRlcih7fSk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyJyk7XG5cdH1cblxuXHRzZXRQYWdlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdwYWdlcicsIGhhc2gpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3BhZ2VyJywge1xuXHRcdFx0cGFnZVNpemU6IGlzTmFOKHRoaXMuZ2V0T3B0aW9ucygncGFnZVNpemUnKSkgPyBPUFRfREVGQVVMVF9QQUdFX1NJWkU6dGhpcy5nZXRPcHRpb25zKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogaXNOYU4odGhpcy5nZXRPcHRpb25zKCdwYWdlTnVtYmVyJykpID8gT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVI6dGhpcy5nZXRPcHRpb25zKCdwYWdlTnVtYmVyJyksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwYWdlcicpO1xuXHR9XG5cblx0c2V0VXBkYXRpbmcoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd1cGRhdGluZycsIHRydWUpO1xuXHR9XG5cblx0c2V0VXBkYXRlZCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwZGF0aW5nJywgZmFsc2UpO1xuXHR9XG5cblx0aWZVcGRhdGluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd1cGRhdGluZycpO1xuXHR9XG5cblx0dXBkYXRlRGF0YSgpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdsaXZlTG9hZCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlJykpIHtcblx0XHRcdGlmICh0aGlzLmlmVXBkYXRpbmcoKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvL2xvYWQgZnJvbSBzZXJ2ZXJcblx0XHRcdGxldCBxdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlJykoe30pXG5cdFx0XHRcdC5zZXRGaWx0ZXIodGhpcy5nZXRGaWx0ZXIoKSlcblx0XHRcdFx0LnNldFNvcnRlcih0aGlzLmdldFNvcnRlcigpKVxuXHRcdFx0XHQuc2V0UGFnZXIodGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplLCB0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlcik7XG5cdFx0XHR0aGlzLnNldFVwZGF0aW5nKCk7XG5cdFx0XHRxdWVyeS4kbGlzdCgpXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnJGxpc3QgZm9yIHRhYmxlJywgZGF0YSk7XG5cdFx0XHRcdFx0dGhpcy5zZXREYXRhKHtcblx0XHRcdFx0XHRcdHJvd3M6IHRoaXMuZ2V0RGF0YSgncm93cycpLmNvbmNhdChkYXRhKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHRoaXMucHJvY2Nlc3NEYXRhKCk7XG5cdFx0XHRcdFx0dGhpcy5yZWZyZXNoQm9keSgpO1xuXHRcdFx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoZSk7XG5cdFx0XHRcdFx0dGhpcy5zZXRVcGRhdGVkKCk7XG5cdFx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvL2xvY2FsIG1hZ2ljXG5cdFx0XHR0aGlzLnNldFVwZGF0aW5nKCk7XG5cdFx0XHR0aGlzLnByb2NjZXNzRGF0YSgpO1xuXHRcdFx0dGhpcy5yZWZyZXNoQm9keSgpO1xuXHRcdFx0dGhpcy5zZXRVcGRhdGVkKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJvY2Nlc3NEYXRhKCkge1xuXHRcdHZhciB0aGF0RmlsdGVyID0gdGhpcy5nZXRGaWx0ZXIoKTtcblx0XHRpZiAodHlwZW9mIHRoYXRGaWx0ZXIgIT09ICd1bmRlZmluZWQnICYmIHRoYXRGaWx0ZXIgIT09IG51bGwgJiYgdHlwZW9mIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gbnVsbCAmJiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaC5sZW5ndGggPiAwKSB7XG5cdFx0XHQvL1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKS5maWx0ZXIodGhpcy50ZXN0RGF0YUl0ZW0uYmluZCh0aGlzKSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIHRoaXMuZ2V0RGF0YSgncm93cycpKTtcblx0XHR9XG5cdFx0Ly8vL3NvcnRlclxuXHRcdHZhciB0aGF0U29ydGVyID0gdGhpcy5nZXRTb3J0ZXIoKTtcblx0XHRpZiAodHlwZW9mIHRoYXRTb3J0ZXIgIT09ICd1bmRlZmluZWQnICYmIHRoYXRTb3J0ZXIgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykuc29ydCgoaXRlbTEsIGl0ZW0yKSA9PiB7XG5cdFx0XHRcdGxldCB0MSA9IG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsIGl0ZW0xLCB7fSksXG5cdFx0XHRcdFx0dDIgPSBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLGl0ZW0yLHt9KTtcblx0XHRcdFx0aWYgKGlzTmFOKHQxKSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdDEgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0MiAhPT0gJ3VuZGVmaW5lZCcgJiYgdDEubG9jYWxlQ29tcGFyZSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdDEubG9jYWxlQ29tcGFyZSgpICogLSB0aGF0U29ydGVyLnNvcnREaXJlY3Rpb247XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuICgodDEgPCB0MikgPyAxIDogLTEpICogdGhhdFNvcnRlci5zb3J0RGlyZWN0aW9uO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRiaW5kU2VhcmNoKCkge1xuXHRcdHZhciBzZWFyY2hFbCA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwic2VhcmNoXCJdJylbMF07XG5cdFx0aWYgKCFzZWFyY2hFbCkgcmV0dXJuO1xuXHRcdHZhciBvbkV2ZW50ID0gKGUpID0+IHtcblx0XHRcdHRoaXMuc2V0RmlsdGVyKHtcblx0XHRcdFx0ZmlsdGVyU2VhcmNoOiBlLmN1cnJlbnRUYXJnZXQudmFsdWVcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblx0XHRzZWFyY2hFbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uRXZlbnQpO1xuXHRcdHNlYXJjaEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2VudGVyJywgb25FdmVudCk7XG5cdH1cblxuXG5cdGJpbmRDdXN0b21CaW5kaW5ncygpIHtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSB8fCAhdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGZvciAodmFyIHNlbGVjdG9yIGluIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSkge1xuXHRcdFx0dmFyIGVscyA9IHRoaXMuZ2V0T3B0aW9uKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0Zm9yICh2YXIgZWxJZCA9IDA7IGVsSWQgPCBlbHMubGVuZ3RoOyBlbElkKyspIHtcblx0XHRcdFx0dmFyIGVsID0gZWxzW2VsSWRdO1xuXHRcdFx0XHRmb3IgKHZhciBldmVudCBpbiB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJylbc2VsZWN0b3JdKSB7XG5cdFx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpW3NlbGVjdG9yXVtldmVudF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bG9hZE5leHQoKSB7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdwYWdlcicpLnBhZ2VOdW1iZXIrKztcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlbmRlclJvdyhpdGVtLCBpbmRleCkge1xuXHRcdGxldCBuZXdSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUUicpLFxuXHRcdFx0ZmllbGRzID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IG5ld1RkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEQnKSxcblx0XHRcdFx0ZmllbGQgPSBmaWVsZHNbaV0sXG5cdFx0XHRcdHByZXByb2Nlc3NlZCA9IG51bGwsXG5cdFx0XHRcdHZhbCA9IG5vdFBhdGguZ2V0KGZpZWxkLnBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZWRpdGFibGUnKSAmJiAhZmllbGQuaGFzT3duUHJvcGVydHkoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHRcdG5ld1RkLnNldEF0dHJpYnV0ZSgnY29udGVudEVkaXRhYmxlJywgdHJ1ZSk7XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQucGF0aCA9IGZpZWxkLnBhdGg7XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQuaXRlbUlkID0gaXRlbVt0aGlzLmdldE9wdGlvbnMoJ2l0ZW1JZEZpZWxkJyldO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0LnZhbHVlID0gdmFsO1xuXHRcdFx0XHRuZXdUZC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCk9Pntcblx0XHRcdFx0XHRub3RQYXRoLnNldChmaWVsZC5wYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSwgbmV3VGQudGV4dENvbnRlbnQpO1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eShPUFRfRklFTERfTkFNRV9QUkVfUFJPQykpIHtcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gZmllbGRbT1BUX0ZJRUxEX05BTUVfUFJFX1BST0NdKHZhbCwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdjb21wb25lbnQnKSkge1xuXHRcdFx0XHRuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0XHRkYXRhOiBmaWVsZC5jb21wb25lbnQuZGF0YSB8fCBwcmVwcm9jZXNzZWQgfHwge3ZhbCwgaXRlbSwgaW5kZXh9LFxuXHRcdFx0XHRcdHRlbXBsYXRlOiBmaWVsZC5jb21wb25lbnQudGVtcGxhdGUsXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IG5ld1RkLFxuXHRcdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogZmllbGQuY29tcG9uZW50LmV2ZW50cyB8fCBbXVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ld1RkLmlubmVySFRNTCA9IHByZXByb2Nlc3NlZCB8fCB2YWw7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2V2ZW50cycpICYmIGZpZWxkLmV2ZW50cykge1xuXHRcdFx0XHRmb3IgKHZhciBqIGluIGZpZWxkLmV2ZW50cykge1xuXHRcdFx0XHRcdG5ld1RkLmFkZEV2ZW50TGlzdGVuZXIoaiwgKGUpPT57XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmllbGQuZXZlbnRzW2pdKHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQ6IGUsXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQ6IG5ld1RkLFxuXHRcdFx0XHRcdFx0XHRpdGVtOiBpdGVtLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdmFsLFxuXHRcdFx0XHRcdFx0XHRmaWVsZDogZmllbGRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bmV3Um93LmFwcGVuZENoaWxkKG5ld1RkKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygncHJvY1JvdycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcm9jUm93JykobmV3Um93LCBpdGVtKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Jvdztcblx0fVxuXG5cdHJlZnJlc2hCb2R5KCkge1xuXHRcdHZhciB0Ym9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRib2R5KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuY2xlYXJCb2R5KCk7XG5cdFx0dGhpcy5jaGVja0ZpbHRlcmVkKCk7XG5cdFx0dmFyIHRoaXNQYWdlU3RhcnRzID0gMCxcblx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpO1xuXHRcdGZvciAodmFyIGkgPSB0aGlzUGFnZVN0YXJ0czsgaSA8IE1hdGgubWluKG5leHRQYWdlRW5kcywgdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5sZW5ndGgpOyBpKyspIHtcblx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHR9XG5cdH1cblxuXHRmaW5kQm9keSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG5cdH1cblxuXHRjbGVhckJvZHkoKSB7XG5cdFx0dmFyIHRhYmxlQm9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRhYmxlQm9keSkgcmV0dXJuO1xuXHRcdHRhYmxlQm9keS5pbm5lckhUTUwgPSAnJztcblx0fVxuXG5cdGNoZWNrRmlsdGVyZWQoKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKSkpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLFtdKTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJCb2R5KCkge1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpKSB7XG5cdFx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdH1cblx0XHR0aGlzLmNoZWNrRmlsdGVyZWQoKTtcblx0XHR2YXIgdGhpc1BhZ2VTdGFydHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpLFxuXHRcdFx0bmV4dFBhZ2VFbmRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyICsgMSksXG5cdFx0XHR0Ym9keSA9IHRoaXMuZmluZEJvZHkoKTtcblxuXHRcdGZvciAodmFyIGkgPSB0aGlzUGFnZVN0YXJ0czsgaSA8IE1hdGgubWluKG5leHRQYWdlRW5kcywgdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5sZW5ndGgpOyBpKyspIHtcblx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHR9XG5cdH1cblxuXHR0ZXN0RGF0YUl0ZW0oaXRlbSl7XG5cdFx0dmFyIHN0clZhbHVlID0gdGhpcy5nZXRGaWx0ZXJTZWFyY2goKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGZvcih2YXIgayBpbiBpdGVtKXtcblx0XHRcdHZhciB0b0NvbXAgPSBpdGVtW2tdLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmICh0b0NvbXAuaW5kZXhPZihzdHJWYWx1ZSk+LTEpe1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFRhYmxlO1xuIiwiaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4uL2NvbXBvbmVudHMvbm90VGFibGUuanMnO1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9QX0RFRkFVTFRfUEFHRV9TSVpFID0gNTAsXG5cdE9QVF9ERUZBVUxUX1ZJRVcgPSAnbGlzdCc7XG5cbmNsYXNzIENSVURMaXN0IGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKSB7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgTGlzdCcpO1xuXHRcdHRoaXMuc2V0Vmlld3Moe1xuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRuYW1lOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0Lm5hbWUnKSB8fCBPUFRfREVGQVVMVF9WSUVXLFxuXHRcdFx0XHRjb21tb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuY29tbW9uJykgfHwgdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0UXVlcnk6IHBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmNvbnRhaW5lclNlbGVjdG9yJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSxcblx0XHRcdFx0aGVscGVyczoge31cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlcldyYXBwZXIuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMudXBkYXRlRGF0YXRhYmxlLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0Jywge30sIHtcblx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5wbHVyYWwnKSxcblx0XHRcdHNob3dBZGRGb3JtOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZShbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpLCAnY3JlYXRlJ10uam9pbignLycpKTtcblx0XHRcdH0sXG5cdFx0XHRnZXRMaW5rVG9WaWV3OiAoKSA9PiB7XG5cdFx0XHRcdHJldHVybiAnLycgKyB0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVEYXRhdGFibGUoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeXtcblx0XHRcdFx0dGhpcy50YWJsZVZpZXcgPSBuZXcgbm90VGFibGUoe1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGZpZWxkczogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5maWVsZHMnKSxcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ25hbWVzLnBsdXJhbCcpXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmhlbHBlcnMnKSB8fCB7fSksXG5cdFx0XHRcdFx0XHRwYWdlU2l6ZTogdGhpcy5hcHAuZ2V0T3B0aW9ucygncGFnZXIuc2l6ZScpIHx8IE9QX0RFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0XHRcdFx0cGFnZU51bWJlcjogMCxcblx0XHRcdFx0XHRcdG9uZVBhZ2VyOiB0cnVlLFxuXHRcdFx0XHRcdFx0bGl2ZUxvYWQ6IHRydWUsXG5cdFx0XHRcdFx0XHRpbnRlcmZhY2U6IHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHNob3dOZXh0UGFnZSgpIHtcblx0XHRpZiAodGhpcy50YWJsZVZpZXcpIHtcblx0XHRcdHRoaXMudGFibGVWaWV3LmxvYWROZXh0KCk7XG5cdFx0fVxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRExpc3Q7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvbm90Rm9ybS5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OID0gJ2dldFJhdycsXG5cdE9QVF9ERUZBVUxUX0FDVElPTiA9ICd1cGRhdGUnLFxuXHRPUFRfREVGQVVMVF9WSUVXID0gJ2VkaXQnO1xuXG5jbGFzcyBDUlVEVXBkYXRlIGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKSB7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgVXBkYXRlJyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuY29tbW9uJykgfHwgdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG5cdFx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMubG9hZEl0ZW0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlckZvcm0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bG9hZEl0ZW0oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKHtcblx0XHRcdCdfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJylcblx0XHR9KVsnJCcrKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5sb2FkQWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04pXSgpO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoJ2RlZmF1bHQnLCB0aGlzLmdldERhdGEoKSwge30pO1xuXHR9XG5cblx0cmVuZGVyRm9ybSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHRyeXtcblx0XHRcdFx0dGhpcy5mb3JtID0gbmV3IG5vdEZvcm0oe1xuXHRcdFx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGFjdGlvbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0FDVElPTixcblx0XHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRcdHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnByZWZpeCcpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdwcmVmaXgnKSxcblx0XHRcdFx0XHRcdHJvbGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5yb2xlJyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcblx0XHRcdFx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0XHRcdFx0aGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRcdGZpbGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgZmlsZXMgPSBwYXJhbXMuZS50YXJnZXQuZmlsZXMgfHwgcGFyYW1zLmUuZGF0YVRyYW5zZmVyLmZpbGVzO1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2ZpbGUgY2hhbmdlZCcsIGZpbGVzKTtcblx0XHRcdFx0XHRcdFx0XHRpZihwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lICYmIGZpbGVzKXtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucXVlZVVwbG9hZChwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRzdWJtaXQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdzdWJtaXQgZm9ybSAnLCBwYXJhbXMuaXRlbSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5leGVjVXBsb2FkcyhwYXJhbXMuaXRlbSlcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRsaWJzOiB0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKSxcblx0XHRcdFx0XHRcdFx0YWZ0ZXJTdWJtaXQ6IHRoaXMuYmFja1RvTGlzdC5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdFx0fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmhlbHBlcnMnKSB8fCB7fSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0XHRbJ2FmdGVyUmVzdG9yZScsICdhZnRlclN1Ym1pdCddLCB0aGlzLmJhY2tUb0xpc3QuYmluZCh0aGlzKVxuXHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZShpdGVtKSB7XG5cdFx0aXRlbVsnJCcrKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5hY3Rpb24nKXx8T1BUX0RFRkFVTFRfQUNUSU9OKV0oKVxuXHRcdFx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdmb3JtIHNhdmVkJywgcmVzdWx0KTtcblx0XHRcdFx0dGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMuZ2V0TW9kdWxlTmFtZSgpKTtcblx0XHRcdFx0dGhpcy5wYXJlbnQucnVuTGlzdCgpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZm9ybSBub3Qgc2F2ZWQnLCByZXN1bHQpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRiYWNrVG9MaXN0KCkge1xuXHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURVcGRhdGU7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BUX0RFRkFVTFRfQUNUSU9OID0gJ2RlbGV0ZSc7XG5cbmNsYXNzIENSVUREZWxldGUgZXh0ZW5kcyBub3RDb250cm9sbGVye1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcyl7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgRGVsZXRlJyk7XG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRlbGV0ZS5wcmVsb2FkJykpXG5cdFx0XHQudGhlbigoKT0+e1xuXHRcdFx0XHRpZiAoY29uZmlybSgn0KPQtNCw0LvQuNGC0Ywg0LfQsNC/0LjRgdGMPycpKSB7XG5cdFx0XHRcdFx0dGhpcy5kZWxldGUoKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dGhpcy5iYWNrVG9MaXN0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRiYWNrVG9MaXN0KCl7XG5cdFx0dGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSk7XG5cdH1cblxuXHRkZWxldGUoKSB7XG5cdFx0bGV0IGFjdGlvbiA9JyQnKyh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZWxldGUuYWN0aW9uJyl8fE9QVF9ERUZBVUxUX0FDVElPTik7XG5cdFx0dGhpcy5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0oeydfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJyl9KVthY3Rpb25dKClcblx0XHRcdC50aGVuKHRoaXMuYmFja1RvTGlzdC5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRERlbGV0ZTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYID0gJ2RldGFpbHNfJyxcblx0T1BUX0RFRkFVTFRfUk9MRV9OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9ERVRBSUxTX1RJVExFID0gJ0RldGFpbHMgZGVmYXVsdCB0aXRsZScsXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04gPSB7fSxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QgPSBbJ29wdGlvbnMnLCAnbWFuaWZlc3QnLCAnYXBwJ107XG5cbmNsYXNzIG5vdERldGFpbHMgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3ByZWZpeCcsIE9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnRzJywgW10pO1xuXHRcdGlmICghdGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuc2V0RGF0YShuZXcgbm90UmVjb3JkKHt9LCB0aGlzLmdldERhdGEoKSkpO1xuXHRcdH1cblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCk7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKCkge1xuXHRcdGxldCBtYW5pZmVzdCA9IHRoaXMuZ2V0TWFuaWZlc3QoKTtcblx0XHRpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QuYWN0aW9ucykge1xuXHRcdFx0cmV0dXJuIG1hbmlmZXN0LmFjdGlvbnMuaGFzT3duUHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKSkgPyBtYW5pZmVzdC5hY3Rpb25zW3RoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJyldIDogbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlzdCgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0cm9sZSA9IHRoaXMuZ2V0T3B0aW9ucygncm9sZScsIE9QVF9ERUZBVUxUX1JPTEVfTkFNRSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpIHtcblx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcykge1xuXHRcdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMuaGFzT3duUHJvcGVydHkocm9sZSkpIHtcblx0XHRcdFx0XHRsaXN0ID0gYWN0aW9uRGF0YS5maWVsZHNbcm9sZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdH1cblxuXHRnZXRQYXJ0VGVtcGxhdGVOYW1lKGZvcm1QYXJ0KXtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIGZvcm1QYXJ0O1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaW5wdXQgPSB7XG5cdFx0XHRcdGRhdGE6IHRoaXMuZ2V0V3JhcHBlckRhdGEoKSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoJ3dyYXBwZXInKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpLFxuXHRcdFx0XHRcdGlkOiB0aGlzLmdldE9wdGlvbnMoJ2lkJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbWydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fTtcblx0XHRcdGxldCB3cmFwcGVyID0gbmV3IG5vdENvbXBvbmVudChpbnB1dCk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3dyYXBwZXInLCB3cmFwcGVyKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXcmFwcGVyRGF0YSgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpO1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogYWN0aW9uRGF0YS50aXRsZSA/IGFjdGlvbkRhdGEudGl0bGUgOiBPUFRfREVGQVVMVF9ERVRBSUxTX1RJVExFXG5cdFx0fTtcblx0fVxuXG5cdHJlbmRlckNvbXBvbmVudHMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpICYmIHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aCl7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRGaWVsZHNMaXN0KCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRsZXQgZmllbGROYW1lID0gdGhpcy5nZXRGaWVsZHNMaXN0KClbdF07XG5cdFx0XHRcdHRoaXMuYWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGVhckZpZWxkc0NvbXBvbmVudHMoKSB7XG5cdFx0bGV0IGNvbXBzID0gdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJyk7XG5cdFx0d2hpbGUgKGNvbXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbXBzWzBdLmNvbXBvbmVudC5kZXN0cm95KCk7XG5cdFx0XHRjb21wcy5zcGxpY2UoMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlicygpe1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRvcHRpb25zOiB7fSxcblx0XHRcdG1hbmlmZXN0OiB7fSxcblx0XHRcdGFwcDoge30sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAobm90Q29tbW9uLmdldEFwcCgpICYmIG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKSl7XG5cdFx0XHRyZXN1bHQuYXBwID0gbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQgJiYgdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKSl7XG5cdFx0XHRyZXN1bHQubWFuaWZlc3QgPSB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpLmZpZWxkcztcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSB7XG5cdFx0bGV0IGRlZiA9IE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04sXG5cdFx0XHRmaWVsZHNMaWJzID0gdGhpcy5nZXRGaWVsZHNMaWJzKCk7XG5cdFx0Zm9yKGxldCB0IG9mIE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUKXtcblx0XHRcdGlmIChmaWVsZHNMaWJzLmhhc093blByb3BlcnR5KHQpICYmIGZpZWxkc0xpYnNbdF0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSl7XG5cdFx0XHRcdHJldHVybiBmaWVsZHNMaWJzW3RdW2ZpZWxkTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkZWY7XG5cdH1cblxuXHRhZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpIHtcblx0XHRsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSk7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGdldFRhcmdldEVsZW1lbnQodGFyZ2V0ID0gJ2JvZHknKXtcblx0XHRpZiAoIXRhcmdldCl7dGFyZ2V0ID0gJ2JvZHknO31cblx0XHRsZXQgcmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHRpZiAoIXJlcyAmJiB0YXJnZXQhPT0nYm9keScpe1xuXHRcdFx0dGFyZ2V0ID0gJ2JvZHknO1xuXHRcdFx0cmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHR9XG5cdFx0aWYoIXJlcyAmJiB0YXJnZXQ9PSdib2R5Jyl7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdHVwZGF0ZUZpZWxkKGZpZWxkTmFtZSl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5maWVsZC5uYW1lID09PSBmaWVsZE5hbWUpe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3REZXRhaWxzO1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90RGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL25vdERldGFpbHMuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTiA9ICdnZXQnLFxuXHRPUFRfREVGQVVMVF9WSUVXID0gJ2RldGFpbHMnO1xuXG5jbGFzcyBDUlVERGV0YWlscyBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIERldGFpbHMnKTtcblx0XHR0aGlzLnNldFZpZXdzKHtcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmNvbW1vbicpIHx8IHRydWUsXG5cdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmNvbnRhaW5lclNlbGVjdG9yJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSxcblx0XHRcdFx0aGVscGVyczoge31cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMubG9hZEl0ZW0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlckRldGFpbHMuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bG9hZEl0ZW0oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKHtcblx0XHRcdCdfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJylcblx0XHR9KVsnJCcgKyAodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTildKCk7XG5cdH1cblxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0bGV0IGl0ZW0gPSB0aGlzLmdldERhdGEoKTtcblx0XHR2YXIgaGVscGVycyA9IHtcblx0XHRcdElEOiBpdGVtID8gaXRlbVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkgKyAnSUQnXSA6ICcnLFxuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0YXJyYXk6IGZhbHNlXG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKFt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCksIHBhcmFtcy5pdGVtLl9pZCwgJ3VwZGF0ZSddLmpvaW4oJy8nKSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKFt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCksIHBhcmFtcy5pdGVtLl9pZCwgJ2RlbGV0ZSddLmpvaW4oJy8nKSk7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0TGlua1RvVGFibGU6ICgpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLmdldEZ1bGxSb3V0ZSh0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkpO1xuXHRcdFx0fSxcblx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5zaW5nbGUnKVxuXHRcdH07XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0JywgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRyZW5kZXJEZXRhaWxzKCkge1xuXHRcdGxldCBpdGVtID0gdGhpcy5nZXREYXRhKCk7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdG5ldyBub3REZXRhaWxzKHtcblx0XHRcdFx0XHRkYXRhOiBpdGVtLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnRhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnRhcmdldFF1ZXJ5Jyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JykpLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OLFxuXHRcdFx0XHRcdFx0cHJlZml4OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnByZWZpeCcpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdwcmVmaXgnKSxcblx0XHRcdFx0XHRcdHJvbGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMucm9sZScpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdyb2xlJyksXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdFx0bGliczogdGhpcy5nZXRPcHRpb25zKCdsaWInKSxcblx0XHRcdFx0XHRcdFx0SUQ6IGl0ZW1bdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICsgJ0lEJ10sXG5cdFx0XHRcdFx0XHRcdF9fdmVyc2lvbjogaXRlbS5fX3ZlcnNpb24sXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmhlbHBlcnMnKSB8fCB7fSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHJlc29sdmVdXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmVqZWN0KGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YmFja1RvTGlzdCgpIHtcblx0XHR0aGlzLmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRERldGFpbHM7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBDUlVEQ3JlYXRlIGZyb20gJy4vQ3JlYXRlJztcbmltcG9ydCBDUlVETGlzdCBmcm9tICcuL0xpc3QnO1xuaW1wb3J0IENSVURVcGRhdGUgZnJvbSAnLi9VcGRhdGUnO1xuaW1wb3J0IENSVUREZWxldGUgZnJvbSAnLi9EZWxldGUnO1xuaW1wb3J0IENSVUREZXRhaWxzIGZyb20gJy4vRGV0YWlscyc7XG5cblxuY2xhc3MgQ1JVRENvbnRyb2xsZXIgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoYXBwLCBwYXJhbXMpIHtcblx0XHRub3RDb21tb24ubG9nKCdydW5uaW5nIENSVURDb250cm9sbGVyJyk7XG5cdFx0c3VwZXIoYXBwKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ25hbWVzJywge1xuXHRcdFx0cGx1cmFsOiAncGx1cmFsJyxcblx0XHRcdHNpbmdsZTogJ3NpbmdsZScsXG5cdFx0fSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InLCB0aGlzLmFwcC5nZXRPcHRpb25zKCdjcnVkLmNvbnRhaW5lclNlbGVjdG9yJykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cm91dGUocGFyYW1zID0gW10pe1xuXHRcdGlmKHBhcmFtcy5sZW5ndGg9PTEpe1xuXHRcdFx0aWYocGFyYW1zWzBdID09PSAnY3JlYXRlJyl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1bkNyZWF0ZShwYXJhbXMpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1bkRldGFpbHMocGFyYW1zKTtcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihwYXJhbXMubGVuZ3RoID09IDIpe1xuXHRcdFx0aWYgKHBhcmFtc1sxXSA9PT0gJ2RlbGV0ZScpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5EZWxldGUocGFyYW1zKTtcblx0XHRcdH1lbHNlIGlmKHBhcmFtc1sxXSA9PT0gJ3VwZGF0ZScpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5VcGRhdGUocGFyYW1zKTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0bGV0IHJvdXRlUnVubmVyTmFtZSA9ICdydW4nICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihwYXJhbXNbMV0pO1xuXHRcdFx0XHRpZih0aGlzW3JvdXRlUnVubmVyTmFtZV0gJiYgdHlwZW9mIHRoaXNbcm91dGVSdW5uZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJyl7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXNbcm91dGVSdW5uZXJOYW1lXShwYXJhbXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnJ1bkxpc3QocGFyYW1zKTtcblx0fVxuXG5cdHJ1bkNyZWF0ZShwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVURDcmVhdGUodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bkxpc3QocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVETGlzdCh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuRGV0YWlscyhwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVUREZXRhaWxzKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5EZWxldGUocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVERGVsZXRlKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5VcGRhdGUocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVEVXBkYXRlKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvbkFmdGVyUmVuZGVyKCl7XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURDb250cm9sbGVyO1xuIiwiaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aC5qcyc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4uL25vdFJvdXRlcic7XG5cbnZhciBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgPSB7XG5cdGNvbnRlbnQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5pbmRleE9mKCdjYXBpdGFsaXplJykgPiAtMSkge1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0LnRvVXBwZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQudGV4dENvbnRlbnQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQ7XG5cdH0sXG5cdGJpbmQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpID0+IHtcblx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe1xuXHRcdFx0XHRcdHNjb3BlLFxuXHRcdFx0XHRcdGl0ZW0sXG5cdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBsaXZlRXZlbnRzID0gWydjaGFuZ2UnLCAna2V5dXAnXSxcblx0XHRcdG9uRXZlbnQgPSAoKSA9PiB7XG5cdFx0XHRcdGlmIChbJ2NoZWNrYm94JywgJ3JhZGlvJywgJ3NlbGVjdC1tdWx0aXBsZSddLmluZGV4T2Yoc2NvcGUuZWxlbWVudC50eXBlKSA+IC0xKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChzY29wZS5lbGVtZW50LnR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdyYWRpbyc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZD9zY29wZS5lbGVtZW50LnZhbHVlOm51bGwpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkID8gc2NvcGUuZWxlbWVudC52YWx1ZSA6IG51bGwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnc2VsZWN0LW11bHRpcGxlJzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bGV0IHNlbGVjdGVkID0gW10uc2xpY2UuY2FsbChzY29wZS5lbGVtZW50LnNlbGVjdGVkT3B0aW9ucykubWFwKGEgPT4gYS52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coJ3NlbGVjdC1tdWx0aXBsZScsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2cobm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyksICcgLT4gJyxzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgIT09IHRydWUpIHtcblx0XHRcdGlmKHNjb3BlLmVsZW1lbnQudHlwZSA9PT0gJ3RleHRhcmVhJyl7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGxldCB0IG9mIGxpdmVFdmVudHMpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHQsIG9uRXZlbnQpO1xuXHRcdFx0fVxuXHRcdFx0c2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSA9IHRydWU7XG5cdFx0fVxuXHR9LFxuXHRhdHRyOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSB8fCBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpID8gcmVzKHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlcyk7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoc2NvcGUucGFyYW1zWzBdLCBzY29wZS5hdHRyaWJ1dGVSZXN1bHQpO1xuXHR9LFxuXHRuYW1lOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKCAvKnNjb3BlLCBpdGVtLCBoZWxwZXJzKi8gKSB7XG5cblx0fSxcblx0Y2hlY2tlZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzdWx0ID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzdWx0ID09PSAnZnVuY3Rpb24nKSA/IHJlc3VsdCh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXN1bHQpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA/IHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgdHJ1ZSkgOiBzY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuXHR9LFxuXHRjbGFzczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKSA/IHJlcyh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoIDwgMyB8fCBpc05hTihzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKSB7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCB1c2VkID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNjb3BlLnBhcmFtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoaSA9PT0gc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdFx0dXNlZCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICghdXNlZCkge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdG9wdGlvbnM6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0b3B0aW9uID0gbnVsbCxcblx0XHRcdHZhbHVlRmllbGROYW1lID0gJ3ZhbHVlJyxcblx0XHRcdGxhYmVsRmllbGROYW1lID0gJ25hbWUnLFxuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGQnKSAmJiBoZWxwZXJzLmZpZWxkLmhhc093blByb3BlcnR5KCduYW1lJykgPyBoZWxwZXJzLmZpZWxkLm5hbWUgOiAndmFsdWUnO1xuXHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzJdO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIGhlbHBlcnMgIT09IG51bGwgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpICYmIGhlbHBlcnMuZGVmYXVsdCkge1xuXHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsICcnKTtcblx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGhlbHBlcnMucGxhY2Vob2xkZXI7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0dmFyIGxpYiA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxpYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKTtcblx0XHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gbGliW2ldW2xhYmVsRmllbGROYW1lXTtcblx0XHRcdFx0aWYgKGhlbHBlcnMuZmllbGQuYXJyYXkpIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdICYmIEFycmF5LmlzQXJyYXkoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdKSl7XG5cdFx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdLmluZGV4T2YobGliW2ldW3ZhbHVlRmllbGROYW1lXSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdID09PSBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSB7XG5cdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRocmVmOmZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRpZiAoIXNjb3BlLmVsZW1lbnQubm90Um91dGVySW5pdGlhbGl6ZWQpe1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIG5vdFJvdXRlci5nZXRGdWxsUm91dGUoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSk7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0bm90Um91dGVyLm5hdmlnYXRlKG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0XHRzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxufTtcbmV4cG9ydCBkZWZhdWx0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYjtcbiIsIi8qXG5cdENvbW1vbiBmdW5jdGlvbnNcbiovXG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbi8qXG5cdGZyYW1ld29yayB3aWRlIHBhcnNlciBmb3IgZGF0YSBhY2Nlc3NcbiovXG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuL25vdFJvdXRlcic7XG5cbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuLypcblx0YmFzaWMgZXZlbnQgaGFuZGxlcnMgYW5kIGNvcmUgZGF0YSBtb2RpZmllcnNcbiovXG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuLypcblx0c21hcnRlciBpbWFnZSBjb250cm9sXG4qL1xuaW1wb3J0IG5vdEltYWdlIGZyb20gJy4vdGVtcGxhdGUvbm90SW1hZ2UnO1xuLypcblx0YXBwbGljYXRpb24gbWFpbiBpbmZyYXN0cnVjdHVyZSBzZXR0ZXJcbiovXG5pbXBvcnQgbm90QXBwIGZyb20gJy4vbm90QXBwJztcbi8qXG5cdHVzZXIgY29udHJvbGxlcnNcbiovXG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuL25vdENvbnRyb2xsZXInO1xuXG5pbXBvcnQge0NSVURDb250cm9sbGVyLENSVURDcmVhdGUsQ1JVRERlbGV0ZSxDUlVERGV0YWlscyxDUlVETGlzdCxDUlVEVXBkYXRlfSBmcm9tICcuL0NSVUQnO1xuXG4vKlxuXHR0ZW1wbGF0aW5nIGFuZCBjb21tb24gc3RydWN0dXJlc1xuKi9cblxuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vdGVtcGxhdGUvbm90UmVuZGVyZXInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JzsgLy8gc21hcnRlciB3aXRoIGJpbmRpbmdzIGZvciBldmVudHMsIGFjdHVhbHkgcHJveHlcblxuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi9jb21wb25lbnRzL25vdEZvcm0nO1xuaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4vY29tcG9uZW50cy9ub3RUYWJsZSc7XG5pbXBvcnQgbm90RGV0YWlscyBmcm9tICcuL2NvbXBvbmVudHMvbm90RGV0YWlscyc7XG5cbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnOyAvL1x0aG93IHRvIGludGVyYWN0IHdpdGggZGF0YSBvbiBzZXJ2ZXJcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnOyAvL1x0d3JhcHBlciBmb3IgZGF0YSB3aXRoIHNlcnZlcjwtPnZpZXcgbGl2ZSBpbnRlcmFjdGlvbnNcblxubm90VGVtcGxhdGVQcm9jZXNzb3JzLmFkZChub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIpO1xuXG5leHBvcnQge1xuXHRub3RDb21tb24sXG5cdG5vdFBhdGgsXG5cdG5vdEJhc2UsXG5cdG5vdEltYWdlLFxuXHRub3RBcHAsXG5cdG5vdEFQSSxcblx0bm90Q29udHJvbGxlcixcblx0Q1JVRENvbnRyb2xsZXIsXG5cdENSVURDcmVhdGUsXG5cdENSVUREZWxldGUsXG5cdENSVUREZXRhaWxzLFxuXHRDUlVETGlzdCxcblx0Q1JVRFVwZGF0ZSxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIsXG5cdG5vdFRlbXBsYXRlQ2FjaGUsXG5cdG5vdFJlbmRlcmVyLFxuXHRub3RDb21wb25lbnQsXG5cdG5vdEZvcm0sXG5cdG5vdFJvdXRlcixcblx0bm90VGFibGUsXG5cdG5vdERldGFpbHMsXG5cdG5vdFJlY29yZCxcblx0bm90UmVjb3JkSW50ZXJmYWNlXG59O1xuIl0sIm5hbWVzIjpbIkNvbW1vbk5ldHdvcmsiLCJ1cmkiLCJnZXQiLCJkYXRhQXJyYXkiLCJmaWVsZHMiLCJpIiwiZiIsImhhc093blByb3BlcnR5IiwiaW1hZ2UiLCJJbWFnZSIsInNldEF0dHJpYnV0ZSIsInNyYyIsImluZGV4T2YiLCJhZGRQcm90b2NvbCIsInVwbG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvblByb2dyZXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3BvbnNlVHlwZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsIndpdGhDcmVkZW50aWFscyIsIm9wZW4iLCJ1cmwiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZ2V0U2Vzc2lvbklEIiwiZmlsZSIsInR5cGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJuYW1lIiwic2VuZCIsIm1ldGhvZCIsImRhdGEiLCJvbmxvYWQiLCJ0Iiwib25lcnJvciIsIm9udGltZW91dCIsInBhcnNlSW50IiwicmVzcG9uc2VUZXh0IiwiZSIsImdldENvb2tpZSIsInZhbHVlIiwiZG9jdW1lbnQiLCJjb29raWUiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwicG9wIiwic2hpZnQiLCJMT0ciLCJDb21tb25Mb2dzIiwibm90RnJhbWV3b3JrIiwibm90Q29tbW9uIiwiZXJyb3IiLCJhcmd1bWVudHMiLCJsb2ciLCJ0cmFjZSIsIk1BTkFHRVIiLCJTeW1ib2wiLCJDb21tb25TaG9ydHMiLCJnZXRNYW5hZ2VyIiwiZ2V0QVBJIiwidiIsIkNvbW1vbk9iamVjdHMiLCJkZWZhdWx0cyIsIm9wdGlvbnMiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0Iiwic291cmNlcyIsImZvckVhY2giLCJkZXNjcmlwdG9ycyIsImtleXMiLCJzb3VyY2UiLCJyZWR1Y2UiLCJrZXkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJkZXNjcmlwdG9yIiwic3ltIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJiaWciLCJzbWFsbCIsIm9iaiIsImZpbHRlciIsImNvbnRhaW5zT2JqIiwiaWNvbnMiLCJiYXRjaCIsImdldERhdGEiLCJwdXNoIiwiYSIsImIiLCJwIiwiZXF1YWwiLCJ0b1N0cmluZyIsImRlZmF1bHRWYWx1ZSIsIm9iajEiLCJvYmoyIiwialF1ZXJ5IiwiZXh0ZW5kIiwidmFsIiwicmVnaXN0cnkiLCJhcnJheSIsIm9sZF9pbmRleCIsIm5ld19pbmRleCIsImsiLCJ1bmRlZmluZWQiLCJzcGxpY2UiLCJDb21tb25TdHJpbmdzIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIkNvbW1vbkFwcCIsInN0YXJ0ZXIiLCJhc3NpZ24iLCJleHRlbmRXaXRoIiwiU1VCX1BBVEhfU1RBUlQiLCJTVUJfUEFUSF9FTkQiLCJQQVRIX1NQTElUIiwiUEFUSF9TVEFSVF9PQkpFQ1QiLCJQQVRIX1NUQVJUX0hFTFBFUlMiLCJGVU5DVElPTl9NQVJLRVIiLCJNQVhfREVFUCIsIm5vdFBhdGgiLCJwYXRoIiwic3ViUGF0aCIsImZpbmQiLCJzdWIiLCJwYXJzZWQiLCJzdWJmIiwicmVwbGFjZSIsIml0ZW0iLCJoZWxwZXJzIiwic3ViUGF0aFBhcnNlZCIsImZpbmROZXh0U3ViUGF0aCIsImdldFZhbHVlQnlQYXRoIiwicmVwbGFjZVN1YlBhdGgiLCJwYXJzZVN1YnMiLCJhdHRyVmFsdWUiLCJzZXRWYWx1ZUJ5UGF0aCIsImlzUmVjb3JkIiwibm9ybWlsaXplUGF0aCIsInRyaWdnZXIiLCJzZXQiLCJzdGVwIiwiaGVscGVyIiwiclN0ZXAiLCJBcnJheSIsImlzQXJyYXkiLCJwYXJzZVBhdGhTdGVwIiwib2JqZWN0IiwiYXR0clBhdGgiLCJhdHRyTmFtZSIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfTUVUSE9EX0lOSVQiLCJNRVRBX0VWRU5UUyIsIk1FVEFfREFUQSIsIk1FVEFfV09SS0lORyIsIk1FVEFfT1BUSU9OUyIsIm5vdEJhc2UiLCJpbnB1dCIsImV2ZW50cyIsIm9uIiwic2V0RGF0YSIsInNldFdvcmtpbmciLCJ3b3JraW5nIiwic2V0T3B0aW9ucyIsIndoYXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsImZyb20iLCJldmVudE5hbWUiLCJldmVudCIsIm9mZiIsImNhbGxiYWNrcyIsImNhbGxiYWNrIiwidGFyZ2V0SWQiLCJPUFRfTU9ERV9ISVNUT1JZIiwiT1BUX01PREVfSEFTSCIsIk9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMIiwibm90Um91dGVyIiwicm9vdCIsImNsZWFyU2xhc2hlcyIsInJlIiwiaGFuZGxlciIsInJ1bGUiLCJhZGQiLCJwYXJhbSIsInIiLCJmcmFnbWVudCIsImxvY2F0aW9uIiwiZGVjb2RlVVJJIiwicGF0aG5hbWUiLCJzZWFyY2giLCJ3aW5kb3ciLCJtYXRjaCIsImhyZWYiLCJjdXJyZW50IiwiZ2V0RnJhZ21lbnQiLCJpbml0IiwiaXNJbml0aWFsaXplZCIsImNoZWNrIiwic2V0SW5pdGlhbGl6ZWQiLCJsb29wSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNoZWNrTG9jYXRpb24iLCJiaW5kIiwiaHJlZkNsaWNrIiwiZnVsbFJFIiwiYXBwbHkiLCJob3N0IiwicHVzaFN0YXRlIiwiZ2V0RnVsbFJvdXRlIiwiYm9keSIsImdldEFsbExpbmtzIiwiaW5pdFJlcm91dGluZyIsImdldEF0dHJpYnV0ZSIsImxpbmsiLCJub3RSb3V0ZXJJbml0aWFsaXplZCIsImZ1bGxMaW5rIiwicHJldmVudERlZmF1bHQiLCJuYXZpZ2F0ZSIsIm5vdEFQSU9wdGlvbnMiLCJub3RBUElRdWVlIiwicmVxdWVzdHNQZXJTZWNvbmQiLCJxdWVlIiwiaW50IiwiaW5Qcm9ncmVzcyIsInRvQ2FsbCIsImNsZWFySW50ZXJ2YWwiLCJydW4iLCJub3RBUEkiLCJpZCIsImdvb2QiLCJiYWQiLCJtYWtlUmVxdWVzdCIsInJlc3BvbnNlT0siLCJyZXNwb25zZUZhaWxlZCIsInJlcXVlc3RKU09OIiwidGhlbiIsIm5leHQiLCJjYXRjaCIsImdldElkIiwibW9kZWxOYW1lIiwiZ2V0TW9kZWxOYW1lIiwibWFrZVVybCIsImdldEpTT04iLCJub3RJbWFnZSIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCIsIlRFTVBMQVRFX1RBRyIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYIiwiQ09NUE9ORU5UX0lEX1BSRUZJWCIsIlBBUlRfSURfUFJFRklYIiwiREVGQVVMVF9QTEFDRVIiLCJERUZBVUxUX1BMQUNFUl9MT09QIiwiT1BUUyIsIk1FVEFfQ0FDSEUiLCJub3RUZW1wbGF0ZUNhY2hlIiwiaGlkZVRlbXBsYXRlcyIsInJlZ2lzdGVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1hcCIsImxvYWRPbmUiLCJvUmVxdWVzdCIsImRpdiIsImRhdGFzZXQiLCJub3RUZW1wbGF0ZU5hbWUiLCJub3RUZW1wbGF0ZVVSTCIsInNyY0VsZW1lbnQiLCJzZXRPbmUiLCJlbGVtZW50IiwiY2xvbmVOb2RlIiwiY29udCIsInRleHQiLCJub3RUZW1wbGF0ZXNFbGVtZW50cyIsImVsSWQiLCJwYXJlbnROb2RlIiwibGliIiwiZ2V0SFRNTCIsInRlbXBsYXRlSW5uZXJIVE1MIiwidGVtcGxhdGVDb250RWwiLCJ3cmFwIiwidGVtcGxhdGVzSFRNTCIsInRlbXBsYXRlcyIsInBhcnNlTGliIiwiYWRkTGliIiwic2VsZWN0b3JPckVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGFnTmFtZSIsIk9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkiLCJERUZBVUxUX0ZJTFRFUiIsIkRFRkFVTFRfUEFHRV9OVU1CRVIiLCJERUZBVUxUX1BBR0VfU0laRSIsIm5vdEludGVyZmFjZSIsIm1hbmlmZXN0IiwibGluZSIsInJlY29yZCIsImFjdGlvbk5hbWUiLCJyZWNvcmRSRSIsImZpZWxkTmFtZSIsImluZCIsImxlbiIsImluZDIiLCJzdGFydFNsaWNlIiwiZW5kU2xpY2UiLCJnZXRBdHRyIiwibW9kZWwiLCJhY3Rpb25EYXRhIiwicGFyc2VMaW5lIiwicG9zdEZpeCIsInJlc3VsdElkIiwicHJlZml4ZXMiLCJpbmRleCIsImNvbmNhdCIsInByZSIsImdldEFjdGlvbnMiLCJhY3Rpb25zIiwic2V0RmlsdGVyIiwiZmlsdGVyRGF0YSIsInNvcnRlckRhdGEiLCJwYWdlTnVtYmVyIiwicGFnZVNpemUiLCJzZXRQYWdlciIsInJlcXVlc3REYXRhIiwiZGF0YVByb3ZpZGVyTmFtZSIsImNhcGl0YWxpemVGaXJzdExldHRlciIsImdldEFjdGlvbkRhdGEiLCJyZXF1ZXN0UGFyYW1zIiwiY29sbGVjdFJlcXVlc3REYXRhIiwicmVxdWVzdFBhcmFtc0VuY29kZWQiLCJlbmNvZGVSZXF1ZXN0IiwiZ2V0SUQiLCJnZXRVUkwiLCJxdWVlUmVxdWVzdCIsIkpTT04iLCJzdHJpbmdpZnkiLCJhZnRlclN1Y2Nlc3NSZXF1ZXN0Iiwibm90UmVjb3JkIiwiTUVUQV9JTlRFUkZBQ0UiLCJNRVRBX1BST1hZIiwiTUVUQV9DSEFOR0UiLCJNRVRBX0NIQU5HRV9ORVNURUQiLCJNRVRBX1NBTCIsIk1FVEFfTUFQX1RPX0lOVEVSRkFDRSIsIkRFRkFVTFRfQUNUSU9OX1BSRUZJWCIsIk1FVEFfUkVUVVJOX1RPX1JPT1QiLCJjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzIiwib3duZXIiLCJjb250ZXh0IiwicmVzVGFyZ2V0IiwiUmVmbGVjdCIsIkVycm9yIiwidmFsdWVUb1JlZmxlY3QiLCJub3RQcm9wZXJ0eSIsImdldFJvb3QiLCJwYXRoVG8iLCJpc1Byb3h5IiwiaXNQcm9wZXJ0eSIsIlByb3h5IiwicHJveHkiLCJjcmVhdGVSZWNvcmRIYW5kbGVycyIsImNyZWF0ZUNvbGxlY3Rpb24iLCJub3RSZWNvcmRJbnRlcmZhY2UiLCJpbml0UHJvcGVydGllcyIsImludGVyZmFjZVVwIiwiY3VyUGF0aCIsImJhYmVsSGVscGVycy50eXBlb2YiLCJpdGVtcyIsImNvbGxlY3Rpb24iLCJnZXRBY3Rpb25zQ291bnQiLCJhY3Rpb25VcCIsInJlcXVlc3QiLCJvYmplY3RQYXJ0Iiwic2V0QXR0ciIsInNldEZpbmRCeSIsInJlc2V0RmlsdGVyIiwiZ2V0RmlsdGVyIiwic2V0U29ydGVyIiwiZ2V0U29ydGVyIiwic2V0UGFnZU51bWJlciIsInNldFBhZ2VTaXplIiwicmVzZXRQYWdlciIsImdldFBhZ2VyIiwiT1BUX0NPTlRST0xMRVJfUFJFRklYIiwiT1BUX1JFQ09SRF9QUkVGSVgiLCJub3RBcHAiLCJyZXNvdXJjZXMiLCJwcmVJbml0Um91dGVyIiwiaW5pdE1hbmFnZXIiLCJpbml0QVBJIiwiaW5pdFRlbXBsYXRlcyIsInNldE1hbmFnZXIiLCJhcGkiLCJzZXRBUEkiLCJwcm9tIiwiYWRkTGliRnJvbVVSTCIsImluaXRNYW5pZmVzdCIsInJlcG9ydCIsInNldEludGVyZmFjZU1hbmlmZXN0Iiwic2V0Um9vdCIsInJlUm91dGVFeGlzdGVkIiwicm91dGllSW5wdXQiLCJyb3V0ZUJsb2NrIiwicGF0aHMiLCJjb250cm9sbGVyIiwiYmluZENvbnRyb2xsZXIiLCJhZGRMaXN0IiwibGlzdGVuIiwidXBkYXRlIiwidXBkYXRlSW50ZXJmYWNlcyIsImluaXRDb250cm9sbGVyIiwiYWxsUmVzb3VyY2VzUmVhZHkiLCJzdGFydEFwcCIsImluaXRSb3V0ZXIiLCJjb250cm9sbGVyTmFtZSIsImFwcCIsImN0cmwiLCJjbGVhckludGVyZmFjZXMiLCJtYW5pZmVzdHMiLCJyZWNvcmRNYW5pZmVzdCIsInJlY29yZERhdGEiLCJvblJlc291cmNlUmVhZHkiLCJNRVRBX1BST0NFU1NPUlMiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnMiLCJzZXRQcm9jZXNzb3IiLCJnZXRQcm9jZXNzb3IiLCJNRVRBX0NPTVBPTkVOVFMiLCJub3RSZW5kZXJlciIsInJlbmRlciIsImNvbXBvbmVudCIsImluaXREYXRhIiwiaW5pdE9wdGlvbnMiLCJpbml0V29ya2luZyIsInRlbXBsYXRlIiwiaW5pdFRlbXBsYXRlIiwib25DaGFuZ2UiLCJNYXRoIiwicmFuZG9tIiwiZ2V0QnJlYWRDcnVtcHMiLCJjbGVhclN0YXNoIiwic2V0V29ya2luZ01hcHBpbmciLCJleGVjUHJvY2Vzc29ycyIsInNlYXJjaEZvclN1YlRlbXBsYXRlcyIsInN0YXNoUmVuZGVyZWQiLCJpZlBhcnQiLCJjb21wb25lbnRQYXRoIiwiY2hhbmdlZFBhdGgiLCJpZkZ1bGxTdWJQYXRoIiwiY3JlYXRlTWFwcGluZyIsImZpbmRBbGxQcm9jZXNzb3JzIiwicHJvY3MiLCJlbHMiLCJnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCIsImdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQiLCJwcm9jRGF0YSIsInBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbiIsInByb2Nlc3NvckV4cHJlc3Npb24iLCJhdHRyaWJ1dGVFeHByZXNzaW9uIiwiaWZDb25kaXRpb24iLCJwYXJhbXMiLCJwcm9jZXNzb3JOYW1lIiwibWFwcGluZyIsInByb2NTY29wZSIsImF0dHJpYnV0ZVJlc3VsdCIsImdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQiLCJwcm9jTmFtZSIsInByb2MiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkZXN0cm95U3VicyIsImRlc3Ryb3kiLCJjbGVhclN1YlRlbXBsYXRlcyIsImdldFN0YXNoIiwicmVtb3ZlQ2hpbGQiLCJudEVsIiwibnRSZW5kZXJlZCIsInN1YnMiLCJudCIsImlmU3ViRWxlbWVudFJlbmRlcmVkIiwicmVuZGVyU3ViIiwiZGV0YWlscyIsImRhdGFQYXRoIiwibm90Q29tcG9uZW50IiwiY2hpbGROb2RlcyIsImFkZFRvU3Rhc2giLCJzdGFzaCIsIm5ld1N0YXNoIiwiYW5jaG9yIiwibmV4dFNpYmxpbmciLCJpbnNlcnRCZWZvcmUiLCJub2RlIiwicGxhY2UiLCJ0YXJnZXRFbCIsImwiLCJjaGlsZHJlbiIsInRleHRDb250ZW50IiwicmVuZGVyZWQiLCJwbGFjZUFmdGVyIiwicGxhY2VCZWZvcmUiLCJwbGFjZUZpcnN0IiwicGxhY2VMYXN0Iiwibm90UGxhY2VycyIsIk1FVEFfUEFSVFMiLCJyZXNldFBhcnRzIiwicHJlcGFyZVRlbXBsYXRlRWxlbWVudCIsImluaXRNYXJrRWxlbWVudCIsIm1hcmtFbCIsInBsYWNlciIsImdldFBsYWNlciIsInRhcmdldFF1ZXJ5IiwibWFpbiIsInVuc2V0UmVhZHkiLCJodG1sIiwic2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJhZGRGcm9tVVJMIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQiLCJjbGVhclBhcnRzIiwiZGVhZCIsIm9mZkFsbCIsImZvckVhY2hEYXRhIiwicmVuZGVyUGFydCIsInBsYWNlUmVuZGVyZWQiLCJyZW1vdmVPYnNvbGV0ZVBhcnRzIiwiYmVmb3JlIiwicGxhY2VQYXJ0IiwiYWZ0ZXIiLCJwYXJ0IiwiZ2V0UGFydEJ5RGF0YSIsIm5vZGVzIiwibGFzdE5vZGUiLCJub2RlVHlwZSIsImdldFBhcnRzIiwicmVuZGVyZXIiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lIiwiYWRkUGFydCIsInVwZGF0ZVBhcnQiLCJwaXBlIiwiZmluZEFjdHVhbFBhcnRzIiwicmVtb3ZlTm90QWN0dWFsUGFydHMiLCJhY3R1YWxQYXJ0cyIsImlzRGF0YSIsIk9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUiIsIk9QVF9ERUZBVUxUX1ZJRVdTX1BPU1RGSVgiLCJPUFRfREVGQVVMVF9WSUVXX05BTUUiLCJPUFRfREVGQVVMVF9SRU5ERVJfRlJPTV9VUkwiLCJPUFRfREVGQVVMVF9QTFVSQUxfTkFNRSIsIk9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FIiwiT1BUX0RFRkFVTFRfTU9EVUxFX05BTUUiLCJPUFRfREVGQVVMVF9SRU5ERVJfQU5EIiwibm90Q29udHJvbGxlciIsImluaXRSZW5kZXIiLCJpbnRlcmZhY2VzIiwiZ2V0SW50ZXJmYWNlcyIsIm1ha2UiLCJ2aWV3TmFtZSIsInZpZXciLCJnZXRWaWV3IiwidGVtcGxhdGVVUkwiLCJwcmVmaXgiLCJjb21tb24iLCJnZXRNb2R1bGVQcmVmaXgiLCJwb3N0Zml4IiwidGVtcGxhdGVOYW1lIiwicmVuZGVyQW5kIiwidmlld3MiLCJnZXRNb2R1bGVOYW1lIiwiJGxpc3RBbGwiLCJlcnIiLCJmaWVsZEZpbGVzIiwic2F2ZWRGaWxlIiwiaGFzaCIsIk9QVF9ERUZBVUxUX0ZPUk1fUFJFRklYIiwiT1BUX0RFRkFVTFRfUk9MRV9OQU1FIiwiT1BUX0RFRkFVTFRfRk9STV9USVRMRSIsIk9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04iLCJPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCIsIm5vdEZvcm0iLCJvblN1Ym1pdCIsIm9uUmVzZXQiLCJvbkNhbmNlbCIsImdldE1hbmlmZXN0Iiwicm9sZSIsInJlbmRlcldyYXBwZXIiLCJmb3JtUGFydCIsImdldFdyYXBwZXJEYXRhIiwiZ2V0UGFydFRlbXBsYXRlTmFtZSIsImJpbmRGb3JtRXZlbnRzIiwicmVuZGVyQ29tcG9uZW50cyIsIndyYXBwZXIiLCJ0aXRsZSIsImdldEZvcm1GaWVsZHNMaXN0IiwiYWRkRmllbGRDb21wb25lbnQiLCJjb21wcyIsImdldEFwcCIsImRlZiIsImZpZWxkc0xpYnMiLCJnZXRGaWVsZHNMaWJzIiwiZmllbGRUeXBlIiwiZ2V0RmllbGRzRGVmaW5pdGlvbiIsInJlYyIsImxhYmVsIiwicGxhY2Vob2xkZXIiLCJkZWZhdWx0IiwiZmllbGQiLCJnZXRGb3JtVGFyZ2V0RWxlbWVudCIsImNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMiLCJmb3JtIiwiT1BUX0RFRkFVTFRfVklFVyIsIkNSVURDcmVhdGUiLCJwYXJlbnQiLCJzZXRWaWV3cyIsInByZWxvYWRMaWIiLCJyZW5kZXJGb3JtIiwib25BZnRlclJlbmRlciIsIm5ld0l0ZW0iLCJpbml0SXRlbSIsImZpbGVzIiwiZGF0YVRyYW5zZmVyIiwicXVlZVVwbG9hZCIsImV4ZWNVcGxvYWRzIiwiY3JlYXRlIiwiZ29Ub1RhYmxlIiwiYmFja1RvTGlzdCIsIk9QVF9ERUZBVUxUX1BBR0VfU0laRSIsIk9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSIiwiT1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04iLCJPUFRfREVGQVVMVF9TT1JUX0ZJRUxEIiwiT1BUX0ZJRUxEX05BTUVfUFJFX1BST0MiLCJub3RUYWJsZSIsInJvd3MiLCJyZXNldFNvcnRlciIsInJlbmRlckluc2lkZSIsInJlbmRlckhlYWRlciIsInVwZGF0ZURhdGEiLCJyZW5kZXJCb2R5IiwiYmluZFNlYXJjaCIsImJpbmRDdXN0b21CaW5kaW5ncyIsInRhYmxlSGVhZGVyIiwibmV3VGgiLCJzb3J0YWJsZSIsImF0dGFjaFNvcnRpbmdIYW5kbGVycyIsImhlYWRDZWxsIiwiY2hhbmdlU29ydGluZ09wdGlvbnMiLCJzdHlsZSIsImN1cnNvciIsInNvcnRCeUZpZWxkIiwic29ydERpcmVjdGlvbiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImludmFsaWRhdGVEYXRhIiwiZmlsdGVyU2VhcmNoIiwiaXNOYU4iLCJpZlVwZGF0aW5nIiwicXVlcnkiLCJzZXRVcGRhdGluZyIsIiRsaXN0IiwicHJvY2Nlc3NEYXRhIiwicmVmcmVzaEJvZHkiLCJzZXRVcGRhdGVkIiwidGhhdEZpbHRlciIsInRlc3REYXRhSXRlbSIsInRoYXRTb3J0ZXIiLCJzb3J0IiwiaXRlbTEiLCJpdGVtMiIsInQxIiwidDIiLCJsb2NhbGVDb21wYXJlIiwic2VhcmNoRWwiLCJvbkV2ZW50IiwiY3VycmVudFRhcmdldCIsInNlbGVjdG9yIiwiZ2V0T3B0aW9uIiwibmV3Um93IiwibmV3VGQiLCJwcmVwcm9jZXNzZWQiLCJpdGVtSWQiLCJ0Ym9keSIsImZpbmRCb2R5IiwiY2xlYXJCb2R5IiwiY2hlY2tGaWx0ZXJlZCIsInRoaXNQYWdlU3RhcnRzIiwibmV4dFBhZ2VFbmRzIiwibWluIiwicmVuZGVyUm93IiwidGFibGVCb2R5Iiwic3RyVmFsdWUiLCJnZXRGaWx0ZXJTZWFyY2giLCJ0b0NvbXAiLCJPUF9ERUZBVUxUX1BBR0VfU0laRSIsIkNSVURMaXN0IiwidXBkYXRlRGF0YXRhYmxlIiwidGFibGVWaWV3IiwibG9hZE5leHQiLCJPUFRfREVGQVVMVF9MT0FEX0FDVElPTiIsIk9QVF9ERUZBVUxUX0FDVElPTiIsIkNSVURVcGRhdGUiLCJsb2FkSXRlbSIsInJ1bkxpc3QiLCJDUlVERGVsZXRlIiwiY29uZmlybSIsImRlbGV0ZSIsImFjdGlvbiIsIk9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYIiwiT1BUX0RFRkFVTFRfREVUQUlMU19USVRMRSIsIm5vdERldGFpbHMiLCJnZXRGaWVsZHNMaXN0IiwiZ2V0VGFyZ2V0RWxlbWVudCIsIkNSVUREZXRhaWxzIiwicmVuZGVyRGV0YWlscyIsIl9pZCIsIl9fdmVyc2lvbiIsIkNSVURDb250cm9sbGVyIiwicnVuQ3JlYXRlIiwicnVuRGV0YWlscyIsInJ1bkRlbGV0ZSIsInJ1blVwZGF0ZSIsInJvdXRlUnVubmVyTmFtZSIsIm5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiIsInNjb3BlIiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwibGl2ZUV2ZW50cyIsImNoZWNrZWQiLCJzZWxlY3RlZCIsInNlbGVjdGVkT3B0aW9ucyIsInByb2Nlc3NlZFZhbHVlIiwidXNlZCIsIm9wdGlvbiIsInZhbHVlRmllbGROYW1lIiwibGFiZWxGaWVsZE5hbWUiLCJpdGVtVmFsdWVGaWVsZE5hbWUiXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWM7U0FDZixLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFjO1NBQ25CLEtBQUtDLEdBQUwsQ0FBUyxVQUFULElBQXVCRCxHQUE5QjtFQUxrQjtnQkFPSix1QkFBU0UsU0FBVCxFQUFvQkMsTUFBcEIsRUFBNEI7T0FDckMsSUFBSUMsQ0FBVCxJQUFjRixTQUFkLEVBQXlCO1FB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
