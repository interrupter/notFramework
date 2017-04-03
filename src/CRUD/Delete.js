import notController from '../notController.js';
import notCommon from '../common';

const OPT_DEFAULT_ACTION = 'delete';

class CRUDDelete extends notController{
	constructor(parent, params){
		super(parent.app);
		this.parent = parent;
		this.setOptions('params', params);
		notCommon.log('CRUD Delete');
		this.preloadLib(this.parent.getOptions('views.delete.preload')||[])
			.then(()=>{
				if (confirm('Удалить запись?')) {
					this.delete();
				}else{
					this.backToList();
				}
			});

		return this;
	}

	backToList(){
		this.parent.app.getWorking('router').navigate(this.parent.getModuleName());
	}

	delete() {
		let action ='$'+(this.parent.getOptions('views.delete.action')||OPT_DEFAULT_ACTION);
		this.make[this.parent.getModuleName()]({'_id': this.getOptions('params.0')})[action]()
			.then(this.backToList.bind(this))
			.catch(notCommon.report);
	}

}

export default CRUDDelete;
