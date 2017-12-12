const notPath = notFramework.notPath;

describe('notPath', function() {
	describe('finding sub path', function() {
		it(':authors.{::index}', function() {
			let path = ':authors.{::index}',
				result = '::index';
			expect(notPath.findNextSubPath(path)).to.equal(result);
		});

		it(':authors.{::index.{:version}}', function() {
			let path = ':authors.{::index.{:version}}',
				result = ':version';
			expect(notPath.findNextSubPath(path)).to.equal(result);
		});

	});

	describe('get', function() {
		it(':', function() {
			let path = ':',
				item = {
					authors: ['help', 'me']
				},
				helpers = {

				};
			expect(notPath.get(path, item, helpers)).to.equal(item);
		});

		it(':authors.{::obj.index}', function() {
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

		it(':authors.{::index}', function() {
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

		it('::', function() {
			let path = '::',
				item = {
					authors: ['help', 'me']
				},
				helpers = {
					index: 0,
					obj: {
						index: 1
					}
				},
				result = helpers;
			expect(notPath.get(path, item, helpers)).to.equal(result);
		});

		it(':hi().title', function() {
			let path = ':hi().title',
				item = {
					authors: ['help', 'me', 'awesome!'],
					hi: function() {
						return {
							title: 'title',
							index: 2
						};
					}
				},
				helpers = {},
				result = 'title';
			expect(notPath.get(path, item, helpers, result)).to.equal(result);
		});

		it(':authors.{:hi().index}', function() {
			let path = ':authors.{:hi().index}',
				item = {
					authors: ['help', 'me', 'awesome!'],
					hi: function() {
						return {
							index: 2
						};
					}
				},
				helpers = {},
				result = 'awesome!';
			expect(notPath.get(path, item, helpers, result)).to.equal(result);
		});

	});



	describe('set', function() {

		it(':authors without helpers', function() {
			let path = ':authors',
				item = {
					authors: false
				},
				result = 'notMe';
			notPath.set(path, item, result);
			expect(item.authors).to.equal(result);
		});

		it('recursion in sub path', function() {
			let path = ':authors.{::subpath}',
				item = {
					authors: {}
				},
				helpers = {
					subpath: '{::subpath}'
				},
				result = 'notMe';
			notPath.set(path, item, helpers, result);
			expect(item.authors['{subpath}']).to.equal('notMe');
		});

		it(':authors.{::obj.index}', function() {
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

		it(':authors.{::index}', function() {
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
			notPath.set(path, item, helpers, result);
			expect(item.authors[0]).to.equal(result);
		});

		it(':authors.{:hi().index}', function() {
			let path = ':authors.{:hi().index}',
				item = {
					authors: ['help', 'me', 'awesome!'],
					hi: function() {
						return {
							index: 2
						};
					}
				},
				helpers = {},
				result = 'cool';
			notPath.set(path, item, helpers, result);
			expect(item.authors[2]).to.equal(result);
		});

		it(':authors.name when author not exists as object', function() {
			let path = ':authors.name',
				item = {
					hi: function() {
						return {
							index: 2
						};
					}
				},
				helpers = {},
				result = 'cool';
			notPath.set(path, item, helpers, result);
			expect(item.authors.name).to.equal(result);
		});

		it('trigger change', function() {
			let path = ':authors.name',
				result = false,
				item = {
					hi: function() {
						return {
							index: 2
						};
					},
					__isActive: true,
					isRecord: true,
					trigger: ()=>{
						result = true;
					}
				},
				helpers = {};
			notPath.set(path, item, helpers, result);
			expect(result).to.be.ok;
		});
	});

	describe('join', function() {
		it('simple join path', function() {
			let path1 = ':authors',
				path2 = '0',
				result = ':authors.0';
			expect(notPath.join(path1, path2)).to.equal(result);
		});

		it('join two long paths', function() {
			let path1 = ':authors.0',
				path2 = 'aliases.2',
				result = ':authors.0.aliases.2';
			expect(notPath.join(path1, path2)).to.equal(result);
		});
	});

	describe('findNextSubPath', function() {
		it('not complete subPath, without closing', function() {
			let path = 'join.{notClosedPath';
			expect(notPath.findNextSubPath(path)).to.be.equal('notClosedPath');
		});
	});

	describe('ifFullSubPath', function() {
		it('join.army and join', function() {
			let path1 = ['join', 'army'],
				path2 = ['join'];
			expect(notPath.ifFullSubPath(path1, path2)).to.be.true;
		});

		it('join.army and join.me.at.bar', function() {
			let path1 = ['join', 'army'],
				path2 = ['join','me','at','bar'];
			expect(notPath.ifFullSubPath(path1, path2)).to.be.false;
		});

		it('join.army and join.me', function() {
			let path1 = ['join', 'army'],
				path2 = ['join','me'];
			expect(notPath.ifFullSubPath(path1, path2)).to.be.false;
		});
	});

	describe('parsePath', function() {
		it('pass string join.army', function() {
			let path1 = 'join.army',
				path2 = ['join','army'];
			expect(notPath.parsePath(path1)).to.be.deep.equal(path2);
		});

		it('pass array [\'join\',\'army\']', function() {
			let path1 = ['join','army'],
				path2 = ['join','army'];
			expect(notPath.parsePath(path1)).to.be.deep.equal(path2);
		});
	});

	describe('parsePathStep', function() {
		it(':property', function() {
			let path = ':join',
				item = {
					join: 'subpath',
					subpath: 'subpath_result'
				},
				helper = {},
				result = 'subpath';
			expect(notPath.parsePathStep(path, item, helper)).to.be.equal(result);
		});

		it(':function', function() {
			let path = ':pol()',
				item = {
					pol: () => {return 'subpath';},
					subpath: 'subpath_result'
				},
				helper = {},
				result = 'subpath';
			expect(notPath.parsePathStep(path, item, helper)).to.be.equal(result);
		});

		it(':function not exists', function() {
			let path = ':polak()',
				item = {
					pol: () => {return 'subpath';},
					subpath: 'subpath_result'
				},
				helper = {},
				result = 'subpath';
			expect(notPath.parsePathStep(path, item, helper)).to.be.equal(path);
		});

		it('::property', function() {
			let path = '::join',
				item = {

				},
				helper = {
					join: 'subpath',
					subpath: 'subpath_result'
				},
				result = 'subpath';
			expect(notPath.parsePathStep(path, item, helper)).to.be.equal(result);
		});

		it('::function', function() {
			let path = '::pol()',
				item = {

				},
				helper = {
					pol: () => {return 'subpath';},
					subpath: 'subpath_result'
				},
				result = 'subpath';
			expect(notPath.parsePathStep(path, item, helper)).to.be.equal(result);
		});

		it('::function not exists', function() {
			let path = '::polak()',
				item = {},
				helper = {
					pol: () => {return 'subpath';},
					subpath: 'subpath_result'
				},
				result = 'subpath';
			expect(notPath.parsePathStep(path, item, helper)).to.be.equal(path);
		});
	});

	describe('getValueByPath', function() {
		it('pass null as object', function() {
			let path = ':name',
				obj = null,
				helpers = {},
				result = 'awesome!';
			expect(notPath.getValueByPath( obj, path, {}, helpers)).to.be.undefined;
		});
	});

	describe('unset', function() {
		it('pass string join.army', function() {
			let item = {
					join:{
						army: true
					}
				},
				path = 'join.army';
			notPath.unset(path,item);
			expect(item.join.army).to.be.not.ok;
		});
	});
});
