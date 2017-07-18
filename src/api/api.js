import notCommon from '../common';
import notBase from '../notBase.js';

import notAPIOptions from './options.js';
import notAPIQuee from './quee.js';
import notAPICache from './cache.js';
import notAPIConnection from './connection.js';


class notAPI extends notBase {
	constructor(options) {
		super();
		this.setOptions(notCommon.extend(notAPIOptions, options));
		this.quee = new notAPIQuee(this.getOptions('rps'));
		this.quee.run();
		this.connection = new notAPIConnection(this.getOptions('connection'));
		this.connection.run();
		this.cache = new notAPICache();
		return this;
	}

	makeUrl(parts) {
		return parts.join('/');
	}

	queeRequest(method, url, id, data, good, bad) {
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
		notCommon.requestJSON(method, url, data)
			.then((response) => {
				this.quee.next();
				good && good(response);
			})
			.catch((response) => {
				this.quee.next();
				bad && bad(response);
			});
	}

	update(obj, good, bad) {
		return new Promise((resolve, reject) => {
			let id = obj.getId(),
				modelName = obj.getModelName(),
				url = this.makeUrl([this.getOptions('base'), modelName, id]),
				data = obj.getJSON();
			this.quee.add(
				this.makeRequest.bind(this, 'post', url, id, data, (responseOK) => {
					good && good(responseOK);
					resolve(responseOK);
				}, (responseFailed) => {
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
					good && good(responseOK);
					resolve(responseOK);
				}, (responseFailed) => {
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
					good && good(responseOK);
					resolve(responseOK);
				}, (responseFailed) => {
					bad && bad(responseFailed);
					reject(responseFailed);
				})
			);
		});
	}
}

export default notAPI;
