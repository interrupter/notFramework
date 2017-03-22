const MAP_MANAGER = Symbol('MAP_MANAGER');

var CommonShorts = {
	getAPI: function() {
		return this.getManager().getAPI();
	},
	setManager: function(v) {
		this[MAP_MANAGER] = v;
	},
	getManager: function() {
		return this[MAP_MANAGER];
	},
};

export default CommonShorts;
