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
                    events: [['afterRender', resolve], [['afterSubmit', 'afterRestore'], _this3.backToList.bind(_this3)]]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybS5qcyIsIi4uL3NyYy9DUlVEL0NyZWF0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFRhYmxlLmpzIiwiLi4vc3JjL0NSVUQvTGlzdC5qcyIsIi4uL3NyYy9DUlVEL1VwZGF0ZS5qcyIsIi4uL3NyYy9DUlVEL0RlbGV0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdERldGFpbHMuanMiLCIuLi9zcmMvQ1JVRC9EZXRhaWxzLmpzIiwiLi4vc3JjL0NSVUQvQ29udHJvbGxlci5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSkge1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvciAodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IgKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwdXRGaWxlKHVwbG9hZCAvKiBvYmplY3QoZmlsZSwgb25Qcm9ncmVzcywgdXJsKSovICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRpZiAoeGhyLnVwbG9hZCkge1xuXHRcdFx0XHQvLyBwcm9ncmVzcyBiYXJcblx0XHRcdFx0aWYgKHVwbG9hZC5vblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZC5vblByb2dyZXNzLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCAvKmUqLyApIHtcblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0Ly8gc3RhcnQgdXBsb2FkXG5cdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0XHR4aHIub3BlbignUFVUJywgdXBsb2FkLnVybCwgdHJ1ZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignWF9GSUxFTkFNRScsIGVuY29kZVVSSUNvbXBvbmVudCh1cGxvYWQuZmlsZS5uYW1lKSk7XG5cdFx0XHRcdHhoci5zZW5kKHVwbG9hZC5maWxlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRwdXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQVVQnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdGRlbGV0ZUpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ0RFTEVURScsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChwYXJzZUludChzdGF0dXMpID09PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9IChlKSA9PiByZWplY3QoZSk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRTZXNzaW9uSUQ6IGZ1bmN0aW9uKG5hbWUgPSAnU2Vzc2lvbklEJykge1xuXHRcdHJldHVybiB0aGlzLmdldENvb2tpZShuYW1lKTtcblx0fSxcblx0Z2V0Q29va2llOiAobmFtZSkgPT4ge1xuXHRcdGxldCB2YWx1ZSA9ICc7ICcgKyBkb2N1bWVudC5jb29raWUsXG5cdFx0XHRwYXJ0cyA9IHZhbHVlLnNwbGl0KCc7ICcgKyBuYW1lICsgJz0nKTtcblx0XHRpZiAocGFydHMubGVuZ3RoID09IDIpIHtcblx0XHRcdHJldHVybiBwYXJ0cy5wb3AoKS5zcGxpdCgnOycpLnNoaWZ0KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTmV0d29yaztcbiIsIi8vZGlydHkgaGFjayB0byByZW1vdmUgbm8tY29uc29sZSB3YXJuaW5nIG9mIGVzbGludFxuLyogZ2xvYmFsIG5vdEZyYW1ld29yayovXG5jb25zdCBMT0cgPSAnY29uc29sZSc7XG52YXIgQ29tbW9uTG9ncyA9IHtcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHRsb2c6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmxvZyguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRpZighbm90RnJhbWV3b3JrLm5vdENvbW1vbi5nZXQoJ3Byb2R1Y3Rpb24nKSl7XG5cdFx0XHR3aW5kb3dbTE9HXS5lcnJvciguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0dHJhY2U6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cblx0bW92ZUl0ZW0oYXJyYXksIG9sZF9pbmRleCwgbmV3X2luZGV4KSB7XG5cdFx0aWYgKG5ld19pbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcblx0XHRcdHZhciBrID0gbmV3X2luZGV4IC0gYXJyYXkubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKChrLS0pICsgMSkge1xuXHRcdFx0XHRhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFycmF5LnNwbGljZShuZXdfaW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRfaW5kZXgsIDEpWzBdKTtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aChzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHVuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHRoaXMuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIG51bGwpO1xuXHR9XG5cblx0cGFyc2VQYXRoU3RlcChzdGVwLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGxldCByU3RlcCA9IG51bGw7XG5cdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUykgPT09IDAgJiYgaGVscGVyKXtcblx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfSEVMUEVSUywgJycpO1xuXHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRpZihoZWxwZXIuaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF07XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID09PSAwICYmIGl0ZW0pe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwgJycpO1xuXHRcdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fVxuXG5cdC8vOjpmaWVsZE5hbWUucmVzdWx0XG5cdC8ve31cblx0Ly97ZmllbGROYW1lOiAndGFyZ2V0UmVjb3JkRmllbGQnfVxuXHQvLy8vWyd0YXJnZXRSZWNvcmRGaWVsZCcsICdyZXN1bHQnXVxuXHRwYXJzZVBhdGgocGF0aCwgaXRlbSwgaGVscGVyKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cGF0aCA9IHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdHBhdGhbaV0gPSB0aGlzLnBhcnNlUGF0aFN0ZXAocGF0aFtpXSwgaXRlbSwgaGVscGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRub3JtaWxpemVQYXRoKHBhdGgpe1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH1lbHNle1xuXHRcdFx0d2hpbGUocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA+IC0xKXtcblx0XHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwnJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdHNtYWxsID0gW1widG9kb1wiXSxcblx0XHRiaWcgPSBbXCJ0b2RvXCIsIFwibGVuZ3RoXCJdXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0Ki9cblxuXHRpZkZ1bGxTdWJQYXRoKGJpZywgc21hbGwpe1xuXHRcdGlmIChiaWcubGVuZ3RoPHNtYWxsLmxlbmd0aCl7cmV0dXJuIGZhbHNlO31cblx0XHRmb3IobGV0IHQgPTA7IHQgPCBzbWFsbC5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZihzbWFsbFt0XSAhPT0gYmlnW3RdKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpLFxuXHRcdFx0aXNGdW5jdGlvbiA9IGF0dHJOYW1lLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKT4tMTtcblx0XHRpZiAoaXNGdW5jdGlvbil7XG5cdFx0XHRhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0fVxuXHRcdGlmICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIHR5cGVvZiBvYmplY3RbYXR0ck5hbWVdICE9PSAndW5kZWZpbmVkJyAmJiBvYmplY3RbYXR0ck5hbWVdICE9PSBudWxsKXtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uP29iamVjdFthdHRyTmFtZV0oe2l0ZW0sIGhlbHBlcnN9KTpvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChuZXdPYmosIGF0dHJQYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gbmV3T2JqO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7b2JqZWN0W2F0dHJOYW1lXSA9IHt9O31cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGpvaW4oKXtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX01FVEhPRF9JTklUID0gU3ltYm9sKCdpbml0JyksXG5cdE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0dGhpc1tNRVRBX0VWRU5UU10gPSB7fTtcblx0XHR0aGlzW01FVEFfREFUQV0gPSB7fTtcblx0XHR0aGlzW01FVEFfV09SS0lOR10gPSB7fTtcblx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSB7fTtcblx0XHR0aGlzW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdFtNRVRBX01FVEhPRF9JTklUXShpbnB1dCl7XG5cdFx0aWYgKCFpbnB1dCl7XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH1cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykpe1xuXHRcdFx0Zm9yKGxldCB0IG9mIGlucHV0LmV2ZW50cyl7XG5cdFx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSl7XG5cdFx0XHR0aGlzLnNldERhdGEoaW5wdXQuZGF0YSk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ3dvcmtpbmcnKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoaW5wdXQud29ya2luZyk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoaW5wdXQub3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiAqL1xuXHRcdFx0XHR3aGF0ID0gYXJnc1swXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiBlbGVtZW50ICovXG5cdFx0XHRcdG5vdFBhdGguc2V0KGFyZ3NbMF0gLyogcGF0aCAqLyAsIHdoYXQgLyogY29sbGVjdGlvbiAqLyAsIHVuZGVmaW5lZCAvKiBoZWxwZXJzICovICwgYXJnc1sxXSAvKiB2YWx1ZSAqLyApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Z2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggKi9cblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdH1cblx0XHRcdFx0LyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoIHdpdGggZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdGNhc2UgMjpcblx0XHRcdHtcblx0XHRcdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0XHRpZiAocmVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHQvKiBubyBkYXRhLCByZXR1cm4gZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdFx0XHRcdHJldHVybiBhcmdzWzFdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8qIGRhdGEsIHJldHVybiBpdCAqL1xuXHRcdFx0XHRcdHJldHVybiByZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8qIHJldHVybiBmdWxsIGNvbGxlY3Rpb24gKi9cblx0XHRkZWZhdWx0OlxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gd2hhdDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdENPUkUgT0JKRUNUXG5cdFx0XHREQVRBIC0gaW5mb3JtYXRpb25cblx0XHRcdE9QVElPTlMgLSBob3cgdG8gd29ya1xuXHRcdFx0V09SS0lORyAtIHRlbXBvcmFyaWx5IGdlbmVyYXRlZCBpbiBwcm9jY2Vzc1xuXHQqL1xuXG5cdHNldERhdGEoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9EQVRBXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXREYXRhKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXREYXRhKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfREFUQV0sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRPcHRpb25zKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0T3B0aW9ucygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9PUFRJT05TXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFdvcmtpbmcoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRXb3JraW5nKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0V29ya2luZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1dPUktJTkddLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Lypcblx0XHRFVkVOVFMgaGFuZGxpbmdcblx0Ki9cblxuXHRvbihldmVudE5hbWVzLCBldmVudENhbGxiYWNrcywgb25jZSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRub3RDb21tb24uZGVmaW5lSWZOb3RFeGlzdHModGhpc1tNRVRBX0VWRU5UU10sIG5hbWUsIFtdKTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnB1c2goe1xuXHRcdFx0XHRjYWxsYmFja3M6IGV2ZW50Q2FsbGJhY2tzLFxuXHRcdFx0XHRvbmNlOiBvbmNlLFxuXHRcdFx0XHRjb3VudDogMFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR0cmlnZ2VyKCkge1xuXHRcdGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLFxuXHRcdFx0ZXZlbnROYW1lID0gYXJncy5zaGlmdCgpO1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWUpKSB7XG5cdFx0XHRldmVudE5hbWUgPSBbZXZlbnROYW1lXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0VWRU5UU10uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaChldmVudCA9PiB7XG5cdFx0XHRcdFx0aWYgKGV2ZW50Lm9uY2UpIHtcblx0XHRcdFx0XHRcdHRoaXMub2ZmKG5hbWUsIGV2ZW50LmNhbGxiYWNrcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LmNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmYoZXZlbnROYW1lcyAvKiBhcnJheSBvZiBldmVudCBuYW1lcyAqLyAsIGV2ZW50Q2FsbGJhY2tzIC8qIGFycmF5IG9mIGNhbGxiYWNrcyAqLyApIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRsZXQgdGFyZ2V0SWQgPSAtMTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmZvckVhY2goKGV2ZW50LCBpKSA9PiB7XG5cdFx0XHRcdGlmIChpID09PSAtMSAmJiBldmVudENhbGxiYWNrcyA9PT0gZXZlbnQuY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0dGFyZ2V0SWQgPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmICh0YXJnZXRJZCA+IC0xKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnNwbGljZSh0YXJnZXRJZCwgMSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmZBbGwoKXtcblx0XHRsZXQgZXZlbnRzID0gT2JqZWN0LmtleXModGhpc1tNRVRBX0VWRU5UU10pO1xuXHRcdGZvcihsZXQgdCA9MDsgdDwgZXZlbnRzLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHRoaXNbTUVUQV9FVkVOVFNdLmhhc093blByb3BlcnR5KGV2ZW50c1t0XSkpe1xuXHRcdFx0XHRkZWxldGUgdGhpc1tNRVRBX0VWRU5UU11bZXZlbnRzW3RdXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5jb25zdCBPUFRfTU9ERV9ISVNUT1JZID0gU3ltYm9sKCdoaXN0b3J5JyksXG5cdE9QVF9NT0RFX0hBU0ggPSBTeW1ib2woJ2hhc2gnKSxcblx0T1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwgPSA1MDtcblxuY2xhc3Mgbm90Um91dGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJvdXRlczogW10sXG5cdFx0XHRtb2RlOiBPUFRfTU9ERV9ISVNUT1JZLFxuXHRcdFx0cm9vdDogJy8nLCAvL2Fsd2F5cyBpbiBzbGFzaGVzIC91c2VyLywgLywgL2lucHV0Ly4gYW5kIG5vIC91c2VyIG9yIGlucHV0L2xldmVsXG5cdFx0XHRpbml0aWFsaXplZDogZmFsc2Vcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpc3RvcnkoKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9ISVNUT1JZKTtcblx0fVxuXG5cdGhhc2goKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9IQVNIKTtcblx0fVxuXG5cdHNldFJvb3Qocm9vdCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb290Jywgcm9vdCA/ICcvJyArIHRoaXMuY2xlYXJTbGFzaGVzKHJvb3QpICsgJy8nIDogJy8nKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNsZWFyU2xhc2hlcyhwYXRoKSB7XG5cdFx0Ly9maXJzdCBhbmQgbGFzdCBzbGFzaGVzIHJlbW92YWxcblx0XHRyZXR1cm4gcGF0aC50b1N0cmluZygpLnJlcGxhY2UoL1xcLyQvLCAnJykucmVwbGFjZSgvXlxcLy8sICcnKTtcblx0fVxuXG5cdGFkZChyZSwgaGFuZGxlcikge1xuXHRcdGlmICh0eXBlb2YgcmUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aGFuZGxlciA9IHJlO1xuXHRcdFx0cmUgPSAnJztcblx0XHR9XG5cdFx0bGV0IHJ1bGUgPSB7XG5cdFx0XHRyZTogcmUsXG5cdFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0fTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLnB1c2gocnVsZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRMaXN0KGxpc3QpIHtcblx0XHRmb3IgKGxldCB0IGluIGxpc3QpIHtcblx0XHRcdHRoaXMuYWRkKHQsIGxpc3RbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbW92ZShwYXJhbSkge1xuXHRcdGZvciAodmFyIGkgPSAwLCByOyBpIDwgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5sZW5ndGgsIHIgPSB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldOyBpKyspIHtcblx0XHRcdGlmIChyLmhhbmRsZXIgPT09IHBhcmFtIHx8IHIucmUgPT09IHBhcmFtKSB7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRmbHVzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLydcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGlzSW5pdGlhbGl6ZWQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbml0aWFsaXplZCcpO1xuXHR9XG5cblx0c2V0SW5pdGlhbGl6ZWQodmFsID0gdHJ1ZSl7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnaW5pdGlhbGl6ZWQnLCB2YWwpO1xuXHR9XG5cblx0Z2V0RnJhZ21lbnQoKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gJyc7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnbW9kZScpID09PSBPUFRfTU9ERV9ISVNUT1JZKSB7XG5cdFx0XHRpZiAoIWxvY2F0aW9uKSByZXR1cm4gJyc7XG5cdFx0XHRmcmFnbWVudCA9IHRoaXMuY2xlYXJTbGFzaGVzKGRlY29kZVVSSShsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCkpO1xuXHRcdFx0ZnJhZ21lbnQgPSBmcmFnbWVudC5yZXBsYWNlKC9cXD8oLiopJC8sICcnKTtcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgIT0gJy8nID8gZnJhZ21lbnQucmVwbGFjZSh0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSwgJycpIDogZnJhZ21lbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICghd2luZG93KSByZXR1cm4gJyc7XG5cdFx0XHR2YXIgbWF0Y2ggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRmcmFnbWVudCA9IG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY2xlYXJTbGFzaGVzKGZyYWdtZW50KTtcblx0fVxuXG5cdGNoZWNrTG9jYXRpb24oKXtcblx0XHRsZXQgY3VycmVudCA9dGhpcy5nZXRXb3JraW5nKCdjdXJyZW50JyksXG5cdFx0XHRmcmFnbWVudCA9dGhpcy5nZXRGcmFnbWVudCgpLFxuXHRcdFx0aW5pdCA9IHRoaXMuaXNJbml0aWFsaXplZCgpO1xuXHRcdGlmIChjdXJyZW50ICE9PWZyYWdtZW50ICB8fCAhaW5pdCkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JyxmcmFnbWVudCk7XG5cdFx0XHR0aGlzLmNoZWNrKGZyYWdtZW50KTtcblx0XHRcdHRoaXMuc2V0SW5pdGlhbGl6ZWQoKTtcblx0XHR9XG5cdH1cblxuXHRocmVmQ2xpY2soKXtcblx0XHQvL2NvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRnZXRSb290KCl7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0bGlzdGVuKGxvb3BJbnRlcnZhbCA9IE9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JywgJ25vdEluaXRpYWxpemVkJyk7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmdldFdvcmtpbmcoJ2ludGVydmFsJykpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJ2YWwnLCBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrTG9jYXRpb24uYmluZCh0aGlzKSwgbG9vcEludGVydmFsKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5ocmVmQ2xpY2suYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjaGVjayhmKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gZiB8fCB0aGlzLmdldEZyYWdtZW50KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGF0aCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5yZTtcblx0XHRcdGxldCBmdWxsUkUgPSAgdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKHBhdGgpKTtcblx0XHRcdHZhciBtYXRjaCA9IGZyYWdtZW50Lm1hdGNoKGZ1bGxSRSk7XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0bWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5oYW5kbGVyLmFwcGx5KHRoaXMuaG9zdCB8fCB7fSwgbWF0Y2gpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRuYXZpZ2F0ZShwYXRoKSB7XG5cdFx0cGF0aCA9IHBhdGggPyBwYXRoIDogJyc7XG5cdFx0c3dpdGNoICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSl7XG5cdFx0XHRjYXNlIE9QVF9NT0RFX0hJU1RPUlk6IHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygncHVzaCBzdGF0ZScsIHRoaXMuZ2V0RnVsbFJvdXRlKHBhdGgpKTtcblx0XHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgT1BUX01PREVfSEFTSDoge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyguKikkLywgJycpICsgJyMnICsgcGF0aDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RnVsbFJvdXRlKHBhdGggPSAnJyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5jbGVhclNsYXNoZXMocGF0aCk7XG5cdH1cblxuXHRnZXRBbGxMaW5rcygpe1xuXHRcdHZhciBhbGxFbGVtZW50cyA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZignbi1ocmVmJykgPT09IDApIHtcblx0XHRcdFx0XHRsaXN0LnB1c2goYWxsRWxlbWVudHNbal0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0cmVSb3V0ZUV4aXN0ZWQoKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0QWxsTGlua3MoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgbGlzdC5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmluaXRSZXJvdXRpbmcobGlzdFt0XSwgbGlzdFt0XS5nZXRBdHRyaWJ1dGUoJ24taHJlZicpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVyb3V0aW5nKGVsLCBsaW5rKXtcblx0XHRpZiAoIWVsLm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdGxldCBmdWxsTGluayA9IHRoaXMuZ2V0RnVsbFJvdXRlKGxpbmspO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdocmVmJywgZnVsbExpbmspO1xuXHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9Pntcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLm5hdmlnYXRlKGxpbmspO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdGVsLm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90Um91dGVyKCk7XG4iLCJsZXQgbm90QVBJT3B0aW9ucyA9IHtcblx0cnBzOiA1MCxcblx0cHJvdG9jb2w6ICdodHRwJyxcblx0aG9zdDogJ2xvY2FsaG9zdCcsXG5cdHBvcnQ6IDkwMDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSU9wdGlvbnM7XG4iLCJjbGFzcyBub3RBUElRdWVle1xuXHRjb25zdHJ1Y3RvciAocmVxdWVzdHNQZXJTZWNvbmQpIHtcblx0XHR0aGlzLnF1ZWUgPSBbXTtcblx0XHR0aGlzLmludCA9IG51bGw7XG5cdFx0dGhpcy5yZXF1ZXN0c1BlclNlY29uZCA9IHJlcXVlc3RzUGVyU2Vjb25kIHx8IDU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW4oKXtcblx0XHR0aGlzLmludCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLmNoZWNrLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLnJlcXVlc3RzUGVyU2Vjb25kKTtcblx0fVxuXG5cdGNoZWNrKCl7XG5cdFx0aWYgKHRoaXMuaW5Qcm9ncmVzcyl7cmV0dXJuO31cblx0XHRlbHNle1xuXHRcdFx0aWYgKHRoaXMucXVlZS5sZW5ndGggPiAwKXtcblx0XHRcdFx0dGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHRvQ2FsbCA9IHRoaXMucXVlZS5zaGlmdCgpO1xuXHRcdFx0XHR0b0NhbGwoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRuZXh0KCl7XG5cdFx0dGhpcy5pblByb2dyZXNzID0gZmFsc2U7XG5cdH1cblxuXHRhZGQoY2FsbCl7XG5cdFx0dGhpcy5xdWVlLnB1c2goY2FsbCk7XG5cdH1cblxuXHRwYXVzZSgpe1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50KTtcblx0fVxuXG5cdHJlc3VtZSgpe1xuXHRcdHRoaXMucnVuKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJUXVlZTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UuanMnO1xuXG5pbXBvcnQgbm90QVBJT3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuaW1wb3J0IG5vdEFQSVF1ZWUgZnJvbSAnLi9xdWVlLmpzJztcblxuXG5jbGFzcyBub3RBUEkgZXh0ZW5kcyAgbm90QmFzZXtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdENvbW1vbi5leHRlbmQobm90QVBJT3B0aW9ucywgb3B0aW9ucykpO1xuXHRcdHRoaXMucXVlZSA9IG5ldyBub3RBUElRdWVlKHRoaXMuZ2V0T3B0aW9ucygncnBzJykpO1xuXHRcdHRoaXMucXVlZS5ydW4oKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG1ha2VVcmwocGFydHMpIHtcblx0XHRyZXR1cm4gcGFydHMuam9pbignLycpO1xuXHR9XG5cblx0cXVlZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgbWV0aG9kLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdG1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKSB7XG5cdFx0bm90Q29tbW9uLnJlcXVlc3RKU09OKG1ldGhvZCwgdXJsLCBkYXRhKVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3Bvc3QnLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXQob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdnZXQnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZWxldGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdkZWxldGUnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUEk7XG4iLCJpbXBvcnQgbm90QmFzZSAgZnJvbSAnLi4vbm90QmFzZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbWFnZSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuIiwiY29uc3QgUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYID0gJ24tJyxcblx0VEVNUExBVEVfVEFHID0gJ250Jyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SID0gJy0nLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCA9ICdpZicsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVggPSAnbm90X2NvbXBvbmVudF8nLFxuXHRQQVJUX0lEX1BSRUZJWCA9ICdub3RfcGFydF8nLFxuXHRERUZBVUxUX1BMQUNFUiA9ICdwbGFjZScsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1AgPSAncGxhY2VBZnRlcic7XG5cbmNvbnN0IE9QVFMgPSB7XG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCxcblx0VEVNUExBVEVfVEFHLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLFxuXHRERUZBVUxUX1BMQUNFUixcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCxcblx0UEFSVF9JRF9QUkVGSVgsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1Bcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9QVFM7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5jb25zdCBNRVRBX0NBQ0hFID0gU3ltYm9sKCdjYWNoZScpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZUNhY2hlIGV4dGVuZHMgbm90QmFzZXtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DQUNIRV0gPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0dGhpcy5oaWRlVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5yZWdpc3RlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlkZVRlbXBsYXRlcygpe1xuXHRcdGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHR0LmlubmVySFRNTCA9IE9QVFMuVEVNUExBVEVfVEFHICsgJ3tkaXNwbGF5OiBub25lO30nO1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodCk7XG5cdH1cblxuXHRyZWdpc3RlcigpIHtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ3RlbXBsYXRlQ2FjaGUnLCB0aGlzKTtcblx0fVxuXG5cdGxvYWQobWFwKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdGZvciAodmFyIGkgaW4gbWFwKSB7XG5cdFx0XHR0aGlzLmxvYWRPbmUoaSwgbWFwW2ldKTtcblx0XHR9XG5cdH1cblxuXHRsb2FkT25lKGtleSwgdXJsLCBjYWxsYmFjaykge1xuXHRcdHZhciBvUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdG9SZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XG5cdFx0b1JlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZU5hbWUgPSBrZXk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZVVSTCA9IHVybDtcblx0XHRcdGRpdi5pbm5lckhUTUwgPSByZXNwb25zZS5zcmNFbGVtZW50LnJlc3BvbnNlVGV4dDtcblx0XHRcdHRoaXMuc2V0T25lKGtleSwgZGl2KTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKGtleSwgdXJsLCBkaXYpO1xuXG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRvUmVxdWVzdC5zZW5kKCk7XG5cdH1cblxuXHRpZkFsbExvYWRlZCgpe1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMudHJpZ2dlcignbG9hZGVkJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0T25lKGtleSwgZWxlbWVudCkge1xuXHRcdGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7XG5cdFx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5hZGRGcm9tVGV4dChrZXksIGVsZW1lbnQpO1x0XG5cdFx0fVxuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KGtleSkpe1xuXHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vdGhhdC5zZXRMb2FkaW5nKGtleSwgdXJsKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZUlubmVySFRNTCk9Pntcblx0XHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0XHRcdH0pLmNhdGNoKCgpPT57XG5cdFx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGUnLCBrZXksIHVybCk7XG5cdFx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlc0hUTUwpPT57XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoaXMucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdFx0dGhpcy5hZGRMaWIodGVtcGxhdGVzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHRcdH0pLmNhdGNoKChlKT0+e1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZXMgbGliJywgdXJsLGUpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSA9IFsnX2lkJywgJ2lkJywgJ0lEJ10sXG5cdERFRkFVTFRfRklMVEVSID0ge30sXG5cdERFRkFVTFRfUEFHRV9OVU1CRVIgPSAxLFxuXHRERUZBVUxUX1BBR0VfU0laRSA9IDEwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbnRlcmZhY2UgZXh0ZW5kcyBub3RCYXNlIHtcblxuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCkge1xuXHRcdHN1cGVyKHt9KTtcblx0XHR0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldElEKHJlY29yZCwgYWN0aW9uRGF0YSkge1xuXHRcdGxldCByZXN1bHRJZCxcblx0XHRcdGxpc3QgPSBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZLFxuXHRcdFx0cHJlZml4ZXMgPSBbJycsIHRoaXMubWFuaWZlc3QubW9kZWxdO1xuXHRcdGlmIChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpbmRleCcpICYmIGFjdGlvbkRhdGEuaW5kZXgpIHtcblx0XHRcdGxpc3QgPSBbYWN0aW9uRGF0YS5pbmRleF0uY29uY2F0KE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkpO1xuXHRcdH1cblx0XHRmb3IgKGxldCBwcmUgb2YgcHJlZml4ZXMpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgbGlzdCkge1xuXHRcdFx0XHRpZiAocmVjb3JkLmhhc093blByb3BlcnR5KHByZSArIHQpKSB7XG5cdFx0XHRcdFx0cmVzdWx0SWQgPSByZWNvcmRbcHJlICsgdF07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdElkO1xuXHR9XG5cblx0Z2V0QWN0aW9uc0NvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSA/IE9iamVjdC5rZXlzKHRoaXMuZ2V0QWN0aW9ucygpKS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Z2V0QWN0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgPyB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgOiB7fTtcblx0fVxuXG5cdHNldEZpbmRCeShrZXksIHZhbHVlKSB7XG5cdFx0dmFyIG9iaiA9IHt9O1xuXHRcdG9ialtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIHRoaXMuc2V0RmlsdGVyKG9iaik7XG5cdH1cblxuXHRzZXRGaWx0ZXIoZmlsdGVyRGF0YSA9IERFRkFVTFRfRklMVEVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgZmlsdGVyRGF0YSk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIoe30pO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0U29ydGVyKHNvcnRlckRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHNldFBhZ2VTaXplKHBhZ2VTaXplKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSk7XG5cdH1cblxuXHRzZXRQYWdlcihwYWdlU2l6ZSA9IERFRkFVTFRfUEFHRV9TSVpFLCBwYWdlTnVtYmVyID0gREVGQVVMVF9QQUdFX05VTUJFUikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0UGFnZXIoKTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRXb3JraW5nKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRXb3JraW5nKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdGNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlcXVlc3REYXRhID0ge307XG5cdFx0aWYgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdkYXRhJykpICYmIEFycmF5LmlzQXJyYXkoYWN0aW9uRGF0YS5kYXRhKSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpb25EYXRhLmRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGRhdGFQcm92aWRlck5hbWUgPSAnZ2V0JyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoYWN0aW9uRGF0YS5kYXRhW2ldKTtcblx0XHRcdFx0aWYgKHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gJiYgdHlwZW9mIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRyZXF1ZXN0RGF0YSA9IG5vdENvbW1vbi5leHRlbmQocmVxdWVzdERhdGEsIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0oKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVlc3REYXRhO1xuXHR9XG5cblx0ZW5jb2RlUmVxdWVzdChkYXRhKXtcblx0XHRsZXQgcCA9ICc/Jztcblx0XHRmb3IobGV0IHQgaW4gZGF0YSl7XG5cdFx0XHRwICs9IGVuY29kZVVSSUNvbXBvbmVudCh0KSsnPScrZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFbdF0pKycmJztcblx0XHR9XG5cdFx0cmV0dXJuIHA7XG5cdH1cblxuXHQvL3JldHVybiBQcm9taXNlXG5cdHJlcXVlc3QocmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zID0gdGhpcy5jb2xsZWN0UmVxdWVzdERhdGEoYWN0aW9uRGF0YSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zRW5jb2RlZCA9IHRoaXMuZW5jb2RlUmVxdWVzdChyZXF1ZXN0UGFyYW1zKSxcblx0XHRcdGlkID0gdGhpcy5nZXRJRChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpLFxuXHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwgKyByZXF1ZXN0UGFyYW1zRW5jb2RlZCwgaWQsIEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpKVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0YWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKSB7XG5cdFx0aWYgKHRoaXMgJiYgYWN0aW9uRGF0YSAmJiBhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpc0FycmF5JykgJiYgYWN0aW9uRGF0YS5pc0FycmF5KSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZGF0YVt0XSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YVt0XSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSBuZXcgbm90UmVjb3JkKHRoaXMubWFuaWZlc3QsIGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnO1xuXG5jb25zdCBNRVRBX0lOVEVSRkFDRSA9IFN5bWJvbCgnaW50ZXJmYWNlJyksXG5cdE1FVEFfUFJPWFkgPSBTeW1ib2woJ3Byb3h5JyksXG5cdE1FVEFfQ0hBTkdFID0gU3ltYm9sKCdjaGFuZ2UnKSxcblx0TUVUQV9DSEFOR0VfTkVTVEVEID0gU3ltYm9sKCdjaGFuZ2UubmVzdGVkJyksXG5cdE1FVEFfU0FMID0gW1xuXHRcdCdnZXRBdHRyJyxcblx0XHQnZ2V0QXR0cnMnLFxuXHRcdCdpc1Byb3BlcnR5Jyxcblx0XHQnaXNSZWNvcmQnLFxuXHRcdCdnZXRNYW5pZmVzdCcsXG5cdFx0J3NldEF0dHInLFxuXHRcdCdzZXRBdHRycycsXG5cdFx0J2dldERhdGEnLFxuXHRcdCdzZXREYXRhJyxcblx0XHQnZ2V0SlNPTicsXG5cdFx0J29uJyxcblx0XHQnb2ZmJyxcblx0XHQndHJpZ2dlcidcblx0XSxcblx0TUVUQV9NQVBfVE9fSU5URVJGQUNFID0gW1xuXHRcdCdnZXRBY3Rpb25zQ291bnQnLFxuXHRcdCdnZXRBY3Rpb25zJyxcblx0XHQnc2V0RmluZEJ5Jyxcblx0XHQncmVzZXRGaWx0ZXInLFxuXHRcdCdzZXRGaWx0ZXInLFxuXHRcdCdnZXRGaWx0ZXInLFxuXHRcdCdzZXRTb3J0ZXInLFxuXHRcdCdnZXRTb3J0ZXInLFxuXHRcdCdyZXNldFNvcnRlcicsXG5cdFx0J3NldFBhZ2VOdW1iZXInLFxuXHRcdCdzZXRQYWdlU2l6ZScsXG5cdFx0J3NldFBhZ2VyJyxcblx0XHQncmVzZXRQYWdlcicsXG5cdFx0J2dldFBhZ2VyJ1xuXHRdLFxuXHRERUZBVUxUX0FDVElPTl9QUkVGSVggPSAnJCcsXG5cdE1FVEFfUkVUVVJOX1RPX1JPT1QgPSBTeW1ib2woJ3JldHVyblRvUm9vdCcpO1xuXG52YXIgY3JlYXRlUHJvcGVydHlIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdHlwZW9mIHRhcmdldFtrZXldKTtcblxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UHJvcGVydHkgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoZ2V0Um9vdCwgcGF0aFRvLCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1Byb3h5IHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5zZXREYXRhKGl0ZW0pO1xuXHRcdHRoaXMuaXNQcm9wZXJ0eSA9IHRydWU7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX1JFVFVSTl9UT19ST09UXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdFtNRVRBX1JFVFVSTl9UT19ST09UXShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdGxldCByb290ID0gdGhpcy5nZXRPcHRpb25zKCdnZXRSb290JykoKTtcblx0XHRyb290LnRyaWdnZXIoJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfUFJPWFldLCB0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5LCB2YWx1ZSk7XG5cdH1cbn1cblxuXG52YXIgY3JlYXRlUmVjb3JkSGFuZGxlcnMgPSBmdW5jdGlvbihvd25lcikge1xuXHRyZXR1cm4ge1xuXHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIGNvbnRleHQpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgZ2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQsIGNvbnRleHQpO1xuXHRcdFx0aWYgKGtleSA9PT0gJ2lzUHJveHknIHx8IGtleSA9PT0gJ2lzUmVjb3JkJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX01BUF9UT19JTlRFUkZBQ0UuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHJlY29yZCBwcm94eSBzZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCk7XG5cdFx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UmVjb3JkIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG1hbmlmZXN0LCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUHJveHkpIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcigndGhpcyBpcyBQcm94eSBpdGVtJyk7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1JlY29yZCB8fCBpdGVtLmlzUHJvcGVydHkpKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7fSk7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0gPSBuZXcgbm90UmVjb3JkSW50ZXJmYWNlKG1hbmlmZXN0KTtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpcy5pbnRlcmZhY2VVcCgpO1xuXHRcdHRoaXMuaXNSZWNvcmQgPSB0cnVlO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgcmVjb3JkIGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0aW5pdFByb3BlcnRpZXMoaXRlbSwgcGF0aCA9ICcnKSB7XG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtICE9PSBudWxsKSB7XG5cdFx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKGl0ZW0pO1xuXHRcdFx0Zm9yIChsZXQga2V5IG9mIGtleXMpIHtcblx0XHRcdFx0bGV0IGN1clBhdGggPSBwYXRoICsgKHBhdGgubGVuZ3RoID4gMCA/ICcuJyA6ICcnKSArIGtleTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjdXJQYXRoJywgY3VyUGF0aCk7XG5cdFx0XHRcdGlmIChpdGVtLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW1ba2V5XSA9PT0gJ29iamVjdCcgJiYgaXRlbVtrZXldICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXG5cdGFjdGlvblVwKGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLmhhc093blByb3BlcnR5KFtERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0pKSB7XG5cdFx0XHR0aGlzW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSA9ICgpID0+IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlcXVlc3QodGhpcywgaW5kZXgpO1x0XHRcdFxuXHRcdH1cblx0fVxuXHQvKlxuXHQtPiAncGF0aC50by5rZXknLCB2YWx1ZU9mS2V5XG5cdDwtIG9rLCB3aXRoIG9uZSBvbkNoYW5nZSBldmVudCB0cmlnZ2VyZWRcblx0Ki9cblxuXHRzZXRBdHRyKGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gbm90UGF0aC5zZXQoa2V5LCB0aGlzW01FVEFfUFJPWFldLCB7fSwgdmFsdWUpO1xuXHR9XG5cblx0Lypcblx0LT5cblx0e1xuXHRcdCdrZXlQYXRoJzogdmFsdWUsXG5cdFx0J2tleS5zdWJQYXRoJzogdmFsdWUyLFxuXHRcdCdrZXlQYXRoLjAudGl0bGUnOiB2YWx1ZTNcblx0fVxuXHQ8LSBvaywgd2l0aCBidW5jaCBvZiBvbkNoYW5nZSBldmVudHMgdHJpZ2dlcmVkXG5cdCovXG5cdHNldEF0dHJzKG9iamVjdFBhcnQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzJywgb2JqZWN0UGFydCwgT2JqZWN0LmtleXMob2JqZWN0UGFydCkpO1xuXHRcdGlmIChvYmplY3RQYXJ0ICYmICh0eXBlb2Ygb2JqZWN0UGFydCA9PT0gJ29iamVjdCcpICYmIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpLmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggaW4gb2JqZWN0UGFydCkge1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzIG9uZSB0byBnbycsIHBhdGgpO1xuXHRcdFx0XHR0aGlzLnNldEF0dHIocGF0aCwgb2JqZWN0UGFydFtwYXRoXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0LT4gJ3BhdGhUb0tleSdcblx0PC0gdmFsdWUxXG5cblx0Ki9cblx0Z2V0QXR0cih3aGF0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdnZXRBdHRyJywgd2hhdCk7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHdoYXQsIHRoaXNbTUVUQV9QUk9YWV0sIHt9KTtcblx0fVxuXG5cdC8qXG5cdC0+IFsncGF0aFRvS2V5JywgJ3BhdGgudG8ua2V5JywgJ3NpbXBsZUtleScsLi4uXVxuXHQ8LSBbdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMywuLi5dXG5cdCovXG5cdGdldEF0dHJzKHdoYXQpIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0aWYgKHdoYXQgJiYgd2hhdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIG9mIHdoYXQpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5nZXRBdHRyKHBhdGgpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXSkge1xuXHRcdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLm1hbmlmZXN0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRzZXRGaW5kQnkoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmluZEJ5KC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFNvcnRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0U29ydGVyKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRQYWdlTnVtYmVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VOdW1iZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VTaXplKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VTaXplKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGdldE1vZGVsTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0TW9kZWxOYW1lKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4vbm90Um91dGVyJztcbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuXG5jb25zdCBPUFRfQ09OVFJPTExFUl9QUkVGSVggPSAnbmMnLFxuXHRPUFRfUkVDT1JEX1BSRUZJWCA9ICducic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEFwcCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoe29wdGlvbnN9KTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBhcHAnKTtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ2FwcCcsIHRoaXMpO1xuXHRcdHRoaXMucmVzb3VyY2VzID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGludGVyZmFjZXM6IHt9LFxuXHRcdFx0Y29udHJvbGxlcnM6IHt9LFxuXHRcdFx0aW5pdENvbnRyb2xsZXI6IG51bGwsXG5cdFx0XHRjdXJyZW50Q29udHJvbGxlcjogbnVsbFxuXHRcdH0pO1xuXHRcdHRoaXMucHJlSW5pdFJvdXRlcigpO1xuXHRcdHRoaXMuaW5pdE1hbmFnZXIoKTtcblx0XHR0aGlzLmluaXRBUEkoKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZXMoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRNYW5hZ2VyKCl7XG5cdFx0bm90Q29tbW9uLnNldE1hbmFnZXIoXG5cdFx0XHR7XG5cdFx0XHRcdHNldEFQSSh2KXsgdGhpcy5hcGkgPSB2O30sXG5cdFx0XHRcdGdldEFQSSgpe3JldHVybiB0aGlzLmFwaTt9LFxuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHRpbml0QVBJKCl7XG5cdFx0bm90Q29tbW9uLmdldE1hbmFnZXIoKS5zZXRBUEkobmV3IG5vdEFQSSh7fSkpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlcygpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpKXtcblx0XHRcdGxldCBwcm9tID0gbnVsbDtcblx0XHRcdGZvcihsZXQgdCBpbiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpKXtcblx0XHRcdFx0aWYgKHQgJiYgdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKS5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdFx0bGV0IHVybCA9IHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJylbdF07XG5cdFx0XHRcdFx0aWYocHJvbSl7XG5cdFx0XHRcdFx0XHRwcm9tLnRoZW4obm90VGVtcGxhdGVDYWNoZS5hZGRMaWJGcm9tVVJMLmJpbmQobm90VGVtcGxhdGVDYWNoZSwgdXJsKSk7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRwcm9tID0gbm90VGVtcGxhdGVDYWNoZS5hZGRMaWJGcm9tVVJMKHVybCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAocHJvbSl7XG5cdFx0XHRcdHByb20udGhlbih0aGlzLmluaXRNYW5pZmVzdC5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdC5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRcdFx0bm90Q29tbW9uLnJlcG9ydCgnbm8gdGVtcGxhdGVzIGxpYicsIGUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuaW5pdE1hbmlmZXN0KCk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRNYW5pZmVzdCgpIHtcblx0XHR2YXIgdXJsID0gdGhpcy5nZXRPcHRpb25zKCdtYW5pZmVzdFVSTCcpO1xuXHRcdG5vdENvbW1vbi5nZXRKU09OKHVybCwge30pXG5cdFx0XHQudGhlbih0aGlzLnNldEludGVyZmFjZU1hbmlmZXN0LmJpbmQodGhpcykpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdHByZUluaXRSb3V0ZXIoKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JvdXRlcicsIG5vdFJvdXRlcik7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXInKS5zZXRSb290KHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLnJvb3QnKSk7XG5cdFx0bm90Um91dGVyLnJlUm91dGVFeGlzdGVkKCk7XG5cdH1cblxuXHRpbml0Um91dGVyKCl7XG5cdFx0dmFyIHJvdXRpZUlucHV0ID0ge307XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLm1hbmlmZXN0JykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IHJvdXRlQmxvY2sgPSB0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5tYW5pZmVzdCcpW3RdLFxuXHRcdFx0XHRwYXRocyA9IHJvdXRlQmxvY2sucGF0aHMsXG5cdFx0XHRcdGNvbnRyb2xsZXIgPSByb3V0ZUJsb2NrLmNvbnRyb2xsZXI7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRyb3V0aWVJbnB1dFtwYXRoc1tpXV0gPSB0aGlzLmJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcicpLmFkZExpc3Qocm91dGllSW5wdXQpLmxpc3RlbigpOy8vLm5hdmlnYXRlKHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLmluZGV4JykpO1xuXHR9XG5cblx0c2V0SW50ZXJmYWNlTWFuaWZlc3QobWFuaWZlc3QpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JywgbWFuaWZlc3QpO1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdC8v0L3Rg9C20L3QviDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0YLRjFxuXHRcdC8v0LzQvtC00LXQu9C4INC/0L7Qu9GD0YfQtdC90L3Ri9C80Lgg0LjQvdGC0LXRgNGE0LXQudGB0LDQvNC4XG5cdFx0dGhpcy51cGRhdGVJbnRlcmZhY2VzKCk7XG5cdFx0Ly/QuNC90LjRhtC40LvQuNGG0LjRgNC+0LLQsNGC0Ywg0Lgg0LfQsNC/0YPRgdGC0LjRgtGMINC60L7QvdGC0YDQvtC70LvQtdGAINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG5cdFx0dGhpcy5pbml0Q29udHJvbGxlcigpO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRzdGFydEFwcCgpIHtcblx0XHQvL9GB0L7Qt9C00LDRgtGMINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHQvL9GA0L7Rg9GC0LXRgCDQuCDQv9GA0LjQstGP0LfQsNGC0Ywg0Log0L3QtdC80YMg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdHRoaXMuaW5pdFJvdXRlcigpO1xuXHR9XG5cblx0YmluZENvbnRyb2xsZXIoY29udHJvbGxlck5hbWUpIHtcblx0XHRsZXQgYXBwID0gdGhpcztcblx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdG5ldyBjb250cm9sbGVyTmFtZShhcHAsIGFyZ3VtZW50cyk7XG5cdFx0fTtcblx0fVxuXG5cdGluaXRDb250cm9sbGVyKCkge1xuXHRcdGlmICh0eXBlb2YodGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGxldCBpbml0Q29udHJvbGxlciA9IHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnaW5pdENvbnRyb2xsZXInLCBuZXcgaW5pdENvbnRyb2xsZXIodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGdldEN1cnJlbnRDb250cm9sbGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJyk7XG5cdH1cblxuXHRzZXRDdXJyZW50Q29udHJvbGxlcihjdHJsKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicsIGN0cmwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dXBkYXRlSW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLmNsZWFySW50ZXJmYWNlcygpO1xuXHRcdGxldCBtYW5pZmVzdHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0Jyk7XG5cdFx0aWYgKG1hbmlmZXN0cykge1xuXHRcdFx0Zm9yKGxldCBuYW1lIGluIG1hbmlmZXN0cyl7XG5cdFx0XHRcdGxldCByZWNvcmRNYW5pZmVzdCA9IG1hbmlmZXN0c1tuYW1lXTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbbmFtZV0gPSAocmVjb3JkRGF0YSkgPT4gbmV3IG5vdFJlY29yZChyZWNvcmRNYW5pZmVzdCwgcmVjb3JkRGF0YSk7XG5cdFx0XHRcdHdpbmRvd1snbnInICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKV0gPSB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRSZWNvcmROYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX1JFQ09SRF9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0Z2V0Q29udHJvbGxlck5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfQ09OVFJPTExFUl9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlcygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJyk7XG5cdH1cblxuXHRjbGVhckludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcmZhY2VzJywge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0d2FpdFRoaXNSZXNvdXJjZSh0eXBlLCBpbmRleCkge1xuXHRcdGlmICghdGhpcy5yZXNvdXJjZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcblx0XHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdID0ge307XG5cdFx0fVxuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IGZhbHNlO1xuXHRcdHJldHVybiB0aGlzLm9uUmVzb3VyY2VSZWFkeS5iaW5kKHRoaXMsIHR5cGUsIGluZGV4KTtcblx0fVxuXG5cdG9uUmVzb3VyY2VSZWFkeSh0eXBlLCBpbmRleCkge1xuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IHRydWU7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdGFsbFJlc291cmNlc1JlYWR5KCkge1xuXHRcdHZhciBpLCBqO1xuXHRcdGZvciAoaSBpbiB0aGlzLnJlc291cmNlcykge1xuXHRcdFx0Zm9yIChqIGluIHRoaXMucmVzb3VyY2VzW2ldKSB7XG5cdFx0XHRcdGlmICghdGhpcy5yZXNvdXJjZXNbaV1bal0pIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5cbmNvbnN0IE1FVEFfUFJPQ0VTU09SUyA9IFN5bWJvbCgncHJvY2Vzc29ycycpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQcm9jZXNzb3IoLyoga2V5LCB2YWx1ZSAqLyl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UHJvY2Vzc29yKC8qIGtleSwgIGRlZmF1bHRWYWx1ZSAqLyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyUHJvY2Vzc29ycygpe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkKCl7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuXHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gYXJndW1lbnRzWzBdKXtcblx0XHRcdFx0XHR0aGlzLnNldFByb2Nlc3Nvcih0LCBhcmd1bWVudHNbMF1bdF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0UHJvY2Vzc29yKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhcigpe1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVQcm9jZXNzb3JzKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7XG5cbi8qXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgiBET00g0L/QvtC00LTQtdGA0LXQstC+INCyINC60LDRh9C10YHRgtCy0LUg0YjQsNCx0LvQvtC90LAuXG4gKiDQl9Cw0L/QvtC70L3Rj9C10YIg0LXQs9C+INC00LDQvdC90YvQvNC4LlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YHQs9C10L3QtdGA0LjRgNC+0LLQsNC90L3Ri9C1INGN0LvQtdC80LXQvdGC0YtcbiAqXG4gKiAqL1xuXG4vKlxuXG5cdDxkaXYgbi10ZW1wbGF0ZS1uYW1lPVwidmFzeWFcIj5cblx0XHQ8cD48aW5wdXQgdHlwZT1cInRleHRcIiBuLXZhbHVlPVwiOmNvb2xOYW1lXCIvPjwvcD5cblx0XHQ8cD7QkdC+0YDQuNGBINGF0YDQtdC9INC/0L7Qv9Cw0LTQtdGI0Ywg0Lgge3s6Y29vbE5hbWV9fS48L3A+XG5cdDwvZGl2PlxuXG4gKi9cblxuY29uc3QgTUVUQV9DT01QT05FTlRTID0gU3ltYm9sKCdjb21wb25lbnRzJyk7XG5cbmNsYXNzIG5vdFJlbmRlcmVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdC8qXG5cdFx0aW5wdXQgPSB7XG5cdFx0XHRkYXRhOiBub3RSZWNvcmQsXG5cdFx0XHR0ZW1wbGF0ZTogZWxlbWVudFxuXHRcdFx0b3B0aW9uczp7XG5cdFx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHQqL1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU10gPSB7fTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMuY29tcG9uZW50ID0gaW5wdXQuY29tcG9uZW50O1xuXHRcdHRoaXMuaW5pdERhdGEoaW5wdXQuZGF0YSA/IGlucHV0LmRhdGEgOiB7fSk7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0LnRlbXBsYXRlKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZSgpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndGVtcGxhdGUnLCB0aGlzLmdldFdvcmtpbmcoJ2dldFRlbXBsYXRlJykoKSk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuZ2V0RGF0YSgpLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHR9XG5cblx0aW5pdFdvcmtpbmcodGVtcGxhdGUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0Z2V0VGVtcGxhdGU6IHRlbXBsYXRlLFxuXHRcdFx0cGFydElkOiB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpID8gdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA6IE9QVFMuUEFSVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKSB7XG5cdFx0aWYgKHRoaXMuY29tcG9uZW50KSB7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMuY29tcG9uZW50LmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH1cblx0fVxuXG5cdG9uQ2hhbmdlKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0Lypub3RDb21tb24ubG9nKHRoaXMpO1xuXHRcdG5vdENvbW1vbi5sb2codGhpcy5nZXRCcmVhZENydW1wcygpLmpvaW4oJyA+ICcpKTtcblx0XHRub3RDb21tb24ubG9nKCd1cGRhdGluZyByZW5kZXJlciAnLCB0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpLCAnIGFmdGVyIGNoYW5nZXMnLCBrZXksIHZhbHVlKTsqL1xuXHRcdHRoaXMudXBkYXRlKGtleSk7XG5cdFx0dGhpcy50cmlnZ2VyKCdvYnNvbGV0ZScscHJveHksIGtleSwgdmFsdWUpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2xlYXJTdGFzaCgpO1xuXHRcdHRoaXMuc2V0V29ya2luZ01hcHBpbmcoKTtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHR0aGlzLnNlYXJjaEZvclN1YlRlbXBsYXRlcygpO1xuXHRcdHRoaXMuc3Rhc2hSZW5kZXJlZCgpO1xuXHR9XG5cblx0dXBkYXRlKGtleSkge1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdGZvciAobGV0IHQgaW4gdGhpc1tNRVRBX0NPTVBPTkVOVFNdKSB7XG5cdFx0XHRsZXQgaXRlbSA9IHRoaXNbTUVUQV9DT01QT05FTlRTXVt0XSxcblx0XHRcdFx0aWZQYXJ0ID0gdHJ1ZTtcblx0XHRcdGlmIChrZXkpe1xuXHRcdFx0XHRpZiAoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpPT09bnVsbCl7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0XHRjb21wb25lbnRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGl0ZW0uZ2V0T3B0aW9ucygnZGF0YVBhdGgnKSksXG5cdFx0XHRcdFx0Y2hhbmdlZFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoa2V5KTtcblx0XHRcdFx0aWZQYXJ0ID0gbm90UGF0aC5pZkZ1bGxTdWJQYXRoKGNoYW5nZWRQYXRoLCBjb21wb25lbnRQYXRoKTtcblx0XHRcdFx0Lypub3RDb21tb24ubG9nKGl0ZW0uZ2V0T3B0aW9ucygnbmFtZScpLCAnID4tPCAnLCBpdGVtLmdldE9wdGlvbnMoJ2lkJyksICcgPi08ICcsIGNvbXBvbmVudFBhdGgsIGNoYW5nZWRQYXRoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygnd2lsbCBiZSB1cGRhdGVkJywgaWZQYXJ0KTsqL1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaWZQYXJ0KSB7XG5cdFx0XHRcdGl0ZW0udXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0V29ya2luZ01hcHBpbmcoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtYXBwaW5nJywgdGhpcy5jcmVhdGVNYXBwaW5nKCkpO1xuXHR9XG5cblx0LypcblxuXHTQodC+0LfQtNCw0LXQvCDQutCw0YDRgtGLINGB0L7QvtGC0LLQtdGB0YLQstC40Y8g0L/RgNC+0YbQtdGB0YHQvtGA0L7Qsiwg0L/Rg9GC0LXQuSDQtNCw0L3QvdGL0YUg0LIg0L7QsdGK0LXQutGC0LUg0Lgg0Y3Qu9C10LzQtdC90YLQvtCyINGI0LDQsdC70L7QvdCwLlxuXHRbe1xuXHRcdGVsLFxuXHRcdHByb2Nlc3Nvcixcblx0XHR3b3JraW5nLFxuXHRcdGl0ZW0ucHJvcGVydHkucGF0aFxuXHR9XVxuXG5cdCovXG5cblx0Y3JlYXRlTWFwcGluZygpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5maW5kQWxsUHJvY2Vzc29ycygpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmaW5kQWxsUHJvY2Vzc29ycygpIHtcblx0XHRsZXQgcHJvY3MgPSBbXSxcblx0XHRcdGVscyA9IG5vdENvbW1vbi5nZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCh0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSwgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpO1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgZWxzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMCwgYXR0cyA9IGVsc1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCkgPT09IDApIHtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coYXR0c1tpXSk7XG5cdFx0XHRcdFx0bGV0IHByb2NEYXRhID0gdGhpcy5wYXJzZVByb2Nlc3NvckV4cHJlc3Npb24oYXR0c1tpXS5ub2RlTmFtZSk7XG5cdFx0XHRcdFx0cHJvY0RhdGEuZWxlbWVudCA9IGVsc1tqXTtcblx0XHRcdFx0XHRwcm9jRGF0YS5wcm9jZXNzb3JFeHByZXNzaW9uID0gYXR0c1tpXS5ub2RlTmFtZTtcblx0XHRcdFx0XHRwcm9jRGF0YS5hdHRyaWJ1dGVFeHByZXNzaW9uID0gYXR0c1tpXS52YWx1ZTtcblx0XHRcdFx0XHRwcm9jcy5wdXNoKHByb2NEYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcHJvY3M7XG5cdH1cblxuXHRwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24ocHJvY2Vzc29yRXhwcmVzc2lvbikge1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRwYXJhbXM6IFtdLFxuXHRcdFx0cHJvY2Vzc29yTmFtZTogJycsXG5cdFx0XHRpZkNvbmRpdGlvbjogZmFsc2Vcblx0XHR9O1xuXHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgsICcnKTtcblx0XHRpZiAocHJvY2Vzc29yRXhwcmVzc2lvbi5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgpID09PSAocHJvY2Vzc29yRXhwcmVzc2lvbi5sZW5ndGggLSBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLmxlbmd0aCkpIHtcblx0XHRcdHJlc3VsdC5pZkNvbmRpdGlvbiA9IHRydWU7XG5cdFx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SICsgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCwgJycpO1xuXHRcdH1cblx0XHRyZXN1bHQucGFyYW1zID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5zcGxpdChPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUik7XG5cdFx0cmVzdWx0LnByb2Nlc3Nvck5hbWUgPSByZXN1bHQucGFyYW1zWzBdO1xuXHRcdHJlc3VsdC5wYXJhbXMgPSByZXN1bHQucGFyYW1zLnNsaWNlKDEpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRleGVjUHJvY2Vzc29ycyhpdGVtLCBpbmRleCkge1xuXHRcdGxldCBtYXBwaW5nID0gdGhpcy5nZXRXb3JraW5nKCdtYXBwaW5nJyk7XG5cdFx0aWYgKG1hcHBpbmcpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbWFwcGluZy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgcHJvY1Njb3BlID0gbWFwcGluZ1tpXTtcblx0XHRcdFx0cHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwcm9jU2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2F0dHJpYnV0ZVJlc3VsdCcsIHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQpO1xuXHRcdFx0XHRsZXQgcHJvY05hbWUgPSBwcm9jU2NvcGUucHJvY2Vzc29yTmFtZSxcblx0XHRcdFx0XHRwcm9jID0gbm90VGVtcGxhdGVQcm9jZXNzb3JzLmdldChwcm9jTmFtZSk7XG5cdFx0XHRcdGlmIChwcm9jKSB7XG5cdFx0XHRcdFx0cHJvYyhwcm9jU2NvcGUsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdFx0XHRcdFx0cHJvY1Njb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb2NTY29wZS5wcm9jZXNzb3JFeHByZXNzaW9uKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ25vIHByb2Nlc3NvciBsaWtlJywgcHJvY05hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcigncmVuZGVyZWQnKTtcblx0fVxuXG5cdGdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocGF0aCwgaXRlbSkge1xuXHRcdHJldHVybiBub3RQYXRoLmdldChwYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHR9XG5cblx0Y2xlYXJTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5kZXN0cm95U3VicygpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3VicycsIFtdKTtcblx0fVxuXG5cdGRlc3Ryb3lTdWJzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiB0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRTdGFzaCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGxldCBlbCA9IHRoaXMuZ2V0U3Rhc2goKVt0XTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlKXtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWZTdWJFbGVtZW50UmVuZGVyZWQobnRFbCkge1xuXHRcdHJldHVybiBudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZCAmJiAobnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQudmFsdWUgPT09ICd0cnVlJyk7XG5cdH1cblxuXHRzZWFyY2hGb3JTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGxldCBzdWJzID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzdWIgdGVtcGxhdGVzJywgc3Vicyk7XG5cdFx0Zm9yIChsZXQgbnQgPSAwOyBudCA8IHN1YnMubGVuZ3RoOyBudCsrKSB7XG5cdFx0XHRpZiAoIXRoaXMuaWZTdWJFbGVtZW50UmVuZGVyZWQoc3Vic1tudF0pKSB7XG5cdFx0XHRcdHRoaXMucmVuZGVyU3ViKHN1YnNbbnRdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhZGRTdWIobnRFbCkge1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnc3VicycpLnB1c2goe1xuXHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRwYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogJycsXG5cdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS5zcmMgOiAnJyxcblx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdFx0cmVuZGVyZWRMaXN0OiBbXSxcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclN1YihudEVsKSB7XG5cdFx0aWYgKCFudEVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGxldCBkZXRhaWxzID0ge1xuXHRcdFx0XHRkYXRhUGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6IG51bGwsXG5cdFx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLnNyYy52YWx1ZSA6ICcnLFxuXHRcdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdGRhdGE6IGRldGFpbHMuZGF0YVBhdGghPT0gbnVsbD8gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KGRldGFpbHMuZGF0YVBhdGgsIHRoaXMuZ2V0RGF0YSgpKTpudWxsLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRzcmM6IGRldGFpbHMuc3JjXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlQWZ0ZXInLFxuXHRcdFx0XHRcdGlkOiBkZXRhaWxzLmlkLFxuXHRcdFx0XHRcdG50RWw6IG50RWwsXG5cdFx0XHRcdFx0ZGF0YVBhdGg6IGRldGFpbHMuZGF0YVBhdGhcblx0XHRcdFx0fSxcblx0XHRcdFx0b3duZXI6IHRoaXNcblx0XHRcdH07XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgZGV0YWlscy5pZCk7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdW2RldGFpbHMuaWRdID0gbmV3IG5vdENvbXBvbmVudChvcHRpb25zKTtcblx0fVxuXG5cdGNsZWFyU3Rhc2goKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIFtdKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGUnKTtcblx0fVxuXG5cdGdldFN0YXNoKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3N0YXNoJyk7XG5cdH1cblxuXHRzdGFzaFJlbmRlcmVkKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHR0aGlzLmFkZFRvU3Rhc2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0fVxuXG5cdHJlcGxhY2VSZW5kZXJlZCgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3JlcGxhY2Ugc3Rhc2gnKTtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksXG5cdFx0XHRzdGFzaCA9IHRoaXMuZ2V0U3Rhc2goKSxcblx0XHRcdG5ld1N0YXNoID0gW10sXG5cdFx0XHRhbmNob3IgPSBzdGFzaC5sZW5ndGggPiAwID8gc3Rhc2hbMF0gOiB0aGlzLmdldE9wdGlvbnMoJ250RWwnKSxcblx0XHRcdHBhcmVudE5vZGUgPSBhbmNob3IucGFyZW50Tm9kZTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRuZXdTdGFzaC5wdXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBuZXdTdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0aWYgKGFuY2hvci5uZXh0U2libGluZykge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3Rhc2hbdF0sIGFuY2hvci5uZXh0U2libGluZyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChuZXdTdGFzaFt0XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgc3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3Rhc2hbdF0pO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgbmV3U3Rhc2gpO1xuXHR9XG5cblx0YWRkVG9TdGFzaChub2RlKSB7XG5cdFx0dGhpcy5nZXRTdGFzaCgpLnB1c2gobm9kZSk7XG5cdH1cblxuXHRpc0RhdGEoZGF0YSA9IHt9KSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG5cblx0aGlkZSgpe1xuXG5cdH1cblxuXHRzaG93KCl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZW5kZXJlcjtcbiIsImNvbnN0IHBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHtcblx0XHRsZXQgbCA9IDA7XG5cdFx0d2hpbGUgKHRhcmdldEVsLmNoaWxkcmVuLmxlbmd0aCAtIGwpIHtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlblswXS5ub2RlTmFtZSA9PT0gJ05UJyl7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ250IGZvdW5kZWQnKTtcblx0XHRcdFx0bCsrO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ3JlbW92ZSBjaGlsZCAnLHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdFx0dGFyZ2V0RWwucmVtb3ZlQ2hpbGQodGFyZ2V0RWwuY2hpbGRyZW5bbF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0YXJnZXRFbC50ZXh0Q29udGVudCA9ICcnO1xuXHR9LFxuXHRiZWZvcmVFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGNoaWxkICcsIHJlbmRlcmVkW2ldKTtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fVxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlO1xuIiwiY29uc3QgcGxhY2VBZnRlciA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQWZ0ZXI7XG4iLCJjb25zdCBwbGFjZUJlZm9yZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQmVmb3JlO1xuIiwiY29uc3QgcGxhY2VGaXJzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IHJlbmRlcmVkLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdwbGFjZSBmaXJzdCcsIGksIHJlbmRlcmVkW2ldKTtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgYmVmb3JlIGZpcnN0Jyk7XG5cdFx0XHRcdHRhcmdldEVsLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwuY2hpbGRyZW5bMF0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBhcyBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2VGaXJzdDtcbiIsImNvbnN0IHBsYWNlTGFzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VMYXN0O1xuIiwiY29uc3QgcmVwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XHRcdFxuXHRcdGlmICh0YXJnZXRFbC5ub2RlTmFtZSAhPT0gJ05UJyl7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhcmdldEVsKTtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2U7XG4iLCJpbXBvcnQgcGxhY2UgZnJvbSAnLi9wbGFjZSc7XG5pbXBvcnQgcGxhY2VBZnRlciBmcm9tICcuL3BsYWNlQWZ0ZXInO1xuaW1wb3J0IHBsYWNlQmVmb3JlIGZyb20gJy4vcGxhY2VCZWZvcmUnO1xuaW1wb3J0IHBsYWNlRmlyc3QgZnJvbSAnLi9wbGFjZUZpcnN0JztcbmltcG9ydCBwbGFjZUxhc3QgZnJvbSAnLi9wbGFjZUxhc3QnO1xuaW1wb3J0IHJlcGxhY2UgZnJvbSAnLi9yZXBsYWNlJztcblxuY29uc3Qgbm90UGxhY2VycyA9IHtcblx0cGxhY2U6IHBsYWNlLFxuXHRwbGFjZUFmdGVyOiBwbGFjZUFmdGVyLFxuXHRwbGFjZUJlZm9yZTogcGxhY2VCZWZvcmUsXG5cdHBsYWNlRmlyc3Q6IHBsYWNlRmlyc3QsXG5cdHBsYWNlTGFzdDogcGxhY2VMYXN0LFxuXHRyZXBsYWNlOiByZXBsYWNlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RQbGFjZXJzO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi9ub3RUZW1wbGF0ZUNhY2hlJztcbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL25vdFJlbmRlcmVyJztcbmltcG9ydCBub3RQbGFjZXJzIGZyb20gJy4vcGxhY2Vycyc7XG5cbmNvbnN0IE1FVEFfUEFSVFMgPSBTeW1ib2woJ3BhcnRzJyk7XG4vKlxuXHRpbnB1dCA9IHtcblx0XHRkYXRhOiBub3RSZWNvcmQgb3IgW25vdFJlY29yZF0sXG5cdFx0dGVtcGxhdGU6IHtcblx0XHRcdGh0bWw6IGh0bWwoc3RyaW5nKSwgXHRcdC8v0YLQtdC60YHRgiDRgSBodG1sINC60L7QtNC+0Lwg0YjQsNCx0LvQvtC90LBcblx0XHRcdGVsOiBIVE1MRWxlbWVudChvYmplY3QpLCBcdC8vRE9NINGN0LvQtdC80LXQvdGCXG5cdFx0XHRzcmM6IHNyYyhzdHJpbmcpLFx0XHRcdC8v0YHRgdGL0LvQutCwINC90LAg0YTQsNC50Lsg0YEg0YjQsNCx0LvQvtC90L7QvFxuXHRcdFx0bmFtZTogbmFtZShzdHJpbmcpXHRcdFx0Ly/QvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwINC00LvRjyDQv9C+0LjRgdC60LAg0LIg0LrRjdGI0LUgbm90VGVtcGxhdGVDYWNoZVxuXHRcdH1cblx0XHRvcHRpb25zOntcblx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdC8v0LAg0Y3RgtC+INC60LDQuiDQsdGD0LTQtdC8INC/0L7QvNC10YnQsNGC0Ywg0YDQtdC30YPQu9GM0YLQsNGCINGA0LXQvdC00LXRgNC40L3Qs9CwXG5cdFx0XHRyZW5kZXJBbmQ6IHBsYWNlU3R5bGUoc3RyaW5nKSDQvtC00LjQvSDQuNC3INCy0LDRgNC40LDQvdGC0L7QslxuXHRcdFx0XHRcdHBsYWNlXHRcdC1cdNC/0L7QvNC10YnQsNC10Lwg0LLQvdGD0YLRgNC4INGG0LXQu9C10LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuXHRcdFx0XHRcdHJlcGxhY2VcdFx0LVx00LfQsNC80LXQvdGP0LXQvFxuXHRcdFx0XHRcdHBsYWNlQWZ0ZXJcdC1cdNC/0L7RgdC70LVcblx0XHRcdFx0XHRwbGFjZUJlZm9yZVx0LVx00LTQvlxuXHRcdFx0XHRcdHBsYWNlRmlyc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C10YDQstGL0Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdFx0XHRcdHBsYWNlTGFzdFx0LVx00LLQvdGD0YLRgNC4INC/0L7RgdC70LXQtNC90LjQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0fVxuXHR9XG4qL1xuY2xhc3Mgbm90Q29tcG9uZW50IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHRcdHRoaXMub24oJ3JlYWR5JywgdGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCl7XG5cdFx0aWYgKHRoaXMub3duZXIpe1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLm93bmVyLmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fVxuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLm93bmVyID0gaW5wdXQub3duZXI/aW5wdXQub3duZXI6bnVsbDtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQpO1xuXHRcdHRoaXMucHJlcGFyZVRlbXBsYXRlRWxlbWVudChpbnB1dC50ZW1wbGF0ZSA/IGlucHV0LnRlbXBsYXRlIDogbnVsbCk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0fVxuXG5cdGluaXRFdmVudHMobGlzdCl7XG5cdFx0Zm9yKGxldCB0IG9mIGxpc3Qpe1xuXHRcdFx0dGhpcy5vbiguLi50KTtcblx0XHR9XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnaWQnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2lkJywgT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdudEVsJykpe1xuXHRcdFx0dGhpcy5pbml0TWFya0VsZW1lbnQoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFya0VsZW1lbnQoKXtcblx0XHRsZXQgbWFya0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbnQnKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ250RWwnLCBtYXJrRWwpO1xuXHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKSxcblx0XHRcdHRhcmdldFF1ZXJ5ID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpO1xuXHRcdGlmICh0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZiAodGFyZ2V0KXtcblx0XHRcdFx0dGhpcy5zZXRPcHRpb25zKCd0YXJnZXRFbCcsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpe1xuXHRcdFx0dGhyb3cgJ05vIHRhcmdldCB0byBwbGFjZSByZW5kZXJlZCc7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIubWFpbih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksIFttYXJrRWxdKTtcblx0XHR9XG5cblx0fVxuXG5cdGluaXRXb3JraW5nKHZhbCkge1xuXHRcdHRoaXMudW5zZXRSZWFkeSh2YWwpO1xuXHR9XG5cblx0cHJlcGFyZVRlbXBsYXRlRWxlbWVudCh2YWwpIHtcblx0XHRpZiAoIXZhbCkge1xuXHRcdFx0dGhpcy51bnNldFJlYWR5KCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2h0bWwnKSAmJiB2YWwuaHRtbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLndyYXAoJycsICcnLCB2YWwuaHRtbCkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdlbCcpICYmIHZhbC5lbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudCh2YWwuZWwuY2xvbmVOb2RlKHRydWUpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnc3JjJykgJiYgdmFsLnNyYykge1xuXHRcdFx0bm90VGVtcGxhdGVDYWNoZS5hZGRGcm9tVVJMKHZhbC5zcmMsIHZhbC5zcmMpXG5cdFx0XHRcdC50aGVuKHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQuYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCduYW1lJykgJiYgdmFsLm5hbWUpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS5nZXQodmFsLm5hbWUpKTtcblx0XHR9XG5cdH1cblxuXHRzZXRQcm90b1RlbXBsYXRlRWxlbWVudChjb250KSB7XG5cdFx0aWYgKGNvbnQpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnLCBjb250KTtcblx0XHRcdHRoaXMudHJpZ2dlcigncmVhZHknKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdXcm9uZyB0ZW1wbGF0ZSBjb250YWluZXIgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JykuY2xvbmVOb2RlKHRydWUpO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdHJlc2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnLCB0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkuY2xvbmVOb2RlKHRydWUpKTtcblx0fVxuXG5cdHNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB0cnVlKTtcblx0fVxuXG5cdHVuc2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIGZhbHNlKTtcblx0fVxuXG5cdGlzUmVhZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncmVhZHknKTtcblx0fVxuXG5cdGNsZWFyUGFydHMoKSB7XG5cdFx0Lyog0LjQt9Cy0LXRidCw0LXQvCDQvtCxINGD0LTQsNC70LXQvdC40Lgg0Y3Qu9C10LzQtdC90YLQvtCyICovXG5cdFx0aWYgKHRoaXNbTUVUQV9QQVJUU10gJiYgQXJyYXkuaXNBcnJheSh0aGlzW01FVEFfUEFSVFNdKSAmJiB0aGlzW01FVEFfUEFSVFNdLmxlbmd0aCkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiB0aGlzW01FVEFfUEFSVFNdKSB7XG5cdFx0XHRcdGlmICh0LmRlc3Ryb3kpe1xuXHRcdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHR9XG5cblx0ZGVzdHJveSgpe1xuXHRcdHRoaXMuY2xlYXJQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ250RWwnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlKXtcblx0XHRcdHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5nZXRPcHRpb25zKCdudEVsJykpO1xuXHRcdH1cblx0XHR0aGlzLmRlYWQgPSB0cnVlO1xuXHRcdHRoaXMub2ZmQWxsKCk7XG5cdH1cblxuXHRyZXNldFBhcnRzKCkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10gPSBbXTtcblx0fVxuXG5cdGdldFBhcnRzKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfUEFSVFNdO1xuXHR9XG5cblx0YWRkUGFydCh0ZW1wbGF0ZSkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10ucHVzaCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0dGhpcy5yZW1vdmVPYnNvbGV0ZVBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHBsYWNlci5iZWZvcmUodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHRwbGFjZXIuYWZ0ZXIodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyB0YXJnZXQgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdHBsYWNlUGFydChkYXRhLCBpbmRleCl7XG5cdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSksXG5cdFx0XHRub2RlcyA9IHBhcnQuZ2V0U3Rhc2goKSxcblx0XHRcdHRhcmdldEVsLFxuXHRcdFx0bGFzdE5vZGUsXG5cdFx0XHRwbGFjZXI7XG5cdFx0aWYgKGluZGV4ID09PSAwKXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcihPUFRTLkRFRkFVTFRfUExBQ0VSX0xPT1ApO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJyk7XG5cdFx0fVxuXHRcdHBsYWNlci5tYWluKHRhcmdldEVsLCBub2Rlcyk7XG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRnZXRQbGFjZXIobWV0aG9kKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZWFyY2hpbmcgZm9yIHBsYWNlcicsIG1ldGhvZCk7XG5cdFx0aWYgKG5vdFBsYWNlcnMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbbWV0aG9kXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbT1BUUy5ERUZBVUxUX1BMQUNFUl07XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaERhdGEoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldERhdGEoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaFBhcnQoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0UGFydHMoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXRQYXJ0cygpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdNC10YHQu9C4INGBINC00LDQvdC90YvQvNC4INC90LUg0YHQstGP0LfQsNC9INGA0LXQvdC00LXRgNC10YAgLSDRgdC+0LfQtNCw0LXQvFxuXHQqL1xuXG5cdHJlbmRlclBhcnQoZGF0YSkge1xuXHRcdGlmICghdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ2NyZWF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHRsZXQgcmVuZGVyZXIgPSBuZXcgbm90UmVuZGVyZXIoe1xuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0ZW1wbGF0ZTogdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lLmJpbmQodGhpcyksXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpLFxuXHRcdFx0XHRjb21wb25lbnQ6IHRoaXNcblx0XHRcdH0pO1xuXHRcdFx0Ly9yZW5kZXJlci5vbignb2Jzb2xldGUnLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkUGFydChyZW5kZXJlcik7XG5cdFx0fWVsc2V7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHR0aGlzLnVwZGF0ZVBhcnQodGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVQYXJ0KHBhcnQpe1xuXHRcdHBhcnQudXBkYXRlKCk7XG5cdH1cblxuXHRyZW1vdmVPYnNvbGV0ZVBhcnRzKCkge1xuXHRcdC8v0LrQvtC90LLQtdC10YAg0L/QvtC40YHQuiDQsNC60YLRg9Cw0LvRjNC90YvRhSAtINGD0LTQsNC70LXQvdC40LUg0L7RgdGC0LDQu9GM0L3Ri9GFXG5cdFx0bm90Q29tbW9uLnBpcGUoXG5cdFx0XHR1bmRlZmluZWQsIC8vIHBhcnRzIHRvIHNlYXJjaCBpbiwgY2FuIGJlICd1bmRlZmluZWQnXG5cdFx0XHRbXG5cdFx0XHRcdHRoaXMuZmluZEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vZmlyc3Qgcm91bmQsIHNlYXJjaCBmb3Igb2Jzb2xldGVcblx0XHRcdFx0dGhpcy5yZW1vdmVOb3RBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL3JlbW92ZSAnZW1cblx0XHRcdF1cblx0XHQpO1xuXHR9XG5cblx0Lypcblx0XHTQtdGB0YLRjCDQtNCw0L3QvdGL0LUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDQsNC60YLRg9Cw0LvRjNC90L4sXG5cdFx00L3QtdGCINC00LDQvdC90YvRhSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINGB0YLQsNGA0YzRkVxuXHQqL1xuXG5cdGZpbmRBY3R1YWxQYXJ0cygpIHtcblx0XHRsZXQgYWN0dWFsUGFydHMgPSBbXTtcblx0XHR0aGlzLmZvckVhY2hEYXRhKChkYXRhLyosIGluZGV4Ki8pPT57XG5cdFx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKTtcblx0XHRcdGlmIChwYXJ0KXtcblx0XHRcdFx0YWN0dWFsUGFydHMucHVzaChwYXJ0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gYWN0dWFsUGFydHM7XG5cdH1cblxuXHQvKlxuXHRcdNGD0LTQsNC70Y/QtdC8INCy0YHQtSDQutGA0L7QvNC1INCw0LrRgtGD0LDQu9GM0L3Ri9GFXG5cdCovXG5cdHJlbW92ZU5vdEFjdHVhbFBhcnRzKGFjdHVhbFBhcnRzKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmIChhY3R1YWxQYXJ0cy5pbmRleE9mKHRoaXMuZ2V0UGFydHMoKVt0XSkgPT09IC0xKXtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpW3RdLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpLnNwbGljZSh0LCAxKTtcblx0XHRcdFx0dC0tO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFBhcnRCeURhdGEoZGF0YSkge1xuXHRcdGZvciAobGV0IHQgaW4gdGhpcy5nZXRQYXJ0cygpKSB7XG5cdFx0XHRpZiAodGhpcy5nZXRQYXJ0cygpW3RdLmlzRGF0YShkYXRhKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRQYXJ0cygpW3RdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRzaG93KCl7XG5cdFx0XG5cdH1cblxuXHRoaWRlKCl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb21wb25lbnQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICcucGFnZS1jb250ZW50Jyxcblx0T1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCA9ICcuaHRtbCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMID0gdHJ1ZSxcblx0T1BUX0RFRkFVTFRfUExVUkFMX05BTUUgPSAnTW9kZWxzJyxcblx0T1BUX0RFRkFVTFRfU0lOR0xFX05BTUUgPSAnTW9kZWwnLFxuXHRPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSA9ICdtYWluJyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0FORCA9ICdwbGFjZSc7XG5cbmNsYXNzIG5vdENvbnRyb2xsZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoYXBwKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJlYWR5OiBmYWxzZSxcblx0XHRcdHZpZXdzOiB7fSxcblx0XHRcdGxpYnM6e30sXG5cdFx0XHR2aWV3TmFtZTogT1BUX0RFRkFVTFRfVklFV19OQU1FLFxuXHRcdFx0aGVscGVyczoge31cblx0XHR9KTtcblx0XHR0aGlzLnNldERhdGEoe30pO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRtb2R1bGVOYW1lOiBPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSxcblx0XHRcdGNvbnRhaW5lclNlbGVjdG9yOiBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IsXG5cdFx0XHRwcmVmaXg6IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZScpLFxuXHRcdFx0cG9zdGZpeDogT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCxcblx0XHRcdHJlbmRlckZyb21VUkw6IE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCxcblx0XHRcdG5hbWVzOntcblx0XHRcdFx0cGx1cmFsOk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FLFxuXHRcdFx0XHRzaW5nbGU6IE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLmluaXRSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0Lypcblx0XHQgICAg0YHRgNCw0LfRgyDQtNC10LvQsNC10Lwg0LTQvtGB0YLRg9C/0L3Ri9C80Lgg0LzQvtC00LXQu9C4IG5vdFJlY29yZCDQuNC3IG5jYENvbnRyb2xsZXJOYW1lYCDQsdGD0LTRg9GCINC00L7RgdGC0YPQv9C90Ysg0LrQsNC6IHRoaXMubnJgTW9kZWxOYW1lYFxuXHRcdCovXG5cdFx0bGV0IGludGVyZmFjZXMgPSB0aGlzLmFwcC5nZXRJbnRlcmZhY2VzKCk7XG5cdFx0dGhpcy5tYWtlID0ge307XG5cdFx0Zm9yIChsZXQgdCBpbiBpbnRlcmZhY2VzKSB7XG5cdFx0XHRpZiAoaW50ZXJmYWNlcy5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdHRoaXMubWFrZVt0XSA9IGludGVyZmFjZXNbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdFJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyKHRoaXMuZ2V0V29ya2luZygndmlld05hbWUnKSwgdGhpcy5nZXREYXRhKCksIHRoaXMuZ2V0V29ya2luZygnaGVscGVycycpKTtcblx0fVxuXG5cdHJlbmRlcih2aWV3TmFtZSA9J2RlZmF1bHQnIC8qIHZpZXcgbmFtZSAqLywgZGF0YSA9IHt9IC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzID0ge30vKiBjb3VsZCBiZSBub3QgcmVwcmVzZW50ZWQgKi8pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHZhciB2aWV3ID0gdGhpcy5nZXRWaWV3KHZpZXdOYW1lKTtcblxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3ID09PSAndW5kZWZpbmVkJyB8fCB2aWV3ID09PSBudWxsKSB7XG5cdFx0XHRcdHJlamVjdCgnTm8gdmlldyBmb3VuZCcsIHZpZXdOYW1lKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2aWV3ID0gbm90Q29tbW9uLmV4dGVuZCh7fSwgdmlldyk7XG5cdFx0XHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0XHRcdC8vINGN0LvQtdC80LXQvdGC0LAsINC90L4g0LjQt9Cy0LXRgdGC0L3QvtC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGA0LVcblx0XHRcdFx0aWYgKCgodHlwZW9mIHZpZXcudGFyZ2V0RWwgPT09ICd1bmRlZmluZWQnKSB8fCAodmlldy50YXJnZXRFbCA9PT0gbnVsbCkpICYmICh0eXBlb2Ygdmlldy50YXJnZXRRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy50YXJnZXRRdWVyeSAhPT0gbnVsbCAmJiB2aWV3LnRhcmdldFF1ZXJ5Lmxlbmd0aCA+IDApKSB7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iodmlldy50YXJnZXRRdWVyeSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHZpZXcuaGVscGVycywgaGVscGVycyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0fVxuXHRcdFx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0XHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckZyb21VUkwnKSkge1xuXHRcdFx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygdmlldy50ZW1wbGF0ZVVSTCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldy50ZW1wbGF0ZVVSTCA9PSBudWxsIHx8IHZpZXcudGVtcGxhdGVVUkwubGVuZ3RoID09IDApIHtcblx0XHRcdFx0XHRcdGxldCBwcmVmaXggPSAodmlldy5jb21tb24gPyB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5jb21tb24nKTogdGhpcy5nZXRNb2R1bGVQcmVmaXgoKSksXG5cdFx0XHRcdFx0XHRcdG5hbWUgPSAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiB2aWV3TmFtZSksXG5cdFx0XHRcdFx0XHRcdHBvc3RmaXggPSB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHRcdC8v0LPQtdC90LXRgNC40YDRg9C10Lwg0LDQtNGA0LXRgSDQv9C+INGI0LDQsdC70L7QvdGDXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gIFtwcmVmaXgsIG5hbWVdLmpvaW4oJy8nKSArIHBvc3RmaXg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8v0LAg0LXRgdC70Lgg0LXRgdGC0Ywg0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCwg0YLQvlxuXHRcdFx0XHRcdGlmICh2aWV3Lmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU5hbWUnKSkge1xuXHRcdFx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVOYW1lID0gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIHZpZXcudGVtcGxhdGVOYW1lICsgdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTp7XG5cdFx0XHRcdFx0XHRuYW1lOiB2aWV3LnRlbXBsYXRlTmFtZSxcblx0XHRcdFx0XHRcdHNyYzogdmlldy50ZW1wbGF0ZVVSTCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czpbWydhZnRlclJlbmRlcicsIHJlc29sdmVdXSxcblx0XHRcdFx0XHRvcHRpb25zOntcblx0XHRcdFx0XHRcdHRhcmdldEVsOiB2aWV3LnRhcmdldEVsLFxuXHRcdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRcdHJlbmRlckFuZDogdmlldy5yZW5kZXJBbmQgfHwgT1BUX0RFRkFVTFRfUkVOREVSX0FORFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRBcHAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwO1xuXHR9XG5cblx0c2V0TW9kZWwobW9kZWwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGVsJywgbW9kZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kZWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnbW9kZWwnKTtcblx0fVxuXG5cdHNldFJlYWR5KHZhbCA9IHRydWUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdmFsKTtcblx0XHR2YWwgPyB0aGlzLnRyaWdnZXIoJ3JlYWR5JykgOiB0aGlzLnRyaWdnZXIoJ2J1c3knKTtcblx0fVxuXG5cdHNldFZpZXcobmFtZSwgdmlldyl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSwgdmlldyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRWaWV3cyh2aWV3cyl7XG5cdFx0Zm9yKGxldCB0IGluIHZpZXdzKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgdCksIHZpZXdzW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRWaWV3KG5hbWUgPSAnZGVmYXVsdCcpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpKTtcblx0fVxuXG5cdHNldE1vZHVsZU5hbWUodmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdtb2R1bGVOYW1lJywgdmFsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZHVsZU5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnbW9kdWxlTmFtZScpO1xuXHR9XG5cblx0Z2V0TW9kdWxlUHJlZml4KCl7XG5cdFx0cmV0dXJuIFt0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGVzJyksIHRoaXMuZ2V0TW9kdWxlTmFtZSgpXS5qb2luKCcvJyk7XG5cdH1cblxuXHRwcmVsb2FkTGliKGxpc3QgPSB7fSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRpZih0eXBlb2YgbGlzdCAhPT0gJ29iamVjdCcpe1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gbGlzdCl7XG5cdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykucHVzaChsaXN0W3RdKTtcblx0XHRcdFx0XHR0aGlzLm1ha2VbbGlzdFt0XV0oe30pLiRsaXN0QWxsKClcblx0XHRcdFx0XHRcdC50aGVuKChkYXRhKT0+e1xuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbGlicycpKXtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2xpYnMnLCB7fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRPcHRpb25zKCdsaWJzJylbdF0gPSBkYXRhO1xuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pID4gLTEpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnNwbGljZSh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pLCAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KGVycik7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHF1ZWVVcGxvYWQobmFtZSwgbGlzdCl7XG5cdFx0Ly9oYXNoIChmaWVsZE5hbWU9PmZpbGVzTGlzdClcblx0XHRpZighdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRRdWVlJykpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd1cGxvYWRRdWVlJywge30pO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnKVtuYW1lXSA9IGxpc3Q7XG5cdH1cblxuXHRleGVjVXBsb2FkcyhpdGVtKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0V29ya2luZygndXBsb2FkUXVlZScpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0aWYodHlwZW9mIGxpc3QgIT09ICdvYmplY3QnKXtcblx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwbG9hZGluZycsIHt9KTtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGxpc3Qpe1xuXHRcdFx0XHRcdGxldCBmaWVsZEZpbGVzID0gbGlzdFt0XTtcblx0XHRcdFx0XHRpZiAoZmllbGRGaWxlcy5sZW5ndGggPiAxKXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSBbXTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSAnJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yKGxldCBmID0gMDsgZiA8IGZpZWxkRmlsZXMubGVuZ3RoOyBmKyspe1xuXHRcdFx0XHRcdFx0aWYoIXRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdID0gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0rKztcblx0XHRcdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3VwbG9hZGVyJylcblx0XHRcdFx0XHRcdFx0LnVwbG9hZChmaWVsZEZpbGVzW2ZdKVxuXHRcdFx0XHRcdFx0XHQudGhlbigoc2F2ZWRGaWxlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZmlsZSB1cGxvYWRlZCcsIHQsZiwgc2F2ZWRGaWxlKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdLS07XG5cdFx0XHRcdFx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XSA9PT0gMCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheShpdGVtW2ZdKSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtW3RdLnB1c2goc2F2ZWRGaWxlLmhhc2gpO1xuXHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVt0XSA9IHNhdmVkRmlsZS5oYXNoO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZihPYmplY3Qua2V5cyh0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKE9iamVjdC5rZXlzKHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0b25BZnRlclJlbmRlcigpe1xuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCA9ICdmb3JtXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfRk9STV9USVRMRSA9ICdGb3JtIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge30sXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUID0gWydvcHRpb25zJywgJ21hbmlmZXN0JywgJ2FwcCddO1xuXG5jbGFzcyBub3RGb3JtIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdwcmVmaXgnLCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50cycsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLnNldERhdGEobmV3IG5vdFJlY29yZCh7fSwgdGhpcy5nZXREYXRhKCkpKTtcblx0XHR9XG5cdFx0dGhpcy5vbignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjYW5jZWwnLCB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcykpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKTtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoKSB7XG5cdFx0bGV0IG1hbmlmZXN0ID0gdGhpcy5nZXRNYW5pZmVzdCgpO1xuXHRcdGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC5hY3Rpb25zKSB7XG5cdFx0XHRyZXR1cm4gbWFuaWZlc3QuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpKSA/IG1hbmlmZXN0LmFjdGlvbnNbdGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKV0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRnZXRGb3JtRmllbGRzTGlzdCgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0cm9sZSA9IHRoaXMuZ2V0T3B0aW9ucygncm9sZScsIE9QVF9ERUZBVUxUX1JPTEVfTkFNRSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpIHtcblxuXHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzKSB7XG5cdFx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xuXHRcdFx0XHRcdGxpc3QgPSBhY3Rpb25EYXRhLmZpZWxkc1tyb2xlXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdC8qXG5cdFx0UmVuZGVyaW5nXG5cdCovXG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHR9XG5cblx0Z2V0UGFydFRlbXBsYXRlTmFtZShmb3JtUGFydCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHRoaXMuYmluZEZvcm1FdmVudHMuYmluZCh0aGlzKV0sXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfRk9STV9USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KClbdF07XG5cdFx0XHRcdHRoaXMuYWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGVhckZpZWxkc0NvbXBvbmVudHMoKSB7XG5cdFx0bGV0IGNvbXBzID0gdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJyk7XG5cdFx0d2hpbGUgKGNvbXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbXBzWzBdLmNvbXBvbmVudC5kZXN0cm95KCk7XG5cdFx0XHRjb21wcy5zcGxpY2UoMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlicygpe1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRvcHRpb25zOiB7fSxcblx0XHRcdG1hbmlmZXN0OiB7fSxcblx0XHRcdGFwcDoge30sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAobm90Q29tbW9uLmdldEFwcCgpICYmIG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKSl7XG5cdFx0XHRyZXN1bHQuYXBwID0gbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQgJiYgdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKSl7XG5cdFx0XHRyZXN1bHQubWFuaWZlc3QgPSB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpLmZpZWxkcztcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSB7XG5cdFx0bGV0IGRlZiA9IE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04sXG5cdFx0XHRmaWVsZHNMaWJzID0gdGhpcy5nZXRGaWVsZHNMaWJzKCk7XG5cdFx0Zm9yKGxldCB0IG9mIE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUKXtcblx0XHRcdGlmIChmaWVsZHNMaWJzLmhhc093blByb3BlcnR5KHQpICYmIGZpZWxkc0xpYnNbdF0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSl7XG5cdFx0XHRcdHJldHVybiBmaWVsZHNMaWJzW3RdW2ZpZWxkTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkZWY7XG5cdH1cblxuXHRhZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpIHtcblx0XHRsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSk7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKT0+e1xuXHRcdFx0XHRyZXR1cm4gcGFyYW1zLml0ZW0udmFsdWUgPT09IHRoaXMuZ2V0RGF0YShmaWVsZE5hbWUpO1xuXHRcdFx0fSxcblx0XHRcdGZpZWxkOiByZWMuZmllbGQsXG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKVxuXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0Rm9ybVRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCcsXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlckRhdGFDaGFuZ2UnLCB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMocGFyYW1zKXtcblx0XHRub3RDb21tb24ubG9nKCdjb2xsZWN0IGRhdGEgZnJvbSBjb21wb25lbnRzJywgcGFyYW1zKTtcblx0fVxuXG5cdGdldEZvcm1UYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jyl7XG5cdFx0aWYgKCF0YXJnZXQpe3RhcmdldCA9ICdib2R5Jzt9XG5cdFx0bGV0IHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0IT09J2JvZHknKXtcblx0XHRcdHRhcmdldCA9ICdib2R5Jztcblx0XHRcdHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0fVxuXHRcdGlmKCFyZXMgJiYgdGFyZ2V0PT0nYm9keScpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHRjb2xsZWN0RGF0YSgpIHtcblx0XHQvL2xldCBkYXRhID0gdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcyk7XG5cdH1cblxuXHRiaW5kRm9ybUV2ZW50cygpe1xuXHRcdGxldCB0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZih0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZih0YXJnZXQpe1xuXHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3RhcmdldEVsJywgdGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSl7XG5cdFx0XHRsZXRcdGZvcm0gPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXHRcdFx0aWYoZm9ybSl7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR1cGRhdGVGaWVsZChmaWVsZE5hbWUpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uZmllbGQubmFtZSA9PT0gZmllbGROYW1lKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCkge1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpIHtcblxuXHR9XG5cblx0b25SZXNldCgpIHtcblxuXHR9XG5cblx0Z2V0RmllbGRzKCkge1xuXG5cdH1cblxuXHRhZGRGaWVsZCgpIHtcblxuXHR9XG5cblx0cmVtb3ZlRmllbGQoKSB7XG5cblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Rm9ybTtcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9ub3RGb3JtLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfVklFVyA9ICdlZGl0JyxcbiAgT1BUX0RFRkFVTFRfQUNUSU9OID0gJ2NyZWF0ZScsXG4gIE9QVF9ERUZBVUxUX0lURU0gPSB7XG4gICAgX2lkOiBudWxsLFxuICAgIHRpdGxlOiAnVGl0bGUnLFxuICAgIHZhbHVlOiAnVmFsdWUnXG4gIH07XG5cbmNsYXNzIENSVURDcmVhdGUgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuICAgICAgICBzdXBlcihwYXJlbnQuYXBwKTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcbiAgICAgICAgbm90Q29tbW9uLmxvZygnQ1JVRCBDcmVhdGUnKTtcbiAgICAgICAgdGhpcy5zZXRWaWV3cyh7XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLm5hbWUnKSB8fCBPUFRfREVGQVVMVF9WSUVXLFxuICAgICAgICAgICAgICAgIGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmNvbW1vbicpIHx8IHRydWUsXG4gICAgICAgICAgICAgICAgdGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG4gICAgICAgICAgICAgICAgaGVscGVyczoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUucHJlbG9hZCcpKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5pbml0RGF0YS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG4gICAgICAgICAgICAudGhlbih0aGlzLnJlbmRlckZvcm0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjcmVhdGVEZWZhdWx0KCl7XG4gICAgICBpZiAodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmRlZmF1bHRJdGVtJykgJiYgdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICYmIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSl7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0obm90Q29tbW9uLmV4dGVuZCh7fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmRlZmF1bHRJdGVtJykpKTtcbiAgICAgIH1lbHNlIGlmKHRoaXMucGFyZW50LmluaXRJdGVtKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmluaXRJdGVtKCk7XG4gICAgICB9ZWxzZSBpZiAodGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICYmIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSl7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0obm90Q29tbW9uLmV4dGVuZCh7fSwgT1BUX0RFRkFVTFRfSVRFTSkpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBuZXcgbm90UmVjb3JkKHt9LCBub3RDb21tb24uZXh0ZW5kKHt9LCBPUFRfREVGQVVMVF9JVEVNKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5pdERhdGEoKXtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICB0cnl7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuY3JlYXRlRGVmYXVsdCgpKTtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuZ2V0RGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKXtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcldyYXBwZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcignZGVmYXVsdCcsIHt9LCB7fSk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+e1xuICAgICAgICAgICAgdGhpcy5mb3JtID0gbmV3IG5vdEZvcm0oe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfQUNUSU9OLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnByZWZpeCcpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUucm9sZScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiAocGFyYW1zKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVzID0gcGFyYW1zLmUudGFyZ2V0LmZpbGVzIHx8IHBhcmFtcy5lLmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RDb21tb24ubG9nKCdmaWxlIGNoYW5nZWQnLCBmaWxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oZWxwZXJzLmZpZWxkLm5hbWUgJiYgZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVlVXBsb2FkKHBhcmFtcy5oZWxwZXJzLmZpZWxkLm5hbWUsIGZpbGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90Q29tbW9uLmxvZygnc3VibWl0IGZvcm0gJywgdGhpcy5uZXdJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWNVcGxvYWRzKHRoaXMuZ2V0RGF0YSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbih0aGlzLmNyZWF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhZnRlclN1Ym1pdDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29Ub1RhYmxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGliczogdGhpcy5nZXRPcHRpb25zKCdsaWJzJyksXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5oZWxwZXJzJykgfHwge30pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBldmVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAgWydhZnRlclJlbmRlcicsIHJlc29sdmVdLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2FmdGVyU3VibWl0JywgJ2FmdGVyUmVzdG9yZSddLCB0aGlzLmJhY2tUb0xpc3QuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZShpdGVtKSB7XG4gICAgICAgIGl0ZW1bJyQnICsgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmFjdGlvbicpXSgpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgbm90Q29tbW9uLmxvZygnZm9ybSBzYXZlZCcsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBub3RDb21tb24uZXJyb3IoJ2Zvcm0gbm90IHNhdmVkJywgcmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJhY2tUb0xpc3QoKSB7XG4gICAgICAgIHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVEQ3JlYXRlO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfUEFHRV9TSVpFID0gMjAsXG5cdE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSID0gMCxcblx0T1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04gPSAxLFxuXHRPUFRfREVGQVVMVF9TT1JUX0ZJRUxEID0gJ19pZCcsXG5cdE9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DID0gJ3ByZXByb2Nlc3Nvcic7XG5cbmNsYXNzIG5vdFRhYmxlIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgW10pO1xuXHRcdGlmKCF0aGlzLmdldERhdGEoKSB8fCAhQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoJ3Jvd3MnKSkpe1xuXHRcdFx0dGhpcy5zZXREYXRhKHtyb3dzOltdfSk7XG5cdFx0fVxuXHRcdHRoaXMucmVzZXRQYWdlcigpO1xuXHRcdHRoaXMucmVzZXRGaWx0ZXIoKTtcblx0XHR0aGlzLnJlc2V0U29ydGVyKCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRkYXRhOiB7fSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiAndGFibGVfd3JhcHBlcidcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdHJlbmRlckFuZDogdGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJJbnNpZGUuYmluZCh0aGlzKVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudCcsIGNvbXBvbmVudCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVySW5zaWRlKCkge1xuXHRcdHRoaXMucmVuZGVySGVhZGVyKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdFx0dGhpcy5yZW5kZXJCb2R5KCk7XG5cdFx0dGhpcy5iaW5kU2VhcmNoKCk7XG5cdFx0dGhpcy5iaW5kQ3VzdG9tQmluZGluZ3MoKTtcblx0fVxuXG5cdHJlbmRlckhlYWRlcigpIHtcblx0XHR2YXIgdGFibGVIZWFkZXIgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGhlYWQgdHInKTtcblx0XHRpZiAoIXRhYmxlSGVhZGVyKSByZXR1cm47XG5cdFx0bGV0IGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBuZXdUaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJyk7XG5cdFx0XHRuZXdUaC5pbm5lckhUTUwgPSBmaWVsZHNbaV0udGl0bGU7XG5cdFx0XHRpZiAoZmllbGRzW2ldLmhhc093blByb3BlcnR5KCdzb3J0YWJsZScpICYmIGZpZWxkc1tpXS5zb3J0YWJsZSkge1xuXHRcdFx0XHR0aGlzLmF0dGFjaFNvcnRpbmdIYW5kbGVycyhuZXdUaCwgZmllbGRzW2ldLnBhdGgpO1xuXHRcdFx0fVxuXHRcdFx0dGFibGVIZWFkZXIuYXBwZW5kQ2hpbGQobmV3VGgpO1xuXHRcdH1cblx0fVxuXG5cdGF0dGFjaFNvcnRpbmdIYW5kbGVycyhoZWFkQ2VsbCwgZmllbGROYW1lKSB7XG5cdFx0aGVhZENlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5jaGFuZ2VTb3J0aW5nT3B0aW9ucyhoZWFkQ2VsbCwgZmllbGROYW1lKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblx0XHRoZWFkQ2VsbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdH1cblxuXHRjaGFuZ2VTb3J0aW5nT3B0aW9ucyhlbCwgZmllbGROYW1lKSB7XG5cdFx0aWYgKGZpZWxkTmFtZSA9PT0gdGhpcy5nZXRTb3J0ZXIoKS5zb3J0QnlGaWVsZCl7XG5cdFx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRcdHNvcnRCeUZpZWxkOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHNvcnREaXJlY3Rpb246IC0xICogdGhpcy5nZXRTb3J0ZXIoKS5zb3J0RGlyZWN0aW9uLFxuXHRcdFx0fSk7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRcdHNvcnRCeUZpZWxkOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHNvcnREaXJlY3Rpb246IE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmIChlbC5wYXJlbnROb2RlKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsLnBhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0gPT09IGVsKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ25vbmUnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0U29ydGVyKCkuc29ydERpcmVjdGlvbiA+IDApIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ2FzY2VuZGluZycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdkZXNjZW5kaW5nJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0U29ydGVyKGhhc2gpIHtcblx0XHQvL2NvbnNvbGUubG9nKCdzZXRTb3J0ZXInLCBoYXNoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3NvcnRlcicsIGhhc2gpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZURhdGEoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0U29ydGVyKCl7XG5cdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0c29ydEJ5RmllbGQ6IE9QVF9ERUZBVUxUX1NPUlRfRklFTEQsXG5cdFx0XHRzb3J0RGlyZWN0aW9uOiBPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTixcblx0XHR9KTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdGdldEZpbHRlclNlYXJjaCgpIHtcblx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmdldEZpbHRlcigpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldEZpbHRlcigpICE9PSBudWxsICYmIHR5cGVvZiB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2ggIT09IG51bGwpID8gdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2gudG9TdHJpbmcoKSA6ICcnO1xuXHR9XG5cblx0aW52YWxpZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ29uZVBhZ2VyJykpIHtcblx0XHRcdHdoaWxlKHRoaXMuZ2V0RGF0YSgncm93cycpLmxlbmd0aD4wKXtcblx0XHRcdFx0dGhpcy5nZXREYXRhKCdyb3dzJykucG9wKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR9XG5cdH1cblxuXHRzZXRGaWx0ZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgaGFzaCk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlRGF0YSgpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpcy5zZXRGaWx0ZXIoe30pO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0UGFnZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncGFnZXInLCBoYXNoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdwYWdlcicsIHtcblx0XHRcdHBhZ2VTaXplOiBpc05hTih0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJykpID8gT1BUX0RFRkFVTFRfUEFHRV9TSVpFOnRoaXMuZ2V0T3B0aW9ucygncGFnZVNpemUnKSxcblx0XHRcdHBhZ2VOdW1iZXI6IGlzTmFOKHRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpKSA/IE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSOnRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncGFnZXInKTtcblx0fVxuXG5cdHNldFVwZGF0aW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndXBkYXRpbmcnLCB0cnVlKTtcblx0fVxuXG5cdHNldFVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd1cGRhdGluZycsIGZhbHNlKTtcblx0fVxuXG5cdGlmVXBkYXRpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndXBkYXRpbmcnKTtcblx0fVxuXG5cdHVwZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKSB7XG5cdFx0XHRpZiAodGhpcy5pZlVwZGF0aW5nKCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly9sb2FkIGZyb20gc2VydmVyXG5cdFx0XHRsZXQgcXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKHt9KVxuXHRcdFx0XHQuc2V0RmlsdGVyKHRoaXMuZ2V0RmlsdGVyKCkpXG5cdFx0XHRcdC5zZXRTb3J0ZXIodGhpcy5nZXRTb3J0ZXIoKSlcblx0XHRcdFx0LnNldFBhZ2VyKHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSwgdGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpO1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0cXVlcnkuJGxpc3QoKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJyRsaXN0IGZvciB0YWJsZScsIGRhdGEpO1xuXHRcdFx0XHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRcdFx0XHRyb3dzOiB0aGlzLmdldERhdGEoJ3Jvd3MnKS5jb25jYXQoZGF0YSlcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR0aGlzLnByb2NjZXNzRGF0YSgpO1xuXHRcdFx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKGUpO1xuXHRcdFx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9sb2NhbCBtYWdpY1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0dGhpcy5wcm9jY2Vzc0RhdGEoKTtcblx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdH1cblx0fVxuXG5cdHByb2NjZXNzRGF0YSgpIHtcblx0XHR2YXIgdGhhdEZpbHRlciA9IHRoaXMuZ2V0RmlsdGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0RmlsdGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyICE9PSBudWxsICYmIHR5cGVvZiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2ggIT09IG51bGwgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2gubGVuZ3RoID4gMCkge1xuXHRcdFx0Ly9cblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgdGhpcy5nZXREYXRhKCdyb3dzJykuZmlsdGVyKHRoaXMudGVzdERhdGFJdGVtLmJpbmQodGhpcykpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKSk7XG5cdFx0fVxuXHRcdC8vLy9zb3J0ZXJcblx0XHR2YXIgdGhhdFNvcnRlciA9IHRoaXMuZ2V0U29ydGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0U29ydGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0U29ydGVyICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4ge1xuXHRcdFx0XHRsZXQgdDEgPSBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLCBpdGVtMSwge30pLFxuXHRcdFx0XHRcdHQyID0gbm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCxpdGVtMix7fSk7XG5cdFx0XHRcdGlmIChpc05hTih0MSkpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHQxICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdDIgIT09ICd1bmRlZmluZWQnICYmIHQxLmxvY2FsZUNvbXBhcmUpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIHQxLmxvY2FsZUNvbXBhcmUoKSAqIC0gdGhhdFNvcnRlci5zb3J0RGlyZWN0aW9uO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiAoKHQxIDwgdDIpID8gMSA6IC0xKSAqIHRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0YmluZFNlYXJjaCgpIHtcblx0XHR2YXIgc2VhcmNoRWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInNlYXJjaFwiXScpWzBdO1xuXHRcdGlmICghc2VhcmNoRWwpIHJldHVybjtcblx0XHR2YXIgb25FdmVudCA9IChlKSA9PiB7XG5cdFx0XHR0aGlzLnNldEZpbHRlcih7XG5cdFx0XHRcdGZpbHRlclNlYXJjaDogZS5jdXJyZW50VGFyZ2V0LnZhbHVlXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH07XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbkV2ZW50KTtcblx0XHRzZWFyY2hFbC5hZGRFdmVudExpc3RlbmVyKCdlbnRlcicsIG9uRXZlbnQpO1xuXHR9XG5cblxuXHRiaW5kQ3VzdG9tQmluZGluZ3MoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykgfHwgIXRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IgKHZhciBzZWxlY3RvciBpbiB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHZhciBlbHMgPSB0aGlzLmdldE9wdGlvbigndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdGZvciAodmFyIGVsSWQgPSAwOyBlbElkIDwgZWxzLmxlbmd0aDsgZWxJZCsrKSB7XG5cdFx0XHRcdHZhciBlbCA9IGVsc1tlbElkXTtcblx0XHRcdFx0Zm9yICh2YXIgZXZlbnQgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpW3NlbGVjdG9yXSkge1xuXHRcdFx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl1bZXZlbnRdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvYWROZXh0KCkge1xuXHRcdHRoaXMuZ2V0V29ya2luZygncGFnZXInKS5wYWdlTnVtYmVyKys7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZW5kZXJSb3coaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbmV3Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVFInKSxcblx0XHRcdGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBuZXdUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1REJyksXG5cdFx0XHRcdGZpZWxkID0gZmllbGRzW2ldLFxuXHRcdFx0XHRwcmVwcm9jZXNzZWQgPSBudWxsLFxuXHRcdFx0XHR2YWwgPSBub3RQYXRoLmdldChmaWVsZC5wYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2VkaXRhYmxlJykgJiYgIWZpZWxkLmhhc093blByb3BlcnR5KCdjb21wb25lbnQnKSkge1xuXHRcdFx0XHRuZXdUZC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRFZGl0YWJsZScsIHRydWUpO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0LnBhdGggPSBmaWVsZC5wYXRoO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0Lml0ZW1JZCA9IGl0ZW1bdGhpcy5nZXRPcHRpb25zKCdpdGVtSWRGaWVsZCcpXTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC52YWx1ZSA9IHZhbDtcblx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpPT57XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksIG5ld1RkLnRleHRDb250ZW50KTtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eShPUFRfRklFTERfTkFNRV9QUkVfUFJPQykpIHtcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gZmllbGRbT1BUX0ZJRUxEX05BTUVfUFJFX1BST0NdKHZhbCwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHRcdG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRcdGRhdGE6IGZpZWxkLmNvbXBvbmVudC5kYXRhIHx8IHByZXByb2Nlc3NlZCB8fCB7dmFsLCBpdGVtLCBpbmRleH0sXG5cdFx0XHRcdFx0dGVtcGxhdGU6IGZpZWxkLmNvbXBvbmVudC50ZW1wbGF0ZSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogbmV3VGQsXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBmaWVsZC5jb21wb25lbnQuZXZlbnRzIHx8IFtdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3VGQuaW5uZXJIVE1MID0gcHJlcHJvY2Vzc2VkIHx8IHZhbDtcblx0XHRcdH1cblxuXHRcdFx0aWYoZmllbGQuaGFzT3duUHJvcGVydHkoJ3N0eWxlJykpe1xuXHRcdFx0XHRmb3IobGV0IHN0eWxlIGluIGZpZWxkLnN0eWxlKXtcblx0XHRcdFx0XHRpZihmaWVsZC5zdHlsZS5oYXNPd25Qcm9wZXJ0eShzdHlsZSkpe1xuXHRcdFx0XHRcdFx0bmV3VGQuc3R5bGVbc3R5bGVdID0gZmllbGQuc3R5bGVbc3R5bGVdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2V2ZW50cycpICYmIGZpZWxkLmV2ZW50cykge1xuXHRcdFx0XHRmb3IgKHZhciBqIGluIGZpZWxkLmV2ZW50cykge1xuXHRcdFx0XHRcdG5ld1RkLmFkZEV2ZW50TGlzdGVuZXIoaiwgKGUpPT57XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmllbGQuZXZlbnRzW2pdKHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQ6IGUsXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQ6IG5ld1RkLFxuXHRcdFx0XHRcdFx0XHRpdGVtOiBpdGVtLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdmFsLFxuXHRcdFx0XHRcdFx0XHRmaWVsZDogZmllbGRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bmV3Um93LmFwcGVuZENoaWxkKG5ld1RkKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygncHJvY1JvdycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcm9jUm93JykobmV3Um93LCBpdGVtKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Jvdztcblx0fVxuXG5cdHJlZnJlc2hCb2R5KCkge1xuXHRcdHZhciB0Ym9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRib2R5KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuY2xlYXJCb2R5KCk7XG5cdFx0dGhpcy5jaGVja0ZpbHRlcmVkKCk7XG5cdFx0dmFyIHRoaXNQYWdlU3RhcnRzID0gMCxcblx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpO1xuXHRcdGZvciAodmFyIGkgPSB0aGlzUGFnZVN0YXJ0czsgaSA8IE1hdGgubWluKG5leHRQYWdlRW5kcywgdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5sZW5ndGgpOyBpKyspIHtcblx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHR9XG5cdH1cblxuXHRmaW5kQm9keSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG5cdH1cblxuXHRjbGVhckJvZHkoKSB7XG5cdFx0dmFyIHRhYmxlQm9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRhYmxlQm9keSkgcmV0dXJuO1xuXHRcdHRhYmxlQm9keS5pbm5lckhUTUwgPSAnJztcblx0fVxuXG5cdGNoZWNrRmlsdGVyZWQoKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKSkpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLFtdKTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJCb2R5KCkge1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpKSB7XG5cdFx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdH1cblx0XHR0aGlzLmNoZWNrRmlsdGVyZWQoKTtcblx0XHR2YXIgdGhpc1BhZ2VTdGFydHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpLFxuXHRcdFx0bmV4dFBhZ2VFbmRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyICsgMSksXG5cdFx0XHR0Ym9keSA9IHRoaXMuZmluZEJvZHkoKTtcblxuXHRcdGZvciAodmFyIGkgPSB0aGlzUGFnZVN0YXJ0czsgaSA8IE1hdGgubWluKG5leHRQYWdlRW5kcywgdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5sZW5ndGgpOyBpKyspIHtcblx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHR9XG5cdH1cblxuXHR0ZXN0RGF0YUl0ZW0oaXRlbSl7XG5cdFx0dmFyIHN0clZhbHVlID0gdGhpcy5nZXRGaWx0ZXJTZWFyY2goKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGZvcih2YXIgayBpbiBpdGVtKXtcblx0XHRcdHZhciB0b0NvbXAgPSBpdGVtW2tdLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmICh0b0NvbXAuaW5kZXhPZihzdHJWYWx1ZSk+LTEpe1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFRhYmxlO1xuIiwiaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4uL2NvbXBvbmVudHMvbm90VGFibGUuanMnO1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9QX0RFRkFVTFRfUEFHRV9TSVpFID0gNTAsXG5cdE9QVF9ERUZBVUxUX1ZJRVcgPSAnbGlzdCc7XG5cbmNsYXNzIENSVURMaXN0IGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKSB7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgTGlzdCcpO1xuXHRcdHRoaXMuc2V0Vmlld3Moe1xuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRuYW1lOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0Lm5hbWUnKSB8fCBPUFRfREVGQVVMVF9WSUVXLFxuXHRcdFx0XHRjb21tb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuY29tbW9uJykgfHwgdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0UXVlcnk6IHBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmNvbnRhaW5lclNlbGVjdG9yJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSxcblx0XHRcdFx0aGVscGVyczoge31cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlcldyYXBwZXIuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMudXBkYXRlRGF0YXRhYmxlLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0Jywge30sIHtcblx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5wbHVyYWwnKSxcblx0XHRcdHNob3dBZGRGb3JtOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZShbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpLCAnY3JlYXRlJ10uam9pbignLycpKTtcblx0XHRcdH0sXG5cdFx0XHRnZXRMaW5rVG9WaWV3OiAoKSA9PiB7XG5cdFx0XHRcdHJldHVybiAnLycgKyB0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVEYXRhdGFibGUoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeXtcblx0XHRcdFx0dGhpcy50YWJsZVZpZXcgPSBuZXcgbm90VGFibGUoe1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGZpZWxkczogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5maWVsZHMnKSxcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ25hbWVzLnBsdXJhbCcpXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmhlbHBlcnMnKSB8fCB7fSksXG5cdFx0XHRcdFx0XHRwYWdlU2l6ZTogdGhpcy5hcHAuZ2V0T3B0aW9ucygncGFnZXIuc2l6ZScpIHx8IE9QX0RFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0XHRcdFx0cGFnZU51bWJlcjogMCxcblx0XHRcdFx0XHRcdG9uZVBhZ2VyOiB0cnVlLFxuXHRcdFx0XHRcdFx0bGl2ZUxvYWQ6IHRydWUsXG5cdFx0XHRcdFx0XHRpbnRlcmZhY2U6IHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHNob3dOZXh0UGFnZSgpIHtcblx0XHRpZiAodGhpcy50YWJsZVZpZXcpIHtcblx0XHRcdHRoaXMudGFibGVWaWV3LmxvYWROZXh0KCk7XG5cdFx0fVxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRExpc3Q7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvbm90Rm9ybS5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OID0gJ2dldFJhdycsXG5cdE9QVF9ERUZBVUxUX0FDVElPTiA9ICd1cGRhdGUnLFxuXHRPUFRfREVGQVVMVF9WSUVXID0gJ2VkaXQnO1xuXG5jbGFzcyBDUlVEVXBkYXRlIGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKSB7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgVXBkYXRlJyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuY29tbW9uJykgfHwgdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG5cdFx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMubG9hZEl0ZW0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlckZvcm0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bG9hZEl0ZW0oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKHtcblx0XHRcdCdfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJylcblx0XHR9KVsnJCcrKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5sb2FkQWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04pXSgpO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoJ2RlZmF1bHQnLCB0aGlzLmdldERhdGEoKSwge30pO1xuXHR9XG5cblx0cmVuZGVyRm9ybSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHRyeXtcblx0XHRcdFx0dGhpcy5mb3JtID0gbmV3IG5vdEZvcm0oe1xuXHRcdFx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGFjdGlvbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0FDVElPTixcblx0XHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRcdHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnByZWZpeCcpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdwcmVmaXgnKSxcblx0XHRcdFx0XHRcdHJvbGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5yb2xlJyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcblx0XHRcdFx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0XHRcdFx0aGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRcdGZpbGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgZmlsZXMgPSBwYXJhbXMuZS50YXJnZXQuZmlsZXMgfHwgcGFyYW1zLmUuZGF0YVRyYW5zZmVyLmZpbGVzO1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2ZpbGUgY2hhbmdlZCcsIGZpbGVzKTtcblx0XHRcdFx0XHRcdFx0XHRpZihwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lICYmIGZpbGVzKXtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucXVlZVVwbG9hZChwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRzdWJtaXQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdzdWJtaXQgZm9ybSAnLCBwYXJhbXMuaXRlbSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5leGVjVXBsb2FkcyhwYXJhbXMuaXRlbSlcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRsaWJzOiB0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKSxcblx0XHRcdFx0XHRcdFx0YWZ0ZXJTdWJtaXQ6IHRoaXMuYmFja1RvTGlzdC5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdFx0fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmhlbHBlcnMnKSB8fCB7fSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0XHRbJ2FmdGVyUmVzdG9yZScsICdhZnRlclN1Ym1pdCddLCB0aGlzLmJhY2tUb0xpc3QuYmluZCh0aGlzKVxuXHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHVwZGF0ZShpdGVtKSB7XG5cdFx0aXRlbVsnJCcrKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5hY3Rpb24nKXx8T1BUX0RFRkFVTFRfQUNUSU9OKV0oKVxuXHRcdFx0LnRoZW4oKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24ubG9nKCdmb3JtIHNhdmVkJywgcmVzdWx0KTtcblx0XHRcdFx0dGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMuZ2V0TW9kdWxlTmFtZSgpKTtcblx0XHRcdFx0dGhpcy5wYXJlbnQucnVuTGlzdCgpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZm9ybSBub3Qgc2F2ZWQnLCByZXN1bHQpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRiYWNrVG9MaXN0KCkge1xuXHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURVcGRhdGU7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BUX0RFRkFVTFRfQUNUSU9OID0gJ2RlbGV0ZSc7XG5cbmNsYXNzIENSVUREZWxldGUgZXh0ZW5kcyBub3RDb250cm9sbGVye1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcyl7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgRGVsZXRlJyk7XG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRlbGV0ZS5wcmVsb2FkJykpXG5cdFx0XHQudGhlbigoKT0+e1xuXHRcdFx0XHRpZiAoY29uZmlybSgn0KPQtNCw0LvQuNGC0Ywg0LfQsNC/0LjRgdGMPycpKSB7XG5cdFx0XHRcdFx0dGhpcy5kZWxldGUoKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dGhpcy5iYWNrVG9MaXN0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRiYWNrVG9MaXN0KCl7XG5cdFx0dGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSk7XG5cdH1cblxuXHRkZWxldGUoKSB7XG5cdFx0bGV0IGFjdGlvbiA9JyQnKyh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZWxldGUuYWN0aW9uJyl8fE9QVF9ERUZBVUxUX0FDVElPTik7XG5cdFx0dGhpcy5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0oeydfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJyl9KVthY3Rpb25dKClcblx0XHRcdC50aGVuKHRoaXMuYmFja1RvTGlzdC5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRERlbGV0ZTtcbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYID0gJ2RldGFpbHNfJyxcblx0T1BUX0RFRkFVTFRfUk9MRV9OQU1FID0gJ2RlZmF1bHQnLFxuXHRPUFRfREVGQVVMVF9ERVRBSUxTX1RJVExFID0gJ0RldGFpbHMgZGVmYXVsdCB0aXRsZScsXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04gPSB7fSxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QgPSBbJ29wdGlvbnMnLCAnbWFuaWZlc3QnLCAnYXBwJ107XG5cbmNsYXNzIG5vdERldGFpbHMgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpKSB7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3ByZWZpeCcsIE9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjb21wb25lbnRzJywgW10pO1xuXHRcdGlmICghdGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuc2V0RGF0YShuZXcgbm90UmVjb3JkKHt9LCB0aGlzLmdldERhdGEoKSkpO1xuXHRcdH1cblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCk7XG5cdH1cblxuXHRnZXRBY3Rpb25EYXRhKCkge1xuXHRcdGxldCBtYW5pZmVzdCA9IHRoaXMuZ2V0TWFuaWZlc3QoKTtcblx0XHRpZiAobWFuaWZlc3QgJiYgbWFuaWZlc3QuYWN0aW9ucykge1xuXHRcdFx0cmV0dXJuIG1hbmlmZXN0LmFjdGlvbnMuaGFzT3duUHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKSkgPyBtYW5pZmVzdC5hY3Rpb25zW3RoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJyldIDogbnVsbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlzdCgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0cm9sZSA9IHRoaXMuZ2V0T3B0aW9ucygncm9sZScsIE9QVF9ERUZBVUxUX1JPTEVfTkFNRSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpIHtcblx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcykge1xuXHRcdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMuaGFzT3duUHJvcGVydHkocm9sZSkpIHtcblx0XHRcdFx0XHRsaXN0ID0gYWN0aW9uRGF0YS5maWVsZHNbcm9sZV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5yZW5kZXJXcmFwcGVyKCk7XG5cdH1cblxuXHRnZXRQYXJ0VGVtcGxhdGVOYW1lKGZvcm1QYXJ0KXtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIGZvcm1QYXJ0O1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgaW5wdXQgPSB7XG5cdFx0XHRcdGRhdGE6IHRoaXMuZ2V0V3JhcHBlckRhdGEoKSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoJ3dyYXBwZXInKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSxcblx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpLFxuXHRcdFx0XHRcdGlkOiB0aGlzLmdldE9wdGlvbnMoJ2lkJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOltcblx0XHRcdFx0XHRbWydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fTtcblx0XHRcdGxldCB3cmFwcGVyID0gbmV3IG5vdENvbXBvbmVudChpbnB1dCk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3dyYXBwZXInLCB3cmFwcGVyKTtcblx0XHR9XG5cdH1cblxuXHRnZXRXcmFwcGVyRGF0YSgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpO1xuXHRcdHJldHVybiB7XG5cdFx0XHR0aXRsZTogYWN0aW9uRGF0YS50aXRsZSA/IGFjdGlvbkRhdGEudGl0bGUgOiBPUFRfREVGQVVMVF9ERVRBSUxTX1RJVExFXG5cdFx0fTtcblx0fVxuXG5cdHJlbmRlckNvbXBvbmVudHMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpICYmIHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aCl7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRGaWVsZHNMaXN0KCkubGVuZ3RoOyB0Kyspe1xuXHRcdFx0XHRsZXQgZmllbGROYW1lID0gdGhpcy5nZXRGaWVsZHNMaXN0KClbdF07XG5cdFx0XHRcdHRoaXMuYWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGVhckZpZWxkc0NvbXBvbmVudHMoKSB7XG5cdFx0bGV0IGNvbXBzID0gdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJyk7XG5cdFx0d2hpbGUgKGNvbXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbXBzWzBdLmNvbXBvbmVudC5kZXN0cm95KCk7XG5cdFx0XHRjb21wcy5zcGxpY2UoMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlicygpe1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRvcHRpb25zOiB7fSxcblx0XHRcdG1hbmlmZXN0OiB7fSxcblx0XHRcdGFwcDoge30sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAobm90Q29tbW9uLmdldEFwcCgpICYmIG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKSl7XG5cdFx0XHRyZXN1bHQuYXBwID0gbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQgJiYgdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKSl7XG5cdFx0XHRyZXN1bHQubWFuaWZlc3QgPSB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpLmZpZWxkcztcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSB7XG5cdFx0bGV0IGRlZiA9IE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04sXG5cdFx0XHRmaWVsZHNMaWJzID0gdGhpcy5nZXRGaWVsZHNMaWJzKCk7XG5cdFx0Zm9yKGxldCB0IG9mIE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUKXtcblx0XHRcdGlmIChmaWVsZHNMaWJzLmhhc093blByb3BlcnR5KHQpICYmIGZpZWxkc0xpYnNbdF0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSl7XG5cdFx0XHRcdHJldHVybiBmaWVsZHNMaWJzW3RdW2ZpZWxkTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkZWY7XG5cdH1cblxuXHRhZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpIHtcblx0XHRsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSksXG5cdFx0XHRyZWMgPSBudWxsO1xuXHRcdGlmKGZpZWxkVHlwZS5jb21wb25lbnQpe1xuXHRcdFx0cmVjID0gdGhpcy5jYXN0Q3VzdG9tKGZpZWxkTmFtZSwgZmllbGRUeXBlKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJlYyA9IHRoaXMuY2FzdENvbW1vbihmaWVsZE5hbWUsIGZpZWxkVHlwZSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGNhc3RDdXN0b20oZmllbGROYW1lLCBmaWVsZFR5cGUpe1xuXHRcdGxldCBDdXN0b21Db21wb25lbnQgPSBub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgnY29tcG9uZW50cycpW2ZpZWxkVHlwZS5jb21wb25lbnRdO1xuXHRcdGxldCByZWMgPSB7XG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRuYW1lOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHRpdGxlOiBmaWVsZFR5cGUubGFiZWwgfHwgZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHR0eXBlOiBmaWVsZFR5cGUudHlwZSxcblx0XHRcdFx0bGFiZWw6IGZpZWxkVHlwZS5sYWJlbCxcblx0XHRcdFx0YXJyYXk6IGZpZWxkVHlwZS5hcnJheSxcblx0XHRcdFx0ZGVmYXVsdDogZmllbGRUeXBlLmRlZmF1bHQsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ2hlbHBlcnMnLCdsaWJzJyxmaWVsZE5hbWUpKVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0bGV0IGhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdGlzQ2hlY2tlZDogKHBhcmFtcykgPT4ge1xuXHRcdFx0XHRyZXR1cm4gcGFyYW1zLml0ZW0udmFsdWUgPT09IHRoaXMuZ2V0RGF0YShmaWVsZE5hbWUpO1xuXHRcdFx0fSxcblx0XHRcdGZpZWxkOiByZWMuZmllbGQsXG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKVxuXHRcdH0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblxuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgQ3VzdG9tQ29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRUYXJnZXRFbGVtZW50KGZpZWxkVHlwZS50YXJnZXQpLFxuXHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUxhc3QnXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlYztcblx0fVxuXG5cdGNhc3RDb21tb24oZmllbGROYW1lLCBmaWVsZFR5cGUpe1xuXHRcdGxldCByZWMgPSB7XG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRuYW1lOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHRpdGxlOiBmaWVsZFR5cGUubGFiZWwgfHwgZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHR0eXBlOiBmaWVsZFR5cGUudHlwZSxcblx0XHRcdFx0bGFiZWw6IGZpZWxkVHlwZS5sYWJlbCxcblx0XHRcdFx0YXJyYXk6IGZpZWxkVHlwZS5hcnJheSxcblx0XHRcdFx0ZGVmYXVsdDogZmllbGRUeXBlLmRlZmF1bHQsXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucyhub3RQYXRoLmpvaW4oJ2hlbHBlcnMnLCdsaWJzJyxmaWVsZE5hbWUpKVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0bGV0IGhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdGlzQ2hlY2tlZDogKHBhcmFtcykgPT4ge1xuXHRcdFx0XHRyZXR1cm4gcGFyYW1zLml0ZW0udmFsdWUgPT09IHRoaXMuZ2V0RGF0YShmaWVsZE5hbWUpO1xuXHRcdFx0fSxcblx0XHRcdGZpZWxkOiByZWMuZmllbGQsXG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKVxuXHRcdH0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblx0XHRyZWMuY29tcG9uZW50ID0gbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZShmaWVsZFR5cGUudHlwZSlcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldFRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCdcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gcmVjO1xuXHR9XG5cblx0Z2V0VGFyZ2V0RWxlbWVudCh0YXJnZXQgPSAnYm9keScpe1xuXHRcdGlmICghdGFyZ2V0KXt0YXJnZXQgPSAnYm9keSc7fVxuXHRcdGxldCByZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdGlmICghcmVzICYmIHRhcmdldCE9PSdib2R5Jyl7XG5cdFx0XHR0YXJnZXQgPSAnYm9keSc7XG5cdFx0XHRyZXMgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignW3JvbGU9XCInICsgdGFyZ2V0ICsgJ1wiXScpO1xuXHRcdH1cblx0XHRpZighcmVzICYmIHRhcmdldD09J2JvZHknKXtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gcmVzO1xuXHRcdH1cblx0fVxuXG5cdC8qXG5cdFx0RGF0YSBtYW5hZ2VtZW50XG5cdCovXG5cblx0dXBkYXRlRmllbGQoZmllbGROYW1lKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmZpZWxkLm5hbWUgPT09IGZpZWxkTmFtZSl7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR1cGRhdGUoKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdH1cblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdERldGFpbHM7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3REZXRhaWxzIGZyb20gJy4uL2NvbXBvbmVudHMvbm90RGV0YWlscy5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OID0gJ2dldCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVcgPSAnZGV0YWlscyc7XG5cbmNsYXNzIENSVUREZXRhaWxzIGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKSB7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgRGV0YWlscycpO1xuXHRcdHRoaXMuc2V0Vmlld3Moe1xuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRuYW1lOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLm5hbWUnKSB8fCBPUFRfREVGQVVMVF9WSUVXLFxuXHRcdFx0XHRjb21tb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMuY29tbW9uJykgfHwgdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuXHRcdFx0XHRoZWxwZXJzOiB7fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMucHJlbG9hZCcpKVxuXHRcdFx0LnRoZW4odGhpcy5sb2FkSXRlbS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5zZXREYXRhLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlcldyYXBwZXIuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyRGV0YWlscy5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRsb2FkSXRlbSgpIHtcblx0XHRyZXR1cm4gdGhpcy5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0oe1xuXHRcdFx0J19pZCc6IHRoaXMuZ2V0T3B0aW9ucygncGFyYW1zLjAnKVxuXHRcdH0pWyckJyArICh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OKV0oKTtcblx0fVxuXG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRsZXQgaXRlbSA9IHRoaXMuZ2V0RGF0YSgpO1xuXHRcdHZhciBoZWxwZXJzID0ge1xuXHRcdFx0SUQ6IGl0ZW0gPyBpdGVtW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSArICdJRCddIDogJycsXG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRhcnJheTogZmFsc2Vcblx0XHRcdH0sXG5cdFx0XHR1cGRhdGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0dGhpcy5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUoW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSwgcGFyYW1zLml0ZW0uX2lkLCAndXBkYXRlJ10uam9pbignLycpKTtcblx0XHRcdH0sXG5cdFx0XHRkZWxldGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0dGhpcy5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUoW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSwgcGFyYW1zLml0ZW0uX2lkLCAnZGVsZXRlJ10uam9pbignLycpKTtcblx0XHRcdH0sXG5cdFx0XHRnZXRMaW5rVG9UYWJsZTogKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hcHAuZ2V0V29ya2luZygncm91dGVyJykuZ2V0RnVsbFJvdXRlKHRoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSk7XG5cdFx0XHR9LFxuXHRcdFx0dGl0bGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ25hbWVzLnNpbmdsZScpXG5cdFx0fTtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoJ2RlZmF1bHQnLCBpdGVtLCBoZWxwZXJzKTtcblx0fVxuXG5cdHJlbmRlckRldGFpbHMoKSB7XG5cdFx0bGV0IGl0ZW0gPSB0aGlzLmdldERhdGEoKTtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0bmV3IG5vdERldGFpbHMoe1xuXHRcdFx0XHRcdGRhdGE6IGl0ZW0sXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMudGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG5cdFx0XHRcdFx0XHRhY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04sXG5cdFx0XHRcdFx0XHRwcmVmaXg6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMucHJlZml4Jyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuXHRcdFx0XHRcdFx0cm9sZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5yb2xlJyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0XHRcdFx0XHRsaWJzOiB0aGlzLmdldE9wdGlvbnMoJ2xpYicpLFxuXHRcdFx0XHRcdFx0XHRJRDogaXRlbVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkgKyAnSUQnXSxcblx0XHRcdFx0XHRcdFx0X192ZXJzaW9uOiBpdGVtLl9fdmVyc2lvbixcblx0XHRcdFx0XHRcdH0sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMuaGVscGVycycpIHx8IHt9KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRiYWNrVG9MaXN0KCkge1xuXHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVERGV0YWlscztcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IENSVURDcmVhdGUgZnJvbSAnLi9DcmVhdGUnO1xuaW1wb3J0IENSVURMaXN0IGZyb20gJy4vTGlzdCc7XG5pbXBvcnQgQ1JVRFVwZGF0ZSBmcm9tICcuL1VwZGF0ZSc7XG5pbXBvcnQgQ1JVRERlbGV0ZSBmcm9tICcuL0RlbGV0ZSc7XG5pbXBvcnQgQ1JVRERldGFpbHMgZnJvbSAnLi9EZXRhaWxzJztcblxuXG5jbGFzcyBDUlVEQ29udHJvbGxlciBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihhcHAsIHBhcmFtcykge1xuXHRcdG5vdENvbW1vbi5sb2coJ3J1bm5pbmcgQ1JVRENvbnRyb2xsZXInKTtcblx0XHRzdXBlcihhcHApO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbmFtZXMnLCB7XG5cdFx0XHRwbHVyYWw6ICdwbHVyYWwnLFxuXHRcdFx0c2luZ2xlOiAnc2luZ2xlJyxcblx0XHR9KTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicsIHRoaXMuYXBwLmdldE9wdGlvbnMoJ2NydWQuY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyb3V0ZShwYXJhbXMgPSBbXSl7XG5cdFx0aWYocGFyYW1zLmxlbmd0aD09MSl7XG5cdFx0XHRpZihwYXJhbXNbMF0gPT09ICdjcmVhdGUnKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMucnVuQ3JlYXRlKHBhcmFtcyk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRoaXMucnVuRGV0YWlscyhwYXJhbXMpO1xuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKHBhcmFtcy5sZW5ndGggPT0gMil7XG5cdFx0XHRpZiAocGFyYW1zWzFdID09PSAnZGVsZXRlJyl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1bkRlbGV0ZShwYXJhbXMpO1xuXHRcdFx0fWVsc2UgaWYocGFyYW1zWzFdID09PSAndXBkYXRlJyl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1blVwZGF0ZShwYXJhbXMpO1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRsZXQgcm91dGVSdW5uZXJOYW1lID0gJ3J1bicgKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHBhcmFtc1sxXSk7XG5cdFx0XHRcdGlmKHRoaXNbcm91dGVSdW5uZXJOYW1lXSAmJiB0eXBlb2YgdGhpc1tyb3V0ZVJ1bm5lck5hbWVdID09PSAnZnVuY3Rpb24nKXtcblx0XHRcdFx0XHRyZXR1cm4gdGhpc1tyb3V0ZVJ1bm5lck5hbWVdKHBhcmFtcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMucnVuTGlzdChwYXJhbXMpO1xuXHR9XG5cblx0cnVuQ3JlYXRlKHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRENyZWF0ZSh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuTGlzdChwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVURMaXN0KHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5EZXRhaWxzKHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRERldGFpbHModGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bkRlbGV0ZShwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVUREZWxldGUodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1blVwZGF0ZShwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVURVcGRhdGUodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG9uQWZ0ZXJSZW5kZXIoKXtcblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoLmpzJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi4vbm90Um91dGVyJztcblxudmFyIG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiA9IHtcblx0Y29udGVudDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmluZGV4T2YoJ2NhcGl0YWxpemUnKSA+IC0xKSB7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQudG9VcHBlckNhc2UoKTtcblx0XHR9XG5cdFx0c2NvcGUuZWxlbWVudC50ZXh0Q29udGVudCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdDtcblx0fSxcblx0YmluZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5iaW5kcyl7XG5cdFx0XHRpZihzY29wZS5lbGVtZW50LmJpbmRzLmhhc093blByb3BlcnR5KHNjb3BlLnBhcmFtc1swXSkpe1xuXHRcdFx0XHRpZihzY29wZS5lbGVtZW50LmJpbmRzW3Njb3BlLnBhcmFtc1swXV0uaW5kZXhPZihzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uKSA+IC0xKXtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0cmV0dXJuIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCh7XG5cdFx0XHRcdFx0c2NvcGUsXG5cdFx0XHRcdFx0aXRlbSxcblx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdGVcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRpZighc2NvcGUuZWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnYmluZHMnKSl7XG5cdFx0XHRzY29wZS5lbGVtZW50LmJpbmRzID0ge307XG5cdFx0fVxuXHRcdGlmKCFzY29wZS5lbGVtZW50LmJpbmRzLmhhc093blByb3BlcnR5KHNjb3BlLnBhcmFtc1swXSkpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5iaW5kc1tzY29wZS5wYXJhbXNbMF1dID0gW107XG5cdFx0fVxuXHRcdGlmKHNjb3BlLmVsZW1lbnQuYmluZHNbc2NvcGUucGFyYW1zWzBdXS5pbmRleE9mKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24pID09PSAtMSl7XG5cdFx0XHRzY29wZS5lbGVtZW50LmJpbmRzW3Njb3BlLnBhcmFtc1swXV0ucHVzaChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uKTtcblx0XHR9XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBsaXZlRXZlbnRzID0gWydjaGFuZ2UnLCAna2V5dXAnXSxcblx0XHRcdG9uRXZlbnQgPSAoKSA9PiB7XG5cdFx0XHRcdGlmIChbJ2NoZWNrYm94JywgJ3JhZGlvJywgJ3NlbGVjdC1tdWx0aXBsZSddLmluZGV4T2Yoc2NvcGUuZWxlbWVudC50eXBlKSA+IC0xKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChzY29wZS5lbGVtZW50LnR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdyYWRpbyc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZD9zY29wZS5lbGVtZW50LnZhbHVlOm51bGwpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkID8gc2NvcGUuZWxlbWVudC52YWx1ZSA6IG51bGwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnc2VsZWN0LW11bHRpcGxlJzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bGV0IHNlbGVjdGVkID0gW10uc2xpY2UuY2FsbChzY29wZS5lbGVtZW50LnNlbGVjdGVkT3B0aW9ucykubWFwKGEgPT4gYS52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coJ3NlbGVjdC1tdWx0aXBsZScsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2cobm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyksICcgLT4gJyxzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgIT09IHRydWUpIHtcblx0XHRcdGlmKHNjb3BlLmVsZW1lbnQudHlwZSA9PT0gJ3RleHRhcmVhJyl7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGxldCB0IG9mIGxpdmVFdmVudHMpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHQsIG9uRXZlbnQpO1xuXHRcdFx0fVxuXHRcdFx0c2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSA9IHRydWU7XG5cdFx0fVxuXHR9LFxuXHRhdHRyOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSB8fCBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpID8gcmVzKHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlcyk7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoc2NvcGUucGFyYW1zWzBdLCBzY29wZS5hdHRyaWJ1dGVSZXN1bHQpO1xuXHR9LFxuXHRuYW1lOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKCAvKnNjb3BlLCBpdGVtLCBoZWxwZXJzKi8gKSB7XG5cblx0fSxcblx0Y2hlY2tlZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzdWx0ID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzdWx0ID09PSAnZnVuY3Rpb24nKSA/IHJlc3VsdCh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXN1bHQpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA/IHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgdHJ1ZSkgOiBzY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuXHR9LFxuXHRjbGFzczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKSA/IHJlcyh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoIDwgMyB8fCBpc05hTihzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKSB7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCB1c2VkID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNjb3BlLnBhcmFtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoaSA9PT0gc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdFx0dXNlZCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICghdXNlZCkge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdG9wdGlvbnM6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0b3B0aW9uID0gbnVsbCxcblx0XHRcdHZhbHVlRmllbGROYW1lID0gJ3ZhbHVlJyxcblx0XHRcdGxhYmVsRmllbGROYW1lID0gJ25hbWUnLFxuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGQnKSAmJiBoZWxwZXJzLmZpZWxkLmhhc093blByb3BlcnR5KCduYW1lJykgPyBoZWxwZXJzLmZpZWxkLm5hbWUgOiAndmFsdWUnO1xuXHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzJdO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIGhlbHBlcnMgIT09IG51bGwgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpICYmIGhlbHBlcnMuZGVmYXVsdCkge1xuXHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsICcnKTtcblx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGhlbHBlcnMucGxhY2Vob2xkZXI7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0dmFyIGxpYiA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxpYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKTtcblx0XHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gbGliW2ldW2xhYmVsRmllbGROYW1lXTtcblx0XHRcdFx0aWYgKGhlbHBlcnMuZmllbGQuYXJyYXkpIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdICYmIEFycmF5LmlzQXJyYXkoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdKSl7XG5cdFx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdLmluZGV4T2YobGliW2ldW3ZhbHVlRmllbGROYW1lXSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdID09PSBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSB7XG5cdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRocmVmOmZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRpZiAoIXNjb3BlLmVsZW1lbnQubm90Um91dGVySW5pdGlhbGl6ZWQpe1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIG5vdFJvdXRlci5nZXRGdWxsUm91dGUoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSk7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0bm90Um91dGVyLm5hdmlnYXRlKG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0XHRzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxufTtcbmV4cG9ydCBkZWZhdWx0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYjtcbiIsIi8qXG5cdENvbW1vbiBmdW5jdGlvbnNcbiovXG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbi8qXG5cdGZyYW1ld29yayB3aWRlIHBhcnNlciBmb3IgZGF0YSBhY2Nlc3NcbiovXG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuL25vdFJvdXRlcic7XG5cbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuLypcblx0YmFzaWMgZXZlbnQgaGFuZGxlcnMgYW5kIGNvcmUgZGF0YSBtb2RpZmllcnNcbiovXG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuLypcblx0c21hcnRlciBpbWFnZSBjb250cm9sXG4qL1xuaW1wb3J0IG5vdEltYWdlIGZyb20gJy4vdGVtcGxhdGUvbm90SW1hZ2UnO1xuLypcblx0YXBwbGljYXRpb24gbWFpbiBpbmZyYXN0cnVjdHVyZSBzZXR0ZXJcbiovXG5pbXBvcnQgbm90QXBwIGZyb20gJy4vbm90QXBwJztcbi8qXG5cdHVzZXIgY29udHJvbGxlcnNcbiovXG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuL25vdENvbnRyb2xsZXInO1xuXG5pbXBvcnQge0NSVURDb250cm9sbGVyLENSVURDcmVhdGUsQ1JVRERlbGV0ZSxDUlVERGV0YWlscyxDUlVETGlzdCxDUlVEVXBkYXRlfSBmcm9tICcuL0NSVUQnO1xuXG4vKlxuXHR0ZW1wbGF0aW5nIGFuZCBjb21tb24gc3RydWN0dXJlc1xuKi9cblxuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vdGVtcGxhdGUvbm90UmVuZGVyZXInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JzsgLy8gc21hcnRlciB3aXRoIGJpbmRpbmdzIGZvciBldmVudHMsIGFjdHVhbHkgcHJveHlcblxuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi9jb21wb25lbnRzL25vdEZvcm0nO1xuaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4vY29tcG9uZW50cy9ub3RUYWJsZSc7XG5pbXBvcnQgbm90RGV0YWlscyBmcm9tICcuL2NvbXBvbmVudHMvbm90RGV0YWlscyc7XG5cbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnOyAvL1x0aG93IHRvIGludGVyYWN0IHdpdGggZGF0YSBvbiBzZXJ2ZXJcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnOyAvL1x0d3JhcHBlciBmb3IgZGF0YSB3aXRoIHNlcnZlcjwtPnZpZXcgbGl2ZSBpbnRlcmFjdGlvbnNcblxubm90VGVtcGxhdGVQcm9jZXNzb3JzLmFkZChub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIpO1xuXG5leHBvcnQge1xuXHRub3RDb21tb24sXG5cdG5vdFBhdGgsXG5cdG5vdEJhc2UsXG5cdG5vdEltYWdlLFxuXHRub3RBcHAsXG5cdG5vdEFQSSxcblx0bm90Q29udHJvbGxlcixcblx0Q1JVRENvbnRyb2xsZXIsXG5cdENSVURDcmVhdGUsXG5cdENSVUREZWxldGUsXG5cdENSVUREZXRhaWxzLFxuXHRDUlVETGlzdCxcblx0Q1JVRFVwZGF0ZSxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIsXG5cdG5vdFRlbXBsYXRlQ2FjaGUsXG5cdG5vdFJlbmRlcmVyLFxuXHRub3RDb21wb25lbnQsXG5cdG5vdEZvcm0sXG5cdG5vdFJvdXRlcixcblx0bm90VGFibGUsXG5cdG5vdERldGFpbHMsXG5cdG5vdFJlY29yZCxcblx0bm90UmVjb3JkSW50ZXJmYWNlXG59O1xuIl0sIm5hbWVzIjpbIkNvbW1vbk5ldHdvcmsiLCJ1cmkiLCJnZXQiLCJkYXRhQXJyYXkiLCJmaWVsZHMiLCJpIiwiZiIsImhhc093blByb3BlcnR5IiwiaW1hZ2UiLCJJbWFnZSIsInNldEF0dHJpYnV0ZSIsInNyYyIsImluZGV4T2YiLCJhZGRQcm90b2NvbCIsInVwbG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvblByb2dyZXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3BvbnNlVHlwZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsIndpdGhDcmVkZW50aWFscyIsIm9wZW4iLCJ1cmwiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZ2V0U2Vzc2lvbklEIiwiZmlsZSIsInR5cGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJuYW1lIiwic2VuZCIsIm1ldGhvZCIsImRhdGEiLCJvbmxvYWQiLCJ0Iiwib25lcnJvciIsIm9udGltZW91dCIsInBhcnNlSW50IiwicmVzcG9uc2VUZXh0IiwiZSIsImdldENvb2tpZSIsInZhbHVlIiwiZG9jdW1lbnQiLCJjb29raWUiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwicG9wIiwic2hpZnQiLCJMT0ciLCJDb21tb25Mb2dzIiwibm90RnJhbWV3b3JrIiwibm90Q29tbW9uIiwiZXJyb3IiLCJhcmd1bWVudHMiLCJsb2ciLCJ0cmFjZSIsIk1BTkFHRVIiLCJTeW1ib2wiLCJDb21tb25TaG9ydHMiLCJnZXRNYW5hZ2VyIiwiZ2V0QVBJIiwidiIsIkNvbW1vbk9iamVjdHMiLCJkZWZhdWx0cyIsIm9wdGlvbnMiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0Iiwic291cmNlcyIsImZvckVhY2giLCJkZXNjcmlwdG9ycyIsImtleXMiLCJzb3VyY2UiLCJyZWR1Y2UiLCJrZXkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJkZXNjcmlwdG9yIiwic3ltIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJiaWciLCJzbWFsbCIsIm9iaiIsImZpbHRlciIsImNvbnRhaW5zT2JqIiwiaWNvbnMiLCJiYXRjaCIsImdldERhdGEiLCJwdXNoIiwiYSIsImIiLCJwIiwiZXF1YWwiLCJ0b1N0cmluZyIsImRlZmF1bHRWYWx1ZSIsIm9iajEiLCJvYmoyIiwialF1ZXJ5IiwiZXh0ZW5kIiwidmFsIiwicmVnaXN0cnkiLCJhcnJheSIsIm9sZF9pbmRleCIsIm5ld19pbmRleCIsImsiLCJ1bmRlZmluZWQiLCJzcGxpY2UiLCJDb21tb25TdHJpbmdzIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIkNvbW1vbkFwcCIsInN0YXJ0ZXIiLCJhc3NpZ24iLCJleHRlbmRXaXRoIiwiU1VCX1BBVEhfU1RBUlQiLCJTVUJfUEFUSF9FTkQiLCJQQVRIX1NQTElUIiwiUEFUSF9TVEFSVF9PQkpFQ1QiLCJQQVRIX1NUQVJUX0hFTFBFUlMiLCJGVU5DVElPTl9NQVJLRVIiLCJNQVhfREVFUCIsIm5vdFBhdGgiLCJwYXRoIiwic3ViUGF0aCIsImZpbmQiLCJzdWIiLCJwYXJzZWQiLCJzdWJmIiwicmVwbGFjZSIsIml0ZW0iLCJoZWxwZXJzIiwic3ViUGF0aFBhcnNlZCIsImZpbmROZXh0U3ViUGF0aCIsImdldFZhbHVlQnlQYXRoIiwicmVwbGFjZVN1YlBhdGgiLCJwYXJzZVN1YnMiLCJhdHRyVmFsdWUiLCJzZXRWYWx1ZUJ5UGF0aCIsImlzUmVjb3JkIiwibm9ybWlsaXplUGF0aCIsInRyaWdnZXIiLCJzZXQiLCJzdGVwIiwiaGVscGVyIiwiclN0ZXAiLCJBcnJheSIsImlzQXJyYXkiLCJwYXJzZVBhdGhTdGVwIiwib2JqZWN0IiwiYXR0clBhdGgiLCJhdHRyTmFtZSIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfTUVUSE9EX0lOSVQiLCJNRVRBX0VWRU5UUyIsIk1FVEFfREFUQSIsIk1FVEFfV09SS0lORyIsIk1FVEFfT1BUSU9OUyIsIm5vdEJhc2UiLCJpbnB1dCIsImV2ZW50cyIsIm9uIiwic2V0RGF0YSIsInNldFdvcmtpbmciLCJ3b3JraW5nIiwic2V0T3B0aW9ucyIsIndoYXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsImZyb20iLCJldmVudE5hbWUiLCJldmVudCIsIm9mZiIsImNhbGxiYWNrcyIsImNhbGxiYWNrIiwidGFyZ2V0SWQiLCJPUFRfTU9ERV9ISVNUT1JZIiwiT1BUX01PREVfSEFTSCIsIk9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMIiwibm90Um91dGVyIiwicm9vdCIsImNsZWFyU2xhc2hlcyIsInJlIiwiaGFuZGxlciIsInJ1bGUiLCJhZGQiLCJwYXJhbSIsInIiLCJmcmFnbWVudCIsImxvY2F0aW9uIiwiZGVjb2RlVVJJIiwicGF0aG5hbWUiLCJzZWFyY2giLCJ3aW5kb3ciLCJtYXRjaCIsImhyZWYiLCJjdXJyZW50IiwiZ2V0RnJhZ21lbnQiLCJpbml0IiwiaXNJbml0aWFsaXplZCIsImNoZWNrIiwic2V0SW5pdGlhbGl6ZWQiLCJsb29wSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNoZWNrTG9jYXRpb24iLCJiaW5kIiwiaHJlZkNsaWNrIiwiZnVsbFJFIiwiYXBwbHkiLCJob3N0IiwicHVzaFN0YXRlIiwiZ2V0RnVsbFJvdXRlIiwiYm9keSIsImdldEFsbExpbmtzIiwiaW5pdFJlcm91dGluZyIsImdldEF0dHJpYnV0ZSIsImxpbmsiLCJub3RSb3V0ZXJJbml0aWFsaXplZCIsImZ1bGxMaW5rIiwicHJldmVudERlZmF1bHQiLCJuYXZpZ2F0ZSIsIm5vdEFQSU9wdGlvbnMiLCJub3RBUElRdWVlIiwicmVxdWVzdHNQZXJTZWNvbmQiLCJxdWVlIiwiaW50IiwiaW5Qcm9ncmVzcyIsInRvQ2FsbCIsImNsZWFySW50ZXJ2YWwiLCJydW4iLCJub3RBUEkiLCJpZCIsImdvb2QiLCJiYWQiLCJtYWtlUmVxdWVzdCIsInJlc3BvbnNlT0siLCJyZXNwb25zZUZhaWxlZCIsInJlcXVlc3RKU09OIiwidGhlbiIsIm5leHQiLCJjYXRjaCIsImdldElkIiwibW9kZWxOYW1lIiwiZ2V0TW9kZWxOYW1lIiwibWFrZVVybCIsImdldEpTT04iLCJub3RJbWFnZSIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCIsIlRFTVBMQVRFX1RBRyIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYIiwiQ09NUE9ORU5UX0lEX1BSRUZJWCIsIlBBUlRfSURfUFJFRklYIiwiREVGQVVMVF9QTEFDRVIiLCJERUZBVUxUX1BMQUNFUl9MT09QIiwiT1BUUyIsIk1FVEFfQ0FDSEUiLCJub3RUZW1wbGF0ZUNhY2hlIiwiaGlkZVRlbXBsYXRlcyIsInJlZ2lzdGVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1hcCIsImxvYWRPbmUiLCJvUmVxdWVzdCIsImRpdiIsImRhdGFzZXQiLCJub3RUZW1wbGF0ZU5hbWUiLCJub3RUZW1wbGF0ZVVSTCIsInNyY0VsZW1lbnQiLCJzZXRPbmUiLCJlbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJhZGRGcm9tVGV4dCIsImNsb25lTm9kZSIsImNvbnQiLCJ0ZXh0Iiwibm90VGVtcGxhdGVzRWxlbWVudHMiLCJlbElkIiwicGFyZW50Tm9kZSIsImxpYiIsImdldEhUTUwiLCJ0ZW1wbGF0ZUlubmVySFRNTCIsInRlbXBsYXRlQ29udEVsIiwid3JhcCIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZIiwiREVGQVVMVF9GSUxURVIiLCJERUZBVUxUX1BBR0VfTlVNQkVSIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJub3RJbnRlcmZhY2UiLCJtYW5pZmVzdCIsImxpbmUiLCJyZWNvcmQiLCJhY3Rpb25OYW1lIiwicmVjb3JkUkUiLCJmaWVsZE5hbWUiLCJpbmQiLCJsZW4iLCJpbmQyIiwic3RhcnRTbGljZSIsImVuZFNsaWNlIiwiZ2V0QXR0ciIsIm1vZGVsIiwiYWN0aW9uRGF0YSIsInBhcnNlTGluZSIsInBvc3RGaXgiLCJyZXN1bHRJZCIsInByZWZpeGVzIiwiaW5kZXgiLCJjb25jYXQiLCJwcmUiLCJnZXRBY3Rpb25zIiwiYWN0aW9ucyIsInNldEZpbHRlciIsImZpbHRlckRhdGEiLCJzb3J0ZXJEYXRhIiwicGFnZU51bWJlciIsInBhZ2VTaXplIiwic2V0UGFnZXIiLCJyZXF1ZXN0RGF0YSIsImRhdGFQcm92aWRlck5hbWUiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJnZXRBY3Rpb25EYXRhIiwicmVxdWVzdFBhcmFtcyIsImNvbGxlY3RSZXF1ZXN0RGF0YSIsInJlcXVlc3RQYXJhbXNFbmNvZGVkIiwiZW5jb2RlUmVxdWVzdCIsImdldElEIiwiZ2V0VVJMIiwicXVlZVJlcXVlc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiYWZ0ZXJTdWNjZXNzUmVxdWVzdCIsIm5vdFJlY29yZCIsIk1FVEFfSU5URVJGQUNFIiwiTUVUQV9QUk9YWSIsIk1FVEFfQ0hBTkdFIiwiTUVUQV9DSEFOR0VfTkVTVEVEIiwiTUVUQV9TQUwiLCJNRVRBX01BUF9UT19JTlRFUkZBQ0UiLCJERUZBVUxUX0FDVElPTl9QUkVGSVgiLCJNRVRBX1JFVFVSTl9UT19ST09UIiwiY3JlYXRlUHJvcGVydHlIYW5kbGVycyIsIm93bmVyIiwiY29udGV4dCIsInJlc1RhcmdldCIsIlJlZmxlY3QiLCJFcnJvciIsInZhbHVlVG9SZWZsZWN0Iiwibm90UHJvcGVydHkiLCJnZXRSb290IiwicGF0aFRvIiwiaXNQcm94eSIsImlzUHJvcGVydHkiLCJQcm94eSIsInByb3h5IiwiY3JlYXRlUmVjb3JkSGFuZGxlcnMiLCJjcmVhdGVDb2xsZWN0aW9uIiwibm90UmVjb3JkSW50ZXJmYWNlIiwiaW5pdFByb3BlcnRpZXMiLCJpbnRlcmZhY2VVcCIsImN1clBhdGgiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiaXRlbXMiLCJjb2xsZWN0aW9uIiwiZ2V0QWN0aW9uc0NvdW50IiwiYWN0aW9uVXAiLCJyZXF1ZXN0Iiwib2JqZWN0UGFydCIsInNldEF0dHIiLCJzZXRGaW5kQnkiLCJyZXNldEZpbHRlciIsImdldEZpbHRlciIsInNldFNvcnRlciIsImdldFNvcnRlciIsInNldFBhZ2VOdW1iZXIiLCJzZXRQYWdlU2l6ZSIsInJlc2V0UGFnZXIiLCJnZXRQYWdlciIsIk9QVF9DT05UUk9MTEVSX1BSRUZJWCIsIk9QVF9SRUNPUkRfUFJFRklYIiwibm90QXBwIiwicmVzb3VyY2VzIiwicHJlSW5pdFJvdXRlciIsImluaXRNYW5hZ2VyIiwiaW5pdEFQSSIsImluaXRUZW1wbGF0ZXMiLCJzZXRNYW5hZ2VyIiwiYXBpIiwic2V0QVBJIiwicHJvbSIsImFkZExpYkZyb21VUkwiLCJpbml0TWFuaWZlc3QiLCJyZXBvcnQiLCJzZXRJbnRlcmZhY2VNYW5pZmVzdCIsInNldFJvb3QiLCJyZVJvdXRlRXhpc3RlZCIsInJvdXRpZUlucHV0Iiwicm91dGVCbG9jayIsInBhdGhzIiwiY29udHJvbGxlciIsImJpbmRDb250cm9sbGVyIiwiYWRkTGlzdCIsImxpc3RlbiIsInVwZGF0ZSIsInVwZGF0ZUludGVyZmFjZXMiLCJpbml0Q29udHJvbGxlciIsImFsbFJlc291cmNlc1JlYWR5Iiwic3RhcnRBcHAiLCJpbml0Um91dGVyIiwiY29udHJvbGxlck5hbWUiLCJhcHAiLCJjdHJsIiwiY2xlYXJJbnRlcmZhY2VzIiwibWFuaWZlc3RzIiwicmVjb3JkTWFuaWZlc3QiLCJyZWNvcmREYXRhIiwib25SZXNvdXJjZVJlYWR5IiwiTUVUQV9QUk9DRVNTT1JTIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzIiwic2V0UHJvY2Vzc29yIiwiZ2V0UHJvY2Vzc29yIiwiTUVUQV9DT01QT05FTlRTIiwibm90UmVuZGVyZXIiLCJyZW5kZXIiLCJjb21wb25lbnQiLCJpbml0RGF0YSIsImluaXRPcHRpb25zIiwiaW5pdFdvcmtpbmciLCJ0ZW1wbGF0ZSIsImluaXRUZW1wbGF0ZSIsIm9uQ2hhbmdlIiwiTWF0aCIsInJhbmRvbSIsImdldEJyZWFkQ3J1bXBzIiwiY2xlYXJTdGFzaCIsInNldFdvcmtpbmdNYXBwaW5nIiwiZXhlY1Byb2Nlc3NvcnMiLCJzZWFyY2hGb3JTdWJUZW1wbGF0ZXMiLCJzdGFzaFJlbmRlcmVkIiwiaWZQYXJ0IiwiY29tcG9uZW50UGF0aCIsImNoYW5nZWRQYXRoIiwiaWZGdWxsU3ViUGF0aCIsImNyZWF0ZU1hcHBpbmciLCJmaW5kQWxsUHJvY2Vzc29ycyIsInByb2NzIiwiZWxzIiwiZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgiLCJnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50IiwicHJvY0RhdGEiLCJwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24iLCJwcm9jZXNzb3JFeHByZXNzaW9uIiwiYXR0cmlidXRlRXhwcmVzc2lvbiIsImlmQ29uZGl0aW9uIiwicGFyYW1zIiwicHJvY2Vzc29yTmFtZSIsIm1hcHBpbmciLCJwcm9jU2NvcGUiLCJhdHRyaWJ1dGVSZXN1bHQiLCJnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0IiwicHJvY05hbWUiLCJwcm9jIiwicmVtb3ZlQXR0cmlidXRlIiwiZGVzdHJveVN1YnMiLCJkZXN0cm95IiwiY2xlYXJTdWJUZW1wbGF0ZXMiLCJnZXRTdGFzaCIsInJlbW92ZUNoaWxkIiwibnRFbCIsIm50UmVuZGVyZWQiLCJzdWJzIiwibnQiLCJpZlN1YkVsZW1lbnRSZW5kZXJlZCIsInJlbmRlclN1YiIsImRldGFpbHMiLCJkYXRhUGF0aCIsIm5vdENvbXBvbmVudCIsImNoaWxkTm9kZXMiLCJhZGRUb1N0YXNoIiwic3Rhc2giLCJuZXdTdGFzaCIsImFuY2hvciIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwibm9kZSIsInBsYWNlIiwidGFyZ2V0RWwiLCJsIiwiY2hpbGRyZW4iLCJ0ZXh0Q29udGVudCIsInJlbmRlcmVkIiwicGxhY2VBZnRlciIsInBsYWNlQmVmb3JlIiwicGxhY2VGaXJzdCIsInBsYWNlTGFzdCIsIm5vdFBsYWNlcnMiLCJNRVRBX1BBUlRTIiwicmVzZXRQYXJ0cyIsInByZXBhcmVUZW1wbGF0ZUVsZW1lbnQiLCJpbml0TWFya0VsZW1lbnQiLCJtYXJrRWwiLCJwbGFjZXIiLCJnZXRQbGFjZXIiLCJ0YXJnZXRRdWVyeSIsIm1haW4iLCJ1bnNldFJlYWR5IiwiaHRtbCIsInNldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiYWRkRnJvbVVSTCIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiY2xlYXJQYXJ0cyIsImRlYWQiLCJvZmZBbGwiLCJmb3JFYWNoRGF0YSIsInJlbmRlclBhcnQiLCJwbGFjZVJlbmRlcmVkIiwicmVtb3ZlT2Jzb2xldGVQYXJ0cyIsImJlZm9yZSIsInBsYWNlUGFydCIsImFmdGVyIiwicGFydCIsImdldFBhcnRCeURhdGEiLCJub2RlcyIsImxhc3ROb2RlIiwibm9kZVR5cGUiLCJnZXRQYXJ0cyIsInJlbmRlcmVyIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSIsImFkZFBhcnQiLCJ1cGRhdGVQYXJ0IiwicGlwZSIsImZpbmRBY3R1YWxQYXJ0cyIsInJlbW92ZU5vdEFjdHVhbFBhcnRzIiwiYWN0dWFsUGFydHMiLCJpc0RhdGEiLCJPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IiLCJPUFRfREVGQVVMVF9WSUVXU19QT1NURklYIiwiT1BUX0RFRkFVTFRfVklFV19OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMIiwiT1BUX0RFRkFVTFRfUExVUkFMX05BTUUiLCJPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSIsIk9QVF9ERUZBVUxUX01PRFVMRV9OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0FORCIsIm5vdENvbnRyb2xsZXIiLCJpbml0UmVuZGVyIiwiaW50ZXJmYWNlcyIsImdldEludGVyZmFjZXMiLCJtYWtlIiwidmlld05hbWUiLCJ2aWV3IiwiZ2V0VmlldyIsInRlbXBsYXRlVVJMIiwicHJlZml4IiwiY29tbW9uIiwiZ2V0TW9kdWxlUHJlZml4IiwicG9zdGZpeCIsInRlbXBsYXRlTmFtZSIsInJlbmRlckFuZCIsInZpZXdzIiwiZ2V0TW9kdWxlTmFtZSIsIiRsaXN0QWxsIiwiZXJyIiwiZmllbGRGaWxlcyIsInNhdmVkRmlsZSIsImhhc2giLCJPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCIsIk9QVF9ERUZBVUxUX1JPTEVfTkFNRSIsIk9QVF9ERUZBVUxUX0ZPUk1fVElUTEUiLCJPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QiLCJub3RGb3JtIiwib25TdWJtaXQiLCJvblJlc2V0Iiwib25DYW5jZWwiLCJnZXRNYW5pZmVzdCIsInJvbGUiLCJyZW5kZXJXcmFwcGVyIiwiZm9ybVBhcnQiLCJnZXRXcmFwcGVyRGF0YSIsImdldFBhcnRUZW1wbGF0ZU5hbWUiLCJiaW5kRm9ybUV2ZW50cyIsInJlbmRlckNvbXBvbmVudHMiLCJ3cmFwcGVyIiwidGl0bGUiLCJnZXRGb3JtRmllbGRzTGlzdCIsImFkZEZpZWxkQ29tcG9uZW50IiwiY29tcHMiLCJnZXRBcHAiLCJkZWYiLCJmaWVsZHNMaWJzIiwiZ2V0RmllbGRzTGlicyIsImZpZWxkVHlwZSIsImdldEZpZWxkc0RlZmluaXRpb24iLCJyZWMiLCJsYWJlbCIsInBsYWNlaG9sZGVyIiwiZGVmYXVsdCIsImZpZWxkIiwiZ2V0Rm9ybVRhcmdldEVsZW1lbnQiLCJjb2xsZWN0RGF0YUZyb21Db21wb25lbnRzIiwiZm9ybSIsIk9QVF9ERUZBVUxUX1ZJRVciLCJPUFRfREVGQVVMVF9BQ1RJT04iLCJPUFRfREVGQVVMVF9JVEVNIiwiQ1JVRENyZWF0ZSIsInBhcmVudCIsInNldFZpZXdzIiwicHJlbG9hZExpYiIsInJlbmRlckZvcm0iLCJvbkFmdGVyUmVuZGVyIiwiaW5pdEl0ZW0iLCJjcmVhdGVEZWZhdWx0IiwiZmlsZXMiLCJkYXRhVHJhbnNmZXIiLCJxdWVlVXBsb2FkIiwibmV3SXRlbSIsImV4ZWNVcGxvYWRzIiwiY3JlYXRlIiwiZ29Ub1RhYmxlIiwiYmFja1RvTGlzdCIsIk9QVF9ERUZBVUxUX1BBR0VfU0laRSIsIk9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSIiwiT1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04iLCJPUFRfREVGQVVMVF9TT1JUX0ZJRUxEIiwiT1BUX0ZJRUxEX05BTUVfUFJFX1BST0MiLCJub3RUYWJsZSIsInJvd3MiLCJyZXNldFNvcnRlciIsInJlbmRlckluc2lkZSIsInJlbmRlckhlYWRlciIsInVwZGF0ZURhdGEiLCJyZW5kZXJCb2R5IiwiYmluZFNlYXJjaCIsImJpbmRDdXN0b21CaW5kaW5ncyIsInRhYmxlSGVhZGVyIiwibmV3VGgiLCJzb3J0YWJsZSIsImF0dGFjaFNvcnRpbmdIYW5kbGVycyIsImhlYWRDZWxsIiwiY2hhbmdlU29ydGluZ09wdGlvbnMiLCJzdHlsZSIsImN1cnNvciIsInNvcnRCeUZpZWxkIiwic29ydERpcmVjdGlvbiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImludmFsaWRhdGVEYXRhIiwiZmlsdGVyU2VhcmNoIiwiaXNOYU4iLCJpZlVwZGF0aW5nIiwicXVlcnkiLCJzZXRVcGRhdGluZyIsIiRsaXN0IiwicHJvY2Nlc3NEYXRhIiwicmVmcmVzaEJvZHkiLCJzZXRVcGRhdGVkIiwidGhhdEZpbHRlciIsInRlc3REYXRhSXRlbSIsInRoYXRTb3J0ZXIiLCJzb3J0IiwiaXRlbTEiLCJpdGVtMiIsInQxIiwidDIiLCJsb2NhbGVDb21wYXJlIiwic2VhcmNoRWwiLCJvbkV2ZW50IiwiY3VycmVudFRhcmdldCIsInNlbGVjdG9yIiwiZ2V0T3B0aW9uIiwibmV3Um93IiwibmV3VGQiLCJwcmVwcm9jZXNzZWQiLCJpdGVtSWQiLCJ0Ym9keSIsImZpbmRCb2R5IiwiY2xlYXJCb2R5IiwiY2hlY2tGaWx0ZXJlZCIsInRoaXNQYWdlU3RhcnRzIiwibmV4dFBhZ2VFbmRzIiwibWluIiwicmVuZGVyUm93IiwidGFibGVCb2R5Iiwic3RyVmFsdWUiLCJnZXRGaWx0ZXJTZWFyY2giLCJ0b0NvbXAiLCJPUF9ERUZBVUxUX1BBR0VfU0laRSIsIkNSVURMaXN0IiwidXBkYXRlRGF0YXRhYmxlIiwidGFibGVWaWV3IiwibG9hZE5leHQiLCJPUFRfREVGQVVMVF9MT0FEX0FDVElPTiIsIkNSVURVcGRhdGUiLCJsb2FkSXRlbSIsInJ1bkxpc3QiLCJDUlVERGVsZXRlIiwiY29uZmlybSIsImRlbGV0ZSIsImFjdGlvbiIsIk9QVF9ERUZBVUxUX0RFVEFJTFNfUFJFRklYIiwiT1BUX0RFRkFVTFRfREVUQUlMU19USVRMRSIsIm5vdERldGFpbHMiLCJnZXRGaWVsZHNMaXN0IiwiY2FzdEN1c3RvbSIsImNhc3RDb21tb24iLCJDdXN0b21Db21wb25lbnQiLCJnZXRUYXJnZXRFbGVtZW50IiwiQ1JVRERldGFpbHMiLCJyZW5kZXJEZXRhaWxzIiwiX2lkIiwiX192ZXJzaW9uIiwiQ1JVRENvbnRyb2xsZXIiLCJydW5DcmVhdGUiLCJydW5EZXRhaWxzIiwicnVuRGVsZXRlIiwicnVuVXBkYXRlIiwicm91dGVSdW5uZXJOYW1lIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIiwic2NvcGUiLCJiaW5kcyIsImxpdmVFdmVudHMiLCJjaGVja2VkIiwic2VsZWN0ZWQiLCJzZWxlY3RlZE9wdGlvbnMiLCJwcm9jZXNzZWRWYWx1ZSIsInVzZWQiLCJvcHRpb24iLCJ2YWx1ZUZpZWxkTmFtZSIsImxhYmVsRmllbGROYW1lIiwiaXRlbVZhbHVlRmllbGROYW1lIl0sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJQSxnQkFBZ0I7VUFDVixpQkFBU0MsR0FBVCxFQUFjO1NBQ2YsS0FBS0MsR0FBTCxDQUFTLE1BQVQsSUFBbUJELEdBQTFCO0VBRmtCO2NBSU4scUJBQVNBLEdBQVQsRUFBYztTQUNuQixLQUFLQyxHQUFMLENBQVMsVUFBVCxJQUF1QkQsR0FBOUI7RUFMa0I7Z0JBT0osdUJBQVNFLFNBQVQsRUFBb0JDLE1BQXBCLEVBQTRCO09BQ3JDLElBQUlDLENBQVQsSUFBY0YsU0FBZCxFQUF5QjtRQUNuQixJQUFJRyxDQUFULElBQWNGLE1BQWQsRUFBc0I7UUFDakJELFVBQVVFLENBQVYsRUFBYUUsY0FBYixDQUE0QkgsT0FBT0UsQ0FBUCxDQUE1QixDQUFKLEVBQTRDO1NBQ3ZDRSxRQUFRLElBQUlDLEtBQUosRUFBWjtXQUNNQyxZQUFOLENBQW1CLGFBQW5CLEVBQWtDLFdBQWxDO1dBQ01DLEdBQU4sR0FBWVIsVUFBVUUsQ0FBVixFQUFhRCxPQUFPRSxDQUFQLENBQWIsRUFBd0JNLE9BQXhCLENBQWdDLElBQWhDLE1BQTBDLENBQTFDLEdBQThDLEtBQUtDLFdBQUwsQ0FBaUJWLFVBQVVFLENBQVYsRUFBYUQsT0FBT0UsQ0FBUCxDQUFiLENBQWpCLENBQTlDLEdBQTBGSCxVQUFVRSxDQUFWLEVBQWFELE9BQU9FLENBQVAsQ0FBYixDQUF0Rzs7OztFQWJlO1FBQUEsbUJBa0JYUSxNQWxCVyxxQ0FrQmlDOzs7U0FDNUMsSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtPQUNuQ0MsTUFBTSxJQUFJQyxjQUFKLEVBQVY7T0FDSUQsSUFBSUosTUFBUixFQUFnQjs7UUFFWEEsT0FBT00sVUFBWCxFQUF1QjtTQUNsQk4sTUFBSixDQUFXTyxnQkFBWCxDQUE0QixVQUE1QixFQUF3Q1AsT0FBT00sVUFBL0MsRUFBMkQsS0FBM0Q7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
