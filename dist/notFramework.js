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
    //иницилицировать и запустить контроллер инициализации
    this._initController();
    //создание объектов автогенерация форм
    this._initFormBuilders();
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
    console.log(index, manifest);
    this._working.interfaces[this._getRecordName(index)] = new notRecord(manifest);
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
    console.log('init form builder', index,  manifest);
    this._working.forms[index] = new notForm(this, manifest);
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
    console.log('exec', this, Object.keys(this.__proto__));

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
        //new(window[this.ncName])(this.app, params);
        console.log(new(window[this.ncName])(this.app, params));
        console.log('after new controller');
    } else {

    }
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
    return containerElement.children;
}

notForm.prototype._getFormElementTemplate = function(fieldType, full) {
    var templatesContainer = document.createElement('DIV');
    templatesContainer.innerHTML = this._working.template;
    var thisTemplates = templatesContainer.children,
        i = 0,
        elementTemplateSelector = this._working.prefix + fieldType;
    for(i = 0; i < thisTemplates.length; i++) {
        var thisTemplate = thisTemplates[i];
        if(thisTemplate.nodeName !== '#text' && thisTemplate.dataset.notTemplateName == elementTemplateSelector) {
            return full ? thisTemplate.outerHTML : thisTemplate.innerHTML;
        }
    }
    return '';
};

notForm.prototype._getFieldValue = function(object, fieldName) {
    var value = '',
        fieldPath = fieldName.split('.');
    if (fieldPath.length > 1){
        var nextSubObject = fieldPath.shift();
        if (object && object.hasOwnProperty(nextSubObject)){
            return this._getFieldValue(object[nextSubObject], fieldPath.join('.'));
        }
    }else{
        if(object && object.hasOwnProperty(fieldName)) {
            if(typeof object[fieldName] === 'object' && object[fieldName].hasOwnProperty('_id')) {
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
        fieldName: fieldName,
        fieldLabel: field.hasOwnProperty('label') ? field.label : '',
        fieldId: fieldName + 'Input',
        fieldPlaceHolder: field.hasOwnProperty('placeholder') ? field.placeholder : '',
        option: field.hasOwnProperty('option') ? field.option : {
            value: '_id',
            label: 'title'
        },
        optionsLib: (params.hasOwnProperty(fieldName + 'Lib')) ? params[fieldName + 'Lib'] : []
    };

    var data = {
        value: helpers.fieldValue
    };
    return (new notTemplate({
        template: this._getFormElementTemplate(field.type, true),
        helpers: helpers,
        data: data
    })).exec();
};

notForm.prototype.buildFormSplitElement = function(fieldName) {
    var params = this._getParams();
    var field = this._getFormField('split');
    var helpers = {
        fieldValue: (params && typeof params.data !== 'undefined' && params.data !== null) ? this._getFieldValue(params.data, fieldName) : '',
        fieldName: fieldName,
        fieldLabel: field.hasOwnProperty('label') ? field.label : '',
        fieldId: fieldName + 'Input',
        fieldPlaceHolder: field.hasOwnProperty('placeholder') ? field.placeholder : '',
        option: field.hasOwnProperty('option') ? field.option : {
            value: '_id',
            label: 'title'
        },
        optionsLib: (params.hasOwnProperty(fieldName + 'Lib')) ? params[fieldName + 'Lib'] : []
    };

    var data = {
        value: helpers.fieldValue
    };
    return (new notTemplate({
        template: this._getFormElementTemplate(field.type, true),
        helpers: helpers,
        data: data
    })).exec();
};

notForm.prototype.buildFormBlockElement = function(block) {
    var elements = [],
        i = 0,
        fields = block.fields;
    for(i = 0; i < fields.length; i++) {
        elements[fields[i]] = this.buildFormElement(fields[i])[0];
        console.log(elements[fields[i]] instanceof HTMLElement ? 'Element' : 'not Element');
        if (elements[fields[i]].hasOwnProperty('classList')){
            elements[fields[i]].classList.add(block.name + '_' + fields[i] + '_InputGroup');
        }
    }
    return this.wrapFormBlockElements(block, elements);
};

notForm.prototype.buildFormElements = function(fields) {
    var elements = [],
        i = 0,
        block = 0;
    for(i = 0; i < fields.length; i++) {
        if (fields[i].hasOwnProperty('fields')){
            var blockName = fields[i].hasOwnProperty('name')?fields[i].name:('block'+(++block));
            fields[i].name = blockName;
            this._working.formElements[blockName] = this.buildFormBlockElement(fields[i])[0];
        }else{
            if (fields[i].indexOf('=')===0){
                this._working.formElements[fields[i]] = this.buildFormSplitElement(fields[i])[0];
            }else{
                this._working.formElements[fields[i]] = this.buildFormElement(fields[i])[0];
            }
        }
        console.log(this._working.formElements[fields[i]] instanceof HTMLElement ? 'Element' : 'not Element');
        if (this._working.formElements[fields[i]].hasOwnProperty('classList')){
            this._working.formElements[fields[i]].classList.add(fields[i] + '_InputGroup');
        }
        elements.push(
            this._working.formElements[fields[i]]
        );
    }
    return elements;
};

notForm.prototype.wrapFormBlockElements = function(block, elements){
    var params = this._getParams();
    return (new notTemplate({
        template: this._getFormElementTemplate(formName+'Block', true),
        data: this._getParams(),
        helpers: {
            formTitle: block.title,
            formId: 'Form_' + params.modelName  + '_' + block.name + '_' + params.actionName,
            formName: 'Form_' + params.modelName  + '_' + block.name + '_' + params.actionName,
            formContainerId: 'FormContainer_' + params.modelName + '_' + block.name + '_' + params.actionName,
        }
    })).exec();
}

notForm.prototype.buildFormWrapper = function(formName) {
    var params = this._getParams();
    return (new notTemplate({
        template: this._getFormElementTemplate(formName, true),
        data: this._getParams(),
        helpers: {
            formTitle: this._getFormTitle(),
            formId: 'Form_' + params.modelName + '_' + params.actionName,
            formName: 'Form_' + params.modelName + '_' + params.actionName,
            formContainerId: 'FormContainer_' + params.modelName + '_' + params.actionName,
        }
    })).exec();
};

notForm.prototype.buildForm = function() {
    var form = '',
        i = 0,
        scenario = this._getScenario();
    if(typeof scenario !== 'undefined' && scenario !== null) {
        var elements = this.buildFormElements(scenario.fields);
        form = this.buildFormWrapper(this._getParams().formType);
        form = (form instanceof HTMLCollection)?form[0]:form;
        var formElement = form.querySelectorAll(':scope form')[0];
        console.log(form.querySelectorAll(':scope form'));
        for(i = 0; i < elements.length; i++) {
            if (elements[i] instanceof HTMLCollection){
                for(var j = 0; j < elements[i].length; j++){
                    formElement.appendChild(elements[i][j]);
                }
            }else{
                var el = elements[i];
                if (el.dataset.hasOwnProperty("target")){
                    var targetEl = formElement.querySelector(':scope [data-role="'+el.dataset.target+'"]');
                    if (targetEl){
                        targetEl.appendChild(elements[i]);
                    }else{
                        formElement.appendChild(elements[i]);
                    }
                }else{
                    formElement.appendChild(elements[i]);
                }
            }
        }
    }
    this._working.resultForm = form;
    return this._working.resultForm;
};

notForm.prototype._getScenario = function() {
    var action = this._getAction(),
        params = this._getParams();
    if(action.hasOwnProperty('form')) {
        if(params.hasOwnProperty('scenario') && action.form.hasOwnProperty('scenario')) {
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
    return this._getParams().actionName;
};

notForm.prototype._getFormTitle = function() {
    var action = this._getAction();
    if(action.hasOwnProperty('form')) {
        if(action.form.hasOwnProperty('title')) {
            return action.form.title;
        }
    }
    return 'Form title';
};

notForm.prototype._collectFieldsDataToRecord = function() {
    console.log(this._working.resultForm);

    var params = this._getParams(),
        record = params.data,
        scenario = this._getScenario(),
        fieldsTypes = this._getFormFieldsTypes(),
        form = this._working.resultForm.querySelectorAll(':scope form')[0],
        i = 0,
        field = null,
        fieldName = null,
        fieldValue = null,
        formData = new FormData(form);
    for(i = 0; i < scenario.fields.length; i++) {
        fieldName = scenario.fields[i];
        field = this._getFormField(fieldName);
        switch(field.type) {
            case 'text':
            case 'select':
            case 'textarea':
            case 'checkbox':
                var inpEl = form.querySelectorAll(':scope [name="' + fieldName + '"]')[0];
                if (inpEl && inpEl.hasOwnProperty('value')){
                    fieldValue = inpEl.value;
                }
                break;
            case 'submit':
            case 'file':
                continue;
            default:
                var inpEl = form.querySelectorAll(':scope [name="' + fieldName + '"]')[0];
                if (inpEl && inpEl.hasOwnProperty('value')){
                    fieldValue = inpEl.value;
                }
        }
        record.setAttr(fieldName, fieldValue);
    }
    record.setParam('formData', formData);
    record['$' + params.actionName](this._onSubmitSuccess.bind(this), this._validationErrorsHandling.bind(this));
};

notForm.prototype._onSubmitSuccess = function(data) {
    var params = this._getParams();
    this._validationErrorsHandling();
    this._removeForm();
    (params.hasOwnProperty('afterSubmit') ? params.afterSubmit(data) : null);
};

notForm.prototype._setValidationErrorForField = function(fieldName, message) {
    this._working.formElements[fieldName].classList.add('has-error');
    var errorText = this._working.formElements[fieldName].querySelectorAll(':scope .help-block')[0];
    if(errorText){
        errorText.textContent = message;
        //errorText.style.opacity = 1;
        errorText.style.WebkitTransition = 'opacity 1s';
        errorText.style.MozTransition = 'opacity 1s';
    }
};


notForm.prototype._setValidationSuccessForField = function(fieldName) {
    this._working.formElements[fieldName].classList.add('has-success');
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
    this._working.formElements[fieldName].classList.remove('has-error');
    var errorText = this._working.formElements[fieldName].querySelectorAll(':scope .help-block')[0];
    if(errorText){
        errorText.style.WebkitTransition = 'opacity 1s';
        errorText.style.MozTransition = 'opacity 1s';
    }

    //errorText.style.opacity = 0;
};



notForm.prototype.attachOnSubmitAction = function() {
    var el = this._working.resultForm.querySelectorAll(':scope form');
    if(el && el.length > 0){
        el[0].addEventListener('submit', this._submitForm.bind(this));
    }
};

notForm.prototype._submitForm = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this._collectFieldsDataToRecord();
    return false;
};

notForm.prototype.attachRemoveOnRestore = function() {
    var el = this._working.resultForm.querySelectorAll(':scope button[type="restore"]');
    if (el && el.length > 0){
        el[0].addEventListener('click', this._removeForm.bind(this));
    }
};

notForm.prototype._removeForm = function(e) {
    if(typeof e !== 'undefined' && e !== null) e.preventDefault();
    this._working.resultForm.remove();
    if(typeof e !== 'undefined' && e !== null) {
        (this._getParams().hasOwnProperty('afterRestore') ? this._getParams().afterRestore(e) : null);
    }
    return false;
};

notForm.prototype._getModelName = function() {
    if(typeof this._getParams().modelName !== 'undefined' && this._getParams().modelName !== null) {
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
    return model.formFieldsTypes;
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
    console.log('build form ', this._getModelName(), this._getActionName(), this._getFormFieldsTypes(), this._getParams());
    this.buildForm();
    this.attachOnSubmitAction();
    this.attachRemoveOnRestore();
    return this._working.resultForm;
};

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
        console.log('recieved', data);
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
        console.log('CacheSize:', this.cacheSize);
        console.log('rebuilded complects:', this.complects);
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
        console.log('pager params:', jQuery.param(params));
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
        console.log('rebuildElements of complects');
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
        if(Object.keys(requestData).length > 0) {
            for(var i in requestData) {
                formData.append(i, requestData[i]);
            }
        }
        return(actionData.method === 'POST') ? record.getParam('formData') : requestData;
    },

    request: function(record, actionName, callbackSuccess, callbackError) {
        'use strict';
        console.log('request', actionName);
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
                if((typeof record._notOptions.interfaceManifest.showMessages !== 'undefined') && record._notOptions.interfaceManifest.showMessages) {
                    var msg = ((actionData.hasOwnProperty('messages') && actionData.messages.hasOwnProperty(code)) ? actionData.messages[code] : data.error);
                    if((typeof msg !== 'undefined') && (msg != '')) {
                        $('.top-left').notify({
                            type: code == 'success' ? code : 'danger',
                            message: {
                                text: msg
                            }
                        }).show();
                    }
                }
            }
        };

        if(formData instanceof FormData) {
            var finalParams = jQuery.extend(basicParams, additionalParams);
        } else {
            var finalParams = basicParams;
        }
        console.log('finalParams', finalParams);
        $.ajax(this.getURL(record, actionData, actionName), finalParams);
    }
};

/*
 *
 */

//создаем объект с заданым манифестом интерфейса, если есть данные, то добавляем в него
var notRecord = function(interfaceManifest, item) {
    'use strict';
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
    $.each(this._notOptions.interfaceManifest.actions, function(index, actionManifest) {
        if(!(this.hasOwnProperty('$' + index))) {
            that['$' + index] = function(callbackSuccess, callbackError) {
                console.log('$' + index);
                (notRecord_Interface.request.bind(notRecord_Interface, this, index + '', callbackSuccess, callbackError)).call();
            }
        } else {
            console.error('interface manifest for ', interfaceManifest.model, ' conflict with notRecord property "', '$' + index, '" that alredy exists');
        }
    });
    return this;
};

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

notRecord.prototype.setParam = function(paramName, paramValue) {
    'use strict';
    this._notOptions[paramName] = paramValue;
    return this;
}

notRecord.prototype.getParam = function(paramName) {
    'use strict';
    return this._notOptions[paramName];
}

notRecord.prototype.getModelName = function() {
    'use strict';
    return this._notOptions.interfaceManifest.model;
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
        for(var i = 0; i < this.getParam('fields').length; i++) {
            var fieldName = this.getParam('fields')[i];
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
        fields = this.getParam('fields');
    for(i in fields) {
        fieldName = fields[i];
        fieldType = typeof this[fieldName];
        if(fieldType === 'object') {
            this._addMetaAttr(fieldName, this[fieldName]);
        }
    }
};

notRecord.prototype._addMetaAttr = function(name, value) {
    var i;
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

notRecord.prototype.setAttr = function(attrName, attrValue) {
    'use strict';
    var fields = this.getParam('fields');
    if(fields.indexOf(attrName) == -1) {
        fields.push(attrName);
        this.setParam('fields', fields);
    }
    this[attrName] = attrValue;
    if(typeof attrValue === 'Object') {
        notRecord.prototype._addMetaAttr(attrName, attrValue);
    }
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
    var path = attrName.split('.');
    switch (path.length > 1){
        case 0:
                return undefined;
            break;
        case 1:
            if(this.getParam('fields').indexOf(attrName) > -1) {
                return this[attrName];
            } else {
                return undefined;
            }
            break;
        default:
                return this.getAttrByPath(this, path);
    }
}

notRecord.prototype.setFilter = function(filterData) {
    'use strict';
    this.setParam('filter', filterData);
    return this;
};

notRecord.prototype.getFilter = function() {
    'use strict';
    return this.getParam('filter');
};

notRecord.prototype.setSorter = function(sorterData) {
    'use strict';
    this.setParam('sorter', sorterData);
    return this;
};

notRecord.prototype.getSorter = function() {
    'use strict';
    return this.getParam('sorter');
};

notRecord.prototype.setPageNumber = function(pageNumber) {
    'use strict';
    this.setParam('pageNumber', pageNumber);
    return this;
};

notRecord.prototype.setPageSize = function(pageSize) {
    'use strict';
    this.setParam('pageSize', pageSize);
    return this;
};

notRecord.prototype.setPager = function(pageSize, pageNumber) {
    'use strict';
    this.setParam('pageSize', pageSize).setParam('pageNumber', pageNumber);
    return this;
};

notRecord.prototype.getPager = function() {
    'use strict';
    return {
        pageSize: this.getParam('pageSize'),
        pageNumber: this.getParam('pageNumber')
    };
};

notRecord.prototype.getRecord = function() {
    'use strict';
    var result = {},
        i = 0,
        fieldName,
        fields = this.getParam('fields');
    for(i = 0; i < fields.length; i++) {
        fieldName = fields[i];
        result[fieldName] = this.getAttr(fieldName);
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

notTable.prototype.renderRow = function(item, index) {
    var newRow = document.createElement('TR');
    var extractAttrValue = function(rItem, fieldName){
        if(rItem.getAttr){
            return rItem.getAttr(fieldName);
        }else{
            return rItem[fieldName];
        }
    }
    for(var i = 0; i < this.options.headerTitles.length; i++) {
        var newTd = document.createElement('TD');
        if (this.options.headerTitles[i].hasOwnProperty('editable')){
            newTd.setAttribute('contentEditable', true);
            var options = extend({}, this.options.headerTitles[i]);
            newTd.dataset.field = this.options.headerTitles[i].field;
            newTd.dataset.itemId = item[this.options.itemIdField];
            newTd.dataset.value = item[newTd.dataset.field];
        }
        newTd.innerHTML = (this.options.headerTitles[i].hasOwnProperty('proccessor')) ? this.options.headerTitles[i].proccessor(item[this.options.headerTitles[i].field], item, index): extractAttrValue(item, this.options.headerTitles[i].field);

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
    if(typeof thatSorter !== 'undefined' && thatSorter !== null){
        this._working.filteredData.sort(function(item1, item2){
            if (isNaN(item1[thatSorter.fieldName])){
                return item1[thatSorter.fieldName].localeCompare(item2[thatSorter.fieldName])*-thatSorter.direction;
            }else{
                return (item1[thatSorter.fieldName] < item2[thatSorter.fieldName]?1:-1)*thatSorter.direction;
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



/*
 * Использует DOM поддерево в качестве шаблона.
 * Заполняет его данными.
 * Возвращает сгенерированные элементы
 *
 * */

var notTemplate = function(input) {
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
        templateElement: ((input.hasOwnProperty('templateElement'))?(input.templateElement):(input.hasOwnProperty('templateName') ? $('[data-not-template-name="' + input.templateName + '"]').cloneNode(true) : null)),
        templateURL: input.hasOwnProperty('templateURL') ? input.templateURL : null,
        helpers: input.helpers,
    };

    console.log('data', input.data);

    this._working = {
        proccessors: [],
        templateHTML: input.hasOwnProperty('template') ? input.template : '',
        templateLoaded: input.hasOwnProperty('templateName') || input.hasOwnProperty('template') || input.hasOwnProperty('templateElement'),
        result: null,
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
        this._working.result = this._working.currentEl.children;
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
        var oRequest = new XMLHttpRequest();
        oRequest.open("GET", that._notOptions.templateURL);
        oRequest.addEventListener("load", function(response) {
            var div = document.createElement('DIV');
            div.dataset.notTemplateName = that._notOptions.templateURL;
            div.innerHTML = response.srcElement.responseText;
            that._working.templateLoaded = true;
            that._notOptions.templateElement = div;
            that._exec();
            if(typeof afterExecCallback !== 'undefined') afterExecCallback(that._working.result);
        });
        oRequest.send();
    }
}

notTemplate.prototype.execAndPut = function(place, afterExecCallback) {
    this.exec(function(result) {
        if(place instanceof HTMLElement) {
            place.innerHTML = '';
            if(result instanceof HTMLCollection || result instanceof Array) {
                for(var i = 0; i < result.length; i++) {
                    if (result[i] instanceof HTMLElement) place.appendChild(result[i]);
                }
            } else {
                if (result instanceof HTMLElement) place.appendChild(result);
            }
        }
        if(typeof afterExecCallback !== 'undefined') afterExecCallback(result);
    });
}

notTemplate.prototype.execAndAdd = function(place, afterExecCallback) {
    this.exec(function(el) {
        if(place instanceof HTMLElement) {
            if(el instanceof HTMLCollection || el instanceof Array) {
                for(var i = 0; i < el.length; i++) {
                    if (el[i] instanceof HTMLElement) place.appendChild(el[i]);
                }
            } else {
                if (el instanceof HTMLElement) place.appendChild(el);
            }
        }
        if(typeof afterExecCallback !== 'undefined') afterExecCallback(el);
    });
}

notTemplate.prototype._proccessItems = function() {
    //console.log('proccessItems');
    var i;
    this._working.result = [];
    for(i = 0; i < this._notOptions.data.length; i++) {
        this._working.currentIndex = i;
        this._working.currentItem = this._notOptions.data[i];
        this._proccessItem();
        this._working.result.push(this._working.currentEl.children);
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
        result = (runner.hasOwnProperty(fieldName) ? runner[fieldName](item, index) : this._notOptions.attributeExpressionDefaultResult);
    } else {
        console.log(runner[fieldName]);
        result = ((typeof runner[fieldName] !== 'undefined') ? runner[fieldName] : this._notOptions.attributeExpressionDefaultResult);
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
    provider: function(input) {
        'use strict';
        if(input.params.indexOf('capitalize') > -1) input.attributeResult = input.attributeResult.toUpperCase();
        input.element.innerHTML = input.attributeResult;
    },
    options: function(input, item, helpers) {
        'use strict';
        var i = 0,
            option = null,
            valueFieldName = 'value',
            labelFieldName = 'name',
            itemValueFieldName = 'value';
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
                if(Object.prototype.toString.call(item[itemValueFieldName]) === '[object Array]') {
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
    attr: function(input) {
        'use strict';
        input.element.setAttribute(input.params[0], input.attributeResult);
    },
    addclass: function(input) {
        if(input.attributeResult) {
            input.element.classList.add(input.params[0]);
        }
    },
    value: function(input) {
        console.log('value', input);
        input.element.setAttribute('value', input.attributeResult);
    },
    checked: function(input) {
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
    var defaultResult = function(){console.log('default view after exec callback');};
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
