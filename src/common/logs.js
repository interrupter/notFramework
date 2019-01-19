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
	report: function(e) {
		if(notFramework.notCommon.getApp() && notFramework.notCommon.getApp().getOptions('services.errorReporter')){
			notFramework.notCommon.getApp().getOptions('services.errorReporter').report(e);
		}else{
			if(!notFramework.notCommon.get('production')){
				window[LOG].error(...arguments);
			}
		}
	},
	trace: function() {
		if(!notFramework.notCommon.get('production')){
			window[LOG].trace(...arguments);
		}
	},
	mute:function(){
		this.register('production', true);
	},
};

export default CommonLogs;
