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
	OPT_DEFAULT_RENDER_AND = 'replace';

class notController extends notBase {
	constructor(app) {
		super();
		notCommon.log('start controller');
		this.app = app;
		this.setWorking({
			ready: false,
			views: {},
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
			pluralName: OPT_DEFAULT_PLURAL_NAME,
			singleName: OPT_DEFAULT_SINGLE_NAME
		});
		this.on('ready', this.initRender.bind(this));
		/*
		    сразу делаем доступными модели notRecord из nc`ControllerName` будут доступны как this.nr`ModelName`
		*/
		let interfaces = this.app.getInterfaces();
		this.make = {};
		for (let t = 0; t < interfaces.length; t++) {
			this.make[t] = interfaces[t];
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
						renderAnd: OPT_DEFAULT_RENDER_AND || view.renderAnd
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

}

export default notController;
