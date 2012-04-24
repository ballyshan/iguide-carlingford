App.views.categoryList = Ext.extend(Ext.Panel, {
    initComponent: function(){
        var titlebar, list;

        titlebar = {
            dock: 'top',
            xtype: 'toolbar',
            title: 'Categories'
        };

        list = {
            xtype: 'list',
            itemTpl: '{cat_name}',
            store: App.stores.Categories,
            listeners: {
                scope: this,
                itemtap: this.onItemtapAction
            }
        };

        Ext.apply(this, {
            html: 'placeholder',
            layout: 'fit',
            dockedItems: [titlebar],
            items: [list]
        });

        App.views.categoryList.superclass.initComponent.call(this);
    },

    onItemtapAction: function(list, index, item, e) {
        Ext.dispatch({
            controller: 'Categories',
            action: 'select',
            index: index
        });
    }
});

Ext.reg('App.views.categoryList', App.views.categoryList);