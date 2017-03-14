/* global jQuery */
var CommonObjects = {
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
					{
						if (!this.equal(a[p], b[p])) {
							return false;
						}
						break;
					}
					case 'function':
					{
						if (typeof(b[p]) == 'undefined' ||
							(p != 'equals' && a[p].toString() != b[p].toString()))
							return false;
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
	deepMerge: function(obj1, obj2) {
		return jQuery.extend(true, {}, obj1, obj2);
	},

	registry: {},
	
	register: function(key, val) {
		this.registry[key] = val;
	},

	get: function(key) {
		return this.registry.hasOwnProperty(key) ? this.registry[key] : null;
	},

};

export default CommonObjects;
