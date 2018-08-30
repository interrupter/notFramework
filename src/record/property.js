import notPath from '../notPath';
import notBase from '../notBase';

import {
	META_RETURN_TO_ROOT,
	META_PROXY,
	META_ACTIVE,
	META_SAL
} from './options';

var createPropertyHandlers = function (owner) {
	return {
		get: function (target, key, context) {
			//notCommon.log(`proxy get "${key}"`, this, target, context);
			if (key === 'isProxy') {
				return true;
			}
			if (['__setActive', '__setPassive', '__isActive','__setActiveWithoutEvent'].indexOf(key) > -1) {
				switch (key) {
				case '__setActive':
					this[META_ACTIVE] = true;
					this[META_PROXY].trigger('change');
					return;
				case '__setActiveWithoutEvent':
					this[META_ACTIVE] = true;
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
		set: function (target, key, value /*, proxy*/ ) {
			//notCommon.log(`proxy set "${key}"`, typeof target[key]);
			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error(`Invalid attempt to private "${key}" property`);
			} else {
				let valueToReflect = value;
				if (typeof value === 'object') {
					valueToReflect = new notRecordProperty(this.getOptions('getRoot'), notPath.join(this.getOptions('path'), key), value);
				}
				let t = Reflect.set(target, key, valueToReflect);
				if (this[META_ACTIVE] && key !== META_ACTIVE) {
					this.trigger('change', target, key, valueToReflect);
				}				
				return t;
			}
		}.bind(owner),
	};
};

class notRecordProperty extends notBase {
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

export default notRecordProperty;
export {
	META_RETURN_TO_ROOT
};
