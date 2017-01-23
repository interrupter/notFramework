import notBase from './notBase';
import notPath from './notPath';
import notRecordInterface from './notRecordInterface';

const META_OPTIONS = Symbol('options'),
	META_ITEM = Symbol('item'),
	META_INTERFACE = Symbol('interface'),
	META_PROXY = Symbol('proxy'),
	META_CHANGE = Symbol('change'),
	META_SAL = ['getAttr', 'getAttrs', 'setAttr', 'setAttrs', 'getData', 'setData', 'getJSON', 'on', 'off', 'trigger'],
	DEFAULT_RECORD_ID_FIELD_NAME = '_id',
	DEFAULT_ACTION_PREFIX = '$',
	DEFAULT_PAGE_NUMBER = 1,
	DEFAULT_PAGE_SIZE = 10;


var createHandlers = function(owner) {
	return {
		get: function(target, key, context) {
			//console.log(`proxy get "${key}"`, this, target, context);
			let resTarget = target;
			if (typeof key === 'symbol'){
				if (this[key]) {
					resTarget = this;
				}
			}else{
				if (Object.keys(this).indexOf(key) > -1 || META_SAL.indexOf(key) > -1) {
					resTarget = this;
				}
			}
			return Reflect.get(resTarget, key, context);
		}.bind(owner),

		set: function(target, key, value, proxy) {
			//console.log(`proxy set "${key}"`, this, target, context);
			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error(`Invalid attempt to private "${key}" property`)
			} else {
				let t = Reflect.set(target, key, value);
				this.trigger('change', proxy, key, value);
				return t;
			}
		}.bind(owner),
	};
};

export default class notRecord extends notBase {
	constructor(manifest, item) {
		super();
		if (item && item.isRecord) {
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
		this.setData(item);
		this.interfaceUp();
		this.isRecord = true;
		this[META_PROXY] = new Proxy(item, createHandlers(this));
		this.on('change', this[META_CHANGE].bind(this));
		return this[META_PROXY];
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

	actionUp(index, actionData) {
		if (!this.hasOwnProperty([DEFAULT_ACTION_PREFIX + index])) {
			this[DEFAULT_ACTION_PREFIX + index] = this.createCommonRequest(index);
			console.log('define', DEFAULT_ACTION_PREFIX + index);
		}
	}

	createCommonRequest(index) {
		return function(callbackSuccess, callbackError) {
			this[META_INTERFACE].request(this, index, callbackSuccess, callbackError);
		}.bind(this);
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
		console.log('setAttrs', objectPart, Object.keys(objectPart));
		if (objectPart && (typeof objectPart === 'object') && Object.keys(objectPart).length > 0){
			for(let path in objectPart){
				console.log('setAttrs one to go', path);
				this.setAttr(path, objectPart[path]);
			}
		}
	}

	/*
	-> 'pathToKey'
	<- value1

	*/
	getAttr(what) {
		console.log('getAttr', what);
		return notPath.get(what, this[META_PROXY], {});
	}

	/*
	-> ['pathToKey', 'path.to.key', 'simpleKey',...]
	<- [value1, value2, value3,...]
	*/
	getAttrs(what) {
		let result = [];
		if (what && what.length > 0){
			for(let path of what){
				result.push(this.getAttr(path));
			}
		}
		return result;
	}

	/*
		handler for Proxy callbacks
	*/

	[META_CHANGE]() {
		console.log('try to change', arguments);
	}

	setItem(item){
		this.setData(item);
		this[META_PROXY] = new Proxy(item, createHandlers(this));
		this.off('change');
		this.on('change', this[META_CHANGE].bind(this));
		return this[META_PROXY];
	}

	getJSON(){

	}

}
