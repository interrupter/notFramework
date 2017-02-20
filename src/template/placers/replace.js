const replace = {
	before: function(/*targetEl, rendered*/) {},
	main: function(targetEl, rendered) {
		for (let i = 0; i < rendered.length; i++) {
			targetEl.parentNode.insertBefore(rendered[i], targetEl.nextSibling);
		}

	},
	after: function(targetEl/*, rendered*/) {
		targetEl.parentNode.removeChild(targetEl);
	}
};

export default replace;
