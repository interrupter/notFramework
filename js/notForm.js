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
    var result = (new notTemplate({
        template: this._getFormElementTemplate(field.type, true),
        helpers: helpers,
        data: data
    })).exec();
    if (this._working.params.hasOwnProperty('fieldsProccessors') && this._working.params.fieldsProccessors.hasOwnProperty(fieldName)){
        result = this._working.params.fieldsProccessors[fieldName](result, params.data, fieldValue);
    }
    return result;
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
