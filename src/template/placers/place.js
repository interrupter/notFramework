const place = {
	before: function(targetEl/*, rendered*/) {
		let l = 0;
		while (targetEl.children.length - l) {
			console.log(targetEl.nodeName);
			if (targetEl.children[0].nodeName === 'NT'){
				l++;
			}else{
				targetEl.removeChild(targetEl.children[l]);
			}
		}
	},
	beforeEach: function(targetEl/*, rendered*/) {},
	main: function(targetEl, rendered) {
		for (let i = 0; i < rendered.length; i++) {
			targetEl.appendChild(rendered[i]);
		}
	},
	afterEach: function(/*targetEl, rendered*/) {},
	after: function(/*targetEl, rendered*/) {}
};
export default place;
