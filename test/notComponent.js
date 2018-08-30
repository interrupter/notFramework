
templateEls = {
	title: null,
	copyrights: null,
},
targetCont = document.querySelector('#notComponent'),
item = null,
helpers = {
	title: 'Helpers title'
},

testie = {
	title: 'Item title',
	title2: 'Item title',
	class: 'active',
	status: true,
	status2:false,
	items: []
};

function addLevel(val, level = 0){
	if(level == 4){return;}
	val.items = [];
	for(let t = 0;t<2;t++){
		let item = {title: `${level} - ${t}`, value: level +''+t};
		val.items.push(level===3?item:addLevel(item, level + 1));
	}
	return val;
}
addLevel(testie,0);
console.log(targetCont);
console.log(JSON.stringify(testie, null, 4));

describe('notComponent', function() {
	before(function(done){
		notTemplateCache.addLibFromURL(urls.lib).then(()=>{
			console.log(notTemplateCache.getNames());
			testie = new notRecord({}, testie);
			done();
		});
	});
	describe('Sub-renderers', function() {

		it('depth 3', function() {
			let t = new notComponent({
				data: 		testie,
				template: {
					name: 'ncomp_3'
				},
				options: {
					helpers: helpers,
					targetEl: document.querySelector('#notComponent'),
					renderAnd: 'place'
				},
				events:[['afterRender', ()=>{

				}]]
			});
			expect(true).to.equal(true);
		});
	});

	describe('Sub-renderers live modifications', function() {
		it('depth 2', function() {
			expect(false).to.equal(true);
		});

		it('depth 3', function() {
			expect(false).to.equal(true);
		});

		it('depth 4', function() {
			expect(false).to.equal(true);
		});
	});

});
