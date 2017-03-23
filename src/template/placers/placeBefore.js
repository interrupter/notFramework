const placeBefore = {
	before: function(/*targetEl, rendered*/) {},
	main: function(targetEl, rendered) {
		for (let i = 0; i < rendered.length; i++) {
			targetEl.parentNode.insertBefore(rendered[i], targetEl);
		}
	},
	after: function(/*targetEl, rendered*/) {},
};

export default placeBefore;
