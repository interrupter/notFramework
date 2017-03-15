
class ncCountry extends notFramework.notController {
	constructor(app){
		super(app);
		console.log('ncCountry', ...arguments);
		console.log('module',this.constructor.toString());
		this.setModuleName('country');
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
		return this;
	}
}

export default ncCountry;
