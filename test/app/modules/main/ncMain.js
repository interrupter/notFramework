class ncMain extends notFramework.notController {
	constructor(app, params) {
		super(app);
		this.setModuleName('main');
		this.setData(new notFramework.notRecord({}, {
			time: 0
		}));
		this.setViews({
			default: {
				common: false,
				name: 'default',
				//если не указано, по причине того что на текущий момент этот элемент не существует
				targetEl: document.querySelector('#test'),
				//смотрим здесь
				targetQuery: '#test'
			}
		});
		this.preload()
			.then(() => {
				this.setReady(true);
				setInterval(this.makeSecond.bind(this),1000);
			})
			.catch(notFramework.notCommon.report)
		return this;
	}

	preload() {
		this.setReady(false);
		return new Promise((resolve, reject) => {
			setTimeout(resolve, 5000);
		});
	}

	makeSecond(){
		this.getData().time+=1;
	}
}

export default ncMain;
