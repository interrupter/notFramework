class ncInit extends notFramework.notController {
	constructor(app, params) {
		super(app);
		this.setModuleName('main');
		this.rebuildContainer();
		return this;
	}

	rebuildContainer() {
		document.getElementById("test").innerHTML = '<h1>Контроллер инициализации отработал, через 5 секунд подрубиться main контроллер, загрузит и отрендерит шаблон с простой связкой с данными</h1>';
	}
}

export default ncInit;
