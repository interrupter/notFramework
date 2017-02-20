import notCommon from './common';
import notRecord from './notRecord';
import notComponent from './notComponent';
import notPath from './notPath';
import notView from './notView';
import notController from './notController';
import notBase from './notBase';

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
		return this;
	}

	exec() {
		var url = this.getOptions('interfaceManifestURL'),
			success = this._setInterfaceManifest.bind(this);
		$.ajax({
			dataType: "json",
			data: '',
			url: url,
			success: success
		});
	}

	_setInterfaceManifest(data) {
		this._notOptions.interfaceManifest = data;
		this._update();
	}

	_getInterfaceManifest() {
		return this._notOptions.interfaceManifest;
	}

	_update() {
		//нужно инициализировать
		//модели полученными интерфейсами
		this._updateInterfaces();
		//создание объектов автогенерация форм
		this._initFormBuilders();
		//иницилицировать и запустить контроллер инициализации
		this._initController();
		if (this.allResourcesReady()) {
			this.startApp();
		}
	}

	startApp() {
		//создать контроллеры
		//роутер и привязать к нему контроллеры
		this._initRouter();
	}

	_bindController(controllerName) {
		var ctrl = new notController(this, controllerName);
		//return function(param){
		return ctrl.exec.bind(ctrl);
		//}
	}

	_initController() {
		if (typeof(this._notOptions.initController) !== 'undefined') {
			this._working.initController = new notController(this, this._notOptions.initController);
			this._working.initController.exec();
		}
	}

	_initRouter() {
		var routieInput = {},
			that = this;
		$.each(this._notOptions.siteManifest, function(route, controllerName) {
			routieInput[route] = that._bindController(controllerName);
		});
		this._working.router = routie(routieInput);
	}

	_getCurrentController() {
		return this._working.currentController;
	}

	_setCurrentController(ctrl) {
		this._working.currentController = ctrl;
		return this;
	}

	_updateInterfaces() {
		this._clearInterfaces();
		if (this._notOptions.hasOwnProperty('interfaceManifest')) {
			$.each(this._notOptions.interfaceManifest, this._initInterface.bind(this));
		}
	}

	_getRecordName(name) {
		return 'nr' + name.capitalizeFirstLetter();
	}

	_getControllerName(name) {
		return 'nc' + name.capitalizeFirstLetter();
	}

	_initInterface(index, manifest) {
		//console.log(index, manifest);
		this._working.interfaces[this._getRecordName(index)] = new notRecord(manifest);
	}

	nr(modelName, data) {
		var manifest = this._notOptions.interfaceManifest.hasOwnProperty(modelName) ? this._notOptions.interfaceManifest[modelName] : {};
		//console.log(modelName, manifest, data);
		return new notRecord(manifest, data);
	}

	_getInterfaces() {
		return this._working.interfaces;
	}

	_clearInterfaces() {
		this._working.interfaces = {};
	}

	_initFormBuilders() {
		this._clearFormBuilders();
		if (this._notOptions.hasOwnProperty('forms')) {
			$.each(this._notOptions.forms, this._initFormBuilder.bind(this));
		}
	}

	_initFormBuilder(index, manifest) {
		//console.log('init form builder', index,  manifest);
		this._working.forms[index] = new notFormFactory(this, manifest);
		this._working.forms[index].init(this.waitThisResource('form', index));
	}

	_getFormBuilders() {
		return this._working.forms;
	}

	_clearFormBuilders() {
		this._working.forms = {};
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

	getOptions = function() {
		return this._notOptions.options;
	}
}
