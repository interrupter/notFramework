import notController from '../notController.js';
import notForm from '../components/notForm.js';
import notCommon from '../common';

const OPT_DEFAULT_LOAD_ACTION = 'getRaw',
	OPT_DEFAULT_ACTION = 'update',
	OPT_DEFAULT_VIEW = 'edit';

class CRUDUpdate extends notController {
	constructor(parent, params) {
		super(parent.app);
		this.parent = parent;
		this.setOptions('params', params);
		notCommon.log('CRUD Update');
		this.setViews({
			default: {
				name: this.parent.getOptions('views.update.name') || OPT_DEFAULT_VIEW,
				common: this.parent.getOptions('views.update.common') || true,
				targetQuery: this.parent.getOptions('views.update.containerSelector') || this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});

		this.preloadLib(this.parent.getOptions('views.update.preload'))
			.then(this.loadItem.bind(this))
			.then(this.setData.bind(this))
			.then(this.renderWrapper.bind(this))
			.then(this.renderForm.bind(this))
			.then(this.onAfterRender.bind(this))
			.catch(notCommon.report);
		return this;
	}

	loadItem() {
		return this.make[this.parent.getModuleName()]({
			'_id': this.getOptions('params.0')
		})['$'+(this.parent.getOptions('views.update.loadAction') || OPT_DEFAULT_LOAD_ACTION)]();
	}

	renderWrapper() {
		return this.render('default', this.getData(), {});
	}

	renderForm() {
		return new Promise((resolve, reject)=>{
			try{
				this.form = new notForm({
					data: this.getData(),
					options: {
						action: this.parent.getOptions('views.update.action') || OPT_DEFAULT_ACTION,
						targetQuery: this.parent.getOptions('views.update.targetQuery')||this.parent.getOptions('targetQuery'),
						prefix: this.parent.getOptions('views.update.prefix')||this.parent.getOptions('prefix'),
						role: this.parent.getOptions('views.update.role')||this.parent.getOptions('role'),
						data: this.getData(),
						helpers: notCommon.extend({
							file: (params) => {
								let files = params.e.target.files || params.e.dataTransfer.files;
								notCommon.log('file changed', files);
								if(params.helpers.field.name && files){
									this.queeUpload(params.helpers.field.name, files);
								}
							},
							submit: (params) => {
								notCommon.log('submit form ', params.item);
								this.execUploads(params.item)
									.then(this.update.bind(this));
							},
							libs: this.getOptions('libs'),
							afterSubmit: this.parent.backToList.bind(this.parent),
						}, this.parent.getOptions('views.update.helpers') || {})
					},
					events: [
						[
							['afterRestore', 'afterSubmit'], this.parent.backToList.bind(this.parent)
						],
						['afterRender', resolve]
					]
				});
			}catch(e){
				reject(e);
			}
		});
	}

	update(item) {
		item['$'+(this.parent.getOptions('views.update.action')||OPT_DEFAULT_ACTION)]()
			.then((result) => {
				notCommon.log('form saved', result);
				this.parent.app.getWorking('router').navigate(this.getModuleName());
				this.parent.runList();
			})
			.catch((result) => {
				notCommon.error('form not saved', result);
			});
	}

}

export default CRUDUpdate;
