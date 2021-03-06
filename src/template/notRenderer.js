import notCommon from '../common';
import notPath from '../notPath';
import notBase from '../notBase';
import OPTS from './options';
import notComponent from './notComponent';
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

const META_COMPONENTS = Symbol('components');

class notRenderer extends notBase {
	/*
		input = {
			data: notRecord,
			template: element
			options:{
				helpers: object
				// если задать, то сразу после загрузки будет отрендерено сюда
				targetEl: HTMLElement(object) или html selector (string)
			}
		}
	*/

	constructor(input) {
		super();
		this[META_COMPONENTS] = {};
		this.init(input);
		this.render();
		return this;
	}

	init(input) {
		this.input = input;
		this.component = input.component;
		this.initData(input.data ? input.data : {});
		this.initOptions(input.options ? input.options : {});
		this.initWorking(input.template);
		this.initTemplate();
	}

	initTemplate() {
		this.setWorking('template', this.getWorking('getTemplate')());
	}

	initData(val) {
		this.setData(val);
		if (this.getData().isRecord) {
			this.getData().on('change', this.onChange.bind(this));
		}
	}

	initOptions(val) {
		this.setOptions(val);
	}

	initWorking(template) {
		this.setWorking({
			getTemplate: template,
			partId: this.getOptions('partId') ? this.getOptions('partId') : OPTS.PART_ID_PREFIX + Math.random(),
		});
	}

	getBreadCrumps() {
		if (this.component) {
			return [...this.component.getBreadCrumps(), this.getWorking('partId')];
		} else {
			return [this.getWorking('partId')];
		}
	}

	render() {
		this.clearStash();
		this.setWorkingMapping();
		this.execProcessors(this.getData());
		this.searchForSubTemplates();
		this.stashRendered();
	}

	onChange(proxy, key/*, value*/) {
		this.update(key);
		//this.trigger('obsolete', proxy, key, value);
	}

	update(key) {
		this.execProcessors(this.getData());
		for (let t in this[META_COMPONENTS]) {
			if ((typeof t !== 'undefined')&&(this[META_COMPONENTS].hasOwnProperty(t))){
				let item = this[META_COMPONENTS][t],
					ifPart = true;
				if (key) {
					if (item.getOptions('dataPath') === null) {
						continue;
					}
					let componentPath = notPath.normilizePath(item.getOptions('dataPath')),
						changedPath = notPath.normilizePath(key);
					ifPart = notPath.ifFullSubPath(changedPath, componentPath);
				}

				if (ifPart) {
					item.update();
				}
			}
		}
	}

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
			els = notCommon.getAttributesStartsWith(this.getWorkingTemplateElement(), OPTS.PROCESSOR_EXPRESSION_PREFIX);
		for (let j = 0; j < els.length; j++) {
			for (let i = 0, atts = els[j].attributes, n = atts.length; i < n; i++) {
				if (atts[i].nodeName.indexOf(OPTS.PROCESSOR_EXPRESSION_PREFIX) === 0) {
					//notCommon.log(atts[i]);
					let procData = this.parseProcessorExpression(atts[i].nodeName);
					procData.element = els[j];
					procData.processorExpression = atts[i].nodeName;
					procData.attributeExpression = atts[i].value;
					procData.renderer  = this;
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
		processorExpression = processorExpression.replace(OPTS.PROCESSOR_EXPRESSION_PREFIX, '');
		if (processorExpression.indexOf(OPTS.PROCESSOR_EXPRESSION_CONDITION_POSTFIX) === (processorExpression.length - OPTS.PROCESSOR_EXPRESSION_CONDITION_POSTFIX.length)) {
			result.ifCondition = true;
			processorExpression = processorExpression.replace(OPTS.PROCESSOR_EXPRESSION_SEPARATOR + OPTS.PROCESSOR_EXPRESSION_CONDITION_POSTFIX, '');
		}
		result.params = processorExpression.split(OPTS.PROCESSOR_EXPRESSION_SEPARATOR);
		result.processorName = result.params[0];
		result.params = result.params.slice(1);
		return result;
	}

	execProcessors(item, index) {
		let mapping = this.getWorking('mapping');
		if (mapping) {
			for (let i = 0; i < mapping.length; i++) {
				let procScope = mapping[i];
				procScope.attributeResult = this.getAttributeExpressionResult(procScope.attributeExpression, item, index);
				//notCommon.log('attributeResult', procScope.attributeResult);
				let procName = procScope.processorName,
					proc = notTemplateProcessors.get(procName);
				if (proc) {
					proc(procScope, item, this.getOptions('helpers', {}));
					procScope.element.removeAttribute(procScope.processorExpression);
				} else {
					notCommon.error('no processor like', procName);
				}
			}
		}
		this.trigger('rendered');
	}

	getAttributeExpressionResult(path, item, index) {
		let helpers = this.getOptions('helpers', {});
		helpers.__index = index;
		return notPath.get(path, item, helpers);
	}

	clearSubTemplates() {
		this.destroySubs();
		this.setWorking('subs', []);
	}

	destroySubs() {
		if (this.getWorking('subs')) {
			for (let t of this.getWorking('subs')) {
				t.destroy();
			}
		}
	}

	destroy() {
		this.clearSubTemplates();
		for (let t = 0; t < this.getStash().length; t++) {
			let el = this.getStash()[t];
			if (el.parentNode) {
				el.parentNode.removeChild(el);
			}
		}
	}

	ifSubElementRendered(ntEl) {
		return ntEl.attributes.ntRendered && (ntEl.attributes.ntRendered.value === 'true');
	}

	searchForSubTemplates() {
		this.clearSubTemplates();
		let subs = this.getWorkingTemplateElement().querySelectorAll(OPTS.TEMPLATE_TAG);
		//notCommon.log('sub templates', subs);
		for (let nt = 0; nt < subs.length; nt++) {
			if (!this.ifSubElementRendered(subs[nt])) {
				this.renderSub(subs[nt], nt);
			}
		}
	}

	addSub(ntEl) {
		ntEl.setAttribute('nt-rendered', true);
		let name = ntEl.attributes.name ? ntEl.attributes.name.value : '';
		this.getWorking('subs').push({
			targetEl: ntEl,
			path: ntEl.attributes.data ? ntEl.attributes.data.value : '',
			name: name,
			src: ntEl.attributes.src ? ntEl.attributes.name.src : '',
			id: ntEl.attributes.id ? ntEl.attributes.id.value : OPTS.COMPONENT_ID_PREFIX + Math.random(),
			renderedList: [],
		});
	}

	renderSub(ntEl, index=0) {
		if (!ntEl) {
			return;
		}
		let name =  ntEl.attributes.name ? ntEl.attributes.name.value : '';
		let details = {
				dataPath: ntEl.attributes.data ? ntEl.attributes.data.value : null,
				helpersPath: ntEl.attributes.helpers ? ntEl.attributes.helpers.value : null,
				place: ntEl.attributes.place ? ntEl.attributes.place.value : 'placeAfter',
				name: name,
				src: ntEl.attributes.src ? ntEl.attributes.src.value : '',
				id: ntEl.attributes.id ? ntEl.attributes.id.value : OPTS.COMPONENT_ID_PREFIX + Math.random()
			},
			options = {
				data: details.dataPath !== null ? this.getAttributeExpressionResult(details.dataPath, this.getData(), index) : null,
				template: {
					name: details.name,
					src: details.src
				},
				options: {
					helpers: this.getOptions('helpers', details.helpersPath !== null ? this.getAttributeExpressionResult(details.helpersPath, this.getData(), index) : {}),
					targetEl: ntEl,
					name: details.name,
					renderAnd: details.place,
					id: details.id,
					ntEl: ntEl,
					dataPath: details.dataPath
				},
				owner: this
			};
		ntEl.setAttribute('id', details.id);
		ntEl.setAttribute('nt-rendered', true);
		this[META_COMPONENTS][details.id] = new notComponent(options);
	}

	clearStash() {
		this.setWorking('stash', []);
	}

	getWorkingTemplateElement() {
		return this.getWorking('template');
	}

	getStash() {
		return this.getWorking('stash');
	}

	stashRendered() {
		let result = this.getWorkingTemplateElement();
		for (let t = 0; t < result.childNodes.length; t++) {
			this.addToStash(result.childNodes[t]);
		}
	}

	replaceRendered() {
		//notCommon.log('replace stash');
		let result = this.getWorkingTemplateElement(),
			stash = this.getStash(),
			newStash = [],
			anchor = stash.length > 0 ? stash[0] : this.getOptions('ntEl'),
			parentNode = anchor.parentNode;
		for (let t = 0; t < result.childNodes.length; t++) {
			newStash.push(result.childNodes[t]);
		}
		for (let t = 0; t < newStash.length; t++) {
			if (anchor.nextSibling) {
				anchor.parentNode.insertBefore(newStash[t], anchor.nextSibling);
			} else {
				anchor.parentNode.appendChild(newStash[t]);
			}
		}
		for (let t = 0; t < stash.length; t++) {
			parentNode.removeChild(stash[t]);
		}
		this.setWorking('stash', newStash);
	}

	addToStash(node) {
		this.getStash().push(node);
	}

	isData(data = {}) {
		return this.getData() === data;
	}

	hide() {

	}

	show() {

	}
}

export default notRenderer;
