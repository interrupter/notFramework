var CommonApp = {
	startApp: (starter)=>{
		document.addEventListener('DOMContentLoaded', starter);
	},
	getApp: function(){
		return this.get('app');
	},
	extendAppConfig: (conf, conf2)=>{
		return this.deepMerge(conf, conf2);
	}
};

export default CommonApp;
