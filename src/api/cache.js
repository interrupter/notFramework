import notPath from '../notPath';

class notAPICache {
	constructor(ttl = 2000) {
		this.data = {};
		this.ttl = parseInt(ttl);
		return this;
	}

	add(bucket, key, data) {
		notPath.set(notPath.join(bucket, key), {
			data,
			validTill: (new Date()).getTime() + this.ttl
		}, {}, this.data);
		return this;
	}

	find(bucket, key) {
		let r = notPath.get(notPath.join(bucket, key), this.data);
		if (r && r.validTill < (new Date()).getTime() && r.data) {
			return r.data;
		} else {
			notPath.unset(notPath.join(bucket, key), this.data);
			return undefined;
		}
	}
}

export default notAPICache;
