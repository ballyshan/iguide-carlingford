App.views.NewsIndex = Ext.extend(Ext.List, {
    store: 'Articles',
    itemTpl: '{title}, <span class="date">{date}</date>',
    onItemDisclosure: true,

    initComponent: function () {
    	App.views.NewsIndex.superclass.initComponent.apply(this, arguments);

    	this.on('render', function () {
            this.getStore().load();
        }, this);
        this.on('itemTap', function ( list, index, item, e ){
            var rec = list.getStore().getAt(index);
            if(rec){
                Ext.dispatch({
	            controller: 'News',
	            action: 'details',
                    historyUrl : 'Home/details',
	            article: rec,
	            animation: {type: 'slide' }
	        });
            }
        });
        this.on('disclose', function (record, btn, index, e) {
            Ext.dispatch({
	            controller: 'News',
	            action: 'details',
	            article: record,
	            animation: {
                    type: 'slide',
	            }
	        });
        }, this);
    }
});
Ext.reg('NewsIndex', App.views.NewsIndex);