import notTable from '../components/notTable.js';
import notController from '../notController.js';
import notCommon from '../common';

const OP_DEFAULT_PAGE_SIZE = 50,
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
				helpers: {}
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
				this.tableView = new notTable({
					options: {
						fields: this.parent.getOptions('views.list.fields'),
						targetEl: document.querySelector(this.parent.getOptions('views.list.targetQuery') || this.parent.getOptions('targetQuery')),
						helpers: notCommon.extend({
							title: this.parent.getOptions('names.plural')
						}, this.parent.getOptions('views.list.helpers') || {}),
						pageSize: this.app.getOptions('pager.size') || OP_DEFAULT_PAGE_SIZE,
						pageNumber: 0,
						onePager: true,
						liveLoad: true,
						interface: this.make[this.parent.getModuleName()]
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
