import notPath from '../notPath.js';

var notTemplateProcessorsLib = {
	content:function(scope, item, helpers){
		scope.attributeResult = notPath.parseSubs(scope.attributeExpression, item, helpers);
		if (scope.params.indexOf('capitalize') > -1){
			scope.attributeResult = scope.attributeResult.toUpperCase();
		}
		scope.element.textContent = scope.attributeResult;
	},
	bind: function(scope, item, helpers){
		scope.element.addEventListener(scope.params[0], (e)=>{
			e.stopImmediatePropagation();
			e.preventDefault();
			if (scope.attributeResult){
				return scope.attributeResult({scope, item, helpers, e});
			}else{
				return true;
			}
		});
	},
	value: function(scope, item, helpers){
		let liveEvents = ['change', 'keyup'],
			onEvent = ()=>notPath.set(scope.attributeExpression, item, helpers, scope.element.value);
		scope.element.setAttribute('value', notPath.get(scope.attributeExpression, item, helpers));
		if (scope.element.processedValue !== true){
			for(let t of liveEvents){
				scope.element.addEventListener(t, onEvent);
			}
			scope.element.processedValue = true;
		}
	},
	attr: function(scope, item, helpers){
		let res = notPath.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = ((typeof res === 'function')?res({scope, item, helpers}):res);
		scope.element.setAttribute(scope.params[0], scope.attributeResult);
	},
	name: function(scope, item, helpers) {
		scope.element.setAttribute('name', notPath.get(scope.attributeExpression, item, helpers));
	},
	change: function(/*scope, item, helpers*/){

	},
	checked: function(scope, item, helpers) {
		let result = notPath.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = ((typeof result === 'function')?result({scope, item, helpers}):result);
		scope.attributeResult ? scope.element.setAttribute('checked', true) : scope.element.removeAttribute('checked');
	},
	class: function(scope, item, helpers) {
		let res = notPath.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = ((typeof res === 'function')?res({scope, item, helpers}):res);
		if (scope.attributeResult){
			scope.element.classList.add(scope.params[0]);
		}else{
			scope.element.classList.remove(scope.params[0]);
		}
	},
	options: function(scope, item, helpers) {
		let i = 0,
			option = null,
			valueFieldName = 'value',
			labelFieldName = 'name',
			subLib = undefined,
			itemValueFieldName = helpers.hasOwnProperty('fieldName') ? helpers['fieldName'] : 'value';
		scope.element.innerHTML = '';
		if (scope.params.length === 2) {
			labelFieldName = scope.params[0];
			valueFieldName = scope.params[1];
		}
		if (typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty('option')) {
			labelFieldName = helpers.option.label;
			valueFieldName = helpers.option.value;
		}
		if (scope.params.length > 2) {
			itemValueFieldName = scope.params[2];
		}
		if (scope.params.length > 3 && scope.params[3] === 'different') {
			subLib = valueFieldName;
		}
		if (typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty('fieldPlaceHolder') && helpers.hasOwnProperty('fieldPlaceHolderDefault') && helpers.fieldPlaceHolderDefault) {
			option = document.createElement('option');
			option.setAttribute('value', '');
			option.textContent = helpers.fieldPlaceHolder;
			scope.element.appendChild(option);
		}
		if (typeof item !== 'undefined' && item !== null) {
			var lib = notPath.get(scope.attributeExpression, item, helpers);
			if (/*different &&*/ subLib && lib.hasOwnProperty(subLib)) {
				lib = lib[subLib];
			}
			for (i = 0; i < lib.length; i++) {
				option = document.createElement('option');
				option.setAttribute('value', lib[i][valueFieldName]);
				option.textContent = lib[i][labelFieldName];
				if (Array.isArray(item[itemValueFieldName])) {
					if (item[itemValueFieldName].indexOf(lib[i][valueFieldName]) > -1) {
						option.setAttribute('selected', true);
					}
				} else {
					if (item[itemValueFieldName] === lib[i][valueFieldName]) {
						option.setAttribute('selected', true);
					}
				}
				scope.element.appendChild(option);
			}
		}
	}
};
export default notTemplateProcessorsLib;
