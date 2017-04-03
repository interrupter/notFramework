//dirty hack to remove no-console warning of eslint
const LOG = 'console';
var CommonLogs = {
	error: function() {
		if(!this.get('production')){
			window[LOG].error(...arguments);
		}
	},
	log: function() {
		if(!this.get('production')){
			window[LOG].log(...arguments);
		}
	},
	report: function() {
		if(!this.get('production')){
			window[LOG].error(...arguments);
		}
	},
	trace: function() {
		if(!this.get('production')){
			window[LOG].trace(...arguments);
		}
	}
};

export default CommonLogs;
