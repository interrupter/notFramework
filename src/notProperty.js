const META_RETURN_TO_ROOT = Symbol('returnToRoot');

var createPropertyHandlers = function(owner) {
	return {
		get: function(target, key, context) {
			//notCommon.log(`proxy get "${key}"`, this, target, context);
			if (key === 'isProxy'){
				return true;
			}
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
		set: function(target, key, value/*, proxy*/) {
			//notCommon.log(`proxy set "${key}"`, typeof target[key]);

			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error(`Invalid attempt to private "${key}" property`);
			} else {
				let valueToReflect = value;
				if (typeof value === 'object'){
					valueToReflect = new notProperty(this.getOptions('getRoot'), notPath.join(this.getOptions('path'), key), value);
				}
				let t = Reflect.set(target, key,  valueToReflect);
				this.trigger('change', target, key, valueToReflect);
				return t;
			}
		}.bind(owner),
	};
};

class notProperty extends notBase{
	constructor(getRoot, pathTo, item) {
		super();
		if (typeof item === 'undefined' || item === null){
			return item;
		}
		if (item && item.isProxy){
			return item;
		}
		this.setOptions({
			getRoot: getRoot,
			path: pathTo
		});
		this[META_PROXY] = new Proxy(item, createPropertyHandlers(this));
		this.setData(item);
		this.on('change', this.returnToRoot.bind(this));
		return this[META_PROXY];
	}

	[META_RETURN_TO_ROOT](proxy, key, value){
		let root = this.getOptions('getRoot')();
		root.trigger('change.nested', this[META_PROXY], this.getOptions('path'), key, value);
	}
}

export default notProperty;
export {META_RETURN_TO_ROOT};
