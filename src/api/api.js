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
		this.mark = {
			start: 0,
			end: 0,
			length: 0,
			duration: 0,
			total: {
				length: 0,
				duration: 0,
				speed: 0
			},
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
		this.markStart();
		notCommon.requestJSON(method, url, data)
			.then((response) => {
				this.markEnd(response);
				this.quee.next();
				good && good(response);
			})
			.catch((response) => {
				this.markFailed();
				this.quee.next();
				bad && bad(response);
			});
	}

	markStart() {
		this.mark.start = (new Date()).getTime();
	}

	markEnd(data) {
		this.mark.end = (new Date()).getTime();
		this.mark.duration = this.mark.end - this.mark.start;
		this.mark.length = data.length;
		this.mark.speed = data.length / (this.mark.duration / 1000);
		this.mark.history.push(this.mark.speed);
		this.mark.total.length += this.mark.length;
		this.mark.total.duration += this.mark.duration;
		this.mark.total.speed = this.mark.total.length / (this.mark.total.duration / 1000);
		this.checkSpeed();
	}

	markFailed() {
		this.mark.start = 0;
		this.mark.end = 0;
		this.mark.duration = 0;
	}

	checkSpeed() {
		if (this.mark.total.duration > this.getOptions('mark.minDelay') && this.mark.total.length > this.getOptions('mark.minLength')) {
			if (this.mark.total.speed < this.getOptions('mark.minSpeed')) {
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
}

export default notAPI;
