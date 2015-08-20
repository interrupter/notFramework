var notController = function(app, controllerName){
    this.app = app;
    this.ncName = 'nc'+(controllerName.capitalizeFirstLetter());
    this.containerSelector = '.page-content';
    this.viewsPostfix = '.html';
    this.renderFromURL = true;
    var that = this;
    $.each(this.app._getInterfaces(),  function(index, interface){
        if (typeof((window[that.ncName]))!=='undefined') (window[that.ncName]).prototype[index] = interface;
    });
}

notController.prototype.render = function (name, data, callback) {
    var view = this.views.hasOwnProperty(name) ? this.views[name] : null;
    if (typeof view === 'undefined' || view === null) return;
    view.data = data;
    if (this.renderFromURL) {
        view.templateURL = this.viewsPrefix + name + this.viewsPostfix;
    } else {
        if (view.hasOwnProperty('templateName')) {
            view.templateName = this.viewsPrefix + view.templateName + this.viewsPostfix;
        }
    }
    (new notTemplate(view)).execAndPut($(view.place), callback);
}

notController.prototype.exec = function(params){
    (typeof((window[this.ncName]))!=='undefined')?(new (window[this.ncName])(this.app, params)):'';
}
