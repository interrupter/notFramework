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
        _this.preloadLib(_this.parent.getOptions('views.create.preload')).then(_this.loadItem.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderForm.bind(_this)).then(_this.onAfterRender.bind(_this)).catch(notCommon.report);
        return _ret = _this, possibleConstructorReturn(_this, _ret);
    }

    createClass(CRUDCreate, [{
        key: 'loadItem',
        value: function loadItem() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                try {
                    var t = _this2.initItem();
                    if (t) {
                        _this2.setData(t);
                        resolve(t);
                    } else {
                        reject(t);
                    }
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
                try {
                    _this3.form = new notForm({
                        data: _this3.getData(),
                        options: {
                            action: _this3.parent.getOptions('views.create.action') || OPT_DEFAULT_ACTION,
                            targetQuery: _this3.parent.getOptions('views.create.targetQuery') || _this3.parent.getOptions('targetQuery'),
                            targetEl: document.querySelector(_this3.parent.getOptions('views.create.targetQuery') || _this3.parent.getOptions('targetQuery')),
                            prefix: _this3.parent.getOptions('views.create.prefix') || _this3.parent.getOptions('prefix'),
                            role: _this3.parent.getOptions('views.create.role') || _this3.parent.getOptions('role'),
                            helpers: notCommon.extend({
                                file: function file(params) {
                                    var files = params.e.target.files || params.e.dataTransfer.files;
                                    notCommon.log('file changed', files);
                                    if (params.helpers.field.name && files) {
                                        _this3.queeUpload(params.helpers.field.name, files);
                                    }
                                },
                                submit: function submit() {
                                    notCommon.log('submit form ', _this3.newItem);
                                    _this3.execUploads(_this3.newItem).then(_this3.create.bind(_this3));
                                },
                                afterSubmit: function afterSubmit() {
                                    _this3.goToTable();
                                },
                                libs: _this3.getOptions('libs')
                            }, _this3.parent.getOptions('views.create.helpers') || {})
                        },
                        events: [['afterRender', resolve], [['afterSubmit', 'afterRestore'], _this3.backToList.bind(_this3)]]
                    });
                } catch (e) {
                    reject(e);
                }
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
    }, {
        key: 'backToList',
        value: function backToList() {
            this.parent.app.getWorking('router').navigate(this.parent.getModuleName());
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

			item['$' + (this.parent.getOptions('views.update.action') || OPT_DEFAULT_ACTION$1)]().then(function (result) {
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
			var action = '$' + (this.parent.getOptions('views.delete.action') || OPT_DEFAULT_ACTION$2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybS5qcyIsIi4uL3NyYy9DUlVEL0NyZWF0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFRhYmxlLmpzIiwiLi4vc3JjL0NSVUQvTGlzdC5qcyIsIi4uL3NyYy9DUlVEL1VwZGF0ZS5qcyIsIi4uL3NyYy9DUlVEL0RlbGV0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdERldGFpbHMuanMiLCIuLi9zcmMvQ1JVRC9EZXRhaWxzLmpzIiwiLi4vc3JjL0NSVUQvQ29udHJvbGxlci5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSkge1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvciAodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IgKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwdXRGaWxlKHVwbG9hZCAvKiBvYmplY3QoZmlsZSwgb25Qcm9ncmVzcywgdXJsKSovICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRpZiAoeGhyLnVwbG9hZCkge1xuXHRcdFx0XHQvLyBwcm9ncmVzcyBiYXJcblx0XHRcdFx0aWYgKHVwbG9hZC5vblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZC5vblByb2dyZXNzLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCAvKmUqLyApIHtcblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0Ly8gc3RhcnQgdXBsb2FkXG5cdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0XHR4aHIub3BlbignUFVUJywgdXBsb2FkLnVybCwgdHJ1ZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignWF9GSUxFTkFNRScsIGVuY29kZVVSSUNvbXBvbmVudCh1cGxvYWQuZmlsZS5uYW1lKSk7XG5cdFx0XHRcdHhoci5zZW5kKHVwbG9hZC5maWxlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRwdXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQVVQnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdGRlbGV0ZUpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ0RFTEVURScsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChwYXJzZUludChzdGF0dXMpID09PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9IChlKSA9PiByZWplY3QoZSk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRTZXNzaW9uSUQ6IGZ1bmN0aW9uKG5hbWUgPSAnU2Vzc2lvbklEJykge1xuXHRcdHJldHVybiB0aGlzLmdldENvb2tpZShuYW1lKTtcblx0fSxcblx0Z2V0Q29va2llOiAobmFtZSkgPT4ge1xuXHRcdGxldCB2YWx1ZSA9ICc7ICcgKyBkb2N1bWVudC5jb29raWUsXG5cdFx0XHRwYXJ0cyA9IHZhbHVlLnNwbGl0KCc7ICcgKyBuYW1lICsgJz0nKTtcblx0XHRpZiAocGFydHMubGVuZ3RoID09IDIpIHtcblx0XHRcdHJldHVybiBwYXJ0cy5wb3AoKS5zcGxpdCgnOycpLnNoaWZ0KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTmV0d29yaztcbiIsIi8vZGlydHkgaGFjayB0byByZW1vdmUgbm8tY29uc29sZSB3YXJuaW5nIG9mIGVzbGludFxuLyogZ2xvYmFsIG5vdEZyYW1ld29yayovXG5jb25zdCBMT0cgPSAnY29uc29sZSc7XG52YXIgQ29tbW9uTG9ncyA9IHtcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHRsb2c6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmxvZyguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRpZighbm90RnJhbWV3b3JrLm5vdENvbW1vbi5nZXQoJ3Byb2R1Y3Rpb24nKSl7XG5cdFx0XHR3aW5kb3dbTE9HXS5lcnJvciguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0dHJhY2U6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cblx0bW92ZUl0ZW0oYXJyYXksIG9sZF9pbmRleCwgbmV3X2luZGV4KSB7XG5cdFx0aWYgKG5ld19pbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcblx0XHRcdHZhciBrID0gbmV3X2luZGV4IC0gYXJyYXkubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKChrLS0pICsgMSkge1xuXHRcdFx0XHRhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFycmF5LnNwbGljZShuZXdfaW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRfaW5kZXgsIDEpWzBdKTtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aChzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHVuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHRoaXMuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIG51bGwpO1xuXHR9XG5cblx0cGFyc2VQYXRoU3RlcChzdGVwLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGxldCByU3RlcCA9IG51bGw7XG5cdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUykgPT09IDAgJiYgaGVscGVyKXtcblx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfSEVMUEVSUywgJycpO1xuXHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRpZihoZWxwZXIuaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF07XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID09PSAwICYmIGl0ZW0pe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwgJycpO1xuXHRcdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fVxuXG5cdC8vOjpmaWVsZE5hbWUucmVzdWx0XG5cdC8ve31cblx0Ly97ZmllbGROYW1lOiAndGFyZ2V0UmVjb3JkRmllbGQnfVxuXHQvLy8vWyd0YXJnZXRSZWNvcmRGaWVsZCcsICdyZXN1bHQnXVxuXHRwYXJzZVBhdGgocGF0aCwgaXRlbSwgaGVscGVyKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cGF0aCA9IHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdHBhdGhbaV0gPSB0aGlzLnBhcnNlUGF0aFN0ZXAocGF0aFtpXSwgaXRlbSwgaGVscGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRub3JtaWxpemVQYXRoKHBhdGgpe1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH1lbHNle1xuXHRcdFx0d2hpbGUocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA+IC0xKXtcblx0XHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwnJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdHNtYWxsID0gW1widG9kb1wiXSxcblx0XHRiaWcgPSBbXCJ0b2RvXCIsIFwibGVuZ3RoXCJdXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0Ki9cblxuXHRpZkZ1bGxTdWJQYXRoKGJpZywgc21hbGwpe1xuXHRcdGlmIChiaWcubGVuZ3RoPHNtYWxsLmxlbmd0aCl7cmV0dXJuIGZhbHNlO31cblx0XHRmb3IobGV0IHQgPTA7IHQgPCBzbWFsbC5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZihzbWFsbFt0XSAhPT0gYmlnW3RdKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpLFxuXHRcdFx0aXNGdW5jdGlvbiA9IGF0dHJOYW1lLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKT4tMTtcblx0XHRpZiAoaXNGdW5jdGlvbil7XG5cdFx0XHRhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0fVxuXHRcdGlmICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIHR5cGVvZiBvYmplY3RbYXR0ck5hbWVdICE9PSAndW5kZWZpbmVkJyAmJiBvYmplY3RbYXR0ck5hbWVdICE9PSBudWxsKXtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uP29iamVjdFthdHRyTmFtZV0oe2l0ZW0sIGhlbHBlcnN9KTpvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChuZXdPYmosIGF0dHJQYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gbmV3T2JqO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7b2JqZWN0W2F0dHJOYW1lXSA9IHt9O31cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGpvaW4oKXtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX01FVEhPRF9JTklUID0gU3ltYm9sKCdpbml0JyksXG5cdE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0dGhpc1tNRVRBX0VWRU5UU10gPSB7fTtcblx0XHR0aGlzW01FVEFfREFUQV0gPSB7fTtcblx0XHR0aGlzW01FVEFfV09SS0lOR10gPSB7fTtcblx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSB7fTtcblx0XHR0aGlzW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdFtNRVRBX01FVEhPRF9JTklUXShpbnB1dCl7XG5cdFx0aWYgKCFpbnB1dCl7XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH1cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykpe1xuXHRcdFx0Zm9yKGxldCB0IG9mIGlucHV0LmV2ZW50cyl7XG5cdFx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSl7XG5cdFx0XHR0aGlzLnNldERhdGEoaW5wdXQuZGF0YSk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ3dvcmtpbmcnKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoaW5wdXQud29ya2luZyk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoaW5wdXQub3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiAqL1xuXHRcdFx0XHR3aGF0ID0gYXJnc1swXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiBlbGVtZW50ICovXG5cdFx0XHRcdG5vdFBhdGguc2V0KGFyZ3NbMF0gLyogcGF0aCAqLyAsIHdoYXQgLyogY29sbGVjdGlvbiAqLyAsIHVuZGVmaW5lZCAvKiBoZWxwZXJzICovICwgYXJnc1sxXSAvKiB2YWx1ZSAqLyApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Z2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggKi9cblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdH1cblx0XHRcdFx0LyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoIHdpdGggZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdGNhc2UgMjpcblx0XHRcdHtcblx0XHRcdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0XHRpZiAocmVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHQvKiBubyBkYXRhLCByZXR1cm4gZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdFx0XHRcdHJldHVybiBhcmdzWzFdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8qIGRhdGEsIHJldHVybiBpdCAqL1xuXHRcdFx0XHRcdHJldHVybiByZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8qIHJldHVybiBmdWxsIGNvbGxlY3Rpb24gKi9cblx0XHRkZWZhdWx0OlxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gd2hhdDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdENPUkUgT0JKRUNUXG5cdFx0XHREQVRBIC0gaW5mb3JtYXRpb25cblx0XHRcdE9QVElPTlMgLSBob3cgdG8gd29ya1xuXHRcdFx0V09SS0lORyAtIHRlbXBvcmFyaWx5IGdlbmVyYXRlZCBpbiBwcm9jY2Vzc1xuXHQqL1xuXG5cdHNldERhdGEoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9EQVRBXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXREYXRhKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXREYXRhKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfREFUQV0sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRPcHRpb25zKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0T3B0aW9ucygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9PUFRJT05TXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFdvcmtpbmcoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRXb3JraW5nKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0V29ya2luZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1dPUktJTkddLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Lypcblx0XHRFVkVOVFMgaGFuZGxpbmdcblx0Ki9cblxuXHRvbihldmVudE5hbWVzLCBldmVudENhbGxiYWNrcywgb25jZSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRub3RDb21tb24uZGVmaW5lSWZOb3RFeGlzdHModGhpc1tNRVRBX0VWRU5UU10sIG5hbWUsIFtdKTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnB1c2goe1xuXHRcdFx0XHRjYWxsYmFja3M6IGV2ZW50Q2FsbGJhY2tzLFxuXHRcdFx0XHRvbmNlOiBvbmNlLFxuXHRcdFx0XHRjb3VudDogMFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR0cmlnZ2VyKCkge1xuXHRcdGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLFxuXHRcdFx0ZXZlbnROYW1lID0gYXJncy5zaGlmdCgpO1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWUpKSB7XG5cdFx0XHRldmVudE5hbWUgPSBbZXZlbnROYW1lXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0VWRU5UU10uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaChldmVudCA9PiB7XG5cdFx0XHRcdFx0aWYgKGV2ZW50Lm9uY2UpIHtcblx0XHRcdFx0XHRcdHRoaXMub2ZmKG5hbWUsIGV2ZW50LmNhbGxiYWNrcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LmNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmYoZXZlbnROYW1lcyAvKiBhcnJheSBvZiBldmVudCBuYW1lcyAqLyAsIGV2ZW50Q2FsbGJhY2tzIC8qIGFycmF5IG9mIGNhbGxiYWNrcyAqLyApIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRsZXQgdGFyZ2V0SWQgPSAtMTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmZvckVhY2goKGV2ZW50LCBpKSA9PiB7XG5cdFx0XHRcdGlmIChpID09PSAtMSAmJiBldmVudENhbGxiYWNrcyA9PT0gZXZlbnQuY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0dGFyZ2V0SWQgPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmICh0YXJnZXRJZCA+IC0xKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnNwbGljZSh0YXJnZXRJZCwgMSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmZBbGwoKXtcblx0XHRsZXQgZXZlbnRzID0gT2JqZWN0LmtleXModGhpc1tNRVRBX0VWRU5UU10pO1xuXHRcdGZvcihsZXQgdCA9MDsgdDwgZXZlbnRzLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHRoaXNbTUVUQV9FVkVOVFNdLmhhc093blByb3BlcnR5KGV2ZW50c1t0XSkpe1xuXHRcdFx0XHRkZWxldGUgdGhpc1tNRVRBX0VWRU5UU11bZXZlbnRzW3RdXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5jb25zdCBPUFRfTU9ERV9ISVNUT1JZID0gU3ltYm9sKCdoaXN0b3J5JyksXG5cdE9QVF9NT0RFX0hBU0ggPSBTeW1ib2woJ2hhc2gnKSxcblx0T1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwgPSA1MDtcblxuY2xhc3Mgbm90Um91dGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJvdXRlczogW10sXG5cdFx0XHRtb2RlOiBPUFRfTU9ERV9ISVNUT1JZLFxuXHRcdFx0cm9vdDogJy8nLCAvL2Fsd2F5cyBpbiBzbGFzaGVzIC91c2VyLywgLywgL2lucHV0Ly4gYW5kIG5vIC91c2VyIG9yIGlucHV0L2xldmVsXG5cdFx0XHRpbml0aWFsaXplZDogZmFsc2Vcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpc3RvcnkoKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9ISVNUT1JZKTtcblx0fVxuXG5cdGhhc2goKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9IQVNIKTtcblx0fVxuXG5cdHNldFJvb3Qocm9vdCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb290Jywgcm9vdCA/ICcvJyArIHRoaXMuY2xlYXJTbGFzaGVzKHJvb3QpICsgJy8nIDogJy8nKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNsZWFyU2xhc2hlcyhwYXRoKSB7XG5cdFx0Ly9maXJzdCBhbmQgbGFzdCBzbGFzaGVzIHJlbW92YWxcblx0XHRyZXR1cm4gcGF0aC50b1N0cmluZygpLnJlcGxhY2UoL1xcLyQvLCAnJykucmVwbGFjZSgvXlxcLy8sICcnKTtcblx0fVxuXG5cdGFkZChyZSwgaGFuZGxlcikge1xuXHRcdGlmICh0eXBlb2YgcmUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aGFuZGxlciA9IHJlO1xuXHRcdFx0cmUgPSAnJztcblx0XHR9XG5cdFx0bGV0IHJ1bGUgPSB7XG5cdFx0XHRyZTogcmUsXG5cdFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0fTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLnB1c2gocnVsZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRMaXN0KGxpc3QpIHtcblx0XHRmb3IgKGxldCB0IGluIGxpc3QpIHtcblx0XHRcdHRoaXMuYWRkKHQsIGxpc3RbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbW92ZShwYXJhbSkge1xuXHRcdGZvciAodmFyIGkgPSAwLCByOyBpIDwgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5sZW5ndGgsIHIgPSB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldOyBpKyspIHtcblx0XHRcdGlmIChyLmhhbmRsZXIgPT09IHBhcmFtIHx8IHIucmUgPT09IHBhcmFtKSB7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRmbHVzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLydcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGlzSW5pdGlhbGl6ZWQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbml0aWFsaXplZCcpO1xuXHR9XG5cblx0c2V0SW5pdGlhbGl6ZWQodmFsID0gdHJ1ZSl7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnaW5pdGlhbGl6ZWQnLCB2YWwpO1xuXHR9XG5cblx0Z2V0RnJhZ21lbnQoKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gJyc7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnbW9kZScpID09PSBPUFRfTU9ERV9ISVNUT1JZKSB7XG5cdFx0XHRpZiAoIWxvY2F0aW9uKSByZXR1cm4gJyc7XG5cdFx0XHRmcmFnbWVudCA9IHRoaXMuY2xlYXJTbGFzaGVzKGRlY29kZVVSSShsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCkpO1xuXHRcdFx0ZnJhZ21lbnQgPSBmcmFnbWVudC5yZXBsYWNlKC9cXD8oLiopJC8sICcnKTtcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgIT0gJy8nID8gZnJhZ21lbnQucmVwbGFjZSh0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSwgJycpIDogZnJhZ21lbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICghd2luZG93KSByZXR1cm4gJyc7XG5cdFx0XHR2YXIgbWF0Y2ggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRmcmFnbWVudCA9IG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY2xlYXJTbGFzaGVzKGZyYWdtZW50KTtcblx0fVxuXG5cdGNoZWNrTG9jYXRpb24oKXtcblx0XHRsZXQgY3VycmVudCA9dGhpcy5nZXRXb3JraW5nKCdjdXJyZW50JyksXG5cdFx0XHRmcmFnbWVudCA9dGhpcy5nZXRGcmFnbWVudCgpLFxuXHRcdFx0aW5pdCA9IHRoaXMuaXNJbml0aWFsaXplZCgpO1xuXHRcdGlmIChjdXJyZW50ICE9PWZyYWdtZW50ICB8fCAhaW5pdCkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JyxmcmFnbWVudCk7XG5cdFx0XHR0aGlzLmNoZWNrKGZyYWdtZW50KTtcblx0XHRcdHRoaXMuc2V0SW5pdGlhbGl6ZWQoKTtcblx0XHR9XG5cdH1cblxuXHRocmVmQ2xpY2soKXtcblx0XHQvL2NvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRnZXRSb290KCl7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0bGlzdGVuKGxvb3BJbnRlcnZhbCA9IE9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JywgJ25vdEluaXRpYWxpemVkJyk7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmdldFdvcmtpbmcoJ2ludGVydmFsJykpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJ2YWwnLCBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrTG9jYXRpb24uYmluZCh0aGlzKSwgbG9vcEludGVydmFsKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5ocmVmQ2xpY2suYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjaGVjayhmKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gZiB8fCB0aGlzLmdldEZyYWdtZW50KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGF0aCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5yZTtcblx0XHRcdGxldCBmdWxsUkUgPSAgdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKHBhdGgpKTtcblx0XHRcdHZhciBtYXRjaCA9IGZyYWdtZW50Lm1hdGNoKGZ1bGxSRSk7XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0bWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5oYW5kbGVyLmFwcGx5KHRoaXMuaG9zdCB8fCB7fSwgbWF0Y2gpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRuYXZpZ2F0ZShwYXRoKSB7XG5cdFx0cGF0aCA9IHBhdGggPyBwYXRoIDogJyc7XG5cdFx0c3dpdGNoICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSl7XG5cdFx0XHRjYXNlIE9QVF9NT0RFX0hJU1RPUlk6IHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygncHVzaCBzdGF0ZScsIHRoaXMuZ2V0RnVsbFJvdXRlKHBhdGgpKTtcblx0XHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgT1BUX01PREVfSEFTSDoge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyguKikkLywgJycpICsgJyMnICsgcGF0aDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RnVsbFJvdXRlKHBhdGggPSAnJyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5jbGVhclNsYXNoZXMocGF0aCk7XG5cdH1cblxuXHRnZXRBbGxMaW5rcygpe1xuXHRcdHZhciBhbGxFbGVtZW50cyA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZignbi1ocmVmJykgPT09IDApIHtcblx0XHRcdFx0XHRsaXN0LnB1c2goYWxsRWxlbWVudHNbal0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0cmVSb3V0ZUV4aXN0ZWQoKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0QWxsTGlua3MoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgbGlzdC5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmluaXRSZXJvdXRpbmcobGlzdFt0XSwgbGlzdFt0XS5nZXRBdHRyaWJ1dGUoJ24taHJlZicpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVyb3V0aW5nKGVsLCBsaW5rKXtcblx0XHRpZiAoIWVsLm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdGxldCBmdWxsTGluayA9IHRoaXMuZ2V0RnVsbFJvdXRlKGxpbmspO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdocmVmJywgZnVsbExpbmspO1xuXHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9Pntcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLm5hdmlnYXRlKGxpbmspO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdGVsLm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90Um91dGVyKCk7XG4iLCJsZXQgbm90QVBJT3B0aW9ucyA9IHtcblx0cnBzOiA1MCxcblx0cHJvdG9jb2w6ICdodHRwJyxcblx0aG9zdDogJ2xvY2FsaG9zdCcsXG5cdHBvcnQ6IDkwMDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSU9wdGlvbnM7XG4iLCJjbGFzcyBub3RBUElRdWVle1xuXHRjb25zdHJ1Y3RvciAocmVxdWVzdHNQZXJTZWNvbmQpIHtcblx0XHR0aGlzLnF1ZWUgPSBbXTtcblx0XHR0aGlzLmludCA9IG51bGw7XG5cdFx0dGhpcy5yZXF1ZXN0c1BlclNlY29uZCA9IHJlcXVlc3RzUGVyU2Vjb25kIHx8IDU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW4oKXtcblx0XHR0aGlzLmludCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLmNoZWNrLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLnJlcXVlc3RzUGVyU2Vjb25kKTtcblx0fVxuXG5cdGNoZWNrKCl7XG5cdFx0aWYgKHRoaXMuaW5Qcm9ncmVzcyl7cmV0dXJuO31cblx0XHRlbHNle1xuXHRcdFx0aWYgKHRoaXMucXVlZS5sZW5ndGggPiAwKXtcblx0XHRcdFx0dGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHRvQ2FsbCA9IHRoaXMucXVlZS5zaGlmdCgpO1xuXHRcdFx0XHR0b0NhbGwoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRuZXh0KCl7XG5cdFx0dGhpcy5pblByb2dyZXNzID0gZmFsc2U7XG5cdH1cblxuXHRhZGQoY2FsbCl7XG5cdFx0dGhpcy5xdWVlLnB1c2goY2FsbCk7XG5cdH1cblxuXHRwYXVzZSgpe1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50KTtcblx0fVxuXG5cdHJlc3VtZSgpe1xuXHRcdHRoaXMucnVuKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJUXVlZTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UuanMnO1xuXG5pbXBvcnQgbm90QVBJT3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuaW1wb3J0IG5vdEFQSVF1ZWUgZnJvbSAnLi9xdWVlLmpzJztcblxuXG5jbGFzcyBub3RBUEkgZXh0ZW5kcyAgbm90QmFzZXtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdENvbW1vbi5leHRlbmQobm90QVBJT3B0aW9ucywgb3B0aW9ucykpO1xuXHRcdHRoaXMucXVlZSA9IG5ldyBub3RBUElRdWVlKHRoaXMuZ2V0T3B0aW9ucygncnBzJykpO1xuXHRcdHRoaXMucXVlZS5ydW4oKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG1ha2VVcmwocGFydHMpIHtcblx0XHRyZXR1cm4gcGFydHMuam9pbignLycpO1xuXHR9XG5cblx0cXVlZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgbWV0aG9kLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdG1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKSB7XG5cdFx0bm90Q29tbW9uLnJlcXVlc3RKU09OKG1ldGhvZCwgdXJsLCBkYXRhKVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3Bvc3QnLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXQob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdnZXQnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZWxldGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdkZWxldGUnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUEk7XG4iLCJpbXBvcnQgbm90QmFzZSAgZnJvbSAnLi4vbm90QmFzZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbWFnZSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuIiwiY29uc3QgUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYID0gJ24tJyxcblx0VEVNUExBVEVfVEFHID0gJ250Jyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SID0gJy0nLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCA9ICdpZicsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVggPSAnbm90X2NvbXBvbmVudF8nLFxuXHRQQVJUX0lEX1BSRUZJWCA9ICdub3RfcGFydF8nLFxuXHRERUZBVUxUX1BMQUNFUiA9ICdwbGFjZScsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1AgPSAncGxhY2VBZnRlcic7XG5cbmNvbnN0IE9QVFMgPSB7XG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCxcblx0VEVNUExBVEVfVEFHLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLFxuXHRERUZBVUxUX1BMQUNFUixcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCxcblx0UEFSVF9JRF9QUkVGSVgsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1Bcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9QVFM7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5jb25zdCBNRVRBX0NBQ0hFID0gU3ltYm9sKCdjYWNoZScpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZUNhY2hlIGV4dGVuZHMgbm90QmFzZXtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DQUNIRV0gPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0dGhpcy5oaWRlVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5yZWdpc3RlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlkZVRlbXBsYXRlcygpe1xuXHRcdGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHR0LmlubmVySFRNTCA9IE9QVFMuVEVNUExBVEVfVEFHICsgJ3tkaXNwbGF5OiBub25lO30nO1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodCk7XG5cdH1cblxuXHRyZWdpc3RlcigpIHtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ3RlbXBsYXRlQ2FjaGUnLCB0aGlzKTtcblx0fVxuXG5cdGxvYWQobWFwKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdGZvciAodmFyIGkgaW4gbWFwKSB7XG5cdFx0XHR0aGlzLmxvYWRPbmUoaSwgbWFwW2ldKTtcblx0XHR9XG5cdH1cblxuXHRsb2FkT25lKGtleSwgdXJsLCBjYWxsYmFjaykge1xuXHRcdHZhciBvUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdG9SZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XG5cdFx0b1JlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZU5hbWUgPSBrZXk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZVVSTCA9IHVybDtcblx0XHRcdGRpdi5pbm5lckhUTUwgPSByZXNwb25zZS5zcmNFbGVtZW50LnJlc3BvbnNlVGV4dDtcblx0XHRcdHRoaXMuc2V0T25lKGtleSwgZGl2KTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKGtleSwgdXJsLCBkaXYpO1xuXG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRvUmVxdWVzdC5zZW5kKCk7XG5cdH1cblxuXHRpZkFsbExvYWRlZCgpe1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMudHJpZ2dlcignbG9hZGVkJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0T25lKGtleSwgZWxlbWVudCkge1xuXHRcdGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7XG5cdFx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5hZGRGcm9tVGV4dChrZXksIGVsZW1lbnQpO1x0XG5cdFx0fVxuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KGtleSkpe1xuXHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vdGhhdC5zZXRMb2FkaW5nKGtleSwgdXJsKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZUlubmVySFRNTCk9Pntcblx0XHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0XHRcdH0pLmNhdGNoKCgpPT57XG5cdFx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGUnLCBrZXksIHVybCk7XG5cdFx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlc0hUTUwpPT57XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoaXMucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdFx0dGhpcy5hZGRMaWIodGVtcGxhdGVzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHRcdH0pLmNhdGNoKChlKT0+e1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZXMgbGliJywgdXJsLGUpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSA9IFsnX2lkJywgJ2lkJywgJ0lEJ10sXG5cdERFRkFVTFRfRklMVEVSID0ge30sXG5cdERFRkFVTFRfUEFHRV9OVU1CRVIgPSAxLFxuXHRERUZBVUxUX1BBR0VfU0laRSA9IDEwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbnRlcmZhY2UgZXh0ZW5kcyBub3RCYXNlIHtcblxuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCkge1xuXHRcdHN1cGVyKHt9KTtcblx0XHR0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldElEKHJlY29yZCwgYWN0aW9uRGF0YSkge1xuXHRcdGxldCByZXN1bHRJZCxcblx0XHRcdGxpc3QgPSBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZLFxuXHRcdFx0cHJlZml4ZXMgPSBbJycsIHRoaXMubWFuaWZlc3QubW9kZWxdO1xuXHRcdGlmIChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpbmRleCcpICYmIGFjdGlvbkRhdGEuaW5kZXgpIHtcblx0XHRcdGxpc3QgPSBbYWN0aW9uRGF0YS5pbmRleF0uY29uY2F0KE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkpO1xuXHRcdH1cblx0XHRmb3IgKGxldCBwcmUgb2YgcHJlZml4ZXMpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgbGlzdCkge1xuXHRcdFx0XHRpZiAocmVjb3JkLmhhc093blByb3BlcnR5KHByZSArIHQpKSB7XG5cdFx0XHRcdFx0cmVzdWx0SWQgPSByZWNvcmRbcHJlICsgdF07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdElkO1xuXHR9XG5cblx0Z2V0QWN0aW9uc0NvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSA/IE9iamVjdC5rZXlzKHRoaXMuZ2V0QWN0aW9ucygpKS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Z2V0QWN0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgPyB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgOiB7fTtcblx0fVxuXG5cdHNldEZpbmRCeShrZXksIHZhbHVlKSB7XG5cdFx0dmFyIG9iaiA9IHt9O1xuXHRcdG9ialtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIHRoaXMuc2V0RmlsdGVyKG9iaik7XG5cdH1cblxuXHRzZXRGaWx0ZXIoZmlsdGVyRGF0YSA9IERFRkFVTFRfRklMVEVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgZmlsdGVyRGF0YSk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIoe30pO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0U29ydGVyKHNvcnRlckRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHNldFBhZ2VTaXplKHBhZ2VTaXplKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSk7XG5cdH1cblxuXHRzZXRQYWdlcihwYWdlU2l6ZSA9IERFRkFVTFRfUEFHRV9TSVpFLCBwYWdlTnVtYmVyID0gREVGQVVMVF9QQUdFX05VTUJFUikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0UGFnZXIoKTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRXb3JraW5nKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRXb3JraW5nKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdGNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlcXVlc3REYXRhID0ge307XG5cdFx0aWYgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdkYXRhJykpICYmIEFycmF5LmlzQXJyYXkoYWN0aW9uRGF0YS5kYXRhKSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpb25EYXRhLmRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGRhdGFQcm92aWRlck5hbWUgPSAnZ2V0JyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoYWN0aW9uRGF0YS5kYXRhW2ldKTtcblx0XHRcdFx0aWYgKHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gJiYgdHlwZW9mIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRyZXF1ZXN0RGF0YSA9IG5vdENvbW1vbi5leHRlbmQocmVxdWVzdERhdGEsIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0oKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVlc3REYXRhO1xuXHR9XG5cblx0ZW5jb2RlUmVxdWVzdChkYXRhKXtcblx0XHRsZXQgcCA9ICc/Jztcblx0XHRmb3IobGV0IHQgaW4gZGF0YSl7XG5cdFx0XHRwICs9IGVuY29kZVVSSUNvbXBvbmVudCh0KSsnPScrZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFbdF0pKycmJztcblx0XHR9XG5cdFx0cmV0dXJuIHA7XG5cdH1cblxuXHQvL3JldHVybiBQcm9taXNlXG5cdHJlcXVlc3QocmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zID0gdGhpcy5jb2xsZWN0UmVxdWVzdERhdGEoYWN0aW9uRGF0YSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zRW5jb2RlZCA9IHRoaXMuZW5jb2RlUmVxdWVzdChyZXF1ZXN0UGFyYW1zKSxcblx0XHRcdGlkID0gdGhpcy5nZXRJRChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpLFxuXHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwgKyByZXF1ZXN0UGFyYW1zRW5jb2RlZCwgaWQsIEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpKVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0YWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKSB7XG5cdFx0aWYgKHRoaXMgJiYgYWN0aW9uRGF0YSAmJiBhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpc0FycmF5JykgJiYgYWN0aW9uRGF0YS5pc0FycmF5KSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZGF0YVt0XSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YVt0XSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSBuZXcgbm90UmVjb3JkKHRoaXMubWFuaWZlc3QsIGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnO1xuXG5jb25zdCBNRVRBX0lOVEVSRkFDRSA9IFN5bWJvbCgnaW50ZXJmYWNlJyksXG5cdE1FVEFfUFJPWFkgPSBTeW1ib2woJ3Byb3h5JyksXG5cdE1FVEFfQ0hBTkdFID0gU3ltYm9sKCdjaGFuZ2UnKSxcblx0TUVUQV9DSEFOR0VfTkVTVEVEID0gU3ltYm9sKCdjaGFuZ2UubmVzdGVkJyksXG5cdE1FVEFfU0FMID0gW1xuXHRcdCdnZXRBdHRyJyxcblx0XHQnZ2V0QXR0cnMnLFxuXHRcdCdpc1Byb3BlcnR5Jyxcblx0XHQnaXNSZWNvcmQnLFxuXHRcdCdnZXRNYW5pZmVzdCcsXG5cdFx0J3NldEF0dHInLFxuXHRcdCdzZXRBdHRycycsXG5cdFx0J2dldERhdGEnLFxuXHRcdCdzZXREYXRhJyxcblx0XHQnZ2V0SlNPTicsXG5cdFx0J29uJyxcblx0XHQnb2ZmJyxcblx0XHQndHJpZ2dlcidcblx0XSxcblx0TUVUQV9NQVBfVE9fSU5URVJGQUNFID0gW1xuXHRcdCdnZXRBY3Rpb25zQ291bnQnLFxuXHRcdCdnZXRBY3Rpb25zJyxcblx0XHQnc2V0RmluZEJ5Jyxcblx0XHQncmVzZXRGaWx0ZXInLFxuXHRcdCdzZXRGaWx0ZXInLFxuXHRcdCdnZXRGaWx0ZXInLFxuXHRcdCdzZXRTb3J0ZXInLFxuXHRcdCdnZXRTb3J0ZXInLFxuXHRcdCdyZXNldFNvcnRlcicsXG5cdFx0J3NldFBhZ2VOdW1iZXInLFxuXHRcdCdzZXRQYWdlU2l6ZScsXG5cdFx0J3NldFBhZ2VyJyxcblx0XHQncmVzZXRQYWdlcicsXG5cdFx0J2dldFBhZ2VyJ1xuXHRdLFxuXHRERUZBVUxUX0FDVElPTl9QUkVGSVggPSAnJCcsXG5cdE1FVEFfUkVUVVJOX1RPX1JPT1QgPSBTeW1ib2woJ3JldHVyblRvUm9vdCcpO1xuXG52YXIgY3JlYXRlUHJvcGVydHlIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdHlwZW9mIHRhcmdldFtrZXldKTtcblxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UHJvcGVydHkgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoZ2V0Um9vdCwgcGF0aFRvLCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1Byb3h5IHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5zZXREYXRhKGl0ZW0pO1xuXHRcdHRoaXMuaXNQcm9wZXJ0eSA9IHRydWU7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX1JFVFVSTl9UT19ST09UXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdFtNRVRBX1JFVFVSTl9UT19ST09UXShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdGxldCByb290ID0gdGhpcy5nZXRPcHRpb25zKCdnZXRSb290JykoKTtcblx0XHRyb290LnRyaWdnZXIoJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfUFJPWFldLCB0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5LCB2YWx1ZSk7XG5cdH1cbn1cblxuXG52YXIgY3JlYXRlUmVjb3JkSGFuZGxlcnMgPSBmdW5jdGlvbihvd25lcikge1xuXHRyZXR1cm4ge1xuXHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIGNvbnRleHQpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgZ2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQsIGNvbnRleHQpO1xuXHRcdFx0aWYgKGtleSA9PT0gJ2lzUHJveHknIHx8IGtleSA9PT0gJ2lzUmVjb3JkJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX01BUF9UT19JTlRFUkZBQ0UuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHJlY29yZCBwcm94eSBzZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCk7XG5cdFx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UmVjb3JkIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG1hbmlmZXN0LCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUHJveHkpIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcigndGhpcyBpcyBQcm94eSBpdGVtJyk7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1JlY29yZCB8fCBpdGVtLmlzUHJvcGVydHkpKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7fSk7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0gPSBuZXcgbm90UmVjb3JkSW50ZXJmYWNlKG1hbmlmZXN0KTtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpcy5pbnRlcmZhY2VVcCgpO1xuXHRcdHRoaXMuaXNSZWNvcmQgPSB0cnVlO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgcmVjb3JkIGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0aW5pdFByb3BlcnRpZXMoaXRlbSwgcGF0aCA9ICcnKSB7XG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtICE9PSBudWxsKSB7XG5cdFx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKGl0ZW0pO1xuXHRcdFx0Zm9yIChsZXQga2V5IG9mIGtleXMpIHtcblx0XHRcdFx0bGV0IGN1clBhdGggPSBwYXRoICsgKHBhdGgubGVuZ3RoID4gMCA/ICcuJyA6ICcnKSArIGtleTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjdXJQYXRoJywgY3VyUGF0aCk7XG5cdFx0XHRcdGlmIChpdGVtLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW1ba2V5XSA9PT0gJ29iamVjdCcgJiYgaXRlbVtrZXldICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXG5cdGFjdGlvblVwKGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLmhhc093blByb3BlcnR5KFtERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0pKSB7XG5cdFx0XHR0aGlzW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSA9ICgpID0+IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlcXVlc3QodGhpcywgaW5kZXgpO1x0XHRcdFxuXHRcdH1cblx0fVxuXHQvKlxuXHQtPiAncGF0aC50by5rZXknLCB2YWx1ZU9mS2V5XG5cdDwtIG9rLCB3aXRoIG9uZSBvbkNoYW5nZSBldmVudCB0cmlnZ2VyZWRcblx0Ki9cblxuXHRzZXRBdHRyKGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gbm90UGF0aC5zZXQoa2V5LCB0aGlzW01FVEFfUFJPWFldLCB7fSwgdmFsdWUpO1xuXHR9XG5cblx0Lypcblx0LT5cblx0e1xuXHRcdCdrZXlQYXRoJzogdmFsdWUsXG5cdFx0J2tleS5zdWJQYXRoJzogdmFsdWUyLFxuXHRcdCdrZXlQYXRoLjAudGl0bGUnOiB2YWx1ZTNcblx0fVxuXHQ8LSBvaywgd2l0aCBidW5jaCBvZiBvbkNoYW5nZSBldmVudHMgdHJpZ2dlcmVkXG5cdCovXG5cdHNldEF0dHJzKG9iamVjdFBhcnQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzJywgb2JqZWN0UGFydCwgT2JqZWN0LmtleXMob2JqZWN0UGFydCkpO1xuXHRcdGlmIChvYmplY3RQYXJ0ICYmICh0eXBlb2Ygb2JqZWN0UGFydCA9PT0gJ29iamVjdCcpICYmIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpLmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggaW4gb2JqZWN0UGFydCkge1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzIG9uZSB0byBnbycsIHBhdGgpO1xuXHRcdFx0XHR0aGlzLnNldEF0dHIocGF0aCwgb2JqZWN0UGFydFtwYXRoXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0LT4gJ3BhdGhUb0tleSdcblx0PC0gdmFsdWUxXG5cblx0Ki9cblx0Z2V0QXR0cih3aGF0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdnZXRBdHRyJywgd2hhdCk7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHdoYXQsIHRoaXNbTUVUQV9QUk9YWV0sIHt9KTtcblx0fVxuXG5cdC8qXG5cdC0+IFsncGF0aFRvS2V5JywgJ3BhdGgudG8ua2V5JywgJ3NpbXBsZUtleScsLi4uXVxuXHQ8LSBbdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMywuLi5dXG5cdCovXG5cdGdldEF0dHJzKHdoYXQpIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0aWYgKHdoYXQgJiYgd2hhdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIG9mIHdoYXQpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5nZXRBdHRyKHBhdGgpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXSkge1xuXHRcdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLm1hbmlmZXN0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRzZXRGaW5kQnkoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmluZEJ5KC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFNvcnRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0U29ydGVyKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRQYWdlTnVtYmVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VOdW1iZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VTaXplKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VTaXplKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGdldE1vZGVsTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0TW9kZWxOYW1lKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4vbm90Um91dGVyJztcbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuXG5jb25zdCBPUFRfQ09OVFJPTExFUl9QUkVGSVggPSAnbmMnLFxuXHRPUFRfUkVDT1JEX1BSRUZJWCA9ICducic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEFwcCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoe29wdGlvbnN9KTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBhcHAnKTtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ2FwcCcsIHRoaXMpO1xuXHRcdHRoaXMucmVzb3VyY2VzID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGludGVyZmFjZXM6IHt9LFxuXHRcdFx0Y29udHJvbGxlcnM6IHt9LFxuXHRcdFx0aW5pdENvbnRyb2xsZXI6IG51bGwsXG5cdFx0XHRjdXJyZW50Q29udHJvbGxlcjogbnVsbFxuXHRcdH0pO1xuXHRcdHRoaXMucHJlSW5pdFJvdXRlcigpO1xuXHRcdHRoaXMuaW5pdE1hbmFnZXIoKTtcblx0XHR0aGlzLmluaXRBUEkoKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZXMoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRNYW5hZ2VyKCl7XG5cdFx0bm90Q29tbW9uLnNldE1hbmFnZXIoXG5cdFx0XHR7XG5cdFx0XHRcdHNldEFQSSh2KXsgdGhpcy5hcGkgPSB2O30sXG5cdFx0XHRcdGdldEFQSSgpe3JldHVybiB0aGlzLmFwaTt9LFxuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHRpbml0QVBJKCl7XG5cdFx0bm90Q29tbW9uLmdldE1hbmFnZXIoKS5zZXRBUEkobmV3IG5vdEFQSSh7fSkpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlcygpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpKXtcblx0XHRcdGxldCBwcm9tID0gbnVsbDtcblx0XHRcdGZvcihsZXQgdCBpbiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpKXtcblx0XHRcdFx0aWYgKHQgJiYgdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKS5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdFx0bGV0IHVybCA9IHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJylbdF07XG5cdFx0XHRcdFx0aWYocHJvbSl7XG5cdFx0XHRcdFx0XHRwcm9tLnRoZW4obm90VGVtcGxhdGVDYWNoZS5hZGRMaWJGcm9tVVJMLmJpbmQobm90VGVtcGxhdGVDYWNoZSwgdXJsKSk7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRwcm9tID0gbm90VGVtcGxhdGVDYWNoZS5hZGRMaWJGcm9tVVJMKHVybCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAocHJvbSl7XG5cdFx0XHRcdHByb20udGhlbih0aGlzLmluaXRNYW5pZmVzdC5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdC5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRcdFx0bm90Q29tbW9uLnJlcG9ydCgnbm8gdGVtcGxhdGVzIGxpYicsIGUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuaW5pdE1hbmlmZXN0KCk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRNYW5pZmVzdCgpIHtcblx0XHR2YXIgdXJsID0gdGhpcy5nZXRPcHRpb25zKCdtYW5pZmVzdFVSTCcpO1xuXHRcdG5vdENvbW1vbi5nZXRKU09OKHVybCwge30pXG5cdFx0XHQudGhlbih0aGlzLnNldEludGVyZmFjZU1hbmlmZXN0LmJpbmQodGhpcykpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdHByZUluaXRSb3V0ZXIoKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JvdXRlcicsIG5vdFJvdXRlcik7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXInKS5zZXRSb290KHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLnJvb3QnKSk7XG5cdFx0bm90Um91dGVyLnJlUm91dGVFeGlzdGVkKCk7XG5cdH1cblxuXHRpbml0Um91dGVyKCl7XG5cdFx0dmFyIHJvdXRpZUlucHV0ID0ge307XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLm1hbmlmZXN0JykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IHJvdXRlQmxvY2sgPSB0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5tYW5pZmVzdCcpW3RdLFxuXHRcdFx0XHRwYXRocyA9IHJvdXRlQmxvY2sucGF0aHMsXG5cdFx0XHRcdGNvbnRyb2xsZXIgPSByb3V0ZUJsb2NrLmNvbnRyb2xsZXI7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRyb3V0aWVJbnB1dFtwYXRoc1tpXV0gPSB0aGlzLmJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcicpLmFkZExpc3Qocm91dGllSW5wdXQpLmxpc3RlbigpOy8vLm5hdmlnYXRlKHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLmluZGV4JykpO1xuXHR9XG5cblx0c2V0SW50ZXJmYWNlTWFuaWZlc3QobWFuaWZlc3QpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JywgbWFuaWZlc3QpO1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdC8v0L3Rg9C20L3QviDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0YLRjFxuXHRcdC8v0LzQvtC00LXQu9C4INC/0L7Qu9GD0YfQtdC90L3Ri9C80Lgg0LjQvdGC0LXRgNGE0LXQudGB0LDQvNC4XG5cdFx0dGhpcy51cGRhdGVJbnRlcmZhY2VzKCk7XG5cdFx0Ly/QuNC90LjRhtC40LvQuNGG0LjRgNC+0LLQsNGC0Ywg0Lgg0LfQsNC/0YPRgdGC0LjRgtGMINC60L7QvdGC0YDQvtC70LvQtdGAINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG5cdFx0dGhpcy5pbml0Q29udHJvbGxlcigpO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRzdGFydEFwcCgpIHtcblx0XHQvL9GB0L7Qt9C00LDRgtGMINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHQvL9GA0L7Rg9GC0LXRgCDQuCDQv9GA0LjQstGP0LfQsNGC0Ywg0Log0L3QtdC80YMg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdHRoaXMuaW5pdFJvdXRlcigpO1xuXHR9XG5cblx0YmluZENvbnRyb2xsZXIoY29udHJvbGxlck5hbWUpIHtcblx0XHRsZXQgYXBwID0gdGhpcztcblx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdG5ldyBjb250cm9sbGVyTmFtZShhcHAsIGFyZ3VtZW50cyk7XG5cdFx0fTtcblx0fVxuXG5cdGluaXRDb250cm9sbGVyKCkge1xuXHRcdGlmICh0eXBlb2YodGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGxldCBpbml0Q29udHJvbGxlciA9IHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnaW5pdENvbnRyb2xsZXInLCBuZXcgaW5pdENvbnRyb2xsZXIodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGdldEN1cnJlbnRDb250cm9sbGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJyk7XG5cdH1cblxuXHRzZXRDdXJyZW50Q29udHJvbGxlcihjdHJsKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicsIGN0cmwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dXBkYXRlSW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLmNsZWFySW50ZXJmYWNlcygpO1xuXHRcdGxldCBtYW5pZmVzdHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0Jyk7XG5cdFx0aWYgKG1hbmlmZXN0cykge1xuXHRcdFx0Zm9yKGxldCBuYW1lIGluIG1hbmlmZXN0cyl7XG5cdFx0XHRcdGxldCByZWNvcmRNYW5pZmVzdCA9IG1hbmlmZXN0c1tuYW1lXTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbbmFtZV0gPSAocmVjb3JkRGF0YSkgPT4gbmV3IG5vdFJlY29yZChyZWNvcmRNYW5pZmVzdCwgcmVjb3JkRGF0YSk7XG5cdFx0XHRcdHdpbmRvd1snbnInICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKV0gPSB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRSZWNvcmROYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX1JFQ09SRF9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0Z2V0Q29udHJvbGxlck5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfQ09OVFJPTExFUl9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlcygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJyk7XG5cdH1cblxuXHRjbGVhckludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcmZhY2VzJywge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0d2FpdFRoaXNSZXNvdXJjZSh0eXBlLCBpbmRleCkge1xuXHRcdGlmICghdGhpcy5yZXNvdXJjZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcblx0XHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdID0ge307XG5cdFx0fVxuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IGZhbHNlO1xuXHRcdHJldHVybiB0aGlzLm9uUmVzb3VyY2VSZWFkeS5iaW5kKHRoaXMsIHR5cGUsIGluZGV4KTtcblx0fVxuXG5cdG9uUmVzb3VyY2VSZWFkeSh0eXBlLCBpbmRleCkge1xuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IHRydWU7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdGFsbFJlc291cmNlc1JlYWR5KCkge1xuXHRcdHZhciBpLCBqO1xuXHRcdGZvciAoaSBpbiB0aGlzLnJlc291cmNlcykge1xuXHRcdFx0Zm9yIChqIGluIHRoaXMucmVzb3VyY2VzW2ldKSB7XG5cdFx0XHRcdGlmICghdGhpcy5yZXNvdXJjZXNbaV1bal0pIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5cbmNvbnN0IE1FVEFfUFJPQ0VTU09SUyA9IFN5bWJvbCgncHJvY2Vzc29ycycpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQcm9jZXNzb3IoLyoga2V5LCB2YWx1ZSAqLyl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UHJvY2Vzc29yKC8qIGtleSwgIGRlZmF1bHRWYWx1ZSAqLyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyUHJvY2Vzc29ycygpe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkKCl7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuXHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gYXJndW1lbnRzWzBdKXtcblx0XHRcdFx0XHR0aGlzLnNldFByb2Nlc3Nvcih0LCBhcmd1bWVudHNbMF1bdF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0UHJvY2Vzc29yKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhcigpe1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVQcm9jZXNzb3JzKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7XG5cbi8qXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgiBET00g0L/QvtC00LTQtdGA0LXQstC+INCyINC60LDRh9C10YHRgtCy0LUg0YjQsNCx0LvQvtC90LAuXG4gKiDQl9Cw0L/QvtC70L3Rj9C10YIg0LXQs9C+INC00LDQvdC90YvQvNC4LlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YHQs9C10L3QtdGA0LjRgNC+0LLQsNC90L3Ri9C1INGN0LvQtdC80LXQvdGC0YtcbiAqXG4gKiAqL1xuXG4vKlxuXG5cdDxkaXYgbi10ZW1wbGF0ZS1uYW1lPVwidmFzeWFcIj5cblx0XHQ8cD48aW5wdXQgdHlwZT1cInRleHRcIiBuLXZhbHVlPVwiOmNvb2xOYW1lXCIvPjwvcD5cblx0XHQ8cD7QkdC+0YDQuNGBINGF0YDQtdC9INC/0L7Qv9Cw0LTQtdGI0Ywg0Lgge3s6Y29vbE5hbWV9fS48L3A+XG5cdDwvZGl2PlxuXG4gKi9cblxuY29uc3QgTUVUQV9DT01QT05FTlRTID0gU3ltYm9sKCdjb21wb25lbnRzJyk7XG5cbmNsYXNzIG5vdFJlbmRlcmVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdC8qXG5cdFx0aW5wdXQgPSB7XG5cdFx0XHRkYXRhOiBub3RSZWNvcmQsXG5cdFx0XHR0ZW1wbGF0ZTogZWxlbWVudFxuXHRcdFx0b3B0aW9uczp7XG5cdFx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHQqL1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU10gPSB7fTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMuY29tcG9uZW50ID0gaW5wdXQuY29tcG9uZW50O1xuXHRcdHRoaXMuaW5pdERhdGEoaW5wdXQuZGF0YSA/IGlucHV0LmRhdGEgOiB7fSk7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0LnRlbXBsYXRlKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZSgpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndGVtcGxhdGUnLCB0aGlzLmdldFdvcmtpbmcoJ2dldFRlbXBsYXRlJykoKSk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuZ2V0RGF0YSgpLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHR9XG5cblx0aW5pdFdvcmtpbmcodGVtcGxhdGUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0Z2V0VGVtcGxhdGU6IHRlbXBsYXRlLFxuXHRcdFx0cGFydElkOiB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpID8gdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA6IE9QVFMuUEFSVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKSB7XG5cdFx0aWYgKHRoaXMuY29tcG9uZW50KSB7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMuY29tcG9uZW50LmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH1cblx0fVxuXG5cdG9uQ2hhbmdlKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0Lypub3RDb21tb24ubG9nKHRoaXMpO1xuXHRcdG5vdENvbW1vbi5sb2codGhpcy5nZXRCcmVhZENydW1wcygpLmpvaW4oJyA+ICcpKTtcblx0XHRub3RDb21tb24ubG9nKCd1cGRhdGluZyByZW5kZXJlciAnLCB0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpLCAnIGFmdGVyIGNoYW5nZXMnLCBrZXksIHZhbHVlKTsqL1xuXHRcdHRoaXMudXBkYXRlKGtleSk7XG5cdFx0dGhpcy50cmlnZ2VyKCdvYnNvbGV0ZScscHJveHksIGtleSwgdmFsdWUpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2xlYXJTdGFzaCgpO1xuXHRcdHRoaXMuc2V0V29ya2luZ01hcHBpbmcoKTtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHR0aGlzLnNlYXJjaEZvclN1YlRlbXBsYXRlcygpO1xuXHRcdHRoaXMuc3Rhc2hSZW5kZXJlZCgpO1xuXHR9XG5cblx0dXBkYXRlKGtleSkge1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdGZvciAobGV0IHQgaW4gdGhpc1tNRVRBX0NPTVBPTkVOVFNdKSB7XG5cdFx0XHRsZXQgaXRlbSA9IHRoaXNbTUVUQV9DT01QT05FTlRTXVt0XSxcblx0XHRcdFx0aWZQYXJ0ID0gdHJ1ZTtcblx0XHRcdGlmIChrZXkpe1xuXHRcdFx0XHRpZiAoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpPT09bnVsbCl7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0XHRjb21wb25lbnRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGl0ZW0uZ2V0T3B0aW9ucygnZGF0YVBhdGgnKSksXG5cdFx0XHRcdFx0Y2hhbmdlZFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoa2V5KTtcblx0XHRcdFx0aWZQYXJ0ID0gbm90UGF0aC5pZkZ1bGxTdWJQYXRoKGNoYW5nZWRQYXRoLCBjb21wb25lbnRQYXRoKTtcblx0XHRcdFx0Lypub3RDb21tb24ubG9nKGl0ZW0uZ2V0T3B0aW9ucygnbmFtZScpLCAnID4tPCAnLCBpdGVtLmdldE9wdGlvbnMoJ2lkJyksICcgPi08ICcsIGNvbXBvbmVudFBhdGgsIGNoYW5nZWRQYXRoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygnd2lsbCBiZSB1cGRhdGVkJywgaWZQYXJ0KTsqL1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaWZQYXJ0KSB7XG5cdFx0XHRcdGl0ZW0udXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0V29ya2luZ01hcHBpbmcoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtYXBwaW5nJywgdGhpcy5jcmVhdGVNYXBwaW5nKCkpO1xuXHR9XG5cblx0LypcblxuXHTQodC+0LfQtNCw0LXQvCDQutCw0YDRgtGLINGB0L7QvtGC0LLQtdGB0YLQstC40Y8g0L/RgNC+0YbQtdGB0YHQvtGA0L7Qsiwg0L/Rg9GC0LXQuSDQtNCw0L3QvdGL0YUg0LIg0L7QsdGK0LXQutGC0LUg0Lgg0Y3Qu9C10LzQtdC90YLQvtCyINGI0LDQsdC70L7QvdCwLlxuXHRbe1xuXHRcdGVsLFxuXHRcdHByb2Nlc3Nvcixcblx0XHR3b3JraW5nLFxuXHRcdGl0ZW0ucHJvcGVydHkucGF0aFxuXHR9XVxuXG5cdCovXG5cblx0Y3JlYXRlTWFwcGluZygpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5maW5kQWxsUHJvY2Vzc29ycygpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmaW5kQWxsUHJvY2Vzc29ycygpIHtcblx0XHRsZXQgcHJvY3MgPSBbXSxcblx0XHRcdGVscyA9IG5vdENvbW1vbi5nZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCh0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSwgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpO1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgZWxzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMCwgYXR0cyA9IGVsc1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCkgPT09IDApIHtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coYXR0c1tpXSk7XG5cdFx0XHRcdFx0bGV0IHByb2NEYXRhID0gdGhpcy5wYXJzZVByb2Nlc3NvckV4cHJlc3Npb24oYXR0c1tpXS5ub2RlTmFtZSk7XG5cdFx0XHRcdFx0cHJvY0RhdGEuZWxlbWVudCA9IGVsc1tqXTtcblx0XHRcdFx0XHRwcm9jRGF0YS5wcm9jZXNzb3JFeHByZXNzaW9uID0gYXR0c1tpXS5ub2RlTmFtZTtcblx0XHRcdFx0XHRwcm9jRGF0YS5hdHRyaWJ1dGVFeHByZXNzaW9uID0gYXR0c1tpXS52YWx1ZTtcblx0XHRcdFx0XHRwcm9jcy5wdXNoKHByb2NEYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcHJvY3M7XG5cdH1cblxuXHRwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24ocHJvY2Vzc29yRXhwcmVzc2lvbikge1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRwYXJhbXM6IFtdLFxuXHRcdFx0cHJvY2Vzc29yTmFtZTogJycsXG5cdFx0XHRpZkNvbmRpdGlvbjogZmFsc2Vcblx0XHR9O1xuXHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgsICcnKTtcblx0XHRpZiAocHJvY2Vzc29yRXhwcmVzc2lvbi5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgpID09PSAocHJvY2Vzc29yRXhwcmVzc2lvbi5sZW5ndGggLSBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLmxlbmd0aCkpIHtcblx0XHRcdHJlc3VsdC5pZkNvbmRpdGlvbiA9IHRydWU7XG5cdFx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SICsgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCwgJycpO1xuXHRcdH1cblx0XHRyZXN1bHQucGFyYW1zID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5zcGxpdChPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUik7XG5cdFx0cmVzdWx0LnByb2Nlc3Nvck5hbWUgPSByZXN1bHQucGFyYW1zWzBdO1xuXHRcdHJlc3VsdC5wYXJhbXMgPSByZXN1bHQucGFyYW1zLnNsaWNlKDEpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRleGVjUHJvY2Vzc29ycyhpdGVtLCBpbmRleCkge1xuXHRcdGxldCBtYXBwaW5nID0gdGhpcy5nZXRXb3JraW5nKCdtYXBwaW5nJyk7XG5cdFx0aWYgKG1hcHBpbmcpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbWFwcGluZy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgcHJvY1Njb3BlID0gbWFwcGluZ1tpXTtcblx0XHRcdFx0cHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwcm9jU2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2F0dHJpYnV0ZVJlc3VsdCcsIHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQpO1xuXHRcdFx0XHRsZXQgcHJvY05hbWUgPSBwcm9jU2NvcGUucHJvY2Vzc29yTmFtZSxcblx0XHRcdFx0XHRwcm9jID0gbm90VGVtcGxhdGVQcm9jZXNzb3JzLmdldChwcm9jTmFtZSk7XG5cdFx0XHRcdGlmIChwcm9jKSB7XG5cdFx0XHRcdFx0cHJvYyhwcm9jU2NvcGUsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdFx0XHRcdFx0cHJvY1Njb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb2NTY29wZS5wcm9jZXNzb3JFeHByZXNzaW9uKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ25vIHByb2Nlc3NvciBsaWtlJywgcHJvY05hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcigncmVuZGVyZWQnKTtcblx0fVxuXG5cdGdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocGF0aCwgaXRlbSkge1xuXHRcdHJldHVybiBub3RQYXRoLmdldChwYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHR9XG5cblx0Y2xlYXJTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5kZXN0cm95U3VicygpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3VicycsIFtdKTtcblx0fVxuXG5cdGRlc3Ryb3lTdWJzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiB0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRTdGFzaCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGxldCBlbCA9IHRoaXMuZ2V0U3Rhc2goKVt0XTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlKXtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWZTdWJFbGVtZW50UmVuZGVyZWQobnRFbCkge1xuXHRcdHJldHVybiBudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZCAmJiAobnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQudmFsdWUgPT09ICd0cnVlJyk7XG5cdH1cblxuXHRzZWFyY2hGb3JTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGxldCBzdWJzID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzdWIgdGVtcGxhdGVzJywgc3Vicyk7XG5cdFx0Zm9yIChsZXQgbnQgPSAwOyBudCA8IHN1YnMubGVuZ3RoOyBudCsrKSB7XG5cdFx0XHRpZiAoIXRoaXMuaWZTdWJFbGVtZW50UmVuZGVyZWQoc3Vic1tudF0pKSB7XG5cdFx0XHRcdHRoaXMucmVuZGVyU3ViKHN1YnNbbnRdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhZGRTdWIobnRFbCkge1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnc3VicycpLnB1c2goe1xuXHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRwYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogJycsXG5cdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS5zcmMgOiAnJyxcblx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdFx0cmVuZGVyZWRMaXN0OiBbXSxcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclN1YihudEVsKSB7XG5cdFx0aWYgKCFudEVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGxldCBkZXRhaWxzID0ge1xuXHRcdFx0XHRkYXRhUGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6IG51bGwsXG5cdFx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLnNyYy52YWx1ZSA6ICcnLFxuXHRcdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdGRhdGE6IGRldGFpbHMuZGF0YVBhdGghPT0gbnVsbD8gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KGRldGFpbHMuZGF0YVBhdGgsIHRoaXMuZ2V0RGF0YSgpKTpudWxsLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRzcmM6IGRldGFpbHMuc3JjXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlQWZ0ZXInLFxuXHRcdFx0XHRcdGlkOiBkZXRhaWxzLmlkLFxuXHRcdFx0XHRcdG50RWw6IG50RWwsXG5cdFx0XHRcdFx0ZGF0YVBhdGg6IGRldGFpbHMuZGF0YVBhdGhcblx0XHRcdFx0fSxcblx0XHRcdFx0b3duZXI6IHRoaXNcblx0XHRcdH07XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgZGV0YWlscy5pZCk7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdW2RldGFpbHMuaWRdID0gbmV3IG5vdENvbXBvbmVudChvcHRpb25zKTtcblx0fVxuXG5cdGNsZWFyU3Rhc2goKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIFtdKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGUnKTtcblx0fVxuXG5cdGdldFN0YXNoKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3N0YXNoJyk7XG5cdH1cblxuXHRzdGFzaFJlbmRlcmVkKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHR0aGlzLmFkZFRvU3Rhc2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0fVxuXG5cdHJlcGxhY2VSZW5kZXJlZCgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3JlcGxhY2Ugc3Rhc2gnKTtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksXG5cdFx0XHRzdGFzaCA9IHRoaXMuZ2V0U3Rhc2goKSxcblx0XHRcdG5ld1N0YXNoID0gW10sXG5cdFx0XHRhbmNob3IgPSBzdGFzaC5sZW5ndGggPiAwID8gc3Rhc2hbMF0gOiB0aGlzLmdldE9wdGlvbnMoJ250RWwnKSxcblx0XHRcdHBhcmVudE5vZGUgPSBhbmNob3IucGFyZW50Tm9kZTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRuZXdTdGFzaC5wdXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBuZXdTdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0aWYgKGFuY2hvci5uZXh0U2libGluZykge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3Rhc2hbdF0sIGFuY2hvci5uZXh0U2libGluZyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChuZXdTdGFzaFt0XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgc3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3Rhc2hbdF0pO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgbmV3U3Rhc2gpO1xuXHR9XG5cblx0YWRkVG9TdGFzaChub2RlKSB7XG5cdFx0dGhpcy5nZXRTdGFzaCgpLnB1c2gobm9kZSk7XG5cdH1cblxuXHRpc0RhdGEoZGF0YSA9IHt9KSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG5cblx0aGlkZSgpe1xuXG5cdH1cblxuXHRzaG93KCl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZW5kZXJlcjtcbiIsImNvbnN0IHBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHtcblx0XHRsZXQgbCA9IDA7XG5cdFx0d2hpbGUgKHRhcmdldEVsLmNoaWxkcmVuLmxlbmd0aCAtIGwpIHtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlblswXS5ub2RlTmFtZSA9PT0gJ05UJyl7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ250IGZvdW5kZWQnKTtcblx0XHRcdFx0bCsrO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ3JlbW92ZSBjaGlsZCAnLHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdFx0dGFyZ2V0RWwucmVtb3ZlQ2hpbGQodGFyZ2V0RWwuY2hpbGRyZW5bbF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0YXJnZXRFbC50ZXh0Q29udGVudCA9ICcnO1xuXHR9LFxuXHRiZWZvcmVFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGNoaWxkICcsIHJlbmRlcmVkW2ldKTtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fVxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlO1xuIiwiY29uc3QgcGxhY2VBZnRlciA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQWZ0ZXI7XG4iLCJjb25zdCBwbGFjZUJlZm9yZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQmVmb3JlO1xuIiwiY29uc3QgcGxhY2VGaXJzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IHJlbmRlcmVkLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdwbGFjZSBmaXJzdCcsIGksIHJlbmRlcmVkW2ldKTtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgYmVmb3JlIGZpcnN0Jyk7XG5cdFx0XHRcdHRhcmdldEVsLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwuY2hpbGRyZW5bMF0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBhcyBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2VGaXJzdDtcbiIsImNvbnN0IHBsYWNlTGFzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VMYXN0O1xuIiwiY29uc3QgcmVwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XHRcdFxuXHRcdGlmICh0YXJnZXRFbC5ub2RlTmFtZSAhPT0gJ05UJyl7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhcmdldEVsKTtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2U7XG4iLCJpbXBvcnQgcGxhY2UgZnJvbSAnLi9wbGFjZSc7XG5pbXBvcnQgcGxhY2VBZnRlciBmcm9tICcuL3BsYWNlQWZ0ZXInO1xuaW1wb3J0IHBsYWNlQmVmb3JlIGZyb20gJy4vcGxhY2VCZWZvcmUnO1xuaW1wb3J0IHBsYWNlRmlyc3QgZnJvbSAnLi9wbGFjZUZpcnN0JztcbmltcG9ydCBwbGFjZUxhc3QgZnJvbSAnLi9wbGFjZUxhc3QnO1xuaW1wb3J0IHJlcGxhY2UgZnJvbSAnLi9yZXBsYWNlJztcblxuY29uc3Qgbm90UGxhY2VycyA9IHtcblx0cGxhY2U6IHBsYWNlLFxuXHRwbGFjZUFmdGVyOiBwbGFjZUFmdGVyLFxuXHRwbGFjZUJlZm9yZTogcGxhY2VCZWZvcmUsXG5cdHBsYWNlRmlyc3Q6IHBsYWNlRmlyc3QsXG5cdHBsYWNlTGFzdDogcGxhY2VMYXN0LFxuXHRyZXBsYWNlOiByZXBsYWNlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RQbGFjZXJzO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi9ub3RUZW1wbGF0ZUNhY2hlJztcbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL25vdFJlbmRlcmVyJztcbmltcG9ydCBub3RQbGFjZXJzIGZyb20gJy4vcGxhY2Vycyc7XG5cbmNvbnN0IE1FVEFfUEFSVFMgPSBTeW1ib2woJ3BhcnRzJyk7XG4vKlxuXHRpbnB1dCA9IHtcblx0XHRkYXRhOiBub3RSZWNvcmQgb3IgW25vdFJlY29yZF0sXG5cdFx0dGVtcGxhdGU6IHtcblx0XHRcdGh0bWw6IGh0bWwoc3RyaW5nKSwgXHRcdC8v0YLQtdC60YHRgiDRgSBodG1sINC60L7QtNC+0Lwg0YjQsNCx0LvQvtC90LBcblx0XHRcdGVsOiBIVE1MRWxlbWVudChvYmplY3QpLCBcdC8vRE9NINGN0LvQtdC80LXQvdGCXG5cdFx0XHRzcmM6IHNyYyhzdHJpbmcpLFx0XHRcdC8v0YHRgdGL0LvQutCwINC90LAg0YTQsNC50Lsg0YEg0YjQsNCx0LvQvtC90L7QvFxuXHRcdFx0bmFtZTogbmFtZShzdHJpbmcpXHRcdFx0Ly/QvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwINC00LvRjyDQv9C+0LjRgdC60LAg0LIg0LrRjdGI0LUgbm90VGVtcGxhdGVDYWNoZVxuXHRcdH1cblx0XHRvcHRpb25zOntcblx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdC8v0LAg0Y3RgtC+INC60LDQuiDQsdGD0LTQtdC8INC/0L7QvNC10YnQsNGC0Ywg0YDQtdC30YPQu9GM0YLQsNGCINGA0LXQvdC00LXRgNC40L3Qs9CwXG5cdFx0XHRyZW5kZXJBbmQ6IHBsYWNlU3R5bGUoc3RyaW5nKSDQvtC00LjQvSDQuNC3INCy0LDRgNC40LDQvdGC0L7QslxuXHRcdFx0XHRcdHBsYWNlXHRcdC1cdNC/0L7QvNC10YnQsNC10Lwg0LLQvdGD0YLRgNC4INGG0LXQu9C10LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuXHRcdFx0XHRcdHJlcGxhY2VcdFx0LVx00LfQsNC80LXQvdGP0LXQvFxuXHRcdFx0XHRcdHBsYWNlQWZ0ZXJcdC1cdNC/0L7RgdC70LVcblx0XHRcdFx0XHRwbGFjZUJlZm9yZVx0LVx00LTQvlxuXHRcdFx0XHRcdHBsYWNlRmlyc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C10YDQstGL0Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdFx0XHRcdHBsYWNlTGFzdFx0LVx00LLQvdGD0YLRgNC4INC/0L7RgdC70LXQtNC90LjQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0fVxuXHR9XG4qL1xuY2xhc3Mgbm90Q29tcG9uZW50IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHRcdHRoaXMub24oJ3JlYWR5JywgdGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCl7XG5cdFx0aWYgKHRoaXMub3duZXIpe1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLm93bmVyLmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fVxuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLm93bmVyID0gaW5wdXQub3duZXI/aW5wdXQub3duZXI6bnVsbDtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQpO1xuXHRcdHRoaXMucHJlcGFyZVRlbXBsYXRlRWxlbWVudChpbnB1dC50ZW1wbGF0ZSA/IGlucHV0LnRlbXBsYXRlIDogbnVsbCk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0fVxuXG5cdGluaXRFdmVudHMobGlzdCl7XG5cdFx0Zm9yKGxldCB0IG9mIGxpc3Qpe1xuXHRcdFx0dGhpcy5vbiguLi50KTtcblx0XHR9XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnaWQnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2lkJywgT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdudEVsJykpe1xuXHRcdFx0dGhpcy5pbml0TWFya0VsZW1lbnQoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFya0VsZW1lbnQoKXtcblx0XHRsZXQgbWFya0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbnQnKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ250RWwnLCBtYXJrRWwpO1xuXHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKSxcblx0XHRcdHRhcmdldFF1ZXJ5ID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpO1xuXHRcdGlmICh0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZiAodGFyZ2V0KXtcblx0XHRcdFx0dGhpcy5zZXRPcHRpb25zKCd0YXJnZXRFbCcsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpe1xuXHRcdFx0dGhyb3cgJ05vIHRhcmdldCB0byBwbGFjZSByZW5kZXJlZCc7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIubWFpbih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksIFttYXJrRWxdKTtcblx0XHR9XG5cblx0fVxuXG5cdGluaXRXb3JraW5nKHZhbCkge1xuXHRcdHRoaXMudW5zZXRSZWFkeSh2YWwpO1xuXHR9XG5cblx0cHJlcGFyZVRlbXBsYXRlRWxlbWVudCh2YWwpIHtcblx0XHRpZiAoIXZhbCkge1xuXHRcdFx0dGhpcy51bnNldFJlYWR5KCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2h0bWwnKSAmJiB2YWwuaHRtbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLndyYXAoJycsICcnLCB2YWwuaHRtbCkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdlbCcpICYmIHZhbC5lbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudCh2YWwuZWwuY2xvbmVOb2RlKHRydWUpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnc3JjJykgJiYgdmFsLnNyYykge1xuXHRcdFx0bm90VGVtcGxhdGVDYWNoZS5hZGRGcm9tVVJMKHZhbC5zcmMsIHZhbC5zcmMpXG5cdFx0XHRcdC50aGVuKHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQuYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCduYW1lJykgJiYgdmFsLm5hbWUpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS5nZXQodmFsLm5hbWUpKTtcblx0XHR9XG5cdH1cblxuXHRzZXRQcm90b1RlbXBsYXRlRWxlbWVudChjb250KSB7XG5cdFx0aWYgKGNvbnQpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnLCBjb250KTtcblx0XHRcdHRoaXMudHJpZ2dlcigncmVhZHknKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdXcm9uZyB0ZW1wbGF0ZSBjb250YWluZXIgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JykuY2xvbmVOb2RlKHRydWUpO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdHJlc2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnLCB0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkuY2xvbmVOb2RlKHRydWUpKTtcblx0fVxuXG5cdHNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB0cnVlKTtcblx0fVxuXG5cdHVuc2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIGZhbHNlKTtcblx0fVxuXG5cdGlzUmVhZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncmVhZHknKTtcblx0fVxuXG5cdGNsZWFyUGFydHMoKSB7XG5cdFx0Lyog0LjQt9Cy0LXRidCw0LXQvCDQvtCxINGD0LTQsNC70LXQvdC40Lgg0Y3Qu9C10LzQtdC90YLQvtCyICovXG5cdFx0aWYgKHRoaXNbTUVUQV9QQVJUU10gJiYgQXJyYXkuaXNBcnJheSh0aGlzW01FVEFfUEFSVFNdKSAmJiB0aGlzW01FVEFfUEFSVFNdLmxlbmd0aCkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiB0aGlzW01FVEFfUEFSVFNdKSB7XG5cdFx0XHRcdGlmICh0LmRlc3Ryb3kpe1xuXHRcdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHR9XG5cblx0ZGVzdHJveSgpe1xuXHRcdHRoaXMuY2xlYXJQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ250RWwnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlKXtcblx0XHRcdHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5nZXRPcHRpb25zKCdudEVsJykpO1xuXHRcdH1cblx0XHR0aGlzLmRlYWQgPSB0cnVlO1xuXHRcdHRoaXMub2ZmQWxsKCk7XG5cdH1cblxuXHRyZXNldFBhcnRzKCkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10gPSBbXTtcblx0fVxuXG5cdGdldFBhcnRzKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfUEFSVFNdO1xuXHR9XG5cblx0YWRkUGFydCh0ZW1wbGF0ZSkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10ucHVzaCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0dGhpcy5yZW1vdmVPYnNvbGV0ZVBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHBsYWNlci5iZWZvcmUodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHRwbGFjZXIuYWZ0ZXIodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyB0YXJnZXQgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdHBsYWNlUGFydChkYXRhLCBpbmRleCl7XG5cdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSksXG5cdFx0XHRub2RlcyA9IHBhcnQuZ2V0U3Rhc2goKSxcblx0XHRcdHRhcmdldEVsLFxuXHRcdFx0bGFzdE5vZGUsXG5cdFx0XHRwbGFjZXI7XG5cdFx0aWYgKGluZGV4ID09PSAwKXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcihPUFRTLkRFRkFVTFRfUExBQ0VSX0xPT1ApO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJyk7XG5cdFx0fVxuXHRcdHBsYWNlci5tYWluKHRhcmdldEVsLCBub2Rlcyk7XG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRnZXRQbGFjZXIobWV0aG9kKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZWFyY2hpbmcgZm9yIHBsYWNlcicsIG1ldGhvZCk7XG5cdFx0aWYgKG5vdFBsYWNlcnMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbbWV0aG9kXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbT1BUUy5ERUZBVUxUX1BMQUNFUl07XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaERhdGEoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldERhdGEoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaFBhcnQoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0UGFydHMoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXRQYXJ0cygpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdNC10YHQu9C4INGBINC00LDQvdC90YvQvNC4INC90LUg0YHQstGP0LfQsNC9INGA0LXQvdC00LXRgNC10YAgLSDRgdC+0LfQtNCw0LXQvFxuXHQqL1xuXG5cdHJlbmRlclBhcnQoZGF0YSkge1xuXHRcdGlmICghdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ2NyZWF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHRsZXQgcmVuZGVyZXIgPSBuZXcgbm90UmVuZGVyZXIoe1xuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0ZW1wbGF0ZTogdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lLmJpbmQodGhpcyksXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpLFxuXHRcdFx0XHRjb21wb25lbnQ6IHRoaXNcblx0XHRcdH0pO1xuXHRcdFx0Ly9yZW5kZXJlci5vbignb2Jzb2xldGUnLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkUGFydChyZW5kZXJlcik7XG5cdFx0fWVsc2V7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHR0aGlzLnVwZGF0ZVBhcnQodGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVQYXJ0KHBhcnQpe1xuXHRcdHBhcnQudXBkYXRlKCk7XG5cdH1cblxuXHRyZW1vdmVPYnNvbGV0ZVBhcnRzKCkge1xuXHRcdC8v0LrQvtC90LLQtdC10YAg0L/QvtC40YHQuiDQsNC60YLRg9Cw0LvRjNC90YvRhSAtINGD0LTQsNC70LXQvdC40LUg0L7RgdGC0LDQu9GM0L3Ri9GFXG5cdFx0bm90Q29tbW9uLnBpcGUoXG5cdFx0XHR1bmRlZmluZWQsIC8vIHBhcnRzIHRvIHNlYXJjaCBpbiwgY2FuIGJlICd1bmRlZmluZWQnXG5cdFx0XHRbXG5cdFx0XHRcdHRoaXMuZmluZEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vZmlyc3Qgcm91bmQsIHNlYXJjaCBmb3Igb2Jzb2xldGVcblx0XHRcdFx0dGhpcy5yZW1vdmVOb3RBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL3JlbW92ZSAnZW1cblx0XHRcdF1cblx0XHQpO1xuXHR9XG5cblx0Lypcblx0XHTQtdGB0YLRjCDQtNCw0L3QvdGL0LUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDQsNC60YLRg9Cw0LvRjNC90L4sXG5cdFx00L3QtdGCINC00LDQvdC90YvRhSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINGB0YLQsNGA0YzRkVxuXHQqL1xuXG5cdGZpbmRBY3R1YWxQYXJ0cygpIHtcblx0XHRsZXQgYWN0dWFsUGFydHMgPSBbXTtcblx0XHR0aGlzLmZvckVhY2hEYXRhKChkYXRhLyosIGluZGV4Ki8pPT57XG5cdFx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKTtcblx0XHRcdGlmIChwYXJ0KXtcblx0XHRcdFx0YWN0dWFsUGFydHMucHVzaChwYXJ0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gYWN0dWFsUGFydHM7XG5cdH1cblxuXHQvKlxuXHRcdNGD0LTQsNC70Y/QtdC8INCy0YHQtSDQutGA0L7QvNC1INCw0LrRgtGD0LDQu9GM0L3Ri9GFXG5cdCovXG5cdHJlbW92ZU5vdEFjdHVhbFBhcnRzKGFjdHVhbFBhcnRzKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmIChhY3R1YWxQYXJ0cy5pbmRleE9mKHRoaXMuZ2V0UGFydHMoKVt0XSkgPT09IC0xKXtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpW3RdLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpLnNwbGljZSh0LCAxKTtcblx0XHRcdFx0dC0tO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFBhcnRCeURhdGEoZGF0YSkge1xuXHRcdGZvciAobGV0IHQgaW4gdGhpcy5nZXRQYXJ0cygpKSB7XG5cdFx0XHRpZiAodGhpcy5nZXRQYXJ0cygpW3RdLmlzRGF0YShkYXRhKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRQYXJ0cygpW3RdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRzaG93KCl7XG5cdFx0XG5cdH1cblxuXHRoaWRlKCl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb21wb25lbnQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICcucGFnZS1jb250ZW50Jyxcblx0T1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCA9ICcuaHRtbCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMID0gdHJ1ZSxcblx0T1BUX0RFRkFVTFRfUExVUkFMX05BTUUgPSAnTW9kZWxzJyxcblx0T1BUX0RFRkFVTFRfU0lOR0xFX05BTUUgPSAnTW9kZWwnLFxuXHRPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSA9ICdtYWluJyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0FORCA9ICdwbGFjZSc7XG5cbmNsYXNzIG5vdENvbnRyb2xsZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoYXBwKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJlYWR5OiBmYWxzZSxcblx0XHRcdHZpZXdzOiB7fSxcblx0XHRcdGxpYnM6e30sXG5cdFx0XHR2aWV3TmFtZTogT1BUX0RFRkFVTFRfVklFV19OQU1FLFxuXHRcdFx0aGVscGVyczoge31cblx0XHR9KTtcblx0XHR0aGlzLnNldERhdGEoe30pO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRtb2R1bGVOYW1lOiBPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSxcblx0XHRcdGNvbnRhaW5lclNlbGVjdG9yOiBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IsXG5cdFx0XHRwcmVmaXg6IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZScpLFxuXHRcdFx0cG9zdGZpeDogT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCxcblx0XHRcdHJlbmRlckZyb21VUkw6IE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCxcblx0XHRcdG5hbWVzOntcblx0XHRcdFx0cGx1cmFsOk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FLFxuXHRcdFx0XHRzaW5nbGU6IE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLmluaXRSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0Lypcblx0XHQgICAg0YHRgNCw0LfRgyDQtNC10LvQsNC10Lwg0LTQvtGB0YLRg9C/0L3Ri9C80Lgg0LzQvtC00LXQu9C4IG5vdFJlY29yZCDQuNC3IG5jYENvbnRyb2xsZXJOYW1lYCDQsdGD0LTRg9GCINC00L7RgdGC0YPQv9C90Ysg0LrQsNC6IHRoaXMubnJgTW9kZWxOYW1lYFxuXHRcdCovXG5cdFx0bGV0IGludGVyZmFjZXMgPSB0aGlzLmFwcC5nZXRJbnRlcmZhY2VzKCk7XG5cdFx0dGhpcy5tYWtlID0ge307XG5cdFx0Zm9yIChsZXQgdCBpbiBpbnRlcmZhY2VzKSB7XG5cdFx0XHRpZiAoaW50ZXJmYWNlcy5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdHRoaXMubWFrZVt0XSA9IGludGVyZmFjZXNbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdFJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyKHRoaXMuZ2V0V29ya2luZygndmlld05hbWUnKSwgdGhpcy5nZXREYXRhKCksIHRoaXMuZ2V0V29ya2luZygnaGVscGVycycpKTtcblx0fVxuXG5cdHJlbmRlcih2aWV3TmFtZSA9J2RlZmF1bHQnIC8qIHZpZXcgbmFtZSAqLywgZGF0YSA9IHt9IC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzID0ge30vKiBjb3VsZCBiZSBub3QgcmVwcmVzZW50ZWQgKi8pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHZhciB2aWV3ID0gdGhpcy5nZXRWaWV3KHZpZXdOYW1lKTtcblxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3ID09PSAndW5kZWZpbmVkJyB8fCB2aWV3ID09PSBudWxsKSB7XG5cdFx0XHRcdHJlamVjdCgnTm8gdmlldyBmb3VuZCcsIHZpZXdOYW1lKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2aWV3ID0gbm90Q29tbW9uLmV4dGVuZCh7fSwgdmlldyk7XG5cdFx0XHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0XHRcdC8vINGN0LvQtdC80LXQvdGC0LAsINC90L4g0LjQt9Cy0LXRgdGC0L3QvtC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGA0LVcblx0XHRcdFx0aWYgKCgodHlwZW9mIHZpZXcudGFyZ2V0RWwgPT09ICd1bmRlZmluZWQnKSB8fCAodmlldy50YXJnZXRFbCA9PT0gbnVsbCkpICYmICh0eXBlb2Ygdmlldy50YXJnZXRRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy50YXJnZXRRdWVyeSAhPT0gbnVsbCAmJiB2aWV3LnRhcmdldFF1ZXJ5Lmxlbmd0aCA+IDApKSB7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iodmlldy50YXJnZXRRdWVyeSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHZpZXcuaGVscGVycywgaGVscGVycyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0fVxuXHRcdFx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0XHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckZyb21VUkwnKSkge1xuXHRcdFx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygdmlldy50ZW1wbGF0ZVVSTCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldy50ZW1wbGF0ZVVSTCA9PSBudWxsIHx8IHZpZXcudGVtcGxhdGVVUkwubGVuZ3RoID09IDApIHtcblx0XHRcdFx0XHRcdGxldCBwcmVmaXggPSAodmlldy5jb21tb24gPyB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5jb21tb24nKTogdGhpcy5nZXRNb2R1bGVQcmVmaXgoKSksXG5cdFx0XHRcdFx0XHRcdG5hbWUgPSAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiB2aWV3TmFtZSksXG5cdFx0XHRcdFx0XHRcdHBvc3RmaXggPSB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHRcdC8v0LPQtdC90LXRgNC40YDRg9C10Lwg0LDQtNGA0LXRgSDQv9C+INGI0LDQsdC70L7QvdGDXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gIFtwcmVmaXgsIG5hbWVdLmpvaW4oJy8nKSArIHBvc3RmaXg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8v0LAg0LXRgdC70Lgg0LXRgdGC0Ywg0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCwg0YLQvlxuXHRcdFx0XHRcdGlmICh2aWV3Lmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU5hbWUnKSkge1xuXHRcdFx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVOYW1lID0gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIHZpZXcudGVtcGxhdGVOYW1lICsgdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTp7XG5cdFx0XHRcdFx0XHRuYW1lOiB2aWV3LnRlbXBsYXRlTmFtZSxcblx0XHRcdFx0XHRcdHNyYzogdmlldy50ZW1wbGF0ZVVSTCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czpbWydhZnRlclJlbmRlcicsIHJlc29sdmVdXSxcblx0XHRcdFx0XHRvcHRpb25zOntcblx0XHRcdFx0XHRcdHRhcmdldEVsOiB2aWV3LnRhcmdldEVsLFxuXHRcdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRcdHJlbmRlckFuZDogdmlldy5yZW5kZXJBbmQgfHwgT1BUX0RFRkFVTFRfUkVOREVSX0FORFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRBcHAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwO1xuXHR9XG5cblx0c2V0TW9kZWwobW9kZWwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGVsJywgbW9kZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kZWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnbW9kZWwnKTtcblx0fVxuXG5cdHNldFJlYWR5KHZhbCA9IHRydWUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdmFsKTtcblx0XHR2YWwgPyB0aGlzLnRyaWdnZXIoJ3JlYWR5JykgOiB0aGlzLnRyaWdnZXIoJ2J1c3knKTtcblx0fVxuXG5cdHNldFZpZXcobmFtZSwgdmlldyl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSwgdmlldyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRWaWV3cyh2aWV3cyl7XG5cdFx0Zm9yKGxldCB0IGluIHZpZXdzKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgdCksIHZpZXdzW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRWaWV3KG5hbWUgPSAnZGVmYXVsdCcpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpKTtcblx0fVxuXG5cdHNldE1vZHVsZU5hbWUodmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdtb2R1bGVOYW1lJywgdmFsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZHVsZU5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnbW9kdWxlTmFtZScpO1xuXHR9XG5cblx0Z2V0TW9kdWxlUHJlZml4KCl7XG5cdFx0cmV0dXJuIFt0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGVzJyksIHRoaXMuZ2V0TW9kdWxlTmFtZSgpXS5qb2luKCcvJyk7XG5cdH1cblxuXHRwcmVsb2FkTGliKGxpc3QgPSB7fSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRpZih0eXBlb2YgbGlzdCAhPT0gJ29iamVjdCcpe1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gbGlzdCl7XG5cdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykucHVzaChsaXN0W3RdKTtcblx0XHRcdFx0XHR0aGlzLm1ha2VbbGlzdFt0XV0oe30pLiRsaXN0QWxsKClcblx0XHRcdFx0XHRcdC50aGVuKChkYXRhKT0+e1xuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbGlicycpKXtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2xpYnMnLCB7fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRPcHRpb25zKCdsaWJzJylbdF0gPSBkYXRhO1xuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pID4gLTEpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnNwbGljZSh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pLCAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KGVycik7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHF1ZWVVcGxvYWQobmFtZSwgbGlzdCl7XG5cdFx0Ly9oYXNoIChmaWVsZE5hbWU9PmZpbGVzTGlzdClcblx0XHRpZighdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRRdWVlJykpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd1cGxvYWRRdWVlJywge30pO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnKVtuYW1lXSA9IGxpc3Q7XG5cdH1cblxuXHRleGVjVXBsb2FkcyhpdGVtKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0V29ya2luZygndXBsb2FkUXVlZScpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0aWYodHlwZW9mIGxpc3QgIT09ICdvYmplY3QnKXtcblx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwbG9hZGluZycsIHt9KTtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGxpc3Qpe1xuXHRcdFx0XHRcdGxldCBmaWVsZEZpbGVzID0gbGlzdFt0XTtcblx0XHRcdFx0XHRpZiAoZmllbGRGaWxlcy5sZW5ndGggPiAxKXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSBbXTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSAnJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yKGxldCBmID0gMDsgZiA8IGZpZWxkRmlsZXMubGVuZ3RoOyBmKyspe1xuXHRcdFx0XHRcdFx0aWYoIXRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdID0gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0rKztcblx0XHRcdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3VwbG9hZGVyJylcblx0XHRcdFx0XHRcdFx0LnVwbG9hZChmaWVsZEZpbGVzW2ZdKVxuXHRcdFx0XHRcdFx0XHQudGhlbigoc2F2ZWRGaWxlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZmlsZSB1cGxvYWRlZCcsIHQsZiwgc2F2ZWRGaWxlKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdLS07XG5cdFx0XHRcdFx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XSA9PT0gMCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheShpdGVtW2ZdKSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtW3RdLnB1c2goc2F2ZWRGaWxlLmhhc2gpO1xuXHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVt0XSA9IHNhdmVkRmlsZS5oYXNoO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZihPYmplY3Qua2V5cyh0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKE9iamVjdC5rZXlzKHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0b25BZnRlclJlbmRlcigpe1xuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCA9ICdmb3JtXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfRk9STV9USVRMRSA9ICdGb3JtIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge30sXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUID0gWydvcHRpb25zJywgJ21hbmlmZXN0JywgJ2FwcCddO1xuXG5jbGFzcyBub3RGb3JtIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdwcmVmaXgnLCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50cycsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLnNldERhdGEobmV3IG5vdFJlY29yZCh7fSwgdGhpcy5nZXREYXRhKCkpKTtcblx0XHR9XG5cdFx0dGhpcy5vbignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjYW5jZWwnLCB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcykpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKTtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoKSB7XG5cdFx0bGV0IG1hbmlmZXN0ID0gdGhpcy5nZXRNYW5pZmVzdCgpO1xuXHRcdGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC5hY3Rpb25zKSB7XG5cdFx0XHRyZXR1cm4gbWFuaWZlc3QuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpKSA/IG1hbmlmZXN0LmFjdGlvbnNbdGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKV0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRnZXRGb3JtRmllbGRzTGlzdCgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0cm9sZSA9IHRoaXMuZ2V0T3B0aW9ucygncm9sZScsIE9QVF9ERUZBVUxUX1JPTEVfTkFNRSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpIHtcblxuXHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzKSB7XG5cdFx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xuXHRcdFx0XHRcdGxpc3QgPSBhY3Rpb25EYXRhLmZpZWxkc1tyb2xlXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdC8qXG5cdFx0UmVuZGVyaW5nXG5cdCovXG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHR9XG5cblx0Z2V0UGFydFRlbXBsYXRlTmFtZShmb3JtUGFydCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHRoaXMuYmluZEZvcm1FdmVudHMuYmluZCh0aGlzKV0sXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfRk9STV9USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KClbdF07XG5cdFx0XHRcdHRoaXMuYWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGVhckZpZWxkc0NvbXBvbmVudHMoKSB7XG5cdFx0bGV0IGNvbXBzID0gdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJyk7XG5cdFx0d2hpbGUgKGNvbXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbXBzWzBdLmNvbXBvbmVudC5kZXN0cm95KCk7XG5cdFx0XHRjb21wcy5zcGxpY2UoMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlicygpe1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRvcHRpb25zOiB7fSxcblx0XHRcdG1hbmlmZXN0OiB7fSxcblx0XHRcdGFwcDoge30sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAobm90Q29tbW9uLmdldEFwcCgpICYmIG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKSl7XG5cdFx0XHRyZXN1bHQuYXBwID0gbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQgJiYgdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKSl7XG5cdFx0XHRyZXN1bHQubWFuaWZlc3QgPSB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpLmZpZWxkcztcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSB7XG5cdFx0bGV0IGRlZiA9IE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04sXG5cdFx0XHRmaWVsZHNMaWJzID0gdGhpcy5nZXRGaWVsZHNMaWJzKCk7XG5cdFx0Zm9yKGxldCB0IG9mIE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUKXtcblx0XHRcdGlmIChmaWVsZHNMaWJzLmhhc093blByb3BlcnR5KHQpICYmIGZpZWxkc0xpYnNbdF0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSl7XG5cdFx0XHRcdHJldHVybiBmaWVsZHNMaWJzW3RdW2ZpZWxkTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkZWY7XG5cdH1cblxuXHRhZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpIHtcblx0XHRsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSk7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKT0+e1xuXHRcdFx0XHRyZXR1cm4gcGFyYW1zLml0ZW0udmFsdWUgPT09IHRoaXMuZ2V0RGF0YShmaWVsZE5hbWUpO1xuXHRcdFx0fSxcblx0XHRcdGZpZWxkOiByZWMuZmllbGQsXG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKVxuXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0Rm9ybVRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCcsXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlckRhdGFDaGFuZ2UnLCB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMocGFyYW1zKXtcblx0XHRub3RDb21tb24ubG9nKCdjb2xsZWN0IGRhdGEgZnJvbSBjb21wb25lbnRzJywgcGFyYW1zKTtcblx0fVxuXG5cdGdldEZvcm1UYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jyl7XG5cdFx0aWYgKCF0YXJnZXQpe3RhcmdldCA9ICdib2R5Jzt9XG5cdFx0bGV0IHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0IT09J2JvZHknKXtcblx0XHRcdHRhcmdldCA9ICdib2R5Jztcblx0XHRcdHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0fVxuXHRcdGlmKCFyZXMgJiYgdGFyZ2V0PT0nYm9keScpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHRjb2xsZWN0RGF0YSgpIHtcblx0XHQvL2xldCBkYXRhID0gdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcyk7XG5cdH1cblxuXHRiaW5kRm9ybUV2ZW50cygpe1xuXHRcdGxldCB0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZih0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZih0YXJnZXQpe1xuXHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3RhcmdldEVsJywgdGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSl7XG5cdFx0XHRsZXRcdGZvcm0gPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXHRcdFx0aWYoZm9ybSl7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR1cGRhdGVGaWVsZChmaWVsZE5hbWUpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uZmllbGQubmFtZSA9PT0gZmllbGROYW1lKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCkge1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpIHtcblxuXHR9XG5cblx0b25SZXNldCgpIHtcblxuXHR9XG5cblx0Z2V0RmllbGRzKCkge1xuXG5cdH1cblxuXHRhZGRGaWVsZCgpIHtcblxuXHR9XG5cblx0cmVtb3ZlRmllbGQoKSB7XG5cblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Rm9ybTtcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9ub3RGb3JtLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfVklFVyA9ICdlZGl0JztcbmNvbnN0IE9QVF9ERUZBVUxUX0FDVElPTiA9ICdjcmVhdGUnO1xuXG5jbGFzcyBDUlVEQ3JlYXRlIGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpIHtcbiAgICAgICAgc3VwZXIocGFyZW50LmFwcCk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG4gICAgICAgIG5vdENvbW1vbi5sb2coJ0NSVUQgQ3JlYXRlJyk7XG4gICAgICAgIHRoaXMuc2V0Vmlld3Moe1xuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcbiAgICAgICAgICAgICAgICBjb21tb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5jb21tb24nKSB8fCB0cnVlLFxuICAgICAgICAgICAgICAgIHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuICAgICAgICAgICAgICAgIGhlbHBlcnM6IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnByZWxvYWQnKSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMubG9hZEl0ZW0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5yZW5kZXJGb3JtLmJpbmQodGhpcykpXG4gICAgICAgICAgICAudGhlbih0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbG9hZEl0ZW0oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCB0ID0gdGhpcy5pbml0SXRlbSgpO1xuICAgICAgICAgICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyV3JhcHBlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0Jywge30sIHt9KTtcbiAgICB9XG5cbiAgICByZW5kZXJGb3JtKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0gPSBuZXcgbm90Rm9ybSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9BQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS50YXJnZXRRdWVyeScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUucHJlZml4JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygncHJlZml4JyksXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUucm9sZScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGU6IChwYXJhbXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVzID0gcGFyYW1zLmUudGFyZ2V0LmZpbGVzIHx8IHBhcmFtcy5lLmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90Q29tbW9uLmxvZygnZmlsZSBjaGFuZ2VkJywgZmlsZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmhlbHBlcnMuZmllbGQubmFtZSAmJiBmaWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVlVXBsb2FkKHBhcmFtcy5oZWxwZXJzLmZpZWxkLm5hbWUsIGZpbGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdENvbW1vbi5sb2coJ3N1Ym1pdCBmb3JtICcsIHRoaXMubmV3SXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhlY1VwbG9hZHModGhpcy5uZXdJdGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odGhpcy5jcmVhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZnRlclN1Ym1pdDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdvVG9UYWJsZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGliczogdGhpcy5nZXRPcHRpb25zKCdsaWJzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuaGVscGVycycpIHx8IHt9KVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBldmVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbJ2FmdGVyU3VibWl0JywgJ2FmdGVyUmVzdG9yZSddLCB0aGlzLmJhY2tUb0xpc3QuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGUoaXRlbSkge1xuICAgICAgICBpdGVtWyckJyArIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5hY3Rpb24nKV0oKVxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIG5vdENvbW1vbi5sb2coJ2Zvcm0gc2F2ZWQnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgbm90Q29tbW9uLmVycm9yKCdmb3JtIG5vdCBzYXZlZCcsIHJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiYWNrVG9MaXN0KCkge1xuICAgICAgICB0aGlzLnBhcmVudC5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUodGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRENyZWF0ZTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX1BBR0VfU0laRSA9IDIwLFxuXHRPUFRfREVGQVVMVF9QQUdFX05VTUJFUiA9IDAsXG5cdE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OID0gMSxcblx0T1BUX0RFRkFVTFRfU09SVF9GSUVMRCA9ICdfaWQnLFxuXHRPUFRfRklFTERfTkFNRV9QUkVfUFJPQyA9ICdwcmVwcm9jZXNzb3InO1xuXG5jbGFzcyBub3RUYWJsZSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIFtdKTtcblx0XHRpZighdGhpcy5nZXREYXRhKCkgfHwgIUFycmF5LmlzQXJyYXkodGhpcy5nZXREYXRhKCdyb3dzJykpKXtcblx0XHRcdHRoaXMuc2V0RGF0YSh7cm93czpbXX0pO1xuXHRcdH1cblx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR0aGlzLnJlc2V0RmlsdGVyKCk7XG5cdFx0dGhpcy5yZXNldFNvcnRlcigpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50JykpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50JykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBjb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0ZGF0YToge30sXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogJ3RhYmxlX3dyYXBwZXInXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRyZW5kZXJBbmQ6IHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgJ2FmdGVyVXBkYXRlJ10sIHRoaXMucmVuZGVySW5zaWRlLmJpbmQodGhpcylcblx0XHRcdFx0XHRdXG5cdFx0XHRcdF1cblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnQnLCBjb21wb25lbnQpO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlckluc2lkZSgpIHtcblx0XHR0aGlzLnJlbmRlckhlYWRlcigpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHRcdHRoaXMucmVuZGVyQm9keSgpO1xuXHRcdHRoaXMuYmluZFNlYXJjaCgpO1xuXHRcdHRoaXMuYmluZEN1c3RvbUJpbmRpbmdzKCk7XG5cdH1cblxuXHRyZW5kZXJIZWFkZXIoKSB7XG5cdFx0dmFyIHRhYmxlSGVhZGVyID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIHRyJyk7XG5cdFx0aWYgKCF0YWJsZUhlYWRlcikgcmV0dXJuO1xuXHRcdGxldCBmaWVsZHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgbmV3VGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUSCcpO1xuXHRcdFx0bmV3VGguaW5uZXJIVE1MID0gZmllbGRzW2ldLnRpdGxlO1xuXHRcdFx0aWYgKGZpZWxkc1tpXS5oYXNPd25Qcm9wZXJ0eSgnc29ydGFibGUnKSAmJiBmaWVsZHNbaV0uc29ydGFibGUpIHtcblx0XHRcdFx0dGhpcy5hdHRhY2hTb3J0aW5nSGFuZGxlcnMobmV3VGgsIGZpZWxkc1tpXS5wYXRoKTtcblx0XHRcdH1cblx0XHRcdHRhYmxlSGVhZGVyLmFwcGVuZENoaWxkKG5ld1RoKTtcblx0XHR9XG5cdH1cblxuXHRhdHRhY2hTb3J0aW5nSGFuZGxlcnMoaGVhZENlbGwsIGZpZWxkTmFtZSkge1xuXHRcdGhlYWRDZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuY2hhbmdlU29ydGluZ09wdGlvbnMoaGVhZENlbGwsIGZpZWxkTmFtZSk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdFx0aGVhZENlbGwuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXHR9XG5cblx0Y2hhbmdlU29ydGluZ09wdGlvbnMoZWwsIGZpZWxkTmFtZSkge1xuXHRcdGlmIChmaWVsZE5hbWUgPT09IHRoaXMuZ2V0U29ydGVyKCkuc29ydEJ5RmllbGQpe1xuXHRcdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0XHRzb3J0QnlGaWVsZDogZmllbGROYW1lLFxuXHRcdFx0XHRzb3J0RGlyZWN0aW9uOiAtMSAqIHRoaXMuZ2V0U29ydGVyKCkuc29ydERpcmVjdGlvbixcblx0XHRcdH0pO1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0XHRzb3J0QnlGaWVsZDogZmllbGROYW1lLFxuXHRcdFx0XHRzb3J0RGlyZWN0aW9uOiBPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTixcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZiAoZWwucGFyZW50Tm9kZSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbC5wYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldID09PSBlbCkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19hc2MnKTtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdub25lJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldFNvcnRlcigpLnNvcnREaXJlY3Rpb24gPiAwKSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdhc2NlbmRpbmcnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnZGVzY2VuZGluZycpO1xuXHRcdH1cblx0fVxuXG5cdHNldFNvcnRlcihoYXNoKSB7XG5cdFx0Ly9jb25zb2xlLmxvZygnc2V0U29ydGVyJywgaGFzaCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBoYXNoKTtcblx0XHR0aGlzLmludmFsaWRhdGVEYXRhKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldFNvcnRlcigpe1xuXHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdHNvcnRCeUZpZWxkOiBPUFRfREVGQVVMVF9TT1JUX0ZJRUxELFxuXHRcdFx0c29ydERpcmVjdGlvbjogT1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04sXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRTb3J0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnc29ydGVyJyk7XG5cdH1cblxuXHRnZXRGaWx0ZXJTZWFyY2goKSB7XG5cdFx0cmV0dXJuICh0eXBlb2YgdGhpcy5nZXRGaWx0ZXIoKSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRGaWx0ZXIoKSAhPT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2ggIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoICE9PSBudWxsKSA/IHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoLnRvU3RyaW5nKCkgOiAnJztcblx0fVxuXG5cdGludmFsaWRhdGVEYXRhKCkge1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2xpdmVMb2FkJykgJiYgdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpKSB7XG5cdFx0XHR3aGlsZSh0aGlzLmdldERhdGEoJ3Jvd3MnKS5sZW5ndGg+MCl7XG5cdFx0XHRcdHRoaXMuZ2V0RGF0YSgncm93cycpLnBvcCgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5yZXNldFBhZ2VyKCk7XG5cdFx0fVxuXHR9XG5cblx0c2V0RmlsdGVyKGhhc2gpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcicsIGhhc2gpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZURhdGEoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHRoaXMuc2V0RmlsdGVyKHt9KTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VyKGhhc2gpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3BhZ2VyJywgaGFzaCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldFBhZ2VyKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncGFnZXInLCB7XG5cdFx0XHRwYWdlU2l6ZTogaXNOYU4odGhpcy5nZXRPcHRpb25zKCdwYWdlU2l6ZScpKSA/IE9QVF9ERUZBVUxUX1BBR0VfU0laRTp0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJyksXG5cdFx0XHRwYWdlTnVtYmVyOiBpc05hTih0aGlzLmdldE9wdGlvbnMoJ3BhZ2VOdW1iZXInKSkgPyBPUFRfREVGQVVMVF9QQUdFX05VTUJFUjp0aGlzLmdldE9wdGlvbnMoJ3BhZ2VOdW1iZXInKSxcblx0XHR9KTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJyk7XG5cdH1cblxuXHRzZXRVcGRhdGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwZGF0aW5nJywgdHJ1ZSk7XG5cdH1cblxuXHRzZXRVcGRhdGVkKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndXBkYXRpbmcnLCBmYWxzZSk7XG5cdH1cblxuXHRpZlVwZGF0aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3VwZGF0aW5nJyk7XG5cdH1cblxuXHR1cGRhdGVEYXRhKCkge1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2xpdmVMb2FkJykgJiYgdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2UnKSkge1xuXHRcdFx0aWYgKHRoaXMuaWZVcGRhdGluZygpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdC8vbG9hZCBmcm9tIHNlcnZlclxuXHRcdFx0bGV0IHF1ZXJ5ID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2UnKSh7fSlcblx0XHRcdFx0LnNldEZpbHRlcih0aGlzLmdldEZpbHRlcigpKVxuXHRcdFx0XHQuc2V0U29ydGVyKHRoaXMuZ2V0U29ydGVyKCkpXG5cdFx0XHRcdC5zZXRQYWdlcih0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUsIHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyKTtcblx0XHRcdHRoaXMuc2V0VXBkYXRpbmcoKTtcblx0XHRcdHF1ZXJ5LiRsaXN0KClcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCckbGlzdCBmb3IgdGFibGUnLCBkYXRhKTtcblx0XHRcdFx0XHR0aGlzLnNldERhdGEoe1xuXHRcdFx0XHRcdFx0cm93czogdGhpcy5nZXREYXRhKCdyb3dzJykuY29uY2F0KGRhdGEpXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dGhpcy5wcm9jY2Vzc0RhdGEoKTtcblx0XHRcdFx0XHR0aGlzLnJlZnJlc2hCb2R5KCk7XG5cdFx0XHRcdFx0dGhpcy5zZXRVcGRhdGVkKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcihlKTtcblx0XHRcdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vbG9jYWwgbWFnaWNcblx0XHRcdHRoaXMuc2V0VXBkYXRpbmcoKTtcblx0XHRcdHRoaXMucHJvY2Nlc3NEYXRhKCk7XG5cdFx0XHR0aGlzLnJlZnJlc2hCb2R5KCk7XG5cdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHR9XG5cdH1cblxuXHRwcm9jY2Vzc0RhdGEoKSB7XG5cdFx0dmFyIHRoYXRGaWx0ZXIgPSB0aGlzLmdldEZpbHRlcigpO1xuXHRcdGlmICh0eXBlb2YgdGhhdEZpbHRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdEZpbHRlciAhPT0gbnVsbCAmJiB0eXBlb2YgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2ggIT09ICd1bmRlZmluZWQnICYmIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoICE9PSBudWxsICYmIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoLmxlbmd0aCA+IDApIHtcblx0XHRcdC8vXG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIHRoaXMuZ2V0RGF0YSgncm93cycpLmZpbHRlcih0aGlzLnRlc3REYXRhSXRlbS5iaW5kKHRoaXMpKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgdGhpcy5nZXREYXRhKCdyb3dzJykpO1xuXHRcdH1cblx0XHQvLy8vc29ydGVyXG5cdFx0dmFyIHRoYXRTb3J0ZXIgPSB0aGlzLmdldFNvcnRlcigpO1xuXHRcdGlmICh0eXBlb2YgdGhhdFNvcnRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdFNvcnRlciAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5zb3J0KChpdGVtMSwgaXRlbTIpID0+IHtcblx0XHRcdFx0bGV0IHQxID0gbm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCwgaXRlbTEsIHt9KSxcblx0XHRcdFx0XHR0MiA9IG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsaXRlbTIse30pO1xuXHRcdFx0XHRpZiAoaXNOYU4odDEpKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0MSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHQyICE9PSAndW5kZWZpbmVkJyAmJiB0MS5sb2NhbGVDb21wYXJlKXtcblx0XHRcdFx0XHRcdHJldHVybiB0MS5sb2NhbGVDb21wYXJlKCkgKiAtIHRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gKCh0MSA8IHQyKSA/IDEgOiAtMSkgKiB0aGF0U29ydGVyLnNvcnREaXJlY3Rpb247XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGJpbmRTZWFyY2goKSB7XG5cdFx0dmFyIHNlYXJjaEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJzZWFyY2hcIl0nKVswXTtcblx0XHRpZiAoIXNlYXJjaEVsKSByZXR1cm47XG5cdFx0dmFyIG9uRXZlbnQgPSAoZSkgPT4ge1xuXHRcdFx0dGhpcy5zZXRGaWx0ZXIoe1xuXHRcdFx0XHRmaWx0ZXJTZWFyY2g6IGUuY3VycmVudFRhcmdldC52YWx1ZVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXHRcdHNlYXJjaEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25FdmVudCk7XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcignZW50ZXInLCBvbkV2ZW50KTtcblx0fVxuXG5cblx0YmluZEN1c3RvbUJpbmRpbmdzKCkge1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpIHx8ICF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Zm9yICh2YXIgc2VsZWN0b3IgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpKSB7XG5cdFx0XHR2YXIgZWxzID0gdGhpcy5nZXRPcHRpb24oJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRmb3IgKHZhciBlbElkID0gMDsgZWxJZCA8IGVscy5sZW5ndGg7IGVsSWQrKykge1xuXHRcdFx0XHR2YXIgZWwgPSBlbHNbZWxJZF07XG5cdFx0XHRcdGZvciAodmFyIGV2ZW50IGluIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl0pIHtcblx0XHRcdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJylbc2VsZWN0b3JdW2V2ZW50XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRsb2FkTmV4dCgpIHtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3BhZ2VyJykucGFnZU51bWJlcisrO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVuZGVyUm93KGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG5ld1JvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RSJyksXG5cdFx0XHRmaWVsZHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgbmV3VGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdURCcpLFxuXHRcdFx0XHRmaWVsZCA9IGZpZWxkc1tpXSxcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gbnVsbCxcblx0XHRcdFx0dmFsID0gbm90UGF0aC5nZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdlZGl0YWJsZScpICYmICFmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnY29tcG9uZW50JykpIHtcblx0XHRcdFx0bmV3VGQuc2V0QXR0cmlidXRlKCdjb250ZW50RWRpdGFibGUnLCB0cnVlKTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC5wYXRoID0gZmllbGQucGF0aDtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC5pdGVtSWQgPSBpdGVtW3RoaXMuZ2V0T3B0aW9ucygnaXRlbUlkRmllbGQnKV07XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQudmFsdWUgPSB2YWw7XG5cdFx0XHRcdG5ld1RkLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKT0+e1xuXHRcdFx0XHRcdG5vdFBhdGguc2V0KGZpZWxkLnBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLCBuZXdUZC50ZXh0Q29udGVudCk7XG5cdFx0XHRcdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoT1BUX0ZJRUxEX05BTUVfUFJFX1BST0MpKSB7XG5cdFx0XHRcdHByZXByb2Nlc3NlZCA9IGZpZWxkW09QVF9GSUVMRF9OQU1FX1BSRV9QUk9DXSh2YWwsIGl0ZW0sIGluZGV4KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdjb21wb25lbnQnKSkge1xuXHRcdFx0XHRuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdFx0XHRkYXRhOiBmaWVsZC5jb21wb25lbnQuZGF0YSB8fCBwcmVwcm9jZXNzZWQgfHwge3ZhbCwgaXRlbSwgaW5kZXh9LFxuXHRcdFx0XHRcdHRlbXBsYXRlOiBmaWVsZC5jb21wb25lbnQudGVtcGxhdGUsXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IG5ld1RkLFxuXHRcdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogZmllbGQuY29tcG9uZW50LmV2ZW50cyB8fCBbXVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ld1RkLmlubmVySFRNTCA9IHByZXByb2Nlc3NlZCB8fCB2YWw7XG5cdFx0XHR9XG5cblx0XHRcdGlmKGZpZWxkLmhhc093blByb3BlcnR5KCdzdHlsZScpKXtcblx0XHRcdFx0Zm9yKGxldCBzdHlsZSBpbiBmaWVsZC5zdHlsZSl7XG5cdFx0XHRcdFx0aWYoZmllbGQuc3R5bGUuaGFzT3duUHJvcGVydHkoc3R5bGUpKXtcblx0XHRcdFx0XHRcdG5ld1RkLnN0eWxlW3N0eWxlXSA9IGZpZWxkLnN0eWxlW3N0eWxlXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KCdldmVudHMnKSAmJiBmaWVsZC5ldmVudHMpIHtcblx0XHRcdFx0Zm9yICh2YXIgaiBpbiBmaWVsZC5ldmVudHMpIHtcblx0XHRcdFx0XHRuZXdUZC5hZGRFdmVudExpc3RlbmVyKGosIChlKT0+e1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZpZWxkLmV2ZW50c1tqXSh7XG5cdFx0XHRcdFx0XHRcdGV2ZW50OiBlLFxuXHRcdFx0XHRcdFx0XHRlbGVtZW50OiBuZXdUZCxcblx0XHRcdFx0XHRcdFx0aXRlbTogaXRlbSxcblx0XHRcdFx0XHRcdFx0dmFsdWU6IHZhbCxcblx0XHRcdFx0XHRcdFx0ZmllbGQ6IGZpZWxkXG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG5ld1Jvdy5hcHBlbmRDaGlsZChuZXdUZCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3Byb2NSb3cnKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJvY1JvdycpKG5ld1JvdywgaXRlbSk7XG5cdFx0fVxuXHRcdHJldHVybiBuZXdSb3c7XG5cdH1cblxuXHRyZWZyZXNoQm9keSgpIHtcblx0XHR2YXIgdGJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0aWYgKCF0Ym9keSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdHRoaXMuY2hlY2tGaWx0ZXJlZCgpO1xuXHRcdHZhciB0aGlzUGFnZVN0YXJ0cyA9IDAsXG5cdFx0XHRuZXh0UGFnZUVuZHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIgKyAxKTtcblx0XHRmb3IgKHZhciBpID0gdGhpc1BhZ2VTdGFydHM7IGkgPCBNYXRoLm1pbihuZXh0UGFnZUVuZHMsIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykubGVuZ3RoKTsgaSsrKSB7XG5cdFx0XHR0Ym9keS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlclJvdyh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpW2ldKSk7XG5cdFx0fVxuXHR9XG5cblx0ZmluZEJvZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuXHR9XG5cblx0Y2xlYXJCb2R5KCkge1xuXHRcdHZhciB0YWJsZUJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cdFx0aWYgKCF0YWJsZUJvZHkpIHJldHVybjtcblx0XHR0YWJsZUJvZHkuaW5uZXJIVE1MID0gJyc7XG5cdH1cblxuXHRjaGVja0ZpbHRlcmVkKCl7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykpKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJyxbXSk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyQm9keSgpIHtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnb25lUGFnZXInKSkge1xuXHRcdFx0dGhpcy5jbGVhckJvZHkoKTtcblx0XHR9XG5cdFx0dGhpcy5jaGVja0ZpbHRlcmVkKCk7XG5cdFx0dmFyIHRoaXNQYWdlU3RhcnRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyKSxcblx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpLFxuXHRcdFx0dGJvZHkgPSB0aGlzLmZpbmRCb2R5KCk7XG5cblx0XHRmb3IgKHZhciBpID0gdGhpc1BhZ2VTdGFydHM7IGkgPCBNYXRoLm1pbihuZXh0UGFnZUVuZHMsIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykubGVuZ3RoKTsgaSsrKSB7XG5cdFx0XHR0Ym9keS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlclJvdyh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpW2ldKSk7XG5cdFx0fVxuXHR9XG5cblx0dGVzdERhdGFJdGVtKGl0ZW0pe1xuXHRcdHZhciBzdHJWYWx1ZSA9IHRoaXMuZ2V0RmlsdGVyU2VhcmNoKCkudG9Mb3dlckNhc2UoKTtcblx0XHRmb3IodmFyIGsgaW4gaXRlbSl7XG5cdFx0XHR2YXIgdG9Db21wID0gaXRlbVtrXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZiAodG9Db21wLmluZGV4T2Yoc3RyVmFsdWUpPi0xKXtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RUYWJsZTtcbiIsImltcG9ydCBub3RUYWJsZSBmcm9tICcuLi9jb21wb25lbnRzL25vdFRhYmxlLmpzJztcbmltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUF9ERUZBVUxUX1BBR0VfU0laRSA9IDUwLFxuXHRPUFRfREVGQVVMVF9WSUVXID0gJ2xpc3QnO1xuXG5jbGFzcyBDUlVETGlzdCBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIExpc3QnKTtcblx0XHR0aGlzLnNldFZpZXdzKHtcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmNvbW1vbicpIHx8IHRydWUsXG5cdFx0XHRcdHRhcmdldFF1ZXJ5OiBwYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG5cdFx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QucHJlbG9hZCcpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnVwZGF0ZURhdGF0YWJsZS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnJlbmRlcignZGVmYXVsdCcsIHt9LCB7XG5cdFx0XHR0aXRsZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnbmFtZXMucGx1cmFsJyksXG5cdFx0XHRzaG93QWRkRm9ybTogKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnBhcmVudC5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUoW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSwgJ2NyZWF0ZSddLmpvaW4oJy8nKSk7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0TGlua1RvVmlldzogKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gJy8nICsgdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlRGF0YXRhYmxlKCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0cnl7XG5cdFx0XHRcdHRoaXMudGFibGVWaWV3ID0gbmV3IG5vdFRhYmxlKHtcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRmaWVsZHM6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuZmllbGRzJyksXG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LnRhcmdldFF1ZXJ5Jyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JykpLFxuXHRcdFx0XHRcdFx0aGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5wbHVyYWwnKVxuXHRcdFx0XHRcdFx0fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5oZWxwZXJzJykgfHwge30pLFxuXHRcdFx0XHRcdFx0cGFnZVNpemU6IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhZ2VyLnNpemUnKSB8fCBPUF9ERUZBVUxUX1BBR0VfU0laRSxcblx0XHRcdFx0XHRcdHBhZ2VOdW1iZXI6IDAsXG5cdFx0XHRcdFx0XHRvbmVQYWdlcjogdHJ1ZSxcblx0XHRcdFx0XHRcdGxpdmVMb2FkOiB0cnVlLFxuXHRcdFx0XHRcdFx0aW50ZXJmYWNlOiB0aGlzLm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fWNhdGNoKGUpe1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzaG93TmV4dFBhZ2UoKSB7XG5cdFx0aWYgKHRoaXMudGFibGVWaWV3KSB7XG5cdFx0XHR0aGlzLnRhYmxlVmlldy5sb2FkTmV4dCgpO1xuXHRcdH1cblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURMaXN0O1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL25vdEZvcm0uanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTiA9ICdnZXRSYXcnLFxuXHRPUFRfREVGQVVMVF9BQ1RJT04gPSAndXBkYXRlJyxcblx0T1BUX0RFRkFVTFRfVklFVyA9ICdlZGl0JztcblxuY2xhc3MgQ1JVRFVwZGF0ZSBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIFVwZGF0ZScpO1xuXHRcdHRoaXMuc2V0Vmlld3Moe1xuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRuYW1lOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmNvbW1vbicpIHx8IHRydWUsXG5cdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuXHRcdFx0XHRoZWxwZXJzOiB7fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLmxvYWRJdGVtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnNldERhdGEuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJGb3JtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGxvYWRJdGVtKCkge1xuXHRcdHJldHVybiB0aGlzLm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSh7XG5cdFx0XHQnX2lkJzogdGhpcy5nZXRPcHRpb25zKCdwYXJhbXMuMCcpXG5cdFx0fSlbJyQnKyh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUubG9hZEFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OKV0oKTtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0JywgdGhpcy5nZXREYXRhKCksIHt9KTtcblx0fVxuXG5cdHJlbmRlckZvcm0oKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHR0cnl7XG5cdFx0XHRcdHRoaXMuZm9ybSA9IG5ldyBub3RGb3JtKHtcblx0XHRcdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRhY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9BQ1RJT04sXG5cdFx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnRhcmdldFF1ZXJ5Jyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0XHRwcmVmaXg6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5wcmVmaXgnKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygncHJlZml4JyksXG5cdFx0XHRcdFx0XHRyb2xlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUucm9sZScpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdyb2xlJyksXG5cdFx0XHRcdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0XHRcdFx0XHRmaWxlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGZpbGVzID0gcGFyYW1zLmUudGFyZ2V0LmZpbGVzIHx8IHBhcmFtcy5lLmRhdGFUcmFuc2Zlci5maWxlcztcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdmaWxlIGNoYW5nZWQnLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0aWYocGFyYW1zLmhlbHBlcnMuZmllbGQubmFtZSAmJiBmaWxlcyl7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnF1ZWVVcGxvYWQocGFyYW1zLmhlbHBlcnMuZmllbGQubmFtZSwgZmlsZXMpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0c3VibWl0OiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnc3VibWl0IGZvcm0gJywgcGFyYW1zLml0ZW0pO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZXhlY1VwbG9hZHMocGFyYW1zLml0ZW0pXG5cdFx0XHRcdFx0XHRcdFx0XHQudGhlbih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0bGliczogdGhpcy5nZXRPcHRpb25zKCdsaWJzJyksXG5cdFx0XHRcdFx0XHRcdGFmdGVyU3VibWl0OiB0aGlzLmJhY2tUb0xpc3QuYmluZCh0aGlzKSxcblx0XHRcdFx0XHRcdH0sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5oZWxwZXJzJykgfHwge30pXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFx0WydhZnRlclJlc3RvcmUnLCAnYWZ0ZXJTdWJtaXQnXSwgdGhpcy5iYWNrVG9MaXN0LmJpbmQodGhpcylcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fWNhdGNoKGUpe1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUoaXRlbSkge1xuXHRcdGl0ZW1bJyQnKyh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuYWN0aW9uJyl8fE9QVF9ERUZBVUxUX0FDVElPTildKClcblx0XHRcdC50aGVuKChyZXN1bHQpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygnZm9ybSBzYXZlZCcsIHJlc3VsdCk7XG5cdFx0XHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLmdldE1vZHVsZU5hbWUoKSk7XG5cdFx0XHRcdHRoaXMucGFyZW50LnJ1bkxpc3QoKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Zvcm0gbm90IHNhdmVkJywgcmVzdWx0KTtcblx0XHRcdH0pO1xuXHR9XG5cblx0YmFja1RvTGlzdCgpIHtcblx0XHR0aGlzLnBhcmVudC5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUodGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVEVXBkYXRlO1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0FDVElPTiA9ICdkZWxldGUnO1xuXG5jbGFzcyBDUlVERGVsZXRlIGV4dGVuZHMgbm90Q29udHJvbGxlcntcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpe1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIERlbGV0ZScpO1xuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZWxldGUucHJlbG9hZCcpKVxuXHRcdFx0LnRoZW4oKCk9Pntcblx0XHRcdFx0aWYgKGNvbmZpcm0oJ9Cj0LTQsNC70LjRgtGMINC30LDQv9C40YHRjD8nKSkge1xuXHRcdFx0XHRcdHRoaXMuZGVsZXRlKCk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHRoaXMuYmFja1RvTGlzdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YmFja1RvTGlzdCgpe1xuXHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkpO1xuXHR9XG5cblx0ZGVsZXRlKCkge1xuXHRcdGxldCBhY3Rpb24gPSckJysodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGVsZXRlLmFjdGlvbicpfHxPUFRfREVGQVVMVF9BQ1RJT04pO1xuXHRcdHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKHsnX2lkJzogdGhpcy5nZXRPcHRpb25zKCdwYXJhbXMuMCcpfSlbYWN0aW9uXSgpXG5cdFx0XHQudGhlbih0aGlzLmJhY2tUb0xpc3QuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVUREZWxldGU7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9ERVRBSUxTX1BSRUZJWCA9ICdkZXRhaWxzXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfREVUQUlMU19USVRMRSA9ICdEZXRhaWxzIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge30sXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUID0gWydvcHRpb25zJywgJ21hbmlmZXN0JywgJ2FwcCddO1xuXG5jbGFzcyBub3REZXRhaWxzIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdwcmVmaXgnLCBPUFRfREVGQVVMVF9ERVRBSUxTX1BSRUZJWCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50cycsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLnNldERhdGEobmV3IG5vdFJlY29yZCh7fSwgdGhpcy5nZXREYXRhKCkpKTtcblx0XHR9XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YSgpIHtcblx0XHRsZXQgbWFuaWZlc3QgPSB0aGlzLmdldE1hbmlmZXN0KCk7XG5cdFx0aWYgKG1hbmlmZXN0ICYmIG1hbmlmZXN0LmFjdGlvbnMpIHtcblx0XHRcdHJldHVybiBtYW5pZmVzdC5hY3Rpb25zLmhhc093blByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJykpID8gbWFuaWZlc3QuYWN0aW9uc1t0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpXSA6IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpc3QoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKSxcblx0XHRcdGxpc3QgPSBbXSxcblx0XHRcdHJvbGUgPSB0aGlzLmdldE9wdGlvbnMoJ3JvbGUnLCBPUFRfREVGQVVMVF9ST0xFX05BTUUpO1xuXHRcdGlmIChhY3Rpb25EYXRhKSB7XG5cdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMpIHtcblx0XHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzLmhhc093blByb3BlcnR5KHJvbGUpKSB7XG5cdFx0XHRcdFx0bGlzdCA9IGFjdGlvbkRhdGEuZmllbGRzW3JvbGVdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHR9XG5cblx0Z2V0UGFydFRlbXBsYXRlTmFtZShmb3JtUGFydCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfREVUQUlMU19USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0RmllbGRzTGlzdCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0bGV0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0RmllbGRzTGlzdCgpW3RdO1xuXHRcdFx0XHR0aGlzLmFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xlYXJGaWVsZHNDb21wb25lbnRzKCkge1xuXHRcdGxldCBjb21wcyA9IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpO1xuXHRcdHdoaWxlIChjb21wcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb21wc1swXS5jb21wb25lbnQuZGVzdHJveSgpO1xuXHRcdFx0Y29tcHMuc3BsaWNlKDAsIDEpO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpYnMoKXtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0b3B0aW9uczoge30sXG5cdFx0XHRtYW5pZmVzdDoge30sXG5cdFx0XHRhcHA6IHt9LFxuXHRcdH07XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJykpIHtcblx0XHRcdHJlc3VsdC5vcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKG5vdENvbW1vbi5nZXRBcHAoKSAmJiBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJykpe1xuXHRcdFx0cmVzdWx0LmFwcCA9IG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkICYmIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkpe1xuXHRcdFx0cmVzdWx0Lm1hbmlmZXN0ID0gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKS5maWVsZHM7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSkge1xuXHRcdGxldCBkZWYgPSBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OLFxuXHRcdFx0ZmllbGRzTGlicyA9IHRoaXMuZ2V0RmllbGRzTGlicygpO1xuXHRcdGZvcihsZXQgdCBvZiBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCl7XG5cdFx0XHRpZiAoZmllbGRzTGlicy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBmaWVsZHNMaWJzW3RdLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpe1xuXHRcdFx0XHRyZXR1cm4gZmllbGRzTGlic1t0XVtmaWVsZE5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0YWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKSB7XG5cdFx0bGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpLFxuXHRcdFx0cmVjID0gbnVsbDtcblx0XHRpZihmaWVsZFR5cGUuY29tcG9uZW50KXtcblx0XHRcdHJlYyA9IHRoaXMuY2FzdEN1c3RvbShmaWVsZE5hbWUsIGZpZWxkVHlwZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZWMgPSB0aGlzLmNhc3RDb21tb24oZmllbGROYW1lLCBmaWVsZFR5cGUpO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5wdXNoKHJlYyk7XG5cdH1cblxuXHRjYXN0Q3VzdG9tKGZpZWxkTmFtZSwgZmllbGRUeXBlKXtcblx0XHRsZXQgQ3VzdG9tQ29tcG9uZW50ID0gbm90RnJhbWV3b3JrLm5vdENvbW1vbi5nZXQoJ2NvbXBvbmVudHMnKVtmaWVsZFR5cGUuY29tcG9uZW50XTtcblx0XHRsZXQgcmVjID0ge1xuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0bmFtZTogZmllbGROYW1lLFxuXHRcdFx0XHR0aXRsZTogZmllbGRUeXBlLmxhYmVsIHx8IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0dHlwZTogZmllbGRUeXBlLnR5cGUsXG5cdFx0XHRcdGxhYmVsOiBmaWVsZFR5cGUubGFiZWwsXG5cdFx0XHRcdGFycmF5OiBmaWVsZFR5cGUuYXJyYXksXG5cdFx0XHRcdGRlZmF1bHQ6IGZpZWxkVHlwZS5kZWZhdWx0LFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMobm90UGF0aC5qb2luKCdoZWxwZXJzJywnbGlicycsZmllbGROYW1lKSlcblx0XHRcdH1cblx0XHR9O1xuXHRcdGxldCBoZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRpc0NoZWNrZWQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0cmV0dXJuIHBhcmFtcy5pdGVtLnZhbHVlID09PSB0aGlzLmdldERhdGEoZmllbGROYW1lKTtcblx0XHRcdH0sXG5cdFx0XHRmaWVsZDogcmVjLmZpZWxkLFxuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKClcblx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cblx0XHRyZWMuY29tcG9uZW50ID0gbmV3IEN1c3RvbUNvbXBvbmVudCh7XG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiByZWM7XG5cdH1cblxuXHRjYXN0Q29tbW9uKGZpZWxkTmFtZSwgZmllbGRUeXBlKXtcblx0XHRsZXQgcmVjID0ge1xuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0bmFtZTogZmllbGROYW1lLFxuXHRcdFx0XHR0aXRsZTogZmllbGRUeXBlLmxhYmVsIHx8IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0dHlwZTogZmllbGRUeXBlLnR5cGUsXG5cdFx0XHRcdGxhYmVsOiBmaWVsZFR5cGUubGFiZWwsXG5cdFx0XHRcdGFycmF5OiBmaWVsZFR5cGUuYXJyYXksXG5cdFx0XHRcdGRlZmF1bHQ6IGZpZWxkVHlwZS5kZWZhdWx0LFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMobm90UGF0aC5qb2luKCdoZWxwZXJzJywnbGlicycsZmllbGROYW1lKSlcblx0XHRcdH1cblx0XHR9O1xuXHRcdGxldCBoZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRpc0NoZWNrZWQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0cmV0dXJuIHBhcmFtcy5pdGVtLnZhbHVlID09PSB0aGlzLmdldERhdGEoZmllbGROYW1lKTtcblx0XHRcdH0sXG5cdFx0XHRmaWVsZDogcmVjLmZpZWxkLFxuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKClcblx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoZmllbGRUeXBlLnR5cGUpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRUYXJnZXRFbGVtZW50KGZpZWxkVHlwZS50YXJnZXQpLFxuXHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUxhc3QnXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlYztcblx0fVxuXG5cdGdldFRhcmdldEVsZW1lbnQodGFyZ2V0ID0gJ2JvZHknKXtcblx0XHRpZiAoIXRhcmdldCl7dGFyZ2V0ID0gJ2JvZHknO31cblx0XHRsZXQgcmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHRpZiAoIXJlcyAmJiB0YXJnZXQhPT0nYm9keScpe1xuXHRcdFx0dGFyZ2V0ID0gJ2JvZHknO1xuXHRcdFx0cmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHR9XG5cdFx0aWYoIXJlcyAmJiB0YXJnZXQ9PSdib2R5Jyl7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdHVwZGF0ZUZpZWxkKGZpZWxkTmFtZSl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5maWVsZC5uYW1lID09PSBmaWVsZE5hbWUpe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3REZXRhaWxzO1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90RGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL25vdERldGFpbHMuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTiA9ICdnZXQnLFxuXHRPUFRfREVGQVVMVF9WSUVXID0gJ2RldGFpbHMnO1xuXG5jbGFzcyBDUlVERGV0YWlscyBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIERldGFpbHMnKTtcblx0XHR0aGlzLnNldFZpZXdzKHtcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmNvbW1vbicpIHx8IHRydWUsXG5cdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmNvbnRhaW5lclNlbGVjdG9yJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSxcblx0XHRcdFx0aGVscGVyczoge31cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMubG9hZEl0ZW0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlckRldGFpbHMuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bG9hZEl0ZW0oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKHtcblx0XHRcdCdfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJylcblx0XHR9KVsnJCcgKyAodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTildKCk7XG5cdH1cblxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0bGV0IGl0ZW0gPSB0aGlzLmdldERhdGEoKTtcblx0XHR2YXIgaGVscGVycyA9IHtcblx0XHRcdElEOiBpdGVtID8gaXRlbVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkgKyAnSUQnXSA6ICcnLFxuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0YXJyYXk6IGZhbHNlXG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKFt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCksIHBhcmFtcy5pdGVtLl9pZCwgJ3VwZGF0ZSddLmpvaW4oJy8nKSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKFt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCksIHBhcmFtcy5pdGVtLl9pZCwgJ2RlbGV0ZSddLmpvaW4oJy8nKSk7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0TGlua1RvVGFibGU6ICgpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLmdldEZ1bGxSb3V0ZSh0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkpO1xuXHRcdFx0fSxcblx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5zaW5nbGUnKVxuXHRcdH07XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0JywgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRyZW5kZXJEZXRhaWxzKCkge1xuXHRcdGxldCBpdGVtID0gdGhpcy5nZXREYXRhKCk7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdG5ldyBub3REZXRhaWxzKHtcblx0XHRcdFx0XHRkYXRhOiBpdGVtLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnRhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnRhcmdldFF1ZXJ5Jyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JykpLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OLFxuXHRcdFx0XHRcdFx0cHJlZml4OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnByZWZpeCcpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdwcmVmaXgnKSxcblx0XHRcdFx0XHRcdHJvbGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMucm9sZScpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdyb2xlJyksXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdFx0bGliczogdGhpcy5nZXRPcHRpb25zKCdsaWInKSxcblx0XHRcdFx0XHRcdFx0SUQ6IGl0ZW1bdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICsgJ0lEJ10sXG5cdFx0XHRcdFx0XHRcdF9fdmVyc2lvbjogaXRlbS5fX3ZlcnNpb24sXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmhlbHBlcnMnKSB8fCB7fSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHJlc29sdmVdXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmVqZWN0KGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YmFja1RvTGlzdCgpIHtcblx0XHR0aGlzLmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRERldGFpbHM7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBDUlVEQ3JlYXRlIGZyb20gJy4vQ3JlYXRlJztcbmltcG9ydCBDUlVETGlzdCBmcm9tICcuL0xpc3QnO1xuaW1wb3J0IENSVURVcGRhdGUgZnJvbSAnLi9VcGRhdGUnO1xuaW1wb3J0IENSVUREZWxldGUgZnJvbSAnLi9EZWxldGUnO1xuaW1wb3J0IENSVUREZXRhaWxzIGZyb20gJy4vRGV0YWlscyc7XG5cblxuY2xhc3MgQ1JVRENvbnRyb2xsZXIgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoYXBwLCBwYXJhbXMpIHtcblx0XHRub3RDb21tb24ubG9nKCdydW5uaW5nIENSVURDb250cm9sbGVyJyk7XG5cdFx0c3VwZXIoYXBwKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ25hbWVzJywge1xuXHRcdFx0cGx1cmFsOiAncGx1cmFsJyxcblx0XHRcdHNpbmdsZTogJ3NpbmdsZScsXG5cdFx0fSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InLCB0aGlzLmFwcC5nZXRPcHRpb25zKCdjcnVkLmNvbnRhaW5lclNlbGVjdG9yJykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cm91dGUocGFyYW1zID0gW10pe1xuXHRcdGlmKHBhcmFtcy5sZW5ndGg9PTEpe1xuXHRcdFx0aWYocGFyYW1zWzBdID09PSAnY3JlYXRlJyl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1bkNyZWF0ZShwYXJhbXMpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1bkRldGFpbHMocGFyYW1zKTtcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihwYXJhbXMubGVuZ3RoID09IDIpe1xuXHRcdFx0aWYgKHBhcmFtc1sxXSA9PT0gJ2RlbGV0ZScpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5EZWxldGUocGFyYW1zKTtcblx0XHRcdH1lbHNlIGlmKHBhcmFtc1sxXSA9PT0gJ3VwZGF0ZScpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5VcGRhdGUocGFyYW1zKTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0bGV0IHJvdXRlUnVubmVyTmFtZSA9ICdydW4nICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihwYXJhbXNbMV0pO1xuXHRcdFx0XHRpZih0aGlzW3JvdXRlUnVubmVyTmFtZV0gJiYgdHlwZW9mIHRoaXNbcm91dGVSdW5uZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJyl7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXNbcm91dGVSdW5uZXJOYW1lXShwYXJhbXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnJ1bkxpc3QocGFyYW1zKTtcblx0fVxuXG5cdHJ1bkNyZWF0ZShwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVURDcmVhdGUodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bkxpc3QocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVETGlzdCh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuRGV0YWlscyhwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVUREZXRhaWxzKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5EZWxldGUocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVERGVsZXRlKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5VcGRhdGUocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVEVXBkYXRlKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvbkFmdGVyUmVuZGVyKCl7XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURDb250cm9sbGVyO1xuIiwiaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aC5qcyc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4uL25vdFJvdXRlcic7XG5cbnZhciBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgPSB7XG5cdGNvbnRlbnQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5pbmRleE9mKCdjYXBpdGFsaXplJykgPiAtMSkge1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0LnRvVXBwZXJDYXNlKCk7XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQudGV4dENvbnRlbnQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQ7XG5cdH0sXG5cdGJpbmQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQuYmluZHMpe1xuXHRcdFx0aWYoc2NvcGUuZWxlbWVudC5iaW5kcy5oYXNPd25Qcm9wZXJ0eShzY29wZS5wYXJhbXNbMF0pKXtcblx0XHRcdFx0aWYoc2NvcGUuZWxlbWVudC5iaW5kc1tzY29wZS5wYXJhbXNbMF1dLmluZGV4T2Yoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbikgPiAtMSl7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihzY29wZS5wYXJhbXNbMF0sIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiBzY29wZS5hdHRyaWJ1dGVSZXN1bHQoe1xuXHRcdFx0XHRcdHNjb3BlLFxuXHRcdFx0XHRcdGl0ZW0sXG5cdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aWYoIXNjb3BlLmVsZW1lbnQuaGFzT3duUHJvcGVydHkoJ2JpbmRzJykpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5iaW5kcyA9IHt9O1xuXHRcdH1cblx0XHRpZighc2NvcGUuZWxlbWVudC5iaW5kcy5oYXNPd25Qcm9wZXJ0eShzY29wZS5wYXJhbXNbMF0pKXtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYmluZHNbc2NvcGUucGFyYW1zWzBdXSA9IFtdO1xuXHRcdH1cblx0XHRpZihzY29wZS5lbGVtZW50LmJpbmRzW3Njb3BlLnBhcmFtc1swXV0uaW5kZXhPZihzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uKSA9PT0gLTEpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5iaW5kc1tzY29wZS5wYXJhbXNbMF1dLnB1c2goc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbik7XG5cdFx0fVxuXHR9LFxuXHR2YWx1ZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgbGl2ZUV2ZW50cyA9IFsnY2hhbmdlJywgJ2tleXVwJ10sXG5cdFx0XHRvbkV2ZW50ID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAoWydjaGVja2JveCcsICdyYWRpbycsICdzZWxlY3QtbXVsdGlwbGUnXS5pbmRleE9mKHNjb3BlLmVsZW1lbnQudHlwZSkgPiAtMSkge1xuXHRcdFx0XHRcdHN3aXRjaCAoc2NvcGUuZWxlbWVudC50eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnY2hlY2tib3gnOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAncmFkaW8nOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGhlbHBlcnMuZmllbGQubmFtZSwgaGVscGVycy5kYXRhLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQ/c2NvcGUuZWxlbWVudC52YWx1ZTpudWxsKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCA/IHNjb3BlLmVsZW1lbnQudmFsdWUgOiBudWxsKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3NlbGVjdC1tdWx0aXBsZSc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGxldCBzZWxlY3RlZCA9IFtdLnNsaWNlLmNhbGwoc2NvcGUuZWxlbWVudC5zZWxlY3RlZE9wdGlvbnMpLm1hcChhID0+IGEudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCdzZWxlY3QtbXVsdGlwbGUnLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpLCAnIC0+ICcsc2NvcGUuZWxlbWVudC52YWx1ZSk7XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2NvcGUuZWxlbWVudC52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHRcdGlmIChzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlICE9PSB0cnVlKSB7XG5cdFx0XHRpZihzY29wZS5lbGVtZW50LnR5cGUgPT09ICd0ZXh0YXJlYScpe1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmlubmVySFRNTCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0fVxuXHRcdFx0Zm9yIChsZXQgdCBvZiBsaXZlRXZlbnRzKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0LCBvbkV2ZW50KTtcblx0XHRcdH1cblx0XHRcdHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0YXR0cjogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykgfHwgbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKSA/IHJlcyh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXMpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKHNjb3BlLnBhcmFtc1swXSwgc2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0fSxcblx0bmFtZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbiggLypzY29wZSwgaXRlbSwgaGVscGVycyovICkge1xuXG5cdH0sXG5cdGNoZWNrZWQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykgPyByZXN1bHQoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzdWx0KTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPyBzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpIDogc2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcblx0fSxcblx0Y2xhc3M6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlcyA9PT0gJ2Z1bmN0aW9uJykgPyByZXMoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA8IDMgfHwgaXNOYU4oc2NvcGUuYXR0cmlidXRlUmVzdWx0KSkge1xuXHRcdFx0aWYgKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgdXNlZCA9IGZhbHNlO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzY29wZS5wYXJhbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGkgPT09IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbaV0pO1xuXHRcdFx0XHRcdHVzZWQgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXVzZWQpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRvcHRpb25zOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBpID0gMCxcblx0XHRcdG9wdGlvbiA9IG51bGwsXG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9ICd2YWx1ZScsXG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9ICduYW1lJyxcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkJykgJiYgaGVscGVycy5maWVsZC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpID8gaGVscGVycy5maWVsZC5uYW1lIDogJ3ZhbHVlJztcblx0XHRzY29wZS5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdH1cblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMykge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1syXTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBoZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWxwZXJzICE9PSBudWxsICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSAmJiBoZWxwZXJzLmRlZmF1bHQpIHtcblx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyk7XG5cdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBoZWxwZXJzLnBsYWNlaG9sZGVyO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdHZhciBsaWIgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsaWIubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbGliW2ldW3ZhbHVlRmllbGROYW1lXSk7XG5cdFx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGxpYltpXVtsYWJlbEZpZWxkTmFtZV07XG5cdFx0XHRcdGlmIChoZWxwZXJzLmZpZWxkLmFycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSAmJiBBcnJheS5pc0FycmF5KGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSkpe1xuXHRcdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXS5pbmRleE9mKGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSA9PT0gbGliW2ldW3ZhbHVlRmllbGROYW1lXSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aHJlZjpmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0aWYgKCFzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBub3RSb3V0ZXIuZ2V0RnVsbFJvdXRlKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdG5vdFJvdXRlci5uYXZpZ2F0ZShub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5ub3RSb3V0ZXJJbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cbn07XG5leHBvcnQgZGVmYXVsdCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWI7XG4iLCIvKlxuXHRDb21tb24gZnVuY3Rpb25zXG4qL1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG4vKlxuXHRmcmFtZXdvcmsgd2lkZSBwYXJzZXIgZm9yIGRhdGEgYWNjZXNzXG4qL1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuXG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcbi8qXG5cdGJhc2ljIGV2ZW50IGhhbmRsZXJzIGFuZCBjb3JlIGRhdGEgbW9kaWZpZXJzXG4qL1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbi8qXG5cdHNtYXJ0ZXIgaW1hZ2UgY29udHJvbFxuKi9cbmltcG9ydCBub3RJbWFnZSBmcm9tICcuL3RlbXBsYXRlL25vdEltYWdlJztcbi8qXG5cdGFwcGxpY2F0aW9uIG1haW4gaW5mcmFzdHJ1Y3R1cmUgc2V0dGVyXG4qL1xuaW1wb3J0IG5vdEFwcCBmcm9tICcuL25vdEFwcCc7XG4vKlxuXHR1c2VyIGNvbnRyb2xsZXJzXG4qL1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi9ub3RDb250cm9sbGVyJztcblxuaW1wb3J0IHtDUlVEQ29udHJvbGxlcixDUlVEQ3JlYXRlLENSVUREZWxldGUsQ1JVRERldGFpbHMsQ1JVRExpc3QsQ1JVRFVwZGF0ZX0gZnJvbSAnLi9DUlVEJztcblxuLypcblx0dGVtcGxhdGluZyBhbmQgY29tbW9uIHN0cnVjdHVyZXNcbiovXG5cbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL3RlbXBsYXRlL25vdFJlbmRlcmVyJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7IC8vIHNtYXJ0ZXIgd2l0aCBiaW5kaW5ncyBmb3IgZXZlbnRzLCBhY3R1YWx5IHByb3h5XG5cbmltcG9ydCBub3RGb3JtIGZyb20gJy4vY29tcG9uZW50cy9ub3RGb3JtJztcbmltcG9ydCBub3RUYWJsZSBmcm9tICcuL2NvbXBvbmVudHMvbm90VGFibGUnO1xuaW1wb3J0IG5vdERldGFpbHMgZnJvbSAnLi9jb21wb25lbnRzL25vdERldGFpbHMnO1xuXG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJzsgLy9cdGhvdyB0byBpbnRlcmFjdCB3aXRoIGRhdGEgb24gc2VydmVyXG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJzsgLy9cdHdyYXBwZXIgZm9yIGRhdGEgd2l0aCBzZXJ2ZXI8LT52aWV3IGxpdmUgaW50ZXJhY3Rpb25zXG5cbm5vdFRlbXBsYXRlUHJvY2Vzc29ycy5hZGQobm90VGVtcGxhdGVQcm9jZXNzb3JzTGliKTtcblxuZXhwb3J0IHtcblx0bm90Q29tbW9uLFxuXHRub3RQYXRoLFxuXHRub3RCYXNlLFxuXHRub3RJbWFnZSxcblx0bm90QXBwLFxuXHRub3RBUEksXG5cdG5vdENvbnRyb2xsZXIsXG5cdENSVURDb250cm9sbGVyLFxuXHRDUlVEQ3JlYXRlLFxuXHRDUlVERGVsZXRlLFxuXHRDUlVERGV0YWlscyxcblx0Q1JVRExpc3QsXG5cdENSVURVcGRhdGUsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29ycyxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLFxuXHRub3RUZW1wbGF0ZUNhY2hlLFxuXHRub3RSZW5kZXJlcixcblx0bm90Q29tcG9uZW50LFxuXHRub3RGb3JtLFxuXHRub3RSb3V0ZXIsXG5cdG5vdFRhYmxlLFxuXHRub3REZXRhaWxzLFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJ1cGxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25Qcm9ncmVzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNwb25zZVR5cGUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ3aXRoQ3JlZGVudGlhbHMiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsImdldFNlc3Npb25JRCIsImZpbGUiLCJ0eXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwibmFtZSIsInNlbmQiLCJtZXRob2QiLCJkYXRhIiwib25sb2FkIiwidCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJwYXJzZUludCIsInJlc3BvbnNlVGV4dCIsImUiLCJnZXRDb29raWUiLCJ2YWx1ZSIsImRvY3VtZW50IiwiY29va2llIiwicGFydHMiLCJzcGxpdCIsImxlbmd0aCIsInBvcCIsInNoaWZ0IiwiTE9HIiwiQ29tbW9uTG9ncyIsIm5vdEZyYW1ld29yayIsIm5vdENvbW1vbiIsImVycm9yIiwiYXJndW1lbnRzIiwibG9nIiwidHJhY2UiLCJNQU5BR0VSIiwiU3ltYm9sIiwiQ29tbW9uU2hvcnRzIiwiZ2V0TWFuYWdlciIsImdldEFQSSIsInYiLCJDb21tb25PYmplY3RzIiwiZGVmYXVsdHMiLCJvcHRpb25zIiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiY2FsbCIsInRhcmdldCIsInNvdXJjZXMiLCJmb3JFYWNoIiwiZGVzY3JpcHRvcnMiLCJrZXlzIiwic291cmNlIiwicmVkdWNlIiwia2V5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZGVzY3JpcHRvciIsInN5bSIsImVudW1lcmFibGUiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiYmlnIiwic21hbGwiLCJvYmoiLCJmaWx0ZXIiLCJjb250YWluc09iaiIsImljb25zIiwiYmF0Y2giLCJnZXREYXRhIiwicHVzaCIsImEiLCJiIiwicCIsImVxdWFsIiwidG9TdHJpbmciLCJkZWZhdWx0VmFsdWUiLCJvYmoxIiwib2JqMiIsImpRdWVyeSIsImV4dGVuZCIsInZhbCIsInJlZ2lzdHJ5IiwiYXJyYXkiLCJvbGRfaW5kZXgiLCJuZXdfaW5kZXgiLCJrIiwidW5kZWZpbmVkIiwic3BsaWNlIiwiQ29tbW9uU3RyaW5ncyIsInN0cmluZyIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0b0xvd2VyQ2FzZSIsIkNvbW1vbkZ1bmN0aW9ucyIsImZ1bmNzIiwicmVzdWx0IiwiZnVuYyIsIkNvbW1vbkRPTSIsImVsIiwic3RhcnRzV2l0aCIsImFsbEVsZW1lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsImxpc3QiLCJqIiwiYXR0cyIsImF0dHJpYnV0ZXMiLCJuIiwibm9kZU5hbWUiLCJDb21tb25BcHAiLCJzdGFydGVyIiwiYXNzaWduIiwiZXh0ZW5kV2l0aCIsIlNVQl9QQVRIX1NUQVJUIiwiU1VCX1BBVEhfRU5EIiwiUEFUSF9TUExJVCIsIlBBVEhfU1RBUlRfT0JKRUNUIiwiUEFUSF9TVEFSVF9IRUxQRVJTIiwiRlVOQ1RJT05fTUFSS0VSIiwiTUFYX0RFRVAiLCJub3RQYXRoIiwicGF0aCIsInN1YlBhdGgiLCJmaW5kIiwic3ViIiwicGFyc2VkIiwic3ViZiIsInJlcGxhY2UiLCJpdGVtIiwiaGVscGVycyIsInN1YlBhdGhQYXJzZWQiLCJmaW5kTmV4dFN1YlBhdGgiLCJnZXRWYWx1ZUJ5UGF0aCIsInJlcGxhY2VTdWJQYXRoIiwicGFyc2VTdWJzIiwiYXR0clZhbHVlIiwic2V0VmFsdWVCeVBhdGgiLCJpc1JlY29yZCIsIm5vcm1pbGl6ZVBhdGgiLCJ0cmlnZ2VyIiwic2V0Iiwic3RlcCIsImhlbHBlciIsInJTdGVwIiwiQXJyYXkiLCJpc0FycmF5IiwicGFyc2VQYXRoU3RlcCIsIm9iamVjdCIsImF0dHJQYXRoIiwiYXR0ck5hbWUiLCJpc0Z1bmN0aW9uIiwibmV3T2JqIiwiYXJncyIsImpvaW4iLCJNRVRBX01FVEhPRF9JTklUIiwiTUVUQV9FVkVOVFMiLCJNRVRBX0RBVEEiLCJNRVRBX1dPUktJTkciLCJNRVRBX09QVElPTlMiLCJub3RCYXNlIiwiaW5wdXQiLCJldmVudHMiLCJvbiIsInNldERhdGEiLCJzZXRXb3JraW5nIiwid29ya2luZyIsInNldE9wdGlvbnMiLCJ3aGF0IiwicmVzIiwic2V0Q29tbW9uIiwiZ2V0Q29tbW9uIiwiZ2V0T3B0aW9ucyIsImdldFdvcmtpbmciLCJldmVudE5hbWVzIiwiZXZlbnRDYWxsYmFja3MiLCJvbmNlIiwiZGVmaW5lSWZOb3RFeGlzdHMiLCJmcm9tIiwiZXZlbnROYW1lIiwiZXZlbnQiLCJvZmYiLCJjYWxsYmFja3MiLCJjYWxsYmFjayIsInRhcmdldElkIiwiT1BUX01PREVfSElTVE9SWSIsIk9QVF9NT0RFX0hBU0giLCJPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCIsIm5vdFJvdXRlciIsInJvb3QiLCJjbGVhclNsYXNoZXMiLCJyZSIsImhhbmRsZXIiLCJydWxlIiwiYWRkIiwicGFyYW0iLCJyIiwiZnJhZ21lbnQiLCJsb2NhdGlvbiIsImRlY29kZVVSSSIsInBhdGhuYW1lIiwic2VhcmNoIiwid2luZG93IiwibWF0Y2giLCJocmVmIiwiY3VycmVudCIsImdldEZyYWdtZW50IiwiaW5pdCIsImlzSW5pdGlhbGl6ZWQiLCJjaGVjayIsInNldEluaXRpYWxpemVkIiwibG9vcEludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjaGVja0xvY2F0aW9uIiwiYmluZCIsImhyZWZDbGljayIsImZ1bGxSRSIsImFwcGx5IiwiaG9zdCIsInB1c2hTdGF0ZSIsImdldEZ1bGxSb3V0ZSIsImJvZHkiLCJnZXRBbGxMaW5rcyIsImluaXRSZXJvdXRpbmciLCJnZXRBdHRyaWJ1dGUiLCJsaW5rIiwibm90Um91dGVySW5pdGlhbGl6ZWQiLCJmdWxsTGluayIsInByZXZlbnREZWZhdWx0IiwibmF2aWdhdGUiLCJub3RBUElPcHRpb25zIiwibm90QVBJUXVlZSIsInJlcXVlc3RzUGVyU2Vjb25kIiwicXVlZSIsImludCIsImluUHJvZ3Jlc3MiLCJ0b0NhbGwiLCJjbGVhckludGVydmFsIiwicnVuIiwibm90QVBJIiwiaWQiLCJnb29kIiwiYmFkIiwibWFrZVJlcXVlc3QiLCJyZXNwb25zZU9LIiwicmVzcG9uc2VGYWlsZWQiLCJyZXF1ZXN0SlNPTiIsInRoZW4iLCJuZXh0IiwiY2F0Y2giLCJnZXRJZCIsIm1vZGVsTmFtZSIsImdldE1vZGVsTmFtZSIsIm1ha2VVcmwiLCJnZXRKU09OIiwibm90SW1hZ2UiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgiLCJURU1QTEFURV9UQUciLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IiLCJQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCIsIkNPTVBPTkVOVF9JRF9QUkVGSVgiLCJQQVJUX0lEX1BSRUZJWCIsIkRFRkFVTFRfUExBQ0VSIiwiREVGQVVMVF9QTEFDRVJfTE9PUCIsIk9QVFMiLCJNRVRBX0NBQ0hFIiwibm90VGVtcGxhdGVDYWNoZSIsImhpZGVUZW1wbGF0ZXMiLCJyZWdpc3RlciIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJtYXAiLCJsb2FkT25lIiwib1JlcXVlc3QiLCJkaXYiLCJkYXRhc2V0Iiwibm90VGVtcGxhdGVOYW1lIiwibm90VGVtcGxhdGVVUkwiLCJzcmNFbGVtZW50Iiwic2V0T25lIiwiZWxlbWVudCIsIkhUTUxFbGVtZW50IiwiYWRkRnJvbVRleHQiLCJjbG9uZU5vZGUiLCJjb250IiwidGV4dCIsIm5vdFRlbXBsYXRlc0VsZW1lbnRzIiwiZWxJZCIsInBhcmVudE5vZGUiLCJsaWIiLCJnZXRIVE1MIiwidGVtcGxhdGVJbm5lckhUTUwiLCJ0ZW1wbGF0ZUNvbnRFbCIsIndyYXAiLCJ0ZW1wbGF0ZXNIVE1MIiwidGVtcGxhdGVzIiwicGFyc2VMaWIiLCJhZGRMaWIiLCJzZWxlY3Rvck9yRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0YWdOYW1lIiwiT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSIsIkRFRkFVTFRfRklMVEVSIiwiREVGQVVMVF9QQUdFX05VTUJFUiIsIkRFRkFVTFRfUEFHRV9TSVpFIiwibm90SW50ZXJmYWNlIiwibWFuaWZlc3QiLCJsaW5lIiwicmVjb3JkIiwiYWN0aW9uTmFtZSIsInJlY29yZFJFIiwiZmllbGROYW1lIiwiaW5kIiwibGVuIiwiaW5kMiIsInN0YXJ0U2xpY2UiLCJlbmRTbGljZSIsImdldEF0dHIiLCJtb2RlbCIsImFjdGlvbkRhdGEiLCJwYXJzZUxpbmUiLCJwb3N0Rml4IiwicmVzdWx0SWQiLCJwcmVmaXhlcyIsImluZGV4IiwiY29uY2F0IiwicHJlIiwiZ2V0QWN0aW9ucyIsImFjdGlvbnMiLCJzZXRGaWx0ZXIiLCJmaWx0ZXJEYXRhIiwic29ydGVyRGF0YSIsInBhZ2VOdW1iZXIiLCJwYWdlU2l6ZSIsInNldFBhZ2VyIiwicmVxdWVzdERhdGEiLCJkYXRhUHJvdmlkZXJOYW1lIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwiZ2V0QWN0aW9uRGF0YSIsInJlcXVlc3RQYXJhbXMiLCJjb2xsZWN0UmVxdWVzdERhdGEiLCJyZXF1ZXN0UGFyYW1zRW5jb2RlZCIsImVuY29kZVJlcXVlc3QiLCJnZXRJRCIsImdldFVSTCIsInF1ZWVSZXF1ZXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsImFmdGVyU3VjY2Vzc1JlcXVlc3QiLCJub3RSZWNvcmQiLCJNRVRBX0lOVEVSRkFDRSIsIk1FVEFfUFJPWFkiLCJNRVRBX0NIQU5HRSIsIk1FVEFfQ0hBTkdFX05FU1RFRCIsIk1FVEFfU0FMIiwiTUVUQV9NQVBfVE9fSU5URVJGQUNFIiwiREVGQVVMVF9BQ1RJT05fUFJFRklYIiwiTUVUQV9SRVRVUk5fVE9fUk9PVCIsImNyZWF0ZVByb3BlcnR5SGFuZGxlcnMiLCJvd25lciIsImNvbnRleHQiLCJyZXNUYXJnZXQiLCJSZWZsZWN0IiwiRXJyb3IiLCJ2YWx1ZVRvUmVmbGVjdCIsIm5vdFByb3BlcnR5IiwiZ2V0Um9vdCIsInBhdGhUbyIsImlzUHJveHkiLCJpc1Byb3BlcnR5IiwiUHJveHkiLCJwcm94eSIsImNyZWF0ZVJlY29yZEhhbmRsZXJzIiwiY3JlYXRlQ29sbGVjdGlvbiIsIm5vdFJlY29yZEludGVyZmFjZSIsImluaXRQcm9wZXJ0aWVzIiwiaW50ZXJmYWNlVXAiLCJjdXJQYXRoIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsIml0ZW1zIiwiY29sbGVjdGlvbiIsImdldEFjdGlvbnNDb3VudCIsImFjdGlvblVwIiwicmVxdWVzdCIsIm9iamVjdFBhcnQiLCJzZXRBdHRyIiwic2V0RmluZEJ5IiwicmVzZXRGaWx0ZXIiLCJnZXRGaWx0ZXIiLCJzZXRTb3J0ZXIiLCJnZXRTb3J0ZXIiLCJzZXRQYWdlTnVtYmVyIiwic2V0UGFnZVNpemUiLCJyZXNldFBhZ2VyIiwiZ2V0UGFnZXIiLCJPUFRfQ09OVFJPTExFUl9QUkVGSVgiLCJPUFRfUkVDT1JEX1BSRUZJWCIsIm5vdEFwcCIsInJlc291cmNlcyIsInByZUluaXRSb3V0ZXIiLCJpbml0TWFuYWdlciIsImluaXRBUEkiLCJpbml0VGVtcGxhdGVzIiwic2V0TWFuYWdlciIsImFwaSIsInNldEFQSSIsInByb20iLCJhZGRMaWJGcm9tVVJMIiwiaW5pdE1hbmlmZXN0IiwicmVwb3J0Iiwic2V0SW50ZXJmYWNlTWFuaWZlc3QiLCJzZXRSb290IiwicmVSb3V0ZUV4aXN0ZWQiLCJyb3V0aWVJbnB1dCIsInJvdXRlQmxvY2siLCJwYXRocyIsImNvbnRyb2xsZXIiLCJiaW5kQ29udHJvbGxlciIsImFkZExpc3QiLCJsaXN0ZW4iLCJ1cGRhdGUiLCJ1cGRhdGVJbnRlcmZhY2VzIiwiaW5pdENvbnRyb2xsZXIiLCJhbGxSZXNvdXJjZXNSZWFkeSIsInN0YXJ0QXBwIiwiaW5pdFJvdXRlciIsImNvbnRyb2xsZXJOYW1lIiwiYXBwIiwiY3RybCIsImNsZWFySW50ZXJmYWNlcyIsIm1hbmlmZXN0cyIsInJlY29yZE1hbmlmZXN0IiwicmVjb3JkRGF0YSIsIm9uUmVzb3VyY2VSZWFkeSIsIk1FVEFfUFJPQ0VTU09SUyIsIm5vdFRlbXBsYXRlUHJvY2Vzc29ycyIsInNldFByb2Nlc3NvciIsImdldFByb2Nlc3NvciIsIk1FVEFfQ09NUE9ORU5UUyIsIm5vdFJlbmRlcmVyIiwicmVuZGVyIiwiY29tcG9uZW50IiwiaW5pdERhdGEiLCJpbml0T3B0aW9ucyIsImluaXRXb3JraW5nIiwidGVtcGxhdGUiLCJpbml0VGVtcGxhdGUiLCJvbkNoYW5nZSIsIk1hdGgiLCJyYW5kb20iLCJnZXRCcmVhZENydW1wcyIsImNsZWFyU3Rhc2giLCJzZXRXb3JraW5nTWFwcGluZyIsImV4ZWNQcm9jZXNzb3JzIiwic2VhcmNoRm9yU3ViVGVtcGxhdGVzIiwic3Rhc2hSZW5kZXJlZCIsImlmUGFydCIsImNvbXBvbmVudFBhdGgiLCJjaGFuZ2VkUGF0aCIsImlmRnVsbFN1YlBhdGgiLCJjcmVhdGVNYXBwaW5nIiwiZmluZEFsbFByb2Nlc3NvcnMiLCJwcm9jcyIsImVscyIsImdldEF0dHJpYnV0ZXNTdGFydHNXaXRoIiwiZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCIsInByb2NEYXRhIiwicGFyc2VQcm9jZXNzb3JFeHByZXNzaW9uIiwicHJvY2Vzc29yRXhwcmVzc2lvbiIsImF0dHJpYnV0ZUV4cHJlc3Npb24iLCJpZkNvbmRpdGlvbiIsInBhcmFtcyIsInByb2Nlc3Nvck5hbWUiLCJtYXBwaW5nIiwicHJvY1Njb3BlIiwiYXR0cmlidXRlUmVzdWx0IiwiZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdCIsInByb2NOYW1lIiwicHJvYyIsInJlbW92ZUF0dHJpYnV0ZSIsImRlc3Ryb3lTdWJzIiwiZGVzdHJveSIsImNsZWFyU3ViVGVtcGxhdGVzIiwiZ2V0U3Rhc2giLCJyZW1vdmVDaGlsZCIsIm50RWwiLCJudFJlbmRlcmVkIiwic3VicyIsIm50IiwiaWZTdWJFbGVtZW50UmVuZGVyZWQiLCJyZW5kZXJTdWIiLCJkZXRhaWxzIiwiZGF0YVBhdGgiLCJub3RDb21wb25lbnQiLCJjaGlsZE5vZGVzIiwiYWRkVG9TdGFzaCIsInN0YXNoIiwibmV3U3Rhc2giLCJhbmNob3IiLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsIm5vZGUiLCJwbGFjZSIsInRhcmdldEVsIiwibCIsImNoaWxkcmVuIiwidGV4dENvbnRlbnQiLCJyZW5kZXJlZCIsInBsYWNlQWZ0ZXIiLCJwbGFjZUJlZm9yZSIsInBsYWNlRmlyc3QiLCJwbGFjZUxhc3QiLCJub3RQbGFjZXJzIiwiTUVUQV9QQVJUUyIsInJlc2V0UGFydHMiLCJwcmVwYXJlVGVtcGxhdGVFbGVtZW50IiwiaW5pdE1hcmtFbGVtZW50IiwibWFya0VsIiwicGxhY2VyIiwiZ2V0UGxhY2VyIiwidGFyZ2V0UXVlcnkiLCJtYWluIiwidW5zZXRSZWFkeSIsImh0bWwiLCJzZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImFkZEZyb21VUkwiLCJnZXRQcm90b1RlbXBsYXRlRWxlbWVudCIsImNsZWFyUGFydHMiLCJkZWFkIiwib2ZmQWxsIiwiZm9yRWFjaERhdGEiLCJyZW5kZXJQYXJ0IiwicGxhY2VSZW5kZXJlZCIsInJlbW92ZU9ic29sZXRlUGFydHMiLCJiZWZvcmUiLCJwbGFjZVBhcnQiLCJhZnRlciIsInBhcnQiLCJnZXRQYXJ0QnlEYXRhIiwibm9kZXMiLCJsYXN0Tm9kZSIsIm5vZGVUeXBlIiwiZ2V0UGFydHMiLCJyZW5kZXJlciIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUiLCJhZGRQYXJ0IiwidXBkYXRlUGFydCIsInBpcGUiLCJmaW5kQWN0dWFsUGFydHMiLCJyZW1vdmVOb3RBY3R1YWxQYXJ0cyIsImFjdHVhbFBhcnRzIiwiaXNEYXRhIiwiT1BUX0RFRkFVTFRfQ09OVEFJTkVSX1NFTEVDVE9SIiwiT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCIsIk9QVF9ERUZBVUxUX1ZJRVdfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCIsIk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FIiwiT1BUX0RFRkFVTFRfU0lOR0xFX05BTUUiLCJPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSIsIk9QVF9ERUZBVUxUX1JFTkRFUl9BTkQiLCJub3RDb250cm9sbGVyIiwiaW5pdFJlbmRlciIsImludGVyZmFjZXMiLCJnZXRJbnRlcmZhY2VzIiwibWFrZSIsInZpZXdOYW1lIiwidmlldyIsImdldFZpZXciLCJ0ZW1wbGF0ZVVSTCIsInByZWZpeCIsImNvbW1vbiIsImdldE1vZHVsZVByZWZpeCIsInBvc3RmaXgiLCJ0ZW1wbGF0ZU5hbWUiLCJyZW5kZXJBbmQiLCJ2aWV3cyIsImdldE1vZHVsZU5hbWUiLCIkbGlzdEFsbCIsImVyciIsImZpZWxkRmlsZXMiLCJzYXZlZEZpbGUiLCJoYXNoIiwiT1BUX0RFRkFVTFRfRk9STV9QUkVGSVgiLCJPUFRfREVGQVVMVF9ST0xFX05BTUUiLCJPUFRfREVGQVVMVF9GT1JNX1RJVExFIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiIsIk9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUIiwibm90Rm9ybSIsIm9uU3VibWl0Iiwib25SZXNldCIsIm9uQ2FuY2VsIiwiZ2V0TWFuaWZlc3QiLCJyb2xlIiwicmVuZGVyV3JhcHBlciIsImZvcm1QYXJ0IiwiZ2V0V3JhcHBlckRhdGEiLCJnZXRQYXJ0VGVtcGxhdGVOYW1lIiwiYmluZEZvcm1FdmVudHMiLCJyZW5kZXJDb21wb25lbnRzIiwid3JhcHBlciIsInRpdGxlIiwiZ2V0Rm9ybUZpZWxkc0xpc3QiLCJhZGRGaWVsZENvbXBvbmVudCIsImNvbXBzIiwiZ2V0QXBwIiwiZGVmIiwiZmllbGRzTGlicyIsImdldEZpZWxkc0xpYnMiLCJmaWVsZFR5cGUiLCJnZXRGaWVsZHNEZWZpbml0aW9uIiwicmVjIiwibGFiZWwiLCJwbGFjZWhvbGRlciIsImRlZmF1bHQiLCJmaWVsZCIsImdldEZvcm1UYXJnZXRFbGVtZW50IiwiY29sbGVjdERhdGFGcm9tQ29tcG9uZW50cyIsImZvcm0iLCJPUFRfREVGQVVMVF9WSUVXIiwiT1BUX0RFRkFVTFRfQUNUSU9OIiwiQ1JVRENyZWF0ZSIsInBhcmVudCIsInNldFZpZXdzIiwicHJlbG9hZExpYiIsImxvYWRJdGVtIiwicmVuZGVyRm9ybSIsIm9uQWZ0ZXJSZW5kZXIiLCJpbml0SXRlbSIsImZpbGVzIiwiZGF0YVRyYW5zZmVyIiwicXVlZVVwbG9hZCIsIm5ld0l0ZW0iLCJleGVjVXBsb2FkcyIsImNyZWF0ZSIsImdvVG9UYWJsZSIsImJhY2tUb0xpc3QiLCJPUFRfREVGQVVMVF9QQUdFX1NJWkUiLCJPUFRfREVGQVVMVF9QQUdFX05VTUJFUiIsIk9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OIiwiT1BUX0RFRkFVTFRfU09SVF9GSUVMRCIsIk9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DIiwibm90VGFibGUiLCJyb3dzIiwicmVzZXRTb3J0ZXIiLCJyZW5kZXJJbnNpZGUiLCJyZW5kZXJIZWFkZXIiLCJ1cGRhdGVEYXRhIiwicmVuZGVyQm9keSIsImJpbmRTZWFyY2giLCJiaW5kQ3VzdG9tQmluZGluZ3MiLCJ0YWJsZUhlYWRlciIsIm5ld1RoIiwic29ydGFibGUiLCJhdHRhY2hTb3J0aW5nSGFuZGxlcnMiLCJoZWFkQ2VsbCIsImNoYW5nZVNvcnRpbmdPcHRpb25zIiwic3R5bGUiLCJjdXJzb3IiLCJzb3J0QnlGaWVsZCIsInNvcnREaXJlY3Rpb24iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJpbnZhbGlkYXRlRGF0YSIsImZpbHRlclNlYXJjaCIsImlzTmFOIiwiaWZVcGRhdGluZyIsInF1ZXJ5Iiwic2V0VXBkYXRpbmciLCIkbGlzdCIsInByb2NjZXNzRGF0YSIsInJlZnJlc2hCb2R5Iiwic2V0VXBkYXRlZCIsInRoYXRGaWx0ZXIiLCJ0ZXN0RGF0YUl0ZW0iLCJ0aGF0U29ydGVyIiwic29ydCIsIml0ZW0xIiwiaXRlbTIiLCJ0MSIsInQyIiwibG9jYWxlQ29tcGFyZSIsInNlYXJjaEVsIiwib25FdmVudCIsImN1cnJlbnRUYXJnZXQiLCJzZWxlY3RvciIsImdldE9wdGlvbiIsIm5ld1JvdyIsIm5ld1RkIiwicHJlcHJvY2Vzc2VkIiwiaXRlbUlkIiwidGJvZHkiLCJmaW5kQm9keSIsImNsZWFyQm9keSIsImNoZWNrRmlsdGVyZWQiLCJ0aGlzUGFnZVN0YXJ0cyIsIm5leHRQYWdlRW5kcyIsIm1pbiIsInJlbmRlclJvdyIsInRhYmxlQm9keSIsInN0clZhbHVlIiwiZ2V0RmlsdGVyU2VhcmNoIiwidG9Db21wIiwiT1BfREVGQVVMVF9QQUdFX1NJWkUiLCJDUlVETGlzdCIsInVwZGF0ZURhdGF0YWJsZSIsInRhYmxlVmlldyIsImxvYWROZXh0IiwiT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04iLCJDUlVEVXBkYXRlIiwicnVuTGlzdCIsIkNSVUREZWxldGUiLCJjb25maXJtIiwiZGVsZXRlIiwiYWN0aW9uIiwiT1BUX0RFRkFVTFRfREVUQUlMU19QUkVGSVgiLCJPUFRfREVGQVVMVF9ERVRBSUxTX1RJVExFIiwibm90RGV0YWlscyIsImdldEZpZWxkc0xpc3QiLCJjYXN0Q3VzdG9tIiwiY2FzdENvbW1vbiIsIkN1c3RvbUNvbXBvbmVudCIsImdldFRhcmdldEVsZW1lbnQiLCJDUlVERGV0YWlscyIsInJlbmRlckRldGFpbHMiLCJfaWQiLCJfX3ZlcnNpb24iLCJDUlVEQ29udHJvbGxlciIsInJ1bkNyZWF0ZSIsInJ1bkRldGFpbHMiLCJydW5EZWxldGUiLCJydW5VcGRhdGUiLCJyb3V0ZVJ1bm5lck5hbWUiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIiLCJzY29wZSIsImJpbmRzIiwibGl2ZUV2ZW50cyIsImNoZWNrZWQiLCJzZWxlY3RlZCIsInNlbGVjdGVkT3B0aW9ucyIsInByb2Nlc3NlZFZhbHVlIiwidXNlZCIsIm9wdGlvbiIsInZhbHVlRmllbGROYW1lIiwibGFiZWxGaWVsZE5hbWUiLCJpdGVtVmFsdWVGaWVsZE5hbWUiXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWM7U0FDZixLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFjO1NBQ25CLEtBQUtDLEdBQUwsQ0FBUyxVQUFULElBQXVCRCxHQUE5QjtFQUxrQjtnQkFPSix1QkFBU0UsU0FBVCxFQUFvQkMsTUFBcEIsRUFBNEI7T0FDckMsSUFBSUMsQ0FBVCxJQUFjRixTQUFkLEVBQXlCO1FBQ25CLElBQUlHLENBQVQsSUFBY0YsTUFBZCxFQUFzQjtRQUNqQkQsVUFBVUUsQ0FBVixFQUFhRSxjQUFiLENBQTRCSCxPQUFPRSxDQUFQLENBQTVCLENBQUosRUFBNEM7U0FDdkNFLFFBQVEsSUFBSUMsS0FBSixFQUFaO1dBQ01DLFlBQU4sQ0FBbUIsYUFBbkIsRUFBa0MsV0FBbEM7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
