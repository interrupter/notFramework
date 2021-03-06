import notBase from '../notBase';
import notCommon from '../common';
import OPTS from './options';
import notTemplateCache from './notTemplateCache';
import notRenderer from './notRenderer';
import notPlacers from './placers';

const META_PARTS = Symbol('parts');
const META_INIT = Symbol('init');
/**
	input = {
		data: notRecord or [notRecord],
		template: {
			html: html(string), 		//текст с html кодом шаблона
			el: HTMLElement(object), 	//DOM элемент
			src: src(string),			//ссылка на файл с шаблоном
			name: name(string)			//название шаблона для поиска в кэше notTemplateCache
		}
		options:{
			helpers: object
			// если задать, то сразу после загрузки будет отрендерено сюда
			targetEl: HTMLElement(object) или html selector (string)
			//а это как будем помещать результат рендеринга
			renderAnd: placeStyle(string) один из вариантов
					place		-	помещаем внутри целевого элемента
					replace		-	заменяем
					placeAfter	-	после
					placeBefore	-	до
					placeFirst	-	внутри первым дочерним
					placeLast	-	внутри последним дочерним
		}
	}
*/
class notComponent extends notBase {
	constructor(input) {
		super(input);
		this.resetParts();
		this.on('ready', this.render.bind(this));
		this[META_INIT](input);
		return this;
	}

	/**
	*	Returns way to component in component tree
	*	@return {array} list of component ids
	*/
	getBreadCrumps() {
		if (this.owner) {
			return [...this.owner.getBreadCrumps(), this.getOptions('id')];
		} else {
			return [this.getOptions('id')];
		}
	}

	/**
	*	Initialization of component
	*	@param {object} input input object, structure described before
	*/
	[META_INIT](input) {
		this.input = input;
		this.owner = input.owner ? input.owner : null;
		this.initOptions(input.options ? input.options : {});
		this.initWorking(input);
		this.prepareTemplateElement(input.template ? input.template : null);
	}

	/**
	*	Initialization of component's data
	*	@param {object} val component data
	*/
	initData(val) {
		this.setData(val);
	}

	/**
	*	Initialization of events
	*	@param {object} list events hash
	*/
	initEvents(list) {
		for (let t of list) {
			this.on(...t);
		}
	}

	/**
	*	Initialization of options
	*	@param {object}	val options object
	*/
	initOptions(val) {
		this.setOptions(val);
		if (!this.getOptions('id')) {
			this.setOptions('id', OPTS.COMPONENT_ID_PREFIX + Math.random());
		}
		if (!this.getOptions('ntEl')) {
			this.initMarkElement();
		}
	}

	initMarkElement() {
		let markEl = document.createElement('nt');
		markEl.setAttribute('id', this.getOptions('id'));
		markEl.setAttribute('nt-rendered', true);
		this.setOptions('ntEl', markEl);
		let placer = this.getPlacer(this.getOptions('renderAnd')),
			targetQuery = this.getOptions('targetQuery');
		if (targetQuery) {
			let target = document.querySelector(targetQuery);
			if (target) {
				this.setOptions('targetEl', target);
			}
		}
		if (!this.getOptions('targetEl')) {			
			throw 'No target to place rendered ' + this.getOptions('id') + '@' + this.getOptions('targetQuery');
		} else {
			placer.main(this.getOptions('targetEl'), [markEl]);
		}
	}

	initWorking(val) {
		this.unsetReady(val);
	}

	prepareTemplateElement(val) {
		if (!val) {
			this.unsetReady();
		} else if (val.hasOwnProperty('html') && val.html) {
			this.setProtoTemplateElement(notTemplateCache.wrap('', '', val.html));
		} else if (val.hasOwnProperty('el') && val.el) {
			this.setProtoTemplateElement(val.el.cloneNode(true));
		} else if (val.hasOwnProperty('src') && val.src) {
			notTemplateCache.addFromURL(val.src, val.src)
				.then(this.setProtoTemplateElement.bind(this))
				.catch(notCommon.report);
		} else if (val.hasOwnProperty('name') && val.name) {
			let el = notTemplateCache.get(val.name);
			if (el){
				this.setProtoTemplateElement(el);
			}else{
				notCommon.error('Wrong template container element: ', val.name);
			}
		}
	}

	setProtoTemplateElement(cont) {
		if (cont) {
			this.setWorking('protoTemplateElement', cont);
			this.trigger('ready');
		} else {
			notCommon.error('Wrong template container element');
		}
	}

	getProtoTemplateElement() {
		return this.getWorking('protoTemplateElement');
	}

	getProtoTemplateElementClone() {
		return this.getWorking('protoTemplateElement').cloneNode(true);
	}

	getWorkingTemplateElement() {
		return this.getWorking('templateElement');
	}

	resetWorkingTemplateElement() {
		return this.setWorking('templateElement', this.getProtoTemplateElement().cloneNode(true));
	}

	setReady() {
		this.setWorking('ready', true);
	}

	unsetReady() {
		this.setWorking('ready', false);
	}

	isReady() {
		return this.setWorking('ready');
	}

	clearParts() {
		/* извещаем об удалении элементов */
		if (this[META_PARTS] && Array.isArray(this[META_PARTS]) && this[META_PARTS].length) {
			for (let t of this[META_PARTS]) {
				if (t.destroy) {
					t.destroy();
				}
			}
		}
		this.resetParts();
	}

	destroy() {
		this.clearParts();
		if (this.getOptions('ntEl') && this.getOptions('ntEl').parentNode) {
			this.getOptions('ntEl').parentNode.removeChild(this.getOptions('ntEl'));
		}
		this.dead = true;
		this.offAll();
	}

	resetParts() {
		this[META_PARTS] = [];
	}

	getParts() {
		return this[META_PARTS];
	}

	addPart(template) {
		this[META_PARTS].push(template);
	}

	render() {
		this.clearParts();
		if (this.getProtoTemplateElement()) {
			this.forEachData(this.renderPart.bind(this));
			this.placeRendered();
		}
		this.trigger('afterRender');
	}

	update() {
		this.removeObsoleteParts();
		if (this.getProtoTemplateElement()) {
			this.forEachData(this.renderPart.bind(this));
			this.placeRendered();
		}
		this.trigger('afterUpdate');
	}

	placeRendered() {
		if (this.getOptions('targetEl')) {
			let placer = this.getPlacer(this.getOptions('renderAnd'));
			placer.before(this.getOptions('targetEl'));
			this.forEachData(this.placePart.bind(this));
			placer.after(this.getOptions('targetEl'));
		} else {
			notCommon.error('no target element');
		}
	}

	placePart(data, index) {
		let part = this.getPartByData(data),
			nodes = part && part.getStash ? part.getStash() : [],
			targetEl,
			lastNode,
			placer;
		if (index === 0) {
			placer = this.getPlacer(this.getOptions('renderAnd'));
			targetEl = this.getOptions('targetEl');
		} else {
			placer = this.getPlacer(OPTS.DEFAULT_PLACER_LOOP);
			targetEl = this.getWorking('lastPlacedNode');
		}
		placer.main(targetEl, nodes);
		lastNode = targetEl;
		for (let t of nodes) {
			if (t.nodeType === 1) {
				lastNode = t;
				lastNode.setAttribute('nt-component', this.getOptions('id'));
				lastNode.setAttribute('nt-part', part.getWorking('partId'));
			}
		}
		this.setWorking('lastPlacedNode', lastNode);
	}

	getPlacer(method) {
		//notCommon.log('searching for placer', method);
		if (notPlacers.hasOwnProperty(method)) {
			return notPlacers[method];
		} else {
			return notPlacers[OPTS.DEFAULT_PLACER];
		}
	}

	forEachData(func) {
		if (Array.isArray(this.getData())) {
			for (let t = 0; t < this.getData().length; t++) {
				func(this.getData()[t], t);
			}
		} else {
			func(this.getData(), 0);
		}
	}

	forEachPart(func) {
		if (Array.isArray(this.getParts())) {
			for (let t = 0; t < this.getParts().length; t++) {
				func(this.getParts()[t], t);
			}
		}
	}

	/**
	*	если с данными не связан рендерер - создаем
	*	@param
	*/
	renderPart(data) {
		if (!this.getPartByData(data)) {
			//notCommon.log('creating part render');
			let renderer = new notRenderer({
				data: data,
				template: this.getProtoTemplateElementClone.bind(this),
				options: this.getOptions(),
				component: this
			});
			//renderer.on('obsolete', this.update.bind(this));
			this.addPart(renderer);
		} else {
			//notCommon.log('updating part render');
			this.updatePart(this.getPartByData(data));
		}
	}

	/**
	*	Updates part
	*	@param {notRender} part
	*/

	updatePart(part) {
		part.update();
	}

	/**
	*	Finds actual parts, removes all other
	*/
	removeObsoleteParts() {
		//конвеер поиск актуальных - удаление остальных
		notCommon.pipe(
			undefined, // parts to search in, can be 'undefined'
			[
				this.findActualParts.bind(this), //first round, search for obsolete
				this.removeNotActualParts.bind(this), //remove 'em
			]
		);
	}

	/**
	*	Finds actual parts
	*	if there are data and render - actual
	*	if there are not data but render presented - not actual
	*	@return {array} actual parts
	*/

	findActualParts() {
		let actualParts = [];
		this.forEachData((data /*, index*/ ) => {
			let part = this.getPartByData(data);
			if (part) {
				actualParts.push(part);
			}
		});
		return actualParts;
	}

	/**
	*	Removing parts that are not actual anymore
	* @param {array} actualParts list of actual parts
	*/
	removeNotActualParts(actualParts) {
		for (let t = 0; t < this.getParts().length; t++) {
			if (actualParts.indexOf(this.getParts()[t]) === -1) {
				this.getParts()[t].destroy();
				this.getParts().splice(t, 1);
				t--;
			}
		}
	}

	/**
	*	Searches for data piece in parts list, if finds - returns part
	*	if not - false
	*	@param {object} data data piece which have to linked to some part
	*	@return {notRender} part
	*/
	getPartByData(data) {
		for (let t in this.getParts()) {
			if (this.getParts()[t].isData(data)) {
				return this.getParts()[t];
			}
		}
		return false;
	}

	/**
	*	Showing content in DOM
	*/
	show() {

	}

	/**
	*	Hiding content in DOM
	*/
	hide() {

	}
}

export default notComponent;
