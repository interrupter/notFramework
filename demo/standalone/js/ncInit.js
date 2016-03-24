var ncInit = function(app, params) {

    console.log('app is up');

}

var shops = [
    {
        city: 'city 1',
        street: 'street 1',
        house: 'house 1',
    },
    {
        city: 'city 2',
        street: 'street 2',
        house: 'house 2',
    },
    {
        city: 'city 3',
        street: 'street 3',
        house: 'house 3',
    },
    {
        city: 'city 4',
        street: 'street 4',
        house: 'house 4',
    },
    {
        city: 'city 5',
        street: 'street 5',
        house: 'house 5',
    },
    {
        city: 'city 6',
        street: 'street 6',
        house: 'house 6',
    }
];

var ncMain = function(app, params){
    var not =this;

    not.initFirm = function(){
        return app.nr('firm', {
            name: 'firm 1',
            phone: '1234567890',
            address: 'city',
            contacts:   {
                phone: '+87162816283',
                email: 'levo@joasdf.ru'
            },
            director: app.nr('user', {
                username: 'director 1',
                email: 'director@mail.ru',
                address: 'city 2',
                phone: '0987654321'
            }),
            vice: app.nr('user', {
                username: 'vice 1',
                email: 'vice@mail.ru',
                address: 'city 2',
                phone: '0987654321'
            }),
            shops: app.nr('address', shops)
        })
    }
    var firm = not.initFirm();
    var form = app._working.forms.common.buildAndPut({
        actionName: 'new',
        scenario: 'guest',
        formType: 'itemEditForm',
        data: firm,
        helpers: {
            helpersName: 'title'
        },
        actions: {
            addShop: function(){
                console.log('add shop', arguments, this);
                var shops = firm.getAttr('shops');
                shops.push(app.nr('address', {
                    city: document.getElementById('addShopAddressField_City').value,
                    street: document.getElementById('addShopAddressField_Street').value,
                    house: document.getElementById('addShopAddressField_House').value
                }));
                firm.setChanged('shops', shops);
                this.updateFieldContent('shops');
            }
        },
        fields: {
            shops: {
                helpers: {
                    removeShop: function(item, e){
                        console.log('remove shop');
                        var shops = firm.getAttr('shops'),
                            index = shops.indexOf(item);
                        if ( index !== -1){
                            shops.splice(index, 1);
                            firm.setChanged('shops', shops);
                            form.updateFieldContent('shops');
                        }
                    }
                }
            }
        },
    }, 'formPlace');


}
