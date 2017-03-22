class notAPIQuee{
	constructor (requestsPerSecond) {
		this.quee = [];
		this.int = null;
		this.requestsPerSecond = requestsPerSecond || 5;
		return this;
	}

	run(){
		this.int = window.setInterval(this.check.bind(this), 1000 / this.requestsPerSecond);
	}

	check(){
		if (this.inProgress){return;}
		else{
			if (this.quee.length > 0){
				this.inProgress = true;
				let toCall = this.quee.shift();
				toCall();
			}
		}
	}

	next(){
		this.inProgress = false;
	}

	add(call){
		this.quee.push(call);
	}

	pause(){
		window.clearInterval(this.int);
	}

	resume(){
		this.run();
	}
}

export default notAPIQuee;
