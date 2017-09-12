import notCommon from '../common';
import notBase from '../notBase';
import {
	OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY,
	DEFAULT_FILTER,
	DEFAULT_PAGE_NUMBER,
	DEFAULT_PAGE_SIZE
} from './options';
import notRecord from './record.js';

export default class notInterface extends notBase {

	constructor(manifest) {
		super({});
		this.manifest = manifest;
		return this;
	}

	parseLine(line, record, actionName) {
		var recordRE = ':record[',
			fieldName = '';
		while (line.indexOf(recordRE) > -1) {
			var ind = line.indexOf(recordRE);
			var len = recordRE.length;
			var ind2 = line.indexOf(']');
			var startSlice = ind + len;
			var endSlice = ind2;
			fieldName = line.slice(startSlice, endSlice);
			if (fieldName == '') break;
			line = line.replace(':record[' + fieldName + ']', record.getAttr(fieldName));
		}
		line = line.replace(':modelName', this.manifest.model);
		line = line.replace(':actionName', actionName);
		return line;
	}

	getURL(record, actionData, actionName) {
		var line = this.parseLine(this.manifest.url, record, actionName) + ((actionData.hasOwnProperty('postFix')) ? this.parseLine(actionData.postFix, record, actionName) : '');
		return line;
	}

	getID(record, actionData) {
		let resultId,
			list = OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY,
			prefixes = ['', this.manifest.model];
		if (actionData.hasOwnProperty('index') && actionData.index) {
			list = [actionData.index].concat(OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY);
		}
		for (let pre of prefixes) {
			for (let t of list) {
				if (record.hasOwnProperty(pre + t)) {
					resultId = record[pre + t];
					break;
				}
			}
		}
		return resultId;
	}

	getActionsCount() {
		return this.getActions() ? Object.keys(this.getActions()).length : 0;
	}

	getActions() {
		return this.manifest && this.manifest.actions ? this.manifest.actions : {};
	}

	setFindBy(key, value) {
		var obj = {};
		obj[key] = value;
		return this.setFilter(obj);
	}

	setFilter(filterData = DEFAULT_FILTER) {
		return this.setWorking('filter', filterData);
	}

	resetFilter() {
		return this.setFilter({});
	}

	getFilter() {
		return this.getWorking('filter');
	}

	setSorter(sorterData) {
		return this.setWorking('sorter', sorterData);
	}

	resetSorter() {
		return this.setSorter({});
	}

	getSorter() {
		return this.getWorking('sorter');
	}

	setPageNumber(pageNumber) {
		return this.setWorking('pageNumber', pageNumber);
	}

	setPageSize(pageSize) {
		return this.setWorking('pageSize', pageSize);
	}

	setPager(pageSize = DEFAULT_PAGE_SIZE, pageNumber = DEFAULT_PAGE_NUMBER) {
		return this.setWorking('pageSize', pageSize).setWorking('pageNumber', pageNumber);
	}

	resetPager() {
		return this.setPager();
	}

	getPager() {
		return {
			pageSize: this.getWorking('pageSize'),
			pageNumber: this.getWorking('pageNumber')
		};
	}

	getModelName() {
		return this && this.manifest ? this.manifest.model : null;
	}

	getActionData(actionName) {
		return this.getActions() && this.getActions()[actionName] ? this.getActions()[actionName] : null;
	}

	collectRequestData(actionData) {
		let requestData = {};
		if ((actionData.hasOwnProperty('data')) && Array.isArray(actionData.data)) {
			for (let i = 0; i < actionData.data.length; i++) {
				let dataProviderName = 'get' + notCommon.capitalizeFirstLetter(actionData.data[i]);
				if (this[dataProviderName] && typeof this[dataProviderName] === 'function') {
					requestData = notCommon.extend(requestData, this[dataProviderName]());
				}
			}
		}
		return requestData;
	}

	encodeRequest(data) {
		let p = '?';
		for (let t in data) {
			p += encodeURIComponent(t) + '=' + encodeURIComponent(data[t]) + '&';
		}
		return p;
	}

	//return Promise
	request(record, actionName) {
		let actionData = this.getActionData(actionName),
			requestParams = this.collectRequestData(actionData),
			requestParamsEncoded = this.encodeRequest(requestParams),
			id = this.getID(record, actionData, actionName),
			apiServerURL = notCommon.getApp().getOptions('api.server.url', ''),
			url = this.getURL(record, actionData, actionName);
		return notCommon.getAPI().queeRequest(actionData.method, apiServerURL + url + requestParamsEncoded, id, JSON.stringify(record.getData()))
			.then((data) => {
				return this.afterSuccessRequest(data, actionData);
			});
	}

	afterSuccessRequest(data, actionData) {
		if (this && actionData && actionData.hasOwnProperty('isArray') && actionData.isArray) {
			for (let t = 0; t < data.length; t++) {
				data[t] = new notRecord(this.manifest, data[t]);
			}
		} else {
			data = new notRecord(this.manifest, data);
		}
		return data;
	}

	addFormFieldType(fieldName, field) {
		this.getFieldTypes()[fieldName] = field;
		return this;
	}

	addFormField(action, scenario, fieldName) {
		if (typeof this.manifest.actions[action] === 'undefined') {
			this.manifest.actions[action] = {
				fields: {}
			};
			this.manifest.actions[action].fields[scenario] = [];
		}
		if (typeof this.manifest.actions[action].fields === 'undefined') {
			this.manifest.actions[action].fields = {};
			this.manifest.actions[action].fields[scenario] = [];
		}
		if (typeof this.manifest.actions[action].fields[scenario] === 'undefined') {
			this.manifest.actions[action].fields[scenario] = [];
		}
		this.manifest.actions[action].fields[scenario].push(fieldName);
		return this;
	}

	getFieldTypes() {
		return this.manifest.fields;
	}

	getActionFormFields(action, scenario) {
		return this.manifest.actions[action].fields[scenario];
	}
}
