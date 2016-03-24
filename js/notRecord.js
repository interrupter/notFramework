
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
        return (actionData.method === 'POST' && (actionData.hasOwnProperty('formData')&& actionData.formData)) ? (record.getModelParam('formData')||formData) : JSON.stringify(requestData);
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
        for(var actionName in this._notOptions.interfaceManifest.actions){
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
        }
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

notRecord.prototype.setAttr = function(attrName, attrValue) {
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
                return this.getAttrByPath(this, path);
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
