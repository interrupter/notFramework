import notCommon from './common';
import notBase from './notBase';
import notRecord from './notRecord';

export default class notInterface extends notBase{
	constructor(manifest) {
		super();
		this.manifest = manifest;
		return this;
	}

	extendObject(obj1, obj2) {
		var attrName = '';
		for (attrName in obj2) {
			if (obj2.hasOwnProperty(attrName)) {
				obj1[attrName] = obj2[attrName];
			}
		}
		return obj1;
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

	getActionsCount() {
		return this.getActions() ? Object.keys(this.getActions()).length : 0;
	}

	getActions() {
		return this.manifest && this.manifest.actions?this.manifest.actions : {};
	}

	setFindBy(key, value) {
		var obj = {};
		obj[key] = value;
		return this.setFilter(obj);
	}

	setFilter(filterData) {
		this.setModelParam('filter', filterData);
		return this;
	}

	getFilter() {
		return this.getModelParam('filter');
	}

	setSorter(sorterData) {
		this.setModelParam('sorter', sorterData);
		return this;
	}

	getSorter() {
		return this.getModelParam('sorter');
	}

	setPageNumber(pageNumber) {
		this.setModelParam('pageNumber', pageNumber);
		return this;
	}

	setPageSize(pageSize) {
		this.setModelParam('pageSize', pageSize);
		return this;
	}

	setPager(pageSize, pageNumber) {
		this.setModelParam('pageSize', pageSize).setModelParam('pageNumber', pageNumber);
		return this;
	}

	getPager() {
		return {
			pageSize: this.getModelParam('pageSize'),
			pageNumber: this.getModelParam('pageNumber')
		};
	}

	setModelParam(paramName, paramValue) {
		if (this.getOptions()) {
			this.setOptions(paramName, paramValue);
		}
		return this;
	}

	getModelParam(paramName) {
		return this.getOptions(paramName, null);
	}

	getModelName() {
		return this && this.manifest ? this.manifest.model : null;
	}

	getActionData(actionName) {
		return this.getActions() && this.getActions()[actionName] ? this.getActions()[actionName] : null;
	}

	request(record, actionName, callbackSuccess, callbackError) {
		notCommon.log('request', record, actionName, callbackSuccess, callbackError);
		let actionData = this.getActionData(actionName),
			url = this.getURL(record, actionData, actionName);
		if (actionData){
			var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
			xmlhttp.open(actionData.method, url);
			xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
			xmlhttp.responseType = 'json';
			xmlhttp.withCredentials = true;
			xmlhttp.callbackSuccess = callbackSuccess;
			xmlhttp.callbackError = callbackError;
			xmlhttp.onload = this.onLoad;
			xmlhttp.send(JSON.stringify(record.getData()));
		}
	}

	onLoad(){
		let status = this.status,
			data = this.response,
			result = [];
		if (status == 200) {
			if(this.actionData && this.actionData.hasOwnProperty('isArray') && this.actionData.isArray) {
				data.forEach((item) => {
					result.push(new notRecord(this.manifest, item));
				});
			} else {
				result = new notRecord(this.manifest, data);
			}
			this.callbackSuccess && this.callbackSuccess(result);
		} else {
			this.callbackError && this.callbackError(data);
		}
	}

	/*
	fileUpload(fileUpload) {
		var xhr = new XMLHttpRequest();
		//notCommon.log(fileUpload.file);
		if (xhr.upload && this.fileAllowed(fileUpload.file)) {
			// progress bar
			xhr.upload.addEventListener("progress", function(e) {
				fileUpload.trigger("progress", e, fileUpload);
			}, false);
			// file received/failed
			xhr.onreadystatechange = function(e) {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						var index = that.working.fileUploads.indexOf(fileUpload);
						that.working.fileUploads.splice(index, 1);
						fileUpload.trigger("success", e, fileUpload);
					} else {
						fileUpload.trigger("failure", e, fileUpload);
					}
				}
			};
			// start upload
			xhr.withCredentials = true;
			xhr.open("POST", this.getUploadUrl(), true);
			xhr.setRequestHeader("Content-Type", fileUpload.file.type);
			xhr.setRequestHeader("X_FILENAME", encodeURIComponent(fileUpload.file.name));
			xhr.send(fileUpload.file);
		} else {
			fileUpload.trigger("failure", new Event("WrongFileType"), fileUpload);
		}
	}
	*/
}
