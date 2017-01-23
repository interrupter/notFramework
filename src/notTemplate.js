'use strict';
import notCommon from './notCommon';
import notPath from './notPath';
import notBase from './notBase';
import notTemplateCache from './notTemplateCache';
import notTemplateProcessors from './notTemplateProcessors';


const OPT_PROCESSOR_EXPRESSION_PREFIX = 'n-',
	OPT_PROCESSOR_EXPRESSION_SEPARATOR = '-',
	OPT_PROCESSOR_EXPRESSION_CONDITION_POSTFIX = 'if',
	OPT_ATTRIBUTE_EXPRESSION_ITEM_PREFIX = ':',
	OPT_ATTRIBUTE_EXPRESSION_HELPERS_PREFIX = '::',
	OPT_ATTRIBUTE_EXPRESSION_FUNCTION_POSTFIX = '()',
	OPT_ATTRIBUTE_EXPRESSION_DEFAULT_RESULT = '';

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
				url: url(string),			//ссылка на файл с шаблоном
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
		this.unsetReady();
	}

	prepareTemplateElement(val) {
		if (!val) {
			this.unsetReady();
		} else {

			if (val.hasOwnProperty('html') && val.html) {
				this.setLocalTemplateElement(notTemplateCache.wrap('', '', val.html));
			}

			if (val.hasOwnProperty('el') && val.el) {
				this.setLocalTemplateElement(val.el.cloneNode(true));
			}

			if (val.hasOwnProperty('url') && val.url) {
				notTemplateCache.getFromURL(val.url, val.url)
					.then(function(templateContElement) {
						this.setLocalTemplateElement(templateContElement);
					});
			}

			if (val.hasOwnProperty('name') && val.name) {
				this.setLocalTemplateElement(notTemplateCache.get(val.name));
			}

		}
	}

	setLocalTemplateElement(cont) {
		if (cont) {
			this.setWorking('templateElement', cont);
			console.info('templateElement ready', cont);
			this.trigger('ready');
		} else {
			console.error('Wrong template container element');
		}
	}


	getLocalTemplateElement() {
		return this.getWorking('templateElement');
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


	render() {
		if (this.getLocalTemplateElement()) {
			this.createMappingIfNotExists();
			this.execProcessors(this.getData(),0);
			this.getData().on('change', function(proxy, key, value){
				console.log('updating template after changes', proxy, key, value);
				this.execProcessors(proxy, 0);
			}.bind(this));
			this.placeRendered();
		}
	}

	placer(method){
		console.log('searching for placer', method);
		let t = {
			place: function(targetEl, rendered){
				while(targetEl.children.length){
					targetEl.removeChild(targetEl.children[0]);
				}
				for(let i = 0; i < rendered.children.length; i++){
					targetEl.appendChild(rendered.children[i]);
				}
			},
			replace: function(){},
			placeAfter: function(){},
			placeBefore: function(){},
			placeFirst: function(){},
			placeLast: function(){}
		};
		if (t.hasOwnProperty(method)){
			return t[method];
		}else{
			return t.place;
		}
	}

	placeRendered(){
		if (this.getOptions('targetEl')){
			let placer = this.placer(this.getOptions('renderAnd'));
			placer(this.getOptions('targetEl'), this.getLocalTemplateElement());
		}else{
			console.error('no target element');
		}
	}

	update() {

	}

	/* core rendering */

	createMappingIfNotExists() {
		if (!this.getWorking('mapping')) {
			this.setWorking('mapping', this.createMapping());
		}
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
		let procs = [], els = notCommon.getAttributesStartsWith(this.getLocalTemplateElement(), OPT_PROCESSOR_EXPRESSION_PREFIX);
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

	execProcessors(item, index){
		console.log('exec proccessors on current');
		let mapping = this.getWorking('mapping');
		for (let i = 0; i < mapping.length; i++) {
			let procScope = mapping[i];
			procScope.attributeResult = this.getAttributeExpressionResult(procScope.attributeExpression, item, index);
			console.log('attributeResult', procScope.attributeResult);
			let procName = procScope.processorName,
				proc = notTemplateProcessors.get(procName);
			if (proc) {
				proc(procScope, item, this.getOptions('helpers', {}));
				procScope.element.removeAttribute(procScope.processorExpression);
			}
		}

	}

	getAttributeExpressionResult(path, item, index) {
		return notPath.get(path, item, this.getOptions('helpers', {}));
	}

	/* simple utility methods*/

	hide() {

	}

	show() {

	}
}
