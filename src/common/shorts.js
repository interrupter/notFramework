const MANAGER = Symbol('MANAGER');

var CommonShorts = {
	getAPI: function(type) {
		return this.getManager().getAPI(type);
	},
	setManager: function(v) {
		this[MANAGER] = v;
	},
	getManager: function() {
		return this[MANAGER];
	},
};

export default CommonShorts;
