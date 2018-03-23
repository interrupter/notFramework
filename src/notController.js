import notCommon from './common';
import notBase from './notBase';
import notComponent from './template/notComponent';
import notPath from './notPath';

/**
* @const {string}	OPT_DEFAULT_CONTAINER_SELECTOR	selector of container HTML
*													element
*/
const OPT_DEFAULT_CONTAINER_SELECTOR = '.page-content';

/**
* @const {string}	OPT_DEFAULT_VIEWS_POSTFIX	default extension of template files
*/
const OPT_DEFAULT_VIEWS_POSTFIX = '.html';

/**
* @const {string}	OPT_DEFAULT_VIEW_NAME	default view name
*/
const OPT_DEFAULT_VIEW_NAME = 'default';

/**
* @const {boolean}	OPT_DEFAULT_RENDER_FROM_URL	enables rendering from remote
*												file templates
*/
const OPT_DEFAULT_RENDER_FROM_URL = true;

/**
* @const {string}	OPT_DEFAULT_PLURAL_NAME	default plural name of entities
*/
const OPT_DEFAULT_PLURAL_NAME = 'Models';

/**
* @const {string}	OPT_DEFAULT_SINGLE_NAME	default single name of entities
*/
const OPT_DEFAULT_SINGLE_NAME = 'Model';

/**
* @const {string}	OPT_DEFAULT_MODULE_NAME	default module name
*/
const OPT_DEFAULT_MODULE_NAME = 'main';

/**
* @const {string}	OPT_DEFAULT_RENDER_AND	default render method
*/
const OPT_DEFAULT_RENDER_AND = 'place';


/*
*	Basic class for user controller
*/
class notController extends notBase {
	/**
	*	@param {notApp} app
	*/
	constructor(app) {
		super();
		notCommon.log('start controller');
		this.app = app;
		this.setWorking({
			ready: false,
			views: {},
			libs: {},
			viewName: OPT_DEFAULT_VIEW_NAME,
			helpers: {}
		});
		this.setData({});
		this.setOptions({
			moduleName: OPT_DEFAULT_MODULE_NAME,
			containerSelector: OPT_DEFAULT_CONTAINER_SELECTOR,
			prefix: this.app.getOptions('paths.module'),
			postfix: OPT_DEFAULT_VIEWS_POSTFIX,
			renderFromURL: OPT_DEFAULT_RENDER_FROM_URL,
			names: {
				plural: OPT_DEFAULT_PLURAL_NAME,
				single: OPT_DEFAULT_SINGLE_NAME
			}
		});
		this.on('ready', this.initRender.bind(this));
		/*
			сразу делаем доступными модели notRecord из nc`ControllerName` будут доступны как this.nr`ModelName`
		*/
		let interfaces = this.app.getInterfaces();
		this.make = {};
		for (let t in interfaces) {
			if (interfaces.hasOwnProperty(t)) {
				this.make[t] = interfaces[t];
			}
		}
		return this;
	}

	/**
	* render process initialization
	*/
	initRender() {
		this.render(this.getWorking('viewName'), this.getData(), this.getWorking('helpers'));
	}

	/**
	*	Sets up actual link to template file
	*	@param {object}	view object with view options
	*/
	setViewTemplateUrl(view, viewName='default'){
		if (typeof view.templateURL === 'undefined' || view.templateURL == null || view.templateURL.length == 0) {
			let prefix = (view.common ? this.app.getOptions('paths.common') : this.getModulePrefix()),
				name = ((typeof view.name !== 'undefined' && view.name !== null && view.name.length > 0) ? view.name : viewName),
				postfix = (typeof view.postfix !== 'undefined' && view.postfix !== null && view.postfix)?view.postfix:this.getOptions('postfix');
			//генерируем адрес по шаблону
			view.templateURL = [prefix, name].join('/') + postfix;
		}
	}

	/**
	*	@param {string} viewName name of view
	*	@param {object} data data to be rendered
	*	@param {object} helpers renderer helpers
	*	@return {Promise}
	*/
	render(viewName = 'default' /* view name */ , data = {} /* data for notTemplate*/ , helpers = {} /* could be not represented */ ) {
		return new Promise((resolve, reject) => {
			var view = this.getView(viewName);

			if (typeof view === 'undefined' || view === null) {
				reject('No view found', viewName);
			} else {
				view = notCommon.extend({}, view);
				// если place не указано, что возможно и разумно при не существовании
				// элемента, но известном идентификаторе
				if (((typeof view.targetEl === 'undefined') || (view.targetEl === null)) && (typeof view.targetQuery !== 'undefined' && view.targetQuery !== null && view.targetQuery.length > 0)) {
					view.targetEl = document.querySelector(view.targetQuery);
				} else {
					view.targetEl = document.querySelector(this.getOptions('containerSelector'));
				}
				view.data = data;
				if (typeof view.helpers !== 'undefined' && view.helpers !== null && Object.keys(view.helpers).length > 0) {
					view.helpers = notCommon.extend(view.helpers, helpers);
				} else {
					view.helpers = helpers;
				}
				//если нужно загружать шаблоны
				if(typeof view.renderFromURL !== 'undefined' && view.renderFromURL !== null && view.renderFromURL){
					this.setViewTemplateUrl(view,viewName);
				}else if(this.getOptions('renderFromURL')){
					this.setViewTemplateUrl(view,viewName);
				} else {
					//а если есть название шаблона, то
					if (view.hasOwnProperty('templateName')) {
						//...
						let prefix = (typeof view.prefix !== 'undefined' && view.prefix !== null && view.prefix)?view.prefix:this.getOptions('prefix'),
							postfix = (typeof view.postfix !== 'undefined' && view.postfix !== null && view.postfix)?view.postfix:this.getOptions('postfix');
						view.templateName = prefix + view.templateName + postfix;
					}
				}
				this.setWorking('component', new notComponent({
					data,
					template: {
						name: view.templateName,
						src: view.templateURL,
					},
					events: [
						['afterRender', resolve]
					],
					options: {
						targetEl: view.targetEl,
						helpers: view.helpers,
						renderAnd: view.renderAnd || OPT_DEFAULT_RENDER_AND
					}
				}));
			}

		});
	}

	/**
	*	Returns current notApp
	*	@return {notApp}
	*/
	getApp() {
		return this.app;
	}

	/**
	*	Sets default controller model
	*	@param {notRecord}	model	notRecord interface object
	*	@return {notController}
	*/
	setModel(model) {
		this.setWorking('model', model);
		return this;
	}


	/**
	*	Returns current model
	*	@return {notRecord}
	*/
	getModel() {
		return this.setWorking('model');
	}

	/**
	*	Marks this controller as ready
	*	Triggers "ready"/"busy" events
	*	@param {Boolean}	val	true/false
	*/
	setReady(val = true) {
		this.setWorking('ready', val);
		val ? this.trigger('ready') : this.trigger('busy');
	}

	/**
	*	Sets view record
	*	@param {string} name	name of view
	*	@param {string} view	name of view file
	*	@return {notController} this
	*/
	setView(name, view) {
		this.setWorking(notPath.join('views', name), view);
		return this;
	}

	/**
	*	Sets few views
	*	@param {object} views
	*	@return {notController} this
	*/
	setViews(views) {
		for (let t in views) {
			this.setWorking(notPath.join('views', t), views[t]);
		}
		return this;
	}

	/**
	*	Gets view options by view name
	*	@param {string}	name name of the view
	*	@return {object}
	*/
	getView(name = 'default') {
		return this.getWorking(notPath.join('views', name));
	}

	/**
	*	Sets module name
	*	@param {sting} val name of the module
	*	@return {notController} this
	*/
	setModuleName(val) {
		this.setOptions('moduleName', val);
		return this;
	}

	/**
	*	Returns module name
	*	@return	{string} module name
	*/
	getModuleName() {
		return this.getOptions('moduleName');
	}

	/**
	*	Returns this module path prefix
	*	@return {string}	path to module dir
	*/
	getModulePrefix() {
		return [this.app.getOptions('paths.modules'), this.getModuleName()].join('/');
	}

	/**
	*	Preload records from server, using listAll method,
	*	returns Promise
	*	@param {object}	list	map of preloaded records
	*	@return {Promise}
	*/
	preloadLib(list = {}) {
		return new Promise((resolve, reject) => {
			if (typeof list !== 'object') {
				resolve();
			} else {
				this.setWorking('loading', []);
				for (let t in list) {
					this.getWorking('loading').push(list[t]);
					this.make[list[t]]({}).$listAll()
						.then((data) => {
							if (!this.getOptions('libs')) {
								this.setOptions('libs', {});
							}
							this.getOptions('libs')[t] = data;
							if (this.getWorking('loading').indexOf(list[t]) > -1) {
								this.getWorking('loading').splice(this.getWorking('loading').indexOf(list[t]), 1);
							}
							if (this.getWorking('loading').length === 0) {
								resolve();
							}
						})
						.catch((err) => {
							notCommon.report(err);
							reject();
						});
				}
				if (this.getWorking('loading').length === 0) {
					resolve();
				}
			}
		});
	}

	/**
	*	Adds files to upload quee
	*	@param {string}	name	name of field
	*	@param {array}	list	list of files
	*/
	queeUpload(name, list) {
		//hash (fieldName=>filesList)
		if (!this.getWorking('uploadQuee')) {
			this.setWorking('uploadQuee', {});
		}
		this.getWorking('uploadQuee')[name] = list;
	}

	/**
	*	Starts uploading of files to server
	*	@param {notRecord} item item to be passed after resolving Promise
	*	@return {Promise}
	*/
	execUploads(item) {
		let list = this.getWorking('uploadQuee');
		return new Promise((resolve, reject) => {
			if (typeof list !== 'object') {
				resolve(item);
			} else {
				this.setWorking('uploading', {});
				for (let t in list) {
					let fieldFiles = list[t];
					if (fieldFiles.length > 1) {
						item[t] = [];
					} else {
						item[t] = '';
					}
					for (let f = 0; f < fieldFiles.length; f++) {
						if (!this.getWorking('uploading').hasOwnProperty(t)) {
							this.getWorking('uploading')[t] = 0;
						}
						this.getWorking('uploading')[t]++;
						this.app.getWorking('uploader')
							.upload(fieldFiles[f])
							.then((savedFile) => {
								notCommon.log('file uploaded', t, f, savedFile);
								this.getWorking('uploading')[t]--;
								if (this.getWorking('uploading')[t] === 0) {
									delete this.getWorking('uploading')[t];
								}
								if (Array.isArray(item[f])) {
									item[t].push(savedFile.hash);
								} else {
									item[t] = savedFile.hash;
								}
								if (Object.keys(this.getWorking('uploading')).length === 0) {
									resolve(item);
								}
							})
							.catch((err) => {
								notCommon.report(err);
								reject(err);
							});
					}
				}
				if (Object.keys(this.getWorking('uploading')).length === 0) {
					resolve(item);
				}
			}
		});
	}

	/**
	* Triggers afterRender event
	*/
	onAfterRender() {
		this.trigger('afterRender');
	}

}

export default notController;
