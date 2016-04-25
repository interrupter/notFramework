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
    getValueByPath: function(object, attrPath){
        var attrPath = this.normilizePath(attrPath);
        var attrName = attrPath.shift();
        if (object.hasOwnProperty(attrName)){
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
