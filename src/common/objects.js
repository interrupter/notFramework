/*
https://github.com/TehShrike/is-mergeable-object

Included for convinience only. All rights belongs to their authors and etc.
start of my code marked.

*/

let isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value) && !isSpecial(value);
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object';
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
			|| stringValue === '[object Date]'
			|| isReactElement(value);
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE;
}

/*
https://github.com/KyleAMathews/deepmerge

The MIT License (MIT)

Copyright (c) 2012 Nicholas Fisher

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


function emptyTarget(val) {
	return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value, optionsArgument) {
	var clone = !optionsArgument || optionsArgument.clone !== false;

	return (clone && isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, optionsArgument)
		: value;
}

function defaultArrayMerge(target, source, optionsArgument) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, optionsArgument);
	});
}

function mergeObject(target, source, optionsArgument) {
	var destination = {};
	if (isMergeableObject(target)) {
		Object.keys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], optionsArgument);
		});
	}
	Object.keys(source).forEach(function(key) {
		if (!isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], optionsArgument);
		} else {
			destination[key] = deepmerge(target[key], source[key], optionsArgument);
		}
	});
	return destination;
}

function deepmerge(target, source, optionsArgument) {
	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var options = optionsArgument || { arrayMerge: defaultArrayMerge };
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, optionsArgument);
	} else if (sourceIsArray) {
		var arrayMerge = options.arrayMerge || defaultArrayMerge;
		return arrayMerge(target, source, optionsArgument);
	} else {
		return mergeObject(target, source, optionsArgument);
	}
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array');
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, optionsArgument);
	}, {});
};

/*

Own code below

*/

var CommonObjects = {
	deepMerge: deepmerge,
	extend: function(defaults, options) {
		var extended = {};
		var prop;
		for (prop in defaults) {
			if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
				extended[prop] = defaults[prop];
			}
		}
		for (prop in options) {
			if (Object.prototype.hasOwnProperty.call(options, prop)) {
				extended[prop] = options[prop];
			}
		}
		return extended;
	},
	completeAssign: function(target, ...sources) {
		sources.forEach(source => {
			let descriptors = Object.keys(source).reduce((descriptors, key) => {
				descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
				return descriptors;
			}, {});
			// by default, Object.assign copies enumerable Symbols too
			Object.getOwnPropertySymbols(source).forEach(sym => {
				let descriptor = Object.getOwnPropertyDescriptor(source, sym);
				if (descriptor.enumerable) {
					descriptors[sym] = descriptor;
				}
			});
			Object.defineProperties(target, descriptors);
		});
		return target;
	},
	extendWith: function(options){
		for (let prop in options) {
			if (options.hasOwnProperty(prop)) {
				this[prop] = options[prop];
			}
		}
	},
	containsObj: function(big, small) {
		for (var t in small) {
			if (small.hasOwnProperty(t)) {
				if ((!big.hasOwnProperty(t)) || (big[t] !== small[t])) {
					return false;
				}
			}
		}
		return true;
	},
	filter: function(obj, filter) {
		if (filter && obj) {
			return this.containsObj(obj, filter);
		}
		return true;
	},
	findIconByFilter: function(icons, filter) {
		var batch = [];
		for (var i = 0; i < icons.length; i++) {
			if (this.filter(icons[i].getData(), filter)) {
				batch.push(icons[i]);
			}
		}
		return batch;
	},
	equalObj: function(a, b) {
		var p;
		for (p in a) {
			if (typeof(b[p]) == 'undefined') {
				return false;
			}
		}
		for (p in a) {
			if (a[p]) {
				switch (typeof(a[p])) {
				case 'object':
					if (!this.equal(a[p], b[p])) {
						return false;
					}
					break;
				case 'function':
					if (typeof(b[p]) == 'undefined' ||
						(p != 'equals' && a[p].toString() != b[p].toString()))
						return false;
					break;
				default:
					if (a[p] != b[p]) {
						return false;
					}
				}
			} else {
				if (b[p])
					return false;
			}
		}

		for (p in b) {
			if (typeof(a[p]) == 'undefined') {
				return false;
			}
		}
		return true;
	},
	defineIfNotExists: function(obj, key, defaultValue) {
		if (!obj.hasOwnProperty(key)) {
			obj[key] = defaultValue;
		}
	},
	registry: {},
	register: function(key, val) {
		this.registry[key] = val;
	},

	get: function(key) {
		return this.registry.hasOwnProperty(key) ? this.registry[key] : null;
	},

	moveItem(array, old_index, new_index) {
		if (new_index >= array.length) {
			var k = new_index - array.length;
			while ((k--) + 1) {
				array.push(undefined);
			}
		}
		array.splice(new_index, 0, array.splice(old_index, 1)[0]);
	},
};

export default CommonObjects;
