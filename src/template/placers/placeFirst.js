const placeFirst = {
	before: function(/*targetEl, rendered*/) {},
	main: function(targetEl, rendered) {
		for (let i = rendered.length - 1; i > -1; i--) {
			//console.log('place first', i, rendered[i]);
			if (targetEl.children.length){
				//console.log('append before first');
				targetEl.insertBefore(rendered[i], targetEl.children[0]);
			}else{
				//console.log('append as first');
				targetEl.appendChild(rendered[i]);
			}
		}
	},
	after: function(/*targetEl, rendered*/) {},
};
export default placeFirst;
