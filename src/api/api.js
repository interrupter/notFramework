import notCommon from '../common';
import notBase from '../notBase.js';

import notAPIOptions from './options.js';
import notAPIQuee from './quee.js';


class notAPI extends  notBase{
	constructor(options) {
		super();
		this.setOptions(notCommon.extend(notAPIOptions, options));
		this.quee = new notAPIQuee(this.getOptions('rps'));
		this.quee.run();
		return this;
	}

	makeUrl(parts) {
		return parts.join('/');
	}

	queeRequest(method, url, id, data, good, bad){
		return new Promise((resolve, reject) => {
			this.quee.add(
				this.makeRequest.bind(this, method, url, id, data, (responseOK) => {
					good && good(responseOK);
					resolve(responseOK);
				}, (responseFailed) => {
					bad && bad(responseFailed);
					reject(responseFailed);
				})
			);
		});
	}

	makeRequest(method, url, id, data, good, bad) {
		notCommon.log('making request', method, url, id);
		notCommon.requestJSON(method, url, data)
			.then((response) => {
				notCommon.log('request successfull', method, url, id, response);
				this.quee.next();
				notCommon.log('response is good');
				good && good(response);
			})
			.catch((code, response) => {
				notCommon.error('request failed', method, url, id, response);
				this.quee.next();
				notCommon.log('response is bad');
				bad && bad(response);
			});
	}

	update(obj, good, bad) {
		return new Promise((resolve, reject) => {
			notCommon.log('update');
			let id = obj.getId(),
				modelName = obj.getModelName(),
				url = this.makeUrl([this.getOptions('base'), modelName, id]),
				data = obj.getJSON();
			this.quee.add(
				this.makeRequest.bind(this, 'post', url, id, data, (responseOK) => {
					notCommon.getModel().setPrice(responseOK);
					good && good(responseOK);
					resolve(responseOK);
				}, (responseFailed) => {
					notCommon.log('update failed');
					bad && bad(responseFailed);
					reject(responseFailed);
				})
			);
		});
	}

	put(obj, good, bad) {
		return new Promise((resolve, reject) => {
			let modelName = obj.getModelName(),
				data = obj.getJSON(),
				url = this.makeUrl([this.getOptions('base'), modelName]);
			this.quee.add(
				this.makeRequest.bind(this, 'put', url, null, data, (responseOK) => {
					notCommon.getModel().setPrice(responseOK);
					good && good(responseOK);
					resolve(responseOK);
				}, (responseFailed) => {
					notCommon.log('putt failed');
					bad && bad(responseFailed);
					reject(responseFailed);
				})
			);
		});
	}

	get(obj, good, bad) {
		return new Promise((resolve, reject) => {
			let id = obj.getId(),
				modelName = obj.getModelName(),
				url = this.makeUrl([this.getOptions('base'), modelName, id]);
			this.quee.add(
				this.makeRequest.bind(this, 'get', url, id, null, (responseOK) => {
					good && good(responseOK);
					resolve(responseOK);
				}, (responseFailed) => {
					notCommon.log('get failed');
					bad && bad(responseFailed);
					reject(responseFailed);
				})
			);
		});
	}

	list(obj, good, bad) {
		return new Promise((resolve, reject) => {
			let modelName = obj.getModelName(),
				url = this.makeUrl([this.getOptions('base'), modelName]);
			this.quee.add(
				this.makeRequest.bind(this, 'get', url, null, null, (responseOK) => {
					good && good(responseOK);
					resolve(responseOK);
				}, (responseFailed) => {
					notCommon.log('list failed');
					bad && bad(responseFailed);
					reject(responseFailed);
				})
			);
		});
	}

	delete(obj, good, bad) {
		return new Promise((resolve, reject) => {
			let id = obj.getId(),
				modelName = obj.getModelName(),
				url = this.makeUrl([this.getOptions('base'), modelName, id]);
			this.quee.add(
				this.makeRequest.bind(this, 'delete', url, id, null, (responseOK) => {
					notCommon.getModel().setPrice(responseOK);
					good && good(responseOK);
					resolve(responseOK);
				}, (responseFailed) => {
					notCommon.log('delete failed');
					bad && bad(responseFailed);
					reject(responseFailed);
				})
			);
		});
	}

	getUploadURL(model) {
		return this.getOptions('base') + this.getOptions('upload') + model?model.getId():'';
	}
}

export default notAPI;
