const placeLast = {
	before: function(/*targetEl, rendered*/) {},
	main: function(targetEl, rendered) {
		for (let i = 0; i < rendered.length; i++) {
			targetEl.appendChild(rendered[i]);
		}
	},
	after: function(/*targetEl, rendered*/) {},
};

export default placeLast;
