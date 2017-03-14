/* global routie */
import notCommon from './common';
import notRecord from './notRecord';
import notFormFactory from './components/notFormFactory';
import notPath from './notPath';
import notBase from './notBase';

const OPT_CONTROLLER_PREFIX = 'nc',
	OPT_RECORD_PREFIX = 'nr';

export default class notApp extends notBase {
	constructor(notManifest) {
		super();
		notCommon.log('start app');
		this.setOptions(notManifest);
		this.resources = {};
		this.setWorking({
			interfaces: {},
			controllers: {},
			initController: null,
			currentController: null,
			forms: {}
		});
		this.init();
		return this;
	}

	init() {
		var url = this.getOptions('interfaceManifestURL'),
			success = this.setInterfaceManifest.bind(this);
		notCommon.getJSON(url, {})
			.then(success)
			.catch(notCommon.report.bind(this));
	}

	setInterfaceManifest(manifest) {
		this.setOptions('interfaceManifest', manifest);
		this.update();
	}

	getInterfaceManifest() {
		return this.getOptions('interfaceManifest');
	}

	update() {
		//нужно инициализировать
		//модели полученными интерфейсами
		this.updateInterfaces();
		//создание объектов автогенерация форм
		this.initFormBuilders();
		//иницилицировать и запустить контроллер инициализации
		this.initController();
		if (this.allResourcesReady()) {
			this.startApp();
		}
	}

	startApp() {
		//создать контроллеры
		//роутер и привязать к нему контроллеры
		this.initRouter();
	}

	bindController(controllerName) {
		return ()=>{
			new controllerName(this);
		};
	}

	initController() {
		if (typeof(this.getOptions('initController')) !== 'undefined') {
			let initController = this.getOptions('initController');
			this.setWorking('initController', new initController(this));
		}
	}

	initRouter() {
		var routieInput = {};
		for(let route in this.getOptions('siteManifest')){
			let controllerName = this.getOptions('siteManifest')[route];
			routieInput[route] = this.bindController(controllerName);
		}
		this.setWorking('router', routie(routieInput));
	}

	getCurrentController() {
		return this.getWorking('currentController');
	}

	setCurrentController(ctrl) {
		this.setWorking('currentController', ctrl);
		return this;
	}

	updateInterfaces() {
		this.clearInterfaces();
		let manifests = this.getOptions('interfaceManifest');
		if (manifests) {
			for(let name in manifests){
				let recordManifest = manifests[name];
				this.getWorking('interfaces')[name] = (recordData) => new notRecord(recordManifest, recordData);
				window['nr' + notCommon.capitalizeFirstLetter(name)] = this.getWorking('interfaces')[name];
			}
		}
	}

	getRecordName(name) {
		return OPT_RECORD_PREFIX + notCommon.capitalizeFirstLetter(name);
	}

	getControllerName(name) {
		return OPT_CONTROLLER_PREFIX + notCommon.capitalizeFirstLetter(name);
	}

	getInterfaces() {
		return this.getWorking('interfaces');
	}

	clearInterfaces() {
		this.setWorking('interfaces', {});
		return this;
	}

	initFormBuilders() {
		this.clearFormBuilders();
		let forms = this.getOptions('forms');
		if (forms) {
			for(let t in forms){
				this.initFormBuilder(t, forms[t]);
			}
		}
	}


	initFormBuilder(index, manifest) {
		let path = notPath.join('forms', index);
		this.setWorking(path, new notFormFactory(this, manifest));
	}

	getFormBuilders() {
		return this.getWorking('forms');
	}

	clearFormBuilders() {
		this.setWorking('forms', {});
	}

	waitThisResource(type, index) {
		if (!this.resources.hasOwnProperty(type)) {
			this.resources[type] = {};
		}
		this.resources[type][index] = false;
		return this.onResourceReady.bind(this, type, index);
	}

	onResourceReady(type, index) {
		this.resources[type][index] = true;
		if (this.allResourcesReady()) {
			this.startApp();
		}
	}

	allResourcesReady() {
		var i, j;
		for (i in this.resources) {
			for (j in this.resources[i]) {
				if (!this.resources[i][j]) {
					return false;
				}
			}
		}
		return true;
	}

}
