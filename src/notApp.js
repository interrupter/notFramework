/* global routie */
import notCommon from './common';
import notRecord from './notRecord';
import notComponent from './template/notComponent';
import notFormFactory from './components/notFormFactory';
import notPath from './notPath';
import notView from './components/notView';
import notController from './notController';
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
		var ctrl = new notController(this, controllerName);
		return ctrl.exec.bind(ctrl);
	}

	initController() {
		if (typeof(this.getOptions('initController')) !== 'undefined') {
			this.setWorking('initController', new notController(this, this.getOptions('initController')));
			this.getWorking('initController').exec();
		}
	}

	initRouter() {
		var routieInput = {};
		this.getOptions('siteManifest').forEach((route, controllerName)=>{
			routieInput[route] = this.bindController(controllerName);
		});
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
		if (this.getOptions('interfaceManifest')) {
			this.getOptions('interfaceManifest').forEach(this.initInterface.bind(this));
		}
	}

	getRecordName(name) {
		return OPT_RECORD_PREFIX + notCommon.capitalizeFirstLetter(name);
	}

	getControllerName(name) {
		return OPT_CONTROLLER_PREFIX + notCommon.capitalizeFirstLetter(name);
	}

	initInterface(index, manifest) {
		//console.log(index, manifest);
		this.getWorking('interfaces')[this.getRecordName(index)] = new notRecord(manifest);
	}

	nr(modelName, data) {
		var manifest = this.getOptions('interfaceManifest').hasOwnProperty(modelName) ? this.getOptions('interfaceManifest')[modelName] : {};
		//console.log(modelName, manifest, data);
		return new notRecord(manifest, data);
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
		if (this.getOptions('forms')) {
			this.getOptions('forms').forEach(this.initFormBuilder.bind(this));
		}
	}

	initFormBuilder(index, manifest) {
		let path = notPath.join('forms', index);
		this.setWorking(path, new notFormFactory(this, manifest));
		this.getWorking(path).init(this.waitThisResource('form', index));
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

	getOptions() {
		return this.getOptions('options');
	}
}
