/* global jQuery,$ */
import notBase from '../notBase';
import notCommon from '../common';
import notComponent from '../template/notComponent';
import notPath from '../notPath';
import notRecord from '../record';

const OPT_DEFAULT_PAGE_SIZE = 20,
	OPT_DEFAULT_PAGE_NUMBER = 0,
	OPT_DEFAULT_PAGE_RANGE = 6,
	OPT_DEFAULT_TEMPLATE_PREFIX = 'table_',
	OPT_DEFAULT_SORT_DIRECTION = 1,
	OPT_DEFAULT_SEARCH = '',
	OPT_DEFAULT_RETURN = {},
	OPT_DEFAULT_COMBINED = false,
	OPT_DEFAULT_COMBINED_ACTION = 'listAndCount',
	OPT_DEFAULT_COUNT_ACTION = 'count',
	OPT_DEFAULT_LIST_ACTION = 'list',
	OPT_DEFAULT_SORT_FIELD = '_id',
	OPT_FIELD_NAME_PRE_PROC = 'preprocessor';

/**
	Few concepts
		*	two modes 1 - live requesting from server, 2 - static data

		*	in live mode: changing of filters or sorters leads to another request
			to server, in endless mode after scroll down to the bottom of
			table next page will be requested and glued to the bottom of the
			table, in pagination mode after change of sorter or filter
			pagination will be reset

		*	in static mode: change in filters or sorters will lead to pagination
			reset

	let input = {
		data:	//array of items to be presented in table
				//in case of static - unfiltered
				//in case of live - will be mirrored to table without any changes
		options: {
			//to post proc any row after it will be rendered
			procRow:(
				trow,	//HTMLElement of row
				titem	//item displayed in row
			)=>{
				//some actions
				return trow;
			},
			//array of fields that we will show in table
			fields:[
				{
					path: ':id', 	// notPath to field
					title: 'ID',	//what show in table titles row
					sortable: true	//enale sorting
					editable: true,	//inline editing
					searchable: true//searchable from inline search field
					events : {
						click: (input){
							console.log(...arguments);
							input.item.status = !input.item.status;
							table.updateData();
						}
					}
				}
			],
			pager:{
				size: 50,		//how many rows per "page"
				number: 0,		//default page number aka first
			},
			endless: true,		//true - will loadup data from
			endlessTrigger: 	//endless trigger
			helpers: {},		//will be available for every processor in sub-templates
			targetEl: el		//where we will place it
			interface:{			//for online requested list
				factory: 		//target notRecord factory with notRecordInterface, source of online data
				listAction:		//which action will be called to retrieve data from server, default 'list'
				countAction:	//which action will be called to retrieve raws count from server, default 'count'
				combined: 		//cobined request list and count
				combinedAction:	//name of combined action
				onSuccess:		//will be called after successfull request
				onError:		//will be called after failed request
			},
		}
	}
*/

class notTable extends notBase {
	constructor(input) {
		super(input);
		this.setWorking('filteredData', []);
		this.data = new notRecord({}, {
			pagination: {
				items: {
					count: 0,
					from: 0,
					to: 0
				},
				pages: {
					count: 0,
					from: 0,
					to: 0,
					current: 0,
					list: []
				}
			}
		});
		if (this.getData() && !Array.isArray(this.getData())) {
			this.setData(new notRecord({}, []));
		}
		this.resetPager();
		this.resetFilter();
		this.resetSorter();
		this.render();
		return this;
	}

	render() {
		if (this.getWorking('component')) {
			this.getWorking('component').update();
		} else {
			let component = new notComponent({
				data: this.data,
				template: {
					name: this.getOptions('templatePrefix', OPT_DEFAULT_TEMPLATE_PREFIX) + 'wrapper'
				},
				options: {
					renderAnd: this.getOptions('renderAnd'),
					targetEl: this.getOptions('targetEl'),
					helpers: notCommon.extend({
						goToPage: (input) => {
							this.goToPage(input.item.index);
						},
						goToFirst: this.goToFirst.bind(this),
						goToLast: this.goToLast.bind(this),
						goToNext: this.goToNext.bind(this),
						goToPrev: this.goToPrev.bind(this),
						isPageActive: (input) => {
							return input.item.index === this.data.pagination.pages.current;
						}
					}, this.getOptions('helpers'))
				},
				events: [
					[
						['afterRender', 'afterUpdate'],
						[this.initAutoloader.bind(this), this.renderInside.bind(this)]
					]
				]
			});
			this.setWorking('component', component);
		}
	}

	renderPagination() {
		if (this.getWorking('componentPagination')) {
			this.getWorking('componentPagination').update();
		} else {
			let component = new notComponent({
				data: this.data.pagination,
				template: {
					name: this.getOptions('templatePrefix', OPT_DEFAULT_TEMPLATE_PREFIX)+'pagination'
				},
				options: {
					renderAnd: this.getOptions('replace'),
					targetEl: this.getOptions('targetEl').querySelector('nav[role="pagination"]'),
					helpers: notCommon.extend({
						goToPage: (input) => {
							this.goToPage(input.item.index);
						},
						goToFirst: this.goToFirst.bind(this),
						goToLast: this.goToLast.bind(this),
						goToNext: this.goToNext.bind(this),
						goToPrev: this.goToPrev.bind(this),
						isPageActive: (input) => {
							return input.item.index === this.data.pagination.pages.current;
						}
					}, this.getOptions('helpers'))
				}
			});
			this.setWorking('componentPagination', component);
		}
	}

	renderInside() {
		this.renderHeader();
		this.updateData();
		this.renderBody();
		this.bindSearch();
		this.renderPagination();
		this.bindCustomBindings();
	}

	renderHeader() {
		var tableHeader = this.getOptions('targetEl').querySelector('thead tr');
		if (!tableHeader) return;
		let fields = this.getOptions('fields');
		for (var i = 0; i < fields.length; i++) {
			var newTh = document.createElement('TH');
			newTh.innerHTML = fields[i].title;
			if (fields[i].hasOwnProperty('sortable') && fields[i].sortable) {
				this.attachSortingHandlers(newTh, fields[i].path);
			}
			tableHeader.appendChild(newTh);
		}
	}

	attachSortingHandlers(headCell, fieldName) {
		headCell.addEventListener('click', (e) => {
			e.preventDefault();
			this.changeSortingOptions(headCell, fieldName);
			return false;
		});
		headCell.style.cursor = 'pointer';
	}

	changeSortingOptions(el, fieldName) {
		if (this.getSorter().hasOwnProperty(fieldName)) {
			this.getSorter()[fieldName]*=-1;
		} else {
			this.setSorter({
				[fieldName]: OPT_DEFAULT_SORT_DIRECTION,
			});
		}
		if (el.parentNode) {
			for (var i = 0; i < el.parentNode.children.length; i++) {
				if (el.parentNode.children[i] === el) {
					continue;
				}
				el.parentNode.children[i].classList.remove('sorting_asc');
				el.parentNode.children[i].classList.remove('sorting_desc');
				el.parentNode.children[i].setAttribute('aria-sort', 'none');
			}
		}
		if (this.getSorterDirection() > 0) {
			el.classList.remove('sorting_desc');
			el.classList.add('sorting_asc');
			el.setAttribute('aria-sort', 'ascending');
		} else {
			el.classList.remove('sorting_asc');
			el.classList.add('sorting_desc');
			el.setAttribute('aria-sort', 'descending');
		}
	}

	setSorter(hash) {
		this.setWorking('sorter', hash);
		this.invalidateData();
		this.updateData();
	}

	resetSorter() {
		let t = {};
		t[OPT_DEFAULT_SORT_FIELD] = OPT_DEFAULT_SORT_DIRECTION;
		this.setSorter(t);
	}

	getSorter() {
		return this.getWorking('sorter');
	}

	getSorterDirection(){
		try{
			let names = Object.keys(this.getSorter());
			return this.getSorter()[names[0]];
		}catch(e){
			return OPT_DEFAULT_SORT_DIRECTION;
		}
	}

	getSearch() {
		let search =(typeof this.getWorking('search') !== 'undefined' && this.getWorking('search') !== null);
		return  search?this.getWorking('search'):'';
	}

	setSearch(line = OPT_DEFAULT_SEARCH){
		this.setWorking('search', line);
		this.invalidateData();
		this.updateData();
		return this;
	}

	getReturn(){
		return this.getWorking('return');
	}

	setReturn(ret = OPT_DEFAULT_RETURN){
		this.setWorking('return', ret);
		return this;
	}

	clearFilteredData() {
		if (this.getWorking('filteredData') && this.getWorking('filteredData').length > 0) {
			this.getWorking('filteredData').splice(0, this.getWorking('filteredData').length);
		} else {
			//initialize if not exists
			this.setWorking('filteredData', new notRecord({}, []));
		}
	}

	clearData() {
		if (this.getData() && this.getData().length > 0) {
			this.getData().splice(0, this.getData().length);
		} else {
			//or init empty list
			this.setData(new notRecord({}, []));
		}
	}

	invalidateData() {
		//clearing filtered and sorted
		this.clearFilteredData();
		//in case live loading from server
		if (this.isLive()) {
			//clearing loaded data
			this.clearData();
		}
		//resset pager anyway
		this.resetPager();
	}

	setFilter(hash) {
		this.setWorking('filter', hash);
		this.invalidateData();
		this.updateData();
	}

	resetFilter() {
		this.setFilter({});
		this.updateData();
	}

	getFilter() {
		return this.getWorking('filter');
	}

	setPager(hash) {
		this.setWorking('pager', hash);
		this.updateData();
	}

	getDefaultPageNumber() {
		return isNaN(this.getOptions('pager.page')) ? OPT_DEFAULT_PAGE_NUMBER : this.getOptions('pager.page');
	}

	getDefaultPageSize() {
		return isNaN(this.getOptions('pager.size')) ? OPT_DEFAULT_PAGE_SIZE : this.getOptions('pager.size');
	}

	resetPager() {
		this.setWorking('pager', {
			size: this.getDefaultPageSize(),
			page: this.getDefaultPageNumber(),
		});
	}

	getPager() {
		return this.getWorking('pager');
	}

	isLive() {
		return this.getOptions('interface') && this.getOptions('interface.factory');
	}

	setUpdating() {
		this.setWorking('updating', true);
	}

	setUpdated() {
		this.setWorking('updating', false);
	}

	ifUpdating() {
		return this.getWorking('updating');
	}

	getDataInterface() {
		return this.getOptions('interface.factory')({});
	}

	getLoadDataActionName() {
		return (this.getOptions('interface.listAction') ? this.getOptions('interface.listAction') : OPT_DEFAULT_LIST_ACTION);
	}

	getCombinedActionName() {
		return (this.getOptions('interface.combinedAction') ? this.getOptions('interface.combinedAction') : OPT_DEFAULT_COMBINED_ACTION);
	}

	getCountActionName() {
		return this.getOptions('interface.countAction') ? this.getOptions('interface.countAction') : OPT_DEFAULT_COUNT_ACTION;
	}

	loadData() {
		//load from server
		let query = this.getDataInterface()
				.setFilter(this.getFilter())
				.setSorter(this.getSorter())
				.setReturn(this.getReturn())
				.setSearch(this.getSearch())
				.setPager(this.getPager().size, this.getPager().page),
			actionName;
		if(this.getOptions('interface.combined', OPT_DEFAULT_COMBINED)){
			actionName = this.getCombinedActionName();
		}else{
			actionName = this.getLoadDataActionName();
		}
		return query['$'+actionName]();
	}

	goToNext() {
		let next = isNaN(this.getWorking('pager').page) ? this.getDefaultPageNumber() : this.getWorking('pager').page + 1;
		this.getWorking('pager').page = Math.min(next, this.data.pagination.pages.to);
		this.updateData();
	}

	goToPrev() {
		let prev = isNaN(this.getWorking('pager').page) ? this.getDefaultPageNumber() : this.getWorking('pager').page - 1;
		this.getWorking('pager').page = Math.max(prev, this.data.pagination.pages.from);
		this.updateData();
	}

	goToFirst() {
		this.getWorking('pager').page = this.data.pagination.pages.from;
		this.updateData();
	}

	goToLast() {
		this.getWorking('pager').page = this.data.pagination.pages.to;
		this.updateData();
	}

	goToPage(pageNumber) {
		this.getWorking('pager').page = pageNumber;
		this.updateData();
	}

	updateData() {
		if (this.isLive()) {
			if (this.ifUpdating()) {
				return;
			}
			if (!this.getOptions('endless', false)) {
				this.getData().splice(0, this.getData().length);
			}
			this.setUpdating();
			if (this.getOptions('interface.combined', OPT_DEFAULT_COMBINED)){
				this.loadData()
					.then((data) => {
						this.getData().push(...(data.list));
						this.setWorking('lastCount',data.count);
					})
					.then(this.refreshBody.bind(this))
					.then(()=>{
						this.updatePagination(this.getWorking('lastCount'));
						this.renderPagination();
					})
					.catch(notCommon.error.bind(this))
					.then(this.setUpdated.bind(this));
			}else{
				this.loadData()
					.then(data => this.getData().push(...data))
					.then(this.getRowsCount.bind(this))
					.then(this.refreshBody.bind(this))
					.catch(notCommon.error.bind(this))
					.then(this.setUpdated.bind(this));
			}
		} else {
			//local magic
			this.setUpdating();
			this.processData();
			this.refreshBody();
			this.setUpdated();
		}
	}

	processData() {
		var thatFilter = this.getFilter();
		this.getData('rows').setPassive();
		if (typeof thatFilter !== 'undefined' && thatFilter !== null && typeof thatFilter.filterSearch !== 'undefined' && thatFilter.filterSearch !== null && thatFilter.filterSearch.length > 0) {
			//
			this.setWorking('filteredData', this.getData('rows').filter(this.testDataItem.bind(this)));
		} else {
			this.setWorking('filteredData', this.getData('rows'));
		}
		////sorter
		var thatSorter = this.getSorter();
		if (typeof thatSorter !== 'undefined' && thatSorter !== null) {
			this.getWorking('filteredData').sort((item1, item2) => {
				let t1 = notPath.get(thatSorter.sortByField, item1, {}),
					t2 = notPath.get(thatSorter.sortByField, item2, {});
				if (isNaN(t1)) {
					if (typeof t1 !== 'undefined' && typeof t2 !== 'undefined' && t1.localeCompare) {
						return t1.localeCompare() * -thatSorter.sortDirection;
					} else {
						return 0;
					}
				} else {
					return ((t1 < t2) ? 1 : -1) * thatSorter.sortDirection;
				}
			});
		}
		this.getData('rows').setActive();
	}

	bindSearch() {
		var searchEl = this.getOptions('targetEl').querySelectorAll('input[name="search"]')[0];
		if (!searchEl) return;
		var onEvent = (e) => {
			this.setSearch(e.currentTarget.value);
			return true;
		};
		searchEl.addEventListener('keyup', onEvent);
		searchEl.addEventListener('enter', onEvent);
	}


	bindCustomBindings() {
		if (!this.getOptions('bindings') || !this.getOptions('bindings')) {
			return;
		}
		for (var selector in this.getOptions('bindings')) {
			var els = this.getOption('targetEl').querySelectorAll(selector);
			for (var elId = 0; elId < els.length; elId++) {
				var el = els[elId];
				for (var event in this.getOptions('bindings')[selector]) {
					el.addEventListener(event, this.getOptions('bindings')[selector][event]);
				}
			}
		}
	}

	loadNext() {
		this.getWorking('pager').page++;
		this.updateData();
	}

	renderRow(item, index) {
		let newRow = document.createElement('TR'),
			fields = this.getOptions('fields');
		for (var i = 0; i < fields.length; i++) {
			let newTd = document.createElement('TD'),
				field = fields[i],
				preprocessed = null,
				val = notPath.get(field.path, item, this.getOptions('helpers'));
			if (field.hasOwnProperty('editable') && !field.hasOwnProperty('component')) {
				newTd.setAttribute('contentEditable', true);
				newTd.dataset.path = field.path;
				newTd.dataset.itemId = item[this.getOptions('itemIdField')];
				newTd.dataset.value = val;
				newTd.addEventListener('blur', () => {
					notPath.set(field.path, item, this.getOptions('helpers'), newTd.textContent);
					this.updateData();
				});
			}
			if (field.hasOwnProperty(OPT_FIELD_NAME_PRE_PROC)) {
				preprocessed = field[OPT_FIELD_NAME_PRE_PROC](val, item, index);
			}
			if (field.hasOwnProperty('component')) {
				new notComponent({
					data: field.component.data || preprocessed || {
						val,
						item,
						index
					},
					template: field.component.template,
					options: {
						targetEl: newTd,
						helpers: this.getOptions('helpers')
					},
					events: field.component.events || []
				});
			} else {
				newTd.innerHTML = preprocessed || val;
			}

			if (field.hasOwnProperty('style')) {
				for (let style in field.style) {
					if (field.style.hasOwnProperty(style)) {
						newTd.style[style] = field.style[style];
					}
				}
			}

			if (field.hasOwnProperty('events') && field.events) {
				for (var j in field.events) {
					newTd.addEventListener(j, (e) => {
						e.preventDefault();
						return field.events[j]({
							event: e,
							element: newTd,
							item: item,
							value: val,
							field: field
						});
					}, false);
				}
			}
			newRow.appendChild(newTd);
		}
		if (this.getOptions('procRow')) {
			return this.getOptions('procRow')(newRow, item);
		}
		return newRow;
	}



	findBody() {
		return this.getOptions('targetEl').querySelector('tbody');
	}

	clearBody() {
		var tableBody = this.findBody();
		if (!tableBody) return;
		tableBody.innerHTML = '';
	}

	checkFiltered() {
		if (!Array.isArray(this.getWorking('filteredData'))) {
			this.setWorking('filteredData', []);
		}
	}

	renderBody() {
		let tbody = this.findBody();
		if (!tbody) {
			return;
		}
		if (!this.getOptions('endless')) {
			this.clearBody();
		}
		this.checkFiltered();
		if (this.isLive()) {

			for (let i = 0; i < this.getData().length; i++) {
				tbody.appendChild(this.renderRow(this.getData()[i]));
			}
		} else {
			let thisPageStarts = this.getPager().size * (this.getPager().page),
				nextPageEnds = this.getPager().size * (this.getPager().page + 1);

			for (let i = thisPageStarts; i < Math.min(nextPageEnds, this.getWorking('filteredData').length); i++) {
				tbody.appendChild(this.renderRow(this.getWorking('filteredData')[i]));
			}
		}
	}

	refreshBody() {
		var tbody = this.findBody();
		if (!tbody) {
			return;
		}
		this.clearBody();
		this.checkFiltered();
		if (this.isLive()) {
			for (let i = 0; i < this.getData().length; i++) {
				tbody.appendChild(this.renderRow(this.getData()[i]));
			}
		} else {
			let thisPageStarts = 0,
				nextPageEnds = this.getPager().size * (this.getPager().page + 1);
			for (let i = thisPageStarts; i < Math.min(nextPageEnds, this.getWorking('filteredData').length); i++) {
				tbody.appendChild(this.renderRow(this.getWorking('filteredData')[i]));
			}
		}
	}

	getRowsCount() {
		let query = this.getDataInterface().setFilter(this.getFilter());
		return query['$' + this.getCountActionName()]()
			.then((data) => {
				this.updatePagination(data.count);
				this.renderPagination();
			})
			.catch((e) => {
				notCommon.error(e);
			});
	}

	updatePagination(itemsCount) {
		this.data.pagination.pages.list.splice(0, this.data.pagination.pages.list.length);
		let itemsFrom = (this.getPager().page - OPT_DEFAULT_PAGE_NUMBER) * this.getPager().size + 1,
			pagesCount = itemsCount % this.getPager().size ? Math.floor(itemsCount / this.getPager().size) + 1 : Math.round(itemsCount / this.getPager().size),
			pagesFrom = Math.max(OPT_DEFAULT_PAGE_NUMBER, this.getPager().page - OPT_DEFAULT_PAGE_RANGE),
			pagesTo = Math.min(pagesCount - (1 - OPT_DEFAULT_PAGE_NUMBER), this.getPager().page + OPT_DEFAULT_PAGE_RANGE),
			list = [],
			itemsTo = Math.min(itemsFrom + this.getPager().size - 1, itemsCount);
		for (let t = pagesFrom; t <= pagesTo; t++) {
			list.push({
				index: t,
				active: t===this.getPager().page
			});
		}
		this.data.pagination.items.count = itemsCount;
		this.data.pagination.items.from = itemsFrom;
		this.data.pagination.items.to = itemsTo;
		this.data.pagination.pages.count = pagesCount;
		this.data.pagination.pages.from = pagesFrom;
		this.data.pagination.pages.to = pagesTo;
		this.data.pagination.pages.current = this.getPager().page;
		this.data.pagination.pages.list.splice(0, this.data.pagination.pages.list.length, ...list);
	}


	testDataItem(item) {
		var strValue = this.getSearch().toLowerCase();
		for (var k in item) {
			var toComp = item[k].toString().toLowerCase();
			if (toComp.indexOf(strValue) > -1) {
				return true;
			}
		}
		return false;
	}

	initAutoloader() {
		if (jQuery && jQuery.scrollSpy && !this.getWorking('live')) {
			if (this.isLive() && this.getOptions('endless') && this.getOptions('endlessTrigger')) {
				let t = $(this.getOptions('endlessTrigger'));
				if (t) {
					t.on('scrollSpy:enter', this.loadNext.bind(this));
					t.scrollSpy();
					this.setWorking('live', true);
				}
			}
		}
	}
}

export default notTable;
