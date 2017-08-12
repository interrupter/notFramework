import notTable from '../components/notTable.js';
import notController from '../notController.js';
import notCommon from '../common';

const OPT_DEFAULT_PAGE_SIZE = 50,
	OPT_DEFAULT_PAGE_NUMBER = 0,
	OPT_DEFAULT_VIEW = 'list';

class CRUDList extends notController {
	constructor(parent, params) {
		super(parent.app);
		this.parent = parent;
		this.setOptions('params', params);
		notCommon.log('CRUD List');
		this.setViews({
			default: {
				name: this.parent.getOptions('views.list.name') || OPT_DEFAULT_VIEW,
				common: this.parent.getOptions('views.list.common') || true,
				targetQuery: parent.getOptions('views.list.containerSelector') || this.parent.getOptions('containerSelector'),
				helpers: this.parent.getOptions('views.list.helpers') || {}
			}
		});
		this.preloadLib(this.parent.getOptions('views.list.preload'))
			.then(this.renderWrapper.bind(this))
			.then(this.updateDatatable.bind(this))
			.then(() => {
				this.trigger('afterRender');
			})
			.catch(notCommon.report);
		return this;
	}

	renderWrapper() {
		return this.render('default', {}, {
			title: this.parent.getOptions('names.plural'),
			showAddForm: () => {
				this.parent.app.getWorking('router').navigate([this.parent.getModuleName(), 'create'].join('/'));
			},
			linkBackToList: this.parent.linkBackToList.bind(this.parent),
		});
	}

	updateDatatable() {
		return new Promise((resolve, reject) => {
			try {
				let helpers = this.parent.getOptions('views.list.helpers') || {},
					modelFactory = this.make[this.parent.getModuleName()],
					targetSelector = this.parent.getOptions('views.list.targetQuery') || this.parent.getOptions('targetQuery');
				this.tableView = new notTable({
					options: {
						procRow: this.parent.getOptions('views.list.procRow', false),
						fields: this.parent.getOptions('views.list.fields'),
						pageSize: this.getOptions('views.list.pager.size') || this.app.getOptions('pager.size') || OPT_DEFAULT_PAGE_SIZE,
						pageNumber: this.getOptions('views.list.pager.number') || this.app.getOptions('pager.number') || OPT_DEFAULT_PAGE_NUMBER,
						endless: this.parent.getOptions('views.list.endless', false),
						endlessTrigger: this.parent.getOptions('views.list.endlessTrigger', null),
						helpers: notCommon.extend({
							title: this.parent.getOptions('names.plural')
						}, helpers),
						targetEl: document.querySelector(targetSelector),
						'interface': {
							listAction: this.parent.getOptions('views.list.interface.listAction'),
							countAction: this.parent.getOptions('views.list.interface.countAction'),
							factory: this.parent.getOptions('views.list.interface.factory', modelFactory)
						}
					},
					events: [
						['afterRender', resolve]
					]
				});
			} catch (e) {
				reject(e);
			}
		});
	}

	showNextPage() {
		if (this.tableView) {
			this.tableView.loadNext();
		}
	}

}

export default CRUDList;
