const place = {
	before: function(targetEl/*, rendered*/) {
		let l = 0;
		while (targetEl.children.length - l) {
			if (targetEl.children[0].nodeName === 'NT'){
				//console.log('nt founded');
				l++;
			}else{
				//console.log('remove child ',targetEl.children[l]);
				targetEl.removeChild(targetEl.children[l]);
			}
		}
		targetEl.textContent = '';
	},
	beforeEach: function(/*targetEl, rendered*/) {},
	main: function(targetEl, rendered) {
		for (let i = 0; i < rendered.length; i++) {
			//console.log('append child ', rendered[i]);
			targetEl.appendChild(rendered[i]);
		}
	},
	afterEach: function(/*targetEl, rendered*/) {},
	after: function(/*targetEl, rendered*/) {}
};
export default place;
