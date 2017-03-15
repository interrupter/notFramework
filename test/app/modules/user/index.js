
class ncUser extends notFramework.notController {
	constructor(app){
		super(app);
		console.log('ncUser', ...arguments);
		this.setModuleName('user');
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

export default ncUser;
