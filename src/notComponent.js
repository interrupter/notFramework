'use strict';
import notBase from './notBase';

const META_PARTS = Symbol('parts');

export default class notComponent extends notBase{

	constructor(data, options){
		super();
		this.setData(data);
		this.setOptions(options);
		this[META_PARTS] = {};
		this.render();
		return this;
	}

	setParts(){
		this.setCommon(this[META_PARTS], arguments);
	}

	getParts(){
		return this.getCommon(this[META_PARTS], arguments);
	}

	/*
		Rendering
	*/

	render(){
		this.trigger('beforeRender');
		let anchors = this.collectAnchors();
		this.trigger('afterRender');
	}

	/*
		Presentation control
	*/

	update(){

	}

	show(){

	}

	hide(){

	}

	remove(){

	}

	replace(){

	}

	addPart(component, anchor){
		this.trigger('beforeAddPart', ...arguments);
		let partsAtAnchor = this.getParts(anchor);
		if (!Array.isArray(partsAtAnchor)){
			partsAtAnchor = [];
		}
		partsAtAnchor.push(component);
		this.setParts(anchor, partsAtAnchor);
		this.trigger('afterAddPart', ...arguments);
		return this;
	}

	/*
		direction > 0 for moving down;
		direction < 0  for moving up;
		direction = 'first' for moving to the start of array;
		direction = 'last' for moving to the end of array;
	*/

	movePart(component, anchor, direction){
		this.trigger('beforeMovePart', ...arguments);
		let partsAtAnchor = this.getParts(anchor);
		if (Array.isArray(partsAtAnchor) && partsAtAnchor.includes(component)){
			let first = 0,
				last = partsAtAnchor.length - 1,
				fromPos = partsAtAnchor.indexOf(component),
				toPos;
			switch(direction){
				case 'first': 	toPos = first;
				break;
				case 'last': 	toPos = last;
				break;
				default:
					toPos = fromPos + direction;
			}

			if (toPos > last){
				toPos = last;
			}else {
				if (toPos < first){
					toPos = first;
				}
			}

			notCommon.moveElementInArray(partsAtAnchor, fromPos, toPos);
		}
		this.setParts(anchor, partsAtAnchor);
		this.trigger('afterMovePart', ...arguments);
		return this;
	}

	removePart(component, anchor){
		this.trigger('beforeRemovePart', ...arguments);
		let partsAtAnchor = this.getParts(anchor);
		if (Array.isArray(partsAtAnchor) && partsAtAnchor.includes(component)){
			partsAtAnchor.splice(partsAtAnchor.indexOf(component), 1);
		}
		this.setParts(anchor, partsAtAnchor);
		this.trigger('afterRemovePart', ...arguments);
		return this;
	}

	/*
		Event handlers
	*/

}
