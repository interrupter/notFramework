import notComponent from '../template/notComponent';
import notRecord from '../record';
import notCommon from '../common';
import notBase from '../notBase';

const OPT_DEFAULT_SPEED = 40,
	OPT_MARGIN = 600,
	OPT_FRAMES_COUNT = 3,
	OPT_FRAME_LENGTH = 50;
/*

	Frame based scroll. Elements inserted in frames, after frame going out of sight,
	engine remove it from DOM tree.

	input
		options
			framesCount - how many frames in DOM
			frameLength - how many items in each frame
			template - 	usual template identification object
			renderAnd - as usual
			targetEl - as usual
			helpers - as usual
			speed - speed of scrolling
			margin - distance to top/bottom border when update triggered

*/

class notScroll extends notBase {
	constructor(input) {
		super(input);
		this.setWorking('frames', []);
		this.setWorking('component', null);
		if (!this.getData().isRecord) {
			this.setData(new notRecord({}, this.getData()));
		}
		this.init();
		this.render();
		return this;
	}

	init() {
		this.addFrame([]);
		this.setWorking('shift', 0);
		this.setWorking('scroll', 0);
		this.setWorking('scrollToSecond', false);
		this.data = {
			frames: []
		};
		return this;
	}

	getFrames() {
		return this.getWorking('frames');
	}

	getLastFrame() {
		let frames = this.getWorking('frames');
		if (frames.length > 0) {
			return frames[frames.length - 1];
		} else {
			return false;
		}
	}

	add(item) {
		let frames = this.getFrames();
		if (frames.length > 0) {
			let lastFrame = this.getLastFrame();
			if (lastFrame && (lastFrame.length < this.getOptions('frameLength', OPT_FRAME_LENGTH))) {
				lastFrame.push(item);
			} else {
				this.addFrame([item]);
			}
		} else {
			this.addFrame([item]);
		}
		return this;
	}

	addMany(items) {
		for (let t of items) {
			this.add(t);
		}
		return this;
	}

	removeAll() {
		let frames = this.getFrames();
		frames.splice(0, frames.length);
		return this;
	}

	replaceMany(items) {
		this.addMany(items);
		return this;
	}

	addFrame(frame = []) {
		this.getFrames().push(frame);
		return this;
	}

	removeFromFrame(frame, item) {
		if (frame.indexOf(item) > -1) {
			frame.splice(frame.indexOf(item), 1);
		}
	}

	render() {
		return new Promise((resolve, reject) => {
			if (this.getWorking('component')) {
				this.getWorking('component').on('afterUpdate', resolve, true);
				this.getWorking('component').update();
			} else {
				let component = new notComponent({
					data: this.data,
					template: this.getOptions('template'),
					options: {
						renderAnd: this.getOptions('renderAnd'),
						targetEl: this.getOptions('targetEl'),
						helpers: notCommon.extend({}, this.getOptions('helpers'))
					},
					events: [
						[
							['afterRender'],
							[this.initScroll.bind(this)]
						],
						[
							['afterRender', 'afterUpdate'],
							[this.updateInnerContainer.bind(this) /*, this.afterUpdate.bind(this)*/ ]
						],
						[
							'afterRender',
							resolve,
							reject
						]
					]
				});
				this.setWorking('component', component);
			}
		});
	}

	updateInnerContainer() {
		this.setWorking('innerContainer', this.getOptions('targetEl').querySelector('.innerContainer'));
		return this;
	}


	initScroll() {
		if (this.getOptions('targetEl').addEventListener) {
			// IE9, Chrome, Safari, Opera
			this.getOptions('targetEl').addEventListener('mousewheel', this.onMouseScroll.bind(this), false);
			// Firefox
			this.getOptions('targetEl').addEventListener('DOMMouseScroll', this.onMouseScroll.bind(this), false);
		}
		return this;
	}

	getItemFrameIndex(item) {
		let frames = this.getFrames();
		for (let frame of frames) {
			if (frame.indexOf(item) > -1) {
				return frames.indexOf(frame);
			}
		}
		return -1;
	}

	shiftUp() {
		let t = (this.shift() - 1);
		if (t <= 0) {
			this.shift(0);
			return false;
		} else {
			this.shift(t);
			return true;
		}
	}

	shiftDown() {
		let t = (this.shift() + 1);
		if (t + this.getOptions('framesCount', OPT_FRAMES_COUNT) >= this.getFrames().length) {
			this.shift(this.getFrames().length - this.getOptions('framesCount', OPT_FRAMES_COUNT));
			return false;
		} else {
			this.shift(t);
			return true;
		}
	}

	shift(val) {
		if (typeof val !== 'undefined') {
			this.setWorking('shift', parseInt(val));
			this.log('set shift', val);
		}
		return this.getWorking('shift', 0);
	}

	scroll(val) {
		if (typeof val !== 'undefined') {
			this.setWorking('scroll', parseInt(val));
			this.log('set scroll', val);
		}
		return this.getWorking('scroll', 0);
	}

	scrollToSecond(val) {
		if (typeof val !== 'undefined') {
			this.setWorking('scrollToSecond', val);
			this.log('set scroll to second', val);
		}
		return this.getWorking('scrollToSecond', false);
	}


	isLocked() {
		this.log('check lock', this.getWorking('locked'));
		return this.getWorking('locked', false);
	}

	lock() {
		this.log('lock');
		this.setWorking('locked', true);
		return this;
	}

	unlock() {
		this.log('unlock');
		this.setWorking('locked', false);
		return this;
	}

	onMouseScroll(e) {
		if (this.isLocked()) {
			return false;
		}
		// cross-browser wheel delta
		e = window.event || e; // old IE support
		let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		let innerContainer = this.getOptions('targetEl').querySelector('.innerContainer');
		let newTop = (this.scroll() + delta * this.getOptions('speed', OPT_DEFAULT_SPEED));
		const min = 0,
			max = -parseInt(innerContainer.offsetHeight) + parseInt(innerContainer.parentNode.offsetHeight);
		if ((newTop > min - this.getOptions('margin', OPT_MARGIN)) && delta > 0) {
			if (this.shiftUp()) {
				this.log('time to change frames set');
				this.lock();
				this.scrollToSecond(true);
				this.update()
					.then(this.restoreScroll.bind(this));
				return false;
			} else {
				newTop = min;
				this.trigger('top');
			}
		}
		if ((newTop < max + this.getOptions('margin', OPT_MARGIN)) && delta < 0) {
			if (this.shiftDown()) {
				let firstFrame = this.getOptions('targetEl').querySelector('.innerContainer .scroll_frame');
				this.log('time to change frames set', firstFrame, firstFrame.offsetHeight);
				this.lock();
				this.scroll(this.scroll() + firstFrame.offsetHeight);
				this.update()
					.then(this.restoreScroll.bind(this));
				return false;
			} else {
				newTop = max;
				this.trigger('bottom');
			}
		}
		this.setInnerContainerTop(newTop);
		return false;
	}

	update() {
		return new Promise((resolve, reject) => {
			try {
				this.updateData();
				this.render()
					.then(resolve)
					.catch(reject);
			} catch (e) {
				reject(e);
			}
		});
	}


	restoreScroll() {
		let scrollTop = this.scroll();
		if (this.scrollToSecond()) {
			let firstFrame = this.getOptions('targetEl').querySelector('.innerContainer .scroll_frame');
			scrollTop = -(firstFrame.offsetHeight + this.getOptions('margin', OPT_MARGIN));
			this.log('scroll from top', scrollTop);
			this.scrollToSecond(undefined);
		}
		this.setInnerContainerTop(scrollTop);
		setTimeout(this.unlock.bind(this), 10);
		return this;
	}


	setInnerContainerTop(top) {
		this.log('setting top', top);
		this.scroll(top);
		let innerContainer = this.getOptions('targetEl').querySelector('.innerContainer');
		innerContainer.style.top = top + 'px';
		return this;
	}

	updateData() {
		this.data.__setPassive;
		this.data.frames.splice(0, this.data.frames.length);
		let frames = this.getFrames();
		for (let t = 0;
			(t < this.getOptions('framesCount', OPT_FRAMES_COUNT)) && (t + this.shift() < frames.length); t++) {
			let t1 = this.shift() + t;
			this.log('frame to show', t1);
			this.data.frames.push({
				items: frames[t1]
			});
		}
		this.data.__setActive;
		return this;
	}

}

export default notScroll;
