var CommonApp = {
	startApp: (starter)=>{
		document.addEventListener('DOMContentLoaded', starter);
	},
	getApp: ()=>{
		this.get('app');
	}
};

export default CommonApp;
