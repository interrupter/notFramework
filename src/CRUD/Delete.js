import notController from '../notController.js';
import notCommon from '../common';

const OPT_DEFAULT_ACTION = 'delete';

class CRUDDelete extends notController{
	constructor(parent, params){
		super(parent.app);
		this.parent = parent;
		this.setOptions('params', params);
		notCommon.log('CRUD Delete');
		this.preloadLib(this.parent.getOptions('views.delete.preload'))
			.then(()=>{
				if (confirm('Удалить запись?')) {
					this.trigger('beforeDelete', this, params);
					this.delete();
				}else{
					this.parent.backToList();
				}
			});

		return this;
	}


	delete() {
		let action ='$'+(this.parent.getOptions('views.delete.action',OPT_DEFAULT_ACTION));
		this.make[this.parent.getModuleName()]({'_id': this.getOptions('params.0')})[action]()
			.then(()=>{
				this.parent.afterAction('delete');
			})
			.catch(notCommon.report);
	}

}

export default CRUDDelete;
