const notRecord = notFramework.notRecord,
	notAPI = notFramework.notAPI,
	notCommon = notFramework.notCommon;

let testItem = {
		name: 'Title',
		value: 'wicked sick',
		_id: 'sdfoqw834u5v2909-59nv237',
		data: {
			path: {
				to: [0, 1, 2, 3, 4, {
					key: 'bingo'
				}]
			}
		},
		getLocalData: function () {
			console.log('this data', this);
			return this.data;
		},
		author: {
			name: 'Mike'
		},
		history: [{
			action: 'delete'
		}, {
			action: 'update'
		}],
		low: false,
		faulty: 11
	},
	testCollection = [{
		_id: 1,
		title: 'figues'
	}, {
		_id: 2,
		title: 'tranqulizers'
	}, {
		_id: 3,
		title: 'them apples'
	}],
	manifest = {
		model: 'item',
		url: '/framework/api/:modelName',
		actions: {
			list: {
				method: 'get',
				isArray: true,
				data: ['pager', 'sorter', 'filter']
			},
			update: {
				method: 'post',
				data: ['record']
			},
			list: {
				method: 'get',
				isArray: true
			},
			view: {
				method: 'get',
				postFix: '/:record[_id]/update',
				data: ['record']
			}
		}
	};

before(function () {
	notCommon.setManager({
		setAPI(v) {
			this.api = v;
		},
		getAPI() {
			return this.api;
		},
	});
	notCommon.getManager().setAPI(new notAPI({}));
});

describe("notRecord", function () {
	describe("create", function () {
		it("single", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem));
			expect(rec.isRecord).to.equal(true);
		});
		it("collection", function () {
			let recs = new notRecord(manifest, testCollection);
			expect(recs.length).to.equal(3);
			expect(recs[0].isRecord).to.equal(true);
		});
	});

	describe("network interface", function () {
		it("single get", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem));
			expect(rec.$view).to.be.ok;
			rec.$view()
				.then(
					(data) => {
						console.log('$view success', data);
					}
				)
				.catch(
					(data) => {
						console.log('$view failure', data);
					}
				);
		});

		it("single post", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem));
			expect(rec.$update).to.be.ok;
			rec.$update()
				.then((data) => {
					console.log('$update one success', data);
				})
				.catch((data) => {
					console.log('$update one failure', data);
				});
		});

		it("query filter set/get", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem));
			rec.setFilter({
				letMe: 'speak'
			});
			expect(rec.getFilter()).to.have.key('letMe');
		});

		it("query pager set/get", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem));
			rec.setPager(1, 2);
			expect(rec.getPager()).to.have.keys('pageSize', 'pageNumber');
			expect(rec.getPager().pageSize).to.be.equal(1);
			expect(rec.getPager().pageNumber).to.be.equal(2);
		});

		it("query pager reset/get", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem));
			rec.setPager();
			expect(rec.getPager()).to.have.keys('pageSize', 'pageNumber');
			expect(rec.getPager().pageSize).to.be.equal(10);
			expect(rec.getPager().pageNumber).to.be.equal(1);
		});
	});

	describe("proxy", function () {

		it("detect as record (isRecord)", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem));
			expect(rec.isRecord).to.be.ok;
		});

		it("get simple key", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem)),
				result = testItem.name;
			expect(rec.name).to.be.equal(result);
		});

		it("set simple key", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem)),
				result = 'name';
			rec.name = result;
			expect(rec.name).to.be.equal(result);
		});

		it("set simple key and change Event", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem));
			rec.on('change', function () {
				expect(true).to.be.equal(true);
			}.bind(this));
			rec.value = 'like me or not';
		});

		it("set complex key and change Event", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem));
			rec.on('change', function () {
				console.log(arguments);
				expect(true).to.be.equal(true);
			}.bind(this));
			rec.setAttr('data.path.to.1', 'value 1');
		});

		it("set complex key in passive mode", function () {
			let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem))
			t = 0;
			rec.on('change', function () {
				t++;
				console.log('on changes commited', arguments);
				expect(arguments.length).to.be.equal(0);
				expect(t).to.be.equal(1);
			}.bind(this));
			rec.__setPassive;
			rec.setAttr('data.path.to.1', 'value 1');
			rec.setAttr('data.path.to.1', 'value 2');
			rec.setAttr('data.path.to.1', 'value 3');
			rec.setAttr('data.path.to.1', 'value 4');
			rec.setAttr('data.path.to.1', 'value 5');
			rec.__setActive;
		});

	});

	describe("path requests intergration", function () {
		describe("simple get", function () {
			it('get simple path key "name"', function () {
				let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem)),
					result = rec.name;
				expect(rec.getAttr('name')).to.be.equal(result);
			});

			it('get simple path keys ["name", "low", "faulty"]', function () {
				let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem)),
					result = [rec.name, rec.low, rec.faulty];
				expect(rec.getAttrs(['name', 'low', 'faulty'])).to.be.deep.equal(result);
			});

			it('get simple throu function :getLocalData().path.to.0', function () {
				let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem)),
					result = 0;
				expect(notPath.get(':getLocalData().path.to.0', rec, {})).to.be.equal(result);
			});
		});

		describe("simple set", function () {
			it('set simple path key "name"', function () {
				let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem)),
					result = 'Title';
				rec.setAttr('name', result);
				expect(rec.name).to.be.equal(result);
			});

			it('set simple path keys {name: "title 1", faulty: 12, low: true}', function () {
				let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem));
				rec.setAttrs({
					'name': 'title 1',
					'faulty': 12,
					low: true
				});
				expect(rec.name).to.be.equal('title 1');
				expect(rec.faulty).to.be.equal(12);
				expect(rec.low).to.be.equal(true);
			});
		});

		describe("complex get", function () {
			it('get complex path key "data.path.to.5.key"', function () {
				let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem)),
					result = rec.data.path.to[5].key;
				expect(rec.getAttr('data.path.to.5.key')).to.be.equal(result);
			});

			it('get complex path keys ["data.path.to.5.key", "author.name", "history.1.action"]', function () {
				let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem)),
					result = [rec.data.path.to[5].key, rec.author.name, rec.history[1].action];
				expect(rec.getAttrs(["data.path.to.5.key", "author.name", "history.1.action"])).to.be.deep.equal(result);
			});

		});

		describe("complex set", function () {

			it('set complex path key "data.path.to.5.key"', function () {
				let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem)),
					result = 'not bingo anymore';
				rec.setAttr('data.path.to.5.key', result);
				expect(rec.data.path.to[5].key).to.be.equal(result);
			});

			it('set complex path keys {\
				"data.path.to.4": "value 4",\
				"author.name": "Leonard",\
				"history.0.action": "reverted"\
			}', function () {
				let rec = new notRecord(manifest, notCommon.completeAssign({}, testItem));
				rec.setAttrs({
					'data.path.to.4': 'value 4',
					'author.name': 'Leonard',
					'history.0.action': 'reverted'
				});
				expect(rec.data.path.to[4]).to.be.equal('value 4');
				expect(rec.author.name).to.be.equal('Leonard');
				expect(rec.history[0].action).to.be.equal('reverted');
			});
		});
	});
});
