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
};
