/*
	:property.sub1.func().funcProp
	 = return funcProp of function result of sub1 property of property of object
	:{::helperVal}.sub
	 = return sub property of object property with name retrieved from helperVal property of helpers object
	:{::helperFunc()}.sub
	= return sub property of object property with name retrieved from helperVal function result of helpers object.
	if helpersFunx return 'car' then source path becomes :car.sub

*/

const SUB_PATH_START = '{',
	SUB_PATH_END = '}',
	PATH_SPLIT = '.',
	PATH_START_OBJECT = ':',
	PATH_START_HELPERS = '::',
	FUNCTION_MARKER = '()',
	MAX_DEEP = 10;

class notPath{
	constructor(){
		return this;
	}
	/*
		input ':{::helperVal}.sub'
		return ::helperVal
	*/
	findNextSubPath(path/* string */){
		let subPath = '',
			find = false;
		for(let i = 0; i < path.length; i++){
			if (path[i] === SUB_PATH_START){
				find = true;
				subPath = '';
			}else{
				if(path[i] === SUB_PATH_END && find){
					if (find) {
						return subPath;
					}
				}else{
					subPath+=path[i];
				}
			}
		}
		return find?subPath:null;
	}

	replaceSubPath(path, sub, parsed){
		let subf = SUB_PATH_START+sub+SUB_PATH_END;
		while(path.indexOf(subf) > -1){
			path = path.replace(subf, parsed);
		}
		return path;
	}

	parseSubs(path, item, helpers){
		let subPath, subPathParsed, i = 0;
		while(subPath = this.findNextSubPath(path)){
			subPathParsed = this.getValueByPath( subPath.indexOf(PATH_START_HELPERS)>-1?helpers:item, subPath);
			path = this.replaceSubPath(path, subPath, subPathParsed);
			i++;
			if (i > MAX_DEEP){
				break;
			}
		}
		return path;
	}

	get(path, item, helpers){
		switch (path){
			case PATH_START_OBJECT: return item;
			case PATH_START_HELPERS: return helpers;
		}
		path = this.parseSubs(path, item, helpers);
		return this.getValueByPath(path.indexOf(PATH_START_HELPERS)>-1?helpers:item, path);
	}

	set(path, item, helpers, attrValue){
		let subPath, subPathParsed, i = 0;
		while(subPath = this.findNextSubPath(path)){
			subPathParsed = this.getValueByPath( subPath.indexOf(PATH_START_HELPERS)>-1?helpers:item, subPath);
			path = this.replaceSubPath(path, subPath, subPathParsed);
			if (i > MAX_DEEP){
				break;
			}
		}
		this.setValueByPath(item, path, attrValue);
		if (item.isRecord && this.normilizePath(path).length > 1) {
			item.trigger('change', item, path, attrValue);
		}
	}



	parsePathStep(step, item, helper){
		let rStep = null;
		if(step.indexOf(PATH_START_HELPERS) === 0 && helper){
			rStep = step.replace(PATH_START_HELPERS, '');
			if(rStep.indexOf(FUNCTION_MARKER) === rStep.length-2){
				rStep = step.replace(FUNCTION_MARKER, '');
				if(helper.hasOwnProperty(rStep)){
					return helper[rStep](item, undefined);
				}
			}else{
				return helper[rStep];
			}
		}else{
			if(step.indexOf(PATH_START_OBJECT) === 0 && item){
				rStep = step.replace(PATH_START_OBJECT, '');
				if(rStep.indexOf(FUNCTION_MARKER) === rStep.length-2){
					rStep = step.replace(FUNCTION_MARKER, '');
					if(item.hasOwnProperty(rStep)){
						return item[rStep](item, undefined);
					}
				}else{
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
	parsePath(path, item, helper){
		if (!Array.isArray(path)){
			path = path.split(PATH_SPLIT);
		}
		for(var i = 0; i < path.length; i++){
			path[i] = this.parsePathStep(path[i], item, helper);
		}
		return path;
	}

	normilizePath(path){
		if (Array.isArray(path)){
			return path;
		}else{
			while(path.indexOf(PATH_START_OBJECT) > -1){
				path = path.replace(PATH_START_OBJECT,'');
			}
			return path.split(PATH_SPLIT);
		}
	}

	/*
		small = ["todo"],
		big = ["todo", "length"]
		return true;

	*/

	ifFullSubPath(big, small){
		if (big.length<small.length){return false;}
		for(let t =0; t < small.length; t++){
			if(small[t] !== big[t]){
				return false;
			}
		}
		return true;
	}

	getValueByPath(object, attrPath){
		attrPath = this.normilizePath(attrPath);
		let attrName = attrPath.shift(),
			isFunction = attrName.indexOf(FUNCTION_MARKER)>-1;
		if (isFunction){
			attrName = attrName.replace(FUNCTION_MARKER, '');
		}
		if ((typeof object === 'object') && typeof object[attrName] !== 'undefined' && object[attrName] !== null){
			let newObj = isFunction?object[attrName]():object[attrName];
			if (attrPath.length > 0){
				return this.getValueByPath(newObj, attrPath);
			}else{
				return newObj;
			}
		}else{
			return undefined;
		}
	}

	setValueByPath(object, attrPath, attrValue){
		attrPath = this.normilizePath(attrPath);
		let attrName = attrPath.shift();
		if (attrPath.length > 0){
			if (!object.hasOwnProperty(attrName)){object[attrName] = {};}
			this.setValueByPath(object[attrName], attrPath, attrValue);
		}else{
			object[attrName] = attrValue;
		}
	}

	join(){
		let args = Array.prototype.slice.call(arguments);
		return args.join(PATH_SPLIT);
	}
}

export default new notPath();
