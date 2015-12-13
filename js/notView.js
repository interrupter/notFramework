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
