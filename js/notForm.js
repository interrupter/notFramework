var notForm = function (app, options) {
    this.app = app;
    this._params = {
        runActionOnSubmit: true,
        removeOnRestore: true,
        afterSubmit: function(data){},
        afterRestore: function(data){},
    };

    this.options = options;
    this._working = {
        template: '',
        prefix: 'notForm_',
        formElements:{},
        defaulField: {
            type:'text',
            placeholder: 'text placeholder'
        }
    };

    return this;
};

notForm.prototype.setOption = function(key, value){
    this.options[key] = value;
    return this;
};

notForm.prototype.getOption = function (key){return this.options[key];};

notForm.prototype.init = function (onReady) {
    this._working.onReady = onReady;
    this.loadTemplate(onReady);
}

notForm.prototype.loadTemplate = function () {
    $.ajax(this.options.templateUrl, {
        success: this._setTemplate.bind(this)
    });
};

notForm.prototype._setTemplate = function (template) {
    this._working.template = template;
    this.parseTemplate();
    this._working.onReady();
};

notForm.prototype.parseTemplate = function(){
    var $template = $(this._working.template);
}

notForm.prototype._getFormElementTemplate = function (fieldType, full) {
    var $templates = $(this._working.template),
        i = 0,
        elementTemplateSelector = this._working.prefix+fieldType;
    for(i = 0; i < $templates.length; i++){
        var $template = $($templates[i]);
        if ($template.attr('data-notTemplate-name') == elementTemplateSelector){
            return full?$templates[i].outerHTML:$templates[i].innerHTML;
        }
    }
    return '';
};

notForm.prototype._getFieldValue = function(object, fieldName){
    var value = null;
    if (object && object.hasOwnProperty(fieldName)){
        if (typeof object[fieldName] === 'object' && object[fieldName].hasOwnProperty('_id')){
            value = object[fieldName]._id;
        }else{
            value =object[fieldName];
        }
    }
    return value;
}

notForm.prototype.buildFormElement = function (fieldName) {
    var params = this._getParams();
    var field = this._getFormField(fieldName);
    var helpers = {
        fieldValue: (params && typeof params.data !=='undefined' && params.data!== null)?this._getFieldValue(params.data, fieldName):null,
        fieldName: fieldName,
        fieldLabel: field.hasOwnProperty('label')?field.label:'',
        fieldId: fieldName+'Input',
        fieldPlaceHolder: field.hasOwnProperty('placeholder')?field.placeholder:'',
        option:field.hasOwnProperty('option')?field.option: {value: '_id', label: 'title'},
        optionsLib: (params.hasOwnProperty(fieldName+'Lib'))?params[fieldName+'Lib']:[]
    };

    var data = {
        value:  helpers.fieldValue
    };
    return (new notTemplate({
            template: this._getFormElementTemplate(field.type, true),
            helpers: helpers,
            data: data
        })).exec();
};

notForm.prototype.buildFormElements = function (fields) {
    var elements = [],
        i = 0;
    for (i = 0; i < fields.length; i++) {

        this._working.formElements[fields[i]] = this.buildFormElement(fields[i]);
        this._working.formElements[fields[i]].addClass(fields[i]+'_InputGroup');
        elements.push(
            this._working.formElements[fields[i]]
        );
    }
    return elements;
};

notForm.prototype.buildFormWrapper = function(formName){
    var params = this._getParams();
    return $((new notTemplate({
            template: this._getFormElementTemplate(formName,true),
            data: this._getParams(),
            helpers: {
                formTitle: this._getFormTitle(),
                formId: 'Form_'+params.modelName+'_'+params.actionName,
                formName: 'Form_'+params.modelName+'_'+params.actionName,
                formContainerId: 'FormContainer_'+params.modelName+'_'+params.actionName,
            }
        })).exec());
};

notForm.prototype.buildForm = function () {
    var form = '',
        i = 0,
        scenario = this._getScenario();
    if (typeof scenario !== 'undefined' && scenario !== null) {
        var elements = this.buildFormElements(scenario.fields);
        form = this.buildFormWrapper(this._getParams().formType);
        console.log(form.find('form'));
        for(i=0; i< elements.length;i++){
            form.find('form').append(elements[i]);
        }
    }
    this._working.resultForm = form;
    return this._working.resultForm;
};

notForm.prototype._getScenario = function () {
    var action = this._getAction(),
        params = this._getParams();
    if (action.hasOwnProperty('form')) {
        if (params.hasOwnProperty('scenario') && action.form.hasOwnProperty('scenario')) {
            if (action.form.scenario.hasOwnProperty(params.scenario)){
                return action.form.scenario[params.scenario];
            }else{
                return action.form[params.scenario];
            }
        } else {
            return action.form;
        }
    } else {
        return null;
    }
};

notForm.prototype._getParams = function () {
    return this._working.params;
};

notForm.prototype._getAction = function () {
    var model = this._getModel();
    return model.actions[this._getActionName()];
};

notForm.prototype._getActionName = function () {
    return this._getParams().actionName;
};

notForm.prototype._getFormTitle = function () {
    var action = this._getAction();
    if (action.hasOwnProperty('form')){
        if (action.form.hasOwnProperty('title')){
            return action.form.title;
        }
    }
    return 'Form title';
};

notForm.prototype._collectFieldsDataToRecord = function(){
    var params = this._getParams(),
        record = params.data,
        scenario = this._getScenario(),
        fieldsTypes = this._getFormFieldsTypes(),
        $form = $(this._working.resultForm.find('form')),
        i = 0,
        field = null,
        fieldName = null,
        fieldValue = null;

    for(i = 0; i < scenario.fields.length; i++){
        fieldName = scenario.fields[i];
        field = this._getFormField(fieldName);
        switch(field.type){
            case 'text':
                fieldValue = $form.find('[name="'+fieldName+'"]').val();
                break;
            case 'select':
                fieldValue = $form.find('[name="'+fieldName+'"]').val();
                break;
            case 'textarea':
                fieldValue = $form.find('[name="'+fieldName+'"]').val();
                break;
            case 'checkbox':
                fieldValue = $form.find('[name="'+fieldName+'"]').prop('checked');
                break;
            case 'submit': continue;
        }
        record.setAttr(fieldName, fieldValue);
    }

    record['$'+params.actionName](this._onSubmitSuccess.bind(this), this._validationErrorsHandling.bind(this));
};

notForm.prototype._onSubmitSuccess = function(data){
    var params = this._getParams();
    this._validationErrorsHandling();
    this._removeForm();
    (params.hasOwnProperty('afterSubmit') ? params.afterSubmit(data):null);
};

notForm.prototype._setValidationErrorForField = function(fieldName, message){
    this._working.formElements[fieldName].addClass('has-error');
    this._working.formElements[fieldName].find('.help-block').text(message).fadeIn();
};


notForm.prototype._setValidationSuccessForField = function(fieldName){
    this._working.formElements[fieldName].addClass('has-success');
};

notForm.prototype._validationErrorsHandling = function(validationReport){
    var i;
    for(i in this._working.formElements){
        if (typeof validationReport!=='undefined' && validationReport !== null && validationReport.hasOwnProperty(i)){
            this._setValidationErrorForField(i, validationReport[i]);
        }else{
            this._resetValidationErrorForField(i);
            this._setValidationSuccessForField(i);
        }
    }
};

notForm.prototype._resetValidationErrorForField = function(fieldName){
    this._working.formElements[fieldName].removeClass('has-error');
    this._working.formElements[fieldName].find('.help-block').fadeOut();
};



notForm.prototype.attachOnSubmitAction = function(){
    this._working.resultForm.find('form').on('submit', this._submitForm.bind(this));
};

notForm.prototype._submitForm = function(e){
    e.stopPropagation();
    this._collectFieldsDataToRecord();
    return false;
};

notForm.prototype.attachRemoveOnRestore = function(){
    this._working.resultForm.find('button[type="restore"]').on('click', this._removeForm.bind(this));
};

notForm.prototype._removeForm = function(e){
    if (typeof e !== 'undefined' && e!== null) e.preventDefault();
    this._working.resultForm.remove();
    if (typeof e !== 'undefined' && e!== null){
        (this._getParams().hasOwnProperty('afterRestore') ? this._getParams().afterRestore(e):null);
    }
    return false;
};

notForm.prototype._getModelName = function () {
    if (typeof this._getParams().modelName !== 'undefined' && this._getParams().modelName !== null){
        return this._getParams().modelName;
    }else{
        if (this._getParams().hasOwnProperty('data')){
            var data = this._getParams().data;
            if(typeof data.modelName !== 'undefined' && data.modelName !== null){
                return data.modelName;
            }
            if (typeof data.getModelName !== 'undefined' && data.getModelName !== null){
                return data.getModelName();
            }
        }
    }
    return null;
};

notForm.prototype._getModel = function () {
    return this.app._getInterfaceManifest()[this._getModelName()];
};

notForm.prototype._getFormFieldsTypes = function () {
    var model = this._getModel();
    return model.formFieldsTypes;
};

notForm.prototype._getFormField = function(field){
    var types = this._getFormFieldsTypes();
    if (typeof types !== 'undefined' && types!==null && types.hasOwnProperty(field)){
        return types[field];
    }
    return this._getDefaultField();
};

notForm.prototype._getDefaultField = function(){
    return this._working.defaulField;
};

notForm.prototype._clearWorking = function(){
    this._working.resultForm = null;
    this._working.formElements = {};
};

notForm.prototype.build = function (formParams) {
    this._clearWorking();
    this._working.params = $.extend(this._params, formParams);
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
