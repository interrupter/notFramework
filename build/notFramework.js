(function (exports) {
'use strict';

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

var notCommon$1 = {
	extend: function extend(destination, source) {
		for (var property in source) {
			if (source[property] && source[property].constructor && source[property].constructor === Object) {
				destination[property] = destination[property] || {};
				arguments.callee(destination[property], source[property]);
			} else {
				destination[property] = source[property];
			}
		}
		return destination;
	},

	capitalizeFirstLetter: function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},


	defineIfNotExists: function defineIfNotExists(obj, key, defaultValue) {
		if (!obj.hasOwnProperty(key) || typeof obj[key] === 'undefined' || obj[key] === null) {
			obj[key] = defaultValue;
		}
	},

	//::fieldName.sub.value
	////['fieldName', 'sub', 'value']
	normilizePath: function normilizePath(path) {
		if (Array.isArray(path)) {
			return path;
		} else {
			while (path.indexOf(':') > -1) {
				path = path.replace(':', '');
			}
			return path.split('.');
		}
	},

	parsePathStep: function parsePathStep(step, item, helper) {
		var rStep = null;
		if (step.indexOf('::') === 0 && helper) {
			rStep = step.replace('::', '');
			if (rStep.indexOf('()') === rStep.length - 2) {
				rStep = step.replace('()', '');
				if (helper.hasOwnProperty(rStep)) {
					return helper[rStep](item, undefined);
				}
			} else {
				return helper[rStep];
			}
		} else {
			if (step.indexOf(':') === 0 && item) {
				rStep = step.replace(':', '');
				if (rStep.indexOf('()') === rStep.length - 2) {
					rStep = step.replace('()', '');
					if (item.hasOwnProperty(rStep)) {
						return item[rStep](item, undefined);
					}
				} else {
					return item[rStep];
				}
			}
		}
		return step;
	},

	//::fieldName.result
	//{}
	//{fieldName: 'targetRecordField'}
	////['targetRecordField', 'result']
	parsePath: function parsePath(path, item, helper) {
		if (!Array.isArray(path)) {
			path = path.split('.');
		}
		for (var i = 0; i < path.length; i++) {
			path[i] = this.parsePathStep(path[i], item, helper);
		}
		return path;
	},

	getValueByPath: function getValueByPath(object, attrPath) {
		attrPath = this.normilizePath(attrPath);
		var attrName = attrPath.shift();
		if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && object.hasOwnProperty(attrName)) {
			if (attrPath.length > 0) {
				return this.getValueByPath(object[attrName], attrPath);
			} else {
				return object[attrName];
			}
		} else {
			return undefined;
		}
	},

	setValueByPath: function setValueByPath(object, attrPath, attrValue) {
		attrPath = this.normilizePath(attrPath);
		var attrName = attrPath.shift();
		if (attrPath.length > 0) {
			if (!object.hasOwnProperty(attrName)) {
				object[attrName] = {};
			}
			this.setValueByPath(object[attrName], attrPath, attrValue);
		} else {
			if (object && object.isRecord) {
				object._setAttr(attrName, attrValue, true);
			} else {
				object[attrName] = attrValue;
			}
		}
		if (object && object.isRecord) {
			object.trigger('onAttrChange_' + attrName, object, attrName, attrValue);
			object.trigger('onAttrChange', object, attrName, attrValue);
		}
	},

	identicalArrays: function identicalArrays(arr1, arr2) {
		arr1.sort();
		arr2.sort();
		return arr1.join(',').localeCompare(arr2.join(',')) === 0;
	},

	identicalToArray: function identicalToArray(arr, val) {
		return arr.length == 1 && arr.indexOf(val) === 0;
	},

	identical: function identical(a, b) {
		if (Array.isArray(a) && Array.isArray(b)) {
			return this.identicalArrays(a, b);
		} else {
			if (Array.isArray(a) && !Array.isArray(b) || !Array.isArray(a) && Array.isArray(b)) {
				return Array.isArray(a) ? this.identicalToArray(a, b) : this.identicalToArray(b, a);
			} else {
				return a == b;
			}
		}
	},

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
	},

	moveElementInArray: function moveElementInArray(arr, old_index, new_index) {
		if (new_index >= arr.length) {
			var k = new_index - arr.length;
			while (k-- + 1) {
				arr.push(undefined);
			}
		}
		arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		return arr;
	},

	/*
 		Registry for framework wide store
 	*/
	registry: {},
	register: function register(key, val) {
		this.registry[key] = val;
	},

	get: function get(key) {
		return this.registry.hasOwnProperty(key) ? this.registry[key] : null;
	},

	getSessionID: function getSessionID() {
		return '';
	},

	getHTML: function getHTML(url, data) {
		var that = this;
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader("SessionID", that.getSessionID());
			xhr.responseType = 'text';
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
			xhr.send();
		});
	},

	getJSON: function getJSON(url, data) {
		var that = this;
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader("SessionID", that.getSessionID());
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
			xhr.send();
		});
	},
	postJSON: function postJSON(url, data) {
		var that = this;
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open("POST", url);
			xhr.setRequestHeader("SessionID", that.getSessionID());
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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
			xhr.open("PUT", url);
			xhr.setRequestHeader("SessionID", that.getSessionID());
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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
			xhr.open("DELETE", url);
			xhr.setRequestHeader("SessionID", that.getSessionID());
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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
	}

};

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
			var start = 0,
			    end = path.length,
			    subPath = '',
			    find = false;
			for (var i = 0; i < path.length; i++) {
				if (path[i] === SUB_PATH_START) {
					find = true;start = i;
					subPath = '';
				} else {
					if (path[i] === SUB_PATH_END && find) {
						end = i;
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
	}, {
		key: 'getValueByPath',
		value: function getValueByPath(object, attrPath) {
			attrPath = this.normilizePath(attrPath);
			var attrName = attrPath.shift(),
			    isFunction = attrName.indexOf(FUNCTION_MARKER) > -1;
			if (isFunction) {
				attrName = attrName.replace(FUNCTION_MARKER, '');
			}
			if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) == 'object' && object.hasOwnProperty(attrName)) {
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
					/* set collection */
					what = args[0];
					break;
				case 2:
					/* set collection element */
					notPath$1.set(args[0] /* path */, what /* collection */, undefined /* helpers */, args[1] /* value */);
					break;
			}
		}
	}, {
		key: 'getCommon',
		value: function getCommon(what, args) {
			switch (args.length) {
				/* if we want get data by path */
				case 1:
					return notPath$1.get(args[0], what);
				/* if we want get data by path with default value */
				case 2:
					var res = notPath$1.get(args[0], what);
					if (res === undefined) {
						/* no data, return default value */
						return args[1];
					} else {
						/* data, return it */
						return res;
					};
				/* return full collection */
				default:
					return what;
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
				notCommon$1.defineIfNotExists(_this[META_EVENTS], name, []);
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

var notImage = function (_notBase) {
	inherits(notImage, _notBase);

	function notImage() {
		classCallCheck(this, notImage);
		return possibleConstructorReturn(this, (notImage.__proto__ || Object.getPrototypeOf(notImage)).call(this));
	}

	return notImage;
}(notBase);

var notApp = function (_notBase) {
	inherits(notApp, _notBase);

	function notApp() {
		var _ret;

		classCallCheck(this, notApp);

		var _this = possibleConstructorReturn(this, (notApp.__proto__ || Object.getPrototypeOf(notApp)).call(this));

		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	return notApp;
}(notBase);

var notController = function notController() {
	classCallCheck(this, notController);
};

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

var notTemplateProcessorsLib = {
	content: function content(scope, item, helpers) {
		scope.attributeResult = notPath$1.parseSubs(scope.attributeExpression, item, helpers);
		if (scope.params.indexOf('capitalize') > -1) {
			scope.attributeResult = scope.attributeResult.toUpperCase();
		}
		scope.element.innerHTML = scope.attributeResult;
	},
	bind: function bind() {},
	value: function value() {},
	attr: function attr() {},
	change: function change() {}
};

var META_CACHE = Symbol('cache');
var TEMPLATE_TAG = 'nt';

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
			t.innerHTML = TEMPLATE_TAG + '{display: none;}';
			document.head.appendChild(t);
		}
	}, {
		key: 'register',
		value: function register() {
			notCommon$1.register('templateCache', this);
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
			oRequest.open("GET", url);
			oRequest.addEventListener("load", function (response) {
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
			var cont = document.createElement(TEMPLATE_TAG);
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
			var notTemplatesElements = cont.querySelectorAll(TEMPLATE_TAG);
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = cont.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var el = _step.value;

					if (el.parentNode === cont) {
						if (el.attributes.name && el.attributes.name.value) {
							result[el.attributes.name.value] = el;
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
					notCommon$1.getHTML(url).then(function (templateInnerHTML) {
						var templateContEl = that.wrap(key, url, templateInnerHTML);
						that.setOne(key, templateContEl);
						resolve(templateContEl);
					}).catch(function (httpError, response) {
						console.error('error loading template', key, url);
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
				notCommon$1.getHTML(url).then(function (templatesHTML) {

					var templates = that.parseLib(templatesHTML);
					that.addLib(templates);
					resolve(templates);
				}).catch(function (httpError, response) {
					console.error('error loading templates lib', url);
					reject.apply(undefined, arguments);
				});
			});
		}
	}, {
		key: 'addFromDocument',
		value: function addFromDocument(selectorOrElement) {
			var el = typeof selectorOrElement === 'string' ? document.querySelector(selectorOrElement) : selectorOrElement;
			if (el.attributes.name && el.attributes.name.value) {
				if (el.tagName.toLowerCase() === TEMPLATE_TAG.toLowerCase()) {
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

var OPT_PROCESSOR_EXPRESSION_PREFIX = 'n-';
var OPT_PROCESSOR_EXPRESSION_SEPARATOR = '-';
var OPT_PROCESSOR_EXPRESSION_CONDITION_POSTFIX = 'if';

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

var notTemplate = function (_notBase) {
	inherits(notTemplate, _notBase);

	/*
 	input = {
 		data: notRecord or [notRecord],
 		template: {
 			html: html(string), 		//текст с html кодом шаблона
 			el: HTMLElement(object), 	//DOM элемент
 			url: url(string),			//ссылка на файл с шаблоном
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

	function notTemplate(input) {
		var _ret;

		classCallCheck(this, notTemplate);

		var _this = possibleConstructorReturn(this, (notTemplate.__proto__ || Object.getPrototypeOf(notTemplate)).call(this));

		_this.on('ready', _this.render.bind(_this));
		_this.init(input);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notTemplate, [{
		key: 'init',
		value: function init(input) {
			this.input = input;
			this.initData(input.data ? input.data : {});
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
		key: 'initOptions',
		value: function initOptions(val) {
			this.setOptions(val);
		}
	}, {
		key: 'initWorking',
		value: function initWorking(val) {
			this.unsetReady();
		}
	}, {
		key: 'prepareTemplateElement',
		value: function prepareTemplateElement(val) {
			if (!val) {
				this.unsetReady();
			} else {

				if (val.hasOwnProperty('html') && val.html) {
					this.setLocalTemplateElement(notTemplateCache$1.wrap('', '', val.html));
				}

				if (val.hasOwnProperty('el') && val.el) {
					this.setLocalTemplateElement(val.el.cloneNode(true));
				}

				if (val.hasOwnProperty('url') && val.url) {
					notTemplateCache$1.getFromURL(val.url, val.url).then(function (templateContElement) {
						this.setLocalTemplateElement(templateContElement);
					});
				}

				if (val.hasOwnProperty('name') && val.name) {
					this.setLocalTemplateElement(notTemplateCache$1.get(val.name));
				}
			}
		}
	}, {
		key: 'setLocalTemplateElement',
		value: function setLocalTemplateElement(cont) {
			if (cont) {
				this.setWorking('templateElement', cont);
				console.info('templateElement ready', cont);
				this.trigger('ready');
			} else {
				console.error('Wrong template container element');
			}
		}
	}, {
		key: 'getLocalTemplateElement',
		value: function getLocalTemplateElement() {
			return this.getWorking('templateElement');
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
		key: 'render',
		value: function render() {
			if (this.getLocalTemplateElement()) {
				this.createMappingIfNotExists();
				this.execProcessors(this.getData(), 0);
				this.getData().on('change', function (proxy, key, value) {
					console.log('updating template after changes', proxy, key, value);
					this.execProcessors(proxy, 0);
				}.bind(this));
				this.placeRendered();
			}
		}
	}, {
		key: 'placer',
		value: function placer(method) {
			console.log('searching for placer', method);
			var t = {
				place: function place(targetEl, rendered) {
					while (targetEl.children.length) {
						targetEl.removeChild(targetEl.children[0]);
					}
					for (var i = 0; i < rendered.children.length; i++) {
						targetEl.appendChild(rendered.children[i]);
					}
				},
				replace: function replace() {},
				placeAfter: function placeAfter() {},
				placeBefore: function placeBefore() {},
				placeFirst: function placeFirst() {},
				placeLast: function placeLast() {}
			};
			if (t.hasOwnProperty(method)) {
				return t[method];
			} else {
				return t.place;
			}
		}
	}, {
		key: 'placeRendered',
		value: function placeRendered() {
			if (this.getOptions('targetEl')) {
				var placer = this.placer(this.getOptions('renderAnd'));
				placer(this.getOptions('targetEl'), this.getLocalTemplateElement());
			} else {
				console.error('no target element');
			}
		}
	}, {
		key: 'update',
		value: function update() {}

		/* core rendering */

	}, {
		key: 'createMappingIfNotExists',
		value: function createMappingIfNotExists() {
			if (!this.getWorking('mapping')) {
				this.setWorking('mapping', this.createMapping());
			}
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
			    els = notCommon$1.getAttributesStartsWith(this.getLocalTemplateElement(), OPT_PROCESSOR_EXPRESSION_PREFIX);
			for (var j = 0; j < els.length; j++) {
				for (var i = 0, atts = els[j].attributes, n = atts.length; i < n; i++) {
					if (atts[i].nodeName.indexOf(OPT_PROCESSOR_EXPRESSION_PREFIX) === 0) {
						console.log(atts[i]);
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
			processorExpression = processorExpression.replace(OPT_PROCESSOR_EXPRESSION_PREFIX, '');
			if (processorExpression.indexOf(OPT_PROCESSOR_EXPRESSION_CONDITION_POSTFIX) === processorExpression.length - OPT_PROCESSOR_EXPRESSION_CONDITION_POSTFIX.length) {
				result.ifCondition = true;
				processorExpression = processorExpression.replace(OPT_PROCESSOR_EXPRESSION_SEPARATOR + OPT_PROCESSOR_EXPRESSION_CONDITION_POSTFIX, '');
			}
			result.params = processorExpression.split(OPT_PROCESSOR_EXPRESSION_SEPARATOR);
			result.processorName = result.params[0];
			result.params = result.params.slice(1);
			return result;
		}
	}, {
		key: 'execProcessors',
		value: function execProcessors(item, index) {
			console.log('exec proccessors on current');
			var mapping = this.getWorking('mapping');
			for (var i = 0; i < mapping.length; i++) {
				var procScope = mapping[i];
				procScope.attributeResult = this.getAttributeExpressionResult(procScope.attributeExpression, item, index);
				console.log('attributeResult', procScope.attributeResult);
				var procName = procScope.processorName,
				    proc = notTemplateProcessors$1.get(procName);
				if (proc) {
					proc(procScope, item, this.getOptions('helpers', {}));
					procScope.element.removeAttribute(procScope.processorExpression);
				}
			}
		}
	}, {
		key: 'getAttributeExpressionResult',
		value: function getAttributeExpressionResult(path, item, index) {
			return notPath$1.get(path, item, this.getOptions('helpers', {}));
		}

		/* simple utility methods*/

	}, {
		key: 'hide',
		value: function hide() {}
	}, {
		key: 'show',
		value: function show() {}
	}]);
	return notTemplate;
}(notBase);

var META_PARTS = Symbol('parts');

var notComponent = function (_notBase) {
	inherits(notComponent, _notBase);

	function notComponent(data, options) {
		var _ret;

		classCallCheck(this, notComponent);

		var _this = possibleConstructorReturn(this, (notComponent.__proto__ || Object.getPrototypeOf(notComponent)).call(this));

		_this.setData(data);
		_this.setOptions(options);
		_this[META_PARTS] = {};
		_this.render();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notComponent, [{
		key: 'setParts',
		value: function setParts() {
			this.setCommon(this[META_PARTS], arguments);
		}
	}, {
		key: 'getParts',
		value: function getParts() {
			return this.getCommon(this[META_PARTS], arguments);
		}

		/*
  	Rendering
  */

	}, {
		key: 'render',
		value: function render() {
			this.trigger('beforeRender');
			var anchors = this.collectAnchors();
			this.trigger('afterRender');
		}

		/*
  	Presentation control
  */

	}, {
		key: 'update',
		value: function update() {}
	}, {
		key: 'show',
		value: function show() {}
	}, {
		key: 'hide',
		value: function hide() {}
	}, {
		key: 'remove',
		value: function remove() {}
	}, {
		key: 'replace',
		value: function replace() {}
	}, {
		key: 'addPart',
		value: function addPart(component, anchor) {
			this.trigger.apply(this, ['beforeAddPart'].concat(Array.prototype.slice.call(arguments)));
			var partsAtAnchor = this.getParts(anchor);
			if (!Array.isArray(partsAtAnchor)) {
				partsAtAnchor = [];
			}
			partsAtAnchor.push(component);
			this.setParts(anchor, partsAtAnchor);
			this.trigger.apply(this, ['afterAddPart'].concat(Array.prototype.slice.call(arguments)));
			return this;
		}

		/*
  	direction > 0 for moving down;
  	direction < 0  for moving up;
  	direction = 'first' for moving to the start of array;
  	direction = 'last' for moving to the end of array;
  */

	}, {
		key: 'movePart',
		value: function movePart(component, anchor, direction) {
			this.trigger.apply(this, ['beforeMovePart'].concat(Array.prototype.slice.call(arguments)));
			var partsAtAnchor = this.getParts(anchor);
			if (Array.isArray(partsAtAnchor) && partsAtAnchor.includes(component)) {
				var first = 0,
				    last = partsAtAnchor.length - 1,
				    fromPos = partsAtAnchor.indexOf(component),
				    toPos = void 0;
				switch (direction) {
					case 'first':
						toPos = first;
						break;
					case 'last':
						toPos = last;
						break;
					default:
						toPos = fromPos + direction;
				}

				if (toPos > last) {
					toPos = last;
				} else {
					if (toPos < first) {
						toPos = first;
					}
				}

				notCommon.moveElementInArray(partsAtAnchor, fromPos, toPos);
			}
			this.setParts(anchor, partsAtAnchor);
			this.trigger.apply(this, ['afterMovePart'].concat(Array.prototype.slice.call(arguments)));
			return this;
		}
	}, {
		key: 'removePart',
		value: function removePart(component, anchor) {
			this.trigger.apply(this, ['beforeRemovePart'].concat(Array.prototype.slice.call(arguments)));
			var partsAtAnchor = this.getParts(anchor);
			if (Array.isArray(partsAtAnchor) && partsAtAnchor.includes(component)) {
				partsAtAnchor.splice(partsAtAnchor.indexOf(component), 1);
			}
			this.setParts(anchor, partsAtAnchor);
			this.trigger.apply(this, ['afterRemovePart'].concat(Array.prototype.slice.call(arguments)));
			return this;
		}

		/*
  	Event handlers
  */

	}]);
	return notComponent;
}(notBase);

var META_WORKING$1 = Symbol('working');
var META_OPTIONS$1 = Symbol('options');

var notForm = function (_notComponent) {
	inherits(notForm, _notComponent);

	function notForm(options) {
		var _ret;

		classCallCheck(this, notForm);

		var _this = possibleConstructorReturn(this, (notForm.__proto__ || Object.getPrototypeOf(notForm)).call(this));

		_this[META_WORKING$1] = {};
		_this[META_OPTIONS$1] = {};
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

var notView = function (_notComponent) {
	inherits(notView, _notComponent);

	function notView() {
		classCallCheck(this, notView);
		return possibleConstructorReturn(this, (notView.__proto__ || Object.getPrototypeOf(notView)).call(this));
	}

	return notView;
}(notComponent);

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
			return this.manifest.actions ? Object.keys(this.manifest.actions).length : 0;
		}
	}, {
		key: 'getActions',
		value: function getActions() {
			return this.manifest.actions;
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
	}, {
		key: 'request',
		value: function request(record, actionName, callbackSuccess, callbackError) {
			console.log('request', record, actionName, callbackSuccess, callbackError);
			var actionData = this.getActionData(actionName),
			    url = this.getURL(record, actionData, actionName);
			if (actionData) {
				var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
				xmlhttp.open(actionData.method, url);
				xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				xmlhttp.responseType = 'json';
				xmlhttp.withCredentials = true;
				xmlhttp.actionData = actionData;
				xmlhttp.manifest = manifest;
				xmlhttp.callbackSuccess = callbackSuccess;
				xmlhttp.callbackError = callbackError;
				xmlhttp.onload = this.onLoad;
				xmlhttp.send(JSON.stringify(record.getData()));
			}
		}
	}, {
		key: 'onLoad',
		value: function onLoad() {
			var _this2 = this;

			var status = this.status,
			    data = this.response,
			    result = [];
			if (status == 200) {
				if ('isArray' in this.actionData && this.actionData.isArray) {
					data.forEach(function (item) {
						result.push(new notRecord(_this2.manifest, item));
					});
				} else {
					result = new notRecord(this.manifest, data);
				}
				this.callbackSuccess && this.callbackSuccess(result);
			} else {
				this.callbackError && this.callbackError(data);
			}
		}

		/*
  fileUpload(fileUpload) {
  	var xhr = new XMLHttpRequest();
  	//console.log(fileUpload.file);
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
var META_SAL = ['getAttr', 'getAttrs', 'setAttr', 'setAttrs', 'getData', 'setData', 'getJSON', 'on', 'off', 'trigger'];
var DEFAULT_ACTION_PREFIX = '$';
var DEFAULT_PAGE_NUMBER$1 = 1;
var DEFAULT_PAGE_SIZE$1 = 10;

var createHandlers = function createHandlers(owner) {
	return {
		get: function (target, key, context) {
			//console.log(`proxy get "${key}"`, this, target, context);
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

		set: function (target, key, value, proxy) {
			//console.log(`proxy set "${key}"`, this, target, context);
			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error('Invalid attempt to private "' + key + '" property');
			} else {
				var t = Reflect.set(target, key, value);
				this.trigger('change', proxy, key, value);
				return t;
			}
		}.bind(owner)
	};
};

var notRecord$1 = function (_notBase) {
	inherits(notRecord, _notBase);

	function notRecord(manifest, item) {
		var _ret3;

		classCallCheck(this, notRecord);

		var _this = possibleConstructorReturn(this, (notRecord.__proto__ || Object.getPrototypeOf(notRecord)).call(this));

		if (item && item.isRecord) {
			var _ret;

			return _ret = item, possibleConstructorReturn(_this, _ret);
		} else {
			if (Array.isArray(item)) {
				var _ret2;

				return _ret2 = _this.createCollection(manifest, item), possibleConstructorReturn(_this, _ret2);
			}
		}
		_this.setOptions({
			filter: {},
			sorter: {},
			pageNumber: DEFAULT_PAGE_NUMBER$1,
			pageSize: DEFAULT_PAGE_SIZE$1,
			fields: []
		});
		_this[META_INTERFACE] = new notInterface(manifest);
		_this.setData(item);
		_this.interfaceUp();
		_this.isRecord = true;
		_this[META_PROXY] = new Proxy(item, createHandlers(_this));
		_this.on('change', _this[META_CHANGE].bind(_this));
		return _ret3 = _this[META_PROXY], possibleConstructorReturn(_this, _ret3);
	}

	createClass(notRecord, [{
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
		value: function actionUp(index, actionData) {
			if (!this.hasOwnProperty([DEFAULT_ACTION_PREFIX + index])) {
				this[DEFAULT_ACTION_PREFIX + index] = this.createCommonRequest(index);
				console.log('define', DEFAULT_ACTION_PREFIX + index);
			}
		}
	}, {
		key: 'createCommonRequest',
		value: function createCommonRequest(index) {
			return function (callbackSuccess, callbackError) {
				this[META_INTERFACE].request(this, index, callbackSuccess, callbackError);
			}.bind(this);
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
			console.log('setAttrs', objectPart, Object.keys(objectPart));
			if (objectPart && (typeof objectPart === 'undefined' ? 'undefined' : _typeof(objectPart)) === 'object' && Object.keys(objectPart).length > 0) {
				for (var path in objectPart) {
					console.log('setAttrs one to go', path);
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
			console.log('getAttr', what);
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
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = what[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var path = _step.value;

						result.push(this.getAttr(path));
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
			return result;
		}

		/*
  	handler for Proxy callbacks
  */

	}, {
		key: META_CHANGE,
		value: function value() {
			console.log('try to change', arguments);
		}
	}, {
		key: 'setItem',
		value: function setItem(item) {
			this.setData(item);
			this[META_PROXY] = new Proxy(item, createHandlers(this));
			this.off('change');
			this.on('change', this[META_CHANGE].bind(this));
			return this[META_PROXY];
		}
	}, {
		key: 'getJSON',
		value: function getJSON() {}
	}]);
	return notRecord;
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

exports.notCommon = notCommon$1;
exports.notPath = notPath$1;
exports.notBase = notBase;
exports.notImage = notImage;
exports.notApp = notApp;
exports.notController = notController;
exports.notTemplateProcessors = notTemplateProcessors$1;
exports.notTemplateProcessorsLib = notTemplateProcessorsLib;
exports.notTemplateCache = notTemplateCache$1;
exports.notTemplate = notTemplate;
exports.notComponent = notComponent;
exports.notForm = notForm;
exports.notTable = notTable;
exports.notView = notView;
exports.notRecordInterface = notInterface;
exports.notRecord = notRecord$1;

}((this.notFramework = this.notFramework || {})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9ub3RDb21tb24uanMiLCIuLi9zcmMvbm90UGF0aC5qcyIsIi4uL3NyYy9ub3RCYXNlLmpzIiwiLi4vc3JjL25vdEltYWdlLmpzIiwiLi4vc3JjL25vdEFwcC5qcyIsIi4uL3NyYy9ub3RDb250cm9sbGVyLmpzIiwiLi4vc3JjL25vdFRlbXBsYXRlUHJvY2Vzc29ycy5qcyIsIi4uL3NyYy9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIuanMiLCIuLi9zcmMvbm90VGVtcGxhdGVDYWNoZS5qcyIsIi4uL3NyYy9ub3RUZW1wbGF0ZS5qcyIsIi4uL3NyYy9ub3RDb21wb25lbnQuanMiLCIuLi9zcmMvbm90Rm9ybS5qcyIsIi4uL3NyYy9ub3RUYWJsZS5qcyIsIi4uL3NyYy9ub3RWaWV3LmpzIiwiLi4vc3JjL25vdFJlY29yZEludGVyZmFjZS5qcyIsIi4uL3NyYy9ub3RSZWNvcmQuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbm90Q29tbW9uID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcblx0XHRmb3IgKGxldCBwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcblx0XHRcdGlmIChzb3VyY2VbcHJvcGVydHldICYmIHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgJiYgc291cmNlW3Byb3BlcnR5XS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG5cdFx0XHRcdGRlc3RpbmF0aW9uW3Byb3BlcnR5XSA9IGRlc3RpbmF0aW9uW3Byb3BlcnR5XSB8fCB7fTtcblx0XHRcdFx0YXJndW1lbnRzLmNhbGxlZShkZXN0aW5hdGlvbltwcm9wZXJ0eV0sIHNvdXJjZVtwcm9wZXJ0eV0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVzdGluYXRpb25bcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGRlc3RpbmF0aW9uO1xuXHR9LFxuXG5cdGNhcGl0YWxpemVGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxuXG5cblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8IHR5cGVvZiBvYmpba2V5XSA9PT0gJ3VuZGVmaW5lZCcgfHwgb2JqW2tleV0gPT09IG51bGwpIHtcblx0XHRcdG9ialtrZXldID0gZGVmYXVsdFZhbHVlO1xuXHRcdH1cblx0fSxcblxuXHQvLzo6ZmllbGROYW1lLnN1Yi52YWx1ZVxuXHQvLy8vWydmaWVsZE5hbWUnLCAnc3ViJywgJ3ZhbHVlJ11cblx0bm9ybWlsaXplUGF0aDogZnVuY3Rpb24ocGF0aCkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhdGgpKSB7XG5cdFx0XHRyZXR1cm4gcGF0aDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2hpbGUgKHBhdGguaW5kZXhPZignOicpID4gLTEpIHtcblx0XHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZSgnOicsICcnKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXRoLnNwbGl0KCcuJyk7XG5cdFx0fVxuXHR9LFxuXG5cdHBhcnNlUGF0aFN0ZXA6IGZ1bmN0aW9uKHN0ZXAsIGl0ZW0sIGhlbHBlcikge1xuXHRcdGxldCByU3RlcCA9IG51bGw7XG5cdFx0aWYgKHN0ZXAuaW5kZXhPZignOjonKSA9PT0gMCAmJiBoZWxwZXIpIHtcblx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKCc6OicsICcnKTtcblx0XHRcdGlmIChyU3RlcC5pbmRleE9mKCcoKScpID09PSByU3RlcC5sZW5ndGggLSAyKSB7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKCcoKScsICcnKTtcblx0XHRcdFx0aWYgKGhlbHBlci5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHN0ZXAuaW5kZXhPZignOicpID09PSAwICYmIGl0ZW0pIHtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoJzonLCAnJyk7XG5cdFx0XHRcdGlmIChyU3RlcC5pbmRleE9mKCcoKScpID09PSByU3RlcC5sZW5ndGggLSAyKSB7XG5cdFx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoJygpJywgJycpO1xuXHRcdFx0XHRcdGlmIChpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fSxcblxuXHQvLzo6ZmllbGROYW1lLnJlc3VsdFxuXHQvL3t9XG5cdC8ve2ZpZWxkTmFtZTogJ3RhcmdldFJlY29yZEZpZWxkJ31cblx0Ly8vL1sndGFyZ2V0UmVjb3JkRmllbGQnLCAncmVzdWx0J11cblx0cGFyc2VQYXRoOiBmdW5jdGlvbihwYXRoLCBpdGVtLCBoZWxwZXIpIHtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpIHtcblx0XHRcdHBhdGggPSBwYXRoLnNwbGl0KCcuJyk7XG5cdFx0fVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuXHRcdFx0cGF0aFtpXSA9IHRoaXMucGFyc2VQYXRoU3RlcChwYXRoW2ldLCBpdGVtLCBoZWxwZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gcGF0aDtcblx0fSxcblxuXHRnZXRWYWx1ZUJ5UGF0aDogZnVuY3Rpb24ob2JqZWN0LCBhdHRyUGF0aCkge1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnICYmIG9iamVjdC5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpIHtcblx0XHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKG9iamVjdFthdHRyTmFtZV0sIGF0dHJQYXRoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0fSxcblxuXHRzZXRWYWx1ZUJ5UGF0aDogZnVuY3Rpb24ob2JqZWN0LCBhdHRyUGF0aCwgYXR0clZhbHVlKSB7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCk7XG5cdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApIHtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSkge1xuXHRcdFx0XHRvYmplY3RbYXR0ck5hbWVdID0ge307XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldFZhbHVlQnlQYXRoKG9iamVjdFthdHRyTmFtZV0sIGF0dHJQYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAob2JqZWN0ICYmIG9iamVjdC5pc1JlY29yZCkge1xuXHRcdFx0XHRvYmplY3QuX3NldEF0dHIoYXR0ck5hbWUsIGF0dHJWYWx1ZSwgdHJ1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAob2JqZWN0ICYmIG9iamVjdC5pc1JlY29yZCkge1xuXHRcdFx0b2JqZWN0LnRyaWdnZXIoJ29uQXR0ckNoYW5nZV8nICsgYXR0ck5hbWUsIG9iamVjdCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG5cdFx0XHRvYmplY3QudHJpZ2dlcignb25BdHRyQ2hhbmdlJywgb2JqZWN0LCBhdHRyTmFtZSwgYXR0clZhbHVlKTtcblx0XHR9XG5cdH0sXG5cblx0aWRlbnRpY2FsQXJyYXlzOiBmdW5jdGlvbihhcnIxLCBhcnIyKSB7XG5cdFx0YXJyMS5zb3J0KCk7XG5cdFx0YXJyMi5zb3J0KCk7XG5cdFx0cmV0dXJuIChhcnIxLmpvaW4oJywnKS5sb2NhbGVDb21wYXJlKGFycjIuam9pbignLCcpKSA9PT0gMCk7XG5cdH0sXG5cblx0aWRlbnRpY2FsVG9BcnJheTogZnVuY3Rpb24oYXJyLCB2YWwpIHtcblx0XHRyZXR1cm4gKChhcnIubGVuZ3RoID09IDEpICYmIGFyci5pbmRleE9mKHZhbCkgPT09IDApO1xuXHR9LFxuXG5cdGlkZW50aWNhbDogZnVuY3Rpb24oYSwgYikge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGEpICYmIEFycmF5LmlzQXJyYXkoYikpIHtcblx0XHRcdHJldHVybiB0aGlzLmlkZW50aWNhbEFycmF5cyhhLCBiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKChBcnJheS5pc0FycmF5KGEpICYmICFBcnJheS5pc0FycmF5KGIpKSB8fCAoIUFycmF5LmlzQXJyYXkoYSkgJiYgQXJyYXkuaXNBcnJheShiKSkpIHtcblx0XHRcdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkoYSkgPyB0aGlzLmlkZW50aWNhbFRvQXJyYXkoYSwgYikgOiB0aGlzLmlkZW50aWNhbFRvQXJyYXkoYiwgYSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gYSA9PSBiO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fSxcblxuXHRtb3ZlRWxlbWVudEluQXJyYXk6IGZ1bmN0aW9uKGFyciwgb2xkX2luZGV4LCBuZXdfaW5kZXgpIHtcblx0XHRpZiAobmV3X2luZGV4ID49IGFyci5sZW5ndGgpIHtcblx0XHRcdGxldCBrID0gbmV3X2luZGV4IC0gYXJyLmxlbmd0aDtcblx0XHRcdHdoaWxlICgoay0tKSArIDEpIHtcblx0XHRcdFx0YXJyLnB1c2godW5kZWZpbmVkKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YXJyLnNwbGljZShuZXdfaW5kZXgsIDAsIGFyci5zcGxpY2Uob2xkX2luZGV4LCAxKVswXSk7XG5cdFx0cmV0dXJuIGFycjtcblx0fSxcblxuXHQvKlxuXG5cdFx0UmVnaXN0cnkgZm9yIGZyYW1ld29yayB3aWRlIHN0b3JlXG5cblx0Ki9cblx0cmVnaXN0cnk6IHt9LFxuXHRyZWdpc3RlcjogZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0XHR0aGlzLnJlZ2lzdHJ5W2tleV0gPSB2YWw7XG5cdH0sXG5cblx0Z2V0OiBmdW5jdGlvbihrZXkpIHtcblx0XHRyZXR1cm4gdGhpcy5yZWdpc3RyeS5oYXNPd25Qcm9wZXJ0eShrZXkpID8gdGhpcy5yZWdpc3RyeVtrZXldIDogbnVsbDtcblx0fSxcblxuXHRnZXRTZXNzaW9uSUQ6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuICcnO1xuXHR9LFxuXG5cdGdldEhUTUw6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiU2Vzc2lvbklEXCIsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0Jztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZCgpO1xuXHRcdH0pO1xuXHR9LFxuXG5cdGdldEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbignZ2V0JywgdXJsLCB0cnVlKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiU2Vzc2lvbklEXCIsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZCgpO1xuXHRcdH0pO1xuXHR9LFxuXHRwb3N0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbihcIlBPU1RcIiwgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiU2Vzc2lvbklEXCIsIHRoYXQuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIik7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoc3RhdHVzLCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHR9KTtcblx0fSxcblx0cHV0SlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0bGV0IHRoYXQgPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbihcIlBVVFwiLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJTZXNzaW9uSURcIiwgdGhhdC5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOFwiKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdChzdGF0dXMsIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdH0pO1xuXHR9LFxuXHRkZWxldGVKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRsZXQgdGhhdCA9IHRoaXM7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBuZXcgSHR0cFJlcXVlc3QgaW5zdGFuY2Vcblx0XHRcdHhoci5vcGVuKFwiREVMRVRFXCIsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIlNlc3Npb25JRFwiLCB0aGF0LmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PVVURi04XCIpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHN0YXR1cywgeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0fSk7XG5cblx0fVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBub3RDb21tb247XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vbm90Q29tbW9uJztcblxuLypcblx0OnByb3BlcnR5LnN1YjEuZnVuYygpLmZ1bmNQcm9wXG5cdCA9IHJldHVybiBmdW5jUHJvcCBvZiBmdW5jdGlvbiByZXN1bHQgb2Ygc3ViMSBwcm9wZXJ0eSBvZiBwcm9wZXJ0eSBvZiBvYmplY3Rcblx0Ons6OmhlbHBlclZhbH0uc3ViXG5cdCA9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgcHJvcGVydHkgb2YgaGVscGVycyBvYmplY3Rcblx0Ons6OmhlbHBlckZ1bmMoKX0uc3ViXG5cdD0gcmV0dXJuIHN1YiBwcm9wZXJ0eSBvZiBvYmplY3QgcHJvcGVydHkgd2l0aCBuYW1lIHJldHJpZXZlZCBmcm9tIGhlbHBlclZhbCBmdW5jdGlvbiByZXN1bHQgb2YgaGVscGVycyBvYmplY3QuXG5cdGlmIGhlbHBlcnNGdW54IHJldHVybiAnY2FyJyB0aGVuIHNvdXJjZSBwYXRoIGJlY29tZXMgOmNhci5zdWJcblxuKi9cblxuY29uc3QgU1VCX1BBVEhfU1RBUlQgPSAneycsXG5cdFNVQl9QQVRIX0VORCA9ICd9Jyxcblx0UEFUSF9TUExJVCA9ICcuJyxcblx0UEFUSF9TVEFSVF9PQkpFQ1QgPSAnOicsXG5cdFBBVEhfU1RBUlRfSEVMUEVSUyA9ICc6OicsXG5cdEZVTkNUSU9OX01BUktFUiA9ICcoKScsXG5cdE1BWF9ERUVQID0gMTA7XG5cbmNsYXNzIG5vdFBhdGh7XG5cdGNvbnN0cnVjdG9yKCl7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHQvKlxuXHRcdGlucHV0ICc6ezo6aGVscGVyVmFsfS5zdWInXG5cdFx0cmV0dXJuIDo6aGVscGVyVmFsXG5cdCovXG5cdGZpbmROZXh0U3ViUGF0aChwYXRoLyogc3RyaW5nICovKXtcblx0XHRsZXQgc3RhcnQgPSAwLFxuXHRcdFx0ZW5kID0gcGF0aC5sZW5ndGgsXG5cdFx0XHRzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7IHN0YXJ0ID0gaTtcblx0XHRcdFx0c3ViUGF0aCA9ICcnO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKHBhdGhbaV0gPT09IFNVQl9QQVRIX0VORCAmJiBmaW5kKXtcblx0XHRcdFx0XHRlbmQgPSBpO1xuXHRcdFx0XHRcdGlmIChmaW5kKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc3ViUGF0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHN1YlBhdGgrPXBhdGhbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZpbmQ/c3ViUGF0aDpudWxsO1xuXHR9XG5cblx0cmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViLCBwYXJzZWQpe1xuXHRcdGxldCBzdWJmID0gU1VCX1BBVEhfU1RBUlQrc3ViK1NVQl9QQVRIX0VORDtcblx0XHR3aGlsZShwYXRoLmluZGV4T2Yoc3ViZikgPiAtMSl7XG5cdFx0XHRwYXRoID0gcGF0aC5yZXBsYWNlKHN1YmYsIHBhcnNlZCk7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0cGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGxldCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkLCBpID0gMDtcblx0XHR3aGlsZShzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCkpe1xuXHRcdFx0c3ViUGF0aFBhcnNlZCA9IHRoaXMuZ2V0VmFsdWVCeVBhdGgoIHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgc3ViUGF0aCk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGkrKztcblx0XHRcdGlmIChpID4gTUFYX0RFRVApe1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRnZXQocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0c3dpdGNoIChwYXRoKXtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9PQkpFQ1Q6IHJldHVybiBpdGVtO1xuXHRcdFx0Y2FzZSBQQVRIX1NUQVJUX0hFTFBFUlM6IHJldHVybiBoZWxwZXJzO1xuXHRcdH1cblx0XHRwYXRoID0gdGhpcy5wYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0VmFsdWVCeVBhdGgocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUyk+LTE/aGVscGVyczppdGVtLCBwYXRoKTtcblx0fVxuXG5cdHNldChwYXRoLCBpdGVtLCBoZWxwZXJzLCBhdHRyVmFsdWUpe1xuXHRcdGxldCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkLCBpID0gMDtcblx0XHR3aGlsZShzdWJQYXRoID0gdGhpcy5maW5kTmV4dFN1YlBhdGgocGF0aCkpe1xuXHRcdFx0c3ViUGF0aFBhcnNlZCA9IHRoaXMuZ2V0VmFsdWVCeVBhdGgoIHN1YlBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgc3ViUGF0aCk7XG5cdFx0XHRwYXRoID0gdGhpcy5yZXBsYWNlU3ViUGF0aChwYXRoLCBzdWJQYXRoLCBzdWJQYXRoUGFyc2VkKTtcblx0XHRcdGlmIChpID4gTUFYX0RFRVApe1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRWYWx1ZUJ5UGF0aChpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdGlmIChpdGVtLmlzUmVjb3JkICYmIHRoaXMubm9ybWlsaXplUGF0aChwYXRoKS5sZW5ndGggPiAxKSB7XG5cdFx0XHRpdGVtLnRyaWdnZXIoJ2NoYW5nZScsIGl0ZW0sIHBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fVxuXHR9XG5cblxuXG5cdHBhcnNlUGF0aFN0ZXAoc3RlcCwgaXRlbSwgaGVscGVyKXtcblx0XHRsZXQgclN0ZXAgPSBudWxsO1xuXHRcdGlmKHN0ZXAuaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpID09PSAwICYmIGhlbHBlcil7XG5cdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX0hFTFBFUlMsICcnKTtcblx0XHRcdGlmKHJTdGVwLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKSA9PT0gclN0ZXAubGVuZ3RoLTIpe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0aWYoaGVscGVyLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBoZWxwZXJbclN0ZXBdO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA9PT0gMCAmJiBpdGVtKXtcblx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsICcnKTtcblx0XHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdFx0clN0ZXAgPSBzdGVwLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0XHRcdFx0aWYoaXRlbS5oYXNPd25Qcm9wZXJ0eShyU3RlcCkpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW1bclN0ZXBdKGl0ZW0sIHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHN0ZXA7XG5cdH1cblxuXHQvLzo6ZmllbGROYW1lLnJlc3VsdFxuXHQvL3t9XG5cdC8ve2ZpZWxkTmFtZTogJ3RhcmdldFJlY29yZEZpZWxkJ31cblx0Ly8vL1sndGFyZ2V0UmVjb3JkRmllbGQnLCAncmVzdWx0J11cblx0cGFyc2VQYXRoKHBhdGgsIGl0ZW0sIGhlbHBlcil7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHBhdGggPSBwYXRoLnNwbGl0KFBBVEhfU1BMSVQpO1xuXHRcdH1cblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKyl7XG5cdFx0XHRwYXRoW2ldID0gdGhpcy5wYXJzZVBhdGhTdGVwKHBhdGhbaV0sIGl0ZW0sIGhlbHBlcik7XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0bm9ybWlsaXplUGF0aChwYXRoKXtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShwYXRoKSl7XG5cdFx0XHRyZXR1cm4gcGF0aDtcblx0XHR9ZWxzZXtcblx0XHRcdHdoaWxlKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX09CSkVDVCkgPiAtMSl7XG5cdFx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2UoUEFUSF9TVEFSVF9PQkpFQ1QsJycpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCl7XG5cdFx0YXR0clBhdGggPSB0aGlzLm5vcm1pbGl6ZVBhdGgoYXR0clBhdGgpO1xuXHRcdGxldCBhdHRyTmFtZSA9IGF0dHJQYXRoLnNoaWZ0KCksXG5cdFx0XHRpc0Z1bmN0aW9uID0gYXR0ck5hbWUuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpPi0xO1xuXHRcdGlmIChpc0Z1bmN0aW9uKXtcblx0XHRcdGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcgJiYgb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7XG5cdFx0XHRsZXQgbmV3T2JqID0gaXNGdW5jdGlvbj9vYmplY3RbYXR0ck5hbWVdKCk6b2JqZWN0W2F0dHJOYW1lXTtcblx0XHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0VmFsdWVCeVBhdGgobmV3T2JqLCBhdHRyUGF0aCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIG5ld09iajtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblx0c2V0VmFsdWVCeVBhdGgob2JqZWN0LCBhdHRyUGF0aCwgYXR0clZhbHVlKXtcblx0XHRhdHRyUGF0aCA9IHRoaXMubm9ybWlsaXplUGF0aChhdHRyUGF0aCk7XG5cdFx0bGV0IGF0dHJOYW1lID0gYXR0clBhdGguc2hpZnQoKTtcblx0XHRpZiAoYXR0clBhdGgubGVuZ3RoID4gMCl7XG5cdFx0XHRpZiAoIW9iamVjdC5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpe29iamVjdFthdHRyTmFtZV0gPSB7fTt9XG5cdFx0XHR0aGlzLnNldFZhbHVlQnlQYXRoKG9iamVjdFthdHRyTmFtZV0sIGF0dHJQYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1lbHNle1xuXHRcdFx0b2JqZWN0W2F0dHJOYW1lXSA9IGF0dHJWYWx1ZTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFBhdGgoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9ub3RDb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcblxuY29uc3QgXHRNRVRBX0VWRU5UUyA9IFN5bWJvbCgnZXZlbnRzJyksXG5cdFx0TUVUQV9EQVRBID0gU3ltYm9sKCdkYXRhJyksXG5cdFx0TUVUQV9XT1JLSU5HID0gU3ltYm9sKCd3b3JraW5nJyksXG5cdFx0TUVUQV9PUFRJT05TID0gU3ltYm9sKCdvcHRpb25zJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzW01FVEFfRVZFTlRTXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9EQVRBXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IHt9O1xuXHRcdHRoaXNbTUVUQV9PUFRJT05TXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0Q29tbW9uKHdoYXQsIGFyZ3Mpe1xuXHRcdHN3aXRjaChhcmdzLmxlbmd0aCl7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHQvKiBzZXQgY29sbGVjdGlvbiAqL1xuXHRcdFx0XHR3aGF0ID0gYXJnc1swXTtcblx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0Lyogc2V0IGNvbGxlY3Rpb24gZWxlbWVudCAqL1xuXHRcdFx0XHRub3RQYXRoLnNldChhcmdzWzBdLyogcGF0aCAqLywgd2hhdC8qIGNvbGxlY3Rpb24gKi8sIHVuZGVmaW5lZC8qIGhlbHBlcnMgKi8sIGFyZ3NbMV0vKiB2YWx1ZSAqLyk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0Z2V0Q29tbW9uKHdoYXQsIGFyZ3Mpe1xuXHRcdHN3aXRjaChhcmdzLmxlbmd0aCl7XG5cdFx0XHQvKiBpZiB3ZSB3YW50IGdldCBkYXRhIGJ5IHBhdGggKi9cblx0XHRcdGNhc2UgMTogcmV0dXJuIG5vdFBhdGguZ2V0KGFyZ3NbMF0sIHdoYXQpO1xuXHRcdFx0LyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoIHdpdGggZGVmYXVsdCB2YWx1ZSAqL1xuXHRcdFx0Y2FzZSAyOiBsZXQgcmVzID0gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG5cdFx0XHRcdGlmIChyZXMgPT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdC8qIG5vIGRhdGEsIHJldHVybiBkZWZhdWx0IHZhbHVlICovXG5cdFx0XHRcdFx0XHRyZXR1cm4gYXJnc1sxXTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0LyogZGF0YSwgcmV0dXJuIGl0ICovXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzO1xuXHRcdFx0XHRcdH07XG5cdFx0XHQvKiByZXR1cm4gZnVsbCBjb2xsZWN0aW9uICovXG5cdFx0XHRkZWZhdWx0OiByZXR1cm4gd2hhdDtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdENPUkUgT0JKRUNUXG5cdFx0XHREQVRBIC0gaW5mb3JtYXRpb25cblx0XHRcdE9QVElPTlMgLSBob3cgdG8gd29ya1xuXHRcdFx0V09SS0lORyAtIHRlbXBvcmFyaWx5IGdlbmVyYXRlZCBpbiBwcm9jY2Vzc1xuXHQqL1xuXG5cdHNldERhdGEoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9EQVRBXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXREYXRhKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHRcdHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG5cdH1cblxuXHRnZXREYXRhKCkge1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfREFUQV0sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRPcHRpb25zKCkge1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSBhcmd1bWVudHNbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0T3B0aW9ucygpLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0fVxuXG5cdGdldE9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9PUFRJT05TXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFdvcmtpbmcoKSB7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdHRoaXNbTUVUQV9XT1JLSU5HXSA9IGFyZ3VtZW50c1swXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRDb21tb24odGhpcy5nZXRXb3JraW5nKCksIGFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V29ya2luZygpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRDb21tb24odGhpc1tNRVRBX1dPUktJTkddLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Lypcblx0XHRFVkVOVFMgaGFuZGxpbmdcblx0Ki9cblxuXHRvbihldmVudE5hbWVzLCBldmVudENhbGxiYWNrcywgb25jZSkge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblx0XHRldmVudE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRub3RDb21tb24uZGVmaW5lSWZOb3RFeGlzdHModGhpc1tNRVRBX0VWRU5UU10sIG5hbWUsIFtdKTtcblx0XHRcdHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLnB1c2goe1xuXHRcdFx0XHRjYWxsYmFja3M6IGV2ZW50Q2FsbGJhY2tzLFxuXHRcdFx0XHRvbmNlOiBvbmNlLFxuXHRcdFx0XHRjb3VudDogMFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR0cmlnZ2VyKCkge1xuXHRcdGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLFxuXHRcdFx0ZXZlbnROYW1lID0gYXJncy5zaGlmdCgpO1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWUpKSB7XG5cdFx0XHRldmVudE5hbWUgPSBbZXZlbnROYW1lXTtcblx0XHR9XG5cdFx0ZXZlbnROYW1lLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0VWRU5UU10uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaCggZXZlbnQgPT4ge1xuXHRcdFx0XHRcdGlmIChldmVudC5vbmNlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9mZihuYW1lLCBldmVudC5jYWxsYmFja3MpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRldmVudC5jYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayguLi5hcmdzKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0b2ZmKGV2ZW50TmFtZXMgLyogYXJyYXkgb2YgZXZlbnQgbmFtZXMgKi8sIGV2ZW50Q2FsbGJhY2tzIC8qIGFycmF5IG9mIGNhbGxiYWNrcyAqLykge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShldmVudE5hbWVzKSkge1xuXHRcdFx0ZXZlbnROYW1lcyA9IFtldmVudE5hbWVzXTtcblx0XHR9XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuXHRcdFx0ZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuXHRcdH1cblxuXHRcdGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdGxldCB0YXJnZXRJZCA9IC0xO1xuXHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uZm9yRWFjaCgoZXZlbnQsIGkpPT4ge1xuXHRcdFx0XHRpZiAoaSA9PT0gLTEgJiYgZXZlbnRDYWxsYmFja3MgPT09IGV2ZW50LmNhbGxiYWNrcyl7XG5cdFx0XHRcdFx0dGFyZ2V0SWQgPSBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGlmICh0YXJnZXRJZCA+IC0xKXtcblx0XHRcdFx0dGhpc1tNRVRBX0VWRU5UU11bbmFtZV0uc3BsaWNlKHRhcmdldElkLCAxKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgIGZyb20gJy4vbm90QmFzZSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RJbWFnZSBleHRlbmRzIG5vdEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoKTtcblx0fVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QXBwIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBub3RDb250cm9sbGVye1xuXHRjb25zdHJ1Y3Rvcigpe1xuXG5cdH1cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5cbmNvbnN0IE1FVEFfUFJPQ0VTU09SUyA9IFN5bWJvbCgncHJvY2Vzc29ycycpO1xuXG5jbGFzcyBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZXh0ZW5kcyBub3RCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX1BST0NFU1NPUlNdID0ge307XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQcm9jZXNzb3IoLyoga2V5LCB2YWx1ZSAqLyl7XG5cdFx0dGhpcy5zZXRDb21tb24odGhpc1tNRVRBX1BST0NFU1NPUlNdLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0UHJvY2Vzc29yKC8qIGtleSwgIGRlZmF1bHRWYWx1ZSAqLyl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0fVxuXG5cdGNsZWFyUHJvY2Vzc29ycygpe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwge30pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0YWRkKCl7XG5cdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuXHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpe1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gYXJndW1lbnRzWzBdKXtcblx0XHRcdFx0XHR0aGlzLnNldFByb2Nlc3Nvcih0LCBhcmd1bWVudHNbMF1bdF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0UHJvY2Vzc29yKC4uLmFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhcigpe1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5leHBvcnQgZGVmYXVsdCBuZXcgbm90VGVtcGxhdGVQcm9jZXNzb3JzKCk7XG4iLCJpbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGguanMnO1xudmFyIG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYiA9IHtcblx0Y29udGVudDpmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0aWYgKHNjb3BlLnBhcmFtcy5pbmRleE9mKCdjYXBpdGFsaXplJykgPiAtMSl7XG5cdFx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQudG9VcHBlckNhc2UoKTtcblx0XHR9XG5cdFx0c2NvcGUuZWxlbWVudC5pbm5lckhUTUwgPSBzY29wZS5hdHRyaWJ1dGVSZXN1bHQ7XG5cdH0sXG5cdGJpbmQ6IGZ1bmN0aW9uKCl7XG5cblx0fSxcblx0dmFsdWU6IGZ1bmN0aW9uKCl7XG5cblx0fSxcblx0YXR0cjogZnVuY3Rpb24oKXtcblxuXHR9LFxuXHRjaGFuZ2U6IGZ1bmN0aW9uKCl7XG5cblx0fVxufTtcbmV4cG9ydCBkZWZhdWx0IG5vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYjtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9ub3RDb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmNvbnN0IE1FVEFfQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJyksXG5cdFRFTVBMQVRFX1RBRyA9ICdudCc7XG5cblxuY2xhc3Mgbm90VGVtcGxhdGVDYWNoZSBleHRlbmRzIG5vdEJhc2V7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfQ0FDSEVdID0ge307XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdHRoaXMuaGlkZVRlbXBsYXRlcygpO1xuXHRcdHRoaXMucmVnaXN0ZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGhpZGVUZW1wbGF0ZXMoKXtcblx0XHRsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdFx0dC5pbm5lckhUTUwgPSBURU1QTEFURV9UQUcgKyAne2Rpc3BsYXk6IG5vbmU7fSdcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHQpO1xuXHR9XG5cblx0cmVnaXN0ZXIoKSB7XG5cdFx0bm90Q29tbW9uLnJlZ2lzdGVyKCd0ZW1wbGF0ZUNhY2hlJywgdGhpcyk7XG5cdH1cblxuXHRsb2FkKG1hcCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHRmb3IgKHZhciBpIGluIG1hcCkge1xuXHRcdFx0dGhpcy5sb2FkT25lKGksIG1hcFtpXSk7XG5cdFx0fVxuXHR9XG5cblx0bG9hZE9uZShrZXksIHVybCwgY2FsbGJhY2spIHtcblxuXHRcdHZhciBvUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdG9SZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgdXJsKTtcblx0XHRvUmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbihyZXNwb25zZSkge1xuXHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVOYW1lID0ga2V5O1xuXHRcdFx0ZGl2LmRhdGFzZXQubm90VGVtcGxhdGVVUkwgPSB1cmw7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gcmVzcG9uc2Uuc3JjRWxlbWVudC5yZXNwb25zZVRleHQ7XG5cdFx0XHR0aGlzLnNldE9uZShrZXksIGRpdik7XG5cdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjayhrZXksIHVybCwgZGl2KTtcblxuXHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0b1JlcXVlc3Quc2VuZCgpO1xuXHR9XG5cblx0aWZBbGxMb2FkZWQoKXtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xuXHRcdH1cblx0fVxuXG5cdHNldE9uZShrZXksIGVsZW1lbnQpIHtcblx0XHR0aGlzW01FVEFfQ0FDSEVdW2tleV0gPSBlbGVtZW50O1xuXHR9XG5cblx0Z2V0KGtleSkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfQ0FDSEVdLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzW01FVEFfQ0FDSEVdW2tleV0uY2xvbmVOb2RlKHRydWUpIDogbnVsbDtcblx0fVxuXG5cdGdldE5hbWVzKCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbTUVUQV9DQUNIRV0pO1xuXHR9XG5cblx0Z2V0QnlVUkwodXJsKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzW01FVEFfQ0FDSEVdKSB7XG5cdFx0XHRpZiAodGhpc1tNRVRBX0NBQ0hFXVtpXS5zcmMgPT0gdXJsKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldChpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0Ly9cdE5ldyBBUElcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRzZXRMb2FkZWQoa2V5KXtcblx0XHRsZXQgdCA9IHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmluZGV4T2Yoa2V5KTtcblx0XHRpZiAodCA+IC0xKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5zcGxpY2UodCwgMSk7XG5cdFx0fVxuXHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGVkJykucHVzaCgna2V5Jyk7XG5cdH1cblxuXHR3cmFwKGtleSwgdXJsLCBpbm5lckhUTUwpe1xuXHRcdHZhciBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChURU1QTEFURV9UQUcpO1xuXHRcdGNvbnQubmFtZSA9IGtleTtcblx0XHRjb250LnNyYyA9IHVybDtcblx0XHRjb250LmlubmVySFRNTCA9IGlubmVySFRNTDtcblx0XHRyZXR1cm4gY29udDtcblx0fVxuXG5cdHBhcnNlTGliKHRleHQpe1xuXHRcdGxldCBjb250ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0bGV0IHJlc3VsdCA9IHt9O1xuXHRcdGNvbnQuaW5uZXJIVE1MID0gdGV4dDtcblx0XHRsZXQgbm90VGVtcGxhdGVzRWxlbWVudHMgPSBjb250LnF1ZXJ5U2VsZWN0b3JBbGwoVEVNUExBVEVfVEFHKTtcblx0XHRmb3IobGV0IGVsIG9mIGNvbnQuY2hpbGRyZW4pe1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUgPT09IGNvbnQpe1xuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRcdFx0cmVzdWx0W2VsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZV0gPSBlbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0YWRkTGliKGxpYil7XG5cdFx0Zm9yKGxldCB0IGluIGxpYil7XG5cdFx0XHR0aGlzLnNldE9uZSh0LCBsaWJbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21VUkwoa2V5LCB1cmwpIHtcblx0XHRsZXQgdGhhdCA9IHRoaXM7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXHRcdFx0aWYgKHRoYXQuZ2V0KGtleSkpe1xuXHRcdFx0XHRyZXNvbHZlKHRoYXQuZ2V0KGtleSkpO1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdC8vdGhhdC5zZXRMb2FkaW5nKGtleSwgdXJsKTtcblx0XHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKS50aGVuKGZ1bmN0aW9uKHRlbXBsYXRlSW5uZXJIVE1MKXtcblx0XHRcdFx0XHRsZXQgdGVtcGxhdGVDb250RWwgPSB0aGF0LndyYXAoa2V5LCB1cmwsIHRlbXBsYXRlSW5uZXJIVE1MKTtcblx0XHRcdFx0XHR0aGF0LnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRcdFx0XHRyZXNvbHZlKHRlbXBsYXRlQ29udEVsKTtcblx0XHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24oaHR0cEVycm9yLCByZXNwb25zZSl7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZScsIGtleSwgdXJsKTtcblx0XHRcdFx0XHRyZWplY3QoLi4uYXJndW1lbnRzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRMaWJGcm9tVVJMKHVybCkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpLnRoZW4oZnVuY3Rpb24odGVtcGxhdGVzSFRNTCl7XG5cblx0XHRcdFx0bGV0IHRlbXBsYXRlcyA9IHRoYXQucGFyc2VMaWIodGVtcGxhdGVzSFRNTCk7XG5cdFx0XHRcdHRoYXQuYWRkTGliKHRlbXBsYXRlcyk7XG5cdFx0XHRcdHJlc29sdmUodGVtcGxhdGVzKTtcblxuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24oaHR0cEVycm9yLCByZXNwb25zZSl7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ2Vycm9yIGxvYWRpbmcgdGVtcGxhdGVzIGxpYicsIHVybCk7XG5cdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRGcm9tRG9jdW1lbnQoc2VsZWN0b3JPckVsZW1lbnQpe1xuXHRcdGxldCBlbCA9ICh0eXBlb2Ygc2VsZWN0b3JPckVsZW1lbnQgPT09ICdzdHJpbmcnKT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JFbGVtZW50KTpzZWxlY3Rvck9yRWxlbWVudDtcblx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBURU1QTEFURV9UQUcudG9Mb3dlckNhc2UoKSl7XG5cdFx0XHRcdHRoaXMuc2V0T25lKGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSwgZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21UZXh0KGtleSwgdGVtcGxhdGVJbm5lckhUTUwpe1xuXHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksICcnLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlQ2FjaGUoKTtcbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi9ub3RDb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFRlbXBsYXRlUHJvY2Vzc29ycyBmcm9tICcuL25vdFRlbXBsYXRlUHJvY2Vzc29ycyc7XG5cblxuY29uc3QgT1BUX1BST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCA9ICduLScsXG5cdE9QVF9QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgPSAnLScsXG5cdE9QVF9QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCA9ICdpZicsXG5cdE9QVF9BVFRSSUJVVEVfRVhQUkVTU0lPTl9JVEVNX1BSRUZJWCA9ICc6Jyxcblx0T1BUX0FUVFJJQlVURV9FWFBSRVNTSU9OX0hFTFBFUlNfUFJFRklYID0gJzo6Jyxcblx0T1BUX0FUVFJJQlVURV9FWFBSRVNTSU9OX0ZVTkNUSU9OX1BPU1RGSVggPSAnKCknLFxuXHRPUFRfQVRUUklCVVRFX0VYUFJFU1NJT05fREVGQVVMVF9SRVNVTFQgPSAnJztcblxuLypcbiAqINCY0YHQv9C+0LvRjNC30YPQtdGCIERPTSDQv9C+0LTQtNC10YDQtdCy0L4g0LIg0LrQsNGH0LXRgdGC0LLQtSDRiNCw0LHQu9C+0L3QsC5cbiAqINCX0LDQv9C+0LvQvdGP0LXRgiDQtdCz0L4g0LTQsNC90L3Ri9C80LguXG4gKiDQktC+0LfQstGA0LDRidCw0LXRgiDRgdCz0LXQvdC10YDQuNGA0L7QstCw0L3QvdGL0LUg0Y3Qu9C10LzQtdC90YLRi1xuICpcbiAqICovXG5cbi8qXG5cblx0PGRpdiBuLXRlbXBsYXRlLW5hbWU9XCJ2YXN5YVwiPlxuXHRcdDxwPjxpbnB1dCB0eXBlPVwidGV4dFwiIG4tdmFsdWU9XCI6Y29vbE5hbWVcIi8+PC9wPlxuXHRcdDxwPtCR0L7RgNC40YEg0YXRgNC10L0g0L/QvtC/0LDQtNC10YjRjCDQuCB7ezpjb29sTmFtZX19LjwvcD5cblx0PC9kaXY+XG5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RUZW1wbGF0ZSBleHRlbmRzIG5vdEJhc2Uge1xuXHQvKlxuXHRcdGlucHV0ID0ge1xuXHRcdFx0ZGF0YTogbm90UmVjb3JkIG9yIFtub3RSZWNvcmRdLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0aHRtbDogaHRtbChzdHJpbmcpLCBcdFx0Ly/RgtC10LrRgdGCINGBIGh0bWwg0LrQvtC00L7QvCDRiNCw0LHQu9C+0L3QsFxuXHRcdFx0XHRlbDogSFRNTEVsZW1lbnQob2JqZWN0KSwgXHQvL0RPTSDRjdC70LXQvNC10L3RglxuXHRcdFx0XHR1cmw6IHVybChzdHJpbmcpLFx0XHRcdC8v0YHRgdGL0LvQutCwINC90LAg0YTQsNC50Lsg0YEg0YjQsNCx0LvQvtC90L7QvFxuXHRcdFx0XHRuYW1lOiBuYW1lKHN0cmluZylcdFx0XHQvL9C90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAg0LTQu9GPINC/0L7QuNGB0LrQsCDQsiDQutGN0YjQtSBub3RUZW1wbGF0ZUNhY2hlXG5cdFx0XHR9XG5cdFx0XHRvcHRpb25zOntcblx0XHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHRcdC8vINC10YHQu9C4INC30LDQtNCw0YLRjCwg0YLQviDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQsdGD0LTQtdGCINC+0YLRgNC10L3QtNC10YDQtdC90L4g0YHRjtC00LBcblx0XHRcdFx0dGFyZ2V0RWw6IEhUTUxFbGVtZW50KG9iamVjdCkg0LjQu9C4IGh0bWwgc2VsZWN0b3IgKHN0cmluZylcblx0XHRcdFx0Ly/QsCDRjdGC0L4g0LrQsNC6INCx0YPQtNC10Lwg0L/QvtC80LXRidCw0YLRjCDRgNC10LfRg9C70YzRgtCw0YIg0YDQtdC90LTQtdGA0LjQvdCz0LBcblx0XHRcdFx0cmVuZGVyQW5kOiBwbGFjZVN0eWxlKHN0cmluZykg0L7QtNC40L0g0LjQtyDQstCw0YDQuNCw0L3RgtC+0LJcblx0XHRcdFx0XHRcdHBsYWNlXHRcdC1cdNC/0L7QvNC10YnQsNC10Lwg0LLQvdGD0YLRgNC4INGG0LXQu9C10LLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsFxuXHRcdFx0XHRcdFx0cmVwbGFjZVx0XHQtXHTQt9Cw0LzQtdC90Y/QtdC8XG5cdFx0XHRcdFx0XHRwbGFjZUFmdGVyXHQtXHTQv9C+0YHQu9C1XG5cdFx0XHRcdFx0XHRwbGFjZUJlZm9yZVx0LVx00LTQvlxuXHRcdFx0XHRcdFx0cGxhY2VGaXJzdFx0LVx00LLQvdGD0YLRgNC4INC/0LXRgNCy0YvQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0XHRcdFx0XHRwbGFjZUxhc3RcdC1cdNCy0L3Rg9GC0YDQuCDQv9C+0YHQu9C10LTQvdC40Lwg0LTQvtGH0LXRgNC90LjQvFxuXHRcdFx0fVxuXHRcdH1cblx0Ki9cblxuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLmluaXREYXRhKGlucHV0LmRhdGEgPyBpbnB1dC5kYXRhIDoge30pO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dCk7XG5cdFx0dGhpcy5wcmVwYXJlVGVtcGxhdGVFbGVtZW50KGlucHV0LnRlbXBsYXRlID8gaW5wdXQudGVtcGxhdGUgOiBudWxsKTtcblxuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0fVxuXG5cdGluaXRXb3JraW5nKHZhbCkge1xuXHRcdHRoaXMudW5zZXRSZWFkeSgpO1xuXHR9XG5cblx0cHJlcGFyZVRlbXBsYXRlRWxlbWVudCh2YWwpIHtcblx0XHRpZiAoIXZhbCkge1xuXHRcdFx0dGhpcy51bnNldFJlYWR5KCk7XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnaHRtbCcpICYmIHZhbC5odG1sKSB7XG5cdFx0XHRcdHRoaXMuc2V0TG9jYWxUZW1wbGF0ZUVsZW1lbnQobm90VGVtcGxhdGVDYWNoZS53cmFwKCcnLCAnJywgdmFsLmh0bWwpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnZWwnKSAmJiB2YWwuZWwpIHtcblx0XHRcdFx0dGhpcy5zZXRMb2NhbFRlbXBsYXRlRWxlbWVudCh2YWwuZWwuY2xvbmVOb2RlKHRydWUpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgndXJsJykgJiYgdmFsLnVybCkge1xuXHRcdFx0XHRub3RUZW1wbGF0ZUNhY2hlLmdldEZyb21VUkwodmFsLnVybCwgdmFsLnVybClcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbih0ZW1wbGF0ZUNvbnRFbGVtZW50KSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldExvY2FsVGVtcGxhdGVFbGVtZW50KHRlbXBsYXRlQ29udEVsZW1lbnQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodmFsLmhhc093blByb3BlcnR5KCduYW1lJykgJiYgdmFsLm5hbWUpIHtcblx0XHRcdFx0dGhpcy5zZXRMb2NhbFRlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLmdldCh2YWwubmFtZSkpO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHR9XG5cblx0c2V0TG9jYWxUZW1wbGF0ZUVsZW1lbnQoY29udCkge1xuXHRcdGlmIChjb250KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3RlbXBsYXRlRWxlbWVudCcsIGNvbnQpO1xuXHRcdFx0Y29uc29sZS5pbmZvKCd0ZW1wbGF0ZUVsZW1lbnQgcmVhZHknLCBjb250KTtcblx0XHRcdHRoaXMudHJpZ2dlcigncmVhZHknKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5lcnJvcignV3JvbmcgdGVtcGxhdGUgY29udGFpbmVyIGVsZW1lbnQnKTtcblx0XHR9XG5cdH1cblxuXG5cdGdldExvY2FsVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0c2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIHRydWUpO1xuXHR9XG5cblx0dW5zZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgZmFsc2UpO1xuXHR9XG5cblx0aXNSZWFkeSgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdyZWFkeScpO1xuXHR9XG5cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0TG9jYWxUZW1wbGF0ZUVsZW1lbnQoKSkge1xuXHRcdFx0dGhpcy5jcmVhdGVNYXBwaW5nSWZOb3RFeGlzdHMoKTtcblx0XHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCksMCk7XG5cdFx0XHR0aGlzLmdldERhdGEoKS5vbignY2hhbmdlJywgZnVuY3Rpb24ocHJveHksIGtleSwgdmFsdWUpe1xuXHRcdFx0XHRjb25zb2xlLmxvZygndXBkYXRpbmcgdGVtcGxhdGUgYWZ0ZXIgY2hhbmdlcycsIHByb3h5LCBrZXksIHZhbHVlKTtcblx0XHRcdFx0dGhpcy5leGVjUHJvY2Vzc29ycyhwcm94eSwgMCk7XG5cdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0dGhpcy5wbGFjZVJlbmRlcmVkKCk7XG5cdFx0fVxuXHR9XG5cblx0cGxhY2VyKG1ldGhvZCl7XG5cdFx0Y29uc29sZS5sb2coJ3NlYXJjaGluZyBmb3IgcGxhY2VyJywgbWV0aG9kKTtcblx0XHRsZXQgdCA9IHtcblx0XHRcdHBsYWNlOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpe1xuXHRcdFx0XHR3aGlsZSh0YXJnZXRFbC5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHRcdHRhcmdldEVsLnJlbW92ZUNoaWxkKHRhcmdldEVsLmNoaWxkcmVuWzBdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkLmNoaWxkcmVuW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHJlcGxhY2U6IGZ1bmN0aW9uKCl7fSxcblx0XHRcdHBsYWNlQWZ0ZXI6IGZ1bmN0aW9uKCl7fSxcblx0XHRcdHBsYWNlQmVmb3JlOiBmdW5jdGlvbigpe30sXG5cdFx0XHRwbGFjZUZpcnN0OiBmdW5jdGlvbigpe30sXG5cdFx0XHRwbGFjZUxhc3Q6IGZ1bmN0aW9uKCl7fVxuXHRcdH07XG5cdFx0aWYgKHQuaGFzT3duUHJvcGVydHkobWV0aG9kKSl7XG5cdFx0XHRyZXR1cm4gdFttZXRob2RdO1xuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHQucGxhY2U7XG5cdFx0fVxuXHR9XG5cblx0cGxhY2VSZW5kZXJlZCgpe1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpe1xuXHRcdFx0bGV0IHBsYWNlciA9IHRoaXMucGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0cGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSwgdGhpcy5nZXRMb2NhbFRlbXBsYXRlRWxlbWVudCgpKTtcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ25vIHRhcmdldCBlbGVtZW50Jyk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdH1cblxuXHQvKiBjb3JlIHJlbmRlcmluZyAqL1xuXG5cdGNyZWF0ZU1hcHBpbmdJZk5vdEV4aXN0cygpIHtcblx0XHRpZiAoIXRoaXMuZ2V0V29ya2luZygnbWFwcGluZycpKSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ21hcHBpbmcnLCB0aGlzLmNyZWF0ZU1hcHBpbmcoKSk7XG5cdFx0fVxuXHR9XG5cblx0LypcblxuXHTQodC+0LfQtNCw0LXQvCDQutCw0YDRgtGLINGB0L7QvtGC0LLQtdGB0YLQstC40Y8g0L/RgNC+0YbQtdGB0YHQvtGA0L7Qsiwg0L/Rg9GC0LXQuSDQtNCw0L3QvdGL0YUg0LIg0L7QsdGK0LXQutGC0LUg0Lgg0Y3Qu9C10LzQtdC90YLQvtCyINGI0LDQsdC70L7QvdCwLlxuXHRbe1xuXHRcdGVsLFxuXHRcdHByb2Nlc3Nvcixcblx0XHR3b3JraW5nLFxuXHRcdGl0ZW0ucHJvcGVydHkucGF0aFxuXHR9XVxuXG5cdCovXG5cblx0Y3JlYXRlTWFwcGluZygpIHtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5maW5kQWxsUHJvY2Vzc29ycygpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmaW5kQWxsUHJvY2Vzc29ycygpIHtcblx0XHRsZXQgcHJvY3MgPSBbXSwgZWxzID0gbm90Q29tbW9uLmdldEF0dHJpYnV0ZXNTdGFydHNXaXRoKHRoaXMuZ2V0TG9jYWxUZW1wbGF0ZUVsZW1lbnQoKSwgT1BUX1BST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCk7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBhdHRzID0gZWxzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKE9QVF9QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgpID09PSAwKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coYXR0c1tpXSk7XG5cdFx0XHRcdFx0bGV0IHByb2NEYXRhID0gdGhpcy5wYXJzZVByb2Nlc3NvckV4cHJlc3Npb24oYXR0c1tpXS5ub2RlTmFtZSk7XG5cdFx0XHRcdFx0cHJvY0RhdGEuZWxlbWVudCA9IGVsc1tqXTtcblx0XHRcdFx0XHRwcm9jRGF0YS5wcm9jZXNzb3JFeHByZXNzaW9uID0gYXR0c1tpXS5ub2RlTmFtZTtcblx0XHRcdFx0XHRwcm9jRGF0YS5hdHRyaWJ1dGVFeHByZXNzaW9uID0gYXR0c1tpXS52YWx1ZTtcblx0XHRcdFx0XHRwcm9jcy5wdXNoKHByb2NEYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcHJvY3M7XG5cdH1cblxuXHRwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24ocHJvY2Vzc29yRXhwcmVzc2lvbikge1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRwYXJhbXM6IFtdLFxuXHRcdFx0cHJvY2Vzc29yTmFtZTogJycsXG5cdFx0XHRpZkNvbmRpdGlvbjogZmFsc2Vcblx0XHR9O1xuXHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUX1BST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCwgJycpO1xuXHRcdGlmIChwcm9jZXNzb3JFeHByZXNzaW9uLmluZGV4T2YoT1BUX1BST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYKSA9PT0gKHByb2Nlc3NvckV4cHJlc3Npb24ubGVuZ3RoIC0gT1BUX1BST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLmxlbmd0aCkpIHtcblx0XHRcdHJlc3VsdC5pZkNvbmRpdGlvbiA9IHRydWU7XG5cdFx0XHRwcm9jZXNzb3JFeHByZXNzaW9uID0gcHJvY2Vzc29yRXhwcmVzc2lvbi5yZXBsYWNlKE9QVF9QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgKyBPUFRfUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsICcnKTtcblx0XHR9XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHByb2Nlc3NvckV4cHJlc3Npb24uc3BsaXQoT1BUX1BST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUik7XG5cdFx0cmVzdWx0LnByb2Nlc3Nvck5hbWUgPSByZXN1bHQucGFyYW1zWzBdO1xuXHRcdHJlc3VsdC5wYXJhbXMgPSByZXN1bHQucGFyYW1zLnNsaWNlKDEpO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRleGVjUHJvY2Vzc29ycyhpdGVtLCBpbmRleCl7XG5cdFx0Y29uc29sZS5sb2coJ2V4ZWMgcHJvY2Nlc3NvcnMgb24gY3VycmVudCcpO1xuXHRcdGxldCBtYXBwaW5nID0gdGhpcy5nZXRXb3JraW5nKCdtYXBwaW5nJyk7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcHJvY1Njb3BlID0gbWFwcGluZ1tpXTtcblx0XHRcdHByb2NTY29wZS5hdHRyaWJ1dGVSZXN1bHQgPSB0aGlzLmdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocHJvY1Njb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGluZGV4KTtcblx0XHRcdGNvbnNvbGUubG9nKCdhdHRyaWJ1dGVSZXN1bHQnLCBwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0XHRcdGxldCBwcm9jTmFtZSA9IHByb2NTY29wZS5wcm9jZXNzb3JOYW1lLFxuXHRcdFx0XHRwcm9jID0gbm90VGVtcGxhdGVQcm9jZXNzb3JzLmdldChwcm9jTmFtZSk7XG5cdFx0XHRpZiAocHJvYykge1xuXHRcdFx0XHRwcm9jKHByb2NTY29wZSwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0XHRcdFx0cHJvY1Njb3BlLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb2NTY29wZS5wcm9jZXNzb3JFeHByZXNzaW9uKTtcblx0XHRcdH1cblx0XHR9XG5cblx0fVxuXG5cdGdldEF0dHJpYnV0ZUV4cHJlc3Npb25SZXN1bHQocGF0aCwgaXRlbSwgaW5kZXgpIHtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQocGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0fVxuXG5cdC8qIHNpbXBsZSB1dGlsaXR5IG1ldGhvZHMqL1xuXG5cdGhpZGUoKSB7XG5cblx0fVxuXG5cdHNob3coKSB7XG5cblx0fVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcblxuY29uc3QgTUVUQV9QQVJUUyA9IFN5bWJvbCgncGFydHMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90Q29tcG9uZW50IGV4dGVuZHMgbm90QmFzZXtcblxuXHRjb25zdHJ1Y3RvcihkYXRhLCBvcHRpb25zKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuc2V0RGF0YShkYXRhKTtcblx0XHR0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXSA9IHt9O1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRQYXJ0cygpe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QQVJUU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRnZXRQYXJ0cygpe1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfUEFSVFNdLCBhcmd1bWVudHMpO1xuXHR9XG5cblx0Lypcblx0XHRSZW5kZXJpbmdcblx0Ki9cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLnRyaWdnZXIoJ2JlZm9yZVJlbmRlcicpO1xuXHRcdGxldCBhbmNob3JzID0gdGhpcy5jb2xsZWN0QW5jaG9ycygpO1xuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG5cdC8qXG5cdFx0UHJlc2VudGF0aW9uIGNvbnRyb2xcblx0Ki9cblxuXHR1cGRhdGUoKXtcblxuXHR9XG5cblx0c2hvdygpe1xuXG5cdH1cblxuXHRoaWRlKCl7XG5cblx0fVxuXG5cdHJlbW92ZSgpe1xuXG5cdH1cblxuXHRyZXBsYWNlKCl7XG5cblx0fVxuXG5cdGFkZFBhcnQoY29tcG9uZW50LCBhbmNob3Ipe1xuXHRcdHRoaXMudHJpZ2dlcignYmVmb3JlQWRkUGFydCcsIC4uLmFyZ3VtZW50cyk7XG5cdFx0bGV0IHBhcnRzQXRBbmNob3IgPSB0aGlzLmdldFBhcnRzKGFuY2hvcik7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHBhcnRzQXRBbmNob3IpKXtcblx0XHRcdHBhcnRzQXRBbmNob3IgPSBbXTtcblx0XHR9XG5cdFx0cGFydHNBdEFuY2hvci5wdXNoKGNvbXBvbmVudCk7XG5cdFx0dGhpcy5zZXRQYXJ0cyhhbmNob3IsIHBhcnRzQXRBbmNob3IpO1xuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJBZGRQYXJ0JywgLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8qXG5cdFx0ZGlyZWN0aW9uID4gMCBmb3IgbW92aW5nIGRvd247XG5cdFx0ZGlyZWN0aW9uIDwgMCAgZm9yIG1vdmluZyB1cDtcblx0XHRkaXJlY3Rpb24gPSAnZmlyc3QnIGZvciBtb3ZpbmcgdG8gdGhlIHN0YXJ0IG9mIGFycmF5O1xuXHRcdGRpcmVjdGlvbiA9ICdsYXN0JyBmb3IgbW92aW5nIHRvIHRoZSBlbmQgb2YgYXJyYXk7XG5cdCovXG5cblx0bW92ZVBhcnQoY29tcG9uZW50LCBhbmNob3IsIGRpcmVjdGlvbil7XG5cdFx0dGhpcy50cmlnZ2VyKCdiZWZvcmVNb3ZlUGFydCcsIC4uLmFyZ3VtZW50cyk7XG5cdFx0bGV0IHBhcnRzQXRBbmNob3IgPSB0aGlzLmdldFBhcnRzKGFuY2hvcik7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkocGFydHNBdEFuY2hvcikgJiYgcGFydHNBdEFuY2hvci5pbmNsdWRlcyhjb21wb25lbnQpKXtcblx0XHRcdGxldCBmaXJzdCA9IDAsXG5cdFx0XHRcdGxhc3QgPSBwYXJ0c0F0QW5jaG9yLmxlbmd0aCAtIDEsXG5cdFx0XHRcdGZyb21Qb3MgPSBwYXJ0c0F0QW5jaG9yLmluZGV4T2YoY29tcG9uZW50KSxcblx0XHRcdFx0dG9Qb3M7XG5cdFx0XHRzd2l0Y2goZGlyZWN0aW9uKXtcblx0XHRcdFx0Y2FzZSAnZmlyc3QnOiBcdHRvUG9zID0gZmlyc3Q7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdsYXN0JzogXHR0b1BvcyA9IGxhc3Q7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHRvUG9zID0gZnJvbVBvcyArIGRpcmVjdGlvbjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRvUG9zID4gbGFzdCl7XG5cdFx0XHRcdHRvUG9zID0gbGFzdDtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0aWYgKHRvUG9zIDwgZmlyc3Qpe1xuXHRcdFx0XHRcdHRvUG9zID0gZmlyc3Q7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bm90Q29tbW9uLm1vdmVFbGVtZW50SW5BcnJheShwYXJ0c0F0QW5jaG9yLCBmcm9tUG9zLCB0b1Bvcyk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0UGFydHMoYW5jaG9yLCBwYXJ0c0F0QW5jaG9yKTtcblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyTW92ZVBhcnQnLCAuLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVtb3ZlUGFydChjb21wb25lbnQsIGFuY2hvcil7XG5cdFx0dGhpcy50cmlnZ2VyKCdiZWZvcmVSZW1vdmVQYXJ0JywgLi4uYXJndW1lbnRzKTtcblx0XHRsZXQgcGFydHNBdEFuY2hvciA9IHRoaXMuZ2V0UGFydHMoYW5jaG9yKTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShwYXJ0c0F0QW5jaG9yKSAmJiBwYXJ0c0F0QW5jaG9yLmluY2x1ZGVzKGNvbXBvbmVudCkpe1xuXHRcdFx0cGFydHNBdEFuY2hvci5zcGxpY2UocGFydHNBdEFuY2hvci5pbmRleE9mKGNvbXBvbmVudCksIDEpO1xuXHRcdH1cblx0XHR0aGlzLnNldFBhcnRzKGFuY2hvciwgcGFydHNBdEFuY2hvcik7XG5cdFx0dGhpcy50cmlnZ2VyKCdhZnRlclJlbW92ZVBhcnQnLCAuLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG59XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQgIG5vdENvbXBvbmVudCAgZnJvbSAnLi9ub3RDb21wb25lbnQnO1xuY29uc3QgXHRNRVRBX1dPUktJTkcgPSBTeW1ib2woJ3dvcmtpbmcnKSxcblx0XHRNRVRBX09QVElPTlMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90Rm9ybSBleHRlbmRzIG5vdENvbXBvbmVudHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucyl7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzW01FVEFfV09SS0lOR10gPSB7fTtcblx0XHR0aGlzW01FVEFfT1BUSU9OU10gPSB7fTtcblx0XHR0aGlzLm9uKCdzdWJtaXQnLCB0aGlzLm9uU3VibWl0KTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldCk7XG5cdFx0dGhpcy5vbignY2FuY2VsJywgdGhpcy5vbkNhbmNlbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvKlxuXHRcdFJlbmRlcmluZ1xuXHQqL1xuXG5cdHJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHRcdHRoaXMucmVuZGVyQ29tcG9uZW50cygpO1xuXHR9XG5cblx0cmVuZGVyV3JhcHBlcigpe1xuXG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCl7XG5cblx0fVxuXG5cdC8qXG5cdFx0RGF0YSBtYW5hZ2VtZW50XG5cdCovXG5cblx0Y29sbGVjdERhdGEoKXtcblxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCl7XG5cblx0fVxuXG5cdG9uUmVzZXQoKXtcblxuXHR9XG5cblx0b25DYW5jZWwoKXtcblxuXHR9XG59XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50ICBmcm9tICcuL25vdENvbXBvbmVudCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RUYWJsZSBleHRlbmRzIG5vdENvbXBvbmVudHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50ICBmcm9tICcuL25vdENvbXBvbmVudCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RWaWV3IGV4dGVuZHMgbm90Q29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKCk7XG5cdH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcblxuY29uc3QgXHRERUZBVUxUX1JFQ09SRF9JRF9GSUVMRF9OQU1FID0gJ19pZCcsXG5cdFx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdFx0REVGQVVMVF9QQUdFX1NJWkUgPSAxMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90SW50ZXJmYWNlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGV4dGVuZE9iamVjdChvYmoxLCBvYmoyKSB7XG5cdFx0dmFyIGF0dHJOYW1lID0gJyc7XG5cdFx0Zm9yIChhdHRyTmFtZSBpbiBvYmoyKSB7XG5cdFx0XHRpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpIHtcblx0XHRcdFx0b2JqMVthdHRyTmFtZV0gPSBvYmoyW2F0dHJOYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG9iajE7XG5cdH1cblxuXHRwYXJzZUxpbmUobGluZSwgcmVjb3JkLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIHJlY29yZFJFID0gJzpyZWNvcmRbJyxcblx0XHRcdGZpZWxkTmFtZSA9ICcnO1xuXHRcdHdoaWxlIChsaW5lLmluZGV4T2YocmVjb3JkUkUpID4gLTEpIHtcblx0XHRcdHZhciBpbmQgPSBsaW5lLmluZGV4T2YocmVjb3JkUkUpO1xuXHRcdFx0dmFyIGxlbiA9IHJlY29yZFJFLmxlbmd0aDtcblx0XHRcdHZhciBpbmQyID0gbGluZS5pbmRleE9mKCddJyk7XG5cdFx0XHR2YXIgc3RhcnRTbGljZSA9IGluZCArIGxlbjtcblx0XHRcdHZhciBlbmRTbGljZSA9IGluZDI7XG5cdFx0XHRmaWVsZE5hbWUgPSBsaW5lLnNsaWNlKHN0YXJ0U2xpY2UsIGVuZFNsaWNlKTtcblx0XHRcdGlmIChmaWVsZE5hbWUgPT0gJycpIGJyZWFrO1xuXHRcdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOnJlY29yZFsnICsgZmllbGROYW1lICsgJ10nLCByZWNvcmQuZ2V0QXR0cihmaWVsZE5hbWUpKTtcblx0XHR9XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOm1vZGVsTmFtZScsIHRoaXMubWFuaWZlc3QubW9kZWwpO1xuXHRcdGxpbmUgPSBsaW5lLnJlcGxhY2UoJzphY3Rpb25OYW1lJywgYWN0aW9uTmFtZSk7XG5cdFx0cmV0dXJuIGxpbmU7XG5cdH1cblxuXHRnZXRVUkwocmVjb3JkLCBhY3Rpb25EYXRhLCBhY3Rpb25OYW1lKSB7XG5cdFx0dmFyIGxpbmUgPSB0aGlzLnBhcnNlTGluZSh0aGlzLm1hbmlmZXN0LnVybCwgcmVjb3JkLCBhY3Rpb25OYW1lKSArICgoYWN0aW9uRGF0YS5oYXNPd25Qcm9wZXJ0eSgncG9zdEZpeCcpKSA/IHRoaXMucGFyc2VMaW5lKGFjdGlvbkRhdGEucG9zdEZpeCwgcmVjb3JkLCBhY3Rpb25OYW1lKSA6ICcnKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldEFjdGlvbnNDb3VudCgpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdC5hY3Rpb25zID8gT2JqZWN0LmtleXModGhpcy5tYW5pZmVzdC5hY3Rpb25zKS5sZW5ndGggOiAwO1xuXHR9XG5cblx0Z2V0QWN0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdC5hY3Rpb25zO1xuXHR9XG5cblx0c2V0RmluZEJ5KGtleSwgdmFsdWUpIHtcblx0XHR2YXIgb2JqID0ge307XG5cdFx0b2JqW2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIob2JqKTtcblx0fVxuXG5cdHNldEZpbHRlcihmaWx0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdmaWx0ZXInLCBmaWx0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldEZpbHRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdmaWx0ZXInKTtcblx0fVxuXG5cdHNldFNvcnRlcihzb3J0ZXJEYXRhKSB7XG5cdFx0dGhpcy5zZXRNb2RlbFBhcmFtKCdzb3J0ZXInLCBzb3J0ZXJEYXRhKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNb2RlbFBhcmFtKCdzb3J0ZXInKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIocGFnZU51bWJlcikge1xuXHRcdHRoaXMuc2V0TW9kZWxQYXJhbSgncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUocGFnZVNpemUpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZXIocGFnZVNpemUsIHBhZ2VOdW1iZXIpIHtcblx0XHR0aGlzLnNldE1vZGVsUGFyYW0oJ3BhZ2VTaXplJywgcGFnZVNpemUpLnNldE1vZGVsUGFyYW0oJ3BhZ2VOdW1iZXInLCBwYWdlTnVtYmVyKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRwYWdlU2l6ZTogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlU2l6ZScpLFxuXHRcdFx0cGFnZU51bWJlcjogdGhpcy5nZXRNb2RlbFBhcmFtKCdwYWdlTnVtYmVyJylcblx0XHR9O1xuXHR9XG5cblx0c2V0TW9kZWxQYXJhbShwYXJhbU5hbWUsIHBhcmFtVmFsdWUpIHtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCkpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucyhwYXJhbU5hbWUsIHBhcmFtVmFsdWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZGVsUGFyYW0ocGFyYW1OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucyhwYXJhbU5hbWUsIG51bGwpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzICYmIHRoaXMubWFuaWZlc3QgPyB0aGlzLm1hbmlmZXN0Lm1vZGVsIDogbnVsbDtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoYWN0aW9uTmFtZSkge1xuXHRcdHJldHVybiB0aGlzLmdldEFjdGlvbnMoKSAmJiB0aGlzLmdldEFjdGlvbnMoKVthY3Rpb25OYW1lXSA/IHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdIDogbnVsbDtcblx0fVxuXG5cdHJlcXVlc3QocmVjb3JkLCBhY3Rpb25OYW1lLCBjYWxsYmFja1N1Y2Nlc3MsIGNhbGxiYWNrRXJyb3IpIHtcblx0XHRjb25zb2xlLmxvZygncmVxdWVzdCcsIHJlY29yZCwgYWN0aW9uTmFtZSwgY2FsbGJhY2tTdWNjZXNzLCBjYWxsYmFja0Vycm9yKTtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdHVybCA9IHRoaXMuZ2V0VVJMKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpe1xuXHRcdFx0dmFyIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4bWxodHRwLm9wZW4oYWN0aW9uRGF0YS5tZXRob2QsIHVybCk7XG5cdFx0XHR4bWxodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIik7XG5cdFx0XHR4bWxodHRwLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhtbGh0dHAud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhtbGh0dHAuYWN0aW9uRGF0YSA9IGFjdGlvbkRhdGE7XG5cdFx0XHR4bWxodHRwLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XG5cdFx0XHR4bWxodHRwLmNhbGxiYWNrU3VjY2VzcyA9IGNhbGxiYWNrU3VjY2Vzcztcblx0XHRcdHhtbGh0dHAuY2FsbGJhY2tFcnJvciA9IGNhbGxiYWNrRXJyb3I7XG5cdFx0XHR4bWxodHRwLm9ubG9hZCA9IHRoaXMub25Mb2FkO1xuXHRcdFx0eG1saHR0cC5zZW5kKEpTT04uc3RyaW5naWZ5KHJlY29yZC5nZXREYXRhKCkpKTtcblx0XHR9XG5cdH1cblxuXHRvbkxvYWQoKXtcblx0XHRsZXQgc3RhdHVzID0gdGhpcy5zdGF0dXMsXG5cdFx0XHRkYXRhID0gdGhpcy5yZXNwb25zZSxcblx0XHRcdHJlc3VsdCA9IFtdO1xuXHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRpZigoJ2lzQXJyYXknIGluIHRoaXMuYWN0aW9uRGF0YSkgJiYgdGhpcy5hY3Rpb25EYXRhLmlzQXJyYXkpIHtcblx0XHRcdFx0ZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBpdGVtKSk7XG5cdFx0XHRcdH0pXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQgPSBuZXcgbm90UmVjb3JkKHRoaXMubWFuaWZlc3QsIGRhdGEpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jYWxsYmFja1N1Y2Nlc3MgJiYgdGhpcy5jYWxsYmFja1N1Y2Nlc3MocmVzdWx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jYWxsYmFja0Vycm9yICYmIHRoaXMuY2FsbGJhY2tFcnJvcihkYXRhKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRmaWxlVXBsb2FkKGZpbGVVcGxvYWQpIHtcblx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0Ly9jb25zb2xlLmxvZyhmaWxlVXBsb2FkLmZpbGUpO1xuXHRcdGlmICh4aHIudXBsb2FkICYmIHRoaXMuZmlsZUFsbG93ZWQoZmlsZVVwbG9hZC5maWxlKSkge1xuXHRcdFx0Ly8gcHJvZ3Jlc3MgYmFyXG5cdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGZpbGVVcGxvYWQudHJpZ2dlcihcInByb2dyZXNzXCIsIGUsIGZpbGVVcGxvYWQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0Ly8gZmlsZSByZWNlaXZlZC9mYWlsZWRcblx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGF0LndvcmtpbmcuZmlsZVVwbG9hZHMuaW5kZXhPZihmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHRcdHRoYXQud29ya2luZy5maWxlVXBsb2Fkcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwic3VjY2Vzc1wiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBlLCBmaWxlVXBsb2FkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9wZW4oXCJQT1NUXCIsIHRoaXMuZ2V0VXBsb2FkVXJsKCksIHRydWUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgZmlsZVVwbG9hZC5maWxlLnR5cGUpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJYX0ZJTEVOQU1FXCIsIGVuY29kZVVSSUNvbXBvbmVudChmaWxlVXBsb2FkLmZpbGUubmFtZSkpO1xuXHRcdFx0eGhyLnNlbmQoZmlsZVVwbG9hZC5maWxlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZmlsZVVwbG9hZC50cmlnZ2VyKFwiZmFpbHVyZVwiLCBuZXcgRXZlbnQoXCJXcm9uZ0ZpbGVUeXBlXCIpLCBmaWxlVXBsb2FkKTtcblx0XHR9XG5cdH1cblx0Ki9cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7XG5cbmNvbnN0IE1FVEFfT1BUSU9OUyA9IFN5bWJvbCgnb3B0aW9ucycpLFxuXHRNRVRBX0lURU0gPSBTeW1ib2woJ2l0ZW0nKSxcblx0TUVUQV9JTlRFUkZBQ0UgPSBTeW1ib2woJ2ludGVyZmFjZScpLFxuXHRNRVRBX1BST1hZID0gU3ltYm9sKCdwcm94eScpLFxuXHRNRVRBX0NIQU5HRSA9IFN5bWJvbCgnY2hhbmdlJyksXG5cdE1FVEFfU0FMID0gWydnZXRBdHRyJywgJ2dldEF0dHJzJywgJ3NldEF0dHInLCAnc2V0QXR0cnMnLCAnZ2V0RGF0YScsICdzZXREYXRhJywgJ2dldEpTT04nLCAnb24nLCAnb2ZmJywgJ3RyaWdnZXInXSxcblx0REVGQVVMVF9SRUNPUkRfSURfRklFTERfTkFNRSA9ICdfaWQnLFxuXHRERUZBVUxUX0FDVElPTl9QUkVGSVggPSAnJCcsXG5cdERFRkFVTFRfUEFHRV9OVU1CRVIgPSAxLFxuXHRERUZBVUxUX1BBR0VfU0laRSA9IDEwO1xuXG5cbnZhciBjcmVhdGVIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9jb25zb2xlLmxvZyhgcHJveHkgZ2V0IFwiJHtrZXl9XCJgLCB0aGlzLCB0YXJnZXQsIGNvbnRleHQpO1xuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJyl7XG5cdFx0XHRcdGlmICh0aGlzW2tleV0pIHtcblx0XHRcdFx0XHRyZXNUYXJnZXQgPSB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIFJlZmxlY3QuZ2V0KHJlc1RhcmdldCwga2V5LCBjb250ZXh0KTtcblx0XHR9LmJpbmQob3duZXIpLFxuXG5cdFx0c2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgdmFsdWUsIHByb3h5KSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKGBwcm94eSBzZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCB0ID0gUmVmbGVjdC5zZXQodGFyZ2V0LCBrZXksIHZhbHVlKTtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCBwcm94eSwga2V5LCB2YWx1ZSk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RSZWNvcmQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QsIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmIChpdGVtICYmIGl0ZW0uaXNSZWNvcmQpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRPcHRpb25zKHtcblx0XHRcdGZpbHRlcjoge30sXG5cdFx0XHRzb3J0ZXI6IHt9LFxuXHRcdFx0cGFnZU51bWJlcjogREVGQVVMVF9QQUdFX05VTUJFUixcblx0XHRcdHBhZ2VTaXplOiBERUZBVUxUX1BBR0VfU0laRSxcblx0XHRcdGZpZWxkczogW11cblx0XHR9KTtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXSA9IG5ldyBub3RSZWNvcmRJbnRlcmZhY2UobWFuaWZlc3QpO1xuXHRcdHRoaXMuc2V0RGF0YShpdGVtKTtcblx0XHR0aGlzLmludGVyZmFjZVVwKCk7XG5cdFx0dGhpcy5pc1JlY29yZCA9IHRydWU7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVIYW5kbGVycyh0aGlzKSk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRjcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtcykge1xuXHRcdHZhciBjb2xsZWN0aW9uID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29sbGVjdGlvbi5wdXNoKG5ldyBub3RSZWNvcmQobWFuaWZlc3QsIGl0ZW1zW2ldKSk7XG5cdFx0fVxuXHRcdHJldHVybiBjb2xsZWN0aW9uO1xuXHR9XG5cblx0aW50ZXJmYWNlVXAoKSB7XG5cdFx0aWYgKHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEFjdGlvbnNDb3VudCgpID4gMCkge1xuXHRcdFx0bGV0IGFjdGlvbnMgPSB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zKCk7XG5cdFx0XHRmb3IgKGxldCBpIGluIGFjdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5hY3Rpb25VcChpLCBhY3Rpb25zW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRhY3Rpb25VcChpbmRleCwgYWN0aW9uRGF0YSkge1xuXHRcdGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdKSkge1xuXHRcdFx0dGhpc1tERUZBVUxUX0FDVElPTl9QUkVGSVggKyBpbmRleF0gPSB0aGlzLmNyZWF0ZUNvbW1vblJlcXVlc3QoaW5kZXgpO1xuXHRcdFx0Y29uc29sZS5sb2coJ2RlZmluZScsIERFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4KTtcblx0XHR9XG5cdH1cblxuXHRjcmVhdGVDb21tb25SZXF1ZXN0KGluZGV4KSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrU3VjY2VzcywgY2FsbGJhY2tFcnJvcikge1xuXHRcdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCwgY2FsbGJhY2tTdWNjZXNzLCBjYWxsYmFja0Vycm9yKTtcblx0XHR9LmJpbmQodGhpcyk7XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aC50by5rZXknLCB2YWx1ZU9mS2V5XG5cdDwtIG9rLCB3aXRoIG9uZSBvbkNoYW5nZSBldmVudCB0cmlnZ2VyZWRcblx0Ki9cblxuXHRzZXRBdHRyKGtleSwgdmFsdWUpIHtcblx0XHRyZXR1cm4gbm90UGF0aC5zZXQoa2V5LCB0aGlzW01FVEFfUFJPWFldLCB7fSwgdmFsdWUpO1xuXHR9XG5cblx0Lypcblx0LT5cblx0e1xuXHRcdCdrZXlQYXRoJzogdmFsdWUsXG5cdFx0J2tleS5zdWJQYXRoJzogdmFsdWUyLFxuXHRcdCdrZXlQYXRoLjAudGl0bGUnOiB2YWx1ZTNcblx0fVxuXHQ8LSBvaywgd2l0aCBidW5jaCBvZiBvbkNoYW5nZSBldmVudHMgdHJpZ2dlcmVkXG5cdCovXG5cdHNldEF0dHJzKG9iamVjdFBhcnQpIHtcblx0XHRjb25zb2xlLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCl7XG5cdFx0XHRmb3IobGV0IHBhdGggaW4gb2JqZWN0UGFydCl7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdzZXRBdHRycyBvbmUgdG8gZ28nLCBwYXRoKTtcblx0XHRcdFx0dGhpcy5zZXRBdHRyKHBhdGgsIG9iamVjdFBhcnRbcGF0aF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qXG5cdC0+ICdwYXRoVG9LZXknXG5cdDwtIHZhbHVlMVxuXG5cdCovXG5cdGdldEF0dHIod2hhdCkge1xuXHRcdGNvbnNvbGUubG9nKCdnZXRBdHRyJywgd2hhdCk7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHdoYXQsIHRoaXNbTUVUQV9QUk9YWV0sIHt9KTtcblx0fVxuXG5cdC8qXG5cdC0+IFsncGF0aFRvS2V5JywgJ3BhdGgudG8ua2V5JywgJ3NpbXBsZUtleScsLi4uXVxuXHQ8LSBbdmFsdWUxLCB2YWx1ZTIsIHZhbHVlMywuLi5dXG5cdCovXG5cdGdldEF0dHJzKHdoYXQpIHtcblx0XHRsZXQgcmVzdWx0ID0gW107XG5cdFx0aWYgKHdoYXQgJiYgd2hhdC5sZW5ndGggPiAwKXtcblx0XHRcdGZvcihsZXQgcGF0aCBvZiB3aGF0KXtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5nZXRBdHRyKHBhdGgpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qXG5cdFx0aGFuZGxlciBmb3IgUHJveHkgY2FsbGJhY2tzXG5cdCovXG5cblx0W01FVEFfQ0hBTkdFXSgpIHtcblx0XHRjb25zb2xlLmxvZygndHJ5IHRvIGNoYW5nZScsIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRzZXRJdGVtKGl0ZW0pe1xuXHRcdHRoaXMuc2V0RGF0YShpdGVtKTtcblx0XHR0aGlzW01FVEFfUFJPWFldID0gbmV3IFByb3h5KGl0ZW0sIGNyZWF0ZUhhbmRsZXJzKHRoaXMpKTtcblx0XHR0aGlzLm9mZignY2hhbmdlJyk7XG5cdFx0dGhpcy5vbignY2hhbmdlJywgdGhpc1tNRVRBX0NIQU5HRV0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRnZXRKU09OKCl7XG5cblx0fVxuXG59XG4iLCIvKlxuXHRDb21tb24gZnVuY3Rpb25zXG4qL1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL25vdENvbW1vbic7XG4vKlxuXHRmcmFtZXdvcmsgd2lkZSBwYXJzZXIgZm9yIGRhdGEgYWNjZXNzXG4qL1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbi8qXG5cdGJhc2ljIGV2ZW50IGhhbmRsZXJzIGFuZCBjb3JlIGRhdGEgbW9kaWZpZXJzXG4qL1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbi8qXG5cdHNtYXJ0ZXIgaW1hZ2UgY29udHJvbFxuKi9cbmltcG9ydCBub3RJbWFnZSBmcm9tICcuL25vdEltYWdlJztcbi8qXG5cdGFwcGxpY2F0aW9uIG1haW4gaW5mcmFzdHJ1Y3R1cmUgc2V0dGVyXG4qL1xuaW1wb3J0IG5vdEFwcCBmcm9tICcuL25vdEFwcCc7XG4vKlxuXHRkYWRkeSBmb3IgdXNlciBjb250cm9sbGVyc1xuKi9cbmltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4vbm90Q29udHJvbGxlcic7XG4vKlxuXHR0ZW1wbGF0aW5nIGFuZCBjb21tb24gc3RydWN0dXJlc1xuKi9cbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnOyAvLyByZWdpc3RyeSBvZiBwcm9jZXNzb3JzXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIGZyb20gJy4vbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliJzsvLyBkZWZhdWx0IHByb2Nlc3NvcnNcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vbm90VGVtcGxhdGVDYWNoZSc7IC8vIGNhY2hpbmcgYWxsIHRoZSB0ZW1wbGF0ZXMsIGFuZCBjbG9uaW5nIGZvciB1c2VcbmltcG9ydCBub3RUZW1wbGF0ZSBmcm9tICcuL25vdFRlbXBsYXRlJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi9ub3RDb21wb25lbnQnOyAvLyBzbWFydGVyIHdpdGggYmluZGluZ3MgZm9yIGV2ZW50cywgYWN0dWFseSBwcm94eVxuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi9ub3RGb3JtJztcbmltcG9ydCBub3RUYWJsZSBmcm9tICcuL25vdFRhYmxlJztcbmltcG9ydCBub3RWaWV3IGZyb20gJy4vbm90Vmlldyc7XG5cbmltcG9ydCBub3RSZWNvcmRJbnRlcmZhY2UgZnJvbSAnLi9ub3RSZWNvcmRJbnRlcmZhY2UnOyAvL1x0aG93IHRvIGludGVyYWN0IHdpdGggZGF0YSBvbiBzZXJ2ZXJcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnOyAvL1x0d3JhcHBlciBmb3IgZGF0YSB3aXRoIHNlcnZlcjwtPnZpZXcgbGl2ZSBpbnRlcmFjdGlvbnNcblxubm90VGVtcGxhdGVQcm9jZXNzb3JzLmFkZChub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIpO1xuXG5leHBvcnQge1xuXHRub3RDb21tb24sXG5cdG5vdFBhdGgsXG5cdG5vdEJhc2UsXG5cdG5vdEltYWdlLFxuXHRub3RBcHAsXG5cdG5vdENvbnRyb2xsZXIsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29ycyxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLFxuXHRub3RUZW1wbGF0ZUNhY2hlLFxuXHRub3RUZW1wbGF0ZSxcblx0bm90Q29tcG9uZW50LFxuXHRub3RGb3JtLFxuXHRub3RUYWJsZSxcblx0bm90Vmlldyxcblx0bm90UmVjb3JkSW50ZXJmYWNlLFxuXHRub3RSZWNvcmRcbn07XG4iXSwibmFtZXMiOlsibm90Q29tbW9uIiwiZGVzdGluYXRpb24iLCJzb3VyY2UiLCJwcm9wZXJ0eSIsImNvbnN0cnVjdG9yIiwiT2JqZWN0IiwiY2FsbGVlIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsIm9iaiIsImtleSIsImRlZmF1bHRWYWx1ZSIsImhhc093blByb3BlcnR5IiwicGF0aCIsIkFycmF5IiwiaXNBcnJheSIsImluZGV4T2YiLCJyZXBsYWNlIiwic3BsaXQiLCJzdGVwIiwiaXRlbSIsImhlbHBlciIsInJTdGVwIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiaSIsInBhcnNlUGF0aFN0ZXAiLCJvYmplY3QiLCJhdHRyUGF0aCIsIm5vcm1pbGl6ZVBhdGgiLCJhdHRyTmFtZSIsInNoaWZ0IiwiZ2V0VmFsdWVCeVBhdGgiLCJhdHRyVmFsdWUiLCJzZXRWYWx1ZUJ5UGF0aCIsImlzUmVjb3JkIiwiX3NldEF0dHIiLCJ0cmlnZ2VyIiwiYXJyMSIsImFycjIiLCJzb3J0Iiwiam9pbiIsImxvY2FsZUNvbXBhcmUiLCJhcnIiLCJ2YWwiLCJhIiwiYiIsImlkZW50aWNhbEFycmF5cyIsImlkZW50aWNhbFRvQXJyYXkiLCJlbCIsInN0YXJ0c1dpdGgiLCJhbGxFbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsaXN0IiwiaiIsImF0dHMiLCJhdHRyaWJ1dGVzIiwibiIsIm5vZGVOYW1lIiwicHVzaCIsIm9sZF9pbmRleCIsIm5ld19pbmRleCIsImsiLCJzcGxpY2UiLCJyZWdpc3RyeSIsInVybCIsImRhdGEiLCJ0aGF0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwiZ2V0U2Vzc2lvbklEIiwicmVzcG9uc2VUeXBlIiwid2l0aENyZWRlbnRpYWxzIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ0Iiwib25lcnJvciIsIm9udGltZW91dCIsInNlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwiU1VCX1BBVEhfU1RBUlQiLCJTVUJfUEFUSF9FTkQiLCJQQVRIX1NQTElUIiwiUEFUSF9TVEFSVF9PQkpFQ1QiLCJQQVRIX1NUQVJUX0hFTFBFUlMiLCJGVU5DVElPTl9NQVJLRVIiLCJNQVhfREVFUCIsIm5vdFBhdGgiLCJzdGFydCIsImVuZCIsInN1YlBhdGgiLCJmaW5kIiwic3ViIiwicGFyc2VkIiwic3ViZiIsImhlbHBlcnMiLCJzdWJQYXRoUGFyc2VkIiwiZmluZE5leHRTdWJQYXRoIiwicmVwbGFjZVN1YlBhdGgiLCJwYXJzZVN1YnMiLCJpc0Z1bmN0aW9uIiwibmV3T2JqIiwiTUVUQV9FVkVOVFMiLCJTeW1ib2wiLCJNRVRBX0RBVEEiLCJNRVRBX1dPUktJTkciLCJNRVRBX09QVElPTlMiLCJub3RCYXNlIiwid2hhdCIsImFyZ3MiLCJzZXQiLCJnZXQiLCJyZXMiLCJhcmd1bWVudHMiLCJzZXRDb21tb24iLCJnZXREYXRhIiwiZ2V0Q29tbW9uIiwiZ2V0T3B0aW9ucyIsImdldFdvcmtpbmciLCJldmVudE5hbWVzIiwiZXZlbnRDYWxsYmFja3MiLCJvbmNlIiwiZm9yRWFjaCIsImRlZmluZUlmTm90RXhpc3RzIiwibmFtZSIsImZyb20iLCJldmVudE5hbWUiLCJldmVudCIsIm9mZiIsImNhbGxiYWNrcyIsImNhbGxiYWNrIiwidGFyZ2V0SWQiLCJub3RJbWFnZSIsIm5vdEFwcCIsIm5vdENvbnRyb2xsZXIiLCJNRVRBX1BST0NFU1NPUlMiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnMiLCJzZXRQcm9jZXNzb3IiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiZ2V0UHJvY2Vzc29yIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzTGliIiwic2NvcGUiLCJhdHRyaWJ1dGVSZXN1bHQiLCJhdHRyaWJ1dGVFeHByZXNzaW9uIiwicGFyYW1zIiwiZWxlbWVudCIsImlubmVySFRNTCIsIk1FVEFfQ0FDSEUiLCJURU1QTEFURV9UQUciLCJub3RUZW1wbGF0ZUNhY2hlIiwic2V0V29ya2luZyIsImhpZGVUZW1wbGF0ZXMiLCJyZWdpc3RlciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm1hcCIsImxvYWRPbmUiLCJvUmVxdWVzdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXYiLCJkYXRhc2V0Iiwibm90VGVtcGxhdGVOYW1lIiwibm90VGVtcGxhdGVVUkwiLCJzcmNFbGVtZW50IiwicmVzcG9uc2VUZXh0Iiwic2V0T25lIiwiYmluZCIsImNsb25lTm9kZSIsImtleXMiLCJzcmMiLCJjb250IiwidGV4dCIsInJlc3VsdCIsIm5vdFRlbXBsYXRlc0VsZW1lbnRzIiwiY2hpbGRyZW4iLCJwYXJlbnROb2RlIiwidmFsdWUiLCJsaWIiLCJnZXRIVE1MIiwidGhlbiIsInRlbXBsYXRlSW5uZXJIVE1MIiwidGVtcGxhdGVDb250RWwiLCJ3cmFwIiwiY2F0Y2giLCJodHRwRXJyb3IiLCJlcnJvciIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsIk9QVF9QUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVgiLCJPUFRfUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SIiwiT1BUX1BST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYIiwibm90VGVtcGxhdGUiLCJpbnB1dCIsIm9uIiwicmVuZGVyIiwiaW5pdCIsImluaXREYXRhIiwiaW5pdE9wdGlvbnMiLCJvcHRpb25zIiwiaW5pdFdvcmtpbmciLCJwcmVwYXJlVGVtcGxhdGVFbGVtZW50IiwidGVtcGxhdGUiLCJzZXREYXRhIiwic2V0T3B0aW9ucyIsInVuc2V0UmVhZHkiLCJodG1sIiwic2V0TG9jYWxUZW1wbGF0ZUVsZW1lbnQiLCJnZXRGcm9tVVJMIiwidGVtcGxhdGVDb250RWxlbWVudCIsImluZm8iLCJnZXRMb2NhbFRlbXBsYXRlRWxlbWVudCIsImNyZWF0ZU1hcHBpbmdJZk5vdEV4aXN0cyIsImV4ZWNQcm9jZXNzb3JzIiwicHJveHkiLCJsb2ciLCJwbGFjZVJlbmRlcmVkIiwibWV0aG9kIiwidGFyZ2V0RWwiLCJyZW5kZXJlZCIsInJlbW92ZUNoaWxkIiwicGxhY2UiLCJwbGFjZXIiLCJjcmVhdGVNYXBwaW5nIiwiZmluZEFsbFByb2Nlc3NvcnMiLCJwcm9jcyIsImVscyIsImdldEF0dHJpYnV0ZXNTdGFydHNXaXRoIiwicHJvY0RhdGEiLCJwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24iLCJwcm9jZXNzb3JFeHByZXNzaW9uIiwiaWZDb25kaXRpb24iLCJwcm9jZXNzb3JOYW1lIiwiaW5kZXgiLCJtYXBwaW5nIiwicHJvY1Njb3BlIiwiZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdCIsInByb2NOYW1lIiwicHJvYyIsInJlbW92ZUF0dHJpYnV0ZSIsIk1FVEFfUEFSVFMiLCJub3RDb21wb25lbnQiLCJhbmNob3JzIiwiY29sbGVjdEFuY2hvcnMiLCJjb21wb25lbnQiLCJhbmNob3IiLCJwYXJ0c0F0QW5jaG9yIiwiZ2V0UGFydHMiLCJzZXRQYXJ0cyIsImRpcmVjdGlvbiIsImluY2x1ZGVzIiwiZmlyc3QiLCJsYXN0IiwiZnJvbVBvcyIsInRvUG9zIiwibW92ZUVsZW1lbnRJbkFycmF5Iiwibm90Rm9ybSIsIm9uU3VibWl0Iiwib25SZXNldCIsIm9uQ2FuY2VsIiwicmVuZGVyV3JhcHBlciIsInJlbmRlckNvbXBvbmVudHMiLCJub3RUYWJsZSIsIm5vdFZpZXciLCJub3RJbnRlcmZhY2UiLCJtYW5pZmVzdCIsIm9iajEiLCJvYmoyIiwibGluZSIsInJlY29yZCIsImFjdGlvbk5hbWUiLCJyZWNvcmRSRSIsImZpZWxkTmFtZSIsImluZCIsImxlbiIsImluZDIiLCJzdGFydFNsaWNlIiwiZW5kU2xpY2UiLCJnZXRBdHRyIiwibW9kZWwiLCJhY3Rpb25EYXRhIiwicGFyc2VMaW5lIiwicG9zdEZpeCIsImFjdGlvbnMiLCJzZXRGaWx0ZXIiLCJmaWx0ZXJEYXRhIiwic2V0TW9kZWxQYXJhbSIsImdldE1vZGVsUGFyYW0iLCJzb3J0ZXJEYXRhIiwicGFnZU51bWJlciIsInBhZ2VTaXplIiwicGFyYW1OYW1lIiwicGFyYW1WYWx1ZSIsImdldEFjdGlvbnMiLCJjYWxsYmFja1N1Y2Nlc3MiLCJjYWxsYmFja0Vycm9yIiwiZ2V0QWN0aW9uRGF0YSIsImdldFVSTCIsInhtbGh0dHAiLCJvbkxvYWQiLCJub3RSZWNvcmQiLCJNRVRBX0lOVEVSRkFDRSIsIk1FVEFfUFJPWFkiLCJNRVRBX0NIQU5HRSIsIk1FVEFfU0FMIiwiREVGQVVMVF9SRUNPUkRfSURfRklFTERfTkFNRSIsIkRFRkFVTFRfQUNUSU9OX1BSRUZJWCIsIkRFRkFVTFRfUEFHRV9OVU1CRVIiLCJERUZBVUxUX1BBR0VfU0laRSIsImNyZWF0ZUhhbmRsZXJzIiwib3duZXIiLCJ0YXJnZXQiLCJjb250ZXh0IiwicmVzVGFyZ2V0IiwiUmVmbGVjdCIsIkVycm9yIiwiY3JlYXRlQ29sbGVjdGlvbiIsIm5vdFJlY29yZEludGVyZmFjZSIsImludGVyZmFjZVVwIiwiUHJveHkiLCJpdGVtcyIsImNvbGxlY3Rpb24iLCJnZXRBY3Rpb25zQ291bnQiLCJhY3Rpb25VcCIsImNyZWF0ZUNvbW1vblJlcXVlc3QiLCJyZXF1ZXN0Iiwib2JqZWN0UGFydCIsInNldEF0dHIiLCJhZGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLGNBQVk7U0FDUCxnQkFBU0MsV0FBVCxFQUFzQkMsTUFBdEIsRUFBOEI7T0FDaEMsSUFBSUMsUUFBVCxJQUFxQkQsTUFBckIsRUFBNkI7T0FDeEJBLE9BQU9DLFFBQVAsS0FBb0JELE9BQU9DLFFBQVAsRUFBaUJD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
