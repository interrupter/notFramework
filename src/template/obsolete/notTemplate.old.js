/* global console*/
import notCommon from './notCommon';
import notPath from './notPath';
import notBase from './notBase';
import notTemplateProcessors from './notTemplateProcessors';


/*
 * Использует DOM поддерево в качестве шаблона.
 * Заполняет его данными.
 * Возвращает сгенерированные элементы
 *
 * */

/*

	<div n-template-name="vasya">
		<p><input type="text" n-value=":coolName"/></p>
		<p>Борис хрен попадешь и {{:coolName}}.</p>
	</div>

 */

export default class notTemplate extends notBase {
	/*
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

	constructor(input) {
		super();
		this.on('ready', this.render.bind(this));
		this.init(input);
		return this;
	}

	init(input) {
		this.input = input;
		this.initData(input.data ? input.data : {});
		this.initOptions(input.options ? input.options : {});
		this.initWorking(input);
		this.prepareTemplateElement(input.template ? input.template : null);
	}

	initData(val) {
		this.setData(val);
	}

	initOptions(val) {
		this.setOptions(val);
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
			notTemplateCache.getFromURL(val.src, val.src)
				.then(function(templateContElement) {
					this.setProtoTemplateElement(templateContElement);
				});
		} else if (val.hasOwnProperty('name') && val.name) {
			this.setProtoTemplateElement(notTemplateCache.get(val.name));
		}
	}

	setProtoTemplateElement(cont) {
		if (cont) {
			this.setWorking('protoTemplateElement', cont);
			this.trigger('ready');
		} else {
			console.error('Wrong template container element');
		}
	}

	getProtoTemplateElement(cont) {
		return this.getWorking('protoTemplateElement');
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

	onChange(proxy, key, value) {
		console.log('updating template after changes', proxy, key, value);
		this.execProcessors(proxy, 0);
	}

	renderOne(data) {
		this.resetWorkingTemplateElement();
		this.setWorkingMapping();
		this.execProcessors(data, 0);
		this.searchForSubTemplates();
		if (data.isRecord){
			data.on('change', this.onChange.bind(this));
		}
		this.stashRendered();
	}

	render() {
		this.clearStash();
		if (this.getProtoTemplateElement()) {
			if (Array.isArray(this.getData())) {
				for (let t = this.getData().length; t > 0; t--) {
					this.renderOne(this.getData()[t]);
				}
			} else {
				this.renderOne(this.getData());
			}
			this.placeStashed();
		}
	}

	placer(method) {
		console.log('searching for placer', method);
		let t = {
			place: {
				before: function(targetEl, rendered) {
					while (targetEl.children.length) {
						targetEl.removeChild(targetEl.children[0]);
					}
				},
				main: function(targetEl, rendered) {
					for (let i = 0; i < rendered.children.length; i++) {
						targetEl.appendChild(rendered.children[i]);
					}
				},
				after: function(targetEl, rendered) {}
			},
			replace: {
				before: function(targetEl, rendered) {},
				main: function(targetEl, rendered) {
					for (let i = 0; i < rendered.children.length; i++) {
						targetEl.parentNode.insertBefore(rendered.children[i], targetEl.nextSibling);
					}

				},
				after: function(targetEl, rendered) {
					targetEl.parentNode.removeChild(targetEl);
				}
			},
			placeAfter: {
				before: function(targetEl, rendered) {},
				main: function(targetEl, rendered) {
					for (let i = 0; i < rendered.children.length; i++) {
						targetEl.parentNode.insertBefore(rendered.children[i], targetEl.nextSibling);
					}
				},
				after: function(targetEl, rendered) {},
			},
			placeBefore: {
				before: function(targetEl, rendered) {},
				main: function(targetEl, rendered) {
					for (let i = 0; i < rendered.children.length; i++) {
						targetEl.parentNode.insertBefore(rendered.children[i], targetEl.nextSibling);
					}
				},
				after: function(targetEl, rendered) {},
			},
			placeFirst: {
				before: function(targetEl, rendered) {},
				main: function(targetEl, rendered) {},
				after: function(targetEl, rendered) {},
			},
			placeLast: {
				before: function(targetEl, rendered) {},
				main: function(targetEl, rendered) {},
				after: function(targetEl, rendered) {},
			},
		};
		if (t.hasOwnProperty(method)) {
			return t[method];
		} else {
			return t.place;
		}
	}

	placeRendered() {
		if (this.getOptions('targetEl')) {
			let placer = this.placer(this.getOptions('renderAnd'));
			placer(this.getOptions('targetEl'), this.getWorkingTemplateElement());
		} else {
			console.error('no target element');
		}
	}

	placeStashed() {
		if (this.getStash()) {
			let placer = this.placer(this.getOptions('renderAnd'));
			console.log('stash size', this.getStash().length);
			placer.before(this.getOptions('targetEl'));
			for (let t = 0; t < this.getStash().length; t++) {
				console.log(this.getStash()[t].innerHTML);
				placer.main(this.getOptions('targetEl'), this.getStash()[t]);
			}
			placer.after(this.getOptions('targetEl'));
		} else {
			console.error('no target element');
		}
	}

	clearStash() {
		this.setWorking('stash', []);
		this.clearHistory();
	}

	clearHistory() {
		this.setWorking('history', []);
	}

	getStash() {
		return this.getWorking('stash');
	}

	getHistory() {
		return this.getWorking('history');
	}

	stashRendered() {
		this.getStash().push(this.getWorkingTemplateElement());
	}

	update() {

	}

	/* core rendering */

	setWorkingMapping() {
		this.setWorking('mapping', this.createMapping());
	}

	/*

	Создаем карты соотвествия процессоров, путей данных в объекте и элементов шаблона.
	[{
		el,
		processor,
		working,
		item.property.path
	}]

	*/

	createMapping() {
		let result = this.findAllProcessors();
		return result;
	}

	findAllProcessors() {
		let procs = [],
			els = notCommon.getAttributesStartsWith(this.getWorkingTemplateElement(), OPT_PROCESSOR_EXPRESSION_PREFIX);
		for (let j = 0; j < els.length; j++) {
			for (let i = 0, atts = els[j].attributes, n = atts.length; i < n; i++) {
				if (atts[i].nodeName.indexOf(OPT_PROCESSOR_EXPRESSION_PREFIX) === 0) {
					console.log(atts[i]);
					let procData = this.parseProcessorExpression(atts[i].nodeName);
					procData.element = els[j];
					procData.processorExpression = atts[i].nodeName;
					procData.attributeExpression = atts[i].value;
					procs.push(procData);
				}
			}
		}
		return procs;
	}

	parseProcessorExpression(processorExpression) {
		let result = {
			params: [],
			processorName: '',
			ifCondition: false
		};
		processorExpression = processorExpression.replace(OPT_PROCESSOR_EXPRESSION_PREFIX, '');
		if (processorExpression.indexOf(OPT_PROCESSOR_EXPRESSION_CONDITION_POSTFIX) === (processorExpression.length - OPT_PROCESSOR_EXPRESSION_CONDITION_POSTFIX.length)) {
			result.ifCondition = true;
			processorExpression = processorExpression.replace(OPT_PROCESSOR_EXPRESSION_SEPARATOR + OPT_PROCESSOR_EXPRESSION_CONDITION_POSTFIX, '');
		}
		result.params = processorExpression.split(OPT_PROCESSOR_EXPRESSION_SEPARATOR);
		result.processorName = result.params[0];
		result.params = result.params.slice(1);
		return result;
	}

	execProcessors(item, index) {
		let mapping = this.getWorking('mapping');
		if (mapping){
			for (let i = 0; i < mapping.length; i++) {
				let procScope = mapping[i];
				procScope.attributeResult = this.getAttributeExpressionResult(procScope.attributeExpression, item, index);
				console.log('attributeResult', procScope.attributeResult);
				let procName = procScope.processorName,
					proc = notTemplateProcessors.get(procName);
				if (proc) {
					proc(procScope, item, this.getOptions('helpers', {}));
					procScope.element.removeAttribute(procScope.processorExpression);
				} else {
					console.error('no processor like', procName);
				}
			}
		}
		this.trigger('rendered');
	}

	getAttributeExpressionResult(path, item) {
		return notPath.get(path, item, this.getOptions('helpers', {}));
	}

	clearSubTemplates(){
		this.destroySubs();
		this.setWorking('subs', []);
	}

	destroySubs(){
		if (this.getWorking('subs')){
			for(let t of this.getWorking('subs')){
				t.destroy();
			}
		}
	}

	destroy(){

	}

	ifSubElementIsNotRendered(ntEl){
		return ntEl.attributes.ntRendered === 'true';
	}

	searchForSubTemplates() {
		this.destroySubs();
		let subs = this.getWorkingTemplateElement().querySelectorAll(OPT_TEMPLATE_TAG);
		console.log('sub templates', subs);
		for (let nt of subs) {
			if (this.ifSubElementIsNotRendered(nt)){
				this.addSub(nt);
			}
		}
	}

	addSub(ntEl){
		ntEl.setAttribute('nt-rendered', true);
		this.getWorking('subs').push({
			targetEl: ntEl,
			path: ntEl.attributes.data ? ntEl.attributes.data.value : '',
			name: ntEl.attributes.name ? ntEl.attributes.name.value : '',
			src: ntEl.attributes.src ? ntEl.attributes.name.src : '',
			renderedList: [],
		});
	}

	renderSub(ntEl) {
		if (!ntEl) {
			return;
		}
		let details = {
				dataPath: ntEl.attributes.data ? ntEl.attributes.data.value : '',
				name: ntEl.attributes.name ? ntEl.attributes.name.value : '',
				src: ntEl.attributes.src ? ntEl.attributes.name.src : '',
			},
			options = {
				data: this.getAttributeExpressionResult(details.dataPath, this.getData()),
				template: {
					name: details.name,
					src: details.src
				},
				options: {
					helpers: this.getOptions('helpers', {}),
					targetEl: ntEl,
					renderAnd: 'placeAfter'
				}
			};
		new notTemplate(options);
	}

	/* simple utility methods*/

	hide() {
		this.getWorkingTemplateElement().style.display = 'none';
	}

	show() {
		this.getWorkingTemplateElement().style.display = 'block';
	}
}
