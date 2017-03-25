import notBase from '../notBase';
import notCommon from '../common';
import notComponent from '../template/notComponent';
import notPath from '../notPath';

const OPT_DEFAULT_PAGE_SIZE = 20,
	OPT_DEFAULT_PAGE_NUMBER = 0,
	OPT_FIELD_NAME_PRE_PROC = 'preprocessor';

class notTable extends notBase {
	constructor(input) {
		super(input);
		this.setWorking('filteredData', []);
		if(!this.getData() || !Array.isArray(this.getData('rows'))){
			this.setData({rows:[]});
		}
		this.resetPager();
		this.resetFilter();
		this.render();
		return this;
	}

	render() {
		if (this.getWorking('component')) {
			this.getWorking('component').update();
		} else {
			let component = new notComponent({
				data: {},
				template: {
					name: 'table_wrapper'
				},
				options: {
					renderAnd: this.getOptions('renderAnd'),
					targetEl: this.getOptions('targetEl'),
					helpers: this.getOptions('helpers')
				},
				events: [
					[
						['afterRender', 'afterUpdate'], this.renderInside.bind(this)
					]
				]
			});
			this.setWorking('component', component);
		}
	}

	renderInside() {
		this.renderHeader();
		this.updateData();
		this.renderBody();
		this.bindSearch();
		this.bindCustomBindings();
	}

	renderHeader() {
		var tableHeader = this.getOptions('targetEl').querySelector('thead tr');
		if (!tableHeader) return;
		let fields = this.getOptions('fields');
		for (var i = 0; i < fields.length; i++) {
			var newTh = document.createElement('TH');
			newTh.innerHTML = fields[i].title;
			newTh.dataset.dataFieldName = fields[i].path;
			newTh.dataset.sortingDirection = 0;
			if (fields[i].hasOwnProperty('sortable') && fields[i].sortable) {
				this.attachSortingHandlers(newTh);
			}
			tableHeader.appendChild(newTh);
		}
	}

	attachSortingHandlers(headCell) {
		headCell.addEventListener('click', (e) => {
			e.preventDefault();
			this.changeSortingOptions(e.currentTarget);
			return false;
		});
		headCell.style.cursor = 'pointer';
	}

	changeSortingOptions(el) {
		if (parseInt(el.dataset.sortingDirection) === 0) {
			el.dataset.sortingDirection = 1;
		} else {
			el.dataset.sortingDirection = parseInt(el.dataset.sortingDirection) * -1;
		}
		if (el.parentNode) {
			for (var i = 0; i < el.parentNode.children.length; i++) {
				if (el.parentNode.children[i] === el) {
					continue;
				}
				el.parentNode.children[i].classList.remove('sorting_asc');
				el.parentNode.children[i].classList.remove('sorting_desc');
			}
		}
		if (parseInt(el.dataset.sortingDirection) > 0) {
			el.classList.remove('sorting_desc');
			el.classList.add('sorting_asc');
			el.setAttribute('aria-sort', 'ascending');
		} else {
			el.classList.remove('sorting_asc');
			el.classList.add('sorting_desc');
			el.setAttribute('aria-sort', 'descending');
		}
		this.setSorter({
			sortDirection: el.dataset.sortingDirection,
			sortByField: el.dataset.dataFieldName
		});
	}

	setSorter(hash) {
		//console.log('setSorter', hash);
		this.setWorking('sorter', hash);
		this.invalidateData();
		this.updateData();
	}

	getSorter() {
		return this.getWorking('sorter');
	}

	getFilterSearch() {
		return (typeof this.getFilter() !== 'undefined' && this.getFilter() !== null && typeof this.getFilter().filterSearch !== 'undefined' && this.getFilter().filterSearch !== null) ? this.getFilter().filterSearch.toString() : '';
	}

	invalidateData() {
		if (this.getOptions('liveLoad') && this.getOptions('onePager')) {
			while(this.getData('rows').length>0){
				this.getData('rows').pop();
			}
			this.resetPager();
		}
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

	resetPager() {
		this.setWorking('pager', {
			pageSize: isNaN(this.getOptions('pageSize')) ? OPT_DEFAULT_PAGE_SIZE:this.getOptions('pageSize'),
			pageNumber: isNaN(this.getOptions('pageNumber')) ? OPT_DEFAULT_PAGE_NUMBER:this.getOptions('pageNumber'),
		});
	}

	getPager() {
		return this.getWorking('pager');
	}

	setUpdating() {
		this.setWorking('updating', true);
	}

	setUpdated() {
		this.getWorking('updating', false);
	}

	ifUpdating() {
		return this.getWorking('updating');
	}

	updateData() {
		if (this.getOptions('liveLoad') && this.getOptions('interface')) {
			if (this.ifUpdating()) {
				return;
			}
			//load from server
			let query = this.getOptions('interface')({})
				.setFilter(this.getFilter())
				.setSorter(this.getSorter())
				.setPager(this.getPager().pageSize, this.getPager().pageNumber);
			this.setUpdating();
			query.$list()
				.then((data) => {
					//console.log('$list for table', data);
					this.setData({
						rows: this.getData('rows').concat(data)
					});
					this.proccessData();
					this.refreshBody();
					this.setUpdated();
				})
				.catch((e) => {
					notCommon.error(e);
					this.setUpdated();
				});
		} else {
			//local magic
			this.setUpdating();
			this.proccessData();
			this.refreshBody();
			this.setUpdated();
		}
	}

	proccessData() {
		var thatFilter = this.getFilter();
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
				if (isNaN(notPath.get(thatSorter.sortByField, item1, {}))) {
					return notPath.get(thatSorter.sortByField, item1, {}).localeCompare(notPath.get(thatSorter.sortByField,item2,{})) * -thatSorter.sortDirection;
				} else {
					return ((notPath.get(thatSorter.sortByField, item1, {}) < notPath.get(thatSorter.sortByField, item2, {})) ? 1 : -1) * thatSorter.sortDirection;
				}
			});
		}
	}

	bindSearch() {
		var searchEl = this.getOptions('targetEl').querySelectorAll('input[name="search"]')[0];
		if (!searchEl) return;
		var onEvent = (e) => {
			this.setFilter({
				filterSearch: e.currentTarget.value
			});
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
		this.getWorking('pager').pageNumber++;
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
				newTd.addEventListener('blur', ()=>{
					notPath.set(field.path, item, this.getOptions('helpers'), newTd.textContent);
					this.updateData();
				});
			}
			if (field.hasOwnProperty(OPT_FIELD_NAME_PRE_PROC)) {
				preprocessed = field[OPT_FIELD_NAME_PRE_PROC](val, item, index);
			}
			if (field.hasOwnProperty('component')) {
				new notComponent({
					data: field.component.data || preprocessed || {val, item, index},
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
			if (field.hasOwnProperty('events') && field.events) {
				for (var j in field.events) {
					newTd.addEventListener(j, (e)=>{
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

	refreshBody() {
		var tbody = this.findBody();
		if (!tbody) {
			return;
		}
		this.clearBody();
		this.checkFiltered();
		var thisPageStarts = 0,
			nextPageEnds = this.getPager().pageSize * (this.getPager().pageNumber + 1);
		for (var i = thisPageStarts; i < Math.min(nextPageEnds, this.getWorking('filteredData').length); i++) {
			tbody.appendChild(this.renderRow(this.getWorking('filteredData')[i]));
		}
	}

	findBody() {
		return this.getOptions('targetEl').querySelector('tbody');
	}

	clearBody() {
		var tableBody = this.findBody();
		if (!tableBody) return;
		tableBody.innerHTML = '';
	}

	checkFiltered(){
		if (!Array.isArray(this.getWorking('filteredData'))){
			this.setWorking('filteredData',[]);
		}
	}

	renderBody() {
		if (!this.getOptions('onePager')) {
			this.clearBody();
		}
		this.checkFiltered();
		var thisPageStarts = this.getPager().pageSize * (this.getPager().pageNumber),
			nextPageEnds = this.getPager().pageSize * (this.getPager().pageNumber + 1),
			tbody = this.findBody();

		for (var i = thisPageStarts; i < Math.min(nextPageEnds, this.getWorking('filteredData').length); i++) {
			tbody.appendChild(this.renderRow(this.getWorking('filteredData')[i]));
		}
	}

	testDataItem(item){
		var strValue = this.getFilterSearch().toLowerCase();
		for(var k in item){
			var toComp = item[k].toString().toLowerCase();
			if (toComp.indexOf(strValue)>-1){
				return true;
			}
		}
		return false;
	}
}

export default notTable;
