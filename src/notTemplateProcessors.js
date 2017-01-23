import notBase from './notBase';

const META_PROCESSORS = Symbol('processors');

class notTemplateProcessors extends notBase{
	constructor(){
		super();
		this[META_PROCESSORS] = {};
		return this;
	}

	setProcessor(/* key, value */){
		this.setCommon(this[META_PROCESSORS], arguments);
		return this;
	}

	getProcessor(/* key,  defaultValue */){
		return this.getCommon(this[META_PROCESSORS], arguments);
	}

	clearProcessors(){
		this.setCommon(this[META_PROCESSORS], {});
		return this;
	}

	add(){
		if (arguments.length === 2){
			this.setProcessor(arguments[0], arguments[1]);
		}else{
			if (arguments.length === 1 && typeof arguments[0] === 'object'){
				for(let t in arguments[0]){
					this.setProcessor(t, arguments[0][t]);
				}
			}
		}
	}

	get(){
		return this.getProcessor(...arguments);
	}

	clear(){
		this[META_PROCESSORS] = {};
		return this;
	}
}
export default new notTemplateProcessors();
