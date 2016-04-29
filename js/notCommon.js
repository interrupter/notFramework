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
            var rStep = step.replace('::');
            if(rStep.indexOf('()') === rStep.length-2){
                rStep = step.replace('()');
                if(helper.hasOwnProperty(rStep)){
                    return helper[rStep](item, undefined);
                }
            }else{
                return helper[rStep];
            }
        }else{
            if(step.indexOf(':') === 0 && item){
                var rStep = step.replace(':');
                if(rStep.indexOf('()') === rStep.length-2){
                    rStep = step.replace('()');
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
            path = this.parsePathStep(path[i], item, helper);
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
