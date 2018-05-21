import notPath from '../notPath.js';
import notRouter from '../notRouter';

var notTemplateProcessorsLib = {
	content: function (scope, item, helpers) {
		scope.attributeResult = notPath.parseSubs(scope.attributeExpression, item, helpers);
		if (scope.params.indexOf('capitalize') > -1) {
			scope.attributeResult = scope.attributeResult.toUpperCase();
		}
		if (scope.params[0] === 'max' && parseInt(scope.params[1])>0) {
			if (scope.attributeResult.length>parseInt(scope.params[1])){
				scope.attributeResult = scope.attributeResult.substring(0, parseInt(scope.params[1])-1);
				if(scope.params[2] === 'true'){
					scope.attributeResult+='...';
				}
			}
		}
		scope.element.textContent = scope.attributeResult;
	},
	bind: function (scope, item, helpers) {
		if (scope.element.binds) {
			if (scope.element.binds.hasOwnProperty(scope.params[0])) {
				if (scope.element.binds[scope.params[0]].indexOf(scope.attributeExpression) > -1) {
					return;
				}
			}
		}
		scope.element.addEventListener(scope.params[0], (e) => {
			if (scope.params.length === 1 || scope.params[1] !== 'default') {
				e.preventDefault();
			}
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
		}, false);
		if (!scope.element.hasOwnProperty('binds')) {
			scope.element.binds = {};
		}
		if (!scope.element.binds.hasOwnProperty(scope.params[0])) {
			scope.element.binds[scope.params[0]] = [];
		}
		if (scope.element.binds[scope.params[0]].indexOf(scope.attributeExpression) === -1) {
			scope.element.binds[scope.params[0]].push(scope.attributeExpression);
		}
	},
	value: function (scope, item, helpers) {
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
			if (scope.element.type === 'textarea') {
				scope.element.innerHTML = notPath.get(scope.attributeExpression, item, helpers);
			}
			for (let t of liveEvents) {
				scope.element.addEventListener(t, onEvent);
			}
			scope.element.processedValue = true;
		}
	},
	attr: function (scope, item, helpers) {
		let res = notPath.get(scope.attributeExpression, item, helpers) || notPath.parseSubs(scope.attributeExpression, item, helpers);
		scope.attributeResult = ((typeof res === 'function') ? res({
			scope,
			item,
			helpers
		}) : res);
		scope.element.setAttribute(scope.params[0], scope.attributeResult);
	},
	name: function (scope, item, helpers) {
		scope.element.setAttribute('name', notPath.get(scope.attributeExpression, item, helpers));
	},
	change: function ( /*scope, item, helpers*/ ) {

	},
	checked: function (scope, item, helpers) {
		let result = notPath.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = ((typeof result === 'function') ? result({
			scope,
			item,
			helpers
		}) : result);
		scope.attributeResult ? scope.element.setAttribute('checked', true) : scope.element.removeAttribute('checked');
	},
	disabled: function (scope, item, helpers) {
		let result = notPath.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = ((typeof result === 'function') ? result({
			scope,
			item,
			helpers
		}) : result);
		if (scope.params.length > 0) {
			if (scope.params[0] === 'not') {
				scope.attributeResult = !scope.attributeResult;
			}
		}
		scope.attributeResult ? scope.element.setAttribute('disabled', true) : scope.element.removeAttribute('disabled');
	},
	readonly: function (scope, item, helpers) {
		let result = notPath.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = ((typeof result === 'function') ? result({
			scope,
			item,
			helpers
		}) : result);
		if (scope.params.length > 0) {
			if (scope.params[0] === 'not') {
				scope.attributeResult = !scope.attributeResult;
			}
		}
		scope.attributeResult ? scope.element.setAttribute('readonly', true) : scope.element.removeAttribute('readonly');
	},
	class: function (scope, item, helpers) {
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
	options: function (scope, item, helpers) {
		let i = 0,
			option = null,
			valueFieldName = 'value',
			labelFieldName = 'name',
			selected = false,
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
				if (helpers.field.filter && !helpers.field.filter(lib[i])) {
					continue;
				}
				option = document.createElement('option');
				option.setAttribute('value', lib[i][valueFieldName]);
				option.textContent = lib[i][labelFieldName];
				if (helpers.field.array) {
					if (item[itemValueFieldName] && Array.isArray(item[itemValueFieldName])) {
						if (item[itemValueFieldName].indexOf(lib[i][valueFieldName]) > -1) {
							option.setAttribute('selected', true);
							selected = true;
						}
					}
				} else {
					if (item[itemValueFieldName] === lib[i][valueFieldName]) {
						option.setAttribute('selected', true);
						selected = true;
					}
				}
				scope.element.appendChild(option);
			}
		}
		if (!selected && !helpers.field.array) {
			let firstOpt = scope.element.querySelector('option');
			if (firstOpt) {
				firstOpt.setAttribute('selected', true);
				item[itemValueFieldName] = firstOpt.value;
			} else {
				delete item[itemValueFieldName];
			}
		}
	},
	href: function (scope, item, helpers) {
		if (!scope.element.notRouterInitialized) {
			scope.attributeResult = notPath.parseSubs(scope.attributeExpression, item, helpers);
			scope.element.setAttribute('href', notRouter.getFullRoute(scope.attributeResult));
			scope.element.addEventListener('click', (e) => {
				e.preventDefault();
				notRouter.navigate(notPath.parseSubs(scope.attributeExpression, item, helpers));
				return false;
			});
			scope.element.notRouterInitialized = true;
		}
	},
	/*
	n-keybind-[enter|letter|digit]-[ctrl|shift|alt|meta]*="actionPath"
	*/
	keybind: function (scope, item, helpers) {
		if (scope.element.keybinds) {
			if (scope.element.keybinds.hasOwnProperty(scope.params.join('-'))) {
				if (scope.element.keybinds[scope.params.join('-')].indexOf(scope.attributeExpression) > -1) {
					return;
				}
			}
		}
		scope.element.addEventListener('keyup', (e) => {
			if (scope.attributeResult) {
				if (e.key.toLowerCase() === scope.params[0]) {
					return scope.attributeResult({
						scope,
						item,
						helpers,
						e
					});
				} else {
					return true;
				}
			} else {
				return true;
			}
		}, false);
		if (!scope.element.hasOwnProperty('binds')) {
			scope.element.keybinds = {};
		}
		if (!scope.element.keybinds.hasOwnProperty(scope.params.join('-'))) {
			scope.element.keybinds[scope.params.join('-')] = [];
		}
		if (scope.element.keybinds[scope.params.join('-')].indexOf(scope.attributeExpression) === -1) {
			scope.element.keybinds[scope.params.join('-')].push(scope.attributeExpression);
		}
	},
	src: function (scope, item, helpers) {
		if (scope.element.tagName === 'IMG') {
			let t = notPath.parseSubs(scope.attributeExpression, item, helpers);
			if (t) {
				scope.element.src = t;
				scope.element.display = 'block';
			} else {
				scope.element.display = 'none';
			}
		}
	},
	style: function (scope, item, helpers) {
		let res = notPath.get(scope.attributeExpression, item, helpers) || notPath.parseSubs(scope.attributeExpression, item, helpers);
		scope.attributeResult = ((typeof res === 'function') ? res({
			scope,
			item,
			helpers
		}) : res);
		scope.element.style[scope.params[0]] = scope.attributeResult;
	},
	list: function(scope, item, helpers) {
		let result = '';
		if(scope.params.length && helpers.hasOwnProperty(scope.params[0])){
			result = helpers[scope.params[0]]({scope, item, helpers});
		}else{
			result = scope.attributeResult.join(', ');
		}
		scope.element.innerHTML = result;
	},
};
export default notTemplateProcessorsLib;
