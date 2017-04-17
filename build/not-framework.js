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
            var args = Array.from(arguments),
                eventName = args.shift();
            if (!Array.isArray(eventName)) {
                eventName = [eventName];
            }
            for (var g = 0; g < eventName.length; g++) {
                var name = eventName[g];
                if (this[META_EVENTS].hasOwnProperty(name)) {
                    for (var t = 0; t < this[META_EVENTS][name].length; t++) {
                        var event = this[META_EVENTS][name][t];
                        if (event.once) {
                            this.off(name, event.callbacks);
                        }
                        for (var h = 0; h < event.callbacks.length; h++) {
                            var _event$callbacks;

                            (_event$callbacks = event.callbacks)[h].apply(_event$callbacks, toConsumableArray(args));
                        }
                    }
                }
            }
            return this;
        }
    }, {
        key: 'off',
        value: function off(eventNames /* array of event names */, eventCallbacks /* array of callbacks */) {
            if (!Array.isArray(eventNames)) {
                eventNames = [eventNames];
            }
            if (!Array.isArray(eventCallbacks)) {
                eventCallbacks = [eventCallbacks];
            }
            for (var g = 0; g < eventNames.length; g++) {
                var name = eventNames[g];
                var targetId = -1;
                for (var h = 0; h < this[META_EVENTS][name].length; h++) {
                    var event = this[META_EVENTS][name][h];
                    if (h === -1 && eventCallbacks === event.callbacks) {
                        targetId = h;
                    }
                }
                if (targetId > -1) {
                    this[META_EVENTS][name].splice(targetId, 1);
                }
            }
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
			if (element instanceof HTMLElement) {
				this[META_CACHE][key] = element;
			} else {
				this.addFromText(key, element);
			}
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
	}, {
		key: 'hide',
		value: function hide() {}
	}, {
		key: 'show',
		value: function show() {}
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
	}, {
		key: 'show',
		value: function show() {}
	}, {
		key: 'hide',
		value: function hide() {}
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
var OPT_DEFAULT_ACTION = 'create';
var OPT_DEFAULT_ITEM = {
    _id: null,
    title: 'Title',
    value: 'Value'
};

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
        _this.preloadLib(_this.parent.getOptions('views.create.preload')).then(_this.initData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderForm.bind(_this)).then(_this.onAfterRender.bind(_this)).catch(notCommon.report);
        return _ret = _this, possibleConstructorReturn(_this, _ret);
    }

    createClass(CRUDCreate, [{
        key: 'createDefault',
        value: function createDefault() {
            if (this.parent.getOptions('views.create.defaultItem') && this.parent.getModuleName() && this.parent.make[this.parent.getModuleName()]) {
                return this.parent.make[this.parent.getModuleName()](notCommon.extend({}, this.parent.getOptions('views.create.defaultItem')));
            } else if (this.parent.initItem) {
                return this.parent.initItem();
            } else if (this.parent.getModuleName() && this.parent.make[this.parent.getModuleName()]) {
                return this.parent.make[this.parent.getModuleName()](notCommon.extend({}, OPT_DEFAULT_ITEM));
            } else {
                return new notRecord({}, notCommon.extend({}, OPT_DEFAULT_ITEM));
            }
        }
    }, {
        key: 'initData',
        value: function initData() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                try {
                    _this2.setData(_this2.createDefault());
                    resolve(_this2.getData());
                } catch (e) {
                    reject(e);
                }
            });
        }
    }, {
        key: 'renderWrapper',
        value: function renderWrapper() {
            return this.render('default', {}, {});
        }
    }, {
        key: 'renderForm',
        value: function renderForm() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3.form = new notForm({
                    data: _this3.getData(),
                    options: {
                        action: _this3.parent.getOptions('views.create.action') || OPT_DEFAULT_ACTION,
                        targetQuery: _this3.parent.getOptions('views.create.targetQuery') || _this3.parent.getOptions('targetQuery'),
                        targetEl: document.querySelector(_this3.parent.getOptions('views.create.targetQuery') || _this3.parent.getOptions('targetQuery')),
                        prefix: _this3.parent.getOptions('views.create.prefix') || _this3.parent.getOptions('prefix'),
                        role: _this3.parent.getOptions('views.create.role') || _this3.parent.getOptions('role'),
                        helpers: notCommon.extend({
                            linkBackToList: _this3.parent.linkBackToList(),
                            file: function file(params) {
                                var files = params.e.target.files || params.e.dataTransfer.files;
                                notCommon.log('file changed', files);
                                if (params.helpers.field.name && files) {
                                    _this3.queeUpload(params.helpers.field.name, files);
                                }
                            },
                            submit: function submit() {
                                notCommon.log('submit form ', _this3.newItem);
                                _this3.execUploads(_this3.getData()).then(_this3.create.bind(_this3));
                            },
                            afterSubmit: function afterSubmit() {
                                _this3.goToTable();
                            },
                            libs: _this3.getOptions('libs')
                        }, _this3.parent.getOptions('views.create.helpers') || {})
                    },
                    events: [['afterRender', resolve], [['afterSubmit', 'afterRestore'], _this3.parent.backToList.bind(_this3.parent)]]
                });
            });
        }
    }, {
        key: 'create',
        value: function create(item) {
            var _this4 = this;

            item['$' + this.parent.getOptions('views.create.action')]().then(function (result) {
                notCommon.log('form saved', result);
                _this4.parent.app.getWorking('router').navigate(_this4.parent.getModuleName());
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

				if (field.hasOwnProperty('style')) {
					for (var style in field.style) {
						if (field.style.hasOwnProperty(style)) {
							newTd.style[style] = field.style[style];
						}
					}
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
				linkBackToList: this.parent.linkBackToList.bind(this.parent)
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
var OPT_DEFAULT_ACTION$1 = 'update';
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
							action: _this2.parent.getOptions('views.update.action') || OPT_DEFAULT_ACTION$1,
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
								afterSubmit: _this2.parent.backToList.bind(_this2.parent)
							}, _this2.parent.getOptions('views.update.helpers') || {})
						},
						events: [[['afterRestore', 'afterSubmit'], _this2.parent.backToList.bind(_this2.parent)], ['afterRender', resolve]]
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

			item['$' + (this.parent.getOptions('views.update.action') || OPT_DEFAULT_ACTION$1)]().then(function (result) {
				notCommon.log('form saved', result);
				_this3.parent.app.getWorking('router').navigate(_this3.getModuleName());
				_this3.parent.runList();
			}).catch(function (result) {
				notCommon.error('form not saved', result);
			});
		}
	}]);
	return CRUDUpdate;
}(notController);

var OPT_DEFAULT_ACTION$2 = 'delete';

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
				_this.parent.backToList();
			}
		});

		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDDelete, [{
		key: 'delete',
		value: function _delete() {
			var action = '$' + (this.parent.getOptions('views.delete.action') || OPT_DEFAULT_ACTION$2);
			this.make[this.parent.getModuleName()]({ '_id': this.getOptions('params.0') })[action]().then(this.parent.backToList.bind(this.parent)).catch(notCommon.report);
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
			var fieldType = this.getFieldsDefinition(fieldName),
			    rec = null;
			if (fieldType.component) {
				rec = this.castCustom(fieldName, fieldType);
			} else {
				rec = this.castCommon(fieldName, fieldType);
			}
			this.getWorking('components').push(rec);
		}
	}, {
		key: 'castCustom',
		value: function castCustom(fieldName, fieldType) {
			var _this2 = this;

			var CustomComponent = notFramework.notCommon.get('components')[fieldType.component];
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

			rec.component = new CustomComponent({
				data: this.getData(),
				options: {
					helpers: helpers,
					targetEl: this.getTargetElement(fieldType.target),
					renderAnd: 'placeLast'
				}
			});
			return rec;
		}
	}, {
		key: 'castCommon',
		value: function castCommon(fieldName, fieldType) {
			var _this3 = this;

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
					return params.item.value === _this3.getData(fieldName);
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
			return rec;
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
				linkBackToList: this.parent.linkBackToList.bind(this.parent),
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
								linkBackToList: _this3.parent.linkBackToList(),
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
					var routeRunnerName = 'run' + notCommon.capitalizeFirstLetter(params[0]);
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
	}, {
		key: 'backToList',
		value: function backToList() {
			this.app.getWorking('router').navigate(this.getModuleName());
		}
	}, {
		key: 'linkBackToList',
		value: function linkBackToList() {
			return this.getModuleName();
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
		if (scope.element.binds) {
			if (scope.element.binds.hasOwnProperty(scope.params[0])) {
				if (scope.element.binds[scope.params[0]].indexOf(scope.attributeExpression) > -1) {
					return;
				}
			}
		}
		scope.element.addEventListener(scope.params[0], function (e) {
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
		if (!scope.element.hasOwnProperty('binds')) {
			scope.element.binds = {};
		}
		if (!scope.element.binds.hasOwnProperty(scope.params[0])) {
			scope.element.binds[scope.params[0]] = [];
		}
		if (scope.element.binds[scope.params[0]].indexOf(scope.attributeExpression) === -1) {
			scope.element.binds[scope.params[0]].push(scope.attributeExpression);
		}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybS5qcyIsIi4uL3NyYy9DUlVEL0NyZWF0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFRhYmxlLmpzIiwiLi4vc3JjL0NSVUQvTGlzdC5qcyIsIi4uL3NyYy9DUlVEL1VwZGF0ZS5qcyIsIi4uL3NyYy9DUlVEL0RlbGV0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdERldGFpbHMuanMiLCIuLi9zcmMvQ1JVRC9EZXRhaWxzLmpzIiwiLi4vc3JjL0NSVUQvQ29udHJvbGxlci5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSkge1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvciAodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IgKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwdXRGaWxlKHVwbG9hZCAvKiBvYmplY3QoZmlsZSwgb25Qcm9ncmVzcywgdXJsKSovICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRpZiAoeGhyLnVwbG9hZCkge1xuXHRcdFx0XHQvLyBwcm9ncmVzcyBiYXJcblx0XHRcdFx0aWYgKHVwbG9hZC5vblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZC5vblByb2dyZXNzLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCAvKmUqLyApIHtcblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0Ly8gc3RhcnQgdXBsb2FkXG5cdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0XHR4aHIub3BlbignUFVUJywgdXBsb2FkLnVybCwgdHJ1ZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignWF9GSUxFTkFNRScsIGVuY29kZVVSSUNvbXBvbmVudCh1cGxvYWQuZmlsZS5uYW1lKSk7XG5cdFx0XHRcdHhoci5zZW5kKHVwbG9hZC5maWxlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRwdXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQVVQnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdGRlbGV0ZUpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ0RFTEVURScsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChwYXJzZUludChzdGF0dXMpID09PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9IChlKSA9PiByZWplY3QoZSk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRTZXNzaW9uSUQ6IGZ1bmN0aW9uKG5hbWUgPSAnU2Vzc2lvbklEJykge1xuXHRcdHJldHVybiB0aGlzLmdldENvb2tpZShuYW1lKTtcblx0fSxcblx0Z2V0Q29va2llOiAobmFtZSkgPT4ge1xuXHRcdGxldCB2YWx1ZSA9ICc7ICcgKyBkb2N1bWVudC5jb29raWUsXG5cdFx0XHRwYXJ0cyA9IHZhbHVlLnNwbGl0KCc7ICcgKyBuYW1lICsgJz0nKTtcblx0XHRpZiAocGFydHMubGVuZ3RoID09IDIpIHtcblx0XHRcdHJldHVybiBwYXJ0cy5wb3AoKS5zcGxpdCgnOycpLnNoaWZ0KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTmV0d29yaztcbiIsIi8vZGlydHkgaGFjayB0byByZW1vdmUgbm8tY29uc29sZSB3YXJuaW5nIG9mIGVzbGludFxuLyogZ2xvYmFsIG5vdEZyYW1ld29yayovXG5jb25zdCBMT0cgPSAnY29uc29sZSc7XG52YXIgQ29tbW9uTG9ncyA9IHtcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHRsb2c6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmxvZyguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRpZighbm90RnJhbWV3b3JrLm5vdENvbW1vbi5nZXQoJ3Byb2R1Y3Rpb24nKSl7XG5cdFx0XHR3aW5kb3dbTE9HXS5lcnJvciguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0dHJhY2U6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cblx0bW92ZUl0ZW0oYXJyYXksIG9sZF9pbmRleCwgbmV3X2luZGV4KSB7XG5cdFx0aWYgKG5ld19pbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcblx0XHRcdHZhciBrID0gbmV3X2luZGV4IC0gYXJyYXkubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKChrLS0pICsgMSkge1xuXHRcdFx0XHRhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFycmF5LnNwbGljZShuZXdfaW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRfaW5kZXgsIDEpWzBdKTtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aChzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHVuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHRoaXMuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIG51bGwpO1xuXHR9XG5cblx0cGFyc2VQYXRoU3RlcChzdGVwLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGxldCByU3RlcCA9IG51bGw7XG5cdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUykgPT09IDAgJiYgaGVscGVyKXtcblx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfSEVMUEVSUywgJycpO1xuXHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRpZihoZWxwZXIuaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF07XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID09PSAwICYmIGl0ZW0pe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwgJycpO1xuXHRcdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fVxuXG5cdC8vOjpmaWVsZE5hbWUucmVzdWx0XG5cdC8ve31cblx0Ly97ZmllbGROYW1lOiAndGFyZ2V0UmVjb3JkRmllbGQnfVxuXHQvLy8vWyd0YXJnZXRSZWNvcmRGaWVsZCcsICdyZXN1bHQnXVxuXHRwYXJzZVBhdGgocGF0aCwgaXRlbSwgaGVscGVyKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cGF0aCA9IHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdHBhdGhbaV0gPSB0aGlzLnBhcnNlUGF0aFN0ZXAocGF0aFtpXSwgaXRlbSwgaGVscGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRub3JtaWxpemVQYXRoKHBhdGgpe1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH1lbHNle1xuXHRcdFx0d2hpbGUocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA+IC0xKXtcblx0XHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwnJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdHNtYWxsID0gW1widG9kb1wiXSxcblx0XHRiaWcgPSBbXCJ0b2RvXCIsIFwibGVuZ3RoXCJdXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0Ki9cblxuXHRpZkZ1bGxTdWJQYXRoKGJpZywgc21hbGwpe1xuXHRcdGlmIChiaWcubGVuZ3RoPHNtYWxsLmxlbmd0aCl7cmV0dXJuIGZhbHNlO31cblx0XHRmb3IobGV0IHQgPTA7IHQgPCBzbWFsbC5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZihzbWFsbFt0XSAhPT0gYmlnW3RdKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpLFxuXHRcdFx0aXNGdW5jdGlvbiA9IGF0dHJOYW1lLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKT4tMTtcblx0XHRpZiAoaXNGdW5jdGlvbil7XG5cdFx0XHRhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0fVxuXHRcdGlmICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIHR5cGVvZiBvYmplY3RbYXR0ck5hbWVdICE9PSAndW5kZWZpbmVkJyAmJiBvYmplY3RbYXR0ck5hbWVdICE9PSBudWxsKXtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uP29iamVjdFthdHRyTmFtZV0oe2l0ZW0sIGhlbHBlcnN9KTpvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChuZXdPYmosIGF0dHJQYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gbmV3T2JqO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7b2JqZWN0W2F0dHJOYW1lXSA9IHt9O31cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGpvaW4oKXtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX01FVEhPRF9JTklUID0gU3ltYm9sKCdpbml0JyksXG4gICAgTUVUQV9FVkVOVFMgPSBTeW1ib2woJ2V2ZW50cycpLFxuICAgIE1FVEFfREFUQSA9IFN5bWJvbCgnZGF0YScpLFxuICAgIE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuICAgIE1FVEFfT1BUSU9OUyA9IFN5bWJvbCgnb3B0aW9ucycpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgICAgICB0aGlzW01FVEFfRVZFTlRTXSA9IHt9O1xuICAgICAgICB0aGlzW01FVEFfREFUQV0gPSB7fTtcbiAgICAgICAgdGhpc1tNRVRBX1dPUktJTkddID0ge307XG4gICAgICAgIHRoaXNbTUVUQV9PUFRJT05TXSA9IHt9O1xuICAgICAgICB0aGlzW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KSB7XG4gICAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgICAgIGlucHV0ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0Lmhhc093blByb3BlcnR5KCdldmVudHMnKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgdCBvZiBpbnB1dC5ldmVudHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKC4uLnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlucHV0Lmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShpbnB1dC5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnd29ya2luZycpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFdvcmtpbmcoaW5wdXQud29ya2luZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb25zKGlucHV0Lm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLyogc2V0IGNvbGxlY3Rpb24gKi9cbiAgICAgICAgICAgICAgICAgICAgd2hhdCA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8qIHNldCBjb2xsZWN0aW9uIGVsZW1lbnQgKi9cbiAgICAgICAgICAgICAgICAgICAgbm90UGF0aC5zZXQoYXJnc1swXSAvKiBwYXRoICovICwgd2hhdCAvKiBjb2xsZWN0aW9uICovICwgdW5kZWZpbmVkIC8qIGhlbHBlcnMgKi8gLCBhcmdzWzFdIC8qIHZhbHVlICovICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgLyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoICovXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCB3aXRoIGRlZmF1bHQgdmFsdWUgKi9cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXMgPSBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBubyBkYXRhLCByZXR1cm4gZGVmYXVsdCB2YWx1ZSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBkYXRhLCByZXR1cm4gaXQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogcmV0dXJuIGZ1bGwgY29sbGVjdGlvbiAqL1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aGF0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgXHRDT1JFIE9CSkVDVFxuICAgIFx0XHREQVRBIC0gaW5mb3JtYXRpb25cbiAgICBcdFx0T1BUSU9OUyAtIGhvdyB0byB3b3JrXG4gICAgXHRcdFdPUktJTkcgLSB0ZW1wb3JhcmlseSBnZW5lcmF0ZWQgaW4gcHJvY2Nlc3NcbiAgICAqL1xuXG4gICAgc2V0RGF0YSgpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXNbTUVUQV9EQVRBXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0RGF0YSgpLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfREFUQV0sIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgc2V0T3B0aW9ucygpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXNbTUVUQV9PUFRJT05TXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0T3B0aW9ucygpLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfT1BUSU9OU10sIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgc2V0V29ya2luZygpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXNbTUVUQV9XT1JLSU5HXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0V29ya2luZygpLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldFdvcmtpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfV09SS0lOR10sIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgLypcbiAgICBcdEVWRU5UUyBoYW5kbGluZ1xuICAgICovXG5cbiAgICBvbihldmVudE5hbWVzLCBldmVudENhbGxiYWNrcywgb25jZSkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcbiAgICAgICAgICAgIGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuICAgICAgICAgICAgZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgIG5vdENvbW1vbi5kZWZpbmVJZk5vdEV4aXN0cyh0aGlzW01FVEFfRVZFTlRTXSwgbmFtZSwgW10pO1xuICAgICAgICAgICAgdGhpc1tNRVRBX0VWRU5UU11bbmFtZV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzOiBldmVudENhbGxiYWNrcyxcbiAgICAgICAgICAgICAgICBvbmNlOiBvbmNlLFxuICAgICAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLFxuICAgICAgICAgICAgZXZlbnROYW1lID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgZXZlbnROYW1lID0gW2V2ZW50TmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgZyA9IDA7IGcgPCBldmVudE5hbWUubGVuZ3RoOyBnKyspe1xuXHRcdFx0XHRcdGxldCBuYW1lID0gZXZlbnROYW1lW2ddO1xuXHRcdFx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgZXZlbnQgPSB0aGlzW01FVEFfRVZFTlRTXVtuYW1lXVt0XTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChldmVudC5vbmNlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnQuY2FsbGJhY2tzKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGggPSAwOyBoIDwgZXZlbnQuY2FsbGJhY2tzLmxlbmd0aDsgaCsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2tzW2hdKC4uLmFyZ3MpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG9mZihldmVudE5hbWVzIC8qIGFycmF5IG9mIGV2ZW50IG5hbWVzICovICwgZXZlbnRDYWxsYmFja3MgLyogYXJyYXkgb2YgY2FsbGJhY2tzICovICkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcbiAgICAgICAgICAgIGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuICAgICAgICAgICAgZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuICAgICAgICB9XG5cdFx0XHRcdGZvcihsZXQgZyA9IDA7IGcgPCBldmVudE5hbWVzLmxlbmd0aDsgZysrKXtcblx0XHRcdFx0XHRsZXQgbmFtZSA9IGV2ZW50TmFtZXNbZ107XG5cdFx0XHRcdFx0bGV0IHRhcmdldElkID0gLTE7XG5cdFx0XHRcdFx0Zm9yKGxldCBoID0gMDsgaCA8IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmxlbmd0aDsgaCsrKXtcblx0XHRcdFx0XHRcdGxldCBldmVudCA9IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdW2hdO1xuXHRcdFx0XHRcdFx0aWYgKGggPT09IC0xICYmIGV2ZW50Q2FsbGJhY2tzID09PSBldmVudC5jYWxsYmFja3MpIHtcblx0XHRcdFx0XHRcdFx0XHR0YXJnZXRJZCA9IGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0YXJnZXRJZCA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnNwbGljZSh0YXJnZXRJZCwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG9mZkFsbCgpIHtcbiAgICAgICAgbGV0IGV2ZW50cyA9IE9iamVjdC5rZXlzKHRoaXNbTUVUQV9FVkVOVFNdKTtcbiAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBldmVudHMubGVuZ3RoOyB0KyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShldmVudHNbdF0pKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNbTUVUQV9FVkVOVFNdW2V2ZW50c1t0XV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuY29uc3QgT1BUX01PREVfSElTVE9SWSA9IFN5bWJvbCgnaGlzdG9yeScpLFxuXHRPUFRfTU9ERV9IQVNIID0gU3ltYm9sKCdoYXNoJyksXG5cdE9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMID0gNTA7XG5cbmNsYXNzIG5vdFJvdXRlciBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyb3V0ZXM6IFtdLFxuXHRcdFx0bW9kZTogT1BUX01PREVfSElTVE9SWSxcblx0XHRcdHJvb3Q6ICcvJywgLy9hbHdheXMgaW4gc2xhc2hlcyAvdXNlci8sIC8sIC9pbnB1dC8uIGFuZCBubyAvdXNlciBvciBpbnB1dC9sZXZlbFxuXHRcdFx0aW5pdGlhbGl6ZWQ6IGZhbHNlXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaXN0b3J5KCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtb2RlJywgT1BUX01PREVfSElTVE9SWSk7XG5cdH1cblxuXHRoYXNoKCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtb2RlJywgT1BUX01PREVfSEFTSCk7XG5cdH1cblxuXHRzZXRSb290KHJvb3Qpe1xuXHRcdHRoaXMuc2V0V29ya2luZygncm9vdCcsIHJvb3QgPyAnLycgKyB0aGlzLmNsZWFyU2xhc2hlcyhyb290KSArICcvJyA6ICcvJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjbGVhclNsYXNoZXMocGF0aCkge1xuXHRcdC8vZmlyc3QgYW5kIGxhc3Qgc2xhc2hlcyByZW1vdmFsXG5cdFx0cmV0dXJuIHBhdGgudG9TdHJpbmcoKS5yZXBsYWNlKC9cXC8kLywgJycpLnJlcGxhY2UoL15cXC8vLCAnJyk7XG5cdH1cblxuXHRhZGQocmUsIGhhbmRsZXIpIHtcblx0XHRpZiAodHlwZW9mIHJlID09ICdmdW5jdGlvbicpIHtcblx0XHRcdGhhbmRsZXIgPSByZTtcblx0XHRcdHJlID0gJyc7XG5cdFx0fVxuXHRcdGxldCBydWxlID0ge1xuXHRcdFx0cmU6IHJlLFxuXHRcdFx0aGFuZGxlcjogaGFuZGxlclxuXHRcdH07XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5wdXNoKHJ1bGUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkTGlzdChsaXN0KSB7XG5cdFx0Zm9yIChsZXQgdCBpbiBsaXN0KSB7XG5cdFx0XHR0aGlzLmFkZCh0LCBsaXN0W3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZW1vdmUocGFyYW0pIHtcblx0XHRmb3IgKHZhciBpID0gMCwgcjsgaSA8IHRoaXMuZ2V0V29ya2luZygncm91dGVzJykubGVuZ3RoLCByID0gdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXTsgaSsrKSB7XG5cdFx0XHRpZiAoci5oYW5kbGVyID09PSBwYXJhbSB8fCByLnJlID09PSBwYXJhbSkge1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLnNwbGljZShpLCAxKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Zmx1c2goKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJvdXRlczogW10sXG5cdFx0XHRtb2RlOiBPUFRfTU9ERV9ISVNUT1JZLFxuXHRcdFx0cm9vdDogJy8nXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpc0luaXRpYWxpemVkKCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnaW5pdGlhbGl6ZWQnKTtcblx0fVxuXG5cdHNldEluaXRpYWxpemVkKHZhbCA9IHRydWUpe1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ2luaXRpYWxpemVkJywgdmFsKTtcblx0fVxuXG5cdGdldEZyYWdtZW50KCkge1xuXHRcdHZhciBmcmFnbWVudCA9ICcnO1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSA9PT0gT1BUX01PREVfSElTVE9SWSkge1xuXHRcdFx0aWYgKCFsb2NhdGlvbikgcmV0dXJuICcnO1xuXHRcdFx0ZnJhZ21lbnQgPSB0aGlzLmNsZWFyU2xhc2hlcyhkZWNvZGVVUkkobG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2gpKTtcblx0XHRcdGZyYWdtZW50ID0gZnJhZ21lbnQucmVwbGFjZSgvXFw/KC4qKSQvLCAnJyk7XG5cdFx0XHRmcmFnbWVudCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICE9ICcvJyA/IGZyYWdtZW50LnJlcGxhY2UodGhpcy5nZXRXb3JraW5nKCdyb290JyksICcnKSA6IGZyYWdtZW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIXdpbmRvdykgcmV0dXJuICcnO1xuXHRcdFx0dmFyIG1hdGNoID0gd2luZG93LmxvY2F0aW9uLmhyZWYubWF0Y2goLyMoLiopJC8pO1xuXHRcdFx0ZnJhZ21lbnQgPSBtYXRjaCA/IG1hdGNoWzFdIDogJyc7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNsZWFyU2xhc2hlcyhmcmFnbWVudCk7XG5cdH1cblxuXHRjaGVja0xvY2F0aW9uKCl7XG5cdFx0bGV0IGN1cnJlbnQgPXRoaXMuZ2V0V29ya2luZygnY3VycmVudCcpLFxuXHRcdFx0ZnJhZ21lbnQgPXRoaXMuZ2V0RnJhZ21lbnQoKSxcblx0XHRcdGluaXQgPSB0aGlzLmlzSW5pdGlhbGl6ZWQoKTtcblx0XHRpZiAoY3VycmVudCAhPT1mcmFnbWVudCAgfHwgIWluaXQpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudCcsZnJhZ21lbnQpO1xuXHRcdFx0dGhpcy5jaGVjayhmcmFnbWVudCk7XG5cdFx0XHR0aGlzLnNldEluaXRpYWxpemVkKCk7XG5cdFx0fVxuXHR9XG5cblx0aHJlZkNsaWNrKCl7XG5cdFx0Ly9jb25zb2xlLmxvZyguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Z2V0Um9vdCgpe1xuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdGxpc3Rlbihsb29wSW50ZXJ2YWwgPSBPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudCcsICdub3RJbml0aWFsaXplZCcpO1xuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5nZXRXb3JraW5nKCdpbnRlcnZhbCcpKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ludGVydmFsJywgc2V0SW50ZXJ2YWwodGhpcy5jaGVja0xvY2F0aW9uLmJpbmQodGhpcyksIGxvb3BJbnRlcnZhbCkpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuaHJlZkNsaWNrLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y2hlY2soZikge1xuXHRcdHZhciBmcmFnbWVudCA9IGYgfHwgdGhpcy5nZXRGcmFnbWVudCgpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IHBhdGggPSB0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSArIHRoaXMuZ2V0V29ya2luZygncm91dGVzJylbaV0ucmU7XG5cdFx0XHRsZXQgZnVsbFJFID0gIHRoaXMuY2xlYXJTbGFzaGVzKGRlY29kZVVSSShwYXRoKSk7XG5cdFx0XHR2YXIgbWF0Y2ggPSBmcmFnbWVudC5tYXRjaChmdWxsUkUpO1xuXHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdG1hdGNoLnNoaWZ0KCk7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJylbaV0uaGFuZGxlci5hcHBseSh0aGlzLmhvc3QgfHwge30sIG1hdGNoKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bmF2aWdhdGUocGF0aCkge1xuXHRcdHBhdGggPSBwYXRoID8gcGF0aCA6ICcnO1xuXHRcdHN3aXRjaCAodGhpcy5nZXRXb3JraW5nKCdtb2RlJykpe1xuXHRcdFx0Y2FzZSBPUFRfTU9ERV9ISVNUT1JZOiB7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ3B1c2ggc3RhdGUnLCB0aGlzLmdldEZ1bGxSb3V0ZShwYXRoKSk7XG5cdFx0XHRcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHRoaXMuZ2V0RnVsbFJvdXRlKHBhdGgpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIE9QVF9NT0RFX0hBU0g6IHtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYubWF0Y2goLyMoLiopJC8pO1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyMoLiopJC8sICcnKSArICcjJyArIHBhdGg7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEZ1bGxSb3V0ZShwYXRoID0gJycpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSArIHRoaXMuY2xlYXJTbGFzaGVzKHBhdGgpO1xuXHR9XG5cblx0Z2V0QWxsTGlua3MoKXtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblx0XHR2YXIgbGlzdCA9IFtdO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgYWxsRWxlbWVudHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBhdHRzID0gYWxsRWxlbWVudHNbal0uYXR0cmlidXRlcywgbiA9IGF0dHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRzW2ldLm5vZGVOYW1lLmluZGV4T2YoJ24taHJlZicpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdHJlUm91dGVFeGlzdGVkKCl7XG5cdFx0bGV0IGxpc3QgPSB0aGlzLmdldEFsbExpbmtzKCk7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IGxpc3QubGVuZ3RoOyB0Kyspe1xuXHRcdFx0dGhpcy5pbml0UmVyb3V0aW5nKGxpc3RbdF0sIGxpc3RbdF0uZ2V0QXR0cmlidXRlKCduLWhyZWYnKSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdFJlcm91dGluZyhlbCwgbGluayl7XG5cdFx0aWYgKCFlbC5ub3RSb3V0ZXJJbml0aWFsaXplZCl7XG5cdFx0XHRsZXQgZnVsbExpbmsgPSB0aGlzLmdldEZ1bGxSb3V0ZShsaW5rKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnaHJlZicsIGZ1bGxMaW5rKTtcblx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0dGhpcy5uYXZpZ2F0ZShsaW5rKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0XHRlbC5ub3RSb3V0ZXJJbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFJvdXRlcigpO1xuIiwibGV0IG5vdEFQSU9wdGlvbnMgPSB7XG5cdHJwczogNTAsXG5cdHByb3RvY29sOiAnaHR0cCcsXG5cdGhvc3Q6ICdsb2NhbGhvc3QnLFxuXHRwb3J0OiA5MDAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RBUElPcHRpb25zO1xuIiwiY2xhc3Mgbm90QVBJUXVlZXtcblx0Y29uc3RydWN0b3IgKHJlcXVlc3RzUGVyU2Vjb25kKSB7XG5cdFx0dGhpcy5xdWVlID0gW107XG5cdFx0dGhpcy5pbnQgPSBudWxsO1xuXHRcdHRoaXMucmVxdWVzdHNQZXJTZWNvbmQgPSByZXF1ZXN0c1BlclNlY29uZCB8fCA1O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuKCl7XG5cdFx0dGhpcy5pbnQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5jaGVjay5iaW5kKHRoaXMpLCAxMDAwIC8gdGhpcy5yZXF1ZXN0c1BlclNlY29uZCk7XG5cdH1cblxuXHRjaGVjaygpe1xuXHRcdGlmICh0aGlzLmluUHJvZ3Jlc3Mpe3JldHVybjt9XG5cdFx0ZWxzZXtcblx0XHRcdGlmICh0aGlzLnF1ZWUubGVuZ3RoID4gMCl7XG5cdFx0XHRcdHRoaXMuaW5Qcm9ncmVzcyA9IHRydWU7XG5cdFx0XHRcdGxldCB0b0NhbGwgPSB0aGlzLnF1ZWUuc2hpZnQoKTtcblx0XHRcdFx0dG9DYWxsKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmV4dCgpe1xuXHRcdHRoaXMuaW5Qcm9ncmVzcyA9IGZhbHNlO1xuXHR9XG5cblx0YWRkKGNhbGwpe1xuXHRcdHRoaXMucXVlZS5wdXNoKGNhbGwpO1xuXHR9XG5cblx0cGF1c2UoKXtcblx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmludCk7XG5cdH1cblxuXHRyZXN1bWUoKXtcblx0XHR0aGlzLnJ1bigpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSVF1ZWU7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlLmpzJztcblxuaW1wb3J0IG5vdEFQSU9wdGlvbnMgZnJvbSAnLi9vcHRpb25zLmpzJztcbmltcG9ydCBub3RBUElRdWVlIGZyb20gJy4vcXVlZS5qcyc7XG5cblxuY2xhc3Mgbm90QVBJIGV4dGVuZHMgIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyhub3RDb21tb24uZXh0ZW5kKG5vdEFQSU9wdGlvbnMsIG9wdGlvbnMpKTtcblx0XHR0aGlzLnF1ZWUgPSBuZXcgbm90QVBJUXVlZSh0aGlzLmdldE9wdGlvbnMoJ3JwcycpKTtcblx0XHR0aGlzLnF1ZWUucnVuKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRtYWtlVXJsKHBhcnRzKSB7XG5cdFx0cmV0dXJuIHBhcnRzLmpvaW4oJy8nKTtcblx0fVxuXG5cdHF1ZWVSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsIG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRtYWtlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCkge1xuXHRcdG5vdENvbW1vbi5yZXF1ZXN0SlNPTihtZXRob2QsIHVybCwgZGF0YSlcblx0XHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2UpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0dGhpcy5xdWVlLm5leHQoKTtcblx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdwb3N0JywgdXJsLCBpZCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRwdXQob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZV0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdwdXQnLCB1cmwsIG51bGwsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZ2V0JywgdXJsLCBpZCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRsaXN0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZV0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdnZXQnLCB1cmwsIG51bGwsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGVsZXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZGVsZXRlJywgdXJsLCBpZCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJO1xuIiwiaW1wb3J0IG5vdEJhc2UgIGZyb20gJy4uL25vdEJhc2UnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW1hZ2UgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cbiIsImNvbnN0IFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCA9ICduLScsXG5cdFRFTVBMQVRFX1RBRyA9ICdudCcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiA9ICctJyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVggPSAnaWYnLFxuXHRDT01QT05FTlRfSURfUFJFRklYID0gJ25vdF9jb21wb25lbnRfJyxcblx0UEFSVF9JRF9QUkVGSVggPSAnbm90X3BhcnRfJyxcblx0REVGQVVMVF9QTEFDRVIgPSAncGxhY2UnLFxuXHRERUZBVUxUX1BMQUNFUl9MT09QID0gJ3BsYWNlQWZ0ZXInO1xuXG5jb25zdCBPUFRTID0ge1xuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgsXG5cdFRFTVBMQVRFX1RBRyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCxcblx0REVGQVVMVF9QTEFDRVIsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVgsXG5cdFBBUlRfSURfUFJFRklYLFxuXHRERUZBVUxUX1BMQUNFUl9MT09QXG59O1xuXG5leHBvcnQgZGVmYXVsdCBPUFRTO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuY29uc3QgTUVUQV9DQUNIRSA9IFN5bWJvbCgnY2FjaGUnKTtcblxuY2xhc3Mgbm90VGVtcGxhdGVDYWNoZSBleHRlbmRzIG5vdEJhc2V7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ0FDSEVdID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdHRoaXMuaGlkZVRlbXBsYXRlcygpO1xuXHRcdHRoaXMucmVnaXN0ZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpZGVUZW1wbGF0ZXMoKXtcblx0XHRsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdFx0dC5pbm5lckhUTUwgPSBPUFRTLlRFTVBMQVRFX1RBRyArICd7ZGlzcGxheTogbm9uZTt9Jztcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHQpO1xuXHR9XG5cblx0cmVnaXN0ZXIoKSB7XG5cdFx0bm90Q29tbW9uLnJlZ2lzdGVyKCd0ZW1wbGF0ZUNhY2hlJywgdGhpcyk7XG5cdH1cblxuXHRsb2FkKG1hcCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHRmb3IgKHZhciBpIGluIG1hcCkge1xuXHRcdFx0dGhpcy5sb2FkT25lKGksIG1hcFtpXSk7XG5cdFx0fVxuXHR9XG5cblx0bG9hZE9uZShrZXksIHVybCwgY2FsbGJhY2spIHtcblx0XHR2YXIgb1JlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRvUmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xuXHRcdG9SZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHRpZihlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe1xuXHRcdFx0dGhpc1tNRVRBX0NBQ0hFXVtrZXldID0gZWxlbWVudDtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuYWRkRnJvbVRleHQoa2V5LCBlbGVtZW50KTtcdFxuXHRcdH1cblx0fVxuXG5cdGdldChrZXkpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0NBQ0hFXS5oYXNPd25Qcm9wZXJ0eShrZXkpID8gdGhpc1tNRVRBX0NBQ0hFXVtrZXldLmNsb25lTm9kZSh0cnVlKSA6IG51bGw7XG5cdH1cblxuXHRnZXROYW1lcygpe1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzW01FVEFfQ0FDSEVdKTtcblx0fVxuXG5cdGdldEJ5VVJMKHVybCkge1xuXHRcdGZvciAodmFyIGkgaW4gdGhpc1tNRVRBX0NBQ0hFXSkge1xuXHRcdFx0aWYgKHRoaXNbTUVUQV9DQUNIRV1baV0uc3JjID09IHVybCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXQoaSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cdC8vXHROZXcgQVBJXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0c2V0TG9hZGVkKGtleSl7XG5cdFx0bGV0IHQgPSB0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGtleSk7XG5cdFx0aWYgKHQgPiAtMSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuc3BsaWNlKHQsIDEpO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRlZCcpLnB1c2goJ2tleScpO1xuXHR9XG5cblx0d3JhcChrZXksIHVybCwgaW5uZXJIVE1MKXtcblx0XHR2YXIgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdGNvbnQubmFtZSA9IGtleTtcblx0XHRjb250LnNyYyA9IHVybDtcblx0XHRjb250LmlubmVySFRNTCA9IGlubmVySFRNTDtcblx0XHRyZXR1cm4gY29udDtcblx0fVxuXG5cdHBhcnNlTGliKHRleHQpe1xuXHRcdGxldCBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0bGV0IHJlc3VsdCA9IHt9O1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gdGV4dDtcblx0XHRsZXQgbm90VGVtcGxhdGVzRWxlbWVudHMgPSBjb250LnF1ZXJ5U2VsZWN0b3JBbGwoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdGZvcihsZXQgZWxJZCA9MDsgZWxJZDwgbm90VGVtcGxhdGVzRWxlbWVudHMubGVuZ3RoOyBlbElkKyspe1xuXHRcdFx0bGV0IGVsID0gbm90VGVtcGxhdGVzRWxlbWVudHNbZWxJZF07XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSA9PT0gY29udCl7XG5cdFx0XHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdFx0XHRyZXN1bHRbZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlXSA9IGVsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRhZGRMaWIobGliKXtcblx0XHRmb3IobGV0IHQgaW4gbGliKXtcblx0XHRcdHRoaXMuc2V0T25lKHQsIGxpYlt0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVVSTChrZXksIHVybCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+IHtcblx0XHRcdGlmICh0aGlzLmdldChrZXkpKXtcblx0XHRcdFx0cmVzb2x2ZSh0aGlzLmdldChrZXkpKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL3RoYXQuc2V0TG9hZGluZyhrZXksIHVybCk7XG5cdFx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0XHQudGhlbigodGVtcGxhdGVJbm5lckhUTUwpPT57XG5cdFx0XHRcdFx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCB1cmwsIHRlbXBsYXRlSW5uZXJIVE1MKTtcblx0XHRcdFx0XHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh0aGlzLmdldChrZXkpKTtcblx0XHRcdFx0XHR9KS5jYXRjaCgoKT0+e1xuXHRcdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdlcnJvciBsb2FkaW5nIHRlbXBsYXRlJywga2V5LCB1cmwpO1xuXHRcdFx0XHRcdFx0cmVqZWN0KC4uLmFyZ3VtZW50cyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRMaWJGcm9tVVJMKHVybCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpXG5cdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZXNIVE1MKT0+e1xuXHRcdFx0XHRcdGxldCB0ZW1wbGF0ZXMgPSB0aGlzLnBhcnNlTGliKHRlbXBsYXRlc0hUTUwpO1xuXHRcdFx0XHRcdHRoaXMuYWRkTGliKHRlbXBsYXRlcyk7XG5cdFx0XHRcdFx0cmVzb2x2ZSh0ZW1wbGF0ZXMpO1xuXHRcdFx0XHR9KS5jYXRjaCgoZSk9Pntcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGVzIGxpYicsIHVybCxlKTtcblx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRGcm9tRG9jdW1lbnQoc2VsZWN0b3JPckVsZW1lbnQpe1xuXHRcdGxldCBlbCA9ICh0eXBlb2Ygc2VsZWN0b3JPckVsZW1lbnQgPT09ICdzdHJpbmcnKT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JFbGVtZW50KTpzZWxlY3Rvck9yRWxlbWVudDtcblx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBPUFRTLlRFTVBMQVRFX1RBRy50b0xvd2VyQ2FzZSgpKXtcblx0XHRcdFx0dGhpcy5zZXRPbmUoZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlLCBlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkRnJvbVRleHQoa2V5LCB0ZW1wbGF0ZUlubmVySFRNTCl7XG5cdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhpcy53cmFwKGtleSwgJycsIHRlbXBsYXRlSW5uZXJIVE1MKTtcblx0XHR0aGlzLnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVDYWNoZSgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZC5qcyc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkgPSBbJ19pZCcsICdpZCcsICdJRCddLFxuXHRERUZBVUxUX0ZJTFRFUiA9IHt9LFxuXHRERUZBVUxUX1BBR0VfTlVNQkVSID0gMSxcblx0REVGQVVMVF9QQUdFX1NJWkUgPSAxMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW50ZXJmYWNlIGV4dGVuZHMgbm90QmFzZSB7XG5cblx0Y29uc3RydWN0b3IobWFuaWZlc3QpIHtcblx0XHRzdXBlcih7fSk7XG5cdFx0dGhpcy5tYW5pZmVzdCA9IG1hbmlmZXN0O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cGFyc2VMaW5lKGxpbmUsIHJlY29yZCwgYWN0aW9uTmFtZSkge1xuXHRcdHZhciByZWNvcmRSRSA9ICc6cmVjb3JkWycsXG5cdFx0XHRmaWVsZE5hbWUgPSAnJztcblx0XHR3aGlsZSAobGluZS5pbmRleE9mKHJlY29yZFJFKSA+IC0xKSB7XG5cdFx0XHR2YXIgaW5kID0gbGluZS5pbmRleE9mKHJlY29yZFJFKTtcblx0XHRcdHZhciBsZW4gPSByZWNvcmRSRS5sZW5ndGg7XG5cdFx0XHR2YXIgaW5kMiA9IGxpbmUuaW5kZXhPZignXScpO1xuXHRcdFx0dmFyIHN0YXJ0U2xpY2UgPSBpbmQgKyBsZW47XG5cdFx0XHR2YXIgZW5kU2xpY2UgPSBpbmQyO1xuXHRcdFx0ZmllbGROYW1lID0gbGluZS5zbGljZShzdGFydFNsaWNlLCBlbmRTbGljZSk7XG5cdFx0XHRpZiAoZmllbGROYW1lID09ICcnKSBicmVhaztcblx0XHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzpyZWNvcmRbJyArIGZpZWxkTmFtZSArICddJywgcmVjb3JkLmdldEF0dHIoZmllbGROYW1lKSk7XG5cdFx0fVxuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzptb2RlbE5hbWUnLCB0aGlzLm1hbmlmZXN0Lm1vZGVsKTtcblx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6YWN0aW9uTmFtZScsIGFjdGlvbk5hbWUpO1xuXHRcdHJldHVybiBsaW5lO1xuXHR9XG5cblx0Z2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSkge1xuXHRcdHZhciBsaW5lID0gdGhpcy5wYXJzZUxpbmUodGhpcy5tYW5pZmVzdC51cmwsIHJlY29yZCwgYWN0aW9uTmFtZSkgKyAoKGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ3Bvc3RGaXgnKSkgPyB0aGlzLnBhcnNlTGluZShhY3Rpb25EYXRhLnBvc3RGaXgsIHJlY29yZCwgYWN0aW9uTmFtZSkgOiAnJyk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRJRChyZWNvcmQsIGFjdGlvbkRhdGEpIHtcblx0XHRsZXQgcmVzdWx0SWQsXG5cdFx0XHRsaXN0ID0gT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSxcblx0XHRcdHByZWZpeGVzID0gWycnLCB0aGlzLm1hbmlmZXN0Lm1vZGVsXTtcblx0XHRpZiAoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgnaW5kZXgnKSAmJiBhY3Rpb25EYXRhLmluZGV4KSB7XG5cdFx0XHRsaXN0ID0gW2FjdGlvbkRhdGEuaW5kZXhdLmNvbmNhdChPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgcHJlIG9mIHByZWZpeGVzKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIGxpc3QpIHtcblx0XHRcdFx0aWYgKHJlY29yZC5oYXNPd25Qcm9wZXJ0eShwcmUgKyB0KSkge1xuXHRcdFx0XHRcdHJlc3VsdElkID0gcmVjb3JkW3ByZSArIHRdO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRJZDtcblx0fVxuXG5cdGdldEFjdGlvbnNDb3VudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBY3Rpb25zKCkgPyBPYmplY3Qua2V5cyh0aGlzLmdldEFjdGlvbnMoKSkubGVuZ3RoIDogMDtcblx0fVxuXG5cdGdldEFjdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFuaWZlc3QgJiYgdGhpcy5tYW5pZmVzdC5hY3Rpb25zID8gdGhpcy5tYW5pZmVzdC5hY3Rpb25zIDoge307XG5cdH1cblxuXHRzZXRGaW5kQnkoa2V5LCB2YWx1ZSkge1xuXHRcdHZhciBvYmogPSB7fTtcblx0XHRvYmpba2V5XSA9IHZhbHVlO1xuXHRcdHJldHVybiB0aGlzLnNldEZpbHRlcihvYmopO1xuXHR9XG5cblx0c2V0RmlsdGVyKGZpbHRlckRhdGEgPSBERUZBVUxUX0ZJTFRFUikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcicsIGZpbHRlckRhdGEpO1xuXHR9XG5cblx0cmVzZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0RmlsdGVyKHt9KTtcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFNvcnRlcihzb3J0ZXJEYXRhKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnc29ydGVyJywgc29ydGVyRGF0YSk7XG5cdH1cblxuXHRnZXRTb3J0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc29ydGVyJyk7XG5cdH1cblxuXHRzZXRQYWdlTnVtYmVyKHBhZ2VOdW1iZXIpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdwYWdlTnVtYmVyJywgcGFnZU51bWJlcik7XG5cdH1cblxuXHRzZXRQYWdlU2l6ZShwYWdlU2l6ZSkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VTaXplJywgcGFnZVNpemUpO1xuXHR9XG5cblx0c2V0UGFnZXIocGFnZVNpemUgPSBERUZBVUxUX1BBR0VfU0laRSwgcGFnZU51bWJlciA9IERFRkFVTFRfUEFHRV9OVU1CRVIpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdwYWdlU2l6ZScsIHBhZ2VTaXplKS5zZXRXb3JraW5nKCdwYWdlTnVtYmVyJywgcGFnZU51bWJlcik7XG5cdH1cblxuXHRyZXNldFBhZ2VyKCkge1xuXHRcdHJldHVybiB0aGlzLnNldFBhZ2VyKCk7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0cGFnZVNpemU6IHRoaXMuZ2V0V29ya2luZygncGFnZVNpemUnKSxcblx0XHRcdHBhZ2VOdW1iZXI6IHRoaXMuZ2V0V29ya2luZygncGFnZU51bWJlcicpXG5cdFx0fTtcblx0fVxuXG5cdGdldE1vZGVsTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpcyAmJiB0aGlzLm1hbmlmZXN0ID8gdGhpcy5tYW5pZmVzdC5tb2RlbCA6IG51bGw7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKGFjdGlvbk5hbWUpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRBY3Rpb25zKCkgJiYgdGhpcy5nZXRBY3Rpb25zKClbYWN0aW9uTmFtZV0gPyB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA6IG51bGw7XG5cdH1cblxuXHRjb2xsZWN0UmVxdWVzdERhdGEoYWN0aW9uRGF0YSkge1xuXHRcdGxldCByZXF1ZXN0RGF0YSA9IHt9O1xuXHRcdGlmICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKSAmJiBBcnJheS5pc0FycmF5KGFjdGlvbkRhdGEuZGF0YSkpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aW9uRGF0YS5kYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBkYXRhUHJvdmlkZXJOYW1lID0gJ2dldCcgKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGFjdGlvbkRhdGEuZGF0YVtpXSk7XG5cdFx0XHRcdGlmICh0aGlzW2RhdGFQcm92aWRlck5hbWVdICYmIHR5cGVvZiB0aGlzW2RhdGFQcm92aWRlck5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0cmVxdWVzdERhdGEgPSBub3RDb21tb24uZXh0ZW5kKHJlcXVlc3REYXRhLCB0aGlzW2RhdGFQcm92aWRlck5hbWVdKCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXF1ZXN0RGF0YTtcblx0fVxuXG5cdGVuY29kZVJlcXVlc3QoZGF0YSl7XG5cdFx0bGV0IHAgPSAnPyc7XG5cdFx0Zm9yKGxldCB0IGluIGRhdGEpe1xuXHRcdFx0cCArPSBlbmNvZGVVUklDb21wb25lbnQodCkrJz0nK2VuY29kZVVSSUNvbXBvbmVudChkYXRhW3RdKSsnJic7XG5cdFx0fVxuXHRcdHJldHVybiBwO1xuXHR9XG5cblx0Ly9yZXR1cm4gUHJvbWlzZVxuXHRyZXF1ZXN0KHJlY29yZCwgYWN0aW9uTmFtZSkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKGFjdGlvbk5hbWUpLFxuXHRcdFx0cmVxdWVzdFBhcmFtcyA9IHRoaXMuY29sbGVjdFJlcXVlc3REYXRhKGFjdGlvbkRhdGEpLFxuXHRcdFx0cmVxdWVzdFBhcmFtc0VuY29kZWQgPSB0aGlzLmVuY29kZVJlcXVlc3QocmVxdWVzdFBhcmFtcyksXG5cdFx0XHRpZCA9IHRoaXMuZ2V0SUQocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSxcblx0XHRcdHVybCA9IHRoaXMuZ2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIG5vdENvbW1vbi5nZXRBUEkoKS5xdWVlUmVxdWVzdChhY3Rpb25EYXRhLm1ldGhvZCwgdXJsICsgcmVxdWVzdFBhcmFtc0VuY29kZWQsIGlkLCBKU09OLnN0cmluZ2lmeShyZWNvcmQuZ2V0RGF0YSgpKSlcblx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmFmdGVyU3VjY2Vzc1JlcXVlc3QoZGF0YSwgYWN0aW9uRGF0YSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdGFmdGVyU3VjY2Vzc1JlcXVlc3QoZGF0YSwgYWN0aW9uRGF0YSkge1xuXHRcdGlmICh0aGlzICYmIGFjdGlvbkRhdGEgJiYgYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgnaXNBcnJheScpICYmIGFjdGlvbkRhdGEuaXNBcnJheSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBkYXRhLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGRhdGFbdF0gPSBuZXcgbm90UmVjb3JkKHRoaXMubWFuaWZlc3QsIGRhdGFbdF0pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhKTtcblx0XHR9XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJztcblxuY29uc3QgTUVUQV9JTlRFUkZBQ0UgPSBTeW1ib2woJ2ludGVyZmFjZScpLFxuXHRNRVRBX1BST1hZID0gU3ltYm9sKCdwcm94eScpLFxuXHRNRVRBX0NIQU5HRSA9IFN5bWJvbCgnY2hhbmdlJyksXG5cdE1FVEFfQ0hBTkdFX05FU1RFRCA9IFN5bWJvbCgnY2hhbmdlLm5lc3RlZCcpLFxuXHRNRVRBX1NBTCA9IFtcblx0XHQnZ2V0QXR0cicsXG5cdFx0J2dldEF0dHJzJyxcblx0XHQnaXNQcm9wZXJ0eScsXG5cdFx0J2lzUmVjb3JkJyxcblx0XHQnZ2V0TWFuaWZlc3QnLFxuXHRcdCdzZXRBdHRyJyxcblx0XHQnc2V0QXR0cnMnLFxuXHRcdCdnZXREYXRhJyxcblx0XHQnc2V0RGF0YScsXG5cdFx0J2dldEpTT04nLFxuXHRcdCdvbicsXG5cdFx0J29mZicsXG5cdFx0J3RyaWdnZXInXG5cdF0sXG5cdE1FVEFfTUFQX1RPX0lOVEVSRkFDRSA9IFtcblx0XHQnZ2V0QWN0aW9uc0NvdW50Jyxcblx0XHQnZ2V0QWN0aW9ucycsXG5cdFx0J3NldEZpbmRCeScsXG5cdFx0J3Jlc2V0RmlsdGVyJyxcblx0XHQnc2V0RmlsdGVyJyxcblx0XHQnZ2V0RmlsdGVyJyxcblx0XHQnc2V0U29ydGVyJyxcblx0XHQnZ2V0U29ydGVyJyxcblx0XHQncmVzZXRTb3J0ZXInLFxuXHRcdCdzZXRQYWdlTnVtYmVyJyxcblx0XHQnc2V0UGFnZVNpemUnLFxuXHRcdCdzZXRQYWdlcicsXG5cdFx0J3Jlc2V0UGFnZXInLFxuXHRcdCdnZXRQYWdlcidcblx0XSxcblx0REVGQVVMVF9BQ1RJT05fUFJFRklYID0gJyQnLFxuXHRNRVRBX1JFVFVSTl9UT19ST09UID0gU3ltYm9sKCdyZXR1cm5Ub1Jvb3QnKTtcblxudmFyIGNyZWF0ZVByb3BlcnR5SGFuZGxlcnMgPSBmdW5jdGlvbihvd25lcikge1xuXHRyZXR1cm4ge1xuXHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIGNvbnRleHQpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgZ2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQsIGNvbnRleHQpO1xuXHRcdFx0aWYgKGtleSA9PT0gJ2lzUHJveHknKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykge1xuXHRcdFx0XHRpZiAodGhpc1trZXldKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHJlc1RhcmdldCwga2V5LCBjb250ZXh0KTtcblx0XHR9LmJpbmQob3duZXIpLFxuXHRcdHNldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIHZhbHVlIC8qLCBwcm94eSovICkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBzZXQgXCIke2tleX1cImAsIHR5cGVvZiB0YXJnZXRba2V5XSk7XG5cblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYXR0ZW1wdCB0byBwcml2YXRlIFwiJHtrZXl9XCIgcHJvcGVydHlgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCB2YWx1ZVRvUmVmbGVjdCA9IHZhbHVlO1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHZhbHVlVG9SZWZsZWN0ID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpLCBub3RQYXRoLmpvaW4odGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0cmV0dXJuIHQ7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0fTtcbn07XG5cbmNsYXNzIG5vdFByb3BlcnR5IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGdldFJvb3QsIHBhdGhUbywgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0aWYgKGl0ZW0gJiYgKGl0ZW0uaXNQcm94eSB8fCBpdGVtLmlzUHJvcGVydHkpKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0dGhpcy5zZXRPcHRpb25zKHtcblx0XHRcdGdldFJvb3Q6IGdldFJvb3QsXG5cdFx0XHRwYXRoOiBwYXRoVG9cblx0XHR9KTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVByb3BlcnR5SGFuZGxlcnModGhpcykpO1xuXHRcdHRoaXMuc2V0RGF0YShpdGVtKTtcblx0XHR0aGlzLmlzUHJvcGVydHkgPSB0cnVlO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9SRVRVUk5fVE9fUk9PVF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRbTUVUQV9SRVRVUk5fVE9fUk9PVF0ocHJveHksIGtleSwgdmFsdWUpIHtcblx0XHRsZXQgcm9vdCA9IHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpKCk7XG5cdFx0cm9vdC50cmlnZ2VyKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX1BST1hZXSwgdGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSwgdmFsdWUpO1xuXHR9XG59XG5cblxudmFyIGNyZWF0ZVJlY29yZEhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5JyB8fCBrZXkgPT09ICdpc1JlY29yZCcpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9NQVBfVE9fSU5URVJGQUNFLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHJlc1RhcmdldCwga2V5LCBjb250ZXh0KTtcblx0XHR9LmJpbmQob3duZXIpLFxuXHRcdHNldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIHZhbHVlIC8qLCBwcm94eSovICkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGByZWNvcmQgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQpO1xuXHRcdFx0Ly9ub3RDb21tb24udHJhY2UoKTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYXR0ZW1wdCB0byBwcml2YXRlIFwiJHtrZXl9XCIgcHJvcGVydHlgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCB2YWx1ZVRvUmVmbGVjdCA9IHZhbHVlO1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHZhbHVlVG9SZWZsZWN0ID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnZ2V0Um9vdCcpLCBub3RQYXRoLmpvaW4odGhpcy5nZXRPcHRpb25zKCdwYXRoJyksIGtleSksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgdCA9IFJlZmxlY3Quc2V0KHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0cmV0dXJuIHQ7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0fTtcbn07XG5cbmNsYXNzIG5vdFJlY29yZCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCwgaXRlbSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0aWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc1Byb3h5KSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ3RoaXMgaXMgUHJveHkgaXRlbScpO1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXG5cdFx0aWYgKGl0ZW0gJiYgKGl0ZW0uaXNSZWNvcmQgfHwgaXRlbS5pc1Byb3BlcnR5KSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe30pO1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdID0gbmV3IG5vdFJlY29yZEludGVyZmFjZShtYW5pZmVzdCk7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXMuaW50ZXJmYWNlVXAoKTtcblx0XHR0aGlzLmlzUmVjb3JkID0gdHJ1ZTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IHJlY29yZCBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdGluaXRQcm9wZXJ0aWVzKGl0ZW0sIHBhdGggPSAnJykge1xuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhpdGVtKTtcblx0XHRcdGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG5cdFx0XHRcdGxldCBjdXJQYXRoID0gcGF0aCArIChwYXRoLmxlbmd0aCA+IDAgPyAnLicgOiAnJykgKyBrZXk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnY3VyUGF0aCcsIGN1clBhdGgpO1xuXHRcdFx0XHRpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtW2tleV0gPT09ICdvYmplY3QnICYmIGl0ZW1ba2V5XSAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0dGhpcy5pbml0UHJvcGVydGllcyhpdGVtW2tleV0sIGN1clBhdGgpO1xuXHRcdFx0XHRcdFx0aXRlbVtrZXldID0gbmV3IG5vdFByb3BlcnR5KHRoaXMuZ2V0Um9vdC5iaW5kKHRoaXMpLCBjdXJQYXRoLCBpdGVtW2tleV0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgb3duIHByb3BlcnR5LCBidXQgbm90IG9iamVjdCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coa2V5LCAnaXMgbm90IG93biBwcm9wZXJ0eScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpdGVtO1xuXHR9XG5cblx0Z2V0Um9vdCgpIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNvbGxlY3Rpb24obWFuaWZlc3QsIGl0ZW1zKSB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSBbXTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb2xsZWN0aW9uLnB1c2gobmV3IG5vdFJlY29yZChtYW5pZmVzdCwgaXRlbXNbaV0pKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbGxlY3Rpb247XG5cdH1cblxuXHRpbnRlcmZhY2VVcCgpIHtcblx0XHRpZiAodGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9uc0NvdW50KCkgPiAwKSB7XG5cdFx0XHRsZXQgYWN0aW9ucyA9IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEFjdGlvbnMoKTtcblx0XHRcdGZvciAobGV0IGkgaW4gYWN0aW9ucykge1xuXHRcdFx0XHR0aGlzLmFjdGlvblVwKGksIGFjdGlvbnNbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cblxuXHRhY3Rpb25VcChpbmRleCkge1xuXHRcdGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdKSkge1xuXHRcdFx0dGhpc1tERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0gPSAoKSA9PiB0aGlzW01FVEFfSU5URVJGQUNFXS5yZXF1ZXN0KHRoaXMsIGluZGV4KTtcdFx0XHRcblx0XHR9XG5cdH1cblx0Lypcblx0LT4gJ3BhdGgudG8ua2V5JywgdmFsdWVPZktleVxuXHQ8LSBvaywgd2l0aCBvbmUgb25DaGFuZ2UgZXZlbnQgdHJpZ2dlcmVkXG5cdCovXG5cblx0c2V0QXR0cihrZXksIHZhbHVlKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguc2V0KGtleSwgdGhpc1tNRVRBX1BST1hZXSwge30sIHZhbHVlKTtcblx0fVxuXG5cdC8qXG5cdC0+XG5cdHtcblx0XHQna2V5UGF0aCc6IHZhbHVlLFxuXHRcdCdrZXkuc3ViUGF0aCc6IHZhbHVlMixcblx0XHQna2V5UGF0aC4wLnRpdGxlJzogdmFsdWUzXG5cdH1cblx0PC0gb2ssIHdpdGggYnVuY2ggb2Ygb25DaGFuZ2UgZXZlbnRzIHRyaWdnZXJlZFxuXHQqL1xuXHRzZXRBdHRycyhvYmplY3RQYXJ0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZXRBdHRycycsIG9iamVjdFBhcnQsIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpKTtcblx0XHRpZiAob2JqZWN0UGFydCAmJiAodHlwZW9mIG9iamVjdFBhcnQgPT09ICdvYmplY3QnKSAmJiBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KS5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIGluIG9iamVjdFBhcnQpIHtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdzZXRBdHRycyBvbmUgdG8gZ28nLCBwYXRoKTtcblx0XHRcdFx0dGhpcy5zZXRBdHRyKHBhdGgsIG9iamVjdFBhcnRbcGF0aF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdC0+ICdwYXRoVG9LZXknXG5cdDwtIHZhbHVlMVxuXG5cdCovXG5cdGdldEF0dHIod2hhdCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnZ2V0QXR0cicsIHdoYXQpO1xuXHRcdHJldHVybiBub3RQYXRoLmdldCh3aGF0LCB0aGlzW01FVEFfUFJPWFldLCB7fSk7XG5cdH1cblxuXHQvKlxuXHQtPiBbJ3BhdGhUb0tleScsICdwYXRoLnRvLmtleScsICdzaW1wbGVLZXknLC4uLl1cblx0PC0gW3ZhbHVlMSwgdmFsdWUyLCB2YWx1ZTMsLi4uXVxuXHQqL1xuXHRnZXRBdHRycyh3aGF0KSB7XG5cdFx0bGV0IHJlc3VsdCA9IFtdO1xuXHRcdGlmICh3aGF0ICYmIHdoYXQubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBvZiB3aGF0KSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHRoaXMuZ2V0QXR0cihwYXRoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRpZiAodGhpc1tNRVRBX0lOVEVSRkFDRV0pIHtcblx0XHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5tYW5pZmVzdDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0aGFuZGxlciBmb3IgUHJveHkgY2FsbGJhY2tzXG5cdCovXG5cblx0W01FVEFfQ0hBTkdFXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UnLCAuLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0W01FVEFfQ0hBTkdFX05FU1RFRF0oKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCd0cnkgdG8gY2hhbmdlIG5lc3RlZCcsIC4uLmFyZ3VtZW50cyk7XG5cdFx0Ly9ub3RDb21tb24udHJhY2UoKTtcblx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRoaXNbTUVUQV9QUk9YWV0sIG5vdFBhdGguam9pbihhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSksIGFyZ3VtZW50c1szXSk7XG5cdH1cblxuXHRzZXRJdGVtKGl0ZW0pIHtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSBjcmVhdGVkIGZyb20gJywgaXRlbSk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZScpO1xuXHRcdHRoaXMub2ZmKCdjaGFuZ2UubmVzdGVkJyk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9DSEFOR0VfTkVTVEVEXS5iaW5kKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0c2V0RmluZEJ5KCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldEZpbmRCeSguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0RmlsdGVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVzZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRTb3J0ZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0U29ydGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRTb3J0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldFNvcnRlciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0UGFnZU51bWJlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRQYWdlTnVtYmVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlU2l6ZSgpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRQYWdlU2l6ZSguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVzZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRnZXRNb2RlbE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldE1vZGVsTmFtZSguLi5hcmd1bWVudHMpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVjb3JkO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuL25vdFJlY29yZCc7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuL25vdFJvdXRlcic7XG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcblxuY29uc3QgT1BUX0NPTlRST0xMRVJfUFJFRklYID0gJ25jJyxcblx0T1BUX1JFQ09SRF9QUkVGSVggPSAnbnInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RBcHAgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKHtvcHRpb25zfSk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgYXBwJyk7XG5cdFx0bm90Q29tbW9uLnJlZ2lzdGVyKCdhcHAnLCB0aGlzKTtcblx0XHR0aGlzLnJlc291cmNlcyA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRpbnRlcmZhY2VzOiB7fSxcblx0XHRcdGNvbnRyb2xsZXJzOiB7fSxcblx0XHRcdGluaXRDb250cm9sbGVyOiBudWxsLFxuXHRcdFx0Y3VycmVudENvbnRyb2xsZXI6IG51bGxcblx0XHR9KTtcblx0XHR0aGlzLnByZUluaXRSb3V0ZXIoKTtcblx0XHR0aGlzLmluaXRNYW5hZ2VyKCk7XG5cdFx0dGhpcy5pbml0QVBJKCk7XG5cdFx0dGhpcy5pbml0VGVtcGxhdGVzKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0TWFuYWdlcigpe1xuXHRcdG5vdENvbW1vbi5zZXRNYW5hZ2VyKFxuXHRcdFx0e1xuXHRcdFx0XHRzZXRBUEkodil7IHRoaXMuYXBpID0gdjt9LFxuXHRcdFx0XHRnZXRBUEkoKXtyZXR1cm4gdGhpcy5hcGk7fSxcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0aW5pdEFQSSgpe1xuXHRcdG5vdENvbW1vbi5nZXRNYW5hZ2VyKCkuc2V0QVBJKG5ldyBub3RBUEkoe30pKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZXMoKXtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRsZXQgcHJvbSA9IG51bGw7XG5cdFx0XHRmb3IobGV0IHQgaW4gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRcdGlmICh0ICYmIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdGxldCB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpW3RdO1xuXHRcdFx0XHRcdGlmKHByb20pe1xuXHRcdFx0XHRcdFx0cHJvbS50aGVuKG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTC5iaW5kKG5vdFRlbXBsYXRlQ2FjaGUsIHVybCkpO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cHJvbSA9IG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTCh1cmwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHByb20pe1xuXHRcdFx0XHRwcm9tLnRoZW4odGhpcy5pbml0TWFuaWZlc3QuYmluZCh0aGlzKSlcblx0XHRcdFx0XHQuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoJ25vIHRlbXBsYXRlcyBsaWInLCBlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5pbml0TWFuaWZlc3QoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFuaWZlc3QoKSB7XG5cdFx0dmFyIHVybCA9IHRoaXMuZ2V0T3B0aW9ucygnbWFuaWZlc3RVUkwnKTtcblx0XHRub3RDb21tb24uZ2V0SlNPTih1cmwsIHt9KVxuXHRcdFx0LnRoZW4odGhpcy5zZXRJbnRlcmZhY2VNYW5pZmVzdC5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRwcmVJbml0Um91dGVyKCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb3V0ZXInLCBub3RSb3V0ZXIpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuc2V0Um9vdCh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5yb290JykpO1xuXHRcdG5vdFJvdXRlci5yZVJvdXRlRXhpc3RlZCgpO1xuXHR9XG5cblx0aW5pdFJvdXRlcigpe1xuXHRcdHZhciByb3V0aWVJbnB1dCA9IHt9O1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5tYW5pZmVzdCcpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGxldCByb3V0ZUJsb2NrID0gdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKVt0XSxcblx0XHRcdFx0cGF0aHMgPSByb3V0ZUJsb2NrLnBhdGhzLFxuXHRcdFx0XHRjb250cm9sbGVyID0gcm91dGVCbG9jay5jb250cm9sbGVyO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0cm91dGllSW5wdXRbcGF0aHNbaV1dID0gdGhpcy5iaW5kQ29udHJvbGxlcihjb250cm9sbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXInKS5hZGRMaXN0KHJvdXRpZUlucHV0KS5saXN0ZW4oKTsvLy5uYXZpZ2F0ZSh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5pbmRleCcpKTtcblx0fVxuXG5cdHNldEludGVyZmFjZU1hbmlmZXN0KG1hbmlmZXN0KSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcsIG1hbmlmZXN0KTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlTWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHQvL9C90YPQttC90L4g0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNGC0Yxcblx0XHQvL9C80L7QtNC10LvQuCDQv9C+0LvRg9GH0LXQvdC90YvQvNC4INC40L3RgtC10YDRhNC10LnRgdCw0LzQuFxuXHRcdHRoaXMudXBkYXRlSW50ZXJmYWNlcygpO1xuXHRcdC8v0LjQvdC40YbQuNC70LjRhtC40YDQvtCy0LDRgtGMINC4INC30LDQv9GD0YHRgtC40YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHRcdHRoaXMuaW5pdENvbnRyb2xsZXIoKTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhcnRBcHAoKSB7XG5cdFx0Ly/RgdC+0LfQtNCw0YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0Ly/RgNC+0YPRgtC10YAg0Lgg0L/RgNC40LLRj9C30LDRgtGMINC6INC90LXQvNGDINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHR0aGlzLmluaXRSb3V0ZXIoKTtcblx0fVxuXG5cdGJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0bGV0IGFwcCA9IHRoaXM7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRuZXcgY29udHJvbGxlck5hbWUoYXBwLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdH1cblxuXHRpbml0Q29udHJvbGxlcigpIHtcblx0XHRpZiAodHlwZW9mKHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRsZXQgaW5pdENvbnRyb2xsZXIgPSB0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJyk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJywgbmV3IGluaXRDb250cm9sbGVyKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50Q29udHJvbGxlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicpO1xuXHR9XG5cblx0c2V0Q3VycmVudENvbnRyb2xsZXIoY3RybCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInLCBjdHJsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHVwZGF0ZUludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5jbGVhckludGVyZmFjZXMoKTtcblx0XHRsZXQgbWFuaWZlc3RzID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHRcdGlmIChtYW5pZmVzdHMpIHtcblx0XHRcdGZvcihsZXQgbmFtZSBpbiBtYW5pZmVzdHMpe1xuXHRcdFx0XHRsZXQgcmVjb3JkTWFuaWZlc3QgPSBtYW5pZmVzdHNbbmFtZV07XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdID0gKHJlY29yZERhdGEpID0+IG5ldyBub3RSZWNvcmQocmVjb3JkTWFuaWZlc3QsIHJlY29yZERhdGEpO1xuXHRcdFx0XHR3aW5kb3dbJ25yJyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSldID0gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbbmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0UmVjb3JkTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9SRUNPUkRfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldENvbnRyb2xsZXJOYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX0NPTlRST0xMRVJfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldEludGVyZmFjZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpO1xuXHR9XG5cblx0Y2xlYXJJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJmYWNlcycsIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHdhaXRUaGlzUmVzb3VyY2UodHlwZSwgaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMucmVzb3VyY2VzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG5cdFx0XHR0aGlzLnJlc291cmNlc1t0eXBlXSA9IHt9O1xuXHRcdH1cblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSBmYWxzZTtcblx0XHRyZXR1cm4gdGhpcy5vblJlc291cmNlUmVhZHkuYmluZCh0aGlzLCB0eXBlLCBpbmRleCk7XG5cdH1cblxuXHRvblJlc291cmNlUmVhZHkodHlwZSwgaW5kZXgpIHtcblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSB0cnVlO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRhbGxSZXNvdXJjZXNSZWFkeSgpIHtcblx0XHR2YXIgaSwgajtcblx0XHRmb3IgKGkgaW4gdGhpcy5yZXNvdXJjZXMpIHtcblx0XHRcdGZvciAoaiBpbiB0aGlzLnJlc291cmNlc1tpXSkge1xuXHRcdFx0XHRpZiAoIXRoaXMucmVzb3VyY2VzW2ldW2pdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuXG5jb25zdCBNRVRBX1BST0NFU1NPUlMgPSBTeW1ib2woJ3Byb2Nlc3NvcnMnKTtcblxuY2xhc3Mgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UHJvY2Vzc29yKC8qIGtleSwgdmFsdWUgKi8pe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFByb2Nlc3NvcigvKiBrZXksICBkZWZhdWx0VmFsdWUgKi8pe1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhclByb2Nlc3NvcnMoKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZCgpe1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcblx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHR9ZWxzZXtcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKXtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGFyZ3VtZW50c1swXSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IodCwgYXJndW1lbnRzWzBdW3RdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFByb2Nlc3NvciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXIoKXtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlUHJvY2Vzc29ycygpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnO1xuXG4vKlxuICog0JjRgdC/0L7Qu9GM0LfRg9C10YIgRE9NINC/0L7QtNC00LXRgNC10LLQviDQsiDQutCw0YfQtdGB0YLQstC1INGI0LDQsdC70L7QvdCwLlxuICog0JfQsNC/0L7Qu9C90Y/QtdGCINC10LPQviDQtNCw0L3QvdGL0LzQuC5cbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0LPQtdC90LXRgNC40YDQvtCy0LDQvdC90YvQtSDRjdC70LXQvNC10L3RgtGLXG4gKlxuICogKi9cblxuLypcblxuXHQ8ZGl2IG4tdGVtcGxhdGUtbmFtZT1cInZhc3lhXCI+XG5cdFx0PHA+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbi12YWx1ZT1cIjpjb29sTmFtZVwiLz48L3A+XG5cdFx0PHA+0JHQvtGA0LjRgSDRhdGA0LXQvSDQv9C+0L/QsNC00LXRiNGMINC4IHt7OmNvb2xOYW1lfX0uPC9wPlxuXHQ8L2Rpdj5cblxuICovXG5cbmNvbnN0IE1FVEFfQ09NUE9ORU5UUyA9IFN5bWJvbCgnY29tcG9uZW50cycpO1xuXG5jbGFzcyBub3RSZW5kZXJlciBleHRlbmRzIG5vdEJhc2Uge1xuXHQvKlxuXHRcdGlucHV0ID0ge1xuXHRcdFx0ZGF0YTogbm90UmVjb3JkLFxuXHRcdFx0dGVtcGxhdGU6IGVsZW1lbnRcblx0XHRcdG9wdGlvbnM6e1xuXHRcdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0fVxuXHRcdH1cblx0Ki9cblxuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdID0ge307XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLmNvbXBvbmVudCA9IGlucHV0LmNvbXBvbmVudDtcblx0XHR0aGlzLmluaXREYXRhKGlucHV0LmRhdGEgPyBpbnB1dC5kYXRhIDoge30pO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dC50ZW1wbGF0ZSk7XG5cdFx0dGhpcy5pbml0VGVtcGxhdGUoKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3RlbXBsYXRlJywgdGhpcy5nZXRXb3JraW5nKCdnZXRUZW1wbGF0ZScpKCkpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLmdldERhdGEoKS5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0fVxuXG5cdGluaXRXb3JraW5nKHRlbXBsYXRlKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGdldFRlbXBsYXRlOiB0ZW1wbGF0ZSxcblx0XHRcdHBhcnRJZDogdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA/IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgOiBPUFRTLlBBUlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHR9KTtcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCkge1xuXHRcdGlmICh0aGlzLmNvbXBvbmVudCkge1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLmNvbXBvbmVudC5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9XG5cdH1cblxuXHRvbkNoYW5nZShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdC8qbm90Q29tbW9uLmxvZyh0aGlzKTtcblx0XHRub3RDb21tb24ubG9nKHRoaXMuZ2V0QnJlYWRDcnVtcHMoKS5qb2luKCcgPiAnKSk7XG5cdFx0bm90Q29tbW9uLmxvZygndXBkYXRpbmcgcmVuZGVyZXIgJywgdGhpcy5nZXRXb3JraW5nKCdwYXJ0SWQnKSwgJyBhZnRlciBjaGFuZ2VzJywga2V5LCB2YWx1ZSk7Ki9cblx0XHR0aGlzLnVwZGF0ZShrZXkpO1xuXHRcdHRoaXMudHJpZ2dlcignb2Jzb2xldGUnLHByb3h5LCBrZXksIHZhbHVlKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyU3Rhc2goKTtcblx0XHR0aGlzLnNldFdvcmtpbmdNYXBwaW5nKCk7XG5cdFx0dGhpcy5leGVjUHJvY2Vzc29ycyh0aGlzLmdldERhdGEoKSk7XG5cdFx0dGhpcy5zZWFyY2hGb3JTdWJUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnN0YXNoUmVuZGVyZWQoKTtcblx0fVxuXG5cdHVwZGF0ZShrZXkpIHtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHRmb3IgKGxldCB0IGluIHRoaXNbTUVUQV9DT01QT05FTlRTXSkge1xuXHRcdFx0bGV0IGl0ZW0gPSB0aGlzW01FVEFfQ09NUE9ORU5UU11bdF0sXG5cdFx0XHRcdGlmUGFydCA9IHRydWU7XG5cdFx0XHRpZiAoa2V5KXtcblx0XHRcdFx0aWYgKGl0ZW0uZ2V0T3B0aW9ucygnZGF0YVBhdGgnKT09PW51bGwpe1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldFx0Y29tcG9uZW50UGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJykpLFxuXHRcdFx0XHRcdGNoYW5nZWRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGtleSk7XG5cdFx0XHRcdGlmUGFydCA9IG5vdFBhdGguaWZGdWxsU3ViUGF0aChjaGFuZ2VkUGF0aCwgY29tcG9uZW50UGF0aCk7XG5cdFx0XHRcdC8qbm90Q29tbW9uLmxvZyhpdGVtLmdldE9wdGlvbnMoJ25hbWUnKSwgJyA+LTwgJywgaXRlbS5nZXRPcHRpb25zKCdpZCcpLCAnID4tPCAnLCBjb21wb25lbnRQYXRoLCBjaGFuZ2VkUGF0aCk7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ3dpbGwgYmUgdXBkYXRlZCcsIGlmUGFydCk7Ki9cblx0XHRcdH1cblxuXHRcdFx0aWYgKGlmUGFydCkge1xuXHRcdFx0XHRpdGVtLnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHNldFdvcmtpbmdNYXBwaW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbWFwcGluZycsIHRoaXMuY3JlYXRlTWFwcGluZygpKTtcblx0fVxuXG5cdC8qXG5cblx00KHQvtC30LTQsNC10Lwg0LrQsNGA0YLRiyDRgdC+0L7RgtCy0LXRgdGC0LLQuNGPINC/0YDQvtGG0LXRgdGB0L7RgNC+0LIsINC/0YPRgtC10Lkg0LTQsNC90L3Ri9GFINCyINC+0LHRitC10LrRgtC1INC4INGN0LvQtdC80LXQvdGC0L7QsiDRiNCw0LHQu9C+0L3QsC5cblx0W3tcblx0XHRlbCxcblx0XHRwcm9jZXNzb3IsXG5cdFx0d29ya2luZyxcblx0XHRpdGVtLnByb3BlcnR5LnBhdGhcblx0fV1cblxuXHQqL1xuXG5cdGNyZWF0ZU1hcHBpbmcoKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZmluZEFsbFByb2Nlc3NvcnMoKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZmluZEFsbFByb2Nlc3NvcnMoKSB7XG5cdFx0bGV0IHByb2NzID0gW10sXG5cdFx0XHRlbHMgPSBub3RDb21tb24uZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgodGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGVscy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGF0dHMgPSBlbHNbal0uYXR0cmlidXRlcywgbiA9IGF0dHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG5cdFx0XHRcdGlmIChhdHRzW2ldLm5vZGVOYW1lLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpID09PSAwKSB7XG5cdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGF0dHNbaV0pO1xuXHRcdFx0XHRcdGxldCBwcm9jRGF0YSA9IHRoaXMucGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKGF0dHNbaV0ubm9kZU5hbWUpO1xuXHRcdFx0XHRcdHByb2NEYXRhLmVsZW1lbnQgPSBlbHNbal07XG5cdFx0XHRcdFx0cHJvY0RhdGEucHJvY2Vzc29yRXhwcmVzc2lvbiA9IGF0dHNbaV0ubm9kZU5hbWU7XG5cdFx0XHRcdFx0cHJvY0RhdGEuYXR0cmlidXRlRXhwcmVzc2lvbiA9IGF0dHNbaV0udmFsdWU7XG5cdFx0XHRcdFx0cHJvY3MucHVzaChwcm9jRGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHByb2NzO1xuXHR9XG5cblx0cGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uKHByb2Nlc3NvckV4cHJlc3Npb24pIHtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0cGFyYW1zOiBbXSxcblx0XHRcdHByb2Nlc3Nvck5hbWU6ICcnLFxuXHRcdFx0aWZDb25kaXRpb246IGZhbHNlXG5cdFx0fTtcblx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLCAnJyk7XG5cdFx0aWYgKHByb2Nlc3NvckV4cHJlc3Npb24uaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYKSA9PT0gKHByb2Nlc3NvckV4cHJlc3Npb24ubGVuZ3RoIC0gT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWC5sZW5ndGgpKSB7XG5cdFx0XHRyZXN1bHQuaWZDb25kaXRpb24gPSB0cnVlO1xuXHRcdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiArIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsICcnKTtcblx0XHR9XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHByb2Nlc3NvckV4cHJlc3Npb24uc3BsaXQoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IpO1xuXHRcdHJlc3VsdC5wcm9jZXNzb3JOYW1lID0gcmVzdWx0LnBhcmFtc1swXTtcblx0XHRyZXN1bHQucGFyYW1zID0gcmVzdWx0LnBhcmFtcy5zbGljZSgxKTtcblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZXhlY1Byb2Nlc3NvcnMoaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbWFwcGluZyA9IHRoaXMuZ2V0V29ya2luZygnbWFwcGluZycpO1xuXHRcdGlmIChtYXBwaW5nKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG1hcHBpbmcubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IHByb2NTY29wZSA9IG1hcHBpbmdbaV07XG5cdFx0XHRcdHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocHJvY1Njb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGluZGV4KTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdhdHRyaWJ1dGVSZXN1bHQnLCBwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0XHRcdFx0bGV0IHByb2NOYW1lID0gcHJvY1Njb3BlLnByb2Nlc3Nvck5hbWUsXG5cdFx0XHRcdFx0cHJvYyA9IG5vdFRlbXBsYXRlUHJvY2Vzc29ycy5nZXQocHJvY05hbWUpO1xuXHRcdFx0XHRpZiAocHJvYykge1xuXHRcdFx0XHRcdHByb2MocHJvY1Njb3BlLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHRcdFx0XHRcdHByb2NTY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9jU2NvcGUucHJvY2Vzc29yRXhwcmVzc2lvbik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyBwcm9jZXNzb3IgbGlrZScsIHByb2NOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ3JlbmRlcmVkJyk7XG5cdH1cblxuXHRnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHBhdGgsIGl0ZW0pIHtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQocGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0fVxuXG5cdGNsZWFyU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuZGVzdHJveVN1YnMoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N1YnMnLCBbXSk7XG5cdH1cblxuXHRkZXN0cm95U3VicygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpcy5nZXRXb3JraW5nKCdzdWJzJykpIHtcblx0XHRcdFx0dC5kZXN0cm95KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZGVzdHJveSgpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0U3Rhc2goKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRsZXQgZWwgPSB0aGlzLmdldFN0YXNoKClbdF07XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSl7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmU3ViRWxlbWVudFJlbmRlcmVkKG50RWwpIHtcblx0XHRyZXR1cm4gbnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQgJiYgKG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkLnZhbHVlID09PSAndHJ1ZScpO1xuXHR9XG5cblx0c2VhcmNoRm9yU3ViVGVtcGxhdGVzKCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRsZXQgc3VicyA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLnF1ZXJ5U2VsZWN0b3JBbGwoT1BUUy5URU1QTEFURV9UQUcpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc3ViIHRlbXBsYXRlcycsIHN1YnMpO1xuXHRcdGZvciAobGV0IG50ID0gMDsgbnQgPCBzdWJzLmxlbmd0aDsgbnQrKykge1xuXHRcdFx0aWYgKCF0aGlzLmlmU3ViRWxlbWVudFJlbmRlcmVkKHN1YnNbbnRdKSkge1xuXHRcdFx0XHR0aGlzLnJlbmRlclN1YihzdWJzW250XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0YWRkU3ViKG50RWwpIHtcblx0XHRudEVsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKS5wdXNoKHtcblx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0cGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6ICcnLFxuXHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUuc3JjIDogJycsXG5cdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHRcdHJlbmRlcmVkTGlzdDogW10sXG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJTdWIobnRFbCkge1xuXHRcdGlmICghbnRFbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRsZXQgZGV0YWlscyA9IHtcblx0XHRcdFx0ZGF0YVBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiBudWxsLFxuXHRcdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5zcmMudmFsdWUgOiAnJyxcblx0XHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKClcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zID0ge1xuXHRcdFx0XHRkYXRhOiBkZXRhaWxzLmRhdGFQYXRoIT09IG51bGw/IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChkZXRhaWxzLmRhdGFQYXRoLCB0aGlzLmdldERhdGEoKSk6bnVsbCxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiBkZXRhaWxzLm5hbWUsXG5cdFx0XHRcdFx0c3JjOiBkZXRhaWxzLnNyY1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pLFxuXHRcdFx0XHRcdHRhcmdldEVsOiBudEVsLFxuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUFmdGVyJyxcblx0XHRcdFx0XHRpZDogZGV0YWlscy5pZCxcblx0XHRcdFx0XHRudEVsOiBudEVsLFxuXHRcdFx0XHRcdGRhdGFQYXRoOiBkZXRhaWxzLmRhdGFQYXRoXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG93bmVyOiB0aGlzXG5cdFx0XHR9O1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdpZCcsIGRldGFpbHMuaWQpO1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXNbTUVUQV9DT01QT05FTlRTXVtkZXRhaWxzLmlkXSA9IG5ldyBub3RDb21wb25lbnQob3B0aW9ucyk7XG5cdH1cblxuXHRjbGVhclN0YXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3Rhc2gnLCBbXSk7XG5cdH1cblxuXHRnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3RlbXBsYXRlJyk7XG5cdH1cblxuXHRnZXRTdGFzaCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzdGFzaCcpO1xuXHR9XG5cblx0c3Rhc2hSZW5kZXJlZCgpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCk7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0dGhpcy5hZGRUb1N0YXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdH1cblxuXHRyZXBsYWNlUmVuZGVyZWQoKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdyZXBsYWNlIHN0YXNoJyk7XG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLFxuXHRcdFx0c3Rhc2ggPSB0aGlzLmdldFN0YXNoKCksXG5cdFx0XHRuZXdTdGFzaCA9IFtdLFxuXHRcdFx0YW5jaG9yID0gc3Rhc2gubGVuZ3RoID4gMCA/IHN0YXNoWzBdIDogdGhpcy5nZXRPcHRpb25zKCdudEVsJyksXG5cdFx0XHRwYXJlbnROb2RlID0gYW5jaG9yLnBhcmVudE5vZGU7XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCByZXN1bHQuY2hpbGROb2Rlcy5sZW5ndGg7IHQrKykge1xuXHRcdFx0bmV3U3Rhc2gucHVzaChyZXN1bHQuY2hpbGROb2Rlc1t0XSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgbmV3U3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdGlmIChhbmNob3IubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld1N0YXNoW3RdLCBhbmNob3IubmV4dFNpYmxpbmcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YW5jaG9yLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobmV3U3Rhc2hbdF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHN0YXNoLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRwYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0YXNoW3RdKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIG5ld1N0YXNoKTtcblx0fVxuXG5cdGFkZFRvU3Rhc2gobm9kZSkge1xuXHRcdHRoaXMuZ2V0U3Rhc2goKS5wdXNoKG5vZGUpO1xuXHR9XG5cblx0aXNEYXRhKGRhdGEgPSB7fSkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKSA9PT0gZGF0YTtcblx0fVxuXG5cdGhpZGUoKXtcblxuXHR9XG5cblx0c2hvdygpe1xuXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90UmVuZGVyZXI7XG4iLCJjb25zdCBwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XG5cdFx0bGV0IGwgPSAwO1xuXHRcdHdoaWxlICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGggLSBsKSB7XG5cdFx0XHRpZiAodGFyZ2V0RWwuY2hpbGRyZW5bMF0ubm9kZU5hbWUgPT09ICdOVCcpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdudCBmb3VuZGVkJyk7XG5cdFx0XHRcdGwrKztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdyZW1vdmUgY2hpbGQgJyx0YXJnZXRFbC5jaGlsZHJlbltsXSk7XG5cdFx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGFyZ2V0RWwudGV4dENvbnRlbnQgPSAnJztcblx0fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBjaGlsZCAnLCByZW5kZXJlZFtpXSk7XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge31cbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZTtcbiIsImNvbnN0IHBsYWNlQWZ0ZXIgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUFmdGVyO1xuIiwiY29uc3QgcGxhY2VCZWZvcmUgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbCk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUJlZm9yZTtcbiIsImNvbnN0IHBsYWNlRmlyc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSByZW5kZXJlZC5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygncGxhY2UgZmlyc3QnLCBpLCByZW5kZXJlZFtpXSk7XG5cdFx0XHRpZiAodGFyZ2V0RWwuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGJlZm9yZSBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLmNoaWxkcmVuWzBdKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgYXMgZmlyc3QnKTtcblx0XHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlRmlyc3Q7XG4iLCJjb25zdCBwbGFjZUxhc3QgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlTGFzdDtcbiIsImNvbnN0IHJlcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGJlZm9yZUVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblxuXHR9LFxuXHRhZnRlckVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRhZnRlcjogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1x0XHRcblx0XHRpZiAodGFyZ2V0RWwubm9kZU5hbWUgIT09ICdOVCcpe1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0YXJnZXRFbCk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZXBsYWNlO1xuIiwiaW1wb3J0IHBsYWNlIGZyb20gJy4vcGxhY2UnO1xuaW1wb3J0IHBsYWNlQWZ0ZXIgZnJvbSAnLi9wbGFjZUFmdGVyJztcbmltcG9ydCBwbGFjZUJlZm9yZSBmcm9tICcuL3BsYWNlQmVmb3JlJztcbmltcG9ydCBwbGFjZUZpcnN0IGZyb20gJy4vcGxhY2VGaXJzdCc7XG5pbXBvcnQgcGxhY2VMYXN0IGZyb20gJy4vcGxhY2VMYXN0JztcbmltcG9ydCByZXBsYWNlIGZyb20gJy4vcmVwbGFjZSc7XG5cbmNvbnN0IG5vdFBsYWNlcnMgPSB7XG5cdHBsYWNlOiBwbGFjZSxcblx0cGxhY2VBZnRlcjogcGxhY2VBZnRlcixcblx0cGxhY2VCZWZvcmU6IHBsYWNlQmVmb3JlLFxuXHRwbGFjZUZpcnN0OiBwbGFjZUZpcnN0LFxuXHRwbGFjZUxhc3Q6IHBsYWNlTGFzdCxcblx0cmVwbGFjZTogcmVwbGFjZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90UGxhY2VycztcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVuZGVyZXIgZnJvbSAnLi9ub3RSZW5kZXJlcic7XG5pbXBvcnQgbm90UGxhY2VycyBmcm9tICcuL3BsYWNlcnMnO1xuXG5jb25zdCBNRVRBX1BBUlRTID0gU3ltYm9sKCdwYXJ0cycpO1xuLypcblx0aW5wdXQgPSB7XG5cdFx0ZGF0YTogbm90UmVjb3JkIG9yIFtub3RSZWNvcmRdLFxuXHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRodG1sOiBodG1sKHN0cmluZyksIFx0XHQvL9GC0LXQutGB0YIg0YEgaHRtbCDQutC+0LTQvtC8INGI0LDQsdC70L7QvdCwXG5cdFx0XHRlbDogSFRNTEVsZW1lbnQob2JqZWN0KSwgXHQvL0RPTSDRjdC70LXQvNC10L3RglxuXHRcdFx0c3JjOiBzcmMoc3RyaW5nKSxcdFx0XHQvL9GB0YHRi9C70LrQsCDQvdCwINGE0LDQudC7INGBINGI0LDQsdC70L7QvdC+0Lxcblx0XHRcdG5hbWU6IG5hbWUoc3RyaW5nKVx0XHRcdC8v0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCDQtNC70Y8g0L/QvtC40YHQutCwINCyINC60Y3RiNC1IG5vdFRlbXBsYXRlQ2FjaGVcblx0XHR9XG5cdFx0b3B0aW9uczp7XG5cdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHQvL9CwINGN0YLQviDQutCw0Log0LHRg9C00LXQvCDQv9C+0LzQtdGJ0LDRgtGMINGA0LXQt9GD0LvRjNGC0LDRgiDRgNC10L3QtNC10YDQuNC90LPQsFxuXHRcdFx0cmVuZGVyQW5kOiBwbGFjZVN0eWxlKHN0cmluZykg0L7QtNC40L0g0LjQtyDQstCw0YDQuNCw0L3RgtC+0LJcblx0XHRcdFx0XHRwbGFjZVx0XHQtXHTQv9C+0LzQtdGJ0LDQtdC8INCy0L3Rg9GC0YDQuCDRhtC10LvQtdCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LBcblx0XHRcdFx0XHRyZXBsYWNlXHRcdC1cdNC30LDQvNC10L3Rj9C10Lxcblx0XHRcdFx0XHRwbGFjZUFmdGVyXHQtXHTQv9C+0YHQu9C1XG5cdFx0XHRcdFx0cGxhY2VCZWZvcmVcdC1cdNC00L5cblx0XHRcdFx0XHRwbGFjZUZpcnN0XHQtXHTQstC90YPRgtGA0Lgg0L/QtdGA0LLRi9C8INC00L7Rh9C10YDQvdC40Lxcblx0XHRcdFx0XHRwbGFjZUxhc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C+0YHQu9C10LTQvdC40Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdH1cblx0fVxuKi9cbmNsYXNzIG5vdENvbXBvbmVudCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0XHR0aGlzLm9uKCdyZWFkeScsIHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuaW5pdChpbnB1dCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRCcmVhZENydW1wcygpe1xuXHRcdGlmICh0aGlzLm93bmVyKXtcblx0XHRcdHJldHVybiBbLi4udGhpcy5vd25lci5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldE9wdGlvbnMoJ2lkJyldO1xuXHRcdH1cblx0fVxuXG5cdGluaXQoaW5wdXQpIHtcblx0XHR0aGlzLmlucHV0ID0gaW5wdXQ7XG5cdFx0dGhpcy5vd25lciA9IGlucHV0Lm93bmVyP2lucHV0Lm93bmVyOm51bGw7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0KTtcblx0XHR0aGlzLnByZXBhcmVUZW1wbGF0ZUVsZW1lbnQoaW5wdXQudGVtcGxhdGUgPyBpbnB1dC50ZW1wbGF0ZSA6IG51bGwpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0RXZlbnRzKGxpc3Qpe1xuXHRcdGZvcihsZXQgdCBvZiBsaXN0KXtcblx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE9wdGlvbnModmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKHZhbCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2lkJykpe1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdpZCcsIE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCkpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKXtcblx0XHRcdHRoaXMuaW5pdE1hcmtFbGVtZW50KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdE1hcmtFbGVtZW50KCl7XG5cdFx0bGV0IG1hcmtFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ250Jyk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmdldE9wdGlvbnMoJ2lkJykpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdudEVsJywgbWFya0VsKTtcblx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSksXG5cdFx0XHR0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZiAodGFyZ2V0UXVlcnkpe1xuXHRcdFx0bGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0UXVlcnkpO1xuXHRcdFx0aWYgKHRhcmdldCl7XG5cdFx0XHRcdHRoaXMuc2V0T3B0aW9ucygndGFyZ2V0RWwnLCB0YXJnZXQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKXtcblx0XHRcdHRocm93ICdObyB0YXJnZXQgdG8gcGxhY2UgcmVuZGVyZWQnO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyLm1haW4odGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLCBbbWFya0VsXSk7XG5cdFx0fVxuXG5cdH1cblxuXHRpbml0V29ya2luZyh2YWwpIHtcblx0XHR0aGlzLnVuc2V0UmVhZHkodmFsKTtcblx0fVxuXG5cdHByZXBhcmVUZW1wbGF0ZUVsZW1lbnQodmFsKSB7XG5cdFx0aWYgKCF2YWwpIHtcblx0XHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdodG1sJykgJiYgdmFsLmh0bWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQodmFsLmVsLmNsb25lTm9kZSh0cnVlKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ3NyYycpICYmIHZhbC5zcmMpIHtcblx0XHRcdG5vdFRlbXBsYXRlQ2FjaGUuYWRkRnJvbVVSTCh2YWwuc3JjLCB2YWwuc3JjKVxuXHRcdFx0XHQudGhlbih0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50LmJpbmQodGhpcykpXG5cdFx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpICYmIHZhbC5uYW1lKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUuZ2V0KHZhbC5uYW1lKSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JywgY29udCk7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcpLmNsb25lTm9kZSh0cnVlKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRyZXNldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygndGVtcGxhdGVFbGVtZW50JywgdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpLmNsb25lTm9kZSh0cnVlKSk7XG5cdH1cblxuXHRzZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdHJ1ZSk7XG5cdH1cblxuXHR1bnNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCBmYWxzZSk7XG5cdH1cblxuXHRpc1JlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3JlYWR5Jyk7XG5cdH1cblxuXHRjbGVhclBhcnRzKCkge1xuXHRcdC8qINC40LfQstC10YnQsNC10Lwg0L7QsSDRg9C00LDQu9C10L3QuNC4INGN0LvQtdC80LXQvdGC0L7QsiAqL1xuXHRcdGlmICh0aGlzW01FVEFfUEFSVFNdICYmIEFycmF5LmlzQXJyYXkodGhpc1tNRVRBX1BBUlRTXSkgJiYgdGhpc1tNRVRBX1BBUlRTXS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgdGhpc1tNRVRBX1BBUlRTXSkge1xuXHRcdFx0XHRpZiAodC5kZXN0cm95KXtcblx0XHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFydHMoKTtcblx0fVxuXG5cdGRlc3Ryb3koKXtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdudEVsJykgJiYgdGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZSl7XG5cdFx0XHR0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpKTtcblx0XHR9XG5cdFx0dGhpcy5kZWFkID0gdHJ1ZTtcblx0XHR0aGlzLm9mZkFsbCgpO1xuXHR9XG5cblx0cmVzZXRQYXJ0cygpIHtcblx0XHR0aGlzW01FVEFfUEFSVFNdID0gW107XG5cdH1cblxuXHRnZXRQYXJ0cygpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BBUlRTXTtcblx0fVxuXG5cdGFkZFBhcnQodGVtcGxhdGUpIHtcblx0XHR0aGlzW01FVEFfUEFSVFNdLnB1c2godGVtcGxhdGUpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2xlYXJQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdHRoaXMucmVtb3ZlT2Jzb2xldGVQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkpIHtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5yZW5kZXJQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJVcGRhdGUnKTtcblx0fVxuXG5cdHBsYWNlUmVuZGVyZWQoKXtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKSB7XG5cdFx0XHRsZXQgcGxhY2VyID0gdGhpcy5nZXRQbGFjZXIodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSk7XG5cdFx0XHRwbGFjZXIuYmVmb3JlKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSk7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucGxhY2VQYXJ0LmJpbmQodGhpcykpO1xuXHRcdFx0cGxhY2VyLmFmdGVyKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gdGFyZ2V0IGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXHRwbGFjZVBhcnQoZGF0YSwgaW5kZXgpe1xuXHRcdGxldCBwYXJ0ID0gdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpLFxuXHRcdFx0bm9kZXMgPSBwYXJ0LmdldFN0YXNoKCksXG5cdFx0XHR0YXJnZXRFbCxcblx0XHRcdGxhc3ROb2RlLFxuXHRcdFx0cGxhY2VyO1xuXHRcdGlmIChpbmRleCA9PT0gMCl7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIoT1BUUy5ERUZBVUxUX1BMQUNFUl9MT09QKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScpO1xuXHRcdH1cblx0XHRwbGFjZXIubWFpbih0YXJnZXRFbCwgbm9kZXMpO1xuXHRcdGxhc3ROb2RlID0gdGFyZ2V0RWw7XG5cdFx0Zm9yKGxldCB0IG9mIG5vZGVzKXtcblx0XHRcdGlmICh0Lm5vZGVUeXBlID09PSAxKXtcblx0XHRcdFx0bGFzdE5vZGUgPSB0O1xuXHRcdFx0XHRsYXN0Tm9kZS5zZXRBdHRyaWJ1dGUoJ250LWNvbXBvbmVudCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtcGFydCcsIHBhcnQuZ2V0V29ya2luZygncGFydElkJykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJywgbGFzdE5vZGUpO1xuXHR9XG5cblx0Z2V0UGxhY2VyKG1ldGhvZCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2VhcmNoaW5nIGZvciBwbGFjZXInLCBtZXRob2QpO1xuXHRcdGlmIChub3RQbGFjZXJzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW21ldGhvZF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW09QVFMuREVGQVVMVF9QTEFDRVJdO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hEYXRhKGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXREYXRhKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZ1bmModGhpcy5nZXREYXRhKCksIDApO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hQYXJ0KGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldFBhcnRzKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0UGFydHMoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHTQtdGB0LvQuCDRgSDQtNCw0L3QvdGL0LzQuCDQvdC1INGB0LLRj9C30LDQvSDRgNC10L3QtNC10YDQtdGAIC0g0YHQvtC30LTQsNC10Lxcblx0Ki9cblxuXHRyZW5kZXJQYXJ0KGRhdGEpIHtcblx0XHRpZiAoIXRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjcmVhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0bGV0IHJlbmRlcmVyID0gbmV3IG5vdFJlbmRlcmVyKHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dGVtcGxhdGU6IHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKSxcblx0XHRcdFx0Y29tcG9uZW50OiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdC8vcmVuZGVyZXIub24oJ29ic29sZXRlJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFkZFBhcnQocmVuZGVyZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCd1cGRhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0dGhpcy51cGRhdGVQYXJ0KHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlUGFydChwYXJ0KXtcblx0XHRwYXJ0LnVwZGF0ZSgpO1xuXHR9XG5cblx0cmVtb3ZlT2Jzb2xldGVQYXJ0cygpIHtcblx0XHQvL9C60L7QvdCy0LXQtdGAINC/0L7QuNGB0Log0LDQutGC0YPQsNC70YzQvdGL0YUgLSDRg9C00LDQu9C10L3QuNC1INC+0YHRgtCw0LvRjNC90YvRhVxuXHRcdG5vdENvbW1vbi5waXBlKFxuXHRcdFx0dW5kZWZpbmVkLCAvLyBwYXJ0cyB0byBzZWFyY2ggaW4sIGNhbiBiZSAndW5kZWZpbmVkJ1xuXHRcdFx0W1xuXHRcdFx0XHR0aGlzLmZpbmRBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL2ZpcnN0IHJvdW5kLCBzZWFyY2ggZm9yIG9ic29sZXRlXG5cdFx0XHRcdHRoaXMucmVtb3ZlTm90QWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9yZW1vdmUgJ2VtXG5cdFx0XHRdXG5cdFx0KTtcblx0fVxuXG5cdC8qXG5cdFx00LXRgdGC0Ywg0LTQsNC90L3Ri9C1INC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0LDQutGC0YPQsNC70YzQvdC+LFxuXHRcdNC90LXRgiDQtNCw0L3QvdGL0YUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDRgdGC0LDRgNGM0ZFcblx0Ki9cblxuXHRmaW5kQWN0dWFsUGFydHMoKSB7XG5cdFx0bGV0IGFjdHVhbFBhcnRzID0gW107XG5cdFx0dGhpcy5mb3JFYWNoRGF0YSgoZGF0YS8qLCBpbmRleCovKT0+e1xuXHRcdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSk7XG5cdFx0XHRpZiAocGFydCl7XG5cdFx0XHRcdGFjdHVhbFBhcnRzLnB1c2gocGFydCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGFjdHVhbFBhcnRzO1xuXHR9XG5cblx0Lypcblx0XHTRg9C00LDQu9GP0LXQvCDQstGB0LUg0LrRgNC+0LzQtSDQsNC60YLRg9Cw0LvRjNC90YvRhVxuXHQqL1xuXHRyZW1vdmVOb3RBY3R1YWxQYXJ0cyhhY3R1YWxQYXJ0cyl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAoYWN0dWFsUGFydHMuaW5kZXhPZih0aGlzLmdldFBhcnRzKClbdF0pID09PSAtMSl7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKVt0XS5kZXN0cm95KCk7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKS5zcGxpY2UodCwgMSk7XG5cdFx0XHRcdHQtLTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRQYXJ0QnlEYXRhKGRhdGEpIHtcblx0XHRmb3IgKGxldCB0IGluIHRoaXMuZ2V0UGFydHMoKSkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0UGFydHMoKVt0XS5pc0RhdGEoZGF0YSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UGFydHMoKVt0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0c2hvdygpe1xuXHRcdFxuXHR9XG5cblx0aGlkZSgpe1xuXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Q29tcG9uZW50O1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IgPSAnLnBhZ2UtY29udGVudCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdTX1BPU1RGSVggPSAnLmh0bWwnLFxuXHRPUFRfREVGQVVMVF9WSUVXX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCA9IHRydWUsXG5cdE9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FID0gJ01vZGVscycsXG5cdE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FID0gJ01vZGVsJyxcblx0T1BUX0RFRkFVTFRfTU9EVUxFX05BTUUgPSAnbWFpbicsXG5cdE9QVF9ERUZBVUxUX1JFTkRFUl9BTkQgPSAncGxhY2UnO1xuXG5jbGFzcyBub3RDb250cm9sbGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGFwcCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0bm90Q29tbW9uLmxvZygnc3RhcnQgY29udHJvbGxlcicpO1xuXHRcdHRoaXMuYXBwID0gYXBwO1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyZWFkeTogZmFsc2UsXG5cdFx0XHR2aWV3czoge30sXG5cdFx0XHRsaWJzOnt9LFxuXHRcdFx0dmlld05hbWU6IE9QVF9ERUZBVUxUX1ZJRVdfTkFNRSxcblx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0fSk7XG5cdFx0dGhpcy5zZXREYXRhKHt9KTtcblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0bW9kdWxlTmFtZTogT1BUX0RFRkFVTFRfTU9EVUxFX05BTUUsXG5cdFx0XHRjb250YWluZXJTZWxlY3RvcjogT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SLFxuXHRcdFx0cHJlZml4OiB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGUnKSxcblx0XHRcdHBvc3RmaXg6IE9QVF9ERUZBVUxUX1ZJRVdTX1BPU1RGSVgsXG5cdFx0XHRyZW5kZXJGcm9tVVJMOiBPUFRfREVGQVVMVF9SRU5ERVJfRlJPTV9VUkwsXG5cdFx0XHRuYW1lczp7XG5cdFx0XHRcdHBsdXJhbDpPUFRfREVGQVVMVF9QTFVSQUxfTkFNRSxcblx0XHRcdFx0c2luZ2xlOiBPUFRfREVGQVVMVF9TSU5HTEVfTkFNRVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMub24oJ3JlYWR5JywgdGhpcy5pbml0UmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdC8qXG5cdFx0ICAgINGB0YDQsNC30YMg0LTQtdC70LDQtdC8INC00L7RgdGC0YPQv9C90YvQvNC4INC80L7QtNC10LvQuCBub3RSZWNvcmQg0LjQtyBuY2BDb250cm9sbGVyTmFtZWAg0LHRg9C00YPRgiDQtNC+0YHRgtGD0L/QvdGLINC60LDQuiB0aGlzLm5yYE1vZGVsTmFtZWBcblx0XHQqL1xuXHRcdGxldCBpbnRlcmZhY2VzID0gdGhpcy5hcHAuZ2V0SW50ZXJmYWNlcygpO1xuXHRcdHRoaXMubWFrZSA9IHt9O1xuXHRcdGZvciAobGV0IHQgaW4gaW50ZXJmYWNlcykge1xuXHRcdFx0aWYgKGludGVyZmFjZXMuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHR0aGlzLm1ha2VbdF0gPSBpbnRlcmZhY2VzW3RdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRSZW5kZXIoKXtcblx0XHR0aGlzLnJlbmRlcih0aGlzLmdldFdvcmtpbmcoJ3ZpZXdOYW1lJyksIHRoaXMuZ2V0RGF0YSgpLCB0aGlzLmdldFdvcmtpbmcoJ2hlbHBlcnMnKSk7XG5cdH1cblxuXHRyZW5kZXIodmlld05hbWUgPSdkZWZhdWx0JyAvKiB2aWV3IG5hbWUgKi8sIGRhdGEgPSB7fSAvKiBkYXRhIGZvciBub3RUZW1wbGF0ZSovICwgaGVscGVycyA9IHt9LyogY291bGQgYmUgbm90IHJlcHJlc2VudGVkICovKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHR2YXIgdmlldyA9IHRoaXMuZ2V0Vmlldyh2aWV3TmFtZSk7XG5cblx0XHRcdGlmICh0eXBlb2YgdmlldyA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldyA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZWplY3QoJ05vIHZpZXcgZm91bmQnLCB2aWV3TmFtZSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dmlldyA9IG5vdENvbW1vbi5leHRlbmQoe30sIHZpZXcpO1xuXHRcdFx0XHQvLyDQtdGB0LvQuCBwbGFjZSDQvdC1INGD0LrQsNC30LDQvdC+LCDRh9GC0L4g0LLQvtC30LzQvtC20L3QviDQuCDRgNCw0LfRg9C80L3QviDQv9GA0Lgg0L3QtSDRgdGD0YnQtdGB0YLQstC+0LLQsNC90LjQuFxuXHRcdFx0XHQvLyDRjdC70LXQvNC10L3RgtCwLCDQvdC+INC40LfQstC10YHRgtC90L7QvCDQuNC00LXQvdGC0LjRhNC40LrQsNGC0L7RgNC1XG5cdFx0XHRcdGlmICgoKHR5cGVvZiB2aWV3LnRhcmdldEVsID09PSAndW5kZWZpbmVkJykgfHwgKHZpZXcudGFyZ2V0RWwgPT09IG51bGwpKSAmJiAodHlwZW9mIHZpZXcudGFyZ2V0UXVlcnkgIT09ICd1bmRlZmluZWQnICYmIHZpZXcudGFyZ2V0UXVlcnkgIT09IG51bGwgJiYgdmlldy50YXJnZXRRdWVyeS5sZW5ndGggPiAwKSkge1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHZpZXcudGFyZ2V0UXVlcnkpO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHR2aWV3LnRhcmdldEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJykpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZpZXcuZGF0YSA9IGRhdGE7XG5cdFx0XHRcdGlmICh0eXBlb2Ygdmlldy5oZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3LmhlbHBlcnMgIT09IG51bGwgJiYgT2JqZWN0LmtleXModmlldy5oZWxwZXJzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh2aWV3LmhlbHBlcnMsIGhlbHBlcnMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZpZXcuaGVscGVycyA9IGhlbHBlcnM7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly/QtdGB0LvQuCDQvdGD0LbQvdC+INC30LDQs9GA0YPQttCw0YLRjCDRiNCw0LHQu9C+0L3Ri1xuXHRcdFx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdyZW5kZXJGcm9tVVJMJykpIHtcblx0XHRcdFx0XHQvL9C4INCw0LTRgNC10YEg0L3QtSDRg9C60LDQt9Cw0L1cblx0XHRcdFx0XHRpZiAodHlwZW9mIHZpZXcudGVtcGxhdGVVUkwgPT09ICd1bmRlZmluZWQnIHx8IHZpZXcudGVtcGxhdGVVUkwgPT0gbnVsbCB8fCB2aWV3LnRlbXBsYXRlVVJMLmxlbmd0aCA9PSAwKSB7XG5cdFx0XHRcdFx0XHRsZXQgcHJlZml4ID0gKHZpZXcuY29tbW9uID8gdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMuY29tbW9uJyk6IHRoaXMuZ2V0TW9kdWxlUHJlZml4KCkpLFxuXHRcdFx0XHRcdFx0XHRuYW1lID0gKCh0eXBlb2Ygdmlldy5uYW1lICE9PSAndW5kZWZpbmVkJyAmJiB2aWV3Lm5hbWUgIT09IG51bGwgJiYgdmlldy5uYW1lLmxlbmd0aCA+IDApID8gdmlldy5uYW1lIDogdmlld05hbWUpLFxuXHRcdFx0XHRcdFx0XHRwb3N0Zml4ID0gdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0XHQvL9Cz0LXQvdC10YDQuNGA0YPQtdC8INCw0LTRgNC10YEg0L/QviDRiNCw0LHQu9C+0L3Rg1xuXHRcdFx0XHRcdFx0dmlldy50ZW1wbGF0ZVVSTCA9ICBbcHJlZml4LCBuYW1lXS5qb2luKCcvJykgKyBwb3N0Zml4O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL9CwINC10YHQu9C4INC10YHRgtGMINC90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAsINGC0L5cblx0XHRcdFx0XHRpZiAodmlldy5oYXNPd25Qcm9wZXJ0eSgndGVtcGxhdGVOYW1lJykpIHtcblx0XHRcdFx0XHRcdC8vLi4uXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlTmFtZSA9IHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyB2aWV3LnRlbXBsYXRlTmFtZSArIHRoaXMuZ2V0T3B0aW9ucygncG9zdGZpeCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudCcsIG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRcdGRhdGEsXG5cdFx0XHRcdFx0dGVtcGxhdGU6e1xuXHRcdFx0XHRcdFx0bmFtZTogdmlldy50ZW1wbGF0ZU5hbWUsXG5cdFx0XHRcdFx0XHRzcmM6IHZpZXcudGVtcGxhdGVVUkwsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6W1snYWZ0ZXJSZW5kZXInLCByZXNvbHZlXV0sXG5cdFx0XHRcdFx0b3B0aW9uczp7XG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogdmlldy50YXJnZXRFbCxcblx0XHRcdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdFx0XHRyZW5kZXJBbmQ6IHZpZXcucmVuZGVyQW5kIHx8IE9QVF9ERUZBVUxUX1JFTkRFUl9BTkRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QXBwKCkge1xuXHRcdHJldHVybiB0aGlzLmFwcDtcblx0fVxuXG5cdHNldE1vZGVsKG1vZGVsKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtb2RlbCcsIG1vZGVsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZGVsKCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ21vZGVsJyk7XG5cdH1cblxuXHRzZXRSZWFkeSh2YWwgPSB0cnVlKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIHZhbCk7XG5cdFx0dmFsID8gdGhpcy50cmlnZ2VyKCdyZWFkeScpIDogdGhpcy50cmlnZ2VyKCdidXN5Jyk7XG5cdH1cblxuXHRzZXRWaWV3KG5hbWUsIHZpZXcpe1xuXHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgbmFtZSksIHZpZXcpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0Vmlld3Modmlld3Mpe1xuXHRcdGZvcihsZXQgdCBpbiB2aWV3cyl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIHQpLCB2aWV3c1t0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0VmlldyhuYW1lID0gJ2RlZmF1bHQnKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSk7XG5cdH1cblxuXHRzZXRNb2R1bGVOYW1lKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbW9kdWxlTmFtZScsIHZhbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNb2R1bGVOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ21vZHVsZU5hbWUnKTtcblx0fVxuXG5cdGdldE1vZHVsZVByZWZpeCgpe1xuXHRcdHJldHVybiBbdGhpcy5hcHAuZ2V0T3B0aW9ucygncGF0aHMubW9kdWxlcycpLCB0aGlzLmdldE1vZHVsZU5hbWUoKV0uam9pbignLycpO1xuXHR9XG5cblx0cHJlbG9hZExpYihsaXN0ID0ge30pe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0aWYodHlwZW9mIGxpc3QgIT09ICdvYmplY3QnKXtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGxpc3Qpe1xuXHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnB1c2gobGlzdFt0XSk7XG5cdFx0XHRcdFx0dGhpcy5tYWtlW2xpc3RbdF1dKHt9KS4kbGlzdEFsbCgpXG5cdFx0XHRcdFx0XHQudGhlbigoZGF0YSk9Pntcblx0XHRcdFx0XHRcdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKSl7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXRPcHRpb25zKCdsaWJzJywge30pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0T3B0aW9ucygnbGlicycpW3RdID0gZGF0YTtcblx0XHRcdFx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuaW5kZXhPZihsaXN0W3RdKSA+IC0xKXtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuaW5kZXhPZihsaXN0W3RdKSwgMSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHQuY2F0Y2goKGVycik9Pntcblx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLnJlcG9ydChlcnIpO1xuXHRcdFx0XHRcdFx0XHRyZWplY3QoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRxdWVlVXBsb2FkKG5hbWUsIGxpc3Qpe1xuXHRcdC8vaGFzaCAoZmllbGROYW1lPT5maWxlc0xpc3QpXG5cdFx0aWYoIXRoaXMuZ2V0V29ya2luZygndXBsb2FkUXVlZScpKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZygndXBsb2FkUXVlZScsIHt9KTtcblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCd1cGxvYWRRdWVlJylbbmFtZV0gPSBsaXN0O1xuXHR9XG5cblx0ZXhlY1VwbG9hZHMoaXRlbSl7XG5cdFx0bGV0IGxpc3QgPSB0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnKTtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGlmKHR5cGVvZiBsaXN0ICE9PSAnb2JqZWN0Jyl7XG5cdFx0XHRcdHJlc29sdmUoaXRlbSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCd1cGxvYWRpbmcnLCB7fSk7XG5cdFx0XHRcdGZvcihsZXQgdCBpbiBsaXN0KXtcblx0XHRcdFx0XHRsZXQgZmllbGRGaWxlcyA9IGxpc3RbdF07XG5cdFx0XHRcdFx0aWYgKGZpZWxkRmlsZXMubGVuZ3RoID4gMSl7XG5cdFx0XHRcdFx0XHRpdGVtW3RdID0gW107XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRpdGVtW3RdID0gJyc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvcihsZXQgZiA9IDA7IGYgPCBmaWVsZEZpbGVzLmxlbmd0aDsgZisrKXtcblx0XHRcdFx0XHRcdGlmKCF0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpLmhhc093blByb3BlcnR5KHQpKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XSA9IDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdKys7XG5cdFx0XHRcdFx0XHR0aGlzLmFwcC5nZXRXb3JraW5nKCd1cGxvYWRlcicpXG5cdFx0XHRcdFx0XHRcdC51cGxvYWQoZmllbGRGaWxlc1tmXSlcblx0XHRcdFx0XHRcdFx0LnRoZW4oKHNhdmVkRmlsZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2ZpbGUgdXBsb2FkZWQnLCB0LGYsIHNhdmVkRmlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XS0tO1xuXHRcdFx0XHRcdFx0XHRcdGlmKHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0gPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmKEFycmF5LmlzQXJyYXkoaXRlbVtmXSkpe1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVt0XS5wdXNoKHNhdmVkRmlsZS5oYXNoKTtcblx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRcdGl0ZW1bdF0gPSBzYXZlZEZpbGUuaGFzaDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoT2JqZWN0LmtleXModGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKSkubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoaXRlbSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHQuY2F0Y2goKGVycik9Pntcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KGVycik7XG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycik7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZihPYmplY3Qua2V5cyh0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdHJlc29sdmUoaXRlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdG9uQWZ0ZXJSZW5kZXIoKXtcblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb250cm9sbGVyO1xuIiwiaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfRk9STV9QUkVGSVggPSAnZm9ybV8nLFxuXHRPUFRfREVGQVVMVF9ST0xFX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX0ZPUk1fVElUTEUgPSAnRm9ybSBkZWZhdWx0IHRpdGxlJyxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiA9IHt9LFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCA9IFsnb3B0aW9ucycsICdtYW5pZmVzdCcsICdhcHAnXTtcblxuY2xhc3Mgbm90Rm9ybSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygncHJlZml4JywgT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgpO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudHMnLCBbXSk7XG5cdFx0aWYgKCF0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5zZXREYXRhKG5ldyBub3RSZWNvcmQoe30sIHRoaXMuZ2V0RGF0YSgpKSk7XG5cdFx0fVxuXHRcdHRoaXMub24oJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbigncmVzZXQnLCB0aGlzLm9uUmVzZXQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2FuY2VsJywgdGhpcy5vbkNhbmNlbC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCk7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKCkge1xuXHRcdGxldCBtYW5pZmVzdCA9IHRoaXMuZ2V0TWFuaWZlc3QoKTtcblx0XHRpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QuYWN0aW9ucykge1xuXHRcdFx0cmV0dXJuIG1hbmlmZXN0LmFjdGlvbnMuaGFzT3duUHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKSkgPyBtYW5pZmVzdC5hY3Rpb25zW3RoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJyldIDogbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Rm9ybUZpZWxkc0xpc3QoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKSxcblx0XHRcdGxpc3QgPSBbXSxcblx0XHRcdHJvbGUgPSB0aGlzLmdldE9wdGlvbnMoJ3JvbGUnLCBPUFRfREVGQVVMVF9ST0xFX05BTUUpO1xuXHRcdGlmIChhY3Rpb25EYXRhKSB7XG5cblx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcykge1xuXHRcdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMuaGFzT3duUHJvcGVydHkocm9sZSkpIHtcblx0XHRcdFx0XHRsaXN0ID0gYWN0aW9uRGF0YS5maWVsZHNbcm9sZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHQvKlxuXHRcdFJlbmRlcmluZ1xuXHQqL1xuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0fVxuXG5cdGdldFBhcnRUZW1wbGF0ZU5hbWUoZm9ybVBhcnQpe1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgZm9ybVBhcnQ7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBpbnB1dCA9IHtcblx0XHRcdFx0ZGF0YTogdGhpcy5nZXRXcmFwcGVyRGF0YSgpLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZSgnd3JhcHBlcicpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0aWQ6IHRoaXMuZ2V0T3B0aW9ucygnaWQnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6W1xuXHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCB0aGlzLmJpbmRGb3JtRXZlbnRzLmJpbmQodGhpcyldLFxuXHRcdFx0XHRcdFtbJ2FmdGVyUmVuZGVyJywgJ2FmdGVyVXBkYXRlJ10sIHRoaXMucmVuZGVyQ29tcG9uZW50cy5iaW5kKHRoaXMpXVxuXHRcdFx0XHRdXG5cdFx0XHR9O1xuXHRcdFx0bGV0IHdyYXBwZXIgPSBuZXcgbm90Q29tcG9uZW50KGlucHV0KTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnd3JhcHBlcicsIHdyYXBwZXIpO1xuXHRcdH1cblx0fVxuXG5cdGdldFdyYXBwZXJEYXRhKCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiBhY3Rpb25EYXRhLnRpdGxlID8gYWN0aW9uRGF0YS50aXRsZSA6IE9QVF9ERUZBVUxUX0ZPUk1fVElUTEVcblx0XHR9O1xuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykgJiYgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoKXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRsZXQgZmllbGROYW1lID0gdGhpcy5nZXRGb3JtRmllbGRzTGlzdCgpW3RdO1xuXHRcdFx0XHR0aGlzLmFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xlYXJGaWVsZHNDb21wb25lbnRzKCkge1xuXHRcdGxldCBjb21wcyA9IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpO1xuXHRcdHdoaWxlIChjb21wcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb21wc1swXS5jb21wb25lbnQuZGVzdHJveSgpO1xuXHRcdFx0Y29tcHMuc3BsaWNlKDAsIDEpO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpYnMoKXtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0b3B0aW9uczoge30sXG5cdFx0XHRtYW5pZmVzdDoge30sXG5cdFx0XHRhcHA6IHt9LFxuXHRcdH07XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJykpIHtcblx0XHRcdHJlc3VsdC5vcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKG5vdENvbW1vbi5nZXRBcHAoKSAmJiBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJykpe1xuXHRcdFx0cmVzdWx0LmFwcCA9IG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkICYmIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkpe1xuXHRcdFx0cmVzdWx0Lm1hbmlmZXN0ID0gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKS5maWVsZHM7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSkge1xuXHRcdGxldCBkZWYgPSBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OLFxuXHRcdFx0ZmllbGRzTGlicyA9IHRoaXMuZ2V0RmllbGRzTGlicygpO1xuXHRcdGZvcihsZXQgdCBvZiBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCl7XG5cdFx0XHRpZiAoZmllbGRzTGlicy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBmaWVsZHNMaWJzW3RdLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpe1xuXHRcdFx0XHRyZXR1cm4gZmllbGRzTGlic1t0XVtmaWVsZE5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0YWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKSB7XG5cdFx0bGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpO1xuXHRcdGxldCByZWMgPSB7XG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRuYW1lOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHRpdGxlOiBmaWVsZFR5cGUubGFiZWwgfHwgZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHR0eXBlOiBmaWVsZFR5cGUudHlwZSxcblx0XHRcdFx0bGFiZWw6IGZpZWxkVHlwZS5sYWJlbCxcblx0XHRcdFx0YXJyYXk6IGZpZWxkVHlwZS5hcnJheSxcblx0XHRcdFx0ZGVmYXVsdDogZmllbGRUeXBlLmRlZmF1bHQsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ2hlbHBlcnMnLCdsaWJzJyxmaWVsZE5hbWUpKVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0bGV0IGhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdGlzQ2hlY2tlZDogKHBhcmFtcyk9Pntcblx0XHRcdFx0cmV0dXJuIHBhcmFtcy5pdGVtLnZhbHVlID09PSB0aGlzLmdldERhdGEoZmllbGROYW1lKTtcblx0XHRcdH0sXG5cdFx0XHRmaWVsZDogcmVjLmZpZWxkLFxuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKClcblxuXHRcdH0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblx0XHRyZWMuY29tcG9uZW50ID0gbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZShmaWVsZFR5cGUudHlwZSlcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldEZvcm1UYXJnZXRFbGVtZW50KGZpZWxkVHlwZS50YXJnZXQpLFxuXHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUxhc3QnLFxuXHRcdFx0XHRldmVudHM6W1xuXHRcdFx0XHRcdFsnYWZ0ZXJEYXRhQ2hhbmdlJywgdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5wdXNoKHJlYyk7XG5cdH1cblxuXHRjb2xsZWN0RGF0YUZyb21Db21wb25lbnRzKHBhcmFtcyl7XG5cdFx0bm90Q29tbW9uLmxvZygnY29sbGVjdCBkYXRhIGZyb20gY29tcG9uZW50cycsIHBhcmFtcyk7XG5cdH1cblxuXHRnZXRGb3JtVGFyZ2V0RWxlbWVudCh0YXJnZXQgPSAnYm9keScpe1xuXHRcdGlmICghdGFyZ2V0KXt0YXJnZXQgPSAnYm9keSc7fVxuXHRcdGxldCByZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdGlmICghcmVzICYmIHRhcmdldCE9PSdib2R5Jyl7XG5cdFx0XHR0YXJnZXQgPSAnYm9keSc7XG5cdFx0XHRyZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdH1cblx0XHRpZighcmVzICYmIHRhcmdldD09J2JvZHknKXtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gcmVzO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0RGF0YSBtYW5hZ2VtZW50XG5cdCovXG5cblx0Y29sbGVjdERhdGEoKSB7XG5cdFx0Ly9sZXQgZGF0YSA9IHRoaXMuY29sbGVjdERhdGFGcm9tQ29tcG9uZW50cy5iaW5kKHRoaXMpO1xuXHR9XG5cblx0YmluZEZvcm1FdmVudHMoKXtcblx0XHRsZXQgdGFyZ2V0UXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5Jyk7XG5cdFx0aWYodGFyZ2V0UXVlcnkpe1xuXHRcdFx0bGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0UXVlcnkpO1xuXHRcdFx0aWYodGFyZ2V0KXtcblx0XHRcdFx0dGhpcy5zZXRPcHRpb25zKCd0YXJnZXRFbCcsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpe1xuXHRcdFx0bGV0XHRmb3JtID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcblx0XHRcdGlmKGZvcm0pe1xuXHRcdFx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMub25TdWJtaXQuYmluZCh0aGlzKSk7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcigncmVzZXQnLCB0aGlzLm9uUmVzZXQuYmluZCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlRmllbGQoZmllbGROYW1lKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmZpZWxkLm5hbWUgPT09IGZpZWxkTmFtZSl7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR1cGRhdGUoKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0RXZlbnQgaGFuZGxlcnNcblx0Ki9cblxuXHRvblN1Ym1pdCgpIHtcblxuXHR9XG5cblx0b25DYW5jZWwoKSB7XG5cblx0fVxuXG5cdG9uUmVzZXQoKSB7XG5cblx0fVxuXG5cdGdldEZpZWxkcygpIHtcblxuXHR9XG5cblx0YWRkRmllbGQoKSB7XG5cblx0fVxuXG5cdHJlbW92ZUZpZWxkKCkge1xuXG5cdH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEZvcm07XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi4vbm90UmVjb3JkJztcbmltcG9ydCBub3RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvbm90Rm9ybS5qcyc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX1ZJRVcgPSAnZWRpdCcsXG4gIE9QVF9ERUZBVUxUX0FDVElPTiA9ICdjcmVhdGUnLFxuICBPUFRfREVGQVVMVF9JVEVNID0ge1xuICAgIF9pZDogbnVsbCxcbiAgICB0aXRsZTogJ1RpdGxlJyxcbiAgICB2YWx1ZTogJ1ZhbHVlJ1xuICB9O1xuXG5jbGFzcyBDUlVEQ3JlYXRlIGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpIHtcbiAgICAgICAgc3VwZXIocGFyZW50LmFwcCk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG4gICAgICAgIG5vdENvbW1vbi5sb2coJ0NSVUQgQ3JlYXRlJyk7XG4gICAgICAgIHRoaXMuc2V0Vmlld3Moe1xuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcbiAgICAgICAgICAgICAgICBjb21tb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5jb21tb24nKSB8fCB0cnVlLFxuICAgICAgICAgICAgICAgIHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuICAgICAgICAgICAgICAgIGhlbHBlcnM6IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnByZWxvYWQnKSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMuaW5pdERhdGEuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5yZW5kZXJGb3JtLmJpbmQodGhpcykpXG4gICAgICAgICAgICAudGhlbih0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY3JlYXRlRGVmYXVsdCgpe1xuICAgICAgaWYgKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5kZWZhdWx0SXRlbScpICYmIHRoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSAmJiB0aGlzLnBhcmVudC5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0pe1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKG5vdENvbW1vbi5leHRlbmQoe30sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5kZWZhdWx0SXRlbScpKSk7XG4gICAgICB9ZWxzZSBpZih0aGlzLnBhcmVudC5pbml0SXRlbSl7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5pbml0SXRlbSgpO1xuICAgICAgfWVsc2UgaWYgKHRoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSAmJiB0aGlzLnBhcmVudC5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0pe1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKG5vdENvbW1vbi5leHRlbmQoe30sIE9QVF9ERUZBVUxUX0lURU0pKTtcbiAgICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gbmV3IG5vdFJlY29yZCh7fSwgbm90Q29tbW9uLmV4dGVuZCh7fSwgT1BUX0RFRkFVTFRfSVRFTSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGluaXREYXRhKCl7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgdHJ5e1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLmNyZWF0ZURlZmF1bHQoKSk7XG4gICAgICAgICAgcmVzb2x2ZSh0aGlzLmdldERhdGEoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZSl7XG4gICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXJXcmFwcGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIoJ2RlZmF1bHQnLCB7fSwge30pO1xuICAgIH1cblxuICAgIHJlbmRlckZvcm0oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PntcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IG5ldyBub3RGb3JtKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLmdldERhdGEoKSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0FDVElPTixcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS50YXJnZXRRdWVyeScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS50YXJnZXRRdWVyeScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JykpLFxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5wcmVmaXgnKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdwcmVmaXgnKSxcbiAgICAgICAgICAgICAgICAgICAgcm9sZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnJvbGUnKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdyb2xlJyksXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuICAgICAgICAgICAgICAgICAgICAgIGxpbmtCYWNrVG9MaXN0OiB0aGlzLnBhcmVudC5saW5rQmFja1RvTGlzdCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZTogKHBhcmFtcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlcyA9IHBhcmFtcy5lLnRhcmdldC5maWxlcyB8fCBwYXJhbXMuZS5kYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90Q29tbW9uLmxvZygnZmlsZSBjaGFuZ2VkJywgZmlsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lICYmIGZpbGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucXVlZVVwbG9hZChwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lLCBmaWxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdENvbW1vbi5sb2coJ3N1Ym1pdCBmb3JtICcsIHRoaXMubmV3SXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leGVjVXBsb2Fkcyh0aGlzLmdldERhdGEoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odGhpcy5jcmVhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXJTdWJtaXQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvVG9UYWJsZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpYnM6IHRoaXMuZ2V0T3B0aW9ucygnbGlicycpLFxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuaGVscGVycycpIHx8IHt9KVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbXG4gICAgICAgICAgICAgICAgICAgIFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgWydhZnRlclN1Ym1pdCcsICdhZnRlclJlc3RvcmUnXSwgdGhpcy5wYXJlbnQuYmFja1RvTGlzdC5iaW5kKHRoaXMucGFyZW50KVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZShpdGVtKSB7XG4gICAgICAgIGl0ZW1bJyQnICsgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmFjdGlvbicpXSgpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgbm90Q29tbW9uLmxvZygnZm9ybSBzYXZlZCcsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBub3RDb21tb24uZXJyb3IoJ2Zvcm0gbm90IHNhdmVkJywgcmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVEQ3JlYXRlO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfUEFHRV9TSVpFID0gMjAsXG5cdE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSID0gMCxcblx0T1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04gPSAxLFxuXHRPUFRfREVGQVVMVF9TT1JUX0ZJRUxEID0gJ19pZCcsXG5cdE9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DID0gJ3ByZXByb2Nlc3Nvcic7XG5cbmNsYXNzIG5vdFRhYmxlIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgW10pO1xuXHRcdGlmKCF0aGlzLmdldERhdGEoKSB8fCAhQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoJ3Jvd3MnKSkpe1xuXHRcdFx0dGhpcy5zZXREYXRhKHtyb3dzOltdfSk7XG5cdFx0fVxuXHRcdHRoaXMucmVzZXRQYWdlcigpO1xuXHRcdHRoaXMucmVzZXRGaWx0ZXIoKTtcblx0XHR0aGlzLnJlc2V0U29ydGVyKCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRkYXRhOiB7fSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiAndGFibGVfd3JhcHBlcidcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdHJlbmRlckFuZDogdGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJJbnNpZGUuYmluZCh0aGlzKVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudCcsIGNvbXBvbmVudCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVySW5zaWRlKCkge1xuXHRcdHRoaXMucmVuZGVySGVhZGVyKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdFx0dGhpcy5yZW5kZXJCb2R5KCk7XG5cdFx0dGhpcy5iaW5kU2VhcmNoKCk7XG5cdFx0dGhpcy5iaW5kQ3VzdG9tQmluZGluZ3MoKTtcblx0fVxuXG5cdHJlbmRlckhlYWRlcigpIHtcblx0XHR2YXIgdGFibGVIZWFkZXIgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGhlYWQgdHInKTtcblx0XHRpZiAoIXRhYmxlSGVhZGVyKSByZXR1cm47XG5cdFx0bGV0IGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBuZXdUaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJyk7XG5cdFx0XHRuZXdUaC5pbm5lckhUTUwgPSBmaWVsZHNbaV0udGl0bGU7XG5cdFx0XHRpZiAoZmllbGRzW2ldLmhhc093blByb3BlcnR5KCdzb3J0YWJsZScpICYmIGZpZWxkc1tpXS5zb3J0YWJsZSkge1xuXHRcdFx0XHR0aGlzLmF0dGFjaFNvcnRpbmdIYW5kbGVycyhuZXdUaCwgZmllbGRzW2ldLnBhdGgpO1xuXHRcdFx0fVxuXHRcdFx0dGFibGVIZWFkZXIuYXBwZW5kQ2hpbGQobmV3VGgpO1xuXHRcdH1cblx0fVxuXG5cdGF0dGFjaFNvcnRpbmdIYW5kbGVycyhoZWFkQ2VsbCwgZmllbGROYW1lKSB7XG5cdFx0aGVhZENlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5jaGFuZ2VTb3J0aW5nT3B0aW9ucyhoZWFkQ2VsbCwgZmllbGROYW1lKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblx0XHRoZWFkQ2VsbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdH1cblxuXHRjaGFuZ2VTb3J0aW5nT3B0aW9ucyhlbCwgZmllbGROYW1lKSB7XG5cdFx0aWYgKGZpZWxkTmFtZSA9PT0gdGhpcy5nZXRTb3J0ZXIoKS5zb3J0QnlGaWVsZCl7XG5cdFx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRcdHNvcnRCeUZpZWxkOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHNvcnREaXJlY3Rpb246IC0xICogdGhpcy5nZXRTb3J0ZXIoKS5zb3J0RGlyZWN0aW9uLFxuXHRcdFx0fSk7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRcdHNvcnRCeUZpZWxkOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHNvcnREaXJlY3Rpb246IE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmIChlbC5wYXJlbnROb2RlKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsLnBhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0gPT09IGVsKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ25vbmUnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0U29ydGVyKCkuc29ydERpcmVjdGlvbiA+IDApIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ2FzY2VuZGluZycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdkZXNjZW5kaW5nJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0U29ydGVyKGhhc2gpIHtcblx0XHQvL2NvbnNvbGUubG9nKCdzZXRTb3J0ZXInLCBoYXNoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3NvcnRlcicsIGhhc2gpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZURhdGEoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0U29ydGVyKCl7XG5cdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0c29ydEJ5RmllbGQ6IE9QVF9ERUZBVUxUX1NPUlRfRklFTEQsXG5cdFx0XHRzb3J0RGlyZWN0aW9uOiBPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTixcblx0XHR9KTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdGdldEZpbHRlclNlYXJjaCgpIHtcblx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmdldEZpbHRlcigpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldEZpbHRlcigpICE9PSBudWxsICYmIHR5cGVvZiB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2ggIT09IG51bGwpID8gdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2gudG9TdHJpbmcoKSA6ICcnO1xuXHR9XG5cblx0aW52YWxpZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ29uZVBhZ2VyJykpIHtcblx0XHRcdHdoaWxlKHRoaXMuZ2V0RGF0YSgncm93cycpLmxlbmd0aD4wKXtcblx0XHRcdFx0dGhpcy5nZXREYXRhKCdyb3dzJykucG9wKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR9XG5cdH1cblxuXHRzZXRGaWx0ZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgaGFzaCk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlRGF0YSgpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpcy5zZXRGaWx0ZXIoe30pO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0UGFnZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncGFnZXInLCBoYXNoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdwYWdlcicsIHtcblx0XHRcdHBhZ2VTaXplOiBpc05hTih0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJykpID8gT1BUX0RFRkFVTFRfUEFHRV9TSVpFOnRoaXMuZ2V0T3B0aW9ucygncGFnZVNpemUnKSxcblx0XHRcdHBhZ2VOdW1iZXI6IGlzTmFOKHRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpKSA/IE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSOnRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncGFnZXInKTtcblx0fVxuXG5cdHNldFVwZGF0aW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndXBkYXRpbmcnLCB0cnVlKTtcblx0fVxuXG5cdHNldFVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd1cGRhdGluZycsIGZhbHNlKTtcblx0fVxuXG5cdGlmVXBkYXRpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndXBkYXRpbmcnKTtcblx0fVxuXG5cdHVwZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKSB7XG5cdFx0XHRpZiAodGhpcy5pZlVwZGF0aW5nKCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly9sb2FkIGZyb20gc2VydmVyXG5cdFx0XHRsZXQgcXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKHt9KVxuXHRcdFx0XHQuc2V0RmlsdGVyKHRoaXMuZ2V0RmlsdGVyKCkpXG5cdFx0XHRcdC5zZXRTb3J0ZXIodGhpcy5nZXRTb3J0ZXIoKSlcblx0XHRcdFx0LnNldFBhZ2VyKHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSwgdGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpO1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0cXVlcnkuJGxpc3QoKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJyRsaXN0IGZvciB0YWJsZScsIGRhdGEpO1xuXHRcdFx0XHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRcdFx0XHRyb3dzOiB0aGlzLmdldERhdGEoJ3Jvd3MnKS5jb25jYXQoZGF0YSlcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR0aGlzLnByb2NjZXNzRGF0YSgpO1xuXHRcdFx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKGUpO1xuXHRcdFx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9sb2NhbCBtYWdpY1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0dGhpcy5wcm9jY2Vzc0RhdGEoKTtcblx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdH1cblx0fVxuXG5cdHByb2NjZXNzRGF0YSgpIHtcblx0XHR2YXIgdGhhdEZpbHRlciA9IHRoaXMuZ2V0RmlsdGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0RmlsdGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyICE9PSBudWxsICYmIHR5cGVvZiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2ggIT09IG51bGwgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2gubGVuZ3RoID4gMCkge1xuXHRcdFx0Ly9cblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgdGhpcy5nZXREYXRhKCdyb3dzJykuZmlsdGVyKHRoaXMudGVzdERhdGFJdGVtLmJpbmQodGhpcykpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKSk7XG5cdFx0fVxuXHRcdC8vLy9zb3J0ZXJcblx0XHR2YXIgdGhhdFNvcnRlciA9IHRoaXMuZ2V0U29ydGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0U29ydGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0U29ydGVyICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4ge1xuXHRcdFx0XHRsZXQgdDEgPSBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLCBpdGVtMSwge30pLFxuXHRcdFx0XHRcdHQyID0gbm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCxpdGVtMix7fSk7XG5cdFx0XHRcdGlmIChpc05hTih0MSkpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHQxICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdDIgIT09ICd1bmRlZmluZWQnICYmIHQxLmxvY2FsZUNvbXBhcmUpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIHQxLmxvY2FsZUNvbXBhcmUoKSAqIC0gdGhhdFNvcnRlci5zb3J0RGlyZWN0aW9uO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiAoKHQxIDwgdDIpID8gMSA6IC0xKSAqIHRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0YmluZFNlYXJjaCgpIHtcblx0XHR2YXIgc2VhcmNoRWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInNlYXJjaFwiXScpWzBdO1xuXHRcdGlmICghc2VhcmNoRWwpIHJldHVybjtcblx0XHR2YXIgb25FdmVudCA9IChlKSA9PiB7XG5cdFx0XHR0aGlzLnNldEZpbHRlcih7XG5cdFx0XHRcdGZpbHRlclNlYXJjaDogZS5jdXJyZW50VGFyZ2V0LnZhbHVlXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH07XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbkV2ZW50KTtcblx0XHRzZWFyY2hFbC5hZGRFdmVudExpc3RlbmVyKCdlbnRlcicsIG9uRXZlbnQpO1xuXHR9XG5cblxuXHRiaW5kQ3VzdG9tQmluZGluZ3MoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykgfHwgIXRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IgKHZhciBzZWxlY3RvciBpbiB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHZhciBlbHMgPSB0aGlzLmdldE9wdGlvbigndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdGZvciAodmFyIGVsSWQgPSAwOyBlbElkIDwgZWxzLmxlbmd0aDsgZWxJZCsrKSB7XG5cdFx0XHRcdHZhciBlbCA9IGVsc1tlbElkXTtcblx0XHRcdFx0Zm9yICh2YXIgZXZlbnQgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpW3NlbGVjdG9yXSkge1xuXHRcdFx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl1bZXZlbnRdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvYWROZXh0KCkge1xuXHRcdHRoaXMuZ2V0V29ya2luZygncGFnZXInKS5wYWdlTnVtYmVyKys7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZW5kZXJSb3coaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbmV3Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVFInKSxcblx0XHRcdGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBuZXdUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1REJyksXG5cdFx0XHRcdGZpZWxkID0gZmllbGRzW2ldLFxuXHRcdFx0XHRwcmVwcm9jZXNzZWQgPSBudWxsLFxuXHRcdFx0XHR2YWwgPSBub3RQYXRoLmdldChmaWVsZC5wYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2VkaXRhYmxlJykgJiYgIWZpZWxkLmhhc093blByb3BlcnR5KCdjb21wb25lbnQnKSkge1xuXHRcdFx0XHRuZXdUZC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRFZGl0YWJsZScsIHRydWUpO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0LnBhdGggPSBmaWVsZC5wYXRoO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0Lml0ZW1JZCA9IGl0ZW1bdGhpcy5nZXRPcHRpb25zKCdpdGVtSWRGaWVsZCcpXTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC52YWx1ZSA9IHZhbDtcblx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpPT57XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksIG5ld1RkLnRleHRDb250ZW50KTtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eShPUFRfRklFTERfTkFNRV9QUkVfUFJPQykpIHtcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gZmllbGRbT1BUX0ZJRUxEX05BTUVfUFJFX1BST0NdKHZhbCwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHRcdG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRcdGRhdGE6IGZpZWxkLmNvbXBvbmVudC5kYXRhIHx8IHByZXByb2Nlc3NlZCB8fCB7dmFsLCBpdGVtLCBpbmRleH0sXG5cdFx0XHRcdFx0dGVtcGxhdGU6IGZpZWxkLmNvbXBvbmVudC50ZW1wbGF0ZSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogbmV3VGQsXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBmaWVsZC5jb21wb25lbnQuZXZlbnRzIHx8IFtdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3VGQuaW5uZXJIVE1MID0gcHJlcHJvY2Vzc2VkIHx8IHZhbDtcblx0XHRcdH1cblxuXHRcdFx0aWYoZmllbGQuaGFzT3duUHJvcGVydHkoJ3N0eWxlJykpe1xuXHRcdFx0XHRmb3IobGV0IHN0eWxlIGluIGZpZWxkLnN0eWxlKXtcblx0XHRcdFx0XHRpZihmaWVsZC5zdHlsZS5oYXNPd25Qcm9wZXJ0eShzdHlsZSkpe1xuXHRcdFx0XHRcdFx0bmV3VGQuc3R5bGVbc3R5bGVdID0gZmllbGQuc3R5bGVbc3R5bGVdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2V2ZW50cycpICYmIGZpZWxkLmV2ZW50cykge1xuXHRcdFx0XHRmb3IgKHZhciBqIGluIGZpZWxkLmV2ZW50cykge1xuXHRcdFx0XHRcdG5ld1RkLmFkZEV2ZW50TGlzdGVuZXIoaiwgKGUpPT57XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmllbGQuZXZlbnRzW2pdKHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQ6IGUsXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQ6IG5ld1RkLFxuXHRcdFx0XHRcdFx0XHRpdGVtOiBpdGVtLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdmFsLFxuXHRcdFx0XHRcdFx0XHRmaWVsZDogZmllbGRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bmV3Um93LmFwcGVuZENoaWxkKG5ld1RkKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygncHJvY1JvdycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcm9jUm93JykobmV3Um93LCBpdGVtKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Jvdztcblx0fVxuXG5cdHJlZnJlc2hCb2R5KCkge1xuXHRcdHZhciB0Ym9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRib2R5KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuY2xlYXJCb2R5KCk7XG5cdFx0dGhpcy5jaGVja0ZpbHRlcmVkKCk7XG5cdFx0dmFyIHRoaXNQYWdlU3RhcnRzID0gMCxcblx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpO1xuXHRcdGZvciAodmFyIGkgPSB0aGlzUGFnZVN0YXJ0czsgaSA8IE1hdGgubWluKG5leHRQYWdlRW5kcywgdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5sZW5ndGgpOyBpKyspIHtcblx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHR9XG5cdH1cblxuXHRmaW5kQm9keSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG5cdH1cblxuXHRjbGVhckJvZHkoKSB7XG5cdFx0dmFyIHRhYmxlQm9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRhYmxlQm9keSkgcmV0dXJuO1xuXHRcdHRhYmxlQm9keS5pbm5lckhUTUwgPSAnJztcblx0fVxuXG5cdGNoZWNrRmlsdGVyZWQoKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKSkpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLFtdKTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJCb2R5KCkge1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpKSB7XG5cdFx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdH1cblx0XHR0aGlzLmNoZWNrRmlsdGVyZWQoKTtcblx0XHR2YXIgdGhpc1BhZ2VTdGFydHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpLFxuXHRcdFx0bmV4dFBhZ2VFbmRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyICsgMSksXG5cdFx0XHR0Ym9keSA9IHRoaXMuZmluZEJvZHkoKTtcblxuXHRcdGZvciAodmFyIGkgPSB0aGlzUGFnZVN0YXJ0czsgaSA8IE1hdGgubWluKG5leHRQYWdlRW5kcywgdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5sZW5ndGgpOyBpKyspIHtcblx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHR9XG5cdH1cblxuXHR0ZXN0RGF0YUl0ZW0oaXRlbSl7XG5cdFx0dmFyIHN0clZhbHVlID0gdGhpcy5nZXRGaWx0ZXJTZWFyY2goKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGZvcih2YXIgayBpbiBpdGVtKXtcblx0XHRcdHZhciB0b0NvbXAgPSBpdGVtW2tdLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmICh0b0NvbXAuaW5kZXhPZihzdHJWYWx1ZSk+LTEpe1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFRhYmxlO1xuIiwiaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4uL2NvbXBvbmVudHMvbm90VGFibGUuanMnO1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9QX0RFRkFVTFRfUEFHRV9TSVpFID0gNTAsXG5cdE9QVF9ERUZBVUxUX1ZJRVcgPSAnbGlzdCc7XG5cbmNsYXNzIENSVURMaXN0IGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKSB7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgTGlzdCcpO1xuXHRcdHRoaXMuc2V0Vmlld3Moe1xuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRuYW1lOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0Lm5hbWUnKSB8fCBPUFRfREVGQVVMVF9WSUVXLFxuXHRcdFx0XHRjb21tb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuY29tbW9uJykgfHwgdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0UXVlcnk6IHBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmNvbnRhaW5lclNlbGVjdG9yJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSxcblx0XHRcdFx0aGVscGVyczoge31cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlcldyYXBwZXIuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMudXBkYXRlRGF0YXRhYmxlLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0Jywge30sIHtcblx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5wbHVyYWwnKSxcblx0XHRcdHNob3dBZGRGb3JtOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZShbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpLCAnY3JlYXRlJ10uam9pbignLycpKTtcblx0XHRcdH0sXG5cdFx0bGlua0JhY2tUb0xpc3Q6IHRoaXMucGFyZW50LmxpbmtCYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpLFxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlRGF0YXRhYmxlKCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0cnl7XG5cdFx0XHRcdHRoaXMudGFibGVWaWV3ID0gbmV3IG5vdFRhYmxlKHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRmaWVsZHM6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuZmllbGRzJyksXG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LnRhcmdldFF1ZXJ5Jyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JykpLFxuXHRcdFx0XHRcdFx0aGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5wbHVyYWwnKVxuXHRcdFx0XHRcdFx0fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5oZWxwZXJzJykgfHwge30pLFxuXHRcdFx0XHRcdFx0cGFnZVNpemU6IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhZ2VyLnNpemUnKSB8fCBPUF9ERUZBVUxUX1BBR0VfU0laRSxcblx0XHRcdFx0XHRcdHBhZ2VOdW1iZXI6IDAsXG5cdFx0XHRcdFx0XHRvbmVQYWdlcjogdHJ1ZSxcblx0XHRcdFx0XHRcdGxpdmVMb2FkOiB0cnVlLFxuXHRcdFx0XHRcdFx0aW50ZXJmYWNlOiB0aGlzLm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fWNhdGNoKGUpe1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzaG93TmV4dFBhZ2UoKSB7XG5cdFx0aWYgKHRoaXMudGFibGVWaWV3KSB7XG5cdFx0XHR0aGlzLnRhYmxlVmlldy5sb2FkTmV4dCgpO1xuXHRcdH1cblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURMaXN0O1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL25vdEZvcm0uanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTiA9ICdnZXRSYXcnLFxuXHRPUFRfREVGQVVMVF9BQ1RJT04gPSAndXBkYXRlJyxcblx0T1BUX0RFRkFVTFRfVklFVyA9ICdlZGl0JztcblxuY2xhc3MgQ1JVRFVwZGF0ZSBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIFVwZGF0ZScpO1xuXHRcdHRoaXMuc2V0Vmlld3Moe1xuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRuYW1lOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmNvbW1vbicpIHx8IHRydWUsXG5cdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuXHRcdFx0XHRoZWxwZXJzOiB7fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLmxvYWRJdGVtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnNldERhdGEuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJGb3JtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGxvYWRJdGVtKCkge1xuXHRcdHJldHVybiB0aGlzLm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSh7XG5cdFx0XHQnX2lkJzogdGhpcy5nZXRPcHRpb25zKCdwYXJhbXMuMCcpXG5cdFx0fSlbJyQnKyh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUubG9hZEFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OKV0oKTtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0JywgdGhpcy5nZXREYXRhKCksIHt9KTtcblx0fVxuXG5cdHJlbmRlckZvcm0oKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHR0cnl7XG5cdFx0XHRcdHRoaXMuZm9ybSA9IG5ldyBub3RGb3JtKHtcblx0XHRcdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRhY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9BQ1RJT04sXG5cdFx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnRhcmdldFF1ZXJ5Jyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0XHRwcmVmaXg6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5wcmVmaXgnKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygncHJlZml4JyksXG5cdFx0XHRcdFx0XHRyb2xlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUucm9sZScpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdyb2xlJyksXG5cdFx0XHRcdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0XHRcdFx0XHRmaWxlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGZpbGVzID0gcGFyYW1zLmUudGFyZ2V0LmZpbGVzIHx8IHBhcmFtcy5lLmRhdGFUcmFuc2Zlci5maWxlcztcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdmaWxlIGNoYW5nZWQnLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0aWYocGFyYW1zLmhlbHBlcnMuZmllbGQubmFtZSAmJiBmaWxlcyl7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnF1ZWVVcGxvYWQocGFyYW1zLmhlbHBlcnMuZmllbGQubmFtZSwgZmlsZXMpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0c3VibWl0OiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnc3VibWl0IGZvcm0gJywgcGFyYW1zLml0ZW0pO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZXhlY1VwbG9hZHMocGFyYW1zLml0ZW0pXG5cdFx0XHRcdFx0XHRcdFx0XHQudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0bGliczogdGhpcy5nZXRPcHRpb25zKCdsaWJzJyksXG5cdFx0XHRcdFx0XHRcdGFmdGVyU3VibWl0OiB0aGlzLnBhcmVudC5iYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpLFxuXHRcdFx0XHRcdFx0fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmhlbHBlcnMnKSB8fCB7fSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0XHRbJ2FmdGVyUmVzdG9yZScsICdhZnRlclN1Ym1pdCddLCB0aGlzLnBhcmVudC5iYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpXG5cdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHJlc29sdmVdXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9KTtcblx0XHRcdH1jYXRjaChlKXtcblx0XHRcdFx0cmVqZWN0KGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKGl0ZW0pIHtcblx0XHRpdGVtWyckJysodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmFjdGlvbicpfHxPUFRfREVGQVVMVF9BQ1RJT04pXSgpXG5cdFx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ2Zvcm0gc2F2ZWQnLCByZXN1bHQpO1xuXHRcdFx0XHR0aGlzLnBhcmVudC5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUodGhpcy5nZXRNb2R1bGVOYW1lKCkpO1xuXHRcdFx0XHR0aGlzLnBhcmVudC5ydW5MaXN0KCk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChyZXN1bHQpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdmb3JtIG5vdCBzYXZlZCcsIHJlc3VsdCk7XG5cdFx0XHR9KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURVcGRhdGU7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BUX0RFRkFVTFRfQUNUSU9OID0gJ2RlbGV0ZSc7XG5cbmNsYXNzIENSVUREZWxldGUgZXh0ZW5kcyBub3RDb250cm9sbGVye1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcyl7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgRGVsZXRlJyk7XG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRlbGV0ZS5wcmVsb2FkJykpXG5cdFx0XHQudGhlbigoKT0+e1xuXHRcdFx0XHRpZiAoY29uZmlybSgn0KPQtNCw0LvQuNGC0Ywg0LfQsNC/0LjRgdGMPycpKSB7XG5cdFx0XHRcdFx0dGhpcy5kZWxldGUoKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dGhpcy5wYXJlbnQuYmFja1RvTGlzdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblxuXHRkZWxldGUoKSB7XG5cdFx0bGV0IGFjdGlvbiA9JyQnKyh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZWxldGUuYWN0aW9uJyl8fE9QVF9ERUZBVUxUX0FDVElPTik7XG5cdFx0dGhpcy5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0oeydfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJyl9KVthY3Rpb25dKClcblx0XHRcdC50aGVuKHRoaXMucGFyZW50LmJhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCkpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVERGVsZXRlO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi4vbm90UmVjb3JkJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuY29uc3QgT1BUX0RFRkFVTFRfREVUQUlMU19QUkVGSVggPSAnZGV0YWlsc18nLFxuXHRPUFRfREVGQVVMVF9ST0xFX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX0RFVEFJTFNfVElUTEUgPSAnRGV0YWlscyBkZWZhdWx0IHRpdGxlJyxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiA9IHt9LFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCA9IFsnb3B0aW9ucycsICdtYW5pZmVzdCcsICdhcHAnXTtcblxuY2xhc3Mgbm90RGV0YWlscyBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygncHJlZml4JywgT1BUX0RFRkFVTFRfREVUQUlMU19QUkVGSVgpO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudHMnLCBbXSk7XG5cdFx0aWYgKCF0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5zZXREYXRhKG5ldyBub3RSZWNvcmQoe30sIHRoaXMuZ2V0RGF0YSgpKSk7XG5cdFx0fVxuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKTtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoKSB7XG5cdFx0bGV0IG1hbmlmZXN0ID0gdGhpcy5nZXRNYW5pZmVzdCgpO1xuXHRcdGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC5hY3Rpb25zKSB7XG5cdFx0XHRyZXR1cm4gbWFuaWZlc3QuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpKSA/IG1hbmlmZXN0LmFjdGlvbnNbdGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKV0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHNMaXN0KCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCksXG5cdFx0XHRsaXN0ID0gW10sXG5cdFx0XHRyb2xlID0gdGhpcy5nZXRPcHRpb25zKCdyb2xlJywgT1BUX0RFRkFVTFRfUk9MRV9OQU1FKTtcblx0XHRpZiAoYWN0aW9uRGF0YSkge1xuXHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzKSB7XG5cdFx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xuXHRcdFx0XHRcdGxpc3QgPSBhY3Rpb25EYXRhLmZpZWxkc1tyb2xlXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0fVxuXG5cdGdldFBhcnRUZW1wbGF0ZU5hbWUoZm9ybVBhcnQpe1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgZm9ybVBhcnQ7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBpbnB1dCA9IHtcblx0XHRcdFx0ZGF0YTogdGhpcy5nZXRXcmFwcGVyRGF0YSgpLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZSgnd3JhcHBlcicpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0aWQ6IHRoaXMuZ2V0T3B0aW9ucygnaWQnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6W1xuXHRcdFx0XHRcdFtbJ2FmdGVyUmVuZGVyJywgJ2FmdGVyVXBkYXRlJ10sIHRoaXMucmVuZGVyQ29tcG9uZW50cy5iaW5kKHRoaXMpXVxuXHRcdFx0XHRdXG5cdFx0XHR9O1xuXHRcdFx0bGV0IHdyYXBwZXIgPSBuZXcgbm90Q29tcG9uZW50KGlucHV0KTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnd3JhcHBlcicsIHdyYXBwZXIpO1xuXHRcdH1cblx0fVxuXG5cdGdldFdyYXBwZXJEYXRhKCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiBhY3Rpb25EYXRhLnRpdGxlID8gYWN0aW9uRGF0YS50aXRsZSA6IE9QVF9ERUZBVUxUX0RFVEFJTFNfVElUTEVcblx0XHR9O1xuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykgJiYgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoKXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldEZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZpZWxkc0xpc3QoKVt0XTtcblx0XHRcdFx0dGhpcy5hZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsZWFyRmllbGRzQ29tcG9uZW50cygpIHtcblx0XHRsZXQgY29tcHMgPSB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKTtcblx0XHR3aGlsZSAoY29tcHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29tcHNbMF0uY29tcG9uZW50LmRlc3Ryb3koKTtcblx0XHRcdGNvbXBzLnNwbGljZSgwLCAxKTtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHNMaWJzKCl7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdG9wdGlvbnM6IHt9LFxuXHRcdFx0bWFuaWZlc3Q6IHt9LFxuXHRcdFx0YXBwOiB7fSxcblx0XHR9O1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpKSB7XG5cdFx0XHRyZXN1bHQub3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmIChub3RDb21tb24uZ2V0QXBwKCkgJiYgbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpKXtcblx0XHRcdHJlc3VsdC5hcHAgPSBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCAmJiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpKXtcblx0XHRcdHJlc3VsdC5tYW5pZmVzdCA9IHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkuZmllbGRzO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpIHtcblx0XHRsZXQgZGVmID0gT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTixcblx0XHRcdGZpZWxkc0xpYnMgPSB0aGlzLmdldEZpZWxkc0xpYnMoKTtcblx0XHRmb3IobGV0IHQgb2YgT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1Qpe1xuXHRcdFx0aWYgKGZpZWxkc0xpYnMuaGFzT3duUHJvcGVydHkodCkgJiYgZmllbGRzTGlic1t0XS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpKXtcblx0XHRcdFx0cmV0dXJuIGZpZWxkc0xpYnNbdF1bZmllbGROYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSkge1xuXHRcdGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSxcblx0XHRcdHJlYyA9IG51bGw7XG5cdFx0aWYoZmllbGRUeXBlLmNvbXBvbmVudCl7XG5cdFx0XHRyZWMgPSB0aGlzLmNhc3RDdXN0b20oZmllbGROYW1lLCBmaWVsZFR5cGUpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmVjID0gdGhpcy5jYXN0Q29tbW9uKGZpZWxkTmFtZSwgZmllbGRUeXBlKTtcblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykucHVzaChyZWMpO1xuXHR9XG5cblx0Y2FzdEN1c3RvbShmaWVsZE5hbWUsIGZpZWxkVHlwZSl7XG5cdFx0bGV0IEN1c3RvbUNvbXBvbmVudCA9IG5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdjb21wb25lbnRzJylbZmllbGRUeXBlLmNvbXBvbmVudF07XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBDdXN0b21Db21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldFRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCdcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gcmVjO1xuXHR9XG5cblx0Y2FzdENvbW1vbihmaWVsZE5hbWUsIGZpZWxkVHlwZSl7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiByZWM7XG5cdH1cblxuXHRnZXRUYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jyl7XG5cdFx0aWYgKCF0YXJnZXQpe3RhcmdldCA9ICdib2R5Jzt9XG5cdFx0bGV0IHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0IT09J2JvZHknKXtcblx0XHRcdHRhcmdldCA9ICdib2R5Jztcblx0XHRcdHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0fVxuXHRcdGlmKCFyZXMgJiYgdGFyZ2V0PT0nYm9keScpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHR1cGRhdGVGaWVsZChmaWVsZE5hbWUpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uZmllbGQubmFtZSA9PT0gZmllbGROYW1lKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90RGV0YWlscztcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdERldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9ub3REZXRhaWxzLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04gPSAnZ2V0Jyxcblx0T1BUX0RFRkFVTFRfVklFVyA9ICdkZXRhaWxzJztcblxuY2xhc3MgQ1JVRERldGFpbHMgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpIHtcblx0XHRzdXBlcihwYXJlbnQuYXBwKTtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0bm90Q29tbW9uLmxvZygnQ1JVRCBEZXRhaWxzJyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5jb21tb24nKSB8fCB0cnVlLFxuXHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG5cdFx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLmxvYWRJdGVtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnNldERhdGEuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJEZXRhaWxzLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGxvYWRJdGVtKCkge1xuXHRcdHJldHVybiB0aGlzLm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSh7XG5cdFx0XHQnX2lkJzogdGhpcy5nZXRPcHRpb25zKCdwYXJhbXMuMCcpXG5cdFx0fSlbJyQnICsgKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04pXSgpO1xuXHR9XG5cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdGxldCBpdGVtID0gdGhpcy5nZXREYXRhKCk7XG5cdFx0dmFyIGhlbHBlcnMgPSB7XG5cdFx0XHRJRDogaXRlbSA/IGl0ZW1bdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICsgJ0lEJ10gOiAnJyxcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdGFycmF5OiBmYWxzZVxuXHRcdFx0fSxcblx0XHRcdHVwZGF0ZTogKHBhcmFtcykgPT4ge1xuXHRcdFx0XHR0aGlzLmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZShbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpLCBwYXJhbXMuaXRlbS5faWQsICd1cGRhdGUnXS5qb2luKCcvJykpO1xuXHRcdFx0fSxcblx0XHRcdGRlbGV0ZTogKHBhcmFtcykgPT4ge1xuXHRcdFx0XHR0aGlzLmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZShbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpLCBwYXJhbXMuaXRlbS5faWQsICdkZWxldGUnXS5qb2luKCcvJykpO1xuXHRcdFx0fSxcblx0XHRcdGxpbmtCYWNrVG9MaXN0OiB0aGlzLnBhcmVudC5saW5rQmFja1RvTGlzdC5iaW5kKHRoaXMucGFyZW50KSxcblx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5zaW5nbGUnKVxuXHRcdH07XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0JywgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRyZW5kZXJEZXRhaWxzKCkge1xuXHRcdGxldCBpdGVtID0gdGhpcy5nZXREYXRhKCk7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdG5ldyBub3REZXRhaWxzKHtcblx0XHRcdFx0XHRkYXRhOiBpdGVtLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnRhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnRhcmdldFF1ZXJ5Jyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JykpLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OLFxuXHRcdFx0XHRcdFx0cHJlZml4OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnByZWZpeCcpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdwcmVmaXgnKSxcblx0XHRcdFx0XHRcdHJvbGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMucm9sZScpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdyb2xlJyksXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdFx0bGlua0JhY2tUb0xpc3Q6IHRoaXMucGFyZW50LmxpbmtCYWNrVG9MaXN0KCksXG5cdFx0XHRcdFx0XHRcdGxpYnM6IHRoaXMuZ2V0T3B0aW9ucygnbGliJyksXG5cdFx0XHRcdFx0XHRcdElEOiBpdGVtW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSArICdJRCddLFxuXHRcdFx0XHRcdFx0XHRfX3ZlcnNpb246IGl0ZW0uX192ZXJzaW9uLFxuXHRcdFx0XHRcdFx0fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5oZWxwZXJzJykgfHwge30pXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVUREZXRhaWxzO1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgQ1JVRENyZWF0ZSBmcm9tICcuL0NyZWF0ZSc7XG5pbXBvcnQgQ1JVRExpc3QgZnJvbSAnLi9MaXN0JztcbmltcG9ydCBDUlVEVXBkYXRlIGZyb20gJy4vVXBkYXRlJztcbmltcG9ydCBDUlVERGVsZXRlIGZyb20gJy4vRGVsZXRlJztcbmltcG9ydCBDUlVERGV0YWlscyBmcm9tICcuL0RldGFpbHMnO1xuXG5cbmNsYXNzIENSVURDb250cm9sbGVyIGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKGFwcCwgcGFyYW1zKSB7XG5cdFx0bm90Q29tbW9uLmxvZygncnVubmluZyBDUlVEQ29udHJvbGxlcicpO1xuXHRcdHN1cGVyKGFwcCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCduYW1lcycsIHtcblx0XHRcdHBsdXJhbDogJ3BsdXJhbCcsXG5cdFx0XHRzaW5nbGU6ICdzaW5nbGUnLFxuXHRcdH0pO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJywgdGhpcy5hcHAuZ2V0T3B0aW9ucygnY3J1ZC5jb250YWluZXJTZWxlY3RvcicpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJvdXRlKHBhcmFtcyA9IFtdKXtcblx0XHRpZihwYXJhbXMubGVuZ3RoPT0xKXtcblx0XHRcdGlmKHBhcmFtc1swXSA9PT0gJ2NyZWF0ZScpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5DcmVhdGUocGFyYW1zKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5EZXRhaWxzKHBhcmFtcyk7XG5cdFx0XHR9XG5cdFx0fWVsc2UgaWYocGFyYW1zLmxlbmd0aCA9PSAyKXtcblx0XHRcdGlmIChwYXJhbXNbMV0gPT09ICdkZWxldGUnKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMucnVuRGVsZXRlKHBhcmFtcyk7XG5cdFx0XHR9ZWxzZSBpZihwYXJhbXNbMV0gPT09ICd1cGRhdGUnKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMucnVuVXBkYXRlKHBhcmFtcyk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdGxldCByb3V0ZVJ1bm5lck5hbWUgPSAncnVuJyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIocGFyYW1zWzBdKTtcblx0XHRcdFx0aWYodGhpc1tyb3V0ZVJ1bm5lck5hbWVdICYmIHR5cGVvZiB0aGlzW3JvdXRlUnVubmVyTmFtZV0gPT09ICdmdW5jdGlvbicpe1xuXHRcdFx0XHRcdHJldHVybiB0aGlzW3JvdXRlUnVubmVyTmFtZV0ocGFyYW1zKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5ydW5MaXN0KHBhcmFtcyk7XG5cdH1cblxuXHRydW5DcmVhdGUocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVEQ3JlYXRlKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5MaXN0KHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRExpc3QodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bkRldGFpbHMocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVERGV0YWlscyh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuRGVsZXRlKHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRERlbGV0ZSh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuVXBkYXRlKHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRFVwZGF0ZSh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0b25BZnRlclJlbmRlcigpe1xuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG5cdGJhY2tUb0xpc3QoKSB7XG5cdFx0dGhpcy5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUodGhpcy5nZXRNb2R1bGVOYW1lKCkpO1xuXHR9XG5cblx0bGlua0JhY2tUb0xpc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TW9kdWxlTmFtZSgpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURDb250cm9sbGVyO1xuIiwiaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aC5qcyc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4uL25vdFJvdXRlcic7XG5cbnZhciBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgPSB7XG5cdGNvbnRlbnQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5pbmRleE9mKCdjYXBpdGFsaXplJykgPiAtMSkge1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0LnRvVXBwZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQudGV4dENvbnRlbnQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQ7XG5cdH0sXG5cdGJpbmQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQuYmluZHMpe1xuXHRcdFx0aWYoc2NvcGUuZWxlbWVudC5iaW5kcy5oYXNPd25Qcm9wZXJ0eShzY29wZS5wYXJhbXNbMF0pKXtcblx0XHRcdFx0aWYoc2NvcGUuZWxlbWVudC5iaW5kc1tzY29wZS5wYXJhbXNbMF1dLmluZGV4T2Yoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbikgPiAtMSl7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihzY29wZS5wYXJhbXNbMF0sIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe1xuXHRcdFx0XHRcdHNjb3BlLFxuXHRcdFx0XHRcdGl0ZW0sXG5cdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aWYoIXNjb3BlLmVsZW1lbnQuaGFzT3duUHJvcGVydHkoJ2JpbmRzJykpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5iaW5kcyA9IHt9O1xuXHRcdH1cblx0XHRpZighc2NvcGUuZWxlbWVudC5iaW5kcy5oYXNPd25Qcm9wZXJ0eShzY29wZS5wYXJhbXNbMF0pKXtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYmluZHNbc2NvcGUucGFyYW1zWzBdXSA9IFtdO1xuXHRcdH1cblx0XHRpZihzY29wZS5lbGVtZW50LmJpbmRzW3Njb3BlLnBhcmFtc1swXV0uaW5kZXhPZihzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uKSA9PT0gLTEpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5iaW5kc1tzY29wZS5wYXJhbXNbMF1dLnB1c2goc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbik7XG5cdFx0fVxuXHR9LFxuXHR2YWx1ZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgbGl2ZUV2ZW50cyA9IFsnY2hhbmdlJywgJ2tleXVwJ10sXG5cdFx0XHRvbkV2ZW50ID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAoWydjaGVja2JveCcsICdyYWRpbycsICdzZWxlY3QtbXVsdGlwbGUnXS5pbmRleE9mKHNjb3BlLmVsZW1lbnQudHlwZSkgPiAtMSkge1xuXHRcdFx0XHRcdHN3aXRjaCAoc2NvcGUuZWxlbWVudC50eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnY2hlY2tib3gnOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAncmFkaW8nOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGhlbHBlcnMuZmllbGQubmFtZSwgaGVscGVycy5kYXRhLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQ/c2NvcGUuZWxlbWVudC52YWx1ZTpudWxsKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCA/IHNjb3BlLmVsZW1lbnQudmFsdWUgOiBudWxsKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3NlbGVjdC1tdWx0aXBsZSc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGxldCBzZWxlY3RlZCA9IFtdLnNsaWNlLmNhbGwoc2NvcGUuZWxlbWVudC5zZWxlY3RlZE9wdGlvbnMpLm1hcChhID0+IGEudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCdzZWxlY3QtbXVsdGlwbGUnLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpLCAnIC0+ICcsc2NvcGUuZWxlbWVudC52YWx1ZSk7XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2NvcGUuZWxlbWVudC52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHRcdGlmIChzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlICE9PSB0cnVlKSB7XG5cdFx0XHRpZihzY29wZS5lbGVtZW50LnR5cGUgPT09ICd0ZXh0YXJlYScpe1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmlubmVySFRNTCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0fVxuXHRcdFx0Zm9yIChsZXQgdCBvZiBsaXZlRXZlbnRzKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0LCBvbkV2ZW50KTtcblx0XHRcdH1cblx0XHRcdHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0YXR0cjogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykgfHwgbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKSA/IHJlcyh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXMpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKHNjb3BlLnBhcmFtc1swXSwgc2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0fSxcblx0bmFtZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbiggLypzY29wZSwgaXRlbSwgaGVscGVycyovICkge1xuXG5cdH0sXG5cdGNoZWNrZWQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykgPyByZXN1bHQoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzdWx0KTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPyBzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpIDogc2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcblx0fSxcblx0Y2xhc3M6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlcyA9PT0gJ2Z1bmN0aW9uJykgPyByZXMoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA8IDMgfHwgaXNOYU4oc2NvcGUuYXR0cmlidXRlUmVzdWx0KSkge1xuXHRcdFx0aWYgKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgdXNlZCA9IGZhbHNlO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzY29wZS5wYXJhbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGkgPT09IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbaV0pO1xuXHRcdFx0XHRcdHVzZWQgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXVzZWQpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRvcHRpb25zOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBpID0gMCxcblx0XHRcdG9wdGlvbiA9IG51bGwsXG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9ICd2YWx1ZScsXG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9ICduYW1lJyxcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkJykgJiYgaGVscGVycy5maWVsZC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpID8gaGVscGVycy5maWVsZC5uYW1lIDogJ3ZhbHVlJztcblx0XHRzY29wZS5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdH1cblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMykge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1syXTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBoZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWxwZXJzICE9PSBudWxsICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSAmJiBoZWxwZXJzLmRlZmF1bHQpIHtcblx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyk7XG5cdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBoZWxwZXJzLnBsYWNlaG9sZGVyO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdHZhciBsaWIgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsaWIubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbGliW2ldW3ZhbHVlRmllbGROYW1lXSk7XG5cdFx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGxpYltpXVtsYWJlbEZpZWxkTmFtZV07XG5cdFx0XHRcdGlmIChoZWxwZXJzLmZpZWxkLmFycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSAmJiBBcnJheS5pc0FycmF5KGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSkpe1xuXHRcdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXS5pbmRleE9mKGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSA9PT0gbGliW2ldW3ZhbHVlRmllbGROYW1lXSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aHJlZjpmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0aWYgKCFzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBub3RSb3V0ZXIuZ2V0RnVsbFJvdXRlKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdG5vdFJvdXRlci5uYXZpZ2F0ZShub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5ub3RSb3V0ZXJJbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cbn07XG5leHBvcnQgZGVmYXVsdCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWI7XG4iLCIvKlxuXHRDb21tb24gZnVuY3Rpb25zXG4qL1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG4vKlxuXHRmcmFtZXdvcmsgd2lkZSBwYXJzZXIgZm9yIGRhdGEgYWNjZXNzXG4qL1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuXG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcbi8qXG5cdGJhc2ljIGV2ZW50IGhhbmRsZXJzIGFuZCBjb3JlIGRhdGEgbW9kaWZpZXJzXG4qL1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbi8qXG5cdHNtYXJ0ZXIgaW1hZ2UgY29udHJvbFxuKi9cbmltcG9ydCBub3RJbWFnZSBmcm9tICcuL3RlbXBsYXRlL25vdEltYWdlJztcbi8qXG5cdGFwcGxpY2F0aW9uIG1haW4gaW5mcmFzdHJ1Y3R1cmUgc2V0dGVyXG4qL1xuaW1wb3J0IG5vdEFwcCBmcm9tICcuL25vdEFwcCc7XG4vKlxuXHR1c2VyIGNvbnRyb2xsZXJzXG4qL1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi9ub3RDb250cm9sbGVyJztcblxuaW1wb3J0IHtDUlVEQ29udHJvbGxlcixDUlVEQ3JlYXRlLENSVUREZWxldGUsQ1JVRERldGFpbHMsQ1JVRExpc3QsQ1JVRFVwZGF0ZX0gZnJvbSAnLi9DUlVEJztcblxuLypcblx0dGVtcGxhdGluZyBhbmQgY29tbW9uIHN0cnVjdHVyZXNcbiovXG5cbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL3RlbXBsYXRlL25vdFJlbmRlcmVyJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7IC8vIHNtYXJ0ZXIgd2l0aCBiaW5kaW5ncyBmb3IgZXZlbnRzLCBhY3R1YWx5IHByb3h5XG5cbmltcG9ydCBub3RGb3JtIGZyb20gJy4vY29tcG9uZW50cy9ub3RGb3JtJztcbmltcG9ydCBub3RUYWJsZSBmcm9tICcuL2NvbXBvbmVudHMvbm90VGFibGUnO1xuaW1wb3J0IG5vdERldGFpbHMgZnJvbSAnLi9jb21wb25lbnRzL25vdERldGFpbHMnO1xuXG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJzsgLy9cdGhvdyB0byBpbnRlcmFjdCB3aXRoIGRhdGEgb24gc2VydmVyXG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJzsgLy9cdHdyYXBwZXIgZm9yIGRhdGEgd2l0aCBzZXJ2ZXI8LT52aWV3IGxpdmUgaW50ZXJhY3Rpb25zXG5cbm5vdFRlbXBsYXRlUHJvY2Vzc29ycy5hZGQobm90VGVtcGxhdGVQcm9jZXNzb3JzTGliKTtcblxuZXhwb3J0IHtcblx0bm90Q29tbW9uLFxuXHRub3RQYXRoLFxuXHRub3RCYXNlLFxuXHRub3RJbWFnZSxcblx0bm90QXBwLFxuXHRub3RBUEksXG5cdG5vdENvbnRyb2xsZXIsXG5cdENSVURDb250cm9sbGVyLFxuXHRDUlVEQ3JlYXRlLFxuXHRDUlVERGVsZXRlLFxuXHRDUlVERGV0YWlscyxcblx0Q1JVRExpc3QsXG5cdENSVURVcGRhdGUsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29ycyxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLFxuXHRub3RUZW1wbGF0ZUNhY2hlLFxuXHRub3RSZW5kZXJlcixcblx0bm90Q29tcG9uZW50LFxuXHRub3RGb3JtLFxuXHRub3RSb3V0ZXIsXG5cdG5vdFRhYmxlLFxuXHRub3REZXRhaWxzLFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJ1cGxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25Qcm9ncmVzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNwb25zZVR5cGUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ3aXRoQ3JlZGVudGlhbHMiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsImdldFNlc3Npb25JRCIsImZpbGUiLCJ0eXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwibmFtZSIsInNlbmQiLCJtZXRob2QiLCJkYXRhIiwib25sb2FkIiwidCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJwYXJzZUludCIsInJlc3BvbnNlVGV4dCIsImUiLCJnZXRDb29raWUiLCJ2YWx1ZSIsImRvY3VtZW50IiwiY29va2llIiwicGFydHMiLCJzcGxpdCIsImxlbmd0aCIsInBvcCIsInNoaWZ0IiwiTE9HIiwiQ29tbW9uTG9ncyIsIm5vdEZyYW1ld29yayIsIm5vdENvbW1vbiIsImVycm9yIiwiYXJndW1lbnRzIiwibG9nIiwidHJhY2UiLCJNQU5BR0VSIiwiU3ltYm9sIiwiQ29tbW9uU2hvcnRzIiwiZ2V0TWFuYWdlciIsImdldEFQSSIsInYiLCJDb21tb25PYmplY3RzIiwiZGVmYXVsdHMiLCJvcHRpb25zIiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiY2FsbCIsInRhcmdldCIsInNvdXJjZXMiLCJmb3JFYWNoIiwiZGVzY3JpcHRvcnMiLCJrZXlzIiwic291cmNlIiwicmVkdWNlIiwia2V5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZGVzY3JpcHRvciIsInN5bSIsImVudW1lcmFibGUiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiYmlnIiwic21hbGwiLCJvYmoiLCJmaWx0ZXIiLCJjb250YWluc09iaiIsImljb25zIiwiYmF0Y2giLCJnZXREYXRhIiwicHVzaCIsImEiLCJiIiwicCIsImVxdWFsIiwidG9TdHJpbmciLCJkZWZhdWx0VmFsdWUiLCJvYmoxIiwib2JqMiIsImpRdWVyeSIsImV4dGVuZCIsInZhbCIsInJlZ2lzdHJ5IiwiYXJyYXkiLCJvbGRfaW5kZXgiLCJuZXdfaW5kZXgiLCJrIiwidW5kZWZpbmVkIiwic3BsaWNlIiwiQ29tbW9uU3RyaW5ncyIsInN0cmluZyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsIkNvbW1vbkZ1bmN0aW9ucyIsImZ1bmNzIiwicmVzdWx0IiwiZnVuYyIsIkNvbW1vbkRPTSIsImVsIiwic3RhcnRzV2l0aCIsImFsbEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImxpc3QiLCJqIiwiYXR0cyIsImF0dHJpYnV0ZXMiLCJuIiwibm9kZU5hbWUiLCJDb21tb25BcHAiLCJzdGFydGVyIiwiYXNzaWduIiwiZXh0ZW5kV2l0aCIsIlNVQl9QQVRIX1NUQVJUIiwiU1VCX1BBVEhfRU5EIiwiUEFUSF9TUExJVCIsIlBBVEhfU1RBUlRfT0JKRUNUIiwiUEFUSF9TVEFSVF9IRUxQRVJTIiwiRlVOQ1RJT05fTUFSS0VSIiwiTUFYX0RFRVAiLCJub3RQYXRoIiwicGF0aCIsInN1YlBhdGgiLCJmaW5kIiwic3ViIiwicGFyc2VkIiwic3ViZiIsInJlcGxhY2UiLCJpdGVtIiwiaGVscGVycyIsInN1YlBhdGhQYXJzZWQiLCJmaW5kTmV4dFN1YlBhdGgiLCJnZXRWYWx1ZUJ5UGF0aCIsInJlcGxhY2VTdWJQYXRoIiwicGFyc2VTdWJzIiwiYXR0clZhbHVlIiwic2V0VmFsdWVCeVBhdGgiLCJpc1JlY29yZCIsIm5vcm1pbGl6ZVBhdGgiLCJ0cmlnZ2VyIiwic2V0Iiwic3RlcCIsImhlbHBlciIsInJTdGVwIiwiQXJyYXkiLCJpc0FycmF5IiwicGFyc2VQYXRoU3RlcCIsIm9iamVjdCIsImF0dHJQYXRoIiwiYXR0ck5hbWUiLCJpc0Z1bmN0aW9uIiwibmV3T2JqIiwiYXJncyIsImpvaW4iLCJNRVRBX01FVEhPRF9JTklUIiwiTUVUQV9FVkVOVFMiLCJNRVRBX0RBVEEiLCJNRVRBX1dPUktJTkciLCJNRVRBX09QVElPTlMiLCJub3RCYXNlIiwiaW5wdXQiLCJldmVudHMiLCJvbiIsInNldERhdGEiLCJzZXRXb3JraW5nIiwid29ya2luZyIsInNldE9wdGlvbnMiLCJ3aGF0IiwicmVzIiwic2V0Q29tbW9uIiwiZ2V0Q29tbW9uIiwiZ2V0T3B0aW9ucyIsImdldFdvcmtpbmciLCJldmVudE5hbWVzIiwiZXZlbnRDYWxsYmFja3MiLCJvbmNlIiwiZGVmaW5lSWZOb3RFeGlzdHMiLCJmcm9tIiwiZXZlbnROYW1lIiwiZyIsImV2ZW50Iiwib2ZmIiwiY2FsbGJhY2tzIiwiaCIsInRhcmdldElkIiwiT1BUX01PREVfSElTVE9SWSIsIk9QVF9NT0RFX0hBU0giLCJPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCIsIm5vdFJvdXRlciIsInJvb3QiLCJjbGVhclNsYXNoZXMiLCJyZSIsImhhbmRsZXIiLCJydWxlIiwiYWRkIiwicGFyYW0iLCJyIiwiZnJhZ21lbnQiLCJsb2NhdGlvbiIsImRlY29kZVVSSSIsInBhdGhuYW1lIiwic2VhcmNoIiwid2luZG93IiwibWF0Y2giLCJocmVmIiwiY3VycmVudCIsImdldEZyYWdtZW50IiwiaW5pdCIsImlzSW5pdGlhbGl6ZWQiLCJjaGVjayIsInNldEluaXRpYWxpemVkIiwibG9vcEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjaGVja0xvY2F0aW9uIiwiYmluZCIsImhyZWZDbGljayIsImZ1bGxSRSIsImFwcGx5IiwiaG9zdCIsInB1c2hTdGF0ZSIsImdldEZ1bGxSb3V0ZSIsImJvZHkiLCJnZXRBbGxMaW5rcyIsImluaXRSZXJvdXRpbmciLCJnZXRBdHRyaWJ1dGUiLCJsaW5rIiwibm90Um91dGVySW5pdGlhbGl6ZWQiLCJmdWxsTGluayIsInByZXZlbnREZWZhdWx0IiwibmF2aWdhdGUiLCJub3RBUElPcHRpb25zIiwibm90QVBJUXVlZSIsInJlcXVlc3RzUGVyU2Vjb25kIiwicXVlZSIsImludCIsImluUHJvZ3Jlc3MiLCJ0b0NhbGwiLCJjbGVhckludGVydmFsIiwicnVuIiwibm90QVBJIiwiaWQiLCJnb29kIiwiYmFkIiwibWFrZVJlcXVlc3QiLCJyZXNwb25zZU9LIiwicmVzcG9uc2VGYWlsZWQiLCJyZXF1ZXN0SlNPTiIsInRoZW4iLCJuZXh0IiwiY2F0Y2giLCJnZXRJZCIsIm1vZGVsTmFtZSIsImdldE1vZGVsTmFtZSIsIm1ha2VVcmwiLCJnZXRKU09OIiwibm90SW1hZ2UiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgiLCJURU1QTEFURV9UQUciLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCIsIkNPTVBPTkVOVF9JRF9QUkVGSVgiLCJQQVJUX0lEX1BSRUZJWCIsIkRFRkFVTFRfUExBQ0VSIiwiREVGQVVMVF9QTEFDRVJfTE9PUCIsIk9QVFMiLCJNRVRBX0NBQ0hFIiwibm90VGVtcGxhdGVDYWNoZSIsImhpZGVUZW1wbGF0ZXMiLCJyZWdpc3RlciIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJtYXAiLCJsb2FkT25lIiwiY2FsbGJhY2siLCJvUmVxdWVzdCIsImRpdiIsImRhdGFzZXQiLCJub3RUZW1wbGF0ZU5hbWUiLCJub3RUZW1wbGF0ZVVSTCIsInNyY0VsZW1lbnQiLCJzZXRPbmUiLCJlbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJhZGRGcm9tVGV4dCIsImNsb25lTm9kZSIsImNvbnQiLCJ0ZXh0Iiwibm90VGVtcGxhdGVzRWxlbWVudHMiLCJlbElkIiwicGFyZW50Tm9kZSIsImxpYiIsImdldEhUTUwiLCJ0ZW1wbGF0ZUlubmVySFRNTCIsInRlbXBsYXRlQ29udEVsIiwid3JhcCIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZIiwiREVGQVVMVF9GSUxURVIiLCJERUZBVUxUX1BBR0VfTlVNQkVSIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJub3RJbnRlcmZhY2UiLCJtYW5pZmVzdCIsImxpbmUiLCJyZWNvcmQiLCJhY3Rpb25OYW1lIiwicmVjb3JkUkUiLCJmaWVsZE5hbWUiLCJpbmQiLCJsZW4iLCJpbmQyIiwic3RhcnRTbGljZSIsImVuZFNsaWNlIiwiZ2V0QXR0ciIsIm1vZGVsIiwiYWN0aW9uRGF0YSIsInBhcnNlTGluZSIsInBvc3RGaXgiLCJyZXN1bHRJZCIsInByZWZpeGVzIiwiaW5kZXgiLCJjb25jYXQiLCJwcmUiLCJnZXRBY3Rpb25zIiwiYWN0aW9ucyIsInNldEZpbHRlciIsImZpbHRlckRhdGEiLCJzb3J0ZXJEYXRhIiwicGFnZU51bWJlciIsInBhZ2VTaXplIiwic2V0UGFnZXIiLCJyZXF1ZXN0RGF0YSIsImRhdGFQcm92aWRlck5hbWUiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJnZXRBY3Rpb25EYXRhIiwicmVxdWVzdFBhcmFtcyIsImNvbGxlY3RSZXF1ZXN0RGF0YSIsInJlcXVlc3RQYXJhbXNFbmNvZGVkIiwiZW5jb2RlUmVxdWVzdCIsImdldElEIiwiZ2V0VVJMIiwicXVlZVJlcXVlc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiYWZ0ZXJTdWNjZXNzUmVxdWVzdCIsIm5vdFJlY29yZCIsIk1FVEFfSU5URVJGQUNFIiwiTUVUQV9QUk9YWSIsIk1FVEFfQ0hBTkdFIiwiTUVUQV9DSEFOR0VfTkVTVEVEIiwiTUVUQV9TQUwiLCJNRVRBX01BUF9UT19JTlRFUkZBQ0UiLCJERUZBVUxUX0FDVElPTl9QUkVGSVgiLCJNRVRBX1JFVFVSTl9UT19ST09UIiwiY3JlYXRlUHJvcGVydHlIYW5kbGVycyIsIm93bmVyIiwiY29udGV4dCIsInJlc1RhcmdldCIsIlJlZmxlY3QiLCJFcnJvciIsInZhbHVlVG9SZWZsZWN0Iiwibm90UHJvcGVydHkiLCJnZXRSb290IiwicGF0aFRvIiwiaXNQcm94eSIsImlzUHJvcGVydHkiLCJQcm94eSIsInByb3h5IiwiY3JlYXRlUmVjb3JkSGFuZGxlcnMiLCJjcmVhdGVDb2xsZWN0aW9uIiwibm90UmVjb3JkSW50ZXJmYWNlIiwiaW5pdFByb3BlcnRpZXMiLCJpbnRlcmZhY2VVcCIsImN1clBhdGgiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiaXRlbXMiLCJjb2xsZWN0aW9uIiwiZ2V0QWN0aW9uc0NvdW50IiwiYWN0aW9uVXAiLCJyZXF1ZXN0Iiwib2JqZWN0UGFydCIsInNldEF0dHIiLCJzZXRGaW5kQnkiLCJyZXNldEZpbHRlciIsImdldEZpbHRlciIsInNldFNvcnRlciIsImdldFNvcnRlciIsInNldFBhZ2VOdW1iZXIiLCJzZXRQYWdlU2l6ZSIsInJlc2V0UGFnZXIiLCJnZXRQYWdlciIsIk9QVF9DT05UUk9MTEVSX1BSRUZJWCIsIk9QVF9SRUNPUkRfUFJFRklYIiwibm90QXBwIiwicmVzb3VyY2VzIiwicHJlSW5pdFJvdXRlciIsImluaXRNYW5hZ2VyIiwiaW5pdEFQSSIsImluaXRUZW1wbGF0ZXMiLCJzZXRNYW5hZ2VyIiwiYXBpIiwic2V0QVBJIiwicHJvbSIsImFkZExpYkZyb21VUkwiLCJpbml0TWFuaWZlc3QiLCJyZXBvcnQiLCJzZXRJbnRlcmZhY2VNYW5pZmVzdCIsInNldFJvb3QiLCJyZVJvdXRlRXhpc3RlZCIsInJvdXRpZUlucHV0Iiwicm91dGVCbG9jayIsInBhdGhzIiwiY29udHJvbGxlciIsImJpbmRDb250cm9sbGVyIiwiYWRkTGlzdCIsImxpc3RlbiIsInVwZGF0ZSIsInVwZGF0ZUludGVyZmFjZXMiLCJpbml0Q29udHJvbGxlciIsImFsbFJlc291cmNlc1JlYWR5Iiwic3RhcnRBcHAiLCJpbml0Um91dGVyIiwiY29udHJvbGxlck5hbWUiLCJhcHAiLCJjdHJsIiwiY2xlYXJJbnRlcmZhY2VzIiwibWFuaWZlc3RzIiwicmVjb3JkTWFuaWZlc3QiLCJyZWNvcmREYXRhIiwib25SZXNvdXJjZVJlYWR5IiwiTUVUQV9QUk9DRVNTT1JTIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzIiwic2V0UHJvY2Vzc29yIiwiZ2V0UHJvY2Vzc29yIiwiTUVUQV9DT01QT05FTlRTIiwibm90UmVuZGVyZXIiLCJyZW5kZXIiLCJjb21wb25lbnQiLCJpbml0RGF0YSIsImluaXRPcHRpb25zIiwiaW5pdFdvcmtpbmciLCJ0ZW1wbGF0ZSIsImluaXRUZW1wbGF0ZSIsIm9uQ2hhbmdlIiwiTWF0aCIsInJhbmRvbSIsImdldEJyZWFkQ3J1bXBzIiwiY2xlYXJTdGFzaCIsInNldFdvcmtpbmdNYXBwaW5nIiwiZXhlY1Byb2Nlc3NvcnMiLCJzZWFyY2hGb3JTdWJUZW1wbGF0ZXMiLCJzdGFzaFJlbmRlcmVkIiwiaWZQYXJ0IiwiY29tcG9uZW50UGF0aCIsImNoYW5nZWRQYXRoIiwiaWZGdWxsU3ViUGF0aCIsImNyZWF0ZU1hcHBpbmciLCJmaW5kQWxsUHJvY2Vzc29ycyIsInByb2NzIiwiZWxzIiwiZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgiLCJnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50IiwicHJvY0RhdGEiLCJwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24iLCJwcm9jZXNzb3JFeHByZXNzaW9uIiwiYXR0cmlidXRlRXhwcmVzc2lvbiIsImlmQ29uZGl0aW9uIiwicGFyYW1zIiwicHJvY2Vzc29yTmFtZSIsIm1hcHBpbmciLCJwcm9jU2NvcGUiLCJhdHRyaWJ1dGVSZXN1bHQiLCJnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0IiwicHJvY05hbWUiLCJwcm9jIiwicmVtb3ZlQXR0cmlidXRlIiwiZGVzdHJveVN1YnMiLCJkZXN0cm95IiwiY2xlYXJTdWJUZW1wbGF0ZXMiLCJnZXRTdGFzaCIsInJlbW92ZUNoaWxkIiwibnRFbCIsIm50UmVuZGVyZWQiLCJzdWJzIiwibnQiLCJpZlN1YkVsZW1lbnRSZW5kZXJlZCIsInJlbmRlclN1YiIsImRldGFpbHMiLCJkYXRhUGF0aCIsIm5vdENvbXBvbmVudCIsImNoaWxkTm9kZXMiLCJhZGRUb1N0YXNoIiwic3Rhc2giLCJuZXdTdGFzaCIsImFuY2hvciIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwibm9kZSIsInBsYWNlIiwidGFyZ2V0RWwiLCJsIiwiY2hpbGRyZW4iLCJ0ZXh0Q29udGVudCIsInJlbmRlcmVkIiwicGxhY2VBZnRlciIsInBsYWNlQmVmb3JlIiwicGxhY2VGaXJzdCIsInBsYWNlTGFzdCIsIm5vdFBsYWNlcnMiLCJNRVRBX1BBUlRTIiwicmVzZXRQYXJ0cyIsInByZXBhcmVUZW1wbGF0ZUVsZW1lbnQiLCJpbml0TWFya0VsZW1lbnQiLCJtYXJrRWwiLCJwbGFjZXIiLCJnZXRQbGFjZXIiLCJ0YXJnZXRRdWVyeSIsIm1haW4iLCJ1bnNldFJlYWR5IiwiaHRtbCIsInNldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiYWRkRnJvbVVSTCIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiY2xlYXJQYXJ0cyIsImRlYWQiLCJvZmZBbGwiLCJmb3JFYWNoRGF0YSIsInJlbmRlclBhcnQiLCJwbGFjZVJlbmRlcmVkIiwicmVtb3ZlT2Jzb2xldGVQYXJ0cyIsImJlZm9yZSIsInBsYWNlUGFydCIsImFmdGVyIiwicGFydCIsImdldFBhcnRCeURhdGEiLCJub2RlcyIsImxhc3ROb2RlIiwibm9kZVR5cGUiLCJnZXRQYXJ0cyIsInJlbmRlcmVyIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSIsImFkZFBhcnQiLCJ1cGRhdGVQYXJ0IiwicGlwZSIsImZpbmRBY3R1YWxQYXJ0cyIsInJlbW92ZU5vdEFjdHVhbFBhcnRzIiwiYWN0dWFsUGFydHMiLCJpc0RhdGEiLCJPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IiLCJPUFRfREVGQVVMVF9WSUVXU19QT1NURklYIiwiT1BUX0RFRkFVTFRfVklFV19OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMIiwiT1BUX0RFRkFVTFRfUExVUkFMX05BTUUiLCJPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSIsIk9QVF9ERUZBVUxUX01PRFVMRV9OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0FORCIsIm5vdENvbnRyb2xsZXIiLCJpbml0UmVuZGVyIiwiaW50ZXJmYWNlcyIsImdldEludGVyZmFjZXMiLCJtYWtlIiwidmlld05hbWUiLCJ2aWV3IiwiZ2V0VmlldyIsInRlbXBsYXRlVVJMIiwicHJlZml4IiwiY29tbW9uIiwiZ2V0TW9kdWxlUHJlZml4IiwicG9zdGZpeCIsInRlbXBsYXRlTmFtZSIsInJlbmRlckFuZCIsInZpZXdzIiwiZ2V0TW9kdWxlTmFtZSIsIiRsaXN0QWxsIiwiZXJyIiwiZmllbGRGaWxlcyIsInNhdmVkRmlsZSIsImhhc2giLCJPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCIsIk9QVF9ERUZBVUxUX1JPTEVfTkFNRSIsIk9QVF9ERUZBVUxUX0ZPUk1fVElUTEUiLCJPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QiLCJub3RGb3JtIiwib25TdWJtaXQiLCJvblJlc2V0Iiwib25DYW5jZWwiLCJnZXRNYW5pZmVzdCIsInJvbGUiLCJyZW5kZXJXcmFwcGVyIiwiZm9ybVBhcnQiLCJnZXRXcmFwcGVyRGF0YSIsImdldFBhcnRUZW1wbGF0ZU5hbWUiLCJiaW5kRm9ybUV2ZW50cyIsInJlbmRlckNvbXBvbmVudHMiLCJ3cmFwcGVyIiwidGl0bGUiLCJnZXRGb3JtRmllbGRzTGlzdCIsImFkZEZpZWxkQ29tcG9uZW50IiwiY29tcHMiLCJnZXRBcHAiLCJkZWYiLCJmaWVsZHNMaWJzIiwiZ2V0RmllbGRzTGlicyIsImZpZWxkVHlwZSIsImdldEZpZWxkc0RlZmluaXRpb24iLCJyZWMiLCJsYWJlbCIsInBsYWNlaG9sZGVyIiwiZGVmYXVsdCIsImZpZWxkIiwiZ2V0Rm9ybVRhcmdldEVsZW1lbnQiLCJjb2xsZWN0RGF0YUZyb21Db21wb25lbnRzIiwiZm9ybSIsIk9QVF9ERUZBVUxUX1ZJRVciLCJPUFRfREVGQVVMVF9BQ1RJT04iLCJPUFRfREVGQVVMVF9JVEVNIiwiQ1JVRENyZWF0ZSIsInBhcmVudCIsInNldFZpZXdzIiwicHJlbG9hZExpYiIsInJlbmRlckZvcm0iLCJvbkFmdGVyUmVuZGVyIiwiaW5pdEl0ZW0iLCJjcmVhdGVEZWZhdWx0IiwibGlua0JhY2tUb0xpc3QiLCJmaWxlcyIsImRhdGFUcmFuc2ZlciIsInF1ZWVVcGxvYWQiLCJuZXdJdGVtIiwiZXhlY1VwbG9hZHMiLCJjcmVhdGUiLCJnb1RvVGFibGUiLCJiYWNrVG9MaXN0IiwiT1BUX0RFRkFVTFRfUEFHRV9TSVpFIiwiT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIiLCJPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTiIsIk9QVF9ERUZBVUxUX1NPUlRfRklFTEQiLCJPUFRfRklFTERfTkFNRV9QUkVfUFJPQyIsIm5vdFRhYmxlIiwicm93cyIsInJlc2V0U29ydGVyIiwicmVuZGVySW5zaWRlIiwicmVuZGVySGVhZGVyIiwidXBkYXRlRGF0YSIsInJlbmRlckJvZHkiLCJiaW5kU2VhcmNoIiwiYmluZEN1c3RvbUJpbmRpbmdzIiwidGFibGVIZWFkZXIiLCJuZXdUaCIsInNvcnRhYmxlIiwiYXR0YWNoU29ydGluZ0hhbmRsZXJzIiwiaGVhZENlbGwiLCJjaGFuZ2VTb3J0aW5nT3B0aW9ucyIsInN0eWxlIiwiY3Vyc29yIiwic29ydEJ5RmllbGQiLCJzb3J0RGlyZWN0aW9uIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiaW52YWxpZGF0ZURhdGEiLCJmaWx0ZXJTZWFyY2giLCJpc05hTiIsImlmVXBkYXRpbmciLCJxdWVyeSIsInNldFVwZGF0aW5nIiwiJGxpc3QiLCJwcm9jY2Vzc0RhdGEiLCJyZWZyZXNoQm9keSIsInNldFVwZGF0ZWQiLCJ0aGF0RmlsdGVyIiwidGVzdERhdGFJdGVtIiwidGhhdFNvcnRlciIsInNvcnQiLCJpdGVtMSIsIml0ZW0yIiwidDEiLCJ0MiIsImxvY2FsZUNvbXBhcmUiLCJzZWFyY2hFbCIsIm9uRXZlbnQiLCJjdXJyZW50VGFyZ2V0Iiwic2VsZWN0b3IiLCJnZXRPcHRpb24iLCJuZXdSb3ciLCJuZXdUZCIsInByZXByb2Nlc3NlZCIsIml0ZW1JZCIsInRib2R5IiwiZmluZEJvZHkiLCJjbGVhckJvZHkiLCJjaGVja0ZpbHRlcmVkIiwidGhpc1BhZ2VTdGFydHMiLCJuZXh0UGFnZUVuZHMiLCJtaW4iLCJyZW5kZXJSb3ciLCJ0YWJsZUJvZHkiLCJzdHJWYWx1ZSIsImdldEZpbHRlclNlYXJjaCIsInRvQ29tcCIsIk9QX0RFRkFVTFRfUEFHRV9TSVpFIiwiQ1JVRExpc3QiLCJ1cGRhdGVEYXRhdGFibGUiLCJ0YWJsZVZpZXciLCJsb2FkTmV4dCIsIk9QVF9ERUZBVUxUX0xPQURfQUNUSU9OIiwiQ1JVRFVwZGF0ZSIsImxvYWRJdGVtIiwicnVuTGlzdCIsIkNSVUREZWxldGUiLCJjb25maXJtIiwiZGVsZXRlIiwiYWN0aW9uIiwiT1BUX0RFRkFVTFRfREVUQUlMU19QUkVGSVgiLCJPUFRfREVGQVVMVF9ERVRBSUxTX1RJVExFIiwibm90RGV0YWlscyIsImdldEZpZWxkc0xpc3QiLCJjYXN0Q3VzdG9tIiwiY2FzdENvbW1vbiIsIkN1c3RvbUNvbXBvbmVudCIsImdldFRhcmdldEVsZW1lbnQiLCJDUlVERGV0YWlscyIsInJlbmRlckRldGFpbHMiLCJfaWQiLCJfX3ZlcnNpb24iLCJDUlVEQ29udHJvbGxlciIsInJ1bkNyZWF0ZSIsInJ1bkRldGFpbHMiLCJydW5EZWxldGUiLCJydW5VcGRhdGUiLCJyb3V0ZVJ1bm5lck5hbWUiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIiLCJzY29wZSIsImJpbmRzIiwibGl2ZUV2ZW50cyIsImNoZWNrZWQiLCJzZWxlY3RlZCIsInNlbGVjdGVkT3B0aW9ucyIsInByb2Nlc3NlZFZhbHVlIiwidXNlZCIsIm9wdGlvbiIsInZhbHVlRmllbGROYW1lIiwibGFiZWxGaWVsZE5hbWUiLCJpdGVtVmFsdWVGaWVsZE5hbWUiXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWM7U0FDZixLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFjO1NBQ25CLEtBQUtDLEdBQUwsQ0FBUyxVQUFULElBQXVCRCxHQUE5QjtFQUxrQjtnQkFPSix1QkFBU0UsU0FBVCxFQUFvQkMsTUFBcEIsRUFBNEI7T0FDckMsSUFBSUMsQ0FBVCxJQUFjRixTQUFkLEVBQXlCO1FBQ25CLElBQUlHLENBQVQsSUFBY0YsTUFBZCxFQUFzQjtRQUNqQkQsVUFBVUUsQ0FBVixFQUFhRSxjQUFiLENBQTRCSCxPQUFPRSxDQUFQLENBQTVCLENBQUosRUFBNEM7U0FDdkNFLFFBQVEsSUFBSUMsS0FBSixFQUFaO1dBQ01DLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsV0FBbEM7V0FDTUMsR0FBTixHQUFZUixVQUFVRSxDQUFWLEVBQWFELE9BQU9FLENBQVAsQ0FBYixFQUF3Qk0sT0FBeEIsQ0FBZ0MsSUFBaEMsTUFBMEMsQ0FBMUMsR0FBOEMsS0FBS0MsV0FBTCxDQUFpQlYsVUFBVUUsQ0FBVixFQUFhRCxPQUFPRSxDQUFQLENBQWIsQ0FBakIsQ0FBOUMsR0FBMEZILFVBQVVFLENBQVYsRUFBYUQsT0FBT0Us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
