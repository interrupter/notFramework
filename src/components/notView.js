import notBase from '../notBase';
//import notPath from '../notPath';
//import notComponent from '../template/notComponent';

class notView extends notBase {
	constructor(input) {
		super();
		this.setOptions(input.options || {});
		this.setData(input.data || {});
		this.setWorking(input.working || {});
		return this;
	}

}

export default notView;
