import notCommon from './common';
import notBase from './notBase';
import notComponent from './template/notComponent';
import notPath from './notPath';

const OPT_DEFAULT_CONTAINER_SELECTOR = '.page-content',
	OPT_DEFAULT_VIEWS_POSTFIX = '.html',
	OPT_DEFAULT_VIEW_NAME = 'default',
	OPT_DEFAULT_RENDER_FROM_URL = true,
	OPT_DEFAULT_PLURAL_NAME = 'Models',
	OPT_DEFAULT_SINGLE_NAME = 'Model',
	OPT_DEFAULT_MODULE_NAME = 'main',
	OPT_DEFAULT_RENDER_AND = 'place';

class notController extends notBase {
	constructor(app) {
		super();
		notCommon.log('start controller');
		this.app = app;
		this.setWorking({
			ready: false,
			views: {},
			libs:{},
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
			names:{
				plural:OPT_DEFAULT_PLURAL_NAME,
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
			if (interfaces.hasOwnProperty(t)){
				this.make[t] = interfaces[t];
			}
		}
		return this;
	}

	initRender(){
		this.render(this.getWorking('viewName'), this.getData(), this.getWorking('helpers'));
	}

	render(viewName ='default' /* view name */, data = {} /* data for notTemplate*/ , helpers = {}/* could be not represented */) {
		return new Promise((resolve, reject)=>{
			var view = this.getView(viewName);

			if (typeof view === 'undefined' || view === null) {
				reject('No view found', viewName);
			}else{
				view = notCommon.extend({}, view);
				// если place не указано, что возможно и разумно при не существовании
				// элемента, но известном идентификаторе
				if (((typeof view.targetEl === 'undefined') || (view.targetEl === null)) && (typeof view.targetQuery !== 'undefined' && view.targetQuery !== null && view.targetQuery.length > 0)) {
					view.targetEl = document.querySelector(view.targetQuery);
				}else{
					view.targetEl = document.querySelector(this.getOptions('containerSelector'));
				}
				view.data = data;
				if (typeof view.helpers !== 'undefined' && view.helpers !== null && Object.keys(view.helpers).length > 0) {
					view.helpers = notCommon.extend(view.helpers, helpers);
				} else {
					view.helpers = helpers;
				}
				//если нужно загружать шаблоны
				if (this.getOptions('renderFromURL')) {
					//и адрес не указан
					if (typeof view.templateURL === 'undefined' || view.templateURL == null || view.templateURL.length == 0) {
						let prefix = (view.common ? this.app.getOptions('paths.common'): this.getModulePrefix()),
							name = ((typeof view.name !== 'undefined' && view.name !== null && view.name.length > 0) ? view.name : viewName),
							postfix = this.getOptions('postfix');
						//генерируем адрес по шаблону
						view.templateURL =  [prefix, name].join('/') + postfix;
					}
				} else {
					//а если есть название шаблона, то
					if (view.hasOwnProperty('templateName')) {
						//...
						view.templateName = this.getOptions('prefix') + view.templateName + this.getOptions('postfix');
					}
				}
				this.setWorking('component', new notComponent({
					data,
					template:{
						name: view.templateName,
						src: view.templateURL,
					},
					events:[['afterRender', resolve]],
					options:{
						targetEl: view.targetEl,
						helpers,
						renderAnd: view.renderAnd || OPT_DEFAULT_RENDER_AND
					}
				}));
			}

		});
	}

	getApp() {
		return this.app;
	}

	setModel(model) {
		this.setWorking('model', model);
		return this;
	}

	getModel() {
		return this.setWorking('model');
	}

	setReady(val = true) {
		this.setWorking('ready', val);
		val ? this.trigger('ready') : this.trigger('busy');
	}

	setView(name, view){
		this.setWorking(notPath.join('views', name), view);
		return this;
	}

	setViews(views){
		for(let t in views){
			this.setWorking(notPath.join('views', t), views[t]);
		}
		return this;
	}

	getView(name = 'default'){
		return this.getWorking(notPath.join('views', name));
	}

	setModuleName(val) {
		this.setOptions('moduleName', val);
		return this;
	}

	getModuleName() {
		return this.getOptions('moduleName');
	}

	getModulePrefix(){
		return [this.app.getOptions('paths.modules'), this.getModuleName()].join('/');
	}

	preloadLib(list = {}){
		return new Promise((resolve, reject)=>{
			if(typeof list !== 'object'){
				resolve();
			}else{
				this.setWorking('loading', []);
				for(let t in list){
					this.getWorking('loading').push(list[t]);
					this.make[list[t]]({}).$listAll()
						.then((data)=>{
							if (!this.getOptions('libs')){
								this.setOptions('libs', {});
							}
							this.getOptions('libs')[t] = data;
							if(this.getWorking('loading').indexOf(list[t]) > -1){
								this.getWorking('loading').splice(this.getWorking('loading').indexOf(list[t]), 1);
							}
							if(this.getWorking('loading').length === 0){
								resolve();
							}
						})
						.catch((err)=>{
							notCommon.report(err);
							reject();
						});
				}
				if(this.getWorking('loading').length === 0){
					resolve();
				}
			}
		});
	}

	queeUpload(name, list){
		//hash (fieldName=>filesList)
		if(!this.getWorking('uploadQuee')){
			this.setWorking('uploadQuee', {});
		}
		this.getWorking('uploadQuee')[name] = list;
	}

	execUploads(item){
		let list = this.getWorking('uploadQuee');
		return new Promise((resolve, reject)=>{
			if(typeof list !== 'object'){
				resolve(item);
			}else{
				this.setWorking('uploading', {});
				for(let t in list){
					let fieldFiles = list[t];
					if (fieldFiles.length > 1){
						item[t] = [];
					}else{
						item[t] = '';
					}
					for(let f = 0; f < fieldFiles.length; f++){
						if(!this.getWorking('uploading').hasOwnProperty(t)){
							this.getWorking('uploading')[t] = 0;
						}
						this.getWorking('uploading')[t]++;
						this.app.getWorking('uploader')
							.upload(fieldFiles[f])
							.then((savedFile) => {
								console.log('file uploaded', t,f, savedFile);
								this.getWorking('uploading')[t]--;
								if(this.getWorking('uploading')[t] === 0){
									delete this.getWorking('uploading')[t];
								}
								if(Array.isArray(item[f])){
									item[t].push(savedFile.hash);
								}else{
									item[t] = savedFile.hash;
								}
								if(Object.keys(this.getWorking('uploading')).length === 0){
									resolve(item);
								}
							})
							.catch((err)=>{
								notFramework.notCommon.report(err);
								reject();
							});
					}
				}
				if(Object.keys(this.getWorking('uploading')).length === 0){
					resolve(item);
				}
			}
		});
	}

}

export default notController;
