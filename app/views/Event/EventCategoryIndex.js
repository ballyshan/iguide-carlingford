App.views.EventCategoryIndex = Ext.extend(Ext.List, {
    store: 'EventCategories',
    layout: 'fit',
    itemTpl: '{eventcattitle}',
    onItemDisclosure: true,

    initComponent: function () {
    	App.views.EventCategoryIndex.superclass.initComponent.apply(this, arguments);

    	this.on('render', function () {
            this.getStore().load();
        }, this);

        this.on('itemTap', function ( list, index, item, e ){
            var rec = list.getStore().getAt(index);
            if(rec){
                App.mask();
                App.dispatch({
	            controller: 'Event',
	            action: 'events',
                    historyUrl : 'Event/events',
	            category: rec.data.id,
	            animation: {type: 'slide' }
	        });
            }
        });
    }

});
Ext.reg('EventCategoryIndex', App.views.EventCategoryIndex);