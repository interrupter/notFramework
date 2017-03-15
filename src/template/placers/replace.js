const replace = {
	before: function(/*targetEl, rendered*/) {},
	beforeEach: function(/*targetEl, rendered*/) {},
	main: function(targetEl, rendered) {
		for (let i = 0; i < rendered.length; i++) {
			targetEl.parentNode.insertBefore(rendered[i], targetEl.nextSibling);
		}

	},
	afterEach: function(targetEl/*, rendered*/) {
		if (targetEl.nodeName !== 'NT'){
			targetEl.parentNode.removeChild(targetEl);
		}
	},
	after: function(/*targetEl, rendered*/) {

	}
};

export default replace;
