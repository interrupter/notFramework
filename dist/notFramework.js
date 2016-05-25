String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var notApp = function (notManifest) {
    this._notOptions = notManifest;
    this.resources = {};
    this._working = {
        interfaces: {},
        controllers: {},
        initController: null,
        currentController: null,
        forms:  {}
    };
};

notApp.prototype.exec = function () {
    var url =this._notOptions.interfaceManifestURL,
        success = this._setInterfaceManifest.bind(this);
    $.ajax({
        dataType: "json",
        data: '',
        url: url,
        success: success
    });
};

notApp.prototype._setInterfaceManifest = function (data) {
    this._notOptions.interfaceManifest = data;
    this._update();
};

notApp.prototype._getInterfaceManifest = function () {
    return this._notOptions.interfaceManifest;
};

notApp.prototype._update = function () {
    //нужно инициализировать
    //модели полученными интерфейсами
    this._updateInterfaces();
    //создание объектов автогенерация форм
    this._initFormBuilders();
    //иницилицировать и запустить контроллер инициализации
    this._initController();
    if (this.allResourcesReady()){
        this.startApp();
    }
};

notApp.prototype.startApp = function(){
    //создать контроллеры
    //роутер и привязать к нему контроллеры
    this._initRouter();
};

notApp.prototype._bindController = function(controllerName){
    var ctrl = new notController(this, controllerName);
    //return function(param){
        return ctrl.exec.bind(ctrl);
    //}
};

notApp.prototype._initController = function(){
    if (typeof (this._notOptions.initController)!=='undefined'){
        this._working.initController = new notController(this, this._notOptions.initController);
        this._working.initController.exec();
    }
};

notApp.prototype._initRouter = function(){
    var routieInput = {}, that = this;
    $.each(this._notOptions.siteManifest, function(route, controllerName){
        routieInput[route] = that._bindController(controllerName);
    });
    this._working.router = routie(routieInput);
};

notApp.prototype._getCurrentController = function(){
    return this._working.currentController;
};

notApp.prototype._setCurrentController = function(ctrl){
    this._working.currentController = ctrl;
    return this;
};

notApp.prototype._updateInterfaces = function () {
    this._clearInterfaces();
    if (this._notOptions.hasOwnProperty('interfaceManifest')){
        $.each(this._notOptions.interfaceManifest, this._initInterface.bind(this));
    }
};

notApp.prototype._getRecordName = function(name){
    return 'nr'+name.capitalizeFirstLetter();
};

notApp.prototype._getControllerName = function(name){
    return 'nc'+name.capitalizeFirstLetter();
};

notApp.prototype._initInterface = function (index, manifest) {
    //console.log(index, manifest);
    this._working.interfaces[this._getRecordName(index)] = new notRecord(manifest);
};

notApp.prototype.nr = function(modelName, data) {
    var manifest = this._notOptions.interfaceManifest.hasOwnProperty(modelName)?this._notOptions.interfaceManifest[modelName]:{};
    //console.log(modelName, manifest, data);
    return new notRecord(manifest, data);
};

notApp.prototype._getInterfaces = function () {
    return this._working.interfaces;
};

notApp.prototype._clearInterfaces = function () {
    this._working.interfaces = {};
};

notApp.prototype._initFormBuilders = function(){
    this._clearFormBuilders();
    if (this._notOptions.hasOwnProperty('forms')){
        $.each(this._notOptions.forms, this._initFormBuilder.bind(this));
    }
};

notApp.prototype._initFormBuilder = function(index, manifest){
    //console.log('init form builder', index,  manifest);
    this._working.forms[index] = new notFormFactory(this, manifest);
    this._working.forms[index].init(this.waitThisResource('form', index));
};

notApp.prototype._getFormBuilders = function(){
    return this._working.forms;
};

notApp.prototype._clearFormBuilders = function(){
    this._working.forms = {};
};

notApp.prototype.waitThisResource = function(type, index){
    if (!this.resources.hasOwnProperty(type)){
        this.resources[type]    = {};
    }
    this.resources[type][index] = false;
    return this.onResourceReady.bind(this, type, index);
};

notApp.prototype.onResourceReady = function(type, index){
    this.resources[type][index] = true;
    if (this.allResourcesReady()){
        this.startApp();
    }
};

notApp.prototype.allResourcesReady = function(){
    var i, j;
    for(i in this.resources){
        for (j in this.resources[i]){
            if (!this.resources[i][j]){
                return false;
            }
        }
    }
    return true;
};

notApp.prototype.getOptions = function(){
    return this._notOptions.options;
}

var notCommon = {
    extend: function(destination, source) {
        for(var property in source) {
            if(source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                arguments.callee(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    },
    defineIfNotExists: function(obj, key, defaultValue) {
        if(!obj.hasOwnProperty(key) || typeof obj[key] === 'undefined' || obj[key] === null) {
            obj[key] = defaultValue;
        }
    },

    //::fieldName.sub.value
    ////['fieldName', 'sub', 'value']
    normilizePath: function(path){
        if (Array.isArray(path)){
            return path;
        }else{
            while(path.indexOf(':') > -1){
                path = path.replace(':','');
            }
            return path.split('.');
        }
    },
    parsePathStep: function(step, item, helper){
        if(step.indexOf('::') === 0 && helper){
            var rStep = step.replace('::', '');
            if(rStep.indexOf('()') === rStep.length-2){
                rStep = step.replace('()', '');
                if(helper.hasOwnProperty(rStep)){
                    return helper[rStep](item, undefined);
                }
            }else{
                return helper[rStep];
            }
        }else{
            if(step.indexOf(':') === 0 && item){
                var rStep = step.replace(':', '');
                if(rStep.indexOf('()') === rStep.length-2){
                    rStep = step.replace('()', '');
                    if(item.hasOwnProperty(rStep)){
                        return item[rStep](item, undefined);
                    }
                }else{
                    return item[rStep];
                }
            }
        }
        return step;
    },

    //::fieldName.result
    //{}
    //{fieldName: 'targetRecordField'}
    ////['targetRecordField', 'result']
    parsePath: function(path, item, helper){
        if (!Array.isArray(path)){
            path = path.split('.');
        }
        for(var i = 0; i < path.length;i++){
            path[i] = this.parsePathStep(path[i], item, helper);
        }
        return path;
    },
    getValueByPath: function(object, attrPath){
        var attrPath = this.normilizePath(attrPath);
        var attrName = attrPath.shift();
        if (typeof object == 'object' && object.hasOwnProperty(attrName)){
            if (attrPath.length > 0){
                return this.getValueByPath(object[attrName], attrPath);
            }else{
                return object[attrName];
            }
        }else{
            return undefined;
        }
    },
    setValueByPath: function(object, attrPath, attrValue){
        var attrPath = this.normilizePath(attrPath);
        var attrName = attrPath.shift();
        if (attrPath.length > 0){
            if (!object.hasOwnProperty(attrName)){object[attrName] = {};}
            this.setValueByPath(object[attrName], attrPath, attrValue);
        }else{
            if(object && object.isRecord){
                object._setAttr(attrName, attrValue, true);
            }else{
                object[attrName] = attrValue;
            }
        }
        if (object && object.isRecord){
            object.trigger('onAttrChange_' + attrName, object, attrName, attrValue);
            object.trigger('onAttrChange', object, attrName, attrValue);
        }
    },
    identicalArrays: function(arr1, arr2){
        arr1.sort(); arr2.sort();
        return (arr1.join(',').localeCompare(arr2.join(',')) === 0);
    },
    identicalToArray: function(arr, val){
        return ((arr.length == 1) && arr.indexOf(val)===0);
    },
    identical: function(a, b){
        if (Array.isArray(a) && Array.isArray(b)){
            return this.identicalArrays(a, b);
        }else{
            if((Array.isArray(a) && !Array.isArray(b)) || (!Array.isArray(a) && Array.isArray(b))){
                return Array.isArray(a)?this.identicalToArray(a, b):this.identicalToArray(b, a);
            }else{
                return a == b;
            }
        }
    }
};

var notEvent = {
    on: function(eventName, eventCallback) {
        notCommon.defineIfNotExists(this, "working", {});
        notCommon.defineIfNotExists(this.working, "events", {});
        notCommon.defineIfNotExists(this.working.events, eventName, []);
        this.working.events[eventName].push(eventCallback);
    },
    trigger: function(eventName) {
        notCommon.defineIfNotExists(this, "working", {});
        notCommon.defineIfNotExists(this.working, "events", {});
        notCommon.defineIfNotExists(this.working.events, eventName, []);
        for(var i in this.working.events[eventName]) {
            this.working.events[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
    },
    off: function(eventName, eventCallback) {
        if(!this.hasOwnProperty("working")) {
            return;
        }
        if(!this.working.hasOwnProperty("events")) {
            return;
        }
        if(!this.working.events.hasOwnProperty(eventName)) {
            return;
        }
        var index = this.working.events[eventName].indexOf(eventCallback);
        this.working.events[eventName].splice(index, 1);
    },
}

if (typeof extend === 'undefined' || extend === null){
    var extend = function ( defaults, options ) {
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };
}

var notController = function(app, controllerName) {
    this.app = app;
    this.ncName = 'nc' + (controllerName.capitalizeFirstLetter());
    this.containerSelector = '.page-content';
    this.viewsPostfix = '.html';
    this.renderFromURL = true;
    var that = this;
    /*

        сразу делаем доступными модели notRecord из nc`ControllerName` будут доступны как this.nr`ModelName`

    */
    $.each(this.app._getInterfaces(), function(index, interface) {
        if(typeof((window[that.ncName])) !== 'undefined')(window[that.ncName]).prototype[index] = interface;
    });

}

/*
    разделяемые функции начинаются с $ и находятся в прототипе

*/

notController.prototype.$render = function(nc/* ncName function this*/, name /* view name */, data/* data for notTemplate*/, helpers /* could be not represented */,callback) {
    var view = nc.views.hasOwnProperty(name) ?nc.views[name] : null;
    if(typeof view === 'undefined' || view === null) return;
    // если place не указано, что возможно и разумно при не существовании
    // элемента, но известном идентификаторе
    if(((typeof view.place === 'undefined') || (view.place === null)) && (typeof view.placeId !== 'undefined' && view.placeId !== null && view.placeId.length>0)){
        view.place = document.getElementById(view.placeId);
    }
    //если 4 аргумента значит, helpers  пропустили
    switch (arguments.length){
        //переназначаем со сдвигом
        case 4: realCallback = helpers;
                realHelpers = {};
            break;
        //переназначаем напрямую
        default:
                realHelpers = helpers;
                realCallback = callback;
    }
    view.data = data;
    if (typeof view.helpers !== 'undefined' && view.helpers !== null && Object.keys(view.helpers).length > 0){
        view.helpers = extend(view.helpers, realHelpers);
    }else{
        view.helpers = realHelpers;
    }
    //если нужно загружать шаблоны
    if(nc.renderFromURL) {
        //и адрес не указан
        if(typeof view.templateURL === 'undefined' || view.templateURL == null || view.templateURL.length == 0) {
            //генерируем адрес по шаблону
            view.templateURL = (view.common?nc.commonViewsPrefix:nc.viewsPrefix) + ((typeof view.name !== 'undefined' && view.name !== null &&  view.name.length>0)?view.name:name) + nc.viewsPostfix;
        }
    } else {
        //а если есть название шаблона, то
        if(view.hasOwnProperty('templateName')) {
            //...
            view.templateName = nc.viewsPrefix + view.templateName + nc.viewsPostfix;
        }
    }
    (new notTemplate(view)).execAndPut(view.place, realCallback);
}

notController.prototype.exec = function(params) {
    //console.log('exec', this, Object.keys(this.__proto__));

    if(typeof((window[this.ncName])) !== 'undefined') {
        //ищем имена разделяемых функций
        var sharedList = Object.keys(this.__proto__).filter(function(key) {
            return(key.indexOf('$') === 0);
        });
        //закидываем их в новую функцию
        if(sharedList.length > 0) {
            for(var k in sharedList) {
                window[this.ncName].prototype[sharedList[k]] = this.__proto__[sharedList[k]];
            }
        }
        new(window[this.ncName])(this.app, params);
        //console.log(new(window[this.ncName])(this.app, params));
        //console.log('after new controller');
    } else {

    }
}


if(typeof extend === 'undefined' || extend === null) {
    var extend = function(defaults, options) {
        var extended = {};
        var prop;
        for(prop in defaults) {
            if(Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for(prop in options) {
            if(Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };
}

var notFormFactory = function(app, options) {
    this.app = app;
    this._params = {
        runActionOnSubmit: true,
        removeOnRestore: true,
        afterSubmit: function(data) {},
        afterRestore: function(data) {},
    };

    this.options = options;
    this._working = {
        template: '',
        prefix: 'notForm_',
        formElements: {},
        defaulField: {
            type: 'text',
            placeholder: 'text placeholder'
        }
    };
    return this;
}


notFormFactory.prototype.init = function(onReady) {
    this._working.onReady = onReady;
    this.loadTemplate(onReady);
}

notFormFactory.prototype.loadTemplate = function() {
    var oRequest = new XMLHttpRequest();
    oRequest.open("GET", this.options.templateUrl);
    oRequest.addEventListener("load", this._setTemplate.bind(this));
    oRequest.send();
};


notFormFactory.prototype._setTemplate = function(response) {
    this._working.template = response.srcElement.responseText;
    this.parseTemplate();
    this._working.onReady();
};

notFormFactory.prototype.parseTemplate = function() {
    var containerElement = document.createElement('DIV');
    containerElement.innerHTML = this._working.template;
    for(var i = 0; i < containerElement.children.length;) {
        var thisTemplate = containerElement.children[i];
        if(thisTemplate.nodeName !== '#text' && thisTemplate.dataset.hasOwnProperty('notTemplateName')) {
            var thisWrapper = document.createElement('div');
            thisWrapper.appendChild(thisTemplate);
            notTemplateCache.setOne(thisTemplate.dataset.notTemplateName, thisWrapper);
        } else {
            i++;
        }
    }
}

notFormFactory.prototype.build = function(formParams) {
    var form = new notForm(this.app, this.options);
    return form.build(formParams);
};


notFormFactory.prototype.buildAndPut = function(formParams, placeId) {
    var form = new notForm(this.app, this.options);
    return form.buildAndPut(formParams, placeId);
};

var notForm = function(app /* приложение к которому цепляемся */ , options /* опции */ ) {
    this.app = app;
    this._params = {
        runActionOnSubmit: true,
        removeOnRestore: true,
        afterSubmit: function(data) {},
        afterRestore: function(data) {},
    };

    this.options = options;
    this._working = {
        block: 0,
        template: '',
        prefix: 'notForm_',
        formElements: {},
        defaulField: {
            type: 'text',
            placeholder: 'text placeholder'
        }
    };
    return this;
};

notForm.prototype.setOption = function(key, value) {
    this.options[key] = value;
    return this;
};

notForm.prototype.getOption = function(key) {
    return this.options[key];
};

notForm.prototype.init = function(onReady) {
    this._working.onReady = onReady;
    this.loadTemplate(onReady);
}

notForm.prototype.loadTemplate = function() {
    var oRequest = new XMLHttpRequest();
    oRequest.open("GET", this.options.templateUrl);
    oRequest.addEventListener("load", this._setTemplate.bind(this));
    oRequest.send();
};


notForm.prototype._setTemplate = function(response) {
    this._working.template = response.srcElement.responseText;
    this.parseTemplate();
    this._working.onReady();
};

notForm.prototype.parseTemplate = function() {
    var containerElement = document.createElement('DIV');
    containerElement.innerHTML = this._working.template;
    for(var i = 0; i < containerElement.children.length;) {
        var thisTemplate = containerElement.children[i];
        if(thisTemplate.nodeName !== '#text' && thisTemplate.dataset.hasOwnProperty('notTemplateName')) {
            var thisWrapper = document.createElement('div');
            thisWrapper.appendChild(thisTemplate);
            notTemplateCache.setOne(thisTemplate.dataset.notTemplateName, thisWrapper);
        } else {
            i++;
        }
    }
}

notForm.prototype._getFormElementTemplate = function(fieldType, full) {
    var key = this._working.prefix + fieldType,
        thisTemplate = notTemplateCache.get(key);
    if(thisTemplate) {
        return thisTemplate;
    } else {
        return '';
    }
};

notForm.prototype._getFieldValue = function(object, fieldName) {
    var value = '',
        fieldPath = fieldName.split('.');
    if(fieldPath.length > 1) {
        var nextSubObject = fieldPath.shift();
        if(object && object.hasOwnProperty(nextSubObject)) {
            return this._getFieldValue(object[nextSubObject], fieldPath.join('.'));
        }
    } else {
        if(object && object.hasOwnProperty(fieldName)) {
            if(typeof object[fieldName] === 'object' &&  (object[fieldName] !== null) && object[fieldName].hasOwnProperty('_id')) {
                value = object[fieldName]._id;
            } else {
                value = object[fieldName];
            }
        }
        return value;
    }
}

notForm.prototype.buildFormElement = function(fieldName) {
    var params = this._getParams();
    var field = this._getFormField(fieldName);
    var helpers = {
        fieldValue: (params && typeof params.data !== 'undefined' && params.data !== null) ? this._getFieldValue(params.data, fieldName) : '',
        fieldName: params.modelField?params.modelField+'['+fieldName+']':fieldName,
        fieldLabel: field.hasOwnProperty('label') ? field.label : '',
        fieldId: fieldName + 'Input',
        fieldPlaceHolder: field.hasOwnProperty('placeholder') ? field.placeholder : '',
        option: field.hasOwnProperty('option') ? field.option : {
            value: '_id',
            label: 'title'
        },
        optionsLib: (params.hasOwnProperty(fieldName + 'Lib')) ? params[fieldName + 'Lib'] : []
    };

    if(this._working.params.hasOwnProperty('fields') && this._working.params.fields.hasOwnProperty(fieldName) && this._working.params.fields[fieldName].hasOwnProperty('helpers')) {
        helpers = extend(helpers, this._working.params.fields[fieldName].helpers);
    }
/*
    var data = {
        value: helpers.fieldValue
    };*/

    var result = (new notTemplate({
            templateElement: this._getFormElementTemplate(field.type, true),
            helpers: helpers,
            data: params.data
        }))
        .exec();

    if(this._working.params.hasOwnProperty('fields') && this._working.params.fields.hasOwnProperty(fieldName) && this._working.params.fields[fieldName].hasOwnProperty('postProccessor')) {
        result = this._working.params.fields[fieldName].postProccessor(result, params.data, helpers.fieldValue);
    }

    return result;
};

notForm.prototype.isFieldBlock = function(field) {
    return typeof field !== 'string' && typeof field === 'object' && (field.hasOwnProperty('form') || field.hasOwnProperty('fields'));
}

notForm.prototype.getFieldName = function(field) {
    if(this.isFieldBlock(field)) {
        if(!field.hasOwnProperty('name')) {
            field.name = 'block' + (++this._working.block);
        }
        return field.name;
    } else {
        return field;
    }

}

notForm.prototype.buildFormBlockElement = function(block) {
    var fieldValue = this.getRecord()[block.modelField];
    var subForm = this.app._working.forms.common.build({
        actionName: 'new',
        title:      block.title,
        scenario:   this._getParams().scenario,
        blockType:  block.type,
        modelName:  block.modelName?block.modelName:null,
        modelField:  block.modelField?block.modelField:null,
        data:       block.modelName?this.app.nr(block.modelName, fieldValue):this.app.nr(this._getParams().data.getModelName(), fieldValue),
        fields:     block.fields?block.fields:null
    });
    return [subForm];
}

//field content is array
notForm.prototype.setFieldContent = function(fieldName, elements) {
    if(elements instanceof HTMLCollection) {
        var els = [];
        for(var i = 0; i < elements.length; i++) {
            els.push(elements[i]);
        }
    } else {
        if(Array.isArray(elements)) {
            var els = [];
            for(var i = 0; i < elements.length;i++){
                if (Array.isArray(elements[i])){
                    els = els.concat(elements[i]);
                }else{
                    els.push(elements[i]);
                }
            }

        } else {
            els = [elements];
        }
    }
    this._working.formElements[fieldName] = els;
}

notForm.prototype.getFieldContent = function(fieldName) {
    return this._working.formElements.hasOwnProperty(fieldName) ? this._working.formElements[fieldName] : [];
}

notForm.prototype.buildContent = function(field, fieldName){
    if(this.isFieldBlock(field)) {
        this.setFieldContent(fieldName, this.buildFormBlockElement(field));
    } else {
        this.setFieldContent(fieldName, this.buildFormElement(fieldName));
    }
}

notForm.prototype.updateFieldContent = function(fieldName){
    var field = this.getFieldDefinitionByName(fieldName);
    if(field){
        var oldContent  = this.getFieldContent(fieldName);
        this.buildContent(field, fieldName);
        this.replaceContent(fieldName, oldContent);
    }
}

notForm.prototype.getFieldDefinitionByName = function(fieldName){
    var fields = this._getScenario().fields;
    for(var i =0; i< fields.length ;i++){
        if (this.isFieldBlock(fields[i])){
            if (fields[i].name == fieldName){
                return fields[i];
            }
        }else{
            if (fields[i] == fieldName){
                return fields[i];
            }
        }
    }
    return null;
}

notForm.prototype.findParent = function(elements){
    return elements.length > 0? elements[0].parentNode:null;
}

notForm.prototype.findPrev = function(elements){
    return elements.length > 0 ? elements[0].previousSibling:null;
}

notForm.prototype.findNext = function(elements){
    return elements.length > 0? elements[elements.length-1].nextSibling:null;
}

notForm.prototype.removeNodes = function(elements){
    for(var i = 0; i < elements.length; i++){
        elements[i].parentNode.removeChild(elements[i]);
    }
}

notForm.prototype.insertBefore = function(node, list){
    if (node && list && list.length > 0){
        for(var i = 0; i < list.length; i++){
            node.parentNode.insertBefore(list[i], node);
        }
    }
}

notForm.prototype.append = function(parent, list){
    if (parent && list && list.length > 0){
        for(var i = 0; i < list.length; i++){
            parent.appendChild(list[i]);
        }
    }
}

notForm.prototype.replaceContent = function(fieldName, oldContent){
    var newContent = this.getFieldContent(fieldName),
        parent = this.findParent(oldContent),
        prevNode = this.findPrev(oldContent),
        nextNode = this.findNext(oldContent);
    this.removeNodes(oldContent);
    if(parent){
        if(nextNode){
            this.insertBefore(nextNode, newContent);
        }else{
            this.append(parent, newContent);
        }
    }
    this.attachOnCustomActions();
}

notForm.prototype.buildContents = function(fields) {
    var elements = [],
        i = 0,
        block = 0;
    for(i = 0; i < fields.length; i++) {
        var fieldName = this.getFieldName(fields[i]);
        this.buildContent(fields[i], fieldName);
    }
};

notForm.prototype.buildFormWrapper = function(formName) {
    var params = this._getParams();
    return(new notTemplate({
            templateElement: this._getFormElementTemplate(formName, true),
            data: this._getParams(),
            helpers: {
                formTitle: this._getFormTitle(),
                formId: 'Form_' + params.data.getModelName() + '_' + params.actionName,
                formName: 'Form_' + params.data.getModelName() + '_' + params.actionName,
                formContainerId: 'FormContainer_' + params.data.getModelName() + '_' + params.actionName,
            }
        }))
        .exec();
};

notForm.prototype.buildBlockWrapper = function(blockName) {
    var params = this._getParams();
    return (new notTemplate({
            templateElement: this._getFormElementTemplate(blockName, true),
            data: this._getParams(),
            helpers: {
                formTitle: this._getParams().title,
                blockName: params.modelField,
                blockId: params.modelField,
                formId: 'Form_' + params.data.getModelName() + '_' + params.actionName,
                formName: 'Form_' + params.data.getModelName() + '_' + params.actionName,
                formContainerId: 'FormContainer_' + params.data.getModelName() + '_' + params.actionName,
            }
        })).exec();
};

notForm.prototype.buildBlock = function() {
    var block = '',
        i = 0,
        fields = null,
        params = this._getParams();
    if(params.fields){
        fields = params.fields
    }else{
        if (params.data && params.data.isRecord){
            fields = scenario.fields;
        }
    }
    if(fields) {
        this.buildContents(fields);
        block = this.buildBlockWrapper(params.blockType);
        var blockElement = this.queryResult(block, ':scope [data-role="block"]');
        ////console.log(blockElement);
        this.fillWithContent(block, blockElement);
    }
    this._working.resultForm = block;
    return this._working.block;
}

notForm.prototype.queryResult = function(many, query){
    if((many instanceof HTMLCollection || Array.isArray(many))){
        for(var i=0;i < many.length;i++){
            var find = this.queryResult(many[i], query);
            if (find){
                return find;
            }
        }
    }else{
        return many.querySelector(query);
    }
}

notForm.prototype.queryResultAll = function(many, query){
    var result = [];
    if((many instanceof HTMLCollection || Array.isArray(many))){
        for(var i = 0; i < many.length;i++){
            var find = this.queryResultAll(many[i], query);
            if (find && find.length > 0){
                result = result.concat(find);
            }
        }
        return result;
    }else{
        var subResult = many.querySelectorAll(query);
        if (subResult && subResult.length>0){
            subResult = Array.prototype.slice.call(subResult);
            return subResult;
        }else{
            return [];
        }
    }
}

notForm.prototype.addContent = function(el, container,mainContainer){
    if(el.dataset.hasOwnProperty("target")) {
        var targetEl = this.queryResult(container, ':scope [data-role="' + el.dataset.target + '"]');
        if(targetEl) {
            targetEl.appendChild(el);
            return;
        }
    }
    if (mainContainer && mainContainer instanceof HTMLElement){
        mainContainer.appendChild(el);
    }
}

notForm.prototype.fillWithContent = function(container, mainContainer){
    var scenario = this._getScenario(),
        params = this._getParams(),
        fields = scenario?scenario.fields:(params&&params.hasOwnProperty('fields')?params.fields:null);
    if (!fields){
        return;
    }
    for(var i = 0; i < fields.length; i++){
        var fieldName = this.getFieldName(fields[i]);
        var fieldContent = this.getFieldContent(fieldName);
        for(var j = 0; j < fieldContent.length; j++) {
            var el = fieldContent[j];
            if(!(el instanceof HTMLElement)) continue;
            this.addContent(el, container,mainContainer);
        }
    }
}

notForm.prototype.buildForm = function() {
    var form = '',
        i = 0,
        scenario = this._getScenario();
    if(typeof scenario !== 'undefined' && scenario !== null) {
        this.buildContents(scenario.fields);
        form = this.buildFormWrapper(this._getParams().formType);
        var formElement = this.queryResult(form, ':scope form');
        this.fillWithContent(form, formElement);
    }
    this._working.resultForm = form;
    return this._working.resultForm;
};

notForm.prototype._getScenario = function() {
    var action = this._getAction(),
        params = this._getParams();
    if(action && action.hasOwnProperty('form')) {
        if(params && params.hasOwnProperty('scenario') && action.form.hasOwnProperty('scenario')) {
            if(action.form.scenario.hasOwnProperty(params.scenario)) {
                return action.form.scenario[params.scenario];
            } else {
                return action.form[params.scenario];
            }
        } else {
            return action.form;
        }
    } else {
        return null;
    }
};

notForm.prototype._getParams = function() {
    return this._working.params;
};

notForm.prototype._getAction = function() {
    var model = this._getModel();
    return model.actions[this._getActionName()];
};

notForm.prototype._getActionName = function() {
    return this._getParams()
        .actionName;
};

notForm.prototype._getFormTitle = function() {
    if (this._getParams().hasOwnProperty('title')){
        return this._getParams().title;
    }else{
        var action = this._getAction();
        if(action.hasOwnProperty('form')) {
            if(action.form.hasOwnProperty('title')) {
                return action.form.title;
            }
        }
    }

    return 'Form title';
};

notForm.prototype.extractFieldValue = function(fieldName, fieldValue){
    var fieldValue = fieldValue?fieldValue:undefined,
        field = this._getFormField(fieldName),
        form = this.queryResult(this._working.resultForm, ':scope form');
    switch(field.type) {
        case 'multi':
            var inpEls = this.queryResultAll(form, ':scope [name="' + fieldName + '"] option:checked');
            if(inpEls) {
                fieldValue = [];
                for(var j = 0; j < inpEls.length; j++) {
                    ////console.log(inpEls[j], inpEls[j].value);
                    fieldValue.push(inpEls[j].value);
                }
            }
            break;
        case 'submit':
        case 'file':  break;
        default:
            var inpEl = this.queryResult(form, ':scope [name="' + fieldName + '"]');
            if(inpEl && inpEl.type !== 'submit') {
                ////console.log(inpEl, inpEl.value);
                if (inpEl.type=='checkbox' ){
                    fieldValue = inpEl.checked?inpEl.value:null;
                }else{
                    fieldValue = inpEl.value;
                }
            }
    }
    return fieldValue;
}

notForm.prototype.extractBlockValue = function(block, blockValue){
    var blockValue = blockValue?blockValue:{};
    for(var i = 0; i < block.fields.length; i++) {
        fieldName = block.fields[i];
        field = this._getFormField(fieldName);
        if(field.hasOwnProperty('ignore') && field.ignore){
            continue;
        }else{
            fieldValue = this.extractFieldValue(block.modelField+'['+fieldName+']');
        }
        if(typeof fieldValue !== 'undefined') {
            blockValue[fieldName] = fieldValue;
        }
    }
    return blockValue;
}

notForm.prototype._collectFieldsDataToRecord = function() {
    ////console.log(this._working.resultForm);
    var params = this._getParams(),
        record = params.data,
        scenario = this._getScenario(),
        fieldsTypes = this._getFormFieldsTypes(),
        form = this.queryResult(this._working.resultForm, ':scope form'),
        i = 0,
        field = null,
        fieldName = null,
        fieldValue = null,
        formData = new FormData(form);

    for(i = 0; i < scenario.fields.length; i++) {
        fieldName = scenario.fields[i];
        if (this.isFieldBlock(fieldName)){
            fieldValue = this.extractBlockValue(fieldName, record[fieldName.modelField]);
        }else{
            field = this._getFormField(fieldName);
            if(field.hasOwnProperty('ignore') && field.ignore){
                continue
            }else{
                fieldValue = this.extractFieldValue(fieldName);
            }
        }
        if(typeof fieldValue !== 'undefined') {
            record.setAttr(this.getFieldName(fieldName), fieldValue);
        }
    }
    record.setModelParam('formData', formData);
};

notForm.prototype._onSubmitSuccess = function(data) {
    var params = this._getParams();
    this._validationErrorsHandling();
    this._removeForm();
    (params.hasOwnProperty('afterSubmit') ? params.afterSubmit(data) : null);
};

notForm.prototype._setValidationErrorForField = function(fieldName, message) {
    var elements = this.getFieldContent(fieldName);
    for(var i = 0; i< elements.length; i++){
        var el = elements[i];
        el.classList.add('has-error');
        var errorText = el.querySelector(':scope .help-block');
        if(errorText) {
            errorText.style.WebkitTransition = 'opacity 1s';
            errorText.style.MozTransition = 'opacity 1s';
        }
    }
};


notForm.prototype._setValidationSuccessForField = function(fieldName) {
    var elements = this.getFieldContent(fieldName);
    for(var i = 0; i< elements.length; i++){
        var el = elements[i];
        el.classList.remove('has-success');
    }
};

notForm.prototype._validationErrorsHandling = function(validationReport) {
    var i;
    for(i in this._working.formElements) {
        if(typeof validationReport !== 'undefined' && validationReport !== null && validationReport.hasOwnProperty(i)) {
            this._setValidationErrorForField(i, validationReport[i]);
        } else {
            this._resetValidationErrorForField(i);
            this._setValidationSuccessForField(i);
        }
    }
};

notForm.prototype._resetValidationErrorForField = function(fieldName) {
    var elements = this.getFieldContent(fieldName);
    for(var i = 0; i< elements.length; i++){
        var el = elements[i];
        el.classList.remove('has-error');
        var errorText = el.querySelector(':scope .help-block');
        if(errorText) {
            errorText.style.WebkitTransition = 'opacity 1s';
            errorText.style.MozTransition = 'opacity 1s';
        }
    }
    //errorText.style.opacity = 0;
};



notForm.prototype.attachOnSubmitAction = function() {
    if (this._working.resultForm){
        var el = this.queryResult(this._working.resultForm, ':scope form');
        if(el) {
            el.addEventListener('submit', this._submitForm.bind(this));
        }
    }
};

notForm.prototype.attachOnCustomActions = function() {
    if (this._working.resultForm){
        var els = this.queryResultAll(this._working.resultForm, ':scope button'),
            params = this._getParams();
        if(els && els.length > 0) {
            for(var i = 0; i < els.length; i++) {
                if(els[i].getAttribute('type') && els[i].getAttribute('type') === 'button') {
                    var actionName = els[i].dataset.notAction;
                    if(params.hasOwnProperty('actions') && params.actions.hasOwnProperty(actionName)) {
                        if (!els[i].classList.contains('customAction_'+actionName+'_initialized')){
                            els[i].addEventListener('click', params.actions[actionName].bind(this));
                            els[i].classList.add('customAction_'+actionName+'_initialized');
                        }
                    }
                }
            }
        }
    }
};

notForm.prototype.getRecord = function() {
    return this._getParams().data;
}

notForm.prototype._submitForm = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this._collectFieldsDataToRecord();
    this.getRecord()['$' + this._getParams()
        .actionName](this._onSubmitSuccess.bind(this), this._validationErrorsHandling.bind(this));
    return false;
};

notForm.prototype.attachRemoveOnRestore = function() {
    if(this._working.resultForm){
        var el = this.queryResult(this._working.resultForm, ':scope button[type="restore"]');
        if(el) {
            el.addEventListener('click', this._removeForm.bind(this));
        }
    }

};

notForm.prototype._removeForm = function(e) {
    if(typeof e !== 'undefined' && e !== null) e.preventDefault();
    this.removeNodes(this._working.resultForm);
    if(typeof e !== 'undefined' && e !== null) {
        (this._getParams().hasOwnProperty('afterRestore') ? this._getParams().afterRestore(e) : null);
    }
    return false;
};

notForm.prototype._getModelName = function() {
    if(typeof this._getParams()
        .modelName !== 'undefined' && this._getParams()
        .modelName !== null) {
        return this._getParams().modelName;
    } else {
        if(this._getParams().hasOwnProperty('data')) {
            var data = this._getParams().data;
            if(typeof data.modelName !== 'undefined' && data.modelName !== null) {
                return data.modelName;
            }
            if(typeof data.getModelName !== 'undefined' && data.getModelName !== null) {
                return data.getModelName();
            }
        }
    }
    return null;
};

notForm.prototype._getModel = function() {
    return this.app._getInterfaceManifest()[this._getModelName()];
};

notForm.prototype._getFormFieldsTypes = function() {
    var model = this._getModel();
    return model&&model.formFieldsTypes?model.formFieldsTypes:null;
};

notForm.prototype._getFormField = function(field) {
    var types = this._getFormFieldsTypes();
    if(typeof types !== 'undefined' && types !== null && types.hasOwnProperty(field)) {
        return types[field];
    }
    return this._getDefaultField();
};

notForm.prototype._getDefaultField = function() {
    return this._working.defaulField;
};

notForm.prototype._clearWorking = function() {
    this._working.resultForm = null;
    this._working.formElements = {};
};

notForm.prototype.build = function(formParams) {
    this._clearWorking();
    this._working.params = extend(this._params, formParams);
    ////console.log('build form ', this._getModelName(), this._getActionName(), this._getFormFieldsTypes(), this._getParams());
    if(this._working.params.hasOwnProperty('blockType') && this._working.params.blockType) {
        this.buildBlock();
    } else {
        if(this._working.params.hasOwnProperty('formType') && this._working.params.formType) {
            this.buildForm();
        }
    }
    this.attachOnSubmitAction();
    this.attachRemoveOnRestore();
    this.attachOnCustomActions();
    return this._working.resultForm;
};

notForm.prototype.buildAndPut = function(formParams, placeId) {
    this.build(formParams);
    var placeEl = document.getElementById(placeId);
    if(Array.isArray(this._working.resultForm)){
        for(var i = 0; i<this._working.resultForm.length;i++){
            placeEl.appendChild(this._working.resultForm[i]);
        }
    }
    return this;
};

notForm.prototype.getResult = function() {
    return this._working.resultForm;
}

/**
    строим формы по манифесту
    this.app.forms.common.build('theme', 'new', { record: item, name: 'baseItemBlock', scenario: 'admin'});

 **/



var pager = {
    /*
     * Лучше грузить по 5-10 штук, иначе может подтормаживать при перестройке DOM
     * При переполнении кэша элементы в него не только добавляются, но и в том же кол-ве удаляются.
     * Все новые требуют время на инициализацию событий и т.д.
     * */
    //сколько грузить элементов за запрос
    COMPLECTS_PER_PAGE: 20,
    //размер кэша страниц в страницах
    MAX_PAGES_IN_CACHE: 2,
    //первая страница
    PAGE_NUMBER_MINIMUM: 1,
    //последняя обновляется каждый запрос из response.PAGES
    PAGE_NUMBER_MAXIMUM: 1,
    //правая и левая границы загруженных элементов в страницах
    //правая больше 0
    //левая только меньше 1
    //должно выполняться правило: (правая + модуль(левая)+1) меньше или равно максимальному числу страниц
    pageNumberCurrent: {
        left: null, //init values
        right: null //do not change!
    },
    //текущий размер кэша
    cacheSize: 0,
    //направление последней загрузки prev|next
    lastDirection: '',
    //блокировка загрузки
    apiBlocked: false,
    //текущий набор элементов
    complects: [],
    //от куда берем данные
    apiURL: '',
    //получаем данные для фильтра
    getFilterParams: function () {
        return {};
    },
    //установка параметров для загрузки данных, прокрутка вправо
    nextPage: function () {
        this.lastDirection = 'next';
        if (this.pageNumberCurrent.right===null){
            this.pageNumberCurrent.right=1;
        }else{
            this.pageNumberCurrent.right++;
        }
        //проверяем нет ли пересечения границ
        //нет
        if (this.checkBorders()){ return true;}
        //есть
        else{
            //откатываем параметры
            this.pageNumberCurrent.right--;
            //отменяем загрузку
            return false;
        }
    },
    //установка параметров для загрузки данных, прокрутка влево
    prevPage: function () {
        this.lastDirection = 'prev';
        if (this.pageNumberCurrent.left===null){
            this.pageNumberCurrent.left=0;
        }
        else{
            this.pageNumberCurrent.left--;
        }

        //проверяем нет ли пересечения границ
        //нет
        if (this.checkBorders()){ return true;}
        else{
            this.pageNumberCurrent.left++;
            return false;
        }
    },

    //проверяем не сходятся ли границы
    //если сходятся - загрузили уже все
    checkBorders: function(){
        return (this.pageNumberCurrent.right + Math.abs(this.pageNumberCurrent.left) <= this.PAGE_NUMBER_MAXIMUM);
    },

    // обработка загруженных данных
    addPage: function (data) {
        //console.log('recieved', data);
        var cacheFull = false;
        this.PAGE_NUMBER_MAXIMUM = parseInt(data.PAGES);
        this.cacheSize++;
        //обновление хранимых данных
        switch (this.lastDirection) {
        case 'prev':
            //добавление новых
            this.complects = data.ELEMENTS.concat(this.complects);
            //проверка переполнения кэша
            if (this.cacheSize > this.MAX_PAGES_IN_CACHE) {
                //сокращение при переполнении
                this.complects = this.complects.slice(0, this.complects.length - this.COMPLECTS_PER_PAGE);
                this.cacheSize--;
                cacheFull=true;
            }
            break;
        case 'next':
            this.complects = this.complects.concat(data.ELEMENTS);
            //проверка переполнения кэша
            if (this.cacheSize > this.MAX_PAGES_IN_CACHE) {
                //сокращение при переполнении
                this.complects = this.complects.slice(this.COMPLECTS_PER_PAGE, this.complects.length);
                this.cacheSize--;
                cacheFull=true;
            }
            break;
        }
        //разблокируем загрузку, для синхронизации
        this.unBlockApi();
        //console.log('CacheSize:', this.cacheSize);
        //console.log('rebuilded complects:', this.complects);
        //теперь можно перестраивать DOM
        this.onPageLoad(this.complects, data.ELEMENTS, this.lastDirection, cacheFull);
    },

    //возвращает номер страницы для загрузки в зависимости от направления
    getRequestedPagesNumber: function () {
        switch (this.lastDirection) {
        case 'next':
            return this.pageNumberCurrent.right;
            break;
        case 'prev':
            return this.PAGE_NUMBER_MAXIMUM + this.pageNumberCurrent.left;
            break;
        }
    },

    //обращение к серверу за данными
    apiLoad: function () {
        var params = {
            filter: this.getFilterParams(),
            pageSize: this.COMPLECTS_PER_PAGE,
            pageNum: this.getRequestedPagesNumber()
        };
        //блокируем загрузку, для синхронизации
        this.blockApi();
        //console.log('pager params:', jQuery.param(params));
        $.getJSON(this.apiURL+'?'+jQuery.param(params), this.addPage.bind(this));
    },

    //загрузка страницы вправо
    loadNextPage: function () {
        if (this.apiBlocked || !this.nextPage()) return;
        this.apiLoad();
    },

    //загрузка страницы влево
    loadPrevPage: function () {
        if (this.apiBlocked || !this.prevPage()) return;
        this.apiLoad();
    },

    //разблокировка загрузки
    unBlockApi: function () {
        this.apiBlocked = false;
    },
    //блокировка загрузки
    blockApi: function () {
        this.apiBlocked = true;
    },

    //сброс всех актуальных данных, переход в дефолтное состояние
    reset: function(){
        this.complects = [];
        this.cacheSize = 0;
        this.pageNumberCurrent = {left: null, right: null};
        this.lastDirection = '';
        this.apiBlocked = false;
    },

    //событие после загрузки и обработки данных
    onPageLoad: function (allData, newData, direction) {
        //console.log('rebuildElements of complects');
    }

};


String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/* *
 *
 * Создает простой способ доступа к JSON данным на сервере.
 * Реализует основные REST методы save, get, list, update, delete
 * В дополнение к этому есть:
 * findBy - поиск по одному из полей
 * filter - поиск по ряду полей
 *
 * */
var notRecord_stdObjectProps = {
    writable: false,
    enumerable: false
};

function capitalizeFirstLetter(string) {
    'use strict';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var DEFAULT_RECORD_ID_FIELD_NAME = '_id';
var DEFAULT_PAGE_NUMBER = 1;
var DEFAULT_PAGE_SIZE = 10;


var notRecord_Interface = {
    extendObject: function(obj1, obj2) {
        'use strict';
        var attrName = '';
        for(attrName in obj2) {
            if(obj2.hasOwnProperty(attrName)) {
                obj1[attrName] = obj2[attrName];
            }
        }
        return obj1;
    },

    parseLine: function(line, record, actionName) {
        'use strict';
        var i = 0,
            recordRE = ':record[',
            fieldName = '';
        while(line.indexOf(recordRE) > -1) {
            var ind = line.indexOf(recordRE);
            var len = recordRE.length;
            var ind2 = line.indexOf(']');
            var ind3 = line.indexOf(recordRE);
            var startSlice = ind + len;
            var endSlice = ind2;
            fieldName = line.slice(startSlice, endSlice);
            if(fieldName == '') break;

            line = line.replace(':record[' + fieldName + ']', record.getAttr(fieldName));
        }
        line = line.replace(':modelName', record._notOptions.interfaceManifest.model);
        line = line.replace(':actionName', actionName);
        return line;
    },

    getURL: function(record, actionData, actionName) {
        'use strict';
        var line = this.parseLine(record._notOptions.interfaceManifest.url, record, actionName) + ((actionData.hasOwnProperty('postFix')) ? this.parseLine(actionData.postFix, record, actionName) : '');
        return line;
    },

    collectRequestData: function(record, actionData) {
        'use strict';
        var requestData = {},
            i = 0;
        if((actionData.hasOwnProperty('data')) && typeof(actionData.data) !== 'undefined' && actionData.data !== null) {
            for(i = 0; i < actionData.data.length; i++) {
                var dataProviderName = 'get' + capitalizeFirstLetter(actionData.data[i]);
                if(dataProviderName in record) {
                    requestData = this.extendObject(requestData, record[dataProviderName]());
                }
            }
        }
        var formData = new FormData();
        var len = Object.keys(requestData).length;
        if(len > 0) {
            for(var i in requestData) {
                formData.append(i, requestData[i]);
            }
        }
        if ((actionData.method === 'POST' && (actionData.hasOwnProperty('formData')&& actionData.formData))){
            var savedFormData = record.getModelParam('formData');
            if(savedFormData){
                for(var i in formData){
                    if (savedFormData.has && !savedFormData.has(i)){
                        savedFormData.append(i, formData[i]);
                    }
                }
                return savedFormData;
            }else{
                return (formData);
            }
        }else{
            if (actionData.hasOwnProperty('json') && actionData.json){
                return JSON.stringify(requestData);
            }else{
                return requestData;
            }
        }
    },

    request: function(record, actionName, callbackSuccess, callbackError) {
        'use strict';
        //console.log('request', actionName);
        var actionData = record._notOptions.interfaceManifest.actions[actionName];
        var additionalParams = {
            cache: false,
            contentType: false,
            processData: false
        };
        var formData = this.collectRequestData(record, actionData);
        var basicParams = {
            method: actionData.method,
            data: formData,
            complete: function(data, code) {
                var result = [];
                data = data.responseJSON;
                if(code == "success") {
                    if(('isArray' in actionData) && actionData.isArray) {
                        $.each(data, function(index, item) {
                            result.push(new notRecord(record._notOptions.interfaceManifest, item));
                        });
                    } else {
                        result = new notRecord(record._notOptions.interfaceManifest, data);
                    }
                    callbackSuccess && callbackSuccess(result);
                } else {
                    if(typeof callbackError !== 'undefined' && callbackError !== null && code === "error") callbackError(data);
                }
            }
        };
        if(formData instanceof FormData) {
            var finalParams = jQuery.extend(basicParams, additionalParams);
        } else {
            var finalParams = basicParams;
        }
        //console.log('finalParams', finalParams);
        $.ajax(this.getURL(record, actionData, actionName), finalParams);
    }
};

/*
 *
 */

//создаем объект с заданым манифестом интерфейса, если есть данные, то добавляем в него
var notRecord = function(interfaceManifest, item) {
    if(item && item.isRecord){
        return item;
    }else{
        if (Array.isArray(item)){
            var collection = [];
            for(var i = 0; i < item.length; i++){
                collection.push(new notRecord(interfaceManifest, item[i]));
            }
            return collection;
        }
    }
    this._notOptions = {
        interfaceManifest: interfaceManifest,
        filter: {},
        sorter: {},
        pageNumber: DEFAULT_PAGE_NUMBER,
        pageSize: DEFAULT_PAGE_SIZE,
        fields: []
    };
    if(typeof item !== 'undefined' && item !== null) {
        notRecord_Interface.extendObject(this, item);
        this._notOptions.fields = Object.keys(item);
        this._addMetaAttrs();
    }
    var that = this;
    if (this._notOptions.hasOwnProperty('interfaceManifest') && typeof this._notOptions.interfaceManifest !== 'undefined' && this._notOptions.interfaceManifest !== null &&
        this._notOptions.interfaceManifest.hasOwnProperty('actions') && typeof this._notOptions.interfaceManifest.actions !== 'undefined' && this._notOptions.interfaceManifest.actions !== null
        ){
        /*for(var actionName in this._notOptions.interfaceManifest.actions){
            if(!(this.hasOwnProperty('$' + actionName))) {
                var action = function(callbackSuccess, callbackError) {
                    (notRecord_Interface.request.bind(notRecord_Interface, this.actionOwner, this.actionName, callbackSuccess, callbackError)).call();
                };
                action.actionName = actionName;
                action.actionOwner = this;
                this['$' + actionName] = action.bind(action);
            } else {
                console.error('interface manifest for ', interfaceManifest.model, ' conflict with notRecord property "', '$' + actionName, '" that alredy exists');
            }
        }*/
        $.each(this._notOptions.interfaceManifest.actions, function (index, actionManifest) {
        if (!(this.hasOwnProperty('$' + index))) {
            that['$' + index] = function (callbackSuccess, callbackError) {
                //console.log('$' + index);
                (notRecord_Interface.request.bind(notRecord_Interface, this, index + '', callbackSuccess, callbackError)).call();
            }
        } else {
            //console.error('interface manifest for ', interfaceManifest.model, ' conflict with notRecord property "', '$' + index, '" that alredy exists');
        }
    });
    }
    return this;
};

notRecord.prototype.isRecord = true;

Object.defineProperties(notRecord.prototype, {
    'modelName': {
        get: function() {
            'use strict';
            return this._notOptions.interfaceManifest.model;
        }
    },
    'interfaceManifest': {
        get: function() {
            'use strict';
            return this._notOptions.interfaceManifest;
        }
    }
});

notRecord.prototype.on = notEvent.on;
notRecord.prototype.off = notEvent.off;
notRecord.prototype.trigger = notEvent.trigger;

notRecord.prototype.setModelParam = function(paramName, paramValue) {
    if (this){
        if (this.hasOwnProperty('_notOptions')){
            this._notOptions[paramName] = paramValue;
        }
    }

    return this;
}

notRecord.prototype.getModelParam = function(paramName) {
    return this&&this.hasOwnProperty('_notOptions')?this._notOptions[paramName]: null;
}

notRecord.prototype.getModelName = function() {

    return this&&this.hasOwnProperty('_notOptions')?this._notOptions.interfaceManifest.model:null;
}


/*
    получаем название поля данных для отображения в интерфейсе
*/

notRecord.prototype.getFieldTitle = function(fieldName) {
    var defaultResult = fieldName;
    if((typeof this._notOptions.interfaceManifest.formFieldsTypes !== 'undefined') && (this._notOptions.interfaceManifest.formFieldsTypes.hasOwnProperty(fieldName))) {
        if(this._notOptions.interfaceManifest.formFieldsTypes[fieldName].hasOwnProperty('label')) {
            return this._notOptions.interfaceManifest.formFieldsTypes[fieldName].label;
        }
        if(this._notOptions.interfaceManifest.formFieldsTypes[fieldName].hasOwnProperty('placeholder')) {
            return this._notOptions.interfaceManifest.formFieldsTypes[fieldName].placeholder;
        }
        if(this._notOptions.interfaceManifest.formFieldsTypes[fieldName].hasOwnProperty('caption')) {
            return this._notOptions.interfaceManifest.formFieldsTypes[fieldName].caption;
        }
    } else {
        return defaultResult;
    }
};

/*

    возвращаем массив объектов {названиеПоля: заголовокПоля}
    навзваниеПоля - ключ в объекте с данными
    заголовокПоля - человеко читаемая запись для отображения в интерфейсе

*/
notRecord.prototype.getFieldTitles = function() {
    var defaultResult = [];
    if((typeof this._notOptions.interfaceManifest.formFieldsTypes !== 'undefined') && (this._notOptions.interfaceManifest.formFieldsTypes) && Object.keys(this._notOptions.interfaceManifest.formFieldsTypes).length > 0) {
        for(var i = 0; i < this.getModelParam('fields').length; i++) {
            var fieldName = this.getModelParam('fields')[i];
            var fieldTitle = {};
            fieldTitle[fieldName] = this.getFieldTitle(fieldName);
            defaultResult.push(fieldTitle);
        }
    }
    return defaultResult;
};

notRecord.prototype._addMetaAttrs = function() {
    var i,
        fieldName,
        fieldType,
        fields = this.getModelParam('fields');
    for(i in fields) {
        fieldName = fields[i];
        fieldType = typeof this[fieldName];
        if(fieldType === 'object') {
            this._addMetaAttr(fieldName, this[fieldName]);
        }
    }
};

notRecord.prototype._addMetaAttr = function(name, value) {
    var i, k;
    for(i in value) {
        k = i + "";
        Object.defineProperty(this, name + i.capitalizeFirstLetter(), {
            get: function(fieldName) {
                'use strict';
                return this[name][fieldName];
            }.bind(this, i)
        });
    }
};

notRecord.prototype.setChanged = function(attrName, attrValue) {
    this.trigger('onAttrChange_' + attrName, this, attrName, attrValue);
    this.trigger('onAttrChange', this, attrName, attrValue);
    return this;
}

notRecord.prototype._setAttr = function(attrName, attrValue, silent) {
    'use strict';
    var fields = this.getModelParam('fields');
    if(fields.indexOf(attrName) == -1) {
        fields.push(attrName);
        this.setModelParam('fields', fields);
    }
    this[attrName] = attrValue;
    if(typeof attrValue === 'Object') {
        notRecord.prototype._addMetaAttr(attrName, attrValue);
    }
    if(!silent){
        this.trigger('onAttrChange_' + attrName, this, attrName, attrValue);
        this.trigger('onAttrChange', this, attrName, attrValue);
    }
    return this;
}


notRecord.prototype.setAttr = function(attrName, attrValue) {
    'use strict';
    var attrPath = notCommon.normilizePath(attrName);
    var attrName = attrPath.shift();
    var fields = this.getModelParam('fields');
    if(fields.indexOf(attrName) == -1) {
        fields.push(attrName);
        this.setModelParam('fields', fields);
    }
    if (attrPath.length > 0){
        notCommon.setValueByPath(this.getAttr(attrName)||{}, attrPath, attrValue);
    }else{
        this[attrName] = attrValue;
    }
    if(typeof attrValue === 'Object') {
        notRecord.prototype._addMetaAttr(attrName, attrValue);
    }
    this.trigger('onAttrChange_' + attrName, this, attrName, attrValue);
    this.trigger('onAttrChange', this, attrName, attrValue);
    return this;
}

notRecord.prototype.setAttrs = function(hash) {
    'use strict';
    var h;
    for(h in hash) {
        this.setAttr(h, hash[h]);
    }
    return this;
}

notRecord.prototype.getAttrByPath = function(object, attrPath){
    var attrName = attrPath.shift();
    if (object.hasOwnProperty(attrName)){
        if (attrPath.length > 0){
            return this.getAttrByPath(object[attrName], attrPath);
        }else{
            return object[attrName];
        }
    }else{
        return undefined;
    }
}

notRecord.prototype.getAttr = function(attrName) {
    'use strict';
    if(typeof attrName === 'undefined' || attrName == null) return undefined;
    var path = attrName.split('.');
    switch (path.length){
        case 0:
                return undefined;
            break;
        case 1:
            if(this.getModelParam('fields').indexOf(attrName) > -1) {
                return this[attrName];
            } else {
                return undefined;
            }
            break;
        default:
                return notCommon.getValueByPath(this, path);
    }
}

notRecord.prototype.setFilter = function(filterData) {
    'use strict';
    this.setModelParam('filter', filterData);
    return this;
};

notRecord.prototype.getFilter = function() {
    'use strict';
    return this.getModelParam('filter');
};

notRecord.prototype.setSorter = function(sorterData) {
    'use strict';
    this.setModelParam('sorter', sorterData);
    return this;
};

notRecord.prototype.getSorter = function() {
    'use strict';
    return this.getModelParam('sorter');
};

notRecord.prototype.setPageNumber = function(pageNumber) {
    'use strict';
    this.setModelParam('pageNumber', pageNumber);
    return this;
};

notRecord.prototype.setPageSize = function(pageSize) {
    'use strict';
    this.setModelParam('pageSize', pageSize);
    return this;
};

notRecord.prototype.setPager = function(pageSize, pageNumber) {
    'use strict';
    this.setModelParam('pageSize', pageSize).setModelParam('pageNumber', pageNumber);
    return this;
};

notRecord.prototype.getPager = function() {
    'use strict';
    return {
        pageSize: this.getModelParam('pageSize'),
        pageNumber: this.getModelParam('pageNumber')
    };
};

notRecord.prototype.getRecord = function() {
    'use strict';
    var result = {},
        i = 0,
        fieldName,
        fields = this.getModelParam('fields');
    for(i = 0; i < fields.length; i++) {
        fieldName = fields[i];
        result[fieldName] = this.getAttr(fieldName);
        if (result[fieldName] && result[fieldName].isRecord){
            result[fieldName] = result[fieldName].getRecord();
        }else{
            if (Array.isArray(result[fieldName])){
                var col = [];
                for(var j = 0; j < result[fieldName].length; j++){
                    if (result[fieldName][j] && result[fieldName][j].isRecord){
                        col.push(result[fieldName][j].getRecord());
                    }else{
                        col.push(result[fieldName][j]);
                    }
                }
                result[fieldName] = col;
            }
        }
    }
    return result;
};

notRecord.prototype.setFindBy = function(key, value) {
    'use strict';
    var obj = {};
    obj[key] = value;
    return this.setFilter(obj);
};

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
            sorter: this.options.sorter?this.options.sorter:{},
            filter: this.options.filter?this.options.filter:{},
            pager: {
                pageSize: this.options.pageSize?this.options.pageSize:this.DEFAULT_PAGE_SIZE,
                pageNumber: this.options.pageNumber?this.options.pageNumber:this.DEFAULT_PAGE_NUMBER,
            }
        },
        filteredData: []
    };
    this.init();
    return this;
};

notTable.prototype.DEFAULT_PAGE_SIZE = 10;
notTable.prototype.DEFAULT_PAGE_NUMBER = 0;

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
    var tableHeader = this.options.place.querySelector(':scope thead tr');
    if (!tableHeader) return;
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

notTable.prototype.findBody = function(){
    return this.options.place.querySelector(':scope tbody');
}

notTable.prototype.clearBody = function(){
    var tableBody = this.findBody();
    if (!tableBody) return;
    tableBody.innerHTML = '';
}

notTable.prototype.renderBody = function() {
    if(!this.options.onePager) {
        this.clearBody();
    }
    var thisPageStarts = this.getPager().pageSize * (this.getPager().pageNumber),
        nextPageEnds = this.getPager().pageSize * (this.getPager().pageNumber + 1),
        tbody = this.findBody();
    for(var i = thisPageStarts; i < Math.min(nextPageEnds, this._working.filteredData.length); i++) {
        tbody.appendChild(this.renderRow(this._working.filteredData[i]));
    }
};


notTable.prototype.refreshBody = function() {
    var tbody = this.findBody();
    if (!tbody){
        return ;
    }
    this.clearBody();
    var thisPageStarts = 0,
        nextPageEnds = this.getPager().pageSize * (this.getPager().pageNumber + 1);

    for(var i = thisPageStarts; i < Math.min(nextPageEnds, this._working.filteredData.length); i++) {
        tbody.appendChild(this.renderRow(this._working.filteredData[i]));
    }
};

notTable.prototype.extractAttrValue = function(rItem, fieldName){
    var result = undefined;
    if(rItem.getAttr){
        result = rItem.getAttr(fieldName);
    }else{
        result =  rItem[fieldName];
    }

    if (typeof result !== 'undefined' && result !== null){
        return result;
    }else{
        return 0;
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
                //console.log(j);
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
    this.invalidateData();
    this.updateData();
};

notTable.prototype.getSorter = function(){
    return this._working.viewPrefs.sorter;
};

notTable.prototype.getFilterSearch = function(){
    return (typeof this.getFilter() !== 'undefined' && this.getFilter() !== null && typeof this.getFilter().filterSearch !== 'undefined' && this.getFilter().filterSearch !== null)?this.getFilter().filterSearch.toString():'';
};

notTable.prototype.invalidateData = function(){
    if (this.options.liveLoad && this.options.onePager){
        this.options.data = [];
        this.resetPager();
    }
}

notTable.prototype.setFilter = function(hash){
    this._working.viewPrefs.filter = hash;
    this.invalidateData();
    this.updateData();
};

notTable.prototype.getFilter = function(){
    return this._working.viewPrefs.filter;
};

notTable.prototype.setPager = function(hash){
    this._working.viewPrefs.pager = hash;
    this.updateData();
};

notTable.prototype.resetPager = function(){
    this._working.viewPrefs.pager = {
        pageSize: this.options.pageSize?this.options.pageSize:this.DEFAULT_PAGE_SIZE,
        pageNumber: this.options.pageNumber?this.options.pageNumber:this.DEFAULT_PAGE_NUMBER,
    };
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

notTable.prototype.setUpdating = function(){
    this._working.updating = true;
}

notTable.prototype.setUpdated = function(){
    this._working.updating = false;
}

notTable.prototype.ifUpdating = function(){
    return this._working.updating;
}

notTable.prototype.updateData = function(){
    var that = this;
    if (this.options.liveLoad && this.options.notRecord){
        if (this.ifUpdating()){
            return;
        }
        //load from server
        this.options.notRecord = this.options.notRecord.setFilter(this.getFilter()).setSorter(this.getSorter()).setPager(this.getPager().pageSize,this.getPager().pageNumber);
        this.setUpdating();
        this.options.notRecord.$list(function(data){
            //console.log('$list for table', data);
            that.options.data = that.options.data.concat(data);
            that.proccessData();
            that.refreshBody();
            that.setUpdated();
        });

    }else{
        //local magic
        this.proccessData();
        this.refreshBody();
    }
};

notTable.prototype.proccessData = function(){
    var that = this;
    var thatFilter = this.getFilter();
    if(typeof thatFilter !== 'undefined' && thatFilter !== null && typeof thatFilter.filterSearch !== 'undefined' && thatFilter.filterSearch!== null && thatFilter.filterSearch.length > 0){
        //
        this._working.filteredData = this.options.data.filter(that.testDataItem.bind(that));
    }else{
        this._working.filteredData = this.options.data;
    }
    ////sorter
    var thatSorter = that.getSorter();

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

    var searchEl = this.options.place.querySelectorAll('input[name="search"]')[0];
    if(!searchEl) return;
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
            var els = that.options.place.querySelectorAll(selector);
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
    this._working.viewPrefs.pager.pageNumber++;
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
    load: function(map) {
        this.loading = [];
        for(var i in map) {
            this.loadOne(i, map[i]);
        }
    },
    loadOne: function(key, url, callback) {
        this.loading.push(key);
        var oRequest = new XMLHttpRequest();
        oRequest.open("GET", url);
        oRequest.addEventListener("load", function(response) {
            if(this.loading.indexOf(key) > -1) this.loading.splice(this.loading.indexOf(key), 1);
            var div = document.createElement('DIV');
            div.dataset.notTemplateName = key;
            div.dataset.notTemplateURL = url;
            div.innerHTML = response.srcElement.responseText;
            this.setOne(key, div);
            callback && callback(key, url, div);
            if(this.loading.length === 0) {
                this.onLoad && this.onLoad();
            }
        }.bind(this));
        oRequest.send();
    },
    setOne: function(key, element) {
        this.cache[key] = element;
    },
    get: function(key) {
        return this.cache.hasOwnProperty(key) ? this.cache[key].cloneNode(true) : null;
    },
    getByURL: function(url) {
        for(var i in this.cache) {
            if(this.cache[i].dataset.notTemplateURL == url) {
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
    var getElement = function() {
        var result = null;
        if(input.hasOwnProperty('templateElement')) {
            result = input.templateElement;
        } else {
            if(input.templateCache) {
                var cached = notTemplateCache.get(input.templateCache);
                if(cached) {
                    result = cached.cloneNode(true);
                }
            } else {
                if(input.hasOwnProperty('templateName') && document.querySelector('[data-not-template-name="' + input.templateName + '"]')) {
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
        templateLoaded: this._notOptions.templateElement ? true : false, //input.hasOwnProperty('templateName') || input.hasOwnProperty('template') || input.hasOwnProperty('templateElement'),
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
        for(var j = 0; j < this._working.currentEl.children.length; j++) {
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
        if(preLoaded) {
            that._working.templateLoaded = true;
            that._notOptions.templateElement = preLoaded;
            that._exec();
            if(typeof afterExecCallback !== 'undefined') afterExecCallback(that._working.result);
        } else {
            notTemplateCache.loadOne(that._notOptions.templateURL, that._notOptions.templateURL,
                function(key, url, element) {
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

notTemplate.prototype.insert = function(parent, children) {
    var i = 0;
    if(parent instanceof HTMLElement) {
        if(children instanceof HTMLCollection) {
            while(children.length && ++i < 10000) {
                this.insert(parent, children[0]);
            }
        } else {
            if(Array.isArray(children)) {
                for(var j = 0; j < children.length; j++) {
                    this.insert(parent, children[j]);
                }
            } else {
                if(children instanceof HTMLElement) parent.appendChild(children, parent);
            }
        }
    }
    return parent;
}

notTemplate.prototype.insertBefore = function(parent, children) {
    var i = 0;
    if(parent instanceof HTMLElement) {
        if(children instanceof HTMLCollection) {
            while(children.length && ++i < 10000) {
                this.insertBefore(parent, children[0]);
            }
        } else {
            if(Array.isArray(children)) {
                for(var j = 0; j < children.length; j++) {
                    this.insertBefore(parent, children[j]);
                }
            } else {
                if(children instanceof HTMLElement) parent.parentNode.insertBefore(children, parent);
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
        for(var j = 0; j < this._working.currentEl.children.length; j++) {
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
        if(typeof runner[fieldName] !== 'undefined' || (runner.getAttr && (typeof runner.getAttr(fieldName) !== 'undefined'))) {
            result = ((runner.getAttr && runner.getAttr(fieldName)) || runner[fieldName]);
        } else {
            result = this._notOptions.attributeExpressionDefaultResult;
        }
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
        if(live > -1 && live == input.params.length - 1) {
            var attrPath = notCommon.parsePath(input.attributeExpression, item, helpers);
            if(attrPath.length && item && item.isRecord) {
                item.on('onAttrChange_' + attrPath[0], function() {
                    var value = notCommon.getValueByPath(item, notCommon.parsePath(input.attributeExpression, item, helpers));
                    if(input.params.indexOf('capitalize') > -1) value = value.toUpperCase();
                    if(input.element.innerHTML != value) {
                        input.element.innerHTML = value;
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
            itemValueFieldName = helpers.hasOwnProperty('fieldName') ? helpers['fieldName'] : 'value';
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
        if(typeof item !== 'undefined' && item !== null) {
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
        if(live > -1 && live == input.params.length - 1) {
            var fieldName = null;
            if(input.attributeExpression.indexOf('::') === 0) {
                var helperName = input.attributeExpression.replace('::', '');
                if(helpers.hasOwnProperty(helperName) && helpers[helperName]) {
                    fieldName = helpers[helperName];
                }
            } else {
                if(item.on && input.attributeExpression.indexOf(':') === 0) {
                    var fieldName = input.attributeExpression.replace(':', '');
                }
            }
            if(fieldName && item.isRecord) {
                item.on('onAttrChange_' + fieldName, function() {
                    console.log('on attr change', arguments);
                    var newVal = item.getAttr(fieldName);
                    if(typeof newVal !== 'undefined' && input.element.getAttribute(input.params[0]) != newVal) {
                        input.element.setAttribute(input.params[0], newVal);
                    }
                });
            }
        }
    },
    name: function(input, item, helpers) {
        'use strict';
        if(input.attributeExpression.indexOf(':') > -1) {
            if(input.attributeExpression.indexOf('::') === 0 && helpers.hasOwnProperty('fieldName')) {
                fieldName = notCommon.normilizePath(input.attributeExpression);
                if(fieldName.indexOf('fieldName') > -1) {
                    fieldName[fieldName.indexOf('fieldName')] = helpers.fieldName;
                }
            } else {
                if(item.on && input.attributeExpression.indexOf(':') === 0) {
                    var fieldName = notCommon.normilizePath(input.attributeExpression);
                }else{
                    var fieldName = notCommon.parsePath(input.attributeExpression, item, helpers);
                }
            }
            var fieldNameLine = fieldName.shift();
            while(fieldName.length > 0) {
                fieldNameLine = fieldNameLine + '[' + fieldName.shift() + ']';
            }
            input.element.setAttribute('name', fieldNameLine);
        } else {
            input.element.setAttribute('name', input.attributeResult);
        }
        var live = input.params.indexOf('live');
        if(live > -1 && live == input.params.length - 1) {
            var fieldName = null;
            if(input.attributeExpression.indexOf('::') === 0) {
                var helperName = input.attributeExpression.replace('::', '');
                if(helpers.hasOwnProperty(helperName) && helpers[helperName]) {
                    fieldName = helpers[helperName];
                }
            } else {
                if(item.on && input.attributeExpression.indexOf(':') === 0) {
                    var fieldName = input.attributeExpression.replace(':', '');
                }
            }
            if(fieldName && item.isRecord) {
                item.on('onAttrChange_' + fieldName, function() {
                    console.log('on attr change', arguments);
                    var newVal = item.getAttr(fieldName);
                    if(typeof newVal !== 'undefined' && input.element.getAttribute('name') != newVal) {
                        input.element.setAttribute('name', newVal);
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
        if(input.attributeExpression.indexOf('::') > -1) {
            src = helpers;
        }
        var valuePath = notCommon.normilizePath(input.attributeExpression);
        var value = input.attributeExpression.indexOf('.') > -1 && input.attributeExpression.indexOf('()') == -1 ? notCommon.getValueByPath(src, valuePath) : input.attributeResult;

        input.element.setAttribute('value', value);

        var live = input.params.indexOf('live');
        if(live > -1 && live == input.params.length - 1) {
            var fieldName = null;
            if(input.attributeExpression.indexOf('::') === 0 && helpers.hasOwnProperty('fieldName')) {
                fieldName = notCommon.normilizePath(input.attributeExpression);
                if(fieldName.indexOf('fieldValue') > -1) {
                    fieldName[fieldName.indexOf('fieldValue')] = helpers.fieldName;
                }
            } else {
                if(item.on && input.attributeExpression.indexOf(':') === 0) {
                    var fieldName = notCommon.normilizePath(input.attributeExpression);
                }
            }
            if(fieldName && fieldName.length && item.isRecord) {
                item.on('onAttrChange_' + fieldName[0], function() {
                    console.log('on attr change', arguments);
                    var newVal = item.getAttr(fieldName.join('.'));
                    if(input.element.nodeName == "SELECT" && input.element.multiple) {
                        curElVal = [];
                        for(var g = 0; g < input.element.selectedOptions.length; g++) {
                            curElVal.push(input.element.selectedOptions[g].value);
                        }
                        if(!notCommon.identical(newVal, curElVal)) {
                            for(var g = 0; g < input.element.children.length; g++) {
                                if(input.element.children[g].nodeName === 'OPTION') {
                                    input.element.children[g].selected = newVal.indexOf(input.element.children[g].value) > -1;
                                }
                            }
                        }
                    } else {
                        if(typeof newVal !== 'undefined' && !notCommon.identical(input.element.value, newVal)) {
                            input.element.value = newVal;
                        }
                    }
                });
            }
        }
    },
    checked: function(input, item, helpers) {
        console.log('checked', input);
        input.attributeResult? input.element.setAttribute('checked', true):input.element.removeAttribute('checked');
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
    subtemplate: function(input, item, helpers) {
        var that = this;
        var capitalizeFirstLetter = function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            //console.log(input, item, helpers);
        var tmplName = input.params[0];
        for(var i = 1; i < input.params.length; i++) {
            if(input.params[i] == 'live' && i + 1 == input.params.length) {
                break;
            }
            tmplName += capitalizeFirstLetter(input.params[i]);
        }
        var resultElements = (new notTemplate({
            templateCache: tmplName,
            templateName: tmplName,
            helpers: helpers,
            data: input.attributeResult
        })).execAndReplace(input.element);


        var live = input.params.indexOf('live');
        if(live > -1 && live == input.params.length - 1) {
            var fieldName = helpers.hasOwnProperty('fieldName') ? helpers.fieldName : null;
            if(fieldName && item.isRecord) {
                item.on('onAttrChange_' + fieldName, function() {
                    console.log('on attr change', arguments);

                });
            }
        }
    },
    //data-not-live="title"
    //will watch for changes on liveEvents and change object field or notRecord attribute acordingly
    live: function(input, item, helpers) {
        var that = this,
            liveEvents = ['change', 'keyup'];
        console.log('live', input);
        var attrPath = input.attributeResult;
        if(input.attributeExpression.indexOf(':') === 0) {
            attrPath = input.attributeExpression;
            if(input.attributeExpression.indexOf('::') === 0) {
                attrPath = attrPath.replace('::fieldName', helpers.fieldName);
            } else {
                attrPath = attrPath.replace(':', '');
            }
        }
        for(var i = 0; i < liveEvents.length; i++) {
            input.element.addEventListener(liveEvents[i], function(e) {
                var edit = true;
                if(typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty('validators') && helpers.validators.hasOwnProperty(attrPath)) {
                    edit = helpers.validators[attrPath](input, item, e);
                }
                if(edit && item.isRecord) {
                    if(input.element.type == 'checkbox') {
                        notCommon.setValueByPath(item, attrPath, input.element.checked ? input.element.value : undefined);
                    } else {
                        var curElVal = input.element.value;
                        if(input.element.nodeName === 'SELECT' && input.element.multiple && typeof input.element.selectedOptions !== 'undefined') {
                            curElVal = [];
                            for(var g = 0; g < input.element.selectedOptions.length; g++) {
                                curElVal.push(input.element.selectedOptions[g].value);
                            }
                            if(notCommon.identical(curElVal, notCommon.getValueByPath(item, attrPath))) {
                                edit = false;
                            } else {
                                notCommon.setValueByPath(item, attrPath, curElVal);
                            }

                        } else {
                            if(notCommon.identical(notCommon.getValueByPath(item, attrPath), curElVal)) {
                                edit = false;
                            } else {
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

/*
    Обертка для notTemplate

    На ее основе можно создавать блоки с заданным откликом на действия
    пользователя и связкой шаблон-данные.

*/
var notView = function(options){
    this.options = options;
    return this;
}

notView.prototype.getTemplateOptions = function(){
    var defaultResult = {};
    return (typeof this.options.templateOptions !== 'undefined' && this.options.templateOptions !== null)?this.options.templateOptions:defaultResult;
}

notView.prototype.getPlaceToPut = function(){
    if (typeof this.options.placeToPut !== 'undefined' && this.options.placeToPut !== null){
        return this.options.placeToPut;
    }
    return document.body;
}

notView.prototype.getAfterExecCallback = function(callback){
    var defaultResult = function(){
        //console.log('default view after exec callback');
    };
    if (typeof callback !== 'undefined' && callback !== null){
        return callback;
    }
    if (typeof this.options.afterExec !== 'undefined' && this.options.afterExec !== null){
        return this.options.afterExec;
    }
    return defaultResult;
}

notView.prototype.exec = function(callback){
    (new notTemplate(this.getTemplateOptions())).execAndPut(this.getPlaceToPut(), this.getAfterExecCallback(callback));
};

notView.prototype.setParam = function(name, value){
    this.options[name] = value;
    return this;
}

notView.prototype.setTemplateParam = function(name, value){
    this.options.templateOptions[name] = value;
    return this;
}

notView.prototype.getParam = function(name){
    return this.options.hasOwnProperty(name)?this.options[name]:undefined;
}

notView.prototype.getParams = function(){
    return this.options;
}
