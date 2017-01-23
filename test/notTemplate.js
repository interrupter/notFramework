const notTemplate = notFramework.notTemplate,
	procLib = notFramework.notTemplateProcessorsLib,
	cache = notFramework.notTemplateCache;
let templateEls = {
		title: null,
		copyrights: null,
	},
	targetCont = null,
	item = null,
	helpers = {
		title: 'Helpers title'
	},
	itemData = {
		title: 'Item title',
		title2: 'Item title',
		list: [{
			title: '1',
			value: 1,
			active: true
		}, {
			title: '3',
			value: 3,
			active: true
		}, {
			title: '2',
			value: 2,
			active: true
		}]
	};

describe("notTemplate", function() {
	before(function(){
		notTemplateProcessors.add(procLib);
	});
	describe("Content processor", function() {
		beforeEach(function() {
			templateEls.title = document.createElement('nt');
			templateEls.title.innerHTML = '<h2 n-content="Lego {:title} - {::title}"></h2>';
			templateEls.copyrights = document.createElement('nt');
			templateEls.copyrights.innerHTML = '<p>Copyrights and trademarks for everyone.</p>';
			targetCont = document.createElement('div');
			item = new notRecord({}, itemData);
		});
		it("Record and helpers", function() {
			let t = new notTemplate({
				data: item,
				template: {el: templateEls.title},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('h2')).to.be.not.null;
			expect(targetCont.querySelector('h2').innerHTML).to.be.equal('Lego Item title - Helpers title');
		});

		it("Record and helpers with back-binding on item", function() {
			let t = new notTemplate({
				data: item,
				template: {el: templateEls.title},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			console.log(targetCont);
			let res1 = targetCont.querySelector('h2').textContent;
			expect(res1).to.be.equal('Lego Item title - Helpers title');
			item.title = 'Changed Title';
			let res2 = targetCont.querySelector('h2').textContent;
			expect(res2).to.be.equal('Lego Changed Title - Helpers title');
		});
	});

});
