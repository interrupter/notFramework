//dirty hack to remove no-console warning of eslint
/* global notFramework*/
const LOG = 'console';
var CommonLogs = {
	error: function() {
		if(!notFramework.notCommon.get('production')){
			window[LOG].error(...arguments);
		}
	},
	log: function() {
		if(!notFramework.notCommon.get('production')){
			window[LOG].log(...arguments);
		}
	},
	report: function() {
		if(!notFramework.notCommon.get('production')){
			window[LOG].error(...arguments);
		}
	},
	trace: function() {
		if(!notFramework.notCommon.get('production')){
			window[LOG].trace(...arguments);
		}
	}
};

export default CommonLogs;
