import notCommon from './common';
import notPath from './notPath';

const META_EVENTS = Symbol('events'),
	META_DATA = Symbol('data'),
	META_WORKING = Symbol('working'),
	META_OPTIONS = Symbol('options');


class notObject{
	constructor() {
		this[META_EVENTS] = {};
		this[META_DATA] = {};
		this[META_WORKING] = {};
		this[META_OPTIONS] = {};
		return this;
	}

	setCommon(what, args) {
		switch (args.length) {
		case 1:
			{
				/* set collection */
				what = args[0];
				break;
			}
		case 2:
			{
				/* set collection element */
				notPath.set(args[0] /* path */ , what /* collection */ , undefined /* helpers */ , args[1] /* value */ );
				break;
			}
		}
	}
	getCommon(what, args) {
		switch (args.length) {
			/* if we want get data by path */
		case 1:
			{
				return notPath.get(args[0], what);
			}
				/* if we want get data by path with default value */
		case 2:
			{
				let res = notPath.get(args[0], what);
				if (res === undefined) {
					/* no data, return default value */
					return args[1];
				} else {
					/* data, return it */
					return res;
				}
			}
			/* return full collection */
		default:
			{
				return what;
			}
		}
	}

	/*
		CORE OBJECT
			DATA - information
			OPTIONS - how to work
			WORKING - temporarily generated in proccess
	*/

	setData() {
		if (arguments.length === 1) {
			this[META_DATA] = arguments[0];
		} else {
			this.setCommon(this.getData(), arguments);
		}
		this.trigger('change');
	}

	getData() {
		return this.getCommon(this[META_DATA], arguments);
	}

	setOptions() {
		if (arguments.length === 1) {
			this[META_OPTIONS] = arguments[0];
		} else {
			this.setCommon(this.getOptions(), arguments);
		}
	}

	getOptions() {
		return this.getCommon(this[META_OPTIONS], arguments);
	}

	setWorking() {
		if (arguments.length === 1) {
			this[META_WORKING] = arguments[0];
		} else {
			this.setCommon(this.getWorking(), arguments);
		}
	}

	getWorking() {
		return this.getCommon(this[META_WORKING], arguments);
	}

	/*
		EVENTS handling
	*/

	on(eventNames, eventCallbacks, once) {
		if (!Array.isArray(eventNames)) {
			eventNames = [eventNames];
		}
		if (!Array.isArray(eventCallbacks)) {
			eventCallbacks = [eventCallbacks];
		}
		eventNames.forEach(name => {
			notCommon.defineIfNotExists(this[META_EVENTS], name, []);
			this[META_EVENTS][name].push({
				callbacks: eventCallbacks,
				once: once,
				count: 0
			});
		});
		return this;
	}

	trigger() {
		let args = Array.from(arguments),
			eventName = args.shift();
		if (!Array.isArray(eventName)) {
			eventName = [eventName];
		}
		eventName.forEach(name => {
			if (this[META_EVENTS].hasOwnProperty(name)) {
				this[META_EVENTS][name].forEach(event => {
					if (event.once) {
						this.off(name, event.callbacks);
					}
					event.callbacks.forEach(callback => callback(...args));
				});
			}
		});
		return this;
	}

	off(eventNames /* array of event names */ , eventCallbacks /* array of callbacks */ ) {
		if (!Array.isArray(eventNames)) {
			eventNames = [eventNames];
		}
		if (!Array.isArray(eventCallbacks)) {
			eventCallbacks = [eventCallbacks];
		}

		eventNames.forEach(name => {
			let targetId = -1;
			this[META_EVENTS][name].forEach((event, i) => {
				if (i === -1 && eventCallbacks === event.callbacks) {
					targetId = i;
				}
			});
			if (targetId > -1) {
				this[META_EVENTS][name].splice(targetId, 1);
			}
		});
		return this;
	}
}

export default notObject;
