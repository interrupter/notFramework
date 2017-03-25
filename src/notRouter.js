import notBase from './notBase';
const OPT_MODE_HISTORY = Symbol('history'),
	OPT_MODE_HASH = Symbol('hash'),
	OPT_DEFAULT_CHECK_INTERVAL = 50;

class notRouter extends notBase {
	constructor() {
		super();
		this.setWorking({
			routes: [],
			mode: OPT_MODE_HISTORY,
			root: '/', //always in slashes /user/, /, /input/. and no /user or input/level
			initialized: false
		});
		return this;
	}

	history(){
		this.setWorking('mode', OPT_MODE_HISTORY);
	}

	hash(){
		this.setWorking('mode', OPT_MODE_HASH);
	}

	setRoot(root){
		this.setWorking('root', root ? '/' + this.clearSlashes(root) + '/' : '/');
		return this;
	}

	clearSlashes(path) {
		//first and last slashes removal
		return path.toString().replace(/\/$/, '').replace(/^\//, '');
	}

	add(re, handler) {
		if (typeof re == 'function') {
			handler = re;
			re = '';
		}
		let rule = {
			re: re,
			handler: handler
		};
		this.getWorking('routes').push(rule);
		return this;
	}

	addList(list) {
		for (let t in list) {
			this.add(t, list[t]);
		}
		return this;
	}

	remove(param) {
		for (var i = 0, r; i < this.getWorking('routes').length, r = this.getWorking('routes')[i]; i++) {
			if (r.handler === param || r.re === param) {
				this.getWorking('routes').splice(i, 1);
				return this;
			}
		}
		return this;
	}

	flush() {
		this.setWorking({
			routes: [],
			mode: OPT_MODE_HISTORY,
			root: '/'
		});
		return this;
	}

	isInitialized(){
		return this.getWorking('initialized');
	}

	setInitialized(val = true){
		return this.setWorking('initialized', val);
	}

	getFragment() {
		var fragment = '';
		if (this.getWorking('mode') === OPT_MODE_HISTORY) {
			if (!location) return '';
			fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
			fragment = fragment.replace(/\?(.*)$/, '');
			fragment = this.getWorking('root') != '/' ? fragment.replace(this.getWorking('root'), '') : fragment;
		} else {
			if (!window) return '';
			var match = window.location.href.match(/#(.*)$/);
			fragment = match ? match[1] : '';
		}
		return this.clearSlashes(fragment);
	}

	checkLocation(){
		let current =this.getWorking('current'),
			fragment =this.getFragment(),
			init = this.isInitialized();
		if (current !==fragment  || !init) {
			this.setWorking('current',fragment);
			this.check(fragment);
			this.setInitialized();
		}
	}

	hrefClick(){
		//console.log(...arguments);
	}

	getRoot(){
		return '';
	}

	listen(loopInterval = OPT_DEFAULT_CHECK_INTERVAL) {
		this.setWorking('current', 'notInitialized');
		clearInterval(this.getWorking('interval'));
		this.setWorking('interval', setInterval(this.checkLocation.bind(this), loopInterval));
		window.addEventListener('popstate', this.hrefClick.bind(this));
		return this;
	}

	check(f) {
		var fragment = f || this.getFragment();
		for (var i = 0; i < this.getWorking('routes').length; i++) {
			let path = this.getWorking('root') + this.getWorking('routes')[i].re;
			let fullRE =  this.clearSlashes(decodeURI(path));
			var match = fragment.match(fullRE);
			if (match) {
				match.shift();
				this.getWorking('routes')[i].handler.apply(this.host || {}, match);
				return this;
			}
		}
		return this;
	}

	navigate(path) {
		path = path ? path : '';
		switch (this.getWorking('mode')){
			case OPT_MODE_HISTORY: {
				//console.log('push state', this.getFullRoute(path));
				history.pushState(null, null, this.getFullRoute(path));
				break;
			}
			case OPT_MODE_HASH: {
				window.location.href.match(/#(.*)$/);
				window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
				break;
			}
		}
		return this;
	}

	getFullRoute(path = ''){
		return this.getWorking('root') + this.clearSlashes(path);
	}
}

export default new notRouter();
