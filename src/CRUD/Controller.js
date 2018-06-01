import notController from '../notController.js';
import notCommon from '../common';
import CRUDCreate from './Create';
import CRUDList from './List';
import CRUDUpdate from './Update';
import CRUDDelete from './Delete';
import CRUDDetails from './Details';


class CRUDController extends notController {
	constructor(app, params) {
		notCommon.log('running CRUDController');
		super(app);
		this.setOptions('names', {
			plural: 'plural',
			single: 'single',
		});
		this.setOptions('params', params);
		this.setOptions('containerSelector', this.app.getOptions('crud.containerSelector'));
		return this;
	}

	route(params = []) {
		if (params.length == 1) {
			if (params[0] === 'create') {
				return this.runCreate(params);
			} else {
				return this.runDetails(params);
			}
		} else if (params.length == 2) {
			if (params[1] === 'delete') {
				return this.runDelete(params);
			} else if (params[1] === 'update') {
				return this.runUpdate(params);
			} else {
				let routeRunnerName = 'run' + notCommon.capitalizeFirstLetter(params[1]);
				if (this[routeRunnerName] && typeof this[routeRunnerName] === 'function') {
					return this[routeRunnerName](params);
				}
			}
		}
		return this.runList(params);
	}

	runCreate(params = []) {
		this.view = new CRUDCreate(this, params)
			.on('beforeUpdate', this.onBeforeUpdate.bind(this))
			.on('afterRender', this.onAfterRender.bind(this));
		return this;
	}

	runList(params = []) {
		this.view = new CRUDList(this, params)
			.on('afterRender', this.onAfterRender.bind(this));
		return this;
	}

	runDetails(params = []) {
		this.view = new CRUDDetails(this, params)
			.on('afterRender', this.onAfterRender.bind(this));
		return this;
	}

	runDelete(params = []) {
		this.view = new CRUDDelete(this, params)
			.on('beforeDelete', this.onBeforeDelete.bind(this))
			.on('afterRender', this.onAfterRender.bind(this));
		return this;
	}

	runUpdate(params = []) {
		this.view = new CRUDUpdate(this, params)
			.on('beforeUpdate', this.onBeforeUpdate.bind(this))
			.on('afterRender', this.onAfterRender.bind(this));
		return this;
	}

	onAfterRender() {
		this.trigger('afterRender');
	}

	onBeforeDelete() {
		this.trigger('beforeDelete');
	}

	onBeforeUpdate() {
		this.trigger('beforeUpdate');
	}

	backToList() {
		this.app.getWorking('router').navigate(this.linkBackToList());
	}

	afterAction(action = 'list'){
		let navBack = this.app.getOptions('crud.navigateBackAfter', []);
		if(navBack && Array.isArray(navBack) && navBack.indexOf(action) > -1){
			window.history.back();
		}else{
			this.backToList();
		}
	}

	linkBackToList() {
		return this.getModelURL();
	}
}

export default CRUDController;
