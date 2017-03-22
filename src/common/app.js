var CommonApp = {
	startApp: (starter)=>{
		document.addEventListener('DOMContentLoaded', starter);
	},
	getApp: function(){
		return this.get('app');
	}
};

export default CommonApp;
