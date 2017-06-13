import notBase from '../notBase';
import notPath from '../notPath';
import notCommon from '../common';
import notRecord from '../record';
import notComponent from '../template/notComponent';

const OPT_DEFAULT_DETAILS_PREFIX = 'details_',
	OPT_DEFAULT_ROLE_NAME = 'default',
	OPT_DEFAULT_DETAILS_TITLE = 'Details default title',
	OPT_DEFAULT_FIELD_DEFINITION = {},
	OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST = ['options', 'manifest', 'app'];

class notDetails extends notBase {
	constructor(input) {
		super(input);
		if (!this.getOptions('prefix')) {
			this.setOptions('prefix', OPT_DEFAULT_DETAILS_PREFIX);
		}
		this.setWorking('components', []);
		if (!this.getData().isRecord) {
			this.setData(new notRecord({}, this.getData()));
		}
		this.render();
		return this;
	}

	getManifest() {
		return this.getData().getManifest();
	}

	getActionData() {
		let manifest = this.getManifest();
		if (manifest && manifest.actions) {
			return manifest.actions.hasOwnProperty(this.getOptions('action')) ? manifest.actions[this.getOptions('action')] : null;
		} else {
			return null;
		}
	}

	getFieldsList() {
		let actionData = this.getActionData(),
			list = [],
			role = this.getOptions('role', OPT_DEFAULT_ROLE_NAME);
		if (actionData) {
			if (actionData.fields) {
				if (actionData.fields.hasOwnProperty(role)) {
					list = actionData.fields[role];
				}
			}
		}
		return list;
	}

	render() {
		this.renderWrapper();
	}

	getPartTemplateName(formPart) {
		return this.getOptions('prefix') + formPart;
	}

	renderWrapper() {
		if (this.getWorking('wrapper')) {
			this.getWorking('wrapper').update();
		} else {
			let input = {
				data: this.getWrapperData(),
				template: {
					name: this.getPartTemplateName('wrapper')
				},
				options: {
					helpers: this.getOptions('helpers'),
					targetEl: this.getOptions('targetEl'),
					targetQuery: this.getOptions('targetQuery'),
					id: this.getOptions('id')
				},
				events: [
					[
						['afterRender', 'afterUpdate'], this.renderComponents.bind(this)
					]
				]
			};
			let wrapper = new notComponent(input);
			this.setWorking('wrapper', wrapper);
		}
	}

	getWrapperData() {
		let actionData = this.getActionData();
		return {
			title: actionData.title ? actionData.title : OPT_DEFAULT_DETAILS_TITLE
		};
	}

	renderComponents() {
		if (this.getWorking('components') && this.getWorking('components').length) {
			for (let t = 0; t < this.getWorking('components').length; t++) {
				this.getWorking('components')[t].component.update();
			}
		} else {
			for (let t = 0; t < this.getFieldsList().length; t++) {
				let fieldName = this.getFieldsList()[t];
				this.addFieldComponent(fieldName);
			}
		}
	}

	clearFieldsComponents() {
		let comps = this.getWorking('components');
		while (comps.length > 0) {
			comps[0].component.destroy();
			comps.splice(0, 1);
		}
	}

	getFieldsLibs() {
		let result = {
			options: {},
			manifest: {},
			app: {},
		};
		if (this.getOptions('fields')) {
			result.options = this.getOptions('fields');
		}
		if (notCommon.getApp() && notCommon.getApp().getOptions('fields')) {
			result.app = notCommon.getApp().getOptions('fields');
		}
		if (this.getData().isRecord && this.getData().getManifest()) {
			result.manifest = this.getData().getManifest().fields;
		}
		return result;
	}

	getFieldsDefinition(fieldName) {
		let def = OPT_DEFAULT_FIELD_DEFINITION,
			fieldsLibs = this.getFieldsLibs();
		for (let t of OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST) {
			if (fieldsLibs.hasOwnProperty(t) && fieldsLibs[t].hasOwnProperty(fieldName)) {
				return fieldsLibs[t][fieldName];
			}
		}
		return def;
	}

	addFieldComponent(fieldName) {
		let fieldType = this.getFieldsDefinition(fieldName),
			rec = null;
		if (fieldType.component) {
			rec = this.castCustom(fieldName, fieldType);
		} else {
			rec = this.castCommon(fieldName, fieldType);
		}
		this.getWorking('components').push(rec);
	}

	castCustom(fieldName, fieldType) {
		let CustomComponent = notCommon.get('components')[fieldType.component];
		let rec = {
			field: {
				name: fieldName,
				title: fieldType.label || fieldType.placeholder,
				type: fieldType.type,
				label: fieldType.label,
				array: fieldType.array,
				default: fieldType.default,
				placeholder: fieldType.placeholder,
				options: this.getOptions(notPath.join('helpers', 'libs', fieldName))
			}
		};
		let helpers = notCommon.extend({
			isChecked: (params) => {
				return params.item.value === this.getData(fieldName);
			},
			field: rec.field,
			data: this.getData()
		}, this.getOptions('helpers'));

		rec.component = new CustomComponent({
			data: this.getData(),
			options: {
				helpers,
				targetEl: this.getTargetElement(fieldType.target),
				renderAnd: 'placeLast'
			}
		});
		return rec;
	}

	castCommon(fieldName, fieldType) {
		let rec = {
			field: {
				name: fieldName,
				title: fieldType.label || fieldType.placeholder,
				type: fieldType.type,
				label: fieldType.label,
				array: fieldType.array,
				default: fieldType.default,
				placeholder: fieldType.placeholder,
				options: this.getOptions(notPath.join('helpers', 'libs', fieldName))
			}
		};
		let helpers = notCommon.extend({
			isChecked: (params) => {
				return params.item.value === this.getData(fieldName);
			},
			field: rec.field,
			data: this.getData()
		}, this.getOptions('helpers'));
		rec.component = new notComponent({
			data: this.getData(),
			template: {
				name: this.getPartTemplateName(fieldType.type)
			},
			options: {
				helpers,
				targetEl: this.getTargetElement(fieldType.target),
				renderAnd: 'placeLast'
			}
		});
		return rec;
	}

	getTargetElement(target = 'body') {
		if (!target) {
			target = 'body';
		}
		let res = this.getOptions('targetEl').querySelector('[role="' + target + '"]');
		if (!res && target !== 'body') {
			target = 'body';
			res = this.getOptions('targetEl').querySelector('[role="' + target + '"]');
		}
		if (!res && target == 'body') {
			return this.getOptions('targetEl');
		} else {
			return res;
		}
	}

	/*
		Data management
	*/

	updateField(fieldName) {
		for (let t = 0; t < this.getWorking('components').length; t++) {
			if (this.getWorking('components')[t].field.name === fieldName) {
				this.getWorking('components')[t].component.update();
			}
		}
	}

	update() {
		for (let t = 0; t < this.getWorking('components').length; t++) {
			this.getWorking('components')[t].component.update();
		}
	}

}

export default notDetails;
