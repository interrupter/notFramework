import notPath from '../notPath.js';
import notRouter from '../notRouter';

var notTemplateProcessorsLib = {
	content: function(scope, item, helpers) {
		scope.attributeResult = notPath.parseSubs(scope.attributeExpression, item, helpers);
		if (scope.params.indexOf('capitalize') > -1) {
			scope.attributeResult = scope.attributeResult.toUpperCase();
		}
		scope.element.textContent = scope.attributeResult;
	},
	bind: function(scope, item, helpers) {
		if (scope.element.binds){
			if(scope.element.binds.hasOwnProperty(scope.params[0])){
				if(scope.element.binds[scope.params[0]].indexOf(scope.attributeExpression) > -1){
					return;
				}
			}
		}
		scope.element.addEventListener(scope.params[0], (e) => {
			e.preventDefault();
			if (scope.attributeResult) {
				return scope.attributeResult({
					scope,
					item,
					helpers,
					e
				});
			} else {
				return true;
			}
		});
		if(!scope.element.hasOwnProperty('binds')){
			scope.element.binds = {};
		}
		if(!scope.element.binds.hasOwnProperty(scope.params[0])){
			scope.element.binds[scope.params[0]] = [];
		}
		if(scope.element.binds[scope.params[0]].indexOf(scope.attributeExpression) === -1){
			scope.element.binds[scope.params[0]].push(scope.attributeExpression);
		}
	},
	value: function(scope, item, helpers) {
		let liveEvents = ['change', 'keyup'],
			onEvent = () => {
				if (['checkbox', 'radio', 'select-multiple'].indexOf(scope.element.type) > -1) {
					switch (scope.element.type) {
					case 'checkbox':
						{
							notPath.set(scope.attributeExpression, item, helpers, scope.element.checked);
						}
						break;
					case 'radio':
						{
							//console.log(helpers.field.name, helpers.data, helpers, scope.element.checked?scope.element.value:null);
							notPath.set(helpers.field.name, helpers.data, helpers, scope.element.checked ? scope.element.value : null);
						}
						break;
					case 'select-multiple':
						{
							let selected = [].slice.call(scope.element.selectedOptions).map(a => a.value);
							//console.log('select-multiple', selected);
							notPath.set(scope.attributeExpression, item, helpers, selected);
						}
						break;
					}
				} else {
					//console.log(notPath.get(scope.attributeExpression, item, helpers), ' -> ',scope.element.value);
					notPath.set(scope.attributeExpression, item, helpers, scope.element.value);
				}
			};
		scope.element.setAttribute('value', notPath.get(scope.attributeExpression, item, helpers));
		if (scope.element.processedValue !== true) {
			if(scope.element.type === 'textarea'){
				scope.element.innerHTML = notPath.get(scope.attributeExpression, item, helpers);
			}
			for (let t of liveEvents) {
				scope.element.addEventListener(t, onEvent);
			}
			scope.element.processedValue = true;
		}
	},
	attr: function(scope, item, helpers) {
		let res = notPath.get(scope.attributeExpression, item, helpers) || notPath.parseSubs(scope.attributeExpression, item, helpers);
		scope.attributeResult = ((typeof res === 'function') ? res({
			scope,
			item,
			helpers
		}) : res);
		scope.element.setAttribute(scope.params[0], scope.attributeResult);
	},
	name: function(scope, item, helpers) {
		scope.element.setAttribute('name', notPath.get(scope.attributeExpression, item, helpers));
	},
	change: function( /*scope, item, helpers*/ ) {

	},
	checked: function(scope, item, helpers) {
		let result = notPath.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = ((typeof result === 'function') ? result({
			scope,
			item,
			helpers
		}) : result);
		scope.attributeResult ? scope.element.setAttribute('checked', true) : scope.element.removeAttribute('checked');
	},
	class: function(scope, item, helpers) {
		let res = notPath.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = ((typeof res === 'function') ? res({
			scope,
			item,
			helpers
		}) : res);
		if (scope.params.length < 3 || isNaN(scope.attributeResult)) {
			if (scope.attributeResult) {
				scope.element.classList.add(scope.params[0]);
				if (scope.params.length > 1) {
					scope.element.classList.remove(scope.params[1]);
				}
			} else {
				scope.element.classList.remove(scope.params[0]);
				if (scope.params.length > 1) {
					scope.element.classList.add(scope.params[1]);
				}
			}
		} else {
			let used = false;
			for (let i = 0; i < scope.params.length; i++) {
				if (i === scope.attributeResult) {
					scope.element.classList.add(scope.params[i]);
					used = true;
				} else {
					scope.element.classList.remove(scope.params[i]);
				}
			}
			if (!used) {
				scope.element.classList.add(scope.params[0]);
			}
		}
	},
	options: function(scope, item, helpers) {
		let i = 0,
			option = null,
			valueFieldName = 'value',
			labelFieldName = 'name',
			itemValueFieldName = helpers.hasOwnProperty('field') && helpers.field.hasOwnProperty('name') ? helpers.field.name : 'value';
		scope.element.innerHTML = '';
		if (scope.params.length === 2) {
			labelFieldName = scope.params[0];
			valueFieldName = scope.params[1];
		}
		if (scope.params.length === 3) {
			labelFieldName = scope.params[0];
			valueFieldName = scope.params[1];
			itemValueFieldName = scope.params[2];
		}
		if (typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty('default') && helpers.default) {
			option = document.createElement('option');
			option.setAttribute('value', '');
			option.textContent = helpers.placeholder;
			scope.element.appendChild(option);
		}
		if (typeof item !== 'undefined' && item !== null) {
			var lib = notPath.get(scope.attributeExpression, item, helpers);
			for (i = 0; i < lib.length; i++) {
				option = document.createElement('option');
				option.setAttribute('value', lib[i][valueFieldName]);
				option.textContent = lib[i][labelFieldName];
				if (helpers.field.array) {
					if (item[itemValueFieldName] && Array.isArray(item[itemValueFieldName])){
						if (item[itemValueFieldName].indexOf(lib[i][valueFieldName]) > -1) {
							option.setAttribute('selected', true);
						}
					}
				} else {
					if (item[itemValueFieldName] === lib[i][valueFieldName]) {
						option.setAttribute('selected', true);
					}
				}
				scope.element.appendChild(option);
			}
		}
	},
	href:function(scope, item, helpers){
		if (!scope.element.notRouterInitialized){
			scope.attributeResult = notPath.parseSubs(scope.attributeExpression, item, helpers);
			scope.element.setAttribute('href', notRouter.getFullRoute(scope.attributeResult));
			scope.element.addEventListener('click', (e)=>{
				e.preventDefault();
				notRouter.navigate(notPath.parseSubs(scope.attributeExpression, item, helpers));
				return false;
			});
			scope.element.notRouterInitialized = true;
		}
	}

};
export default notTemplateProcessorsLib;
