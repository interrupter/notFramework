import  notBase  from '../notBase';

class notFormFactory extends notBase{
	constructor(app, manifest){
		super();
		this.setOptions({});
		this.setWorking({});
		return this;
	}

	/*
		Rendering
	*/

	render(){
		this.renderWrapper();
		this.renderComponents();
	}

	renderWrapper(){

	}

	renderComponents(){

	}

	/*
		Data management
	*/

	collectData(){

	}

	/*
		Event handlers
	*/

	onSubmit(){

	}

	onReset(){

	}

	onCancel(){

	}
}


export default notFormFactory;
