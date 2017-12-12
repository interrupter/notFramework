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

/**
 * Set of tools to use notPath property access notation
 * : is for item
 * :: is for helpers
 * {} subpath
 * . path splitter
 * () function and should be executed with params (item, helper | undefined)
 * sub-paths will be parsed and replaced by results in source path
 */
class notPath {
	constructor() {
		return this;
	}
	/*
		input ':{::helperVal}.sub'
		return ::helperVal
	*/

	/**
	 * Returns first subpath in path
	 * if subpath not closed will return it anyway
	 * @param {string} path path in string notation
	 * @return {string|null} subpath or null if no sub path were found
	 */
	findNextSubPath(path) {
		let subPath = '',
			find = false;
		for (let i = 0; i < path.length; i++) {
			if (path[i] === SUB_PATH_START) {
				find = true;
				subPath = '';
			} else {
				if ((path[i] === SUB_PATH_END) && find) {
					return subPath;
				} else {
					subPath += path[i];
				}
			}
		}
		return find ? subPath : null;
	}

	/**
	 * Replace sub-path in parent path by parsed version
	 * @param {string} path path to process
	 * @param {string} sub sub path to replace
	 * @param {string} parsed parsed sub path
	 * @return {string} parsed path
	 */

	replaceSubPath(path, sub, parsed) {
		let subf = SUB_PATH_START + sub + SUB_PATH_END,
			i = 0;
		while ((path.indexOf(subf) > -1) && i < MAX_DEEP) {
			path = path.replace(subf, parsed);
			i++;
		}
		return path;
	}

	/**
	 * Parses path while there any sub-paths
	 * @param {string} path raw unparsed path
	 * @param {object} item data
	 * @param {object} helpers helpers
	 * @return {string} parsed path
	 */
	parseSubs(path, item, helpers) {
		let subPath = this.findNextSubPath(path),
			subPathParsed, i = 0;
		while (subPath) {
			subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath, item, helpers);
			path = this.replaceSubPath(path, subPath, subPathParsed);
			i++;
			if (i > MAX_DEEP) {
				break;
			}
			subPath = this.findNextSubPath(path);
		}
		return path;
	}

	/**
	 * Get property value
	 * @param {string} path path to property
	 * @param {object} item item object
	 * @param {object} helpers helpers object
	 */

	get(path, item, helpers) {
		switch (path) {
		case PATH_START_OBJECT:
			return item;
		case PATH_START_HELPERS:
			return helpers;
		}
		path = this.parseSubs(path, item, helpers);
		return this.getValueByPath(path.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, path, item, helpers);
	}

	/**
	 * Set property value
	 * @param {string} path path to property
	 * @param {object} item item object
	 * @param {object} helpers helpers object
	 * @param {any} attrValue value we want to assign
	 */

	set(path, item, helpers, attrValue) {
		if (arguments.length === 3) {
			attrValue = helpers;
			helpers = undefined;
		}
		let subPath = this.findNextSubPath(path),
			subPathParsed,
			i = 0;
		while (subPath) {

			subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath, item, helpers);

			path = this.replaceSubPath(path, subPath, subPathParsed);

			if (i > MAX_DEEP) {
				break;
			}
			subPath = this.findNextSubPath(path);
			i++;
		}

		this.setValueByPath(item, path, attrValue);

		if (item.isRecord && this.normilizePath(path).length > 1 && item.__isActive) {
			item.trigger('change', item, path, attrValue);
		}
	}

	/**
	 * Set target property to null
	 * @param {string} path path to property
	 * @param {object} item item object
	 * @param {object} helpers helpers object
	 */

	unset(path, item, helpers) {
		this.set(path, item, helpers, null);
	}

	/**
	 * Parses step key, transforms it to end-form
	 * @param {string} step not parsed step key
	 * @param {object} item item object
	 * @param {object} helper helpers object
	 * @return {string|number} parsed step key
	 */

	parsePathStep(step, item, helper) {
		let rStep = null;
		if (step.indexOf(PATH_START_HELPERS) === 0 && helper) {
			rStep = step.replace(PATH_START_HELPERS, '');
			if (rStep.indexOf(FUNCTION_MARKER) === rStep.length - 2) {
				rStep = rStep.replace(FUNCTION_MARKER, '');
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
					rStep = rStep.replace(FUNCTION_MARKER, '');
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
	/**
	 * Transforms path with sub paths to path without
	 * @param {string|array} path path to target property
	 * @param {object} item item object
	 * @param {object} helper helper object
	 * @return {array} parsed path
	 **/
	parsePath(path, item, helper) {
		if (!Array.isArray(path)) {
			path = path.split(PATH_SPLIT);
		}
		for (var i = 0; i < path.length; i++) {
			path[i] = this.parsePathStep(path[i], item, helper);
		}
		return path;
	}

	/**
	 * Transforms path from string notation to array of keys
	 * @param {string|array} path  input path, if array does nothing
	 * @return {array} path in array notation
	 */

	normilizePath(path) {
		if (Array.isArray(path)) {
			return path;
		} else {
			while (path.indexOf(PATH_START_OBJECT) > -1) {
				path = path.replace(PATH_START_OBJECT, '');
			}
			return path.split(PATH_SPLIT);
		}
	}

	/*
		small = ["todo"],
		big = ["todo", "length"]
		return true;

	*/

	/**
	 * Identifies if first path includes second, compared from start,
	 * no floating start position inside ['join', 'me'], ['me']
	 * will result in false
	 * @param {array} big where we will search
	 * @param {array} small what we will search
	 * @return {boolean} if we succeed
	 */

	ifFullSubPath(big, small) {
		if (big.length < small.length) {
			return false;
		}
		for (let t = 0; t < small.length; t++) {
			if (small[t] !== big[t]) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Getter through third object
	 * Path is parsed, no event triggering for notRecord
	 * @param {object} object object to be used as getter
	 * @param {string|array} attrPath path to property
	 * @param {object} item supporting data
	 * @param {helpers} object  supporting helpers
	 */

	getValueByPath(object, attrPath, item, helpers) {
		attrPath = this.normilizePath(attrPath);
		let attrName = attrPath.shift(),
			isFunction = attrName.indexOf(FUNCTION_MARKER) > -1;
		if (isFunction) {
			attrName = attrName.replace(FUNCTION_MARKER, '');
		}
		if ((typeof object === 'object' && typeof object !== 'undefined' && object!== null) && typeof object[attrName] !== 'undefined' && object[attrName] !== null) {
			let newObj = isFunction ? object[attrName]({
				item,
				helpers
			}) : object[attrName];
			if (attrPath.length > 0) {
				return this.getValueByPath(newObj, attrPath, item, helpers);
			} else {
				return newObj;
			}
		} else {
			return undefined;
		}
	}

	/**
	 * Setter through third object
	 * Path is parsed, no event triggering for notRecord
	 * @param {object} object object to be modified
	 * @param {string|array} attrPath path to property
	 * @param {any} attrValue  value to assign
	 */

	setValueByPath(object, attrPath, attrValue) {
		attrPath = this.normilizePath(attrPath);
		let attrName = attrPath.shift();
		if (attrPath.length > 0) {
			if (!object.hasOwnProperty(attrName)) {
				object[attrName] = {};
			}
			this.setValueByPath(object[attrName], attrPath, attrValue);
		} else {
			object[attrName] = attrValue;
		}
	}

	/**
	* Joins passed in strings with PATH_SPLIT
	* @param {string} arguments path to be glued
	* @return {string} composite path
	*/

	join() {
		let args = Array.prototype.slice.call(arguments);
		return args.join(PATH_SPLIT);
	}
}

export default new notPath();
