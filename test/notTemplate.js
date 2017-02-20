const notComponent = notFramework.notComponent,
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
		class: 'active',
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
			item = new notRecord({}, notCommon.completeAssign({}, itemData));
		});
		it("Record and helpers", function() {
			let t = new notComponent({
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
			let t = new notComponent({
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

	describe("Name processor", function() {
		beforeEach(function() {
			templateEls.title = document.createElement('nt');
			templateEls.title.innerHTML = '<h2 n-content="Lego {:title} - {::title}" n-name=":title2"></h2>';
			templateEls.title2 = document.createElement('nt');
			templateEls.title2.innerHTML = '<h2 n-name=":list.0.title"></h2>';
			templateEls.copyrights = document.createElement('nt');
			templateEls.copyrights.innerHTML = '<p>Copyrights and trademarks for everyone.</p>';
			targetCont = document.createElement('div');
			item = new notRecord({}, notCommon.completeAssign({}, itemData));
		});

		it("Record", function() {
			let t = new notComponent({
				data: item,
				template: {el: templateEls.title},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('h2')).to.be.not.null;
			expect(targetCont.querySelector('h2').attributes.name.value).to.be.equal('Item title');
		});

		it("Record live", function() {
			let t = new notComponent({
				data: item,
				template: {el: templateEls.title},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('h2')).to.be.not.null;
			expect(targetCont.querySelector('h2').attributes.name.value).to.be.equal('Item title');
			item.title2 = '2';
			expect(targetCont.querySelector('h2').attributes.name.value).to.be.equal('2');
		});

		it("Record nested property live", function() {
			let item21 = new notRecord({}, notCommon.completeAssign({}, {
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
			})),
				t = new notComponent({
				data: item,
				template: {el: templateEls.title2},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('h2')).to.be.not.null;
			expect(targetCont.querySelector('h2').attributes.name.value).to.be.equal('1');
			t.on('rendered', function(el){
				expect(targetCont.querySelector('h2').attributes.name.value).to.be.equal('2');
			}, true);
			item.list[0].title = '2';
		});
	});

	describe("Attr processor", function() {
		beforeEach(function() {
			templateEls.title = document.createElement('nt');
			templateEls.title.innerHTML = '<h2 n-content="Lego {:title} - {::title}" n-attr-invertation=":title2"></h2>';
			templateEls.title2 = document.createElement('nt');
			templateEls.title2.innerHTML = '<h2 n-attr-invertation=":list.0.title"></h2>';
			templateEls.copyrights = document.createElement('nt');
			templateEls.copyrights.innerHTML = '<p>Copyrights and trademarks for everyone.</p>';
			targetCont = document.createElement('div');
			item = new notRecord({}, notCommon.completeAssign({}, itemData));
		});

		it("Record", function() {
			let t = new notComponent({
				data: item,
				template: {el: templateEls.title},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('h2')).to.be.not.null;
			expect(targetCont.querySelector('h2').attributes.invertation.value).to.be.equal('Item title');
		});

		it("Record live", function() {
			let t = new notComponent({
				data: item,
				template: {el: templateEls.title},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('h2')).to.be.not.null;
			expect(targetCont.querySelector('h2').attributes.invertation.value).to.be.equal('Item title');
			item.title2 = '2';
			expect(targetCont.querySelector('h2').attributes.invertation.value).to.be.equal('2');
		});

		it("Record nested property live", function() {
			let item21 = new notRecord({}, notCommon.completeAssign({}, {
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
			})),
				t = new notComponent({
				data: item21,
				template: {el: templateEls.title2},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('h2')).to.be.not.null;
			expect(targetCont.querySelector('h2').attributes.invertation.value).to.be.equal('1');
			t.on('rendered', function(el){
				expect(targetCont.querySelector('h2').attributes.invertation.value).to.be.equal('2');
			}, true);
			item21.list[0].title = '2';
		});
	});

	describe("Value processor", function() {
		beforeEach(function() {
			templateEls.title = document.createElement('nt');
			templateEls.title.innerHTML = '<h2 n-content="Lego {:title} - {::title}" n-value=":title2"></h2>';
			templateEls.title2 = document.createElement('nt');
			templateEls.title2.innerHTML = '<h2 n-value=":list.0.title"></h2>';
			templateEls.copyrights = document.createElement('nt');
			templateEls.copyrights.innerHTML = '<p>Copyrights and trademarks for everyone.</p>';
			targetCont = document.createElement('div');
			item = new notRecord({}, notCommon.completeAssign({}, itemData));
		});

		it("Record", function() {
			let t = new notComponent({
				data: item,
				template: {el: templateEls.title},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('h2')).to.be.not.null;
			expect(targetCont.querySelector('h2').attributes.value.value).to.be.equal('Item title');
		});

		it("Record live", function() {
			let t = new notComponent({
				data: item,
				template: {el: templateEls.title},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('h2')).to.be.not.null;
			expect(targetCont.querySelector('h2').attributes.value.value).to.be.equal('Item title');
			item.title2 = '2';
			expect(targetCont.querySelector('h2').attributes.value.value).to.be.equal('2');
		});

		it("Record nested property live", function() {
			let item21 = new notRecord({}, notCommon.completeAssign({}, {
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
			})),
				t = new notComponent({
				data: item21,
				template: {el: templateEls.title2},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('h2')).to.be.not.null;
			expect(targetCont.querySelector('h2').attributes.value.value).to.be.equal('1');
			t.on('rendered', function(el){
				expect(targetCont.querySelector('h2').attributes.value.value).to.be.equal('2');
			}, true);
			item21.list[0].title = '2';
		});
	});

	describe("Checked processor", function() {
		beforeEach(function() {
			templateEls.checked = document.createElement('nt');
			templateEls.checked.innerHTML = '<input type="checked" value="1" name=""/>';
			targetCont = document.createElement('div');
			item = new notRecord({}, notCommon.completeAssign({}, itemData));
		});

		it("Record", function() {
			let t = new notComponent({
				data: item,
				template: {el: templateEls.checked},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('input')).to.be.not.null;
			expect(targetCont.querySelector('input').classList.contains('active')).to.be.true;
		});

		it("Record live", function() {
			let t = new notComponent({
				data: item,
				template: {el: templateEls.checked},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('input')).to.be.not.null;
			expect(targetCont.querySelector('input').attributes.value.value).to.be.equal('Item title');
			item.title2 = 'active2';
			expect(targetCont.querySelector('input').attributes.value.value).to.be.true;
		});

		it("Record nested property live", function() {
			let item21 = new notRecord({}, notCommon.completeAssign({}, {
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
			})),
				t = new notComponent({
				data: item21,
				template: {el: templateEls.title2},
				options: {
					helpers: helpers,
					targetEl: targetCont,
					renderAnd: 'place'
				}
			});
			expect(targetCont.querySelector('h2')).to.be.not.null;
			expect(targetCont.querySelector('h2').attributes.value.value).to.be.equal('1');
			t.on('rendered', function(el){
				expect(targetCont.querySelector('h2').attributes.value.value).to.be.equal('2');
			}, true);
			item21.list[0].title = '2';
		});
	});

});
