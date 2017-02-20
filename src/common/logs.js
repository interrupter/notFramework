var CommonLogs = {
	debug: function() {
		console.log(...arguments);
	},
	log: function() {
		console.log(...arguments);
	},
	error: function() {
		console.error(...arguments);
	},
	report: function() {
		console.error(...arguments);
	},
	trace: function() {
		console.trace(...arguments);
	},
};

export default CommonLogs;
