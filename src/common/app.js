var CommonApp = {
	startApp: (starter)=>{
		document.addEventListener('DOMContentLoaded', starter);
	},
	getApp: function(){
		return this.get('app');
	},
	extendAppConfig: (conf, conf2)=>{
		return this.deepMerge(conf, conf2);
	},
	absorbModule: function(defaultConf, mod){
		for(let prop in mod){
			if (prop === 'manifest'){
				defaultConf = this.extendAppConfig(defaultConf, mod);
			}else{
				window[prop] = mod[prop];
			}
		}
		return defaultConf;
	}
};

export default CommonApp;
