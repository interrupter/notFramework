/* global console*/
import notCommon from './notCommon';
import notPath from './notPath';
import notBase from './notBase';
import notTemplateCache from './notTemplateCache';
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

class notTemplate extends notBase {
	constructor(input) {
		super();
		this.on('ready', this.render.bind(this));
		this.init(input);
		return this;
	}

	hide(){
		this.getWorkingTemplateElement().style.display = 'none';
	}

	show() {
		this.getWorkingTemplateElement().style.display = 'block';
	}
}

export default notTemplate;
