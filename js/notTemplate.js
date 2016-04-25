//we wil use it to search for proc expressions
function getAttributesStartsWith(el, startsWith) {
    var allElements = el.querySelectorAll(':scope *');
    var list = [];
    for(var j = 0; j < allElements.length; j++) {
        for(var i = 0, atts = allElements[j].attributes, n = atts.length; i < n; i++) {
            if(atts[i].nodeName.indexOf(startsWith) === 0) {
                list.push(allElements[j]);
                break;
            }
        }
    }
    return list;
}

var notTemplateCache = {
    cache: {},
    loading: [],
    onLoad: null,
    load: function(map){
        this.loading = [];
        for(var i in map){
            this.loadOne(i, map[i]);
        }
    },
    loadOne: function(key, url, callback){
        this.loading.push(key);
        var oRequest = new XMLHttpRequest();
        oRequest.open("GET", url);
        oRequest.addEventListener("load", function(response) {
            if (this.loading.indexOf(key) > -1) this.loading.splice(this.loading.indexOf(key), 1);
            var div = document.createElement('DIV');
            div.dataset.notTemplateName = key;
            div.dataset.notTemplateURL = url;
            div.innerHTML = response.srcElement.responseText;
            this.setOne(key, div);
            callback && callback(key, url, div);
            if (this.loading.length === 0){
                this.onLoad && this.onLoad();
            }
        }.bind(this));
        oRequest.send();
    },
    setOne: function(key, element){
        this.cache[key] = element;
    },
    get:function(key){
        return this.cache.hasOwnProperty(key)?this.cache[key].cloneNode(true):null;
    },
    getByURL: function(url){
        for(var i in this.cache){
            if (this.cache[i].dataset.notTemplateURL == url){
                return this.get(i);
            }
        }
        return null;
    }
};

/*
 * Использует DOM поддерево в качестве шаблона.
 * Заполняет его данными.
 * Возвращает сгенерированные элементы
 *
 * */

var notTemplate = function(input) {
    var getElement = function(){
        var result = null;
        if (input.hasOwnProperty('templateElement')){
            result = input.templateElement;
        }else{
            if (input.templateCache){
                var cached = notTemplateCache.get(input.templateCache);
                if (cached){
                    result = cached.cloneNode(true);
                }
            }else{
                if (input.hasOwnProperty('templateName') && document.querySelector('[data-not-template-name="' + input.templateName + '"]')){
                    result = document.querySelector('[data-not-template-name="' + input.templateName + '"]').cloneNode(true)
                }
            }
        }
        return result;
    }
    this._notOptions = {
        proccessorIndexAttributeName: 'data-not-template-proccindex',
        proccessorExpressionPrefix: 'data-not-',
        proccessorExpressionSeparator: '-',
        proccessorExpressionConditionPostfix: 'if',
        attributeExpressionItemPrefix: ':',
        attributeExpressionHelpersPrefix: '::',
        attributeExpressionFunctionPostfix: '()',
        attributeExpressionDefaultResult: '',
        repeat: (input.data) instanceof Array,
        data: input.data,
        place: input.place,
        selector: input.templateName,
        template: input.hasOwnProperty('template') ? input.template : null,
        templateCache: input.hasOwnProperty('templateCache') ? input.templateCache : null,
        templateElement: getElement(),
        templateURL: input.hasOwnProperty('templateURL') ? input.templateURL : null,
        helpers: input.helpers,
    };

    this._working = {
        proccessors: [],
        templateHTML: input.hasOwnProperty('template') ? input.template : '',
        templateLoaded: this._notOptions.templateElement?true:false, //input.hasOwnProperty('templateName') || input.hasOwnProperty('template') || input.hasOwnProperty('templateElement'),
        result: [],
        currentEl: null,
        currentItem: null,
        currentIndex: null
    };
    return this;
}

notTemplate.prototype._exec = function() {
    if(this._notOptions.repeat) {
        this._proccessItems();
    } else {
        this._working.currentIndex = 0;
        this._working.currentItem = this._notOptions.data;
        this._proccessItem();
        for(var j = 0; j < this._working.currentEl.children.length; j++){
            this._working.result.push(this._working.currentEl.children[j]);
        }
    }
}

notTemplate.prototype.exec = function(afterExecCallback) {
    //from local html data
    var that = this;
    if(that._working.templateLoaded) {
        that._exec();
        if(typeof afterExecCallback == 'undefined') {
            return that._working.result;
        } else {
            afterExecCallback(that._working.result);
        }
    }
    //from template html file, thru ajax request
    else {
        var preLoaded = notTemplateCache.getByURL(that._notOptions.templateURL);
        if (preLoaded){
            that._working.templateLoaded = true;
            that._notOptions.templateElement = preLoaded;
            that._exec();
            if(typeof afterExecCallback !== 'undefined') afterExecCallback(that._working.result);
        }else{
            notTemplateCache.loadOne(that._notOptions.templateURL, that._notOptions.templateURL,
            function(key, url, element){
                that._working.templateLoaded = true;
                that._notOptions.templateElement = element;
                that._exec();
                if(typeof afterExecCallback !== 'undefined') afterExecCallback(that._working.result);
            });
        }
    }
}

notTemplate.prototype.execAndPut = function(place, afterExecCallback) {
    this.exec(function(result) {
        if(place instanceof HTMLElement) {
            place.innerHTML = '';
            this.insert(place, result);
        }
        if(typeof afterExecCallback !== 'undefined') afterExecCallback(result);
    }.bind(this));
}

notTemplate.prototype.insert = function(parent, children){
    var i = 0;
    if (parent instanceof HTMLElement){
        if(children instanceof HTMLCollection) {
            while(children.length && ++i < 10000){
                this.insert(parent, children[0]);
            }
        }else{
            if( Array.isArray(children)){
                for(var j = 0; j < children.length; j++){
                    this.insert(parent, children[j]);
                }
            }else{
                if (children instanceof HTMLElement) parent.appendChild(children, parent);
            }
        }
    }
    return parent;
}

notTemplate.prototype.insertBefore = function(parent, children){
    var i = 0;
    if (parent instanceof HTMLElement){
        if(children instanceof HTMLCollection) {
            while(children.length && ++i < 10000){
                this.insertBefore(parent, children[0]);
            }
        }else{
            if( Array.isArray(children)){
                for(var j = 0; j < children.length; j++){
                    this.insertBefore(parent, children[j]);
                }
            }else{
                if (children instanceof HTMLElement) parent.parentNode.insertBefore(children, parent);
            }
        }
    }
    return parent;
}


notTemplate.prototype.execAndAdd = function(place, afterExecCallback) {
    this.exec(function(el) {
        this.insert(place, el);
        if(typeof afterExecCallback !== 'undefined') afterExecCallback(el);
    }.bind(this));
}

notTemplate.prototype.execAndReplace = function(place, afterExecCallback) {
    this.exec(function(el) {
        this.insertBefore(place, el);
        place.parentNode.removeChild(place);
        if(typeof afterExecCallback !== 'undefined') afterExecCallback(el);
    }.bind(this));
}

notTemplate.prototype._proccessItems = function() {
    //console.log('proccessItems');
    var i;
    this._working.result = [];
    for(i = 0; i < this._notOptions.data.length; i++) {
        this._working.currentIndex = i;
        this._working.currentItem = this._notOptions.data[i];
        this._proccessItem();
        for(var j = 0; j < this._working.currentEl.children.length; j++){
            this._working.result.push(this._working.currentEl.children[j]);
        }
    }
}

notTemplate.prototype._getTemplateElement = function() {
    if(this._notOptions.template === null) {
        return this._notOptions.templateElement.cloneNode(true)
    } else {
        var container = document.createElement('div');
        container.innerHTML = this._notOptions.template;
        return container;
    }

};

notTemplate.prototype._proccessItem = function() {
    //console.log('proccessItem');
    this._working.currentEl = this._getTemplateElement();
    this._findAllTemplateProccessors();
    this._execProccessorsOnCurrent();
    //$('footer').append(this._working.currentEl);
    //console.log(this._working.currentEl.innerHTML);
    // console.log(this._working.currentEl.html());
}

//search for proccessors in template, and prepare preInput objects for each
notTemplate.prototype._findAllTemplateProccessors = function() {
    'use strict';
    var elsWithProc = getAttributesStartsWith(this._working.currentEl, this._notOptions.proccessorExpressionPrefix),
        j = null;
    this._working.proccessors = [];
    for(j = 0; j < elsWithProc.length; j++) {
        for(var i = 0, atts = elsWithProc[j].attributes, n = atts.length; i < n; i++) {
            if(atts[i].nodeName.indexOf(this._notOptions.proccessorExpressionPrefix) === 0) {
                // console.log(atts[i]);
                var procData = this._parseProccessorExpression(atts[i].nodeName);
                procData.element = elsWithProc[j];
                procData.proccessorExpression = atts[i].nodeName;
                procData.attributeExpression = atts[i].value;
                this._working.proccessors.push(procData);
            }
        }
    }
    //console.log('arrange proccessors', this._working.proccessors);
};

notTemplate.prototype._parseProccessorExpression = function(proccessorExpression) {
    var result = {
        params: [],
        proccessorName: '',
        ifCondition: false
    };
    proccessorExpression = proccessorExpression.replace(this._notOptions.proccessorExpressionPrefix, '');
    if(proccessorExpression.indexOf(this._notOptions.proccessorExpressionConditionPostfix) === (proccessorExpression.length - this._notOptions.proccessorExpressionConditionPostfix.length)) {
        result.ifCondition = true;
        proccessorExpression = proccessorExpression.replace(this._notOptions.proccessorExpressionSeparator + this._notOptions.proccessorExpressionConditionPostfix, '');
    }
    result.params = proccessorExpression.split(this._notOptions.proccessorExpressionSeparator);
    result.proccessorName = result.params[0];
    result.params = result.params.slice(1);
    return result;
}


notTemplate.prototype._getAttributeExpressionResult = function(expression, item, index) {
    'use strict';
    var result = null,
        //trying to distinguish what expression is
        //who will be runner
        isHelpers = expression.indexOf(this._notOptions.attributeExpressionHelpersPrefix) === 0,
        isItem = expression.indexOf(this._notOptions.attributeExpressionItemPrefix) === 0,
        //run or get
        isFunction = expression.indexOf(this._notOptions.attributeExpressionFunctionPostfix) === (expression.length - 2),
        //choosing runner
        runner = (isHelpers ? this._notOptions.helpers : item),
        //gettin name of field or function,
        fieldName = expression.replace(this._notOptions.attributeExpressionHelpersPrefix, '') //in current config remove ::
        .replace(this._notOptions.attributeExpressionItemPrefix, '') //--//--//--//--//- remove :
        .replace(this._notOptions.attributeExpressionFunctionPostfix, ''); //--//--//--//--//- remove ()

    if((!isHelpers && !isItem) || (runner == null || typeof runner == 'undefined')) {
        return expression;
    }

    if(isFunction) {
        result = (runner.hasOwnProperty(fieldName) ? ((runner.getAttr && runner.getAttr(fieldName)) || runner[fieldName])(item, index) : this._notOptions.attributeExpressionDefaultResult);
    } else {
        //console.log(runner[fieldName]);
        result = ((typeof runner[fieldName] !== 'undefined' || (runner.getAttr &&  (typeof runner.getAttr(fieldName) !== 'undefined'))) ?((runner.getAttr && runner.getAttr(fieldName)) || runner[fieldName] ): this._notOptions.attributeExpressionDefaultResult);
    }
    return result;
};

notTemplate.prototype._execProccessorsOnCurrent = function() {
    var i;
    console.log('exec proccessors on current');
    for(i = 0; i < this._working.proccessors.length; i++) {
        this._working.proccessors[i].attributeResult = this._getAttributeExpressionResult(this._working.proccessors[i].attributeExpression, this._working.currentItem, this._working.currentIndex);
        if(this.proccessorsLib.hasOwnProperty(this._working.proccessors[i].proccessorName)) {
            var procName = this._working.proccessors[i].proccessorName;
            this.proccessorsLib[procName](this._working.proccessors[i], this._working.currentItem, this._notOptions.helpers);
            this._working.proccessors[i].element.removeAttribute(this._working.proccessors[i].proccessorExpression);
            //console.log(this._working.proccessors[i].proccessorExpression,this._working.proccessors[i].element.html());
        }
    }
}


/*
 * Proccessor takes in input object
 * input - object, with structure like this
 * {
 *      params: [param1|param2|etc],    //params from proccessor expression
 *      conditionIf: true|false,        //true if proccessor expression ends with -if
 *      item: object                    //item to proccess
 *      attributeResult: whatever       //result of attribute expression
 *      element: HTMLElement            //element to modify, for now extended with jQuery, retiring this
 * }
 *
 * return modified input.element
 *
 */

notTemplate.prototype.proccessorsLib = {
    //provider replace innerHTML with attributeResult
    ////params
    //capitalize - will turn all content to capital register
    //live - should be last, will set event onAttrChange_[fieldname] for notRecord in which will change content if field value differs from innerHTML content
    provider: function(input, item, helpers) {
        'use strict';
        if(input.params.indexOf('capitalize') > -1) input.attributeResult = input.attributeResult.toUpperCase();
        input.element.innerHTML = input.attributeResult;
        var live = input.params.indexOf('live');
        if (live > -1 && live == input.params.length - 1){
            var fieldName = null;
            if (input.attributeExpression.indexOf('::')===0){
                var helperName = input.attributeExpression.replace('::', '');
                if(helpers.hasOwnProperty(helperName)&& helpers[helperName]){
                    fieldName = helpers[helperName];
                }
            }else{
                if(item.on && input.attributeExpression.indexOf(':')===0 ){
                    var fieldName = input.attributeExpression.replace(':', '');
                }
            }
            if (fieldName){
                item.on('onAttrChange_' + fieldName, function(){
                    console.log('on attr change', arguments);
                    var value = item.getAttr(fieldName);
                    if(input.params.indexOf('capitalize') > -1) value = value.toUpperCase();
                    if (input.element.innerHTML!= value){
                        input.element.innerHTML= value;
                    }

                });
            }
        }
    },
    options: function(input, item, helpers) {
        'use strict';
        var i = 0,
            option = null,
            valueFieldName = 'value',
            labelFieldName = 'name',
            itemValueFieldName = helpers.hasOwnProperty('fieldName')?helpers['fieldName']:'value';
        if(input.params.length === 2) {
            labelFieldName = input.params[0];
            valueFieldName = input.params[1];
        }
        if(typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty('option')) {
            labelFieldName = helpers.option.label;
            valueFieldName = helpers.option.value;
        }
        if(input.params.length === 3) {
            itemValueFieldName = input.params[2];
        }
        if(typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty('fieldPlaceHolder') && helpers.hasOwnProperty('fieldPlaceHolderDefault') && helpers.fieldPlaceHolderDefault) {
            option = document.createElement('option');
            option.setAttribute('value', '');
            option.textContent = helpers.fieldPlaceHolder;
            input.element.appendChild(option);
        }
        if(typeof item !== 'undefined' && item !== null){
            for(i = 0; i < input.attributeResult.length; i++) {
                option = document.createElement('option');
                option.setAttribute('value', input.attributeResult[i][valueFieldName]);
                option.textContent = input.attributeResult[i][labelFieldName];
                if(Array.isArray(item[itemValueFieldName])) {
                    if(item[itemValueFieldName].indexOf(input.attributeResult[i][valueFieldName]) > -1) {
                        option.setAttribute('selected', true);
                    }
                } else {
                    if(item[itemValueFieldName] === input.attributeResult[i][valueFieldName]) {
                        option.setAttribute('selected', true);
                    }
                }
                input.element.appendChild(option);
            }
        }

    },
    attr: function(input, item, helpers) {
        'use strict';
        input.element.setAttribute(input.params[0], input.attributeResult);
        var live = input.params.indexOf('live');
        if (live > -1 && live == input.params.length - 1){
            var fieldName = null;
            if (input.attributeExpression.indexOf('::')===0){
                var helperName = input.attributeExpression.replace('::', '');
                if(helpers.hasOwnProperty(helperName)&& helpers[helperName]){
                    fieldName = helpers[helperName];
                }
            }else{
                if(item.on && input.attributeExpression.indexOf(':')===0 ){
                    var fieldName = input.attributeExpression.replace(':', '');
                }
            }
            if (fieldName && item.isRecord){
                item.on('onAttrChange_' + fieldName, function(){
                    console.log('on attr change', arguments);
                    var newVal = item.getAttr(fieldName);
                    if(typeof newVal !== 'undefined' && input.element.getAttribute(input.params[0]) != newVal){
                        input.element.setAttribute(input.params[0], newVal);
                    }
                });
            }
        }
    },
    addclass: function(input, item, helpers) {
        if(input.attributeResult) {
            input.element.classList.add(input.params[0]);
        }
    },
    //live - should be last, will set event onAttrChange_[fieldname] for notRecord in which will change content if field value differs from input element value content
    value: function(input, item, helpers) {
        console.log('value', input);
        var src = item;
        if (input.attributeExpression.indexOf('::') > -1){
            src = helpers;
        }
        var valuePath = notCommon.normilizePath(input.attributeExpression);
        var value = input.attributeExpression.indexOf('.') > -1 && input.attributeExpression.indexOf('()') == -1 ? notCommon.getValueByPath(src, valuePath):input.attributeResult;
        input.element.setAttribute('value', value);
        var live = input.params.indexOf('live');
        if (live > -1 && live == input.params.length - 1){
            var fieldName = null;
            if (input.attributeExpression.indexOf('::')===0 && helpers.hasOwnProperty('fieldName')){
                fieldName = notCommon.normilizePath(input.attributeExpression);
                if (fieldName.indexOf('fieldValue')>-1){
                    fieldName[fieldName.indexOf('fieldValue')] = helpers.fieldName;
                }
            }else{
                if(item.on && input.attributeExpression.indexOf(':')===0 ){
                    var fieldName = notCommon.normilizePath(input.attributeExpression);
                }
            }
            if (fieldName && fieldName.length && item.isRecord){
                item.on('onAttrChange_' + fieldName[0], function(){
                    console.log('on attr change', arguments);
                    var newVal = item.getAttr(fieldName.join('.'));
                    if (input.element.nodeName == "SELECT" && input.element.multiple){
                        curElVal = [];
                        for(var g = 0; g < input.element.selectedOptions.length; g++){
                            curElVal.push(input.element.selectedOptions[g].value);
                        }
                        if(!notCommon.identical(newVal, curElVal)){
                            for(var g = 0; g < input.element.children.length;g++){
                                if(input.element.children[g].nodeName === 'OPTION'){
                                    input.element.children[g].selected = newVal.indexOf(input.element.children[g].value)>-1;
                                }
                            }
                        }
                    }else{
                        if(typeof newVal !== 'undefined' && !notCommon.identical(input.element.value,newVal)){
                            input.element.value = newVal;
                        }
                    }
                });
            }
        }
    },
    checked: function(input, item, helpers) {
        console.log('checked', input);
        input.element.setAttribute('checked', input.attributeResult);
        console.log(input);
    },
    bind: function(input, item, helpers) {
        var that = this;
        console.log('bind', input);
        input.element.addEventListener(input.params[0], function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            if(typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty(input.attributeResult)) {
                helpers[input.attributeResult](item, e);
            }
            return false;
        });
    },
    subtemplate: function(input, item, helpers){
        var that = this;
        var capitalizeFirstLetter = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        //console.log(input, item, helpers);
        var tmplName = input.params[0];
        for(var i = 1; i < input.params.length; i++){
            if (input.params[i]== 'live' && i+1==input.params.length){
                break;
            }
            tmplName+=capitalizeFirstLetter(input.params[i]);
        }
        var resultElements = (new notTemplate({
            templateCache: tmplName,
            templateName: tmplName,
            helpers: helpers,
            data: input.attributeResult
        })).execAndReplace(input.element);


        var live = input.params.indexOf('live');
        if (live > -1 && live == input.params.length - 1){
            var fieldName = helpers.hasOwnProperty('fieldName')?helpers.fieldName:null;
            if (fieldName && item.isRecord){
                item.on('onAttrChange_' + fieldName, function(){
                    console.log('on attr change', arguments);

                });
            }
        }
    },
    //data-not-live="title"
    //will watch for changes on liveEvents and change object field or notRecord attribute acordingly
    live: function(input, item, helpers){
        var that = this,
            liveEvents = ['change', 'keyup'];
        console.log('live', input);
        var attrPath = input.attributeResult;
        if (input.attributeExpression.indexOf(':')===0){
            attrPath = input.attributeExpression;
            if(input.attributeExpression.indexOf('::')===0){
                attrPath = attrPath.replace('::fieldName', helpers.fieldName);
            }else{
                attrPath = attrPath.replace(':', '');
            }
        }
        for(var i = 0; i < liveEvents.length;i++){
            input.element.addEventListener(liveEvents[i], function(e) {
                var edit = true;
                if(typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty('validators') && helpers.validators.hasOwnProperty(attrPath)) {
                    edit = helpers.validators[attrPath](input, item, e);
                }
                if (edit && item.isRecord){
                    if(input.element.type == 'checkbox'){
                        notCommon.setValueByPath(item, attrPath, input.element.checked?input.element.value:undefined);
                    }else{
                        var curElVal = input.element.value;
                        if(input.element.nodeName === 'SELECT' && input.element.multiple && typeof input.element.selectedOptions !== 'undefined'){
                            curElVal = [];
                            for(var g = 0; g < input.element.selectedOptions.length; g++){
                                curElVal.push(input.element.selectedOptions[g].value);
                            }
                            if (notCommon.identical(curElVal, notCommon.getValueByPath(item, attrPath))){
                                edit = false;
                            }else{
                                notCommon.setValueByPath(item, attrPath, curElVal);
                            }

                        }else{
                            if (notCommon.identical(notCommon.getValueByPath(item, attrPath), curElVal)){
                                edit = false;
                            }else{
                                notCommon.setValueByPath(item, attrPath, curElVal);
                            }
                        }
                    }
                }
                return edit;
            });
        }
    }
};
