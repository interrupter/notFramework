import notController from '../notController.js';
import notCommon from '../common';
import notForm from '../components/notForm.js';

const OPT_DEFAULT_VIEW = 'edit';
const OPT_DEFAULT_ACTION = 'create';

class CRUDCreate extends notController {
    constructor(parent, params) {
        super(parent.app);
        this.parent = parent;
        this.setOptions('params', params);
        notCommon.log('CRUD Create');
        this.setViews({
            default: {
                name: this.parent.getOptions('views.create.name') || OPT_DEFAULT_VIEW,
                common: this.parent.getOptions('views.create.common') || true,
                targetQuery: this.parent.getOptions('views.create.containerSelector') || this.parent.getOptions('containerSelector'),
                helpers: {}
            }
        });
        this.preloadLib(this.parent.getOptions('views.create.preload'))
            .then(this.renderWrapper.bind(this))
            .then(this.renderForm.bind(this))
            .then(this.onAfterRender.bind(this))
            .catch(notCommon.report);
        return this;
    }



    renderWrapper() {
        return this.render('default', {}, {});
    }

    renderForm() {
        return new Promise((resolve, reject) => {
            try {
                this.form = new notForm({
                    data: this.initItem(),
                    options: {
                        action: this.parent.getOptions('views.create.action') || OPT_DEFAULT_ACTION,
                        targetQuery: this.parent.getOptions('views.create.targetQuery') || this.parent.getOptions('targetQuery'),
                        targetEl: document.querySelector(this.parent.getOptions('views.create.targetQuery') || this.parent.getOptions('targetQuery')),
                        prefix: this.parent.getOptions('views.create.prefix') || this.parent.getOptions('prefix'),
                        role: this.parent.getOptions('views.create.role') || this.parent.getOptions('role'),
                        helpers: notCommon.extend({
                            file: (params) => {
                                let files = params.e.target.files || params.e.dataTransfer.files;
                                notCommon.log('file changed', files);
                                if (params.helpers.field.name && files) {
                                    this.queeUpload(params.helpers.field.name, files);
                                }
                            },
                            submit: () => {
                                notCommon.log('submit form ', this.newItem);
                                this.execUploads(this.newItem)
                                    .then(this.create.bind(this));
                            },
                            afterSubmit: () => {
                                this.goToTable();
                            },
                            libs: this.getOptions('libs'),
                        }, this.parent.getOptions('views.create.helpers') || {})
                    },
                    events: [
                        ['afterRender', resolve],
                        [
                            ['afterSubmit', 'afterRestore'], this.backToList.bind(this)
                        ]
                    ]
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    create(item) {
        item['$' + this.parent.getOptions('views.create.action')]()
            .then((result) => {
                notCommon.log('form saved', result);
                this.parent.app.getWorking('router').navigate(this.parent.getModuleName());
            })
            .catch((result) => {
                notCommon.error('form not saved', result);
            });
    }

    backToList() {
        this.parent.app.getWorking('router').navigate(this.parent.getModuleName());
    }

}

export default CRUDCreate;
