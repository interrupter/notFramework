import notBase from './notBase';
import notCommon from './common';
import notPath from './notPath';
import notRecordInterface from './notRecordInterface';

const META_INTERFACE = Symbol('interface'),
	META_PROXY = Symbol('proxy'),
	META_CHANGE = Symbol('change'),
	META_CHANGE_NESTED = Symbol('change.nested'),
	META_SAL = ['getAttr', 'getAttrs', 'isProperty', 'isRecord', 'getManifest', 'setAttr', 'setAttrs', 'getData', 'setData', 'getJSON', 'on', 'off', 'trigger'],
	DEFAULT_ACTION_PREFIX = '$',
	DEFAULT_PAGE_NUMBER = 1,
	DEFAULT_PAGE_SIZE = 10,
	META_RETURN_TO_ROOT = Symbol('returnToRoot');

var createPropertyHandlers = function(owner) {
	return {
		get: function(target, key, context) {
			//notCommon.log(`proxy get "${key}"`, this, target, context);
			if (key === 'isProxy') {
				return true;
			}
			let resTarget = target;
			if (typeof key === 'symbol') {
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
		set: function(target, key, value /*, proxy*/ ) {
			//notCommon.log(`proxy set "${key}"`, typeof target[key]);

			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error(`Invalid attempt to private "${key}" property`);
			} else {
				let valueToReflect = value;
				if (typeof value === 'object') {
					valueToReflect = new notProperty(this.getOptions('getRoot'), notPath.join(this.getOptions('path'), key), value);
				}
				let t = Reflect.set(target, key, valueToReflect);
				this.trigger('change', target, key, valueToReflect);
				return t;
			}
		}.bind(owner),
	};
};

class notProperty extends notBase {
	constructor(getRoot, pathTo, item) {
		super();
		if (typeof item === 'undefined' || item === null) {
			return item;
		}
		if (item && (item.isProxy || item.isProperty)) {
			return item;
		}
		this.setOptions({
			getRoot: getRoot,
			path: pathTo
		});
		this[META_PROXY] = new Proxy(item, createPropertyHandlers(this));
		this.setData(item);
		this.isProperty = true;
		this.on('change', this[META_RETURN_TO_ROOT].bind(this));
		return this[META_PROXY];
	}

	[META_RETURN_TO_ROOT](proxy, key, value) {
		let root = this.getOptions('getRoot')();
		root.trigger('change.nested', this[META_PROXY], this.getOptions('path'), key, value);
	}
}


var createRecordHandlers = function(owner) {
	return {
		get: function(target, key, context) {
			//notCommon.log(`proxy get "${key}"`, this, target, context);
			if (key === 'isProxy' || key === 'isRecord') {
				return true;
			}
			let resTarget = target;
			if (typeof key === 'symbol') {
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
		set: function(target, key, value /*, proxy*/ ) {
			//notCommon.log(`record proxy set "${key}"`, this, target);
			//notCommon.trace();
			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error(`Invalid attempt to private "${key}" property`);
			} else {
				let valueToReflect = value;
				if (typeof value === 'object') {
					valueToReflect = new notProperty(this.getOptions('getRoot'), notPath.join(this.getOptions('path'), key), value);
				}
				let t = Reflect.set(target, key, valueToReflect);
				this.trigger('change', target, key, valueToReflect);
				return t;
			}
		}.bind(owner),
	};
};

class notRecord extends notBase {
	constructor(manifest, item) {
		super();
		if (typeof item === 'undefined' || item === null) {
			return item;
		}
		if (item && item.isProxy) {
			notCommon.error('this is Proxy item');
			return item;
		}

		if (item && (item.isRecord || item.isProperty)) {
			return item;
		} else {
			if (Array.isArray(item)) {
				return this.createCollection(manifest, item);
			}
		}
		this.setOptions({
			filter: {},
			sorter: {},
			pageNumber: DEFAULT_PAGE_NUMBER,
			pageSize: DEFAULT_PAGE_SIZE,
			fields: []
		});
		this[META_INTERFACE] = new notRecordInterface(manifest);
		this.setData(this.initProperties(item));
		this.interfaceUp();
		this.isRecord = true;
		this[META_PROXY] = new Proxy(item, createRecordHandlers(this));
		//notCommon.log('proxy record created from ', item);
		this.on('change', this[META_CHANGE].bind(this));
		this.on('change.nested', this[META_CHANGE_NESTED].bind(this));
		return this[META_PROXY];
	}

	initProperties(item, path = '') {
		if (typeof item !== 'undefined' && item !== null) {
			let keys = Object.keys(item);
			for (let key of keys) {
				let curPath = path + (path.length > 0 ? '.' : '') + key;
				//notCommon.log('curPath', curPath);
				if (item.hasOwnProperty(key)) {
					if (typeof item[key] === 'object') {
						this.initProperties(item[key], curPath);
						item[key] = new notProperty(this.getRoot.bind(this), curPath, item[key]);
					} else {
						//notCommon.log(key, 'is own property, but not object');
					}
				} else {
					//notCommon.log(key, 'is not own property');
				}
			}
		}
		return item;
	}

	getRoot() {
		return this;
	}

	createCollection(manifest, items) {
		var collection = [];
		for (var i = 0; i < items.length; i++) {
			collection.push(new notRecord(manifest, items[i]));
		}
		return collection;
	}

	interfaceUp() {
		if (this[META_INTERFACE].getActionsCount() > 0) {
			let actions = this[META_INTERFACE].getActions();
			for (let i in actions) {
				this.actionUp(i, actions[i]);
			}
		}
	}

	actionUp(index) {
		if (!this.hasOwnProperty([DEFAULT_ACTION_PREFIX + index])) {
			this[DEFAULT_ACTION_PREFIX + index] = () => this[META_INTERFACE].request(this, index);
			//notCommon.log('define', DEFAULT_ACTION_PREFIX + index);
		}
	}
	/*
	-> 'path.to.key', valueOfKey
	<- ok, with one onChange event triggered
	*/

	setAttr(key, value) {
		return notPath.set(key, this[META_PROXY], {}, value);
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
	setAttrs(objectPart) {
		//notCommon.log('setAttrs', objectPart, Object.keys(objectPart));
		if (objectPart && (typeof objectPart === 'object') && Object.keys(objectPart).length > 0) {
			for (let path in objectPart) {
				//notCommon.log('setAttrs one to go', path);
				this.setAttr(path, objectPart[path]);
			}
		}
	}

	/*
	-> 'pathToKey'
	<- value1

	*/
	getAttr(what) {
		//notCommon.log('getAttr', what);
		return notPath.get(what, this[META_PROXY], {});
	}

	/*
	-> ['pathToKey', 'path.to.key', 'simpleKey',...]
	<- [value1, value2, value3,...]
	*/
	getAttrs(what) {
		let result = [];
		if (what && what.length > 0) {
			for (let path of what) {
				result.push(this.getAttr(path));
			}
		}
		return result;
	}

	getManifest() {
		if (this[META_INTERFACE]){
			return this[META_INTERFACE].manifest;
		}else{
			return {};
		}
	}

	/*
		handler for Proxy callbacks
	*/

	[META_CHANGE]() {
		//notCommon.log('try to change', ...arguments);
	}

	[META_CHANGE_NESTED]() {
		//notCommon.log('try to change nested', ...arguments);
		//notCommon.trace();
		this.trigger('change', this[META_PROXY], notPath.join(arguments[1], arguments[2]), arguments[3]);
	}

	setItem(item) {
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

	getJSON() {

	}

}

export default notRecord;
