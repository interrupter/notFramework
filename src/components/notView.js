import notComponent from '../notBase';
import notComponent from '../template/notComponent';

class notView extends notBase {
	constructor(options) {
		super();
		this.setOptions(options);
		return this;
	}

	getTemplateOptions() {
		var defaultResult = {};
		return (typeof this.getOptions('templateOptions') !== 'undefined' && this.getOptions('templateOptions') !== null) ? this.getOptions('templateOptions'): defaultResult;
	}

	getPlaceToPut() {
		if (typeof this.getOptions('placeToPut') !== 'undefined' && this.getOptions('placeToPut') !== null) {
			return this.getOptions('placeToPut');
		}
		return document.body;
	}

	getAfterExecCallback(callback) {
		var defaultResult = function() {
			//console.log('default view after exec callback');
		};
		if (typeof callback !== 'undefined' && callback !== null) {
			return callback;
		}
		if (typeof this.getOptions('afterExec') !== 'undefined' && this.getOptions('afterExec') !== null) {
			return this.getOptions('afterExec');
		}
		return defaultResult;
	}

	exec(callback) {
		this.setWorking('component', new notComponent(this.getTemplateOptions()));
	};

	setParam(name, value) {
		this.getOptions(name, value);
		return this;
	}

	setTemplateParam(name, value) {
		this.setOptions(notPath.join('templateOptions',name), value);
		return this;
	}

	getParam(name) {
		return this.getOptions().hasOwnProperty(name) ? this.getOptions(name) : undefined;
	}

	getParams = function() {
		return this.getOptions();
	}
}

export default notView;
