const MANAGER = Symbol('MANAGER');

var CommonShorts = {
	getAPI: function() {
		return this.getManager().getAPI();
	},
	setManager: function(v) {
		this[MANAGER] = v;
	},
	getManager: function() {
		return this[MANAGER];
	},
};

export default CommonShorts;
