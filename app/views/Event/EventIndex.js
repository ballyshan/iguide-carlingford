App.views.EventIndex = Ext.extend(Ext.List, {
    store: 'Events',
    layout: 'fit',
    itemTpl: '{event}',
    onItemDisclosure: true,
    emptyText : App.noData,
    initComponent: function () {
    	App.views.EventIndex.superclass.initComponent.apply(this, arguments);

    	this.on('render', function () {
            this.getStore().load();
        }, this);

        this.on('itemTap', function ( list, index, item, e ){
            var rec = list.getStore().getAt(index);
            if(rec){

                App.dispatch({
	            controller: 'Event',
	            action: 'event',
                    historyUrl : 'Event/event',
	            event: rec,
	            animation: {type: 'slide' }
	        });
            }
        });
    }

});
Ext.reg('EventIndex', App.views.EventIndex);