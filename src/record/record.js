import notBase from '../notBase';
import notCommon from '../common';
import notPath from '../notPath';
import {
	META_INTERFACE,
	META_PROXY,
	META_CHANGE,
	META_ACTIVE,
	META_CHANGE_NESTED,
	META_SAL,
	META_MAP_TO_INTERFACE,
	DEFAULT_ACTION_PREFIX
} from './options';
import notRecordInterface from './interface';
import notRecordProperty from './property';

var createRecordHandlers = function (owner) {
	return {
		get: function (target, key, context) {
			if (key === 'isProxy' || key === 'isRecord') {
				return true;
			}
			if (['__setActive', '__setPassive', '__isActive'].indexOf(key) > -1) {
				switch (key) {
				case '__setActive':
					this[META_ACTIVE] = true;
					this[META_PROXY].trigger('change');
					return;
				case '__setPassive':
					this[META_ACTIVE] = false;
					return;
				case '__isActive':
					return Reflect.get(this, META_ACTIVE, context);
				}
			}
			let resTarget = target;
			if (typeof key === 'symbol') {
				if (typeof this[key] !== 'undefined') {
					resTarget = this;
				}
			} else {
				if (Object.keys(this).indexOf(key) > -1 || META_SAL.indexOf(key) > -1 || META_MAP_TO_INTERFACE.indexOf(key) > -1) {
					resTarget = this;
				}
			}
			return Reflect.get(resTarget, key, context);
		}.bind(owner),
		set: function (target, key, value /*, proxy*/ ) {
			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error(`Invalid attempt to private "${key}" property`);
			} else {
				let valueToReflect = value,
					t;
				if (typeof value === 'object') {
					valueToReflect = new notRecordProperty(this.getRoot.bind(this), notPath.join(this.getOptions('path'), key), value);
				}
				t = Reflect.set(target, key, valueToReflect);
				if (this[META_ACTIVE] && key !== META_ACTIVE) {
					this.trigger('change', target, key, valueToReflect);
				}
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
		this.setOptions({});
		this[META_INTERFACE] = new notRecordInterface(manifest);
		this[META_ACTIVE] = true;
		this.setData(this.initProperties(item));
		this.interfaceUp();
		this.mapToInterface();
		this[META_PROXY] = new Proxy(item, createRecordHandlers(this));
		//notCommon.log('proxy record created from ', item);
		this.on('change', this[META_CHANGE].bind(this));
		this.on('change.nested', this[META_CHANGE_NESTED].bind(this));
		return this[META_PROXY];
	}

	mapToInterface() {
		let rec = this;
		for (let t of META_MAP_TO_INTERFACE) {
			if (this[META_INTERFACE][t] && typeof this[META_INTERFACE][t] === 'function') {
				this[t] = function () {
					rec[META_INTERFACE][t](arguments);
					return rec;
				};
			}
		}
	}

	initProperties(item, path = '') {
		if (typeof item !== 'undefined' && item !== null) {
			let keys = Object.keys(item);
			for (let key of keys) {
				let curPath = path + (path.length > 0 ? '.' : '') + key;
				//notCommon.log('curPath', curPath);
				if (item.hasOwnProperty(key)) {
					if (typeof item[key] === 'object' && item[key] !== null) {
						this.initProperties(item[key], curPath);
						item[key] = new notRecordProperty(this.getRoot.bind(this), curPath, item[key]);
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
		if (this[META_INTERFACE]) {
			return this[META_INTERFACE].manifest;
		} else {
			return {};
		}
	}

	/*
		handler for Proxy callbacks
	*/

	[META_CHANGE]() {

	}

	[META_CHANGE_NESTED]() {
		if (this[META_ACTIVE]) {
			this.trigger('change', this[META_PROXY], notPath.join(arguments[1], arguments[2]), arguments[3]);
		}
	}

	setItem(item) {
		this.setData(this.initProperties(item));
		this[META_PROXY] = new Proxy(item, createRecordHandlers(this));
		this.off('change');
		this.off('change.nested');
		this.on('change', this[META_CHANGE].bind(this));
		this.on('change.nested', this[META_CHANGE_NESTED].bind(this));
		return this[META_PROXY];
	}

}

export default notRecord;
