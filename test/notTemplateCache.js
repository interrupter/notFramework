const notTemplateCache = notFramework.notTemplateCache;
const urls = {
		lib:'./test/templates/lib.html',
		title: './test/templates/title.html'
	};

describe("notTemplateCache", function() {
	describe("One by URL", function() {
		it("loading", function() {
			notTemplateCache.addFromURL('title', urls.title).
				then(function(template){
					console.log(template);
					expect(notTemplateCache.getNames()).to.include.members(['title']);
				})
				.catch(function(){
					console.log(arguments);
					expect(true).to.equal(false);
				});
		});
	});

	describe("Many by URL", function() {
		it("loading", function() {
			notTemplateCache.addLibFromURL(urls.lib).
				then(function(templates){
					console.log(templates);
					console.log(notTemplateCache.getNames());
					expect(notTemplateCache.getNames()).to.include.members(['todo', 'checkItem']);
				})
				.catch(function(){
					console.log(arguments);
					expect(true).to.equal(false);
				});
		});
	});

	describe("Page element", function() {
		it("by element", function() {
			notTemplateCache.addFromDocument(document.querySelector('#testCase1'));
			expect(notTemplateCache.getNames()).to.include.members(['testCase1']);
		});

		it("by selector", function() {
			notTemplateCache.addFromDocument('#testCase2');
			expect(notTemplateCache.getNames()).to.include.members(['testCase2']);
		});
	});

	describe("Plain HTML", function() {
		it("set by text", function() {
			notTemplateCache.addFromText('testCase3', '<p>This will be huuuge! I guarantee it!</p>');
			expect(notTemplateCache.getNames()).to.include.members(['testCase3']);
		});
	});



});
