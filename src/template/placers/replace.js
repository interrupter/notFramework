const replace = {
	before: function(/*targetEl, rendered*/) {},
	beforeEach: function(/*targetEl, rendered*/) {},
	main: function(targetEl, rendered) {
		for (let i = 0; i < rendered.length; i++) {
			targetEl.parentNode.insertBefore(rendered[i], targetEl.nextSibling);
		}

	},
	afterEach: function(/*targetEl, rendered*/) {},
	after: function(targetEl/*, rendered*/) {
		console.log('should remove node', targetEl);
		if (targetEl.nodeName !== 'NT'){
			targetEl.parentNode.removeChild(targetEl);
		}
	}
};

export default replace;
