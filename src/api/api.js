import notCommon from '../common';
import notBase from '../notBase.js';

import notAPIOptions from './options.js';
import notAPIQuee from './quee.js';
import notAPICache from './cache.js';
import notAPIConnection from './connection.js';


class notAPI extends notBase {
	constructor(options) {
		super();
		this.requests = [];
		this.setOptions(notCommon.extend(notAPIOptions, options));
		this.quee = new notAPIQuee(this.getOptions('rps'));
		this.quee.run();

		this.mark = {
			length: 0,
			duration: 0,
			speed: 0,
			history: []
		};
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

	markStart(xhr) {
		xhr.mark = {
			start: (new Date()).getTime(),
			end: 0,
			length: 0,
			duration: 0,
			speed: 0
		};
	}

	markEnd(xhr) {
		xhr.mark.end = (new Date()).getTime();
		xhr.mark.duration = xhr.mark.end - xhr.mark.start;
		xhr.mark.length = parseInt(xhr.getResponseHeader('Content-Length'));
		xhr.mark.speed = xhr.mark.length / (xhr.mark.duration / 1000);
		this.mark.history.push(xhr.mark.speed);
		this.mark.length += xhr.mark.length;
		this.mark.duration += xhr.mark.duration;
		this.mark.speed = this.mark.length / (this.mark.duration / 1000);
		this.checkSpeed();
	}

	markFailed(xhr) {
		xhr.mark.start = 0;
		xhr.mark.end = 0;
		xhr.mark.duration = 0;
	}

	checkSpeed() {
		if (this.mark.duration > this.getOptions('mark.minDelay') && this.mark.length > this.getOptions('mark.minLength')) {
			if (this.mark.speed < this.getOptions('mark.minSpeed')) {
				this.trigger('slowConnection');
			}
		}
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

	getConnection() {
		return this.connection;
	}
}

export default notAPI;
