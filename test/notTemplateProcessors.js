const notTemplateProcessors = notFramework.notTemplateProcessors;

const simpleProcs = {
	addCurrency: function(val){
		return val + '$';
	},
	addFoo: function(val){
		return 'foo' + val;
	},
};

describe("notTemplateProcessors", function() {
	it("Add one processor", function() {
		notTemplateProcessors.add('currency', simpleProcs.addCurrency);
		expect(notTemplateProcessors.get('currency')).to.be.equal(simpleProcs.addCurrency);
	});

	it("Add another one then clear processors", function() {
		notTemplateProcessors.add('foo', simpleProcs.addFoo);
		expect(notTemplateProcessors.get('foo')).to.be.equal(simpleProcs.addFoo);
		notTemplateProcessors.clear();
		let t = notTemplateProcessors.get();
		expect(Object.keys(t).length).to.be.equal(0);
	});

	it("Add two processors", function() {
		notTemplateProcessors.add(simpleProcs);
		expect(notTemplateProcessors.get('addCurrency')).to.be.equal(simpleProcs.addCurrency);
		expect(notTemplateProcessors.get('addFoo')).to.be.equal(simpleProcs.addFoo);
	});
});
