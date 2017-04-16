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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vbmV0LmpzIiwiLi4vc3JjL2NvbW1vbi9sb2dzLmpzIiwiLi4vc3JjL2NvbW1vbi9zaG9ydHMuanMiLCIuLi9zcmMvY29tbW9uL29iamVjdHMuanMiLCIuLi9zcmMvY29tbW9uL3N0cmluZ3MuanMiLCIuLi9zcmMvY29tbW9uL2Z1bmN0aW9ucy5qcyIsIi4uL3NyYy9jb21tb24vZG9tLmpzIiwiLi4vc3JjL2NvbW1vbi9hcHAuanMiLCIuLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiLi4vc3JjL25vdFBhdGguanMiLCIuLi9zcmMvbm90QmFzZS5qcyIsIi4uL3NyYy9ub3RSb3V0ZXIuanMiLCIuLi9zcmMvYXBpL29wdGlvbnMuanMiLCIuLi9zcmMvYXBpL3F1ZWUuanMiLCIuLi9zcmMvYXBpL2FwaS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RJbWFnZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9vcHRpb25zLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlQ2FjaGUuanMiLCIuLi9zcmMvbm90UmVjb3JkSW50ZXJmYWNlLmpzIiwiLi4vc3JjL25vdFJlY29yZC5qcyIsIi4uL3NyYy9ub3RBcHAuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFJlbmRlcmVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2UuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUFmdGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VCZWZvcmUuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUZpcnN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcGxhY2VMYXN0LmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvcmVwbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL2luZGV4LmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdENvbXBvbmVudC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90Rm9ybS5qcyIsIi4uL3NyYy9DUlVEL0NyZWF0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdFRhYmxlLmpzIiwiLi4vc3JjL0NSVUQvTGlzdC5qcyIsIi4uL3NyYy9DUlVEL1VwZGF0ZS5qcyIsIi4uL3NyYy9DUlVEL0RlbGV0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL25vdERldGFpbHMuanMiLCIuLi9zcmMvQ1JVRC9EZXRhaWxzLmpzIiwiLi4vc3JjL0NSVUQvQ29udHJvbGxlci5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbW1vbk5ldHdvcmsgPSB7XG5cdGFkZEhvc3Q6IGZ1bmN0aW9uKHVyaSkge1xuXHRcdHJldHVybiB0aGlzLmdldCgnaG9zdCcpICsgdXJpO1xuXHR9LFxuXHRhZGRQcm90b2NvbDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdwcm90b2NvbCcpICsgdXJpO1xuXHR9LFxuXHRwcmVsb2FkSW1hZ2VzOiBmdW5jdGlvbihkYXRhQXJyYXksIGZpZWxkcykge1xuXHRcdGZvciAodmFyIGkgaW4gZGF0YUFycmF5KSB7XG5cdFx0XHRmb3IgKHZhciBmIGluIGZpZWxkcykge1xuXHRcdFx0XHRpZiAoZGF0YUFycmF5W2ldLmhhc093blByb3BlcnR5KGZpZWxkc1tmXSkpIHtcblx0XHRcdFx0XHR2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRcdFx0XHRpbWFnZS5zZXRBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJywgJ2Fub255bW91cycpO1xuXHRcdFx0XHRcdGltYWdlLnNyYyA9IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dLmluZGV4T2YoJy8vJykgPT09IDAgPyB0aGlzLmFkZFByb3RvY29sKGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dKSA6IGRhdGFBcnJheVtpXVtmaWVsZHNbZl1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRwdXRGaWxlKHVwbG9hZCAvKiBvYmplY3QoZmlsZSwgb25Qcm9ncmVzcywgdXJsKSovICkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHRpZiAoeGhyLnVwbG9hZCkge1xuXHRcdFx0XHQvLyBwcm9ncmVzcyBiYXJcblx0XHRcdFx0aWYgKHVwbG9hZC5vblByb2dyZXNzKSB7XG5cdFx0XHRcdFx0eGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHVwbG9hZC5vblByb2dyZXNzLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCAvKmUqLyApIHtcblx0XHRcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuXHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0Ly8gc3RhcnQgdXBsb2FkXG5cdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0XHR4aHIub3BlbignUFVUJywgdXBsb2FkLnVybCwgdHJ1ZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignWF9GSUxFTkFNRScsIGVuY29kZVVSSUNvbXBvbmVudCh1cGxvYWQuZmlsZS5uYW1lKSk7XG5cdFx0XHRcdHhoci5zZW5kKHVwbG9hZC5maWxlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRyZXF1ZXN0SlNPTjogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHBvc3RKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRwdXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKCdQVVQnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdGRlbGV0ZUpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ0RFTEVURScsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0Z2V0SFRNTDogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdHhoci5vcGVuKCdnZXQnLCB1cmwsIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChwYXJzZUludChzdGF0dXMpID09PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9IChlKSA9PiByZWplY3QoZSk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRTZXNzaW9uSUQ6IGZ1bmN0aW9uKG5hbWUgPSAnU2Vzc2lvbklEJykge1xuXHRcdHJldHVybiB0aGlzLmdldENvb2tpZShuYW1lKTtcblx0fSxcblx0Z2V0Q29va2llOiAobmFtZSkgPT4ge1xuXHRcdGxldCB2YWx1ZSA9ICc7ICcgKyBkb2N1bWVudC5jb29raWUsXG5cdFx0XHRwYXJ0cyA9IHZhbHVlLnNwbGl0KCc7ICcgKyBuYW1lICsgJz0nKTtcblx0XHRpZiAocGFydHMubGVuZ3RoID09IDIpIHtcblx0XHRcdHJldHVybiBwYXJ0cy5wb3AoKS5zcGxpdCgnOycpLnNoaWZ0KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uTmV0d29yaztcbiIsIi8vZGlydHkgaGFjayB0byByZW1vdmUgbm8tY29uc29sZSB3YXJuaW5nIG9mIGVzbGludFxuLyogZ2xvYmFsIG5vdEZyYW1ld29yayovXG5jb25zdCBMT0cgPSAnY29uc29sZSc7XG52YXIgQ29tbW9uTG9ncyA9IHtcblx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHRsb2c6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmxvZyguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0cmVwb3J0OiBmdW5jdGlvbigpIHtcblx0XHRpZighbm90RnJhbWV3b3JrLm5vdENvbW1vbi5nZXQoJ3Byb2R1Y3Rpb24nKSl7XG5cdFx0XHR3aW5kb3dbTE9HXS5lcnJvciguLi5hcmd1bWVudHMpO1xuXHRcdH1cblx0fSxcblx0dHJhY2U6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLnRyYWNlKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cblx0bW92ZUl0ZW0oYXJyYXksIG9sZF9pbmRleCwgbmV3X2luZGV4KSB7XG5cdFx0aWYgKG5ld19pbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcblx0XHRcdHZhciBrID0gbmV3X2luZGV4IC0gYXJyYXkubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKChrLS0pICsgMSkge1xuXHRcdFx0XHRhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFycmF5LnNwbGljZShuZXdfaW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRfaW5kZXgsIDEpWzBdKTtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aChzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHVuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHRoaXMuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIG51bGwpO1xuXHR9XG5cblx0cGFyc2VQYXRoU3RlcChzdGVwLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGxldCByU3RlcCA9IG51bGw7XG5cdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUykgPT09IDAgJiYgaGVscGVyKXtcblx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfSEVMUEVSUywgJycpO1xuXHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRpZihoZWxwZXIuaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF07XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID09PSAwICYmIGl0ZW0pe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwgJycpO1xuXHRcdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fVxuXG5cdC8vOjpmaWVsZE5hbWUucmVzdWx0XG5cdC8ve31cblx0Ly97ZmllbGROYW1lOiAndGFyZ2V0UmVjb3JkRmllbGQnfVxuXHQvLy8vWyd0YXJnZXRSZWNvcmRGaWVsZCcsICdyZXN1bHQnXVxuXHRwYXJzZVBhdGgocGF0aCwgaXRlbSwgaGVscGVyKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cGF0aCA9IHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdHBhdGhbaV0gPSB0aGlzLnBhcnNlUGF0aFN0ZXAocGF0aFtpXSwgaXRlbSwgaGVscGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRub3JtaWxpemVQYXRoKHBhdGgpe1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH1lbHNle1xuXHRcdFx0d2hpbGUocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA+IC0xKXtcblx0XHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwnJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdHNtYWxsID0gW1widG9kb1wiXSxcblx0XHRiaWcgPSBbXCJ0b2RvXCIsIFwibGVuZ3RoXCJdXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0Ki9cblxuXHRpZkZ1bGxTdWJQYXRoKGJpZywgc21hbGwpe1xuXHRcdGlmIChiaWcubGVuZ3RoPHNtYWxsLmxlbmd0aCl7cmV0dXJuIGZhbHNlO31cblx0XHRmb3IobGV0IHQgPTA7IHQgPCBzbWFsbC5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZihzbWFsbFt0XSAhPT0gYmlnW3RdKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpLFxuXHRcdFx0aXNGdW5jdGlvbiA9IGF0dHJOYW1lLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKT4tMTtcblx0XHRpZiAoaXNGdW5jdGlvbil7XG5cdFx0XHRhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0fVxuXHRcdGlmICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIHR5cGVvZiBvYmplY3RbYXR0ck5hbWVdICE9PSAndW5kZWZpbmVkJyAmJiBvYmplY3RbYXR0ck5hbWVdICE9PSBudWxsKXtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uP29iamVjdFthdHRyTmFtZV0oe2l0ZW0sIGhlbHBlcnN9KTpvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChuZXdPYmosIGF0dHJQYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gbmV3T2JqO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7b2JqZWN0W2F0dHJOYW1lXSA9IHt9O31cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGpvaW4oKXtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX01FVEhPRF9JTklUID0gU3ltYm9sKCdpbml0JyksXG5cdE1FVEFfRVZFTlRTID0gU3ltYm9sKCdldmVudHMnKSxcblx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuXHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0dGhpc1tNRVRBX0VWRU5UU10gPSB7fTtcblx0XHR0aGlzW01FVEFfREFUQV0gPSB7fTtcblx0XHR0aGlzW01FVEFfV09SS0lOR10gPSB7fTtcblx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSB7fTtcblx0XHR0aGlzW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdFtNRVRBX01FVEhPRF9JTklUXShpbnB1dCl7XG5cdFx0aWYgKCFpbnB1dCl7XG5cdFx0XHRpbnB1dCA9IHt9O1xuXHRcdH1cblx0XHRpZihpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykpe1xuXHRcdFx0Zm9yKGxldCB0IG9mIGlucHV0LmV2ZW50cyl7XG5cdFx0XHRcdHRoaXMub24oLi4udCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSl7XG5cdFx0XHR0aGlzLnNldERhdGEoaW5wdXQuZGF0YSk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ3dvcmtpbmcnKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoaW5wdXQud29ya2luZyk7XG5cdFx0fVxuXG5cdFx0aWYoaW5wdXQuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoaW5wdXQub3B0aW9ucyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiAqL1xuXHRcdFx0XHR3aGF0ID0gYXJnc1swXTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0Y2FzZSAyOlxuXHRcdFx0e1xuXHRcdFx0XHQvKiBzZXQgY29sbGVjdGlvbiBlbGVtZW50ICovXG5cdFx0XHRcdG5vdFBhdGguc2V0KGFyZ3NbMF0gLyogcGF0aCAqLyAsIHdoYXQgLyogY29sbGVjdGlvbiAqLyAsIHVuZGVmaW5lZCAvKiBoZWxwZXJzICovICwgYXJnc1sxXSAvKiB2YWx1ZSAqLyApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0Z2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggKi9cblx0XHRjYXNlIDE6XG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcblx0XHRcdH1cblx0XHRcdFx0LyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoIHdpdGggZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdGNhc2UgMjpcblx0XHRcdHtcblx0XHRcdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0XHRpZiAocmVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHQvKiBubyBkYXRhLCByZXR1cm4gZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdFx0XHRcdHJldHVybiBhcmdzWzFdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8qIGRhdGEsIHJldHVybiBpdCAqL1xuXHRcdFx0XHRcdHJldHVybiByZXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8qIHJldHVybiBmdWxsIGNvbGxlY3Rpb24gKi9cblx0XHRkZWZhdWx0OlxuXHRcdFx0e1xuXHRcdFx0XHRyZXR1cm4gd2hhdDtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdENPUkUgT0JKRUNUXG5cdFx0XHREQVRBIC0gaW5mb3JtYXRpb25cblx0XHRcdE9QVElPTlMgLSBob3cgdG8gd29ya1xuXHRcdFx0V09SS0lORyAtIHRlbXBvcmFyaWx5IGdlbmVyYXRlZCBpbiBwcm9jY2Vzc1xuXHQqL1xuXG5cdHNldERhdGEoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9EQVRBXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXREYXRhKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXREYXRhKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfREFUQV0sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRPcHRpb25zKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0T3B0aW9ucygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9PUFRJT05TXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFdvcmtpbmcoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRXb3JraW5nKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0V29ya2luZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1dPUktJTkddLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Lypcblx0XHRFVkVOVFMgaGFuZGxpbmdcblx0Ki9cblxuXHRvbihldmVudE5hbWVzLCBldmVudENhbGxiYWNrcywgb25jZSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRub3RDb21tb24uZGVmaW5lSWZOb3RFeGlzdHModGhpc1tNRVRBX0VWRU5UU10sIG5hbWUsIFtdKTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnB1c2goe1xuXHRcdFx0XHRjYWxsYmFja3M6IGV2ZW50Q2FsbGJhY2tzLFxuXHRcdFx0XHRvbmNlOiBvbmNlLFxuXHRcdFx0XHRjb3VudDogMFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR0cmlnZ2VyKCkge1xuXHRcdGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLFxuXHRcdFx0ZXZlbnROYW1lID0gYXJncy5zaGlmdCgpO1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWUpKSB7XG5cdFx0XHRldmVudE5hbWUgPSBbZXZlbnROYW1lXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0VWRU5UU10uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaChldmVudCA9PiB7XG5cdFx0XHRcdFx0aWYgKGV2ZW50Lm9uY2UpIHtcblx0XHRcdFx0XHRcdHRoaXMub2ZmKG5hbWUsIGV2ZW50LmNhbGxiYWNrcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LmNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmYoZXZlbnROYW1lcyAvKiBhcnJheSBvZiBldmVudCBuYW1lcyAqLyAsIGV2ZW50Q2FsbGJhY2tzIC8qIGFycmF5IG9mIGNhbGxiYWNrcyAqLyApIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcblx0XHRcdGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG5cdFx0fVxuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudENhbGxiYWNrcykpIHtcblx0XHRcdGV2ZW50Q2FsbGJhY2tzID0gW2V2ZW50Q2FsbGJhY2tzXTtcblx0XHR9XG5cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRsZXQgdGFyZ2V0SWQgPSAtMTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmZvckVhY2goKGV2ZW50LCBpKSA9PiB7XG5cdFx0XHRcdGlmIChpID09PSAtMSAmJiBldmVudENhbGxiYWNrcyA9PT0gZXZlbnQuY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0dGFyZ2V0SWQgPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmICh0YXJnZXRJZCA+IC0xKSB7XG5cdFx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnNwbGljZSh0YXJnZXRJZCwgMSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvZmZBbGwoKXtcblx0XHRsZXQgZXZlbnRzID0gT2JqZWN0LmtleXModGhpc1tNRVRBX0VWRU5UU10pO1xuXHRcdGZvcihsZXQgdCA9MDsgdDwgZXZlbnRzLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmKHRoaXNbTUVUQV9FVkVOVFNdLmhhc093blByb3BlcnR5KGV2ZW50c1t0XSkpe1xuXHRcdFx0XHRkZWxldGUgdGhpc1tNRVRBX0VWRU5UU11bZXZlbnRzW3RdXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5jb25zdCBPUFRfTU9ERV9ISVNUT1JZID0gU3ltYm9sKCdoaXN0b3J5JyksXG5cdE9QVF9NT0RFX0hBU0ggPSBTeW1ib2woJ2hhc2gnKSxcblx0T1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwgPSA1MDtcblxuY2xhc3Mgbm90Um91dGVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJvdXRlczogW10sXG5cdFx0XHRtb2RlOiBPUFRfTU9ERV9ISVNUT1JZLFxuXHRcdFx0cm9vdDogJy8nLCAvL2Fsd2F5cyBpbiBzbGFzaGVzIC91c2VyLywgLywgL2lucHV0Ly4gYW5kIG5vIC91c2VyIG9yIGlucHV0L2xldmVsXG5cdFx0XHRpbml0aWFsaXplZDogZmFsc2Vcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpc3RvcnkoKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9ISVNUT1JZKTtcblx0fVxuXG5cdGhhc2goKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGUnLCBPUFRfTU9ERV9IQVNIKTtcblx0fVxuXG5cdHNldFJvb3Qocm9vdCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb290Jywgcm9vdCA/ICcvJyArIHRoaXMuY2xlYXJTbGFzaGVzKHJvb3QpICsgJy8nIDogJy8nKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNsZWFyU2xhc2hlcyhwYXRoKSB7XG5cdFx0Ly9maXJzdCBhbmQgbGFzdCBzbGFzaGVzIHJlbW92YWxcblx0XHRyZXR1cm4gcGF0aC50b1N0cmluZygpLnJlcGxhY2UoL1xcLyQvLCAnJykucmVwbGFjZSgvXlxcLy8sICcnKTtcblx0fVxuXG5cdGFkZChyZSwgaGFuZGxlcikge1xuXHRcdGlmICh0eXBlb2YgcmUgPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aGFuZGxlciA9IHJlO1xuXHRcdFx0cmUgPSAnJztcblx0XHR9XG5cdFx0bGV0IHJ1bGUgPSB7XG5cdFx0XHRyZTogcmUsXG5cdFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0fTtcblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLnB1c2gocnVsZSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRMaXN0KGxpc3QpIHtcblx0XHRmb3IgKGxldCB0IGluIGxpc3QpIHtcblx0XHRcdHRoaXMuYWRkKHQsIGxpc3RbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbW92ZShwYXJhbSkge1xuXHRcdGZvciAodmFyIGkgPSAwLCByOyBpIDwgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5sZW5ndGgsIHIgPSB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldOyBpKyspIHtcblx0XHRcdGlmIChyLmhhbmRsZXIgPT09IHBhcmFtIHx8IHIucmUgPT09IHBhcmFtKSB7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRmbHVzaCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLydcblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGlzSW5pdGlhbGl6ZWQoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbml0aWFsaXplZCcpO1xuXHR9XG5cblx0c2V0SW5pdGlhbGl6ZWQodmFsID0gdHJ1ZSl7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnaW5pdGlhbGl6ZWQnLCB2YWwpO1xuXHR9XG5cblx0Z2V0RnJhZ21lbnQoKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gJyc7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnbW9kZScpID09PSBPUFRfTU9ERV9ISVNUT1JZKSB7XG5cdFx0XHRpZiAoIWxvY2F0aW9uKSByZXR1cm4gJyc7XG5cdFx0XHRmcmFnbWVudCA9IHRoaXMuY2xlYXJTbGFzaGVzKGRlY29kZVVSSShsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaCkpO1xuXHRcdFx0ZnJhZ21lbnQgPSBmcmFnbWVudC5yZXBsYWNlKC9cXD8oLiopJC8sICcnKTtcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgIT0gJy8nID8gZnJhZ21lbnQucmVwbGFjZSh0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSwgJycpIDogZnJhZ21lbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICghd2luZG93KSByZXR1cm4gJyc7XG5cdFx0XHR2YXIgbWF0Y2ggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRmcmFnbWVudCA9IG1hdGNoID8gbWF0Y2hbMV0gOiAnJztcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuY2xlYXJTbGFzaGVzKGZyYWdtZW50KTtcblx0fVxuXG5cdGNoZWNrTG9jYXRpb24oKXtcblx0XHRsZXQgY3VycmVudCA9dGhpcy5nZXRXb3JraW5nKCdjdXJyZW50JyksXG5cdFx0XHRmcmFnbWVudCA9dGhpcy5nZXRGcmFnbWVudCgpLFxuXHRcdFx0aW5pdCA9IHRoaXMuaXNJbml0aWFsaXplZCgpO1xuXHRcdGlmIChjdXJyZW50ICE9PWZyYWdtZW50ICB8fCAhaW5pdCkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JyxmcmFnbWVudCk7XG5cdFx0XHR0aGlzLmNoZWNrKGZyYWdtZW50KTtcblx0XHRcdHRoaXMuc2V0SW5pdGlhbGl6ZWQoKTtcblx0XHR9XG5cdH1cblxuXHRocmVmQ2xpY2soKXtcblx0XHQvL2NvbnNvbGUubG9nKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRnZXRSb290KCl7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cblx0bGlzdGVuKGxvb3BJbnRlcnZhbCA9IE9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50JywgJ25vdEluaXRpYWxpemVkJyk7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmdldFdvcmtpbmcoJ2ludGVydmFsJykpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJ2YWwnLCBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrTG9jYXRpb24uYmluZCh0aGlzKSwgbG9vcEludGVydmFsKSk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5ocmVmQ2xpY2suYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjaGVjayhmKSB7XG5cdFx0dmFyIGZyYWdtZW50ID0gZiB8fCB0aGlzLmdldEZyYWdtZW50KCk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGF0aCA9IHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5yZTtcblx0XHRcdGxldCBmdWxsUkUgPSAgdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKHBhdGgpKTtcblx0XHRcdHZhciBtYXRjaCA9IGZyYWdtZW50Lm1hdGNoKGZ1bGxSRSk7XG5cdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0bWF0Y2guc2hpZnQoKTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKVtpXS5oYW5kbGVyLmFwcGx5KHRoaXMuaG9zdCB8fCB7fSwgbWF0Y2gpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRuYXZpZ2F0ZShwYXRoKSB7XG5cdFx0cGF0aCA9IHBhdGggPyBwYXRoIDogJyc7XG5cdFx0c3dpdGNoICh0aGlzLmdldFdvcmtpbmcoJ21vZGUnKSl7XG5cdFx0XHRjYXNlIE9QVF9NT0RFX0hJU1RPUlk6IHtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygncHVzaCBzdGF0ZScsIHRoaXMuZ2V0RnVsbFJvdXRlKHBhdGgpKTtcblx0XHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgT1BUX01PREVfSEFTSDoge1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvIyguKikkLywgJycpICsgJyMnICsgcGF0aDtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RnVsbFJvdXRlKHBhdGggPSAnJyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncm9vdCcpICsgdGhpcy5jbGVhclNsYXNoZXMocGF0aCk7XG5cdH1cblxuXHRnZXRBbGxMaW5rcygpe1xuXHRcdHZhciBhbGxFbGVtZW50cyA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuXHRcdHZhciBsaXN0ID0gW107XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhbGxFbGVtZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDAsIGF0dHMgPSBhbGxFbGVtZW50c1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZignbi1ocmVmJykgPT09IDApIHtcblx0XHRcdFx0XHRsaXN0LnB1c2goYWxsRWxlbWVudHNbal0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0cmVSb3V0ZUV4aXN0ZWQoKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0QWxsTGlua3MoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgbGlzdC5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmluaXRSZXJvdXRpbmcobGlzdFt0XSwgbGlzdFt0XS5nZXRBdHRyaWJ1dGUoJ24taHJlZicpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0UmVyb3V0aW5nKGVsLCBsaW5rKXtcblx0XHRpZiAoIWVsLm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdGxldCBmdWxsTGluayA9IHRoaXMuZ2V0RnVsbFJvdXRlKGxpbmspO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdocmVmJywgZnVsbExpbmspO1xuXHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9Pntcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLm5hdmlnYXRlKGxpbmspO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHRcdGVsLm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90Um91dGVyKCk7XG4iLCJsZXQgbm90QVBJT3B0aW9ucyA9IHtcblx0cnBzOiA1MCxcblx0cHJvdG9jb2w6ICdodHRwJyxcblx0aG9zdDogJ2xvY2FsaG9zdCcsXG5cdHBvcnQ6IDkwMDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSU9wdGlvbnM7XG4iLCJjbGFzcyBub3RBUElRdWVle1xuXHRjb25zdHJ1Y3RvciAocmVxdWVzdHNQZXJTZWNvbmQpIHtcblx0XHR0aGlzLnF1ZWUgPSBbXTtcblx0XHR0aGlzLmludCA9IG51bGw7XG5cdFx0dGhpcy5yZXF1ZXN0c1BlclNlY29uZCA9IHJlcXVlc3RzUGVyU2Vjb25kIHx8IDU7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW4oKXtcblx0XHR0aGlzLmludCA9IHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLmNoZWNrLmJpbmQodGhpcyksIDEwMDAgLyB0aGlzLnJlcXVlc3RzUGVyU2Vjb25kKTtcblx0fVxuXG5cdGNoZWNrKCl7XG5cdFx0aWYgKHRoaXMuaW5Qcm9ncmVzcyl7cmV0dXJuO31cblx0XHRlbHNle1xuXHRcdFx0aWYgKHRoaXMucXVlZS5sZW5ndGggPiAwKXtcblx0XHRcdFx0dGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcblx0XHRcdFx0bGV0IHRvQ2FsbCA9IHRoaXMucXVlZS5zaGlmdCgpO1xuXHRcdFx0XHR0b0NhbGwoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRuZXh0KCl7XG5cdFx0dGhpcy5pblByb2dyZXNzID0gZmFsc2U7XG5cdH1cblxuXHRhZGQoY2FsbCl7XG5cdFx0dGhpcy5xdWVlLnB1c2goY2FsbCk7XG5cdH1cblxuXHRwYXVzZSgpe1xuXHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMuaW50KTtcblx0fVxuXG5cdHJlc3VtZSgpe1xuXHRcdHRoaXMucnVuKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJUXVlZTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UuanMnO1xuXG5pbXBvcnQgbm90QVBJT3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuaW1wb3J0IG5vdEFQSVF1ZWUgZnJvbSAnLi9xdWVlLmpzJztcblxuXG5jbGFzcyBub3RBUEkgZXh0ZW5kcyAgbm90QmFzZXtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKG5vdENvbW1vbi5leHRlbmQobm90QVBJT3B0aW9ucywgb3B0aW9ucykpO1xuXHRcdHRoaXMucXVlZSA9IG5ldyBub3RBUElRdWVlKHRoaXMuZ2V0T3B0aW9ucygncnBzJykpO1xuXHRcdHRoaXMucXVlZS5ydW4oKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG1ha2VVcmwocGFydHMpIHtcblx0XHRyZXR1cm4gcGFydHMuam9pbignLycpO1xuXHR9XG5cblx0cXVlZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgbWV0aG9kLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdG1ha2VSZXF1ZXN0KG1ldGhvZCwgdXJsLCBpZCwgZGF0YSwgZ29vZCwgYmFkKSB7XG5cdFx0bm90Q29tbW9uLnJlcXVlc3RKU09OKG1ldGhvZCwgdXJsLCBkYXRhKVxuXHRcdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZSk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0XHR0aGlzLnF1ZWUubmV4dCgpO1xuXHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlKG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBpZCA9IG9iai5nZXRJZCgpLFxuXHRcdFx0XHRtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdHVybCA9IHRoaXMubWFrZVVybChbdGhpcy5nZXRPcHRpb25zKCdiYXNlJyksIG1vZGVsTmFtZSwgaWRdKSxcblx0XHRcdFx0ZGF0YSA9IG9iai5nZXRKU09OKCk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3Bvc3QnLCB1cmwsIGlkLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdHB1dChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ3B1dCcsIHVybCwgbnVsbCwgZGF0YSwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXQob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdnZXQnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGxpc3Qob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgbnVsbCwgbnVsbCwgKHJlc3BvbnNlT0spID0+IHtcblx0XHRcdFx0XHRnb29kICYmIGdvb2QocmVzcG9uc2VPSyk7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZU9LKTtcblx0XHRcdFx0fSwgKHJlc3BvbnNlRmFpbGVkKSA9PiB7XG5cdFx0XHRcdFx0YmFkICYmIGJhZChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdFx0cmVqZWN0KHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZWxldGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pO1xuXHRcdFx0dGhpcy5xdWVlLmFkZChcblx0XHRcdFx0dGhpcy5tYWtlUmVxdWVzdC5iaW5kKHRoaXMsICdkZWxldGUnLCB1cmwsIGlkLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUEk7XG4iLCJpbXBvcnQgbm90QmFzZSAgZnJvbSAnLi4vbm90QmFzZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbWFnZSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuIiwiY29uc3QgUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYID0gJ24tJyxcblx0VEVNUExBVEVfVEFHID0gJ250Jyxcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SID0gJy0nLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCA9ICdpZicsXG5cdENPTVBPTkVOVF9JRF9QUkVGSVggPSAnbm90X2NvbXBvbmVudF8nLFxuXHRQQVJUX0lEX1BSRUZJWCA9ICdub3RfcGFydF8nLFxuXHRERUZBVUxUX1BMQUNFUiA9ICdwbGFjZScsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1AgPSAncGxhY2VBZnRlcic7XG5cbmNvbnN0IE9QVFMgPSB7XG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCxcblx0VEVNUExBVEVfVEFHLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLFxuXHRERUZBVUxUX1BMQUNFUixcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCxcblx0UEFSVF9JRF9QUkVGSVgsXG5cdERFRkFVTFRfUExBQ0VSX0xPT1Bcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9QVFM7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5jb25zdCBNRVRBX0NBQ0hFID0gU3ltYm9sKCdjYWNoZScpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZUNhY2hlIGV4dGVuZHMgbm90QmFzZXtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9DQUNIRV0gPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0dGhpcy5oaWRlVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5yZWdpc3RlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlkZVRlbXBsYXRlcygpe1xuXHRcdGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblx0XHR0LmlubmVySFRNTCA9IE9QVFMuVEVNUExBVEVfVEFHICsgJ3tkaXNwbGF5OiBub25lO30nO1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodCk7XG5cdH1cblxuXHRyZWdpc3RlcigpIHtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ3RlbXBsYXRlQ2FjaGUnLCB0aGlzKTtcblx0fVxuXG5cdGxvYWQobWFwKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdGZvciAodmFyIGkgaW4gbWFwKSB7XG5cdFx0XHR0aGlzLmxvYWRPbmUoaSwgbWFwW2ldKTtcblx0XHR9XG5cdH1cblxuXHRsb2FkT25lKGtleSwgdXJsLCBjYWxsYmFjaykge1xuXHRcdHZhciBvUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdG9SZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XG5cdFx0b1JlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZU5hbWUgPSBrZXk7XG5cdFx0XHRkaXYuZGF0YXNldC5ub3RUZW1wbGF0ZVVSTCA9IHVybDtcblx0XHRcdGRpdi5pbm5lckhUTUwgPSByZXNwb25zZS5zcmNFbGVtZW50LnJlc3BvbnNlVGV4dDtcblx0XHRcdHRoaXMuc2V0T25lKGtleSwgZGl2KTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKGtleSwgdXJsLCBkaXYpO1xuXG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRvUmVxdWVzdC5zZW5kKCk7XG5cdH1cblxuXHRpZkFsbExvYWRlZCgpe1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMudHJpZ2dlcignbG9hZGVkJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0T25lKGtleSwgZWxlbWVudCkge1xuXHRcdGlmKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCl7XG5cdFx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5hZGRGcm9tVGV4dChrZXksIGVsZW1lbnQpO1x0XG5cdFx0fVxuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Y29udC5uYW1lID0ga2V5O1xuXHRcdGNvbnQuc3JjID0gdXJsO1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MO1xuXHRcdHJldHVybiBjb250O1xuXHR9XG5cblx0cGFyc2VMaWIodGV4dCl7XG5cdFx0bGV0IGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Y29udC5pbm5lckhUTUwgPSB0ZXh0O1xuXHRcdGxldCBub3RUZW1wbGF0ZXNFbGVtZW50cyA9IGNvbnQucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Zm9yKGxldCBlbElkID0wOyBlbElkPCBub3RUZW1wbGF0ZXNFbGVtZW50cy5sZW5ndGg7IGVsSWQrKyl7XG5cdFx0XHRsZXQgZWwgPSBub3RUZW1wbGF0ZXNFbGVtZW50c1tlbElkXTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlID09PSBjb250KXtcblx0XHRcdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0XHRcdHJlc3VsdFtlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWVdID0gZWw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGFkZExpYihsaWIpe1xuXHRcdGZvcihsZXQgdCBpbiBsaWIpe1xuXHRcdFx0dGhpcy5zZXRPbmUodCwgbGliW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVVJMKGtleSwgdXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT4ge1xuXHRcdFx0aWYgKHRoaXMuZ2V0KGtleSkpe1xuXHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vdGhhdC5zZXRMb2FkaW5nKGtleSwgdXJsKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHRcdC50aGVuKCh0ZW1wbGF0ZUlubmVySFRNTCk9Pntcblx0XHRcdFx0XHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksIHVybCwgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZ2V0KGtleSkpO1xuXHRcdFx0XHRcdH0pLmNhdGNoKCgpPT57XG5cdFx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGUnLCBrZXksIHVybCk7XG5cdFx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZExpYkZyb21VUkwodXJsKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG5vdENvbW1vbi5nZXRIVE1MKHVybClcblx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlc0hUTUwpPT57XG5cdFx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoaXMucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdFx0dGhpcy5hZGRMaWIodGVtcGxhdGVzKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlcyk7XG5cdFx0XHRcdH0pLmNhdGNoKChlKT0+e1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZXMgbGliJywgdXJsLGUpO1xuXHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGFkZEZyb21Eb2N1bWVudChzZWxlY3Rvck9yRWxlbWVudCl7XG5cdFx0bGV0IGVsID0gKHR5cGVvZiBzZWxlY3Rvck9yRWxlbWVudCA9PT0gJ3N0cmluZycpP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpOnNlbGVjdG9yT3JFbGVtZW50O1xuXHRcdGlmIChlbC5hdHRyaWJ1dGVzLm5hbWUgJiYgZWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlKXtcblx0XHRcdGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IE9QVFMuVEVNUExBVEVfVEFHLnRvTG93ZXJDYXNlKCkpe1xuXHRcdFx0XHR0aGlzLnNldE9uZShlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUsIGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRhZGRGcm9tVGV4dChrZXksIHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGlzLndyYXAoa2V5LCAnJywgdGVtcGxhdGVJbm5lckhUTUwpO1xuXHRcdHRoaXMuc2V0T25lKGtleSwgdGVtcGxhdGVDb250RWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RUZW1wbGF0ZUNhY2hlKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSA9IFsnX2lkJywgJ2lkJywgJ0lEJ10sXG5cdERFRkFVTFRfRklMVEVSID0ge30sXG5cdERFRkFVTFRfUEFHRV9OVU1CRVIgPSAxLFxuXHRERUZBVUxUX1BBR0VfU0laRSA9IDEwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbnRlcmZhY2UgZXh0ZW5kcyBub3RCYXNlIHtcblxuXHRjb25zdHJ1Y3RvcihtYW5pZmVzdCkge1xuXHRcdHN1cGVyKHt9KTtcblx0XHR0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldElEKHJlY29yZCwgYWN0aW9uRGF0YSkge1xuXHRcdGxldCByZXN1bHRJZCxcblx0XHRcdGxpc3QgPSBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZLFxuXHRcdFx0cHJlZml4ZXMgPSBbJycsIHRoaXMubWFuaWZlc3QubW9kZWxdO1xuXHRcdGlmIChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpbmRleCcpICYmIGFjdGlvbkRhdGEuaW5kZXgpIHtcblx0XHRcdGxpc3QgPSBbYWN0aW9uRGF0YS5pbmRleF0uY29uY2F0KE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFkpO1xuXHRcdH1cblx0XHRmb3IgKGxldCBwcmUgb2YgcHJlZml4ZXMpIHtcblx0XHRcdGZvciAobGV0IHQgb2YgbGlzdCkge1xuXHRcdFx0XHRpZiAocmVjb3JkLmhhc093blByb3BlcnR5KHByZSArIHQpKSB7XG5cdFx0XHRcdFx0cmVzdWx0SWQgPSByZWNvcmRbcHJlICsgdF07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdElkO1xuXHR9XG5cblx0Z2V0QWN0aW9uc0NvdW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSA/IE9iamVjdC5rZXlzKHRoaXMuZ2V0QWN0aW9ucygpKS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Z2V0QWN0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdCAmJiB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgPyB0aGlzLm1hbmlmZXN0LmFjdGlvbnMgOiB7fTtcblx0fVxuXG5cdHNldEZpbmRCeShrZXksIHZhbHVlKSB7XG5cdFx0dmFyIG9iaiA9IHt9O1xuXHRcdG9ialtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuIHRoaXMuc2V0RmlsdGVyKG9iaik7XG5cdH1cblxuXHRzZXRGaWx0ZXIoZmlsdGVyRGF0YSA9IERFRkFVTFRfRklMVEVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgZmlsdGVyRGF0YSk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIoe30pO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0U29ydGVyKHNvcnRlckRhdGEpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHNldFBhZ2VTaXplKHBhZ2VTaXplKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSk7XG5cdH1cblxuXHRzZXRQYWdlcihwYWdlU2l6ZSA9IERFRkFVTFRfUEFHRV9TSVpFLCBwYWdlTnVtYmVyID0gREVGQVVMVF9QQUdFX05VTUJFUikge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldFdvcmtpbmcoJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0UGFnZXIoKTtcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRXb3JraW5nKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRXb3JraW5nKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdGNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlcXVlc3REYXRhID0ge307XG5cdFx0aWYgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdkYXRhJykpICYmIEFycmF5LmlzQXJyYXkoYWN0aW9uRGF0YS5kYXRhKSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpb25EYXRhLmRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bGV0IGRhdGFQcm92aWRlck5hbWUgPSAnZ2V0JyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIoYWN0aW9uRGF0YS5kYXRhW2ldKTtcblx0XHRcdFx0aWYgKHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gJiYgdHlwZW9mIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRyZXF1ZXN0RGF0YSA9IG5vdENvbW1vbi5leHRlbmQocmVxdWVzdERhdGEsIHRoaXNbZGF0YVByb3ZpZGVyTmFtZV0oKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVlc3REYXRhO1xuXHR9XG5cblx0ZW5jb2RlUmVxdWVzdChkYXRhKXtcblx0XHRsZXQgcCA9ICc/Jztcblx0XHRmb3IobGV0IHQgaW4gZGF0YSl7XG5cdFx0XHRwICs9IGVuY29kZVVSSUNvbXBvbmVudCh0KSsnPScrZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFbdF0pKycmJztcblx0XHR9XG5cdFx0cmV0dXJuIHA7XG5cdH1cblxuXHQvL3JldHVybiBQcm9taXNlXG5cdHJlcXVlc3QocmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zID0gdGhpcy5jb2xsZWN0UmVxdWVzdERhdGEoYWN0aW9uRGF0YSksXG5cdFx0XHRyZXF1ZXN0UGFyYW1zRW5jb2RlZCA9IHRoaXMuZW5jb2RlUmVxdWVzdChyZXF1ZXN0UGFyYW1zKSxcblx0XHRcdGlkID0gdGhpcy5nZXRJRChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpLFxuXHRcdFx0dXJsID0gdGhpcy5nZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbm90Q29tbW9uLmdldEFQSSgpLnF1ZWVSZXF1ZXN0KGFjdGlvbkRhdGEubWV0aG9kLCB1cmwgKyByZXF1ZXN0UGFyYW1zRW5jb2RlZCwgaWQsIEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpKVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKTtcblx0XHRcdH0pO1xuXHR9XG5cblx0YWZ0ZXJTdWNjZXNzUmVxdWVzdChkYXRhLCBhY3Rpb25EYXRhKSB7XG5cdFx0aWYgKHRoaXMgJiYgYWN0aW9uRGF0YSAmJiBhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdpc0FycmF5JykgJiYgYWN0aW9uRGF0YS5pc0FycmF5KSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IGRhdGEubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZGF0YVt0XSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YVt0XSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSBuZXcgbm90UmVjb3JkKHRoaXMubWFuaWZlc3QsIGRhdGEpO1xuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnO1xuXG5jb25zdCBNRVRBX0lOVEVSRkFDRSA9IFN5bWJvbCgnaW50ZXJmYWNlJyksXG5cdE1FVEFfUFJPWFkgPSBTeW1ib2woJ3Byb3h5JyksXG5cdE1FVEFfQ0hBTkdFID0gU3ltYm9sKCdjaGFuZ2UnKSxcblx0TUVUQV9DSEFOR0VfTkVTVEVEID0gU3ltYm9sKCdjaGFuZ2UubmVzdGVkJyksXG5cdE1FVEFfU0FMID0gW1xuXHRcdCdnZXRBdHRyJyxcblx0XHQnZ2V0QXR0cnMnLFxuXHRcdCdpc1Byb3BlcnR5Jyxcblx0XHQnaXNSZWNvcmQnLFxuXHRcdCdnZXRNYW5pZmVzdCcsXG5cdFx0J3NldEF0dHInLFxuXHRcdCdzZXRBdHRycycsXG5cdFx0J2dldERhdGEnLFxuXHRcdCdzZXREYXRhJyxcblx0XHQnZ2V0SlNPTicsXG5cdFx0J29uJyxcblx0XHQnb2ZmJyxcblx0XHQndHJpZ2dlcidcblx0XSxcblx0TUVUQV9NQVBfVE9fSU5URVJGQUNFID0gW1xuXHRcdCdnZXRBY3Rpb25zQ291bnQnLFxuXHRcdCdnZXRBY3Rpb25zJyxcblx0XHQnc2V0RmluZEJ5Jyxcblx0XHQncmVzZXRGaWx0ZXInLFxuXHRcdCdzZXRGaWx0ZXInLFxuXHRcdCdnZXRGaWx0ZXInLFxuXHRcdCdzZXRTb3J0ZXInLFxuXHRcdCdnZXRTb3J0ZXInLFxuXHRcdCdyZXNldFNvcnRlcicsXG5cdFx0J3NldFBhZ2VOdW1iZXInLFxuXHRcdCdzZXRQYWdlU2l6ZScsXG5cdFx0J3NldFBhZ2VyJyxcblx0XHQncmVzZXRQYWdlcicsXG5cdFx0J2dldFBhZ2VyJ1xuXHRdLFxuXHRERUZBVUxUX0FDVElPTl9QUkVGSVggPSAnJCcsXG5cdE1FVEFfUkVUVVJOX1RPX1JPT1QgPSBTeW1ib2woJ3JldHVyblRvUm9vdCcpO1xuXG52YXIgY3JlYXRlUHJvcGVydHlIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRsZXQgcmVzVGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0aWYgKHR5cGVvZiBrZXkgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEgfHwgTUVUQV9TQUwuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdHlwZW9mIHRhcmdldFtrZXldKTtcblxuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UHJvcGVydHkgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoZ2V0Um9vdCwgcGF0aFRvLCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1Byb3h5IHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHR0aGlzLnNldE9wdGlvbnMoe1xuXHRcdFx0Z2V0Um9vdDogZ2V0Um9vdCxcblx0XHRcdHBhdGg6IHBhdGhUb1xuXHRcdH0pO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUHJvcGVydHlIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5zZXREYXRhKGl0ZW0pO1xuXHRcdHRoaXMuaXNQcm9wZXJ0eSA9IHRydWU7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX1JFVFVSTl9UT19ST09UXS5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdFtNRVRBX1JFVFVSTl9UT19ST09UXShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdGxldCByb290ID0gdGhpcy5nZXRPcHRpb25zKCdnZXRSb290JykoKTtcblx0XHRyb290LnRyaWdnZXIoJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfUFJPWFldLCB0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5LCB2YWx1ZSk7XG5cdH1cbn1cblxuXG52YXIgY3JlYXRlUmVjb3JkSGFuZGxlcnMgPSBmdW5jdGlvbihvd25lcikge1xuXHRyZXR1cm4ge1xuXHRcdGdldDogZnVuY3Rpb24odGFyZ2V0LCBrZXksIGNvbnRleHQpIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgZ2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQsIGNvbnRleHQpO1xuXHRcdFx0aWYgKGtleSA9PT0gJ2lzUHJveHknIHx8IGtleSA9PT0gJ2lzUmVjb3JkJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX01BUF9UT19JTlRFUkZBQ0UuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5nZXQocmVzVGFyZ2V0LCBrZXksIGNvbnRleHQpO1xuXHRcdH0uYmluZChvd25lciksXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUgLyosIHByb3h5Ki8gKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHJlY29yZCBwcm94eSBzZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCk7XG5cdFx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBhdHRlbXB0IHRvIHByaXZhdGUgXCIke2tleX1cIiBwcm9wZXJ0eWApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IHZhbHVlVG9SZWZsZWN0ID0gdmFsdWU7XG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0dmFsdWVUb1JlZmxlY3QgPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRPcHRpb25zKCdnZXRSb290JyksIG5vdFBhdGguam9pbih0aGlzLmdldE9wdGlvbnMoJ3BhdGgnKSwga2V5KSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlVG9SZWZsZWN0KTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHRyZXR1cm4gdDtcblx0XHRcdH1cblx0XHR9LmJpbmQob3duZXIpLFxuXHR9O1xufTtcblxuY2xhc3Mgbm90UmVjb3JkIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG1hbmlmZXN0LCBpdGVtKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRpZiAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnIHx8IGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0XHRpZiAoaXRlbSAmJiBpdGVtLmlzUHJveHkpIHtcblx0XHRcdG5vdENvbW1vbi5lcnJvcigndGhpcyBpcyBQcm94eSBpdGVtJyk7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cblx0XHRpZiAoaXRlbSAmJiAoaXRlbS5pc1JlY29yZCB8fCBpdGVtLmlzUHJvcGVydHkpKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7fSk7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0gPSBuZXcgbm90UmVjb3JkSW50ZXJmYWNlKG1hbmlmZXN0KTtcblx0XHR0aGlzLnNldERhdGEodGhpcy5pbml0UHJvcGVydGllcyhpdGVtKSk7XG5cdFx0dGhpcy5pbnRlcmZhY2VVcCgpO1xuXHRcdHRoaXMuaXNSZWNvcmQgPSB0cnVlO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgcmVjb3JkIGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0aW5pdFByb3BlcnRpZXMoaXRlbSwgcGF0aCA9ICcnKSB7XG5cdFx0aWYgKHR5cGVvZiBpdGVtICE9PSAndW5kZWZpbmVkJyAmJiBpdGVtICE9PSBudWxsKSB7XG5cdFx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKGl0ZW0pO1xuXHRcdFx0Zm9yIChsZXQga2V5IG9mIGtleXMpIHtcblx0XHRcdFx0bGV0IGN1clBhdGggPSBwYXRoICsgKHBhdGgubGVuZ3RoID4gMCA/ICcuJyA6ICcnKSArIGtleTtcblx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjdXJQYXRoJywgY3VyUGF0aCk7XG5cdFx0XHRcdGlmIChpdGVtLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW1ba2V5XSA9PT0gJ29iamVjdCcgJiYgaXRlbVtrZXldICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW1ba2V5XSwgY3VyUGF0aCk7XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0gPSBuZXcgbm90UHJvcGVydHkodGhpcy5nZXRSb290LmJpbmQodGhpcyksIGN1clBhdGgsIGl0ZW1ba2V5XSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBvd24gcHJvcGVydHksIGJ1dCBub3Qgb2JqZWN0Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhrZXksICdpcyBub3Qgb3duIHByb3BlcnR5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHRnZXRSb290KCkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ29sbGVjdGlvbihtYW5pZmVzdCwgaXRlbXMpIHtcblx0XHR2YXIgY29sbGVjdGlvbiA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbGxlY3Rpb24ucHVzaChuZXcgbm90UmVjb3JkKG1hbmlmZXN0LCBpdGVtc1tpXSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29sbGVjdGlvbjtcblx0fVxuXG5cdGludGVyZmFjZVVwKCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zQ291bnQoKSA+IDApIHtcblx0XHRcdGxldCBhY3Rpb25zID0gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0QWN0aW9ucygpO1xuXHRcdFx0Zm9yIChsZXQgaSBpbiBhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuYWN0aW9uVXAoaSwgYWN0aW9uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblxuXG5cdGFjdGlvblVwKGluZGV4KSB7XG5cdFx0aWYgKCF0aGlzLmhhc093blByb3BlcnR5KFtERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0pKSB7XG5cdFx0XHR0aGlzW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSA9ICgpID0+IHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlcXVlc3QodGhpcywgaW5kZXgpO1x0XHRcdFxuXHRcdH1cblx0fVxuXHQvKlxuXHQtPiAncGF0aC50by5rZXknLCB2YWx1ZU9mS2V5XG5cdDwtIG9rLCB3aXRoIG9uZSBvbkNoYW5nZSBldmVudCB0cmlnZ2VyZWRcblx0Ki9cblxuXHRzZXRBdHRyKGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gbm90UGF0aC5zZXQoa2V5LCB0aGlzW01FVEFfUFJPWFldLCB7fSwgdmFsdWUpO1xuXHR9XG5cblx0Lypcblx0LT5cblx0e1xuXHRcdCdrZXlQYXRoJzogdmFsdWUsXG5cdFx0J2tleS5zdWJQYXRoJzogdmFsdWUyLFxuXHRcdCdrZXlQYXRoLjAudGl0bGUnOiB2YWx1ZTNcblx0fVxuXHQ8LSBvaywgd2l0aCBidW5jaCBvZiBvbkNoYW5nZSBldmVudHMgdHJpZ2dlcmVkXG5cdCovXG5cdHNldEF0dHJzKG9iamVjdFBhcnQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzJywgb2JqZWN0UGFydCwgT2JqZWN0LmtleXMob2JqZWN0UGFydCkpO1xuXHRcdGlmIChvYmplY3RQYXJ0ICYmICh0eXBlb2Ygb2JqZWN0UGFydCA9PT0gJ29iamVjdCcpICYmIE9iamVjdC5rZXlzKG9iamVjdFBhcnQpLmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggaW4gb2JqZWN0UGFydCkge1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ3NldEF0dHJzIG9uZSB0byBnbycsIHBhdGgpO1xuXHRcdFx0XHR0aGlzLnNldEF0dHIocGF0aCwgb2JqZWN0UGFydFtwYXRoXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0LT4gJ3BhdGhUb0tleSdcblx0PC0gdmFsdWUxXG5cblx0Ki9cblx0Z2V0QXR0cih3aGF0KSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdnZXRBdHRyJywgd2hhdCk7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHdoYXQsIHRoaXNbTUVUQV9QUk9YWV0sIHt9KTtcblx0fVxuXG5cdC8qXG5cdC0+IFsncGF0aFRvS2V5JywgJ3BhdGgudG8ua2V5JywgJ3NpbXBsZUtleScsLi4uXVxuXHQ8LSBbdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMywuLi5dXG5cdCovXG5cdGdldEF0dHJzKHdoYXQpIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0aWYgKHdoYXQgJiYgd2hhdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRmb3IgKGxldCBwYXRoIG9mIHdoYXQpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5nZXRBdHRyKHBhdGgpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdGlmICh0aGlzW01FVEFfSU5URVJGQUNFXSkge1xuXHRcdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLm1hbmlmZXN0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4ge307XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRoYW5kbGVyIGZvciBQcm94eSBjYWxsYmFja3Ncblx0Ki9cblxuXHRbTUVUQV9DSEFOR0VdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZScsIC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRbTUVUQV9DSEFOR0VfTkVTVEVEXSgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3RyeSB0byBjaGFuZ2UgbmVzdGVkJywgLi4uYXJndW1lbnRzKTtcblx0XHQvL25vdENvbW1vbi50cmFjZSgpO1xuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpc1tNRVRBX1BST1hZXSwgbm90UGF0aC5qb2luKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKSwgYXJndW1lbnRzWzNdKTtcblx0fVxuXG5cdHNldEl0ZW0oaXRlbSkge1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZVJlY29yZEhhbmRsZXJzKHRoaXMpKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3Byb3h5IGNyZWF0ZWQgZnJvbSAnLCBpdGVtKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vZmYoJ2NoYW5nZS5uZXN0ZWQnKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfQ0hBTkdFXS5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UubmVzdGVkJywgdGhpc1tNRVRBX0NIQU5HRV9ORVNURURdLmJpbmQodGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRzZXRGaW5kQnkoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmluZEJ5KC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFNvcnRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0U29ydGVyKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRQYWdlTnVtYmVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VOdW1iZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VTaXplKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VTaXplKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5yZXNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGdldE1vZGVsTmFtZSgpIHtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0uZ2V0TW9kZWxOYW1lKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZWNvcmQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Um91dGVyIGZyb20gJy4vbm90Um91dGVyJztcbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuXG5jb25zdCBPUFRfQ09OVFJPTExFUl9QUkVGSVggPSAnbmMnLFxuXHRPUFRfUkVDT1JEX1BSRUZJWCA9ICducic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEFwcCBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoe29wdGlvbnN9KTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBhcHAnKTtcblx0XHRub3RDb21tb24ucmVnaXN0ZXIoJ2FwcCcsIHRoaXMpO1xuXHRcdHRoaXMucmVzb3VyY2VzID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGludGVyZmFjZXM6IHt9LFxuXHRcdFx0Y29udHJvbGxlcnM6IHt9LFxuXHRcdFx0aW5pdENvbnRyb2xsZXI6IG51bGwsXG5cdFx0XHRjdXJyZW50Q29udHJvbGxlcjogbnVsbFxuXHRcdH0pO1xuXHRcdHRoaXMucHJlSW5pdFJvdXRlcigpO1xuXHRcdHRoaXMuaW5pdE1hbmFnZXIoKTtcblx0XHR0aGlzLmluaXRBUEkoKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZXMoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRNYW5hZ2VyKCl7XG5cdFx0bm90Q29tbW9uLnNldE1hbmFnZXIoXG5cdFx0XHR7XG5cdFx0XHRcdHNldEFQSSh2KXsgdGhpcy5hcGkgPSB2O30sXG5cdFx0XHRcdGdldEFQSSgpe3JldHVybiB0aGlzLmFwaTt9LFxuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHRpbml0QVBJKCl7XG5cdFx0bm90Q29tbW9uLmdldE1hbmFnZXIoKS5zZXRBUEkobmV3IG5vdEFQSSh7fSkpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlcygpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpKXtcblx0XHRcdGxldCBwcm9tID0gbnVsbDtcblx0XHRcdGZvcihsZXQgdCBpbiB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpKXtcblx0XHRcdFx0aWYgKHQgJiYgdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKS5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdFx0bGV0IHVybCA9IHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJylbdF07XG5cdFx0XHRcdFx0aWYocHJvbSl7XG5cdFx0XHRcdFx0XHRwcm9tLnRoZW4obm90VGVtcGxhdGVDYWNoZS5hZGRMaWJGcm9tVVJMLmJpbmQobm90VGVtcGxhdGVDYWNoZSwgdXJsKSk7XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRwcm9tID0gbm90VGVtcGxhdGVDYWNoZS5hZGRMaWJGcm9tVVJMKHVybCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAocHJvbSl7XG5cdFx0XHRcdHByb20udGhlbih0aGlzLmluaXRNYW5pZmVzdC5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdC5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRcdFx0bm90Q29tbW9uLnJlcG9ydCgnbm8gdGVtcGxhdGVzIGxpYicsIGUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuaW5pdE1hbmlmZXN0KCk7XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRNYW5pZmVzdCgpIHtcblx0XHR2YXIgdXJsID0gdGhpcy5nZXRPcHRpb25zKCdtYW5pZmVzdFVSTCcpO1xuXHRcdG5vdENvbW1vbi5nZXRKU09OKHVybCwge30pXG5cdFx0XHQudGhlbih0aGlzLnNldEludGVyZmFjZU1hbmlmZXN0LmJpbmQodGhpcykpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydC5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdHByZUluaXRSb3V0ZXIoKXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JvdXRlcicsIG5vdFJvdXRlcik7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXInKS5zZXRSb290KHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLnJvb3QnKSk7XG5cdFx0bm90Um91dGVyLnJlUm91dGVFeGlzdGVkKCk7XG5cdH1cblxuXHRpbml0Um91dGVyKCl7XG5cdFx0dmFyIHJvdXRpZUlucHV0ID0ge307XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLm1hbmlmZXN0JykubGVuZ3RoOyB0Kyspe1xuXHRcdFx0bGV0IHJvdXRlQmxvY2sgPSB0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5tYW5pZmVzdCcpW3RdLFxuXHRcdFx0XHRwYXRocyA9IHJvdXRlQmxvY2sucGF0aHMsXG5cdFx0XHRcdGNvbnRyb2xsZXIgPSByb3V0ZUJsb2NrLmNvbnRyb2xsZXI7XG5cdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRyb3V0aWVJbnB1dFtwYXRoc1tpXV0gPSB0aGlzLmJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcicpLmFkZExpc3Qocm91dGllSW5wdXQpLmxpc3RlbigpOy8vLm5hdmlnYXRlKHRoaXMuZ2V0T3B0aW9ucygncm91dGVyLmluZGV4JykpO1xuXHR9XG5cblx0c2V0SW50ZXJmYWNlTWFuaWZlc3QobWFuaWZlc3QpIHtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0JywgbWFuaWZlc3QpO1xuXHRcdHRoaXMudXBkYXRlKCk7XG5cdH1cblxuXHRnZXRJbnRlcmZhY2VNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdC8v0L3Rg9C20L3QviDQuNC90LjRhtC40LDQu9C40LfQuNGA0L7QstCw0YLRjFxuXHRcdC8v0LzQvtC00LXQu9C4INC/0L7Qu9GD0YfQtdC90L3Ri9C80Lgg0LjQvdGC0LXRgNGE0LXQudGB0LDQvNC4XG5cdFx0dGhpcy51cGRhdGVJbnRlcmZhY2VzKCk7XG5cdFx0Ly/QuNC90LjRhtC40LvQuNGG0LjRgNC+0LLQsNGC0Ywg0Lgg0LfQsNC/0YPRgdGC0LjRgtGMINC60L7QvdGC0YDQvtC70LvQtdGAINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4XG5cdFx0dGhpcy5pbml0Q29udHJvbGxlcigpO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRzdGFydEFwcCgpIHtcblx0XHQvL9GB0L7Qt9C00LDRgtGMINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHQvL9GA0L7Rg9GC0LXRgCDQuCDQv9GA0LjQstGP0LfQsNGC0Ywg0Log0L3QtdC80YMg0LrQvtC90YLRgNC+0LvQu9C10YDRi1xuXHRcdHRoaXMuaW5pdFJvdXRlcigpO1xuXHR9XG5cblx0YmluZENvbnRyb2xsZXIoY29udHJvbGxlck5hbWUpIHtcblx0XHRsZXQgYXBwID0gdGhpcztcblx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdG5ldyBjb250cm9sbGVyTmFtZShhcHAsIGFyZ3VtZW50cyk7XG5cdFx0fTtcblx0fVxuXG5cdGluaXRDb250cm9sbGVyKCkge1xuXHRcdGlmICh0eXBlb2YodGhpcy5nZXRPcHRpb25zKCdpbml0Q29udHJvbGxlcicpKSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdGxldCBpbml0Q29udHJvbGxlciA9IHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnaW5pdENvbnRyb2xsZXInLCBuZXcgaW5pdENvbnRyb2xsZXIodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGdldEN1cnJlbnRDb250cm9sbGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2N1cnJlbnRDb250cm9sbGVyJyk7XG5cdH1cblxuXHRzZXRDdXJyZW50Q29udHJvbGxlcihjdHJsKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicsIGN0cmwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0dXBkYXRlSW50ZXJmYWNlcygpIHtcblx0XHR0aGlzLmNsZWFySW50ZXJmYWNlcygpO1xuXHRcdGxldCBtYW5pZmVzdHMgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZU1hbmlmZXN0Jyk7XG5cdFx0aWYgKG1hbmlmZXN0cykge1xuXHRcdFx0Zm9yKGxldCBuYW1lIGluIG1hbmlmZXN0cyl7XG5cdFx0XHRcdGxldCByZWNvcmRNYW5pZmVzdCA9IG1hbmlmZXN0c1tuYW1lXTtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbbmFtZV0gPSAocmVjb3JkRGF0YSkgPT4gbmV3IG5vdFJlY29yZChyZWNvcmRNYW5pZmVzdCwgcmVjb3JkRGF0YSk7XG5cdFx0XHRcdHdpbmRvd1snbnInICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKV0gPSB0aGlzLmdldFdvcmtpbmcoJ2ludGVyZmFjZXMnKVtuYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRSZWNvcmROYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX1JFQ09SRF9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0Z2V0Q29udHJvbGxlck5hbWUobmFtZSkge1xuXHRcdHJldHVybiBPUFRfQ09OVFJPTExFUl9QUkVGSVggKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKG5hbWUpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlcygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJyk7XG5cdH1cblxuXHRjbGVhckludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcmZhY2VzJywge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0d2FpdFRoaXNSZXNvdXJjZSh0eXBlLCBpbmRleCkge1xuXHRcdGlmICghdGhpcy5yZXNvdXJjZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcblx0XHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdID0ge307XG5cdFx0fVxuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IGZhbHNlO1xuXHRcdHJldHVybiB0aGlzLm9uUmVzb3VyY2VSZWFkeS5iaW5kKHRoaXMsIHR5cGUsIGluZGV4KTtcblx0fVxuXG5cdG9uUmVzb3VyY2VSZWFkeSh0eXBlLCBpbmRleCkge1xuXHRcdHRoaXMucmVzb3VyY2VzW3R5cGVdW2luZGV4XSA9IHRydWU7XG5cdFx0aWYgKHRoaXMuYWxsUmVzb3VyY2VzUmVhZHkoKSkge1xuXHRcdFx0dGhpcy5zdGFydEFwcCgpO1xuXHRcdH1cblx0fVxuXG5cdGFsbFJlc291cmNlc1JlYWR5KCkge1xuXHRcdHZhciBpLCBqO1xuXHRcdGZvciAoaSBpbiB0aGlzLnJlc291cmNlcykge1xuXHRcdFx0Zm9yIChqIGluIHRoaXMucmVzb3VyY2VzW2ldKSB7XG5cdFx0XHRcdGlmICghdGhpcy5yZXNvdXJjZXNbaV1bal0pIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5cbmNvbnN0IE1FVEFfUFJPQ0VTU09SUyA9IFN5bWJvbCgncHJvY2Vzc29ycycpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQcm9jZXNzb3IoLyoga2V5LCB2YWx1ZSAqLyl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UHJvY2Vzc29yKC8qIGtleSwgIGRlZmF1bHRWYWx1ZSAqLyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyUHJvY2Vzc29ycygpe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkKCl7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuXHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gYXJndW1lbnRzWzBdKXtcblx0XHRcdFx0XHR0aGlzLnNldFByb2Nlc3Nvcih0LCBhcmd1bWVudHNbMF1bdF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0UHJvY2Vzc29yKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhcigpe1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVQcm9jZXNzb3JzKCk7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi9ub3RDb21wb25lbnQnO1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7XG5cbi8qXG4gKiDQmNGB0L/QvtC70YzQt9GD0LXRgiBET00g0L/QvtC00LTQtdGA0LXQstC+INCyINC60LDRh9C10YHRgtCy0LUg0YjQsNCx0LvQvtC90LAuXG4gKiDQl9Cw0L/QvtC70L3Rj9C10YIg0LXQs9C+INC00LDQvdC90YvQvNC4LlxuICog0JLQvtC30LLRgNCw0YnQsNC10YIg0YHQs9C10L3QtdGA0LjRgNC+0LLQsNC90L3Ri9C1INGN0LvQtdC80LXQvdGC0YtcbiAqXG4gKiAqL1xuXG4vKlxuXG5cdDxkaXYgbi10ZW1wbGF0ZS1uYW1lPVwidmFzeWFcIj5cblx0XHQ8cD48aW5wdXQgdHlwZT1cInRleHRcIiBuLXZhbHVlPVwiOmNvb2xOYW1lXCIvPjwvcD5cblx0XHQ8cD7QkdC+0YDQuNGBINGF0YDQtdC9INC/0L7Qv9Cw0LTQtdGI0Ywg0Lgge3s6Y29vbE5hbWV9fS48L3A+XG5cdDwvZGl2PlxuXG4gKi9cblxuY29uc3QgTUVUQV9DT01QT05FTlRTID0gU3ltYm9sKCdjb21wb25lbnRzJyk7XG5cbmNsYXNzIG5vdFJlbmRlcmVyIGV4dGVuZHMgbm90QmFzZSB7XG5cdC8qXG5cdFx0aW5wdXQgPSB7XG5cdFx0XHRkYXRhOiBub3RSZWNvcmQsXG5cdFx0XHR0ZW1wbGF0ZTogZWxlbWVudFxuXHRcdFx0b3B0aW9uczp7XG5cdFx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHRcdHRhcmdldEVsOiBIVE1MRWxlbWVudChvYmplY3QpINC40LvQuCBodG1sIHNlbGVjdG9yIChzdHJpbmcpXG5cdFx0XHR9XG5cdFx0fVxuXHQqL1xuXG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ09NUE9ORU5UU10gPSB7fTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMuY29tcG9uZW50ID0gaW5wdXQuY29tcG9uZW50O1xuXHRcdHRoaXMuaW5pdERhdGEoaW5wdXQuZGF0YSA/IGlucHV0LmRhdGEgOiB7fSk7XG5cdFx0dGhpcy5pbml0T3B0aW9ucyhpbnB1dC5vcHRpb25zID8gaW5wdXQub3B0aW9ucyA6IHt9KTtcblx0XHR0aGlzLmluaXRXb3JraW5nKGlucHV0LnRlbXBsYXRlKTtcblx0XHR0aGlzLmluaXRUZW1wbGF0ZSgpO1xuXHR9XG5cblx0aW5pdFRlbXBsYXRlKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndGVtcGxhdGUnLCB0aGlzLmdldFdvcmtpbmcoJ2dldFRlbXBsYXRlJykoKSk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQpIHtcblx0XHRcdHRoaXMuZ2V0RGF0YSgpLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHR9XG5cblx0aW5pdFdvcmtpbmcodGVtcGxhdGUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0Z2V0VGVtcGxhdGU6IHRlbXBsYXRlLFxuXHRcdFx0cGFydElkOiB0aGlzLmdldE9wdGlvbnMoJ3BhcnRJZCcpID8gdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA6IE9QVFMuUEFSVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKSB7XG5cdFx0aWYgKHRoaXMuY29tcG9uZW50KSB7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMuY29tcG9uZW50LmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0V29ya2luZygncGFydElkJyldO1xuXHRcdH1cblx0fVxuXG5cdG9uQ2hhbmdlKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0Lypub3RDb21tb24ubG9nKHRoaXMpO1xuXHRcdG5vdENvbW1vbi5sb2codGhpcy5nZXRCcmVhZENydW1wcygpLmpvaW4oJyA+ICcpKTtcblx0XHRub3RDb21tb24ubG9nKCd1cGRhdGluZyByZW5kZXJlciAnLCB0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpLCAnIGFmdGVyIGNoYW5nZXMnLCBrZXksIHZhbHVlKTsqL1xuXHRcdHRoaXMudXBkYXRlKGtleSk7XG5cdFx0dGhpcy50cmlnZ2VyKCdvYnNvbGV0ZScscHJveHksIGtleSwgdmFsdWUpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMuY2xlYXJTdGFzaCgpO1xuXHRcdHRoaXMuc2V0V29ya2luZ01hcHBpbmcoKTtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHR0aGlzLnNlYXJjaEZvclN1YlRlbXBsYXRlcygpO1xuXHRcdHRoaXMuc3Rhc2hSZW5kZXJlZCgpO1xuXHR9XG5cblx0dXBkYXRlKGtleSkge1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdGZvciAobGV0IHQgaW4gdGhpc1tNRVRBX0NPTVBPTkVOVFNdKSB7XG5cdFx0XHRsZXQgaXRlbSA9IHRoaXNbTUVUQV9DT01QT05FTlRTXVt0XSxcblx0XHRcdFx0aWZQYXJ0ID0gdHJ1ZTtcblx0XHRcdGlmIChrZXkpe1xuXHRcdFx0XHRpZiAoaXRlbS5nZXRPcHRpb25zKCdkYXRhUGF0aCcpPT09bnVsbCl7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0XHRjb21wb25lbnRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGl0ZW0uZ2V0T3B0aW9ucygnZGF0YVBhdGgnKSksXG5cdFx0XHRcdFx0Y2hhbmdlZFBhdGggPSBub3RQYXRoLm5vcm1pbGl6ZVBhdGgoa2V5KTtcblx0XHRcdFx0aWZQYXJ0ID0gbm90UGF0aC5pZkZ1bGxTdWJQYXRoKGNoYW5nZWRQYXRoLCBjb21wb25lbnRQYXRoKTtcblx0XHRcdFx0Lypub3RDb21tb24ubG9nKGl0ZW0uZ2V0T3B0aW9ucygnbmFtZScpLCAnID4tPCAnLCBpdGVtLmdldE9wdGlvbnMoJ2lkJyksICcgPi08ICcsIGNvbXBvbmVudFBhdGgsIGNoYW5nZWRQYXRoKTtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygnd2lsbCBiZSB1cGRhdGVkJywgaWZQYXJ0KTsqL1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaWZQYXJ0KSB7XG5cdFx0XHRcdGl0ZW0udXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c2V0V29ya2luZ01hcHBpbmcoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdtYXBwaW5nJywgdGhpcy5jcmVhdGVNYXBwaW5nKCkpO1xuXHR9XG5cblx0LypcblxuXHTQodC+0LfQtNCw0LXQvCDQutCw0YDRgtGLINGB0L7QvtGC0LLQtdGB0YLQstC40Y8g0L/RgNC+0YbQtdGB0YHQvtGA0L7Qsiwg0L/Rg9GC0LXQuSDQtNCw0L3QvdGL0YUg0LIg0L7QsdGK0LXQutGC0LUg0Lgg0Y3Qu9C10LzQtdC90YLQvtCyINGI0LDQsdC70L7QvdCwLlxuXHRbe1xuXHRcdGVsLFxuXHRcdHByb2Nlc3Nvcixcblx0XHR3b3JraW5nLFxuXHRcdGl0ZW0ucHJvcGVydHkucGF0aFxuXHR9XVxuXG5cdCovXG5cblx0Y3JlYXRlTWFwcGluZygpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5maW5kQWxsUHJvY2Vzc29ycygpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmaW5kQWxsUHJvY2Vzc29ycygpIHtcblx0XHRsZXQgcHJvY3MgPSBbXSxcblx0XHRcdGVscyA9IG5vdENvbW1vbi5nZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aCh0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSwgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpO1xuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgZWxzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMCwgYXR0cyA9IGVsc1tqXS5hdHRyaWJ1dGVzLCBuID0gYXR0cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcblx0XHRcdFx0aWYgKGF0dHNbaV0ubm9kZU5hbWUuaW5kZXhPZihPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCkgPT09IDApIHtcblx0XHRcdFx0XHQvL25vdENvbW1vbi5sb2coYXR0c1tpXSk7XG5cdFx0XHRcdFx0bGV0IHByb2NEYXRhID0gdGhpcy5wYXJzZVByb2Nlc3NvckV4cHJlc3Npb24oYXR0c1tpXS5ub2RlTmFtZSk7XG5cdFx0XHRcdFx0cHJvY0RhdGEuZWxlbWVudCA9IGVsc1tqXTtcblx0XHRcdFx0XHRwcm9jRGF0YS5wcm9jZXNzb3JFeHByZXNzaW9uID0gYXR0c1tpXS5ub2RlTmFtZTtcblx0XHRcdFx0XHRwcm9jRGF0YS5hdHRyaWJ1dGVFeHByZXNzaW9uID0gYXR0c1tpXS52YWx1ZTtcblx0XHRcdFx0XHRwcm9jcy5wdXNoKHByb2NEYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcHJvY3M7XG5cdH1cblxuXHRwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24ocHJvY2Vzc29yRXhwcmVzc2lvbikge1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRwYXJhbXM6IFtdLFxuXHRcdFx0cHJvY2Vzc29yTmFtZTogJycsXG5cdFx0XHRpZkNvbmRpdGlvbjogZmFsc2Vcblx0XHR9O1xuXHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgsICcnKTtcblx0XHRpZiAocHJvY2Vzc29yRXhwcmVzc2lvbi5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgpID09PSAocHJvY2Vzc29yRXhwcmVzc2lvbi5sZW5ndGggLSBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLmxlbmd0aCkpIHtcblx0XHRcdHJlc3VsdC5pZkNvbmRpdGlvbiA9IHRydWU7XG5cdFx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SICsgT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCwgJycpO1xuXHRcdH1cblx0XHRyZXN1bHQucGFyYW1zID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5zcGxpdChPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUik7XG5cdFx0cmVzdWx0LnByb2Nlc3Nvck5hbWUgPSByZXN1bHQucGFyYW1zWzBdO1xuXHRcdHJlc3VsdC5wYXJhbXMgPSByZXN1bHQucGFyYW1zLnNsaWNlKDEpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRleGVjUHJvY2Vzc29ycyhpdGVtLCBpbmRleCkge1xuXHRcdGxldCBtYXBwaW5nID0gdGhpcy5nZXRXb3JraW5nKCdtYXBwaW5nJyk7XG5cdFx0aWYgKG1hcHBpbmcpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbWFwcGluZy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgcHJvY1Njb3BlID0gbWFwcGluZ1tpXTtcblx0XHRcdFx0cHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwcm9jU2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2F0dHJpYnV0ZVJlc3VsdCcsIHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQpO1xuXHRcdFx0XHRsZXQgcHJvY05hbWUgPSBwcm9jU2NvcGUucHJvY2Vzc29yTmFtZSxcblx0XHRcdFx0XHRwcm9jID0gbm90VGVtcGxhdGVQcm9jZXNzb3JzLmdldChwcm9jTmFtZSk7XG5cdFx0XHRcdGlmIChwcm9jKSB7XG5cdFx0XHRcdFx0cHJvYyhwcm9jU2NvcGUsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdFx0XHRcdFx0cHJvY1Njb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb2NTY29wZS5wcm9jZXNzb3JFeHByZXNzaW9uKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ25vIHByb2Nlc3NvciBsaWtlJywgcHJvY05hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcigncmVuZGVyZWQnKTtcblx0fVxuXG5cdGdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocGF0aCwgaXRlbSkge1xuXHRcdHJldHVybiBub3RQYXRoLmdldChwYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSkpO1xuXHR9XG5cblx0Y2xlYXJTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5kZXN0cm95U3VicygpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnc3VicycsIFtdKTtcblx0fVxuXG5cdGRlc3Ryb3lTdWJzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiB0aGlzLmdldFdvcmtpbmcoJ3N1YnMnKSkge1xuXHRcdFx0XHR0LmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMuY2xlYXJTdWJUZW1wbGF0ZXMoKTtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRTdGFzaCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGxldCBlbCA9IHRoaXMuZ2V0U3Rhc2goKVt0XTtcblx0XHRcdGlmIChlbC5wYXJlbnROb2RlKXtcblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWZTdWJFbGVtZW50UmVuZGVyZWQobnRFbCkge1xuXHRcdHJldHVybiBudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZCAmJiAobnRFbC5hdHRyaWJ1dGVzLm50UmVuZGVyZWQudmFsdWUgPT09ICd0cnVlJyk7XG5cdH1cblxuXHRzZWFyY2hGb3JTdWJUZW1wbGF0ZXMoKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGxldCBzdWJzID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkucXVlcnlTZWxlY3RvckFsbChPUFRTLlRFTVBMQVRFX1RBRyk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzdWIgdGVtcGxhdGVzJywgc3Vicyk7XG5cdFx0Zm9yIChsZXQgbnQgPSAwOyBudCA8IHN1YnMubGVuZ3RoOyBudCsrKSB7XG5cdFx0XHRpZiAoIXRoaXMuaWZTdWJFbGVtZW50UmVuZGVyZWQoc3Vic1tudF0pKSB7XG5cdFx0XHRcdHRoaXMucmVuZGVyU3ViKHN1YnNbbnRdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhZGRTdWIobnRFbCkge1xuXHRcdG50RWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnc3VicycpLnB1c2goe1xuXHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRwYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogJycsXG5cdFx0XHRuYW1lOiBudEVsLmF0dHJpYnV0ZXMubmFtZSA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnZhbHVlIDogJycsXG5cdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS5zcmMgOiAnJyxcblx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpLFxuXHRcdFx0cmVuZGVyZWRMaXN0OiBbXSxcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclN1YihudEVsKSB7XG5cdFx0aWYgKCFudEVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGxldCBkZXRhaWxzID0ge1xuXHRcdFx0XHRkYXRhUGF0aDogbnRFbC5hdHRyaWJ1dGVzLmRhdGEgPyBudEVsLmF0dHJpYnV0ZXMuZGF0YS52YWx1ZSA6IG51bGwsXG5cdFx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdFx0c3JjOiBudEVsLmF0dHJpYnV0ZXMuc3JjID8gbnRFbC5hdHRyaWJ1dGVzLnNyYy52YWx1ZSA6ICcnLFxuXHRcdFx0XHRpZDogbnRFbC5hdHRyaWJ1dGVzLmlkID8gbnRFbC5hdHRyaWJ1dGVzLmlkLnZhbHVlIDogT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnMgPSB7XG5cdFx0XHRcdGRhdGE6IGRldGFpbHMuZGF0YVBhdGghPT0gbnVsbD8gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KGRldGFpbHMuZGF0YVBhdGgsIHRoaXMuZ2V0RGF0YSgpKTpudWxsLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRzcmM6IGRldGFpbHMuc3JjXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlQWZ0ZXInLFxuXHRcdFx0XHRcdGlkOiBkZXRhaWxzLmlkLFxuXHRcdFx0XHRcdG50RWw6IG50RWwsXG5cdFx0XHRcdFx0ZGF0YVBhdGg6IGRldGFpbHMuZGF0YVBhdGhcblx0XHRcdFx0fSxcblx0XHRcdFx0b3duZXI6IHRoaXNcblx0XHRcdH07XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgZGV0YWlscy5pZCk7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdW2RldGFpbHMuaWRdID0gbmV3IG5vdENvbXBvbmVudChvcHRpb25zKTtcblx0fVxuXG5cdGNsZWFyU3Rhc2goKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIFtdKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGUnKTtcblx0fVxuXG5cdGdldFN0YXNoKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3N0YXNoJyk7XG5cdH1cblxuXHRzdGFzaFJlbmRlcmVkKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHR0aGlzLmFkZFRvU3Rhc2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0fVxuXG5cdHJlcGxhY2VSZW5kZXJlZCgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3JlcGxhY2Ugc3Rhc2gnKTtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksXG5cdFx0XHRzdGFzaCA9IHRoaXMuZ2V0U3Rhc2goKSxcblx0XHRcdG5ld1N0YXNoID0gW10sXG5cdFx0XHRhbmNob3IgPSBzdGFzaC5sZW5ndGggPiAwID8gc3Rhc2hbMF0gOiB0aGlzLmdldE9wdGlvbnMoJ250RWwnKSxcblx0XHRcdHBhcmVudE5vZGUgPSBhbmNob3IucGFyZW50Tm9kZTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRuZXdTdGFzaC5wdXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBuZXdTdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0aWYgKGFuY2hvci5uZXh0U2libGluZykge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3Rhc2hbdF0sIGFuY2hvci5uZXh0U2libGluZyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChuZXdTdGFzaFt0XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgc3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3Rhc2hbdF0pO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgbmV3U3Rhc2gpO1xuXHR9XG5cblx0YWRkVG9TdGFzaChub2RlKSB7XG5cdFx0dGhpcy5nZXRTdGFzaCgpLnB1c2gobm9kZSk7XG5cdH1cblxuXHRpc0RhdGEoZGF0YSA9IHt9KSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG5cblx0aGlkZSgpe1xuXG5cdH1cblxuXHRzaG93KCl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RSZW5kZXJlcjtcbiIsImNvbnN0IHBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHtcblx0XHRsZXQgbCA9IDA7XG5cdFx0d2hpbGUgKHRhcmdldEVsLmNoaWxkcmVuLmxlbmd0aCAtIGwpIHtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlblswXS5ub2RlTmFtZSA9PT0gJ05UJyl7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ250IGZvdW5kZWQnKTtcblx0XHRcdFx0bCsrO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ3JlbW92ZSBjaGlsZCAnLHRhcmdldEVsLmNoaWxkcmVuW2xdKTtcblx0XHRcdFx0dGFyZ2V0RWwucmVtb3ZlQ2hpbGQodGFyZ2V0RWwuY2hpbGRyZW5bbF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0YXJnZXRFbC50ZXh0Q29udGVudCA9ICcnO1xuXHR9LFxuXHRiZWZvcmVFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGNoaWxkICcsIHJlbmRlcmVkW2ldKTtcblx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fVxufTtcbmV4cG9ydCBkZWZhdWx0IHBsYWNlO1xuIiwiY29uc3QgcGxhY2VBZnRlciA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQWZ0ZXI7XG4iLCJjb25zdCBwbGFjZUJlZm9yZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsKTtcblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYWNlQmVmb3JlO1xuIiwiY29uc3QgcGxhY2VGaXJzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IHJlbmRlcmVkLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdwbGFjZSBmaXJzdCcsIGksIHJlbmRlcmVkW2ldKTtcblx0XHRcdGlmICh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgYmVmb3JlIGZpcnN0Jyk7XG5cdFx0XHRcdHRhcmdldEVsLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwuY2hpbGRyZW5bMF0pO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBhcyBmaXJzdCcpO1xuXHRcdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2VGaXJzdDtcbiIsImNvbnN0IHBsYWNlTGFzdCA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VMYXN0O1xuIiwiY29uc3QgcmVwbGFjZSA9IHtcblx0YmVmb3JlOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YmVmb3JlRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdG1haW46IGZ1bmN0aW9uKHRhcmdldEVsLCByZW5kZXJlZCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5uZXh0U2libGluZyk7XG5cdFx0fVxuXG5cdH0sXG5cdGFmdGVyRWFjaDogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG5cdGFmdGVyOiBmdW5jdGlvbih0YXJnZXRFbC8qLCByZW5kZXJlZCovKSB7XHRcdFxuXHRcdGlmICh0YXJnZXRFbC5ub2RlTmFtZSAhPT0gJ05UJyl7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhcmdldEVsKTtcblx0XHR9XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2U7XG4iLCJpbXBvcnQgcGxhY2UgZnJvbSAnLi9wbGFjZSc7XG5pbXBvcnQgcGxhY2VBZnRlciBmcm9tICcuL3BsYWNlQWZ0ZXInO1xuaW1wb3J0IHBsYWNlQmVmb3JlIGZyb20gJy4vcGxhY2VCZWZvcmUnO1xuaW1wb3J0IHBsYWNlRmlyc3QgZnJvbSAnLi9wbGFjZUZpcnN0JztcbmltcG9ydCBwbGFjZUxhc3QgZnJvbSAnLi9wbGFjZUxhc3QnO1xuaW1wb3J0IHJlcGxhY2UgZnJvbSAnLi9yZXBsYWNlJztcblxuY29uc3Qgbm90UGxhY2VycyA9IHtcblx0cGxhY2U6IHBsYWNlLFxuXHRwbGFjZUFmdGVyOiBwbGFjZUFmdGVyLFxuXHRwbGFjZUJlZm9yZTogcGxhY2VCZWZvcmUsXG5cdHBsYWNlRmlyc3Q6IHBsYWNlRmlyc3QsXG5cdHBsYWNlTGFzdDogcGxhY2VMYXN0LFxuXHRyZXBsYWNlOiByZXBsYWNlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RQbGFjZXJzO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgT1BUUyBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi9ub3RUZW1wbGF0ZUNhY2hlJztcbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL25vdFJlbmRlcmVyJztcbmltcG9ydCBub3RQbGFjZXJzIGZyb20gJy4vcGxhY2Vycyc7XG5cbmNvbnN0IE1FVEFfUEFSVFMgPSBTeW1ib2woJ3BhcnRzJyk7XG4vKlxuXHRpbnB1dCA9IHtcblx0XHRkYXRhOiBub3RSZWNvcmQgb3IgW25vdFJlY29yZF0sXG5cdFx0dGVtcGxhdGU6IHtcblx0XHRcdGh0bWw6IGh0bWwoc3RyaW5nKSwgXHRcdC8v0YLQtdC60YHRgiDRgSBodG1sINC60L7QtNC+0Lwg0YjQsNCx0LvQvtC90LBcblx0XHRcdGVsOiBIVE1MRWxlbWVudChvYmplY3QpLCBcdC8vRE9NINGN0LvQtdC80LXQvdGCXG5cdFx0XHRzcmM6IHNyYyhzdHJpbmcpLFx0XHRcdC8v0YHRgdGL0LvQutCwINC90LAg0YTQsNC50Lsg0YEg0YjQsNCx0LvQvtC90L7QvFxuXHRcdFx0bmFtZTogbmFtZShzdHJpbmcpXHRcdFx0Ly/QvdCw0LfQstCw0L3QuNC1INGI0LDQsdC70L7QvdCwINC00LvRjyDQv9C+0LjRgdC60LAg0LIg0LrRjdGI0LUgbm90VGVtcGxhdGVDYWNoZVxuXHRcdH1cblx0XHRvcHRpb25zOntcblx0XHRcdGhlbHBlcnM6IG9iamVjdFxuXHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdC8v0LAg0Y3RgtC+INC60LDQuiDQsdGD0LTQtdC8INC/0L7QvNC10YnQsNGC0Ywg0YDQtdC30YPQu9GM0YLQsNGCINGA0LXQvdC00LXRgNC40L3Qs9CwXG5cdFx0XHRyZW5kZXJBbmQ6IHBsYWNlU3R5bGUoc3RyaW5nKSDQvtC00LjQvSDQuNC3INCy0LDRgNC40LDQvdGC0L7QslxuXHRcdFx0XHRcdHBsYWNlXHRcdC1cdNC/0L7QvNC10YnQsNC10Lwg0LLQvdGD0YLRgNC4INGG0LXQu9C10LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuXHRcdFx0XHRcdHJlcGxhY2VcdFx0LVx00LfQsNC80LXQvdGP0LXQvFxuXHRcdFx0XHRcdHBsYWNlQWZ0ZXJcdC1cdNC/0L7RgdC70LVcblx0XHRcdFx0XHRwbGFjZUJlZm9yZVx0LVx00LTQvlxuXHRcdFx0XHRcdHBsYWNlRmlyc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C10YDQstGL0Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdFx0XHRcdHBsYWNlTGFzdFx0LVx00LLQvdGD0YLRgNC4INC/0L7RgdC70LXQtNC90LjQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0fVxuXHR9XG4qL1xuY2xhc3Mgbm90Q29tcG9uZW50IGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHRcdHRoaXMub24oJ3JlYWR5JywgdGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCl7XG5cdFx0aWYgKHRoaXMub3duZXIpe1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLm93bmVyLmdldEJyZWFkQ3J1bXBzKCksIHRoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gW3RoaXMuZ2V0T3B0aW9ucygnaWQnKV07XG5cdFx0fVxuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLm93bmVyID0gaW5wdXQub3duZXI/aW5wdXQub3duZXI6bnVsbDtcblx0XHR0aGlzLmluaXRPcHRpb25zKGlucHV0Lm9wdGlvbnMgPyBpbnB1dC5vcHRpb25zIDoge30pO1xuXHRcdHRoaXMuaW5pdFdvcmtpbmcoaW5wdXQpO1xuXHRcdHRoaXMucHJlcGFyZVRlbXBsYXRlRWxlbWVudChpbnB1dC50ZW1wbGF0ZSA/IGlucHV0LnRlbXBsYXRlIDogbnVsbCk7XG5cdH1cblxuXHRpbml0RGF0YSh2YWwpIHtcblx0XHR0aGlzLnNldERhdGEodmFsKTtcblx0fVxuXG5cdGluaXRFdmVudHMobGlzdCl7XG5cdFx0Zm9yKGxldCB0IG9mIGxpc3Qpe1xuXHRcdFx0dGhpcy5vbiguLi50KTtcblx0XHR9XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnaWQnKSl7XG5cdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2lkJywgT1BUUy5DT01QT05FTlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSk7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdudEVsJykpe1xuXHRcdFx0dGhpcy5pbml0TWFya0VsZW1lbnQoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFya0VsZW1lbnQoKXtcblx0XHRsZXQgbWFya0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbnQnKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0bWFya0VsLnNldEF0dHJpYnV0ZSgnbnQtcmVuZGVyZWQnLCB0cnVlKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ250RWwnLCBtYXJrRWwpO1xuXHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKSxcblx0XHRcdHRhcmdldFF1ZXJ5ID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRRdWVyeScpO1xuXHRcdGlmICh0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZiAodGFyZ2V0KXtcblx0XHRcdFx0dGhpcy5zZXRPcHRpb25zKCd0YXJnZXRFbCcsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpe1xuXHRcdFx0dGhyb3cgJ05vIHRhcmdldCB0byBwbGFjZSByZW5kZXJlZCc7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIubWFpbih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksIFttYXJrRWxdKTtcblx0XHR9XG5cblx0fVxuXG5cdGluaXRXb3JraW5nKHZhbCkge1xuXHRcdHRoaXMudW5zZXRSZWFkeSh2YWwpO1xuXHR9XG5cblx0cHJlcGFyZVRlbXBsYXRlRWxlbWVudCh2YWwpIHtcblx0XHRpZiAoIXZhbCkge1xuXHRcdFx0dGhpcy51bnNldFJlYWR5KCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2h0bWwnKSAmJiB2YWwuaHRtbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLndyYXAoJycsICcnLCB2YWwuaHRtbCkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdlbCcpICYmIHZhbC5lbCkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudCh2YWwuZWwuY2xvbmVOb2RlKHRydWUpKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnc3JjJykgJiYgdmFsLnNyYykge1xuXHRcdFx0bm90VGVtcGxhdGVDYWNoZS5hZGRGcm9tVVJMKHZhbC5zcmMsIHZhbC5zcmMpXG5cdFx0XHRcdC50aGVuKHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQuYmluZCh0aGlzKSlcblx0XHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCduYW1lJykgJiYgdmFsLm5hbWUpIHtcblx0XHRcdHRoaXMuc2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS5nZXQodmFsLm5hbWUpKTtcblx0XHR9XG5cdH1cblxuXHRzZXRQcm90b1RlbXBsYXRlRWxlbWVudChjb250KSB7XG5cdFx0aWYgKGNvbnQpIHtcblx0XHRcdHRoaXMuc2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnLCBjb250KTtcblx0XHRcdHRoaXMudHJpZ2dlcigncmVhZHknKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdXcm9uZyB0ZW1wbGF0ZSBjb250YWluZXIgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50Jyk7XG5cdH1cblxuXHRnZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3Byb3RvVGVtcGxhdGVFbGVtZW50JykuY2xvbmVOb2RlKHRydWUpO1xuXHR9XG5cblx0Z2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdHJlc2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCd0ZW1wbGF0ZUVsZW1lbnQnLCB0aGlzLmdldFByb3RvVGVtcGxhdGVFbGVtZW50KCkuY2xvbmVOb2RlKHRydWUpKTtcblx0fVxuXG5cdHNldFJlYWR5KCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncmVhZHknLCB0cnVlKTtcblx0fVxuXG5cdHVuc2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIGZhbHNlKTtcblx0fVxuXG5cdGlzUmVhZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncmVhZHknKTtcblx0fVxuXG5cdGNsZWFyUGFydHMoKSB7XG5cdFx0Lyog0LjQt9Cy0LXRidCw0LXQvCDQvtCxINGD0LTQsNC70LXQvdC40Lgg0Y3Qu9C10LzQtdC90YLQvtCyICovXG5cdFx0aWYgKHRoaXNbTUVUQV9QQVJUU10gJiYgQXJyYXkuaXNBcnJheSh0aGlzW01FVEFfUEFSVFNdKSAmJiB0aGlzW01FVEFfUEFSVFNdLmxlbmd0aCkge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiB0aGlzW01FVEFfUEFSVFNdKSB7XG5cdFx0XHRcdGlmICh0LmRlc3Ryb3kpe1xuXHRcdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMucmVzZXRQYXJ0cygpO1xuXHR9XG5cblx0ZGVzdHJveSgpe1xuXHRcdHRoaXMuY2xlYXJQYXJ0cygpO1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ250RWwnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ250RWwnKS5wYXJlbnROb2RlKXtcblx0XHRcdHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5nZXRPcHRpb25zKCdudEVsJykpO1xuXHRcdH1cblx0XHR0aGlzLmRlYWQgPSB0cnVlO1xuXHRcdHRoaXMub2ZmQWxsKCk7XG5cdH1cblxuXHRyZXNldFBhcnRzKCkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10gPSBbXTtcblx0fVxuXG5cdGdldFBhcnRzKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfUEFSVFNdO1xuXHR9XG5cblx0YWRkUGFydCh0ZW1wbGF0ZSkge1xuXHRcdHRoaXNbTUVUQV9QQVJUU10ucHVzaCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0dGhpcy5yZW1vdmVPYnNvbGV0ZVBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnJlbmRlclBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLnBsYWNlUmVuZGVyZWQoKTtcblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclVwZGF0ZScpO1xuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpIHtcblx0XHRcdGxldCBwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHBsYWNlci5iZWZvcmUodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHRcdHRoaXMuZm9yRWFjaERhdGEodGhpcy5wbGFjZVBhcnQuYmluZCh0aGlzKSk7XG5cdFx0XHRwbGFjZXIuYWZ0ZXIodGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCdubyB0YXJnZXQgZWxlbWVudCcpO1xuXHRcdH1cblx0fVxuXG5cdHBsYWNlUGFydChkYXRhLCBpbmRleCl7XG5cdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSksXG5cdFx0XHRub2RlcyA9IHBhcnQuZ2V0U3Rhc2goKSxcblx0XHRcdHRhcmdldEVsLFxuXHRcdFx0bGFzdE5vZGUsXG5cdFx0XHRwbGFjZXI7XG5cdFx0aWYgKGluZGV4ID09PSAwKXtcblx0XHRcdHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcihPUFRTLkRFRkFVTFRfUExBQ0VSX0xPT1ApO1xuXHRcdFx0dGFyZ2V0RWwgPSB0aGlzLmdldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJyk7XG5cdFx0fVxuXHRcdHBsYWNlci5tYWluKHRhcmdldEVsLCBub2Rlcyk7XG5cdFx0bGFzdE5vZGUgPSB0YXJnZXRFbDtcblx0XHRmb3IobGV0IHQgb2Ygbm9kZXMpe1xuXHRcdFx0aWYgKHQubm9kZVR5cGUgPT09IDEpe1xuXHRcdFx0XHRsYXN0Tm9kZSA9IHQ7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtY29tcG9uZW50JywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRcdFx0bGFzdE5vZGUuc2V0QXR0cmlidXRlKCdudC1wYXJ0JywgcGFydC5nZXRXb3JraW5nKCdwYXJ0SWQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnbGFzdFBsYWNlZE5vZGUnLCBsYXN0Tm9kZSk7XG5cdH1cblxuXHRnZXRQbGFjZXIobWV0aG9kKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdzZWFyY2hpbmcgZm9yIHBsYWNlcicsIG1ldGhvZCk7XG5cdFx0aWYgKG5vdFBsYWNlcnMuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbbWV0aG9kXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5vdFBsYWNlcnNbT1BUUy5ERUZBVUxUX1BMQUNFUl07XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaERhdGEoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgpKSkge1xuXHRcdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCB0aGlzLmdldERhdGEoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0RGF0YSgpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKSwgMCk7XG5cdFx0fVxuXHR9XG5cblx0Zm9yRWFjaFBhcnQoZnVuYykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuZ2V0UGFydHMoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdGZ1bmModGhpcy5nZXRQYXJ0cygpW3RdLCB0KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdNC10YHQu9C4INGBINC00LDQvdC90YvQvNC4INC90LUg0YHQstGP0LfQsNC9INGA0LXQvdC00LXRgNC10YAgLSDRgdC+0LfQtNCw0LXQvFxuXHQqL1xuXG5cdHJlbmRlclBhcnQoZGF0YSkge1xuXHRcdGlmICghdGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ2NyZWF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHRsZXQgcmVuZGVyZXIgPSBuZXcgbm90UmVuZGVyZXIoe1xuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHR0ZW1wbGF0ZTogdGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudENsb25lLmJpbmQodGhpcyksXG5cdFx0XHRcdG9wdGlvbnM6IHRoaXMuZ2V0T3B0aW9ucygpLFxuXHRcdFx0XHRjb21wb25lbnQ6IHRoaXNcblx0XHRcdH0pO1xuXHRcdFx0Ly9yZW5kZXJlci5vbignb2Jzb2xldGUnLCB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuYWRkUGFydChyZW5kZXJlcik7XG5cdFx0fWVsc2V7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coJ3VwZGF0aW5nIHBhcnQgcmVuZGVyJyk7XG5cdFx0XHR0aGlzLnVwZGF0ZVBhcnQodGhpcy5nZXRQYXJ0QnlEYXRhKGRhdGEpKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVQYXJ0KHBhcnQpe1xuXHRcdHBhcnQudXBkYXRlKCk7XG5cdH1cblxuXHRyZW1vdmVPYnNvbGV0ZVBhcnRzKCkge1xuXHRcdC8v0LrQvtC90LLQtdC10YAg0L/QvtC40YHQuiDQsNC60YLRg9Cw0LvRjNC90YvRhSAtINGD0LTQsNC70LXQvdC40LUg0L7RgdGC0LDQu9GM0L3Ri9GFXG5cdFx0bm90Q29tbW9uLnBpcGUoXG5cdFx0XHR1bmRlZmluZWQsIC8vIHBhcnRzIHRvIHNlYXJjaCBpbiwgY2FuIGJlICd1bmRlZmluZWQnXG5cdFx0XHRbXG5cdFx0XHRcdHRoaXMuZmluZEFjdHVhbFBhcnRzLmJpbmQodGhpcyksIC8vZmlyc3Qgcm91bmQsIHNlYXJjaCBmb3Igb2Jzb2xldGVcblx0XHRcdFx0dGhpcy5yZW1vdmVOb3RBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL3JlbW92ZSAnZW1cblx0XHRcdF1cblx0XHQpO1xuXHR9XG5cblx0Lypcblx0XHTQtdGB0YLRjCDQtNCw0L3QvdGL0LUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDQsNC60YLRg9Cw0LvRjNC90L4sXG5cdFx00L3QtdGCINC00LDQvdC90YvRhSDQuCDQtdGB0YLRjCDRgNC10L3QtNC10YDQtdGAIC0g0LfQvdCw0YfQuNGCINGB0YLQsNGA0YzRkVxuXHQqL1xuXG5cdGZpbmRBY3R1YWxQYXJ0cygpIHtcblx0XHRsZXQgYWN0dWFsUGFydHMgPSBbXTtcblx0XHR0aGlzLmZvckVhY2hEYXRhKChkYXRhLyosIGluZGV4Ki8pPT57XG5cdFx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKTtcblx0XHRcdGlmIChwYXJ0KXtcblx0XHRcdFx0YWN0dWFsUGFydHMucHVzaChwYXJ0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gYWN0dWFsUGFydHM7XG5cdH1cblxuXHQvKlxuXHRcdNGD0LTQsNC70Y/QtdC8INCy0YHQtSDQutGA0L7QvNC1INCw0LrRgtGD0LDQu9GM0L3Ri9GFXG5cdCovXG5cdHJlbW92ZU5vdEFjdHVhbFBhcnRzKGFjdHVhbFBhcnRzKXtcblx0XHRmb3IobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRQYXJ0cygpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmIChhY3R1YWxQYXJ0cy5pbmRleE9mKHRoaXMuZ2V0UGFydHMoKVt0XSkgPT09IC0xKXtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpW3RdLmRlc3Ryb3koKTtcblx0XHRcdFx0dGhpcy5nZXRQYXJ0cygpLnNwbGljZSh0LCAxKTtcblx0XHRcdFx0dC0tO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldFBhcnRCeURhdGEoZGF0YSkge1xuXHRcdGZvciAobGV0IHQgaW4gdGhpcy5nZXRQYXJ0cygpKSB7XG5cdFx0XHRpZiAodGhpcy5nZXRQYXJ0cygpW3RdLmlzRGF0YShkYXRhKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRQYXJ0cygpW3RdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRzaG93KCl7XG5cdFx0XG5cdH1cblxuXHRoaWRlKCl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb21wb25lbnQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICcucGFnZS1jb250ZW50Jyxcblx0T1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCA9ICcuaHRtbCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMID0gdHJ1ZSxcblx0T1BUX0RFRkFVTFRfUExVUkFMX05BTUUgPSAnTW9kZWxzJyxcblx0T1BUX0RFRkFVTFRfU0lOR0xFX05BTUUgPSAnTW9kZWwnLFxuXHRPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSA9ICdtYWluJyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0FORCA9ICdwbGFjZSc7XG5cbmNsYXNzIG5vdENvbnRyb2xsZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoYXBwKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJlYWR5OiBmYWxzZSxcblx0XHRcdHZpZXdzOiB7fSxcblx0XHRcdGxpYnM6e30sXG5cdFx0XHR2aWV3TmFtZTogT1BUX0RFRkFVTFRfVklFV19OQU1FLFxuXHRcdFx0aGVscGVyczoge31cblx0XHR9KTtcblx0XHR0aGlzLnNldERhdGEoe30pO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRtb2R1bGVOYW1lOiBPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSxcblx0XHRcdGNvbnRhaW5lclNlbGVjdG9yOiBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IsXG5cdFx0XHRwcmVmaXg6IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZScpLFxuXHRcdFx0cG9zdGZpeDogT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCxcblx0XHRcdHJlbmRlckZyb21VUkw6IE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCxcblx0XHRcdG5hbWVzOntcblx0XHRcdFx0cGx1cmFsOk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FLFxuXHRcdFx0XHRzaW5nbGU6IE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLmluaXRSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0Lypcblx0XHQgICAg0YHRgNCw0LfRgyDQtNC10LvQsNC10Lwg0LTQvtGB0YLRg9C/0L3Ri9C80Lgg0LzQvtC00LXQu9C4IG5vdFJlY29yZCDQuNC3IG5jYENvbnRyb2xsZXJOYW1lYCDQsdGD0LTRg9GCINC00L7RgdGC0YPQv9C90Ysg0LrQsNC6IHRoaXMubnJgTW9kZWxOYW1lYFxuXHRcdCovXG5cdFx0bGV0IGludGVyZmFjZXMgPSB0aGlzLmFwcC5nZXRJbnRlcmZhY2VzKCk7XG5cdFx0dGhpcy5tYWtlID0ge307XG5cdFx0Zm9yIChsZXQgdCBpbiBpbnRlcmZhY2VzKSB7XG5cdFx0XHRpZiAoaW50ZXJmYWNlcy5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdHRoaXMubWFrZVt0XSA9IGludGVyZmFjZXNbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdFJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyKHRoaXMuZ2V0V29ya2luZygndmlld05hbWUnKSwgdGhpcy5nZXREYXRhKCksIHRoaXMuZ2V0V29ya2luZygnaGVscGVycycpKTtcblx0fVxuXG5cdHJlbmRlcih2aWV3TmFtZSA9J2RlZmF1bHQnIC8qIHZpZXcgbmFtZSAqLywgZGF0YSA9IHt9IC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzID0ge30vKiBjb3VsZCBiZSBub3QgcmVwcmVzZW50ZWQgKi8pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHZhciB2aWV3ID0gdGhpcy5nZXRWaWV3KHZpZXdOYW1lKTtcblxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3ID09PSAndW5kZWZpbmVkJyB8fCB2aWV3ID09PSBudWxsKSB7XG5cdFx0XHRcdHJlamVjdCgnTm8gdmlldyBmb3VuZCcsIHZpZXdOYW1lKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2aWV3ID0gbm90Q29tbW9uLmV4dGVuZCh7fSwgdmlldyk7XG5cdFx0XHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0XHRcdC8vINGN0LvQtdC80LXQvdGC0LAsINC90L4g0LjQt9Cy0LXRgdGC0L3QvtC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGA0LVcblx0XHRcdFx0aWYgKCgodHlwZW9mIHZpZXcudGFyZ2V0RWwgPT09ICd1bmRlZmluZWQnKSB8fCAodmlldy50YXJnZXRFbCA9PT0gbnVsbCkpICYmICh0eXBlb2Ygdmlldy50YXJnZXRRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy50YXJnZXRRdWVyeSAhPT0gbnVsbCAmJiB2aWV3LnRhcmdldFF1ZXJ5Lmxlbmd0aCA+IDApKSB7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iodmlldy50YXJnZXRRdWVyeSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHZpZXcuaGVscGVycywgaGVscGVycyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0fVxuXHRcdFx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0XHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckZyb21VUkwnKSkge1xuXHRcdFx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygdmlldy50ZW1wbGF0ZVVSTCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldy50ZW1wbGF0ZVVSTCA9PSBudWxsIHx8IHZpZXcudGVtcGxhdGVVUkwubGVuZ3RoID09IDApIHtcblx0XHRcdFx0XHRcdGxldCBwcmVmaXggPSAodmlldy5jb21tb24gPyB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5jb21tb24nKTogdGhpcy5nZXRNb2R1bGVQcmVmaXgoKSksXG5cdFx0XHRcdFx0XHRcdG5hbWUgPSAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiB2aWV3TmFtZSksXG5cdFx0XHRcdFx0XHRcdHBvc3RmaXggPSB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHRcdC8v0LPQtdC90LXRgNC40YDRg9C10Lwg0LDQtNGA0LXRgSDQv9C+INGI0LDQsdC70L7QvdGDXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gIFtwcmVmaXgsIG5hbWVdLmpvaW4oJy8nKSArIHBvc3RmaXg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8v0LAg0LXRgdC70Lgg0LXRgdGC0Ywg0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCwg0YLQvlxuXHRcdFx0XHRcdGlmICh2aWV3Lmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU5hbWUnKSkge1xuXHRcdFx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVOYW1lID0gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIHZpZXcudGVtcGxhdGVOYW1lICsgdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTp7XG5cdFx0XHRcdFx0XHRuYW1lOiB2aWV3LnRlbXBsYXRlTmFtZSxcblx0XHRcdFx0XHRcdHNyYzogdmlldy50ZW1wbGF0ZVVSTCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czpbWydhZnRlclJlbmRlcicsIHJlc29sdmVdXSxcblx0XHRcdFx0XHRvcHRpb25zOntcblx0XHRcdFx0XHRcdHRhcmdldEVsOiB2aWV3LnRhcmdldEVsLFxuXHRcdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRcdHJlbmRlckFuZDogdmlldy5yZW5kZXJBbmQgfHwgT1BUX0RFRkFVTFRfUkVOREVSX0FORFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRBcHAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwO1xuXHR9XG5cblx0c2V0TW9kZWwobW9kZWwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGVsJywgbW9kZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kZWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnbW9kZWwnKTtcblx0fVxuXG5cdHNldFJlYWR5KHZhbCA9IHRydWUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdmFsKTtcblx0XHR2YWwgPyB0aGlzLnRyaWdnZXIoJ3JlYWR5JykgOiB0aGlzLnRyaWdnZXIoJ2J1c3knKTtcblx0fVxuXG5cdHNldFZpZXcobmFtZSwgdmlldyl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSwgdmlldyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRWaWV3cyh2aWV3cyl7XG5cdFx0Zm9yKGxldCB0IGluIHZpZXdzKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgdCksIHZpZXdzW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRWaWV3KG5hbWUgPSAnZGVmYXVsdCcpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpKTtcblx0fVxuXG5cdHNldE1vZHVsZU5hbWUodmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdtb2R1bGVOYW1lJywgdmFsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZHVsZU5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnbW9kdWxlTmFtZScpO1xuXHR9XG5cblx0Z2V0TW9kdWxlUHJlZml4KCl7XG5cdFx0cmV0dXJuIFt0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGVzJyksIHRoaXMuZ2V0TW9kdWxlTmFtZSgpXS5qb2luKCcvJyk7XG5cdH1cblxuXHRwcmVsb2FkTGliKGxpc3QgPSB7fSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRpZih0eXBlb2YgbGlzdCAhPT0gJ29iamVjdCcpe1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gbGlzdCl7XG5cdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykucHVzaChsaXN0W3RdKTtcblx0XHRcdFx0XHR0aGlzLm1ha2VbbGlzdFt0XV0oe30pLiRsaXN0QWxsKClcblx0XHRcdFx0XHRcdC50aGVuKChkYXRhKT0+e1xuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbGlicycpKXtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2xpYnMnLCB7fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRPcHRpb25zKCdsaWJzJylbdF0gPSBkYXRhO1xuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pID4gLTEpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnNwbGljZSh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pLCAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KGVycik7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHF1ZWVVcGxvYWQobmFtZSwgbGlzdCl7XG5cdFx0Ly9oYXNoIChmaWVsZE5hbWU9PmZpbGVzTGlzdClcblx0XHRpZighdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRRdWVlJykpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd1cGxvYWRRdWVlJywge30pO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnKVtuYW1lXSA9IGxpc3Q7XG5cdH1cblxuXHRleGVjVXBsb2FkcyhpdGVtKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0V29ya2luZygndXBsb2FkUXVlZScpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0aWYodHlwZW9mIGxpc3QgIT09ICdvYmplY3QnKXtcblx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwbG9hZGluZycsIHt9KTtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGxpc3Qpe1xuXHRcdFx0XHRcdGxldCBmaWVsZEZpbGVzID0gbGlzdFt0XTtcblx0XHRcdFx0XHRpZiAoZmllbGRGaWxlcy5sZW5ndGggPiAxKXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSBbXTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSAnJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yKGxldCBmID0gMDsgZiA8IGZpZWxkRmlsZXMubGVuZ3RoOyBmKyspe1xuXHRcdFx0XHRcdFx0aWYoIXRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdID0gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0rKztcblx0XHRcdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3VwbG9hZGVyJylcblx0XHRcdFx0XHRcdFx0LnVwbG9hZChmaWVsZEZpbGVzW2ZdKVxuXHRcdFx0XHRcdFx0XHQudGhlbigoc2F2ZWRGaWxlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZmlsZSB1cGxvYWRlZCcsIHQsZiwgc2F2ZWRGaWxlKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdLS07XG5cdFx0XHRcdFx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XSA9PT0gMCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheShpdGVtW2ZdKSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtW3RdLnB1c2goc2F2ZWRGaWxlLmhhc2gpO1xuXHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVt0XSA9IHNhdmVkRmlsZS5oYXNoO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZihPYmplY3Qua2V5cyh0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKE9iamVjdC5rZXlzKHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0b25BZnRlclJlbmRlcigpe1xuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCA9ICdmb3JtXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfRk9STV9USVRMRSA9ICdGb3JtIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge30sXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUID0gWydvcHRpb25zJywgJ21hbmlmZXN0JywgJ2FwcCddO1xuXG5jbGFzcyBub3RGb3JtIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdwcmVmaXgnLCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50cycsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLnNldERhdGEobmV3IG5vdFJlY29yZCh7fSwgdGhpcy5nZXREYXRhKCkpKTtcblx0XHR9XG5cdFx0dGhpcy5vbignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjYW5jZWwnLCB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcykpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKTtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoKSB7XG5cdFx0bGV0IG1hbmlmZXN0ID0gdGhpcy5nZXRNYW5pZmVzdCgpO1xuXHRcdGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC5hY3Rpb25zKSB7XG5cdFx0XHRyZXR1cm4gbWFuaWZlc3QuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpKSA/IG1hbmlmZXN0LmFjdGlvbnNbdGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKV0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRnZXRGb3JtRmllbGRzTGlzdCgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0cm9sZSA9IHRoaXMuZ2V0T3B0aW9ucygncm9sZScsIE9QVF9ERUZBVUxUX1JPTEVfTkFNRSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpIHtcblxuXHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzKSB7XG5cdFx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xuXHRcdFx0XHRcdGxpc3QgPSBhY3Rpb25EYXRhLmZpZWxkc1tyb2xlXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdC8qXG5cdFx0UmVuZGVyaW5nXG5cdCovXG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHR9XG5cblx0Z2V0UGFydFRlbXBsYXRlTmFtZShmb3JtUGFydCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHRoaXMuYmluZEZvcm1FdmVudHMuYmluZCh0aGlzKV0sXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfRk9STV9USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KClbdF07XG5cdFx0XHRcdHRoaXMuYWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGVhckZpZWxkc0NvbXBvbmVudHMoKSB7XG5cdFx0bGV0IGNvbXBzID0gdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJyk7XG5cdFx0d2hpbGUgKGNvbXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbXBzWzBdLmNvbXBvbmVudC5kZXN0cm95KCk7XG5cdFx0XHRjb21wcy5zcGxpY2UoMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlicygpe1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRvcHRpb25zOiB7fSxcblx0XHRcdG1hbmlmZXN0OiB7fSxcblx0XHRcdGFwcDoge30sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAobm90Q29tbW9uLmdldEFwcCgpICYmIG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKSl7XG5cdFx0XHRyZXN1bHQuYXBwID0gbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQgJiYgdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKSl7XG5cdFx0XHRyZXN1bHQubWFuaWZlc3QgPSB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpLmZpZWxkcztcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSB7XG5cdFx0bGV0IGRlZiA9IE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04sXG5cdFx0XHRmaWVsZHNMaWJzID0gdGhpcy5nZXRGaWVsZHNMaWJzKCk7XG5cdFx0Zm9yKGxldCB0IG9mIE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUKXtcblx0XHRcdGlmIChmaWVsZHNMaWJzLmhhc093blByb3BlcnR5KHQpICYmIGZpZWxkc0xpYnNbdF0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSl7XG5cdFx0XHRcdHJldHVybiBmaWVsZHNMaWJzW3RdW2ZpZWxkTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkZWY7XG5cdH1cblxuXHRhZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpIHtcblx0XHRsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSk7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKT0+e1xuXHRcdFx0XHRyZXR1cm4gcGFyYW1zLml0ZW0udmFsdWUgPT09IHRoaXMuZ2V0RGF0YShmaWVsZE5hbWUpO1xuXHRcdFx0fSxcblx0XHRcdGZpZWxkOiByZWMuZmllbGQsXG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKVxuXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0Rm9ybVRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCcsXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlckRhdGFDaGFuZ2UnLCB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMocGFyYW1zKXtcblx0XHRub3RDb21tb24ubG9nKCdjb2xsZWN0IGRhdGEgZnJvbSBjb21wb25lbnRzJywgcGFyYW1zKTtcblx0fVxuXG5cdGdldEZvcm1UYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jyl7XG5cdFx0aWYgKCF0YXJnZXQpe3RhcmdldCA9ICdib2R5Jzt9XG5cdFx0bGV0IHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0IT09J2JvZHknKXtcblx0XHRcdHRhcmdldCA9ICdib2R5Jztcblx0XHRcdHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0fVxuXHRcdGlmKCFyZXMgJiYgdGFyZ2V0PT0nYm9keScpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHRjb2xsZWN0RGF0YSgpIHtcblx0XHQvL2xldCBkYXRhID0gdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcyk7XG5cdH1cblxuXHRiaW5kRm9ybUV2ZW50cygpe1xuXHRcdGxldCB0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZih0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZih0YXJnZXQpe1xuXHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3RhcmdldEVsJywgdGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSl7XG5cdFx0XHRsZXRcdGZvcm0gPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXHRcdFx0aWYoZm9ybSl7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR1cGRhdGVGaWVsZChmaWVsZE5hbWUpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uZmllbGQubmFtZSA9PT0gZmllbGROYW1lKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCkge1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpIHtcblxuXHR9XG5cblx0b25SZXNldCgpIHtcblxuXHR9XG5cblx0Z2V0RmllbGRzKCkge1xuXG5cdH1cblxuXHRhZGRGaWVsZCgpIHtcblxuXHR9XG5cblx0cmVtb3ZlRmllbGQoKSB7XG5cblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Rm9ybTtcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9ub3RGb3JtLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfVklFVyA9ICdlZGl0JyxcbiAgT1BUX0RFRkFVTFRfQUNUSU9OID0gJ2NyZWF0ZScsXG4gIE9QVF9ERUZBVUxUX0lURU0gPSB7XG4gICAgX2lkOiBudWxsLFxuICAgIHRpdGxlOiAnVGl0bGUnLFxuICAgIHZhbHVlOiAnVmFsdWUnXG4gIH07XG5cbmNsYXNzIENSVURDcmVhdGUgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuICAgICAgICBzdXBlcihwYXJlbnQuYXBwKTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcbiAgICAgICAgbm90Q29tbW9uLmxvZygnQ1JVRCBDcmVhdGUnKTtcbiAgICAgICAgdGhpcy5zZXRWaWV3cyh7XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLm5hbWUnKSB8fCBPUFRfREVGQVVMVF9WSUVXLFxuICAgICAgICAgICAgICAgIGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmNvbW1vbicpIHx8IHRydWUsXG4gICAgICAgICAgICAgICAgdGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG4gICAgICAgICAgICAgICAgaGVscGVyczoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUucHJlbG9hZCcpKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5pbml0RGF0YS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG4gICAgICAgICAgICAudGhlbih0aGlzLnJlbmRlckZvcm0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjcmVhdGVEZWZhdWx0KCl7XG4gICAgICBpZiAodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmRlZmF1bHRJdGVtJykgJiYgdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICYmIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSl7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0obm90Q29tbW9uLmV4dGVuZCh7fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmRlZmF1bHRJdGVtJykpKTtcbiAgICAgIH1lbHNlIGlmKHRoaXMucGFyZW50LmluaXRJdGVtKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmluaXRJdGVtKCk7XG4gICAgICB9ZWxzZSBpZiAodGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICYmIHRoaXMucGFyZW50Lm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSl7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0obm90Q29tbW9uLmV4dGVuZCh7fSwgT1BUX0RFRkFVTFRfSVRFTSkpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBuZXcgbm90UmVjb3JkKHt9LCBub3RDb21tb24uZXh0ZW5kKHt9LCBPUFRfREVGQVVMVF9JVEVNKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5pdERhdGEoKXtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICB0cnl7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuY3JlYXRlRGVmYXVsdCgpKTtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuZ2V0RGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKXtcbiAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcldyYXBwZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcignZGVmYXVsdCcsIHt9LCB7fSk7XG4gICAgfVxuXG4gICAgcmVuZGVyRm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+e1xuICAgICAgICAgICAgdGhpcy5mb3JtID0gbmV3IG5vdEZvcm0oe1xuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfQUNUSU9OLFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnByZWZpeCcpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuICAgICAgICAgICAgICAgICAgICByb2xlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUucm9sZScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcbiAgICAgICAgICAgICAgICAgICAgaGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG4gICAgICAgICAgICAgICAgICAgICAgbGlua0JhY2tUb0xpc3Q6IHRoaXMucGFyZW50LmxpbmtCYWNrVG9MaXN0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiAocGFyYW1zKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVzID0gcGFyYW1zLmUudGFyZ2V0LmZpbGVzIHx8IHBhcmFtcy5lLmRhdGFUcmFuc2Zlci5maWxlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RDb21tb24ubG9nKCdmaWxlIGNoYW5nZWQnLCBmaWxlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oZWxwZXJzLmZpZWxkLm5hbWUgJiYgZmlsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVlVXBsb2FkKHBhcmFtcy5oZWxwZXJzLmZpZWxkLm5hbWUsIGZpbGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90Q29tbW9uLmxvZygnc3VibWl0IGZvcm0gJywgdGhpcy5uZXdJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWNVcGxvYWRzKHRoaXMuZ2V0RGF0YSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbih0aGlzLmNyZWF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBhZnRlclN1Ym1pdDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ29Ub1RhYmxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGliczogdGhpcy5nZXRPcHRpb25zKCdsaWJzJyksXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5oZWxwZXJzJykgfHwge30pXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBldmVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAgWydhZnRlclJlbmRlcicsIHJlc29sdmVdLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ2FmdGVyU3VibWl0JywgJ2FmdGVyUmVzdG9yZSddLCB0aGlzLnBhcmVudC5iYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlKGl0ZW0pIHtcbiAgICAgICAgaXRlbVsnJCcgKyB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuYWN0aW9uJyldKClcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBub3RDb21tb24ubG9nKCdmb3JtIHNhdmVkJywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUodGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIG5vdENvbW1vbi5lcnJvcignZm9ybSBub3Qgc2F2ZWQnLCByZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURDcmVhdGU7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9QQUdFX1NJWkUgPSAyMCxcblx0T1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIgPSAwLFxuXHRPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTiA9IDEsXG5cdE9QVF9ERUZBVUxUX1NPUlRfRklFTEQgPSAnX2lkJyxcblx0T1BUX0ZJRUxEX05BTUVfUFJFX1BST0MgPSAncHJlcHJvY2Vzc29yJztcblxuY2xhc3Mgbm90VGFibGUgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCBbXSk7XG5cdFx0aWYoIXRoaXMuZ2V0RGF0YSgpIHx8ICFBcnJheS5pc0FycmF5KHRoaXMuZ2V0RGF0YSgncm93cycpKSl7XG5cdFx0XHR0aGlzLnNldERhdGEoe3Jvd3M6W119KTtcblx0XHR9XG5cdFx0dGhpcy5yZXNldFBhZ2VyKCk7XG5cdFx0dGhpcy5yZXNldEZpbHRlcigpO1xuXHRcdHRoaXMucmVzZXRTb3J0ZXIoKTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudCcpLnVwZGF0ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgY29tcG9uZW50ID0gbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdGRhdGE6IHt9LFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6ICd0YWJsZV93cmFwcGVyJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0cmVuZGVyQW5kOiB0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0aGVscGVyczogdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJylcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0W1xuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsICdhZnRlclVwZGF0ZSddLCB0aGlzLnJlbmRlckluc2lkZS5iaW5kKHRoaXMpXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHRdXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgY29tcG9uZW50KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJJbnNpZGUoKSB7XG5cdFx0dGhpcy5yZW5kZXJIZWFkZXIoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0XHR0aGlzLnJlbmRlckJvZHkoKTtcblx0XHR0aGlzLmJpbmRTZWFyY2goKTtcblx0XHR0aGlzLmJpbmRDdXN0b21CaW5kaW5ncygpO1xuXHR9XG5cblx0cmVuZGVySGVhZGVyKCkge1xuXHRcdHZhciB0YWJsZUhlYWRlciA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCd0aGVhZCB0cicpO1xuXHRcdGlmICghdGFibGVIZWFkZXIpIHJldHVybjtcblx0XHRsZXQgZmllbGRzID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG5ld1RoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEgnKTtcblx0XHRcdG5ld1RoLmlubmVySFRNTCA9IGZpZWxkc1tpXS50aXRsZTtcblx0XHRcdGlmIChmaWVsZHNbaV0uaGFzT3duUHJvcGVydHkoJ3NvcnRhYmxlJykgJiYgZmllbGRzW2ldLnNvcnRhYmxlKSB7XG5cdFx0XHRcdHRoaXMuYXR0YWNoU29ydGluZ0hhbmRsZXJzKG5ld1RoLCBmaWVsZHNbaV0ucGF0aCk7XG5cdFx0XHR9XG5cdFx0XHR0YWJsZUhlYWRlci5hcHBlbmRDaGlsZChuZXdUaCk7XG5cdFx0fVxuXHR9XG5cblx0YXR0YWNoU29ydGluZ0hhbmRsZXJzKGhlYWRDZWxsLCBmaWVsZE5hbWUpIHtcblx0XHRoZWFkQ2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLmNoYW5nZVNvcnRpbmdPcHRpb25zKGhlYWRDZWxsLCBmaWVsZE5hbWUpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0pO1xuXHRcdGhlYWRDZWxsLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0fVxuXG5cdGNoYW5nZVNvcnRpbmdPcHRpb25zKGVsLCBmaWVsZE5hbWUpIHtcblx0XHRpZiAoZmllbGROYW1lID09PSB0aGlzLmdldFNvcnRlcigpLnNvcnRCeUZpZWxkKXtcblx0XHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdFx0c29ydEJ5RmllbGQ6IGZpZWxkTmFtZSxcblx0XHRcdFx0c29ydERpcmVjdGlvbjogLTEgKiB0aGlzLmdldFNvcnRlcigpLnNvcnREaXJlY3Rpb24sXG5cdFx0XHR9KTtcblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuc2V0U29ydGVyKHtcblx0XHRcdFx0c29ydEJ5RmllbGQ6IGZpZWxkTmFtZSxcblx0XHRcdFx0c29ydERpcmVjdGlvbjogT1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04sXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0aWYgKGVsLnBhcmVudE5vZGUpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWwucGFyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXSA9PT0gZWwpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRcdGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0uc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnbm9uZScpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5nZXRTb3J0ZXIoKS5zb3J0RGlyZWN0aW9uID4gMCkge1xuXHRcdFx0ZWwuY2xhc3NMaXN0LnJlbW92ZSgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdhcmlhLXNvcnQnLCAnYXNjZW5kaW5nJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfYXNjJyk7XG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKCdzb3J0aW5nX2Rlc2MnKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ2Rlc2NlbmRpbmcnKTtcblx0XHR9XG5cdH1cblxuXHRzZXRTb3J0ZXIoaGFzaCkge1xuXHRcdC8vY29uc29sZS5sb2coJ3NldFNvcnRlcicsIGhhc2gpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnc29ydGVyJywgaGFzaCk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlRGF0YSgpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRTb3J0ZXIoKXtcblx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRzb3J0QnlGaWVsZDogT1BUX0RFRkFVTFRfU09SVF9GSUVMRCxcblx0XHRcdHNvcnREaXJlY3Rpb246IE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3NvcnRlcicpO1xuXHR9XG5cblx0Z2V0RmlsdGVyU2VhcmNoKCkge1xuXHRcdHJldHVybiAodHlwZW9mIHRoaXMuZ2V0RmlsdGVyKCkgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuZ2V0RmlsdGVyKCkgIT09IG51bGwgJiYgdHlwZW9mIHRoaXMuZ2V0RmlsdGVyKCkuZmlsdGVyU2VhcmNoICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaCAhPT0gbnVsbCkgPyB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaC50b1N0cmluZygpIDogJyc7XG5cdH1cblxuXHRpbnZhbGlkYXRlRGF0YSgpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdsaXZlTG9hZCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnb25lUGFnZXInKSkge1xuXHRcdFx0d2hpbGUodGhpcy5nZXREYXRhKCdyb3dzJykubGVuZ3RoPjApe1xuXHRcdFx0XHR0aGlzLmdldERhdGEoJ3Jvd3MnKS5wb3AoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMucmVzZXRQYWdlcigpO1xuXHRcdH1cblx0fVxuXG5cdHNldEZpbHRlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXInLCBoYXNoKTtcblx0XHR0aGlzLmludmFsaWRhdGVEYXRhKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZXNldEZpbHRlcigpIHtcblx0XHR0aGlzLnNldEZpbHRlcih7fSk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyJyk7XG5cdH1cblxuXHRzZXRQYWdlcihoYXNoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdwYWdlcicsIGhhc2gpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3BhZ2VyJywge1xuXHRcdFx0cGFnZVNpemU6IGlzTmFOKHRoaXMuZ2V0T3B0aW9ucygncGFnZVNpemUnKSkgPyBPUFRfREVGQVVMVF9QQUdFX1NJWkU6dGhpcy5nZXRPcHRpb25zKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogaXNOYU4odGhpcy5nZXRPcHRpb25zKCdwYWdlTnVtYmVyJykpID8gT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVI6dGhpcy5nZXRPcHRpb25zKCdwYWdlTnVtYmVyJyksXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdwYWdlcicpO1xuXHR9XG5cblx0c2V0VXBkYXRpbmcoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd1cGRhdGluZycsIHRydWUpO1xuXHR9XG5cblx0c2V0VXBkYXRlZCgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwZGF0aW5nJywgZmFsc2UpO1xuXHR9XG5cblx0aWZVcGRhdGluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCd1cGRhdGluZycpO1xuXHR9XG5cblx0dXBkYXRlRGF0YSgpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdsaXZlTG9hZCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlJykpIHtcblx0XHRcdGlmICh0aGlzLmlmVXBkYXRpbmcoKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQvL2xvYWQgZnJvbSBzZXJ2ZXJcblx0XHRcdGxldCBxdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlJykoe30pXG5cdFx0XHRcdC5zZXRGaWx0ZXIodGhpcy5nZXRGaWx0ZXIoKSlcblx0XHRcdFx0LnNldFNvcnRlcih0aGlzLmdldFNvcnRlcigpKVxuXHRcdFx0XHQuc2V0UGFnZXIodGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplLCB0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlcik7XG5cdFx0XHR0aGlzLnNldFVwZGF0aW5nKCk7XG5cdFx0XHRxdWVyeS4kbGlzdCgpXG5cdFx0XHRcdC50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZygnJGxpc3QgZm9yIHRhYmxlJywgZGF0YSk7XG5cdFx0XHRcdFx0dGhpcy5zZXREYXRhKHtcblx0XHRcdFx0XHRcdHJvd3M6IHRoaXMuZ2V0RGF0YSgncm93cycpLmNvbmNhdChkYXRhKVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHRoaXMucHJvY2Nlc3NEYXRhKCk7XG5cdFx0XHRcdFx0dGhpcy5yZWZyZXNoQm9keSgpO1xuXHRcdFx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0XHRub3RDb21tb24uZXJyb3IoZSk7XG5cdFx0XHRcdFx0dGhpcy5zZXRVcGRhdGVkKCk7XG5cdFx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvL2xvY2FsIG1hZ2ljXG5cdFx0XHR0aGlzLnNldFVwZGF0aW5nKCk7XG5cdFx0XHR0aGlzLnByb2NjZXNzRGF0YSgpO1xuXHRcdFx0dGhpcy5yZWZyZXNoQm9keSgpO1xuXHRcdFx0dGhpcy5zZXRVcGRhdGVkKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJvY2Nlc3NEYXRhKCkge1xuXHRcdHZhciB0aGF0RmlsdGVyID0gdGhpcy5nZXRGaWx0ZXIoKTtcblx0XHRpZiAodHlwZW9mIHRoYXRGaWx0ZXIgIT09ICd1bmRlZmluZWQnICYmIHRoYXRGaWx0ZXIgIT09IG51bGwgJiYgdHlwZW9mIHRoYXRGaWx0ZXIuZmlsdGVyU2VhcmNoICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gbnVsbCAmJiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaC5sZW5ndGggPiAwKSB7XG5cdFx0XHQvL1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKS5maWx0ZXIodGhpcy50ZXN0RGF0YUl0ZW0uYmluZCh0aGlzKSkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsIHRoaXMuZ2V0RGF0YSgncm93cycpKTtcblx0XHR9XG5cdFx0Ly8vL3NvcnRlclxuXHRcdHZhciB0aGF0U29ydGVyID0gdGhpcy5nZXRTb3J0ZXIoKTtcblx0XHRpZiAodHlwZW9mIHRoYXRTb3J0ZXIgIT09ICd1bmRlZmluZWQnICYmIHRoYXRTb3J0ZXIgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJykuc29ydCgoaXRlbTEsIGl0ZW0yKSA9PiB7XG5cdFx0XHRcdGxldCB0MSA9IG5vdFBhdGguZ2V0KHRoYXRTb3J0ZXIuc29ydEJ5RmllbGQsIGl0ZW0xLCB7fSksXG5cdFx0XHRcdFx0dDIgPSBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLGl0ZW0yLHt9KTtcblx0XHRcdFx0aWYgKGlzTmFOKHQxKSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgdDEgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0MiAhPT0gJ3VuZGVmaW5lZCcgJiYgdDEubG9jYWxlQ29tcGFyZSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdDEubG9jYWxlQ29tcGFyZSgpICogLSB0aGF0U29ydGVyLnNvcnREaXJlY3Rpb247XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuICgodDEgPCB0MikgPyAxIDogLTEpICogdGhhdFNvcnRlci5zb3J0RGlyZWN0aW9uO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRiaW5kU2VhcmNoKCkge1xuXHRcdHZhciBzZWFyY2hFbCA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwic2VhcmNoXCJdJylbMF07XG5cdFx0aWYgKCFzZWFyY2hFbCkgcmV0dXJuO1xuXHRcdHZhciBvbkV2ZW50ID0gKGUpID0+IHtcblx0XHRcdHRoaXMuc2V0RmlsdGVyKHtcblx0XHRcdFx0ZmlsdGVyU2VhcmNoOiBlLmN1cnJlbnRUYXJnZXQudmFsdWVcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblx0XHRzZWFyY2hFbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uRXZlbnQpO1xuXHRcdHNlYXJjaEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2VudGVyJywgb25FdmVudCk7XG5cdH1cblxuXG5cdGJpbmRDdXN0b21CaW5kaW5ncygpIHtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSB8fCAhdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGZvciAodmFyIHNlbGVjdG9yIGluIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSkge1xuXHRcdFx0dmFyIGVscyA9IHRoaXMuZ2V0T3B0aW9uKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0Zm9yICh2YXIgZWxJZCA9IDA7IGVsSWQgPCBlbHMubGVuZ3RoOyBlbElkKyspIHtcblx0XHRcdFx0dmFyIGVsID0gZWxzW2VsSWRdO1xuXHRcdFx0XHRmb3IgKHZhciBldmVudCBpbiB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJylbc2VsZWN0b3JdKSB7XG5cdFx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpW3NlbGVjdG9yXVtldmVudF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bG9hZE5leHQoKSB7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdwYWdlcicpLnBhZ2VOdW1iZXIrKztcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlbmRlclJvdyhpdGVtLCBpbmRleCkge1xuXHRcdGxldCBuZXdSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUUicpLFxuXHRcdFx0ZmllbGRzID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IG5ld1RkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVEQnKSxcblx0XHRcdFx0ZmllbGQgPSBmaWVsZHNbaV0sXG5cdFx0XHRcdHByZXByb2Nlc3NlZCA9IG51bGwsXG5cdFx0XHRcdHZhbCA9IG5vdFBhdGguZ2V0KGZpZWxkLnBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpKTtcblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZWRpdGFibGUnKSAmJiAhZmllbGQuaGFzT3duUHJvcGVydHkoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHRcdG5ld1RkLnNldEF0dHJpYnV0ZSgnY29udGVudEVkaXRhYmxlJywgdHJ1ZSk7XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQucGF0aCA9IGZpZWxkLnBhdGg7XG5cdFx0XHRcdG5ld1RkLmRhdGFzZXQuaXRlbUlkID0gaXRlbVt0aGlzLmdldE9wdGlvbnMoJ2l0ZW1JZEZpZWxkJyldO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0LnZhbHVlID0gdmFsO1xuXHRcdFx0XHRuZXdUZC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCk9Pntcblx0XHRcdFx0XHRub3RQYXRoLnNldChmaWVsZC5wYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSwgbmV3VGQudGV4dENvbnRlbnQpO1xuXHRcdFx0XHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGZpZWxkLmhhc093blByb3BlcnR5KE9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DKSkge1xuXHRcdFx0XHRwcmVwcm9jZXNzZWQgPSBmaWVsZFtPUFRfRklFTERfTkFNRV9QUkVfUFJPQ10odmFsLCBpdGVtLCBpbmRleCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnY29tcG9uZW50JykpIHtcblx0XHRcdFx0bmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YTogZmllbGQuY29tcG9uZW50LmRhdGEgfHwgcHJlcHJvY2Vzc2VkIHx8IHt2YWwsIGl0ZW0sIGluZGV4fSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTogZmllbGQuY29tcG9uZW50LnRlbXBsYXRlLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBuZXdUZCxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IGZpZWxkLmNvbXBvbmVudC5ldmVudHMgfHwgW11cblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXdUZC5pbm5lckhUTUwgPSBwcmVwcm9jZXNzZWQgfHwgdmFsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnc3R5bGUnKSl7XG5cdFx0XHRcdGZvcihsZXQgc3R5bGUgaW4gZmllbGQuc3R5bGUpe1xuXHRcdFx0XHRcdGlmKGZpZWxkLnN0eWxlLmhhc093blByb3BlcnR5KHN0eWxlKSl7XG5cdFx0XHRcdFx0XHRuZXdUZC5zdHlsZVtzdHlsZV0gPSBmaWVsZC5zdHlsZVtzdHlsZV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRzJykgJiYgZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdGZvciAodmFyIGogaW4gZmllbGQuZXZlbnRzKSB7XG5cdFx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcihqLCAoZSk9Pntcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHJldHVybiBmaWVsZC5ldmVudHNbal0oe1xuXHRcdFx0XHRcdFx0XHRldmVudDogZSxcblx0XHRcdFx0XHRcdFx0ZWxlbWVudDogbmV3VGQsXG5cdFx0XHRcdFx0XHRcdGl0ZW06IGl0ZW0sXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB2YWwsXG5cdFx0XHRcdFx0XHRcdGZpZWxkOiBmaWVsZFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRuZXdSb3cuYXBwZW5kQ2hpbGQobmV3VGQpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdwcm9jUm93JykpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3Byb2NSb3cnKShuZXdSb3csIGl0ZW0pO1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3Um93O1xuXHR9XG5cblx0cmVmcmVzaEJvZHkoKSB7XG5cdFx0dmFyIHRib2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXHRcdGlmICghdGJvZHkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5jbGVhckJvZHkoKTtcblx0XHR0aGlzLmNoZWNrRmlsdGVyZWQoKTtcblx0XHR2YXIgdGhpc1BhZ2VTdGFydHMgPSAwLFxuXHRcdFx0bmV4dFBhZ2VFbmRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyICsgMSk7XG5cdFx0Zm9yICh2YXIgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0dGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJSb3codGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKVtpXSkpO1xuXHRcdH1cblx0fVxuXG5cdGZpbmRCb2R5KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGJvZHknKTtcblx0fVxuXG5cdGNsZWFyQm9keSgpIHtcblx0XHR2YXIgdGFibGVCb2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXHRcdGlmICghdGFibGVCb2R5KSByZXR1cm47XG5cdFx0dGFibGVCb2R5LmlubmVySFRNTCA9ICcnO1xuXHR9XG5cblx0Y2hlY2tGaWx0ZXJlZCgpe1xuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpKSl7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScsW10pO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlckJvZHkoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ29uZVBhZ2VyJykpIHtcblx0XHRcdHRoaXMuY2xlYXJCb2R5KCk7XG5cdFx0fVxuXHRcdHRoaXMuY2hlY2tGaWx0ZXJlZCgpO1xuXHRcdHZhciB0aGlzUGFnZVN0YXJ0cyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciksXG5cdFx0XHRuZXh0UGFnZUVuZHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIgKyAxKSxcblx0XHRcdHRib2R5ID0gdGhpcy5maW5kQm9keSgpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IHRoaXNQYWdlU3RhcnRzOyBpIDwgTWF0aC5taW4obmV4dFBhZ2VFbmRzLCB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLmxlbmd0aCk7IGkrKykge1xuXHRcdFx0dGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJSb3codGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKVtpXSkpO1xuXHRcdH1cblx0fVxuXG5cdHRlc3REYXRhSXRlbShpdGVtKXtcblx0XHR2YXIgc3RyVmFsdWUgPSB0aGlzLmdldEZpbHRlclNlYXJjaCgpLnRvTG93ZXJDYXNlKCk7XG5cdFx0Zm9yKHZhciBrIGluIGl0ZW0pe1xuXHRcdFx0dmFyIHRvQ29tcCA9IGl0ZW1ba10udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0aWYgKHRvQ29tcC5pbmRleE9mKHN0clZhbHVlKT4tMSl7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90VGFibGU7XG4iLCJpbXBvcnQgbm90VGFibGUgZnJvbSAnLi4vY29tcG9uZW50cy9ub3RUYWJsZS5qcyc7XG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BfREVGQVVMVF9QQUdFX1NJWkUgPSA1MCxcblx0T1BUX0RFRkFVTFRfVklFVyA9ICdsaXN0JztcblxuY2xhc3MgQ1JVRExpc3QgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpIHtcblx0XHRzdXBlcihwYXJlbnQuYXBwKTtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0bm90Q29tbW9uLmxvZygnQ1JVRCBMaXN0Jyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5jb21tb24nKSB8fCB0cnVlLFxuXHRcdFx0XHR0YXJnZXRRdWVyeTogcGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuXHRcdFx0XHRoZWxwZXJzOiB7fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy51cGRhdGVEYXRhdGFibGUuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoJ2RlZmF1bHQnLCB7fSwge1xuXHRcdFx0dGl0bGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ25hbWVzLnBsdXJhbCcpLFxuXHRcdFx0c2hvd0FkZEZvcm06ICgpID0+IHtcblx0XHRcdFx0dGhpcy5wYXJlbnQuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKFt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCksICdjcmVhdGUnXS5qb2luKCcvJykpO1xuXHRcdFx0fSxcblx0XHRsaW5rQmFja1RvTGlzdDogdGhpcy5wYXJlbnQubGlua0JhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCksXG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGVEYXRhdGFibGUoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeXtcblx0XHRcdFx0dGhpcy50YWJsZVZpZXcgPSBuZXcgbm90VGFibGUoe1xuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGZpZWxkczogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5maWVsZHMnKSxcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiBub3RDb21tb24uZXh0ZW5kKHtcblx0XHRcdFx0XHRcdFx0dGl0bGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ25hbWVzLnBsdXJhbCcpXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmhlbHBlcnMnKSB8fCB7fSksXG5cdFx0XHRcdFx0XHRwYWdlU2l6ZTogdGhpcy5hcHAuZ2V0T3B0aW9ucygncGFnZXIuc2l6ZScpIHx8IE9QX0RFRkFVTFRfUEFHRV9TSVpFLFxuXHRcdFx0XHRcdFx0cGFnZU51bWJlcjogMCxcblx0XHRcdFx0XHRcdG9uZVBhZ2VyOiB0cnVlLFxuXHRcdFx0XHRcdFx0bGl2ZUxvYWQ6IHRydWUsXG5cdFx0XHRcdFx0XHRpbnRlcmZhY2U6IHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRldmVudHM6IFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0fSk7XG5cdFx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHNob3dOZXh0UGFnZSgpIHtcblx0XHRpZiAodGhpcy50YWJsZVZpZXcpIHtcblx0XHRcdHRoaXMudGFibGVWaWV3LmxvYWROZXh0KCk7XG5cdFx0fVxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRExpc3Q7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RGb3JtIGZyb20gJy4uL2NvbXBvbmVudHMvbm90Rm9ybS5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OID0gJ2dldFJhdycsXG5cdE9QVF9ERUZBVUxUX0FDVElPTiA9ICd1cGRhdGUnLFxuXHRPUFRfREVGQVVMVF9WSUVXID0gJ2VkaXQnO1xuXG5jbGFzcyBDUlVEVXBkYXRlIGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKSB7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgVXBkYXRlJyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuY29tbW9uJykgfHwgdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG5cdFx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMubG9hZEl0ZW0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlckZvcm0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bG9hZEl0ZW0oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKHtcblx0XHRcdCdfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJylcblx0XHR9KVsnJCcrKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5sb2FkQWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04pXSgpO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoJ2RlZmF1bHQnLCB0aGlzLmdldERhdGEoKSwge30pO1xuXHR9XG5cblx0cmVuZGVyRm9ybSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHRyeXtcblx0XHRcdFx0dGhpcy5mb3JtID0gbmV3IG5vdEZvcm0oe1xuXHRcdFx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRcdGFjdGlvbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0FDVElPTixcblx0XHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRcdHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnByZWZpeCcpfHx0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdwcmVmaXgnKSxcblx0XHRcdFx0XHRcdHJvbGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5yb2xlJyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcblx0XHRcdFx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0XHRcdFx0aGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRcdGZpbGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRsZXQgZmlsZXMgPSBwYXJhbXMuZS50YXJnZXQuZmlsZXMgfHwgcGFyYW1zLmUuZGF0YVRyYW5zZmVyLmZpbGVzO1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5sb2coJ2ZpbGUgY2hhbmdlZCcsIGZpbGVzKTtcblx0XHRcdFx0XHRcdFx0XHRpZihwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lICYmIGZpbGVzKXtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucXVlZVVwbG9hZChwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRzdWJtaXQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdzdWJtaXQgZm9ybSAnLCBwYXJhbXMuaXRlbSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5leGVjVXBsb2FkcyhwYXJhbXMuaXRlbSlcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRsaWJzOiB0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKSxcblx0XHRcdFx0XHRcdFx0YWZ0ZXJTdWJtaXQ6IHRoaXMucGFyZW50LmJhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCksXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuaGVscGVycycpIHx8IHt9KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRcdFsnYWZ0ZXJSZXN0b3JlJywgJ2FmdGVyU3VibWl0J10sIHRoaXMucGFyZW50LmJhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudClcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fWNhdGNoKGUpe1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUoaXRlbSkge1xuXHRcdGl0ZW1bJyQnKyh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuYWN0aW9uJyl8fE9QVF9ERUZBVUxUX0FDVElPTildKClcblx0XHRcdC50aGVuKChyZXN1bHQpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygnZm9ybSBzYXZlZCcsIHJlc3VsdCk7XG5cdFx0XHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLmdldE1vZHVsZU5hbWUoKSk7XG5cdFx0XHRcdHRoaXMucGFyZW50LnJ1bkxpc3QoKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKHJlc3VsdCkgPT4ge1xuXHRcdFx0XHRub3RDb21tb24uZXJyb3IoJ2Zvcm0gbm90IHNhdmVkJywgcmVzdWx0KTtcblx0XHRcdH0pO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRFVwZGF0ZTtcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUFRfREVGQVVMVF9BQ1RJT04gPSAnZGVsZXRlJztcblxuY2xhc3MgQ1JVRERlbGV0ZSBleHRlbmRzIG5vdENvbnRyb2xsZXJ7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKXtcblx0XHRzdXBlcihwYXJlbnQuYXBwKTtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0bm90Q29tbW9uLmxvZygnQ1JVRCBEZWxldGUnKTtcblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGVsZXRlLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKCgpPT57XG5cdFx0XHRcdGlmIChjb25maXJtKCfQo9C00LDQu9C40YLRjCDQt9Cw0L/QuNGB0Yw/JykpIHtcblx0XHRcdFx0XHR0aGlzLmRlbGV0ZSgpO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHR0aGlzLnBhcmVudC5iYWNrVG9MaXN0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXG5cdGRlbGV0ZSgpIHtcblx0XHRsZXQgYWN0aW9uID0nJCcrKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRlbGV0ZS5hY3Rpb24nKXx8T1BUX0RFRkFVTFRfQUNUSU9OKTtcblx0XHR0aGlzLm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXSh7J19pZCc6IHRoaXMuZ2V0T3B0aW9ucygncGFyYW1zLjAnKX0pW2FjdGlvbl0oKVxuXHRcdFx0LnRoZW4odGhpcy5wYXJlbnQuYmFja1RvTGlzdC5iaW5kKHRoaXMucGFyZW50KSlcblx0XHRcdC5jYXRjaChub3RDb21tb24ucmVwb3J0KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVUREZWxldGU7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuLi90ZW1wbGF0ZS9ub3RDb21wb25lbnQnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9ERVRBSUxTX1BSRUZJWCA9ICdkZXRhaWxzXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfREVUQUlMU19USVRMRSA9ICdEZXRhaWxzIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge30sXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUID0gWydvcHRpb25zJywgJ21hbmlmZXN0JywgJ2FwcCddO1xuXG5jbGFzcyBub3REZXRhaWxzIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdwcmVmaXgnLCBPUFRfREVGQVVMVF9ERVRBSUxTX1BSRUZJWCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50cycsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLnNldERhdGEobmV3IG5vdFJlY29yZCh7fSwgdGhpcy5nZXREYXRhKCkpKTtcblx0XHR9XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1hbmlmZXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YSgpIHtcblx0XHRsZXQgbWFuaWZlc3QgPSB0aGlzLmdldE1hbmlmZXN0KCk7XG5cdFx0aWYgKG1hbmlmZXN0ICYmIG1hbmlmZXN0LmFjdGlvbnMpIHtcblx0XHRcdHJldHVybiBtYW5pZmVzdC5hY3Rpb25zLmhhc093blByb3BlcnR5KHRoaXMuZ2V0T3B0aW9ucygnYWN0aW9uJykpID8gbWFuaWZlc3QuYWN0aW9uc1t0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpXSA6IG51bGw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpc3QoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKSxcblx0XHRcdGxpc3QgPSBbXSxcblx0XHRcdHJvbGUgPSB0aGlzLmdldE9wdGlvbnMoJ3JvbGUnLCBPUFRfREVGQVVMVF9ST0xFX05BTUUpO1xuXHRcdGlmIChhY3Rpb25EYXRhKSB7XG5cdFx0XHRpZiAoYWN0aW9uRGF0YS5maWVsZHMpIHtcblx0XHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzLmhhc093blByb3BlcnR5KHJvbGUpKSB7XG5cdFx0XHRcdFx0bGlzdCA9IGFjdGlvbkRhdGEuZmllbGRzW3JvbGVdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHR9XG5cblx0Z2V0UGFydFRlbXBsYXRlTmFtZShmb3JtUGFydCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfREVUQUlMU19USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0RmllbGRzTGlzdCgpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0bGV0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0RmllbGRzTGlzdCgpW3RdO1xuXHRcdFx0XHR0aGlzLmFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2xlYXJGaWVsZHNDb21wb25lbnRzKCkge1xuXHRcdGxldCBjb21wcyA9IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpO1xuXHRcdHdoaWxlIChjb21wcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb21wc1swXS5jb21wb25lbnQuZGVzdHJveSgpO1xuXHRcdFx0Y29tcHMuc3BsaWNlKDAsIDEpO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkc0xpYnMoKXtcblx0XHRsZXQgcmVzdWx0ID0ge1xuXHRcdFx0b3B0aW9uczoge30sXG5cdFx0XHRtYW5pZmVzdDoge30sXG5cdFx0XHRhcHA6IHt9LFxuXHRcdH07XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJykpIHtcblx0XHRcdHJlc3VsdC5vcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKG5vdENvbW1vbi5nZXRBcHAoKSAmJiBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJykpe1xuXHRcdFx0cmVzdWx0LmFwcCA9IG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkICYmIHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkpe1xuXHRcdFx0cmVzdWx0Lm1hbmlmZXN0ID0gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKS5maWVsZHM7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRnZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSkge1xuXHRcdGxldCBkZWYgPSBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OLFxuXHRcdFx0ZmllbGRzTGlicyA9IHRoaXMuZ2V0RmllbGRzTGlicygpO1xuXHRcdGZvcihsZXQgdCBvZiBPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCl7XG5cdFx0XHRpZiAoZmllbGRzTGlicy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBmaWVsZHNMaWJzW3RdLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkpe1xuXHRcdFx0XHRyZXR1cm4gZmllbGRzTGlic1t0XVtmaWVsZE5hbWVdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGVmO1xuXHR9XG5cblx0YWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKSB7XG5cdFx0bGV0IGZpZWxkVHlwZSA9IHRoaXMuZ2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpLFxuXHRcdFx0cmVjID0gbnVsbDtcblx0XHRpZihmaWVsZFR5cGUuY29tcG9uZW50KXtcblx0XHRcdHJlYyA9IHRoaXMuY2FzdEN1c3RvbShmaWVsZE5hbWUsIGZpZWxkVHlwZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRyZWMgPSB0aGlzLmNhc3RDb21tb24oZmllbGROYW1lLCBmaWVsZFR5cGUpO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5wdXNoKHJlYyk7XG5cdH1cblxuXHRjYXN0Q3VzdG9tKGZpZWxkTmFtZSwgZmllbGRUeXBlKXtcblx0XHRsZXQgQ3VzdG9tQ29tcG9uZW50ID0gbm90RnJhbWV3b3JrLm5vdENvbW1vbi5nZXQoJ2NvbXBvbmVudHMnKVtmaWVsZFR5cGUuY29tcG9uZW50XTtcblx0XHRsZXQgcmVjID0ge1xuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0bmFtZTogZmllbGROYW1lLFxuXHRcdFx0XHR0aXRsZTogZmllbGRUeXBlLmxhYmVsIHx8IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0dHlwZTogZmllbGRUeXBlLnR5cGUsXG5cdFx0XHRcdGxhYmVsOiBmaWVsZFR5cGUubGFiZWwsXG5cdFx0XHRcdGFycmF5OiBmaWVsZFR5cGUuYXJyYXksXG5cdFx0XHRcdGRlZmF1bHQ6IGZpZWxkVHlwZS5kZWZhdWx0LFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMobm90UGF0aC5qb2luKCdoZWxwZXJzJywnbGlicycsZmllbGROYW1lKSlcblx0XHRcdH1cblx0XHR9O1xuXHRcdGxldCBoZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRpc0NoZWNrZWQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0cmV0dXJuIHBhcmFtcy5pdGVtLnZhbHVlID09PSB0aGlzLmdldERhdGEoZmllbGROYW1lKTtcblx0XHRcdH0sXG5cdFx0XHRmaWVsZDogcmVjLmZpZWxkLFxuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKClcblx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cblx0XHRyZWMuY29tcG9uZW50ID0gbmV3IEN1c3RvbUNvbXBvbmVudCh7XG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiByZWM7XG5cdH1cblxuXHRjYXN0Q29tbW9uKGZpZWxkTmFtZSwgZmllbGRUeXBlKXtcblx0XHRsZXQgcmVjID0ge1xuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0bmFtZTogZmllbGROYW1lLFxuXHRcdFx0XHR0aXRsZTogZmllbGRUeXBlLmxhYmVsIHx8IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0dHlwZTogZmllbGRUeXBlLnR5cGUsXG5cdFx0XHRcdGxhYmVsOiBmaWVsZFR5cGUubGFiZWwsXG5cdFx0XHRcdGFycmF5OiBmaWVsZFR5cGUuYXJyYXksXG5cdFx0XHRcdGRlZmF1bHQ6IGZpZWxkVHlwZS5kZWZhdWx0LFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogZmllbGRUeXBlLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMobm90UGF0aC5qb2luKCdoZWxwZXJzJywnbGlicycsZmllbGROYW1lKSlcblx0XHRcdH1cblx0XHR9O1xuXHRcdGxldCBoZWxwZXJzID0gbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRpc0NoZWNrZWQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0cmV0dXJuIHBhcmFtcy5pdGVtLnZhbHVlID09PSB0aGlzLmdldERhdGEoZmllbGROYW1lKTtcblx0XHRcdH0sXG5cdFx0XHRmaWVsZDogcmVjLmZpZWxkLFxuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKClcblx0XHR9LCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRuYW1lOiB0aGlzLmdldFBhcnRUZW1wbGF0ZU5hbWUoZmllbGRUeXBlLnR5cGUpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRUYXJnZXRFbGVtZW50KGZpZWxkVHlwZS50YXJnZXQpLFxuXHRcdFx0XHRyZW5kZXJBbmQ6ICdwbGFjZUxhc3QnXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlYztcblx0fVxuXG5cdGdldFRhcmdldEVsZW1lbnQodGFyZ2V0ID0gJ2JvZHknKXtcblx0XHRpZiAoIXRhcmdldCl7dGFyZ2V0ID0gJ2JvZHknO31cblx0XHRsZXQgcmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHRpZiAoIXJlcyAmJiB0YXJnZXQhPT0nYm9keScpe1xuXHRcdFx0dGFyZ2V0ID0gJ2JvZHknO1xuXHRcdFx0cmVzID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ1tyb2xlPVwiJyArIHRhcmdldCArICdcIl0nKTtcblx0XHR9XG5cdFx0aWYoIXJlcyAmJiB0YXJnZXQ9PSdib2R5Jyl7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdERhdGEgbWFuYWdlbWVudFxuXHQqL1xuXG5cdHVwZGF0ZUZpZWxkKGZpZWxkTmFtZSl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5maWVsZC5uYW1lID09PSBmaWVsZE5hbWUpe1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHR9XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBub3REZXRhaWxzO1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90RGV0YWlscyBmcm9tICcuLi9jb21wb25lbnRzL25vdERldGFpbHMuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTiA9ICdnZXQnLFxuXHRPUFRfREVGQVVMVF9WSUVXID0gJ2RldGFpbHMnO1xuXG5jbGFzcyBDUlVERGV0YWlscyBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIERldGFpbHMnKTtcblx0XHR0aGlzLnNldFZpZXdzKHtcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5uYW1lJykgfHwgT1BUX0RFRkFVTFRfVklFVyxcblx0XHRcdFx0Y29tbW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmNvbW1vbicpIHx8IHRydWUsXG5cdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmNvbnRhaW5lclNlbGVjdG9yJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSxcblx0XHRcdFx0aGVscGVyczoge31cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMucHJlbG9hZExpYih0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMubG9hZEl0ZW0uYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMuc2V0RGF0YS5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJXcmFwcGVyLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlckRldGFpbHMuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bG9hZEl0ZW0oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKHtcblx0XHRcdCdfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJylcblx0XHR9KVsnJCcgKyAodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTildKCk7XG5cdH1cblxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0bGV0IGl0ZW0gPSB0aGlzLmdldERhdGEoKTtcblx0XHR2YXIgaGVscGVycyA9IHtcblx0XHRcdElEOiBpdGVtID8gaXRlbVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkgKyAnSUQnXSA6ICcnLFxuXHRcdFx0ZmllbGQ6IHtcblx0XHRcdFx0YXJyYXk6IGZhbHNlXG5cdFx0XHR9LFxuXHRcdFx0dXBkYXRlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKFt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCksIHBhcmFtcy5pdGVtLl9pZCwgJ3VwZGF0ZSddLmpvaW4oJy8nKSk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVsZXRlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKFt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCksIHBhcmFtcy5pdGVtLl9pZCwgJ2RlbGV0ZSddLmpvaW4oJy8nKSk7XG5cdFx0XHR9LFxuXHRcdFx0bGlua0JhY2tUb0xpc3Q6IHRoaXMucGFyZW50LmxpbmtCYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpLFxuXHRcdFx0dGl0bGU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ25hbWVzLnNpbmdsZScpXG5cdFx0fTtcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXIoJ2RlZmF1bHQnLCBpdGVtLCBoZWxwZXJzKTtcblx0fVxuXG5cdHJlbmRlckRldGFpbHMoKSB7XG5cdFx0bGV0IGl0ZW0gPSB0aGlzLmdldERhdGEoKTtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0bmV3IG5vdERldGFpbHMoe1xuXHRcdFx0XHRcdGRhdGE6IGl0ZW0sXG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMudGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRcdHRhcmdldEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMudGFyZ2V0UXVlcnknKXx8dGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG5cdFx0XHRcdFx0XHRhY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMuYWN0aW9uJykgfHwgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04sXG5cdFx0XHRcdFx0XHRwcmVmaXg6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMucHJlZml4Jyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuXHRcdFx0XHRcdFx0cm9sZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5yb2xlJyl8fHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3JvbGUnKSxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0XHRcdFx0XHRsaW5rQmFja1RvTGlzdDogdGhpcy5wYXJlbnQubGlua0JhY2tUb0xpc3QoKSxcblx0XHRcdFx0XHRcdFx0bGliczogdGhpcy5nZXRPcHRpb25zKCdsaWInKSxcblx0XHRcdFx0XHRcdFx0SUQ6IGl0ZW1bdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpICsgJ0lEJ10sXG5cdFx0XHRcdFx0XHRcdF9fdmVyc2lvbjogaXRlbS5fX3ZlcnNpb24sXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmhlbHBlcnMnKSB8fCB7fSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHJlc29sdmVdXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmVqZWN0KGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRERldGFpbHM7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBDUlVEQ3JlYXRlIGZyb20gJy4vQ3JlYXRlJztcbmltcG9ydCBDUlVETGlzdCBmcm9tICcuL0xpc3QnO1xuaW1wb3J0IENSVURVcGRhdGUgZnJvbSAnLi9VcGRhdGUnO1xuaW1wb3J0IENSVUREZWxldGUgZnJvbSAnLi9EZWxldGUnO1xuaW1wb3J0IENSVUREZXRhaWxzIGZyb20gJy4vRGV0YWlscyc7XG5cblxuY2xhc3MgQ1JVRENvbnRyb2xsZXIgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IoYXBwLCBwYXJhbXMpIHtcblx0XHRub3RDb21tb24ubG9nKCdydW5uaW5nIENSVURDb250cm9sbGVyJyk7XG5cdFx0c3VwZXIoYXBwKTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ25hbWVzJywge1xuXHRcdFx0cGx1cmFsOiAncGx1cmFsJyxcblx0XHRcdHNpbmdsZTogJ3NpbmdsZScsXG5cdFx0fSk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InLCB0aGlzLmFwcC5nZXRPcHRpb25zKCdjcnVkLmNvbnRhaW5lclNlbGVjdG9yJykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cm91dGUocGFyYW1zID0gW10pe1xuXHRcdGlmKHBhcmFtcy5sZW5ndGg9PTEpe1xuXHRcdFx0aWYocGFyYW1zWzBdID09PSAnY3JlYXRlJyl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1bkNyZWF0ZShwYXJhbXMpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1bkRldGFpbHMocGFyYW1zKTtcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihwYXJhbXMubGVuZ3RoID09IDIpe1xuXHRcdFx0aWYgKHBhcmFtc1sxXSA9PT0gJ2RlbGV0ZScpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5EZWxldGUocGFyYW1zKTtcblx0XHRcdH1lbHNlIGlmKHBhcmFtc1sxXSA9PT0gJ3VwZGF0ZScpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ydW5VcGRhdGUocGFyYW1zKTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0bGV0IHJvdXRlUnVubmVyTmFtZSA9ICdydW4nICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihwYXJhbXNbMF0pO1xuXHRcdFx0XHRpZih0aGlzW3JvdXRlUnVubmVyTmFtZV0gJiYgdHlwZW9mIHRoaXNbcm91dGVSdW5uZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJyl7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXNbcm91dGVSdW5uZXJOYW1lXShwYXJhbXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnJ1bkxpc3QocGFyYW1zKTtcblx0fVxuXG5cdHJ1bkNyZWF0ZShwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVURDcmVhdGUodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bkxpc3QocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVETGlzdCh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuRGV0YWlscyhwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVUREZXRhaWxzKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5EZWxldGUocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVERGVsZXRlKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5VcGRhdGUocGFyYW1zID0gW10pe1xuXHRcdHRoaXMudmlldyA9IG5ldyBDUlVEVXBkYXRlKHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRvbkFmdGVyUmVuZGVyKCl7XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbmRlcicpO1xuXHR9XG5cblx0YmFja1RvTGlzdCgpIHtcblx0XHR0aGlzLmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLmdldE1vZHVsZU5hbWUoKSk7XG5cdH1cblxuXHRsaW5rQmFja1RvTGlzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2R1bGVOYW1lKCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1JVRENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoLmpzJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi4vbm90Um91dGVyJztcblxudmFyIG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiA9IHtcblx0Y29udGVudDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmluZGV4T2YoJ2NhcGl0YWxpemUnKSA+IC0xKSB7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQudG9VcHBlckNhc2UoKTtcblx0XHR9XG5cdFx0c2NvcGUuZWxlbWVudC50ZXh0Q29udGVudCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdDtcblx0fSxcblx0YmluZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRpZiAoc2NvcGUuZWxlbWVudC5iaW5kcyl7XG5cdFx0XHRpZihzY29wZS5lbGVtZW50LmJpbmRzLmhhc093blByb3BlcnR5KHNjb3BlLnBhcmFtc1swXSkpe1xuXHRcdFx0XHRpZihzY29wZS5lbGVtZW50LmJpbmRzW3Njb3BlLnBhcmFtc1swXV0uaW5kZXhPZihzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uKSA+IC0xKXtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHNjb3BlLnBhcmFtc1swXSwgKGUpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0cmV0dXJuIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCh7XG5cdFx0XHRcdFx0c2NvcGUsXG5cdFx0XHRcdFx0aXRlbSxcblx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdGVcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRpZighc2NvcGUuZWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnYmluZHMnKSl7XG5cdFx0XHRzY29wZS5lbGVtZW50LmJpbmRzID0ge307XG5cdFx0fVxuXHRcdGlmKCFzY29wZS5lbGVtZW50LmJpbmRzLmhhc093blByb3BlcnR5KHNjb3BlLnBhcmFtc1swXSkpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5iaW5kc1tzY29wZS5wYXJhbXNbMF1dID0gW107XG5cdFx0fVxuXHRcdGlmKHNjb3BlLmVsZW1lbnQuYmluZHNbc2NvcGUucGFyYW1zWzBdXS5pbmRleE9mKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24pID09PSAtMSl7XG5cdFx0XHRzY29wZS5lbGVtZW50LmJpbmRzW3Njb3BlLnBhcmFtc1swXV0ucHVzaChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uKTtcblx0XHR9XG5cdH0sXG5cdHZhbHVlOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBsaXZlRXZlbnRzID0gWydjaGFuZ2UnLCAna2V5dXAnXSxcblx0XHRcdG9uRXZlbnQgPSAoKSA9PiB7XG5cdFx0XHRcdGlmIChbJ2NoZWNrYm94JywgJ3JhZGlvJywgJ3NlbGVjdC1tdWx0aXBsZSddLmluZGV4T2Yoc2NvcGUuZWxlbWVudC50eXBlKSA+IC0xKSB7XG5cdFx0XHRcdFx0c3dpdGNoIChzY29wZS5lbGVtZW50LnR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdyYWRpbyc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZD9zY29wZS5lbGVtZW50LnZhbHVlOm51bGwpO1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChoZWxwZXJzLmZpZWxkLm5hbWUsIGhlbHBlcnMuZGF0YSwgaGVscGVycywgc2NvcGUuZWxlbWVudC5jaGVja2VkID8gc2NvcGUuZWxlbWVudC52YWx1ZSA6IG51bGwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnc2VsZWN0LW11bHRpcGxlJzpcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bGV0IHNlbGVjdGVkID0gW10uc2xpY2UuY2FsbChzY29wZS5lbGVtZW50LnNlbGVjdGVkT3B0aW9ucykubWFwKGEgPT4gYS52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coJ3NlbGVjdC1tdWx0aXBsZScsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2VsZWN0ZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2cobm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyksICcgLT4gJyxzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgndmFsdWUnLCBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0aWYgKHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgIT09IHRydWUpIHtcblx0XHRcdGlmKHNjb3BlLmVsZW1lbnQudHlwZSA9PT0gJ3RleHRhcmVhJyl7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGxldCB0IG9mIGxpdmVFdmVudHMpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHQsIG9uRXZlbnQpO1xuXHRcdFx0fVxuXHRcdFx0c2NvcGUuZWxlbWVudC5wcm9jZXNzZWRWYWx1ZSA9IHRydWU7XG5cdFx0fVxuXHR9LFxuXHRhdHRyOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCByZXMgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSB8fCBub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSAoKHR5cGVvZiByZXMgPT09ICdmdW5jdGlvbicpID8gcmVzKHtcblx0XHRcdHNjb3BlLFxuXHRcdFx0aXRlbSxcblx0XHRcdGhlbHBlcnNcblx0XHR9KSA6IHJlcyk7XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoc2NvcGUucGFyYW1zWzBdLCBzY29wZS5hdHRyaWJ1dGVSZXN1bHQpO1xuXHR9LFxuXHRuYW1lOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKCAvKnNjb3BlLCBpdGVtLCBoZWxwZXJzKi8gKSB7XG5cblx0fSxcblx0Y2hlY2tlZDogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzdWx0ID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzdWx0ID09PSAnZnVuY3Rpb24nKSA/IHJlc3VsdCh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXN1bHQpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA/IHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgdHJ1ZSkgOiBzY29wZS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuXHR9LFxuXHRjbGFzczogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKSA/IHJlcyh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoIDwgMyB8fCBpc05hTihzY29wZS5hdHRyaWJ1dGVSZXN1bHQpKSB7XG5cdFx0XHRpZiAoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCB1c2VkID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNjb3BlLnBhcmFtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoaSA9PT0gc2NvcGUuYXR0cmlidXRlUmVzdWx0KSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdFx0dXNlZCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICghdXNlZCkge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdG9wdGlvbnM6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0b3B0aW9uID0gbnVsbCxcblx0XHRcdHZhbHVlRmllbGROYW1lID0gJ3ZhbHVlJyxcblx0XHRcdGxhYmVsRmllbGROYW1lID0gJ25hbWUnLFxuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZmllbGQnKSAmJiBoZWxwZXJzLmZpZWxkLmhhc093blByb3BlcnR5KCduYW1lJykgPyBoZWxwZXJzLmZpZWxkLm5hbWUgOiAndmFsdWUnO1xuXHRcdHNjb3BlLmVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPT09IDIpIHtcblx0XHRcdGxhYmVsRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzBdO1xuXHRcdFx0dmFsdWVGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMV07XG5cdFx0fVxuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdFx0aXRlbVZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzJdO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIGhlbHBlcnMgIT09IG51bGwgJiYgaGVscGVycy5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpICYmIGhlbHBlcnMuZGVmYXVsdCkge1xuXHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCd2YWx1ZScsICcnKTtcblx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGhlbHBlcnMucGxhY2Vob2xkZXI7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgaXRlbSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXRlbSAhPT0gbnVsbCkge1xuXHRcdFx0dmFyIGxpYiA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGxpYi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcblx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKTtcblx0XHRcdFx0b3B0aW9uLnRleHRDb250ZW50ID0gbGliW2ldW2xhYmVsRmllbGROYW1lXTtcblx0XHRcdFx0aWYgKGhlbHBlcnMuZmllbGQuYXJyYXkpIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdICYmIEFycmF5LmlzQXJyYXkoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdKSl7XG5cdFx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdLmluZGV4T2YobGliW2ldW3ZhbHVlRmllbGROYW1lXSkgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoaXRlbVtpdGVtVmFsdWVGaWVsZE5hbWVdID09PSBsaWJbaV1bdmFsdWVGaWVsZE5hbWVdKSB7XG5cdFx0XHRcdFx0XHRvcHRpb24uc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzY29wZS5lbGVtZW50LmFwcGVuZENoaWxkKG9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRocmVmOmZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKXtcblx0XHRpZiAoIXNjb3BlLmVsZW1lbnQubm90Um91dGVySW5pdGlhbGl6ZWQpe1xuXHRcdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnaHJlZicsIG5vdFJvdXRlci5nZXRGdWxsUm91dGUoc2NvcGUuYXR0cmlidXRlUmVzdWx0KSk7XG5cdFx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0bm90Um91dGVyLm5hdmlnYXRlKG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0XHRzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxufTtcbmV4cG9ydCBkZWZhdWx0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYjtcbiIsIi8qXG5cdENvbW1vbiBmdW5jdGlvbnNcbiovXG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbi8qXG5cdGZyYW1ld29yayB3aWRlIHBhcnNlciBmb3IgZGF0YSBhY2Nlc3NcbiovXG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuL25vdFJvdXRlcic7XG5cbmltcG9ydCBub3RBUEkgZnJvbSAnLi9hcGknO1xuLypcblx0YmFzaWMgZXZlbnQgaGFuZGxlcnMgYW5kIGNvcmUgZGF0YSBtb2RpZmllcnNcbiovXG5pbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuLypcblx0c21hcnRlciBpbWFnZSBjb250cm9sXG4qL1xuaW1wb3J0IG5vdEltYWdlIGZyb20gJy4vdGVtcGxhdGUvbm90SW1hZ2UnO1xuLypcblx0YXBwbGljYXRpb24gbWFpbiBpbmZyYXN0cnVjdHVyZSBzZXR0ZXJcbiovXG5pbXBvcnQgbm90QXBwIGZyb20gJy4vbm90QXBwJztcbi8qXG5cdHVzZXIgY29udHJvbGxlcnNcbiovXG5pbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuL25vdENvbnRyb2xsZXInO1xuXG5pbXBvcnQge0NSVURDb250cm9sbGVyLENSVURDcmVhdGUsQ1JVRERlbGV0ZSxDUlVERGV0YWlscyxDUlVETGlzdCxDUlVEVXBkYXRlfSBmcm9tICcuL0NSVUQnO1xuXG4vKlxuXHR0ZW1wbGF0aW5nIGFuZCBjb21tb24gc3RydWN0dXJlc1xuKi9cblxuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vdGVtcGxhdGUvbm90UmVuZGVyZXInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiBmcm9tICcuL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYic7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JzsgLy8gc21hcnRlciB3aXRoIGJpbmRpbmdzIGZvciBldmVudHMsIGFjdHVhbHkgcHJveHlcblxuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi9jb21wb25lbnRzL25vdEZvcm0nO1xuaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4vY29tcG9uZW50cy9ub3RUYWJsZSc7XG5pbXBvcnQgbm90RGV0YWlscyBmcm9tICcuL2NvbXBvbmVudHMvbm90RGV0YWlscyc7XG5cbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnOyAvL1x0aG93IHRvIGludGVyYWN0IHdpdGggZGF0YSBvbiBzZXJ2ZXJcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnOyAvL1x0d3JhcHBlciBmb3IgZGF0YSB3aXRoIHNlcnZlcjwtPnZpZXcgbGl2ZSBpbnRlcmFjdGlvbnNcblxubm90VGVtcGxhdGVQcm9jZXNzb3JzLmFkZChub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIpO1xuXG5leHBvcnQge1xuXHRub3RDb21tb24sXG5cdG5vdFBhdGgsXG5cdG5vdEJhc2UsXG5cdG5vdEltYWdlLFxuXHRub3RBcHAsXG5cdG5vdEFQSSxcblx0bm90Q29udHJvbGxlcixcblx0Q1JVRENvbnRyb2xsZXIsXG5cdENSVURDcmVhdGUsXG5cdENSVUREZWxldGUsXG5cdENSVUREZXRhaWxzLFxuXHRDUlVETGlzdCxcblx0Q1JVRFVwZGF0ZSxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzLFxuXHRub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIsXG5cdG5vdFRlbXBsYXRlQ2FjaGUsXG5cdG5vdFJlbmRlcmVyLFxuXHRub3RDb21wb25lbnQsXG5cdG5vdEZvcm0sXG5cdG5vdFJvdXRlcixcblx0bm90VGFibGUsXG5cdG5vdERldGFpbHMsXG5cdG5vdFJlY29yZCxcblx0bm90UmVjb3JkSW50ZXJmYWNlXG59O1xuIl0sIm5hbWVzIjpbIkNvbW1vbk5ldHdvcmsiLCJ1cmkiLCJnZXQiLCJkYXRhQXJyYXkiLCJmaWVsZHMiLCJpIiwiZiIsImhhc093blByb3BlcnR5IiwiaW1hZ2UiLCJJbWFnZSIsInNldEF0dHJpYnV0ZSIsInNyYyIsImluZGV4T2YiLCJhZGRQcm90b2NvbCIsInVwbG9hZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvblByb2dyZXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3BvbnNlVHlwZSIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsIndpdGhDcmVkZW50aWFscyIsIm9wZW4iLCJ1cmwiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZ2V0U2Vzc2lvbklEIiwiZmlsZSIsInR5cGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJuYW1lIiwic2VuZCIsIm1ldGhvZCIsImRhdGEiLCJvbmxvYWQiLCJ0Iiwib25lcnJvciIsIm9udGltZW91dCIsInBhcnNlSW50IiwicmVzcG9uc2VUZXh0IiwiZSIsImdldENvb2tpZSIsInZhbHVlIiwiZG9jdW1lbnQiLCJjb29raWUiLCJwYXJ0cyIsInNwbGl0IiwibGVuZ3RoIiwicG9wIiwic2hpZnQiLCJMT0ciLCJDb21tb25Mb2dzIiwibm90RnJhbWV3b3JrIiwibm90Q29tbW9uIiwiZXJyb3IiLCJhcmd1bWVudHMiLCJsb2ciLCJ0cmFjZSIsIk1BTkFHRVIiLCJTeW1ib2wiLCJDb21tb25TaG9ydHMiLCJnZXRNYW5hZ2VyIiwiZ2V0QVBJIiwidiIsIkNvbW1vbk9iamVjdHMiLCJkZWZhdWx0cyIsIm9wdGlvbnMiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0Iiwic291cmNlcyIsImZvckVhY2giLCJkZXNjcmlwdG9ycyIsImtleXMiLCJzb3VyY2UiLCJyZWR1Y2UiLCJrZXkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJkZXNjcmlwdG9yIiwic3ltIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJiaWciLCJzbWFsbCIsIm9iaiIsImZpbHRlciIsImNvbnRhaW5zT2JqIiwiaWNvbnMiLCJiYXRjaCIsImdldERhdGEiLCJwdXNoIiwiYSIsImIiLCJwIiwiZXF1YWwiLCJ0b1N0cmluZyIsImRlZmF1bHRWYWx1ZSIsIm9iajEiLCJvYmoyIiwialF1ZXJ5IiwiZXh0ZW5kIiwidmFsIiwicmVnaXN0cnkiLCJhcnJheSIsIm9sZF9pbmRleCIsIm5ld19pbmRleCIsImsiLCJ1bmRlZmluZWQiLCJzcGxpY2UiLCJDb21tb25TdHJpbmdzIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIkNvbW1vbkFwcCIsInN0YXJ0ZXIiLCJhc3NpZ24iLCJleHRlbmRXaXRoIiwiU1VCX1BBVEhfU1RBUlQiLCJTVUJfUEFUSF9FTkQiLCJQQVRIX1NQTElUIiwiUEFUSF9TVEFSVF9PQkpFQ1QiLCJQQVRIX1NUQVJUX0hFTFBFUlMiLCJGVU5DVElPTl9NQVJLRVIiLCJNQVhfREVFUCIsIm5vdFBhdGgiLCJwYXRoIiwic3ViUGF0aCIsImZpbmQiLCJzdWIiLCJwYXJzZWQiLCJzdWJmIiwicmVwbGFjZSIsIml0ZW0iLCJoZWxwZXJzIiwic3ViUGF0aFBhcnNlZCIsImZpbmROZXh0U3ViUGF0aCIsImdldFZhbHVlQnlQYXRoIiwicmVwbGFjZVN1YlBhdGgiLCJwYXJzZVN1YnMiLCJhdHRyVmFsdWUiLCJzZXRWYWx1ZUJ5UGF0aCIsImlzUmVjb3JkIiwibm9ybWlsaXplUGF0aCIsInRyaWdnZXIiLCJzZXQiLCJzdGVwIiwiaGVscGVyIiwiclN0ZXAiLCJBcnJheSIsImlzQXJyYXkiLCJwYXJzZVBhdGhTdGVwIiwib2JqZWN0IiwiYXR0clBhdGgiLCJhdHRyTmFtZSIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfTUVUSE9EX0lOSVQiLCJNRVRBX0VWRU5UUyIsIk1FVEFfREFUQSIsIk1FVEFfV09SS0lORyIsIk1FVEFfT1BUSU9OUyIsIm5vdEJhc2UiLCJpbnB1dCIsImV2ZW50cyIsIm9uIiwic2V0RGF0YSIsInNldFdvcmtpbmciLCJ3b3JraW5nIiwic2V0T3B0aW9ucyIsIndoYXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsImZyb20iLCJldmVudE5hbWUiLCJldmVudCIsIm9mZiIsImNhbGxiYWNrcyIsImNhbGxiYWNrIiwidGFyZ2V0SWQiLCJPUFRfTU9ERV9ISVNUT1JZIiwiT1BUX01PREVfSEFTSCIsIk9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMIiwibm90Um91dGVyIiwicm9vdCIsImNsZWFyU2xhc2hlcyIsInJlIiwiaGFuZGxlciIsInJ1bGUiLCJhZGQiLCJwYXJhbSIsInIiLCJmcmFnbWVudCIsImxvY2F0aW9uIiwiZGVjb2RlVVJJIiwicGF0aG5hbWUiLCJzZWFyY2giLCJ3aW5kb3ciLCJtYXRjaCIsImhyZWYiLCJjdXJyZW50IiwiZ2V0RnJhZ21lbnQiLCJpbml0IiwiaXNJbml0aWFsaXplZCIsImNoZWNrIiwic2V0SW5pdGlhbGl6ZWQiLCJsb29wSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNoZWNrTG9jYXRpb24iLCJiaW5kIiwiaHJlZkNsaWNrIiwiZnVsbFJFIiwiYXBwbHkiLCJob3N0IiwicHVzaFN0YXRlIiwiZ2V0RnVsbFJvdXRlIiwiYm9keSIsImdldEFsbExpbmtzIiwiaW5pdFJlcm91dGluZyIsImdldEF0dHJpYnV0ZSIsImxpbmsiLCJub3RSb3V0ZXJJbml0aWFsaXplZCIsImZ1bGxMaW5rIiwicHJldmVudERlZmF1bHQiLCJuYXZpZ2F0ZSIsIm5vdEFQSU9wdGlvbnMiLCJub3RBUElRdWVlIiwicmVxdWVzdHNQZXJTZWNvbmQiLCJxdWVlIiwiaW50IiwiaW5Qcm9ncmVzcyIsInRvQ2FsbCIsImNsZWFySW50ZXJ2YWwiLCJydW4iLCJub3RBUEkiLCJpZCIsImdvb2QiLCJiYWQiLCJtYWtlUmVxdWVzdCIsInJlc3BvbnNlT0siLCJyZXNwb25zZUZhaWxlZCIsInJlcXVlc3RKU09OIiwidGhlbiIsIm5leHQiLCJjYXRjaCIsImdldElkIiwibW9kZWxOYW1lIiwiZ2V0TW9kZWxOYW1lIiwibWFrZVVybCIsImdldEpTT04iLCJub3RJbWFnZSIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCIsIlRFTVBMQVRFX1RBRyIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYIiwiQ09NUE9ORU5UX0lEX1BSRUZJWCIsIlBBUlRfSURfUFJFRklYIiwiREVGQVVMVF9QTEFDRVIiLCJERUZBVUxUX1BMQUNFUl9MT09QIiwiT1BUUyIsIk1FVEFfQ0FDSEUiLCJub3RUZW1wbGF0ZUNhY2hlIiwiaGlkZVRlbXBsYXRlcyIsInJlZ2lzdGVyIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1hcCIsImxvYWRPbmUiLCJvUmVxdWVzdCIsImRpdiIsImRhdGFzZXQiLCJub3RUZW1wbGF0ZU5hbWUiLCJub3RUZW1wbGF0ZVVSTCIsInNyY0VsZW1lbnQiLCJzZXRPbmUiLCJlbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJhZGRGcm9tVGV4dCIsImNsb25lTm9kZSIsImNvbnQiLCJ0ZXh0Iiwibm90VGVtcGxhdGVzRWxlbWVudHMiLCJlbElkIiwicGFyZW50Tm9kZSIsImxpYiIsImdldEhUTUwiLCJ0ZW1wbGF0ZUlubmVySFRNTCIsInRlbXBsYXRlQ29udEVsIiwid3JhcCIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZIiwiREVGQVVMVF9GSUxURVIiLCJERUZBVUxUX1BBR0VfTlVNQkVSIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJub3RJbnRlcmZhY2UiLCJtYW5pZmVzdCIsImxpbmUiLCJyZWNvcmQiLCJhY3Rpb25OYW1lIiwicmVjb3JkUkUiLCJmaWVsZE5hbWUiLCJpbmQiLCJsZW4iLCJpbmQyIiwic3RhcnRTbGljZSIsImVuZFNsaWNlIiwiZ2V0QXR0ciIsIm1vZGVsIiwiYWN0aW9uRGF0YSIsInBhcnNlTGluZSIsInBvc3RGaXgiLCJyZXN1bHRJZCIsInByZWZpeGVzIiwiaW5kZXgiLCJjb25jYXQiLCJwcmUiLCJnZXRBY3Rpb25zIiwiYWN0aW9ucyIsInNldEZpbHRlciIsImZpbHRlckRhdGEiLCJzb3J0ZXJEYXRhIiwicGFnZU51bWJlciIsInBhZ2VTaXplIiwic2V0UGFnZXIiLCJyZXF1ZXN0RGF0YSIsImRhdGFQcm92aWRlck5hbWUiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJnZXRBY3Rpb25EYXRhIiwicmVxdWVzdFBhcmFtcyIsImNvbGxlY3RSZXF1ZXN0RGF0YSIsInJlcXVlc3RQYXJhbXNFbmNvZGVkIiwiZW5jb2RlUmVxdWVzdCIsImdldElEIiwiZ2V0VVJMIiwicXVlZVJlcXVlc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiYWZ0ZXJTdWNjZXNzUmVxdWVzdCIsIm5vdFJlY29yZCIsIk1FVEFfSU5URVJGQUNFIiwiTUVUQV9QUk9YWSIsIk1FVEFfQ0hBTkdFIiwiTUVUQV9DSEFOR0VfTkVTVEVEIiwiTUVUQV9TQUwiLCJNRVRBX01BUF9UT19JTlRFUkZBQ0UiLCJERUZBVUxUX0FDVElPTl9QUkVGSVgiLCJNRVRBX1JFVFVSTl9UT19ST09UIiwiY3JlYXRlUHJvcGVydHlIYW5kbGVycyIsIm93bmVyIiwiY29udGV4dCIsInJlc1RhcmdldCIsIlJlZmxlY3QiLCJFcnJvciIsInZhbHVlVG9SZWZsZWN0Iiwibm90UHJvcGVydHkiLCJnZXRSb290IiwicGF0aFRvIiwiaXNQcm94eSIsImlzUHJvcGVydHkiLCJQcm94eSIsInByb3h5IiwiY3JlYXRlUmVjb3JkSGFuZGxlcnMiLCJjcmVhdGVDb2xsZWN0aW9uIiwibm90UmVjb3JkSW50ZXJmYWNlIiwiaW5pdFByb3BlcnRpZXMiLCJpbnRlcmZhY2VVcCIsImN1clBhdGgiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiaXRlbXMiLCJjb2xsZWN0aW9uIiwiZ2V0QWN0aW9uc0NvdW50IiwiYWN0aW9uVXAiLCJyZXF1ZXN0Iiwib2JqZWN0UGFydCIsInNldEF0dHIiLCJzZXRGaW5kQnkiLCJyZXNldEZpbHRlciIsImdldEZpbHRlciIsInNldFNvcnRlciIsImdldFNvcnRlciIsInNldFBhZ2VOdW1iZXIiLCJzZXRQYWdlU2l6ZSIsInJlc2V0UGFnZXIiLCJnZXRQYWdlciIsIk9QVF9DT05UUk9MTEVSX1BSRUZJWCIsIk9QVF9SRUNPUkRfUFJFRklYIiwibm90QXBwIiwicmVzb3VyY2VzIiwicHJlSW5pdFJvdXRlciIsImluaXRNYW5hZ2VyIiwiaW5pdEFQSSIsImluaXRUZW1wbGF0ZXMiLCJzZXRNYW5hZ2VyIiwiYXBpIiwic2V0QVBJIiwicHJvbSIsImFkZExpYkZyb21VUkwiLCJpbml0TWFuaWZlc3QiLCJyZXBvcnQiLCJzZXRJbnRlcmZhY2VNYW5pZmVzdCIsInNldFJvb3QiLCJyZVJvdXRlRXhpc3RlZCIsInJvdXRpZUlucHV0Iiwicm91dGVCbG9jayIsInBhdGhzIiwiY29udHJvbGxlciIsImJpbmRDb250cm9sbGVyIiwiYWRkTGlzdCIsImxpc3RlbiIsInVwZGF0ZSIsInVwZGF0ZUludGVyZmFjZXMiLCJpbml0Q29udHJvbGxlciIsImFsbFJlc291cmNlc1JlYWR5Iiwic3RhcnRBcHAiLCJpbml0Um91dGVyIiwiY29udHJvbGxlck5hbWUiLCJhcHAiLCJjdHJsIiwiY2xlYXJJbnRlcmZhY2VzIiwibWFuaWZlc3RzIiwicmVjb3JkTWFuaWZlc3QiLCJyZWNvcmREYXRhIiwib25SZXNvdXJjZVJlYWR5IiwiTUVUQV9QUk9DRVNTT1JTIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzIiwic2V0UHJvY2Vzc29yIiwiZ2V0UHJvY2Vzc29yIiwiTUVUQV9DT01QT05FTlRTIiwibm90UmVuZGVyZXIiLCJyZW5kZXIiLCJjb21wb25lbnQiLCJpbml0RGF0YSIsImluaXRPcHRpb25zIiwiaW5pdFdvcmtpbmciLCJ0ZW1wbGF0ZSIsImluaXRUZW1wbGF0ZSIsIm9uQ2hhbmdlIiwiTWF0aCIsInJhbmRvbSIsImdldEJyZWFkQ3J1bXBzIiwiY2xlYXJTdGFzaCIsInNldFdvcmtpbmdNYXBwaW5nIiwiZXhlY1Byb2Nlc3NvcnMiLCJzZWFyY2hGb3JTdWJUZW1wbGF0ZXMiLCJzdGFzaFJlbmRlcmVkIiwiaWZQYXJ0IiwiY29tcG9uZW50UGF0aCIsImNoYW5nZWRQYXRoIiwiaWZGdWxsU3ViUGF0aCIsImNyZWF0ZU1hcHBpbmciLCJmaW5kQWxsUHJvY2Vzc29ycyIsInByb2NzIiwiZWxzIiwiZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgiLCJnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50IiwicHJvY0RhdGEiLCJwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24iLCJwcm9jZXNzb3JFeHByZXNzaW9uIiwiYXR0cmlidXRlRXhwcmVzc2lvbiIsImlmQ29uZGl0aW9uIiwicGFyYW1zIiwicHJvY2Vzc29yTmFtZSIsIm1hcHBpbmciLCJwcm9jU2NvcGUiLCJhdHRyaWJ1dGVSZXN1bHQiLCJnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0IiwicHJvY05hbWUiLCJwcm9jIiwicmVtb3ZlQXR0cmlidXRlIiwiZGVzdHJveVN1YnMiLCJkZXN0cm95IiwiY2xlYXJTdWJUZW1wbGF0ZXMiLCJnZXRTdGFzaCIsInJlbW92ZUNoaWxkIiwibnRFbCIsIm50UmVuZGVyZWQiLCJzdWJzIiwibnQiLCJpZlN1YkVsZW1lbnRSZW5kZXJlZCIsInJlbmRlclN1YiIsImRldGFpbHMiLCJkYXRhUGF0aCIsIm5vdENvbXBvbmVudCIsImNoaWxkTm9kZXMiLCJhZGRUb1N0YXNoIiwic3Rhc2giLCJuZXdTdGFzaCIsImFuY2hvciIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwibm9kZSIsInBsYWNlIiwidGFyZ2V0RWwiLCJsIiwiY2hpbGRyZW4iLCJ0ZXh0Q29udGVudCIsInJlbmRlcmVkIiwicGxhY2VBZnRlciIsInBsYWNlQmVmb3JlIiwicGxhY2VGaXJzdCIsInBsYWNlTGFzdCIsIm5vdFBsYWNlcnMiLCJNRVRBX1BBUlRTIiwicmVzZXRQYXJ0cyIsInByZXBhcmVUZW1wbGF0ZUVsZW1lbnQiLCJpbml0TWFya0VsZW1lbnQiLCJtYXJrRWwiLCJwbGFjZXIiLCJnZXRQbGFjZXIiLCJ0YXJnZXRRdWVyeSIsIm1haW4iLCJ1bnNldFJlYWR5IiwiaHRtbCIsInNldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiYWRkRnJvbVVSTCIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiY2xlYXJQYXJ0cyIsImRlYWQiLCJvZmZBbGwiLCJmb3JFYWNoRGF0YSIsInJlbmRlclBhcnQiLCJwbGFjZVJlbmRlcmVkIiwicmVtb3ZlT2Jzb2xldGVQYXJ0cyIsImJlZm9yZSIsInBsYWNlUGFydCIsImFmdGVyIiwicGFydCIsImdldFBhcnRCeURhdGEiLCJub2RlcyIsImxhc3ROb2RlIiwibm9kZVR5cGUiLCJnZXRQYXJ0cyIsInJlbmRlcmVyIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSIsImFkZFBhcnQiLCJ1cGRhdGVQYXJ0IiwicGlwZSIsImZpbmRBY3R1YWxQYXJ0cyIsInJlbW92ZU5vdEFjdHVhbFBhcnRzIiwiYWN0dWFsUGFydHMiLCJpc0RhdGEiLCJPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IiLCJPUFRfREVGQVVMVF9WSUVXU19QT1NURklYIiwiT1BUX0RFRkFVTFRfVklFV19OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMIiwiT1BUX0RFRkFVTFRfUExVUkFMX05BTUUiLCJPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSIsIk9QVF9ERUZBVUxUX01PRFVMRV9OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0FORCIsIm5vdENvbnRyb2xsZXIiLCJpbml0UmVuZGVyIiwiaW50ZXJmYWNlcyIsImdldEludGVyZmFjZXMiLCJtYWtlIiwidmlld05hbWUiLCJ2aWV3IiwiZ2V0VmlldyIsInRlbXBsYXRlVVJMIiwicHJlZml4IiwiY29tbW9uIiwiZ2V0TW9kdWxlUHJlZml4IiwicG9zdGZpeCIsInRlbXBsYXRlTmFtZSIsInJlbmRlckFuZCIsInZpZXdzIiwiZ2V0TW9kdWxlTmFtZSIsIiRsaXN0QWxsIiwiZXJyIiwiZmllbGRGaWxlcyIsInNhdmVkRmlsZSIsImhhc2giLCJPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCIsIk9QVF9ERUZBVUxUX1JPTEVfTkFNRSIsIk9QVF9ERUZBVUxUX0ZPUk1fVElUTEUiLCJPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QiLCJub3RGb3JtIiwib25TdWJtaXQiLCJvblJlc2V0Iiwib25DYW5jZWwiLCJnZXRNYW5pZmVzdCIsInJvbGUiLCJyZW5kZXJXcmFwcGVyIiwiZm9ybVBhcnQiLCJnZXRXcmFwcGVyRGF0YSIsImdldFBhcnRUZW1wbGF0ZU5hbWUiLCJiaW5kRm9ybUV2ZW50cyIsInJlbmRlckNvbXBvbmVudHMiLCJ3cmFwcGVyIiwidGl0bGUiLCJnZXRGb3JtRmllbGRzTGlzdCIsImFkZEZpZWxkQ29tcG9uZW50IiwiY29tcHMiLCJnZXRBcHAiLCJkZWYiLCJmaWVsZHNMaWJzIiwiZ2V0RmllbGRzTGlicyIsImZpZWxkVHlwZSIsImdldEZpZWxkc0RlZmluaXRpb24iLCJyZWMiLCJsYWJlbCIsInBsYWNlaG9sZGVyIiwiZGVmYXVsdCIsImZpZWxkIiwiZ2V0Rm9ybVRhcmdldEVsZW1lbnQiLCJjb2xsZWN0RGF0YUZyb21Db21wb25lbnRzIiwiZm9ybSIsIk9QVF9ERUZBVUxUX1ZJRVciLCJPUFRfREVGQVVMVF9BQ1RJT04iLCJPUFRfREVGQVVMVF9JVEVNIiwiQ1JVRENyZWF0ZSIsInBhcmVudCIsInNldFZpZXdzIiwicHJlbG9hZExpYiIsInJlbmRlckZvcm0iLCJvbkFmdGVyUmVuZGVyIiwiaW5pdEl0ZW0iLCJjcmVhdGVEZWZhdWx0IiwibGlua0JhY2tUb0xpc3QiLCJmaWxlcyIsImRhdGFUcmFuc2ZlciIsInF1ZWVVcGxvYWQiLCJuZXdJdGVtIiwiZXhlY1VwbG9hZHMiLCJjcmVhdGUiLCJnb1RvVGFibGUiLCJiYWNrVG9MaXN0IiwiT1BUX0RFRkFVTFRfUEFHRV9TSVpFIiwiT1BUX0RFRkFVTFRfUEFHRV9OVU1CRVIiLCJPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTiIsIk9QVF9ERUZBVUxUX1NPUlRfRklFTEQiLCJPUFRfRklFTERfTkFNRV9QUkVfUFJPQyIsIm5vdFRhYmxlIiwicm93cyIsInJlc2V0U29ydGVyIiwicmVuZGVySW5zaWRlIiwicmVuZGVySGVhZGVyIiwidXBkYXRlRGF0YSIsInJlbmRlckJvZHkiLCJiaW5kU2VhcmNoIiwiYmluZEN1c3RvbUJpbmRpbmdzIiwidGFibGVIZWFkZXIiLCJuZXdUaCIsInNvcnRhYmxlIiwiYXR0YWNoU29ydGluZ0hhbmRsZXJzIiwiaGVhZENlbGwiLCJjaGFuZ2VTb3J0aW5nT3B0aW9ucyIsInN0eWxlIiwiY3Vyc29yIiwic29ydEJ5RmllbGQiLCJzb3J0RGlyZWN0aW9uIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiaW52YWxpZGF0ZURhdGEiLCJmaWx0ZXJTZWFyY2giLCJpc05hTiIsImlmVXBkYXRpbmciLCJxdWVyeSIsInNldFVwZGF0aW5nIiwiJGxpc3QiLCJwcm9jY2Vzc0RhdGEiLCJyZWZyZXNoQm9keSIsInNldFVwZGF0ZWQiLCJ0aGF0RmlsdGVyIiwidGVzdERhdGFJdGVtIiwidGhhdFNvcnRlciIsInNvcnQiLCJpdGVtMSIsIml0ZW0yIiwidDEiLCJ0MiIsImxvY2FsZUNvbXBhcmUiLCJzZWFyY2hFbCIsIm9uRXZlbnQiLCJjdXJyZW50VGFyZ2V0Iiwic2VsZWN0b3IiLCJnZXRPcHRpb24iLCJuZXdSb3ciLCJuZXdUZCIsInByZXByb2Nlc3NlZCIsIml0ZW1JZCIsInRib2R5IiwiZmluZEJvZHkiLCJjbGVhckJvZHkiLCJjaGVja0ZpbHRlcmVkIiwidGhpc1BhZ2VTdGFydHMiLCJuZXh0UGFnZUVuZHMiLCJtaW4iLCJyZW5kZXJSb3ciLCJ0YWJsZUJvZHkiLCJzdHJWYWx1ZSIsImdldEZpbHRlclNlYXJjaCIsInRvQ29tcCIsIk9QX0RFRkFVTFRfUEFHRV9TSVpFIiwiQ1JVRExpc3QiLCJ1cGRhdGVEYXRhdGFibGUiLCJ0YWJsZVZpZXciLCJsb2FkTmV4dCIsIk9QVF9ERUZBVUxUX0xPQURfQUNUSU9OIiwiQ1JVRFVwZGF0ZSIsImxvYWRJdGVtIiwicnVuTGlzdCIsIkNSVUREZWxldGUiLCJjb25maXJtIiwiZGVsZXRlIiwiYWN0aW9uIiwiT1BUX0RFRkFVTFRfREVUQUlMU19QUkVGSVgiLCJPUFRfREVGQVVMVF9ERVRBSUxTX1RJVExFIiwibm90RGV0YWlscyIsImdldEZpZWxkc0xpc3QiLCJjYXN0Q3VzdG9tIiwiY2FzdENvbW1vbiIsIkN1c3RvbUNvbXBvbmVudCIsImdldFRhcmdldEVsZW1lbnQiLCJDUlVERGV0YWlscyIsInJlbmRlckRldGFpbHMiLCJfaWQiLCJfX3ZlcnNpb24iLCJDUlVEQ29udHJvbGxlciIsInJ1bkNyZWF0ZSIsInJ1bkRldGFpbHMiLCJydW5EZWxldGUiLCJydW5VcGRhdGUiLCJyb3V0ZVJ1bm5lck5hbWUiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIiLCJzY29wZSIsImJpbmRzIiwibGl2ZUV2ZW50cyIsImNoZWNrZWQiLCJzZWxlY3RlZCIsInNlbGVjdGVkT3B0aW9ucyIsInByb2Nlc3NlZFZhbHVlIiwidXNlZCIsIm9wdGlvbiIsInZhbHVlRmllbGROYW1lIiwibGFiZWxGaWVsZE5hbWUiLCJpdGVtVmFsdWVGaWVsZE5hbWUiXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWM7U0FDZixLQUFLQyxHQUFM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
