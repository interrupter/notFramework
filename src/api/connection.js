class notAPIConnection {
	constructor(opts) {
		this.int = null;
		this.opts = opts;
		this.onLine = null;
		return this;
	}

	run() {
		this.int = window.setInterval(this.check.bind(this), 1000);
	}

	check() {
		let t = window.navigator.onLine;
		if (this.onLine !== null) {
			if (this.onLine !== t) {
				this.trigger(t);
			}
		}
		this.onLine = t;
	}

	pause() {
		window.clearInterval(this.int);
	}

	resume() {
		this.run();
	}

	trigger(online = false) {
		if (online) {
			if (this.opts['onOnline']) {
				this.opts['onOnline']();
			}
		} else {
			if (this.opts['onOffline']) {
				this.opts['onOffline']();
			}
		}
	}
}

export default notAPIConnection;
