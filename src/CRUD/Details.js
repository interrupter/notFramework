import notController from '../notController.js';
import notDetails from '../components/notDetails.js';
import notCommon from '../common';
import {OPT_DEFAULT_RENDER_FROM_URL,OPT_DEFAULT_COMMON} from './const.js';

const OPT_DEFAULT_LOAD_ACTION = 'get',
	OPT_DEFAULT_VIEW = 'details';

class CRUDDetails extends notController {
	constructor(parent, params) {
		super(parent.app);
		this.parent = parent;
		this.setOptions('params', params);
		notCommon.log('CRUD Details');
		this.setViews({
			default: {
				name: this.parent.getOptions('views.details.name') || OPT_DEFAULT_VIEW,
				renderFromURL:	this.parent.getOptions('views.list.renderFromURL') || OPT_DEFAULT_RENDER_FROM_URL,
				common: 		this.parent.getOptions('views.list.common') || OPT_DEFAULT_COMMON,
				targetQuery: this.parent.getOptions('views.details.containerSelector') || this.parent.getOptions('containerSelector'),
				helpers: this.parent.getOptions('views.details.name') || {},
			}
		});

		this.preloadLib(this.parent.getOptions('views.details.preload'))
			.then(this.loadItem.bind(this))
			.then(this.setData.bind(this))
			.then(this.renderWrapper.bind(this))
			.then(this.renderDetails.bind(this))
			.then(() => {
				this.trigger('afterRender');
			})
			.catch(notCommon.report);
		return this;
	}

	loadItem() {
		return this.make[this.parent.getModuleName()]({
			'_id': this.getOptions('params.0')
		})['$' + (this.parent.getOptions('views.details.action') || OPT_DEFAULT_LOAD_ACTION)]();
	}


	renderWrapper() {
		let item = this.getData();
		var helpers = {
			ID: item ? item[this.parent.getModuleName() + 'ID'] : '',
			field: {
				array: false
			},
			update: (params) => {
				this.app.getWorking('router').navigate([this.parent.getModuleName(), params.item._id, 'update'].join('/'));
			},
			delete: (params) => {
				this.app.getWorking('router').navigate([this.parent.getModuleName(), params.item._id, 'delete'].join('/'));
			},
			linkBackToList: this.parent.linkBackToList.bind(this.parent),
			title: this.parent.getOptions('names.single')
		};
		return this.render('default', item, helpers);
	}

	renderDetails() {
		let item = this.getData();
		return new Promise((resolve, reject) => {
			try {
				new notDetails({
					data: item,
					options: {
						targetQuery: this.parent.getOptions('views.details.targetQuery'),
						targetEl: document.querySelector(this.parent.getOptions('views.details.targetQuery') || this.parent.getOptions('targetQuery')),
						action: this.parent.getOptions('views.details.action') || OPT_DEFAULT_LOAD_ACTION,
						prefix: this.parent.getOptions('views.details.prefix') || this.parent.getOptions('prefix'),
						role: this.parent.getOptions('views.details.role') || this.parent.getOptions('role'),
						helpers: notCommon.extend({
							linkBackToList: this.parent.linkBackToList(),
							libs: this.getOptions('lib'),
							ID: item[this.parent.getModuleName() + 'ID'],
							__version: item.__version,
						}, this.parent.getOptions('views.details.helpers') || {})
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

}

export default CRUDDetails;
