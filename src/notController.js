import notCommon from './common';
import notBase from './notBase';
import notComponent from './template/notComponent';

class notController extends notBase {
	constructor(app, controllerName) {
		super();
		notCommon.log('start controller');
		this.app = app;
		this.ncName = 'nc' + (controllerName.capitalizeFirstLetter());
		this.containerSelector = '.page-content';
		this.viewsPostfix = '.html';
		this.renderFromURL = true;
		/*
		    сразу делаем доступными модели notRecord из nc`ControllerName` будут доступны как this.nr`ModelName`
		*/
		this.app.getInterfaces().forEach((index, interfac3) => {
			if (typeof((window[this.ncName])) !== 'undefined')(window[this.ncName]).prototype[index] = interfac3;
		});
		return this;
	}

	$render(nc /* ncName function this*/ , name /* view name */ , data /* data for notTemplate*/ , helpers /* could be not represented */ , callback) {
		var view = nc.views.hasOwnProperty(name) ? nc.views[name] : null,
			realCallback,
			realHelpers;
		if (typeof view === 'undefined' || view === null) return;
		// если place не указано, что возможно и разумно при не существовании
		// элемента, но известном идентификаторе
		if (((typeof view.place === 'undefined') || (view.place === null)) && (typeof view.placeId !== 'undefined' && view.placeId !== null && view.placeId.length > 0)) {
			view.place = document.getElementById(view.placeId);
		}
		//если 4 аргумента значит, helpers  пропустили
		switch (arguments.length) {
			//переназначаем со сдвигом
			case 4:
				realCallback = helpers;
				realHelpers = {};
				break;
				//переназначаем напрямую
			default:
				realHelpers = helpers;
				realCallback = callback;
		}
		view.data = data;
		if (typeof view.helpers !== 'undefined' && view.helpers !== null && Object.keys(view.helpers).length > 0) {
			view.helpers = notCommon.extend(view.helpers, realHelpers);
		} else {
			view.helpers = realHelpers;
		}
		//если нужно загружать шаблоны
		if (nc.renderFromURL) {
			//и адрес не указан
			if (typeof view.templateURL === 'undefined' || view.templateURL == null || view.templateURL.length == 0) {
				//генерируем адрес по шаблону
				view.templateURL = (view.common ? nc.commonViewsPrefix : nc.viewsPrefix) + ((typeof view.name !== 'undefined' && view.name !== null && view.name.length > 0) ? view.name : name) + nc.viewsPostfix;
			}
		} else {
			//а если есть название шаблона, то
			if (view.hasOwnProperty('templateName')) {
				//...
				view.templateName = nc.viewsPrefix + view.templateName + nc.viewsPostfix;
			}
		}
		(new notComponent(view)).execAndPut(view.place, realCallback);
	}

	exec(params) {
		//console.log('exec', this, Object.keys(this.__proto__));
		if (typeof((window[this.ncName])) !== 'undefined') {
			//ищем имена разделяемых функций
			var sharedList = Object.keys(this.__proto__).filter(function(key) {
				return (key.indexOf('$') === 0);
			});
			//закидываем их в новую функцию
			if (sharedList.length > 0) {
				for (var k in sharedList) {
					window[this.ncName].prototype[sharedList[k]] = this.__proto__[sharedList[k]];
				}
			}
			new(window[this.ncName])(this.app, params);
			//console.log(new(window[this.ncName])(this.app, params));
			//console.log('after new controller');
		} else {

		}
	}
}

export default notController;
