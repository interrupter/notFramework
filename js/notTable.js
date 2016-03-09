/*
    Пример использования notView
*/

/*
    options = {
        String          templateUrl         - ссылка на коллекцию шаблонов
        HTMLElement     place               - куда будем выводить таблицу
        Array           headerTitles        - массив вида [{id: 'ID'}, {title: 'Название'}, {status: 'Статус'}, {actionField: 'Действия'}] -
                                            выводиться будут в том же порядке, если роля в объекте данных нет (как actionField)
        Array           data                - данные, массив объектов, по ключам должно быть согласованно с headersTitle, {id: 1, title: 'Verba', status: false}
        Integer         pageSize            - сколько на странице элементов
        Integer         pageNumber          - на какой странице находимся
        Boolean         onePager            - если надо добавлять в таблицу без удаления элементов предыдущей страницы
        Boolean         liveLoad            - если нужно загружать в живую из сети - true, если нужно использовать только data - false
    }


*/

var notTable = function(options) {
    this.options = options;
    this._working = {
        templateNamesPrefix: 'notTable_',
        viewPrefs: {
            sorter: {

            },
            filter: {

            },
            pager: {
                pageSize: 10,
                pageNumber: 0,
            }
        },
        filteredData: []
    };
    this.init();
    return this;
};

notTable.prototype.init = function() {
    var oRequest = new XMLHttpRequest();
    oRequest.open("GET", this.options.templateUrl);
    oRequest.addEventListener("load", this._setTemplate.bind(this));
    oRequest.send();
};

notTable.prototype._setTemplate = function(response) {
    this._working.template = response.srcElement.responseText;
    this.parseTemplate();
    this.build();
};

notTable.prototype.parseTemplate = function() {
    var containerElement = document.createElement('DIV');
    containerElement.innerHTML = this._working.template;
    this._working.templateElements = {};
    for(var i = 0; i < containerElement.children.length; i++) {
        var el = containerElement.children[i];
        if(el.nodeType === Node.ELEMENT_NODE) {
            if(el.dataset.hasOwnProperty('notTemplateName')) {
                var elName = el.dataset.notTemplateName.replace(this._working.templateNamesPrefix, '');
                this._working.templateElements[elName] = el;
            }
        }
    }
    return this._working.templateElements;
}

notTable.prototype.build = function() {
    var that = this;
    this.views = {
        wrapper: new notView({
            templateOptions: {
                templateElement: this._working.templateElements.wrapper,
                helpers: this.options.helpers
            },
            placeToPut: this.options.place,
            afterExec: function() {
                that.renderHeader();
                that.updateData();
                that.renderBody();
                that.bindSearch();
                that.bindCustomBindings();
                that.options.afterExecCallback && that.options.afterExecCallback();
            }
        })
    };
    this.renderWrapper();

};

notTable.prototype.renderWrapper = function() {
    this.views.wrapper.exec();
};

notTable.prototype.renderHeader = function() {
    var tableHeader = this.options.place.querySelectorAll(':scope thead tr')[0];
    for(var i = 0; i < this.options.headerTitles.length; i++) {
        var newTh = document.createElement('TH');
        newTh.innerHTML = this.options.headerTitles[i].title;
        newTh.dataset.dataFieldName = this.options.headerTitles[i].field;
        newTh.dataset.sortingDirection = 0;
        if(this.options.headerTitles[i].hasOwnProperty('sortable') && this.options.headerTitles[i].sortable) {
            this.attachSortingHandlers(newTh);
        }
        tableHeader.appendChild(newTh);
    }
};

notTable.prototype.renderBody = function() {
    if(!this.options.onePager) {
        this.options.place.querySelectorAll(':scope tbody')[0].innerHTML = '';
    }

    var thisPageStarts = this.options.pageSize * (this.options.pageNumber),
        nextPageEnds = this.options.pageSize * (this.options.pageNumber + 1),
        tbody = this.options.place.querySelectorAll(':scope tbody')[0];

    for(var i = thisPageStarts; i < Math.min(nextPageEnds, this._working.filteredData.length); i++) {
        tbody.appendChild(this.renderRow(this._working.filteredData[i]));
    }
};


notTable.prototype.refreshBody = function() {
    this.options.place.querySelectorAll(':scope tbody')[0].innerHTML = '';
    var thisPageStarts = 0,
        nextPageEnds = this.options.pageSize * (this.options.pageNumber + 1),
        tbody = this.options.place.querySelectorAll(':scope tbody')[0];

    for(var i = thisPageStarts; i < Math.min(nextPageEnds, this._working.filteredData.length); i++) {
        tbody.appendChild(this.renderRow(this._working.filteredData[i]));
    }
};

notTable.prototype.extractAttrValue = function(rItem, fieldName){
    if(rItem.getAttr){
        return rItem.getAttr(fieldName);
    }else{
        return rItem[fieldName];
    }
}

notTable.prototype.renderRow = function(item, index) {
    var newRow = document.createElement('TR');

    for(var i = 0; i < this.options.headerTitles.length; i++) {
        var newTd = document.createElement('TD');
        if (this.options.headerTitles[i].hasOwnProperty('editable')){
            newTd.setAttribute('contentEditable', true);
            var options = extend({}, this.options.headerTitles[i]);
            newTd.dataset.field = this.options.headerTitles[i].field;
            newTd.dataset.itemId = item[this.options.itemIdField];
            newTd.dataset.value = item[newTd.dataset.field];
        }
        newTd.innerHTML = (this.options.headerTitles[i].hasOwnProperty('proccessor')) ? this.options.headerTitles[i].proccessor(item[this.options.headerTitles[i].field], item, index): this.extractAttrValue(item, this.options.headerTitles[i].field);

        if (this.options.headerTitles[i].hasOwnProperty('events') && this.options.headerTitles[i].events){
            for(var j in this.options.headerTitles[i].events){
                console.log(j);
                newTd.addEventListener(j, this.options.headerTitles[i].events[j], false);
            }
        }
        newRow.appendChild(newTd);
    }
    if(this.options.hasOwnProperty('procRow')) {
        return this.options.procRow(newRow, item);
    }
    return newRow;
};



notTable.prototype.attachSortingHandlers = function(headCell) {
    var that = this;
    headCell.addEventListener('click', function(e){e.preventDefault();that.changeSortingOptions(this);return false;});
    headCell.style.cursor = 'pointer';
};

notTable.prototype.changeSortingOptions = function(el) {
    if(parseInt(el.dataset.sortingDirection) === 0) {
        el.dataset.sortingDirection = 1;
    } else {
        el.dataset.sortingDirection = parseInt(el.dataset.sortingDirection) * -1;
    }
    if(el.parentNode) {
        for(var i = 0; i < el.parentNode.children.length; i++) {
            if(el.parentNode.children[i] === el) {
                continue;
            }
            el.parentNode.children[i].classList.remove('sorting_asc');
            el.parentNode.children[i].classList.remove('sorting_desc');
        }
    }
    if(parseInt(el.dataset.sortingDirection) > 0) {
        el.classList.remove('sorting_desc');
        el.classList.add('sorting_asc');
        el.setAttribute('aria-sort', 'ascending');
    } else {
        el.classList.remove('sorting_asc');
        el.classList.add('sorting_desc');
        el.setAttribute('aria-sort', 'descending');
    }
    this.setSorter({sortDirection: el.dataset.sortingDirection, sortByField: el.dataset.dataFieldName });
};

notTable.prototype.setSorter = function(hash){
    this._working.viewPrefs.sorter = hash;
    this.updateData();
};

notTable.prototype.getSorter = function(){
    return this._working.viewPrefs.sorter;
};

notTable.prototype.getFilterSearch = function(){
    return (typeof this.getFilter() !== 'undefined' && this.getFilter() !== null && typeof this.getFilter().filterSearch !== 'undefined' && this.getFilter().filterSearch !== null)?this.getFilter().filterSearch.toString():'';
};

notTable.prototype.setFilter = function(hash){
    this._working.viewPrefs.filter = hash;
    this.updateData();
};

notTable.prototype.getFilter = function(){
    return this._working.viewPrefs.filter;
};

notTable.prototype.setPager = function(hash){
    this._working.viewPrefs.pager = hash;
    this.updateData();
};


notTable.prototype.getPager = function(hash){
    return this._working.viewPrefs.pager;
};

notTable.prototype.testDataItem = function(item){
    var strValue = this.getFilterSearch().toLowerCase();
    for(var k in item){
        var toComp = item[k].toString().toLowerCase();
        if (toComp.indexOf(strValue)>-1){
            return true;
        }
    }
    return false;
};

notTable.prototype.updateData = function(){
    var that = this;
    if (this.options.liveLoad && this.options.notRecord){
        //load from server
        this.options.notRecord = this.options.notRecord.setFilter(this.getFilter()).setSorter(this.getSorter()).setPager(this.getPager().pageSize,this.getPager().pageNumber);
        this.options.notRecord.$list(function(data){
            console.log('$list for table', data);
            that._working.filteredData = data;
            that.refreshBody();
        });
    }else{
        //local magic
        this.proccessData();
        this.refreshBody();
    }
};

notTable.prototype.proccessData = function(){
    var thatFilter = that.getFilter();
    if(typeof thatFilter !== 'undefined' && thatFilter !== null && typeof thatFilter.filterSearch !== 'undefined' && thatFilter.filterSearch!== null && thatFilter.filterSearch.length > 0){
        //
        this._working.filteredData = this.options.data.filter(that.testDataItem.bind(that));
    }else{
        this._working.filteredData = this.options.data;
    }
    ////sorter
    var thatSorter = that.getSorter();
    var that = this;
    if(typeof thatSorter !== 'undefined' && thatSorter !== null){
        this._working.filteredData.sort(function(item1, item2){
            if (isNaN(that.extractAttrValue(item1, thatSorter.fieldName))){
                return that.extractAttrValue(item1,thatSorter.fieldName).localeCompare(that.extractAttrValue(item2,thatSorter.fieldName))*-thatSorter.direction;
            }else{
                return ((that.extractAttrValue(item1,thatSorter.fieldName) < that.extractAttrValue(item2,thatSorter.fieldName))?1:-1)*thatSorter.direction;
            }

        });
    }
}

notTable.prototype.bindSearch = function(){
    if(!searchEl) return;
    var searchEl = this.options.place.querySelectorAll(':scope input[name="search"]')[0];
    var that = this;
    var onEvent = function(e){
        that.setFilter({filterSearch: this.value});
        return true;
    };
    searchEl.addEventListener('keyup', onEvent);
    searchEl.addEventListener('enter', onEvent);
}


notTable.prototype.bindCustomBindings = function(){
    if (!this.options.hasOwnProperty('bindings') || !this.options.bindings){
        return;
    }
    var that = this;
    setTimeout(function(){
        for(var selector in that.options.bindings){
            var els = that.options.place.querySelectorAll(':scope '+selector);
            for(var elId = 0; elId < els.length; elId++){
                var el = els[elId];
                for(var event in that.options.bindings[selector]){
                    el.addEventListener(event, that.options.bindings[selector][event]);
                }
            }
        }
    }, 200);

}


notTable.prototype.setData = function() {

};

notTable.prototype.getData = function() {

};

notTable.prototype.addData = function() {

};

notTable.prototype.loadNext = function() {
    this.options.pageNumber++;
    this.updateData();
};

notTable.prototype.setParam = function(name, value) {
    this.options[name] = value;
}


/*

var dataTable = new notTable({
    tableElement: document.getElementById('table-drivers'),
    headerTitles: not.nrDriver.getTitles(),
    data: arrayOfDrivers,
    pageSize: 10,
    pageNumber: 0,
    onePager: true,
    liveLoad: false
});

*/
