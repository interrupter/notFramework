const notPath = notFramework.notPath;

describe("notPath", function() {
	describe("finding sub path", function() {
		it(":authors.{::index}", function() {
			let path = ':authors.{::index}',
				result = '::index';
			expect(notPath.findNextSubPath(path)).to.equal(result);
		});

		it(":authors.{::index.{:version}}", function() {
			let path = ':authors.{::index.{:version}}',
				result = ':version';
			expect(notPath.findNextSubPath(path)).to.equal(result);
		});

	});

	describe("getter", function() {
		it(":", function() {
			let path = ':',
				item = {
					authors: ['help', 'me']
				},
				helpers = {

				};
			expect(notPath.get(path, item, helpers)).to.equal(item);
		});

		it(":authors.{::obj.index}", function() {
			let path = ':authors.{::obj.index}',
				item = {
					authors: ['help', 'me']
				},
				helpers = {
					index: 0,
					obj: {
						index: 1
					}
				},
				result = 'me';
			expect(notPath.get(path, item, helpers)).to.equal(result);
		});

		it(":authors.{::index}", function() {
			let path = ':authors.{::index}',
				item = {
					authors: ['help', 'me']
				},
				helpers = {
					index: 0,
					obj: {
						index: 1
					}
				},
				result = 'help';
			expect(notPath.get(path, item, helpers)).to.equal(result);
		});

		it(":hi().title", function() {
			let path = ':hi().title',
				item = {
					authors: ['help', 'me', 'awesome!'],
					hi: function() {
						return {
							title: 'title',
							index: 2
						}
					}
				},
				helpers = {},
				result = 'title';
			expect(notPath.get(path, item, helpers, result)).to.equal(result);
		});

		it(":authors.{:hi().index}", function() {
			let path = ':authors.{:hi().index}',
				item = {
					authors: ['help', 'me', 'awesome!'],
					hi: function() {
						return {
							index: 2
						}
					}
				},
				helpers = {},
				result = 'awesome!';
			expect(notPath.get(path, item, helpers, result)).to.equal(result);
		});
	});

	describe("setter", function() {
		it(":authors.{::obj.index}", function() {
			let path = ':authors.{::obj.index}',
				item = {
					authors: ['help', 'me']
				},
				helpers = {
					index: 0,
					obj: {
						index: 1
					}
				},
				result = 'notMe';
			notPath.set(path, item, helpers, result);
			expect(item.authors[1]).to.equal(result);
		});

		it(":authors.{::index}", function() {
			let path = ':authors.{::index}',
				item = {
					authors: ['help', 'me']
				},
				helpers = {
					index: 0,
					obj: {
						index: 1
					}
				},
				result = 'not help';
			notPath.set(path, item, helpers, result)
			expect(item.authors[0]).to.equal(result);
		});

		it(":authors.{:hi().index}", function() {
			let path = ':authors.{:hi().index}',
				item = {
					authors: ['help', 'me', 'awesome!'],
					hi: function() {
						return {
							index: 2
						}
					}
				},
				helpers = {},
				result = 'cool';
			notPath.set(path, item, helpers, result)
			expect(item.authors[2]).to.equal(result);
		});
	});
});
