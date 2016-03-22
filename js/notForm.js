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
    console.log(typeof field);
    console.log(field.hasOwnProperty('form'));
    console.log(field.hasOwnProperty('fields'));
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
        data:       this.app.nr(block.modelName, fieldValue)
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
                formId: 'Form_' + params.data.getModelName() + '_' + params.actionName,
                formName: 'Form_' + params.data.getModelName() + '_' + params.actionName,
                formContainerId: 'FormContainer_' + params.data.getModelName() + '_' + params.actionName,
            }
        })).exec();
};

notForm.prototype.buildBlock = function() {
    var block = '',
        i = 0,
        scenario = this._getScenario();
    if(typeof scenario !== 'undefined' && scenario !== null) {
        this.buildContents(scenario.fields);
        block = this.buildBlockWrapper(this._getParams().blockType);
        var blockElement = this.queryResult(block, ':scope [data-role="block"]');
        console.log(blockElement);
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
    var fields = scenario = this._getScenario().fields;
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

notForm.prototype._collectFieldsDataToRecord = function() {
    console.log(this._working.resultForm);

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
        field = this._getFormField(fieldName);
        if(field.hasOwnProperty('ignore') && field.ignore) continue;
        fieldValue = undefined;
        switch(field.type) {
            case 'text':
            case 'select':
            case 'textarea':
            case 'time':
            case 'date':
            case 'checkbox':
                var inpEl = this.queryResult(form, ':scope [name="' + fieldName + '"]');

                if(inpEl && inpEl.type !== 'submit') {
                    console.log(inpEl, inpEl.value);
                    fieldValue = inpEl.value;
                }
                break;
            case 'multi':
                var inpEls = this.queryResult(form, ':scope [name="' + fieldName + '"] option:checked');
                if(inpEls) {
                    fieldValue = [];
                    for(var j = 0; j < inpEls.length; j++) {
                        console.log(inpEls[j], inpEls[j].value);
                        fieldValue.push(inpEls[j].value);
                    }
                }
                break;
            case 'submit':
            case 'file':
                continue;
            default:
                var inpEl = this.queryResult(form, ':scope [name="' + fieldName + '"]');
                if(inpEl && inpEl.type !== 'submit') {
                    console.log(inpEl, inpEl.value);
                    fieldValue = inpEl.value;
                }
        }
        if(typeof fieldValue !== 'undefined') {
            record.setAttr(fieldName, fieldValue);
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
    this._working.resultForm.remove();
    if(typeof e !== 'undefined' && e !== null) {
        (this._getParams()
            .hasOwnProperty('afterRestore') ? this._getParams()
            .afterRestore(e) : null);
    }
    return false;
};

notForm.prototype._getModelName = function() {
    if(typeof this._getParams()
        .modelName !== 'undefined' && this._getParams()
        .modelName !== null) {
        return this._getParams()
            .modelName;
    } else {
        if(this._getParams()
            .hasOwnProperty('data')) {
            var data = this._getParams()
                .data;
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
