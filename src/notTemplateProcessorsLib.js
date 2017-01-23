import notPath from './notPath.js';
var notTemplateProcessorsLib = {
	content:function(scope, item, helpers){
		scope.attributeResult = notPath.parseSubs(scope.attributeExpression, item, helpers);
		if (scope.params.indexOf('capitalize') > -1){
			scope.attributeResult = scope.attributeResult.toUpperCase();
		}
		scope.element.innerHTML = scope.attributeResult;
	},
	bind: function(){

	},
	value: function(){

	},
	attr: function(){

	},
	change: function(){

	}
};
export default notTemplateProcessorsLib;
