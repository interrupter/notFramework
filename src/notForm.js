'use strict';
import  notComponent  from './notComponent';
const 	META_WORKING = Symbol('working'),
		META_OPTIONS = Symbol('options');

export default class notForm extends notComponent{
	constructor(options){
		super();
		this[META_WORKING] = {};
		this[META_OPTIONS] = {};
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
