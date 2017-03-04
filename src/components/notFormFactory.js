import  notComponent  from '../template/notComponent';

export default class notFormFactory extends notComponent{
	constructor(options){
		super();
		this.setOptions(options);
		this.setWorking({});
		this.on('submit', this.onSubmit);
		this.on('reset', this.onReset);
		this.on('cancel', this.onCancel);
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
