import notCommon from './common';
import notPath from './notPath';

const META_METHOD_INIT = Symbol('init'),
    META_EVENTS = Symbol('events'),
    META_DATA = Symbol('data'),
    META_WORKING = Symbol('working'),
    META_OPTIONS = Symbol('options');

export default class notBase {
    constructor(input) {
        this[META_EVENTS] = {};
        this[META_DATA] = {};
        this[META_WORKING] = {};
        this[META_OPTIONS] = {};
        this[META_METHOD_INIT](input);
        return this;
    }

    [META_METHOD_INIT](input) {
        if (!input) {
            input = {};
        }
        if (input.hasOwnProperty('events')) {
            for (let t of input.events) {
                this.on(...t);
            }
        }

        if (input.hasOwnProperty('data')) {
            this.setData(input.data);
        }

        if (input.hasOwnProperty('working')) {
            this.setWorking(input.working);
        }

        if (input.hasOwnProperty('options')) {
            this.setOptions(input.options);
        }
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
        return this;
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
        return this;
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
        return this;
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
        return this;
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
        for (let g = 0; g < eventName.length; g++){
					let name = eventName[g];
					if (this[META_EVENTS].hasOwnProperty(name)) {
							for (let t = 0; t < this[META_EVENTS][name].length; t++) {
									let event = this[META_EVENTS][name][t];
									if (event.once) {
											this.off(name, event.callbacks);
									}
									for (var h = 0; h < event.callbacks.length; h++) {
											event.callbacks[h](...args);
									}
							}
					}
				}
        return this;
    }

    off(eventNames /* array of event names */ , eventCallbacks /* array of callbacks */ ) {
        if (!Array.isArray(eventNames)) {
            eventNames = [eventNames];
        }
        if (!Array.isArray(eventCallbacks)) {
            eventCallbacks = [eventCallbacks];
        }
				for(let g = 0; g < eventNames.length; g++){
					let name = eventNames[g];
					let targetId = -1;
					for(let h = 0; h < this[META_EVENTS][name].length; h++){
						let event = this[META_EVENTS][name][h];
						if (h === -1 && eventCallbacks === event.callbacks) {
								targetId = h;
						}
					}
					if (targetId > -1) {
							this[META_EVENTS][name].splice(targetId, 1);
					}
				}
        return this;
    }

    offAll() {
        let events = Object.keys(this[META_EVENTS]);
        for (let t = 0; t < events.length; t++) {
            if (this[META_EVENTS].hasOwnProperty(events[t])) {
                delete this[META_EVENTS][events[t]];
            }
        }
    }
}
