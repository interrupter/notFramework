var CommonApp = {
	startApp: (starter)=>{
		document.addEventListener('DOMContentLoaded', starter);
	},
	getApp: function(){
		this.get('app');
	}
};

export default CommonApp;
